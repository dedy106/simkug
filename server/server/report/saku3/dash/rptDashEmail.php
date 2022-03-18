<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dash_rptDashEmail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"))."media/";		
		$tmp=explode("/",$this->filter2);
		// $email="dedy106@gmail.com";
		$email="enahadiani2@gmail.com";
		//$sql = " select top 1 * from lokasi";
		//$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$mail=new server_util_mail();
		
		$AddOnLib=new server_util_AddOnLib();
		//while ($row = $rs->FetchNextObject($toupper=false))
		//{
			$content = "
		<!DOCTYPE html>
			<html lang='en'>
			<head>
				<title>Approval</title>
			</head>
			<body>
				<div style='margin:0; padding:75px; background-color: #EDF0F3; height: auto; margin-left: auto; margin-right: auto;'>
					<table width='80%' style='background-color: white; margin-left: auto; margin-right: auto;'>
						<tr>
							
							<td align = 'center' width = '100%'>
								<h3 style='width:50%; margin-left: auto;margin-right: auto;margin-bottom: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'>SIAGA</h3>
								<h3 style='width:90%; margin-left: auto;margin-right: auto;margin-top: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'>Approval RRA Online</h3>
							</td>
						</tr>
						<tr>
							<td colspan = '2' style='border-top-width:1px; border-top-style:solid; border-top-color: #ff4d4d; padding:30px 45px; padding-top: 0px; padding-left: 10px; padding-right: 10px; text-align: justify; font-family: Roboto-Regular,Helvetica,Arial,sans-serif'>
								<p>
									Approval RRA Online
								</p>
								
							</td>
						</tr>
						<tr style='width: 100%; height: 50px; background-color: #ff4d4d;'>
							<td colspan = '2'></td>
						</tr>
					</table>
				</div>
			</body>
			</html>
		";
			
		 
			$i=$i+1;
		//}
		$html.= "</div>";
		//$html=ob_get_contents();
		//echo $html;
		//echo $email."-".$emailadm."-".$emailttg;
		$numSent = $mail->sendMail(null, $email,"Approval RRA", $content,null);
		return "";
	}
	
}
?>
  
