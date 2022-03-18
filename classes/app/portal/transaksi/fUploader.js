/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_portal_transaksi_fUploader = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fUploader.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fUploader";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.onClose.set(this,"doClose");
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(240);
		this.e0.setCaption("No File");
		this.e0.setText("");
		this.e0.setName("e0");
		this.e0.setReadOnly(true);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this,"doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption("");
		this.e0.setTag("1");

		this.bGen = new portalui_button(this);
		this.bGen.setLeft(265);
		this.bGen.setTop(30);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		uses("portalui_uploader",true);
		this.uploader = new portalui_uploader(this);
		this.uploader.setLeft(345);
		this.uploader.setTop(30);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);		
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("data");
		this.uploader.setParam1(this.app._userLog);
		this.uploader.setAutoSubmit(true);
		this.uploader.onChange.set(this,"doFileChange");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(55);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(true);
		this.e1.setName("e1");
		this.e1.setTag("1");
		
		this.e2 = new portalui_saiLabelEdit(this);
		this.e2.setLeft(20);
		this.e2.setTop(78);
		this.e2.setWidth(250);
		this.e2.setCaption("Tanggal");
		this.e2.setText("");
		this.e2.setReadOnly(true);
		this.e2.setName("e2");
		this.e2.setTag("1");
		
		this.e3 = new portalui_saiLabelEdit(this);
		this.e3.setLeft(20);
		this.e3.setTop(101);
		this.e3.setWidth(250);
		this.e3.setCaption("Folder");
		this.e3.setText("");
		this.e3.setReadOnly(true);
		this.e3.setName("e3");
		this.e3.setTag("1");
		
		this.e4 = new portalui_saiLabelEdit(this);
		this.e4.setLeft(20);
		this.e4.setTop(124);
		this.e4.setWidth(250);
		this.e4.setCaption("Tipe");
		this.e4.setText("");
		this.e4.setReadOnly(true);
		this.e4.setName("e4");
		this.e4.setTag("1");
		
		this.e5 = new portalui_saiLabelEdit(this);
		this.e5.setLeft(20);
		this.e5.setTop(147);
		this.e5.setWidth(250);
		this.e5.setCaption("Size");
		this.e5.setText("");
		this.e5.setReadOnly(true);
		this.e5.setName("e5");
		this.e5.setTag("1");
		
		this.e6 = new portalui_saiLabelEdit(this);
		this.e6.setLeft(20);
		this.e6.setTop(170);
		this.e6.setWidth(250);
		this.e6.setCaption("Extension");
		this.e6.setText("");
		this.e6.setReadOnly(true);
		this.e6.setName("e6");
		this.e6.setTag("1");
		
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
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload File : Input/Koreksi", 0);	
			uses("util_file");
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.file = new util_file();
			this.file.addListener(this);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_portal_transaksi_fUploader.extend(window.portalui_childForm);
window.app_portal_transaksi_fUploader.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fUploader.prototype.doModalResult = function(event, modalResult)
{
	this.event = event;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{				
				this.standarLib.clearByTag(this, new Array("0","1"), this.e0);
				this.filename = "";
				this.tmpFile = "";				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext) values "+
							" ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+(new Date).sqlDateStr(this.e2.getText())+"','"+this.e3.getText()+"','"+this.e4.getText()+
								"','"+this.e5.getText()+"','"+this.e6.getText()+"') ");
					this.dbLib.execArraySQL(sql);						
					this.saveData = true;
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("update portal_file set nama = '"+this.e1.getText()+"' "+
							"	, tanggal='"+(new Date).sqlDateStr(this.e2.getText())+"' "+
							"	, folder='"+this.e3.getText()+"' "+
							"	, tipe='"+this.e4.getText()+"' "+
							"	, size='"+this.e5.getText()+"' "+
							"	, ext='"+this.e6.getText()+"' "+							
							"where no_file = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);						
					this.saveData = true;
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
		   {
			    try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("delete from  portal_file where no_file = '"+this.e0.getText()+"' ");
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
window.app_portal_transaksi_fUploader.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fUploader.prototype.doEditChange = function(sender)
{
	setTipeButton(tbSimpan);
	this.filename = "";
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select * from portal_file where no_file = '"+this.e0.getText()+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){				
					this.e1.setText(data.get(0).get("nama"));
					this.e2.setText((new Date).idFormat(data.get(0).get("tanggal")));
					this.e3.setText(data.get(0).get("folder"));
					this.e4.setText(data.get(0).get("tipe"));
					this.e5.setText(data.get(0).get("size"));
					this.e6.setText(data.get(0).get("ext"));
					setTipeButton(tbUbahHapus);	
					this.filename = data.get(0).get("nama");
				};
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fUploader.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		this.standarLib.showListData(this, "Data File",this.e0,undefined, 
										  "select no_file, nama from portal_file ","select count(*) from portal_file",
										  ["no_file","nama"],"where", ["No File","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fUploader.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					uses("util_file");
					if (this.event == "ubah"){
						if (this.filename != this.e1.getText()){
							this.deleteOldFile();
						}
						this.uploadFile();
					}else if (this.event == "hapus"){
						this.deleteOldFile();
						if (result){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						this.app._mainForm.bClear.click();
						}else system.alert(this,"Error transfer...","");
					}else if  (this.event == "simpan") {
						this.uploadFile();
					}
				}else this.app._mainForm.pesan(0, result); 
			break;
		}
	}
	if (sender == this.file)
	{
		if (methodName == "copyFileTo")
		{
			if (result){
			this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
			this.app._mainForm.bClear.click();
			}else system.alert(this,"Error transfer...","");
		}
	}
};
window.app_portal_transaksi_fUploader.prototype.doAfterLoad = function(sender, result, data)
{
	try{
		if (!result && this.saveData)
		{
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from portal_file where no_file = '"+this.e0.getText()+"' ");
			this.dbLib.execArraySQL(sql);
			this.saveData = false;
		}else if (this.saveData){
			this.saveData = false;
		}
	}catch(e)
	{
		alert("doAfterLoad: "+e);
	}
};
window.app_portal_transaksi_fUploader.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile != ""){
			this.file = new util_file();								
			this.file.deleteFile(this.tmpFile);			
		}
		this.uploader.setParam2("");
		eval("data = "+urldecode(data));
		if (data){
			this.e1.setText(data.filename);
			this.e2.setText(data.tanggal);
			this.e3.setText(data.folder);
			this.e4.setText(data.tipe);
			this.e5.setText(data.size);
			this.e6.setText(data.ext);
			this.tmpFile = data.tmpfile;
		}else throw(data);
	}catch(e){
		alert(e);
	}
};
window.app_portal_transaksi_fUploader.prototype.doGen = function(sender)
{
	if ((new Date).getBln()<10)
			var bln="0"+(new Date).getBln();
	var periode=(new Date).getFullYear().toString()+bln;
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_file", "no_file", periode,"000000000000"));	
};
window.app_portal_transaksi_fUploader.prototype.deleteOldFile = function(sender)
{					
	var rootDir = this.file.getRootDir();										
	var separator = rootDir.charAt(rootDir.length-1);						
	this.file.deleteFile(rootDir +this.e3.getText() +separator+this.filename);
};
window.app_portal_transaksi_fUploader.prototype.uploadFile = function(sender)
{
	if (this.tmpFile != ""){																				
		var rootDir = this.file.getRootDir();										
		var separator = rootDir.charAt(rootDir.length-1);						
		this.file.copyFileTo(this.tmpFile,rootDir +this.e3.getText() +separator+this.e1.getText(),true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";					
		
	}
};
window.app_portal_transaksi_fUploader.prototype.doClose = function(sender)
{
	if (this.tmpFile != ""){								
		this.file.deleteFile(this.tmpFile);
	}
};
