<?php
$kode_lokasi=$_SESSION['lokasi'];
$sqlSis   = "select isnull(count(distinct(nim)),0) as siswa from dev_siswa where kode_lokasi='$kode_lokasi'";
$result1  = execute($sqlSis);
$sqlTgh   = "select isnull(count(distinct(no_tagihan)),0) as tgh from dev_tagihan_m where kode_lokasi='$kode_lokasi'";
$result2  = execute($sqlTgh);
$sqlPbyr  = "select isnull(count(distinct(no_bayar)),0) as pbyr from dev_bayar_m where kode_lokasi='$kode_lokasi'";
$result3  = execute($sqlPbyr);
$sqlOts   = "select isnull(count(a.no_tagihan),0) as ots from (select c.no_tagihan,d.nama,c.tanggal,c.keterangan,isnull(a.nilai,0) as nilai_t, isnull(b.nilai,0) as nilai_b ,isnull(a.nilai,0)-isnull(b.nilai,0) as saldo
				from dev_tagihan_m c inner JOIN
				(select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan 
				left join 
				(select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan 
				inner join dev_siswa d on c.nim=d.nim
                where isnull(a.nilai,0)-isnull(b.nilai,0)>0 and c.kode_lokasi='$kode_lokasi') a ";
$result4 =  execute($sqlOts);
?>

<div class="panel">
	 <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> Dashboard </div>
	 <div class="panel-body">
	 	<div class="row">
	 		<div class="col-md-3">
	 			<div class="small-box bg-yellow">
	 				<div class="inner">
	 					<center><p>Siswa</p>
	 					<h3 class="home_siswa_box"><?php echo $result1->fields[0]; ?></h3>
	 					</center>
	 				</div>
	 				<div class="icon"><i class='fa fa-line-chart'></i></div>
	 				<a href='http://dev.simkug.com/web/fMain.php?hal=app/belajar/fSiswaOkta.php' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
	 			</div>
	 		</div>
	 		<div class="col-md-3">
	 			<div class="small-box bg-blue">
	 				<div class="inner">
	 					<center><p>Tagihan</p>
	 					<h3 class="home_tagihan_box"><?php echo $result2->fields[0]; ?></h3>
	 					</center>
	 				</div>
	 				<div class="icon"><i class='fa fa-money'></i></div>
	 				<a href='http://dev.simkug.com/web/fMain.php?hal=app/belajar/fTagihanOkta.php' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
	 			</div>
	 		</div>
	 		<div class="col-md-3">
	 			<div class="small-box bg-purple">
	 				<div class="inner">
	 					<center><p>Pembayaran</p>
	 					<h3 class="home_pembayaran_box"><?php echo $result3->fields[0]; ?></h3>
	 					</center>
	 				</div>
	 				<div class="icon"><i class='fa fa-pie-chart'></i></div>
	 				<a href='http://dev.simkug.com/web/fMain.php?hal=app/belajar/fPembayaranOkta.php' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
	 			</div>
	 		</div>
	 		<div class="col-md-3">
	 			<div class="small-box bg-red">
	 				<div class="inner">
	 					<center><p>Outstanding</p>
	 					<h3 class="home_outstanding_box"><?php echo $result4->fields[0]; ?></h3>
	 					</center>
	 				</div>
	 				<div class="icon"><i class='fa fa-credit-card'></i></div>
	 				<a href='#' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
	 			</div>
	 		</div>
	 	</div>
	 	<div class="sai_home_graifk">
	 		<div class="row">
	 			<div class="col-md-6">
	 				<div class="nav-tabs-custom">
	 					<ul class="nav nav-tabs pull-right">
	 						<li class="active"><a href="#tab1" data-toggle="tab">Jumlah</a></li>
	 						<li><a href="#tab2" data-toggle="tab">Nilai</a></li>
	 						<li class='pull-left header'><i class='fa fa-bar-chart'></i> Tagihan</li>
	 					</ul>
	 					<div class="tab-content sai-container-overflow">
	 						<div class="tab-pane active" id="tab1">
	 							<div id="home_tagihan_chartJum"></div>
	 						</div>
	 						<div class="tab-pane" id="tab2">
	 							<div id="home_tagihan_chartNil"></div>
	 						</div>
	 					</div>
	 				</div>
	 			</div>
	 			<div class="col-md-6">
	 				<div class="nav-tabs-custom">
	 					<ul class="nav nav-tabs pull-right">
	 						<li class="active"><a href="#tab3" data-toggle="tab">Jumlah</a></li>
	 						<li><a href="#tab4" data-toggle="tab">Nilai</a></li>
	 						<li class="pull-left header"><i class='fa fa-bar-chart'></i> Pembayaran</li>
	 					</ul>
	 					<div class="tab-content sai-container-overflow">
	 						<div class="tab-pane active" id="tab3">
	 							<div id="home_pembayaran_chartJum"></div>
	 						</div>
	 						<div class="tab-pane" id="tab4">
	 							<div id="home_pembayaran_chartNil"></div>
	 						</div>
	 					</div>
	 				</div>
	 			</div>
	 		</div>	
	 	</div>
	 </div>
</div>
<?php

    $res = execute("select a.nim,b.nama,count(a.no_tagihan) as jumlah from dev_tagihan_m a 
    inner join dev_siswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' group by a.nim,b.nama");
    while ($row = $res->FetchNextObject(false)){
        $tghjs["series"][] =array($row->nim, floatval($row->jumlah));
        $tghju[] =array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->nim);
        $tghjc[] = $row->nama;
    }

    $res = execute("select a.nim,count(a.no_bayar) as jumlah
    from dev_bayar_m a 
    where a.kode_lokasi='$kode_lokasi'
    group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $pbyrjs["series"][] = array($row->nim, floatval($row->jumlah));
        $pbyrjc[] = $row->nim;
    }

    $res = execute("select a.nim,sum(b.nilai) as nilai
    from dev_tagihan_m a 
    inner join dev_tagihan_d b on a.no_tagihan=b.no_tagihan
    where a.kode_lokasi='$kode_lokasi' group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $tghns["series"][] = array($row->nim, floatval($row->nilai));
        $tghnc[] = $row->nim;
    }

    $res = execute("select a.nim,sum(b.nilai) as nilai
    from dev_bayar_m a inner join dev_bayar_d b on a.no_bayar=b.no_bayar
    where a.kode_lokasi='$kode_lokasi'
    group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $pbyrns["series"][] = array($row->nim, floatval($row->nilai));
        $pbyrnc[] = $row->nim;
    }
        
?>
<script type="text/javascript">
    var options = {
    	chart: {
    		renderTo: 'home_tagihan_chartJum',
        	type: 'bar'
    	},
    	title: {
    		text: ''
    	},
    	exporting: { 
            enabled: false
        },
        series: [{
        	name: 'Jumlah',
        	data: <?= json_encode($tghjs["series"]) ?> ,
        	colorByPoint: true,
        }],
        xAxis: {
            title: {
                text: null
            },
            categories: <?= json_encode($tghjc) ?>,
        },
        yAxis:{
            title: {
                text: null
            },
            labels: {
            	 formatter: function () {
                return this.value;
            	}
            }
        },
        credits: {
            enabled: false
        },
    };
    options.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options);

var options2 = {
    chart: {
        renderTo: 'home_pembayaran_chartJum',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Jumlah',
        data: <?= json_encode($pbyrjs["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($pbyrjc) ?>,
    },
    yAxis:{
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    credits: {
        enabled: false
    },
};
options2.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options2);

var options3 = {
    chart: {
        renderTo: 'home_tagihan_chartNil',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Jumlah',
        data: <?= json_encode($tghns["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($tghnc) ?>,
    },
    yAxis:{
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    credits: {
        enabled: false
    },
};
options3.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options3);

var options4 = {
    chart: {
        renderTo: 'home_pembayaran_chartNil',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Jumlah',
        data: <?= json_encode($pbyrns["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($pbyrnc) ?>,
    },
    yAxis:{
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    credits: {
        enabled: false
    },
};
options4.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options4);

</script>