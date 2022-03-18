window.app_saku2_transaksi_kopeg_kbitt_fNikIFSub = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fNikIFSub.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fNikIFSub";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pemegang Sub Imprest Fund", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,18,220,20],caption:"NIK",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"PP/Unit", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai IF", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_nikif = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"NIK Sumber I/F",tag:2,multiSelection:false}); 						
		
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
			this.cb_nikif.setSQL("select a.nik, a.nama from karyawan a inner join it_if b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan I/F",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fNikIFSub.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fNikIFSub.implement({
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
					sql.add("insert into it_if_sub(nik,kode_lokasi,kode_pp,nilai,nik_if) values "+
						    "('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_nikif.getText()+"')");
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
					sql.add("delete from it_if_sub where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into it_if_sub(nik,kode_lokasi,kode_pp,nilai,nik_if) values "+
						    "('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_nikif.getText()+"')");
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
					sql.add("delete from it_if_sub where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.cb_nik.getText() != ""){
				var strSQL = "select a.nik_if,a.nik,b.kode_pp,b.kode_pp+' - '+b.nama as pp,a.nilai from it_if_sub a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.nik ='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.kodePP = line.kode_pp;
						this.e_pp.setText(line.pp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.cb_nikif.setText(line.nik_if);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);						
						setTipeButton(tbSimpan);												
						var data2 = this.dbLib.getDataProvider("select b.kode_pp,b.kode_pp+' - '+b.nama as pp "+
								   "from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					   
								   "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data2 == "object"){
							var line2 = data2.rs.rows[0];							
							if (line2 != undefined){
								this.kodePP = line2.kode_pp;
								this.e_pp.setText(line2.pp);
							} 
						}						
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