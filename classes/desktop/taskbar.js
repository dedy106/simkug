//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.desktop_taskbar = function(owner){
	try{
		if (owner)
		{
			window.desktop_taskbar.prototype.parent.constructor.call(this, owner);			
			this.className = "desktop_taskbar";											
			this.initComponent();		
			this.title = "Login";
			this.onClick = new portalui_eventHandler();
			this.openTask = [];
		}
	}catch(e)
	{
		systemAPI.alert("[desktop_taskbar]::contruct:"+e,"");
	}
};
window.desktop_taskbar.extend(window.portalui_commonForm);
window.desktop_taskbar.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();   
		canvas.style.background = "#4d7795";					
	    var html =  "<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +                    									
	                    "<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' ></div>" +                    
	                "</div>"+
					"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #249ac9 ;display:none;}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; zindex:1000000;display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
		this.setInnerHTML(html, canvas);
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");
	},
	initComponent: function(){
		this.bStart = new portalui_control(this,{bound:[0,0,100,40]});		
		this.bStart.getCanvas().title = "Click here to start!";
		this.bStart.getCanvas().style.cursor = "pointer";
		this.bStart.getCanvas().style.border = "1px solid #ffffff";
		this.bStart.getCanvas().style.background= "#249ac9";
		if (systemAPI.MSIE){
			this.bStart.getCanvas().onmouseover = new Function("system.getResource("+this.resourceId+").mouseOver(event);");
			this.bStart.getCanvas().onmouseout = new Function("system.getResource("+this.resourceId+").mouseOut(event);");
			this.bStart.getCanvas().onclick = new Function("system.getResource("+this.resourceId+").doClick(event);");
		}else{
			this.bStart.getCanvas().onmouseover = new Function("event","system.getResource("+this.resourceId+").mouseOver(event);");
			this.bStart.getCanvas().onmouseout = new Function("event","system.getResource("+this.resourceId+").mouseOut(event);");
			this.bStart.getCanvas().onclick = new Function("event","system.getResource("+this.resourceId+").doClick(event);");
		}
		var html = "<div id='"+this.getFullId()+"_start' style='{border:1px solid #555555;position:absolute;left:0;top:0;width:"+(document.all ? "98":"98")+";height:"+(document.all ? "38":"38")+";}'>"+
						"<span style='{position:absolute;top:8;left:42;font-size:15;font-family:Arial;font-weight:bold}'>Start</span>"+
					"</div>"+
					"<div style='position:absolute;width:100%;height:100%;left:0;top:0;background:url(image/startjamboo.png) top left no-repeat;'></div>"+
				   "<div style='{position:absolute;left:0;top:0;width:100%;height:"+(document.all ? "20%" :"40%")+";background:#ffffff;filter:alpha(opacity:50);opacity:0.5; moz-opacity:0.5}'></div>";
		this.bStart.getCanvas().innerHTML = this.remBracket(html);		
		this.task = new portalui_control(this,{bound:[100,0,0,40]});		
		this.task.getCanvas().style.border = "1px solid #999999";
		this.task.getCanvas().style.background= "transparent";		
		var html = "<div style='position:absolute;width:100%;height:100%;left:0;top:0;background:transparent;'></div>"+
				   "<div style='{position:absolute;left:0;top:0;width:100%;height:"+(document.all ? "20%" :"40%")+";background:#ffffff;filter:alpha(opacity:50);opacity:0.5; moz-opacity:0.5}'></div>"+
				   "<div id='"+this.getFullId()+"_task' style='{border:1px solid #555555;position:absolute;left:0;top:0;width:0;height:"+(document.all ? "38":"38")+";}'>"+						
				   "</div>";
		this.task.getCanvas().innerHTML = this.remBracket(html);		
		this.taskElm = $(this.getFullId()+"_task");
	},
	doSizeChange: function(width, height){		
	},
	doClick: function(event){
		this.onClick.call(this);
	},
	mouseOver : function(event){		
		this.bStart.fadeBackground("249ac9","ff9900",10,100);//96dcfd
	},
	mouseOut: function(event){		
		this.bStart.fadeBackground("ff9900","249ac9",10,100);
	},
	taskClick: function(event, resId){
		try{
			var app = system.getResource(resId);		
			if (app instanceof portalui_application){
				app.activate();				
				app._mainForm.show();								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	registerTask : function(app, title, icon){				
		var div = document.createElement("div");
		div.style.cssText = "cursor:pointer;position:absolute;top:5;left:"+(this.openTask.length * 30)+";height:30; width:30;background:url("+icon+")top left no-repeat";
		div.id = app.getFullId()+"_taskbar";
		eventOn(div,"click","system.getResource("+this.resourceId+").taskClick(event,"+app.resourceId+");");		
		eventOn(div,"mousemove","system.getResource("+this.resourceId+").taskMouseMove(event,"+app.resourceId+",'"+title+"');");		
		this.taskElm.appendChild(div);		
		this.openTask[this.openTask.length] = div;		
		this.task.setWidth(this.openTask.length * 30);
		this.setBound(system.screenWidth / 2 - ((this.task.width + 100) / 2),system.screenHeight - 50,100,40);
	},
	taskMouseMove: function(event, resId, title){
		system.showHint(event.clientX, event.clientY, title, true);
	},
	removeTask: function(app){
	    try{
            var div = $(app.getFullId()+"_taskbar");    		
            if (div === undefined) return;
    		this.taskElm.removeChild(div);
    		this.openTask = deleteByObj(this.openTask,div);
    		this.task.setWidth(this.openTask.length * 30);
    		for (var i in this.openTask){
    			div = this.openTask[i];
    			div.style.left = (i * 30);
    		}
    		this.setBound(system.screenWidth / 2 - ((this.task.width + 100) / 2),system.screenHeight - 50,100,40);    		
   		}catch(e){
   		   systemAPI.alert(this+"$removeTask()",e);
        }
	}
});
