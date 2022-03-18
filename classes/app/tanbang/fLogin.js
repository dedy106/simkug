//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_tanbang_fLogin = function(owner){
	if (owner){
		try{		
			window.app_tanbang_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_tanbang_fLogin";			
			this.setBound(0,60,400,200);			
			owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------	
			this.img1 =new image(this,{bound:[this.width - 800,100,700,300]});						
			this.lblClient = new saiLabelEdit(this,{bound:[10,3,200,20],caption:"Client",name:"lblClient",text:"000",readOnly:true});			
			this.e0 = new saiLabelEdit(this,{bound:[10,42,350,20],caption:"User Name",text:"",name:"e0",autoComplete:false});						
			this.e1 = new saiLabelEdit(this,{bound:[10,67,350,20],caption:"Password",password:true,name:"e1",text:""});
			this.e1.onKeyDown.set(this, "keyDown");					
			this.maximize();								
			this.dbLib = new util_dbLib(undefined, this.app._dbSetting);
			this.dbLib.addListener(this);
			this.setTabChildIndex();
			this.e0.setFocus();	
		}catch(e){
			systemAPI.alert("[app_tanbang_fLogin]::oncreate lib : ",e);
		}
	}
};
window.app_tanbang_fLogin.extend(window.childForm);
window.app_tanbang_fLogin.implement({
    mainButtonClick: function(sender){
		try{
			//system.showProgress();			
			if (this.app == undefined) this.app = this.getApplication();
			this.e0.blur();
			this.e1.blur();
			//this.owner.block();					
			this.dbLib.loginAndLoad("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.kode_lokfa, a.klp_akses, a.kode_lokasi,b.nama as nmlok, c.nama as nmlokfa from amu_hakakses a inner join lokasi b on b.kode_lokasi = a.kode_lokasi inner join amu_lokasi c on a.kode_lokfa=c.kode_lokfa where nik= '"+this.e0.getText()+"' \r\n"+
						"select max(periode) as periode from periode\r\n"+						
						"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
						"select 'a' from dual\r\n"+						
						"select max(periode) as periode from amu_asset "
						,this.e0.getText(),this.e1.getText(),false);
			
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
							var lokasi = data[7];	
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
								this.app._kodeLokfa = data[5];
								this.app._namaLokfa = data[9];
								var tmpDate=new Date();
								var tmp="";				
								this.app._loginTime = tmpDate;
								this.app._nikUser= tmp.concat(this.e0.getText(),"_",tmpDate.valueOf());				
								this.app._periode = dataRes[1].split("<br>")[1];						
								this.app._pp = this.app._kodeLokfa;
								this.app._kodePP = this.app._kodeLokfa;
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
								data = dataRes[4].split("<br>");					
								
								this.app._periodeAset = data[1];
								data = dataRes[6].split("<br>");					
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
								this.app._kodeLokasiKonsol = "-";
								this.app._klpAkses = [];															
								if (dataRes[3] != ""){													
									data = dataRes[3].split("<br>");											
									for (var i in data){
										 this.app._klpAkses[data[i]] = data[i];
									}									
								}							
								this.app._lokKonsol = "-";
								this.app._mainForm.doAfterLogin();																
								system.hideProgress();				
							}else
							{
								system.hideProgress();
								system.alert(this,"Maaf lokasi/Area anda tidak terdaftar.","Hubungi Administrator anda.");
							}
							
						}else
						{
							system.hideProgress();
							system.alert(this,"User atau Password anda salah","Gunakan password Portal Internal Telkom");							
						}		
					break;
				}
			}
		}catch(e){
			system.hideProgress();
			system.alert(this,"Login Gagal dilakukan.","Gunakan password Portal Internal Telkom.");			
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
