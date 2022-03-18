<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";		

    echo "<div class='panel'>
			<div class='panel-body'>
                <div class='panel-heading'>
                <a class='btn btn-default pull-right'>Lihat Detail Pesanan <i class='fa fa-angle-right'></i></a>
                </div>";
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                               
                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                    ";
                                    $sqltab="select distinct kode_klp,nama from brg_barangklp where kode_lokasi='$kode_lokasi' ";

                                    $rstab = execute($sqltab); 
                                    $i=0; 
                                    while ($rowt = $rstab->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                            echo"
                                            <li class='active'><a href='#tab_$rowt->kode_klp' data-toggle='tab'>$rowt->nama</a></li>";
                                        }else{
                                            echo"
                                            <li><a href='#tab_$rowt->kode_klp' data-toggle='tab'>$rowt->nama</a></li>";
                                        }
                                   
                                        $i++;
                                    }
                                    echo"
                                    </ul>
                                    <div class='tab-content'>";

                                    $sqltabpane="select distinct kode_klp from brg_barangklp where kode_lokasi='$kode_lokasi' ";

                                    
                                    // echo $sqltabpane;

                                    $rstabpane = execute($sqltabpane); 
                                    $i=0; 
                                    while ($rowtp = $rstabpane->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                             $class="active";
                                        }else{
                                             $class=" ";
                                        }

                                        echo"
                                        <div class='tab-pane $class' id='tab_$rowtp->kode_klp'>
                                      ";

                                        $sql="select * from brg_barang where kode_lokasi='$kode_lokasi' and kode_klp='$rowtp->kode_klp' ";

                                        // echo $sql;

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){
                                         $gambar= $path. "/server/media/".$row->file_gambar;

                                        echo"<a href='#' class='li-brg' style='cursor:pointer;'>
                                        <div class='box-footer box-comments' style='background:white'>
                                            <div class='box-comment'>
                                                <div class='li-img'>
                                                    <img class='img-circle img-sm' src='$gambar' alt='User Image'>
                                                </div>
                                                <div class='comment-text'>
                                                    <span class='username'>
                                                    $row->nama
                                                        <span class='text-muted pull-right'></span>
                                                    </span><!-- /.username -->
                                                    Rp. ".number_format($row->hna,0,",",".")."
                                                </div>
                                            </div>
                                        </div>
                                        </a>";
                                        }
                                        echo"
                                       
                                        </div>
                                        <!-- /.tab-pane -->";

                                        $i++;
                                    }
                                    
                                  echo"
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                       
                    
               
            
        echo"   
        </div>
    </div>";
    
    echo "<script type='text/javascript'>
    var i=1;                               
    $('.li-brg').click(function(){
        $('.box-comments').css('background' ,'#f39c12');
        $('.li-img').text('');
        $('.li-img').css({'box-sizing': 'border-box','color': 'rgb(21, 25, 27)','cursor': 'pointer','float': 'left','font-family': 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif','font-size': '14px','font-weight': '400','height': '30px','line-height': '30px','vertical-align': 'middle','background': '#d8d8d8','width': '30px','padding': '2px','border-radius': '50%','text-align':' center'});
        $('.li-img').text(i);
        $('.text-muted').html('<i class=\"fa fa-minus\"></i>');
        $('.text-muted').css({'background': '#d8d8d8','padding': '5px','border-radius': '50%','width': '30px','text-align': 'center'});
        i++;
    });
    $('.text-muted').click(function(){
        i--;
        i--;
        
    });          
	</script>";
?>
