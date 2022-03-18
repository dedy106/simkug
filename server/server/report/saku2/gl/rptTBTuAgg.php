<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBTuAgg extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select a.kode_akun,b.nama as nama_akun, a.kode_lokasi, a.periode, a.gar_tahun, a.gar_sd, a.gar_bulan,a.nilai_sd, a.nilai,a.nilai_seb
from dw_glma_gar a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and a.nik_user='$nik_user' and (gar_tahun<>0 or gar_sd<>0 or gar_bulan<>0 or nilai_sd<>0 or nilai<>0) order by a.kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and a.nik_user='$nik_user' order by a.kode_akun ";
		}		
		
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("neraca lajur anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan' align='center'>No</td>
      <td width='70'  class='header_laporan' align='center'>Akun</td>
      <td width='200' height='25'  class='header_laporan' align='center'>Nama</td>
     <td width='90' class='header_laporan' align='center'>Target Tahun</td>
      <td width='90' class='header_laporan' align='center'>Target s.d Bulan Berjalan</td>
      <td width='90' class='header_laporan' align='center'>RKA Bulan Berjalan</td>
	  <td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan</td>
	<td width='90' class='header_laporan' align='center'>Realisasi Bulan Berjalan</td>
	<td width='90' class='header_laporan' align='center'>Realisasi Bulan Lalu</td>
	<td width='60' class='header_laporan' align='center'>Growth</td>
	<td width='60' class='header_laporan' align='center'>Pencapaian</td>
	<td width='90' class='header_laporan' align='center'>Sisa Anggaran Tahun</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;
			if ($row->nilai_seb!=0)
			{
				$persen1=($row->nilai/$row->nilai_seb)*100;
			}
			if ($row->gar_tahun!=0)
			{
				$persen2=($row->nilai_sd/$row->gar_tahun)*100;
			}
			if ($row->gar_tahun==0)
			{
				$sisa=0;
			}
			else
			{
				$sisa=$row->gar_tahun-$row->nilai_sd;
			}
			echo "<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama_akun</td>
        <td class='isi_laporan' align='right'>".number_format($row->gar_tahun,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->gar_sd,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->gar_bulan,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai_sd,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai_seb,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($persen1,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($persen2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sisa,0,',','.')."</td>
		</tr>";
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
}
?>
