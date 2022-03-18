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

//periode
function periodeToName(periode){
	return window.monthName["ID"][periode.substr(4,2)] +" "+periode.substr(0,4);
}
function nextNPeriode(periode, n) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	for (var i = 1; i <= n;i++){
		if (bln < 12) bln++;
		else {
			bln = 1;
			thn++;
		}
	}
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function getPrevPeriode(periode) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln == 1) {
		bln = 12;
		thn--;
	}else bln--;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function getNextPeriode(periode) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln == 12 ) {
		bln = 1;
		thn++;
	}else bln++;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function closePeriode(periode, maksPeriode){
	
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln < 0 || bln > 99) bln = 1;	
	if (bln == maksPeriode ) {
		bln = 1;
		thn++;
	}else bln++;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
//---------------------- Date Extended
Date.prototype.DateAdd = function (timeU,byMany,dateObj) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;
  //542278
	var newDate;
	var dVal=this.valueOf();
	switch(timeU) {
		case "ms": newDate=new Date(dVal+millisecond*byMany); break;
		case "s": newDate=new Date(dVal+second*byMany); break;
		case "mi": newDate=new Date(dVal+minute*byMany); break;
		case "h": newDate=new Date(dVal+hour*byMany); break;
		case "d": newDate=new Date(dVal+day*byMany); break;
		case "y": newDate=new Date(dVal+year*byMany); break;
	}
	return newDate;
};
Date.prototype.DateSub = function (timeU,byMany,dateObj) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;
  //542278
	var newDate;
	var dVal=this.valueOf();
	switch(timeU) {
		case "ms": newDate=new Date(dVal-millisecond*byMany); break;
		case "s": newDate=new Date(dVal-second*byMany); break;
		case "mi": newDate=new Date(dVal-minute*byMany); break;
		case "h": newDate=new Date(dVal-hour*byMany); break;
		case "d": newDate=new Date(dVal-day*byMany); break;
		case "y": newDate=new Date(dVal-year*byMany); break;
	}
	return newDate;
};
Date.prototype.getBln = function() {		
	return this.getMonth() + 1;
};
function dayToYear(day){		
	var y = Math.floor( day / 365);//390 - 365 = 25
	var s = day % 365;
	var m = Math.floor( s / 30);
	s = s % 30;
	return [y, m, s];
};
Date.prototype.DateDiff = function(dateObj){
  var ret = (this - dateObj) / (24*60*60*1000);
  return ret;
};
Date.prototype.getDateStr = function(){
	return this.getFullYear()+"-"+(this.getBln() < 10? "0"+this.getBln(): this.getBln())+"-"+(this.getDate() < 10? "0"+this.getDate(): this.getDate());
};
Date.prototype.getDateTimeStr = function(nminute){
	var d = this.DateSub("mi",nminute);
	return d.getFullYear()+"-"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"-"+(d.getDate() < 10? "0"+d.getDate(): d.getDate()) +
		d.getHours() +":"+d.getMinutes()+":"+d.getSeconds();
	
};
Date.prototype.idFormat = function(strDate){
	var d = this.strToDate(strDate);
	return (d.getDate() < 10? "0"+d.getDate(): d.getDate())+"/"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"/"+d.getFullYear();
};
Date.prototype.lclFormat = function(){
	var d = this;
	return (d.getDate() < 10? "0"+d.getDate(): d.getDate())+"/"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"/"+d.getFullYear();
};
Date.prototype.getThnBln = function(){
	var d = this;
	return d.getFullYear() + (d.getBln() < 10? "0"+d.getBln(): d.getBln());
};
Date.prototype.strToDate = function(strDate){
  if (strDate.search("/") != -1)
  {
	//20/01/2008
	var d = strDate.split("/");
	var ret = new Date(parseInt(d[2],10),parseInt(d[1],10) - 1,parseInt(d[0],10));	
  }else 
  {
	//2008-01-20
	var d = strDate.split("-");
	if (d[0].length == 4)
		var ret = new Date(parseInt(d[0],10),parseInt(d[1],10) - 1,parseInt(d[2],10));	
	else var ret = new Date(parseInt(d[2],10),parseInt(d[1],10) - 1,parseInt(d[0],10));	
  }	  
  return ret;
};
Date.prototype.sqlDateStr = function(strDate){
  if (strDate.search("/") != -1)
  {
	//20/01/2008
	var d = strDate.split("/");
	var ret = parseInt(d[2],10)+"-"+parseInt(d[1],10)+"-"+parseInt(d[0],10);	
  }	  
  return ret;
};
function formatNumeric(format, idx){
	var result = idx.toString();
	for (var i =0;i < format.length;i++)
	{
		if (result.length < format.length)
			result = "0" + result;      
	}
	return result;
};
//--------------------------------- Number Format Text
function format_number(value, decLength, decSp, thousSep){
	// 20000.45678 => 
	if (typeof(value) == "string") return value;
	var nilai = value.toString();
	var dec = "";
	if (nilai == "NaN") return 0;	
	if (nilai.search(".") == -1) {
		nilai = floatToNilai(parseFloat(nilai),decSp, thousSep);
		for (var i=0;i < decLength;i++)
			dec += "0";
	}else {
		nilai = nilai.replace(".",decSp);
		nilai = nilai.split(decSp);		
		dec = nilai[1];
		if (dec == undefined) dec = "";
		for (var i=0;i < decLength;i++)
			dec += "0";
		nilai = floatToNilai(parseFloat(nilai[0]),decSp, thousSep);
		dec = dec.substr(0,decLength);
	}	
	return nilai + decSp + dec;
};
function parseNilai(value){
	//2.000.000,34 -> 2000000.34 => untuk save ke table  atau olahan	
	var nilai = String(RemoveTitik(value));
	nilai = nilai.replace(",",".");
	
	return nilai;
};
function isNilai(value){
	if (typeof(value) == "string"){
		var c = 0;
		for (var i =0;i < value.length ;i++)
			if (value.charAt(i) == ".") c++;
		if (c >= 1) return true;
		else {
			var tmp = value.split(".");			
			if ( tmp[tmp.length - 1].length == 3 && tmp[0] != "0") 
				return true;
			else return false; 
		}
	} else return false;

};
function RemoveTitik(str){
  var num = str;
  var numtmp ="";
  var i;
  
  for (i=0;i<num.length;i++)
   {     
    if (num.charAt(i) != ".")
         numtmp += num.charAt(i); 
   }  
  num = numtmp; 
  return  num;
};
function decToFloat(value)	{
	//2000,56 -> 2000.56 -> untuk olah data aritmatika
	if (typeof(value) != "string") value = value.toString();
	if (value == "NaN") value = "0";
	var nilai = value;
	nilai = nilai.replace(",",".");
	return parseFloat(nilai);
};
function floatToDec(value){
	if (typeof(value) == "string") value = parseFloat(value);
	else if (isNaN(value)) value = 0;
	//2000.56 -> 2000,56 -> untuk komponen
	var nilai = value.toString();
	nilai = nilai.replace(".",",");
	return nilai;
};
function floatToNilai(value,decSep, thousandSep){
	//2000.56 -> 2.000,56 -> untuk komponen
	var nilai = floatToDec(value);
	nilai = decToNilai(nilai,decSep, thousandSep);
	return nilai;
};
function nilaiToFloat(value){
	//2.000,25 -> 2000.25
	var nilai = nilaiToDec(value);
	nilai = decToFloat(nilai);
	return parseFloat(nilai);
};
function nilaiToDec(value){
	//2.000.000,35 -> 2000000,35 
	var nilai = String(RemoveTitik(value));
	return nilai;
};
function decToNilai(value, decSep, thousandSep){
	//2000000,35 -> 2.000.000,35 
	var nilai = strToNilai(value,decSep, thousandSep);
	return nilai;
};
function strToFloat(data) {
    var nilai = String(RemoveTitik(data));
	nilai = nilai.replace(",",".");//alert(nilai +" "+data);
	return parseFloat(nilai);
};
function ifNull(driver){
	return (driver =="mysqlt" ? "ifnull" : "isnull");
};
function replaceStrBetween(str1, str2, strRep, strObj){
	
	var pos1 = strObj.indexOf(str1);
	var pos2 = strObj.indexOf(str2);
	
	if (pos1 == -1) return false;
	
	var result = strObj.substr(0,pos1 + str1.length) + " " +strRep +" "+strObj.substr(pos2);
	return result;
};
function LTrim ( value ) {
	if (typeof(value) != "string") return value;
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
};
// Removes ending whitespaces
function RTrim ( value ) {	
	if (typeof(value) != "string") return value;
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");	
};
// Removes leading and ending whitespaces
function trim ( value ) {	
	return LTrim(RTrim(value));	
};
function strToNilai(value, decSep, thousandSep) {
  try	{
	  //if (value.indexOf(".") != -1)
	    //value = value.replace(".",",");      
	  if (typeof(value) != "string") return floatToNilai(value, decSep, thousandSep);
	  var isMin = value.search("-") != -1 ? true : false;
	  if (isMin)  
		value = value.replace("-","");
	  var decpoint = ',';
	  var sep = '.';
	  if (decSep != undefined) decpoint = decSep;
	  if (thousandSep != undefined) sep = thousandSep;
	  var isExit = 0;
	  var num = value;
	  
	  var numtmp ="";
	  var i;
	  
	  for (i=0;i<num.length;i++)
	   {     
	    if (num.charAt(i) != ".")
	         numtmp += num.charAt(i); 
	   }  
	  num = numtmp; 
	  // need a string for operations
	  num = num.toString();
	  // separate the whole number and the fraction if possible
	  a = num.split(decpoint);
	  x = a[0]; // decimal
	  y = a[1]; // fraction
	  z = "";


	  if (typeof(x) != "undefined") {
	    // reverse the digits. regexp works from left to right.
	    for (i=x.length-1;i>=0;i--)
	      z += x.charAt(i);
	    // add seperators. but undo the trailing one, if there
	    z = z.replace(/(\d{3})/g, "$1" + sep);
	    if (z.slice(-sep.length) == sep)
	      z = z.slice(0, -sep.length);
	    x = "";
	    // reverse again to get back the number
	    for (i=z.length-1;i>=0;i--)
	      x += z.charAt(i);
	    // add the fraction back in, if it was there
	    if (typeof(y) != "undefined" && y.length > 0)
	      x += decpoint + y;
	  }  
	  if (isMin)
		 x = '-' + x;
	  return x;
	  //var nCursorPos = numtmp.length;
	  //setCursor(edit,nCursorPos);
	}catch(e){
		alert("strToNilai::"+e);
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
function addCss(cssFile){
	var headID = document.getElementsByTagName("head")[0]; 
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = cssFile;	
	headID.appendChild(cssNode);
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
function loadJS(jsFile, crypted)
{
	try{
		if (usesHttp != undefined)
	    {                
			var script = "";
			var params = "mode=loadJS&className=" + jsFile;	
			usesHttp.open("POST", "uses.php", false);
			usesHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			usesHttp.setRequestHeader("Content-Length", params.length);  
			usesHttp.send(params);
			if (usesHttp.status == 200)				
				script =  usesHttp.responseText;
			try{												
				eval("try { " + script + " } catch (e2) {}");
			}catch (e){                        			
				systemAPI.alert("Error Loading file"+jsFile,e);
			}
	    }
	}catch(e){
		alert(e);
	}
};
function runArraySQL(sql, svrVar, initClass){
	if (httpObj != undefined)
    {                		
		var params = "mode=query&sql=" + urlencode(sql)+"&svrVar="+(svrVar === undefined ? "" : svrVar)+"&initClass="+(initClass === undefined ? "":initClass);								
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
			for (var i=0;i < cn.length;i++){
				script =  "try {classExist = (" + cn[i] + " != undefined); } catch (e) {classExist = false;}";				   						   
				eval(script);					
				if (!classExist || alwaysLoad) if (cnTmp == "") cnTmp = cn[i]; else cnTmp += ";"+cn[i];
			}				
			if (cnTmp == "") {
				hideProgress();
				return false;
			}				
			className = cnTmp;
			var params = "mode=loadMultiClass&className=" + className+"&param2="+param2;	
			usesHttp.open("POST", "uses.php", false);
			usesHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
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
			hideProgress();
			systemAPI.alert("Server Connection Failed :Error Loading Class "+className);			
		}
	}
};
//constanta
window.basicResourceId = 1;
window.bsNone = 0; //button Style
window.bsAuto = 1;
window.bsEllips = 2;
window.bsCheck = 3;
window.bsDate = 4;
window.bsUpload = 5;

window.bsNormal = 0;//border Style
window.bsDialog = 1;
window.bsHide = 2;
window.bsSingle = 3;
window.bsSizeToolWin = 4;

window.fsNormal = 0;
window.fsMDIForm = 1;
window.fsMDIChild = 2;
window.fsStayOnTop = 3;

window.tbAllFalse = 0;
window.tbSimpan = 1;
window.tbUbahHapus = 2;
window.tbHapus = 3;
window.tbUbah = 4;
window.tbAllTrue = 5;
window.tbSimpanHapus = 6;

window.vtList = 0;
window.vtTail = 1;
window.vtIcon = 2;
window.vtLargeIcon = 3;

window.cfText = 0;
window.cfNumeric = 1;
window.cfNilai = 2;
window.cfDate = 3;
window.cfHurufBesar = 4;
window.cfBoolean = 5;
window.cfButton = 6;
window.cfUpload = 7;

window.ttNormal = 0;
window.ttNilai = 1;
window.ttAngka = 2;
window.ttHurufBesar = 3;

window.mrOk = 1;
window.mrCancel = 2;

window.dateTimeFormat = "dd/mm/yyyy";
window.decimalSeparator = ",";
window.thousandSeparator = ".";
window.alLeft = "left";
window.alRight = "right";
window.alCenter = "center";
window.monthName = new Array("Januari","Febuari","Maret","April","Mai","Juni","Juli", "Agustus","September","Oktober","November", "Desember");

function setTipeButton(tipeButton){
	switch(tipeButton){
		case tbAllFalse :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
		case tbAllTrue :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbSimpan :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
		case tbUbahHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbSimpanHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;	
		case tbUbah :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
			
	}
};
//*********************************************************
dayName = ["Sun","Mon","Tue","Wed","Thu","Fry","Sat"];
dayLocal = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
//********************************************
// HTTPRequest Object for uses function
if (document.all && !window.XMLHttpRequest) { 
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
}
if (document.all) // internet explorer
{  
	usesHttp = new XMLHttpRequest();
	httpObj = new XMLHttpRequest();	
}
else // all other browser
{
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
}
window.xhrRSS = new XMLHttpRequest();
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
var systemAPI = {
		systemRect: function(){
			var r = {left: window.pageCnv.style.left, top : window.pageCnv.style.top, width: window.pageCnv.offsetWidth, height: window.pageCnv.offsetHeight};			
			return r;
		},
		hide : function(restartApp){
			var dbg = $("systemMsg");			
			dbg.style.display = "none";
			if (restartApp){
			     system.restart();
            }
		},
		alert: function(message, info, restartApp){			
			info = info === undefined ? "" : info;
			var lastMsg = "";
			var msg = $("systemMsg");			
			var msgBg = $("msgBg");			
			var msgHeader = $("msgHeader");			
			var msgText = $("msgTxt");			
			if (msg.style.display == ""){						
				lastMsg = document.all ? msgText.innerText : msgText.textContent;				
				lastMsg = lastMsg.replace("Ok","<br>");
			}
			msgText.style.overflow= "";
			var rect = this.systemRect();			
			msg.style.display = "";						
            msgText.innerHTML = lastMsg +message +"<br>"+info+(restartApp?"<i>Press [Ok] to restart</i>":"")+"<br>";			
			var btnHtml = "<br><button id='sysbtn' style='width:80;height:20' onclick='systemAPI.hide("+restartApp+");' >Ok</button>";
			if ( msgText.offsetHeight > rect.height){
				msgText.style.height = rect.height;
				msgText.style.overflow= "hidden";
				btnHtml = "<br><button id='sysbtn'  style='top:"+(rect.height - 50)+";width:80;height:20' onclick='systemAPI.hide();' >Ok</button>";				
			}
			if ( msgText.offsetWidth > rect.width){
				msgText.style.width = rect.width;
				msgText.style.overflow= "hidden";				
			}
			msgText.innerHTML += btnHtml;			
			msgText.style.top = rect.height / 2 - msgText.offsetHeight / 2; 
			msgText.style.left = rect.width / 2 - msgText.offsetWidth / 2;	
			msgHeader.style.border = "1px solid #bd0000";
			msgHeader.style.background = "#8d1212";
			msgHeader.style.top = parseInt(msgText.style.top) - 25;
			msgHeader.style.left = msgText.style.left;
			msgHeader.style.width = msgText.offsetWidth;
			//if (color !== undefined)
            {
			    msgBg.style.background = "#740c0c"; 
			    msgText.style.background = "#a93434";
                msgText.style.border = "1px solid #bd0000";//
            }
			var btn = $("sysbtn");
			btn.focus();
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
			name: BrowserDetect.browser,
			version: BrowserDetect.version,
			OS: BrowserDetect.OS
		},
		about:{
			version: "1.00",
			build: "Mei 2009",
			codeName: "jamboo"
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
function getURL(site, doRequestReady){	
	try{		
		xhrRSS.onreadystatechange = doRequestReady;
		xhrRSS.open("GET", "urlReader.php?url="+site);				
		xhrRSS.send("");																	
	}catch(e){
		systemAPI.alert(e);
	}
};
function deleteByObj(dataArray, obj){
	var tmp = [];
	for (var i in dataArray){
		if (dataArray[i] != obj)
			tmp[tmp.length] = dataArray[i];
	}
	return tmp;
};
function deleteByIndex(dataArray, index){
	var tmp = [];
	for (var i in dataArray){
		if (i != index)
			tmp[tmp.length] = dataArray[i];
	}
	return tmp;
};
function showProgress(text){
	if (text === undefined) text = "Request...";
	window.loadingText.innerHTML = text;
	window.loading.style.display = "";
};
function hideProgress(){
	window.loadingText.innerHTML = "";
	window.loading.style.display = "none";
};
function delay(interval){
	var date = new Date();
	var curDate = null; 
	do { curDate = new Date(); } 
	while(curDate-date < interval);
};
// convert the color to rgb from hex //
function colorConv(color) {
  var rgb = [parseInt(color.substring(0,2),16), 
    parseInt(color.substring(2,4),16), 
    parseInt(color.substring(4,6),16)];
  return rgb;
};
function colorFade(target,element,start,end,steps,speed, callback) {
	var startrgb,endrgb,er,eg,eb,step,rint,gint,bint,step;	
	steps = steps || 20;
	speed = speed || 20;
	clearInterval(target.timer);
	endrgb = colorConv(end);
	er = endrgb[0];
	eg = endrgb[1];
	eb = endrgb[2];
	if(!target.r) {
		startrgb = colorConv(start);
		r = startrgb[0];
		g = startrgb[1];
		b = startrgb[2];
		target.r = r;
		target.g = g;
		target.b = b;
	}
	rint = Math.round(Math.abs(target.r-er)/steps);
	gint = Math.round(Math.abs(target.g-eg)/steps);
	bint = Math.round(Math.abs(target.b-eb)/steps);
	if(rint == 0) { rint = 1 }
	if(gint == 0) { gint = 1 }
	if(bint == 0) { bint = 1 }
	target.step = 1;
	target.timer = setInterval( function() { animateColor(target,element,steps,er,eg,eb,rint,gint,bint,callback) }, speed);
};
function animateColor(target,element,steps,er,eg,eb,rint,gint,bint,callback) {  
  var color;  
  if(target.step <= steps) {
    var r = target.r;
    var g = target.g;
    var b = target.b;
    if(r >= er) {
      r = r - rint;
    } else {
      r = parseInt(r) + parseInt(rint);
    }
    if(g >= eg) {
      g = g - gint;
    } else {
      g = parseInt(g) + parseInt(gint);
    }
    if(b >= eb) {
      b = b - bint;
    } else {
      b = parseInt(b) + parseInt(bint);
    }
    color = 'rgb(' + r + ',' + g + ',' + b + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
    target.r = r;
    target.g = g;
    target.b = b;
    target.step = target.step + 1;
  } else {
    clearInterval(target.timer);
    color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
    if (callback !== undefined) callback();
  }
};
function urldecode(str) {
	var encoded = str;
	return decodeURIComponent(encoded.replace(/\+/g,  " "));
};

function urlencode(str){
	try{
	//if (replaceCharArray == undefined)
	{
	   replaceCharArray = [];
	   	   
	   replaceCharArray["%"] = "%25";
	   replaceCharArray["\r"] = "%0D";
	   replaceCharArray["\n"] = "%0A";
	   replaceCharArray["+"] = "%2B";
	   replaceCharArray[" "] = "+";
	   replaceCharArray["!"] = "%21";
	   replaceCharArray['"'] = "%22";
	   replaceCharArray["#"] = "%23";
	   replaceCharArray["$"] = "%24";
	   replaceCharArray["&"] = "%26";
	   replaceCharArray["'"] = "%27";
	   replaceCharArray["("] = "%28";
	   replaceCharArray[")"] = "%29";
	   replaceCharArray["*"] = "%2A";
	   replaceCharArray[","] = "%2C";
	   replaceCharArray["/"] = "%2F";
	   replaceCharArray[":"] = "%3A";
	   replaceCharArray[";"] = "%3B";
	   replaceCharArray["<"] = "%3C";
	   replaceCharArray["="] = "%3D";
	   replaceCharArray[">"] = "%3E";
	   replaceCharArray["?"] = "%3F";
	   replaceCharArray["@"] = "%40";
	   replaceCharArray["["] = "%5B";
	   replaceCharArray['\\'] = "%5C";
	   replaceCharArray["]"] = "%5D";
	   replaceCharArray["^"] = "%5E";
	   replaceCharArray["`"] = "%60";
	   replaceCharArray["{"] = "%7B";
	   replaceCharArray["|"] = "%7C";
	   replaceCharArray["}"] = "%7D";
	   replaceCharArray["~"] = "%7E";
	}
	
	if (typeof(str) == "string")
    {
        var result = [];
        var lgt = str.length;
            
        var nowChar = "";
        var replaceStr = undefined;
            
        for (var i = 0; i < lgt; i++)
        {
            nowChar = str.charAt(i);
            
            replaceStr = replaceCharArray[nowChar];
                
            if (replaceStr != undefined)
                result.push(replaceStr);
            else                 
                result.push(nowChar);
        }
            
	    return result.join("");
	}
	else
        return str;
	}catch(e){
		systemAPI.alert(e);
	}
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

function findPos(form, obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent != form?obj.offsetParent:undefined) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
};
window.ptStartOfPeriod = 0;
window.ptEndOfPeriod = 1;
function Compound(R, N){
  var result = Math.pow(1.0 + R, N);
  return result;
};
function Annuity2(R, N, PaymentTime,CompoundRN){
  var result;
  if (R == 0.0 ){
    CompoundRN = 1.0;
    result = N;
  }else{    
    if (Math.abs(R) < 6.1E-5){
      CompoundRN = Math.exp(N * Math.LN10(R));
      result = N*(1+(N-1)*R/2);
    }else{
      CompoundRN = Compound(R, N);
      result = (CompoundRN-1) / R;
    }
    if (PaymentTime == ptStartOfPeriod)
      result = result * (1 + R);
  }  
  return round_decimals(result, 2);
};
function payment2(Rate, NPeriods, FutureValue, PaymentTime){  
	var result = Annuity2(Rate, NPeriods, PaymentTime, 0);
	result = FutureValue / result;
	return result;	
};
function payment(PV, IR, NP) {//endOfPeriode
  var PMT = (PV * IR) / (1 - Math.pow(1 + IR, -NP));
  return round_decimals(PMT, 2);
};
function calculate(pv,rate, nper){//startOfPeriode
  var numerator = pv * Math.pow((1 + rate),nper);
  var denomFracNum = Math.pow((1 + rate), nper + 1) - 1;
  var denominator = denomFracNum/rate - 1;

  var realAnswer = numerator/denominator;
  return realAnswer;
};
function annuity(rate, sisa, lama, plafon) {
	try{
		var ret= "{";
		var angs = Math.round(payment(plafon, rate,lama));
		var totAm = 0;
		var totMargin = 0;
		var pokok = 0;
		var sawal = plafon;
		var margin = 0;
		for (var i = 0;i < sisa; i++){
			pokok = Math.round(calculate(sawal,rate,lama - i));	
		    sawal -= pokok;
		    totAm += pokok;
		    margin = angs - pokok;
		    totMargin += margin;
		}  
		ret = "{pokok: "+pokok+","+
				"margin: "+margin+","+
				"totPayment: "+totAm+","+
				"totMargin: "+totMargin+","+
				"payment:"+angs+" "+
				"}";
		return ret;
	}catch(e){
		systemAPI.alert("annuity:"+e);
	}
};

function round_decimals(original_number, decimals) {
  var result1 = original_number * Math.pow(10, decimals);
  var result2 = Math.round(result1);
  var result3 = result2 / Math.pow(10, decimals);
  return (result3);
};

function terbilang(bilangan) {
	  var angka = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
	  var kata = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan'];
	  var tingkat = ['','Ribu','Juta','Milyar','Triliun'];
      var kalimat = "";  
	  var panjang_bilangan = bilangan.length;
	  /* pengujian panjang bilangan */
	  if (panjang_bilangan > 15) {
	    kalimat = "Diluar Batas";
	    return kalimat;
	  }

	  /* mengambil angka-angka yang ada dalam bilangan,
	     dimasukkan ke dalam array */
	  for (var i = 1; i <= panjang_bilangan; i++) {
	    angka[i] = bilangan.substr(-i,1);
	  } 
	  var i = 1;
	  var j = 0;
	  var subkalimat,kata1,kata2,kata3;
	  kalimat = "";
	  /* mulai proses iterasi terhadap array angka */
	  while (i <= panjang_bilangan) {
	    subkalimat = "";
	    kata1 = "";
	    kata2 = "";
	    kata3 = "";
	    /* untuk ratusan */
	    if (angka[i+2] != "0") {
	      if (angka[i+2] == "1") {
	        kata1 = " Seratus";
	      } else {
	        kata1 = kata[angka[i+2]] + " Ratus";
	      }
	    }

	    /* untuk puluhan atau belasan */
	    if (angka[i+1] != "0") {
	      if (angka[i+1] == "1") {
	        if (angka[i] == "0") {
	          kata2 = "Sepuluh";
	        } else if (angka[i] == "1") {
	          kata2 = "Sebelas";
	        } else {
	          kata2 = kata[angka[i]] + " Belas";
	        }
	      } else {
	        kata2 = kata[angka[i+1]] + " Puluh";
	      }
	    }

	    /* untuk satuan */
	    if (angka[i] != "0") {
	      if (angka[i+1] != "1") {
	        kata3 = kata[angka[i]];
	      }
	    }

	    /* pengujian angka apakah tidak nol semua,
	       lalu ditambahkan tingkat */
	    if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
	       subkalimat = kata1 + " "+kata2 + " "+kata3 +"  "+tingkat[j];
	    }
	    /* gabungkan variabe sub kalimat (untuk satu blok 3 angka)
	       ke variabel kalimat */
	    kalimat = subkalimat + kalimat;
	    i = i + 3;
	    j = j + 1;

	  }

	  /* mengganti satu ribu jadi seribu jika diperlukan */
	  if ((angka[5] == "0") && (angka[6] == "0")) {
	       kalimat = kalimat.replace("Satu  Ribu","Seribu");
	  }
	  kalimat=kalimat + " Rupiah";
	  return trim(kalimat);
};
