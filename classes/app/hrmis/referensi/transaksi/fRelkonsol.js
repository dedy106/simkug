window.app_hrmis_referensi_transaksi_fRelkonsol = function(owner)
{
	if (owner)
	{
		window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_referensi_transaksi_fRelkonsol";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Lokasi Konsolidasi", 0);	
		
		uses("portalui_saiCBBL;portalui_button;portalui_panel");
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Lokasi Konsolidasi");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(true);
		this.ed_kode.setRightLabelCaption("");
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(435);
		this.bGen.setTop(10);
		this.bGen.setCaption("Tampil Data");
				
		this.p1 = new portalui_panel(this);
		this.p1.setTop(40);
		this.p1.setWidth(500);
		this.p1.setLeft(10);
		this.p1.setHeight(400);
		this.p1.setCaption("Lokasi yang terkonsolidasi");
				
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(495);
		this.sg1.setHeight(350);
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Kode","Deskripsi"));
		this.sg1.setColWidth(new Array(1,0),new Array(365,100));	
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
							 
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(373);
		this.sgn.setLeft(1);
		this.sgn.setWidth(500);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.clear(); this.sg1.appendRow(); 
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_referensi_transaksi_fRelkonsol.extend(window.portalui_childForm);
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0],this.ed_kode);	
				this.sg1.clear(1);
			}
			break;			
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("update lokasi set kode_lokkonsol='-' where kode_lokkonsol='"+this.ed_kode.getText()+"'");
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add("update lokasi set kode_lokkonsol='"+this.ed_kode.getText()+"' where kode_lokasi='"+this.sg1.getCell(0,i)+"'");
					}
					this.dbLib.execArraySQL(sql);	
				}catch(e){
					system.alert(this, e,"");
				}
			}
			break;
	}
};
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.doFindBtnClick = function(sender, col, row){
	try{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar lokasi belum terkonsolidasi",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_lokasi, nama  from lokasi where kode_lokkonsol='-' and flag_konsol='0'",
												  "select count(kode_lokasi) from lokasi where kode_lokkonsol='-' and flag_konsol='0'",
												  ["kode_lokasi","nama"],"and",["Kode Lokasi","Deskripsi"],false);
				break;			
		}
	}catch(e){
		systemAPI.alert("[app_hrmis_referensi_transaksi_fRelkonsol] : doFindBtnClick : " + e);
	}	
};
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.genClick = function(sender){
	try 
	{
		this.sg1.clear(); 
		setTipeButton(tbSimpan);
		var data = this.dbLib.runSQL("select kode_lokasi,nama from lokasi "+
										  " where kode_lokkonsol = '"+this.ed_kode.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var i in data.objList)
				{
					line = data.get(i);
					this.sg1.appendData([line.get("kode_lokasi"),line.get("nama")]);					
				}
			} else{
				this.sg1.appendRow();
			}
		}else {
			this.sg1.appendRow();
		}
	} catch(e){
		system.alert(this,e,"");
	}	
};											  
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.FindBtnClick = function(sender, event){
	try{
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Lokasi Konsolidasi",this.ed_kode,undefined, 
										  "select kode_lokasi, nama from lokasi where flag_konsol='1'",
										  "select count(kode_lokasi) from lokasi where flag_konsol='1'",
										  ["kode_lokasi","nama"],"and",["Kode Lokasi","Deskripsi"],false);
			this.sg1.clear(1);
		}
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_hrmis_referensi_transaksi_fRelkonsol.prototype.doRequestReady = function(sender, methodName, result){
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (relasi konsolidasi kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
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