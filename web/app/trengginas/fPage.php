<?php


$tmp=explode("/",$_GET['param']);
$content_id=$tmp[0];

?>
<section>
    <div class="container">
		<div class='row'>
            <div class='col-md-12'>
                <center>
                    <h2 class="text-primary judul"></h2>
                </center>
            </div>
			<div class='col-md-12'>
                <hr style="margin-center: 0;text-align: left;width: 50%;"/>
            </div>
        </div>
        <div class='row'>
            <div class='col-md-6'>
                <center>
                    <div class='img-block'></div>
                </center>
            </div>
            <div class='col-md-6'>
                <div class="row ket" style="text-align: justify; text-justify: inter-word;">
                </div>
            </div>
        </div>
    </div>
</section>
<script>

function getPage(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/Page.php&fx=getPage',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>','content_id':'<?php echo $content_id ?>'},
        success:function(result){    
            if(result.status){
                $('.judul').html(result.detail.judul);
                $('.img-block').html(result.path_file);
                $('.ket').html(result.detail.keterangan);
            }
        }
    });
}

$(document).ready(function(){
    getPage();
});
</script>