//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_statusBar = function(owner,options){
	if (owner){
		window.app_builder_component_controls_statusBar.prototype.parent.constructor.call(this,owner,options);
		window.app_builder_component_controls_statusBar.prototype.parent.setHeight.call(this, 35);
		this.className = "portalui_statusBar";
		uses("portalui_timer");
		this.timer = new portalui_timer(this);
		this.timer.setInterval(10000);
		this.timer.onTimer.set(this, "timerTimer");
		this.autoHide = true;		
		this.interval = 100000;
		this.msg = "";
		this.addProperty({className:this.className, message:this.msg, interval:this.interval, enabled: this.enabled});	
		this.addEvent({});
	}		
},
window.app_builder_component_controls_statusBar.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_statusBar.implement({
	doDraw: function(canvas){
		var html = "<div id='"+this.getFullId()+"_frame' style='{position:absolute;left:0;top:-1;width:100%; height:100%;}'>"+//background:url(image/themes/"+system.getThemes()+"/bgSB.png)repeat-x
	               "<div id='"+this.getFullId()+"_icon' style='{position:absolute;left:10;top:-4;width:100%; height:100%;}'></div>"+
				         "<div id='"+this.getFullId()+"_message' style='{position:absolute;left:50;top:5;width:100%; height:100%;color:"+system.getConfig("app.color.labelCaption")+"}'></div>"+
				       "</div>"+
	             "<div id='"+this.getFullId()+"_rightBg' style='{display:none;position:absolute;left:500;top:-1;width:25; height:35;background:url(image/themes/"+system.getThemes()+"/rightSB.png)no-repeat}'></div>";
	             
		this.setInnerHTML(html, canvas);
		this.frame = $(this.getFullId() +"_frame");	
	},
	message: function(type, message){
		this.show();
		var icon = $(this.getFullId() +"_icon");
		var psn = $(this.getFullId() +"_message");
		switch(type)
		{
			case 0 :						
				this.frame.style.color = "#D8000C";
				psn.style.color = "#D8000C";
				this.frame.style.backgroundColor = "#FFBABA";
				this.frame.style.border = "1px solid #D8000C";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconAlertSmall.png) no-repeat";
				break;
			case 1 :
				this.frame.style.color = "#9F6000";
				psn.style.color = "#9F6000";
				this.frame.style.backgroundColor = "#FEEFB3";
				this.frame.style.border = "1px solid #9F6000";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconConfirmSmall.png) no-repeat";
				break;
			case 2 :			
				this.frame.style.color = "#4F8A10";
				psn.style.color = "#4F8A10";
				this.frame.style.backgroundColor = "#DFF2BF";
				this.frame.style.border = "1px solid #4F8A10";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconInfoSmall.png) no-repeat";
				break;
			case 3 :			//normal
				this.frame.style.color = "#00529B";
				psn.style.color = "#00529B";
				this.frame.style.backgroundColor = "#BDE5F8";
				this.frame.style.border = "1px solid #00529B";
				icon.style.background = "";
				break;
		}	
		
		psn.innerHTML = message;
		this.bringToFront();
		this.timer.setEnabled(true);
	},
	clearMsg: function(type, message){
		this.message(3,"");
		var icon = $(this.getFullId() +"_message");
		icon.style.background = "";
		var psn = $(this.getFullId() +"_message");
		psn.innerHTML = "";	
		this.timer.setEnabled(false);
		this.hide();
	},
	timerTimer: function(sender){
	    this.timer.setEnabled(false);
		if (this.autoHide)
			this.hide();
		this.clearMsg();
	},
	setAutoHide: function(data){
		this.autoHide = data;
	},
	setWidth: function(data){
		window.app_builder_component_controls_statusBar.prototype.parent.setWidth.call(this, data);	
	},
	setMessage: function(data){
		this.msg = data;
		this.setProperty("message",data);
		this.message(0,data);
	},
	setInterval: function(data){
		this.setProperty("interval",data);
		this.timer.setInterval(data);
	},
	setEnabled: function(data){
		this.timer.setEnabled(data);
		this.setProperty("enabled",data);
	}
	
});