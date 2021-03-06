//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_timePicker = function(owner, options){
    if (owner){
    		this.stateRO 	= "";
			this.text 		= "";
    		this.caption 	= "saiCB";
    		this.labelWidth = 100;
    		this.type 		= "text";
    		this.color = system.getConfig("text.normalBgColor");
    		this.fontColor  = system.getConfig("text.normalColor");    		
    		this.isFocused = false;    		
			this.width = 80;
    		window.portalui_timePicker.prototype.parent.constructor.call(this, owner,options);
	        this.className = "portalui_timePicker";	        
	        window.portalui_timePicker.prototype.parent.setWidth.call(this, 80);
	        window.portalui_timePicker.prototype.parent.setHeight.call(this, 20);

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
    		this.items2 = new portalui_arrayMap();
    		for (var i = 1 ;i <= 24; i++)
    			this.items.add( (i < 10 ? "0" : "") + i );
    		for (var i = 1 ;i <= 60; i++)
    			this.items2.add( (i < 10 ? "0" : "") + i );
			this.mustCheck = true;
			if (options !== undefined){
				this.updateByOptions(options);				
				if (options.caption!== undefined) this.setCaption(options.caption);
				if (options.tipeText !== undefined) this.setTipeText(options.tipeText);			
				if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
				if (options.color !== undefined) this.setColor(options.color);				
				if (options.fontColor !== undefined) this.setFontColor(options.fontColor);				
				if (options.alignment !== undefined) this.setAlignment(options.alignment);							
				if (options.mustCheck !== undefined) this.setMustCheck(options.mustCheck);										
				if (options.checkItem !== undefined) this.setMustCheck(options.checkItem);										
				if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
				if (options.keyDown !== undefined) this.onKeyDown.set(options.keyDown[0],options.keyDown[1]);
				if (options.keyPress !== undefined) this.onKeyPress.set(options.keyPress[0],options.keyPress[1]);
				if (options.enter !== undefined) this.onEnter.set(options.enter[0],options.enter[1]);
				if (options.change !== undefined) this.onChange.set(options.change[0],options.change[1]);
				if (options.exit !== undefined) this.onExit.set(options.exit[0],options.exit[1]);			
				if (options.text !== undefined) this.setText(options.text);
				if (options.items !== undefined) {
					for (var i in options.items) 
						this.addItem(i,options.items[i]);
				}
			}

    }
};
window.portalui_timePicker.extend(window.portalui_control);
window.saiCB = window.portalui_timePicker;
window.portalui_timePicker.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();	
	    canvas.style.background = " ";
	    canvas.style.overflow = "hidden";
		var lebar = this.width-this.labelWidth - 20;
		lebar = lebar / 2;
		var lft = this.labelWidth + lebar - 20, shadLeft = this.labelWidth - 8;
		var lft2 = this.width - 20;
		var lft3 = this.labelWidth + lebar;
		

		this.lebar = lebar;
		var bottm = this.height-4;
		
		var html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:100%;height: 100%;}'> "+
				"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
				"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+
				this.caption+" </div> "+ 			
				"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
				 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
				 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
				 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
				 	" position:absolute;left:"+(shadLeft)+";top:-8;width:8;height:37;}'></div>"+		
				 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
				 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
				 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
				 	" position:absolute;left:100%;top:-8;width:8;height:37;}'></div>"+		
				 "</div>"+
				"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
				"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
				"background:"+this.color+";border-width:1;}' "+
				"onkeypress='return window.system.getResource(" + this.resourceId + ").eventKeyPress(event,\""+this+"\");' "+
				"onkeydown='return window.system.getResource(" + this.resourceId + ").eventKeyDown(event,\""+this+"\");' "+
				"onblur='window.system.getResource(" + this.resourceId + ").eventExit();' "+
				"onfocus='window.system.getResource(" + this.resourceId + ").doFocus();' "+			
				"onchange='window.system.getResource(" + this.resourceId + ").doChange();' "+
				"onmouseover = 'window.system.getResource("+this.resourceId+").editMouseOver();' "+
				"onmouseout = 'window.system.getResource("+this.resourceId+").editMouseOut();' "+
				"/>"+
				"<div id='"+n+"_btn' style='{position:absolute; left:"+lft+
				";top:0;width:20px;height:100%;background:url(icon/"+system.getThemes()+"/combobox.png) 0 0 no-repeat;"+
				"cursor: pointer;background-color:"+this.color+";" +
				";} '  "+
				"onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
				"onMouseMove='window.system.getResource(" + this.resourceId + ").eventMouseMove(event);' " +
				"onMouseDown='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);' " +
				"onMouseUp='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
				"onMouseOut='window.system.getResource(" + this.resourceId + ").eventMouseOut(event);' " +
				"onClick='window.system.getResource(" + this.resourceId + ").eventMouseClick(event,1);' >" +
				"</div>"+
				"<input id='"+n+"_edit2' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
				"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
				"position:absolute;left:"+lft3+";top:0;border:small solid #FF00FF;"+
				"background:"+this.color+";border-width:1;}' "+
				"onkeypress='return window.system.getResource(" + this.resourceId + ").eventKeyPress(event,\""+this+"\");' "+
				"onkeydown='return window.system.getResource(" + this.resourceId + ").eventKeyDown(event,\""+this+"\");' "+
				"onblur='window.system.getResource(" + this.resourceId + ").eventExit();' "+
				"onfocus='window.system.getResource(" + this.resourceId + ").doFocus();' "+			
				"onchange='window.system.getResource(" + this.resourceId + ").doChange();' "+
				"onmouseover = 'window.system.getResource("+this.resourceId+").editMouseOver();' "+
				"onmouseout = 'window.system.getResource("+this.resourceId+").editMouseOut();' "+
				"/>"+
				"<div id='"+n+"_btn2' style='{position:absolute; left:"+lft2+
				";top:0;width:20px;height:100%;background:url(icon/"+system.getThemes()+"/combobox.png) 0 0 no-repeat;"+
				"cursor: pointer;background-color:"+this.color+";" +
				";} '  "+
				"onMouseOver='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
				"onMouseMove='window.system.getResource(" + this.resourceId + ").eventMouseMove(event);' " +
				"onMouseDown='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);' " +
				"onMouseUp='window.system.getResource(" + this.resourceId + ").eventMouseOver(event);' " +
				"onMouseOut='window.system.getResource(" + this.resourceId + ").eventMouseOut(event);' " +
				"onClick='window.system.getResource(" + this.resourceId + ").eventMouseClick(event,2);' >" +
				"</div>"+
				"</div>";
	    this.setInnerHTML(html, canvas);
		this.input = $(n+"_edit");
		this.shadow = $(this.getFullId() +"_shadow");	
		if (systemAPI.browser.msie && systemAPI.browser.version == 6){
			/*var b1 = $( n +"_shadTop");
			var b2 = $( n +"_shadLeft");
			var b3 = $( n +"_shadBottom");
			var b4 = $( n +"_shadRight");				
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
			* */
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
	    try{

    	    this.app.dropDownCB.close();
    	    this.selectedId = selectedId;    		
    	    if (this.selectedCombo == 1){
    	    	var edit = $(this.getFullId() + "_edit");
    	    else var edit = $(this.getFullId() + "_edit2");
    	    edit.value = caption; 	
    	    this.onChange.call(this, caption, selectedId);
    	    
 	    }catch(e){
 	       alert(e);
        }
	},
	dropDownBoxDblClick: function(sender, selectedId, caption){
		if (this.selectedCombo == 1){
	    	var edit = $(this.getFullId() + "_edit");
	    else var edit = $(this.getFullId() + "_edit2");
	    edit.value = caption; 	
	},
	eventMouseClick: function(event, id){
		try{	
			var app = this.getApplication();
			if ((app.dropDownCB == undefined) || (!app.dropDownCB.visible))	
			{
				var x = event.clientX;
				var y = event.clientY;
				var canvas = this.getCanvas();
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
				this.selectedCombo = id;
				app.dropDownCB.onSelect.set(this, "dropDownBoxSelect");
				app.dropDownCB.onDblClick.set(this, "dropDownBoxDblClick");	
				if (id == 1)			
					app.dropDownCB.setItems(this.items);
				else if (id == 2)			
					app.dropDownCB.setItems(this.items2);
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
		var lbl = this.getCanvas();	
		if (lbl !== undefined) lbl.style.color = "#000000"; 	
		var canvas = $(this.getFullId()+"_btn");
	    canvas.style.backgroundPosition = "0 -21";
	    this.shadow.style.display = "";
	},
	eventMouseOut: function(event){    
	    var canvas = $(this.getFullId()+"_btn");    
	    canvas.style.backgroundPosition = "0 0";
		this.shadow.style.display = "none";
	},
	eventMouseDown: function(event){
	    var canvas = $(this.getFullId()+"_btn");
	    canvas.style.backgroundPosition = "0 -42";    
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
		setCaret(input,0,input.value.length);
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
		if ((event.keyCode == 9) || (event.keyCode == 13)){	
			this.owner.nextCtrl(this);		
			return false;
		}else if (event.keyCode == 27){
		    this.input.blur();    
			this.owner.prevCtrl(this);		
			return false;
	    }else if ((event.keyCode == 40)){
	         try{	
	            this.input.blur();
    			var app = this.getApplication();
    			if ((app.dropDownCB == undefined) || (!app.dropDownCB.visible))	
    			{
    				var x;
    				var y;
    				var canvas = this.input;//this.getCanvas();
    				var width = canvas.offsetWidth + 20;// - this.labelWidth;
   					x = findPos(window.pageCnv,canvas);
   					y = x[1] + parseInt(this.input.offsetHeight);
   					x = x[0] ;//+ this.labelWidth;
    				var owner = this.owner;
    
    				while (!(owner.className == "portalui_childForm") && !(owner instanceof portalui_commonForm))
    					owner = owner.owner;				
    				if (app.dropDownCB === undefined){
    					var app = this.getApplication();
    					uses("portalui_dropDownBox");
    					app.dropDownCB = new portalui_dropDownBox(app);//(window.app);			
    				}			
                    app.dropDownCB.setCtrl(this);					
    				app.dropDownCB.onSelect.set(this, "dropDownBoxSelect");
    				app.dropDownCB.onDblClick.set(this, "dropDownBoxDblClick");				
    				app.dropDownCB.setItems(this.items);
    				app.dropDownCB.setWidth(width);
    				app.dropDownCB.setSelectedId(this.selectedId);
    				var scrHeight = app.activeForm.getHeight();
    				if ((y + app.dropDownCB.getHeight()) > scrHeight)
    				{
    					if (document.all)
    						app.dropDownCB.setTop(y - 2);
    					else
    						app.dropDownCB.setTop(y);
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
    		return false;
        }
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
	 	var nd2 = $(this.getFullId()+"_edit2");
		this.text = nd.value +":"+nd2.value;
	    return this.text;	
	},
	setSelectedId: function(data){
		var item = this.items.get(data);
		//alert(item + " "+data);
		if (item != undefined)
		{
			this.setText(item);
			this.selectedId = data;
		}
	},
	setText: function(data){
		try{
			this.text = data;
			var tmp = data.split(":");
			var nd = $(this.getFullId()+"_edit");
			nd.value = tmp[0];
			var nd2 = $(this.getFullId()+"_edit2");
			nd.value = tmp[1];
			
			if (this.items != undefined)
				if (this.items2.getLength()>0)
				{
					var i = this.items.indexOf(tmp[0]);
					var item = this.items.getByIndex(i);
					this.selectedId = i;
				}
			if (this.items2 != undefined)
				if (this.items2.getLength()>0)
				{
					var i = this.items2.indexOf(tmp[1]);
					var item = this.items2.getByIndex(i);
					this.selectedId2 = i;
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
	isPassword: function(){
		return this.password;
	},
	setPassword: function(data){
		this.password = data;   	
		var nd = $(this.getFullId());
	    if (this.password)
			this.type = "password";		   
	    else this.type = "text";		   
		this.doDraw(nd);
	},
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		this.readOnly = data;    
		//this.tabStop = !this.readOnly;
		
		var nd = $(this.getFullId());
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
		var n = this.getFullId();
		var nd = $(n);
		window.portalui_timePicker.prototype.parent.setWidth.call(this,data); 
		this.doDraw(nd);
	},
	setLabelWidth: function(data){
		this.labelWidth = data;
		var n = this.getFullId();
		var nd = $(n);
		this.doDraw(nd);
	},
	setCaption: function(data){
		this.caption = data;
		var n = this.getFullId();
		var nd = $(n);
		this.doDraw(nd);
	},
	getCaption: function(){
		return this.caption;	
	},
	setRightLabelCaption: function(data){
		if (this.rightLabelVisible){
			var lbr = this.width - this.rightLabelWidth;	
			this.rightLabelCaption = data;
			this.rightLabelWidth = data.length * 6;
			var canvas = $(this.getFullId());
			lbr = this.width + this.rightLabelWidth;
			this.setWidth(lbr);
			this.doDraw(canvas);
		}else
		{
			var canvas = $(this.getFullId() + "_rightlabel");
			var lbr = canvas.style.width;
			lbr = this.width - lbr;
			this.setWidth(lbr);
		}
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
	},
	setMustCheck: function(data){
		this.mustCheck = data;
	},
	setItemHeight: function(data){
		this.itemHeight = data;
	}
});
