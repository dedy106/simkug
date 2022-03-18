//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_PopUpMenu= function(owner,options){
    this.className = "portalui_PopUpMenu";	
	window.app_builder_component_controls_PopUpMenu.prototype.parent.constructor.call(this, owner,options);    
    
    this.menuForm = undefined;
    this.target = undefined;
	this.isPopUp = false;	
	uses("app_builder_component_controls_MenuForm");
	if (options !== undefined) this.updateByOptions(options);
	this.addProperty({className:this.className});	
	this.addEvent({ChilditemsClick:"",tabChange:""});
};
window.app_builder_component_controls_PopUpMenu.extend(window.app_builder_component_controls_containerComponent);
window.app_builder_component_controls_PopUpMenu.implement({
	addChild: function(child){	
		if (this.menuForm == undefined){  		
			var app = this.getApplication();
			this.menuForm = new app_builder_component_controls_MenuForm(app);				
			this.menuForm.requesterForm = this.requester;		   			
		}	
	    if (child instanceof portalui_MenuItem){
	        window.app_builder_component_controls_PopUpMenu.prototype.parent.addChild.call(this, child);

	        if (this.menuForm != undefined)
	            this.menuForm.addItem(child);
	    }
	},
	popUp: function(x, y, pointMode){
	    if (this.menuForm != undefined){		
	        this.menuForm.popUp(x, y, pointMode);
			this.isPopUp = true;
	    }
	},
	getTarget: function(){
		return this.target;
	},
	setTarget: function(data){
		this.target = data;
	}
});
