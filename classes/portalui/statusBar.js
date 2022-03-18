//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_statusBar = function(owner,options){
	if (owner){
		try{
			this.textWidth = 300;
			window.portalui_statusBar.prototype.parent.constructor.call(this,owner,options);			
			this.className = "portalui_statusBar";
			uses("portalui_timer");
			this.timer = new portalui_timer(this);
			this.timer.setInterval(10000);
			this.timer.onTimer.set(this, "timerTimer");
			this.autoHide = false;
			
		}catch(e){
			alert("statusbar:"+e);
		}
	}		
},
window.portalui_statusBar.extend(window.portalui_control);
window.statusBar = window.portalui_statusBar;
window.portalui_statusBar.implement({
	doDraw: function(canvas){
		var html = "<div id='"+this.getFullId()+"_frame' style='{position:absolute;left:0;top:-1;width:100%; height:100%;background-image:url(image/themes/"+system.getThemes()+"/bgSB.png);background-position:0 0;background-repeat:repeat-x}'>"+//
						"<div id='"+this.getFullId()+"_icon' style='{position:absolute;left:10;top:-4;width:100%; height:100%;}'></div>"+
				        "<div id='"+this.getFullId()+"_message' style='{position:absolute;left:50;top:4;width:auto; height:80%;color:"+system.getConfig("app.color.labelCaption")+"}'></div>"+
						"</div>"+
						"<div id='"+this.getFullId()+"_rightBg' style='{display:;position:absolute;left:500;top:0;width:25; height:35;background-image:url(image/themes/"+system.getThemes()+"/sbRight.png);background-repeat:no-repeat}'></div>"+
						"<div id='"+this.getFullId()+"_text1' style='{display:;position:absolute;left:500;top:0;width:400; height:100%;background-image:url(image/themes/"+system.getThemes()+"/sbCenter.png);background-repeat:no-repeat}'></div>"+
						"<div id='"+this.getFullId()+"_text2' style='{display:;align:center;position:absolute;left:500;top:0;width:100; height:100%;background-image:url(image/themes/"+system.getThemes()+"/sbCenter.png);background-repeat:no-repeat}'></div>"+
					"</div>";	             
	             
		this.setInnerHTML(html, canvas);
		this.frame = $(this.getFullId() +"_frame");	
	},
	message: function(type, message){
		this.show();
		this.bringToFront();
		var icon = $(this.getFullId() +"_icon");
		var psn = $(this.getFullId() +"_message");
		switch(type)
		{
			case 0 :						
				psn.style.color = "#D8000C";				
				//psn.style.backgroundColor = "#FFBABA";
				//psn.style.border = "1px solid #D8000C";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconAlertSmall.png) no-repeat";
				break;
			case 1 :
				psn.style.color = "#9F6000";				
				//psn.style.backgroundColor = "#FEEFB3";
				//psn.style.border = "1px solid #9F6000";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconConfirmSmall.png) no-repeat";
				break;
			case 2 :			
				psn.style.color = "#4F8A10";//4F8A10
				//psn.style.backgroundColor = "#DFF2BF";
				//psn.style.border = "1px solid #4F8A10";
				icon.style.background = "url(image/themes/"+system.getThemes()+"/iconInfoSmall.png) no-repeat";
				break;
			case 3 :			//normal
				psn.style.color = "#00529B";
				psn.style.color = "#00529B";
				//psn.style.backgroundColor = "#BDE5F8";
				//psn.style.border = "1px solid #00529B";
				icon.style.background = "";
				break;
		}	
		
		psn.innerHTML = message;
		psn.style.visibility = "visible";	
		this.bringToFront();
		this.timer.setEnabled(true);
		psn.style.width = this.width - this.textWidth - 80;
	},
	clearMsg: function(type, message){
		this.message(3,"");
		var icon = $(this.getFullId() +"_message");
		icon.style.background = "";
		var psn = $(this.getFullId() +"_message");
		psn.style.visibility = "hidden";	
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
		try{
			window.portalui_statusBar.prototype.parent.setWidth.call(this, data);	
			var node = $(this.getFullId()+"_rightBg");			
			if (node) node.style.left = data-6;			
			node = $(this.getFullId()+"_text1");			
			if (node) node.style.left = data- this.textWidth - 80;		
			node = $(this.getFullId()+"_text2");
			if (node) node.style.left = data-100;				
		}catch(e){
			alert("width:"+e);
		}
	},
	setText1: function(text, img){
		try{
			$(this.getFullId()+"_text1").innerHTML = (img != undefined ? "<img style='position:absolute;left:10;top:1' src='"+img+"' width=30 height=33/>":"")+"<span id='"+this.getFullId()+"_textValue1' style='position:absolute;left:35px;top:6px;width:auto;white-space: nowrap;'>"+text+"</span>";
			var w = parseFloat($(this.getFullId()+"_textValue1").style.width) + 30;
			$(this.getFullId()+"_textValue1").style.left = 35;
			$(this.getFullId()+"_textValue1").style.top = 6;
			if (w &&  w < 50) w = 100;
			$(this.getFullId()+"_text1").style.width = w + 20;
			$(this.getFullId()+"_text1").style.left = this.width - 100 - w - 20;
			this.textWidth = w + 100;
		}catch(e){
			alert(e);
		}
	},
	setText2: function(text){
		$(this.getFullId()+"_text2").innerHTML = "<span id='"+this.getFullId()+"_textValue1'style='position:absolute;left:10;top:6;width:auto;'>"+text+"</span>";
	},
	show: function(){
		window.portalui_statusBar.prototype.parent.show.call(this);	
		var node = this.owner.getCanvas();
		var width = node.offsetWidth;
		var height = node.offsetHeight - this.owner.childTop - 23 - this.height;				
		if (this.app._mainForm.form){
			this.app._mainForm.form.setBound(0,this.owner.childTop,width,height);		
		}
	},
	hide: function(){
		window.portalui_statusBar.prototype.parent.hide.call(this);	
		var node = this.owner.getCanvas();
		var width = node.offsetWidth;
		var height = node.offsetHeight - this.owner.childTop  - 23;
		
		if (this.app._mainForm.form){
			this.app._mainForm.form.setBound(0,this.owner.childTop,width,height);		
		}
	}
});
