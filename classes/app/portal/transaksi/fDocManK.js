/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_portal_transaksi_fDocManK = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fDocManK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fDocManK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.onClose.set(this,"doClose");
		this.itemsValue = new portalui_arrayList();
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(1);
		this.e0.setWidth(240);
		this.e0.setCaption("No Dok File");
		this.e0.setText("");
		this.e0.setName("e0");
		this.e0.setReadOnly(true);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption("");
		this.e0.setTag("1");
		
		this.e01 = new portalui_saiCBBL(this);
		this.e01.setLeft(20);
		this.e01.setTop(2);
		this.e01.setWidth(240);
		this.e01.setCaption("Jenis File");
		this.e01.onBtnClick.set(this, "FindBtnClick");
		this.e01.setText("");
		this.e01.setReadOnly(true);
		this.e01.setName("e01");
		this.e01.setTag("1");
		
		this.e02 = new portalui_saiCBBL(this);
		this.e02.setLeft(20);
		this.e02.setTop(3);
		this.e02.setWidth(260);
		this.e02.setCaption("File");
		this.e02.setText("");
		this.e02.setReadOnly(true);
		this.e02.setName("e02");			
		this.e02.setBtnVisible(false);
		this.e02.setTag("1");
		
		uses("portalui_uploader",true);
		this.uploader = new portalui_uploader(this);
		this.uploader.setLeft(265);
		this.uploader.setTop(3);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("data");
		this.uploader.setParam1(this.app._userLog);
		this.uploader.setAutoSubmit(true);
		this.uploader.onChange.set(this,"doFileChange");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(4);
		this.e1.setWidth(600);
		this.e1.setCaption("Keterangan");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		this.e1.setName("e1");
		this.e1.setTag("1");
		
		this.l2 = new portalui_label(this);
		this.l2.setTop(5);
		this.l2.setLeft(20);
		this.l2.setWidth(100);
		this.l2.setHeight(20);
		this.l2.setUnderLine(true);
		this.l2.setCaption("Tanggal");		
		uses("portalui_datePicker",true);
		this.e2 = new portalui_datePicker(this);
		this.e2.setLeft(120);
		this.e2.setTop(5);
		this.e2.setWidth(82);						
		this.e2.setName("e2");			
		
		this.l3 = new portalui_label(this);
		this.l3.setTop(6);
		this.l3.setLeft(20);
		this.l3.setWidth(100);	
		this.l3.setUnderLine(true);
		this.l3.setCaption("Status App");
		this.l3.onClick.set(this, "doCheck");
		
		uses("portalui_checkBox",true);
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setLeft(120);
		this.cb1.setTop(6);
		this.cb1.setWidth(50);
		this.cb1.setCaption("");				
		this.cb1.setName("cb1");
		this.cb1.setTag("1");
		
		this.l4 = new portalui_label(this);
		this.l4.setTop(7);
		this.l4.setLeft(20);
		this.l4.setWidth(100);	
		this.l4.setUnderLine(true);
		this.l4.setCaption("Status View");
		this.l4.onClick.set(this, "doCheck");
		
		this.cb2 = new portalui_checkBox(this);
		this.cb2.setLeft(120);
		this.cb2.setTop(7);
		this.cb2.setWidth(50);
		this.cb2.setCaption("");				
		this.cb2.setName("cb2");	
		this.cb2.setTag("1");
		
		this.rearrangeChild(10,23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Document Manager : Koreksi", 0);
			uses("util_file",true);
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.cekFileChange=false;
			this.file = new util_file();
			this.file.addListener(this);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_portal_transaksi_fDocManK.extend(window.portalui_childForm);
window.app_portal_transaksi_fDocManK.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fDocManK.prototype.doModalResult = function(event, modalResult)
{
	this.event=event;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{				
				this.standarLib.clearByTag(this, new Array("0","1"), this.e0);
				this.cb1.setSelected(false);
				this.cb2.setSelected(false);
				this.filename = "";
				this.tmpFile = "";
			}
		break;
		case "ubah" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					if (this.cekFileChange){
						sql.add("update portal_file set nama = '"+this.filename+"' "+
							"	, tanggal='"+(new Date).sqlDateStr(this.tgl)+"' "+
							"	, folder='"+this.folder+"' "+
							"	, tipe='"+this.tipe+"' "+
							"	, size='"+this.size+"' "+
							"	, ext='"+this.ext+"' "+							
							"where no_file = '"+this.noFile+"' ");
					}
					sql.add("update portal_dokumen set kode_jenis = '"+this.e01.getText()+"' "+
							" 	, no_file = '"+this.noFile+"' "+
							" 	, nama = '"+this.e02.getText()+"' "+
							"	, keterangan = '"+this.e1.getText()+"' "+
							"	, tanggal='"+this.e2.getDateString()+"' "+
							"	, nik_user='"+this.app._userLog+"' "+
							"	, status_app='"+(this.cb1.selected ? '1':'0')+"' "+
							"	, status_view='"+(this.cb2.selected ? '1':'0')+"' "+
							"where no_dok_file = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);
					this.saveData = true;
					this.cekFileChange=false;
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
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from  portal_dokumen where no_dok_file = '"+this.e0.getText()+"' ");
					sql.add("delete from  portal_file where no_file = '"+this.noFile+"' ");
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
window.app_portal_transaksi_fDocManK.prototype.doEditChange = function(sender)
{
	this.filename = "";
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select a.*, b.nama as nmjenis from portal_dokumen a inner join portal_jenis_file b on b.kode_jenis = a.kode_jenis and a.kode_lokasi=b.kode_lokasi where a.no_dok_file = '"+this.e0.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					this.e01.setText(data.get(0).get("kode_jenis"));
					this.e01.setRightLabelCaption(data.get(0).get("nmjenis"));
					this.noFile=data.get(0).get("no_file");
					this.e02.setText(data.get(0).get("nama"));
					this.e1.setText(data.get(0).get("keterangan"));
					this.e2.setDateString(data.get(0).get("tanggal"));
					this.cb1.setSelected((data.get(0).get("status_app") == 1 ? true:false));
					this.cb2.setSelected((data.get(0).get("status_view") == 1 ? true:false));
					this.filename = data.get(0).get("nama");
					this.delOldFile=data.get(0).get("nama");
				}else this.e1.setText("");
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fDocManK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Dokumen",sender,this.e1, 
										  "select no_dok_file, keterangan from portal_dokumen ","select count(*) from portal_dokumen",
										  ["no_dok_file","keterangan"],"where", ["No Dok File","Keterangan"]);
		if (sender == this.e01)
			this.standarLib.showListData(this, "Data Jenis File",sender,undefined, 
										  "select kode_jenis, nama from portal_jenis_file ","select count(*) from portal_jenis_file",
										  ["kode_jenis","nama"],"where", ["Kode Jenis","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fDocManK.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					uses("util_file",true);
					if (this.event == "ubah"){
						if (this.filename !== this.delOldFile){
							this.deleteOldFile();
						}
						this.uploadFile();
					}else if (this.event == "hapus"){
						this.deleteOldFile();
						if (result){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						this.app._mainForm.bClear.click();
						}else system.alert(this,"Error transfer...","");
					}
				}
				else this.app._mainForm.pesan(0, result); 
				break;
		}
	}
	if (sender == this.file)
	{
		if (methodName == "copyFileTo")
		{
			if (result){
			this.delOldFile=this.e02.getText();
			this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
			this.app._mainForm.bClear.click();
			}else system.alert(this,"Error transfer...","");
		}
	}
};
window.app_portal_transaksi_fDocManK.prototype.doCheck = function(sender)
{
	if (sender == this.l3)
		this.cb1.setSelected(!this.cb1.selected);
	if (sender == this.l4)	
		this.cb2.setSelected(!this.cb2.selected);
};
window.app_portal_transaksi_fDocManK.prototype.doAfterLoad = function(sender, result, data)
{
	try{
		if (!result && this.saveData)
		{
			uses("server_util_arrayList",true);
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
window.app_portal_transaksi_fDocManK.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile !== ""){
			this.file = new util_file();								
			this.file.deleteFile(this.tmpFile);			
		}
		this.uploader.setParam2("");
		if (data){
			this.e02.setText(data.filename);
			this.filename=data.filename;
			this.folder=data.folder;
			this.tgl=data.tanggal;
			this.tipe=data.tipe;
			this.size=data.size;
			this.ext=data.ext;
			this.tmpFile = data.tmpfile;
		}else throw(data);
		this.cekFileChange=true;
	}catch(e){
		alert(e);
	}
};
window.app_portal_transaksi_fDocManK.prototype.deleteOldFile = function(sender)
{					
	var rootDir = this.file.getRootDir();										
	var separator = rootDir.charAt(rootDir.length-1);						
	this.file.deleteFile(rootDir +"media" +separator+this.delOldFile);
};
window.app_portal_transaksi_fDocManK.prototype.uploadFile = function(sender)
{
	if (this.tmpFile !== ""){
		var rootDir = this.file.getRootDir();
		var separator = rootDir.charAt(rootDir.length-1);
		this.file.copyFileTo(this.tmpFile,rootDir +this.folder +separator+this.filename,true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};
window.app_portal_transaksi_fDocManK.prototype.doClose = function(sender)
{
	if (this.tmpFile !== ""){								
		this.file.deleteFile(this.tmpFile);
	}
};