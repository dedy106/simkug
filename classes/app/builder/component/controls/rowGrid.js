//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_rowGrid = function(owner, index){
	if (owner){
		this.title = "rowGrid";
		this.rowIndex = index;
		window.app_builder_component_controls_rowGrid.prototype.parent.constructor.call(this, owner);	
		this.className = "portalui_rowGrid";
		this.owner = owner;	
		this.mouseClick = false;
		this.readOnly = false;				
		this.EditedValue = "";
		this.buttonStyle = bsNone;
		this.pickList = new portalui_arrayMap();
		this.selectedId = 0;	//selected row in picklist
		this.selected = false;
		this.Focused = false;
		this.fixedCol = false;
		this.cols = new portalui_arrayMap();
		this.color = system.getConfig("text.normalBgColor");		
		var dt = new Date();
		this.day = dt.getDate();
        this.month = dt.getMonth() + 1;
        this.year = dt.getFullYear();
		this.cellsObj = [];
		
		this.onClick = new portalui_eventHandler();
		this.onDblClick = new portalui_eventHandler();
		this.onSelectCell = new portalui_eventHandler();
		this.onEllipsClick = new portalui_eventHandler();	
		this.onChange = new portalui_eventHandler();
		this.values = [];	
	}
};
window.app_builder_component_controls_rowGrid.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_rowGrid.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.height = document.all ? 21 : 19;
		canvas.style.top = 0;
		var lft = this.width - 1;
		
		var html = "<div id='"+n+"_colCel' style='{position: absolute; top:0;width:100%; height: 20%;}'"+	
					"></div>";
		this.setInnerHTML(html, canvas);
		this.colCell = $(n+"_colCel");
	},
	setWidth: function(data){
		window.app_builder_component_controls_rowGrid.prototype.parent.setWidth.call(this,data);
		this.colCell.style.width = data;
	},
	setIndex: function(index){
		this.rowIndex = index;
	},
	getIndex: function(){
		return this.rowIndex;
	},
	setPicklist: function(items){
		this.pickList = items;
	},
	getPicklist: function(){
		return this.pickList;
	},
	keyPress: function(event, index){
	},
	doKeyDown: function(event, index){	
	},
	doChange: function(colId){	
		this.onChange.call(this, colId, this.rowIndex);
	},
	addCell: function(colCount, values){
		var node = this.colCell;
		var value = undefined;
		this.values = values;
		
		var formatAlign = undefined;
		for (var i = 0; i < colCount; i++)
		{
			var colHeader = this.owner.columns.get(i);
			
			if (colHeader.columnFormat == window.cfNilai)
			  formatAlign = "right";
		    else formatAlign = "left";
			if (values != undefined)
				value = values[i];
			else value = "";
			this.cols.set(i, value);
			rowHeight = document.all ? 21 : 19;
			nodeCel = document.createElement("div");
			len = i + 1;
			nodeCel.id = this.getFullId()+"_cell"+len;
			var colIdx = len - 1;
			len = this.rowIndex * rowHeight;
			nodeCel.style.position = "absolute";
			nodeCel.style.overflow = "hidden";
			nodeCel.style.top = 0;
			nodeCel.style.border = window.system.getConfig("3dborder.inner.bottom");
			nodeCel.style.left = colHeader.getLeft();
			if (document.all){				
				nodeCel.style.width = colHeader.getWidth() + 1;				
			}else{							
				nodeCel.style.width = colHeader.getWidth() - 1;				
			}
			nodeCel.style.height = rowHeight;		
			var color = system.getConfig("app.color.gridText");				
			if (colHeader.color == system.getConfig("app.color.gridText"))
				color = colHeader.color;					
			if (this.rowIndex % 2 == 0)
				color = system.getConfig("app.color.gridRowDiff");		
			nodeCel.style.background = color;			
			if (colHeader.fixedCol)
			{
				nodeCel.style.background = colHeader.owner.fixColor;			
				nodeCel.style.borderTop =  window.system.getConfig("3dborder.inner.top");
				nodeCel.style.borderBottom =  window.system.getConfig("3dborder.inner.bottom");
				nodeCel.style.borderLeft =  window.system.getConfig("3dborder.inner.top");
				nodeCel.style.borderRight =  window.system.getConfig("3dborder.inner.bottom");			
				value = "<span align='center' style='position:absolute;left : 2; top : 0; width:auto; height:100%;'>"+value+"</span>";
			}					
			var margin = document.all ? "0px" : "0px";
			nodeCel.style.marginRight = margin;
			nodeCel.innerHTML = "<div id='"+this.getFullId()+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:"+margin+";white-space: nowrap;"+
									" ' "+
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
									" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+this.rowIndex+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+this.rowIndex+","+colIdx+")'; "+	
									" onMouseDown = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+	
									" > "+value+"</div>";			
			node.appendChild(nodeCel);				
			this.cellsObj.push(nodeCel);
		}
	},
	setCellValue: function(index, value){
		try{
			var col = this.owner.columns.get(index);
			var formatAlign= "left";
			if (col != undefined && col.columnFormat == cfNilai){
				formatAlign= "right";
				if (typeof(value) == "string") {			
					if (!isNilai(value)) value = floatToNilai(parseFloat(value));
				}else value = floatToNilai(parseFloat(value));		
			}
			var node = $(this.getFullId()+"_cellValue"+index);						
			if (node !== undefined) node.innerHTML = value;
			this.cols.set(index, value);	
			this.owner.pressKeyDown = false;
			this.values[index] = value;
			this.onChange.call(this, index, this.rowIndex);
		}catch(e){
			systemAPI.alert("rowGrid:"+e+"\r\n"+index+" "+this.rowIndex);
		}
	},
	getCellValue: function(colIndex){
		var node = $(this.getFullId()+"_cellValue"+colIndex);			
		if (document.all)
			var value = node.innerHTML;//this.values[colIndex];
		else
			var value = node.textContent;//this.values[colIndex];
		return trim(value);
	},
	setButtonStyle: function(data){
		this.buttonStyle = data;	
	},
	refreshRow: function(colStart){
		if (this.rowIndex == this.owner.row){
			this.owner.inplaceEdit.style.width = parseInt(this.cellsObj[this.owner.col].style.width) + 2;		
			this.owner.inplaceEdit.style.left = this.cellsObj[this.owner.col].style.left;			
		}
			
		var node = this.colCell;//$(this.getFullId()+"_colCel");
		var colCount = this.owner.columns.getLength();
		
		var combobox = $(this.owner.getFullId()+"_dropDown");
		if ((combobox != null) && (combobox.style.display == ""))
			combobox.style.display = "none";
		var ellips = $(this.owner.getFullId()+"_ellips");
		if ((ellips != null) && (ellips.style.display == ""))
			ellips.style.display = "none";	
		var date = $(this.owner.getFullId()+"_date");
		if ((date != null) && (date.style.display == ""))
		{
			date.style.display = "none";	
			
		}	
		for (var i = colStart; i < colCount; i++)
		{
			var len = i + 1;
			var value = this.values[i];
			this.cols.set(i, value);
			var nodeCel = this.cellsObj[i];//$(this.getFullId()+"_cell"+len);		
			var colIdx = len - 1;
			var colHeader = this.owner.columns.get(i);
			nodeCel.style.left = colHeader.getLeft();			
			nodeCel.style.height = document.all ? "21px" : "19px";
			if (document.all)
			{
				nodeCel.style.left = colHeader.getLeft();
				nodeCel.style.width = colHeader.getWidth() + 1;
			}else
			{
				nodeCel.style.top = 0;
				nodeCel.style.left = colHeader.getLeft() ;
				nodeCel.style.width = colHeader.getWidth() - 1;
			}				
		}	
	},
	showInplaceEdit: function(idx, justSetPos){
		var top = parseInt(this.top);				
		this.owner.inplaceEdit.style.top = top;
		this.owner.inplaceEdit.style.width = (document.all ? parseInt(this.cellsObj[idx].style.width) : parseInt(this.cellsObj[idx].style.width) + 2);
		this.owner.inplaceEdit.style.left = this.cellsObj[idx].style.left;			
		this.owner.inplaceEdit.col = idx;
		this.owner.inplaceEdit.row = this.rowIndex;
		this.owner.inplaceEdit.zIndex = 99999999;
		//if (this.rowIndex == this.owner.rows.getLength() - 1)
			this.owner.inplaceEdit.style.height = document.all ? parseInt(this.cellsObj[idx].style.height) : parseInt(this.cellsObj[idx].style.height) + 2;
		//else this.owner.inplaceEdit.style.height = parseInt(this.cellsObj[idx].style.height) + 2; 
		if (justSetPos == undefined)
			this.owner.inplaceEdit.style.display = "";								
			var colHeader = this.owner.columns.get(idx);		
			if (colHeader.columnFormat == cfNilai){
				this.owner.inplaceEdit.style.textAlign = 'right';
				this.owner.inplaceEdit.value = RemoveTitik(this.getCellValue(idx));
			}else{
				this.owner.inplaceEdit.style.textAlign = 'left';
				this.owner.inplaceEdit.value = this.getCellValue(idx);
			}
		
		if (justSetPos == undefined) this.owner.inplaceEdit.focus();
	},
	eventDoubleClick: function(event, idx){		
		this.onDblClick.call(this, idx, this.rowIndex);
		var colHeader = this.owner.columns.get(idx);	
		if (colHeader != undefined && !colHeader.readOnly && !this.owner.readOnly){
			try{			
				this.showInplaceEdit(idx);
			}catch(e){
				systemAPI.alert(this,e);
			}
		}	
	},
	eventClick: function(event, idx){			
		try{			
			if (this.owner.inplaceEdit.style.display != "")	{
				this.owner.inplaceEdit.col = idx;
				this.owner.inplaceEdit.row = this.rowIndex;
			}
			//this.owner.inplaceEdit.value = this.getCellValue(idx);			
			this.getForm().setActiveControl(this.owner);
			this.onClick.call(this, idx, this.rowIndex);
			this.onSelectCell.call(this, idx, this.rowIndex);
			this.owner.setRowIndex(this.rowIndex, idx);
		}catch(e){
				systemAPI.alert(this,e);
		}		
	},
	eventMouseOver: function(event, idx, colId){		
		if (this.owner.rowSelect){				
			var input = undefined;
			var childNode = this.colCell.firstChild;    
		    while ((childNode != undefined) && (childNode != ""))    	
			{
				input = childNode.firstChild;
				input.style.background = system.getConfig("text.overBgColor");
				childNode = childNode.nextSibling;		
			}
		}else {
			var target = document.all ? event.srcElement : event.target;
			target.style.background = system.getConfig("text.overBgColor");
		}
	},
	eventMouseOut: function(event, idx, colId){	
		var color = undefined;		
		var colHeader = undefined;
		if (this.owner.rowSelect){
			var input;
			var childNode = this.colCell.firstChild;    
		    while ((childNode != undefined) && (childNode != ""))    
			{		
				input = childNode.firstChild;
				colHeader = this.owner.columns.get(i);
				if (input != undefined)
				{
					if (this.selected)
					{
						color = system.getConfig("text.focus");
					}else
					{
						color = system.getConfig("app.color.gridDisabledText");									
						if (this.rowIndex % 2 == 0)
							color = system.getConfig("app.color.gridRowDiff");
					}
					input.style.background = color;		
				}		
				childNode = childNode.nextSibling;
			}
		}else {
			var target = document.all ? event.srcElement : event.target;	
			if (this.selected && colId == this.owner.col)
				var color = system.getConfig("text.focus");
			else
			{
				var color = system.getConfig("app.color.gridDisabledText");									
				if (this.rowIndex % 2 == 0)
					color = system.getConfig("app.color.gridRowDiff");
			}	
			target.style.background = color;	
		}
	},
	setSelected: function(data, col){
		this.selected = data;	
		var color = undefined;	
		var input = undefined;
		if (this.owner.rowSelect){		
			for (var i in this.cellsObj)
			{		
				input = this.cellsObj[i].firstChild;
				colHeader = this.owner.columns.get(i);
				if (this.selected)
				{			
					color = system.getConfig("text.focus");
				}else
				{	
					if (colHeader.readOnly)
					{
						color = system.getConfig("app.color.gridDisabledText");					
					}else
						color = colHeader.color;
					if (this.rowIndex % 2 == 0)
						color = system.getConfig("app.color.gridRowDiff");
				}
				input.style.background = color;							
			}
		}else {
			var target = this.cellsObj[col].firstChild;	
			if (this.selected)
				var color = system.getConfig("text.focus");
			else
			{
				var color = system.getConfig("app.color.gridDisabledText");									
				if (this.rowIndex % 2 == 0)
					color = system.getConfig("app.color.gridRowDiff");
			}	
			target.style.background = color;	
		}
	},
	setFirstFocus: function(){
		if (this.selected){
			for (var i = 0; i < this.owner.columns.getLength();i++)
			{
				col = this.owner.columns.get(i);
				if ((!col.readOnly))
				{
					var obj = $(this.getFullId()+"cell"+i+"_input");
					if (obj != undefined)
						obj.focus();
					break;
				}
			}
		}
	},
	getLastNotReadOnly: function(){
		var result = undefined;
		for (var i = 0; i < this.owner.columns.getLength();i++){
			col = this.owner.columns.get(i);
			if ((!col.readOnly))
				result = i;			
		}
		return result;
	},
	isLastNotReadOnly: function(col){
		return (col == this.getLastNotReadOnly());
	},
	setColor: function(data){
		var input,color, colHeader, canvas = this.getContainer();
//	canvas.style.background = data;
		this.color = data;
		color  = this.color;
		var childNode = this.colCell.firstChild;    
	    while ((childNode != undefined) && (childNode != ""))    
		{
		
			input = childNode.firstChild;//$(this.getFullId()+"_cellValue"+i);//$(this.getFullId()+"cell"+i+"_input");
			colHeader = this.owner.columns.get(i);
			if (input != undefined)
			{			
				input.style.background = color;		
			}		
			childNode = childNode.nextSibling;
		}
	}
});