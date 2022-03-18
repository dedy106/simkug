<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

	$filter="";
	$cust=$nik;
	$polis=$_GET['param'];
    if($cust != "" ){
        $filter.= " and b.kode_cust='$cust' ";
    }
    if($polis != ""){
        $filter.= " and b.no_polis='$polis' ";
    }
    
    if($cust == "" AND $polis == ""){
        $filter="";
    }

    $server=$_SERVER['SERVER_NAME'];

    $sql1 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
    from sju_klaim a
    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='11' and a.status in ('0') $filter"; //Laporan Awal

   

    $sql5="select a.kode_obl,a.nama,sum(a.jumlah) as jumlah, sum(a.nilai) as nilai 
    from (select a.kode_obl,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai 
         from sju_obl a 
         left join (select a.kode_obl,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai 
                    from sju_klaim a 
                    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi 
                    where a.kode_lokasi='$kode_lokasi' $filter 
                    group by a.kode_obl ) b on a.kode_obl=b.kode_obl 
          where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0 
    ) a
    group by a.kode_obl,a.nama";

    $sql6="select a.kode_sebab,a.nama,sum(a.jumlah) as jumlah, sum(a.nilai) as nilai
    from (select a.kode_sebab,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
        from sju_sebab a
        left join (select a.sebab,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
                    from sju_klaim a
                    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' $filter
                    group by a.sebab )b on a.kode_sebab=b.sebab
        where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0
    )a
    group by a.kode_sebab,a.nama";

    $rs = execute($sql1);
    $rs5 = execute($sql5);
    while($row = $rs5->FetchNextObject(false)){
       
        $reg[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_obl);   
        $ctgreg[]= $row->nama;
        
    }  
    $rs6 = execute($sql6);
    while($row = $rs6->FetchNextObject(false)){
       
        $sebab[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_sebab);  
        $ctgsebab[]= $row->nama; 
        
    }

    //SQL PIE 1
    $sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
    from sju_klaim_progres a
    left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
    from sju_klaim a
    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' $filter
    group by a.progress
    )b on a.kode_prog=b.progress
    where a.kode_prog in ('LA','ST','PA','BD','KS') ";

    $rspie1 = execute($sql);
    while($row = $rspie1->FetchNextObject(false)){
       
        $page1[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_prog);   
        
    }  

    //SQL PIE 2
    $sql2 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
    from sju_klaim a
    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='11' and a.status in ('1') $filter"; //Oustanding

    // $sql3 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
    // from sju_klaim a
    // inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    // where a.kode_lokasi='11' and a.status in ('2') $filter"; //No Claim

    $sql3="select isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
    from sju_klaim_progres a
    left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
    from sju_klaim a
    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' $filter
    group by a.progress
    )b on a.kode_prog=b.progress
    where a.kode_prog in ('UD') ";


    $sql4 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
    from sju_klaim a
    inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='11' and a.status in ('3') $filter"; //Settled

    $rs2 = execute($sql2);
    $rs3 = execute($sql3);
    $rs4 = execute($sql4);

    $out = $rs2->fields[0];
    $ud = $rs3->fields[0];
    $st = $rs4->fields[0];

    $series["page2"][] = array(
        "name"=>"Jumlah", 
        "data"=>array(
            array('Oustanding',floatval($out)),
            array('Settled',floatval($st)),
            array('Under Deductible',floatval($ud))
            )
    );
    $categories = array ('Outstanding', 'Settled','Under Deductible') ;

    // echo json_encode($reg)." -- 1<br>";
    // echo json_encode($sebab)." -- 2<br>";
 
?>
<div class='panel'>
	<div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'></div>
    <div class='panel-body'>
        <div class="col-md-6">
            <div class='box' style='box-shadow:none;border:0'>
                <div class='box-header'>
                    <i class='fa fa-pie-chart'></i>
                    <h3 class='box-title'></h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;"></p>
                </div>
                <div class='box-body box-click' >
                    <div id='dash_chart_page1'></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class='box' style='box-shadow:none;border:0'>
                <div class='box-header'>
                    <i class='fa fa-pie-chart'></i>
                    <h3 class='box-title'></h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;"></p>
                </div>
                <div class='box-body box-click' >
                    <div id='dash_chart_page2'></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class='box' style='box-shadow:none;border:0'>
                <div class='box-header'>
                    <i class='fa fa-pie-chart'></i>
                    <h3 class='box-title'></h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;"></p>
                </div>
                <div class='box-body box-click' >
                    <div id='dash_chart_reg'></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class='box' style='box-shadow:none;border:0'>
                <div class='box-header'>
                    <i class='fa fa-pie-chart'></i>
                    <h3 class='box-title'></h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;"></p>
                </div>
                <div class='box-body box-click' >
                    <div id='dash_chart_sebab'></div>
                </div>
            </div>
        </div>
        <aside class='control-sidebar control-sidebar-dark' style='padding-bottom:600px;'>
			<div class='tab-content'>
				<div class='tab-pane active' id='control-sidebar-home-tab'>
					<select class='form-control input-sm' id='dash_polis' style='margin-bottom:5px'>
						<option value=''>Pilih No Register</option>
                        <?php
                        $resPo = execute("select a.no_polis,a.no_dok
                        from sju_polis_m a
                        inner join (select a.no_polis,a.kode_lokasi
                        from sju_klaim a
                        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and b.kode_cust='$cust'
                        group by a.no_polis,a.kode_lokasi 
                        )b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' ");
                        
                        while ($row = $resPo->FetchNextObject(false)){
                            echo " <option value=".$row->no_polis.">".$row->no_polis."-".$row->no_dok."</option>";
                        }
                        ?>
					</select>
					<a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
				</div>
			</div>
		</aside>
    </div>
</div>

<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script>
$(document).ready(function(){
    
    $('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
        var polis = $('#dash_polis').val();
        
        window.location.href='fMain.php?hal=app/sju/dashSju2.php&param='+polis;
        
        
    });

    Highcharts.chart('dash_chart_page1', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },
        series: [
            {
                name: "Nilai",
                colorByPoint: true,
                data: <?php echo json_encode($page1); ?>
                
            }
        ]
    });

    var options = {
            chart: {
                renderTo: 'dash_chart_page2',
                type: 'pie'
                // options3d: {
                //     enabled: true,
                //     alpha: 45,
                //     beta: 0
                // }
            },
            title: {
                verticalAlign: 'top',
                floating: true,
                text: '2018/2019',
                align:'center',
                style: {
                    fontSize: '20px',
                    margin:'auto'
                },
            },
            colors:['#e15239','#f8c169','#185fad'],
            exporting: { 
                enabled: false
            },
            series: [],
            xAxis: {
                title: {
                    text: null
                },
                categories: [],
            },
            yAxis:{
                title: {
                    text:null
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

        options.series = <?= json_encode($series["page2"]) ?>;
        options.xAxis.categories =<?= json_encode($categories) ?>;

        options.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: <br> {point.y} Claims [{point.percentage:.2f}%]'
                },
                innerSize:'70%',
                showInLegend: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;  
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);

        Highcharts.chart('dash_chart_reg', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 65,
                    beta: 0
                }
            },
            title: {
                text: 'COUNT OF REGIONAL'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Count Of Regional',
                data: <?= json_encode($reg) ?>
            }],
            credits:{
                enabled:false
            }
        });

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'dash_chart_sebab',
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: 'CAUSE OF LOSS'
            },
            plotOptions: {
                column: {
                    depth: 25
                },
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            },
            series: [{
                data : <?= json_encode($sebab); ?>
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: <?= json_encode($ctgsebab) ?>,
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
            credits:{
                enabled:false
            }
        });

    
});
</script>
