<?php
$agent = $_SERVER['HTTP_USER_AGENT'];

if(preg_match('/iPhone|iPad|Android|Blackberry/i', $agent)){
    header("location: http://119.235.248.52/m/ ");
    exit;
}
include_once("setting.php");

?>
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>roojax apps</title>
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
		cont.style.left = parseInt(systemCnv.offsetWidth,10) / 2 - 350;
		cont.style.top = parseInt(systemCnv.offsetHeight,10) / 2 - 200;			
		var icon = document.getElementById("icon");						
		if (document.all) {
			icon.style.left = 40;
			icon.style.top = -8;
		}	
		setProportional();					
	};	
	function eventScreenResize(event){
		var cont = document.getElementById("container");			
		cont.style.left = parseInt(systemCnv.offsetWidth,10) / 2 - 350;
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
			echo "window.app_logo_main ='$app_logo_main'; ";
			echo "window.app_logo_pojok ='$app_logo_pojok'; ";
			echo "window.app_nama ='$app_nama'; ";
			echo "window.app_keterangan ='$app_keterangan'; ";
			if ($param != null) {
				echo "window.frameLoader.src = 'app.php?app=$param';";
				echo "frameLoader.style.zIndex = 10;";
				echo "window.frameLoader.style.display = '';";
			}else echo "window.frameLoader.src = 'app.php?app=$app_class';";
		?>
	};	
	function hideLoading(){
		window.systemReady = true;
		document.getElementById('indicator').style.display = "none";
		window.systemCnv.focus();
		document.getElementById('sysbuttonlogin').style.visibility = "visible";
		document.getElementById('appcenter').style.cursor = 'pointer' ;// ;
	};
	
	function loadApp(app){
		//frameLoader.src = "app.php?app="+app;		
		frameLoader.style.zIndex = 10;
	};
	function showAbout(){		
		var about = $('systemabout');
		about.style.display = "";		
		about.style.width = 700;
		about.style.height = 500;
		about.style.top = parseInt(systemCnv.offsetHeight) / 2 - 250;
		about.style.left = parseInt(systemCnv.offsetWidth) / 2 - 350;					
		about.src ="docs/veat/index.htm";
		about = $('aboutbtn');
		about.style.display = "";				
		about.style.top = parseInt(systemCnv.offsetHeight) / 2 - 250 - 10;
		about.style.left = parseInt(systemCnv.offsetWidth) / 2 + 340;					
			
		/*xhr.open("POST", "docs/veat/index.htm", false);
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
		}*/
				
	};
	function hideAbout(){
		$("systemabout").style.display = "none";
		$("aboutbtn").style.display = "none";
	};
	function setProportional(){
		var img = $("imglogo");		
		var height = 220;
		var width = 390;
		if (document.all || window.opera) {
			img.naturalHeight = img.height;
			img.naturalWidth = img.width;
		}
		
		var sH = height / img.naturalHeight;
		var sW = width / img.naturalWidth;					
		
		if (sH < sW) {
			img.height = height;
			img.width = Math.round(img.naturalWidth * sH);
			img.style.height = height;
			img.style.width = Math.round(img.naturalWidth * sH);
		} else {
			img.width = width;
			img.height = Math.round(img.naturalHeight * sW);
			img.style.width = width;
			img.style.height = Math.round(img.naturalHeight * sW);
		}				
	}
	function loadAppExt(app){
		try{
			if (!window.systemReady) {
				
			}
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
			//target.style.backgroundColor = "#dd9b0c";
			target.style.color = "#ffffff";
			colorFade(target,"background","c5dbe8","418aac",20,50);								
			//target.style.backgroundImage = "url(icon/dynpro/button.png)";
			//target.style.backgroundRepeat = "repeat-x";
			$("sysbuttonlogin").style.color = "#ffffff";
		}catch(e){
			alert(e);
		}
	};	
	function doMouseOut(target){
		try{			
			target.style.color = "#ff9900";
			colorFade(target,"background","418aac","c5dbe8",20,50);				
			//target.style.backgroundColor = "#379bc5";
			//target.style.backgroundImage = "url(icon/dynpro/buttonbiru.png)";
			//target.style.backgroundRepeat = "repeat-x";			
			$("sysbuttonlogin").style.color = "#379bc5";
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
	<div id="container" style="position:absolute;left:15%;top:10%;width:700px;height:400px;">		
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
			
			<li style="position:absolute;left:630px;top:8px;width:100px;height:auto;list-style-type:none;color:#777777;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<li style="position:absolute;left:629px;top:7px;width:100px;height:auto;list-style-type:none;color:#ffffff;font-size:12px;font-weight:bold"> 
				roojax
			</li>
			<img id="icon" src="image/jamboogreykcl.png"  style="position:absolute;left:670px;top:0px;width:22px;height:30px;" />						
			
		</div>
		<div id="center" style="position:absolute;left:0px;top:30px;width:100%;height:370px;border-left:1px solid #45b2f0;border-bottom:1px solid #45b2f0;border-right:1px solid #45b2f0;">
			<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#ffffff;"></div>
			<div id="left" style="position:absolute;left:0;top:0;height:100%;width:400px;">			
			<div style="position:absolute;left:20px;top:5px;width:390;height:250;align:center">
			<img id="imglogo" src="<?php echo $app_logo_depan;?>" alt="logo"   />
			</div>
			<div style="position:absolute;left:10px;top:250px;width:400px;height:28px;margin:0 0 21px 0;font-height:14px;color:#379bc5;">Selamat Datang di</div>
			<h1 style="position:absolute;left:10px;top:270px;width:400px;height:28px;margin:0 0 21px 0;color:#379bc5"><?php echo $app_nama;?></h1>
			<p style="position:absolute;left:10px;top:280px;width:400px;height:28px;font-size:14px;line-height:18px;font:normal 14px Arial, Helvetica, sans-serif;color:379bc5;"><br />
					<?php echo $app_keterangan;?></p>
					<p style="position:absolute;left:10px;top:310px;width:400px;height:28px;font-size:12px;line-height:18px;font:normal 12px Arial, Helvetica, sans-serif;color:#929292;"><br />
					<?php echo $app_copy;?></p>
				<br style="clear:both; font-size:0; line-height:0;" />
			<img id="indicator" src="image/amubar.gif" style="position:absolute;left:100px;top:230px;" />
			</div>
			<div id="right" style="position:absolute;left:420px;top:0;height:100%;width:400px;color:#379bc5" align="left">				
				<div id='appcenter' onmouseover="doMouseOver(this);" onmouseout="doMouseOut(this);" onclick="loadAppExt('<?php echo $app_class?>');"  id="realisasi" class="righttop" style="background:#c5dbe8;position:absolute;left:0px;top:5px;width:275px;height:175px">
						<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#c5dbe8;opacity:0;moz-opacity:0;filter:alpha(opacity:0)"></div>
						<div id="img22" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:0.5);opacity:0.5;moz-opacity:0.5;"></div>						
								  
						<img id="img2" src="image/play.png" alt=""  style="position:absolute;left:80px;top:20px;" />
						<div id="img21" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:0.5);opacity:0.5;moz-opacity:0.5;"></div>
					 					 		  
					  <div id='sysbuttonlogin' style="visibility:hidden;position:absolute;left:5px;top:145px;width:100%;height:22px;color:#379bc5;text-align:center;cursor:pointer;font-size:14px;" ><span style='position:absolute;left:0;width:100%;top:3;height:80%;align:center'>Click to Login.</span>
					  </div>
				</div>				
				<div id="help" class="rightbottom" style="position:absolute;left:0px;top:185px;width:275px;height:175px">
					<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#c5dbe8;opacity:0.3;moz-opacity:0.3;filter:alpha(opacity:30)"></div>
					<div id="img42" style="position:absolute;left:0px;top:0px;width:100%;height:40px;background:url(image/whitegradsmalltop.png)repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<span class="style2">Pendukung</span> 					  
					<img id="img4" src="image/tool.png" alt=""  style="position:absolute;left:20px;top:40px;" />
					<div id="img41" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:url(image/whitegradsmall.png)bottom left repeat-x;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5;"></div>
					<ul style="position:absolute;top:50px;left:100px;width:auto;height:auto;font-color:#379bc5">
					<li><a href="tools/firefox.exe">Firefox</a></li>
					<li><a href="tools/flash_player.exe">Flash Player</a></li>	
					<li><a href="tools/pdf.exe">PDF Reader</a></li>			
					</ul>			
					
					
				</div>				
			</div>
		</div>						
	</div	
	<iframe id="systemabout" style="position:absolute;left:0px; top:0px; width:700; height:400px;border:2px solid #ff9900;z-index:9;display:none" ></iframe>
	<div id='aboutbtn' onclick="hideAbout();" style="background:url(image/close.png) 0 0 no-repeat;position:absolute;left:0px; top:0px; width:30; height:30px;z-index:9;display:none"></div>
</div>
</body>
</html>
