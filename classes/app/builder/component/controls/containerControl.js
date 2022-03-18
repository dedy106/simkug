//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_containerControl = function(owner,options){
	try
	{
		if (owner)
		{			
			window.app_builder_component_controls_containerControl.prototype.parent.constructor.call(this, owner,options);			
			this.className = "portalui_containerControl";
			this.childs = new portalui_arrayMap();
			this.nextZIndex = 1;			
			this.isContainer = true;
			this.childsIndex = [];
		}
	}catch(e)
	{
		alert("[containerControl]::contructor:"+e);
	}
};
window.app_builder_component_controls_containerControl.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_containerControl.implement({
	addChild: function(child){		
		try{
			var step = "check child";			
		    if ((child instanceof portalui_component))
		    {
				step = "add to list";
		        this.childs.set(child.getResourceId(), child.getResourceId());
				this.childsIndex[this.childsIndex.length] = child.getResourceId();
		        if (child instanceof portalui_control)
		        {
					step = "get Canvas";
		            var canvas = this.getClientCanvas();					
		            if (canvas != undefined && child.draw){
						step = "draw Canvas "+canvas.id;
		                child.draw(canvas);
					}
		        }			
				if (this instanceof system_system){
					this.applicationList.set(child.resourceId, child.resourceId);
				}
		    }
		}catch(e){
			systemAPI.alert("control add Child "+e+"--"+this+" "+child.className+"\n"+step);
		}
	},
	delChild: function(child){
		try{
			if (child instanceof portalui_component)
		    {		
				var res = child.resourceId;
		        delete this.childs.objList[child.getResourceId()];
		        if (child instanceof portalui_control)
		        {
		            var canvas = this.getClientCanvas();
		            var node = $(child.getFullId());
		            if (node != undefined)
		            {
		                if (canvas != undefined)
		                    canvas.removeChild(node);
		            }	
		        }				
				var tmp = [];
				for (var i in this.childsIndex){
					if (this.childsIndex[i] != res)
						tmp[tmp.length] = this.childsIndex[i];
				}
				this.childsIndex = tmp;
		    }	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	setTabChildIndex: function(startIndex){
		try
		{
			var j = startIndex;
			if (startIndex == undefined)
				j = 0;
			var child = undefined;
			for (var i in this.childs.objList)	
			{				
				child = window.system.getResource(i);
				j++;
				if (child instanceof portalui_containerControl){
					child.setTabIndex(j);
					child.setTabChildIndex(j);
				}else if (child instanceof portalui_control)
				{
					child.setTabIndex(j);
				}
			}
		}catch(e)
		{
			systemAPI.alert("[containerControl]::setTabChildIndex:"+e+"\r\n"+child);
		}
	},
	clearChild: function(){
		try
		{
			var child = undefined;
			this.childsIndex = [];
			for (var i in this.childs.objList){				
				child = window.system.getResource(i);	
				if (child instanceof portalui_component)
					child.free();
			}			  
			this.childs.objList = [];	    
		}catch(e)	
		{
			alert("[containerControl]::clearChild:"+e+"\r\n"+child);
		}
	},
	free: function(){
	    this.clearChild();
	    if (this.className == "portalui_childForm")
			this.onClose.call(this);
		window.portalui_containerControl.prototype.parent.free.call(this);    	
		if (this instanceof portalui_commonForm){
			var cnv2 = this.getCanvas();
		    if (cnv2 != undefined)      
		      cnv2.parentNode.removeChild(cnv2);
		}
	},
	prevCtrl: function(sender){
	},
	nextCtrl: function(sender){
		try
		{
			var tmp = undefined;
			var step = "init";
			var nextTabIndex = sender.getTabIndex() + 1000;
			var nextTabStop = undefined;			
			if (sender.blur) sender.blur();			
			sender.doLostFocus();
			step = "check child "+sender;
			for (var i in this.childs.objList)
			{
				tmp = window.system.getResource(this.childs.objList[i]);							
				if (tmp instanceof portalui_containerControl){				
					nextTabStop = tmp.nextCtrl(sender);
				}else if ((tmp instanceof portalui_control) && (tmp != sender) && tmp.isTabStop())
				{				
					if ((tmp.getTabIndex() >= sender.getTabIndex()) && (tmp.getTabIndex() < nextTabIndex))
					{
						nextTabStop = tmp;
						nextTabIndex = tmp.getTabIndex();
						break;
					}
				}
			}
			if (nextTabStop == undefined)
			{			
				if (this instanceof portalui_childForm)	;			
				else if (this instanceof portalui_containerControl){
					return undefined;
				}
				for (var i in this.childs.objList)
				{
					
					tmp = window.system.getResource(this.childs.objList[i]);
					if ((tmp instanceof portalui_control) && (tmp != sender) && tmp.isTabStop())
					{
						nextTabStop = tmp;
						break;
					}
				}
			}			
			step = "check "+nextTabStop;
			if (nextTabStop instanceof portalui_control){
				step = "set focus "+nextTabStop;
				nextTabStop.setFocus();
				step = "check comp "+nextTabStop;
				if ((nextTabStop.className ==  "portalui_button" || nextTabStop.className == "portalui_imageButton") && this.setActiveControl){
					step = "activate "+nextTabStop;
					this.setActiveControl(nextTabStop);
				}				
				return nextTabStop;
			}
		}catch(e)
		{
			systemAPI.alert("[containerControl] :: nextCtrl : " + e,step);
		}
	},
	doThemesChange: function(themeName){
	    var child = undefined;    
	    for (var i in this.childs.objList)
	    {			
	        child = window.system.getResource(this.childs.objList[i]);        
	        if (child instanceof portalui_control)
	            child.doThemesChange(themeName);
	    }
	},
	isHasChild: function(){
	    var result = false;	    
	    for (var i in this.childs.objList)
	    {		
	        result = true;
	        break;
	    }	   
	    return result;
	},
	getNextZIndex: function(){
	    var result = this.nextZIndex;
	    this.nextZIndex++;    
	    return result;
	},
	getClientCanvas: function(){	    		
	    var result = $(this.getFullId() + "form");		
		if (result == undefined) result = $(this.getFullId() + "_form");		
	    return result;
	},
	getClientWidth: function(){
		return this.width;
	},
	getClientHeight: function(){
		return this.height;
	},
	rearrangeChild: function(startTop, padding){
		var tmp, tmpBfr;
		var topTmp, topComp = startTop;			
		for (var i=0;i < this.childsIndex.length; i++){
			
			tmp = window.system.getResource(this.childsIndex[i]);
			if (tmp instanceof portalui_control && !(tmp instanceof portalui_containerControl || tmp.className == "portalui_saiTable")){
				if (topTmp != undefined && topTmp != tmp.top){
					topTmp = tmp.top;
					tmp.setTop(topComp);				
				}else if (topTmp == undefined){
					topTmp = tmp.top;
					tmp.setTop(startTop);								
				}else if (topTmp == tmp.top){
					topTmp = tmp.top;
					topComp = topComp - padding;
					tmp.setTop(topComp);				
				}					
				if (tmp.className == "portalui_datePicker")
					topComp += padding - 2;
				else topComp += padding;
			}else if (tmp instanceof portalui_containerControl || tmp.className == "portalui_saiTable"){
				if (!(tmp.className == "portalui_panel" && tmp.caption == "Layout")){
					tmp.setTop(topComp);			
					topComp += tmp.getHeight();
					topComp += 5;
				}				
			}				
		}
	}	
});
