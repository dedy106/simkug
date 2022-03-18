window.app_saku3_transaksi_yspt_simak_fParamTarifKelas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fParamTarifKelas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fParamTarifKelas";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perubahan Tarif Biaya per Kelas", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,220,20],caption:"PP / Unit", readOnly:true, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_jur = new saiCBBL(this,{bound:[20,12,220,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_tingkat = new saiCBBL(this,{bound:[20,13,220,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_kelas = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_akt = new saiCBBL(this,{bound:[20,15,220,20],caption:"Ref. Tarif Akt", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,320], childPage:["Angkatan","Parameter Biaya"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:9,				
					colTitle:["Kode Akt","Angkatan"],
					colWidth:[[1,0],[200,80]],
					columnReadOnly:[true,[1],[0]],				
					buttonStyle:[[0],[bsEllips]], 			
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
					defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-10,this.pc1.height-33],colCount:5,tag:0,				
					colTitle:["Kode","Nama","Tarif","Periode Awal","Periode Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,80,300,120]],
					columnReadOnly:[true,[1],[0,2,3,4]],			
					buttonStyle:[[0,3,4],[bsEllips,bsAuto,bsAuto]], 	
					colFormat:[[2],[cfNilai]],				
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
					defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				

		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			//this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);			
			this.cb_tingkat.setSQL("select a.kode_tingkat, a.nama from sis_tingkat a inner join sis_tingkat_pp b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fParamTarifKelas.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fParamTarifKelas.implement({
	doLoadPeriodeTA : function() {
		var data = this.dbLib.getDataProvider("select substring(convert(varchar,tgl_mulai,112),1,6) as bulanawal, substring(convert(varchar,tgl_akhir,112),1,6) as bulanakhir "+
											  "from sis_ta "+
											  "where flag_aktif ='1' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.perAwal = line.bulanawal;
				this.perAkhir = line.bulanakhir;
			}
		}

		this.sg.columns.get(3).pickList.clear();
		this.sg.columns.get(4).pickList.clear();
		var j=ix=0;
		for (var i=1;i < 13;i++){
			ix=i;
			if (i <= 9) var bulan = "0"+ix.toString();
			else var bulan = ix.toString();

			if (i > 6) this.sg.columns.get(3).pickList.set(j, this.perAwal.substr(0,4)+bulan);
			else this.sg.columns.get(4).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				

			j++;
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var listAkt = "";
					for (var i=0;i < this.sg1.getRowCount();i++){						
						listAkt += ",'"+this.sg1.cells(0,i)+"'";						
					}
					listAkt = listAkt.substr(1);	
					
					sql.add("delete from sis_siswa_tarif where kode_kelas='"+this.cb_kelas.getText()+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_akt in ("+listAkt+") and kode_lokasi='"+this.app._lokasi+"'");
					for (var i=0;i < this.sg.getRowCount();i++){		
						if (nilaiToFloat(this.sg.cells(2,i)) > 0) {	
							sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
									"select nis,kode_kelas,'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_akt "+
									"from sis_siswa where kode_kelas='"+this.cb_kelas.getText()+"' and kode_akt in ("+listAkt+") and kode_lokasi='"+this.app._lokasi+"' ");		
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);										
					setTipeButton(tbSimpan);
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				this.simpan();									
				break;					
		}
	},
	doLoadParam : function(sender){		
		var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif,isnull(b.bulan1 ,'-') as bulan1, isnull(b.bulan2 ,'-') as bulan2 "+
					 "from sis_param a "+	
					 "left join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
					 "			and b.kode_akt='"+this.cb_akt.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
					 "' 		and b.kode_tingkat='"+this.cb_tingkat.getText()+"' and b.kode_pp='"+this.cb_pp.getText()+"' "+	
					 "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),line.bulan1,line.bulan2]);
			}
		}		
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {				
				this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);							
				this.doLoadPeriodeTA();

				var sql = new server_util_arrayList();
				sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("select kode_akt,nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");														
				this.dbLib.getMultiDataProviderA(sql);
			}

			if ((sender == this.cb_pp || this.cb_jur || this.cb_tingkat) && this.cb_pp.getText()!="" && this.cb_jur.getText()!="" && this.cb_tingkat.getText()!="") {				
				this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_jur='"+this.cb_jur.getText()+"' and kode_tingkat='"+this.cb_tingkat.getText()+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
				this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			}

			if ((sender == this.cb_kelas || sender == this.cb_akt)  && this.cb_kelas.getText()!="" && this.cb_akt.getText()!="") {				
				this.doLoadParam();
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var param = this.dataParam.get(sender.cells(0,row));				
				if (param) sender.cells(1,row,param);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkParam");                
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
							"select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_param","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){		
		try {
			sender.onChange.set(undefined,undefined);		
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var akt = this.dataAkt.get(sender.cells(0,row));				
					if (akt) {
						sender.cells(1,row,akt);					
					}
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Angkatan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}
			sender.onChange.set(this,"doChangeCell1");	
		}
		catch(e) {
			alert(e);
		}	
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Angkatan",sender,undefined, 
												  "select kode_akt,nama     from sis_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
												  "select count(kode_akt)   from sis_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
												  ["kode_akt","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");														
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();																					
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