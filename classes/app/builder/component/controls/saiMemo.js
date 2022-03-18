//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_saiMemo = function(owner,options){
    if (owner){
		this.stateRO 	= "";
        this.text 		= "";
		this.caption 	= "saiLabel";
		this.labelWidth = 100;
		this.type 		= "textarea";
		this.color      = system.getConfig("text.normalBgColor");
		this.fontColor  = system.getConfig("text.normalColor");
		this.alignment  = window.alLeft;
		this.isFocused = false;
		window.app_builder_component_controls_saiMemo.prototype.parent.constructor.call(this, owner,options);
        this.className = "portalui_saiMemo";        
        this.setWidth(80);
        this.wantTab = false;
        this.tabStop = true;
        this.password = false;
        this.readOnly = false;
		this.tipeText = window.ttNormal;        
        this.onDefocus = new portalui_eventHandler();
        this.onKeyDown = new portalui_eventHandler();
        this.onKeyPress = new portalui_eventHandler();
		this.onChange = new portalui_eventHandler();
		this.onExit = new portalui_eventHandler();
		this.onEnter = new portalui_eventHandler();
				
		this.first = true;		
		this.allowTab = false;
		if (options !== undefined){
			this.updateByOptions(options);			
			if (options.caption!== undefined) this.setCaption(options.caption);			
			if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
			if (options.color !== undefined) this.setColor(options.color);				
			if (options.fontColor !== undefined) this.setFontColor(options.fontColor);				
			if (options.alignment !== undefined) this.setAlignment(options.alignment);				
			if (options.readOnly !== undefined) this.setReadOnly(options.readnOnly);
		}
		this.addProperty({className:this.className,caption:this.caption,labelWidth:this.labelWidth, color:this.color,fontColor:this.fontColor, alignment:this.alignment, readOnly:this.readOnly, text:this.text});	
		this.addEvent({defocus:"",keyDown:"",keyPress:"",btnClick:"",enter:"",exit:"",change:""});
    }
};
window.app_builder_component_controls_saiMemo.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_saiMemo.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    canvas.style.overflow = "hidden";
		var lebar = this.width-this.labelWidth;
		var bottm = this.height - 1;
		var html = "";
		if (document.all)
			html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
					"<div id='"+n+"_label' style='{position:absolute;top : 3; left:0;font-size:11;width:"+this.labelWidth+"px;height:20px;}'>"+
					this.caption+" </div> "+ 
					"<div id='"+n+"_line' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 5; left:0;width:"+this.labelWidth+"px;height:2px;}'></div> "+ 
					"<textarea id='"+n+"_edit' "+this.stateRO+" value='"+this.text+"' "+
					"style='{width:"+lebar+"px;height:"+this.getHeight()+"px;font-size:11;color:"+this.fontColor+";"+
					"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;background:"+
					this.color+";border-width:1;text-align:"+this.alignment+"; }' "+
					"onkeypress= 'system.getResource("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
					"onkeydown= 'system.getResource("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
					"onblur = 'window.system.getResource("+this.resourceId+").doExit();' "+
					"onfocus = 'window.system.getResource("+this.resourceId+").doFocus();' "+
					"onchange = 'window.system.getResource("+this.resourceId+").doChange();' "+
					"onmouseover = 'window.system.getResource("+this.resourceId+").eventMouseOver();' "+
					"onmouseout = 'window.system.getResource("+this.resourceId+").eventMouseOut();' "+
					"></textarea></div>";
		else 
		  html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 2; left:0;font-size:11;width:100%;height:18px;}'>"+
				this.caption+" </div> "+ 
				"<div id='"+n+"_line' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left repeat-x;position:absolute;top : 18; left:0;font-size:11;width:"+this.labelWidth+"px;height:2px;}'></div> "+ 
				"<textarea id='"+n+"_edit' "+this.stateRO+"  value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:"+(this.getHeight() - 2)+"px;font-size:11;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;background:"+this.color+";border-width:1;"+
				"text-align:"+this.alignment+";}' "+
				"onkeypress= 'system.getResource("+this.resourceId+").eventKeyPress(event,\""+this+"\");' "+
				"onkeydown= 'system.getResource("+this.resourceId+").eventKeyDown(event,\""+this+"\");' "+
				"onblur = 'window.system.getResource("+this.resourceId+").doExit();' "+
				"onchange = 'window.system.getResource("+this.resourceId+").doChange();' "+
				"onfocus = 'window.system.getResource("+this.resourceId+").doFocus();' "+
				"onmouseover = 'window.system.getResource("+this.resourceId+").eventMouseOver();' "+
				"onmouseout = 'window.system.getResource("+this.resourceId+").eventMouseOut();' "+
				"></textarea>"+
				"</div>";
	    this.setInnerHTML(html, canvas);
		this.input = $(n +"_edit");
	},
	fontChange: function(sender){
	    var n = this.getFullId();
	    var node =  $(n + "_edit");	    		
	},
	doKeyDown: function(keyCode, buttonState){			
	},
	doKeyPress: function(charCode, buttonState){
	},
	doFocus: function(){
		this.onEnter.call(this);
		var input = $(this.getFullId()+"_edit");
		if ( ( this.tipeText == window.ttNilai ) && ( input != undefined) )
		{		
			 var num = input.value;
			  var numtmp ="";
			  var i;		  
			  for (i=0;i<num.length;i++)
			   {     
				if (num.charAt(i) != ".")
					 numtmp += num.charAt(i); 
			   }  
			  num = numtmp; 
			input.value = num;
		}	
		input.style.background = system.getConfig("text.focus");
		this.isFocused = true;
		this.getForm().setActiveControl(this);
	},
	eventMouseOut: function(){
		var input = $(this.getFullId()+"_edit");
		if (this.isFocused)
		{
			input.style.background = system.getConfig("text.focus");
			input.style.color = system.getConfig("text.normalColor");
		}else {
			if (this.readOnly)
			{
				input.style.background = system.getConfig("text.disabled");
				input.style.color = system.getConfig("text.disabledFontColor");
			}
			else
			{
				input.style.background = system.getConfig("text.normalBgColor");
				input.style.color = system.getConfig("text.normalColor");
			}
		}
	},
	eventMouseOver: function(){
		var input = $(this.getFullId()+"_edit");
		if (this.isFocused){
			input.style.background = system.getConfig("text.focus");
			input.style.color = system.getConfig("text.normalColor");
		}else {
			input.style.background = system.getConfig("text.overBgColor");
			input.style.color = system.getConfig("text.overColor");
		}
	},
	clear: function(){
		this.setText("");  
	},
	doExit: function(sender){
		this.isFocused = false;
		var input = $(this.getFullId() +"_edit");	
		if (this.tipeText == window.ttNilai)
			input.value = RemoveTitik(this.getText());				
		input.style.background = this.color;
		this.onExit.call(this);  	
	},
	doChange: function(sender){
		this.onChange.call(this);  
	},
	doLostFocus: function(){
	    if (this.activeChar != undefined)
	        this.activeChar.style.background = "";    
	    this.onDefocus.call(this);
		if (this.tipeText == window.ttNilai)
		{
			var value = strToNilai(this.getText());			
			this.setText(value);
		}
		this.isFocused = false;
	},
	doSetFocus: function(){ 
	},
	getText: function(){
		try{
			var nd = $(this.getFullId()+"_edit");
			if (nd != undefined)
				this.text = nd.value;
		}catch(e){
			alert("[saiLabelEdit]::getText:"+e);
		}		
		return this.text;	
	},
	setText: function(data){
		try{
			this.text = data;
			this.setProperty("text",data);		
			var nd = $(this.getFullId()+"_edit");
			if (nd != undefined)
				nd.value = data;
			this.doSetFocus();
			this.doChange();
		}catch(e){
			alert("[saiLabelEdit]::setText:"+e);
		}
	},
	isWantTab: function(){
		return this.wantTab;
	},
	setWantTab: function(data){
		this.wantTab = data;
	},	
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		this.readOnly = data;    
		this.setProperty("readOnly",data);		
		this.tabStop = !this.readOnly;		
		var nd = this.getContainer();
		var edt = $(this.getFullId()+"_edit");
		if (this.readOnly){
			this.color = system.getConfig("text.disabled");
			this.fontColor  = system.getConfig("text.disabledFontColor");
			this.stateRO = "readonly";
		}else{
			this.color = system.getConfig("text.normalBgColor");
			this.fontColor  = system.getConfig("text.normalColor");
			this.stateRO = "";
		}
		this.doDraw(nd);	
	},
	setWidth: function(data){		
		window.app_builder_component_controls_saiMemo.prototype.parent.setWidth.call(this,data); 		
		this.input.style.width = data - this.labelWidth;
	},
	setHeight: function(data){				
		window.app_builder_component_controls_saiMemo.prototype.parent.setHeight.call(this,data); 				
		this.input.style.height = data;
	},
	setLabelWidth: function(data){
		this.labelWidth = data;
		this.setProperty("labelWidth",data);		
		this.doDraw(this.getContainer());
	},
	setCaption: function(data){
		this.caption = data;		
		this.doDraw(this.getContainer());
	},
	setAlignment: function(data){
		try{
			this.alignment = data;
			this.setProperty("alignment",data);		
			var editObj = $(this.getFullId()+"_edit");
			if(editObj != undefined)
				editObj.style.TextAlign = this.alignment;
			
		}catch(e){
			alert("[labelEdit]::setAlignment:"+e);
		}
	},	
	getLineIndex: function(){
	  try{
	    var input = $(this.getFullId()+"_edit");
	    var start = 0;
	    var text = this.getText();
	    var end = text.length;	
	    if ("selectionStart" in input)
	  			start = input.selectionStart;
	  	else if (document.selection)//ie
	    {
	      var sel = document.selection.createRange();
	      var clone = sel.duplicate();
	      sel.collapse(true);
	      clone.moveToElementText(input);
	      clone.setEndPoint('EndToEnd', sel);
	      start = clone.text.length;      
			}  	
	  	text = text.substr(0,start);
	  	text = text.replace(/\s+$/gi,"");
	    var lines = text.split("\n");
	    return lines.length;
	   }catch(e){
			alert(e);
	   }     
	},
	getElements: function(){
		return $(this.getFullId()+"_edit");
	},
	eventKeyPress: function(event, sender){
		window.system.buttonState.set(event);
		var charCode = undefined;
	    
	    if (document.all)
	        charCode = window.system.charCode[event.keyCode];
	    else
	        charCode = window.system.charCode[event.charCode];	
		this.onKeyPress.call(sender, charCode, window.system.buttonState);    
	},
	eventKeyDown: function(event, sender){
		var app = this.getApplication();
		window.system.buttonState.set(event);
		if ((event.keyCode == 9 && !this.allowTab))
			this.owner.nextCtrl(this);				
		this.onKeyDown.call(sender, event.keyCode, window.system.buttonState);    
	},
	blur: function(){
		this.input.blur();
	},
	setAllowTab: function(allow){
		this.allowTab = allow;
		this.setProperty("allowTab",allow);		
	}
});
