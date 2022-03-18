//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_tabPage = function(owner,options){
	try{
		this.color = "#e8f3f7";
		this.headerHeight = 20;
		window.portalui_tabPage.prototype.parent.constructor.call(this,owner,options);
		this.className = "portalui_tabPage";
		this.childPage = [];
		this.childCaption = [];
		this.activePage = -1;	
		this.shadow = "url(image/themes/dynpro/tabHeader.png)";
		this.hoverClr = "#ff9900";
		this.borderColor = "#88d5f4";
		this.deactClr = "#073c51";
		this.actClr = "#6e2a2a";	
		this.fntDeactColor = "#dddddd";
		this.fntActColor = "#ffffff";
		this.fntHoverColor = "#122c5b";
		this.childPageItems = [];
		this.onTabChange = new portalui_eventHandler();
		this.onChildItemsClick = new portalui_eventHandler();
		this.headerAutoWidth = true;
		uses("portalui_FEtabChild");
		if (options !== undefined) {
			this.updateByOptions(options);
			if (options.pageCaption) this.setPageCaption(options.pageCaption);
			if (options.headerHeight) this.setHeaderHeight(options.headerHeight);
			if (options.color) this.setColor(options.color);
			if (options.borderColor) this.borderColor = options.borderColor;
			if (options.fntActColor) this.fntActColor = options.fntActColor;
			if (options.fntDeactColor) this.fntDeactColor = options.fntDeactColor;
			if (options.fntHoverColor) this.fntHoverColor = options.fntHoverColor;
			if (options.tabChange) this.onTabChange.set(options.tabChange[0],options.tabChange[1]);
			if (options.headerAutoWidth !== undefined) this.headerAutoWidth = options.headerAutoWidth;
		}
	}catch(e){
		systemAPI.alert(this+"$constructor()",e);
	}
};
window.portalui_tabPage.extend(window.portalui_containerControl);
window.tabPage = window.portalui_tabPage;
window.portalui_tabPage.implement({
	doDraw: function(canvas){					
		//canvas.style.background = this.color;		
		this.canvas = canvas;	
		var html = "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}'>"+
							"<div id='" +this.getFullId() + "_header' style='{position: absolute; left: 0; top: 0; width: 100%; height: "+this.headerHeight+"}' "+
							"></div>"+
							"<div id='" +this.getFullId() + "form' style='{background:"+this.color+";position: absolute; left: 0; top: "+this.headerHeight+"; width: 100%; height: 100%}' "+
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
		window.portalui_tabPage.prototype.parent.setHeight.call(this, data);
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
	setHeaderHeight: function(data){
	   try{
    	   this.headerHeight = data;
    	   this.header.style.height = data;
    	   this.form.style.top = data;
    	   this.form.style.height = this.height - data;
    	   for (var i in this.childPage){
    	        this.childPage[i].setTop(this.headerHeight);
                this.childPage[i].setHeight(data - this.headerHeight);
    	   }
	   }catch(e){
	       alert(e);
       }
    },
	setWidth: function(data){
		window.portalui_tabPage.prototype.parent.setWidth.call(this, data);
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
				child.setColor(this.color);
				child.show();			
				if (this.childPage.length > 0){
				    child.hide();					
				}			
				this.childPage[this.childPage.length] = child;												
			}			
			this.childHeader = [];
			for (var i in caption) {		
				var childHead = document.createElement("div");
				childHead.id = this.id+"_"+i+"_cap";			
				childHead.style.cssText = "position:absolute;top:0;left:0;width:auto;height:100%;border-top:1px solid "+this.borderColor+";"+
                    "border-right:1px solid "+this.borderColor+";border-left:1px solid "+this.borderColor+";-webkit-border-top-left-radius: 8px;-webkit-border-top-right-radius: 8px;"+
                    "-moz-border-radius-topleft: 8px;-moz-border-radius-topright: 8px;text-align:center;cursor:pointer;font-weight:bold";
				childHead.style.backgroundImage = this.shadow;
                if (i == 0){					
					childHead.style.backgroundColor = this.actClr;
					childHead.style.color = this.fntActColor;
				}else{	
					childHead.style.backgroundColor = this.deactClr;
                    childHead.style.color = this.fntDeactColor;
				}				
				childHead.style.backgroundPosition = "bottom left";
				childHead.style.backgroundRepeat = "repeat-x";
				childHead.innerHTML = "<span id='"+childHead.id+"_cap' style='position:absolute;top:4;left:0;width:auto;height:auto;white-space: nowrap;'>" + caption[i]+"</span>";						
				this.header.appendChild(childHead);
				this.tabHeaderAttachEvent(childHead,i);
				this.childHeader[this.childHeader.length] = {node:childHead,copy:childHead.cloneNode(true), caption:caption[i]};
				this.childCaption[childHead.id] = caption[i];
				this.childPageItems[this.childPageItems.length] =  [];
			}
			this.rearrangeHeader();
			
		//return divChild;
		}catch(e){
			systemAPI.alert(this+"$addPage()",e);
		}
	},
	tabHeaderAttachEvent: function(childHead,id){
        try{
            eventOn(childHead,"click","$$("+this.resourceId+").doClick(event,"+id+")");        		
            if (!(systemAPI.browser.msie || systemAPI.browser.opera)){                
            	eventOn(childHead,"mouseover","$$("+this.resourceId+").doMouseOver(event,"+id+")");
        		eventOn(childHead,"mouseout","$$("+this.resourceId+").doMouseOut(event,"+id+")");				 
    	    }
        }catch(e){
            systemAPI.alert(this+"$event()",e);
        }
    },
	doClick: function(event, id){			
		try{	
			if (id != this.activePage){				
				var cnv = this.childPage[this.activePage];
				if (cnv != undefined)cnv.hide();                                        
				if (curvyBrowser.isIE || curvyBrowser.isOp){				    
                    var cnv = this.childHeader[this.activePage].node;
                    this.childHeader[this.activePage].copy.style.backgroundColor= this.deactClr;
        		    this.childHeader[this.activePage].copy.style.color = this.fntDeactColor;
                    var newchild = this.childHeader[this.activePage].copy.cloneNode(true);        
                    cnv.id = "";
                    eventOn(newchild,"click","$$("+this.resourceId+").doClick(event,"+this.activePage+")");                    
                    cnv.parentNode.replaceChild(newchild, cnv);                                                        
                    var obj = new curvyObject(this.settings, this.childHeader[this.activePage].node = newchild);
      	            obj.applyCorners();
      	            var cnv = this.childHeader[id].node;
      	            this.childHeader[id].copy.style.backgroundColor= this.actClr;
        		    this.childHeader[id].copy.style.color = this.fntActColor;
                    var newchild = this.childHeader[id].copy.cloneNode(true);        
                    cnv.id = "";
                    eventOn(newchild,"click","$$("+this.resourceId+").doClick(event,"+id+")");
                    cnv.parentNode.replaceChild(newchild, cnv);                                    
                    var obj = new curvyObject(this.settings, this.childHeader[id].node = newchild);
      	            obj.applyCorners();
                }else{
    				var cnv = this.childHeader[this.activePage].node;
    				if (cnv != undefined){		
    					cnv.style.backgroundColor = this.deactClr;		
    					cnv.style.color = this.fntDeactColor;
    				}
    				this.childHeader[id].node.style.backgroundColor = this.actClr;
    				this.childHeader[id].node.style.color  = this.fntActColor;
				}	
				this.activePage = id;			
				var cnv = this.childPage[id];
				if (cnv != undefined) cnv.show();
				this.onTabChange.call(this,id);
			}
		}catch(e){
			systemAPI.alert(this+"$doClick()",e);
		}
	},
	getChild: function(id){		
		return $(id);
	},
	rearrangeHeader: function(){				
		var cnv,left = 0;
		if (this.headerAutoWidth){
			var width = Math.round(this.width / this.childPage.length) - 10;								
			for (var i in this.childHeader)	
			{			
				cnv = this.childHeader[i].node;
				if (cnv != undefined){
					if ( i == this.childHeader.length - 1) width += 10; 
					cnv.style.width = width;
					cnv.style.left = left ;				
				}	
				cnv.firstChild.style.left = width / 2 - parseInt(cnv.firstChild.offsetWidth) / 2;
				this.childHeader[i].copy = cnv.cloneNode(true);
				left += width + 10;
			}
		}else{
			var cap,width = 0;
			for (var i in this.childHeader){			
				cnv = this.childHeader[i].node;
				cap = $(cnv.id+"_cap");
				if(cap) width = cap.offsetWidth;				
				if (width == 0) width = this.childHeader[i].caption.length * 6;				
				width += 20;
				if (cnv != undefined){
					if ( i == this.childHeader.length - 1) width += 10; 
					cnv.style.width = width;
					cnv.style.left = left ;				
				}	
				cnv.firstChild.style.left = width / 2 - parseInt(cnv.firstChild.offsetWidth) / 2;
				this.childHeader[i].copy = cnv.cloneNode(true);
				left += width + 10;
			}
		}
	},
	roundedHeader: function(rad){
	   try{
    	   if (curvyBrowser.isIE || curvyBrowser.isOp){
               if (rad === undefined) rad = 5;
        	   this.settings = {
                  tl: { radius: rad },
                  tr: { radius: rad },          
                  antiAlias: true
               };             
        	   var obj = "";
        	   for (var i in this.childHeader){
        	       obj = new curvyObject(this.settings,this.childHeader[i].node);
        	       obj.applyCorners();
               }             
            }
            this.lastId = 0;
        }catch(e){
            systemAPI.alert(this+"$rounded()",e);
        }
    },
    makeRound: function(rad){
	   try{
    	   if (curvyBrowser.isIE || curvyBrowser.isOp){
               if (rad === undefined) rad = 5;
        	   var settings = {
                  bl: { radius: rad },
                  br: { radius: rad },                            
                  antiAlias: true
               };             
        	   var obj = "";
        	   for (var i in this.childPage){
        	       curvyCorners(settings,this.childPage[i].getCanvas());
               }             
            }else {
        	   for (var i in this.childPage)
        	       this.childPage[i].addStyle("-webkit-border-bottom-left-radius: "+rad+"px;-webkit-border-bottom-right-radius: "+rad+"px;-moz-border-radius-bottomleft: "+rad+"px;-moz-border-radius-bottomright: "+rad+"px;");         	                  
            }
            this.lastId = 0;
        }catch(e){
            systemAPI.alert(this+"$makeRound()",e);
        }
    },
	doMouseOver: function(event, id){		
		try{            
            var cnv = this.childHeader[id].node;//$(this.id+"_"+id+"_cap");		  
            if ((curvyBrowser.isIE || curvyBrowser.isOp)  && id != this.lastId) this.doMouseOut(event, this.lastId);
    		cnv.style.backgroundColor = this.hoverClr;
    		cnv.style.color = (id == this.activePage ? this.fntActColor: this.fntHoverColor);
    		if (curvyBrowser.isIE || curvyBrowser.isOp){    		        		    
    		    this.childHeader[id].copy.style.backgroundColor= this.hoverClr;
    		    this.childHeader[id].copy.style.color = (id == this.activePage ? this.fntActColor:this.fntHoverColor);
                var newchild = this.childHeader[id].copy.cloneNode(true);        
                cnv.id = "";
                cnv.parentNode.replaceChild(newchild, cnv);                
                eventOn(newchild,"click","$$("+this.resourceId+").doClick(event,"+id+")");
                this.tabHeaderAttachEvent(newchild,id);                
                var obj = new curvyObject(this.settings, this.childHeader[id].node = newchild);
  	            obj.applyCorners();
            }
            this.lastId = id;
      }catch(e){
        systemAPI.alert(this+"$over("+id+")",e);
      }
		  
	},
	doMouseOut: function(event, id){		
	   try{    
            var cnv = this.childHeader[id].node;//$(this.id+"_"+id+"_cap");		
    		if (id == this.activePage){	    			
    			var bg = this.actClr;
    		}else{    			
    			var bg = this.deactClr;
    		}		
		    cnv.style.backgroundColor = bg;
		    cnv.style.color = (id == this.activePage ? this.fntActColor: this.fntDeactColor);
    		if (curvyBrowser.isIE || curvyBrowser.isOp){
    		    this.childHeader[id].copy.style.backgroundColor = bg;
    		    this.childHeader[id].copy.style.color = (id == this.activePage ? this.fntActColor:this.fntDeactColor);
    		    var newchild = this.childHeader[id].copy.cloneNode(true);                
    		    cnv.id = "";
                cnv.parentNode.replaceChild(newchild, cnv);
                eventOn(newchild,"click","$$("+this.resourceId+").doClick(event,"+id+")");
    		    this.tabHeaderAttachEvent(newchild,id);
                var obj = new curvyObject(this.settings, this.childHeader[id].node = newchild);
  	            obj.applyCorners();
            }            
      }catch(e){
        alert("out "+e+" "+id);
      }
	},
	setBackground: function(data){	
		var cnv = this.canvas;
		if (cnv != undefined)
			cnv.style.background = data;
	},
	setBgColor: function(data){
		var cnv = this.getClientCanvas();
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
			var bgclr= (items.length % 2 == 1) ? "#ecf3f7" : "#e1ebf2";
			div.style.cssText= "position:relative;border-bottom:1px dotted #000000;width:"+ (this.width - 20)+";left:10;cursor:pointer;background:"+bgclr;
			div.innerHTML = item;
			eventOn(div,"click","$$("+this.resourceId+").doChildItemsClick(event,\""+kode+"\",\""+item+"\")");
			if (hint != ""){
			     eventOn(div,"mousemove","$$("+this.resourceId+").doChildItemsOver(event,\""+kode+"\",\""+hint+"\")");
			     eventOn(div,"mouseout","$$("+this.resourceId+").doChildItemsOut(event,\""+kode+"\",\""+hint+"\")");				
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
	},
	getClientHeight: function(){
	   return this.height - this.headerHeight;
    },
    getClientWidth: function(){
	   return this.width;
    },
    setColor : function(){
        this.getClientCanvas().style.background = color;
    }
});
