<section id="main-slider" class="no-margin">
    <div class="carousel slide">
        <ol class="carousel-indicators">
            <?php

                $path = "http://".$_SERVER["SERVER_NAME"]."/";	

                $sql="select a.* from lab_konten_galeri a where a.jenis='Slider' and a.kode_lokasi='$kode_lokasi'";

                $rs=execute($sql);

                while ($row = $rs->FetchNextObject(false)){
                    $slider[] = (array)$row;
                } 


                for($i=0; $i<count($slider); $i++){
                    if($i == 0){
                        $sts = "active";
                    }else{
                        $sts = "";
                    }
                    echo "<li data-target='#main-slider' data-slide-to='$i' class='$sts'></li>";
                }
            ?>
        </ol>
        <div class="carousel-inner">
            <?php
                $i = 0;
                foreach($slider as $item){
                    if($i == 0){
                        $sts = "active";
                    }else{
                        $sts = "";
                    }

                    $url=$path."web".$item["file_gambar"];
                    // echo $url;

                    echo "
                        <div class='item $sts' style='background-image: url(".$url.");'>

                            <div style='background-color: rgba(0, 0, 0, 0.3); position: absolute; top: 0; left: 0; width: 100%; height: 100%;'></div>

                            <div class='container'>
                                <div class='row slide-margin'>
                                    <div class='col-sm-6 pull-right'>
                                        <div class='carousel-content'>
                                            <div align='right'>
                                                <h1 class='animation animated-item-1'>".$item["nama"]."</h1>
                                                <h2 class='animation animated-item-2'>".$item["keterangan"]."</h2>
                                            </div>
                                            <a class='btn-slide animation animated-item-3 pull-right' href='#'>Read More</a>
                                        </div>
                                    </div>

                                    <!--<div class='col-sm-6 hidden-xs animation animated-item-4'>
                                        <div class='slider-img'>
                                            <img src='".$url."' class='img-responsive'>
                                        </div>
                                    </div>-->

                                </div>
                            </div>
                        </div>
                    ";

                    $i++;
                }
            ?>
        </div><!--/.carousel-inner-->
    </div><!--/.carousel-->
    <a class="prev hidden-xs" href="#main-slider" data-slide="prev">
        <i class="fa fa-chevron-left"></i>
    </a>
    <a class="next hidden-xs" href="#main-slider" data-slide="next">
        <i class="fa fa-chevron-right"></i>
    </a>
</section><!--/#main-slider-->