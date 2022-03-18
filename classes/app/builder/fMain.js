//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_builder_fMain.prototype.parent.constructor.call(this, owner);
			window.app_builder_fMain.prototype.parent.setWidth.call(this, document.body.offsetWidth);
			window.app_builder_fMain.prototype.parent.setHeight.call(this, document.body.offsetHeight);
			this._mainButtonClick = new portalui_eventHandler();
			this.title = "jamboo Builder (jIDE)";		
			this.setCloseToHide(false);
			this.alwaysLoad = true;
			this.activeChildForm = undefined;
			this.onClose.set(this,"doClose");
			//this.setFormButton(2);
			this.centerize();					
			uses("portalui_saiCB;portalui_image;portalui_imageButton;portalui_button;portalui_label;portalui_saiLabelEdit;portalui_panel;portalui_treeView;portalui_treeNode;util_file;util_addOnLib;util_standar;portalui_mainMenu;portalui_MenuForm;portalui_PopUpMenu;portalui_MenuItem;portalui_sysForm;portalui_radioButton;portalui_checkBox;portalui_groupBox;portalui_bevel;portalui_flashObj;portalui_saiGrid;portalui_pageControl;portalui_childPage");
			this.className  = "fMain";
			this.formCaption = "jamboo IDE";	
			this.setCaption(this.formCaption);					
			this.maximize();						
			this.mainMenu = new portalui_mainMenu(this);		
			this.mainMenu.addItem("File","");			
			this.mainMenu.addItem("Project","");			
			this.mainMenu.addItem("Tools","");			
			this.mainMenu.addItem("Window","");			
			this.mainMenu.addItem("Help","");			
			
			this.fileMnu = new portalui_PopUpMenu(this);		
				this.mnuNew = new portalui_MenuItem(this.fileMnu);
				this.mnuNew.setCaption("New");					
				this.mnuNew.setIcon("icon/dynpro/edit.png");
				this.mnuNew.onClick.set(this,"doMenuClick");												
					var mnu = new portalui_MenuItem(this.mnuNew);
					mnu.setCaption("Application");					
					mnu.setData("this.designApp.show();","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					
					mnu = new portalui_MenuItem(this.mnuNew);
					mnu.setCaption("Form");					
					mnu.setData("this.designFrm.show();","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					
					mnu = new portalui_MenuItem(this.mnuNew);
					mnu.setCaption("Web Application");				
					mnu.setData("this.designWeb.show();","EVENT");					
					mnu.onClick.set(this,"doMenuClick");
				
				this.mnuSpr = new portalui_MenuItem(this.fileMnu);
				this.mnuSpr.setCaption("-");				
					
					mnu = new portalui_MenuItem(this.fileMnu);
					mnu.setCaption("Save");					
					mnu.setIcon("icon/dynpro/save.png");
					mnu.setData("SAVE","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					
					mnu = new portalui_MenuItem(this.fileMnu);
					mnu.setCaption("Open");					
					mnu.setData("this.app.openDlg(this,'Open Project',this,'classes/app','Project',undefined)","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					
					mnu = new portalui_MenuItem(this.fileMnu);
					mnu.setCaption("Close Project");					
					mnu.onClick.set(this,"doMenuClick");
					
				this.mnuSpr = new portalui_MenuItem(this.fileMnu);
				this.mnuSpr.setCaption("-");
				this.mnuExit = new portalui_MenuItem(this.fileMnu);
				this.mnuExit.setCaption("Exit");
				this.mnuExit.setData("this.close()","EVENT");
				this.mnuExit.onClick.set(this,"doMenuClick");
			this.toolsMnu = new portalui_PopUpMenu(this);		
				mnu = new portalui_MenuItem(this.toolsMnu);
				mnu.setCaption("Compress");				
				mnu = new portalui_MenuItem(this.toolsMnu);
				mnu.setCaption("Reverse Enginering");												
			this.projectMnu = new portalui_PopUpMenu(this);		
				mnu = new portalui_MenuItem(this.projectMnu);
				mnu.setCaption("Run");		
				mnu.setData("RUN","EVENT");				
				mnu.onClick.set(this,"doMenuClick");
				mnu = new portalui_MenuItem(this.projectMnu);
				mnu.setCaption("Debug");
				mnu.onClick.set(this,"doMenuClick");
				mnu = new portalui_MenuItem(this.projectMnu);
				mnu.setData("PROPERTY","EVENT");
				mnu.setCaption("Properties");
			
			this.windowMnu = new portalui_PopUpMenu(this);		
				mnu = new portalui_MenuItem(this.windowMnu);
				mnu.setCaption("Pallete");				
				mnu.setData("this.compList.show();","EVENT");				
				mnu.onClick.set(this,"doMenuClick");
				mnu = new portalui_MenuItem(this.windowMnu);
				mnu.setData("this.editorFrm.show();","EVENT");
				mnu.onClick.set(this,"doMenuClick");
				mnu.setCaption("Source");				
				mnu = new portalui_MenuItem(this.windowMnu);
				mnu.setData("this.appMainForm.show();","EVENT");
				mnu.setCaption("Design");	
				mnu.onClick.set(this,"doMenuClick");
				mnu = new portalui_MenuItem(this.windowMnu);
				mnu.setData("this.propertyFrm.show();","EVENT");
				mnu.setCaption("Property");	
				mnu.onClick.set(this,"doMenuClick");
				mnu = new portalui_MenuItem(this.windowMnu);
				mnu.setData("this.designDbg.show();","EVENT");
				mnu.setCaption("Application Message");	
				mnu.onClick.set(this,"doMenuClick");
				
			this.helpMnu = new portalui_PopUpMenu(this);		
				this.mnuHelp = new portalui_MenuItem(this.helpMnu);
				this.mnuHelp.setCaption("View Help");				
				this.mnuSpr = new portalui_MenuItem(this.helpMnu);
				this.mnuSpr.setCaption("-");
				this.mnuAbout = new portalui_MenuItem(this.helpMnu);
				this.mnuAbout.setCaption("About smsIt");				
				
			this.mainMenu.items[0].setPopUpMenu(this.fileMnu);						
			this.mainMenu.items[1].setPopUpMenu(this.projectMnu);
			this.mainMenu.items[2].setPopUpMenu(this.toolsMnu);						
			this.mainMenu.items[3].setPopUpMenu(this.windowMnu);						
			this.mainMenu.items[4].setPopUpMenu(this.helpMnu);						
			
			this.pTool = new portalui_panel(this,{bound:[0,20,this.width,30],color:system.getConfig("app.color.panel"),shadow:true});				
			this.bRun = new portalui_imageButton(this.pTool,{bound:[5,5,17,15],hint:"Execute", image:"icon/"+system.getThemes()+"/ok.png",click:[this, "doExecuteMenu"]});
			this.bSave = new portalui_imageButton(this.pTool,{bound:[235,5,17,15],hint:"Save",click:[this,"doSave"], hint:"Save",image:"icon/"+system.getThemes()+"/bSave2.png"});			
			this.separator1 = new portalui_image(this.pTool,{bound:[260,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bBack = new portalui_imageButton(this.pTool,{bound:[265,5,17,15],hint:"Back",image:"icon/"+system.getThemes()+"/bBack.png"});
			this.bExit = new portalui_imageButton(this.pTool,{bound:[285,5,17,15],hint:"Exit",image:"icon/"+system.getThemes()+"/bExit.png",click:[this,"bTutupClick"]});
			this.bCancel = new portalui_imageButton(this.pTool,{bound:[305,5,17,15],hint:"Cancel",image:"icon/"+system.getThemes()+"/bCancel2.png"});
			this.separator2 = new portalui_image(this.pTool,{bound:[325,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bFind = new portalui_imageButton(this.pTool,{bound:[330,5,17,15],hint:"Search",image:"icon/"+system.getThemes()+"/bFind.png",click:[this,"doFindText"]});
			this.separator3 = new portalui_image(this.pTool,{bound:[347,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bNew = new portalui_imageButton(this.pTool,{bound:[350,5,17,15],hint:"Create Session",image:"icon/"+system.getThemes()+"/bCreateSession.png",click:[this,"createSession"]});
			this.bClose = new portalui_imageButton(this.pTool,{bound:[369,5,17,15],hint:"End Session",image:"icon/"+system.getThemes()+"/bEndSession.png",click:[this,"doClose"]});
			this.separator3 = new portalui_image(this.pTool,{bound:[389,3,2,20],image:"icon/"+system.getThemes()+"/separator.png"});
			this.bHelp = new portalui_imageButton(this.pTool,{bound:[394,5,17,15],hint:"Help",image:"icon/"+system.getThemes()+"/bHelp.png"});									
			this.childTop = 84;
			this.initiated = true;
			//this.setImage("url(image/themes/"+system.getThemes()+"/logo.png)top left ");							
			this.setBorderStyle(bsSingle);
			this.doAfterLogin();			 
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_builder_fMain.extend(window.portalui_sysForm);
window.app_builder_fMain.implement({
	initLoad: function(){
		try{
			//----------------------------------------------------------------- tree View-----------------------------------			
			this.compList = new portalui_panel(this,{bound:[10,60,220,200],caption:"Pallete",closeToHide:true,visible:true, afterResize:[this,"doFormResize"], borderStyle:bsSizeToolWin});								
			this.treev = new portalui_treeView(this.compList,{bound:[0,20,220, this.compList.height - 22], childLenght:250});						
			this.treev.onDblClick.set(this, "treeClick");			
			this.listComponent = new portalui_treeNode(this.treev,{caption:"Component"});			
			this.listUtil = new portalui_treeNode(this.treev,{caption:"Utilitize"});			
			//--------------------------------------------------			
			this.editorFrm = new portalui_pageControl(this,{bound:[240,60,system.screenWidth - 240,system.screenHeight - 200],childPage:["New Script"]});
			//this.editor = new portalui_flashObj(this.editorFrm, {bound:[0,20,this.editorFrm.width, this.editorFrm.height - 20],flashFile:"jambooIDE-debug/jambooIDE.swf"});											
			//---------------------------------
			this.propertyFrm = new portalui_panel(this,{bound:[10,265,220,system.screenHeight - 400],caption:"Object Inspector",closeToHide:true, visible:true, afterResize:[this,"doFormResize"], borderStyle:bsSizeToolWin});														
			this.pageCtrl = new portalui_pageControl(this.propertyFrm,{bound:[0,20,this.propertyFrm.width, this.propertyFrm.height - 25],color:"transparent"});
			this.page1 = new portalui_childPage(this.pageCtrl,{caption:"Property"});
			this.page2 = new portalui_childPage(this.pageCtrl,{caption:"Event"});
			this.sgProp = new portalui_saiGrid(this.page1, {bound:[0,0,this.propertyFrm.width, this.propertyFrm.height - 50],colCount:2,colTitle:["Property","Value"],columnReadOnly:[true, [0],[1]],colWidth:[[0,1],[100,80]],allowBlank:true, change:[this,"doSgChange"]});
			this.sgEvent = new portalui_saiGrid(this.page2, {bound:[0,0,this.propertyFrm.width, this.propertyFrm.height - 50],colCount:2,colTitle:["Event","Value"],columnReadOnly:[true, [0],[1]],colWidth:[[0,1],[100,80]],allowBlank:true, change:[this,"doSgChange"]});
			/*Form ini untuk Create Form*/
			this.designFrm = new portalui_sysForm(this.app,{bound:[310,200,550,270],caption:"Create Form",visible:false, resizeAble:false,closeToHide:true, borderStyle:bsSizeToolWin});											
			this.eClass = new portalui_saiLabelEdit(this.designFrm,{bound:[20,10,500,20],caption:"Name"});
			this.gGroup = new portalui_groupBox(this.designFrm,{bound:[20,30,500,50],caption:"Form Type",border:1});
			this.rbNormal = new portalui_radioButton(this.gGroup,{bound:[20,5,150,20],caption:"Normal"});
			this.rbMdi = new portalui_radioButton(this.gGroup,{bound:[180,5,150,20],caption:"MDI Form"});
			this.rbMdiChild = new portalui_radioButton(this.gGroup,{bound:[350,5,150,20],caption:"MDI Child"});			
			this.eFolder = new portalui_saiLabelEdit(this.designFrm,{bound:[20,90,400, 20],caption:"Path",text:"app"});
			this.cbAuto = new portalui_checkBox(this.designFrm,{bound:[20,113,150,20],caption:"Auto Create"});			
			this.bFolder = new portalui_button(this.designFrm,{bound:[430,90,80,18],caption:"Open",click:[this,"alert(this,'testing','')"]});
			this.pButton = new portalui_bevel(this.designFrm,{bound:[0,this.designFrm.height - 50,this.designFrm.width, 25],border:1});
			this.bFrmOk = new portalui_button(this.designFrm,{bound:[10,this.designFrm.height - 47,80,18],caption:"Create",click:[this,"doCreateForm"]});
			this.bFrmCancel = new portalui_button(this.designFrm,{bound:[100,this.designFrm.height - 47,80,18],caption:"Cancel",click:[this,"doCreateForm"]});			
			/*Form ini untuk Create Application*/
			this.designApp = new portalui_sysForm(this.app,{bound:[310,200,550,300],caption:"Create Application",visible:false, resizeAble:false,closeToHide:true, borderStyle:bsSizeToolWin});											
			this.eAppClass = new portalui_saiLabelEdit(this.designApp,{bound:[20,10,500,20],caption:"Name"});
			this.gAppGroup = new portalui_groupBox(this.designApp,{bound:[20,30,500,50],caption:"Application Type"});
			this.rbAppNormal = new portalui_radioButton(this.gAppGroup,{bound:[20,5,150,20],caption:"Normal",selected:true});
			this.rbAppService = new portalui_radioButton(this.gAppGroup,{bound:[180,5,150,20],caption:"Service"});			
			this.eAppTitle = new portalui_saiLabelEdit(this.designApp,{bound:[20,90,400, 20],caption:"Title",text:""});
			this.eAppFrmClass = new portalui_saiLabelEdit(this.designApp,{bound:[20,110,500,20],caption:"Class Form"});
			this.gGroup = new portalui_groupBox(this.designApp,{bound:[20,130,500,50],caption:"Form Type",border:1});
			this.rbAppFrmNormal = new portalui_radioButton(this.gGroup,{bound:[20,5,150,20],caption:"Normal",selected:true});
			this.rbAppFrmMdi = new portalui_radioButton(this.gGroup,{bound:[250,5,150,20],caption:"MDI Form"});			
			this.eAppFolder = new portalui_saiLabelEdit(this.designApp,{bound:[20,190,400, 20],caption:"Path",text:"app"});
			this.bAppFolder = new portalui_button(this.designApp,{bound:[430,190,80,18],caption:"Open",click:[this,"alert('testing')"]});
			this.pAppButton = new portalui_bevel(this.designApp,{bound:[0,this.designApp.height - 50,this.designApp.width, 25],border:1});
			this.bAppOk = new portalui_button(this.designApp,{bound:[10,this.designApp.height - 47,80,18],caption:"Create",click:[this,"doCreateApp"]});
			this.bAppCancel = new portalui_button(this.designApp,{bound:[100,this.designApp.height - 47,80,18],caption:"Cancel",click:[this,"doCreateApp"]});			
			/*Form ini untuk Create Web Application*/
			this.designWeb = new portalui_sysForm(this.app,{bound:[310,200,550,270],caption:"Create Web",visible:false, resizeAble:false,closeToHide:true, borderStyle:bsSizeToolWin});											
			this.eWebClass = new portalui_saiLabelEdit(this.designWeb,{bound:[20,10,500,20],caption:"Name"});
			this.eWebFolder = new portalui_saiLabelEdit(this.designWeb,{bound:[20,90,400, 20],caption:"Folder",text:"www"});
			this.bWebFolder = new portalui_button(this.designWeb,{bound:[430,90,80,18],caption:"Open",click:[this,"alert('testing')"]});
			this.pWebButton = new portalui_bevel(this.designWeb,{bound:[0,this.designWeb.height - 50,this.designWeb.width, 25],border:1});
			this.bWebOk = new portalui_button(this.designWeb,{bound:[10,this.designWeb.height - 47,80,18],caption:"Create",click:[this,"doCreateWeb"]});
			this.bWebCancel = new portalui_button(this.designWeb,{bound:[100,this.designWeb.height - 47,80,18],caption:"Cancel",click:[this,"doCreateWeb"]});			
			
			this.designDbg = new portalui_panel(this,{bound:[0,system.screenHeight - 105,system.screenWidth,100],caption:"Process Message",visible:true, resizeAble:false,closeToHide:true, borderStyle:bsSizeToolWin});											
			this.dbgMsg = new portalui_control(this.designDbg,{bound:[0,20,this.designDbg.width,100]});			
			this.dbgMsg.addStyle("overflow:auto;padding:5px");			
			uses("app_builder_component_controls_control;app_builder_component_controls_containerControl;app_builder_component_controls_commonForm;app_builder_component_controls_sysForm");								
			this.getComponent();					
			//var conn = "host:Driver={SQL Server};Server=localhost;Database=yakes#user:sa#pass:#driver:ado_mssql";
			//var connMysql = "host:localhost#user:root#pass:sai#database#dbkopeg#driver:mysqlt";
			//this.dbLib = new util_dbLib(undefined, conn);			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	hideMainComp: function(){
		this.treev.hide();					
	},
	doAfterLogin: function(){
		try{		    			
			//this.dbLib = new util_dbLib();
			//this.dbLib.addListener(this);
			this.fileLib = new util_file();
			this.fileLib.addListener(this);
			this.rootDir = this.fileLib.getRootDir();	
			this.separator = this.rootDir.charAt(this.rootDir.length-1);			
			this.rootDir = this.rootDir.substr(0,this.rootDir.length-2);
			this.rootDir = this.rootDir.substr(0,this.rootDir.lastIndexOf(this.separator));			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	initParam: function(str){	
		try{					
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	bTutupClick: function(sender){	
		try{			
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
	},
	mainButtonClick: function(sender){
		this._mainButtonClick.call(this, sender);
	},
	treeClick: function(item){
		try{							
			var activeForm = this.appMainForm;
			if (item.owner instanceof portalui_treeNode){				
				if (item.owner.caption == "Component"){
					var comp = item.caption;			
					uses("app_builder_component_controls_"+comp,true);	
					if (activeForm !== undefined){												
						var owner = activeForm;
					}
					if (this.selectedCtrl instanceof app_builder_component_controls_containerControl)
						owner = this.selectedCtrl;					
					if (owner.className == "portalui_FEtabPanel" && owner.childPage.length > 0){
						eval("var a = new app_builder_component_controls_"+comp+"(owner.childPage[owner.activePage], {bound:[10,30, 100,20],caption:'"+comp+"'});");
					}else 
						eval("var a = new app_builder_component_controls_"+comp+"(owner, {bound:[10,30, 100,20],caption:'"+comp+"'});");
					a.onSelectCtrl.set(this,"doSelectCtrl");										
					a.onPropertyChange.set(this,"doPropertyChange");	
				}
			}
			
		}catch(e){
			systemAPI.alert("[fMain]::treeClick : " + e,"Error Class ::"+comp);			
		}
	},
	loadMenu: function(dataMenu, str){		
	},
	doAfterResize: function(width, height){
		this.setWidth(width);		
		if (this.mainMenu !== undefined){
			this.mainMenu.setWidth(width);
			this.pTool.setWidth(width);
		}
	},
	getUserMenu: function(kodeMenu){  		   
	   
	},
	doRequestReady: function(sender, methodName, result){
		try{
			
		}catch(e){
			this.childBlock.hide();
			systemAPI.alert(e);
		}
	},
	initScreen: function(){
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
	doExecuteMenu: function(sender){		
	},
	doBtnList: function(sender){		
	},
	doTimer: function(sender){		
	},
	gotoFrontEnd: function(sender){			
	},
	checkLockTrans: function(sender){			
	},
	doFindText: function(sender){		
	},
	testRun: function(){
		try{		
			if (this.appCreate !== undefined)
				this.appCreate.run();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	createNewForm : function(){		
	},
	getChildClass: function(obj,lvl){		
		var xml = "";
		for (var i=0;i < lvl;i++) xml += "\t";
		xml += "<"+obj.className;		
		if (obj instanceof portalui_sysForm || obj instanceof portalui_form){
			xml += " width='"+obj.width+"' height='"+obj.height+"' top='"+obj.top+"' left='"+obj.left+"' id='"+obj.name+"' ";
		}else{
			var pro = obj.getProperty();
			for (var i in pro){ 
				if (i != "className"){
					if (i == "name")
						xml += " id='" + pro[i]+"' ";
					else
						xml += " "+i + "='" + pro[i]+"' ";										
				}
			}
		}
		xml += ">\r\n";		
		var child;		
		if (obj.isContainer){			
			for (var i in obj.childs.objList){
				child = system.getResource(i);
				if (child instanceof app_builder_component_controls_control){
					xml += this.getChildClass(child,lvl+1);
				}
			}
		}
		for (var i=0;i < lvl;i++) xml += "\t";
		xml += "</"+obj.className +">\r\n";
		return xml;
	},
	buildScript: function(obj){		
		var script = "";
		this.dbgMsg.getCanvas().innerHTML += "create "+obj+"</br>";
		if (obj instanceof portalui_sysForm || obj instanceof portalui_form){
			script += "window.app_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText()+" = function(owner){ "+
					"window.app_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText()+".prototype.parent.constructor.call(this,owner);"+
					"this.setBound("+obj.left+","+obj.top+","+obj.width+","+obj.height+");"+
					"this.setName('"+this.eAppFrmClass.getText()+"');";
		}else{
			var pro = obj.getProperty();						
			this.needClass += ";"+obj.className;
			var options = "bound:["+obj.left+","+obj.top+","+obj.width+","+obj.height+"]";			
			for (var i in pro){ 
				if (i != "className"){				
					if (typeof pro[i] == "string")
						options+= "," + i +":'"+ pro[i]+"'";
					else
						options+= "," + i +":"+ pro[i];
				}
			}
			var event = obj.getEvent();									
			if (obj.owner instanceof portalui_sysForm || obj.owner instanceof portalui_form)
				script += "this."+obj.name+" = new "+obj.className+"(this,{"+options+"});";
			else	
				script += "this."+obj.name+" = new "+obj.className+"(this."+obj.owner.name+",{"+options+"});";			
		}		
		var child;		
		if (obj.isContainer){			
			for (var i in obj.childs.objList){
				child = system.getResource(i);
				if (child instanceof app_builder_component_controls_control){
					script += this.buildScript(child);
				}
			}
		}
		if (obj.className == "portalui_sysForm" || obj.className == "portalui_form"){
			script += "};window.app_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText()+".extend("+obj.className+");";		
			script += this.editor.getObject().getSource();
		}
		return script;
	},
	doMenuClick: function(sender){
		try{
			if (sender.getData() == "SAVE"){
				var text = this.editor.getObject().getSource();				
				var activeForm = this.activeDesigner;				
				this.fileLib.setContents(text,undefined,this.rootDir+this.separator+"classes"+this.separator+"app"+this.separator+this.eAppClass.getText()+this.separator+activeForm.getName()+".js");				
				var xml = "";				
				xml += this.getChildClass(activeForm,1);								
				xml += "";					
				this.fileLib.setContents(xml,undefined,this.rootDir+this.separator+"classes"+this.separator+"app"+this.separator+this.eAppClass.getText()+this.separator+activeForm.getName()+".jui");				
			}else if (sender.getData() == "RUN"){						
				if (this.appClassName == undefined) throw("Please create application");
				eval("this.appCreate = new "+this.appClassName+"(system);");
				this.needClass="";		
				this.dbgMsg.getCanvas().innerHTML += "build:"+this.eAppFrmClass.getText()+"<br/>";
				var script = this.buildScript(this.appMainForm);
				this.needClass= this.needClass.substr(1);		
				
				uses(this.needClass);
				eval(script);
				this.dbgMsg.getCanvas().innerHTML += "run:"+this.eAppFrmClass.getText()+"<br/>";
				eval("var testing = new app_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText()+"(this.appCreate);");												
				this.appCreate.run();				
			}else if (sender.getData() == "PROPERTY"){	
				
			}else eval(sender.getData());
		}catch(e){
			this.dbgMsg.getCanvas().innerHTML += "Error:"+e+"<br/>";
			systemAPI.alert(e);
		}
	},
	doCreateForm: function(sender){		
		try{
			if (sender == this.bFrmOk){
				var appForm;								
				appForm = new portalui_sysForm(this.app,{bound:[100,100,600,500],caption:"Form", name:this.eClass.getText()});					
				if (this.rbNormal.isSelected())
					appForm.setFormStyle(fsNormal);
				else if(this.rbMdi.isSelected()) 
					appForm.setFormStyle(fsMDIForm);						
				else{
					 if (this.appMainForm.isMDIForm()){
						appForm.setFormStyle(fsMDIChild);
						appForm.className = "portalui_childForm";
						this.appMainForm.MDIChild[this.appMainForm.MDIChild.length] = appForm;
					}else throw("No MDI ");
				}
				appForm.show();				
				appForm.autoCreate = this.cbAuto.isSelected();
				appForm.isDesigner = true;
				appForm.onActivate.set(this,"doActivateFrm");
				appForm.onMouseDown.set(this,"deselectAllCtrl");
			}
			this.designFrm.hide();			
		}catch(e){
			alert(e);
		}
	},
	doCreateApp : function(sender){
		try{
			if (sender == this.bAppOk){
				if (this.appCreate !== undefined)
					this.appCreate.terminate();
				var appName = this.eAppFolder.getText();
				appName = appName.charAt(appName.length-1) == "/" ? appName.substr(0,appName.length - 2) :appName;				
				var className = appName.replace(/[//]/gi,"_")+"_"+this.eAppClass.getText()+"_app";
				var classForm = appName.replace(/[//]/gi,"_")+"_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText();
				var script = "window."+className+" = function(owner){\r\n "+
							"	window."+className+".prototype.parent.constructor.call(this, owner);\r\n"+
							"	this.className = '"+className+"';\r\n"+							
							"	this.form = undefined;\r\n"+
							"	this.title = '"+this.eAppTitle.getText()+"';\r\n"+																					
							"};\r\n"+
							"window."+className+".extend(window.portalui_application);";
				this.appClassName = className;
				eval(script);
				script = "window."+className+" = function(owner){\r\n "+
							"\t\t\twindow."+className+".prototype.parent.constructor.call(this, owner);\r\n"+
							"\t\t\tthis.className = '"+className+"';\r\n"+							
							"\t\t\tthis.form = undefined;\r\n"+
							"\t\t\tthis.title = '"+this.eAppTitle.getText()+"';\r\n"+														
							"\t\t\tthis.showForm();\r\n"+
							"};\r\n"+
							"window."+className+".extend(window.portalui_application);\r\n"+
							"window."+className+".prototype.showForm= function(){\r\n"+
							"\t\ttry {\r\n"+
							"\t\t\tuses('portalui_form;portalui_sysForm'portalui_childForm');\r\n"+
							"\t\t\tuses('"+classForm+"');\r\n"+		
							"\t\t\tthis._mainForm = new "+classForm+"(this);\r\n"+	
							"\t\t\tthis.activeForm = this._mainForm;\r\n"+
							"\t\t\tthis.setActiveForm(this._mainForm);\r\n"+				
							"\t\t\tthis._mainForm.show();\r\n"+				
							"\t\t}catch(e){\r\n"+
							"\t\t\tsystemAPI.alert('[saku]::showMainForm:',e);\r\n"+
							"\t\t}\r\n"+
							"};\r\n"+
                            "window."+className+".extend(window.portalui_application);";	
				this.fileLib.setFilename(this.rootDir+"/classes/app");
				this.fileLib.createDir(this.eAppClass.getText());			
				this.fileLib.setContents(script,undefined,this.rootDir+this.separator+"classes"+this.separator+"app"+this.separator+this.eAppClass.getText()+this.separator+"app.js");								
				var owner = system.getResource(this.editorFrm.activePage);
				if (this.rbAppFrmNormal.isSelected()){										
					this.appMainForm = new app_builder_component_controls_sysForm(owner,{bound:[0,0,this.editorFrm.width,this.editorFrm.height - 20],caption:"Form",name:this.eAppFrmClass.getText()});
					this.appMainForm.setFormStyle(fsNormal);
				}else if(this.rbAppFrmMdi.isSelected()){					
					this.appMainForm = new app_builder_component_controls_sysForm(owner,{bound:[0,0,this.editorFrm.width,this.editorFrm.height - 20],caption:"MDIForm",name:this.eAppFrmClass.getText()});										
					this.appMainForm.setFormStyle(fsMDIForm);						
				}
				this.appMainForm.onMouseDown.set(this,"deselectAllCtrl");
				this.appMainForm.onKeyDown.set(this,"doFormKeyDown");												
				//this.appMainForm.show();
				//this.appMainForm.onActivate.set(this,"doActivateFrm");
				this.appMainForm.isDesigner = true;
				//this.editor.getObject().setSource("window.app_"+this.eAppClass.getText()+"_"+this.eAppFrmClass.getText()+".implement({\r\n});");
			}
			this.designApp.hide();
		}catch(e){
			alert(e);
		}
	},
	getComponent: function(){
		var compo = this.fileLib.listDir(this.rootDir+this.separator+"classes"+this.separator+"app"+this.separator+"builder"+this.separator+"component"+this.separator+"controls"+this.separator);			
		compo = compo.split(";");
		var comp, capt;
		for (var i in compo){
			if (compo[i] != "." && compo[i] != ".." && compo[i] != ""){
				capt = compo[i].replace(".js","");
				comp = new portalui_treeNode(this.listComponent,{caption:capt,icon:"classes/app/builder/component/icon/"+capt+".png"});
			}
		}
	},
	doSelectCtrl : function(sender){		
		try{
			var comp;			
			if (this.appMainForm !== undefined){
				 var owner = this.appMainForm;
			}
			for (var i=0;i < owner.childsIndex.length;i++){
				comp = system.getResource(owner.childsIndex[i]);				
				if (comp instanceof app_builder_component_controls_control && comp != sender  && comp.deselect)
					comp.deselect(sender);				
			}
			if (sender instanceof app_builder_component_controls_containerControl  && sender.deselect)
				sender.deselect(sender);				
			this.selectedCtrl = sender;
			if (this.selectedCtrl !== undefined){
				var prop = this.selectedCtrl.getProperty();
				var event = this.selectedCtrl.getEvent();
				this.sgProp.clear();
				this.sgEvent.clear();
				for (var i in prop) this.sgProp.appendData([i, prop[i]]);
				for (var i in event) this.sgEvent.appendData([i, event[i]]);
			}
		}catch(e){
			systemAPI.alert(e, comp);
		}
	},
	deselectAllCtrl: function(sender,event){		
		var target = document.all || window.opera ? event.srcElement : event.target;				
		if (target.id == this.appMainForm.getFullId()+"form") 
			this.doSelectCtrl(undefined);		
	},
	doFormKeyDown: function(sender, charCode, buttonState, keyCode){
		switch(keyCode){
			case 46: //delete
				this.selectedCtrl.free();
				this.selectedCtrl = undefined;
			break;
			case 37: //left
				if (this.selectedCtrl !== undefined) this.selectedCtrl.setLeft(this.selectedCtrl.left - 1);
			break;
			case 38: //top
				if (this.selectedCtrl !== undefined) this.selectedCtrl.setTop(this.selectedCtrl.top - 1);
			break;
			case 39://right
				if (this.selectedCtrl !== undefined) this.selectedCtrl.setLeft(this.selectedCtrl.left + 1);
			break;
			case 40://bottom
				if (this.selectedCtrl !== undefined) this.selectedCtrl.setTop(this.selectedCtrl.top + 1);
			break;
		}
		return false;
	},
	doSgChange: function(sender, col, row){	
		try{
			if (sender == this.sgProp){
				var prop = sender.cells(0,row).charAt(0).toUpperCase();
				prop = prop+ sender.cells(0,row).substr(1);				
				if ((sender.cells(1,row).search("%") == -1) && (sender.cells(0,row) == "left" || sender.cells(0,row) == "top" || sender.cells(0,row) == "width" || sender.cells(0,row) == "height" || sender.cells(0,row) == "border" || sender.cells(1,row) == "true" || sender.cells(1,row) == "false"))
					eval("this.selectedCtrl.set"+prop+"("+sender.cells(1,row)+");");				
				else eval("this.selectedCtrl.set"+prop+"('"+sender.cells(1,row)+"');");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPropertyChange: function(sender, name, value){
		try{
			this.sgProp.onChange.set(undefined, undefined);
			for (var i=0;i < this.sgProp.getRowCount();i++)
				if (this.sgProp.cells(0,i) == name)
					this.sgProp.setCell(1,i, value);
			this.sgProp.onChange.set(this, "doSgChange");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFormResize: function(sender, width, height){
		if (sender == this.compList){
			this.treev.setHeight(height);
			this.treev.setWidth(width);
		}
		if (sender == this.editorFrm){	
			this.editor.setHeight(height);
			this.editor.setWidth(width);
		}
		if (sender == this.propertyFrm){			
			this.pageCtrl.setHeight(height);
			this.pageCtrl.setWidth(width);
			this.sgProp.setWidth(this.pageCtrl.width);
			this.sgProp.setHeight(this.pageCtrl.height - 25);			
			this.sgEvent.setWidth(this.pageCtrl.width);
			this.sgEvent.setHeight(this.pageCtrl.height - 25);
		}
	},
	doKeyDown: function(charCode, buttonState, keyCode, event){
		if (buttonState.ctrlKey && keyCode == 86){
			alert(this.selectedCtrl);
		}
	},
	doActivateFrm: function(form){		
		this.activeDesigner = form;
	},
	doModalResult: function(sender, event, modalResult, value){
	    if (modalResult == mrOk && event == "open"){	       
           this.fileLib.setFilename(this.rootDir +"/"+value);	       
           var ext = this.fileLib.getExtension();
	       if (ext == ".js"){
           }else system.alert(this,"File tidak support untuk roojax IDE","Hanya support roojax classes Javascript");
        }
    }
});
