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
class server_report_saku3_dash_rptDashNotifDet extends server_report_basic
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
        $report=$tmp[4];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('$report','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                            $title= "Daftar Notif";
                            $column_array = array('No','Tgl Notif','Judul','Pesan','Kode PP');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            
                            $sql = "select tgl_notif, title,pesan,kode_pp from api_notif
                                    where kode_lokasi='$kode_lokasi' and nik='$nik'  
                                    order by tgl_notif desc";
                            
                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            $no=1;
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td>$no</td>
                                            <td>$row->tgl_notif</td>
                                            <td>$row->title</td>
                                            <td>$row->pesan</td>
                                            <td>$row->kode_pp</td>
                                        </tr>";
                                $no++;
                            }
                  
                    echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                $thead
                                </tr>
                                </thead>
                                <tbody>
                                $tbody
                                </tbody>
                            </table>
                            </div>
                        </div>";

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
