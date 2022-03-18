window.app_saku2_transaksi_inv_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_inv_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_inv_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:50});	
		this.cb_jab = new saiCBBL(this,{bound:[20,13,200,20],caption:"Kode Jabatan",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.cb_loker = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kode Loker",maxLength:10,btnClick:[this,"doBtnClick"]});
		this.e_alamat = new saiLabelEdit(this,{bound:[20,15,400,20],caption:"Alamat", maxLength:100});	
		this.e_telp = new saiLabelEdit(this,{bound:[20,16,400,20],caption:"No Telp", maxLength:100});
		this.e_email = new saiLabelEdit(this,{bound:[20,17,400,20],caption:"Email", maxLength:100});
		this.bTampil = new button(this,{bound:[829,17,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar "+this.app._namaForm});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,250],tag:9,readOnly:true,colTitle: ["NIK","Nama","Jabatan","Lokasi Kerja","Alamat","No Telp","Email"]});		
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
window.app_saku2_transaksi_inv_fKaryawan.extend(window.childForm);
window.app_saku2_transaksi_inv_fKaryawan.implement({
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
					sql.add("insert into inv_karyawan(nik,nama,kode_lokasi,kode_jab,kode_loker,alamat,no_telp,email) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+
							"','"+this.e_alamat.getText()+"','"+this.e_telp.getText()+"','"+this.e_email.getText()+"')");
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
					sql.add("delete from inv_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into inv_karyawan(nik,nama,kode_lokasi,kode_jab,kode_loker,alamat,no_telp,email) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+
							"','"+this.e_alamat.getText()+"','"+this.e_telp.getText()+"','"+this.e_email.getText()+"')");
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
					sql.add("delete from inv_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var sql = "select a.nama,a.kode_jab,a.kode_loker,a.alamat,a.no_telp,a.email,b.nama as nama_jab,c.nama as nama_loker "+
				           "from inv_karyawan a "+
						   "inner join inv_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_loker c on a.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
				
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_nama.setText(line.nama);
						this.cb_jab.setText(line.kode_jab,line.nama_jab);
						this.cb_loker.setText(line.kode_loker,line.nama_loker);
						this.e_alamat.setText(line.alamat);
						this.e_telp.setText(line.no_telp);
						this.e_email.setText(line.email);
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
			var sql = "select a.nama,b.nama as nama_jab,c.nama as nama_loker,a.alamat,a.no_telp,a.email "+
				           "from inv_karyawan a "+
						   "inner join inv_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
						   "inner join inv_loker c on a.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi "+
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
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from inv_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from inv_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_jab) {   
			    this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
											  "select kode_jab, nama  from inv_jab where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_jab) from inv_jab where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_jab","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_loker) {   
			    this.standarLib.showListData(this, "Daftar Loker",sender,undefined, 
											  "select kode_loker, nama  from inv_loker where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_loker) from inv_loker where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_loker","nama"],"and",["Kode","Nama"],false);				
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