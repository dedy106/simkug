window.app_saku2_transaksi_gaji_fKaryawanPol = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fKaryawanPol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fKaryawanPol";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data hr_karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_loker = new saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi Kerja", multiSelection:false, maxLength:10, tag:1});
		this.cb_fungsi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Fungsional", multiSelection:false, maxLength:10, tag:1});
		this.cb_struk = new saiCBBL(this,{bound:[20,11,200,20],caption:"Struktural", multiSelection:false, maxLength:10, tag:1});
		this.cb_profesi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Profesi", multiSelection:false, maxLength:10, tag:1});
		this.cb_prodi = new saiCBBL(this,{bound:[20,11,200,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:1});
		this.cb_status = new saiCBBL(this,{bound:[20,10,200,20],caption:"Status Karyawan", multiSelection:false, maxLength:10, tag:1});
		this.cb_dir = new saiCBBL(this,{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1});
		this.cb_gp = new saiCBBL(this,{bound:[20,10,200,20],caption:"Grade Posisi", multiSelection:false, maxLength:10, tag:1});
		this.cb_pajak = new saiCBBL(this,{bound:[20,11,200,20],caption:"Status Pajak", multiSelection:false, maxLength:10, tag:1});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_skode = new saiLabelEdit(this,{bound:[20,13,150,20],caption:"Singkatan", maxLength:3, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_kodepos = new saiLabelEdit(this,{bound:[240,12,180,20],caption:"Kode Pos", maxLength:5, tipeText:ttAngka, tag:1});	
		this.e_mail = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Email", maxLength:50, tag:1});
		this.e_telp = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"No Telpon", maxLength:50, tag:1});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr(),tag:1}); 		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl PegTap", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr(),tag:1}); 		
		this.e_npwp = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.c_aktif = new saiCB(this,{bound:[20,23,200,20],caption:"Status Aktif",items:["1. Aktif","0. Tidak"], readOnly:true,tag:2});
		this.c_transfer = new saiCB(this,{bound:[20,22,200,20],caption:"Jenis Transfer",items:["MANDIRI","NON"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this,{bound:[20,20,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,300,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this,{bound:[20,22,300,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_loker.setSQL("select kode_loker, nama from hr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_Loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);
			this.cb_fungsi.setSQL("select kode_fungsi, nama from hr_fungsi where kode_lokasi='"+this.app._lokasi+"'",["kode_fungsi","nama"],false,["Kode","Nama"],"and","Data Fungsional",true);	
			this.cb_struk.setSQL("select kode_struk, nama from hr_struk where kode_lokasi='"+this.app._lokasi+"'",["kode_struk","nama"],false,["Kode","Nama"],"and","Data Struktural",true);
			this.cb_profesi.setSQL("select kode_profesi, nama from hr_profesi where kode_lokasi='"+this.app._lokasi+"'",["kode_profesi","nama"],false,["Kode","Nama"],"and","Data Profesi",true);
			this.cb_prodi.setSQL("select kode_prodi, nama from hr_prodi where kode_lokasi='"+this.app._lokasi+"'",["kode_prodi","nama"],false,["Kode","Nama"],"and","Data Prodi",true);
			this.cb_status.setSQL("select sts_sdm, nama from hr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);
			this.cb_dir.setSQL("select kode_dir, nama from hr_dir where kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);
			this.cb_gp.setSQL("select kode_grade, nama from hr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade Posisi",true);
			this.cb_pajak.setSQL("select sts_pajak, nama from hr_status_pajak where kode_lokasi='"+this.app._lokasi+"'",["sts_pajak","nama"],false,["Kode","Nama"],"and","Data Status Pajak",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fKaryawanPol.extend(window.childForm);
window.app_saku2_transaksi_gaji_fKaryawanPol.implement({
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
					sql.add("insert into hr_karyawan(nik,nama,kode_lokasi,alamat,kota,kodepos,no_telp,npwp,bank,cabang,no_rek,nama_rek,kode_loker,kode_fungsi,kode_struk,kode_profesi,kode_prodi,sts_sdm,kode_dir,kode_grade,sts_pajak,skode,jenis_bank,flag_aktif,tgl_lahir,tgl_pegtap,email) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_fungsi.getText()+"','"+this.cb_struk.getText()+"','"+this.cb_profesi.getText()+"','"+this.cb_prodi.getText()+"','"+this.cb_status.getText()+"','"+this.cb_dir.getText()+"','"+this.cb_gp.getText()+"','"+this.cb_pajak.getText()+"','"+this.e_skode.getText()+"','"+this.c_transfer.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_mail.getText()+"')");
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
					sql.add("update hr_karyawan set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kota='"+this.e_kota.getText()+"',kodepos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',npwp='"+this.e_npwp.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+
							"',kode_loker='"+this.cb_loker.getText()+"', kode_fungsi='"+this.cb_fungsi.getText()+"',kode_struk='"+this.cb_struk.getText()+"',kode_profesi='"+this.cb_profesi.getText()+"',kode_prodi='"+this.cb_prodi.getText()+"',sts_sdm='"+this.cb_status.getText()+"',kode_dir='"+this.cb_dir.getText()+"',kode_grade='"+this.cb_gp.getText()+"',sts_pajak='"+this.cb_pajak.getText()+"',skode='"+this.e_skode.getText()+"',jenis_bank='"+this.c_transfer.getText()+"',flag_aktif='"+this.c_aktif.getText().substr(0,1)+"'  "+
							",tgl_lahir='"+this.dp_d1.getDateString()+"',tgl_pegtap='"+this.dp_d2.getDateString()+"',email='"+this.e_mail.getText()+"' "+
							"where nik = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from hr_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
		
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.alamat,a.kota,a.no_telp,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek,a.kodepos,a.kode_loker,a.skode,"+
						   "a.kode_fungsi,a.kode_struk,a.kode_profesi,a.kode_prodi,a.sts_sdm,a.kode_dir,a.kode_grade,a.sts_pajak,a.tgl_lahir,a.tgl_pegtap, "+
						   "b.nama as nama_loker,c.nama as nama_fungsi,d.nama as nama_struk,e.nama as nama_profesi,f.nama as nama_prodi,g.nama as nama_status,h.nama as nama_dir,i.nama as nama_grade,j.nama as nama_pajak,a.jenis_bank,a.flag_aktif,a.email "+
				           " from hr_karyawan a "+
						   "inner join hr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						   "inner join hr_fungsi c on a.kode_fungsi=c.kode_fungsi and a.kode_lokasi=c.kode_lokasi "+
						   "inner join hr_struk d on a.kode_struk=d.kode_struk and a.kode_lokasi=d.kode_lokasi "+
						   "inner join hr_profesi e on a.kode_profesi=e.kode_profesi and a.kode_lokasi=e.kode_lokasi "+
						   "inner join hr_prodi f on a.kode_prodi=f.kode_prodi and a.kode_lokasi=f.kode_lokasi "+
						   "inner join hr_status_sdm g on a.sts_sdm=g.sts_sdm and a.kode_lokasi=g.kode_lokasi "+
						   "inner join hr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi=h.kode_lokasi "+
						   "inner join hr_grade i on a.kode_grade=i.kode_grade and a.kode_lokasi=i.kode_lokasi "+
						   "inner join hr_status_pajak j on a.sts_pajak=j.sts_pajak and a.kode_lokasi=j.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_loker.setText(line.kode_loker,line.nama_loker);
						this.e_nama.setText(line.nama);
						this.e_skode.setText(line.skode);
						this.cb_fungsi.setText(line.kode_fungsi,line.nama_fungsi);
						this.cb_struk.setText(line.kode_struk,line.nama_struk);
						this.cb_profesi.setText(line.kode_profesi,line.nama_profesi);
						this.cb_prodi.setText(line.kode_prodi,line.nama_prodi);
						this.cb_status.setText(line.sts_sdm,line.nama_status);
						this.cb_dir.setText(line.kode_dir,line.nama_dir);
						this.cb_gp.setText(line.kode_grade,line.nama_grade);
						this.cb_pajak.setText(line.sts_pajak,line.nama_pajak);
						this.e_alamat.setText(line.alamat);
						this.e_mail.setText(line.email);
						this.e_kota.setText(line.kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_npwp.setText(line.npwp);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.c_transfer.setText(line.jenis_bank);
						this.dp_d1.setText(line.tgl_lahir);
						this.dp_d2.setText(line.tgl_pegtap);
						if (line.flag_aktif == "1") vAktif = "1. Aktif"; else vAktif = "0. Tidak";
						this.c_aktif.setText(vAktif);
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
	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar hr_karyawan",sender,undefined, 
											  "select nik, nama  from hr_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from hr_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (NIK : "+ this.cb_kode.getText()+")");							
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
