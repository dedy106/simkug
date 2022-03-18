window.app_saku3_transaksi_siaga_hris_gaji_fLembur = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fLembur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fLembur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Uang Lembur", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,500,433],caption:"Data Tarif Uang Lembur per Grade"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,495,380],colCount:4,tag:0,
		            colTitle:["Jenis","Jam Awal","Jam Akhir","Pengali Gaji"],
					colWidth:[[3,2,1,0],[80,80,80,70]],
					columnReadOnly:[true,[0],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["HK","HL"]})]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,499,25],buttonStyle:2,grid:this.sg});
			
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
						"select jenis,jam_awal,jam_akhir,pengali "+
						"from   gr_lembur_param where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.jenis,floatToNilai(line.jam_awal),floatToNilai(line.jam_akhir),floatToNilai(line.pengali)]);
				}
			} else this.sg.clear(1);				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fLembur.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fLembur.implement({
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
					sql.add("delete from gr_lembur_param where kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_lembur_param(jenis,jam_awal,jam_akhir,pengali,kode_lokasi) values "+
										"	('"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(1,i))+","+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+",'"+this.app._lokasi+"')");
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
					sql.add("delete from gr_lembur_param where kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),undefined);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
										"select jenis,jam_awal,jam_akhir,pengali "+
										"from   gr_lembur_param where kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.jenis,floatToNilai(line.jam_awal),floatToNilai(line.jam_akhir),floatToNilai(line.pengali)]);
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