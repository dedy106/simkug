window.app_eclaim2_master_fProsesKlaim = function(owner){
	if (owner)
	{
		window.app_eclaim2_master_fProsesKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fProsesKlaim";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Proses Klaim", 0);	
		
		uses("saiCBBL;saiGrid");
		this.cb_ttg = new saiCBBL(this,{bound:[20,10,185,20],caption:"Tertanggung", change:[this,"doChange"]});	
		this.bGen = new button(this,{bound:[620,11,80,20],caption:"Tampil Data",click:"doClick"});
		this.p1 = new panel(this,{bound:[20,12,700,400],caption:"Daftar Proses"});						
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,698,350],colCount:3,colTitle:["Kode Proses","Nama","Waktu"],
			colWidth:[[2,1,0],[100,365,100]],buttonStyle:[[0],[bsEllips]], colFormat:[[2],[cfNumeric]],colReadOnly:[true,[1],[]]});	
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
			this.bGen.onClick.set(this, "genClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSgChange");
			this.cb_ttg.onBtnClick.set(this, "FindBtnClick");						
			this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);					
			this.cb_ttg.setSQL("select kode_ttg,nama from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",["kode_ttg","nama"]);
			this.dbLib.getDataProviderA("select kode_proses, nama from tlk_proses where kode_lokasi = '"+this.app._lokasi+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fProsesKlaim.extend(window.childForm);
window.app_eclaim2_master_fProsesKlaim.implement({
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
						sql.add("delete from tlk_waktu where kode_ttg = '"+this.cb_ttg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						for (var i=0; i < this.sg1.rows.getLength(); i++){
							if (this.sg1.rowValid(i))
								sql.add("insert into tlk_waktu(kode_ttg, kode_proses, kode_lokasi, waktu, tgl_input, nik_user)values "+
									"('"+this.cb_ttg.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+parseNilai(this.sg1.cells(2,i))+"',now(),'"+this.app._userLog+"')");						
						}
						this.dbLib.execArraySQL(sql);						
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;			
			case "delete" :
				if (modalResult == mrOk)
				{
					try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from tlk_waktu where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' ");						
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
			break;
		}
		this.cb_ttg.setFocus();
	},	
	genClick: function(sender){	
		try 
		{
			this.sg1.clear(); 
			setTipeButton(tbSimpan);
			var data = this.dbLib.getDataProvider(" select a.kode_proses,b.nama, a.waktu from tlk_waktu a "+
				"	inner join tlk_proses b on a.kode_proses = b.kode_proses and a.kode_lokasi=b.kode_lokasi and a.kode_ttg = b.kode_ttg "+
				" where a.kode_ttg = '"+this.cb_ttg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data !== "string"){
				if (data.rs.rows[0] === undefined) this.sg1.clear(1);
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_proses,line.nama, floatToNilai(line.waktu)]);
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
					this.standarLib.showListDataForSG(this, "Daftar Proses",sender, sender.row, sender.col, 
													  "select kode_proses, nama  from tlk_proses where kode_lokasi='"+this.app._lokasi+"' and kode_ttg= '"+this.cb_ttg.getText()+"' ",
													  "select count(kode_proses) from tlk_proses where kode_lokasi='"+this.app._lokasi+"' and kode_ttg= '"+this.cb_ttg.getText()+"'",
													  new Array("kode_proses","nama"),"and",new Array("Kode Proses","Deskripsi"),false);
					break;			
			}
		}catch(e)
		{
			systemAPI.alert("[app_eclaim2_master_fAsuransiTtg] : doFindBtnClick : " + e);
		}	
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
						this.dataProses = new arrayMap();
						for (var i in result.rs.rows){
							this.dataProses.set(result.rs.rows[i].kode_proses, result.rs.rows[i].nama);
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
		if (sender == this.cb_ttg){
			this.sg1.clear(1);
		}		
	},
	doSgChange: function(sender, col, row){
		if (col == 0 && this.sg1.cells(col, row) != ""){
			var nama = this.dataProses.get(this.sg1.cells(0,row));
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
