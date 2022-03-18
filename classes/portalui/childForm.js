//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_childForm = function(owner){
    if (owner)
    {
		this.caption = "";	
		window.portalui_childForm.prototype.parent.constructor.call(this, owner);		
		this.className = "portalui_childForm";
		this.owner = owner;
		this.bgColor = system.getConfig("form.color");
		this.border = 0;
		this.activeControl = undefined;
		this.active = false;
		this.onClose = new portalui_eventHandler();
		this.opacity = 0;	
		this.setTop(owner.childTop);
    }
};
window.portalui_childForm.extend(window.portalui_containerControl);
window.childForm = window.portalui_childForm;
//---------------------------- Function ----------------------------------------
window.portalui_childForm.implement({
	draw: function(canvas){
		window.portalui_childForm.prototype.parent.draw.call(this, canvas);
		canvas.style.zIndex = 100;
		var n = this.getFullId();
		var nd = this.getCanvas();
		nd.style.background = system.getConfig("form.color");
		nd.style.overflow = "auto";
	    var html =  "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width:100%; height: 100%;overflow:auto}' "+
						"onMouseDown ='$$(" + this.resourceId + ").eventMouseDown(event);'"+
					"></div>"+
					"<div id='" + n + "_block' style='{background:#636564; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%;z-index:99}' ></div>"+
					"<div id='" + n + "_loading' style='display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%;z-index:99}' align='center' >"+
						"<div style='position:absolute;background:#636564; filter:alpha(opacity:40);opacity:0.7;moz-opacity:0.7;width:100%;left:0;top:0;height:100% '></div>"+
						"<img id='"+n+"_imgloading' style='position:absolute;' src='image/circle2.gif'/><br><div id='"+n+"_textloading' style='position:absolute;width:auto;font-style:italic;color:#ffffff'>Wait...</div>"+
					"</div>";
	    this.setInnerHTML(html, nd);
	},
	free: function(){		
		window.portalui_childForm.prototype.parent.free.call(this);				
		this.onClose.call(this);
	},
	setColor: function(data){
		this.bgColor = data;
		var nd = this.getCanvas();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorder: function(data){	
	    if (this.border != data){
	        var node = undefined;
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
	doAfterResize: function(width, height){
		var cnv = $(this.getFullId()+"_textloading");
		if (cnv) {		
			var w = parseFloat(cnv.offsetWidth);
			if (w > 200) {
				cnv.style.width = 200;
				w = 200;
			}
			cnv.style.top = this.height / 2 + 30;
			cnv.style.left = this.width / 2 - (w / 2);			
		}
		cnv =  $(this.getFullId()+"_imgloading");
		if (cnv){
			cnv.style.top = this.height / 2 - 30;
			cnv.style.left = this.width / 2 - 30;			
		}
	},
	maximize: function(){
		this.isMaximized = true;
	    this.realWidth = this.width;
	    this.realHeight = this.height;
	    this.realLeft = this.left;
	    this.realTop = this.top;	    
		if (this.owner !== undefined){
			var node = this.owner.getCanvas();
			var width = node.offsetWidth;
			if (this.app._mainForm.sb)
				var height = node.offsetHeight - (this.owner.childTop + 23);	
			else var height = node.offsetHeight - (this.owner.childTop);
			var offWidth=0;
			var offHeight=0;
			this.setBound(0,this.owner.childTop,width,height);			
			this.doAfterResize(width, height);
		}
	},
	block: function(localy){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
		if (localy === undefined){
			try{			
				if (this.owner != undefined){
					var child = undefined;
					for (var i in this.owner.childs.objList){
						child = $$(this.owner.childs.objList[i]);
						if (child instanceof portalui_panel)
							child.block();					
					}				
				}	
			}catch(e){
				systemAPI.alert(this+"$block()",e);
			}
		}
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
		if (this.owner != undefined){
			var child = undefined;
			for (var i in this.owner.childs.objList){
				child = $$(this.owner.childs.objList[i]);
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
        return false;  
	},
	activate: function(oldApplication){	
		var app = this.app;//window.system.getActiveApplication();
	    if (!this.getForm().active){
	        this.active = true;
	        app.setActiveForm(this.getForm());
	    }		
		/*if ($(this.getFullId() + "_block").style.display == "none") {
			this.bringToFront();
			app.activeForm.setActiveForm(this);
		}*/
		app.activate();
	},
	show: function(){
		try{
			this.setVisible(true);		    
	        var firstControl = undefined;
	        var tabIndex = 100000;
	        var tabControl = undefined;	    
	        var ctrl = undefined;
	        for (var i in this.childs.objList){
	            ctrl = $$(this.childs.objList[i]);			
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
			systemAPI.alert(this+"$show()",e);
		}
	},	
	doKeyDown: function(charCode, buttonState,keyCode,event){
		try{		   						
			if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
				this.activeControl.doKeyDown(charCode, buttonState,keyCode,event);
			return false;
	    	  
		}catch(e){
			alert("[portalui_childForm]::doKeyDown:"+e+"\r\n"+this.activeControl);
		}
	},
	doKeyUp: function(keyCode, buttonState){
		try{
			 if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
				this.activeControl.doKeyUp(keyCode, buttonState,keyCode);
		}catch(e){
			systemAPI.alert(this+"$doKeyUp()",e);
		}
	},
	doKeyPress: function(charCode, buttonState,keyCode){
		try{
			if ((this.activeControl instanceof portalui_control) || (this.activeControl instanceof portalui_containerControl ))
				this.activeControl.doKeyPress(charCode, buttonState,keyCode);
		}catch(e){
			systemAPI.alert(this+"$doKeyPress()",e);
		}
	},
	eventMouseDown:  function(event){	
		var target = document.all ? event.srcElement : event.target;
		//if (target.id.search("form") != -1) this.doDefocusCtrl(this.activeControl);
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
		window.portalui_childForm.prototype.parent.free.call(this);
		this.onClose.call(this);		
	},
	close: function(){
		this.free();
	},
	showLoading: function(text){
		$(this.getFullId()+"_loading").style.display = "";
		var cnv = $(this.getFullId()+"_textloading");
		if (cnv) {
			cnv.innerHTML = text;
			var w = parseFloat(cnv.offsetWidth);
			if (w > 200) {
				cnv.style.width = 200;
				w = 200;
			}
			cnv.style.top = this.height / 2 + 30;
			cnv.style.left = this.width / 2 - (w / 2);			
		}
		cnv =  $(this.getFullId()+"_imgloading");
		if (cnv){
			cnv.style.top = this.height / 2 - 30;
			cnv.style.left = this.width / 2 - 30;			
		}
	},
	hideLoading : function(text){
		$(this.getFullId()+"_loading").style.display = "none";
	}
});
