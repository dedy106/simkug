window.app_saku_fa_master_fFastatus = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_master_fFastatus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_master_fFastatus";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Status Klaim dan Kondisi Asset", 0);	

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
		this.ed_nama.setWidth(300);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(54);
		this.cb_jenis.setWidth(220);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem("K","Klaim");
		this.cb_jenis.addItem("S","Status Kondisi");
		this.cb_jenis.setTag("1");
		this.cb_jenis.setReadOnly(true);

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
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_master_fFastatus.extend(window.portalui_childForm);
//------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------
window.app_saku_fa_master_fFastatus.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");s	
};
window.app_saku_fa_master_fFastatus.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into fa_status (kode_status,nama,jenis)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.cb_jenis.getText().substr(0,1)+"') ");
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
					sql.add("update fa_status set  "+
							"nama = '"+this.ed_nama.getText()+"', jenis='"+this.cb_jenis.getText().substr(0,1)+"' where kode_status='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from fa_status where kode_status='"+this.ed_kode.getText()+"' and jenis= '"+this.cb_jenis.getText().substr(0,1)+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_saku_fa_master_fFastatus.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, new Array("1"),undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select nama,jenis "+
										  " from fa_status "+
										  " where kode_status = '"+this.ed_kode.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
				this.cb_jenis.setSelectedId(line.get("jenis"));
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
window.app_saku_fa_master_fFastatus.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Status Asset",this.ed_kode,undefined, 
										  "select kode_status, nama   from fa_status ",
										  "select count(kode_status)  from fa_status ",
										  new Array("kode_status","nama"),"where",new Array("Kode Status","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_master_fFastatus.prototype.doRequestReady = function(sender, methodName, result)
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