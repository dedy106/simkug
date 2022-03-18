window.app_saku2_transaksi_kopeg_spro_fDRK = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fDRK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fDRK";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Daftar Rencana Kegiatan : Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_kode = new saiCBBL(this,{bound:[20,10,250,20],caption:"Kode",maxLength:30,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150, tag:1});			
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun union select year(getdate())-1 as tahun ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fDRK.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fDRK.implement({
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
					sql.add("insert into drk(kode_drk, tahun, kode_lokasi, nama, block, tgl_input, nik_user, tipe, kode_fsrkm, level_spasi, level_lap, sum_header, jenis_akun, kode_induk, rowindex, modul) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.c_tahun.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"', '0', getdate(), '"+this.app._userLog+"', 'Posting', 'FS1', 0, 0, '00', 'BEBAN', '00', 1, 'A')");
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
					sql.add("update drk set nama='"+this.e_nama.getText()+"', tahun ='"+this.c_tahun.getText()+"' "+
					        "where tahun = '"+this.c_tahun.getText()+"' and kode_drk = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from drk where tahun = '"+this.c_tahun.getText()+"' and kode_drk = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (this.cb_kode.getText() != "" && this.c_tahun.getText() != ""){
				var strSQL = "select kode_drk,nama from drk "+
						     "where tahun = '"+this.c_tahun.getText()+"' and kode_drk ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
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
			    this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
											  "select kode_drk, nama  from drk where tahun ='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_drk) from drk where tahun ='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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