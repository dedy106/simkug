<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyekDokDetailLama extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$tmp="";
		
		$sql="select b.kode_jenis,b.nama,a.no_gambar 
from tu_rab_dok a 
inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi 

$this->filter ";

		
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));
		$pathfoto = $path . "server/media/";
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Dokumen Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
		 <td width='60'  align='center' class='header_laporan'>Jenis</td>
		 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='200'  align='center' class='header_laporan'>File</td>
	 <td width='60'  align='center' class='header_laporan'>Aksi</td>
	  </tr>  ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$path=$pathfoto.$row->no_gambar;
		echo "<tr >
		<td class='isi_laporan' align='center'>$i</td>
		 <td class='isi_laporan'>$row->kode_jenis</td>
		 <td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan'>$row->no_gambar</td>
		<td class='isi_laporan'> <a href='$path' target='_blank'>Download</a> </td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
