//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("portalui_sysForm");
window.app_builder_app = function(owner){
	window.app_builder_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_builder_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jamboo Builder(jIDE)");
	this.showForm();
};
window.app_builder_app.extend(window.portalui_application);
window.app_builder_app.implement({
	showForm: function(){
		try
		{						
			this._mainForm = new app_builder_fMain(this);			
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);				
			this._mainForm.show();								
			this._mainForm.initLoad();									
		}catch(e){
			systemAPI.alert("[saku]::showMainForm:",e);
		}
	},
	doTerminate: function(sender){	
	},	
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_builder_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
			if (this._mainForm !== undefined){
				this._mainForm.doKeyDown(charCode, buttonState, keyCode, event);
			}
			if ((keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && event.target.id.toLowerCase().search("swf") == -1 && (event.target.id.toLowerCase().search("edit") == -1 && (event.target.id.search("input") == -1 || event.target.id.search("textarea") == -1)))
				return false;
			return true;			
		}catch(e){
			systemAPI.alert(e);
		}
	}
});
