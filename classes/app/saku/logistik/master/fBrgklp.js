window.app_saku_logistik_master_fBrgklp = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_master_fBrgklp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_master_fBrgklp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Barang", 0);	

		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode Kelompok");
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
		this.ed_nama.setWidth(600);
		this.ed_nama.setCaption("Nama Klp Barang");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		/*
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(54);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun Persediaan");
		this.cb_akun.setText("");
		this.cb_akun.setReadOnly(false);
		this.cb_akun.setLabelWidth(100)
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setTag("1");
		*/
		
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(54);
		this.cb_jenis.setWidth(200);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem(0,"ASSET");
		this.cb_jenis.addItem(1,"NONASSET");
		this.cb_jenis.addItem(2,"HABISPAKAI");
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		//this.cb_akun.onBtnClick.set(this, "FindBtnClick");
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_master_fBrgklp.extend(window.portalui_childForm);
window.app_saku_logistik_master_fBrgklp.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_master_fBrgklp.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into barang_klp (kode_klpbrg,nama,akun_pers,kode_lokasi,jenis) values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','-','"+this.app._lokasi+"','"+this.cb_jenis.getText()+"') ");
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
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update barang_klp set  "+
							"nama = '"+this.ed_nama.getText()+"',akun_pers = '-',jenis='"+this.cb_jenis.getText()+"' where kode_klpbrg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from barang_klp where kode_klpbrg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_saku_logistik_master_fBrgklp.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, new Array("1"),undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select a.nama,a.jenis "+ //,a.akun_pers,b.nama as nama_akun 
										  " from barang_klp a "+ //inner join masakun b on a.akun_pers=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
										  " where a.kode_klpbrg = '"+this.ed_kode.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
				this.cb_jenis.setText(line.get("jenis"));
				//this.cb_akun.setText(line.get("akun_pers"));
				//this.cb_akun.setRightLabelCaption(line.get("nama_akun"));
				setTipeButton(tbUbahHapus);				
			} 
		}else 
		{
			setTipeButton(tbSimpan);
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_logistik_master_fBrgklp.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Kelompok",this.ed_kode,undefined, 
										  "select kode_klpbrg, nama  from barang_klp where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_klpbrg) from barang_klp where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_klpbrg","nama"),"and",new Array("Kode Kelompok","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
		/*
		if (sender == this.cb_akun) 
		{
		    this.standarLib.showListData(this, "Daftar Akun Persediaan",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
		}*/
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_master_fBrgklp.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};