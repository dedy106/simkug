<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $fmain=$_SESSION['fMain'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];

    $kode_fs="FS1";
    
    
    $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";

    $request = $_SERVER['REQUEST_URI'];
    $request2 = explode('/',$request);
    $box=$request2[6];

    switch($box){
        case "Bn" :
        $judul = "Modul Beban";
        break;
        case "Pj" :
        $judul = "Modul Panjar";
        break;
        case "Hn" :
        $judul = "Modul Honor";
        break;
        case "If" :
        $judul = "Modul IF";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

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
    <div class='panel' style='<?=$padding?>'>
		<div class='panel-body'>
            <?=$back1?>
            <div class='row'>
                <div class="col-md-12">
                    <h3>Progress Pembendaharaan</h3>
                </div>
                <ul class = 'nav nav-stacked2 dftrProgress' >
                </ul>
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
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>Pengajuan<span class='pull-right badge badge-pad  bg-blue' id='ajuBeban'>100</span></a></li>
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>Penyerahan Dokumen<span class='pull-right badge badge-pad bg-blue' id='serahDokBeban'>100</span></a></li>
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>Verifikasi Dokumen<span class='pull-right badge badge-pad  bg-blue' id='verDokBeban'>100</span></a></li>
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>Verifikasi Akun<span class='pull-right badge badge-pad  bg-blue' id='verAkBeban'>100</span></a></li>
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>SPB<span class='pull-right badge badge-pad  bg-blue' id='sPBBeban'>100</span></a></li>
                                <li><a href='#' style='color:black;border-bottom: 1px solid #efeeee;'>Pembayaran<span class='pull-right badge badge-pad bg-blue' id='PbyrBeban'>100</span></a></li>
                            `;
                        $('.dftrProgress').html(html);
                        break;
                    }
                }
            }
        });
    }
    var box = '<?php echo $box ?>';
    switch(box){
        case "Bn" :
        case "Pj" :
        case "Hn" :
        case "If" :
        function initDash(){
            loadService('getProgress','GET','<?php echo $root_ser.'/dashTelUPbh.php?fx=getTotalPiu'; ?>');  
        }
        break;      
    }
        initDash();
    </script>


        
  
