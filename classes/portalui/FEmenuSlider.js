//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEmenuSlider = function(owner){
	window.portalui_FEmenuSlider.prototype.parent.constructor.call(this,owner);	
	this.className = "portalui_FEmenuSlider";
	this.width = 300;
	this.height = 130;		
	this.items = [];
	this.page = 0;
	this.rad = 5;
	this.onItemClick = new portalui_eventHandler();
	this.alignment = alCenter;
};
window.portalui_FEmenuSlider.extend(window.portalui_control);
window.FEmenuSlider = window.portalui_FEmenuSlider;
window.portalui_FEmenuSlider.implement({
	doDraw: function(canvas){	
		try{
			this.id =this.getFullId();
			canvas.style.background = "";	
			var html = 	"<div id='"+this.id+"_frame' style='{position:absolute;left:5;width:100%;;height:60;top:0;overflow:hidden}'>"+
							"<div id='"+this.id+"_cont' style='{position:absolute;left:0;width:auto;height:60;top:15;}'></div>"+
						"<div>"+
						"<div id='"+this.id+"_scroll' style='{display:none;position:absolute;left:10;top:0;width:100%;height100%;}'>"+
							"<div id='"+this.id+"_btnLeft' style='{position:absolute;left:0;top:0;width:30;height:20;;background:url(image/sliderLeft2.png)0 0 repeat-x;}'></div>"+
							"<div id='"+this.id+"_btnRight' style='{position:absolute;left:0;top:0;width:30;height:20;background:url(image/sliderRight2.png)0 0 repeat-x;}'></div>"+
							"<div id='"+this.id+"_bLeft' style='{position:absolute;left:0;top:0;filter:alpha(opacity=0.5);moz-opacity:0.5;opacity:0.5;width:30;height:20;background:url(image/sliderLeft.png)0 0 repeat-x;cursor:pointer}' "+					
							"onMouseDown='system.getResource("+this.resourceId+").doClick(event,1)' "+
							"onMouseOver='system.getResource("+this.resourceId+").doMouseOver(event,1)' "+
							"onMouseOut='system.getResource("+this.resourceId+").doMouseOut(event,1)' "+
							"></div>"+
							"<div id='"+this.id+"_slider' style='{position:absolute;left:30;top:0;filter:alpha(opacity=0.5);moz-opacity:0.5;opacity:0.5;width:100%;height:20;background-color:#333333;background:url(image/slider.png)0 0 repeat-x;}'></div>"+
							"<div id='"+this.id+"_center' style='{position:absolute;left:21;top:0;width:100%;height:20;background:url(image/sliderCenter.png)0 0 no-repeat;}'></div>"+
							"<div id='"+this.id+"_bRight' style='{position:absolute;left:0;top:0;filter:alpha(opacity=0.5);moz-opacity:0.5;opacity:0.5;width:30;height:20;background:url(image/sliderRight.png)0 0 repeat-x;cursor:pointer}' "+
							"onMouseDown='system.getResource("+this.resourceId+").doClick(event,2)' "+
							"onMouseOver='system.getResource("+this.resourceId+").doMouseOver(event,2)' "+
							"onMouseOut='system.getResource("+this.resourceId+").doMouseOut(event,2)' "+
							"></div>"+				
						"</div>";
			this.setInnerHTML(html, canvas);	
			this.canvas = canvas;	
			this.scroll = $(this.id+"_scroll");
			this.bleft = $(this.id+"_bLeft");
			this.slider = $(this.id+"_slider");
			this.center = $(this.id+"_center");
			this.bright = $(this.id+"_bRight");
			this.btnright = $(this.id+"_btnRight");
			this.btnleft = $(this.id+"_btnLeft");
			this.container = $(this.id+"_cont");
			this.frame = $(this.id+"_frame");
		}catch(e){
			alert(e);
		}
	},
	doClick: function(event, id){		
		try{					
			if (id == 1){
				if (this.page > 1) this.page--;		
			}else {
				if (this.page < this.total) this.page++;
			}		
			if (this.page == 1 )	
				var pos = 21; 
			else if (this.page == this.total)
				var pos = (this.width - 100);
			else var pos = (this.inc * (this.page - 1)) + (this.inc / 2); 
			this.center.style.left = pos;
			this.container.style.left = -((this.page - 1) * ((9 * 100) + 5));		
		}catch(e){
			alert(e);
		}
	},
	doMouseOver: function(event, id){		
		if (id == 1)
		 this.btnleft.style.backgroundPosition = '0 -20';		
		else  this.btnright.style.backgroundPosition = '0 -20';		
	},
	doMouseOut: function(event, id){		
		if (id == 1)
		 this.btnleft.style.backgroundPosition = '0 0';		
		else  this.btnright.style.backgroundPosition = '0 0';		
	},
	setWidth: function(data){
		window.portalui_FEmenuSlider.prototype.parent.setWidth.call(this,data);
		this.scroll.style.width = data - 80;
		this.slider.style.width = data - 80;
		this.bright.style.left = data - 50;	
		this.btnright.style.left = data - 50;	
		this.frame.style.width = data - 10;
	},
	setHeight: function(data){
		window.portalui_FEmenuSlider.prototype.parent.setHeight.call(this,data);
		this.scroll.style.top = data - 20;	
		this.container.style.height = data - 40;
		this.frame.style.height = data;
	},
	setBackground: function(data){
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.background = data;
	},
	setBgColor: function(data){
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.backgroundColor = data;
	},
	doItemMouseOver: function(event, img){
		var img = $(img);
		if (img != undefined){
			img.width = 100;
			img.height = 100;
		}
	},
	doItemMouseOut: function(event, img){
		var img = $(img);
		if (img != undefined){
			img.width = 80;
			img.height = 80;
		}
	},
	addItems: function(img, caption, link){			
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = 100;
		div.style.height = 100;
		div.style.cursor = "pointer";
		div.style.background = "#ff9900";
		div.style.border = "2px solid #cccccc";
		if (this.alignment == alCenter){
			div.style.left = (this.items.length * parseInt(div.style.width)) + (this.width / 2 - ((this.items.length + 1) * 100) / 2) + 10;		
		}else{
			div.style.left = (this.items.length * parseInt(div.style.width)) + 30;
		}
		div.id = this.id+" "+this.items.length;		
		var n = this.id+" "+this.items.length;
		if (document.all);
		var html =  "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeftTop.png) top left; position: absolute; left: -15; top: 0; width: 15; height: 20}' ></div>" +
                    "<div style='{position: absolute; left: -15; top: -20; width: 15; height: 100%; overflow: hidden;}' >" +
                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
                    "<div style='{position: absolute; left: -15; top: -20; width: 15; height: 100%;}' >" +
                        "<div id='" + n + "_sLeftBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeftBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20}' ></div>" +
                    "</div>" +
                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowEdgeLeft.png) top left; position: absolute; left: -15; top: 100%; width: 15; height: 20}' ></div>" +
                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/shadowRightTop.png) top left; position: absolute; left: 100%; top: 0; width: 15; height: 20}' ></div>" +
                    "<div style='{position: absolute; left: 100%; top: -20; width: 15; height: 100%; overflow: hidden;}' >" +
                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowRight.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
                    "<div style='{position: absolute; left: 100%; top: -20; width: 15; height: 100%;}' >" +
                        "<div id='" + n + "_sRightBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowRightBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20}' ></div>" +
                      "</div>" +
                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowEdgeRight.png) top left; position: absolute; left: 100%; top: 100%; width: 15; height: 20}' ></div>" +
                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottomLeft.png) top left; position: absolute; left: 0; top: 100%; width: 15; height: 20}' ></div>" +
                    "<div style='{position: absolute; left: -15; top: 100%; width: 100%; height: 20; overflow: hidden;}' >" +
                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottom.png) top left repeat-x; position: absolute; left: 30; top: 0; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
                    "<div style='{position: absolute; left: -15; top: 100%; width: 100%; height: 20;}' >" +
                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottomRight.png) top left repeat-x; position: absolute; left: 100%; top: 0; width: 15; height: 100%}' ></div>" +
                    "</div>" +                
					"<img id='"+div.id+"_img' src='"+img+"'  width=70 height=80 style='{position:absolute;top:5;left:5;}' "+					
					"/>"+					
					"<div id='"+div.id+"_hdr' style='{color:#000000;position:absolute;top:85;left:5;width:80;height:auto}' align='center'>"+caption+"</div>";							
		div.onmouseover = new Function("event","system.getResource("+this.resourceId+").doItemMouseOver(event,\""+div.id+"_img\")");
		div.onmouseout = new Function("event","system.getResource("+this.resourceId+").doItemMouseOut(event,\""+div.id+"_img\")");
		div.onclick = new Function("event","system.getResource("+this.resourceId+").doItemClick(event,\""+link+"\",\""+div.id+"_img\")");
		this.setInnerHTML(html, div);
		this.container.appendChild(div);
		this.items.push(div);
		this.total = Math.ceil(this.items.length / 9);		
		this.inc = parseInt(this.scroll.style.width,10) / this.total;		
		this.page = 1;
		if (this.alignment == alCenter){
			for (var i=0; i <this.items.length;i++){
				this.items[i].style.left = ((this.width / 2) - (this.items.length * parseInt(this.items[i].style.width) / 2) - (parseInt(this.items[i].style.width) / 2) + ( (i - 1) * 20) + ( i  * parseInt(this.items[i].style.width))) + 50;		
			}
		}else{
			for (var i=0; i <this.items.length;i++){
				this.items[i].style.left = ( i * 100) + (30 * i);		
			}
		}
		if ((this.items.length * 100) > this.width) this.scroll.style.display = "";	
	},
	rearrange: function(){
		try{
			var step = "cek alignment";
			if (this.alignment == alCenter){
				step = "geser";
				for (var i=0; i <this.items.length;i++){
					step = "geser "+i+" "+this.items[i];
					this.items[i].style.left = ((this.width / 2) - (this.items.length * parseInt(this.items[i].style.width) / 2) - (parseInt(this.items[i].style.width) / 2) + ( (i - 1) * 20) + ( i  * parseInt(this.items[i].style.width))) + 50;		
				}
			}else{
				for (var i=0; i <this.items.length;i++){
					step = "geser "+i;
					this.items[i].style.left = ( i * 100) + (30 * i);		
				}
			}
		}catch(e){
			alert("rearrange menu:"+e+"\r\n"+step);
		}
	},
	withScrolls: function(data){
		this.withScrolls = data;
		if (data){
			this.scroll.style.display = "";
		}else this.scroll.style.display = "none";
	},
	doItemClick: function(event, link, id){		
		var target = $(id);	
		this.onItemClick.call(target, link);	
	},
	setItemsColor: function(color){	
		var child = this.container.firstChild;
		while (child != undefined) {
			child.style.background = color;
			this.bordered(child);
			child = child.nextSibling;
		}
	},
	bordered: function(div){	
		settings = {
			  tl: { radius: 10 },
			  tr: { radius: 10 },
			  bl: { radius: 10 },
			  br: { radius: 10 },
			  antiAlias: true,
			  autoPad: true,
			  validTags: ["div"]
		  };
		var rounded = new curvyCorners(settings,div);				
		rounded.applyCornersToAll();
	},
	nonbordered: function(){		
	},
	setBordered: function(pixel, color){	
		this.canvas.style.border = pixel +"px solid "+color;
	},
	makeRounded: function(rad){	
		settings = {
			  tl: { radius: rad },
			  tr: { radius: rad },
			  bl: { radius: rad },
			  br: { radius: rad },
			  antiAlias: true,
			  autoPad: true,
			  validTags: ["div"]
		  };
		var rounded = new curvyCorners(settings,this.canvas);				
		rounded.applyCornersToAll();
		this.rad = rad;
		this.withRounded = true;
	},
	setColor: function(color){	
		this.canvas.style.backgroundColor = color;
		if (this.withRounde) this.makeRounded(this.rad);
	},
	setBackground: function(color){	
		this.canvas.style.background = color;
		if (this.withRounde) this.makeRounded(this.rad);
	},
	setAlignment: function(data){	
		this.alignment = data;
	}
});
