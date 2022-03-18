<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAjuAgg extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $no_app=$tmp[2];
        $status=$tmp[3];
				$jenis=$tmp[4];
				$kode_pp=$tmp[5];
		$sql="select a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_pdrk,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat,
		a.nik_app1,c.nama as nama_setuju,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email
from rra_pdrk_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
 $this->filter order by a.no_pdrk";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body onload='send()'>"; 
		echo $AddOnLib->judul_laporan("laporan pengajuan anggaran",$this->lokasi,$tahun);
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$email=$row->email;
			$header="Pengajuan RRA - ".$row->no_pdrk;
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pdrk</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
     

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode Akun</td>
    <td width='300' align='center' class='header_laporan'>Nama Akun</td>
    <td width='60' align='center' class='header_laporan'>Periode</td>
<td width='90' align='center' class='header_laporan'>Penerima</td>
<td width='90' align='center' class='header_laporan'>Pemberi</td>
  </tr>";
	  $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
       b.nama as nama_akun,
	   case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
from rra_pdrk_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_pdrk='$row->no_pdrk' and a.kode_lokasi='$row->kode_lokasi'
order by a.dc desc ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$debet=0;
		$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row1->debet;
			$kredit=$kredit+$row1->kredit;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
    <td class='isi_laporan'>$row1->periode</td>
    <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		
	  echo " <tr>
    <td colspan='4' align='right' class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
	<td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
  </tr>
  <tr>
    <td align='right' colspan='10'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='200' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='200' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nama_setuju</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nik_app1</td>
        <td class='header_laporan'>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  </table><br>";
			
			$i=$i+1;
		}
		
		return "";
	}
	
}
?>
