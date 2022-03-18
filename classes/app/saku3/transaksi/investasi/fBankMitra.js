window.app_saku3_transaksi_investasi_fBankMitra = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fBankMitra.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fBankMitra";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Bank Mitra", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,14,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_jml = new saiLabelEdit(this,{bound:[20,12,180,20],caption:"Basis [Hari]", tag:2, tipeText:ttNilai, text:"365"});
		this.e_pbunga = new saiLabelEdit(this,{bound:[20,14,180,20],caption:"Rate [%Tahun]", tag:2, tipeText:ttNilai, text:"0"});
		this.cb_klp = new saiCBBL(this,{bound:[20,13,200,20],caption:"Bank", multiSelection:false, maxLength:10, tag:2});		
		this.cb_akun = new saiCBBL(this,{bound:[20,22,200,20],caption:"Akun Bank", multiSelection:false, maxLength:10, tag:2});
		this.cb_rek = new saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Rek", multiSelection:false, maxLength:10, tag:2});
		this.e_norek = new saiLabelEdit(this,{bound:[20,11,300,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this,{bound:[20,13,300,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this,{bound:[20,14,300,20],caption:"No Fax", maxLength:50, tag:1});			
		this.bTampil = new button(this,{bound:[829,14,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});					
		
		this.p1 = new panel(this,{bound:[10,23,900,150],caption:"Daftar Bank"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,245],tag:9,readOnly:true,colTitle: ["Kode","Nama","Alamat","Bank","Basis","Rate","Kode Akun","No Rekening","Nama Rekening"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,378,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_rek.setSQL("select kode_rek, nama from bank_rek ",["kode_rek","nama"],false,["Kode","Nama"],"where","Data Rekening Bank",true);			
			this.cb_klp.setSQL("select kode_bankklp, nama from inv_bankklp ",["kode_bankklp","nama"],false,["Kode","Nama"],"where","Data Bank",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fBankMitra.extend(window.childForm);
window.app_saku3_transaksi_investasi_fBankMitra.implement({
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
					sql.add("insert into inv_bank(kode_bank,nama,alamat,kode_bankklp,jml_hari,p_bunga,kode_akun,no_rek,nama_rek,kode_rek,no_fax) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_klp.getText()+"',"+parseNilai(this.e_jml.getText())+","+parseNilai(this.e_pbunga.getText())+",'"+this.cb_akun.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_rek.getText()+"','"+this.e_fax.getText()+"')");					
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
					sql.add("update inv_bank set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kode_bankklp='"+this.cb_klp.getText()+"',jml_hari="+parseNilai(this.e_jml.getText())+",p_bunga="+parseNilai(this.e_pbunga.getText())+",kode_akun='"+this.cb_akun.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',kode_rek='"+this.cb_rek.getText()+"' "+
					        "where kode_bank='"+this.cb_kode.getText()+"'");
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
					sql.add("delete from inv_bank where kode_bank='"+this.cb_kode.getText()+"'");			
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
				var data = this.dbLib.getDataProvider("select a.nama,a.alamat,a.kode_bankklp,a.jml_hari,a.p_bunga,a.kode_akun,a.no_rek,a.nama_rek,a.kode_rek from inv_bank a "+						   
						   "where a.kode_bank ='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.cb_klp.setText(line.kode_bankklp);						
						this.e_jml.setText(floatToNilai(line.jml_hari));
						this.e_pbunga.setText(floatToNilai(line.p_bunga));
						this.cb_akun.setText(line.kode_akun);						
						this.cb_rek.setText(line.kode_rek);						
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
	doTampilClick: function(sender){
		try{					
			var temp = this.dbLib.runSQL("select kode_bank,nama,alamat,kode_bankklp,jml_hari,p_bunga,kode_akun,no_rek,nama_rek from inv_bank order by kode_bank");
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
			    this.standarLib.showListData(this, "Daftar Bank",sender,undefined, 
											  "select kode_bank, nama  from inv_bank",
											  "select count(kode_bank) from inv_bank",
											  ["kode_bank","nama"],"where",["Kode","Nama"],false);				
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