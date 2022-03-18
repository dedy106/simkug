<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptTarifParam extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$jenis=$tmp[2];
		$nama_file="parameter_tarif.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_pp,a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_param,a.tarif,a.bulan1,a.bulan2,y.nama as jur
		from sis_param_tarif a
		inner join sis_jur y on a.kode_jur=y.kode_jur and a.kode_lokasi=y.kode_lokasi and a.kode_pp=y.kode_pp
		$this->filter
		order by a.kode_pp,a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_param";
		if ($jenis=="Excel")
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
		echo $AddOnLib->judul_laporan("daftar parameter tarif",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>Kode PP</td>
    <td width='80' align='center' class='header_laporan'>Angkatan</td>
	<td width='80' align='center' class='header_laporan'>Tingkat</td>
	<td width='200' align='center' class='header_laporan'>Jurusan</td>
    <td width='100' align='center' class='header_laporan'>Parameter</td>
	<td width='90' align='center' class='header_laporan'>Tarif</td>
	<td width='90' align='center' class='header_laporan'>Periode Awal</td>
    <td width='90' align='center' class='header_laporan'>Periode Akhir</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_tingkat</td>
			<td class='isi_laporan'>$row->jur</td>
			<td class='isi_laporan'>$row->kode_param</td>
			<td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
			<td class='isi_laporan' align='right'>$row->bulan1</td>
			<td class='isi_laporan' align='right'>$row->bulan2</td>
			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
