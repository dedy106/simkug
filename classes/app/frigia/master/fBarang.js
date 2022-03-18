window.app_frigia_master_fBarang = function(owner)
{
	if (owner)
	{
		window.app_frigia_master_fBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_master_fBarang";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Barang", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Barang",btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"],maxLength:20});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});	
		this.e_nomor = new portalui_saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nomor", maxLength:100});	
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,13,400,20],caption:"Tipe", maxLength:100});		
		this.e_sat = new portalui_saiLabelEdit(this,{bound:[20,41,180,20],caption:"Satuan", maxLength:10});		
		this.e_hj = new portalui_saiLabelEdit(this,{bound:[20,43,180,20],caption:"Harga Jual", tipeText:ttNilai});		
		this.cb_status = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Status Barang", multiSelection:false,tag:1});
		this.cb_klp = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Kelompok Barang", multiSelection:false,tag:1});
		this.cb_jenis = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Jenis Barang", multiSelection:false,tag:1});
		this.cb_kbm = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Jenis KBM", multiSelection:false,tag:1});
			
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
					
			this.cb_status.setSQL("select kode_status, nama from fri_barang_status where kode_lokasi = '"+this.app._lokasi+"'",["kode_status","nama"],false,["Kode","Nama"],"and","Data Status Barang",true);
			this.cb_kbm.setSQL("select kode_kbm, nama from fri_barang_kbm where kode_lokasi = '"+this.app._lokasi+"'",["kode_kbm","nama"],false,["Kode","Nama"],"and","Data Jenis KBM",true);
			this.cb_jenis.setSQL("select kode_jenis, nama from fri_barang_jenis where kode_lokasi = '"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis Barang",true);
			this.cb_klp.setSQL("select kode_klp, nama from fri_barang_klp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok Barang",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_master_fBarang.extend(window.portalui_childForm);
window.app_frigia_master_fBarang.implement({
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
					sql.add("insert into fri_barang_m(kode_brg,nama,kode_kbm,kode_jenis,kode_klp,kode_lokasi,satuan,harga,hj,kode_status,no_brg,tipe) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_kbm.getText()+"','"+this.cb_jenis.getText()+"','"+this.cb_klp.getText()+"','"+this.app._lokasi+"','"+this.e_sat.getText()+"',0,"+parseNilai(this.e_hj.getText())+",'"+this.cb_status.getText()+"','"+this.e_nomor.getText()+"','"+this.e_tipe.getText()+"')");
										
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
					sql.add("update fri_barang_m set hj="+parseNilai(this.e_hj.getText())+",satuan='"+this.e_sat.getText()+"',nama = '"+this.e_nama.getText()+"', kode_kbm='"+this.cb_kbm.getText()+"',kode_jenis='"+this.cb_jenis.getText()+"',kode_klp='"+this.cb_klp.getText()+"',kode_status='"+this.cb_status.getText()+"',no_brg='"+this.e_nomor.getText()+"',tipe='"+this.e_tipe.getText()+"' "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
					sql.add("delete from fri_barang_m "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
				var data = this.dbLib.getDataProvider("select a.nama,a.satuan,a.hj,b.kode_klp,b.nama as nama_klp,c.kode_jenis,c.nama as nama_jenis,d.kode_kbm,d.nama as nama_kbm,a.kode_status,e.nama as nama_status,a.no_brg,a.tipe "+
				           " from fri_barang_m a inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
						   "                     inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
						   "                     inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
						   "                     inner join fri_barang_status e on a.kode_status=e.kode_status and a.kode_lokasi=e.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_brg='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_nomor.setText(line.no_brg);
						this.e_tipe.setText(line.tipe);
						this.e_sat.setText(line.satuan);
						this.e_hj.setText(floatToNilai(line.hj));
						this.cb_klp.setText(line.kode_klp,line.nama_klp);
						this.cb_jenis.setText(line.kode_jenis,line.nama_jenis);
						this.cb_kbm.setText(line.kode_kbm,line.nama_kbm);
						this.cb_status.setText(line.kode_status,line.nama_status);
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_brg, nama  from fri_barang_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from fri_barang_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
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