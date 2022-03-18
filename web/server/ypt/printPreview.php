<?php
    session_start();
    
    $root=$_SERVER["DOCUMENT_ROOT"];
    $root_app="http://".$_SERVER['SERVER_NAME']."/web/app/ypt";
    $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";
	$folder_css=$root2."/web/css";
	$folder_js=$root2."/web/js";
    $folder_img=$root2."/web/img";
    $root_img="http://".$_SERVER['SERVER_NAME'];
	
    include_once($root.'/web/lib/helpers.php');
    include_once($root.'/web/lib/koneksi.php');
    include_once($root.'/web/setting.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>SAI Front End Dev</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="<?=$folder_css?>/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="<?=$folder_css?>/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="<?=$folder_css?>/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="<?=$folder_css?>/AdminLTE.min.css">
    <!--SAI GLOBAL ADMIN CSS-->
    <link href="<?=$folder_css?>/sai.css" rel="stylesheet">

      <!-- jQuery 3 -->
    <script src="<?=$folder_js?>/jquery.min.js"></script>
    <script src="<?=$folder_js?>/additional_script.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body onload="window.print()">
	<div class="wrapper" style="width:auto; overflow: visible;">
		<!-- Main content -->
		<section class="invoice">    
		<?php
            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            $no_aju = $_GET['no_aju'];
            $tahun = substr($periode,0,4);
			$sql="select a.no_aju,a.kode_lokasi,convert(varchar(20),a.tanggal,105) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
            a.kode_drk,e.nama as nama_drk,a.no_app,convert(varchar(20),a.tanggal,108) as tgl2,
            f.user_input,f.nik_terima,g.nama as nama_terima
            from it_aju_m a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
            left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
            inner join it_ajuapp_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
            left join karyawan g on f.nik_terima=g.nik and a.kode_lokasi=g.kode_lokasi
            where a.no_aju='$no_aju' and a.kode_lokasi='$kode_lokasi' order by a.no_aju";
            // echo $sql;

            $rs = execute($sql);
            $row = $rs->FetchNextObject($toupper=false);

            $html = "<table width='800' border='0' cellspacing='2' cellpadding='1'>
            <tr align='center'>
              <td colspan='2' ><b>TANDA TERIMA DOKUMEN</b></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td width='200'>No Bukti</td>
              <td width='600'>: $row->no_app </td>
            </tr>
            <tr>
              <td width='200'>No Agenda</td>
              <td width='600'>: $row->no_aju </td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>: $row->tgl  $row->tgl2  </td>
            </tr>
            <tr>
              <td>PP</td>
              <td>: $row->kode_pp - $row->nama_pp </td>
            </tr>
            <tr>
              <td>MTA</td>
              <td>: $row->kode_akun - $row->nama_akun </td>
            </tr>
            <tr>
              <td>DRK</td>
              <td>: $row->kode_drk - $row->nama_drk </td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>: $row->keterangan </td>
            </tr>
            <tr>
              <td>Nilai</td>
              <td>: ".number_format($row->nilai,0,",",".")."</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
           
            <tr>
              <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
            </tr>
           
            <tr>
              <td>Dibuat Oleh : </td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                  <td width='400'>Yang Menerima </td>
                  <td width='400'>Yang Menyerahkan </td>
                </tr>
                <tr>
                  <td height='60'>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>$row->nama_terima</td>
                  <td>$row->user_input</td>
                </tr>
              </table></td>
            </tr>
          </table><br>";

			 echo $html;
		?>
			
		</section>
		<!-- /.content -->
	</div>
	<!-- ./wrapper -->
    
</body>
</html>
