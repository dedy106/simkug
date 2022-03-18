window.app_hrmis_sdm_master_fHamil = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fHamil.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fHamil";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Periksa Kehamilan", 0);	

		this.p1 = new portalui_panel(this);
		this.p1.setTop(10);
		this.p1.setWidth(710);
		this.p1.setLeft(10);
		this.p1.setHeight(400);
		this.p1.setCaption("Data Plafon Periksa Kehamilan");
		
		uses("portalui_saiGrid;portalui_sgNavigator",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(705);
		this.sg1.setHeight(350);
		this.sg1.setColCount(4);
		this.sg1.setColTitle(new Array("Dari Tingkat","Sampai Tingkat","Tarif","Jenis"));
		this.sg1.setColWidth(new Array(3,2,1,0),new Array(80,100,100,100));	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(2).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "PERIKSA");
			val.set(2, "SC");
		this.sg1.columns.get(3).setPicklist(val);
		
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(373);
		this.sgn.setLeft(1);
		this.sgn.setWidth(710);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbSimpan);
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
			this.sg1.clear(); 
			var strSql = " select tingkat1,tingkat2,tarif,jenis "+
						 " from kes_hamil "+
						 " where kode_lokkonsol='"+this.lokkonsol+"' order by nu";
			
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3),
							new Array(line.get("tingkat1"),line.get("tingkat2"),line.get("tarif"),line.get("jenis")));					
					}
				} 
			}
			if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fHamil.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fHamil.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_master_fHamil.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.sg1.clear(); this.sg1.appendRow();
				this.sg1.clear(); 
				
				var strSql = " select tingkat1,tingkat2,tarif,jenis "+
							 " from kes_hamil "+
							 " where kode_lokkonsol='"+this.lokkonsol+"' order by nu";
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3),
								new Array(line.get("tingkat1"),line.get("tingkat2"),line.get("tarif"),line.get("jenis")));					
						}
					} 
				}
				if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from kes_hamil where kode_lokkonsol='"+this.lokkonsol+"' ");
					var scr1 = "insert into kes_hamil (nu,tingkat1,tingkat2,tarif,jenis,kode_lokkonsol) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "("+i+",'"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"',"+parseNilai(this.sg1.getCell(2,i))+",'"+this.sg1.getCell(3,i)+"','"+this.lokkonsol+"')";
						baris1 = false;
					}	
					sql.add(scr1);
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
window.app_hrmis_sdm_master_fHamil.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};