//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_fileExplorer_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_fileExplorer_fMain.prototype.parent.constructor.call(this, owner);			
			this._mainButtonClick = new portalui_eventHandler();						
			this.title = "RRA Online";
			document.title = "RRA";
			this._isLogedIn	= false;
			this.app._kodeMenu = "RRA";
			this._userLog = "";
			this._lokasi = "";
			this._pp = "";
			this.alwaysLoad = true;
			this._openAccess = true;
			this.activeChildForm = undefined;
			//this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();							
			uses("saiCB;radioButton;saiLabelEdit;image;imageButton;button;timer;label;saiCBBL;panel;reportNavigator;treeView;treeNode;statusBar;util_addOnLib;util_standar;imageButton;saiGrid");					
			this.className  = "fMain";			
			this.formCaption = "File Explorer";	
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
			this.bCancel = new imageButton(this.pTool,{bound:[325,5,17,15],hint:"Cancel",image:"icon/"+system.getThemes()+"/bCancel2.png"});
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
//------------------------------------ panel Editor-------------------------		
			this.pQuery = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bExec = new imageButton(this.pQuery,{bound:[10,3,18,18],noImage:true,hint:"Execute",image:"icon/"+system.getThemes(0)+"/execObj.png"});			
//------------------------------------ panel Message-------------------------		
			this.pMsg = new panel(this.pButton,{bound:[2,1,500,26],visible:false,border:0,color:"url(image/whitegradblue.jpg)"});
			this.bSend = new button(this.pMsg,{bound:[10,3,80,18],caption:"Send",click:[this,"mainButtonClick"],hint:"Send Message",icon:"url(icon/"+system.getThemes()+"/send.png)"});											
//---------------------------------------------- image
			this.cek=0;
			this.step=0;
			this.sb = new statusBar(this,{bound:[0,this.height - 50,this.width,30],visible:false});
//----------------------------------------------- Marquee		    						
			this.childBlock = new panel(this,{bound:[0,87,this.width,this.getHeight() - 87],visible:false});		    
			this.childBlock.addStyle("z-Index:999999");			
			this.load = new image(this.childBlock,{bound:[this.width / 2 - 15,this.height / 2 - 30,31,31],image:"image/gridload.gif"});
			this.label = new label(this.childBlock,{bound:[this.width / 2 - 30,this.height / 2 - 50,80,18],caption:"L o a d i n g . . . . .",color:"#000099"});			
//--------------------------------`------------------
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
window.app_fileExplorer_fMain.extend(window.form);
window.app_fileExplorer_fMain.implement({
	gotoLogin: function(){
		this.initDashboard();		
	},	
	hideMainComp: function(){				
	},
	initDashboard: function(){		
		try{
			uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_fileExplorer_dashboard;fileExplorer;listView;util_file;PopUpMenu;MenuItem");			
			this.form = new app_fileExplorer_dashboard(this,{bound:[0, this.childTop + 20, this.width - 2, this.height -  this.childTop - 25]});					
		}catch(e){
			error_log(e);
		}
	},
	doAfterLogin: function(){
		try{		    
						
			this.sb.setText1(this.app._namaUser, "image/userinfo.png");
			this.sb.setText2(this.app._periode+":"+this.app._appState);		
			this.childBlock.show();
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
			
			this._periode = this.app._periode;
			this.menuStr = "";																													
			this.cek = 1;										
			this.childBlock.hide();						
			//Query untuk inbox -- hasilnya di doRequestReady = sender = this.dbLib2 && connection == this.msgBoard.ajax						
		}catch(e){
			system.alert(this,e,"");
		}
	},	
	initParam: function(str){	
		try{					
		}catch(e){
			system.alert(this,e,"");
		}
	},
	initLoad: function(){
		try{	   	  
			if (!this.menuIsLoaded){				
			}
		}catch(e){
			system.alert(this,"[fMain]::initLoad :"+e,"");
		}
	},
	bTutupClick: function(sender){	
		try{			
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
	},
	mainButtonClick: function(sender){
		this._mainButtonClick.call(this, sender);
	},
	treeClick: function(item){
		try{							
		}catch(e){
			system.alert(this,"[fMain]::treeClick : " + e,"Error Class ::"+temp);
			this.childBlock.hide();
			system.hideProgress();
		}
	},
	loadMenu: function(dataMenu, str){
		try{								
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
		if (this.form){
			this.form.setLeft(10);
			this.form.setWidth(this.width - 10);		
			this.form.setHeight(this.height - this.childTop - 20);					
			this.form.refreshScreen(this.form.width, this.form.height);					
		}
	},
	getUserMenu: function(kodeMenu){  		   	   
	},
	doRequestReady: function(sender, methodName, result, errCode, connection){
		try{						
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
			system.alert(this,e,result);
		}
	},
	initScreen: function(){
		try{						
		}catch(e){
			alert(e);
		}
	},
	initReport: function(form, report, doSelectedPage, doBtnClick, doRowPerPageChange, hideNavigator, items){		
	},
	pesan: function(type, message){ 
		this.sb.message(type, message);
	},
	doActivate: function(){
	},
	doClose: function(sender){				
	},
	showProgress: function(sender){	
		system.showProgress();
	},
	hideProgress: function(sender){	
		system.hideProgress();
	},
	doSave: function(sender){		
	},
	createSession: function(sender){		
		this.app.restart();
	},
	doMenuKeyDown: function(sender, keyCode){			
	},
	doExecuteMenu: function(sender){		
	},
	doBtnList: function(sender){				
	},
	doTimer: function(sender){
		try{			
		}catch(e){
			alert("Error: "+e+" ");
		}
	},
	gotoFrontEnd: function(sender){	
		system.openFrontEnd();
	},
	checkLockTrans: function(sender){			
	},
	doFindText: function(sender){		
	},
	doChat: function(sender){
		try{					
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
	},
	doRecall: function(sender){	            
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
		window.open("index.php?app="+this.app.className);
	},
	doSplitClick: function(sender){		
	}
});
