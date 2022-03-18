window.app_egov_simduk_master_fKelurahan = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_master_fKelurahan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_egov_simduk_master_fKelurahan";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelurahan", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Kelurahan",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.cb_kec = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Kode Kecamatan",btnClick:[this,"doBtnClick"]});
		this.bTampil = new portalui_button(this,{bound:[629,13,80,18],caption:"Tampil",click:[this,"doTampilClick"]});			
		
		this.p1 = new portalui_panel(this,{bound:[10,14,700,400],caption:"Daftar Kelurahan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,695,374],tag:"9"});		
	
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_egov_simduk_master_fKelurahan.extend(window.portalui_childForm);
window.app_egov_simduk_master_fKelurahan.implement({
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
					sql.add("insert into egov_kelurahan(kode_kelurahan,nama,kode_kecamatan) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_kec.getText()+"')");
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_kelurahan set nama = '"+this.e_nama.getText()+"',kode_kecamatan='"+this.cb_kec.getText()+"' "+
						    "where kode_kelurahan = '"+this.cb_kode.getText()+"'");					
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from egov_kelurahan "+
						    "where kode_kelurahan = '"+this.cb_kode.getText()+"' ");					
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select a.nama,a.kode_kecamatan,b.nama as nama_kec from egov_kelurahan a inner join egov_kecamatan b on a.kode_kecamatan = b.kode_kecamatan "+
					       " where a.kode_kelurahan ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_kec.setText(line.kode_kecamatan,line.nama_kec);
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
			this.sg1.setColTitle(new Array("No","Kode","Nama Kelurahan","Kode Kecamatan","Nama Kecamatan"));				
			var data = this.dbLib.runSQL(" select a.kode_kelurahan, a.nama,a.kode_kecamatan, b.nama as nama_kecamatan from egov_kelurahan a inner join egov_kecamatan b on a.kode_kecamatan = b.kode_kecamatan ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Kelurahan",sender,undefined, 
											  "select kode_kelurahan, nama  from egov_kelurahan ",
											  "select count(kode_kelurahan) from egov_kelurahan ",
											  ["kode_kelurahan","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kec) {   
			    this.standarLib.showListData(this, "Daftar Kecamatan",sender,undefined, 
											  "select kode_kecamatan, nama  from egov_kecamatan ",
											  "select count(kode_kecamatan) from egov_kecamatan ",
											  ["kode_kecamatan","nama"],"and",["Kode","Nama"],false);				
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
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});