window.app_hrmis_sdm_master_fHRloker = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fHRloker.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fHRloker";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Kerja", 0);	
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(500);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(100);
		this.ed_nama.setTag("1");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(54);
		this.ed_alamat.setWidth(500);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(150);
		this.ed_alamat.setTag("1");
		
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(20);
		this.ed_kota.setTop(76);
		this.ed_kota.setWidth(300);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setLength(50);
		this.ed_kota.setTag("1");
		
		this.ed_pos = new portalui_saiLabelEdit(this);
		this.ed_pos.setLeft(20);
		this.ed_pos.setTop(98);
		this.ed_pos.setWidth(150);
		this.ed_pos.setCaption("Kode Pos");
		this.ed_pos.setText("");
		this.ed_pos.setReadOnly(false);
		this.ed_pos.setLength(5);
		this.ed_pos.setTipeText(ttAngka);
		this.ed_pos.setTag("1");
		
		this.ed_tel = new portalui_saiLabelEdit(this);
		this.ed_tel.setLeft(20);
		this.ed_tel.setTop(120);
		this.ed_tel.setWidth(300);
		this.ed_tel.setCaption("No Telepon");
		this.ed_tel.setText("");
		this.ed_tel.setReadOnly(false);
		this.ed_tel.setLength(50);
		this.ed_tel.setTag("1");
		
		this.ed_fax = new portalui_saiLabelEdit(this);
		this.ed_fax.setLeft(20);
		this.ed_fax.setTop(142);
		this.ed_fax.setWidth(300);
		this.ed_fax.setCaption("No Faximile");
		this.ed_fax.setText("");
		this.ed_fax.setReadOnly(false);
		this.ed_fax.setLength(50);
		this.ed_fax.setTag("1");
		
		this.ed_mail = new portalui_saiLabelEdit(this);
		this.ed_mail.setLeft(20);
		this.ed_mail.setTop(164);
		this.ed_mail.setWidth(300);
		this.ed_mail.setCaption("Email");
		this.ed_mail.setText("");
		this.ed_mail.setReadOnly(false);
		this.ed_mail.setLength(100);
		this.ed_mail.setTag("1");
		
		this.ed_web = new portalui_saiLabelEdit(this);
		this.ed_web.setLeft(20);
		this.ed_web.setTop(186);
		this.ed_web.setWidth(300);
		this.ed_web.setCaption("Web site");
		this.ed_web.setText("");
		this.ed_web.setReadOnly(false);
		this.ed_web.setLength(100);
		this.ed_web.setTag("1");
		
		this.ed_pic = new portalui_saiLabelEdit(this);
		this.ed_pic.setLeft(20);
		this.ed_pic.setTop(208);
		this.ed_pic.setWidth(300);
		this.ed_pic.setCaption("Contact Person");
		this.ed_pic.setText("");
		this.ed_pic.setReadOnly(false);
		this.ed_pic.setLength(50);
		this.ed_pic.setTag("1");
		
		this.ed_npwp = new portalui_saiLabelEdit(this);
		this.ed_npwp.setLeft(20);
		this.ed_npwp.setTop(230);
		this.ed_npwp.setWidth(300);
		this.ed_npwp.setCaption("N P W P");
		this.ed_npwp.setText("");
		this.ed_npwp.setReadOnly(false);
		this.ed_npwp.setTipeText(ttAngka);
		this.ed_npwp.setLength(15);
		this.ed_npwp.setTag("1");
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.bShow.onClick.set(this, "showClick");
			this.ed_kode.onExit.set(this, "doEditChange");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fHRloker.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fHRloker.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_hrmis_sdm_master_fHRloker.prototype.doModalResult = function(event, modalResult)
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
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into hr_lokasi (kode_lokasi, nama, alamat, kota, kodepos, no_telp, no_fax, email, website, npwp, pic, kode_lokkonsol) values "+
						    "('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+this.ed_kota.getText()+
						    "','"+this.ed_pos.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_mail.getText()+
						    "','"+this.ed_web.getText()+"','"+this.ed_npwp.getText()+"','"+this.ed_pic.getText()+"','"+this.lokkonsol+"')");
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
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update hr_lokasi set nama='"+this.ed_nama.getText()+"', alamat='"+this.ed_alamat.getText()+"', kota='"+
					     this.ed_kota.getText()+"', kodepos='"+this.ed_pos.getText()+"', no_telp='"+this.ed_tel.getText()+"', no_fax='"+
						 this.ed_fax.getText()+"', email='"+
						 this.ed_mail.getText()+"', website='"+this.ed_web.getText()+"', npwp='"+this.ed_npwp.getText()+"', pic='"+
						 this.ed_pic.getText()+"' where kode_lokasi='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_lokasi where kode_lokasi='"+this.ed_kode.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_master_fHRloker.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try 
		{
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
			setTipeButton(tbSimpan);
			var line,data = this.dbLib.runSQL("select nama, alamat, kota, kodepos, no_telp, no_fax, email, website, npwp, pic from hr_lokasi "+
											  " where kode_lokasi = '"+this.ed_kode.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_nama.setText(line.get("nama"));
					this.ed_alamat.setText(line.get("alamat"));
					this.ed_kota.setText(line.get("kota"));
					this.ed_pos.setText(line.get("kodepos"));
					this.ed_tel.setText(line.get("no_telp"));
					this.ed_fax.setText(line.get("no_fax"));
					this.ed_mail.setText(line.get("email"));
					this.ed_web.setText(line.get("website"));
					this.ed_npwp.setText(line.get("npwp"));
					this.ed_pic.setText(line.get("pic"));
					setTipeButton(tbUbahHapus);				
				}
			}else 
			{
				setTipeButton(tbSimpan);
			}
		} catch(e)
		{
			system.alert(this,e,"");
		}	
	}
};
window.app_hrmis_sdm_master_fHRloker.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Lokasi Kerja",this.ed_kode,this.ed_nama, 
									  "select kode_lokasi, nama from hr_lokasi ",
									  "select count(kode_lokasi) from hr_lokasi",
									  ["kode_lokasi","nama"],"where",["Kode Lokasi","Deskripsi"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_hrmis_sdm_master_fHRloker.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi kerja: "+ this.ed_kode.getText()+" tersimpan.)");
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
window.app_hrmis_sdm_master_fHRloker.prototype.doFileChange = function(sender, filename, allow)
{
	if (allow)
		this.ed_logo.setText(filename);
};