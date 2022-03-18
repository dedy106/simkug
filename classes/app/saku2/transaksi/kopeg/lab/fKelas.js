window.app_saku2_transaksi_kopeg_lab_fKelas = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fKelas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fKelas";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelas ", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;portalui_saiMemo");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,16,500,20],caption:"Nama", maxLength:200, tag:1});	
		this.cb_dosen = new saiCBBL(this,{bound:[20,17,220,20],caption:"Dosen", multiSelection:false, maxLength:10, tag:2});
		this.cb_matkul = new saiCBBL(this,{bound:[20,18,220,20],caption:"Kajian", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Kajian Ke", readOnly:true});	
		this.e_matkul = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"Mata Kuliah", readOnly:true});	
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,370], childPage:["Data Mahasiswa"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:0,
		            colTitle:["N I M","Nama"],
					colWidth:[[1,0],[300,80]],columnReadOnly:[true,[1],[0]],
					buttonStyle:[[0],[bsEllips]], checkItem: true,
					change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],
					autoAppend:true,defaultRow:1,pasteEnable:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var sql = new server_util_arrayList();
			sql.add("select nim,nama from lab_mhs where kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.cb_dosen.setSQL("select kode_dosen,nama from lab_dosen where kode_lokasi='"+this.app._lokasi+"'",["kode_dosen","nama"],false,["Kode","Nama"],"and","Daftar Dosen",true);
			this.cb_matkul.setSQL("select kode_matkul,nama from lab_matkul where kode_lokasi='"+this.app._lokasi+"'",["kode_matkul","nama"],false,["Kode","Nama"],"and","Daftar Mata Kuliah",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fKelas.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fKelas.implement({	
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
					sql.add("insert into lab_kelas(kode_kelas,kode_lokasi,nama,kode_dosen,kode_matkul) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_dosen.getText()+"','"+this.cb_matkul.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into lab_kelas_mhs(kode_kelas,kode_lokasi,nim) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
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
					sql.add("delete from lab_kelas where kode_kelas = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from lab_kelas_mhs where kode_kelas = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					
					sql.add("insert into lab_kelas(kode_kelas,kode_lokasi,nama,kode_dosen,kode_matkul) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_dosen.getText()+"','"+this.cb_matkul.getText()+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into lab_kelas_mhs(kode_kelas,kode_lokasi,nim) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from lab_kelas where kode_kelas = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from lab_kelas_mhs where kode_kelas = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear(1);
					setTipeButton(tbAllFalse);
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nama,kode_dosen,kode_matkul from lab_kelas "+
						     "where kode_kelas ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.e_nama.setText(line.nama);												
						this.cb_dosen.setText(line.kode_dosen);						
						this.cb_matkul.setText(line.kode_matkul);												
						var data = this.dbLib.getDataProvider("select a.nim,a.nama from lab_mhs a inner join lab_kelas_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi where b.kode_kelas='"+this.cb_kode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.nim,line.nama]);
							}
						} else this.sg.clear(1);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						this.sg.clear(1);
						setTipeButton(tbSimpan);
					}
				}
			}			
			if (sender == this.cb_matkul && this.cb_matkul.getText() != ""){
				var strSQL = "select keterangan,matkul from lab_matkul where kode_matkul ='"+this.cb_matkul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_ket.setText(line.keterangan);		
						this.e_matkul.setText(line.matkul);								
					}					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Kelas",sender,undefined, 
											  "select kode_kelas, nama  from lab_kelas where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_kelas) from lab_kelas where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_kelas","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mahasiswa",sender,undefined, 
						    "select nim,nama from lab_mhs where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(nim) from lab_mhs where kode_lokasi = '"+this.app._lokasi+"'",
							["nim","nama"],"and",["NIM","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var nim = this.dataMHS.get(sender.cells(0,row));
				if (nim) sender.cells(1,row,nim);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"NIM "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataMHS = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataMHS.set(line.nim, line.nama);
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

