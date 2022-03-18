/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_smsadmin_login_fLogin = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_smsadmin_login_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_smsadmin_login_fLogin";
			this.setTop(60);
			this.setWidth(400);
			this.setHeight(200);
			var step = "init child";
			
			this.app._mainForm.setActiveForm(this);
			this.app._mainForm.onLoginClick.set(this,"mainButtonClick");
			//------------------------ login data ------------------------
			uses("controls_saiEdit;controls_image");			
			step = "craete saiLabelEdit";			
			step = "craete edit";			
			this.lblClient = new controls_saiLabelEdit(this);
			this.lblClient.setHeight(20);
			this.lblClient.setWidth(200);
			
			this.lblClient.setTop(3);
			this.lblClient.setLeft(10);		
			this.lblClient.setCaption("Client");
			this.lblClient.setName("lblClient");
			this.lblClient.setText("000");
			this.lblClient.setReadOnly(true);
			
				
			this.e0 = new controls_saiLabelEdit(this);
			this.e0.setLeft(10);
			this.e0.setTop(42);
			this.e0.setWidth(350);
			this.e0.setCaption("User Name");
			this.e0.setText("");
			this.e0.setReadOnly(false);
			//this.e0.onExit.set(this, "EditExit");
			this.e0.setName("e0");
			
			this.e1 = new controls_saiLabelEdit(this);
			this.e1.setLeft(10);
			this.e1.setTop(67);
			this.e1.setWidth(350);
			this.e1.setCaption("Password")
			this.e1.setPassword(true);
			this.e1.setText("");
			this.e1.setReadOnly(false);
			this.e1.onKeyDown.set(this, "keyDown");
			this.e1.setName("e1");
			
			
			//uses("");
			this.img1 =new controls_image(this);
			this.img1.setWidth(700);
			this.img1.setHeight(300);
			this.img1.setTop(100);
			this.img1.setLeft(this.width - 800);
			//this.img1.setImage("image/themes/"+page.getThemes()+"/logoperusahaan.png"); 			
			this.maximize();
						
		}catch(e)
		{
			rujax.alert(e,"[app_smsadmin_login_fLogin]::constructor:" + step);
		}
	}


	try
	{
		//uses("util_dbLib");
		this.dbLib = new util_dbLib(window.page.serverApp);
		this.dbLib.addListener(this);
		this.setTabChildIndex();
		this.e0.setFocus();	
	}catch(e)
	{
		rujax.alert(e,"[app_smsadmin_login_fLogin]::oncreate lib : " );
	}
	
}
window.app_smsadmin_login_fLogin.extend(window.controls_childForm);

window.app_smsadmin_login_fLogin.prototype.mainButtonClick = function(sender)
{

	try
	{				
		page.showProgress();
		//this.startDate =new Date();
		if (this.app == undefined) this.app = this.getApplication();
		this.e0.blur();
		this.e1.blur();
		this.owner.block();		
		var data = runArraySQL("select a.*,b.nama from hakakses a inner join lokasi b on b.kode_lokasi = a.kode_lokasi where nik= '"+this.e0.getText()+"' and pass = '"+this.e1.getText()+"'\r\n"+
					"select max(periode) as periode from periode where kode_lokasi = 'table1_kode_lokasi'\r\n"+
					"select a.kode_pp, b.nama from karyawan a inner join pp b on b.kode_pp = a.kode_pp and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi= 'table1_kode_lokasi' and a.nik = 'table1_nik'\r\n"+
					"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
					"select kode_form from klp_akses_m where kode_klp_akses = 'table1_klp_akses'\r\n"+
					"select kode_lokasi from lokasi where flag_konsol='1' and kode_lokasi='table1_kode_lokasi'\r\n"+
					"select min(kode_lokasi) as kode_lokasi1,max(kode_lokasi) as kode_lokasi2 from lokasi where flag_konsol='0' and kode_lokkonsol='table6_kode_lokasi'\r\n"+
					"select kode_fs from fs where kode_lokasi='table1_kode_lokasi' and flag_status='1'\r\n"+
					"sp_del_temp ('table1_nik')","svrvar");			
		var dataRes = data.split("\r\n");		
		//data = data.split(";");
		step = "cek data";		
        var kodeMenu = data[0];		
		if ( (kodeMenu!= "") && (kodeMenu != undefined))
		{			
			data = dataRes[0].split("<br>");
			data = data[1].split(";");
			var lokasi = data[5];	
			var klpAkses = data[6];
			kodeMenu = data[0];
			if ( (lokasi!= "") && (lokasi != undefined) && (kodeMenu != lokasi))
			{												
				var nama = data[7];				
				step = "prepare to mainform";																
				this.app._isLogedIn = true;				
				this.app._userLog = this.e0.getText();
				this.app._lokasi = lokasi;
				this.app._kodeMenu = kodeMenu;
				this.app._namalokasi = nama;				
				this.app._userStatus = data[4];
				step = "init variable";													
				var tmpDate=new Date();
				var tmp="";				
				this.app._loginTime = tmpDate;
				this.app._nikUser= tmp.concat(this.e0.getText(),"_",tmpDate.valueOf());				
				this.app._periode = dataRes[1].split("<br>")[1];						
				this.app._pp = dataRes[2] != "" ? dataRes[2].split("<br>")[1]:"";												
				this.app._kodePP = dataRes[2] != "" ? this.app._pp.split(";")[0]:"";
//------------------------------------------------------------------- locking transaction								
				
				step = "get lock trans";													
				var dtLock = dataRes[3] != "" ? dataRes[3].split("<br>")[1]:"";
				if (dtLock != "")
				{					
					if (dtLock == '1'){
						page.alert(this,"Transaksi telah dikunci. Login tidak dapat dilakukan.","Hubungi administrator anda!");
						return false;
					}
				}				
				//------------------------------------- user access								
				data = dataRes[9].split("<br>")															
				this.app._dbname = data[2];
				this.app._dbhost = data[3];
				this.app._hostname = data[1];				
				this.app._iphost = data[0];
				this.app._userSession = data[5];
				this.app._dbEng = data[4];
				//----------------- klp Akses			
				if (dataRes[5] != ""){				
					data = dataRes[5].split("<br>");
					this.app._kodeLokasiKonsol = data[1];				
				}else this.app._kodeLokasiKonsol = "";
				if (dataRes[6] != ""){				
					data = dataRes[6].split("<br>");data = data[1].split(";");				
					this.app._kodeLokasi1=data[0];
					this.app._kodeLokasi2=data[1];	
				}else {
					this.app._kodeLokasi1="";
					this.app._kodeLokasi2="";	
				}
				if (dataRes[7] != ""){				
					data = dataRes[7].split("<br>")				
					this.app._kodeFs=data[1];									
				}else this.app._kodeFs="";									
				this.app._klpAkses = new Array();
				if (dataRes[4] != ""){					
					data = dataRes[4].split("<br>")[1];
					data = data.split(";");
					for (var i in data) this.app._klpAkses[data[i]] = data[i];
				}							
				step = "show mainform";																
				this.app.showMainForm(this.app._kodeMenu);											
				//alert(new Date().toLocaleString() +"\r\n"+this.startDate.toLocaleString());
				/*
				var driver = this.app._dbname.split("-");
				this.app._dbEng = driver[1];
				// set lokasi
				var line,data = this.dbLib.loadQuery("select kode_lokasi from lokasi where flag_konsol='1' and kode_lokasi='"+lokasi+"' ");				
				if (data.toLowerCase().search("error") == -1 && data != "")
				{
					data = data.split("\r\n");								
					data = data[1];								
					this.app._kodeLokasiKonsol=data;										
					var line,data = this.dbLib.loadQuery("select min(kode_lokasi) as kode_lokasi1,max(kode_lokasi) as kode_lokasi2 from lokasi where flag_konsol='0' and kode_lokkonsol='"+this.app._kodeLokasiKonsol+"'");
					if (data.toLowerCase().search("error") == -1 && data != "")
					{
						data = data.split("\r\n");								
						data = data[1].split(";");								
						this.app._kodeLokasi1=data[0];
						this.app._kodeLokasi2=data[1];					
					}	
				}else {
					this.app._kodeLokasiKonsol="";						
					this.app._kodeLokasi1="";
					this.app._kodeLokasi2="";										
				}
				
				//set default fs
				var sql="select kode_fs from fs where kode_lokasi='"+lokasi+"' and flag_status='1'"
				var line,data = this.dbLib.loadQuery(sql);
				if (data.toLowerCase().search("error") == -1 && data != "")
				{
					data = data.split("\r\n");			
					data = data[1];			
					this.app._kodeFs=data;					
				}			
				// clear temp tabel
				if (this.app._dbname =="dbsai-mysqlt")
				{
					var sql="call sp_del_temp ('"+this.app._userLog+"')";
				}
				else
				{
					var sql="exec sp_del_temp '"+this.app._userLog+"'";
				}
				this.dbLib.execQuery(sql);	
				//----------------- klp Akses				
				var rs = this.dbLib.execSQL("select kode_form from klp_akses_m where kode_klp_akses = '"+klpAkses+"' ");
				this.app._klpAkses = new Array();
				if (typeof(rs) != "boolean"){
					for (var i in rs.rs.rows){
						this.app._klpAkses[rs.rs.rows[i].kode_form] = rs.rs.rows[i].kode_form;
					}				
				}
				uses("util_addOnLib");
				this.addOnLib = new  util_addOnLib();
				this.app._baris = this.addOnLib.getBaris(this.app._lokasi);				
				this.app._pernext = this.addOnLib.getPerNext(this.app._lokasi);				
				step = "show mainform";
				this.app.showMainForm();			
				*/			
				page.hideProgress();				
			}else
			{
				page.hideProgress();
				page.alert(this,"Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR.");
			}
			
		}else
		{
			page.hideProgress();
			page.alert(this,"Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR.");
		}		
		
	}catch(e)
	{
		page.hideProgress();
		page.alert(e,"[fLogin2]::mainButtonClick:" +step);
	}
	
}

window.app_smsadmin_login_fLogin.prototype.buttonClick = function(sender)
{
	
}
window.app_smsadmin_login_fLogin.prototype.EditExit = function(sender)
{
	if (this.e0.getText() == "") return false;
	try
	{		
	}catch(e)
	{
		page.alert(this,"[fLogin2]::editExit:"+e);
	}
}
window.app_smsadmin_login_fLogin.prototype.keyDown = function(sender, keyCode, buttonState)
{
	if (keyCode == 13)
	{
		this.mainButtonClick(this.app._mainForm.bLogin);
		return false;
	}
}
window.app_smsadmin_login_fLogin.prototype.doRequestReady = function(sender, methodName, result)
{
	
}
window.app_smsadmin_login_fLogin.prototype.doAfterResize = function()
{
	var height = this.app._mainForm.getHeight();
	var width = this.app._mainForm.getWidth();
	this.img1.setLeft((width / 2) - 225);	
}
