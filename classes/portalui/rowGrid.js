//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_rowGrid = function(owner, index){
	if (owner){
		this.title = "rowGrid";
		this.rowIndex = index;
		this.height = 19;
		window.portalui_rowGrid.prototype.parent.constructor.call(this, owner);	
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
		this.param1 = [];
		this.param2 = [];
		this.param3 = [];
		this.param4 = [];
		this.frameReady = [];
		this.autoSubmit = [];
		this.onClick = new portalui_eventHandler();
		this.onDblClick = new portalui_eventHandler();
		this.onSelectCell = new portalui_eventHandler();
		this.onEllipsClick = new portalui_eventHandler();	
		this.onChange = new portalui_eventHandler();
		this.values = [];	
		this.cellColor = [];
		this.dataAfterUpload = [];
	}
};
window.portalui_rowGrid.extend(window.portalui_control);
window.rowGrid = window.portalui_rowGrid;
window.portalui_rowGrid.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.height = document.all ? this.height + 2 : this.height;
		canvas.style.top = 0;
		var lft = this.width - 1;		
		var html = "<div id='"+n+"_colCel' style='{position: absolute; top:0;width:100%; height: 100%;}'"+	
					" onmousemove='$$("+this.resourceId+").eventMouseMove(event);'></div>";
		this.setInnerHTML(html, canvas);
		this.colCell = $(n+"_colCel");
	},
	setWidth: function(data){
		window.portalui_rowGrid.prototype.parent.setWidth.call(this,data);
		this.colCell.style.width = data;
	},
	setHeight: function(data){
		window.portalui_rowGrid.prototype.parent.setHeight.call(this,data);
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
	//doChange: function(colId){	
	//	this.onChange.call(this, colId, this.rowIndex);
	//},
	addCell: function(colCount, values){
		var node = this.colCell;
		if (node == undefined) return;
		var value = undefined;
		this.values = values;
		var fullId = this.getFullId();
		var formatAlign,rowHeight,html="";
		for (var i = 0; i < colCount; i++)
		{
			var colHeader = this.owner.columns.get(i);
			if (values != undefined)
				value = values[i];
			else value = "";
			if (colHeader.columnFormat == window.cfNilai){
				colHeader.formatAlign = alRight;			
				if (typeof(value) == "string" && value.indexOf(",") != -1 && value.indexOf(".") == -1) {	
				    value = parseFloat(value.replace(",","."))
				}
				if (typeof(value) == "string") {	
					if (value == ""){						
					}else 
						if (!isNilai(value)) 
							value = floatToNilai(parseFloat(value));
						else if (value.length == 3)
							value = floatToNilai(parseFloat(value));					
				}else value = floatToNilai(parseFloat(value));		
				values[i] = value;
		    }
			formatAlign = colHeader.formatAlign;
		    
			this.cols.set(i, value);
			rowHeight = document.all ? this.height + 2 : this.height;
			nodeCel = document.createElement("div");
			len = i + 1;
			nodeCel.id = fullId+"_cell"+len;
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
			
			if (this.rowIndex % 2 == 0)
				color = system.getConfig("app.color.gridRowDiff");			
			if (colHeader.color != system.getConfig("app.color.gridText"))
				color = colHeader.color;		
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
			if (colHeader.columnFormat == cfButton)
			{				
				nodeCel.style.cursor = "pointer";				
				nodeCel.innerHTML = "<div style='position:absolute;top:0;left:0;width:99%;height:"+(document.all ? "19" : "17")+";background:transparent;"+
									"	border-top:1px solid #ffffff;border-left:1px solid #ffffff;border-bottom:1px solid #555555;border-right:1px solid #555555'>"+
									"</div>"+
									"<div style='position:absolute;left:0;height:8;width:100%;top:0;background:#ffffff;moz-opacity:0.5;filter:alpha(opacity:50);opacity:0.5'></div>"+
									"<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:"+margin+";white-space: nowrap;"+
									" ' "+
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
									" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+nodeCel.id+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+nodeCel.id+","+colIdx+")'; "+										
									" > "+value+"</div>";			
			
			}else if (colHeader.columnFormat == cfUpload)
			{				
				this.autoSubmit[colIdx] = true;
				nodeCel.style.cursor = "pointer";				
				nodeCel.innerHTML = "<div style='position:absolute;top:0;left:0;width:99%;height:"+(document.all ? "19" : "17")+";background:transparent;"+
									"	border-top:1px solid #ffffff;border-left:1px solid #ffffff;border-bottom:1px solid #555555;border-right:1px solid #555555'>"+
									"</div>"+									
									"<div id='"+fullId+"_cellFrame"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='background:url(icon/dynpro/button.png)0 0 repeat-x;position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:"+margin+";white-space: nowrap;'"+						
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
									" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+nodeCel.id+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+nodeCel.id+","+colIdx+")'; "+										
									" ><iframe id='"+fullId+"_cellUpload"+colIdx+"' name='" + fullId + "_cellUpload"+colIdx+"' border=0 frameBorder='no' style='{position: absolute;border: 0px; top:0;left:0;width: 100%; height:100%;}'   src='uploadCtrl.php?resId=" + this.resourceId + "&ctrl=default&col="+colIdx+"&caption=Browse' ></iframe>"+
									"<div id='" +fullId + "_bar"+colIdx+"' style='{position: absolute;left: 0; top: 0;width: 100%; height: 100%; display: none; background: url(image/upload.gif) no-repeat left center}' onDblClick='system.getResource(" + this.resourceId + ").viewFrameContent("+colIdx+");'></div>" +
									"</div>";			
			
			}else if (colHeader.columnFormat == cfBoolean)
			{				
				nodeCel.style.cursor = "pointer";		
				var x = colHeader.width / 2 - 6;
				if (value.toLowerCase() == "true") var pos = " -13 0";
				else var pos = " 0 0";
				var path = "checkBox.png";
				if (colHeader.buttonStyle == bsRadio) var path = "radioButton.png";
				nodeCel.innerHTML = "<div id='"+fullId+"_cb_"+colIdx+"' style='position:absolute;top:2;left:"+x+";width:13;height:13;background-image:url(image/themes/"+system.getThemes()+"/"+path+");background-position:"+pos+";background-repeat:no-repeat;'"+
									//" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+									
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+nodeCel.id+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+nodeCel.id+","+colIdx+")'; "+										
									"></div>"+									
									"<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:20; top:0; height:100%; width:100%;white-space: nowrap;"+
									" color:transparent' "+
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
									" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+nodeCel.id+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+nodeCel.id+","+colIdx+")'; "+										
									" > "+value+"</div>";			
			
			}else{					
				var margin = document.all ? "0px" : "0px";
				nodeCel.style.marginRight = margin;
				nodeCel.innerHTML = "<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
										" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:"+margin+";white-space: nowrap;"+
										" ' "+
										" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
										" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
										" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+this.rowIndex+","+colIdx+")'; "+
										" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+this.rowIndex+","+colIdx+")'; "+											
										" > "+value+"</div>";			
			}
			node.appendChild(nodeCel);				
			this.cellsObj.push(nodeCel);
			html += "<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
				" style='position:absolute;border:"+window.system.getConfig("3dborder.inner.bottom")+";background:"+color+";overflow:hidden;left:"+colHeader.getLeft()+"; top:0; height:"+rowHeight+"; width:"+nodeCel.style.width+";margin-right:"+margin+";white-space: nowrap;'"+				
				" onDblClick = 'eventDoubleClick(event, "+this.rowIndex+","+colIdx+")'; "+
				" onClick = 'eventClick(event,"+this.rowIndex+", "+colIdx+")'; "+
				" onMouseOver = 'eventMouseOver(event, "+this.rowIndex+","+colIdx+")'; "+
				" onMouseOut = 'eventMouseOut(event, "+this.rowIndex+","+colIdx+")'; "+											
				" > "+value+"</div>";
		}		
		var canvas = this.getCanvas();
		if (this.owner.disableCtrl){			
			return "<div style='position:absolute;left:"+canvas.style.left+";top:"+canvas.style.top+";width:"+canvas.style.width+";height:"+canvas.style.height+"'>"+html+"</div>";
		}else return "";
	},
	setCellValue: function(index, value){
		try{
			var col = this.owner.columns.get(index);
			var formatAlign= "left";
			if (col != undefined && col.columnFormat == cfNilai){
				formatAlign= "right";
				if (typeof(value) == "string" && value.indexOf(",") != -1) {	
				    value = parseFloat(value.replace(",","."))
				}
				if (typeof(value) == "string") {	
					if (!isNilai(value)) 
						value = floatToNilai(parseFloat(value));
					else if (value.length == 3)
						value = floatToNilai(parseFloat(value));					
				}else value = floatToNilai(parseFloat(value));	
			}else if (col.columnFormat == cfBoolean){				
				var target = $(this.getFullId() +"_cb_"+index);
				if ( value.toLowerCase() == "true")
					target.style.backgroundPosition = "-13 0";
				else target.style.backgroundPosition = "0 0";				
			}else if (col.columnFormat == cfHurufBesar || col.columnFormat == cfUpperCase) value = value.toUpperCase();
			else if (col.columnFormat == cfHurufKecil || col.columnFormat == cfLowerCase) value = value.toLowerCase();
			var node = $(this.getFullId()+"_cellValue"+index);						
			
			if (node !== undefined && col.columnFormat != cfUpload ) node.innerHTML = value;
			this.cols.set(index, value);	
			this.owner.pressKeyDown = false;			
			this.values[index] = value;
			this.onChange.call(this, index, this.rowIndex);
		}catch(e){
			systemAPI.alert("rowGrid:"+e+"\r\n"+index+" "+this.rowIndex);
		}
	},
	getCellValue: function(colIndex){		
	    try{
    		var col = this.owner.columns.get(colIndex);
    		if (col.columnFormat == cfUpload){
    			var value = this.values[colIndex];
    		}else{
    		    var value = this.values[colIndex];
    		    if (typeof value != "string" && value !== undefined )
    		    	value = value;
    		    else{
	    			var node = $(this.getFullId()+"_cellValue"+colIndex);			
	    			if (document.all)
	    				value = node.innerHTML;//this.values[colIndex];
	    			else
	    				value = node.textContent;//this.values[colIndex];
    		    }
            }
    		if (value === undefined) value = "";
   		}catch(e){
   		   alert(e);
   		}
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
		if (node == undefined)return;
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
			nodeCel.style.textAlign = colHeader.formatAlign;
			nodeCel.style.left = colHeader.getLeft();			
			nodeCel.style.height = document.all ? this.height + 2 : this.height;
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
		var colHeader = this.owner.columns.get(idx);	
		if (colHeader.readOnly) return false;
		if (colHeader.hideColumn) return false;
		if (colHeader.columnFormat == cfButton || colHeader.columnFormat == cfUpload) return false;		
		if (colHeader.columnFormat == cfBoolean) {
			this.setCellValue(idx, (this.values[idx].toLowerCase() == "false" || this.values[idx] == ""? "true" : "false"));
			return false;
		}				
		
		if (colHeader.columnFormat == cfHurufBesar || colHeader.columnFormat == cfUpperCase  ) this.owner.inplaceEdit.style.textTransform = "uppercase";
		else if (colHeader.columnFormat == cfHurufKecil || colHeader.columnFormat == cfLowerCase ) this.owner.inplaceEdit.style.textTransform = "lowercase";
		else this.owner.inplaceEdit.format = "*M";
		var top = parseInt(this.top);				
		this.owner.inplaceEdit.style.top = top;
		this.owner.inplaceEdit.style.width = (document.all ? parseInt(this.cellsObj[idx].style.width) : parseInt(this.cellsObj[idx].style.width) + 2);
		this.owner.inplaceEdit.style.left = this.cellsObj[idx].style.left;			
		this.owner.inplaceEdit.col = idx;
		this.owner.inplaceEdit.row = this.rowIndex;
		this.owner.inplaceEdit.zIndex = 99999999;
		if (this.owner.frame.scrollLeft > this.owner.inplaceEdit.style.left){
			this.owner.frame.scrollLeft = this.owner.inplaceEdit.style.left;
		}		
		//error_log(colHeader.maxLength);
		if (colHeader.maxLength > 1 ) {
		//	error_log("!"+colHeader.maxLength);
			this.owner.inplaceEdit.maxLength = colHeader.maxLength;		
		}else{
		//	 error_log("!@#"+colHeader.maxLength);
			 this.owner.inplaceEdit.maxLength = 1000;
		}
		//if (this.rowIndex == this.owner.rows.getLength() - 1)
		var plus = this.rowIndex == this.owner.getRowCount() - 1 ? 2:1;
		this.owner.inplaceEdit.style.height = document.all ? parseInt(this.cellsObj[idx].style.height) : parseInt(this.cellsObj[idx].style.height)+plus;
		//else this.owner.inplaceEdit.style.height = parseInt(this.cellsObj[idx].style.height) + 2; 
		this.owner.inplaceEdit.value = "";
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
		setCaret(this.owner.inplaceEdit, 0,this.owner.inplaceEdit.value.length);
		if (justSetPos == undefined && (this.owner.inplaceEdit.style.display == "" || this.owner.inplaceEdit.style.visibility == "visible")) this.owner.inplaceEdit.focus();		
		this.owner.doSetFocus();
	},
	eventDoubleClick: function(event, idx){				
		var colHeader = this.owner.columns.get(idx);	
		if (colHeader != undefined && !colHeader.readOnly && !colHeader.hideColumn && !this.owner.readOnly && colHeader.columnFormat != cfButton && colHeader.columnFormat != cfUpload && colHeader.columnFormat != cfBoolean){
			try{			
				this.showInplaceEdit(idx);
			}catch(e){
				systemAPI.alert(this,e);
			}
		}	
		this.onDblClick.call(this, idx, this.rowIndex);
	},
	eventClick: function(event, idx){			
		try{			
			if (this.owner.inplaceEdit.style.display != "")	{
				this.owner.inplaceEdit.col = idx;
				this.owner.inplaceEdit.row = this.rowIndex;
			}
			//this.owner.inplaceEdit.value = this.getCellValue(idx);	
			var colHeader = this.owner.columns.get(idx);
			if (colHeader.columnFormat == cfBoolean){			
				//error_log(this.values[idx].toLowerCase()+":"+this.values[idx]);
				//this.setCellValue(idx, (this.values[idx].toLowerCase() == "false" || this.values[idx] == ""? "true" : "false"));
			}	
			this.getForm().setActiveControl(this.owner);
			this.owner.setRowIndex(this.rowIndex, idx);
			this.onClick.call(this, idx, this.rowIndex);						
			return false;
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
			var colHeader = this.owner.columns.get(colId);
			if (colHeader.columnFormat == cfButton || colHeader.columnFormat == cfUpload){
				var target = $(idx);
				if (target) target.style.background = "#ff9900";
			}else if (colHeader.columnFormat == cfBoolean){
				var target = $(this.getFullId() +"_cb_"+colId);
				if (target) {
					if ( this.values[colId].toLowerCase() == "true")
						target.style.backgroundPosition = "-13 -13";
					else target.style.backgroundPosition = "0 -13";
				}
			}else{
				var target = document.all ? event.srcElement : event.target;
				var color = system.getConfig("text.overBgColor");
				if (this.cellColor[colId]) color = this.cellColor[colId];
				if (target) target.style.background = color;
			}
		}
		this.owner.doMouseOver(colId);		
		/*if (!(colHeader.readOnly || this.owner.readOnly)){
			this.owner.col = colId;
			this.owner.row = idx;				
			this.onSelectCell.call(this, colId, idx);			
			this.showInplaceEdit(colId);								
			this.owner.showButton(idx, colId, false);
			
		}*/
	},
	eventMouseOut: function(event, idx, colId){	
		var color = undefined;
		var colHeader = undefined;
		try{
			if (this.owner.rowSelect){
				var input;
				var childNode = this.colCell.firstChild;    
				while ((childNode != undefined) && (childNode != ""))    
				{		
					input = childNode.firstChild;
					colHeader = this.owner.columns.get(colId);
					if (input != undefined)
					{
						if (this.selected)
						{
							color = system.getConfig("text.focus");
						}else
						{						
							color = system.getConfig("app.color.gridText");														
							if (this.rowIndex % 2 == 0)
								color = system.getConfig("app.color.gridRowDiff");							
						}
						if (colHeader.color != system.getConfig("app.color.gridText")) color = colHeader.color;
						input.style.background = color;		
					}		
					childNode = childNode.nextSibling;
				}
			}else {
				var colHeader = this.owner.columns.get(colId);			
				if (colHeader.columnFormat == cfButton || colHeader.columnFormat == cfUpload){
					var target = $(idx);
					if (target) target.style.background = "#ff9900";
				}else if (colHeader.columnFormat == cfBoolean){
						var target = $(this.getFullId() +"_cb_"+colId);
						if (target) {
							if ( this.values[colId].toLowerCase() == "true")
								target.style.backgroundPosition = "-13 0";
							else target.style.backgroundPosition = "0 0";
						}
				}else{
					var target = document.all ? event.srcElement : event.target;	
					if (this.selected && colId == this.owner.col)
						var color = system.getConfig("text.focus");
					else
					{
						var color = system.getConfig("app.color.gridText");									
						if (this.rowIndex % 2 == 0)
							color = system.getConfig("app.color.gridRowDiff");
						if (colHeader.color != system.getConfig("app.color.gridText")) color = colHeader.color;
						if (this.color != system.getConfig("text.normalBgColor")) color = this.color;
						if (this.cellColor[colId]) color = this.cellColor[colId];
					}	
					if (target) target.style.background = color;					
				}
			}
			this.owner.doMouseOut(colId, this.rowIndex);
		}catch(e){
			alert(e);
		}
	},
	setSelected: function(data, col){
		this.selected = data;	
		var color = undefined;	
		var input = undefined;
		var colHeader = this.owner.columns.get(col);
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
		}else if (colHeader.columnFormat == cfBoolean){			
			var target = this.cellsObj[col];
			if (this.selected)
				var color = system.getConfig("text.focus");
			else
			{
				var color = system.getConfig("app.color.gridDisabledText");									
				if (this.rowIndex % 2 == 0)
					color = system.getConfig("app.color.gridRowDiff");
				if (this.cellColor[col]) color = this.cellColor[col];	
			}	
			target.style.background = color;	
		}else {
			var target = this.cellsObj[col].firstChild;	
			if (this.selected)
				var color = system.getConfig("text.focus");
			else
			{
				var color = system.getConfig("app.color.gridDisabledText");									
				if (this.rowIndex % 2 == 0)
					color = system.getConfig("app.color.gridRowDiff");
				if (this.cellColor[col]) color = this.cellColor[col];
			}	
			target.style.background = color;	
		}
		if (data) this.onSelectCell.call(this, col, this.rowIndex);
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
		var input,color, colHeader, canvas = this.getCanvas();
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
	},
	doInit: function(col){
		try{
		    this.frameReady[col] = true;
		    var colHeader = this.owner.columns.get(col);		    
		    this.setParam1(col,colHeader.param1);
		    this.setParam2(col,colHeader.param2);
		    this.setParam3(col,colHeader.param3);
		    this.setParam4(col,colHeader.param4);
		}catch(e){
			alert("Upload Init "+e);
		}
	},
	setParam1: function(col, data){		
		this.param1[col] = data;
		if (this.frameReady[col])
		{
			if (document.all)
			    $(this.getFullId() + "_cellUpload"+col).contentWindow.document.forms[0].param1.value = data;
			else
			    $(this.getFullId() + "_cellUpload"+col).contentDocument.forms[0].param1.value = data;
		}
	},
	setParam2: function(col,data){
	    this.param2[col] = data;

	    if (this.frameReady[col])
	    {
	        if (document.all)
	            $(this.getFullId() + "_cellUpload"+col).contentWindow.document.forms[0].param2.value = data;
	        else
	            $(this.getFullId() + "_cellUpload"+col).contentDocument.forms[0].param2.value = data;
	    }
	},
	setParam3: function(col,data){
	    this.param3[col] = data;
	    if (this.frameReady[col])
	    {
	        if (document.all)
	            $(this.getFullId() + "_cellUpload"+col).contentWindow.document.forms[0].param3.value = data;
	        else
	            $(this.getFullId() + "_cellUpload"+col).contentDocument.forms[0].param3.value = data;
	    }
	},
	setParam4: function(col, data){
	    this.param4[col] = data;

	    if (this.frameReady[col])
	    {
	        if (document.all)
	            $(this.getFullId() + "_cellUpload"+col).contentWindow.document.forms[0].param4.value = data;
	        else
	            $(this.getFullId() + "_cellUpload"+col).contentDocument.forms[0].param4.value = data;
	    }
	},
	getValue: function(col){
	    if (this.frameReady[col]){
	        if (document.all)
	            return $(this.getFullId() + "_cellUpload"+col).contentWindow.document.forms[0].uploadFile.value;
	        else
	            return $(this.getFullId() + "_cellUpload"+col).contentDocument.forms[0].uploadFile.value;
	    }else return this.values[col];
	},
	doUploadFinished: function(result, data,col){	
		try{						
			var n = this.getFullId();			
			$(n +"_cellUpload"+col).style.display = "";
			$(n + "_bar"+col).style.display = "none";			
			if (this.param3[col] == "object" && typeof data == "string"){
				var data = xmlToObj(data);
			}
			if (result){
				if (this.param3[col] == "object"){							
					eval("data = "+urldecode(data.value.toString()));
				}else {		
					data = ""+data;
					var tmp = xmlToObj(data);
					tmp = tmp.getValue();	
					data = urldecode(tmp);		
				}							
			}else{			
				if (this.param3[col] == "object"){						
					eval("data = "+urldecode(data.value));
				}else {		
					data = ""+data;
					var tmp = xmlToObj(data);
					tmp = tmp.getValue();	
					data = urldecode(tmp);
				}
				systemAPI.alert("Upload Failed("+data+")","Mungkin file terlalu besar (max.20M)");
			}			
			var colHeader = this.owner.columns.get(col);
			if (colHeader.autoSubmit){				
				this.onChange.call(this, col, this.rowIndex, this.fileName,result, data);
			}
			//$(n +"_cellUpload"+col).src="uploadCtrl.php?resId=" + this.resourceId + "&ctrl=default&col="+col;
			this.reinitUpload(col);
			this.values[col] = data;
            this.dataAfterUpload[col] = data;
		}catch(e){
			error_log(e+":"+result+":"+data);
		}
	},
	reinitUpload : function(col){
	    var n = this.getFullId();
	    var node = $(n+"_cellFrame"+col);
        var html = "<iframe id='"+n+"_cellUpload"+col+"' name='" + n + "_cellUpload"+col+"' border=0 frameBorder='no' style='{position: absolute;border: 0px; top:0;left:0;width: 100%; height:100%;}'   src='uploadCtrl.php?resId=" + this.resourceId + "&ctrl=default&col="+col+"&caption=Browse' ></iframe>"+
								"<div id='" +n + "_bar"+col+"' style='{position: absolute;left: 0; top: 0;width: 100%; height: 100%; display: none; background: url(image/upload.gif) no-repeat left center}' onDblClick='system.getResource(" + this.resourceId + ").viewFrameContent("+col+");'></div>" ;  
		node.innerHTML = html;
    },
	upload : function(col){		
		try{
			var n = this.getFullId();	    
			$(n + "_bar"+col).style.display = "";
			$(n + "_cellUpload"+col).style.display = "none";		
			if (document.all){										        								
				$(n + "_cellUpload"+col).contentWindow.document.forms[0].submit();								
			}else
				$(n + "_cellUpload"+col).contentDocument.forms[0].submit();			
		}catch(e){
			systemAPI.alert("do Upload",e);
		}	
	},
	viewFrameContent: function(col){
		/*var n = this.getFullId();
		$(n + "_bar"+col).style.display = "none";		
		$(n + "_cellUpload"+col).style.display = "";		
		*/
		this.reinitUpload(col);
	},
	doChange: function(sender, col){
		try{			
			var colHeader = this.owner.columns.get(col);
			this.fileName = this.getValue(col);	
			if (!colHeader.autoSubmit)
				this.onChange.call(this, col, this.rowIndex, this.fileName,false);									
			else this.upload(col);									
		}catch(e){
			systemAPI.alert(e,this.fileName);
		}
	},
	setCellColor: function(col, color){
	   try{
    	   this.cellColor[col] = color;
    	   var target = this.cellsObj[col];
    	   target.style.background = color;
	   }catch(e){
	       alert(e);
       }
    }    
});
