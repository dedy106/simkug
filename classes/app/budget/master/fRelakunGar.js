window.app_budget_master_fRelakunGar = function(owner,lokasi)
{
	if (owner)
	{
		window.app_budget_master_fRelakunGar.prototype.parent.constructor.call(this, owner);
		window.app_budget_master_fRelakunGar.prototype.parent.setWidth.call(this, 800);
		window.app_budget_master_fRelakunGar.prototype.parent.setHeight.call(this, 400);
		
		this.centerize();
		
		this.className = "app_budget_master_fRelakunGar";
		
		this.mouseX = 0;
		this.mouseY = 0;			
		this.akun = undefined;
		this.items = undefined;
		this.items2 = undefined;
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(this.width - 40);
		this.p1.setHeight(this.height - 100);
		this.p1.setTop(20);
		this.p1.setLeft(0);
		this.p1.setBorder(2);		
		this.p1.setColor(system.getConfig("app.color.panel"));
		
		
		uses("portalui_saiGrid");
		this.eSearch = new portalui_saiLabelEdit(this.p1,{bound:[5,10,245,20], caption:"Akun"});
		this.bCari = new portalui_button(this.p1, {bound:[250,10,80,20],caption:"Cari", click:[this,"doCariClick"]});
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(33);
		this.sg1.setLeft(5);
		this.sg1.setWidth(345);
		this.sg1.setHeight(277);
		this.sg1.onDblClick.set(this, "doDblClick");				
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Kode Akun","Nama"));		
		this.sg1.setReadOnly(true);
		this.sg1.setColWidth(new Array(1,0),new Array(200,80));
				
		this.sg = new portalui_saiGrid(this.p1);
		this.sg.setTop(10);
		this.sg.setLeft(400);
		this.sg.setWidth(345);
		this.sg.setHeight(300);
		this.sg.onDblClick.set(this, "doDblClick");				
		this.sg.setColCount(2);
		this.sg.setColTitle(new Array("Kode Akun","Nama"));		
		this.sg.setReadOnly(true);
		this.sg.setColWidth(new Array(1,0),new Array(200,80));						
		
		this.rightBtn = new portalui_imageButton(this.p1);
		this.rightBtn.setTop(100);
		this.rightBtn.setLeft(360);
		this.rightBtn.setHeight(21);
		this.rightBtn.setWidth(21);
		this.rightBtn.setImage("icon/"+system.getThemes()+"/bright.png");
		this.rightBtn.setHint("Geser Kanan");
		this.rightBtn.onClick.set(this, "entriesClick");			
		
		this.leftBtn = new portalui_imageButton(this.p1);
		this.leftBtn.setTop(190);
		this.leftBtn.setLeft(360);
		this.leftBtn.setWidth(22);
		this.leftBtn.setHeight(22);
		this.leftBtn.setImage("icon/"+system.getThemes()+"/bleft.png");
		this.leftBtn.setHint("Geser Kiri");
		this.leftBtn.onClick.set(this,"entriesClick");
		
		this.allRightBtn = new portalui_imageButton(this.p1);
		this.allRightBtn.setTop(120);
		this.allRightBtn.setLeft(360);
		this.allRightBtn.setHeight(21);
		this.allRightBtn.setWidth(21);
		this.allRightBtn.setImage("icon/"+system.getThemes()+"/imgLast.png");
		this.allRightBtn.setHint("Geser Kanan Semua");
		this.allRightBtn.onClick.set(this, "entriesClick");			
		
		this.allLeftBtn = new portalui_imageButton(this.p1);
		this.allLeftBtn.setTop(170);
		this.allLeftBtn.setLeft(360);
		this.allLeftBtn.setWidth(22);
		this.allLeftBtn.setHeight(22);
		this.allLeftBtn.setImage("icon/"+system.getThemes()+"/imgFirst.png");
		this.allLeftBtn.setHint("Geser Kiri Semua");
		this.allLeftBtn.onClick.set(this,"entriesClick");
		
		
		this.b1 = new portalui_button(this);
		this.b1.setTop(this.height - 50);
		this.b1.setLeft(this.width - 200);
		this.b1.setCaption("OK");
		this.b1.setIcon("url(icon/"+system.getThemes()+"/bOk2.png)");
		this.b1.onClick.set(this, "doClick");
		
		this.b2 = new portalui_button(this);
		this.b2.setTop(this.height - 50);
		this.b2.setLeft(this.width - 100);
		this.b2.setCaption("Cancel");
		this.b2.setIcon("url(icon/"+system.getThemes()+"/cancel.png)");
		this.b2.onClick.set(this, "doClick");

		this.formRequester = undefined;
		this.event = undefined;		
				
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);		
				
		this.setTabChildIndex();
		uses("util_standar");
		this.standarLib = new util_standar();
		this.onClose.set(this,"doClose");
		system.addMouseListener(this);
		this.elokasi = lokasi;
		
	}
};
window.app_budget_master_fRelakunGar.extend(window.portalui_commonForm);
window.app_budget_master_fRelakunGar.prototype.doDraw = function(canvas){
	var n = this.getFullId();
	//canvas.style.background = "url(icon/"+system.getThemes()+"/bg.png) repeat";
	var html = "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:url(icon/"+system.getThemes()+"/bg.png) repeat;position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
                    "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
                    "</div>" +
                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
                    "</div>" +
				"<div id = '"+n+"_header' style='{position:absolute;background:url(icon/"+system.getThemes()+"/formHeader.png) repeat;"+
				"left: 0; top: 0; height: 23; width: 377;cursor:pointer;color:#ffffff}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				" > </div>"+							
				"<div id='"+n+"_rBg' style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
				"left: 377; top: 0; height: 23; width: 23;cursor:pointer;}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				"></div>"+				
				"<div id = '"+n+"_form' style = '{position:absolute;"+
				"left: 20; top: 23; height: 100%; width: 100%;}'"+
//				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
//				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				"> </div>"+
			"</div>"+
			"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
			"></div>";				
	this.setInnerHTML(html,canvas);
	this.header = $(n+"_header");
	this.rBg = $(n+"_rBg");
	this.blockElm = $(n +"_hidden");
	this.frameElm = $(n +"_frame");
	if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
			var b1 = $( n +"_sLeftTop");
			var b2 = $( n +"_sLeft");
			var b3 = $( n +"_sEdgeLeft");
			var b4 = $( n +"_sBottomLeft");
			var b5 = $( n +"_sRightTop");
			var b6 = $( n +"_sRight");
			var b7 = $( n +"_sEdgeRight");
			var b8 = $( n +"_sBottomRight");
			var b9 = $( n +"_sBottom");					
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9]);			
	}
};
window.app_budget_master_fRelakunGar.prototype.doAfterResize = function(event){
	this.p1.setWidth(this.width - 40);
	this.p1.setHeight(this.height - 80);
	
	this.b1.setTop(this.height - 50);
	this.b1.setLeft(this.width - 200);
	
	this.b2.setTop(this.height - 50);
	this.b2.setLeft(this.width - 120);
};
window.app_budget_master_fRelakunGar.prototype.setWidth = function(data){
	window.app_budget_master_fRelakunGar.prototype.parent.setWidth.call(this, data);
	this.header.style.width = data - 23;
	this.rBg.style.left = data - 23;
};
window.app_budget_master_fRelakunGar.prototype.doSysMouseMove = function(x, y, button, buttonState){
	window.app_budget_master_fRelakunGar.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
	if (this.isClick)
	{		
		var newLeft = this.left + (x - this.mouseX);
		var newTop = this.top + (y - this.mouseY);
	
		this.setLeft(newLeft);
		this.setTop(newTop);
	
		this.mouseX = x;
		this.mouseY = y;				
	}
};
window.app_budget_master_fRelakunGar.prototype.eventMouseDown = function(event){	
	this.mouseX = event.clientX;
    this.mouseY = event.clientY;
	
	this.isClick = true;
	this.blockElm.style.display = "";
	this.frameElm.style.display = "none";
};
window.app_budget_master_fRelakunGar.prototype.eventMouseUp = function(event){
	this.isClick = false;
	this.blockElm.style.display = "none";
	this.frameElm.style.display = "";
};
window.app_budget_master_fRelakunGar.prototype.eventMouseMove = function(event){
	if (this.isClick)
	{
		var x = event.clientX;
		var y = event.clientY;
		var newLeft = this.left + (x - this.mouseX);
		var newTop = this.top + (y - this.mouseY);
	
		this.setLeft(newLeft);
		this.setTop(newTop);
	
		this.mouseX = x;
		this.mouseY = y;
	}
};
window.app_budget_master_fRelakunGar.prototype.doClick = function(sender){
	try{
		if (sender == this.b1)
			this.modalResult = mrOk;
		else this.modalResult = mrCancel;
		var value = new portalui_arrayMap();
		var obj,line = undefined;
		for (var i =0 ;i < this.sg.rows.getLength();i++)
		{
			obj = this.sg.rows.get(i);
			line = new portalui_arrayMap();
			line.set("kode_akun",this.sg.cells(0,i));
			value.set(i, line);						
		}		
		this.formRequester.doModalResult("relakun", this.modalResult, value);
		this.close();
	}catch(e){
		system.alert(this,e,"");
	}
};
//--------------------------------------------
window.app_budget_master_fRelakunGar.prototype.setCaption = function(data){
	var caption = $(this.getFullId() + "_header");
	if (caption != undefined)
		caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/sai.png) no-repeat;width:22;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:25; top: 4;"+
			"width:100%; height:100%;color:#ffffff; }'>"+data+"</span>";
};
window.app_budget_master_fRelakunGar.prototype.setItemParent = function(data){
	this.itemParent = data;
};
window.app_budget_master_fRelakunGar.prototype.entriesClick = function(sender, col, row){
	if (sender == this.rightBtn)
	{	
		this.sg.appendData(new Array(this.sg1.getCell(0,this.sg1.row),this.sg1.getCell(1,this.sg1.row)));
		this.sg1.delRow(this.sg1.row);
	}else if(sender == this.leftBtn)
	{		
		this.sg1.appendData(new Array(this.sg.getCell(0,this.sg.row),this.sg.getCell(1,this.sg.row)));
		this.sg.delRow(this.sg.row);
	}else if (sender == this.allRightBtn)
	{	
		for (var i=0; i< this.sg1.getRowCount();i++)
			this.sg.appendData(new Array(this.sg1.getCell(0,i),this.sg1.getCell(1,i)));		
		this.sg1.clear();
	}else if(sender == this.allLeftBtn)
	{		
		for (var i=0; i< this.sg.getRowCount();i++)
			this.sg1.appendData(new Array(this.sg.getCell(0,i),this.sg.getCell(1,i)));		
		this.sg.clear();
	}
};
window.app_budget_master_fRelakunGar.prototype.show = function()
{
	this.showModal();
	this.app.setActiveForm(this);
	this.centerize();
	this.setVisible(true);
	this.bringToFront();
	this.loadNeraca();
};
window.app_budget_master_fRelakunGar.prototype.hide = function()
{
	this.setVisible(false);
	if (this.formRequester != undefined)
	{
		this.app.setActiveForm(this.app._mainForm);
		this.formRequester.unblock();
	}
};
window.app_budget_master_fRelakunGar.prototype.loadNeraca = function(){		
	var filter = "(";
		if (this.listAkun != undefined)
			for (var i in this.listAkun.objList){
				if ( i > 0) filter += ",";
				filter += "'"+this.listAkun.get(i).get("kode_akun") +"'";
			}
		filter += ")";		
	var nrc = this.dblib.runSQL("select a.kode_akun, a.nama from agg_masakun a "+				
				"where a.kode_lokasi = '"+this.elokasi+"' "+ (filter != "()"? " and a.kode_akun in "+filter:"and a.kode_akun in ('')"));
	if (nrc instanceof portalui_arrayMap){		
		this.sg.setData(nrc);
	}else  alert(nrc);
	
};
window.app_budget_master_fRelakunGar.prototype.doClose = function(sender)
{
	system.delMouseListener(this);
};
window.app_budget_master_fRelakunGar.prototype.doCariClick = function(sender)
{
	try{
		this.sg1.clear();
		var filter = "(";
		if (this.listAkun != undefined)
			for (var i in this.listAkun.objList){
				if ( i > 0) filter += ",";
				filter += "'"+this.listAkun.get(i).get("kode_akun") +"'";
			}
		filter += ")";		
		var nrc = this.dblib.loadQuery("select a.kode_akun, a.nama  from agg_masakun a "+				
					"where a.kode_lokasi = '"+this.elokasi+"' and a.kode_akun like '"+this.eSearch.getText()+"%' "+ 				
					(filter != "()"? "and kode_akun not in "+filter:"") +
					(this.allSelectAkun != ""? "and kode_akun not in ("+this.allSelectAkun+")":""));		
		if (nrc.search("\r\n") != -1){		
			nrc = nrc.split("\r\n");		
			var line; 
			this.sg1.showLoading();
			for (var i=1;i < nrc.length;i++)			
				this.sg1.appendData(nrc[i].split(";"));		
			this.sg1.hideLoading();
		}else if (nrc != "") alert(nrc);
	}catch(e){
		alert(e);
	}
};
