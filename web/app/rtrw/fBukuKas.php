<?php
$judul = "Buku Kas";
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 


if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fHome.php";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fHome.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}

session_start();

$kode_lokasi=$_SESSION['lokasi'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_menu=$_SESSION['kodeMenu'];

if(isset($_GET['tahun']) && $_GET['tahun'] != ""){
    $tahun = $_GET['tahun'];
}else{
    $tahun = date('Y');
}

if($kode_pp == ""){
    $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
    $res = execute($sql);
    $kode_pp = $res->fields[0];
}

$sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
$kode_akun = $sqlakun->fields[0];

if(isset($_GET['kode_akun']) && $_GET['kode_akun'] != ""){
    $kode_akun = $_GET['kode_akun'];
}else{
    $kode_akun = $kode_akun;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <div class='box-header'>
                <select class='form-control input-sm selectize' id='dash_tahun' style='margin-bottom:5px;'>
                    <option value=''>Pilih Tahun</option>
                    <?php
                    
                    // $getpp= execute("select kode_pp from karyawan where nik='$nik' ");
                    // $pp_rw = $getpp->fields[0];
                    $pp_rw = $kode_pp;
                    
                    $filter = "";
                    $sql="select distinct a.tahun from (select (substring(a.periode,1,4)) as tahun 
                    from gldt a 
                    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi ='$kode_lokasi' and a.kode_akun in (select a.kode_akun 
                    from relakun_pp a 
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
                    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi' ) 
                    ) a
                    order by a.tahun desc ";
                    $res = execute($sql);
                    
                    while ($row = $res->FetchNextObject(false)){
                        if($tahun == $row->tahun){
                            $selected = "selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->tahun." $selected>".$row->tahun."</option>";
                    }
                    ?>
                </select>
                <select class='form-control selectize' id='kode_akun' name='kode_akun'>
                    <option value=''>--- Pilih Akun ---</option>
                    <?php
                    

                    $sql="select a.kode_akun,a.nama 
                    from masakun a 
                    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$kode_pp'
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi'  
                    order by a.block,a.kode_akun ";
                    // $sql = "select a.kode_akun,a.nama 
                    // from masakun a
                    // inner join relakun_pp n on a.kode_akun=n.kode_akun and a.kode_lokasi=n.kode_lokasi
                    // inner join flag_relasi b on n.kode_akun=b.kode_akun and n.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
                    // where n.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi' ";
                    $res = execute($sql);
                    
                    while ($row = $res->FetchNextObject(false)){
                        if($kode_akun == $row->kode_akun){
                            $selected = "selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->kode_akun." $selected>".$row->kode_akun." - ".$row->nama."</option>";
                    }
                    ?>
                </select>
            </div>     
            <div class='box-body'>
                <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                    <p>Saldo Kas <span style='text-align:right' id='tahun'></span></p>
                    <h4 id='saldo_kas'></h4>
                    <p>Untuk informasi lebih lanjut hubungi Bendahara </p>                              
                </div>
                <h4> Riwayat Transaksi </h4>
            </div>
            <div class='riwayat_trans'>    
            </div>
        </div>
    </div>
</div>
<script>
    function sepNum(x){
        if(!isNaN(x)){
            var num = parseFloat(x).toFixed(0);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }else{
            return 0;
        }
    }

    
    function getTahun(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getTahun',
            dataType: 'json',
            success:function(result){    
                var select = $('#dash_tahun').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].tahun, value:result.daftar[i].tahun}]);   
                        }
                    }
                    control.setValue('<?=$tahun?>');
                }
            }
        });
    }

    // getTahun();

    function getAkun(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getAkun',
            dataType: 'json',
            success:function(result){    
                var select = $('#kode_akun').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].kode_akun +'-'+result.daftar[i].nama, value:result.daftar[i].kode_akun}]);   
                        }
                    }
                    if('<?=$kode_akun?>' != ''){
                        control.setValue('<?=$kode_akun?>');
                    }else{
                        control.setValue(result.kode_akun);
                    }
                }
            }
        });
    }

    // getAkun();

    function getRiwayat(tahun,kode_akun){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getRiwayatTrans',
            dataType: 'json',
            data:{ 'tahun': tahun,'kode_akun':kode_akun},
            success:function(result){    
                var html=``;
                
                $('.riwayat_trans').html('');
                if(result.status){
                    $('#saldo_kas').html(sepNum(result.saldo));
                    $('#tahun').html(result.tahun);
                    for(var i=0; i<result.daftar.length;i++){
                        var line = result.daftar[i];
                        var jenis2 = line.jenis.toUpperCase();
                        
                        if (jenis2 == "BK"){
                            var color="color:#dd4b39";
                            var gmbr="<?=$path?>/image/red4.png";
                        }else{
                            color="color:#01f400"; 
                            var gmbr="<?=$path?>/image/green4.png";
                        }
                        html+=`
                            <div class='box-footer box-comments' style='background:white'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' src='`+gmbr+`' alt='User Image'>
                                    <div class='comment-text'>
                                        <span class='username'>
                                            `+line.keterangan+`
                                            <span class='text-muted pull-right' style='`+color+`;font-size:14px'><b>Rp. `+sepNum(line.nilai1)+`</b></span>
                                        </span>
                                            Tanggal `+line.tgl+`
                                            <br/>
                                            `+line.no_bukti+`
                                    </div>
                                </div>
                            </div>`;

                    }
                    
                    html+=`<a href='#' id='view_more' style='cursor:pointer;' >
                        <div class='box-footer box-comments' style='background:white'>
                            <div class='box-comment'>
                                
                                <div class='comment-text'>
                                    <span class='username' style='text-align:center'>
                                        View More 
                                        <span class='text-muted pull-right' style='font-size:14px'><b></b><i class='fa fa-angle-right'></i></span>
                                    </span><!-- /.username -->
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>`;
                }
                $('.riwayat_trans').html(html);
            }
        });
    }

    getRiwayat('<?=$tahun?>','<?=$kode_akun?>'); 

    $('#dash_tahun').change(function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        var kode_akun = $('#kode_akun').val();
        getRiwayat(tahun,kode_akun);
    });

    $('#kode_akun').change(function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        var kode_akun = $('#kode_akun').val();
        getRiwayat(tahun,kode_akun);
    });

    $('.riwayat_trans').on('click','#view_more', function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        var kode_akun =$('#kode_akun').val();
        window.location.href = 'fMainMobile.php?hal=app/rtrw/fRiwayatTrans.php&kode_akun='+kode_akun+'&tahun='+tahun;
    });
</script>


                        