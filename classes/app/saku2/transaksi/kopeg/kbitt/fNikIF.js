window.app_saku2_transaksi_kopeg_kbitt_fNikIF = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fNikIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fNikIF";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data pemegang Imprest Fund", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,18,220,20],caption:"NIK",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"PP/Unit", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai IF", tag:1, tipeText:ttNilai, text:"0"});				
		this.c_tahun = new saiCB(this,{bound:[20,14,200,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_kas = new portalui_saiCBBL(this,{bound:[20,18,220,20],caption:"No KasBank",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"Akun IF",tag:0,multiSelection:false});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
		
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate())-1 as tahun union select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
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
window.app_saku2_transaksi_kopeg_kbitt_fNikIF.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fNikIF.implement({
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
					sql.add("insert into it_if(nik,kode_lokasi,kode_pp,nilai,flag_aktif,tahun,no_kas,akun_if) values "+
						    "('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'1','"+this.c_tahun.getText()+"','"+this.cb_kas.getText()+"','"+this.cb_akun.getText()+"')");
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
					sql.add("delete from it_if where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into it_if(nik,kode_lokasi,kode_pp,nilai,flag_aktif,tahun,no_kas,akun_if) values "+
						    "('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'1','"+this.c_tahun.getText()+"','"+this.cb_kas.getText()+"','"+this.cb_akun.getText()+"')");
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
					sql.add("delete from it_if where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
			if (sender == this.c_tahun && this.c_tahun.getText() != ""){
				this.cb_kas.setSQL("select no_kas, keterangan from kas_m where periode like '"+this.c_tahun.getText()+"%' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KB","Deskripsi"],"and","Data KasBank",true);									
			}
			if (sender == this.cb_kas && this.cb_kas.getText() != ""){
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join kas_j b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.dc='D' where b.no_kas='"+this.cb_kas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			}
			if (sender == this.cb_nik && this.cb_nik.getText() != ""){
				var strSQL = "select a.nik,b.kode_pp,b.kode_pp+' - '+b.nama as pp,a.nilai,a.tahun,a.no_kas,a.akun_if from it_if a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.nik ='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.kodePP = line.kode_pp;
						this.e_pp.setText(line.pp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.c_tahun.setText(line.tahun);
						this.cb_kas.setText(line.no_kas);
						this.cb_akun.setText(line.akun_if);
						setTipeButton(tbUbahHapus);
					}
					else {
						var data = this.dbLib.getDataProvider("select a.kode_pp,b.kode_pp+' - '+b.nama as pp from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){													
								this.e_pp.setText(line.pp);													
								this.kodePP = line.kode_pp;
							}
						}					
						this.standarLib.clearByTag(this, new Array("1"),undefined);						
						setTipeButton(tbSimpan);												
					}
				}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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