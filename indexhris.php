<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>HRIS</title>
<script type="text/javascript" src="classes/addon/graphicLib.js"></script>
<script language="javascript">	
	function bodyonLoad(event){		
		window.systemReady = false;
		if (document.all)
			window.onresize = new Function("eventScreenResize(event); return false;");
		else 
			window.onresize = new Function("event", "eventScreenResize(event); return false;");
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
	};	
	function eventScreenResize(event){
		var cont = document.getElementById("container");			
		cont.style.left = parseInt(systemCnv.offsetWidth,10) / 2 - 450;
		cont.style.top = parseInt(systemCnv.offsetHeight,10) / 2 - 200;
	};
	function createFrameLoader(){
		window.frameLoader = document.createElement("iframe");
		window.frameLoader.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;display:;z-index:0";						
		window.frameLoader.frameBorder =0;
		document.body.appendChild(window.frameLoader);
		window.frameLoader.id = "systemContainer";			
		<?php		
			$param = $_GET["app"];
			if ($param != null) {
				echo "window.frameLoader.src = 'app.php?app=$param';";
				echo "frameLoader.style.zIndex = 10;";
				echo "window.frameLoader.style.display = '';";
			}else echo "window.frameLoader.src = 'app.php?app=app_hris_app';";
		?>
	};	
	function hideLoading(){
		window.systemReady = true;
		document.getElementById('indicator').style.display = "none";
		window.systemCnv.focus();
		document.getElementById('sysbuttonlogin').style.visibility = "visible";
	};
	//fvMileTdh4
	
	function loadApp(app){
		//frameLoader.src = "app.php?app="+app;		
		frameLoader.style.zIndex = 10;
	};
	function showAbout(){	
		xhr.open("POST", "about.html", false);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		xhr.send(null);
		if (xhr.status == 200){
			var html=  xhr.responseText;						
			var about = $('systemabout');
			about.style.display = "";		
			about.style.width = 700;
			about.style.height = 400;
			about.style.top = parseInt(systemCnv.offsetHeight) / 2 - 200;
			about.style.left = parseInt(systemCnv.offsetWidth) / 2 - 350;					
			about.innerHTML = html;
		}		
	};
	function hideAbout(){
		$("systemabout").style.display = "none";
	};
	function loadAppExt(app){
		try{
			if (!window.systemReady) {
				
			}
			//frameLoader.src = app;	
			frameLoader.contentWindow.uses(app);
			frameLoader.contentWindow.system.restart(app);
			frameLoader.style.zIndex = 10;
		}catch(e){
			alert("System sedang loading. Coba beberapa saat lagi.");
		}
	};
	function doMouseOver(target){
		try{		
			target.style.backgroundColor = "#dd9b0c";
			colorFade(target,"border","207091","ffffff",10,100);								
			target.style.backgroundImage = "url(icon/dynpro/button.png)";
			target.style.backgroundRepeat = "repeat-x";
		}catch(e){
			alert(e);
		}
	};	
	function doMouseOut(target){
		try{			
			colorFade(target,"border","ffffff","207091",10,100);				
			target.style.backgroundColor = "#379bc5";
			target.style.backgroundImage = "url(icon/dynpro/buttonbiru.png)";
			target.style.backgroundRepeat = "repeat-x";			
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

</script>
<style  type="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	background-color: #ffffff;
	color : #379bc5;
}
.style2 {
	font-size: 20px;
	color: #379bc5;
	font-weight: normal;
	font-family: Arial, Helvetica, sans-serif;
	margin:0px 5px 5px 15px;
}
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
	color:#0000;
	background-color:inherit;
	text-decoration:none;	
}
ul li a{	
	color:#0000;
	background-color:inherit;
	text-decoration:none;
}
ul li a:hover{
	background-color:transparent;
	color:#f90;
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
.righttop{
	border:1px solid #45b2f0;			
}
.rightbottom{
	border:1px solid #45b2f0;			
}
</style>
</head>

<body onLoad="bodyonLoad(event);" >
<div id="system" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:9;background:#EAEDD8;font-family:Arial, Helvetica, sans-serif;background:#ffffff" align="center">	
	<div id="container" style="position:absolute;left:15%;top:10%;width:680px;height:400px;">		
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
		<div id="header" align="left" style="position:absolute;left:0px;top:0px;width:100%;height:30px;border-left:1px solid #45b2f0;border-top:1px solid #45b2f0;border-right:1px solid #45b2f0">
			<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:url(image/whitegradblue.jpg) 0 0;"></div>
			<div style="position:absolute;left:0px;top:0px;width:100%;height:30px;background:url(image/whitegradblue.jpg)0 0 repeat-x"></div>			
			
			<li style="position:absolute;left:610px;top:8px;width:100px;height:auto;list-style-type:none;color:#777777;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<li style="position:absolute;left:609px;top:7px;width:100px;height:auto;list-style-type:none;color:#ffffff;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<img id="icon" src="image/jamboogreykcl.png"  style="position:absolute;left:650px;top:0px;width:22px;height:30px;" />						
			
		</div>
		<div id="center" style="position:absolute;left:0px;top:30px;width:100%;height:370px;border-left:1px solid #45b2f0;border-bottom:1px solid #45b2f0;border-right:1px solid #45b2f0;">
			<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#ffffff;"></div>
			<div id="left" style="position:absolute;left:0;top:20;height:100%;width:400px;">			
			<img id="imgcenter" src="image/gratika.gif"  style="position:absolute;left:170px;top:3px;" />
			<h1 style="position:absolute;left:10px;top:200px;width:400px;height:28px;margin:0 0 21px 0;color:#379bc5">HRIS</h1>
			<p style="position:absolute;left:20px;top:220px;width:400px;height:28px;font-size:14px;line-height:18px;font:normal 14px Arial, Helvetica, sans-serif;color:#929292;"><br />
					Human Resource Information System
					<br><br><br>Copyright (&copy) Gratika 2010</p>
			<br style="clear:both; font-size:0; line-height:0;" />
			<img id="indicator" src="image/amubar.gif" style="position:absolute;left:100px;top:290px;" />
			</div>
			<div id="right" style="position:absolute;left:420px;top:0;height:100%;width:250px;color:#379bc5" align="left">				
				<div id="realisasi" class="righttop" style="position:absolute;left:0px;top:5px;width:250px;height:175px">
						<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#c5dbe8;opacity:0.3;moz-opacity:0.3;filter:alpha(opacity:30)"></div>
						<div id="img22" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>						
						<span class="style2">HRIS</span> 					  
					  <img id="img2" src="image/hris.gif"  alt="" width="126" height="140" style="position:absolute;left:5px;top:20px;" />
					  <div id="img21" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					  <ul style="position:absolute;top:10px;left:100px;width:auto;height:auto;">
					  <li>Data Karyawan</li>
					  <li>Penggajian</li>
					  <li>Administrasi</li>
					  <li>Kesehatan</li>
					  <li>Dashboard</li>
					  </ul>					  
					  <div id='sysbuttonlogin' style="visibility:hidden;background-image:url(icon/dynpro/buttonbiru.png);background-position:top left;background-repeat:repeat-x;position:absolute;left:140px;top:125px;width:85px;height:22px;border:1px solid #207091;color:#fff;text-align:center;cursor:pointer;background-color:#379bc5;font-size:12px;" onmouseover="doMouseOver(this);" onmouseout="doMouseOut(this);" onclick="loadAppExt('app_hris_app');"><span style='position:absolute;left:0;width:100%;top:3;height:80%;align:center'>Login</span>
					  </div>
				</div>
				<div id="support" class="rightbottom" style="position:absolute;left:0px;top:185px;width:250px;height:175px">
					<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#c5dbe8;opacity:0.3;moz-opacity:0.3;filter:alpha(opacity:30)"></div>
					<div id="img32" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>					
					<span class="style2">Tools</span> 					  
					<img id="img3" src="image/helpfile.png" alt="" width="98" height="98" style="position:absolute;left:10px;top:40px;" />
					<div id="img31" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<ul style="position:absolute;top:20px;left:80px;width:auto;height:auto;font-color:#379bc5">					
					<li><a href="tools/sop.doc">SOP (Manual Book)</a></li>
					<li><a href="tools/firefox.exe">Bisnis Proses</a></li>
					<li><a href="tools/firefox.exe">Firefox</a></li>
					<li><a href="tools/flash_player.exe">Flash Player</a></li>
								
					</ul>					
				</div>
			
			</div>
		</div>						
	</div	
	<div id="systemabout" style="position:absolute;left:0px; top:0px; width:700; height:400px;border:2px solid #ff9900;z-index:9;display:none" onclick="hideAbout();"></div>
</div>
</body>
</html>
