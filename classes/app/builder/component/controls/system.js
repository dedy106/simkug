//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_system = function(){	
	try
	{
		var step = "page form";
		this.finishInit = false;		
		var pg = $("system");					
		this.width = parseInt(pg.offsetWidth);
		this.height = parseInt(pg.offsetHeight);		
		this.screenWidth = parseInt(pg.offsetWidth);
		this.screenHeight = parseInt(pg.offsetHeight);				
		this.systemCanvas = pg;		
		step = "create  object";				
		window.app_builder_component_controls_system.prototype.parent.constructor.call(this,"system");
		this.className = "portalui_system";					
		step = "init variabel object";				
		uses("portalui_commonForm;portalui_toolTip;portalui_arrayList");		
		this.resourceList = new portalui_arrayMap();		
		this.formList = new portalui_arrayMap();		
		this.mouseListenerList = new portalui_arrayMap();
		this.configList = new portalui_arrayMap();
		this.userConfigList = new portalui_arrayMap();		
		this.applicationList = new portalui_arrayMap();								
		this.buttonState = new portalui_buttonState();
		this.themes = "dynpro";
		this.color = "#90AFBF";		
		this.isMouseDown = false;		
		this.nextZIndex = 100;
		this.nextResourceId = 1000;
		this.mouseX = 0;
		this.mouseY = 0;					
		this.activeApplication=undefined;		
		this.count = 0;			
		step = "init event";				
		window.onresize = new Function("event", "system.eventScreenResize(event); return false;"); 		
		if (document.all){
			document.onkeydown = new Function("return system.eventKeyDown(event);");
			document.onkeyup = new Function("system.eventKeyUp(event); return false;"); 				
			document.onmousedown = new Function("system.eventMouseDown(event);"); 
			document.onmousemove = new Function("system.eventMouseMove(event);"); 
			document.onmouseup = new Function("system.eventMouseUp(event);"); 						
		}else{
			document.onkeydown = new Function("event","return system.eventKeyDown(event);");
			document.onkeyup = new Function("event","system.eventKeyUp(event); return false;"); 				
			document.onmousedown = new Function("event","system.eventMouseDown(event);"); 
			document.onmousemove = new Function("event","system.eventMouseMove(event);"); 
			document.onmouseup = new Function("event","system.eventMouseUp(event);"); 						
		}		
		document.oncontextmenu = this.eventContextMenu;				
		this.loadCfg();		
		this.charCode = [];
		this.charCode[32] = " ";
		this.charCode[33] = "!";
		this.charCode[34] = "\"";
		this.charCode[35] = "#";
		this.charCode[36] = "$";
		this.charCode[37] = "%";
		this.charCode[38] = "&";
		this.charCode[39] = "'";
		this.charCode[40] = "(";
		this.charCode[41] = ")";
		this.charCode[42] = "*";
		this.charCode[43] = "+";
		this.charCode[44] = ",";
		this.charCode[45] = "-";
		this.charCode[46] = ".";
		this.charCode[47] = "/";
		this.charCode[48] = "0";
		this.charCode[49] = "1";
		this.charCode[50] = "2";
		this.charCode[51] = "3";
		this.charCode[52] = "4";
		this.charCode[53] = "5";
		this.charCode[54] = "6";
		this.charCode[55] = "7";
		this.charCode[56] = "8";
		this.charCode[57] = "9";
		this.charCode[58] = ":";
		this.charCode[59] = ";";
		this.charCode[60] = "<";
		this.charCode[61] = "=";
		this.charCode[62] = ">";
		this.charCode[63] = "?";
		this.charCode[64] = "@";
		this.charCode[65] = "A";
		this.charCode[66] = "B";
		this.charCode[67] = "C";
		this.charCode[68] = "D";
		this.charCode[69] = "E";
		this.charCode[70] = "F";
		this.charCode[71] = "G";
		this.charCode[72] = "H";
		this.charCode[73] = "I";
		this.charCode[74] = "J";
		this.charCode[75] = "K";
		this.charCode[76] = "L";
		this.charCode[77] = "M";
		this.charCode[78] = "N";
		this.charCode[79] = "O";
		this.charCode[80] = "P";
		this.charCode[81] = "Q";
		this.charCode[82] = "R";
		this.charCode[83] = "S";
		this.charCode[84] = "T";
		this.charCode[85] = "U";
		this.charCode[86] = "V";
		this.charCode[87] = "W";
		this.charCode[88] = "X";
		this.charCode[89] = "Y";
		this.charCode[90] = "Z";
		this.charCode[91] = "[";
		this.charCode[92] = "\\";
		this.charCode[93] = "]";
		this.charCode[94] = "^";
		this.charCode[95] = "_";
		this.charCode[96] = "`";
		this.charCode[97] = "a";
		this.charCode[98] = "b";
		this.charCode[99] = "c";
		this.charCode[100] = "d";
		this.charCode[101] = "e";
		this.charCode[102] = "f";
		this.charCode[103] = "g";
		this.charCode[104] = "h";
		this.charCode[105] = "i";
		this.charCode[106] = "j";
		this.charCode[107] = "k";
		this.charCode[108] = "l";
		this.charCode[109] = "m";
		this.charCode[110] = "n";
		this.charCode[111] = "o";
		this.charCode[112] = "p";
		this.charCode[113] = "q";
		this.charCode[114] = "r";
		this.charCode[115] = "s";
		this.charCode[116] = "t";
		this.charCode[117] = "u";
		this.charCode[118] = "v";
		this.charCode[119] = "w";
		this.charCode[120] = "x";
		this.charCode[121] = "y";
		this.charCode[122] = "z";
		this.charCode[123] = "{";
		this.charCode[124] = "|";
		this.charCode[125] = "}";
		this.charCode[126] = "~";
		
		this.KEY_ENTER = 13;
		this.KEY_ESC = 27;
		this.KEY_BACK = 8;
		this.KEY_TAB = 9;
		this.finishInit = true;
	}catch(e)
	{
		systemAPI.alert("[system]::constructor:"+step,e);
	}
};
window.app_builder_component_controls_system.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_system.implement({
	init: function(app){
		try	
		{									
			script = "uses('server_RemoteObject;util_Connection;"+app+"');";					
			script += "this.connection = new util_Connection('server/serverApp.php',true);";
			script += "var app = new "+app+"(this);";
			eval(script);
			app.run();			
		}catch(e)
		{
			systemAPI.alert("[system]::init: "+ e,"");
		}	
	},
	getColor: function(){
		return this.color;
	},
	setColor: function(data){
		this.color = data;
		this.systemCanvas.style.background = data;
	},
	addResource: function(object){
	    var result = this.getResourceId();
	    this.resourceList.set(result,object);
	    return result;
	},
	delResource: function(resourceId){
	    var app = this.applicationList.get(resourceId);
	    if (app != undefined)
	        this.applicationList.del(resourceId);       
	    this.resourceList.del(resourceId);
	},
	getResource: function(resourceId){
		var result = this.resourceList.get(resourceId);
		//if (result == undefined) alert(resourceId);
		return result;
	},
	getResourceId: function(){
	    var result = this.nextResourceId;
	    this.nextResourceId++;    
	    return result;
	},
	getNextZIndex: function(){
	    var result = this.nextZIndex;
	    this.nextZIndex++;    
	    return result;
	},
	getScreenWidth: function(){
		return this.screenWidth;
	},
	getMouseX: function(){
		return this.mouseX;
	},
	setMouseX: function(data){
		this.mouseX = data;
	},
	getMouseY: function(){
		return this.mouseY;	
	},
	setMouseY: function(data){
		this.mouseY = data;
	},
	getScreenHeight: function(){
		return this.screenHeight;
	},
	eventContextMenu: function(event){
		return false;
	},
	doExit: function(sender){
	    if (this.activeApplication instanceof portalui_application)
	        this.activeApplication.doExit(sender);	
	},
	eventKeyDown: function(event){
		try
		{						
			var keyCode = event.keyCode;					
			if ((keyCode == 33 || keyCode == 34))
				return false;
			if ((keyCode == 32 || keyCode == 33 || keyCode == 34) && event.target.id.toLowerCase().search("swf") == -1 && (event.target.id.toLowerCase().search("edit") == -1 && (event.target.id.search("input") == -1 || event.target.id.search("textarea") == -1)))
					return false;
			this.buttonState.set(event);
			var charCode = undefined;
			charCode = this.charCode[event.keyCode];						
			keyCode = event.keyCode;								
			if (this.activeApplication instanceof portalui_application)
				return this.activeApplication.doKeyDown(charCode, this.buttonState, keyCode,event);
			else return true;
		}catch(e)
		{		
			systemAPI.alert("[page] :: eventKeyDown : " + e +"\r\n"+this.activeApplication,event);		
			return true;
		}						
	},
	eventKeyUp: function(event){		
		try{
			this.buttonState.set(event);
		    if (this.activeApplication instanceof portalui_application)
		            this.activeApplication.doKeyUp(event.keyCode, this.buttonState);	    
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	eventKeyPress: function(event){
		try
		{			
			this.buttonState.set(event);
			var charCode = undefined;
			if (document.all)
				charCode = this.charCode[event.keyCode];
			else
				charCode = this.charCode[event.charCode];
			if (document.all)
				keyCode = event.keyCode;
			else
				keyCode = event.which;				
			{						
				if (this.activeApplication instanceof portalui_application)
					this.activeApplication.doKeyPress(charCode, this.buttonState, keyCode);
			}
		}catch(e)
		{
			systemAPI.alert("[page] :: eventKeyPress : " + e +"\r\n"+this.activeApplication,"");
		}
	},
	eventMouseDown: function(event){		
		try{
		    var obj = undefined;   		
		    this.mouseX = event.clientX;
		    this.mouseY = event.clientY;    
		    var button = this.getButton(event);    
			var target = document.all || window.opera ? event.srcElement : event.target;		
		    var tmpArray = [];    
		    for (var i in this.mouseListenerList.objList)    
		        tmpArray[i] = i;        
		    for (var i in tmpArray)
		    {
		        obj = this.getResource(i);        
		        if (obj instanceof portalui_control)
		            obj.doSysMouseDown(this.mouseX, this.mouseY, button, target);
		    }		
			if (button ==  2){//right Click
				var obj = document.all?event.srcElement : event.target;		
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	eventMouseMove: function(event){
		try{			
		    var obj = undefined;			
		    this.mouseX = event.clientX;
		    this.mouseY = event.clientY;	    
		    var button = this.getButton(event);
		    this.buttonState.set(event);
			var target = document.all || window.opera ?event.srcElement : event.target;		
		    var tmpArray = [];
		    for (var i in this.mouseListenerList.objList)tmpArray[i] = i;	    
		    for (var i in tmpArray)
		    {
		        obj = this.getResource(i);
		        if (obj instanceof portalui_control)
		            obj.doSysMouseMove(this.mouseX, this.mouseY, button, this.buttonState, target);
		    }
		}catch(e){	
			systemAPI.alert(e);
		}
	},
	eventMouseUp: function(event){		
		try{
		    var obj = undefined;    
		    this.mouseX = event.clientX;
		    this.mouseY = event.clientY;
		    var button = this.getButton(event);
			var target = document.all || window.opera ?event.srcElement : event.target;		
		    this.buttonState.set(event);
		    var tmpArray = [];
		    for (var i in this.mouseListenerList.objList)
		        tmpArray[i] = i;    
		    for (var i in tmpArray)
		    {
		        obj = this.getResource(i);
		        if (obj instanceof portalui_control)
		            obj.doSysMouseUp(this.mouseX, this.mouseY, button, this.buttonState,target);
		    }
		}catch(e){
			systemAPI.alert(e);
		}
	},
	eventScreenResize: function(event){		
	    var node = $("system");
	    if (node != undefined)
	    {
	        this.width = node.offsetWidth;
	        this.height = node.offsetHeight;       
			this.screenHeight = node.offsetHeight;
			this.screenWidth = node.offsetWidth;			
			var app = this.activeApplication;		
			if (app instanceof portalui_application){			
				if (app.activeForm.isMaximized)				
					app.doScreenResize(this.width, this.height);
			}		
	    }	
	},
	reSize: function(width, height){	
	    var node = $("system");
	    if (node != undefined)
	    {
	        this.width = width;
	        this.height = height;       
			node.style.width  = width;
			node.style.height  = height;
			var app = this.activeApplication;		
			if (app instanceof portalui_application)
				app.doScreenResize(this.width, this.height);
	    }	
	},
	showHint: function(x, y, caption){	
	    //this.hintForm.show(x, y, caption);	
	},
	hideHint: function(){
		//this.hintForm.hide();	
	},
	showToolTip: function(x, y, caption){
		if (this.activeApplication.toolTip === undefined ){
			uses("portalui_toolTip");
			this.activeApplication.toolTip = new portalui_toolTip(this.activeApplication);			
			this.activeApplication.toolTip.show(x, y, caption, 1);
		}else this.activeApplication.toolTip.show(x, y, caption, 1);
	},
	hideToolTip: function(){
		if (this.activeApplication.toolTip !== undefined)
			this.activeApplication.toolTip.hide();
	},
	showProgress: function(text){
		showProgress(text);		
	},
	hideProgress: function(){
		hideProgress();			
	},
	getFullId: function(){
		return "system";
	},
	loadCfg: function(){
	    try
	    {
	       var step = "init";
	        this.configList.objList = [];		
	        usesHttp.open("GET", "image/themes/"+this.getThemes()+"/themes.conf", false);
	        usesHttp.send("");
	        if (usesHttp.status == 200)
	        {            
				var data = usesHttp.responseText;			
				step = "split";
	            var row = "";						
	            var lines = data.split("\n");			
	            var configPair = "";
	            step = "repeat";			
	            for (var i=0; i < lines.length;i++)
	            {
	                row = lines[i];				
	                step = "get line " + row;						
	                if ((row.charAt(0) != "#") && (row.indexOf("=") > 0))
	                {
	                    configPair = row.split("=");					
	                    this.configList.objList[configPair[0]] =  configPair[1];
	                }
	            }
	        }		
	    }catch(e)
		{
			systemAPI.alert("[page]:loadCfg:"+e+"\r\n"+step,"");
		}
	},
	getConfig: function(configName){		
		var result = this.configList.objList[configName];    
	    if (result == undefined)
	        result = "";       
		result = result.replace("\r\n","");
		result = result.replace("\n","");
		result = result.replace("\r","");
	    return result;
	},
	getUserConfig: function(configName){	
		var result = this.userConfigList.objList[configName];    
	    if (result == undefined)
	        result = "";        
	    return result;
	},
	addMouseListener: function(resource){	
	    if (resource instanceof portalui_control)	   
	        this.mouseListenerList.set(resource.getResourceId(),resource.getResourceId());	    
	},
	delMouseListener: function(resource){
	    if (resource instanceof portalui_control)    
	        this.mouseListenerList.del(resource.getResourceId());	 
	},
	getButton: function(event){
	    var result = undefined;
	    if (document.all) // IE	    
			result = (event.button == 1 || event.button == 2 ? event.button : 3);	        	    
	    else // Fire Fox	    
			result = (event.which == 1? event.button : (event.which == 2 ? 3: 2));	        	        	    
	    return result;
	},
	getActiveApplication: function(){
		return this.activeApplication;
	},
	setActiveApplication: function(app){
	    if ((app != this.activeApplication))
	    {
	        var oldApplication = this.activeApplication;
	        {            			
	            this.activeApplication = app;
	            if ((oldApplication != undefined)&&(oldApplication instanceof portalui_application))
					oldApplication.doDeactivate();								
	        } 
	    }		
	    if ((this.activeApplication instanceof portalui_application))
	        this.activeApplication.doActivate(oldApplication);		
	},
	closeAllMDIChild: function(){
		var appChild = this.activeApplication.activeForm.childs;
		var res = undefined;
		for (var i in appChild.objList){
			res = system.getResource(appChild.objList[i]);		
			if (res instanceof portalui_childForm)		
	  			res.free();		
		}	
	},
	alert: function(sender, message, addInfo){		
		if (system.activeApplication != undefined) 
			system.activeApplication.alert(message,addInfo);
		else alert(message +"\n"+addInfo);
	},
	confirm: function(sender,event, message, addInfo){
		system.activeApplication.confirm(sender,event, message, addInfo);
	},
	info: function(sender, message, addInfo){
		system.activeApplication.info(message,addInfo);
	},
	getThemes: function(){
		return this.themes;
	},
	logout: function(){	
		var app;
		for (var i in this.applicationList.objList){
			app = this.getResource(this.applicationList.objList[i]);			
			if (app.logout)
				app.logout();
		}				
	},
	restart:function(){
		this.logout();
		this.init(this.activeApplication.className);
	}
});