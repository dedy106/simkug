window.app_saku2_transaksi_fa_fFaKlp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_fa_fFaKlp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_fa_fFaKlp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Kerja", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50});	
		this.cb_akun = new saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Asset", multiSelection:false, maxLength:10});	
		this.bTampil = new button(this,{bound:[529,11,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,401],caption:"Daftar Kelompok Asset"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,350],tag:9,readOnly:true,colTitle: ["Kode","Nama","Kode Akun","Nama AKun"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,375,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
								"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag='006' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);	

						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_fa_fFaKlp.extend(window.childForm);
window.app_saku2_transaksi_fa_fFaKlp.implement({
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
					
					sql.add("insert into fa_klp(kode_klpfa, nama, kode_lokasi, kode_klpakun, tipe, rowindex, kode_induk, sum_header, level_lap, level_spasi, nik_user, tgl_input) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','Posting','1','-','-',1,0,'admin','2012-01-01')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update fa_klp set nama = '"+this.e_nama.getText()+"',kode_klpakun='"+this.cb_akun.getText()+"' where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fa_klp where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			
				var data = this.dbLib.getDataProvider("select a.kode_klpfa,a.nama,a.kode_klpakun,b.nama as nama_akun "+
				            " from fa_klp a inner join masakun b on a.kode_klpakun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							" where a.kode_klpfa ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_akun.setText(line.kode_klpakun,line.nama_akun);
						
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
			var temp = this.dbLib.runSQL("select a.kode_klpfa,a.nama,a.kode_klpakun,b.nama as nama_akun "+
				            " from fa_klp a inner join masakun b on a.kode_klpakun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							" where  a.kode_lokasi = '"+this.app._lokasi+"' ");
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
			    this.standarLib.showListData(this, "Daftar Kelompok",sender,undefined, 
											  "select kode_klpfa, nama  from fa_klp where tipe='Posting' and kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_klpfa) from fa_klp where tipe='Posting' and kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_klpfa","nama"],"and",["Kode","Nama"],false);				
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