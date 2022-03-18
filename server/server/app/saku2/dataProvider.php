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
class server_app_saku2_dataProvider  extends server_ShareObject
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
				$sql->add("select count(no_ju) as tot from ju_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' ");
				$sql->add("select no_ju as no_bukti,keterangan from ju_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' ");
				$title = "Jurnal Umum";
			break;
			case "02" :
				$sql->add("select count(no_kas) as tot from kas_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'");
				$sql->add("select no_kas as no_bukti,keterangan from kas_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' ");
				$title = "Kas Bank";
			break;
			case "03" :
				$sql->add("select count(no_ptg) as tot from ptg_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'");
				$sql->add("select no_ptg as no_bukti,keterangan from ptg_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' ");
				$title = "Pertanggunagn Panjar";
			break;
			case "04" :
				$sql->add("select count(no_fasusut) as tot from fasusut_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'");
				$sql->add("select no_fasusut as no_bukti,keterangan from fasusut_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' ");
				$title = "Penyusutan Asset";
			break;
			case "05" :
				$sql->add("select count(no_valid) as tot from yk_valid_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' and modul <> 'VALID'");
				$sql->add("select no_valid as no_bukti,keterangan from yk_valid_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode' and modul <> 'VALID'");
				$title = "Validasi";
			break;
			case "06" :
				$sql->add("select count(no_bukti) as tot
				from (select no_hutang as no_bukti,keterangan from yk_hutang_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
				union all
				select no_rekon as no_bukti,keterangan from yk_rekon_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
					 )a
				");
				$sql->add("select a.no_bukti,a.keterangan
				from (select no_hutang as no_bukti,keterangan from yk_hutang_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
				union all
				select no_rekon as no_bukti,keterangan from yk_rekon_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
					 )a");
				$title = "Hutang Kesehatan";
				
			break;
			case "07" :
				$sql->add("select count(no_bukti) as tot
				from (select no_kirim as no_bukti,keterangan from takkirim_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
				union all
				select no_terima as no_bukti,keterangan from takterima_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
					 )a");
				$sql->add("select a.no_bukti,a.keterangan
				from (select no_kirim as no_bukti,keterangan from takkirim_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
				union all
				select no_terima as no_bukti,keterangan from takterima_m where posted='F' and kode_lokasi='$lokasi' and periode='$periode'
					 )a");
				$title = "TAK Kirim";
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
