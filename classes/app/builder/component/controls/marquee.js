//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_marquee = function(owner,options){
	if (owner){
		window.app_builder_component_controls_marquee.prototype.parent.constructor.call(this,owner,options);
		window.app_builder_component_controls_marquee.prototype.parent.setHeight.call(this, 35);
		this.className = "portalui_marquee";
		uses("portalui_timer");
		this.timer = new portalui_timer(this);
		this.timer.setInterval(30);
		this.timer.onTimer.set(this, "timerTimer");
	    this.msg = "";
	    this.msgPos = 5; 		
	    this.direction = "left";
		this.detect = 0;
		this.start = true;
		this.index = 0;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.direction !== undefined) this.setDirection(options.direction);				
			if (options.interval !== undefined) this.setInterval(options.interval);	
		}
		this.addProperty({className:this.className,interval:30, enabled: this.enabled, direction:this.direction, message:""});	
		this.addEvent({});
	}		
};
window.app_builder_component_controls_marquee.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_marquee.implement({
	doDraw: function(canvas){
		canvas.style.overflow = "hidden";
		var html = "<div id='"+this.getFullId()+"_frame' style='{filter:aplha(opacity:50);opacity:0.5;moz-opacity:0.5;overflow:hidden;border:2px solid #ffffff;position:absolute;left:0;top:-1;width:100%; height:100%;background:"+system.getConfig("app.color.panel")+"}'>"+			         
				       "</div>"+
					   "<div id='"+this.getFullId()+"_message' style='{position:absolute;left:0;top:5;width:100%; height:100%;color:#041c29}'></div>";
	             
		this.setInnerHTML(html, canvas);
		this.msgContainer = $(this.getFullId() +"_message");
	},
	setMessage: function(message, addText){
		if (addText == undefined) return;
		this.index = 0;
		this.msg = message;		
		this.addText = addText;
		this.msgContainer.innerHTML = this.addText +" "+message[this.index];
		this.setProperty("message",message);		
	},	
	clearMsg: function(type, message){	
		this.msgContainer.background = "";
		this.msgContainer.innerHTML = "";	
	},
	timerTimer: function(sender){
	  try
	  {		
		if (this.direction == "left"){
			var pos = this.msgPos;		
			if (this.msgPos > (this.left - (this.msg.length * 4)))
			 this.msgPos--;
			else this.msgPos = this.width;		
			this.msgContainer.style.left = this.msgPos;
		}else {
			if (!this.start ){
				if (this.msgPos > -20)
					this.msgPos--;
				else this.msgPos = 25;
				if (this.msgPos == 5) 				
						this.start = true;											
			}		
			if (this.start){ 
				this.detect++;
				if (this.detect == 100) {
					this.start = false;				
				}
			}else{this.detect = 0;this.start = false;}	
			if (this.msgPos == 25){
				if (this.index< this.msg.length - 1)
							this.index++;
						else this.index = 0;	
			}
			this.msgContainer.innerHTML = this.addText +" "+(this.index+1)+". "+this.msg[this.index];
			this.msgContainer.style.left = 10;		
			this.msgContainer.style.top = this.msgPos;		
				
		}
	  }catch(e){
	    alert();
	  }     
	},
	setWidth: function(data){
		window.app_builder_component_controls_marquee.prototype.parent.setWidth.call(this, data);
		this.msgPos = data;     
	},
	run: function(){  
		this.msgPos = 5;	
		this.show();
		//this.bringToFront();
		this.timer.setEnabled(true);
	},
	setInterval: function(data){
		this.timer.setInterval(data);
		this.setProperty("interval",data);
	},
	setEnabled: function(data){
		this.setProperty("enabled",data);
		if (data) this.run();
		else this.stop();
	},
	stop: function(){  
		this.hide();
		this.timer.setEnabled(false);
	},
	setDirection : function(data){
		this.direction = data;
		this.setProperty("direction",data);
	}
});