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
class server_report_saku3_dash_rptDashLogDetail extends server_report_basic
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
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashLog','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Pengadaan InProgress</h3>                      
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
                                            <th>No Bukti</th>
                                            <th>Tanggal</th>
                                            <th>Kode PP</th>
                                            <th>Keterangan</th>
											<th>Status</th>
											<th >Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
									if ($jenis=="prog")
									{
										$sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,a.nilai
											from log_pesan_m a
											where a.kode_lokasi='$kode_lokasi' and a.progress='$kunci' and substring(a.periode,1,4)='2018'";
									}
									if ($jenis=="pp")
									{
										$sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,a.nilai
											from log_pesan_m a
											where a.kode_lokasi='$kode_lokasi' and a.kode_ppaju='$kunci' and substring(a.periode,1,4)='2018'";
									}
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->no_pesan</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
											<td>$row->progress</td>
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
			</script>
		";
        
		return "";
	}
	
}
?>
