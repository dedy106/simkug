<?php
$judul = "Kartu Iuran";
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

$sql="select kode_rumah from hakakses where kode_lokasi='$kode_lokasi' and nik='$nik' ";
$rs2=execute($sql);
$kode_rumah=$rs2->fields[0];

$sqlBlok="select blok,rt from rt_rumah where kode_lokasi='$kode_lokasi' and kode_rumah='$kode_rumah' ";
$rs4=execute($sqlBlok);
$blok=$rs4->fields[0];
if($kode_pp == ""){

    $kode_pp=$rs4->fields[1];
}

if(isset($_GET['blok']) && $_GET['blok'] != ""){
    $blok = $_GET['blok'];
}else{
    $blok = $blok;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <div class='box-body'>
                <div class='row'>
                    <div class='col-md-1'>
                        <label>Blok</label>
                    </div>
                    <div class='col-md-3'>
                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                            <option value=''>Pilih Blok</option>
                        <?php
                            
                            $filter = " and kode_pp='$kode_pp' ";
                            $sql = "select blok from rt_blok where kode_lokasi='$kode_lokasi' $filter order by blok ";
                            $res = execute($sql);
                            
                            while ($row = $res->FetchNextObject(false)){
                                if($blok == $row->blok){
                                    $selected = "selected";
                                }else{
                                    $selected="";
                                }
                                echo " <option value=".$row->blok." $selected>".$row->blok."</option>";
                            }
                        ?>
                        </select>
                    </div>
                </diV>
            </div>
            <table class='table no-margin' id='table-kartu'>
                <thead>
                    <tr>
                        <th width='20%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                        <th width='40%'  style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                        <th width='40%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Total Bayar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
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

    function getBlok(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getBlok',
            dataType: 'json',
            // async:false,
            success:function(result){    
                var select = $('#dash_blok').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].blok, value:result.daftar[i].blok}]);   
                        }
                    }
                    if("<?=$blok?>" == ""){
                        control.setValue(result.blok);
                    }else{

                        control.setValue("<?=$blok?>");
                    }
                }
            }
        });
    }

    // getBlok();


    function getKartuIuran(blok =null){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getBayarIuranSat',
            dataType: 'json',
            async:false,
            data: {'blok':blok},
            success:function(result){    
                var html=``;
                $('#table-kartu tbody').html('');
                if(result.status){
                    var colors = ['#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F'];
                    var x=0; 
                    for (var i=0;i<result.daftar.length;i++)
                    {
                        var line = result.daftar[i];
                        if(x % 2 == 1){
                            clr=colors[1];
                        }else{
                            clr=colors[2];
                        }
                        html+=`<tr>
                            <td width='20%'><b>`+line.kode_rumah+`</b></td>
                            <td width='40%'style='text-align:right;color:`+clr+`'><b>Rp. `+sepNum(line.saldo)+`</b></td>
                            <td width='38%'style='text-align:right;color:`+clr+`'><b>Rp. `+sepNum(line.bayar)+`</b></td>
                            <td width='2%'><a class='btn btn-sm btn-primary' href='fMainMobile.php?hal=app/rtrw/fBayarDetailSat.php&kode_rumah=`+line.kode_rumah+`&blok=`+blok+`' style='cursor:pointer;'>Bayar</td>
                        </tr>`;
                        x++;
                    }
                }
                $('#table-kartu tbody').html(html);
            }
        });
    }

    getKartuIuran('<?=$blok?>');

    $('#dash_blok').change(function(e) { 
        e.preventDefault();
        var blok = $('#dash_blok').val();
        getKartuIuran(blok);
    });
</script>


                        