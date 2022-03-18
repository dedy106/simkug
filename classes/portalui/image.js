//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_image = function(owner, options){
	window.portalui_image.prototype.parent.constructor.call(this, owner, options);
	this.className = "portalui_image";
	this.filePath = "";
	this.onClick = new portalui_eventHandler();
	this.hint = "image";        
	this.showHint = false;
	this.autoView = false;	
	this.viewType = 0;	
	if (options !== undefined){
		this.updateByOptions(options);
		if (options.color) this.setColor(options.color);						
		if (options.image) this.setImage(options.image);						
		if (options.border) this.setBorder(options.border[0],options.border[1]);				
		if (options.autoView) this.setAutoView(options.autoView);				
		if (options.proportional !== undefined) this.setProportional(options.proportional);		
		if (options.showHint) this.setShowHint(options.showHint);	
		if (options.click) {
                if (typeof options.click == "string")
                    this.onClick.set(this.getTargetClass(),options.click);
                 else if (this.onClick.isFunction(options.click))
					this.onClick.set(undefined, options.click);
                else this.onClick.set(options.click[0],options.click[1]);	
        }
	}
};
window.portalui_image.extend(window.portalui_control);
window.image = window.portalui_image;
window.portalui_image.implement({
	doDraw: function(canvas){
		canvas.onclick = new Function("event","system.getResource("+this.resourceId+").doClick(event);");
		canvas.onmouseover = new Function("event","system.getResource("+this.resourceId+").doMouseOver(event);");
		canvas.onmouseout = new Function("event","system.getResource("+this.resourceId+").doMouseOut(event);");
		var html = "<div id ='"+ this.getFullId() +"_container' style='position:absolute;left:0;top:0;width:100%;height:100%;;' "+
					" onMouseMove='system.getResource("+this.resourceId+").doMouseMove(event);' "+
					"></div>";
		this.setInnerHTML(html, canvas);
		this.cnv = $(this.getFullId() +"_container");
	},
	setImage: function(data, iframe){
		try{
			this.filePath = data;	
			var canvas = this.cnv;
			if (canvas != undefined)	
				if (iframe == undefined)
					canvas.innerHTML= "<img id='"+this.getFullId()+"_img' width='100%' height='100%' src='"+data+"' "+			
						"style='position:absolute;left:0;top:0;width:100%;height:100%;cursor:' />";
				else canvas.innerHTML= "<iframe id='"+this.getFullId()+"_img' width='100%' height='100%' src='"+data+"' frameborder='0' "+			
						"style='position:absolute;left:0;top:0;width:100%;height:100%;' />";				
			this.img = $(this.getFullId()+"_img");
			this.setProportional(0);			
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
				DD_belatedPNG.fixPng(this.img);
			}
		}catch(e){
			alert(e);
		}
	},
	setBorder: function(width, color){
		this.getCanvas().style.border = width +" solid "+ color;		
		width = parseInt(width);		
		this.img.style.width = document.all ? this.width - (width * 2): this.width;
		this.img.style.height = document.all ? this.height - (width * 2):this.height;		
	},
	setColor: function(data){
		var canvas = this.getCanvas();
		if (canvas != undefined)	
			canvas.style.background = data;
	},
	doClick: function(event){
		this.onClick.call(this);
	},
	doMouseMove: function(event){
		try{	
			if (this.showHint)
				window.system.showHint(event.clientX, event.clientY, this.hint, true);	
		}catch(e){
			error_log(e);
		}
	},
	doMouseOver: function(event){		
		
		if (this.autoView) this.showActualSize();		
	},
	doMouseOut: function(event){
		if (this.showHint)
			window.system.hideHint();	
	},
	setShowHint: function(data){
		this.showHint = data;
	},
	setWidth: function(data){
		window.portalui_image.prototype.parent.setWidth.call(this, data);	
		if (this.img !== undefined){
			this.img.width = data;
			this.img.style.width = data;
		}		
	},
	setHeight: function(data){
		window.portalui_image.prototype.parent.setHeight.call(this, data);	
		if (this.img !== undefined){
			this.img.height = data;
			this.img.style.height = data;
		}	
	},
	setProportional: function(data){
		this.viewType = data;
		if (data == 1){//proportional
			//this.img = $(this.getFullId()+"_img");
			var sH = this.height / this.img.naturalHeight;
			var sW = this.width / this.img.naturalWidth;					
			if (sH < sW) {
				this.img.height = this.height;
				this.img.width = Math.round(this.img.naturalWidth * sH);
				this.img.style.height = this.height;
				this.img.style.width = Math.round(this.img.naturalWidth * sH);
			} else {
				this.img.width = this.width;
				this.img.height = Math.round(this.img.naturalHeight * sW);
				this.img.style.width = this.width;
				this.img.style.height = Math.round(this.img.naturalHeight * sW);
			}	
			this.img.style.top = (this.height  / 2) -  ( this.img.height / 2);
			this.img.style.left = (this.width / 2) - ( this.img.width / 2);
		}else{	//stretch
			this.img = $(this.getFullId()+"_img");
			this.img.style.height = this.height;
			this.img.style.width = this.width;
			this.img.height = this.height;
			this.img.width = this.width;
		}	
	},
	showActualSize: function(){	
		try{
			var app = this.getApplication();
			if (app.imgLoader == undefined || (system.getResource(app.imgLoader.resourceId) == undefined ) ){		
				uses("portalui_imageLoader");
				app.imgLoader = new portalui_imageLoader(app);				
			}								
			app.imgLoader.setImage(this.filePath);			
			app.imgLoader.fade();
			app.imgLoader.showModal();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setAutoView: function(data){
		this.autoView = data;
	},
	setViewLup: function(data){	
		var img = this.img;		
		if (img == undefined) return;
		if (data)
			img.style.cursor = "url(image/cursor.gif), default";	
		else img.style.cursor = "default";	
	},
	setCursor: function(data){
		var img = $(this.getFullId()+"_img");		
		img.style.cursor = data;	
	}
});
