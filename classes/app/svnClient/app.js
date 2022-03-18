//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_svnClient_app= function(owner){
	window.app_svnClient_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_svnClient_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jamboo Builder(jIDE)");
	this.showForm();
};
window.app_svnClient_app.extend(window.portalui_application);
window.app_svnClient_app.implement({
	showForm: function(){
		try
		{			
			uses("util_dbLib;portalui_sysForm");			
			this._mainForm = new app_svnClient_fMain(this);			
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);				
			this._mainForm.show();								
			this._mainForm.maximize();
			this._mainForm.initload();
		}catch(e){
			systemAPI.alert("[saku]::showMainForm:",e);
		}
	},
	doTerminate: function(sender){	
	},	
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_svnClient_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
			var target = document.all ? event.srcElement : event.target;
			if (this._mainForm !== undefined){
				this._mainForm.doKeyDown(charCode, buttonState, keyCode, event);
			}
			if ((keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && target.id.toLowerCase().search("swf") == -1 && (target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
				return false;
			return true;			
		}catch(e){
			systemAPI.alert(e);
		}
	}
});
uses("portalui_sysForm;portalui_childForm;portalui_saiLabelEdit;portalui_imageButton;portalui_fileExplorer;portalui_fileExplorerItem;portalui_PopUpMenu;portalui_MenuItem;portalui_MenuForm;util_file;portalui_groupBox;portalui_label;portalui_saiEdit;portalui_radioButton;portalui_button;portalui_saiMemo;portalui_checkBox;portalui_saiGrid");
window.app_svnClient_fMain = function(owner)
{
	if (owner)
	{	
		try{
			window.app_svnClient_fMain.prototype.parent.constructor.call(this, owner);
			this.setCaption("svn Client for Linux");	
			
			this.ePath = new portalui_saiLabelEdit(this,{bound:[20,10,279,20],caption:"Path",labelWidth:50});
			this.bRefresh = new portalui_imageButton(this,{bound:[300,10,21,21],image:"icon/dynpro/reload.png",click:[this,"doRefreshFile"],hint:"Refresh"});
			this.tFile = new portalui_fileExplorer(this,{bound:[20,31,300,100],showFile:true});									
			this.message = new portalui_control(this,{bound:[330,31,this.width - 330,this.height - 40],});
			this.message.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto");
			uses("util_subversion");
			this.subversion = new util_subversion();
			this.subversion.addListener(this);
			this.subversion.setSvnPath("C:/Program Files/SlikSvn/bin");
			this.subversion.setUser("admin","sai");
			this.file = new util_file();
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_svnClient_fMain.extend(window.portalui_sysForm);
window.app_svnClient_fMain.implement({
	doAfterResize: function(width, height){
		this.tFile.setHeight(height - 60);
		this.message.setHeight(height - 60);
		this.message.setWidth(width - 350);
	},
	doRefreshFile: function(sender){
		this.tFile.setPath(this.ePath.getText());
	},
	initload: function(){
		try{
			this.fileMnu = new portalui_PopUpMenu(this);		
				var mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Check out");
				mnu.setData("checkout","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Update");	
				mnu.setData("update","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Commit");
				mnu.setData("commit","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Show Log");
				mnu.setData("log","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Copy");
				mnu.setData("copy","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Export");
				mnu.setData("export","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Merge");
				mnu.setData("merge","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);				
				mnu.setCaption("Relocated");
				mnu.setData("relocated","EVENT");
				mnu.onClick.set(this,"doMenuClick");		
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("SVN Help");
				mnu.setData("help","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Copy to");
				mnu.setData("packer","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
			this.tFile.setPopUpMenu(this.fileMnu);		
			this.chekOutForm = new app_svnClient_fCheckOut(this.app);
			this.chekOutForm.hide();
			this.chekOutForm.bOk.onClick.set(this,"doClickCheckout");
			this.chekOutForm.bHelp.onClick.set(this,"doClickCheckout");
			this.chekOutForm.bLog.onClick.set(this,"doClickCheckout");
			
			this.commitForm = new app_svnClient_fCommit(this.app);
			this.commitForm.hide();
			this.commitForm.bOk.onClick.set(this,"doClickCommit");
			this.commitForm.bHelp.onClick.set(this,"doClickCommit");			
		}catch(e){
			systemAPI.alert(e);
		}
		
	},
	doMenuClick: function(sender){
		try{
			var sel = this.tFile.getSelectedItem();
			this.subversion.setPath(sel.file.filename);	
			switch(sender.getData()){
				case "checkout" : 
					//this.subversion.checkout();
					this.chekOutForm.setDir(sel.file.filename);
					this.chekOutForm.show();
					break;
				case "commit" :					
					this.subversion.info();
					this.commitForm.gFile.clear();
					this.subversion.statusA();					
					this.commitForm.show();
					break;
				case "update" :
					//update
					this.subversion.update();
					break;
				case "info" :
					//update
					this.subversion.info();
					break;	
				case "help":
					this.addMessage(this.subversion.help());
					break;
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.subversion){
			switch (methodName){
				case "checkout" :
					this.addMessage(result);
					break;
				case "update" :
					this.addMessage(result);
					break;
				case "info" :
					var info = result;
					if (info.search("BADCMD") != -1) return;
					info = info.split("<br>");					
					nfo = info[1].split(":");
					info = trim(info[1]);
					this.commitForm.lHost.setCaption(info);
					break;
				case "status" :					
					this.processStatus(result);					
					break;
				case "commit" :					
					this.addMessage(result);					
					break;
			}
		}
	},
	processStatus : function(result){		
		this.addMessage(result);
		var fileStatus = result.split("<br>");
		var status, file, type="",data = [];					
		this.commitForm.gFile.showLoading();
		for (var i in fileStatus){
			file = fileStatus[i];
			file = file.replace(/&nbsp;/gi," ");
			status = file[0];
			file = trim(file.substring(1));									
			if (file != ""){
				var type = file.substring(file.lastIndexOf("."));
				if (type == file) type = "-";				
				data= [(status == "?" ? "false":"true"),file,type,(status == "A" ? "A" : status == "M" ? "Modified" : "unversioned")];
				this.commitForm.gFile.appendData(data);				
			}
		}
		this.commitForm.gFile.hideLoading();
		this.statusIsLoad = true;
	},
	addMessage: function(msg){
		this.message.getCanvas().innerHTML += msg +"<br>";
	},
	setMessage: function(msg){
		this.message.getCanvas().innerHTML = msg +"<br>";
	},
	doClickCheckout: function(sender){		
		try{
			if (sender == this.chekOutForm.bOk){
				this.subversion.checkout(this.chekOutForm.eHost.getText(),(this.chekOutForm.cbHead.isSelected() ? undefined : this.chekOutForm.eRevision.getText()));
			}else if (sender == this.chekOutForm.bHelp){			
				this.setMessage(this.subversion.help("checkout"));				
			}else {	
				this.setMessage(this.subversion.log(this.chekOutForm.eHost.getText()));
			}
			this.chekOutForm.hide();				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClickCommit: function(sender){		
		try{
			if (sender == this.commitForm.bOk){
				var files = "";
				for (var i =0;i < this.commitForm.gFile.getRowCount();i++){
					if (this.commitForm.gFile.cells(3,i) == "unversioned" && this.commitForm.gFile.cells(0,i) == "true")
						files += this.commitForm.gFile.cells(1,i) +"<br>";
				}
				if (files != "")this.addMessage(this.subversion.add(files));
				this.subversion.commit(this.commitForm.eMsg.getText());
			}else if (sender == this.commitForm.bHelp){			
				this.setMessage(this.subversion.help("commit"));				
			}
			this.commitForm.hide();				
		}catch(e){
			systemAPI.alert(e);
		}
	}
});

window.app_svnClient_fCheckOut = function(owner){
	window.app_svnClient_fCheckOut.prototype.parent.constructor.call(this, owner);
	this.setWidth(400);
	this.setHeight(270);
	this.setCaption("Checkout");
	this.setBorderStyle(bsDialog);
	this.setResizeAble(false);
	this.centerize();	
	this.bGroup =  new portalui_groupBox(this,{bound:[10,10,this.width - 20,120],caption:"Repository"});
	this.lbl = new portalui_label(this.bGroup,{bound:[10,5,100,18],caption:"URL of Repository"});
	this.eHost = new portalui_saiEdit(this.bGroup,{bound:[10,24,this.bGroup.width - 40,20],text:""});
	this.lbl = new portalui_label(this.bGroup,{bound:[10,47,100,18],caption:"Checkout Directory"});
	this.eDir = new portalui_saiEdit(this.bGroup,{bound:[10,65,this.bGroup.width - 40,20],text:""});
	
	this.bGroup2 =  new portalui_groupBox(this,{bound:[10,130,this.width - 20,80],caption:"Revision"});
	this.cbHead = new portalui_radioButton(this.bGroup2,{bound:[10,10,100,20],caption:"HEAD Revision",selected:true});
	this.cbRevision = new portalui_radioButton(this.bGroup2,{bound:[10,30,100,20],caption:"Revision"});
	this.eRevision = new portalui_saiEdit(this.bGroup2,{bound:[110,30,100,20],text:""});
	this.bLog = new portalui_button(this.bGroup2,{bound:[220,30,80,18],caption:"Show Log",click:""});
	this.bOk = new portalui_button(this,{bound:[this.width - 270,220,80,18],caption:"Ok",click:""});
	this.bCancel = new portalui_button(this,{bound:[this.width - 180,220,80,18],caption:"Cancel",click:[this,"doClick"]});
	this.bHelp = new portalui_button(this,{bound:[this.width - 90,220,80,18],caption:"Help",click:""});
};
window.app_svnClient_fCheckOut.extend(window.portalui_sysForm);
window.app_svnClient_fCheckOut.implement({
	doClick: function(sender){
		this.hide();
	},
	setDir: function(dir){
		this.eDir.setText(dir);
	}
});

window.app_svnClient_fCommit = function(owner){
	window.app_svnClient_fCommit.prototype.parent.constructor.call(this, owner);
	this.setWidth(400);
	this.setHeight(400);
	this.setCaption("Commit");
	this.setBorderStyle(bsDialog);
	this.setResizeAble(false);
	this.centerize();	
	this.lbl = new portalui_label(this,{bound:[10,10,100,18],caption:"Commit to:"});
	this.lHost = new portalui_label(this,{bound:[10,30,400,18],caption:""});
	this.bGroup =  new portalui_groupBox(this,{bound:[10,40,this.width - 20,120],caption:"Message "});
	this.eMsg = new portalui_saiMemo(this.bGroup,{bound:[10,10,this.bGroup.width - 40,80],text:"",labelWidth:0});
	
	this.bGroup2 =  new portalui_groupBox(this,{bound:[10,170,this.width - 20,170],caption:"Change Made"});
	this.gFile = new portalui_saiGrid(this.bGroup2,{bound:[10,0,this.bGroup.width - 40, 100],colCount:4,colTitle:["Check","Filename","File Type","Status"], readOnly:true,
				colWidth:[[3,2,1,0],[60,60,150,60]], colFormat:[[0],[cfBoolean]]});
	this.cbShow = new portalui_checkBox(this.bGroup2,{bound:[10,110,150,20],caption:"Show unversioned files",selected:true});
	this.cbSelection = new portalui_checkBox(this.bGroup2,{bound:[10,130,150,20],caption:"Select / deselect all"});		
	this.bOk = new portalui_button(this,{bound:[this.width - 270,this.height - 60,80,18],caption:"Ok",click:""});
	this.bCancel = new portalui_button(this,{bound:[this.width - 180,this.height - 60,80,18],caption:"Cancel",click:[this,"doClick"]});
	this.bHelp = new portalui_button(this,{bound:[this.width - 90,this.height - 60,80,18],caption:"Help",click:""});
};
window.app_svnClient_fCommit.extend(window.portalui_sysForm);
window.app_svnClient_fCommit.implement({
	doClick: function(sender){
		this.hide();
	},
	setDir: function(dir){
		this.eDir.setText(dir);
	}
});