<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function simpanSaran(){

        $data=$_POST;

        // $sql="select isnull(max(id),0)+1 as id from lab_konten where kode_lokasi='".$_POST['kode_lokasi']."' ";
        // $rs1=execute($sql);

        // $id=$rs1->fields[0];

        $sql= "insert into lab_saran (kode_lokasi,tgl_input,nama,keterangan,email) values ('".$data['kode_lokasi']."',getdate(),'".$data['nama']."','".$data['keterangan']."','".$data['email']."') ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }	

        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["sql"] = $sql;
        echo json_encode($result);
    }
    
    function view(){
        $sql="select*from lab_konten_kontak where kode_lokasi='26'";
        $rs=execute($sql);
        while($row=$rs->FetchNextObject($toupper=false)){
            echo $row->judul;
        }
    }
    

?>
