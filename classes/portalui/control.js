//***********************************************************************************************
//*	Copyright (c) 2009 roojax
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			roojax jamboo											
//***********************************************************************************************
window.portalui_control = function(owner, options){
    if (owner)
    {				
        this.isRounded = false;
		window.portalui_control.prototype.parent.constructor.call(this, owner);		
		this.className = "portalui_control";
		this.left = 8;
		this.top = 0;        
		this.width = 32;
		this.height = 32;
		this.name = "control";			
		this.visible = true;        
		this.tabIndex = 1;
		this.tabStop = false;		
		this.tag = 0;
		this.opacity = 100;
		this.opacity2 = 100;
		this.heightTmp = 0;			
		this.isPopUp = false;
		this.interval = 50;
		this.fadeIn = false;
		this.data = "";
		this.hint = "";		
		this.options = options;
		if (options !== undefined){
			this.updateByOptions(options);			
			if (options.interval !== undefined) this.setIntvl(options.interval);
			if (options.autoComplete) this.setAutoComplete(options.autoComplete);
		}
    }
};
window.portalui_control.extend(window.portalui_component);
window.control = window.portalui_control;
window.portalui_control.implement({
	draw: function(canvas){		
		try{
			var node = document.createElement("div");
			node.id = this.getFullId();
			node.style.position = "absolute";
			node.style.left = 0;
			node.style.top = 0;
			node.style.width = 32;
			node.style.height = 32;
			canvas.appendChild(node);
			if (this.doDraw) this.doDraw(node);
		}catch(e){
			systemAPI.alert(this+"$draw()",e);
		}
	},
	setInnerHTML: function(html, canvas){
		var cnv = canvas !== undefined ? canvas : this.getCanvas();
		if (cnv !== undefined){		    
			html = html.replace(/[{}]/gi,"");
			cnv.innerHTML = html;			
		}
	},
	remBracket: function(html){
		return html.replace(/[{}]/gi,"");		
	},
	getCanvas: function(){
	    var result = $(this.getFullId());
	    return result;
	},
	doDraw:function(canvas){
	},
	bringToFront:function(){
	    if (this.owner.isContainer){ 
	        var zIndex = this.owner.getNextZIndex();        
	        var canvas = this.getCanvas();
	        if (canvas != undefined)
	            canvas.style.zIndex = zIndex;
	    }
	},
	sendToBack:function(){
	    if (this.owner.isContainer){ 
	        var canvas = this.getCanvas();
	        if (canvas != undefined)
	            canvas.style.zIndex = 1;
	    }
	},
	getVisibility:function (el) {
		if (el.style) {			
			if (el.currentStyle && el.currentStyle.visibility && el.currentStyle.visibility != 'inherit' || el.currentStyle.display == "")
				return el.currentStyle.display == "" ? "visible": el.currentStyle.visibility;
			else while (el = el.parentElement) {
				if (el != null && el.style.visibility && el.style.visibility != "inherit" || el.style.display == ""){
					return el.style.display == "" ? "visible": el.style.visibility;
				}
				if (el != null && el.currentStyle && el.currentStyle.visibility && el.currentStyle.visibility != 'inherit' || el.currentStyle.display == "")
					return el.currentStyle.display == "" ? "visible": el.currentStyle.visibility;
			}
		} else if (document.layers) {
			if (el.visibility != 'inherit') return el.visibility;
			else while (el = el.parentLayer) {
				if (el != null && el.visibility != 'inherit') {
					return el.visibility;
				}
			}
		}
		return (!document.layers) ? 'visible' : 'show';
	},
	setFocus: function(){	
		try{
			var edit = $(this.getFullId() +"_edit");
			if (edit != undefined && (edit.style.display == "" || edit.style.visibility == "visible") && this.isVisible()) edit.focus();			
			else if (this.tabStop) this.getForm().setActiveControl(this);			
			this.doSetFocus();			
		}catch(e){						
			systemAPI.alert("setFocus: "+e+":"+this.getVisibility(edit)+this.caption, this);
		}
	},
	doThemesChange: function(themeName){
	},
	doLostFocus: function(){
		try{	
			/*var edit = $(this.getFullId() +"_edit");
			if (edit != undefined){
				edit.blur();					
			}*/
			this.doDefocus();
		}catch(e){
			alert(e);
		}
	},
	doDefocus: function(){				
		var edit = $(this.getFullId() +"_edit");
		if (edit && this.autoComplete && this.app.suggestionBox) {							
			if (edit.value !="" )this.app.suggestionBox.add(edit.value);							
			this.app.suggestionBox.hide();
		}
	},
	doSetFocus: function(){
		var edit = $(this.getFullId()+"_edit");		
		if (edit && this.autoComplete){
			if (this.app.suggestionBox === undefined){			    		    			
				uses("portalui_suggestionBox");					
				this.app.suggestionBox = new portalui_suggestionBox(this.app);								
			}
			this.app.suggestionBox.setCtrl(this);
			this.app.suggestionBox.hide();
		}
	},
	eventMouseDown: function(event){	
	},
	eventMouseUp: function(event){	
		//alert(event.button);					
	    switch (event.button)
	    {
	        case 1 :// left 
	                break;
	        case 2 :// right
	                var target = (document.all) ? event.srcElement : event.target;
	                var n = this.getFullId();	                
                    if (this.popUpMenu != undefined)
                    {
                        this.popUpMenu.setTarget(this);				
                        this.popUpMenu.popUp(event.clientX, event.clientY);
                    }
	                break;
	    }
	},
	eventMouseMove: function(event){
	    if (this.hint != undefined && trim(this.hint) != ""){
            var target = (document.all) ? event.srcElement : event.target;
    	    var n = this.getFullId();	
    	    if ((target != undefined))
    	    {    	        
				if (event.clientY + 10 < system.getScreenHeight())
					window.system.showHint(event.clientX, event.clientY, this.hint,true);
				else window.system.showHint(event.clientX, event.clientY, this.hint,true);    	        
    	    }
   	    }
	},
	eventMouseOut: function(event){
	    if (this.hint != undefined)
	        window.system.hideHint();
	},
	doSysMouseDown: function(x, y, button, buttonState){
	},
	doSysMouseMove: function(x, y, button, buttonState){
	},
	doSysMouseUp: function(x, y, button, buttonState){
	},
	doKeyDown: function(keyCode, buttonState){	
	},
	doKeyUp: function(keyCode, buttonState){				
		if (this.autoComplete){										
			this.invokeEvent("keyDown",this,keyCode);
		}
	},
	doKeyPress: function(charCode, buttonState,keyCode){		
		
	},
	doSizeChange: function(width, height){	 
	},
	getForm: function(){
		try{
			var result = this.owner;		
			if (window.portalui_childForm === undefined){
			     uses("portalui_childForm");
            }
			while ((result != undefined) && !(result instanceof portalui_commonForm  || result instanceof portalui_childForm))  							
				result = result.getOwner();
		}catch(e){
			systemAPI.alert(this+"$getForm()",e);
		}
	    return result;
	},
	getHint: function(){
		return this.hint;
	},
	setHint: function(data){
		this.hint = data;	
	},
	getLeft: function(){
		return this.left;
	},
	setLeft: function(data){
	    if (this.left != data)
	    {
	        this.left = data;
	        var node = $(this.getFullId());
	        if (node != undefined)
	            node.style.left = data;
	    }
		if (typeof data == "string"){
			if (data.indexOf("%") != -1){
				if (this.owner instanceof portalui_application)
					data = system.screenWidth * parseFloat(data) / 100;
				else data = this.owner.width * parseFloat(data) / 100;
			}else data = parseFloat(data);				
		}
		this.left = data;
	},
	getTop: function(){
		return this.top;
	},
	setTop: function(data){
	    if (this.top != data)
	    {
	        this.top = data;    
	        var node = $(this.getFullId());
	        if (node != undefined)
	            node.style.top = data;
	    }
		if (typeof data == "string"){
			if (data.indexOf("%") != -1){
				if (this.owner instanceof portalui_application)
					data = system.screenHeight * parseFloat(data) / 100;
				else data = this.owner.height * parseFloat(data) / 100;
			}else data = parseFloat(data);				
		}
		this.top = data;
	},
	invalidateSize : function(width, height){
	},
	getWidth: function(){
		return this.width;
	},
	setWidth: function(data){	
	   try{
    	    if (this.width != data)
    	    {
    	        this.width = data;    
    	        var node = $(this.getFullId());    	    
    	        if (node !== undefined && node !== null){
    	            if (curvyBrowser !== undefined && curvyBrowser !== null && (curvyBrowser.isIE || curvyBrowser.isOp)){
                        if (this.isRounded){
                            if (curvyCorners) {
                                curvyCorners.adjust(node,"style.width",data);             
                                this.redrawElm(node);
                            }
                        }else node.style.width = data;                        
                    }else node.style.width = data;            	        
                }
    			if (typeof data == "string"){
    				if (data.indexOf("%") != -1){
    					if (this.owner instanceof portalui_application)
    						data = system.screenWidth * parseFloat(data) / 100;
    					else data = this.owner.width * parseFloat(data) / 100;
    				}else data = parseFloat(data);				
    			}
    			this.width = data;
    			this.doSizeChange(this.width, this.height);
    	    }	    
  	    }catch(e){
  	         systemAPI.alert(this+"$setWidth()",e);
        }
	},
	getHeight: function(){
		return this.height;
	},
	setHeight: function(data){
		try{
		    if (this.height != data)
		    {
		        this.height = data;    
		        var node = $(this.getFullId());

		        if (node !== undefined && node !== null){
		            if (curvyBrowser !== undefined && curvyBrowser !== null && (curvyBrowser.isIE || curvyBrowser.isOp)){
                        if (this.isRounded) {    
                            if (curvyCorners) {
                                curvyCorners.adjust(node,"style.height",data);             
                                this.redrawElm(node);
                            }
                        }else node.style.height = ( data < 0 ? 0 : data) ;                        
		            }else node.style.height = ( data < 0 ? 0 : data) ;   						            
                }
				if (typeof data == "string"){
					if (data.indexOf("%") != -1){
						if (this.owner instanceof portalui_application)
							data = system.screenHeight * parseFloat(data) / 100;
						else data = this.owner.height * parseFloat(data) / 100;
					}else data = parseFloat(data);				
				}
				this.height = data;
		        this.doSizeChange(this.width, this.height);			
		    }		    
		}catch(e){
			systemAPI.alert(this+"$setHeight()",e);
		}
	},
	getTabIndex: function(){
		return this.tabIndex;
	},
	setTabIndex: function(data){
		this.tabIndex = data;
	},
	isTabStop: function(){
		return this.tabStop;
	},
	setTabStop: function(data){
		this.tabStop = data;
	},
	isVisible: function(){
		return this.visible;
	},
	setVisible: function(data){
		this.visible = data;    
	    var node = this.getCanvas();
	    if (node != undefined){
	        node.style.display = this.visible ? "":"none";
	    }
	},
	getPopUpMenu: function(){
		return this.popUpMenu;
	},
	setPopUpMenu: function(data){
		this.popUpMenu = data;
	},	
	show: function(){
		this.setVisible(true);
	},
	hide: function(){
		this.setVisible(false);
	},
	setTag: function(tag){
		this.tag = tag;
	},
	getTag: function(){
		return this.tag;
	},
	fade: function(){	
		this.fadeIn = true;		
		try{	
			var cnv = this.getCanvas();
			if (this.opacity < 100 && this.visible) {				
				cnv.style.display = "";							
		  	}else 
		  	{		  					    
				this.setOpacity(cnv,this.opacity);				
				this.show();		
                this.opacity = 0;
				clearTimeout(this.intervalId2);                  
		  		return false;
		  	}	  	
		  	this.setOpacity(cnv,this.opacity);
			this.opacity += 10;			
			this.intervalId2 = window.setTimeout("$$(" + this.resourceId + ").fade();", this.interval);
		}catch(e){
			this.intervalId2 = undefined;
			this.opacity = 0;
			//systemAPI.alert(e);
		}
	},
	fadeOut: function(){
		//do fade
		this.fadeIn = false;
		try{	
			var cnv = this.getCanvas();
			if (this.opacity2 > 0 && this.visible) {				
				cnv.style.display = "";						
		  	}else 
		  	{				  					
				this.hide();
                cnv.style.display = "none";																
				this.setOpacity(cnv,this.opacity2);							
				this.opacity2 = 100;						
				clearTimeout(this.intervalId3);  				    				
				return false;
		  	}	  	
		  	this.setOpacity(cnv,this.opacity2);
			this.opacity2 -= 10;			
			this.intervalId3 = window.setTimeout("$$(" + this.resourceId + ").fadeOut();", this.interval);
		}catch(e){
			this.intervalId3 = undefined;
			this.opacity2 = 100;
		}
	},
	slideVert: function(){	
		try{	
			var cnv = this.getCanvas();
			if (this.heightTmp < this.height) {				
				cnv.style.height = this.heightTmp;						
		  	}else 
		  	{
				this.hide();
		  		clearTimeout(this.intervalId3);  		
			    this.heightTmp = 0;			
		  		return false;
		  	}	  	
			this.heightTmp +=  5;			
			this.intervalId3 = window.setTimeout("$$(" + this.resourceId + ").slideVert();", this.interval);
		}catch(e){
			this.intervalId3 = undefined;
			this.heightTmp = 0;			
		}
	},
	setIntvl: function(data){	
		this.interval = data;
	},
	setOpacity: function(cnv,opacity){		
		if (opacity == undefined){
			opacity = cnv;
			cnv = this.getCanvas();
		}
		cnv.style.MozOpacity = (opacity/100);
		cnv.style.opacity = (opacity/100);
		cnv.style.filter = 'alpha(opacity:'+opacity+')';	
	},
	setBound:function(x, y, w, h){
		this.setLeft(x);
		this.setTop(y);
		this.setWidth(w);
		this.setHeight(h);
	},
	setData: function(data){
		this.data = data;
	},
	getData: function(){
		return this.data;
	},
	addStyle: function(style){
		var cnv = this.getCanvas();
		if (cnv !== undefined && cnv !== null){
			cnv.style.cssText = cnv.style.cssText +";"+style;
		}
	},
	addNodeStyle: function(node,style){		
		if (node !== undefined && node !== null){
			node.style.cssText = node.style.cssText +";"+style;
		}
	},
	setStyle: function(style){
		var cnv = this.getCanvas();
		if (cnv !== undefined && cnv !== null){
			cnv.style.cssText = style;
		}
	},
	removeStyle: function(){
		var cnv = this.getCanvas();
		if (cnv !== undefined && cnv !== null){
			cnv.style.cssText = "";
		}
	}, 
	updateByOptions: function(options){
		if (options.bound !== undefined) {
			this.setLeft(options.bound[0]);
			this.setTop(options.bound[1]);
			this.setWidth(options.bound[2]);
			this.setHeight(options.bound[3]);
		}
		if (options.height !== undefined) this.setHeight(options.height);
		if (options.left !== undefined) this.setLeft(options.left);
		if (options.top !== undefined) this.setTop(options.top);
		if (options.width !== undefined) this.setWidth(options.width);
		if (options.name !== undefined) this.setName(options.name);
		if (options.hint !== undefined) this.setHint(options.hint);			
		if (options.tag !== undefined) this.setTag(options.tag);			
		if (options.visible !== undefined) this.setVisible(options.visible);			
		if (options.rounded !== undefined) this.makeRound(options.rounded);
	},
	fadeColor: function(start,end,steps,speed,id){
		if (id == undefined) var target = this.getCanvas();
		else target = $(id);
		colorFade(target,"color",start,end,steps,speed);
	},
	fadeBackground:  function(start,end,steps,speed,id,callback){
		if (id == undefined) var target = this.getCanvas();
		else target = $(id);
		colorFade(target,"background",start,end,steps,speed,callback);
	},
	fadeBorder:  function(start,end,steps,speed,id,callback){
		if (id == undefined) var target = this.getCanvas();
		else target = $(id);
		colorFade(target,"border",start,end,steps,speed,callback);
	},
	makeRound: function(rad, setting){
	   try{    	
	      if (rad === undefined) rad = 5; 
          if (curvyBrowser.isIE || curvyBrowser.isOp){              
              var settings = {antiAlias: true};
              if (setting !== undefined){
                if (setting.tl !== undefined) settings.tl = {radius : setting.tl };    
                if (setting.tr !== undefined) settings.tr = {radius : setting.tr };    
                if (setting.bl !== undefined) settings.bl = {radius : setting.bl };    
                if (setting.br !== undefined) settings.br = {radius : setting.br };    
              }else{
                settings.tl = {radius : rad };
                settings.tr = {radius : rad };
                settings.bl = {radius : rad };
                settings.br = {radius : rad };
              }
              curvyCorners(settings, this.getCanvas());              
          }else {
            var style = "";
            if (setting !== undefined){
                if (setting.tl !== undefined) style += "-webkit-border-top-left-radius: "+setting.tl+"px;-moz-border-radius-topleft: "+setting.tl+"px;"; 
                if (setting.tr !== undefined) style += "-webkit-border-top-right-radius: "+setting.tr+"px;-moz-border-radius-topright: "+setting.tr+"px;"; 
                if (setting.bl !== undefined) style += "-webkit-border-bottom-left-radius: "+setting.bl+"px;-moz-border-radius-bottomleft: "+setting.bl+"px;"; 
                if (setting.br !== undefined) style += "-webkit-border-bottom-right-radius: "+setting.br+"px;-moz-border-radius-bottomright: "+setting.br+"px;"; 
            }else style = "-webkit-border-radius: "+rad+"px;-moz-border-radius: "+rad+"px;"; 
            this.addStyle(style); 
          }
          this.isRounded = true;          
        }catch(e){
            systemAPI.alert(this+"$makeRound()",e);
        }
    },
    redrawElm : function(elm) {
		return;
      if (!curvyBrowser.isOp && !curvyBrowser.isIE) return;
      if (!curvyCorners.redrawList) throw curvyCorners.newError('curvyCorners.redraw() has nothing to redraw.');
      for (var i in curvyCorners.redrawList) {
        if (isNaN(i)) continue; // in case of added prototype methods
        var o = curvyCorners.redrawList[i];
        if ( o.node != elm) continue;
        if (!o.node.clientWidth) continue; // don't resize hidden boxes
        var newchild = o.copy.cloneNode(false);
        for (var contents = o.node.firstChild; contents != null; contents = contents.nextSibling)
          if (contents.className === 'autoPadDiv') break;
        if (!contents) {
          curvyCorners.alert('Couldn\'t find autoPad DIV');
          break;
        }
        o.node.parentNode.replaceChild(newchild, o.node);
        while (contents.firstChild) newchild.appendChild(contents.removeChild(contents.firstChild));
        o = new curvyObject(o.spec, o.node = newchild);
        o.applyCorners();
        break;
      }      
    },
    getTargetClass: function(){
        var target = this.owner;
        while (!((target instanceof portalui_childForm && target.className != "portalui_childForm")|| 
                (target instanceof portalui_commonForm && target.className != "portalui_commonForm")|| 
                (target instanceof portalui_panel && target.className != "portalui_panel"))){        
            target = target.owner;
        }            
        return target;
    },
	addEventListener: function(event, fn, target){
		if (this.eventListener === undefined) this.eventListener = new portalui_arrayList();
		this.eventListener.add({event:event,method:fn, target:target});
	},
	removeEventListener: function(event, fn, target){
		this.eventListener.delObject({event:event,method:fn, target:target});	
	},
	invokeEvent: function(event,target, param){
		try{
			var obj,res;
			for (var i in this.eventListener.objList){
				obj = this.eventListener.get(i);
				if (obj.event == event && obj.target == target){					
					eval("res = target."+obj.method+"(target,param);");			
					return res;
				}
			}
		}catch(e){
			alert(e);
		}
	},	
	setAutoComplete: function(data){
		var edit = $(this.getFullId()+"_edit");
		if (edit){
			this.autoComplete = data;			
			if (data) this.addEventListener("keyDown","doSearchKeyDown",this);		
		}
	},
	doSearchKeyDown: function(sender, keyCode){
		var edit = $(this.getFullId()+"_edit");		
		if (this.autoComplete && this.app.suggestionBox){			
			if (keyCode == 13) this.app.suggestionBox.hide();
			else this.app.suggestionBox.search(edit.value);
		}
	},
	doSystemPaste: function(str){
		var edit = $(this.getFullId()+"_edit");
		if (edit){
			edit.value = str;
		}
	},
	maximize: function(){
		this.setWidth(this.owner.width);
		this.setHeight(this.owner.height);
	},
	offset: function(){
		var docElem, win,
		box = { top: 0, left: 0 },
		elem = this.getCanvas(),
		doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		box = elem.getBoundingClientRect();

		docElem = doc.documentElement;

		
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	}
});
function isWindow ( obj ) {
		return obj != null && obj == obj.window;
};
function getWindow( elem ) {
	return isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
};