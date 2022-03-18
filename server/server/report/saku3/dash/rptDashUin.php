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
class server_report_saku3_dash_rptDashUin extends server_report_basic
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
		
        $sql1 = "select a.kdsatker,isnull(count(a.no_usul),0) as jum, isnull(sum(a.total),0) as total
        from uin_usul_m a 
        where a.form='BELANJA' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
        group by a.kdsatker";

        $sql2 = "select a.kdsatker,isnull(count(a.no_usul),0) as jum, isnull(sum(a.total),0) as total
        from uin_usul_m a 
        where a.form='PDPT' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
        group by a.kdsatker";

        $sql3 = "select a.kdsatker,isnull(count(a.no_aju),0) as jum, isnull(sum(a.nilai),0) as total
                from uin_aju_m a 
                where a.no_rekap <> 'PDPT' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
                group by a.kdsatker ";

        $sql4 = "select a.kdsatker,isnull(count(a.no_aju),0) as jum, isnull(sum(a.nilai),0) as total
        from uin_aju_m a 
        where a.no_rekap = 'PDPT' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
        group by a.kdsatker";
        
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
        $rs4 = $dbLib->execute($sql4);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Belanja</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs->fields[1] != "" ? $rs->fields[1] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/all/BELANJA');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Pendapatan</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs2->fields[1] != "" ? $rs2->fields[1] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/all/PDPT');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-aqua'>
                            <div class='inner'>
                                <center>
                                    <p>Realisasi Belanja</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs3->fields[1] != "" ? $rs3->fields[1] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/all/RB');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p>Realisasi Pendapatan</p>
                                    <p style='margin:2px 0px;font-size:25px'><b>".($rs4->fields[1] != "" ? $rs4->fields[1] : 0)."</b></p>
                                    <p style='margin:2px 0px;'><b>".number_format($rs4->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/all/RP');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
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
                                            <th>Belanja</th>
                                            <th>Pendapatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select a.kode_pp,a.nama, isnull(b.total,0) as belanja,isnull(c.total,0) as pdpt
                                from pp a
                                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                        from uin_usul_m a 
                                        where  a.form='BELANJA' and a.kode_lokasi='23' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
                                        group by a.kode_pp,a.kode_lokasi
                                        )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                        from uin_usul_m a 
                                        where  a.form='PDPT' and a.kode_lokasi='23' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
                                        group by a.kode_pp,a.kode_lokasi
                                        )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='23' and b.total <> null and c.total <> null";
									
                                    $rs5 = $dbLib->execute($sql); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/pp/$row->kode_pp');\">$row->kode_pp</a></td>
                                            <td>$row->nama</td>
                                            <td>".number_format($row->belanja,0,',','.')."</td>
                                            <td>".number_format($row->pdpt,0,',','.')."</td>
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
                                <h3 class='box-title'>Belanja Unit</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_belanja'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Pendapatan Unit</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_pendapatan'></div>
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

        $blj = $dbLib->execute("select a.kode_pp,a.nama, isnull(b.total,0) as total
        from pp a
        left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                from uin_usul_m a 
                where a.form='BELANJA' and a.kode_lokasi='23' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
                group by a.kode_pp,a.kode_lokasi
                )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='23' and b.total <> null ");

        while ($row = $blj->FetchNextObject(false)){
            $series["blj"][] = array("name"=>$row->nama, "data"=>array(floatval($row->total)));
            $bljcategories[] = $row->nama;

        }

        $pdpt = $dbLib->execute("select a.kode_pp,a.nama, isnull(b.total,0) as total
        from pp a
        left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                from uin_usul_m a 
                where a.form='PDPT' and a.kode_lokasi='23' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04'
                group by a.kode_pp,a.kode_lokasi
                )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='23' and b.total <> null");

        while ($row = $pdpt->FetchNextObject(false)){
            $series["pdpt"][] = array("name"=>$row->nama, "data"=>array(floatval($row->total)));
            $pdptcategories[] = $row->nama;
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
                        renderTo: 'uin_dash_main_chart_belanja',
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
        
                options.series = ".json_encode($series["blj"]).";
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
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/blj/'+id);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options);
        
        
                var options2 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_pendapatan',
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
        
                options2.series = ".json_encode($series["pdpt"]).";
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
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/pdpt/'+id);
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
