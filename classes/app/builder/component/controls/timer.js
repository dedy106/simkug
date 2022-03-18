//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_timer = function(owner){
    if (owner)
    {		
		try{
	        window.app_builder_component_controls_timer.prototype.parent.constructor.call(this, owner);
	        this.className = "portalui_timer";	
	        this.onTimer = new portalui_eventHandler();	
	        this.interval = 1000;
	        this.enabled = false;
	        this.intervalId = undefined;
		}catch(e){
			systemAPI.alert(e);
		}
    }
};
window.app_builder_component_controls_timer.extend(window.app_builder_component_controls_component);
window.app_builder_component_controls_timer.implement({
	doTimer: function(){
	    try{
	        this.onTimer.call(this);
	    }catch (e){}	   
	    if (this.enabled)
	        this.intervalId = window.setTimeout("window.system.getResource(" + this.resourceId + ").doTimer();", this.interval);
	},
	getInterval: function(){
		return this.interval;
	},
	setInterval: function(data){
	    if (this.interval != data){
	        this.interval = data;	   
	        if (this.enabled){
	            try{
	                window.clearTimeout(this.intervalId);
	            }catch (e){}	        
	            this.intervalId = window.setTimeout("window.system.getResource(" + this.resourceId + ").doTimer();", this.interval);
	        }
	    }
	},
	isEnabled: function(){
		return this.enabled;
	},
	setEnabled: function(data){
	    if (this.enabled != data){
	        this.enabled = data;	 
	        if (this.enabled)
	            this.intervalId = window.setTimeout("window.system.getResource(" + this.resourceId + ").doTimer();", this.interval);
	        else{
	            try{
	                window.clearTimeout(this.intervalId);
	            }catch (e){}
	        }
	    }
	}
});
