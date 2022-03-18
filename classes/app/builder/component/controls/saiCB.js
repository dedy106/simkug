//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_saiCB = function(owner, options){
    if (owner){
    		this.stateRO 	= "";
            this.text 		= "";
    		this.caption 	= "saiCB";
    		this.labelWidth = 100;
    		this.type 		= "text";
    		this.color = system.getConfig("text.normalBgColor");
    		this.fontColor  = system.getConfig("text.normalColor");    		
    		this.isFocused = false;    		
    		window.app_builder_component_controls_saiCB.prototype.parent.constructor.call(this, owner,options);
	        this.className = "portalui_saiCB";	        
	        this.setWidth(80);
	        window.app_builder_component_controls_saiCB.prototype.parent.setHeight.call(this, 20);

	        this.wantTab = false;
	        this.tabStop = true;
	        this.password = false;
	        this.readOnly = false;
	        this.textLength = 0;
			this.itemHeight = 5;
			
	        this.onDefocus = new portalui_eventHandler();
	        this.onKeyDown = new portalui_eventHandler();
	        this.onKeyPress = new portalui_eventHandler();
    		this.onBtnClick = new portalui_eventHandler();
    		this.onEnter = new portalui_eventHandler();
    		this.onExit = new portalui_eventHandler();
    		this.onChange = new portalui_eventHandler();
    		this.items = new portalui_arrayMap();
			this.mustCheck = true;
			if (options !== undefined){
				this.updateByOptions(options);				
				if (options.caption!== undefined) this.setCaption(options.caption);				
				if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
				if (options.color !== undefined) this.setColor(options.color);				
				if (options.fontColor !== undefined) this.setFontColor(options.fontColor);								
				if (options.mustCheck !== undefined) this.setMustCheck(options.mustCheck);										
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);				
				if (options.text !== undefined) this.setText(options.text);
			}
		this.addProperty({className:this.className,caption:this.caption,labelWidth:this.labelWidth, color:this.color,fontColor:this.fontColor, mustCheck:this.mustCheck, readOnly:this.readOnly, text:this.text, items:""});	
		this.addEvent({defocus:"",keyDown:"",keyPress:"",btnClick:"",enter:"",exit:"",change:""});
    }
};
window.app_builder_component_controls_saiCB.extend(window.app_builder_component_controls_control);
window.app_builder_component_controls_saiCB.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();	
	    canvas.style.background = " ";
	    canvas.style.overflow = "hidden";
		var lebar = this.width-this.labelWidth - 20;
		var lft = lebar + this.labelWidth -1;
		this.lebar = lebar;
		var bottm = this.height-4;
		if (document.all)
			var html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) "+bottm+" left  repeat-x;"+
				"position:absolute;top : 3; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+
				this.caption+" </div> "+ 
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;font-size:10;color:"+this.fontColor+";position:absolute;"+
				"left:"+this.labelWidth+";top:0;border:small solid #FF00FF;background:"+this.color+";border-width:1;}' "+				
				"/>"+
				
				"<div id='"+n+"_btn' style='{position:absolute; left:"+lft+";top:0;width:20px;height:100%;"+
				"background:url(icon/"+system.getThemes()+"/combobox.png) 0 0 no-repeat;cursor: pointer;"+
				"background-color:"+this.color+";border-top: " + window.system.getConfig("3dborder.inner.bottom") + ";"+
				"border-right: " + window.system.getConfig("3dborder.inner.left") + ";"+
				"border-bottom: " + window.system.getConfig("3dborder.inner.top") + ";} '  "+					
					"</div>"+
				"</div>";
		else
		 var html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
				"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+
				this.caption+" </div> "+ 			
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth-8)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
				"background:"+this.color+";border-width:1;}' "+				
				"/>"+
				"<div id='"+n+"_btn' style='{position:absolute; left:"+lft+
				";top:0;width:20px;height:100%;background:url(icon/"+system.getThemes()+"/combobox.png) 0 0 no-repeat;"+
				"cursor: pointer;background-color:"+this.color+";border-top: " + window.system.getConfig("3dborder.inner.bottom") +
				";border-right: " + window.system.getConfig("3dborder.inner.left") + ";"+
				"border-bottom: " + window.system.getConfig("3dborder.inner.top") + ";} '  >" +
				"</div>"+
				"</div>";
	    this.setInnerHTML(html, canvas);
		this.input = $(n+"_edit");
		this.label = $(n+"_label");
		this.btn = $(n+"_btn");
		this.shadow = $(this.getFullId() +"_shadow");	
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			var b1 = $( n +"_shadTop");
			var b2 = $( n +"_shadLeft");
			var b3 = $( n +"_shadBottom");
			var b4 = $( n +"_shadRight");				
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
		}
	},
	addItem: function(id, caption){
	    var item = this.items.get(id);
	    var node = undefined;
	    var n = this.getFullId();

	    if (item == undefined){
	        item = new Array(caption);
	        this.items.set(id, item);
	        if (this.selectedId == undefined)
	        {
	            this.selectedId = id;
	            
	            node = $(n + "_edit");
	            if (node != undefined)
	                node.value = caption;
	        }
	    }
	    else
	    {
	        item = caption;
	        this.items.set(id, item);
	        
	        if (id == this.selectedId)
	        {
	            node = $(n + "_edit");
	            if (node != undefined)
	                node.value = caption;
	        }
	    }
	},
	delItem: function(id){
		this.items.del(id);  
	},
	clearItem: function(){
		this.items.clear();
		this.selectedId = undefined;	    
	    node = $(this.getFullId() + "_edit");		
	    if (node != undefined)
	        node.value = "";
		this.addItem("-","");
	},
	capacity: function(){
		return this.items.getLength();
	},
	indexOf: function(object){
	    var found = false;
	    var i = 0;
	    
	    while (!found && (i < this.items.length))
	    {
	        if (this.items[i] == object)
	            found = true;
	        else
	            i++;
	    }
	    
	    if (found)
	        return i;
	    else
	        return -1;
	},
	isValidItem: function(){   
		return (this.getText() == "") || (!this.mustCheck) ||(this.mustCheck && this.getText() != "" && this.items.indexOf(this.getText()) != undefined);
	},
	dropDownBoxSelect: function(sender, selectedId, caption){
	    this.selectedId = selectedId;
		
	    var edit = $(this.getFullId() + "_edit");
	    edit.value = caption; 	
	    this.onSelect.call(this, selectedId, caption);
	},
	dropDownBoxDblClick: function(sender, selectedId, caption){
		this.setText(caption);
	},
	eventMouseClick: function(event){
		try{	
			var app = this.getApplication();
			if ((app.dropDownCB == undefined) || (!app.dropDownCB.visible))	
			{
				var x = event.clientX;
				var y = event.clientY;
				var canvas = this.getContainer();
				var width = canvas.offsetWidth - this.labelWidth;				
				if (document.all || window.opera)
				{					
					x = (x - event.offsetX) - width + 18;
					y = (y - event.offsetY)+ this.getHeight() - 2;
				}
				else
				{
					x = (x - event.layerX) - width + 22;
					y = (y - event.layerY)+ this.getHeight();
				}		
				var owner = this.owner;

				while (!(owner.className == "portalui_childForm") && !(owner instanceof portalui_commonForm))
					owner = owner.owner;				
				if (app.dropDownCB === undefined){
					var app = this.getApplication();
					uses("portalui_dropDownBox");
					app.dropDownCB = new portalui_dropDownBox(app);//(window.app);			
				}								
				app.dropDownCB.onSelect.set(this, "dropDownBoxSelect");
				app.dropDownCB.onDblClick.set(this, "dropDownBoxDblClick");				
				app.dropDownCB.setItems(this.items);
				app.dropDownCB.setWidth(width);
				var app = this.getApplication();
				app.dropDownCB.setSelectedId(this.selectedId);
				var scrHeight = app.activeForm.getHeight();
				if ((y + app.dropDownCB.getHeight()) > scrHeight)
				{
					if (document.all)
						app.dropDownCB.setTop(y - 2);
					else
						app.dropDownCB.setTop(y - 1);
				}
				else
					app.dropDownCB.setTop(y);		
				app.dropDownCB.setLeft(x + 1);
				app.dropDownCB.setItemHeight(this.itemHeight);
				app.dropDownCB.show();
			}else app.dropDownCB.close();					
		}
		catch (e){
		    alert("[saiCB]::eventMouseClick : " + e);
		}
	},
	eventMouseOver: function(event){
	    var canvas = $(this.getFullId()+"_btn");
	    canvas.style.backgroundPosition = "0 -35";
	    this.shadow.style.display = "";
	},
	eventMouseOut: function(event){    
	    var canvas = $(this.getFullId()+"_btn");    
	    canvas.style.backgroundPosition = "0 0";
		this.shadow.style.display = "none";
	},
	eventMouseDown: function(event){
	    var canvas = $(this.getFullId()+"_btn");
	    canvas.style.backgroundPosition = "0 -17";    
	},
	eventExit: function(sender){
		var input = $(this.getFullId()+"_edit");
		if (input != undefined)
			input.style.background = this.color;	
		this.onExit.call(this);
		this.isFocuses = false;
		this.shadow.style.display = "none";
		if (!this.isValidItem()){
			this.app.alert(this.getForm(),this.getText() + " tidak valid","");
			this.setText("");
		}
	},
	doFocus: function(sender){		
		this.getForm().setActiveControl(this);	
		var input = $(this.getFullId()+"_edit");
		if (input != undefined)
			input.style.background = system.getConfig("text.focus");
		this.onEnter.call(this);
		this.isFocused = true;
		this.shadow.style.display = "none";
	},
	doChange: function(sender){
		var text = this.getText();	
		var itemIdx = this.items.indexOf(text);
	    this.onChange.call(this, text, itemIdx);
	},
	getId: function(){
		var text = this.getText();		
		return this.items.indexOf(text);
	},
	doKeyDown: function(keyCode, buttonState){
    },
	doKeyPress: function(charCode, buttonState){		
	},
	eventKeyPress: function(event, sender){
		window.system.buttonState.set(event);	
	    var keyCode = document.all ? event.keyCode : event.which;
	    var charCode = document.all ? window.system.charCode[event.keyCode] : window.system.charCode[event.charCode];		
		this.onKeyPress.call(sender, charCode, window.system.buttonState); 	
	    if (system.charCode[keyCode] != undefined && keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
			return false;
		else return true;
	},
	eventKeyDown: function(event, sender){
		var app = this.getApplication();
		window.system.buttonState.set(event);	
		this.onKeyDown.call(sender, event.keyCode, window.system.buttonState); 
		if ((event.keyCode == 9) || (event.keyCode == 13))
			this.owner.nextCtrl(this);		
	    if (system.charCode[event.keyCode] != undefined && event.keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
			return false;
		else return true;
	},
	clear: function(){
		if (this.items.getLength() == 0) 
			this.setText("");	
		else {
			for (var i in this.items.objList){
				this.setText(this.items.get(i));
				break;
			}
		}
	},
	doLostFocus: function(){
	    this.shadow.style.display = "none";
	    this.onDefocus.call(this);
		this.isFocused = false;
	},
	doSetFocus: function(){
		this.isFocused = true;
	},
	getText: function(){
	 	var nd = $(this.getFullId()+"_edit");
		if (nd != undefined)
			this.text = nd.value;
	    return this.text;	
	},
	setSelectedId: function(data){
		var item = this.items.get(data);		
		if (item != undefined)
		{
			this.setText(item);
			this.selectedId = data;
		}
	},
	setText: function(data){
		try{
			this.text = data;
			this.setProperty("text",data);
			var nd = $(this.getFullId()+"_edit");
			if (nd != undefined)
				nd.value = data;
			
			if (this.items != undefined)
				if (this.items.getLength()>0)
				{
					var i = this.items.indexOf(data);
					var item = this.items.getByIndex(i);
					this.selectedId = i;
				}
			this.doChange.call(this);
		}catch(e){
			alert("[saiCB]::setText:"+e+"\r\n"+nd);
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
		this.tabStop = !this.readOnly;
		this.setProperty("readOnly",data);
		var nd = this.getContainer();
		var edt = $(this.getFullId()+"_edit");
		if (this.readOnly)
		{
			this.color = system.getConfig("text.disabled");
			this.fontColor  = system.getConfig("text.disabledFontColor");
			this.stateRO = "readonly";
		}
		else
		{
			this.color = system.getConfig("text.normalBgColor");
			this.fontColor  = system.getConfig("text.normalColor");
			this.stateRO = "";
		}
		this.doDraw(nd);
	},
	setWidth: function(data){		
		window.app_builder_component_controls_saiCB.prototype.parent.setWidth.call(this,data); 
		this.input.style.width = data - this.labelWidth - 20;		
		this.btn.style.left = data - 20;		
	},
	setLabelWidth: function(data){
		this.labelWidth = data;		
		this.input.style.width = this.width - this.labelWidth;		
		this.label.style.width = data;
		this.setProperty("labelWidth",data);
	},
	setCaption: function(data){
		this.caption = data;
		this.caption = data;
		this.label.innerHTML = data;
		this.setProperty("caption",data);
	},
	getCaption: function(){
		return this.caption;	
	},	
	setItem: function(item){
		this.items = item;
	},
	getItem: function(){
		return this.items;
	},
	editMouseOut: function(){
		var input = $(this.getFullId()+"_edit");
		if (input == undefined) return false;
		if (this.isFocused)
		{
			input.style.background = system.getConfig("text.focus");
			input.style.color = system.getConfig("text.normalColor");
			this.shadow.style.display = "";
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
			this.shadow.style.display = "none";
		}
	},
	editMouseOver: function(){
		var input = $(this.getFullId()+"_edit");
		if (input == undefined) return false;
		if (this.isFocused)
		{
			input.style.background = system.getConfig("text.focus");
			input.style.color = system.getConfig("text.normalColor");
			this.shadow.style.display = "";
		}else {
			input.style.background = system.getConfig("text.overBgColor");
			input.style.color = system.getConfig("text.overColor");
			this.shadow.style.display = "none";
		}
	},
	setColor: function(data){
		this.color = data;	
		this.setProperty("color",data);
		var editObj = $(this.getFullId()+"_edit");
			if(editObj != undefined)
			{
				editObj.style.background = data;		  
			}
	      
	},
	getColor: function(){
		return this.color;
	},
	blur: function(){
		this.input.blur();
		this.shadow.style.display = "none";
	},
	setLength: function(data){	
		this.textLength = data;
		this.setProperty("maxLength",data);
	},
	setMaxLength: function(data){	
		this.textLength = data;
		this.setProperty("maxLength",data);
	},
	setMustCheck: function(data){
		this.mustCheck = data;
		this.setProperty("mustCheck",data);
	},
	setItemHeight: function(data){
		this.itemHeight = data;
		this.setProperty("itemHeight",data);
	},
	setItems: function(items){
		this.setProperty("items",this.items.objList);
		for (var i in items) 
			this.addItem(i,items[i]);
	}
});