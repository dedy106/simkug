/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_smsadmin_login_fMain = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_login_fMain.prototype.parent.constructor.call(this, owner);
		window.app_smsadmin_login_fMain.prototype.parent.setWidth.call(this, 400);
		window.app_smsadmin_login_fMain.prototype.parent.setHeight.call(this, 250);
		
		this._mainButtonClick = new controls_eventHandler();
		this._isLogedIn	= false;
		this._userLog = "";
		this._lokasi = "";
		this._pp = "";
		this.activeChildForm = undefined;
		
		this.className  = "fMain";
		this.formCaption = "SMS Center Administrator";	
		this.setCaption("L O G I N");
		this.setTop(60);
		this.setResizeAble(false);
		this.setColor("#ffffff");
		this.onClose.set(this,"doClose");
		this.centerize();	
		
		uses("controls_label;controls_panel;controls_imageButton;controls_saiCB;controls_image");
		this.lblCaption = new controls_label(this);
		this.lblCaption.setHeight(22);
		this.lblCaption.setWidth(this.getWidth());
		this.lblCaption.fnt.setSize(13);
		//this.lblCaption.fnt.setItalics(true);
		this.lblCaption.fnt.setBold(true);
		this.lblCaption.fnt.setColor(page.getConfig("app.headerColor"));
		this.lblCaption.setTop(28);//this.getHeight() / 2 - 100
		this.lblCaption.setLeft(28);//this.getWidth() / 2 - 80
		this.lblCaption.setCaption(this.formCaption);
		
		//uses("controls_panel");
		this.pTool = new controls_panel(this);
		this.pTool.setTop(0);
		this.pTool.setHeight(30);
		this.pTool.setLeft(0);
		this.pTool.setWidth(this.getWidth());
		this.pTool.setColor(page.getConfig("app.color.panel"));
		this.pTool.setShadow(true);		
		
		//uses("controls_imageButton");
		this.b1 = new controls_imageButton(this.pTool);
		this.b1.setTop(5);
		this.b1.setLeft(5);
		this.b1.setWidth(17);
		this.b1.setHeight(15);
		this.b1.setImage("icon/"+page.getThemes()+"/ok.png");
				
		
		//uses("controls_saiCB");
		this.cb1 = new controls_saiCB(this.pTool);
		this.cb1.setTop(3);
		this.cb1.setLeft(28);
		this.cb1.setLabelWidth(0);
		this.cb1.setWidth(200);
		this.cb1.setText("");
		
		//uses("controls_image");
		this.separator1 = new controls_image(this.pTool);
		this.separator1.setLeft(260);
		this.separator1.setTop(3);
		this.separator1.setWidth(2);
		this.separator1.setHeight(20);
		this.separator1.setImage("icon/"+page.getThemes()+"/separator.png");
		
		this.bHelp = new controls_imageButton(this.pTool);
		this.bHelp.setTop(5);
		this.bHelp.setLeft(265);
		this.bHelp.setWidth(17);
		this.bHelp.setHeight(15);
		this.bHelp.setHint("Help");
		this.bHelp.setImage("icon/"+page.getThemes()+"/bHelp.png");
		
		this.bGenLocal = new controls_imageButton(this.pTool);
		this.bGenLocal.setTop(5);
		this.bGenLocal.setLeft(283);
		this.bGenLocal.setWidth(17);
		this.bGenLocal.setHeight(15);
		this.bGenLocal.setHint("Front End");
		this.bGenLocal.setImage("icon/"+page.getThemes()+"/bGenLocal.png");
		this.bGenLocal.onClick.set(this, "gotoFrontEnd");
		
		this.bDiag = new controls_imageButton(this.pTool);
		this.bDiag.setTop(5);
		this.bDiag.setLeft(301);
		this.bDiag.setWidth(17);
		this.bDiag.setHeight(15);
		this.bDiag.setHint("Server Diagnosa");
		this.bDiag.setImage("icon/"+page.getThemes()+"/bCreateSession.png");
		this.bDiag.onClick.set(this, "serverDiag");
//----------------------------------------------    		
		this.p1 = new controls_panel(this);
		this.p1.setTop(55);
		this.p1.setHeight(24);
		this.p1.setLeft(0);
		this.p1.setWidth(this.getWidth());
		this.p1.setColor(page.getConfig("app.color.panel"));
		
		this.onLoginClick = new controls_eventHandler();
		
		//uses("controls_button");
		this.blogin = new controls_button(this.p1);
		this.blogin.setLeft(10);
		this.blogin.setTop(2);
		this.blogin.setCaption("Login");
		this.blogin.onClick.set(this, "mainButtonClick");
		this.blogin.setIcon("url(icon/"+page.getThemes()+"/login.png)");
//		this.p1.serBorder
		
		this.maximize();				
		/*
		uses("controls_progressForm");			
	    this.progress = new controls_progressForm(this);   					
	    this.progress.setTop(30);
	    this.progress.setWidth(220);
	    this.progress.setHeight(50);	  
	    this.progress.setLeft(this.getWidth() / 2 - 100);	  	  	  
	    this.progress.setColor("");
	    this.progress.setBorder(0);
	    this.progress.hide();
		*/			  	
		this.childTop = 80;
		this.initiated = true;
		//this.setFormButton(2);
		this.setImage("url(image/themes/"+page.getThemes()+"/logo.png)top left ");
		try
		{
			//uses("util_dbLib");
			this.lib = new util_dbLib(window.page.serverApp);
			this.lib.addListener(this);
			this.menuStr = "";			
			
		}catch(e)
		{
			rujax.alert("[fMain]::constructor:lib : ", e);
		}
	}
}
window.app_smsadmin_login_fMain.extend(window.controls_form);

window.app_smsadmin_login_fMain.prototype.initLoad = function()
{	
	try
	{		
		if (!this.app._isLogedIn)
		{
			window.page.showProgress();
			var step = "load login form";
			uses("app_smsadmin_login_fLogin");
			step = "create login";			
			this.fLogin = new app_smsadmin_login_fLogin(this);			
			this.setActiveForm(this.fLogin);			
			this.fLogin.setTop(this.childTop);      		
			step = "show login";			
			this.fLogin.show();				
			this.fLogin.maximize();			
			window.page.hideProgress();			
			this.fLogin.e0.setFocus();
		}
		
		//this.setColor('#ffffff');		
	}catch(e)
	{
		rujax.alert("[app_smsadmin_login_fMain]::initLoad:"+e,step);
	}
}
window.app_smsadmin_login_fMain.prototype.setActiveForm = function(child)
{
	this.activeChildForm = child;
}
window.app_smsadmin_login_fMain.prototype.setFormCaption = function(caption)
{
	this.formCaption = caption;
	this.lblCaption.setCaption(caption);
}

window.app_smsadmin_login_fMain.prototype.getformCaption = function()
{
	return this.formCaption;
}


window.app_smsadmin_login_fMain.prototype.childFormConfig = function(child, formClick, formCaption, formType)
{
	this.setFormCaption(formCaption);
	this.bTutup.setVisible(true);
	this.activeChildForm = child;
	
}

window.app_smsadmin_login_fMain.prototype.mainButtonClick = function(sender)
{
	this._mainButtonClick.call(this, sender);
}

//----------------------------------------------------------------------------

window.app_smsadmin_login_fMain.prototype.doAfterResize = function(width, height)
{
//	this.lblCaption.setTop(this.getHeight() / 2 - 100);
//	this.lblCaption.setLeft(this.getWidth() / 2 - 80);
	this.setWidth(width);
	this.setHeight(height);
	this.p1.setWidth(this.getWidth());
	this.pTool.setWidth(this.getWidth());
	this.setBtnPos(this.getWidth() - 200);
	this.lblCaption.setWidth(this.getWidth());
	if (this.initiated)
	{						
		var appChild = this.childs;	
		var res = undefined;
		
		for (var i in appChild.objList)
		{
			res = window.page.getResource(appChild.objList[i]);		
			if (res instanceof controls_childForm)
			{
				res.maximize();
			}
		}
	}
}
//----------------------------------------------------------
window.app_smsadmin_login_fMain.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.lib)
	{
		switch (methodName)
		{
			case "listData" : 
				this.menuStr = result;
				break;
		}
	}
}
window.app_smsadmin_login_fMain.prototype.mainButtonClick = function(sender)
{
	this.onLoginClick.call(sender);
}
window.app_smsadmin_login_fMain.prototype.childFormConfig = function(child, formClick, formCaption, formType)
{
	this.setFormCaption(formCaption);	
	this.activeChildForm = child;
}
window.app_smsadmin_login_fMain.prototype.showProgress = function(sender)
{
	//this.progress.show();
	page.showProgress();
}
window.app_smsadmin_login_fMain.prototype.hideProgress = function(sender)
{
	//this.progress.hide();
	page.hideProgress();
}
window.app_smsadmin_login_fMain.prototype.gotoFrontEnd = function(sender)
{
	page.openFrontEnd();
}
window.app_smsadmin_login_fMain.prototype.serverDiag = function(sender)
{
	page.serverDiag();
}
window.app_smsadmin_login_fMain.prototype.doClose = function(sender)
{
	this.getApplication().terminate();
}