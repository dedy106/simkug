window.app_rra_master_fSapLogin = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fSapLogin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fSapLogin";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data USER RFC", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],change:[this,"doChange"]});
		this.e_sapuser = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"SAP USER",maxLength:100});			
		this.e_sappwd = new saiLabelEdit(this,{bound:[20,12,300,20],caption:"SAP PWD",maxLength:100, password:true});			
		this.e_sappwd2 = new saiLabelEdit(this,{bound:[20,13,300,20],caption:"Confirm PWD",maxLength:100, password:true});					
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.clearMsg = "";			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fSapLogin.extend(window.childForm);
window.app_rra_master_fSapLogin.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", (this.clearMsg != "" ? this.clearMsg +"<br>":"" )+ "Screen akan dibersihkan?","form inputan ini akan dibersihkan");	
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
					sql.add("delete from rra_user where kode_lokasi = '"+this.app._lokasi+"' and nik = '"+this.cb_kode.getText()+"' ");
					sql.add("insert into rra_user(nik,uid, pwd, kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_sapuser.getText()+"','"+this.e_sappwd.getText()+"','"+this.app._lokasi+"')");
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
					sql.add("delete from rra_user where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.clearMsg = "";
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				if (this.e_sappwd.getText() != this.e_sappwd2.getText() && this.e_sappwd.getText() != ""){
				}else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.e_sappwd.getText() != this.e_sappwd2.getText() && this.e_sappwd.getText() != ""){
				}else this.simpan();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
			if (sender == this.cb_kode){
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider("select uid, pwd "+
							   " from rra_user  a  where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.e_sappwd.setText(line.pwd);							
							this.e_sappwd.setText(line.pwd);							
							this.e_sapuser.setText(line.uid);							
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
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
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["Kode","Nama"],false);				
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
							this.clearMsg = "transaksi telah sukses tersimpan (NIK:"+ this.cb_kode.getText()+")";							
							this.app._mainForm.bClear.click();
						}else system.alert(this,result,"");
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
