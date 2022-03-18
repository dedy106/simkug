window.app_saku3_transaksi_yspt_sistem_fUbahPwd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_sistem_fUbahPwd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_sistem_fUbahPwd";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ubah Login", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"User",multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_pwdL = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Password Lama", password:true,maxLength:10,change:[this,"doChange"]});		
		this.e_pwd1 = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Password Baru", password:true,maxLength:10,readOnly:true});				
		this.e_pwd2 = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Confirm Pwd", password:true,maxLength:10,readOnly:true});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select nik, nama from hakakses where nik='"+this.app._userLog+"'",["nik","nama"],false,["NIK","Nama"],"and","Data User",true);						
			this.cb_kode.setText(this.app._userLog.toUpperCase());
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_sistem_fUbahPwd.extend(window.childForm);
window.app_saku3_transaksi_yspt_sistem_fUbahPwd.implement({
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update hakakses set pass = '"+this.e_pwd1.getText()+"' where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbUbah);
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
					setTipeButton(tbUbah);
					this.doChange(this.cb_kode);
					this.e_pwd1.setReadOnly(true);
					this.e_pwd2.setReadOnly(true);
				}
				break;			
			case "ubah" :	
				if (this.e_pwd1.getText() != this.e_pwd2.getText()) {
					system.alert(this,"Password tidak konsisten.","Lakukan Editing kembali.");
					return false;
				}
				this.ubah();
				break;							
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select pass from hakakses where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.pwdLama = line.pass;						
					}
				}
			}
			if (sender == this.e_pwdL && this.e_pwdL.getText() != ""){
				if (this.e_pwdL.getText() == this.pwdLama) {
					this.e_pwd1.setReadOnly(false);
					this.e_pwd2.setReadOnly(false);
				}
				else {
					this.e_pwd1.setReadOnly(true);
					this.e_pwd2.setReadOnly(true);
				}
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