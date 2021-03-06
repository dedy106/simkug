//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_childPage = function(owner,options, index){
    if ((owner) && (owner instanceof portalui_pageControl)){
        this.tabWidth = 56;
        this.onChange = new portalui_eventHandler();
        this.caption = "Tab";
        this.image = "";        
        window.portalui_childPage.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_childPage";      
        this.selectedCtrl = undefined;
        this.owner = owner;
        this.shiftPress = false;
        this.mouse = undefined;
        this.activeControl = undefined;  
        this.pageIndex = index;
		if (options !== undefined){
			if (options.caption !== undefined) this.setCaption(options.caption);
			if (options.image !== undefined) this.setImage(options.image);
		}
		this.setWidth(owner.width);
		this.setHeight(owner.height);
    }else
      alert("owner is not systemControl");
};
window.portalui_childPage.extend(window.portalui_containerControl);
window.childPage = window.portalui_childPage;
//---------------------------- Function ----------------------------------------
window.portalui_childPage.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.display = "none";
	    canvas.style.left = 0;
	    canvas.style.top = 0;
	    canvas.style.width = "100%";
	    canvas.style.height = "100%";
	    canvas.style.overflow = "auto";
	    canvas.style.background = system.getConfig("form.pagecontrol.color");
		canvas.style.borderTop =  window.system.getConfig("3dborder.inner.top");
		canvas.style.borderBottom =  window.system.getConfig("3dborder.inner.bottom");
	  	canvas.style.borderLeft =  window.system.getConfig("3dborder.inner.top");
	  	canvas.style.borderRight =  window.system.getConfig("3dborder.inner.bottom");
	    var html = "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' "+
	        			"onkeydown='window.system.getResource(" + this.resourceId + ").dokeydown(event);'"+
	              "></div>";
	    canvas.innerHTML = html;
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
	setColor: function(color){
	   this.getClientCanvas().style.background = color;
    }
});
