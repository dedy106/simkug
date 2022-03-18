//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_commonForm = function(owner,options){
    if (owner)
    {		
		window.app_builder_component_controls_commonForm.prototype.parent.constructor.call(this, owner,options);
		this.className = "portalui_commonForm";        
		this.visible = false;
		this.active = false;
		this.activeControl = undefined;		
		this.onModal = false;
		this.onClose = new portalui_eventHandler();
		this.opacity = 0;
		this.isMaximized = false;
		this.alwaysOnTop = false;
		this.closeToHide = true;
		this.onKeyDown = new portalui_eventHandler();
    }
};
window.app_builder_component_controls_commonForm.extend(window.app_builder_component_controls_containerControl);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_commonForm.implement({
	doDraw: function(canvas){
		canvas.style.display = "none";
	},
	centerize: function(){
	    var system = $("system");
		var screenWidth = system.offsetWidth;
	    var screenHeight = system.offsetHeight;
	    this.setLeft(parseInt((screenWidth - this.width) / 2, 10));
	    this.setTop(parseInt((screenHeight - this.height) / 3, 10));
	},
	show: function(){
	    window.app_builder_component_controls_commonForm.prototype.parent.show.call(this);
	},
	showModal: function(){		
	},
	close: function(){		
	},
	hide: function(){
		this.setVisible(false);
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
	minimize: function(){
		this.hide();
		this.isMaximized = false;
	},
	maximize: function(){
		this.isMaximized = true;
	    this.realWidth = this.width;
	    this.realHeight = this.height;
	    this.realLeft = this.left;
	    this.realTop = this.top;	   		
	    this.setLeft(0);
	    this.setTop(0);
	    this.setWidth(system.screenWidth);
	    this.setHeight(system.screenHeight);	    
	    this.doAfterResize(this.width, this.height);
	},
	restore: function(){
	    if (this.isMaximized)
	    {
	        this.isMaximized = false;

	        this.setLeft(this.realLeft);
			this.setTop(this.realTop);
	        this.setWidth(this.realWidth);
	        this.setHeight(this.realHeight);
	        
	        this.doAfterResize(this.width, this.height);
	    }
	    else
	        this.setVisible(true);
	},
	activate: function(oldApplication){		
	},
	alert: function(msg, info){	    
	},
	info: function(msg, info){		
	},
	confirm: function(sender, event, msg, info){	    
	},
	doKeyDown: function(charCode, buttonState, keyCode){			
		if (this.activeControl instanceof portalui_control)
			this.activeControl.doKeyDown(charCode, buttonState, keyCode);		
		if (this.onKeyDown.method !== undefined)
			return this.onKeyDown.call(this, charCode, buttonState, keyCode);
		else return false;
	},
	doKeyPress: function(charCode, buttonState, keyCode){		
	    if (this.activeControl instanceof portalui_control)
	        this.activeControl.doKeyPress(charCode, buttonState,keyCode);
	},
	doModalResult: function(sender, modalResult){
	},
	doActivate: function(){
		try
		{
		    this.bringToFront();
		    this.active = true;		
		    if ((this.activeControl != undefined) && (this.activeControl instanceof portalui_control))
		        this.activeControl.doSetFocus();   
		    this.setVisible(true);
		}
		catch (e)
		{
		    alert("[commmonForm]::doActivate: " + e+"\r"+this.activeControl);
		}
	},
	doDeactivate: function(){
		try{
		    this.active = false;		    
		    if (this.activeControl instanceof portalui_control){
				if (this.activeControl.blur) this.activeControl.blur();//14 december 2008
				this.activeControl.doLostFocus();		
			}		
			//this.setVisible(false);
		}catch(e){
			alert("doDeactivate commonForm :"+e);
		}
	},
	doAfterResize: function(width, height){	
	},
	getActiveControl: function(){
		return this.activeControl;	
	},
	setActiveControl: function(control){
	//	alert(control + " " + this.activeControl);
		try
		{
			if (control != this.activeControl)
			{
				//this.activate();		
				if (this.activeControl instanceof window.portalui_control)
					this.activeControl.doLostFocus();				
				this.activeControl = control;		
				if (this.activeControl instanceof window.portalui_control)
					this.activeControl.doSetFocus();
			}
		}catch(e)
		{
			alert("[app_builder_component_controls_commonForm]::setActiveControl: " + e);
		}
	},
	resize: function(width, height){
		var node = $("system");		
		//iE and FireFox
	    this.setLeft(0);
	    this.setTop(0);
	    this.setWidth(width);
	    this.setHeight(height);
		this.doAfterResize(this.width,this.height);
	},
	setAlwaysOnTop: function(data){
		this.alwaysOnTop = data;
	},
	isAlwaysOnTop: function(){
		return this.alwaysOnTop;
	}
});
