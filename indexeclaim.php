<?php		
    $param = $_GET["app"];
	if ($param != null) 
		header("location: app.php?app=$param");
?>								
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>E-CLAIM</title>
<script type="text/javascript" src="classes/addon/graphicLib.js"></script>
<script type="text/javascript" src="classes/addon/DD_belatedPNG.js"></script>
<script language="javascript">	
	function bodyonLoad(event){
		try{
			window.systemCnv = document.getElementById("system");
			window.xhr = new XMLHttpRequest();					
			createFrameLoader();
			var cont = document.getElementById("container");			
			cont.style.left = parseInt(systemCnv.offsetWidth,10) / 2 - 450;
			cont.style.top = parseInt(systemCnv.offsetHeight,10) / 2 - 200;			
			var icon = document.getElementById("icon");						
			if (document.all) {
				icon.style.left = 40;
				icon.style.top = -8;
			}			
			fixPNG();
		}catch(e){
			alert(e);
		}
		
	};	
	function createFrameLoader(){
		try{
			window.frameLoader = document.createElement("iframe");
			window.frameLoader.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;display:;z-index:0";						
			window.frameLoader.frameBorder =0;
			document.body.appendChild(window.frameLoader);
			window.frameLoader.id = "systemContainer";
			window.frameLoader.src = "app.php?app=app_eclaim_app";
		}catch(e){
			alert("createHint:"+e);
		}
	};	
	function hideLoading(){
		document.getElementById('indicator').style.display = "none";
		window.systemCnv.focus();
	};
	
	function loadApp(app){
		//frameLoader.src = "app.php?app="+app;		
		frameLoader.style.zIndex = 10;
	};
	function loadAppExt(app){
		try{
			//frameLoader.src = app;	
			frameLoader.contentWindow.uses(app+";"+app.substr(0,app.length - 3)+"fMain");
			frameLoader.contentWindow.system.restart(app);
			frameLoader.style.zIndex = 10;
		}catch(e){
			alert("System sedang loading. Coba beberapa saat lagi.");
		}
	};
	function doMouseOver(target){
		try{		
			target.style.backgroundColor = "#dd9b0c";
			colorFade(target,"border","ffffff","32adec",10,100);								
		}catch(e){
			alert(e);
		}
	};	
	function doMouseOut(target){
		try{			
			colorFade(target,"border","32adec","ffffff",10,100);				
			target.style.backgroundColor = "#379bc5";
		}catch(e){
			alert(e);
		}
	};	
	function doTopMouseOver(event){
		var target = document.all ? event.srcElement : event.target;
		target.style.background = "#65b6ea";
		target.style.textDecoration = "underline";
	};
	function doTopMouseOut(event){
		var target = document.all ? event.srcElement : event.target;
		target.style.background = "transparent";
		target.style.textDecoration = "none";
	};
	if (document.all) { 
		window.XMLHttpRequest = function() {	
			var xhr = false;
			var versions = [
			"Msxml2.XMLHTTP.7.0", 
			"Msxml2.XMLHTTP.6.0", 
			"Msxml2.XMLHTTP.5.0", 
			"Msxml2.XMLHTTP.4.0", 
			"MSXML2.XMLHTTP.3.0", 
			"MSXML2.XMLHTTP",
			"Microsoft.XMLHTTP"];
			var n = versions.length;
			for (var i = 0; i <  n; i++) {
				try {
					if (xhr = new ActiveXObject(versions[i])) {		
						break;
					}
				} catch (e) { /* try next */ }
			}		
			return xhr;
		};
	};
	function $(text) {
	  return document.getElementById(text);
	};
	function fixPNG(myImage) 
	{
	    var arVersion = navigator.appVersion.split("MSIE");
	    var version = parseFloat(arVersion[1])	;
	    if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
	    {			
		    var b1 = $("_sLeftTop");
			var b2 = $("_sLeft");
			var b3 = $("_sEdgeLeft");
			var b4 = $("_sBottomLeft");
			var b5 = $("_sRightTop");
			var b6 = $("_sRight");
			var b7 = $("_sEdgeRight");
			var b8 = $("_sBottomRight");
			var b9 = $("_sBottom");		
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9,$("_sLeftBottom"),$("_sRightBottom"),$("icon"),$("img1"),$("img2")],false);						
	    }
	};

</script>
<style  type="text/css">
.style2 {
	font-size: 20px;
	color: #ffffff;
	font-weight: normal;
	font-family: Arial, Helvetica, sans-serif;
	margin:0px 5px 5px 15px;
}
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	background-color: #FFFFFF;
}
.copy {
	font-family:Arial, Helvetica, sans-serif;
	color: #666666;
	font-size: 12px;
}

input.input {font-size:12}	
.style5 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #232323;
}
.style6 {font-size: 14px}
.style8 {font-size: 18px; }
.style9 {color: #168ef4}
.style11 {font-size: 14px; font-family: Arial, Helvetica, sans-serif;color:#000066; }
ul{
	width:122px;
	float:right;
	list-style-type:none;
}
ul li{	
	display:block;
	padding:0 0 0 7px;
	background:url(image/arrow.gif)0 7px no-repeat;
	font:normal 11px/17px Verdana, Arial, Helvetica, sans-serif;
	color:#fff;
	background-color:inherit;
	text-decoration:none;	
}
ul li a{	
	color:#fff;
	background-color:inherit;
	text-decoration:none;
}
ul li a:hover{
	background-color:#90ac0b;
	color:#fff;
}
ul li a.rm2{
	display:block;
	background:url(image/read_more2.gif) 0 0 no-repeat;
	width:56px;
	height:17px;
	margin:17px 0 0 0;
}
ul li a.rm2:hover{
	background:url(image/read_more2_hover.gif) 0 0 no-repeat;
}
#righttop{
	-webkit-border-top-left-radius:10px;
	-webkit-border-bottom-right-radius:10px;
	-moz-border-radius-topleft:10px;
	-moz-border-radius-bottomleft:10px;
}
#rightbottom{
	-webkit-border-top-right-radius:10px;
	-webkit-border-bottom-left-radius:10px;
	-moz-border-radius-topright:10px;
	-moz-border-radius-bottombottom:10px;
}
</style>
</head>

<body onLoad="bodyonLoad(event);" >
<div id="system" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:9;background:#EAEDD8;font-family:Arial, Helvetica, sans-serif" align="center">
	<div id="container" style="position:absolute;left:15%;top:10%;width:900px;height:400px;">		
		<!-- shadow !-->				
		<div id='_sLeftTop' style='background: url(image/themes/dynpro/shadowLeftTop.png) top left; position: absolute; left: -15; top: 0; width: 15; height: 20' ></div>
		<div style='position: absolute; left: -15; top: -20; width: 15; height: 100%; overflow: hidden;' >
		<div id='_sLeft' style='background: url(image/themes/dynpro/shadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%' ></div>
		</div>
		<div style='position: absolute; left: -15; top: -20; width: 15; height: 100%;' >
		<div id='_sLeftBottom'  style='background: url(image/themes/dynpro/shadowLeftBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20' ></div>
		</div>
		<div id='_sEdgeLeft' style='background: url(image/themes/dynpro/shadowEdgeLeft.png) top left; position: absolute; left: -15; top: 100%; width: 15; height: 20' ></div>
		<div id='_sRightTop' style='background: url(image/themes/dynpro/shadowRightTop.png) top left; position: absolute; left: 100%; top: 0; width: 15; height: 20' ></div>
		<div style='position: absolute; left: 100%; top: -20; width: 15; height: 100%; overflow: hidden;' >
		<div id='_sRight'  style='background: url(image/themes/dynpro/shadowRight.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%' ></div>
		</div>
		<div style='position: absolute; left: 100%; top: -20; width: 15; height: 100%;' >
		<div id='_sRightBottom' style='background: url(image/themes/dynpro/shadowRightBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20' ></div>
		 </div>
		<div id='_sEdgeRight' style='background: url(image/themes/dynpro/shadowEdgeRight.png) top left; position: absolute; left: 100%; top: 100%; width: 15; height: 20' ></div>
		<div id='_sBottomLeft' style='background: url(image/themes/dynpro/shadowBottomLeft.png) top left; position: absolute; left: 0; top: 100%; width: 15; height: 20' ></div>
		<div style='position: absolute; left: -15; top: 100%; width: 100%; height: 20; overflow: hidden;' >
		<div id='_sBottom' style='background: url(image/themes/dynpro/shadowBottom.png) top left repeat-x; position: absolute; left: 30; top: 0; width: 100%; height: 100%' ></div>
		</div>
		<div style='position: absolute; left: -15; top: 100%; width: 100%; height: 20;' >
		<div id='_sBottomRight' style='background: url(image/themes/dynpro/shadowBottomRight.png) top left repeat-x; position: absolute; left: 100%; top: 0; width: 15; height: 100%' ></div>
		</div>
		<!-- end shadow !-->
		<div id="header" align="left" style="position:absolute;left:0px;top:0px;width:100%;height:30px;border:1px solid #cdd1b6;background:#d7dbc2">
			<div style="position:absolute;left:0px;top:0px;width:100%;height:30px;background:url(image/whitegradsmalltop.png)repeat-x"></div>			
			<li style="position:absolute;left:830px;top:8px;width:100px;height:auto;list-style-type:none;color:#777777;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<li style="position:absolute;left:829px;top:7px;width:100px;height:auto;list-style-type:none;color:#ffffff;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<img id="icon" src="image/jamboogreykcl.png"  style="position:absolute;left:870px;top:0px;width:22px;height:30px;" />
			<img id="indicator" src="image/process.gif" style="position:absolute;left:850px;top:5px;width:20px;height:20px" />
		</div>
		<div id="center" style="position:absolute;left:0px;top:30px;width:100%;height:370px;border:1px solid #cdd1b6;background:#ffffff">
			<div id="left" style="position:absolute;left:0;top:0;height:100%;width:400px;">
			<img src="image/sju.gif" style="position:absolute;left:70px;top:10px;" />
			<div style="position:absolute;left:10px;top:180px;width:400px;height:28px;margin:0 0 21px 0;font-height:14px">Selamat Datang di</div>
			<h2 style="position:absolute;left:10px;top:210px;width:400px;height:28px;margin:0 0 21px 0;font-height:14px;color:#379bc5">ECLAIM</h2>
			<p style="position:absolute;left:10px;top:230px;width:400px;height:28px;font-size:14px;line-height:18px;font:normal 14px Arial, Helvetica, sans-serif;color:#929292;"><br />
					aplikasi yang di kembangkan oleh PT SJU untuk mengimplementasikan suatu sistem online aplikasi klaim asuransi yang dapat diakses dari sisi Tertanggung, Penanggung (Additional) maupun internal SJU</p>
			<p style="position:absolute;left:10px;top:310px;width:400px;height:28px;font-size:10px;line-height:18px;font:normal 12px Arial, Helvetica, sans-serif;color:#929292;"><br />
					<a href="tools/firefox.exe">Best View With Modzila Firefox 3.6 Above in 1280 X 800 resolution </a></p>
	
			<br style="clear:both; font-size:0; line-height:0;" />
			</div>
			<div id="right" style="position:absolute;left:420px;top:0;height:100%;width:400px;" align="left">
				<div id="nyusun" class="righttop" style="-webkit-border-top-left-radius:10px;-webkit-border-bottom-right-radius:10px;-moz-border-radius-topleft:10px;-moz-border-radius-bottomright:10px;position:absolute;left:0px;top:5px;width:470px;height:175px;background:#90ac0b;">
					<div id="img12" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:70);opacity:0.5;moz-opacity:0.5;"></div>					
					<span class="style2">E-Claim</span>
					  <img id="img1" src="image/jambooapp2.png" alt="" width="98" height="98" style="position:absolute;left:10px;top:40px;" />					 
					  <div id="img11" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:70);opacity:0.5;moz-opacity:0.5;"></div>
					  <ul style="position:absolute;top:20px;left:90px;width:auto;height:auto;">
					  <li>Parameter</li>
					  <li>Laporan Awal</li>
					  <li>Survey</li>
					  <li>Kelengkapan Dokumen</li>
					  <li>Adjustment</li>
						<li>Pembayaran</li>					  
					  </ul>			
					<ul style="position:absolute;top:20px;left:250px;width:auto;height:auto;">
					  <li>Reporting</li>
					  <li>Dashboard</li>
					  				  
					 </ul>		
					  <div style="position:absolute;left:10px;top:150px;width:95px;height:18px;border:1px solid #fff;color:#fff;text-align:center;cursor:pointer;background:#379bc5;font-size:12px;" onmouseover="doMouseOver(this);" onmouseout="doMouseOut(this);" onclick="loadApp('app_eclaim_app');">Masuk...
					  </div>
				</div>
				
				<div id="support" class="rightbottom" style="-webkit-border-top-right-radius:10px;-webkit-border-bottom-left-radius:10px;-moz-border-radius-topright:10px;-moz-border-radius-bottomleft:10px;position:absolute;left:0px;top:185px;width:235px;height:175px;background:#379bc5">
					<div id="img32" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>					
					<span class="style2">Pendukung</span> 					  
					<img src="image/proper_direction_pic.gif" alt="" width="96" height="101" style="position:absolute;left:10px;top:50px;" />
					<div id="img31" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<ul style="position:absolute;top:40px;left:80px;width:auto;height:auto;font-color:#90ac0b">
					<li><a href="tools/firefox.exe">Firefox</a></li>
					<li><a href="tools/flash_player.exe">Flash Player</a></li>
					<li><a href="tools/primopdf.exe">PDF Reader</a></li>
					</ul>					
				</div>
				<div id="help" class="rightbottom" style="-webkit-border-top-right-radius:10px;-webkit-border-bottom-left-radius:10px;-moz-border-radius-topright:10px;-moz-border-radius-bottomleft:10px;position:absolute;left:240px;top:185px;width:235px;height:175px;;background:#dd9b0c">
					<div id="img42" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<span class="style2">Informasi</span> 					  
					<img src="image/question_pic.gif" alt="" width="90" height="90" style="position:absolute;left:10px;top:50px;" />
					<div id="img41" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<ul style="position:absolute;top:40px;left:80px;width:auto;height:auto;font-color:#90ac0b">
					<li><a href="#">Buku Panduan</a></li>					
					<li><a href="#">Hubungi Kami</a></li>
					<li><a href="http://www.sju.co.id">Tentang SJU</a></li>					
					</ul>					
				</div>				
			</div>
		</div>						
	</div	
</div>
</body>
</html>
