//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_rra_fLogin = function(owner){
	if (owner){
		try{		
			window.app_rra_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_rra_fLogin";						
			this.maximize();								
			owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------				
			this.p1 = new panel(this,{bound:[10,20, 350, 90], caption:"Client Login Settings"});
			this.rP00 = new radioButton(this.p1,{bound:[10,20,300,20], caption:"Server Production", selected:true,  change:[this,"doSelectionChange"]});
			this.rQ00 = new radioButton(this.p1,{bound:[10,21,300,20], caption:"Server Training/QA", change:[this,"doSelectionChange"]});
			this.p1.rearrangeChild(30,30);
			
			this.e0 = new saiLabelEdit(this,{bound:[10,122,350,20],caption:"User Name",text:"",name:"e0",autoComplete:false});						
			this.e1 = new saiLabelEdit(this,{bound:[10,145,350,20],caption:"Password",password:true,name:"e1",text:""});
			this.e1.onKeyDown.set(this, "keyDown");								
						
			this.setTabChildIndex();
			this.e0.setFocus();				
			this.app._rfcSetting = "rra/sap";
			this.app._dbSetting = "orarra";			
			this.app._appState = "P00";			
			this.app._TW = new arrayMap({items:{"01":1, "02":1, "03":1,"04": 2, "05": 2, "06":2, "07": 3, "08":3, "09":3, "10":4,"11":4,"12":4 }});
			this.app._sapOnline = true;			
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert("[app_rra_fLogin]::oncreate lib : ",e);
		}
	}
};
window.app_rra_fLogin.extend(window.childForm);
window.app_rra_fLogin.implement({
	doClose : function(sender){
		this.dbLib.delListener(this);
	},
	doSelectionChange: function(sender, value){
		if (sender == this.rP00 && this.rP00.isSelected()) {
			this.app._dbSetting = "orarra";
			this.app._rfcSetting = "rra/sap";
			this.app._appState = "P00";
		}else{
			this.app._dbSetting = "orarradev";
			this.app._rfcSetting = "rra/sapdev";
			this.app._appState = "Q00";
		}		
	},
    mainButtonClick: function(sender){
		try{
			this.showLoading("Authentication....");			
			if (this.app == undefined) this.app = this.getApplication();			
			this.e0.blur();
			this.e1.blur();		
			//init server object;
			//this.dbLib = new util_dbLib(undefined, this.app._dbSetting);			
			
			this.app.dbLib = new util_dbLib(undefined, this.app._dbSetting);
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);
			this.app._dbLib = this.app.dbLib;			
			this.app._addOnLib = new util_addOnLib(); 	
			
			//this.owner.block();				
			this.dbLib.loginAndLoad("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok "+
						"			, c.kode_ubis, c.kode_gubis, ifnull(e.nik_app,d.nik_app1) as nik_app1, d.nik_app2, d.nik_app3, c.kode_kota, c.kode_ba, ifnull(d.nama, '-') as nmubis, ifnull(e.nama, '-') as nmgubis, c.kode_cc, c.status "+
						"	from hakakses a "+
						"		inner join lokasi b on b.kode_lokasi = a.kode_lokasi "+
						"		left outer join rra_karyawan c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi "+
						"		left outer join rra_ubis d on d.kode_ubis = c.kode_ubis and d.kode_lokasi = c.kode_lokasi "+
						"		left outer join rra_ba e on e.kode_ba = c.kode_ba and e.kode_lokasi = c.kode_lokasi "+
						"	where a.nik= '"+this.e0.getText()+"'\r\n"+
						"select max(periode) as periode from periode\r\n"+						
						"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
						"select kode_form from klp_akses_m where kode_klp_akses = 'table1_klp_akses'\r\n"+												
						"select date_format(now(),'%d-%m-%Y') as tgl from dual\r\n"+
						"select nama, modul from spro where kode_lokasi='table1_kode_lokasi' and kode_spro = 'DEFUID'\r\n"+
						"select nik, nama, jabatan from rra_karyawan where kode_lokasi = 'table1_kode_lokasi' and kode_ubis ='table1_kode_ubis'\r\n "+
						"select kode_akun, nama from rra_masakun where kode_lokasi = 'table1_kode_lokasi'\r\n "+
						"select nik, nama, jabatan from rra_karyawan where kode_lokasi = 'table1_kode_lokasi'\r\n "+
						"select kode_ubis, nama from rra_ubis where kode_lokasi = 'table1_kode_lokasi'\r\n "+
						"select kode_gubis, nama from rra_gubis where kode_lokasi = 'table1_kode_lokasi'\r\n "+
						"select kode_kota, nama from rra_kota  "
						,this.e0.getText(),this.e1.getText(),true);
			
		}catch(e){					
			this.hideLoading();
			systemAPI.alert(e,"[fLogin2]::mainButtonClick:");						
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
							var lokasi = data[6];
							var klpAkses = data[6];
							kodeMenu = data[0];				
							if ( (lokasi!= "") && (lokasi != undefined) && (kodeMenu != lokasi)){
								var nama = data[7];	
								setCookie("roojuid",this.e0.getText(),1);		
								setCookie("roojpwd",this.e1.getText(),1);		
								setCookie("dbSetting",this.app._dbSetting,1);
								setCookie("rfcSetting",this.app._rfcSetting,1);
								setCookie("appState",this.app._appState,1);
			
								this.app._isLogedIn = true;				
								this.app._userLog = this.e0.getText();
								this.app._lokasi = lokasi;
								this.app._kodeMenu = kodeMenu;
								this.app._namalokasi = nama;				
								this.app._userStatus = data[4];
								this.app._namaUser = data[2];
								this.app._kodeUbis = data[8];
								this.app._kodeGubis = data[9];
								this.app._nikApp1 = data[10];
								this.app._nikApp2 = data[11];
								this.app._nikApp3 = data[12];
								this.app._kodeBA = data[14];
								this.app._nmUbis = data[15];
								this.app._nmGubis = data[16];
								this.app._kodeCC = data[17];//filter FINOP
								this.app._statusLokasiUser = data[18];
								this.app._kota = data[13];
								//error_log(this.app._statusLokasiUser);
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
								this.app._periodeGAR = data[1].split("-");
								this.app._periodeGAR = this.app._periodeGAR[2]+this.app._periodeGAR[1];								
								data = dataRes[5].split("<br>");
								if (data[1] != undefined) {
									data = data[1].split(";");								
									this.app._defsapuid = {uid:data[0],pwd:data[1]};
								}else this.app._defsapuid = {uid:"AP-TRAIN21",pwd:"belumganti"};
								data = dataRes[6].split("<br>");
								this.app._listNIK = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._listNIK.set(line[0],{nik:line[0], nama:line[1],jabatan:line[2]});
								}													
								data = dataRes[7].split("<br>");
								this.app._listAKUN = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._listAKUN.set(line[0],line[1]);
								}				
								data = dataRes[8].split("<br>");
								this.app._dataKaryawan = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._dataKaryawan.set(line[0],{nik:line[0], nama:line[1],jabatan:line[2]});
								}
								data = dataRes[9].split("<br>");
								this.app._dataUbis = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._dataUbis.set(line[0],{kode_ubis:line[0], nama:line[1]});
								}
								data = dataRes[10].split("<br>");
								this.app._dataGubis = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._dataGubis.set(line[0],{kode_gubis:line[0], nama:line[1]});
								}
								data = dataRes[11].split("<br>");
								this.app._dataKota = new arrayMap();
								for (var i=1; i < data.length;i++){
									var line = data[i].split(";");
									this.app._dataKota.set(line[0],{kode_kota:line[0], nama:line[1]});
								}
								//------------- server info				
								data = dataRes[13].split("<br>");					
								this.app._dbname = data[2];
								this.app._dbhost = data[3];
								this.app._hostname = data[1];				
								this.app._iphost = data[0];
								this.app._userSession = data[5];
								this.app._dbEng = data[4];								
								this.app._uri = data[6].substr(0,data[6].indexOf("/uses.php"));
								if (this.app._uri == "") this.app._uri = data[6];
								this.app._servername = data[7];								
								this.app._rootDir = data[8];								
								this.app._fullPath = this.app._servername + this.app._uri;	
								this.app._dbInfo = {name:data[2], host:data[3], hostname:data[1], ip:data[0], engine:data[4]};							
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
								this.hideLoading();
								system.hideProgress();
								system.alert(this,"Maaf lokasi/Area anda tidak terdaftar.","Hubungi Administrator anda.");
								
							}
							
						}else
						{							
							this.hideLoading();
							system.alert(this,"User atau Password anda salah","a-Gunakan password yang sudah diberikan");														
							system.hideProgress();
							
						}		
					break;
				}
			}
		}catch(e){			
			system.hideProgress();			
			this.hideLoading();
			system.alert(this,"Login Gagal dilakukan.<br>Gunakan password yang sudah diberikan."+result,e);			
			
		}
	},
	doAfterResize:	function(){
		var height = this.owner.getHeight();
		var width = this.owner.getWidth();		
	},
	setImage: function(path,proportional,width,height){
		try{
			this.img1.setImage(path);			
			if (width !== undefined) this.img1.setWidth(width);
			if (height !== undefined) this.img1.setHeight(height);			
		}catch(e){
			alert(e);
		}
	}
});
