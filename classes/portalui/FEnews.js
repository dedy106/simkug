//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEnews = function(owner){

	window.portalui_FEnews.prototype.parent.constructor.call(this,owner);	
	this.className = "portalui_FEnews";
	this.width = 100;
	this.height = 50;		
	this.news = [];
	this.onItemsClick = new portalui_eventHandler();
};
window.portalui_FEnews.extend(window.portalui_control);
window.FEnews = window.portalui_FEnews;
window.portalui_FEnews.implement({
	doDraw: function(canvas){			
		canvas.style.background = "#ffffff";		
		this.canvas = canvas;	
	},
	setBackground:function(data){
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.background = data;
	},
	setBgColor: function(data){
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.backgroundColor = data;
	},
	doItemsClick: function(event,itemId){		
		this.onItemsClick.call(this, itemId, event);
	},
	addNews: function(img, header, shortDesc, id){
		var cnv = this.canvas;
		if (cnv != undefined){
			var div = document.createElement("div");
			div.style.position = "relative";
			div.style.width = this.width - 30;
			div.style.height = 70;
			div.style.left = 5;
			div.style.borderBottom = "1px solid #000000";
			div.style.cursor = "pointer";
			div.id = this.getFullId()+" "+id;
			var itemId = id;
			var html =  "<img id='"+div.id+"_img' src='"+img+"' width='60' height='60' style='{position:absolute;top:5;left:5;}' />"+
						"<div id='"+div.id+"_hdr' style='{color:#0000ff;position:absolute;top:10;left:70;width:"+((this.width - 80).toString())+";height:20}'><strong>"+header+"</strong></div>"+
						"<div id='"+div.id+"_cont' style='{position:absolute;top:30;left:70;width:"+(this.width - 80).toString()+";height:50}'>"+shortDesc+"</div>"					;
			this.setInnerHTML(html, div);
			div.onclick = new Function("event","system.getResource("+this.resourceId+").doItemsClick(event, '"+itemId+"');");
			cnv.appendChild(div);		
			this.news[this.news.length] = div;
		}		
	}
});
