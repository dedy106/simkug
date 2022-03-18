//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_button = function(owner,options){
    if (owner)
    {
		this.withImage = false;
		this.color = "#57A9FF";//62b4c3 "#f6b354";
		this.borderColor = "#57A9FF";//417983"#d98815";
		this.fontColor = "#ffffff";//system.getConfig("form.button.fontColor");
        window.portalui_button.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_button";	
		this.owner = owner;				
        this.setWidth(73);
        this.setHeight(20);	
        this.mode = 1;
        this.caption = "Button";
		this.glyph = "";
		this.icon = "";
        this.onClick = new portalui_eventHandler();
		this.hint = "Button";
		this.showHint = false;		
		this.tabStop = true;
		this.enable = true;
		
		if (options !== undefined){				
			this.updateByOptions(options);
			if (options.caption) this.setCaption(options.caption);
			if (options.color) this.setColor(options.color);				
			if (options.borderColor) this.setBorderColor(options.borderColor);				
			if (options.fontColor) this.setFontColor(options.fontColor);				
			if (options.withImage) this.setWithImage(options.withImage);
			if (options.icon) this.setIcon(options.icon);				
			if (options.enable) this.setEnabled(options.enable);	
			if (options.showHint) this.setShowHint(options.showHint);	
			if (options.click) {
                if (typeof options.click == "string")
                    this.onClick.set(this.getTargetClass(),options.click);
                else if (this.onClick.isFunction(options.click))
					this.onClick.set(undefined, options.click);
                else 
					this.onClick.set(options.click[0],options.click[1]);
            }
		}
    }
};
window.portalui_button.extend(window.portalui_control);
window.button = window.portalui_button;
//---------------------------- Function ----------------------------------------
window.portalui_button.implement({
	doDraw: function(canvas){
		try{	    
			//canvas.style.backgroundImage ="url(image/whitegradsmalltop.png)";//url(icon/dynpro/button.png)
			canvas.style.backgroundPosition = "top left";			
			canvas.style.border = "1px solid "+this.borderColor;
			canvas.style.backgroundColor = this.color;		
			canvas.style.cursor = "pointer";
		    var n = this.getFullId();    		
		    var html = "<div id='" + n + "_icon' style='{position: absolute; left: 2; top: 1; width: 100%; height : 100%;cursor: pointer}'></div>" + 
					 "<div id='"+n+"_shadow' style='{display:none;position:absolute;left:0;top:0;height:100%;width:100%}'>"+
					 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
					 	" position:absolute;left:0;top:-8;width:100%;height:8;}'></div>"+
					 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
					 	" position:absolute;left:-8;top:-8;width:8;height:37;}'></div>"+		
					 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
					 	" position:absolute;left:0;top:100%;width:100%;height:10;}'></div>"+				
					 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
					 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
					 "</div>"+					 					 
		             //"<div style='{background:#ffffff;position:absolute;left:0;top:0;height:10;width:100%;filter:alpha(opacity:50);opacity:0.5;moz-opacity:0.5}'></div>"+
					 "<div id='" + n + "_caption' style='{font-style:bold,cursor:pointer;position: absolute; left: 0; top: 3; width: 100%; height : 100%;color:"+this.fontColor+";}' align='center'>Button</div>" +
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7;display: none; position: absolute; left: -1; top:-1; width: 103%; height: 115%;cursor:default}' ></div>";	    
			this.setInnerHTML(html, canvas);
			
			eventOn(canvas,"mouseover","$$(" + this.resourceId + ").eventMouseOver(event);");
			eventOn($(n+"_caption"),"mousedown","$$(" + this.resourceId + ").eventMouseDown(event);");
			eventOn(canvas,"mousemove","$$(" + this.resourceId + ").eventMouseMove(event);");
			eventOn(canvas,"mouseout","$$(" + this.resourceId + ").eventMouseOut(event);");
			eventOn($(n+"_caption"),"click","$$(" + this.resourceId + ").eventMouseClick(event);");
			eventOn($(n+"_caption"),"keydown","$$(" + this.resourceId + ").doElKeyDown(event);");			
            
		   
			this.canvas = canvas;
			this.captionFrame = $(n+"_caption");
			this.iconFrame = $(n+"_icon");
			this.shadow = $(n+"_shadow");
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");				
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			}
		}catch(e){
			systemAPI.alert(this+"$doDraw()",e);
		}
	},
	eventMouseOver: function(event){
	    if (!this.withImage)
			this.getCanvas().style.backgroundColor = "#3197ed";		
		this.shadow.style.display = "";
	},
	eventMouseOut: function(event){	    
	    var canvas = this.getCanvas();    
	    //canvas.style.backgroundPosition = "bottom left";
		if (!this.withImage)
			canvas.style.backgroundColor = this.color;		
		this.shadow.style.display = "none";		
	},
	eventMouseDown: function(event){
		if (!this.withImage)
			this.getCanvas().style.backgroundColor = "#469da4";		
		this.shadow.style.display = "";
		this.getForm().setActiveControl(this);
	},
	setColor: function(data){
		try{
			this.color = data;
			this.getCanvas().style.backgroundColor = data;			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setBorderColor: function(data){
		try{
			this.borderColor = data;			
			this.getCanvas().style.border = "1px solid " +data;			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	eventMouseClick: function(event){		
	    this.onClick.call(this);
		//this.setFocus();
	},
	doKeyUp: function(keyCode, buttonState){	
	},
	doElKeyDown: function(event){	
	},
	doKeyDown: function(charCode, buttonState, keyCode){				
		if (keyCode == 13)
		{
			this.setFocus();		
			this.onClick.call(this);
            this.owner.nextCtrl(this);			
		}else if (keyCode == 9){				
			this.owner.nextCtrl(this);
		}else if (keyCode == 27){				
		    this.setFocus();
			this.owner.prevCtrl(this);
		}
		return false;
	},
	doSetFocus: function(){		
		this.canvas.style.border = "2px solid "+ this.borderColor;
	},
	doLostFocus: function(){
		this.canvas.style.border = "1px solid "+ this.borderColor;
	},
	getMode: function(){
		return this.mode;
	},
	setMode: function(mode){	    
	},
	doThemesChange: function(themeName){		
	},	
	setHeight: function(data){	
		try{
            //if (data == 20) data = document.all ? 20 : 18;
    		window.portalui_button.prototype.parent.setHeight.call(this, data);
    		var node = $(this.getFullId()+"_shadBottom");
    		if (node !== undefined && node !== null) node.style.top = data;
		}catch(e){
		  systemAPI.alert(this+"$setHeight("+this.name+")",e);
        }            
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){
	    if (this.caption != data)
	    {
	        this.caption = data;
			if (this.captionFrame != undefined)				
				this.captionFrame.innerHTML = ( this.withImage ? "&nbsp;&nbsp;&nbsp;" : "")+data;				
			else {
				var node = $(this.getFullId() + "_caption");
				if (node != undefined && node !== null) node.innerHTML = ( this.withImage ? "&nbsp;&nbsp;&nbsp;" : "")+data;					
			}			
	    }
	},
	setIcon: function(data){
		if (data.search("url") == -1)
			this.icon = "url("+data+")";
		else this.icon = data;		
		if (this.iconFrame != undefined)
			this.iconFrame.style.background = this.icon+" 0 0 no-repeat ";
		else {
			var node = $(this.getFullId() +"_icon");
			if (node != undefined) node.style.background = this.icon+" 0 0 no-repeat ";
			this.iconFrame = node;
		}		
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){				
			DD_belatedPNG.fixPng(this.iconFrame);
		}
	},
	setGlyph: function(data){
		this.glyph = data;
		var node = $(this.getFullId());
		node.style.background = data+" 0 0 no-repeat ";
	},
	getGlyph: function(){
		return this.glyph;
	},
	eventMouseMove: function(event){
		if (this.showHint)
			window.system.showHint(event.clientX, event.clientY, this.hint,true);
	},
	setShowHint: function(data){
		this.showHint = data;
	},
	getShowHint: function(){
		return this.showHint;
	},
	setEnabled: function(data){
		this.enable = data;
		$(this.getFullId() + "_block").style.display = data ? "none": "";	
	},
	setWithImage: function(data){
		this.withImage = data;	
		var cnv = $(this.getFullId()+"_shadow");
		if (data)
			cnv.style.display = "";
		else
			cnv.style.display = "none";
		cnv = this.getCanvas();
		if (data)
			cnv.style.background = "url(image/themes/"+system.getThemes()+"/btn.png) 0 0 no-repeat";	
	},
	click: function(){
		this.onClick.call(this); 
	},
	setFontColor: function(data){
		this.fontColor = data;
		this.captionFrame.style.color = data;
 	}
});
