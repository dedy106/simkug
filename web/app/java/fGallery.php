<section id="portfolio">
    <div class="container">
        <ul class="portfolio-filter text-center">
            <?php 
                
                $rs = execute("SELECT kode_ktg, nama FROM lab_konten_ktg where jenis='Gambar' and nama <> '-' and nama <> '_' and kode_lokasi='$kode_lokasi'");

                while ($row = $rs->FetchNextObject(false)){
                    $daftar_kategori[] = (array)$row;
                }              

                if(ISSET($daftar_kategori[0]["nama"])){
                    foreach($daftar_kategori as $kategori){
                        echo "<li><a class='btn btn-default' style='border:1px solid black;' href='#' data-filter='.".$kategori["kode_ktg"]."'>".$kategori["nama"]."</a></li>";
                    }
                }
            ?>
        </ul>

        <div class="row">
            <div class="portfolio-items">
                <center>
                    <?php
						$sql="SELECT a.nama, keterangan, file_gambar, tgl_input, b.kode_ktg as nama_ktg 
						FROM lab_konten_galeri a 
						inner join lab_konten_ktg b on a.kode_ktg=b.kode_ktg and a.kode_lokasi=b.kode_lokasi 
						where a.jenis='Galeri' and b.nama <> '-' and b.nama <> '_' and flag_aktif = '1' and a.kode_lokasi='$kode_lokasi'";
                        $rs2 = execute($sql);
						
                        while ($row2 = $rs2->FetchNextObject(false)){
                            $daftar_gambar[] = (array)$row2;
                        } 

                        foreach($daftar_gambar as $gambar){
							$path_file=$path."web".$gambar["file_gambar"];
                            echo "
                            <div class='portfolio-item ".$gambar["nama_ktg"]." col-xs-12 col-sm-4 col-md-3' style='padding:3px;'>
                                <div class='recent-work-wrap'>
                                    <div style='height:250px; background-image: url(".$path_file."); background-repeat:no-repeat; background-size:cover;'>
                                        <div style='height:20%; width:100%; position:absolute; bottom:0; background-color:black; opacity: 0.7;'>
                                            <center>
                                                <a style='color:white;' class='preview' href='".$path_file."' rel='prettyPhoto'>
                                                    <p>".$gambar["keterangan"]."</p>
                                                </a>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ";
                        
                        }
                    ?>
                </center>
            </div>
        </div>
    </div>
</section><!--/#portfolio-item-->