<section id="contact-info">
    <div class="center">                
        <h2><?php 
         $rs = execute("SELECT judul, keterangan, latitude, longitude FROM lab_konten_kontak a where flag_aktif='1' and a.kode_lokasi='$kode_lokasi' ");

         $kontak = $rs->FetchNextObject($touper=false);

        echo $kontak->judul; ?></h2>
    </div>
    <div class="gmap-area">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center">
                    <div class="latitude" hidden><?php echo $kontak->latitude; ?></div>
                    <div class="longitude" hidden><?php echo $kontak->longitude; ?></div>
                    <div id="map" style="height:100%; width:100%; min-width:200px; min-height:300px;">
                    </div>
                    <!--<div id="google-map" style="height:100%;" data-latitude="-6.9781136" data-longitude="107.6376553"></div>-->
                </div>

                <br>

                <div class="col-sm-5 map-content">
                    <address>
                        <?php echo $kontak->keterangan; ?>
                    </address>
                </div>
            </div>
        </div>
    </div>
</section>  <!--/gmap_area -->