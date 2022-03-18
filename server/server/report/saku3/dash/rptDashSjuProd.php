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
class server_report_saku3_dash_rptDashSjuProd extends server_report_basic
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
        
		$sql1 = "select count(*) as jumlah,isnull(sum(nilai_k),0) as nilai from sju_pesanan_m where kode_lokasi='11' and progress='PS01';";
        $sql2 = "select count(*) as jumlah,isnull(sum(n_premi),0) as nilai from sju_quo_m where kode_lokasi='11' and progress in ('0','R','B','1');";
        $sql3 = "select count(*) as jumlah,isnull(sum(n_premi),0) as nilai from sju_quo_m where kode_lokasi='11' and progress in ('1');";
        $sql4 = "select count(*) as jumlah,isnull(sum(n_premi),0) as nilai from sju_placing_m where kode_lokasi='11' and progress in ('0','1');";
        $sql5 = "select count(*) as jumlah,isnull(sum(a.n_premi),0) as nilai 
from sju_polis_m a
left join sju_polisbayar_d b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='11' and b.no_bukti is null";
		
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
        $rs4 = $dbLib->execute($sql4);
		$rs5 = $dbLib->execute($sql5);

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsjum=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rsnot=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Produksi<div class='navbar-custom-menu pull-right padding:0px'>
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
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Pesanan</p>
                                    <h3 style='margin:2px 0px;'>".$rs->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/pesan/0');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Quotation</p>
                                    <h3 style='margin:2px 0px;'>".$rs2->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs2->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/quo/1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Nota Konfirmasi</p>
                                    <h3 style='margin:2px 0px;'>".$rs3->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs3->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-pie-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/nota/2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Placing</p>
                                    <h3 style='margin:2px 0px;'>".$rs4->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs4->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/pla/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
					<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-green'>
                            <div class='inner'>
                                <center>
                                    <p style='margin:2px 0px;'>Polis</p>
                                    <h3 style='margin:2px 0px;'>".$rs5->fields[0]."</h3>
                                    <p style='margin:2px 0px;'><b>".number_format($rs5->fields[1],0,",",".")."</b></p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/pol/3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
            echo"<div class='row'>
                <div class='col-md-12'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Polis Jatuh Tempo</h3>                      
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
                                            <th>Kode</th>
                                            <th>Nama Customer</th>
                                            <th>Jumlah Polis</th>
                                            <th>Nilai Premi</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select a.kode_cust,count(a.no_polis) as jumlah,c.nama as nama_cust,sum(a.n_premi) as nilai
									from sju_polis_m a
									inner join sju_polis_termin b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
									inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
									where a.kode_lokasi='11' and (a.tgl_selesai between '2019-03-01' and '2019-04-01') 
									group by a.kode_cust,c.nama
									order by jumlah desc
									";
									
                                    $rs5 = $dbLib->execute($sql); 
                                    while ($row = $rs5->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/jt/$row->kode_cust');\"> $row->kode_cust </a></td>
                                            <td>$row->nama_cust</td>
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
