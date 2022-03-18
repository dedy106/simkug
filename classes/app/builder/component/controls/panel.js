//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_panel = function(owner, options){
    if (owner)
    {
        this.caption = "panel";
		window.app_builder_component_controls_panel.prototype.parent.constructor.call(this, owner, options);		
        this.className = "portalui_panel";
        this.owner = owner;
		this.bgColor = system.getConfig("form.panel.color");
		this.setBorder(1);
		this.scrolling = false;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.color !== undefined) this.setColor(options.color);						
			if (options.border !== undefined) this.setBorder(options.border);
			if (options.shadow !== undefined) this.setShadow(options.shadow);
			if (options.caption !== undefined) this.setCaption(options.caption);
		}
		this.addProperty({className:this.className,caption:this.caption,border:this.border, scroll:this.scrolling, color:this.bgColor,shadow:this.shadow});	
		this.addEvent({});
    }
};
window.app_builder_component_controls_panel.extend(window.app_builder_component_controls_containerControl);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_panel.implement({
	doDraw: function(canvas){
		var nd = canvas;
		nd.style.background = system.getConfig("form.panel.color");
		nd.style.overflow = "hidden";		
		var n = this.getFullId();
	    if (document.all)
	        html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<div id= '"+n+"_bottom' style='{position: absolute; left: 0; top: 100%; width: 100%; height: 100%; }' >" +
	                	"<div id='" + n + "_sBottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) top left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%}' ></div>" +
					"</div>"+					
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;color:#ffffff;padding-left:10px}'> </div>"+
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 5;display:none}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;display:none}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    else
	        html =  "<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +					
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;color:#ffffff;padding-left:10px}'> </div>"+
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 5;display:none'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;display:none}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    //nd.innerHTML = html;
		this.setInnerHTML(html, nd);
	},
	setScroll: function(data){
		this.scrolling=data;
		this.setProperty("scroll",data);
		var cnv = this.getClientCanvas();
		if (data)
			cnv.style.overflow="auto";
		else cnv.style.overflow="hidden";
	},
	setColor: function(data){
		this.bgColor = data;
		this.setProperty("color",data);
		var nd = this.getContainer();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorder: function(data){		
		try{
		    if (this.border != data){
		        var node = undefined;
				this.border = data;
				this.setProperty("border",data);
		        var n = this.getFullId();	       
		        switch (data)
		        {
		            case 0 : // none
		                    node = this.getContainer();	                    
		                    if (node != undefined){
		                        node.style.border = "";	                        	                    
							}
		                    break;
		            case 1 : // raised
		                    node = this.getContainer();
		                    if (node != undefined){
		                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
								node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
		                    }                    
		                    break;
		            case 2 : // lowered
		                    node = this.getContainer();
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.top");
								node.style.borderRight = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
		                    }	                    
		                    break;
					case 3 : // bordered
		                    node = this.getContainer();
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("nonborder.inner.right");
		                        node.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
								node.style.borderRight = window.system.getConfig("nonborder.inner.left");
		                        node.style.borderBottom = window.system.getConfig("nonborder.inner.top");
		                    }	                    
		                    break;
		        }
		    }
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setBorderColor: function(data, options){		
		node = this.getContainer();
		this.setProperty("borderColor",data);
		if (options == undefined){		
			if (node != undefined)
				node.style.border = data;	                        					
		}else{
			if (options.top) node.style.borderTop = data;
			if (options.left) node.style.borderLeft = data;
			if (options.right) node.style.borderRight = data;
			if (options.bottom) node.style.borderBottom = data;
		}
	},
	setCaption: function(data){
		this.caption = data;	
		this.setProperty("caption",data);
		if (this.caption != ""){
			var wdth = data.length * 6;
			var l = $(this.getFullId() + "_lcap");			
			//if (l != undefined)
			//	l.style.background = "url(image/themes/"+system.getThemes()+"/plheader.png) 0 0 no-repeat";
			var n = $(this.getFullId() + "_cap");
			if (n != undefined){				
				n.style.background = "url(image/tabBg.png) repeat-x";
				//n.style.left = 10;
				//n.style.width = wdth;
				n.innerHTML = "<div style='position:absolute;top:3;width:100%; height:100%;'><bold>"+data+" </bold></div>";
			}
			//var r = $(this.getFullId() + "_rcap");
			//if (r != undefined){
			//	r.style.background = "url(image/themes/"+system.getThemes()+"/prheader.png) 0 0 no-repeat";			
			//	r.style.left = wdth + 10;
			//}
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},	
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	},
	setShadow: function(data){
		this.shadow = data;
		this.setProperty("shadow",data);
		var cnv = $(this.getFullId() + "_bottom");
		if (cnv != undefined){
			if (data) cnv.style.display = "";
			else cnv.style.display = "none";
		}
	}
});