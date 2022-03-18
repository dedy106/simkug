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
class server_report_saku3_sppd_vApiTU extends server_report_basic
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

        
        $ch = curl_init('http://api.telkomuniversity.ac.id/finance/getDataKaryawan');

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, "simkug:Simkug4pi");
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $rs = json_decode(curl_exec($ch));
        curl_close($ch);

        // <td>".$rs[$i]->worklocation_name1."</td>
        // <td>".$rs[$i]->worklocation_name2."</td>
        // <td>".$rs[$i]->structurallocation1."</td>
        // <td>".$rs[$i]->structurallocation2."</td>
        // <td>".$rs[$i]->academicfuncposition."</td>
        // <td>".$rs[$i]->worklocationid."</td>
        // print_r($rs);
        $tbl = '';
        for($i=0; $i<count($rs); $i++){
            $tbl .= 
            "<tr>
                <td>".$rs[$i]->employeeid."</td>
                <td>".$rs[$i]->fullname."</td>
                <td>".$rs[$i]->positionid."</td>
                <td>".$rs[$i]->unitid."</td>
                <td>".$rs[$i]->employeestatus."</td>
            </tr>";
        }

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
                    <a class='btn btn-primary'>Simpan ke DB</a>
                    <br><br>
                    <table class='table no-margin table-striped table-bordered' id='table-agenda'>
                        <thead>
                            <tr bgcolor='#ff9500' style='color:white;border-color:black'>
                                <th>NIK</th>
                                <th>Nama</th>
                                <th>ID Posisi</th>
                                <th>ID Unit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>$tbl</tbody>
                    </table>
                </div>
            </div>";

        echo "<script>
        var table2 = $('#table-agenda').DataTable({
        });
        table2.columns.adjust().draw();
        </script>";
		return "";
	}
	
}
?>
