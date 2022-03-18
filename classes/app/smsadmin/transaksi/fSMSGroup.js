/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_smsadmin_transaksi_fSMSGroup = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_transaksi_fSMSGroup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_smsadmin_transaksi_fSMSGroup";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","SMS by Group", 7);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL");
		this.e3 = new portalui_saiCBBL(this);
		this.e3.setLeft(20);
		this.e3.setTop(10);
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
		this.e1.setTop(33);		
		this.e1.setWidth(595);
		this.e1.setHeight(100);
		this.e1.setCaption("Message");
		this.e1.setText("");		
		this.e1.setReadOnly(false);
		this.e1.setName("e1");			
		
		uses("portalui_saiGrid");
		this.sg = new portalui_saiGrid(this);
		this.sg.setTop(140);
		this.sg.setLeft(20);
		this.sg.setHeight(200);
		this.sg.setWidth(595);
		this.sg.setColCount(2);
		this.sg.setColTitle(["Group","Nama Group"]);
		this.sg.setColWidth([0,1],[150,400]);		
		this.sg.columns.get(0).setButtonStyle(bsEllips);		
		this.sg.setReadOnly(true);
		this.sg.onEllipsClick.set(this,"doEllipse");
		
		this.sgn = new portalui_sgNavigator(this);
		this.sgn.setTop(340);
		this.sgn.setLeft(20);
		this.sgn.setWidth(595);
		this.sgn.setGrid(this.sg);
		this.sgn.setButtonStyle(1);
		this.maximize();		
		this.setTabChildIndex();
		//this.rearrangeChild(10,23);
		try
		{
			uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);
			////this.dbLib = new util_dbTools(window.system.serverApp, this.app.dbSetting);
			this.dbLib.addListener(this);
//			this.dbLib.listData("select Kode_form, nama_form from m_form",0,0);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("server_sms_sms");
			this.sms = new server_sms_sms();
			this.sms.addListener(this);		
			this.sg.clear(1);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_smsadmin_transaksi_fSMSGroup.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_smsadmin_transaksi_fSMSGroup.prototype.mainButtonClick = function(sender)
{

	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}else
	if (sender == this.app._mainForm.bSend)
	{
		var klpCust = [];
		for (var i=0; i < this.sg.rows.getLength();i++){
			klpCust[klpCust.length] = "'"+this.sg.cells(0,i)+"'";
		}		
		var dtCust = this.dbLib.getDataProvider("select no_telp from sms_cust a "+
			"	where a.kode_klpcust in ("+klpCust+")");
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
window.app_smsadmin_transaksi_fSMSGroup.prototype.doModalResult = function(event, modalResult)
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

window.app_smsadmin_transaksi_fSMSGroup.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		this.standarLib.showListData2(this, "Draft SMS",this.e3,this.e1, 
										  "select kode_draft, nama from sms_draft ",
										  "select count(*) from sms_draft",
										  ["kode_draft","nama"],"where",["Kode Draft","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_smsadmin_transaksi_fSMSGroup.prototype.doEllipse = function(sender,col, row)
{
	this.standarLib.showListDataForSG(this,"Data Customer Group",this.sg,this.sg.row, 0,
			"select kode_klpcust, nama from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"'  and tipe = 'posting'",
			  "select count(*) from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",
			  ["kode_klpcust","nama"],"and",["Kode Group","Nama"]);
};

window.app_smsadmin_transaksi_fSMSGroup.prototype.doRequestReady = function(sender, methodName, result)
{	
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
						this.sg.appendData(["FALSE",line.kode_klpcust, line.nama]);
					}
				}catch(e){
					
				}
				break;
		}
	}
};