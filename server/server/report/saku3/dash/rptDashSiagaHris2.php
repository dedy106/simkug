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
class server_report_saku3_dash_rptDashSiagaHris2 extends server_report_basic
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
        $nik=$tmp[3];
        
        $sql1 = "select count(*) as jumlah from gr_karyawan where kode_lokasi='$kode_lokasi' and flag_aktif='0'";
        $sql2 = "select count(*) as jumlah,isnull(sum(a.transport+a.harian),0) as nilai 
        from gr_spj_m a
        where a.kode_lokasi='$kode_lokasi' and a.progress='0' ";
        $sql3 = "select count(*) as jumlah,isnull(sum(a.transport+a.harian),0) as nilai 
        from gr_spj_m a
        where a.kode_lokasi='$kode_lokasi' and a.progress='1'";
        $sql4 = "select count(*) as jumlah,isnull(sum(a.transport+a.harian),0) as nilai 
        from gr_spj_m a
        where a.kode_lokasi='$kode_lokasi' and a.progress='2'";
		$sql5 = "select count(*) as jumlah,isnull(sum(a.transport+a.harian),0) as nilai 
        from gr_spj_m a
        where a.kode_lokasi='$kode_lokasi' and a.progress='3' ";
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
                                    <p style='margin:2px 0px;'>Karyawan</p>
                                    <h3 style='margin:2px 0px;'>".$rs->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/k1/kar');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Pengajuan</p>
                                    <h3 style='margin:2px 0px;'>".$rs2->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/k2/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Verifikasi</p>
                                    <h3 style='margin:2px 0px;'>".$rs3->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/k2/1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Approval</p>
                                    <h3 style='margin:2px 0px;'>".$rs4->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs4->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/k2/2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
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
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/k2/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
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
                                        <h3 class='box-title'>Karyawan per Status SDM </h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_sdm'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box box-primary'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Karyawan per Lokasi Kantor</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_lok'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='box box-warning'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Karyawan Per Kelompok Jabatan</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_jab'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box box-danger'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Karyawan per Grade</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_grd'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-12'>
                                <div class='box box-success'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Karyawan per Direktorat</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_dir'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";
        echo"</div>
            </div>
        </div>";

        //SDM

        $sql = "select a.sts_sdm,a.nama,isnull(b.jumlah,0) as jumlah
        from gr_status_sdm a
        left join (select a.sts_sdm,count(*) as jumlah 
                   from gr_karyawan a
                   where a.kode_lokasi='$kode_lokasi' and flag_aktif='0'
                   group by a.sts_sdm
                   )b on a.sts_sdm=b.sts_sdm
        where a.kode_lokasi='$kode_lokasi' ";
        $res = $dbLib->execute($sql);
       
        while ($row = $res->FetchNextObject(false)){
            $tmp = (array)$row;
            $sdmctg[] = $row->nama;    
            $sdms[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->sts_sdm);    
        }

        //LOKER
        $sql = "select a.kode_lokkantor,a.nama,isnull(b.jumlah,0) as jumlah
        from gr_lokkantor a
        left join (select a.lok_kantor,count(*) as jumlah 
                   from gr_karyawan a
                   where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='0'
                   group by a.lok_kantor
                   )b on a.kode_lokkantor=b.lok_kantor
        where a.kode_lokasi='$kode_lokasi' ";
        $res = $dbLib->execute($sql);
       
        while ($row = $res->FetchNextObject(false)){
            $tmp = (array)$row;
            $lokctg[] = $row->nama;    
            $loks[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_lokkantor);    
        }

        //JAB

        $sql = "select a.kode_klpjab,a.nama,isnull(b.jumlah,0) as jumlah
        from gr_klpjab a
        left join (select b.kode_klpjab,count(*) as jumlah 
                   from gr_karyawan a
                   inner join gr_jab b on a.kode_jab=b.kode_jab
                   where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='0'
                   group by b.kode_klpjab
                   )b on a.kode_klpjab=b.kode_klpjab
        where a.kode_lokasi='$kode_lokasi' ";

        $res = $dbLib->execute($sql);
       
        while ($row = $res->FetchNextObject(false)){
            $tmp = (array)$row;
            $jabctg[] = $row->nama;    
            $jabs[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_klpjab);    
        }
        //GRADE
        $sql = "select a.kode_grade,a.nama,isnull(b.jumlah,0) as jumlah
        from gr_grade a
        left join (select a.kode_grade,count(*) as jumlah 
                   from gr_karyawan a
                   where a.kode_lokasi='$kode_lokasi' and flag_aktif='0'
                   group by a.kode_grade
                   )b on a.kode_grade=b.kode_grade
        where a.kode_lokasi='$kode_lokasi' ";
        $res = $dbLib->execute($sql);
       
        while ($row = $res->FetchNextObject(false)){
            $tmp = (array)$row;
            $grdctg[] = $row->nama;    
            $grds[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_grade);    
        }
        //DIR
        $sql = "select a.kode_dir,a.nama,isnull(b.jumlah,0) as jumlah
        from gr_dir a
        left join (select a.kode_dir,count(*) as jumlah 
                   from gr_karyawan a
                   where a.kode_lokasi='$kode_lokasi' and flag_aktif='0'
                   group by a.kode_dir
                   )b on a.kode_dir=b.kode_dir
        where a.kode_lokasi='$kode_lokasi'";
        $res = $dbLib->execute($sql);
       
        while ($row = $res->FetchNextObject(false)){
            $tmp = (array)$row;
            $dirctg[] = $row->nama;    
            $dirs[] = array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_dir);    
        }

       
        echo "<script type='text/javascript'>
                        
                $('.panel').on('click', '#btn-refresh', function(){
                    location.reload();
                    // alert('hello');
                });

                // function drawChart(type, selector, series_array, categories, exporting, click_callback){
                //     if (typeof categories === 'undefined') { categories = null; }
                //     if (typeof exporting === 'undefined') { exporting = false; }
                //     if (typeof click_callback === 'undefined') { click_callback = null; }
                //     var options = {
                //         chart: {
                //             renderTo: selector,
                //             type: type
                //         },
                //         title:{
                //             text:''
                //         },
                //         exporting: { 
                //             enabled: exporting
                //         },
                //         series: [],
                //         xAxis: {
                //             title: {
                //                 text: null
                //             },
                //             categories: []
                //         },
                //         yAxis:{
                //             title: {
                //                 text: null
                //             },
                //         },
                //         credits: {
                //             enabled: false
                //         },
                //     };
                    
                //     options.series = series_array;
                //     options.xAxis.categories = categories;
                
                //     if(click_callback !== null){
                //         options.plotOptions = click_callback;
                //     }
                
                //     new Highcharts.Chart(options);
                // }

                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_sdm',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: ''
                    },
                    series: [{
                        name : 'Jumlah',
                        data : ".json_encode($sdms).",
                        colorByPoint : true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($sdmctg).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
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

                                    var kd= this.options.key;
                                                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/sdm/'+kd);
                                }
                            }
                        }
                    }
                };
                
            
                new Highcharts.Chart(options);


                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_lok',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: ''
                    },
                    series: [{
                        name : 'Jumlah',
                        data : ".json_encode($loks).",
                        colorByPoint : true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($lokctg).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
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

                                    var kd= this.options.key;
                                                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/lok/'+kd);
                                }
                            }
                        }
                    }
                };
            
                new Highcharts.Chart(options);


                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_jab',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: ''
                    },
                    series: [{
                        name : 'Jumlah',
                        data : ".json_encode($jabs).",
                        colorByPoint : true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($jabctg).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
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

                                    var kd= this.options.key;
                                                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/jab/'+kd);
                                }
                            }
                        }
                    }
                };
                
            
                new Highcharts.Chart(options);


                
                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_grd',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: ''
                    },
                    series: [{
                        name : 'Jumlah',
                        data : ".json_encode($grds).",
                        colorByPoint : true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($grdctg).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
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

                                    var kd= this.options.key;
                                                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/grd/'+kd);
                                }
                            }
                        }
                    }
                };
                
            
                new Highcharts.Chart(options);


                
                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_dir',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: ''
                    },
                    series: [{
                        name : 'Jumlah',
                        data : ".json_encode($dirs).",
                        colorByPoint : true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($dirctg).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
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

                                    var kd= this.options.key;
                                                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/dir/'+kd);
                                }
                            }
                        }
                    }
                };
                
            
                new Highcharts.Chart(options);
               
              

			</script>
		";
        
		return "";
	}
	
}
?>
