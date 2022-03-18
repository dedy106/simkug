window.app_saku_anggaran_master_fRKMDetail = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_master_fRKMDetail.prototype.parent.constructor.call(this, owner);
		window.app_saku_anggaran_master_fRKMDetail.prototype.parent.setWidth.call(this, 300);
		window.app_saku_anggaran_master_fRKMDetail.prototype.parent.setHeight.call(this, 400);
		this.centerize();
		this.className = "app_saku_anggaran_master_fRKMDetail";
		this.mouseX = 0;
		this.mouseY = 0;			
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(this.width - 40);
		this.p1.setHeight(this.height - 100);
		this.p1.setTop(20);
		this.p1.setLeft(0);
		this.p1.setBorder(2);		
		this.p1.setColor(system.getConfig("app.color.panel"));
		
		this.e0 = new portalui_saiLabelEdit(this.p1);
		this.e0.setTop(10);
		this.e0.setLeft(20);
		this.e0.setWidth(150);
		this.e0.setText("");
		this.e0.setCaption("Kode");
		
		this.e1 = new portalui_saiLabelEdit(this.p1);
		this.e1.setTop(35);
		this.e1.setLeft(20);
		this.e1.setWidth(300);
		this.e1.setText("");
		this.e1.setCaption("Nama");
		
		uses("portalui_saiCB");
		this.e2 = new portalui_saiCB(this.p1);
		this.e2.setTop(60);
		this.e2.setLeft(20);
		this.e2.setWidth(200);
		this.e2.setCaption("Level Lap");
		this.e2.addItem(0,"1");
		this.e2.addItem(1,"2");
		this.e2.addItem(2,"3");
		this.e2.addItem(3,"4");
		this.e2.addItem(4,"5");
		
		this.e3 = new portalui_saiCB(this.p1);
		this.e3.setTop(82);
		this.e3.setLeft(20);
		this.e3.setWidth(220);
		this.e3.setCaption("Tipe");
		this.e3.addItem("Summary","Summary");
		this.e3.addItem("Header","Header");
		this.e3.addItem("Posting","Posting");
		this.e3.addItem("Summary Posted","Summary Posted");
		this.e3.addItem("spasi","Spasi");
		
		this.e4 = new portalui_saiCB(this.p1);
		this.e4.setTop(104);
		this.e4.setLeft(20);
		this.e4.setWidth(220);
		this.e4.setCaption("Sum Header");
		
		this.e5 = new portalui_saiCB(this.p1);
		this.e5.setTop(126);
		this.e5.setLeft(20);
		this.e5.setWidth(220);
		this.e5.setCaption("Jenis Akun");
		this.e5.addItem("Investasi","Investasi");
		this.e5.addItem("Beban","Beban");
		this.e5.addItem("Pendapatan","Pendapatan");
		this.e5.addItem("LabaRugi","Labarugi");
		
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
		this.setTabChildIndex();
	}
};
window.app_saku_anggaran_master_fRKMDetail.extend(window.portalui_commonForm);
window.app_saku_anggaran_master_fRKMDetail.prototype.doDraw = function(canvas)
{
	var n = this.getFullId();
	canvas.style.background = "url(icon/"+system.getThemes()+"/bg.png) repeat";
//	canvas.style.cursor = "pointer";
//	canvas.style.height = 300;
//	canvas.style.width = 400;
	var html = "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
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
				"<div style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
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
				"> </div>";				
	canvas.innerHTML = html;
};
window.app_saku_anggaran_master_fRKMDetail.prototype.doAfterResize = function(event)
{
	this.p1.setWidth(this.width - 40);
	this.p1.setHeight(this.height - 80);
	
	this.b1.setTop(this.height - 50);
	this.b1.setLeft(this.width - 200);
	
	this.b2.setTop(this.height - 50);
	this.b2.setLeft(this.width - 120);
};
window.app_saku_anggaran_master_fRKMDetail.prototype.eventMouseDown = function(event)
{
	this.mouseX = event.clientX;
    this.mouseY = event.clientY;
	
	this.isClick = true;
};
window.app_saku_anggaran_master_fRKMDetail.prototype.eventMouseUp = function(event)
{
	this.isClick = false;
};
window.app_saku_anggaran_master_fRKMDetail.prototype.eventMouseMove = function(event)
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
window.app_saku_anggaran_master_fRKMDetail.prototype.doClick = function(sender)
{
	if (sender == this.b1)
		this.modalResult = mrOk;
	else this.modalResult = mrCancel;
	var value = this.e0.getText() + ";" + this.e1.getText() +";"+ this.e2.getText();
	value += ";"+this.e3.getText() + ";" + (this.e4.getText() == ""?"-":this.e4.getText()) +";"+ this.e5.getText();
	this.formRequester.doModalResult(this.event, this.modalResult, value);
	this.close();
};
window.app_saku_anggaran_master_fRKMDetail.prototype.doRequestReady = function(sender, methodName, result)
{
};
window.app_saku_anggaran_master_fRKMDetail.prototype.findBtnClick = function(sender)
{
};
window.app_saku_anggaran_master_fRKMDetail.prototype.setCaption = function(data)
{
	var caption = $(this.getFullId() + "_header");
	if (caption != undefined)
		caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(image/themes/"+system.getThemes()+"/fis.png) no-repeat;width:20;height:20;}'> </div>"+"<span style='{align:center;position:absolute;left:20; top: 4;"+
			"width:100%; height:100%; }'>"+data+"</span>";
};
window.app_saku_anggaran_master_fRKMDetail.prototype.setItemParent = function(data)
{
	this.itemParent = data;
};
window.app_saku_anggaran_master_fRKMDetail.prototype.setSummaryItems = function(data)
{
	this.e4.clearItem();
	for (var i in data)
	{
		this.e4.addItem(i, data[i]);
	}
};