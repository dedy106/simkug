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
class server_app_eclaim3_dataProvider  extends server_ShareObject
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
		$tmp=explode("/",$filter);
		$lokasi=$tmp[0];
		$thn=$tmp[1];
		$nik=$tmp[2];
		$status=$tmp[3];
		$lok=$tmp[4];
		$sql = new server_util_arrayList();
		$state = "NEXT";
		$user_lok="";
		/*
		if ($status=="U")
		{
			$user_lok=" and a.kode_lok='$lok'";
		}
		*/
		$tahun=" and substring(a.periode,1,4)='$thn' ";
		
		switch($info){
			case "01" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='0' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='0' $user_lok $tahun   order by a.tanggal desc ");
				$title = "Laporan Awal Klaim";
			break;
			case "02" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='1' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='1' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Verifikasi";
			break;
			
			case "03" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='3' $user_lok $tahun");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='3' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Survey";
			break;
			case "04" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='4' $user_lok $tahun");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='4' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Pengetesan";
			break;
			
			case "05" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='6' $user_lok $tahun");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='6' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Negosiasi";
			break;
			case "06" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='7' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='7' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Kelengkapan Dokumen";
			break;
			case "07" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='8' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='8' $user_lok $tahun  order by a.tanggal desc ");
				$title = "Progress Pekerjaan";
			break;
			
			
			case "08" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='13' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='13' $user_lok $tahun  order by a.tanggal desc ");
				$title = "BAST";
			
			break;
			case "09" :
				$sql->add("select count(a.no_klaim) as tot from tlk_klaim a where a.kode_lokasi='$lokasi' and a.progress='15' $user_lok $tahun ");
				$sql->add("select a.no_klaim as no_bukti,replace(concat_ws(' ','Tanggal',date_format(a.tanggal,'%d/%m/%Y'),'Obyek',c.nama,'Penyebab',d.nama,'Lokasi',a.alamat),'&','') as keterangan	
						from tlk_klaim a
						inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
						inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
						where  a.kode_lokasi='$lokasi' and a.progress='15' $user_lok $tahun  order by a.tanggal desc ");
				$title = "No Claim";
				$state = "DONE";
			break;
			
		}
		$result = new server_util_Map();
		$result->set("info", $info);
		$result->set("title", $title);
		$result->set("state", $state);
		$result->set("data",  $this->dbLib->getMultiDataProvider($sql));
		return $result;
		
		
		return $this->dbLib->getMultiDataProvider($sql);
	}	
}
?>
