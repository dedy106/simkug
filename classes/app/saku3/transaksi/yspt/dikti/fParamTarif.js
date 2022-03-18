window.app_saku3_transaksi_yspt_dikti_fParamTarif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fParamTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fParamTarif";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tarif Biaya Parameter", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_ta = new saiCBBL(this,{bound:[20,11,220,20],caption:"Periode Akademik", tag:2, multiSelection:false, change:[this,"doChange"]});				

		this.pc1 = new pageControl(this,{bound:[5,12,990,410], childPage:["Akt-Jur-Kelas","Daftar Tarif Biaya","Data Ref."]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,				
			colTitle:["Kode Akt","Angkatan","Kode Jur","Jurusan","Kode Jalur","Kelas/Jalur"],
			colWidth:[[5,4,3,2,1,0],[200,80,200,80,200,80]],
			columnReadOnly:[true,[1,3,5],[0,2,4]],				
			buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 			
			ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
			defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,				
			colTitle:["Kode","Nama","Tarif"],
			colWidth:[[2,1,0],[100,300,80]],
			columnReadOnly:[true,[1],[0,2]],				
			buttonStyle:[[0],[bsEllips]], 			
			checkItem: true,
			colFormat:[[2],[cfNilai]],
			ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
			defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Param",click:[this,"doLoadParam"]});		
		
		this.cb_akt2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Angkatan", multiSelection:false, tag:8});						
		this.cb_jur = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Jurusan", multiSelection:false, tag:8});		
		this.cb_kelas = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Jalur/Kelas", multiSelection:false, tag:8});		
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

			this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			
			
			this.cb_kelas.setSQL("select kode_kelas, nama from dikti_kelas where kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas/Jalur",true);			
			this.cb_jur.setSQL("select kode_jur, nama from dikti_jur where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_akt2.setSQL("select kode_akt, nama from dikti_angkat where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);

			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from dikti_param where kode_lokasi = '"+this.app._lokasi+"'");					
			sql.add("select kode_kelas,nama from dikti_kelas where kode_lokasi = '"+this.app._lokasi+"'");		
			sql.add("select kode_jur,nama from dikti_jur where kode_lokasi = '"+this.app._lokasi+"'");		
			sql.add("select kode_akt,nama from dikti_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");		
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select top 1 kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
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
window.app_saku3_transaksi_yspt_dikti_fParamTarif.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fParamTarif.implement({
	doLoad: function(sender) {
		if (this.cb_jur.getText() != "" && this.cb_akt2.getText() != "" && this.cb_kelas.getText() != "") {		
			var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif "+
						 "from dikti_param a "+
						  "left join dikti_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						  "			and b.kode_akt='"+this.cb_akt2.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
						  "' 		and b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_ta='"+this.cb_ta.getText()+"' "+	
						 "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif)]);
				}
			}
			
			this.sg1.clear();
			this.sg1.appendData([this.cb_akt2.getText(),"-",this.cb_jur.getText(),"-",this.cb_kelas.getText(),"-"]);
			
			this.modeEdit = true;
			this.doChangeCell1(this.sg1,0,0);
			this.doChangeCell1(this.sg1,2,0);
			this.doChangeCell1(this.sg1,4,0);

			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}
		else  system.alert(this,"Angkatan, Jurusan, dan Kelas/Jalur harus terisi.","");
	},
	doLoadParam: function(sender) {
		var strSQL = "select a.kode_param,a.nama,0 as tarif "+
					 "from dikti_param a "+
					 "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif)]);
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
						if (this.sg1.rowValid(j)){
							sql.add("delete from dikti_param_tarif where kode_ta='"+this.cb_ta.getText()+"' and kode_akt='"+this.sg1.cells(0,j)+"' and kode_kelas='"+this.sg1.cells(4,j)+"' and kode_jur='"+this.sg1.cells(2,j)+"' and kode_lokasi='"+this.app._lokasi+"'");
						
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(2,i)) > 0) 							
									sql.add("insert into dikti_param_tarif (kode_akt,kode_kelas,kode_jur,kode_ta,kode_lokasi,kode_param,tarif) values "+
											"('"+this.sg1.cells(0,j)+"','"+this.sg1.cells(4,j)+"','"+this.sg1.cells(2,j)+"','"+this.cb_ta.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+")");
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
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
												  "select kode_param,nama    from dikti_param where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_param)  from dikti_param where kode_lokasi = '"+this.app._lokasi+"'",
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

		if (col == 2) {
			if (sender.cells(2,row) != "") {
				var jur = this.dataJur.get(sender.cells(2,row));
				if (jur) {
					sender.cells(3,row,jur);					
				}
				else {                                    
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Jurusan "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}	
		
		if (col == 4) {
			if (sender.cells(4,row) != "") {
				var kelas = this.dataKelas.get(sender.cells(4,row));
				if (kelas) {
					sender.cells(5,row,kelas);					
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
					this.standarLib.showListData(this, "Daftar Angkatan",sender,undefined, 
												  "select kode_akt,nama     from dikti_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(kode_akt)   from dikti_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",
												  ["kode_akt","nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Jurusan",sender,undefined, 
												  "select kode_jur,nama    from dikti_jur where kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(kode_jur)  from dikti_jur where kode_lokasi = '"+this.app._lokasi+"' ",
												  ["kode_jur","nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Kelas",sender,undefined, 
												  "select kode_kelas,nama    from dikti_kelas where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_kelas)  from dikti_kelas where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_kelas","nama"],"and",["Kode","Nama"],false);				
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
							this.dataKelas = new portalui_arrayMap();	
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
									this.dataKelas.set(line.kode_kelas, line.nama);
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