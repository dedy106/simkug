//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_MenuForm = function(owner,options){
    if (owner){
		this.className = "portalui_MenuForm";
		window.portalui_MenuForm.prototype.parent.constructor.call(this, owner);        
		this.setWidth(100);
		this.setHeight(30);
		this.setVisible(false);
		this.parentForm = undefined;
		this.requesterForm = undefined;        
		this.lastId = undefined;
		if (options !== undefined){
			if (options.visible !== undefined) this.setVisible(options.visible);
		}		
    }
};
window.portalui_MenuForm.extend(window.portalui_commonForm);
window.MenuForm = window.portalui_MenuForm;
window.portalui_MenuForm.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.background = "#ffffff";
		canvas.style.width = 100;
		canvas.style.height = 30;
		canvas.style.zIndex = "999998";
	    var html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
	                    "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div style='{background: url(image/themes/"+system.getThemes()+"/menuBg.png) top left; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_bg' style='{background: url(image/themes/"+system.getThemes()+"/menuBg.png) top left; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_left' style='{background: url(image/themes/"+system.getThemes()+"/menuLeft.png) top left repeat-y; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_right' style='{background: url(image/themes/"+system.getThemes()+"/menuRight.png) top right repeat-y; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_top' style='{background: url(image/themes/"+system.getThemes()+"/menuTop.png) top left repeat-x; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_bottom' style='{background: url(image/themes/"+system.getThemes()+"/menuBottom.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_topLeft' style='{background: url(image/themes/"+system.getThemes()+"/menuTopLeft.png) top left no-repeat; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_topRight' style='{background: url(image/themes/"+system.getThemes()+"/menuTopRight.png) top right no-repeat; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_bottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/menuBottomLeft.png) bottom left no-repeat; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div id='" + n + "_bottomRight' style='{background: url(image/themes/"+system.getThemes()+"/menuBottomRight.png) bottom right no-repeat; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "<div style='{position: absolute; left: -2; top: -2; width: 100%; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "form' style='{position: relative; left: 4; top: 4; width: 100%; height: 100%; overflow: hidden}' ></div>" +
	                    "</div>" +
	                "</div>";

	    this.setInnerHTML(html, canvas);
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			var b1 = $( n +"_sLeftTop");
			var b2 = $( n +"_sLeft");
			var b3 = $( n +"_sEdgeLeft");
			var b4 = $( n +"_sBottomLeft");
			var b5 = $( n +"_sRightTop");
			var b6 = $( n +"_sRight");
			var b7 = $( n +"_sEdgeRight");
			var b8 = $( n +"_sBottomRight");
			var b9 = $( n +"_sBottom");		
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9]);
		}
	},
	addItem: function(menuItem){
		try{
		    var caption = menuItem.getCaption();
		    var icon = menuItem.getIcon();

		    if (caption == undefined)
		        caption = "";
		        
		    if (icon == undefined)
		        icon = "images/blank.gif";
		    
		    menuItem.onChange.set(this, "itemChange");

		    var n = this.getFullId() + "_" + menuItem.getResourceId();
		    
		    var bgColor = window.system.getConfig("text.normalBgColor");
		    var textColor = window.system.getConfig("text.normalColor");
		    var t = window.system.getName();
		    
		    var html = "<div id='" + n + "' style='{position: relative; background-color: " + bgColor + "; width: 100%; height: 20;overflow: visible}'>" +
		                    "<div id='" + n + "_break1' style='{display: none;position: absolute;left: 0;top: 2;width: 100%;height: 0;border-top: " + window.system.getConfig("3dborder.inner.bottom") + ";}'></div>" +
		                    "<div id='" + n + "_break2' style='{display: none;position: absolute;left: 0;top: 3;width: 100%;height: 0;border-top: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
		                    "<div id='" + n + "_icon' style='{position: absolute; background: url(" + icon + ") top left no-repeat;left: 4; top: 2; height: 16;width: 16;}'></div>" +
		                    "<div style='{position: absolute;left: 100%; width: 10; overflow: visible;height: 16;}'>" +
		                        "<div id='" + n + "_arrow' style='{display: none;position: absolute; background: url(image/themes/"+system.getThemes()+"/menuArrow.png) center left no-repeat;left: -10; top: 1; height: 16;width: 8;}'></div>" +
		                    "</div>" +                        
		                    "<div id='" + n + "_caption' style='{position: absolute; left: 25; top: 2;height: 100%;width: auto;color: " + textColor + "}'><nobr>" + caption + "</nobr></div>" +
		                    "<div style='{cursor: pointer;position: absolute; background: url(images/transparent.png) top left;left: 0; top: 0;height: 100%;width: 100%;}' " +
		                        "onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event, " + menuItem.getResourceId() + ");' " +
		                        "onMouseDown='window.system.getResource(" + this.resourceId + ").eventMouseDown(event, " + menuItem.getResourceId() + ");' " +
		                    "></div>" +
		                "</div>";
		                    
		    var client = $(this.getFullId() + "form");
		    client.innerHTML += this.remBracket(html);
		    
		    var newWidth = 40 + (caption.length * 7);

		    if (newWidth > this.getWidth())
		        this.setWidth(newWidth);
		    
		    this.calculateHeight();
		}catch(e){
			alert(e);
		}
	},
	popUp: function(x, y, pointMode){
		try{
		    if (this.parentForm == undefined)
		    {
		        var app = this.getApplication();
		        var form = app.getActiveForm();
		        
		        if (!(form instanceof portalui_MenuForm))
		            this.requesterForm = form; 
		    }
		    else
		        this.requesterForm = undefined;
		    
		    if (pointMode == undefined)
		        pointMode = 0;
		        if (x + this.width > system.screenWidth) x  = system.screenWidth - this.width - 30;
			if (y + this.height > system.screenHeight) y  = system.screenHeight - this.height - 30;
		    switch (pointMode)
		    {
		        case 0 :
		                var node = $(this.getFullId() + "_pointDown");

		                if (node != undefined)
		                    node.style.display = "none";
		                    
		                this.setLeft(x);
		                this.setTop(y);
		                break;
		        case 1 :
		                break;
		        case 2 : 
		                var node = $(this.getFullId() + "_pointDown");
		                
		                if (node != undefined)
		                    node.style.display = "";
		                
		                this.setLeft(x - 24);
		                this.setTop(y + this.getHeight());
		                break;
		    }
		    
		    // normalize old highlighted
		            
		    var n = this.getFullId() + "_" + this.lastId;

		    var node = $(n);

		    if (node != undefined){
			        node.style.background = window.system.getConfig("text.normalBgColor");
			            
			    node = $(n + "_caption");

			    if (node != undefined)
			        node.style.color = window.system.getConfig("text.normalColor");
		     }
		    this.lastId = undefined;	
		    this.show();
		}
		catch (e){
		    alert("[menuForm] :: popUp : " + e);
		}
	},
	eventMouseOver: function(event, id){
		try{
		    var item = window.system.getResource(id);

		    if (item != undefined)
		    {
		        if (item.getCaption() != "-")
		        {              
		            // normalize old highlighted
		            
		            var n = this.getFullId() + "_" + this.lastId;

		            var node = $(n);

		            if (node != undefined)
		                node.style.background = window.system.getConfig("text.normalBgColor");
		            
		            node = $(n + "_caption");

		            if (node != undefined)
		                node.style.color = window.system.getConfig("text.normalColor");
		                
		            // highligth new
		    
		            var n = this.getFullId() + "_" + id;
		    
		            var node = $(n);
		    
		            if (node != undefined)
		                node.style.background = window.system.getConfig("text.highlightBgColor");
		                
		            if (item.isHasChild())
		            {                
				if (this.left + this.width + item.menuForm.width > system.screenWidth) 
					item.popUp(this, this.left - item.menuForm.width - 2, this.top + node.offsetTop);
		                else	
					item.popUp(this, this.left + this.width - 2, this.top + node.offsetTop);
		            }                
		        
		            node = $(n + "_caption");

		            if (node != undefined)
		                node.style.color = window.system.getConfig("text.highlightColor");
		                
		            this.lastId = id;
		        }
		    }
	    }catch(e){
			alert("rujaxSysMenu.over."+e+"\r\n"+id);
		}
	},
	unPopUp: function(){
		var app = this.getApplication();

		if (this.requesterForm != undefined)
			app.setActiveForm(this.requesterForm);

		var activeForm = this.getRequesterForm();
		
		app.setActiveForm(activeForm);
		this.doDeactivate();
	},
	eventMouseDown: function(event, id){
	    var item = window.system.getResource(id);
	    
	    if (item != undefined)
	    {
	        if ((item.getCaption() != "-") && !item.isHasChild())
	        {
				var app = this.getApplication();

	            if (this.requesterForm != undefined)
	                app.setActiveForm(this.requesterForm);

	            var activeForm = this.getRequesterForm();
	            
	            app.setActiveForm(activeForm);
	            this.doDeactivate();
				
	            item.onClick.call(item);			
	        }
	    }
	},
	doDeactivate: function(){
		window.portalui_MenuForm.prototype.parent.doDeactivate.call(this);
	    var app = this.getApplication();
	    if (app == system.getActiveApplication()){
	        var form = app.getActiveForm();
	        if ((form != this) && !this.isChildForm(form)){
	            this.hide();	            
	            var parent = system.getResource(this.parentForm);	        
	            if (parent != undefined)
	                parent.doDeactivate();
	        }
	    }else{
	        this.hide();	        
	        if (this.requesterForm != undefined)
	            app.setActiveForm(this.requesterForm);
	        else{
	            var parent = system.getResource(this.parentForm);	        
	            if (parent != undefined)
	                parent.doDeactivate();
	        }
	    }
	},
	itemChange: function(sender){
	    var caption = sender.getCaption();
	    var icon = sender.getIcon();    
	    if (caption == undefined)
	        caption = "";
	    if (icon == undefined)
	        icon = "images/blank.gif";

	    var display1 = "";
	    var display2 = "none";

	    var n = this.getFullId() + "_" + sender.getResourceId();
	    var node = $(n);
	    
	    if (caption == "-")
	    {
	        display1 = "none";
	        display2 = "";
	        
	        node.style.height = 6;
	    }
	    else
	        node.style.height = 20;

	    node = $(n + "_caption");
	    node.innerHTML = "<nobr>" + caption + "</nobr>";
	    node.style.display = display1;
	    
	    node = $(n + "_icon");
	    node.style.background = "url(" + icon + ") top left no-repeat";
	    node.style.display = display1;
	    
	    node = $(n + "_break1");
	    node.style.display = display2;
	    
	    node = $(n + "_break2");
	    node.style.display = display2;
	    
	    if (sender.isHasChild())
	    {
	        node = $(n + "_arrow");
	        node.style.display = display1;
	    }

	    var newWidth = 40 + (caption.length * 7);

	    if (newWidth > this.getWidth())
	        this.setWidth(newWidth);
	},
	calculateHeight: function(){
	    var n = this.getFullId() + "form";
	    var node = $(n);
	    
	    var child = node.firstChild;
	    var height = 0;
	    
	    while (child != undefined)
	    {
	        height += parseInt(child.style.height, 10);
	        child = child.nextSibling;
	    }
	    this.setHeight(height + 4);
	},
	getParentForm: function(){
	    var result = window.system.getResource(this.parentForm);    
	    return result;
	},
	setParentForm: function(data){
		if (data instanceof portalui_MenuForm)
	        this.parentForm = data.getResourceId();
	    else
	        this.parentForm = undefined;        
	},
	getRequesterForm: function(){
	    var result = undefined;	    
	    var rootForm = this; 
	    var parentForm = rootForm.getParentForm(); 	    
	    while (parentForm != undefined){
	        rootForm = parentForm;
	        parentForm = rootForm.getParentForm(); 
	    }  
	    return rootForm.requesterForm; 
	},
	isParentForm: function(data){
		try{
			var result = false;		
			if (data instanceof portalui_MenuForm){
				var tmp = this.getParentForm();
				var dataId = data.getResourceId(); 		
				while ((tmp != undefined) && (tmp.getResourceId() != dataId))		
					tmp = tmp.getParentForm();					
				result = (tmp != undefined) && (tmp.getResourceId() == dataId);  
			}
		}catch(e){
			alert("[menuForm] :: isParentForm : " + e);
		}
	    return result; 
	},
	isChildForm: function(data){
	    var result = false;    
	    if (data instanceof portalui_MenuForm)
	        result = data.isParentForm(this);  	    
	    return result; 
	}
});
