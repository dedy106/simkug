//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_msgBoard = function(owner){
	window.app_builder_component_controls_msgBoard.prototype.parent.constructor.call(this);
	window.app_builder_component_controls_msgBoard.prototype.parent.setHeight.call(this, 200);
	window.app_builder_component_controls_msgBoard.prototype.parent.setWidth.call(this, 500);
	this.className = "portalui_msgBoard";
	this.filePath = "";
	this.onClick = new portalui_eventHandler();
	this.hint = "image";        
	this.showHint = false;
	this.system = $("system");
	this.systemForm = $("systemform");
	this.count = 60;
};
window.app_builder_component_controls_msgBoard.extend(window.app_builder_component_controls_commonForm);
window.app_builder_component_controls_msgBoard.implement({
	doDraw: function(canvas){		
		this.canvas = canvas;
		var div = document.createElement("div");
		div.id = 'msgBoard_frame';
		div.style.position = "absolute";
		div.style.top = 0;
		div.style.width = "100%";
		div.style.height = "100%";		
		this.canvas.appendChild(div);	
	    var html = "<div id='board_alert' style='{position:absolute;;filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8;top:0;left:0;width:100%;height:180;}'> "+
				   "</div>"+
				   "<div id='board_header' align='center' style='{position:absolute;top:-18;left:180;width:150;height:20;font-size:15;color:#ffffff;border:1px solid #ffffff}'>A L E R T "+
				   "</div>"+
				   "<div id='board_alertText' style='{position:absolute;top:50;left:60;width:400;height:100%;font-size:12;color:#ffffff;}'> "+
				   "</div>"+
				   "<div id='board_alertTime' style='{position:absolute;top:20%;left:30%;width:400;height:100%;font-size:50;color:#ffffff;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3;}'> "+
				   "</div>"+
				   "<div id='board_icon' style='{position:absolute;top:50;left:10;width:50;height:50;background:url(image/themes/dynpro/iconAlert.png)0 0 no-repeat;}'> "+
				   "</div>"+
				   "<div id='board_gif' style='{position:absolute;top:170;left:230;width:100;height:20;background:url(image/upload.gif)0 0 no-repeat;}'>"+
					"<span style='{position:absolute;top:-15;left:-10;width:120;height:20;color:#ffffff}'>Try Connecting.... </span>"+
				   "</div>"+
				   "<div id='board_shadow' style='{position:absolute;background:#ffffff;filter:alpha(opacity:20);opacity:0.2;moz-opacity:0.2;top:0;left:0;width:100%;height:40%;}'> "+
				   "</div>"+
				   "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' ></div>";
	    this.setInnerHTML(html, div);
		this.alertText = $("board_alertText");
		this.systemHeader = $("board_header");	
		this.systemAlert = $("board_alert");	
		this.systemShadow = $("board_shadow");	
		this.systemTime = $("board_alertTime");			
	},
	bound: function(){	
		this.canvas.style.height = 200;
		this.canvas.style.width = 500;
		this.canvas.style.left = parseInt(this.system.offsetWidth) / 2 - 250;
		this.canvas.style.top = parseInt(this.system.offsetHeight) / 2 - 100;
		this.canvas.style.display = "none";			
	},
	alert: function(msg){		
		this.canvas.style.display = "";
		this.alertText.innerHTML = msg;		
		//this.checkServer();
	},
	alertDate: function(msg){	
		try{
			this.alertText.innerHTML = msg;
			this.systemForm.style.display = "none";
			this.canvas.style.display = "";
			this.count = 60;
			this.delay(1000);
		}catch(e){
			alert("alertDate : "+e);
		}
	},
	setColor: function(data){
		var canvas = this.getCanvas();
		if (canvas != undefined)	
			canvas.style.background = data;
	},
	doClick: function(event){
		this.onClick.call(this);
	},
	doMouseOut: function(event){
		if (this.showHint)
			window.system.hideHint();
	},
	show: function(){
	},
	checkServer: function(){	
		try{
			this.systemHeader.innerHTML = "";
			usesHttp.open("GET", "serverCheck.php", false);
			usesHttp.send("");
			if (usesHttp.state == 200){
				var script = usesHttp.responseText;   			
			}
			this.canvas.style.display = "none";			
			this.systemForm.style.display = "";
			if (this.intervalId != undefined)
				window.clearTimeout(this.intervalId);
		}catch(e){	
			this.systemHeader.innerHTML = "A L E R T";
			this.intervalId = window.setTimeout("window.messageBoard.checkServer();", 1000);		
		}
	},
	delay: function(time, max){	
		try{		
			this.systemTime.innerHTML = "wait " + this.count +"";
			this.count--;
			if (this.count == 0){
				this.canvas.style.display = "none";			
				this.systemForm.style.display = "";
				if (this.inter != undefined)
					window.clearTimeout(this.inter);
				this.count = 60;			
			}
			this.inter = window.setTimeout("window.messageBoard.delay("+time+");", time);		
		}catch(e){	
			//this.systemHeader.innerHTML = "";			
		}
	}
});