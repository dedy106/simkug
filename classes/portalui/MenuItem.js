//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_MenuItem = function(owner, caption){
    if (owner){
        this.onChange = new portalui_eventHandler();
        this.onClick = new portalui_eventHandler();        
        this.caption = caption;
        this.icon = undefined;
		this.className = "portalui_MenuItem";
        window.portalui_MenuItem.prototype.parent.constructor.call(this, owner);                
        this.menuForm = undefined;		
		this.data = undefined;
		this.dataType = undefined;
    }
};
window.portalui_MenuItem.extend(window.portalui_containerComponent);
window.MenuItem = window.portalui_MenuItem;
window.portalui_MenuItem.implement({
	addChild: function(child){
	    if (child instanceof portalui_MenuItem){
	        window.portalui_MenuItem.prototype.parent.addChild.call(this, child);    
	        if (this.menuForm == undefined){             
				   var app = this.getApplication();
				   this.menuForm = new portalui_MenuForm(app);	
	        }
	        
	        if (this.menuForm != undefined)
	            this.menuForm.addItem(child);
	            
	        this.onChange.call(this);
	    }
	},
	popUp: function(parentForm, x, y){
		try{
		    if (this.menuForm != undefined)
		    {
		        this.menuForm.setParentForm(parentForm);
		        this.menuForm.popUp(x, y);
		    }
		}catch(e){
			alert("rujaxmnuItem.popUp."+e);
		}
	},
	getPopUpMenu: function(){
	    var result = this.owner;	    
	    while ((result != undefined) && !(result instanceof portalui_PopUpMenu))
	        result = result.getOwner();	    	    
	    return result;
	},
	getCaption: function(){
		return this.caption;
	},
	setCaption: function(data){
	    if (this.caption != data){
	        this.caption = data;
	        this.onChange.call(this);
	    }
	},
	getIcon: function(){
		return this.icon;
	},
	setIcon: function(data){
	    if (this.icon != data){
	        this.icon = data;
	        this.onChange.call(this);
	    }
	},
	getFormHeight: function(){
	    if (this.menuForm != undefined)
	        return this.menuForm.getHeight();
	    else
	        return 0;
	},
	setData: function(data, dataType){
		this.data = data;
		this.dataType = dataType;
	},
	getData: function(){
		return this.data;
	},
	getDataType: function(){
		return this.dataType;
	}
});
