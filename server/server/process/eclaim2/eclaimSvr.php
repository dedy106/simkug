<?php
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");
class server_process_eclaim2_eclaimSvr extends server_BasicObject
{
	function __construct()
	{
		parent::__construct();	
	}
	protected function doSerialize()
	{
		parent::doSerialize();		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}
	function getDetailKlaim($no_klaim){
		
	}
}
?>
