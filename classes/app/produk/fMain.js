//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_produk_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_produk_fMain.prototype.parent.constructor.call(this, owner);			
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
			//this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();		

			uses("saiEdit;image;button;label;panel;util_addOnLib;util_standar");					
			this.className  = "fMain";			
			this.formCaption = "RRA";	
			this.setCaption(this.formCaption);
			this.setTop(60);						
			this.maximize();
			this.showTitleBar(false);										
			
//------------------------------------------------ status Bar				
			this.sb = new control(this,{bound:[0,this.height - 30,this.width,30],visible:false});
//----------------------------------------------- Marquee		    			
			//this.marquee = new marquee(this,{bound:[0,this.height - 50,this.width,50], interval:30,direction:"up"});
		    //    this.marquee.message(["roojax akan merilis jOfficeair","sqlSynch, sinkronisasi database antar server","projectSynch, sinkronisasi file project antar server..."],"Info");		    
			this.childBlock = new panel(this,{bound:[0,87,this.width,this.getHeight() - 87],visible:false});		    
			this.childBlock.addStyle("z-Index:999999");			
			this.load = new image(this.childBlock,{bound:[this.width / 2 - 15,this.height / 2 - 30,31,31],image:"image/gridload.gif"});
			this.label = new label(this.childBlock,{bound:[this.width / 2 - 30,this.height / 2 - 50,80,18],caption:"L o a d i n g . . . . .",color:"#000099"});			
//--------------------------------`------------------
			this.childTop = 0;
			this.initiated = true;	
			this.firstInit = true;
			this.setBorderStyle(bsHide);			
			
			this.getClientCanvas().style.background = "#fff";							
			
			
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_produk_fMain.extend(window.form);
window.app_produk_fMain.implement({
	createToolbar: function(){
			this.pTool = new panel(this,{bound:[0,0,this.width,30],border:0,color:"#EEEEEE",shadow:true});//DCEBF9
			this.bTree = new glassButton(this.pTool,{bound:[5,0,70,30],showHint:true,hint:"Show/Hide Menu",caption:"Menu",color:system.getConfig("form.button.color"), hoverColor:system.getConfig("form.button.color"),icon:"icon/"+system.getThemes()+"/panel.png",click:[this,"doToggleMenu"]});									
			this.cb1 = new saiCB(this.pTool,{bound:[78,4,200,20],labelWidth:0,text:"",mustCheck:false,keyDown:[this,"doMenuKeyDown"]});					
			this.bRun = new image(this.pTool,{bound:[281,4,20,20],showHint:true,hint:"Execute",image:"icon/"+system.getThemes()+"/ok2.png",click:[this,"doExecuteMenu"]});									
			this.bRun.setCursor("pointer");
			this.separator1 = new control(this.pTool,{bound:[306,0,1,30]});
            this.separator1.getCanvas().style.background = system.getConfig("form.button.color");
			this.bBack = new image(this.pTool,{bound:[310,4,20,20],showHint:true,hint:"Back", image:"icon/"+system.getThemes()+"/Back.png",click:[this,"doExecuteMenu"]});									
			this.bBack.setCursor("pointer");
			this.bRecall = new image(this.pTool,{bound:[335,4,23,20],showHint:true,hint:"Refresh",image:"icon/"+system.getThemes()+"/refresh2.png", click:[this,"doRecall"]});				
			this.bRecall.setCursor("pointer");
			this.bExit = new image(this.pTool,{bound:[363,4,20,20],showHint:true, hint:"Close",click:[this,"bTutupClick"],image:"icon/"+system.getThemes()+"/close2.png"});			
			this.bExit.setCursor("pointer");
			
			this.separator1 = new control(this.pTool,{bound:[388,0,1,30]});
            this.separator1.getCanvas().style.background = system.getConfig("form.button.color");
            this.bClose = new image(this.pTool,{bound:[394,4,20,20],showHint:true,hint:"End Session",image:"icon/"+system.getThemes()+"/eject.png",click:[this,"doClose"]});			
			this.bGenLocal = new image(this.pTool,{bound:[419,4,20,20],showHint:true,hint:"Open New Window",image:"icon/"+system.getThemes()+"/monitor.png",click:[this,"openNewWindow2"]});

//-------------------------------------caption		
			this.pCaption = new panel(this,{bound:[0,30,this.width,32],color:"#ffffff",border:0});
			this.lblCaption = new label(this.pCaption,{bound:[40,2,this.width - 150,22],caption:this.formCaption,fontColor:"#3992e5",bold:true,italics:true, fontSize:14});
			
////------------------------------------ panel button -------------------------		
			this.pButton = new panel(this,{bound:[0,55,this.width,31],border:1,color:"#EEEEEE",shadow:true});
			this.refMenu = new image(this.pButton,{bound:[10,3,20,20],hint:"Refresh Menu",image:"icon/"+system.getThemes()+"/refresh2.png",click:[this,"getUserMenu"], cursor:"Pointer", showHint: true});
			this.refMenu.addStyle("cursor:pointer");
			
//------------------------------------ panel transaksi -------------------------
			this.pTrans = new panel(this.pButton,{bound:[2,3,700,26],border:0,color:"#EEEEEE"});						
			this.bTutup = new button(this.pButton,{bound:[this.width-90,4,80,18],caption:"Tutup",icon:"url(icon/"+system.getThemes()+"/exit.png)",hint:"Exit Modul",click:[this,"bTutupClick"]});
			this.bTutup.hide();			
			this.bSimpan = new button(this.pTrans,{bound:[5,3,80,18],caption:"<u>S</u>impan",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/save.png)",hint:"Simpan Transaksi",name:"bSimpan"});		
			this.bEdit = new button(this.pTrans,{bound:[90,3,80,18],caption:"<u>E</u>dit",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/edit.png)",name:"bEdit",hint:"Simpan Edit data Transaksi"});			
			this.bHapus = new button(this.pTrans,{bound:[175,3,80,18],caption:"<u>H</u>apus",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/delete.png)",hint:"Hapus data Transaksi",name:"bHapus"});		
			this.bClear = new button(this.pTrans,{bound:[300,3,80,18],caption:"<u>C</u>lear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form",name:"bClear"});
			this.bDraft = new button(this.pTrans,{bound:[390,3,100,18],caption:"&nbsp;Save as <u>D</u>raft",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/save.png)",hint:"Simpan sebagai draft",name:"bDraft", visible:false});
			this.bDisposisi = new button(this.pTrans,{bound:[500,3,80,18],caption:"&nbsp;&nbsp;&nbsp;Disposisi",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/forward.png)",hint:"Disposisi Dokumen",name:"bDisposisi", visible:false});		
//--------------- panel login -------------------------		
			this.pLogin = new panel(this.pButton,{bound:[2,3,500,26],border:0,color:"#EEEEEE",visible:false});
			this.bLogin = new button(this.pLogin,{bound:[10,2,80,20],caption:"Login",click:[this,"loginClick"],icon:"url(icon/"+system.getThemes()+"/login.png)",hint:"Login"});					
//------------------------------------ panel report -------------------------		
			this.pReport = new panel(this.pButton,{bound:[2,3,500,26],visible:false,border:0,color:"#EEEEEE"});
			this.bPreview = new button(this.pReport,{bound:[10,3,80,18],caption:"Tampil",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"Preview Data"});
			this.bClear2 = new button(this.pReport,{bound:[120,3,80,18],caption:"Clear",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/refresh.png)",hint:"Clear Form"});						
//------------------------------------ panel Editor-------------------------		
			this.pEditor = new panel(this.pButton,{bound:[2,3,500,26],visible:false,border:0,color:"#EEEEEE"});
			this.bNew = new button(this.pEditor,{bound:[5,3,80,18],caption:"New",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"New Form"});
			this.bSaveEdit = new button(this.pEditor,{bound:[80,3,80,18],caption:"Save",click:[this,"mainButtonClick"],hint:"Save Form",icon:"url(icon/"+system.getThemes()+"/save.png)"});
			this.bOpen = new button(this.pEditor,{bound:[155,3,80,18],caption:"Open",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/preview.png)",hint:"Open Form"});		
			this.bRun = new button(this.pEditor,{bound:[239,3,80,18],caption:"Run",click:[this,"mainButtonClick"],icon:"url(icon/"+system.getThemes()+"/Execute.png)",hint:"Test Form"});			
//------------------------------------ panel Editor-------------------------		
			this.pQuery = new panel(this.pButton,{bound:[2,3,500,26],visible:false,border:0,color:"#EEEEEE"});
			this.bExec = new imageButton(this.pQuery,{bound:[10,3,18,18],noImage:true,hint:"Execute",image:"icon/"+system.getThemes(0)+"/execObj.png"});			
//------------------------------------ panel Message-------------------------		
			this.pMsg = new panel(this.pButton,{bound:[2,3,500,26],visible:false,border:0,color:"#EEEEEE"});
			this.bSend = new button(this.pMsg,{bound:[10,3,80,18],caption:"Send",click:[this,"mainButtonClick"],hint:"Send Message",icon:"url(icon/"+system.getThemes()+"/send.png)"});											
//---------------------------------------------- image
			this.cek=0;
			this.step=0;
			//this.widgets = new panelWidget(this,{bound:[420,95,this.width-430,this.height - 150],border:pbFlat, caption:"Application Widget",color:"#cde5f1",column:2});			
//----------------------------------------------- report Navigator									
			this.reportNavigator = new reportNavigator(this,{bound:[0,55,this.width,31],visible:false,color:"#EEEEEE",border:1,shadow:true});			
//----------------------------------------------------------------- tree View-----------------------------------						
			this.treev = new treeView(this,{bound:[10,95,400,this.height - 130],childLength:400,click:[this,"treeClick"], visible:false});			
		   
//------------------------------------------------ status Bar				
			//this.sb = new control(this,{bound:[0,this.height - 0,this.width,0],visible:false});
//----------------------------------------------- Marquee		    			
			//this.marquee = new marquee(this,{bound:[0,this.height - 50,this.width,50], interval:30,direction:"up"});
		    //    this.marquee.message(["roojax akan merilis jOfficeair","sqlSynch, sinkronisasi database antar server","projectSynch, sinkronisasi file project antar server..."],"Info");		    
			this.childBlock = new panel(this,{bound:[0,87,this.width,this.getHeight() - 87],visible:false});		    
			this.childBlock.addStyle("z-Index:999999");			
			this.load = new image(this.childBlock,{bound:[this.width / 2 - 15,this.height / 2 - 30,31,31],image:"image/gridload.gif"});
			this.label = new label(this.childBlock,{bound:[this.width / 2 - 30,this.height / 2 - 50,80,18],caption:"L o a d i n g . . . . .",color:"#000099"});			
//--------------------------------`------------------
			this.childTop = 89;
			this.initiated = true;	
			this.firstInit = true;
			this.setBorderStyle(bsHide);			
			this.pReport.hide();
	},
	gotoLogin: function(){
		uses("app_produk_fLogin");
		this.form = new app_produk_fLogin(this);
		this.form.setTop(this.childTop);
		this.form.show();
		this.form.maximize();
		this.hideMainComp();				
		if (window.parent.hideLoading == undefined && getCookie("roojuid")){			
			this.form.showLoading("Init Parameter");
			this.form.e0.hide();
			this.form.e1.hide();
			this.form.p1.hide();
			this.form.e0.setText(getCookie("roojuid"));
			this.form.e1.setText(getCookie("roojpwd"));
			//error_log(getCookie("rfcSetting") +":"+getCookie("dbSetting")+":"+getCookie("appState"));
			this.app._rfcSetting = getCookie("rfcSetting");
			this.app._dbSetting = getCookie("dbSetting");
			this.app._appState = getCookie("appState");								
			this.form.mainButtonClick(this.bLogin);
		}
	},	
	doToggleMenu: function(sender){
		try{
			//alert(this.app._isLogedIn);
			if (this.app._isLogedIn){
				if (this.treev.isVisible()) {
					this.treev.hide();
					if (this.form) this.form.setLeft(0);
					this.dashboard.setLeft(5);
					this.dashboard.setWidth(this.width - 10);
				}else{
					this.treev.show();
					if (this.form) this.form.setLeft(this.treev.left + this.treev.width + 10);
					this.dashboard.setLeft(this.treev.left + this.treev.width + 10);
					this.dashboard.setWidth(this.width - this.treev.width - 10);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	hideMainComp: function(){
		if (this.treev)
			this.treev.hide();
		//this.slider.hide();
		this.form.maximize();				
		//this.marquee.stop();
		if (this.timer !== undefined) this.timer.setEnabled(false);
		//this.marquee.hide();						
	},
	initDashboard: function(){		
		try{
			uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_produk_dashboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map");
			this.dashboard = new app_produk_dashboard(this,{bound:[10, this.treev.top, this.width - 30, this.treev.height]});		
			this.treev.hide();
			this.lPeriode = new label(this,{bound:[this.width - 170,37,50,20],alignment:"right",caption:this.app._periode,color:"#299bcf",click:[this,"doBtnList"]});
			this.lLokasi = new label(this,{bound:[this.width - 500,37,320,20],alignment:"right",caption:"Lokasi :" + this.app._lokasi,color:"#299bcf",click:[this,"doBtnList"]});
			this.foto = new control(this, {bound:[this.width - 45, 25, 40,40]});
			this.foto.getCanvas().innerHTML = "<div onclick='$$("+this.resourceId+").doBtnList()' style='width:40px;height:40px;border-radius:20px;background:#ccc;overflow:hidden'><img width=40 height=40 src='"+this.app._foto+"' /></div>";
			this.lUser = new label(this,{bound:[this.width - 130,37,80,20],alignment:"right",caption:this.app._userLog,color:"#299bcf",click:[this,"doBtnList"]});
			this.lUser.addStyle("cursor:pointer");
			//this.chatBtn.addStyle("cursor:pointer");
			//uses("app_lab_remote_chat;frame");			
			this.pView = new frame(this, {bound:[this.width - 260, 60, 250, 150], visible:false, color:"#ffffff", pointPosition: 100, pointMode:0});
			this.iFoto = new image(this.pView, {bound:[100,25,50,50],image: this.app._foto});
			this.lNama = new label(this.pView, {bound:[20,80,200,20],caption: this.app._namaUser});
			this.pView.setPointMode(0);
			this.pView.setPointPosition(190);
			this.pView.getCanvas().style.zIndex = 100;
			//this.pView.rearrangeChild(25,23);
			this.bTree.click();
		}catch(e){
			error_log(e);
		}
	},
	viewToDoList: function(){
		if (this.pToDoList.isVisible()){
			this.pToDoList.hide();
			this.treev.show();
			this.dashboard.show();
			if (this.form !== undefined) this.pTrans.show();
		}else {
			this.pToDoList.show();
			this.treev.hide();
			this.dashboard.hide();
			this.pTrans.hide();
		}
	},
	doClickToDoList: function(sender, col, row){
		var tcode = sender.cells(1,row);
		var no_pdrk = sender.cells(2,row);
		if (this.app == undefined) this.app = this.getApplication();
		if (this.app._klpAkses[tcode] == undefined && !this._openAccess){
			system.alert(this,"Anda tidak ada akses untuk form "+tcode+" ","Hubungi administrator anda");
			system.hideProgress("load "+kodeForm);
			return false;
		}
					
		if (this.form != undefined) this.form.free();
		this.form = undefined;
		uses("server_util_arrayMap");
		fields = new server_util_Map();	
		fields.set(0, "kode_form");	
		values = new server_util_Map();	
		values.set(0, tcode);
		this.alertFormLisence = false;
		var temp = this.dbLib.locateData("m_form",fields, values, "form");        
		if (temp != undefined && temp != "" && temp.indexOf("error") === -1)
		{
			if (this.app._statusLokasiUser != "FC" && temp == "app_lab_transaksi_fFCKeep"){
				temp = "app_lab_transaksi_fFCKeep2";
			}		
			this.checkLockTrans();
			if (this.app._mainFormLock) return false;			
			uses(temp,this.alwaysLoad);
			var script = "this.form = new "+temp+"(this.pChildForm, no_pdrk);"+
							"this.form.setTop(0); "+
							"this.form.show();    	";
			eval(script);			
			this.form.bringToFront();
			this.dashboard.hide();		
		}else return system.alert(this, temp,"");
		if (this.form != undefined)
		{
			this.pTrans.setLeft(310);
			this.treev.hide();
			//this.sb.hide();
			//this.slider.hide();
			this.form.maximize();
			//this.marquee.stop();
			//this.marquee.hide();		
		} 
		this.bExit.setHint("Exit");
	},
	doAfterLogin: function(){
		try{		    
			uses("saiCB;radioButton;glassButton;saiLabelEdit;saiEdit;image;imageButton;button;timer;label;saiCBBL;panel;reportNavigator;treeView;treeNode;statusBar;util_addOnLib;util_standar;imageButton;saiGrid");					
			
			this.createToolbar();			
			//this.sb.setText1(this.app._namaUser, "image/userinfo.png");
			//this.sb.setText2(this.app._periodeGAR+":"+this.app._appState);		
			//this.childBlock.show();
			
			this.setCaption(this.app._lokasi +" - "+this.app._namalokasi);
			//autoRefresh
			
			
			//info user
			//this.chatBtn = new image(this,{bound:[this.width - 150,30,25,25],hint:"Chat",showHint:true, color:"",image:"icon/dynpro/chat.png",click:[this,"doToggleChat"]});
			//this.btnList = new image(this,{bound:[this.width - 50,30,25,25],hint:"User Info",showHint:true, color:"",image:"image/info.png"});
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);			
			
			this._periode = this.app._periodeGAR;
			this.menuStr = "";																					
			this.addOnLib = this.app._addOnLib;						
			this.baris = true;												
			this.app._baris = 20;
			this.app._pernext = 1;
			this.cek = 1;			
			uses("portalapp_fListData");
			this.createListData();			
			this.getUserMenu();			
			this.loadLisence();			
			//this.childBlock.hide();											
			this.form.free();			
			this.bTutup.click();
			this.unblock();			
			//this.treev.bringToFront();
			this.treev.show();
		}catch(e){
			alert(e);
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
			system.alert(this,e,"");
		}
	},
	initLoad: function(){
		try{	   	  
			if (!this.menuIsLoaded){
				this.treev.show();				
			}
		}catch(e){
			system.alert(this,"[fMain]::initLoad :"+e,"");
		}
	},
	doModalResult : function(event, modalResult){
		if (event == "close" && modalResult == mrOk){
			if (setCookie){
				setCookie("roojuid","",-100);
				setCookie("roojpwd","",-100);
			}			
			//this.chat.stopPolling();
			//this.chat.free();
			this.app.restart();
			this.treev.show();	

		}
		
	},
	bTutupClick: function(sender){	
		try{			
			this.pReport.hide();
			this.bDraft.hide();
			if (this.form instanceof app_produk_fLogin && sender == this.bExit){
				return false;
			}			
			if (this.form == undefined){
				system.confirm(this, "close", "Yakin akan logout?","");	
				//this.app.restart();
				//this.treev.show();
				return false;
			}
			this.pTrans.setLeft(2);
			if ((sender == this.bTutup)||(sender == this.bExit)){
				//window.system.closeAllMDIChild();
				if (this.form) this.form.free();
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
			//this.sb.show();
			if (this.timer !== undefined) this.timer.setEnabled(false);
			//this.marquee.show();
			this.setFormCaption(window.app_keterangan);
			this.alertFormLisence = false;
			this.treev.setFocus();
			this.bExit.setHint("Log Off");
		}catch(e){
			system.alert(this,e,"");
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
		this.pReport.hide();
		this.pTrans.hide();
		this.pLogin.hide();
		this.reportNavigator.hide();
		this.pButton.show();
		this.pEditor.hide();
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
				//this.bCancel.onClick.set(child,formClick);
				this.bDraft.onClick.set(child,formClick);
				this.bDisposisi.onClick.set(child,formClick);
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
				//this.bCancel.onClick.set(child,formClick);
                break;	
		}
	},
	mainButtonClick: function(sender){
		this._mainButtonClick.call(this, sender);
	},
	treeClick: function(item){
		try{				
			this.pTrans.setLeft(2);
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
					if (temp != undefined && temp != "" && temp.indexOf("error") === -1)
					{				    								
						if (this.app._statusLokasiUser != "FC" && temp == "app_lab_transaksi_fFCKeep"){
						//	temp = "app_lab_transaksi_fFCKeep2";
						}								
						this.checkLockTrans();												
						if (this.app._mainFormLock) { this.childBlock.hide();throw("Lokasi sedang di-<i><font color='#ff0000'>lock</font></i>. Transaksi tidak dapat dilanjutkan");return false;}						
						this.childBlock.show();
						uses(temp,this.alwaysLoad);
						this.activeFormClass = temp;
						this.app._namaForm=item.caption;
						var script = "this.form = new "+temp+"(this);"+
									"this.form.setTop(this.childTop); "+
									"this.form.setTabChildIndex(),this.form.show();    	";
						eval(script);		
						this.setFormCaption(item.caption);
						this.form.bringToFront();
					}else system.alert(this,"Maaf, Permintaan tidak dapat dilanjutkan" + temp,"Form lagi dilock");
					break;
			}
			if (this.form != undefined){		
				this.hideMainComp();
				this.dbLib.addUserFormAccess(this.app._userLog, temp, this.app._kodeLokfa, this.app._userSession, undefined, this);
				//this.sb.hide();				
				this.dashboard.hide();		
			}
			this.childBlock.hide();
			system.hideProgress();
			this.setActiveControl(undefined);
			this.bExit.setHint("Exit");
		}catch(e){
			system.alert(this,"[fMain]::treeClick : " + e,"Error Class ::"+temp);
			this.childBlock.hide();
			system.hideProgress();
		}
	},
	loadMenu: function(dataMenu, str){
		try{					
			this.block();
			this.app._mainForm.showProgress();
			var menu = dataMenu;
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
			system.alert(this,"[fMain]::loadMenu : " + itemValues +" ",e);
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
				this.childBlock.setWidth(this.getWidth());
				this.childBlock.setHeight(this.getHeight() - 87);
				if (this.pCaption){
					this.pCaption.setWidth(width);
					this.pButton.setWidth(width);
					this.reportNavigator.setWidth(width);
					this.bTutup.setLeft(width-90);
					this.pTool.setWidth(width);
					this.lblCaption.setWidth(this.getWidth());
				}
				if (this.btnList !== undefined){
					this.btnList.setLeft(this.getWidth() - 50);	  	  	  					
				}
				
				//this.sb.setWidth(this.width);
				//this.sb.setTop(this.getHeight() - 50 );				
				var appChild = this.childs;	
				var res = undefined;
				for (var i in appChild.objList){
					res = window.system.getResource(appChild.objList[i]);		
					if (res instanceof childForm)					
						res.maximize();					
				}				
			}catch(e){
				system.alert(this,"Resize :" + e,"");
			}
		}
		if (this.dashboard){			
			if (this.treev.isVisible()){
				this.dashboard.setLeft(420);
				this.dashboard.setWidth(this.width - 430);
				
			}else {
				this.dashboard.setLeft(10);
				this.dashboard.setWidth(this.width - 10);
				
			}			
			this.dashboard.setHeight(this.treev.height);					
			this.dashboard.refreshScreen(this.dashboard.width, this.dashboard.height);			
		}
	},
	getUserMenu: function(){  		   
	   this.dbLib.getDataXMLA("select * from menu where kode_klp = '"+this.app._kodeMenu+"' order by kode_klp, rowindex", undefined, this);			
	},
	doRequestReady: function(sender, methodName, result, callObj, connection){
		try{						
			if (sender == this.dbLib && callObj == this){				
				switch (methodName){
					case "listData" : 
					    if (result != undefined){
							this.menuStr = result;												
						}
						break;					
					case "getDataProvider" :																	
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
			error_log(e+":"+result);
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
		//this.sb.message(type, message);
	},
	doActivate: function(){
	},
	doClose: function(sender){	
		this.app.restart();
		
		if (this.dashboard) this.dashboard.io.disconect();
		/*
		//-----
		this.dashboard.dataProvider2.unregister(this.dashboard.msgBoard.msg.sessionId);
		//-----
		if (window.parent) window.parent.frameLoader.style.zIndex = 0;
		this.app.restart();
		*/
	},//
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
		if (this.runTCODE(this.cb1.getText()) ){
			var count = this.cb1.capacity(); 
			if (count == 50)  
				this.cb1.delItem((count - 1));		
			this.cb1.addItem(count, this.cb1.getText());
		}
	},
	runTCODE: function(tcode, param){
		try{
			if (this.app == undefined) this.app = this.getApplication();
			if (this.app._klpAkses[tcode] == undefined && !this._openAccess){
				system.alert(this,"Anda tidak ada akses untuk form "+tcode+" ","Hubungi administrator anda");
				system.hideProgress("load "+kodeForm);
				return false;
			}
			this.pTrans.setLeft(2);			
			if (this.form != undefined) this.form.free();
			this.form = undefined;
			uses("server_util_arrayMap");
			fields = new server_util_Map();	
			fields.set(0, "kode_form");	
			values = new server_util_Map();	
			values.set(0, tcode);
			this.alertFormLisence = false;
			//var temp = this.dbLib.locateData("m_form",fields, values, "form");
			var rs = this.dbLib.getDataProvider("select a.form from m_form a inner join menu b on b.kode_form = a.kode_form where b.kode_klp = '"+this.app._kodeMenu+"' and a.kode_form = '"+tcode+"' ",true);
			var temp;
			if (rs.rs.rows[0])
				temp = rs.rs.rows[0].form;
			
			if (temp != undefined && temp != "" && temp.indexOf("error") === -1)
			{
				this.checkLockTrans();
				if (this.app._mainFormLock) return false;			
				uses(temp,this.alwaysLoad);
				if (param)
					var script = "this.form = new "+temp+"(this, param);"+
								"this.form.setTop(this.childTop); "+
								"this.form.show();    	";
				else var script = "this.form = new "+temp+"(this);"+
								"this.form.setTop(this.childTop); "+
								"this.form.show();    	";
				eval(script);			
				this.form.bringToFront();
				this.dashboard.hide();		
			}else return system.alert(this, temp,"");
			if (this.form != undefined)
			{
				this.treev.hide();
				//this.sb.hide();
				//this.slider.hide();
				this.form.maximize();
				//this.marquee.stop();
				//this.marquee.hide();		
			} 
			this.bExit.setHint("Exit");
			
			return true;
		}catch(e){
			error_log(e);
		}
	},
	doBtnList: function(sender){		
		//this.dashboard.setVisible(!this.dashboard.visible);
		//if (this.msgBoard.visible) this.msgBoard.bringToFront();		
		try{
			this.pView.setVisible(!this.pView.visible);
		}catch(e){
			error_log(e);
		}
	},
	doTimer: function(sender){
		try{			
		}catch(e){
			alert("Error: "+e+" ");
		}
	},
	gotoFrontEnd: function(sender){			
	},
	checkLockTrans: function(form){	
		this.app._mainFormLock = false;
		/*var dtLock = this.dbLib.getDataProvider("select a.kode_form, b.nama_form, a.keterangan from sys_lockform a inner join m_form b on b.kode_form = a.kode_form  where a.kode_form = '"+form+"' ",true);
		this.app._mainFormLock = true;
		if (typeof data != "string")
		{
			if (dtLock.rs.rows[0]){
				var line = dtLock.rs.rows[0];
				this.app._mainFormLock = true;		
				system.alert(this,"Transaksi "+line.nama_form+" telah dikunci.",line.keterangan);
			}
		}	*/
		return false;	
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
			system.alert(this,e,"");
		}
	},
	loadLisence: function(){		
	},
	isValidLisence: function(form){
		return true;
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
            this.form.bringToFront();            
            this.dashboard.hide();		
        }       
    },
	loadWidgets: function(){				
	},
	doObjectReady: function(sender){		
	},
	doTimerWidget: function(sender){		
	},
	updateWidget: function(){		
	},
	openNewWindow: function(sender){
		setCookie("roojuid",this.app._userLog,1);		
		setCookie("roojpwd",this.app._userPwd,1);		
		setCookie("dbSetting",this.app._dbSetting,1);
		setCookie("rfcSetting",this.app._rfcSetting,1);
		setCookie("appState",this.app._appState,1);
		window.open("app.php?app="+this.app.className);
	},
	openNewWindow2: function(sender){
		setCookie("roojuid","",-100);
		setCookie("roojpwd","",-100);	
		setCookie("dbSetting",this.app._dbSetting,-1);
		setCookie("rfcSetting",this.app._rfcSetting,-1);
		setCookie("appState",this.app._appState,-1);
		window.open(".");
	}
});
