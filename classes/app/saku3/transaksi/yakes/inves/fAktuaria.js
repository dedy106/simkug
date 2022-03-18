window.app_saku3_transaksi_yakes_inves_fAktuaria = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fAktuaria.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fAktuaria";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kewajiban Aktuaria", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.cb_plan = new saiCBBL(this,{bound:[20,15,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.c_tahun = new saiCB(this,{bound:[20,10,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});		
		
		this.e_persen = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Aktuaria", tipeText:ttNilai, text:"0"});
		this.e_df = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"DF", tipeText:ttNilai, text:"0"});
		this.e_rkd = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"RKD", tipeText:ttNilai, text:"0"});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);													
				}
			}

			this.c_tahun.items.clear();
			var str = "select periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun.addItem(i,line.periode);
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fAktuaria.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fAktuaria.implement({
	doChange: function(sender){
		if ((sender == this.cb_plan || this.c_tahun) && this.cb_plan.getText()!="" && this.c_tahun.getText()!="") {
			var strSQL = "select * from inv_aktuaria where kode_plan='"+this.cb_plan.getText()+"' and tahun='"+this.c_tahun.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																									
					this.e_persen.setText(floatToNilai(line.persen));
					this.e_df.setText(floatToNilai(line.df));
					this.e_rkd.setText(floatToNilai(line.rkd));						
				}
			}
		}
	},	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					//tahun = diisi periode utk dashboard ambil yg periodenya 12 kecuali tahun berjalan
					sql.add("delete from inv_aktuaria where tahun  = '"+this.c_tahun.getText()+"' and kode_plan='"+this.cb_plan.getText()+"'");							 
					sql.add("insert into inv_aktuaria (kode_plan,tahun,persen,df,rkd) values ('"+this.cb_plan.getText()+"','"+this.c_tahun.getText()+"',"+nilaiToFloat(this.e_persen.getText())+","+nilaiToFloat(this.e_df.getText())+","+nilaiToFloat(this.e_rkd.getText())+")");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_tab);										
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});