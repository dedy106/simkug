window.app_saku3_transaksi_tarbak_simak_fParamTarifAdd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fParamTarifAdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fParamTarifAdd";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tarif Biaya Parameter Tambahan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_pp = new saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah", readOnly:true, tag:2});				
		this.cb_ta = new saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran", readOnly:true, tag:2,change:[this,"doChange"]});				
		this.cb_param = new saiCBBL(this,{bound:[20,12,220,20],caption:"Parameter", multiSelection:false, maxLength:10, tag:2});				

		this.pc1 = new pageControl(this,{bound:[5,22,990,390], childPage:["Tk-Akt-Jur"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,				
			colTitle:["Kode Tingk","Nama Tingkat","Kode Akt","Angkatan","Kode Jur","Jurusan","Tarif","Bulan Awal","Bulan Akhir"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,200,80,200,80,200,80]],
			columnReadOnly:[true,[1,3,5,7,8],[0,2,4,6]],		
			colFormat:[[6],[cfNilai]],		
			buttonStyle:[[0,2,4,7,8],[bsEllips,bsEllips,bsEllips,bsAuto,bsAuto]], 			
			ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
			defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		

		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where flag_aktif='1' and  kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Data TA",true);			
			this.cb_param.setSQL("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Deskripsi"],"and","Data Parameter",true);			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'");					
			sql.add("select kode_tingkat,nama from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'");		
			sql.add("select kode_jur,nama from sis_jur where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");		
			sql.add("select kode_akt,nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'");		
			this.dbLib.getMultiDataProviderA(sql);
			
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select kode_ta from sis_ta where flag_aktif ='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_ta.setText(line.kode_ta);
				}
			}			
			
			this.modeEdit = false;

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fParamTarifAdd.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fParamTarifAdd.implement({	
	doLoadParam: function(sender) {
		var strSQL = "select a.kode_param,a.nama,0 as tarif "+
					 "from sis_param a "+
					 "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),this.perAwal,this.perAkhir]);
			}
		}
	},
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					for (var j=0;j < this.sg1.getRowCount();j++){
						sql.add("delete from sis_param_tarif where kode_param='"+this.cb_param.getText()+"' and kode_akt='"+this.sg1.cells(2,j)+"' and kode_tingkat='"+this.sg1.cells(0,j)+"' and kode_jur='"+this.sg1.cells(4,j)+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");														
						sql.add("delete from sis_siswa_tarif where kode_param='"+this.cb_param.getText()+"' and kode_akt='"+this.sg1.cells(2,j)+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' "+
								"and kode_kelas in ("+
								"	select kode_kelas "+
								"	from sis_kelas where kode_tingkat='"+this.sg1.cells(0,j)+"' and kode_jur='"+this.sg1.cells(4,j)+"' and kode_lokasi='"+this.app._lokasi+"' "+
								"	) ");														

						sql.add("insert into sis_param_tarif (kode_akt,kode_tingkat,kode_jur,kode_lokasi,kode_pp,kode_param,tarif,bulan1,bulan2) values "+
								"('"+this.sg1.cells(2,j)+"','"+this.sg1.cells(0,j)+"','"+this.sg1.cells(4,j)+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_param.getText()+"',"+nilaiToFloat(this.sg1.cells(6,j))+",'"+this.sg1.cells(7,j)+"','"+this.sg1.cells(8,j)+"')");

						sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
								"select a.nis,a.kode_kelas,b.kode_param,b.bulan1,b.bulan2,b.tarif,a.kode_lokasi,a.kode_pp,a.kode_akt "+
								"from sis_siswa a "+
								"				  inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"				  inner join sis_param_tarif b on  a.kode_akt=b.kode_akt and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_tingkat=c.kode_tingkat and b.kode_jur=c.kode_jur "+							
								"				  inner join sis_siswa_status xx on a.flag_aktif=xx.kode_ss and a.kode_pp=xx.kode_pp and a.kode_lokasi=xx.kode_lokasi  "+
								"where b.kode_param='"+this.cb_param.getText()+"' and a.kode_akt='"+this.sg1.cells(2,j)+"' and c.kode_tingkat='"+this.sg1.cells(0,j)+"' and c.kode_jur='"+this.sg1.cells(4,j)+"' "+
								"      and xx.flag_aktif='1' and a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"'");						
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);					
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.modeEdit = false;
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange: function(sender){		
		if (sender == this.cb_ta && this.cb_ta.getText()!="") {
			var data = this.dbLib.getDataProvider("select substring(convert(varchar,tgl_mulai,112),1,6) as bulanawal, substring(convert(varchar,tgl_akhir,112),1,6) as bulanakhir "+
												  "from sis_ta "+
												  "where flag_aktif ='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perAwal = line.bulanawal;
					this.perAkhir = line.bulanakhir;
				}
			}

			this.sg1.columns.get(7).pickList.clear();
			this.sg1.columns.get(8).pickList.clear();
			var j=ix=0;
			for (var i=1;i < 13;i++){
				ix=i;
				if (i <= 9) var bulan = "0"+ix.toString();
				else var bulan = ix.toString();

				if (i > 6) {
					this.sg1.columns.get(7).pickList.set(j, this.perAwal.substr(0,4)+bulan);					
					this.sg1.columns.get(8).pickList.set(j, this.perAwal.substr(0,4)+bulan);				
				}
				else {
					this.sg1.columns.get(7).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				
					this.sg1.columns.get(8).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				
				}

				j++;
			}
		}
	},	
	doChangeCell1: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var tingkat = this.dataTk.get(sender.cells(0,row));
				if (tingkat) {
					sender.cells(1,row,tingkat);	

					if (!this.modeEdit) {
						var data = this.dbLib.getDataProvider("select top 1 kode_akt from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_tingkat ='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								sender.cells(2,row,line.kode_akt);
							}
						}
					}		

				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tingkat "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}

	    if (col == 2) {
			if (sender.cells(2,row) != "") {
				var akt = this.dataAkt.get(sender.cells(2,row));
				if (akt) {
					sender.cells(3,row,akt);					
				}
				else {                                    
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Angkatan "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}

		if (col == 4) {
			if (sender.cells(4,row) != "") {
				var jur = this.dataJur.get(sender.cells(4,row));
				if (jur) {
					sender.cells(5,row,jur);					
				}
				else {                                    
					if (trim(sender.cells(4,row)) != "") system.alert(this,"Kode Jurusan "+sender.cells(4,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(4,row,"");
					sender.cells(5,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		


		if (col == 0 || col == 2 || col == 4) {
			if (sender.cells(0,row) != "" && sender.cells(2,row) != "" && sender.cells(4,row) != "" && this.cb_param.getText()!="") {
				var data = this.dbLib.getDataProvider("select tarif from sis_param_tarif where kode_pp='"+this.app._kodePP+"' and kode_param='"+this.cb_param.getText()+"' and kode_tingkat ='"+sender.cells(0,row)+"' and kode_akt ='"+sender.cells(2,row)+"' and kode_jur ='"+sender.cells(4,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						sender.cells(6,row,line.tarif);
					}
				}
			}
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Tingkat",sender,undefined, 
												  "select kode_tingkat,nama    from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_tingkat)  from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_tingkat","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Angkatan",sender,undefined, 
												  "select kode_akt,nama     from sis_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
												  "select count(kode_akt)   from sis_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
												  ["kode_akt","nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Jurusan",sender,undefined, 
												  "select kode_jur,nama    from sis_jur where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
												  "select count(kode_jur)  from sis_jur where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
												  ["kode_jur","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();								
							this.dataTk = new portalui_arrayMap();	
							this.dataJur = new portalui_arrayMap();		
							this.dataAkt = new portalui_arrayMap();													
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataParam.set(line.kode_param, line.nama);
								}
							}							
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataTk.set(line.kode_tingkat, line.nama);
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataJur.set(line.kode_jur, line.nama);
								}
							}	
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];
									this.dataAkt.set(line.kode_akt, line.nama);
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