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
class server_report_saku3_belajar_rptLoadDash extends server_report_basic
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
        $nik_user=$tmp[4];
        
        $link = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser = $link."/web/server/dev";
        $root = $link;
        $path = $link."/";
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        $nik_login="dbsiaga";
        $pass="saisai";

        // $ch = curl_init(); 
        // curl_setopt($ch, CURLOPT_URL,'https://app.simkug.com/siaga-auth/autologin?nik='.$nik_login.'&password='.$pass);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //     'Content-Type: application/json; charset=utf-8',
        // ));
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        // $output = json_decode(curl_exec($ch));
        // curl_close($ch);   
        // if($output['status']){
            echo "
                <div id='dash-load-content'>
                    <object type='text/html' data='https://app.simkug.com/siaga-auth/autologin?nik=".$nik_login."&password=".$pass."' style='width:100%; height:100vh' >
                    <p>backup content</p>
                    </object>
                </div>
                <script type='text/javascript'>
                    console.log('$resource');
                    console.log('$fullId');
                    //$('#dash-load-content').load('https://app.simkug.com/siaga-auth/login');
                    $('body').css({'overflow-y':'hidden'})
                    $('#".$fullId."form').css({
                        'position': 'absolute',
                        'left': 0,
                        'top': 0,
                        'width': '100%',
                        'height': '100%',
                        'overflow': 'hidden'
                    });
                    $('#".$fullId."form').mousedown(function(e){
                        e.preventDefault();
                    });
                </script>      
                ";
        // }
      
		return "";
	}
	
}
?>
