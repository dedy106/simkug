//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_kopeg_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_kopeg_fMain.prototype.parent.constructor.call(this, owner);
			window.app_kopeg_fMain.prototype.parent.setWidth.call(this, 600);
			window.app_kopeg_fMain.prototype.parent.setHeight.call(this, 450);
			this._mainButtonClick = new portalui_eventHandler();
			this.title = "SAKU Form";
			document.title = "jamboo Saku";
			this._isLogedIn	= false;
			this.app._kodeMenu = "SAKUMENU";
			this._userLog = "";
			this._lokasi = "";
			this._pp = "";
			this.alwaysLoad = true;
			this._openAccess = true;
			this.activeChildForm = undefined;
			this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();				
			uses("portalui_saiCB;portalui_slider;portalui_image;portalui_imageButton;portalui_button;portalui_timer;portalui_label;portalui_saiLabelEdit;portalui_saiCBBL;portalui_panel;portalui_reportNavigator;portalui_treeView;portalui_treeNode;portalui_statusBar;portalui_marquee;util_addOnLib;util_standar;portalui_imageButton");
			this.className  = "fMain";
			
			this.formCaption = system.getConfig("app.caption")+" "+this.app._userLog;	
			this.setCaption(this.formCaption);
			this.setTop(60);						
			this.maximize();										
			this.pTool = new portalui_panel(this,{bound:[0,0,this.width,30],color:system.getConfig("app.color.panel"),shadow:true});							
			this.bRun = new portalui_imageButton(this.pTool,{bound:[5,5,17,15],hint:"Execute",image:"icon/"+system.getThemes()+"/ok.png",click:[this,"doExecuteMenu"]});									
			this.cb1 = new portalui_saiCB(this.pTool,{bound:[28,3,200,20],labelWidth:0,text:"",mustCheck:false,keyDown:[this,"doMenuKeyDown"]});					
			this.bSave = new portalui_imageButton(this.pTool,{bound:[235,5,17,15],hint:"Save",click:[this,"doSave"],image:"icon/"+system.getThemes()+"/bSave2.png"});									
			this.separator1 = new portalui_image(this.pTool,{bound:[260,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});						
			this.bBack = new portalui_imageButton(this.pTool,{bound:[265,5,17,15],hint:"Back",image:"icon/"+system.getThemes()+"/bBack.png"});			
			this.bExit = new portalui_imageButton(this.pTool,{bound:[285,5,17,15],hint:"Exit",click:[this,"bTutupClick"],image:"icon/"+system.getThemes()+"/bExit.png"});			
			this.bCancel = new portalui_imageButton(this.pTool,{bound:[305,5,17,15],hint:"Cancel",click:[this,"bTutupClick"],image:"icon/"+system.getThemes()+"/bCancel2.png"});
			this.separator2 = new portalui_image(this.pTool,{bound:[325,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bFind = new portalui_imageButton(this.pTool,{bound:[330,5,17,15],hint:"Search",image:"icon/"+system.getThemes()+"/bFind.png",click:[this,"alert('under contruction','')"]});			
			this.separator3 = new portalui_image(this.pTool,{bound:[347,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bNew = new portalui_imageButton(this.pTool,{bound:[350,5,17,15],hint:"Restart Session",image:"icon/"+system.getThemes()+"/bCreateSession.png",click:[this,"createSession"]});			
			this.bClose = new portalui_imageButton(this.pTool,{bound:[369,5,17,15],hint:"End Session",image:"icon/"+system.getThemes()+"/bEndSession.png",click:[this,"doClose"]});			
			this.separator3 = new portalui_image(this.pTool,{bound:[389,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bHelp = new portalui_imageButton(this.pTool,{bound:[394,5,17,15],hint:"Help",image:"icon/"+system.getThemes()+"/bHelp.png"});
			this.bGenLocal = new portalui_imageButton(this.pTool,{bound:[413,5,17,15],hint:"Open Window",image:"icon/"+system.getThemes()+"/bGenLocal.png",click:[this,"openNewWindow"]});
			this.bChat = new portalui_imageButton(this.pTool,{bound:[432,5,17,15],hint:"Chat",image:"icon/"+system.getThemes()+"/user.png",click:[this,"doChat"]});			
//-------------------------------------caption		
			this.pCaption = new portalui_panel(this,{bound:[0,30,this.width,32],color:"#ffffff",border:0});
			this.lblCaption = new portalui_label(this.pCaption,{bound:[10,0,500,22],caption:this.formCaption,fontColor:system.getConfig("app.headerColor"),bold:true,fontSize:13});						
////------------------------------------ panel button -------------------------		
			this.pButton = new portalui_panel(this,{bound:[0,55,this.width,31],border:1,color:system.getConfig("app.color.panel"),shadow:true});
			this.refMenu = new portalui_imageButton(this.pButton,{bound:[10,5,17,15],hint:"Refresh Menu",image:"icon/"+system.getThemes()+"/bRefresh.png",click:[this,"getUserMenu"]});						
//------------------------------------ panel transaksi -------------------------
			this.pTrans = new portalui_panel(this.pButton,{bound:[2,1,350,26],border:0,color:system.getConfig("app.color.panel")});						
			this.bTutup = new portalui_button(this.pButton,{bound:[this.width-90,4,80,18],caption:"Tutup",icon:"url(icon/"+system.getThemes()+"/exit.png)",hint:"Exit Modul",click:[this,"bTutupClick"]});
			this.bTutup.hide();			
			this.bSimpan = new portalui_button(this.pTrans,{bound:[5,3,80,18],caption:"<u>S</u>impan",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/save.png)",hint:"Simpan Transaksi",name:"bSimpan"});		
			this.bEdit = new portalui_button(this.pTrans,{bound:[79,3,80,18],caption:"<u>E</u>dit",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/edit.png)",name:"bEdit",hint:"Simpan Edit data Transaksi"});			
			this.bHapus = new portalui_button(this.pTrans,{bound:[153,3,80,18],caption:"<u>H</u>apus",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/delete.png)",hint:"Hapus data Transaksi",name:"bHapus"});		
			this.bClear = new portalui_button(this.pTrans,{bound:[250,3,80,18],caption:"<u>C</u>lear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form",name:"bClear"});
//--------------- panel login -------------------------		
			this.pLogin = new portalui_panel(this.pButton,{bound:[2,1,350,26],border:0,color:system.getConfig("app.color.panel"),visible:false});
			this.bLogin = new portalui_button(this.pLogin,{bound:[10,3,80,18],caption:"Login",click:[this,"loginClick"],icon:"url(icon/"+system.getThemes()+"/login.png)",hint:"Login"});					
//------------------------------------ panel report -------------------------		
			this.pReport = new portalui_panel(this.pButton,{bound:[2,1,350,26],visible:false,border:0,color:system.getConfig("app.color.panel")});
			this.bPreview = new portalui_button(this.pReport,{bound:[10,3,80,18],caption:"Tampil",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/execObj.png)",hint:"Preview Data"});
			this.bClear2 = new portalui_button(this.pReport,{bound:[120,3,80,18],caption:"Clear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form"});						
//------------------------------------ panel Editor-------------------------		
			this.pEditor = new portalui_panel(this.pButton,{bound:[2,1,350,26],visible:false,border:0,color:system.getConfig("app.color.panel")});
			this.bNew = new portalui_button(this.pEditor,{bound:[5,3,80,18],caption:"New",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"New Form"});
			this.bSave = new portalui_button(this.pEditor,{bound:[80,3,80,18],caption:"Save",click:[this,"mainButtonClick"],hint:"Save Form",icon:"url(icon/"+system.getThemes()+"/save.png)"});
			this.bOpen = new portalui_button(this.pEditor,{bound:[155,3,80,18],caption:"Open",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"Open Form"});		
			this.bRun = new portalui_button(this.pEditor,{bound:[239,3,80,18],caption:"Run",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/Execute.png)",hint:"Test Form"});			
//------------------------------------ panel Editor-------------------------		
			this.pQuery = new portalui_panel(this.pButton,{bound:[2,1,350,26],visible:false,border:0,color:system.getConfig("app.color.panel")});
			this.bExec = new portalui_imageButton(this.pQuery,{bound:[10,3,18,18],noImage:true,hint:"Execute",image:"icon/"+system.getThemes(0)+"/execObj.png"});			
//------------------------------------ panel Message-------------------------		
			this.pMsg = new portalui_panel(this.pButton,{bound:[2,1,350,26],visible:false,border:0,color:system.getConfig("app.color.panel")});
			this.bSend = new portalui_button(this.pMsg,{bound:[10,3,80,18],caption:"Send",click:[this,"mainButtonClick"],hint:"Send Message",icon:"url(icon/"+system.getThemes()+"/send.png)"});											
//---------------------------------------------- image
			this.cek=0;
			this.step=0;
			this.slider = new portalui_slider(this,{bound:[420,95,this.width-430,this.height - 150]});			
//----------------------------------------------- report Navigator									
			this.reportNavigator = new portalui_reportNavigator(this,{bound:[0,55,this.width,31],visible:false,color:system.getConfig("app.color.panel"),border:1,shadow:true});			
//----------------------------------------------------------------- tree View-----------------------------------						
			this.treev = new portalui_treeView(this,{bound:[10,95,400,this.height - 150],childLength:500,dblClick:[this,"treeClick"]});			
//------------------------------------------------
		   this.maximize();		   		  
//------------------------------------------------ status Bar			
			this.sb = new portalui_statusBar(this,{bound:[0,this.height - 50,this.width / 2,50],visible:false});			
//----------------------------------------------- Marquee		    
			this.marquee = new portalui_marquee(this,{bound:[0,this.height - 50,this.width,50], interval:30,direction:"up"});
		    this.marquee.message(["rooJax akan segera merilis SMS Center"],"Info");		    
			this.childBlock = new portalui_panel(this,{bound:[0,87,this.width,this.getHeight() - 87],visible:false});		    
			this.childBlock.addStyle("z-Index:999999");			
			this.load = new portalui_image(this.childBlock,{bound:[this.width / 2 - 15,this.height / 2 - 30,31,31],image:"image/gridload.gif"});
			this.label = new portalui_label(this.childBlock,{bound:[this.width / 2 - 30,this.height / 2 - 50,80,18],caption:"L o a d i n g . . . . .",color:"#000099"});			
//--------------------------------------------------
			this.childTop = 84;
			this.initiated = true;
			this.setImage("url(image/themes/dynpro/logo.png)");
			this.setBorderStyle(bsHide);				
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_kopeg_fMain.extend(window.portalui_form);
window.app_kopeg_fMain.implement({
	gotoLogin: function(){
		uses("app_kopeg_fLogin");
		this.form = new app_kopeg_fLogin(this);
		this.form.setTop(this.childTop);
		this.form.show();
		this.form.maximize();
		this.hideMainComp();
	},	
	hideMainComp: function(){
		this.treev.hide();
		this.slider.hide();
		this.form.maximize();				
		this.marquee.stop();
		if (this.timer !== undefined) this.timer.setEnabled(false);
		this.marquee.hide();						
	},
	doAfterLogin: function(){
		try{		    
			this.childBlock.show();
			this.form.free();
			this.bTutup.click();
			this.unblock();		
			this.setCaption(this.app._lokasi +" - "+this.app._namalokasi);
			this.btnList = new portalui_image(this);   					
			this.btnList.setBound(this.width - 50,30,20,20);	  
			this.btnList.setHint("User Info");
			this.btnList.setShowHint(true);		   
			this.btnList.setColor("");	   
			this.btnList.setImage("icon/"+system.getThemes()+"/dropdownlist.png");
			this.btnList.show();	
			this.btnList.onClick.set(this,"doBtnList");

			this.listInfo = new portalui_panel(this);
			this.listInfo.setBound(this.getWidth() - 235,55,200,190);		   
			this.listInfo.setColor("url(icon/"+system.getThemes()+"/background.png)");
			this.listInfo.hide();
				
				this.lUser = new portalui_label(this.listInfo);
				this.lUser.setBound(10,5,80,18);
				this.lUser.fnt.setColor("#0000ff");
				this.lUser.setCaption("User Login");
				this.lUser.setUnderLine(true);
				
				this.lUser1 = new portalui_label(this.listInfo);
				this.lUser1.setBound(90,5,80,18);				
				this.lUser1.fnt.setColor("#0000ff");				
				this.lUser1.setCaption(this.app._userLog);
				
				this.lPrd = new portalui_label(this.listInfo);
				this.lPrd.setBound(10,25,80,18);				
				this.lPrd.fnt.setColor("#0000ff");
				this.lPrd.setCaption("Periode");
				this.lPrd.setUnderLine(true);
				
				this.lPrd1 = new portalui_label(this.listInfo);
				this.lPrd1.setBound(90,25,80,18);
				this.lPrd1.fnt.setColor("#0000ff");			
				this.lPrd1.setCaption(this.app._periode);
				
				this.lTime = new portalui_label(this.listInfo);
				this.lTime.setBound(10,45,80,18);				
				this.lTime.fnt.setColor("#0000ff");
				this.lTime.setCaption("Login Time");
				this.lTime.setUnderLine(true);
				
				this.app._loginTime = new Date();
				this.lTime1 = new portalui_label(this.listInfo);
				this.lTime1.setBound(90,45,120,18);				
				this.lTime1.fnt.setColor("#0000ff");				
				this.lTime1.setCaption(dayName[this.app._loginTime.getDay()] +" "+this.app._loginTime.getDate()+"/"+this.app._loginTime.getBln()+"/"+this.app._loginTime.getFullYear()+" "+this.app._loginTime.getHours()+":"+this.app._loginTime.getMinutes());			
				
				this.lLok = new portalui_label(this.listInfo);
				this.lLok.setBound(10,65,80,18);			
				this.lLok.fnt.setColor("#0000ff");
				this.lLok.setCaption("User Location");
				this.lLok.setUnderLine(true);
				
				this.lLok1 = new portalui_label(this.listInfo);
				this.lLok1.setBound(90,65,80,18);			
				this.lLok1.fnt.setColor("#0000ff");
				this.lLok1.setCaption(this.app._lokasi);			
				
				this.lPP = new portalui_label(this.listInfo);
				this.lPP.setBound(10,85,80,18);			
				this.lPP.fnt.setColor("#0000ff");
				this.lPP.setCaption("User Office");
				this.lPP.setUnderLine(true);
				
				this.lPP1 = new portalui_label(this.listInfo);
				this.lPP1.setBound(90,85,120,18);			
				this.lPP1.fnt.setColor("#0000ff");
				this.lPP1.setCaption(this.app._pp);			
				
				this.ldb = new portalui_label(this.listInfo);
				this.ldb.setBound(10,105,80,18);			
				this.ldb.fnt.setColor("#0000ff");
				this.ldb.setCaption("Database");
				this.ldb.setUnderLine(true);
				
				this.ldb1 = new portalui_label(this.listInfo);
				this.ldb1.setBound(90,105,120,18);			
				this.ldb1.fnt.setColor("#0000ff");
				this.ldb1.setCaption(this.app._dbname);			
				
				this.ldb = new portalui_label(this.listInfo);
				this.ldb.setBound(10,125,80,18);			
				this.ldb.fnt.setColor("#0000ff");
				this.ldb.setCaption("Host");
				this.ldb.setUnderLine(true);
				
				this.ldb2 = new portalui_label(this.listInfo);
				this.ldb2.setBound(90,125,120,18);			
				this.ldb2.fnt.setColor("#0000ff");
				this.ldb2.setCaption(this.app._dbhost);			
				
				this.ldb = new portalui_label(this.listInfo);
				this.ldb.setBound(10,145,80,18);			
				this.ldb.fnt.setColor("#0000ff");
				this.ldb.setCaption("My Computer");
				this.ldb.setUnderLine(true);
				
				this.ldb2 = new portalui_label(this.listInfo);
				this.ldb2.setBound(90,145,120,18);			
				this.ldb2.fnt.setColor("#0000ff");
				this.ldb2.setCaption(this.app._hostname);			
				
				this.ldb = new portalui_label(this.listInfo);
				this.ldb.setBound(10,165,80,18);			
				this.ldb.fnt.setColor("#0000ff");
				this.ldb.setCaption("Session");
				this.ldb.setUnderLine(true);
				
				this.ldb2 = new portalui_label(this.listInfo);
				this.ldb2.setBound(90,165,120,18);			
				this.ldb2.fnt.setColor("#0000ff");
				this.ldb2.setCaption(this.app._userSession);						
			this.timer = new portalui_timer(this);
			this.timer.setInterval(60000);		
			this.timer.onTimer.set(this,"doTimer");			
			this.indexMarq = -1;		
			this.dataInvestasi = [];			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this._periode = this.app._periode;
			this.menuStr = "";																					
			this.addOnLib = new util_addOnLib();			
			this.addOnLib.addListener(this);
			this.baris = true;												
			this.app._baris = this.addOnLib.getBaris(this.app._lokasi);							
			this.app._pernext = this.addOnLib.getPerNext(this.app._lokasi);	
			this.cek = 1;			
			this.createListData();			
			this.initScreen();
			this.childBlock.hide();
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
	bTutupClick: function(sender){	
		try{
			if ((sender == this.bTutup)||(sender == this.bExit || sender == this.bCancel))
				window.system.closeAllMDIChild();
			this.activeChildForm = undefined;		
			this.treev.show();
			this.slider.show();
			this.pReport.hide();
			this.pTrans.hide();
			this.pLogin.hide();
			this.reportNavigator.hide();
			this.pButton.show();
			this.pEditor.hide();
			this.marquee.run();
			this.pQuery.hide();
			this.pMsg.hide();
			this.sb.hide();
			//if (this.timer !== undefined) this.timer.setEnabled(true);
			this.marquee.show();
			this.setFormCaption("SAI easy menu access");
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
				//this.bCancel.onClick.set(child,formClick);
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
				this.bSave.onClick.set(child, formClick);
				this.bOpen.onClick.set(child, formClick);
				break;
				
		}
	},
	mainButtonClick: function(sender){
		this._mainButtonClick.call(this, sender);
	},
	treeClick: function(item){
		try{	
			if (this.form != undefined) this.form.free();
			this.form = undefined;
			var kodeForm = item.getKodeForm().toUpperCase();			
			if (item.getKodeForm() == '-') return;
			switch(kodeForm){
				case "U01I" :				
					window.location = ".";
					break;			
				default :
					system.showProgress("load "+kodeForm);
				    if (this.app._klpAkses[item.getKodeForm()] == undefined && !this._openAccess){
						system.alert(this,"Anda tidak ada akses untuk form "+item.getKodeForm()+" ("+item.getCaption()+") ","Hubungi administrator anda");
						return false;
					}					
					uses("server_util_arrayMap");
	    			fields = new server_util_Map();	
					values = new server_util_Map();	
	    			fields.set(0, "kode_form");		    			
	    			values.set(0, item.getKodeForm());
					var temp = this.dbLib.locateData("m_form",fields, values, "form");        									
				    if (temp != undefined && temp != "" )
				    {				    						
						this.checkLockTrans();												
						if (this.app._mainFormLock) { this.childBlock.hide();throw("Lokasi sedang di-<i><font color='#ff0000'>lock</font></i>. Transaksi tidak dapat dilanjutkan");return false;}
						this.childBlock.show();
						uses(temp,this.alwaysLoad);
						var script = "this.form = new "+temp+"(this);"+
									"this.form.setTop(this.childTop); "+
									"this.form.show();    	";
						eval(script);									
					}else alert(temp);
					break;
			}
			if (this.form != undefined){		
				this.hideMainComp();
				this.dbLib.addUserFormAccess(this.app._userLog, temp, this.app._lokasi, this.app._userSession);
			}
			this.childBlock.hide();
			system.hideProgress();
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
					node = new portalui_treeNode(this.treev);										
				else if (node.getLevel() == level - 1)
					node = new portalui_treeNode(node);					
				else if ((node.getLevel() == level))
					node = new portalui_treeNode(node.owner);															
				else if (node.getLevel() > level){	
					node = node.owner;
					while (node.getLevel() > level)
					    if (node.owner instanceof portalui_treeNode)
							node = node.owner;						
					node = new portalui_treeNode(node.owner);					
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
				this.slider.setHeight(height - 150);
				this.slider.setWidth(width - 430);
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
					this.listInfo.setLeft(this.getWidth() - 235);
				}
				
				this.sb.setWidth(this.getWidth() / 2);
				this.sb.setTop(this.getHeight() - (this.top - 7) );
				
				this.marquee.setWidth(this.getWidth());
				this.marquee.setTop(this.getHeight()- 50);    
		    
				var appChild = this.childs;	
				var res = undefined;
				for (var i in appChild.objList){
					res = window.system.getResource(appChild.objList[i]);		
					if (res instanceof portalui_childForm)					
						res.maximize();					
				}
			}catch(e){
				systemAPI.alert("Resize :" + e,"");
			}
		}
	},
	getUserMenu: function(kodeMenu){  		   
	   this.dbLib.getDataXMLA("select * from menu where kode_klp = '"+this.app._kodeMenu+"' or kode_klp = 'ALLMENU'  order by kode_klp, rowindex");			
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			if (sender == this.dbLib){				
				switch (methodName){
					case "listData" : 
					    if (result != undefined){
							this.menuStr = result;												
						}
						break;					
					case "getDataProvider" :											
						eval('result = ' +result+';');											
						if (this.cek == 1){
							var i1=0;
							for (var i in result.rs.rows){
								if (i < 10)
									this.slider.addItem("server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].gambar,result.rs.rows[i].judul,result.rs.rows[i].keterangan,result.rs.rows[i].no_file_dok);						
							}	
							this.dbLib.getDataXMLA("select * from menu where kode_klp = '"+this.app._kodeMenu+"'  or kode_klp = 'ALLMENU' order by kode_klp, rowindex");	
							this.cek = 2;							
						}else{						
							//this.loadMenu(result.rs.rows);		
							this.cek = 3;
							this.childBlock.hide();
						}
					break;
					case "getDataXML" :							
						this.treev.clear();
						this.menuXML = loadXMLDoc(result);		
						this.treev.setXMLData(this.menuXML);						
						this.childBlock.hide();
					break;
				}
			}
			if (sender == this.addOnLib.dblib){				
				if (this.baris)	{
					var data = result.get(0);			
					if (data != undefined)
					{
						this.app._baris = data.get("value1");
					}else this.app._baris = 10;					
					this.addOnLib.getPerNextA(this.app._lokasi);				
					this.pernext = true;
					this.baris = false;
				}
				if (this.pernext){
					var data = result.get(0);			
					if (data != undefined)
					{
						this.app._pernext = data.get("flag");
					}else this.app._pernext = "";					 
					this.pernext = false;			
				}
			}
		}catch(e){
			this.childBlock.hide();
			systemAPI.alert(e);
		}
	},
	initScreen: function(){
		try{
			this.dbLib.getDataProviderA("select c.folder,a.gambar,a.judul,a.keterangan,a.no_file_dok "+
					"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
					"inner join portal_file c on b.no_file=c.no_file "+
					"where a.status_slide='1' and kode_klp='K04' and a.kode_lokasi = '"+this.app._lokasi+"' ");					
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
		this.reportNavigator.onPreviewClick.set(form, doBtnClick);
		this.reportNavigator.onGraphClick.set(form, doBtnClick);
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
		this.getApplication().terminate();
	},
	showProgress: function(sender){	
		system.showProgress();
	},
	hideProgress: function(sender){	
		system.hideProgress();
	},
	doSave: function(sender){
		this._mainButtonClick.call(this, this.bSimpan);
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
			return false;
		}
					
		if (this.form != undefined) this.form.free();
		this.form = undefined;
	    uses("server_util_arrayMap");
		fields = new server_util_Map();	
		fields.set(0, "kode_form");	
		values = new server_util_Map();	
		values.set(0, this.cb1.getText());	
		var temp = this.dbLib.locateData("m_form",fields, values, "form");        
		if (temp != undefined && temp != "")
		{
			this.checkLockTrans();
			if (this.app._mainFormLock) return false;
			uses(temp,this.alwaysLoad);
			var script = "this.form = new "+temp+"(this);"+
							"this.form.setTop(this.childTop); "+
							"this.form.show();    	";
			eval(script);			
		}
		if (this.form != undefined)
		{
			this.treev.hide();
			this.slider.hide();
			this.form.maximize();
			this.marquee.stop();
			this.marquee.hide();
			this.timer.setEnabled(false);
		} 
		var count = this.cb1.capacity(); 
		if (count == 50)  
			this.cb1.delItem((count - 1));		
		this.cb1.addItem(count, this.cb1.getText());
	},
	doBtnList: function(sender){
		if (!this.listInfo.fadeIn)
		{
			this.listInfo.fade();
			this.listInfo.show();		
			this.listInfo.bringToFront();	
		}else {
			this.listInfo.fadeOut();				
		}
	},
	doTimer: function(sender){
		try{
			if (this.app == undefined) this.app = this.getApplication();
			if (sender == this.timer){				
//------------------------------------------------------------------- locking transaction		
				this.checkLockTrans();
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
			uses("portalapp_fListData");
			this.listDataForm = new portalapp_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	openNewWindow: function(sender){
		window.open("index.php?app="+this.app.className);
	}
});
