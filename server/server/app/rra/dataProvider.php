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
class server_app_rra_dataProvider  extends server_ShareObject
{
	var $dbLib;
	var $config;
	function __construct($config = null)
	{
		parent::__construct();							
		$this->config = $config;		
		$this->onChange->set($this,"getMsg");		
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("config", "string", $this->config);		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}	
	
	function alert($lokasi, $info = null, $filter = null){			
		sleep(3);		
		$this->dbLib = new server_DBConnection_dbLib($this->config);	
		$sql = new server_util_arrayList();
		$state = "next";
		if (!isset($user)) $user = "";
		//error_log($filter);
		switch ($info){
			case "APPDRAFT":
				$sql->add("select count(no_pdrk) as tot from rra_pra_m  a where progress = '0' and kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select no_pdrk as no_bukti,keterangan, jenis_agg as  jenis from rra_pra_m a where progress = '0' and kode_lokasi = '".$lokasi."' $filter");
				$title = "Draft perlu approve";
			break;
			case "DRAFT":							
				$sql->add("select count(*) as tot from rra_pra_m where progress='1' and  a.kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan,  a.jenis_agg as  jenis from rra_pra_m a where progress='1' and  a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Draft yang belum ter-submit";
			break;
			case "REVUBIS":
				$sql->add("select count(no_pdrk) as tot from rra_pdrk_m  a where progress = '0' and kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select no_pdrk as no_bukti,keterangan, jenis_agg as  jenis from rra_pdrk_m a where progress = '0' and kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu review ubis";
			break;
			case "APPUBIS":							
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '-' where  a.kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan,  a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where  a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Approval Pengelola Anggaran";
			break;
			case "APPUBIS2":							
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where  a.kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan,  a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where  a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Approval Penanggung Jawab Program";
			break;			
			case "REVKEEPSAP":
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'REV' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'GREV' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis,'MREV' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='-' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu Review Sebelum Keep SAP";
			break;			
			case "KEEPSAP":			
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'REV' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'GREV' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis,'MREV' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='0' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu Keep SAP";
			break;			
			case "UPDSAP":
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'REV' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'GREV' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'MREV' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.flag_rfc='1' and a.progress='5' and a.kode_lokasi='".$lokasi."' $filter) a");						
				$title = "Perlu Update SAP";
			break;			
			case "REVGBIS":
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '1' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter"); 
				$sql->add("select a.no_pdrk, a.keterangan, a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '1' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Review Group Bisnis";
			break;
			case "APPGBIS":
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_grev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter");
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan, a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_grev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Approval Group Bisnis";
			break;
			case "REVFC":
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'REV' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'GREV' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis , 'MREV' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='1' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu Review FC";
			break;			
			case "APPFC":
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'REV' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'GREV' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'MREV' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='2' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu Approval FC";
			break;			
			case "SUKKA":				
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter ".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'SUKKA-UBIS' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter ".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis,  'SUKKA-GUBIS' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'SUKKA-MA' as posisi ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='3' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu dibuatkan SUKKA";
			break;			
			case "APPSK":
				$sql->add("select count(*) as tot from (select a.no_rev  ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_grev ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_mrev ".
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter) a");
				$sql->add("select jenis, no_bukti, no_dokumen, keterangan from (select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'APP-UBIS' as posisi ".
						 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'APP-GBUIS' as posisi ".
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter".
						 " union ".										 
						 "select a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan, a.jenis_agg as  jenis, 'APP-MA' as posisi ".						 
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi ".
						 "	inner join rra_sukka c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi ".
						 "where a.sts_pdrk='RRR' and a.progress ='4' and a.kode_lokasi='".$lokasi."' $filter) a");
				$title = "Perlu Approval SUKKA";
			break;			
			case "REVMA":
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_grev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '1' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."'");
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan, a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_grev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '1' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Review MA";
			break;			
			case "APPMA":
				$sql->add("select count(*) as tot from rra_pdrk_m a inner join rra_mrev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."'"); 
				$sql->add("select a.no_pdrk as no_bukti, a.keterangan, a.jenis_agg as  jenis from rra_pdrk_m a inner join rra_mrev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.progress = '0' where a.progress = '1' and a.sts_pdrk ='ABT' and a.kode_lokasi = '".$lokasi."' $filter");
				$title = "Perlu Approve MA";
				$state = "done";
			break;
		}
		//error_log("select count(no_pdrk) as tot from rra_pdrk_m  a where progress = '0' and kode_lokasi = '".$lokasi."' $filter");
		$result = new server_util_Map();
		$result->set("info",$info);
		$result->set("title",$title);
		$result->set("state",$state);
		$result->set("data",$this->dbLib->getMultiDataProvider($sql));
		return $result;
	}	
	function getMsg($sender, $shareName, $result = null){//user, $lokasi
		try{
			$tmp = explode(",",$result);
			$user = $tmp[0];
			$lokasi = $tmp[1];			
			$this->dbLib = new server_DBConnection_dbLib($this->config);	
			$sql = new server_util_arrayList(array(
			"select a.no_pesan, a.kode_lokasi, to_char(a.tanggal,'DD-MM-YYYY HH24:MI') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran 
				from rra_pesan a  where a.penerima = '".$user."' and a.kode_lokasi = '".$lokasi."' order by a.tanggal desc ",
			"select a.no_pesan, a.kode_lokasi, to_char(a.tanggal,'DD-MM-YYYY HH24:MI') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran 
				from rra_pesan a where a.pengirim = '".$user."' and a.kode_lokasi = '".$lokasi."' order by a.tanggal desc "));
			$res = $this->dbLib->getMultiDataProvider($sql);			
			return $res;	
		}catch(Exception $e){
			error_log($e->getMessage());
			return $e->getMessage();
		}
	}

}
?>
