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
class server_report_saku3_dash_rptDashTest extends server_report_basic
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
        
        $sqlSis = "select isnull(count(distinct(nim)),0) as siswa from dev_siswa where kode_lokasi='$kode_lokasi'";
        $sqlTgh = "select isnull(count(distinct(no_tagihan)),0) as tgh from dev_tagihan_m where kode_lokasi='$kode_lokasi'";
        $sqlPbyr = "select isnull(count(distinct(no_bayar)),0) as pbyr from dev_bayar_m where kode_lokasi='$kode_lokasi'";
        $sqlOts = "select isnull(count(a.no_tagihan),0) as ots from (select c.no_tagihan,d.nama,c.tanggal,c.keterangan,isnull(a.nilai,0) as nilai_t, isnull(b.nilai,0) as nilai_b ,isnull(a.nilai,0)-isnull(b.nilai,0) as saldo
				from dev_tagihan_m c inner JOIN
				(select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan 
				left join 
				(select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan 
				inner join dev_siswa d on c.nim=d.nim
				where isnull(a.nilai,0)-isnull(b.nilai,0)>0 and c.kode_lokasi='$kode_lokasi') a ";
        $rs = $dbLib->execute($sqlSis);        
        $rs2 = $dbLib->execute($sqlTgh);
        $rs3 = $dbLib->execute($sqlPbyr);
        $rs4 = $dbLib->execute($sqlOts);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
        <div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> Dashboard 
            <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px'><i class='fa fa-undo'> Refresh</i></a>";
            // echo"
            //     <form class='form-inline' >
            //         <div class='form-group'>
            //             <div class='col-sm-3' style='margin-bottom:5px;'>
                            
            //                 <select class='form-control selectize'>";

            //                 $rs2 = $dbLib->Execute("select kode_form, nama from lab_form");
            //                 while($row = $rs2->FetchNextObject($toupper = false)){
            //                 echo "<option value='".$row->kode_form."'>".$row->kode_form." - ".$row->nama."</option>";
            //                 }

            // echo "          </select>    
            //             </div>
            //         </div>
            //     </form>";
        echo"
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Siswa</p>
                                    <h3 id='home_siswa_box'>".$rs->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiswaDetail','','$kode_lokasi/$periode/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Tagihan</p>
                                    <h3 id='home_tgh_box'>".$rs2->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/all/1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p>Pembayaran</p>
                                    <h3 id='home_pbyr_box'>".$rs3->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbyrDetail','','$kode_lokasi/$periode/all/2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p>Outstanding</p>
                                    <h3 id='home_ots_box'>".$rs4->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' style='cursor:pointer;color:white' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashOtsDetail','','$kode_lokasi/$periode/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
            echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Tagihan Per Jurusan</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div class='table-responsive sai-container-overflow'>
                                <table width='100%' class='display' id='table-progress-tagihan'>
                                    <thead>
                                        <tr>
                                            <th>Kode Jurusan</th>
                                            <th>Nama Jurusan</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                            <th>Kode Jurusan</th>
                                            <th>Nama Jurusan</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                            <th>Kode Jurusan</th>
                                            <th>Nama Jurusan</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                            <th>Kode Jurusan</th>
                                            <th>Nama Jurusan</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                    $sqltagihan = "select a.kode_jur,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
                                    from dev_jur a
                                    inner join (select b.kode_jur,a.kode_lokasi,count(b.kode_jur) as jumlah,sum(c.nilai) as nilai
                                                from dev_tagihan_m a
                                                inner join dev_siswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
                                                inner join (select no_tagihan,kode_lokasi,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan,kode_lokasi) c on a.no_tagihan=c.no_tagihan and a.kode_lokasi=c.kode_lokasi
                                                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='2018'
                                                group by b.kode_jur,a.kode_lokasi
                                    )b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi'";
                                
                                    $rs5 = $dbLib->execute($sqltagihan); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/jur/$row->kode_jur');\">$row->kode_jur</a></td>
                                            <td>$row->nama</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/jur/$row->kode_jur');\">$row->kode_jur</a></td>
                                            <td>$row->nama</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/jur/$row->kode_jur');\">$row->kode_jur</a></td>
                                            <td>$row->nama</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/jur/$row->kode_jur');\">$row->kode_jur</a></td>
                                            <td>$row->nama</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
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
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Jumlah</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Nilai</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Tagihan</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='home_tgh_chartJum'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='home_tgh_chartNil'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_3' data-toggle='tab'>Jumlah</a></li>
                                <li><a href='#tab_4' data-toggle='tab'>Nilai</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Pembayaran</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_3'>
                                    <div id='home_pbyr_chartJum'></div>
                                </div>
                                <div class='tab-pane' id='tab_4'>
                                    <div id='home_pbyr_chartNil'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
        echo"</div>
            </div>
        </div>";

        $res = $dbLib->execute("select a.nim,b.nama,count(a.no_tagihan) as jumlah from dev_tagihan_m a 
                                inner join dev_siswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
								where a.kode_lokasi='$kode_lokasi' group by a.nim,b.nama");
		while ($row = $res->FetchNextObject(false)){
            $tghjs["series"][] =array($row->nim, floatval($row->jumlah));
            $tghju[] =array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->nim);
			$tghjc[] = $row->nama;
        }

        echo json_encode($tghju);
       
        $res = $dbLib->execute("select a.nim,count(a.no_bayar) as jumlah
				from dev_bayar_m a 
				where a.kode_lokasi='$kode_lokasi'
				group by a.nim");
				
		while ($row = $res->FetchNextObject(false)){
			$pbyrjs["series"][] = array($row->nim, floatval($row->jumlah));
			$pbyrjc[] = $row->nim;
        }
        
        $res = $dbLib->execute("select a.nim,sum(b.nilai) as nilai
								from dev_tagihan_m a 
								inner join dev_tagihan_d b on a.no_tagihan=b.no_tagihan
								where a.kode_lokasi='$kode_lokasi' group by a.nim");
				
		while ($row = $res->FetchNextObject(false)){
		    $tghns["series"][] = array($row->nim, floatval($row->nilai));
			$tghnc[] = $row->nim;
        }

        $res = $dbLib->execute("select a.nim,sum(b.nilai) as nilai
				from dev_bayar_m a inner join dev_bayar_d b on a.no_bayar=b.no_bayar
				where a.kode_lokasi='$kode_lokasi'
				group by a.nim");
			
		while ($row = $res->FetchNextObject(false)){
			$pbyrns["series"][] = array($row->nim, floatval($row->nilai));
			$pbyrnc[] = $row->nim;
		}

                		
		echo "<div id='container' style='min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto'></div>

        <script type='text/javascript'>

        // var table2 = $('#table-progress-tagihan').DataTable({
        //     // 'fixedHeader': true,
        //     'scrollY': '200px',
        //     // 'scrollX': '0px',
        //     'scrollCollapse': true,
        //     'order': [[ 2, 'asc' ]]
        // });
        // table2.columns.adjust().draw();

        // var table = $('#table-progress-tagihan').DataTable( {
        //     lengthChange: false,
        //     dom: 'Bfrtip',
        //     buttons: [ 'copyHtml5', 'excelHtml5','csvHtml5' ]
        // } );
        
       
       
        // $('.buttons-copy').html('<i class='fa fa-download'></i> Copy');

        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function ( data, row, column, node ) {
                        // Strip $ from salary column to make it numeric
                        // return column === 2 ? data.replace( /[.,]/g, '' ) : data;
                        // return column === 3 ? data.replace( /[.,]/g, '' ) : data;
                        if(column == 2 || column ==3 ){
                            return data.replace( /[.,]/g, '' );
                        }else{
                            return data;
                        }

                    }
                }
            }
        };
     
        $('#table-progress-tagihan').DataTable( {
           
            dom: 'Bfrtip',
            buttons: [
                $.extend( true, {}, buttonCommon, {
                    extend: 'copyHtml5'
                } ),
                $.extend( true, {}, buttonCommon, {
                    extend: 'excelHtml5'
                } ),
                $.extend( true, {}, buttonCommon, {
                    extend: 'csvHtml5'
                } )
            ]
        } );

        $('#table-progress-tagihan').addClass('table table-bordered table-striped table-hover');
        

        $('.dt-button').addClass('btn btn-primary');
        $('.dt-buttons ').addClass('pull-left');

        var options = {
            chart: {
                renderTo: 'home_tgh_chartJum',
                type: 'bar'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: ".json_encode($tghju)." ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($tghjc).",
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
                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);


        var options2 = {
            chart: {
                renderTo: 'home_pbyr_chartJum',
                type: 'bar'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: ".json_encode($pbyrjs["series"])." ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($pbyrjc).",
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
            bar: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;                            
                            // window.parent.system.getResource(".$resource.").doOpenPbyr(id);
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbyrDetail','','$kode_lokasi/$periode/nis/'+id);
                        }
                    }
                }
            }
        };
        new Highcharts.Chart(options2);

        var options3 = {
            chart: {
                renderTo: 'home_pbyr_chartNil',
                type: 'bar'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Nilai',
                data: ".json_encode($pbyrns["series"])." ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($pbyrnc).",
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
            bar: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;                            
                            // window.parent.system.getResource(".$resource.").doOpenPbyr(id);
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbyrDetail','','$kode_lokasi/$periode/nis/'+id);
                        }
                    }
                }
            }
        };
        new Highcharts.Chart(options3);

        var options4 = {
            chart: {
                renderTo: 'home_tgh_chartNil',
                type: 'bar'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Nilai',
                data: ".json_encode($tghns["series"])." ,
                colorByPoint: true,
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($tghnc).",
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
            bar: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;                            
                            // window.parent.system.getResource(".$resource.").doOpenPbyr(id);
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+id);
                        }
                    }
                }
            }
        };
        new Highcharts.Chart(options4);



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

        $('.panel').on('click', '#btn-refresh', function(){
            // location.reload();
            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTest','','$kode_lokasi/$periode');
        });
        
        </script>";
        
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/checklist.png";
        
        
		return "";
	}
	
}
?>
