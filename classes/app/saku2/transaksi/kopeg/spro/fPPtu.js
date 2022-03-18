window.app_saku2_transaksi_kopeg_spro_fPPtu = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fPPtu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fPPtu";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Modul : Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.c_status = new saiCB(this,{bound:[20,22,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});		
		this.cb_induk = new saiCBBL(this,{bound:[20,15,220,20],caption:"PP Induk", multiSelection:false, maxLength:10, tag:2});									
		this.e_bank = new saiLabelEdit(this,{bound:[20,21,300,20],caption:"Bank", maxLength:50});						
		this.e_cabang = new saiLabelEdit(this,{bound:[20,23,450,20],caption:"Cabang", maxLength:100});						
		this.e_norek = new saiLabelEdit(this,{bound:[20,24,300,20],caption:"No Rekening", maxLength:50});						
		this.e_namarek = new saiLabelEdit(this,{bound:[20,25,300,20],caption:"Nama Rekening", maxLength:50});						

		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_induk.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' union select '-','-' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fPPtu.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fPPtu.implement({
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
					sql.add("insert into pp(kode_pp, kode_lokasi, nama, initial, level_spasi, tipe, sum_header, kode_induk, rowindex, kode_bidang, flag_aktif) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"',  '-', '0', 'Posting', '00', '"+this.cb_induk.getText()+"', 1, '1', '"+this.c_status.getText().substr(0,1)+"')");
					
					sql.add("insert into pp_rek (kode_pp,kode_lokasi,bank,cabang,no_rek,nama_rek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");
					
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
					
					sql.add("delete from pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from pp_rek where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					
					sql.add("insert into pp(kode_pp, kode_lokasi, nama, initial, level_spasi, tipe, sum_header, kode_induk, rowindex, kode_bidang, flag_aktif) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"',  '-', '0', 'Posting', '00', '"+this.cb_induk.getText()+"', 1, '1', '"+this.c_status.getText().substr(0,1)+"')");
					
					sql.add("insert into pp_rek (kode_pp,kode_lokasi,bank,cabang,no_rek,nama_rek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");

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
					sql.add("delete from pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from pp_rek where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select a.kode_pp,a.kode_induk, a.nama,a.flag_aktif, isnull(b.bank,'-') as bank,isnull(b.cabang,'-') as cabang ,isnull(b.no_rek,'-') as no_rek ,isnull(b.nama_rek,'-') as nama_rek  "+
							 "from pp a "+
							 "left join pp_rek b on a.kode_pp=b.kode_pp and a.kode_lokasi =b.kode_lokasi "+
						     "where a.kode_pp ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");


						this.cb_induk.setText(line.kode_induk);
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Pusat Pertanggungjawaban",sender,undefined, 
											  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
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