//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_containerComponent = function(owner){
    if (owner)
    {
        window.portalui_containerComponent.prototype.parent.constructor.call(this, owner);
        this.className = "portalui_containerComponent";        
        this.childs = new portalui_arrayMap();		
		this.isContainer = true;
    }
};
window.portalui_containerComponent.extend(window.portalui_component);
window.containerComponent = window.portalui_containerComponent;
//---------------------------- Function ----------------------------------------
window.portalui_containerComponent.implement({
	addChild: function(child){	
		try{
			if (child instanceof portalui_component)
				this.childs.objList[child.getResourceId()] =  child.getResourceId();
		}catch(e){
			alert("componentContainer add Child "+e);
		}
	},
	delChild: function(child){
		if (child instanceof portalui_component)
			this.childs.del(child.getResourceId());
	},
	clearChild: function(){
	   try{
    		var child = undefined;
    	    for (var i in this.childs.objList)
    	    {
    	        child = window.system.getResource(i);
    
    	        if (child instanceof portalui_component)
    	            child.free();
    	    }
    
    	    this.childs.clear();
        }catch(e){
            systemAPI.alert(this+"$clearChild()",e);
        }
	},
	free: function(){
	    this.clearChild();
	    window.portalui_containerComponent.prototype.parent.free.call(this);
	},
	isHasChild: function(){	   
		var result = false;    
	    for (var i in this.childs.objList)
	    {
	        result = true;
	        break;
	    }
	    
	    return result;
	}
});
