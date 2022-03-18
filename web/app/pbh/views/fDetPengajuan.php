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
    $from=$request2[6];
    $box=$request2[7];

    // switch($box){
    //     case 'Bn' :
        $judul = 'Pengajuan';
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
        
        if($from == 'daftar'){
            $backto=$root_app."/mainmobile/fDetailInfo";
        }else{
            $backto=$root_app."/mainmobile/fHomeMobile";
        }
        $mobile=true;
        include_once($root.'/web/back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        if($from == 'daftar'){
            $back1="<div class='panel-heading'><a href='$root_app/main/fDetailInfo' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        
        }else{
            $back1="<div class='panel-heading'><a href='$root_app/main/fHomeMobile' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        
        }
        
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

        
        .timeline2 {
            position: relative;
            margin: 0 0 30px 0;
            padding: 0;
            list-style: none;
        }
        .timeline2:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #ddd;
            left: 31px;
            margin: 0;
            border-radius: 2px;
        }
        .timeline2 > li {
            position: relative;
            margin-right: 10px;
            margin-bottom: 15px;
        }
        .timeline2 > li:after {
            clear: both;
        }
        .timeline2 > li > .timeline2-item {
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            margin-top: 0;
            background: #fff;
            color: #444;
            margin-left: 60px;
            margin-right: 15px;
            padding: 0;
            position: relative;
            box-shadow: none;
        }
        .timeline2 > li > .timeline2-item > .time {
            color: #999;
            float: right;
            padding: 10px;
            font-size: 12px;
        }
        .timeline2 > li > .timeline2-item > .timeline2-header {
            margin: 0;
            color: #555;
            border-bottom: 1px solid #f4f4f4;
            padding: 10px;
            font-size: 16px;
            line-height: 1.1;
        }
        .timeline2 > li > .timeline2-item > .timeline2-header > a {
            font-weight: 600;
        }
        .timeline2 > li > .timeline2-item > .timeline2-body,
        .timeline2 > li > .timeline2-item > .timeline2-footer {
            padding: 10px;
        }
        .timeline2 > li > .fa,
        .timeline2 > li > .glyphicon,
        .timeline2 > li > .ion {
            width: 30px;
            height: 30px;
            font-size: 15px;
            line-height: 30px;
            position: absolute;
            color: #666;
            background: #d2d6de;
            border-radius: 50%;
            text-align: center;
            left: 18px;
            top: 0;
        }
        .timeline2 > .time-label > span {
            font-weight: 600;
            padding: 5px;
            display: inline-block;
            background-color: #fff;
            border-radius: 4px;
        }
        .timeline2-inverse > li > .timeline2-item {
            background: #f0f0f0;
            border: 1px solid #ddd;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .timeline2-inverse > li > .timeline2-item > .timeline2-header {
            border-bottom-color: #ddd;
        }
        .timeline2-body{
            border: 1px solid #0073b7;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            border-top-right-radius: 20px;
        }
        .box-wh{
            border: 1px solid #0073b7;
        }

    </style>
    <div class='panel' style='<?=$padding?>'>
		<div class='panel-body'>
            <?=$back1?>
            <div class='row'>
                <div class="col-md-12">
                    <center>
                        <h3 class='font-weight-light' style='color: #000000;margin-bottom:10px'>BBN-0719-00005</h3>
                    </center>
                </div>
                <div class='col-md-12'>
                    <div class='panel mar-mor box-wh'>
                        <div class='panel-body'>
                        <p style='padding-left:10px'>&nbsp;MTA</p>
                        <p style='padding-left:10px'>&nbsp;DRK</p>
                        <p style='padding-left:10px'>&nbsp;Nilai</p>
                        <p style='padding-left:10px'>&nbsp;Keterangan</p>
                        </div>
                    </div>
                </div>
                <div class='col-md-12'>
                    <ul class='timeline2'>
                        <li class='time-label'>
                            <span class='bg-blue'>
                            10 Feb. 2014
                            </span>
                        </li>
                        <li>
                            <i class='fa fa-check bg-green'></i>
                            <div class='timeline2-item '>
                                <span class='time'>Pembayaran</span>
                                <h3 class='timeline2-header'>&nbsp;</h3>
                                <div class='timeline2-body bg-blue'>
                                ...
                                Content goes here
                                </div>
                            </div>
                        </li>
                        <li class='time-label'>
                            <span class='bg-blue'>
                            10 Feb. 2014
                            </span>
                        </li>
                        <li>
                            <i class='fa fa-close bg-red'></i>
                            <div class='timeline2-item '>
                                <span class='time'>SPB</span>
                                <h3 class='timeline2-header'>&nbsp;</h3>
                                <div class='timeline2-body bg-blue'>
                                ...
                                Content goes here
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class='fa fa-clock-o bg-gray'></i>
                        </li>
                    </ul>
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
    </script>


        
  
