window.app_saku3_transaksi_yspt_simak_fParamTarifYpt2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fParamTarifYpt2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fParamTarifYpt2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tarif Biaya Parameter", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_pp = new saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah", readOnly:true, tag:2});				
		this.cb_ta = new saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran", readOnly:true, tag:2,change:[this,"doChange"]});				

		this.pc1 = new pageControl(this,{bound:[5,12,990,410], childPage:["Tk-Akt-Jur","Daftar Tarif Biaya","Data Ref."]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,				
			colTitle:["Kode Tingk","Nama Tingkat","Kode Akt","Angkatan","Kode Jur","Jurusan"],
			colWidth:[[5,4,3,2,1,0],[200,80,200,80,200,80]],
			columnReadOnly:[true,[1,3,5],[0,2,4]],				
			buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 			
			ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
			defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,				
			colTitle:["Kode","Nama","Tarif","Bulan Awal","Bulan Akhir"],
			colWidth:[[4,3,2,1,0],[100,100,100,300,80]],
			columnReadOnly:[true,[1],[0,2,3,4]],				
			buttonStyle:[[0,3,4],[bsEllips,bsAuto,bsAuto]], 			
			checkItem: true,
			colFormat:[[2],[cfNilai]],
			ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
			defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Param",click:[this,"doLoadParam"]});		

		this.cb_tingkat = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Tingkat", multiSelection:false, tag:8,change:[this,"doChange"]});		
		this.cb_akt2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Angkatan", multiSelection:false, tag:8});						
		this.cb_jur = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Jurusan", multiSelection:false, tag:8});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,17,98,20],caption:"Load Ref. Param",click:[this,"doLoad"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);

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
			
			//this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);			
			this.cb_tingkat.setSQL("select a.kode_tingkat, a.nama from sis_tingkat a inner join sis_tingkat_pp b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_akt2.setSQL("select kode_akt, nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			
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
window.app_saku3_transaksi_yspt_simak_fParamTarifYpt2.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fParamTarifYpt2.implement({
	doLoad: function(sender) {		
		if (this.cb_jur.getText() != "" && this.cb_akt2.getText() != "" && this.cb_tingkat.getText() != "") {		
			
			if (this.app._kodePP.substr(4,1) == "B") var filter = " and a.kode_param like '%TK%' ";
			else var filter = " and a.kode_param not like '%TK%' ";

			var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif,isnull(b.bulan1 ,'-') as bulan1, isnull(b.bulan2 ,'-') as bulan2 "+
						 "from sis_param a "+
						  "left join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						  "			and b.kode_akt='"+this.cb_akt2.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
						  "' 		and b.kode_tingkat='"+this.cb_tingkat.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+	
						 "where a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" order by a.idx "; 		
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),line.bulan1,line.bulan2]);
				}
			}
			
			this.sg1.clear();
			this.sg1.appendData([this.cb_tingkat.getText(),"-",this.cb_akt2.getText(),"-",this.cb_jur.getText(),"-"]);
			
			this.modeEdit = true;
			this.doChangeCell1(this.sg1,0,0);
			this.doChangeCell1(this.sg1,2,0);
			this.doChangeCell1(this.sg1,4,0);

			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}
		else  system.alert(this,"Tingkat, Jurusan, dan Angkatan harus terisi.","");
	},
	doLoadParam: function(sender) {		
		if (this.app._kodePP.substr(4,1) == "B") var filter = " and a.kode_param like '%TK%' ";
		else var filter = " and a.kode_param not like '%TK%' ";

		var strSQL = "select a.kode_param,a.nama,0 as tarif "+
					 "from sis_param a "+
					 "where a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" order by a.idx "; 					
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
						sql.add("delete from sis_param_tarif where kode_akt='"+this.sg1.cells(2,j)+"' and kode_tingkat='"+this.sg1.cells(0,j)+"' and kode_jur='"+this.sg1.cells(4,j)+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");								
						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(2,i)) > 0) 							
								sql.add("insert into sis_param_tarif (kode_akt,kode_tingkat,kode_jur,kode_lokasi,kode_pp,kode_param,tarif,bulan1,bulan2) values "+
										"('"+this.sg1.cells(2,j)+"','"+this.sg1.cells(0,j)+"','"+this.sg1.cells(4,j)+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"')");
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
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 
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
		if (sender == this.cb_tingkat && this.cb_tingkat.getText()!="") {			
			var data = this.dbLib.getDataProvider("select top 1 * from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_tingkat ='"+this.cb_tingkat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_akt2.setText(line.kode_akt);
				}
			}
		}	

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

			this.sg.columns.get(3).pickList.clear();
			this.sg.columns.get(4).pickList.clear();
			var j=ix=0;
			for (var i=1;i < 13;i++){
				ix=i;
				if (i <= 9) var bulan = "0"+ix.toString();
				else var bulan = ix.toString();

				if (i > 6) {
					this.sg.columns.get(3).pickList.set(j, this.perAwal.substr(0,4)+bulan);					
					this.sg.columns.get(4).pickList.set(j, this.perAwal.substr(0,4)+bulan);				
				}
				else {
					this.sg.columns.get(3).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				
					this.sg.columns.get(4).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				
				}

				j++;
			}
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataParam.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
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
					if (this.app._kodePP.substr(4,1) == "B") var filter = " and kode_param like '%TK%' ";
					else var filter = " and kode_param not like '%TK%' ";
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
												  "select kode_param,nama    from sis_param where kode_lokasi = '"+this.app._lokasi+"' "+filter,
												  "select count(kode_param)  from sis_param where kode_lokasi = '"+this.app._lokasi+"' "+filter,
												  ["kode_param","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
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
						var data = this.dbLib.getDataProvider("select top 1 kode_akt from sis_angkat where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_tingkat ='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
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
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Tingkat",sender,undefined, 
												  //"select kode_tingkat,nama    from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  //"select count(kode_tingkat)  from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"'",
												  "select a.kode_tingkat, a.nama from sis_tingkat a inner join sis_tingkat_pp b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(*) from (select a.kode_tingkat, a.nama from sis_tingkat a inner join sis_tingkat_pp b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' where a.kode_lokasi='"+this.app._lokasi+"') a",
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