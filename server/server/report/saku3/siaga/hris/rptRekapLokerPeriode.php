<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_siaga_hris_rptRekapLokerPeriode extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$nik_user=$tmp[0];
		$level=$tmp[1];
		$periode=$tmp[2];
		$sql="select kode_loker,tipe,nama,level_spasi,n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15
from gr_loker_tmp where nik_user='$nik_user' and level_lap<=$level order by rowindex";
		
		$rs=$dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("Rekapitulasi Karyawan","","TAHUN $tahun");
		echo "<div align='center'>"; 
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>Kode</td>
    <td width='300' rowspan='2' align='center' class='header_laporan'>Lokasi Kerja </td>
    <td colspan='7' align='center' class='header_laporan'>Status Karyawan</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Total</td>
	<td colspan='2' align='center' class='header_laporan'>Jenis Kelamin</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Total</td>
	<td colspan='4' align='center' class='header_laporan'>Pendidikan</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Total</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Direksi</td>
	<td width='60' align='center' class='header_laporan'>Tetap</td>
    <td width='60' align='center' class='header_laporan'>Kontrak GIN</td>
    <td width='60' align='center' class='header_laporan'>Outsourcing-KOPTIKA</td>
    <td width='60' align='center' class='header_laporan'>Outsourcing-KOPEGTEL</td>
    <td width='60' align='center' class='header_laporan'>THL / PKL /MAGANG</td>
    <td width='60' align='center' class='header_laporan'>Perbantuan TLKM</td>
	<td width='60' align='center' class='header_laporan'>Lk</td>
    <td width='60' align='center' class='header_laporan'>Pr</td>
	<td width='60' align='center' class='header_laporan'>Pra Kuliah</td>
    <td width='60' align='center' class='header_laporan'>Diploma (D1-D3)</td>
	<td width='60' align='center' class='header_laporan'>Sarjana</td>
    <td width='60' align='center' class='header_laporan'>Pasca Sarjana</td>
	
  </tr>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;  
			$nama_buat=$row->nama_buat;
			
      echo "<tr>
    <td class='isi_laporan'>$row->kode_loker</td>
    <td class='isi_laporan'>";
	echo fnSpasi($row->level_spasi);
	if ($row->tipe=="Posting" && $row->n7 > 0)
	{
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDoc('$row->kode_loker','$row->nama','status','$periode');\">$row->nama</a>";
	}
	else
	{
		echo "$row->nama";
	}
	echo "</td>
	<td class='isi_laporan' align='center'>".number_format($row->n0,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n1,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n2,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n3,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n4,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n5,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n6,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n7,0,",",".")."</td>
	<td class='isi_laporan' align='center'>".number_format($row->n8,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n9,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n10,0,",",".")."</td>
	<td class='isi_laporan' align='center'>".number_format($row->n11,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n12,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n13,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n14,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($row->n15,0,",",".")."</td>
  </tr>";
      
			
			$i=$i+1;
		}
		
		echo "</div>";
			
		return "";
	}
	
}
?>
  
