//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_radioButton = function(owner, options){
    if (owner){
        window.app_builder_component_controls_radioButton.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_radioButton";
        window.app_builder_component_controls_radioButton.prototype.parent.setWidth.call(this, 13);
        window.app_builder_component_controls_radioButton.prototype.parent.setHeight.call(this, 13);
        this.selected = false;
        this.onChange = new portalui_eventHandler();
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.color !== undefined) this.setColor(options.color);									
			if (options.selected !== undefined) this.setSelected(options.selected);							
		}
		this.addProperty({className:this.className, color:this.color, selected:this.selected, caption:this.caption});	
		this.addEvent({change:""});
    }
};
window.app_builder_component_controls_radioButton.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_radioButton.implement({
	doDraw: function(canvas){
	    canvas.style.background = "url(image/themes/"+system.getThemes()+"/radioButton.png) 0 0 no-repeat";    
	    var n = this.getFullId();

	    var html = "<div id='" + n + "_frame' style='{cursor: pointer;position: absolute; left: 0; top: 0; width: 100%; height: 100%}' " +
	                    "onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
	                    "onMouseOut ='window.system.getResource(" + this.resourceId + ").eventMouseOut(event);' " +
	                    "onMouseDown ='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);' " +
	                    "onMouseUp ='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
	                    "onClick ='window.system.getResource(" + this.resourceId + ").eventMouseClick(event);' " +
	                    "onMouseMove='window.system.getResource(" + this.resourceId + ").eventMouseMove(event);' " +
	                    ">"+
						"<div id='" + n + "_caption' style='{position : absolute; left: 14; top:0; width:100%; height:100%; }'>"+
						"<nobr> Radiobutton </nobr></div>"
						+"</div>";
	    this.setInnerHTML(html, canvas);
	},
	doThemesChange: function(themeName){
	    var canvas = this.getContainer();

	    if (this.selected)
	        canvas.style.background = "url(image/themes/"+system.getThemes()+"/radioButton.png) -13 0 no-repeat";
	    else
	        canvas.style.background = "url(image/themes/"+system.getThemes()+"/radioButton.png) 0 0 no-repeat";
	},
	eventMouseOver: function(event){
	    var canvas = this.getContainer();

	    if (this.selected)
	        canvas.style.backgroundPosition = "-13 -13";
	    else
	        canvas.style.backgroundPosition = "0 -13";
	},
	eventMouseOut: function(event){
	    var canvas = this.getContainer();
	    if (this.selected)
	        canvas.style.backgroundPosition = "-13 0";
	    else
	        canvas.style.backgroundPosition = "0 0";
	},
	eventMouseDown: function(event){
	    var canvas = this.getContainer();
	    if (this.selected)
	        canvas.style.backgroundPosition = "-13 -26";
	    else
	        canvas.style.backgroundPosition = "0 -26";
	},
	eventMouseClick: function(event){
	    if (!this.selected){
	        this.synchronize();
	        this.selected = true;
	        this.eventMouseOver(event);
	        this.onChange.call(this, this.selected);
	    }
	    else
	        this.eventMouseOver(event);
	},
	synchronize: function(){
	    if (this.owner != undefined){
	        var control = undefined;	       
	        for (var i in this.owner.childs.objList)
	        {
	            control = window.system.getResource(this.owner.childs.objList[i]);
	            
	            if (control instanceof app_builder_component_controls_radioButton)
	            {
	                if (control != this)
	                    control.synchDeselect();
	            }
	        }
	    }
	},
	synchDeselect: function(){
	    if (this.selected){
	        this.selected = false;
	        this.eventMouseOut(undefined);
	        this.onChange.call(this, this.selected);
	    }
	},
	doAfterLoad: function(){
	    window.app_builder_component_controls_radioButton.prototype.parent.doAfterLoad.call(this);
	    this.loading = true;
	    this.setSelected(this.selected);
	    this.loading = false;
	},
	isSelected: function(){
		return this.selected;
	},
	setSelected: function(data){
	    if ((this.selected != data) || this.loading){
	        this.selected = data;
			this.setProperty("selected",data);
	        var canvas = this.getContainer();
	        
	        if (this.selected)
	        {
	            this.synchronize();
	            canvas.style.backgroundPosition = "-13 0";
	        }
	        else
	            canvas.style.backgroundPosition = "0 0";
	        
	        this.onChange.call(this, this.selected);
	    }
	},
	setWidth: function(data){
		window.app_builder_component_controls_radioButton.prototype.parent.setWidth.call(this,data);
		var n = this.getFullId() +"_caption";
		var node = $(n);
		if (node != undefined)
			node.style.width = data;
	},
	setHeight: function(data){
		window.app_builder_component_controls_radioButton.prototype.parent.setWidth.call(this,14);				
	},		
	setCaption: function(data){
		this.caption = data;		
		this.setProperty("caption",data);
		var n = this.getFullId() +"_caption";
		var node = $(n);
		if (node != undefined)
			node.innerHTML = data;
	},
	getCaption: function(){
		return this.caption;
	}
});