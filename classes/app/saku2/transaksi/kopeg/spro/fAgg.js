window.app_saku2_transaksi_kopeg_spro_fAgg = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fAgg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Anggota", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,300,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_pasangan = new saiLabelEdit(this,{bound:[20,10,300,20],caption:"Nama Pasangan", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this,{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,250,20],caption:"Bank", maxLength:50, tag:1});			
		this.e_cabang = new saiLabelEdit(this,{bound:[20,18,500,20],caption:"Cabang", maxLength:50, tag:1});			
		this.e_norek = new saiLabelEdit(this,{bound:[20,19,250,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this,{bound:[20,18,250,20],caption:"Nama Rekening", maxLength:50, tag:1});			
		
		this.e_id = new saiLabelEdit(this,{bound:[20,19,202,20],caption:"ID Lainnya", maxLength:20, tag:1});			
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Aktifasi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.c_status = new saiCB(this,{bound:[20,22,202,20],caption:"Status",items:["AKTIF","NON"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,23,202,20],caption:"Jenis Anggota",items:["ANGGOTA","EKSTERNAL"], readOnly:true,tag:2});
		this.cb_loker = new saiCBBL(this,{bound:[20,18,200,20],caption:"Lokasi Kerja", multiSelection:false, maxLength:10, tag:2});				
		this.e_grade = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Grade / Band", maxLength:10, tag:1});			
		this.e_gaji = new saiLabelEdit(this,{bound:[20,15,180,20],caption:"Nilai Gaji", tag:1, tipeText:ttNilai, text:"0"});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_loker.setSQL("select kode_loker, nama from kop_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fAgg.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fAgg.implement({
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
					sql.add("insert into kop_agg(kode_agg, kode_lokasi, nama, pasangan, alamat, no_tel, email, bank, cabang, no_rek, nama_rek, id_lain, tgl_aktif, status, jenis, kode_loker, grade, gaji) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_pasangan.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_id.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.c_status.getText()+"', '"+this.c_jenis.getText()+"', '"+this.cb_loker.getText()+"', '"+this.e_grade.getText()+"', "+parseNilai(this.e_gaji.getText())+")");
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
					sql.add("update kop_agg set nama='"+this.e_nama.getText()+"',pasangan='"+this.e_pasangan.getText()+"',alamat='"+this.e_alamat.getText()+"',no_tel='"+this.e_tel.getText()+"',email='"+this.e_mail.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',id_lain='"+this.e_id.getText()+"', tgl_aktif='"+this.dp_d1.getDateString()+"', status='"+this.c_status.getText()+"', jenis='"+this.c_jenis.getText()+"', kode_loker='"+this.cb_loker.getText()+"', grade='"+this.e_grade.getText()+"', gaji="+parseNilai(this.e_gaji.getText())+" "+
					        "where kode_agg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from kop_agg where kode_agg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select kode_agg,nama,pasangan,alamat,no_tel,email,bank,cabang,no_rek,nama_rek,id_lain, tgl_aktif, status, jenis, kode_loker, grade, gaji from kop_agg "+
						     "where kode_agg ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);
						this.e_pasangan.setText(line.pasangan);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_id.setText(line.id_lain);
						this.dp_d1.setText(line.tgl_aktif);
						this.c_status.setText(line.status);
						this.c_jenis.setText(line.jenis);
						this.cb_loker.setText(line.kode_loker);
						this.e_grade.setText(line.grade);
						this.e_gaji.setText(floatToNilai(line.gaji));
						
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
			    this.standarLib.showListData(this, "Daftar Anggota",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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