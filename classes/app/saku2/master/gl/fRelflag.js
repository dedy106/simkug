window.app_saku2_master_gl_fRelflag = function(owner){
	if (owner)
	{
		window.app_saku2_master_gl_fRelflag.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_master_gl_fRelflag";
		this.setTop(60);
		
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Jenis Flag Akun", 0);	
		this.maximize();
		uses("saiCBBL;saiGrid");
		this.ed_kode = new saiCBBL(this,{bound:[20,11,185,20], caption:"Jenis Flag"});				
		this.cb_lokasi = new saiCBBL(this,{bound:[20,12,185,20], caption:"Lokasi Perusahaan", tag:9});						
		this.bGen = new button(this,{bound:[435,12,80,20], caption:"Tampil Data"});				
		this.p1 = new panel(this, {bound:[20,13,500,400], caption:"Akun yang terelasi"});				
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,495,350], colCount:2, colTitle:["Kode Akun","Deskripsi"],
				colWidth:[[1,0],[365,100]], buttonStyle:[[0],[bsEllips]], colReadOnly:[true,[1],[]]
			});							
		this.sgn = new sgNavigator(this.p1,{bound:[1,373,495,25], grid:this.sg1, buttonStyle:2});		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);		
			this.standarLib = new util_standar();						
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.clear(1);
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_master_gl_fRelflag.extend(window.childForm);
window.app_saku2_master_gl_fRelflag.implement({
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
					this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);	
					this.sg1.clear(); this.sg1.appendRow();
				}
				break;
				
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from flag_relasi where kode_flag='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						for (var i=0; i < this.sg1.rows.getLength(); i++)
						{
							sql.add("insert into flag_relasi (kode_flag,kode_akun,kode_lokasi) values ('"+this.ed_kode.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.cb_lokasi.getText()+"')");
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
		this.ed_kode.setFocus();
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Master Akun",this.sg1, this.sg1.row, this.sg1.col, 
													  "select kode_akun, nama  from masakun where block='0' and kode_lokasi='"+this.cb_lokasi.getText()+"'",
													  "select count(kode_akun) from masakun where block='0' and kode_lokasi='"+this.cb_lokasi.getText()+"'",
													  new Array("kode_akun","nama"),"and",new Array("Kode Akun","Deskripsi"),false);
					break;			
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku2_master_gl_fRelflag] : doFindBtnClick : " + e);
		}	
	},
	genClick: function(sender){
		try 
		{
			this.sg1.clear(); 
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL(" select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										 " where b.kode_flag = '"+this.ed_kode.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"'");
			if (data instanceof arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1),
							new Array(line.get("kode_akun"),line.get("nama")));					
					}
				} else {this.sg1.appendRow();}
			}else {this.sg1.appendRow();}
		} catch(e){
			system.alert(this,e,"");
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Data Flag Akun",this.ed_kode,undefined, 
											  "select kode_flag, nama  from flag_akun",
											  "select count(kode_flag) from flag_akun",
											  new Array("kode_flag","nama"),"where",new Array("Kode Flag","Deskripsi"),false);
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
						  this.app._mainForm.pesan(2,"Proses Lengkap (relasi flag akun : "+ this.ed_kode.getText()+" tersimpan.)");
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
