<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptSisRekonYptNon extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$kode_pp=$tmp[2];
		$periode=$tmp[3];
		$jenis=$tmp[4];
		
		$nama_file="rekon.xls";
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_kas as no_rekon,a.keterangan,b.nim,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
	    isnull(b.n1,0) as n1,isnull(b.n2,0) as n2, isnull(b.n3,0) as n3,
		isnull(b.total,0) as total,isnull(b.pdd,0) as pdd
from kas_m a
inner join (select c.nim,a.no_rekon,c.kode_lokasi,
			        sum(case when a.kode_param in ('SPP') then a.nilai else 0 end) as n1, 
				   sum(case when a.kode_param in ('DSP') then a.nilai else 0 end) as n2, 
				   sum(case when a.kode_param in ('LAIN') then a.nilai else 0 end) as n3,
				   sum(a.nilai) as total,0 as pdd
			from dikti_bill_rekon a 
			inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi
			group by c.nim,a.no_rekon,c.kode_lokasi 
			union all
			select c.nim,a.no_bukti as no_rekon,c.kode_lokasi,0 as n1,0 as n2,0 as n3,
				   sum(a.nilai) as total,sum(a.nilai) as pdd
			from dikti_cd a 
			inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
			where a.dc='D'
			group by c.nim,a.no_bukti,c.kode_lokasi 
			)b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
inner join dikti_mhs c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
inner join dikti_mhs e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi
$this->filter  ";
	
		
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
	 <td width='30' align='center' class='header_laporan'>Kode PP</td>	 
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='60' align='center' class='header_laporan'>Jurusan</td>
	<td width='60' align='center' class='header_laporan'>Kelas</td>
	<td width='60' align='center' class='header_laporan'>Tahun Ajaran</td>
	<td width='60' align='center' class='header_laporan'>Bulan</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>DSP</td>
    <td width='80' align='center' class='header_laporan'>LAIN</td>
	<td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$total=0;$pdd=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			
			$total=$total+$row->total;
			$pdd+=$row->pdd;
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_rekon</td>
					<td class='isi_laporan'>$row->kode_pp</td>
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
	<td class='isi_laporan' align='right'>".number_format($row->pdd,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='10'>Total</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,",",".")."</td>
 
	<td class='header_laporan' align='right'>".number_format($pdd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
