//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_FEtabChild = function(owner,options){
    if ((owner) && (owner instanceof app_builder_component_controls_FEtabPanel)){
        this.tabWidth = 56;
        this.onChange = new portalui_eventHandler();
        this.caption = "Tab";
        this.image = "";
        
        window.app_builder_component_controls_FEtabChild.prototype.parent.constructor.call(this, owner,options);
        this.className = "portalui_FEtabChild";      
        this.owner = owner;
		if (options !== undefined) this.updateByOptions(options);
		this.addProperty({className:this.className,image:"",caption:"tab",tabWidth:this.tabWidth});	
		this.addEvent({ChilditemsClick:"",tabChange:""});
    }else
      alert("owner is not portalui_FEtabPanel");
};
window.app_builder_component_controls_FEtabChild.extend(window.app_builder_component_controls_containerControl);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_FEtabChild.implement({
	doDraw: function(canvas){
		try{
		    var n = this.getFullId();				
		    canvas.style.display = "";
		    canvas.style.left = 0;
		    canvas.style.top = 0;
		    canvas.style.width = "100%";
		    canvas.style.height = "100%";
		    canvas.style.borderTop = "1px solid #88d5f4";
			canvas.style.background = "";
			canvas.style.borderRight = "1px solid #cccccc";
			canvas.style.borderLeft = "1px solid #cccccc";
			canvas.style.borderBottom = "1px solid #cccccc";	
			canvas.style.overflow = "auto";
		    var html = "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' "+
		              "></div>";
		    this.setInnerHTML(html, canvas);
		}catch(e){
			alert(e);
		}
	},
	getClientWidth: function(){
		return this.owner.getClientWidth();
	},
	getClientHeight: function(){
		return this.owner.getClientHeight();
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){
	    this.setProperty("caption",data);
		if (data != this.caption){
	        this.caption = data;
	        
	        this.onChange.call(this, "caption");
	    }
	},
	getImage: function(){
		return this.image;
	},
	setImage: function(data){
		this.setProperty("image",data);
	    if (data != this.image){
	        this.image = data;
	        this.onChange.call(this, "image");
	    }
	},
	getTabWidth: function(){
		return this.tabWidth;
	},
	setTabWidth: function(data){
		this.setProperty("tabWidth",data);
	    if (data != this.tabWidth){
	        this.tabWidth = data;
	        this.onChange.call(this, "tabWidth");
	    }
	},
	doKeyDown: function(keyCode, buttonState){
		if (this.activeControl != undefined)
			this.activeControl.doKeyDown(keyCode, buttonState);  	
	},
	setActiveControl: function(control){
		this.activeControl = control;
	}
});