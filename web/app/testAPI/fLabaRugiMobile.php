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
                        <span style='color: #A1A1A1; font-size: 1rem; padding-left: 13rem;'>Periode (".date('m').date('Y').")</span>
                        </div>
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
<div class="row" style="margin-top: 60px;">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <p id="laba-rugi" style="text-align: right; padding-right: 1rem; font-size: 2.5rem; font-weight: bold;"></p>
        <p style="text-align: right; padding-right: 1rem; font-size: 1rem; color: #808080; margin-top: -1.5rem;"><?= date('Y/d'); ?></p>
        <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12">
                <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li style="margin-left: 5rem;" class="active"><a href="#tab1" data-toggle="tab">Chart</a></li>
                            <li class="pull-right" style="margin-right: 5rem;"><a href="#tab2" data-toggle="tab">Report</a></li>
                        </ul>
                        <div class="tab-content sai-container-overflow">
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
function sepNum(x){
    var num = parseFloat(x).toFixed(2);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
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

String.prototype.InsertAt=function(CharToInsert,Position){
     return this.slice(0,Position) + CharToInsert + this.slice(Position)
}

function loadService(index,method,url,param=null) {
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>'},
        success: function(response){
            if(response.status){
                switch(index){
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
                        crosshair: true
                      },
                      yAxis: {
                        min: 0,
                        title: {
                          text: ''
                        }
                      },
                      tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                      },
                      plotOptions: {
                        column: {
                          pointPadding: 0.2,
                          borderWidth: 0
                        }
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
                        var option1 = "<option value=''>Periode (mm/yyyy)</option>";
                        var option  = "";
                        for(var a=0;a<response.periode_value.length;a++){
                            var row1    = response.periode_value[a];
                            var periode = row1.periode.InsertAt('/',4);

                            option += "<option value="+row1.periode+">"+periode+"</option>";
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
                        tot_ben += "<tr class='data-total-pendapatan'>"+
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
                    break;
                }
            }
        }
    })
}

function initDash() {
    loadService('labarugi','GET','<?=$root_ser?>/generalDash.php?fx=getLaba');
    loadService('chart','GET','<?=$root_ser?>/generalDash.php?fx=getChartLaba');
    loadService('periode','GET','<?=$root_ser?>/generalDash.php?fx=getTahun');
    loadService('data-laba','GET','<?=$root_ser?>/generalDash.php?fx=getDataLaba');
}

initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>