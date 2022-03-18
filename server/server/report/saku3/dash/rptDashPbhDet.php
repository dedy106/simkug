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
class server_report_saku3_dash_rptDashPbhDet extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $jenis=$tmp[4];
        $box=$tmp[5];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbh','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "k1" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Pengajuan</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No PB </th>
                                    <th style='text-align:center;'>No Dokumen </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Due Date</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.keterangan,a.nilai
								from pbh_pb_m a
								where a.kode_lokasi='$kode_lokasi' and a.progress='0'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                        <td>$row->no_dokumen</td>
                                        <td>$row->tgl</td>
                                        <td>$row->tgl2</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "k2" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Verifikasi</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No PB </th>
                                    <th style='text-align:center;'>No Dokumen </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Due Date</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.keterangan,a.nilai
								from pbh_pb_m a
								where a.kode_lokasi='$kode_lokasi' and a.progress='1'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                        <td>$row->no_dokumen</td>
                                        <td>$row->tgl</td>
                                        <td>$row->tgl2</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k3" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Pembayaran</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No PB </th>
                                    <th style='text-align:center;'>No Dokumen </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Due Date</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.keterangan,a.nilai
								from pbh_pb_m a
								where a.kode_lokasi='$kode_lokasi' and a.progress='3'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                        <td>$row->no_dokumen</td>
                                        <td>$row->tgl</td>
                                        <td>$row->tgl2</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k4" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Pengajuan Selesai</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No PB </th>
                                    <th style='text-align:center;'>No Dokumen </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Due Date</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.keterangan,a.nilai
								from pbh_pb_m a
								where a.kode_lokasi='$kode_lokasi' and a.progress='3'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                        <td>$row->no_dokumen</td>
                                        <td>$row->tgl</td>
                                        <td>$row->tgl2</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "k5" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data SPB</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No PB </th>
                                    <th style='text-align:center;'>No Dokumen </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Due Date</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.keterangan,a.nilai
								from pbh_pb_m a
								where a.kode_lokasi='$kode_lokasi' and a.progress='2'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                        <td>$row->no_dokumen</td>
                                        <td>$row->tgl</td>
                                        <td>$row->tgl2</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                    }
                  
                    echo"
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
			var table2 = $('#table-pengajuan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 0, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
			
			</script>
		";
        
		return "";
	}
	
}
?>
