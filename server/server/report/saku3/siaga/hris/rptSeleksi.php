<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptSeleksi extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_seleksi)  
from gr_rekrut_seleksi_m a
inner join gr_rekrut_proses b on a.kode_proses=b.kode_proses and a.kode_lokasi=b.kode_lokasi $this->filter ";

		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$kode_akun=$tmp[2];
		$kode_rka=$tmp[3];
		$kode_bidang=$tmp[4];
		$ver=$tmp[1];
		$sql="select DISTINCT substring(c.periode,0,7) as periode,a.no_seleksi,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.nama as proses,a.keterangan,a.kode_lokasi 
		from gr_rekrut_seleksi_m a
		inner join gr_rekrut_proses b on a.kode_proses=b.kode_proses and a.kode_lokasi=b.kode_lokasi
		inner join (select a.tanggal,CONVERT(VARCHAR(30),a.tanggal,112) as periode from gr_rekrut_seleksi_m a )c on a.tanggal=c.tanggal 
 $this->filter order by a.no_seleksi";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan seleksi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='700'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Seleksi </td>
        <td class='header_laporan'>:&nbsp;$row->no_seleksi</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Proses </td>
        <td class='header_laporan'>:&nbsp;$row->proses</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>NIP</td>
    <td width='150' align='center' class='header_laporan'>Nama </td>
    <td width='60' align='center' class='header_laporan'>Kode Job</td>
    <td width='150' align='center' class='header_laporan'>Nama Job </td>
    <td width='40' align='center' class='header_laporan'>Hadir</td>
    <td width='250' align='center' class='header_laporan'>Hasil</td>
   
  </tr>
";
		
	  $sql1="select a.nip,b.nama,a.kode_job,c.nama as nama_job,a.flag_hadir,a.hasil
from gr_rekrut_seleksi_d a
inner join gr_rekrut_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi
inner join gr_rekrut_job c on a.kode_job=c.kode_job and a.kode_lokasi=c.kode_lokasi
where a.no_seleksi='$row->no_seleksi' and a.kode_lokasi='$row->kode_lokasi' and a.flag_seleksi<>'X'
order by a.nip ";

		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->nip</td>
    <td align='left' class='isi_laporan'>$row1->nama</td>
    <td align='left' class='isi_laporan'>$row1->kode_job</td>
    <td align='left' class='isi_laporan'>$row1->nama_job</td>
    <td align='left' class='isi_laporan' align='center' >$row1->flag_hadir</td>
    <td align='left' class='isi_laporan'>$row1->hasil</td>
   
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
