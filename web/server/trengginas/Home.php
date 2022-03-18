<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function getHome(){

        $result = array("message" => "", "rows" => 0, "status" => "" );

        $kode_lokasi=$_POST['kode_lokasi'];
        $path=$_POST['path'];
        $sql="select a.* from lab_konten_galeri a where a.jenis='Slider' and a.kode_lokasi='17'";

        $rs=execute($sql);

        while ($row = $rs->FetchNextObject(false)){
            $slider[] = (array)$row;
        } 

        $html="";
        for($i=0; $i<count($slider); $i++){
            if($i == 0){
                $sts = "active";
            }else{
                $sts = "";
            }
            $html.= "<li data-target='#main-slider' data-slide-to='$i' class='$sts'></li>";
        }

        $i = 0;
        $html2="";
        foreach($slider as $item){
            if($i == 0){
                $sts = "active";
            }else{
                $sts = "";
            }
            
            $url=$path."web".$item["file_gambar"];
            // echo $url;
            
            $html2.= "
            <div class='item $sts' style='background-image: url(".$url.");'>
                <div style='background-color: rgba(0, 0, 0, 0.3); position: absolute; top: 0; left: 0; width: 100%; height: 100%;'>
                </div>
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
        
        
        $result["daftar"]=$html;
        $result["daftar2"]=$html2;
        $result["status"]=true;
        echo json_encode($result);
    
    }

?>
