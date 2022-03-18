//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_kopeg_fUserPwd = function(owner)
{
	if (owner)
	{
		window.app_kopeg_fUserPwd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_fUserPwd";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Change User Password", 0);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(200);
		this.e0.setCaption("User Id");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100)
		this.e0.setRightLabelVisible(true);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(55);
		this.e1.setWidth(400);
		this.e1.setCaption("Old Password");
		this.e1.setPassword(true);
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.e2 = new portalui_saiLabelEdit(this);
		this.e2.setLeft(20);
		this.e2.setTop(75);
		this.e2.setWidth(400);
		this.e2.setCaption("New Password");
		this.e2.setPassword(true);
		this.e2.setText("");
		this.e2.setReadOnly(false);
		
		this.e3 = new portalui_saiLabelEdit(this);
		this.e3.setLeft(20);
		this.e3.setTop(95);
		this.e3.setWidth(400);
		this.e3.setCaption("Confirm Password");
		this.e3.setPassword(true);
		this.e3.setText("");
		this.e3.setReadOnly(false);
		
		
		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_kopeg_fUserPwd.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_kopeg_fUserPwd.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","<font color=#ffffff>form inputan ini akan dibersihkan.</font>");
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","<font color=#ffffff>data diform ini apa sudah benar.</font>");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","<font color=#ffffff>perubahan data diform ini akan disimpan.</font>");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","<font color=#ffffff>data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.</font>");	
};
window.app_kopeg_fUserPwd.prototype.doModalResult = function(event, modalResult){
	if (sender == this.dbLib){
		try{
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
						this.standarLib.clearByTag(this, new Array("0"),this.e0);										
					break;
				case "simpan" :
					//if (modalResult == mrOk){}
					break;
				case "ubah" :
					if (modalResult == mrOk){
						var error = false;
						var pass = this.dbLib.getData("hakakses",["nik","pass"], [this.e0.getText(), this.e1.getText()],"pass");
						if ((pass == "")|| (pass == undefined))	
						{
							this.app._mainForm.pesan(0,"invalid old password");
							return false;
						}	
						if (this.e2.getText() != this.e3.getText())
						{
							this.app._mainForm.pesan(0,"password and confirm password are not equal");
							return false;
						}
						if (!error)
						{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();
							sql.add("update hakakses set pass = '"+this.e2.getText()+"' where nik = '"+this.e0.getText()+"'");
							this.dbLib.execArraySQL(sql);		
						}
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
				   }
					break;
			}
			this.e0.setFocus();
		}catch(e){
			alert("[UserPwd]::doModalResult:"+e);
		}
	}
};
window.app_kopeg_fUserPwd.prototype.keyPress = function(sender, charCode, buttonState ){
//	setTipeButton(tbSimpan);
};
window.app_kopeg_fUserPwd.prototype.doEditChange = function(sender){
};											  
window.app_kopeg_fUserPwd.prototype.EditExit = function(sender){
};
window.app_kopeg_fUserPwd.prototype.FindBtnClick = function(sender, event){
	try{
		this.standarLib.showListData(this, "Data User",this.e0,undefined, 
										  "select nik, nama from hakakses","select count(*) from hakakses",
										  ["nik","nama"],"where",["NIK","Nama"]);
	}catch(e){
		alert(e);
	}
};
window.app_kopeg_fUserPwd.prototype.doRequestReady = function(sender, methodName, result){
	switch	(methodName){
		case "execArraySQL" :
			system.info(this,"Server Message",result);
			break;
	}
};