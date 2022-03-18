<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisRekonYpt extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter2=$tmp[0];
		$jenis=$tmp[1];
		$periode=$tmp[2];
		$nama_file="rekon.xls";
		$sql="select a.no_rekon,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
	    isnull(b.n1,0) as n1,isnull(b.n2,0) as n2, isnull(b.n3,0) as n3, isnull(b.n4,0) as n4, isnull(b.n5,0) as n5,
		isnull(b.total,0) as total 
from sis_rekon_m a
inner join (select c.nis,a.no_rekon,c.kode_lokasi,
			       sum(case when a.kode_param in ('DP_SD','DP_SMA','DP_SMP','DP_TK') then a.nilai else 0 end) as n1, 
				   sum(case when a.kode_param in ('DPP_SD','DPP_SMA','DPP_SMP','DPP_TK') then a.nilai else 0 end) as n2, 
				   sum(case when a.kode_param in ('DPS_SD','DPS_SMA','DPS_SMP','DPS_TK') then a.nilai else 0 end) as n3,
				   sum(case when a.kode_param in ('SPP_SD','SPP_SMA','SPP_SMP','SPP_TK') then a.nilai else 0 end) as n4,
				   sum(case when a.kode_param in ('DENDA_SD','DENDA_SMA','DENDA_SMP','DENDA_TK') then a.nilai else 0 end) as n5,
				   sum(a.nilai) as total
			from sis_rekon_d a 
			inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
			$this->filter
			group by c.nis,a.no_rekon,c.kode_lokasi 
			)b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi 
inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
$filter2 
order by a.tanggal,c.nis

 ";
		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file");
			header("Content-Transfer-Encoding: binary ");
		}
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembayaran siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Bukti</td>
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='60' align='center' class='header_laporan'>Jurusan</td>
	<td width='60' align='center' class='header_laporan'>Kelas</td>
	<td width='60' align='center' class='header_laporan'>Tahun Ajaran</td>
	<td width='60' align='center' class='header_laporan'>Bulan</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Dana Pembangunan</td>
    <td width='80' align='center' class='header_laporan'>Dana Pengembangan Pendidikan</td>
    <td width='80' align='center' class='header_laporan'>DPS</td>
	<td width='80' align='center' class='header_laporan'>Uang Sekolah</td>
	<td width='90' align='center' class='header_laporan'>Denda</td>
	<td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			
			$total=$total+$row->total;
			
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_rekon</td>
			<td class='isi_laporan'>$row->nis</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->kode_kelas</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->bulan</td>
			<td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
   
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='9'>Total</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n5,0,",",".")."</td>
   
	  <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
