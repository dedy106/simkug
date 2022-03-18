<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="description" content="roojax framework is javascript framework that can build web more esay like desktop application. And you dont have to work hard with server side script...">
   <meta name="keywords" content="roojax, roojax jamboo, roojax officeair, roojax ajax, roojax grid, roojax component, roojax framework, roojax php">
   <meta name="robots" content="index, follow, noarchive">
<title>rj-Office Air</title>
<script language="javascript">
	
	<?php	    		        
		$param = $_GET["app"];		
		echo "window.initApp = 'app_officeair_app';\n";        
        $param = "{";	
        $first = true;
		foreach($_GET as $key => $value){
		    if (!$first) $param .= ",";
    		$param .= "$key: \"$value\"";
    		$first = false;
        }
        $param .= "}";
        echo "window.clientInfo = {ip:\"". $_SERVER["REMOTE_ADDR"] ."\", host:\"". gethostbyname($_SERVER[""]). "\",session:\"".md5(date("r")) ."\"};\n";
        echo "window.webparam = $param;\n";
	?>					
</script>
<!--<script type="text/javascript" src="classes/addon/domready.js"></script> !-->
<script type="text/javascript" src="classes/addon/excanvas.js"></script>
<script type="text/javascript" src="classes/addon/curvycorners.js"></script>
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
</head>
<body onunload="bodyUnLoad(event);" style="overflow:hidden; background:#1d292f; font-family:Arial; font-size:11px;" leftmargin="0px" rightmargin="0px" topmargin="0px" bottommargin="0px"   >      
	  <div id="system_block" style="z-index:3;position:absolute;background-color:#1d292f;left:0px;top:0px;width:100%;height:100%;display:none" align='center' valign='middle'>		
	  </div>				  
	  <div id="system_splash" style="z-index:8;position:absolute;left:0%; top:0%; width:100%; height:100%;background:#1d292f;display:" >				
		<img id="syssplash_img" src="image/jambookcl.png" width="200px" height="200px" style="z-index:999;position:absolute;left:40%;top:30%;height:200;width:200;"/>			
	  </div>
	  <div>
		<image src="image/jamboologo.png" style="position:absolute;top:40%;left:0;width:100;height:100;z-index:2"/>
		 <span style="position:absolute;top:46%;left:100;width:auto;height:100;font-family:arial;font-size:25px;color:#ffffff;z-index:2" >roo<font color='#ff9900'>j</font>ax (<font color='#ff9900'>j</font>amboo)</span>
		 <span style="position:absolute;top:51%;left:100;width:auto;height:100;font-family:arial;font-size:10px;color:#ffffff;z-index:2" >SAI &copy;2009</span>
			 
	  </div>
	  <div id="system" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:2;display:">
			 <div id="systemform" style="background:transparent;left:0px; top:0px; width:100%;height:100%;overflow:hidden;z-index:9">
			 </div>						 
	  </div>	  	  	
	  <div id="system_loading" style="z-index:9;position:absolute;left:42%; top:0px; width:220px; height:auto;background-color:#0f4d6d;border:2px solid #45b2f0;overflow:hidden;-webkit-border-radius: 10px;-moz-border-radius: 10px;display:" align='center'>
        <img src="image/loader.gif" />				
		<div id="loading_text" style="color:#45b2f0;top:0px;display:">Request</div>	
		<div style="position:absolute;width:100%;height:100%;top:0;left:0;background-image:url(image/whitegradsmall.png);background-position:bottom left;background-repeat:repeat-x;filter:alpha(opacity:40);opacity:0.4;moz-opacity:0.4;-webkit-border-bottom-left-radius: 10px;-webkit-border-bottom-right-radius: 10px;-moz-border-radius-bottomleft: 10px;-moz-border-radius-bottomright: 10px;"></div>
		<div id="msgBg" style="position:absolute;left:0px; top:0px;width:100%;height:50%;background-image:url(image/whitegradsmalltop.png);background-position:top left;background-repeat:repeat-x;filter:alpha(opacity:40);opacity:0.4;moz-opacity:0.4;-webkit-border-radius: 10px;-moz-border-radius-topleft: 10px;-moz-border-radius-topright: 10px;"></div>		  
	  </div>				  
	  <div id="systemMsg" align="center" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:3;display:none">
		 <div id="msgBg" style="position:absolute;left:0px; top:0px;width:100%;height:100%;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8"></div>		  
	     <div id="msgHeader" style='position:absolute;left:0;top:0;width:100%;height:25;background:#8d1212;color:#ff0000;font-style:italic'>Alert...</div>
         <div id="msgTxt" style="padding:5px 5px 5px 5px;position:absolute;color: #ffffff;background:#283f60;left:0px; top:0px;width:auto;height:auto"></div>
	  </div>		  
	  <div id="systemDbg" align="center" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:9;display:none">      		                         			 
		 <div id="dbgBg" style="background:#4d7795;position:absolute;left:0px; top:0px;width:100%;height:100%;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8" />
		 <div id="dbgTxt" style="padding:5px 5px 5px 5px;border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #999999;border-bottom:1px solid #999999;position:absolute;color: #ffffff;background:#283f60;left:0px; top:0px;width:auto;height:auto" />
	  </div>	  	
	  <iframe id="loader" style='display:none'>
	  </iframe>	  
</body>
</html>
