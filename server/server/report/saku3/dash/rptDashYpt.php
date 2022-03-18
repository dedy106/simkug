<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dash_rptDashYpt extends server_report_basic
{
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		/*
		$sql="select logo from lokasi where kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);	
		$row = $rs->FetchNextObject($toupper=false);
		$logo=$row->logo;
		*/
		$path_logo="image/ypt4.gif";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel '>
			<div class='panel-body'>
				<div class='row' style='height: 80px'>
				</div>
				<div class='row'>
					 <img src='$path_logo' class='img-responsive' style='margin:0 auto;'  > 
				</div>
			</div>
		</div>";
		
		
		return "";
	}
	
}
?>
