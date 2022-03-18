window.app_saku_fa_fFabrg = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_fFabrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_fFabrg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Jenis Barang Asset", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		uses("portalui_saiCBBL");
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(200);
		this.ed_kode.setCaption("Kode Jenis Asset");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(600);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(150);
				
		this.cb_satuan = new portalui_saiCBBL(this);
		this.cb_satuan.setLeft(20);
		this.cb_satuan.setTop(54);
		this.cb_satuan.setWidth(200);
		this.cb_satuan.setCaption("Satuan");
		this.cb_satuan.setText("");
		this.cb_satuan.setReadOnly(false);
		this.cb_satuan.setLabelWidth(100);
		this.cb_satuan.setRightLabelVisible(true);
		this.cb_satuan.setRightLabelCaption("");
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(20);
		this.ed_merk.setTop(76);
		this.ed_merk.setWidth(400);
		this.ed_merk.setCaption("Merk / Brand");
		this.ed_merk.setText("");
		this.ed_merk.setReadOnly(false);
		this.ed_merk.setLength(100);
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(20);
		this.ed_tipe.setTop(98);
		this.ed_tipe.setWidth(400);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText("");
		this.ed_tipe.setReadOnly(false);
		this.ed_tipe.setLength(100);
		

		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		
		
		this.ed_kode.onChange.set(this, "doEditChange");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_satuan.onBtnClick.set(this, "FindBtnClick");
		
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
window.app_saku_fa_fFabrg.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_fa_fFabrg.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_fFabrg.prototype.doModalResult = function(event, modalResult)
{			
	var tgl = new Date();
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into fa_barang(kode_brg,kode_sat,kode_lokasi,nama,merk,tipe,nik_user,tgl_input)  values "+
							"('"+this.ed_kode.getText()+"','"+this.cb_satuan.getText()+"','"+this.app._lokasi+"','"+this.ed_nama.getText()+"','"+
							     this.ed_merk.getText()+"','"+this.ed_tipe.getText()+"','"+this.app._userLog+"',now())");
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
					sql.add("update fa_barang set  "+
							"nama = '"+this.ed_nama.getText()+"',kode_sat = '"+this.cb_satuan.getText()+
							"',merk='"+this.ed_merk.getText()+"',tipe='"+this.ed_tipe.getText()+"',nik_user='"+this.app._userLog+"',tgl_input = now() "+
							"where kode_brg = '"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from fa_barang where kode_brg='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_saku_fa_fFabrg.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_kode) 
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{
				uses("server_util_arrayMap");
				var data = this.dbLib.loadQuery("select a.kode_brg,a.nama,a.kode_sat,a.merk,a.tipe,b.nama as nama_sat "+
				                                "from fa_barang a inner join fa_satuan b on a.kode_sat=b.kode_sat "+
												"where a.kode_brg = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			    if (data != undefined) 
			    {
		          if  (data != "") 
				  {
					var field = data.split("\r\n");
	  				var field = field[1].split(";");
					
					this.ed_nama.setText(field[1]);
					this.cb_satuan.setText(field[2]);
					this.ed_merk.setText(field[3]);
					this.ed_tipe.setText(field[4]);
					this.cb_satuan.setRightLabelCaption(field[5]);
				    setTipeButton(tbUbahHapus);
				  }
				  else
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
    } 
};											  
window.app_saku_fa_fFabrg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Master Jenis Asset",this.ed_kode,this.ed_nama, 
										  "select kode_brg, nama  from fa_barang where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_brg) from fa_barang where kode_lokasi = '"+this.app._lokasi+"'",
										  new Array("kode_brg","nama"),"and",new Array("Kode Jenis","Deskripsi"),false);
		}
		if (sender == this.cb_satuan) 
		{
		    this.standarLib.showListData(this, "Daftar Satuan",this.cb_satuan,undefined, 
										  "select kode_sat,nama   from fa_satuan ",
										  "select count(kode_sat) from fa_satuan ",
										  new Array("kode_klpbrg","nama"),"where",new Array("Kode Satuan","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_fFabrg.prototype.doRequestReady = function(sender, methodName, result)
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
