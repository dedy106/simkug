window.app_patra_hutang_fVendor = function(owner)
{
	if (owner)
	{
		window.app_patra_hutang_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_patra_hutang_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_kodepos = new saiLabelEdit(this,{bound:[240,13,180,20],caption:"Kode Pos", maxLength:5, tipeText:ttAngka, tag:1});	
		this.e_telp = new saiLabelEdit(this,{bound:[20,15,400,20],caption:"No Telpon", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"No Fax", maxLength:20, tag:1});	
		this.e_pic = new saiLabelEdit(this,{bound:[20,18,300,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_npwp = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Bank", maxLength:50, tag:1});			
		
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
window.app_patra_hutang_fVendor.extend(window.childForm);
window.app_patra_hutang_fVendor.implement({
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
					sql.add("insert into vendor(kode_vendor,nama,kode_lokasi,alamat,kota,kode_pos,no_telp,no_fax,npwp,pic,bank,alamat2) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_bank.getText()+"','"+this.e_alamat2.getText()+"')");
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
					sql.add("update vendor set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kota='"+this.e_kota.getText()+"',kode_pos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',no_fax='"+this.e_fax.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',bank='"+this.e_bank.getText()+"',alamat2='"+this.e_alamat2.getText()+"' "+
					        "where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from vendor where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				var data = this.dbLib.getDataProvider("select a.nama,a.alamat,a.kota,a.kode_pos,a.no_telp,a.no_fax,a.npwp,a.alamat2,a.pic,a.bank  "+
				           " from vendor a "+						   
						   " where a.kode_vendor ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_kodepos.setText(line.kode_pos);
						this.e_telp.setText(line.no_telp);
						this.e_fax.setText(line.no_fax);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);						
						this.e_bank.setText(line.bank);												
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
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
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