window.app_saku2_transaksi_inv_fCabang = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_inv_fCabang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_inv_fCabang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Cabang",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50});	
		this.cb_cust = new saiCBBL(this,{bound:[20,13,200,20],caption:"Kode Customer",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.cb_prov = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kode Provinsi",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.cb_kota = new saiCBBL(this,{bound:[20,15,200,20],caption:"Kode Kota",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.e_alamat = new saiLabelEdit(this,{bound:[20,16,400,20],caption:"Alamat", maxLength:100});	
		this.bTampil = new button(this,{bound:[829,16,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar "+this.app._namaForm});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,250],tag:9,readOnly:true,colTitle: ["Kode Cabang","Nama","Kode Cust","Nama Cust","Prov","Kota","Alamat"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,275,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
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
window.app_saku2_transaksi_inv_fCabang.extend(window.childForm);
window.app_saku2_transaksi_inv_fCabang.implement({
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
					sql.add("insert into inv_cabang(kode_cabang,nama,kode_lokasi,kode_cust,kode_prov,kode_kota,alamat) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.cb_prov.getText()+
							"','"+this.cb_kota.getText()+"','"+this.e_alamat.getText()+"')");
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
					sql.add("delete from inv_cabang where kode_cabang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into inv_cabang(kode_cabang,nama,kode_lokasi,kode_cust,kode_prov,kode_kota,alamat) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.cb_prov.getText()+
							"','"+this.cb_kota.getText()+"','"+this.e_alamat.getText()+"')");					setTipeButton(tbAllFalse);
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
					sql.add("delete from inv_cabang where kode_cabang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var sql = "select a.nama,a.kode_cust,a.kode_prov,a.kode_kota,a.alamat,b.nama as nama_cust,c.nama as nama_prov,d.nama as nama_kota "+
				           "from inv_cabang a "+
						   "inner join inv_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_prov c on a.kode_prov=c.kode_prov and a.kode_lokasi=c.kode_lokasi "+
						   "inner join inv_kota d on a.kode_kota=d.kode_kota and a.kode_lokasi=d.kode_lokasi "+
						   "where a.kode_cabang ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
				
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_nama.setText(line.nama);
						this.cb_cust.setText(line.kode_cust,line.nama_cust);
						this.cb_prov.setText(line.kode_prov,line.nama_prov);
						this.cb_kota.setText(line.kode_kota,line.nama_kota);
						this.e_alamat.setText(line.alamat);
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
			var sql = "select a.nama,a.kode_cust,b.nama as nama_cust,c.nama as nama_prov,d.nama as nama_kota,a.alamat "+
				           "from inv_cabang a "+
						   "inner join inv_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_prov c on a.kode_prov=c.kode_prov and a.kode_lokasi=c.kode_lokasi "+
						   "inner join inv_kota d on a.kode_kota=d.kode_kota and a.kode_lokasi=d.kode_lokasi "+
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
			    this.standarLib.showListData(this, "Daftar Cabang",sender,undefined, 
											  "select kode_cabang, nama  from inv_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_cabang) from inv_cabang where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_cabang","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama  from inv_cust where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_cust) from inv_cust where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_cust","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_prov) {   
			    this.standarLib.showListData(this, "Daftar Prov",sender,undefined, 
											  "select kode_prov, nama  from inv_prov where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_prov) from inv_prov where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_prov","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kota) {   
			    this.standarLib.showListData(this, "Daftar Kota",sender,undefined, 
											  "select kode_kota, nama  from inv_kota where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_kota) from inv_kota where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_kota","nama"],"and",["Kode","Nama"],false);				
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