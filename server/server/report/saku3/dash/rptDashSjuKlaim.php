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
class server_report_saku3_dash_rptDashSjuKlaim extends server_report_basic
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
		$kode_fs=$tmp[4];
	
		$filter="";
		$cust="";
		$polis="";
		if(isset($tmp[5]) || isset($tmp[6])){
			$cust=$tmp[5];
			$polis=$tmp[6];
			if($cust != "" ){
				$filter.= " and b.kode_cust='$cust' ";
			}
			if($polis != ""){
				$filter.= " and b.no_polis='$polis' ";
			}
			
			if($cust == "" AND $polis == ""){
				$filter="";
			}
		}

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
        
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
        $rs4 = $dbLib->execute($sql4);
	
        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsjum=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsnot=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Klaim<div class='navbar-custom-menu pull-right padding:0px'>
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
					<li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
					</li>
					<li>
						<a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:5px;' class='btn btn-primary btn-sm'><i class='fa fa-filter'> <span style='font-family:sans-serif'><b>Filter</b></span></i></a>
					</li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
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
				
				echo "<aside class='control-sidebar control-sidebar-dark' style='margin-top:40px;padding-bottom:500px;padding-top:20px'>
				<div class='tab-content'>
					<div class='tab-pane active' id='control-sidebar-home-tab'>
						<select class='form-control input-sm' id='dash_cust'>
							<option value=''>Pilih Tertanggung</option>";
	
							$resLok = $dbLib->execute("select a.kode_cust,a.nama
							from sju_cust a
							inner join (select b.kode_cust,a.kode_lokasi
							from sju_klaim a
							inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
							where a.kode_lokasi='11'
							group by b.kode_cust,a.kode_lokasi 
									)b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
							where a.kode_lokasi='11' ");
						   
							while ($row = $resLok->FetchNextObject(false)){
								echo " <option value=".$row->kode_cust.">".$row->kode_cust."-".$row->nama."</option>";
							}
					
					echo"  
						</select>
						<select class='form-control input-sm' id='dash_polis'>
							<option value=''>Pilih No Register</option>";
							$resPo = $dbLib->execute("select a.no_polis,a.no_dok
							from sju_polis_m a
							inner join (select a.no_polis,a.kode_lokasi
							from sju_klaim a
							inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
							where a.kode_lokasi='11'
							group by a.no_polis,a.kode_lokasi 
									)b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
							where a.kode_lokasi='11' ");
						   
							while ($row = $resPo->FetchNextObject(false)){
								echo " <option value=".$row->no_polis.">".$row->no_polis."-".$row->no_dok."</option>";
							}

							// $resLok = $dbLib->execute("select distinct kode_cust,nama from sju_cust order by kode_cust");
						   
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
											<th>Nilai Premi</th>
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
													
										$rs = $dbLib->execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaimDet','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/det/$row->kode_prog/0/$cust/$polis');\" >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
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
											<th>Nilai Premi</th>
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
													
										$rs = $dbLib->execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaimDet','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/det/$row->kode_prog/1/$cust/$polis');\" >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
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
											<th>Nilai Premi</th>
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
													
										$rs = $dbLib->execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaimDet','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/det/$row->kode_prog/2/$cust/$polis');\" >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
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
											<th>Nilai Premi</th>
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
													
										$rs = $dbLib->execute($sql);
										while ($row = $rs->FetchNextObject($toupper=false)) {
											echo "<tr>
												<td><a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaimDet','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/det/$row->kode_prog/3/$cust/$polis');\" >$row->nama</a></td>
												<td align='right'>$row->jumlah</td>
												<td align='right'>".number_format($row->nilai,0,',','.')."</td>
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

				$('.panel').on('click', '#btn-refresh', function(){
					location.reload();
				});

				$('.panel').on('click', '#open-sidebar', function(){
            
					if($('aside').hasClass('control-sidebar-open')){
						 $('aside').removeClass('control-sidebar-open');
					}else{
						 $('aside').addClass('control-sidebar-open');
					}
				});
		
		
				$('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
					var cust = $('#dash_cust').val();
					var polis = $('#dash_polis').val();
					
					window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaim','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/'+cust+'/'+polis);
					
				   
				});

				$('#control-sidebar-home-tab').on('change','#dash_cust', function(){
					var cust = $(this).val();
					// alert(cust);
					$.ajax({
						type: 'POST',
						url: 'dashSju.php?fx=getPolis',
						dataType: 'json',
						data: {'kode_lokasi':".$kode_lokasi.", 'cust':cust},
						success:function(result){
							// alert('work');
							$('#dash_polis').children('option:not(:first)').remove();
							$('#dash_polis').append(result.html);
						}
					});
				   
				});
			});


			
			</script>";
        
		return "";
	}
	
}
?>
