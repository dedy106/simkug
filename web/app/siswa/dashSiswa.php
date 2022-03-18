<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $nik2=str_replace("a","",$nik);
	
	/*
    $sql="select kode_pp from karyawan where kode_lokasi = '$kode_lokasi' and nik ='$nik2' ";
    $rs = execute($sql);
    $kode_pp=$rs->fields[0];
	*/
	
    $sql3="select top 6 no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten where kode_lokasi = '$kode_lokasi' ";
    $rs3 = execute($sql3);
	
    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $bp = $path . "image/inv2.png";
    $keu = $path . "image/keu.jpg";
    $kldr = $path . "image/kldr.png";
    $kldr2 = $path . "image/kldr2.jpg";
    $absen = $path . "image/absen.png";
    $nil = $path . "image/nilai.png";
    $notifikasi= $path . "image/notif.png";
    $dok = $path . "image/dok.png";
    $user = $path . "image/user2.png";
    $pres = $path . "image/prestasi.png";
    $raport = $path . "image/raport.png";

    $eskul = $path . "image/eskul.png";
 
	echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                                <ul class='users-list clearfix'>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/bp' ><img src='$bp' width='80px' alt='User Image'><br>
                                        Buku Penghubung</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;'  href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/keu'><img src='$keu' width='80px'  alt='User Image'><br>
                                        Keuangan</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/ka'><img src='$kldr' width='80px'  alt='User Image'><br>
                                        Kalender Akademik</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/abs' ><img src='$absen' width='80px' alt='User Image'><br>
                                        Absensi</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/nil'><img src='$nil' width='80px' alt='User Image'><br>
                                        Nilai</a>
                                    </li> 
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/kld'><img src='$kldr2' width='80px' alt='User Image'><br>
                                        Kalender</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/prestasi'><img src='$pres' width='80px' alt='User Image'><br>
                                        Prestasi</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/raport'><img src='$raport' width='80px' alt='User Image'><br>
                                        Raport</a>
                                    </li>
                                    <li width='120px'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=all/eskul'><img src='$eskul' width='80px' alt='User Image'><br>
                                        Ekstrakulikuler</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Info</h3>                      
                            <div class='box-tools pull-right'>
                                <a type='button' class='btn btn-box-tool' style='cursor:pointer;' href='fMain.php?hal=app/rtrw/dashSiswaDet.php&param=all/news'> See More
                                </a>
                            </div>
                        </div>
                        <div class='box-body'>";

                        while ($row = $rs3->FetchNextObject($toupper=false)){
                            $foto= $path."server/media/".$row->file_dok;
                        echo "
                            <a style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaNews.php&param=$row->no_konten/news'>
                            <div class='col-md-12 col-md-2'>
                                <div class='box box-widget widget-user'>
                                    <div class='widget-user-header bg-black' style='background: url($foto) center center;'>
                                        <h3 class='widget-user-username'></h3>
                                        <h5 class='widget-user-desc'></h5>
                                    </div>
                                    <div class='box-footer'>
                                        <h5 class='description-header'>$row->judul</h5>
                                        <span class='description-text'>$row->tgl</span>
                                    </div>
                                </div>
                            </div> 
                            </a>
                            ";
                        }
                        echo"
                        </div>";            
        echo"       </div> 
                </div>                
            </div>
       </div>";     
                		
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
