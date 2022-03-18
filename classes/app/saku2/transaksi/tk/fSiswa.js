window.app_saku2_transaksi_tk_fSiswa = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_tk_fSiswa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_tk_fSiswa";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Siswa", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;datePicker;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIS",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_tempat = new saiLabelEdit(this,{bound:[20,12,500,20],caption:"Tempat", maxLength:50, tag:1});	
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.c_gol = new saiCB(this,{bound:[20,12,200,20],caption:"Golongan Darah",items:["A","B","AB","O"], readOnly:true,tag:2});
		this.c_agama = new saiCB(this,{bound:[20,13,200,20],caption:"Agama",items:["Islam","Katolik","Protestan","Hindu","Budha","Lainnya"], readOnly:true,tag:2});		
		this.e_ayah = new saiLabelEdit(this,{bound:[20,14,500,20],caption:"Nama Ayah", maxLength:50, tag:1});	
		this.e_ibu = new saiLabelEdit(this,{bound:[20,15,500,20],caption:"Nama Ibu", maxLength:50, tag:1});			
		this.e_alamat = new saiLabelEdit(this,{bound:[20,16,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.cb_tingkat = new saiCBBL(this,{bound:[20,18,200,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:2});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_tingkat.setSQL("select kode_tingkat, nama from tk_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_tk_fSiswa.extend(window.childForm);
window.app_saku2_transaksi_tk_fSiswa.implement({
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
					sql.add("insert into tk_siswa(kode_siswa,kode_lokasi,nama,tempat,tgl_lahir,goldar,agama,ayah,ibu,alamat,no_tel,kode_tingkat) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_gol.getText()+"','"+this.c_agama.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.cb_tingkat.getText()+"')");
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
					sql.add("update tk_siswa set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',no_tel='"+this.e_tel.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',goldar='"+this.c_gol.getText()+"',agama='"+this.c_agama.getText()+"',ayah='"+this.e_ayah.getText()+"',ibu='"+this.e_ibu.getText()+"',kode_tingkat='"+this.cb_tingkat.getText()+"' "+
					        "where kode_siswa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from tk_siswa where kode_siswa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select kode_siswa,nama,alamat,no_tel,tempat,tgl_lahir,goldar,agama,ayah,ibu,kode_tingkat from tk_siswa "+
						     "where kode_siswa ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);						
						this.dp_d1.setText(line.tgl_lahir);						
						this.e_tempat.setText(line.tempat);						
						this.c_gol.setText(line.goldar);		
						this.c_agama.setText(line.agama);		
						this.e_ayah.setText(line.ayah);		
						this.e_ibu.setText(line.ibu);		
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);												
						this.cb_tingkat.setText(line.kode_tingkat);												
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
			    this.standarLib.showListData(this, "Daftar Siswa",sender,undefined, 
											  "select kode_siswa, nama  from tk_siswa where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_siswa) from tk_siswa where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_siswa","nama"],"and",["Kode","Nama"],false);				
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