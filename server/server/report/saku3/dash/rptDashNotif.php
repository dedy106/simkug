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
class server_report_saku3_dash_rptDashNotif extends server_report_basic
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
        /*
        $sqlBox1 = " select count(*) as jum from pbh_pb_m where progress='0' and kode_lokasi='$kode_lokasi'";
        $rs = $dbLib->execute($sqlBox1);  
        $sqlBox2 = " select count(*) as jum from pbh_pb_m where progress='1' and kode_lokasi='$kode_lokasi'";
        $rs1 = $dbLib->execute($sqlBox2);  
        $sqlBox3 = " select count(*) as jum from pbh_pb_m where progress='2' and kode_lokasi='$kode_lokasi'";
        $rs2x = $dbLib->execute($sqlBox3);  
        $sqlBox4 = " select count(*) as jum from pbh_pb_m where progress='2' and kode_lokasi='$kode_lokasi'";
        $rs3x = $dbLib->execute($sqlBox4);  
        // echo $rs3x->fields[0];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);
		*/
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                                <ul class='users-list clearfix'>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApproval2.php' ><img src='$app1' width='80px' alt='User Image'><br>
                                        Approval VP</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;'  href='fMain.php?hal=app/siaga/fApproval3.php'><img src='$app2' width='80px'  alt='User Image'><br>
                                        Approve Dir Unit</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApproval.php'><img src='$app3' width='80px'  alt='User Image'><br>
                                        Approve RRA Anggaran</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApprovalDir.php' ><img src='$app4' width='80px' alt='User Image'><br>
                                        Approve RRA Direksi</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>";
               
                echo"               
            </div>
       </div>";     
                		
		echo "
        <script type='text/javascript'>
        </script>
        
        ";

		return "";
	}
	
}
?>
