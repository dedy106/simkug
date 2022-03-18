window.app_inv_master_fBarang = function(owner)
{
	if (owner)
	{
		window.app_inv_master_fBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_inv_master_fBarang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Barang",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50});	
		this.cb_klpbarang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Klp Barang",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.cb_merk = new saiCBBL(this,{bound:[20,14,200,20],caption:"Merk",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.e_tipe = new saiLabelEdit(this,{bound:[20,15,400,20],caption:"Tipe", maxLength:50});	
		this.e_serial = new saiLabelEdit(this,{bound:[20,16,400,20],caption:"Serial", maxLength:50});	
		this.e_modul = new saiLabelEdit(this,{bound:[20,17,400,20],caption:"Modul", maxLength:50});	
		this.e_snmodul = new saiLabelEdit(this,{bound:[20,18,400,20],caption:"SN Modul", maxLength:50});	
		this.e_voip = new saiLabelEdit(this,{bound:[20,19,400,20],caption:"Voip", maxLength:50});	
		this.e_snvoip = new saiLabelEdit(this,{bound:[20,20,400,20],caption:"SN Voip", maxLength:50});	
		this.cb_lokasi = new saiCBBL(this,{bound:[20,21,200,20],caption:"Lokasi Barang",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.bTampil = new button(this,{bound:[829,21,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,270],caption:"Daftar "+this.app._namaForm});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,220],tag:9,readOnly:true,colTitle: ["Kode Barang","Nama","Kelompok Barang","Merk","Tipe","Serial","Modul","SN Modul","Voip",,"SN Voip"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,245,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_inv_master_fBarang.extend(window.childForm);
window.app_inv_master_fBarang.implement({
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into inv_barang(kode_barang,nama,kode_lokasi,klp_barang,kode_merk,tipe,serial,modul,sn_modul,voip,sn_voip,kode_cabang,status,no_pasang) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_klpbarang.getText()+"','"+this.cb_merk.getText()+
							"','"+this.e_tipe.getText()+"','"+this.e_serial.getText()+"','"+this.e_modul.getText()+"','"+this.e_snmodul.getText()+"','"+this.e_voip.getText()+"','"+this.e_snvoip.getText()+"','"+this.cb_lokasi.getText()+"','READY','-')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update inv_barang set "+
							"nama='"+this.e_nama.getText()+"',klp_barang='"+this.cb_klpbarang.getText()+"',kode_merk='"+this.cb_merk.getText()+"',tipe='"+this.e_tipe.getText()+"',serial='"+this.e_serial.getText()+"',modul='"+this.e_modul.getText()+"',sn_modul='"+this.e_snmodul.getText()+"',voip='"+this.e_voip.getText()+"',sn_voip='"+this.e_snvoip.getText()+"',kode_cabang='"+this.cb_lokasi.getText()+"' "+
							"where kode_barang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_barang where kode_barang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var sql = "select a.nama,a.klp_barang,a.kode_merk,a.tipe,a.serial,a.modul,a.sn_modul,a.voip,a.sn_voip,b.nama as nama_klp,c.nama as nama_merk,a.kode_cabang,d.nama as nama_cabang "+
				           "from inv_barang a "+
						   "inner join inv_klpbarang b on a.klp_barang=b.klp_barang and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_merk c on a.kode_merk=c.kode_merk and a.kode_lokasi=c.kode_lokasi "+
						   "inner join inv_cabang d on a.kode_cabang=d.kode_cabang and a.kode_lokasi=d.kode_lokasi "+
						   "where a.kode_barang ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_nama.setText(line.nama);
						this.cb_klpbarang.setText(line.klp_barang,line.nama_klp);
						this.cb_merk.setText(line.kode_merk,line.nama_merk);
						this.e_tipe.setText(line.tipe);
						this.e_serial.setText(line.serial);
						this.e_modul.setText(line.modul);
						this.e_snmodul.setText(line.sn_modul);
						this.e_voip.setText(line.voip);
						this.e_snvoip.setText(line.sn_voip);
						this.cb_lokasi.setText(line.kode_cabang,line.nama_cabang);
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
			var sql = "select a.kode_barang,a.nama,b.nama as nama_klp,c.nama as nama_merk,a.tipe,a.serial,a.modul,a.sn_modul,a.voip,a.sn_voip,a.kode_cabang,d.nama as nama_cabang "+
				           "from inv_barang a "+
						   "inner join inv_klpbarang b on a.klp_barang=b.klp_barang and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_merk c on a.kode_merk=c.kode_merk and a.kode_lokasi=c.kode_lokasi "+
						   "inner join inv_cabang d on a.kode_cabang=d.kode_cabang and a.kode_lokasi=d.kode_lokasi "+
						   "where a.kode_lokasi = '"+this.app._lokasi+"' ";
			var temp = this.dbLib.runSQL(sql);
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_barang, nama  from inv_barang where kode_lokasi = '"+this.app._lokasi+"' and no_pasang='-'",
											  "select count(kode_barang) from inv_barang where kode_lokasi = '"+this.app._lokasi+"' and no_pasang='-'",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_klpbarang) {   
			    this.standarLib.showListData(this, "Daftar Kelompok Barang",sender,undefined, 
											  "select klp_barang, nama  from inv_klpbarang where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(klp_barang) from inv_klpbarang where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["klp_barang","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_merk) {   
			    this.standarLib.showListData(this, "Daftar Merk",sender,undefined, 
											  "select kode_merk, nama  from inv_merk where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_merk) from inv_merk where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_merk","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_lokasi) {   
			    this.standarLib.showListData(this, "Daftar Lokasi Barang",sender,undefined, 
											  "select kode_cabang, nama  from inv_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_cabang) from inv_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_cabang","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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