window.app_saku_referensi_transaksi_fSpro = function(owner)
{
	if (owner)
	{
		window.app_saku_referensi_transaksi_fSpro.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_referensi_transaksi_fSpro";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Sistem Prosedur dan Parameter", 0);	
		
		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Lokasi Perusahaan");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(true);
				
		this.p1 = new portalui_panel(this);
		this.p1.setTop(32);
		this.p1.setWidth(900);
		this.p1.setLeft(10);
		this.p1.setHeight(415);
		this.p1.setCaption("Daftar Item Sistem Prosedur dan Parameter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(895);
		this.sg1.setHeight(389);
		this.sg1.setColCount(7);
		this.sg1.setColTitle(["Kode","Nama","Modul","Flag","Value1","Value2","Deskripsi"]);
		this.sg1.setColWidth([6,5,4,3,2,1,0],[300,80,80,100,50,200,80]);	
		this.sg1.columns.get(0).setReadOnly(true);
		this.sg1.columns.get(1).setReadOnly(true);
		this.sg1.columns.get(2).setReadOnly(true);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNumeric);
		this.sg1.columns.get(5).setColumnFormat(window.cfNumeric);
							 
		
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
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
			this.sg1.clear();
			var data = this.dbLib.runSQL("select kode_spro,nama,modul,flag,value1,value2,keterangan from spro where kode_lokasi='"+this.cb_lokasi.getText()+"'");							 
			this.sg1.showLoading();
			if (data instanceof portalui_arrayMap)
			{	
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.sg1.appendData([line.get("kode_spro"),line.get("nama"),line.get("modul"),line.get("flag"),line.get("value1"),line.get("value2"),line.get("keterangan")]);					
					}
				} else {this.sg1.appendRow();}
			}else {throw(data); this.sg1.appendRow();}
			this.sg1.hideLoading();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_referensi_transaksi_fSpro.extend(window.portalui_childForm);
window.app_saku_referensi_transaksi_fSpro.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan di-refresh?","form inputan ini akan di-refresh");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_referensi_transaksi_fSpro.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0],undefined);	
				this.cb_lokasi.setText(this.app._lokasi);
				this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
				this.sg1.clear();
				var data = this.dbLib.runSQL("select kode_spro,nama,modul,flag,value1,value2,keterangan from spro where kode_lokasi='"+this.cb_lokasi.getText()+"'");							 
				this.sg1.showLoading();
				if (data instanceof portalui_arrayMap)
				{	
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.sg1.appendData([line.get("kode_spro"),line.get("nama"),line.get("modul"),line.get("flag"),line.get("value1"),line.get("value2"),line.get("keterangan")]);					
						}
					} else {this.sg1.appendRow();}
				}else {throw(data); this.sg1.appendRow();}
				this.sg1.hideLoading();
			}
			break;			
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add("update spro set nama='"+this.sg1.getCell(1,i)+"', modul='"+this.sg1.getCell(2,i)+"', flag='"+this.sg1.getCell(3,i)+"', value1="+strToFloat(this.sg1.getCell(4,i))+", value2="+strToFloat(this.sg1.getCell(5,i))+", keterangan='"+this.sg1.getCell(6,i)+"' where kode_spro='"+this.sg1.getCell(0,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
	}
};									  
window.app_saku_referensi_transaksi_fSpro.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (perubahan data spro telah disimpan.)");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    				break;
    		}
	    }catch(e)
	    {
	       systemAPI.alert("step : "+step+"; error = "+e);
	    }    
	}
};
