//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_treeView = function(owner, options){	
    if (owner){
		try{			
	        window.app_builder_component_controls_treeView.prototype.parent.constructor.call(this, owner, options);        
	        this.className = "portalui_treeView";
	        this.selectedItem = undefined;
			this.maxExpandLevel = 0;		        
			this.childLength = 300;
	        this.onSelect = new portalui_eventHandler();
			this.onDblClick = new portalui_eventHandler();						
			this.tabStop = true;			
			this.xmlData = undefined;
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.childLength !== undefined) this.childLength= options.childLength;	
				if (options.dblClick !== undefined) this.onDblClick.set(options.dblClick[0],options.dblClick[1]);	
				if (options.select !== undefined) this.onSelect.set(options.select[0],options.select[1]);
			}
			this.addProperty({className:this.className, childLength:this.childLength});	
			this.addEvent({select:"",dblClick:""});
		}catch(e){
			alert("treeView" + e);
		}
    }
};
window.app_builder_component_controls_treeView.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_treeView.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.background = "url(icon/"+system.getThemes()+"/treebg.png)";//"#d9d7c6";
	    canvas.style.overflow = "hidden";
	    if (document.all)
	        html =  "<div id='" + n + "_border1' style='{position: absolute;left: 1;top: 1;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.inner.left") + ";border-top: " + window.system.getConfig("3dborder.inner.top") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.inner.right") + ";border-bottom: " + window.system.getConfig("3dborder.inner.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border3' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.left") + ";border-top: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
	                "<div id='" + n + "_border4' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.right") + ";border-bottom: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
					
	                "<div id='" + n + "_frame' style='{position : relative; left: 0; top: 2; width: 100%; height: 100%;overflow: auto;}'>" +
	                    "<div id='" + n + "form' style='{position : relative; left: 2; top: 0; width: 100%; height: 100%;overflow: visible;}'></div>" +
	                "</div>";
	    else
	        html =  
					"<div id='" + n + "_border1' style='{position: absolute;left: 1;top: 1;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.inner.left") + ";border-top: " + window.system.getConfig("3dborder.inner.top") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -2;top: -2;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.inner.right") + ";border-bottom: " + window.system.getConfig("3dborder.inner.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border3' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.left") + ";border-top: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
	                "<div id='" + n + "_border4' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.right") + ";border-bottom: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_frame' style='{position : relative; left: 1; top: 2; width: 100%; height: 100%;overflow: auto;}'>" +                	
						"<div id='" + n + "form' style='{position : relative; left: 2; top: 0; width: 100%; height: 100%;overflow: visible;}'></div>" +
	                "</div>";
	    this.setInnerHTML(html, canvas);
	},
	makeRounded: function(){
		settings = {
		  tl: { radius: 10 },
		  tr: { radius: 10 },
		  bl: { radius: 10 },
		  br: { radius: 10 },
		  antiAlias: true,
		  autoPad: true,
		  validTags: ["div"]
	    };		
		var rounded = new curvyCorners(settings,this.getFullId());				
		rounded.applyCornersToAll();
	},
	addItem: function(id, caption, icon){
	},
	delItem: function(id){	
		var idOwner = id.owner;
		id.free();
		idOwner.rearrange();
	},
	rearrange: function(){
		var child,ix = 0;
		for (var i in this.childs.objList)
		{
			child = window.system.getResource(this.childs.get(i));
			if(child != undefined){
				ix++;
				child.childIndex = ix;
			}
		}	
	},
	clear: function(){
		var child;
		for (var i in this.childs.objList)
		{
			child = window.system.getResource(this.childs.objList[i]);
			if(child != undefined)
				child.free();		
		}
		this.childs.clear();
		this.childsIndex = [];
	},
	doSelectItem: function(item){
		try{			
		    var oldSelected = window.system.getResource(this.selectedItem);			
		    if (oldSelected instanceof portalui_treeNode)
		        oldSelected.doDeselect();
		    if (item instanceof portalui_treeNode){			
		        this.selectedItem = item.getResourceId();
		        this.onSelect.call(this, item);
		    }else
		        this.selectedItem = undefined;
		}catch(e){
			systemAPI.alert("doSelectItem "+e+"<br>"+this.selectedItem,oldSelected+" "+step);
		}			
	},
	getSelectedItem: function(){
		return window.system.getResource(this.selectedItem);
	},
	setWidth: function(data){
		try{
		    window.app_builder_component_controls_treeView.prototype.parent.setWidth.call(this, data);

		    var frame = $(this.getFullId() + "_frame");
		    frame.style.width = data - 3;		
		}catch(e){
			alert(e);
		}
	},
	setHeight: function(data){
	    window.app_builder_component_controls_treeView.prototype.parent.setHeight.call(this, data);

	    var frame = $(this.getFullId() + "_frame");
	    frame.style.height = data - 4;
	},
	getMaxExpandLevel: function(node){
		var child = undefined;
		if (node instanceof portalui_treeView)
			this.maxExpandLevel = 0;
		for (var i in node.childs.objList)
		{
			child = window.system.getResource(node.childs.objList[i]);
			if (child instanceof window.app_builder_component_controls_treeNode)
			{
				if (!child.isHasChild())
				{
					if (this.maxExpandLevel < child.getLevel())
					  this.maxExpandLevel = child.getLevel();
				}else if (child.isExpanded())				
				{
					this.getMaxExpandLevel(child);	
				}else
				{
					if (this.maxExpandLevel < child.getLevel())
					  this.maxExpandLevel = child.getLevel();
				}
			}
		}
		return this.maxExpandLevel;
	},
	updateCanvas: function(node){
		var child = undefined;
		var j = 0;
		for (var i in node.childs.objList)
		{
			child = window.system.getResource(node.childs.objList[i]);
			childCanvas = child.getCanvas();				
			if (j == 0)
			{
			    if (childCanvas.style.borderTop == window.system.getConfig("3dborder.inner.top")) 
					childCanvas.style.borderTop = window.system.getConfig("3dborder.inner.bottom");
				else childCanvas.style.borderTop = window.system.getConfig("3dborder.inner.top");
			}
			j++;
			if (child instanceof window.app_builder_component_controls_treeNode)
			{
				if (child.isExpanded())				
				{								
					if (childCanvas != undefined)
					{
						if (this.maxExpandLevel - 1 == child.getLevel())
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/tree1.png)";//"#ebead8";
						else if (this.maxExpandLevel - 2 == child.getLevel())
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/tree2.png)";//"#e1e0cf";
						else
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/treebg.png)";//"#d9d7c6";
					}
					this.updateCanvas(child);	
				}else
				{				
					if (childCanvas != undefined)
					{
						if (this.maxExpandLevel == child.getLevel())
							childCanvas.style.background =  "url(icon/"+system.getThemes()+"/treeCol.png)";//childCanvas.style.background = "#f5f4e2";
						else if  (this.maxExpandLevel - 1 == child.getLevel())
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/tree1.png)";//"#ebead8";
						else if  (this.maxExpandLevel - 2 == child.getLevel())
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/tree2.png)";//"#e1e0cf";
						else 
							childCanvas.style.background = "url(icon/"+system.getThemes()+"/treebg.png)";//"#d9d7c6";                    						
					}
				}
			}
		}		
	},
	updateWidth: function(node){
		var child = undefined;
		for (var i in node.childs.objList)
		{
			child = window.system.getResource(node.childs.objList[i]);
			childCanvas = $(child.getFullId());					
			if (childCanvas != undefined)
				child.doDraw(childCanvas);
			this.updateWidth(child);				
		}	
	},
	doKeyDown: function(charCode, buttonState, keyCode){
	},
	setXMLData: function(xml){	
		try{
			uses("portalui_treeNode");
			this.xmlData = xml;
			var nodeTr, node = this.xmlData.firstChild.firstChild.firstChild;
			var kodeForm, kode, nama;
			while (node != undefined){		
				var nd = node.firstChild;		
				while (nd != undefined){				
					if (nd.tagName == "kode_form") kodeForm = nd.firstChild.nodeValue;
					else if (nd.tagName == "kode_menu") kode = nd.firstChild.nodeValue;
					else if (nd.tagName == "nama") nama = nd.firstChild.nodeValue;
					nd = nd.nextSibling;
				}	
				nodeTr = new portalui_treeNode(this);
				nodeTr.setKodeForm(kodeForm);
				nodeTr.setKode(kode);
				nodeTr.setCaption(nama);		
				nodeTr.setXMLNode(node.lastChild);
				node = node.nextSibling;
			}
		}catch(e){
			alert(e);
		}
	}
});