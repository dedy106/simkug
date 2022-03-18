window.app_saku_referensi_transaksi_fCurr = function(owner)
{
	if (owner)
	{
		window.app_saku_referensi_transaksi_fCurr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_referensi_transaksi_fCurr";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Currency", 0);	
		
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
				
		this.ed_jenis = new portalui_saiCB(this);
		this.ed_jenis.setLeft(20);
		this.ed_jenis.setTop(54);
		this.ed_jenis.setWidth(185);
		this.ed_jenis.setCaption("Simbol");
		this.ed_jenis.setText("");
		this.ed_jenis.setTag("1");
		
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		
		setTipeButton(tbSimpan);
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
			var val = this.dbLib.loadQuery("select distinct skode from curr");
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
window.app_saku_referensi_transaksi_fCurr.extend(window.portalui_childForm);
window.app_saku_referensi_transaksi_fCurr.prototype.mainButtonClick = function(sender)
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
window.app_saku_referensi_transaksi_fCurr.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0,1],this.ed_kode);		
				var val = this.dbLib.loadQuery("select distinct skode from curr");
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
					sql.add("insert into curr (kode_curr, nama, skode) values "+
						    "('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_jenis.getText()+"')");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
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
					sql.add("update curr set nama='"+this.ed_nama.getText()+"', skode='"+this.ed_jenis.getText()+
						 "' where kode_curr='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
					system.alert(this, e,"");
				}
			}
			break;		
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from curr where kode_curr='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_referensi_transaksi_fCurr.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, [1],undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select nama, skode "+
										  " from curr "+
										  " where kode_curr = '"+this.ed_kode.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
				this.ed_jenis.setText(line.get("skode"));
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
window.app_saku_referensi_transaksi_fCurr.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Jenis Currency",this.ed_kode,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_referensi_transaksi_fCurr.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode jenis currency : "+ this.ed_kode.getText()+" tersimpan.)");
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