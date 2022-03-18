<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggPakaiPp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		if ($jenis=="Bulanan")
		{
			$sql = "select  a.kode_akun, a.kode_lokasi, a.kode_pp, a.kode_drk, a.nama_akun, a.nama_pp, a.nama_drk, a.periode, substring(a.periode,1,4) as tahun,
		case when b.jenis='Pendapatan' then -n3 else n3 end as gar,
		case when b.jenis='Pendapatan' then -n4 else n4 end as tot
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		}
		else
		{
			$sql = "select  a.kode_akun, a.kode_lokasi, a.kode_pp, a.kode_drk, a.nama_akun, a.nama_pp, a.nama_drk, a.periode, substring(a.periode,1,4) as tahun,
		case when b.jenis='Pendapatan' then -n2 else n2 end as gar,
		case when b.jenis='Pendapatan' then -n5 else n5 end as tot
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		}
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		//error_log($sql);
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo ""; 
		echo $AddOnLib->judul_laporan("laporan pemakaian anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='60'   class='header_laporan' align='center'>Kode</td>
    <td width='200'  class='header_laporan' align='center'>Nama Akun </td>
    <td width='60'  class='header_laporan' align='center'>Kode PP </td>
    <td width='150'  class='header_laporan' align='center'>Nama PP </td>
    <td width='60'  class='header_laporan' align='center'>Kode DRK</td>
	<td width='200'  class='header_laporan' align='center'>Nama DRK</td>
   <td width='90'  class='header_laporan' align='center'>Anggaran</td>
   <td width='90' class='header_laporan' align='center'>Realisasi </td>
   <td width='90' class='header_laporan' align='center'>Sisa Anggaran</td>
   ";
		$i=1;
		$gar=0;$tot=0;$sisa=0;
		$jum_gar=0; $jum_tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gar=$gar+$row->gar;
			$tot=$tot+$row->tot;
			$sisa=$sisa+($row->gar-$row->tot);
			if ($row->gar<>0)
			{
				$jum_gar=$jum_gar+1;
			}
			if ($row->tot<>0)
			{
				$jum_tot=$jum_tot+1;
			}
			echo "<tr><td class='isi_laporan' align='center'>$i</td>
    <td height='20' class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->kode_drk</td>
	<td class='isi_laporan'>$row->nama_drk</td>
       <td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk');\">".number_format($row->gar,0,',','.')."</a>";
			echo "</td>
     <td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk');\">".number_format($row->tot,0,',','.')."</a>";
			echo "</td>
	<td class='isi_laporan' align='right' >".number_format($row->gar-$row->tot,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		$persen=0;
		if ($jum_gar<>0)
		{
			$persen=($jum_tot/$jum_gar)*100;
		}
		
		echo "<tr>
    <td height='20' colspan='7' class='sum_laporan'><div align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($gar,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($sisa,0,',','.')."</td>
   </tr>";
		echo " <tr>
    <td height='20' colspan='10' class='sum_laporan'>&nbsp;</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td height='20' colspan='7' class='sum_laporan'>KEGIATAN UNIT</td>
    <td class='header_laporan'>Target<br>
    Kegiatan</td>
    <td class='header_laporan'>Realisasi <br>
    Kegiatan</td>
    <td class='header_laporan' >Persentase</td>
  </tr>
  <tr>
    <td height='20' colspan='7' align='center' class='sum_laporan'>BANG. LEMBAGA</td>
    <td class='header_laporan' align='center'>".number_format($jum_gar,0,',','.')."</td>
    <td class='header_laporan' align='center'>".number_format($jum_tot,0,',','.')."</td>
    <td class='header_laporan' align='center' >".number_format($persen,0,',','.')."%</td>
  </tr>";
		echo "</table>";
		return "";
	}
	
}

