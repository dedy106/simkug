//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_ConfirmMail = function(owner,options){
	try{
		if (owner)
		{
			window.portalui_ConfirmMail.prototype.parent.constructor.call(this,owner,options);
			this.className = "portalui_ConfirmMail";
			this.title = "Konfirmasi Email";
			this.owner = owner;
			this.initComponent();
			this.onConfirmClick = new portalui_eventHandler();
		}
	}catch(e)
	{
		alert("[portalui_ConfirmMail]::construct:"+e,"");
	}
};
window.portalui_ConfirmMail.extend(window.portalui_panel);
window.ConfirmMail = window.portalui_ConfirmMail;
window.portalui_ConfirmMail.implement({
	initComponent: function(){
		try{
			this.email = new portalui_saiLabelEdit(this,{bound:[10,30,230,20],labelWidth:100,caption:"Email", keyDown:[this,"doEditKeyDown"]});
			this.bConfirm = new portalui_button(this,{bound:[75,60,80,20],caption:"OK",click:[this,"doConfirmClick"]});
			this.bCancel = new portalui_button(this,{bound:[160,60,80,20],caption:"Cancel",click:[this,"doConfirmClick"]});
		}catch(e){
			alert(e);
		}
	},
	getEmail: function(){
		return this.email.getText();
	},
	doEditKeyDown: function(sender, keyCode,buttonState){
	   if (keyCode == 13) this.bConfirm.click();
	   if (keyCode == 27) this.hide();
    },
    doConfirmClick: function(sender){
		if (sender == this.bCancel){
			this.free();
			return false;
		} 
        this.onConfirmClick.call(sender);
    }
});
