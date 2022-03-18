//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_portal_app = function(owner){
	window.app_portal_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_portal_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.title = "Portal";
	//this._kodeLokasi="31";
	this.showForm();
};
window.app_portal_app.extend(window.portalui_application);
window.app_portal_app.implement({
	showForm: function(){
		try
		{
			uses("util_dbLib;portalui_form;portalui_childForm");
			this._mainForm = new app_portal_fMain(this);
			this.setActiveForm(this._mainForm);		
			this._mainForm.show();					
			this._mainForm.gotoLogin();
			this.dbLib = new util_dbLib();											
		}catch(e)
		{
			systemAPI.alert(this+"$showMainForm",e);
		}
	},
	doTerminate: function(sender){	
	},	
	restart: function(){	
		this.logout();
		this._mainForm.free();
		this.showForm();
	},	
	logout: function(){		
		try{
			this.dbLib.logout(this._userSession);
			//this.dbLib.killAllConnection();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_portal_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);
			var target = document.all ? event.srcElement : event.target;
			if (this.activeForm.activeChildForm !== undefined) {
				if (system.activeApplication.activeForm !== undefined && buttonState.isAltKey()){					
					if (charCode == "S" || charCode == "s" && this._mainForm.bSimpan !== undefined ){ 
						if (system.activeApplication.activeForm.bSimpan.enabled)
							system.activeApplication.activeForm.bSimpan.click();
					}
					if (charCode == "E" || charCode == "e" && system.activeApplication.activeForm.bEdit !== undefined ){
						if (system.activeApplication.activeForm.bEdit.enabled) 
							system.activeApplication.activeForm.bEdit.click();
					}
					if (charCode == "H" || charCode == "h" && system.activeApplication.activeForm.bHapus !== undefined ){
						if (system.activeApplication.activeForm.bHapus.enabled) 
							system.activeApplication.activeForm.bHapus.click();
					}
					if (charCode == "C" || charCode == "c" && system.activeApplication.activeForm.bClear !== undefined) 
						system.activeApplication.activeForm.bClear.click();
					if (charCode == "X" || charCode == "x" ) 
						system.activeApplication.activeForm.bTutup.click();										
					return true;
				}									
				if ((keyCode == 32 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.search("inplaceEdit") == -1 && target.id.search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
					return false;
				return true;
			}else{																		
				if ((keyCode == 32 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.search("inplaceEdit") == -1 && target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
					return false;
				return true;			
			}
		}catch(e){
			systemAPI.alert(this+"$keyDown",e);
		}
	}
});
