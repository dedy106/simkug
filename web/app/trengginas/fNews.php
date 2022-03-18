<?php
    $strperiode="";
    if(ISSET($_GET['page'])){
        $tmp=explode("/",$_GET['page']);
        $page=intval($tmp[1]);
        if(ISSET($tmp[2]) AND ISSET($tmp[3]) ){
            $strperiode = "and month(tanggal) = ".$tmp[2]." and year(tanggal) = ".$tmp[3];
        }
    }else{
        $page=1;                        
    }
?>
<section id='blog' class='container'>
    <div class='blog'>
        <div class='row'>
            <div class='col-md-8 blog-isi'>
            </div><!--/.col-md-8-->

            <aside class="col-md-4">
                <div class="widget search">
                    <form role="form" action='fMainTrengginas.php?hal=app/trengginas/fSearch.php&param=news/string/1' method='GET'>
                        <input type="text" name='str' class="form-control search_box" autocomplete="on" placeholder="Search" required>
                    </form>
                </div><!--/.search-->

                <div class="widget categories">
                    <h3>Categories</h3>
                    <div class="row">
                        <div class="col-sm-6">
                            <ul class="blog_category">
                            </ul>
                        </div>
                    </div>                     
                </div><!--/.categories-->
                
                <div class="widget archieve">
                    <h3>Archive</h3>
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="blog_archieve">
                            </ul>
                        </div>
                    </div>                     
                </div><!--/.archieve-->
            </aside>  
        </div><!--/.row-->
    </div>
</section><!--/#blog-->
<script>

function getIsi(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/News.php&fx=getIsi',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>','str_periode':'<?php echo $strperiode ?>','page':'<?php echo $page ?>'},
        success:function(result){    
            if(result.status){
                $('.blog-isi').html(result.detail);
            }
        }
    });
}

function getCtg(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/News.php&fx=getCtg',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                $('.blog_category').html(result.detail);
            }
        }
    });
}

function getArchive(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/trengginas/News.php&fx=getArchive',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                $('.blog_archieve').html(result.detail);
            }
        }
    });
}

$(document).ready(function(){
    getIsi();
    getCtg();
    getArchive();
});
</script>
