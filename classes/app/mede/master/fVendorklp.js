window.app_saku_referensi_transaksi_fVendorklp = function(owner){
	if (owner)
	{
		window.app_saku_referensi_transaksi_fVendorklp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_referensi_transaksi_fVendorklp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Vendor", 0);	
		
		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Kode Lokasi");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("9");
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(32);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode Kelompok");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
			
		uses("portalui_imageButton");
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(32);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);

		uses("portalui_saiLabelEdit");
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(54);
		this.ed_nama.setWidth(300);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
				
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);	
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_referensi_transaksi_fVendorklp.extend(window.portalui_childForm);
window.app_saku_referensi_transaksi_fVendorklp.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_referensi_transaksi_fVendorklp.prototype.doModalResult = function(event, modalResult){	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
				this.standarLib.clearByTag(this, [0],this.ed_kode);						
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into vendor_klp (kode_klpvendor,nama,kode_lokasi)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.cb_lokasi.getText()+"')");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add(" update vendor_klp set  "+
							" nama = '"+this.ed_nama.getText()+
							"' where kode_klpvendor='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from vendor_klp where kode_klpvendor='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_referensi_transaksi_fVendorklp.prototype.showClick = function(sender){
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_klpvendor,a.nama from vendor_klp a where a.kode_klpvendor = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
			if (data != undefined) 
			{
				if  (data != "") 
				{
					var field = data.split("\r\n");
					var field = field[1].split(";");
					this.ed_nama.setText(field[1]);
					setTipeButton(tbUbahHapus);
				}else
				{	
					this.ed_nama.setText("");
					setTipeButton(tbSimpan);
				}
			}
			else
			{	
			  this.ed_nama.setText("");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};											  
window.app_saku_referensi_transaksi_fVendorklp.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Kelompok",this.ed_kode,undefined, 
										  "select kode_klpvendor, nama  from vendor_klp where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_klpvendor) from vendor_klp where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_klpvendor","nama"],"and",["Kode Kelompok","Deskripsi"],false);
			this.ed_nama.setText("");
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_referensi_transaksi_fVendorklp.prototype.doRequestReady = function(sender, methodName, result)
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