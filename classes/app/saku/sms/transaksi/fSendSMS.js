/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_saku_sms_transaksi_fSendSMS = function(owner)
{
	if (owner)
	{
		window.app_saku_sms_transaksi_fSendSMS.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sms_transaksi_fSendSMS";
		this.setTop(60);
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kirim SMS", 7);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL;portalui_saiMemo;portalui_saiGrid;server_sms_sms");
		this.e3 = new portalui_saiCBBL(this,{bound:[20, 10, 220, 20], caption:"Draft", multiSelection:false, rightLabelVisible:false, change:[this,"doChange"]});						
		this.e1 = new portalui_saiMemo(this,{bound:[20, 11, 595, 100], caption:"Message"});				
		this.bBrowse = new portalui_button(this, {bound:[20,12,80, 20], caption:"Browse All", click:"doClick"});
		this.bSelect = new portalui_button(this, {bound:[120,12,80, 20], caption:"Select/De All", click:"doClick"});			
		this.sg = new portalui_saiGrid(this,{bound:[20, 13, 595, 200], colCount:4, colTitle:["Send","NPM","Nama","No Tel."], 
			colWidth:[[3,2,1,0],[100,400,150,60]], buttonStyle:[[1],[bsEllips]], colFormat:[[0],[cfBoolean]], ellipsClick:[this,"doEllipse"]});				
		this.sgn = new portalui_sgNavigator(this,{bound:[20,13,595,25], grid:this.sg, buttonStyle:bsView});				
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{		
			this.dbLib = new util_dbLib(window.system.serverApp);		
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();			
			this.sms = new server_sms_sms();
			this.sms.addListener(this);		
			this.sg.clear(1);
			this.e3.setSQL("select kode_draft, nama from sms_draft where kode_lokasi = '"+this.app._lokasi+"' ",["kode_draft","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sms_transaksi_fSendSMS.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_sms_transaksi_fSendSMS.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}else if (sender == this.app._mainForm.bSend){
			var noTelp = "", first = true;
			for (var i=0; i < this.sg.rows.getLength();i++){
				if (this.sg.cells(3, i) != "-" && this.sg.cells(0,i).toLowerCase() == "true") {
					noTelp += (!first ? ";" : "") + this.sg.cells(3, i);
					first = false;
				}
			}					
			try{				
				 									
				if (noTelp != ""){
					this.sms.sendToMany(noTelp,this.e1.getText());
				}				
			}catch(e){
					systemAPI.alert(e);			
			}
		}
	},
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{				
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");								
				}
				break;		
		}	
	},
	FindBtnClick: function(sender, event){
		try
		{
			this.standarLib.showListData2(this, "Draft SMS",this.e3,this.e1, 
											  "select kode_draft, nama from sms_draft ",
											  "select count(*) from sms_draft",
											  ["kode_draft","nama"],"where",["Kode Draft","Nama"]);
		}catch(e){
			alert(e);
		}
	},
	doEllipse:  function(sender,col, row){
		this.standarLib.showListDataForSG(this,"Data Karyawan",this.sg,this.sg.row, 0,
			  "select kode_klpcust, nama from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"'  and tipe = 'posting'",
			  "select count(*) from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",
			  ["kode_klpcust","nama"],"and",["Kode Group","Nama"]);
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "getDataProvider" :
					try{
						result = eval('(' + result +')');
						var line;
						this.sg.clear();
						for (var i in result.rs.rows){
							line = result.rs.rows[i];	
							this.sg.appendData(["False",line.kode_klpcust, line.nama]);
						}
					}catch(e){
						
					}
					break;
			}
		}
		if (sender == this.sms){
			if (methodName == "sendSms"){							
				systemAPI.alert(result);				
			}else if (methodName == "sendToMany"){
				systemAPI.alert(result.replace("\n","<br>"));				
			}
		}
	},
	doClick: function(sender){
		try {
			if (sender == this.bBrowse) {
				var data = this.dbLib.getDataProvider("select nik, nama,no_ponsel from karyawan where kode_lokasi = '" + this.app._lokasi + "' ", true);
				if (typeof data != "string") {
					var line;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sg.appendData(['False', line.nik, line.nama, line.no_ponsel]);
					}
				}
				else 
					systemAPI.alert(data);
			}
			if (sender == this.bSelect) {
				for (var i = 0; i < this.sg.getRowCount(); i++) {
					if (this.sg.cells(0, i).toLowerCase() == "true") 
						this.sg.cells(0, i, "False");
					else 
						this.sg.cells(0, i, "True");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		var data = this.dbLib.getDataProvider("select nama from sms_draft where kode_lokasi = '"+this.app._lokasi+"' ",true);
		if (typeof data != "string") {
			if (data.rs.rows[0] !== undefined)
				this.e1.setText(data.rs.rows[0].nama);
			else this.e1.setText("");
			
		}
	}
});