<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    //$periode=$_SESSION['periode'];
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
	// 		c.kode_pp,d.nama as nama_pp,
	// 		b.kode_lokkonsol,d.kode_bidang, c.foto,isnull(e.form,'-') as path_view,b.logo
    //     	from hakakses a 
    //     	inner join lokasi b on b.kode_lokasi = a.kode_lokasi 
    //     	left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
    //     	left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi 
    //     	left join m_form e on a.menu_mobile=e.kode_form 
    //     	where a.nik= 'okta'";
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
                        <span id='nama-perusahaan' style='font-weight: bold; font-size: 1.2rem;'></span>
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
<div class='box' style='border:none;margin-top: 65px;'>
	<div class="box-body">
		<div class="row">
			<div class="col-sm-6 col-md-6 col-xs-6">
                <a href="fMainMobile.php?hal=app/mobile/fLabaRugiMobile.php" style="text-decoration: none;">
				<div class="panel" style="border-radius: 1.5rem; box-shadow: 0.5rem 0.5rem 1rem #eaeaea;">
				<div class="card">
          		<div class="card-body">
          		<center><h3 class="font-weight-light" style="color: #000000; font-size: 1.3rem; padding: 0 2rem 0 2rem;">LabaRugi</h3></center>
          		<center><h2 id="laba-rugi" class="font-weight-bold" style="margin-top: -1rem; color: #000000;"></h2></center>
          		<center><p style="color: #808080; margin-top: -0.5rem; font-size: 1rem;">Year to date</p></center>
          		</div>
         		</div>
        		</div>
                </a>
			</div>
			<div class="col-sm-6 col-md-6 col-xs-6">
                <a href="" style="text-decoration: none;">
				<div class="panel" style="border-radius: 1.5rem; box-shadow: 0 0.5rem 1rem #eaeaea; padding-bottom: 1.7rem;">
				<div class="card">
          		<div class="card-body">
          		<center><h3 class="font-weight-light" style="color: #000000; font-size: 1.3rem; padding: 0 2rem 0 2rem;">Operation Ratio</h3>
          		</center>
          		<center><h2 id="operation-ratio" class="font-weight-bold" style="margin-top: -1rem; color: #000000;"></h2></center>
          		</div>
         		</div>
        		</div>
                </a>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-xs-12 col-md-12">
                <a href="fMainMobile.php?hal=app/mobile/fKasBankMobile.php" style="text-decoration: none;">
				<div class="panel" style="border-radius: 1rem; box-shadow: 0 0.5rem 1rem #eaeaea; margin-top: -1rem;">
					<div class="card">
						<div class="card-body">
							<h4 class="font-weight-light" style="color: #000000; padding-left: 1rem;">Cash Bank Today's</h4>
							<h2 id="kas-bank" style="text-align: right; padding-right: 2rem; color: #000000;"></h2>
						</div>
					</div>
				</div>
                </a>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 col-xs-12 col-sm-12">
                <div class='box' style='box-shadow:none;border:0'>
                    <div class='box-body'>
                    <h1 class="font-weight-bold" style="font-size: 2.5rem; margin-top: -1rem;">CashIn-CashOut</h1>
                    <a href="fMainMobile.php?hal=app/mobile/fArusKas.php" style="text-decoration: none;">
                    <div id="chart-cash"></div>
                    </a>
                    </div>
                </div>
			</div>
		</div>
        <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12">
                <h4 style="font-size: 1.5rem; color: #808080; font-weight: bold;">Recently Added</h4>
                <hr style="margin-top: -0.5rem;">
                <h4 style="font-size: 1.5rem; color: #808080; font-weight: bold; margin-top: -0.5rem;">Transaction</h4>
                <table id="tabel-transaksi" class="table table-borderless" style="border: none;">
                        
                </table>
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

function sepNum2(x){
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

function toJuta(x) {
    var nil = x / 1000000;
    return sepNum2(nil) + " JT";
}

function toJuta2(x) {
    var nil = x / 1000000;
    return sepNum(nil) + " JT";
}

function loadService(index,method,url,param=null) {
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':'<?=$kode_lokasi?>', 'periode':'<?= $periode ?>'},
        success: function(response){
            if(response.status){
                switch(index){
                    case "nmperus":
                    $('#nama-perusahaan').text(response.data.nama);
                    // alert(response.data.nama);
                    break;
                    case "labarugi":
                        $('#laba-rugi').text(toJuta(response.actLaba));
                    break;
                    case "or":
                        $('#operation-ratio').text(sepNum(response.or)+"%");
                    break;
                    case "kas":
                        $('#kas-bank').text(toJuta2(response.kas));
                    break;
                     case "chartArus" :
                    Highcharts.chart('chart-cash', {
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                        },
                        yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value} jt',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'Nilai',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }],
                        credits: {
                            enabled: false
                        },
                        labels: {
                            items: [{
                                html: '',
                                style: {
                                    left: '50px',
                                    top: '18px',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                }
                            }]
                        },
                        tooltip: {
                            shared: true
                        },
                        series: [{
                            type: 'column',
                            name: 'Cash In',
                            data: response.Cash[0],
                            color:'#0e9aa7',
                            tooltip: {
                                valueSuffix: '  jt'
                            }
                        }, {
                            type: 'column',
                            name: 'Cash Out',
                            color:'#ff6f69',
                            data: response.Cash[1],
                            tooltip: {
                                valueSuffix: ' jt'
                            }
                        }]
                    });
                    break;
                    case "tableRecent" :
                        var html="";
                        for(var i=0;i<response.daftar.length;i++){
                            var line = response.daftar[i];
                            html+=`<tr>
                                <td>
                                    <p style="font-weight: bold; margin-bottom: -2px;">
                                    <i class="fa fa-id-card-o" aria-hidden="true" style="font-size: 2rem;"></i>
                                    <span style="">Modul `+line.modul+`</span>
                                    </p>
                                    <small style="color:  #808080;">`+line.tgl_trans+`</small>
                                </td>
                                <td style="text-align: right;">
                                    <small style="color:  #808080; padding-right: 2rem; padding-bottom: -5px; ">`+line.tgl_input+`</small><br/>
                                    <small style="color:  #808080; padding-right: 2rem; ">`+line.nik_user+`</small>
                                </td>
                            </tr>`;
                        }
                        $('#tabel-transaksi').append(html);
                    break;
                }
            }
        }
    });
}

function initDash() {
    loadService('nmperus','GET','<?=$root_ser?>/generalDash.php?fx=getPerusahaan');
    loadService('labarugi','GET','<?=$root_ser?>/generalDash.php?fx=getLaba');
    loadService('or','GET','<?=$root_ser?>/generalDash.php?fx=getOR');
    loadService('kas','GET','<?=$root_ser?>/generalDash.php?fx=getKas');
    loadService('chartArus','GET','<?=$root_ser?>/generalDash.php?fx=getArus');
    loadService('tableRecent','GET','<?=$root_ser?>/generalDash.php?fx=getRecent');
}
initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>
