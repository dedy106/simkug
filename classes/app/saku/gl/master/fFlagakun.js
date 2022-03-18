window.app_saku_gl_master_fFlagakun = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fFlagakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fFlagakun";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Flag Akun", 0);	
		
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
		this.ed_nama.setWidth(500);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(100);
		this.ed_nama.setTag("1");
		
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
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_master_fFlagakun.extend(window.portalui_childForm);
window.app_saku_gl_master_fFlagakun.prototype.mainButtonClick = function(sender)
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
window.app_saku_gl_master_fFlagakun.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into flag_akun (kode_flag, nama) values "+
						    "('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"')");
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
					sql.add(" update flag_akun set nama='"+this.ed_nama.getText()+"' where kode_flag='"+this.ed_kode.getText()+"'");
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
					sql.add("delete from flag_akun where kode_flag='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gl_master_fFlagakun.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, new Array("1"),undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select nama "+
										  " from flag_akun "+
										  " where kode_flag = '"+this.ed_kode.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
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
											  
window.app_saku_gl_master_fFlagakun.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Jenis Flag Akun",this.ed_kode,undefined, 
										  "select kode_flag, nama  from flag_akun",
										  "select count(kode_flag) from flag_akun",
										  new Array("kode_flag","nama"),"where",new Array("Kode Flag","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_gl_master_fFlagakun.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode jenis flag akun : "+ this.ed_kode.getText()+" tersimpan.)");
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