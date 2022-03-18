//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_imageButton= function(owner, options){
    if (owner)
    {
        window.portalui_imageButton.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_imageButton";
        this.fileName = "images/blank.gif";
		this.hint = "";        
		this.showHint = true;
        this.onClick = new portalui_eventHandler();
		this.tabStop = true;
		this.caption = "";
		this.tag1 = undefined;
		this.color = system.getConfig("form.button.color");
		this.noImage = false;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.image) this.setImage(options.image);				
			if (options.color) this.setColor(options.color);				
			if (options.noImage) this.setNoImage(options.noImage);				
			if (options.caption) this.setCaption(options.caption);							
			if (options.click){ 
                if (typeof options.click == "string")
                    this.onClick.set(this.getTargetClass(),options.click);
                else this.onClick.set(options.click[0],options.click[1]);					
            }
		}
    }
};
window.portalui_imageButton.extend(window.portalui_control);
window.imageButton = window.portalui_imageButton;
//---------------------------- Function ----------------------------------------
window.portalui_imageButton.implement({
	doDraw: function(canvas){
	    canvas.style.background = "url(images/blank.gif) 0 0 no-repeat";
	    var n = this.getFullId();	    
		var height = 23;
		var top = 0;
		if (this.noImage)
			top = 0;
		else
			top = 3;
		if (document.all)
			height = 22;				
	    var html =  "<div id='" + n + "_frame' style='{background: url(images/transparent.png); position: absolute; left: 0; top: 0; "+
						"width: 100%; height: "+height+"; cursor: pointer;}' " +
	                    "onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
	                    "onMouseOut ='window.system.getResource(" + this.resourceId + ").eventMouseOut(event);' " +
	                    "onMouseDown ='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);' " +
	                    "onMouseUp ='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
	                    "onClick ='window.system.getResource(" + this.resourceId + ").eventMouseClick(event);' " +
	                    "onMouseMove='window.system.getResource(" + this.resourceId + ").eventMouseMove(event);' " +
						"onkeydown='window.system.getResource(" + this.resourceId + ").doDown(event);'"+
	                    ">"+					
						"<div id='"+n+"_caption' align='center' style='{position:absolute;left:0;top: "+top+"; width:100%; height:"+height+"; color:"+system.getConfig("app.color.navigatorFont")+";}'><span id='"+ n +"_title' style='{position:absolute;left:0;top:0; width:100%; height:"+height+";}'></span></div>"+
						"<div id='"+ n +"_select' style='{display:none;background:url(icon/"+system.getThemes()+"/imgBtnSelect.png) no-repeat;top: 3;left: 3; width:100%; height:100%;}'></div>"+			
						"</div>";
	    this.setInnerHTML(html, canvas);
	},
	eventMouseOver: function(event){
	    var canvas = this.getCanvas();    
		if (canvas != undefined)
		{
			if (this.noImage)
				canvas.style.backgroundPosition = "0 0";
			else
				canvas.style.backgroundPosition = "0 -" + this.height;
		}
		if (this.showHint)
			window.system.showHint(event.clientX, event.clientY+20, this.hint);
	},
	eventMouseOut: function(event){
	    window.portalui_imageButton.prototype.parent.eventMouseOut.call(this, event);
	    
	    var canvas = this.getCanvas();
	    canvas.style.backgroundPosition = "0 0";
		canvas = $(this.getFullId()+"_caption");
		if (canvas != undefined)
		{
			if (this.noImage)
				canvas.style.top = 0;
			else
				canvas.style.top = 3;
		}
		canvas = $(this.getFullId()+"_select");
	},
	eventMouseDown: function(event){
	    this.setFocus();
		var canvas = this.getCanvas();
		if (this.noImage)
			canvas.style.backgroundPosition = "0 0";
	    else 
			canvas.style.backgroundPosition = "0 -" + (this.height * 2);
		canvas = $(this.getFullId()+"_caption");
		if (canvas != undefined)
		{
			if (this.noImage)
				canvas.style.top = 0;
			else
				canvas.style.top = 3;
		}
		canvas = $(this.getFullId()+"_select");				
		canvas.style.display = "";
		this.getForm().setActiveControl(this);
	},
	eventMouseClick: function(event){
		this.setFocus();
	    this.onClick.call(this);
	},
	getImage: function(){
		return this.fileName;
	},
	setImage: function(data){
	    if (this.fileName != data)
	    {
	        this.fileName = data;
	        var fileName = this.fileName; 
	        
	        var canvas = this.getCanvas();
	        canvas.style.background = "url(" + fileName + ") 0 0 no-repeat";
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
				DD_belatedPNG.fixPng(canvas);
			}
	    }
	},
	doKeyUp: function(keyCode, buttonState){
		var canvas = this.getCanvas();
		canvas.style.backgroundPosition = "0 0";
	},
	doDown: function(event){		
		if (keyCode == 13){		
			this.setFocus();		
			this.onClick.call(this);		
			var canvas = this.getCanvas();
			canvas.style.backgroundPosition = "0 -"+ (this.height * 2);				
			this.owner.nextCtrl(this);
		}else if (keyCode == 9)
			this.owner.nextCtrl(this);	
		else if (keyCode == 27)
			this.owner.prevCtrl(this);
        return false;	
	},
	doKeyDown: function(charCode, buttonState, keyCode){								
		if (keyCode == 13){		
			this.setFocus();		
			this.onClick.call(this);		
			var canvas = this.getCanvas();
			canvas.style.backgroundPosition = "0 -"+ (this.height * 2);				
			this.owner.nextCtrl(this);
		}else if (keyCode == 9)
			this.owner.nextCtrl(this);	
		else if (keyCode == 27)
			this.owner.prevCtrl(this);	
		return false;
	},
	doSetFocus: function(){
		var canvas = this.getCanvas();
		if (canvas !== undefined && canvas != null) canvas.style.backgroundPosition = "0 -"+ (this.height * 2);
		canvas = $(this.getFullId()+"_select");
		if (canvas !== undefined && canvas != null) canvas.style.display = "";
	},
	doLostFocus: function(){
		var canvas = this.getCanvas();
		if (canvas !== undefined && canvas != null) canvas.style.backgroundPosition = "0 0";
		canvas = $(this.getFullId()+"_select");
		if (canvas !== undefined && canvas != null) canvas.style.display = "none";		
	},
	setCaption: function(data){
		this.caption = data;
		var canvas = $(this.getFullId()+"_title");
		if (canvas != undefined)
			canvas.innerHTML = data;
	},
	setTag1: function(data){
		this.tag1 = data;
	},
	getTag1: function(){
		return this.tag1;
	},
	setNoImage: function(data){
		this.noImage = data;		
		if (data)
		{
			var canvas = $(this.getFullId() + "_caption");
			//canvas.style.background = this.color;
			canvas.style.background = "url(" + this.fileName + ") 0 0 no-repeat";
			canvas.style.top = 0;
			//canvas.style.border = system.getConfig("nonborder.inner.bottom");	
			canvas = this.getCanvas();
		}else
		{
			var canvas = this.getCanvas();
	        canvas.style.background = "url(" + this.fileName + ") 0 0 no-repeat";
			canvas.style.border = "";
		}
	},
	click: function(){
	   this.onClick.call(this); 
	}
});
