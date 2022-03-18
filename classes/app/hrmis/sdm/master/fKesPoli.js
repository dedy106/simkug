window.app_hrmis_sdm_master_fKesPoli = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fKesPoli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fKesPoli";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Poli", 0);	
		
		uses("portalui_saiCBB;portalui_saiTable;server_util_arrayList");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,200,20],caption:"Kode Poli",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});
		this.bTampil = new portalui_button(this,{bound:[429,11,80,18],caption:"Tampil",click:[this,"doTampilClick"]});
		this.p1 = new portalui_panel(this,{bound:[10,13,500,415],caption:"Daftar Poli"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,495,389],tag:"9"});
	
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fKesPoli.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fKesPoli.implement({
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
			if (this.standarLib.checkEmptyByTag(this,[0])){
				try{
					var sql = new server_util_arrayList();
					sql.add("insert into kes_poli(kode_poli,kode_lokasi,nama) values "+
						    "	('"+this.cb_kode.getText()+"','10','"+this.e_nama.getText()+"')");
					this.dbLib.execArraySQL(sql);
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){
		try{
			if (this.standarLib.checkEmptyByTag(this,[0]))
			{
				try{
					var sql = new server_util_arrayList();
					sql.add("update kes_poli set nama = '"+this.e_nama.getText()+"' "+
						    "where kode_lokasi='10' and kode_poli = '"+this.cb_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{
			if (this.standarLib.checkEmptyByTag(this,[0])){
				try{
					var sql = new server_util_arrayList();
					sql.add("delete from kes_poli "+
						    "where kode_lokasi='10' and kode_poli = '"+this.cb_kode.getText()+"' ");					
					this.dbLib.execArraySQL(sql);
				}catch(e){
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
	doLoadData: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select nama from kes_poli "+
					       " where kode_lokasi='10' and kode_poli ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			this.sg1.setColTitle(new Array("No","Kode","Nama Poli"));				
			var data = this.dbLib.runSQL(" select kode_poli,nama from kes_poli where kode_lokasi='10' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode){   
			    this.standarLib.showListData(this, "Daftar Poli",sender,undefined, 
											  "select kode_poli, nama  from kes_poli where kode_lokasi='10' ",
											  "select count(kode_poli) from kes_poli where kode_lokasi='10' ",
											  ["kode_poli","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});