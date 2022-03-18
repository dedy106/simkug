//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_FEslider = function(owner,options){	
	window.app_builder_component_controls_FEslider.prototype.parent.constructor.call(this,owner,options);	
	this.className = "portalui_FEslider";
	this.interval = 5000;	
	this.enabled = false;
	this.opacity = 0;
	this.selId = -1;
	this.items = [];
	uses("portalui_timer");
	this.tim = new portalui_timer(this);
	this.tim.setInterval(this.interval);
	this.tim.onTimer.set(this, "slide");	
	this.hoverClr = "url(image/tabOver.png) repeat-x";
	this.deactClr = "url(image/tabBg.png) repeat-x";
	this.actClr = "url(image/tabBgDe.png) repeat-x";
	this.onItemsClick = new portalui_eventHandler();
	if (options !== undefined) this.updateByOptions(options);
	this.addProperty({className:this.className,color:"",background:"",enabled:false});	
	this.addEvent({itemsClick:""});
};
window.app_builder_component_controls_FEslider.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_FEslider.implement({
	doDraw: function(canvas){		
		canvas.style.cssText = "position:absolute;border:1px solid #cccccc;background:#ffffff;overflow:hidden";
		var ie = document.all ? true:false;
		this.id =this.getFullId();
		var html = "<div id='"+this.id+"_btn' style='{position:absolute;background:#ff0000;top:10;left:20;width:auto;height:26}'>"+
				"<div id='"+this.id+"_btnL' style='{display:none;position:absolute;background:url(image/toolbarL.png)0 0 no-repeat;top:0;left:0;width:14;height:26}'></div>"+
				"<div id='"+this.id+"_btnR' style='{display:none;position:absolute;background:url(image/toolbarR.png)0 0 no-repeat;top:0;left:0;width:14;height:26}'></div>"+
				"</div>"+
	            "<div id='"+this.id+"_image' style='{border:1px solid #cccccc;position:absolute;background:#f5f5f5;top:40;left:"+ (ie ? -1:-1)+";width:100%;height:225}'></div>"+
	            "<div id='"+this.id+"_desc' style='{position:absolute;top:275;left:10;width:100%;height:200}'></div>";
		this.setInnerHTML(html, canvas);
		this.canvas = canvas;	
		this.btnL = $(this.id+"_btnL");
		this.btnR = $(this.id+"_btnR");
		this.btn = $(this.id+"_btn");
		this.image = $(this.id+"_image");
		this.desc = $(this.id+"_desc");
	},
	setWidth: function(data){
		window.app_builder_component_controls_FEslider.prototype.parent.setWidth.call(this, data);
		if (this.image !== undefined) this.image.style.width = document.all ? this.width + 2 : this.width;
	},
	setBackground: function(data){
		this.setProperty("background",data);
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.background = data;
	},
	setBgColor: function(data){
		this.setColor(data);
	},
	setColort: function(data){
		this.setProperty("color",data);
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.backgroundColor = data;
	},
	addItem: function(img, header, shortDesc, id){
	  try{
	  	var arr = [img, header, shortDesc];	
	  	this.items[this.items.length] = arr;
	  	if (this.selId == -1) this.selId = 0;
	    var div,divBtn, divImg, divDesc;  
	    div = document.createElement("div");				
	    div.style.cssText = "position:absolute;width: 30;height: 26;left:"+((this.items.length - 1) * 30 + 14)+";top: 0;cursor:pointer;background:"+ this.deactClr+"";
	    div.onclick = new Function("event","window.system.getResource("+this.resourceId+").doClick(event,"+this.items.length+");");
		div.id = this.id+"_btn"+this.items.length;
	    div.align = "center";
		div.valign = "center";
	    div.innerHTML = this.items.length;
	    divBtn = this.btn;
	    divBtn.appendChild(div);
	    div = document.createElement("div");
	    div.id = this.id+"_image"+this.items.length;
	    div.style.cssText = "position:absolute;width:100%;height:225;display:none;overflow:hidden;cursor:pointer";		
	    div.innerHTML ="<img src='"+img+"' height=225 width=298 style='{position:absolute; left:0;}'/>";
	    div.onclick = new Function("event","window.system.getResource("+this.resourceId+").doItemsClick(event,'"+id+"');");
		divImg = $(this.id+"_image");
	    divImg.appendChild(div);  
	    div = document.createElement("div");
	    div.id = this.id+"_desc"+this.items.length;
	    div.style.position = "absolute";	    
	    div.style.display = "none";
		div.onclick = new Function("event","window.system.getResource("+this.resourceId+").doItemsClick(event,'"+id+"');");		
	    div.innerHTML ="<"+(document.all ? "h4" : "h2")+" style='{color:#0000ff}'>"+header+"</"+(document.all ? "h4" : "h2")+">"+shortDesc;
	    divDesc = $(this.id+"_desc");	
	    divDesc.appendChild(div);  
	   
		this.btnR.style.left =  (this.items.length) * 30 + 14; 
	    if (this.items.length == 1){
	      this.selId = 1;    
	      this.setEnabled(true);       		  
	    }
	  }catch(e){
	    alert(e)
	  }
	},
	clearItems: function(){
		this.items = new Array();
	},
	slide: function(){	
		try{
			this.opacity = 0;
			if (this.selId == -1) return false;				
			var cnv = $(this.id +"_image"+this.selId);
			cnv.style.display = "none";		
			cnv = $(this.id +"_desc"+this.selId);
			cnv.style.display = "none";
			cnv = $(this.id +"_btn"+this.selId);
			cnv.style.background = this.deactClr;
			if (this.selId < this.items.length)
				this.selId++;
			else this.selId = 1;
			cnv = $(this.id +"_image"+this.selId);
			cnv.style.display = "";
			cnv = $(this.id +"_desc"+this.selId);
			cnv.style.display = "";
			cnv = $(this.id +"_btn"+this.selId);
			cnv.style.background = this.actClr;			
			this.fadeImg();			
		}catch(e){
			systemAPI.alert(e);
		}		
	},
	fadeImg : function(){		
		var cnv = $(this.id +"_image"+this.selId);
		if (this.selId > -1) {			
			cnv.style.display = "";		
			if (this.opacity < 100)
			  this.opacity += 10;
			 else {
				this.opacity = 0;
				return false;
			 }
	  	}else {
	  		//clearTimeout(this.intervalId2);  		
		    this.opacity = 0;
	  		return false;
	  	}
	  	this.counter++;		
	  	cnv.style.MozOpacity = (this.opacity/100);
	    cnv.style.opacity = (this.opacity/100);
	    cnv.style.filter = 'alpha(opacity='+this.opacity+')';				
		this.intervalId2 = window.setTimeout("window.system.getResource(" + this.resourceId + ").fadeImg();", 200);		
	},
	setEnabled: function(data){
		this.enabled = data;
		this.setProperty("enabled",data);
		this.tim.setEnabled(data);
		if (this.enabled){	  
			this.opacity = 0;
			this.slide();					
		}else {			
			clearTimeOut(this.intervalId2);
		}				
	}
});
