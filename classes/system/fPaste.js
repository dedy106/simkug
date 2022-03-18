//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.system_fPaste = function(owner){
	try
	{
		if (owner)
		{
			this.formWidth = 500;
			this.formHeight = 220;
			window.system_fPaste.prototype.parent.constructor.call(this,owner);
			this.className = "system_fPaste";													
			this.maximize();
			this.requester = undefined;
			this.centerize();			
			this.caption = "Paste Editor";
			this.message = "";		
			this.msgType = 0;			
			this.mouseX = 0;
			this.mouseY = 0;
			var top = (this.getHeight() / 2) - 64;			
			uses("saiMemo;panel;imageButton");						
			this.editor = new saiMemo(this,{bound:[10,20,this.formWidth - 20,145],labelWidth:0, wrap:false});			
			
			this.pButton = new panel(this);
			this.pButton.setBound(0,this.formHeight - 50,this.formWidth,25);			
			this.pButton.setColor(system.getConfig("app.color.panel"));						
			this.b1 = new imageButton(this.pButton,{bound:[20,2,42,22], click:"doClick", hint:"Ok", image:"icon/"+system.getThemes()+"/bOkMed.png"});
			this.b2 = new imageButton(this.pButton,{bound:[this.pButton.width - 63,2,42,22], click:"doClick", hint:"Cancel", image:"icon/"+system.getThemes()+"/bCancelMed.png"});			
						
			this.isClick = false;					
			this.onClose.set(this,"doClose");
		}
	}catch(e)
	{
		alert("[fPesan]::contructor:"+e);
	}
};
window.system_fPaste.extend(window.commonForm);
window.system_fPaste.implement({
	doDraw: function(canvas){
		var n = this.getFullId();	
		canvas.style.background = "url(image/themes/dynpro/bg.png)";
		//canvas.style.height = 200;
		//canvas.style.width = 400;	
		var html = "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:#cbdbea;;position: absolute; left: 0; top: 0; width: "+this.formWidth+"; height: "+this.formHeight+";overflow:hidden;}' >" +
						"<div id = '"+n+"_header' style='{position:absolute;background:url(icon/"+system.getThemes()+"/formHeader.png) repeat;"+
						"left: 0; top: 0; height: 25; width: "+(this.formWidth - 23).toString()+";cursor:pointer;}' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						//"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						" > </div>"+							
						"<div style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
						"left: "+(this.formWidth - 23).toString()+"; top: 0; height: 25; width: 23;cursor:pointer;}' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						//"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						"></div>"+				
						"<div id = '"+n+"form' style = '{position:absolute;left: 0; top: 25; height: "+(this.formHeight - 25).toString()+"px; width: "+this.formWidth+";}'"+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDownForm(event)' "+
						//"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						"> </div>"+
					"</div>"+
					"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: "+this.formWidth+"; height: "+this.formHeight+";border:1px solid #ff9900;display:none;}' "+
						//"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						//"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>";				
		this.setInnerHTML(html, canvas);
		eventOn(canvas,"mousemove","$$$(" + this.resourceId + ").eventMouseMove(event);");
		eventOn(canvas,"mouseup","$$$(" + this.resourceId + ").eventMouseUp(event);");
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");		
	},
	setMessage: function(data){
		this.message = data;
	},
	setMsgType: function(data){
		this.msgType = data;
	},
	setCaption: function(data){
		var canvas = $(this.getFullId()+"_header");
		if (canvas != undefined)
		{
			canvas.innerHTML = "<div style='position:absolute;left: 10; top : 3; width:100%; height:100%;"+
					" font-family: " + window.system.getConfig("form.titleFontName") + "; font-size: " + 
					window.system.getConfig("form.titleFontSize") + "; font-color: " + 
					window.system.getConfig("form.titleFontColor") + ";'> "+data+"</div>";	
		}		
	},
	show: function(sender, data){						
		this.frameElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.frameElm.style.top = this.height / 2 - (this.formHeight / 2);
		this.blockElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.blockElm.style.top = this.height / 2 - (this.formHeight / 2);
		this.formRequester = this.getApplication()._mainForm;		
		this.frameElm.style.color = "#00529B";
		this.frameElm.style.border = "1px solid #00529B";
		this.frameElm.style.backgroundColor = "#BDE5F8";
		this.b2.show();
		this.editor.clear();
		this.setCaption("Paste Editor");
		this.requester = sender;
		this.setActiveControl(this.b1);	
		this.showModal();
		system.addMouseListener(this);	
	},	
	doClick: function(sender){	
		try		
		{
			system.delMouseListener(this);				
			this.onModal = false;
			this.close();
			var app = this.getApplication();
			app.setActiveForm(this.formRequester);
			this.formRequester.unblock();
			if (sender == this.b2){				
				return;
			}						
			if (this.requester != undefined){											
				this.requester.doSystemPaste(this.editor.getText());
			}			
		}catch(e){
			alert(e);
		}
	},
	eventMouseDownForm: function(event){
	   this.activate();
    },
	eventMouseDown: function(event){				
		if (!this.isClick){
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;	
			
			this.isClick = true;
			this.blockElm.style.display = "";
			this.frameElm.style.display = "none";
		}
		this.activate();
	},
	doSysMouseDown: function(x, y, button, buttonState){	
		window.system_fPaste.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.system_fPaste.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.system_fPaste.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);		
	},
	eventMouseUp: function(event){
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	eventMouseMove: function(event){
		if (this.isClick){
			
			var x = event.clientX;
			var y = event.clientY;
			var newLeft = parseFloat(this.blockElm.style.left) + (x - this.mouseX);
			var newTop = parseFloat(this.blockElm.style.top) + (y - this.mouseY);
								
			this.blockElm.style.left = newLeft;
			this.blockElm.style.top = newTop;			
			this.frameElm.style.left = newLeft;
			this.frameElm.style.top = newTop;			
			
			this.mouseX = x;
			this.mouseY = y;
		}
	},
	showModal: function(){				
		this.b1.setFocus();
		window.system_fPaste.prototype.parent.showModal.call(this);
		this.centerize();
		this.b1.setFocus();
	},
	doClose: function(sender){
		system.delMouseListener(this);
	},	
	centerize: function(){
	    var system = $("systemform");
		var screenWidth = system.offsetWidth;
	    var screenHeight = system.offsetHeight;

	    this.setLeft(parseInt((screenWidth - this.width) / 2, 10));
	    this.setTop(parseInt((screenHeight - this.height) / 3, 10));
	},
	doKeyDown: function(charCode, buttonState, keyCode){
	   if (keyCode == 27) this.b2.click();
	   if (keyCode == 13) this.b1.click();
    }
});
