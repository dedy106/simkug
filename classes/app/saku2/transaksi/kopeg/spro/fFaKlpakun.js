window.app_saku2_transaksi_kopeg_spro_fFaKlpakun = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fFaKlpakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fFaKlpakun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Akun Aktap: Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:50,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:150, tag:1});	
		this.e_agg = new saiLabelEdit(this,{bound:[20,14,180,20],caption:"Kode Anggaran", maxLength:2, tag:1});	
		this.cb_akun = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Aktap", multiSelection:false, maxLength:10, tag:2});
		this.cb_beban = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Beban Susut", multiSelection:false, maxLength:10, tag:2});
		this.cb_akum = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Akumulasi", multiSelection:false, maxLength:10, tag:2});
		this.e_umur = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Umur (Bulan)", tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_persen = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Persen (Tahun)", tag:1,tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_beban.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akum.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fFaKlpakun.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fFaKlpakun.implement({
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
					sql.add("insert into fa_klpakun(kode_klpakun, kode_lokasi, nama, umur, persen, kode_akun, akun_bp, akun_deprs, kode_agg) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"',"+nilaiToFloat(this.e_umur.getText())+", "+nilaiToFloat(this.e_persen.getText())+", '"+this.cb_akun.getText()+"', '"+this.cb_beban.getText()+"', '"+this.cb_akum.getText()+"','"+this.e_agg.getText()+"')");
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
					sql.add("update fa_klpakun set nama='"+this.e_nama.getText()+"', umur="+nilaiToFloat(this.e_umur.getText())+", persen="+nilaiToFloat(this.e_persen.getText())+", kode_akun='"+this.cb_akun.getText()+"', akun_bp='"+this.cb_beban.getText()+"', akun_deprs='"+this.cb_akum.getText()+"',kode_agg='"+this.e_agg.getText()+"' "+
					        "where kode_klpakun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from fa_klpakun where kode_klpakun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nama, umur, persen, kode_akun, akun_bp, akun_deprs, kode_agg from fa_klpakun "+
						     "where kode_klpakun ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.e_agg.setText(line.kode_agg);		
						this.cb_akun.setText(line.kode_akun);
						this.cb_beban.setText(line.akun_bp);
						this.cb_akum.setText(line.akun_deprs);
						this.e_umur.setText(floatToNilai(line.umur));
						this.e_persen.setText(floatToNilai(line.persen));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			if (sender == this.e_umur && this.e_umur.getText() != ""){
				this.e_persen.setText(floatToNilai(100/(nilaiToFloat(this.e_umur.getText())/12)));
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Kelompok Akun Aktap",sender,undefined, 
											  "select kode_klpakun, nama from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_klpakun","nama"],"and",["Kode","Deskripsi"],false);				
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