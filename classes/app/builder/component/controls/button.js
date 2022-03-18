//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_button = function(owner, options){
    if (owner)
    {
		this.withImage = false;
		this.color = "#ff9900";
		this.fontColor = system.getConfig("form.button.fontColor");
        window.app_builder_component_controls_button.prototype.parent.constructor.call(this, owner,options);
        this.className = "portalui_button";	
		this.owner = owner;				
        window.app_builder_component_controls_button.prototype.parent.setWidth.call(this, 73);
        window.app_builder_component_controls_button.prototype.parent.setHeight.call(this, 18);	
        this.mode = 1;
        this.caption = "Button";
		this.glyph = "";
		this.icon = "";        
		this.hint = "Button";
		this.showHint = false;		
		this.tabStop = true;
		this.enabled = true;
		if (options !== undefined){
			this.updateByOptions(options);			
			if (options.caption!== undefined) this.setCaption(options.caption);
		}
		this.addProperty({className:this.className,caption:this.caption,icon:this.icon, color:this.color, fontColor:this.fontColor, tabStop:true, enable:true, withImage:false});	
		this.addEvent({click:""});
    }
};
window.app_builder_component_controls_button.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_button.implement({
	doDraw: function(canvas){
		try{	    
			canvas.style.background ="";
			canvas.style.borderLeft = "1px solid #ffffff";canvas.style.borderTop = "1px solid #ffffff";		
			canvas.style.borderBottom = "1px solid #555555";canvas.style.borderRight = "1px solid #555555";					
			canvas.style.backgroundColor = this.color;		
			//canvas.style.cursor = "pointer";
		    var n = this.getFullId();    		
		    var html = "<div id='" + n + "_icon' style='{position: absolute; left: 2; top: 1; width: 100%; height : 100%;}'></div>" + 					 
		             "<div id='" + n + "_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background-color:#ffffff;position:absolute;left:0;top:0;height:10;width:100%;filter:alpha(opacity:30);opacity:0.3;moz-opacity:0.3}'></div>"+								
					"</div>"+
					"<div id='" + n + "_caption' style='{position: absolute; left: 0; top: 3; width: 100%; height : 100%;color:"+this.fontColor+";} '"+					 		
					 " align='center'>Button</div>" +
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7;display: none; position: absolute; left: 0; top: 0; width: 101%; height: 110%}' ></div>";	    
			this.setInnerHTML(html, canvas);
			this.canvas = canvas;
			this.captionFrame = $(n+"_caption");
			this.iconFrame = $(n+"_icon");
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");				
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			}
		}catch(e){
			systemAPI.alert(e +"\n"+html);
		}
	},
	setColor: function(data){
		this.color = data;
		this.setProperty("color",data);
		this.getContainer().style.backgroundColor = data;
	},	
	getMode: function(){
		return this.mode;
	},
	setMode: function(mode){
	    if ((this.mode != mode) && (mode >= 1) && (mode <= 3))
	    {
	        this.mode = mode;	        
	        var canvas = this.getContainer();	        
	        switch (this.mode)
	        {
	            case 1 :
	                    canvas.style.width = 73;
	                    canvas.style.height = 21;
	                    break;
	            case 2 :
	                    canvas.style.width = 50;
	                    canvas.style.height = 18;
	                    break;
	            case 3 :
	                    canvas.style.width = 50;
	                    canvas.style.height = 18;
	                    break;
	        }	        	 
	    }
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){		
	    if (this.caption != data)
	    {
	        this.caption = data;
			this.setProperty("caption",data);
			if (this.captionFrame != undefined)
				this.captionFrame.innerHTML = "&nbsp;&nbsp;&nbsp;"+data;
			else {
				var node = $(this.getFullId() + "_caption");
				if (node != undefined) node.innerHTML = "&nbsp;&nbsp;&nbsp;"+data;
			}			
	    }
	},
	setIcon: function(data){
		this.icon = data;
		this.setProperty("icon",data);
		if (this.iconFrame != undefined)
			this.iconFrame.style.background = data+" 0 0 no-repeat ";
		else {
			var node = $(this.getFullId() +"_icon");
			if (node != undefined) node.style.background = data+" 0 0 no-repeat ";
			this.iconFrame = node;
		}		
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){				
			DD_belatedPNG.fixPng(this.iconFrame);
		}
	},
	setShowHint: function(data){
		this.showHint = data;
	},
	getShowHint: function(){
		return this.showHint;
	},
	setEnabled: function(data){
		this.enabled = data;
		this.setProperty("enabled",data);
		var node = $(this.getFullId() + "_block");
		if (data)
		{
			if (node != undefined)
	        node.style.display = "none";
		} else
		{
			if (node != undefined)
	        node.style.display = "";
		}
	},
	setWithImage: function(data){
		this.withImage = data;	
		this.setProperty("withImage",data);
		var cnv = $(this.getFullId()+"_shadow");
		if (data)
			cnv.style.display = "";
		else
			cnv.style.display = "none";
		cnv = this.getContainer();
		if (data)
			cnv.style.background = "url(image/themes/"+system.getThemes()+"/btn.png) 0 0 no-repeat";	
	},
	click: function(){
		this.onClick.call(this); 
	},
	setFontColor: function(data){
		this.fontColor = data;
		this.setProperty("fontColor",data);
		this.captionFrame.style.color = data;
	},
	makeRound: function(){
		settings = {
		  tl: { radius: 1 },
		  tr: { radius: 1 },
		  bl: { radius: 1 },
		  br: { radius: 1 },
		  antiAlias: true,
		  autoPad: true,
		  validTags: ["div"]
	    };		
		var rounded = new curvyCorners(settings,this.canvas);				
		rounded.applyCornersToAll();		
	}
});
