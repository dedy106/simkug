//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
if (window.ttHurufBesar == undefined) window.ttHurufBesar = 3;
if (window.ttUpperCase == undefined) window.ttUpperCase = 3;
if (window.ttHurufKecil == undefined) window.ttHurufKecil = 4;
if (window.ttLowerCase == undefined) window.ttLowerCase = 4;

window.portalui_saiLabelEdit = function(owner, options){
    if (owner){
		try{
            this.stateRO 	= "";
	        this.text 		= "";
	  		this.caption 	= "saiLabettl";
	  		this.labelWidth = 100;
	  		this.type 		= "text";
	  		this.color      = system.getConfig("text.normalBgColor");
	  		this.fontColor  = system.getConfig("text.normalColor");
	  		this.alignment  = window.alLeft;
	  		this.isFocused = false;
			this.withPetik = false;
	  		this.lengthChar = 0;
	  		this.lblPosition = 0;
	  		window.portalui_saiLabelEdit.prototype.parent.constructor.call(this, owner, options);
	        this.className = "portalui_saiLabelEdit";
            window.portalui_saiLabelEdit.prototype.parent.setWidth.call(this,200);
		    window.portalui_saiLabelEdit.prototype.parent.setHeight.call(this,20);
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
	  		this.rightBtn = false;
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
				if (options.maxLength !== undefined) this.setLength(options.maxLength);										
				if (options.change !== undefined) this.onChange.set(options.change[0],options.change[1]);
				if (options.keyDown !== undefined) this.onKeyDown.set(options.keyDown[0],options.keyDown[1]);
				if (options.keyPress !== undefined) this.onKeyPress.set(options.keyPress[0],options.keyPress[1]);
				if (options.enter !== undefined) this.onEnter.set(options.enter[0],options.enter[1]);
				if (options.exit !== undefined) this.onExit.set(options.exit[0],options.exit[1]);							
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.text !== undefined) this.setText(options.text); 				
				if (options.lblPosition !== undefined) this.setLabelPosition(options.lblPosition);
				if (options.allowQuote !== undefined) this.withPetik = options.allowQuote;	
				if (options.placeHolder != undefined) this.setPlaceHolder(options.placeHolder);			
			}
		}catch(e){
			systemAPI.alert("labelEdit$Construct()",e);
		}
    }
};
window.portalui_saiLabelEdit.extend(window.portalui_control);
window.saiLabelEdit = window.portalui_saiLabelEdit;
window.portalui_saiLabelEdit.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();

	    canvas.style.background = "";
	    //canvas.style.overflow = "hidden";
		var lebar = this.width-this.labelWidth;
		var bottm = this.height-4;
		var html = "";
		if (document.all)
			html =   "<div id='"+n+"_border' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				"> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 2; left:0;font-size:11;width:100%;height:18px;}' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				">"+this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.7);opacity:0.7;moz-opacity:0.7;border:1px solid #ff9900}'>"+
				"</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+"  value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:19px;font-size:11;font-family:Arial;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:1;background:"+this.color+";border-width:1;"+
				"text-align:"+this.alignment+";}' "+
				"onkeypress= 'return $$("+this.resourceId+").eventkeypress(event);' "+
				"onkeyup= 'return $$("+this.resourceId+").eventkeyup(event);' "+
				"onkeydown= 'return $$("+this.resourceId+").eventkeydown(event);' "+
				"onblur = '$$("+this.resourceId+").doExit();' "+
				"onchange = '$$("+this.resourceId+").doChange();' "+
				"onfocus = '$$("+this.resourceId+").doFocus();' "+
				"onmouseover = '$$("+this.resourceId+").eventMouseOver(event);' "+			
				"onmouseout = '$$("+this.resourceId+").eventMouseOut(event);' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				"/></div>";	   
		else 
		  html =   "<div id='"+n+"_border' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				"> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 2; left:0;font-size:11;width:100%;height:18px;}' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				">"+this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3;position:absolute;top:0;left:"+this.labelWidth+";width:"+lebar+";height:20px}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:0;top:-7;width:100%;height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:-8;top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:0;top:100%;width:100%;height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+"  value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:19px;font-size:11;font-family:Arial;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:1;background:"+this.color+";border-width:1;"+
				"text-align:"+this.alignment+";}' "+
				"onkeypress= 'return $$("+this.resourceId+").eventkeypress(event);' "+
				"onkeydown= 'return $$("+this.resourceId+").eventkeydown(event);' "+
				"onkeyup= 'return $$("+this.resourceId+").eventkeyup(event);' "+
				"onblur = '$$("+this.resourceId+").doExit();' "+
				"onchange = '$$("+this.resourceId+").doChange();' "+
				"onfocus = '$$("+this.resourceId+").doFocus();' "+
				"onmouseover = '$$("+this.resourceId+").eventMouseOver(event);' "+			
				"onmouseout = '$$("+this.resourceId+").eventMouseOut(event);' "+
				"onmousemove = '$$("+this.resourceId+").eventMouseMove(event);' "+
				"/></div>";	   
		this.setInnerHTML(html);
		this.input = $(this.getFullId() +"_edit");	
		this.shadow = $(this.getFullId() +"_shadow");	
        this.label = $(this.getFullId() +"_label");			
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
				/*var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");				
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);*/
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
		if ( this.tipeText == window.ttNilai )
			this.input.value = RemoveTitik(this.getText());
		this.input.style.background = system.getConfig("text.focus");		
		this.shadow.style.display = "";
		this.isFocused = true;		
		this.getForm().setActiveControl(this);	
		setCaret(this.input,0,this.input.value.length);
	//this.doSet
	},	
	eventMouseOut: function(){		
		if (this.isFocused)
		{
			this.input.style.background = system.getConfig("text.focus");
			if (document.all)
				this.input.color = system.getConfig("text.normalColor");
			else
				this.input.style.color = system.getConfig("text.normalColor");
			this.shadow.style.display = "";
		}else {
			this.input.style.background = this.color;//system.getConfig("text.normalBgColor");
			if (document.all)
				this.input.color = this.fontColor;
			else
				this.input.style.color = this.fontColor;//system.getConfig("text.normalColor");		
			this.shadow.style.display = "none";
		}
	},
	eventMouseMove: function(event){		
	},
	eventMouseOver: function(event){
		try{		
			if (this.isFocused)
			{
				this.input.style.background = system.getConfig("text.focus");
				if (document.all)
					this.input.color = system.getConfig("text.normalColor");
				else
					this.input.style.color = system.getConfig("text.normalColor");
			}else {
				this.input.style.background = system.getConfig("text.overBgColor");
				if (document.all)				
					this.input.color = system.getConfig("text.overColor");
				else
					this.input.style.color = system.getConfig("text.overColor");
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
		this.input.style.background = this.color;
		if (document.all)
			this.input.color = this.fontColor;
		else
			this.input.style.color = this.fontColor;			
		this.onExit.call(this);  	
		this.shadow.style.display = "none";		
	},
	doChange: function(sender){
		this.onChange.call(this);  
	},
	doLostFocus: function(){	
		try{			
			window.portalui_saiLabelEdit.prototype.parent.doLostFocus.call(this);
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
			systemAPI.alert(this+"$doLostFocus("+this.name+")",e);
		}
	},
	blur: function(){
		try{
			this.input.blur();
			this.shadow.style.display = "none";			
		}catch(e){
			systemAPI.alert("saiLabelEdit:blur:",e);
		}
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
			if (data === undefined || data == "undefined" ) data = "";
			this.text = data;
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
		    if (this.input === undefined) this.input = $(this.getFullId()+"_edit");
			this.password = data;   	
		    if (this.password)
				this.type = "password";		   
		    else this.type = "text";		   		    
		    if (this.input === undefined || this.input === null) return;
			if (document.all){	
                var input2= this.input.cloneNode(false); 
				input2.type= this.type; 
				this.input.parentNode.replaceChild(input2,this.input); 
				this.input = input2;
			}else this.input.type = this.type;	
		}catch(e){
			systemAPI.alert(this+"$setPassword("+this.name+")",e);
		}
	},
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		try{		
			this.readOnly = data;    
			//this.tabStop = !this.readOnly;		
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
			systemAPI.alert(this+"readonly:",e);
		}
	},
	setWidth: function(data){
	   try{    		
    		window.portalui_saiLabelEdit.prototype.parent.setWidth.call(this,data); 
    		var width = this.width - this.labelWidth;
    		width = width < 0 ? 0 : width;
    		if (this.input !== undefined )this.input.style.width = width;
    		if (this.shadow !== undefined)this.shadow.style.width = width;
  		}catch(e){
  		    systemAPI.alert(this+"#setwidth("+this.name+")",e);
  		}
	},
	setLabelWidth: function(data){
	    try{
    		this.labelWidth = data;
    		var width = this.width - this.labelWidth;
    		width = width < 0 ? 0 : width;
    		if (this.label !== undefined) this.label.style.width = data;
    		if (this.input !== undefined)this.input.style.left = data;
    		if (this.shadow !== undefined)this.shadow.style.left = data;
    		if (this.shadow !== undefined)this.shadow.style.width = width;
    		if (this.input !== undefined)this.input.style.width = width;
   		}catch(e){
  		    systemAPI.alert(this+"#setLabelwidth("+this.name+")",e);
  		}
	},
	setCaption: function(data){
		this.caption = data;
		if (this.label !== undefined) this.label.innerHTML = data;
	},
	getCaption: function(){
		return this.caption;
	},
	setAlignment: function(data){
		try{
			this.alignment = data;
			var editObj = this.input;
			if(editObj != undefined){
				editObj.style.textAlign = this.alignment;
			}			
		}catch(e){
			systemAPI.alert(this+"#setAlignment("+this.name+")",e);
		}
	},
	setTipeText: function(data){
		this.tipeText = data;
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
		}catch(e)
		{
			systemAPI.alert(this+"#setType",e);
		}
	},
	setLength: function(data){
		this.lengthChar = data;
		if (data > 0) this.input.maxLength = data;
	},
	setColor: function(data){
	    this.color = data;
	    var editObj = this.input;
		if(editObj != undefined)
			editObj.style.background = data;		  	
	},
	setFontColor: function(data){
	    this.fontColor = data;
	    var editObj = this.input;
		if(editObj != undefined)
	      editObj.style.color = data;		  	        
	},
	getColor: function(){
		return this.color;
	},
	eventkeyup: function(event){		
		
	},
	eventkeypress: function(event){		
		try{						
			var charCode = undefined,keyCode = systemAPI.browser.msie ? event.keyCode:event.charCode;
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
			systemAPI.alert(this+"#keyPress#"+e);
		}	
	},
	eventkeydown: function(event){			
		try{
			this.buttonState.set(event);
			var ret = this.onKeyDown.call(this, event.keyCode, this.buttonState);
			if (ret != undefined ) return ret;
			var tab = false;					
			if (event.keyCode == 9){	
				tab = true;
				return true;
			}
			if (event.keyCode == 13 || tab){	
				if (this.autoComplete){									
					this.invokeEvent("keyDown",this,event.keyCode);
				}		
				this.owner.nextCtrl(this);
				return false;
			}else if (event.keyCode == 27){		      
				this.input.blur();  
				this.owner.prevCtrl(this);			
				return false;			
			}		
			if (tab)	
				return false;		
			else
				return true;
		}catch(e){
			alert(e);
		}
	},
	setLabelPosition: function(data){
	    try{
    	    this.lblPosition = data;    	        	    
            switch(data){
                case 0 :
                    var width = this.width - this.labelWidth;
                    width = width < 0 ? 0 : width;
                    this.input.style.top = 0;
                    this.input.style.left = this.labelWidth;
                    this.input.style.width = width;                
                    this.label.style.left = 0;
                    this.label.style.width = this.labelWidth;
                    this.label.style.background = "url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x";
                    this.shadow.style.top = 0;
                    this.shadow.style.left = this.labelWidth;
                    this.shadow.style.width = width;
                break;
                case 1 : 
                    this.input.style.top = 20;
                    this.input.style.left = 0;
                    this.input.style.width = this.width;
                    this.label.style.left = 0;
                    this.label.style.width = this.width;
                    this.label.style.background = "";
                    this.shadow.style.top = 20;
                    this.shadow.style.left = 0;
                    this.shadow.style.width = this.width;
                break;
            }
         }catch(e){
  		    systemAPI.alert(this+"#setLabelPosition("+this.name+")",e,true);
  		 }
    },
    setPlaceHolder : function(data){
    	if (data){
			this.input.setAttribute("placeholder",this.caption);
			this.label.style.display = "none";
			this.input.style.width = this.width;    		
			this.input.style.left = 0;
    	}else {
    		this.input.setAttribute("placeholder","");
			this.label.style.display = "";
			this.input.style.left = this.labelWidth;
			this.input.style.width = this.width - this.labelWidth;    		
    	}
    }
});
