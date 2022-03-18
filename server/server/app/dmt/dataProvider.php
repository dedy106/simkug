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
class server_app_dmt_dataProvider  extends server_ShareObject
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
				$sql->add("select count(no_kontrak) as tot from dmt_kontrak_m where kode_lokasi='$lokasi' ");
				$sql->add("select no_kontrak as no_bukti, keterangan
					from dmt_kontrak_m where  kode_lokasi='$lokasi'  ");
				$title = "Kontrak";
			break;
			case "02" :
				$sql->add("select count(no_akru) as tot from dmt_akru_m where  kode_lokasi='$lokasi'  and modul='AR' ");
				$sql->add("select no_akru as no_bukti, keterangan
					from dmt_akru_m where  kode_lokasi='$lokasi' and modul='AR'  ");
				$title = "Accru Piutang";
			break;
			case "03" :
				$sql->add("select count(no_ar) as tot from dmt_ar_m where  kode_lokasi='$lokasi' ");
				$sql->add("select no_ar as no_bukti, keterangan
				from dmt_ar_m where  kode_lokasi='$lokasi'   ");
				$title = "Invoice Piutang";
			break;
			case "04" :
				$sql->add("select count(no_akru) as tot from dmt_akru_m where  kode_lokasi='$lokasi'  and modul='AMOR' ");
				$sql->add("select no_akru as no_bukti, keterangan
					from dmt_akru_m where  kode_lokasi='$lokasi' and modul='AMOR'  ");
				$title = "Amortisasi ";
				
			break;
			case "05" :
				$sql->add("select count(no_kas) as tot from kas_m where kode_lokasi='$lokasi' ");
				$sql->add("select no_kas as no_bukti, keterangan
				from kas_m where  kode_lokasi='$lokasi'   ");
				$title = "Penerimaan ";
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
