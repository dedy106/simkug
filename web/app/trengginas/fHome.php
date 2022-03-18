<?php
    $path = "http://".$_SERVER["SERVER_NAME"]."/";
?>
<section id="main-slider" class="no-margin">
    <div class="carousel slide">
        <ol class="carousel-indicators">
        </ol>
        <div class="carousel-inner">
        </div><!--/.carousel-inner-->
    </div><!--/.carousel-->
    <a class="prev hidden-xs" href="#main-slider" data-slide="prev">
        <i class="fa fa-chevron-left"></i>
    </a>
    <a class="next hidden-xs" href="#main-slider" data-slide="next">
        <i class="fa fa-chevron-right"></i>
    </a>
</section>
<!--/#main-slider-->
<script>

function getHome(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/Home.php&fx=getHome',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>','path':'<?php echo $path; ?>'},
        success:function(result){    
            if(result.status){
                $('.carousel-indicators').html(result.daftar);
                $('.carousel-inner').html(result.daftar2);
            }
        }
    });
}

$(document).ready(function(){
    getHome();
});
</script>