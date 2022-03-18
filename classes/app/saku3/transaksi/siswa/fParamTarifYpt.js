window.app_saku3_transaksi_siswa_fParamTarifYpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fParamTarifYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fParamTarifYpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Parameter", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_pp = new saiCBBL(this,{bound:[20,10,200,20],caption:"Sekolah", readOnly:true, tag:2});		
		
		this.cb_akt = new saiCBBL(this,{bound:[20,14,200,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_kelas = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_tingkat = new saiCBBL(this,{bound:[20,12,200,20],caption:"Tingkat", readOnly:true, tag:1});		
		this.cb_jur = new saiCBBL(this,{bound:[20,13,200,20],caption:"Jurusan", readOnly:true, tag:1});		
				
		this.p1 = new panel(this,{bound:[20,23,600,340],caption:"Daftar Tarif Biaya"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-55],colCount:3,tag:9,				
				colTitle:["Kode","Nama","Tarif"],
				colWidth:[[2,1,0],[100,300,80]],
				columnReadOnly:[true,[1],[0,2]],				
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
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);			
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			
			this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");		
			this.dbLib.getMultiDataProviderA(sql);
			
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fParamTarifYpt.extend(window.childForm);
window.app_saku3_transaksi_siswa_fParamTarifYpt.implement({
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
					sql.add("delete from sis_param_tarif where kode_akt='"+this.cb_akt.getText()+"' and  kode_kelas = '"+this.cb_kelas.getText()+"' and kode_pp='"+this.app._kodePP+"'");								
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(2,i)) >= 0) 
							sql.add("insert into sis_param_tarif (kode_kelas,kode_lokasi,kode_param,tarif,kode_pp,kode_akt) values ('"+this.cb_kelas.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._kodePP+"','"+this.cb_akt.getText()+"')");
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
			if ((sender == this.cb_kelas || sender==this.cb_pp) && this.cb_kelas.getText() != "" && this.cb_pp.getText() != "") {						
				var data = this.dbLib.getDataProvider("select kode_tingkat,kode_jur from sis_kelas where kode_kelas='"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_tingkat.setText(line.kode_tingkat);	
						this.cb_jur.setText(line.kode_jur);											
					}					
				}
			}
			if ((sender == this.cb_kelas || sender==this.cb_akt) && this.cb_kelas.getText() != "" && this.cb_akt.getText() != "") {		
				var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif "+
							 "from sis_param a "+
						 	 "left join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.kode_akt='"+this.cb_akt.getText()+"' and b.kode_kelas='"+this.cb_kelas.getText()+"' and  b.kode_pp='"+this.app._kodePP+"'  "+	
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
			}
		}catch(e){
			systemAPI.alert(e);
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