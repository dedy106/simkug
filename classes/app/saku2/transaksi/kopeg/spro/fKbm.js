window.app_saku2_transaksi_kopeg_spro_fKbm = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fKbm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fKbm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kendaraan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"No Polisi",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_rangka = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"No Rangka", maxLength:50, tag:1});	
		this.e_mesin = new saiLabelEdit(this,{bound:[20,12,500,20],caption:"No Mesin", maxLength:50, tag:1});	
		this.e_tipe = new saiLabelEdit(this,{bound:[20,13,500,20],caption:"Tipe", maxLength:50, tag:1});			
		this.cb_cust = new saiCBBL(this,{bound:[20,14,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2});
		this.cb_jenis = new saiCBBL(this,{bound:[20,15,200,20],caption:"Jenis KBM", multiSelection:false, maxLength:10, tag:2});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi ='"+this.app._lokasi+"' ",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from fri_kbm_jenis where kode_lokasi ='"+this.app._lokasi+"' ",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis KBM",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fKbm.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fKbm.implement({
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
					//merk
					sql.add("insert into fri_kbm(no_polisi,kode_lokasi,no_rangka,no_mesin,tipe,kode_cust,kode_jenis) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_rangka.getText()+"','"+this.e_mesin.getText()+"','"+this.e_tipe.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_jenis.getText()+"')");
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
					sql.add("update fri_kbm set no_rangka='"+this.e_rangka.getText()+"',no_mesin='"+this.e_mesin.getText()+"',tipe='"+this.e_tipe.getText()+"',kode_cust='"+this.cb_cust.getText()+"',kode_jenis='"+this.cb_jenis.getText()+"' "+
					        "where no_polisi = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from fri_kbm where no_polisi = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select no_rangka,no_mesin,tipe,kode_cust,kode_jenis from fri_kbm where no_polisi ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_rangka.setText(line.no_rangka);						
						this.e_mesin.setText(line.no_mesin);						
						this.e_tipe.setText(line.tipe);						
						this.cb_cust.setText(line.kode_cust);						
						this.cb_jenis.setText(line.kode_jenis);					
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
			    this.standarLib.showListData(this, "Daftar Kendaraan",sender,undefined, 
											  "select no_polisi, tipe  from fri_kbm where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_polisi) from fri_kbm where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_polisi","tipe"],"and",["No Polisi","Tipe"],false);				
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