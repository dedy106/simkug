//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_saiTable = function(owner,options){
	if (owner){
		window.portalui_saiTable.prototype.parent.constructor.call(this, owner,options);	
		this.className = "portalui_saiTable";	
		this.owner = owner;
		this.tableWidth = 500;
		this.colWidth = 125;	 
		this.row = 0;
		this.col = 0;
		this.tabStop = true;
		this.onValidasi = new portalui_eventHandler();
		this.onSelectCell = new portalui_eventHandler();
		this.onDblClick = new portalui_eventHandler();
		this.html = "";
		//-------------------------------
		this.divContent = undefined;
		this.divHeaderRow = undefined;
		this.divHeaderColumn = undefined;
		this.divHeaderRowColumn = undefined;
		this.headerRowFirstColumn = undefined;
		this.x = 0;
		this.y = 0;
		this.horizontal = false;
		this.vertical = false;
		this.table = 0;
		this.fixedColumn = 1;
		this.data = undefined;
		this.title = [];		
		this.createLayoutForm();
		if (options !== undefined) this.updateByOptions(options);
	}
};
window.portalui_saiTable.extend(window.portalui_control);
window.saiTable = window.portalui_saiTable;
window.portalui_saiTable.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.background = system.getConfig('app.color.grid');
		canvas.style.border = "1px solid #939bb0";
		canvas.style.overflow = "hidden";	
		var w = this.width;
		var h = this.height;
		var html =  "<div id='"+ n +"_frame' >"+					
						"<div id='"+ n +"_cont' >"+
						"</div>"+					
					"</div>"+
					"<div id='"+n+"_topLeft' style='{position:absolute;background-color:#084972;"+
						"left: 0;top: 0; width:40; height:20px; "+
						"border-top: "+window.system.getConfig("3dborder.inner.top")+";"+
						"border-bottom: "+window.system.getConfig("3dborder.inner.bottom")+";"+
						"border-left: "+window.system.getConfig("3dborder.inner.top")+";"+
						"border-right: "+window.system.getConfig("3dborder.inner.bottom")+";"+
						"}' "+
						" onclick ='system.getResource("+this.resourceId+").doTopLeftClick(); ' "+
						"><div style='{background:url(icon/"+system.getThemes()+"/tabCont.png) top left no-repeat;width:20;height:20;left:10;top:0}'></div>"+
					"</div>"+
					"<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;}'></iframe>" +
					"<div id='"+n+"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left: "+(w / 2 - 25).toString()+";top: "+(h / 2 + 25).toString()+";width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>"+
					"<div id='"+n+"_topRight' style='{position:absolute;width:17;height:17;left:0;top:0;display:none;background:#ff9900;border:1px solid #939bb0}'></div>";			
		this.setInnerHTML(html, canvas);
		this.topLeft = $(n+"_topLeft");
		this.topRight = $(n+"_topRight");
		this.frame = $(n+"_frame");	
		this.iframe = $(n+"_iframe");	
		this.block = $(n+"_block");	
		this.cont = $(n+"_cont");	
	},
	doScroll: function(event){
		try{
		    var step = "init";
			var n = this.getFullId();	
		    var frame = $(n + "_frame");
		    var header = $(n + "_colFrame");
			header.scrollLeft = frame.scrollLeft;		
		}
		catch (e)
		{
		    alert("[saiTable]::doScroll : " + e+"\r\n"+this.row+"-"+step);
		}	
	},
	setHTML: function(html){
		try{									
			this.frame.display = "";
			this.html = html;		
			this.cont.innerHTML = html;							
			this.CreateScrollHeader(this.cont,true, true);
		}catch(e){
			alert("saiTable::setHTML:" + e)
		}
	},
	setWidth: function(data){
		window.portalui_saiTable.prototype.parent.setWidth.call(this, data);	
		var cnv = $(this.getFullId()+"_frame");
		cnv.style.width = data;
		if (this.topRight !== undefined) this.topRight.style.left = data - 17;		
		if (this.layout !== undefined)  this.layout.setLeft((data / 2) - 150 + this.left);
	},
	setHeight: function(data){
		window.portalui_saiTable.prototype.parent.setHeight.call(this, data);	
		var cnv = $(this.getFullId()+"_frame");
		cnv.style.height = data;
		if (this.layout !== undefined) this.layout.setTop((data / 2) - 100 + this.top);
	},
	setColWidth: function(colId, data){
		var n = this.getFullId() +"_table";	
		var col = $(n+"_1_"+colId);
		var diff = 0;
		if (col	!= undefined)	
			diff = data - parseInt(col.width,10);		
		var n = this.getFullId() +"_table";	
		var tbl = $(n);
		tbl.width = parseInt(col.width,10) + diff;
		if (col	!= undefined) col.width = data;
	},
	eventDoubleClick: function(event, rowidx, idx){			
		this.onDblClick.call(this, idx, rowidx);
	},
	eventClick: function(event, rowidx, idx){				
		if (this.cell != undefined)
			this.cell.style.backgroundColor = this.lastColor;		
		this.row = rowidx;
		this.col = idx;
		var input = $(this.getFullId()+"_table_"+rowidx+"_"+idx);	
		if (input != undefined){
			this.lastColor = input.style.backgroundColor;
			input.style.backgroundColor = system.getConfig("text.overBgColor");
			this.cell = input;
		}	
	},
	eventMouseOver: function(event, idx, colId){	
		var input = $(this.getFullId()+"_table_"+idx);	
		if (input != undefined)
			input.style.backgroundColor = system.getConfig("app.color.gridRowHover");	
	},
	eventMouseOut: function(event, idx, colId){	
		if (idx % 2 == 0)
			var color = system.getConfig("app.color.gridDisabledText");
		else 	
			var color = system.getConfig("app.color.gridRowDiff");
		input = $(this.getFullId()+"_table_"+idx);
		if (input != undefined){
			input.style.backgroundColor = color;			
		}
	},
	eventMouseDown: function(event,c, r){
		this.row = r;
		this.col = c;	
		this.onSelectCell.call(this, c, r);
	},
	doDblClick: function(event,c, r){
		this.onDblClick.call(this, c, r);
	},
	setColTitle: function(data){    
		this.title = data;
	},
	getColCount: function(){
		var n = this.getFullId()+"_table";
		var rowObj = $(n).rows;			
		return rowObj.cells.length - 1;
	},
	getRowCount: function(){
		var n = this.getFullId()+"_table";
		obj = $(n);
		if (obj != undefined){
			var rowObj = obj.rows;		
			return rowObj.length - 1;
		} else return 0;
	},
	getCell: function(col, row){
	   try{
			var n = this.getFullId()+"_table";
			var tblBodyObj = $(n+"_"+row+"_"+col);			
			return tblBodyObj.innerHTML;		
		}catch(e)
		{
			return e
		}
	},
	setCell: function(col, row, value){
	   try{
		    var n = this.getFullId()+"_table";
			var tblBodyObj = $(n +"_"+row+"_"+col);				
			//tblBodyObj.rows[row].cells[col].innerHTML= value;		
			tblBodyObj.innerHTML = value;
		}catch(e)
		{
			return e
		}
	},
	doKeyPress: function(keyCode, buttonState){	
	},
	doKeyDown: function(charCode, buttonState){
		alert(charCode);
	},
	setColor: function(data){
		this.color = data;
		var cnv = this.getCanvas();
		cnv.style.background = data;
	},
	getColor: function(){
		return this.color;
	},
	clear: function(){
		try{		
		    var n = this.getRowCount();		
			for (var i=1;i <= n ;i++)
			{
				this.delRow(1);			
			}
						
		}catch(e){
			alert("saiTable:clear:"+e);
		}	
	},
	clearAll: function(){
		try{		
		    this.doDraw(this.getCanvas());								
		}catch(e){
			alert("saiTable:clear:"+e);
		}	
	},
	CreateScrollHeader: function (content, scrollHorizontal, scrollVertical){
		try{
			this.horizontal = scrollHorizontal;
			this.vertical = scrollVertical;
			
			if (content != null){	
				if (content.childNodes[0].innerHTML == "") return false;
				this.divContent = content;
				this.divContent.style.width = this.width;
				this.divContent.style.height = this.height;		
				if (document.all){
					var headerRow = this.divContent.childNodes[0].childNodes[0].childNodes[0];
					this.x = this.divContent.childNodes[0].offsetWidth;
					this.y = this.divContent.childNodes[0].offsetHeight;			
					this.table = this.divContent.childNodes[0];
				}else {			
					var headerRow = this.divContent.childNodes[0].childNodes[0].childNodes[0];
					this.x = parseInt(this.divContent.childNodes[0].offsetWidth,10);
					this.y = parseInt(this.divContent.childNodes[0].offsetHeight,10);		
					this.table = this.divContent.childNodes[0];			
				}
				if (this.title.length != 0)
					for (var i in headerRow.childNodes)
						headerRow.childNodes[i].innerHTML = this.title[i];
				this.divHeaderRow = this.divContent.cloneNode(true);				
				this.divHeaderRow.id = this.getFullId() +"_tableHeader";
				if (this.horizontal)
				{
					this.divHeaderRow.style.height = parseInt(headerRow.offsetHeight,10)+"px";
					this.divHeaderRow.style.overflow = "hidden";			
					this.divContent.parentNode.insertBefore(this.divHeaderRow, this.divContent);
					this.table.style.position = "absolute";
					this.table.style.top = "-" + parseInt(headerRow.offsetHeight,10) +"px";						
					//this.y = this.y - parseInt(headerRow.offsetHeight,10);
					
				}			
				
				this.divHeaderRowColumn = this.divHeaderRow.cloneNode(true);			
				this.divHeaderRowColumn.id = this.getFullId()+"_tableRowColumn";
				var fixedColWidth = 0;
				for (var i =0;i < this.fixedColumn;i++)
					if (i < headerRow.childNodes.length)
						fixedColWidth += parseInt(headerRow.childNodes[i].offsetWidth,10);
						
				this.headerRowFirstColumn = headerRow.childNodes[0];						
				
				this.divHeaderColumn = this.divContent.cloneNode(true);
				this.divHeaderColumn.id = this.getFullId()+"_tableColumn";
				this.divContent.style.position = "relative";
				
				if (this.vertical){
					this.divContent.parentNode.insertBefore(this.divHeaderColumn, this.divContent);
					this.divContent.style.left = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10) +"px";			
					this.table.style.position = "absolute";
					this.table.style.left = "-" + fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10)+"px";			
				}else{
					this.divContent.style.left = 0;
				}								
				if (this.vertical){
					this.divHeaderColumn.style.width = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10) +"px";
					this.divHeaderColumn.style.overflow = "hidden";
					this.divHeaderColumn.style.zIndex = "99";
					
					this.divHeaderColumn.style.position = "absolute";
					this.divHeaderColumn.style.left = "0";
					this.addScrollSynchronization(this.divHeaderColumn, this.divContent, "vertical");
					//this.x = this.x - parseInt(this.headerRowFirstColumn.offsetWidth,10);			
				}

				if (this.horizontal){
					if (this.vertical)
						this.divContent.parentNode.insertBefore(this.divHeaderRowColumn, this.divContent);					
					this.divHeaderRowColumn.style.position = "absolute";
					this.divHeaderRowColumn.style.left = "0";
					this.divHeaderRowColumn.style.top = "0";
					this.divHeaderRowColumn.style.width = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10)+"px";
					this.divHeaderRowColumn.overflow = "hidden";
					this.divHeaderRowColumn.style.zIndex = "99";
					this.divHeaderRowColumn.style.backgroundColor = "#ffffff";						
					this.topLeft.style.width = parseInt(this.headerRowFirstColumn.offsetWidth,10)+"px";
					this.topLeft.style.height = parseInt(this.headerRowFirstColumn.offsetHeight,10)+"px";
					this.topRight.style.height = parseInt(this.headerRowFirstColumn.offsetHeight,10)+"px";
				}
				
				if (this.horizontal)
					this.addScrollSynchronization(this.divHeaderRow, this.divContent, "horizontal");								
				if (this.horizontal || this.vertical)	
					this.ResizeScrollArea();				
				this.table.id = this.getFullId() +"_table";		
				var row;
				for (var i=0; i < this.table.childNodes.length;i++){							
					if (this.table.childNodes[i] != undefined){				
						this.table.childNodes[i].childNodes[0].id = this.getFullId() +"_table_"+i;
						row = this.table.childNodes[i].childNodes[0];
						for ( var c = 0;c< row.childNodes.length;c++)
						  this.table.childNodes[i].childNodes[0].childNodes[c].id = this.getFullId() +"_table_"+i+"_"+c;
					}
				}	
				this.topRight.style.zIndex = "999";
				this.topRight.style.left = this.width - 17;		
				this.topLeft.style.zIndex = "999";
			}
		}catch(e){
			alert(e);
		}
	},
	ResizeScrollArea: function(){
		var height = this.height;
		if (!this.vertical)
		{
			height -= parserInt(this.divHeaderRow.offsetHeight,10);
		}
		var width = this.width;
		if (!this.horizontal)
		{
			width -= parseInt(this.divHeaderColumn.offsetWidth,10);
		}	
		var headerRowsWidth = 0;
		var headerRowsHeight = 0;	
		var table = this.divContent.childNodes[0];			
		
		table.style.width = this.x+"px";
		table.style.height = this.y+"px";	
		
		if (this.divHeaderRowColumn != null)
		{
			headerRowsWidth = parseInt(this.divHeaderRowColumn.offsetWidth,10);
		}
		
		if (this.divHeaderRow != null)
		{
			headerRowsHeight = parseInt(this.divHeaderRow.offsetHeight,10);
		}

		// width
		//alert(table.offsetWidth+" "+ width +" "+this.x);
		if (parseInt(table.offsetWidth,10) > width)
		{
			this.divContent.style.width = Math.max(width - headerRowsWidth, 0) + "px";
			this.divContent.style.overflowX = "scroll";
			this.divContent.style.overflowY = "auto";							
		}
		else
		{
			this.divContent.style.width = Math.max(this.x - headerRowsWidth,0)+"px";
			this.divContent.style.overflowX = "auto";
			this.divContent.style.overflowY = "auto";
			this.divContent.style.width = this.width - headerRowsWidth;	
		}	
		
		//if (this.divHeaderRow != null)
		{
		//	this.divHeaderRow.style.width = (parseInt(this.divContent.offsetWidth,10) + headerRowsWidth) +"px";
		}
		
		// height
		if (parseInt(table.offsetHeight,10) > height)
		{
			
			this.divContent.style.height = Math.max(height, 80) +"px";
			this.divContent.style.overflowY = "scroll";		
			this.divContent.style.height = this.height - 17;
		}
		else
		{
			this.divContent.style.height = this.y +"px";
			this.divContent.style.overflowY = "hidden";
			this.divContent.style.height = this.height - headerRowsHeight;
		}
		
		if (this.divHeaderColumn != null)
		{
			this.divHeaderColumn.style.height = parseInt(this.divContent.offsetHeight,10) + "px";
		}		
		// check scrollbars	
		if (this.divContent.style.overflowY == "scroll")
		{
			//this.divContent.style.width = (parseInt(this.divContent.offsetWidth,10) + 17) + "px";
			this.divContent.style.width = (this.width - headerRowsWidth);
			this.divHeaderRow.style.width = (this.width - 17);
				
			this.topRight.style.display = "";
		}else this.topRight.display = "none";
		if (this.divContent.style.overflowX == "scroll")
		{
			//this.divContent.style.height = (parseInt(this.divContent.offsetHeight,10) + 17) + "px";
			this.divContent.style.height = (this.height - headerRowsHeight);		
			this.divHeaderColumn.style.height = (parseInt(this.divContent.offsetHeight,10) - 17) + "px";;
		}	
		//if (document.all)
		//	divContent.parentElement.style.width = divContent.offsetWidth + headerRowsWidth;
		//else 		
		this.divContent.parentNode.style.width = (parseInt(this.divContent.offsetWidth,10) + headerRowsWidth) +"px";	
	},
	getOnScrollFunction: function (oElement, toElement) {
		return function (event) {
			try{
			if (document.all){
				if (oElement._scrollSyncDirection == "horizontal" || oElement._scrollSyncDirection == "both")
					oElement.scrollLeft = event.srcElement.scrollLeft;
				if (oElement._scrollSyncDirection == "vertical" || oElement._scrollSyncDirection == "both")
					oElement.scrollTop = event.srcElement.scrollTop;
			}else {
				if (oElement._scrollSyncDirection == "horizontal" || oElement._scrollSyncDirection == "both")
					oElement.scrollLeft = toElement.scrollLeft;
				if (oElement._scrollSyncDirection == "vertical" || oElement._scrollSyncDirection == "both")
					oElement.scrollTop = toElement.scrollTop;		
			}				
			}catch(e)
			{
				alert(e);
			}
		};
	},
	addScrollSynchronization: function(fromElement, toElement, direction) {
		this.removeScrollSynchronization(fromElement);	
		fromElement._syncScroll = this.getOnScrollFunction(fromElement, toElement);
		fromElement._scrollSyncDirection = direction;
		fromElement._syncTo = toElement;
		if (document.all)
			toElement.attachEvent("onscroll", fromElement._syncScroll);
		else if (toElement.addEventListener)
			toElement.addEventListener("scroll", fromElement._syncScroll,true);
	},
	removeScrollSynchronization: function(fromElement) {
		if (fromElement._syncTo != null)
			if (document.all)
				fromElement._syncTo.detachEvent("onscroll", fromElement._syncScroll);
			else fromElement._syncTo.removeEventListener("scroll",fromElement._syncScroll,true);

		fromElement._syncTo = null;
		fromElement._syncScroll = null;
		fromElement._scrollSyncDirection = null;
	},
	setData: function(data,page, rowPerPage){		
		try{
			this.data = data;	
			if (this.data instanceof portalui_arrayMap){
				if (page == undefined)
					this.setHTML(this.data.toHTMLCtrl(this.resourceId));
				else {		
					var start = (page - 1) * rowPerPage;
					var last = start + rowPerPage;
					if (last > this.data.getTag1()) last = this.data.getTag1();			
					this.setHTML(this.data.toHTMLCtrl(this.resourceId, start, last));
				}
			}
		}catch(e){
			systemAPI.alert("setData Table",e);
		}
	},
	setFixedColumn: function(data){
		if (this.fixedColumn != data){
			this.fixedColumn = data;
			if (this.html != "")
				this.setHTML(this.html);
		}	
	},
	previewHTML: function(){
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "";		
		var winfram= window.frames[this.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(this.html);
		winfram.document.close();
		this.frame.style.display = "none";
	},
	hideFrame: function(){
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "none";		
	},
	useIframe: function(location){
		this.iframe.src = location;
		this.iframe.style.display = "none";
	},
	print: function(){
		this.frame.style.display = "none";
		var cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined) {		
			if (cnv.style.display == "none")
				cnv.style.display = "";					
			else cnv.style.display = "none";				
		}
		var winfram= window.frames[this.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(this.html);
		winfram.document.close();
		winfram.focus();
		winfram.print();		
	},
	hideColumn: function(col){	    
		this.block.style.display = "";
		this.divHeaderRow.parentNode.removeChild(this.divHeaderRow);	
		this.divHeaderColumn.parentNode.removeChild(this.divHeaderColumn);	
		this.divHeaderRowColumn.parentNode.removeChild(this.divHeaderRowColumn);	
		this.cont.removeChild(this.table);
		this.cont.innerHTML = this.html;
		this.hideShowColumn(col, false,this.getFullId() +"_cont");		
		this.CreateScrollHeader(this.cont,true, true);
		this.block.style.display = "none";
	},
	showColumn: function(col){	    
		this.block.style.display = "";
		this.divHeaderRow.parentNode.removeChild(this.divHeaderRow);	
		this.divHeaderColumn.parentNode.removeChild(this.divHeaderColumn);	
		this.divHeaderRowColumn.parentNode.removeChild(this.divHeaderRowColumn);	
		this.cont.innerHTML = this.html;
		this.hideShowColumn(col, true,this.getFullId() +"_cont");		
		this.CreateScrollHeader(this.cont,true, true);
		this.block.style.display = "none";
	},
	hideShowColumn: function(col, show, id){	
		var state = (show)? "" :"none";
		var cels,tbl = $(id);
		var rows = tbl.getElementsByTagName("tr");
		for (var row=0; row<rows.length;row++) {
	      cels = rows[row].getElementsByTagName('td');
		  if (col > 0)
			cels[col].style.display=state;
	    }
	},
	setTop: function(data){
		window.portalui_saiTable.prototype.parent.setTop.call(this,data);
		if (this.layout !== undefined) this.layout.setTop(data);
	},
	setLeft: function(data){
		window.portalui_saiTable.prototype.parent.setLeft.call(this,data);
		if (this.layout !== undefined) this.layout.setLeft(data / 2 - 150);
	},
	doTopLeftClick: function(){
		if (this.layout.visible)
			this.layout.hide();
		else{
			this.refreshLayout();
			this.layout.show();
		}
		this.layout.bringToFront();		
	},
	createLayoutForm: function(){
		uses("portalui_panel");
		uses("portalui_listBox");
		this.layout = new portalui_panel(this.owner);
		this.layout.hide();
		this.layout.setTop(this.top);	
		this.layout.setLeft(this.left);
		this.layout.setWidth(300);
		this.layout.setHeight(200);	
		this.layout.setCaption("Layout");
		this.layout.bringToFront();
		
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
		
		uses("portalui_button");
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
	},
	refreshLayout: function(){
		var col;
		try{		
			this.lb1.clearItem();
			this.lb2.clearItem();
			var cels,tbl = $(this.getFullId()+"_table");
			var rows = tbl.getElementsByTagName("tr");		
		    cels = rows[0].getElementsByTagName('td');		
			for (var col =0; col < cels.length;col++){			
		        if (cels[col].style && cels[col].style.display != "none")			
					this.lb1.addItem(col,cels[col].innerHTML,undefined);
				else 
					this.lb2.addItem(col,cels[col].innerHTML,undefined);
		    }		
		}catch(e){
			alert("createlayout : "+e);
		}
	},
	doSelectLayout: function(sender,id,caption,icon){
		if (sender == this.lb1){	
			this.hideColumn(id);
		}else if (sender == this.lb2){		
			this.showColumn(id);
		}
		this.refreshLayout();
	},
	doClickLayout: function(sender ){
		if (sender == this.b1){
			var item = this.lb1.getSelectedItem();					
			this.hideColumn(item[1]);
		}else if (sender == this.b2){
			var item = this.lb2.getSelectedItem();			
			this.showColumn(item[1]);
		}
		this.refreshLayout();	
	},
	gridToHTML: function(sender ){
		return this.data.toHTML();
	}
});
