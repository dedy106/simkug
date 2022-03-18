//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_containerControl = function(owner){
	try
	{
		if (owner)
		{			
			window.portalui_containerControl.prototype.parent.constructor.call(this, owner);			
			this.className = "portalui_containerControl";
			this.childs = new portalui_arrayMap();
			this.nextZIndex = 1;			
			this.isContainer = true;
			this.childsIndex = [];
		}
	}catch(e)
	{
		systemAPI.alert(this+"$contructor()",e);
	}
};
window.portalui_containerControl.extend(window.portalui_control);
window.containerControl = window.portalui_containerControl;
//---------------------------- Function ----------------------------------------
window.portalui_containerControl.implement({
	addChild: function(child){		
		try{
		    if ((child instanceof portalui_component))
		    {			
		        this.childs.set(child.getResourceId(), child.getResourceId());
				this.childsIndex[this.childsIndex.length] = child.getResourceId();
		        if (child instanceof portalui_control)
		        {			
		            var canvas = this.getClientCanvas();					
		            if (canvas != undefined && child.draw)
		                child.draw(canvas);					
		        }			
				if (this instanceof system_system){
					this.applicationList.set(child.resourceId, child.resourceId);
				}
		    }
		}catch(e){
			systemAPI.alert(this+"$addChild()",e);
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
			systemAPI.alert(this+"$delChild()",e);
		}
	},
	setTabChildIndex: function(startIndex){
		try{
			var j = startIndex;
			if (startIndex == undefined)
				j = 0;
			var child = undefined;
			for (var i in this.childs.objList)	
			{				
				child = $$(i);
				if (child instanceof portalui_containerControl && child.className != "portalui_saiGrid" && child.className != "portalui_reportViewer"){
				    j++;
                    child.setTabIndex(j);
					child.setTabChildIndex(j);
				}else if (child instanceof portalui_control && child.isTabStop()){
				    j++;
					child.setTabIndex(j);					
				}
			}
		}catch(e){
			systemAPI.alert(this+"$setTabChildIndex()",e);
		}
	},
	clearChild: function(){
		try{
			var child = undefined;
			this.childsIndex = [];
			for (var i in this.childs.objList){	
				child = $$(i);	
				if (child instanceof portalui_component)
					child.free();
			}			  
			this.childs.objList = [];	    
		}catch(e){
			systemAPI.alert(this+"$clearChild()",e);
		}
	},
	free: function(){
	    this.clearChild();	    
		window.portalui_containerControl.prototype.parent.free.call(this);    	
		if (this instanceof portalui_commonForm){
			var cnv2 = this.getCanvas();
		    if (cnv2 != undefined)      
		      cnv2.parentNode.removeChild(cnv2);
		}
	},
	prevCtrl: function(sender){
	   try{
    	    var nextControl,tabControl;
			var tabIndex = sender.getTabIndex(); 
			var firstControl = sender;
			for (var i=this.childsIndex.length;i >=0 ;i--){
				ctrl = $$(this.childsIndex[i]);	
				if (ctrl instanceof portalui_containerControl && ctrl.className != "portalui_saiGrid" && ctrl.className != "portalui_reportViewer"){				
					tabControl = ctrl.prevCtrl(sender);
					if (tabControl) break;
				}else if ((ctrl instanceof portalui_control) && (ctrl != sender) && ctrl.isTabStop() && ctrl.isVisible())
				{
                    if (ctrl.getTabIndex() <= tabIndex)
					{
						tabControl = ctrl;
						//tabIndex = ctrl.getTabIndex();
						break;
					}					
				}				
			}			
            if (tabControl == undefined && sender.owner == this){
			     tabControl = firstControl;
            }
            if (tabControl != undefined){
				tabControl.setFocus();				
				//if ((tabControl.className ==  "portalui_button" || tabControl.className ==  "portalui_saiGrid"|| tabControl.className == "portalui_imageButton")){                    
                //    return tabControl.getForm().setActiveControl(tabControl);
				//}								
				if (tabControl.className ==  "portalui_saiGrid") {
                    if (tabControl.getRowCount() > 0 && tabControl.getColCount() > 0) {
                        tabControl.setRowIndex(0,0);tabControl.rows.get(0).showInplaceEdit(0);
                        tabControl.inplaceEdit.focus();
                    }
                }                    
			}	
			return tabControl;	
  		}catch(e){
            alert(e);
        }
	},
	nextCtrl: function(sender){
		try
		{
			var tmp;	
			var nextTabIndex = sender.getTabIndex() + 1000;// + 1000
			var nextTabStop = undefined;
			if (sender.blur) sender.blur();			
			sender.doLostFocus();
			for (var i in this.childs.objList)
			{
				tmp = $$(this.childs.objList[i]);
				//if (tmp instanceof portalui_containerControl && tmp.className != "portalui_saiGrid"){
				//	nextTabStop = tmp.nextCtrl(sender);
				//	break;
				//}else 
				if ((tmp instanceof portalui_control) && (tmp != sender) && tmp.isVisible())
				{				
					if ((tmp.getTabIndex() >= sender.getTabIndex()) && (tmp.getTabIndex() < nextTabIndex) )
					{
						if (tmp.isTabStop()){
							nextTabStop = tmp;
							nextTabIndex = tmp.getTabIndex();
						}else if (tmp instanceof portalui_containerControl && tmp.className != "portalui_saiGrid")
						{
							nextTabStop = tmp.nextCtrl(sender);
						}
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
					
					tmp = $$(this.childs.objList[i]);
					if ((tmp instanceof portalui_control) && (tmp != sender) && tmp.isTabStop())
					{
						nextTabStop = tmp;
						break;
					}
				}
			}			
			if (nextTabStop instanceof portalui_control){			    
				nextTabStop.setFocus();
				if ((nextTabStop.className ==  "portalui_button" || nextTabStop.className ==  "portalui_saiGrid"|| nextTabStop.className == "portalui_imageButton")){
                    nextTabStop.getForm().setActiveControl(nextTabStop);
				}								
				if (nextTabStop.className ==  "portalui_saiGrid") {
                    if (nextTabStop.getRowCount() > 0 && nextTabStop.getColCount() > 0) {
                        nextTabStop.setRowIndex(0,0);nextTabStop.rows.get(0).showInplaceEdit(0);
                        nextTabStop.inplaceEdit.focus();
                    }
                }                                
				return nextTabStop;
			}
		}catch(e)
		{
			systemAPI.alert(this+"$nextCtrl()",e);
		}
	},
	doDefocusCtrl: function(control){
		control.doLostFocus();
		if (control.blur) control.blur();
		this.activeControl= undefined;
	},
	setActiveControl: function(control){
	    try{
    		if (control != this.activeControl){
    			this.activate();
    			if (this.activeControl instanceof window.portalui_control)
    			    this.activeControl.doLostFocus();
    			this.activeControl = control;
    			if (this.activeControl instanceof window.portalui_control)
    			    this.activeControl.doSetFocus();
    		}
   		}catch(e){
   		   alert(e);
        }
	},
	activate: function(oldApplication){	
		var app = window.system.getActiveApplication();
		if (this.getForm() instanceof portalui_commonForm){
			if (!this.getForm().active){
				this.active = true;
				app.setActiveForm(this.getForm());
			}
		}else {
			var form = this.getForm();
			if (!form.getForm().active){
				this.active = true;
				app.setActiveForm(form.getForm());
			}
		}
		app.activate();
	},
	doThemesChange: function(themeName){
	    var child = undefined;    
	    for (var i in this.childs.objList)
	    {			
	        child = $$(this.childs.objList[i]);        
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
			tmp = $$(this.childsIndex[i]);					
			if (tmp instanceof portalui_control && !(tmp instanceof portalui_containerControl || tmp.className == "portalui_saiTable" || tmp.className == "portalui_richTextArea" || tmp.className == "portalui_saiMemo")){
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
				topComp += padding;				
			}else if (tmp instanceof portalui_containerControl || tmp.className == "portalui_saiTable" || tmp.className == "portalui_richTextArea" || tmp.className == "portalui_saiMemo"){
				if (!(tmp.className == "portalui_panel" && tmp.caption == "Layout")){
					if (topTmp != undefined && topTmp != tmp.top){					
						topTmp = tmp.top;
						tmp.setTop(topComp);				
					}else if (topTmp == undefined){
						topTmp = tmp.top;
						tmp.setTop(startTop);								
					}else if (topTmp == tmp.top){
						topTmp = tmp.top;
						topComp = topComp - tmpBfr.height - 5;
						tmp.setTop(topComp);				
					}							
					topComp += tmp.getHeight();
					topComp += 5;
				}				
			}	
			tmpBfr = tmp;			
		}		
	}
});
