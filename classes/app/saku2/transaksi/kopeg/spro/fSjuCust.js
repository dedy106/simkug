window.app_saku2_transaksi_kopeg_spro_fSjuCust = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fSjuCust.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fSjuCust";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tertanggung", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_tagih = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cust Tagihan", multiSelection:false, maxLength:10, tag:1});
		this.cb_klp = new saiCBBL(this,{bound:[20,15,200,20],caption:"Kelompok Ttg", multiSelection:false, maxLength:10, tag:2});
		this.cb_group = new saiCBBL(this,{bound:[20,16,200,20],caption:"Group Ttg", multiSelection:false, maxLength:10, tag:2});
		this.cb_segmen = new saiCBBL(this,{bound:[20,15,200,20],caption:"Segmen", multiSelection:false, maxLength:10, tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,12,180,20],caption:"Various",items:["VARIOUS","NON"], readOnly:true,tag:2});
		
		this.e_alamat = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,12,500,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_tel = new saiLabelEdit(this,{bound:[20,13,500,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this,{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this,{bound:[20,15,500,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_pic = new saiLabelEdit(this,{bound:[20,16,500,20],caption:"Contact Person", maxLength:50, tag:1});	
		this.e_dep = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"Departemen", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this,{bound:[20,18,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_nohp = new saiLabelEdit(this,{bound:[20,19,500,20],caption:"Hand Phone", maxLength:50, tag:1});	
		this.e_fax2 = new saiLabelEdit(this,{bound:[20,20,500,20],caption:"Faximile PIC", maxLength:50, tag:1});			
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_klp.setSQL("select kode_klp,nama from sju_cust_klp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);
			this.cb_group.setSQL("select kode_group,nama from sju_cust_group where kode_lokasi = '"+this.app._lokasi+"'",["kode_group","nama"],false,["Kode","Nama"],"and","Data Group",true);
			this.cb_tagih.setSQL("select kode_cust,nama from sju_cust where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			this.cb_segmen.setSQL("select kode_segmen,nama from sju_segmen ",["kode_segmen","nama"],false,["Kode","Nama"],"and","Data Segmen",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fSjuCust.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fSjuCust.implement({
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
					if (this.cb_tagih.getText() == "-") var kodeTagih = this.cb_kode.getText();
					else kodeTagih = this.cb_tagih.getText();
					sql.add("insert into sju_cust(kode_cust,kode_lokasi,nama,kode_klp,jenis,  alamat,kota,no_tel,no_fax,npwp,pic,departemen,email,no_hp,no_fax2,alamat2,kode_tagih,kode_group,kode_segmen) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_klp.getText()+"','"+this.c_jenis.getText()+"', '"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_dep.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+"','"+this.e_fax2.getText()+"','"+this.e_alamat.getText()+"','"+kodeTagih+"','"+this.cb_group.getText()+"','"+this.cb_segmen.getText()+"')");
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
					if (this.cb_tagih.getText() == "-") var kodeTagih = this.cb_kode.getText();
					else kodeTagih = this.cb_tagih.getText();
					sql.add("update sju_cust set nama='"+this.e_nama.getText()+"',kode_klp='"+this.cb_klp.getText()+"',jenis='"+this.c_jenis.getText()+"',alamat='"+this.e_alamat.getText()+"',kota='"+this.e_kota.getText()+"',no_tel='"+this.e_tel.getText()+"',no_fax='"+this.e_fax.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',departemen='"+this.e_dep.getText()+"',email='"+this.e_email.getText()+"',no_hp='"+this.e_nohp.getText()+"',no_fax2='"+this.e_fax2.getText()+"',alamat2='"+this.e_alamat.getText()+"',kode_tagih='"+kodeTagih+"',kode_group='"+this.cb_group.getText()+"',kode_segmen='"+this.cb_segmen.getText()+"' "+
					        "where kode_cust = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from sju_cust where kode_cust = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select * from sju_cust where kode_cust ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_klp.setText(line.kode_klp);
						this.cb_group.setText(line.kode_group);
						this.cb_tagih.setText(line.kode_tagih);
						this.cb_segmen.setText(line.kode_segmen);
						this.c_jenis.setText(line.jenis);						
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_tel.setText(line.no_tel);
						this.e_fax.setText(line.no_fax);
						this.e_npwp.setText(line.npwp);
						this.e_pic.setText(line.pic);
						this.e_dep.setText(line.departemen);
						this.e_email.setText(line.email);
						this.e_nohp.setText(line.no_hp);
						this.e_fax2.setText(line.no_fax2);						
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
			    this.standarLib.showListData(this, "Daftar Tertanggung",sender,undefined, 
											  "select kode_cust, nama, kode_klp  from sju_cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from sju_cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama","kode_klp"],"and",["Kode","Nama","Kode Klp"],false);				
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