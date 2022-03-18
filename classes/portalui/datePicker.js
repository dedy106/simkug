//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_datePicker = function(owner, options){
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
        this.monthIndex = {jan:"01", feb:"02", mar:"03", apr:"04", may:"05", jun:"06", jul:"07", aug:"08", sep:"09", oct:"10", nov:"11", dec:"12"};
        window.portalui_datePicker.prototype.parent.constructor.call(this, owner, options);
		this.className = "portalui_datePicker";
		this.owner = owner;
		this.setWidth(90);
        window.portalui_datePicker.prototype.parent.setHeight.call(this, 18);		
        this.onSelect = new portalui_eventHandler();        
        this.onKeyDown = new portalui_eventHandler();
        this.onKeyPress = new portalui_eventHandler();
		this.onChange = new portalui_eventHandler();
		this.onExit = new portalui_eventHandler();
		this.onEnter = new portalui_eventHandler();
			
		this.wantTab = false;
        this.tabStop = true;
		this.formated = false;
		if (options !== undefined){
			this.updateByOptions(options);					
			if (options.selectDate) {				
                if (typeof options.selectDate == "string")
                    this.onSelect.set(this.getTargetClass(),options.selectDate);
                else this.onSelect.set(options.selectDate[0],options.selectDate[1]);
			}
			if (options.date) this.setDateString(options.date);
			if (options.btnVisible) this.setBtnVisible(options.btnVisible);
			if (options.readOnly) this.setReadOnly(options.readOnly);
			if (options.formated) this.setFormated(options.formated);
		}
    }
};
window.portalui_datePicker.extend(window.portalui_control);
window.datePicker = window.portalui_datePicker;
//---------------------------- Function ----------------------------------------
window.portalui_datePicker.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
	    canvas.style.background = "#FFFFFF";
		canvas.style.border = "1px solid #a3a6a8";
	    var month = this.month;
	    if (month < 10)
	        month = "0" + month;	        
	    var caption = this.day + "/" +month + "/" + this.year;
	    var html =  "<div id='" + n + "_frame' style='{position : absolute; left: 0; top: 0; width: 100%; height: 100%;}'"+
	                ">" +	                
					"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity=30);opacity:0.3;moz-opacity:0.3}'>"+
					 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
					 	" position:absolute;left:0;top:-7;width:100%;height:8;}'></div>"+
					 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
					 	" position:absolute;left:-8;top:-8;width:8;height:37;}'></div>"+		
					 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
					 	" position:absolute;left:0;top:100%;width:100%;height:10;}'></div>"+				
					 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
					 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
					 "</div>"+
						"<input id='"+n+"_edit' value='"+caption+"'  "+
							" style='{position:absolute; top:0; width:100%;height:100%;border:1px solid transparent;  "+
							" background:'"+system.getConfig("text.normalBgColor")+"';}' "+//border:#919B9B 1px solid;
							" onfocus='$$("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return $$("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='$$("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='$$("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='$$("+this.resourceId+").eventMouseOver(event)' "+		
							" onmousemove='$$("+this.resourceId+").eventMouseMove(event)' "+		
							" onmouseout='$$("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='$$("+this.resourceId+").doChange(event)' />"+					
						"<input id='"+n+"_edit_d' value='"+(this.day < 10 ? "0":"")+this.day+"'  maxlength=2 "+
							" style='{display:none;position:absolute; top:0; width:20;height:100%;border:1px solid transparent; "+
							" background:transparent;}' "+//border:#919B9B 1px solid;
							" onfocus='$$("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return $$("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='$$("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='$$("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='$$("+this.resourceId+").eventMouseOver(event)' "+		
							" onmouseout='$$("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='$$("+this.resourceId+").doChange(event)' />"+					
						"<div id='"+n+"_sep_0' style='display:none;position:absolute;left:21;top:2;width:5;height:100%;'>/</div>"+
						"<input id='"+n+"_edit_m' value='"+month+"'  maxlength=2 "+
							" style='{display:none;position:absolute; top:0; width:20;height:100%;left:25;border:1px solid transparent; "+
							" background:transparent;}' "+//border:#919B9B 1px solid;
							" onfocus='$$("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return $$("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='$$("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='$$("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='$$("+this.resourceId+").eventMouseOver(event)' "+		
							" onmouseout='$$("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='$$("+this.resourceId+").doChange(event)' />"+					
						"<div id='"+n+"_sep_1' style='display:none;position:absolute;left:46;top:2;width:5;height:100%;'>/</div>"+
						"<input id='"+n+"_edit_y' value='"+this.year+"'  maxlength=4 "+
							" style='{display:none;position:absolute; top:0; width:50;height:100%;left:50;border:1px solid transparent;"+
							" background:transparent;}' "+//border:#919B9B 1px solid;
							" onfocus='$$("+this.resourceId+").doFocus(event);'"+
							" onkeypress='return $$("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
							" onkeydown='$$("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
							" onblur='$$("+this.resourceId+").doLostFocus(event)' "+           				
							" onmouseover='$$("+this.resourceId+").eventMouseOver(event)' "+		
							" onmouseout='$$("+this.resourceId+").eventMouseOut(event)' "+		
							" onChange='$$("+this.resourceId+").doChange(event)' />"+					
	                    "<div id='" + n + "_button' style='{position: absolute; left: 100%;top: 0;width: 18;height: 18;cursor: pointer;background: url(icon/"+system.getThemes()+"/dpicker.png) no-repeat top left;}' onMouseOver='$$(" + this.resourceId + ").eventButtonMouseOver(event)' onMouseDown='$$(" + this.resourceId + ").eventButtonMouseDown(event)' onMouseOut='$$(" + this.resourceId + ").eventButtonMouseOut(event)' onMouseUp='$$(" + this.resourceId + ").eventButtonMouseOver(event)' onClick='$$(" + this.resourceId + ").eventButtonClick(event)'></div>"+ 
	                "</div>";

	    this.setInnerHTML(html, canvas);
		this.input = $(n+"_edit");
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
		this.input.readOnly = data;		
		this.input.style.background = data ? system.getConfig("text.disabled") : system.getConfig("text.normalBgColor");
		this.input.style.color = data ? system.getConfig("text.disabledFontColor") : system.getConfig("text.normalColor");
	},
	setBtnVisible: function(data){	
		this.button.style.display = data ? "":"none";
	},
	pickerFormSelect: function(sender, yy, mm, dd){
	    this.setDate(yy, mm, dd);    
	    //this.onSelect.call(this, yy, mm, dd);	
	},
	eventButtonClick: function(event){
		var app = this.getApplication();		
		if ((app.systemDatePickerForm != undefined) && (app.systemDatePickerForm.visible)){	 
		  	app.systemDatePickerForm.close();		
		} else{
			var app = this.app;
			var canvas = this.getCanvas();
			var width = canvas.offsetWidth + 20;// - this.labelWidth;
			x = findPos(window.pageCnv,canvas);
			y = x[1] + parseInt(canvas.offsetHeight,10);
			x = x[0] ;
			uses("portalui_datePickerForm");		
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
		if (this.hint != "")
			window.system.hideHint();
	},
	eventButtonMouseOver: function(event){
	    $(this.getFullId() + "_button").style.backgroundPosition = "center left";	
	},
	eventButtonMouseDown: function(event){
	    $(this.getFullId() + "_button").style.backgroundPosition = "bottom left";
	},
	eventButtonMouseOut: function(event){
	    $(this.getFullId() + "_button").style.backgroundPosition = "top left";	
	},
	doKeyDown: function(keyCode, buttonState){		
	},
	doKeyPress: function(charCode, buttonState){	
	},
	setText: function(data){
		if (data == undefined) data = "1920-01-01";
		var tmp = new Date();
		if (!this.formated){		
			var input = $(this.getFullId() +"_edit");
			if (input != undefined)
				input.value = data;
		}		
		try{			
			if (data.search("/") != -1){
				var d = data.split("/");	        
				var year = d[2] ? parseInt(d[2].substr(0,4), 10):tmp.getFullYear();				
				var month = d[1] ? parseInt(d[1].substr(0,2), 10):tmp.getBln();
				var day = parseInt(d[0].substr(0,2), 10);
			}else if (data.search("-") != -1){
				var d = data.split("-");				
				if (this.monthIndex[d[1].toLowerCase()]) d[1] = this.monthIndex[d[1].toLowerCase()];
				if (d[2].length == 4) {					
					var year = parseInt(d[2].substr(0,4), 10);							
					var month = parseInt(d[1].substr(0,2), 10);			
					var day = parseInt(d[0].substr(0,2), 10);
				}else{
					var year = parseInt(d[0].substr(0,4), 10);							
					var month = parseInt(d[1].substr(0,2), 10);			
					var day = parseInt(d[2].substr(0,2), 10);
				}
			}else {//01012009
				var day = parseInt(data.substr(0,2), 10);				
				var month = parseInt(data.substr(2,2), 10);
				var year = parseInt(data.substr(4,4), 10);
			}
			if (month > 12)
				month = 12;
			this.setDate(year, month, day);						
		}catch(e){
			alert("daetpicker:setText:"+e);
		}  
	},
	getText: function(data){
		if(this.formated){
			var ret = $(this.getFullId() +"_edit_d").value +"/"+$(this.getFullId() +"_edit_m").value+"/"+$(this.getFullId() +"_edit_y").value;			
		}else{
			var input = $(this.getFullId() +"_edit");
			var ret = this.day +"/"+this.month+"/"+this.year;  
			if ((input != undefined) && (input != null))
				ret = input.value;
		}
	  return ret;
	},
	setWidth: function(data){
		window.portalui_datePicker.prototype.parent.setWidth.call(this, data);
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
		if (this.app._dbEng == 'oci8'){
			return "to_date('"+this.year + "/" + month + "/" + day+"','yyyy/mm/dd')";//this.year + "-" + month + "-" + day;//
		}else{			
			return this.year + "/" + month + "/" + day;
		}
	},
	toSysDate: function(){      
		return new Date(this.year, this.month - 1, this.day);
	},
	setDate: function(yy, mm, dd){
		if ( (isNaN(yy) || isNaN(mm) || isNaN(dd)) ){
			var dt = new Date();
			dd = dt.getDate();		
			mm = dt.getMonth() + 1;
			yy = dt.getFullYear();
		}
		try{						
			var dt = new Date(parseInt(yy,10),parseInt(mm,10) - 1,parseInt(dd,10));		
			this.year = dt.getFullYear();
			this.month = dt.getBln();
			this.day = dt.getDate();						
	    }catch(e){
			systemAPI.alert(e);
			return;
		}
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
	    	
		var n = this.getFullId();
		if (this.formated){
			$(n+"_edit_d").value = day;
			$(n+"_edit_m").value = month;
			$(n+"_edit_y").value = year;
		}else{
			var caption = day + "/" +  month+ "/" + year;
			var input = $(n + "_edit");
			if (input != undefined)
				input.value = caption;
		}
		this.onSelect.call(this, parseFloat(year), parseFloat(month), parseFloat(day));	
	},
	setDateString: function(data){
	    // 2008-01-01
	    // 0123456789    
	    var year = parseInt(data.substring(0, 4), 10);	    
		var month = parseInt(data.substring(5, 7), 10);
		var day = parseInt(data.substring(8, 10), 10);

		this.setDate(year, month, day);
		//this.onSelect.call(this, year, month, day);
	},
	doSetFocus: function(){	
		if (this.formated){	
			//$(this.getFullId()+"_edit_d").focus();
		}else{
			var nd = $(this.getFullId()+"_edit");
			if (nd != undefined)
				nd.focus();
		}
		this.isFocused = true;	
		this.shadow.style.display = "";
	},
	doLostFocus: function(event){      
		try{
			if (this.formated){				
				var n = this.getFullId();
				var year = parseInt($(n+"_edit_y").value.substr(0,4),10);
				var month = parseInt($(n+"_edit_m").value.substr(0,2),10);
				var day = parseInt($(n+"_edit_d").value.substr(0,2),10);
				if (month > 12) month = 12;
				this.setDate(year, month, day);
			}else{
				var data = this.getText();					
				if (data.search("/") != -1){
					var d = data.split("/");	        
					var year = parseInt(d[2].substr(0,4), 10);
					var month = parseInt(d[1].substr(0,2), 10);
					var day = parseInt(d[0].substr(0,2), 10);
				}else if (data.search("-") != -1){
					var d = data.split("-");	        
					var year = parseInt(d[0].substr(0,4), 10);
					var month = parseInt(d[1].substr(0,2), 10);
					var day = parseInt(d[2].substr(0,2), 10);
				}else {//01012009
					var day = parseInt(data.substr(0,2), 10);
					var month = parseInt(data.substr(2,2), 10);
					var year= parseInt(data.substr(4,4), 10);
				}				
				if (month > 12)
					month = 12;				
				this.setDate(year, month, day);
			}					
			if (this.formated){
				if (event === undefined){
					var target = $(n+"_edit_y");
				}else var target = document.all ? event.srcElement : event.target;
				if (target.id == n+"_edit_y"){
					this.isFocused = false;
					this.onExit.call(this);				
					this.shadow.style.display = "none";				
					this.getCanvas().style.background = system.getConfig("text.normalBgColor");
				}
			}else{
				this.isFocused = false;
				this.onExit.call(this);
				//this.onSelect.call(this, this.year, this.month, this.day);	
				this.shadow.style.display = "none";
			}
		}catch(e){
		    alert("datePicker:doLostFocus:"+e);
		}
	},
	doChange: function(){
		try{
			if (!this.formated){
				var text = this.getText();			
				var d = text.split("/");
				if (d.length == 3){		
					this.doLostFocus();
				}
			}
			//this.onSelect.call(this, this.year, this.month, this.day);	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFocus: function(event){
		var app = this.getApplication();
		if (app.getActiveForm().activeChildForm == undefined)
			app.getActiveForm().setActiveControl(this);
		else app.getActiveForm().activeChildForm.setActiveControl(this);
		if (this.formated){
			if (event){
				var target = document.all ? event.srcElement : event.target;
				setCaret(target,0,target.value.length);
			}
			this.getCanvas().style.background = system.getConfig("text.focus");
		}else{
			var input = $(this.getFullId()+"_edit");	
			input.style.background = system.getConfig("text.focus");
		}
		this.isFocused = true;
		this.onEnter.call(this);
		this.shadow.style.display = "";
	},
	eventKeyPress: function(event, sender){
		window.system.buttonState.set(event);
		var charCode = undefined;
	    
	    if (document.all)
	        charCode = window.system.charCode[event.keyCode];
	    else
	        charCode = window.system.charCode[event.charCode];
		if (charCode != undefined)
		{
			var reg = /\d/;		  			
			if ((!(reg.test(charCode))) && (charCode != "/"))
					return false;  		  						
			this.onKeyPress.call(sender, charCode, window.system.buttonState); 
		}
	},
	eventKeyDown: function(event, sender){
	    try{
    		window.system.buttonState.set(event);	    	
			var target = document.all ? event.srcElement : event.target;			
    		if (event.keyCode == 9 || (event.keyCode == 13)){
				if (this.formated){
					if (target.id == this.getFullId()+"_edit_y")
						this.owner.nextCtrl(this);
					else if (target.id == this.getFullId()+"_edit_m")
						$(this.getFullId()+"_edit_y").focus();
					else $(this.getFullId()+"_edit_m").focus();
				}else{
					this.owner.nextCtrl(this);
				}
    			return false;
    		}	
			if (event.keyCode == 39){
				if (target.id == this.getFullId()+"_edit_d" && getCaret($(this.getFullId()+"_edit_d")) == 2)
					$(this.getFullId()+"_edit_m").focus();
				else if (target.id == this.getFullId()+"_edit_m" && getCaret($(this.getFullId()+"_edit_m")) == 2)
					$(this.getFullId()+"_edit_y").focus();
			}			
    		if (event.keyCode == 27){  
    		    this.input.blur();  
    			this.owner.prevCtrl(this);
    			return false;
			}else if ((event.keyCode == 40)){
				var app = this.app;
				var canvas = this.getCanvas();
				var width = canvas.offsetWidth + 20;// - this.labelWidth;
				x = findPos(window.pageCnv,canvas);				
				y = x[1] + parseInt(canvas.offsetHeight,10);
				x = x[0] ;//+ this.labelWidth;						
				uses("portalui_datePickerForm");		
				if (app.systemDatePickerForm == undefined)
					app.systemDatePickerForm = new portalui_datePickerForm(app);
				app.systemDatePickerForm.onSelect.set(this, "pickerFormSelect");
			
				app.systemDatePickerForm.setSelectedDate(this.year, this.month, this.day);
				var scrHeight = system.screenHeight;
				app.systemDatePickerForm.setLeft(x);
				if ((y + app.systemDatePickerForm.getHeight()) > scrHeight)
				{
					if (document.all)
						app.systemDatePickerForm.setTop(y - 2);
					else
						app.systemDatePickerForm.setTop(y - 1);
				}else
					app.systemDatePickerForm.setTop(y);
				app.systemDatePickerForm.bringToFront();
				app.systemDatePickerForm.show();
					
			}			
    		this.onKeyDown.call(this, event.keyCode, this.buttonState);			
			if (this.formated){
				if (target.id == this.getFullId()+"_edit_d" && getCaret($(this.getFullId()+"_edit_d")) == 2)
					$(this.getFullId()+"_edit_m").focus();
				else if (target.id == this.getFullId()+"_edit_m" && getCaret($(this.getFullId()+"_edit_m")) == 2)
					$(this.getFullId()+"_edit_y").focus();
			}
   		}catch(e){
   		   alert(e);
        }
	},
	getYear: function(){
		return this.year;
	},
	getMonth: function(){
		return this.month;
	},
	getThnBln: function(){
		return this.year+""+(this.month < 10 ? "0" :"")+this.month;
	},
	setFormated: function(data){
		this.formated = data;
		var n = this.getFullId();
		if (data){		
			$(n+"_edit").style.display = "none";
			$(n+"_edit_d").style.display = "";
			$(n+"_edit_m").style.display = "";
			$(n+"_edit_y").style.display = "";			
			$(n+"_sep_0").style.display = "";
			$(n+"_sep_1").style.display = "";			
		}else{
			$(n+"_edit").style.display = "";
			$(n+"_edit_d").style.display = "none";
			$(n+"_edit_m").style.display = "none";
			$(n+"_edit_y").style.display = "none";
			$(n+"_sep_0").style.display = "none";
			$(n+"_sep_1").style.display = "none";			
		}
		
	},
	getPeriode: function(){
		return this.year+(this.month < 10 ? "0":"")+this.month;
	},
	dateAdd: function(timeU,byMany, dateObj){
		if (dateObj)
			var dt = dateObj.DateAdd(timeU,byMany);
		else var dt = this.toSysDate().DateAdd(timeU,byMany);
		this.setText(dt.lclFormat());
	}
});
