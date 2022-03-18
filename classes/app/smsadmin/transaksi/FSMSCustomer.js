/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_smsadmin_transaksi_fSMSCustomer = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_transaksi_fSMSCustomer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_smsadmin_transaksi_fSMSCustomer";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","SMS Customer", 7);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL;util_standar;server_sms_sms");
		this.e01 = new portalui_saiCBBL(this);
		this.e01.setLeft(20);
		this.e01.setTop(10);
		this.e01.setWidth(220);
		this.e01.setCaption("Customer Group");
		this.e01.setText("");
		this.e01.setName("e0");
		this.e01.setReadOnly(false);			
		this.e01.onBtnClick.set(this, "FindBtnClick");
		this.e01.setLabelWidth(100)
		this.e01.setRightLabelVisible(true);
		this.e01.setRightLabelCaption(" ");
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(220);
		this.e0.setCaption("Customer");
		this.e0.setText("");
		this.e0.setName("e0");
		this.e0.setReadOnly(false);		
		this.e0.onChange.set(this, "doEditChange");		
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100)
		this.e0.setRightLabelVisible(true);
		this.e0.setRightLabelCaption(" ");
		
		this.e2 = new portalui_saiLabelEdit(this);
		this.e2.setLeft(20);
		this.e2.setTop(31);
		this.e2.setWidth(220);
		this.e2.setCaption("Date");
		this.e2.setText("");		
		this.e2.setReadOnly(true);
		
		this.e3 = new portalui_saiCBBL(this);
		this.e3.setLeft(20);
		this.e3.setTop(33);
		this.e3.setWidth(220);
		this.e3.setCaption("Draft");
		this.e3.setText("");
		this.e3.setName("e3");
		this.e3.setReadOnly(false);		
		this.e3.onBtnClick.set(this, "FindBtnClick");
		this.e3.setLabelWidth(100)
		this.e3.setRightLabelVisible(false);
		this.e3.setRightLabelCaption(" ");
		
		uses("portalui_saiMemo");
		this.e1 = new portalui_saiMemo(this);
		this.e1.setLeft(20);
		this.e1.setTop(23);
		this.e1.setWidth(500);
		this.e1.setHeight(200);
		this.e1.setCaption("Message");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		this.e1.setName("e1");			
				
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{			
			this.dbLib = new util_dbLib();
			////this.dbLib = new util_dbTools(window.system.serverApp, this.app.dbSetting);
			this.dbLib.addListener(this);		
			this.standarLib = new util_standar();			
			this.sms = new server_sms_sms();
			this.sms.addListener(this);
			this.t = new portalui_timer(this);
			this.t.setInterval(1000);
			this.t.onTimer.set(this,"doTimer");
			this.t.setEnabled(true);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_smsadmin_transaksi_fSMSCustomer.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_smsadmin_transaksi_fSMSCustomer.prototype.mainButtonClick = function(sender)
{

	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}else
	if (sender == this.app._mainForm.bSend)
	{
		var dtCust = this.dbLib.getDataProvider("select no_telp from sms_cust a "+
			"	where a.kode_cust = '"+this.e0.getText()+"' ");
		try{
			dtCust = eval('('+dtCust+')');
			var noTelp = "";
			for (var i in dtCust.rs.rows) noTelp += (i > 0 ? ";" :"") + dtCust.rs.rows[i].no_telp; 									
			if (noTelp != "")
				this.sms.sendToMany(noTelp,this.e1.getText());				
		}catch(e){			
		}
	}
};
window.app_smsadmin_transaksi_fSMSCustomer.prototype.doModalResult = function(event, modalResult)
{
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
};

window.app_smsadmin_transaksi_fSMSCustomer.prototype.keyPress = function(sender, charCode, buttonState )
{
//	setTipeButton(tbSimpan);
};
window.app_smsadmin_transaksi_fSMSCustomer.prototype.doEditChange = function(sender)
{	
		var dtCust = this.dbLib.getDataProvider("select no_telp from sms_cust a "+
			"	where a.kode_cust = '"+this.e0.getText()+"' ");		
		dtCust = eval('('+dtCust+')');			
		this.e0.setHint(dtCust.rs.rows[0].no_telp); 		
		this.setShowHint(true);
};
												  
window.app_smsadmin_transaksi_fSMSCustomer.prototype.EditExit = function(sender)
{

		
};
window.app_smsadmin_transaksi_fSMSCustomer.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData2(this, "Data Customer",this.e0,undefined, 
										  "select kode_cust, nama, no_telp from sms_cust where kode_lokasi = '"+this.app._lokasi+"'  and kode_klpcust in ('"+this.e01.getText()+"')",
										  "select count(*) from sms_cust where kode_lokasi = '"+this.app._lokasi+"' and kode_klpcust in ('"+this.e01.getText()+"') ",
										  ["kode_cust","nama"],"and",["Kode Customer","Nama","No Telpon"]);
		else if (sender == this.e3)
			this.standarLib.showListData2(this, "Draft SMS",this.e3,this.e1, 
										  "select kode_draft, nama from sms_draft ",
										  "select count(*) from sms_draft",
										  ["kode_draft","nama"],"where",["Kode Draft","Nama"]);
		else this.standarLib.showListData2(this, "Data Customer Group",this.e01,undefined, 
										  "select kode_klpcust, nama from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"'  and tipe = 'Posting'",
										  "select count(*) from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'Posting'",
										  ["kode_klpcust","nama"],"and",["Kode Group","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};

window.app_smsadmin_transaksi_fSMSCustomer.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.sms)
	{
		switch	(methodName)
		{
			case "sendToMany" :
				if (result.toLowerCase().search("error") == -1){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ result+")");					
				}else this.app._mainForm.pesan(0, result); 
				break;
		}
	}
};
window.app_smsadmin_transaksi_fSMSCustomer.prototype.doTimer = function(sender)
{	
	this.e2.setText(new Date().toLocaleString());
};