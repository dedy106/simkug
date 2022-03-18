//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_widget = function(owner, options){
    if (owner)
    {
		this.caption = "";
		window.portalui_widget.prototype.parent.constructor.call(this, owner, options);		
		this.className = "portalui_widget";
		this.owner = owner;
		this.bgColor = system.getConfig("form.panel.color");
		this.setBorder(1);
		this.scrolling = false;		
		this.onMouseDown = new portalui_eventHandler();
		this.onMouseMove = new portalui_eventHandler();
		this.onMouseUp = new portalui_eventHandler();
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.color) this.setColor(options.color);						
			if (options.border || options.border == 0) this.setBorder(options.border);
			if (options.shadow) this.setShadow(options.shadow);
			if (options.caption) this.setCaption(options.caption);
		}
		if (!systemAPI.browser.msie) this.makeRound(5,{tl:10,bl:10,br:10});		
    }
};
window.portalui_widget.extend(window.portalui_containerControl);
window.widget = window.portalui_widget;
//---------------------------- Function ----------------------------------------
window.portalui_widget.implement({
	draw: function(canvas){
		window.portalui_widget.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
	    var html = "";    
		var nd = this.getCanvas();
		nd.style.background = system.getConfig("form.panel.color");
		nd.style.overflow = "hidden";		
		
	    if (document.all)
	        html = 	"<div id= '"+n+"_bottom' style='{background-image: url(icon/"+system.getThemes()+"/panelShadow.png);background-position: bottom left;background-repeat: repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}'' ></div>"+					
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;color:#ffffff;padding-left:10px}'> </div>"+
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 5;display:none}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;display:none}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    else
	        html =  "<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +					
					"<div id='" + n + "_cap' style='{-webkit-border-top-left-radius:10px;-moz-border-radius-topleft: 10px;position: absolute;left: 0;top: 0; width:100%; height: 20;color:#ffffff;background:#ff9900;padding-left:10px}'> </div>"+
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 5;display:none'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 20;display:none}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    //nd.innerHTML = html;
		this.setInnerHTML(html, nd);
		if (document.all){		
			nd.onmousedown  = new Function("system.getResource("+this.resourceId+").doMouseDown(event);");
			nd.onmouseup = new Function("system.getResource("+this.resourceId+").doMouseUp(event);");			
		}else{
			nd.onmousedown  = new Function("event","system.getResource("+this.resourceId+").doMouseDown(event);");
			nd.onmouseup = new Function("event","system.getResource("+this.resourceId+").doMouseUp(event);");
		}
	},
	doMouseDown: function(event){
		this.onMouseDown.call(this,event);		
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
		this.onMouseUp.call(this,x,y,button, buttonState);		
	},
	doSysMouseMove: function(x, y, button, buttonState){		
		this.onMouseMove.call(this,x,y,button, buttonState);		
		this.mouseX = x;
		this.mouseY = y;		
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
			var n = $(this.getFullId() + "_cap");
			if (n != undefined){				
				///n.style.background = "url(image/tabBg.png) repeat-x";				
				n.innerHTML = "<div style='position:absolute;top:3;width:100%; height:100%;'><bold>"+data+" </bold></div>";
			}			
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},
	setHeight: function(data){
		window.portalui_widget.prototype.parent.setHeight.call(this, data);		
		$(this.getFullId()+"form").style.height = data - 30;
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
			if (document.all) cnv.style.height =  (this.height) +"px";
		}
	}
});
