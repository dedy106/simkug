<?php
uses("services_Services");

class services_financial_Kota extends services_Services{
	
	function __construct()
	{
		parent::__construct();
		// $this->db = null;
		$this->db = $this->getDb();
    }
    function login($user, $pwd){

    }
    function listKota(){
        $db = $this->getDb();
        $result = array("rs" => array("rows" => array()));
        $rs = $db->execute("select id,id_provinsi,nama from amu_kota ");
        while ($row = $rs->FetchNextObject(false)){
            $result["rs"]["rows"][] = (array)$row;
        }
        return $result;
    }
	function findKota($filter){
        $db = $this->getDb();
        $result = array("rs" => array("rows" => array()));
        $rs = $db->execute("select id,id_provinsi,nama from amu_kota where ".$filter);
        while ($row = $rs->FetchNextObject(false)){
            $result["rs"]["rows"][] = (array)$row;
        }
        return $result;
    }
    function addKota($id,$id_provinsi, $nama){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("insert into amu_kota(id,id_provinsi,nama)values('$id','$id_provinsi','$nama')");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function ubahKota($id,$id_provinsi, $nama){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("update amu_kota set nama = '$nama',id_provinsi='$id_provinsi' where  id  = '$id' ");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function hapusKota($id){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("delete from amu_kota where  id = '$id'  ");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function getKota($id){
        $db = $this->getDb();
        
        $rs = $db->execute("select  id_provinsi,nama from amu_kota where id  = '$id' ");
        if ($row = $rs->FetchNextObject(false)){
             return $row->nama;
        }else 
        return "";
    }
	function listProv($kode_lokasi){
        $db = $this->getDb();
        $result = array("rs" => array("rows" => array()));
        $rs = $db->execute("select id,nama from amu_provinsi ");
        while ($row = $rs->FetchNextObject(false)){
            $result["rs"]["rows"][] = (array)$row;
        }
        return $result;
    }
	
}

?>