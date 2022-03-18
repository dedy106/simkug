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
class server_report_saku3_dash_rptDashUinUser extends server_report_basic
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

        $report="server_report_saku3_dash_rptDashUinUser";

        $sql = "select count(belanja) as jum,sum(belanja) as nilai from uin_alokasi_m where kode_lokasi='$kode_lokasi' and tahun='2019' and belanja > 0
        and kode_pp='$kode_pp' ";

        $sql1 = "select count(pdpt) as jum,isnull(sum(pdpt),0) as nilai from uin_alokasi_m where kode_lokasi='$kode_lokasi' and tahun='2019' and pdpt > 0
        and kode_pp='$kode_pp' ";

        $sql2 = "select count(a.no_usul) as jum,a.kode_lokasi,isnull(sum(a.total),0) as total
        from uin_usul_m a 
        where a.form='BELANJA' and a.kode_lokasi='$kode_lokasi' and a.tahun='2019' and a.kode_pp='$kode_pp'
        group by a.kode_lokasi";

        $sql3 = "select count(a.no_usul) as jum,a.kode_lokasi,isnull(sum(a.total),0) as total
        from uin_usul_m a 
        where a.form='PDPT' and a.kode_lokasi='$kode_lokasi' and a.tahun='2019' and a.kode_pp='$kode_pp'
        group by a.kode_lokasi ";
        
        $rs = $dbLib->execute($sql);    
        $rs1 = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Penyusunan Anggaran </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Alokasi Belanja</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs->fields[0],0,',','.')."</b></h3>
                                    <p><b>".number_format($rs->fields[1],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUserDetAlok','','$kode_lokasi/$periode/all/BELANJA/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Alokasi Pendapatan</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs1->fields[1],0,',','.')."</b></h3>
                                    <p><b>".number_format($rs1->fields[1],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUserDetAlok','','$kode_lokasi/$periode/all/PDPT/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-aqua'>
                            <div class='inner'>
                                <center>
                                    <p>Usulan Belanja</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs2->fields[0],0,',','.')."</b></h3>
                                    <p><b>".number_format($rs2->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUserDetUsul','','$kode_lokasi/$periode/all/BELANJA/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p>Usulan Pendapatan</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs3->fields[0],0,',','.')."</b></h3>
                                    <p><b>".number_format($rs3->fields[2],0,',','.')."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUserDetUsul','','$kode_lokasi/$periode/all/PDPT/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
            echo"<div class='row'>
                    <div class='col-md-12'>
                    <div id='sai_home_list'>
                    <div class='box box-info'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Usulan Anggaran Unit/Fakultas</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin table-striped' id='table-progress-tagihan'>
                                    <thead>
                                        <tr>
                                            <th>Kode Unit</th>
                                            <th>Nama</th>
                                            <th>Alokasi Belanja</th>
                                            <th>Usulan Belanja</th>
                                            <th>Alokasi Pendapatan</th>
                                            <th>Usulan Pendapatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select a.kode_pp,a.nama,isnull(b.belanja,0) as alok_blj,isnull(c.total,0) as usul_blj,isnull(b.pdpt,0) as alok_pdpt,isnull(d.total,0) as usul_pdpt 
                                from pp a
                                left join ( select kode_pp,kode_lokasi,belanja,pdpt 
                                            from uin_alokasi_m 
                                            where tahun='2019' and kode_lokasi='$kode_lokasi' 
                                            ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
                                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                            from uin_usul_m a 
                                            where  a.form='BELANJA' and a.kode_lokasi='$kode_lokasi' and a.tahun='2019'
                                            group by a.kode_pp,a.kode_lokasi
                                          )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                          from uin_usul_m a 
                                          where  a.form='PDPT' and a.kode_lokasi='$kode_lokasi' and  a.tahun='2019'
                                          group by a.kode_pp,a.kode_lokasi
                                          )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and b.belanja != 0 and a.kode_pp='$kode_pp'";
									
                                    $rs5 = $dbLib->execute($sql); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->kode_pp</a></td>
                                            <td>$row->nama</td>
                                            <td>".number_format($row->alok_blj,0,',','.')."</td>
                                            <td>".number_format($row->usul_blj,0,',','.')."</td>
                                            <td>".number_format($row->alok_pdpt,0,',','.')."</td>
                                            <td>".number_format($row->usul_pdpt,0,',','.')."</td>
                                        </tr>";
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id='sai_home_list2'>
                    <div class='box box-success'>
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
                            <table class='table no-margin table-striped' id='table-usul-belanja'>
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
                            where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and d.belanja <> 0 and a.kode_pp='$kode_pp'
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
                                <h3 class='box-title'>Penyusunan Anggaran Per Unit</h3>
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
                                <h3 class='box-title'>Usulan Belanja</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_pie'></div>
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
        select a.kode_pp,a.nama,isnull(c.total,0) as usul_blj,isnull(d.total,0) as usul_pdpt 
                from pp a
                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                            from uin_usul_m a 
                            where  a.form='BELANJA' and a.kode_lokasi='$kode_lokasi' and  a.tahun='2019' and a.kode_pp='$kode_pp'
                            group by a.kode_pp,a.kode_lokasi
                          )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                          from uin_usul_m a 
                          where  a.form='PDPT' and a.kode_lokasi='$kode_lokasi' and a.tahun='2019' and a.kode_pp='$kode_pp'
                          group by a.kode_pp,a.kode_lokasi
                          )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and a.kode_pp='$kode_pp' ");

        while ($row = $blj->FetchNextObject(false)){
            // $series["blj"][] = array("name"=>$row->nama, "data"=>array(floatval($row->usul_blj),floatval($row->usul_pdpt)));
            // $bljcategories[] = $row->nama;
            $bljseries[]=floatval($row->usul_blj);
            $pdptseries[]=floatval($row->usul_pdpt);

        }

        $res = $dbLib->execute("select distinct a.nama from pp a
        inner join uin_usul_m b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
        where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' and a.kode_pp='$kode_pp' ");

        while ($row2 = $res->FetchNextObject(false)){
            $categories[] = $row2->nama;
        }


        $bljpie = $dbLib->execute("
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
        where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and d.belanja <> 0 and a.kode_pp='$kode_pp' ");

        while ($row = $bljpie->FetchNextObject(false)){
            $series["bljpie"][] = array("name"=>$row->nama, "data"=>array(array('Close',floatval($row->closeb)),array('Open',floatval($row->openb)),array('Belum Tercapai',floatval($row->sisab))));
            $bljpiecategories[] = $row->nama;

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

                var table3 = $('#table-usul-belanja').DataTable({
                    // 'fixedHeader': true,
                    'scrollY': '200px',
                    // 'scrollX': '0px',
                    'scrollCollapse': true,
                    'order': [[ 2, 'asc' ]]
                    });
                table3.columns.adjust().draw();
                
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
                    series: [{
                        name: 'Belanja',
                        data: ".json_encode($bljseries)."
                    }, {
                        name: 'Pendapatan',
                        data: ".json_encode($pdptseries)."
            
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($categories).",
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
                                    var id = this.series.name; 
                                    var kd = this.category;    
                                    // alert('Category: ' + kd + ', name: ' + id);
        
                                    // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUserDetUsul','','$kode_lokasi/$periode/chart/'+id+'/$kode_pp');
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options);

                var options2 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_pie',
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
        
                options2.series = ".json_encode($series["bljpie"]).";
                options2.xAxis.categories =['Close','Open','Belum Tercapai'];
        
                options2.plotOptions = {
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
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/blj/'+id);
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
