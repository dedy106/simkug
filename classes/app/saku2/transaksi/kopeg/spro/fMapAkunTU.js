window.app_saku2_transaksi_kopeg_spro_fMapAkunTU = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fMapAkunTU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fMapAkunTU";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Flag Akun : Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_akun = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Baru", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,16,200,20],caption:"Kode Lokasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		
		this.p1 = new panel(this,{bound:[20,23,500,420],caption:"Daftar Akun Lama"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
				
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='77'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Baru",true);
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('01','02','04','06')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fMapAkunTU.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fMapAkunTU.implement({
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from xakuntu where akun_baru = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");																		
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into xakuntu (akun_baru,kode_lokasi,akun_lama) values ('"+this.cb_akun.getText()+"','"+this.cb_lokasi.getText()+"','"+this.sg.cells(0,i)+"')");
					}					
					sql.add("update a set a.kode_akun=b.akun_baru "+
							"from gldt_h a "+
							"inner join xakuntu b on a.kode_cust=b.akun_lama and b.kode_lokasi=a.kode_lokarea "+
							"where a.kode_lokasi='11'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_akun);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},		
	doChange: function(sender){
		try{			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText()!=""){									
				var sql = new server_util_arrayList();				
				sql.add("select kode_akun,nama from masakun where kode_lokasi = '"+this.cb_lokasi.getText()+"'");						
				this.dbLib.getMultiDataProviderA(sql);
			}
			if ((sender == this.cb_akun || sender == this.cb_lokasi) && this.cb_akun.getText() != "" && this.cb_lokasi.getText()!=""){						
				var strSQL = "select a.kode_akun,a.nama from masakun a inner join xakuntu b on a.kode_akun=b.akun_lama and a.kode_lokasi=b.kode_lokasi "+						 
							 "where b.akun_baru='"+this.cb_akun.getText()+"' and b.kode_lokasi = '"+this.cb_lokasi.getText()+"' order by b.akun_lama";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama]);
					}
				} else this.sg.clear(1);									
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.cb_lokasi.getText()+"'",
						"select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.cb_lokasi.getText()+"'",
						["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Mapping dan Update transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}													
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});