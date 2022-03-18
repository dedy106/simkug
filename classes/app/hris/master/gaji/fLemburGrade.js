window.app_hris_master_gaji_fLemburGrade = function(owner)
{
	if (owner)
	{
		window.app_hris_master_gaji_fLemburGrade.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_gaji_fLemburGrade";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hak Lembur per Grade", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[10,23,700,433],caption:"Data Tarif Uang Lembur per Grade"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,695,380],colCount:5,tag:0,
		            colTitle:["Grade","Deskripsi","U Lembur","U Makan","U Transport"],
					colWidth:[[4,3,2,1,0],[80,80,80,200,70]],
					columnReadOnly:[true,[0,1],[]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipsClick"],defaultRow:1,autoAppend:true});
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
						"select a.kode_grade,a.nama,b.u_lembur,b.u_makan,b.u_trans "+
						"from  gr_grade a inner join gr_lembur_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.u_lembur),floatToNilai(line.u_makan),floatToNilai(line.u_trans)]);
				}
			} else this.sg.clear(1);				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_gaji_fLemburGrade.extend(window.childForm);
window.app_hris_master_gaji_fLemburGrade.implement({
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
					sql.add("delete from gr_lembur_grade where kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_lembur_grade(kode_grade,u_lembur,u_makan,u_trans,kode_lokasi) values "+
										"	('"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.app._lokasi+"')");
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
					sql.add("delete from gr_lembur_grade where kode_lokasi='"+this.app._lokasi+"'");			
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
										"select a.kode_grade,a.nama,b.u_lembur,b.u_makan,b.u_trans "+
										"from  gr_grade a inner join gr_lembur_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.u_lembur),floatToNilai(line.u_makan),floatToNilai(line.u_trans)]);
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
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Grade",sender,undefined, 
												  "select kode_grade,nama    from gr_grade where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_grade) from gr_grade where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_grade","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});