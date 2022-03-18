/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.controls_saiSimpleTable = function(owner)
{
	if (owner)
	{
		window.controls_saiSimpleTable.prototype.parent.constructor.call(this, owner);	
		this.className = "controls_saiSimpleTable";	
		this.owner = owner;
		this.tableWidth = 500;
		this.colWidth = 125;	 
		this.row = 0;
		this.col = 0;
		this.tabStop = true;
		this.onValidasi = new controls_eventHandler();
		this.onSelectCell = new controls_eventHandler();
		this.onDblClick = new controls_eventHandler();
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
		this.fixedColumn = 1;
		this.data = undefined;
		this.title = new Array();		
		this.createLayoutForm();
	}
};
window.controls_saiSimpleTable.extend(window.controls_control);
window.saiSimpleTable = window.controls_saiSimpleTable;
window.controls_saiSimpleTable.prototype.doDraw = function(canvas)
{
	var n = this.getFullId();
	canvas.style.background = page.getConfig('app.color.grid');
	canvas.style.border = "1px solid #939bb0";
	canvas.style.overflow = "hidden";	
	var w = this.width;
	var h = this.height;
	var html =  "<div id='"+ n +"_frame' style='{position:absolute:width:100%;height:100%;}'>"+					
					"<div id='"+ n +"_cont' style='{position:absolute:width:100%;height:100%;}'>"+
					"<table id='"+ n +"_table' border='1' cellspacing='0' cellpadding='0' style='{border-collapse:collapse;table-layout:relative}' >"+
						"<thead style='height:20px'>"+
						"</thead>"+
						"<tbody style='overflow:auto'>"+
						"</tbody>"+
					"</table>"+
					"</div>"+					
				"</div>"+				
				"<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;}'></iframe>" +
				"<div id='"+n+"_block' style='{background:"+page.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
					"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
					"<span style='{position:absolute;left: "+(w / 2 - 25)+";top: "+(h / 2 + 25)+";width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
				"</div>";			
	
	canvas.innerHTML = html;	
	this.frame = $(n+"_frame");	
	this.iframe = $(n+"_iframe");	
	this.block = $(n+"_block");	
	this.cont = $(n+"_cont");			
	this.table = $(n+"_table");	
}
window.controls_saiSimpleTable.prototype.setTitle = function(data, colWidth){		
	var theader = this.table.tHead;	
	var tdElem,trElem = theader.insertRow(theader.rows.length);
	trElem.id = this.getFullId() +"_header";
	trElem.style.fontSize = 10;	
	trElem.style.backgroundColor = "#ff9900";
	trElem.style.background = "url(icon/"+page.getThemes()+"/tableHeader.png) 0 0 repeat-x";		
	//trElem.height = "20px";
	for (var i in data){			   
	   // first column
		tdElem = trElem.insertCell(trElem.cells.length);
		tdElem.id = this.getFullId() +"_C"+i;
		tdElem.align = "center";
		tdElem.innerHTML = data[i];		
		tdElem.width = colWidth[i];
		tdElem.class= "grid_header";
		
	}		
}
window.controls_saiSimpleTable.prototype.appendData = function(data){
	var tbody = this.table.tBodies[0];	
	var tdElem,trElem = tbody.insertRow(tbody.rows.length);
	trElem.id = this.getFullId() +"_header";
	trElem.style.fontSize = 10;		
	//trElem.height = "20px";
	for (var i in data){			   
	   // first column
		tdElem = trElem.insertCell(trElem.cells.length);
		tdElem.id = this.getFullId() +"_C"+i;
		tdElem.align = "center";
		tdElem.innerHTML = data[i];		
		tdElem.class= "grid_header";
		
	}
}
window.controls_saiSimpleTable.prototype.doScroll = function(event){
	try
	{
	    var step = "init";
		var n = this.getFullId();	
	    var frame = $(n + "_frame");
	    var header = $(n + "_colFrame");
		header.scrollLeft = frame.scrollLeft;		
	}
	catch (e)
	{
	    alert("[saiSG]::doScroll : " + e+"\r\n"+this.row+"-"+step);
	}
	
}
window.controls_saiSimpleTable.prototype.setHTML = function(html){
	try{									
		this.frame.display = "";
		this.html = html;		
		this.cont.innerHTML = html;							
		this.CreateScrollHeader(this.cont,true, true);
	}catch(e){
		alert("saiTable::setHTML:" + e)
	}
}
window.controls_saiSimpleTable.prototype.setWidth = function(data)
{
	window.controls_saiSimpleTable.prototype.parent.setWidth.call(this, data);	
	var cnv = $(this.getFullId()+"_frame");
	cnv.style.width = data;		
	this.layout.setLeft((data / 2) - 150 + this.left);
	this.table.style.width = data;
}

window.controls_saiSimpleTable.prototype.setHeight = function(data)
{
	window.controls_saiSimpleTable.prototype.parent.setHeight.call(this, data);	
	var cnv = $(this.getFullId()+"_frame");
	cnv.style.height = data;
	this.layout.setTop((data / 2) - 100 + this.top);	
}
window.controls_saiSimpleTable.prototype.setColWidth = function(colId, data)
{
	var n = this.getFullId() +"_table";	
	var col = $(n+"_1_"+colId);
	var diff = 0;
	if (col	!= undefined)	
		diff = data - parseInt(col.width,10);		
	var n = this.getFullId() +"_table";	
	var tbl = $(n);
	tbl.width = parseInt(col.width,10) + diff;
	if (col	!= undefined) col.width = data;
	
	//this.synch();
}
window.controls_saiSimpleTable.prototype.eventDoubleClick = function(event, rowidx, idx)
{			
	this.onDblClick.call(this, idx, rowidx);
}
window.controls_saiSimpleTable.prototype.eventClick = function(event, rowidx, idx)
{				
	if (this.cell != undefined)
		this.cell.style.backgroundColor = this.lastColor;		
	this.row = rowidx;
	this.col = idx;
	var input = $(this.getFullId()+"_table_"+rowidx+"_"+idx);	
	if (input != undefined){
		this.lastColor = input.style.backgroundColor;
		input.style.backgroundColor = page.getConfig("text.overBgColor");
		this.cell = input;
	}
	
}
window.controls_saiSimpleTable.prototype.eventMouseOver = function(event, idx, colId)
{	
	var input = $(this.getFullId()+"_table_"+idx);	
	if (input != undefined)
		input.style.backgroundColor = page.getConfig("app.color.gridRowHover");
	
}
window.controls_saiSimpleTable.prototype.eventMouseOut = function(event, idx, colId)
{
	
	if (idx % 2 == 0)
		var color = page.getConfig("app.color.gridDisabledText");
	else 	
		var color = page.getConfig("app.color.gridRowDiff");
	input = $(this.getFullId()+"_table_"+idx);
	if (input != undefined){
		input.style.backgroundColor = color;			
	}
}
window.controls_saiSimpleTable.prototype.eventMouseDown = function(event,c, r)
{
	this.row = r;
	this.col = c;	
	this.onSelectCell.call(this, c, r);
}
window.controls_saiSimpleTable.prototype.doDblClick = function(event,c, r)
{
	this.onDblClick.call(this, c, r);
}
window.controls_saiSimpleTable.prototype.setColTitle = function(data)
{
    /*
	var n = this.getFullId() +"_column";	
	var tblHeadObj = $(n);	
	if (data.length != tblHeadObj.rows[0].cells.length)
	 return false;	
	for (var h=0; h<tblHeadObj.rows[0].cells.length; h++) 
	{		
		
		tblHeadObj.rows[0].cells[h].innerHTML = data[h];				
	}
	*/
	this.title = data;
}
window.controls_saiSimpleTable.prototype.getColCount = function()
{
	var n = this.getFullId()+"_table";
	var rowObj = $(n).rows;			
	return rowObj.cells.length - 1;
}
window.controls_saiSimpleTable.prototype.getRowCount = function()
{
	var n = this.getFullId()+"_table";
	obj = $(n);
	if (obj != undefined){
		var rowObj = obj.rows;		
		return rowObj.length - 1;
	} else return 0;
}

window.controls_saiSimpleTable.prototype.getCell = function(col, row)
{
   try
   {
		var n = this.getFullId()+"_table";
		var tblBodyObj = $(n+"_"+row+"_"+col);			
		return tblBodyObj.innerHTML;		
	}catch(e)
	{
		return e
	}
}
window.controls_saiSimpleTable.prototype.setCell = function(col, row, value)
{
   try
   {
	    var n = this.getFullId()+"_table";
		var tblBodyObj = $(n +"_"+row+"_"+col);				
		//tblBodyObj.rows[row].cells[col].innerHTML= value;		
		tblBodyObj.innerHTML = value;
	}catch(e)
	{
		return e
	}
}

window.controls_saiSimpleTable.prototype.doKeyPress = function(keyCode, buttonState)
{
	
}
window.controls_saiSimpleTable.prototype.doKeyDown = function(charCode, buttonState)
{
	alert(charCode);
}
window.controls_saiSimpleTable.prototype.setColor = function(data)
{
	this.color = data;
	var cnv = this.getCanvas();
	cnv.style.background = data;
}
window.controls_saiSimpleTable.prototype.getColor = function()
{
	return this.color;
}
window.controls_saiSimpleTable.prototype.clear = function()
{
	try
	{		
	    var n = this.getRowCount();		
		for (var i=1;i <= n ;i++)
		{
			this.delRow(1);			
		}
					
	}catch(e)
	{
		alert("saiTable:clear:"+e);
	}	
}
window.controls_saiSimpleTable.prototype.clearAll = function()
{
	try
	{		
	    /*var cnv = $(this.getFullId()+"_frame");
		if (cnv != undefined)
			cnv.innerHTML = "";
		var node = $(this.getFullId()+"_column");	
		if (node != undefined)
			cnv.removeChild(node);
		*/
		this.doDraw(this.getCanvas());					
		
	}catch(e)
	{
		alert("saiTable:clear:"+e);
	}	
}


// Copy table to top and to left
window.controls_saiSimpleTable.prototype.CreateScrollHeader = function (content, scrollHorizontal, scrollVertical)
{
	try{
	this.horizontal = scrollHorizontal;
	this.vertical = scrollVertical;
	
	if (content != null)
	{	
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
		
		if (this.vertical)
		{
			this.divContent.parentNode.insertBefore(this.divHeaderColumn, this.divContent);
			this.divContent.style.left = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10) +"px";			
			this.table.style.position = "absolute";
			this.table.style.left = "-" + fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10)+"px";			
		}
		else
		{
			this.divContent.style.left = 0;
		}
						
		if (this.vertical)
		{
			this.divHeaderColumn.style.width = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10) +"px";
			this.divHeaderColumn.style.overflow = "hidden";
			this.divHeaderColumn.style.zIndex = "99";
			
			this.divHeaderColumn.style.position = "absolute";
			this.divHeaderColumn.style.left = "0";
			this.addScrollSynchronization(this.divHeaderColumn, this.divContent, "vertical");
			//this.x = this.x - parseInt(this.headerRowFirstColumn.offsetWidth,10);			
		}

		if (this.horizontal)
		{
			if (this.vertical)
			{
				this.divContent.parentNode.insertBefore(this.divHeaderRowColumn, this.divContent);
			}			
			this.divHeaderRowColumn.style.position = "absolute";
			this.divHeaderRowColumn.style.left = "0";
			this.divHeaderRowColumn.style.top = "0";
			this.divHeaderRowColumn.style.width = fixedColWidth;//parseInt(this.headerRowFirstColumn.offsetWidth,10)+"px";
			this.divHeaderRowColumn.overflow = "hidden";
			this.divHeaderRowColumn.style.zIndex = "99";
			this.divHeaderRowColumn.style.backgroundColor = "#ffffff";									
		}
		
		if (this.horizontal)
		{
			this.addScrollSynchronization(this.divHeaderRow, this.divContent, "horizontal");
		}
		
		if (this.horizontal || this.vertical)
		{					
			this.ResizeScrollArea();
		}		
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
		
	}
	}catch(e)
	{
		alert(e);
	}
}


// Resize scroll area to window size.
window.controls_saiSimpleTable.prototype.ResizeScrollArea = function()
{
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
					
	}
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
}


// ********************************************************************************
// Synchronize div elements when scrolling 
// from http://webfx.eae.net/dhtml/syncscroll/syncscroll.html
// ********************************************************************************
// This is a function that returns a function that is used
// in the event listener
window.controls_saiSimpleTable.prototype.getOnScrollFunction = function (oElement, toElement) {
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

}

// This function adds scroll syncronization for the fromElement to the toElement
// this means that the fromElement will be updated when the toElement is scrolled
window.controls_saiSimpleTable.prototype.addScrollSynchronization = function(fromElement, toElement, direction) {
	this.removeScrollSynchronization(fromElement);	
	fromElement._syncScroll = this.getOnScrollFunction(fromElement, toElement);
	fromElement._scrollSyncDirection = direction;
	fromElement._syncTo = toElement;
	if (document.all)
		toElement.attachEvent("onscroll", fromElement._syncScroll);
	else if (toElement.addEventListener)
		toElement.addEventListener("scroll", fromElement._syncScroll,true);

}

// removes the scroll synchronization for an element
window.controls_saiSimpleTable.prototype.removeScrollSynchronization = function(fromElement) {
	if (fromElement._syncTo != null)
		if (document.all)
			fromElement._syncTo.detachEvent("onscroll", fromElement._syncScroll);
		else fromElement._syncTo.removeEventListener("scroll",fromElement._syncScroll,true);

	fromElement._syncTo = null;
	fromElement._syncScroll = null;
	fromElement._scrollSyncDirection = null;
}
window.controls_saiSimpleTable.prototype.setData = function(data){	
	this.data = data;	
	if (this.data instanceof controls_arrayMap){
		this.setHTML(this.data.toHTMLCtrl(this.resourceId));
	}
}
window.controls_saiSimpleTable.prototype.setFixedColumn = function(data){
	if (this.fixedColumn != data){
		this.fixedColumn = data;
		if (this.html != "")
			this.setHTML(this.html);
	}
	
}
window.controls_saiSimpleTable.prototype.previewHTML = function(){
	var cnv = $(this.getFullId() + "_iframe");
	if (cnv != undefined)
		cnv.style.display = "";		
	var winfram= window.frames[this.getFullId() +"_iframe"];
	winfram.document.open();
	winfram.document.write(loadCSS("server_util_laporan"));
	winfram.document.write(this.html);
	winfram.document.close();
	this.frame.style.display = "none";
}
window.controls_saiSimpleTable.prototype.hideFrame = function(){
	var cnv = $(this.getFullId() + "_iframe");
	if (cnv != undefined)
		cnv.style.display = "none";		
}
window.controls_saiSimpleTable.prototype.useIframe = function(location){
	this.iframe.src = location;
	this.iframe.style.display = "none";
}
window.controls_saiSimpleTable.prototype.print = function(){
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
	
}
window.controls_saiSimpleTable.prototype.hideColumn = function(col){	
    
	//this.hideShowColumn(col, false,this.getFullId() +"_table");		
	//this.hideShowColumn(col, false,this.getFullId() +"_tableHeader");	
	//this.hideShowColumn(col, false,this.getFullId() +"_tableColumn");	
	//this.hideShowColumn(col, false,this.getFullId() +"_tableRowColumn");	
	this.block.style.display = "";
	this.divHeaderRow.parentNode.removeChild(this.divHeaderRow);	
	this.divHeaderColumn.parentNode.removeChild(this.divHeaderColumn);	
	this.divHeaderRowColumn.parentNode.removeChild(this.divHeaderRowColumn);	
	this.cont.removeChild(this.table);
	this.cont.innerHTML = this.html;
	this.hideShowColumn(col, false,this.getFullId() +"_cont");		
	this.CreateScrollHeader(this.cont,true, true);
	this.block.style.display = "none";
}
window.controls_saiSimpleTable.prototype.showColumn = function(col){	
    
	//this.hideShowColumn(col, true,this.getFullId() +"_table");	
	//this.hideShowColumn(col, true,this.getFullId() +"_tableHeader");	
	//this.hideShowColumn(col, true,this.getFullId() +"_tableColumn");	
	//this.hideShowColumn(col, true,this.getFullId() +"_tableRowColumn");	
	this.block.style.display = "";
	this.divHeaderRow.parentNode.removeChild(this.divHeaderRow);	
	this.divHeaderColumn.parentNode.removeChild(this.divHeaderColumn);	
	this.divHeaderRowColumn.parentNode.removeChild(this.divHeaderRowColumn);	
	this.cont.innerHTML = this.html;
	this.hideShowColumn(col, true,this.getFullId() +"_cont");		
	this.CreateScrollHeader(this.cont,true, true);
	this.block.style.display = "none";
}
window.controls_saiSimpleTable.prototype.hideShowColumn = function(col, show, id){	
	var state = (show)? "" :"none";
	var cels,tbl = $(id);
	var rows = tbl.getElementsByTagName("tr");
	for (var row=0; row<rows.length;row++) {
      cels = rows[row].getElementsByTagName('td');
	  if (col > 0)
		cels[col].style.display=state;
    }
}

//---------layout
window.controls_saiSimpleTable.prototype.setTop = function(data){
	window.controls_saiSG.prototype.parent.setTop.call(this,data);
	this.layout.setTop(data);
}
window.controls_saiSimpleTable.prototype.setLeft = function(data){
	window.controls_saiSG.prototype.parent.setLeft.call(this,data);
	this.layout.setLeft(data / 2 - 150);
}
window.controls_saiSimpleTable.prototype.doTopLeftClick = function(){
	if (this.layout.visible)
		this.layout.hide();
	else{
		this.refreshLayout();
		this.layout.show();
	}
	this.layout.bringToFront();	
	
}
window.controls_saiSimpleTable.prototype.createLayoutForm = function(){
	uses("controls_panel");
	uses("controls_listBox");
	this.layout = new controls_panel(this.owner);
	this.layout.hide();
	this.layout.setTop(this.top);	
	this.layout.setLeft(this.left);
	this.layout.setWidth(300);
	this.layout.setHeight(200);	
	this.layout.setCaption("Layout");
	this.layout.bringToFront();
	
	this.lb1 = new controls_listBox(this.layout);
	this.lb1.setTop(25);
	this.lb1.setLeft(5);
	this.lb1.setWidth(125);
	this.lb1.setHeight(170);	
	this.lb1.onDblClick.set(this,"doSelectLayout");
	
	this.lb2 = new controls_listBox(this.layout);
	this.lb2.setTop(25);
	this.lb2.setLeft(170);
	this.lb2.setWidth(125);
	this.lb2.setHeight(170);	
	this.lb2.onDblClick.set(this,"doSelectLayout");
	
	uses("controls_button");
	this.b1 = new controls_button(this.layout);
	this.b1.setTop(50);
	this.b1.setLeft(135);
	this.b1.setWidth(30);
	this.b1.setWithImage(false);
	this.b1.setCaption("Hide");
	this.b1.onClick.set(this,"doClickLayout");
	
	this.b2 = new controls_button(this.layout);
	this.b2.setTop(90);
	this.b2.setLeft(135);
	this.b2.setWidth(30);
	this.b2.setWithImage(false);
	this.b2.setCaption("Show");
	this.b2.onClick.set(this,"doClickLayout");
}
window.controls_saiSimpleTable.prototype.refreshLayout = function(){
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
}	
window.controls_saiSimpleTable.prototype.doSelectLayout = function(sender,id,caption,icon){
	if (sender == this.lb1){	
		this.hideColumn(id);
	}else if (sender == this.lb2){		
		this.showColumn(id);
	}
	this.refreshLayout();
}
window.controls_saiSimpleTable.prototype.doClickLayout = function(sender ){
	if (sender == this.b1){
		var item = this.lb1.getSelectedItem();		
		//this.lb2.addItem(item[1],item[2],undefined);
		//this.lb1.delItem(item[1]);
		this.hideColumn(item[1]);
	}else if (sender == this.b2){
		var item = this.lb2.getSelectedItem();		
		//this.lb1.addItem(item[1],item[2],undefined);
		//this.lb2.delItem(item[1]);		
		this.showColumn(item[1]);
	}
	this.refreshLayout();
	
}
window.controls_saiSimpleTable.prototype.gridToHTML = function(sender ){
	return this.data.toHTML();
}
