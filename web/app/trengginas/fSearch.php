<?php
     $konten="";
     $jenis="";
     $str="";
     $page=1;
     if(ISSET($_GET['param'])){
         $tmp=explode("/",$_GET['param']);
         $konten=$tmp[0];
         $jenis=$tmp[1];
         $str=$tmp[3];
         $page=intval($tmp[2]);
     
     }

     $search_string = $str;
?>
<section id='blog' class='container'>
    <div class='blog'>
        <div class='row search-isi'>   
        </div>
        <div class='row'>
            <div class='col-xs-12 paging'>
            </div>
        </div>
    </div>
</section>
<script>
function getSearch(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/News.php&fx=getSearch',
        dataType: 'json',
        data: {
            'kode_lokasi':'<?php echo $kode_lokasi ?>',
            'konten':'<?php echo $konten ?>',
            'jenis' :'<?php echo $jenis ?>',
            'str'   :'<?php echo $str ?>',
            'page'  :'<?php echo $page ?>'
        },
        success:function(result){    
            if(result.status){
                $('.search-isi').html(result.detail);
                $('.paging').html(result.paging);
            }
        }
    });
}

$(document).ready(function(){
    getSearch();
});
</script>
