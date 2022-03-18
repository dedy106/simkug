<section id="portfolio">
    <div class="container">
        <ul class="portfolio-filter text-center">
            
        </ul>

        <div class="row">
            <div class="portfolio-items">
                
            </div>
        </div>
    </div>
</section><!--/#portfolio-item-->
<script>

function getGaleri(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/Galeri.php&fx=getGaleri',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                $('.portfolio-filter').html(result.daftar);
                $('.portfolio-items').html(result.daftar2);
            }
        }
    });
}

$(document).ready(function(){
    getGaleri();
});
</script>