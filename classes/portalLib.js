//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.Function.prototype.extend = function(parentClassOrObject){
    try
    {				
        if (typeof(parentClassOrObject) == "function")
        {
        	if (parentClassOrObject.constructor == Function)
            {
                this.prototype = new parentClassOrObject;
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject.prototype;				
    	    }
    	    else
    	    {
                this.prototype = parentClassOrObject;
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject;
    	    }			
            return this;
        }
    }
    catch (e)
    {
        if (this.className != undefined)
            alert("Error when extending class : " + this.className + " : " + e);
        else
            alert("Error when extending class : " + this + " : " + e);
    }
};
window.Function.prototype.addMethod = function(name, method, force){				
		if (force || !this.prototype[name]) eval( "this.prototype."+ name+" = "+method);			
};
window.Function.prototype.implement = function(a1, a2, a3){
	try{
		if (a2 == undefined) a2 = true;
		if (typeof a1 == 'string') return this.addMethod(a1, a2, a3);	
		for (var p in a1) this.addMethod(p, a1[p], a2);						
	}catch(e){
		alert(e);
	}		
};
window.Function.prototype.add = function(a1, a2, a3){
	try{
		if (a2 == undefined) a2 = true;
		if (typeof a1 == 'string') return this.addMethod(a1, a2, a3);	
		for (var p in a1) this.addMethod(p, a1[p], a2);						
	}catch(e){
		alert(e);
	}		
};
function getBasicResourceId()
{
    var result = window.basicResourceId;
    window.basicResourceId++;
    
    return result;
};
function loadCSS(cssfile){
	
	if (usesHttp != undefined)
    {                
		var script = "";
		usesHttp.open("GET", "uses.php?mode=loadCss&filename=" + cssfile, false);
		usesHttp.send("");
		if (usesHttp.status == 200)		
			script =  usesHttp.responseText;                    						
		return script;
		
    }
};
function getVisitor(){	
	if (usesHttp != undefined)
    {                
		var script = "";
		usesHttp.open("GET", "uses.php?mode=visitor", false);
		usesHttp.send("");
		if (usesHttp.status == 200)		
			script =  usesHttp.responseText;                    						
		return script;
		
    }
};
function printPreview(html){
	var winfram = window.open();
	winfram.document.open();			
	winfram.document.write(loadCSS("server_util_laporan"));
	winfram.document.write(html);
	winfram.document.close();
};
function writeToIframe(frameid, html){		
	var winfram= $(frameid);//window.frames[frameid];	
	winfram.contentWindow.document.open();
	winfram.contentWindow.document.write("");
	winfram.contentWindow.document.close();
	winfram.contentWindow.document.open();					
	winfram.contentWindow.document.write(loadCSS("server_util_laporan"));		
	winfram.contentWindow.document.write("<div align='center'>");
	winfram.contentWindow.document.write(html);
	winfram.contentWindow.document.write("</div>");
	winfram.contentWindow.document.close();
};
function addCss(cssFile){
	var headID = document.getElementsByTagName("head")[0]; 
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = cssFile;	
	headID.appendChild(cssNode);
};
function runArraySQL(sql, svrVar, initClass, setting){
	if (httpObj != undefined)
    {                		
		var params = "mode=query&sql=" + urlencode(sql)+"&svrVar="+(svrVar === undefined ? "" : svrVar)+"&initClass="+(initClass === undefined ? "":initClass)+"&setting="+setting;
		var script = "";
		httpObj.open("POST", "uses.php", false);
		httpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		httpObj.send(params);
		if (httpObj.status == 200)		
			script =  httpObj.responseText;                    								
		return script;
		
    }
};
function getDataProvider(sql,isObject){
	if (httpObj != undefined)
    {                		
		var params = "mode=query&json=" + urlencode(sql);
		var script = "";
		httpObj.open("POST", "uses.php", false);
		httpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		httpObj.send(params);
		if (httpObj.status == 200){
			script =  httpObj.responseText;                    								
			if (isObject){
			     eval("script = "+script+";");
            }
		}
		return script;		
    }
};
function getScript(address){
	if (httpObj != undefined)
    {                		
		httpObj.open("POST", address, false);
		httpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		httpObj.send(null);
		if (httpObj.status == 200){
			script =  httpObj.responseText;			
		}
		return script;		
    }
};
function classExists(c) {
    return typeof(c) == "function" && typeof(c.prototype) == "function" ? true : false;
} 
function uses(className, alwaysLoad,classFile, param, param2){			
	if (alwaysLoad === undefined) alwaysLoad = false;
	if (classFile === undefined) classFile = true;
	if (param2 === undefined) param2 = "";
	var classExist = false;	
	if (usesHttp !== undefined)
    {
		try{					
			var cn = className.split(";");
			var cnTmp = "",script="";
			var classExist = false;			
			showProgress("load Class");		
			var t = "";				
			for (var i=0;i < cn.length;i++){
				if (cn[i] != ""){
					if (cn[i].search("_") == -1 && cn[i] != ""){									
						cn[i] = "portalui_"+cn[i];					
					}
					script =  "try {classExist = (" + cn[i] + " != undefined); } catch (e) {classExist = false;}";				   						   
					//script = "classExist = classExists("+cn[i]+"); ";
					eval(script);										
					if ((!classExist || alwaysLoad) ) if (cnTmp == "") cnTmp = cn[i]; else cnTmp += ";"+cn[i];
				}
			}				
			if (cnTmp == "") {
				hideProgress();				
				return false;
			}							
			className = cnTmp;
			var params = "mode=loadMultiClass&className=" + className+"&param2="+param2;	
			usesHttp.open("POST", "uses.php", false);
			usesHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			usesHttp.setRequestHeader("Accept-Encoding", "gzip");  
			usesHttp.setRequestHeader("Content-Length", params.length);  
			usesHttp.send(params);
			if (usesHttp.status == 200)
			{									
				script = usesHttp.responseText;								
				try
				{												
					eval("try { " + script + " } catch (e2) {}");						
				}catch (e){                        
					hideProgress();
					systemAPI.alert("Error Loading Class:"+className,e);
				}
			}						
			hideProgress();
			return false;						
		}catch(e){
			alert(e);
			hideProgress();
			systemAPI.alert("Server Connection Failed :Error Loading Class "+className);			
		}
	}
};
// HTTPRequest Object for uses function
if (document.all && !window.XMLHttpRequest) { 
	window.XMLHttpRequest = function() {	
		var xhr = false;
		var versions = ["Msxml2.XMLHTTP.7.0","Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0", 
		               "MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
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
}
usesHttp = new XMLHttpRequest();
httpObj = new XMLHttpRequest();
try
{
    usesHttp.overrideMimeType('text/javascript');		
	//usesHttp.setRequestHeader('Accept-Encoding','deflate, gzip');		
	httpObj.overrideMimeType('text/html');						
}
catch (e)
{}
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
var agent = navigator.userAgent.toLowerCase();
window.isIE      = agent.indexOf("msie") > -1;
window.ieVer = window.isIE ? /msie\s(\d\.\d)/.exec(agent)[1] : 0;
window.isMoz     = agent.indexOf('firefox') != -1;
window.isSafari  = agent.indexOf('safari') != -1;
window.quirksMode= window.isIE && (!document.compatMode || document.compatMode.indexOf("BackCompat") > -1);
window.isOp      = 'opera' in window;
window.isWebKit  = agent.indexOf('webkit') != -1;

function browserdetect() {
  var agent = navigator.userAgent.toLowerCase();
  this.isIE      = agent.indexOf("msie") > -1;
  this.ieVer = this.isIE ? /msie\s(\d\.\d)/.exec(agent)[1] : 0;
  this.isMoz     = agent.indexOf('firefox') != -1;
  this.isSafari  = agent.indexOf('safari') != -1;
  this.quirksMode= this.isIE && (!document.compatMode || document.compatMode.indexOf("BackCompat") > -1);
  this.isOp      = 'opera' in window;
  this.isWebKit  = agent.indexOf('webkit') != -1;
  if (this.isIE) {
    this.get_style = function(obj, prop) {
      if (!(prop in obj.currentStyle)) return "";
      var matches = /^([\d.]+)(\w*)/.exec(obj.currentStyle[prop]);
      if (!matches) return obj.currentStyle[prop];
      if (matches[1] == 0) return '0';
      // now convert to pixels if necessary
      if (matches[2] && matches[2] !== 'px') {
        var style = obj.style.left;
        var rtStyle = obj.runtimeStyle.left;
        obj.runtimeStyle.left = obj.currentStyle.left;
        obj.style.left = matches[1] + matches[2];
        matches[0] = obj.style.pixelLeft;
        obj.style.left = style;
        obj.runtimeStyle.left = rtStyle;
      }
      return matches[0];
    };
  }
  else {
    this.get_style = function(obj, prop) {
      prop = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return document.defaultView.getComputedStyle(obj, '').getPropertyValue(prop);
    };
  }
};
var curvyBrowser = new browserdetect;
var curvyCorners = undefined;
var systemAPI = {
		systemRect: function(){
			var r = {left: window.pageCnv.style.left, top : window.pageCnv.style.top, width: window.pageCnv.offsetWidth, height: window.pageCnv.offsetHeight};			
			return r;
		},
		hide : function(event){			
			try{				
				var dbg = document.getElementById("systemMsg");			
				dbg.style.display = "none";				
				dbg.style.visibility = "hidden";
				
				var systembtn = $("systembtn");
				systembtn.style.display= "none";
				var msgText = $("msgTxt");
				msgText.innerHTML = "";
				if (system.getActiveApplication().getActiveForm().activeChildForm){
					if (system.getActiveApplication().getActiveForm().activeChildForm.activeControl)
						system.getActiveApplication().getActiveForm().activeChildForm.activeControl.setFocus();
				}else if (system.getActiveApplication().getActiveForm()){
					if (system.getActiveApplication().getActiveForm().activeControl) 
						system.getActiveApplication().getActiveForm().activeControl.setFocus();
				}
			}catch(e){
				alert(e);
			}
		},
		mouseover: function(event){
			try{
				var target = document.all? event.srcElement:event.target;				
				target.style.backgroundColor = "#cb7a06";
				colorFade(target,"border","ff9900","32adec",10,100);								
			}catch(e){
				alert(e);
			}
		},
		mouseout: function(event){
			try{
				var target = document.all? event.srcElement:event.target;				
				colorFade(target,"border","32adec","ff9900",10,100);				
				target.style.backgroundColor = "#0d6491";
			}catch(e){
				alert(e);
			}
		},
		showErrorLog: function(){
			var imgbtn = $("syserrorbtn");
			imgbtn.style.display = "none";
			var msg = $("systemMsg");
			msg.style.display = "";
			msg.style.visibility = "visible";
			var btn = $("sysbtn");
			btn.style.display = "";
		},		
		alert: function(message, info, color){	
			return false;		
			info = info === undefined ? "" : info;
			var lastMsg = "";
			var systembtn = $("systembtn");
			systembtn.style.display= "";
			var imgbtn = $("syserrorbtn");			
			var btn = $("sysbtn");
			
			
			var msg = $("systemMsg");			
			var msgBg = $("msgBg");			
			var msgHeader = $("msgHeader");			
			var msgText = $("msgTxt");			
			if (msg.style.display == "none") imgbtn.style.display = "";
			btn.style.display = msg.style.display;
			/*if (msg.style.display == ""){						
				lastMsg = document.all ? msgText.innerText : msgText.textContent;								
				var btn = $("sysbtn");
				btn.parentNode.removeChild(btn);
			}
			*/
			msgText.style.overflow= "auto";
			var rect = this.systemRect();			
			//msg.style.display = "none";			
			//msg.style.visibility = "hidden";
			msg.style.left = rect.width - 420;
			msg.style.top = rect.height - 365;
			systembtn.style.top = rect.height - 25;
			systembtn.style.left = rect.width - 420;			
			if (this.browser.msie){				
				msgText.innerHTML += message +"<br>"+info+"<br>";			
			}else 
				msgText.innerHTML += message +"\r\n"+info+"<br>";			
			//var btnHtml = "<br><div id='sysbtn' style='cursor:pointer;-webkit-border-radius: 10px;-moz-border-radius: 10px;background-color:#0d6491;background-image:url(image/button.png);border:2px solid #ff9900;top:"+(rect.height - 50).toString()+"px;width:80;height:20' onClick='systemAPI.hide();' onMouseOut='systemAPI.mouseout(event);' onMouseOver='systemAPI.mouseover(event);'  align='center'>OK</div>";
			/*if ( msgText.offsetHeight > rect.height){
				msgText.style.height = rect.height;
				msgText.style.overflow= "hidden";				
			}
			if ( msgText.offsetWidth > rect.width){
				msgText.style.width = rect.width+3;
				msgText.style.overflow= "hidden";				
			}*/
			//msgText.innerHTML += btnHtml;			
			//msgText.style.top = rect.height / 2 - msgText.offsetHeight / 2; 
			//msgText.style.left = rect.width / 2 - msgText.offsetWidth / 2;	
			msgHeader.style.border = "1px solid #ffffff";//0f5e87
			msgHeader.style.color = "#ff9900";
			msgHeader.style.background = "#333333";
			//msgHeader.style.top = parseInt(msgText.style.top,10) - 35;
			//msgHeader.style.left = msgText.style.left;
			//msgHeader.style.width = msgText.offsetWidth;			
			msgBg.style.background = "#555555";			
			//msgText.style.background = "#1876a6";
			msgText.style.border = "1px solid #ffffff";//0f5e87            
			if (system !== undefined){
				if (system.activeApplication !== undefined)
					system.activeApplication._mainForm.unblock();
			}
		},
		reqClearStatus:function(){
			window.loadingText.innerHTML = "";
			window.loading.style.display = "none";
		},
		reqStatus:function(sender, status){												
			systemAPI.reqClearStatus();
		},
		browser:{			
			msie: (BrowserDetect.browser == "Explorer" ? true : false),
			opera: (BrowserDetect.browser == "Opera" ? true: false),
			firefox: ( BrowserDetect.browser == "Firefox" ? true:false),
			chrome: ( BrowserDetect.browser == "Chrome" ? true:false),
			name: BrowserDetect.browser,
			version: BrowserDetect.version,
			OS: BrowserDetect.OS
		},
		about:{version: "1.00",build: "Oktober",codeName: "roojax portal"
		},
		flashReady: function (){
			systemAPI.flashIsReady = true;
			if (systemAPI.obj !== undefined){
				systemAPI.obj.setFlashResource();
				systemAPI.obj.setFlashTitle();
			}
		},
		getFlexApp: function (appName){
		  if (navigator.appName.indexOf("Microsoft") !=-1){
		    return window[appName];
		  }else{
		    return document[appName];
		  }		  
		},
		MSIE: (BrowserDetect.browser == "Explorer" ? true : false),
		uploadHandler: function(data){
			alert(data);
		}
	};
function deleteByObj(dataArray, obj){
	var tmp = [];
	for (var i in dataArray){
		if (dataArray[i] != obj)
			tmp.push(dataArray[i]);
	}
	return tmp;
};
function deleteByIndex(dataArray, index){
	var tmp = [];
	for (var i in dataArray){
		if (i != index)
			tmp.push(dataArray[i]);
	}
	return tmp;
};

function showProgress(text, visible){
	if (text === undefined) text = "Request...";
	window.loadingText.innerHTML = text;
	var loading = $("system_loading");	
	loading.style.display = visible == undefined ? "none" :"";
	loading.style.visibility = visible == undefined ? "hidden" :"visible";
	if (visible != undefined)
		centerize(loading);
	
};
function centerize(el){
	if (pageCnv) {
		el.style.left = parseInt(pageCnv.offsetWidth) / 2 - 110;				
		el.style.top = parseInt(pageCnv.offsetHeight) / 2 - 50;				
	}
}
function hideProgress(){
	window.loadingText.innerHTML = "";
	var loading = $("system_loading");
	loading.style.display = "none";
	loading.style.visibility = "hidden";
};
function upDownHtml(html){
	if (usesHttp != undefined){
		try{
		    if (system.activeApplication._mainForm.childBlock) system.activeApplication._mainForm.childBlock.show();
			uses("server_request");
			uses("server_util_Map");		
			var request = new server_Request();
			request.setParams(html);
			var params = "html="+urlencode(request.toXML());
	        usesHttp.open("POST", "server/downloadCtrl.php", false);
			usesHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			usesHttp.setRequestHeader("Content-Length", params.length);  
	        usesHttp.send(params);				
	        if (usesHttp.status == 200)
	            var result = usesHttp.responseText;
	        else
	            var result = undefined;		
			if (system.activeApplication._mainForm.childBlock) system.activeApplication._mainForm.childBlock.hide();
			return result;
		}catch(e){
			systemAPI.alert(e);
		}
    }
};
function download(text,type){
	var iframe = $("loader");
    // Yet Another Silly WebReflection Experiment    
	if (type == "xls") var appType = "x-msexcel";
	else if (type == "doc") var appType = "msword";
	else var appType = "octet-stream";
    iframe.src = "data:application/"+appType+";base64," + Base64.encode(text);    
};	
function downloadPath(path){
	var iframe = $("loader");
	//showProgress("Please wait....");
    // Yet Another Silly WebReflection Experiment 	
    iframe.src = path;    
};	
function downloadFile(request, target){
	try{
		//showStatus("Requesting...");
		//showProgress("download...");
		var iframe = $("downloader");	
		//var doc = iframe.document || iframe.contentDocument;	
		var doc = iframe.contentWindow.document;	
		var form = doc.forms[0];    
		if (target) form.target = target;
		else form.target = "framecontainer";
		form.request.value = request.toXML();    		
		form.submit();
	}catch(e){
		alert(e);
	}
};
function previewReport(request, address, target){
	try{
		showProgress("Preview Report....");
		showStatus("Preview...");
		var iframe = $("reporter");	
		//var doc = iframe.document || iframe.contentDocument;	
		var doc = iframe.contentWindow.document;	
		var form = doc.forms[0];    
		if (target) form.target = target;
		if (address) form.action = address;
		form.object.value = request.remoteObj;    
		form.method.value = request.methodName;    
		form.param.value = request.param;    
		form.session.value = request.obj.session;    
		form.addparam.value = request.obj.addParam;    
		form.submit();
	}catch(e){
		alert("Preview Report"+e);
	}
};
function showStatus(text){
	var bar = $("statusbar");	
	bar.style.visibility = "visible";
	bar.innerHTML = "<table><tr ><td  valign='middle'> <img src='image/request.gif' id='imgbar'/></td><td style='font-size:9px;font-family:arial;' valign='middle'>" + text +"</td></tr>";
};
function hideStatus(text){
	var bar = $("statusbar");	
	bar.style.visibility = "hidden";	
};

function downloadHtml(html){
	if (usesHttp != undefined){
		try{		    
			uses("server_request");
			uses("server_util_Map");		
			var request = new server_Request();
			request.setParams(html);			
			return ("downloader.php?html=" + urlencode(request.toXML()));
		}catch(e){
			systemAPI.alert(e);
		}
    }
};
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
}
function loadXMLDoc(xmlFile){
	try //Internet Explorer
	  {
		var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
	  }
	catch(e)
	  {
	  try //Firefox, Mozilla, Opera, etc.
	    {
			if (xmlFile.search(".xml") != -1){
				var  xmlDoc= document.implementation.createDocument("","",null);			
				xmlDoc.async=false;
			}else var parser= new DOMParser();									
	    }
	  catch(e) {alert(e.message)}
	  }
	try 
	  {	  
		  if (xmlFile.search(".xml") != -1)
			xmlDoc.load(xmlFile);	  
		  else {
			 if (parser !== undefined)
				var xmlDoc=parser.parseFromString(xmlFile,"text/xml");
			else xmlDoc.loadXML(xmlFile);
		  }	  
		  return xmlDoc;
	  }
	catch(e) {alert(e.message)}
};
function getTinyMCECtrl(c){
	var child;
	for (var i in c.childs.objList){
		child = $$(i);
		if (child instanceof tinymceCtrl){
			child.init();
		}else if (child instanceof containerControl){ 			
			getTinyMCECtrl(child);
		}
	}
}
function isWindow ( obj ) {
		return obj != null && obj == obj.window;
};
function getWindow( elem ) {
	return isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
};
window.tinyMCE = window.tinymce = undefined;
function error_log(log){
	//systemAPI.alert(log);
}
var rev = "fwd";
function titlebar(val, msg)
{
	var res = " ";
	var speed = 100;
	var pos = val;

	//msg = "   |--- "+msg+" ---|";
	var le = msg.length;
	if(rev == "fwd"){
		if(pos < le){
		pos = pos+1;
		scroll = msg.substr(0,pos);
		document.title = scroll;
		timer = window.setTimeout("titlebar("+pos+",'"+msg+"')",speed);
		}
		else{
		rev = "bwd";
		timer = window.setTimeout("titlebar("+pos+",'"+msg+"')",speed);
		}
	}else{
		if(pos > 0){
		pos = pos-1;
		var ale = le-pos;
		scrol = msg.substr(ale,le);
		document.title = scrol;
		timer = window.setTimeout("titlebar("+pos+",'"+msg+"')",speed);
		}
		else{		rev = "fwd";
		timer = window.setTimeout("titlebar("+pos+",'"+msg+"')",speed);
		}	
	}
}
