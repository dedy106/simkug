window.app_eclaim_master_fLostAd = function(owner) {
	if (owner){
		window.app_eclaim_master_fLostAd.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_master_fLostAd";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Loss Adjuster", 0);	
		
		uses("portalui_checkBox");
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,1,200,20], caption:"Kode", btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		this.bGen = new portalui_button(this,{bound:[230,1,80,20],caption:"Generate",click:"doClick"});
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,2,500,20],caption:"Nama",maxLength:100, tag:1});
		this.ed_alamat = new portalui_saiLabelEdit(this,{bound:[20,3,500,20],caption:"Alamat", maxLength:100, tag:1});
		this.ed_kota = new portalui_saiLabelEdit(this,{bound:[20,4,300,20],caption:"Kota", maxLength:50, tag:1});
		this.ed_kdpos = new portalui_saiLabelEdit(this,{bound:[20,5,200,20],caption:"Kode Pos", maxLength:10, tag:1});
		this.ed_telp = new portalui_saiLabelEdit(this,{bound:[20,6,200,20],caption:"No Telepon", maxLength:50, tag:1});
		this.ed_fax = new portalui_saiLabelEdit(this,{bound:[20,7,200,20],caption:"No Fax", maxLength:50, tag:1});
		this.ed_pic = new portalui_saiLabelEdit(this,{bound:[20,8,300,20],caption:"PIC", maxLength:30, tag:1});
		this.ed_email = new portalui_saiLabelEdit(this,{bound:[20,9,300,20],caption:"Email", maxLength:50, tag:1});
		this.ed_web = new portalui_saiLabelEdit(this,{bound:[20,10,300,20],caption:"Website", maxLength:50, tag:1});
		this.ed_npwp = new portalui_saiLabelEdit(this,{bound:[20,11,300,20],caption:"NPWP", maxLength:30, tag:1});		
		this.ed_skode = new portalui_saiLabelEdit(this,{bound:[20,3,150,20],caption:"SKODE",maxLength:10});
		this.ed_aktif = new portalui_checkBox(this,{bound:[20,5,150,20],caption:"Status Aktif"});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
	}
};
window.app_eclaim_master_fLostAd.extend(window.portalui_childForm);
window.app_eclaim_master_fLostAd.implement({
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
			var aktif = this.ed_aktif.isSelected() ? "1" :"0";
			switch(event){
				case "clear":
					this.standarLib.clearByTag(this,["0","1"],this.ed_kode);
				break;
				case "simpan" :
					sql.add("insert into eclaim_la (kode_la, nama, alamat, kota, kodepos, no_telp, no_fax, pic, email, web, npwp, skode, status,kode_lokasi, tgl_input, nik_user)values"+
						"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+this.ed_kota.getText()+"','"+this.ed_kdpos.getText()+"',"+
						"'"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_pic.getText()+"','"+this.ed_email.getText()+"','"+this.ed_web.getText()+"',"+
						"'"+this.ed_npwp.getText()+"','"+this.ed_skode.getText()+"','"+aktif+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"') ");
				break;
				case "ubah" :
					sql.add("update eclaim_la set nama = '"+this.ed_nama.getText()+"', skode='"+this.ed_skode.getText()+"' "+
					", alamat='"+this.ed_alamat.getText()+"', kota='"+this.ed_kota.getText()+"', kodepos = '"+this.ed_kdpos.getText()+"' "+
					", no_telp='"+this.ed_telp.getText()+"', no_fax='"+this.ed_fax.getText()+"', pic='"+this.ed_pic.getText()+"', email ='"+this.ed_email.getText()+"' "+
					", web='"+this.ed_web.getText()+"', npwp = '"+this.ed_npwp.getText()+"', status='"+aktif+"' "+
					" where kode_lokasi = '"+this.app._lokasi+"' and kode_la ='"+this.ed_kode.getText()+"'  ");
				break;
				case "delete" :
					sql.add("delete from eclaim_la where kode_lokasi = '"+this.app._lokasi+"' and kode_la ='"+this.ed_kode.getText()+"'  ");
				break;
			}
			this.dbLib.execArraySQL(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Tertanggung",this.ed_kode,this.ed_nama, 
										  "select kode_la, nama from eclaim_la where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_la) from eclaim_la where kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_la","nama"],"and",["Kode Lost Adjuster","Nama"],false); 
	},
	doChange: function(sender){
		this.ed_nama.clear();
		this.ed_skode.clear();
		if (sender.getText() != ""){	
			var kode = this.dbLib.getDataProvider("select nama, alamat, kota, kodepos, no_telp, no_fax, pic, email, web, npwp, skode from eclaim_la where kode_lokasi = '"+this.app._lokasi+"' and kode_la = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				var line = kode.rs.rows[0];
				this.ed_skode.setText(line.skode);
				this.ed_nama.setText(line.nama);
				this.ed_alamat.setText(line.alamat);
				this.ed_kota.setText(line.kota);
				this.ed_kdpos.setText(line.kodepos);
				this.ed_telp.setText(line.no_telp);
				this.ed_fax.setText(line.no_fax);
				this.ed_pic.setText(line.pic);
				this.ed_email.setText(line.email);
				this.ed_web.setText(line.web);
				this.ed_npwp.setText(line.npwp);
				this.ed_aktif.setSelected(line.status == "1");
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_la','kode_la',"LA",'000'));
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