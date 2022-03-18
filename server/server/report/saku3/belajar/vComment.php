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
class server_report_saku3_belajar_vComment extends server_report_basic
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
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        echo"<div class='row'>
        <div class='col-md-12'>
            <div class='nav-tabs-custom'>
                <ul class='nav nav-tabs '>
                    <li class='active'><a href='#tab_1' data-toggle='tab'>Daftar Pengajuan</a></li>
                    
                </ul>
                <div class='tab-content sai-container-overflow'>
                    <div class='tab-pane active' id='tab_1'>
                        <div id='yakes_chart_cash_penem2'>
                            <table class='table no-margin table-striped table-bordered' id='table-agenda'>
                                <thead>
                                    <tr>
                                        <th>No Agenda</th>
                                        <th>Tanggal</th>
                                        <th>Keterangan</th>
                                        <th>Nilai</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>";

                                $sql= "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai from uin_aju_m a where a.progress in ('0','V') and a.kode_lokasi='23' and a.periode LIKE '2019%' order by a.no_aju desc";
                                $res = $dbLib->execute($sql); 

                                while ($row = $res->FetchNextObject(false))
                                {
                                echo" 
                                    <tr>
                                        <td>$row->no_aju</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,',','.')."</td>
                                        <td><a class='btn btn-sm btn-primary' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_belajar_vDok','','$kode_lokasi/$periode/$kode_pp/$row->no_aju');\">Pilih</a></td>
                                    </tr>";
                                }                           
                        echo    "</tbody>
                            </table>
                        </div>
                    </div>
                    <div class='tab-pane' id='tab_2'>
                        <div id='yakes_data_cash_penem2'>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>";

        echo "<script>
        var table2 = $('#table-agenda').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        table2.columns.adjust().draw();
        </script>";
		return "";
	}
	
}
?>
