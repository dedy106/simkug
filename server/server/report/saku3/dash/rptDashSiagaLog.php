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
class server_report_saku3_dash_rptDashSiagaLog extends server_report_basic
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
        $kode_pp=$tmp[2];
        
		$sql1 = "select count(no_pesan) as jumlah,sum(nilai) as nilai from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='0' ";
        $sql2 = "select count(no_pesan) as jumlah,sum(nilai) as nilai from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='1' ";
        $sql3 = "select count(no_pesan) as jumlah,sum(nilai) as nilai from log_pesan_m where kode_lokasi='$kode_lokasi'  ";
        $sql4 = "select count(no_pesan) as jumlah,sum(nilai) as nilai from log_pesan_m where kode_lokasi='$kode_lokasi' ";
		$sql5 = "select count(no_pesan) as jumlah,sum(nilai) as nilai from log_pesan_m where kode_lokasi='$kode_lokasi' ";
		// echo $sql1;
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
        $rs4 = $dbLib->execute($sql4);
		$rs5 = $dbLib->execute($sql5);
		
        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp' ";
        $rsjum=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp' ";
        $rsnot=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard<div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                        <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                        <i class='fa fa-bell-o'></i>
                        <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rsjum->fields[0]."</span>
                        </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rsjum->fields[0]." notifications</li>";
            
                    while ($row = $rsnot->FetchNextObject($toupper=false)) {
                    echo"
                        <li>
                            <ul class='menu'>
                            <li>
                                <a href='#'>
                                <i class='fa fa-users text-aqua'></i> $row->pesan
                                </a>
                            </li>
                            </ul>
                        </li>
                        ";
                    }
                
                echo"
                        <li class='footer'><a href='#'>View all</a></li>
                        </ul>    
                    </li>
                    ";

                echo"
                        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Purchase Request</p>
                                    <h3 style='margin:2px 0px;'>".$rs->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/k1/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Approval Logistik</p>
                                    <h3 style='margin:2px 0px;'>".$rs2->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/k2/1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Proses Logistik</p>
                                    <h3 style='margin:2px 0px;'>".$rs3->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/k3/2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Penerimaan / BAST</p>
                                    <h3 style='margin:2px 0px;'>".$rs4->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs4->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/k4/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
					<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-green'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Pembayaran </p>
                                    <h3 style='margin:2px 0px;'>".$rs5->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs5->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/k5/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
            echo"<div class='row'>
                <div class='col-md-12'>
                    <div id='sai_home_grafik'>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='box box-success'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Proyek</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_proyek'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box box-primary'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>PP</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_pp'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='box box-warning'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Kategori</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_ktg'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box box-danger'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Kelompok</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_klp'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";
        echo"</div>
            </div>
        </div>";

        $proyek = "select top 10 a.kode_proyek,a.nama,isnull(b.jumlah,0) as jumlah
        from am_proyek a
        inner join (select a.id_proyek,count(*) as jumlah
                   from am_aset a
                   group by a.id_proyek
                   )b on a.id=b.id_proyek
        order by jumlah desc ";

        $resPro = $dbLib->execute($proyek);
        while ($row = $resPro->FetchNextObject(false)){
            // $pro["series"][] = array("name"=>$row->nama, "data"=>array(floatval($row->jumlah)));
            $pros[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_proyek);     
                    
            $ctgpro[]=$row->nama;
        }	

        $pp = $dbLib->execute("select top 10 a.kode_pp,a.nama,isnull(b.jumlah,0) as jumlah
        from am_pp a
        inner join (select a.kode_pp,count(*) as jumlah
                   from am_aset a
                   group by a.kode_pp
                   )b on a.kode_pp=b.kode_pp
        order by jumlah desc");

        while ($row = $pp->FetchNextObject(false)){
            // $series["pp"][] = array("name"=>$row->nama, "data"=>array(floatval($row->jumlah)));

            $pps[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_pp);     
                    
            $ppcategories[] = $row->nama;
        }

        $ktg = $dbLib->execute("select top 10 a.kode_kateg,a.nama,isnull(b.jumlah,0) as jumlah
        from am_kateg a
        inner join (select a.kode_kateg,count(*) as jumlah
                   from am_aset a
                   group by a.kode_kateg
                   )b on a.kode_kateg=b.kode_kateg
        order by jumlah desc");

        while ($row = $ktg->FetchNextObject(false)){
            // $series["ktg"][] = array("name"=>$row->nama, "data"=>array(floatval($row->jumlah)));
            $ktgs[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_kateg);     
                    
            $ctgktg[] = $row->nama;
        }

        $klp = $dbLib->execute("select top 10 a.kode_klp,a.nama,isnull(b.jumlah,0) as jumlah
        from am_lokasi_klp a
        inner join (select a.kode_klp,count(*) as jumlah
                   from am_aset a
                   group by a.kode_klp
                   )b on a.kode_klp=b.kode_klp
        order by jumlah desc");

        while ($row = $klp->FetchNextObject(false)){
            // $series["klp"][] = array("name"=>$row->nama, "data"=>array(floatval($row->jumlah)));
            $klps[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_klp);     
                    
            $ctgklp[] = $row->nama;
        }
        
        echo "<script type='text/javascript'>
                        
                $('.panel').on('click', '#btn-refresh', function(){
                    location.reload();
                    // alert('hello');
                });

                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_proyek',
                        type: 'bar'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    // series: ".json_encode($pro["series"]).",
                    series:[{
                        name : 'Jumlah',
                        data : ".json_encode($pros).",
                        colorByPoint : true,
                    }],
                    // series: ".json_encode($pros["series"]).",
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgpro).",
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
                                    var kd = this.options.key; 
                                     
                                    // alert(id);

                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/pro/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options);

                var options2 = {
                    chart: {
                        renderTo: 'dash_main_chart_pp',
                        type: 'bar'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    // series:".json_encode($series["pp"]).",
                    series:[{
                        name : 'Jumlah',
                        data : ".json_encode($pps).",
                        colorByPoint : true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ppcategories).",
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
                                    // var id = this.name;    
                                    var kd= this.options.key;                     
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/pp/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options2);

                var options3 = {
                    chart: {
                        renderTo: 'dash_main_chart_ktg',
                        type: 'bar'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    // series:".json_encode($series["ktg"]).",
                    series:[{
                        name : 'Jumlah',
                        data : ".json_encode($ktgs).",
                        colorByPoint : true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgktg).",
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
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    // var id = this.name;    
                                    var kd= this.options.key;                     
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/ktg/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options3);

                var options4 = {
                    chart: {
                        renderTo: 'dash_main_chart_klp',
                        type: 'bar'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    // series:".json_encode($series["klp"]).",
                    series:[{
                        name : 'Jumlah',
                        data : ".json_encode($klps).",
                        colorByPoint : true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgklp).",
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
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    // var id = this.name;    
                                    var kd= this.options.key;                     
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/klp/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options4);


			</script>
		";
        
		return "";
	}
	
}
?>
