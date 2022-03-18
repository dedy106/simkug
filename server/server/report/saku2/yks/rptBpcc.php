<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_yks_rptBpcc extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		if ($jenis=="Lokasi")
		{
			$sql="xp_cmdshell 'c:\sai\zip\bpcc.bat $nik_user $kode_lokasi $periode', NO_OUTPUT ";
			$file="../zip/bpcc.7z";
			$filename="bpcc_".$kode_lokasi."_".$periode.".7z";
		}
		if ($jenis=="Konsolidasi")
		{
			$sql="xp_cmdshell 'c:\sai\zip\bpcc_konsol.bat $nik_user $periode', NO_OUTPUT ";
			$file="../zip/bpcc_konsol.7z";
			$filename="bpcc_konsol_".$periode.".7z";
		}
		$rs = $dbLib->execute($sql);
		header("Cache-Control: public");
		header("Content-Description: File Transfer");
		header("Content-Disposition: attachment; filename=$file");
		header("Content-Type: application/zip");
		header("Content-Transfer-Encoding: binary");
		header('Content-Disposition: attachment; filename="' . $filename . '"');
		readfile($file);
		
		return "";
	}
	
	
}
?>
