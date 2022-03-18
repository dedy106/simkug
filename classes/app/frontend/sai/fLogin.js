//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fLogin = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fLogin.prototype.parent.constructor.call(this, owner);
			window.app_frontend_alpa_fLogin.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_alpa_fLogin.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_alpa_fLogin";											
			this.initComponent();
			this.getCanvas().style.overflow="auto";
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fLogin]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fLogin.extend(window.portalui_panel);
window.app_frontend_alpa_fLogin.implement({
	initComponent: function(){
		uses("portalui_saiLabelEdit;portalui_saiCB;portalui_button");			
		try{			
			this.pLogin = new portalui_panel(this);
			this.pLogin.setBound(810,105,200,130);
			this.pLogin.setCaption("Login");
			
			this.uid = new portalui_saiLabelEdit(this.pLogin);
			this.uid.setLabelWidth(80);
			this.uid.setBound(10,30,180,20);
			this.uid.setCaption("User Id");
			
			this.pwd = new portalui_saiLabelEdit(this.pLogin);
			this.pwd.setLabelWidth(80);
			this.pwd.setBound(10,53,180,20);
			this.pwd.setCaption("Password");
			this.pwd.setPassword(true);
			this.pwd.onKeyDown.set(this,"keyDown");
			
			this.cbStatus = new portalui_saiCB(this.pLogin);
			this.cbStatus.setLabelWidth(80);
			this.cbStatus.setBound(10,76,180,20);
			this.cbStatus.setCaption("Status");
				this.cbStatus.addItem(0,"Customer");
				this.cbStatus.addItem(1,"Sales");				
			
			this.bLogin = new portalui_button(this.pLogin);
			this.bLogin.setBound(100,99,80,20);
			this.bLogin.setCaption("Login");
			this.bLogin.onClick.set(this,"doClick");
			this.uid.setFocus();
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){
		this.pLogin.setLeft(width / 2 - 100);
		this.pLogin.setTop(height / 2 - 65);
	},	
	doClick: function(sender){
		try{
			if (this.app._mainForm.userLogin(this.uid.getText(), this.pwd.getText(), this.cbStatus.getText())){										
				this.app._mainForm.login(undefined, false);											
				this.login();
				if (this.app._mainForm.tabToko !== undefined)
					this.app._mainForm.tabToko.doClick("");
			}else alert("User Id atau Password anda salah");
		}catch(e){
			alert("app_frontend_alpa_transaksi_fLogin::doChildItemsClick : "+e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){
		if (sender === this.pwd)
			if (keyCode === 13)
				this.doClick();
	},
	login: function(){		
		try{
			this.hide();
			this.free();
			this.app._mainForm.doTabChange(this.app._mainForm.tab, 3);		
		}catch(e){
			alert(e);
		}
	}
});