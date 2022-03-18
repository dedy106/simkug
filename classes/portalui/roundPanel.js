//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_roundPanel = function(owner, options){
    if (owner){
		this.caption = "";
		this.bgColor = system.getConfig("form.panel.color");
		window.portalui_roundPanel.prototype.parent.constructor.call(this, owner, options);		
		this.className = "portalui_roundPanel";
		this.owner = owner;
		this.scrolling = false;		
		this.fontColor = "#333333";
		this.onMouseDown = new portalui_eventHandler();
		this.onMouseMove = new portalui_eventHandler();
		this.onMouseUp = new portalui_eventHandler();
		this.onItemClick = new portalui_eventHandler();
		this.onClose = new portalui_eventHandler();
		this.btnCloseVisible = false;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.color) this.setColor(options.color);						
			if (options.background) this.setBackground(options.background);
			if (options.border) this.setBorderColor(options.border);
			if (options.shadow) this.setShadow(options.shadow);
			if (options.icon) this.setIcon(options.icon);			
			if (options.titleBg) this.setTitleBg(options.titleBg);
			if (options.caption) this.setCaption(options.caption);						
			if (options.view || options.view == 0) this.setView(options.view);
			if (options.fontColor) this.fontColor = options.fontColor;			
			if (options.btnCloseVisible) this.setBtnCloseVisible(options.btnCloseVisible);
			if (options.toolbarVisible) this.setToolbarVisible(options.toolbarVisible);
			if (options.itemClick) {
                if (typeof options.itemClick == "string")
                    this.onItemClick.set(this.getTargetClass(),options.itemClick);
                else this.onItemClick.set(options.itemClick[0],options.itemClick[1]);
            }
			if (options.close){
			     if (typeof options.close == "string")
			         this.onClose.set(this.getTargetClass(),options.close);
			     else this.onClose.set(options.close[0],options.close[1]);
            }
		}
		this.makeRound(10);
    }
};
window.portalui_roundPanel.extend(window.portalui_containerControl);
window.roundPanel = window.portalui_roundPanel;
//---------------------------- Function ----------------------------------------
window.portalui_roundPanel.implement({
	draw: function(canvas){
		window.portalui_roundPanel.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
	    var html = "";    
		var nd = this.getCanvas();
		nd.style.border = "1px solid #999999";
		nd.style.overflow = "hidden";		
		
	    if (document.all)
	        html = 	"<div id= '"+n+"_bottom' style='{background-image: url(icon/"+system.getThemes()+"/panelShadow.png);background-position: bottom left;background-repeat: repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}'' ></div>"+					
					"<div id='" + n + "_capbg' style='{display:none;position: absolute;left: 10;top: 5; width:90%; height: 30;background-image:url(image/themes/dynpro/tabHeader.png);background-position:bottom left;background-repeat:repeat-x;}'></div>"+	             
                    "<div id='" + n + "_cap' style='{display:none;position: absolute;left: 10;top: 5; width:90%; height: 30;color:#ffffff;padding-left:10px}'></div>"+	             
					"<div id='" + n + "_close' "+
					    "onMouseOver='$$("+this.resourceId+").doMouseCloseOver(event);' "+
                        "onMouseOut='$$("+this.resourceId+").doMouseCloseOut(event);' "+
                        "onClick='$$("+this.resourceId+").doMouseCloseClick(event);' "+
                    " style='cursor:pointer;display:none;position:absolute;left:10;top: 5;width:50;height:15;background-image:url(icon/dynpro/pnlclose.png);background-position:top left;background-repeat: no-repeat;'></div>"+	                
                    "<iframe id='"+ n +"_frame' style='display:none'></iframe>"+
                    "<div id='" + n + "form' style='{position: absolute; left: 2; top: 40; width: 100%; height: 100%;overflow:auto}' ></div>"+
                    "<div id='" + n + "_toolbar' style='display:none;position:absolute;left:2;top:5;width:50;height:25;'>"+
                        "<div id='"+ n +"_pdf' onClick='$$("+this.resourceId+").doMouseToolClick(event,\"pdf\")' onMouseOver='$$("+this.resourceId+").doMouseToolOver(event,\"pdf\");' onMouseOut='$$("+this.resourceId+").doMouseToolOut(event,\"pdf\");' style='cursor:pointer;position:absolute;left:2;top:4;width:21;height:20;background-image:url(icon/dynpro/pdfsingle.png)'></div>"+
                        "<div id='"+ n +"_print' onClick='$$("+this.resourceId+").doMouseToolClick(event,\"print\")' onMouseOver='$$("+this.resourceId+").doMouseToolOver(event,\"print\");' onMouseOut='$$("+this.resourceId+").doMouseToolOut(event,\"print\");' style='cursor:pointer;position:absolute;left:28;top:4;width:21;height:20;background-image:url(icon/dynpro/print2.png)'></div>"+
                    "</div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    else
	        html =  "<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +						
	                "<div id='" + n + "_capbg' style='{display:none;position: absolute;left: 10;top: 5; width:90%; height: 30;background:url(image/themes/dynpro/tabHeader.png)bottom left repeat-x;padding-left:10px;-webkit-border-radius: 8px;-moz-border-radius: 8px;}'></div>"+	                
                    "<div id='" + n + "_cap' style='{display:none;position: absolute;left: 10;top: 5; width:90%; height: 30;color:#ffffff;padding-left:10px}'></div>"+	                
                    "<div id='" + n + "_close' "+
                        "onMouseOver='$$("+this.resourceId+").doMouseCloseOver(event);'"+
                        "onMouseOut='$$("+this.ressyourceId+").doMouseCloseOut(event);'"+
                        "onClick='$$("+this.resourceId+").doMouseCloseClick(event);'"+
                    "   style='{cursor:pointer;display:none;position: absolute;left: 10;top: 5; width:50; height: 15;background:url(icon/dynpro/pnlclose.png)top left no-repeat;}'></div>"+                                        
                    "<div id='" + n + "form' style='{position: absolute; left: 2; top: 40; width: 100%; height: 100%;overflow:auto}' ></div>"+
                    "<div id='" + n + "_toolbar' style='display:none;position:absolute;left:2;top:5;width:50;height:25;'>"+
                        "<div id='"+ n +"_pdf' onClick='$$("+this.resourceId+").doMouseToolClick(event,\"pdf\")' onMouseOver='$$("+this.resourceId+").doMouseToolOver(event,\"pdf\");' onMouseOut='$$("+this.resourceId+").doMouseToolOut(event,\"pdf\");' style='cursor:pointer;position:absolute;left:2;top:4;width:21;height:20;background:url(icon/dynpro/pdfsingle.png)top left no-repeat;'></div>"+
                        "<div id='"+ n +"_print' onClick='$$("+this.resourceId+").doMouseToolClick(event,\"print\")' onMouseOver='$$("+this.resourceId+").doMouseToolOver(event,\"print\");' onMouseOut='$$("+this.resourceId+").doMouseToolOut(event,\"print\");' style='cursor:pointer;position:absolute;left:28;top:4;width:21;height:20;background:url(icon/dynpro/print2.png)top left no-repeat;'></div>"+
                    "</div>"+
                    "<iframe id='"+ n +"_frame' style='display:none;width:100%;height:100%' frameborder=0></iframe>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
		this.setInnerHTML(html, nd);		
		eventOn(nd,"mousedown","$$("+this.resourceId+").doMouseDown(event);");
		eventOn(nd,"mouseup","$$("+this.resourceId+").doMouseUp(event);");		
	},
	doMouseDown: function(event){
		this.onMouseDown.call(this,event);		
		system.addMouseListener(this);
		this.isClick = true;
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;
	},
	doMouseUp: function(event){
		system.delMouseListener(this);
		this.isClick = false;
	},
	doSysMouseUp: function(x, y, button, buttonState){		
		this.isClick = false;
		system.delMouseListener(this);
		this.onMouseUp.call(this,x,y,button, buttonState);		
	},
	doSysMouseMove: function(x, y, button, buttonState){		
		this.onMouseMove.call(this,x,y,button, buttonState);		
		this.mouseX = x;
		this.mouseY = y;		
	},
	setScroll: function(data){
		this.scrolling=data;
		var cnv = this.getClientCanvas();
		if (data)
			cnv.style.overflow="auto";
		else cnv.style.overflow="hidden";
	},
	setColor: function(data){
		this.bgColor = data;
		var nd = this.getCanvas();
		nd.style.background = this.bgColor;
	},
	setBackground: function(data){
		this.bg = data;
		var nd = this.getCanvas();
		nd.style.backgroundImage = "url("+this.bg+")";
		nd.style.backgroundPosition = "bottom left";
		nd.style.backgroundRepeat = "repeat-x";	
	},
	getColor: function(){
		return this.bgColor;
	},
	setIcon: function(data){
	   this.icon = data;
    },
	setTitleBg: function(data){
        var cnv = $(this.getFullId()+"_capbg");
        cnv.style.backgroundColor = data;
        
    },
	setBorderColor: function(data, options){		
		node = this.getCanvas();
		if (options == undefined){		
			if (node != undefined)
				node.style.border = data;	                        					
		}else{
			if (options.top) node.style.borderTop = data;
			if (options.left) node.style.borderLeft = data;
			if (options.right) node.style.borderRight = data;
			if (options.bottom) node.style.borderBottom = data;
		}
	},
	setCaption: function(data){
	   try{
    		this.caption = data;	
    		if (this.caption != ""){
    			var wdth = this.width - 20;
    			var n = $(this.getFullId() + "_cap");                			
    			if (n !== undefined && n !== null){
    			    n.style.display = ""; 
    			    n.innerHTML = "<div style='position:absolute;left:30;top:5;width:"+wdth+"; height:100%;font-size:13;font-family:arial;font-weight:bold;color:#126a8c'>"+data+"</div>"+
                            "<div style='position:absolute;left:10;top:5;width:16;height:16;background-image:url("+this.icon+");'></div>";                    
                    var n = $(this.getFullId() + "_capbg");			   
		              n.style.display = ""; 
    				if (curvyBrowser.isIE || curvyBrowser.isOp){                                                                        				     
    				     if (!("IEborderRadius" in n.style)) {
                             var settings = {antiAlias : true};
                             if (this.radius === undefined) this.radius = 10; 
                              settings.tl = {radius : this.radius - 2};
                              settings.tr = {radius : this.radius - 2};
                              settings.bl = {radius : this.radius - 2};
                              settings.br = {radius : this.radius - 2};
                              curvyCorners(settings, n);
                          }
                    }
    			}			    			
    		}
  		}catch(e){
  		    systemAPI.alert(this+"$setCaption("+this.name+")",e);
        }
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},
	setHeight: function(data){		
        try{
            window.portalui_roundPanel.prototype.parent.setHeight.call(this, data);		    		
            var node = $(this.getFullId() +"form");		
    		if (node !== undefined) node.style.height = data - 45;		
	   }catch(e){
	       systemAPI.alert(this+"$setHeight("+this.name+")",e);
       }
	},
	setWidth: function(data){	    
	   try{
    		window.portalui_roundPanel.prototype.parent.setWidth.call(this, data);		
    		var node = $(this.getFullId() +"_cap");
    		if (node !== undefined) node.style.width = data - 30;	
            var node = $(this.getFullId() +"_capbg");
    		if (node !== undefined) {            
                if (curvyBrowser.isIE || curvyBrowser.isOp){
                    if (("IEborderRadius" in node.style)) {
                        curvyCorners.adjust(node,"style.width",data - 30);
                        this.redrawElm(node);
                    }else node.style.width = data - 30;
                }else node.style.width = data - 30;							            
            }
    		node = $(this.getFullId() +"form");
    		if (node !== undefined) node.style.width = data - 5;		
    		node = $(this.getFullId() +"_toolbar");
    		if (node !== undefined) node.style.left = this.width - 80;
  		}catch(e){
  		    systemAPI.alert(this+"$setWidth("+this.name+")",e);
        }
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	},
	setShadow: function(data){
		var cnv = $(this.getFullId() + "_bottom");
		if (cnv != undefined){
			if (data) cnv.style.display = "";
			else cnv.style.display = "none";
			if (document.all) cnv.style.height =  (this.height) +"px";
		}
	},
	makeRound: function(rad){
	   try{    	
	      if (rad === undefined) rad = 10; 
	      this.radius = rad;	      
          if (systemAPI.browser.msie || systemAPI.browser.opera){          
              var node = $(this.getFullId() +"_capbg");
              if (node !== undefined && node !== null && node.style.display == ""){
                  var settings = {
                      tl: { radius: rad- 2 },
                      tr: { radius: rad- 2 },
                      bl: { radius: rad- 2 },
                      br: { radius: rad- 2 },
                      antiAlias: true
                    }; 
                  if (curvyCorners) curvyCorners(settings, node);                           
              }  
              var settings = {
                  tl: { radius: rad },
                  tr: { radius: rad },
                  bl: { radius: rad },
                  br: { radius: rad },
                  antiAlias: true
              };           
              if (curvyCorners) curvyCorners(settings, this.getCanvas());                            
          }else {
            this.addStyle("-webkit-border-radius: "+rad+"px;-moz-border-radius: "+rad+"px;"); 
          }
          this.isRounded = true;
        }catch(e){
            systemAPI.alert(this+"$makeRound("+this.name+")",e);
        }
    },
    addItems: function(item, title, shortDesc, containtKode, more){		
		this.items = {items:item,title:title, shortDesc:shortDesc,containtsid:containtKode,more:more};
		this.rearrangeItems();
	},
	setView: function(data){
	   this.view = data;
    },
    setHTML: function(html){
        var form = $(this.getFullId()+"form");        
        form.innerHTML = html;  
    },
    imageload: function(event, id, imgWidth){
        try{	       
            var target = curvyBrowser.isIE ? event.srcElement:event.target;
            var w = imgWidth, h = imgWidth, nw, nh;
            var img = target;//$(id);                 
            if (img.getAttribute("loaded")) return;
            if (curvyBrowser.isWebKit || curvyBrowser.isIE || curvyBrowser.isOp){                    
                nh = parseInt(img.height);
                nw = parseInt(img.width);
                img.setAttribute("loaded",true);                  
            }else{
                nh = img.naturalHeight;
    			nw = img.naturalWidth;		
    			img.setAttribute("loaded",true);
            }                
            var sH = w / nh;
			var sW = h / nw;		
			if (sH < sW) {
				img.height = h;
				img.width = Math.round(nw * sH);
				img.style.height = h;
				img.style.width = Math.round(nw* sH);
			} else {
				img.width = w;
				img.height = Math.round(nh * sW);
				img.style.width = w;
				img.style.height = Math.round(nh * sW);
			}    			
			img.style.top =  h / 2 - parseInt(img.height) / 2 + 10;
			img.style.opacity = 1;
			img.style.mozOpacity = 1;			
			
       }catch(e){
            systemAPI.alert(this+"#LoadImg",e);
       }
    },
    rearrangeItems: function(){
        try{
            var form = $(this.getFullId()+"form");        
            var html = "";
            switch(this.view){
                case 0 :                    
                    for (var i in this.items.items){
                        if ( i % 2 == 0) var bg = "#83bdcb";else var bg = "#c0a776";
                        html += "<div id='"+this.getFullId()+"_"+i+"' style='position:relative;width:"+((this.width - 35).toString())+";color:"+this.fontColor+";height:auto;padding-top:5px;padding-bottom:8px;cursor:pointer;left:10;background-image:url(image/themes/dynpro/dotted.png);background-position:bottom left;background-repeat:repeat-x'"+
                            "   onClick='$$("+this.resourceId+").itemsMouseClick(event,"+i+")' "+
                            "   onMouseOver='$$("+this.resourceId+").itemsMouseOver(event,\""+this.items.containtsid[i]+"\")' "+
                            "   onMouseOut='$$("+this.resourceId+").itemsMouseOut(event,\""+this.items.containtsid[i]+"\")' >"+
                            "   <div style='position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.1;moz-opacity:0.1;filter:alpha(opacity=10);background:"+bg+"'></div>"+
                            this.items.title[i]+"</div>"; 
                        if (this.items.more === undefined) this.items.more = [];
                        this.items.more[this.items.more.length] = {};
                        this.items.more[i].item = {img:this.items.items[i],title:this.items.title[i],shortDesc:this.items.shortDesc[i],id:this.items.containtsid[i],more:this.items.more[i]};
                   }
                break;
                case 1 :
                    var left = 10, w = 10, t = 0, r = 0;
                    for (var i in this.items.items){                    
                        if (w + 130> this.width) {
                            r++,t = (r * 160),w = 10,left = 10;
                        }
                        html += "<div style='position:absolute;width:120;height:150;left:"+(left)+";top:"+t+";cursor:pointer' align='center'>"+
							"<div style='position:absolute;width:120;height:150;left:0;top:0;cursor:pointer' align='center' "+
                            "   onClick='$$("+this.resourceId+").itemsMouseClick(event,"+i+")' "+
                            "   onMouseOver='$$("+this.resourceId+").itemsMouseOver(event,\""+this.items.containtsid[i]+"\")' "+
                            "   onMouseOut='$$("+this.resourceId+").itemsMouseOut(event,\""+this.items.containtsid[i]+"\")' >"+
                            "   <img id='"+ this.getFullId()+"_img"+ i +"' onload='$$("+this.resourceId+").imageload(event,\""+ this.getFullId()+"_img"+ i +"\",120);' style='position:absolute;left:0;top:5;opacity:0;moz-opacity:0;' src='"+this.items.items[i]+"'></img>"+
                            "   <div id='"+ this.getFullId()+"_cap"+ i +"' style='position:absolute;left:0;top:130;height:20;width:120'>"+this.items.title[i]+"</div>"+
                            "</div></div>";
                        left += 130;
                        w += 130;
                        if (this.items.more === undefined) this.items.more = [];
                        this.items.more[this.items.more.length] = {};
                        this.items.more[i].item = {img:this.items.items[i],title:this.items.title[i],shortDesc:this.items.shortDesc[i],id:this.items.containtsid[i],more:this.items.more[i]};
                    }                
                break;
                case 2 :
                    var r = 0, t = 0;
                    for (var i in this.items.items){                    
                        t = (r * 160),r++;
                        if ( i % 2 == 0) var bg = "#83bdcb";else var bg = "#c0a776";
                        html += "<div style='position:absolute;width:"+((this.width - 40).toString())+";height:120;left:10;top:"+t+";padding-top:5px;padding-bottom:8px;background-image:url(image/themes/dynpro/dotted.png);background-position:bottom left;background-repeat:repeat-x' >"+                        
                            "   <div style='position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.1;moz-opacity:0.1;filter:alpha(opacity=10);background:"+bg+"'></div>"+
                            "   <img id='"+ this.getFullId()+"_img"+ i +"' onload='$$("+this.resourceId+").imageload(event,\""+ this.getFullId()+"_img"+ i +"\",120);' style='position:absolute;left:"+(this.width - 170).toString()+";top:0;' src='"+this.items.items[i]+"' />"+
                            "   <div id='"+ this.getFullId()+"_title"+ i +"' style='position:absolute;left:30;top:0;height:25;width:"+(this.width - 175).toString()+";color:#af1d35;font-size:14;'>("+this.items.containtsid[i]+")"+this.items.title[i]+"</div>"+
                            "   <div id='"+ this.getFullId()+"_desc"+ i +"' style='color:#000000;position:absolute;left:30;top:30;height:60;width:"+(this.width - 175).toString()+";'>"+this.items.shortDesc[i]+"</div>"+
                            "   <div id='"+ this.getFullId()+"_btn"+ i +"' style='display:none;cursor:pointer;-webkit-border-radius:4px;-moz-border-radius:4px;background-color:#ff9900;border:1px solid #ff9900;position:absolute;left:35;top:100;height:18;width:80;background-image:url(image/themes/dynpro/tabHeader.png);background-position:bottom left;background-repeat:repeat-x' "+
                            "   onClick='$$("+this.resourceId+").itemsMouseClick(event,"+i+");' "+    
                            "   onMouseOver='$$("+this.resourceId+").btnMouseOver(event,"+i+");'"+
                            "   onMouseOut='$$("+this.resourceId+").btnMouseOut(event,"+i+");'>"+
                            "  <img src='"+this.items.more[i].icon+"' style='position:absolute;left:5;height:18;width:18;top:0'></img><span id='"+this.getFullId()+"_btnCapt"+i+"' style='position:absolute;left:30;top:2;width:auto;height:auto'>"+this.items.more[i].btnCaption+"</span></div>"+
                            "   <div id='"+ this.getFullId()+"_price"+ i +"' style='text-align:center;display:none;-webkit-border-top-left-radius:4px;-webkit-border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px;-moz-border-radius-topleft:4px;background-color:#a1c8ce;border:1px solid #cccccc;position:absolute;left:125;top:100;height:18;width:120;background-image:url(image/themes/dynpro/tabHeader.png);background-position:bottom left;background-repeat:repeat-x'>&nbsp;"+
                                "Rp."+floatToNilai(this.items.more[i].price)+"</div>"+
                            "</div>";                            
                        left += 130;
                        w += 130;
                        if (this.items.more === undefined) this.items.more = [];
                        this.items.more[this.items.more.length] = {};
                        this.items.more[i].item = {img:this.items.items[i],title:this.items.title[i],shortDesc:this.items.shortDesc[i],id:this.items.containtsid[i],more:this.items.more[i]};
                    }                
                break;
                case 3 :
                    var r = 0, t = 0;
                    for (var i in this.items.items){                    
                        t = (r * 100),r++;
                        if ( i % 2 == 0) var bg = "#83bdcb";else var bg = "#c0a776";
                        html += "<div style='position:absolute;width:"+(this.width - 40).toString()+";height:80;left:10;top:"+t+";padding-top:5px;padding-bottom:8px;background-image:url(image/themes/dynpro/dotted.png);background-position:bottom left;background-repeat:repeat-x' >"+                        
                            "   <div style='position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.1;moz-opacity:0.1;filter:alpha(opacity=10);background:"+bg+"'></div>"+
                            "   <img id='"+ this.getFullId()+"_img"+ i +"' onload='$$("+this.resourceId+").imageload(event,\""+ this.getFullId()+"_img"+ i +"\",80);' style='position:absolute;left:"+(this.width - 170).toString()+";top:10;' src='"+this.items.items[i]+"' />"+
                            "   <div id='"+ this.getFullId()+"_title"+ i +"' style='position:absolute;left:30;top:0;height:25;width:"+(this.width - 175).toString()+";color:#af1d35;font-size:14;'>("+this.items.containtsid[i]+")"+this.items.title[i]+"</div>"+
                            "   <div id='"+ this.getFullId()+"_desc"+ i +"' style='color:#000000;position:absolute;left:30;top:30;height:auto;width:"+(this.width - 175).toString()+";'>"+this.items.shortDesc[i]+"</div>"+
                            "   <div id='"+ this.getFullId()+"_btn"+ i +"' style='cursor:pointer;-webkit-border-radius:4px;-moz-border-radius:4px;background-color:#ff9900;border:1px solid #ff9900;position:absolute;left:35;top:60;height:18;width:80;background-image:url(image/themes/dynpro/tabHeader.png);background-position:bottom left;background-repeat:repeat-x' "+
                            "   onClick='$$("+this.resourceId+").itemsMouseClick(event,"+i+");' "+    
                            "   onMouseOver='$$("+this.resourceId+").btnMouseOver(event,"+i+");'"+
                            "   onMouseOut='$$("+this.resourceId+").btnMouseOut(event,"+i+");'><span id='"+this.getFullId()+"_btnCapt"+i+"' style='position:absolute;left:15;top:2;width:auto;height:auto'>Download</span></div></div>"+
                            "</div>";                            
                        left += 130;
                        w += 130;
                        if (this.items.more === undefined) this.items.more = [];
                        this.items.more[this.items.more.length] = {};
                        this.items.more[i].item = {img:this.items.items[i],title:this.items.title[i],shortDesc:this.items.shortDesc[i],id:this.items.containtsid[i],more:this.items.more[i]};
                    }
                break;
                case 4 :                    
                   for (var i in this.items.items){
                        if ( i % 2 == 0) var bg = "#83bdcb";else var bg = "#c0a776";
                        html += "<div id='"+this.getFullId()+"_"+i+"' style='position:absolute;height:auto;width:"+(this.width - 35).toString()+";color:"+this.fontColor+";height:auto;padding-top:5px;padding-bottom:8px;cursor:pointer;left:10;background-image:url(image/themes/dynpro/dotted.png);background-position:bottom left;background-repeat:repeat-x'"+
                            "   onClick='$$("+this.resourceId+").itemsMouseClick(event,"+i+")' "+
                            "   onMouseOver='$$("+this.resourceId+").itemsMouseOver(event,\""+this.items.containtsid[i]+"\")' "+
                            "   onMouseOut='$$("+this.resourceId+").itemsMouseOut(event,\""+this.items.containtsid[i]+"\")' >"+                           
							"   <div style='position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.1;moz-opacity:0.1;filter:alpha(opacity=10);background:"+bg+"'></div>"+
                            this.items.title[i]+"</div>"; 
                        if (this.items.more === undefined) this.items.more = [];
                        this.items.more[this.items.more.length] = {};
                        this.items.more[i].item = {img:this.items.items[i],title:this.items.title[i],shortDesc:this.items.shortDesc[i],id:this.items.containtsid[i],more:this.items.more[i]};
                   }
                break;   
                
            }
            if (form !== undefined && form !== null) form.innerHTML = html;                   
            if (this.view == 4){
                this.timer1 = new portalui_timer(this);
                this.timer1.onTimer.set(this,"doTimer");                
                this.timer1.setInterval(70);
                this.topNode = 0;
                var top = 0,node;                
                this.maxHeight = 0;
                form.style.overflow = "hidden";
                this.nodes = [];
                for (var i in this.items.items){
                    node = $(this.getFullId()+"_"+i);
                    if (node){
                        node.style.top = top;
                        top += parseInt(node.offsetHeight);
                        this.maxHeight += parseInt(node.offsetHeight);
                        this.nodes[this.nodes.length] = node;
                    }
                }
                this.timer1.setEnabled(true);
            }
          }catch(e){
             systemAPI.alert(this+"$rearrangeItems("+this.name+")",e);
          }
    },
    doTimer: function(sender){
        var top = this.topNode,node, lastNode, geser = false;
        for (var i in this.nodes){
            node = this.nodes[i];
            if (node){
                if (parseInt(node.offsetTop)+parseInt(node.offsetHeight) < 0) {
                    node.style.top = this.maxHeight - parseInt(node.offsetHeight);
                    this.topNode = 0,top = -1;
                    geser = true;
                }else{
                    node.style.top = top;
                    top += parseInt(node.offsetHeight);
                }
            }
        }  
        //geser ke atas        
        if (geser){
            var tmp = [];
            for (var i=1; i < this.nodes.length;i++)
                tmp[tmp.length] = this.nodes[i];
            tmp[tmp.length] = this.nodes[0];
            this.nodes[0].style.top = top;
            this.nodes  = tmp;
        }
        this.maxHeight = top;
        this.topNode-=1;
    },
    itemsMouseClick: function(event,id){
        try{            
            var item = {};
            if (this.items.more !== undefined) item = this.items.more[id].item;        
            this.onItemClick.call(this,this.items.containtsid[id], item);  
        }catch(e){
            systemAPI.alert(this+"$itemsMouseClick("+this.name+")",e);
        }
    },
    itemsMouseOver: function(event,id){
        var target = curvyBrowser.isIE ? event.srcElement : event.target;        
		target.parentNode.style.color = "#ff9900";      	
		if (this.view == 4 )this.timer1.stop();		
    },
    itemsMouseOut: function(event,id){
        var target = curvyBrowser.isIE ? event.srcElement : event.target;
        target.parentNode.style.color = this.fontColor;      
		if (this.view == 4 )this.timer1.start();
    },
    btnMouseOver: function(event,id){
        var target = $(this.getFullId()+"_btn"+id);
        target.style.border = "2px solid #ff9900";
        target.style.fontWeight = "bold";
        if (this.view == 3){            
            try{
                if (this.items.more !== undefined) {
                    item = this.items.more[id].item;
                    system.showHint(event.clientX, event.clientY,item.more.filename,true);
                }        
            }catch(e){
                alert(e);
            }
        }
    },
    btnMouseOut: function(event,id){        
        var target = $(this.getFullId()+"_btn"+id);
        target.style.border = "1px solid #ff9900";
        target.style.fontWeight = "normal";
    },
    showItemsMore: function(btnCaption){
        try{
            var id, node;
            if (this.view != 2) return;
            if (btnCaption === undefined) btnCaption = "Beli";
            for (var i in this.items.items){
                node = $(this.getFullId()+"_btn"+i);
                if (node !== undefined && node !== null) node.style.display = "";                
                node = $(this.getFullId()+"_btnCapt"+i);
                if (node !== undefined && node !== null) node.innerHTML = btnCaption;
                if (btnCaption == "Beli"){
                    node = $(this.getFullId()+"_price"+i);
                    if (node !== undefined && node !== null) node.style.display = "";
                }
            }                    
        }catch(e){
            systemAPI.alert(this+"#showItemsMore",e);
        }
    },
	hideItemsMore: function(){
	   try{
            var id, node;
            if (this.view != 2) return;
            for (var i in this.items.items){
                node = $(this.getFullId()+"_btn"+i);
                if (node !== undefined) node.style.display = "none";
                node = $(this.getFullId()+"_price"+i);
                if (node !== undefined) node.style.display = "none";
            }        
        }catch(e){
            systemAPI.alert(this+"#hideItemsMore",e);
        }
    },
    setBtnCloseVisible: function(data){
        this.btnCloseVisible = data;
        var node = $(this.getFullId()+"_close");
        if (node !== undefined){
            node.style.left = this.width - (document.all ? 64 : 60);
            node.style.width =  50;
            node.style.display = data ? "":"none";            
        }
        var toolbar = $(this.getFullId() + "_toolbar");
        if (toolbar !== undefined)
            toolbar.style.left = this.width - (this.btnCloseVisible ? 120 : 80);
    },
    doMouseCloseOver: function(event){
        var target = document.all ? event.srcElement: event.target;
        target.style.backgroundPosition = "0 -15";
    },
    doMouseCloseOut: function(event){
        var target = document.all ? event.srcElement: event.target;
        target.style.backgroundPosition = "0 0";
    },
    doMouseCloseClick: function(event){
        if (document.all) this.hide();
        else this.fadeOut();
        this.onClose.call(this);
        var frame = $(this.getFullId() + "_frame");
        frame.style.display = "none";
    },
    doMouseToolClick: function(event, btn){
        try{            
            if (btn == "pdf"){
                var frame = $(this.getFullId() + "_frame");
                var html = new server_util_arrayList();
				html.add(this.getClientCanvas().innerHTML);			
				html.add("pdf");			
				html.add(new Date().valueOf()+"_pdf");				        	          	     
                window.open(upDownHtml(html));
            }else {
                var win = window.open("");
    			win.document.write(loadCSS("server_util_laporan"));
    			win.document.write(this.getClientCanvas().innerHTML);
    			win.document.close();
            }
       }catch(e){
            systemAPI.alert(this+"$toolbarClick("+this.name+")",e);
       }
    },
    doMouseToolOver: function(event,btn){
        
    },
    doMouseToolOut: function(event,btn){
        
    },
    setToolbarVisible: function(data){
        var toolbar = $(this.getFullId() + "_toolbar");
        if (toolbar !== undefined) {
            toolbar.style.display = data ? "" :"none";
            toolbar.style.left = this.width - (this.btnCloseVisible ? 120 : 80);
        }     
    }    
});
