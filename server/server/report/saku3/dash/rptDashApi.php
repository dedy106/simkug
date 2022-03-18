<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dash_rptDashApi extends server_report_basic
{
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		
		$url="http://api.simkug.com/api/getSiswa/12/YSPTE07/251601967";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERPWD, "ypt:ypt2018");
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		$output = curl_exec($ch);
		echo $output;
		echo "<br>";
		$row = json_decode($output, true);
		echo "Nis : ".$row['rs'][0]['nis'];
		echo "<br>";
		echo "Nama : ".$row['rs'][0]['nama'];
		echo "<br>";
		echo "Kelas : ".$row['rs'][0]['kode_kelas'];
		curl_close($ch);
		
		
		return "";
	}
	
}
?>
