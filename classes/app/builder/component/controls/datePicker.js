//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_datePicker = function(owner, options){
    if (owner){
        var dt = new Date();
        this.day = dt.getDate();
        this.month = dt.getMonth() + 1;
        this.year = dt.getFullYear();
        this.lengthChar = 10;		
        this.readOnly = undefined;         
        this.shortMonthName = [];       
        this.shortMonthName["01"] = "Jan";
        this.shortMonthName["02"] = "Feb";
        this.shortMonthName["03"] = "Mar";
        this.shortMonthName["04"] = "Apr";
        this.shortMonthName["05"] = "May";
        this.shortMonthName["06"] = "Jun";
        this.shortMonthName["07"] = "Jul";
        this.shortMonthName["08"] = "Aug";
        this.shortMonthName["09"] = "Sep";
        this.shortMonthName["10"] = "Oct";
        this.shortMonthName["11"] = "Nov";
        this.shortMonthName["12"] = "Dec";        
        window.app_builder_component_controls_datePicker.prototype.parent.constructor.call(this, owner, options);
		this.className = "portalui_datePicker";
		this.owner = owner;
		this.setWidth(90);
        window.app_builder_component_controls_datePicker.prototype.parent.setHeight.call(this, 18);		
        this.onSelect = new portalui_eventHandler();        
        this.onKeyDown = new portalui_eventHandler();
        this.onKeyPress = new portalui_eventHandler();
		this.onChange = new portalui_eventHandler();
		this.onExit = new portalui_eventHandler();
		this.onEnter = new portalui_eventHandler();
			
		this.wantTab = false;
        this.tabStop = true;		
		this.addProperty({className:this.className,dateString:this.getDateString(),color:this.color,fontColor:this.fontColor, readOnly:this.readOnly, text:this.text, btnVisible:true});	
		this.addEvent({select:"",keyDown:"",keyPress:"",enter:"",exit:"",change:""});
    }
};
window.app_builder_component_controls_datePicker.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_datePicker.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
	    canvas.style.background = "#FFFFFF";
	    var month = this.month;
	    if (month < 10)
	        month = "0" + month;	        
	    var caption = this.day + "/" +month + "/" + this.year;
	    if (document.all)
	        html =  "<div id='" + n + "_frame' style='{position : absolute; left:0; top: 0; width: 100%; height: 100%;}' "+
	                ">"  +
					"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3}'>"+
					 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
					 	" position:absolute;left:0;top:-7;width:100%;height:8;}'></div>"+
					 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
					 	" position:absolute;left:-8;top:-8;width:8;height:37;}'></div>"+		
					 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
					 	" position:absolute;left:0;top:100%;width:100%;height:10;}'></div>"+				
					 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
					 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
	                "</div>"+
						"<input id='"+n+"_input' value='"+caption+"'  "+
							" style='{position:absolute; top:0; width:100%;height:18; "+
							" background:'"+system.getConfig("text.normalBgColor")+"';}' "+//border:#919B9B 1px solid;
							" onfocus='window.system.getResource("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return window.system.getResource("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='window.system.getResource("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='window.system.getResource("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='window.system.getResource("+this.resourceId+").eventMouseOver(event)' "+		
							" onmouseout='window.system.getResource("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='window.system.getResource("+this.resourceId+").doChange(event)' />"+					
	                    "<div id='" + n + "_button' style='{position: absolute; left: 100%;top: 0;width: 18;height: 18;cursor: pointer;background: url(icon/"+system.getThemes()+"/dpicker.png) no-repeat top left;}' onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event)' onMouseDown='window.system.getResource(" + this.resourceId + ").eventButtonMouseDown(event)' onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event)' onMouseUp='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event)' onClick='window.system.getResource(" + this.resourceId + ").eventButtonClick(event)'></div>"+ 
	                "</div>";
	    else
	        html =  "<div id='" + n + "_frame' style='{position : absolute; left: 0; top: 0; width: 100%; height: 100%;}'"+
	                ">" +	                
					"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3}'>"+
					 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
					 	" position:absolute;left:0;top:-7;width:100%;height:8;}'></div>"+
					 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
					 	" position:absolute;left:-8;top:-8;width:8;height:37;}'></div>"+		
					 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
					 	" position:absolute;left:0;top:100%;width:100%;height:10;}'></div>"+				
					 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
					 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
					 "</div>"+
						"<input id='"+n+"_input' value='"+caption+"'  "+
							" style='{position:absolute; top:0; width:100%;height:18; "+
							" background:'"+system.getConfig("text.normalBgColor")+"';}' "+//border:#919B9B 1px solid;
							" onfocus='window.system.getResource("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return window.system.getResource("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='window.system.getResource("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='window.system.getResource("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='window.system.getResource("+this.resourceId+").eventMouseOver(event)' "+		
							" onmouseout='window.system.getResource("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='window.system.getResource("+this.resourceId+").doChange(event)' />"+					
	                    "<div id='" + n + "_button' style='{position: absolute; left: 100%;top: 0;width: 18;height: 18;cursor: pointer;background: url(icon/"+system.getThemes()+"/dpicker.png) no-repeat top left;}' onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event)' onMouseDown='window.system.getResource(" + this.resourceId + ").eventButtonMouseDown(event)' onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event)' onMouseUp='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event)' onClick='window.system.getResource(" + this.resourceId + ").eventButtonClick(event)'></div>"+ 
	                "</div>";

	    this.setInnerHTML(html, canvas);
		this.input = $(n+"_input");
		this.button = $(n+"_button");
		this.shadow = $(n +"_shadow");
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
				var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");				
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			}		
	},
	setReadOnly: function(data){
		this.readOnly = data;
		this.setProperty("readOnly",data);
		this.input.readOnly = data;		
		this.input.style.background = data ? system.getConfig("text.disabled") : system.getConfig("text.normalBgColor");
		this.input.style.color = data ? system.getConfig("text.disabledFontColor") : system.getConfig("text.normalColor");
	},
	setBtnVisible: function(data){	
		this.button.style.display = data ? "":"none";
		this.setProperty("btnVisible",data);
	},
	pickerFormSelect: function(sender, yy, mm, dd){
	    this.setDate(yy, mm, dd);    
	    this.onSelect.call(this, yy, mm, dd);	
	},
	eventButtonClick: function(event){
		var app = this.getApplication();		
		if ((app.systemDatePickerForm != undefined) && (app.systemDatePickerForm.visible)){	 
		  	app.systemDatePickerForm.close();		
		} else{
			var x = event.clientX;
			var y = event.clientY;
			var canvas = this.getContainer();
			var width = canvas.offsetWidth;
		
			if (document.all || window.opera)
			{
				x = (x - event.offsetX) - width + 17;
				y = (y - event.offsetY) + 17;
			}
			else
			{
				x = (x - event.layerX) - width + 19;
				y = (y - event.layerY) + 18;
			}
					
			if (app.systemDatePickerForm == undefined)
				app.systemDatePickerForm = new portalui_datePickerForm(app);
			app.systemDatePickerForm.onSelect.set(this, "pickerFormSelect");
		
			app.systemDatePickerForm.setSelectedDate(this.year, this.month, this.day);
			var scrHeight = system.screenHeight;
			app.systemDatePickerForm.setLeft(x);
			if ((y + app.systemDatePickerForm.getHeight()) > scrHeight)
			{
				if (document.all)
					app.systemDatePickerForm.setTop(y - this.getHeight() - app.systemDatePickerForm.getHeight() + 1);
				else
					app.systemDatePickerForm.setTop(y - this.getHeight() - app.systemDatePickerForm.getHeight() - 1);
			}else
				app.systemDatePickerForm.setTop(y);
			app.systemDatePickerForm.bringToFront();
			app.systemDatePickerForm.show();
		}
	},
	eventMouseOver: function(event){    
		var input = this.input;
		if (input == undefined) return false;	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : system.getConfig("text.overBgColor");
		this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.overColor");
		
		this.shadow.style.display = "";
	},
	eventMouseOut: function(event){
	    var input = this.input;
		if (input == undefined) return false;
		if (this.isFocused)
			this.shadow.style.display = "";
		else
			this.shadow.style.display = "none";	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : system.getConfig("text.normalBgColor");
		this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.normalColor");
	},
	eventButtonMouseOver: function(event){
	    var htmlObj = $(this.getFullId() + "_button");
	    htmlObj.style.backgroundPosition = "center left";	
	},
	eventButtonMouseDown: function(event){
	    var htmlObj = $(this.getFullId() + "_button");
	    htmlObj.style.backgroundPosition = "bottom left";
	},
	eventButtonMouseOut: function(event){
	    var htmlObj = $(this.getFullId() + "_button");
	    htmlObj.style.backgroundPosition = "top left";	
	},
	doKeyDown: function(keyCode, buttonState){
		try{ 
		}catch(e){
			alert("[labelEdit]::doKeyDown:"+e+"\r\n"+keyCode);
		} 
	},
	doKeyPress: function(charCode, buttonState){	
	},
	setText: function(data){
		var input = $(this.getFullId() +"_input");
		if (input != undefined)
			input.value = data;
		this.setProperty("text",data);
		try{
	    if (data.search("/") != -1){
			var d = data.split("/");	        
		    var year = parseInt(d[2], 10);
		  	var month = parseInt(d[1], 10);
		  	var day = parseInt(d[0], 10);
		}else if (data.search("-") != -1){
			var d = data.split("-");	        
		    var year = parseInt(d[0], 10);
		  	var month = parseInt(d[1], 10);
		  	var day = parseInt(d[2], 10);
		}
	    if (month > 12)
			month = 12;
	  	this.setDate(year, month, day);		
	  }catch(e){
		alert("daetpicker:setText:"+e);
	  }  
	},
	getText: function(data){
	  var input = $(this.getFullId() +"_input");
	  var ret = this.day +"/"+this.month+"/"+this.year;  
	  if ((input != undefined) && (input != null))
			ret = input.value;
	  return ret;
	},
	setWidth: function(data){
		window.app_builder_component_controls_datePicker.prototype.parent.setWidth.call(this, data);
		var btn = $(this.getFullId() +"_button");
		if (btn != undefined)
			btn.style.left = data - 18;
	},
	getDate: function(){
	    var month = this.month;
	    if (month < 10)
	        month = "0" + month;        
	    var day = this.day;
	    if (day < 10)
	        day = "0" + day;	
	    return this.year + "-" + month + "-" + day;
	},
	getDateString: function(){
	    var month = this.month;
	    if (month < 10)
	        month = "0" + month;        
	    var day = this.day;
	    if (day < 10)
	        day = "0" + day;		
	    return this.year + "/" + month + "/" + day;
	},
	toSysDate: function(){      
		return new Date(this.year, this.month - 1, this.day);
	},
	setDate: function(yy, mm, dd){
	    this.year = yy;
	    this.month = mm;
	    this.day = dd;
	    
	    var month = this.month;
	    var day = this.day;
	    var year = this.year;
	    if (month < 10)
	        month = "0" + month;
	    if (day < 10)
	       day = "0" + day;
	    if (year < 10)
	        year = "200" + year;
	    else if (year < 100)
	        year = "20" + year;
	    this.year = parseInt(year,10);
	    //this.shortMonthName[month]
	    var caption = day + "/" +  month+ "/" + year;
		var input = $(this.getFullId() + "_input");
		if (input != undefined)
			input.value = caption;
	},
	setDateString: function(data){
	    // 2008-01-01
	    // 0123456789    
	    var year = parseInt(data.substring(0, 4), 10);
		var month = parseInt(data.substring(5, 7), 10);
		var day = parseInt(data.substring(8, 10), 10);
		this.setProperty("dateString",data);
		this.setDate(year, month, day);
		this.onSelect.call(this, year, month, day);
	},
	doSetFocus: function(){	
		var nd = $(this.getFullId()+"_input");
		if (nd != undefined)
			nd.focus();
		this.isFocused = true;	
		this.shadow.style.display = "";
	},
	doLostFocus: function(){      
		try{
		    var data = this.getText();	
		    var d = data.split("/");
		        
		    var year = parseInt(d[2], 10);
		  	var month = parseInt(d[1], 10);
		  	var day = parseInt(d[0], 10);
		    if (month > 12)
		      month = 12;
		  	this.setDate(year, month, day);
		}catch(e){
		    alert("datePicker:doLostFocus:"+e);
		}
		this.isFocused = false;
		this.onExit.call(this);
		this.onSelect.call(this, this.year, this.month, this.day);	
		this.shadow.style.display = "none";
	},
	doChange: function(){
		var text = this.getText();
		var d = text.split("/");
		if (d.length == 3){		
			this.doLostFocus();
		}
	},
	doFocus: function(){
		var app = this.getApplication();
		if (app.getActiveForm().activeChildForm == undefined)
			app.getActiveForm().setActiveControl(this);
		else app.getActiveForm().activeChildForm.setActiveControl(this);
		var input = $(this.getFullId()+"_input");	
		input.style.background = system.getConfig("text.focus");
		this.isFocused = true;
		this.onEnter.call(this);
		this.shadow.style.display = "";
	}
});