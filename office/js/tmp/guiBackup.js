function bodyonLoad(event){
	try{
		/*if (document.all){
			window.onresize = new Function("screenResize(event); return false;"); 				
			document.onmousemove = new Function("screenMouseMove(event);");
			document.onmouseup = new Function("screenMouseUp(event);");
			document.onmousedown = new Function("screenMouseDown(event);");
		}else{
			window.onresize = new Function("event", "screenResize(event); return false;");
			document.onmousemove = new Function("event", "screenMouseMove(event);");
			document.onmouseup = new Function("event", "screenMouseUp(event);");
			document.onmousedown = new Function("event","screenMouseDown(event);");
		}
		document.oncontextmenu = doContextMenu;		
		window.xhr = new XMLHttpRequest();		
		window.intervalId = undefined;		
		//screenResize(event);
		*/
		loadClass();
	}catch(e){
		alert(e);
	}
	
};	
function doLogin(lokasi){		
	try{						
		var data = {email: document.getElementById("reg_emaillgn").value,
				office: lokasi,
				pwd: document.getElementById("reg_pwd").value};			
		var param = "cmd=login&email="+data.email+"&office="+data.office+"&pwd="+data.pwd;		
		window.xhr.open("POST","office/userauth.php",false);
		window.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.xhr.send(param);
		if (window.xhr.status == 200){
			var msg = window.xhr.responseText;				
			if (msg.search("error") != -1) 
				alert(msg);
			else {				
				window.dataLogin = data;								
				loadClass();			
			}	
		}		
		var msgCont = document.getElementById("loginform");
		if (msgCont != null && msgCont != undefined) msgCont.style.display = "none";
	}catch(e){				
		alert("doLogin::"+e);
		if (msgCont != null && msgCont != undefined) msgCont.style.display = "";
	}
};
function loadClass(){
	try{
		addCss("server/server/util/laporan.css");
		addCss("office/css/system.css");
		window.countJs = 0;
		addJs("classes/portalui/library.js");
		addJs("classes/portalui/rexml.js");
		addJs("classes/addon/swfobject_1.5.js");
		addJs("classes/addon/DD_belatedPNG.js");
		addJs("classes/addon/excanvas.js");			
	}catch(e){
		alert(e);
	}
};
function doContextMenu(event){
	return false;
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
		panel.style.top = document.body.offsetHeight-  (document.all ? 0 : 10);			
		panel.style.width = document.body.offsetWidth - 20;
		panel = document.getElementById("p_top");						
		panel.style.width = document.body.offsetWidth - 20;
		var node = panel.firstChild; 
		var i = 215;
		while (node != null){
			if (node.tagName == "DIV") {
				node.style.left = document.body.offsetWidth - i;
				i-= node.offsetWidth;
			}
			node = node.nextSibling;
		}					
		var form = document.getElementById("registerform");
		if (form  !== null) {
			form.style.left = document.body.offsetWidth - 410;
			form.style.top = document.body.offsetHeight / 2 - 130;
		}
		var systemcontainer = document.getElementById("systemcontainer");
		systemcontainer.style.height = document.body.offsetHeight - 30;		
		if (window.system !== undefined || window.system != null){						
			if (window.system.eventScreenResize) window.system.eventScreenResize(event);
		}
		var screenW = parseInt(document.body.offsetWidth);
		var screenH = parseInt(document.body.offsetHeight);
		if (window.listOff !== undefined){
			window.listOff.style.top = screenH  / 2 - 120;
			window.listOff.style.left = screenW  / 2 - 200;
		}
		if (window.formLogin !== undefined){
			window.formLogin.style.top = screenH  / 2 - 120;
			window.formLogin.style.left = screenW  / 2 - 200;
		}
	}catch(e){
		alert("screen Resize:"+e);
	}
};
function screenMouseMove(event){		
	if (window.selectedForm !== undefined){
		if (document.all){
			var x = event.x;
			var y = event.y;
		}else{
			var x = event.pageX;
			var y = event.pageY;
		}
		var top = window.selectedForm.offsetTop;
		var left = window.selectedForm.offsetLeft;
		left = left +(x - window.mouseX);
		top = top +(y - window.mouseY);
		if (top < 30) top = 30;
		if (left < 0) left = 0;
		if (left + window.selectedForm.offsetWidth > document.body.offsetWidth) left = document.body.offsetWidth - window.selectedForm.offsetWidth;
		if (top + window.selectedForm.offsetHeight> document.body.offsetHeight) top = document.body.offsetHeight - window.selectedForm.offsetHeight;
		window.selectedForm.style.top = top;
		window.selectedForm.style.left = left;
		window.mouseX = x;
		window.mouseY = y;
		if (window.system !== undefined || window.system != null){					
			if (window.system.eventMouseMove) window.system.eventMouseMove(event);			
		}
	}	
};
function screenMouseUp(event){		
	if (window.selectedForm !== undefined){
		window.selectedForm = undefined;
	}
	if (window.system !== undefined || window.system != null){						
		if (window.system.eventMouseUp)  window.system.eventMouseUp(event);	
	}
};
function screenMouseDown(event){		
	try{						
		var target = document.all ? event.srcElement : event.target;			
		if (target.id == "office_frm"){
			window.selectedForm = target.parentNode;
			if (document.all){
				var x = event.x;
				var y = event.y;
			}else{
				var x = event.pageX;
				var y = event.pageY;
			}			
			window.mouseX = x;
			window.mouseY = y;
		}else window.selectedForm = undefined;
		if (window.system !== undefined || window.system != null){			
			if (window.system.eventMouseDown) window.system.eventMouseDown(event);			
		}
	}catch(e){
		alert(e+" "+target);
	}
};	
function showHint(msg, x, y){
	try{
		if (msg === undefined) return;
		if (msg == "" ) return;			
		if (window.intervalId !== undefined) window.clearTimeout(intervalId);							
		hintForm.firstChild.innerHTML= "<span style='position:absolute;left:10;width:auto;white-space: nowrap;'>"+msg+"</span>";						
		var width = hintForm.firstChild.firstChild.offsetWidth ;			
		hintForm.style.width = ( width == 0 ? msg.toString().length * 5: width) + 20;			
		hintForm.style.top = y;
		hintForm.style.left = x;
		hintForm.style.display = "";			
		window.intervalId = window.setTimeout("doTimer();", 3000);
	}catch(e){
		alert("showHint:"+e);
	}
};
function doTimer(){
	hintForm.style.display = "none";
	window.clearTimeout(intervalId);	
};
function doMouseOver(event){
	try{
		var target = document.all ? event.srcElement : event.target;						
		if (document.all){
			var x = event.screenX - 20;
			var y = event.screenY - 35;
		}else{
			var x = event.pageX - 20;
			var y = event.pageY - 35;
		}			
		var panel = document.getElementById("p_bottom");
		y = panel.offsetTop  - 30;				
		showHint(target.name,x,y);
	}catch(e){
		alert(e +" "+target);
	}
};
function doMouseOver2(event){
	try{			
	}catch(e){
		alert(e);
	}
};
function registerform(){
	try{						
		hintForm.style.display = "none";
		closeAllForm();
		var form = document.getElementById("registerform");
		if (form  == null){						
			var form = document.createElement("div");
			var height = (document.all ? "250": "260");
			form.style.cssText = "position:absolute;width:400;height:"+height+";left:"+(document.body.offsetWidth  - 410 )+";top:"+(document.body.offsetHeight / 2- 130)+";border:1px solid #446985;z-index:999;color:#446985";				
			form.id = "registerform";
			var html = "<div onload='fixPNG(this);' style='background:url(image/indicator.gif)center center no-repeat;background-color:#407fb2;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:400;height:260',></div>"+
					"<div style='background-image:url(image/panelbg.png);background-position:top left;background-repeat: repeat-x;position:absolute;left:0;top:0;height:25;width:100%;filter:alpha(opacity:80);moz-opacity:0.8;opacity:0.8;'></div>"+
					"<span style='position:absolute;left:20;top:5;width:auto;height:auto;color:#ffffff;' >Please register your office </span>"+
					"<div onclick='this.parentNode.style.display = \"none\";' onmouseover='this.style.borderColor=\"#ff0000\";' onmouseout='this.style.borderColor=\"#446985\"' style='position:absolute;width:10;height:10;top:5;left:370;background:#ffcccc;border:1px solid #446985;font-family:arial;font-size:11;color:#ff0000;cursor:pointer' ><span style='position:absolute;top:-3;left:2;'>x</span></div>"+
					"<div id='msgcont' style='background:#ffffff;color:#407fb2;border-top:1px solid #333333;border-left:1px solid #333333;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;filter:alpha(opacity:100);moz-opacity:1;opacity:1;font-size:11;position:absolute;left:3;top:25;width:393;height:230'>"+
					"<table id='form' width='200' height='auto' border='0' cellSpacing='2' style='margin:10'>"+
					"<tr><td>Email  Address (ex. admin@roojax.com)</td></tr><tr><td><input id='reg_email' class='input' size=65/></td></tr>"+
					"<tr><td>Name</td></tr><tr><td><input id='reg_name' class='input' size=65/></td></tr>"+						
					"<tr><td>Office Name</td></tr><tr><td><input id='reg_office' class='input' size=65/></td></tr>"+						
					"<tr><td>Address</td></tr><tr><td><input id='reg_addr' class='input' size=65/></td></tr>"+						
					"</table> "+
					"<div align='right' style='padding:20'><button onclick='register(event);'>Register</button></div></div>";
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
function closefrm(event){
	var form = document.getElementById("registerform");
	if (form  !== null) form.style.display = "none";
};
function closeMsgfrm(event){
	var form = document.getElementById("msgform");
	if (form  !== null) form.style.display = "none";
	form = document.getElementById("registerform");
	form.style.display = "";
};	
function register(event){
	try{		
		var msgCont = document.getElementById("msgcont");
		msgCont.style.display = "none";
		var data = {uname: document.getElementById("reg_name").value,
				email: document.getElementById("reg_email").value,
				office: document.getElementById("reg_office").value,
				addr: document.getElementById("reg_addr").value};			
		if (data.email.search("@") == -1 || data.email.search("@") == 0 || data.email.search("@") == (data.email.length - 1)) {
			errorMsg("Email not valid");
			msgCont.style.display = "";
			return;
		}
		if (data.uname == ""){
			errorMsg("Name not valid");
			msgCont.style.display = "";
			return;
		}
		
		try{			
			var param = "cmd=register&email="+data.email+"&uname="+data.uname+"&office="+data.office+"&addr="+data.addr;
			window.xhr.open("POST","office/userauth.php",false);			
			window.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			window.xhr.send(param);			
			if (xhr.status == 200){
				var msg = xhr.responseText;
				if (msg.search("error") != -1) 
					errorMsg(msg);
				else {
					form = document.getElementById("registerform");
					form.style.display = "none";
					errorMsg(msg);
				}				
			}				
			msgCont.style.display = "";			
		}catch(e){
			msgCont.style.display = "";
			alert("addUser::"+e);
		}
	}catch(e){
		alert("addUser::"+e);
	}
};				
function errorMsg(msg){
	var form = document.getElementById("registerform");
	form.style.display = "none";
	form = document.getElementById("msgform");
	if (form  == null){		
		form = document.createElement("div");
		form.style.cssText = "position:absolute;width:400;height:110;left:"+(document.body.offsetWidth / 2 -200 )+";top:"+(document.body.offsetHeight/ 2 - 105)+";z-index:999";
		form.id = "msgform";			
		document.body.appendChild(form);
	}
	var html = "<div style='background-color:#ff0000;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:400;height:110'></div>"+				
			"<div id='msg' align='center' style='background:#f6dada;border-top:1px solid #333333;border-left:1px solid #333333;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;filter:alpha(opacity:100);moz-opacity:1;opacity:1;font-size:11;position:absolute;left:10;top:10;width:380;height:90'>"+
			msg+
			"<br>"+
			"<button onclick='closeMsgfrm(event);'>Okay</button></center></div>";
	form.innerHTML = html;
	form.style.display = "";		
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
function closeAllForm(){
	var form = document.getElementById("loginform");
	if (form  != null) form.style.display = "none";						
	form = document.getElementById("registerform");
	if (form  != null) form.style.display = "none";
	form = document.getElementById("msgform");
	if (form  != null) form.style.display = "none";
}
function loginFrm(kode,nama){
	try{
		closeAllForm();
		var form = document.getElementById("loginform");
		if (form  == null){						
			var form = document.createElement("div");
			var height = (document.all ? "200": "210");
			form.style.cssText = "position:absolute;width:400;height:"+height+";left:"+(document.body.offsetWidth / 2  - 200 )+";top:"+(document.body.offsetHeight / 2- 130)+";border:1px solid #446985;z-index:999;color:#446985";				
			form.id = "loginform";			
			document.body.appendChild(form);
		}		
		var html = "<div onload='fixPNG(this);' style='background:url(image/indicator.gif)center center no-repeat;background-color:#407fb2;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:400;height:"+height+"',></div>"+
				"<div style='background-image:url(image/panelbg.png);background-position:top left;background-repeat: repeat-x;position:absolute;left:0;top:0;height:25;width:100%;filter:alpha(opacity:80);moz-opacity:0.8;opacity:0.8;'></div>"+
				"<span style='position:absolute;left:20;top:5;width:auto;height:auto;color:#ffffff;' >Login to "+nama+"("+kode+") </span>"+
				"<div onclick='this.parentNode.style.display = \"none\";' onmouseover='this.style.borderColor=\"#ff0000\";' onmouseout='this.style.borderColor=\"#446985\"' style='position:absolute;width:10;height:10;top:5;left:370;background:#ffcccc;border:1px solid #446985;font-family:arial;font-size:11;color:#ff0000;cursor:pointer' ><span style='position:absolute;top:-3;left:2;'>x</span></div>"+
				"<div id='msgcont' style='background:#ffffff;color:#407fb2;border-top:1px solid #333333;border-left:1px solid #333333;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;filter:alpha(opacity:100);moz-opacity:1;opacity:1;font-size:11;position:absolute;left:3;top:25;width:393;height:"+(height - 30)+"'>"+
				"<table id='form' width='200' height='auto' border='0' cellSpacing='2' style='margin:10'>"+
				"<tr><td>Email  Address (ex. admin@roojax.com)</td></tr><tr><td><input id='reg_emaillgn' class='input' size=65/></td></tr>"+
				"<tr><td>Password</td></tr><tr><td><input id='reg_pwd' class='input' type='password' size=65/></td></tr>"+										
				"</table> "+
				"<div align='right' style='padding:20'><button onclick='doLogin(\""+kode+"\");'>Login</button></div></div>";
		form.innerHTML = html;
		form.style.display = "";
		window.formLogin = form;
	}catch(e){
		alert(e);
	}
};
function showOffice(){		
	try{			
		var height = (document.all ? "245": "230");
		if (window.listOff  == null){					
			window.listOff = document.createElement("div");
			var w = parseInt(document.body.offsetWidth);
			var h = parseInt(document.body.offsetHeight);
			window.listOff.style.cssText = "position:absolute;width:400;height:"+height+";left:"+(w / 2 - 200)+";top:"+(h / 2 - (height / 2))+";z-index:9999;border:1px solid #ff9900";
			document.body.appendChild(window.listOff);			
		};		
		var param = "cmd=getOffice";
		window.xhr.open("POST","office/userauth.php",false);			
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		window.xhr.send(param);
		var msg = "";
		if (xhr.status == 200){
			msg = xhr.responseText;			
		}
		if (msg.search("error") == -1 && msg != ""){										
			var data = eval(msg+";");
			msg = "";
			for (var i in data){
				msg += "<div id='"+data[i].kode+"' style='display:block;width:100%;height:20;cursor:pointer' onclick='getSelectOffice(event,\""+data[i].kode+"\",\""+data[i].nama+"\");' title='Click here!!!' onmouseover='this.style.background=\"#ff9900\";'' onmouseout='this.style.background=\"transparent\";' >"+data[i].nama+"</div>";
			}
		}			
		var html = "<div id='office_frm' style='cursor:pointer;background:url(image/indicator.gif)center center no-repeat;background-color:#555555;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:400;height:"+height+"' ></div>"+
				"<span style='color:#ffffff;position:absolute;top:5;left:10;width:auto;height:auto;font-size:13;font-weight:bold;' >Select your office</span>"+
				"<div onclick='this.parentNode.style.display = \"none\";' onmouseover='this.style.borderColor=\"#ff0000\";' onmouseout='this.style.borderColor=\"#ff9900\"' style='position:absolute;width:10;height:10;top:5;left:370;background:#ffcccc;border-color:#ff9900;border:ridge;font-family:arial;font-size:11;color:#ff0000;cursor:pointer' ><span style='position:absolute;top:-3;left:2;'>x</span></div>"+
				"<div style='overflow:auto;color:#ffffff;background:#849eff;border-top:1px solid #333333;border-left:1px solid #333333;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;filter:alpha(opacity:100);moz-opacity:1;opacity:1;font-size:11;position:absolute;left:10;top:30;width:380;height:190'>"+
				msg+
				"</div>";
		window.listOff.innerHTML = html;			
		window.listOff.style.display = "";	
	}catch(e){
		alert(e);
	}
};
function getSelectOffice(event, kode,nama){						
	window.listOff.style.display = "none";		
	loginFrm(kode,nama);
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

function addCss(cssFile){
	var headID = document.getElementsByTagName("head")[0]; 
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = cssFile;
	//cssNode.media = 'screen';
	headID.appendChild(cssNode);
};
function addJs(jsFile){
	var headID = document.getElementsByTagName("head")[0]; 
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = jsFile;
	if (document.all)
		newScript.onreadystatechange = function(){
		    if (newScript.readyState == "loaded" || newScript.readyState == "complete"){		
			jsLoader();
		    }
		};
	else  newScript.onload = jsLoader;	
	headID.appendChild(newScript);		
};
function jsLoader(event){	
   window.countJs++;   
   if (window.countJs == 5){
	try		
		{						
			var ok = true;								
			if (ok){
				var splashText = document.getElementById("splash_text");				
				window.pageForm = document.getElementById("system_block");																									
				window.pageCnv = document.getElementById("system");				
				window.pageForm.style.display = "";				  
				window.loading = document.getElementById("system_loading");				
				window.loadingText = document.getElementById("loading_text");
				window.loading.style.left = (parseInt(pageCnv.offsetWidth) / 2 )- 110;				
				window.loading.style.display = "";
				showProgress();
				splashText.innerHTML = "load API..."+new Date().toLocaleString();									
				splashText.innerHTML = "load Common..."+new Date().toLocaleString();								
				uses("portalui_XMLAble;portalui_component;portalui_control;portalui_containerComponent;portalui_containerControl;portalui_system;portalui_arrayMap");
				splashText.innerHTML = "starting initialization..."+new Date().toLocaleString();
				var splash = document.getElementById("system_splash");																																			
				splashText.innerHTML = "initialization system..."+new Date().toLocaleString();
				window.system = new portalui_system();
				splashText.innerHTML = "system start..."+new Date().toLocaleString();
				window.system.init('app_officeair_app');			
				window.pageForm.style.display = "none";
				hideProgress();
				splashText.innerHTML = "welcome..."+new Date().toLocaleString();				
				splash.style.display = "none";				
				window.loading.style.display = "none";
			}	
		}catch(e)
		{
			alert("onload : " + e);
		}		
   }
};