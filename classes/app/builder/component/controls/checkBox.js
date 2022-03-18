//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_checkBox = function(owner,options){
    if (owner)
    {
        window.app_builder_component_controls_checkBox.prototype.parent.constructor.call(this, owner,options);
        this.className = "portalui_checkBox";
		this.caption = "checkBox";
        window.app_builder_component_controls_checkBox.prototype.parent.setWidth.call(this, 13);
        window.app_builder_component_controls_checkBox.prototype.parent.setHeight.call(this, 13);        
        this.selected = false;        
        this.onChange = new portalui_eventHandler();        
		this.showHint = false;		
		this.addProperty({className:this.className,caption:this.caption,selected:this.selected, enabled:true});	
		this.addEvent({change:""});
    }
};
window.app_builder_component_controls_checkBox.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_checkBox.implement({
	doDraw: function(canvas){	    
	    var n = this.getFullId();
	    var html = "<div id='" + n + "_frame' style='{zIndex:2;cursor: pointer; position: absolute; left: 0; top: 0; width: auto; height: 100%}' " +
	                    ">"+
						"<div id='" + n + "_icon' style='{background-image:url(image/themes/"+system.getThemes()+"/checkBox.png);position : absolute; left: 0; top:0; width:13; height:13; }'></div>"+					
						"<div id='" + n + "_caption' style='{position : absolute; left: 14; top:0; width:auto; height:14; }'>"+					
						"<nobr> checkbox </nobr></div>"+
					"</div>"+
					"<div id='" + n + "_block' style='{zIndex:3;background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    
	    this.setInnerHTML(html, canvas);
		this.block = $(n+"_block");
		this.iconFrame = $(n+"_icon");
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
			DD_belatedPNG.fixPng(this.iconFrame);
		}	
	},
	setEnabled: function(data){
		this.enabled = data;
		this.setProperty("enabled",data);
		if (data)
			this.block.style.display = "none";
		else this.block.style.display = "";
	},
	doAfterLoad: function(){
	    window.app_builder_component_controls_checkBox.prototype.parent.doAfterLoad.call(this);
	    this.loading = true;
	    this.setSelected(this.selected);
	    this.loading = false;
	},
	isSelected: function(){
		return this.selected;
	},
	setSelected: function(data){
	    if ((this.selected != data) || this.loading)
	    {
	        this.selected = data;
			this.setProperty("selected",data);
	        var canvas = this.iconFrame;
	        if (this.selected)
	            canvas.style.backgroundPosition = "-13 0";
	        else
	            canvas.style.backgroundPosition = "0 0";        
	        this.onChange.call(this, this.selected);
	    }
	},
	setWidth: function(data){
		window.app_builder_component_controls_checkBox.prototype.parent.setWidth.call(this,data);
		var n = this.getFullId() +"_caption";
		var node = $(n);
		if (node != undefined)
			node.style.width = data;
		this.block.style.width = data;
	},	
	setCaption: function(data){
		this.caption = data;	
		this.setProperty("caption",data);
		var n = this.getFullId() +"_caption";
		var node = $(n);
		if (node != undefined)
			node.innerHTML = data;
	},
	getCaption: function(){
		return this.caption;
	}
});
