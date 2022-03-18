<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">   
	<title>jUploader</title>
	<script type="text/javascript" src="js/gui.js"></script>
	<style  type="text/css">
		a { color:#ffffff;text-decoration:none}
		a:hover {color:#ff9900;text-decoration:underline}
		a:active {color:#ffff00;text-decoration:underline}	
		td {font-size:11;color:#407fb2}
		input.input {font-size:11}	
	</style>
</head>

<body onLoad="bodyonLoad(event);" style="overflow:hidden; background-color:#7296b6;font-family:Arial; font-size:11px;">
	<table width="100%" height="100%" id="container"><tr><td Align='middle' vAlign='middle'> 	
	 <table>
		<tr><td><image src="../image/jamboologo.png" onload="fixPNG(this)" style="width:100;height:100"/></td>
		<td><span style='color:#ffffff;font-size:11;'>welcome to</span><br><span style="font-size:50px;color:#ffffff;font-family:sans-serif;font-weight:bold" ><font color='#ff9900'>j</font>Uploader<font size="1" ></font></span>&nbsp;<span style="font-size:12px;color:#ffffff;font-family:sans-serif;">roo<font color='#ff9900'>j</font>ax</span><br>
			<span style="font-size:11;color:#ffffff;font-style:italic">starting upload data</span>
		</td></tr>
	 </table><br><br>	 
	</td></tr>
	</table>	
	<div id="p_bottom" style="position:absolute;left:10;top:0;background:#407fb2;color:#ffffff;font-size:12;font-family:arial;width:100%;height:30;z-index:2;border: 1px solid #446985;" align="center">		
	</div>
	<div id="p_top" style="position:absolute;left:10;top:0;background:#407fb2;color:#ffffff;font-size:12;font-family:arial;width:100%;height:25;z-index:2;border: 1px solid #446985;" align="center">						
		<div style='position:absolute;width:120;height:20;top:3;cursor:pointer;' onmouseover='doTopMouseOver(event);' onmouseout='doTopMouseOut(event);' onclick="registerform(event);">Create Office</div>
		<div style='position:absolute;width:2;height:25;background:url(icon/dynpro/separator.png)top left repeat-y;' ></div>
		<div style='position:absolute;width:70;height:20;top:3;cursor:pointer;' onmouseover='doTopMouseOver(event);' onmouseout='doTopMouseOut(event);' onclick="showOffice();">Login</div>
	</div>
	<div id='systemcontainer' style='position:absolute;left:0;top:25;width:100%;height:400'>
		<div id="system_block" style="z-index:3;position:absolute;left:0px;top:0px;width:100%;height:100%;display:none" align='center' valign='middle'></div>				  
		<div id="system_splash" style="z-index:999999;position:absolute;left:40%; top:30%; width:250px; height:150px;display:none" align='center' valign='middle'>		
			<img src="../image/loader.gif" style=""/>						
			<div id="splash_text" style="color:#ffffff;top:100px;"></div>				
		</div>			
		<div id="system" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:2;display:">				 
				 <div id="systemform" style="background:transparent;left:0px; top:0px; width:100%;height:100%;overflow:hidden">
				 </div>						 
		</div>	  	  	
		<div id="system_loading" style="z-index:999999;position:absolute;left:0px; top:0px; width:220px; height:auto;display:none" align='center' valign='middle'>		
			<img src="../image/loader.gif" style=""/>				
			<div id="loading_text" style="color:#ff0000;top:0px;display:">loading</div>				
		</div>				  
		<div id="systemMsg" align="center" style="position:absolute;left:0px; top:0px; width:100%; height:100%;z-index:3;display:none">
			 <div id="msgBg" style="background:#4d7795;position:absolute;left:0px; top:0px;width:100%;height:100%;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8" />
			 <div id="msgTxt" style="padding:5px 5px 5px 5px;border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #555555;border-bottom:1px solid #555555;position:absolute;color: #ffffff;background:#283f60;left:0px; top:0px;width:auto;height:auto" />
		</div>	
	</div>
</body>
</html>
