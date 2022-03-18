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
// $logomain = $path.'/web/img/yspt2.png';
// $mainname = $_SESSION['namaPP'];

$tmp=explode("|",$_GET['param']);
$kunci=$tmp[0];

$kode_fs="FS1";

$path = "http://".$_SERVER["SERVER_NAME"]."/";	
$icon_back = $path."image/icon_back.png";
$icon_close = $path."image/icon_close.png";

?>
<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
    body {
        font-family: 'Roboto', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: 'Roboto', sans-serif !important;
        font-weight: normal !important;
    }
    .judul-box{
        font-weight:bold;
        font-size:18px !important;
    }
    .inner{
        padding:5px !important;
    }

    .box-nil{
        margin-bottom: 20px !important;
    }
    .pad-more{
        padding-left:0px !important;
        padding-right:10px !important;
    }
    .mar-more{
        margin-bottom:10px !important;
    }
</style>
<div class="row" style='margin-bottom:10px;padding-right: 15px;'>
    <!-- <div class="col-md-2">
    <a href='fMain.php?hal=app/amu/dashAmu.php' class='small-box-footer btn btn-default btn-sm' > Back <i class='fa fa-arrow-circle-left'></i></a>
    </div> -->
    <div class="pull-right navigasi" style="padding-bottom: 1rem;">
        <span id="back_btn" style='cursor:pointer'><img src="<?=$icon_back?>" width="25px"></span>
        <span id="close_btn"style='cursor:pointer'><img src="<?=$icon_close?>" width="25px"></span>
    </div>
</div>
<?php
switch($kunci) {
    case "tanah" :
    $sql1="select count(*) as jum from amu_lahan";
    $resTanah = execute($sql1);
    $sql2="select count(distinct id_provinsi) as jum from amu_lahan
    ";
    $resProv = execute($sql2);
    $sql3="select count(*) as jum from amu_sertifikat_lahan";
    $resSerTa = execute($sql3);

    $sql4="
    select count(*) as jum from amu_sertifikat_lahan where getdate()> tanggal_akhir ";
    $resRecent = execute($sql4);
?>
<div class="row" style="padding-left:10px">
        <div class="col-md-3 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Total Tanah</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resTanah->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Titik Lokasi</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resProv->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;Provinsi</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Sertifikat Tanah</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resSerTa->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;Asset</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Jatuh Tempo</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resRecent->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;Asset</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 pad-more">
            <div class='box mar-more' style='box-shadow:none;border:0' >
                <a href='#' class='small-box-footer' >
                    <div class='box-header'>
                    <h3 class='box-title'>Lokasi</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id="dash_chart_lokasi"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 pad-more">
            <div class='box mar-more' style='box-shadow:none;border:0' >
                <a href='#' class='small-box-footer' >
                    <div class='box-header'>
                    <h3 class='box-title'>Cara Perolehan</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id="dash_chart_cara" ></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 pad-more">
            <div class='box mar-more' style='box-shadow:none;border:0' >
                <a href='#' class='small-box-footer' >
                    <div class='box-header'>
                    <h3 class='box-title'>Sertifikat Tanah</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id="dash_chart_serti" ></div>
                </div>
            </div>
        </div>
</div>
<?php
$sql = "select a.kode_lokasi,a.nama, isnull(b.jum,0) as jum 
from lokasi a 
left join (
select kode_lokasi,count(*) as jum 
from amu_lahan 
group by kode_lokasi) b on a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi in ('03','07','08','12','11','13','14','15') and isnull(b.jum,0) <> 0
";
$rsLokasi = execute($sql);

while($row = $rsLokasi->FetchNextObject(false)){
    
    $lok[] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->kode_lokasi);   
    
} 

$sql = "select cara_perolehan as nama,count(*) as jum 
from amu_lahan 
group by cara_perolehan
";
$rsCara = execute($sql);

while($row = $rsCara->FetchNextObject(false)){
    
    $cara[] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->nama);   
    
} 

$sql = "select cara_perolehan as nama,count(*) as jum 
from amu_lahan 
group by cara_perolehan
";
$rsSerti = execute($sql);

while($row = $rsSerti->FetchNextObject(false)){
    
    $serti[] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->nama);   
    
} 
?>
<script>

// Create the chart
Highcharts.chart('dash_chart_lokasi', {
    chart: {
        type: 'pie',
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.2f}%'
            }
        },
        pie: {
            size:200
        }
    },
    credits: {
        enabled: false
    },
    
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
    },
    
    series: [
        {
            name: "Lokasi",
            colorByPoint: true,
            data: <?php echo json_encode($lok); ?>
            
        }
    ]
});

// Create the chart
Highcharts.chart('dash_chart_cara', {
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.2f}%'
            }
        },
        pie: {
            size:200
        }
    },
    credits: {
        enabled: false
    },
    
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
    },
    
    series: [
        {
            name: "Cara Perolehan",
            colorByPoint: true,
            data: <?php echo json_encode($cara); ?>
            
        }
    ]
});

// Create the chart
Highcharts.chart('dash_chart_serti', {
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.2f}%'
            }
        },
        pie: {
            size:200
        }
    },
    credits: {
        enabled: false
    },
    
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
    },
    
    series: [
        {
            name: "Sertifikat",
            colorByPoint: true,
            data: <?php echo json_encode($serti); ?>
            
        }
    ]
});
</script>
<?php 
    break;
    case "gedung" :
    $sql1="select count(*) as jum from amu_gedung";
    $resGedung= execute($sql1);
    $sql2="select count(distinct b.id_provinsi) as jum from amu_gedung a inner join amu_lahan b on a.kode_lokasi=b.kode_lokasi and a.id_lahan=b.id_lahan
    ";
    $resProv2 = execute($sql2);
?>
<div class="row">
        <div class="col-md-4 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Total Bangunan</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resGedung->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Titik Lokasi</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resProv2->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;Provinsi</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 pad-more">
            <div class='box mar-more' style='box-shadow:none;border:0' >
                <a href='#' class='small-box-footer' >
                    <div class='box-header'>
                    <h3 class='box-title'>Lokasi</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id="dash_chart_lokasi"></div>
                </div>
            </div>
        </div>
</div>
<?php
$sql = "select a.kode_lokasi,a.nama, isnull(b.jum,0) as jum 
from lokasi a 
left join (
select kode_lokasi,count(*) as jum 
from amu_gedung 
group by kode_lokasi) b on a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi in ('03','07','08','12','11','13','14','15') and isnull(b.jum,0) <> 0
";
$rsLokasi = execute($sql);

while($row = $rsLokasi->FetchNextObject(false)){
    
    $lok[] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->kode_lokasi);   
    
} 
 

?>
<script>

// Create the chart
Highcharts.chart('dash_chart_lokasi', {
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.2f}%'
            }
        },
        pie: {
            size:200
        }
    },
    credits: {
        enabled: false
    },
    
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
    },
    
    series: [
        {
            name: "Lokasi",
            colorByPoint: true,
            data: <?php echo json_encode($lok); ?>
            
        }
    ]
});

</script>
<?php
    break;
}
?>
<script>
$('.navigasi').on('click','#close_btn',function(){
	// alert("test");
	window.history.go(-1); return false;
});
$('.navigasi').on('click','#back_btn',function(){
	// alert("test");
	window.history.go(-1); return false;
});

</script>
