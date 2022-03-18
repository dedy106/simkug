//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_imageButton= function(owner, options){
    if (owner)
    {
        window.app_builder_component_controls_imageButton.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_imageButton";
        this.fileName = "images/blank.gif";
		this.hint = "image button";        
		this.showHint = true;
        this.onClick = new portalui_eventHandler();
		this.tabStop = true;
		this.caption = "";
		this.tag1 ="";
		this.color = system.getConfig("form.button.color");
		this.noImage = false;
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.image !== undefined) this.setImage(options.image);				
			if (options.color !== undefined) this.setColor(options.color);				
			if (options.noImage !== undefined) this.setNoImage(options.noImage);				
			if (options.caption !== undefined) this.setCaption(options.caption);							
			if (options.click !== undefined) this.onClick.set(options.click[0],options.click[1]);				
		}
		this.addProperty({className:this.className,color:this.color, image:this.fileName, noImage:this.noImage,caption:this.caption, tag1:this.tag1});	
		this.addEvent({click:""});
    }
};
window.app_builder_component_controls_imageButton.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_imageButton.implement({
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
						"onkeydown='window.system.getResource(" + this.resourceId + ").doKeyDown(event);'"+
	                    ">"+					
						"<div id='"+n+"_caption' align='center' style='{position:absolute;left:0;top: "+top+"; width:100%; height:"+height+"; color:"+system.getConfig("app.color.labelCaption")+";}'><span id='"+ n +"_title' style='{position:absolute;left:0;top:0; width:100%; height:"+height+";}'></span></div>"+
						"<div id='"+ n +"_select' style='{display:none;background:url(icon/"+system.getThemes()+"/imgBtnSelect.png) no-repeat;top: 3;left: 3; width:100%; height:100%;}'></div>"+			
						"</div>";
	    this.setInnerHTML(html, canvas);
	},
	eventMouseOver: function(event){
	    var canvas = this.getContainer();    
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
	    window.app_builder_component_controls_imageButton.prototype.parent.eventMouseOut.call(this, event);
	    
	    var canvas = this.getContainer();
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
		var canvas = this.getContainer();
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
			this.setProperty("image",data);
	        var fileName = this.fileName; 
	        
	        var canvas = this.getContainer();
	        canvas.style.background = "url(" + fileName + ") 0 0 no-repeat";
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){				
				DD_belatedPNG.fixPng(canvas);
			}
	    }
	},
	doKeyUp: function(keyCode, buttonState){
		var canvas = this.getContainer();
		canvas.style.backgroundPosition = "0 0";
	},
	doKeyDown: function(charCode, buttonState, keyCode){			
		if (keyCode == 13){		
			this.setFocus();		
			this.onClick.call(this);		
			var canvas = this.getContainer();
			canvas.style.backgroundPosition = "0 -"+ (this.height * 2);				
		}else if (keyCode == 9)
			this.owner.nextCtrl(this);	
	},
	doSetFocus: function(){
		var canvas = this.getContainer();
		canvas.style.backgroundPosition = "0 -"+ (this.height * 2);
		canvas = $(this.getFullId()+"_select");
		canvas.style.display = "";
	},
	doLostFocus: function(){
		var canvas = this.getContainer();
		canvas.style.backgroundPosition = "0 0";
		canvas = $(this.getFullId()+"_select");
		canvas.style.display = "none";
	},
	setCaption: function(data){
		this.caption = data;
		this.setProperty("caption",data);
		var canvas = $(this.getFullId()+"_title");
		if (canvas != undefined)
			canvas.innerHTML = data;
	},
	setTag1: function(data){
		this.tag1 = data;
		this.setProperty("tag1",data);
	},
	getTag1: function(){
		return this.tag1;
	},
	setNoImage: function(data){
		this.noImage = data;		
		this.setProperty("noImage",data);
		if (data)
		{
			var canvas = $(this.getFullId() + "_caption");
			//canvas.style.background = this.color;
			canvas.style.background = "url(" + this.fileName + ") 0 0 no-repeat";
			canvas.style.top = 0;
			//canvas.style.border = system.getConfig("nonborder.inner.bottom");	
			canvas = this.getContainer();
		}else
		{
			var canvas = this.getContainer();
	        canvas.style.background = "url(" + this.fileName + ") 0 0 no-repeat";
			canvas.style.border = "";
		}
	},
	click: function(){
		this.onClick.call(this); 
	}
});