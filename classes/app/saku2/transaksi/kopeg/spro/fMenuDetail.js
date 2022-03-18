//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku2_transaksi_kopeg_spro_fMenuDetail = function(owner){
	if (owner){
		try{
			window.app_saku2_transaksi_kopeg_spro_fMenuDetail.prototype.parent.constructor.call(this, owner);
			window.app_saku2_transaksi_kopeg_spro_fMenuDetail.prototype.parent.setWidth.call(this, 300);
			window.app_saku2_transaksi_kopeg_spro_fMenuDetail.prototype.parent.setHeight.call(this, 400);		
			this.centerize();
			this.className = "app_saku2_transaksi_kopeg_spro_fMenuDetail";
			this.mouseX = 0;
			this.mouseY = 0;					
			this.p1 = new portalui_panel(this);
			this.p1.setBound(0,20,this.width - 40,this.height - 100);		
			this.p1.setBorder(2);		
			uses("portalui_saiLabelEdit;portalui_saiCBBL");
			this.e0 = new portalui_saiLabelEdit(this.p1);
			this.e0.setBound(20,10,150,20);
			this.e0.setText("");
			this.e0.setTipeText(window.ttNormal);
			this.e0.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Kode Menu</font>");						
			this.e1 = new portalui_saiLabelEdit(this.p1);
			this.e1.setBound(20,40,300,20);
			this.e1.setText("");
			this.e1.setTipeText(window.ttNormal);
			this.e1.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Nama Menu</font>");
					
			this.e2 = new portalui_saiCBBL(this.p1);
			this.e2.setBound(20,70,170,20);
			this.e2.setText("");
			this.e2.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Form</font>");
			this.e2.onBtnClick.set(this, "findBtnClick");
			this.e2.setReadOnly(false);	
			
			this.b1 = new portalui_button(this);
			this.b1.setBound(this.width - 200,this.height - 50,80,18);
			this.b1.setCaption("OK");
			this.b1.setIcon("url(icon/"+system.getThemes()+"/bOk2.png)");
			this.b1.onClick.set(this, "doClick");
				
			this.b2 = new portalui_button(this);
			this.b2.setBound(this.width - 100,this.height - 50,80,18);		
			this.b2.setCaption("Cancel");
			this.b2.setIcon("url(icon/"+system.getThemes()+"/cancel.png)");
			this.b2.onClick.set(this, "doClick");
										
			this.standarLib= new util_standar();				
			this.formRequester = undefined;
			this.event = undefined;			
			this.p1.setTabChildIndex();
			this.standar = new util_standar();
			this.onClose.set(this,"doClose");
			system.addMouseListener(this);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fMenuDetail.extend(window.portalui_commonForm);
window.app_saku2_transaksi_kopeg_spro_fMenuDetail.implement({
	doDraw: function(canvas){
		var n = this.getFullId();	
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
					"left: 0; top: 0; height: 25; width: 377;cursor:pointer;}' "+
					"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					" > </div>"+							
					"<div style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
					"left: 377; top: 0; height: 25; width: 23;cursor:pointer;}' "+
					"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>"+				
					"<div id = '"+n+"_form' style = '{position:absolute;"+
					"left: 20; top: 25; height: 100%; width: 100%;}'"+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
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
	},
	doAfterResize: function(event){
		this.p1.setWidth(this.width - 40);
		this.p1.setHeight(this.height - 80);
	
		this.b1.setTop(this.height - 50);
		this.b1.setLeft(this.width - 200);
	
		this.b2.setTop(this.height - 50);
		this.b2.setLeft(this.width - 120);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.app_saku2_transaksi_kopeg_spro_fMenuDetail.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		if (this.isClick){
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
			this.mouseX = x;
			this.mouseY = y;				
		}
	},
	eventMouseDown: function(event){	
		this.mouseX = event.clientX;
	    this.mouseY = event.clientY;
		
		this.isClick = true;
		this.blockElm.style.display = "";
		this.frameElm.style.display = "none";
	},
	eventMouseUp : function(event){
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	eventMouseMove: function(event){
		if (this.isClick){
			var x = event.clientX;
			var y = event.clientY;
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
			this.mouseX = x;
			this.mouseY = y;
		}
	},
	doClick: function(sender){
	  try{
	  	if (sender == this.b1)
	  		this.modalResult = mrOk;
	  	else this.modalResult = mrCancel;
	  	var value = this.e0.getText() + ";" + this.e1.getText() +";"+ this.e2.getText(); 
	  	
	  	this.formRequester.doModalResult(this.event, this.modalResult, value);
	  	this.close();	  	
	  	if (this.formRequester instanceof portalui_commonForm){
			this.app.setActiveForm(this.app._mainForm);		
			this.app._mainForm.setActiveForm(this.formRequester);
		}
	  	this.formRequester.setActiveControl(this.formRequester.e0);
	  	this.app._mainForm.unblock();
	  }catch(e){
	    alert(e);
	  }	
	},
	doRequestReady: function(sender, methodName, result){
		this.itemsValue = strToArray(result);
		var val = new Array();
				
		this.e2.items = new Array();
		this.e2.items2 = new Array();
		for (var i in this.itemsValue.objList)
		{					
			val = this.itemsValue.get(i);
			this.e2.items.push(val.get(0));
			this.e2.items2.push(val.get(1));
		}
	},
	findBtnClick: function(sender){
		try{
			this.standarLib.showListData(this, "Data  Form",this.e2,undefined, 
											  "select kode_form, nama_form from m_form ","select count(*) from m_form",
											  ["kode_form","nama_form"],"where",["Kode Form","Nama Form"]);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setCaption: function(data){
		var caption = $(this.getFullId() + "_header");
		if (caption != undefined)
			caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/folder.png) no-repeat;width:16;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:20; top: 4;"+
				"width:100%; height:100%;font-family: " + window.system.getConfig("form.titleFontName") + "; font-size: " + window.system.getConfig("form.titleFontSize") + "; font-color: " + window.system.getConfig("form.titleFontColor") + ";}'>"+data+"</span>";
	},
	setItemParent: function(data){
		this.itemParent = data;
	},
	doClose: function(sender){
		system.delMouseListener(this);
	}
});

