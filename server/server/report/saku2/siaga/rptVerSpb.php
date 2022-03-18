<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_siaga_rptVerSpb extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ver)
from gr_spbver_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join gr_spb_m c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi ";
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
		$sql="select a.no_ver,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nik_buat,b.nama,a.keterangan,a.periode,a.kode_lokasi,c.no_spb,c.no_npko
from gr_spbver_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join gr_spb_m c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi $this->filter order by a.no_ver";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan verifikasi spb",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='9' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Verifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_ver</td>
        </tr>
	    <tr>
        <td class='header_laporan'>NIK Pembuat </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat - $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>No SPB   </td>
        <td class='header_laporan'>:&nbsp;$row->no_spb</td>
      </tr>
	  <tr>
        <td class='header_laporan'>No NPKO   </td>
        <td class='header_laporan'>:&nbsp;$row->no_npko</td>
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
    <td width='80' align='center' class='header_laporan'>Kode Akun</td>
    <td width='200' align='center' class='header_laporan'>Nama Akun </td>
    <td width='60' align='center' class='header_laporan'>Kode PP</td>
    <td width='60' align='center' class='header_laporan'>Kode DRK </td>
    <td width='60' align='center' class='header_laporan'>Jenis</td>
	<td width='50' align='center' class='header_laporan'>Curr </td>
	<td width='60' align='center' class='header_laporan'>Kurs</td>
	<td width='80' align='center' class='header_laporan'>Debet</td>
	<td width='80' align='center' class='header_laporan'>Kredit</td>
  </tr>
";
		
	  $sql1="select c.kode_akun,d.nama as nama_akun,c.kode_pp,c.kode_drk,c.jenis,c.dc,c.kode_curr,c.kurs,
	  case when c.dc='D' then c.nilai*c.kurs else 0 end as debet, case when c.dc='C' then c.nilai*c.kurs else 0 end as kredit
from gr_spbver_m a
inner join gr_spb_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
inner join gr_spb_j c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi
inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
where a.no_ver='$row->no_ver' order by c.kode_akun";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;$debet=0;$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row1->debet;
			$kredit=$kredit+$row1->kredit;
			echo "<tr>
    <td class='isi_laporan'>$row1->kode_akun</td>
	<td align='left' class='isi_laporan'>$row1->nama_akun</td>
    <td align='left' class='isi_laporan'>$row1->kode_pp</td>
    <td align='left' class='isi_laporan'>$row1->kode_drk</td>
    <td align='left' class='isi_laporan'>$row1->jenis</td>
    <td align='left' class='isi_laporan'>$row1->kode_curr</td>
	<td align='right' class='isi_laporan'>".number_format($row1->kurs,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
  </tr>";
		$j=$j+1;
		}
		
	  echo " <tr><td colspan='7' align='right' class='isi_laporan'>Total</td>
	  <td align='right' class='isi_laporan'>".number_format($debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($kredit,0,",",".")."</td>
	</tr></table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
