
    <div class="container">
		<div class="row"><br>
		</div>
		<div class="row">
            <div class="col-md-3">
                <div class="small-box bg-yellow">
					<div class="inner">
					<p>Jumlah RT</p>
					<h3>8</h3>

					</div>
					<div class="icon">
					<i class="fa fa-line-chart"></i>
					</div>
				</div>
            </div>
			
            <div class="col-md-3">
                <div class="small-box bg-blue">
					<div class="inner">
					<p>Jumlah Warga</p>
					<h3>300</h3>

					</div>
					<div class="icon">
					<i class="fa fa-line-chart"></i>
					</div>
				</div>
            </div>
			
			<div class="col-md-3">
                <div class="small-box bg-green">
					<div class="inner">
					<p>Jumlah Rumah</p>
					<h3>200</h3>

					</div>
					<div class="icon">
					<i class="fa fa-line-chart"></i>
					</div>
				</div>
            </div>
			
			<div class="col-md-3">
                <div class="small-box bg-red">
					<div class="inner">
					<p>Jumlah </p>
					<h3>8</h3>

					</div>
					<div class="icon">
					<i class="fa fa-line-chart"></i>
					</div>
				</div>
            </div>
        </div>
		
       <div class="row">
            <div class="col-md-6">
				<div class="box">
                    <div class="box-body chart-responsive">
						<div id="piechart" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>
                </div>
			</div>
			<div class="col-md-6">
				<div class="box">
					<div class="box-body chart-responsive">
						<div id="piechart2" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>	
                </div>
			</div>
		</div>
		
		<div class="row">
            <div class="col-md-6">
				<div class="box">
                    <div class="box-body chart-responsive">
						<div id="piechart3" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>
                </div>
			</div>
			<div class="col-md-6">
				<div class="box">
					<div class="box-body chart-responsive">
						<div id="piechart4" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>	
                </div>
			</div>
		</div>
		
		<div class="row">
            <div class="col-md-6">
				<div class="box">
                    <div class="box-body chart-responsive">
						<div id="piechart5" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>
                </div>
			</div>
			<div class="col-md-6">
				<div class="box">
					<div class="box-body chart-responsive">
						<div id="piechart6" style="min-width: 80%; max-width: 90%; margin: 0 auto"></div>
					</div>	
                </div>
			</div>
		</div>
		
	</div>
	<script type="text/javascript">
    $(document).ready(function(){
       
        Highcharts.chart('piechart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Jenis Kelamin'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'Laki-Laki',
                    y: 150
                }, {
                    name: 'Perempuan',
                    y: 100,
                    sliced: true,
                    selected: true
                }]
            }]
        });
		
		Highcharts.chart('piechart2', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Kelompok Usia'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'Lansia',
                    y: 50
                }, {
                    name: 'Produktif',
                    y: 100,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Remaja',
                    y: 80
                }, {
                    name: 'Anak-Anak',
                    y: 20
                }
				]
            }]
        });

        Highcharts.chart('piechart3', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Agama'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'Islam',
                    y: 150
                }, {
                    name: 'Kriten',
                    y: 100,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Hindu',
                    y: 80
                }, {
                    name: 'Budha',
                    y: 20
                }
				]
            }]
        });
		
		
		Highcharts.chart('piechart4', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Pekerjaan'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'Pegawai Negri',
                    y: 150
                }, {
                    name: 'Swasta',
                    y: 100,
                    sliced: true,
                    selected: true
                }, {
                    name: 'TNI',
                    y: 80
                }, {
                    name: 'Pensiunan',
                    y: 20
                }
				]
            }]
        });
		
		Highcharts.chart('piechart5', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Pendidikan'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'S1',
                    y: 150
                }, {
                    name: 'SMA',
                    y: 100,
                    sliced: true,
                    selected: true
                }, {
                    name: 'S2',
                    y: 80
                }, {
                    name: 'SMP',
                    y: 20
                }
				]
            }]
        });
		
		Highcharts.chart('piechart6', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Status Rumah'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Nilai',
                colorByPoint: true,
                data: [{
                    name: 'Rumah Pemilik',
                    y: 150
                }, {
                    name: 'Rumah Kontrak',
                    y: 100,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Rumah Mahasiswa',
                    y: 80
                }
				]
            }]
        });
        
    });
</script>


