window.app_saku_kb_master_fBankcab = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_master_fBankcab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_master_fBankcab";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Cabang Bank", 0);	
		
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
		this.ed_nama.setCaption("Cabang");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(100);
		this.ed_nama.setTag("1");
		
		this.cb_bank = new portalui_saiCBBL(this);
		this.cb_bank.setLeft(20);
		this.cb_bank.setTop(54);
		this.cb_bank.setWidth(185);
		this.cb_bank.setText("");
		this.cb_bank.setCaption("Bank");
		this.cb_bank.setReadOnly(true);
		this.cb_bank.setLabelWidth(100);
		this.cb_bank.setRightLabelVisible(true);
		this.cb_bank.setRightLabelCaption("");
		this.cb_bank.setTag("1");
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.dbLib2 = new util_dbLib(window.system.serverApp);
			this.cb_bank.setSQL("select kode_bank, nama from bank where kode_lokasi = '"+this.app._lokasi+"' ",["kode_bank","nama"], this.dbLib2);			
			
			this.bShow.onClick.set(this, "showClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.cb_bank.onBtnClick.set(this, "FindBtnClick");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_master_fBankcab.extend(window.portalui_childForm);
window.app_saku_kb_master_fBankcab.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_master_fBankcab.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1"],this.ed_kode);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into bankcab (kode_cab,kode_bank, cabang, kode_lokasi) values "+
						    "('"+this.ed_kode.getText()+"','"+this.cb_bank.getText()+"','"+this.ed_nama.getText()+"','"+this.app._lokasi+"')");
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
					sql.add(" update bankcab set cabang='"+this.ed_nama.getText()+"',kode_bank='"+this.cb_bank.getText()+"' where kode_cab='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from bankcab where kode_cab='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_kb_master_fBankcab.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this,["1"],undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select a.cabang,a.kode_bank,b.nama as nama_bank "+
										  " from bankcab a inner join bank b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
										  " where a.kode_cab = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("cabang"));
				this.cb_bank.setText(line.get("kode_bank"));
				this.cb_bank.setRightLabelCaption(line.get("nama_bank"));
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
};
window.app_saku_kb_master_fBankcab.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Cabang Bank",sender,undefined, 
										  "select kode_cab, cabang  from bankcab where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_cab) from bankcab where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_cab","cabang"],"and",["Kode Cabang","Deskripsi"],false);
			this.standarLib.clearByTag(this,["1"],undefined);				
		}
		if (sender == this.cb_bank) 
		{
			this.standarLib.showListData(this, "Data Bank",sender,undefined, 
										  "select kode_bank, nama  from bank where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_bank) from bank where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_bank","nama"],"and",["Kode Bank","Deskripsi"],false);
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_master_fBankcab.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode cabang : "+ this.ed_kode.getText()+" tersimpan.)");
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