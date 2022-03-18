/**
 * @author dweexfuad
 */
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_saku_sms_transaksi_fSendMail = function(owner)
{
	if (owner)
	{
		window.app_saku_sms_transaksi_fSendMail.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sms_transaksi_fSendMail";
		this.setTop(60);
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kirim Slip Gaji via Email", 7);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL;portalui_saiMemo;portalui_saiGrid;server_util_mail;server_report_report;util_file");
		this.ePeriode = new portalui_saiCB(this,{bound:[20,9,220,20], caption:"Periode"});
		this.e3 = new portalui_saiLabelEdit(this,{bound:[20, 10, 220, 20], caption:"Subyek"});						
		this.e1 = new portalui_saiLabelEdit(this,{bound:[20, 11, 595, 20], caption:"Keterangan"});				
		this.bBrowse = new portalui_button(this, {bound:[20,12,80, 20], caption:"Generate", click:"doClick"});
		this.bSelect = new portalui_button(this, {bound:[120,12,80, 20], caption:"Select/De All", click:"doClick"});			
		this.sg = new portalui_saiGrid(this,{bound:[20, 14, 595, 200], colCount:5, colTitle:["Send","NPM","Nama","Email","Status"], 
			colWidth:[[4,3,2,1,0],[80,100,400,150,60]], buttonStyle:[[1],[bsEllips]], colFormat:[[0],[cfBoolean]], ellipsClick:[this,"doEllipse"]});				
		this.sgn = new portalui_sgNavigator(this,{bound:[20,13,595,25], grid:this.sg, buttonStyle:bsView});				
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{		
			this.dbLib = new util_dbLib(window.system.serverApp);		
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();			
			this.mail = new server_util_mail();
			this.mail.addListener(this);
			this.mail.setUser("admin@roojax.com","saisai","tls");
			this.mail.configSmtp("smtp.gmail.com",465);
			this.report = new server_report_report();
			this.report.addListener(this);					
			this.sg.clear(1);		
			this.nama_report = "server_report_gaji_rptHRSlip2";
			//this.eMail = this.dbLib.getDataProvider("select * from mail_cfg where kode_lokasi = '"+this.app._lokasi+"' ",true);
			this.dbLib.getDataProviderA("select distinct periode from gaji_m where kode_lokasi = '"+this.app._lokasi+"' ");
			this.file = new util_file();
			this.rootDir = this.file.getRootDir();			
			this.separator = "/";
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);
			//if (typeof this.eMail != "string" && this.eMail.rs.rows[0] != undefined){
			//	this.mail.setUser(this.eMail.rs.rows[0]);
			//}else {
						
			//}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sms_transaksi_fSendMail.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_sms_transaksi_fSendMail.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}else if (sender == this.app._mainForm.bSend){
			try{	
				this.dataSent = new portalui_arrayMap();			
				for (var i=0; i < this.sg.rows.getLength();i++){
					if (this.sg.cells(3, i) != "-" && this.sg.cells(0,i).toLowerCase() == "true" && this.dataGaji.get(this.sg.cells(1,i))) {						
						this.mail.send("admin@roojax.com", this.sg.cells(3,i), this.e3.getText(), this.e1.getText(),this.rootDir+"/server/tmp/"+this.sg.cells(1,i)+".html");//
						//this.dataSent.set(this.sg.cells(3,i),'False');
					}
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
	doRequestReady: function(sender, methodName, result){
		try {
			if (sender == this.dbLib) {
				switch (methodName) {
					case "getDataProvider":
						eval("result = " + result + ";");
						var data = [];
						if (typeof result != "string") {
							for (var i in result.rs.rows) {
								data.push(result.rs.rows[i].periode);
							}
							data = new portalui_arrayMap({
								items: data
							});
							this.ePeriode.setItem(data);
						}
						break;
				}
			}
			if (sender == this.report) {
				if (methodName == "getGroupHtml") {						
					this.dataGaji = result;					
				}
			}
			if (sender == this.mail){
				if (methodName == "sendMail") {
					systemAPI.alert(result);
					if (result != "Failed") {
						this.dataSent.set(result.substring(5), 'True');
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick: function(sender){
		try {
			if (sender == this.bBrowse) {
				var data = this.dbLib.getDataProvider("select nik, nama,email from karyawan where kode_lokasi = '" + this.app._lokasi + "' ", true);
				if (typeof data != "string") {
					//showLoading();
					var line, nik = [];
					this.sg.clear();
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];						
						this.sg.appendData(['False', line.nik, line.nama, line.email,'False']);
						nik.push("'"+line.nik+"'");
					}					
					this.report.getGroupHtml(this.nama_report,"where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.ePeriode.getText()+"' and  a.nik in ("+nik+" )","",this.app._lokasi, 'Tidak/'+this.ePeriode.getText());					
					//hideLoading();
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
	}
});