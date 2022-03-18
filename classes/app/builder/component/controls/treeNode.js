//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_treeNode = function(owner){
    if (owner){       
		if (owner instanceof portalui_treeView)		
			this.level = 1;
		else if (owner instanceof portalui_treeNode)
			this.level = owner.getLevel() + 1;
		else {		
			this.level = 1;
		}
		this.leftFrame = 0;
		this.childIndex = owner.childs.getLength() + 1;		
		this.childLength = owner.childLength;
		window.app_builder_component_controls_treeNode.prototype.parent.constructor.call(this, owner);        		
		this.className = "portalui_treeNode";
        this.caption = "Tree Item";        
        this.icon = undefined;
        this.onSelect = new portalui_eventHandler();
        this.kode = undefined;
		this.kodeForm = undefined;
		
		this.color = "#d9d7c6";
		this.clicked = false;	
		this.isRightClick = false;
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.showKode = false;
		
		this.data = undefined;
		this.data2 = undefined;
		this.isXML = false;
		this.childHasCreated = true;
		this.autoCreateChild = true;
    }
};
window.app_builder_component_controls_treeNode.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_treeNode.implement({
	doDraw : function(canvas){
	    var n = this.getFullId();
		var left = 0;
		//var tree = this.getTreeView();
		if (this.level == 1)
			left = 0;
		else left = 20;
		left = (this.level-1) * 20;
		var leftIcon = left + 18;
		var leftCaption= left + 38;
	    var width = this.childLength - 5;
		var widthCapt = width - leftCaption;
		this.leftFrame = leftCaption;
	    canvas.style.position = "relative";
	    canvas.style.width = width;
	    canvas.style.height = "auto";
	    canvas.style.left = 0;
	    canvas.style.top = 0;
//	canvas.style.background= "#d9d7c6";
		canvas.style.background= "url(icon/"+system.getThemes()+"/treebg.png)";

	    var html =  "<div style='{cursor: pointer; position : relative; left: 0; top: 0; width: 100%; height: 20;}' " +
	                    "onMouseDown='system.getResource(" + this.resourceId + ").eventMouseDown(event);' " +
						"onMouseMove='system.getResource(" + this.resourceId + ").eventMouseMove(event);' " +
	                    "onDblClick='system.getResource(" + this.resourceId + ").eventDblClick(event);' " +
	                    ">" +
	                    "<div id='" + n + "_collapse' style='{display: none;position : absolute; left: "+left+"; top: 2; width: 16; height: 16;background: url(image/themes/"+system.getThemes()+"/treeCollapse1.png) top left no-repeat;}' " +
	                        "onMouseDown='system.getResource(" + this.resourceId + ").eventCollapeMouseDown(event);' " +
	                    "></div>" +										//18
	                    "<div id='" + n + "_icon' style='{position : absolute; left: "+leftIcon+"; top: 0; width: 16; height: 16;background: url(image/themes/"+system.getThemes()+"/treeNode.png) top left no-repeat;}'></div>" +			//38
	                    "<div id='" + n + "_caption' style='{position : absolute; left: "+leftCaption+"; top: 2; width: auto; height: 16;}'>&nbsp;Tree Item&nbsp;</div>" +											//38
	                    "<div id='" + n + "_frame' style='{position : absolute; left: "+leftCaption+"; top: 2; width: "+widthCapt+"; height: 100%;background: url(images/transparent.png) top left;}' " +
	                        "onMouseUp='system.getResource(" + this.resourceId + ").eventMouseUp(event);' " +
	                        "></div>" +
	                "</div>" +
	                "<div id='" + n + "form' style='{display: none;position : relative; left: 0; top: 0; width: "+width+"; height: auto;}'></div>";
	    this.setInnerHTML(html, canvas);
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			var node = $(this.getFullId() + "_collapse");
			var node2 = $(this.getFullId() + "_icon");
	        DD_belatedPNG.fixPng(node),DD_belatedPNG.fixPng(node2);			
		}
	},
	addChild: function(child){
	    if (child instanceof portalui_treeNode)
	    {
	        window.app_builder_component_controls_treeNode.prototype.parent.addChild.call(this, child);
	        
	        var node = $(this.getFullId() + "_collapse");
	        if (node != undefined)
	            node.style.display = "";						
			node = $(this.getFullId() + "_icon");

	    	if ((node != undefined) && (!this.isExpanded()))
	        	node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";			
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
				DD_belatedPNG.fixPng(node);
			}
	    }
	},
	delChild: function(child){
	    if (child instanceof portalui_treeNode)
	    {
	        window.app_builder_component_controls_treeNode.prototype.parent.delChild.call(this, child);
	        var node = $(this.getFullId() + "_collapse");        			
	        if (node != undefined)
			{
				if (this.childs.getLength() == 0)		
					node.style.display = "none";
				else 
					node.style.display = "";			
			}
			node = $(this.getFullId() + "_icon");

	    	if ((node != undefined) && (!this.isExpanded()))
			{
				if (this.childs.getLength() == 0)		
					node.style.background = "url(image/themes/"+system.getThemes()+"/treeNode.png) top left no-repeat";
				else 
					node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";
			}
	    }
	},
	expand: function(){	
	    var node = $(this.getFullId() + "form");    
		if (node != undefined)	
	        node.style.display = "";	
	    node = $(this.getFullId() + "_collapse");
	    if (node != undefined)
	        node.style.backgroundPosition = "bottom left";
		if (this.isXML && !this.childHasCreated){
			this.childHasCreated = true;
			var nodeTr, node = this.xmlNode.firstChild;
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
		}
		if (node != undefined)
		{
	        node.style.display = "";
			var tree = this.getTreeView();
			var maxLevel = tree.getMaxExpandLevel(tree);
			tree.updateCanvas(tree);		
		}
	},
	collapse: function(){
	    var node = $(this.getFullId() + "form");

	    if (node != undefined)
		{
	        node.style.display = "none";
			var canvas = this.getContainer();
			if (canvas != undefined)
				canvas.style.background = "url(icon/"+system.getThemes()+"/treeCol.png)";
			//get owner
			var tree = this.getTreeView();
			var maxLevel = tree.getMaxExpandLevel(tree);
			tree.updateCanvas(tree);
		}
	    node = $(this.getFullId() + "_collapse");

	    if (node != undefined)
	        node.style.backgroundPosition = "top left";
	},
	doDeselect: function(sender){
	    var node = $(this.getFullId() + "_caption");
	    if (node != undefined){
	        node.style.backgroundColor = "";						
			node.style.color = system.getConfig("text.normalColor"); 
	    }
	    node = $(this.getFullId() + "_icon");
	    if ((node != undefined) && (!this.isExpanded()))
	        node.style.backgroundPosition = "top left";
	},
	doSelect: function(){
		try{			
			var tree = this.getTreeView();				
			if (tree != undefined && tree instanceof portalui_treeView)
		        tree.doSelectItem(this);			
			var node = $(this.getFullId() + "_caption");
		    if (node != undefined){				
				node.style.backgroundColor = system.getConfig("text.highlightBgColor");
				node.style.color = system.getConfig("text.highlightColor");				
		    }
		    node = $(this.getFullId() + "_icon");
		    if (node != undefined)
		        node.style.backgroundPosition = "bottom left";
		    this.onSelect.call(this);
		}catch(e){
			systemAPI.alert("treeNode:doSelect:"+e);
		}
	},
	eventMouseDown: function(event){
	    try{
			//var tree = this.getTreeView();
			//if (tree.popup.menuForm.visible)
			//	tree.popup.menuForm.setVisible(false);	   	
			this.doSelect();
			this.clicked = true;
			this.isRightClick = system.getButton(event) == 2;
			if (this.isRightClick){			
				//tree.popup.popUp(event.clientX, event.clientY, 0);
			}
		}catch(e){
			alert(e);
		}
	},
	eventMouseUp: function(event){
		if (this.clicked)
		{
			/*
			var tree = this.getTreeView();		
			var selNode = tree.getSelectedItem();
			if ((selNode.getKode() != this.getKode())) //favorite(this.getKode() == '99999') && 
			{			
				if (selNode.owner instanceof portalui_treeNode)
					if (selNode.owner.getKode() != this.getKode()) 
					{												   
						var kode = selNode.getKode();
						var capt = selNode.getCaption();
						var kodeForm = selNode.getKodeForm();
						var node = new portalui_treeNode(this);
						node.setKode(kode);
						node.setCaption(capt);
						node.setKodeForm(kodeForm);
					}
			}
			*/
			this.clicked = false;
		}
	    var target = (document.all) ? event.srcElement : event.target;

	    var n = this.getFullId();
		
	    if ((target != undefined) && (target.id == (n + "_frame")))
	        window.app_builder_component_controls_treeNode.prototype.parent.eventMouseUp.call(this, event);		
	},
	eventMouseMove: function(event){
	    var target = (document.all) ? event.srcElement : event.target;

	    var n = this.getFullId();
		if (this.hint != undefined)
			system.showHint(event.clientX + 10, event.clientY + 10,this.hint);
	    if ((target != undefined) && (target.id == (n + "_frame")))
	        window.app_builder_component_controls_treeNode.prototype.parent.eventMouseUp.call(this, event);
		if (this.clicked)
		{
			var x = event.clientX;
			var y = event.clientY;		
		}	
	},
	eventDblClick: function(event){
		if (this.isHasChild() || (this.isXML && this.xmlNode.firstChild.nodeValue != "-"))
		{
		   if (this.isExpanded())
			   this.collapse();
		   else
			   this.expand();
		}
		var tree = this.getTreeView();
	    tree.onDblClick.call(this, tree);
	},
	eventCollapeMouseDown: function(sender){
	    if (this.isExpanded())
	        this.collapse();
	    else
	        this.expand();
	},
	isExpanded: function(){
	    var result = false;
	    var node = $(this.getFullId() + "form");
	    if (node != undefined)
	        result = (node.style.display != "none");
	    return result;
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){
	    if (this.caption != data)
	    {
			var kode = this.getKodeForm();
			
	        this.caption = data;
	 		if (kode != "-" )		
				data =  kode + " - " +data;
	        var node = $(this.getFullId() + "_caption");
			if (node != undefined)
	            node.innerHTML = "<nobr>&nbsp;" + data + "&nbsp;</nobr>";
	        
			var width = (data.length * 6) + this.leftFrame;			
			var tree = this.getTreeView();	
			if (width > tree.getWidth())
			{
			//	tree.setWidth(width);
			}
	    }
	},
	getIcon: function(){
	    if (this.icon == undefined)
	        return "image/themes/"+system.getThemes()+"/treeFolder.png";
	    else
	        return this.icon;
	},
	setIcon: function(data){
	    if (data != this.icon)
	    {
	        this.icon = data;
	        var fileName = this.icon; // to do
	        
	        var node = $(this.getFullId() + "_icon");

	        if (node != undefined)
	            node.style.backgroundImage = "url(" + fileName + ")";
	    }
	},
	getTree: function(){
	    var result = this.getTreeView();
	    return result;
	},
	setLevel: function(data){
		this.level = data;	
	},
	getLevel: function(){
		return this.level;
	},
	setColor: function(data){
		this.color = data;
		var canvas = this.getContainer();
		if (canvas != undefined)
		{
			canvas.style.background = data;
		}
	},
	getColor: function(){
		return this.color;
	},
	getTreeView: function(){
		var parent = this.owner;
		
		while (parent instanceof portalui_treeNode)	
			parent = parent.owner;	
		return parent;
	},
	setKodeForm: function(data){
		this.kodeForm = data;
	},
	getKodeForm: function(){
		return this.kodeForm;
	},
	setKode: function(data){
		this.kode = data;
	},
	getKode: function(){
		return this.kode;
	},
	setShowKode: function(data){
		this.showKode = data;
		if (data)
	    {
			var kode = this.getKodeForm();	
	 		if (kode != "-" )		
				data =  this.getKode() +" - " + kode + " - " +this.caption;
			else data = this.getKode() +" - " +this.caption;
	        var node = $(this.getFullId() + "_caption");
			if (node != undefined)
	            node.innerHTML = "<nobr>&nbsp;" + data + "&nbsp;</nobr>";       		
	    }
	},
	setData: function(data){
		this.data = data;
	},
	getData: function(){
		return this.data;	
	},
	setData2: function(data){
		this.data2 = data;
	},
	getData2: function(){
		return this.data2;
	},
	clearChild: function(){
		for (var i in this.childs.objList)
		{
			child = window.system.getResource(this.childs.objList[i]);
			if(child != undefined)
				child.free();		
		}
		var node = $(this.getFullId() + "_collapse");

		if (node != undefined)
			node.style.display = "none";
		this.childs.clear();
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
	setXMLNode: function(node){
		//for (var i in node) alert(i + " " +node[i]);
		//alert(node.cloneNode);
		this.xmlNode = node.cloneNode(true);	
		this.isXML = true;    
		this.childHasCreated = false;
		if (node.firstChild.nodeValue != "-"){
			var node = $(this.getFullId() + "_collapse");
			if (node != undefined)
				node.style.display = "";					
			node = $(this.getFullId() + "_icon");

			if ((node != undefined) && (!this.isExpanded()))
				node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";
		}
	}
});