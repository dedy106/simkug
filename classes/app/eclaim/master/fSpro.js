window.app_eclaim_master_fSpro = function(owner)
{
	if (owner)
	{
		window.app_eclaim_master_fSpro.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_master_fSpro";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data lokasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20], caption:"Kode Tertanggung", btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		this.e_email_adm = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Email Admin", maxLength:100});
		this.e_email_ttg = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Email Tertanggung", maxLength:100});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim_master_fSpro.extend(window.childForm);
window.app_eclaim_master_fSpro.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into eclaim_spro (kode_ttg,email_adm, email_ttg,kode_lokasi) values"+
						"('"+this.ed_kode.getText()+"','"+this.e_email_adm.getText()+"','"+this.e_email_adm.getText()+"','45') ");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update eclaim_spro set email_adm = '"+this.e_email_adm.getText()+"',email_ttg='"+this.e_email_ttg.getText()+"' where kode_ttg='"+this.ed_kode.getText()+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from eclaim_spro  where kode_ttg='"+this.ed_kode.getText()+"'");
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
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Tertanggung",this.ed_kode,this.ed_nama, 
										  "select kode_ttg, nama from eclaim_ttg ",
										  "select count(kode_ttg) from eclaim_ttg ",
										  ["kode_ttg","nama"],"where",["Kode","Nama"],false); 
	},	
	doChange: function(sender){
		this.e_email_adm.clear();
		this.e_email_ttg.clear();
		if (sender.getText() != ""){
			
			var kode = this.dbLib.getDataProvider("select email_adm,email_ttg from eclaim_spro where kode_ttg = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){	
				this.e_email_adm.setText(kode.rs.rows[0].email_adm);
				this.e_email_ttg.setText(kode.rs.rows[0].email_ttg);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
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