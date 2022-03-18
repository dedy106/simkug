//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku3_fLogin = function(owner){
	if (owner){
		try{		
			window.app_saku3_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_saku3_fLogin";			
			//this.setBound(0,60,400,200);			
			//owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------	
							
			this.maximize();								
			//owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------				
			this.p1 = new panel(this,{bound:[10,20, 350, 90], caption:"Client Login Settings", visible:false});
			//this.rP00 = new radioButton(this.p1,{bound:[10,20,300,20], caption:"Server Production",  change:[this,"doSelectionChange"]});
			//this.rQ00 = new radioButton(this.p1,{bound:[10,21,300,20], caption:"Server Training/QA", selected:true, change:[this,"doSelectionChange"]});
			this.p1.rearrangeChild(30,30);
			this.p2 = new panel(this, {bound:[this.width / 2 - 400,this.height / 2 - 200, 800,400], color:"#fff", border:0});
			
			this.p3 = new panel(this.p2, {bound:[this.p2.width - 300,0,300,400], color:"#ddd", border:0});
			//this.p4 = new panel(this.p2, {bound:[0,0, 800,25], color:"#ddd", border:0});
			
			this.iLogo = new image(this.p2, {bound:[50,20,400,225], image:window.app_logo, proportional:1});

			this.lApp = new label(this.p2, {bound:[0,280,500,60], alignment:"center",caption:window.app_keterangan, fontSize:18, fontColor:"#009BD2", proportional: true});
			this.lv = new label(this.p2, {bound:[0,350,500,50], alignment:"center",caption:"versi 1.0", fontSize:12, fontColor:"#FF9900"});
			
			this.iLogo2 = new image(this.p3, {bound:[270,0,25,25], image:"image/jambugrey.png"});
			this.lH = new label(this.p3, {bound:[20,40,200,30], caption:"Login", fontSize:18, fontColor:"#8c8c8c"});
			
			this.l0 = new label(this.p3, {bound:[20,102,200,20], caption:"Username", fontSize:12, fontColor:"#555"});
			this.e0 = new saiEdit(this.p3,{bound:[20,125,250,20],caption:"User Name",text:"",name:"e0",autoComplete:false});						
			this.l1 = new label(this.p3, {bound:[20,160,200,20], caption:"Password", fontSize:12, fontColor:"#555"});
			this.e1 = new saiEdit(this.p3,{bound:[20,183,250,20],caption:"Password",password:true,name:"e1",text:""});
			this.bLogin = new button(this.p3, {bound:[20,210,80,20],caption:"Login",icon:"url(icon/"+system.getThemes()+"/login.png)", click:[this,"buttonClick"]});
			//this.lH = new label(this.p3, {bound:[165,370,80,30], caption:"jamboo", fontSize:11, fontColor:"#19acf5"});
			this.l3 = new label(this.p3, {bound:[70,242,200,20], caption:"Download Mobile Apps", fontSize:11, fontColor:"#555"});
			this.container = new control(this.p3, {bound:[100,370, 100, 25]});
			var cnv = this.container.getCanvas();
			cnv.style.border = "1px solid transparent";
			cnv.style.background = "#fff";
			this.l2 = new label(this.p3, {bound:[110,375,200,20], caption:"Android", fontSize:11, fontColor:"#2CA6DF"});
			this.qrAndroid = new image(this.p3, {bound:[170,371,25,25], image:"apk/android.png", proportional:false});
			
			
			this.qrCode = new image(this.p3, {bound:[100,265,100,100], image:"apk/qrcode.jpg", proportional:false});
			
			this.e1.setText("");
			this.e1.onKeyDown.set(this, "keyDown");								
			this.setTabChildIndex();
			this.e0.setFocus();				
			this.app._TW = new arrayMap({items:{"01":1, "02":1, "03":1,"04": 2, "05": 2, "06":2, "07": 3, "08":3, "09":3, "10":4,"11":4,"12":4 }});
			this.onClose.set(this,"doClose");
			this.getClientCanvas().style.background = "#999";
		}catch(e){
			systemAPI.alert("[app_saku3_fLogin]::oncreate lib : ",e);
			//alert(e);
		}
	}
};
window.app_saku3_fLogin.extend(window.childForm);
window.app_saku3_fLogin.implement({
	doClose: function(){
		this.dbLib.delListener(this);
	},
	
    mainButtonClick: function(sender){
		try{
			//system.showProgress();			
			if (this.app == undefined) this.app = this.getApplication();
			//if (this.app.dbLib === undefined) {
			this.app.dbLib = new util_dbLib(undefined, "mssql");
			this.dbLib = this.app.dbLib;//new util_dbLib(undefined, this.app._dbSetting);
			this.dbLib.addListener(this);
			this.app._mainForm.dbLib = this.app.dbLib;
			this.app._mainForm.dbLib.addListener(this.app._mainForm);
			//};
			this.e0.blur();
			this.e1.blur();
			//this.owner.block();		
			//alert(this.dbLib);
			this.dbLib.loginAndLoad("select a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok, "+
									"       c.kode_pp,d.nama as nama_pp,b.kode_lokkonsol,d.kode_bidang, c.foto "+ 
									"from hakakses a "+
									"inner join lokasi b on b.kode_lokasi = a.kode_lokasi "+
									"left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
									"left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
									"where a.nik= '"+this.e0.getText()+"'  \r\n"+//and a.pass='"+this.e1.getText()+"'
						"select max(periode) as periode from periode where kode_lokasi='table1_kode_lokasi'\r\n"+						
						"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
						"select kode_form from klp_akses_m where kode_klp_akses = 'table1_klp_akses'\r\n"+		
						"select kode_lokasi from lokasi where flag_konsol='1' and kode_lokasi='table1_kode_lokasi'\r\n"+												
						"select min(kode_lokasi) as kode_lokasi1,max(kode_lokasi) as kode_lokasi2 from lokasi where flag_konsol='0'\r\n"+
						"select kode_fs from fs where kode_lokasi='table1_kode_lokasi' and flag_status='1'\r\n"+
						"select kode_akun, nama from masakun where kode_lokasi='table1_kode_lokasi' and block='0'\r\n"+
						"select kode_pp, nama from pp where kode_lokasi='table1_kode_lokasi' and flag_aktif='1' and tipe = 'Posting'\r\n"+
						"select kode_cf, nama from neracacf where tipe='posting' and kode_lokasi='table1_kode_lokasi' union select '-','-'\r\n"+
						"select kode_lokasi from lokasi where flag_pusat='1' ",						
						this.e0.getText(),this.e1.getText(),false);
			
		}catch(e){
			system.hideProgress();
			alert(e);
			system.alert(this,e,"[fLogin2]::mainButtonClick:");
		}		
	},
	buttonClick: function(sender){
		this.mainButtonClick(this.app._mainForm.bLogin);
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
						//alert(result);
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
								this.app._isLogedIn = true;				
								this.app._userLog = this.e0.getText();
								this.app._lokasi = lokasi;
								this.app._kodeMenu = kodeMenu;
								this.app._namalokasi = nama;				
								this.app._userStatus = data[4];
								this.app._namaUser = data[2];
								this.app._kodePP = data[8];
								this.app._namaPP = data[9];
								this.app._kodeLokasiKonsol=data[10];
								this.app._kodeBidang = data[11];
								this.app._foto = "server/media/"+data[12];
								var tmpDate=new Date();
								var tmp="";				
								this.app._loginTime = tmpDate;
								this.app._nikUser= tmp.concat(this.e0.getText(),"_",tmpDate.valueOf());				
								this.app._periode = dataRes[1].split("<br>")[1];						
								this.app._userPwd=this.e1.getText();
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
								if (dataRes[4] != ""){				
									data = dataRes[4].split("<br>");
									this.app._kodeLokasiKonsol = data[1];				
								};
								this.app._kodeLokasi1="";
								this.app._kodeLokasi2="";
								if (dataRes[5] != "")
								{				
									data = dataRes[5].split("<br>");data = data[1].split(";");				
									this.app._kodeLokasi1=data[0];
									this.app._kodeLokasi2=data[1];	
								}
								this.app._kodeFs="";	
								if (dataRes[6] != ""){				
									data = dataRes[6].split("<br>");
									this.app._kodeFs=data[1];									
								}
								this.app._masakun=new arrayMap();	
								if (dataRes[7] != ""){				
									data = dataRes[7].split("<br>");
									for (var i=0; i < data.length; i++){
										line = data[i].split(";");
										this.app._masakun.set(line[0],line[1]);									
									}
								}
								this.app._pp = new arrayMap();	
								if (dataRes[8] != ""){				
									data = dataRes[8].split("<br>");
									for (var i=0; i < data.length; i++){
										line = data[i].split(";");
										this.app._pp.set(line[0],line[1]);									
									}
								}
								this.app._cf = new arrayMap();	
								if (dataRes[9] != ""){				
									data = dataRes[9].split("<br>");
									for (var i=0; i < data.length; i++){
										line = data[i].split(";");
										this.app._cf.set(line[0],line[1]);									
									}
								}
								if (dataRes[10] != ""){				
									data = dataRes[10].split("<br>");
									this.app._kodeLokasiPusat = data[1];				
								};								
								
								data = dataRes[12].split("<br>");
								this.app._dbname = data[2];
								this.app._dbhost = data[3];
								this.app._hostname = data[1];				
								this.app._iphost = data[0];
								this.app._userSession = data[5];
								this.app._dbEng = data[4];
								this.app._uri = data[6].substr(0,data[6].indexOf("/uses.php"));
								this.app._servername = data[7];
								this.app._rootDir = data[8];
								
								//----------------- klp Akses			
								this.app._klpAkses = [];															
								if (dataRes[3] != ""){													
									data = dataRes[3].split("<br>");											
									for (var i=0; i < data.length; i++){
										 this.app._klpAkses[data[i]] = data[i];
									}									
								}							
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
							system.alert(this,"User atau Password anda salah","a-Gunakan password yang sudah diberikan");							
						}		
					break;
				}
			}
		}catch(e){
			system.hideProgress();
			system.alert(this,"Login Gagal dilakukan.","b-Gunakan password yang sudah diberikan.");			
		}
	},
	doAfterResize:	function(){
		var height = this.owner.getHeight();
		var width = this.owner.getWidth();
			
	},
	setImage: function(path,proportional,width,height){
		try{
			this.img1.setImage(path);
			//this.img1.setProportional(proportional);
			if (width !== undefined) this.img1.setWidth(width);
			if (height !== undefined) this.img1.setHeight(height);
			//this.img1.setLeft((this.width / 2) - (this.img1.width / 2));	
			//this.img1.setTop((this.height / 2) - (this.img1.height / 2) );	
		}catch(e){
			alert(e);
		}
	}
});