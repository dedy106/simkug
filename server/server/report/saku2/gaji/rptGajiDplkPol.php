<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiDplkPol extends server_report_basic
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
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$no_gaji=$tmp[2];
		$tgl="2013-01-25";
		$sql="select tgl_transfer from hr_gaji_m where kode_lokasi='$kode_lokasi' and no_gaji='$no_gaji'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tgl_transfer=$row->tgl_transfer;
		
		$sql="select a.nik,a.skode,a.nama,b.nama as nama_jab,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,date_format(d.tanggal,'%d/%m/%Y') as tanggal,dbo.fnGetUmur(a.tgl_lahir,d.tanggal) as umur,c.nama as status_sdm,
	   isnull(d.gdas,0) as gdas,isnull(d.tdas,0) as tdas,isnull(d.gdas,0)+isnull(d.tdas,0)+isnull(d.rapl,0) as total,isnull(d.rapl,0) as rapl,
	   0.05*(isnull(d.gdas,0)+isnull(d.tdas,0)+isnull(d.rapl,0)) as tdi,e.persen*100 as fu,f.persen*100 as ft,
	   round(0.05*(isnull(d.gdas,0)+isnull(d.tdas,0)+isnull(d.rapl,0))*e.persen*f.persen,0) as tht,
	   round(0.05*(isnull(d.gdas,0)+isnull(d.tdas,0)+isnull(d.rapl,0))*e.persen*f.persen,0)*2 as tht2
from hr_karyawan a
inner join hr_struk b on a.kode_struk=b.kode_struk and a.kode_lokasi=b.kode_lokasi
inner join hr_status_sdm c on a.sts_sdm=c.sts_sdm and a.kode_lokasi=c.kode_lokasi
left join (select a.nik,a.kode_lokasi,b.tanggal,
					sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as  gdas,
					sum(case a.kode_param when 'TDAS' then a.nilai else 0 end) as tdas,
					sum(case a.kode_param when 'RAPL' then a.nilai else 0 end) as rapl
			from hr_gaji_d a
			inner join hr_gaji_m b on a.no_gaji=b.no_gaji and a.kode_lokasi=b.kode_lokasi
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
			group by a.nik,a.kode_lokasi,b.tanggal
		   )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
left join hr_dplk_fu e on (dbo.fnGetUmur(a.tgl_lahir,d.tanggal) between e.bawah and e.atas) and a.kode_lokasi=e.kode_lokasi
left join hr_dplk_fp f on a.kode_grade=f.kode_grade and a.kode_lokasi=f.kode_lokasi
$this->filter and a.flag_dplk='1'
  order by a.nama";
		
	
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
	  <td width='40'  align='center' class='header_laporan'>Kode</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='100'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>Jabatan</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Lahir</td>
	 <td width='60'  align='center' class='header_laporan'>Periode</td>
	 <td width='40'  align='center' class='header_laporan'>Usia</td>
	 <td width='80'  align='center' class='header_laporan'>Gaji Dasar</td>
	 <td width='80'  align='center' class='header_laporan'>Tunjangan Dasar</td>
	 <td width='80'  align='center' class='header_laporan'>Rapel</td>
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
		$gdas=0; $tdas=0; $rapl=0; $tdpl=0; $tdi=0; $fu=0; $ft=0; $tht=0; $tht2=0; $total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gdas+=$row->gdas;
			$tdas+=$row->tdas;
			$rapl+=$row->rapl;
			$tdpl+=$row->tdpl;
			$tdi+=$row->tdi;
			$fu+=$row->fu;
			$ft+=$row->ft;
			$tht+=$row->tht;
			$tht2+=$row->tht2;
			$total+=$row->total;
			
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan' align='center'>$row->skode</td>
	 <td class='isi_laporan' >$row->nama</td>
	 <td class='isi_laporan'>$row->status_sdm</td>
	<td class='isi_laporan' align='center'>$row->nama_jab</td>
	<td class='isi_laporan' align='center'>$row->tgl_lahir</td>
	<td class='isi_laporan' align='center'>$row->tanggal</td>
	<td class='isi_laporan' align='center'>$row->umur</td>
	<td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rapl,0,',','.')."</td>
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
		echo "<tr>
	 <td class='isi_laporan' align='center' colspan='9'>$row->skode</td>

	<td class='isi_laporan' align='right'>".number_format($gdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($tdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rapl,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($tdi,0,',','.')."</td>
	<td class='isi_laporan' align='center'>&nbsp;</td>
	<td class='isi_laporan' align='center'>&nbsp;</td>
	<td class='isi_laporan' align='right'>".number_format($tht,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($tht,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($tht2,0,',','.')."</td>
     </tr>";
		echo "</table> </td></tr>
   <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Bandung, ".substr($tgl_transfer,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$tgl_transfer),0,6))."</td>
        </tr>
      <tr align='center'>
        <td width='200'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
        <td width='300'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Man. DUKMAN</td>
      </tr>
      <tr align='center'>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Ellys Siregar</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
