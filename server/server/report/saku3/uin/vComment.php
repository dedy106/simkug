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
class server_report_saku3_uin_vComment extends server_report_basic
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

        // $res=$dbLib->execute("select status_admin from hakakses where nik='".$nik."' ");
        // if($res->fields[0] == "V"){
        //     $ver=TRUE;
        // }else{
        //     $ver=FALSE;
        // }

		
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
                                    <tr bgcolor='#ff9500' style='color:white;border-color:black'>
                                        <th>No Agenda</th>
                                        <th>Tanggal</th>
                                        <th>Keterangan</th>
                                        <th>Nilai Netto</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>";

                                // if($ver){
                                //     $sql= "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai from uin_aju_m a where a.progress in ('0','V') and a.kode_lokasi='$kode_lokasi' and a.periode LIKE '".$periode."%' order by a.no_aju desc";
                                // }else{
                                //     $sql= "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai from uin_aju_m a where a.progress in ('0','V') and a.kode_lokasi='$kode_lokasi' and a.periode LIKE '".$periode."%' and a.kode_pp='$kode_pp' order by a.no_aju desc";
                                // }

                                $sql= "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-a.ppn-a.pph as nilai from uin_aju_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='$nik'
                                where a.progress in ('0','V') and a.kode_lokasi ='$kode_lokasi' and a.periode like '".$periode."%' order by a.no_aju desc";
                                
                                $res = $dbLib->execute($sql); 

                                while ($row = $res->FetchNextObject(false))
                                {
                                echo" 
                                    <tr>
                                        <td>$row->no_aju</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                        <td><a class='btn btn-sm btn-primary' style='cursor:pointer;background:rgb(87, 169, 255);color:white;border-top:0;border-left:0;border-right:0;border-bottom:0;font-style:bold;font-size:11px;text-decoration:none;font-family:sans-serif;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_uin_vDok','','$kode_lokasi/$periode/$kode_pp/$row->no_aju/$nik');\">Pilih</a></td>
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
            'order': [[ 1, 'desc' ]]
        });
        table2.columns.adjust().draw();
        </script>";
		return "";
	}
	
}
?>
