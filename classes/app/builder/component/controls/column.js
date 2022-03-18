//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_column = function(owner, index,options){
	if (owner){
		try{			
			this.title = "column";
			this.internalIndex = index;
			this.sortEnabled = false;		
			this.formatAlign = alLeft;
			this.hideColumn = false;
			this.headerCanvas = undefined;
			this.width = 80;
			this.left = index * 80;
			window.app_builder_component_controls_column.prototype.parent.constructor.call(this, owner,options);						
			this.className = "portalui_column";
			this.owner = owner;	
			this.mouseClick = false;
			this.cells = new portalui_arrayMap();
			this.readOnly = false;				
			this.EditedValue = "";
			this.buttonStyle = bsNone;
			this.pickList = new portalui_arrayMap();
			this.selCellIdx = 0;	//selected row 
			this.selectedId = 0;	//selected row in picklist
			this.Focused = false;
			this.fixedCol = false;
			this.columnFormat = cfText;
			
			var dt = new Date();
			this.day = dt.getDate();
	        this.month = dt.getMonth() + 1;
	        this.year = dt.getFullYear();
			this.oldWidth = this.width;
			this.color = system.getConfig("app.color.gridText");
			this.diffX = 0;
			this.sortOrder = "asc";				
			if (options !== undefined){
				this.updateByOptions(options);
			}
			this.addProperty({className:this.className,color:this.color, columnFormat:this.columnFormat, sortOrder:this.sortOrder,buttonStyle:bsNone, title:"column",readOnly:false});	
			this.addEvent({});
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_builder_component_controls_column.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_column.implement({
	doDraw: function(canvas){
		try{			
			var n = this.getFullId();
			var headerCanvas = $(this.owner.getFullId()+"_header");		
			canvas.style.height = 20;
			canvas.style.top = 0;
			var lft = 0;
			if (this.width > 0)
			 lft = this.width - 1;
			var html = "<div id='"+n+"_colCel' style='{position: absolute; top:0;width:"+lft+"; height: 100%;}'></div>";
			canvas.innerHTML = html;				
			if (this.headerCanvas != undefined)
				headerCanvas.removeChild(this.headerCanvas);
			this.headerCanvas = document.createElement("div");
			var node = this.headerCanvas;
			node.id = n+"_colHead";
			
			node.style.background = "url(icon/"+system.getThemes()+"/colHeader.png) 0 0 repeat-x";
			node.style.height = "20px";

			node.style.position = "absolute";
			if (this.mouseClick)
				var cursor = "col-resize";
			else var cursor = "pointer";
			node.style.left = this.getLeft();
			node.style.width = this.width;	
			if (this.hideColumn) node.style.display = "none";
			
			var html = "<div id='"+n+"_coleft' style='{position:absolute; left:0; height:20px; width:1px;"+
						"	background:url(icon/"+system.getThemes()+"/colLeftHeader.png) top left no-repeat;}'></div>"+
						"<div id='"+n+"_coright' style='{position:absolute; left: 100%;height:20px; width:1px;"+
						"	background:url(icon/"+system.getThemes()+"/colRightHeader.png) top right no-repeat; cursor:pointer}' >"+				
						"</div>"+
						"<div id='"+n+"_sort' style='{position:absolute;top:2;left:2;display:none;width:11;height:10; background:url(image/themes/"+system.getThemes()+"/down.png) no-repeat}'></div>"+
						"<div id='"+n+"_column' style='{overflow:hidden;position:absolute; top: 2; height : 100%; width:100%;cursor:"+cursor+";color:"+system.getConfig("font.grid.fontColor")+";}' "+
						" align='center' "+
						"onMouseOver='window.system.getResource("+this.resourceId+").eventMouseOver(event,"+this.internalIndex+",-1)' "+
						"onMouseOut='window.system.getResource("+this.resourceId+").eventMouseOut(event)' "+
						"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)'"+
						"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+	
						">"+this.title+"</div>";
			this.setInnerHTML(html, node);
			this.headerCanvas = node;			
			headerCanvas.appendChild(node);	
			this.setSortEnabled(this.sortEnabled);				
		}catch(e){
			alert(e);
		}
	},
	setTitle: function(data){
		this.title = data;
		this.setProperty("title",data);
		var canvas = $(this.getFullId()+"_column");
		if (canvas != undefined)
			canvas.innerHTML = data;
	},
	getTitle: function(){
		return this.title;
	},
	setIndex: function(index){
		this.internalIndex = index;
	},
	getIndex: function(){
		return this.internalIndex;
	},
	setPicklist: function(items){
		this.pickList = items;
	},
	getPicklist: function(){
		return this.pickList;
	},
	eventMouseOver: function(event, internalIdx, CellIdx){
		if (CellIdx == -1){
			var canvas = $(this.getFullId()+"_colHead");
			canvas.style.backgroundPosition = "0 -21";    
		}else{
			if (this.readOnly){}
		}
	},
	eventMouseOut: function(event){	    
	    var canvas = $(this.getFullId()+"_colHead");	    
	    canvas.style.backgroundPosition = "0 0";
	},
	eventMouseDown: function(event){
		if (!this.mouseClick){
			this.mouseClick = true;	
			this.mouseX = event.clientX;
			var obj = $(this.getFullId()+"_column");
			obj.style.cursor = "col-resize";
		}	
	},
	eventMouseMove: function(event){
		if (this.mouseClick){		
			var x = event.clientX;	
			this.oldWidth = this.width; 
			this.diffX = (x - this.mouseX);
			var newWidth = this.width + this.diffX;
			this.setWidth(newWidth);
			var canvas = this.getContainer();	
			this.doDraw(canvas);
			//this.headerCanvas.style.width = newWidth;
			//this.headerCanvas.style.left = this.getLeft();
			this.mouseX = x;		
		}
	},
	eventMouseUp: function(event){
		try{
			this.mouseClick = false;
			this.owner.rearrange(this.internalIndex);
			this.refreshCells();
			var obj = $(this.getFullId()+"_column");
				obj.style.cursor = "pointer";
			if (this.sortEnabled)
				this.sort();
		}catch(e){
			systemAPI.alert("[app_builder_component_controls_column]:eventMouseUp:"+e);
		}
	},
	refreshCells: function(){
		try{	
			var step = "get rows";
			for (var i = 0; i < this.owner.rows.getLength();i++){
				step = "get rows obj";
				obj= this.owner.rows.get(i);
				if (obj != undefined){
					step = "get obj width "+this.diffX;
					var width = obj.getWidth() + this.diffX;//(this.width - this.oldWidth);
					step = "s obj width "+width +" "+this.diffX;				
					obj.setWidth(width);
					step = "refresh row "+this.internalIndex;
					obj.refreshRow(this.internalIndex);
				}
			}
		}catch(e){
			systemAPI.alert("[app_builder_component_controls_column]::refreshCell:"+e+"\r\n"+step);
		}
	},
	setButtonStyle: function(data){
		this.buttonStyle = data;
		this.setProperty("buttonStyle",data);
		if (this.buttonStyle == bsDate)
			this.columnFormat = cfDate;
	},
	setColumnFormat: function(data){
		this.columnFormat = data;
		this.setProperty("columnFormat",data);
		if (this.columnFormat == cfDate)
			this.buttonStyle = cfDate;
		this.refreshCells();
	},
	setFixedCol: function(data){
		this.fixedCol = data;
		this.readOnly = data;
		for (var i = 0; i < this.owner.rows.getLength(); i++){
			var row = this.owner.rows.get(i);
			var value = i+1;		
			var len = this.internalIndex + 1;
			var node = $(row.getFullId() + "_cellValue"+this.internalIndex);
			var cell = $(row.getFullId()+"_cell"+len);
			cell.removeChild(node);
			if (cell != null){
				var html = "<div id='"+row.getFullId()+"_cellValue"+this.internalIndex+"' "+
								" style='{position:absolute;left:0; top:0; height:100%; width:100%;}' "+
								" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+this.internalIndex+")' "+
								
								" align='center' >"+value+"</div>";				
				cell.style.background = this.owner.fixColor;
				this.setInnerHTML(html, cell);
			}
		}
	},
	setColWidth: function(newWidth){
		try{
			this.setProperty("colWidth",newWidth);
			this.setWidth(newWidth);			
			this.headerCanvas.style.width = newWidth;
			this.headerCanvas.style.left = this.getLeft();
			this.owner.rearrange(this.internalIndex);
			this.refreshCells();
			this.setSortEnabled(this.sortEnabled);
		}catch(e){
			alert("[app_builder_component_controls_column]::setColWidth:"+e);
		}
	},
	setReadOnly: function(data){
		this.readOnly = data;
		this.setProperty("readOnly",data);		
	},
	setColor: function(data){
		this.color = data;
		this.setProperty("color",data);
		var row = undefined;
		var input = undefined;
		for (var i in this.owner.rows.objList){
			
			row = this.owner.rows.get(i);
			input = $(row.getFullId()+"cell"+this.internalIndex+"_input");
			if (input != undefined)
				input.style.background = this.color;
		}
	},
	getColor: function(){
		return this.color;
	},
	setSortEnabled: function(data){
		try{
			this.sortEnabled = data;
			var sortCnv = $(this.getFullId()+"_sort");
			if (this.sortEnabled && sortCnv != undefined)
			{						
				sortCnv.style.display = "";
				sortCnv.style.left = this.width - 13;
			}else  if (sortCnv != undefined) sortCnv.style.display = "none";
		}catch(e){
			alert("column.setSortEnabled."+e);
		}
	},
	sortValue: function(r1, r2){
		try{
			var x = r1; var y = r2;
			var result = ((x < y) ? -1 : ((x > y) ? 1 : 0));				
			return result;
		}catch(e){
			alert("[column]::sortValue:"+e);
		}
	},
	sort: function(){
		try{
			var data = new Array();
			var obj = this.owner.rows.objList;
			var row1 = undefined;
			var row2 = undefined;
			var tmp = new Array();
			this.owner.showLoading();
				
			for (var i = 0; i < (obj.length - 1); i++){
				for (var j = i; j < obj.length;j++){
					row1 = this.owner.rows.get(i);
					row2 = this.owner.rows.get(j);				
					if (this.sortOrder == "asc"){
						if (row1.getCellValue(this.internalIndex).toLowerCase() > row2.getCellValue(this.internalIndex).toLowerCase())
						{					
							for (var k = 0; k < this.owner.columns.getLength();k++)								
								tmp[k] = row1.getCellValue(k);
							for (var k = 0; k < this.owner.columns.getLength();k++)				
								row1.setCellValue(k,row2.getCellValue(k));
							for (var k = 0; k < this.owner.columns.getLength();k++)				
								row2.setCellValue(k,tmp[k]);
							
						}
					}else if (row1.getCellValue(this.internalIndex).toLowerCase() < row2.getCellValue(this.internalIndex).toLowerCase()){					
							for (var k = 0; k < this.owner.columns.getLength();k++)								
								tmp[k] = row1.getCellValue(k);
							for (var k = 0; k < this.owner.columns.getLength();k++)				
								row1.setCellValue(k,row2.getCellValue(k));
							for (var k = 0; k < this.owner.columns.getLength();k++)				
								row2.setCellValue(k,tmp[k]);
						} 
				}
			}
			this.owner.hideLoading();
			var cnv = $(this.getFullId()+"_sort");				
			if (this.sortOrder == "asc"){
				this.sortOrder = "desc";
				if (cnv != undefined)
					cnv.style.background = "url(image/themes/"+system.getThemes()+"/up.png) no-repeat";
			}else {
				this.sortOrder = "asc";
				if (cnv != undefined)
					cnv.style.background = "url(image/themes/"+system.getThemes()+"/down.png) no-repeat";
			}
				
		}catch(e)	{
			alert("[columns]::sort:"+e);
		}
	},
	bubbleSort: function(){
	},
	hide: function(){
		this.hideColumn = true;
		this.oldWidth = this.width;				
		this.setColWidth(0);		
		this.owner.rearrange(0);
		var cnv = $(this.getFullId()+"_colHead");	
		if (cnv != undefined)	cnv.style.display = "none";
		var row;
		for (var i in this.owner.rows.objList){		
			row = this.owner.rows.get(i);
			cnv = $(row.getFullId()+"_cellValue"+this.internalIndex);
			if (cnv != undefined)
				cnv.style.display = "none";
		}
	},
	show: function(){
		this.hideColumn = false;
		this.setColWidth(this.oldWidth);
		var cnv = $(this.getFullId()+"_colHead");	
		if (cnv != undefined)	cnv.style.display = "";
		var row;
		for (var i in this.owner.rows.objList){
			
			row = this.owner.rows.get(i);
			cnv = $(row.getFullId()+"_cellValue"+this.internalIndex);
			if (cnv != undefined)
				cnv.style.display = "";
		}
	}
});
