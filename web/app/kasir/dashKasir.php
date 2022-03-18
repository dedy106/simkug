<?php


$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];

$sql1="select count(kode_barang) as jumlah from brg_barang where kode_lokasi='$kode_lokasi' ";
$sql2="select count(no_bukti) as jumlah from trans_m where form='BRGJUAL' and kode_lokasi='$kode_lokasi' ";
$sql3="select count(no_bukti) as jumlah from trans_m where form='BRGJUAL' and tanggal = '".date('Y-m-d')."' and kode_lokasi='$kode_lokasi' ";
$sql4="select count(no_bukti) as jumlah from trans_m where form='BRGJUAL' and kode_lokasi='$kode_lokasi' ";

$rs1=execute($sql1);
$rs2=execute($sql2);
$rs3=execute($sql3);
$rs4=execute($sql4);


?>
<div id='webjava_home_page'>
    <div class='row'>
        <div class='col-md-3'>
            <div class="small-box bg-yellow">
                <div class="inner">
                    <center>
                        <p>Barang</p>
                        <h3 id='home_page_box'><?php echo $rs1->fields[0]; ?></h3>
                    </center>
                </div>
                <div class="icon"><i class="fa fa-line-chart"></i></div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class='col-md-3'>
            <div class="small-box bg-blue">
                <div class="inner">
                    <center>
                        <p>Penjualan</p>
                        <h3 id='home_article_box'><?php echo $rs2->fields[0]; ?></h3>
                    </center>
                </div>
                <div class="icon"><i class="fa fa-money"></i></div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class='col-md-3'>
            <div class="small-box bg-purple">
                <div class="inner">
                    <center>
                        <p>Harian</p>
                        <h3 id='home_news_box'><?php echo $rs3->fields[0]; ?></h3>
                    </center>
                </div>
                <div class="icon"><i class="fa fa-pie-chart"></i></div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class='col-md-3'>
            <div class="small-box bg-red">
                <div class="inner">
                    <center>
                        <p>Kas</p>
                        <h3 id='home_visitor_box'><?php echo $rs4->fields[0]; ?></h3>
                    </center>
                </div>
                <div class="icon"><i class="fa fa-credit-card"></i></div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
    </div>
    <?php
        $sql="select kode_lokasi,
		sum(case when substring(datename(dw,tanggal),1,3) ='Mon' then nilai1 else 0 end) as n1,
		sum(case when substring(datename(dw,tanggal),1,3) ='Tue' then nilai1 else 0 end) as n2,
		sum(case when substring(datename(dw,tanggal),1,3) ='Wed' then nilai1 else 0 end) as n3,
		sum(case when substring(datename(dw,tanggal),1,3) ='Thu' then nilai1 else 0 end) as n4,
		sum(case when substring(datename(dw,tanggal),1,3) ='Fri' then nilai1 else 0 end) as n5,
		sum(case when substring(datename(dw,tanggal),1,3) ='Sat' then nilai1 else 0 end) as n6,
		sum(case when substring(datename(dw,tanggal),1,3) ='Sun' then nilai1 else 0 end) as n7
        from trans_m where kode_lokasi='$kode_lokasi' and form='BRGJUAL' and periode ='".date('Ym')."' 
        group by kode_lokasi";
        $res = execute($sql);

        while ($row = $res->FetchNextObject(false)){

            // $hari["series"][] =array($row->kode_lokasi, floatval($row->jumlah));
            // $haris[] =array('y'=>floatval($row->jumlah));
            $n1=$row->n1;
            $n2=$row->n2;
            $n3=$row->n3;
            $n4=$row->n4;
            $n5=$row->n5;
            $n6=$row->n6;
            $n7=$row->n7;
            // $haric[] = $row->nama;
            
        }

        $hari = array(
            round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7))
        );


        $sql="select kode_lokasi,
		sum(case when DATEPART(week,tanggal)-(DATEPART(week,(DATEADD(DD,-(DATEPART(day,tanggal)+1),tanggal)))) = 1 then nilai1 else 0 end) as n1,
		sum(case when DATEPART(week,tanggal)-(DATEPART(week,(DATEADD(DD,-(DATEPART(day,tanggal)+1),tanggal)))) = 2 then nilai1 else 0 end) as n2,
		sum(case when DATEPART(week,tanggal)-(DATEPART(week,(DATEADD(DD,-(DATEPART(day,tanggal)+1),tanggal)))) = 3  then nilai1 else 0 end) as n3,
		sum(case when DATEPART(week,tanggal)-(DATEPART(week,(DATEADD(DD,-(DATEPART(day,tanggal)+1),tanggal)))) = 4  then nilai1 else 0 end) as n4,
		sum(case when DATEPART(week,tanggal)-(DATEPART(week,(DATEADD(DD,-(DATEPART(day,tanggal)+1),tanggal)))) = 5  then nilai1 else 0 end) as n5
        from trans_m where kode_lokasi='$kode_lokasi' and form='BRGJUAL' and periode='".date('Ym')."'
        group by kode_lokasi";

        error_log($sql);
        $res1 = execute($sql);

        while ($row = $res1->FetchNextObject(false)){
            $n1=$row->n1;
            $n2=$row->n2;
            $n3=$row->n3;
            $n4=$row->n4;
            $n5=$row->n5;
        }

        $minggu = array(
            round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5))
        );

        $sql2= "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then a.nilai1 else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then a.nilai1 else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then a.nilai1 else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then a.nilai1 else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then a.nilai1 else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then a.nilai1 else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then a.nilai1 else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then a.nilai1 else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then a.nilai1 else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then a.nilai1 else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then a.nilai1 else 0 end) n11,
        sum(case when substring(a.periode,5,2)='12' then a.nilai1 else 0 end) n12	   
        from trans_m a
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".date('Y')."' and a.form='BRGJUAL' 
        group by a.kode_lokasi";

        // echo $sql2;

        $resP = execute($sql2);
        while ($row = $resP->FetchNextObject(false)){
            $n1=$row->n1;
            $n2=$row->n2;
            $n3=$row->n3;
            $n4=$row->n4;
            $n5=$row->n5;
            $n6=$row->n6;
            $n7=$row->n7;
            $n8=$row->n8;
            $n9=$row->n9;
            $n10=$row->n10;
            $n11=$row->n11;
            $n12=$row->n12; 
        }

        $bln = array(
            round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );


    ?>
    <div class='row'>
        <div class='col-md-12'>
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                    <li class=""><a href="#pnj-monthly" data-toggle="tab" aria-expanded="false">Bulanan</a></li>
                    
                    <li class=""><a href="#pnj-weekly" data-toggle="tab" aria-expanded="false">Mingguan</a></li>

                    <li class="active"><a href="#pnj-daily" data-toggle="tab" aria-expanded="true">Harian</a></li>

                    <li class="pull-left header"><i class="fa fa-inbox"></i> Penjualan</li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane" id="pnj-monthly" style="position: relative;">
                        <div id='pnj-monthly-chart'></div>
                    </div>
                    <div class="tab-pane" id="pnj-weekly" style="position: relative;">
                        <div id='pnj-weekly-chart'></div>
                    </div>
                    <div class="tab-pane active" id="pnj-daily" style="position: relative;">
                        <div id='pnj-daily-chart'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script text="text/javascript">

    var options = {
            chart: {
                renderTo: 'pnj-daily-chart',
                type: 'column'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: <?php echo json_encode($hari); ?> ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
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
            series: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;    
                            var kd= this.options.key;
                            // alert(kd);                        
                            
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);

        var options2 = {
            chart: {
                renderTo: 'pnj-weekly-chart',
                type: 'column'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: <?php echo json_encode($minggu); ?> ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ['week1','week2','week3','week4','week5'],
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
            series: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;    
                            var kd= this.options.key;
                            // alert(kd);                        
                            
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options2);

        var options5 = {
            chart: {
                renderTo: 'pnj-monthly-chart',
                type: 'column'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: <?php echo json_encode($bln); ?>
            }],                  
            xAxis: {
                title: {
                    text: null
                },
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
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

        options5.plotOptions = {
            series: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;    
                            var kd= this.options.key;
                            // alert(kd);                        
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options5);
</script>