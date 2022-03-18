<?php	
function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");		
	global $dbhost;
	global $dbuser;
	global $dbpass;
	global $database;
	global $dbdriver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$dbdriver);
	define("CONN_HOST",$dbhost);
	
	$adoc = ADONewConnection($dbdriver);
	if ($driver == "ado_mssql")
	{
	  $connected = $adoc->Connect($host, $user, $pass);
	  $adoc->hasTop = "TOP";			  
	}else 			
	  $connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
	if (!$connected){
		error_log($adoc->ErrorMsg());
	}
	return $adoc;
}
function execute($sql, &$error) { 	
	$schema = db_Connect();
	$resultSet = $schema->execute($sql);
	$error = false;
	if (!$resultSet){
		error_log($schema->ErrorMsg());
		error_log($sql);
		echo "error::" . $schema->ErrorMsg();
		$error = true;
		return null;
	}else return $resultSet;
}	
$actid = $_REQUEST["actid"];
$rs = execute("select email, nama from sysfreeuser where actid = '$actid'",$error);
if ($rs){
	if ($line = $rs->FetchNextObject(false)){
		$email = $line->email;
		$uname = $line->nama;
	}
}
?>								
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Email Confirmation (roojax)</title>
<script language="javascript">	
	function bodyonLoad(event){
		try{
			if (document.all)
				window.onresize = new Function("screenResize(event); return false;"); 				
			else
				window.onresize = new Function("event", "screenResize(event); return false;"); 				
			window.xhr = new XMLHttpRequest();		
			window.intervalId = undefined;
			createHint();
			registerform();
			screenResize(event);
		}catch(e){
			alert(e);
		}
		
	};	
	function createHint(){
		try{
			window.hintForm = document.createElement("div");
			hintForm.style.cssText = "position:absolute;left:0;top:0;width:auto;height:32;display:none;z-index:9999";
			var html  = "<div id='hintText' style='background:#0a2e78;position:absolute;width:100%;height:20;font-size:11;left:5;color:#ffffff;border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #333333;border-bottom:1px solid #333333'></div>"+
					  "<div id='arrow' style='position:absolute;left:10;top:20;width:21;height:11;background:url(image/arrow.png)top left no-repeat;'></div>";
			hintForm.innerHTML = html;
			document.body.appendChild(hintForm);
		}catch(e){
			alert("createHint:"+e);
		}
	};
	function screenResize(event){
		try{						
			var panel = document.getElementById("p_bottom");			
			panel.style.top = screen.height - (document.all ? 30 : 180);			
			panel.style.width = screen.width - 20;
			panel = document.getElementById("p_top");						
			panel.style.width = screen.width - 20;			
		}catch(e){
			alert(e);
		}
	};
	function showHint(msg, x, y){
		try{
			if (msg === undefined) return;
			if (msg == "" ) return;			
			if (window.intervalId !== undefined) window.clearTimeout(intervalId);							
			if (hintForm == null || hintForm == undefined) return;
			hintForm.firstChild.innerHTML= "<span style='position:absolute;left:10;width:auto;white-space: nowrap;'>"+msg+"</span>";						
			var width = hintForm.firstChild.firstChild.offsetWidth ;			
			hintForm.onmouseover = function (){this.style.display = "none";};
			hintForm.style.width = ( width == 0 ? msg.toString().length * 5: width) + 20;			
			hintForm.style.top = y;
			hintForm.style.left = x;
			hintForm.style.display = "";			
			window.intervalId = window.setTimeout("doTimer();", 3000);
		}catch(e){
			alert("showHint:"+e+" "+hintForm);
		}
	};
	function doTimer(){
		hintForm.style.display = "none";
		window.clearTimeout(intervalId);	
	};	
	function registerform(){
		try{						
			hintForm.style.display = "none";
			var form = document.getElementById("registerform");
			if (form  == null){							
				var form = document.createElement("div");
				var height = "210";
				var width = (document.all ? "420": "400");
				form.style.cssText = "position:absolute;width:"+width+";height:"+height+";left:"+(screen.width  / 2 - 200 )+";top:"+((screen.height - 160) / 2- 105)+";border:1px solid #446985";				
				form.id = "registerform";
				var html = "<div style='background:background-color:#407fb2;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:100%;height:210',></div>"+
						"<div style='background-image:url(../image/panelbg.png);background-position:top left;background-repeat: repeat-x;position:absolute;left:0;top:0;height:25;width:100%'></div>"+
						"<span style='position:absolute;left:20;top:5;width:auto;height:auto;color:#ffffff;' >Congratulation, thank you for register</span>"+						
						"<div id='msgcont' style='background:#ffffff;color:#407fb2;border-top:1px solid #333333;border-left:1px solid #333333;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;font-size:11;position:absolute;left:3;top:25;width:393;height:180'>"+
						"<table id='form' width='100%' height='auto' border='0' cellSpacing='2' style='margin:10'>"+
						"<tr><td>Your Email</td><td>:</td><td><?php echo $email;?></td></tr>"+
						"<tr><td>Name</td><td>:</td><td><?php echo $uname;?></td></tr>"+						
						"</table>&nbsp;&nbsp;use your email as user id. "+
						"<table> "+
						"	<tr><td width='100'><image src=\"../image/jamboologo.png\" onload=\"fixPNG(this)\" style=\"width:100;height:100\"/></td> "+
						"	<td width='250'><span style=\"font-size:40px;color:#407fb2;font-family:sans-serif;font-weight:bold\" >roo<font color='#ff9900'>j</font>ax<span style='font-size:8'>TM</span></span><br> "+
						"		<span style='font-size:8;color:#407fb2;font-style:italic'>Business Application</span> "+
						"	</td><td width='50'><div align='right' style='padding:20;float:right'><button onclick='window.location = \"../\";'>Ok</button></div></td></tr> "+
						"  </table>"+
						"</div>";
				form.innerHTML = html;
				document.body.appendChild(form);
			}else{
				document.getElementById("reg_email").value = "";				
				document.getElementById("reg_name").value= "";				
			}
			form.style.display = "";
		}catch(e){
			alert("registerForm:"+e);
		}		
	};	
	function fixPNG(myImage) 
	{
	    var arVersion = navigator.appVersion.split("MSIE");
	    var version = parseFloat(arVersion[1])	;
	    if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
	    {
		   var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
		   var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : "";
		   var imgTitle = (myImage.title) ? 
				     "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' ";
		   var imgStyle = "display:inline-block;" + myImage.style.cssText;
		   var strNewHTML = "<span " + imgID + imgClass + imgTitle
			  + " style=\"" + "width:" + myImage.width 
			  + "px; height:" + myImage.height 
			  + "px;" + imgStyle + ";"
			  + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
			  + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>";
		   myImage.outerHTML = strNewHTML	 ;
	    }
	};

</script>
<style  type="text/css">
	a { color:#ffffff;text-decoration:none;z-index:2;}
	a:hover {color:#ff9900;text-decoration:underline}
	a:active {color:#ffff00;text-decoration:underline}	
	td {font-size:12;color:#407fb2}
	input.input {font-size:12}	
</style>
</head>

<body onLoad="bodyonLoad(event);" style="overflow:hidden; background:#7296b6; font-family:Arial; font-size:11px;">
	<table width="100%" height="100%" id="container"><tr><td Align='middle' vAlign='middle'> 	
	 <table>
		<tr><td><image src="../image/jamboologo.png" onload="fixPNG(this)" style="width:100;height:100"/></td>
		<td><span style='color:#ffffff;font-size:11;'>welcome to</span><br><span style="font-size:50px;color:#ffffff;font-family:sans-serif;font-weight:bold" >roo<font color='#ff9900'>j</font>ax&nbsp;<font size="1" >TM</font></span><br>
			<span style="font-size:11;color:#ffffff;font-style:italic">Business Application</span>
		</td></tr>
	 </table><br><br>	 
	</td></tr>
	</table>	
	<div id="p_bottom" style="position:absolute;left:10;background:#407fb2;top:0;color:#ffffff;font-size:12;font-family:arial;width:100%;height:25;z-index:2;border: 1px solid #446985;" align="center">		
		<span style="position:absolute;top:5;left:10;font-family:arial;font-size:10px;color:#ff9900;z-index:2;" >&copy;2009&nbsp;roojax</span>
	</div>
	<div id="p_top" style="position:absolute;left:10;top:0;background:#407fb2;color:#ffffff;font-size:12;font-family:arial;width:100%;height:25;z-index:2;border: 1px solid #446985;" align="center">								
	</div>
</body>
</html>
