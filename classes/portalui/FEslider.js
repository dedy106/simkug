//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_FEslider = function(owner,options){	
	window.portalui_FEslider.prototype.parent.constructor.call(this,owner,options);	
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
	this.viewType = 0;
	if (options !== undefined){
	   this.updateByOptions(options);
       if (options.color !== undefined )this.setColor(options.color);
       if (options.background !== undefined) this.setBackground(options.background);
       if (options.viewType !== undefined) this.setViewType(options.viewType);
    }
};
window.portalui_FEslider.extend(window.portalui_control);
window.FEslider = window.portalui_FEslider;
window.portalui_FEslider.implement({
	doDraw: function(canvas){		
		canvas.style.cssText = "position:absolute;border:1px solid #cccccc;background:#ffffff;overflow:hidden";
		var ie = document.all ? true:false;
		this.id =this.getFullId();
		var html = "<div id='"+this.id+"_btn' style='{position:absolute;background:#ff0000;top:10;left:20;width:auto;height:26}'>"+
				"<div id='"+this.id+"_btnL' style='{display:none;position:absolute;background:url(image/toolbarL.png)0 0 no-repeat;top:0;left:0;width:14;height:26}'></div>"+
				"<div id='"+this.id+"_btnR' style='{display:none;position:absolute;background:url(image/toolbarR.png)0 0 no-repeat;top:0;left:0;width:14;height:26}'></div>"+
				"</div>"+
	            "<div id='"+this.id+"_image' style='{border:1px solid #cccccc;position:absolute;background:#f5f5f5;top:40;left:"+ (ie ? -1:-1)+";width:100%;height:100%;overflow:hidden}'></div>"+
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
		window.portalui_FEslider.prototype.parent.setWidth.call(this, data);
		this.image.style.width = document.all ? this.width + 2 : this.width;
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
	addItems: function(img, header, shortDesc, id){
        this.imgCount = 0;
	    for (var i in img)
           this.addItem(img[i], header[i], shortDesc[i], id[i]);        
        this.imgList = img;
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
	    div.style.cssText = "position:absolute;width:100%;height:100%;cursor:pointer;filter:alpha(opacity=0);moz-opacity:0;opacity:0;";		
	    div.innerHTML ="<img src='"+img+"' id='"+div.id+"_img' onload='window.system.getResource("+this.resourceId+").imageload(event,\""+div.id+"_img\");'/>";
	    div.onclick = new Function("event","window.system.getResource("+this.resourceId+").doItemsClick(event,'"+id+"');");
		divImg = $(this.id+"_image");
	    divImg.appendChild(div);  
	    var imageElm = div.firstChild;
	    div = document.createElement("div");
	    div.id = this.id+"_desc"+this.items.length;
	    div.style.position = "absolute";	    
	    div.style.display = "none";
		div.onclick = new Function("event","window.system.getResource("+this.resourceId+").doItemsClick(event,'"+id+"');");		
	    div.innerHTML ="<"+(document.all ? "h4" : "h2")+" style='{color:#0000ff}'>"+header+"</"+(document.all ? "h4" : "h2")+">"+shortDesc;
	    divDesc = $(this.id+"_desc");	
	    divDesc.appendChild(div);  
	   
		this.btnR.style.left =  (this.items.length) * 30 + 14; 	    		
	  }catch(e){
	    systemAPI.alert(this+"$addItem("+this.name+")",e)
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
			systemAPI.alert(this+"$slide("+this.name+")",e)
		}		
	},
	fadeImg : function(){		
		var cnv = $(this.id +"_image"+this.selId+"_img");
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
		this.tim.setEnabled(data);
		if (this.enabled){	  
			this.opacity = 0;
			this.slide();					
		}else {			
			clearTimeOut(this.intervalId2);
		}				
	},
	doClick: function(event,data){	
		var cnv = $(this.id +"_image"+this.selId);
		cnv.style.display = "none";		
		cnv = $(this.id +"_desc"+this.selId);
		cnv.style.display = "none";
		cnv = $(this.id +"_btn"+this.selId);
		cnv.style.background = this.deactClr;
		this.selId = data;
		cnv = $(this.id +"_image"+this.selId);
		cnv.style.display = "";
		cnv = $(this.id +"_desc"+this.selId);
		cnv.style.display = "";
		cnv = $(this.id +"_btn"+this.selId);
		cnv.style.background = this.actClr;
		this.opacity = 0;
		this.fadeImg();    
	},
	doItemsClick: function(event,data){
		this.onItemsClick.call(this, data, event);
	},
	setColor: function(clr){	   
	   this.color = clr;
       this.canvas.style.backgroundColor = this.bgColor;		 
    },
    setBackground: function(clr){
        this.background = clr;
        this.canvas.style.backgroundImage = "url("+this.background+")";			
		this.canvas.style.backgroundPosition = "bottom left";	
		this.canvas.style.backgroundRepeat = "repeat-x";
    },
    setViewType: function(data){
        this.viewType = data;
        if (data == 0){
            this.image.style.top = 40;
            this.image.style.height = 225;
            this.btn.style.display = "";
            this.desc.style.display = "";
        }else{
            this.image.style.top = 10;
            this.image.style.height = this.height - 20;
            this.btn.style.display = "none";
            this.desc.style.display = "none";
        }
    },
    imageload: function(event, id){
        try{	       
           if (this.viewType == 1){           
                var target = document.all ? event.srcElement : event.target;
                var img, w = this.width, h = this.height, nh, nw;
                if (w > h) w = h; else h = w;
                img = target;//$(id);                            
                if (img.getAttribute("loaded")) return;                
                if (curvyBrowser.isWebKit || curvyBrowser.isIE || curvyBrowser.isOp){                    
                    nh = parseInt(img.height);
                    nw = parseInt(img.width);           
                }else{
                    nh = img.naturalHeight;
        			nw = img.naturalWidth;		        			
                }                
                var sH = w / nh;
    			var sW = h / nw;		
    			if (sH < sW) {
    				img.height = h;
    				img.width = Math.round(nw * sH);
    				img.style.height = h;
    				img.style.width = Math.round(nw * sH);    				
    			} else {
    				img.width = w;
    				img.height = Math.round(nh * sW);
    				img.style.width = w;
    				img.style.height = Math.round(nh * sW);
    			}	
    			img.parentNode.style.top = this.height / 2 - parseInt(img.height) / 2;
    			img.parentNode.style.left = this.width / 2 - parseInt(img.width) / 2;
    			img.parentNode.style.height = img.height;
    			img.parentNode.style.width = img.width;
    			img.parentNode.style.display = "none";
    			if (document.all)
    			     img.parentNode.style.filter = "alpha(opacity=100)";
    			else{
        			img.parentNode.style.mozOpacity = 1;
        			img.parentNode.style.opacity = 1;
    			}
    			img.setAttribute("loaded",true);
    			this.imgCount++;
    			if (this.imgCount == this.imgList.length){
            	      this.selId = 1;    
            	      this.setEnabled(true);       		  
    			}    			
            }    
       }catch(e){
            alert("image Load"+e);
       }
    }
});
