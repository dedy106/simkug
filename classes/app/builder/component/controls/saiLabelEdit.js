//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_saiLabelEdit = function(owner, options){
    if (owner){
		try{
			this.stateRO 	= "";
	        this.text 		= "";
	  		this.caption 	= "saiLabel";
	  		this.labelWidth = 100;
	  		this.type 		= "text";
	  		this.color      = system.getConfig("text.normalBgColor");
	  		this.fontColor  = system.getConfig("text.normalColor");
	  		this.alignment  = window.alLeft;
	  		this.isFocused = false;
			this.withPetik = false;
	  		this.lengthChar = 0;
	  		window.app_builder_component_controls_saiLabelEdit.prototype.parent.constructor.call(this, owner, options);
	        this.className = "portalui_saiLabelEdit";
	      
		    this.setWidth(80);
		    window.app_builder_component_controls_saiLabelEdit.prototype.parent.setHeight.call(this, 20);
			this.buttonState = new portalui_buttonState();
	        this.wantTab = false;

			this.tabStop = true;
			this.password = false;
			this.readOnly = false;
			this.tipeText = window.ttNormal;
	        
			this.onDefocus = new portalui_eventHandler();
			this.onKeyDown = new portalui_eventHandler();
			this.onKeyPress = new portalui_eventHandler();
	  		this.onChange = new portalui_eventHandler();
	  		this.onExit = new portalui_eventHandler();
	  		this.onEnter = new portalui_eventHandler();
	  		
	  		this.first = true;  			  		
			if (options !== undefined){
				this.updateByOptions(options);				
				if (options.caption!== undefined) this.setCaption(options.caption);				
				if (options.password !== undefined) this.setPassword(options.password);
				if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
				if (options.color !== undefined) this.setColor(options.color);				
				if (options.fontColor !== undefined) this.setFontColor(options.fontColor);				
				if (options.alignment !== undefined) this.setAlignment(options.alignment);				
				if (options.tipeText !== undefined) this.setTipeText(options.tipeText);
				if (options.lengthChar !== undefined) this.setLength(options.lengthChar);				
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.text !== undefined) this.setText(options.text); 
			}
			this.addProperty({className:this.className,caption:this.caption,tipeText:this.tipeText, maxLength:this.textLength,labelWidth:this.labelWidth, color:this.color,fontColor:this.fontColor, readOnly:this.readOnly, text:this.text});	
			this.addEvent({defocus:"",keyDown:"",keyPress:"",btnClick:"",enter:"",exit:"",change:""});
		}catch(e){
			systemAPI.alert(e,"");
		}
    }
};
window.app_builder_component_controls_saiLabelEdit.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_saiLabelEdit.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();

	    canvas.style.background = " ";
	    //canvas.style.overflow = "hidden";
		var lebar = this.width-this.labelWidth;
		var bottm = this.height-4;
		var html = "";
		if (document.all)
			html =   "<div id='"+n+"_border' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}' "+				
				"> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) "+
				bottm+" left  repeat-x;position:absolute;top : 3; left:0;font-size:11;width:100%;height:100%;}' "+			
				">"+this.caption+" </div> "+ 			
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;font-family:Arial;font-size:11px;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;background:"+
				this.color+";border-width:1;text-align:"+this.alignment+"; }' "+				
				"/></div>";
		else 
		  html =   "<div id='"+n+"_border' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}' "+						
					"> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 2; left:0;font-size:11;width:100%;height:18px;}' "+				
				">"+this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+				
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+"  value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:19px;font-size:11;font-family:Arial;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:1;background:"+this.color+";border-width:1;"+
				"text-align:"+this.alignment+";}' "+				
				"/>"+
				"</div>";	   
		this.setInnerHTML(html,canvas);
		this.input = $(this.getFullId() +"_edit");	
		this.label = $(this.getFullId() +"_label");	
		this.shadow = $(this.getFullId() +"_shadow");			
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
				var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");				
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			}
	},
	doKeyDown: function(keyCode, buttonState){
	},
	doKeyPress: function(charCode, buttonState){
	},
	setCaret: function(start, end){
		try{		
			if (this.input == undefined) return false;
			var o = this.input;
			if("selectionStart" in o){						
				this.input.setSelectionRange(start, end);
			}else if(document.selection){
				var t = this.input.createTextRange();
				end -= start + this.input.value.slice(start + 1, end).split("\n").length - 1;
				start -= this.input.value.slice(0, start).split("\n").length - 1;
				t.move("character", start), t.moveEnd("character", end), t.select();
			}
			this.input.focus();
		}catch(e){
			alert("[saiLabelEdit]::setCaret:"+e);
		}
	},
	doFocus: function(){
		this.onEnter.call(this);
		var input = this.input;
		if (input == undefined) return false;
		if ( ( this.tipeText == window.ttNilai ) && ( input != undefined) )
		{		
			 var num = input.value;
			  var numtmp ="";
			  var i;		  
			  for (i=0;i<num.length;i++)
			   {     
				if (num.charAt(i) != ".")
					 numtmp += num.charAt(i); 
			   }  
			  num = numtmp; 
			input.value = num;
		}	
		input.style.background = system.getConfig("text.focus");
		this.shadow.style.display = "";
		this.isFocused = true;
		this.getForm().setActiveControl(this);
	//this.doSet
	},
	eventMouseOut: function(){
		var input = this.input;
		if (input == undefined) return false;
		if (this.isFocused)
		{
			input.style.background = system.getConfig("text.focus");
			if (document.all)
				input.color = system.getConfig("text.normalColor");
			else
				input.style.color = system.getConfig("text.normalColor");
			this.shadow.style.display = "";
		}else {
			input.style.background = this.color;//system.getConfig("text.normalBgColor");
			if (document.all)
				input.color = this.fontColor;
			else
				input.style.color = this.fontColor;//system.getConfig("text.normalColor");		
			this.shadow.style.display = "none";
		}
	},
	eventMouseOver: function(event){
		try{
			var input = this.input;
			if (input == undefined) return false;		
			if (this.isFocused)
			{
				input.style.background = system.getConfig("text.focus");
				if (document.all)
					input.color = system.getConfig("text.normalColor");
				else
					input.style.color = system.getConfig("text.normalColor");
			}else {
				input.style.background = system.getConfig("text.overBgColor");
				if (document.all)				
					input.color = system.getConfig("text.overColor");
				else
					input.style.color = system.getConfig("text.overColor");
			}			
			this.shadow.style.display = "";
		}catch(e){
			alert(e);
		}
	},
	clear: function(){
		this.setText("");  
	},
	doExit: function(sender){
		this.isFocused = false;
		var input = this.input;
		if (input == undefined) return false;
		if (this.getText().search("'") != -1 && !this.withPetik) { this.setText(this.getText().replace(/'/g,''));}
		if (this.tipeText == window.ttNilai)
		{
			var tmp = this.getText();		
			if (tmp == "") tmp = "0";	
			tmp = RemoveTitik(tmp);
			tmp = tmp.replace(",",".");
			tmp = parseFloat(tmp);
			tmp = tmp.toString().replace(".",",");
			var value = strToNilai(tmp);				
			this.setText(value);
			this.onDefocus.call(this);
		}
		input.style.background = this.color;
		if (document.all)
			input.color = this.fontColor;
		else
			input.style.color = this.fontColor;
		this.onExit.call(this);  	
		this.shadow.style.display = "none";
	},
	doChange: function(sender){
		this.onChange.call(this);  
	},
	doLostFocus: function(){	
		try{
			this.shadow.style.display = "none";
		    this.onDefocus.call(this);
			if (this.tipeText == window.ttNilai)
			{
				var tmp = this.getText();		
				if (tmp == "") tmp = "0";	
				tmp = RemoveTitik(tmp);
				tmp = tmp.replace(",",".");
				tmp = parseFloat(tmp);
				tmp = tmp.toString().replace(".",",");
				var value = strToNilai(tmp);				
				this.setText(value);
			}
			this.isFocused = false;			
		}catch(e){
			systemAPI.alert("saiLabelEdit:doLostFocus:"+e);
		}
	},
	blur: function(){
		try{
			this.input.blur();
			this.shadow.style.display = "none";
		}catch(e){
			systemAPI.alert("saiLabelEdit:blur:"+e);
		}
	},
	doSetFocus: function(){
	},	
	getTipeText: function(tipe){
		return this.tipeText;
	},
	getText: function(){
		try{
			var nd = this.input;
			if (nd != undefined)
				this.text = nd.value;
		}catch(e){
			alert("[saiLabelEdit]::getText:"+e);
		}
		return this.text;
	},
	setText: function(data){
		try{
			this.text = data;
			this.setProperty("text",data);		
			var nd = this.input;
			if (nd != undefined)
				nd.value = data;
			this.doSetFocus();
			this.doChange();
		}catch(e)
		{
			alert("[saiLabelEdit]::setText:"+e);
		}
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
		try{
			this.password = data;   	
			this.setProperty("password",data);		
		    if (this.password)
				this.type = "password";		   
		    else this.type = "text";		   
			if (document.all){	
				var input2= this.input.cloneNode(false); 
				input2.type= this.type; 
				this.input.parentNode.replaceChild(input2,this.input); 
				this.input = input2;
			}else this.input.type = this.type;	
		//this.doDraw(nd);
		}catch(e){
			systemAPI.alert("saiLabelEdit::setPassword:"+e+" "+this.input.tagName);
		}
	},
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		try{		
			this.readOnly = data;    
			this.setProperty("readOnly",data);		
			this.tabStop = !this.readOnly;		
			this.input.readOnly = data;		
			var edt = this.input;
			if (this.readOnly)
			{
				this.color = system.getConfig("text.disabled");
				this.fontColor  = system.getConfig("text.disabledFontColor");		
			}
			else
			{
				this.color = system.getConfig("text.normalBgColor");
				this.fontColor  = system.getConfig("text.normalColor");
			}		
			this.input.style.background = this.color;
			if (!(document.all))this.input.color = this.fontColor;
		}catch(e){
			alert("readonly:"+e+"\n");
		}
	},
	setWidth: function(data){
		window.app_builder_component_controls_saiLabelEdit.prototype.parent.setWidth.call(this,data); 
		this.input.style.width = data - this.labelWidth;		
	},
	setLabelWidth: function(data){
		this.labelWidth = data;	
		this.setProperty("labelWidth",data);				
		this.input.style.width = this.width - this.labelWidth;		
		this.label.style.width = data;
		this.input.style.left = data;
	},
	setCaption: function(data){
		this.caption = data;
		this.setProperty("caption",data);		
		this.label.innerHTML = data;
	},
	getCaption: function(){
		return this.caption;
	},
	setAlignment: function(data){
		try{
			this.alignment = data;
			this.setProperty("alignment",data);		
			var editObj = this.input;
			if(editObj != undefined)
				editObj.style.TextAlign = this.alignment;
			
		}catch(e){
			alert("[labelEdit]::setAlignment:"+e);
		}
	},
	setTipeText: function(data){
		this.tipeText = data;
		this.setProperty("tipeText",data);		
		if (data == window.ttNilai)
			this.setAlignment(window.alRight);
	},
	setType: function(data){
		try{
			var editObj = this.input;
			if(editObj != undefined)
			{
				editObj.type = data;
				editObj.style.height = this.getHeight();
			}
			this.setProperty("type",data);		
		}catch(e)
		{
			alert(e);
		}
	},
	setLength: function(data){
		this.lengthChar = data;
	},
	setColor: function(data){
	    this.color = data;
		this.setProperty("color",data);		
	    var editObj = this.input;
		if(editObj != undefined)
			editObj.style.background = data;		  	
	},
	setFontColor: function(data){
	    this.fontColor = data;
		this.setProperty("fontColor",data);		
	    var editObj = this.input;
		if(editObj != undefined)
	      editObj.style.color = data;		  	        
	},
	getColor: function(){
		return this.color;
	},
	eventkeypress: function(event){		
		try{						
			var charCode = undefined;
			if (document.all)
				charCode = window.system.charCode[event.keyCode];
			else
				charCode = window.system.charCode[event.charCode];
			if (charCode != undefined)
			{
				if ((this.lengthChar != 0) && (this.lengthChar <= (this.getText().length) ))
					return false;
				
				var input = this.input;
				var start = 0;
				if (this.tipeText == window.ttNilai)
				{
					var reg = /\d/;		
					var isFirstN = true ? charCode == '-' && input.value.indexOf('-') == -1 && start == 0: false;
				 	var isFirstD = true ? charCode == ',' && input.value.indexOf(',') == -1 : false;
					if (!(reg.test(charCode)) && (!isFirstN) && (!isFirstD))
					{	
						event.returnValue = false;
						return false;    
					}
				}else if (this.tipeText == window.ttAngka)
				{
					var reg = /\d/;	
					if (!(reg.test(charCode)))
					{	
						event.returnValue = false;
						return false;    
					}	
				}
				var tmp = this.getText();
				if ((tmp.length == this.lengthChar) && (this.lengthChar != 0))
				{	
					event.returnValue = false;
			  		return false;    
				}		
			}		
			this.buttonState.set(event);
			this.onKeyPress.call(this, charCode, this.buttonState);
		}catch(e){			
			alert("saiLabelEdit:keyPress:"+e);
		}	
	},
	eventkeydown: function(event){	
		this.buttonState.set(event);
		var ret = this.onKeyDown.call(this, event.keyCode, this.buttonState);
		if (ret != undefined ) return ret;
		var tab = false;
		if (event.keyCode == 9){	
			event.keyCode = 13;	
			tab = true;
		}
		if (event.keyCode == 13){		
			this.owner.nextCtrl(this);
			return false;
		}else if (event.keyCode == 27)
		{		
			this.owner.prevCtrl(this);
		}
			
		if (tab)	
			return false;		
		else
			return true;
	}
	
});