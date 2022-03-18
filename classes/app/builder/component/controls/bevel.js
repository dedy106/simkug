//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_bevel = function(owner, options){
    if (owner)
    {
        this.caption = "";
		window.app_builder_component_controls_bevel.prototype.parent.constructor.call(this, owner, options);		
        this.className = "portalui_bevel";
        this.owner = owner;
		this.bgColor = "transparent";
		this.setBorder(1);		
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.color !== undefined) this.setColor(options.color);						
			if (options.border !== undefined) this.setBorder(options.border);			
		}
		this.addProperty({className:this.className,color:this.bgColor, border: this.border, borderStyle:""});
    }
};
window.app_builder_component_controls_bevel.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_bevel.implement({
	doDraw: function(canvas){		
		canvas.style.background = "transparent";
		canvas.style.overflow = "hidden";						
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
		        node = this.bingkai;
				this.border = data;
				this.setProperty("border",data);
		        var n = this.getFullId();	       
		        switch (data)
		        {
		            case 0 : // none		                    
		                    if (node != undefined){
		                        node.style.border = "";	                        	                    
							}
		                    break;
		            case 1 : // raised		                    
		                    if (node != undefined){
		                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
								node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
		                    }                    
		                    break;
		            case 2 : // lowered		                    
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.top");
								node.style.borderRight = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
		                    }	                    
		                    break;
					case 3 : // bordered		                    
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
	}
});