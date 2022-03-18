//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_control = function(owner, options){
    if (owner)
    {				
		window.app_builder_component_controls_control.prototype.parent.constructor.call(this, owner, options);		
		this.className = "portalui_control";		
		this.onSelectCtrl = new portalui_eventHandler();
		this.onDeselectCtrl = new portalui_eventHandler();
		this.onPropertyChange = new portalui_eventHandler();
		this.onEventChange = new portalui_eventHandler();
		if(options !== undefined){
			this.updateByOptions(options);
		}	
		this.property = {className: this.className, left:this.left,top:this.top, width:this.width, height:this.height,hint:this.hint, visible:this.visible, tabIndex: this.tabIndex, tabStop: this.tabStop, tag: this.tag, opacity:this.opacity, name:this.name, style:this.getStyle()};		
		this.event = {};
    }
};
window.app_builder_component_controls_control.extend(window.portalui_control);
window.app_builder_component_controls_control.implement({
	draw: function(canvas){		
		try{
			var node = document.createElement("div");
		    node.id = this.getFullId();
			node.style.position = "absolute";
		    node.style.left = 0;
		    node.style.top = 0;
		    node.style.width = 10;
		    node.style.height = 10;
			node.style.border = "1px dotted #cccccc";
			node.style.cursor = "move";			
			//node.onMouseDown = new Function("event","system.getResource("+this.resourceId+").domouseDown(event,\"frame\");");
		    canvas.appendChild(node);		
			var html = "<div id='"+this.getFullId()+"_bingkai' style='z-index:1;position:absolute;top:0;left:0;width:100%;height:100%;' "+
							"onmousedown='system.getResource("+this.resourceId+").domouseDown(event,\"frame\");'"+
						"></div>"+
						"<div id='"+this.getFullId()+"_topBtn' style='z-index:999;cursor:pointer;top:0;left:0;width:4;height:4;position:absolute;background:#999999;border:1px solid #000000;display:none' "+
							"onmousedown='system.getResource("+this.resourceId+").domouseDown(event,\"top\");'"+
							"onmousemove='system.getResource("+this.resourceId+").domouseMove(event,\"top\");'"+
							"onmouseup='system.getResource("+this.resourceId+").domouseUp(event,\"top\");'"+
							"></div>"+
						"<div id='"+this.getFullId()+"_leftBtn' style='z-index:999;cursor:pointer;top:3;left:0;width:4;height:4;position:absolute;background:#999999;border:1px solid #000000;display:none' "+
							"onmousedown='system.getResource("+this.resourceId+").domouseDown(event,\"left\");'"+
							"onmousemove='system.getResource("+this.resourceId+").domouseMove(event,\"left\");'"+
							"onmouseup='system.getResource("+this.resourceId+").domouseUp(event,\"left\");'"+
							"></div>"+
						"<div id='"+this.getFullId()+"_rightBtn' style='z-index:999;cursor:pointer;top:0;left:0;width:4;height:4;position:absolute;background:#999999;border:1px solid #000000;display:none'"+
							"onmousedown='system.getResource("+this.resourceId+").domouseDown(event,\"right\");'"+
							"onmousemove='system.getResource("+this.resourceId+").domouseMove(event,\"right\");'"+
							"onmouseup='system.getResource("+this.resourceId+").domouseUp(event,\"right\");'"+
							"></div>"+
						"<div id='"+this.getFullId()+"_bottomBtn' style='z-index:999;cursor:pointer;top:0;left:0;width:4;height:4;position:absolute;background:#999999;border:1px solid #000000;display:none'"+
							"onmousedown='system.getResource("+this.resourceId+").domouseDown(event,\"bottom\");'"+
							"onmousemove='system.getResource("+this.resourceId+").domouseMove(event,\"bottom\");'"+
							"onmouseup='system.getResource("+this.resourceId+").domouseUp(event,\"bottom\");'"+
							"></div>";
			node.innerHTML = html;
			var cnv = $(this.getFullId()+"_bingkai");		
		    this.topThumb = $(this.getFullId()+"_topBtn");		
			this.topThumb.style.top = document.all ? 0 : -3;this.topThumb.style.height = "4px";
			this.leftThumb = $(this.getFullId()+"_leftBtn");		
			this.leftThumb.style.left = document.all ? 0 : -3;
			this.rightThumb = $(this.getFullId()+"_rightBtn");		
			this.bottomThumb = $(this.getFullId()+"_bottomBtn");		
			this.bingkai = cnv;			
			this.doDraw(cnv);
		}catch(e){
			alert(e);
		}
	},
	domouseDown: function(event,btn){
		try{			
			this.isClick = true;			
			var target = document.all || window.opera ? event.srcElement : event.target;				
			if (this.owner instanceof app_builder_component_controls_containerControl){
				this.owner.activeCtrl = this;			
				this.owner.deselect(this);									
			}else if (this instanceof app_builder_component_controls_containerControl && target.id == this.getFullId()+"form"){
				this.activeCtrl = undefined;			
			}
			if (this.activeCtrl === undefined){	
				this.onSelectCtrl.call(this);				
				this.mouseX = event.clientX;
				this.mouseY = event.clientY;				
				this.btnPress = target.id;						
				switch(btn){
					case "top":	target.style.cursor = "n-resize";				
					break;
					case "left":target.style.cursor = "w-resize";				
					break;
					case "right":target.style.cursor = "e-resize";				
					break;
					case "bottom":target.style.cursor = "s-resize";				
					break;			
				}
				this.topThumb.style.display = "";
				this.leftThumb.style.display = "";
				this.rightThumb.style.display = "";
				this.bottomThumb.style.display = "";
				this.getCanvas().style.border = "1px dotted #cccccc";						
				system.addMouseListener(this);	
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	deselect: function(activeCtrl, removeListener){
		try{
			if (this != activeCtrl){
				this.topThumb.style.display = "none";
				this.leftThumb.style.display = "none";
				this.rightThumb.style.display = "none";
				this.bottomThumb.style.display = "none";	
				this.getCanvas().style.border = "";				
			}
			if (removeListener) system.delMouseListener(this);	
			if (this instanceof app_builder_component_controls_containerControl){
				var comp;
				for (var i=0; i < this.childsIndex.length;i++) {
					comp = system.getResource(this.childsIndex[i]);
					if (comp instanceof app_builder_component_controls_containerControl && comp != activeCtrl)
						if(comp.deselect) comp.deselect(activeCtrl);
					else (comp instanceof app_builder_component_controls_control && comp != activeCtrl)
						if(comp.deselect) comp.deselect(activeCtrl);
				}
			}
			this.onDeselectCtrl.call(this);
		}catch(e){
			systemAPI.alert(this+"::"+e,comp);
		}
	},
	domouseMove: function(event,btn){		
	},
	domouseUp: function(event,btn){		
	},
	doSysMouseUp: function(x, y, button, buttonState, target){				
		this.isClick = false;	
		var n = this.getFullId();
		if (target.id == n+"_topBtn" || target.id == n+"_leftBtn" || target.id == n+"_rightBtn" || target.id == n+"_bottomBtn")					
			target.style.cursor = "pointer";		
		system.delMouseListener(this);		
	},	
	doSysMouseMove: function(x, y, button, buttonState, target){
		try{
			if (this.isClick){				
				var n = this.getFullId();				
				switch(target.id){
					case n +"_topBtn":	
						if (this.btnPress == target.id){
							var xx = this.top + (y - this.mouseY);				
							var h = this.height - (y - this.mouseY);				
							this.setTop(xx);
							this.setHeight(h);
						}
					break;
					case n + "_leftBtn":
						if (this.btnPress == target.id){
							var xx = this.left + (x - this.mouseX);				
							var w = this.width - (x - this.mouseX);				
							this.setLeft(xx);
							this.setWidth(w);
						}
					break;
					case n + "_rightBtn":
						if (this.btnPress == target.id){
							var xx = this.width + (x - this.mouseX);				
							this.setWidth(xx);
						}
					break;
					case n + "_bottomBtn":
						if (this.btnPress == target.id){
							var xx = this.height + (y - this.mouseY);				
							this.setHeight(xx);
						}
					break;
					default:
						if (this.btnPress == target.id){
							var yy = this.top + (y - this.mouseY);				
							var xx = this.left + (x - this.mouseX);		
							this.setLeft(xx);
							this.setTop(yy);
						}
					break;
				}
				this.mouseX = x;
				this.mouseY = y;
			}
		}catch(e){
		   alert(e)
		}
	},
	doSysMouseDown: function(x, y, button,target){		
	},
	setHeight: function(data){
		window.app_builder_component_controls_control.prototype.parent.setHeight.call(this, data);		
		this.bottomThumb.style.top = this.height - 2;
		this.leftThumb.style.top = this.height / 2 - 2;
		this.rightThumb.style.top = this.height / 2 - 2;
		this.setProperty("height",data);
	},
	setWidth: function(data){
		window.app_builder_component_controls_control.prototype.parent.setWidth.call(this, data);		
		this.bottomThumb.style.left = this.width / 2 - 2;
		this.topThumb.style.left = this.width / 2 - 2;
		this.rightThumb.style.left = this.width - 2;
		this.setProperty("width",data);
	},
	setTop: function(data){
		window.app_builder_component_controls_control.prototype.parent.setTop.call(this, data);				
		this.setProperty("top",data);
	},
	setLeft: function(data){
		window.app_builder_component_controls_control.prototype.parent.setLeft.call(this, data);		
		this.setProperty("left",data);
	},
	setHint: function(data){
		window.app_builder_component_controls_control.prototype.parent.setHint.call(this, data);		
		this.setProperty("hint",data);
	},
	setVisible: function(data){
		window.app_builder_component_controls_control.prototype.parent.setVisible.call(this, data);		
		this.setProperty("visible",data);
	},
	setTabIndex: function(data){
		window.app_builder_component_controls_control.prototype.parent.setTabIndex.call(this, data);		
		this.setProperty("tabIndex",data);
	},
	setOpacity: function(data){
		window.app_builder_component_controls_control.prototype.parent.setOpacity.call(this, data);		
		this.setProperty("opacity",data);
	},
	setTabStop: function(data){
		window.app_builder_component_controls_control.prototype.parent.setTabStop.call(this, data);		
		this.setProperty("tabStop",data);
	},
	setName: function(data){
		window.app_builder_component_controls_control.prototype.parent.setName.call(this, data);		
		this.setProperty("name",data);
	},
	setTag: function(data){
		window.app_builder_component_controls_control.prototype.parent.setTag.call(this, data);		
		this.setProperty("tag",data);
	},
	setStyle: function(data){
		window.app_builder_component_controls_control.prototype.parent.setStyle.call(this, data);		
		this.setProperty("style",data);
	},
	getStyle: function(){
		return this.getCanvas().style.cssText;
	},
	getContainer: function(){
		return this.bingkai;
	},
	setProperty: function(name, value){
		if (this.property == undefined) return;		
		if (typeof(value) == "string")
			eval("this.property."+name+" = '"+value+"';");
		else eval("this.property."+name+" = "+value+";");
		this.onPropertyChange.call(this, name, value);
	},
	getProperty : function(){
		return this.property;
	},	
	addProperty: function(obj){
	    try{
			for (var p in obj){
				this.setProperty(p,obj[p]);
			}
		}catch(e){
			alert(e);
		}
	},
	addEvent: function(obj){
	    try{
			for (var p in obj){
				this.setEvent(p,obj[p]);
			}
		}catch(e){
			alert(e);
		}
	},
	setEvent: function(name, value){
		if (typeof(value) == "string")
			eval("this.event."+name+" = '"+value+"';");		
		this.onEventChange.call(this, name, value);
	},
	getEvent : function(){
		return this.event;
	},
	setClassName : function(data){
		this.className = data;
		this.setProperty("className",data);
	}
});