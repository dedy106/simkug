//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fConfirmPswd = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fConfirmPswd.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_frontend_alpa_fConfirmPswd";
			this.title = "Confirm Password";
			this.owner = owner;
			this.initComponent();
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fConfirmPswd]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fConfirmPswd.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fConfirmPswd.implement({
	initComponent: function(){
		try{
			this.pwd = new portalui_saiLabelEdit(this,{bound:[10,30,230,20],labelWidth:100,caption:"e-Mail Password",password:true});
			this.bConfirm = new portalui_button(this,{bound:[75,60,80,20],caption:"OK",click:[this.owner,"doConfirmClick"]});
			this.bCancel = new portalui_button(this,{bound:[160,60,80,20],caption:"Batal",click:[this.owner,"doConfirmClick"]});
		}catch(e){
			alert(e);
		}
	},
	getPassword: function(){
		return this.pwd.getText();
	}
});
