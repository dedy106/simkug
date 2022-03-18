//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_FEnews = function(owner,options){
	window.app_builder_component_controls_FEnews.prototype.parent.constructor.call(this,owner,options);	
	this.className = "portalui_FEnews";
	this.width = 100;
	this.height = 50;		
	this.news = [];
	this.onItemsClick = new portalui_eventHandler();
	if (options !== undefined) this.updateByOptions(options);
	this.addProperty({className:this.className,color:"",background:""});		
	this.addEvent({itemsClick:""});
};
window.app_builder_component_controls_FEnews.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_FEnews.implement({
	doDraw: function(canvas){			
		canvas.style.background = "#ffffff";		
		this.canvas = canvas;	
	},
	setBackground:function(data){
		this.setProperty("background",data);
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.background = data;
	},
	setBgColor: function(data){
		this.setColor(data);
	},
	setColor: function(data){
		this.setProperty("color",data);
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.backgroundColor = data;
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
						"<div id='"+div.id+"_hdr' style='{color:#0000ff;position:absolute;top:10;left:70;width:"+(this.width - 80)+";height:20}'><strong>"+header+"</strong></div>"+
						"<div id='"+div.id+"_cont' style='{position:absolute;top:30;left:70;width:"+(this.width - 80)+";height:50}'>"+shortDesc+"</div>"					;
			this.setInnerHTML(html, div);
			div.onclick = new Function("event","system.getResource("+this.resourceId+").doItemsClick(event, '"+itemId+"');");
			cnv.appendChild(div);		
			this.news[this.news.length] = div;
		}		
	}
});