//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_eclaim3_fLogin = function(owner){
	if (owner){
		try{		
			window.app_eclaim3_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_eclaim3_fLogin";			
			this.setBound(0,60,400,200);			
			owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------	
			this.img1 =new image(this,{bound:[this.width - 800,100,700,300]});						
			this.lblClient = new saiLabelEdit(this,{bound:[10,3,200,20],caption:"Client",name:"lblClient",text:"000",readOnly:true});			
			this.e0 = new saiLabelEdit(this,{bound:[10,42,350,20],caption:"User Name",text:"",name:"e0",autoComplete:false});						
			this.e1 = new saiLabelEdit(this,{bound:[10,67,350,20],caption:"Password",password:true,name:"e1",text:""});
			this.e1.onKeyDown.set(this, "keyDown");					
			this.maximize();											
			this.setTabChildIndex();
			this.e0.setFocus();	
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert("[app_eclaim3_fLogin]::oncreate lib : ",e);
		}
	}
};
window.app_eclaim3_fLogin.extend(window.childForm);
window.app_eclaim3_fLogin.implement({
	doClose: function(sender){
		this.dbLib.delListener(this);
	},
    mainButtonClick: function(sender){
		try{
			//system.showProgress();			
			if (this.app == undefined) this.app = this.getApplication();
			this.app.dbLib = new util_dbLib(undefined, this.app._dbSetting);
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);
			this.e0.blur();
			this.e1.blur();
			//this.owner.block();				
			this.dbLib.loginAndLoad("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.kode_lokasi, a.klp_akses, a.kode_ttg,b.nama,"+
									"	     c.nama as nama_ttg, c.gambar, a.kode_lok, d.nama as nmLok,a.email, e.email_adm,e.email_ttg,e.from_adm "+
									"from tlk_hakakses a "+
									"inner join lokasi b on b.kode_lokasi = a.kode_lokasi "+
									"inner join tlk_ttg c on a.kode_ttg=c.kode_ttg and a.kode_lokasi = b.kode_lokasi "+
									"inner join tlk_lokasi d on d.kode_lokasi = a.kode_lokasi and d.kode_lok = a.kode_lok "+
									"inner join tlk_spro e on a.kode_lokasi=e.kode_lokasi "+
									"where nik= '"+this.e0.getText()+"' and pass = '"+this.e1.getText()+"'\r\n"+
						"select max(periode) as periode from periode where kode_lokasi = 'table1_kode_lokasi'\r\n"+						
						"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
						"select kode_form from klp_akses_m where kode_klp_akses = 'table1_klp_akses'",
						this.e0.getText(),this.e1.getText(),false);
			
		}catch(e){
			system.hideProgress();
			system.alert(e,"[fLogin2]::mainButtonClick:" +step);
		}		
	},
	buttonClick: function(sender){
	},
	EditExit: function(sender){
		if (this.e0.getText() == "") return false;
		try
		{		
		}catch(e)
		{
			system.alert(this,"[fLogin2]::editExit:"+e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13){
			this.mainButtonClick(this.app._mainForm.bLogin);
			return false;
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib){
				switch (methodName){
					case "loginAndLoad":																										
						var data = result;
						var dataRes = data.split("\r\n");					
						var kodeMenu = dataRes[0];
						if ( (kodeMenu!= "") && (kodeMenu != undefined)){
							data = dataRes[0].split("<br>");
							data = data[1].split(";");
							var lokasi = data[5];	
							var klpAkses = data[6];
							kodeMenu = data[0];				
							if ( (lokasi!= "") && (lokasi != undefined) && (kodeMenu != lokasi)){
								var nama = data[8];																										
								this.app._isLogedIn = true;				
								this.app._userLog = this.e0.getText();
								this.app._lokasi = lokasi;
								this.app._kodeMenu = kodeMenu;
								this.app._namalokasi = nama;				
								this.app._userStatus = data[4];				
								this.app._namaUser = data[2];
								this.app._kodeTtg = data[7];
								this.app._namaTtg = data[9];
								this.app._logoTtg = data[10];								
								this.app._kodeLok = data[11];
								this.app._namaLok = data[12];
								this.app._email = data[13];
								this.app._emailadm = data[14];
								this.app._emailttg = data[15];
								this.app._fromadm = data[16];
								var tmpDate=new Date();
								var tmp="";				
								this.app._loginTime = tmpDate;
								this.app._nikUser= tmp.concat(this.e0.getText(),"_",tmpDate.valueOf());				
								this.app._periode = dataRes[1].split("<br>")[1];						
								this.app._pp = "-";												
								this.app._kodePP = "-";
								//------------------------------------------------------------------- locking transaction																																
								var dtLock = dataRes[2] != "" ? dataRes[2].split("<br>")[1]:"";
								if (dtLock != "")
								{					
									if (dtLock == '1'){
										system.alert(this,"Transaksi telah dikunci. Login tidak dapat dilakukan.","Hubungi administrator anda!");
										return false;
									}
								}				
								//------------------------------------- user access								
								data = dataRes[5].split("<br>");
								this.app._dbname = data[2];
								this.app._dbhost = data[3];
								this.app._hostname = data[1];				
								this.app._iphost = data[0];
								this.app._userSession = data[5];
								this.app._dbEng = data[4];
								this.app._uri = data[6];
								this.app._servername = data[7];
								this.app._rootDir = data[8];
								//----------------- klp Akses											
								this.app._klpAkses = new Array();
								if (dataRes[3] != ""){					
									data = dataRes[3].split("<br>")[1];
									data = data.split(";");
									for (var i in data) this.app._klpAkses[data[i]] = data[i];
								}																																	
								this.app._mainForm.doAfterLogin();																
								system.hideProgress();				
							}else
							{
								this.owner.unblock();		
								system.hideProgress();
								system.alert(this,"Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR."+result);
							}
							
						}else
						{
							system.hideProgress();
							this.owner.unblock();		
							systemAPI.alert("Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR."+result);
						}				
					break;
				}
			}
		}catch(e){
			system.hideProgress();
			system.alert(this,"Login Gagal dilakukan.","Coba Hubungi Administrator anda."+result);			
		}
	},
	doAfterResize:	function(){
		var height = this.owner.getHeight();
		var width = this.owner.getWidth();
		this.img1.setLeft((width / 2) - (this.img1.width / 2));	
		this.img1.setTop((height / 2) - (this.img1.height / 2) - 60);	
	},
	setImage: function(path,proportional,width,height){
		try{
			this.img1.setImage(path);
			//this.img1.setProportional(proportional);
			if (width !== undefined) this.img1.setWidth(width);
			if (height !== undefined) this.img1.setHeight(height);
			this.img1.setLeft((this.width / 2) - (this.img1.width / 2));	
			this.img1.setTop((this.height / 2) - (this.img1.height / 2) );	
		}catch(e){
			alert(e);
		}
	}
});
