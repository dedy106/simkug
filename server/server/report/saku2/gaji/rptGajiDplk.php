<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiDplk extends server_report_basic
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
		
		$sql="select a.nik,a.nama,b.nama as nama_jab,date_format(a.tgl_lahir,'%d/%m/%Y') as tanggal ,dbo.fnGetUmur(a.tgl_lahir,'2012-03-25') as umur,c.nama as status_sdm,
	   isnull(d.gdas,0) as gdas,isnull(d.tdas,0) as tdas,isnull(d.gdas,0)+isnull(d.tdas,0) as total,
	   0.5*(isnull(d.gdas,0)+isnull(d.tdas,0)) as tdi,e.persen*100 as fu,f.persen*100 as ft,
	   round(0.5*(isnull(d.gdas,0)+isnull(d.tdas,0))*e.persen*f.persen,0) as tht,
	   round(0.5*(isnull(d.gdas,0)+isnull(d.tdas,0))*e.persen*f.persen,0)*2 as tht2
from hr_karyawan a
inner join hr_jab b on a.kode_jab=b.kode_jab
inner join hr_status_sdm c on a.sts_sdm=c.sts_sdm and a.kode_lokasi=c.kode_lokasi
left join (select nik,sum(case kode_param when 'GDAS' then nilai else 0 end) as  gdas,
					sum(case kode_param when 'TDAS' then nilai else 0 end) as tdas
			from hr_gaji_d
			where periode='$periode' 
			group by nik
		   )d on a.nik=d.nik
left join hr_dplk_fu e on dbo.fnGetUmur(a.tgl_lahir,'2012-03-25') between e.bawah and e.atas
left join hr_dplk_fp f on a.kode_posisi=f.kode_posisi
$this->filter
  order by a.nik";
		
		
		$i=1;
		$AddOnLib=new server_util_AddOnLib();	
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan dplk",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='100'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>Jabatan</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Lahir</td>
	 <td width='40'  align='center' class='header_laporan'>Usia</td>
	 <td width='80'  align='center' class='header_laporan'>Gaji Dasar</td>
	 <td width='80'  align='center' class='header_laporan'>Tunjangan Dasar</td>
	 <td width='80'  align='center' class='header_laporan'>Jumlah Dibayar</td>
	 <td width='80'  align='center' class='header_laporan'>TDI 5%</td>
	 <td width='80'  align='center' class='header_laporan'>FU</td>
	 <td width='80'  align='center' class='header_laporan'>FT</td>  
	 <td width='80'  align='center' class='header_laporan'>THT Pegawai</td>
	 <td width='80'  align='center' class='header_laporan'>THT yayasan</td>
	 <td width='80'  align='center' class='header_laporan'>Jumlah THT</td>  
	</tr>  ";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->status_sdm</td>
	<td class='isi_laporan' align='center'>$row->nama_jab</td>
	<td class='isi_laporan' align='center'>$row->tanggal</td>
	<td class='isi_laporan' align='center'>$row->umur</td>
	<td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tdi,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($row->fu,0,',','.')."%</td>
	<td class='isi_laporan' align='center'>".number_format($row->ft,0,',','.')."%</td>
	<td class='isi_laporan' align='right'>".number_format($row->tht,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tht,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tht2,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		
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
