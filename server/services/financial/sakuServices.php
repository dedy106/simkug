<?php
uses("services_Services");

class services_financial_sakuServices extends services_Services{
	
	function __construct()
	{
		parent::__construct();
		// $this->db = null;
		$this->db = $this->getDb();
    }
    function login($user, $pwd){

    }
    function listAkun($lokasi){
        $db = $this->getDb();
        $result = array("rs" => array("rows" => array()));
        $rs = $db->execute("select kode_akun, nama from masakun where kode_lokasi = '$lokasi' ");
        while ($row = $rs->FetchNextObject(false)){
            $result["rs"]["rows"][] = (array)$row;
        }
        return $result;
    }
    function addAkun($lokasi, $kode, $nama){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("insert into masakun(kode_akun, nama, kode_lokasi)values('$kode','$nama','$lokasi')");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function ubahAkun($lokasi, $kode, $nama){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("update masakun set nama = '$nama' where  kode_lokasi = '$lokasi' and kode_akun  = '$kode' ");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function hapusAkun($lokasi, $kode, $nama){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $sql->add("delete from masakun where  kode_lokasi = '$lokasi' and kode_akun  = '$kode' ");

        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function getAkun($lokasi, $kode){
        $db = $this->getDb();
        
        $rs = $db->execute("select  nama from masakun where kode_lokasi = '$lokasi' and kode_akun  = '$kode' ");
        if ($row = $rs->FetchNextObject(false)){
             return $row->nama;
        }else 
        return "";
    }

}

?>