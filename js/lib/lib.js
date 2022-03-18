function showLoading(){
	$("#loading").show();
};
function hideLoading(){
	$("#loading").hide();
};
function showProgress(msg){
	$("#progress_text").text(msg);
	$("#progress").show("slow");	
};
function hideProgress(){
	$("#progress").hide();
};
function showStatus(msg){
	error_log(msg);
	$("#progress").show();
	$("#progress_text").text(msg);
};
function hideStatus(){
	$("#progress").hide();
};
function block(){
	$("#system_block").show();
};
function unblock(){
	$("#system_block").hide();
};
function error_log(msg){
	$("#error_log").css({left:$(window).width() - 200, top:$(window).height() - 200 });	
	$("<div class='error'>"+msg+"</div>").appendTo($("#error_log_cont"));
	$("#error_log_cont").scrollTop(100000000);
	$("#error_log").show("slow");	
	$("#error_log").click(function(){
		$(this).hide("slow", function(){
			$("#error_log_cont").contents().each(function(){
				$(this).remove();
			});
		});		
	});
};
function setEvent(fn) {
    try{        
        if (document.all)
            return new Function(fn);
        else return new Function("event",fn);           
    }catch(e){
        alert("event " + e);
    }
};
setCookie = function(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
};
getCookie = function(c_name){
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
};
function trim(text){
	return $.trim(text);
};
function showHint(msg, x, y){
	$("#hint_msg").text(msg);	
	$("#hint").css({left : x, top: y});
	$("#hint").show("slow");
};
function hideHint(){
	$("#hint").hide("slow");
};
function getCookie(c_name){
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
};
function getBasicResourceId()
{
    var result = window.basicResourceId;
    window.basicResourceId++;
    
    return result;
};
function setCaret(o,start, end){
	try{		
		if("selectionStart" in o){						
			o.setSelectionRange(start, end);
		}else if(document.selection){
			var t = o.createTextRange();
			end -= start + o.value.slice(start + 1, end).split("\n").length - 1;
			start -= o.value.slice(0, start).split("\n").length - 1;            
            t.moveStart("character", start), t.moveEnd("character", end), t.select();
		}
		o.focus();
	}catch(e){
		alert("$setCaret:"+e);
	}
};
function getCaret(o){		
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', o.value.length);
		if (r.text == '') return o.value.length;
		return o.value.lastIndexOf(r.text);
	} else return o.selectionStart;
};
function startSystem(){
	$("#system").css({width:$(window).width(), height:$(window).height()});		
	$("#progress").css({width:$(window).width()});		
	showProgress("Loading system libraries....");						
	uses("rexml;XMLAble;component;control;containerComponent;containerControl;buttonState;system_system;arrayMap;eventHandler;arrayList;application;commonForm;server_util_arrayList;server_Request;server_Response;server_RemoteObject;util_Connection;form;util_dbLib;"+window.initApp +";"+ window.initApp.substr(0,window.initApp.length - 3) +"fMain;");
	showProgress("initialization system...");				
	if (system_system){
		showProgress("system start...");
		window.system = new system_system();								
		showProgress("start Application...");		
		window.system.init(window.initApp, window.paramApp);		
		showProgress("welcome...");				
		$("#splash").hide("slow");
		$("#splash").remove();
		hideProgress();		
	}
};
/***********************************************************************
***********************************************************************/
systemAPI = {
	alert : function(msg,addMsg){
				error_log(msg);
				error_log("info:"+addMsg);
			},
	browser : $.browser
};
systemAPI.browser.version = parseInt($.browser.version,10);

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
window.Function.prototype.implement = function(a1, a2, a3){
	try{
		if (a2 == undefined) a2 = true;
		if (typeof a1 == 'string') return this.addMethod(a1, a2, a3);	
		for (var p in a1) this.addMethod(p, a1[p], a2);						
	}catch(e){
		alert(e);
	}		
};

window.Function.prototype.addMethod = function(name, method, force){				
		if (force || !this.prototype[name]) eval( "this.prototype."+ name+" = "+method);			
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

/**********************************************************************/
function classExists(c) {
    return typeof(c) == "function" && typeof(c.prototype) == "function" ? true : false;
}; 
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
function uses(className, alwaysLoad,classFile, param, param2){			
	if (alwaysLoad === undefined) alwaysLoad = false;
	if (classFile === undefined) classFile = true;
	if (param2 === undefined) param2 = "";
	var classExist = false;		
	try{					
		var cn = className.split(";");
		var cnTmp = "",
			script="";
		var classExist = false;			
		showProgress("load Class");		
		var t = "";				
		for (var i=0;i < cn.length;i++){
			if (cn[i] != ""){
				if (cn[i].search("_") == -1 && cn[i] != ""){									
					cn[i] = "control_"+cn[i];					
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
		$.ajax({
			url : "uses.php",
			type : "POST",
			//dataType :"script",
			async : false,
			data : {	mode	:"loadMultiClass",
						className:className,
						param2	: param2
					},
			success: function(data, status){											
				script = data;
				try{									
					eval("try { " + script + " } catch (e2) {}");						
				}catch (e){                        						
					alert("Error Loading Class:"+className + ":"+e);
				}				
			},
			error: function(xhr, desc, err) {				
				console.log("Desc: " + desc + "\nErr:" + err);
			}

		});						
	}catch(e){
		hideProgress();
		error_log("Server Connection Failed :Error Loading Class "+className);			
	}
};
