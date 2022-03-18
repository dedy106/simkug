window.app_portal_transaksi_fKirimPesan = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fKirimPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fKirimPesan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.onClose.set(this,"doClose");
		
		uses("portalui_saiCBBL",true);
		uses("portalui_uploader",true);
		uses("server_util_mail",true);
		this.mail = new server_util_mail();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kirim Pesan",0);	
		this.kpd = new portalui_saiCBBL(this);
		this.kpd.setLeft(20);
		this.kpd.setTop(10);
		this.kpd.setWidth(250);
		this.kpd.setCaption("Kepada");		
		this.kpd.setReadOnly(false);
		this.kpd.onBtnClick.set(this, "FindBtnClick");		
		this.kpd.setRightLabelVisible(true);
		this.subjek = new portalui_saiLabelEdit(this);
		this.subjek.setLeft(20);
		this.subjek.setTop(32);
		this.subjek.setWidth(620);
		this.subjek.setCaption("Subyek");
		this.subjek.setReadOnly(false);
		this.subjek.setLength(100);
		this.attfile = new portalui_saiLabelEdit(this);
		this.attfile.setLeft(20);
		this.attfile.setTop(54);
		this.attfile.setWidth(200);
		this.attfile.setCaption("File Attachment");
		this.attfile.setReadOnly(false);
		this.attfile.setText("-");
		this.attach = new portalui_uploader(this);
		this.attach.setLeft(230);
		this.attach.setTop(54);
		this.attach.setWidth(80);
		this.attach.setHeight(20);		
		this.attach.onAfterUpload.set(this,"doAfterLoad");
		this.attach.setParam4("data");
		this.attach.setParam1(this.app._userLog);
		this.attach.setAutoSubmit(true);
		this.attach.onChange.set(this,"doFileChange");
		/*this.pesan = new portalui_saiMemo(this);
		this.pesan.setTop(77);
		this.pesan.setLeft(20);
		this.pesan.setWidth(620);
		this.pesan.setHeight(277);
		this.pesan.setCaption("Pesan");*/
		
		this.pPesan = new portalui_panel(this);
		this.pPesan.setTop(77);
		this.pPesan.setLeft(20);
		this.pPesan.setWidth(555);
		this.pPesan.setHeight(300);
		this.pPesan.setBorder(3);
		this.pPesan.setCaption("Pesan");
			uses("portalui_richTextArea",true);
			this.mPesan = new portalui_richTextArea(this.pPesan);
			this.mPesan.setTop(20);
			this.mPesan.setLeft(0);
			this.mPesan.setWidth(553);
			this.mPesan.setHeight(278);
			this.mPesan.display();
		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			uses("util_file");
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.file = new util_file();
			this.file.addListener(this);
		}catch(e)
		{
			alert("[app_portal_transaksi_fKirimPesan]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fKirimPesan.extend(window.portalui_childForm);
window.app_portal_transaksi_fKirimPesan.prototype.getPeriodeNow = function()
{
	if ((new Date).getBln()<10)
		var bln="0"+(new Date).getBln();
	return ((new Date).getFullYear().toString()+bln);
};
window.app_portal_transaksi_fKirimPesan.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_portal_transaksi_fKirimPesan.prototype.doModalResult = function(event, modalResult)
{
	this.event = event;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.kpd);
				this.filename = "";
				this.tmpFile = "";	
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pesan", "no_pesan", "PSN/"+this.getPeriodeNow()+"/","0000");
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("insert into portal_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
							"('"+id+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','admin','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.mPesan.getText(2)+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getPeriodeNow()+"','"+this.app._userLog+"','SALES') ");
					
					var data = this.dbLib.runSQL("select a.* from (select kode_sales,nama,email from portal_sales union select kode_cust,nama,email from portal_cust) a where a.kode_sales='"+this.kpd.getText()+"' order by a.nama ");
					if (data instanceof portalui_arrayMap){
						if (data.get(0) != undefined){
							data = data.get(0);
							var kepada=data.get("email");
						}
					}else throw(data);
					this.mail.send("admin@roojax.com",kepada,this.subjek.getText(),this.mPesan.getText(2));
					this.dbLib.execArraySQL(sql);
					this.attfile.setText("-");
					this.saveData = true;
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
	}
	this.kpd.setFocus();
};
window.app_portal_transaksi_fKirimPesan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.kpd)
			this.standarLib.showListData(this, "Data Sales",sender,undefined,
										  "select * from (select kode_sales,nama,'Sales' from portal_sales union select kode_cust,nama,'Customer' from portal_cust ) a ",
										  "select (select count(*) from portal_sales)+(select count(*) from portal_cust) ",
										  ["kode_sales","nama"],"where",["Kode","Nama","Status"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fKirimPesan.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :    				
    				step="info";
					if (result.toLowerCase().search("error") == -1)					
		            {
						uses("util_file");
						if (this.event == "simpan")
						{
							this.uploadFile();
							this.app._mainForm.pesan(2,"process completed ("+ this.kpd.getText()+")");
							this.app._mainForm.bClear.click();
						}
		            }else this.app._mainForm.pesan(0, result);
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
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
window.app_portal_transaksi_fKirimPesan.prototype.doAfterLoad = function(sender, result, data)
{
	try{
		if (!result && this.saveData)
		{
			//uses("server_util_arrayList");
			//sql = new server_util_arrayList();
			//sql.add("delete from portal_file where no_file = '"+this.e0.getText()+"' ");
			//this.dbLib.execArraySQL(sql);
			this.saveData = false;
		}else if (this.saveData){
			this.saveData = false;
		}
	}catch(e)
	{
		alert("doAfterLoad: "+e);
	}
};
window.app_portal_transaksi_fKirimPesan.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile != ""){
			this.file = new util_file();								
			this.file.deleteFile(this.tmpFile);			
		}
		sender.setParam2("");
		if (data instanceof portalui_arrayMap){
			this.attfile.setText(data.filename);
			this.namaFile=data.filename;
			this.Folder=data.folder;
			this.tmpFile = data.tmpfile;
		}else throw(data);
	}catch(e){
		alert(e);
	}
};
window.app_portal_transaksi_fKirimPesan.prototype.uploadFile = function(sender)
{
	if (this.tmpFile != ""){
		var rootDir = this.file.getRootDir();
		var separator = rootDir.charAt(rootDir.length-1);
		this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};
window.app_portal_transaksi_fKirimPesan.prototype.doClose = function(sender)
{
	if (this.tmpFile != ""){								
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};