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
class server_report_saku3_dash_rptDashUin2Det extends server_report_basic
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
        $jenis=$tmp[2];
        $kunci=$tmp[3];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Usulan Belanja</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-panjar'>
                                    <thead>
                                        <tr>
                                            <th>Kode Unit</th>
                                            <th>Nama Unit</th>
                                            <th>Alokasi</th>
                                            <th>Close Usulan</th>
                                            <th>Open Usulan</th>
                                            <th>Total Usulan</th>
                                            <th>Pencapaian</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                    $sql = "select a.kode_pp,a.nama,isnull(d.belanja,0) as alokb,isnull(b.belanja,0) as closeb,isnull(b.openb,0) as openb,isnull(d.belanja,0)-isnull(b.belanja,0) as sisab,  isnull(b.belanja,0)+isnull(b.openb,0) as totalb,
                                    (isnull(b.belanja,0)+isnull(b.openb,0) )/isnull(d.belanja,0) * 100 as pencapaianb
                                    from pp a 
                                    left join ( select kode_pp,kode_lokasi,belanja,pdpt 
                                                from uin_alokasi_m 
                                                where tahun='2019' and kode_lokasi='$kode_lokasi' 
                                                ) d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
                                    left join ( select kode_pp,kode_lokasi,sum(total) as belanja, 
                                                sum(case when no_close='-' then total end) as openb from uin_usul_m 
                                                where tahun='2019' and form='BELANJA' and kode_lokasi='$kode_lokasi' 
                                                group by  kode_pp,kode_lokasi 
                                              ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  
                                    where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and d.belanja <> 0 and a.kode_pp='$kunci'
                                        ";
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->kode_pp</a></td>
                                            <td>$row->nama</td>
                                            <td align='right'>".number_format($row->alokb,0,',','.')."</td>
                                            <td align='right'>".number_format($row->closeb,0,',','.')."</td>
                                            <td align='right'>".number_format($row->openb,0,',','.')."</td>
                                            <td align='right'>".number_format($row->totalb,0,',','.')."</td>
                                            <td align='right'>".number_format($row->pencapaianb,2,',','.')."%</td>";
                                    echo"                                            
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
                </div>";
                echo"
                <div id='sai_home_grafik'>
                    <div class='row'>
                        <div class='col-md-6'>
                            <div class='box box-warning'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Penyusunan Anggaran Per Unit</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='uin_dash_main_chart_belanja'></div>
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
        $blj = $dbLib->execute("
        select a.kode_pp,a.nama,isnull(d.belanja,0) as alokb,isnull(b.belanja,0) as closeb,isnull(b.openb,0) as openb,isnull(d.belanja,0)-isnull(b.belanja,0) as sisab
        from pp a 
        left join ( select kode_pp,kode_lokasi,belanja,pdpt 
                    from uin_alokasi_m 
                    where tahun='2019' and kode_lokasi='$kode_lokasi' 
                    ) d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
        left join ( select kode_pp,kode_lokasi,sum(total) as belanja, 
                    sum(case when no_close='-' then total end) as openb from uin_usul_m 
                    where tahun='2019' and form='BELANJA' and kode_lokasi='$kode_lokasi' 
                    group by  kode_pp,kode_lokasi 
                  ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  
        where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and d.belanja <> 0 and a.kode_pp='$kunci' ");

        while ($row = $blj->FetchNextObject(false)){
            $series["blj"][] = array("name"=>$row->nama, "data"=>array(array('Close',floatval($row->closeb)),array('Open',floatval($row->openb)),array('Belum Tercapai',floatval($row->sisab))));
            $bljcategories[] = $row->nama;

        }

        echo "<script type='text/javascript'>
				var table2 = $('#table-progress-panjar').DataTable({
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
                        type: 'pie'
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
        
                options.series = ".json_encode($series["blj"]).";
                options.xAxis.categories =['Close','Open','Belum Tercapai'];
        
                options.plotOptions = {
                    pie: {
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true,
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
			</script>
		";

        
		return "";
	}
	
}
?>
