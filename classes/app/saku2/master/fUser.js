//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_master_fUser = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_assetsap_master_fUser.prototype.parent.constructor.call(this, owner);
			this.className = "app_assetsap_master_fUser";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","User Maintenance", 0);	
		
			this.maximize();
			
			uses("saiCBBL;saiEdit");		
			this.e5 = new portalui_saiCBBL(this, {bound:[20,10,200,20], caption:"Lokasi Aset", multiSelection:false,change:[this,"doEditChange"],
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokfa","nama"], false, ["Kode Lokasi","Nama"],"and","Daftar Lokasi Aset",true]
			});
					
			this.e0 = new saiCBBL(this,{bound:[20,11,200,20], caption:"NIK", multiSelection:false, change:[this,"doEditChange"], labelChange:[this,"doLabelChange"]});
			this.p1 = new panel(this, {bound:[20,12,450,150], caption:"Data User", border:3});			
			
				this.e1 = new saiLabelEdit(this.p1,{bound:[20,13,402,20], caption:"Nama", readOnly:true});								
				this.e2 = new saiLabelEdit(this.p1,{bound:[20,14,250,20], caption:"Password", password:true});						
				this.e3 = new saiEdit(this.p1,{bound:[272,14,150,20], password:true});								
				this.e4 = new saiCB(this.p1,{bound:[20,15,250,20], caption:"User Role", items:["Admin Nasional","Admin Divisi","Admin Regional","Admin Area","User/Operator"]});									
				this.e7 = new saiCBBL(this.p1,{bound:[20,16,200,20], caption:"Klp Akses", multiSelection:false,
					sql:["select distinct kode_klp_akses from klp_akses_m",["kode_klp_akses"],false, ["Kode Klp Akses"],"where","Daftar Kelompok Akses",true]
				});								
				this.e8 = new saiCB(this.p1,{bound:[20,120,200,20],caption:"User Menu"});					
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);								
			this.standar = new util_standar();
			this.rearrangeChild(20,23);
			this.p1.rearrangeChild(20,23);
			setTipeButton(tbSimpan);
			this.standar.clearByTag(this, new Array("0"),this.e0);
			this.setTabChildIndex();
			this.dbLib.getDataProviderA("select distinct kode_klp from menu");
		}catch(e)
		{
			alert("[app_assetsap_master_fUser]::constructor:"+e);
		}
		
		this.setTabChildIndex();
	}
};
window.app_assetsap_master_fUser.extend(window.portalui_childForm);
window.app_assetsap_master_fUser.implement({
	doClick: function(sender){
		
	},
	doEditChange: function(sender){	
		try{
			if (sender == this.e5){
				if (this.app._userStatus != "N")
					this.e0.setSQL("select nik, nama from amu_karyawan where kode_lokasi ='"+this.app._lokasi+"' and nik = '"+this.app._userLog+"' ",["nik","nama"],false,
								["NIK","Nama"],"and","Daftar User",true);											  
				else this.e0.setSQL("select nik, nama from amu_karyawan where kode_lokasi ='"+this.app._lokasi+"' and kode_lokfa = '"+this.e5.getText()+"' ",["nik","nama"],false,
								["NIK","Nama"],"and","Daftar User",true);
			}	
			if (sender == this.e0)
			{					
				setTipeButton(tbSimpan);
				var pass = this.dbLib.getDataProvider("select * from amu_hakakses where kode_lokasi = '"+this.app._lokasi+"' and nik = '"+this.e0.getText()+"' ",true);					
				if (pass.rs.rows && pass.rs.rows[0]){			
					this.userData = pass.rs.rows;		
					var status = this.userData[0].status_admin;	
					this.e1.setText(this.userData[0].nama);
					this.e2.setText(this.userData[0].pass);
					this.e3.setText(this.userData[0].pass);
					this.e4.setText(status == "A" ? "Admin Area" : status == "N" ? "Admin Nasional" : status == "R" ? "Admin Regional" : status == "D" ? "Admin Divisi":"User/Operator");			
					this.e7.setText(this.userData[0].klp_akses);				
					this.e8.setText(this.userData[0].kode_klp_menu);
					setTipeButton(tbUbahHapus);
				}
			}else if (sender == this.e7){}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{
				switch(methodName)
				{
					case "execQuery" :
					case "execArraySQL" :
						if (result.search("error") == -1)
							system.info(this,result,"");
						else  system.alert(this,"Server Message ", result);						
						break;								
					case "getDataProvider":				
						eval("result = "+result+";");					
						if (typeof result == "object"){
							for (var i in result.rs.rows){
								this.e8.addItem(i,result.rs.rows[i].kode_klp);
							}
						}
					break;
				}
			}catch(e)
			{
				alert(e);
			}
		}
	},	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");
		else if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");
		else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
	},
	doModalResult: function(event, modalResult, value){
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standar.clearByTag(this,[0], this.e0);							
				break;
			case "simpan" :
				if (modalResult == mrOk){
					if (this.e2.getText() != this.e3.getText()){
						system.alert(this, "Error Password","password and confirm password are not equal");
						return false;
					}
					var status = this.e4.getText();
					status = status == "Admin Nasional" ? "N": status == "Admin Regional" ? "R": status == "Admin Area" ? "A": status == "Admin Divisi" ? "D" : "U";
					var values = "";
					var sqlValue = "";
					var sql2 = "insert into amu_hakakses (nik, nama, pass, status_admin, kode_lokasi,kode_lokfa, kode_klp_menu, klp_akses) values ";
					
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.app._lokasi+"','"+this.e5.getText()+"','"+this.e8.getText()+"','"+this.e7.getText()+"' ";
					sqlValue = "(" + values +")";
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}
				break;
			case "ubah" :
				if (modalResult == mrOk){
					if (this.e2.getText() != this.e3.getText()){
						system.alert(this, "Error Password","password and confirm password are not equal");
						return false;
					}
					var status = this.e4.getText();
					status = status == "Admin Nasional" ? "N": status == "Admin Regional" ? "R": status == "Admin Area" ? "A": status == "Admin Divisi" ? "D" : "U";
					var values = "";
					var sqlValue = "";
					var sql2 = "insert into amu_hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_lokfa, kode_klp_menu, klp_akses) values ";
					
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.app._lokasi+"','"+this.e5.getText()+"','"+this.e8.getText()+"','"+this.e7.getText()+"'";
					sqlValue = "(" + values +")";
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from amu_hakakses where nik = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}			
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from amu_hakakses where nik = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");	
					this.dbLib.execArraySQL(sql);		
				}
				break;
		}
	},
	doLabelChange: function(sender){
		this.e1.setText(this.e0.rightLabelCaption);
	}
});
