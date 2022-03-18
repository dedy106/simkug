//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_sai_app = function(owner){
	window.app_frontend_sai_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_frontend_sai_app";
	this.title = "PT SAI (www.roojax.com)";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.showForm();
};
window.app_frontend_sai_app.extend(window.portalui_application);
window.app_frontend_sai_app.implement({
	showForm: function(){
		try
		{
			var step = "load";			
			//uses("app_frontend_sai_fMain");							
			this._mainForm = new app_frontend_sai_fMain(this);	
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
	}
});
