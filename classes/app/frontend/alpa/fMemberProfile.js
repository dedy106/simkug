//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberProfile = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberProfile.prototype.parent.constructor.call(this, owner,options);	
			this.className = "app_frontend_alpa_fMemberProfile";											
			this.initComponent();		
			this.setCaption("Profil Member");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberProfile]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberProfile.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberProfile.implement({
	initComponent: function(){
		uses("portalui_datePicker;portalui_saiCBBL;portalui_label");			
		try{
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.e0sp = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Member",readOnly:true, rightLabelVisible:false, btnVisible:false});
			this.e1sp = new portalui_saiLabelEdit(this,{bound:[20,32,400,20],caption:"Nama"});			
			this.eKlpsp = new portalui_saiCBBL(this,{bound:[20,54,200,20],caption:"Kelompok",btnClick:[this,"FindBtnClick"]});
			this.Pwdsp = new portalui_saiLabelEdit(this,{bound:[20,76,250,20],password:true, caption:"Password"});
			this.RPwdsp = new portalui_saiLabelEdit(this,{bound:[20,98,250,20],caption:"Retype Password",password:true});
			this.lTgl = new portalui_label(this,{bound:[20,120,100,18],underline:true,caption:"Tgl. Lahir"});
			this.dp_lahirsp = new portalui_datePicker(this,{bound:[120,120,82,20]});
			this.ePicsp = new portalui_saiLabelEdit(this,{bound:[20,142,400,20],caption:"PIC"});			
			this.eEmailsp = new portalui_saiLabelEdit(this,{bound:[20,164,350,20],caption:"Email"});
			this.eNoTelpsp = new portalui_saiLabelEdit(this,{bound:[20,186,350,20],caption:"No. Telp"});
			this.eNoFaxsp = new portalui_saiLabelEdit(this,{bound:[20,208,350,20],caption:"No. Fax"});			
			this.eAlamatsp = new portalui_saiLabelEdit(this,{bound:[20,230,350,20],caption:"Alamat"});			
			this.eKotasp = new portalui_saiLabelEdit(this,{bound:[20,252,350,20],caption:"Kota"});			
			this.eKodePossp = new portalui_saiLabelEdit(this,{bound:[20,274,350,20],caption:"Kode Pos"});			
			this.ePerusahaansp = new portalui_saiLabelEdit(this,{bound:[20,296,400,20],caption:"Perusahaan"});			
			if (this.app._mainForm.dataUser.status == "sales") this.cbgsp = new portalui_saiCBBL(this,{bound:[20,318,200,20],caption:"Cabang",btnClick:[this,"FindBtnClick"]});						
			this.bEdit = new portalui_button(this,{bound:[20,343,80,20],caption:"Edit",icon:"url(icon/"+system.getThemes()+"/edit.png)",click:[this,"doBtnClick"],tag:"editsp"});
			this.setTabChildIndex();
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}
			if (this.app._mainForm.dataUser.status == "sales")
    			this.dbLib.getDataProviderA("select b.nama as nmklp,a.*,c.nama as nmcbg, a.kode_sales as kode_member,a.kode_klp_sales as kode_klp "+
							"from portal_sales a inner join portal_klp_sales b on a.kode_klp_sales=b.kode_klp_sales "+
							"inner join portal_cabang c on a.kode_cab=c.kode_cab and a.kode_lokasi=c.kode_lokasi  "+
							"where a.kode_sales='"+this.app.userlog+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			else this.dbLib.getDataProviderA("select b.nama as nmklp,a.*, a.kode_cust as kode_member,a.kode_klp_cust as kode_klp "+
							"from portal_cust a inner join portal_klp_cust b on a.kode_klp_cust=b.kode_klp_cust "+
							"where a.kode_cust='"+this.app.userlog+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){		
	},
	doRequestReady: function(sender, methodName, result){
	    try{   
    		if (sender == this.dbLib){
    			if (methodName == "getDataProvider"){
    				eval("result = "+result+";");
    				if (result.rs != undefined && result.rs.rows[0] !== undefined){
    					var data = result.rs.rows[0];			
    					this.e0sp.setText(data.kode_member);
    					this.e1sp.setText(data.nama);
    					this.eKlpsp.setText(data.kode_klp, data.nmklp);
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
    					if (this.app._mainForm.dataUser.status == "sales") this.cbgsp.setText(data.kode_cab,data.nmcbg);
    				}
    			}else if (methodName == "execQuery"){								
    				if (result.toLowerCase().search("error") != -1)
    					systemAPI.alert("ERROR",result);
    				else system.info(this.app._mainForm,result,"");
    			}
    		}
   		}catch(e){
   		   alert(e);
        }
	},
	doChildItemsClick: function(sender,id,item){
		try{			
		}catch(e){
			alert("::doChildItemsClick : "+e);
		}
	},
	FindBtnClick : function(sender){
		if (sender === this.eKlpsp){
		    if (this.app._mainForm.dataUser.status == "sales") 
    			this.standarLib.showListData(this.getForm(), "Data Klp Member",sender,undefined, 
										  "select kode_klp_sales, nama from portal_klp_sales",
										  "select count(*) from portal_klp_sales",
										  ["kode_klp_sales","nama"],"where",["Kode Klp Sales","Nama"]);
            else this.standarLib.showListData(this.getForm(), "Data Klp Member",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust",
										  "select count(*) from portal_klp_cust",
										  ["kode_klp_cust","nama"],"where",["Kode Klp Member","Nama"]);
		}
        if (sender === this.cbgsp)
			this.standarLib.showListData(this.getForm(), "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"where",["Kode Cabang","Nama"]);
	},
	doBtnClick: function(sender){
		try{
			if (this.Pwdsp.getText() != this.RPwdsp.getText())
				alert("Password tidak sama dengan Retype Password","");
			else
			{			
                if (this.app._mainForm.dataUser.status == "sales") var table = "portal_sales";else var table = "portal_cust";
				var sql= "update "+table+" set  "+						
						" 	 paswd = '"+this.Pwdsp.getText()+"'"+
						"	, kode_lokasi = '"+this.app._lokasi+"' "+
						"	, nama = '"+this.e1sp.getText()+"' "+
						"	, tgl_lahir = '"+this.dp_lahirsp.getDateString()+"' "+
						"	, pic = '"+this.ePicsp.getText()+"' "+
						"	, email = '"+this.eEmailsp.getText()+"' "+
						"	, no_telp ='"+this.eNoTelpsp.getText()+"' "+
						" 	, no_fax = '"+this.eNoFaxsp.getText()+"' "+
						"	, alamat = '"+this.eAlamatsp.getText()+"' "+
						"	, kota = '"+this.eKotasp.getText()+"' "+
						"	, kode_pos = '"+this.eKodePossp.getText()+"' "+
						"	, perusahaan = '"+this.ePerusahaansp.getText()+"' ";						
						if (this.app._mainForm.dataUser.status == "sales"){
    						sql += "	, kode_klp_sales = '"+this.eKlpsp.getText()+"' "+
                                  "	, kode_cab = '"+this.cbgsp.getText()+"' "+
						          " where kode_sales = '"+this.e0sp.getText()+"' ";				
				        }else{
				            sql += "	, kode_klp_cust = '"+this.eKlpsp.getText()+"' "+
                                " where kode_cust = '"+this.e0sp.getText()+"' ";				
                        }
				this.dbLib.execQuery(sql);
			}
		}catch(e){
			alert(e);
		}
	}
});
