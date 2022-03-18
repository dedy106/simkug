<?php 
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";

    // $sql = "select a.kode_menu_lab as kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok, 
    //      c.kode_pp,d.nama as nama_pp,
    //      b.kode_lokkonsol,d.kode_bidang, c.foto,isnull(e.form,'-') as path_view,b.logo
    //      from hakakses a 
    //      inner join lokasi b on b.kode_lokasi = a.kode_lokasi 
    //      left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
    //      left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi 
    //      left join m_form e on a.menu_mobile=e.kode_form 
    //      where a.nik= 'okta'";
    // $rs  = execute($sql);
    // $row = $rs->FetchNextObject($toupper=false); 

     if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
            <div class='box' style='border-top: none; border-bottom: none;'>
                <div class='box-header'>
                    <div style='display: inline-block; background-color: #FFFFFF; width: 100%;'>
                    <img src='/web/img/logo.png' alt='logo' style='vertical-align: middle; max-width: 3rem; max-height: 3rem; margin-left: 0;'>
                        <div style='vertical-align: middle; display: inline-block; background-color: #FFFFFF;'>
                        <span style='font-weight: bold; font-size: 1.2rem;'>Nama Perusahaan</span>
                       </div>
                    <p style='text-align: right; color: #A1A1A1; font-size: 1rem; margin-bottom:-20px;'>Periode (".$periode.")</p>
                    </div>
                </div>
            </div>
            </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    
    echo $header;
?>
<style>
.nav-tabs-custom {
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px
}

.nav-tabs-custom>.nav-tabs {
    margin: 0;
    border-bottom-color: #f4f4f4;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

.nav-tabs-custom>.nav-tabs>li {
    border-bottom: 2px solid transparent;
    margin-bottom: -4px;
    margin-right: 5px
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li>a {
    color: #444;
    border-radius: 0
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li>a.text-muted {
    color: #999
}

.nav-tabs-custom>.nav-tabs>li>a,
.nav-tabs-custom>.nav-tabs>li>a:hover {
    background: transparent;
    margin: 0
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li>a:hover {
    color: #999
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li:not(.active)>a:hover,
.nav-tabs-custom>.nav-tabs>li:not(.active)>a:focus,
.nav-tabs-custom>.nav-tabs>li:not(.active)>a:active {
    border-color: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li.active {
    border-bottom-color: #3c8dbc;
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li.active>a,
.nav-tabs-custom>.nav-tabs>li.active:hover>a {
    background-color: #fff;
    color: #444
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li.active>a {
    border-bottom-color: transparent;
    border-left-color: #f4f4f4;
    border-right-color: #f4f4f4
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li:first-of-type {
    margin-left: 0
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs>li:first-of-type.active>a {
    border-left-color: transparent
    border-top: none;
    border-right: none;
    border-left: none;
}

.nav-tabs-custom>.nav-tabs.pull-right {
    float: none !important
}

.nav-tabs-custom>.nav-tabs.pull-right>li {
    float: right
}

.nav-tabs-custom>.nav-tabs.pull-right>li:first-of-type {
    margin-right: 0
}

.nav-tabs-custom>.nav-tabs.pull-right>li:first-of-type>a {
    border-left-width: 1px
}

.nav-tabs-custom>.nav-tabs.pull-right>li:first-of-type.active>a {
    border-left-color: #f4f4f4;
    border-right-color: transparent
}

.nav-tabs-custom>.nav-tabs>li.header {
    line-height: 35px;
    padding: 0 10px;
    font-size: 20px;
    color: #444
}


.nav-tabs-custom>.tab-content {
    background: #fff;
    padding: 10px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}    
</style>
<div class="row" style="margin-top: 60px;">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <!--p id="laba-rugi" style="text-align: right; padding-right: 1rem; font-size: 2.5rem; font-weight: bold;"></p-->
        <p style="text-align: right; padding-right: 1rem; font-size: 1rem; color: #808080; margin-top: 1.5rem;">Year to date</p>
        <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12">
                <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li style="margin-left: 5rem;" class="active"><a href="#tab1" data-toggle="tab">Chart</a></li>
                            <li class="pull-right" style="margin-right: 5rem;"><a href="#tab2" data-toggle="tab">Report</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab1">
                                <div id="chart"></div>
                            </div>
                            <div class="tab-pane" id="tab2">
                                <div id="report">
                                    <select id="periode" name="periode" class="form-control" style="width: 32rem; border-top: none; border-left: none; border-right: none;">
                                       
                                    </select>
                                    <table class="table" id="table-pendapatan" style="border: none;">
                                        <p style='margin-left: 1rem; margin-top: 1rem; font-weight: bold; font-size: 1.5rem;'>Pendapatan</p>
                                    </table>
                                    <table class="table" id="table-beban" style="border: none;">
                                        <p style="margin-left: 1rem; margin-top: 1rem; font-weight: bold; font-size: 1.5rem;">Beban</p>
                                    </table>
                                    <table class="table" id="table-labarugi" style="border: none;">
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
$(document).ready(function(){
    $('#periode').on('change', function(){
        var per = $('#periode').val();
        $.ajax({
            type: 'GET',
            url: '<?=$root_ser?>/generalDash.php?fx=getDataLaba',
            dataType: 'json',
            data: {'kode_lokasi':'<?=$kode_lokasi?>','periode':'<?=$periode?>','per':per},
            success: function(response){
                console.log(response);
                $('table#table-pendapatan tr.data-pendapatan').remove();
                $('table#table-pendapatan tr.data-total-pendapatan').remove();
                $('table#table-beban tr.data-beban').remove();
                $('table#table-beban tr.data-total-beban').remove();
                $('table#table-labarugi tr.data-labarugi').remove();
                if(response.status){
                    var pen = "";
                    var tot_pen = "";
                    for(var b=0;b<response.data_pendapatan.length;b++){
                        var pend = response.data_pendapatan[b];
                        pen += "<tr class='data-pendapatan'>"+
                                "<td style='padding-right: 1rem; padding-top: 0.1rem;'>"+pend.nama+"</td>"
                                +"<td style='text-align: right; width: 100px;'>"+toJuta(pend.so_akhir)+
                                "</td>"+
                                "</tr>";
                    }
                        tot_pen += "<tr class='data-total-pendapatan'>"+
                                   "<td></td>"+
                                   "<td style='text-align: right; border-top: 1px solid black;'>"+toJuta(response.total_pendapatan)+
                                   "</td>"+
                                   "</tr>";
                        $('#table-pendapatan').append(pen);
                        $('#table-pendapatan').append(tot_pen);

                    var ben = "";
                    var tot_ben = "";
                    for(var c=0;c<response.data_beban.length;c++){
                        var beb = response.data_beban[c];
                        ben +=  "<tr class='data-beban'>"+
                                "<td style='padding-right: 1rem; padding-top: 0.1rem;'>"+beb.nama+"</td>"
                                +"<td style='text-align: right; width: 100px;'>"+toJuta(beb.so_akhir)+
                                "</td>"+
                                "</tr>";
                    }
                        tot_ben += "<tr class='data-total-beban'>"+
                                   "<td></td>"+
                                   "<td style='text-align: right; border-top: 1px solid black;'>"+toJuta(response.total_beban)+
                                   "</td>"+
                                   "</tr>";

                        $('#table-beban').append(ben);
                        $('#table-beban').append(tot_ben);

                        var lab = "";
                            lab += "<tr class='data-labarugi'>"+
                                 "<td style='font-weight: bold; font-size: 1.5rem;'>Laba Rugi</td>"+
                                 "<td style='text-align: right;'>"+toJuta(response.selisih)+"</td>"+
                                 "</tr>";
                        $('#table-labarugi').append(lab);
                }
            }

        })
    })
})

function sepNum2(x){
    var num = parseFloat(x).toFixed(2);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
    }

function sepNum(x){
    if (typeof x === 'undefined' || !x) { 
        return 0;
    }else{
        if(x < 0){
            var x = parseFloat(x).toFixed(2);
        }
        
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,"$1.");
        return parts.join(",");
    }
    }
function sepNumPas(x){
    var num = parseInt(x);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function toJuta(x) {
    var nil = x / 1000000;
    return sepNum(nil) + " JT";
}

function toJuta2(x) {
    var nil = x / 1000000;
    return sepNum2(nil) + " JT";
}

/*String.prototype.InsertAt=function(CharToInsert,Position){
     return this.slice(0,Position) + CharToInsert + this.slice(Position)
}*/

function loadService(index,method,url,param=null) {
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>'},
        success: function(response){
            if(response.status){
                switch(index){
                    case "nmperus":
                    $('#nama-perusahaan').text(response.data.nama);
                    break;
                    case "labarugi":
                    $('#laba-rugi').text(toJuta(response.actLaba));
                    break;
                    case "chart":
                    Highcharts.chart('chart', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: response.min[0],
                        title: {
                            text: ''
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' JT'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Pendapatan',
                        data: response.pendapatan[0]
                    }, {
                        name: 'Beban',
                        data: response.beban[0]
                    }, {
                        name: 'Laba Rugi',
                        data: response.laba[0]
                    }]
                });
                    break;
                    case "periode":
                        var option1 = "<option value=''>Periode (Year to date)</option>";
                        var option  = "";
                        for(var a=0;a<response.periode_value.length;a++){
                            var row1    = response.periode_value[a];
                            var bln     = response.bulan[a];
                            //var periode = row1.periode.InsertAt('/',4);
                            var month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    
                            option += "<option value="+row1.periode+">"+month[bln]+"/"+row1.tahun+"</option>";
                        }
                        $('#periode').append(option1);
                        $('#periode').append(option);
                    break;
                    case "data-laba":
                    var pen = "";
                    var tot_pen = "";
                    for(var b=0;b<response.data_pendapatan.length;b++){
                        var pend = response.data_pendapatan[b];
                        pen += "<tr class='data-pendapatan'>"+
                                "<td style='padding-right: 1rem; padding-top: 0.1rem;'>"+pend.nama+"</td>"
                                +"<td style='text-align: right; width: 100px;'>"+toJuta2(pend.so_akhir)+
                                "</td>"+
                                "</tr>";
                    }
                        tot_pen += "<tr class='data-total-pendapatan'>"+
                                   "<td></td>"+
                                   "<td style='text-align: right; border-top: 1px solid black;'>"+toJuta2(response.total_pendapatan)+
                                   "</td>"+
                                   "</tr>";
                        $('#table-pendapatan').append(pen);
                        $('#table-pendapatan').append(tot_pen);

                    var ben = "";
                    var tot_ben = "";
                    for(var c=0;c<response.data_beban.length;c++){
                        var beb = response.data_beban[c];
                        ben +=  "<tr class='data-beban'>"+
                                "<td style='padding-right: 1rem; padding-top: 0.1rem;'>"+beb.nama+"</td>"
                                +"<td style='text-align: right; width: 100px;'>"+toJuta2(beb.so_akhir)+
                                "</td>"+
                                "</tr>";
                    }
                        tot_ben += "<tr class='data-total-beban'>"+
                                   "<td></td>"+
                                   "<td style='text-align: right; border-top: 1px solid black;'>"+toJuta2(response.total_beban)+
                                   "</td>"+
                                   "</tr>";

                        $('#table-beban').append(ben);
                        $('#table-beban').append(tot_ben);

                        var lab = "";
                            lab += "<tr class='data-labarugi'>"+
                                 "<td style='font-weight: bold; font-size: 1.5rem;'>Laba Rugi</td>"+
                                 "<td style='text-align: right;'>"+toJuta(response.selisih)+"</td>"+
                                 "</tr>";
                        $('#table-labarugi').append(lab);
                    break;
                }
            }
        }
    })
}

function initDash() {
    loadService('nmperus','GET','<?=$root_ser?>/generalDash.php?fx=getPerusahaan');
    loadService('labarugi','GET','<?=$root_ser?>/generalDash.php?fx=getLaba');
    loadService('chart','GET','<?=$root_ser?>/generalDash.php?fx=getChartLaba');
    loadService('periode','GET','<?=$root_ser?>/generalDash.php?fx=getTahun');
    loadService('data-laba','GET','<?=$root_ser?>/generalDash.php?fx=getDataLaba');
}

initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>