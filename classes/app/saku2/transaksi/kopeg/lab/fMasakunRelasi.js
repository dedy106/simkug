window.app_saku2_transaksi_kopeg_lab_fMasakunRelasi = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fMasakunRelasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fMasakunRelasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun Relasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_fs = new saiCBBL(this,{bound:[20,20,220,20],caption:"No Tugas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,450,20],caption:"Nama", maxLength:100, tag:1});			
		this.c_modul = new saiCB(this,{bound:[20,12,202,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,13,202,20],caption:"Jenis",items:["Neraca","Pendapatan","Beban"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_lap = new saiCBBL(this,{bound:[20,22,202,20],caption:"Kode Laporan", multiSelection:false, maxLength:10, tag:2});
		
		this.bTampil = new button(this,{bound:[829,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		this.p1 = new panel(this,{bound:[10,23,900,320],caption:"Daftar Master Akun"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,275],tag:9,readOnly:true,colTitle: ["Kode","Nama","Modul","Jenis","Kode Lap","Keterangan","No Tugas","Nama Tugas"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,295,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_fs.setSQL("select a.no_tugas, a.nama from lab_tugas a left join lab_close b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' where b.no_tugas is null and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
			this.c_jenis.setText("Neraca");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fMasakunRelasi.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fMasakunRelasi.implement({
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
					sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,no_tugas,nik_user) values "+
					        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_modul.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','IDR','0','0','"+this.cb_fs.getText()+"','"+this.app._userLog+"')");					
					sql.add("insert into lab_relakun (kode_neraca,no_tugas,kode_akun,kode_lokasi,nik_user) values ('"+this.cb_lap.getText()+"','"+this.cb_fs.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')");
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
					var status = "";
					
					sql.add("delete from lab_relakun where nik_user ='"+this.app._userLog+"' and kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_fs.getText()+"'");
					sql.add("update lab_masakun set nama='"+this.e_nama.getText()+"',modul='"+this.c_modul.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"' "+
							"where nik_user ='"+this.app._userLog+"' and no_tugas='"+this.cb_fs.getText()+"' and kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into lab_relakun (kode_neraca,no_tugas,kode_akun,kode_lokasi,nik_user) values ('"+this.cb_lap.getText()+"','"+this.cb_fs.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"')");
					
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
					sql.add("delete from lab_masakun where nik_user ='"+this.app._userLog+"' and no_tugas='"+this.cb_fs.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.cb_kode.getText()+"'");			
					sql.add("delete from lab_relakun where nik_user ='"+this.app._userLog+"' and kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_fs.getText()+"'");
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
			if ((sender == this.c_jenis || sender == this.cb_fs) && (this.c_jenis.getText()!="" && this.cb_fs.getText()!="")) {							    				
				this.cb_lap.setSQL("select kode_neraca, nama from lab_neraca where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_fs.getText()+"' and jenis_akun = '"+this.c_jenis.getText()+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_neraca","nama"],false,["Kode","Nama"],"and","Daftar Kode Laporan",true);
			}			
			if (sender == this.cb_kode || sender == this.cb_fs) {
				if (this.cb_kode.getText() != "" && this.cb_fs.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.nama,a.modul,a.jenis,a.block,a.status_gar,b.kode_neraca,c.nama as nama_neraca "+
														  "from lab_masakun a inner join lab_relakun b on a.kode_akun=b.kode_akun and b.no_tugas='"+this.cb_fs.getText()+"' and a.kode_lokasi=b.kode_lokasi and a.nik_user=b.nik_user "+
														  "                   inner join lab_neraca c on b.kode_neraca=c.kode_neraca and b.kode_lokasi=c.kode_lokasi and b.nik_user=c.nik_user "+
														  "where b.nik_user ='"+this.app._userLog+"' and b.no_tugas ='"+this.cb_fs.getText()+"' and b.kode_akun = '"+this.cb_kode.getText()+"' and b.kode_lokasi ='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_nama.setText(line.nama);						
							if (line.modul == "A") this.c_modul.setText("AKTIVA");
							else {
								if (line.modul == "P") this.c_modul.setText("PASIVA");
								else if (line.modul == "L") this.c_modul.setText("LABARUGI");
							}						
							this.c_jenis.onChange.set(undefined,undefined);
							this.c_jenis.setText(line.jenis);
							this.cb_lap.setSQL("select kode_neraca, nama from lab_neraca where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_fs.getText()+"' and jenis_akun = '"+this.c_jenis.getText()+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_neraca","nama"],false,["Kode","Nama"],"and","Daftar Kode Laporan",true);							
							this.c_jenis.onChange.set(this,"doChange");							
							this.cb_lap.setText(line.kode_neraca,line.nama_neraca);																			
							setTipeButton(tbUbah);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_fs.getText()!="") {									
				var temp = this.dbLib.runSQL("select  a.kode_akun, a.nama, a.modul, a.jenis, b.kode_neraca,c.nama as nama_neraca,b.no_tugas,d.nama as nama_fs "+
											 "from lab_masakun a inner join lab_relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.no_tugas ='"+this.cb_fs.getText()+"' and a.nik_user=b.nik_user "+
											 "                   inner join lab_neraca c on b.kode_neraca=c.kode_neraca and b.kode_lokasi=c.kode_lokasi and b.nik_user=c.nik_user "+
											 "                   inner join lab_tugas d on b.no_tugas=d.no_tugas and b.kode_lokasi=d.kode_lokasi "+
											 "where b.nik_user ='"+this.app._userLog+"' and b.no_tugas='"+this.cb_fs.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_akun");
				if (temp instanceof arrayMap) {
					this.sg1.setData(temp,true,20);
					this.sgn.setTotalPage(this.sg1.pageCount);				
					this.sgn.rearrange();
					this.sgn.activePage = 0;
				}else systemAPI.alert(temp);
			} 
			else system.alert(this,"No Tugas harus diisi.","Isi No Tugas dari pilihan.");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select kode_akun, nama  from lab_masakun where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_fs.getText()+"' and nik_user='"+this.app._userLog+"'",
											  "select count(kode_akun) from lab_masakun where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_fs.getText()+"' and nik_user='"+this.app._userLog+"'",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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