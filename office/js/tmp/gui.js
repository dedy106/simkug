var w = window, s = "DOMContentLoaded", b;
var d = document, f = function() {if (!b) {bodyOnLoad();} b = true};
if (d.addEventListener) {
d.addEventListener(s, f, false);
w.addEventListener("load", f, false);
} else if (d.attachEvent) {
w.attachEvent("load", f, false);
d.write("<script id=__ie_onload defer src=javascript:void(0)></script>");
d.getElementById("__ie_onload").onreadystatechange = function() {
  if (this.readyState == "complete") f();
};
} else if (/WebKit/i.test(navigator.userAgent)) {
var i = setInterval(function() {
  if (/loaded|complete/.test(d.readyState)) {
    clearInterval(i);
    f();
  }
}, 69);
}else window.onload = f;
window.curvyCornersNoAutoScan = true;

function $(text) {
  return document.getElementById(text);
};
function $$(res) {
  return window.system.getResource(res);
};
function eventOn(el,sType,fn,capture) {
    try{        
        if (document.all)
            eval("el.on"+sType+" = new Function(\""+fn+"\");");
        else eval("el.on"+sType+" = new Function(\"event\",\""+fn+"\");");           
    }catch(e){
        alert("event " + e);
    }
};
function bodyOnLoad(event){
	try{				
		window.pageForm = $("system_block");																											
		window.pageCnv = $("system");						
		window.loading = $("system_loading");																													
		window.loadingText = $("loading_text");
		window.loading.style.left = parseInt(pageCnv.offsetWidth) / 2 - 110;				
		window.splash = $("system_splash");
		window.splash.style.display = "";		
		window.splash_img = $("syssplash_img");
		window.splash_img.style.top = parseInt(pageCnv.offsetHeight) / 2 - 100;
		window.splash_img.style.left = parseInt(pageCnv.offsetWidth) / 2 - 100;				
		window.files_total = 3;		
		window.pageForm.style.display = "";
		window.hintInterval = undefined;
		window.hintForm == undefined;		
		createHint();
		loadClass();		
		$("downloader").src='downloadCtrl.php';
		$("reporter").src='reportCtrl.php';		
		eventOn($("framecontainer"),"load","afterLoad(event);");
	}catch(e){
		alert("loading "+e);
	}
	
};
//<iframe name="download" id="downloader" target="loader" onload="afterLoad()" border=0 style='display:;width:1;height:1;top:1;left:1;position:absolute'>	  
//</iframe>	  	    
	  
function createDownloader(){	
}
function afterLoad(event){
	hideStatus();	
};
function bodyUnLoad(event){	
		//system.clearTmp();
    system.logout();
	if (window.app != undefined)
		window.app.terminate();		
};
function loadClass(){
	try{
		window.countJs = 0;				
		if (document.all) addJs("classes/addon/DD_belatedPNG.js",jsLoader);		
		addJs("classes/system/rexml.js",jsLoader);
		//addJs("classes/library.js",jsLoader);
	    addCss("server/server/util/laporan.css");	    
	    addJs("classes/addon/Liquid.js",jsLoader);
	}catch(e){
		alert("class "+e);
	}
};
function hideAbout(){
	$('systemabout').style.display = "none";
};
function createHint(){
	try{
		window.hintForm = document.createElement("div");
		window.hintForm.style.cssText = "position:absolute;left:0;top:0;width:auto;height:auto;-webkit-border-radius: 5px;-moz-border-radius: 5px;display:none;z-index:99999;background:url(icon/dynpro/bghint.png);font-size:11;left:5;color:#ffffff;border:1px solid #ff9900;text-align:center";
		window.hintForm.innerHTML = "";
		document.body.appendChild(window.hintForm);
	}catch(e){
		alert("createHint:"+e);
	}
};
function createMenu(){
	try{
		window.mnuForm = document.createElement("div");
		window.mnuForm.style.cssText = "position:absolute;left:0;top:0;width:150;height:30;display:none;z-index:99999;font-size:11;cursor:pointer;";
		window.mnuForm.innerHTML = "<div style='position:absolute;left:2;top:2;width:100%;height:100%;background:#555555;opacity:0.5;moz-opacity:0.5;border:1px solid #555555;'></div>"+			
			"<div style='position:absolute;left:0;top:0;width:100%;height:100%;background:#f0f0f0;border:1px solid #999999;'></div>"+
			"<div style='position:absolute;left:30;top:2;width:2;height:26;background:url(icon/dynpro/separator.png)top left repeat-y;'></div>"+
			"<div id='mnuOver' style='position:absolute;left:5;top:5;width:140;height:20;border:1px solid #86c1e0;display:none;-webkit-border-radius: 5px;-moz-border-radius: 5px;'>"+
				"<div style='position:absolute;top:0;left:0;width:100%;height:100%;background:#86c1e0;opacity:0.3;moz-opacity:0.3'></div>"+
				"<div style='position:absolute;top:0;width:100%;height:10;background:#ffffff;opacity:0.4;moz-opacity:0.4'></div>"+
			"</div>"+			
			"<span id='mnuSelect' style='position:absolute;left:40;top:8;width:100;height:20;' onmouseover='doMenuOver(event);' onmouseout='doMenuOut(event);' onclick='doMnuClick();'>r o o j a x</span>";
		document.body.appendChild(window.mnuForm);
	}catch(e){
		alert("createHint:"+e);
	}
};
function doMenuOver(){
	$("mnuOver").style.display = "";
};
function doMenuOut(){
	$("mnuOver").style.display = "none";
};
function doMnuClick(){	
	try{
		//window.open("http://www.roojax.com","wndroojax");
		mnuForm.style.display = "none";	
		var html = getScript("about.html");		
		var about = $('systemabout');
		about.style.display = "";		
		about.style.width = 700;
		about.style.height = 400;
		about.style.top = parseInt(pageCnv.offsetHeight) / 2 - 200;
		about.style.left = parseInt(pageCnv.offsetWidth) / 2 - 350;					
		about.innerHTML = html;		
	}catch(e){
		alert(e);
	}
};
function hideHint(){
	window.hintForm.style.display = "none";			
};
function showSplash(img, width, height){
	try{		
		window.splash_img.src = img;	
		window.splash_img.width = width;
		window.splash_img.style.width = width;
		window.splash_img.style.height = height;
		window.splash_img.height = height;
		window.splash.style.display= "";
		window.splash_img.style.top = parseInt(pageCnv.offsetHeight) / 2 - (height / 2);
		window.splash_img.style.left = parseInt(pageCnv.offsetWidth) / 2 - (width / 2);	
	}catch(e){
		systemAPI.alert(e);
	}
};
function hideSplash(){	
	window.splash.style.display= "none";	
};
function showHint(msg, x, y){
	try{
		if (msg === undefined) return;
		if (msg == "" ) return;			
		if (window.hintInterval !== undefined) window.clearTimeout(window.hintInterval);							
		if (window.hintForm == null || window.hintForm=== undefined) return;
		msg = msg.replace(/\r\n/gi, "&nbsp;</nobr><br><nobr>&nbsp;");
		window.hintForm.innerHTML= "<span><nobr>"+msg+"</nobr></span>";						
		var width = window.hintForm.firstChild.offsetWidth ;			
		window.hintForm.onmouseover = function (){this.style.display = "none";};		
	        var height = window.hintForm.firstChild.offsetHeight + 1;	        	        		
		window.hintForm.style.width = width + 20;			
		window.hintForm.style.height = height;
		window.hintForm.style.top = y + 20;
		window.hintForm.style.left = x + 10;
		window.hintForm.style.display = "";			
		//if (document.all)  
		window.hintInterval = window.setTimeout("doTimer();", 3000);
	}catch(e){
		alert("showHint:"+e);
	}
};
function doTimer(){
	window.hintForm.style.display = "none";
	window.clearTimeout(window.hintInterval);	
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
function loadingFiles(percent){	
	window.loading.style.display = "";	
	window.loadingText.innerHTML = "Loading " + (percent)+"%";
};
function finishLoadingFiles(percent){	
	window.loading.style.display = "none";
};
function addJs(jsFile,callback){
	loadingFiles(window.countJs / window.files_total * 100);
	var headID = document.getElementsByTagName("head")[0]; 
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = jsFile;		
	newScript.charset= "utf-8";
	if (document.all)
		newScript.onreadystatechange = function(){
		    if (newScript.readyState == "loaded" || newScript.readyState == "complete"){		
			callback();
		    }
		};
	else  newScript.onload = callback;
	headID.appendChild(newScript);		
};
function jsLoader(event){	     		
	window.countJs++;      	
	if ((document.all && window.countJs == 3) || ( window.countJs == 2 && !document.all) ){
		try		
		{						
			var ok = false;
			if (systemAPI.browser.msie && (systemAPI.browser.version < 6)) 
				systemAPI.alert("Browser not supported","Required Internet Explorer 6 or greater ");				
			else if (systemAPI.browser.msie) ok = true;			
			if (systemAPI.browser.firefox && systemAPI.browser.version < 2.6) 			
				ok = confirm("This program not tested on firefox "+systemAPI.browser.version+". Are you want to continue?");				
			else if (systemAPI.browser.firefox) ok = true;			
			if (systemAPI.browser.opera) ok = true;						
			if (!ok && !systemAPI.browser.msie && !systemAPI.browser.opera && !systemAPI.browser.firefox ){			    
				ok = true;//confirm("Your browser "+systemAPI.browser.name+" ( "+systemAPI.browser.version+") and program not tested on this browser. You wanna try?");							
			}
			if (ok){																
				showProgress("Loading system libraries....");						
				uses("XMLAble;component;control;containerComponent;containerControl;buttonState;system_system;arrayMap;eventHandler;arrayList;application;commonForm;server_util_arrayList;server_Request;server_Response;server_RemoteObject;util_Connection;form;"+window.initApp +";"+ window.initApp.substr(0,window.initApp.length - 3) +"fMain;util_dbUtility");
				showProgress("initialization system...");				
				if (system_system){
					window.system = new system_system();						
					showProgress("system start...");
					window.system.init(window.initApp, window.paramApp);
					window.pageForm.style.display = "none";				
					showProgress("welcome...");
					window.splash.style.display = "none";				
				}
				hideProgress();			
				if (window.parent && window.parent.hideLoading) window.parent.hideLoading();
			}
		}catch(e){
			hideProgress();				
			alert("System failed to load...\r\nPlease check your connection.");
		}		
	}

};
