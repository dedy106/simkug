window.app_eclaim_transaksi_fAdvPayment = function(owner) {
	if (owner){
		window.app_eclaim_transaksi_fAdvPayment.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_transaksi_fAdvPayment";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Laporan Awal", 0);	
		
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,1,200,20], caption:"Kode Jenis", btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		this.bGen = new portalui_button(this,{bound:[230,1,80,20],caption:"Generate",click:"doClick"});
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,2,500,20],caption:"Deskripsi"});
		this.ed_skode = new portalui_saiLabelEdit(this,{bound:[20,3,150,20],caption:"SKODE",maxLength:3});
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
	}
};
window.app_eclaim_transaksi_fAdvPayment.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fAdvPayment.implement({
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();
			switch(event){
				case "simpan" :
					sql.add("insert into eclaim_asuransi (kode_jenis, nama, skode, kode_lokasi, tgl_input, nik_user)values"+
						"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_skode.getText()+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"') ");
				break;
				case "ubah" :
					sql.add("update eclaim_asuransi set nama = '"+this.ed_kode.getText()+"', skode='"+this.ed_skode.getText()+"' where kode_lokasi = '"+this.app._lokasi+"' and kode_jenis ='"+this.ed_kode.getText()+"'  ");
				break;
				case "delete" :
					sql.add("delete from eclaim_asuransi where kode_lokasi = '"+this.app._lokasi+"' and kode_jenis ='"+this.ed_kode.getText()+"'  ");
				break;
			}
			this.dbLib.execArraySQL(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Jenis Asuransi",this.ed_kode,this.ed_nama, 
										  "select kode_jenis, nama, skode from eclaim_asuransi where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_jenis) from eclaim_asuransi where kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_jenis","nama","skode"],"and",["Jenis Asuransi","Deskripsi"],false); 
	},
	doChange: function(sender){
		this.ed_nama.clear();
		this.ed_skode.clear();
		if (sender.getText() != ""){	
			var kode = this.dbLib.getDataProvider("select nama, skode from eclaim_asuransi where kode_lokasi = '"+this.app._lokasi+"' and kode_jenis = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				this.ed_skode.setText(kode.rs.rows[0].skode);
				this.ed_nama.setText(kode.rs.rows[0].nama);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_asuransi','kode_jenis',this.app._lokasi+"-JA.",'000'));
	},
	doRequestReady: function(sender, methodName, result){
		if (methodName == "execArraySQL" && result.search("error") != -1){
			this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
			this.app._mainForm.bClear.click();
		}else{
			systemAPI.alert(result);
		}
	}
});