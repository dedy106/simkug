<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

	$filter="";
	$cust=$nik;
	$polis=$_GET['param'];
	// 	if(isset($tmp[5]) || isset($tmp[6])){
	// 		$cust=$tmp[5];
			if($cust != "" ){
				$filter.= " and b.kode_cust='$cust' ";
			}
			if($polis != ""){
				$filter.= " and b.no_polis='$polis' ";
			}
			
			if($cust == "" AND $polis == ""){
				$filter="";
			}
    // 	}

    $server=$_SERVER['SERVER_NAME'];

    // echo $server;

		$sql1 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
        from sju_klaim a
        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='11' and a.status in ('0') $filter";
        $sql2 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
        from sju_klaim a
        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='11' and a.status in ('1') $filter";
        $sql3 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
        from sju_klaim a
        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='11' and a.status in ('2') $filter";
        $sql4 = "select count(*) as jumlah,isnull(sum(a.nilai),0) as nilai 
        from sju_klaim a
        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='11' and a.status in ('3') $filter";

        $sql5="select sum(a.jumlah) as jumlah, sum(a.nilai) as nilai 
        from (select a.kode_obl,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
               from sju_obl a
               left join (select a.kode_obl,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
                        from sju_klaim a
                        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' $filter
                        group by a.kode_obl )b on a.kode_obl=b.kode_obl
               where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0
            ) a";

        $sql6="select sum(a.jumlah) as jumlah, sum(a.nilai) as nilai
        from (select a.kode_sebab,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
              from sju_sebab a
              left join (select a.sebab,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
                        from sju_klaim a
                        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' $filter
                        group by a.sebab )b on a.kode_sebab=b.sebab
              where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0
        )a";

		// echo $sql."<br>".$sql2."<br>".$sql3."<br>".$sql4;
        
        $rs = execute($sql1);        
        $rs2 = execute($sql2);
        $rs3 = execute($sql3);
        $rs4 = execute($sql4);
        $rs5 = execute($sql5);
        $rs6 = execute($sql6);
        $tojum=$rs->fields[0]+$rs2->fields[0]+$rs3->fields[0]+$rs4->fields[0];
        $tonil=$rs->fields[1]+$rs2->fields[1]+$rs3->fields[1]+$rs4->fields[1];
        
	
        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsjum=execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsnot=execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			<div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'></div>
            <div class='panel-body'>";
            echo "<div id='crm_home_list'>
                    <div class='row' style='margin:0px;'>
                        <div class='col-md-6'>
                            <div class='box box-widget widget-user-2'>
                                <div class='widget-user-header bg-blue' style='height:125px;'>
                                <!-- <h3 class='widget-user-desc' style='margin-left:-12px; line-height: 0; padding-bottom:10px;'>Klaim</h3>-->
                                <a href='fMain.php?hal=app/sju/dashSjuDet.php&param=det2/LA/0/$polis' style='color:white'>
                                <div class='row sai-hover-blue sales-head'>
                                    <p hidden>sales_prog</p>
                                    <div class='col-xs-5' style='padding-left:5px;'>Laporan Awal</div>
                                    <div class='col-xs-2'>".$rs->fields[0]."</div>
                                    <div class='col-xs-5' style='text-align:right;'>".number_format($rs->fields[1],0,",",".")."</div>
                                </div>
                                </a>
                                <a href='fMain.php?hal=app/sju/dashSjuDet.php&param=det2/OT/1/$polis' style='color:white'>
                                <div class='row sai-hover-blue sales-head'>
                                    <p hidden>sales_prog</p>
                                    <div class='col-xs-5' style='padding-left:5px;'>Outstanding</div>
                                    <div class='col-xs-2'>".$rs2->fields[0]."</div>
                                    <div class='col-xs-5' style='text-align:right;'>".number_format($rs2->fields[1],0,",",".")."</div>
                                </div>
                                </a>
                                <a href='fMain.php?hal=app/sju/dashSjuDet.php&param=det2/NC/2/$polis' style='color:white'>
                                <div class='row sai-hover-blue sales-head'>
                                    <p hidden>sales_loss</p>
                                    <div class='col-xs-5' style='padding-left:5px;'>No Claim</div>
                                    <div class='col-xs-2'>".$rs3->fields[0]."</div>
                                    <div class='col-xs-5' style='text-align:right;'>".number_format($rs3->fields[1],0,",",".")."</div>
                                </div>
                                </a>
                                <a href='fMain.php?hal=app/sju/dashSjuDet.php&param=det2/ST/3/$polis' style='color:white'>
                                <div class='row sai-hover-blue sales-head'>
                                    <p hidden>sales_deal</p>
                                    <div class='col-xs-5' style='padding-left:5px;'>Settled</div>
                                    <div class='col-xs-2'>".$rs4->fields[0]."</div>
                                    <div class='col-xs-5' style='text-align:right;'>".number_format($rs4->fields[1],0,",",".")."</div>
                                </div>
                                </a>
                                <div class='row sai-hover-blue'>
                                    <div class='col-xs-5' style='padding-left:5px;'>Total</div>
                                    <div class='col-xs-2'>".$tojum."</div>
                                    <div class='col-xs-5' style='text-align:right;'>".number_format($tonil,0,",",".")."</div></div>
                                </div>
                                <div class='box-footer no-padding'>
                                   <ul class='nav nav-stacked' id='sales-monitoring-list'>
                                       <div class='row' style='padding-bottom:7px;padding-top:7px;'>
                                            <div class='col-xs-5' style='padding-left:25px;'><b>Progress</b></div>
                                            <div class='col-xs-2'><b>Jumlah</b></div>
                                            <div class='col-xs-5' style='padding-right:30px; text-align:right;'><b>Nilai</b></div>
                                        </div>";
                                        $sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
                                        from sju_klaim_progres a
                                        left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
                                        from sju_klaim a
                                        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                        where a.kode_lokasi='$kode_lokasi' $filter
                                        group by a.progress
                                        )b on a.kode_prog=b.progress";
                                        $res=execute($sql);
                                        $to1=0;$to2=0;
                                        while($row=$res->FetchNextObject($toupper=false)){
    
                                            echo 
                                            "<a href='fMain.php?hal=app/sju/dashSjuDet.php&param=det2/$row->kode_prog/non/$polis' style='color:black'><div class='row crm-monitor-sales' style='padding-bottom:7px;padding-top:7px; cursor:pointer'>
                                                <p hidden>".$row->kode_prog."</p>
                                                <div class='col-xs-5' style='padding-left:25px;'>".$row->nama."</div>
                                                <div class='col-xs-2'><span class='pull-right badge bg-blue' style='margin-right:5px;'>".$row->jumlah."</span></div>
                                                <div class='col-xs-5' style='padding-right:30px;'>
                                                    <span class='pull-right badge bg-yellow'>".number_format($row->nilai,0,",",".")."</span>
                                                </div>
                                            </div>
                                            </a>";
                                            
                                            $to1+=$row->jumlah;
                                            $to2+=$row->nilai;
                                        }
                                    echo"
                                    </ul>
                                </div>
                            </div>
                        </div>";
                        $jumclaimset=$rs3->fields[0]+$rs4->fields[0];
                        $nilclaimset=$rs3->fields[1]+$rs4->fields[1];
                        $ach=round(($jumclaimset/$to1)*100,2);
                        $ach2=round(($jumclaimset/($to1-$rs->fields[0]))*100,2);
                        $klaim=$to2;
                        $sql="select sum(b.n_premi) as nilai
                        from sju_klaim a
                        inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' $filter ";
                        $rsp=execute($sql);
                        $premi=$rsp->fields[0];
                        $rasio=round(($premi/$klaim)*100,2);
                        echo"
                        <div class='col-md-6'>
                            <div class='box box-widget widget-user-2'>
                                <div class='widget-user-header bg-success' style='height:250px;'>
                                    <h3 class='widget-user-desc' style='margin-left:-12px; line-height: 0; padding-bottom:10px;'></h3>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_prog</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>No Claim + Settled
                                        </div>
                                        <div class='col-xs-2'>".$jumclaimset."</div>
                                        <div class='col-xs-5' style='text-align:right;'>".number_format($nilclaimset,0,",",".")."</div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>Total Claim
                                        </div>
                                        <div class='col-xs-2'>".$to1."</div>
                                        <div class='col-xs-5' style='text-align:right;'>".number_format($to2,0,",",".")."</div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>ACH Selesai
                                        </div>
                                        <div class='col-xs-2'>".$ach."%</div>
                                        <div class='col-xs-5' style='text-align:right;'></div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>ACH Selesai Tanpa Laporan Awal
                                        </div>
                                        <div class='col-xs-2'>".$ach2."%</div>
                                        <div class='col-xs-5' style='text-align:right;'></div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>Premi
                                        </div>
                                        <div class='col-xs-2'></div>
                                        <div class='col-xs-5' style='text-align:right;'>".number_format($premi,0,",",".")."</div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>Klaim
                                        </div>
                                        <div class='col-xs-2'></div>
                                        <div class='col-xs-5' style='text-align:right;'>".number_format($klaim,0,",",".")."</div>
                                    </div>
                                    <div class='row sai-hover-red sales-head'>
                                        <p hidden=''>cont_signed</p>
                                        <div class='col-xs-5' style='padding-left:5px;'>Loss Ratio
                                        </div>
                                        <div class='col-xs-2'></div>
                                        <div class='col-xs-5' style='text-align:right;'>".$rasio."%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>              
                </div>";
                $res = execute("select a.kode_obl,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
                from sju_obl a
                left join (select a.kode_obl,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai 
                from sju_klaim a
                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' $filter
                group by a.kode_obl
                        )b on a.kode_obl=b.kode_obl
                where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0");

                while ($row = $res->FetchNextObject(false)){
                    $obju[] =array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_obl);
                    $objc[] = $row->nama;
                    $obnu[] = array('y'=>floatval($row->nilai),'name'=>$row->nama,'key'=>$row->kode_obl);
                    $obnc[] = $row->nama;
                    $dataobj[]=(array)$row;
                }

                $res = execute("select a.kode_sebab,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
                from sju_sebab a
                left join (select a.sebab,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai 
                from sju_klaim a
                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' $filter
                group by a.sebab
                        )b on a.kode_sebab=b.sebab
                where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0 ");

                while ($row = $res->FetchNextObject(false)){
                    $pybju[] =array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->kode_obl);
                    $pybjc[] = $row->nama;
                    $pybnu[] =array('y'=>floatval($row->nilai),'name'=>$row->nama,'key'=>$row->kode_obl);
                    $pybnc[] = $row->nama;
                    $datapyb[]=(array)$row;
                }

                echo"
                <div id='sai_home_grafik'>
                    <div class='row'>
                        <div class='col-md-6'>
                            <div class='nav-tabs-custom'>
                                <ul class='nav nav-tabs pull-right'>
                                    <li class='active'><a href='#tab_1' data-toggle='tab'>Jumlah</a></li>
                                    <li><a href='#tab_2' data-toggle='tab'>Nilai</a></li>
                                    <li><a href='#tab_5' data-toggle='tab'>Data</a></li>
                                    <li class='pull-left header'><i class='fa fa-bar-chart'></i>Object Of Loss</li>
                                </ul>
                                <div class='tab-content sai-container-overflow'>
                                    <div class='tab-pane active' id='tab_1'>
                                        <div id='home_obj_chartJum'></div>
                                    </div>
                                    <div class='tab-pane' id='tab_2'>
                                        <div id='home_obj_chartNil'></div>
                                    </div>
                                    <div class='tab-pane' id='tab_5'>
                                        <table class='table table-bordered table-striped table-condensed' id='table-chart'>
                                            <thead>
                                            <tr>
                                                <th>Object of Loss</th>
                                                <th>Jumlah</th>
                                                <th>Nilai</th>
                                            </tr>
                                            </thead>
                                            <tbody>";
                                            for($i=0;$i<count($dataobj);$i++){
                                           echo"<tr>
                                                    <td>".$dataobj[$i]['nama']."</td>
                                                    <td>".$dataobj[$i]['jumlah']."</td>
                                                    <td>".number_format($dataobj[$i]['nilai'],0,",",".")."</td>
                                                </tr>";
                                            }
                                            echo"
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-6'>
                            <div class='nav-tabs-custom'>
                                <ul class='nav nav-tabs pull-right'>
                                    <li class='active'><a href='#tab_3' data-toggle='tab'>Jumlah</a></li>
                                    <li><a href='#tab_4' data-toggle='tab'>Nilai</a></li>
                                    <li><a href='#tab_6' data-toggle='tab'>Data</a></li>
                                    <li class='pull-left header'><i class='fa fa-bar-chart'></i> Penyebab Kerugian</li>
                                </ul>
                                <div class='tab-content sai-container-overflow'>
                                    <div class='tab-pane active' id='tab_3'>
                                        <div id='home_pyb_chartJum'></div>
                                    </div>
                                    <div class='tab-pane' id='tab_4'>
                                        <div id='home_pyb_chartNil'></div>
                                    </div>
                                    <div class='tab-pane' id='tab_6'>
                                    <table class='table table-bordered table-striped table-condensed' id='table-chart'>
                                        <thead>
                                        <tr>
                                            <th>Penyebab Kerugian</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                        </tr>
                                        </thead>
                                        <tbody>";
                                        for($i=0;$i<count($datapyb);$i++){
                                       echo"<tr>
                                                <td>".$datapyb[$i]['nama']."</td>
                                                <td>".$datapyb[$i]['jumlah']."</td>
                                                <td>".number_format($datapyb[$i]['nilai'],0,",",".")."</td>
                                            </tr>";
                                        }
                                        echo"
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";                

            echo "<aside class='control-sidebar control-sidebar-dark' style='padding-bottom:600px;'>
				<div class='tab-content'>
					<div class='tab-pane active' id='control-sidebar-home-tab'>
						<select class='form-control input-sm' id='dash_polis' style='margin-bottom:5px'>
							<option value=''>Pilih No Register</option>";
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

							// $resLok = execute("select distinct kode_cust,nama from sju_cust order by kode_cust");
						   
							// while ($row = $resLok->FetchNextObject(false)){
							// 	echo " <option value=".$row->kode_cust.">".$row->kode_cust."-".$row->nama."</option>";
							// }
					
							
					echo"
						</select>
						<a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
					</div>
				</div>
				</aside>";
       	
        echo"</div>
           
        </div>";
		echo "<script>
			$(document).ready(function(){

				$('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
					var polis = $('#dash_polis').val();
					
					window.location.href='fMain.php?hal=app/sju/dashSju2.php&param='+polis;
					
				   
                });
                
                var options = {
                    chart: {
                        renderTo: 'home_obj_chartJum',
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
                        data: ".json_encode($obju)." ,
                        colorByPoint: true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($objc).",
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
                        renderTo: 'home_pyb_chartJum',
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
                        data: ".json_encode($pybju)." ,
                        colorByPoint: true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($pybjc).",
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
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbyrDetail','','$kode_lokasi/$periode/nis/'+id);
                                }
                            }
                        }
                    }
                };
                new Highcharts.Chart(options2);
        
                var options3 = {
                    chart: {
                        renderTo: 'home_obj_chartNil',
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
                        data: ".json_encode($obnu)." ,
                        colorByPoint: true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($obnc).",
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
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbyrDetail','','$kode_lokasi/$periode/nis/'+id);
                                }
                            }
                        }
                    }
                };
                new Highcharts.Chart(options3);
        
                var options4 = {
                    chart: {
                        renderTo: 'home_pyb_chartNil',
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
                        data: ".json_encode($pybnu)." ,
                        colorByPoint: true,
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($pybnc).",
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
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+id);
                                }
                            }
                        }
                    }
                };
                new Highcharts.Chart(options4);

				
			});
			</script>";
   
?>
