//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_glassButton = function(owner,options){
    if (owner)
    {
		this.withImage = false;
		this.color = system.getConfig("form.button.color");//"#57A9FF";//62b4c3 "#f6b354";
		this.hoverColor = "#ffffff";//417983"#d98815";
		this.fontColor = "#ffffff";//system.getConfig("form.button.fontColor");
        window.portalui_glassButton.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_glassButton";	
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
			if (options.hoverColor) this.setHoverColor(options.hoverColor);				
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
window.portalui_glassButton.extend(window.portalui_control);
window.glassButton = window.portalui_glassButton;
//---------------------------- Function ----------------------------------------
window.portalui_glassButton.implement({
	doDraw: function(canvas){
		try{	    
			canvas.style.color = this.color;		
			canvas.style.cursor = "pointer";
			canvas.style.overflow = "hidden";
		    var n = this.getFullId();    		
		    var html = "<div id='" + n + "_icon' style='{position: absolute; left: 2; top: 1; width: 100%; height : 20;cursor: pointer}'></div>" + 
					 	"<div id='" + n + "_caption' style='{font-style:bold,cursor:pointer;position: absolute; left: 25; top: 3; width: 100%; height : 14px}' align='left'>Button</div>" +
					   "<div id='" + n + "_block' style='{background:transparent; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7;display: none; position: absolute; left: -1; top:-1; width: 103%; height: 115%;cursor:default}' ></div>";	    
			this.setInnerHTML(html, canvas);
			eventOn(canvas,"mouseover","$$(" + this.resourceId + ").eventMouseOver(event);");
			eventOn(canvas,"mousedown","$$(" + this.resourceId + ").eventMouseDown(event);");
			eventOn(canvas,"mousemove","$$(" + this.resourceId + ").eventMouseMove(event);");
			eventOn(canvas,"mouseout","$$(" + this.resourceId + ").eventMouseOut(event);");
			eventOn(canvas,"click","$$(" + this.resourceId + ").eventMouseClick(event);");
			eventOn(canvas,"keydown","$$(" + this.resourceId + ").doElKeyDown(event);");			
            
		   
			this.canvas = canvas;
			this.captionFrame = $(n+"_caption");
			this.iconFrame = $(n+"_icon");
			
		}catch(e){
			systemAPI.alert(this+"$doDraw()",e);
		}
	},
	eventMouseOver: function(event){
	    this.getCanvas().style.color = this.hoverColor;
	    this.getCanvas().style.fontWeight = 'bold';
	},
	eventMouseOut: function(event){	    
	    var canvas = this.getCanvas();    
	    this.getCanvas().style.color = this.color;
	    this.getCanvas().style.fontWeight = '';
	},
	eventMouseDown: function(event){
		this.getForm().setActiveControl(this);
	},
	setColor: function(data){
		try{
			this.color = data;
			this.getCanvas().style.color = data;			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setHoverColor: function(data){
		try{
			this.hoverColor = data;	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	eventMouseClick: function(event){		
	    this.onClick.call(this);
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
		this.canvas.style.fontStyle = "bold";
	},
	doLostFocus: function(){
		this.canvas.style.fontStyle = "";
	},
	doThemesChange: function(themeName){		
	},	
	setHeight: function(data){	
		try{
            window.portalui_glassButton.prototype.parent.setHeight.call(this, data);
    		$(this.getFullId()+"_icon").style.top = data / 2 - 9;
    		$(this.getFullId()+"_caption").style.top = data / 2 - 7;
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
				this.captionFrame.innerHTML = data;				
			else {
				var node = $(this.getFullId() + "_caption");
				if (node != undefined && node !== null) node.innerHTML = data;					
			}			
	    }
	},
	setIcon: function(data){
		if (data.search("url") == -1)
			this.icon = "url("+data+")";
		else this.icon = data;	

		if (this.iconFrame != undefined)
			;//this.iconFrame.style.background = this.icon+" 0 0 no-repeat ";
		else {
			var node = $(this.getFullId() +"_icon");
			//if (node != undefined) node.style.background = this.icon+" 0 0 no-repeat ";
			this.iconFrame = node;
		}	
		this.iconFrame.innerHTML = '<img id="'+this.getFullId()+'_img'+'" width=20 height=20 src="'+data+'"/>';
		this.iconFrame.style.top = (this.height / 2) - 10;
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){				
			DD_belatedPNG.fixPng($(this.getFullId()+"_img"));
		}
	},
	setGlyph: function(data){
		this.glyph = data;
		var node = $(this.getFullId() +"_icon");
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
			
	},
	click: function(){
		this.onClick.call(this); 
	},
	setFontColor: function(data){
		this.fontColor = data;
		this.captionFrame.style.color = data;
 	}
});
