window.app_saku2_transaksi_kopeg_lab_fMasakunDasar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fMasakunDasar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fMasakunDasar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun: Input-Edit/Load", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;portalui_saiMemo");		
		this.cb_tugas = new saiCBBL(this,{bound:[20,21,222,20],caption:"Tugas",multiSelection:false, maxLength:10, tag:2,change:[this,"doChange2"]});
		this.cb_dosen = new saiCBBL(this,{bound:[20,22,222,20],caption:"Dosen",tag:2,readOnly:true});
		this.cb_matkul = new saiCBBL(this,{bound:[20,11,222,20],caption:"Kajian",tag:2,readOnly:true});		
		this.e_matkul = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"Mata Kuliah", tag:2,readOnly:true});			
		this.cb_kelas = new saiCBBL(this,{bound:[20,16,222,20],caption:"Kelas",tag:2,readOnly:true});				
		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,222,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:200, tag:1});		
		this.c_modul = new saiCB(this,{bound:[20,12,202,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis",items:["Neraca","Pendapatan","Beban"], readOnly:true,tag:2});		
		this.bSave = new button(this,{bound:[835,14,80,18],caption:"Simpan Load",click:[this,"doSimpan"]});
		//this.bUpload = new portalui_uploader(this,{bound:[720,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Mahasiswa","Deskripsi Tugas","Detail Tugas","Data Load Akun"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:2,
		            colTitle:["N I M","Nama"],
					colWidth:[[1,0],[300,80]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1});		

		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,10,this.pc1.width-5,this.pc1.height-10],caption:"",labelWidth:0, tag:2});		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:2,
		            colTitle:["Tanggal","Deskripsi","Jenis"],
					colWidth:[[2,1,0],[80,550,100]],						
					readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});						
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:9,
		            colTitle:["Kode Akun","Nama","Modul","Jenis"],
					colWidth:[[3,2,1,0],[80,80,300,80]],					
					pasteEnable:true,readOnly:true,autoAppend:false,defaultRow:1,pasteEnable:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg, pager:[this,"selectPage"]});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.e_memo.setReadOnly(true);
			
			this.cb_tugas.setSQL("select no_tugas, nama from lab_tugas where kode_dosen='"+this.app._userLog+"' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fMasakunDasar.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fMasakunDasar.implement({
	/*
	doAfterUpload: function(sender, result, data){		
	    try{   		
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg.appendData([line.kode_akun,line.nama,line.modul,line.jenis]);
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	*/
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
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,no_tugas,nik_user) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_modul.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','"+this.cb_tugas.getText()+"','"+this.sg1.cells(0,i)+"')");
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
					sql.add("update lab_masakun set nama='"+this.e_nama.getText()+"' "+
					        "where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"'");
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
					sql.add("delete from lab_masakun where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"'");			
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
					this.sg.clear(1); //this.sg1.clear(1); this.sg2.clear(1);
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
	doSimpan: function(sender){
		try {
			if (this.cb_tugas.getText()=="") {
				system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
				return false;
			}
			else {
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from lab_masakun where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				for (var i=0; i < this.sg.getRowCount();i++){					
					for (var j=0;j < this.sg1.getRowCount();j++){
						if (this.sg1.rowValid(j)){
							sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,no_tugas,nik_user) values "+
									"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','IDR','0','0','"+this.cb_tugas.getText()+"','"+this.sg1.cells(0,j)+"')");
						}
					}
					//insert dosen
					sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,no_tugas,nik_user) values "+
									"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','IDR','0','0','"+this.cb_tugas.getText()+"','"+this.cb_dosen.getText()+"')");

				}
				
				/*
				for (var i=0; i < this.dataUpload.rows.length;i++){
					line = this.dataUpload.rows[i];								   										
					for (var j=0;j < this.sg1.getRowCount();j++){
						if (this.sg1.rowValid(j)){
							sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,no_tugas,nik_user) values "+
									"('"+line.kode_akun+"','"+this.app._lokasi+"','"+line.nama+"','"+line.modul+"','"+line.jenis+"','"+this.cb_tugas.getText()+"','"+this.sg1.cells(0,j)+"')");
						}
					}
					sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,no_tugas,nik_user) values "+
									"('"+line.kode_akun+"','"+this.app._lokasi+"','"+line.nama+"','"+line.modul+"','"+line.jenis+"','"+this.cb_tugas.getText()+"','"+this.cb_dosen.getText()+"')");
					
				}
				*/
				this.dbLib.execArraySQL(sql);
			}
		} 
		catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != "" && this.cb_tugas.getText()!=""){
				var strSQL = "select distinct nama from lab_masakun "+
						     "where no_tugas='"+this.cb_tugas.getText()+"' and kode_akun ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChange2: function(sender){
		if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.*,b.nama as nama_dosen,c.nama+' - '+c.keterangan as kajian,d.nama as nama_kelas,c.matkul "+
					   "from lab_tugas a inner join lab_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul and a.kode_lokasi=c.kode_lokasi "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.cb_dosen.setText(line.kode_dosen,line.nama_dosen);
					this.cb_matkul.setText(line.kode_matkul,line.kajian);
					this.cb_kelas.setText(line.kode_kelas,line.nama_kelas);					
					this.e_matkul.setText(line.matkul);
					this.e_memo.setText(line.keterangan);
				} 
			}
			var data = this.dbLib.getDataProvider("select tanggal,keterangan,jenis from lab_tugas_d where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.tanggal,line.keterangan,line.jenis]);
				}
			} else this.sg2.clear(1);			
			var data = this.dbLib.getDataProvider("select a.nim,a.nama from lab_mhs a inner join lab_kelas_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
			           "where b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.nim,line.nama]);
				}
			} else this.sg1.clear(1);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select distinct kode_akun, nama  from lab_masakun where no_tugas ='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(distinct kode_akun) from lab_masakun where no_tugas ='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});

/*

format xls - txt
--------------------------------
 kode_akun  |        nama
--------------------------------
  113       |     kas
  513       |     beban   

--------------------------------
*/