<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiJamsos extends server_report_basic
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
		
		$sql="select a.nik,a.nama,b.nama as nama_loker,c.nama as nama_jab,isnull(d.nilai,0) as nilai,
	   (0.24/100)*isnull(d.nilai,0) as jkk,0.037*isnull(d.nilai,0) as jhtp,0.02*isnull(d.nilai,0) as jhtk,
	   (0.3/100)*isnull(d.nilai,0) as jk,a.sts_nikah,
		case when substring(a.sts_pajak,1,1)='K' then substring(a.sts_pajak,3,2) else '0' end as jml_anak,
	   case when (sts_nikah='LAJANG' and isnull(d.nilai,0)<4725000) then 0.03*isnull(d.nilai,0) else 0.06*isnull(d.nilai,0) end as jpk
from hr_karyawan a
inner join hr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join hr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
left join (select nik,kode_lokasi,sum(case when kode_param in ('GDAS','TDAS','TPOS','TPRS') then nilai else 0 end) as nilai
		   from hr_gaji_d
		   where no_gaji='$no_gaji' and kode_lokasi='$kode_lokasi' 
		   group by nik,kode_lokasi
		  )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi $this->filter order by a.nama
		  ";
		
		$i=1;
		$AddOnLib=new server_util_AddOnLib();	
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan jamsostek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>NO</td>
     <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>NAMA</td>
	 <td width='100'  align='center' class='header_laporan'>LOKASI KERKA</td>
	 <td width='100'  align='center' class='header_laporan'>POSISI</td>
	 <td width='60'  align='center' class='header_laporan'>STATUS</td>
	 <td width='40'  align='center' class='header_laporan'>JUMLAH ANAK</td>
	 <td width='80'  align='center' class='header_laporan'>TOTAL THP</td>
	 <td width='80'  align='center' class='header_laporan'>JKK</td>
	 <td width='80'  align='center' class='header_laporan'>JHT Perusahaan</td>
	 <td width='80'  align='center' class='header_laporan'>JHT Karyawan</td>
	 <td width='80'  align='center' class='header_laporan'>JK</td>
	 <td width='80'  align='center' class='header_laporan'>JPK</td>  
	 <td width='80'  align='center' class='header_laporan'>TOTAL PERUSAHAAN</td>
	 <td width='80'  align='center' class='header_laporan'>TOTAL KARYAWAN</td>
	 <td width='80'  align='center' class='header_laporan'>TOTAL</td>  
	</tr>  ";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$totp=0; $totk=0; $nilai=0; $jkk=0; $jhtp=0; $jhtk=0; $jk=0; $jpk=0; $total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$jkk+=$row->jkk;
			$jhtp+=$row->jhtp;
			$jhtk+=$row->jhtk;
			$jk+=$row->jk;
			$jpk+=$row->jpk;
			$totp+=$row->jkk+$row->jhtp+$row->jk+$row->jpk;
			$totk+=$row->jhtk;
			$total+=$row->jkk+$row->jhtp+$row->jk+$row->jpk+$row->jhtk;
		
			
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_loker</td>
	<td class='isi_laporan' align='center'>$row->nama_jab</td>
	<td class='isi_laporan' align='center'>$row->sts_nikah</td>
	<td class='isi_laporan' align='center'>".intval($row->jml_anak)."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jkk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jhtp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jhtk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jpk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jkk+$row->jhtp+$row->jk+$row->jpk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jhtk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jkk+$row->jhtp+$row->jk+$row->jpk+$row->jhtk,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
	 <td class='isi_laporan' colspan='7' align='right'>TOTAL</td>

	<td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jkk,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jhtp,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jhtk,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jk,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jpk,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($totp,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($totk,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
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
