//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_fileExplorer = function(owner, options){	
    if (owner){
		try{
			this.className = "portalui_fileExplorer";
	        window.app_builder_component_controls_fileExplorer.prototype.parent.constructor.call(this, owner, options);        
	        
	        this.selectedItem = undefined;
			this.maxExpandLevel = 0;		        
			this.childLength = 300;
	        this.onSelect = new portalui_eventHandler();
			this.onDblClick = new portalui_eventHandler();						
			this.tabStop = true;			
			this.folder = "";			
			this.file = new util_file();										
			this.file.addListener(this);
			this.rootDir = this.file.getRootDir();	
			this.separator = this.rootDir.charAt(this.rootDir.length-1);			
			this.rootDir = this.rootDir.substr(0,this.rootDir.length-2);
			this.rootDir = this.rootDir.substr(0,this.rootDir.lastIndexOf(this.separator));						
			this.onAfterEdit = new portalui_eventHandler();
			this.onDataReady = new portalui_eventHandler();
			uses("portalui_fileExplorerItem",true);
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.childLength !== undefined) this.setChildLength(options.childLength);
				if (options.path !== undefined) this.setPath(options.path);
			}
			this.addProperty({className:this.className,childLength:this.childLength, path:this.folder});	
			this.addEvent({afterEdit:"",dataReady:"", select:"",dblClick:""});
		}catch(e){
			alert("treeView" + e);
		}
    }
};
window.app_builder_component_controls_fileExplorer.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_fileExplorer.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.background = "#ffffff";//"#d9d7c6";
	    canvas.style.overflow = "hidden";
	    if (document.all)
	        html =  "<div id='" + n + "_border1' style='{position: absolute;left: 1;top: 1;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.inner.left") + ";border-top: " + window.system.getConfig("3dborder.inner.top") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.inner.right") + ";border-bottom: " + window.system.getConfig("3dborder.inner.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border3' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.left") + ";border-top: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
	                "<div id='" + n + "_border4' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.right") + ";border-bottom: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
					
	                "<div id='" + n + "_frame' style='{position : relative; left: 0; top: 2; width: 100%; height: 100%;overflow: auto;}'>" +
	                    "<div id='" + n + "form' style='{position : relative; left: 2; top: 0; width: 100%; height: 100%;overflow: visible;}'></div>" +
	                "</div>"+
					"<div id='"+ n +"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left: 50%;top: 40%;width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
	    else
	        html =  
					"<div id='" + n + "_border1' style='{position: absolute;left: 1;top: 1;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.inner.left") + ";border-top: " + window.system.getConfig("3dborder.inner.top") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -2;top: -2;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.inner.right") + ";border-bottom: " + window.system.getConfig("3dborder.inner.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border3' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.left") + ";border-top: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
	                "<div id='" + n + "_border4' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.right") + ";border-bottom: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_frame' style='{position : relative; left: 1; top: 2; width: 100%; height: 100%;overflow: auto;}'>" +                	
						"<div id='" + n + "form' style='{position : relative; left: 2; top: 0; width: 100%; height: 100%;overflow: visible;}'></div>" +
	                "</div>"+
					"<div id='"+ n +"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left: 40%;top: 40%;width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
	    this.setInnerHTML(html, canvas);
		this.block = $(n+"_block");
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
		for (var i in this.childs.objList){
			child = window.system.getResource(this.childs.get(i));
			if(child != undefined){
				ix++;
				child.childIndex = ix;
			}
		}	
	},
	clear: function(){
		var child;
		for (var i in this.childs.objList){
			child = window.system.getResource(this.childs.objList[i]);
			if(child != undefined)
				child.free();		
		}
		this.childs.clear();
	},
	doSelectItem: function(item){
	    var oldSelected = window.system.getResource(this.selectedItem);    
	    if (oldSelected instanceof app_builder_component_controls_fileExplorerItem)	
	        oldSelected.doDeselect();	

	    if (item instanceof app_builder_component_controls_fileExplorerItem)
	    {
	        this.selectedItem = item.getResourceId();
	        
	        this.onSelect.call(this, item);
	    }
	    else
	        this.selectedItem = undefined;
	},
	getSelectedItem: function(){
		return window.system.getResource(this.selectedItem);
	},
	setWidth: function(data){
		try{
		    window.app_builder_component_controls_fileExplorer.prototype.parent.setWidth.call(this, data);

		    var frame = $(this.getFullId() + "_frame");
		    frame.style.width = data - 3;				
		}catch(e){
			alert(e);
		}
	},
	setHeight: function(data){
	    window.app_builder_component_controls_fileExplorer.prototype.parent.setHeight.call(this, data);

	    var frame = $(this.getFullId() + "_frame");
	    frame.style.height = data - 4;
	},
	getMaxExpandLevel: function(node){
		var child = undefined;
		if (node instanceof app_builder_component_controls_fileExplorer)
			this.maxExpandLevel = 0;
		for (var i in node.childs.objList){
			child = window.system.getResource(node.childs.objList[i]);
			if (child instanceof window.app_builder_component_controls_fileExplorerItem)
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
		for (var i in node.childs.objList){
			child = window.system.getResource(node.childs.objList[i]);
			childCanvas = child.getCanvas();				
			if (j == 0)
			{
			    if (childCanvas.style.borderTop == window.system.getConfig("3dborder.inner.top")) 
					childCanvas.style.borderTop = window.system.getConfig("3dborder.inner.bottom");
				else childCanvas.style.borderTop = window.system.getConfig("3dborder.inner.top");
			}
			j++;
			if (child instanceof window.app_builder_component_controls_fileExplorerItem)
			{
				if (child.isExpanded())				
				{												
					this.updateCanvas(child);	
				}else
				{								
				}
			}
		}		
	},
	updateWidth: function(node){
		var child = undefined;
		for (var i in node.childs.objList){
			child = window.system.getResource(node.childs.objList[i]);
			childCanvas = $(child.getFullId());					
			if (childCanvas != undefined)
				child.doDraw(childCanvas);
			this.updateWidth(child);				
		}	
	},
	doKeyDown: function(charCode, buttonState, keyCode){
	},
	getUsrRoot: function(usr){
		this.user = usr;
		this.userRoot = this.rootDir +this.separator+"document"+this.separator+"usr"+this.separator+usr;
		return this.userRoot;	
	},
	getRootFolder: function(){
		return this.rootDir;	
	},
	refresh: function(data){
		this.setPath(this.folder);
	},
	setPath: function(data){
		try{
			this.showLoading();
			this.clear();				
			this.folder = data;	
			this.setProperty("path",data);
			this.root = new app_builder_component_controls_fileExplorerItem(this);
			this.root.setCaption("["+this.user+"]");				
			this.root.setSeparator(this.separator);
			this.root.setFolderName(this.user);
			this.root.setPath(this.folder);
			this.root.iconElm.style.background = "url("+this.root.folderIcon+") top left no-repeat";
			this.root.exploreChild();							
			
			this.file.setFilename(this.folder+this.separator);	
			//var fold = this.file.listFolder(this.folder+this.separator);			
			//this.file.listFolderA(this.folder+this.separator);			
			this.hideLoading();
		}catch(e){
			this.hideLoading();
			if (systemAPI != undefined)
				systemAPI.alert(e,"");
			else alert(e);
		}
	},
	editItem: function(){
		var selected = window.system.getResource(this.selectedItem);
		selected.editItem();	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.file){
			switch(methodName){
				case "listFolder": 
					var fold = result;
					if (fold == undefined) return false;
					if (fold.search(";") == -1)return false;		
					this.usrFolder = fold.split(";");
					var node, file,tipe;
					
					for (var i in this.usrFolder){			
						file = this.usrFolder[i];
						tipe = file.substr(file.lastIndexOf("_")+1);
						file = file.substr(0,file.lastIndexOf("_"));
						file = trim(file);			
						if (file != "" && file != "." && file != ".." && file != ".svn"){				
							if (tipe == "d") {
								node = new app_builder_component_controls_fileExplorerItem(this.root);
								node.setCaption(file);				
								node.setSeparator(this.separator);
								node.setFolderName(file);
								node.setPath(this.folder+this.separator+file);
								node.iconElm.style.background = "url("+node.folderIcon+") top left no-repeat";
								node.exploreChild();					
							}
						}
					}		
					break;			
			}
		}
	},
	showLoading: function(){
		this.block.style.display = "";
	},
	hideLoading: function(){
		this.block.style.display = "none";
	},
	setChildLength: function(data){
		this.childLength= data;
		this.setProperty("childLength",data);
	}
});