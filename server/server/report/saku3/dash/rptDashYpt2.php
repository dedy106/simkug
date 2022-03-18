<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashYpt2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel panel-info'>
			<div class='panel-heading'>Dashboard</div>
			<div class='panel-body'>
				<div class='row'>";
		echo "		<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12'>
					  <!-- small box -->
					  <div class='small-box bg-aqua'>
						<div class='inner'>
						  <h3>150</h3>
						  <p>Pendapatan</p>
						</div>
						<div class='icon'>
						  <i class='ion ion-stats-bars'></i>
						</div>
						</div>
					</div>
					<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12'>
					  <!-- small box -->
					  <div class='small-box bg-aqua'>
						<div class='inner'>
						  <h3>150</h3>
						  <p>Beban</p>
						</div>
						<div class='icon'>
						  <i class='ion ion-stats-bars'></i>
						</div>
						</div>
					</div>
					<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12'>
					  <!-- small box -->
					  <div class='small-box bg-aqua'>
						<div class='inner'>
						  <h3>150</h3>
						  <p>SHU</p>
						</div>
						<div class='icon'>
						  <i class='ion ion-stats-bars'></i>
						</div>
						</div>
					</div>
					<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12'>
					  <!-- small box -->
					  <div class='small-box bg-aqua'>
						<div class='inner'>
						  <h3>150</h3>
						  <p>Operating Rasio</p>
						</div>
						<div class='icon'>
						  <i class='ion ion-stats-bars'></i>
						</div>
						</div>
					</div>
				</div>
				<!-- /.row -->";
		
     	echo "</div>
		</div>";
		
		echo "<div id='container' style='min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto'></div>



		<script type='text/javascript'>


Highcharts.chart('container', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Speedometer'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'km/h'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [80],
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                inc = Math.round((Math.random() - 0.5) * 20);

            newVal = point.y + inc;
            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);

        }, 3000);
    }
});
		</script>";
		return "";
	}
	
}
?>
