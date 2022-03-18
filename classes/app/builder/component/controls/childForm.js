//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_childForm = function(owner,options){
    if (owner)
    {
		this.caption = "";	
		window.app_builder_component_controls_childForm.prototype.parent.constructor.call(this, owner,options);		
		this.className = "portalui_childForm";
		this.owner = owner;
		this.bgColor = system.getConfig("form.color");
		this.border = 0;
		this.activeControl = undefined;
		this.active = false;
		this.onClose = new portalui_eventHandler();
		this.opacity = 0;	
		this.setTop(owner.childTop);
		if(options !== undefined){
			this.updateByOptions(options);		
			if (options.color !== undefined) this.setColor(options.color);												
		}
		this.addProperty({className:"portalui_sysForm",color:this.color,border:this.border});
		this.addEvent({close:""});
    }
};
window.app_builder_component_controls_childForm.extend(window.app_builder_component_controls_containerControl);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_childForm.implement({
	doDraw: function(canvas){		
		var n = this.getFullId();
	    var html = "";    
		var nd = canvas;			
		nd.style.background = system.getConfig("form.color");
		nd.style.overflow = "auto";
	    if (document.all)
	        html =  "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' "+
						"onMouseDown ='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);'"+
					"></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    else
	        html =  "<div id='" + n + "form' style='{background:transparent;position: absolute; left: 0; top: 0; width: 100%; height: 100%;overflow:auto}' "+
						"onMouseDown ='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);'"+
					"></div>"+//background:url(image/background.png) top left no-repeat;
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    this.setInnerHTML(html, nd);
	},
	setColor: function(data){
		this.setProperty("color",data);
		this.bgColor = data;
		var nd = this.getContainer();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorder: function(data){
		this.setProperty("border",data);
	    if (this.border != data){
	        var node = undefined;
			this.border = data;
	        var n = this.getFullId();	       
	        switch (data)
	        {
	            case 0 : // none
	                    node = $(n + "_border1");	                    
	                    if (node != undefined)
	                        node.style.border = "";	                        
	                    node = $(n + "_border2");
	                    if (node != undefined)
	                        node.style.border = "";
	                    break;
	            case 1 : // raised
	                    node = $(n + "_border1");
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
	                        node.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
	                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
	                    }	                    
	                    break;
	            case 2 : // lowered
	                    node = $(n + "_border1");
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
	                        node.style.borderTop = window.system.getConfig("3dborder.outer.top");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("3dborder.outer.right");
	                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
	                    }
	                    break;
				case 3 : // bordered
	                    node = $(n + "_border1");
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("nonborder.inner.right");
	                        node.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("nonborder.inner.left");
	                        node.style.borderBottom = window.system.getConfig("nonborder.inner.top");
	                    }	                    
	                    break;
	        }
	    }
	},
	setCaption: function(data){
		this.caption = data;	
	},
	doAfterResize: function(){
	},
	maximize: function(){
		this.isMaximized = true;
	    this.realWidth = this.width;
	    this.realHeight = this.height;
	    this.realLeft = this.left;
	    this.realTop = this.top;	    
		if (this.owner !== undefined){
			var node = this.owner.getContainer();
			var width = node.offsetWidth;
			var height = node.offsetHeight - (this.owner.childTop + 23);
			var offWidth=0;
			var offHeight=0;
			this.setBound(0,this.owner.childTop,width,height);			
			this.doAfterResize(width, height);
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
		try{			
			if (this.owner != undefined){
				var child = undefined;
				for (var i in this.owner.childs.objList){
					child = window.system.getResource(this.owner.childs.objList[i]);
					if (child instanceof portalui_panel)
						child.block();					
				}				
			}	
		}catch(e){
			alert("[app_builder_component_controls_childForm] :: block : " + e);
		}
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
		if (this.owner != undefined){
			var child = undefined;
			for (var i in this.owner.childs.objList){
				child = window.system.getResource(this.owner.childs.objList[i]);
				if (child instanceof portalui_panel)
					child.unblock();
			}
		}
	},
	doDefocusCtrl: function(control){
		control.doLostFocus();
		if (control.blur) control.blur();
		this.activeControl= undefined;
	},
	setActiveControl: function(control){
	    if (control != this.activeControl){
	        this.activate();
	        if (this.activeControl instanceof window.portalui_control)
	            this.activeControl.doLostFocus();
	        this.activeControl = control;
	        if (this.activeControl instanceof window.portalui_control)
	            this.activeControl.doSetFocus();
	    }
	},
	activate: function(oldApplication){	
		var app = window.system.getActiveApplication();
	    if (!this.getForm().active){
	        this.active = true;
	        app.setActiveForm(this.getForm());
	    }
		app.activate();
	},
	show: function(){
		try{
			this.setVisible(true);	
			//this.fade();		    
	        var firstControl = undefined;
	        var tabIndex = 100000;
	        var tabControl = undefined;	    
	        var ctrl = undefined;
	        for (var i in this.childs.objList){
	            ctrl = window.system.getResource(this.childs.objList[i]);			
				if (ctrl !== undefined){
		            if ((ctrl.className == "portalui_saiEdit") || (ctrl.className == "portalui_saiCB") ||  (ctrl.className == "portalui_saiCBBL") ||
						(ctrl.className == "portalui_saiLabelEdit")) 
		            {
						if (!ctrl.readOnly)
						{
							if (firstControl == undefined)
								firstControl = ctrl;
							
							if (ctrl.getTabIndex() < tabIndex)
							{
								tabControl = ctrl;
								tabIndex = ctrl.getTabIndex();
							}
						}
		            }
				}
	        }
	        if (tabControl != undefined)
					tabControl.setFocus();
	        else if (firstControl != undefined)			
					firstControl.setFocus();						
		this.activeControl = firstControl;
		if (this.activeControl !== undefined)
			this.activeControl.setFocus();
		}catch(e){
			alert("[app_builder_component_controls_childForm]::show:"+e+"\r\n"+this.activeControl+"-"+ctrl);
		}
	},
	prevCtrl: function(){
		var nextControl = tabControl = undefined;
		var firstControl = this.activeControl();	
		if (this.activeControl != undefined){
			var tabIndex = this.activeControl.getTabIndex(); 
			for (var i in this.childs.objList){
				ctrl = window.system.getResource(this.childs.objList[i]);			
				if ((ctrl.className == "portalui_saiEdit") || (ctrl.className == "portalui_saiCB") ||  (ctrl.className == "portalui_saiCBBL") ||
					(ctrl.className == "portalui_saiLabelEdit") || (ctrl.className == "portalui_button") || (ctrl.className == "portalui_imageButton")) 
				{
					if (!ctrl.readOnly){
						if (nextControl == undefined)
							nextControl = ctrl;						
						if (ctrl.getTabIndex() = tabIndex - 1)
						{
							tabControl = ctrl;
							//tabIndex = ctrl.getTabIndex();
							break;
						}
					}
				}
			}
			if (tabControl != undefined)
				tabControl.setFocus();
			else if (firstControl != undefined)
				firstControl.setFocus();
		}
	},
	doKeyDown: function(keyCode, buttonState){
		try{		   
		    if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
	    	    this.activeControl.doKeyDown(keyCode, buttonState);
	    	  
		}catch(e){
			alert("[app_builder_component_controls_childForm]::doKeyDown:"+e+"\r\n"+this.activeControl);
		}
	},
	doKeyUp: function(keyCode, buttonState){
		try{
			 if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
				this.activeControl.doKeyUp(keyCode, buttonState);
		}catch(e){
			alert("[app_builder_component_controls_childForm]::doKeyUp:"+e+"\r\n"+this.activeControl);
		}
	},
	doKeyPress: function(charCode, buttonState){
		try{
			if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
				this.activeControl.doKeyPress(charCode, buttonState);
		}catch(e){
			alert("[app_builder_component_controls_childForm]::doKeyPress:"+e+"\r\n"+this.activeControl);
		}
	},
	eventMouseDown:  function(event){	
		var target = document.all ? event.srcElement : event.target;
		if (target.id.search("form") != -1) this.doDefocusCtrl(this.activeControl);
	},
	doSysMouseDown: function(x, y, button, buttonState){
		if (this.getApplication().dropDownCB != undefined) 
			this.getApplication().dropDownCB.close();
		if (this.getApplication().dropDown != undefined)
			this.getApplication().dropDown.hide();		
	},
	doModalResult: function(sender, modalResult){
	},
	free: function(){	
		if (window.systemDatePickerForm != undefined) window.systemDatePickerForm.hide();
		window.app_builder_component_controls_childForm.prototype.parent.free.call(this);
		this.onClose.call(this);		
	}
});
