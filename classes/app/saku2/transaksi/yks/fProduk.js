window.app_saku2_transaksi_yks_fProduk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fProduk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kode Biaya", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,900,450],caption:"Daftar Kode Biaya"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,400],colCount:9,tag:0,
		            colTitle:["Kode Biaya","Nama","Akun Piu BP","Akun Piu Lainnya","Akun CC","Akun TAK BP","Akun TAK CC","Kode DRK BP","Kode DRK CC"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,80,80,100,100,150,70]],
					defaultRow:1,
					autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,425,899,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider(
						"select kode_produk,nama,akun_bp,akun_ap,akun_cc,akun_takbp,akun_takcc,kode_drkbp,kode_drkcc "+
						"from yk_produk "+
						"order by kode_produk",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_produk,line.nama,line.akun_bp,line.akun_ap,line.akun_cc,line.akun_takbp,line.akun_takcc,line.kode_drkbp,line.kode_drkcc]);									         
				}
			} else this.sg.clear(1);	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fProduk.extend(window.childForm);
window.app_saku2_transaksi_yks_fProduk.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_produk ");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_produk(kode_lokasi,kode_produk,nama,akun_bp,akun_ap,akun_cc,akun_takbp,akun_takcc,kode_drkbp,kode_drkcc) values "+
										"	('99','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"')");
							}
						}
					}					
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");														
							var data = this.dbLib.getDataProvider(
										"select kode_produk,nama,akun_bp,akun_ap,akun_cc,akun_takbp,akun_takcc,kode_drkbp,kode_drkcc "+
										"from yk_produk "+
										"order by kode_produk",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.kode_produk,line.nama,line.akun_bp,line.akun_ap,line.akun_cc,line.akun_takbp,line.akun_takcc,line.kode_drkbp,line.kode_drkcc]);
								}
							} else this.sg.clear(1);	
							setTipeButton(tbUbahHapus);
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});