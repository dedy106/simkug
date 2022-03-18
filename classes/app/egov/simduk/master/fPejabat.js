window.app_egov_simduk_master_fPejabat = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_master_fPejabat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_egov_simduk_master_fPejabat";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pejabat", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"NIP Pejabat",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.e_jabatan = new portalui_saiLabelEdit(this,{bound:[20,12,400,20],caption:"Jabatan", maxLength:100});		
		this.bTampil = new portalui_button(this,{bound:[429,12,80,18],caption:"Tampil",click:[this,"doTampilClick"]});			
		
		this.p1 = new portalui_panel(this,{bound:[10,13,500,415],caption:"Daftar Pejabat"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,495,389],tag:"9"});		
	
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_egov_simduk_master_fPejabat.extend(window.portalui_childForm);
window.app_egov_simduk_master_fPejabat.implement({
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
					sql.add("insert into egov_pejabat(nip,nama, jabatan) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_jabatan.getText()+"')");					
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_pejabat set nama = '"+this.e_nama.getText()+"',jabatan='"+this.e_jabatan.getText()+"' "+
						    "where nip = '"+this.cb_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from egov_pejabat "+
						    "where nip = '"+this.cb_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select nama,jabatan from egov_pejabat "+
					       " where nip ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_jabatan.setText(line.jabatan);
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
			this.sg1.setColTitle(new Array("No","NIP","Nama","Jabatan"));				
			var data = this.dbLib.runSQL(" select nip, nama, jabatan from egov_pejabat");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Pejabat",sender,undefined, 
											  "select nip, nama  from egov_pejabat ",
											  "select count(nip) from egov_pejabat ",
											  ["nip","nama"],"and",["NIP","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1)	{
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