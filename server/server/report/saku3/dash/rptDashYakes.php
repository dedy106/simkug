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
class server_report_saku3_dash_rptDashYakes extends server_report_basic
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
        
        $smallbox = "select x.kode_bidang,x.nama,isnull(y.jml,0) as jml,isnull(y.nilai,0) as nilai
        from bidang x left join (
        select  c.kode_bidang,count(*) as jml,sum(a.nilai) as nilai
        from panjar2_m a inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
        left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='99' and b.no_pj is null
        group by c.kode_bidang
        ) y  on x.kode_bidang=y.kode_bidang";
        $rs = $dbLib->execute($smallbox);        
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			<div class='panel-heading' style='font-size:18px;padding:10px 15px 0px 10px'>Modul Panjar</div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
                $i=0;
                $color = array('yellow', 'aqua', 'red', 'green');
                $icon = array('fa-bar-chart', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
                while ($row = $rs->FetchNextObject($toupper=false)) {
                    echo"<div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                <p style='margin:2px 0px;'>".$row->nama."</p>
                                <h3 style='margin:2px 0px;'>".$row->jml."</h3>
                                <p style='margin:2px 0px;'><b>".number_format($row->nilai,0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesBoxDetail','','$kode_lokasi/$periode/all/$row->kode_bidang');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
                    $i++;
                }
                    
           echo"</div>"; 
           echo"<div class='row'>
                    <div id='sai_home_list'>
                    <div class='box box-info'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Panjar Jatuh Tempo</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table table-bordered table-striped' id='table-panjar-outstanding'>
                                    <thead>
                                        <tr>
                                            <td>Kode PP</td>
                                            <td>Nama PP</td>
                                            <td>Jumlah</td>
                                            <td>Nilai</td>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                    $outstanding = "select a.kode_pp,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
									from pp a
									inner join (select a.kode_pp,count(*) as jumlah,a.kode_lokasi,sum(a.nilai) as nilai
												from panjar2_m a
                                                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                                                inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi 
                                                left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi 
                                                where a.periode>'201801' and b.no_pj is null
												and a.kode_lokasi='$kode_lokasi' and datediff(day,a.due_date,getdate()) >= -3
												group by a.kode_pp,a.kode_lokasi
											  )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
									where a.kode_lokasi='$kode_lokasi'";
                                    $rs2 = $dbLib->execute($outstanding);
                                    while ($row = $rs2->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesBoxDetail','','$kode_lokasi/$periode/pp/$row->kode_pp');\">$row->kode_pp</a></td>
                                            <td>".$row->nama."</td>
                                            <td>".$row->jumlah."</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                        </tr>";
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Rata-Rata Waktu Panjar per Bidang</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dbyakes_dash_main_chart_bidang'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Rata-Rata Waktu Panjar per Unit</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dbyakes_dash_main_chart_pp'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
        echo"</div>
            </div>
        </div>";

        $pp = $dbLib->execute("select a.kode_pp,a.nama,isnull(b.nilai,0) as nilai
        from pp a
        left join (select a.kode_pp,sum(jumlah_hari)/count(*) as nilai
                from (select a.kode_pp,
                    datediff(day,a.tanggal,isnull(b.tanggal,getdate()) ) as jumlah_hari
                    from panjar2_m a 
                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                    left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi =b.kode_lokasi
                    where a.periode >'201401'
                    ) a
                group by a.kode_pp
                )b on a.kode_pp=b.kode_pp
        where a.kode_lokasi='$kode_lokasi'");

        while ($row = $pp->FetchNextObject(false)){
            $series["pp"][] = array("name"=>$row->nama, "data"=>array(floatval($row->nilai)));
            $ppcategories[] = $row->nama;

        }

        $bidang = $dbLib->execute("select a.kode_bidang,a.nama,isnull(b.nilai,0) as nilai
        from bidang a
        left join (select a.kode_bidang,sum(jumlah_hari)/count(*) as nilai
                from (select c.kode_bidang,
                    datediff(day,a.tanggal,isnull(b.tanggal,getdate()) ) as jumlah_hari
                    from panjar2_m a 
                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                    left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi =b.kode_lokasi
                    where a.periode >'201807'
                    ) a
                group by a.kode_bidang
                )b on a.kode_bidang=b.kode_bidang");

        while ($row = $bidang->FetchNextObject(false)){
            $series["bidang"][] = array("name"=>$row->nama, "data"=>array(floatval($row->nilai)));
            $bidangcategories[] = $row->nama;
        }        
                		
		echo "<div id='container' style='min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto'></div>

        <script type='text/javascript'>

        var table2 = $('#table-panjar-outstanding').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        table2.columns.adjust().draw();

        var options = {
            chart: {
                renderTo: 'dbyakes_dash_main_chart_bidang',
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

        options.series = ".json_encode($series["bidang"]).";
        options.xAxis.categories = null;

        options.plotOptions = {
            column: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);


        var options2 = {
            chart: {
                renderTo: 'dbyakes_dash_main_chart_pp',
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

        options2.series = ".json_encode($series["pp"]).";
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
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/pp/'+id);
                        }
                    }
                }
            }
        };
        new Highcharts.Chart(options2);       
		</script>";
		return "";
	}
	
}
?>
