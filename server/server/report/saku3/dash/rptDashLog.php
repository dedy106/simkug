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
class server_report_saku3_dash_rptDashLog extends server_report_basic
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
        
		
        $sql1 = "select count(no_pesan) as jumlah from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='0' and substring(periode,1,4)='2018' ";
        $sql2 = "select count(no_pesan) as jumlah from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='1' and substring(periode,1,4)='2018'";
        $sql3 = "select count(no_pesan) as jumlah from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='2' and substring(periode,1,4)='2018'";
        $sql4 = "select count(no_pesan) as jumlah from log_pesan_m where kode_lokasi='$kode_lokasi' and progress='3' and substring(periode,1,4)='2018'";
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
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>&nbsp;<div class='navbar-custom-menu pull-right padding:0px'>
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
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Justifikasi Kebutuhan</p>
                                    <h3 id='home_siswa_box'>".$rs->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLogDetail','','$kode_lokasi/$periode/prog/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Justifikasi Pengadaan</p>
                                    <h3 id='home_tgh_box'>".$rs2->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLogDetail','','$kode_lokasi/$periode/prog/1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p>Pengadaan</p>
                                    <h3 id='home_pbyr_box'>".$rs3->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLogDetail','','$kode_lokasi/$periode/prog/2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p>Pembayaran</p>
                                    <h3 id='home_ots_box'>".$rs4->fields[0]."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLogDetail','','$kode_lokasi/$periode/prog/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
            echo"<div class='row'>
                <div class='col-md-12'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Pengadaan Per Unit</h3>                      
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
                                            <th>Kode PP</th>
                                            <th>Nama</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select a.kode_pp,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
									from pp a
									inner join (select a.kode_ppaju,a.kode_lokasi,count(a.kode_pp) as jumlah,sum(a.nilai) as nilai
												from log_pesan_m a
												where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='2018'
												group by a.kode_ppaju,a.kode_lokasi
											  )b on a.kode_pp=b.kode_ppaju and a.kode_lokasi=b.kode_lokasi
									where a.kode_lokasi='$kode_lokasi' 
									";
									
                                    $rs5 = $dbLib->execute($sql); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLogDetail','','$kode_lokasi/$periode/pp/$row->kode_pp');\"> $row->kode_pp </a></td>
                                            <td>$row->nama</td>
                                            <td>".number_format($row->jumlah,0,',','.')."</td>
                                            <td>".number_format($row->nilai,0,',','.')."</td>
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
            ";
        echo"</div>
            </div>
        </div>";
		echo "<script type='text/javascript'>
				var table2 = $('#table-progress-tagihan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '200px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
                table2.columns.adjust().draw();
                
                $('.panel').on('click', '#btn-refresh', function(){
                    location.reload();
                });

			</script>
		";
        
		return "";
	}
	
}
?>
