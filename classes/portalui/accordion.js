//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_accordion = function(owner){
	window.portalui_accordion.prototype.parent.constructor.call(this,owner);	
	this.className = "portalui_accordion";
	this.width = 300;
	this.height = 130;		
	this.items = [];
	this.page = 0;
	this.onItemClick = new portalui_eventHandler();
};
window.portalui_accordion.extend(window.portalui_control);
window.accordion = window.portalui_accordion;
window.portalui_accordion.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.backgroundColor = "#ffffff";
		canvas.style.backgroundImage = "url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x";
		canvas.style.border = "1px solid #ccc";
		//canvas.style.margin = "2px 2px 2px 2px";
		var html = 	"<div id='"+ n +"_caption' align='center' style='position:absolute;top:0;left:0;width:100%;height:25;background:url(image/themes/"+system.getThemes()+"/frameShadowTop.png) bottom left repeat-x;background-color:#ffffff;font-size:14'></div>"+
						"<div id='" + n + "_sLeftTop' style='background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8' ></div>" +
	                    "<div style='position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;' >" +
	                        "<div id='" + n + "_sLeft' style='background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8' ></div>" +
	                    "<div style='position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;' >" +
	                        "<div id='" + n + "_sRight' style='background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12' ></div>" +
	                    "<div style='position: absolute; left: -8; top: 100%; width: 100%; height: 12;' >" +
	                        "<div id='" + n + "_sBottomRight' style='background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12' ></div>" +
	                    "</div>" +
	                    "<div style='position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;' >" +
	                        "<div id='" + n + "_sBottom' style='background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%' ></div>" +
	                    "</div>"+
					"<div id='"+ n +"_frame' style='position:absolute;left:0;width:100%;height:100%;top:25;overflow:auto;'>"+
						"<div id='"+ n +"_cont' style='position:absolute;left:0;width:auto;height:auto;top:0;'></div>"+					
					"<div>";
		this.setInnerHTML(html);
		this.cont = $(n+"_cont");
		this.caption = $(n+"_caption");
		this.canvas = canvas;
	},
	addItem: function(img, title, shortDesc, id){
		containt = containt.split("<br>");
		containtKode = containtKode.split("<br>");
		var divTmp = "";
		for (var i in containt){
			divTmp += "<div ondblclick='system.getResource("+ this.resourceId +").doChildClick(\""+containt[i]+"\",\""+containtKode[i]+"\")'>"+containt[i]+"</div><br>";
		}
		var div =document.createElement("div");
		div.style.position = "relative";
		div.style.left = 0;
		//div.style.border = "1px solid #555555";
		div.style.width = this.width - 2;
		div.style.height = "auto";	
		div.onclick = new Function("event","system.getResource("+this.resourceId+").doItemClick(event)");
		var html = "<div style='border:1px outset #cccccc;background-color:#eeeeee;position:relative;top:0;left:0;height:20;width:100%;font-size:13;color:#999'>"+item+"</div>"+
					"<div style='display:none;position:relative;left:0;height:auto;width:100%;margin:5px 10px 5px 10px;'>"+divTmp+"</div>";
		this.setInnerHTML(html, div);	
		this.cont.appendChild(div);
	},
	doChildClick: function(child, childCode){	
		this.onItemClick.call(this, childCode, child);
	},
	doItemClick: function(event){	
		var target = document.all ? event.srcElement : event.target;
		if (target.nextSibling.style.display == "")
			target.nextSibling.style.display = "none";	
		else target.nextSibling.style.display = "";	
	},
	setCaption: function(data){	
		this.caption.innerHTML = data;
	},
	setBackground: function(data){	
		this.canvas.style.backgoundImage = data;
	},
	makeRounded: function(rad){			
	}
});
