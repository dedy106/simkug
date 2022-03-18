window.app_saku3_transaksi_tu_proyekbaru_fUbahTglAdm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fUbahTglAdm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fUbahTglAdm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perubahan Tgl Maksimal Administrasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"ID Proyek", multiSelection:false, change:[this,"doChange"]});	
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"TglMax Admintrasi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18]}); 
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_kode.setSQL("select kode_proyek,nama from prb_proyek where versi='PRO20' and modul='PROYEK' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fUbahTglAdm.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fUbahTglAdm.implement({			
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
					sql.add("update prb_proyek set tgl_admin='"+this.dp_d1.getDateString()+"' where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into prb_proyektgl_his (kode_lokasi,kode_proyek,tgl_adm) values ('"+this.app._lokasi+"','"+this.cb_kode.getText()+"','"+this.dp_d1.getDateString()+"') ");
					
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
			case "ubah" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
					
		}
	},	
	doChange: function(sender){
		try{				
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from prb_proyek where versi='PRO20' and kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tgl_admin);						
						setTipeButton(tbUbah);						
					}					
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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