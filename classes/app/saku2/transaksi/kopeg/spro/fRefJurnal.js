window.app_saku2_transaksi_kopeg_spro_fRefJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fRefJurnal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fRefJurnal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Referensi Jurnal Dual Akun: Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_ket = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Deskripsi", maxLength:50, tag:1});	
		this.cb_debet = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Debet", multiSelection:false, maxLength:10, tag:2});				
		this.cb_kredit = new saiCBBL(this,{bound:[20,16,200,20],caption:"Akun Kredit", multiSelection:false, maxLength:10, tag:2});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});		
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,17,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});				
		this.c_modul = new saiCB(this,{bound:[20,12,180,20],caption:"Modul",items:["KB","GL"], readOnly:true,tag:2});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_debet.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_kredit.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_drk.setSQL("select kode_drk, tahun+' - '+nama as nama from drk where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fRefJurnal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fRefJurnal.implement({
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
					sql.add("insert into refju_dual(kode_jurnal,kode_lokasi,nama,keterangan,akun_debet,akun_kredit,nilai,kode_pp,kode_drk,modul) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_ket.getText()+"','"+this.cb_debet.getText()+"','"+this.cb_kredit.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.c_modul.getText()+"')");
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
					sql.add("update refju_dual set modul='"+this.c_modul.getText()+"',nama='"+this.e_nama.getText()+"',keterangan='"+this.e_ket.getText()+"',akun_debet='"+this.cb_debet.getText()+"',akun_kredit='"+this.cb_kredit.getText()+"',nilai="+nilaiToFloat(this.e_nilai.getText())+",kode_pp='"+this.cb_pp.getText()+"',kode_drk='"+this.cb_drk.getText()+"' where kode_jurnal = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from refju_dual where kode_flag = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select modul,kode_jurnal,nama,keterangan,akun_debet,akun_kredit,nilai,kode_pp,kode_drk from refju_dual where kode_jurnal ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_ket.setText(line.keterangan);
						this.cb_debet.setText(line.akun_debet);
						this.cb_kredit.setText(line.akun_kredit);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.cb_pp.setText(line.kode_pp);
						this.cb_drk.setText(line.kode_drk);
						this.c_modul.setText(line.modul);
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
			    this.standarLib.showListData(this, "Daftar Referensi Jurnal Dual",sender,undefined, 
											  "select kode_jurnal, nama  from refju_dual where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_jurnal) from  refju_dual where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_jurnal","nama"],"and",["Kode","Nama"],false);				
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