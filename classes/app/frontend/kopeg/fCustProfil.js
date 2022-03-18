//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fCustProfil = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fCustProfil.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fCustProfil.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fCustProfil.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fCustProfil";											
			this.initComponent();		
			this.title = "Edit Profil";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fCustProfil]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fCustProfil.extend(window.portalui_panel);
window.app_frontend_kopeg_fCustProfil.implement({
	initComponent: function(){
		uses("util_standar;portalui_image;portalui_datePicker;portalui_saiCBBL;portalui_saiLabelEdit");			
		try{
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.e0sp = new portalui_saiCBBL(this);
			this.e0sp.setBound(20,10,200,20);
			this.e0sp.setCaption("Kode Customer");		
			this.e0sp.setReadOnly(true);
			this.e0sp.setRightLabelVisible(false);
			this.e0sp.setBtnVisible(false);						
			this.e1sp = new portalui_saiLabelEdit(this);
			this.e1sp.setBound(20,32,400,20);
			this.e1sp.setCaption("Nama");
			this.e1sp.setReadOnly(false);
			this.eKlpsp = new portalui_saiCBBL(this);
			this.eKlpsp.setBound(20,54,200,20);
			this.eKlpsp.setCaption("Kelompok");
			this.eKlpsp.setRightLabelVisible(true);
			this.eKlpsp.onBtnClick.set(this, "FindBtnClick");
			this.Pwdsp = new portalui_saiLabelEdit(this);
			this.Pwdsp.setBound(20,76,250,20);
			this.Pwdsp.setCaption("Password");		
			this.Pwdsp.setPassword(true);
			this.RPwdsp = new portalui_saiLabelEdit(this);
			this.RPwdsp.setBound(20,98,250,20);
			this.RPwdsp.setCaption("Retype Password");		
			this.RPwdsp.setPassword(true);
			this.lTgl = new portalui_label(this);
			this.lTgl.setBound(20,120,100,18);
			this.lTgl.setUnderLine(true);
			this.lTgl.setCaption("Tgl. Lahir");			
			this.dp_lahirsp = new portalui_datePicker(this);
			this.dp_lahirsp.setBound(120,120,82,20);
			this.ePicsp = new portalui_saiLabelEdit(this);
			this.ePicsp.setBound(20,142,400,20);
			this.ePicsp.setCaption("PIC");
			this.eEmailsp = new portalui_saiLabelEdit(this);
			this.eEmailsp.setBound(20,164,350,20);
			this.eEmailsp.setCaption("Email");
			this.eNoTelpsp = new portalui_saiLabelEdit(this);
			this.eNoTelpsp.setBound(20,186,350,20);
			this.eNoTelpsp.setCaption("No Telp");
			this.eNoFaxsp = new portalui_saiLabelEdit(this);
			this.eNoFaxsp.setBound(20,208,350,20);
			this.eNoFaxsp.setCaption("No Fax");
			this.eAlamatsp = new portalui_saiLabelEdit(this);
			this.eAlamatsp.setBound(20,230,350,20);
			this.eAlamatsp.setCaption("Alamat");
			this.eKotasp = new portalui_saiLabelEdit(this);
			this.eKotasp.setBound(20,252,350,20);
			this.eKotasp.setCaption("Kota");
			this.eKodePossp = new portalui_saiLabelEdit(this);
			this.eKodePossp.setBound(20,274,350,20);
			this.eKodePossp.setCaption("Kode Pos");
			this.ePerusahaansp = new portalui_saiLabelEdit(this);
			this.ePerusahaansp.setBound(20,296,400,20);
			this.ePerusahaansp.setCaption("Perusahaan");								
			var bEdit = new portalui_button(this);
			bEdit.setBound(20,335,80,20);
			bEdit.setCaption("Edit");
			bEdit.setIcon("url(icon/"+system.getThemes()+"/edit.png)");
			bEdit.onClick.set(this,"doBtnClick");
			bEdit.setTag("editsp");
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}
			this.dbLib.getDataProviderA("select b.nama as nmklp,a.* "+
							"from portal_cust a inner join portal_klp_cust b on a.kode_klp_cust=b.kode_klp_cust "+
							"where a.kode_cust='"+this.app.userlog+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSizeChange: function(width, height){		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if (methodName == "getDataProvider"){
				eval("result = "+result+";");
				if (result.rs != undefined){
					var data = result.rs.rows[0];			
					this.e0sp.setText(data.kode_cust);
					this.e1sp.setText(data.nama);
					this.eKlpsp.setText(data.kode_klp_cust);
					this.eKlpsp.setRightLabelCaption(data.nmklp);
					this.Pwdsp.setText(data.paswd);
					this.dp_lahirsp.setDateString(data.tgl_lahir);
					this.ePicsp.setText(data.pic);
					this.eEmailsp.setText(data.email);
					this.eNoTelpsp.setText(data.no_telp);
					this.eNoFaxsp.setText(data.no_fax);
					this.eAlamatsp.setText(data.alamat);
					this.eKotasp.setText(data.kota);
					this.eKodePossp.setText(data.kode_pos);
					this.ePerusahaansp.setText(data.perusahaan);																
				}
			}else if (methodName == "execQuery"){								
				if (result.toLowerCase().search("error") != -1)
					systemAPI.alert(result);
				else system.info(this.app._mainForm,result,"");
			}
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
		}catch(e){
			systemAPI.alert("::doChildItemsClick : "+e);
		}
	},
	FindBtnClick : function(sender){
		this.standarLib.showListData(this.getForm(), "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust",
										  "select count(*) from portal_klp_cust",
										  ["kode_klp_cust","nama"],"where",["Kode Klp Cust","Nama"]);
	},
	doBtnClick: function(sender){
		try{
			if (this.Pwdsp.getText() != this.RPwdsp.getText())
				systemAPI.alert("Password tidak sama dengan Retype Password","");
			else
			{								
				var sql= "update portal_cust set  "+						
						" 	 paswd = '"+this.Pwdsp.getText()+"'"+
						"	, nama = '"+this.e1sp.getText()+"' "+
						"	, tgl_lahir = '"+this.dp_lahirsp.getDateString()+"' "+
						"	, pic = '"+this.ePicsp.getText()+"' "+
						"	, email = '"+this.eEmailsp.getText()+"' "+
						"	, no_telp ='"+this.eNoTelpsp.getText()+"' "+
						" 	, no_fax = '"+this.eNoFaxsp.getText()+"' "+
						"	, alamat = '"+this.eAlamatsp.getText()+"' "+
						"	, kota = '"+this.eKotasp.getText()+"' "+
						"	, kode_pos = '"+this.eKodePossp.getText()+"' "+
						"	, perusahaan = '"+this.ePerusahaansp.getText()+"' "+
						"	, kode_klp_cust = '"+this.eKlpsp.getText()+"' "+	
						" where kode_cust = '"+this.e0sp.getText()+"' ";				
				this.dbLib.execQuery(sql);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});