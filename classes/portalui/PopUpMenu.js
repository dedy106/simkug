//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_PopUpMenu= function(owner){
	this.className = "portalui_PopUpMenu";	
	window.portalui_PopUpMenu.prototype.parent.constructor.call(this, owner);    
    
	this.menuForm = undefined;
	this.target = undefined;
	this.isPopUp = false;
	uses("portalui_MenuForm");
};
window.portalui_PopUpMenu.extend(window.portalui_containerComponent);
window.PopUpMenu = window.portalui_PopUpMenu;
window.portalui_PopUpMenu.implement({
	addChild: function(child){	
		if (this.menuForm == undefined){  		
			var app = this.getApplication();
			this.menuForm = new portalui_MenuForm(app);				
			this.menuForm.requesterForm = this.requester;		   			
		}	
	    if (child instanceof portalui_MenuItem){
	        window.portalui_PopUpMenu.prototype.parent.addChild.call(this, child);

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
