/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_master_fHakakses = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_assetsap_master_fHakakses.prototype.parent.constructor.call(this, owner);
			this.className = "app_assetsap_master_fHakakses";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","User Maintenance", 0);	
		
			this.maximize();
			
			uses("saiCBBL;saiEdit");		
			this.e5 = new saiCBBL(this, {
				bound: [20, 20, 200, 20],
				caption: "Lokasi Asset",
				change: [this, "doEditChange"],
				multiSelection:false,
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokfa","nama"],false, ["Kode","Nama"],"and","Daftar Lokasi",true]
			});									
			this.e0 = new saiCBBL(this, {
				bound: [20, 45, 200, 20],
				caption: "User",
				change: [this, "doEditChange"],
				labelChange:[this,"doLabelChange"],
				multiSelection:false,				
			});											
			this.p1 = new panel(this, {
				bound: [20, 70, 450, 190],
				caption: "Data User",
				border: pbFlat
			});			
			
				this.e1 = new saiLabelEdit(this.p1,{bound:[20,25,402,20],caption:"User Name"});								
				this.e2 = new saiLabelEdit(this.p1,{bound:[20,22,250,20],caption:"Password",password:true});
				this.e3 = new saiEdit(this.p1,{bound:[272,22,150,20],password:true});
				this.e4 = new saiCB(this.p1,{bound:[20,23,250,20],caption:"User Role",items:["Administrator","Divisi","User/Operator"]});								
				this.e7 = new saiCBBL(this.p1,{bound:[20,24,200,20],caption:"Klp Akses",btnClick:[this,"doClick"]});								
				this.e8 = new saiCB(this.p1,{bound:[20,120,200,20],caption:"User Menu"});	
			this.p1.rearrangeChild(30,23);
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standar = new util_standar();
		
			setTipeButton(tbSimpan);
			this.standar.clearByTag(this, new Array("0"),this.e0);
			this.setTabChildIndex();						
			this.dbLib.getDataProviderA("select distinct kode_klp from menu");
			//this.e5.setText(this.app._kodeTtg, this.app._namaTtg);
			this.e0.setText(this.app._userLog, this.app._namaUser);
		}catch(e)
		{
			alert("[app_assetsap_master_fHakakses]::constructor:"+e);
		}
		
		this.setTabChildIndex();
	}
};
window.app_assetsap_master_fHakakses.extend(window.childForm);
window.app_assetsap_master_fHakakses.implement({
	doClick: function(sender){
		if (sender == this.e7){
			this.standar.showListData2(this, "Data Kelompom Akses",sender,undefined, 
											"select distinct kode_klp_akses from klp_akses_m ",
											"select count(distinct kode_klp_akses) from klp_akses_m ",
											["kode_klp_akses"],"where", ["Kode Klp"]);
		}		
		if (sender == this.e0){	
			if (this.app._userStatus != "A")
				this.standar.showListData(this, "Data User", this.e0, this.e1,
												  "select nik, nama from amu_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_lokfa='"+this.e5.getText()+"' and nik = '"+this.app._userLog+"' ",
												  "select count(*) from amu_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_lokfa='"+this.e5.getText()+"' and nik = '"+this.app._userLog+"'",
												  ["nik","nama"],"and",["User Id","Nama"]);
			else this.standar.showListData(this, "Data User",this.e0, this.e1,
												  "select nik, nama from amu_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_lokfa='"+this.e5.getText()+"' ",
												  "select count(*) from amu_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_lokfa='"+this.e5.getText()+"'  ",
												  ["nik","nama"],"and",["User Id","Nama"]);
				
		}
	},
	doEditChange: function(sender){
		try {
			setTipeButton(tbSimpan);
			if (sender == this.e0) {											
				var pass = this.dbLib.getDataProvider("select * from amu_hakakses where kode_lokasi = '" + this.app._lokasi + "' and nik = '" + this.e0.getText() + "' and kode_lokfa = '" + this.e5.getText() + "'", true);
				if (typeof(pass) != "string" &&  pass.rs.rows[0]) {
					this.userData = pass.rs.rows;					
					this.e1.setText(this.userData[0].nama);
					this.e2.setText(this.userData[0].pass);
					this.e3.setText(this.userData[0].pass);
					this.e4.setText(this.userData[0].status_admin == "A" ? "Administrator" : "User/Operator");
					this.e7.setText(this.userData[0].klp_akses);
					this.e8.setText(this.userData[0].kode_klp_menu);
					setTipeButton(tbUbahHapus);
				} 
			}
			else 
				if (sender == this.e5) {
					this.e0.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '" + this.app._lokasi + "' and kode_lokfa = '" + sender.getText() + "' ", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Daftar User/Karyawan", false);
				}
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
					status = status.substr(0,1);
					var values = "";
					var sqlValue = "";
					var sql2 = "insert into amu_hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses,email, kode_lokfa) values ";				
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.app._lokasi+"','"+this.e8.getText()+"','"+this.e7.getText()+"','-' ,'"+this.e5.getText()+"'";
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
					status = status.substr(0,1);
					var values = "";
					var sqlValue = "";
					var sql2 = "insert into amu_hakakses (nik, nama, pass, status_admin, kode_lokfa, kode_klp_menu, klp_akses,email, kode_lokasi) values ";
					
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.e5.getText()+"','"+this.e8.getText()+"','"+this.e7.getText()+"','"+this.e9.getText()+"','"+this.app._lokasi+"'";
					sqlValue = "(" + values +")";
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from amu_hakakses where nik = '"+this.e0.getText()+"'");
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}			
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from amu_hakakses where nik = '"+this.e0.getText()+"' and kode_lokfa = '"+this.e5.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");	
					this.dbLib.execArraySQL(sql);		
				}
				break;
		}
	},
	doLabelChange: function(sender, caption){
		this.e1.setText(caption);
	}
});
