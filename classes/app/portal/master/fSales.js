window.app_portal_master_fSales = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fSales.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fSales";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Sales : Input/Koreksi", 0);	
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Sales");		
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
		this.eKlp.setCaption("Kelompok Sales");
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
		this.lTgl.setHeight(18);
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
		this.eNoTelp.setTop(186);
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
		
		this.eKota = new portalui_saiLabelEdit(this);
		this.eKota.setTop(252);
		this.eKota.setLeft(20);
		this.eKota.setWidth(350);
		this.eKota.setCaption("Kota");
		
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
		
		this.cbg = new portalui_saiCBBL(this);
		this.cbg.setLeft(20);
		this.cbg.setTop(336);
		this.cbg.setWidth(200);
		this.cbg.setCaption("Cabang");
		this.cbg.setRightLabelVisible(true);
		this.cbg.onBtnClick.set(this, "FindBtnClick");
		
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
		}catch(e)
		{
			alert("[app_portal_master_fSales]->constructor : "+e);
		}
	}
};
window.app_portal_master_fSales.extend(window.portalui_childForm);
window.app_portal_master_fSales.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fSales.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into portal_sales (kode_sales, kode_klp_sales, paswd, nama, tgl_lahir, pic, email, no_telp, no_fax, alamat, kota, kode_pos, perusahaan, tgl_input,nik_user,kode_cab,kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.eKlp.getText()+"','"+this.ePwd.getText()+"','"+this.e1.getText()+"','"+this.dp_lahir.getDateString()+"', "+
							"	'"+this.ePic.getText()+"','"+this.eEmail.getText()+"','"+this.eNoTelp.getText()+"','"+this.eNoFax.getText()+"','"+this.eAlamat.getText()+"' , "+
							"	'"+this.eKota.getText()+"','"+this.eKodePos.getText()+"','"+this.ePerusahaan.getText()+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"','"+this.cbg.getText()+"','"+this.app._lokasi+"') ");
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
					sql.add("update portal_sales set  "+
							" kode_klp_sales = '"+this.eKlp.getText()+"' "+
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
							"	, kode_cab = '"+this.cbg.getText()+"' "+
							" where kode_sales = '"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("delete from portal_sales where kode_sales='"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fSales.prototype.keyPress = function(sender, charCode, buttonState)
{
};
window.app_portal_master_fSales.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.*, b.nama as nmKlp,c.nama as nmcbg from portal_sales a inner join portal_klp_sales b on b.kode_klp_sales = a.kode_klp_sales "+
			"inner join portal_cabang c on a.kode_cab=c.kode_cab "+
			"where a.kode_sales = '"+this.e0.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.eKlp.setText(data.get("kode_klp_sales"));
					this.eKlp.setRightLabelCaption(data.get("nmKlp"));
					this.e1.setText(data.get("nama"));
					this.ePwd.setText(data.get("paswd"));					
					this.dp_lahir.setDateString(data.get("tgl_lahir"));
					this.ePic.setText(data.get("pic"));
					this.eEmail.setText(data.get("email"));
					this.eNoTelp.setText(data.get("no_telp"));
					this.eNoFax.setText(data.get("no_fax"));
					this.eAlamat.setText(data.get("alamat"));
					this.eKota.setText(data.get("kota"));
					this.eKodePos.setText(data.get("kode_pos"));
					this.ePerusahaan.setText(data.get("perusahaan"));
					this.cbg.setText(data.get("kode_cab"));
					this.cbg.setRightLabelCaption(data.get("nmcbg"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fSales.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Sales",this.e0,this.e1, 
										  "select kode_sales, nama from portal_sales","select count(*) from portal_sales",
										  ["kode_sales","nama"],"where",["Kode","Nama"]);
		if (sender == this.eKlp)
			this.standarLib.showListData(this, "Data Klp Sales",sender,undefined, 
										  "select kode_klp_sales, nama from portal_klp_sales","select count(*) from portal_klp_sales",
										  ["kode_klp_sales","nama"],"where",["Kode","Nama"]);
		if (sender == this.cbg)
			this.standarLib.showListData(this, "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ","select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"where",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fSales.prototype.doRequestReady = function(sender, methodName, result)
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
