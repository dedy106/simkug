//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_treeNode = function(owner,options){
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
		window.portalui_treeNode.prototype.parent.constructor.call(this, owner,options);        		
		this.className = "portalui_treeNode";
        this.caption = "Tree Item";        
        this.icon = undefined;
        this.onSelect = new portalui_eventHandler();
        this.kode = undefined;
		this.kodeForm = undefined;
		
		this.color = "#eeeeee";
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
		this.dbLib = this.app._dbLib;
		if (this.dbLib) this.dbLib.addListener(this);
		if (options !== undefined){
			if (options.caption !== undefined) this.setCaption(options.caption);
			if (options.color !== undefined) this.setColor(options.color);
			if (options.kode !== undefined) this.setKode(options.kode);
			if (options.kodeForm !== undefined) this.setKodeForm(options.kodeForm);
			if (options.data !== undefined) this.setData(options.data);
			if (options.icon !== undefined) this.setIcon(options.icon);
			if (options.iconWidth !== undefined) this.setIconWidth(options.iconWidth);
		}
    }
};
window.portalui_treeNode.extend(window.portalui_containerControl);
window.treeNode = window.portalui_treeNode;
window.portalui_treeNode.implement({
	doDraw : function(canvas){
	    var n = this.getFullId();
		var left = 0;
		var tree = this.getTreeView();
		if (this.level == 1)
			left = 0;
		else left = 20;
		left = (this.level-1) * 20;
		var leftIcon = left + 18;
		var leftCaption= left + 38;
	    var width = this.childLength;
		var widthCapt = width - leftCaption;
		this.leftFrame = leftCaption;
		var rightIconLeft = width - 25;
	    canvas.style.position = "relative";
	    canvas.style.width = width;
	    canvas.style.height = "auto";
	    canvas.style.left = 0;
	    canvas.style.top = 0;
	    //canvas.style.background = "#eee";
		//if (tree.styled) canvas.style.background= "url(icon/"+system.getThemes()+"/treebg.png)";
		
	    var html =  "<div id='"+ n +"_header' style='cursor: pointer; position : relative; left: 0; top: 0; width: 100%; height: 20;border-bottom:1px solid #ccc' " +
	                    "onMouseDown='$$(" + this.resourceId + ").eventMouseDown(event);' " +
						"onMouseMove='$$(" + this.resourceId + ").eventMouseMove(event);' " +
	                    "onDblClick='$$(" + this.resourceId + ").eventDblClick(event);' " +
	                    "onClick='$$(" + this.resourceId + ").eventClick(event);' " +
	                    ">" +
	                    "<div id='" + n + "_collapse' style='{display: none;position : absolute; left: "+left+"; top: 2; width: 16; height: 16;background: url(image/themes/"+system.getThemes()+"/treeCollapse1.png) top left no-repeat;}' " +
	                        "onMouseDown='$$(" + this.resourceId + ").eventCollapeMouseDown(event);' " +
	                    "></div>" +										//18
	                    "<div id='" + n + "_icon' style='{position : absolute; left: "+leftIcon+"; top: 0; width: 16; height: 16;background: transparent;}'></div>" +			//38
	                    "<div id='" + n + "_caption' style='{position : absolute; left: "+leftCaption+"; top: 2; width: auto; height: 16;}'>&nbsp;Tree Item&nbsp;</div>" +											//38
	                    "<img id='" + n + "_ricon' style='{display:;position : absolute; left: "+rightIconLeft+"; top: 3; width: 14; height: 14;' src= 'icon/"+system.getThemes()+"/right-arrow.png' />" +			//38
	                    
	                    "<div id='" + n + "_frame' style='{position : absolute; left: "+leftCaption+"; top: 2; width: "+widthCapt+"; height: 100%;background: url(images/transparent.png) top left;}' " +
	                        "onMouseUp='$$(" + this.resourceId + ").eventMouseUp(event);' " +
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
	        window.portalui_treeNode.prototype.parent.addChild.call(this, child);
	        
	        var node = $(this.getFullId() + "_collapse");
	        if (node != undefined)
	            node.style.display = "";						
			node = $(this.getFullId() + "_icon");

	    	if ((node != undefined) && (!this.isExpanded()))
	        	node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";			
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
				DD_belatedPNG.fixPng(node);
			}
			node = $(this.getFullId() + "_ricon");
			node.style.display = "none";
	    }
	},
	delChild: function(child){
	    if (child instanceof portalui_treeNode)
	    {
	        window.portalui_treeNode.prototype.parent.delChild.call(this, child);
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
					node.style.background = "transparent";//transparent
				else 
					node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";
			}
			node = $(this.getFullId() + "_ricon");
			
	    	if (this.childs.getLength() == 0)		
				node.style.display = "";
			else 
				node.style.display = "none";
			
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
            var tree = this.getTreeView();
			var canvas = this.getCanvas();
			//if (canvas != undefined && tree.styled)
			//	canvas.style.background = "url(icon/"+system.getThemes()+"/treeCol.png)";
			//get owner
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
			var tree = this.getTreeView();
			//if (tree.popup.menuForm.visible)
			//	tree.popup.menuForm.setVisible(false);	   	
			tree.owner.setActiveControl(tree);
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
	        window.portalui_treeNode.prototype.parent.eventMouseUp.call(this, event);		
	},
	eventMouseMove: function(event){
	    var target = (document.all) ? event.srcElement : event.target;

	    var n = this.getFullId();
		if (this.hint != undefined)
			system.showHint(event.clientX + 10, event.clientY + 10,this.hint);
	    if ((target != undefined) && (target.id == (n + "_frame")))
	        window.portalui_treeNode.prototype.parent.eventMouseUp.call(this, event);
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
	eventClick: function(event){
		if (this.isHasChild() || (this.isXML && this.xmlNode.firstChild.nodeValue != "-"))
		{
		   if (this.isExpanded())
			   this.collapse();
		   else
			   this.expand();
		}
		var tree = this.getTreeView();
	    tree.onClick.call(this, tree);
	},
	eventCollapeMouseDown: function(sender){
	   /* if (this.isExpanded())
	        this.collapse();
	    else
	        this.expand();*/
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
	 		if (kode != "-" && kode !== undefined)		
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
		var canvas = this.getCanvas();
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
			child = $$(this.childs.objList[i]);
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
			child = $$(this.childs.get(i));
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
		$(this.getFullId() + "_header").style.background = "#fff";
		if (node.firstChild.nodeValue != "-"){
			var node = $(this.getFullId() + "_collapse");
			if (node != undefined)
				node.style.display = "";					
			node = $(this.getFullId() + "_icon");

			if ((node != undefined) && (!this.isExpanded()))
				node.style.background = "url(image/themes/"+system.getThemes()+"/treeFolder1.png) top left no-repeat";
			$(this.getFullId() + "_header").style.background = "#eee";
			node = $(this.getFullId() + "_ricon");
			node.style.display = "none";
		}
	},
	setIconWidth: function(data){
		if (this.level == 1)
			var left = 0;
		else var left = 20;
		left = (this.level-1) * 20;
		var leftIcon = left + 18;
		var leftCaption= leftIcon + data;
	    var width = this.childLength - 5;
		var widthCapt = width - leftCaption;		
		var node = $(this.getFullId() + "_icon");
		if (node != undefined){
			node.style.width = leftIcon;
			node = $(this.getFullId() + "_caption");
			if (node != undefined){
				node.style.left = leftCaption;
				node.style.width = widthCapt;
			}
		}	
	},
	isLastChild: function(){
	   return (this.owner.childs.getLength() == this.childIndex);
    },
    isFirstChild: function(){
	   return (this.childIndex == 1);
    },
    free: function(){
		if (this.dbLib != undefined) this.dbLib.delListener(this);
		window.portalui_treeNode.prototype.parent.free.call(this);	
	},
	doRequestReady: function(sender, methodName, result, callObj){
		try{				
			if (sender == this.dbLib && this == callObj){						
				switch (methodName){
					case "getDataProvider" :														
                        eval('result = ' + result +';');                        
						if (typeof(result) !== "string"){	
						}
					break
				}
			}
		}catch(e){
		}
	}
});
