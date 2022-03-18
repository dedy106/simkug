//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_saiDataGrid = function(owner, options){
	if (owner){
		try{
			this.height = 200;
			this.widthColNo = 25;
			window.portalui_saiDataGrid.prototype.parent.constructor.call(this, owner);	
			this.className = "portalui_saiDataGrid";
			this.year = (new Date()).getFullYear();
			this.month = (new Date()).getMonth() + 1;
			this.day = (new Date()).getDate();
				
			this.readOnly = false;
			this.colCount = 0;
			this.rowCount = 0;	
            this.rowHeight = 19;		
			this.colCanvas = [];
			this.noCanvas = [];			
			this.mouseClick = false;
			this.mouseX = 0;	
			this.selIndex = 0;
			this.maxRowShow = 0;
			this.maxColShow = 0;
			this.topIndex = 0;
			this.leftIndex = 0;
			this.clientHTML = "";
			this.clientHeight = 0;
			this.disableCtrl = true;
			this.col = 0;
			this.row = 0;			
			this.tabStop = true;			
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
			this.onDeleteRow = new portalui_eventHandler();
			this.onBeforeClear = new portalui_eventHandler();
			this.totFixedCol = 0;
			this.title = [];						
			this.columns = new portalui_arrayMap();			
			this.autoSubmit = new portalui_arrayMap();
			this.rows = new portalui_arrayMap();
			this.pressKeyDown = false;
			this.rowSelect = false;
			this.fixColor = system.getConfig("form.grid.fixedColor");//"#084972";//"#c4c4a3";		
			this.color = system.getConfig("form.grid.color");
			uses("portalui_rowGrid;portalui_column");
			uses("util_serverControl",true);
			this.serverControl = new util_serverControl();
			this.serverControl.addListener(this);
			//------------			
			this.first = false; //eventKeyPress
			this.rightBtn = false;			
			this.btnVisible = true;
			this.allowAutoAppend = true;
			this.addHeader = "";
			this.allowBlank = false;
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.autoAppend !== undefined) this.setAllowAutoAppend(options.autoAppend);
				if (options.colCount !== undefined) this.setColCount(options.colCount);
				if (options.colTitle !== undefined) this.setColTitle(options.colTitle);
				if (options.colFormat !== undefined) this.setColFormat(options.colFormat[0],options.colFormat[1]);				
				if (options.colWidth !== undefined) this.setColWidth(options.colWidth[0],options.colWidth[1]);
				if (options.buttonStyle !== undefined) this.setButtonStyle(options.buttonStyle[0],options.buttonStyle[1]);
				if (options.ellipsClick !== undefined) this.onEllipsClick.set(options.ellipsClick[0],options.ellipsClick[1]);
				if (options.change !== undefined) this.onChange.set(options.change[0],options.change[1]);
				if (options.defaultRow !== undefined) this.clear(options.defaultRow);
				if (options.columnReadOnly !== undefined) this.setColumnReadOnly(options.columnReadOnly[0],options.columnReadOnly[1],options.columnReadOnly[2]);
				if (options.colReadOnly !== undefined) this.setColumnReadOnly(options.colReadOnly[0],options.colReadOnly[1],options.colReadOnly[2]);
				if (options.picklist !== undefined) this.setPickList(options.picklist[0],options.picklist[1]);
				if (options.allowBlank !== undefined) this.setAllowBlank(options.allowBlank); 
				if (options.rowCount !== undefined) this.setRowCount(options.rowCount);
				if (options.selectCell !== undefined) this.onSelectCell.set(options.selectCell[0],options.selectCell[1]);
				if (options.nilaiChange !== undefined) this.onNilaiChange.set(options.nilaiChange[0],options.nilaiChange[1]);
				if (options.click !== undefined) this.onClick.set(options.click[0],options.click[1]);
				if (options.dblClick !== undefined) this.onDblClick.set(options.dblClick[0],options.dblClick[1]);
				if (options.beforeClear !== undefined) this.onBeforeClear.set(options.beforeClear[0], options.beforeClear[1]);
				if (options.deleteRow !== undefined) this.onDeleteRow.set(options.deleteRow[0], options.deleteRow[1]);
				if (options.colHide !== undefined) this.setColHide(options.colHide[0],options.colHide[1]);				
				if (options.colMaxLength !== undefined) this.setColMaxLength(options.colMaxLength[0],options.colMaxLength[1]);				
				if (options.rowHeight !== undefined) this.setRowHeight(options.rowHeight);
				if (options.autoPaging) this.setAutoPaging(options.autoPaging);
				if (options.disableCtrl) this.setDisableCtrl(options.disableCtrl);
			}
		}catch(e){
			systemAPI.alert(this+"$create:",e);
		}
	}
};
window.portalui_saiDataGrid.extend(window.portalui_containerControl);
window.saiDataGrid = window.portalui_saiDataGrid;
window.portalui_saiDataGrid.implement({
	doDraw: function(canvas){
		try{
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
			var html =  "<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' frameborder='0' style='{position: absolute;left: "+this.widthColNo+";top: 20; width: "+w+"px; height: "+h+"px;overflow:auto}' ></iframe>" +
						"<div id='"+n+"_header' style='{position:absolute;overflow:visible;left: "+this.widthColNo+";top: 0; width:100%; height:20px;}'>"+
						"</div>"+
						"<div id='"+n+"_no' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabContent.png) top left no-repeat;background-color:"+system.getConfig("form.grid.fixedColor")+"; overflow:visible;left: 0;top: 0; width:"+this.widthColNo+"; height:100%;}'>"+
						"</div>"+
						"<div id='"+n+"_topLeft' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabCont.png) top left no-repeat;background-color:#084972;cursor:pointer;"+
							"left: 0;top: 0; width:"+(this.widthColNo)+"; height:20px; "+
							"border-top: "+window.system.getConfig("3dborder.inner.top")+";"+
							"border-bottom: "+window.system.getConfig("3dborder.inner.bottom")+";"+
							"border-left: "+window.system.getConfig("3dborder.inner.top")+";"+
							"border-right: "+window.system.getConfig("3dborder.inner.bottom")+";"+
							"}' "+
							" onclick ='$$("+this.resourceId+").doTopLeftClick(); ' "+
							" onmousemove ='$$("+this.resourceId+").doTopLeftOver(event); ' "+
							" onmouseout ='$$("+this.resourceId+").doTopLeftOut(event); ' "+
							"><div style='position:absolute;left:0;top:0;width:100%;height:100%;background-image:url(icon/"+system.getThemes()+"/menuselect.png);cursor:pointer' ></div>"+
						"</div>"+
						"<input id='"+n+"_edit' type='text'  value='' "+
							"style='{display:none;width:80px;height:"+(document.all ? "18":"18")+"px;"+
							"position:absolute;left:0;top:0;border:small solid #FF00FF;color:#000000;z-index:999999;"+
							"border-width:1;}' "+
							"onkeypress='return $$(" + this.resourceId + ").eventKeyPress(event);' "+
							"onchange='return $$(" + this.resourceId + ").eventChange(event);' "+
							"onkeydown='return $$(" + this.resourceId + ").eventKeyDown(event);' "+
							"onfocus='$$(" + this.resourceId + ").doFocusEdit(event);' "+
							"onblur='$$(" + this.resourceId + ").eventExit(event);' " +						
							"/>"+
						"<div id='"+n+"form' style='{display:none;position:absolute;left: "+this.widthColNo+";top: 20; width: "+w+"px; height: "+h+"px; overflow: auto;}' onscroll='$$("+this.resourceId+").doScroll(event)' >"+						
						"</div>"+																	
						"<div id='"+n+"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
							"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
							"<span style='{position:absolute;left: "+(w / 2 - 25).toString()+";top: "+(h / 2 + 25).toString()+";width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
						"</div>";
			this.setInnerHTML(html, canvas);
			this.cnvNo = $(n +"_no");
			this.topLeft = $(n +"_topLeft");
			this.cnvHeader = $(n +"_header");
			this.inplaceEdit = $(n +"_edit");
			this.frame = $(n +"_iframe");
			this.canvas = canvas;
		}catch(e){
			alert(e);
		}
	},
	eventExit: function(event){		
	},
	exitInplace: function(){
		try{
			var target = this.inplaceEdit;			
			if (this.inplaceEdit.style.display == ""){
				this.setCell(target.col, target.row, target.value);
			}
			target.style.display = "none";	
			if (this.btnEllips) this.btnEllips.style.display = "none";
			if (this.btnDropDown) this.btnDropDown.style.display = "none";
			if (this.btnDate) this.btnDate.style.display = "none";
			
			this.doDefocus();
		}catch(e){
			systemAPI.alert(this+"$exitInplace:",e);
		}
	},
	eventChange: function(event){
		try{			
    	   this.setCell(this.col, this.row, this.inplaceEdit.value); 
		}catch(e){
			alert(e);
		}
    },	
	doFocusEdit: function(event){
		try{					
			var target = event.srcElement || event.target;		
			var colHeader = this.columns.get(target.col);
			var rowIndex = target.row;
			var idx = target.col;
			if (colHeader.columnFormat == window.cfNilai)
			{
				 var txt = target.value;
				 //target.value = RemoveTitik(txt);
			}		
			if (colHeader != null)
			{		
				this.hideButton(rowIndex, idx);
				this.showButton(rowIndex, idx);											
			}						
		}catch(e){
			systemAPI.alert("$focusEdit()",e);
		}
	},
	hideButton: function(rowIndex, idx){
		if (!this.btnVisible) return;
		var colHeader = this.columns.get(idx);
		if (colHeader == undefined) return;
		var app = this.getApplication();
		switch(colHeader.buttonStyle){
			case bsAuto :
					var ellips = this.btnEllips;
					if ((ellips != null) && (ellips.style.display == ""))
						ellips.style.display = "none";
					var date = this.btnDate;
					if ((date != null) && (date.style.display == "")){
						date.style.display = "none";	
						if (app !== undefined && app.systemDatePickerForm != undefined)
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
						if (app !== undefined && app.systemDatePickerForm != undefined)
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
		if (app !== undefined && app.systemDatePickerForm != undefined)
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
					node.style.zIndex = 99;
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
				node.style.cursor = "pointer";
				
				var html = "<div style='position:absolute; left: 0; top : 1; width:18px; height: 19px;' "+
							"onclick = '$$("+this.resourceId+").ellipsClick(event,"+idx+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+")'"+							
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
					node.style.zIndex = 99;
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
							"onclick = '$$("+this.resourceId+").dropDownClick(event,"+idx+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+")'"+														
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
					node.style.zIndex = 99;
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
							"onclick = '$$("+this.resourceId+").dateClick(event,"+idx+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+")'"+						
							"></div>";
				node.innerHTML = html;
				if (!isThere)
					this.canvas.appendChild(node);
				else{
					var app = this.getApplication();
					if (app.systemDatePickerForm != undefined)
						app.systemDatePickerForm.setTop(top + 18);	
				}
				break;
			
		}
	},
	eventKeyPress: function(event){	
	    try{
    		var keyCode = document.all ? event.keyCode: event.which;
    		var charCode = document.all ? system.charCode[event.keyCode] : system.charCode[event.charCode];		
    		var input = this.inplaceEdit;				
    		if (cfNilai == this.columns.get(this.col).columnFormat && charCode != undefined)
    		{		  
    		    if ("selectionStart" in input)  
    			     var start = input.selectionStart;		
  			    else {
  			        var t = input.createTextRange();
        			t.moveStart ('character', -input.value.length);
                    var start = t.text.length;
                }   
    			var reg = /\d/;		
    			var isFirstN = true ? charCode == '-' && input.value.indexOf('-') == -1 && start == 0: false;
    			var isFirstD = true ? charCode == ',' && input.value.indexOf(',') == -1 : false;
    			if (!(reg.test(charCode)) && (!isFirstN) && (!isFirstD))
    				return false;
    		}
    		if (cfNumeric == this.columns.get(this.col).columnFormat && charCode != undefined)
    		{		  
    		    if ("selectionStart" in input)  
    			     var start = input.selectionStart;		
  			    else {
  			        var t = input.createTextRange();
        			t.moveStart ('character', -input.value.length);
                    var start = t.text.length;
                }   
    			var reg = /\d/;		    			
    			if (!(reg.test(charCode)))
    				return false;
    		}
    		return 	true;
   		}catch(e){
   		   alert(e);
        }
	},
	eventKeyDown: function(event){
		try{
			window.system.buttonState.set(event);
			var tab = false;
			if (event.keyCode == 9)
				tab = true;					
			if ((event.keyCode == 13 || event.keyCode == 9))
			{				
				if (this.col + 1< this.colCount) 
					this.setRowIndex(this.row, this.col + 1);
				else if ( this.row + 1 < this.rowCount)
					this.setRowIndex(this.row+1, 0);				
				else if (this.rowValid(this.row) && this.row + 1 == this.rowCount){
					if (this.allowAutoAppend){
						this.appendRow();
						this.setRowIndex(this.row+1, 0);				
					}else {						
						this.setRowIndex(this.row, 0);				
					}
				}else if (this.inplaceEdit.value != "" && this.inplaceEdit.style.display == "" && this.row + 1 == this.rowCount){
					this.exitInplace();				
					this.appendRow();
					this.setRowIndex(this.row+1, 0);				
				}else this.setRowIndex(this.row, 0);				
				if (!this.columns.get(this.col).readOnly){					
					this.exitInplace();					
				}
				this.pressKeyDown = false;	
			}else if ((event.keyCode == 40)&&(!this.pressKeyDown))
			{
    			if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsEllips ){
    				this.onEllipsClick.call(this, this.col, this.row);    
    				return false;
    			}
                this.pressKeyDown = true;	
			}else if (event.keyCode != 40)
				this.pressKeyDown = false;		
			this.onKeyDown.call(this, event.keyCode, window.system.buttonState);    
			if (tab)
				return false;
			else return true;
		}catch(e){
			systemAPI.alert(this+"$KeyDown()",e);
		}
	},
	doSizeChange: function(width, height){		
		this.frame.style.width = width - this.widthColNo;
		this.frame.style.height = height - 20;
		
	},
	doScroll: function(event){
		try{
			var n = this.getFullId();	
		    var frame = this.frame;//$(n + "_frame");
		    var header = this.cnvHeader;//$(n + "_header");
			header.style.left = -frame.scrollLeft + this.widthColNo;
			var colNo = $(n + "_no");
			colNo.style.top = -frame.scrollTop;    
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
			this.doDefocus();
		}
		catch (e){
		    systemAPI.alert(this+"$doScroll()", e);
		}
	},
	doScrollFrame: function(target){
		try{						
			var n = this.getFullId();			
		    var frame = target;
		    var header = this.cnvHeader;
			header.style.left = -frame.scrollLeft + this.widthColNo;
			var colNo = $(n + "_no");
			colNo.style.top = -frame.scrollTop;    			
			if (this.inplaceEdit.style.display == "") this.exitInplace();
		}catch (e){
		    systemAPI.alert(this+"$doScroll()", e);
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
	setRowCount: function(data, justnumber){			
		this.rowCount = 0;
		var rowNow = this.rowCount;		
		if (rowNow > data)
		{
			for (var i= (rowNow - 1);i >= data;i--)
				this.delRow(i);
		}else
		{
			var values = Array();
			for (var i = 0; i < this.colCount;i++)
				values[i] = "";	
			for (var i = rowNow;i< data;i++)
				this.addRowValues(values,justnumber);
		}		
	},
	doTimer: function(){	
	},
	getRowCount: function(){
		return this.rowCount;
	},
	setColCount: function(data){	
		try{
			this.colCount = data;
			this.inplaceEdit.style.left = 0;
			this.inplaceEdit.style.top = 20;
			this.inplaceEdit.value = "";
			this.colWidth = undefined;
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
				col = new portalui_column(this,i);
				wdth = 80;					
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
			this.setSelectedRow(false, this.row,this.col);
			this.doCellExit(this, this.col, this.row);
			this.setSelectedRow(true, index,this.col);
			this.onCellEnter.call(this, colIdx, index);
			this.setSelIndex(colIdx);
			this.setActiveRow(index);
			this.showButton(index, colIdx);
		}catch(e){
			systemAPI.alert(this+"$setRowIndex()",e);
		}
	},
	setSelectedRow: function(data, row,col){
		
	},
	getMaxRowShow: function(){
		return this.maxRowShow;
	},
	getMaxColShow: function(){
		return this.maxColShow;
	},
	doKeyPress: function(charCode, buttonState){	
	},
	doKeyDown: function(charCode, buttonState, keyCode,event){				
		if ((keyCode == 13)|| (keyCode > 41 && keyCode < 126 && this.inplaceEdit.style.display == "none")){
			if (this.readOnly || this.columns.get(this.col).readOnly || this.columns.get(this.col).hideColumn) {
				if (keyCode == 13){
					if (this.col < this.colCount - 1) this.setRowIndex(this.row, this.col + 1);						
					else if (this.row < this.rowCount - 1) this.setRowIndex(this.row + 1, this.col);						
					else if (this.rowValid(this.row) && this.row + 1 == this.rowCount){
						if (this.allowAutoAppend){
							this.appendRow();
							this.setRowIndex(this.row+1, 0);				
						}else {						
							this.setRowIndex(this.row, 0);				
						}				
					}else return false;	
					var column = this.columns.get(this.col);		
					var width = parseInt(column.getCanvas().style.left);		
					this.frame.scrollLeft = width;
				}
				return false;
			}			
			if (this.inplaceEdit.style.display == "none"){				
				this.showInplaceEdit(this.col, this.row);
				return false;
			}
		}else if (keyCode == 38 ){	
			if (this.row > 0 ) this.setRowIndex(this.row - 1);
			else return false;
			this.goToRow(this.row);
			return false;
		}else if (keyCode == 40) {
		    if (this.col < 0 || this.row < 0) return false;
			if (this.row < this.rowCount - 1 && this.inplaceEdit.style.display == "none") this.setRowIndex(this.row + 1);
			else if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsEllips ){
				this.onEllipsClick.call(this, this.col, this.row);
				return false;
			}else return false;
			this.goToRow(this.row);
			return false;
		}else if (keyCode == 39 && this.inplaceEdit.style.display == "none") {
            if (this.col < this.colCount - 1) this.setRowIndex(this.row, this.col + 1);	
			else return false;	
			var column = this.columns.get(this.col);		
			var width = parseInt(column.getCanvas().style.left);		
			this.frame.scrollLeft = width;
			return false;
		}else if (keyCode == 37 && this.inplaceEdit.style.display == "none") {
			if (this.col > 0) this.setRowIndex(this.row, this.col - 1);		
			else return false;
			var column = this.columns.get(this.col);		
			var width = parseInt(column.getCanvas().style.left);		
			this.frame.scrollLeft = width;
			return false;
		}else if (keyCode == 35){
			var target = event.srcElement || event.target;		
			if (target.tagName != "INPUT") return false;
		}else if (keyCode == 32){
		    var col = this.columns.get(this.col);
            if (col !== undefined){
                if (col.columnFormat == cfBoolean){
                    if (this.cells(this.col, this.row) == "true") 
                        this.cells(this.col, this.row,"false");
                    else this.cells(this.col, this.row,"true");                    
                }                
            } 
            return false;
        }	
		return true;
	},
	addCol: function(data){			
	},
	removeCol: function(index){		
	},
	rearrange: function(startPos){
		try{
			if (this.colCount > 0)
			{			
				var obj = this.columns.get(startPos);							
				var canvas = obj.headerCanvas;
				var left = canvas.offsetLeft;				
				var colObj = obj;
				var width = parseInt(canvas.style.width);		
				var newLeft = left + width;				
				var firstLeft = newLeft;
				startPos++;
				for (var i = startPos; i < this.colCount; i++)
				{
					obj = this.columns.get(i);
					obj.setLeft(newLeft);
					canvas = obj.headerCanvas;
					canvas.style.left = newLeft;
					newLeft = parseInt(canvas.style.left,10) + parseInt(canvas.style.width,10) ;					
					if (obj.hideColumn) canvas.style.display = "none";					
				}
				var node, f = $(this.getFullId()+"_iframe");				
				for (var i=0;i < this.rowCount;i++){
					newLeft = firstLeft;
					for (var col = startPos; col < this.colCount; col++)
					{
						obj = this.columns.get(col);						
						canvas = obj.headerCanvas;						
						node = f.document.getElementById(this.getFullId()+"__row"+i+"_cell"+col);
						if (node) node.style.left = canvas.style.left;						
					}
				}
			}		
		}
		catch(e){
			systemAPI.alert(this+"$rearrange:", e);
		}
	},
	createRow: function(rowId, rowIndex,top, colCount,values){
		var colIdx, width, cursor, colHeader, cellId, formatAlign, fullId = rowId, value,html = "";
		for (var i = 0; i < colCount; i++)
		{
			colHeader = this.columns.get(i);			
			formatAlign = (colHeader.columnFormat == window.cfNilai ? "right":"left");
		    value = values[i];									
			colIdx = i;
			cellId = fullId+"_cell"+colIdx;
			len = rowIndex * this.rowHeight;						
			width = colHeader.width + (document.all  ? 1 : -1);						
			var color = "#e1e2f7";				
			if (colHeader.color == "#e1e2f7")
				color = colHeader.color;					
			if (rowIndex % 2 == 0)
				color = "#a0beff";
			cursor = "default";
			if (colHeader.columnFormat == cfButton)
			{				
				cursor = "pointer";				
				value = "<div style='position:absolute;top:0;left:0;width:99%;height:"+(document.all ? "19" : "17")+";background:transparent;"+
									"	border-top:1px solid #ffffff;border-left:1px solid #ffffff;border-bottom:1px solid #555555;border-right:1px solid #555555'>"+
									"</div>"+
									"<div style='position:absolute;left:0;height:8;width:100%;top:0;background:#ffffff;moz-opacity:0.5;filter:alpha(opacity:50);opacity:0.5'></div>"+
									"<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:0;white-space: nowrap;"+
									" ' "+									
									" > "+value+"</div>";			
			
			}else if (colHeader.columnFormat == cfUpload)
			{				
				this.autoSubmit.get(rowIndex)[colIdx] = true;
				cursor = "pointer";				
				value = "<div style='position:absolute;top:0;left:0;width:99%;height:"+(document.all ? "19" : "17")+";background:transparent;"+
									"	border-top:1px solid #ffffff;border-left:1px solid #ffffff;border-bottom:1px solid #555555;border-right:1px solid #555555'>"+
									"</div>"+									
									"<div id='"+fullId+"_cellFrame"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:0;white-space: nowrap;'"+																		
									" ><iframe id='"+fullId+"_cellUpload"+colIdx+"' name='" + fullId + "_cellUpload"+colIdx+"' border=0 frameBorder='no' style='{position: absolute;border: 0px; top:0;left:0;width: 100%; height:100%;}'   src='uploadCtrl.php?resId=" + this.resourceId + "&ctrl=default&col="+colIdx+"&row="+rowIndex+"' ></iframe>"+
									"<div id='" +fullId + "_bar"+colIdx+"' style='{position: absolute;left: 0; top: 0;width: 100%; height: 100%; display: none; background: url(image/upload.gif) no-repeat left center}' onDblClick='system.getResource(" + this.resourceId + ").viewFrameContent("+colIdx+","+rowIndex+");'></div>" +
									"</div>";			
			
			}else if (colHeader.columnFormat == cfBoolean)
			{				
				cursor = "pointer";		
				if (value.toLowerCase() == "true") var pos = " -13 0";
				else var pos = " 0 0";
				value = "<div id='"+fullId+"_cb_"+colIdx+"' style='position:absolute;top:2;left:5;width:13;height:13;background-image:url(image/themes/"+system.getThemes()+"/checkBox.png);background-position:"+pos+";background-repeat:no-repeat;'"+																	
									"></div>"+									
									"<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
									" style='position:absolute;overflow:hidden;left:20; top:0; height:100%; width:100%;white-space: nowrap;"+
									" color:transparent' "+									
									" > "+value+"</div>";			
			
			}else{													
				value = "<div id='"+fullId+"_cellValue"+colIdx+"' col="+colIdx+" align='"+formatAlign+"' "+
										" style='position:absolute;overflow:hidden;left:0; top:0; height:100%; width:100%;margin-right:0;white-space: nowrap;'"+
										"> "+value+"</div>";			
			}						
			html += "<div id='"+cellId+"' col="+colIdx+" align='"+formatAlign+"' "+
				" style='position:absolute;border:1px solid #919B9B;background:"+color+";overflow:hidden;left:"+colHeader.left+"; top:0; height:"+this.rowHeight+"; width:"+width+";margin-right:0;white-space: nowrap;'"+				
				" onDblClick = 'eventDoubleClick(event, "+rowIndex+","+colIdx+")'; "+
				" onClick = 'eventClick(event,"+rowIndex+", "+colIdx+")'; "+
				" onMouseOver = 'eventMouseOver(event, "+rowIndex+","+colIdx+")'; "+
				" onMouseOut = 'eventMouseOut(event, "+rowIndex+","+colIdx+")'; "+											
				" > "+value+"</div>";
		}	
		var node = document.createElement("div");
		node.id = rowId;
		node.style.cssText = "background:"+color+";position:absolute;left:0;top:"+top+";width:"+this.rowWidth+";height:"+this.rowHeight;
		node.innerHTML = html;
		return node;
	},
	addRowValues: function(values, justNumber){
		try{			
			var col;
			var width = 0;			
			this.rowCount++;			
			this.inplaceEdit.value = "";		
			this.inplaceEdit.col = -1;
			this.inplaceEdit.row = -1;
			var len = this.rowCount - 1;
			var top = len * this.rowHeight;
		//----------------------
			var rowId= this.getFullId()+"__row"+len;			
			var headerCanvas = this.cnvNo;
			var node = $(this.getFullId()+"_no"+len);
			if ((node != undefined)&&(headerCanvas != undefined))
				headerCanvas.removeChild(node);
			node = document.createElement("div");
			node.id = this.getFullId()+"_no"+len;
			node.style.cssText ="position:absolute;background:"+this.fixColor+";height:"+(document.all ? this.rowHeight + 2:this.rowHeight)+";top:"+(top+20)+";width:"+this.widthColNo+";"+
				"border-top:1px solid #E7E7D6;"+
				"border-bottom:1px solid #919B9B;"+
				"border-left:1px solid #E7E7D6;"+
				"border-right:1px solid #919B9B;";									
			node.innerHTML = "<div style='position:absolute;left:0;top:0;width:100%;height:100%;background-image:url(icon/"+system.getThemes()+"/menuselect.png)'><span id='"+rowId+"_no' align='center' style='position:absolute;color:#000000; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(len+1)+"</span></div>";			
			if (headerCanvas != undefined) headerCanvas.appendChild(node);			
		//--------------------	
			if (justNumber == undefined){				
				var node = this.createRow(rowId,len,top, this.colCount, values);												
				this.appendToFrame(node);
			}
		}catch(e){
			systemAPI.alert("$addRowValues()" , e);
		}
	},
	delRow: function(row){
		try{
			var rowObj = this.getFullId()+"__row"+row, rowData, cnv, len = this.rowCount;			
			this.onDeleteRow.call(this, rowObj);									
			this.hideInplaceEdit();
			var headerNo = $(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+(len - 1));
			if ((node != undefined) && (headerNo != undefined))
				headerNo.removeChild(node);			
			var p = this.getFrameDocument();
			node = p.getElementById(rowObj);
			if (node) node.parentNode.removeChild(node);
			var f = this.getFrame();
			var fw = f.contentWindow;						
			for (var i = row; i < this.rowCount; i++){
				var top = i * this.rowHeight;		
				rowObj = this.getFullId()+"__row"+(i+1);	
				rowData = fw.rowData.get(i+1);
				if (rowObj != undefined){								
					node = p.getElementById(rowObj);
					if (node) node.style.top = top;
					fw.rowData.set(i, rowData);
					fw.rowData.del(i+1);
				}				
			}
			this.onNilaiChange.call(this);
			this.rowCount--;
		}catch(e){
			systemAPI.alert(this+"$delRow()", e);
		}	
	},	
	clear: function(defaultRow){
		try{
			this.onBeforeClear.call(this);
			this.frame.display = "none";
			this.clientHTML = "";
			this.clearFrame();
			this.clientHeight = 0;
			this.getFrameBody().style.scrollTop = 0;
			this.getFrameBody().style.scrollLeft = 0;			
			var child, headerNo = $(this.getFullId()+"_no"), node, j = 0;			
			if (headerNo != undefined){
				headerNo.style.top = 0;			
				headerNo.innerHTML = "";
			}
			this.rowCount = 0;
			this.row = 0;
            this.col = 0; 
			if (defaultRow != undefined){			    
				for (var i=0;i < defaultRow;i++){
					this.appendRow();
				}
			}			
			if (this.getFrame().contentWindow.rowData) this.getFrame().contentWindow.rowData.clear();
		}catch(e){
			systemAPI.alert(this+"$clear()",e);
		}
	},
	calcMaxRowShow: function(){
		var maxRow = 0;
		while (maxRow * this.rowHeight < this.getHeight() - 40)
			maxRow++;		
		return maxRow;
	},
	calcMaxColShow: function(){
		return this.maxRowShow;
	},
	getRowTop: function(col, idx){
		try{
			var f = $(this.getFullId()+"_iframe");
			var top = findPos(f.document.body, f.document.getElementById(this.getFullId()+"__row"+idx));
			return top[1] + 20;
		}catch(e){
			systemAPI.alert(this+"$getRowTop:",e);
		}
	},
	getRowLeft: function(col){
		try{	
			var f = $(this.getFullId()+"_iframe");
			var left = findPos(f.document.body, f.document.getElementById(this.getFullId()+"__row"+idx+"_cell"+col));
			return left[0] + 20;	    	
		}catch(e){
			systemAPI.alert(this+"$getRowLeft:",e);
		}
	},
	setCell: function(col, row, value){
		try{			
			var f = document.frames ? document.frames[this.getFullId()+"_iframe"] : $(this.getFullId()+"_iframe");
			var p = f.contentWindow;								
			if (p.setCell)
				p.setCell(col, row,value);
			if (col == this.col && row == this.row) this.inplaceEdit.value = value;
		    if (col >= this.colCount) return false;
		    if (row >= this.rowCount) return false;			
			if (!this.onSwap) this.onChange.call(this,col, row);		
	  }catch(e){
	    systemAPI.alert(this+"$setCell()",e);
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
		var f = this.getFrameWindow();
		if (f.rowData && f.rowData.get(row)) return f.rowData.get(row)[col];				
		return "";
	},
	cells: function(col, row, value){
		if (value !== undefined)
			this.setCell(col, row, value);			
		else return this.getCell(col, row);
		return value;
	},
	getCellDateValue: function(col, row){		
		var value = this.cells(col, row);				
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
			}	
			this.readOnly = data;
		}catch(e){
			systemAPI.alert(this+"$setReadOnly()",e);
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
					var rowObj = this.getFullId()+"__row"+rowIdx;	
					var input = this.inplaceEdit;
					var text = this.cells(colIdx, rowIdx);
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
			systemAPI.alert(this+"$doCellExit()",e);
		}
	},
	goToRow: function(row){
		this.setRowIndex(row);
		var n = this.getFullId();
		var ros = this.rowCount;
		var detailH = ros * 23;
		var rowPos = row * 23;
		var diff = rowPos / detailH; 
		
		var frame = this.getFrameBody();	    
	    frame.scrollTop = row * 18;											
	},
	setActiveRow: function(row){
		this.row = row;
	},
	setWidthColNo: function(data){
		this.widthColNo = data;
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
			var fw = this.getFrameWindow();
			var data1 = [];for (var i in fw.rowData.get(row1)) data1[i] = fw.rowData.get(row1)[i];
			var data2 = [];for (var i in fw.rowData.get(row2)) data2[i] = fw.rowData.get(row2)[i];
			for (var i=0;i < this.colCount;i++)
				this.setCell(i,row1, data2[i]);
			for (var i=0;i < this.colCount;i++)
				this.setCell(i,row2, data1[i]);
			this.onSwap = false;
		}catch(e){
			systemAPI.alert(this+"$swapRow()",e);
		}
	},
	validasi: function(){
		this.onNilaiChange.call(this);
	},
	doChange: function(sender, col, row, param1, param2, param3){
		this.onChange.call(this, col, row, param1, param2, param3);
	},
	isEmpty: function(){		
		return this.getFrameWindow().rowData.getLength() == 0;
	},
	appendRow: function(){
		var values = [];
		for (var i = 0; i < this.colCount;i++)
			values[i] = "";	
		this.addRowValues(values);
		
	},
	appendData: function(data){
		if (this.allowBlank){
			this.addRowValues(data);
		}else{
			var lastRow = this.getRowCount();		
			if (lastRow == 0 || (lastRow > 0 && this.rowValid(lastRow - 1)) ){
				this.addRowValues(data);				
			}
		}
	},
	appendDataByRec: function(data, fields){
		try{
			if (!(data instanceof portalui_arrayMap)) return false;		
			var dataToAppend = [];
			for (var i in fields)
				dataToAppend.push(data.get(fields[i]));
			this.addRowValues(dataToAppend);			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	sort: function(){
	},
	setColTitle: function(data){		
		try{
			for (var i in this.columns.objList)
				this.columns.get(i).setTitle(data[i]);	
			this.refreshLayout();
			this.title = data;
		}catch(e){
			alert(e);	
		}
	},
	setColWidth: function(col, data){						
		try{
			for (var i in col)
				this.columns.get(col[i]).setColWidth(data[i]);			
		}catch(e){
			alert(e);	
		}	
	},
	setColFormat: function(col, data){
		for (var i in col)
			this.columns.get(col[i]).setColumnFormat(data[i]);	
	},
	setNoUrut: function(start){
		if (start == undefined) start = 0;
		var cnv;
		this.startNumber = start;
		for (var i=0;i < this.rowCount;i++)
		{
			cnv = $(this.getFullId()+"_no"+i);
			if (cnv != undefined)
				cnv.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(i)+1+start)+"</span>";
		}
	},
	setData: function(data){
		try{
		}catch(e){
			systemAPI.alert(e,"");
		}
	},
	setTop: function(data){
		window.portalui_saiDataGrid.prototype.parent.setTop.call(this,data);
		if (this.layout != undefined)this.layout.setTop(data+20);
	},
	setLeft: function(data){
		window.portalui_saiDataGrid.prototype.parent.setLeft.call(this,data);
		if (this.layout != undefined)this.layout.setLeft(data+20);
	},
	doTopLeftOver: function(event){
		system.showHint(event.clientX, event.clientY,"Setting Layout",true);
	},
	doTopLeftOut: function(event){
		system.hideHint();
	},
	doTopLeftClick: function(){
		try{
			this.exitInplace();
			if (this.layout === undefined){
				this.createLayoutForm();
				this.refreshLayout();
			}
			if (this.layout.visible)
				this.layout.hide();
			else
				this.layout.show();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	createLayoutForm: function(){
		try{
			uses("portalui_panel;portalui_listBox;portalui_button");
			var left = (this.left+(this.width / 2) - 150 > this.width ? 20 : this.left+(this.width / 2) - 150);
			var top = (this.top + (this.height / 2) - 100> this.height ? 20 : this.top + (this.height / 2) - 100);
			this.layout = new portalui_panel(this.owner,{bound:[left,top,300,200],caption:"Layout",visible:false});
			this.layout.onMouseMove.set(this,"doLayoutMouseMove");
			this.lb1 = new portalui_listBox(this.layout,{bound:[5,25,125,170],dblClick:[this,"doSelectLayout"]});
			this.lb2 = new portalui_listBox(this.layout,{bound:[170,25,125,170],dblClick:[this,"doSelectLayout"]});
			this.b1 = new portalui_button(this.layout,{bound:[135,50,30,18],withImage:false,caption:"Hide",click:[this,"doClickLayout"]});
			this.b2 = new portalui_button(this.layout,{bound:[135,90,30,18],withImage:false,caption:"Show",click:[this,"doClickLayout"]});		
			this.bClose = new portalui_imageButton(this.layout,{bound:[this.layout.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",hint:"Close",click:[this,"doClickLayout"]});
			this.bMin = new portalui_imageButton(this.layout,{bound:[this.layout.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",hint:"Minimize",click:[this,"doClickLayout"]});
		}catch(e){
			systemAPI.alert("createFormLayout:"+e);
		}
	},
	doLayoutMouseMove: function(sender, x,y,button, buttonState){
		if (sender.isClick)
		{					
			var newLeft = sender.left + (x - sender.mouseX);
			var newTop = sender.top + (y - sender.mouseY);		
			if (newLeft < 0) newLeft = 0;			
			if (newLeft + sender.width > sender.owner.width) newLeft = sender.owner.width - sender.width;
			if (newTop < 0) newTop = 0;
			if (newTop + sender.height > sender.owner.height) newTop = sender.owner.height - sender.height;
			sender.setLeft(newLeft);
			sender.setTop(newTop);						
		}	
	},
	refreshLayout: function(){
		var col;
		try{		
			if (this.layout == undefined) return;
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
		try{
			if (sender == this.lb1){	
				this.columns.get(id).hide();
			}else if (sender == this.lb2){		
				this.columns.get(id).show();
			}
			this.refreshLayout();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClickLayout: function(sender ){		
		if (sender == this.b1){
			var item = this.lb1.getSelectedItem();					
			this.columns.get(item[1]).hide();
		}else if (sender == this.b2){
			var item = this.lb2.getSelectedItem();					
			this.columns.get(item[1]).show();
		}else if (sender == this.bClose || sender == this.bMin) this.layout.hide();
		this.refreshLayout();
	},
	gridToHTML: function(){
		var width=0;
		var th = "<tr bgcolor='#CCCCCC'>";
		for (var i=0;i < this.colCount;i++){
			width += this.columns.get(i).width;
			if (!this.columns.get(i).hideColumn)
				th += "<th class='header_laporan' height='25' width='"+this.columns.get(i).width+"'>"+ this.columns.get(i).title +"</th>";
		}
		th += "</tr>";	
		var tr,html = "<br><br><table width='"+width+"' border='1' cellspacing='0' cellpadding='0' class='kotak'>";
		html += th;	
		for (var i=0;i < this.rowCount;i++){
			tr = "<tr>";
			for (var c=0;c < this.colCount;c++){
				if (!this.columns.get(c).hideColumn){
					if (this.columns.get(c).columnFormat == cfNilai)
						tr += "<td height='20' valign='middle' class='isi_laporan' align='right'>"+this.getCell(c,i)+"</td>";
					else
						tr += "<td height='20' valign='middle' class='isi_laporan' >&nbsp;"+this.getCell(c,i)+"</td>";
				}
			}		
			tr += "</tr>";				
			html += tr;
		}
		html += "</table>";
		return html;
	},
	previewHTML: function(){		
	},
	hideFrame: function(){		
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
	print: function(addHeader, outerHtml){
		try{
			var cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined) {		
				if (cnv.style.display == "none")
					cnv.style.display = "";					
				else cnv.style.display = "none";				
			}
			if (addHeader == undefined) addHeader = "";
			var winfram= window.frames[this.getFullId() +"_iframe"];			
			winfram.focus();			
			winfram.print();	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	autoWidth: function(){		
	},
	ellipsClick: function(event){
		this.onEllipsClick.call(this, this.col,this.row);
	},
	dropDownClick: function(event){
		try{	
			if ((window.dropDown == undefined) || (!window.dropDown.visible)){
				var x = event.clientX;
				var y = event.clientY;
				var colHeader = this.columns.get(this.col);
				if (this.inplaceEdit.style.display == ""){
					var canvas = this.inplaceEdit;
					x = canvas.offsetLeft,y = canvas.offsetTop + this.rowHeight;
				}else {
					var rowObj = this.getFullId()+"__row"+this.row;
					var canvas = this.getFrameDocument().getElementById(rowObj+"_cellValue"+this.col);
					var pos = findPos(this.getFrameBody(),canvas);
					x = pos[0],y = pos[1] + this.rowHeight;
				}
				var width = canvas.offsetWidth;							
				if (window.dropDown != undefined)
					window.dropDown.free();
				
				var app = this.getApplication();
				uses("portalui_dropDownBox");				
				window.dropDown = new portalui_dropDownBox(app);//dropDownBox(window.system._mainForm.activeChildForm);
				
				this.pickList = this.columns.get(this.col).pickList;
				window.dropDown.onSelect.set(this, "dropDownBoxSelect");
				window.dropDown.setItems(this.pickList);
				window.dropDown.setWidth(width);	
				window.dropDown.setSelectedId(this.selectedId);
				window.dropDown.setLeft(x + 1);
				var scrHeight = form.getHeight();															
				if ((y + window.dropDown.getHeight()) > scrHeight){								
					if (document.all)
						window.dropDown.setTop(y - window.dropDown.getHeight() + 1);
					else
						window.dropDown.setTop(y - window.dropDown.getHeight() - 1 );			
				}
				else
					window.dropDown.setTop(y);			
				window.dropDown.bringToFront();
				window.dropDown.setVisible(true);
				
			}
				else window.dropDown.setVisible(false);
		}
		catch (e){
			systemAPI.alert(this+"$dropDownClick()", e);
		}
	},
	dropDownBoxSelect: function(sender, selectedId, caption){
		try{
			this.setCell(this.col, this.row, caption);	
			this.selectedId = selectedId;	
			window.dropDown.hide();	
		}catch(e){
			systemAPI.alert(this+"$dropDownSelect()", e);
		}
	},
	dateClick: function(event){
	    var x = event.clientX;
	    var y = event.clientY;
		var column = this.columns.get(this.col);
	    var canvas = $(column.getFullId());
	    var width = canvas.offsetWidth;
		var rowObj = this.getFullId()+"__row"+this.row;
		var canvas = this.getFrameDocument().getElementById(rowObj+"_cellValue"+this.col);
	    var pos = findPos(this.getFrameBody(),canvas);
		x = pos[0],y = pos[1] + this.rowHeight;
		
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
			systemAPI.alert(this+"$pickerSelect()", e);
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
						if (app !== undefined && app.systemDatePickerForm != undefined)
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
		for (var r = 0 ;r < this.rowCount;r++){
			for (var i = 0;i < this.colCount;i++)
				valid = valid && this.cells(i,r) != "";						
			if (!valid) break;
		}
		return valid;		
	},
	isEmpty: function(){
		var valid = true;
		for (var r = 0 ;r < this.rowCount;r++){
			for (var i = 0;i < this.colCount;i++)
				valid = valid && trim(this.cells(i,r)) == "";
			if (!valid) break;
		}
		return valid;		
	},
	getRowValidCount: function(){
		var valid = true, c = 0;
		for (var r = 0 ;r < this.rowCount;r++){
			for (var i = 0;i < this.colCount;i++)
				valid = valid && this.cells(i,r) != "";						
			if (valid) c++;			
		}
		return c;		
	},
	rowValid: function(row){
		var valid = true;
		for (var i = 0;i < this.colCount;i++)
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
		this.showInplaceEdit(col,row);		
	},
	setAllowAutoAppend: function(data){
		this.allowAutoAppend = data;
	},
	setColumnReadOnly: function(data, incl, excl){
		for (var i in incl)
			this.columns.get(incl[i]).setReadOnly(data);	
		for (var i in excl)
			this.columns.get(excl[i]).setReadOnly(!data);
	},
	setButtonStyle: function(col, btnStyle){		
		for (var i in col)
			this.columns.get(col[i]).setButtonStyle(btnStyle[i]);	
	},
	setColMaxLength: function(col, data){		
		for (var i in col)
			this.columns.get(col[i]).setMaxLength(data[i]);	
	},
	setPickList: function(col, items){		
		for (var i in col)
			this.columns.get(col[i]).setPicklist(items[i]);	
		
	},
	setAllowBlank: function(data){
		this.allowBlank = data;
	},
	setRowNumber: function(start){
		this.setNoUrut();
	},
	setUploadParam: function(col,param1, param2, param3, param4){
		for (var i in col){
			var colObj = this.columns.get(col[i]);				
			if (colObj !== undefined){
				if (param1 !== undefined) colObj.setParam1(param1);
				if (param2 !== undefined) colObj.setParam2(param2);
				if (param3 !== undefined) colObj.setParam3(param3);
				if (param4 !== undefined) colObj.setParam4(param4);			
			}
		}
	},
	setAutoSubmit: function(col, data){
		for (var i in col){
			var colObj = this.columns.get(col[i]);							
			if (colObj !== undefined){
				colObj.setAutoSubmit(data);
			}
		}
	},
	setColHide: function(col, data){
	},
	setCellColor: function(col, row, color){
	   var node = this.getFrameDocument().getElementById(this.getFullId()+"__row"+row+"_cell"+col);
	   if (node) node.style.background = color;
    },
    setRowHeight: function(rowHeight, row){
        this.rowHeight = rowHeight;
        if (row){
           var rowObj = this.getFullId()+"__row"+row;	
    	   var node = this.getFrameDocument().getElementById(rowObj);
		   if (node) node.style.height = this.rowHeight;
    	   row = $(this.getFullId()+"_no"+row);
    	   row.style.height = rowHeight;
    	   var top = node.offsetTop + this.rowHeight;
    	   for (var i=row+1;i < this.rowCount;i++){
				rowObj = this.getFullId()+"__row"+i;	
			    node = this.getFrameDocument().getElementById(rowObj);
			    if (node) node.style.top = top;
				row = $(this.getFullId()+"_no"+i);
				row.style.top = top + 20;
				top += parseInt(row.offsetHeight);
	       }
	   }else {
	       var rowObj,top = 0; 
	       for (var i=0;i < this.getRowCount();i++){
				rowObj = this.getFullId()+"__row"+i;
			    node = this.getFrameDocument().getElementById(rowObj);
			    if (node) { node.style.top = top,node.style.height = rowHeight;
				}				
				row = $(this.getFullId()+"_no"+i);
         	    row.style.height = rowHeight;
         	    row.style.top = top + 20;
				top += parseInt(rowHeight);
	       }
       }
    },
    setAutoPaging: function(data){
    },
	setDisableCtrl: function(){
	},
    doDisableCtrl : function(){
	},
	showInplaceEdit: function(idx, row, top){
		try{
			var colHeader = this.columns.get(idx);	
			if (colHeader.hideColumn) return false;
			if (colHeader.columnFormat == cfButton || colHeader.columnFormat == cfUpload) return false;		
			var fw = this.getFrameWindow();
			if (colHeader.columnFormat == cfBoolean) {
				this.cells(idx, row, (fw.rowData.get(row)[idx].toLowerCase() == "false" || fw.rowData.get(row)[idx] == ""? "true" : "false"));
				return false;
			}									
			var f = this.getFrameDocument();
			top = findPos(f.body, f.getElementById(this.getFullId()+"__row"+row));
			top = top[1] + 20 - f.body.scrollTop;								
			this.inplaceEdit.style.top = top;
			this.inplaceEdit.style.width = colHeader.width + 1;
			this.inplaceEdit.style.left = colHeader.left + this.widthColNo - f.body.scrollLeft;						
			if (colHeader.maxLength > 0) this.inplaceEdit.maxLength = colHeader.maxLength;
			this.inplaceEdit.col = idx;
			this.inplaceEdit.row = row;
			this.inplaceEdit.zIndex = 99999999;		
			var plus = row == this.rowCount - 1 ? 2:1;			
			this.inplaceEdit.style.height = document.all ? parseInt(this.rowHeight) : parseInt(this.rowHeight)+plus;					
			this.inplaceEdit.style.display = "";											
			if (colHeader.columnFormat == cfNilai){
				this.inplaceEdit.style.textAlign = 'right';
				this.inplaceEdit.value = RemoveTitik(this.cells(idx,row));
			}else{
				this.inplaceEdit.style.textAlign = 'left';
				this.inplaceEdit.value = this.cells(idx,row);
			}
			setCaret(this.inplaceEdit, 0,this.inplaceEdit.value.length);
			this.inplaceEdit.focus();		
			this.doSetFocus();
		}catch(e){
			alert(e);
		}
	},
	getFrame: function(){
		return document.frames ? window.frames[this.getFullId() +"_iframe"] : $(this.getFullId()+"_iframe");
	},
	getFrameWindow: function(){
		return this.getFrame().contentWindow;
	},
	getFrameDocument: function(){
		return this.getFrame().document || this.getFrame().contentDocument;
	},
	getFrameBody: function(){
		return this.getFrameDocument().body;
	},	
	clearFrame: function(){
		var winfram= window.frames[this.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write("");
		winfram.document.close();
	},	
	setSQL: function(sql, page, rowPerPage){		
		this.clear();
		var iframe = $(this.getFullId()+"_iframe");
		iframe.style.width = this.frame.style.width;
		iframe.style.height = this.frame.style.height;			
		var colWidth = new server_util_arrayList();
		for (var i in this.columns.objList) colWidth.add(this.columns.get(i).width);
		this.serverControl.setLinkCtrl(this.resourceId, this.getFullId(), colWidth);
		this.serverControl.setSQL(sql, page, rowPerPage);
		showProgress();
		$(this.getFullId()+"_iframe").src = this.serverControl.getControl();				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.serverControl){
			if (methodName == "setSQL" || methodName == "setLinkCtrl"){
				showProgress();
			}
		}
	},
	appendToFrame: function(node){
		this.getFrameBody().appendChild(node);		
	},
	doLoadFrame: function(event){				
	}
});
