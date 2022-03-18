window.app_mede_report_fDashboard = function(owner){
	if (owner){
		window.app_mede_report_fDashboard.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_report_fDashboard";
		this.maximize();		
		uses("portalui_chart");
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 0);					
		this.sg1 = new portalui_saiGrid(this,{bound:[20,20,350,250],colCount:2,colTitle:["Proses","Jumlah Dok."],
			colWidth:[[1,0],[100,200]],readOnly:true, change:[this,"doGridChange"]});		
		this.c1 = new portalui_chart(this,{bound:[380,20,600,250],title:"Grafik",chartType: 2,rightPadding:200});
		this.p1 = new portalui_panel(this,{bound:[20,280,600,250],caption:"Data Detail"});
		this.sg2 = new portalui_saiGrid(this.p1,{bound:[1,20,698,230],colCount:3,colTitle:["Proses","Dokumen","Tanggal"],
			colWidth:[[1,0],[100,200]],readOnly:true, change:[this,"doGridChange"]});		
		this.standarLib = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);				
		this.onClose.set(this,"doClose");
		this.sg1.clear();
		this.sg1.appendData(["STPD","60"]);		
		this.sg1.appendData(["FPJP","55"]);
		this.sg1.appendData(["Purchase Request","50"]);
		this.sg1.appendData(["Purchase Order","40"]);
		this.sg1.appendData(["Invoice","35"]);
		this.sg1.appendData(["Approval GA","30"]);
		this.sg1.appendData(["Approval Accounting","25"]);
		this.sg1.appendData(["Approval Treasury","15"]);
		this.sg1.appendData(["Pembayaran","5"]);	
		var data = {"STPD":{"Jml Dok": 60},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 40},"Invoice":{"Jml Dok": 35},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 25},"Approval Treasury":{"Jml Dok": 15},
						"Pembayaran":{"Jml Dok": 5}};
		this.c1.setDataProvider(data);
		this.sg2.appendData(["STPD","STPD/0909/001","3/8/2009"]);		
		this.sg2.appendData(["FPJP","FPJP/0909/001","4/8/2009"]);
		this.sg2.appendData(["Purchase Request","PR/0909/001","5/8/2009"]);
		this.sg2.appendData(["Purchase Order","PO/0909/001","6/8/2009"]);
		this.sg2.appendData(["Invoice","INV/0909/001","24/8/2009"]);
		this.sg2.appendData(["Approval GA","AGA/0909/001","25/8/2009"]);
		this.sg2.appendData(["Approval Accounting","ACC/0909/001","26/8/2009"]);
		this.sg2.appendData(["Approval Treasury","ATR/0909/001","1/9/2009"]);
		this.sg2.appendData(["Pembayaran","",""]);			
	}
};
window.app_mede_report_fDashboard.extend(window.portalui_childForm);
window.app_mede_report_fDashboard.implement({
	doClick: function(sender){
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'doc_justifikasi','no_ver',this.app._lokasi+"-VPR"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
	},
	mainButtonClick:function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	doModalResult: function(event, modalResult,value){
		if (modalResult != mrOk) return false;		
		switch (event)
		{
			case "clear" :
			break;
			case "simpan":
			break;
			case "ubah":
			break;
		}			
		alert(value);
	},
	doGridChange: function(sender, col, row, filename, result, data){				
	},
	doClose: function(){		
	},
	doButtonClick: function(event,id){
		systemAPI.alert(id);
	}
});
