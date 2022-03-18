<?php
$judul = "Detail Rekap";
$tahun = $_GET['tahun'];
$drk = $_GET['drk'];
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 



if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fIuran.php";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fIuran.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}


session_start();

$kode_lokasi=$_SESSION['lokasi'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_menu=$_SESSION['kodeMenu'];
if($kode_menu == "MOBILERW"){
    $filter = "";
}else{
    
    $filter = " and kode_pp='$kode_pp' ";
    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }
}

$tahun = date('Y');

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <div class='box-body'>
                <div class='row'>
                    <div class='col-md-1'><label>Tahun</label>
                    </div>
                    <div class='col-md-3'>
                        <select class='form-control input-sm selectize' id='dash_tahun' style='margin-bottom:5px;'>
                            <option value=''>Pilih Tahun</option>
                            <?php
                            
                            $sql= "select distinct (substring(periode,1,4)) as tahun from rt_bill_d where kode_lokasi='$kode_lokasi' and kode_jenis='IWAJIB' $filter order by substring(periode,1,4) desc ";
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
                    </div>
                    <div class='col-md-3 pull-right' style='text-align: right;'>
                        <span ><b>No Rumah :<span id='no_rumah'></span></b></span>
                    </div>
                </diV>
            </div>
        </div>
        <div class='content-iuran'>
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
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getTahunBill',
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
                    control.setValue('<?=date('Y')?>');
                }
            }
        });
    }

    // getTahun();


    function getDetailIuran(tahun){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getDetailIuran',
            dataType: 'json',
            data:{ 'tahun': tahun},
            success:function(result){   
                $('#no_rumah').html(result.no_rumah); 
                $('.content-iuran').html('');
                var html=`
                    <table class='table no-margin'>
                        <thead>
                        <tr>
                            <th width='25%' colspan='2' style='border-bottom: 1px solid white;'>Bulan</th>
                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Tagihan</th>
                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Terbayar</th>
                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Tgl Bayar</th>
                        </tr>
                        </thead>
                    <tbody>`;
                if(result.status){
                    var colors = ['#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F'];

                    var x=0;
                    for (var i=0;i<result.daftar.length;i++){
                        var line = result.daftar[i];
                        if(x % 2 == 1){
                            var clr=colors[1];
                        }else{
                            var clr=colors[2];
                        }
                        html+=`
                        <tr>
                            <td ><div style='width:30px;height:30px;color:`+clr+`;border:2px solid `+clr+`;border-radius:50%;background:`+clr+`'>OR9</div></td>
                            <td style='text-transform:uppercase'>`+line.periode+`</td>
                            <td style='text-align:right;color:`+clr+`'>Rp.  `+sepNum(line.bill)+`</td>
                            <td style='text-align:right;color:`+clr+`'>Rp. `+sepNum(line.bayar)+`</td>
                            <td style='text-align:right;color:`+clr+`'>`+line.tanggal+`</td>
                        </tr>`;
                        x++;
                    }
                }
                html+=`
                </tbody>
                </table>`;
                $('.content-iuran').html(html);
            }
        });
    }

    getDetailIuran('<?=$tahun?>');

    $('#dash_tahun').change(function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        getDetailIuran(tahun);
    });
</script>
          