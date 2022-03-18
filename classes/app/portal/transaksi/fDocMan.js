/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_portal_transaksi_fDocMan = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fDocMan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fDocMan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.onClose.set(this,"doClose");
		this.itemsValue = new portalui_arrayList();
		
		this.ed_periode = new portalui_saiLabelEdit(this);
		this.ed_periode.setLeft(20);
		this.ed_periode.setTop(1);
		this.ed_periode.setWidth(182);
		this.ed_periode.setCaption("Periode");		
		this.ed_periode.setReadOnly(true);
		this.ed_periode.setTag("9");
		
		this.l2 = new portalui_label(this);
		this.l2.setTop(2);
		this.l2.setLeft(20);
		this.l2.setWidth(100);	
		this.l2.setHeight(20);
		this.l2.setUnderLine(true);
		this.l2.setCaption("Tanggal");		
		uses("portalui_datePicker");
		this.e2 = new portalui_datePicker(this);
		this.e2.setLeft(120);
		this.e2.setTop(2);
		this.e2.setWidth(82);
		
		uses("portalui_saiCBBL");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(3);
		this.e0.setWidth(260);
		this.e0.setCaption("No. Dok File");		
		this.e0.setReadOnly(true);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(265);
		this.bGen.setTop(3);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		this.e01 = new portalui_saiCBBL(this);
		this.e01.setLeft(20);
		this.e01.setTop(4);
		this.e01.setWidth(240);
		this.e01.setCaption("Jenis File");
		this.e01.onBtnClick.set(this, "FindBtnClick");
		this.e01.setText("");
		this.e01.setReadOnly(true);
		this.e01.setName("e01");
		this.e01.setTag("1");
		
		this.e02 = new portalui_saiCBBL(this);
		this.e02.setLeft(20);
		this.e02.setTop(5);
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
		this.uploader.setTop(5);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("data");
		this.uploader.setParam3("object");
		this.uploader.setParam1(this.app._userLog);
		this.uploader.setAutoSubmit(true);
		this.uploader.onChange.set(this,"doFileChange");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(6);
		this.e1.setWidth(600);
		this.e1.setCaption("Keterangan");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		this.e1.setName("e1");
		this.e1.setTag("1");
		
		this.l3 = new portalui_label(this);
		this.l3.setTop(7);
		this.l3.setLeft(20);
		this.l3.setWidth(100);	
		this.l3.setUnderLine(true);
		this.l3.setCaption("Status App");
		this.l3.onClick.set(this, "doCheck");
		
		uses("portalui_checkBox");
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setLeft(120);
		this.cb1.setTop(7);
		this.cb1.setWidth(50);
		this.cb1.setCaption("");				
		this.cb1.setName("cb1");
		this.cb1.setTag("1");
		
		this.l4 = new portalui_label(this);
		this.l4.setTop(8);
		this.l4.setLeft(20);
		this.l4.setWidth(100);	
		this.l4.setUnderLine(true);
		this.l4.setCaption("Status View");
		this.l4.onClick.set(this, "doCheck");
		
		this.cb2 = new portalui_checkBox(this);
		this.cb2.setLeft(120);
		this.cb2.setTop(8);
		this.cb2.setWidth(50);
		this.cb2.setCaption("");				
		this.cb2.setName("cb2");	
		this.cb2.setTag("1");
		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.e2.onSelect.set(this, "doSelect");
		this.doSelect(this.e2,this.e2.year,this.e2.month,this.e2.day);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Document Manager : Input", 0);
			uses("util_file",true);
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
window.app_portal_transaksi_fDocMan.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_portal_transaksi_fDocMan.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_transaksi_fDocMan.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fDocMan.prototype.doModalResult = function(event, modalResult)
{
	this.event = event;
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
		case "simpan" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					var idFile = this.standarLib.noBuktiOtomatis(this.dbLib, "portal_file", "no_file", this.ed_periode.getText(),"000000000000");
					sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext,kode_lokasi) values "+
							" ('"+idFile+"','"+this.filename+"','"+(new Date).sqlDateStr(this.tgl)+"','"+this.folder+"','"+this.tipe+
								"','"+this.size+"','"+this.ext+"','"+this.app._lokasi+"') ");
					sql.add("insert into portal_dokumen(no_dok_file, kode_jenis, no_file, nama, keterangan,tanggal,nik_user, status_app, status_view,kode_lokasi) values "+
							" ('"+this.e0.getText()+"','"+this.e01.getText()+"','"+idFile+"','"+this.e02.getText()+"','"+this.e1.getText()+"' "+
								",'"+this.e2.getDateString()+"','"+this.app._userLog+"','"+(this.cb1.selected ? '1':'0')+"','"+(this.cb2.selected ? '1':'0')+"','"+this.app._lokasi+"') ");
					this.dbLib.execArraySQL(sql);
					this.saveData = true;
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
window.app_portal_transaksi_fDocMan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e01)
			this.standarLib.showListData(this, "Data Jenis File",sender,undefined, 
										  "select kode_jenis, nama from portal_jenis_file where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_jenis_file where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_jenis","nama"],"where", ["Kode Jenis","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fDocMan.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					uses("util_file",true);
					if  (this.event == "simpan"){
						this.uploadFile();
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
			this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
			this.app._mainForm.bClear.click();
			}else system.alert(this,"Error transfer...","");
		}
	}
};
window.app_portal_transaksi_fDocMan.prototype.doGen = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_dokumen", "no_dok_file",this.ed_periode.getText(),"000000000000"));	
};
window.app_portal_transaksi_fDocMan.prototype.doCheck = function(sender)
{
	if (sender == this.l3)
		this.cb1.setSelected(!this.cb1.selected);
	if (sender == this.l4)	
		this.cb2.setSelected(!this.cb2.selected);
};
window.app_portal_transaksi_fDocMan.prototype.doAfterLoad = function(sender, result, data)
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
window.app_portal_transaksi_fDocMan.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile !== ""){
			this.file = new util_file();								
			this.file.deleteFile(this.tmpFile);			
		}
		this.uploader.setParam2("");
        eval("data = "+urldecode(data));    
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
	}catch(e){
		alert("doFileChange: "+ e);
	}
};
window.app_portal_transaksi_fDocMan.prototype.uploadFile = function(sender)
{
	if (this.tmpFile !== ""){
		var rootDir = this.file.getRootDir();
		var separator = rootDir.charAt(rootDir.length-1);
		this.file.copyFileTo(this.tmpFile,rootDir +this.folder +separator+this.filename,true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};
window.app_portal_transaksi_fDocMan.prototype.doClose = function(sender)
{
	if (this.tmpFile !== ""){								
		this.file.deleteFile(this.tmpFile);
	}
};
