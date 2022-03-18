window.app_saku2_transaksi_yks_fInputPeserta = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fInputPeserta.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_fInputPeserta";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Peserta Tambahan : Input", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_data = new saiCBBL(this,{bound:[20,10,222,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});
		this.e_nik = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"NIK", maxLength:20});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"Nama", maxLength:20});		
		this.e_band = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Band", maxLength:20});		
		this.cb_hr = new saiCBBL(this,{bound:[20,14,222,20],caption:"Data HR", multiSelection:false, maxLength:10, tag:2});
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		
		this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
		this.cb_hr.setSQL("select kode_cust, nama from cust ",["kode_cust","nama"],false,["Kode","Nama"],"where","Data HR",true);			
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_yks_fInputPeserta.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_fInputPeserta.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);									
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :		
					var data = this.dbLib.getDataProvider("select nik from yk_peserta_d where nik='"+this.e_nik.getText()+"' and no_load='"+this.cb_data.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined) {
						system.alert(this,"Transaksi tidak valid.","NIK sudah terdaftar.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							sql.add("insert into yk_peserta_d(no_load,kode_lokasi,nik,nama,band,loker) values "+							
								    "('"+this.cb_data.getText()+"','"+this.app._lokasi+"','"+this.e_nik.getText()+"','"+this.e_nama.getText()+"','"+this.e_band.getText()+"','"+this.cb_hr.getText()+"')");
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
