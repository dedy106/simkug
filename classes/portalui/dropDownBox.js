//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_dropDownBox= function(owner)
{
	if (owner)
	{
		this.itemWidth = 200;
		window.portalui_dropDownBox.prototype.parent.constructor.call(this, owner);
		this.className = "portalui_dropDownBox";		
		this.color = "#F0F9EF";
		this.className = "dropDownBox";
		this.items = new portalui_arrayMap();
		this.onSelect = new portalui_eventHandler();
		this.onDblClick = new portalui_eventHandler();
		this.selectedItem = undefined;
		this.itemHeight=5;
	}
};
window.portalui_dropDownBox.extend(window.portalui_commonForm);
window.dropDownBox = window.portalui_dropDownBox;
window.portalui_dropDownBox.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		if (document.all)
			var html = "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
	                    "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: "+this.itemWidth+"px; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div id = '"+n+"_right' style='{position: absolute; left:"+this.itemWidth+"px; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width:100%; height: 100%}' ></div>" +						
	                    "</div>" +                    
						"<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: "+this.itemWidth+"px	; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id = '"+n+"_bottomright' style='{position: absolute; width: 8; top: 100%; left:"+this.itemWidth+"px; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div id= '"+n+"_bottom' style='{position: absolute; left: -8; top: 100%; width: "+this.itemWidth+"px; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width:100%; height: 100%}' ></div>" +
	                    "</div>" +
						"<div id='"+n+"_box' style='{position:relative; left:0;top:0;width:"+this.itemWidth+"px;;height:100%;"+
						"cursor: pointer;background-color:"+this.color+";"+
						"border-top: " + window.system.getConfig("3dborder.inner.bottom") + ";"+
						"border-right: " + window.system.getConfig("3dborder.inner.left") + ";"+
						"border-bottom: " + window.system.getConfig("3dborder.inner.top") + ";"+
						"overflow:visible;}' onMouseOut='window.system.getResource("+this.resourceId+").eventMouseExit(event);'> </div>"+
					"</div>";
		else
			var html = "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
	                    "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: "+this.itemWidth+"px; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div id = '"+n+"_right' style='{position: absolute; left:"+this.itemWidth+"px; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width:100%; height: 100%}' ></div>" +						
	                    "</div>" +                    
						"<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: "+this.itemWidth+"px	; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id = '"+n+"_bottomright' style='{position: absolute; width: 8; top: 100%; left:"+this.itemWidth+"px; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div id= '"+n+"_bottom' style='{position: absolute; left: -8; top: 100%; width: "+this.itemWidth+"px; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width:100%; height: 100%}' ></div>" +
	                    "</div>" +
						"<div id='"+n+"_box' style='{position:absolute; left:0;top:0;width:"+this.itemWidth+"px;height:100%;"+
						"cursor: pointer;background-color:"+this.color+";"+
						"border-top: " + window.system.getConfig("3dborder.inner.bottom") + ";"+
						"border-right: " + window.system.getConfig("3dborder.inner.left") + ";"+
						"border-bottom: " + window.system.getConfig("3dborder.inner.top") + ";"+
						"overflow:visible;}' onMouseOut='system.getResource("+this.resourceId+").eventMouseExit(event);'> </div>"+
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
	setItems: function(items){
		try{
			this.items.clear();
			var item = undefined;
			var realItem = undefined;
			var node = undefined;
			var resId = 0;
			var client = $(this.getFullId() + "_box");
			
			var n = undefined;
			var tmpN = this.getFullId() + "_item";
			var width = this.width;
			var itemWidth = 0;
			client.innerHTML = "";
		    var itemC = 0;  		    
			for (var i in items.objList)
			{
                itemC++;
                
				realItem = items.get(i);
				if (realItem == undefined) continue;
				resId = itemC;
				
				item = new Array(resId, realItem, realItem);
				
				this.items.set(i, item);
		
				node = document.createElement("div");
		
				n = tmpN + resId;
				node.id = n;
				node.style.width = "100%";
				node.style.height = "20";
				node.style.position = "relative";
				node.style.overflow = "hidden";
				node.style.background = system.getConfig("text.normalBgColor");
				itemWidth = realItem.length * 6;
				
				if (itemWidth > width)
					width = itemWidth;
				this.itemWidth = this.width;
				node.innerHTML =    "<div id='" + n + "_caption' style='position: absolute; left: 2; top: 3; width:100%; height: 100%;white-space: nowrap'>" + realItem + "</div>" +
									"<div style='cursor: pointer; background: url(images/transparent.png); position: absolute; left: 0; top: 0; width: 100%; height: 100%;' " +
										"onMouseOver='system.getResource(" + this.resourceId + ").eventMouseOver(event, " + resId + ");' " +
										"onMouseOut='system.getResource(" + this.resourceId + ").eventMouseOut(event, " + resId + ");' " +
										"onMouseDown='system.getResource(" + this.resourceId + ").eventMouseDown(event, " + resId + ");' " +
										"onClick='system.getResource(" + this.resourceId + ").eventDblClick(event, " + resId + ");' " +
										"></div>";		
				client.appendChild(node);
			}
			var h = this.items.getLength();
			if (h > 0) this.selectedItemId = 0;
			if (this.items.getLength() > this.itemHeight)
				h = this.itemHeight * 20 + 2;
			else
				h =  h * 20 + 2;
			this.setHeight(h);    			
		}catch(e){
			alert("test:[saiCB]::setItems:"+e);
		}
	},
	eventMouseOver: function(event, itemId){
	    if (itemId != this.selectedItemId){
	        var n = this.getFullId() + "_item" + itemId;

	        var node = $(n);

	        if (node != undefined)
	            node.style.background = system.getConfig("text.overBgColor");

	        node = $(n + "_caption");

	        if (node != undefined)
	            node.style.color = system.getConfig("text.overColor");
			
	    }
	},
	eventMouseExit: function(event){
	},
	eventMouseOut: function(event, itemId){
	    if (itemId != this.selectedItemId){
	        var n = this.getFullId() + "_item" + itemId;
	        var node = $(n);
	        if (node != undefined)
	            node.style.background = system.getConfig("text.normalBgColor");
	        node = $(n + "_caption");
	        if (node != undefined)
	            node.style.color = system.getConfig("text.normalColor");
	    }
	},
	eventMouseDown: function(event, itemId){
	    var item = undefined;
	    var tmpItem = undefined;	
		for (var i in this.items.objList){
		    tmpItem = this.items.objList[i];
			var n = this.getFullId() + "_item" + tmpItem[0];
	        var node = $(n);
	        if (node != undefined)
	            node.style.background = system.getConfig("text.normalBgColor");
		}		
		for (var i in this.items.objList){
	        tmpItem = this.items.objList[i];			
	        if (tmpItem[0] == itemId){
	            item = tmpItem;
	            break;
	        }
	    }
	    if (item != undefined){
			this.selectedItemId = itemId;
	        var node = undefined;
	        var n = "";
	        n = this.getFullId() + "_item" + itemId;
	        node = $(n);
	        if (node != undefined)
	            node.style.background = system.getConfig("text.highlightBgColor");

	        node = $(n + "_caption");

	        if (node != undefined)
	            node.style.color = system.getConfig("text.highlightColor");
	        
			this.selectedItem = item;
	        this.onSelect.call(this, item[0], item[1]);
	    }
	},
	eventDblClick: function(event, itemId){
		this.hide();
		this.close();
		this.onDblClick.call(this, this.selectedItem[0],this.selectedItem[1]);		
		if (this.linkCtrl) this.linkCtrl.setFocus();
	},
	setWidth: function(data){
		try{		
		    {
				var step = "get box";
		        var frame = $(this.getFullId() + "_box");
				if (frame != null)
			        frame.style.width = data;
				step = "get border bottom";
				var border = $(this.getFullId() + "_bottom");
				border.style.width = data;
				step = "get border right";
				border = $(this.getFullId() + "_right");
				border.style.left = data;
				step = "get border bottomright";
				border = $(this.getFullId() + "_bottomright");
				border.style.left = data;
				step = "get border bottomsright";
				border = $(this.getFullId() + "_sRightTop");
				border.style.left = data;
				step = "get border bottomedgeright";
				border = $(this.getFullId() + "_sEdgeRight");
				border.style.left = data;		
		    }
			this.itemWidth = data;
			var itemNode = undefined;
			var tmpItem = undefined;
			for (var i in this.items.objList)
			{
				tmpItem = this.items.objList[i];
				itemNode = $(this.getFullId()+"_item"+ tmpItem);
				if (itemNode != undefined)
					itemNode.style.width = data;
			}
		}catch(e){
			alert("[portalui_dropDownBox]::setWidth:"+e+"\r\n"+step);
		}
	},
	setHeight: function(data){
		window.portalui_dropDownBox.prototype.parent.setHeight.call(this, data);
	 //   if (document.all)
	    {

	        var frame = $(this.getFullId() + "_box");
			if (frame != null)
			{
				frame.style.height = data;
				frame.style.position = "relative";
				frame.style.overflow = "auto";
			}
	    }
	},
	setSelectedId: function(data){
	    var item = this.items.get(data);
	    if (item != undefined)
	    {
	        var itemId = item[0];
	        var n = this.getFullId() + "_item" + itemId;
	        
	        this.selectedItemId = itemId;

	        var node = $(n);

	        if (node != undefined)
	            node.style.background = system.getConfig("text.highlightBgColor");

	        node = $(n + "_caption");

	        if (node != undefined)
	            node.style.color = system.getConfig("text.highlightColor");
	    }
	},
	doLostFocus: function(){
		window.portalui_dropDownBox.prototype.parent.doLostFocus.call(this);
		this.setVisible(false);
	},
	setItemHeight: function(itemHeight){
		this.itemHeight=itemHeight;
	},
	doKeyDown: function(charCode, buttonState, keyCode){
	   try{
	       if (this.selectedItemId === undefined) return false;
	       if (this.items.getLength() == 0) return false;
    	   switch(keyCode){
    	       case 40 :
    	            if (this.selectedItemId < this.items.getLength()) this.eventMouseDown(undefined, this.selectedItemId + 1);	       
    	            var n = this.getFullId() + "_item" + (this.selectedItemId);
       	            node = $(n);   	            
       	            if (parseInt(node.offsetTop) + 20 > parseInt($(this.getFullId()+"_box").scrollTop) + parseInt($(this.getFullId()+"_box").offsetHeight)){
       	            	$(this.getFullId()+"_box").scrollTop += 20;            
                	}
    	       break;
    	       case 38 :
    	           if (this.selectedItemId > 1) this.eventMouseDown(undefined, this.selectedItemId - 1);
    	           var n = this.getFullId() + "_item" + (this.selectedItemId);
       	            node = $(n);   	            
                   if (parseInt(node.offsetTop)< parseInt($(this.getFullId()+"_box").scrollTop)){
       	            	$(this.getFullId()+"_box").scrollTop = parseInt(node.offsetTop);            
                	}  
    	       break;
    	       case 13:	
					this.hide();
    	           this.close();				   
    	           if (this.linkCtrl) this.linkCtrl.setFocus();
    	       break;
           }
           return false;
        }catch(e){
            alert(e);
        }
    },
    setCtrl : function(ctrl){
        this.linkCtrl = ctrl;
    }
});
