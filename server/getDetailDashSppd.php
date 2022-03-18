<?php

    global $dirSeparator;
    global $serverDir;
    if (!defined('NEW_LINE'))
        define("NEW_LINE", "<br>\r\n");

    define("WIN", "win");
    define("LINUX", "linux");
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
        $platform = WIN;
        $dirSeparator = "\\";
        $separator = ";";
    }
    else
    {
        $platform = LINUX;
        $dirSeparator = "/";
        $separator = ":";
    }
    error_reporting (E_ALL & ~E_NOTICE );

    $serverDir = __FILE__;

    global $rootDir;

    $pos = strrpos($serverDir, $dirSeparator);
    $serverDir = substr($serverDir, 0, $pos);
    $pos = strrpos($serverDir, $dirSeparator);
    $rootDir = substr($serverDir, 0, $pos);
    $pos = strrpos($rootDir, $dirSeparator);
    $path = $rootDir;
    $rootDir = substr($rootDir,$pos);

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }  

    function getDetail(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        $kode_lokasi=$_POST['kode_lokasi'];
        $periode=$_POST['periode'];
        $kode_pp=$_POST['kode_pp'];
        $nik=$_POST['nik'];
        $progress=$_POST['progress'];
        $no_bukti=$_POST['no_bukti'];
       
        if ($progress == "0") {
			$sql = "SELECT a.progress, a.no_spj as no_bukti, convert(varchar, d.tgl_mulai,103) as tglawal, convert(varchar, d.tgl_selesai,103) as tglakhir, f.kode_pp+' - '+f.nama as pp,
			a.nik_spj + ' - ' + b.nama as nik, a.nilai_trans, a.nilai_uhar, a.asal, isnull(c.catatan,'-') as catatan, e.keterangan, a.tempat
			FROM sp_spj_m a 
			INNER JOIN sp_perintah_m e on a.no_perintah = e.no_perintah and a.kode_lokasi=e.kode_lokasi
			INNER JOIN pp f on e.kode_pp = f.kode_pp and e.kode_lokasi = f.kode_lokasi
			INNER JOIN karyawan b ON a.nik_spj = b.nik AND a.kode_lokasi = b.kode_lokasi
			LEFT JOIN sp_spj_app_m c ON a.no_app1 = c.no_app
			INNER JOIN (SELECT no_spj, min(tgl_mulai) AS tgl_mulai, max(tgl_selesai) AS tgl_selesai FROM sp_spj_dh 
			WHERE kode_lokasi = $kode_lokasi GROUP BY no_spj) d ON a.no_spj = d.no_spj 
			WHERE a.no_spj = $no_bukti and a.kode_lokasi= $kode_lokasi";
		} else if ($progress == "1") {
			$sql = "SELECT a.progress, a.no_spj as no_bukti, convert(varchar, d.tgl_mulai,103) as tglawal, convert(varchar, d.tgl_selesai,103) as tglakhir, f.kode_pp+' - '+f.nama as pp,
			a.nik_spj + ' - ' + b.nama as nik, a.nilai_trans, a.nilai_uhar, a.asal, isnull(c.catatan,'-') as catatan, e.keterangan, a.tempat
			FROM sp_spj_m a 
			INNER JOIN sp_perintah_m e on a.no_perintah = e.no_perintah and a.kode_lokasi=e.kode_lokasi
			INNER JOIN pp f on e.kode_pp = f.kode_pp and e.kode_lokasi = f.kode_lokasi
			INNER JOIN karyawan b ON a.nik_spj = b.nik AND a.kode_lokasi = b.kode_lokasi
			LEFT JOIN sp_spj_app_m c ON a.no_app1 = c.no_app
			INNER JOIN (SELECT no_spj, min(tgl_mulai) AS tgl_mulai, max(tgl_selesai) AS tgl_selesai FROM sp_spj_dh 
			WHERE kode_lokasi = $kode_lokasi GROUP BY no_spj) d ON a.no_spj = d.no_spj 
			WHERE a.no_spj = $no_bukti and a.kode_lokasi= $kode_lokasi";
		} else if ($progress == "2") {
			$sql = "SELECT  a.progress, a.no_spj as no_bukti, convert(varchar, d.tgl_mulai,103) as tglawal, convert(varchar, d.tgl_selesai,103) as tglakhir, f.kode_pp+' - '+f.nama as pp,
			a.nik_spj + ' - ' + b.nama as nik, a.nilai_trans, a.nilai_uhar, a.asal, isnull(c.catatan,'-') as catatan, e.keterangan, a.tempat
			FROM sp_spj_m a 
			INNER JOIN sp_perintah_m e on a.no_perintah = e.no_perintah and a.kode_lokasi=e.kode_lokasi
			INNER JOIN pp f on e.kode_pp = f.kode_pp and e.kode_lokasi = f.kode_lokasi
			INNER JOIN karyawan b ON a.nik_spj = b.nik AND a.kode_lokasi = b.kode_lokasi
			LEFT JOIN sp_spj_app_m c ON a.no_app2 = c.no_app
			INNER JOIN (SELECT no_spj, min(tgl_mulai) AS tgl_mulai, max(tgl_selesai) AS tgl_selesai FROM sp_spj_dh 
			WHERE kode_lokasi = $kode_lokasi GROUP BY no_spj) d ON a.no_spj = d.no_spj 
			WHERE a.no_spj = $no_bukti and a.kode_lokasi= $kode_lokasi";
		}
        $rs = $dbLib->execute($sql);  

        // while($row = $rs->FetchNextObject($toupper = false)){
        //     $option[] = $row->no_bukti;
        // }

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] = $tmp;
        $result["status"] = $sts;
        $result["detail"] = $_POST['progress'];
        echo json_encode($result);
    }
    

?>
