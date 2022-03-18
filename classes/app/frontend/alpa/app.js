//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_app = function(owner){
	window.app_frontend_alpa_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_frontend_alpa_app";
	this.title = "www.klikAlpa.com";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.showForm();
};
window.app_frontend_alpa_app.extend(window.portalui_application);
window.app_frontend_alpa_app.implement({
	showForm: function(){
		try
		{
			var step = "load";			
			//uses("app_frontend_alpa_fMain");							
			this._mainForm = new app_frontend_alpa_fMain(this);	
			step = "set active form";
			this.setActiveForm(this._mainForm);	
			step = "show mainform";
			this._mainForm.show();					
			step = "initload mainForm";												
		}catch(e)
		{
			alert("[portalApp]::showMainForm : "+step+" :"+e);
		}
	},
	doTerminate: function(sender){	
	},
	logout: function(){
        this._mainForm.logout();
    },
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_frontend_alpa_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);
            var target = document.all ? event.srcElement : event.target;			
			/*if (this.activeForm.activeControl !== undefined && (this.activeForm.activeControl.className == "portalui_saiGrid" || this.activeForm.activeControl.className == "portalui_button")){
				return this.activeForm.activeControl.doKeyDown(charCode, buttonState, keyCode, event);
			}*/
			if ((keyCode == 32 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.search("inplaceEdit") == -1 && target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
				return false;
			return true;						
		}catch(e){
			systemAPI.alert(this+"$keyDown",e);
		}
	}
});
