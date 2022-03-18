window.app_saku3_transaksi_spro_fExSumD = function(owner,modul)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.constructor.call(this, owner);
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.setWidth.call(this, 300);
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.setHeight.call(this, 400);
		
		this.centerize();
		
		this.className = "app_saku3_transaksi_spro_fExSumD";
		
		this.mouseX = 0;
		this.mouseY = 0;			
		
		this.p1 = new panel(this,{bound:[20,10,this.width - 40,this.height - 100], color:"#dedede", shadow:true});						
		this.e0 = new saiLabelEdit(this.p1,{bound:[20,11,150,20],caption:"Kode"});				
		this.e1 = new saiLabelEdit(this.p1,{bound:[20,12,300,20],caption:"Nama"});						
		this.e2 = new saiCB(this.p1,{bound:[20,13,220,20], caption:"Level Lap",items:["1","2","3","4,","5"] });				
		this.e3 = new saiCB(this.p1,{bound:[20,14,220,20], caption:"Tipe", items:["SUMMARY","HEADER","POSTING","SUMPOSTED"]});				
		this.e4 = new saiLabelEdit(this.p1,{bound:[20,15,220,20], caption:"SumHeader"});				
		this.e5 = new saiCB(this.p1,{bound:[20,16,220,20], caption:"Jenis Akun", items:["PENDAPATAN","BEBAN"]});				
		this.p1.rearrangeChild(20,23);
		this.b1 = new button(this,{bound:[this.width - 200,this.height - 50,80,20],caption:"Ok",icon:"url(icon/"+system.getThemes()+"/bOk2.png)",click:"doClick"});				
		this.b2 = new button(this,{bound:[this.width - 100,this.height - 50,80,20],caption:"Cancel",icon:"url(icon/"+system.getThemes()+"/cancel.png)",click:"doClick"});		
		this.setTabChildIndex();
		this.onClose.set(this,"doClose");
		system.addMouseListener(this);

	}
};
window.app_saku3_transaksi_spro_fExSumD.extend(window.commonForm);
window.app_saku3_transaksi_spro_fExSumD.implement({
	doDraw: function(canvas){
		var n = this.getFullId();	
		var html =  "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:#fff;position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<div id = '"+n+"_header' style='{position:absolute;background:#0099cc;"+
					"left: 0; top: 0; height: 23; width: 100%;cursor:pointer;color:#ffffff}' "+
					"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					" > </div>"+							
					"<div style='{position:absolute;"+
					"left: 377; top: 0; height: 23; width: 23;cursor:pointer;}' "+
					"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>"+				
					"<div id = '"+n+"form' style = '{position:absolute;"+
					"left: 0; top: 23; height: 100%; width: 100%;}'"+
					"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
					"> </div>"+
					"</div>";				
		this.setInnerHTML(html,canvas);
		this.frameElm = $("#"+n +"_frame");
		canvas.bind("mouseup",{resId:this.resourceId}, function(event){
			$$$(event.data.resId).frameElm.show();
			$$$(event.data.resId).isClick = false;
		});
		$("#"+ n +"_header").shadow("raised");
		canvas.shadow();
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
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.app_saku3_transaksi_spro_fExSumD.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
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
		this.frameElm.hide();
	},
	eventMouseUp: function(event){
		this.isClick = false;
		this.frameElm.show();
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
		try{
			if (sender == this.b1)
				this.modalResult = mrOk;
			else this.modalResult = mrCancel;
			var value = this.e0.getText() + ";" + this.e1.getText() +";"+ this.e2.getText();
			value += ";"+this.e3.getText() + ";" + (this.e4.getText() == ""?"-":this.e4.getText()) +";"+ this.e5.getText();
			this.formRequester.doModalResult(this.event, this.modalResult, value);
			this.close();
		}catch(e){
			error_log(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	},
	findBtnClick: function(sender){
	},
	setCaption: function(data){
		var caption = $("#"+this.getFullId() + "_header");
		caption.html("<span style='{align:center;position:absolute;left:25; top: 4;width:100%; height:100%;color:#ffffff; }'>"+data+"</span>" );
	},
	setItemParent: function(data){
		this.itemParent = data;
	},
	setSummaryItems: function(data){
		//this.e4.clearItem();	
		//for (var i in data)
		//	this.e4.addItem(i, data[i]);	
	},
	doClose: function(sender){
		system.delMouseListener(this);
	},
	setModul: function(modul){
		
	}
});
