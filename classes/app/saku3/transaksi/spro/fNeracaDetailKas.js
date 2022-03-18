window.app_saku3_transaksi_spro_fNeracaDetailKas = function(owner,modul)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.constructor.call(this, owner);
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.setWidth.call(this, 300);
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.setHeight.call(this, 400);
		
		this.centerize();
		
		this.className = "app_saku3_transaksi_spro_fNeracaDetailKas";
		
		this.mouseX = 0;
		this.mouseY = 0;			
		
		this.p1 = new panel(this,{bound:[20,10,this.width - 40,this.height - 100], borderStyle:2});						
		this.e0 = new saiLabelEdit(this.p1,{bound:[20,11,150,20],caption:"Kode"});				
		this.e1 = new saiLabelEdit(this.p1,{bound:[20,12,300,20],caption:"Nama"});						
		this.e2 = new saiCB(this.p1,{bound:[20,13,220,20], caption:"Level Lap",items:["1","2","3","4,","5"] });				
		this.e3 = new saiCB(this.p1,{bound:[20,14,220,20], caption:"Tipe", items:["Summary","Header","Posting","SumPosted","Spasi"]});				
		this.e4 = new saiCB(this.p1,{bound:[20,15,220,20], caption:"SumHeader"});				
		//this.e5 = new saiCB(this.p1,{bound:[20,16,220,20], caption:"Jenis Akun"});
		this.e5 = new saiCB(this.p1,{bound:[20,14,220,20], caption:"Tipe", items:["Neraca","Pendapatan","Beban"]});				
		this.p1.rearrangeChild(20,23);
		this.b1 = new button(this,{bound:[this.width - 200,this.height - 50,80,20],caption:"Ok",icon:"url(icon/"+system.getThemes()+"/bOk2.png)",click:"doClick"});				
		this.b2 = new button(this,{bound:[this.width - 100,this.height - 50,80,20],caption:"Cancel",icon:"url(icon/"+system.getThemes()+"/cancel.png)",click:"doClick"});		
		this.setTabChildIndex();
		this.onClose.set(this,"doClose");
		system.addMouseListener(this);
	}
};
window.app_saku3_transaksi_spro_fNeracaDetailKas.extend(window.commonForm);
window.app_saku3_transaksi_spro_fNeracaDetailKas.implement({
	doDraw: function(canvas){
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
					"left: 00; top: 23; height: 100%; width: 100%;}'"+
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
	},
	doAfterResize: function(event){
		this.p1.setWidth(this.width - 40);
		this.p1.setHeight(this.height - 80);
		
		this.b1.setTop(this.height - 50);
		this.b1.setLeft(this.width - 200);
		
		this.b2.setTop(this.height - 50);
		this.b2.setLeft(this.width - 120);
	},
	doSysMouseDown: function(x, y, button, buttonState){	
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.app_saku3_transaksi_spro_fNeracaDetailKas.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		if (this.isClick)
		{		
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
	eventMouseUp: function(event){
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	eventMouseMove: function(event){
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
	},
	doClick: function(sender){
		if (sender == this.b1){
			try{
				if (this.e3.getText().toLowerCase() != "posting"){
					if (this.event === "Edit" &&  this.itemParent && this.itemParent.data2 && this.itemParent.data2.getLength() != 0){
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
		var value = this.e0.getText() + ";" + this.e1.getText() +";"+ this.e2.getText();
		value += ";"+this.e3.getText() + ";" + (this.e4.getText() == ""?"-":this.e4.getText()) +";"+ this.e5.getText();
		this.formRequester.doModalResult(this.event, this.modalResult, value);
		this.close();
	},
	doRequestReady: function(sender, methodName, result){
	},
	findBtnClick: function(sender){
	},
	setCaption: function(data){
		var caption = $(this.getFullId() + "_header");
		if (caption != undefined)
			caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/sai.png) no-repeat;width:22;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:25; top: 4;"+
				"width:100%; height:100%;color:#ffffff; }'>"+data+"</span>";
	},
	setItemParent: function(data){
		this.itemParent = data;
	},
	setSummaryItems: function(data){
		this.e4.clearItem();	
		for (var i in data)
			this.e4.addItem(i, data[i]);	
	},
	doClose: function(sender){
		system.delMouseListener(this);
	},
	setModul: function(modul){
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
	}
});
