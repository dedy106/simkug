//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_saiGrid = function(owner, options){
	if (owner){
		try{
			this.height = 200;
			this.widthColNo = 25;
			window.app_builder_component_controls_saiGrid.prototype.parent.constructor.call(this, owner);	
			this.className = "portalui_saiGrid";
			this.year = (new Date()).getFullYear();
			this.month = (new Date()).getMonth() + 1;
			this.day = (new Date()).getDate();
				
			this.readOnly = false;
			this.colCount = 0;
			this.rowCount = 0;			
			this.colCanvas = [];
			this.noCanvas = [];			
			this.mouseClick = false;
			this.mouseX = 0;	
			this.selIndex = 0;
			this.maxRowShow = 0;
			this.maxColShow = 0;
			this.topIndex = 0;
			this.leftIndex = 0;
			this.col = 0;
			this.row = 0;			
			this.columns = new portalui_arrayMap();
			this.rows = new portalui_arrayMap();
			this.Values = new portalui_arrayMap();				
			this.onEllipsClick = new portalui_eventHandler();
			this.onNilaiChange = new portalui_eventHandler();
			this.titleFromData = false;				
			this.onDblClick = new portalui_eventHandler();
			this.onClick = new portalui_eventHandler();
			this.onSelectCell = new portalui_eventHandler();
			this.onKeyDown = new portalui_eventHandler();
			this.onKeyPress = new portalui_eventHandler();
			this.onCellExit = new portalui_eventHandler();
			this.onCellEnter = new portalui_eventHandler();
			this.onChange = new portalui_eventHandler();			
			this.totFixedCol = 0;
			this.title = [];
			this.pressKeyDown = false;
			this.rowSelect = false;
			this.fixColor = system.getConfig("form.grid.fixedColor");//"#084972";//"#c4c4a3";		
			uses("app_builder_component_controls_rowGrid;app_builder_component_controls_column");			
			//------------			
			this.first = false; //eventKeyPress			
			this.btnVisible = true;
			this.allowAutoAppend = true;
			this.addHeader = "";
			
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.autoAppend!== undefined) this.setAllowAutoAppend(options.autoAppend);
				if (options.colCount !== undefined) this.setColCount(options.colCount);
				if (options.colTitle !== undefined) this.setColTitle(options.colTitle);
				if (options.colFormat !== undefined) this.setColFormat(options.colFormat[0],options.colFormat[1]);				
				if (options.colWidth !== undefined) this.setColWidth(options.colWidth[0],options.colWidth[1]);
				if (options.buttonStyle !== undefined) this.setButtonStyle(options.buttonStyle[0],options.buttonStyle[1]);				
				if (options.defaultRow !== undefined) this.clear(options.defaultRow);
			}
			this.addProperty({className:this.className,autoAppend:this.autoAppend, colCount:this.colCount, colTitle:this.colTitle, fixColor:this.fixColor,readOnly:this.readonly, rowCount:this.rowCount, widthColNo:this.widthColNo});	
			this.addEvent({dblClick:"",click:"",selectCell:"",keyDown:"",keyPress:"",cellExit:"",cellEnter:"",change:""});
		}catch(e){
			systemAPI.alert("saiGrid:create:"+e);
		}
	}
};
window.app_builder_component_controls_saiGrid.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_saiGrid.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.background = system.getConfig("form.grid.color");
		canvas.style.overflow = "hidden";
		canvas.style.borderTop =  window.system.getConfig("3dborder.outer.top");
		canvas.style.borderBottom =  window.system.getConfig("3dborder.outer.bottom");
		canvas.style.borderLeft =  window.system.getConfig("3dborder.outer.top");
		canvas.style.borderRight =  window.system.getConfig("3dborder.outer.bottom");
		canvas.className = this.className;
		var h = this.height - 20; 
		var w = this.width - this.widthColNo;
		var html =  "<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' frameborder='0' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;z-index:999}'></iframe>" +
					"<div id='"+n+"_header' style='{position:absolute;overflow:visible;left: "+this.widthColNo+";top: 0; width:100%; height:20px;}'>"+
					"</div>"+
					"<div id='"+n+"_no' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabContent.png) top left no-repeat;background-color:"+system.getConfig("form.grid.fixedColor")+"; overflow:visible;left: 0;top: 0; width:"+this.widthColNo+"; height:100%;}'>"+
					"</div>"+
					"<div id='"+n+"_topLeft' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabCont.png) top left no-repeat;background-color:#084972;"+
						"left: 0;top: 0; width:"+(this.widthColNo)+"; height:20px; "+
						"border-top: "+window.system.getConfig("3dborder.inner.top")+";"+
						"border-bottom: "+window.system.getConfig("3dborder.inner.bottom")+";"+
						"border-left: "+window.system.getConfig("3dborder.inner.top")+";"+
						"border-right: "+window.system.getConfig("3dborder.inner.bottom")+";"+
						"}' "+
						" onclick ='system.getResource("+this.resourceId+").doTopLeftClick(); ' "+
						">"+
					"</div>"+
					"<div id='"+n+"form' style='{position:absolute;left: "+this.widthColNo+";top: 20; width: "+w+"px; height: "+h+"px; overflow: auto;}' onscroll='window.system.getResource("+this.resourceId+").doScroll(event)' >"+
						//"<div style='{position:absolute;left: 0;top: 0; width: 100%; height: 100%; overflow: visible;}'>  "+				
						//"</div>"+					
						"<input id='"+n+"_inplaceEdit' type='text'  value='' "+
						"style='{display:none;width:80px;height:"+(document.all ? "18":"20")+"px;"+
						"position:absolute;left:0;top:0;border:small solid #FF00FF;color:#000000;z-index:999999;"+
						"border-width:1;}' "+
						"onkeypress='return system.getResource(" + this.resourceId + ").eventKeyPress(event);' "+
						"onkeydown='return system.getResource(" + this.resourceId + ").eventKeyDown(event);' "+
						"onfocus='window.system.getResource(" + this.resourceId + ").doFocusEdit(event);' "+
						"onblur='window.system.getResource(" + this.resourceId + ").eventExit(event);' " +						
						"/>"+
					"</div>"+																	
					"<div id='"+n+"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left: "+(w / 2 - 25)+";top: "+(h / 2 + 25)+";width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
		this.setInnerHTML(html, canvas);
		this.cnvNo = $(n +"_no");
		this.cnvHeader = $(n +"_header");
		this.inplaceEdit = $(n +"_inplaceEdit");
		this.frame = $(n +"form");
		this.canvas = canvas;
	},
	eventExit: function(event){
	},
	
	exitInplace: function(){
		try{
			var target = this.inplaceEdit;
			if (this.inplaceEdit.style.display == "")
				this.setCell(target.col, target.row, target.value);
			target.style.display = "none";	
			if (this.btnEllips) this.btnEllips.style.display = "none";
			if (this.btnDropDown) this.btnDropDown.style.display = "none";
			if (this.btnDate) this.btnDate.style.display = "none";
		}catch(e){
			systemAPI.alert("exitInplace:"+e,"");
		}
	},
	doFocusEdit: function(event){
		try{		
			var app = this.getApplication();
			var target = document.all ? event.srcElement : event.target;		
			var colHeader = this.columns.get(target.col);
			var rowIndex = target.row;
			var idx = target.col;
			if (colHeader.columnFormat == window.cfNilai)
			{
				 var txt = target.value;
				 target.value = RemoveTitik(txt);
			}		
			if (colHeader != null)
			{		
				this.hideButton(rowIndex, idx);
				this.showButton(rowIndex, idx);											
			}
		}catch(e){
			systemAPI.alert("[sai Grid]::focusEdit:"+e,"");
		}
	},
	hideButton: function(rowIndex, idx){
		if (!this.btnVisible) return;
		var colHeader = this.columns.get(idx);
		if (colHeader == undefined) return;
		var app = this.getApplication();
		switch(colHeader.buttonStyle)
		{
			case bsAuto :
					var ellips = this.btnEllips;
					if ((ellips != null) && (ellips.style.display == ""))
						ellips.style.display = "none";
					var date = this.btnDate;
					if ((date != null) && (date.style.display == "")){
						date.style.display = "none";	
						if (app.systemDatePickerForm != undefined)
							app.systemDatePickerForm.hide();
					}
					break;
			case bsEllips :
					var combobox = this.btnDropDown;
					if ((combobox != null) && (combobox.style.display == ""))
						combobox.style.display = "none";
					var date = this.btnDate;
					if ((date != null) && (date.style.display == "")){
						date.style.display = "none";	
						if (app.systemDatePickerForm != undefined)
							app.systemDatePickerForm.hide();
					}
					break;	
			case bsDate :
					var combobox = this.btnDropDown;
					if ((combobox != null) && (combobox.style.display == ""))
						combobox.style.display = "none";
					var ellips = this.btnEllips;
					if ((ellips != null) && (ellips.style.display == ""))
						ellips.style.display = "none";			
					break;	
			case bsNone :
					var combobox = this.btnDropDown;
					if ((combobox != null) && (combobox.style.display == ""))
						combobox.style.display = "none";
					var ellips = this.btnEllips;
					if ((ellips != null) && (ellips.style.display == ""))
						ellips.style.display = "none";	
					var date = this.btnDate;
					if ((date != null) && (date.style.display == ""))
						date.style.display = "none";														
					break;
		}
		if (app.systemDatePickerForm != undefined)
		app.systemDatePickerForm.hide();		
	},
	showButton: function(rowIndex, idx){
		if (!this.btnVisible) return;
		var colHeader = this.columns.get(idx);
		if (colHeader == undefined) return;
		switch(colHeader.buttonStyle)
		{
			case bsEllips :
				var node = this.btnEllips;
				var isThere = true;
				if (node == null){
					
					node = document.createElement("div");
					node.id = this.getFullId()+"_ellips";
					node.style.position = "absolute";
					node.style.cursor = "pointer";
					isThere = false;
					this.btnEllips = node;
				}				
				var top = this.getRowTop(rowIndex, idx);
				var left = this.getRowLeft(idx);
				node.style.display = "";				
				node.style.left = left + 5;
				node.style.top =top;
				node.style.background = "url(icon/"+system.getThemes()+"/btnfind.png)"; 
				node.style.width = 18;
				node.style.height = 19;
				node.style.cursor = "hand";
				
				var html = "<div style='position:absolute; left: 0; top : 1; width:18px; height: 19px;' "+
							"onclick = 'window.system.getResource("+this.resourceId+").ellipsClick(event,"+idx+")' "+
							"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+							
							"></div>";
				node.innerHTML = html;
				if (!isThere)
					this.canvas.appendChild(node);
				break;
			case bsAuto :		
				var node = this.btnDropDown;
				var isThere = true;
				if (node == null){
					
					node = document.createElement("div");
					node.id = this.getFullId()+"_dropDown";
					node.style.position = "absolute";
					node.style.cursor = "pointer";
					isThere = false;
					this.btnDropDown = node;
				}				
				var top = this.getRowTop(rowIndex, idx);
				var left = this.getRowLeft(idx);
				node.style.display = "";	
				node.style.left = left - 15;
				node.style.top =top;
				node.style.background = "url(icon/"+system.getThemes()+"/combobox.png)"; 
				node.style.width = 18;
				node.style.height = 19;
				node.style.cursor = "pointer";
				
				var html = "<div style='position:absolute; left: 0; top : 1; width:18px; height: 19px;' "+
							"onclick = 'window.system.getResource("+this.resourceId+").dropDownClick(event,"+idx+")' "+
							"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+														
							"></div>";
				node.innerHTML = html;
				if (!isThere)
					this.canvas.appendChild(node);
				break;
			case bsDate :
				var node = this.btnDate;
				var isThere = true;
				if (node == null){
					
					node = document.createElement("div");
					node.id = this.getFullId()+"_date";
					node.style.position = "absolute";
					isThere = false;
					this.btnDate = node;
				}				

				var top = this.getRowTop(rowIndex, idx);
				var left = this.getRowLeft(idx);
				
				node.style.display = "";	
				node.style.left = left - 15;
				node.style.top =top;
				node.style.background = "url(icon/"+system.getThemes()+"/dpicker.png)"; 
				node.style.width = 18;
				node.style.height = 19;
				node.style.cursor = "pointer";
				
				var html = "<div style='position:absolute; left: 0; top : 1; width:18px; height: 19px;' "+
							"onclick = 'window.system.getResource("+this.resourceId+").dateClick(event,"+idx+")' "+
							"onmousedown='window.system.getResource("+this.resourceId+").doMouseDown(event,"+idx+")'"+						
							"></div>";
				node.innerHTML = html;
				if (!isThere)
					this.canvas.appendChild(node);
				else{
					if (app.systemDatePickerForm != undefined)
						app.systemDatePickerForm.setTop(top + 18);	
				}
				break;
			
		}
	},
	eventKeyPress: function(event){	
		var keyCode = document.all ? event.keyCode: event.which;
		var charCode = document.all ? system.charCode[event.keyCode] : system.charCode[event.charCode];		
		var input = this.inplaceEdit;				
		if (cfNilai == this.columns.get(this.col).columnFormat && charCode != undefined)
		{		
			var start = input.selectionStart;		
			var reg = /\d/;		
			var isFirstN = true ? charCode == '-' && input.value.indexOf('-') == -1 && start == 0: false;
			var isFirstD = true ? charCode == ',' && input.value.indexOf(',') == -1 : false;
			if (!(reg.test(charCode)) && (!isFirstN) && (!isFirstD))
				return false;
		}
		return 	true;
	},
	eventKeyDown: function(event){
		try{
			window.system.buttonState.set(event);
			var tab = false;
			if (event.keyCode == 9)
				tab = true;					
			if ((event.keyCode == 13 || event.keyCode == 9))
			{				
				if (this.col + 1< this.columns.getLength()) 
					this.setRowIndex(this.row, this.col + 1);
				else if ( this.row + 1 < this.rows.getLength())
					this.setRowIndex(this.row+1, 0);				
				else if (this.rowValid(this.row) && this.row + 1 == this.rows.getLength()){
					if (this.owner.allowAutoAppend){
						this.appendRow();
						this.setRowIndex(this.row+1, 0);				
					}else {
						this.setRowIndex(this.row, 0);				
					}
				}else this.setRowIndex(this.row, 0);				
				if (!this.columns.get(this.col).readOnly){					
					var rows = this.rows.get(this.row);			
					rows.showInplaceEdit(this.col);
				}
				this.pressKeyDown = false;	
			}else if ((event.keyCode == 40)&&(!this.pressKeyDown))
			{
				this.pressKeyDown = true;	
			}else if (event.keyCode != 40)
				this.pressKeyDown = false;		
			this.onKeyDown.call(this, event.keyCode, window.system.buttonState);    
			if (tab)
				return false;
			else return true;
		}catch(e){
			systemAPI.alert("grid KeyDown:"+e+" "+event.keyCode,"");
		}
	},
	doSizeChange: function(width, height){		
		this.frame.style.width = width - this.widthColNo;
		this.frame.style.height = height - 20;
	},
	doScroll: function(event){
		try{
			var step = "init";
			var n = this.getFullId();	
		    var frame = this.frame;//$(n + "_frame");
		    var header = this.cnvHeader;//$(n + "_header");
			header.style.left = -frame.scrollLeft + this.widthColNo;
			step = "colNo";
			var colNo = $(n + "_no");
			colNo.style.top = -frame.scrollTop;    
			step = "get Row object";
				
			if (this.selIndex >= 0){
				var date = $(n + "_date");
				if (date != null){
					var app = this.getApplication();
					if (app.systemDatePickerForm != undefined)
						app.systemDatePickerForm.hide();
				}
			}
			if (this.btnEllips) this.btnEllips.style.display = "none";
			if (this.btnDropDown) this.btnDropDown.style.display = "none";
			if (this.btnDate) this.btnDate.style.display = "none";
		}
		catch (e){
		    systemAPI.alert("[saiSG]::doScroll : " + e+"\r\n"+this.row+"-"+step,"");
		}
	},
	showLoading: function(){
		var block = $(this.getFullId()+"_block");
		block.style.display = "";
	},
	hideLoading: function(){
		var block = $(this.getFullId()+"_block");
		block.style.display = "none";
	},
	setRowCount: function(data){	
		this.rowCount = data;
		this.setProperty("rowCount",data);		
		var rowNow = this.rows.getLength();
		
		if (rowNow > data)
		{
			for (var i= (rowNow - 1);i >= data;i--)
				this.delRow(i);
		}else
		{
			var values = Array();
			for (var i = 0; i < this.columns.getLength();i++)
				values[i] = "";	
			for (var i = rowNow;i< data;i++)
				this.addRowValues(values);
		}		
	},
	doTimer: function(){	
	},
	getRowCount: function(){
		return this.rows.getLength();
	},
	setColCount: function(data){	
		try{
			this.colCount = data;
			this.setProperty("colCount",data);		
			this.inplaceEdit.style.left = 0;
			this.inplaceEdit.style.top = 20;
			this.inplaceEdit.value = "";
			this.col = 0;
			this.row = 0;
			this.inplaceEdit.style.display = "none";
			this.exitInplace();
			var canvas = $(this.getFullId()+"_header");						
			var cnv,node;
			for (var i in this.columns.objList){				
				cnv = $(this.columns.get(i).getFullId() +"_colHead");
				node = this.columns.get(i);		
				if (cnv != undefined)
					node.free();									
			}	
			canvas.innerHTML = "";
			this.columns.clear();			
			var col;
			var lft  = 0;
			var wdth = 80;						
			for (var i = 0; i < this.colCount; i++)
			{								
				col = new app_builder_component_controls_column(this,i,{bound:[i * 80,0,80,20]});							
				wdth = 80;					
				col.setTop(-20);
				col.setWidth(wdth);				
				col.setTitle("Column"+i);				
				lft = (i * wdth); 
				col.setLeft(lft);
				this.columns.set(i, col);				
			}
			this.maxRowShow = this.calcMaxRowShow();
			this.refreshLayout();
		}catch(e){
			systemAPI.alert("setColCount."+e);
		}
	},
	addColumn: function(colWidth, title){
		var block = $(this.getFullId()+"_block");
		block.style.display = "";
		var rc = this.getRowCount();
		var data,temp = new portalui_arrayMap();
		for (var i = 0; i <  this.columns.getLength();i++){
			data = new portalui_arrayMap();
			for (var r = 0;r < this.rows.getLength();r++){			
				data.set(r,this.getCell(i,r));
			}
			temp.set(i,data);
		}
		
		this.colCount++;		
		var col;
		var lft  = 0;	
		col = new app_builder_component_controls_column(this,(this.colCount-1),{bound:[(this.colCount-1) * 80,0,80,20]});		
		col.setWidth(colWidth);
		col.setTitle(title);	
		for (var i = 0;i < this.columns.getLength();i++)
			lft += this.columns.get(i).getWidth();	
		col.setLeft(lft);	
		this.columns.set((this.colCount-1), col);
		col.setColWidth(colWidth);
		this.clear();
		this.setRowCount(rc);
		for (var i = 0; i <  temp.getLength();i++){
			data = temp.get(i);
			for (var r = 0;r < data.getLength();r++){			
				this.setCell(i,r,data.get(r));
			}
		}
		this.setCell(this.colCount-1,0,"");
		this.refreshLayout();
		block.style.display = "none";
	},
	getColCount: function(){
		return this.colCount;
	},
	setSelIndex: function(index){
		this.selIndex = index;
		this.col = index;
	},
	setRowIndex: function(index, colIdx){	
		try{
			if (colIdx === undefined) colIdx = this.col;
			this.exitInplace();	
			var rowObj = this.rows.objList[this.row];
			if (rowObj != undefined)
				rowObj.setSelected(false, this.col);	
			this.doCellExit(this, this.col, this.row);
			var Obj = this.rows.objList[index];
			if (Obj != undefined){
				Obj.setSelected(true, colIdx);
				//Obj.setFirstFocus();
			}
			this.onCellEnter.call(this, colIdx, index);
			this.setSelIndex(colIdx);
			this.setActiveRow(index);		
			this.showButton(index, colIdx);
			
		}catch(e){
			systemAPI.alert("[saiSG]::setRowIndex : " + e,"");
		}
	},
	getMaxRowShow: function(){
		return this.maxRowShow;
	},
	getMaxColShow: function(){
		return this.maxColShow;
	},
	setCaret: function(start, end){
		try{
			var rowObj = this.rows.objList[this.row];
			
			var input = $(rowObj.getFullId()+"cell"+this.col+"_input");
			if("selectionStart" in input)
			{
				input.focus();			
				input.setSelectionRange(start, end);
			}else if(document.selection)
			{
				var t = input.createTextRange();
				end -= start + input.value.slice(start + 1, end).split("\n").length - 1;
				start -= input.value.slice(0, start).split("\n").length - 1;
				t.move("character", start), t.moveEnd("character", end), t.select();
			}
		}catch(e){
			systemAPI.alert("[saiSG] :: setCaret : " + e,"");
		}
	},
	doKeyPress: function(charCode, buttonState){	
	},
	doKeyDown: function(charCode, buttonState, keyCode,event){					
		if ((keyCode == 13)|| (keyCode > 41 && keyCode < 126 && this.inplaceEdit.style.display == "none")){
			if (this.readOnly) return false;
			if (this.columns.get(this.col).readOnly) return false;
			if (this.inplaceEdit.style.display == "none"){
				var rows = this.rows.get(this.row);
				rows.showInplaceEdit(this.col);
			}
		}else if (keyCode == 38 ){	
			if (this.row > 0 ) this.setRowIndex(this.row - 1);
			else return false;
			this.goToRow(this.row);
		}else if (keyCode == 40) {
			if (this.row < this.rows.getLength() - 1) this.setRowIndex(this.row + 1);
			else if (this.columns.get(this.col).buttonStyle == bsEllips){
				this.onEllipsClick.call(this, this.col, this.row);
				return false;
			}else return false;
			this.goToRow(this.row);
			return false;
		}else if (keyCode == 39 && this.inplaceEdit.style.display == "none") {
			if (this.col < this.columns.getLength() - 1) this.setRowIndex(this.row, this.col + 1);	
			else return false;	
			var rows = this.rows.get(this.row);		
			var width = 0;
			width = parseInt(rows.cellsObj[this.col].style.left);		
			this.frame.scrollLeft = width;
		}else if (keyCode == 37 && this.inplaceEdit.style.display == "none") {
			if (this.col > 0) this.setRowIndex(this.row, this.col - 1);		
			else return false;
			var rows = this.rows.get(this.row);		
			var width = 0;
			width = parseInt(rows.cellsObj[this.col].style.left);		
			this.frame.scrollLeft = width;
		}else if (keyCode == 35){
			var target = document.all ? event.srcElement : event.target;		
			if (target.tagName != "INPUT") return false;
		}	
		return true;
	},
	addCol: function(data){	
		for (var i = this.colCount; i < this.colCount + data; i++){		

			col = new app_builder_component_controls_column(this,i,{bound:[i * 80,0,80,20]});
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
				obj = system.getResource(obj.resourceId);
				step = "get canvas "+obj+" "+startPos;				
				var canvas = obj.headerCanvas;//$(obj.getFullId()+"_colHead");								
				var left = canvas.offsetLeft;				
				var colObj = obj;
				var width = parseInt(canvas.style.width);		
				var newLeft = left + width;				
				startPos++;
				for (var i = startPos; i < this.colCount; i++)
				{
					step = "get Columns "+i;
					obj = this.columns.get(i);
					obj = system.getResource(obj.resourceId);
					step = "set Columns left "+i;
					obj.setLeft(newLeft);
					step = "get Columns left "+i;
					canvas = obj.headerCanvas;
					canvas.style.left = newLeft;
					newLeft = parseInt(canvas.style.left,10) + parseInt(canvas.style.width,10) ;					
					if (obj.hideColumn) canvas.style.display = "none";				
					step = "redraw "+i;
					//canvas = obj.getCanvas();
					//obj.doDraw(canvas);			
					step = "refresh cell"+i;
					obj.refreshCells();				
				}
					
			}		
		}
		catch(e){
			systemAPI.alert("[saiSG]::rearrange:" + e+"\r\n"+step +"\r\n"+obj.title+" ",canvas);
		}
	},
	addRowValues: function(values){
		try{
			var col;
			var width = 0;
			for (var i = 0;i < this.columns.getLength();i++)
			{
				col = this.columns.get(i);
				width += col.getWidth();
			}
			this.inplaceEdit.value = "";		
			this.inplaceEdit.col = -1;
			this.inplaceEdit.row = -1;
			var len = this.rows.getLength();			
			var rowObj = new app_builder_component_controls_rowGrid(this, len);
			var top = len * 19;
		//---------------------	
			var n = rowObj.getFullId();
			var headerCanvas = this.cnvNo;//$(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+len);
			if ((node != undefined)&&(headerCanvas != undefined))
				headerCanvas.removeChild(node);
			node = document.createElement("div");
			node.id = this.getFullId()+"_no"+len;	
			
			node.style.background = this.fixColor;			
			node.style.height = document.all ? "21px":"19px";
			node.style.top = top + 20;
			node.style.width = this.widthColNo;
			node.style.borderTop =  window.system.getConfig("3dborder.inner.top");
			node.style.borderBottom =  window.system.getConfig("3dborder.inner.bottom");
			node.style.borderLeft =  window.system.getConfig("3dborder.inner.top");
			node.style.borderRight =  window.system.getConfig("3dborder.inner.bottom");
			node.style.position = "absolute";
			if (this.mouseClick)
				var cursor = "col-resize";
			else var cursor = "pointer";
			node.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(len+1)+"</span>";
			if (headerCanvas != undefined)	
				headerCanvas.appendChild(node);		
		//--------------------			
			rowObj.setTop(top);
			rowObj.setWidth(width);
			//rowObj.readOnly = this.readOnly;
			//rowObj.setHeight(20);		
			rowObj.addCell(this.columns.getLength(), values);
			rowObj.onDblClick.set(this, "doDblClick");
			rowObj.onClick.set(this, "doClick");
			rowObj.onSelectCell.set(this, "doSelectCell");
			rowObj.onEllipsClick.set(this, "doEllipsClick");
			//rowObj.onCellExit.set(this, "doCellExit");
			//rowObj.onCellEnter.set(this, "doCellEnter");
			rowObj.onChange.set(this, "doChange");
			this.rows.set(len, rowObj);
		}catch(e){
			systemAPI.alert("[saiSG] :: addRowValues : " + e,"");
		}
	},
	delRow: function(row){
		try{
			var rowObj;		
			var cnv;
			var len = this.rows.getLength();
			rowObj= this.rows.get(row);	
			this.rows.del(row);
			rowObj.free();
			this.hideInplaceEdit();
			var headerNo = $(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+(len - 1));

			if ((node != undefined) && (headerNo != undefined))
				headerNo.removeChild(node);						
			for (var i = row; i < this.rows.getLength(); i++){
				var top = i * 19;		
				rowObj = this.rows.get(i+1);				
				if (rowObj != undefined){			
					rowObj.setTop(top);
					rowObj.setIndex(i);
					this.rows.set(i, rowObj);
					this.rows.del(i+1);
				}
				
			}
			this.onNilaiChange.call(this);
		}catch(e){
			systemAPI.alert("[saiSG]::delRow : " + e,"");
		}	
	},
	setValues: function(values){	
	},
	clear: function(defaultRow){
		try{
			var child;
			var headerNo = $(this.getFullId()+"_no");
			var node ;
			var j = 0;
			for (var i in this.childs.objList)
			{
				child = window.system.getResource(this.childs.objList[i]);
				node = $(this.getFullId()+"_no"+j);
				if ((node != undefined)&&(headerNo != undefined))
					headerNo.removeChild(node);
				if (child instanceof app_builder_component_controls_rowGrid)
					child.free();
				j++;
			}	
			if (headerNo != undefined) 
				headerNo.style.top = 0;
			this.rows.clear();
			this.rowCount = 0;
			if (defaultRow != undefined){
				for (var i=0;i < defaultRow;i++){
					this.appendRow();
				}
			}
		}catch(e){
			systemAPI.alert("[saiSG]::clear:"+e,"");
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
			var cell;
			idx++;
			if (row != undefined)
				cell = $(row.getFullId());	
			if (cell != undefined)
				result = cell.offsetTop - this.frame.scrollTop + 20;			
		
			return result;
		}catch(e){
			systemAPI.alert("[saiSG]::getRowTop:"+e,"");
		}
	},
	getRowLeft: function(col){
		try{	
			var column = this.columns.get(col);
			var cell = $(column.getFullId());
			result = 0;
			if (cell != undefined)
				result = cell.offsetLeft - this.frame.scrollLeft + cell.offsetWidth + 20;			
	    	return result;
		}catch(e){
			systemAPI.alert("[saiSG]::getRowLeft:"+e,"");
		}
	},
	setCell: function(col, row, value){
	  if (col >= this.columns.getLength()) return false;
	  if (row >= this.rows.getLength()) return false;
	  try{
	  	var rowObj= this.rows.get(row);
	  	if (rowObj != undefined)
	  		rowObj.setCellValue(col, value);
	  	if (col == this.col && row == this.row) this.inplaceEdit.value = value;
		if (!this.onSwap) this.onChange.call(this,col, row);
	  }catch(e){
	    systemAPI.alert("saiSG:"+col+" "+row+" "+value+"\n"+e,"");
	  }
	},
	getCellIdValue: function(col, row){
		var column = this.columns.get(col);
		if (column != undefined){
			var text = this.getCell(col,row);
			return column.pickList.indexOf(text);
		}
	},
	getCell: function(col, row){
		var rowObj= this.rows.get(row);
		if (rowObj != undefined){
			var value = rowObj.getCellValue(col);
			return value;
		}else return "";
	},
	cells: function(col, row){
		var rowObj= this.rows.get(row);
		var value = rowObj.getCellValue(col);
		return value;
	},
	getCellDateValue: function(col, row){
		var rowObj= this.rows.get(row);
		var value = rowObj.getCellValue(col); 
		var columns = this.columns.get(col);			
		if (value != ""){
			var tgl = value.split("/");
			value = tgl[2]+"-"+tgl[1]+"-"+tgl[0];
		}	
		return value;
	},
	doLostFocus: function(){
		this.exitInplace();		
	},
	setFixColor: function(data){
		this.fixColor = data;
		this.setProperty("fixColor",data);		
	},
	setFixedCol: function(data){
		this.totFixedCol = data;
	},
	setReadOnly: function(data){
		try{
			for (var i = 0; i < this.colCount; i++)
			{
				obj = this.columns.get(i);		
				obj.setReadOnly(data);
				obj.refreshCells();
			}	
			this.readOnly = data;
		}catch(e){
			systemAPI.alert("Grid.setReadOnly."+e,obj)
		}
	},
	doDblClick: function(sender, colIdx, rowIdx){
		this.onDblClick.call(this, colIdx, rowIdx);
	},
	doClick: function(sender, colIdx, rowIdx){
		this.onClick.call(this, colIdx, rowIdx);
	},
	doSelectCell: function(sender, colIdx, rowIdx){
		this.onSelectCell.call(this, colIdx, rowIdx);
	},
	doEllipsClick: function(sender, colIdx, rowIdx){
		this.onEllipsClick.call(this, colIdx, rowIdx);
	},
	doCellEnter: function(sender, colIdx, rowIdx){
		this.onCellEnter.call(this, colIdx, rowIdx);
	},
	doCellExit: function(sender, colIdx, rowIdx){
		try{
			var colHeader = this.columns.get(colIdx);
			if (colHeader.columnFormat == window.cfNilai)
			{		
					var rowObj = this.rows.objList[rowIdx];	
					var input = $(rowObj.getFullId() +"_cellValue"+colIdx);
					var text = rowObj.getCellValue(colIdx);
					if ((text=="")||(text==" ")) text = "0";			
					text = RemoveTitik(text);
					text = text.replace(",",".");
					text = parseFloat(text);
					text = text.toString().replace(".",",");
					text = strToNilai(text);			
					input.value = text;
			}
			this.onCellExit.call(this, colIdx, rowIdx);
		}catch(e){
			systemAPI.alert("[saiSG] :: doCellExit : " + e);
		}
	},
	goToRow: function(row){
		this.setRowIndex(row);
		var n = this.getFullId();
		var ros = this.rows.getLength();
		var detailH = ros * 23;
		var rowPos = row * 23;
		var diff = rowPos / detailH; 
		
		var frame = this.frame;
	    var header = $(n + "_header");
	    frame.scrollTop = row * 18;											
	},
	setActiveRow: function(row){
		this.row = row;
	},
	setWidthColNo: function(data){
		this.widthColNo = data;
		this.setProperty("widthColNo",data);		
	},
	swapRow: function(row1, row2){	
		try{
			var app = this.getApplication();			
//----------------------------------------		
			var ellips = $(this.getFullId()+"_ellips");
			if ((ellips != null) && (ellips.style.display == ""))
				ellips.style.display = "none";
			var date = $(this.getFullId()+"_date");
			if ((date != null) && (date.style.display == ""))
			{
				date.style.display = "none";	
				if (app.systemDatePickerForm != undefined)
					app.systemDatePickerForm.hide();
			}
			var combobox = $(this.getFullId()+"_dropDown");
			if ((combobox != null) && (combobox.style.display == ""))
				combobox.style.display = "none";
//-----------------------------------			
			this.onSwap = true;
			var data1 = [];for (var i in this.rows.get(row1).values) data1[i] = this.rows.get(row1).values[i];
			var data2 = [];for (var i in this.rows.get(row2).values) data2[i] = this.rows.get(row2).values[i];
			for (var i=0;i < this.columns.getLength();i++)
				this.setCell(i,row1, data2[i]);
			for (var i=0;i < this.columns.getLength();i++)
				this.setCell(i,row2, data1[i]);
			this.onSwap = false;
		}catch(e){
			systemAPI.alert("[saiSG]::swapRow:"+e);
		}
	},
	validasi: function(){
		this.onNilaiChange.call(this);
	},
	doChange: function(sender, col, row){
		this.onChange.call(this, col, row);
	},
	isEmpty: function(){
		return this.rows.getLength() == 0;
	},
	appendRow: function(){
		var values = [];
		for (var i = 0; i < this.columns.getLength();i++)
			values[i] = "";	
		this.addRowValues(values);
		this.rowCount++;
	},
	appendData: function(data){
		var lastRow = this.getRowCount();
		if (lastRow == 0 || (lastRow > 0 && this.rowValid(lastRow - 1)) ){
			this.addRowValues(data);
			this.rowCount++;
		}
	},
	appendDataByRec: function(data, fields){
		try{
			if (!(data instanceof portalui_arrayMap)) return false;		
			var dataToAppend = [];
			for (var i in fields)
				dataToAppend.push(data.get(fields[i]));
			this.addRowValues(dataToAppend);
			this.rowCount++;
		}catch(e){
			systemAPI.alert(e);
		}
	},
	sort: function(){
	},
	setColTitle: function(data){
		this.setProperty("colTitle",data);
		alert(data);
		if (typeof data == "string")
			eval("data="+data+";");
		alert(data);
		for (var i in this.columns.objList)
			this.columns.get(i).setTitle(data[i]);	
		this.refreshLayout();
		this.title = data;
	},
	setColWidth: function(col, data){		
		for (var i in col)
			this.columns.get(col[i]).setColWidth(data[i]);	
	},
	setColFormat: function(col, data){
		for (var i in col)
			this.columns.get(col[i]).setColumnFormat(data[i]);	
	},
	setNoUrut: function(start){
		if (start == undefined) start = 0;
		var cnv;
		for (var i in this.rows.objList)
		{
			cnv = $(this.getFullId()+"_no"+i);
			if (cnv != undefined)
				cnv.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(i,10)+1+start)+"</span>";
		}
	},
	setData: function(data){
		try{
			this.clear();
			this.inplaceEdit.value = "";
			this.data = data;
			if (this.data instanceof portalui_arrayMap){
				var line, idx,first = true;
				var fieldDesc = this.data.getTag2();		
				var title = [];
				this.showLoading();	
				for (var i in this.data.objList){
					line = this.data.get(i);
					if (first){
						idx = 0;								
						this.setColCount(fieldDesc.get(1).getLength());												
						for (var d in fieldDesc.get(1).objList){
							if (fieldDesc.get(1).get(d) == "N" || fieldDesc.get(1).get(d) == "real")
								this.columns.get(idx).setColumnFormat(cfNilai);
							else this.columns.get(idx).setColumnFormat(cfText);
							this.columns.get(idx).setColWidth(fieldDesc.get(0).get(d) < 80 ? 80 : fieldDesc.get(0).get(d));
							title[title.length] = d;														
							idx++;							
						}
						first = false;
					}
					data = [];
					for (var c in line.objList){
						if (fieldDesc.get(1).get(c) == "N" || fieldDesc.get(1).get(c) == "real")
							data[data.length] = floatToNilai(parseFloat(line.get(c)));
						else if (fieldDesc.get(1).get(c) == "T")
							data[data.length] = (new Date).idFormat(line.get(c));
						else if (line.get(c) == "")
							data[data.length] = "-";
						else 
							data[data.length] = line.get(c);
					}
					this.appendData(data);
				}
				this.hideLoading();
			}else if (data){
				var obj = data;
				var line = '';
				var first = true;
				var title = [];
				this.showLoading();		
				if (obj.rs == undefined) return false;
				var fields = obj.rs.fields;		
				var field;
				for (var i in obj.rs.rows){			
					line = obj.rs.rows[i];			
					data = [];
					for (var c in line){	
						if (first) title.push(c);
						field = fields[c];								
						if (field.type == "N" || field.type =="real")									
							data.push(floatToNilai(parseFloat(line[c])));
						else data.push(line[c]);
					}		
					if (first) {
						this.setColCount(data.length);
						var  ix = 0;				
						for (var c in fields){
							field = fields[c];										
							this.columns.get(ix).setColWidth(field.length < 80 ? 80 : field.length);
							if (field.type == "N" || field.type =="real")
								this.columns.get(ix).setColumnFormat(cfNilai);
							ix++;
						}
						first = false;
					}
					this.appendData(data);			
				}
				this.hideLoading();
			}
			if (this.title.length == 0){
				for (var i in this.columns.objList)
				{
					this.columns.get(i).setTitle(title[i]);
				}
				this.refreshLayout();
			}else this.setColTitle(this.title);
			this.rearrange(0);
		}catch(e){
			systemAPI.alert(e,"");
		}
	},
	setTop: function(data){
		window.app_builder_component_controls_saiGrid.prototype.parent.setTop.call(this,data);
		if (this.layout != undefined)this.layout.setTop(data+20);
	},
	setLeft: function(data){
		window.app_builder_component_controls_saiGrid.prototype.parent.setLeft.call(this,data);
		if (this.layout != undefined)this.layout.setLeft(data+20);
	},
	doTopLeftClick: function(){
		if (this.layout.visible)
			this.layout.hide();
		else
			this.layout.show();
	},
	createLayoutForm: function(){
		try{
			uses("portalui_panel;portalui_listBox;portalui_button");
			this.layout = new portalui_panel(this.owner);
			this.layout.hide();
			this.layout.setTop(this.top);	
			this.layout.setLeft(this.left);
			this.layout.setWidth(300);
			this.layout.setHeight(200);	
			this.layout.setCaption("Layout");
			
			this.lb1 = new portalui_listBox(this.layout);
			this.lb1.setTop(25);
			this.lb1.setLeft(5);
			this.lb1.setWidth(125);
			this.lb1.setHeight(170);	
			this.lb1.onDblClick.set(this,"doSelectLayout");
			
			this.lb2 = new portalui_listBox(this.layout);
			this.lb2.setTop(25);
			this.lb2.setLeft(170);
			this.lb2.setWidth(125);
			this.lb2.setHeight(170);	
			this.lb2.onDblClick.set(this,"doSelectLayout");
			
			this.b1 = new portalui_button(this.layout);
			this.b1.setTop(50);
			this.b1.setLeft(135);
			this.b1.setWidth(30);
			this.b1.setWithImage(false);
			this.b1.setCaption("Hide");
			this.b1.onClick.set(this,"doClickLayout");
			
			this.b2 = new portalui_button(this.layout);
			this.b2.setTop(90);
			this.b2.setLeft(135);
			this.b2.setWidth(30);
			this.b2.setWithImage(false);
			this.b2.setCaption("Show");
			this.b2.onClick.set(this,"doClickLayout");
		}catch(e){
			systemAPI.alert("createFormLayout:"+e);
		}
	},
	refreshLayout: function(){
		var col;
		try{		
			if (this.layour == undefined) return;
			var step = "clear";
			this.lb1.clearItem();
			this.lb2.clearItem();
			step = "repeat";
			for (var i in this.columns.objList){				
				col = this.columns.get(i);			
				if (col != undefined){				
					if (!col.hideColumn)
						this.lb1.addItem(i,col.title,undefined);
					else 
						this.lb2.addItem(i,col.title,undefined);
				}
			}
		}catch(e){
			systemAPI.alert("refreshLayout : "+e,step+"<br>"+col);
		}
	},
	doSelectLayout: function(sender,id,caption,icon){
		if (sender == this.lb1){	
			this.columns.get(id).hide();
		}else if (sender == this.lb2){		
			this.columns.get(id).show();
		}
		this.refreshLayout();
	},
	doClickLayout: function(sender ){
		if (sender == this.b1){
			var item = this.lb1.getSelectedItem();					
			this.columns.get(item[1]).hide();
		}else if (sender == this.b2){
			var item = this.lb2.getSelectedItem();					
			this.columns.get(item[1]).show();
		}
		this.refreshLayout();
	},
	gridToHTML: function(){
		var width=0;
		var th = "<tr bgcolor='#CCCCCC'>";
		for (var i=0;i < this.columns.getLength();i++){
			width += this.columns.get(i).width;
			if (!this.columns.get(i).hideColumn)
				th += "<th class='header_laporan' height='25' width='"+this.columns.get(i).width+"'>"+ this.columns.get(i).title +"</th>";
		}
		th += "</tr>";	
		var tr,html = "<br><br><table width='"+width+"' border='1' cellspacing='0' cellpadding='0' class='kotak'>";
		html += th;	
		for (var i=0;i < this.rows.getLength();i++){
			tr = "<tr>";
			for (var c=0;c < this.columns.getLength();c++){
				if (!this.columns.get(c).hideColumn){
					if (this.columns.get(c).columnFormat == cfNilai)
						tr += "<td height='20' valign='middle' class='isi_laporan' align='right'>"+this.getCell(c,i)+"</td>";
					else
						tr += "<td height='20' valign='middle' class='isi_laporan' >"+this.getCell(c,i)+"</td>";
				}
			}		
			tr += "</tr>";				
			html += tr;
		}
		html += "</table>";
		return html;
	},
	previewHTML: function(){
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "";		
		var winfram= window.frames[this.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(this.gridToHTML());
		winfram.document.close();
	},
	testHTML: function(html){
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "";		
		var winfram= window.frames[this.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(html);
		winfram.document.close();
	},
	hideFrame: function(){
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "none";		
	},
	useIframe: function(location){
		try{
			var cnv = $(this.getFullId() + "_iframe");			
			if (cnv != undefined){				
				cnv.src = location;				
			}
		}catch(e){
			systemAPI.alert(e, location);
		}		
	},
	print: function(addHeader){
		try{
			var cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined) {		
				if (cnv.style.display == "none")
					cnv.style.display = "";					
				else cnv.style.display = "none";				
			}
			if (addHeader == undefined) addHeader = "";
			var winfram= window.frames[this.getFullId() +"_iframe"];			
			winfram.document.open();
			winfram.document.write(loadCSS("server_util_laporan"));
			winfram.document.write(addHeader);
			winfram.document.write(this.gridToHTML());
			winfram.document.close();			
			winfram.focus();			
			winfram.print();	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	autoWidth: function(){
		for (var i = 0;i < this.columns.getLength();i++)
			for (var r = 0 ;r < this.rows.getLength();r++){
				
			}
	},
	ellipsClick: function(event){
		this.onEllipsClick.call(this, this.col,this.row);
	},
	dropDownClick: function(event){
		try{	
			if ((window.dropDown == undefined) || (!window.dropDown.visible)){
				var x = event.clientX;
				var y = event.clientY;
				var step = "get colHeader";
				var colHeader = this.columns.get(this.col);
				step = "get canvas "+this.col;
				if (this.inplaceEdit.style.display == "")
					var canvas = this.inplaceEdit;
				else {
					var rowObj = this.rows.get(this.row);
					var canvas = $(rowObj.getFullId()+"_cellValue"+this.col);
				}
				step = "get offset canvas";
				var width = canvas.offsetWidth;			
				var form = this.getForm();				
				if (document.all || window.opera){
			        x = (x - event.offsetX) - width + 17;
			        y = (y - event.offsetY) + 18;
			    }
			    else{
			        x = (x - event.layerX) - width + 19;
			        y = (y - event.layerY) + 19;
			    }
				if (window.dropDown != undefined)
					window.dropDown.free();
				
				var app = this.getApplication();
				uses("portalui_dropDownBox");
				step = "create dropdownBox";
				window.dropDown = new portalui_dropDownBox(app);//dropDownBox(window.system._mainForm.activeChildForm);

				step = "get picklist "+this.col;
				this.pickList = this.columns.get(this.col).pickList;
				window.dropDown.onSelect.set(this, "dropDownBoxSelect");
				step = "set picklist "+this.col;
				window.dropDown.setItems(this.pickList);
				step = "set width "+this.col;
				window.dropDown.setWidth(width);	
				step = "set selected id "+this.selectedId;
				window.dropDown.setSelectedId(this.selectedId);
				step = "set left "+x;
				window.dropDown.setLeft(x + 1);
				var scrHeight = form.getHeight();															
				if ((y + window.dropDown.getHeight()) > scrHeight){				
					y-=20;
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
				
			}
				else window.dropDown.setVisible(false);
		}
		catch (e){
			systemAPI.alert("[rowGrid] :: dropDownClick : " + e+"\r\n"+step);
		}
	},
	dropDownBoxSelect: function(sender, selectedId, caption){
		try{
			this.setCell(this.col, this.row, caption);	
			this.selectedId = selectedId;	
			window.dropDown.hide();	
		}catch(e){
			systemAPI.alert("rowGrid:dropDownSelect:" + e);
		}
	},
	dateClick: function(event){
	    var x = event.clientX;
	    var y = event.clientY;
		var column = this.columns.get(this.col);
	    var canvas = $(column.getFullId());
	    var width = canvas.offsetWidth;

	    if (document.all){
	        x = (x - event.offsetX) - width + 17;
	        y = (y - event.offsetY) - 8;
	    }else{
	        x = (x - event.layerX) - width + 19;
	        y = (y - event.layerY) - 5;
	    }
		
		var app = this.getApplication();
		if (app.systemDatePickerForm == undefined){
			uses("portalui_datePicker");
			app.systemDatePickerForm = new portalui_datePickerForm(app);
		}    
	    app.systemDatePickerForm.onSelect.set(this, "pickerFormSelect");

	    app.systemDatePickerForm.setSelectedDate(this.year, this.month, this.day);
		var scrHeight = app.activeForm.getHeight();
	    app.systemDatePickerForm.setLeft(x);
	    if ((y + app.systemDatePickerForm.getHeight()) > scrHeight){
			y += 15;
			if (document.all)
				app.systemDatePickerForm.setTop(y - this.getHeight() - app.systemDatePickerForm.getHeight() + 1);
			else
				app.systemDatePickerForm.setTop(y - this.getHeight() - app.systemDatePickerForm.getHeight() - 1);
		}else
			app.systemDatePickerForm.setTop(y);
		app.systemDatePickerForm.bringToFront();
	    app.systemDatePickerForm.show();
	},
	pickerFormSelect: function(sender, yy, mm, dd){	
		try{
			this.year = yy;
		    this.month = mm;
		    this.day = dd;
		    
		    var month = this.month;

		    if (month < 10)
		        month = "0" + month;
		    var caption = this.day + "/" +month + "/" + this.year;			
			this.inplaceEdit.value = caption;
			this.setCell(this.col, this.row, caption);
			this.onChange.call(this, this.col, this.row); 
		}catch(e){
			systemAPI.alert("saiGrid::pickerSelect:" + e);
		}
	},
	doMouseDown: function(event, idx){	
		var colHeader = this.columns.get(idx);
		switch(colHeader.buttonStyle)
		{
			case bsEllips :
					var ellips = this.btnEllips;
					if (ellips != null)
						ellips.style.display = "";
					break;
			case bsAuto :
					var combobox = this.btnDropDown;
					if (combobox != null)
						combobox.style.display = "";
					break;	
			case bsDate :
					var date = this.btnDate;
					if (date != null)
						date.style.display = "";
					break;	
		}	
	},
	doMouseOut: function(event){
		if (!this.Focused){
			var target = document.all?event.srcElement : event.target;
			var idx = target.col;
			var colHeader = this.columns.get(idx);
			switch(colHeader.buttonStyle)
			{
				case bsEllips :
						var ellips = this.btnEllips;
						if (ellips != null)
							ellips.style.display = "none";
						break;
				case bsAuto :
						var combobox = this.btnDropDown;
						if (combobox != null)
							combobox.style.display = "none";					
						break;	
				case bsDate :
						var date = this.btnDate;
						if (date != null)
							date.style.display = "none";							
						break;
			}
		}
	},
	doMouseOver: function(event){
		var target = document.all?event.srcElement : event.target;
		var idx = target.col;
		var colHeader = this.columns.get(idx);
		switch(colHeader.buttonStyle)
		{
			case bsEllips :
					var ellips = this.btnEllips;
					if (ellips != null)
						ellips.style.display = "";				
					break;
			case bsAuto :
					var combobox = this.btnDropDown;
					if (combobox != null)
						combobox.style.display = "";
					break;	
			case bsDate :
					var date = this.btnDate;
					if (date != null)
					{
						date.style.display = "";
						var app = this.getApplication();	
						if (app.systemDatePickerForm != undefined)
							app.systemDatePickerForm.hide();
					}
					break;
		}
	},
	clearTitle: function(){
		this.title = [];
	},
	allRowValid: function(){
		var valid = true;
		for (var r = 0 ;r < this.rows.getLength();r++){
			for (var i = 0;i < this.columns.getLength();i++)
				valid = valid && this.cells(i,r) != "";						
			if (!valid) break;
		}
		return valid;		
	},
	rowValid: function(row){
		var valid = true;
		for (var i = 0;i < this.columns.getLength();i++)
			valid = valid && this.cells(i,row) != "";				
		return valid;
	},
	findText: function(text, col, rowKey, isSelf){
		for (var i=0;i < this.getRowCount();i++){
			if (text == this.getCell(col, i) && (rowKey != i && isSelf))
				return true;		
			else if (!isSelf && text == this.getCell(col, i))
				return true;
		}
		return false;
	},
	hideInplaceEdit: function(){	
		this.inplaceEdit.style.display = "none";
	},
	setBtnReadOnly: function(data){	
		if (this.readOnly){
			this.btnVisible = data;
		}else this.btnVisible = false;
	},
	setRowSelect: function(data){
		this.rowSelect = data;
	},
	setFocusCell: function(col, row ){
		var rowObj = this.rows.get(row);	
		if (rowObj != undefined){		
			rowObj.showInplaceEdit(col);
		}
	},
	setAllowAutoAppend: function(data){
		this.allowAutoAppend = data;
	},
	setColumenReadOnly: function(data, incl, excl){
		for (var i in incl)
			this.columns.get(incl[i]).setReadOnly(data);	
		for (var i in excl)
			this.columns.get(excl[i]).setReadOnly(!data);
	},
	setButtonStyle: function(col, btnStyle){
		for (var i in col)
			this.columns.get(col[i]).setButtonStyle(btnStyle[i]);	
	}	
});