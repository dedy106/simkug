//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_eclaim_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_eclaim_fMain.prototype.parent.constructor.call(this, owner);			
			this._mainButtonClick = new portalui_eventHandler();						
			this.title = window.parent.app_nama;
			document.title = window.parent.app_nama;
			this._isLogedIn	= false;
			this.app._kodeMenu = "";
			this._userLog = "";
			this._lokasi = "";
			this._pp = "";
			this.alwaysLoad = true;
			this._openAccess = true;
			this.activeChildForm = undefined;
			this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();							
			uses("saiCB;panelWidget;saiLabelEdit;image;imageButton;button;timer;label;saiCBBL;panel;reportNavigator;treeView;treeNode;statusBar;util_addOnLib;util_standar;imageButton;saiGrid");					
			this.className  = "fMain";			
			this.formCaption = window.parent.app_nama;	
			this.setCaption(this.formCaption);
			this.setTop(60);						
			this.maximize();										
			this.pTool = new panel(this,{bound:[0,0,this.width,30],color:"url(image/whitegradblue.jpg)",shadow:true});							
			this.bRun = new imageButton(this.pTool,{bound:[5,5,17,15],hint:"Execute",image:"icon/"+system.getThemes()+"/ok.png",click:[this,"doExecuteMenu"]});									
			this.cb1 = new saiCB(this.pTool,{bound:[28,3,200,20],labelWidth:0,text:"",mustCheck:false,keyDown:[this,"doMenuKeyDown"]});					
			this.bSave = new imageButton(this.pTool,{bound:[235,5,17,15],hint:"Save",click:[this,"doSave"],image:"icon/"+system.getThemes()+"/bSave2.png"});
			this.separator1 = new image(this.pTool,{bound:[260,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});		
            this.bRecall = new imageButton(this.pTool,{bound:[265,5,17,15],hint:"Refresh",image:"icon/"+system.getThemes()+"/bRefresh.png", click:[this,"doRecall"]});				
			this.bBack = new imageButton(this.pTool,{bound:[285,5,17,15],hint:"Back",image:"icon/"+system.getThemes()+"/bBack.png"});			
			this.bExit = new imageButton(this.pTool,{bound:[305,5,17,15],hint:"Exit",click:[this,"bTutupClick"],image:"icon/"+system.getThemes()+"/bExit.png"});			
			this.bCancel = new imageButton(this.pTool,{bound:[325,5,17,15],hint:"Cancel",image:"icon/"+system.getThemes()+"/bCancel2.png",click:[this,"doClose"]});
			this.separator2 = new image(this.pTool,{bound:[345,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bFind = new imageButton(this.pTool,{bound:[350,5,17,15],hint:"Search",image:"icon/"+system.getThemes()+"/bFind.png",click:[this,"alert('under contruction','')"]});			
			this.separator3 = new image(this.pTool,{bound:[370,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bNew = new imageButton(this.pTool,{bound:[375,5,17,15],hint:"Restart Session",image:"icon/"+system.getThemes()+"/bCreateSession.png",click:[this,"createSession"]});			
			this.bClose = new imageButton(this.pTool,{bound:[395,5,17,15],hint:"End Session",image:"icon/"+system.getThemes()+"/bEndSession.png",click:[this,"doClose"]});			
			this.separator3 = new image(this.pTool,{bound:[415,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bHelp = new imageButton(this.pTool,{bound:[420,5,17,15],hint:"Help",image:"icon/"+system.getThemes()+"/bHelp.png"});
			this.bGenLocal = new imageButton(this.pTool,{bound:[440,5,17,15],hint:"Open Window",image:"icon/"+system.getThemes()+"/bGenLocal.png",click:[this,"openNewWindow"]});
			//this.bChat = new imageButton(this.pTool,{bound:[460,5,17,15],hint:"Chat",image:"icon/"+system.getThemes()+"/user.png",click:[this,"doChat"]});			
//-------------------------------------caption		
			this.pCaption = new panel(this,{bound:[0,30,this.width,32],color:"#ffffff",border:0});
			this.lblCaption = new label(this.pCaption,{bound:[10,2,this.width - 150,22],caption:this.formCaption,fontColor:system.getConfig("app.headerColor"),bold:true,italics:true, fontSize:14});
////------------------------------------ panel button -------------------------		
			this.pButton = new panel(this,{bound:[0,55,this.width,31],border:1,color:"url(image/whitegradblue.jpg)",shadow:true});
			this.refMenu = new imageButton(this.pButton,{bound:[10,5,17,15],hint:"Refresh",image:"icon/"+system.getThemes()+"/bRefresh.png",click:[this,"getUserMenu"]});						
//------------------------------------ panel transaksi -------------------------
			this.pTrans = new panel(this.pButton,{bound:[2,1,500,26],border:0,color:"url(image/whitegradblue.jpg)"});						
			this.bTutup = new button(this.pButton,{bound:[this.width-90,4,80,18],caption:"Tutup",icon:"url(icon/"+system.getThemes()+"/exit.png)",hint:"Exit Modul",click:[this,"bTutupClick"]});
			this.bTutup.hide();			
			this.bSimpan = new button(this.pTrans,{bound:[5,3,80,18],caption:"<u>S</u>impan",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/save.png)",hint:"Simpan Transaksi",name:"bSimpan"});		
			this.bEdit = new button(this.pTrans,{bound:[90,3,80,18],caption:"<u>E</u>dit",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/edit.png)",name:"bEdit",hint:"Simpan Edit data Transaksi"});			
			this.bHapus = new button(this.pTrans,{bound:[175,3,80,18],caption:"<u>H</u>apus",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/delete.png)",hint:"Hapus data Transaksi",name:"bHapus"});		
			this.bClear = new button(this.pTrans,{bound:[300,3,80,18],caption:"<u>C</u>lear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form",name:"bClear"});
//--------------- panel login -------------------------		
			this.pLogin = new panel(this.pButton,{bound:[2,1,500,26],border:0,color:"url(image/whitegradblue.jpg)",visible:false});
			this.bLogin = new button(this.pLogin,{bound:[10,3,80,18],caption:"Login",click:[this,"loginClick"],icon:"url(icon/"+system.getThemes()+"/login.png)",hint:"Login"});					
//------------------------------------ panel report -------------------------		
			this.pReport = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bPreview = new button(this.pReport,{bound:[10,3,80,18],caption:"Tampil",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/execObj.png)",hint:"Preview Data"});
			this.bClear2 = new button(this.pReport,{bound:[120,3,80,18],caption:"Clear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form"});						
//------------------------------------ panel Editor-------------------------		
			this.pEditor = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bNew = new button(this.pEditor,{bound:[5,3,80,18],caption:"New",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"New Form"});
			this.bSaveEdit = new button(this.pEditor,{bound:[80,3,80,18],caption:"Save",click:[this,"mainButtonClick"],hint:"Save Form",icon:"url(icon/"+system.getThemes()+"/save.png)"});
			this.bOpen = new button(this.pEditor,{bound:[155,3,80,18],caption:"Open",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"Open Form"});		
			this.bRun = new button(this.pEditor,{bound:[239,3,80,18],caption:"Run",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/Execute.png)",hint:"Test Form"});			
//------------------------------------ panel Editor-------------------------		
			this.pQuery = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bExec = new imageButton(this.pQuery,{bound:[10,3,18,18],noImage:true,hint:"Execute",image:"icon/"+system.getThemes(0)+"/execObj.png"});			
//------------------------------------ panel Message-------------------------		
			this.pMsg = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bSend = new button(this.pMsg,{bound:[10,3,80,18],caption:"Send",click:[this,"mainButtonClick"],hint:"Send Message",icon:"url(icon/"+system.getThemes()+"/send.png)"});											
//---------------------------------------------- image
			this.cek=0;
			this.step=0;
			//this.widgets = new panelWidget(this,{bound:[420,95,this.width-430,this.height - 150],border:pbFlat, caption:"Application Widget",color:"#cde5f1",column:2});			
//----------------------------------------------- report Navigator									
			this.reportNavigator = new reportNavigator(this,{bound:[0,55,this.width,31],visible:false,color:"url(image/whitegradblue.jpg)",border:1,shadow:true});			
//----------------------------------------------------------------- tree View-----------------------------------						
			this.treev = new treeView(this,{bound:[10,95,400,this.height - 150],childLength:500,dblClick:[this,"treeClick"]});			
//------------------------------------------------
		   
//------------------------------------------------ status Bar			
			this.sb = new statusBar(this,{bound:[0,this.height - 50,this.width,30],visible:false});
//----------------------------------------------- Marquee		    
			//this.marquee = new marquee(this,{bound:[0,this.height - 50,this.width,50], interval:30,direction:"up"});
		    //    this.marquee.message(["roojax akan merilis jOfficeair","sqlSynch, sinkronisasi database antar server","projectSynch, sinkronisasi file project antar server..."],"Info");		    
			this.childBlock = new panel(this,{bound:[0,87,this.width,this.getHeight() - 87],visible:false});		    
			this.childBlock.addStyle("z-Index:999999");			
			this.load = new image(this.childBlock,{bound:[this.width / 2 - 15,this.height / 2 - 30,31,31],image:"image/gridload.gif"});
			this.label = new label(this.childBlock,{bound:[this.width / 2 - 30,this.height / 2 - 50,80,18],caption:"L o a d i n g . . . . .",color:"#000099"});			
//--------------------------------------------------
			this.childTop = 84;
			this.initiated = true;	
			this.firstInit = true;
			this.setBorderStyle(bsHide);
			//Logo pojok kanan
			if (window.parent && window.parent.app_logo_pojok) 
				this.setImage("url("+window.parent.app_logo_pojok+")");
			else this.setImage("url(image/themes/"+system.getThemes()+"/telkom2.png)");
			
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_eclaim_fMain.extend(window.form);
window.app_eclaim_fMain.implement({
	gotoLogin: function(){
		uses("app_eclaim_fLogin");
		this.form = new app_eclaim_fLogin(this);
		this.form.setTop(this.childTop);
		this.form.show();
		this.form.maximize();
		this.hideMainComp();
	},	
	hideMainComp: function(){
		this.treev.hide();
		//this.slider.hide();
		//this.form.maximize();				
		//this.marquee.stop();
		if (this.timer !== undefined) this.timer.setEnabled(false);
		//this.marquee.hide();						
	},
	initDashboard: function(){		
		uses("saiCBBL;saiEdit;saiGrid;;util_ajaxCaller;sgNavigator;pageControl;app_eclaim_dashboard;fileExplorer;listView;util_file;PopUpMenu;MenuItem;app_eclaim_remote_dataProvider");
		this.dashboard = new app_eclaim_dashboard(this,{bound:[this.treev.width + 20, this.treev.top, this.width - this.treev.width - 30, this.treev.height]});		
	},
	doAfterLogin: function(){
		try{		    
						
			this.sb.setText1(this.app._namaUser, "image/userinfo.png");
			this.sb.setText2(this.app._periode);		
			this.childBlock.show();
			this.form.free();
			this.bTutup.click();
			this.unblock();		
			this.setCaption(this.app._lokasi +" - "+this.app._namalokasi);
			//autoRefresh
						
			//info user
			this.btnList = new image(this,{bound:[this.width - 50,30,25,25],hint:"User Info",showHint:true, color:"",image:"image/info.png"});
			this.lUser = new label(this,{bound:[this.width - 360,37,300,20],caption:"System Info",alignment:alRight,color:"#299bcf",click:[this,"doBtnList"]});
			this.lUser.addStyle("cursor:pointer");
			
			this.timer = new timer(this);
			this.timer.setInterval(1000);		
			this.timer.setEnabled(false);						
			this.timer.onTimer.set(this,"doTimer");
			
			this.indexMarq = -1;		
			this.dataInvestasi = [];									
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);			
			
			this._periode = this.app._periode;
			this.menuStr = "";																					
			this.addOnLib = new util_addOnLib(this.app._dbSetting);
			//this.addOnLib.addListener(this);
			
			this.baris = true;												
			this.app._baris = this.addOnLib.getBaris(this.app._lokasi);							
			this.app._pernext = this.addOnLib.getPerNext(this.app._lokasi);	
			this.cek = 1;			
			uses("portalapp_fListData");
			this.createListData();			
			this.getUserMenu();
			//this.keyMgr = new util_keyManager();			
			//this.keyMgr.addListener(this);
			this.loadLisence();			
			this.childBlock.hide();						
			//Query untuk inbox -- hasilnya di doRequestReady = sender = this.dbLib2 && connection == this.msgBoard.ajax						
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	initParam: function(str){	
		try{		
			if (str.search("<rows>") == -1) this.menuIsLoaded = false; 
			else this.menuIsLoaded = true;		
			this.menuXML = loadXMLDoc(str);		
			this.treev.setXMLData(this.menuXML);						
			this.setActiveControl(this.treev);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	initLoad: function(){
		try{	   	  
			if (!this.menuIsLoaded){
				this.treev.show();
				//this.getUserMenu(this.app._kodeMenu);		
			}
		}catch(e){
			systemAPI.alert("[fMain]::initLoad :"+step+" : "+e,"");
		}
	},
	doModalResult : function(event, modalResult){
		if (event == "close" && modalResult == mrOk){
			this.app.restart();
			this.treev.show();
		}
	},
	bTutupClick: function(sender){	
		try{
			if (this.form instanceof app_eclaim_fLogin && sender == this.bExit){
				return false;
			}			
			if (this.form == undefined){
				system.confirm(this, "close", "Yakin akan logout?","");	
				//this.app.restart();
				//this.treev.show();
				return false;
			}
			if ((sender == this.bTutup)||(sender == this.bExit)){
				window.system.closeAllMDIChild();
				this.form = undefined;
				if (this.timer) this.timer.setEnabled(false);
				if (this.dashboard) this.dashboard.show();		
			}
			this.refMenu.onClick.set(this,"getUserMenu");
			this.activeChildForm = undefined;		
			this.treev.show();
			//this.slider.show();
			this.pReport.hide();
			this.pTrans.hide();
			this.pLogin.hide();
			this.reportNavigator.hide();
			this.pButton.show();
			this.pEditor.hide();
			//this.marquee.run();
			this.pQuery.hide();
			this.pMsg.hide();
			this.sb.show();
			if (this.timer !== undefined) this.timer.setEnabled(false);
			//this.marquee.show();
			this.setFormCaption(window.parent.app_nama);
			this.alertFormLisence = false;
			this.treev.setFocus();
			this.bExit.setHint("Log Off");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setActiveForm: function(child){
		this.activeChildForm = child;
	},
	setFormCaption: function(caption){
		this.formCaption = caption;
		this.lblCaption.setCaption(caption);
	},
	getformCaption: function(){
		return this.formCaption;
	},
	childFormConfig: function(child, formClick, formCaption, formType){
		this.setFormCaption(formCaption);
		this.bTutup.hide();
		this.activeChildForm = child;	
		switch (formType){
			case 0 :
				this.pTrans.show();
				this.bSimpan.onClick.set(child, formClick);
				this.bEdit.onClick.set(child, formClick);
				this.bHapus.onClick.set(child, formClick);
				this.bClear.onClick.set(child, formClick);
				this.bBack.onClick.set(child,formClick);
				this.bCancel.onClick.set(child,formClick);
				break;
			case 1 :
				this.pLogin.show();
				this.bLogin.onClick.set(child, formClick);
				this.bTutup.hide();
				break;
			case 2 : 
				this.pReport.show();
				this.bPreview.onClick.set(child, formClick);
				this.bClear2.onClick.set(child, formClick);
				this.bBack.onClick.set(child,formClick);
				this.bCancel.onClick.set(child,formClick);
				break;
			case 7 : 
				this.pMsg.show();
				this.bSend.onClick.set(child, formClick);			
				break;
			case 8 : 
				this.pQuery.show();
				this.bExec.onClick.set(child, formClick);			
				break;
			case 9 : 
				this.pEditor.show();
				this.bNew.onClick.set(child, formClick);
				this.bRun.onClick.set(child, formClick);
				this.bSaveEdit.onClick.set(child, formClick);
				this.bOpen.onClick.set(child, formClick);
				break;
			default:
			    this.pReport.hide();
    			this.pTrans.hide();
    			this.pLogin.hide();
    			this.reportNavigator.hide();
    			this.pEditor.hide();
    			//this.marquee.run();
    			this.pQuery.hide();
    			this.pMsg.hide();
    			this.refMenu.onClick.set(child, formClick);
				this.bBack.onClick.set(child,formClick);
				this.bCancel.onClick.set(child,formClick);
                break;	
		}
	},
	mainButtonClick: function(sender){
		this._mainButtonClick.call(this, sender);
	},
	treeClick: function(item){
		try{				
			var kodeForm = item.getKodeForm().toUpperCase();			
			if (item.getKodeForm() == '-') return;
			if (this.form != undefined) this.form.free();
			this.form = undefined;
			switch(kodeForm){
				case "U01I" :				
					window.location = ".";
					break;			
				default :
					system.showProgress("load "+kodeForm);
				    if (this.app._klpAkses[item.getKodeForm()] == undefined && !this._openAccess){
						system.alert(this,"Anda tidak ada akses untuk form "+item.getKodeForm()+" ("+item.getCaption()+") ","Hubungi administrator anda");
						system.hideProgress("load "+kodeForm);
						return false;
					}					
					uses("server_util_Map");
					fields = new server_util_Map();	
					values = new server_util_Map();	
					fields.set(0, "kode_form");		    			
					values.set(0, item.getKodeForm());
					var temp = this.dbLib.locateData("m_form",fields, values, "form");        	
					this.alertFormLisence = false;
					if (temp != undefined && temp != "" )
					{				    						
						//this.checkLockTrans();												
						//if (this.app._mainFormLock) { this.childBlock.hide();throw("Lokasi sedang di-<i><font color='#ff0000'>lock</font></i>. Transaksi tidak dapat dilanjutkan");return false;}
						if (!this.isValidLisence(temp)){							
							this.alertFormLisence = false;
							//systemAPI.alert("Form ini belum ada lisensinya. Hubungi admin@roojax.com");
						}
						this.childBlock.show();
						uses(temp,this.alwaysLoad);
						this.activeFormClass = temp;
						this.app._namaForm=item.caption;
						var script = "this.form = new "+temp+"(this);"+
									"this.form.setTop(this.childTop); "+
									"this.form.setTabChildIndex(),this.form.show();    	";
						eval(script);			
						this.setFormCaption(item.caption);
					}else alert(temp);
					break;
			}
			if (this.form != undefined){		
				this.hideMainComp();
				this.dbLib.addUserFormAccess(this.app._userLog, temp, this.app._kodeLokfa, this.app._userSession);
				this.sb.hide();
				this.dashboard.hide();		
			}
			this.childBlock.hide();
			system.hideProgress();
			this.setActiveControl(undefined);
			this.bExit.setHint("Exit");
		}catch(e){
			systemAPI.alert("[fMain]::treeClick : " + e,"Error Class ::"+temp);
			this.childBlock.hide();
			system.hideProgress();
		}
	},
	loadMenu: function(dataMenu, str){
		try{					
			this.block();
			this.app._mainForm.showProgress();
			if (str)
				var menu = dataMenu;//this.strToArray(dataMenu);
			else 
				var menu = dataMenu;//this.strToArray(this.menuStr);
			var rowNo = 0;
			
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();
				
			var kode = undefined;
			var nama = undefined;
			var kodeForm = undefined;
			var level = undefined;
			
			var node = undefined;					
			var len = menu.length;
			for (var r = 0;r < len;r++){
				if (str){
					itemValues = menu.get(r);			
					kode = itemValues.get(0);
					nama = itemValues.get(3);
					kodeForm = itemValues.get(1);
					level = itemValues.get(4);
				}else{
					itemValues = menu[r];			
					kode = itemValues.kode_menu;							
					nama = itemValues.nama;
					kodeForm = itemValues.kode_form;
					level = itemValues.level_menu;
				}
				level++;
				if (node === undefined)
					node = new treeNode(this.treev);										
				else if (node.getLevel() == level - 1)
					node = new treeNode(node);					
				else if ((node.getLevel() == level))
					node = new treeNode(node.owner);															
				else if (node.getLevel() > level){	
					node = node.owner;
					while (node.getLevel() > level)
					    if (node.owner instanceof treeNode)
							node = node.owner;						
					node = new treeNode(node.owner);					
				}		
				node.setKodeForm(kodeForm);
				node.setKode(kode);
				node.setCaption(nama);
			}
			this.app._mainForm.hideProgress();			
			this.unblock();
		}catch(e){
			this.unblock();
			this.childBlock.hide();
			systemAPI.alert("[fMain]::loadMenu : " + itemValues +" ",e);
		}
	},
	doAfterResize: function(width, height){
		this.setWidth(width);
		this.setHeight(height);
		this.setBtnPos(width - 200);		
		if (this.initiated){
			try{
				if (this.treev != undefined)
					this.treev.setHeight(height - 150);
				if (this.background != undefined){
					this.background.setWidth(width - 20);
					this.background.setHeight(height - 125);
				}			
				//this.slider.setHeight(height - 150);
				//this.slider.setWidth(width - 430);
				this.childBlock.setWidth(this.getWidth());
				this.childBlock.setHeight(this.getHeight() - 87);
				this.pCaption.setWidth(width);
				this.pButton.setWidth(width);
				this.reportNavigator.setWidth(width);
				this.bTutup.setLeft(width-90);
				this.pTool.setWidth(width);
				this.lblCaption.setWidth(this.getWidth());
				if (this.btnList !== undefined){
					this.btnList.setLeft(this.getWidth() - 50);	  	  	  					
				}
				
				this.sb.setWidth(this.width);
				this.sb.setTop(this.getHeight() - 50 );
				
				//this.marquee.setWidth(this.getWidth());
				//this.marquee.setTop(this.getHeight()- 50);
				
				/*this.infoPerusahaan.setWidth(width - this.treev.width - 40);
				this.infoPerusahaan.setHeight(this.treev.height - 70);
				this.infoUnit.setWidth(width - this.treev.width - 40);		
				* */
				var appChild = this.childs;	
				var res = undefined;
				for (var i in appChild.objList){
					res = window.system.getResource(appChild.objList[i]);		
					if (res instanceof childForm)					
						res.maximize();					
				}
			}catch(e){
				systemAPI.alert("Resize :" + e,"");
			}
		}
	},
	getUserMenu: function(kodeMenu){  		   
	   this.dbLib.getDataXMLA("select * from menu where kode_klp = '"+this.app._kodeMenu+"' order by kode_klp, rowindex", undefined, this);			
	},
	doRequestReady: function(sender, methodName, result, errCode, connection){
		try{			
			if (sender == this.dbLib && errCode == this){				
				switch (methodName){
					case "listData" : 
					    if (result != undefined){
							this.menuStr = result;												
						}
						break;					
					case "getDataProvider" :											
						/*eval('result = ' +result+';');											
						if (this.cek == 1){
							var i1=0;
							for (var i in result.rs.rows){
								if (i < 10)
									this.slider.addItem("server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].gambar,result.rs.rows[i].judul,result.rs.rows[i].keterangan,result.rs.rows[i].no_file_dok);						
							}											
						}else{						
							//this.loadMenu(result.rs.rows);		
							this.childBlock.hide();
						}*/
					break;
					case "getDataXML" :						
						this.treev.clear();  
						this.menuXML = loadXMLDoc(result);		
						this.treev.setXMLData(this.menuXML);						
						this.childBlock.hide();
						this.treev.setFocus();	
						if (this.firstInit) this.initDashboard();						
						this.firstInit = false;					
					break;
					case "getMultiDataProvider":
						//this.dataWidget = JSON.parse(result);
						//if (this.countWidget == 3) this.doTimerWidget();
					break;
				}
			}			
			if (sender == this.keyMgr){
				if (methodName == "getContent"){
                    try{			
					   eval("this.formLisence  = "+result);							
                    }catch(e){
                        this.formLisence  = [];
                    }
				}
			}
			
		}catch(e){
			this.childBlock.hide();
			systemAPI.alert(e,result);
		}
	},
	initScreen: function(){
		try{			
			this.dbLib.getDataXMLA("select * from menu where kode_klp = '"+this.app._kodeMenu+"'  or kode_klp = 'ALLMENU' order by kode_klp, rowindex", undefined, this);	            
		}catch(e){
			alert(e);
		}
	},
	initReport: function(form, report, doSelectedPage, doBtnClick, doRowPerPageChange, hideNavigator, items){
		this.reportNavigator.setReport(report);		
		this.reportNavigator.onPager.set(form, doSelectedPage);
		this.reportNavigator.onCloseClick.set(form, doBtnClick);
		this.reportNavigator.onAllClick.set(form, doBtnClick);
		this.reportNavigator.onPdfClick.set(form, doBtnClick);
		this.reportNavigator.onXlsClick.set(form, doBtnClick);
		this.reportNavigator.onTransClick.set(form, doBtnClick);
		this.reportNavigator.onFindClick.set(form, doBtnClick);
		this.reportNavigator.onPrintClick.set(form, doBtnClick);
		//this.reportNavigator.onPreviewClick.set(form, doBtnClick);
		this.reportNavigator.onGraphClick.set(form, doBtnClick);
		this.reportNavigator.onSendClick.set(form, doBtnClick);
		this.reportNavigator.onRowPPClick.set(form, doRowPerPageChange);
		this.reportNavigator.setFields(items);	
		this.reportNavigator.cb.show();
	},
	pesan: function(type, message){ 
		this.sb.message(type, message);
	},
	doActivate: function(){
	},
	doClose: function(sender){		
		window.close();
		if (window.parent) window.parent.frameLoader.style.zIndex = 0;
		this.app.restart();
	},
	showProgress: function(sender){	
		system.showProgress();
	},
	hideProgress: function(sender){	
		system.hideProgress();
	},
	doSave: function(sender){
		if (this.pTrans.visible && this.bSimpan.visible && this.bSimpan.enable) this.bSimpan.click();
		else if (this.pTrans.visible && this.bEdit.visible && this.bEdit.enable) this.bEdit.click();
	},
	createSession: function(sender){		
		this.app.restart();
	},
	doMenuKeyDown: function(sender, keyCode){	
		if (keyCode == 13){		
			this.doExecuteMenu();
		}
	},
	doExecuteMenu: function(sender){
		if (this.app == undefined) this.app = this.getApplication();
		if (this.app._klpAkses[this.cb1.getText()] == undefined && !this._openAccess){
			system.alert(this,"Anda tidak ada akses untuk form "+this.cb1.getText()+" ","Hubungi administrator anda");
			system.hideProgress("load "+kodeForm);
			return false;
		}
					
		if (this.form != undefined) this.form.free();
		this.form = undefined;
		uses("server_util_arrayMap");
		fields = new server_util_Map();	
		fields.set(0, "kode_form");	
		values = new server_util_Map();	
		values.set(0, this.cb1.getText());
		this.alertFormLisence = false;
		var temp = this.dbLib.locateData("m_form",fields, values, "form");        
		if (temp != undefined && temp != "")
		{
			//this.checkLockTrans();
			if (this.app._mainFormLock) return false;
			if (this.isValidLisence(temp)) {
				this.alertFormLisence = false;				
				//systemAPI.alert("Form ini belum ada lisensinya. Hubungi admin@roojax.com");
			}
			uses(temp,this.alwaysLoad);
			var script = "this.form = new "+temp+"(this);"+
							"this.form.setTop(this.childTop); "+
							"this.form.show();    	";
			eval(script);			
			this.dashboard.hide();		
		}
		if (this.form != undefined)
		{
			this.treev.hide();
			this.sb.hide();
			//this.slider.hide();
			this.form.maximize();
			//this.marquee.stop();
			//this.marquee.hide();
		
		} 
		var count = this.cb1.capacity(); 
		if (count == 50)  
			this.cb1.delItem((count - 1));		
		this.cb1.addItem(count, this.cb1.getText());
		this.bExit.setHint("Exit");
	},
	doBtnList: function(sender){		
		//this.dashboard.setVisible(!this.dashboard.visible);
		//if (this.msgBoard.visible) this.msgBoard.bringToFront();		
	},
	doTimer: function(sender){
		try{
			if (this.app == undefined) this.app = this.getApplication();
			if (sender == this.timer){				
//------------------------------------------------------------------- locking transaction		
				//this.checkLockTrans();
				if (this.form != undefined) this.btnList.setVisible(!this.btnList.visible);
			}
			if (sender == this.timerAlert){
				if (this.alertLisence){
					this.pesan(0,"Aplikasi ini belum ada Lisensinya. Hubungi admin@roojax.com");
				}
				if (this.alertFormLisence){
					this.pesan(0,"Form ini belum ada Lisensinya. Hubungi admin@roojax.com");
				}
			}	
		}catch(e){
			alert("Error: "+e+" ");
		}
	},
	gotoFrontEnd: function(sender){	
		system.openFrontEnd();
	},
	checkLockTrans: function(sender){	
		var dtLock = this.dbLib.loadQuery("select status from locktrans where kode_lokasi = '"+this.app._lokasi+"' ");
		this.app._mainFormLock = true;
		if (dtLock != undefined && dtLock.toLowerCase().search("error") == -1 && dtLock != "")
		
		{
			dtLock = dtLock.split("\r\n");			
			dtLock = dtLock[1];			
			this.app._mainFormLock = dtLock == '1';		
			if (this.app._mainFormLock)
				system.alert(this,"Transaksi telah dikunci. Login tidak dapat dilakukan.","Hubungi administrator anda!");
		}	
		return this.app._mainFormLock;	
	},
	doFindText: function(sender){		
	},
	doChat: function(sender){
		try{		
			this.fChat.show();
		}catch(e){
			systemAPI.alert(e,"");
		}
	},
	createListData: function(){
		try{					
			this.listDataForm = new portalapp_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	loadLisence: function(){
		usesHttp.open("GET", "server/conf/myapp.conf", false);
		usesHttp.send("");
		if (usesHttp.status == 200)
		{            
			var data = usesHttp.responseText;						
			var row = "";						
			var lines = data.split("\n");			
			var configPair = "";			
			for (var i=0; i < lines.length;i++)
			{
				row = lines[i];
				if ((row.charAt(0) != "#") && (row.indexOf("=") > 0)){
				    configPair = row.split("=");				    
				    if (configPair[0] == "lisence"){ 
					this.appKey = configPair[1];
					break;
				    }
				}
			}			
			if (this.appKey !== undefined){
				//this.appKey = this.appKey.replace(/-/gi,"");				
				//this.keyMgr.setKey(this.appKey);
				//this.keyMgr.getContentA();
				this.alertLisence = false;
			}else this.alertLisence = true;
		}		
	},
	isValidLisence: function(form){
		var result = false;
		for (var i in this.formLisence){
			if (this.formLisence[i] == form){
				result = true;
				break;
			}
		}
		return result;
	},
	doRecall: function(sender){	    
        if (this.form !== undefined){
           uses(this.form.className,true);
            var form = this.form;
            var script = "this.form = new "+this.form.className+"(this);"+
							"this.form.setTop(this.childTop); "+
							"this.form.maximize();"+
							"this.form.show();    	";
			eval(script);		
            form.free();
            form = undefined;
            this.dashboard.hide();		
        }       
    },
	loadWidgets: function(){
		try{
			//query ke sys_widget.
			uses("widget;flashChart");
			this.timerWidget = new timer(this);
			this.timerWidget.setInterval(1000);		
			this.timerWidget.onTimer.set(this,"doTimerWidget");
			this.timerWidget.setEnabled(false);
			var periode = this.app._periode;			
			var w1 = new widget(this.widgets,{bound:[10,20,300,200],caption:"Data Belum terposting"});			
			var w2 = new widget(this.widgets,{bound:[10,20,300,200],caption:"Neraca"});
			var w3 = new widget(this.widgets,{bound:[10,20,300,200],caption:"Labarugi"});
			var w4 = new widget(this.widgets,{bound:[10,20,300,200],caption:"Cash Flow"});		
			this.widgets.rearrangeWidgets();
			this.countWidget = 0;
			w1.grid = new saiGrid(w1,{bound:[1,20,w1.width - 2,w1.height - 30],colCount:3,colTitle:["Modul","No Bukti","Keterangan"],
				colWidth:[[2,1,0],[180,100,80]], readOnly:true, colAlign:[[0,1],[alCenter, alCenter]]});
			w2.chart = new flashChart(w2,{bound:[1,20,w2.width - 2, w2.height - 30],objectReady:[this,"doObjectReady"]});
			w3.chart = new flashChart(w3,{bound:[1,20,w3.width - 2, w3.height - 30],objectReady:[this,"doObjectReady"]});
			w4.chart = new flashChart(w4,{bound:[1,20,w4.width - 2, w4.height - 30],objectReady:[this,"doObjectReady"]});
		}catch(e){
			alert(e);
		}
	},
	doObjectReady: function(sender){
		this.countWidget++;
		if (this.countWidget == 3) this.timerWidget.setEnabled(false);
	},
	doTimerWidget: function(sender){
		this.updateWidget();
		this.timerWidget.setEnabled(false);
	},
	updateWidget: function(){
		if (this.dataWidget !== undefined){
			var child, line;
			for (var i in this.widgets.childsIndex){
				child = $$(this.widgets.childsIndex[i]);
				if (child !== undefined){
					child.data = this.dataWidget.result[i];					
					if (child.grid){						
						child.grid.clear();
						for (var d in child.data.rs.rows){
							line = child.data.rs.rows[d];
							child.grid.appendData([line.modul.toUpperCase(), line.no_bukti, line.keterangan]);
						}
					}else{
						var chart = {
						  "bg_colour":"#edf5f8",
						  "y_legend":{
							"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
						  },
						  "elements":[],
						  "x_axis":{
							"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[child.caption]}
						   },
						  "y_axis":{
							"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
						  },
						  "tooltip":{
							"text": "Global Tooltip<br>val=#val#, top=#top#"
						  }
						};                
						if (child.data.rs.rows[0]!== undefined){
							var line,temp="", maxValue = -999999999,minValue = 999999999;
							for (var i in child.data.rs.rows){
								line = child.data.rs.rows[i];
								var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
								color = (r+256 * g + 65536 * b).toString(16);
								temp = {
								  "type":"bar_glass","alpha":     0.5,"colour":    "#"+ color,
								  "tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								  "text--":      line.nama,
								  "font-size--": 10,
								  "values" :   [Math.round(line.n1)],
								  "on-show":	{"type": "grow-up", "delay":0.5, "cascade":0.6}
								};
								if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
								if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
								chart.elements.push(temp);
							}					
						}    			
						chart.y_axis.max = maxValue + 100;		
						child.chart.getObject().load( JSON.stringify(chart) ); 
					}
				}
			}
		}
	},
	openNewWindow: function(sender){
		window.open("index.php?app="+this.app.className);
	}
});
