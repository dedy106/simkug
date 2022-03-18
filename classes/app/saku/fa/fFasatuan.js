window.app_saku_fa_fFasatuan = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_fFasatuan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_fFasatuan";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Satuan Fixed Asset", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		uses("portalui_saiCBBL");
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
						
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(300);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
				
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		this.ed_kode.onChange.set(this, "doEditChange");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_fa_fFasatuan.extend(window.portalui_childForm);
//------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------
window.app_saku_fa_fFasatuan.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_fFasatuan.prototype.doModalResult = function(event, modalResult)
{			
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
					sql.add("insert into fa_satuan (kode_sat,nama)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"') ");
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
					sql.add("update fa_satuan set  "+
							"nama = '"+this.ed_nama.getText()+"' where kode_sat='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from fa_satuan where kode_sat='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_saku_fa_fFasatuan.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_kode) 
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{
				uses("server_util_arrayMap");
				var data = this.dbLib.loadQuery("select a.kode_sat,a.nama from fa_satuan a where a.kode_sat = '"+this.ed_kode.getText()+"'");
			    if (data != undefined) 
			    {
		          if  (data != "") 
				  {
					var field = data.split("\r\n");
	  				var field = field[1].split(";");
					
					this.ed_nama.setText(field[1]);
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
window.app_saku_fa_fFasatuan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Satuan Fixed Asset",this.ed_kode,this.ed_nama, 
										  "select kode_sat, nama  from fa_satuan ",
										  "select count(kode_sat) from fa_satuan ",
										  new Array("kode_sat","nama"),"where",new Array("Kode Satuan","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_fFasatuan.prototype.doRequestReady = function(sender, methodName, result)
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