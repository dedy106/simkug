//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_saiSearch = function(owner, options){
    if (owner){
		this.stateRO 	= "";
		this.text 		= "";
		this.caption 	= "search";
		this.labelWidth = 100;
		this.type 		= "text";
		this.color      = system.getConfig("text.normalBgColor");
		this.fontColor  = system.getConfig("text.normalColor");
		this.isFocused  = false;
		this.mode = 1;					
		this.eventChange = false;
		this.width = 80;
		window.portalui_saiSearch.prototype.parent.constructor.call(this, owner, options);
		this.className = "saiSearch";        
		window.portalui_saiSearch.prototype.parent.setWidth.call(this, 80);
		window.portalui_saiSearch.prototype.parent.setHeight.call(this, 20);

		this.bufferOption = 0;
		this.wantTab = false;
		this.textLength = 0;
		this.tabStop = true;
		this.password = false;
		this.readOnly = false;
		this.pressKeyDown = false;		
        this.onDefocus = new portalui_eventHandler();
        this.onKeyDown = new portalui_eventHandler();
		this.onKeyPress = new portalui_eventHandler();
		this.onBtnClick = new portalui_eventHandler();
		this.onExit = new portalui_eventHandler();
		this.onEnter = new portalui_eventHandler();
		this.onChange = new portalui_eventHandler();
		this.selectedId = "";
		this.items = new portalui_arrayMap();
		this.items2 = new portalui_arrayMap();
				
		this.sqlScript = "";
		this.arrayKey = [];
		this.dataCheck = true;
		this.bufferData = new arrayMap();
		this.operator = "";
		this.realWidth = this.width;
		this.btnVisible = true;
		this.owner = owner;		
		this.sql = "";
		this.fields = [];
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.readOnly !== undefined) this.setReadOnly(options.readOnly);
			if (options.caption!== undefined) this.setCaption(options.caption);
			if (options.tipeText !== undefined) this.setTipeText(options.tipeText);
			if (options.password !== undefined) this.setPassword(options.password);
			if (options.labelWidth !== undefined) this.setLabelWidth(options.labelWidth);
			if (options.color !== undefined) this.setColor(options.color);				
			if (options.fontColor !== undefined) this.setFontColor(options.fontColor);				
			if (options.alignment !== undefined) this.setAlignment(options.alignment);				
			if (options.btnVisible !== undefined) this.setBtnVisible(options.btnVisible);				
			if (options.textLength !== undefined) this.setTextLength(options.textLength);										
			if (options.lengthChar !== undefined) this.setTextLength(options.lengthChar);										
			if (options.maxLength !== undefined) this.setTextLength(options.maxLength);										
			if (options.btnClick !== undefined) this.onBtnClick.set(options.btnClick[0],options.btnClick[1]);										
			if (options.change !== undefined) this.onChange.set(options.change[0],options.change[1]);
			if (options.keyDown !== undefined) this.onKeyDown.set(options.keyDown[0],options.keyDown[1]);
			if (options.keyPress !== undefined) this.onKeyPress.set(options.keyPress[0],options.keyPress[1]);
			if (options.enter !== undefined) this.onEnter.set(options.enter[0],options.enter[1]);			
			if (options.exit !== undefined) this.onExit.set(options.exit[0],options.exit[1]);			
			if (options.text !== undefined) this.setText(options.text);
			if (options.sql !== undefined) this.setSQL(options.sql[0], options.sql[1],options.sql[2],options.sql[3], options.sql[4],options.sql[5],options.sql[6]);
			if (options.multiSelection !== undefined) this.setMultiSelection(options.multiSelection);
			if (options.bufferOption != undefined) this.setBufferOptions(options.bufferOption);	
			if (options.bufferData != undefined) this.setBufferData(options.bufferData);
			if (options.placeHolder != undefined) this.setPlaceHolder(options.placeHolder);
		}		
    }
};
window.portalui_saiSearch.extend(window.portalui_control);
window.saiSearch = window.portalui_saiSearch;
window.portalui_saiSearch.implement({
	doDraw: function(canvas){
		try{
		    var n = this.getFullId();	
		    canvas.style.background = " ";	    
		    //canvas.style.overflow = "hidden";
			var lebar = this.width-this.labelWidth - 20 ;//- this.rightLabelWidth;		
			var lft = lebar + this.labelWidth;
			var lft2 = lft + 20, shadLeft = this.labelWidth - 8;
			var bottm = this.height-4;
			var html = "";
			if (document.all)	
				html =    "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:auto;height: 100%;}'> "+
					"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
					"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+this.caption+" </div> "+ 
					"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.7);opacity:0.7;moz-opacity:0.7;border:1px solid #ff9900}'>"+
					"</div>"+
					"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
					"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
					"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
					"background:"+this.color+";border-width:1;}' "+
					"onkeypress='return $$(" + this.resourceId + ").eventKeyPress(event);' "+
					"onkeydown='return $$(" + this.resourceId + ").eventKeyDown(event);' "+
					"onfocus='$$(" + this.resourceId + ").doFocus();' "+
					"onblur='$$(" + this.resourceId + ").eventExit();' " +
					"onchange='$$(" + this.resourceId + ").doChange();' " +
					"onmouseover = '$$("+this.resourceId+").editMouseOver();' "+
					"onmouseout = '$$("+this.resourceId+").editMouseOut();' "+
					"/>"+
					"<div id='"+n+"_btn' style='{position:absolute; left:"+lft+";top:0;width:20px;height:100%;"+
					"background:url(icon/"+system.getThemes()+"/btnfind.png) 0 0 no-repeat;cursor: pointer;display:none} '  "+
					"onMouseOver='$$(" + this.resourceId + ").eventMouseOver(event);' " +
					"onMouseMove='$$(" + this.resourceId + ").eventMouseMove(event);' " +
					"onMouseDown='$$(" + this.resourceId + ").eventMouseDown(event);' " +
					"onMouseUp='$$(" + this.resourceId + ").eventMouseOver(event);' " +
					"onMouseOut='$$(" + this.resourceId + ").eventMouseOut(event);' " +
					"onClick='$$(" + this.resourceId + ").eventMouseClick(event);' >" +//title='listdata'
					"</div>"+//this.rightLabelWidth+"px
					"</div>";
			else 
				html =   "<div id='"+n+"_frame' style='{position: absolute;left: 0;top: 0;width:autp;height: 100%;}'> "+
					"<div id='"+n+"_label' style='{background:url(image/themes/"+system.getThemes()+"/dot.png) bottom left  repeat-x;"+
					"position:absolute;top : 0; left:0;font-size:11;width:"+this.labelWidth+"px;height:100%;}'>"+this.caption+" </div> "+ 
					"<div id='"+n+"_shadow' style='{display:none;filter:alpha(opacity:0.3);opacity:0.3;moz-opacity:0.3}'>"+
					 "<div id='"+n+"_shadTop' style='{background:url(icon/"+system.getThemes()+"/shadBtnTop.png) repeat-x; "+ 
					 	" position:absolute;left:"+this.labelWidth+";top:-7;width:"+lebar+";height:8;}'></div>"+
					 "<div id='"+n+"_shadLeft' style='{background:url(icon/"+system.getThemes()+"/shadBtnLeft.png) no-repeat; "+ 			 
					 	" position:absolute;left:"+(shadLeft)+";top:-8;width:8;height:37;}'></div>"+		
					 "<div id='"+n+"_shadBottom' style='{background:url(icon/"+system.getThemes()+"/shadBtnBottom.png) repeat-x; "+ 			 
					 	" position:absolute;left:"+(this.labelWidth)+";top:100%;width:"+lebar+";height:10;}'></div>"+				
					 "<div id='"+n+"_shadRight' style='{background:url(icon/"+system.getThemes()+"/shadBtnRight.png) no-repeat; "+ 			 
					 	" position:absolute;left:"+(this.labelWidth + lebar).toString()+";top:-8;width:8;height:37;}'></div>"+		
					 "</div>"+
					"<input id='"+n+"_edit' type='"+this.type+"' "+this.stateRO+" value='"+this.text+"' "+
					"style='{width:"+lebar+"px;height:20px;color:"+this.fontColor+";"+
					"position:absolute;left:"+this.labelWidth+";top:0;border:small solid #FF00FF;"+
					"background:"+this.color+";border-width:1;}' "+
					"onkeypress='return $$(" + this.resourceId + ").eventKeyPress(event);' "+
					"onkeydown='return $$(" + this.resourceId + ").eventKeyDown(event);' "+
					"onkeyup='return $$(" + this.resourceId + ").eventKeyUp(event);' "+
					"onfocus='$$(" + this.resourceId + ").doFocus();' "+
					"onblur='$$(" + this.resourceId + ").eventExit();' " +
					"onchange='$$(" + this.resourceId + ").doChange();' " +
					"onmouseover = '$$("+this.resourceId+").editMouseOver();' "+
					"onmouseout = '$$("+this.resourceId+").editMouseOut();' "+
					"/>"+
					"<div id='"+n+"_btn' style='{position:absolute; left:"+lft+";top:0;width:20px;height:100%;"+
					"background:url(icon/"+system.getThemes()+"/btnfind.png) 0 0 no-repeat;cursor: pointer;display:none} '  "+
					"onMouseOver='$$(" + this.resourceId + ").eventMouseOver(event);' " +
					"onMouseMove='$$(" + this.resourceId + ").eventMouseMove(event);' " +
					"onMouseDown='$$(" + this.resourceId + ").eventMouseDown(event);' " +
					"onMouseUp='$$(" + this.resourceId + ").eventMouseOver(event);' " +
					"onMouseOut='$$(" + this.resourceId + ").eventMouseOut(event);' " +
					"onClick='$$(" + this.resourceId + ").eventMouseClick(event);' >" +//title='listdata'
					
					"</div>"+//this.rightLabelWidth+"px
					"</div>";			
		    this.setInnerHTML(html, canvas);
			this.setBtnVisible(this.btnVisible);
			this.input = $(n+"_edit");
			this.shadow = $(this.getFullId() +"_shadow");	
			this.btn = $(n+"_btn");
			eventOn(canvas,"mouseover","$$(" + this.resourceId + ").eventMouseOver2(event);");		
			eventOn(canvas,"mouseout","$$(" + this.resourceId + ").eventMouseOut2(event);");
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){
				/*var b1 = $( n +"_shadTop");
				var b2 = $( n +"_shadLeft");
				var b3 = $( n +"_shadBottom");
				var b4 = $( n +"_shadRight");*/				
				var b5 = $( n +"_btn");				
				//DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
				DD_belatedPNG.fixPng(b5);
			}
		}catch(e){
			error_log(e);
		}
	},
	eventMouseMove: function(event){	
		system.showHint(event.clientX, event.clientY, "Search Data",true);
	},
	
	eventMouseOver: function(event){	
		var lbl = this.getCanvas();	
		if (lbl !== undefined) lbl.style.color = "#000000"; 	
	    var canvas = $(this.getFullId()+"_btn");
	    switch (this.mode)
	    {
	        case 1 :
	                canvas.style.backgroundPosition = "0 -20";
	                break;
	        case 2 :
	        case 3 :
	                canvas.style.backgroundPosition = "0 -18";
	                break;
	    }	    
	},
	eventMouseOut: function(event){
	    var canvas = $(this.getFullId()+"_btn");    
	    canvas.style.backgroundPosition = "0 0";
	    system.hideHint();	    
	},
	eventMouseOut2: function(event){	   
	    if (this.btnVisible && !this.isFocused) this.btn.style.display= "none";
	},	
	eventMouseOver2: function(event){	
		if (this.btnVisible) this.btn.style.display= "";
	},	
	eventMouseDown: function(event){
	    var canvas = $(this.getFullId()+"_btn");    
	    switch (this.mode)
	    {
	        case 1 :
	                canvas.style.backgroundPosition = "0 -39";
	                break;
	        case 2 :
	        case 3 :
	                canvas.style.backgroundPosition = "0 -36";
	                break;
	    }
	},
	eventMouseClick: function(event){
		try{
			if (this.multiSelection){
				if (this.sql){
					if (this.app.fMultipleSelection === undefined) 
					{
						uses("system_fSelectOptions");
						this.app.fMultipleSelection = new system_fSelectOptions(this.app);					
						
					}
					this.app.fMultipleSelection.setCaption("Filter Data ("+(this.listDataCaption || this.caption).toString()+")");
					this.app.fMultipleSelection.setRequester(this.getTargetClass(), this, 0,0,false,undefined);		
					this.app.fMultipleSelection.setScriptSql("select "+this.fields+" from ("+this.sql +") a ", this.getSqlCount(this.sql));
					this.app.fMultipleSelection.setFields(this.fields, "where");
					this.app.fMultipleSelection.setLabels(this.labels);
					this.app.fMultipleSelection.showForm(false);				
					this.app.fMultipleSelection.setFocus();				
				}else systemAPI.alert("SQL not defined.","Contact your administrator");
			}else if (this.multiSelection == false){
				if (this.sql){								
					{
						uses("system_fListData2",true);
						this.app._mainForm.listDataForm2 = new system_fListData2(this.app);
						this.app._mainForm.listDataForm2.setWidth(450);
						this.app._mainForm.listDataForm2.setHeight(477);			
						this.app._mainForm.listDataForm2.hide();													
					}
					this.app._mainForm.listDataForm2.setCaption("Cari Data ("+(this.listDataCaption || this.caption).toString()+")");
					this.app._mainForm.listDataForm2.setRequester(this.getTargetClass(), this, 0,0,false,undefined);		
					this.app._mainForm.listDataForm2.setScriptSql("select "+this.fields+" from ("+this.sql +") a ", this.getSqlCount(this.sql));
					this.app._mainForm.listDataForm2.setFields(this.fields, "where");
					this.app._mainForm.listDataForm2.setLabels(this.labels);
					this.app._mainForm.listDataForm2.show(false);				
					this.app._mainForm.listDataForm2.setFocus();			
				}else systemAPI.alert("SQL not defined.","Contact your administrator");
			}else{
				this.onBtnClick.call(this,this, event);
				this.pressKeyDown = false;
			}
		}catch(e){
			error_log(e);
		}
	},	
	eventExit: function(sender){
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.color;
	    this.onExit.call(this);
		this.isFocused  = false;
		this.shadow.style.display = "none";
		this.doLostFocus(true);
	},
	doFocus: function(sender){
		var input = $(this.getFullId()+"_edit");
		if (input != undefined)
			input.style.background = system.getConfig("text.focus");
		this.onEnter.call(this);
		this.isFocused  = true;
		this.getForm().setActiveControl(this);	
		this.shadow.style.display = "";
		setCaret(input,0,input.value.length);
		if (this.btnVisible) this.btn.style.display = "";
	},
	doKeyDown: function(keyCode, buttonState){
	},
	doKeyPress: function(charCode, buttonState){		
	},
	doChange: function(sender){	
		this.text = this.input.value;
		this.onChange.call(this); 		
	},
	eventKeyPress: function(event, sender){
		try{		
			window.system.buttonState.set(event);		
		    var keyCode = document.all ? event.keyCode: event.which;
		    var charCode = document.all ? system.charCode[event.keyCode] : system.charCode[event.charCode];		
			if (keyCode != 40)
				this.pressKeyDown = false;		
			this.onKeyPress.call(sender, charCode, window.system.buttonState);    
			if (system.charCode[keyCode] != undefined && keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
				return false;
			else if (this.pressKeyDown) return false;  
			else {
				if (this.app._searchListForm != undefined) 
					this.app._searchListForm.free();

				{
					uses("portalui_searchListForm",true);
					var sf = new portalui_searchListForm(this.app);
					this.app._searchListForm = sf;	
				};//else var sf = this.app._searchListForm;
				sf.setWidth(this.width - this.labelWidth);
				var offset = this.offset();	
				sf.setLeft(offset.left + this.labelWidth);
				sf.setTop(offset.top + 19);
				sf.setCtrl(this);
				sf.show();
				this.dbLib.getDataProviderPageA("select "+this.fields+" from ("+this.sql +") a  where lower("+this.fields[0]+") like '%"+(this.getText() + charCode).toLowerCase()+"%' or lower("+this.fields[1]+") like '%"+(this.getText() + charCode).toLowerCase()+"%' order by lower("+this.fields[1]+")",1,20, undefined, this);
				
				return true;
			};
		}catch(e){
			alert("saiCBBL:keypress:"+e);
			return false;
		}	
	},
	eventKeyDown: function(event, sender){
		window.system.buttonState.set(event);
		var tab = false;
		if (event.keyCode == 9){
			tab = true;
		}	
		if (event.keyCode == 13 || tab)
		{
			this.owner.nextCtrl(this);
			this.pressKeyDown = false;	
		}else if ((event.keyCode == 27))
		{
            this.input.blur();		  
			this.owner.prevCtrl(this);
			this.pressKeyDown = false;	
		}else if ((event.keyCode == 40)&&(!this.pressKeyDown) && this.btnVisible)
		{
			this.pressKeyDown = true;
			if (this.multiSelection){
				if (this.sql){
					if (system.fMultipleSelection === undefined) 
					{
						uses("system_fSelectOptions");
						this.app.fMultipleSelection = new system_fSelectOptions(this.app);					
						
					}
					this.app.fMultipleSelection.setCaption("Cari Data ("+(this.listDataCaption || this.caption).toString()+")");
					this.app.fMultipleSelection.setRequester(this.getTargetClass(), this, 0,0,false,undefined);		
					this.app.fMultipleSelection.setScriptSql("select "+this.fields+" from ("+this.sql +") a ", this.getSqlCount(this.sql));
					this.app.fMultipleSelection.setFields(this.fields, "where");
					this.app.fMultipleSelection.setLabels(this.labels);
					this.app.fMultipleSelection.showForm(false);				
					this.app.fMultipleSelection.setFocus();				
				}else systemAPI.alert("SQL not defined.","Contact your administrator");
			}else if (this.multiSelection == false){
				if (this.sql){				
					{
						uses("system_fListData2",true);
						this.app._mainForm.listDataForm2 = new system_fListData2(this.app);
						this.app._mainForm.listDataForm2.setWidth(450);
						this.app._mainForm.listDataForm2.setHeight(477);			
						this.app._mainForm.listDataForm2.hide();													
					}
					this.app._mainForm.listDataForm2.setCaption("Cari Data ("+(this.listDataCaption || this.caption).toString()+")");
					this.app._mainForm.listDataForm2.setRequester(this.getTargetClass(), this, 0,0,false,undefined);		
					this.app._mainForm.listDataForm2.setScriptSql("select "+this.fields+" from ("+this.sql +") a ", this.getSqlCount(this.sql));
					this.app._mainForm.listDataForm2.setFields(this.fields, "where");
					this.app._mainForm.listDataForm2.setLabels(this.labels);
					this.app._mainForm.listDataForm2.show(false);				
					this.app._mainForm.listDataForm2.setFocus();				
				}else systemAPI.alert("SQL not defined.","Contact your administrator");
			}else{
				this.onBtnClick.call(this,this, event);
				this.pressKeyDown = true;
			}
			return false;
		}else if (event.keyCode != 40)
			this.pressKeyDown = false;
		this.onKeyDown.call(sender, event.keyCode, window.system.buttonState);    
		if (tab || event.keyCode == 13)
			return false;
		if (system.charCode[event.keyCode] != undefined && event.keyCode > 48 && this.textLength > 0 && this.textLength <= this.getText().length)
			return false;
		else {
			
			return true;		
		}
	},
	eventKeyUp: function(event, sender){
		
	},
	doLostFocus: function(fromEdit){
		window.portalui_saiSearch.prototype.parent.doLostFocus.call(this);
	    if (this.activeChar != undefined)
	        this.activeChar.style.background = "";    
	    this.isFocused  = false;
	    this.onDefocus.call(this);
		this.shadow.style.display = "none";
		if (this.btnVisible && fromEdit == undefined) this.btn.style.display = "none";
	},
	blur: function(){
		this.input.blur();
		this.shadow.style.display = "none";		
	},	
	getText: function(){
	 	var nd = this.input;
		this.text = nd.value;
	    return this.text;	
	},
	setText: function(data, rightCaption){	
		if (data == undefined) data = "";
	    this.text = data;				
	    var nd = $(this.getFullId()+"_edit");
		if (nd != undefined)
			nd.value = data;
	},
	clear: function(data){
		this.setText("");
		this.dataSelection = undefined;	
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
		if (nd != undefined)
		{
			if (this.password)
				this.type = "password";		   
			else this.type = "text";		   
			this.input.type = this.type;
			//this.doDraw(nd);
		}
	},
	isReadOnly: function(){
		return this.readOnly;
	},
	setReadOnly: function(data){
		this.readOnly = data;    
		//this.tabStop = !this.readOnly;		
		this.stateRO = data ? "readonly": "";
		this.input.readOnly = data;	
		this.input.style.background = data ? system.getConfig("text.disabled") : this.color;
		if (document.all)
			this.input.color = data ? system.getConfig("text.disabledFontColor") : this.fontColor;		
		else 
			this.input.style.color = data ? system.getConfig("text.disabledFontColor") : this.fontColor;		
	},
	setWidth: function(data){
		var nd = this.getCanvas();
		window.portalui_saiSearch.prototype.parent.setWidth.call(this,data); 
		this.doDraw(nd);
	},
	setLabelWidth: function(data){
		this.labelWidth = data;		
		var nd = this.getCanvas();
		this.doDraw(nd);
	},
	setCaption: function(data){
		this.caption = data;
		var nd = $(this.getFullId() +"_label");	
		if (nd != undefined) nd.innerHTML = data;
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
	setItem2: function(item){
		this.items2 = item;
	},
	getItem2: function(){
		return this.items2;
	},
	clearItem: function(){
		this.items = [];
		this.items2 = [];
	},
	editMouseOut: function(){
		var input = this.input;//$(this.getFullId()+"_edit");
		if (input == undefined) return;
		if (this.isFocused)
			this.shadow.style.display = "";
		else
			this.shadow.style.display = "none";	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : this.color;
		if (document.all)
			this.input.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : this.fontColor;	
		else
			this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : this.fontColor;	
	},
	editMouseOver: function(){
		var input = this.input;//$(this.getFullId()+"_edit");
		if (input == undefined) return;	
		this.input.style.background = this.readOnly ? system.getConfig("text.disabled") : this.isFocused ? system.getConfig("text.focus") : system.getConfig("text.overBgColor");
		if (document.all)
			this.input.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.overColor");
		else
			this.input.style.color = this.readOnly ? system.getConfig("text.disabledFontColor") : this.isFocused ? system.getConfig("text.normalColor") : system.getConfig("text.overColor");
		this.shadow.style.display = "";
	},
	setColor: function(data){
		this.color = data;  
		if(this.input != undefined)
	        this.input.style.background = data;		      
	},
	setFontColor: function(data){
		this.fontColor = data;
		if(this.input != undefined){
			if (document.all)
				this.input.color = data;		  
			else 
				this.input.style.color = data;		  
		}
	},
	getColor: function(){
		return this.color;
	},
	setBtnVisible: function(data){
		this.btnVisible = data;
	},
	setLength: function(data){	
		this.textLength = data;
	},
	setTextLength: function(data){	
		this.textLength = data;
	},
	checkItem: function(notWithRightLabel){
	   try{//!this.needCheckItem || 			
		    if (this.loading) return;		    
    		if (this.getText() == "") return;	
    		if (this.getText() == "-") return;	
    		if (this.fields[0] == undefined || this.fields[0] == "") return;
    		if (this.sql == "") {
    			this.app.alert(this.getForm(), "Properti SQL belum didefinisikan","Eksekusi batal dilanjutkan");
    			return ;
    		}
    		
    		if (this.dbLib == undefined) return ;			
			this.loading = true;		    		
    		this.status = 1;    		    		
			this.dbLib.getDataProviderA("select "+this.fields+" from ("+this.sql +") a  where lower("+this.fields[0]+") = '"+this.selectedId.toLowerCase()+"' ", undefined,this);
			if (this.doubleCheck) this.status = 1;
			   		    		
  		}catch(e){
  		    systemAPI.alert(this+"$checkItem",e);
        }
	},
	free: function(){
		if (this.dbLib != undefined) {
			this.dbLib.delListener(this);
			if (this.dbLib != this.app.dbLib){
				this.dbLib.free();
			}
		}
		window.portalui_saiSearch.prototype.parent.free.call(this);	
	},	
	setSQL: function(sql, fields, doubleCheck, labels, operator, caption, checkItem){
		this.sql = sql;	
		this.fields = fields;
		for (var i in this.fields){
			if (this.fields[i].indexOf(".") > 0)
				this.fields[i] = this.fields[i].substr(this.fields[i].indexOf(".")+1,this.fields[i].length - this.fields[i].indexOf("."));
		}		
		this.doubleCheck = false;
		this.labels = labels;//label edit and grid
		this.operator = operator;//search filter
		if (typeof doubleCheck == "boolean") this.doubleCheck = doubleCheck;
		//uses("util_dbLarge");
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		this.listDataCaption = caption;
		this.loading = false;
		this.needCheckItem = checkItem === undefined ? true:checkItem;
	},
	doRequestReady: function(sender, methodName, result, callObj, connection){
		try{				
			if (sender == this.dbLib && this == callObj){						
				switch (methodName){
					case "getDataProviderPage" :
						try{							
							eval("result = "+result+";");
						}catch(e){
							result = JSON.parse(result);
						}
						var items = new arrayMap();
						for (var i = 0; i < result.rs.rows.length;i++){
							var line=  result.rs.rows[i];
							var field0 = this.fields[0].substr(this.fields[0].indexOf(".")+1);
							var field1 = (this.fields[1] ?  this.fields[1].substr(this.fields[1].indexOf(".")+1):"");
							
							items.set(line[field0], this.fields[1] ? line[field1]:line[field0]);
						}
						this.app._searchListForm.setItems(items);
					break;
					case "getDataProvider" :
						try{							
							eval("result = "+result+";");
						}catch(e){
							result = JSON.parse(result);
						}
                        var rightLbl = "";                           
						if (typeof(result) !== "string"){						
							var row = result.rs.rows[0];
							if (row == undefined && this.needCheckItem) {								
							    if (this.doubleCheck && this.status == 1 && this.fields[1]){							         
                                     this.dbLib.getDataProviderA("select "+this.fields+" from ("+this.sql +") a where lower("+this.fields[1]+") = '"+this.getText().toLowerCase()+"' ", undefined,this);
							         this.status = 2;							         
							         return;
                                }else if ((!this.doubleCheck || this.status == 2) && this.fields[1]){
									throw("Data "+this.getText()+" tidak ditemukan.");
								}else if (this.status == 3 || this.status == 1) return;
                            }                        
                            if (row == undefined) return;
							if (this.needCheckItem && row && row.msg != undefined && row.msg.toLowerCase().search("error") != -1) throw(row.msg+"<br>Hubungi administrator anda");					
							this.dataFromList = [];
							for (var c in row) this.dataFromList[this.dataFromList.length] = row[c];
							var field0 = this.fields[0].substr(this.fields[0].indexOf(".")+1);
							var field1 = (this.fields[1] ?  this.fields[1].substr(this.fields[1].indexOf(".")+1):"");
							var dataFromList = [];
							for (var i in this.fields){
								eval("dataFromList[i] = row."+this.fields[i].substr(this.fields[i].indexOf(".")+1));
							}				
							this.dataFromList = dataFromList;															
							this.text = dataFromList[1];
							this.input.value = this.text;
							this.setSelectedId(dataFromList[0]);
							if (this.bufferOption == boHALF){
								this.bufferData.set(this.dataFromList[0], row);
							}
							
							if (this.eventChange) this.onChange.call(this);		
							this.eventChange = false;
							this.loading = false;
						}else throw("Ada Kesalahan transfer data " +result+"<br>Hubungi administrator anda");
						break;
				}
			}
		}catch(e){			
			this.loading = false;
			this.fadeBackground("ff9900","ff0000",10,100,this.getFullId()+"_edit");			
			this.app.alert(e,"Cek kembali data inputan anda (field " + this.getCaption()+")."+result+this.status, this.dbLib);
			this.status = 3;
			this.setText("");
		}
	},
	
	setMultiSelection : function(data){
		this.multiSelection = data;
	},
	getSqlCount: function(sql){
		var pos = sql.indexOf("select");
		var str1 = sql.substr(pos,pos+7);
		pos = sql.indexOf("from");
		var str2 = sql.substr(pos);
		return "select count(*) from ("+sql+") a";
	},
	clear: function(){
		this.setText("");
	},
	convertFilter: function(field){
		if (this.dataFilter === undefined) return "";
		var filterStr = "";
		var filter = this.dataFilter;
		if (filter.get("=").length != 0) filterStr = field + " in ("+filter.get("=")+")";
		if (filter.get("range").getLength() != 0) {
			tmp = filter.get("range");
			var tmp2 = "";
			for (var i in tmp.objList){
				if (tmp2 != "") tmp2 += " or ";
				tmp2 += field + " "+tmp.get(i);							
			}
			if (tmp2 != "") {
				if (filterStr != "") filterStr += " or ";
				filterStr += "("+ tmp2 +")";
			}
		}					
		if (filter.get("like").getLength() != 0) {
			tmp = filter.get("like");
			var tmp2 = "";
			for (var i in tmp.objList){
				if (tmp2 != "") tmp2 += " or ";
				tmp2 += field + " "+tmp.get(i);							
			}
			if (tmp2 != "") {
				if (filterStr != "") filterStr += " or ";
				filterStr += "("+ tmp2 +")";
			}
		}
		if (filterStr != "") filterStr = "(" + filterStr +")";
		return filterStr;
	},
	setDataCheck: function(data){
		this.dataCheck = data;
	},
	setBufferOptions: function(data)
	{
		this.bufferOption = data;
	},
	setBufferData : function(data){				
		this.bufferData = data;
	},
    setPlaceHolder : function(data){
    	
    },
    setSelectedId : function(id){
    	this.selectedId = id;
    	this.eventChange = true;
		this.pressKeyDown = false;
		if (this.sql !="" && this.dataCheck) this.checkItem();
		else this.onChange.call(this);
    },
    getSelectedId: function(){
    	return this.selectedId;
    }


});
