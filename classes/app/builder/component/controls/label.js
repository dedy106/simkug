//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at												
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_label= function(owner, options){
	try{
		if (owner){
			uses("portalui_font");
			this.fnt = new portalui_font();			
			window.app_builder_component_controls_label.prototype.parent.constructor.call(this, owner, options);
			window.app_builder_component_controls_label.prototype.parent.setHeight.call(this, 20);
			this.className = "portalui_label";
			this.caption = "Label";
			this.alignment = alLeft;			
			this.fnt.onChange.set(this, "fontChange");
			this.color = "#000000";
			this.underLine = false;
			this.onClick = new portalui_eventHandler();
			this.autoWidth = false;
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.caption!== undefined) this.setCaption(options.caption);						
				if (options.color !== undefined) this.setColor(options.color);				
				if (options.underline !== undefined) this.setUnderLine(options.underline);
				if (options.autoWidth !== undefined) this.setAutoWidth(options.autoWidth);
				if (options.click !== undefined) this.onClick.set(options.click[0],options.click[1]);				
				if (options.fontColor !== undefined) this.setFontColor(options.fontColor);				
				if (options.fontSize !== undefined) this.setFontSize(options.fontSize);	
				if (options.bold !== undefined) this.fnt.setBold(options.bold);	
			}
		}
		this.addProperty({className:this.className,caption:this.caption, color:this.color, underLine:this.underLine, autoWidth:this.autoWidth, fontColor:this.fontColor, fontSize:this.fontSize, bold:this.bold, alignment:this.alignment});	
		this.addEvent({click:""});
	}catch(e)
	{
		alert("[label]::create:"+e);
	}
};
window.app_builder_component_controls_label.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_label.implement({
	doDraw: function(canvas){
	    canvas.style.overflow = "hidden";
	    var n = this.getFullId();		
	    var html =  "<span id='" + n + "_caption' style='{width:auto;height:auto;position:absolute;left:0,top:0}'"+
						" onClick = 'window.system.getResource("+this.resourceId+").doclick(event);'"+
						">Label</span>" +
	                "<div id='" + n + "_frame' style='{background: url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width: 100%; height: 100%;display:none}' "+	
					" onClick='window.system.getResource("+this.resourceId+").doclick(event);'"+
					"></div>";
	                    
	    this.setInnerHTML(html, canvas);
	    this.fnt.apply(canvas);		
	},	
	fontChange: function(sender){
	    var n = this.getFullId();
	    var node =  $(n + "_caption");    
		this.fnt.apply(node);
	},
	doclick: function(sender){	
		this.onClick.call(this);
	},
	getAlignment: function(){
		return this.alignment;
	},
	setAlignment: function(data){
	    if (this.data != data){
	        this.alignment = data;
			this.setProperty("alignment",data);
	        var n = this.getFullId();
	        var node =  $(n + "_caption");
	        node.style.textAlign = data;	                    
	    }
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){
	    if (this.caption != data){	        
			this.caption = trim(data);
	        this.setProperty("caption",data);
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
		this.setProperty("color",data);
		var node =  $(n + "_caption");	
		if (node != undefined)
			node.style.backgroun = data;
	},
	setUnderLine: function(data){
		this.underLine = data;
		this.setProperty("underLine",data);
		var cnv = $(this.getFullId() +"_frame");
		if ((this.underLine) && (cnv != undefined))
			cnv.style.display = "";
		else cnv.style.display = "none"; 
	},
	setLineText: function(data){	
		var node =  $(this.getFullId() + "_caption");			
		if (node != undefined){
			if (data || data == undefined)
				node.style.borderBottom = "1px solid #0000ff";
			else node.style.borderBottom = "";
		}		
	},
	setAutoWidth: function(data){
		this.autoWidth = data;
		this.setProperty("autoWidth",data);
	},
	setFontColor: function(data){
		this.fontColor = data;
		this.setProperty("fontColor",data);
		this.fnt.setColor(data);		
	},
	setFontSize: function(data){
		this.fontSize = data;
		this.setProperty("fontSize",data);
		this.fnt.setSize(data);
	},
	setBold: function(data){
		this.bold = data;
		this.setProperty("bold",data);
		this.fnt.setBold(data);
	}
});