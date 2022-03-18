//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEtabPanel = function(owner,options){
	try{
		this.color = "";//"#e8f3f7"
		this.headerHeight = 20;
		window.portalui_FEtabPanel.prototype.parent.constructor.call(this,owner,options);
		this.className = "portalui_FEtabPanel";
		this.childPage = [];
		this.childCaption = [];
		this.activePage = -1;	
		this.hoverClr = "url(image/tabOver.png) repeat-x";
		this.deactClr = "url(image/tabBg.png) repeat-x";
		this.actClr = "url(image/tabBgDe.png) repeat-x";	
		this.childPageItems = [];
		this.onTabChange = new portalui_eventHandler();
		this.onChildItemsClick = new portalui_eventHandler();
		uses("portalui_FEtabChild");
		if (options !== undefined) {
			this.updateByOptions(options);
			if (options.pageCaption !== undefined) this.setPageCaption(options.pageCaption);
			if (options.headerHeight !== undefined) this.setHeaderHeight(options.headerHeight);
		}
		
	}catch(e){
		alert(e);
	}
};
window.portalui_FEtabPanel.extend(window.portalui_containerControl);
window.FEtabPanel = window.portalui_FEtabPanel;
window.portalui_FEtabPanel.implement({
	doDraw: function(canvas){					
		canvas.style.background = this.color;		
		this.canvas = canvas;	
		var html = "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}'>"+
							"<div id='" +this.getFullId() + "_header' style='{position: absolute; left: 0; top: 0; width: 100%; height: "+this.headerHeight+"}' "+
							"></div>"+
							"<div id='" +this.getFullId() + "form' style='{position: absolute; left: 0; top: "+this.headerHeight+"; width: 100%; height: 100%}' "+
							"></div>"+
						   "</div>"+
						   "<div id='" +this.getFullId() + "_block' style='{display:none;background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7;position: absolute; left: 0; top: 0; width: 100%; height: 100%}' "+
						   "></div>";
		this.setInnerHTML(html, canvas);
		this.id = this.getFullId();
		this.blockFrame = $(this.getFullId() + "_block");	
		this.header = $(this.getFullId() + "_header");	
		this.form = $(this.getFullId() + "form");	
	},
	block: function(){
		this.blockFrame.style.display = "";
	},
	unblock: function(){
		this.blockFrame.style.display = "none";
	},
	setHeight: function(data){
		window.portalui_FEtabPanel.prototype.parent.setHeight.call(this, data);
		this.form.style.height = data - this.headerHeight;
		for (var i in this.childPage)
			this.childPage[i].setHeight(data - this.headerHeight);
	},
	setHeaderBg: function(data){
		var cnv = undefined;
		for (var i in this.childCaption)	
		{
			cnv = $(i);
			if (cnv != undefined){
				cnv.style.background = data;			
			}		
		}	
	},
	delTab: function(id){		
		var cnv = this.childPage[id];
		if (cnv != undefined) cnv.free();
		var node = $(this.id+"_"+id+"_cap");
		if (node != undefined)
			this.header.removeChild(node);
		this.rearrangeHeader();
		this.childPage.splice(id, 1);
		this.childCaption.splice(id, 1);
	},
	setHeaderHeight: function(data){
	   this.headerHeight = data;
	   this.header.style.height = data;
	   for (var i in this.childPage){
	        this.childPage[i].setTop(this.headerHeight);
            this.childPage[i].setHeight(data - this.headerHeight);
	   }
    },
	addTab: function(caption){		
		try{	
			if (this.activePage == -1) 
				this.activePage = 0;	
			//-------------------------------- create caption		
			var step = "loop 1";
			var child, childCnv;
			
			//-------------------------------- create page
			
			child = new portalui_FEtabChild(this);			
			child.setWidth(this.width);
			child.setHeight(this.height - this.headerHeight);
			child.setTop(0);									
			if (this.childPage.length > 0){ 						
				child.hide();	
			}			
			this.childPage[this.childPage.length] = child;														
			step = "loop 2";			
			var i = (this.childPage.length - 1);
			var childHead = document.createElement("div");			
			childHead.id = this.id+"_"+ i +"_cap";
			step = "loop 2 init";
			childHead.style.position = "absolute";
			childHead.style.width = 80;		
			childHead.style.height = "100%";	
			childHead.style.top = 0;
			childHead.style.left = 0;
			childHead.style.borderLeft = "1px solid #88d5f4";
			childHead.style.borderTop = "1px solid #88d5f4";
			childHead.style.borderRight = "1px solid #88d5f4";
			childHead.style.cursor = "pointer";
			step = "loop 2 font";			
			childHead.align = "center";			
			step = "loop 2 bakcgorund";
			if (i == 0){
				childHead.style.background = this.actClr;
				childHead.style.color = "#000000";
			}else{
				childHead.style.background = this.deactClr;
				childHead.style.color = "#ffffff";
			}
			childHead.onclick = new Function("event","system.getResource("+this.resourceId+").doClick(event,"+i+")");
			childHead.onmouseover = new Function("event","system.getResource("+this.resourceId+").doMouseOver(event,"+i+")");
			childHead.onmouseout = new Function("event","system.getResource("+this.resourceId+").doMouseOut(event,"+i+")");
			childHead.innerHTML = caption;		
			this.header.appendChild(childHead);
			this.childCaption[childHead.id] = caption;
			this.childPageItems[this.childPageItems.length] =  [];
			this.rearrangeHeader();
					
		}catch(e){
			alert(e +" "+step);
		}
	},
	setWidth: function(data){
		window.portalui_FEtabPanel.prototype.parent.setWidth.call(this, data);
		for (var i in this.childPage){
			this.childPage[i].setWidth(data);
		}
	},
	setPageCaption: function(caption){				
		if (typeof caption == "string") caption = eval(caption);
		this.addPage(caption);
	},
	addPage: function(caption){		
		try{	
			if (this.activePage == -1) 
				this.activePage = 0;	
			//-------------------------------- create caption			
			var child, childCnv;
			this.childPage = [];
			
			for (var i in caption){
				//-------------------------------- create page
				child = new portalui_FEtabChild(this);			
				child.setWidth(this.width);
				child.setHeight(this.height - this.headerHeight);
				child.setName(this.resourceId+"_Child"+i);
				child.setTop(0);						
				child.show();			
				if (this.childPage.length > 0){ 						
					child.hide();	
				}			
				this.childPage[this.childPage.length] = child;												
			}			
			for (var i in caption) {		
				var childHead = document.createElement("div");
				childHead.id = this.id+"_"+i+"_cap";			
				childHead.style.position = "absolute";
				childHead.style.width = 80;		
				childHead.style.height = "100%";	
				childHead.style.top = 0;
				childHead.style.left = 0;
				childHead.style.borderLeft = "1px solid #88d5f4";
				childHead.style.borderTop = "1px solid #88d5f4";
				childHead.style.borderRight = "1px solid #88d5f4";
				childHead.style.cursor = "pointer";
				childHead.style.fontWeight = "bold";
				childHead.align = "center";			
				if (i == 0){
					childHead.style.background = this.actClr;
					childHead.style.color = "#000000";
				}else{
					childHead.style.background = this.deactClr;
					childHead.style.color = "#ffffff";
				}
				childHead.onclick = new Function("event","system.getResource("+this.resourceId+").doClick(event,"+i+")");
				childHead.onmouseover = new Function("event","system.getResource("+this.resourceId+").doMouseOver(event,"+i+")");
				childHead.onmouseout = new Function("event","system.getResource("+this.resourceId+").doMouseOut(event,"+i+")");				
				childHead.innerHTML = caption[i];						
				this.header.appendChild(childHead);
				this.childCaption[childHead.id] = caption[i];
				this.childPageItems[this.childPageItems.length] =  [];
			}
			this.rearrangeHeader();
			
		//return divChild;
		}catch(e){
			alert(e);
		}
	},
	doClick: function(event, id){			
		try{
			if (id != this.activePage){				
				var cnv = this.childPage[this.activePage];
				if (cnv != undefined) cnv.hide();
				var cnv = $(this.id+"_"+this.activePage+"_cap");
				if (cnv != undefined){		
					cnv.style.background = this.deactClr;		
					cnv.style.color = "#ffffff";
				}
				this.activePage = id;				
				var cnv = this.childPage[id];
				if (cnv != undefined) cnv.show();
				this.onTabChange.call(this,id);
			}
		}catch(e){
			alert("doClick::"+e);
		}
	},
	getChild: function(id){		
		return $(id);
	},
	rearrangeHeader: function(){		
		var cnv = undefined;
		var left = 0;
		var width = Math.round(this.width / this.childPage.length);								
		for (var i in this.childCaption)	
		{			
			cnv = $(i);
			if (cnv != undefined){
				cnv.style.width = width;
				cnv.style.left = left;
			}
			left += width;
		}
	},
	doMouseOver: function(event, id){		
		var cnv = $(this.id+"_"+id+"_cap");
		cnv.style.background = this.hoverClr;
		cnv.style.color = "#ffffff";
	},
	doMouseOut: function(event, id){		
		var cnv = $(this.id+"_"+id+"_cap");
		if (id == this.activePage){	
			cnv.style.background = this.actClr;
			cnv.style.color = "#000000";
		}else{
			cnv.style.background = this.deactClr;
			cnv.style.color = "#ffffff";
		}		
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
	setChildHTML: function(id, html){
		var cnv = this.childPage[id].getCanvas();
		if (cnv != undefined)
			cnv.innerHTML = html;
	},
	setChildCaption: function(id, caption){
		var cnv = $(this.id+"_"+id+"_cap");
		if (cnv != undefined) cnv.innerHTML = caption;
		this.childCaption[this.id+"_"+id+"_cap"] = caption;
		this.rearrangeHeader();
	},
	addChildItems: function(id, item, kode, hint){
		var cnv = this.childPage[id].getCanvas();
		cnv.style.paddingTop = "5px";
		cnv.style.height = document.all ? this.height-20 : this.height - 25;
		if (cnv != undefined){			
			var items = this.childPageItems[id];
			var div = document.createElement("div");
			div.id = this.id+"_"+id+"_"+items.length;
			if (items.length % 2 == 1)
				var bgclr="#ecf3f7";
			else
				var bgclr="#e1ebf2";
			div.style.cssText= "position:relative;border-bottom:1px dotted #000000;width:"+ (this.width - 20)+";left:10;cursor:pointer;background:"+bgclr;
			div.innerHTML = item;
			div.onclick = new Function("event","system.getResource("+this.resourceId+").doChildItemsClick(event,\""+kode+"\",\""+item+"\")");
			if (hint != ""){
				if (document.all){
					div.onmousemove = new Function("system.getResource("+this.resourceId+").doChildItemsOver(event,\""+kode+"\",\""+hint+"\")");
					div.onmouseout = new Function("system.getResource("+this.resourceId+").doChildItemsOut(event,\""+kode+"\",\""+hint+"\")");
				}else{
					div.onmousemove = new Function("event","system.getResource("+this.resourceId+").doChildItemsOver(event,\""+kode+"\",\""+hint+"\")");
					div.onmouseout = new Function("event","system.getResource("+this.resourceId+").doChildItemsOut(event,\""+kode+"\",\""+hint+"\")");
				}
			}
			cnv.appendChild(div);
			items[item.length] = item;
			this.childPageItems[id] = items;
		}
	},
	doChildItemsClick: function(event,kode, caption){			
		this.onChildItemsClick.call(this, kode, caption);
	},
	doChildItemsOver: function(event, kode, hint){					
		system.showToolTip(event.clientX, event.clientY+20, hint);
	},
	doChildItemsOut: function(event, kode, hint){	
		system.hideToolTip();
	},
	clearItemsOfPage: function(page){	
	}
});
