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
class server_report_saku3_dash_rptDashSpd extends server_report_basic
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
		
        $sql1 = "select count(*) as jml
        from sju_perdin_m x 
        inner join sju_perdin_d y on x.no_perdin=y.no_perdin and x.kode_lokasi=y.kode_lokasi
        where x.kode_lokasi='$kode_lokasi' ";
       

        $sql2 = "select count(*) as jml,sum(isnull(y.upd,0)) as upd,sum(isnull(y.utrans,0)) as utrans
        from sju_perdin_m x 
        inner join sju_perdin_d y on x.no_perdin=y.no_perdin and x.kode_lokasi=y.kode_lokasi
        where x.kode_lokasi='$kode_lokasi' ";

        $sql3 = "select count(*) as jml,sum(isnull(y.utrans,0)) as utrans
        from sju_perdin_m x 
        inner join sju_perdin_d y on x.no_perdin=y.no_perdin and x.kode_lokasi=y.kode_lokasi
        where x.kode_lokasi='$kode_lokasi' ";

        
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-12 col-md-4'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Total Perjalanan Dinas</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs->fields[0] != "" ? $rs->fields[0] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>&nbsp;</b></p>

                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpdDetail','','$kode_lokasi/$periode/all/PD');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-4'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Total UPD</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs2->fields[0] != "" ? $rs2->fields[0] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[1],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpdUpd','','$kode_lokasi/$periode/all/UPD');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-4'>
                        <div class='small-box bg-aqua'>
                            <div class='inner'>
                                <center>
                                    <p>Total Transport</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs3->fields[0] != "" ? $rs3->fields[0] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[1],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpdUtr','','$kode_lokasi/$periode/all/UTRANS');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    
                </div>"; 
            
            echo"<div class='row'>
                    <div class='col-md-12'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Usulan Anggaran Unit</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-tagihan'>
                                    <thead>
                                        <tr>
                                            <th>Kode Unit</th>
                                            <th>Nama</th>
                                            <th>Total UPD</th>
                                            <th>Total Transport</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select a.kode_pp,a.nama, sum(isnull(y.upd,0)) as upd,sum(isnull(y.utrans,0)) as utrans
                                from pp a
                                inner join sju_perdin_d y on a.kode_pp=y.kode_pp and a.kode_lokasi=y.kode_lokasi
                                where a.kode_lokasi='$kode_lokasi' 
                                group by a.kode_pp,a.nama ";
									
                                    $rs5 = $dbLib->execute($sql); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                        <td>$row->kode_pp</td>
                                        <td>$row->nama</td>
                                            <td>".number_format($row->upd,0,',','.')."</td>
                                            <td>".number_format($row->utrans,0,',','.')."</td>
                                        </tr>";
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                    </div>
                </div>";
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Perjalanan Dinas Unit</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_upd'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Transport Unit</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_utrans'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

        $upd = $dbLib->execute("select a.kode_pp,a.nama, sum(isnull(y.upd,0)) as upd,sum(isnull(y.utrans,0)) as utrans
        from pp a
        inner join sju_perdin_d y on a.kode_pp=y.kode_pp and a.kode_lokasi=y.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' 
        group by a.kode_pp,a.nama  ");

        while ($row = $upd->FetchNextObject(false)){
            $series["upd"][] = array("name"=>$row->nama, "data"=>array(floatval($row->upd)));
            $updcategories[] = $row->nama;

        }

        $utrans = $dbLib->execute("select a.kode_pp,a.nama, sum(isnull(y.upd,0)) as upd,sum(isnull(y.utrans,0)) as utrans
        from pp a
        inner join sju_perdin_d y on a.kode_pp=y.kode_pp and a.kode_lokasi=y.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' 
        group by a.kode_pp,a.nama ");

        while ($row = $utrans->FetchNextObject(false)){
            $series["utrans"][] = array("name"=>$row->nama, "data"=>array(floatval($row->utrans)));
            $utranscategories[] = $row->nama;
        }

		echo "<script type='text/javascript'>
				var table2 = $('#table-progress-tagihan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '200px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
                table2.columns.adjust().draw();
                
                var options = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_upd',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
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
        
                options.series = ".json_encode($series["upd"]).";
                options.xAxis.categories = null;
        
                options.plotOptions = {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name;      
                                    // alert(id); 
        
                                    // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpdPp','','$kode_lokasi/$periode/upd/'+id);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options);
        
        
                var options2 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_utrans',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
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
        
                options2.series = ".json_encode($series["utrans"]).";
                options2.xAxis.categories = null;
        
                options2.plotOptions = {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name;  
                                    // alert(id);                          
                                    // window.parent.system.getResource(".$resource.").doOpenPbyr(id);
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpdPp','','$kode_lokasi/$periode/utrans/'+id);
                                }
                            }
                        }
                    }
                };
                new Highcharts.Chart(options2);  
			</script>
		";
        
		return "";
	}
	
}
?>
