window.app_saku2_transaksi_kopeg_spro_fPpbsTarif = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fPpbsTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fPpbsTarif";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Norma", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.c_tahun = new saiCB(this,{bound:[20,10,182,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_norma = new portalui_saiCBBL(this,{bound:[20,18,202,20],caption:"Kode Norma",tag:1,multiSelection:false,change:[this,"doChange"]});				
		this.e_sat = new saiLabelEdit(this,{bound:[20,12,182,20],caption:"Satuan", readOnly:true, tag:1});	
		this.e_tarif = new portalui_saiLabelEdit(this,{bound:[20,18,182,20],caption:"Tarif",tipeText:ttNilai,tag:1});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_norma.setSQL("select kode_norma, nama from agg_norma where kode_lokasi='"+this.app._lokasi+"'",["kode_norma","nama"],false,["Kode","Nama"],"and","Data Norma",true);			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate()) + 1 order by tahun desc",true);
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
window.app_saku2_transaksi_kopeg_spro_fPpbsTarif.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fPpbsTarif.implement({
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
					sql.add("insert into agg_tarif(kode_norma,kode_lokasi,tahun,tarif) values "+
						    "	('"+this.cb_norma.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+")");
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
					sql.add("update agg_tarif set tarif='"+nilaiToFloat(this.e_tarif.getText())+"'  "+
					        "where kode_norma = '"+this.cb_norma.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.c_tahun.getText()+"'");
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
					sql.add("delete from agg_tarif where kode_norma='"+this.cb_norma.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
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
			if (sender == this.cb_norma && this.cb_norma.getText() != "") {
				var strSQL = "select satuan from agg_norma where kode_norma ='"+this.cb_norma.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_sat.setText(line.satuan);
					}
				}				
			}
			if (this.cb_norma.getText() != "" && this.c_tahun.getText() != "" ){				
				var strSQL = "select tarif from agg_tarif where kode_norma ='"+this.cb_norma.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_tarif.setText(floatToNilai(line.tarif));						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.e_tarif.setText("0");						
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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