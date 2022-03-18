//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.desktop_free = function(owner){
	window.desktop_free.prototype.parent.constructor.call(this, owner);
	this.className = "desktop_app";
	this.setTitle("roojax jamboo(FREE)");
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.showForm();
};
window.desktop_free.extend(window.portalui_application);
window.desktop_free.implement({
	showForm: function(){
		try
		{
			var step = "load";			
			uses("desktop_fMain");							
			this._mainForm = new desktop_fMain(this,{user:"free",pwd:"free"});	
			step = "set active form";
			this.setActiveForm(this._mainForm);	
			step = "show mainform";
			this._mainForm.show();					
			step = "initload mainForm";												
		}catch(e)
		{
			systemAPI.alert("[desktop]::showMainForm : "+step+" :"+e);
		}
	},
	doTerminate: function(sender){	
	},
	registerTask: function(app, title,icon){
		this._mainForm.taskbar.registerTask(app,title,icon);
	},
	removeTask : function(app){
		this._mainForm.taskbar.removeTask(app);
	}
});
