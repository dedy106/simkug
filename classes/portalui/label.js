//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at												
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_label= function(owner, options){
	try{
		if (owner){
			uses("portalui_font");
			this.fnt = new portalui_font();			
			window.portalui_label.prototype.parent.constructor.call(this, owner, options);
			window.portalui_label.prototype.parent.setHeight.call(this, 20);
			this.className = "portalui_label";
			this.caption = "Label";
			this.align = 1;			
			this.fnt.onChange.set(this, "fontChange");
			this.color = "#000000";
			this.underLine = false;
			this.onClick = new portalui_eventHandler();
			this.autoWidth = false;
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.caption) this.setCaption(options.caption);						
				if (options.color) this.setColor(options.color);				
				if (options.underline) this.setUnderLine(options.underline);
				if (options.autoWidth) this.setAutoWidth(options.autoWidth);
				if (options.click) {
                    if (typeof options.click == "string")
                        this.onClick.set(this.getTargetClass(),options.click);
                    else this.onClick.set(options.click[0],options.click[1]);	
                }
				if (options.fontColor) this.fnt.setColor(options.fontColor);				
				if (options.fontSize) this.fnt.setSize(options.fontSize);
				if (options.bold) this.fnt.setBold(options.bold);	
				if (options.italics) this.fnt.setItalics(options.italics);	
				if (options.alignment) this.setAlignment(options.alignment);
			}
		}
	}catch(e)
	{
		alert("[label]::create:"+e);
	}
};
window.portalui_label.extend(window.portalui_control);
window.label = window.portalui_label;
//---------------------------- Function ----------------------------------------
window.portalui_label.implement({
	doDraw: function(canvas){
	    //canvas.style.overflow = "hidden";
	    var n = this.getFullId();		
	    var html =  "<span id='" + n + "_caption' style='{width:100%;height:100%;position:absolute;left:0,top:0}'"+
						" onClick = 'window.system.getResource("+this.resourceId+").doclick(event);'"+
						">Label</span>" +
	                "<div id='" + n + "_frame' style='{background: url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width: 100%; height: 100%;display:none}' "+	
					" onClick='window.system.getResource("+this.resourceId+").doclick(event);'"+
					"></div>";
	                    
	    this.setInnerHTML(html, canvas);
	    this.fnt.apply(canvas);		
	    this.captionCanvas = $(n + "_caption"); 
	},	
	fontChange: function(sender){
	    var n = this.getFullId();
	    var node =  $(n + "_caption");    
		this.fnt.apply(node);
	},
	doclick: function(sender){	
		this.onClick.call(this);
	},
	getAlign: function(){
		return this.align;
	},
	setAlign: function(data){
	    if ((this.data != data) && (data >= 1) && (data <= 3)){
	        this.align = data;
	        var n = this.getFullId();
	        var node =  $(n + "_caption");
	        node.style.textAlign = data;	                    
	    }
	},
	getCaption: function(){
		return this.caption;
	},
	getCaptionRect: function(){
		var node =  $(n + "_caption");
		return {width:parseFloat(node.offsetWidth), height:parseFloat(node.offsetHeight)};
	},
	setCaption: function(data){
	    if (this.caption != data){	        
			this.caption = trim(data);
	        var n = this.getFullId();
	        var node =  $(n + "_caption");
	        if (node != undefined){
	        	node.innerHTML = trim(data);		
				if (this.autoWidth){
				  this.setWidth(parseInt(node.offsetWidth));
				}
			}
		}	
	},
	setColor: function(data){
		var n = this.getFullId();
		var node =  $(n + "_caption");	
		if (node != undefined)
			node.style.color=data;
	},
	setUnderLine: function(data){
		this.underLine = data;
		var cnv = $(this.getFullId() +"_frame");
		if ((this.underLine) && (cnv != undefined))
			cnv.style.display = "";
		else cnv.style.display = "none"; 
	},
	setLineText: function(data){	
		var node = $(this.getFullId() + "_caption");	
		if (node != undefined){
			if (data || data == undefined)
				node.style.borderBottom = "1px solid #0000ff";
			else node.style.borderBottom = "";
		}		
	},
	setWidth: function(data){
		window.portalui_label.prototype.parent.setWidth.call(this, data);
		//var node =  $(this.getFullId() + "_caption");	
		//if (node != undefined)
		//	node.style.width=data;
	},
	setAutoWidth: function(data){
		this.autoWidth = data;
	},
	setAlignment: function(data){
	   var node = $(this.getFullId() + "_caption");	
	   if (node != undefined) node.style.textAlign = data;
    }
});
