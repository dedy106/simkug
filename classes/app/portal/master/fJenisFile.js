/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_portal_master_fJenisFile = function(owner)
{
	if (owner)
	{
		window.app_portal_master_fJenisFile.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fJenisFile";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		uses("portalui_saiCBBL");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(10);
		this.e0.setTop(20);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode");
		this.e0.setText("");
		this.e0.setName("e0");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		this.e0.setTag("1");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(10);
		this.e1.setTop(45);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		this.e1.setName("e1");
		this.e1.setTag("1");
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			//this.dbLib.listData("select Kode_form, nama_form from m_form",0,0);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis File : Input/Koreksi", 0);	
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_portal_master_fJenisFile.extend(window.portalui_childForm);
window.app_portal_master_fJenisFile.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}else
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}else
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}else
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_portal_master_fJenisFile.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{				
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);
			}
		break;
		case "simpan" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into portal_jenis_file(kode_jenis, nama,kode_lokasi) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.app._lokasi+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("update portal_jenis_file set nama = '"+this.e1.getText()+"' where kode_jenis = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
		   {
			    try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from  portal_jenis_file where kode_jenis = '"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
		   }
			break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fJenisFile.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_master_fJenisFile.prototype.doEditChange = function(sender)
{
	setTipeButton(tbSimpan);
	if (this.e0.getText() != "")
	{		
		try
		{
			var data = this.dbLib.runSQL("select nama from portal_jenis_file where kode_jenis = '"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					this.e1.setText(data.get(0).get("nama"));
					setTipeButton(tbUbahHapus);
				}else {
					this.e1.setText("");					
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fJenisFile.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		this.standarLib.showListData(this, "Data Jenis File",this.e0,this.e1, 
										  "select kode_jenis, nama from portal_jenis_file where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_jenis_file where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_jenis","nama"],"where", ["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fJenisFile.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
				{
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					this.app._mainForm.bClear.click();
				}else this.app._mainForm.pesan(0, result); 
				break;
		}
	}
};