<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptSaldoRutinTahun extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$kode_pp=$tmp[1];
		$tahun=$tmp[2];
		$kode_rumah=$tmp[3];
		$jenis=$tmp[4];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
		$rs = $dbLib->execute($sql);
		$row=$rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select nama from rt_iuran_jenis where kode_lokasi='$kode_lokasi' and kode_jenis='$jenis'";
		$rs = $dbLib->execute($sql);
		$row=$rs->FetchNextObject($toupper=false);
		$nama_jenis=$row->nama;
		
		$sql = "select a.kode_rumah,a.kode_lokasi,a.rt,b.nama,isnull(c.nilai,0) as tagihan,
	   isnull(d.n1,0) as n1,isnull(d.n2,0) as n2,isnull(d.n3,0) as n3,isnull(d.n4,0) as n4,isnull(d.n5,0) as n5,isnull(d.n6,0) as n6,
	   isnull(d.n7,0) as n7,isnull(d.n8,0) as n8,isnull(d.n9,0) as n9,isnull(d.n10,0) as n10,isnull(d.n11,0) as n11,isnull(d.n12,0) as n12,
	   isnull(d.n13,0) as n13,isnull(c.nilai,0)- isnull(d.n13,0) as sisa
from rt_rumah a 
inner join rt_warga b on a.kode_penghuni=b.nik
left join (select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt) as nilai 
			from rt_bill_d a 
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' and substring(a.periode,1,4)='$tahun'
			group by a.kode_rumah,a.kode_lokasi
		   )c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_rumah,a.kode_lokasi,
				sum(case when substring(a.periode_bill,5,2)='01' then a.nilai_rt else 0 end) as n1,
				sum(case when substring(a.periode_bill,5,2)='02' then a.nilai_rt else 0 end) as n2, 
				sum(case when substring(a.periode_bill,5,2)='03' then a.nilai_rt else 0 end) as n3, 
				sum(case when substring(a.periode_bill,5,2)='04' then a.nilai_rt else 0 end) as n4, 
				sum(case when substring(a.periode_bill,5,2)='05' then a.nilai_rt else 0 end) as n5, 
				sum(case when substring(a.periode_bill,5,2)='06' then a.nilai_rt else 0 end) as n6,
				sum(case when substring(a.periode_bill,5,2)='07' then a.nilai_rt else 0 end) as n7,
				sum(case when substring(a.periode_bill,5,2)='08' then a.nilai_rt else 0 end) as n8, 
				sum(case when substring(a.periode_bill,5,2)='09' then a.nilai_rt else 0 end) as n9, 
				sum(case when substring(a.periode_bill,5,2)='10' then a.nilai_rt else 0 end) as n10,
				sum(case when substring(a.periode_bill,5,2)='11' then a.nilai_rt else 0 end) as n11, 
				sum(case when substring(a.periode_bill,5,2)='12' then a.nilai_rt else 0 end) as n12,
				sum(a.nilai_rt) as n13  
			from rt_angs_d a 
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' and substring(a.periode_bill,1,4)='$tahun'
			group by a.kode_rumah,a.kode_lokasi
		  )d on a.kode_rumah=d.kode_rumah and a.kode_lokasi=d.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.rt='$kode_pp'
order by a.kode_rumah  ";
		
		$rs = $dbLib->execute($sql);	

		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO $nama_jenis",$this->lokasi."<br>$nama_pp","TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='60'  class='header_laporan' align='center'>Kode Rumah</td>
    <td width='250'  class='header_laporan' align='center'>Nama Penghuni</td>
    <td width='90' class='header_laporan' align='center'>Tagihan</td>
    <td width='80' class='header_laporan' align='center'>Januari</td>
	<td width='80' class='header_laporan' align='center'>Februari</td>
	<td width='80' class='header_laporan' align='center'>Maret</td>
	<td width='80' class='header_laporan' align='center'>April</td>
	<td width='80' class='header_laporan' align='center'>Mei</td>
	<td width='80' class='header_laporan' align='center'>Juni</td>
	<td width='80' class='header_laporan' align='center'>Juli</td>
	<td width='80' class='header_laporan' align='center'>Agustus</td>
	<td width='80' class='header_laporan' align='center'>September</td>
	<td width='80' class='header_laporan' align='center'>Oktober</td>
	<td width='80' class='header_laporan' align='center'>November</td>
	<td width='80' class='header_laporan' align='center'>Desember</td>
	<td width='90' class='header_laporan' align='center'>Total Bayar</td>
	<td width='90' class='header_laporan' align='center'>Sisa Tagihan</td>
  </tr>
 ";
		
		$i=1;
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0; $n13=0; 
		$tagihan=0;
		$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
			$n9+=$row->n9;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$sisa+=$row->sisa;
			$tagihan+=$row->tagihan;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_rumah</td>
    <td height='20' class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBuku('$row->kode_rumah','$row->kode_lokasi','$periode','$row->rt');\">$row->nama</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sisa,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($tagihan,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n6,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n8,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n10,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n12,0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($n13,0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($sisa,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
