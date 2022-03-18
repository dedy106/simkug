//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEdataContent = function(owner){
	window.portalui_FEdataContent.prototype.parent.constructor.call(this,owner);
	this.className = "portalui_FEdataContent";		
	this.onItemsClick = new portalui_eventHandler(this);
};
window.portalui_FEdataContent.extend(window.portalui_control);
window.FEdataContent = window.portalui_FEdataContent;
window.portalui_FEdataContent.implement({
	doDraw: function(canvas){		
		canvas.style.border = "1px solid #cccccc";
		canvas.style.background = "";
		canvas.style.overflow = "hidden";	
		canvas.align = "center";
		this.id = this.getFullId();
		var html = "<div id='"+this.id+"_blocker' style='{background:#4d7795;position:absolute; left:0; top:0; width:100%;height:100%;"+
						"filter:alpha(opacity:80);opacity:0.8;moz-opacity:0.8;}'></div>"+
					"<div id='"+this.id+"_btn' style='{cursor:pointer;background-image:url(image/close.png);background-position:top left;background-repeat: no-repeat;position:absolute; left:0; top:5px; width:24;height:24}' "+
						"onclick='system.getResource("+this.resourceId+").doClose();'"+
						"onMouseOver='system.getResource("+this.resourceId+").doMouseEnter(event);'"+
						"onMouseMove='system.getResource("+this.resourceId+").doMouseMove(event);'"+
						"title='Close Frame'></div>"+
					"<div  id='"+this.id+"_frame'  align='left' style='{float:left;overflow:auto;border:1px solid #4d7795;background:#ffffff;position:absolute; left:0; top:5%; width:100%;height:90%}'>"+										
						"<div style='{height:100%;width;100%;float:left;padding-left:5px;padding-top:5px;margin-left:0px;margin-right:0px;padding-bottom:10px;}'>"+
							"<div id='"+this.id+"_header' style='{display:inline; width:100%;height:28px;margin:5px 0px 5px 0px;font-style:normal;color:rgb(51,102,153);font-weight:bold;font-size:24px;font-family:arial}'>Planted "+					
							"</div>"+
							"<div style='{clear:both;display:block;width:100%}'></div>"+
							"<div style='{clear:both;display:block;width:100%;margin-top:20px}'></div>"+										
							"<div style='{clear:both;display:block;width:100%}'></div>"+
							"<div id='"+this.id+"_imageCont' align='center' style='{display:inline;float:left; width:300;height:300;margin-left:10px;margin-right:10px;}'>"+
								"<div id='"+this.id+"_image' style='{display:block;height:225;width:298;margin-bottom:5px}'>"+						
								"</div>"+
								"<div id='"+this.id+"_imageTitle' align='left' style='{display:block;height:28;color:#333;width:298;margin-bottom:0px;font-family:arial;font-size:10px;font-style: normal;font-variant: normal;font-weight: normal}'>"+						
								"</div>"+
							"</div>"+					
							"<div id='"+this.id+"_tanggal' style='{display:inline; width:400;height:13px;font-size:10px;margin:bottom:2px;text-transform:uppercase;margin-left:10px;color:rgb(51,153,504)}'>"+					
							"</div>"+
							"<div id='"+this.id+"_container' style='{display:inline; width:100%;height:auto;text-justify:inter-word;text-align:justify;font-family:arial;font-size:12px;font-style: normal;font-variant: normal;font-weight: normal}'>"+																	
							"</div>"+										
						"</div>"+
					"</div>";
		this.setInnerHTML(html, canvas);
		this.canvas = canvas;	
		this.container = $(this.id+"_container");		
		this.contImg = $(this.id+"_image");
		this.imgTitle = $(this.id+"_imageTitle");
		this.tanggal = $(this.id+"_tanggal");
		this.frame = $(this.id+"_frame");
		this.header = $(this.id+"_header");
		this.btn = $(this.id+"_btn");
		this.frameR = $(this.id+"_frameRelated");
		this.containerR = $(this.id+"_containerR");				
		
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
	setData: function(header, data, img, imgTitle, tgl){
		this.data = data;
		this.header.innerHTML = header;
		this.container.innerHTML = data;
		this.contImg.innerHTML = img;
		this.imgTitle.innerHTML = imgTitle;
		this.tanggal.innerHTML = tgl;
		this.show();
		this.bringToFront();
	},
	setRelated: function(items){
		this.itemsRelated = items;
		var caption,html = "<ul style='{line-style-position:outside;margin-top:5px;cursor:pointer;}'>";	
		for (var i in items){
			caption = items[i][1];
			html += "<li style='{display:list-item;height:auto;border-bottom-color: rgb(238, 238, 238);border-bottom-style: solid;border-bottom-width: 1px;display: list-item;height: 16px;padding-bottom: 2px;padding-left: 10px;padding-top: 2px;}' "+
					"onClick = 'system.getResource("+this.resourceId+").doRelatedClick(\""+items[i][0]+"\",\""+items[i][1]+"\")'"+
					">"+caption+"</li>";
		}
		html += "</ul>";
		this.setInnerHTML(html, this.containerR);		
	},
	doRelatedClick: function(id, caption){
		this.onItemsClick.call(this,id,caption);
	},
	doClose: function(){
		this.hide();
	},
	doMouseEnter: function(event){	
		system.showHint(event.clientX+10, event.clientY+5,"close");
	},
	doMouseMove: function(event){
		system.showHint(event.clientX+10, event.clientY+5,"close");
	},
	setWidth: function(data){
		window.portalui_FEdataContent.prototype.parent.setWidth.call(this, data);
		this.btn.style.left = data - 25;
		this.frame.style.width = data - 3;
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
			DD_belatedPNG.fixPng(this.btn);
		}
	},
	setHeight: function(data){
		window.portalui_FEdataContent.prototype.parent.setHeight.call(this, data);		
		//this.frame.style.height = data - 10;
	}
});
