//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_eclaim_admin_fHakakses = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_eclaim_admin_fHakakses.prototype.parent.constructor.call(this, owner);
			this.className = "app_eclaim_admin_fHakakses";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","User Maintenance", 0);	
		
			this.maximize();
			
			uses("portalui_saiCBBL;portalui_saiEdit");		
			this.e5 = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"Tertanggung",btnClick:[this,"doClick"]});									
			this.e0 = new portalui_saiCBBL(this,{bound:[20,45,250,20],caption:"User Id",change:[this,"doEditChange"], btnClick:[this,"doClick"]});											
			this.p1 = new portalui_panel(this,{bound:[20,70,450,190],caption:"Data User",border:pbFlat});			
			
				this.e1 = new portalui_saiLabelEdit(this.p1,{bound:[20,25,402,20],caption:"User Name"});								
				this.e2 = new portalui_saiLabelEdit(this.p1,{bound:[20,22,250,20],caption:"Password",password:true});
				this.e3 = new portalui_saiEdit(this.p1,{bound:[272,22,150,20],password:true});								
				this.e9 = new portalui_saiLabelEdit(this.p1,{bound:[20,25,250,20],caption:"Email"});
				this.e4 = new portalui_saiCB(this.p1,{bound:[20,23,250,20],caption:"User Role",items:["Administrator","User/Operator"]});								
				//this.e7 = new portalui_saiCBBL(this.p1,{bound:[20,24,200,20],caption:"Klp Akses",btnClick:[this,"doClick"]});								
				this.e8 = new portalui_saiCB(this.p1,{bound:[20,24,200,20],caption:"User Menu"});	
				this.e10 = new portalui_saiCBBL(this.p1,{bound:[20,23,200,20],caption:"Lokasi",btnClick:[this,"doClick"]});									

			this.p1.rearrangeChild(30,23);
			uses("util_dbLib");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
						
			uses("util_standar");
			this.standar = new util_standar();
		
			setTipeButton(tbAllFalse)
			this.standar.clearByTag(this, new Array("0"),this.e0);
			this.setTabChildIndex();						
			this.dbLib.getDataProviderA("select distinct kode_klp from menu");
			this.e5.setText(this.app._kodeTtg, this.app._namaTtg);
			//this.e0.setText(this.app._userLog, this.app._namaUser);
		}catch(e)
		{
			alert("[app_eclaim_admin_fHakakses]::constructor:"+e);
		}
		
		this.setTabChildIndex();
	}
};
window.app_eclaim_admin_fHakakses.extend(window.portalui_childForm);
window.app_eclaim_admin_fHakakses.implement({
	doClick: function(sender){
		if (sender == this.e5){
			if (this.app._userStatus != "A" ) 
				this.standar.showListData(this, "Data Tertanggung",sender,undefined, 
											"select kode_ttg, nama from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											"select count(*) from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											["kode_ttg","nama"],"and", ["Kode Tertanggung","Nama"]);
			else this.standar.showListData(this, "Data Tertanggung",sender, undefined,
											"select kode_ttg, nama from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_ttg","nama"],"and",["Kode Lokasi","Nama"]);
		}
		if (sender == this.e10){
			if (this.app._userStatus != "A" ) 
				this.standar.showListData(this, "Data Lokasi",sender,undefined, 
											"select kode_lok, nama from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											"select count(*) from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											["kode_lok","nama"],"and", ["Kode Tertanggung","Nama"]);
			else this.standar.showListData(this, "Data Tertanggung",sender, undefined,
											"select kode_lok, nama from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_lok","nama"],"and",["Kode Lokasi","Nama"]);
		}
		/*
		else if (sender == this.e7){
			this.standar.showListData2(this, "Data Kelompom Akses",sender,undefined, 
											"select distinct kode_klp_akses from klp_akses_m ",
											"select count(distinct kode_klp_akses) from klp_akses_m ",
											["kode_klp_akses"],"where", ["Kode Klp"]);
		}	
		*/
		if (sender == this.e0){
			if (this.app._userStatus != "A")
				this.standar.showListData(this, "Data User", this.e0, this.e1,
												  "select nik, nama from eclaim_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_ttg='"+this.e5.getText()+"' and nik = '"+this.app._userLog+"' ",
												  "select count(*) from eclaim_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_ttg='"+this.e5.getText()+"' and nik = '"+this.app._userLog+"'",
												  ["nik","nama"],"and",["User Id","Nama"]);
			else this.standar.showListData(this, "Data User",this.e0, this.e1,
												  "select nik, nama from eclaim_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_ttg='"+this.e5.getText()+"' ",
												  "select count(*) from eclaim_hakakses where kode_lokasi ='"+this.app._lokasi+"' and kode_ttg='"+this.e5.getText()+"'  ",
												  ["nik","nama"],"and",["User Id","Nama"]);
				
		}
	},
	doEditChange: function(sender){
		
		if (sender == this.e0)
		{		
			if (sender.getText() != ""){
			
				var sql="select nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses,email, kode_ttg,kode_lok from eclaim_hakakses where kode_lokasi = '"+this.app._lokasi+"' and nik = '"+this.e0.getText()+"' and kode_ttg = '"+this.e5.getText()+"'";
				
				var data = this.dbLib.getDataProvider(sql,true);
				
				if (typeof data != "string" && data.rs.rows[0] !== undefined){
						data = data.rs.rows[0];	
						this.e1.setText(data.nama);
						this.e2.setText(data.pass);
						this.e3.setText(data.pass);
						this.e4.setText(data.status_admin == "A" ? "Administrator" : "User/Operator");
						this.e8.setText(data.kode_klp_menu);
						this.e9.setText(data.email);
						this.e10.setText(data.kode_lok);
						setTipeButton(tbUbahHapus);
				}
				else
				{
					setTipeButton(tbSimpan);
				}
			}else setTipeButton(tbAllFalse);
		}
		//else if (sender == this.e7){}
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
					var sql2 = "insert into eclaim_hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses,email, kode_ttg,kode_lok) values ";				
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.app._lokasi+"','"+this.e8.getText()+"','ADMIN','"+this.e9.getText()+"' ,'"+this.e5.getText()+"','"+this.e10.getText()+"'";
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
					var sql2 = "insert into eclaim_hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses,email, kode_ttg,kode_lok) values ";				
					values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.app._lokasi+"','"+this.e8.getText()+"','ADMIN','"+this.e9.getText()+"' ,'"+this.e5.getText()+"','"+this.e10.getText()+"'";
					sqlValue = "(" + values +")";
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from eclaim_hakakses where nik = '"+this.e0.getText()+"' and kode_ttg = '"+this.e5.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");	
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}			
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from eclaim_hakakses where nik = '"+this.e0.getText()+"' and kode_ttg = '"+this.e5.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");	
					this.dbLib.execArraySQL(sql);		
				}
				break;
		}
	}
});