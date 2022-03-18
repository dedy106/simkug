window.app_eclaim2_master_fKotaLokasi = function(owner){
	if (owner)
	{
		window.app_eclaim2_master_fKotaLokasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fKotaLokasi";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Kota", 0);	
		
		uses("saiCBBL;saiGrid");
		this.cb_ttg = new saiCBBL(this,{bound:[20,10,185,20],caption:"Tertanggung", change:[this,"doChange"], multiSelection:false});
		this.cb_kota = new saiCBBL(this,{bound:[20,11,185,20],caption:"Kota", change:[this,"doChange"], multiSelection:false});
		this.bGen = new button(this,{bound:[620,11,80,20],caption:"Tampil Data",click:"doClick"});
		this.p1 = new panel(this,{bound:[20,12,700,400],caption:"Lokasi"});						
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,698,350],colCount:2,colTitle:["Kode Lokasi","Deskripsi"],
			colWidth:[[1,0],[365,100]],buttonStyle:[[0],[bsEllips]],colReadOnly:[true,[1],[]]});	
		this.sgn = new sgNavigator(this.p1,{bound:[1,373,698,25],buttonStyle:bsTrans, grid:this.sg1});							
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
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSgChange");
			this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);		
			this.cb_ttg.setSQL("select kode_ttg,nama from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",["kode_ttg","nama"]);			
			this.dbLib.getDataProviderA("select kode_lok, nama from tlk_lokasi where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fKotaLokasi.extend(window.childForm);
window.app_eclaim2_master_fKotaLokasi.implement({
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
		if (modalResult != mrOk) return;
		switch (event)
		{
			case "clear" :
				this.standarLib.clearByTag(this, new Array("0"),this.cb_ttg);	
				this.sg1.clear(1);
				this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);
			break;				
			case "simpan" :
				try{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from tlk_lokasi_kota where kode_ttg = '"+this.cb_ttg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_kota = '"+this.cb_kota.getText()+"' ");
					for (var i=0; i < this.sg1.rows.getLength(); i++){
						if (this.sg1.rowValid(i))
							sql.add("insert into tlk_lokasi_kota(nu,kode_ttg,kode_kota,kode_lok,kode_lokasi,tgl_input, nik_user) values "+
							" ("+i+",'"+this.cb_ttg.getText()+"','"+this.cb_kota.getText()+"', '"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"')");
					}
					this.dbLib.execArraySQL(sql);						
				}catch(e){
					system.alert(this, e,"");
				}
			break;			
			case "hapus":
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("delete from tlk_lokasi_kota where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' and kode_kota= '"+this.cb_kota.getText()+"' ");
				this.dbLib.execArraySQL(sql);	
			break;
		}
		this.cb_ttg.setFocus();
	},		
	FindBtnClick:function(sender, event){
		try
		{
			if (sender == this.cb_ttg) 
			{
				this.standarLib.showListData(this, "Data Tertanggung",sender,undefined, 
											  "select kode_ttg, nama  from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_ttg) from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_ttg","nama"),"and",new Array("Kode Tertanggung","Nama"),false);	
			}			
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick: function(sender){
		try 
		{
			this.sg1.clear(); 
			setTipeButton(tbSimpan);
			var data = this.dbLib.getDataProvider(" select a.kode_lok,b.nama from tlk_lokasi_kota a "+
				"	inner join tlk_lokasi b on a.kode_lok =b.kode_lok and a.kode_lokasi=b.kode_lokasi "+
				" where a.kode_ttg = '"+this.cb_ttg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_kota = '"+this.cb_kota.getText()+"' order by a.nu",true);
			if (typeof data !== "string"){
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_lok,line.nama]);
				}				
			}else {this.sg1.appendRow();}
		} catch(e){
			system.alert(this,e,"");
		}
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Lokasi",sender, sender.row, sender.col, 
													  "select kode_lok, nama  from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' ",
													  "select count(kode_lok) from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' ",
													  new Array("kode_lok","nama"),"and",new Array("Kode Lokasi","Deskripsi"),false);
					break;				
			}
		}catch(e)
		{
			systemAPI.alert("[app_eclaim2_master_fAsuransiTtg] : doFindBtnClick : " + e);
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
						  this.app._mainForm.pesan(2,"Proses Lengkap ("+ this.cb_ttg.getText()+" tersimpan.)");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
					break;
					case "getDataProvider":
						result = JSON.parse(result);
						this.dataLokasi = new arrayMap();
						for (var i in result.rs.rows){
							this.dataLokasi.set(result.rs.rows[i].kode_lok, result.rs.rows[i].nama);
						}
					break;
				}
			}catch(e)
			{
			   alert("step : "+step+"; error = "+e);
			}    
		}
	},
	doChange: function(sender){
		this.sg1.clear(1);
		if (sender == this.cb_ttg){
			this.cb_kota.setSQL("select kode_kota, nama from tlk_kota where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+sender.getText()+"' ", ["kode_kota", "nama"]);
		}
	},
	doSgChange: function(sender, col, row){
		if (col == 0 && this.sg1.cells(col, row) != ""){
			var nama = this.dataAsuransi.get(this.sg1.cells(0,row));
			if (nama)
				this.sg1.cells(1,row, nama);
			else {
				this.sg1.onChange.set(this,undefined);
				systemAPI.alert(this.sg1.cells(0,row) +" tidak ada dalam daftar" );
				this.sg1.cells(0,row,"");
				this.sg1.onChange.set(this,"doSgChange");
			}
		}
	}
});
