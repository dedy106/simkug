window.app_saku2_transaksi_kopeg_lab_fMasakun = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fMasakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fMasakun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun Relasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_tugas = new saiCBBL(this,{bound:[20,20,220,20],caption:"No Tugas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_dosen = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Dosen",tag:2,readOnly:true});
		this.e_kajian = new portalui_saiLabelEdit(this,{bound:[520,14,400,20],caption:"Kajian",tag:2,readOnly:true});		
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Kelas",tag:2,readOnly:true});		
		this.e_matkul = new portalui_saiLabelEdit(this,{bound:[520,15,400,20],caption:"Mata Kuliah",tag:2,readOnly:true});		
		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,450,20],caption:"Nama", maxLength:100, tag:1});			
		this.c_modul = new saiCB(this,{bound:[20,12,202,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis",items:["Neraca","Pendapatan","Beban"], readOnly:true,tag:2});		
		this.c_normal = new saiCB(this,{bound:[20,13,202,20],caption:"Normal",items:["DR","CR"], readOnly:true,tag:2});		
		this.bTampil = new button(this,{bound:[829,13,80,18],caption:"Daftar Akun",click:[this,"doTampilClick"]});			
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,290], childPage:["Deskripsi Tugas","Detail Tugas","Data Akun"]});				
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[10,10,this.pc1.width-20,this.pc1.height-20],caption:"",labelWidth:0, tag:9});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:9,
		            colTitle:["Tanggal","Deskripsi","Jenis"],
					colWidth:[[2,1,0],[80,550,100]],						
					readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});								
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama","Modul","Jenis","Normal"],
					colWidth:[[4,3,2,1,0],[60,100,100,340,100]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});		

		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+
			                     "       inner join lab_kelas_mhs c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and c.nim ='"+this.app._userLog+"' "+
								 "       left join lab_close b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+
								 "where b.no_tugas is null and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fMasakun.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fMasakun.implement({
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
					sql.add("insert into lab_masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,no_tugas,nik_user,normal) values "+
					        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_modul.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','IDR','0','0','"+this.cb_tugas.getText()+"','"+this.app._userLog+"','"+this.c_normal.getText()+"')");					
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
					sql.add("update lab_masakun set nama='"+this.e_nama.getText()+"',modul='"+this.c_modul.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"',normal='"+this.c_normal.getText()+"' "+
							"where nik_user ='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					sql.add("delete from lab_masakun where nik_user ='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.cb_kode.getText()+"'");			
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
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
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != "" && this.cb_tugas.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.nama,a.modul,a.jenis,a.normal from lab_masakun a "+
														  "where a.nik_user ='"+this.app._userLog+"' and a.no_tugas ='"+this.cb_tugas.getText()+"' and a.kode_akun = '"+this.cb_kode.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_nama.setText(line.nama);						
							if (line.modul == "A") this.c_modul.setText("AKTIVA");
							else {
								if (line.modul == "P") this.c_modul.setText("PASIVA");
								else if (line.modul == "L") this.c_modul.setText("LABARUGI");
							}													
							this.c_jenis.setText(line.jenis);														
							this.c_normal.setText(line.normal);														
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
			if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
				var data = this.dbLib.getDataProvider("select a.keterangan,b.nama as dosen,c.matkul,d.nama as kelas,d.kode_kelas,c.nama+' - '+c.keterangan as kajian "+
						   "from lab_tugas a inner join lab_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
						   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul and a.kode_lokasi=c.kode_lokasi "+
						   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
						   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_dosen.setText(line.dosen);
						this.e_kajian.setText(line.kajian);
						this.e_matkul.setText(line.matkul);
						this.e_kelas.setText(line.kelas);					
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
				this.doTampilClick();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select kode_akun, nama  from lab_masakun where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'",
											  "select count(kode_akun) from lab_masakun where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			if (sender == this.bTampil) this.pc1.setActivePage(this.pc1.childPage[2]);
			if (this.cb_tugas.getText()!="") {									
				var strSQL = "select  a.kode_akun, a.nama, case a.modul when 'A' then 'AKTIVA' when 'P' then 'PASIVA' else 'LABARUGI' end as modul, a.jenis,a.normal "+
							 "from lab_masakun a "+
							 "where a.nik_user ='"+this.app._userLog+"' and a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_akun";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);					
				} else this.sg1.clear(1);				
			} 			
			else system.alert(this,"No Tugas harus diisi.","Isi No Tugas dari pilihan.");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_akun,line.nama,line.modul,line.jenis,line.normal]);
		}
		this.sg.setNoUrut(start);		
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