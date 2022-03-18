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
class server_report_saku3_belajar_vDok extends server_report_basic
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
        $no_agenda=$tmp[3];  
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        echo"<div class='row'>
        <div class='col-md-12'>
            <div class='nav-tabs-custom'>
                <ul class='nav nav-tabs '>
                    <li class='active'><a href='#tab_1' data-toggle='tab'>Data Pengajuan</a></li>
                    <li class='pull-right header'><a href='#' style='font-size:14px' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_belajar_vComment','','$kode_lokasi/$periode/$kode_pp');\"> Back <i class='fa fa-arrow-circle-left'></i></a></li>
                </ul>
                <div class='tab-content sai-container-overflow'>
                    <div class='tab-pane active' id='tab_1'>
                        <div id='yakes_chart_cash_penem2'>
                            <table class='table no-margin table-striped table-bordered' id='table-agenda'>
                                <thead>
                                    <tr>
                                        <th>Kode Dok</th>
                                        <th>Jenis Dok</th>
                                        <th>Path File</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>";

                                $sql= "select b.kode_dok,b.nama,a.no_gambar 
                                from  uin_aju_dok a inner join uin_dok_ver b on a.kode_dok=b.kode_dok and a.kode_lokasi=b.kode_lokasi 
                                where a.no_aju = '$no_agenda' and a.kode_lokasi='23' order by a.nu";
                                $res = $dbLib->execute($sql); 

                                while ($row = $res->FetchNextObject(false))
                                {
                                echo" 
                                    <tr>
                                        <td>$row->kode_dok</td>
                                        <td>$row->nama</td>
                                        <td>$row->no_gambar</td>
                                        <td><a class='btn btn-sm btn-primary' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_belajar_vDetailDok','','$kode_lokasi/$periode/$kode_pp/$row->kode_dok/$row->no_gambar/$no_agenda');\">Eval</a></td>
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
