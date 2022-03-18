window.app_hrmis_sdm_master_fKesProv = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fKesProv.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fKesProv";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Provider", 0);	
		
		uses("portalui_saiCBB;portalui_saiTable;server_util_arrayList");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,200,20],caption:"Kode Provider",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50});
		this.cb_klp = new portalui_saiCBBL(this,{bound:[440,10,200,20],caption:"Kode Klp Provider",btnClick:[this,"doBtnClick"],rightLabelVisible:true});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});
		this.e_almt = new portalui_saiLabelEdit(this,{bound:[440,11,400,20],caption:"Alamat", maxLength:500});
		this.e_bank = new portalui_saiLabelEdit(this,{bound:[20,12,400,20],caption:"Bank", maxLength:100});
		this.e_cbg = new portalui_saiLabelEdit(this,{bound:[440,12,400,20],caption:"Cabang", maxLength:100});
		this.e_noRek = new portalui_saiLabelEdit(this,{bound:[20,13,400,20],caption:"No. Rekening", maxLength:100});
		this.e_nmRek = new portalui_saiLabelEdit(this,{bound:[440,13,400,20],caption:"Nama Rekening", maxLength:100});
		this.e_kota = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Kota", maxLength:100});
		this.e_telp = new portalui_saiLabelEdit(this,{bound:[440,14,400,20],caption:"No. Telepon", maxLength:100});
		this.e_fax = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"No. Faximile", maxLength:100});
		this.bTampil = new portalui_button(this,{bound:[759,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});
		this.p1 = new portalui_panel(this,{bound:[20,16,819,350],caption:"Daftar Provider"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,815,324],tag:"9"});
	
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
window.app_hrmis_sdm_master_fKesProv.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fKesProv.implement({
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
					sql.add("insert into kes_provider(kode_provider,kode_klp,kode_lokasi,nama,alamat,bank,cabang,no_rek,nama_rek,kota,no_telp,no_fax) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_klp.getText()+"','10','"+this.e_nama.getText()+
							"','"+this.e_almt.getText()+"','"+this.e_bank.getText()+"','"+this.e_cbg.getText()+
							"','"+this.e_noRek.getText()+"','"+this.e_nmRek.getText()+"','"+this.e_kota.getText()+
							"','"+this.e_telp.getText()+"','"+this.e_fax.getText()+"')");
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
					sql.add("update kes_provider set nama = '"+this.e_nama.getText()+"', "+
							"kode_klp='"+this.cb_klp.getText()+"',alamat='"+this.e_almt.getText()+"',bank='"+this.e_bank.getText()+
							"',cabang='"+this.e_cbg.getText()+"',no_rek='"+this.e_noRek.getText()+"',nama_rek='"+this.e_nmRek.getText()+
							"',kota='"+this.e_kota.getText()+"',no_telp='"+this.e_telp.getText()+"',no_fax='"+this.e_fax.getText()+
						    "' where kode_lokasi='10' and kode_provider = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from kes_provider "+
						    "where kode_lokasi='10' and kode_provider = '"+this.cb_kode.getText()+"' ");
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
				var data = this.dbLib.getDataProvider(" select a.*,b.nama as nmklp from kes_provider a inner join kes_klp_provider b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
					       " where a.kode_lokasi='10' and a.kode_provider ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_klp.setText(line.kode_klp,line.nmklp);
						this.e_nama.setText(line.nama);
						this.e_almt.setText(line.alamat);
						this.e_bank.setText(line.bank);
						this.e_cbg.setText(line.cabang);
						this.e_noRek.setText(line.no_rek);
						this.e_nmRek.setText(line.nama_rek);
						this.e_kota.setText(line.kota);
						this.e_telp.setText(line.no_telp);
						this.e_fax.setText(line.no_fax);
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
			this.sg1.setColTitle(["No","Kode","Klp Provider","Nama","Alamat","Bank","Cabang","No. Rekening","Atas Nama","Kota","Telepon","Faximile"]);
			var data = this.dbLib.runSQL(" select kode_provider,kode_klp,nama,alamat,bank,cabang,no_rek,nama_rek,kota,no_telp,no_fax from kes_provider where kode_lokasi='10' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_klp){   
			    this.standarLib.showListData(this, "Daftar Kelompok Provider",sender,undefined, 
											  "select kode_klp, nama  from kes_klp_provider where kode_lokasi='10' ",
											  "select count(kode_klp) from kes_klp_provider where kode_lokasi='10' ",
											  ["kode_klp","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kode){   
			    this.standarLib.showListData(this, "Daftar Provider",sender,undefined, 
											  "select kode_provider, nama  from kes_provider where kode_lokasi='10' ",
											  "select count(kode_provider) from kes_provider where kode_lokasi='10' ",
											  ["kode_provider","nama"],"and",["Kode","Nama"],false);				
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