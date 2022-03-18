window.app_saku3_transaksi_siaga_fStrukturDetail = function(owner,modul)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.constructor.call(this, owner);
		window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.setWidth.call(this, 300);
		window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.setHeight.call(this, 400);
	
		this.centerize();
		
		this.className = "app_saku3_transaksi_siaga_fStrukturDetail";
		
		this.mouseX = 0;
		this.mouseY = 0;			
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(this.width - 40);
		this.p1.setHeight(this.height - 100);
		this.p1.setTop(20);
		this.p1.setLeft(0);
		this.p1.setBorder(2);		
		this.p1.setColor(system.getConfig("app.color.panel"));
	
		this.e0 = new saiLabelEdit(this.p1,{bound:[20,12,200,20],caption:"Kode"});
		this.e1 = new saiLabelEdit(this.p1,{bound:[20,13,320,20],caption:"Nama"});	
		this.e3 = new saiCB(this.p1,{bound:[20,12,220,20],caption:"Tipe",items:["Header","Posting"], readOnly:true,tag:0});	
		
		this.l_tgl1 = new portalui_label(this.p1,{bound:[20,11,100,18],caption:"Tgl Awal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.p1,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 	
		
		this.l_tgl2 = new portalui_label(this.p1,{bound:[20,12,100,18],caption:"Tgl Akhir", underline:true});
		this.dp_d2 = new portalui_datePicker(this.p1,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});
		this.cb1 = new portalui_checkBox(this.p1,{bound:[120,13,100,25],caption:"Set Tgl Akhir",selected:false,click:[this,"doClick2"]});

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
		this.onClose.set(this,"doClose");
		system.addMouseListener(this);

		this.p1.rearrangeChild(10, 23);
	}
};
window.app_saku3_transaksi_siaga_fStrukturDetail.extend(window.portalui_commonForm);
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doDraw = function(canvas)
{
	var n = this.getFullId();	
	var html =  "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:url(icon/"+system.getThemes()+"/bg.png) repeat;position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
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
				"> </div>"+
				"</div>"+
				"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
					"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				"></div>";				
	this.setInnerHTML(html,canvas);
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
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doAfterResize = function(event)
{
	this.p1.setWidth(this.width - 40);
	this.p1.setHeight(this.height - 80);
	
	this.b1.setTop(this.height - 50);
	this.b1.setLeft(this.width - 200);
	
	this.b2.setTop(this.height - 50);
	this.b2.setLeft(this.width - 120);
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doSysMouseDown = function(x, y, button, buttonState)
{	
	window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doSysMouseUp = function(x, y, button, buttonState)
{	
	window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doSysMouseMove = function(x, y, button, buttonState)
{
	window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
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
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.eventMouseDown = function(event)
{
	
	this.mouseX = event.clientX;
    this.mouseY = event.clientY;
	
	this.isClick = true;
	this.blockElm.style.display = "";
	this.frameElm.style.display = "none";
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.eventMouseUp = function(event)
{
	this.isClick = false;
	this.blockElm.style.display = "none";
	this.frameElm.style.display = "";
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.eventMouseMove = function(event)
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
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doClick = function(sender)
{
	if (sender == this.b1){
		try{
			if (this.e3.getText().toLowerCase() != "posting"){
				if (this.event === "Edit" &&  this.itemParent && this.itemParent.data2 &&this.itemParent.data2.getLength() != 0){
					system.alert(this,"Kode Neraca ini masih terelasi dengan akun. tidak boleh bertipe selain Posting","");
					return;
				}
			}			
			if (this.e3.getText().toLowerCase() == "posting"){
				if (this.event === "Edit" &&  this.itemParent && this.itemParent.isHasChild() != 0){
					system.alert(this,"Kode Neraca ini mempunyai item dibawahnya. tidak boleh bertipe posting.","");
					return;
				}
			}
		}catch(e){
			alert(e);
		}
	}
	if (sender == this.b1)
		this.modalResult = mrOk;
	else this.modalResult = mrCancel;
	/*
	var value = this.e0.getText() + ";" + this.e1.getText() +";"+ this.e2.getText();
	value += ";"+this.e3.getText() + ";" + (this.e4.getText() == ""?"-":this.e4.getText()) +";"+ this.e5.getText();
	*/
	var value = this.e0.getText() + ";" + this.e1.getText()+";1";
	value += ";"+this.e3.getText() + ";" +this.dp_d1.getDateString()+";"+this.dp_d2.getDateString();
	//alert(value);
	this.formRequester.doModalResult(this.event, this.modalResult, value);
	this.close();
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doClick2 = function(sender)
{
	if (this.cb1.isSelected()) 
	{
		var tgl="31/12/2099";
		this.dp_d2.setText(tgl);
	}
	else
	{
		var tgl=new Date().lclFormat();
		this.dp_d2.setText(tgl);
	}	
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doRequestReady = function(sender, methodName, result)
{
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.findBtnClick = function(sender)
{
	
};
//--------------------------------------------
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.setCaption = function(data)
{
	var caption = $(this.getFullId() + "_header");
	if (caption != undefined)
		caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/sai.png) no-repeat;width:22;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:25; top: 4;"+
			"width:100%; height:100%;color:#ffffff; }'>"+data+"</span>";
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.setItemParent = function(data)
{
	this.itemParent = data;
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.setSummaryItems = function(data)
{
	this.e4.clearItem();
	for (var i in data)
		this.e4.addItem(i, data[i]);	
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.doClose = function(sender)
{
	system.delMouseListener(this);
};
window.app_saku3_transaksi_siaga_fStrukturDetail.prototype.setModul = function(modul)
{
	/*
    this.e5.clearItem();
    switch(modul.toUpperCase()){
		case "AKTIVA":
            this.e5.addItem("Neraca","Neraca");
        break;
        case "PASIVA":
            this.e5.addItem("Neraca","Neraca");
      		this.e5.addItem("LabaRugi","Labarugi");
		break;
		case "LABARUGI":
    		this.e5.addItem("Beban","Beban");
    		this.e5.addItem("Pendapatan","Pendapatan");
		break;
	}
	*/
};
