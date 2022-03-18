window.app_eclaim2_master_fAsuransiTtg = function(owner){
	if (owner)
	{
		window.app_eclaim2_master_fAsuransiTtg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fAsuransiTtg";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Jenis Asuransi", 0);	
		
		uses("saiCBBL;saiGrid");
		this.cb_ttg = new saiCBBL(this,{bound:[20,10,185,20],caption:"Tertanggung"});										
		this.bGen = new button(this,{bound:[420,11,80,20],caption:"Tampil Data",click:"doClick"});
		this.p1 = new panel(this,{bound:[20,12,500,400],caption:"Jenis Asuransi"});						
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,498,350],colCount:2,colTitle:["Kode Asuransi","Deskripsi"],
			colWidth:[[1,0],[365,100]],buttonStyle:[[0],[bsEllips]], colReadOnly:[true,[1],[]]});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,373,498,25],buttonStyle:bsTrans, grid:this.sg1});								
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.bGen.onClick.set(this, "genClick");
			this.cb_ttg.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.clear(1);
			this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fAsuransiTtg.extend(window.childForm);
window.app_eclaim2_master_fAsuransiTtg.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.cb_ttg);	
					this.sg1.clear(1);
					this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);
				}
				break;
				
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from tlk_asuransi_ttg where kode_ttg = '"+this.cb_ttg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						for (var i=0; i < this.sg1.rows.getLength(); i++){
							if (this.sg1.rowValid(i))
								sql.add("insert into tlk_asuransi_ttg (kode_ttg,kode_asuransi,nu,kode_lokasi) values ('"+this.cb_ttg.getText()+"','"+this.sg1.getCell(0,i)+"','"+i+"','"+this.app._lokasi+"')");
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
		this.cb_ttg.setFocus();
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Jenis Asuransi",sender, sender.row, sender.col, 
													  "select kode_asuransi, nama  from tlk_asuransi where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_asuransi) from tlk_asuransi where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("kode_asuransi","nama"),"and",new Array("Kode Asuransi","Deskripsi"),false);
					break;			
			}
		}catch(e)
		{
			systemAPI.alert("[app_eclaim2_master_fAsuransiTtg] : doFindBtnClick : " + e);
		}	
	},
	genClick: function(sender){
		try 
		{
			this.sg1.clear(); 
			setTipeButton(tbSimpan);
			var data = this.dbLib.getDataProvider(" select a.kode_asuransi,a.nama from tlk_asuransi a "+
				"	inner join tlk_asuransi_ttg b on a.kode_asuransi =b.kode_asuransi and a.kode_lokasi=b.kode_lokasi "+
				" where b.kode_ttg = '"+this.cb_ttg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data !== "string"){
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_asuransi,line.nama]);
				}				
			}else {this.sg1.appendRow();}
		} catch(e){
			system.alert(this,e,"");
		}
	},
	FindBtnClick:function(sender, event){
		try
		{
			if (sender == this.cb_ttg) 
			{
				this.standarLib.showListData(this, "Data Tertanggung",this.cb_ttg,undefined, 
											  "select kode_ttg, nama  from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_ttg) from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_ttg","nama"),"and",new Array("Kode Tertanggung","Nama"),false);
				this.sg1.clear(); this.sg1.appendRow();	
			}
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
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
						  this.app._mainForm.pesan(2,"Proses lengkap("+ this.cb_ttg.getText()+" tersimpan.)");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
						break;
				}
			}catch(e)
			{
			   alert("step : "+step+"; error = "+e);
			}    
		}
	}
});
