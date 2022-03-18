<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_hris_rptRekapSdm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$periode=$tmp[0];
		$sql="select nama from gr_footer ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$footer=$row->nama;
		$sql="select a.sts_sdm,a.nama,a.kode_lokasi,isnull(b.sa_masuk,0)-isnull(c.sa_keluar,0) as sawal,
	   isnull(d.masuk,0) as masuk,isnull(e.keluar,0) as keluar,
	   isnull(b.sa_masuk,0)-isnull(c.sa_keluar,0)+isnull(d.masuk,0)-isnull(e.keluar,0) as sakhir
from gr_status_sdm a
left join (select b.sts_sdm,count(a.nik) as sa_masuk
			from gr_karyawan_d a
		    inner join gr_karyawan b on a.nik=b.nik 
			where dbo.fnPeriode(a.tanggal)<'$periode'  and a.sts_sk='SK1'
			group by b.sts_sdm
		  )b on a.sts_sdm=b.sts_sdm
left join (select b.sts_sdm,count(a.nik) as sa_keluar
			from gr_karyawan_d a
		    inner join gr_karyawan b on a.nik=b.nik 
			where dbo.fnPeriode(a.tanggal)<'$periode' and a.sts_sk='SK12'
			group by b.sts_sdm
		  )c on a.sts_sdm=c.sts_sdm
left join (select b.sts_sdm,count(a.nik) as masuk
			from gr_karyawan_d a
		    inner join gr_karyawan b on a.nik=b.nik 
			where dbo.fnPeriode(a.tanggal)='$periode' and a.sts_sk='SK1'
			group by b.sts_sdm
		  )d on a.sts_sdm=d.sts_sdm
left join (select b.sts_sdm,count(a.nik) as keluar
			from gr_karyawan_d a
		    inner join gr_karyawan b on a.nik=b.nik 
			where dbo.fnPeriode(a.tanggal)='$periode' and a.sts_sk='SK12'
			group by b.sts_sdm
		  )e on a.sts_sdm=e.sts_sdm
";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("jumlah karyawan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$rs = $dbLib->execute($sql);
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' align='center' class='header_laporan'>No</td>
	  <td width='200' align='center' class='header_laporan'>Status</td>
	 <td width='80' align='center' class='header_laporan'>Jumlah Awal</td>
	 <td width='80' align='center' class='header_laporan'>Masuk</td>
	 <td width='80'  align='center' class='header_laporan'>Keluar</td>
	 <td width='80' align='center' class='header_laporan'>Jumlah Akhir</td>
	
	 </tr>
  ";
		$sawal=0; $masuk=0; $keluar=0; $sakhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sawal=$sawal+$row->sawal;
			$masuk=$masuk+$row->masuk;
			$keluar=$keluar+$row->keluar;
			$sakhir=$sakhir+$row->sakhir;
			
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->nama";
		echo "</td>
		<td align='center' class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSdm('$row->sts_sdm','$row->kode_lokasi','$periode','sawal');\">".number_format($row->sawal,0,',','.')."</td>
		<td align='center' class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSdm('$row->sts_sdm','$row->kode_lokasi','$periode','masuk');\">".number_format($row->masuk,0,',','.')."</td>
		<td align='center' class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSdm('$row->sts_sdm','$row->kode_lokasi','$periode','keluar');\">".number_format($row->keluar,0,',','.')."</td>
		<td align='center' class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSdm('$row->sts_sdm','$row->kode_lokasi','$periode','sakhir');\">".number_format($row->sakhir,0,',','.')."</td>
		
     </tr>";
	
			$i=$i+1;
		}
		echo "<tr>
		<td class='header_laporan' align='center' colspan='2'>Total</td>
		<td align='center' class='isi_laporan'>".number_format($sawal,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($masuk,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($keluar,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($sakhir,0,',','.')."</td>
     </tr>";
		echo "</table> </td></tr>
  <tr>
    <td align='left' class='isi_laporan'>$footer</td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
