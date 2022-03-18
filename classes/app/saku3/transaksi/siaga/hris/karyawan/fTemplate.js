window.app_saku3_transaksi_siaga_hris_karyawan_fTemplate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fTemplate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fTemplate";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Template", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_flag = new saiCBBL(this,{bound:[20,15,200,20],caption:"Kode Template", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,700,450],caption:"Daftar Template"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,				
				colTitle:["Kode Kolom","Kode Klp","Kode Table","Nama","Lebar Kolom"],
				colWidth:[[4,3,2,1,0],[80,200,80,80,80]],
				// change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_flag.setSQL("select kode_jenis, nama from gr_kolom_jenis_m",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Kolom",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fTemplate.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fTemplate.implement({
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
					sql.add("delete from gr_kolom_jenis_d where kode_jenis = '"+this.cb_flag.getText()+"'");								
					var data = this.dbLib.getDataProvider("select kode_lokasi from lokasi where flag_konsol='0'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];														
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)) 
									sql.add("insert into gr_kolom_jenis_d (kode_jenis,kode_kolom,kode_lokasi,kode_klp,nu) values ('"+this.cb_flag.getText()+"','"+this.sg.cells(0,i)+"','"+line.kode_lokasi+"','"+this.sg.cells(1,i)+"',"+i+")");
                                    sql.add("insert into gr_kolom (kode_lokasi,kode_kolom,kode_klp,kode_tabel,nama,lebar,nu) values ('"+line.kode_lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+this.sg.cells(4,i)+","+i+")");
                           
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_flag);
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
			if (this.cb_flag.getText() != ""){						
				var strSQL = "select a.kode_kolom,a.nama,a.kode_klp,a.kode_tabel,lebar from gr_kolom a left JOIN gr_kolom_jenis_d b on a.kode_kolom=b.kode_kolom "+						 
				 " where b.kode_jenis='"+this.cb_flag.getText()+"' order by a.nu desc ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_kolom,line.kode_kolom,line.kode_tabel,line.nama,line.lebar]);
					}
				} else this.sg.clear(1);									
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	// doChangeCell: function(sender, col, row){		
	// 	sender.onChange.set(undefined,undefined);
	//     if (col == 0) {
	// 		if (sender.cells(0,row) != "") {
	// 			var akun = this.dataAkun.get(sender.cells(0,row));
	// 			if (akun) sender.cells(1,row,akun);
	// 			else {                                    
	// 				if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Kolom "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
	// 				sender.cells(0,row,"");
	// 				sender.cells(1,row,"");
	// 			}				
	// 		}
	// 	}		
	// 	sender.onChange.set(this,"doChangeCell");		
	// },
	// doEllipsClick: function(sender, col, row){
	// 	try{			
	// 		if (sender == this.sg) {
	// 			if (col == 0){
	// 				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
	// 											  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
	// 											  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
	// 											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
	// 			}				
	// 		}
	// 	}catch(e){
	// 		systemAPI.alert(e);
	// 	}
	// },
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_flag.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});