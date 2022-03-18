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
class server_report_saku3_dash_rptDashSpdDetail extends server_report_basic
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
        
        if($jenis =="all"){
            if($kunci=="PD"){
                $judul="Perjalanan Dinas";
            }
        }
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpd','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>".$judul."</h3>                      
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
                                            <th>No PD</th>
                                            <th>Tujuan</th>
                                            <th>Berangkat</th>
                                            <th>Kembali</th>
                                            <th>Agenda</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    if ($jenis=="all")
									{
                                        if($kunci=="PD"){
                                            $sql = "select a.no_perdin,a.kode_lokasi,a.tujuan,convert(varchar,a.tgl_mulai, 105) as mulai,convert(varchar,a.tgl_selesai, 105) as selesai,
                                            a.agenda
                                        from sju_perdin_m a";
                                        }
                                    }
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        
                                    echo" 
                                        <tr>";
                                    
                                            echo"
                                            <td>$row->no_perdin</td>
                                            <td>$row->tujuan</td>
                                            <td>$row->mulai</td>
                                            <td>$row->selesai</td>
                                            <td>$row->agenda</td>";
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
            ";
        echo"</div>
            </div>
        </div>";
        echo "<script type='text/javascript'>
				var table2 = $('#table-progress-panjar').DataTable({
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
