<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="description" content="roojax framework is javascript framework that can build web more esay like desktop application. And you dont have to work hard with server side script...">
   <meta name="keywords" content="roojax, roojax jamboo, roojax officeair, roojax ajax, roojax grid, roojax component, roojax framework, roojax php">
   <meta name="robots" content="index, follow, noarchive">
<title>roojax Application(IDE)</title>
<script language="javascript">	
	<?php	    		        
		echo "window.initApp = 'app_builder_app';\n";        	        
        echo "window.clientInfo = {ip:\"". $_SERVER["REMOTE_ADDR"] ."\", host:\"". gethostbyname($_SERVER["REMOTE_ADDR"]). "\",session:\"".md5(date("r")) ."\"};\n";        
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
<body onunload="bodyUnLoad(event);" style="overflow:hidden; background:#15382d; font-family:Arial; font-size:11px;" leftmargin="0px" rightmargin="0px" topmargin="0px" bottommargin="0px"   >      
	  <div id="system_block" style="z-index:3;position:absolute;background-color:#15382d;left:0px;top:0px;width:100%;height:100%;display:none" align='center' valign='middle'>		
	  </div>				  
	  <div id="system_splash" style="z-index:8;position:absolute;left:0%; top:0%; width:100%; height:100%;background:#15382d;display:" >				
		<img id="syssplash_img" src="image/jambookcl.png" width="200px" height="200px" style="z-index:999;position:absolute;left:40%;top:30%;height:200;width:200;"/>			
	  </div>
	  <div>
		<image src="image/jamboologo.png" style="position:absolute;top:40%;left:0;width:100;height:100;z-index:2"/>
		 <span style="position:absolute;top:46%;left:100;width:auto;height:100;font-family:arial;font-size:25px;color:#ffffff;z-index:2" >roo<font color='#ff9900'>j</font>ax (<font color='#ff9900'>j</font>amboo)</span>
		 <span style="position:absolute;top:51%;left:100;width:auto;height:100;font-family:arial;font-size:10px;color:#ffffff;z-index:2" >SAI &copy;2009</span>
			 
	  </div>
	  <div id="system" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:2;display:">
			 <div id="systemform" style="background:transparant;left:0px; top:0px; width:100%;height:100%;overflow:hidden;z-index:9">
			 </div>						 
	  </div>	  	  	
	  <div id="system_loading" style="z-index:99999;position:absolute;left:42%; top:40%; width:220px; height:100;background:#d5ebf8;border:1px solid #45b2f0;overflow:hidden;-webkit-border-radius: 10px;-moz-border-radius: 10px;display:" align='center'>        
		<div style="position:absolute;top:20;left:0;width:100%;font-size:12;height:20;text-align:center;color:#0000ff;display:">Please Wait....</div>						
		<div id="loading_text" style="position:absolute;top:50;left:0;width:100%;height:20;text-align:center;color:#45b2f0;display:">Loading system libraries...</div>						
		<img src="image/loader.gif" style="position:absolute;top:70;left:0;" />
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
