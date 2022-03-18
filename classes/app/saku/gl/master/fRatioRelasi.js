window.app_saku_gl_master_fRatioRelasi = function(owner, lokasi)
{
	if (owner)
	{
		window.app_saku_gl_master_fRatioRelasi.prototype.parent.constructor.call(this, owner);
		window.app_saku_gl_master_fRatioRelasi.prototype.parent.setWidth.call(this, 800);
		window.app_saku_gl_master_fRatioRelasi.prototype.parent.setHeight.call(this, 400);
		
		this.centerize();
		
		this.className = "app_saku_gl_master_fRatioRelasi";
		
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
		
		this.e01 = new portalui_saiCBBL(this.p1);
		this.e01.setTop(10);
		this.e01.setLeft(150);
		this.e01.setWidth(200);
		this.e01.setText("");
		this.e01.setCaption("FS");
		this.e01.onBtnClick.set(this,"findVersi");
		this.e01.onChange.set(this,"doChange");
		
		this.e0 = new portalui_saiLabelEdit(this.p1);
		this.e0.setTop(35);
		this.e0.setLeft(150);
		this.e0.setWidth(350);
		this.e0.setText("");
		this.e0.setCaption("Rumus");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(60);
		this.sg1.setLeft(5);
		this.sg1.setWidth(345);
		this.sg1.setHeight(250);
		this.sg1.onDblClick.set(this, "doDblClick");				
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Kode Neraca","Nama"));		
		this.sg1.setReadOnly(false);
		this.sg1.setColWidth(new Array(1,0),new Array(200,80));				
				
		this.sg = new portalui_saiSG(this.p1);
		this.sg.setTop(60);
		this.sg.setLeft(400);
		this.sg.setWidth(345);
		this.sg.setHeight(250);
		this.sg.onDblClick.set(this, "doDblClick");				
		this.sg.setColCount(2);
		this.sg.setColTitle(new Array("Kode Neraca","Nama"));		
		this.sg.setReadOnly(false);
		this.sg.setColWidth(new Array(1,0),new Array(200,80));				
		
		this.rightBtn = new portalui_imageButton(this.p1);
		this.rightBtn.setTop(100);
		this.rightBtn.setLeft(360);
		this.rightBtn.setHeight(21);
		this.rightBtn.setWidth(21);
		this.rightBtn.setImage("icon/"+system.getThemes()+"/bright.png");
		this.rightBtn.onClick.set(this, "entriesClick");			
		
		this.leftBtn = new portalui_imageButton(this.p1);
		this.leftBtn.setTop(190);
		this.leftBtn.setLeft(360);
		this.leftBtn.setWidth(22);
		this.leftBtn.setHeight(22);
		this.leftBtn.setImage("icon/"+system.getThemes()+"/bleft.png");
		this.leftBtn.setHint("delete entries");
		this.leftBtn.onClick.set(this,"entriesClick");
		
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
		this.lokasi = lokasi;
	}
};
window.app_saku_gl_master_fRatioRelasi.extend(window.portalui_commonForm);
window.app_saku_gl_master_fRatioRelasi.prototype.doDraw = function(canvas)
{
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
window.app_saku_gl_master_fRatioRelasi.prototype.doAfterResize = function(event){
	this.p1.setWidth(this.width - 40);
	this.p1.setHeight(this.height - 80);
	
	this.b1.setTop(this.height - 50);
	this.b1.setLeft(this.width - 200);
	
	this.b2.setTop(this.height - 50);
	this.b2.setLeft(this.width - 120);
};
window.app_saku_gl_master_fRatioRelasi.prototype.setWidth = function(data){
	window.app_saku_gl_master_fRatioRelasi.prototype.parent.setWidth.call(this, data);
	this.header.style.width = data - 23;
	this.rBg.style.left = data - 23;
	
};
window.app_saku_gl_master_fRatioRelasi.prototype.doSysMouseMove = function(x, y, button, buttonState)
{
	window.app_saku_gl_master_fRatioRelasi.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
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
window.app_saku_gl_master_fRatioRelasi.prototype.eventMouseDown = function(event)
{	
	this.mouseX = event.clientX;
    this.mouseY = event.clientY;
	
	this.isClick = true;
	this.blockElm.style.display = "";
	this.frameElm.style.display = "none";
};
window.app_saku_gl_master_fRatioRelasi.prototype.eventMouseUp = function(event)
{
	this.isClick = false;
	this.blockElm.style.display = "none";
	this.frameElm.style.display = "";
};
window.app_saku_gl_master_fRatioRelasi.prototype.eventMouseMove = function(event)
{
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
window.app_saku_gl_master_fRatioRelasi.prototype.doClick = function(sender)
{
	try{
		if (sender == this.b1)
			this.modalResult = mrOk;
		else this.modalResult = mrCancel;
		var value = new portalui_arrayMap();
		var obj = undefined;
		for (var i =0 ;i < this.sg.rows.getLength();i++)
		{
			obj = this.sg.rows.get(i);
			value.set(i, this.sg.cells(0,i));						
		}
		var rumus = this.e0.getText();
		this.formRequester.doModalResult("relakun", this.modalResult, value, rumus);
		this.close();
	}catch(e){
		system.alert(this,e,"checking " + obj);
	}
	
};
window.app_saku_gl_master_fRatioRelasi.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
		{
			case "listData" : 				
				break;
			case "runQuery" :								
				break;
		}
};
//--------------------------------------------
window.app_saku_gl_master_fRatioRelasi.prototype.setCaption = function(data)
{
	var caption = $(this.getFullId() + "_header");
	if (caption != undefined)
		caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/sai.png) no-repeat;width:22;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:25; top: 4;"+
			"width:100%; height:100%;color:#ffffff; }'>"+data+"</span>";
};
window.app_saku_gl_master_fRatioRelasi.prototype.setItemParent = function(data)
{
	this.itemParent = data;
};
window.app_saku_gl_master_fRatioRelasi.prototype.entriesClick = function(sender, col, row)
{
	if (sender == this.rightBtn)
	{
		var txt = this.e0.getText();
		if (txt != ""){
			var c = txt.charAt(txt.length - 1);
			switch (c) {
			case "(" :
			case ")" :
			case "*" :
			case "/" :
			case "+" :
			case "-" :
				break;
			default :
				alert("tidak ditemukan operator diakhir rumus");
				return false;
				break;
			}
		}
		this.e0.setText(this.e0.getText() +this.sg1.getCell(0,this.sg1.row));
		this.sg.appendData(new Array(this.sg1.getCell(0,this.sg1.row),this.sg1.getCell(1,this.sg1.row)));
		this.sg1.delRow(this.sg1.row);
	}else if(sender == this.leftBtn)
	{
		var dt = this.sg.getCell(0,this.sg.row);
		var txt = this.e0.getText();
		this.e0.setText(txt.replace(dt,""));
		this.sg1.appendData(new Array(this.sg.getCell(0,this.sg.row),this.sg.getCell(1,this.sg.row)));
		this.sg.delRow(this.sg.row);
	}
};
window.app_saku_gl_master_fRatioRelasi.prototype.setSummaryItems = function(data)
{
	this.e4.clearItem();
	for (var i in data)
		this.e4.addItem(i, data[i]);	
};
window.app_saku_gl_master_fRatioRelasi.prototype.loadAkun = function()
{
	try
	{
		this.akun = strToArray(this.masakun);
		this.items = new Array();
		this.items2 = new Array();
		for (var i in this.akun.objList)
		{					
			val = this.akun.get(i);
			this.items.push(val.get(0));
			this.items2.push(val.get(1));
		}
		
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_gl_master_fRatioRelasi.prototype.show = function()
{
	this.showModal();
	this.app.setActiveForm(this);
	this.centerize();
	this.setVisible(true);
	this.bringToFront();

};
window.app_saku_gl_master_fRatioRelasi.prototype.hide = function()
{
	this.setVisible(false);
	if (this.formRequester != undefined)
	{
		this.app.setActiveForm(this.app._mainForm);
		this.formRequester.unblock();
	}
};
window.app_saku_gl_master_fRatioRelasi.prototype.loadNeraca = function()
{	
	var nrc = this.dblib.runSQL("select kode_neraca, ltrim(nama) from neraca where kode_lokasi = '"+this.app._lokasi+"' and  kode_fs = '"+this.e01.getText()+"' and tipe <> 'Spasi'");
	if (nrc instanceof portalui_arrayMap){		
		this.sg1.setData(nrc);
	}else alert(nrc);
	
};
window.app_saku_gl_master_fRatioRelasi.prototype.doChange = function(sender)
{	
	this.sg1.clear();
	this.loadNeraca();
};
window.app_saku_gl_master_fRatioRelasi.prototype.findVersi = function(sender)
{	
	this.standarLib.showListDataFromItems(this, "Data Financial Statement",sender, 
											  "select kode_fs, nama from fs where kode_lokasi = '"+this.lokasi+"' ","select count(*) from fs where kode_lokasi = '"+this.lokasi+"' ",
										  new Array("kode_fs","nama"),"and");
	
};
window.app_saku_gl_master_fRatioRelasi.prototype.doClose = function(sender)
{
	system.delMouseListener(this);
};