window.app_sc_master_fVendor = function(owner)
{
	if (owner)
	{
		window.app_sc_master_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_master_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"No Telpon", maxLength:50, tag:1});					
		this.e_hp = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"No HP", maxLength:50, tag:1});	
		this.e_mail = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this,{bound:[20,16,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this,{bound:[20,17,400,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this,{bound:[20,18,300,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,300,20],caption:"Bank", maxLength:50, tag:1});			
		this.e_cabang = new saiLabelEdit(this,{bound:[20,20,400,20],caption:"Cabang", maxLength:50, tag:1});			
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama Rekening", maxLength:50, tag:1});					
		/*
		this.bTampil = new button(this,{bound:[829,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});					
		this.p1 = new panel(this,{bound:[10,23,900,245],caption:"Daftar Vendor"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,220],tag:9,readOnly:true,
			colTitle: ["Kode","Nama","Alamat","No Telpon","No HP","Email","NPWP","Alamat NPWP","PIC","Bank","Cabang","No Rekening","Nama Rekening"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,258,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		*/
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
window.app_sc_master_fVendor.extend(window.childForm);
window.app_sc_master_fVendor.implement({
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
					sql.add("insert into sc_vendor(kode_vendor,nama,alamat,no_tel,no_hp,email,npwp,pic,bank,cabang,no_rek,nama_rek,alamat2) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_hp.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_alamat2.getText()+"')");
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
					sql.add("update sc_vendor set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',no_tel='"+this.e_tel.getText()+"',no_hp='"+this.e_hp.getText()+"',email='"+this.e_mail.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',alamat2='"+this.e_alamat2.getText()+"' "+
					        "where kode_vendor = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from sc_vendor where kode_vendor = '"+this.cb_kode.getText()+"'");			
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
				var strSQL = "select kode_vendor,nama,alamat,no_tel,no_hp,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek from sc_vendor "+
						     "where kode_vendor ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);
						this.e_hp.setText(line.no_hp);
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);						
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
	/*
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_vendor,nama,alamat,no_tel,no_hp,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek "+
			                             "from sc_vendor order by kode_vendor");
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
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	*/
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from sc_vendor",
											  "select count(kode_vendor) from sc_vendor",
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