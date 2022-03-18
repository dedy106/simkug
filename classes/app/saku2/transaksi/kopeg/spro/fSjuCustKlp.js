window.app_saku2_transaksi_kopeg_spro_fSjuCustKlp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fSjuCustKlp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fSjuCustKlp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Tertanggung", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_piutang = new saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});
		this.cb_fee = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:2});
		this.cb_diskon = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Diskon", multiSelection:false, maxLength:10, tag:2});		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                       "where b.kode_flag = '003' and b.kode_lokasi = '"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_fee.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                   "where b.kode_flag = '022' and b.kode_lokasi = '"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_diskon.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                      "where b.kode_flag = '022' and b.kode_lokasi = '"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);				   
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fSjuCustKlp.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fSjuCustKlp.implement({
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
					var data = this.dbLib.getDataProvider("select kode_lokasi from lokasi where flag_konsol='0'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							sql.add("insert into sju_cust_klp(kode_klp,kode_lokasi,nama,akun_piutang,akun_fee,akun_diskon) values "+
									"('"+this.cb_kode.getText()+"','"+line.kode_lokasi+"','"+this.e_nama.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_fee.getText()+"','"+this.cb_diskon.getText()+"')");
						}
					}					
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
					sql.add("update sju_cust_klp set nama='"+this.e_nama.getText()+"',akun_piutang='"+this.cb_piutang.getText()+"',akun_fee='"+this.cb_fee.getText()+"',akun_diskon='"+this.cb_diskon.getText()+"' "+
					        "where kode_klp = '"+this.cb_kode.getText()+"'");  //and kode_lokasi='"+this.app._lokasi+"'
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
					sql.add("delete from sju_cust_klp where kode_klp = '"+this.cb_kode.getText()+"'");//and kode_lokasi='"+this.app._lokasi+"'
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
				var strSQL = "select * from sju_cust_klp where kode_klp ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_piutang.setText(line.akun_piutang);
						this.cb_fee.setText(line.akun_fee);
						this.cb_diskon.setText(line.akun_diskon);
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
			    this.standarLib.showListData(this, "Daftar Kelompok Tertanggung",sender,undefined, 
											  "select kode_klp, nama  from sju_cust_klp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klp) from sju_cust_klp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_klp","nama"],"and",["Kode","Nama"],false);				
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