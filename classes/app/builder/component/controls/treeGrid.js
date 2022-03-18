//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_treeGrid = function(owner){
	this.selectedItem = undefined;	
	this.height = 200;
	this.widthColNo = 100;
	window.app_builder_component_controls_treeGrid.prototype.parent.constructor.call(this, owner);	
	this.className = "portalui_treeGrid";
	this.readOnly = true;
	this.colCount = 0;
	this.rowCount = 0;
	this.columns = new portalui_arrayMap();
	this.rows = new portalui_arrayMap();
	this.Values = new portalui_arrayMap();	
	this.mouseClick = false;
	this.mouseX = 0;	
	this.selIndex = 0;
	this.maxRowShow = 0;
	this.maxColShow = 0;
	this.topIndex = 0;
	this.leftIndex = 0;
	this.col = 0;
	this.row = 0;
	this.onEllipsClick = new portalui_eventHandler();
	this.onNilaiChange = new portalui_eventHandler();
	
	this.onDblClick = new portalui_eventHandler();
	this.onClick = new portalui_eventHandler();
	this.onSelectCell = new portalui_eventHandler();
	this.onKeyDown = new portalui_eventHandler();
	this.onKeyPress = new portalui_eventHandler();
	this.onCellExit = new portalui_eventHandler();
	
	this.totFixedCol = 0;
	this.fixColor = "#084972";//"#c4c4a3";
	uses("portalui_treeGridItem");
	uses("portalui_column");
	//------------
	this.first = false; //eventKeyPress
	this.rightBtn = false;
};
window.app_builder_component_controls_treeGrid.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_treeGrid.implement({
	doDraw :  function(canvas){
		var n = this.getFullId();
		canvas.style.background = "#90AFBF";//
		canvas.style.overflow = "hidden";
		canvas.style.borderTop =  window.system.getConfig("3dborder.outer.top");
		canvas.style.borderBottom =  window.system.getConfig("3dborder.outer.bottom");
		canvas.style.borderLeft =  window.system.getConfig("3dborder.outer.top");
		canvas.style.borderRight =  window.system.getConfig("3dborder.outer.bottom");
		var h = this.height - 20; 
		var w = this.width - this.widthColNo;
		var html =  "<div id='"+n+"_header' style='{position:absolute;overflow:visible;left: "+this.widthColNo+";top: 0; width:100%; height:20px;}'>"+
					"</div>"+
					"<div id='"+n+"_no' style='{position:absolute;left: 0;top: 20; width:"+this.widthColNo+"; height:auto;overflow:visible;}' "+
						"onscroll='window.system.getResource("+this.resourceId+").doScroll(event)' "+
					">"+
					"</div>"+
					"<div id='"+n+"_topLeft' style='{position:absolute;background:url(icon/"+system.getThemes()+"/colHeader.png) repeat-x;"+
						"left: 0;top: 0; width:"+(this.widthColNo)+"; height:21px;}'"+
						"onMouseOver='window.system.getResource("+this.resourceId+").topMouseOver(event);' "+
						"onMouseOut='window.system.getResource("+this.resourceId+").topMouseOut(event);' "+
						"onMouseMove='window.system.getResource("+this.resourceId+").topMouseMove(event);' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").topMouseDown(event);'"+
						"onMouseUp='window.system.getResource("+this.resourceId+").topMouseUp(event);' "+	
						">"+
						"<span id='"+n+"_caption' style='{position:absolute;top:2;left:10;color:#ffffff;}'> data </span>"+	
					"</div>"+
					"<div id='"+n+"_frame' style='{position:absolute;left: "+this.widthColNo+";top: 20; width: "+w+"px; height: "+h+"px; overflow: auto;}' onscroll='window.system.getResource("+this.resourceId+").doScroll(event)' >"+
					"<div id='"+n+"form' style='{position:absolute;left: 0;top: 0; width: 100%; height: auto; overflow: visible;}'  "+
					"</div>"+
					"</div>";
		this.setInnerHTML(html, canvas);
	},
	doSizeChange: function(width, height){
		var canvas = this.getContainer();

		this.doDraw(canvas);
		this.rearrange(0);
	},
	doScroll: function(event){
		try{
		    var step = "init";
			var n = this.getFullId();	
		    var frame = $(n + "_frame");
		    var header = $(n + "_header");
			header.style.left = -frame.scrollLeft + this.widthColNo;
			step = "colNo";
			var colNo = $(n + "_no");	
			colNo.style.top = -frame.scrollTop + 20;

			step = "get Row object";
			var rowObj = this.rows.get(this.row);
			if (rowObj != undefined)
			{
				step = "get input object";
				var input = $(rowObj.getFullId()+"cell"+this.selIndex+"_input");
				if (input != undefined)
					input.blur();
			}
			
			if (this.selIndex >= 0)
			{
				var ellips = $(n + "_ellips");
				if (ellips != null)
				{
					step = "ellips";
					ellips.style.display = "none";
					ellips.style.left = this.getRowLeft(this.selIndex) + 5;
					ellips.style.top = this.getRowTop(this.selIndex, this.row);		
				}
				var combobox = $(n + "_dropDown");
				if (combobox != null)
				{
					step = "combobox";
					combobox.style.display = "none";
					combobox.style.left = this.getRowLeft(this.selIndex) - 15;
					combobox.style.top = this.getRowTop(this.selIndex, this.row);
				}
				var date = $(n + "_date");
				if (date != null)
				{
					step = "date";
					date.style.display = "none";
					date.style.left = this.getRowLeft(this.selIndex) - 15;
					date.style.top = this.getRowTop(this.selIndex, this.row);
					var app = this.getApplication();
					if (app.pageDatePickerForm != undefined)
						app.pageDatePickerForm.hide();
				}
			}

		}
		catch (e){
		    alert("[saiSG]::doScroll : " + e+"\r\n"+this.row+"-"+step);
		}
	},
	setRowCount: function(data){
		this.rowCount = data;
		for (var i = 0; i < this.colCount; i++){}
	},
	getRowCount: function(){
		return this.rowCount;
	},
	setColCount: function(data){
		this.colCount = data;
		var col = undefined;
		var lft  = 0;
		var wdth = 80;	
		for (var i = 0; i < this.colCount; i++)
		{
			col = new portalui_column(this,i);		
			wdth = 80;			
			col.setWidth(wdth);
			col.setTitle("Column"+i);
			lft = (i * wdth); 
			col.setLeft(lft);
			col.setReadOnly(true);
			this.columns.set(i, col);
		}
		this.maxRowShow = this.calcMaxRowShow();	
	},
	getColCount: function(){
		return this.colCount;
	},
	setSelIndex: function(index){
		this.selIndex = index;
		this.col = index;
	},
	setRowIndex: function(index){	
		try{
			var rowObj = this.rows.objList[this.row];
			if (rowObj != undefined)
				rowObj.setSelected(false);	
			var Obj = this.rows.objList[index];
			if (Obj != undefined)
				Obj.setSelected(true);
			this.setActiveRow(index);		
		}catch(e)
		{
			alert("[saiSG]::setRowIndex : " + e);
		}
	},
	getMaxRowShow: function(){
		return this.maxRowShow;
	},
	getMaxColShow: function(){
		return this.maxColShow;
	},
	doKeyPress: function(charCode, buttonState){
	},
	doKeyDown: function(keyCode, buttonState){	
	},
	addCol: function(data){	
		for (var i = this.colCount; i < this.colCount + data; i++)
		{		

			col = new portalui_column(this,i);
			wdth = 80;
			col.setWidth(wdth);
			col.setTitle("Column"+i);		
			lft = (i * wdth); 
			col.setLeft(lft);
			this.columns.set(i, col);
		}	
		this.colCount += data;
		this.maxRowShow = this.calcMaxRowShow();
	},
	removeCol: function(index){
		var obj = this.columns.get(startPos);
		var canvas = $(obj.getFullId());
		var left = canvas.offsetLeft;
		
		var width = canvas.offsetWidth;
		var newLeft = left + width;
		index++;
		for (var i=index; i < this.columns.getLength();i++)
		{
			obj = this.columns.objList[i];
			obj.setLeft(newLeft);
			canvas = $(obj.getFullId());
			canvas.style.left = newLeft+"px";
			newLeft = canvas.offsetLeft + canvas.offsetWidth ;
			obj.doDraw(canvas);
		}
		this.columns.del(index);	
		this.maxRowShow = this.calcMaxRowShow();
	},
	rearrange: function(startPos){
		try{
			var step = "get Columns "+startPos;
			if (this.columns.getLength() > 0)
			{
				
				var obj = this.columns.get(startPos);
				step = "get canvas "+obj;
				var canvas = $(obj.getFullId()+"_colHead");
				var left = canvas.offsetLeft;
				var colObj = obj;
				var width = parseInt(canvas.style.width);
				var newLeft = left + width;
				startPos++;
				for (var i = startPos; i < this.colCount; i++)
				{
					step = "get Columns "+i;
					obj = this.columns.get(i);
					step = "set Columns left "+i;
					obj.setLeft(newLeft);
					canvas = $(obj.getFullId()+"_colHead");		
					canvas.style.left = newLeft+"px";
					newLeft = parseInt(canvas.style.left) + parseInt(canvas.style.width) ;		
					obj.doDraw(canvas);
					step = "refresh cell"+i;
					obj.refreshCells();
				}

			}
		}
		catch(e){
			alert("[saiSG]::rearrange:" + e+"\r\n"+step);
		}
	},
	addRowValues: function(parent, values){
		try{
			var step = "initiated";
			var col = undefined;
			var width = 0;
			for (var i = 0;i < this.columns.getLength();i++)
			{
				col = this.columns.get(i);
				width += col.getWidth();
			}
			var len = this.rows.getLength();
			var childCount = len;
			step = "create rowobj";
			uses("portalui_treeGridItem");
			var rowObj = new portalui_treeGridItem(parent,this, len);		
			
			step = "cek parent";
			if (parent instanceof portalui_treeGridItem)
				len = parent.childs.getLength();		
//		if (parent 
			var top = len * +19;
		//---------------------	
			step = "cek node";
			var n = rowObj.getFullId();
			var level = 1;
			var headerCanvas = undefined;
			if (parent instanceof portalui_treeGrid)
				headerCanvas = $(this.getFullId()+"_no");
			else
			{
				headerCanvas = $(parent.getFullId()+"noform");
				level = parent.level;
			}
			
			step = "create div canvas";	
			var node = document.createElement("div");
			node.id = n +"_no";	
			node.style.left = 0;
			headerCanvas.appendChild(node);
			node.style.top = 0;
			node.style.background = "#d0d7de";
			node.style.display = "";
			node.style.height = "auto";
			node.style.position = "relative";
			node.style.width = this.widthColNo;
			if (parent instanceof portalui_treeGrid)
				var left2 = 0;
			else 
				var left2 = (level * 10); 	
			if (document.all)
			{ var top1 = -1; var height1 = 20;}else{var top1 = 0; var height1 = 18;}
			var html = "<div style='{position:relative;left : 0; top : "+top1+"; width:100%; height:"+height1+";border:#919B9B 1px solid;}' "+
								"onDblClick='system.getResource(" + rowObj.resourceId + ").eventDoubleClick(event,0);' "+
								"onMouseMove='system.getResource(" + rowObj.resourceId + ").treeMouseMove(event);' " +
								"onMouseOver='system.getResource(" + rowObj.resourceId + ").eventMouseOver(event);' " +
								"onMouseOut='system.getResource(" + rowObj.resourceId + ").eventMouseOut(event);' " +
								">"+					
								"<div id='"+ n +"_caption'style='{position:absolute;left : "+(rowObj.level * 12)+"; top : 0; width:100%"+
								"; height:"+height1+";}'>data"+rowObj.rowIndex+"</div>"+
								"<div id='" + n + "_nocollapse' style='{position:absolute;display:none; left: "+left2+
								"; top:0; width: 16; height: 16;background: url(image/themes/"+system.getThemes()+"/treeCollapse.png) no-repeat;cursor:pointer;}' "+
								"onMouseDown='system.getResource(" + rowObj.resourceId + ").treeCollapseMouseDown(event);' " +
								"></div>" +						
							"</div>"+												
				"<div id='"+ n +"noform' style='{display:none;position: relative;left: 0;top: 0;width: 100%;height: auto;}'> </div>";
			node.innerHTML = this.remBracket(html);
		//--------------------			
			step = "set rowObj";	
			rowObj.setWidth(width);
			rowObj.addCell(this.columns.getLength(), values);
			rowObj.setColor("#F0F9EF");
			rowObj.onDblClick.set(this, "doDblClick");
			rowObj.onClick.set(this, "doClick");
			rowObj.onSelectCell.set(this, "doSelectCell");
			rowObj.onEllipsClick.set(this, "doEllipsClick");
			rowObj.onCellExit.set(this, "doCellExit");
			rowObj.readOnly = this.readOnly;
			len = this.rows.getLength();
			this.rows.set(len, rowObj);
		}catch(e)
		{
			alert("[saiSG]::addRowValues:" + e + "\r\n"+step);
		}
	},
	delRow: function(row){
		try{
			var rowObj= undefined;		
			var cnv = undefined;
			var len = this.rows.getLength();
			rowObj= this.rows.get(row);	
			this.rows.del(rowObj);
			rowObj.free();
			
			var headerNo = $(this.getFullId()+"_no");
			var node = $(rowObj.getFullId()+"_no");

			if (node != undefined)
				headerNo.removeChild(node);			
			
			for (var i = row; i < this.rows.getLength(); i++)
			{
				var top = i * 19;		
				rowObj = this.rows.get(i+1);
				
				if (rowObj != undefined)
				{			
					rowObj.setTop(top);
					rowObj.setIndex(i);
					this.rows.set(i, rowObj);
					this.rows.del(i+1);
				}
				
			}
		}catch(e){
			alert("[saiSG]::delRow : " + e);
		}
	},
	setValues: function(values){	
	},
	clear: function(){
		try{
			var child = undefined;
			var headerNo = $(this.getFullId()+"_no");
			var node = undefined;
			var j = 0;
			for (var i in this.childs.objList)
			{
				child = window.system.getResource(this.childs.objList[i]);
				node = $(child.getFullId()+"_no");
				if (node != undefined)
					headerNo.removeChild(node);
				if (child instanceof portalui_treeGridItem)
					child.free();
				j++;
			}	
			this.rows.clear();
		}catch(e)
		{
			alert("[saiSG]::clear:"+e);
		}
	},
	calcMaxRowShow: function(){
		var maxRow = 0;
		while (maxRow * 19 < this.getHeight() - 40)
			maxRow++;		
		return maxRow;
	},
	calcMaxColShow: function(){
		return this.maxRowShow;
	},
	getRowTop: function(col, idx){
		try{
			var row = this.rows.get(col);
			var cell = undefined;
			idx++;
			if (row != undefined)
				cell = $(row.getFullId());	
			if (cell != undefined)
			{		
				var frame = $(this.getFullId() + "_frame");
				
				result = cell.offsetTop - frame.scrollTop + 20;
			}
		
			return result;
		}catch(e)
		{
			alert("[saiSG]::getRowTop:"+e);
		}
	},
	getRowLeft: function(col){
		try{	
			var column = this.columns.get(col);
			var cell = $(column.getFullId());
			result = 0;
			if (cell != undefined)
			{		
				var frame = $(this.getFullId() + "_frame");
				
				result = cell.offsetLeft - frame.scrollLeft + cell.offsetWidth + 20;
			}
	    	return result;
		}catch(e)
		{
			alert("[saiSG]::getRowLeft:"+e);
		}
	},
	setCell: function(col, row, value){
		var rowObj= this.rows.get(row);
		if (rowObj != undefined)
			rowObj.setCellValue(col, value);
	},
	getCell: function(col, row){
		var rowObj= this.rows.get(row);
		var value = rowObj.getCellValue(col);
		return value;
	},
	doLostFocus: function(){
		var ellips = $(this.owner.getFullId()+"_ellips");
		if (ellips != null)
			ellips.style.display = "none";		
	},
	setFixColor: function(data){
		this.fixColor = data;
	},
	setFixedCol: function(data){
		this.totFixedCol = data;
	},
	setReadOnly: function(data){
		for (var i = 0; i < this.colCount; i++)
		{
			obj = this.columns.get(i);		
			obj.setReadOnly(data);
			obj.refreshCells();
		}	
		this.readOnly = data;
	},
	doDblClick: function(sender, colIdx, rowIdx){
		this.onDblClick.call(sender, colIdx, rowIdx);
	},
	doClick: function(sender, colIdx, rowIdx){
		this.onClick.call(sender, colIdx, rowIdx);
	},
	doSelectCell: function(sender, colIdx, rowIdx){
		this.onSelectCell.call(this, colIdx, rowIdx);
	},
	doEllipsClick: function(sender, colIdx, rowIdx){
		this.onEllipsClick.call(this, colIdx, rowIdx);
	},
	doCellExit: function(sender, colIdx, rowIdx){
		try{
			var colHeader = this.columns.get(colIdx);
			if (colHeader.columnFormat == window.cfNilai)
			{
			
				var rowObj = this.rows.objList[rowIdx];	
				var input = $(rowObj.getFullId() +"cell"+colIdx+"_input");
				var text = rowObj.getCellValue(colIdx);
				var decpoint = ',';
				var sep = '.';
				var isExit = 0;
				var num = text;
				
				var numtmp ="";
				var i;
				
				for (i=0;i<num.length;i++)
				{     
					if (num.charAt(i) != ".")
					numtmp += num.charAt(i); 
				}  
				num = numtmp; 
				// need a string for operations
				num = num.toString();
				// separate the whole number and the fraction if possible
				a = num.split(decpoint);
				x = a[0]; // decimal
				y = a[1]; // fraction
				z = "";
				
				
				if (typeof(x) != "undefined") {
				// reverse the digits. regexp works from left to right.
				for (i=x.length-1;i>=0;i--)
				z += x.charAt(i);
				// add seperators. but undo the trailing one, if there
				z = z.replace(/(\d{3})/g, "$1" + sep);
				if (z.slice(-sep.length) == sep)
				z = z.slice(0, -sep.length);
				x = "";
				// reverse again to get back the number
				for (i=z.length-1;i>=0;i--)
				x += z.charAt(i);
				// add the fraction back in, if it was there
				if (typeof(y) != "undefined" && y.length > 0)
				x += decpoint + y;
				}  
				text = x;
				input.value = text;
			}
			this.onCellExit.call(this, colIdx, rowIdx);
		}catch(e)
		{
			alert("[saiSG] :: doCellExit : " + e);
		}
	},
	goToRow: function(row){
		this.setRowIndex(row);
		var n = this.getFullId();
		var ros = this.rows.getLength();
		var detailH = ros * 23;
		var rowPos = row * 23;
		var diff = rowPos / detailH; 
		
		var frame = $(n + "_frame");
	    var header = $(n + "_header");
	    frame.scrollTop = diff * 100 * 22;											
	},
	setActiveRow: function(row){
		this.row = row;
	},
	setWidthColNo: function(data){
		this.widthColNo = data;
		var cnv = this.getCanvas();
		this.doDraw(cnv);
	},
	swapRow: function(row1, row2){	
		try{
			var rowObj1 = this.rows.get(row1);
//----------------------------------------		
			var ellips = $(this.getFullId()+"_ellips");
			if ((ellips != null) && (ellips.style.display == ""))
				ellips.style.display = "none";
			var date = $(this.getFullId()+"_date");
			if ((date != null) && (date.style.display == ""))
			{
				date.style.display = "none";	
				var app = this.getApplication();
				if (app.pageDatePickerForm != undefined)
					app.pageDatePickerForm.hide();
			}
			var combobox = $(this.getFullId()+"_dropDown");
			if ((combobox != null) && (combobox.style.display == ""))
				combobox.style.display = "none";
//-----------------------------------			
			var rowObj2 = this.rows.get(row2);
			var top = rowObj2.getTop();
			rowObj2.setIndex(row1);
			rowObj2.setTop(rowObj1.getTop());
			rowObj1.setIndex(row2);
			rowObj1.setTop(top);
			
			this.rows.set(row1, rowObj2);
			this.rows.set(row2, rowObj1);
		}catch(e)
		{
			alert("[saiSG]::swapRow:"+e);
		}
	},
	doSelectItem: function(item){
	    var oldSelected = window.system.getResource(this.selectedItem);
	    if (oldSelected instanceof portalui_treeGridItem)
	        oldSelected.doDeselect();
	    if (item instanceof portalui_treeGridItem)
	        this.selectedItem = item.getResourceId();	       	    
	    else
	        this.selectedItem = undefined;
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
	topMouseOver: function(event){
		var canvas = $(this.getFullId()+"_topLeft");
		canvas.style.backgroundPosition = "0 -21";    	
	},
	topMouseOut: function(event){
	    var canvas = $(this.getFullId()+"_topLeft");   
	    canvas.style.backgroundPosition = "0 0";
	},
	topMouseDown: function(event){
		if (!this.mouseClick){
			this.mouseClick = true;	
			this.mouseX = event.clientX;
			var obj = $(this.getFullId()+"_topLeft");
			obj.style.cursor = "col-resize";
		}	
	},
	topMouseMove: function(event){
		if (this.mouseClick){		
			var x = event.clientX;	
			this.oldWidth = this.widthColNo; 
			this.diffX = (x - this.mouseX);
			var newWidth = this.widthColNo + this.diffX;
			var obj = $(this.getFullId()+"_topLeft");
			this.widthColNo = newWidth;
			obj.style.width = newWidth;
			var cnv = undefined;
			for (var i = 0; i < this.rows.getLength();i++)
			{			
				obj = this.rows.get(i);
				cnv = $(obj.getFullId()+"_no");
				if (cnv != undefined)
					cnv.style.width = newWidth;
			}
			var w = this.width - this.widthColNo;
			obj = $(this.getFullId()+"_frame");
			if (obj != undefined)
			{
				obj.style.left = newWidth;
				obj.style.width = w;
			}
			obj = $(this.getFullId()+"_header");
			obj.style.left = newWidth;
			obj = $(this.getFullId()+"_no");
			obj.style.width = newWidth;
			this.mouseX = x;		
		}
	},
	topMouseUp: function(event){
		try{
			this.mouseClick = false;
			var obj = $(this.getFullId()+"_topLeft");
				obj.style.cursor = "pointer";
		}catch(e)
		{
			alert("[portalui_treeGrid]:topMouseUp:"+e);
		}
	},
	appendRow : function(parent){
		var values = Array();
		for (var i = 0; i < this.columns.getLength();i++)
			values[i] = "";	
		this.addRowValues(parent, values);
		this.rowCount++;
	},
	setDataCaption: function(data){
		var obj = $(this.getFullId()+"_caption");
		obj.innerHTML = data;
	}
});
