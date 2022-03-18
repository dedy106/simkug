//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEtabChild = function(owner){
    if ((owner) && (owner.className == "portalui_FEtabPanel" || owner.className == "portalui_tabPage")){
        this.tabWidth = 56;
        this.onChange = new portalui_eventHandler();
        this.caption = "Tab";
        this.image = "";
        
        window.portalui_FEtabChild.prototype.parent.constructor.call(this, owner);
        this.className = "portalui_FEtabChild";      
        this.owner = owner;
        
    }else
      alert("owner is not portalui_FEtabPanel::"+ owner);
};
window.portalui_FEtabChild.extend(window.portalui_containerControl);
window.FEtabChild = window.portalui_FEtabChild;
//---------------------------- Function ----------------------------------------
window.portalui_FEtabChild.implement({
	draw: function(canvas){
	   try{
		  window.portalui_FEtabChild.prototype.parent.draw.call(this, canvas);
    		var n = this.getFullId();
    	    var html = "";    
    		var nd = this.getCanvas();
    		nd.style.overflow = "hidden";				    
		    nd.style.borderTop = "1px solid "+this.owner.borderColor;
			nd.style.borderRight = "1px solid "+this.owner.borderColor;
			nd.style.borderLeft = "1px solid "+this.owner.borderColor;
			nd.style.borderBottom = "1px solid "+this.owner.borderColor;
		    var html = "<div id='" + n + "form' style='position: absolute; left: 1; top: 1; width: 100%; height: 100%;overflow:auto'></div>";
		    this.setInnerHTML(html, nd);
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
	    if (data != this.caption){
	        this.caption = data;
	        
	        this.onChange.call(this, "caption");
	    }
	},
	getImage: function(){
		return this.image;
	},
	setImage: function(data){
	    if (data != this.image){
	        this.image = data;
	        this.onChange.call(this, "image");
	    }
	},
	getTabWidth: function(){
		return this.tabWidth;
	},
	setTabWidth: function(data){
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
	},
	setWidth: function(data){
	  window.portalui_FEtabChild.prototype.parent.setWidth.call(this,data);
	  var form = $(this.getFullId()+"form");
	  form.style.width = data - 5;
    },
    setHeight: function(data){
        window.portalui_FEtabChild.prototype.parent.setHeight.call(this,data);
        var form = $(this.getFullId()+"form");
        form.style.height = data - 5;
        
    },
    setColor: function(color){
        this.getClientCanvas().style.background = color;
    }
});
