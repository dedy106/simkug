<?php

// $tmp=explode("/",$_GET['param']);
// $content_id="11";
// $sql="select a.id, a.judul, a.tgl_input, a.nik_user, a.keterangan  
// from lab_konten a 
// where a.id='$content_id' and a.kode_lokasi='$kode_lokasi' ";

// // echo $sql;

// $rs=execute($sql);
// $detail=$rs->FetchNextObject($touper=false);
// $path_file=$path."web".$detail->header_url;

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
            <div class='col-md-12'>
                <div class="row ket" style="text-align: justify; text-justify: inter-word;">
                    
                </div>
            </div>
        </div>
    </div>
</section>
<script>
function getAbout(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/About.php&fx=getAbout',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                $('.judul').html(result.detail.judul);
                $('.ket').html(result.detail.keterangan);
            }
        }
    });
}

$(document).ready(function(){
    getAbout();
});
</script>