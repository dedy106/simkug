window.app_saku3_transaksi_sla_fDiscFactor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fDiscFactor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fDiscFactor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Discount Factor", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
	
		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:1,change:[this,"doChange"]});		
		this.cb_rate = new portalui_saiCBBL(this,{bound:[20,18,220,20],caption:"Kode Rate",tag:1, multiSelection:false,change:[this,"doChange"]});
		this.e_curr = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Currency",tag:1,readOnly:true});											
		this.e_rate = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Rate", tag:1, tipeText:ttNilai, text:"0"});	
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_periode.items.clear();				
			var data = this.dbLib.getDataProvider(
				"select distinct (year+ case when len(period) = 2 then period else '0'+period end)  as periode "+
				"from mysym_f19_lock_period order by (year+ case when len(period) = 2 then period else '0'+period end) desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			this.c_periode.setText("");	

			this.cb_rate.setSQL("select kode_rate,nama from sla_rate_jenis ",["kode_rate","nama"],false,["Kode","Nama"],"and","Data Jenis rate",true);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fDiscFactor.extend(window.childForm);
window.app_saku3_transaksi_sla_fDiscFactor.implement({
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
					sql.add("insert into sla_disc_factor(kode_rate,periode,rate,tgl_input,nik_user) values ('"+this.cb_rate.getText()+"','"+this.c_periode.getText()+"',"+nilaiToFloat(this.e_rate.getText())+",getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from sla_disc_factor where kode_rate='"+this.cb_rate.getText()+"' and periode='"+this.c_periode.getText()+"'");
					sql.add("insert into sla_disc_factor(kode_rate,periode,rate,tgl_input,nik_user) values ('"+this.cb_rate.getText()+"','"+this.c_periode.getText()+"',"+nilaiToFloat(this.e_rate.getText())+",getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from sla_disc_factor where kode_rate='"+this.cb_rate.getText()+"' and periode='"+this.c_periode.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
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
			if (sender == this.cb_rate && this.cb_rate.getText() != ""){
				var strSQL = "select kode_curr from sla_rate_jenis where kode_rate ='"+this.cb_rate.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_curr.setText(line.kode_curr);					
					}					
				}
			}	
			
			if ((sender == this.cb_rate || sender == this.c_periode) && this.cb_rate.getText() != "" && this.c_periode.getText() != "") {
				var strSQL = "select rate from sla_disc_factor where kode_rate ='"+this.cb_rate.getText()+"' and periode='"+this.c_periode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_rate.setText(floatToNilai(line.rate));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.e_rate.setText("0");
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi.");							
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