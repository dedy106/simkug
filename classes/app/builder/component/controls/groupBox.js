//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_groupBox = function(owner, options){
    if (owner)
    {
        this.caption = "";
		window.app_builder_component_controls_groupBox.prototype.parent.constructor.call(this, owner, options);		
        this.className = "portalui_groupBox";
        this.owner = owner;
		this.bgColor = system.getConfig("form.panel.color");
		this.setBorder(1);
		this.scrolling = false;
		if (options !== undefined){
			this.updateByOptions(options);					
			if (options.color !== undefined) this.setColor(options.color);				
			if (options.border !== undefined) this.setBorder(options.border);				
			if (options.caption !== undefined) this.setCaption(options.caption);							
		}
		this.addProperty({className:this.className,color:this.bgColor, borderStyle:this.borderStyle, caption:this.caption});	
		this.addEvent({});
    }
};
window.app_builder_component_controls_groupBox.extend(window.app_builder_component_controls_containerControl);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_groupBox.implement({
	doDraw: function(canvas){		
		var nd = canvas;		
		nd.style.overflow = "hidden";		
		var n = this.getFullId();
	    if (document.all)
	        html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +									
					"<div id='" + n + "_bordertop1' style='{position: absolute;left: 0;top: 10; width:10; height: 1;}'></div>"+								
					"<div id='" + n + "_bordertop2' style='{position: absolute;left: 0;top: 10; width:100%; height: 1;}'></div>"+								
					"<div id='" + n + "_border' style='{position: absolute;left: 0;top: 10; width:100%; height: 100%;}'>"+					
						"<div id='" + n + "form' style='{position: absolute; left: 10; top: 10; width: 100%; height: 100%;overflow:auto;}' ></div>"+
					"</div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;padding-left:10px}'> </div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    else
	       html =  	"<div id='" + n + "_bordertop1' style='{position: absolute;left: 0;top: 10; width:10; height: 1;}'></div>"+								
					"<div id='" + n + "_bordertop2' style='{position: absolute;left: 0;top: 10; width:100%; height: 1;}'></div>"+								
					"<div id='" + n + "_border' style='{position: absolute;left: 0;top: 10; width:100%; height: 100%;}'>"+					
						"<div id='" + n + "form' style='{position: absolute; left: 10; top: 10; width: 100%; height: 100%;overflow:auto;}' ></div>"+
					"</div>"+
					"<div id='" + n + "_cap' style='{background:transparent;position: absolute;left: 0;top: 0; width:100%; height: 20;padding-left:10px}'> </div>"+					
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";	    
		this.setInnerHTML(html, nd);
		this.form = $(n+"form");
		this.border = $(n+"_border");
		this.border1 = $(n+"_bordertop1");
		this.border2 = $(n+"_bordertop2");
		this.form.style.background = system.getConfig("form.panel.color");
	},
	setScroll: function(data){
		this.scrolling=data;
		var cnv = this.getClientCanvas();
		if (data)
			cnv.style.overflow="auto";
		else cnv.style.overflow="hidden";
	},
	setColor: function(data){
		this.bgColor = data;
		this.setProperty("color",data);
		var nd = this.border;		
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorderStyle: function(data){		
		this.setBorder(data);
	},
	setBorder: function(data){		
		try{
		    if (this.borderStyle != data){
		        var node = this.border;
				this.setProperty("borderStyle",data);
		        var n = this.getFullId();	       
		        switch (data)
		        {
		            case 0 : // none		                    
		                    if (node != undefined){
		                        node.style.border = "";	                        	                    
								this.border1.style.borderTop = "";
								this.border2.style.borderTop = "";
							}
		                    break;
		            case 1 : // raised		                    
		                    if (node != undefined){
		                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
								node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
		                        this.border1.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
								this.border2.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
		                    }                    
		                    break;
		            case 2 : // lowered		                    
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
		                        this.border1.style.borderTop = window.system.getConfig("3dborder.outer.top");
								this.border2.style.borderTop = window.system.getConfig("3dborder.outer.top");
								node.style.borderRight = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
		                    }	                    
		                    break;
					case 3 : // bordered		                    
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("nonborder.inner.right");
		                        this.border1.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
								this.border2.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
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
			var n = $(this.getFullId() + "_cap");
			if (n != undefined){								
				n.innerHTML = "<span id='"+this.getFullId()+"_title' style='position:absolute;top:3;width:auto; height:auto;'><bold>"+data+" </bold></span>";
			}	
			n = $(this.getFullId()+"_title");
			this.border2.style.left = 10 + n.offsetWidth;	
			this.border2.style.width = this.width - (10 + n.offsetWidth) - (document.all ? 2 : 0);
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},
	setHeight: function(data){		
		window.app_builder_component_controls_groupBox.prototype.parent.setHeight.call(this, data);
		this.form.style.height = data - 25;				
		this.border.style.height = data - (systemAPI.browser.msie ? 10:12);		
	},
	setWidth: function(data){
		window.app_builder_component_controls_groupBox.prototype.parent.setWidth.call(this, data);
		this.form.style.width = data - 20;				
		this.border.style.width = data - (systemAPI.browser.msie ? 0:2);
		if (this.caption != ""){
			var wdth = this.caption.length * 6;			
			n = $(this.getFullId()+"_title");
			this.border2.style.left = 10 + n.offsetWidth;	
			this.border2.style.width = this.width - (10 + n.offsetWidth) - (document.all ? 2 : 0);
		}
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	}
});