<section id="contact-info">
    <div class="center">                
        <h2 class="judul"></h2>
    </div>
    <div class="gmap-area">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center">
                    <div class="latitude" hidden>-6.88587</div>
                    <div class="longitude" hidden>107.612808</div>
                    <div id="map" style="height:100%; width:100%; min-width:200px; min-height:300px;">
                    </div>
                </div>

                <br>

                <div class="col-sm-5 map-content">
                    <address>
                        <div class="ket"></div>
                    </address>
                </div>
            </div>
        </div>
    </div>
</section>  <!--/gmap_area -->
<script>
function getKontak(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/Kontak.php&fx=getKontak',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                $('.judul').html(result.detail.judul);
                $('.latitude').html(result.detail.latitude);
                $('.longitude').html(result.detail.longitude);
                $('.ket').html(result.detail.keterangan);
            }
        }
    });
}

$(document).ready(function(){
    getKontak();
});
</script>