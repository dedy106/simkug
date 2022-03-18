<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptGajiFix extends server_report_basic
{	
	function getTotalPage(){
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql = "select * from agg_gaji_m  " . $this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml(){
		global $dbLib;
		$rs = $dbLib->execute("select b.kode_param, b.nama, b.jns_periode  from agg_gaji_m a 
					inner join agg_param b on b.tahun = a.tahun and b.kode_lokasi = a.kode_lokasi and b.jenis = 'PDPT' 
					". $this->filter." order by no_urut");
		$param = array();
		while ($row = $rs->FetchNextObject(false)){
			$param[count($param)] = $row->kode_param;
		}
		
		$sql = "select c.nik, c.nama, case when c.jenis_agg='E' then 'EXIST' when c.jenis_agg='P' then 'ESTIMASI' else 'TAMBAH' end as jenis_agg, c.kode_pp, c.kode_band,c.kode_loker, c.kode_jab, c.kode_kota,
					d.idx as idx,  datediff(month, c.tgl_masuk, getDate())  as mk, c.status, c.status_org";		
		foreach($param as $key => $value){
			$sql .= ", sum(b.$value) as $value";
		}	
		$sql = "from agg_gaji_m a 
					inner join agg_gaji_d b on b.no_gaji = a.no_gaji and b.kode_lokasi = a.kode_lokasi 
					inner join agg_karyaran c on c.nik = b.nik and c.kode_lokasi = b.kode_lokasi
					inner join agg_kota d on d.kode_kota = c.kode_kota ". $this->filter . " group by c.nik. c.nama, c.jenis_agg, c.kode_pp, c.kode_band, c.kode_loker, c.kode_jab, c.kode_kota, d.idx, c.tgl_masuk, c.status. c.status_org ";
		
		$rs = $this->execute(sql);
		
		
	}	

}
