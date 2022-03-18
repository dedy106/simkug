window.app_portal_transaksi_fInfo = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fInfo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fInfo";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Info : Input/Koreksi", 0);	
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Info");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(400);
		this.e1.setCaption("Judul");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(60);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tanggal");
		uses("portalui_datePicker",true);
		this.dp_Tgl = new portalui_datePicker(this);
		this.dp_Tgl.setTop(60);
		this.dp_Tgl.setLeft(120);
		this.dp_Tgl.setWidth(82);		
		
		this.eKeterangan = new portalui_saiLabelEdit(this);
		this.eKeterangan.setLeft(20);
		this.eKeterangan.setTop(85);
		this.eKeterangan.setWidth(400);
		this.eKeterangan.setCaption("Keterangan");
		this.eKeterangan.setText("");
		this.eKeterangan.setReadOnly(false);
		
		this.eFile = new portalui_saiCBBL(this);
		this.eFile.setLeft(20);
		this.eFile.setTop(110);
		this.eFile.setWidth(200);
		this.eFile.setCaption("File");
		this.eFile.setText("");
		this.eFile.onBtnClick.set(this,"FindBtnClick");
		this.eFile.setReadOnly(false);
		
		this.eDokFile = new portalui_saiCBBL(this);
		this.eDokFile.setLeft(20);
		this.eDokFile.setTop(135);
		this.eDokFile.setWidth(200);
		this.eDokFile.setCaption("Dokumen File");
		this.eDokFile.setText("");
		this.eDokFile.onBtnClick.set(this,"FindBtnClick");
		this.eDokFile.setReadOnly(false);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar",true);
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_transaksi_fInfo]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fInfo.extend(window.portalui_childForm);
window.app_portal_transaksi_fInfo.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fInfo.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_info (kode_info, judul, tanggal, keterangan, nik_user, tgl_input, kode_file, no_dok_file) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.dp_Tgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.eFile.getText()+"','"+this.eDokFile.getText()+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("update portal_info set  "+
						"	judul = '"+this.e1.getText()+"', "+
						" 	tanggal = '"+this.dp_Tgl.getDateString()+"', "+	
						"	keterangan = '"+this.eKeterangan.getText()+"', "+
						"   kode_file = '"+this.eFile.getText()+"', "+
						" 	no_dok_file = '"+this.eDokFile.getText()+"' "+
						"	where kode_info = '"+this.e0.getText()+"' ");
				this.dbLib.execArraySQL(sql);
			}
		break;
		case "hapus" :
		    if (modalResult == mrOk)
		    {			  
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_info where kode_info='"+this.e0.getText()+"'");
				this.dbLib.execArraySQL(sql);
		    }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fInfo.prototype.keyPress = function(sender, charCode, buttonState)
{
};
window.app_portal_transaksi_fInfo.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.tanggal,a.judul,a.keterangan,a.kode_file,b.nama as nmfile,a.no_dok_file,c.nama as nmdok from portal_info a inner join portal_file b on a.kode_file=b.no_file inner join portal_dokumen c on a.no_dok_file=c.no_dok_file where a.kode_info = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("judul"));
					this.dp_Tgl.setDateString(data.get("tanggal"));
					this.eKeterangan.setText(data.get("keterangan"));
					this.eFile.setText(data.get("kode_file"));
					this.eFile.setRightLabelCaption(data.get("nmfile"));
					this.eDokFile.setText(data.get("no_dok_file"));
					this.eDokFile.setRightLabelCaption(data.get("nmdok"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fInfo.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Info",sender,this.e1, 
										  "select kode_info, judul from portal_info","select count(*) from portal_info",
										  ["kode_info","nama"],"where",["Kode Info","Judul"]);
		if (sender == this.eFile)
			this.standarLib.showListData(this, "Data File",sender,undefined, 
										  "select no_file, nama from portal_file","select count(*) from portal_file",
										  ["no_file","nama"],"where", ["Kode File","Nama"]);
		if (sender == this.eDokFile)
			this.standarLib.showListData(this, "Data Dokumen File",sender,undefined, 
										"select no_dok_file, nama from portal_dokumen","select count(*) from portal_dokumen",
										["no_dok_file","nama"],"where", ["No Dokumen File","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fInfo.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};