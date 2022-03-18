<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkAmorTu2 extends server_report_basic
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
		$periode=$tmp[0];
        $jenis=$tmp[1];
        $filter3=$tmp[2];
		$nama_file="amor_mhs_".$periode.".xls";
		$sql="select a.no_amor,a.keterangan,b.nim,c.nama,c.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas,b.kode_drk,
	   isnull(b.bpp,0) as bpp,c.kode_akt,f.tahunaka   
from aka_amor_m a
inner join (select c.nim,a.no_amor,c.kode_lokasi,a.kode_drk,
			       sum(case when a.kode_produk in ('BPPP','BPPNP') then a.nilai else 0 end) as bpp	
			from aka_amor_d a 
			inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi
			inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi
			inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi
			$filter3
			group by c.nim,a.no_amor,c.kode_lokasi,a.kode_drk
			)b on a.no_amor=b.no_amor and a.kode_lokasi=b.kode_lokasi
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi
inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi
$this->filter and isnull(b.bpp,0)<>0
order by b.nim

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
		echo $AddOnLib->judul_laporan("Akru Pendapatan Tagihan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Amortisasi</td>
	 
    <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='200' align='center' class='header_laporan'>Nama</td>
	 <td width='60' align='center' class='header_laporan'>Tahun Akademik</td>
    <td width='150' align='center' class='header_laporan'>Fakultas</td>
	<td width='150' align='center' class='header_laporan'>Jurusan</td>
	<td width='120' align='center' class='header_laporan'>Kode DRK</td>
	 <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
   
   
  </tr>";
		$bpp=0;$sdp2=0;$up3=0;$sks=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bpp=$bpp+$row->bpp;
			
			
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_amor</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->tahunaka</td>
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fakultas</td>
			<td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>
			<td class='isi_laporan'>$row->kode_drk</td>
			<td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
   
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='9'>Total</td>
   
    <td class='isi_laporan' align='right'>".number_format($bpp,0,",",".")."</td>
   
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
