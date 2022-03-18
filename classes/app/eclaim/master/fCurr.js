window.app_eclaim_master_fCurr = function(owner) {
	if (owner){
		window.app_eclaim_master_fCurr.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_master_fCurr";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Currency", 0);	
		
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,1,200,20], caption:"Kode Curr", btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,2,500,20],caption:"Deskripsi"});
		this.ed_skode = new portalui_saiLabelEdit(this,{bound:[20,3,150,20],caption:"SKODE",maxLength:5});
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
	}
};
window.app_eclaim_master_fCurr.extend(window.portalui_childForm);
window.app_eclaim_master_fCurr.implement({
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
					sql.add("insert into eclaim_curr (kode_curr, nama, skode)values"+
						"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_skode.getText()+"') ");
				break;
				case "ubah" :
					sql.add("update eclaim_curr set nama = '"+this.ed_nama.getText()+"',skode='"+this.ed_skode.getText()+"' where kode_curr ='"+this.ed_kode.getText()+"'  ");
				break;
				case "hapus" :
					sql.add("delete from eclaim_curr where kode_curr ='"+this.ed_kode.getText()+"'");
				break;
			}
			this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);	
			this.dbLib.execArraySQL(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Currency",this.ed_kode,this.ed_nama, 
										  "select kode_curr, nama from eclaim_curr ",
										  "select count(kode_curr) from eclaim_curr ",
										  ["kode_curr","nama"],"where",["Jenis Asuransi","Deskripsi"],false); 
	},
	doChange: function(sender){
		this.ed_nama.clear();
		this.ed_skode.clear();
		if (sender.getText() != ""){
			var kode = this.dbLib.getDataProvider("select nama,skode from eclaim_curr where kode_curr = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){	
				this.ed_nama.setText(kode.rs.rows[0].nama);
				this.ed_skode.setText(kode.rs.rows[0].skode);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_curr','kode_curr',this.app._lokasi+"-JA.",'000'));
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