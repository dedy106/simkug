//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_appGsd = function(owner){
	window.app_saku_appGsd.prototype.parent.constructor.call(this, owner);
	this.className = "app_saku_appGsd";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.title = "e-Saku";
	this.showForm();
};
window.app_saku_appGsd.extend(window.portalui_application);
window.app_saku_appGsd.implement({
	showForm: function(){
		try
		{
			var step = "load";			
			uses("util_dbLib;portalui_form;portalui_childForm");
			uses("app_saku_fMainGsd");							
			step = "create";		
			this._mainForm = new app_saku_fMainGsd(this);	
			step = "set active form";			
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);	
			step = "show mainform";			
			this._mainForm.show();					
			this._mainForm.gotoLogin();
			step = "initload mainForm";												
		}catch(e)
		{
			systemAPI.alert("[saku]::showMainForm : "+step+" :",e);
		}
	},
	doTerminate: function(sender){	
	},	
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_saku_appGsd.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);
			var target = document.all ? event.srcElement : event.target;
			if (this.activeForm.activeChildForm !== undefined) {
				if (system.activeApplication.activeForm !== undefined && buttonState.isAltKey()){					
					if (charCode == "S" || charCode == "s" && this.app._mainForm.bSimpan !== undefined ){ 
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
				if (this.activeForm.activeChildForm.activeControl !== undefined && this.activeForm.activeChildForm.activeControl.className == "portalui_saiGrid"){									
					return this.activeForm.activeChildForm.activeControl.doKeyDown(charCode, buttonState, keyCode, event);
				}else if (this.activeForm.activeChildForm.activeControl !== undefined && this.activeForm.activeChildForm.activeControl instanceof portalui_button){									
					return this.activeForm.activeChildForm.activeControl.doKeyDown(charCode, buttonState, keyCode, event);
				} 
				if ((keyCode == 32 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
					return false;
				return true;
			}else{														
				if (this.activeForm.activeControl !== undefined && this.activeForm.activeControl.className == "portalui_saiGrid"){
					return this.activeForm.activeControl.doKeyDown(charCode, buttonState, keyCode, event);
				}
				if ((keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && (target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
					return false;
				return true;			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});
