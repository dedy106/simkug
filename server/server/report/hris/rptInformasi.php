<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptInformasi extends server_report_basic
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
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$sql="select no_konten,tanggal,judul,keterangan,file_gambar from gr_konten $this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"serverApp.php"));		
			$pathfoto = $path . "media/".$row->file_gambar;
			echo "<table width='750' border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td width='290' class='lokasi_laporan2' >$row->judul</td>
  </tr>
  <tr>
    <td height='2'  background='../image/garis2.gif'></td>
  </tr>
  <tr>
    <td style='padding:5px;'><img src='$pathfoto' align='left' width='400' height='300'>".urldecode($row->keterangan)."      
    </td>
  </tr>
</table>";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
