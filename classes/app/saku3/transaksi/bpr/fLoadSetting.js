window.app_saku3_transaksi_bpr_fLoadSetting = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fLoadSetting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fLoadSetting";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Awal Sistem", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_ref = new saiCBBL(this,{bound:[20,10,220,20],caption:"Lokasi Ref.",multiSelection:false,maxLength:10,change:[this,"doChange"]});		
		this.cb_baru = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"Lokasi Baru",maxLength:10,change:[this,"doChange"]});		

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_ref.setSQL("select kode_lokasi, nama from lokasi ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fLoadSetting.extend(window.childForm);
window.app_saku3_transaksi_bpr_fLoadSetting.implement({
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
					
					sql.add("insert into lokasi(kode_lokasi,nama,alamat,kota,kodepos,no_telp,no_fax,flag_konsol,logo,email,website,npwp,pic,kode_lokkonsol,tgl_pkp,flag_pusat,no_rek,bank) "+
							"select '"+this.cb_baru.getText()+"',nama,alamat,kota,kodepos,no_telp,no_fax,flag_konsol,logo,email,website,npwp,pic,kode_lokkonsol,getdate(),flag_pusat,no_rek,bank "+
							"from lokasi "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ");
					
					sql.add("insert into pp(kode_pp,kode_lokasi,nama,initial,level_spasi,tipe,sum_header,kode_induk,rowindex,kode_bidang,flag_aktif,kode_ba,kode_pc,jenis,nik,kota,bank) "+
							"select kode_pp,'"+this.cb_baru.getText()+"',nama,initial,level_spasi,tipe,sum_header,kode_induk,rowindex,kode_bidang,flag_aktif,kode_ba,kode_pc,jenis,nik,kota,bank "+
							"from pp "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ");

					sql.add("insert into karyawan(nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos) "+
							"select nik,'"+this.cb_baru.getText()+"',nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos "+
							"from karyawan "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ");

					sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) "+
							"select nik,'"+this.cb_baru.getText()+"',kode_pp "+
							"from karyawan_pp "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")

					sql.add("insert into hakakses(nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) "+
							"select nik,nama, pass, status_admin,'"+this.cb_baru.getText()+"',kode_klp_menu, klp_akses "+
							"from hakakses "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")

					sql.add("insert into masakun(kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,normal,kode_gar) "+
							"select kode_akun,'"+this.cb_baru.getText()+"',nama,modul,jenis,kode_curr,block,status_gar,normal,kode_gar "+
							"from masakun "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")

					sql.add("insert into relakun(kode_neraca,kode_fs,kode_akun,kode_lokasi) "+
							"select kode_neraca,kode_fs,kode_akun,'"+this.cb_baru.getText()+"' "+
							"from relakun "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")

					sql.add("insert into flag_relasi(kode_flag,kode_akun,kode_lokasi) "+
							"select kode_flag,kode_akun,'"+this.cb_baru.getText()+"' "+
							"from flag_relasi "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")

					sql.add("insert into spro(kode_spro,kode_lokasi,nama,modul,flag,value1,value2,keterangan) "+
							"select kode_spro,'"+this.cb_baru.getText()+"',nama,modul,flag,value1,value2,keterangan "+
							"from spro "+
							"where kode_lokasi='"+this.cb_ref.getText()+"' ")
								
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_baru);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Data berhasil disalin (Kode : "+ this.cb_baru.getText()+")");							
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
