<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $tmp=explode("/",$_GET['param']);
    $no_konten=$tmp[0];
    $jenis=$tmp[1];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $path2 = $path . "image/keubg.png";
    
	switch($jenis){
		case "news" :

		$sql="select no_konten,judul,keterangan,file_dok,convert(varchar,tanggal,105) as tanggal from sis_konten where kode_lokasi='$kode_lokasi' and flag_aktif='1' and no_konten='$no_konten' ";
			// $back="server_report_saku3_dash_rptDashSis";

		break;
		case "bp" :
		$sql="select no_bukti as konten,jenis as judul,keterangan,file_gambar as file_dok,convert(varchar,tanggal,105) as tanggal from sis_bp where kode_lokasi='$kode_lokasi' and no_bukti='$no_konten' ";

		break;
    }
    
        
        $rs = execute($sql);  
        $row = $rs->FetchNextObject($toupper=false);

        $judul = $row->judul;
        $keterangan =$row->keterangan;
        $file_dok= $path. "server/media/".$row->file_dok;
        $tanggal=$row->tanggal;
        
		echo "<div class='panel'>
				<div class='panel-body'>
					<div class='panel-heading'>";
				switch($jenis){
				case "news" :
				echo
					"<a class='small-box-footer' href='fMain.php?hal=app/siswa/dashSiswa.php' > Back <i class='fa fa-arrow-circle-left'></i></a>";
				break;
				case "bp" :
					echo
					"<a href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=$jenis/bp' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>";
				break;
				}
						

            echo "</div>";
            echo"<h3>$judul</h3>";
            echo"<h4>$tanggal</h4>";
            echo"<img src='$file_dok' width='250px'></img>";
            echo"<p>".urldecode($keterangan)."</p>";
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>
            
              </script>";

?>
