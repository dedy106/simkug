//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_mdGridItem = function(parent, owner, index){
	try{
		if (owner){
			this.parent = parent;
			this.grid = owner;
			this.detailHeight = 20;
			if (parent instanceof portalui_mdGrid)		
				this.level = 1;
			else if (parent instanceof portalui_mdGridItem)
				this.level = parent.getLevel() + 1;
			this.parent = owner;
			this.dataCaption = "data";
			
			this.title = "mdGridItem";
			this.rowIndex = index;
			window.app_builder_component_controls_mdGridItem.prototype.parent.constructor.call(this, parent);	
			this.className = "portalui_mdGridItem";
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
			this.color = "#F0F9EF";		
			var dt = new Date();
			this.day = dt.getDate();
			this.month = dt.getMonth() + 1;
			this.year = dt.getFullYear();
			
			this.onClick = new portalui_eventHandler();
			this.onDblClick = new portalui_eventHandler();
			this.onSelectCell = new portalui_eventHandler();
			this.onEllipsClick = new portalui_eventHandler();
			this.onCellExit = new portalui_eventHandler();
			this.values = [];
		}
	}catch(e){
		alert("[treeGridItem]::contructor:"+e);
	}
};
window.app_builder_component_controls_mdGridItem.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_mdGridItem.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.position = "relative";
		canvas.style.top = 0;
		canvas.style.height = "auto";
		var lft = this.width - 1;
		var iconCollapse = "image/themes/"+system.getThemes()+"/treeCollapse.png";
		var left2 = 0;
		if (this.level == 1)
			left = 0;
		else{		
			iconCollapse = "image/themes/"+system.getThemes()+"/treeCollapse.png";
			left2 = ((this.owner.level-1) * 10) + 6 + (this.owner.level); 					
			left = left2 + 4;		
		}
		var html = "<div id='"+n+"_colCel' style='{position: absolute; top:0;width:100%; height: 20%;}'"+	
					"></div>" +				
					"<div id="+n+"_frameIcon' style='{cursor: pointer; position : relative; left: 0; top: 0; width: 50; height: 20;}' " +
	                    ">" +                   				//18
	                "</div>" +			
	                "<div id='" + n + "form' style='{display: none;position : relative; left: 0; top: 0; width: 100%; height: auto;overflow:auto;}'></div>";
		this.setInnerHTML(html, canvas);
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
	doFocusEdit: function(idx){
		try{
			var app = this.getApplication();
			this.parent.setRowIndex(this.rowIndex);
			if (app.getActiveForm().activeChildForm != undefined)
				app.getActiveForm().activeChildForm.setActiveControl(this.parent);
			var colHeader = this.parent.columns.get(idx);
			var input = $(this.getFullId()+"cell"+idx+"_input");
			if (input != undefined)
				if (colHeader.columnFormat == window.cfNilai)				
					input.value = RemoveTitik(input.value);
			this.onSelectCell.call(this, idx, this.rowIndex);
			this.Focused = true;			
			if (colHeader != null)
			{		
				switch(colHeader.buttonStyle)
					{
						case bsAuto :
								var ellips = $(this.parent.getFullId()+"_ellips");
								if ((ellips != null) && (ellips.style.display == ""))
									ellips.style.display = "none";
								var date = $(this.parent.getFullId()+"_date");
								if ((date != null) && (date.style.display == "")){
									date.style.display = "none";	
									if (app.pageDatePickerForm != undefined)
										app.pageDatePickerForm.hide();
								}
								break;
						case bsEllips :
								var combobox = $(this.parent.getFullId()+"_dropDown");
								if ((combobox != null) && (combobox.style.display == ""))
									combobox.style.display = "none";
								var date = $(this.parent.getFullId()+"_date");
								if ((date != null) && (date.style.display == "")){
									date.style.display = "none";	
									if (app.pageDatePickerForm != undefined)
										app.pageDatePickerForm.hide();
								}
								break;	
						case bsDate :
								var combobox = $(this.parent.getFullId()+"_dropDown");
								if ((combobox != null) && (combobox.style.display == ""))
									combobox.style.display = "none";
								var ellips = $(this.parent.getFullId()+"_ellips");
								if ((ellips != null) && (ellips.style.display == ""))
									ellips.style.display = "none";			
								break;	
						case bsNone :
								var combobox = $(this.parent.getFullId()+"_dropDown");
								if ((combobox != null) && (combobox.style.display == ""))
									combobox.style.display = "none";
								var ellips = $(this.parent.getFullId()+"_ellips");
								if ((ellips != null) && (ellips.style.display == ""))
									ellips.style.display = "none";	
								var date = $(this.parent.getFullId()+"_date");
								if ((date != null) && (date.style.display == "")){
									date.style.display = "none";	
									
								}
								break;
					}
				if (app.pageDatePickerForm != undefined)
					app.pageDatePickerForm.hide();	
				switch(colHeader.buttonStyle)
				{
					case bsEllips :
						var node = $(this.parent.getFullId()+"_ellips");
						var isThere = true;
						if (node == null){
							node = document.createElement("div");
							node.id = this.parent.getFullId()+"_ellips";
							node.style.position = "absolute";
							isThere = false;
						}				
						var top = this.parent.getRowTop(this.rowIndex, idx);
						var left = this.parent.getRowLeft(idx);
						node.style.display = "";				
						node.style.left = left + 5;
						node.style.top =top;
						node.style.background = "url(icon/"+system.getThemes()+"/btnfind.png)"; 
						node.style.width = 18;
						node.style.height = 19;
						node.style.cursor = "hand";
						
						var html = "<div style='{position:absolute; left: 0; top : 1; width:18px; height: 19px;}' "+
									"onclick = 'window.system.getResource("+this.resourceId+").ellipsClick(event,"+idx+")' "+
									"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+
									"onmouseout='window.system.getResource("+this.resourceId+").doMouseOut(event,"+idx+")'"+
									"onmouseover='window.system.getResource("+this.resourceId+").doMouseOver(event,"+idx+")'"+
									"></div>";
						this.setInnerHTML(html, node);
						if (!isThere)
							this.parent.getCanvas().appendChild(node);
						break;
					case bsAuto :
						var node = $(this.parent.getFullId()+"_dropDown");
						var isThere = true;
						if (node == null){
							node = document.createElement("div");
							node.id = this.parent.getFullId()+"_dropDown";
							node.style.position = "absolute";
							isThere = false;
						}				
			
						var top = this.parent.getRowTop(this.rowIndex, idx);
						var left = this.parent.getRowLeft(idx);
						node.style.display = "";	
						node.style.left = left - 15;
						node.style.top =top;
						node.style.background = "url(icon/"+system.getThemes()+"/combobox.png)"; 
						node.style.width = 18;
						node.style.height = 19;
						node.style.cursor = "hand";
						
						var html = "<div style='{position:absolute; left: 0; top : 1; width:18px; height: 19px;}' "+
									"onclick = 'window.system.getResource("+this.resourceId+").dropDownClick(event,"+idx+")' "+
									"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+
									"onmouseout='window.system.getResource("+this.resourceId+").doMouseOut(event,"+idx+")'"+
									"onmouseover='window.system.getResource("+this.resourceId+").doMouseOver(event,"+idx+")'"+
									
									"></div>";
						this.setInnerHTML(html, node);
						if (!isThere)
							this.parent.getCanvas().appendChild(node);
						break;
					case bsDate :
						var node = $(this.parent.getFullId()+"_date");
						var isThere = true;
						if (node == null){
							node = document.createElement("div");
							node.id = this.parent.getFullId()+"_date";
							node.style.position = "absolute";
							isThere = false;
						}				
			
						var top = this.parent.getRowTop(this.rowIndex, idx);
						var left = this.parent.getRowLeft(idx);
						
						node.style.display = "";	
						node.style.left = left - 15;
						node.style.top =top;
						node.style.background = "url(icon/"+system.getThemes()+"/dpicker.png)"; 
						node.style.width = 18;
						node.style.height = 19;
						node.style.cursor = "hand";
						
						var html = "<div style='{position:absolute; left: 0; top : 1; width:18px; height: 19px;}' "+
									"onclick = 'window.system.getResource("+this.resourceId+").dateClick(event,"+idx+")' "+
									"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+
									"onmouseout='window.system.getResource("+this.resourceId+").doMouseOut(event,"+idx+")'"+
									"onmouseover='window.system.getResource("+this.resourceId+").doMouseOver(event,"+idx+")'"+
									
									"></div>";
						this.setInnerHTML(html, node);
						if (!isThere)
							this.parent.getCanvas().appendChild(node);
						else
						{
							if (app.pageDatePickerForm != undefined)
								app.pageDatePickerForm.setTop(top + 18);	
						}
						break;
					
				}
				
				this.parent.setSelIndex(idx);
				this.parent.setRowIndex(this.rowIndex);
				this.selCellIdx = idx;
			}
		}catch(e){
				alert("[row grid]::focus"+e);
		}
	},
	ellipsClick: function(event, idx){
		this.onEllipsClick.call(this, idx,this.rowIndex);
	},
	dropDownClick: function(event, idx){
		try{	
			if ((window.dropDown == undefined) || (!window.dropDown.visible))
			{
				var x = event.clientX;
				var y = event.clientY;
				var step = "get colHeader";
				var colHeader = this.parent.columns.get(idx);
				step = "get canvas "+idx;
				var canvas = $(this.getFullId()+"cell"+idx+"_input");
				step = "get offset canvas";
				var width = canvas.offsetWidth;
				x  = this.parent.getRowLeft(idx) + 10;
				if (this.parent.owner != undefined)
					y  = this.parent.getRowTop(this.rowIndex, idx) + this.parent.owner.getTop() + this.parent.getTop() + 20;
				else y  = this.parent.getRowTop(this.rowIndex, idx) + this.parent.getTop() + 20;
				if (document.all)
					x = x - width + 18;				
				else
					x = x- width+22;								
				if (window.dropDown == undefined){
					uses("portalui_saiCB");
					step = "create dropdownBox";
					window.dropDown = new dropDownBox(window.system.activeApplication.activeForm);
				}
				step = "get picklist "+idx;
				this.pickList = this.parent.columns.get(idx).pickList;
				window.dropDown.onSelect.set(this, "dropDownBoxSelect");
				step = "set picklist "+idx;
				window.dropDown.setItems(this.pickList);
				step = "set width "+idx;
				window.dropDown.setWidth(width);	
				step = "set selected id "+this.selectedId;
				window.dropDown.setSelectedId(this.selectedId);
				step = "set left "+x;
				window.dropDown.setLeft(x + 1);
				var scrHeight = window.system.activeApplication.activeForm.getHeight();
				if ((y + window.dropDown.getHeight()) > scrHeight)
				{
					if (document.all)
						window.dropDown.setTop(y - window.dropDown.getHeight() + 1);
					else
						window.dropDown.setTop(y - window.dropDown.getHeight() - 1 );
				}
				else
					window.dropDown.setTop(y);
				step = "set dropdownBox bringtofront";
				window.dropDown.bringToFront();
				step = "set dropdownBox visible";
				window.dropDown.setVisible(true);
			}else window.dropDown.setVisible(false);
		}
		catch (e){
			alert("[rowGrid] :: dropDownClick : " + e+"\r\n"+step);
		}
	},
	dropDownBoxSelect: function(sender, selectedId, caption){
		this.setCellValue(this.selCellIdx, caption);
		this.selectedId = selectedId;
		window.dropDown.hide();
	},
	dateClick: function(event){
	    var x = event.clientX;
	    var y = event.clientY;
		var column = this.parent.columns.get(this.selCellIdx);
	    var canvas = $(column.getFullId());
	    var width = canvas.offsetWidth;

	    if (document.all)
	    {
	        x = (x - event.offsetX) - width + 17;
	        y = (y - event.offsetY) - 8;
	    }
	    else
	    {
	        x = (x - event.layerX) - width + 19;
	        y = (y - event.layerY) - 5;
	    }
		
		var app = this.getApplication();
		if (app.pageDatePickerForm == undefined)
			app.pageDatePickerForm = new portalui_datePickerForm(app);
	    app.pageDatePickerForm.onSelect.set(this, "pickerFormSelect");

	    app.pageDatePickerForm.setSelectedDate(this.year, this.month, this.day);
		var scrHeight = window.system.activeApplication.activeForm.getHeight();
	    app.pageDatePickerForm.setLeft(x);
	    if ((y + app.pageDatePickerForm.getHeight()) > scrHeight)
		{
			if (document.all)
				app.pageDatePickerForm.setTop(y - this.getHeight() - app.pageDatePickerForm.getHeight() + 1);
			else
				app.pageDatePickerForm.setTop(y - this.getHeight() - app.pageDatePickerForm.getHeight() - 1);
		}else
			app.pageDatePickerForm.setTop(y);
		app.pageDatePickerForm.bringToFront();
	    app.pageDatePickerForm.show();
	},
	pickerFormSelect: function(sender, yy, mm, dd){	
		this.year = yy;
	    this.month = mm;
	    this.day = dd;
	    var month = this.month;
	    if (month < 10)
	        month = "0" + month;
	    var caption = this.day + "/" +month + "/" + this.year;	
		this.setCellValue(this.selCellIdx, caption);
	},
	doMouseDown: function(event, idx){	
		var colHeader = this.parent.columns.get(idx);
		switch(colHeader.buttonStyle)
		{
			case bsEllips :
					var ellips = $(this.parent.getFullId()+"_ellips");
					if (ellips != null)
						ellips.style.display = "";
					break;
			case bsAuto :
					var combobox = $(this.parent.getFullId()+"_dropDown");
					if (combobox != null)
						combobox.style.display = "";
					break;	
			case bsDate :
					var date = $(this.parent.getFullId()+"_date");
					if (date != null)
						date.style.display = "";
					break;	
		}
		this.parent.setRowIndex(this.rowIndex);
	},
	doMouseOut: function(event, idx){
		if (!this.Focused)
		{
			var colHeader = this.parent.columns.get(idx);
			switch(colHeader.buttonStyle)
			{
				case bsEllips :
						var ellips = $(this.parent.getFullId()+"_ellips");
						if (ellips != null)
							ellips.style.display = "none";
						break;
				case bsAuto :
						var combobox = $(this.parent.getFullId()+"_dropDown");
						if (combobox != null)
							combobox.style.display = "none";					
						break;	
				case bsDate :
						var date = $(this.parent.getFullId()+"_date");
						if (date != null)
						{
							date.style.display = "none";
							//if (app.pageDatePickerForm != undefined)
							//	app.pageDatePickerForm.hide();
						}
						break;
			}
		}
	},
	doMouseOver: function(event, idx){
		var colHeader = this.parent.columns.get(idx);
		var app =this.getApplication();
		switch(colHeader.buttonStyle)
		{
			case bsEllips :
					var ellips = $(this.parent.getFullId()+"_ellips");
					if (ellips != null)
						ellips.style.display = "";				
					break;
			case bsAuto :
					var combobox = $(this.parent.getFullId()+"_dropDown");
					if (combobox != null)
						combobox.style.display = "";
					break;	
			case bsDate :
					var date = $(this.parent.getFullId()+"_date");
					if (date != null)
					{
						date.style.display = "";
						if (app.pageDatePickerForm != undefined)
							app.pageDatePickerForm.hide();
					}
					break;
		}
	},
	keyPress: function(event, index){
	},
	doKeyDown: function(event, index){
	},
	doLostFocusEdit: function(colId){	
		this.onCellExit.call(this, colId, this.rowIndex);	
	},
	addCell: function(colCount, values){
		var node = $(this.getFullId()+"_colCel");
		var value = undefined;
		this.values = values;
		var formatAlign = undefined;
		for (var i = 0; i < colCount; i++)
		{
			var colHeader = this.parent.columns.get(i);
			if (i == 0)
			{
				var cnv = $(this.getFullId() + "_frameIcon");
				if (cnv != undefined)
					cnv.style.width = colHeader.getWidth();
			}
			
			if (colHeader.columnFormat == window.cfNilai)
			  formatAlign = "text-align = right;";
		    else formatAlign = "";
			if (values != undefined)
				value = values[i];
			else value = "";
			this.cols.set(i, value);
			
			nodeCel = document.createElement("div");
			len = i + 1;
			nodeCel.id = this.getFullId()+"_cell"+len;
			var colIdx = len - 1;
			len = this.rowIndex * 19;
			nodeCel.style.position = "absolute";
			nodeCel.style.top = 0;
//		nodeCel.style.background = "#F0F9EF";
			
			if (document.all)
			{
				nodeCel.style.left = colHeader.getLeft();
				nodeCel.style.width = colHeader.getWidth();
				nodeCel.style.height = 19;
			}else
			{
				nodeCel.style.top = 0;			
				nodeCel.style.left = colHeader.getLeft();
				nodeCel.style.width = colHeader.getWidth()-1;
				nodeCel.style.height = 19;
			}
			
			nodeCel.style.height = "19px";
			if (!colHeader.readOnly)
			{
				if (document.all)
				{
					value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"'  "+
							" style='position:absolute; top:-1; width:"+colHeader.getWidth()+"px;height:20;font-size:9; "+
							" "+formatAlign+" background:"+colHeader.color+";border:#919B9B 1px solid;' "+
							" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+");'"+
							" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+							
							"/>";
				}else
				{
					value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"' "+
							" style='position:absolute; top:0; width:"+colHeader.getWidth()+"px;height:20; font-size:9;"+
							" border:#919B9B 1px solid; "+formatAlign+" background:"+colHeader.color+";' "+
							" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+")'"+
							" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+
							"/>";
				}
		
			}else
			{
				if (colHeader.fixedCol)
				{
					if (document.all)
					{
						nodeCel.style.top = -1;
						nodeCel.style.height = 20;
					}else
					{
						nodeCel.style.top = 0;
						nodeCel.style.height = 18;					
					}
					nodeCel.style.background = colHeader.color;;			
					nodeCel.style.border = "#919B9B 1px solid";
					var left = (this.level) * 12;
					value = "<span id="+this.getFullId+"_treevalue' align='center' style='position:absolute; left : 2; "+
							"top : 1; width:100%; height:100%;'>"+value+"</span>";
				}else
				{
					nodeCel.style.height = "19px";
					if (document.all)
					{
						value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"'  readonly "+
								" style='position:absolute; top:-1; width:"+colHeader.getWidth()+"px;height:20;font-size:9; "+
								" "+formatAlign+" background:#ccdddc;border:#919B9B 1px solid;' "+
								" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+");'"+
								" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+							
								"/>";
					}else
					{
						value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"' readonly "+
								" style='position:absolute; top:0; width:"+colHeader.getWidth()+"px;height:20; font-size:9;"+
								" border:#919B9B 1px solid; "+formatAlign+" background:#ccdddc;' "+
								" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+")'"+
								" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+
								"/>";
					}
				}
				
			}
			nodeCel.innerHTML = "<div id='"+this.getFullId()+"_cellValue"+colIdx+"' "+
									" style='position:absolute;left:0; top:0; height:100%; width:"+colHeader.getWidth()+"px; "+
									" ' "+
									" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")'; "+
									" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")'; "+
									" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+this.rowIndex+","+colIdx+")'; "+
									" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+this.rowIndex+","+colIdx+")'; "+	
									" > "+value+"</div>";	
			node.appendChild(nodeCel);	
			var inputText = undefined;
			if ((!colHeader.readOnly)&&(colHeader.columnFormat == window.cfNilai))
			{
				inputText = $(this.getFullId()+"cell"+colIdx+"_input");
				if (inputText != undefined)			
					inputText.style.textAlign = "right";
					
			}
		}
	},
	setCellValue: function(index, value){
		if (this.readOnly){
			var node = $(this.getFullId()+"cell"+index+"_input");	
			node.value = value;		
		}else
		{
			var node = $(this.getFullId()+"cell"+index+"_input");	
			node.value = value;		
		}
		this.cols.del(index);
		this.cols.set(index, value);
		delete this.values[index];
		this.values[index] = value;
	},
	getCellValue: function(colIndex){
		var node = $(this.getFullId()+"cell"+colIndex+"_input");	
		value = node.value ;		
		return value;
	},
	setButtonStyle: function(data){
		this.buttonStyle = data;
	},
	refreshRow: function(colStart){
		var node = $(this.getFullId()+"_colCel");
		var colCount = this.parent.columns.getLength();
		
		var combobox = $(this.parent.getFullId()+"_dropDown");
		if ((combobox != null) && (combobox.style.display == ""))
			combobox.style.display = "none";
		var ellips = $(this.parent.getFullId()+"_ellips");
		if ((ellips != null) && (ellips.style.display == ""))
			ellips.style.display = "none";	
		var date = $(this.parent.getFullId()+"_date");
		if ((date != null) && (date.style.display == ""))
		{
			date.style.display = "none";	
			
		}
		if (colStart == 0)
		{
			var colHeader = this.parent.columns.get(i);
			var cnv = $(this.getFullId() + "_frameIcon");
			if ((cnv != undefined)&& (colHeader != undefined))
				cnv.style.width = colHeader.getWidth();
		}
		
		for (var i = colStart; i < colCount; i++)
		{
			var len = i + 1;
			var value = this.values[i];
			this.cols.set(i, value);
			var nodeCel = $(this.getFullId()+"_cell"+len);
			var isThere = true;
			var colIdx = len - 1;
			if (nodeCel == null)
			{
				nodeCel = document.createElement("div");
				nodeCel.id = this.getFullId()+"_cell"+len;
				
				len = this.rowIndex * 19;
				nodeCel.style.position = "absolute";
				nodeCel.style.top = 0;
//			nodeCel.style.background = "#F0F9EF";
				isThere = false;
			}
			var colHeader = this.parent.columns.get(i);
			nodeCel.style.left = colHeader.getLeft();
			nodeCel.style.width = colHeader.getWidth();
					
			if (colHeader.fixedCol)
				if (document.all) nodeCel.style.height = "20px";
				else 	nodeCel.style.height = "18px";
			else
				nodeCel.style.height = "19px";
			if (document.all)
			{
				nodeCel.style.left = colHeader.getLeft();
				nodeCel.style.width = colHeader.getWidth();
			}else
			{
				nodeCel.style.top = 0;
				nodeCel.style.left = colHeader.getLeft() ;
				nodeCel.style.width = colHeader.getWidth() - 1;
			}
			if (isThere)
			{

				nodeInput = $(this.getFullId()+"cell"+colIdx+"_input");		
				
				if (nodeInput != undefined)
				{
				  nodeInput.style.width = colHeader.getWidth();
				  if (colHeader.columnFormat == window.cfNilai)
					  nodeInput.align = "right";
				  else nodeInput.align = "";
				}
			}
			
			if (!isThere)
			{
				if (!colHeader.readOnly)
				{
					if (document.all)
					{
						value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+
								"' style='position:absolute; top:0; width:"+colHeader.getWidth()+"px;height:19;font-size:9;"+
								" "+formatAlign+" background:"+colHeader.color+";border:small solid #919B9B;' "+
								" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+")'"+
			   					" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+														
								"/>";
					}else
					{
						value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"' "+
							" style='position:absolute; top:0; width:"+colHeader.getWidth()+"px;height:20; font-size:9;"+
							" border:#919B9B 1px solid; "+formatAlign+" background:"+colHeader.color+";' "+
							" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+")'"+
							" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+													
							"/>";
					}
			
				}
				else
				{	if (colHeader.fixedCol)
					{
						if (document.al)
						{
							nodeCel.style.top = 0;
							nodeCel.style.height = 20;
						}else
						{
							nodeCel.style.top = 0;
							nodeCel.style.height = 18;
						}
						nodeCel.style.background = colHeader.color;;			
						nodeCel.style.border = "#919B9B 1px solid";
						
					}else
					{
						if (document.all)
						{
							value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"'  readonly "+
									" style='position:absolute; top:-1; width:"+colHeader.getWidth()+"px;height:20;font-size:9; "+
									" "+formatAlign+" background:#ccdddc;border:small solid #919B9B;' "+
									" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+");'"+
									" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+							
									"/>";
						}else
						{
							value = "<input id='"+this.getFullId()+"cell"+colIdx+"_input' value='"+value+"' readonly "+
									" style='position:absolute; top:0; width:"+colHeader.getWidth()+"px;height:20; font-size:9;"+
									" border:#919B9B 1px solid;  "+formatAlign+" background:#ccdddc;' "+
									" onfocus='window.system.getResource("+this.resourceId+").doFocusEdit("+colIdx+")'"+
									" onblur='window.system.getResource("+this.resourceId+").doLostFocusEdit("+colIdx+")'"+
									"/>";
						}
					}
				}
				nodeCel.innerHTML = "<div id='"+this.getFullId()+"_cellValue"+colIdx+"' "+
										" style='position:absolute;left:0; top:0; height:100%; width:"+colHeader.getWidth()+"px;' "+
										" onDblClick = 'window.system.getResource("+this.resourceId+").eventDoubleClick(event, "+colIdx+")' "+
										" onClick = 'window.system.getResource("+this.resourceId+").eventClick(event, "+colIdx+")' "+
										" onMouseOver = 'window.system.getResource("+this.resourceId+").eventMouseOver(event, "+this.rowIndex+","+colIdx+")' "+
										" onMouseOut = 'window.system.getResource("+this.resourceId+").eventMouseOut(event, "+this.rowIndex+","+colIdx+")' "+	
										">"+value+"</div>";			
				node.appendChild(nodeCel);	
			}
		}	
	},
	eventDoubleClick: function(event, idx){
		this.parent.setRowIndex(this.rowIndex);
		this.onDblClick.call(this, idx, this.rowIndex);
	},
	eventClick: function(event, idx){
		this.onClick.call(this, idx, this.rowIndex);
		this.onSelectCell.call(this, idx, this.rowIndex);
		this.parent.setRowIndex(this.rowIndex);
	},
	eventMouseOver: function(event, idx, colId){
		var canvas = this.getCanvas();
		canvas.style.background = "#dbe475";
		var input = undefined;
		for (var i = 0; i < this.parent.columns.getLength();i++)
		{
			input = $(this.getFullId()+"cell"+i+"_input");
			if (input != undefined)
				input.style.background = "#dbe475";		
		}
	},
	eventMouseOut: function(event, idx, colId){
		var canvas = this.getCanvas();
		var color = undefined;
		
		var input = undefined;
		var colHeader = undefined;
		for (var i = 0; i < this.parent.columns.getLength();i++)
		{
			input = $(this.getFullId()+"cell"+i+"_input");
			colHeader = this.parent.columns.get(i);
			if (input != undefined)
			{
				if (this.selected)
				{
					canvas.style.background = "#bce4f5";
					color = "#bce4f5";
				}else
				{
					canvas.style.background = "";
					if (colHeader.readOnly)
						color = "#ccdddc";
					else
						color = colHeader.color;
				}
				input.style.background = color;		
			}
		}
	},
	setSelected: function(data){
		this.selected = data;
		var canvas = this.getCanvas();
		var color = undefined;	
		var input = undefined;
		for (var i = 0; i < this.parent.columns.getLength();i++)
		{
			input = $(this.getFullId()+"cell"+i+"_input");
			colHeader = this.parent.columns.get(i);
			if (input != undefined)
			{
				if (this.selected)
				{
					canvas.style.background = "#bce4f5";
					color = "#bce4f5";
				}else
				{
					canvas.style.background = "";
					if (colHeader.readOnly)
						color = "#ccdddc";
					else
						color = colHeader.color;
				}
				input.style.background = color;		
			}
		}
	},
	setFirstFocus: function(){
		if (this.selected){
			for (var i = 0; i < this.parent.columns.getLength();i++)
			{
				col = this.parent.columns.get(i);
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
		for (var i = 0; i < this.parent.columns.getLength();i++)
		{
			col = this.parent.columns.get(i);
			if ((!col.readOnly))
			{
				result = i;
			}
		}
		return result;
	},
	isLastNotReadOnly: function(col){	
		return (col == this.getLastNotReadOnly());
	},
	setColor: function(data){
		var canvas = this.getCanvas();
		this.color = data;
	},
	addChild: function(child){
		window.app_builder_component_controls_mdGridItem.prototype.parent.addChild.call(this, child);	
		if (this.childs.getLength() > 0)
		{
			var obj = undefined;
			for (var i in this.childs.objList)
			{
				obj = window.system.getResource(this.childs.objList[i]);
			}
			if (obj != undefined)
			{
				node = $(obj.getFullId() + "_icon");
				if (node != undefined)
				{
					node.style.background = "url(image/themes/"+system.getThemes()+"/treeVert.png) no-repeat";	
				}
			}
		}
		var node = $(this.getFullId() + "_collapse");
		if (node != undefined)
		{
			node.style.display = "";						
		}
		
		node = $(this.getFullId() + "_nocollapse");

		if (node != undefined)
		{
			node.style.display = "";						
		}
		node = $(this.getFullId() + "_icon");			
		if (node != undefined)
		{
			node.style.display = "";
		}
		node = $(this.getFullId() + "_iconHorz");			
		if (node != undefined)
			node.style.display = "none";	
			
	},
	expand: function(){
	    var node = $(this.getFullId() + "form");
	    if (node != undefined)
		{
	        node.style.display = "";
		}
	    node = $(this.getFullId() + "_collapse");

	    if (node != undefined)
	        node.style.backgroundPosition = "bottom left";
			
		node = $(this.getFullId() + "_nocollapse");

	    if (node != undefined)
	        node.style.backgroundPosition = "bottom left";
		
		node = $(this.getFullId() + "_no");
		if (node != undefined)
			node.style.height = this.detailHeight + 20;
	},
	collapse: function(){
	    var node = $(this.getFullId() + "form");

	    if (node != undefined)
		{
	        node.style.display = "none";
			var canvas = this.getCanvas();
			if (canvas != undefined)
			{
//			canvas.style.background = "#f5f4e2";
//			canvas.style.background = "url(icon/treeCol.png)";
			}
		}
	    node = $(this.getFullId() + "_collapse");

	    if (node != undefined)
	        node.style.backgroundPosition = "top left";
			
		node = $(this.getFullId() + "_nocollapse");
	    if (node != undefined)
	        node.style.backgroundPosition = "top left";
			
		node = $(this.getFullId() + "_no");
		if (node != undefined)
			node.style.height = 20;
			
		node = $(this.grid.getFullId() + "_frame");
		node2 = $(this.grid.getFullId() + "form");
		if (node != undefined)
		{
			if (node.offsetHeight > node2.offsetHeight)
			{
				var colNo = $(this.grid.getFullId()+ "_no");				
				colNo.style.top = 20;			
			}else
			{
				this.grid.doScroll();			
			}
		}
	},
	doDeselect: function(sender){
	    var node = $(this.getFullId() + "_caption");
	    if (node != undefined){
	        node.style.backgroundColor = "";
	        node.style.color = system.getConfig("text.normalColor");
	    }
	},
	treeMouseDown: function(event){
		try{
			var tree = this.getTree();
			
		//	if (tree.popup.menuForm.visible)
		//		tree.popup.menuForm.setVisible(false);
			
			if (tree != undefined)
				tree.doSelectItem(this);
			
			var node = $(this.getFullId() + "_caption");
		
			if (node != undefined)
			{
				node.style.backgroundColor = system.getConfig("text.highlightBgColor");
				node.style.color = system.getConfig("text.highlightColor");
			}
			
			node = $(this.getFullId() + "_icon");
		
			if (node != undefined)
			{
				if (this.level > 1)
				{
					var left = (this.parent.level - 1) * 10;
					node.style.left = left;	
				}			
			}
//		this.onSelect.call(this);
			this.clicked = true;
			this.isRightClick = system.getButton(event) == 2;
		}catch(e){
			alert("[treeGridItem]::treeMouseDown:"+e);
		}
	},
	treeMouseUp: function(event){
		if (this.clicked){
			var tree = this.getTree();
			var selNode = tree.getSelectedItem();
			if ((selNode.getKode() != this.getKode())) //favorite(this.getKode() == '99999') && 
			{			
				if (selNode.owner instanceof portalui_mdGridItem)
					if (selNode.owner.getKode() != this.getKode()) 
					{												   
						var kode = selNode.getKode();
						var capt = selNode.getCaption();
						var kodeForm = selNode.getKodeForm();
						var node = new treeNode(this);
						node.setKode(kode);
						node.setCaption(capt);
						node.setKodeForm(kodeForm);
					}
			}
			this.clicked = false;
		}
	    var target = (document.all) ? event.srcElement : event.target;

	    var n = this.getFullId();

	    if ((target != undefined) && (target.id == (n + "_frame")))
	        window.app_builder_component_controls_mdGridItem.prototype.parent.eventMouseUp.call(this, event);
	},
	treeMouseMove: function(event){
	    var target = (document.all) ? event.srcElement : event.target;

	    var n = this.getFullId();

	    if ((target != undefined) && (target.id == (n + "_frame")))
	        window.app_builder_component_controls_mdGridItem.prototype.parent.eventMouseUp.call(this, event);
		if (this.clicked)
		{
			var x = event.clientX;
			var y = event.clientY;		
		}
	},
	treeDblClick: function(event){
		if (this.isHasChild())
		{
		   if (this.isExpanded())
			   this.collapse();
		   else
			   this.expand();
		}
		var tree = this.getTreeGrid();
	    tree.onDblClick.call(this);
	},
	treeCollapseMouseDown: function(event){
		try{
			if (this.isExpanded())
				this.collapse();
			else{
				this.expand();
				this.owner.onExpand.call(this);
			}
		}catch(e)
		{
			alert("[treeGridItem]::treeCollapseMouseDown:"+e);
		}
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
	    if (this.caption != data){
			var kode = this.getKodeForm();
			
	        this.caption = data;
	 		if (kode != "-" )		
				data =  kode + " - " +data;
	        var node = $(this.getFullId() + "_caption");
			if (node != undefined)
	            node.innerHTML = "<nobr>&nbsp;" + data + "&nbsp;</nobr>";
	        
			var width = (data.length * 6) + this.leftFrame;			
			var tree = this.getTreeGrid();	
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
	    var result = this.owner;

	    while ((result != undefined) && !(result instanceof portalui_mdGrid))
	    {
	        result= result.getOwner();
	    }

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
			canvas.style.background = data;	
	},
	getColor: function(){
		return this.color;
	},
	getTreeGrid: function(){
		var parent = this.owner;
		
		while (!(parent instanceof portalui_mdGrid))	
			parent = parent.owner;
		return parent;
	},
	lastChild: function(){
		if (this.childs.getLength() > 0 )	
		{
			var obj = this.childs.get(this.childs.getLength() - 1);		
		} else result = true;
		return result;
	},
	setVertLine: function(){	
		var cnv = $(this.getFullId() +"_iconVert");
		var iconDiv = undefined;
		for (var i = 0; i < (this.level - 1);i++)
		{
			iconDiv = document.createElement("div");		
			iconDiv.id = this.getFullId() +"_icon"+this.rowIndex+"_"+i;		
			iconDiv.style.position = "absolute";
			iconDiv.style.left = (i * 10) + 7 + i;
			iconDiv.style.width = 2;
			iconDiv.style.height = 22;
			iconDiv.style.top = 0;
			iconDiv.style.background = "url(image/themes/"+system.getThemes()+"/treeVert.png) no-repeat";
			cnv.appendChild(iconDiv);
		}	
	},
	setDataCaption: function(data){
		var cnv = $(this.getFullId() +"_caption");
		this.dataCaption = data;
		if (cnv != undefined)
		{
			cnv.innerHTML = "<span align='center' style='position:absolute; left : 2; "+
							"top : 1; width:100%; height:100%;'>"+data+"</span>";;
		}
	},
	setDetailHeight: function(data){
		var form = $(this.getFullId() +"form");
		form.style.height = data;
		this.detailHeight = data;	
	},
	setWidth: function(data){
		window.app_builder_component_controls_mdGridItem.prototype.parent.setWidth.call(this, data);
		var form = $(this.getFullId() +"form");
		form.style.width = data;
	}
});