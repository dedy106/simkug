window.app_saku3_transaksi_siswa_fSiswaParam = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswaParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSiswaParam";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Parameter", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_tingkat = new saiCBBL(this,{bound:[20,10,200,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});	
		this.cb_kelas = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kelas", multiSelection:false, maxLength:11, tag:1,change:[this,"doChange"]});		
		this.cb_siswa = new saiCBBL(this,{bound:[20,12,200,20],caption:"NIS", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.c_tahun1 = new saiCB(this,{bound:[20,13,180,20],caption:"Periode Awal",readOnly:true,tag:2});
		this.c_bulan1 = new saiCB(this,{bound:[220,13,60,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.c_tahun2 = new saiCB(this,{bound:[20,14,180,20],caption:"Periode Akhir",readOnly:true,tag:2});
		this.c_bulan2 = new saiCB(this,{bound:[220,14,60,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.bGen = new button(this,{bound:[720,14,80,18],caption:"Gen by Kelas",click:[this,"doGen"]});			
		
		this.p1 = new panel(this,{bound:[20,23,800,380],caption:"Daftar Tarif Parameter"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,				
				colTitle:["Kode","Nama","Tarif","Per Awal","Per Akhir"],
				colWidth:[[4,3,2,1,0],[60,60,100,300,80]],
				columnReadOnly:[true,[1],[0,2,3,4]],				
				buttonStyle:[[0],[bsEllips]], 
				colFormat:[[2],[cfNilai]],
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
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'");		
			this.dbLib.getMultiDataProviderA(sql);
			
			this.c_tahun1.items.clear();
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun1.addItem(i,line.tahun);
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			this.c_bulan1.setText("07");
			this.c_bulan2.setText("06");
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun1.setText(line.tahun);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSiswaParam.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSiswaParam.implement({
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
					sql.add("delete from sis_siswa_tarif where nis='"+this.cb_siswa.getText()+"' and kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_tingkat='"+this.cb_tingkat.getText()+"'");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_tingkat) values "+
							        "('"+this.cb_siswa.getText()+"','"+this.cb_kelas.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.cb_tingkat.getText()+"')");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kelas);
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
			if (sender == this.cb_tingkat && this.cb_tingkat.getText() != ""){			
				this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_tingkat='"+this.cb_tingkat.getText()+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
				this.cb_siswa.setSQL("select nis, nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_tingkat='"+this.cb_tingkat.getText()+"'",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa",true);				
			}
			
			
			if (sender == this.cb_siswa && this.cb_siswa.getText() != ""){	
				var strSQL = "select a.kode_param,b.nama,a.tarif,a.per_awal,a.per_akhir "+
				             "from sis_siswa_tarif a "+
							 "inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+						   
						     "where a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_param";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),line.per_awal,line.per_akhir]);
					}
				} 
				else {
					var strSQL = "select a.kode_param,a.nama,b.tarif,'"+this.c_tahun1.getText()+this.c_bulan1.getText()+"' as per_awal,'"+this.c_tahun2.getText()+this.c_bulan2.getText()+"' as per_akhir "+
					             "from sis_param a inner join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+						 
								 "where b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_param";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),line.per_awal,line.per_akhir]);
						}
					} else this.sg.clear(1);									
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doGen: function(sender){		
		if (this.cb_tingkat.getText() != "" && this.c_tahun1.getText() != "" && this.c_tahun2.getText() != "" && this.c_bulan1.getText() != "" && this.c_bulan2.getText() != "") {			
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();			
			sql.add("delete from sis_siswa_tarif where kode_tingkat = '"+this.cb_tingkat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			
			sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_tingkat) "+
					"select a.nis,b.kode_kelas,b.kode_param,'"+this.c_tahun1.getText()+this.c_bulan1.getText()+"','"+this.c_tahun2.getText()+this.c_bulan2.getText()+"',b.tarif,a.kode_lokasi,'"+this.cb_tingkat.getText()+"' "+
					"from sis_siswa a inner join sis_param_tarif b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_tingkat='"+this.cb_tingkat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_kelas='"+this.cb_kelas.getText()+"'");
			
			setTipeButton(tbAllFalse);
			this.dbLib.execArraySQL(sql);
		}
		else {
			system.alert(this,"Kelas,periode tidak valid.","Pilih data kelas dan periode.");			
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataParam.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);				
					var data = this.dbLib.getDataProvider("select tarif from sis_param_tarif where kode_kelas='"+this.cb_kelas.getText()+"' and kode_param='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){					
							sender.cells(2,row,parseFloat(line.tarif));
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
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
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
												  "select kode_param,nama    from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_param)  from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_param","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kelas.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataParam.set(line.kode_param, line.nama);
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