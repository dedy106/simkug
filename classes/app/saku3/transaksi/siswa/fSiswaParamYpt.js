window.app_saku3_transaksi_siswa_fSiswaParamYpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswaParamYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSiswaParamYpt";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Parameter", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
	
		this.cb_pp = new saiCBBL(this,{bound:[20,10,230,20],caption:"Sekolah", readOnly:true, tag:2, change:[this,"doChange"],change:[this,"doChange"]});
		this.c_tahun1 = new saiCB(this,{bound:[20,13,210,20],caption:"Periode Awal",readOnly:true,tag:2});
		this.c_bulan1 = new saiCB(this,{bound:[250,13,60,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.c_tahun2 = new saiCB(this,{bound:[20,14,210,20],caption:"Periode Akhir",readOnly:true,tag:2});
		this.c_bulan2 = new saiCB(this,{bound:[250,14,60,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		
		this.pc1 = new pageControl(this,{bound:[5,12,890,375], childPage:["Per Siswa","Per Tarif"]});

		this.cb_kelas = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,230,20],caption:"Kelas", multiSelection:false, maxLength:11, tag:1,change:[this,"doChange"]});		
		this.cb_siswa = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,230,20],caption:"NIS", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
			
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-88],colCount:5,tag:9,				
				colTitle:["Kode","Nama","Tarif","Per Awal","Per Akhir"],
				colWidth:[[4,3,2,1,0],[100,100,100,300,120]],
				columnReadOnly:[true,[1],[0,2,3,4]],				
				buttonStyle:[[0],[bsEllips]], 
				colFormat:[[2],[cfNilai]],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.cb_jur = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,230,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:9});
		this.cb_tingkat = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,230,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:9});
		this.cb_akt = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,230,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:9});		
		
		this.bGen = new button(this.pc1.childPage[1],{bound:[770,15,100,18],caption:"Gen - Simpan",click:[this,"doGen"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,263],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,120]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);	
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

			this.stsGen = 0;
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSiswaParamYpt.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSiswaParamYpt.implement({
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
					sql.add("delete from sis_siswa_tarif where nis='"+this.cb_siswa.getText()+"' and kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(2,i)) >= 0) 
							sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) values "+
									"('"+this.cb_siswa.getText()+"','"+this.cb_kelas.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.kodeAkt+"')");					
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
					if (this.stsGen == 0) setTipeButton(tbSimpan);
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
			if (sender == this.cb_pp && this.cb_pp.getText() != ""){			
				this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_pp='"+this.cb_pp.getText()+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			}
			if (sender == this.cb_kelas && this.cb_kelas.getText() != ""){			
				this.cb_siswa.setSQL("select nis, nama from sis_siswa where  kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_kelas='"+this.cb_kelas.getText()+"'",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa",true);				
			}
			
			if (sender == this.cb_siswa && this.cb_siswa.getText() != ""){					
				var data = this.dbLib.getDataProvider("select kode_akt from sis_siswa where nis='"+this.cb_siswa.getText()+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.kodeAkt = line.kode_akt;														
					}					
				}
				
				var strSQL = "select a.kode_param,b.nama,a.tarif,a.per_awal,a.per_akhir "+
				             "from sis_siswa_tarif a "+
							 "inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi  "+						   
						     "where a.kode_akt='"+this.kodeAkt+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.kode_param";				
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
								 "where b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_akt='"+this.kodeAkt+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx";							
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
		this.cb_kelas.setTag("9");
		this.cb_siswa.setTag("9");

		this.stsGen = 1;		
		if (this.cb_pp.getText() != "" && this.cb_jur.getText() != "" && this.cb_tingkat.getText() != "" && this.cb_akt.getText() != "" && this.c_tahun1.getText() != "" && this.c_tahun2.getText() != "" && this.c_bulan1.getText() != "" && this.c_bulan2.getText() != "") {			
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();	
			
			var listParam = "";
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i)){
					listParam += ",'"+this.sg1.cells(0,i)+"'";				
				}
			}
			listParam = listParam.substr(1);	

			if(listParam != ""){
				sql.add("delete from sis_siswa_tarif where kode_param in ("+listParam+") and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nis in "+
						"( "+
						"    select a.nis from sis_siswa a inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"    where a.kode_akt='"+this.cb_akt.getText()+"' and b.kode_tingkat='"+this.cb_tingkat.getText()+"' "+
						"    and b.kode_jur='"+this.cb_jur.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
						") ");
				
				sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
						"select a.nis,c.kode_kelas,b.kode_param,'"+this.c_tahun1.getText()+this.c_bulan1.getText()+"','"+this.c_tahun2.getText()+this.c_bulan2.getText()+"',b.tarif,a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt "+
						"from sis_siswa a inner join sis_param_tarif b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.kode_kelas=b.kode_kelas and a.kode_akt=b.kode_akt and b.kode_param in ("+listParam+") "+
						"                 inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"where a.flag_aktif='1' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.kode_jur='"+this.cb_jur.getText()+"' and a.kode_akt='"+this.cb_akt.getText()+"' and c.kode_tingkat='"+this.cb_tingkat.getText()+"' ");
				
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				this.sg1.clear(1);				
				this.cb_tingkat.clear(1);
				this.cb_jur.clear(1);
				this.cb_akt.clear(1);
			}
			else {
				system.alert(this,"Parameter tarif tidak valid.","Pilih data.");			
			}
		}
		else {
			system.alert(this,"PP,Jurusan,Angkatan,Tingkat,Periode tidak valid.","Pilih data.");			
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataParam.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);				
					var data = this.dbLib.getDataProvider("select tarif from sis_param_tarif where kode_akt='"+this.kodeAkt+"' and kode_kelas='"+this.cb_kelas.getText()+"' and kode_param='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
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
				if (this.cb_siswa.getText() != "") {
					if (col == 0){
						this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
													"select kode_param,nama    from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
													"select count(kode_param)  from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
													["kode_param","nama"],"and",["Kode","Nama"],false);				
					}	
				}			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},

	doEllipsClick1: function(sender, col, row){
		try{							
			if (sender == this.sg1) {
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