<?php


$tmp=explode("/",$_GET['param']);
$content_id=$tmp[0];
$sql="select a.id, a.judul, b.file_gambar as header_url, a.tgl_input, a.nik_user, a.keterangan  
from lab_konten a 
left join lab_konten_galeri b on a.header_url=b.id and a.kode_lokasi=b.kode_lokasi
where a.id='$content_id' and a.kode_lokasi='$kode_lokasi' ";
$rs=execute($sql);
$detail=$rs->FetchNextObject($touper=false);
$path_file=$path."web".$detail->header_url;

?>
<section>
    <div class="container">
		<div class='row'>
            <div class='col-md-12'>
                <center>
                    <h2 class="text-primary"><?php echo $detail->judul; ?></h2>
                </center>
            </div>
			<div class='col-md-12'>
                <hr style="margin-center: 0;text-align: left;width: 50%;"/>
            </div>
        </div>
        <div class='row'>
            <div class='col-md-6'>
                <center>
                    <img src='<?php echo $path_file;?>' class='img-responsive'>
                </center>
            </div>
            <div class='col-md-6'>
                <div class="row" style="text-align: justify; text-justify: inter-word;">
                    <?php echo $detail->keterangan; ?>
                </div>
            </div>
        </div>
    </div>
</section>