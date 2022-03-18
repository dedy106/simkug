window.app_saku_referensi_transaksi_fBank2 = function(owner)
{
	if (owner)
	{
		window.app_saku_referensi_transaksi_fBank2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_referensi_transaksi_fBank2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rekening Bank", 0);	
		
		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Lokasi Perusahaan");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setTag("9");

		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(32);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(32);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
				
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(54);
		this.ed_nama.setWidth(500);
		this.ed_nama.setCaption("Nama / Cabang");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		this.ed_norek = new portalui_saiLabelEdit(this);
		this.ed_norek.setLeft(20);
		this.ed_norek.setTop(76);
		this.ed_norek.setWidth(500);
		this.ed_norek.setCaption("No Rekening");
		this.ed_norek.setText("");
		this.ed_norek.setReadOnly(false);
		this.ed_norek.setLength(50);
		this.ed_norek.setTag("1");
		
		this.ed_namarek = new portalui_saiLabelEdit(this);
		this.ed_namarek.setLeft(20);
		this.ed_namarek.setTop(98);
		this.ed_namarek.setWidth(500);
		this.ed_namarek.setCaption("Rekening a/n");
		this.ed_namarek.setText("");
		this.ed_namarek.setReadOnly(false);
		this.ed_namarek.setLength(50);
		this.ed_namarek.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(120);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun Bank");
		this.cb_akun.setText("");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setTag("1");
				
		this.ed_jenis = new portalui_saiCB(this);
		this.ed_jenis.setLeft(20);
		this.ed_jenis.setTop(142);
		this.ed_jenis.setWidth(185);
		this.ed_jenis.setCaption("Jenis");
		this.ed_jenis.setText("");
		this.ed_jenis.setTag("1");
		this.ed_jenis.setMustCheck(false);
		
		setTipeButton(tbAllFalse);
		this.maximize();				
		this.setTabChildIndex();
		this.rearrangeChild(10,22);
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
			this.bShow.onClick.set(this, "showClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			var val = this.dbLib.loadQuery("select distinct jenis from bank2 where kode_lokasi='"+this.cb_lokasi.getText()+"'");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.ed_jenis.addItem(j,val[j].split(";"));
					}
				}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_referensi_transaksi_fBank2.extend(window.portalui_childForm);
window.app_saku_referensi_transaksi_fBank2.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_referensi_transaksi_fBank2.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
				setTipeButton(tbAllFalse);
				var val = this.dbLib.loadQuery("select distinct jenis from bank2 where kode_lokasi='"+this.cb_lokasi.getText()+"'");
				var val = val.split("\r\n");
				var val1 = new portalui_arrayMap(); 
					for (var j in val)
					{
						if (j>0)
						{                   
							var isi = val[j].split(";");             
							this.ed_jenis.addItem(j,val[j].split(";"));
						}
					}				
			}
			break;
			
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into bank2 (kode_lokasi, kode_bank, nama, no_rek, nama_rek, kode_akun, jenis ) values "+
						    "('"+this.cb_lokasi.getText()+"','"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_norek.getText()+
						    "','"+this.ed_namarek.getText()+"','"+this.cb_akun.getText()+"','"+this.ed_jenis.getText()+"')");
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
					sql.add("update bank2 set nama='"+this.ed_nama.getText()+"', no_rek='"+this.ed_norek.getText()+"', nama_rek='"+
					     this.ed_namarek.getText()+"', kode_akun='"+this.cb_akun.getText()+"', jenis='"+this.ed_jenis.getText()+
						 "' where kode_bank='"+this.ed_kode.getText()+"' and kode_lokasi ='"+this.cb_lokasi.getText()+"'");
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
					sql.add("delete from bank2 where kode_bank='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_referensi_transaksi_fBank2.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, [1],undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL("select a.nama, a.no_rek, a.nama_rek, a.kode_akun, a.jenis, b.nama as nama_akun "+
										  "from bank2 a "+
										  " 	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  " where a.kode_bank = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
				this.ed_norek.setText(line.get("no_rek"));
				this.ed_namarek.setText(line.get("nama_rek"));
				this.cb_akun.setText(line.get("kode_akun"));
				this.ed_jenis.setText(line.get("jenis"));
				this.cb_akun.setRightLabelCaption(line.get("nama_akun"));
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
window.app_saku_referensi_transaksi_fBank2.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Rekening Bank",this.ed_kode,this.ed_nama, 
										  "select kode_bank, nama  from bank2 where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_bank) from bank2 where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_bank","nama"],"and",["Kode Bank","Deskripsi"],false);
			this.standarLib.clearByTag(this, [1],undefined);				
		}		
		if (sender == this.cb_akun) 
		{
			 this.standarLib.showListData(this, "Daftar Akun KasBank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and b.kode_flag in ('001','009') and a.kode_lokasi ='"+this.cb_lokasi.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and b.kode_flag in ('001','009') and a.kode_lokasi ='"+this.cb_lokasi.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Deskripsi"],false);
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_referensi_transaksi_fBank2.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode rekening bank : "+ this.ed_kode.getText()+" tersimpan.)");
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