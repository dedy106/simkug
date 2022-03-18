//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_messageViewer = function(owner, options){		
    if (owner)
    {
		try{			
			this.caption = "";			
			window.portalui_messageViewer.prototype.parent.constructor.call(this, owner,options);		
			this.className = "portalui_messageViewer";
			this.owner = owner;			
			this.bgColor = system.getConfig("form.panel.color");
			this.setBorder(1);
			this.scrolling = false;
			this.site = "";			
			this.xhrRSS = new XMLHttpRequest();
			var script = "doReadyState = function() {"+
					"	system.getResource("+this.resourceId+").doRequestReady("+this.resourceId+");"+
				"};";			
			eval(script);
			this.xhrRSS.onreadystatechange = doReadyState;
			this.onPrevClick = new portalui_eventHandler();
			this.onNextClick = new portalui_eventHandler();
			this.onRefreshClick = new portalui_eventHandler();
			if (options !== undefined){
				this.updateByOptions(options);				
				if (options.caption !== undefined) this.setCaption(options.caption);
				if (options.prevClick !== undefined) this.onPrevClick.set(options.prevClick[0],options.prevClick[1]);
				if (options.nextClick !== undefined) this.onNextClick.set(options.nextClick[0],options.nextClick[1]);
				if (options.icon !== undefined) this.setIcon(options.icon);
				if (options.refreshClick !== undefined) this.onRefreshClick.set(options.refreshClick[0],options.refreshClick[1]);
			}		
		}catch(e){
			alert("create messageViewer "+e);
		}
    }
};
window.portalui_messageViewer.extend(window.portalui_containerControl);
window.messageViewer =  window.portalui_messageViewer;
//---------------------------- Function ----------------------------------------
window.portalui_messageViewer.implement({
	draw: function(canvas){
		window.portalui_messageViewer.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
		var html = "";    
		var nd = this.getCanvas();
		nd.style.background = system.getConfig("form.panel.color");
		nd.style.overflow = "hidden";		
		
		if (document.all)
			html =  "<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +										
					"<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+					
					"<span style='position:absolute;left: 10;top:30;width:80;height:20;'>Dari</span>"+
					"<div id='" + n + "_dari' style='{position: absolute; left: 90; top: 30; width: 100; height: 18;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<span style='position:absolute;left: 10;top:53;width:80;height:20;'>Subject</span>"+
					"<div id='" + n + "_subject' style='{position: absolute; left: 90; top: 53; width: 100; height: 18;overflow:auto;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<span style='position:absolute;left: 10;top:76;width:80;height:20;'>Tanggal</span>"+
					"<div id='" + n + "_tanggal' style='{position: absolute; left: 90; top: 76; width: 120; height: 18;overflow:auto;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<div id='"+ n +"_prev' style='cursor:pointer;position:absolute;left:200;top:76;width:18;height:18;border:1px solid #999999;background-color:#ff9900;background-image:url(icon/dynpro/left.png)'></div>"+
					"<div id='"+ n +"_next' style='cursor:pointer;position:absolute;left:220;top:76;width:18;height:18;border:1px solid #999999;background-color:#ff9900;background-image:url(icon/dynpro/right.png)'></div>"+
					"<div id='" + n + "_content' style='{position: absolute; left: 5; top: 99; width: 100%; height: 100%;overflow:auto;background:#ffffff;border:1px solid #999999}' ></div>"+					
					"<div id='" + n + "_loading' style='{display:none;background-color:#4d7795;background-image:url(image/gridload.gif);background-position: center center;background-repeat:no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'></div>"+						
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' >"+												
					"</div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left:0;top: 0; width:100%; height: 20;color:#ffffff;padding-left:10px}'> </div>"+
					"<div id='" + n + "_icon' style='{background-image:url(icon/rss_16.png);background-position:top left;background-repeat:no-repeat;position: absolute;left: 5;top: 2; width:16; height: 16;display:'> </div>"+
					"<div id='" + n + "_options' style='{cursor:pointer;position: absolute;left: 0;top: 0; width:20; height: 20;background-image:url(icon/"+system.getThemes()+"/bCopy.png)}'> </div>";
		else
			html =  "<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +										
					"<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+					
					"<span style='position:absolute;left: 10;top:30;width:80;height:20;'>Dari</span>"+
					"<div id='" + n + "_dari' style='{position: absolute; left: 90; top: 30; width: 100; height: 18;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<span style='position:absolute;left: 10;top:53;width:80;height:20;'>Subject</span>"+
					"<div id='" + n + "_subject' style='{position: absolute; left: 90; top: 53; width: 100; height: 18;overflow:auto;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<span style='position:absolute;left: 10;top:76;width:80;height:20;'>Tanggal</span>"+
					"<div id='" + n + "_tanggal' style='{position: absolute; left: 90; top: 76; width: 120; height: 18;overflow:auto;border:1px solid #999999;background:#cccccc}' ></div>"+					
					"<div id='"+ n +"_prev' style='cursor:pointer;position:absolute;left:200;top:76;width:18;height:18;border:1px solid #999999;background-color:#ff9900;background-image:url(icon/dynpro/left.png)'></div>"+
					"<div id='"+ n +"_next' style='cursor:pointer;position:absolute;left:220;top:76;width:18;height:18;border:1px solid #999999;background-color:#ff9900;background-image:url(icon/dynpro/right.png)'></div>"+
					"<div id='" + n + "_content' style='{position: absolute; left: 5; top: 99; width: 100%; height: 100%;overflow:auto;background:#ffffff;border:1px solid #999999}' ></div>"+					
					"<div id='" + n + "_loading' style='{display:none;background-color:#4d7795;background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'></div>"+						
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' >"+												
					"</div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left:0;top: 0; width:100%; height: 20;color:#ffffff;padding-left:10px}'> </div>"+
					"<div id='" + n + "_icon' style='{background-image:url(icon/rss_16.png);background-position:top left;background-repeat:no-repeat;position: absolute;left: 5;top: 2; width:16; height: 16;display:'> </div>"+
					"<div id='" + n + "_options' style='{cursor:pointer;position: absolute;left: 0;top: 0; width:20; height: 20;background:url(icon/"+system.getThemes()+"/bCopy.png)no-repeat}'> </div>";
		this.setInnerHTML(html, nd);
		this.content = $(n +"_content");		
		this.dari = $(n +"_dari");		
		this.btnRefresh = $(n+"_options");
		this.icon = $(n+"_icon");
		this.loading = $(n+"_loading");
		this.capCont = $(n+"_cap");		
		this.fieldSubject = $(n + "_subject");		
		this.fieldTgl = $(n + "_tanggal");		
		this.prev = $(n + "_prev");		
		this.next = $(n + "_next");		
		if (document.all){		
			this.btnRefresh.onclick = new Function("system.getResource("+this.resourceId+").refreshPage();");			
			nd.onclick = new Function("system.getResource("+this.resourceId+").doClick(event);");
			this.prev.onclick = new Function("system.getResource("+this.resourceId+").doPrevClick(event);");
			this.next.onclick = new Function("system.getResource("+this.resourceId+").doNextClick(event);");
			this.capCont.onmousedown  = new Function("system.getResource("+this.resourceId+").doMouseDown(event);");
			this.capCont.onmouseup = new Function("system.getResource("+this.resourceId+").doMouseUp(event);");			
		}else{
			this.btnRefresh.onclick = new Function("event","system.getResource("+this.resourceId+").refreshPage();");			
			nd.onclick = new Function("event","system.getResource("+this.resourceId+").doClick(event);");
			this.prev.onclick = new Function("event","system.getResource("+this.resourceId+").doPrevClick(event);");
			this.next.onclick = new Function("event","system.getResource("+this.resourceId+").doNextClick(event);");
			this.capCont.onmousedown  = new Function("event","system.getResource("+this.resourceId+").doMouseDown(event);");
			this.capCont.onmouseup = new Function("event","system.getResource("+this.resourceId+").doMouseUp(event);");
		}
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
			DD_belatedPNG.fixPng(this.btnRefresh);DD_belatedPNG.fixPng(this.icon);DD_belatedPNG.fixPng(this.loading);
		}
	},	
	setIcon: function(icon){
		this.icon.style.backgroundImage = "url("+icon+")";
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
			DD_belatedPNG.fixPng(this.icon);
		}
	},
	doMouseDown: function(event){
		system.addMouseListener(this);
		this.isClick = true;
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;
	},
	doMouseUp: function(event){
		system.delMouseListener(this);
		this.isClick = false;
	},
	doSysMouseUp: function(x, y, button, buttonState){
		this.isClick = false;
		system.delMouseListener(this);
	},
	doSysMouseMove: function(x, y, button, buttonState){		
		if (this.isClick)
		{					
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);		
			if (newLeft < 0) newLeft = 0;			
			if (newLeft + this.width > system.screenWidth) newLeft = system.screenWidth - this.width;
			if (newTop < 0) newTop = 0;
			if (newTop + this.height > system.screenHeight) newTop = system.screenHeight - this.height;
			this.setLeft(newLeft);
			this.setTop(newTop);			
			this.mouseX = x;
			this.mouseY = y;		
		}
	},
	doClick: function(event){
		this.bringToFront();
	},
	doPrevClick: function(event){
		this.onPrevClick.call(this);
	},
	doNextClick: function(event){
		this.onNextClick.call(this);
	},
	refreshPage: function(){	
		try{
			this.onRefreshClick.call(this);
		}catch(e){
			alert(e);
		}
	},
	showLoading: function(){
		this.loading.style.display = "";
	},
	hideLoading: function(){
		this.loading.style.display = "none";
	},
	setScroll: function(data){
		this.scrolling=data;
		var cnv = this.getClientCanvas();
		if (data)
			cnv.style.overflow="auto";
		else cnv.style.overflow="hidden";
	},
	setColor: function(data){
		this.bgColor = data;
		var nd = this.getCanvas();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorder: function(data){		
		try{
		    if (this.border != data){
		        var node = undefined;
		        var n = this.getFullId();	       
		        switch (data)
		        {
		            case 0 : // none
		                    node = this.getCanvas();	                    
		                    if (node != undefined){
		                        node.style.border = "";	                        	                    
							}
		                    break;
		            case 1 : // raised
		                    node = this.getCanvas();
		                    if (node != undefined){
		                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
								node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
		                    }                    
		                    break;
		            case 2 : // lowered
		                    node = this.getCanvas();
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
		                        node.style.borderTop = window.system.getConfig("3dborder.outer.top");
								node.style.borderRight = window.system.getConfig("3dborder.outer.right");
		                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
		                    }	                    
		                    break;
					case 3 : // bordered
		                    node = this.getCanvas();
		                    if (node != undefined){
		                        node.style.borderLeft = window.system.getConfig("nonborder.inner.right");
		                        node.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
								node.style.borderRight = window.system.getConfig("nonborder.inner.left");
		                        node.style.borderBottom = window.system.getConfig("nonborder.inner.top");
		                    }	                    
		                    break;
		        }
		    }
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setBorderColor: function(data, options){		
		node = this.getCanvas();
		if (options == undefined){		
			if (node != undefined)
				node.style.border = data;	                        					
		}else{
			if (options.top) node.style.borderTop = data;
			if (options.left) node.style.borderLeft = data;
			if (options.right) node.style.borderRight = data;
			if (options.bottom) node.style.borderBottom = data;
		}
	},
	setCaption: function(data){
		this.caption = data;	
		if (this.caption != ""){
			var wdth = data.length * 6;
			var l = $(this.getFullId() + "_lcap");						
			var n = $(this.getFullId() + "_cap");
			if (n != undefined){				
				n.style.background = "url(image/tabBg.png) repeat-x";				
				n.innerHTML = "<div style='position:absolute;top:3;left:20;width:100%; height:100%;'><bold>"+data+" </bold></div>";
			}			
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},
	setWidth: function(data){
		window.portalui_messageViewer.prototype.parent.setWidth.call(this, data);		
		if (this.btnRefresh !== undefined) this.btnRefresh.style.left = data - 20;		
		if (this.content !== undefined) this.content.style.width = data -10;
		if (this.fieldSubject !== undefined) this.fieldSubject.style.width = data - 100;		
		if (this.dari !== undefined) this.dari.style.width = data - 100;		
		if (this.prev !== undefined) this.prev.style.left = data - 50;		
		if (this.next !== undefined) this.next.style.left = data - 30;		
	},
	setHeight: function(data){
		window.portalui_messageViewer.prototype.parent.setHeight.call(this, data);		
		if (this.content !== undefined) this.content.style.height = data - 100;
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	},
	setShadow: function(data){
		var cnv = $(this.getFullId() + "_bottom");
		if (cnv != undefined){
			if (data) cnv.style.display = "";
			else cnv.style.display = "none";
		}
	},
	doRequestReady: function(resId){
		try{
			if (this.xhrRSS.readyState == 4){
				this.hideLoading();
				if (this.xhrRSS.status == 200){
					var res = this.xhrRSS.responseText;									
					system.getResource(this.resourceId).content.innerHTML = res;			
				}						
			}			
		}catch(e){
			//alert(e);			
			this.hideLoading();
		}
	},
	viewMessage: function(subject, tgl, content, dari){
		this.fieldSubject.innerHTML = subject;
		this.fieldTgl.innerHTML = tgl;
		this.content.innerHTML = content;
		this.dari.innerHTML = dari;
	}
});
