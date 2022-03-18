//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_app = function(owner){
	window.portalapp_app.prototype.parent.constructor.call(this, owner);
	this.className = "portalapp_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.showForm();
};
window.portalapp_app.extend(window.portalui_application);
window.portalapp_app.implement({
	showForm: function(){
		try
		{
			var step = "load";			
			uses("portalapp_fMain",true);							
			this._mainForm = new portalapp_fMain(this);	
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
