//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_budget_fLogin = function(owner){
	if (owner){
		try{		
			window.app_budget_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_budget_fLogin";			
			this.setBound(0,60,400,200);			
			owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------	
			this.img1 =new portalui_image(this,{bound:[this.width - 800,100,700,300]});						
			this.lblClient = new portalui_saiLabelEdit(this,{bound:[10,3,200,20],caption:"Client",name:"lblClient",text:"000",readOnly:true});			
			this.e0 = new portalui_saiLabelEdit(this,{bound:[10,42,350,20],caption:"User Name",text:"",name:"e0",autoComplete:true});						
			this.e1 = new portalui_saiLabelEdit(this,{bound:[10,67,350,20],caption:"Password",password:true,name:"e1",text:""});
			this.e1.onKeyDown.set(this, "keyDown");					
			this.maximize();					
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.setTabChildIndex();
			this.e0.setFocus();	
		}catch(e){
			systemAPI.alert("[app_budget_fLogin]::oncreate lib : ",e);
		}
	}
};
window.app_budget_fLogin.extend(window.portalui_childForm);
window.app_budget_fLogin.implement({
    mainButtonClick: function(sender){
		try{
			system.showProgress();			
			if (this.app == undefined) this.app = this.getApplication();
			this.e0.blur();
			this.e1.blur();
			this.owner.block();		
			var data = runArraySQL("select a.*,b.nama from hakakses a inner join lokasi b on b.kode_lokasi = a.kode_lokasi where nik= '"+this.e0.getText()+"' and pass = '"+this.e1.getText()+"'\r\n"+
						"select max(periode) as periode from periode where kode_lokasi = 'table1_kode_lokasi'\r\n"+
						"select a.kode_pp, b.nama,b.kode_bidang from karyawan a inner join agg_pp b on b.kode_pp = a.kode_pp and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi= 'table1_kode_lokasi' and a.nik = 'table1_nik'\r\n"+
						"select status from locktrans where kode_lokasi= 'table1_kode_lokasi'\r\n"+
						"select kode_form from klp_akses_m where kode_klp_akses = 'table1_klp_akses'\r\n"+
						"select kode_lokasi from lokasi where flag_konsol='1' and kode_lokasi='table1_kode_lokasi'\r\n"+												
						"select min(kode_lokasi) as kode_lokasi1,max(kode_lokasi) as kode_lokasi2 from lokasi where flag_konsol='0' and kode_lokkonsol='table6_kode_lokasi'\r\n"+
						"select kode_fs from fs where kode_lokasi='table1_kode_lokasi' and flag_status='1'\r\n"+
						"select kode_lokkonsol from lokasi where kode_lokasi = 'table1_kode_lokasi'\r\n"+
						"sp_del_temp ('table1_nik')","svrvar",undefined,"yakes");									
			var dataRes = data.split("\r\n");
			step = "cek data";		
			var kodeMenu = dataRes[0];		
			if ( (kodeMenu!= "") && (kodeMenu != undefined))
			{			
				data = dataRes[0].split("<br>");
				data = data[1].split(";");
				var lokasi = data[5];	
				var klpAkses = data[6];
				kodeMenu = data[0];
				if ( (lokasi!= "") && (lokasi != undefined) && (kodeMenu != lokasi)){
					var nama = data[7];				
					step = "prepare to mainform";																
					this.app._isLogedIn = true;				
					this.app._userLog = this.e0.getText();
					this.app._lokasi = lokasi;
					this.app._kodeMenu = kodeMenu;
					this.app._namalokasi = nama;				
					this.app._userStatus = data[4];
					this.app._namaUser = data[2];
					step = "init variable";													
					var tmpDate=new Date();
					var tmp="";				
					this.app._loginTime = tmpDate;
					this.app._nikUser= tmp.concat(this.e0.getText(),"_",tmpDate.valueOf());				
					this.app._periode = dataRes[1].split("<br>")[1];						
					this.app._pp = dataRes[2] != "" ? dataRes[2].split("<br>")[1]:"-";												
					this.app._kodePP = dataRes[2] != "" ? this.app._pp.split(";")[0]:"-";
					this.app._kodeBidang = dataRes[2] != "" ? this.app._pp.split(";")[2]:"-";	
					
//------------------------------------------------------------------- locking transaction													
					step = "get lock trans";													
					var dtLock = dataRes[3] != "" ? dataRes[3].split("<br>")[1]:"";
					if (dtLock != "")
					{					
						if (dtLock == '1'){
							system.alert(this,"Transaksi telah dikunci. Login tidak dapat dilakukan.","Hubungi administrator anda!");
							return false;
						}
					}				
					//------------------------------------- user access								
					data = dataRes[10].split("<br>");
					this.app._dbname = data[2];
					this.app._dbhost = data[3];
					this.app._hostname = data[1];				
					this.app._iphost = data[0];
					this.app._userSession = data[5];
					this.app._dbEng = data[4];
					this.app._uri = data[6].substr(0,data[6].indexOf("/uses.php"));
					this.app._servername = data[7];
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
						data = dataRes[7].split("<br>");
						this.app._kodeFs=data[1];									
					}else this.app._kodeFs="";									
					this.app._klpAkses = new Array();
					if (dataRes[4] != ""){					
						data = dataRes[4].split("<br>")[1];
						data = data.split(";");
						for (var i in data) this.app._klpAkses[data[i]] = data[i];
					}				
					if (dataRes[8] != ""){									
						data = dataRes[8].split("<br>");
						this.app._lokKonsol = data[1];
					}else this.app._lokKonsol = "";					
					step = "show mainform";																
					this.app._mainForm.doAfterLogin();																
					system.hideProgress();				
				}else
				{
					system.hideProgress();
					system.alert(this,"Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR.");
				}
				
			}else
			{
				system.hideProgress();
				systemAPI.alert("Invalid User Name and password","please fill with correct user.<br>or contact your ADMINISTRATOR.");
			}		
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
