<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_ShareObject");
uses("server_util_Map");
uses("server_util_arrayList");
uses("server_DBConnection_dbLib");
class server_app_mina_dataProvider  extends server_ShareObject
{
	var $dbLib;
	var $config;
	function __construct($config = null)
	{
		parent::__construct();					
		$this->config = $config;		
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("config", "string",$this->config);		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}	
	
	function alert($filter, $info = null){	
		sleep(3);
		$this->dbLib = new server_DBConnection_dbLib($this->config);
		//error_log($filter .":".$this->config);
		$tmp=explode("/",$filter);
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik=$tmp[2];
		$status=$tmp[3];
		$sql = new server_util_arrayList();
		$state = "NEXT";
		switch($info){
			case "01" :
				$sql->add("select count(no_titip) as tot from mina_titip_m where kode_lokasi='$lokasi' ");
				$sql->add("select no_titip as no_bukti, keterangan
					from mina_titip_m  ");
				$title = "Transaksi";
			break;
			case "02" :
				$sql->add("select count(no_pesan) as tot from off_pesan where penerima='$nik' and flag_read='0'");
				$sql->add("select pengirim as no_bukti,judul as keterangan from off_pesan where penerima='$nik' and flag_read='0' ");
				$title = "Pesan Baru";
				$state = "DONE";
			break;
			
			
		}
		$result = new server_util_Map();
		$result->set("info", $info);
		$result->set("title", $title);
		$result->set("state", $state);
		$result->set("data",  $this->dbLib->getMultiDataProvider($sql));
		return $result;
	}	
}
?>
