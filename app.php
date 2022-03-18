<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="description" content="roojax framework is javascript framework that can build web more esay like desktop application. And you dont have to work hard with server side script...">
   <meta name="keywords" content="roojax, roojax jamboo, roojax officeair, roojax ajax, roojax grid, roojax component, roojax framework, roojax php">
   <meta name="robots" content="index, follow, noarchive">
<title>roojax Application</title>
<?php
	$param = $_GET["app"];
	if ($param == "app_tanbang_app")
		echo "<script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false'></script>";
?>
<script language="javascript">	
	function testload(e){
		hideProgress();
	}	
	function bfrOnUnload(evt){	
		system.logout();	
	}
	<?php	    		
		include_once("server/library.php");
        $defaultapp = file_get_contents("server/conf/myapp.conf");
		$app = explode("\r\n",$defaultapp);
		$app = explode("=",$app[0]);
		$param = $_GET["app"];
		if ($param == null) $param = $app[1];
		echo "window.initApp = '$param';\n";
        if ($param == "app_frontend_alpa_app"){
            $count = 1;
            $today = 1;
            $week = 1;
            $month = 1;          		
            
            $res = execute("select date_format(timein,'%Y-%m-%d') as timein,date_format(timein,'%Y-%m') as timemonth, WEEKOFYEAR(timein) as week from portal_log where userloc = '32'");
    		if (!is_string($res)){
    		    while ($row = $res->FetchNextObject(false)){    			
        		  if ($row->timein == date("Y-m-d")) $today++;
        		  if ($row->timemonth == date("Y-m")) $month++;
        		  if ($row->week == date("W")) $week++;
        		  $count++;
        		}    	            
    		}
    		$res = execute("select count(*) as total from userlog where userloc = '32' and date_format(timein,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') and date_format(timeout,'%Y-%m-%d') = '1900-01-01' ");
    		$online = 0;
    		if (!is_string($res)){
        		while ($row = $res->FetchNextObject(false)){    			
        		  $online = $row->total;
        		}    	            
    		}
    		$result = "window.visitor = {total:$count,today:$today,month:$month,week:$week,online:$online};\n";	
    		echo $result;	
        }		
		$user = $_POST["uid"];
		$pwd = $_POST["pwd"];		
        $param = "{";	
        $first = true;
		foreach($_GET as $key => $value){
		    if (!$first) $param .= ",";
    		$param .= "$key: \"$value\"";
    		$first = false;
        }
        $param .= "}";        
        echo "window.clientInfo = {ip:\"". $_SERVER["REMOTE_ADDR"] ."\", host:\"". gethostbyname($_SERVER["REMOTE_ADDR"]). "\",session:\"".md5(date("r")) ."\"};\n";
        echo "window.webparam = $param;\n";        
	?>					
</script>
<!--<script type="text/javascript" src="classes/addon/domready.js"></script> !-->
<script type="text/javascript" src="classes/addon/excanvas.js"></script>
<?php // <script type="text/javascript" src="classes/addon/curvycorners.js"></script> ?>
<script type="text/javascript" src="office/js/gui.js"></script>
<script type="text/javascript" src="classes/addon/constanta.js"></script>
<script type="text/javascript" src="classes/portalLib.js"></script>
<script type="text/javascript" src="classes/addon/dateLib.js"></script>
<script type="text/javascript" src="classes/addon/stringLib.js"></script>
<script type="text/javascript" src="classes/addon/graphicLib.js"></script>
<script type="text/javascript" src="classes/addon/numericLib.js"></script>
<script type="text/javascript" src="classes/addon/dateLib.js"></script>
<script type="text/javascript" src="classes/addon/periodeLib.js"></script>
<script type="text/javascript" src="classes/addon/transactionLib.js"></script>
<script type="text/javascript" src="classes/addon/swfobject_1.5.js"></script>
<script type="text/javascript" src="classes/addon/jsend.min.js"></script>
</head>
<body onbeforeunload="bfrOnUnload(event);" style="overflow:hidden; background:#15382d; font-family:Arial; font-size:11px;" leftmargin="0px" rightmargin="0px" topmargin="0px" bottommargin="0px"   >      	  
	  <div id="system_block" style="z-index:3;position:absolute;background-color:#15382d;left:0px;top:0px;width:100%;height:100%;display:none" align='center' valign='middle'>		
	  </div>				  
	  <div id="system_splash" style="z-index:3;position:absolute;left:0%; top:0%; width:100%; height:100%;background:#15382d;display:" >				
		<img id="syssplash_img" src="image/jambookcl.png" width="200px" height="200px" style="z-index:999;position:absolute;left:40%;top:30%;height:200;width:200;"/>			
	  </div>
	  <div>
		<image src="image/jamboologo.png" style="position:absolute;top:40%;left:0;width:100;height:100;z-index:1"/>
		 <span style="position:absolute;top:46%;left:100;width:auto;height:100;font-family:arial;font-size:25px;color:#ffffff;z-index:2" >roo<font color='#ff9900'>j</font>ax (<font color='#ff9900'>j</font>amboo)</span>
		 <span style="position:absolute;top:51%;left:100;width:auto;height:100;font-family:arial;font-size:10px;color:#ffffff;z-index:2" >SAI &copy;2009</span>
			 
	  </div>
	  <div id="system" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:2;display:">
		 <div id="systemform" style="background:transparant;left:0px; top:0px; width:100%;height:100%;overflow:hidden">
		 </div>			 
	  </div>	  	 
	  <div id="systemMsg" style="position:absolute;left:0px; top:0px; width:400; height:315;z-index:3;display:none">
		 <div id="msgBg" style="position:absolute;left:0px; top:0px;width:100%;height:100%;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8"></div>		  	     
	     <div id="msgHeader" style='position:absolute;left:0;top:0;width:100%;height:35;color:#ff0000;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8'><img src='image/themes/dynpro/iconAlertSmall.png' style='position:absolute;left:10;top:0;width:28;height:28;' /><span style='position:absolute;left:50;top:5;width:auto;height:25;font-size:16;font-style:italics'>Error Log</span> </div>         
         <div id="msgTxt" style="position:absolute;color: #ffffff;left:0px; top:35;width:100%;height:280;overflow:auto;align:left;white-space:nowrap"></div>
	  </div>
	  <div id="systembtn" style="position:absolute;left:0px; top:0px; width:400; height:40;z-index:3;display:none">
		 <img id='syserrorbtn' src="image/themes/dynpro/iconAlertSmall.png" style="position:absolute;width:25;top:0;left:370;height:25" onClick='systemAPI.showErrorLog()'/>
		 <div id='sysbtn' style='display:none;position:absolute;cursor:pointer;-webkit-border-radius: 10px;-moz-border-radius: 10px;background-color:#0d6491;background-image:url(image/button.png);border:2px solid #ff9900;top:0;width:80;height:20' onClick='systemAPI.hide();' onMouseOut='systemAPI.mouseout(event);' onMouseOver='systemAPI.mouseover(event);'  align='center'>OK</div>
	  </div>
	    <div id="systemabout" style="position:absolute;left:0px; top:0px; width:700; height:400px;z-index:9;display:none" onclick="hideAbout();">		 
		</div>
	  <div id="systemDbg" align="center" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:9;display:none">      		                         			 
		 <div id="dbgBg" style="background:#4d7795;position:absolute;left:0px; top:0px;width:100%;height:100%;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8" ></div>
		 <div id="dbgTxt" style="padding:5px 5px 5px 5px;border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #999999;border-bottom:1px solid #999999;position:absolute;color: #ffffff;background:#283f60;left:0px; top:0px;width:auto;height:auto" ></div>
	  </div>	  
	  <div id="system_loading" style="z-index:3;visibility:hidden;position:absolute;left:42%; top:40%; width:220px; height:80;background:;border:2px solid #45b2f0;overflow:hidden;-webkit-border-radius: 10px;-moz-border-radius: 10px;display:" align='center'>        
		<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#000000;-webkit-border-radius: 10px;-moz-border-radius: 10px;filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7"></div>
		<div style="position:absolute;width:100%;height:50%;top:50%;left:0;background-image:url(image/whitegradsmall.png);background-position:bottom left;background-repeat:repeat-x;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3;-webkit-border-bottom-left-radius: 10px;-webkit-border-bottom-right-radius: 10px;-moz-border-radius-bottomleft: 10px;-moz-border-radius-bottomright: 10px;"></div>
		<div style="position:absolute;top:0;left:0;width:100%;height:50%;background-image:url(image/whitegradsmalltop.png);background-position:top left;background-repeat:repeat-x;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8;-webkit-border-top-left-radius: 10px;-webkit-border-top-right-radius: 10px;-moz-border-radius-topleft: 10px;-moz-border-radius-topRight: 10px;"></div>						
		<div style="position:absolute;top:10;left:0;width:100%;font-size:12;height:20;text-align:center;color:#ffffff;display:">Please Wait....</div>						
		<img src="image/mainloader.gif" style="position:absolute;top:32;left:45%;" />
		<div id="loading_text" style="position:absolute;top:50;left:0;width:100%;height:20;text-align:center;color:#45b2f0;display:">Loading system libraries...</div>								
	  </div>	  	
	  <div id='bordered' style='position:absolute;width:100%;height:30;left:0;top:100%;z-index:8' align='right'>				
		<div id='statusbar' align='center' style='visibility:hidden;position:absolute;width:100%;height:100%;left:0;top:-20;background:#ffffff;border:1px solid #45b2f0;z-index:3'></div>		
	  </div>			 	
	  <iframe name="loader" id="loader" border=0 onload="afterLoad()" style='display:;width:1;height:1;top:1;left:1;position:absolute'>	  
	  </iframe>	  	    
	  <iframe name="downloader" id="downloader" onload="afterLoad()" border=0 style='display:;width:1;height:1;top:1;left:1;position:absolute'>	  
	  </iframe>
	  <iframe name="framecontainer" id="framecontainer" border=0 style='display:;width:1;height:1;top:1;left:1;position:absolute'>	  
	  </iframe>
	  <iframe name="reporter" id="reporter" onload="afterLoad()" border=0 style='display:;width:1;height:1;top:1;left:1;position:absolute'>	  
	  </iframe>	  	    
</body>
</html>
