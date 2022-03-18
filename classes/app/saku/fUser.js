//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_fUser = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_saku_fUser.prototype.parent.constructor.call(this, owner);
			this.className = "app_saku_fUser";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","User Maintenance", 0);	
		
			this.maximize();
			
			uses("portalui_saiCBBL;portalui_saiEdit");		
			this.e5 = new portalui_saiCBBL(this);
			this.e5.setTop(20);
			this.e5.setWidth(200);
			this.e5.setLeft(20);
			this.e5.setCaption("Lokasi");
			this.e5.setText("");
			this.e5.onBtnClick.set(this, "doFindClick");
			
			this.e0 = new portalui_saiCBBL(this);
			this.e0.setTop(45);
			this.e0.setLeft(20);
			this.e0.setWidth(200);
			this.e0.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">User Id</font>");
			this.e0.setTag(0);
			this.e0.onChange.set(this, "doEditChange");			
			this.e0.setRightLabelVisible(false);
			this.e0.onBtnClick.set(this,"doClick");
								
			this.p1 = new portalui_panel(this);
			this.p1.setCaption("Data User");
			this.p1.setTop(70);
			this.p1.setWidth(450);
			this.p1.setHeight(150);
			this.p1.setLeft(20);
			this.p1.setBorder(3);
			
				this.e1 = new portalui_saiLabelEdit(this.p1);
				this.e1.setTop(25);
				this.e1.setLeft(20);
				this.e1.setWidth(402);
				this.e1.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">User Name</font>");
				this.e1.setText("");
				this.e1.setReadOnly(true);
				
				this.e2 = new portalui_saiLabelEdit(this.p1);
				this.e2.setTop(47);
				this.e2.setLeft(20);
				this.e2.setWidth(250);
				this.e2.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Password</font>");
				this.e2.setPassword(true);
				this.e2.setText("");
				
				this.e3 = new portalui_saiEdit(this.p1);
				this.e3.setTop(48);
				this.e3.setLeft(272);
				this.e3.setWidth(150);
				this.e3.setHeight(19);
				this.e3.setPassword(true);
				this.e3.setText("");
				uses("portalui_saiCB");
				this.e4 = new portalui_saiCB(this.p1);
				this.e4.setTop(70);
				this.e4.setWidth(250);
				this.e4.setLeft(20);
				this.e4.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">User Role</font>");
				this.e4.setText("");
				this.e4.addItem(0,"Administrator");
				this.e4.addItem(1,"User/Operator");											
										
				this.e7 = new portalui_saiCBBL(this.p1);
				this.e7.setTop(95);
				this.e7.setWidth(200);
				this.e7.setLeft(20);
				this.e7.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Klp Akses</font>");
				this.e7.setText("");
				this.e7.onBtnClick.set(this, "doFindClick");
				
				this.e8 = new portalui_saiCB(this.p1,{bound:[20,120,200,20],caption:"User Menu"});	
			
			uses("util_dbLib");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
						
			uses("util_standar");
			this.standar = new util_standar();
			
			setTipeButton(tbSimpan);
			this.standar.clearByTag(this, new Array("0"),this.e0);
			this.setTabChildIndex();			
			this.dbLib.getDataProviderA("select distinct kode_klp from menu");
		}catch(e)
		{
			alert("[app_saku_fUser]::constructor:"+e);
		}
		
		this.setTabChildIndex();
	}
};
window.app_saku_fUser.extend(window.portalui_childForm);
window.app_saku_fUser.prototype.doClick = function(sender){
	if (this.app._userStatus != "A")
		this.standar.showListData(this, "Data User", this.e0, this.e1,
										  "select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' and nik = '"+this.app._userLog+"' ",
										  "select count(*) from karyawan where kode_lokasi ='"+this.app._lokasi+"' and nik = '"+this.app._userLog+"'",
										  ["nik","nama"],"and",["NIK","Nama"]);
	else this.standar.showListData(this, "Data User",this.e0, this.e1,
										  "select nik, nama from karyawan where kode_lokasi ='"+this.e5.getText()+"' ",
										  "select count(*) from karyawan where kode_lokasi ='"+this.e5.getText()+"' ",
										  ["nik","nama"],"and",["NIK","Nama"]);
};
window.app_saku_fUser.prototype.doEditChange = function(sender)
{
	setTipeButton(tbSimpan);
	if (sender == this.e0)
	{		
		var pass = this.dbLib.execSQL("select * from hakakses where kode_lokasi = '"+this.e5.getText()+"' and nik = '"+this.e0.getText()+"' ",1,0);								
		if (typeof(pass) == "object"){			
			this.userData = pass.rs.rows;			
			this.e2.setText(this.userData[0].pass);
			this.e3.setText(this.userData[0].pass);
			this.e4.setText(this.userData[0].status_admin == "A" ? "Administrator" : "User/Operator");			
			this.e7.setText(this.userData[0].klp_akses);
			this.e8.setText(this.userData[0].kode_klp_menu);
			setTipeButton(tbUbahHapus);
		}
	}else if (sender == this.e7){}
};
window.app_saku_fUser.prototype.doRequestReady = function(sender, methodName, result)
{
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
};
window.app_saku_fUser.prototype.doFindClick = function(sender)
{
	try{
		if (sender == this.e5) {
			if (this.app._userStatus != "A" ) 
				this.standar.showListData(this, "Data Lokasi",sender,undefined, 
											"select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_lokasi","nama"],"and", ["Kode Lokasi","Nama"]);
			else this.standar.showListData(this, "Data Lokasi",sender, undefined,
											"select kode_lokasi, nama from lokasi ",
											"select count(*) from lokasi",
											["kode_lokasi","nama"],"where",["Kode Lokasi","Nama"]);
		}else if (sender == this.e7){
			this.standar.showListData2(this, "Data Lokasi",sender,undefined, 
											"select distinct kode_klp_akses from klp_akses_m ",
											"select count(distinct kode_klp_akses) from klp_akses_m ",
											["kode_klp_akses"],"where", ["Kode Klp"]);
		}		
		
	}catch(e){
		alert(e);
	}
};
window.app_saku_fUser.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","");
	else if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","");
	else if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
	else if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
};
window.app_saku_fUser.prototype.doModalResult = function(event, modalResult, value)
{
	
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
				var sql2 = "insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values ";
				
				values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.e5.getText()+"','"+this.e8.getText()+"','"+this.e7.getText()+"' ";
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
				var sql2 = "insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values ";
				
				values = "'"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+status+"','"+this.e5.getText()+"','"+this.e8.getText()+"','"+this.e7.getText()+"'";
				sqlValue = "(" + values +")";
				sql2 += sqlValue;
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("delete from hakakses where nik = '"+this.e0.getText()+"' and kode_lokasi = '"+this.e5.getText()+"' ");
				sql.add(sql2);
				this.dbLib.execArraySQL(sql);		
			}			
			break;
		case "hapus" :
			if (modalResult == mrOk)
			{
				var sql = new server_util_arrayList();
				sql.add("delete from hakakses where nik = '"+this.e0.getText()+"' and kode_lokasi = '"+this.e5.getText()+"' ");	
				this.dbLib.execArraySQL(sql);		
			}
			break;
	}
};
