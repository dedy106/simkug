//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_number = function(){
	parent.constructor.call(this);
	this.className = "util_number";
};
window.util_number.extend(window.Function);
window.util_number.implement({
	stopRKey: function(evt){ 
	  var evt = (evt) ? evt : ((event) ? event : null); 
	  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
	  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
	}, 
	blockNonNumbers: function(event){	
		try
		{
			var key;
			var isCtrl = false;
			var keychar;
			var reg;
			var allowDecimal = true;
			e = event;
			var obj = (event.srcElement) ? event.srcElement : event.originalTarget;
			if(window.event) {
				key = e.keyCode;
				isCtrl = window.event.ctrlKey
			}
			else if(e.which) {		
				key = e.which;
				isCtrl = e.ctrlKey;
			}

			if (isNaN(key)) return true; 
			// check for backspace or delete, or if Ctrl was pressed
			if (key == 8 || isCtrl)	return true;

			 keychar = String.fromCharCode(key);
				
			 reg = /\d/;
			 var isFirstN = true ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
			 var isFirstD = true ? keychar == '.' && obj.value.indexOf('.') == -1 : false;

			 return reg.test(keychar);
		}catch(e)
		{
			alert(e);
		}
	},
	Numbers : function(event){
		if (event == null) event = window.event;
		var keynum;
		var keychar;
		var numcheck;
		if(window.event) // IE
		{
		keynum = event.keyCode;
		}
		else if(event.which) // Netscape/Firefox/Opera
		{
		keynum = event.which;
		}
		
		if (keynum == 8 || keynum == 46 || keynum == 37 || keynum == 38 || keynum == 39 || keynum == 40) 
		{
			event.returnValue = true;
		}
		else {
			keychar = String.fromCharCode(keynum);
			numcheck = /\d/;
			var isFirstN = true ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
			var isFirstD = true ? keychar == '.' && obj.value.indexOf('.') == -1 : false;
			//return isFirstN || isFirstD || numcheck.test(keychar);
		
			if (isFirstN || isFirstD || (keynum>=48 && keynum<=57)) 	
			{ 	  
			  event.returnValue = true;				
			} else
			{	  
			  event.keycode=0;  
			  event.returnValue = false;	
			  return false;
			  event.which = 0;	
			}
		
		}
	},
	Numbers2 : function(event,inputid){
		var edit = (event.srcElement) ? event.srcElement : event.originalTarget;
		if (edit.id != inputid) return event.returnValue = true;
		
		if (event == null) event = window.event;
		var keynum;
		var keychar;
		var numcheck;
		if(window.event) // IE
		{
		keynum = event.keyCode;
		}
		else if(event.which) // Netscape/Firefox/Opera
		{
		keynum = event.which;
		}
		
		if (keynum == 8 || keynum == 46 || keynum == 37 || keynum == 38 || keynum == 39 || keynum == 40||  event.keyCode == 9 ) 
		{
			event.returnValue = true;
			return true;
		}
		else {
			keychar = String.fromCharCode(keynum);
			numcheck = /\d/;
			var isFirstN = true ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
			var isFirstD = true ? keychar == '.' && obj.value.indexOf('.') == -1 : false;
			//return isFirstN || isFirstD || numcheck.test(keychar);
		
			if (isFirstN || isFirstD || (keynum>=48 && keynum<=57)) 	
			{ 	  
			  event.returnValue = true;
			  return true;				
			} else
			{	  
			  event.keycode=0;  
			  event.returnValue = false;	
			  return false;
			  event.which = 0;	
			}
		}
	},
	getPos: function(obj){
		obj.focus();
		var workRange=document.selection.createRange();
		obj.select();
		var allRange=document.selection.createRange();
		workRange.setEndPoint("StartToStart",allRange);
		var len=workRange.text.length;
		workRange.collapse(false);
		workRange.select();
		return len;
	},
	setCursor: function(id,num){
		obj = id;
		range=obj.createTextRange(); 
		range.collapse(true); 
		range.moveStart('character',num); 
		range.select();
	},
	Remove : function(str){
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
	},
	RemoveSep: function(event) {
	  if (event == null) event = window.event;
	  var edit = (event.srcElement) ? event.srcElement : event.originalTarget;
	  var num = edit.value;
	  var numtmp ="";
	  var i;
	  for (i=0;i<num.length;i++)
	   {    
	    if (num.charAt(i) != ".")
	         numtmp += num.charAt(i); 
	   }

	  edit.value = numtmp;
	  var nCursorPos = edit.value.length;
	  this.setCursor(edit,nCursorPos);
	},
	parseNilai: function(value){
		//2.000.000,34 -> 2000000.34 => untuk save ke table  atau olahan	
		var nilai = String(this.Remove(value));
		nilai = nilai.replace(",",".");
		
		return nilai;
	},
	decToFloat: function(value){
		//2000,56 -> 2000.56 -> untuk olah data aritmatika
		var nilai = value.toString();
		nilai = nilai.replace(",",".");
		return nilai;
	},
	floatToDec: function(value){
		//2000.56 -> 2000,56 -> untuk komponen
		var nilai = value.toString();
		nilai = nilai.replace(".",",");
		return nilai;
	},
	floatToNilai: function(value){
		//2000.56 -> 2.000,56 -> untuk komponen
		var nilai = this.floatToDec(value);
		nilai = this.decToNilai(nilai);
		return nilai;
	},
	nilaiToFloat: function(value){
		//2.000,25 -> 2000.25
		var nilai = this.nilaiToDec(value);
		nilai = this.decToFloat(nilai);
		return parseFloat(nilai);
	},
	nilaiToDec: function(value){
		//2.000.000,35 -> 2000000,35 
		var nilai = String(this.Remove(value));
		return nilai;
	},
	decToNilai: function(value){
		//2000000,35 -> 2.000.000,35 
		var nilai = this.strToNilai(value);
		return nilai;
	},
	strToNilai: function(value) {
	  //if (value.indexOf(".") != -1)
	    //value = value.replace(".",",");    
	  if (typeof value != "string") value = value.toString();
	  var isMin = value.search("-") != -1 ? true : false;
	  if (isMin)  
		value = value.replace("-","");
	  var decpoint = ',';
	  var sep = '.';
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
	},
	strToFloat: function (data) {
	    var nilai = String(this.Remove(data));
		nilai = nilai.replace(",",".");//alert(nilai +" "+data);
		return nilai;
	},
	KeyUpEvent: function (event) {
	  if (event == null) event = window.event;
	  var edit = (event.srcElement) ? event.srcElement : event.originalTarget;
	  var decpoint = ',';
	  var sep = '.';
	  var isExit = 0;
	  var num = edit.value;
	  
	  var numtmp ="";
	  var i;
	  
	  for (i=0;i<num.length;i++)
	   {     
	    if (num.charAt(i) != ".")
	         numtmp += num.charAt(i); 
	   }
	  var nCursorPos = numtmp.length;
	  if (isExit) this.setCursor(edit,nCursorPos);

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
	  edit.value = x;
	},
	BlurEvent: function(event) {
	  if (event == null) event = window.event;
	  var edit = (event.srcElement) ? event.srcElement : event.originalTarget;
	  var decpoint = ',';
	  var sep = '.';
	  var isExit = 0;
	  var num = edit.value;
	  
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
	  edit.value = x;	  
	}
});
