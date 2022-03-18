<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $fmain=$_SESSION['fMain'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];

    $kode_fs='FS1';
    
    
    $root_ser='http://'.$_SERVER['SERVER_NAME'].'/web/server/ypt';

    $request = $_SERVER['REQUEST_URI'];
    $request2 = explode('/',$request);
    $box=$request2[6];

    // switch($box){
    //     case 'Bn' :
        $judul = 'Daftar Pembendaharaan';
    //     break;
    //     case 'Pj' :
    //     $judul = 'Modul Panjar';
    //     break;
    //     case 'Hn' :
    //     $judul = 'Modul Honor';
    //     break;
    //     case 'If' :
    //     $judul = 'Modul IF';
    //     break;
    // }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo 'Browser:'.$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto=$root_app."/mainmobile/fHomeMobile";
        $mobile=true;
        include_once($root.'/web/back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$root_app/main/fHomeMobile' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

?>
    <style>
    
        .horizontal-scroll{
            height: 40px;
            margin-top: 0px;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            padding-top: 0px;
            padding-left: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar{
            display: none;
        }
        .nav-tabs-custom2 {
            margin-bottom: 20px;
            background: #fff;
            margin-top:0px;
        }
        .nav-tabs-custom2 > .nav-tabs {
            margin: 0;
            border-bottom: 0 !important;
            text-align:center;
        }
        .nav-tabs-custom2 > .nav-tabs > li {
            
            float:none !important;
            display:inline-block !important;
            zoom:1;
            border-radius: 15px;
            border: 1px solid #247ed5;
            margin-left: 6px;
            margin-right: 6px;
            width:110px;
        }
        .nav-tabs-custom2 > .nav-tabs > li.disabled > a {
            color: #777;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li > a {
            padding:6px !important; 
            color: black; 
            padding: 3px 20px !important; 
            width: 110px;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li > a.text-muted {
            color: #999;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li > a:hover {
            border:1px solid #247ed5; !important;
            border-radius:20px !important;
            background : #247ed5; !important;
            color:white !important;
            width: 110px;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:hover,
        .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:focus,
        .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:active {
            border-color: transparent;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li.active {
            border-top-color: #247ed5;
        }
        
        .nav-tabs-custom2 > .nav-tabs > li.active > a,
        .nav-tabs-custom2 > .nav-tabs > li.active:hover > a {
            background-color: #fff;
            color: white;
            border:1px solid #247ed5 !important;
            border-radius:20px !important;
            background : #247ed5 !important;
            width: 110px;
        }
        .kotakbiru{
            box-shadow: 1px 3px 8px -4px rgba(0,0,0,0.75);
            display: inline-block;
            border-left: 20px solid #31b395 !important;
            padding-left: 10px;
        }
        .kotakmerah{
            box-shadow: 1px 3px 8px -4px rgba(0,0,0,0.75);
            display: inline-block;
            border-left: 20px solid #dd4b39 !important;
            padding-left: 10px;
        }

    </style>
    <div class='panel' style='<?=$padding?>'>
		<div class='panel-body'>
            <?=$back1?>
            <div class='row'>
                <div class="col-md-12">
                    <div class="horizontal-scroll">
                        <div class='nav-tabs-custom2'>
                            <ul class='nav nav-tabs'>
                            <li class='active'><a data-toggle='tab' href='#home'>Semua</a></li>
                            <li><a data-toggle='tab' href='#menu1'>Peny. Dok</a></li>
                            <li><a data-toggle='tab' href='#menu2'>Ver. Dok</a></li>
                            <li><a data-toggle='tab' href='#menu2'>Ver. Akun</a></li>
                            <li><a data-toggle='tab' href='#menu1'>SPB</a></li>
                            <li><a data-toggle='tab' href='#menu2'>Pembayaran</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class='tab-content' style='margin-top:20px;padding-left:10px'>
                        <div id='home' class='tab-pane fade in active'>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakbiru'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#31b395;padding:10px' class='pull-right'><i class='fa fa-check-circle'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakmerah'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#dd4b39;padding:10px' class='pull-right'><i class='fa fa-close'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakbiru'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#31b395;padding:10px' class='pull-right'><i class='fa fa-check-circle'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakmerah'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#dd4b39;padding:10px' class='pull-right'><i class='fa fa-close'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakbiru'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#31b395;padding:10px' class='pull-right'><i class='fa fa-check-circle'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='info-box kotakmerah'>
                                        <h4 style='position:absolute'>BBN-11898897</h4> 
                                        <span style='color:#dd4b39;padding:10px' class='pull-right'><i class='fa fa-close'></i></span>
                                        <br>
                                        <h5 style='padding-top:10px'>Modul</h5>
                                        <h6>No Bukti Progress - NIK Pemrores</h6>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div id='menu1' class='tab-pane fade'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type='text/javascript'>
    function loadService(index,method,url,param=null){
        $.ajax({
            type: method,
            url: url,
            dataType: 'json',
            data: {'periode':'<?php echo $periode ?>','param':param},
            success:function(result){    
                if(result.status){
                    switch(index){
                        case 'getProgress' :
                        var html = `
                                `;
                        $('.dftrProgress').html(html);
                        break;
                    }
                }
            }
        });
    }
    var box = '<?php echo $box ?>';
    // switch(box){
    //     case 'Bn' :
    //     case 'Pj' :
    //     case 'Hn' :
    //     case 'If' :
        function initDash(){
            loadService('getProgress','GET','<?php echo $root_ser.'/dashTelUPbh.php?fx=getTotalPiu'; ?>');  
        }
    //     break;      
    // }
        initDash();
    $('.kotakbiru').click(function(){
        var jenis = 'daftar';
        window.location.href='<?=$root_app?>/mainmobile/fDetPengajuan/'+jenis;
    });
    $('.kotakmerah').click(function(){
        var jenis = 'daftar';
        window.location.href='<?=$root_app?>/mainmobile/fDetPengajuan/'+jenis;
    });
    </script>


        
  
