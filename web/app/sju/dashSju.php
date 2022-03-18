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

		// echo $sql."<br>".$sql2."<br>".$sql3."<br>".$sql4;
        
        $rs = execute($sql1);        
        $rs2 = execute($sql2);
        $rs3 = execute($sql3);
        $rs4 = execute($sql4);
	
        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsjum=execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsnot=execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			<div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Klaim";
			// echo"
			// <div class='navbar-custom-menu pull-right' style='padding-right: 16px;' >
            //         <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
            //             <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
            //             <i class='fa fa-bell-o'></i>
            //             <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rsjum->fields[0]."</span>
            //             </a>
            //         <ul class='dropdown-menu'>";
            //     echo"
            //         <li class='header'>You have ".$rsjum->fields[0]." notifications</li>";
            
            //         while ($row = $rsnot->FetchNextObject($toupper=false)) {
            //         echo"
            //             <li>
            //                 <ul class='menu'>
            //                 <li>
            //                     <a href='#'>
            //                     <i class='fa fa-users text-aqua'></i> $row->pesan
            //                     </a>
            //                 </li>
            //                 </ul>
            //             </li>
            //             ";
            //         }
                
            //     echo"
            //             <li class='footer'><a href='#'>View all</a></li>
            //             </ul>    
            //         </li>
            //         ";

            //     echo"
			// 		<li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b></b></span></i></a>
			// 		</li>
			// 		<li>
			// 			<a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:5px;' class='btn btn-primary btn-sm'><i class='fa fa-filter'> <span style='font-family:sans-serif'><b></b></span></i></a>
			// 		</li>
            //         </ul>
			// 	</div>";
				echo"
			</div>
            <div class='panel-body'>";
        echo   "<div class='row' id='dashbox'>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Laporan Awal</p>
                                    <h3 style='margin:2px 0px;'>".$rs->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' data-toggle='collapse' data-target='#demo0'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Outstanding</p>
                                    <h3 style='margin:2px 0px;'>".$rs2->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' data-toggle='collapse' data-target='#demo1'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>No Claim</p>
                                    <h3 style='margin:2px 0px;'>".$rs3->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' data-toggle='collapse' data-target='#demo2'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-green'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Settled</p>
                                    <h3 style='margin:2px 0px;'>".$rs4->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs4->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' data-toggle='collapse' data-target='#demo3'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
					<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Loss Ratio</p>
                                    <h3 style='margin:2px 0px;'>".$rs4->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>&nbsp;</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaimDet','','$kode_lokasi/$periode?$kode_pp/$nik/$kode_fs/k4/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
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
							where a.kode_lokasi='11' and b.kode_cust='$cust'
							group by a.no_polis,a.kode_lokasi 
									)b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
							where a.kode_lokasi='11' ");
						   
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
            
				echo "<div id='demo0' class='collapse'>
						<div class='row'>
							<div class='col-md-12'>
								<div class='table-responsive'>
									<table class='table table-striped'>
										<thead>
										  <tr class='warning'>
											<th>Progress </th>
											<th>Jumlah</th>
											<th>Nilai Klaim</th>
										  </tr>
										</thead>
										<tbody>";
										$sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
											from sju_klaim_progres a
											left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
											from sju_klaim a
											inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
											where a.kode_lokasi='11' and a.status='0' $filter
											group by a.progress
													)b on a.kode_prog=b.progress
											where a.status='0'
											order by a.nu ";
													
										$rs = execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' href='fMain.php?hal=app/sju/dashSjuDet.php&param=det/$row->kode_prog/0/$polis' class='detKlaim'>$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
											  </tr>";
										}
										echo "</tbody>
									</table>
								</div>
							</div>
						</div>";
				
				echo "</div>";
				
				
				echo "<div id='demo1' class='collapse'>
						<div class='row'>
							<div class='col-md-12'>
								<div class='table-responsive'>
									<table class='table table-striped'>
										<thead>
										  <tr class='info'>
											<th>Progress </th>
											<th>Jumlah</th>
											<th>Nilai Klaim</th>
										  </tr>
										</thead>
										<tbody>";
										$sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
											from sju_klaim_progres a
											left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
											from sju_klaim a
											inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
											where a.kode_lokasi='11' and a.status='1' $filter
											group by a.progress
													)b on a.kode_prog=b.progress
											where a.status='1'
											order by a.nu ";
													
										$rs = execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' href='fMain.php?hal=app/sju/dashSjuDet.php&param=det/$row->kode_prog/1/$polis'>$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
											  </tr>";
										}
										echo "</tbody>
									</table>
								</div>
							</div>
						</div>";
				
				echo "</div>";
				
				echo "<div id='demo2' class='collapse'>
						<div class='row'>
							<div class='col-md-12'>
								<div class='table-responsive'>
									<table class='table table-striped'>
										<thead>
										  <tr class='danger'>
											<th>Progress </th>
											<th>Jumlah</th>
											<th>Nilai Klaim</th>
										  </tr>
										</thead>
										<tbody>";
										$sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
											from sju_klaim_progres a
											left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
											from sju_klaim a
											inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
											where a.kode_lokasi='11' and a.status='2' $filter
											group by a.progress
													)b on a.kode_prog=b.progress
											where a.status='2'
											order by a.nu ";
													
										$rs = execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' href='fMain.php?hal=app/sju/dashSjuDet.php&param=det/$row->kode_prog/2/$polis'  >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
											  </tr>";
										}
										echo "</tbody>
									</table>
								</div>
							</div>
						</div>";
				
				echo "</div>";
			
				echo "<div id='demo3' class='collapse'>
						<div class='row'>
							<div class='col-md-12'>
								<div class='table-responsive'>
									<table class='table table-striped'>
										<thead>
										  <tr class='success'>
											<th>Progress </th>
											<th>Jumlah</th>
											<th>Nilai Klaim</th>
										  </tr>
										</thead>
										<tbody>";
										$sql="select a.kode_prog,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
											from sju_klaim_progres a
											left join (select a.progress,count(a.no_klaim) as jumlah,sum(a.nilai) as nilai
											from sju_klaim a
											inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
											where a.kode_lokasi='11' and a.status='3' $filter
											group by a.progress
													)b on a.kode_prog=b.progress
											where a.status='3'
											order by a.nu ";
													
										$rs = execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' href='fMain.php?hal=app/sju/dashSjuDet.php&param=det/$row->kode_prog/3/$polis'  >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
											  </tr>";
										}
										echo "</tbody>
									</table>
								</div>
							</div>
                        </div>";

				echo "</div>";
				
        echo"</div>
           
        </div>";
		echo "<script>
			$(document).ready(function(){
				$('.demo1').click(function(){
					$('.collapse').collapse('toggle');
				});

				

				// $('.panel').on('click', '#open-sidebar', function(){
            
				// 	if($('aside').hasClass('control-sidebar-open')){
				// 		 $('aside').removeClass('control-sidebar-open');
				// 	}else{
				// 		 $('aside').addClass('control-sidebar-open');
				// 	}
				// });
		
		
				$('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
					var polis = $('#dash_polis').val();
					
					window.location.href='fMain.php?hal=app/sju/dashSju.php&param='+polis;
					
				   
				});

				
			});


			
			</script>";
   
?>
