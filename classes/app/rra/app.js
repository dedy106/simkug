//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_rra_app = function(owner){
	window.app_rra_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_rra_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("RRA");
	this.showForm();
};
window.app_rra_app.extend(window.application);
window.app_rra_app.implement({
	showForm: function(){
		try
		{
			uses("util_dbLib;form;childForm");		
			this._dbSetting = "orarra";
			this._rfcCall = true;			
			this._mainForm = new app_rra_fMain(this);	
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);	
			this._mainForm.show();					
			this._mainForm.gotoLogin();							
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
	loginFocus: function(){
		this._mainForm.form.e0.setFocus();
	},	
	logout: function(){		
		try{						
			this.dbLib.logout(this._userSession);
			//if (this._mainForm.dashboard) this._mainForm.dashboard.dataProvider2.unregister(this._mainForm.dashboard.msgBoard.msg.sessionId);
			//this.dbLib.killAllConnection();
			//this._mainForm.close();
		}catch(e){
			//systemAPI.alert(e);
		}
	},
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			window.app_rra_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);
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
					return false;
				}	
				switch (keyCode){
					case 32 :
					case 8	:
					case 40	:
					case 38	:
					case 33	:
					case 34 :
					case 35	:
					case 39	: if (target.id.search("inplaceEdit") == -1 && target.id.search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1))
							return false;
						  else if (keyCode == 40 && target.id && target.id.search("edit") > -1)
							return false;
						   else return true;
					break;
					case 40	: if (target.id && target.id.search("edit") > -1) return false;
							else return true;
					default : return true;
					break;
				}				
			}else{																						
				switch (keyCode){
					case 32 :
					case 8	:
					case 40	:					
					case 33	:
					case 34 :
					case 35	:
					case 39	: if (target.id.search("inplaceEdit") == -1 && target.id.search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1))
							return false;
						  else if (keyCode == 40 && target.id && target.id.search("edit") > -1)
							return false;
							else return true;
					break;
					case 40	: if (target.id && target.id.search("edit") > -1) return false;
							else return true;
					default : return true;
					break;
				}		
			}
		}catch(e){
			systemAPI.alert(this+"$keyDown",e);
		}
	}
});
