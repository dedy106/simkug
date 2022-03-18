//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_saku_fMain.prototype.parent.constructor.call(this, owner);
			window.app_saku_fMain.prototype.parent.setWidth.call(this, 600);
			window.app_saku_fMain.prototype.parent.setHeight.call(this, 450);
			this._mainButtonClick = new portalui_eventHandler();
			this.title = "SAKU Form";
			this._isLogedIn	= false;
			this.app._kodeMenu = "FRIGIA";
			this._userLog = "";
			this._lokasi = "";
			this._pp = "";
			this.alwaysLoad = true;
			this._openAccess = true;
			this.activeChildForm = undefined;
			this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();		
		
			uses("portalui_saiCB;portalui_slider;portalui_image;portalui_imageButton;portalui_button;portalui_timer");
			uses("portalui_label;portalui_saiLabelEdit;portalui_saiCBBL;portalui_panel;portalui_reportNavigator;portalui_treeView;portalui_treeNode");
			uses("portalui_statusBar;portalui_marquee;util_addOnLib;util_standar;portalui_imageButton");
			this.className  = "fMain";
			this.formCaption = system.getConfig("app.caption")+" "+this.app._userLog;	
			this.setCaption(this.formCaption);
			this.setTop(60);						
			this.maximize();										
			this.pTool = new portalui_panel(this);
			this.pTool.setBound(0,0,this.width,30);						
			this.pTool.setColor(system.getConfig("app.color.panel"));
			this.pTool.setShadow(true);
			
			this.bRun = new portalui_imageButton(this.pTool);
			this.bRun.setBound(5,5,17,15);
			this.bRun.setHint("Execute");
			this.bRun.setImage("icon/"+system.getThemes()+"/ok.png");
			this.bRun.onClick.set(this,"doExecuteMenu");
			
			this.cb1 = new portalui_saiCB(this.pTool);
			this.cb1.setBound(28,3,200,20);
			this.cb1.setLabelWidth(0);
			this.cb1.setWidth(200);
			this.cb1.setText("");
			this.cb1.setMustCheck(false);
			this.cb1.onKeyDown.set(this,"doKeyDown");
			
			this.bSave = new portalui_imageButton(this.pTool);
			this.bSave.setBound(235,5,17,15);
			this.bSave.setHint("Save");
			this.bSave.onClick.set(this,"doSave");
			this.bSave.setImage("icon/"+system.getThemes()+"/bSave2.png");
						
			this.separator1 = new portalui_image(this.pTool);
			this.separator1.setBound(260,3,2,20);
			this.separator1.setImage("icon/"+system.getThemes()+"/separator.png");
			
			this.bBack = new portalui_imageButton(this.pTool);
			this.bBack.setBound(265,5,17,15);
			this.bBack.setHint("Back");
			this.bBack.setImage("icon/"+system.getThemes()+"/bBack.png");
			
			this.bExit = new portalui_imageButton(this.pTool);
			this.bExit.setBound(285,5,17,15);
			this.bExit.setHint("Exit");
			this.bExit.onClick.set(this, "bTutupClick");
			this.bExit.setImage("icon/"+system.getThemes()+"/bExit.png");
			
			this.bCancel = new portalui_imageButton(this.pTool);
			this.bCancel.setBound(305,5,17,15);
			this.bCancel.setHint("Cancel");
			this.bCancel.setImage("icon/"+system.getThemes()+"/bCancel2.png");
			
			this.separator2 = new portalui_image(this.pTool);
			this.separator2.setBound(325,3,2,20);
			this.separator2.setImage("icon/"+system.getThemes()+"/separator.png");
			
			this.bFind = new portalui_imageButton(this.pTool);
			this.bFind.setBound(330,5,17,15);
			this.bFind.setHint("Search");
			this.bFind.setImage("icon/"+system.getThemes()+"/bFind.png");
			this.bFind.onClick.set(this, "doFindText");
			
			this.separator3 = new portalui_image(this.pTool);
			this.separator3.setBound(347,3,2,20);
			this.separator3.setImage("icon/"+system.getThemes()+"/separator.png");
			
			this.bNew = new portalui_imageButton(this.pTool);
			this.bNew.setBound(350,5,17,15);
			this.bNew.setHint("Create Session");
			this.bNew.setImage("icon/"+system.getThemes()+"/bCreateSession.png");
			this.bNew.onClick.set(this, "createSession");
			
			this.bClose = new portalui_imageButton(this.pTool);
			this.bClose.setBound(369,5,17,15);
			this.bClose.setHint("End Session");
			this.bClose.setImage("icon/"+system.getThemes()+"/bEndSession.png");
			this.bClose.onClick.set(this, "doClose");
			
			this.separator3 = new portalui_image(this.pTool);
			this.separator3.setBound(389,3,2,20);
			this.separator3.setImage("icon/"+system.getThemes()+"/separator.png");
			
			this.bHelp = new portalui_imageButton(this.pTool);
			this.bHelp.setBound(394,5,17,15);
			this.bHelp.setHint("Help");
			this.bHelp.setImage("icon/"+system.getThemes()+"/bHelp.png");
			
			this.bGenLocal = new portalui_imageButton(this.pTool);
			this.bGenLocal.setBound(413,5,17,15);
			this.bGenLocal.setHint("Front End");
			this.bGenLocal.setImage("icon/"+system.getThemes()+"/bGenLocal.png");
			this.bGenLocal.onClick.set(this, "gotoFrontEnd");
			
			this.bChat = new portalui_imageButton(this.pTool);
			this.bChat.setBound(432,5,17,15);
			this.bChat.setHint("Chat");
			this.bChat.setImage("icon/"+system.getThemes()+"/user.png");
			this.bChat.onClick.set(this, "doChat");
//-------------------------------------caption		
			this.pCaption = new portalui_panel(this);
			this.pCaption.setBound(0,30,this.width,32);			
			this.pCaption.setColor("#FFFFFF");
			this.pCaption.setBorder(0);
			
			this.lblCaption = new portalui_label(this.pCaption);
			this.lblCaption.setBound(10,0,500,22);			
			this.lblCaption.fnt.setSize(13);			
			this.lblCaption.fnt.setBold(true);
			this.lblCaption.fnt.setColor(system.getConfig("app.headerColor"));						
			this.lblCaption.setCaption(this.formCaption);			
////------------------------------------ panel button -------------------------		
			this.pButton = new portalui_panel(this);
			this.pButton.setBound(0,55,this.width,31);
			this.pButton.show();
			this.pButton.setBorder(1);
			this.pButton.setColor(system.getConfig("app.color.panel"));		
			this.pButton.setShadow(true);
			this.refMenu = new portalui_imageButton(this.pButton);			
			this.refMenu.setBound(10,5,17,15);
			this.refMenu.setHint("Refresh Menu");
			this.refMenu.setImage("icon/"+system.getThemes()+"/bRefresh.png");
			this.refMenu.onClick.set(this, "getUserMenu");
//------------------------------------ panel transaksi -------------------------		
			this.pTrans = new portalui_panel(this.pButton);
			this.pTrans.setBound(2,1,330,26);
			this.pTrans.hide();
			this.pTrans.setBorder(0);
			this.pTrans.setColor(system.getConfig("app.color.panel"));
			
			this.bTutup = new portalui_button(this.pButton);
			this.bTutup.setBound(this.width-90,4,80,20);
			this.bTutup.setCaption("Tutup");
			this.bTutup.onClick.set(this, "bTutupClick");
			this.bTutup.setIcon("url(icon/"+system.getThemes()+"/exit.png)");
			this.bTutup.setHint("exit modul");
			this.bTutup.setShowHint(true);
			this.bTutup.hide();
			
			this.bSimpan = new portalui_button(this.pTrans);
			this.bSimpan.setBound(5,4,80,20);
			this.bSimpan.setCaption("<u>S</u>impan");
			this.bSimpan.onClick.set(this, "mainButtonClick");
			this.bSimpan.setIcon("url(icon/"+system.getThemes()+"/save.png)");
			this.bSimpan.setHint("Simpan Transaksi");
			this.bSimpan.setShowHint(true);
			this.bSimpan.setName("bSimpan");		
			
			this.bEdit = new portalui_button(this.pTrans);
			this.bEdit.setBound(79,4,80,20);
			this.bEdit.setCaption("<u>E</u>dit");
			this.bEdit.onClick.set(this, "mainButtonClick");
			this.bEdit.setIcon("url(icon/"+system.getThemes()+"/edit.png)");
			this.bEdit.setHint("Simpan Edit data Transaksi");
			this.bEdit.setShowHint(true);
			this.bEdit.setName("bEdit");
			
			this.bHapus = new portalui_button(this.pTrans);
			this.bHapus.setBound(153,4,80,20);			
			this.bHapus.setCaption("<u>H</u>apus");
			this.bHapus.onClick.set(this, "mainButtonClick");
			this.bHapus.setIcon("url(icon/"+system.getThemes()+"/delete.png)");
			this.bHapus.setHint("Hapus data Transaksi");
			this.bHapus.setShowHint(true);
			this.bHapus.setName("bHapus");
			
			this.bClear = new portalui_button(this.pTrans);
			this.bClear.setBound(250,4,80,20);
			this.bClear.setCaption("<u>C</u>lear");
			this.bClear.onClick.set(this, "mainButtonClick");
			this.bClear.setIcon("url(icon/"+system.getThemes()+"/refresh.png)");
			this.bClear.setHint("Clear Form");
			this.bClear.setShowHint(true);
			this.bClear.setName("bClear");
//------------------------------------ panel login -------------------------		
			this.pLogin = new portalui_panel(this.pButton);
			this.pLogin.setBound(2,1,330,26);
			this.pLogin.hide();
			this.pLogin.setBorder(0);
			this.pLogin.setColor(system.getConfig("app.color.panel"));
			
			this.bLogin = new portalui_button(this.pLogin);
			this.bLogin.setBound(10,4,80,20);
			this.bLogin.setCaption("Login");
			this.bLogin.onClick.set(this, "loginClick");
			this.bLogin.setIcon("url(icon/"+system.getThemes()+"/login.png)");
			this.bLogin.setHint("Login");
			this.bLogin.setShowHint(true);
			
//------------------------------------ panel report -------------------------		
			this.pReport = new portalui_panel(this.pButton);
			this.pReport.setBound(2,1,330,26);
			this.pReport.hide();
			this.pReport.setBorder(0);
			this.pReport.setColor(system.getConfig("app.color.panel"));
			
			this.bPreview = new portalui_button(this.pReport);
			this.bPreview.setBound(10,4,80,20);
			this.bPreview.setCaption("Tampil");
			this.bPreview.onClick.set(this, "mainButtonClick");
			this.bPreview.setIcon("url(icon/"+system.getThemes()+"/execObj.png)");
			this.bPreview.setHint("Preview data");
			this.bPreview.setShowHint(true);
			
			this.bClear2 = new portalui_button(this.pReport);
			this.bClear2.setBound(120,4,80,20);
			this.bClear2.setCaption("Clear");
			this.bClear2.onClick.set(this, "mainButtonClick");
			this.bClear2.setIcon("url(icon/"+system.getThemes()+"/refresh.png)");
			this.bClear2.setHint( "Clear Form");
			this.bClear2.setShowHint(true);
//------------------------------------ panel Editor-------------------------		
			this.pEditor = new portalui_panel(this.pButton);
			this.pEditor.setBound(2,1,330,26);
			this.pEditor.hide();
			this.pEditor.setBorder(0);
			this.pEditor.setColor(system.getConfig("app.color.panel"));
			
			this.bNew = new portalui_button(this.pEditor);
			this.bNew.setBound(5,4,80,20);
			this.bNew.setCaption("New");
			this.bNew.onClick.set(this, "mainButtonClick");
			this.bNew.setIcon("url(icon/"+system.getThemes()+"/preview.png)");
			this.bNew.setHint("New Form");
			this.bNew.setShowHint(true);
			
			this.bSave = new portalui_button(this.pEditor);
			this.bSave.setBound(80,4,80,20);
			this.bSave.setCaption("Save");
			this.bSave.onClick.set(this, "mainButtonClick");
			this.bSave.setIcon("url(icon/"+system.getThemes()+"/save.png)");
			this.bSave.setHint("Save Form");
			this.bSave.setShowHint(true);
			
			this.bOpen = new portalui_button(this.pEditor);
			this.bOpen.setBound(155,4,80,20);
			this.bOpen.setCaption("Open");
			this.bOpen.onClick.set(this, "mainButtonClick");
			this.bOpen.setIcon("url(icon/"+system.getThemes()+"/preview.png)");
			this.bOpen.setHint("Open Form");
			this.bOpen.setShowHint(true);	
			this.bRun = new portalui_button(this.pEditor);
			this.bRun.setBound(239,4,80,20);
			this.bRun.setCaption("Run");
			this.bRun.onClick.set(this, "mainButtonClick");
			this.bRun.setIcon("url(icon/"+system.getThemes()+"/Execute.png)");
			this.bRun.setHint("Test Form");
			this.bRun.setShowHint(true);
//------------------------------------ panel Editor-------------------------		
			this.pQuery = new portalui_panel(this.pButton);
			this.pQuery.setBound(2,1,330,26);
			this.pQuery.hide();
			this.pQuery.setBorder(0);
			this.pQuery.setColor(system.getConfig("app.color.panel"));			
			
			this.bExec = new portalui_imageButton(this.pQuery);
			this.bExec.setBound(10,4,18,18);
			this.bExec.setNoImage(true);
			this.bExec.setHint("Execute");
			this.bExec.setImage("icon/"+system.getThemes(0)+"/execObj.png");
//------------------------------------ panel Message-------------------------		
			this.pMsg = new portalui_panel(this.pButton);
			this.pMsg.setBound(2,1,330,26);
			this.pMsg.hide();
			this.pMsg.setBorder(0);
			this.pMsg.setColor(system.getConfig("app.color.panel"));			
			
			this.bSend = new portalui_button(this.pMsg);								
			this.bSend.setBound(10,4,80,20);
			this.bSend.setCaption("Send");
			this.bSend.onClick.set(this, "mainButtonClick");
			this.bSend.setHint("send message");
			this.bSend.setIcon("url(icon/"+system.getThemes()+"/send.png)");
//---------------------------------------------- image
			this.cek=0;
			this.step=0;
			this.slider = new portalui_slider(this);
			this.slider.setBound(420,95,this.width-430,this.height - 150);									
//----------------------------------------------- report Navigator			
			this.reportNavigator = new portalui_reportNavigator(this);
			this.reportNavigator.setBound(0,55,this.width,31);
			this.reportNavigator.hide();				
			this.reportNavigator.setColor(system.getConfig("app.color.panel"));
			this.reportNavigator.setBorder(1);
			this.reportNavigator.setShadow(true);			
//----------------------------------------------------------------- tree View-----------------------------------			
			this.treev = new portalui_treeView(this);
			this.treev.setBound(10,95,400,this.height - 150);
			this.treev.childLength = 500;
			this.treev.onDblClick.set(this, "treeClick");					
//------------------------------------------------
		   this.maximize();		   		  
//------------------------------------------------ status Bar			
			this.sb = new portalui_statusBar(this);
			this.sb.setBound(0,this.height - 50,this.width / 2,50);
			this.sb.hide();
//----------------------------------------------- Marquee		    
			this.marquee = new portalui_marquee(this);
		    this.marquee.setBound(0,this.height - 50,this.width,50);  
			this.marquee.setInterval(30);
		    this.marquee.direction = 'up';
		    this.marquee.message(["rooJax akan segera merilis SMS Center"],"Info");
		    
			this.childBlock = new portalui_panel(this);
		    this.childBlock.setBound(0,87,this.width,this.getHeight() - 87);		   
			this.childBlock.getCanvas().style.zIndex = 999999;
			
			this.load = new portalui_image(this.childBlock);
			this.load.setBound(this.width / 2 - 15,this.height / 2 - 30,31,31);
			this.load.setImage("image/gridload.gif");
			
			this.label = new portalui_label(this.childBlock);
			this.label.setBound(this.width / 2 - 30,this.height / 2 - 50,80,18);
			this.label.setCaption("L o a d i n g . . . . .");
			this.label.setColor("#000099");
						
			this.childBlock.hide();
//--------------------------------------------------
			this.childTop = 84;
			this.initiated = true;
			this.setImage("url(image/themes/"+system.getThemes()+"/logo.png)top left ");
							
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_saku_fMain.extend(window.portalui_form);
window.app_saku_fMain.implement({
	gotoLogin: function(){
		uses("app_saku_fLogin");
		this.form = new app_saku_fLogin(this);
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
			this.dbLib.getDataProviderA("select c.folder,a.gambar,a.judul,a.keterangan,a.no_file_dok "+
				"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
				"inner join portal_file c on b.no_file=c.no_file "+
				"where a.status_slide='1' and kode_klp='K04'");					
		}catch(e){
			systemAPT.alert(e);
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
			if ((sender == this.bTutup)||(sender == this.bExit))
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
			system.showProgress("load "+kodeForm);
			if (item.getKodeForm() == '-') return;
			switch(kodeForm){
				case "U01I" :				
					window.location = ".";
					break;			
				default :
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
						if (this.app._mainFormLock) { this.childBlock.hide();return false;}
						this.childBlock.show();
						uses(temp,this.alwaysLoad);
						var script = "this.form = new "+temp+"(this);"+
									"this.form.setTop(this.childTop); "+
									"this.form.show();    	";
						eval(script);			
					  }
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
				this.btnList.setLeft(this.getWidth() - 50);	  	  	  
				this.listInfo.setLeft(this.getWidth() - 235);
				
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
	},
	doKeyDown: function(sender, keyCode){	
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
	}
});