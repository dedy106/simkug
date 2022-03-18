//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_officeair_app = function(owner){
	window.app_officeair_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_officeair_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jOfficeair -- is your office");
	this.showForm();
};
window.app_officeair_app.extend(window.portalui_application);
window.app_officeair_app.implement({
	showForm: function(){
		try
		{			
			uses("util_dbLib;portalui_form;portalui_sysForm;portalui_childForm");
			uses("app_officeair_fMain");									
			this._mainForm = new app_officeair_fMain(this);			
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);				
			this._mainForm.show();																		
		}catch(e){
			systemAPI.alert("[saku]::showMainForm:",e);
		}
	},
	doTerminate: function(sender){	
	},	
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_officeair_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);
			var target = document.all ? event.srcElement : event.target;
			if ((keyCode == 32 || keyCode == 8 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.search("inplaceEdit") == -1 && target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
					return false;
			return true;						
		}catch(e){
			systemAPI.alert(this+"$keyDown",e);
		}
	},
	logout: function(){				
	}
});
