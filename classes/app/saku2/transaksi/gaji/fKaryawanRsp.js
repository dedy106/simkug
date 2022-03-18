window.app_saku2_transaksi_gaji_fKaryawanRsp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fKaryawanRsp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fKaryawanRsp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data hr_karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_status = new saiCBBL(this,{bound:[20,11,200,20],caption:"Status Karyawan", multiSelection:false, maxLength:10, tag:1});
		this.cb_loker = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi Kerja", multiSelection:false, maxLength:10, tag:1});
		this.cb_level = new saiCBBL(this,{bound:[20,11,200,20],caption:"Level", multiSelection:false, maxLength:10, tag:1});
		this.cb_jab = new saiCBBL(this,{bound:[20,10,200,20],caption:"Jabatan", multiSelection:false, maxLength:10, tag:1});
		this.cb_pajak = new saiCBBL(this,{bound:[20,11,200,20],caption:"Status Pajak", multiSelection:false, maxLength:10, tag:1});
		
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_kodepos = new saiLabelEdit(this,{bound:[240,12,180,20],caption:"Kode Pos", maxLength:5, tipeText:ttAngka, tag:1});	
		this.e_telp = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"No Telpon", maxLength:50, tag:1});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr(),tag:1}); 		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl PegTap", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr(),tag:1}); 		
		this.e_npwp = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.c_aktif = new saiCB(this,{bound:[20,23,200,20],caption:"Status Aktif",items:["1. Aktif","0. Tidak"], readOnly:true,tag:2});
		this.c_nikah = new saiCB(this,{bound:[20,22,200,20],caption:"Status Menikah",items:["MENIKAH","LAJANG"], readOnly:true,tag:2});
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
			this.cb_level.setSQL("select kode_level, nama from hr_level where kode_lokasi='"+this.app._lokasi+"'",["kode_level","nama"],false,["Kode","Nama"],"and","Data Level",true);	
			this.cb_jab.setSQL("select kode_jab, nama from hr_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Posisi",true);
			this.cb_status.setSQL("select sts_sdm, nama from hr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);
			this.cb_pajak.setSQL("select sts_pajak, nama from hr_status_pajak where kode_lokasi='"+this.app._lokasi+"'",["sts_pajak","nama"],false,["Kode","Nama"],"and","Data Status Pajak",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fKaryawanRsp.extend(window.childForm);
window.app_saku2_transaksi_gaji_fKaryawanRsp.implement({
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
					sql.add("insert into hr_karyawan(nik,nama,kode_lokasi,alamat,kota,kodepos,no_telp,npwp,bank,cabang,no_rek,nama_rek,  kode_jab,kode_loker,sts_sdm,sts_pajak,flag_aktif,tgl_lahir,tgl_pegtap,kode_level,sts_nikah) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',       '"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_status.getText()+"','"+this.cb_pajak.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_level.getText()+"','"+this.c_nikah.getText()+"')");
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
							"',kode_level='"+this.cb_level.getText()+"',kode_loker='"+this.cb_loker.getText()+"', kode_jab='"+this.cb_jab.getText()+"',sts_sdm='"+this.cb_status.getText()+"',sts_pajak='"+this.cb_pajak.getText()+"',flag_aktif='"+this.c_aktif.getText().substr(0,1)+"',sts_nikah='"+this.c_nikah.getText()+"'  "+
							",tgl_lahir='"+this.dp_d1.getDateString()+"',tgl_pegtap='"+this.dp_d2.getDateString()+"' "+
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
				var data = this.dbLib.getDataProvider("select * from hr_karyawan a "+						   
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_loker.setText(line.kode_loker);						
						this.cb_status.setText(line.sts_sdm);
						this.cb_level.setText(line.kode_level);
						this.cb_pajak.setText(line.sts_pajak);
						this.cb_jab.setText(line.kode_jab);						
						
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_npwp.setText(line.npwp);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.dp_d1.setText(line.tgl_lahir);
						this.dp_d2.setText(line.tgl_pegtap);						
						this.c_nikah.setText(line.sts_nikah);
						
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
