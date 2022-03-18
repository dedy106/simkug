//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_saiCBBL = function(owner, options){
    if (owner){
		this.stateRO 	= "";
		this.text 		= "";
		this.caption 	= "saiLabel";
		this.labelWidth = 100;
		this.type 		= "text";
		this.color      = system.getConfig("text.normalBgColor");
		this.fontColor  = system.getConfig("text.normalColor");
		this.isFocused  = false;
		this.mode = 1;	
		this.rightLabelCaption = "";		
		window.app_builder_component_controls_saiCBBL.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_saiCBBL";
        window.app_builder_component_controls_saiCBBL.prototype.parent.setHeight.call(this, 20);
			
        this.wantTab = false;
		this.textLength = 0;
        this.tabStop = true;
        this.password = false;
        this.readOnly = false;
		this.pressKeyDown = false;		
        this.onDefocus = new portalui_eventHandler();
        this.onKeyDown = new portalui_eventHandler();
        this.onKeyPress = new portalui_eventHandler();
		this.onBtnClick = new portalui_eventHandler();
		this.onExit = new portalui_eventHandler();
		this.onEnter = new portalui_eventHandler();
		this.onChange = new portalui_eventHandler();
		this.onRightLabelChange = new portalui_eventHandler();
		
		this.items = new portalui_arrayMap();
		this.items2 = new portalui_arrayMap();
				
		this.sqlScript = "";
		this.arrayKey = [];
		this.dataCheck = false;
		
		this.operator = "";
		this.rightLabelWidth = 0;		
		this.rightLabelVisible = true;
		this.realWidth = this.width;
		this.btnVisible = true;
		this.owner = owner;		
		this.sql = "";
		this.fields = [];
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
			if (options.caption!== undefined) this.setCaption(options.caption);
			if (options.tipeText !== undefined) this.setTipeText(options.tipeText);
			if (options.password !== undefined) this.setPassword(options.password);
			if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
			if (options.color !== undefined) this.setColor(options.color);				
			if (options.fontColor !== undefined) this.setFontColor(options.fontColor);							
			if (options.rightLabelVisible !== undefined) this.setRightLabelVisible(options.rightLabelVisible);					
			if (options.btnVisible !== undefined) this.setBtnVisible(options.btnVisible);				
			if (options.textLength !== undefined) this.setTextLength(options.textLength);													
			if (options.maxLength !== undefined) this.setMaxLength(options.maxLength);		
			if (options.text !== undefined) this.setText(options.text);
		}
		this.addProperty({className:this.className,caption:this.caption,tipeText:this.tipeText, maxLength:this.textLength,labelWidth:this.labelWidth, color:this.color,fontColor:this.fontColor, readOnly:this.readOnly, text:this.text, btnVisible:true, rightLabelVisible:true, rightLabelCaption:""});	
		this.addEvent({defocus:"",keyDown:"",keyPress:"",btnClick:"",enter:"",exit:"",change:""});
    }
};
window.app_builder_component_controls_saiCBBL.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_saiCBBL.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();	
	    canvas.style.background = " ";
	    
		var lebar = this.width-this.labelWidth - 20 - this.rightLabelWidth;;
		var lft = lebar + this.labelWidth;
		var lft2 = lft + 20;
		var bottm = this.height-4;
		var html = "";
		if (document.all)	
			html =    "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
				"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth + lebar)+";top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
				"background:"+this.color+";border-width:1;}' "+				
				"/>"+
				"<div id='"+n+"_btnList' style='{position:absolute; left:"+lft+";top:0;width:20px;height:100%;"+
				"background:url(icon/"+system.getThemes()+"/btnfind.png) 0 0 no-repeat;cursor: pointer} '  "+
				" title='listdata'>" +
				"</div>"+//this.rightLabelWidth+"px
				"<div id='"+n+"_rightlabel' style='{position:absolute; left:"+lft2+";top:0;width:100%;height:100%;}'>"+this.rightLabelCaption+			
					"</div>"+
				"</div>";
		else 
			html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
				"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth + lebar)+";top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
				"background:"+this.color+";border-width:1;}' "+				
				"/>"+
				"<div id='"+n+"_btn' style='{position:absolute; left:0;top:0;width:20px;height:100%;"+
				"background:url(icon/"+system.getThemes()+"/btnfind.png) 0 0 no-repeat;cursor: pointer} '  "+
				" title='listdata'>" +
				
				"</div>"+//this.rightLabelWidth+"px
				"<div id='"+n+"_rightlabel' style='{position:absolute; left:"+lft2+";top:0;width:100%;height:100%;}'>"+this.rightLabelCaption+			
					"</div>"+
				"</div>";	
	    this.setInnerHTML(html, canvas);		
		this.input = $(n+"_edit");
		this.btnList = $(n+"_btn");
		this.shadow = $(this.getFullId() +"_shadow");	
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			var b1 = $( n +"_shadTop");
			var b2 = $( n +"_shadLeft");
			var b3 = $( n +"_shadBottom");
			var b4 = $( n +"_shadRight");				
			var b5 = $( n +"_btn");				
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			DD_belatedPNG.fixPng(b5);
		}
	},
	eventMouseOver: function(event){
	    var canvas = $(this.getFullId()+"_btn");
	    switch (this.mode)
	    {
	        case 1 :
	                canvas.style.backgroundPosition = "0 -20";
	                break;
	        case 2 :
	        case 3 :
	                canvas.style.backgroundPosition = "0 -18";
	                break;
	    }
	},
	eventMouseOut: function(event){
	    var canvas = $(this.getFullId()+"_btn");    
	    canvas.style.backgroundPosition = "0 0";
	},
	eventMouseDown: function(event){
	    var canvas = $(this.getFullId()+"_btn");    
	    switch (this.mode)
	    {
	        case 1 :
	                canvas.style.backgroundPosition = "0 -39";
	                break;
	        case 2 :
	        case 3 :
	                canvas.style.backgroundPosition = "0 -36";
	                break;
	    }
	},
	eventMouseClick: function(event){
	    this.onBtnClick.call(this,this, event);
		this.pressKeyDown = false;
	},
	eventExit: function(sender){
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.color;
	    this.onExit.call(this);
		this.isFocused  = false;
		this.shadow.style.display = "none";
	},
	doFocus: function(sender){
		var input = $(this.getFullId()+"_edit");
		if (input != undefined)
			input.style.background = system.getConfig("text.focus");
		this.onEnter.call(this);
		this.isFocused  = true;
		this.getForm().setActiveControl(this);	
		this.shadow.style.display = "";
	},
	doKeyDown: function(keyCode, buttonState){
	},
	doKeyPress: function(charCode, buttonState){		
	},
	doChange: function(sender){	
		this.setRightLabelCaption("");
		this.onChange.call(this); 
	},
	eventKeyPress: function(event, sender){
		try{		
			window.system.buttonState.set(event);		
		    var keyCode = document.all ? event.keyCode: event.which;
		    var charCode = document.all ? system.charCode[event.keyCode] : system.charCode[event.charCode];		
			if (keyCode != 40)
				this.pressKeyDown = false;		
			this.onKeyPress.call(sender, charCode, window.system.buttonState);    
			if (system.charCode[keyCode] != undefined && keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
				return false;
			else return true;
		}catch(e){
			alert("saiCBBL:keypress:"+e);
		}	
	},
	eventKeyDown: function(event, sender){
		window.system.buttonState.set(event);
		var tab = false;
		if (event.keyCode == 9)
		{
			event.keyCode =13;
			tab = true;
		}	
		if ((event.keyCode == 13))
		{
			this.owner.nextCtrl(this);
			this.pressKeyDown = false;	
		}else if ((event.keyCode == 40)&&(!this.pressKeyDown))
		{
			this.pressKeyDown = true;
			this.onBtnClick.call(this);
			return false;
		}else if (event.keyCode != 40)
			this.pressKeyDown = false;
		this.onKeyDown.call(sender, event.keyCode, window.system.buttonState);    
		if (tab)
			return false;
		if (system.charCode[event.keyCode] != undefined && event.keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
			return false;
		else return true;		
	},
	doLostFocus: function(){
	    if (this.activeChar != undefined)
	        this.activeChar.style.background = "";    
	    this.isFocused  = false;
	    this.onDefocus.call(this);
		this.shadow.style.display = "none";
	},
	blur: function(){
		this.input.blur();
		this.shadow.style.display = "none";
	},
	doSetFocus: function(){
	},
	getText: function(){
	 	var nd = this.input;
		this.text = nd.value;
	    return this.text;	
	},
	setText: function(data){	
		if (data == undefined) data = "";
	    this.text = data;
		this.setProperty("text",data);
		this.setRightLabelCaption("");
	    var nd = $(this.getFullId()+"_edit");
		if (nd != undefined)
			nd.value = data;			
		this.onChange.call(this);
		this.pressKeyDown = false;
	},
	clear: function(data){
		this.setText("");
		this.setRightLabelCaption("");	
	},
	isWantTab: function(){
		return this.wantTab;
	},
	setWantTab: function(data){
		this.wantTab = data;
	},
	isPassword: function(){
		return this.password;
	},
	setPassword: function(data){
		this.password = data; 
		this.setProperty("password",data);		
		var nd = $(this.getFullId());
		if (nd != undefined)
		{
			if (this.password)
				this.type = "password";		   
			else this.type = "text";		   
			this.input.type = this.type;
			//this.doDraw(nd);
		}
	},
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		this.readOnly = data;    
		this.setProperty("readOnly",data);
		this.tabStop = !this.readOnly;		
		this.stateRO = data ? "readonly": "";
		this.input.readOnly = data;	
		this.input.style.background = data ? system.getConfig("text.disabled") : this.color;
		if (document.all)
			this.input.color = data ? system.getConfig("text.disabledFontColor") : this.fontColor;		
		else 
			this.input.style.color = data ? system.getConfig("text.disabledFontColor") : this.fontColor;		
	},
	setWidth: function(data){
		try{
			window.app_builder_component_controls_saiCBBL.prototype.parent.setWidth.call(this,data); 		
			this.input.style.width = data - this.labelWidth - 20;
			this.btnList.style.left = data -20;
		}catch(e){
			alert(e);
		}
	},
	setLabelWidth: function(data){
		this.labelWidth = data;		
		this.setProperty("labelWidth",data);		
		var nd = $(this.getFullId() +"_label");	
		if (nd !== undefined) nd.style.width = data;
		this.input.style.width = this.width - data -20;
	},
	setCaption: function(data){
		this.caption = data;
		this.setProperty("caption",data);
		var nd = $(this.getFullId() +"_label");	
		if (nd != undefined) nd.innerHTML = data;
	},
	getCaption: function(){
		return this.caption;	
	},
	setRightLabelCaption: function(data){
		if (data == undefined) data = "";
		this.setProperty("rightLabelCaption",data);
		var canvas = $(this.getFullId() + "_rightlabel");
		if (canvas != undefined)
		{
			canvas.innerHTML = data;	
			var width = this.width - this.rightLabelWidth;		
			this.rightLabelCaption = data;
			this.rightLabelWidth = data.length * 7;		
			lbr = width + this.rightLabelWidth;
			var cnv = this.getContainer();
			cnv.style.width = lbr;					
			cnv = $(this.getFullId() +"_rightlabel");
			if (cnv != undefined) cnv.style.width = this.rightLabelWidth;			
		}
		this.setRightLabelVisible(this.rightLabelVisible);
		this.onRightLabelChange.call(this, data);			
	},
	setItem: function(item){
		this.items = item;
	},
	getItem: function(){
		return this.items;
	},
	setItem2: function(item){
		this.items2 = item;
	},
	getItem2: function(){
		return this.items2;
	},
	isRightLabelVisible: function(){
		return this.rightLabelVisible;
	},
	setRightLabelVisible: function(data){
		try{
			 this.rightLabelVisible = data;
			 this.setProperty("rightLabelVisible",data);
			 var canvas = $(this.getFullId()+"_rightlabel");
			 if (this.rightLabelVisible)
				canvas.style.display = "";
			else
				canvas.style.display = "none";
		}catch(e){
			alert("saiCBBL:setRightLabelVisible"+e);
		}	
	},
	clearItem: function(){
		this.items = [];
		this.items2 = [];
	},
	editMouseOut: function(){
		var input = this.input;//$(this.getFullId()+"_edit");
		if (input == undefined) return false;
		if (this.isFocused)
			this.shadow.style.display = "";
		else
			this.shadow.style.display = "none";	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : this.color;
		if (document.all)
			this.input.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : this.fontColor;	
		else
			this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : this.fontColor;	
	},
	editMouseOver: function(){
		var input = this.input;//$(this.getFullId()+"_edit");
		if (input == undefined) return false;	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : system.getConfig("text.overBgColor");
		if (document.all)
			this.input.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.overColor");
		else
			this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.overColor");
		this.shadow.style.display = "";
	},
	setColor: function(data){
		this.color = data;  
		this.setProperty("color",data);
		if(this.input != undefined)
	        this.input.style.background = data;		      
	},
	setFontColor: function(data){
		this.fontColor = data;
		this.setProperty("fontColor",data);
		if(this.input != undefined){
			if (document.all)
				this.input.color = data;		  
			else 
				this.input.style.color = data;		  
		}
	},
	getColor: function(){
		return this.color;
	},
	setBtnVisible: function(data){
		var canvas = $(this.getFullId()+"_btn");	
		this.btnVisible = data;
		this.setProperty("btnVisible",data);
		if (data)	
			canvas.style.display = "";
		else
			canvas.style.display = "none";		
	},
	setLength: function(data){	
		this.textLength = data;		
	},
	maxLength: function(data){	
		this.textLength = data;
		this.setProperty("maxLength",data);
	},
	checkItem: function(notWithRightLabel){
		this.notWithRightLabel = notWithRightLabel == undefined ? false: notWithRightLabel;
		if (this.getText() == "") return false;	
		if (this.getText() == "-") return false;	
		if (this.fields[0] == undefined || this.fields[0] == "") return false;
		if (this.sql == "") {
			this.app.alert(this.getForm(), "Properti SQL belum didefinisikan","Eksekusi batal dilanjutkan");
			return false;
		}
		
		if (this.dbLib == undefined) return false;
//--masih belum bisa complex sql	
		if (this.sql.lastIndexOf("where") == -1)
			this.dbLib.execSQLA(this.sql +" where "+this.fields[0]+" = '"+this.getText()+"' ", undefined, undefined, this);
		else this.dbLib.execSQLA(this.sql +" and "+this.fields[0]+" = '"+this.getText()+"' ", undefined, undefined, this);
	},
	free: function(){
		if (this.dbLib != undefined) this.dbLib.delListener(this);
		window.app_builder_component_controls_saiCBBL.prototype.parent.free.call(this);	
	},
	setSql: function(sql, fields, dbLib){
		this.sql = sql;
		this.setProperty("sql",sql);		
		this.fields = fields;		
		this.dbLib = dbLib;
		if (this.dbLib != undefined) this.dbLib.addListener(this);
	},
	doRequestReady: function(sender, methodName, result, callObj){
		try{				
			if (sender == this.dbLib && callObj == this){						
				switch (methodName){
					case "execSQL" :					
						result = eval('(' + result +')');
						if (typeof(result) == "object"){
							var row = result.rs.rows[0];
							if (row == undefined) throw("Data tidak ditemukan.");
							if (row.msg != undefined && row.msg.toLowerCase().search("error") != -1) throw(row.msg+"<br>Hubungi administrator anda");					
							eval("var rightLbl = row." +this.fields[1]);						
							if (!this.notWithRightLabel) this.setRightLabelCaption(rightLbl);
						}else throw("Ada Kesalahan transfer data " +result+"<br>Hubungi administrator anda");
						break;
				}
			}
		}catch(e){
			this.app.alert(this.getForm(),e,"Field " + this.getCaption()+"")
		}
	}
});