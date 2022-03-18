//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
if (window.cfHurufKecil == undefined) window.cfHuruKecil = 8;
if (window.cfLowerCase == undefined) window.cfLowerCase = 8;
if (window.cfUpperCase == undefined) window.cfUpperCase = 4;

window.portalui_saiGrid = function(owner, options){
	if (owner){
		try{
			this.height = 200;
			this.widthColNo = 25;
			this.width = 500;
			this.headerHeight = 20;
			window.portalui_saiGrid.prototype.parent.constructor.call(this, owner);	
			this.className = "portalui_saiGrid";
			this.year = (new Date()).getFullYear();
			this.month = (new Date()).getMonth() + 1;
			this.day = (new Date()).getDate();
				
			this.readOnly = false;
			this.startNumber = 0;
			this.pasteEnable = false;
			this.colCount = 0;
			this.rowCount = 0;	
            this.rowHeight = 19;	
            this.checkItem = false;	
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
			this.disableCtrl = false;
			this.col = 0;
			this.row = 0;			
			this.tabStop = true;
			this.page = 1;
			this.rowPerPage = 20;
			this.columns = new portalui_arrayMap();
			this.rows = new portalui_arrayMap();			
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
			this.onAppendRow = new portalui_eventHandler();
			this.onAfterPaste = new eventHandler();
			this.totFixedCol = 0;
			this.title = [];
			this.rowData = new portalui_arrayMap();
			this.rowsID = new portalui_arrayMap();
			this.cellValue =  [];
			this.pressKeyDown = false;
			this.rowSelect = false;
			this.fixColor = system.getConfig("form.grid.fixedColor");//"#084972";//"#c4c4a3";		
			this.color = system.getConfig("form.grid.color");
			uses("portalui_rowGrid;portalui_column");			
			//------------			
			this.first = false; //eventKeyPress
			this.rightBtn = false;			
			this.btnVisible = true;
			this.allowAutoAppend = true;
			this.addHeader = "";
			this.allowBlank = false;
			if (options !== undefined){
				this.updateByOptions(options);				
				if (options.autoAppend !== undefined) this.setAllowAutoAppend(options.autoAppend);
				if (options.appendRow !== undefined) this.onAppendRow.set(options.appendRow[0],options.appendRow[1]);
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
				if (options.cellExit !== undefined) this.onCellExit.set(options.cellExit[0],options.cellExit[1]);
				if (options.cellEnter !== undefined) this.onCellEnter.set(options.cellEnter[0],options.cellEnter[1]);
				if (options.nilaiChange !== undefined) this.onNilaiChange.set(options.nilaiChange[0],options.nilaiChange[1]);
				if (options.click !== undefined) this.onClick.set(options.click[0],options.click[1]);
				if (options.dblClick !== undefined) this.onDblClick.set(options.dblClick[0],options.dblClick[1]);
				if (options.beforeClear !== undefined) this.onBeforeClear.set(options.beforeClear[0], options.beforeClear[1]);
				if (options.deleteRow !== undefined) this.onDeleteRow.set(options.deleteRow[0], options.deleteRow[1]);
				if (options.afterPaste !== undefined) this.onAfterPaste.set(options.afterPaste[0], options.afterPaste[1]);
				if (options.colHide !== undefined) this.setColHide(options.colHide[0],options.colHide[1]);				
				if (options.rowHeight !== undefined) this.setRowHeight(options.rowHeight);
				if (options.rowSelect !== undefined) this.setRowSelect(options.rowSelect);
				if (options.autoPaging) this.setAutoPaging(options.autoPaging);
				if (options.disableCtrl) this.setDisableCtrl(options.disableCtrl);
				if (options.colAlign !== undefined) this.setColAlign(options.colAlign[0],options.colAlign[1]);
				if (options.colHint !== undefined) this.setColHint(options.colHint[0], options.colHint[1]);
				if (options.colColor !== undefined) this.setColColor(options.colColor[0],options.colColor[1]);
				if (options.colMaxLength !== undefined) this.setColMaxLength(options.colMaxLength[0], options.colMaxLength[1]);
				if (options.headerColor !== undefined) this.setHeaderColor(options.headerColor[0],options.headerColor[1]);
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.checkItem !== undefined) this.setCheckItem(options.checkItem);
				if (options.rowPerPage !== undefined) this.setRowPerPage(options.rowPerPage);
				if (options.pasteEnable !== undefined) this.setPasteEnable(options.pasteEnable);
				
			}
		}catch(e){
			systemAPI.alert(this+"$create:",e);
		}
	}
};
window.portalui_saiGrid.extend(window.portalui_containerControl);
window.saiGrid = window.portalui_saiGrid;
window.portalui_saiGrid.implement({
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
			var left = w / 2 - 25, top = h / 2 + 25;
			var html =  "<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' frameborder='0' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;z-index:999}' onscroll='$$("+this.resourceId+").doScrollFrame(event)'></iframe>" +
						"<div id='"+n+"_header' style='{position:absolute;overflow:visible;left: "+this.widthColNo+";top: 0; width:100%; height:"+this.headerHeight+"px;}'>"+
						"</div>"+
						"<div id='"+n+"_no' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabContent.png) top left no-repeat;background-color:"+system.getConfig("form.grid.fixedColor")+"; overflow:visible;left: 0;top: 0; width:"+this.widthColNo+"; height:100%;}'>"+
						"</div>"+
						"<div id='"+n+"_topLeft' style='{position:absolute;background:url(icon/"+system.getThemes()+"/tabCont.png) top left no-repeat;background-color:#084972;cursor:pointer;"+
							"left: 0;top: 0; width:"+(this.widthColNo)+"; height:"+this.headerHeight+"px; "+
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
						"<div id='"+n+"form' style='{position:absolute;left: "+this.widthColNo+";top: "+this.headerHeight+"; width: "+w+"px; height: "+h+"px; overflow: auto;}' onscroll='$$("+this.resourceId+").doScroll(event)' >"+
							//"<div style='{position:absolute;left: 0;top: 0; width: 100%; height: 100%; overflow: visible;}'>  "+				
							//"</div>"+					
							"<input id='"+n+"_edit' type='text'  value='' maxlength='1000'"+
							"style='{display:none;width:80px;height:"+(document.all ? "18":"18")+"px;"+
							"position:absolute;left:0;top:0;border:small solid #FF00FF;color:#000000;z-index:97;"+
							"border-width:1;}' "+
							"onkeypress='return $$(" + this.resourceId + ").eventKeyPress(event);' "+
							"onchange='return $$(" + this.resourceId + ").eventChange(event);' "+
							"onkeydown='return $$(" + this.resourceId + ").eventKeyDown(event);' "+
							"onfocus='$$(" + this.resourceId + ").doFocusEdit(event);' "+
							"onblur='$$(" + this.resourceId + ").eventExit(event);' " +						
							"/>"+
						"</div>"+																	
						"<div id='"+n+"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
							"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
							"<span style='{position:absolute;left: "+(left)+";top: "+(top)+";width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
						"</div>";			
			this.setInnerHTML(html, canvas);
			this.cnvNo = $(n +"_no");
			this.topLeft = $(n +"_topLeft");
			this.cnvHeader = $(n +"_header");
			this.inplaceEdit = $(n +"_edit");
			this.frame = $(n +"form");
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
				if (target) this.setCell(target.col, target.row, target.value);
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
			this.setCell(this.inplaceEdit.col, this.inplaceEdit.row, this.inplaceEdit.value); 
		}catch(e){
			alert(e);
		}
    },
	doFocusEdit: function(event){
		try{					
			var target = event.srcElement || event.target;		
			var colHeader = this.columns.get(this.col);
			var rowIndex = this.row;
			var idx = this.col;
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
					node.style.zIndex = 9999;
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
							"onclick = '$$("+this.resourceId+").ellipsClick(event,"+idx+","+rowIndex+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+","+rowIndex+")'"+							
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
				node.style.width = 20;
				node.style.height = 20;
				node.style.cursor = "pointer";
				
				var html = "<div style='position:absolute; left: 0; top : 1; width:100%; height: 100%;' "+
							"onclick = '$$("+this.resourceId+").dropDownClick(event,"+idx+","+rowIndex+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+","+rowIndex+")'"+														
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
							"onclick = '$$("+this.resourceId+").dateClick(event,"+idx+","+rowIndex+")' "+
							"onmousedown='$$("+this.resourceId+").doMouseDown(event,"+idx+","+rowIndex+")'"+						
							"></div>";
				node.innerHTML = html;
				if (!isThere)
					this.canvas.appendChild(node);
				else{
					var app = this.getApplication();
					if (app.systemDatePickerForm != undefined)
						app.systemDatePickerForm.setTop(top + this.headerHeight -2);	
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
			if (this.pressKeyDown) return false;
			else return true;
   		}catch(e){
   		   alert(e);
        }
	},
	isLastCol: function(col){		
		if ((col + 1== this.columns.getLength() && !this.columns.get(col).hideColumn) || this.columns.get(col+1).columnFormat == cfButton)
			return true;
		else if (col < this.columns.getLength()){
			var lastHide = col;
			for (var i=col; i < this.columns.getLength(); i++){
				if (!this.columns.get(i).hideColumn) lastHide = i;
			}
			if (col == i && !this.columns.get(col).hideColumn) return true;
			else return false;
		}
		return false;
	},
	eventKeyDown: function(event){
		try{
			window.system.buttonState.set(event);			
			var tab = false;
			if (event.keyCode == 9)
				tab = true;					
			if ((event.keyCode == 13 || event.keyCode == 9))
			{												
				if (this.col + 1< this.columns.getLength()){
					this.exitInplace();	
					if (this.isLastCol(this.col) && this.rowValid(this.row) && this.row + 1 == this.rows.getLength() ){
						if (this.allowAutoAppend){							
							this.appendRow();
							if (this.onAppendRow.method == undefined) {
								if (this.autoPaging){
									if (this.rowCount % this.rowPerPage == 1 && this.row != 0){
										this.nextPage();
										this.setRowIndex(0, 0);													
										this.onAfterPaste.call(this, this.rowCount, this.page);
									}else this.setRowIndex(this.row+1, 0);				
								}else this.setRowIndex(this.row+1, 0);				
							}
						}else {						
							this.setRowIndex(this.row, 0);				
						}
					} else {
						this.setRowIndex(this.row, this.col + 1);
					}
				}else if ( this.row + 1 < this.rows.getLength())
					this.setRowIndex(this.row+1, 0);				
				else if (this.rowValid(this.row) && this.row + 1 == this.rows.getLength()){
					if (this.allowAutoAppend){
						this.exitInplace();									
						this.appendRow();
						if (this.onAppendRow.method == undefined) {
							if (this.autoPaging){								
								if (this.rowCount % this.rowPerPage == 1 && this.row != 0){
									this.nextPage();								
									this.setRowIndex(0, 0);				
									this.onAfterPaste.call(this, this.rowCount, this.page);
								}else this.setRowIndex(this.row+1, 0);				
							}else this.setRowIndex(this.row+1, 0);				
						}
					}else {						
						this.setRowIndex(this.row, 0);				
					}
				}else if (this.inplaceEdit.value != "" && this.inplaceEdit.style.display == "" && this.row + 1 == this.rows.getLength()){
					this.exitInplace();									
					this.appendRow();
					if (this.onAppendRow.method == undefined) {
						if (this.autoPaging){							
							if (this.rowCount % this.rowPerPage == 1 && this.row != 0){
								this.nextPage();								
								this.setRowIndex(0, 0);				
								this.onAfterPaste.call(this, this.rowCount, this.page);
							}else this.setRowIndex(this.row+1, 0);				
						}else this.setRowIndex(this.row+1, 0);				
					}
				}else this.setRowIndex(this.row, 0);				
				if (!this.columns.get(this.col).readOnly){					
					if (this.disableCtrl){
						this.exitInplace();
					}else{
						var rows = this.rows.get(this.row);
						rows.showInplaceEdit(this.col);
					}
				}
				this.pressKeyDown = false;	
				var rows = this.rows.get(this.row);		
				var width = 0;
				width = parseInt(rows.cellsObj[this.col].style.left) + this.columns.get(this.col).width;
				if (width > this.frame.scrollLeft + this.width - this.widthColNo) this.frame.scrollLeft = width;
				else if (width < this.frame.scrollLeft) this.frame.scrollLeft = width - this.columns.get(this.col).width;
				
			}else if ((event.keyCode == 40)&&(!this.pressKeyDown))
			{				
    			if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsEllips ){
    				this.onEllipsClick.call(this, this.col, this.row);    
    				return false;
    			}else if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsAuto ){
    				if ((window.dropDown == undefined) || (!window.dropDown.visible)){
						if (this.inplaceEdit.style.display == "")
							var canvas = this.inplaceEdit;
						else {
							var rowObj = this.rows.get(this.row);
							var canvas = $(rowObj.getFullId()+"_cellValue"+this.col);
							var width = canvas.offsetWidth;
						}												
						var width = canvas.offsetWidth;
						var x = findPos(window.pageCnv,canvas);
						var y = x[1] + parseInt(canvas.offsetHeight)+4;
						x = x[0] + 5;
						var colHeader = this.columns.get(this.col);
						
						var form = this.getForm();										
						if (window.dropDown != undefined)
							window.dropDown.free();
						
						var app = this.getApplication();
						uses("portalui_dropDownBox");				
						window.dropDown = new portalui_dropDownBox(app);//dropDownBox(window.system._mainForm.activeChildForm);
						
						this.pickList = this.columns.get(this.col).pickList;
						window.dropDown.col = this.col;
						window.dropDown.row = this.row;
						window.dropDown.onSelect.set(this, "dropDownBoxSelect");
						window.dropDown.setItems(this.pickList);
						window.dropDown.setWidth(width);	
						window.dropDown.setCtrl(this);
						window.dropDown.setSelectedId(this.selectedId);
						window.dropDown.setLeft(x + 1);
						var scrHeight = form.getHeight();															
						if ((y + window.dropDown.getHeight()) > scrHeight){				
							y-=this.headerHeight;
							if (document.all)
								window.dropDown.setTop(y - window.dropDown.getHeight() + 1);
							else
								window.dropDown.setTop(y - window.dropDown.getHeight() - 1 );			
						}
						else
							window.dropDown.setTop(y);			
						window.dropDown.bringToFront();
						window.dropDown.show();
						
					}else window.dropDown.close();		
    				return false;
    			}
                this.pressKeyDown = true;
				return false;	
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
		if (this.frame){
			this.frame.style.width = width - this.widthColNo;
			this.frame.style.height = height - this.headerHeight;
		}
	},	
	doScroll: function(event){
		try{
			var n = this.getFullId();	
		    var frame = this.frame;//$(n + "_frame");
		    var header = this.cnvHeader;//$(n + "_header");
			if (systemAPI.browser.chrome){				
				header.style.left = parseFloat(frame.scrollLeft)* -1 + parseFloat(this.widthColNo);
			}else header.style.left = -frame.scrollLeft + this.widthColNo;
			
			var colNo = $(n + "_no");
			colNo.style.top = parseFloat(frame.scrollTop) * -1;    
			
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
			this.exitInplace();
		}catch (e){
		    systemAPI.alert(this+"$doScroll()", e);
		}
	},
	showLoading: function(){
		var block = $(this.getFullId()+"_block");
		if (block) block.style.display = "";
		this.getClientCanvas().style.display = "none";
	},
	hideLoading: function(){
		var block = $(this.getFullId()+"_block");
		if (block) block.style.display = "none";
		this.getClientCanvas().style.display = "";
	},
	setRowCount: function(data){	
		this.rowCount = 0;
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
		if (this.autoPaging)
			return this.rowData.getLength();
		else 
			return this.rows.getLength();
	},
	setColCount: function(data){	
		try{
			this.colCount = data;
			for (var i=0;i < data;i++) this.cellValue[i] = []; 
			if (this.inplaceEdit){
				this.inplaceEdit.style.left = 0;
				this.inplaceEdit.style.top = this.headerHeight;
				this.inplaceEdit.value = "";
				this.inplaceEdit.style.display = "none";
				this.exitInplace();
			}
			this.col = 0;
			this.row = 0;						
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
		//var block = $(this.getFullId()+"_block");
		//block.style.display = "";
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
		col = new portalui_column(this,(this.colCount-1));		
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
		//block.style.display = "none";
	},
	getColCount: function(){
		return this.colCount;
	},
	setSelIndex: function(index){
		this.selIndex = index;
		this.col = index;
	},
	setRowIndex: function(index, colIdx, trigger){	
		try{
			if (colIdx === undefined) colIdx = this.col;						
			if (index >= this.rows.getLength()) index = this.rows.getLength() - 1;
			if (trigger == undefined){
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
				//this.inplaceEdit.value = Obj.getCellValue(index);
				this.onCellEnter.call(this, colIdx, index);
			}
			this.setSelIndex(colIdx);
			this.setActiveRow(index);			
			this.showButton(index, colIdx);
			if (trigger == undefined){
				var rowObj = this.rows.objList[index];						
				if (rowObj != undefined && !this.readOnly){
					rowObj.showInplaceEdit(colIdx);
				}
			}
		}catch(e){
			systemAPI.alert(this+"$setRowIndex()",e);
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
	doSystemPaste: function(str){
		var method = this.onChange.method;			
		this.onChange.method = undefined;
		var line,rows = str.split("\n");
		var row = this.row;
		var col = [];
		var startCol = this.col; 
		var lastCol = (rows[0].split("\t").length + startCol >= this.getColCount() ? this.getColCount() : rows[0].split("\t").length + startCol);
		for (var c =startCol;c < lastCol;c++) col[col.length] = c;		
		for (var i in rows){
			if (rows[i] == "") continue;
			line = rows[i];			
			// jika row masih kurang dari rowcount, edit row, else appendData
			var dataTmp = line.split("\t");
			for (var dt=0; dt < dataTmp.length; dt++){
				if (dataTmp[dt] == "") dataTmp[dt] = "-";
			}
			if (row < this.getRowCount()){				
				this.editData(row,dataTmp, col );
			}else if (this.appendData(dataTmp)){
				
			}else return false;		
			row++;	
		}		
		this.onChange.method = method;
		//error_log(this.onChange.method);
		this.onAfterPaste.call(this, this.rowCount);
	},
	doKeyDown: function(charCode, buttonState, keyCode,event){							
		if ((keyCode == 13)|| (keyCode > 41 && keyCode < 126 && this.inplaceEdit.style.display == "none")){
			if (this.readOnly || this.columns.get(this.col).readOnly || this.columns.get(this.col).hideColumn) {
				if (keyCode == 13){
					if (this.col < this.columns.getLength() - 1) this.setRowIndex(this.row, this.col + 1);						
					else if (this.row < this.rows.getLength() - 1) this.setRowIndex(this.row + 1, this.col);						
					else if (this.rowValid(this.row) && this.row + 1 == this.rows.getLength()){
						if (this.allowAutoAppend){
							this.appendRow();
							this.setRowIndex(this.row+1, 0);				
						}else {						
							this.setRowIndex(this.row, 0);				
						}				
					}else return false;	
					var rows = this.rows.get(this.row);		
					var width = 0;					
					width = parseInt(rows.cellsObj[this.col].style.left) + this.columns.get(this.col).width;		
					if (width > this.frame.scrollLeft + this.width - this.widthColNo) this.frame.scrollLeft = width;
					else if (width < this.frame.scrollLeft) this.frame.scrollLeft = width - this.columns.get(this.col).width;
				}
				return false;
			}			
			if (this.inplaceEdit.style.display == "none"){
				if (!(this.readOnly && this.columns.get(this.col).readOnly)){
					var rows = this.rows.get(this.row);
					rows.showInplaceEdit(this.col);					
				}
				return false;
			}
		}else if (keyCode == 38 ){	
			if (this.row > 0 ) this.setRowIndex(this.row - 1);
			else return false;
			this.goToRow(this.row);
			return false;
		}else if (keyCode == 40) {					
		    if (this.col < 0 || this.row < 0) return false;
			if (this.row < this.rows.getLength() - 1 && this.inplaceEdit.style.display == "none") {				
				this.setRowIndex(this.row + 1);				
				this.goToRow(this.row);
				return false;
			}else if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsEllips ){
				this.onEllipsClick.call(this, this.col, this.row);
				return false;
			}else if (this.columns.get(this.col) !== undefined && this.columns.get(this.col).buttonStyle == bsAuto ){
    				if ((window.dropDown == undefined) || (!window.dropDown.visible)){
						if (this.inplaceEdit.style.display == "")
							var canvas = this.inplaceEdit;
						else {
							var rowObj = this.rows.get(this.row);
							var canvas = $(rowObj.getFullId()+"_cellValue"+this.col);
							var width = canvas.offsetWidth;
						}												
						var width = canvas.offsetWidth;
						var x = findPos(window.pageCnv,canvas);
						var y = x[1] + parseInt(canvas.offsetHeight)+4;
						x = x[0] + 5;
						var colHeader = this.columns.get(this.col);
						
						var form = this.getForm();										
						if (window.dropDown != undefined)
							window.dropDown.free();
						
						var app = this.getApplication();
						uses("portalui_dropDownBox");				
						window.dropDown = new portalui_dropDownBox(app);//dropDownBox(window.system._mainForm.activeChildForm);
						
						this.pickList = this.columns.get(this.col).pickList;
						window.dropDown.col = this.col;
						window.dropDown.row = this.row;
						window.dropDown.onSelect.set(this, "dropDownBoxSelect");
						window.dropDown.setItems(this.pickList);
						window.dropDown.setWidth(width);	
						window.dropDown.setSelectedId(this.selectedId);
						window.dropDown.setCtrl(this);
						window.dropDown.setLeft(x + 1);
						var scrHeight = form.getHeight();															
						if ((y + window.dropDown.getHeight()) > scrHeight){				
							y-=this.headerHeight;
							if (document.all)
								window.dropDown.setTop(y - window.dropDown.getHeight() + 1);
							else
								window.dropDown.setTop(y - window.dropDown.getHeight() - 1 );			
						}
						else
							window.dropDown.setTop(y);			
						window.dropDown.bringToFront();
						window.dropDown.show();
						
					}else window.dropDown.close();		
    				return false;
    		}
			this.goToRow(this.row);
			return false;
		}else if (keyCode == 39 && this.inplaceEdit.style.display == "none") {
            if (this.col < this.columns.getLength() - 1) this.setRowIndex(this.row, this.col + 1);	
			else return false;	
			var rows = this.rows.get(this.row);		
			var width = 0;
			width = parseInt(rows.cellsObj[this.col].style.left) + this.columns.get(this.col).width;		
			if (width > this.frame.scrollLeft + this.width - this.widthColNo) this.frame.scrollLeft = width;
			else if (width < this.frame.scrollLeft) this.frame.scrollLeft = width - this.columns.get(this.col).width;
			return false;
		}else if (keyCode == 37 && this.inplaceEdit.style.display == "none") {
			if (this.col > 0) this.setRowIndex(this.row, this.col - 1);		
			else return false;
			var rows = this.rows.get(this.row);		
			var width = 0;
			width = parseInt(rows.cellsObj[this.col].style.left) + this.columns.get(this.col).width;		
			if (width > this.frame.scrollLeft + this.width - this.widthColNo) this.frame.scrollLeft = width;
			else if (width < this.frame.scrollLeft) this.frame.scrollLeft = width - this.columns.get(this.col).width;
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
		return false;
	},
	addCol: function(data){	
		for (var i = this.colCount; i < this.colCount + data; i++){		

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
			if (this.columns.getLength() > 0)
			{			
				var obj = this.columns.get(startPos);							
				var canvas = obj.headerCanvas;//$(obj.getFullId()+"_colHead");								
				var left = canvas.offsetLeft;				
				var colObj = obj;
				var width = parseInt(canvas.style.width);		
				var newLeft = left + width;				
				startPos++;
				for (var i = startPos; i < this.colCount; i++)
				{
					obj = this.columns.get(i);
					obj.setLeft(newLeft);
					canvas = obj.headerCanvas;
					canvas.style.left = newLeft;
					newLeft = parseInt(canvas.style.left,10) + parseInt(canvas.style.width,10) ;					
					if (obj.hideColumn) canvas.style.display = "none";				
					//canvas = obj.getCanvas();
					//obj.doDraw(canvas);			
					obj.refreshCells();				
				}
					
			}		
		}
		catch(e){
			systemAPI.alert(this+"$rearrange:", e);
		}
	},
	viewRowData: function(values){
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
			var top = len * this.rowHeight;
		//---------------------			
			var rowObj = new portalui_rowGrid(this, len);	
			var n = rowObj.getFullId();
			var headerCanvas = this.cnvNo;//$(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+len);
			if ((node != undefined)&&(headerCanvas != undefined))
				headerCanvas.removeChild(node);
			node = document.createElement("div");
			node.id = this.getFullId()+"_no"+len;	
			
			node.style.background = this.fixColor;			
			node.style.height = document.all ? this.rowHeight + 2:this.rowHeight;
			node.style.top = top + this.headerHeight;
			node.style.width = this.widthColNo;
			node.style.color = system.getConfig("form.grid.fixedFontColor");
			node.style.borderTop =  window.system.getConfig("3dborder.inner.top");
			node.style.borderBottom =  window.system.getConfig("3dborder.inner.bottom");
			node.style.borderLeft =  window.system.getConfig("3dborder.inner.top");
			node.style.borderRight =  window.system.getConfig("3dborder.inner.bottom");
			node.style.position = "absolute";
			if (this.mouseClick)
				var cursor = "col-resize";
			else var cursor = "pointer";
			node.innerHTML = "<div style='position:absolute;left:0;top:0;width:100%;height:100%;background-image:url(icon/"+system.getThemes()+"/menuselect.png)'><span id='"+rowObj.getFullId()+"_no' align='center' style='position:absolute;color:"+system.getConfig("form.grid.fixedFontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(len,10)+1).toString()+"</span></div>";
			if (headerCanvas != undefined)	
				headerCanvas.appendChild(node);						
		//--------------------						
			rowObj.setTop(top);
			rowObj.setWidth(width);
			//rowObj.readOnly = this.readOnly;
			rowObj.setHeight(this.rowHeight);	
			var html = rowObj.addCell(this.columns.getLength(), values);
			rowObj.onDblClick.set(this, "doDblClick");
			rowObj.onClick.set(this, "doClick");
			rowObj.onSelectCell.set(this, "doSelectCell");
			rowObj.onEllipsClick.set(this, "doEllipsClick");
			
			rowObj.onChange.set(this, "doChange");
			this.rows.set(len, rowObj);
			this.onNilaiChange.call(this);
			if (this.disableCtrl) {
				this.clientHTML += html;
				this.clientHeight = top + this.rowHeight;
				this.rowsID.set(this.rowCount - 1,rowObj.getFullId());
				rowObj.free();
				this.rows.del(len);
			}			
			if (top + 20> this.getClientCanvas().clientHeight){
				var frame = this.frame;//$(n + "_frame");												
				frame.scrollTop = top;    
			}
			this.onAppendRow.call(this, len, values);
		}catch(e){
			systemAPI.alert("$addRowValues()" , e);
		}
	},
	addRowValues: function(values){
		try{					
			var col;
			var width = 0;
			this.rowData.set(this.rowCount, values);
			this.rowCount++;
			if (this.autoPaging && this.rows.getLength() == this.rowPerPage)
			     return false;
			for (var i = 0;i < this.columns.getLength();i++)
			{
				col = this.columns.get(i);
				width += col.getWidth();
			}
			this.inplaceEdit.value = "";		
			this.inplaceEdit.col = -1;
			this.inplaceEdit.row = -1;
			if (this.autoPaging){
				var len = this.rows.getLength();						
				var top = len * this.rowHeight;
			}else  {
				var len = this.rowCount - 1;//this.rows.getLength();						
				var top = (this.rowCount - 1) * this.rowHeight;
			}
		//---------------------			
			var rowObj = new portalui_rowGrid(this, len);	
			var n = rowObj.getFullId();
			var headerCanvas = this.cnvNo;//$(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+len);
			if ((node != undefined)&&(headerCanvas != undefined))
				headerCanvas.removeChild(node);
			node = document.createElement("div");
			node.id = this.getFullId()+"_no"+len;	
			
			node.style.background = this.fixColor;			
			node.style.height = document.all ? this.rowHeight + 2:this.rowHeight;
			node.style.top = top + this.headerHeight;
			node.style.width = this.widthColNo;
			node.style.borderTop =  window.system.getConfig("3dborder.inner.top");
			node.style.borderBottom =  window.system.getConfig("3dborder.inner.bottom");
			node.style.borderLeft =  window.system.getConfig("3dborder.inner.top");
			node.style.borderRight =  window.system.getConfig("3dborder.inner.bottom");
			node.style.position = "absolute";
			if (this.mouseClick)
				var cursor = "col-resize";
			else var cursor = "pointer";
			var rowNumber  = (len + 1).toString();
			if (this.autoPaging){
				rowNumber = ( this.page - 1) * this.rowPerPage + (len + 1);
			}
			node.innerHTML = "<div style='position:absolute;left:0;top:0;width:100%;height:100%;background-image:url(icon/"+system.getThemes()+"/menuselect.png)'><span id='"+rowObj.getFullId()+"_no' align='center' style='position:absolute;color:"+system.getConfig("form.grid.fixedFontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+rowNumber+"</span></div>";
			if (headerCanvas != undefined)	
				headerCanvas.appendChild(node);						
		//--------------------						
			rowObj.setTop(top);
			rowObj.setWidth(width);
			//rowObj.readOnly = this.readOnly;
			rowObj.setHeight(this.rowHeight);	
			var html = rowObj.addCell(this.columns.getLength(), values);
			rowObj.onDblClick.set(this, "doDblClick");
			rowObj.onClick.set(this, "doClick");
			rowObj.onSelectCell.set(this, "doSelectCell");
			rowObj.onEllipsClick.set(this, "doEllipsClick");
			//rowObj.onCellExit.set(this, "doCellExit");
			//rowObj.onCellEnter.set(this, "doCellEnter");
			rowObj.onChange.set(this, "doChange");
			this.rows.set(len, rowObj);
			this.onNilaiChange.call(this);
			if (this.disableCtrl) {
				this.clientHTML += html;
				this.clientHeight = top + this.rowHeight;
				this.rowsID.set(this.rowCount - 1,rowObj.getFullId());
				rowObj.free();
				this.rows.del(len);
			}			
			if (top + 20> this.getClientCanvas().clientHeight){
				var frame = this.frame;//$(n + "_frame");												
				frame.scrollTop = top;    
			}
			this.onAppendRow.call(this, len, values);
		}catch(e){
			systemAPI.alert("$addRowValues()" , e);
		}
	},
	delRow: function(row){
		try{
			var rowObj;		
			var cnv;
			var len = this.rows.getLength();
			rowObj= this.rows.get(row);	
			this.onDeleteRow.call(this, rowObj);
			this.rows.del(row);
			this.rowData.del(row),this.rowsID.del(row);			
			rowObj.free();
			rowObj = undefined;
			this.hideInplaceEdit();
			var headerNo = $(this.getFullId()+"_no");
			var node = $(this.getFullId()+"_no"+(len - 1));			
			if ((node != undefined) && (headerNo != undefined))
				headerNo.removeChild(node);						
			if (this.autoPaging){
				row = (this.page - 1) * this.rowPerPage + row;				
			}
			for (var i = row; i < this.rowData.getLength(); i++){
				var dt = this.rowData.get(i + 1);
				if (dt){
					this.rowData.set(i, dt);
					this.rowData.del( i + 1);
				}
			}
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
			this.rowCount--;
		}catch(e){
			systemAPI.alert(this+"$delRow()", e);
		}	
	},
	setValues: function(values){	
	},
	clear: function(defaultRow){
		try{
			this.onBeforeClear.call(this);
			this.startNumber = 0;
			this.frame.display = "none";
			if (this.getClientCanvas() == undefined) return;
			this.getClientCanvas().style.scrollTop = 0;
			this.getClientCanvas().style.scrollLeft = 0;
			var child;
			var headerNo = $(this.getFullId()+"_no");
			var node ;
			var j = 0;
			for (var i in this.childs.objList)
			{
				child = $$(this.childs.objList[i]);
				node = $(this.getFullId()+"_no"+j);
				if ((node != undefined)&&(headerNo != undefined))
					headerNo.removeChild(node);
				if (child instanceof portalui_rowGrid)
					child.free();
				j++;
			}	
			if (headerNo != undefined) 
				headerNo.style.top = 0;
			this.rows.clear();
			this.rows = new arrayMap();
			this.rowData = undefined;
			this.rowData = new arrayMap();
			this.rowCount = 0;
			if (defaultRow != undefined){
			    this.row = 0;
                this.col = 0; 
				for (var i=0;i < defaultRow;i++){
					this.appendRow();
				}
			}
			this.hideFrame();
		}catch(e){
			systemAPI.alert(this+"$clear()",e);
		}
	},
	clearScreen: function(){
		try{			
			this.startNumber = 0;
			this.frame.display = "none";
			this.getClientCanvas().style.scrollTop = 0;
			this.getClientCanvas().style.scrollLeft = 0;
			var child;
			var headerNo = $(this.getFullId()+"_no");
			var node ;
			var j = 0;
			for (var i in this.childs.objList)
			{
				child = $$(this.childs.objList[i]);
				node = $(this.getFullId()+"_no"+j);
				if ((node != undefined)&&(headerNo != undefined))
					headerNo.removeChild(node);
				if (child instanceof portalui_rowGrid)
					child.free();
				j++;
			}	
			if (headerNo != undefined) 
				headerNo.style.top = 0;
			this.rows.clear();						
			this.hideFrame();
			this.row = 0;
            this.col = 0; 
		}catch(e){
			systemAPI.alert(this+"$clearScreen()",e);
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
			systemAPI.alert(this+"$getRowTop:",e);
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
			systemAPI.alert(this+"$getRowLeft:",e);
		}
	},
	setCell: function(col, row, value){
		try{
			var colHeader = this.columns.get(col);				
			if (colHeader){			
				if (colHeader.buttonStyle == bsAuto && this.checkItem){					
					if (colHeader.pickList.getLength() != 0 ){
						var d,t = value;
						var f = false;
						for (var i in colHeader.pickList.objList){
							d = colHeader.pickList.objList[i];
							if ( d.toLowerCase() == t.toLowerCase()) {
								value = d;
								f = true;
								break;
							}
						}
						if (!f && value != "" ) {
							systemAPI.alert("Data "+value+" tidak ditemukan di list");
							return;
						}						
					}
				}
				if (this.autoPaging) {					
					var rowData = (this.page - 1) * this.rowPerPage + row;										
					if (this.rowData.get(rowData)) this.rowData.get(rowData)[col] = value;
				}else if (this.rowData.get(row)) this.rowData.get(row)[col] = value;
				
				if (this.disableCtrl){
					var f = document.frames ? document.frames[this.getFullId()+"_iframe"] : $(this.getFullId()+"_iframe");
					var p = f.contentWindow;						
					if (p.setCell)
						p.setCell(this.rowsID.get(row)+"_cellValue"+col,value);
				}				
				if (col == this.col && row == this.row) this.inplaceEdit.value = value;
				if (col >= this.columns.getLength()) return false;
				if (row >= this.rows.getLength()) return false;			
				var rowObj= this.rows.get(row);				
				if (rowObj != undefined)
					rowObj.setCellValue(col, value);			
				//if (!this.onSwap) this.onChange.call(this,col, row);		
			}			
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
		if (this.disableCtrl || this.autoPaging){						
			if (this.rowData.get(row)) return this.rowData.get(row)[col];		
		}else{
			var rowObj= this.rows.get(row);
			if (rowObj != undefined){
				var value = rowObj.getCellValue(col);
				return value;
			}else if (this.rowData.get(row)) return this.rowData.get(row)[col];		
		}
		return "";
	},
	cells: function(col, row, value){
		if (this.disableCtrl || this.autoPaging){
			if (value !== undefined)
				this.setCell(col, row, value);			
			else {				
				if (this.rowData.get(row)) return this.rowData.get(row)[col];		
			}
		}else{
			var rowObj= this.rows.get(row);		
			if (rowObj != undefined){
				if (value === undefined)
					value = rowObj.getCellValue(col);
				else rowObj.setCellValue(col, value);			
			}
		};		
		return value;
	},
	getCellDateValue: function(col, row){		
		var value = this.cells(col, row);
		var columns = this.columns.get(col);			
		if (value != ""){
			var tgl = value.split("/");
			if (this.app._dbEng == 'oci8'){
				value = "to_date('"+tgl[2] + "/" + tgl[1] + "/" + tgl[0]+":12:00:00AM','yyyy/mm/dd:hh:mi:ssam')";	
			}else{				
				value = tgl[2]+"-"+tgl[1]+"-"+tgl[0];
			}
		}	
		return value;
	},
	getThnBln: function(col, row){		
		var value = this.cells(col, row);
		var columns = this.columns.get(col);
		if (value != ""){
			var tgl = value.split("/");
			value = tgl[2]+(parseFloat(tgl[1]) < 10 ? "0":"") + parseFloat(tgl[1]);
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
				obj.refreshCells();
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
			systemAPI.alert(this+"$doCellExit()",e);
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
	    row = row * 19;
	    var scrollHeight = (frame.clientHeight) ? frame.clientHeight : frame.offsetHeight;	  	    
	    if (frame.scrollTop + scrollHeight - (frame.offsetHeight - scrollHeight) < row){
			frame.scrollTop += ( row + 20) - (frame.scrollTop + scrollHeight);
		}else if (row < frame.scrollTop)
			frame.scrollTop = row;
		
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
			var data1 = [];for (var i in this.rows.get(row1).values) data1[i] = this.rows.get(row1).values[i];
			var data2 = [];for (var i in this.rows.get(row2).values) data2[i] = this.rows.get(row2).values[i];
			for (var i=0;i < this.columns.getLength();i++)
				this.setCell(i,row1, data2[i]);
			for (var i=0;i < this.columns.getLength();i++)
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
		return this.rows.getLength() == 0;
	},
	appendRow: function(){
		try{
			var values = [];
			for (var i = 0; i < this.columns.getLength();i++)
				values[i] = "";	
			this.addRowValues(values);			
		}catch(e){
			alert(e);
		}
	},
	rowIsEmpty: function(row){
		var isEmpty = true;
		for (var i = 0;i < this.columns.getLength();i++){					
			isEmpty = isEmpty && ( this.cells(i,row) == "" || typeof this.cells(i,row) == "string");			
		}
		if (this.inplaceEdit.style.display == "" && this.inplaceEdit.value == "") isEmpty = isEmpty && true;
		return isEmpty;
	},
	appendData: function(data){
		if (this.allowBlank){
			this.addRowValues(data);			
		}else{
			if (this.getColCount() != data.length){
				system.alert(this.app._mainForm, "Jumlah data ("+data.length+") tidak sesuai dengan jumlah kolom ("+this.getColCount()+")","Coba periksa lagi.<br>" + data);
				return false;
			}
			var lastRow = this.getRowCount();
			if (lastRow == 0 || (lastRow > 0 && this.rowValid(lastRow - 1)) ){
				this.addRowValues(data);				
			}else if (lastRow > 0 && this.rowIsEmpty(lastRow - 1)){
				var cols = [];
				for (var c = 0; c < this.getColCount(); c++) cols[c] = c;				
				this.editData(lastRow - 1, data,cols);
			}
		}
		var i = this.rows.getLength() - 1;			
		var cnv = $(this.getFullId()+"_no"+i);					
		if (cnv != undefined)
			cnv.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fixedFontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(i,10)+1+this.startNumber).toString()+"</span>";
		return true;
	},	
	insertData: function(row, data){		
		var lastRow = this.getRowCount();
		if (lastRow == 0 ){
			this.addRowValues(data);						
		}else {
			this.appendRow();
			var tmp;
			for (var i = lastRow - 1; i >= row; i--){
				tmp = this.rowData.get(i);
				var cols = [];
				for (var c = 0; c < this.getColCount(); c++) cols[c] = c;
				this.editData(i+1, tmp, cols);
			}
			cols = [];
			for (var c = 0; c < this.getColCount(); c++) cols[c] = c;
			this.editData(row, data, cols);
		}
		var i = this.rows.getLength() - 1;			
		var cnv = $(this.getFullId()+"_no"+i);					
		if (cnv != undefined)
			cnv.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fixedFontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(i,10)+1+this.startNumber).toString()+"</span>";
	},
	editData: function(row,data, col){
		for (var i in data){
			if (col == undefined)			
				this.setCell(i,row,data[i]);
			else this.setCell(col[i],row,data[i]);
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
		if (typeof data == "string") data = data.split(",");	
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
	setColAlign: function(col, data){
		for (var i in col)
			this.columns.get(col[i]).setColumnAlign(data[i]);	
	},
	setNoUrut: function(start){
		if (start == undefined) start = 0;
		var cnv;
		this.startNumber = start;
		for (var i in this.rows.objList)
		{
			cnv = $(this.getFullId()+"_no"+i);
			if (cnv != undefined)
				cnv.innerHTML = "<span align='center' style='position:absolute;color:"+system.getConfig("form.grid.fixedFontColor")+"; left : 2; top : 0; width:"+this.widthColNo+"; height:20px;'>"+(parseInt(i,10)+1+start).toString()+"</span>";
		}
	},
	setData: function(data, paging, rowPerPage){
		try{
			this.clear();
			this.inplaceEdit.value = "";
			this.data = data;
			if (paging === undefined) {
				if (this.data instanceof portalui_arrayMap) {
					var line, idx, first = true;
					var fieldDesc = this.data.getTag2();
					var title = [];
					this.showLoading();
					for (var i in this.data.objList) {
						line = this.data.get(i);
						if (first) {
							idx = 0;
							this.setColCount(fieldDesc.get(1).getLength());
							for (var d in fieldDesc.get(1).objList) {
								if (fieldDesc.get(1).get(d) == "N" || fieldDesc.get(1).get(d) == "real" || fieldDesc.get(1).get(d) == "Number" || fieldDesc.get(1).get(c) == "I" || fieldDesc.get(1).get(c) == "decimal" ) 
									this.columns.get(idx).setColumnFormat(cfNilai);
								else 
									this.columns.get(idx).setColumnFormat(cfText);
								this.columns.get(idx).setColWidth(fieldDesc.get(0).get(d) < 80 ? 80 : fieldDesc.get(0).get(d));
								title[title.length] = d;
								idx++;
							}
							first = false;
						}
						data = [];
						for (var c in line.objList) {
							if (fieldDesc.get(1).get(c) == "N" || fieldDesc.get(1).get(c) == "real" || fieldDesc.get(1).get(c) == "Number" || fieldDesc.get(1).get(c) == "I" || fieldDesc.get(1).get(c) == "decimal" ) 
								data[data.length] = floatToNilai(parseFloat(line.get(c)));
							else 
								if (fieldDesc.get(1).get(c) == "T") 
									data[data.length] = (new Date).idFormat(line.get(c));
								else 
									if (line.get(c) == "") 
										data[data.length] = "-";
									else 
										data[data.length] = line.get(c);
						}
						this.appendData(data);
					}
					this.hideLoading();
				} else if (data) {
						var obj = data;
						var line = '';
						var first = true;
						var title = [];
						this.showLoading();
						if (obj.rs == undefined) 
							return false;
						var fields = obj.rs.fields;
						var field;
						for (var i in obj.rs.rows) {
							line = obj.rs.rows[i];
							data = [];
							for (var c in line) {
								if (first) 
									title.push(c);
								field = fields[c];
								if (field.type == "N" || field.type == "real" || field.type == "i" || field.type == "I" || field.type == "decimal" || field.type == "Number") 
									data.push(floatToNilai(parseFloat(line[c])));
								else 
									data.push(line[c]);
							}
							if (first) {
								this.setColCount(data.length);
								var ix = 0;
								for (var c in fields) {
									field = fields[c];									
									this.columns.get(ix).setColWidth(field.length < 80 ? 80 : field.length);
									if (field.type == "N" || field.type == "real" || field.type == "i" || field.type == "I" || field.type == "decimal" || field.type == "Number") 
										this.columns.get(ix).setColumnFormat(cfNilai);
									ix++;
								}
								first = false;
							}
							this.appendData(data);
						}
						this.hideLoading();
					}				
			}else{
				if (this.data instanceof portalui_arrayMap) {
					var line, idx, first = true;
					var fieldDesc = this.data.getTag2();
					var rowCount = this.data.getLength();
					var title = [];					
					idx = 0;					
					this.setColCount(fieldDesc.get(1).getLength());
					for (var d in fieldDesc.get(1).objList) {
						if (fieldDesc.get(1).get(d) == "N" || fieldDesc.get(1).get(d) == "real" || fieldDesc.get(1).get(d) == "I" || fieldDesc.get(1).get(d) == "decimal" || fieldDesc.get(1).get(d) == "Number") 
							this.columns.get(idx).setColumnFormat(cfNilai);
						else 
							this.columns.get(idx).setColumnFormat(cfText);
						this.columns.get(idx).setColWidth(fieldDesc.get(0).get(d) < 80 ? 80 : fieldDesc.get(0).get(d));
						title[title.length] = d;
						idx++;
					}																						
				} else if (data) {						
						if (data.rs == undefined || data.rs.rows[0] === undefined){ 				
							if (data.rows == undefined) return false;
						};						
						var fields = data.fieldDesc || data.rs.fields;
						var rowCount = (data.rows ? data.rows.length: data.rs.rows.length);
						var field,cx = 0;				
						for (var c in fields) cx++; 		
						this.setColCount(cx);
						var ix = 0;
						for (var c in fields) {
							field = fields[c];							
							if (this.columns.get(ix)) {
								this.columns.get(ix).setColWidth(field.length < 80 ? 80 : field.length);
								if (field.type == "N" || field.type == "real" || field.type == "I" || field.type == "decimal" || field.type == "Number") 
									this.columns.get(ix).setColumnFormat(cfNilai);
							}
							ix++;
							
						}										
					}								
				this.rowPerPage = rowPerPage;
				this.recordCount = rowCount;
				this.pageCount = Math.ceil(rowCount / rowPerPage);				
				this.selectPage(1);
			}			
			if (this.title.length == 0) {
				for (var i in this.columns.objList) {
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
		window.portalui_saiGrid.prototype.parent.setTop.call(this,data);
		if (this.layout != undefined)this.layout.setTop(data+this.headerHeight);
	},
	setLeft: function(data){
		window.portalui_saiGrid.prototype.parent.setLeft.call(this,data);
		if (this.layout != undefined)this.layout.setLeft(data+20);
	},
	doTopLeftOver: function(event){
		system.showHint(event.clientX, event.clientY,this.pasteEnable ? "Paste Editor":"Setting Layout",true);
	},
	doTopLeftOut: function(event){
		system.hideHint();
	},
	doTopLeftClick: function(){
		try{
			this.exitInplace();
			if (this.pasteEnable){
				system.showPasteEditor(this);
			}else {
				if (this.layout === undefined){
					this.createLayoutForm();
					this.refreshLayout();
				}
				if (this.layout.visible)
					this.layout.hide();
				else
					this.layout.show();			
			}
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
			if (this.disableCtrl){
				var iframe = $(this.getFullId()+"_iframe");
				iframe.style.display = "none";
				iframe.style.left = 0;
				iframe.style.top = 0;
				iframe.style.overflow = "auto";
				iframe.style.height = "100%";
				iframe.style.width = "100%";
				this.frame.display = "";
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
		for (var i=0;i < this.columns.getLength();i++){
			width += this.columns.get(i).width;
			if (!this.columns.get(i).hideColumn)
				th += "<th class='header_laporan' height='25' width='"+this.columns.get(i).width+"'>"+ this.columns.get(i).title +"</th>";
		}
		th += "</tr>";	
		var tr,html = "<br><br><table width='"+width+"' border='1' cellspacing='0' cellpadding='0' class='kotak'>";
		html += th;	
		for (var i=0;i < this.rowCount;i++){
			tr = "<tr>";
			for (var c=0;c < this.columns.getLength();c++){
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
			if (!this.disableCtrl){
				winfram.document.open();
				winfram.document.write(loadCSS("server_util_laporan"));
				if (outerHtml){
					 winfram.document.write(outerHtml);
				}else{
					winfram.document.write(addHeader);
					winfram.document.write(this.gridToHTML());
				}
				winfram.document.close();			
			}
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
	ellipsClick: function(event, col, row){
		this.onEllipsClick.call(this, col, row );//this.col,this.row
	},
	dropDownClick: function(event, col, row){
		try{	
			if ((window.dropDown == undefined) || (!window.dropDown.visible)){
				var x = event.clientX;
				var y = event.clientY;
				var colHeader = this.columns.get(col);//this.col
				if (this.inplaceEdit.style.display == "")
					var canvas = this.inplaceEdit;
				else {
					var rowObj = this.rows.get(row);//this.row
					var canvas = $(rowObj.getFullId()+"_cellValue"+col);//this.
				}
				var width = canvas.offsetWidth;			
				var form = this.getForm();				
				if (document.all || window.opera){
			        x = (x - event.offsetX) - width + 17;
			        y = (y - event.offsetY) + this.headerHeight - 2;
			    }
			    else{
			        x = (x - event.layerX) - width + 19;
			        y = (y - event.layerY) + this.headerHeight - 1;
			    }
				if (window.dropDown != undefined)
					window.dropDown.free();
				
				var app = this.getApplication();
				uses("portalui_dropDownBox");				
				window.dropDown = new portalui_dropDownBox(app);//dropDownBox(window.system._mainForm.activeChildForm);
				
				this.pickList = this.columns.get(col).pickList;//this.
				window.dropDown.col = col;
				window.dropDown.row = row;
				window.dropDown.onSelect.set(this, "dropDownBoxSelect");
				window.dropDown.setItems(this.pickList);
				window.dropDown.setWidth(width);	
				window.dropDown.setCtrl(this);
				window.dropDown.setSelectedId(this.selectedId);
				window.dropDown.setLeft(x + 1);
				var scrHeight = form.getHeight();															
				if ((y + window.dropDown.getHeight()) > scrHeight){				
					y-=this.headerHeight;
					if (document.all)
						window.dropDown.setTop(y - window.dropDown.getHeight() + 1);
					else
						window.dropDown.setTop(y - window.dropDown.getHeight() - 1 );			
				}
				else
					window.dropDown.setTop(y);			
				window.dropDown.bringToFront();
				window.dropDown.setVisible(true);
				var rowObj = this.rows.get(row);	
				if (rowObj != undefined){		
					rowObj.showInplaceEdit(col);
				}
			}
				else window.dropDown.setVisible(false);
		}
		catch (e){
			systemAPI.alert(this+"$dropDownClick()", e);
		}
	},
	dropDownBoxSelect: function(sender, selectedId, caption){
		try{
			window.dropDown.close();
			this.setCell(window.dropDown.col, window.dropDown.row, caption);	
			this.selectedId = selectedId;			
			
		}catch(e){
			systemAPI.alert(this+"$dropDownSelect()", e);
		}
	},
	dateClick: function(event, col, row){
		try{
			var x = event.clientX;
			var y = event.clientY;
			var column = this.columns.get(col);//this.
			var canvas = $(column.getFullId());
			var width = canvas.offsetWidth;

			if (document.all){
				x = (x - event.offsetX) - width + 17;
				y = (y - event.offsetY) + this.headerHeight - 2;
			}else{
				x = (x - event.layerX) - width + 19;
				y = (y - event.layerY) + this.headerHeight - 1;
			}
			
			var app = this.getApplication();
			if (app.systemDatePickerForm == undefined){
				uses("portalui_datePickerForm");
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
		}catch(e){
			alert(e);
		}
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
			//this.onChange.call(this, this.col, this.row); 
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
	doMouseOut: function(idx, row){
		return;
		//if (!this.Focused)
		{
			//var target = document.all?event.srcElement : event.target;
			//var idx = target.col;
			if (this.row != row || this.col != idx ){
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
		}
	},
	doMouseOver: function(idx){
		return;
		//var target = document.all?event.srcElement : event.target;
		//var idx = target.col;
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
		for (var r = 0 ;r < this.rows.getLength();r++){
			for (var i = 0;i < this.columns.getLength();i++)
				valid = valid && (this.cells(i,r) != "" || typeof this.cells(i,r) == "number");
			if (!valid) break;
		}
		return valid;		
	},
	isEmpty: function(){
		var valid = true;
		for (var r = 0 ;r < this.rows.getLength();r++){
			for (var i = 0;i < this.columns.getLength();i++)
				valid = valid && trim(this.cells(i,r)) == "";
			if (!valid) break;
		}
		return valid;		
	},
	getRowValidCount: function(){
		var valid = true, c = 0;
		for (var r = 0 ;r < this.rows.getLength();r++){
			for (var i = 0;i < this.columns.getLength();i++)
				valid = valid && ( this.cells(i,r) != "" || typeof this.cells(i,r) == "number");
			if (valid) c++;			
		}
		return c;		
	},
	rowValid: function(row){
		var valid = true;
		for (var i = 0;i < this.columns.getLength();i++){					
			valid = valid && ( this.cells(i,row) != "" || typeof this.cells(i,row) == "number");			
		}
		if (this.inplaceEdit.style.display == "" && this.inplaceEdit.value != "") valid = valid && true;
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
	setPickList: function(col, items){		
		for (var i in col)
			this.columns.get(col[i]).setPicklist(items[i]);	
		
	},
	setAllowBlank: function(data){
		this.allowBlank = data;
	},
	setRowNumber: function(start){
		try{			
			var row, rowObj;
			for (var i=0;i < this.getRowCount();i++){
				rowObj = this.rows.get(i);				
				row = $(rowObj.getFullId()+"_no");
				if (row) row.innerHTML = (i  + start) + 1;				
			}
		}catch(e){
			systemAPI.alert(this+"$rowNumber()",e);
		}
	},
	setUploadParam: function(col, param1, param2, param3, param4){
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
		for (var i in col){
			var colObj = this.columns.get(col[i]);							
			if (colObj !== undefined && data){			
				if (data)
                    colObj.hide();
                else colObj.show();    
			}
		}
	},
	setCellColor: function(col, row, color){
	   var rowObj = this.rows.get(row);	
	   rowObj.setCellColor(col, color);
    },
    setRowHeight: function(rowHeight, row){
        this.rowHeight = rowHeight;
        if (row){
           var rowObj = this.rows.get(row);	
    	   rowObj.setHeight(rowHeight); 
    	   row = $(this.getFullId()+"_no"+row);
    	   row.style.height = rowHeight;
    	   var top = rowObj.top;
    	   for (var i=row+1;i < this.getRowCount();i++){
				rowObj = this.rows.get(i);			
				rowObj.setTop(top);
				row = $(this.getFullId()+"_no"+i);
				row.style.top = top + this.headerHeight;
				top += parseInt(row.offsetHeight);
	       }
	   }else {
	       var rowObj,top = 0; 
	       for (var i=0;i < this.getRowCount();i++){
				rowObj = this.rows.get(i);				
				rowObj.setHeight(rowHeight);
				rowObj.setTop(top);
				row = $(this.getFullId()+"_no"+i);
         	    row.style.height = rowHeight;
         	    row.style.top = top + this.headerHeight;
				top += parseInt(rowHeight);
	       }
       }
    },
    setAutoPaging: function(data){
        this.autoPaging = data;
        this.page = 1;        
    },
	setDisableCtrl: function(){		
		this.disableCtrl = true;
		this.setReadOnly(true);
	},
    doDisableCtrl : function(){
		if (this.disableCtrl){
			try{
				var iframe = $(this.getFullId()+"_iframe");				
				var winfram= window.frames[this.getFullId() +"_iframe"];
				winfram.document.open();
				winfram.document.write("");
				winfram.document.close();
				winfram.document.open();					
				var html = "<script language='javascript'>";
				html += "function doScroll(event){";
				html += "	var target = document.all ?event.srcElement:event.target;";
				html += "	window.parent.system.getResource("+this.resourceId+").doScrollFrame(document.body);";
				html += "}";
				html += "function eventMouseOver(event,row, col){"+
					"var target = document.all ? event.srcElement : event.target; "+
					"var color = '"+system.getConfig("text.overBgColor")+"';"+				
					"target.style.background = color;}";
				html += "function eventMouseOut(event,row, col){"+
					"		var target = document.all ? event.srcElement : event.target;	"+					
					"		var color = '"+system.getConfig("app.color.gridDisabledText")+"';"+
					"		if (row % 2 == 0)"+
					"			color = '"+system.getConfig("app.color.gridRowDiff")+"';"+										
					"	target.style.background = color;}";
				html += "function eventDoubleClick(event,row, col){"+
					"	try{var owner= window.parent.system.getResource("+this.resourceId+");"+
					"	owner.doDblClick(this, col, row);"+
					"	var top = document.all ? event.srcElement.parentNode.offsetTop : event.target.parentNode.offsetTop;"+										
					"	top = top - document.body.scrollTop;"+
					"	var colHeader = owner.columns.get(col);"+					
					"	if (colHeader != undefined && !colHeader.readOnly && !colHeader.hideColumn && !owner.readOnly){"+
					"		try{			"+
					"			owner.showInplaceEdit(col,row,top);"+
					"		}catch(e){"+
					"			window.parent.systemAPI.alert(owner,e);"+
					"		}"+
					"	}"+
					"	}catch(e){alert(e);}"+
					"}";				
				html += "function eventClick(event,row, col){"+
						"var owner= window.parent.system.getResource("+this.resourceId+");"+
						"owner.getForm().setActiveControl(owner);"+
						"owner.doClick(owner, col, row);"+
						"owner.doSelectCell(owner, col, row);"+
						"owner.setRowIndex(row, col);}";		
				html += "function setCell(id,data){"+
						"	var target = document.getElementById(id);"+
						"	if (target) target.innerHTML = data;"+
						"}";
				html += "document.oncontextmenu = function(){return false;}";				
				html += "</script>";
				html += "<body style=\"background:"+system.getConfig("form.grid.color")+"; font-family:Arial; font-size:11px;\" leftmargin=\"0px\" rightmargin=\"0px\" topmargin=\"0px\" bottommargin=\"0px\" onscroll='doScroll(event);'>";
				html += this.clientHTML;
				html += "</body>";				
				winfram.document.write(loadCSS("server_util_laporan"));					
				winfram.document.write(html);						
				winfram.document.close();
				winfram.focus();											
				iframe.style.display = "";
				iframe.style.left = this.widthColNo;				
				iframe.style.top = 20;
				iframe.style.overflow = "auto";
				iframe.style.height = this.frame.style.height;
				iframe.style.width = this.frame.style.width;
				this.frame.display = "none";
			}catch(e){
				alert(e);
			}
		}
	},
	showInplaceEdit: function(idx, row, top){
		try{
			var colHeader = this.columns.get(idx);	
			if (colHeader.hideColumn) return false;
			if (colHeader.columnFormat == cfButton || colHeader.columnFormat == cfUpload) return false;		
			if (colHeader.columnFormat == cfBoolean) {
				this.cells(idx, row, (this.rowData.get(row)[idx].toLowerCase() == "false" || this.rowData.get(row)[idx] == ""? "true" : "false"));
				return false;
			}						
			this.inplaceEdit.style.top = top;
			this.inplaceEdit.style.width = colHeader.width + 1;
			this.inplaceEdit.style.left = colHeader.left;			
			this.inplaceEdit.col = idx;
			this.inplaceEdit.row = row;
			this.inplaceEdit.zIndex = 99999999;					
						
			if (colHeader.maxLength > 1 ) this.inplaceEdit.maxLength = colHeader.maxLength;
			else this.inplaceEdit.maxLength = 1000;
			
			if (colHeader.columnFormat == cfHurufBesar || colHeader.columnFormat == cfUpperCase  ) this.owner.inplaceEdit.format = "*A";
			else if (colHeader.columnFormat == cfHurufKecil || colHeader.columnFormat == cfLowerCase ) this.owner.inplaceEdit.format = "*a";
			else this.owner.inplaceEdit.format = "*M";
			var plus = row == this.rowCount - 1 ? 2:1;			
			this.inplaceEdit.style.height = document.all ? parseInt(this.rowHeight) : parseInt(this.rowHeight)+plus;					
			this.inplaceEdit.style.display = "";											
			this.inplaceEdit.value = "";
			if (colHeader.columnFormat == cfNilai){
				this.inplaceEdit.style.textAlign = 'right';
				this.inplaceEdit.value = RemoveTitik(this.cells(idx,row));
			}else{
				this.inplaceEdit.style.textAlign = 'left';
				this.inplaceEdit.value = this.cells(idx,row);
			}
			setCaret(this.inplaceEdit, 0,this.inplaceEdit.value.length);
			if (this.inplaceEdit.style.display == "" || this.inplaceEdit.style.visibility == "visible") this.inplaceEdit.focus();		
			this.doSetFocus();
		}catch(e){
			alert(e);
		}
	},
	setColHint: function(col, hint){		
		for (var i in col){
			this.columns.get(col[i]).setHint(hint[i]);
		}
	},
	setColColor: function(col, color){		
		for (var i in col){
			this.columns.get(col[i]).setColor(color[i]);
		}
	},
	setColMaxLength: function(col, data){	
		try{	
			/*for (var i in col){				
				this.columns.get(col[i]).setMaxLength(data[i]);
			}*/					
		}catch(e){
			alert(e);
		}
	},
	setHeaderColor: function(col, color){		
		for (var i in col){
			this.columns.get(col[i]).setHeaderColor(color[i]);
		}
	},
	selectPage: function(page){
		try {			
			if (this.rowPerPage === undefined) throw("");
			this.showLoading();			
			this.clear();			
			var start = (page - 1) * this.rowPerPage;
			var finish = start + this.rowPerPage;
			if (finish > this.recordCount) 
				finish = this.recordCount;
			if (this.data instanceof portalui_arrayMap) {
				var line;
				var fieldDesc = this.data.getTag2();
				for (var i = start; i < finish; i++) {
					line = this.data.get(i);
					data = [];
					for (var c in line.objList) {
						if (fieldDesc.get(1).get(c) == "N" || fieldDesc.get(1).get(c) == "real") 
							data[data.length] = floatToNilai(parseFloat(line.get(c)));
						else 
							if (fieldDesc.get(1).get(c) == "T") 
								data[data.length] = (new Date).idFormat(line.get(c));
							else 
								if (line.get(c) == "") 
									data[data.length] = "-";
								else 
									data[data.length] = line.get(c);
					}
					this.appendData(data);
				}
			}
			else 
				if (this.data) {
					var line, field;
					var fields = this.data.fieldDesc || this.data.rs.fields;
					this.showLoading();					
					for (var i in this.columns.objList) colWidth[colWidth.length] = 0;					
					for (var i = start; i < finish; i++) {
						line = this.data.rows[i] || this.data.rs.rows[i];
						data = [];
						for (var c in line) {
							field = fields[c];
							if (field.type == "N" || field.type == "real") 
								data.push(floatToNilai(parseFloat(line[c])));
							else 
								data.push(line[c]);													
						}
						this.appendData(data);
					}										
				}
			this.hideLoading();
			this.frame.scrollTop = 0;
			this.setNoUrut(start);
		}catch(e){
			systemAPI.alert(e);
		} 
	},
	setCheckItem: function(data){
		this.checkItem = data;
	},
	setRowPerPage: function(data){
		this.rowPerPage = data;
	},
	getTotalPage: function(data){
		return Math.ceil(this.rowData.getLength() / this.rowPerPage);
	},
	doSelectPage: function(page){
		this.clearScreen();
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage > this.rowData.getLength() ? this.rowData.getLength() : start + this.rowPerPage;		
		for (var i = start; i < finish; i++){			
			this.viewRowData(this.rowData.get(i));
		};		
		this.setNoUrut(start);
		this.page = page;
	},
	nextPage: function(){
		var totPage =  this.getTotalPage();
		if (this.page < totPage) this.doSelectPage(this.page + 1);		
	},
	prevPage: function(){		
		if (this.page > 1) this.doSelectPage(this.page - 1);
	},
	setPasteEnable: function(data){
		this.pasteEnable = data;
	}
});
