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

function toJuta($x) {
    $nil = $x / 1000000;
    return number_format($nil,2,",",".") . " JT";
}
class server_report_saku3_dash_rptDashYakesLogo extends server_report_basic
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
        if($tmp[1] == ""){
            $tmp=explode("|",$this->filter2);
        }
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $tglakhir = $tmp[5];
        $kode_plan = $tmp[6];
        $kode_klp= $tmp[7];

		
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
		$path = $link."/";
        $logo = $path."image/YakesDash.png";
        
		$AddOnLib=new server_util_AddOnLib();

        echo"
        <div style='height: 100vh;text-align: center;position: relative;width: 85vw;'>
            <img src='$logo' style='width: 200px;position: absolute;top: 0;bottom: 0;margin: auto;'>
        </div>
        ";
        

		return "";
	}
	
}
?>