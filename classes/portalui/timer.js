//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_timer = function(owner){
    if (owner)
    {		
		try{
	        window.portalui_timer.prototype.parent.constructor.call(this, owner);
	        this.className = "portalui_timer";	
	        this.onTimer = new portalui_eventHandler();	
	        this.interval = 1000;
	        this.enabled = false;
	        this.intervalId = undefined;
	        this.context = undefined;
		}catch(e){
			systemAPI.alert(e);
		}
    }
};
window.portalui_timer.extend(window.portalui_component);
window.timer = window.portalui_timer;
window.portalui_timer.implement({
	setContext: function(context){
		this.context = context;
	},
	doTimer: function(){
	    try{
	    	if (this.context)
	    		this.onTimer.call(this, this.context);	
	    	else 
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
	},
	start: function(){
		this.setEnabled(true);
	},
	stop: function(){
		this.setEnabled(false);
	},
	delay: function(delay){
		this.stop();
		window.setTimeout("window.system.getResource(" + this.resourceId + ").start();", delay);
	}
	
});
