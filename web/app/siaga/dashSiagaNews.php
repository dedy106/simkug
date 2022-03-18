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

        $sql="select a.id as no_konten, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as file_dok, c.file_type 
        from lab_konten a 
        left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
        left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
        where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' and a.id='$no_konten'
        order by tanggal desc ";
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
					"<a class='small-box-footer' href='fMain.php?hal=app/siaga/dashSiaga.php' > Back <i class='fa fa-arrow-circle-left'></i></a>";
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
