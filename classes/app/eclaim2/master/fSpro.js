window.app_eclaim2_master_fSpro = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_master_fSpro.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fSpro";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data lokasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_email = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Email Admin", maxLength:100});
		this.e_emailcc = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Email Tertanggung", maxLength:100});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			setTipeButton(tbUbah);
			var data = this.dbLib.getDataProvider("select email_adm,email_ttg from tlk_spro where kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_email.setText(line.email_adm);
					this.e_emailcc.setText(line.email_ttg);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fSpro.extend(window.childForm);
window.app_eclaim2_master_fSpro.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update tlk_spro set email_adm = '"+this.e_email.getText()+"',email_ttg='"+this.e_emailcc.getText()+"' where kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"Transaksi telah sukses tereksekusi ","");	
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