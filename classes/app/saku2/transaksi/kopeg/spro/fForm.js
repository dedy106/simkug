//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku2_transaksi_kopeg_spro_fForm = function(owner){
	if (owner){
		try
		{			
			window.app_saku2_transaksi_kopeg_spro_fForm.prototype.parent.constructor.call(this,owner);
			this.className  = "app_saku2_transaksi_kopeg_spro_fForm";					
			this.itemsValue = new portalui_arrayList();						
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Form", 0);			
//------------------------------------------------------------------------
			uses("portalui_saiCBBL");
			this.e0 = new portalui_saiCBBL(this);
			this.e0.setBound(20,30,200,20);
			this.e0.setCaption("Kode Form");
			this.e0.setText("");
			this.e0.setName("e0");
			this.e0.setReadOnly(false);
			this.e0.onExit.set(this, "EditExit");
			this.e0.onChange.set(this, "doEditChange");
			this.e0.onKeyPress.set(this, "keyPress");
			this.e0.onBtnClick.set(this, "FindBtnClick");
			this.e0.setLabelWidth(100);
			this.e0.setRightLabelVisible(true);
			this.e0.setRightLabelCaption(" ");			
			this.e1 = new portalui_saiLabelEdit(this);
			this.e1.setBound(20,55,400,20);
			this.e1.setCaption("Nama Form");
			this.e1.setText("");
			this.e1.setReadOnly(false);
			this.e1.setName("e1");			
			this.e2 = new portalui_saiLabelEdit(this);
			this.e2.setBound(20,80,400,20);
			this.e2.setCaption("Program");
			this.e2.setText("");
			this.e2.setReadOnly(false);
			this.e2.setName("e2");			
			setTipeButton(tbSimpan);
			this.maximize();
			this.setTabChildIndex();
			uses("util_dbLib;util_standar");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
		}catch(e)
		{
			systemAPI.alert("fForm:Constructor:"+e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fForm.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku2_transaksi_kopeg_spro_fForm.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}else if (sender == this.app._mainForm.bSimpan){
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
		}else if (sender == this.app._mainForm.bEdit){
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		}else if (sender == this.app._mainForm.bHapus){
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
		}
	},
	doModalResult: function(event, modalResult){
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");				
					this.e2.setText("");
				}
				break;
			case "simpan" :
				if (modalResult == mrOk){
					try{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into m_form (kode_form, nama_form, form) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"') ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :				
				if (modalResult == mrOk){
					try{						
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update m_form set nama_form = '"+this.e1.getText()+"', form = '"+this.e2.getText()+"' where kode_form = '"+this.e0.getText()+"' ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk){
				    try{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  m_form where kode_form = '"+this.e0.getText()+"' ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
			   }
				break;
		}
		this.e0.setFocus();
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (this.e0.getText() != ""){
			try{
				var temp = this.dbLib.getDataProvider("select nama_form, form from m_form where kode_form = '"+this.e0.getText()+"' ");
			    eval("temp = "+temp+";");
			    var nama = (temp.rs.rows[0] !== undefined ? temp.rs.rows[0].nama_form : "");
				if ( (nama!= "") && (nama != undefined)){
					this.e1.setText(nama);
					this.e2.setText(temp.rs.rows[0].form);
					this.e0.setRightLabelCaption(nama);
					setTipeButton(tbUbahHapus);
				}else{
					setTipeButton(tbSimpan);
				}
			}catch(e){
				system.alert(this, e,"");
			}
		}
	},
	EditExit: function(sender){
	},
	FindBtnClick: function(sender, event){
		try{
			this.standarLib.showListData(this, "Data Form",this.e0,this.e1, 
											  "select kode_form, nama_form from m_form ",
											  "select count(*) from m_form",
											  ["kode_form","nama_form"],"where",["Kode Form","Nama Form"]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){		
		try{
			if (sender == this.dbLib){			
				switch	(methodName){
					case "execArraySQL" :
						if (result.toLowerCase().search("error") == -1){
							system.info(this.getForm(),"Transaksi Sukses ("+ this.e0.getText()+")","");						
							this.doModalResult("clear",mrOk);
						}else system.alert(this.getForm(), result,""); 
						break;
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});