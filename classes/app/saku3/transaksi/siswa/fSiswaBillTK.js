window.app_saku3_transaksi_siswa_fSiswaBillTK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswaBillTK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSiswaBillTK";
		                   
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Generate Kartu Bill", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
	
		this.cb_pp = new saiCBBL(this,{bound:[20,10,220,20],caption:"Kode PP", readOnly:true, tag:2});
		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2});			
		this.c_tahun1 = new saiCB(this,{bound:[20,13,200,20],caption:"Periode Awal",readOnly:true,tag:2});
		this.c_tahun2 = new  saiCB(this,{bound:[230,13,100,20],caption:"",readOnly:true,tag:2,labelWidth:0});
		this.cb_kelas = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kelas", multiSelection:false, maxLength:11, tag:1,change:[this,"doChange"]});		
		this.cb_siswa = new saiCBBL(this,{bound:[20,12,220,20],caption:"NIS", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		
		//this.pc1 = new pageControl(this,{bound:[5,12,890,405], childPage:["Data Bill"]});
		//this.cb_kelas = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Kelas", multiSelection:false, maxLength:11, tag:1,change:[this,"doChange"]});		
		//this.cb_siswa = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"NIS", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		
		this.pc2 = new pageControl(this,{bound:[1,16,880,315], childPage:["Data Parameter"]});								
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,293],colCount:4,tag:1,				
				colTitle:["Kode","Nama","Tarif","Periode"],
				colWidth:[[3,2,1,0],[100,120,300,80]],
				columnReadOnly:[true,[1],[0,2,3]],	
				colFormat:[[2],[cfNilai]],			
				buttonStyle:[[0,3],[bsEllips,bsAuto]], picklist:[[3],[new portalui_arrayMap({items:["A","B","C","7","8","9","10","11","12","1","2","3","4","5","6"]})]], 
				ellipsClick:[this,"doEllipsClick1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg1});				
		

		this.rearrangeChild(10, 23);
		//this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);

			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}	
			
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
window.app_saku3_transaksi_siswa_fSiswaBillTK.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSiswaBillTK.implement({
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

					sql.add("delete from sis_tk_bill where kode_ta = '"+this.cb_ta.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and nis='"+this.cb_siswa.getText()+"' and kode_kelas='"+this.cb_kelas.getText()+"' ");

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){

							if(this.sg1.cells(3,i) == "A"){
								for (var j=7;j <= 12;j++){
									sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
									"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun1.getText()+(j<10?"0":"")+j+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
									"from sis_siswa a "+
									"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
								}
								for (var j=1;j <= 6;j++){

									sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
									"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun1.getText()+(j<10?"0":"")+j+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
									"from sis_siswa a "+
									"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
								}
							}	
							if(this.sg1.cells(3,i) == "B"){
								for (var j=7;j <= 12;j=j+3){

									sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
									"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun1.getText()+(j<10?"0":"")+j+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
									"from sis_siswa a "+
									"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
								}
								for (var j=1;j <= 6;j=j+3){

									sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
									"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun2.getText()+(j<10?"0":"")+j+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
									"from sis_siswa a "+
									"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
								}
							}
							if(this.sg1.cells(3,i) == "C"){
								sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
								"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun1.getText()+"07',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
								"from sis_siswa a "+
								"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");

								sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
								"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun2.getText()+"01',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
								"from sis_siswa a "+
								"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
							}
							if(this.sg1.cells(3,i) >= 7 && this.sg1.cells(3,i) <= 12 ){
								sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
								"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun1.getText()+(this.sg1.cells(3,i)<10?"0":"")+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
								"from sis_siswa a "+
								"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
							}
							if(this.sg1.cells(3,i) >= 1 && this.sg1.cells(3,i) <= 6 ){
								sql.add("insert into sis_tk_bill(nis,kode_ta,kode_tingkat,kode_kelas,kode_param,periode,tarif,kode_lokasi,kode_pp,kode_akt,jenis_per) "+
								"select '"+this.cb_siswa.getText()+"','"+this.cb_ta.getText()+"',c.kode_tingkat,'"+this.cb_kelas.getText()+"','"+this.sg1.cells(0,i)+"','"+this.c_tahun2.getText()+(this.sg1.cells(3,i)<10?"0":"")+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+",a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt,'"+this.sg1.cells(3,i)+"' "+
								"from sis_siswa a "+
								"inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_kelas='"+this.cb_kelas.getText()+"' ");
							}	
						} 
					} 
					setTipeButton(tbAllFalse);
				    this.dbLib.execArraySQL(sql);
					this.sg1.clear(1);				
					this.cb_siswa.clear(1);
					this.cb_kelas.clear(1);
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

					sql.add("delete from sis_tk_bill where kode_ta = '"+this.cb_ta.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_ta);
					this.sg1.clear(1); 
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
			if ((sender == this.cb_ta || this.cb_siswa || this.cb_kelas) && this.cb_ta.getText()!="" && this.cb_siswa.getText()!="" && this.cb_kelas.getText()!="") {
				var strSQL = "select a.kode_param, b.nama, a.tarif, a.jenis_per "+
							 "from sis_tk_bill a inner join sis_param b on a.kode_param=b.kode_param "+
							 "where a.kode_kelas='"+this.cb_kelas.getText()+"' and a.kode_ta='"+this.cb_ta.getText()+"' and a.nis='"+this.cb_siswa.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "GROUP BY a.kode_param,b.nama,a.tarif,a.jenis_per ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg1.appendData([line1.kode_param,line1.nama,parseFloat(line1.tarif),line1.jenis_per]);
					}
				} else this.sg1.clear(1);												
				this.sg1.validasi();	
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},

	doEllipsClick: function(sender, col, row){
		try{							
			if (sender == this.sg1) {
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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