window.app_portal_master_fCust = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fCust.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fCust";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Customer : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Customer");		
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");		
		this.e0.setRightLabelVisible(false);		
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(32);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");		
		this.e1.setReadOnly(false);	
		
		this.eKlp = new portalui_saiCBBL(this);
		this.eKlp.setLeft(20);
		this.eKlp.setTop(54);
		this.eKlp.setWidth(200);
		this.eKlp.setCaption("Kelompok Customer");
		this.eKlp.setRightLabelVisible(true);
		this.eKlp.onBtnClick.set(this, "FindBtnClick");		
		
		this.ePwd = new portalui_saiLabelEdit(this);
		this.ePwd.setLeft(20);
		this.ePwd.setTop(76);
		this.ePwd.setWidth(250);
		this.ePwd.setCaption("Password");		
		
		this.eRPwd = new portalui_saiLabelEdit(this);
		this.eRPwd.setLeft(20);
		this.eRPwd.setTop(98);
		this.eRPwd.setWidth(250);
		this.eRPwd.setCaption("Retype Password");				
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(120);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(20);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tgl. Lahir");
		uses("portalui_datePicker",true);
		this.dp_lahir = new portalui_datePicker(this);
		this.dp_lahir.setTop(120);
		this.dp_lahir.setLeft(120);
		this.dp_lahir.setWidth(82);
		
		this.ePic = new portalui_saiLabelEdit(this);
		this.ePic.setTop(142);
		this.ePic.setLeft(20);
		this.ePic.setWidth(400);
		this.ePic.setCaption("PIC");
		
		this.eEmail = new portalui_saiLabelEdit(this);
		this.eEmail.setTop(164);
		this.eEmail.setLeft(20);
		this.eEmail.setWidth(350);
		this.eEmail.setCaption("Email");
		
		this.eNoTelp = new portalui_saiLabelEdit(this);
		this.eNoTelp.setTop(86);
		this.eNoTelp.setLeft(20);
		this.eNoTelp.setWidth(350);
		this.eNoTelp.setCaption("No Telp");
		
		this.eNoFax = new portalui_saiLabelEdit(this);
		this.eNoFax.setTop(208);
		this.eNoFax.setLeft(20);
		this.eNoFax.setWidth(350);
		this.eNoFax.setCaption("No Fax");
		
		this.eAlamat = new portalui_saiLabelEdit(this);
		this.eAlamat.setTop(230);
		this.eAlamat.setLeft(20);
		this.eAlamat.setWidth(350);
		this.eAlamat.setCaption("Alamat");
		
		this.eCbg = new portalui_saiCBBL(this);
		this.eCbg.setTop(253);
		this.eCbg.setLeft(20);
		this.eCbg.setWidth(200);
		this.eCbg.setCaption("Cabang");
		this.eCbg.onBtnClick.set(this, "FindBtnClick");		
		
		this.eKota = new portalui_saiCBBL(this);
		this.eKota.setTop(252);
		this.eKota.setLeft(20);
		this.eKota.setWidth(200);
		this.eKota.setCaption("Kota");
		this.eKota.onBtnClick.set(this, "FindBtnClick");					
		
		this.eKodePos = new portalui_saiLabelEdit(this);
		this.eKodePos.setTop(274);
		this.eKodePos.setLeft(20);
		this.eKodePos.setWidth(350);
		this.eKodePos.setCaption("Kode Pos");
		
		this.ePerusahaan = new portalui_saiLabelEdit(this);
		this.ePerusahaan.setTop(335);
		this.ePerusahaan.setLeft(20);
		this.ePerusahaan.setWidth(400);
		this.ePerusahaan.setCaption("Perusahaan");
		
		this.rearrangeChild(10,23);
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
			alert("[app_portal_master_fCust]->constructor : "+e);
		}
	}
};
window.app_portal_master_fCust.extend(window.portalui_childForm);
window.app_portal_master_fCust.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		if (this.ePwd.getText() != this.eRPwd.getText())
			system.alert(this, "Password tidak sama dengan Retype Password","");
		else if (this.eEmail.getText().search("@") == -1) 
			system.alert(this, "Email tidak valid","");
		else system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
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
window.app_portal_master_fCust.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into portal_cust (kode_cust, kode_lokasi,kode_klp_cust, paswd, nama, tgl_lahir, pic, email, no_telp, no_fax, alamat, kota, kode_pos, perusahaan, tgl_input,nik_user) values  "+
							"('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.eKlp.getText()+"','"+this.ePwd.getText()+"','"+this.e1.getText()+"','"+this.dp_lahir.getDateString()+"', "+
							"	'"+this.ePic.getText()+"','"+this.eEmail.getText()+"','"+this.eNoTelp.getText()+"','"+this.eNoFax.getText()+"','"+this.eAlamat.getText()+"' , "+
							"	'"+this.eKota.getText()+"','"+this.eKodePos.getText()+"','"+this.ePerusahaan.getText()+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"') ");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
					uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("update portal_cust set  "+
							" kode_klp_cust = '"+this.eKlp.getText()+"' "+
							" 	, paswd = '"+this.ePwd.getText()+"'"+
							"	, nama = '"+this.e1.getText()+"' "+
							"	, tgl_lahir = '"+this.dp_lahir.getDateString()+"' "+
							"	, pic = '"+this.ePic.getText()+"' "+
							"	, email = '"+this.eEmail.getText()+"' "+
							"	, no_telp ='"+this.eNoTelp.getText()+"' "+
							" 	, no_fax = '"+this.eNoFax.getText()+"' "+
							"	, alamat = '"+this.eAlamat.getText()+"' "+
							"	, kota = '"+this.eKota.getText()+"' "+							
							"	, kode_pos = '"+this.eKodePos.getText()+"' "+
							"	, perusahaan = '"+this.ePerusahaan.getText()+"' "+
							" where kode_cust = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("delete from portal_cust where kode_cust='"+this.e0.getText()+"'");
					this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fCust.prototype.keyPress = function(sender, charCode, buttonState)
{
};
window.app_portal_master_fCust.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.*, b.nama as nmKlp,ifnull(c.nama,'-') as nama_kt, ifnull(c.kode_cab,'-') as kode_cab, ifnull(d.nama,'-') as nama_cbg from portal_cust a inner join portal_klp_cust b on b.kode_klp_cust = a.kode_klp_cust "+
				"	left outer join portal_kota c on c.kode_kota = a.kota "+
				"	left outer join portal_cabang d on d.kode_lokasi = c.kode_cab "+
				"	where a.kode_cust = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.eKlp.setText(data.get("kode_klp_cust"));
					this.eKlp.setRightLabelCaption(data.get("nmKlp"));
					this.e1.setText(data.get("nama"));
					this.ePwd.setText(data.get("paswd"));					
					this.dp_lahir.setDateString(data.get("tgl_lahir"));
					this.ePic.setText(data.get("pic"));
					this.eCbg.setText(data.get("kode_cab"),data.get("nama_cbg"));
					this.eEmail.setText(data.get("email"));
					this.eNoTelp.setText(data.get("no_telp"));
					this.eNoFax.setText(data.get("no_fax"));
					this.eAlamat.setText(data.get("alamat"));
					this.eKota.setText(data.get("kota"),data.get("nama_kt"));
					this.eKodePos.setText(data.get("kode_pos"));
					this.ePerusahaan.setText(data.get("perusahaan"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fCust.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Customer",this.e0,this.e1, 
										  "select kode_cust, nama from portal_cust where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from portal_cust where kode_lokasi = '"+this.app._lokasi+"' " ,
										  ["kode_cust","nama"],"and",["Kode","Nama"]);
		else if (sender == this.eKlp)
			this.standarLib.showListData(this, "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from portal_klp_cust where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_klp_cust","nama"],"and",["Kode","Nama"]);
		else if (sender == this.eKota)
			this.standarLib.showListData(this, "Data Kota",sender,undefined, 
										  "select kode_kota, nama from portal_kota where kode_cab = '"+this.eCbg.getText()+"' ",
										  "select count(*) from portal_kota where kode_cab = '"+this.eCbg.getText()+"' ",
										  ["kode_kota","nama"],"and",["Kode","Nama"]);
		else if (sender == this.eCbg)
			this.standarLib.showListData(this, "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"and",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fCust.prototype.doRequestReady = function(sender, methodName, result)
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
