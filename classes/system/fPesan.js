//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.system_fPesan = function(owner){
	try
	{
		if (owner)
		{
			this.formWidth = 500;
			this.formHeight = 220;
			window.system_fPesan.prototype.parent.constructor.call(this,owner);
			this.className = "system_fPesan";			
			//window.system_fPesan.prototype.parent.setWidth.call(this, 400);
			//window.system_fPesan.prototype.parent.setHeight.call(this, 200);									
			this.maximize();
			this.requester = undefined;
			this.centerize();			
			this.caption = "Alert Form";
			this.message = "";		
			this.msgType = 0;			
			this.mouseX = 0;
			this.mouseY = 0;
			var top = (this.getHeight() / 2) - 64;			
			uses("portalui_image;portalui_label;portalui_panel;portalui_imageButton");
			this.image = new portalui_image(this);
			this.image.setBound(10,28,48,48);			
			this.image.setImage("image/themes/"+system.getThemes()+"/iconAlert.png");				
			this.lblMessage = new portalui_label(this);
			this.lblMessage.setBound(60,10,this.formWidth - 80,100);
			this.lblMessage.fnt.setColor(system.getConfig("app.color.pesan.font"));			
			this.lblMessage.setCaption("alert");
			this.lblMessage.fnt.setBold(true);			
			this.lblMessage.getCanvas().style.overflow = "auto";
			var capCanvas = this.lblMessage.captionCanvas;
			if (capCanvas == undefined) this.lblMessage.captionCanvas = $(this.lblMessage.getFullId() + "_caption");			
			this.lblMessage.captionCanvas.style.width = "auto";
			this.lblMessage.captionCanvas.style.height = "auto";			
			
			this.lblDetMsg = new portalui_label(this);
			this.lblDetMsg.setBound(10,120,this.formWidth - 20,48);
			this.lblDetMsg.fnt.setColor(system.getConfig("app.color.pesan.font"));			
			this.lblDetMsg.setCaption("alert");	
			//this.lblDetMsg.getCanvas().style.border = "1px solid #45b2f0";
			//this.lblDetMsg.getCanvas().style.background = "#dddddd";
			this.lblDetMsg.getCanvas().style.overflow = "auto";
			this.lblMessage.captionCanvas.style.width = "auto";
			this.lblMessage.captionCanvas.style.height = "auto";
			
			this.pButton = new portalui_panel(this);
			this.pButton.setBound(0,this.formHeight - 50,this.formWidth,25);			
			this.pButton.setColor("#ddd");
			this.pButton.setBorder(0);						
			this.b1 = new button(this.pButton,{bound:[20,0,80,25], click:"doClick", caption:"Ok",image:"icon/"+system.getThemes()+"/bOkMed.png"});
			this.b2 = new button(this.pButton,{bound:[this.pButton.width - 100,0,80,25], click:"doClick", caption:"Cancel", image:"icon/"+system.getThemes()+"/bCancelMed.png"});			
						
			this.isClick = false;					
			this.onClose.set(this,"doClose");
		}
	}catch(e)
	{
		alert("[fPesan]::contructor:"+e);
	}
};
window.system_fPesan.extend(window.portalui_commonForm);
window.system_fPesan.implement({
	doDraw: function(canvas){
		var n = this.getFullId();	
		canvas.style.background = "url(image/themes/dynpro/bg.png)";
		//canvas.style.height = 200;
		//canvas.style.width = 400;	
		var html = "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:#cbdbea;;position: absolute; left: 0; top: 0; width: "+this.formWidth+"; height: "+this.formHeight+";overflow:hidden;}' >" +
						"<div id = '"+n+"_header' style='{position:absolute;background:transparent"+
						"left: 0; top: 0; height: 25; width: "+(this.formWidth - 23).toString()+";cursor:pointer;}' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						//"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						" > </div>"+							
						"<div style='{position:absolute;background:transparent"+
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
					" font-family: arial; text-align:center;font-size: 14; font-color: " + 
					window.system.getConfig("form.titleFontColor") + ";'> "+data+"</div>";	
		}		
	},
	show: function(message, type, addInfo){				
		switch(type)
		{
			case 0 :
				this.alert(type, message, addInfo);	
				break;
			case 2 :
				this.info(type, message, addInfo);
				break;
		}
	},
	alert: function(code, msg, addInfo, sender, event){	 
	    this.frameElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.frameElm.style.top = this.height / 2 - (this.formHeight / 2);
		this.blockElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.blockElm.style.top = this.height / 2 - (this.formHeight / 2);
		
	    this.formRequester = this.getApplication()._mainForm;		
		this.frameElm.style.color = "#D8000C";
		this.frameElm.style.border = "1px solid #57A9FF";
		this.frameElm.style.backgroundColor = "#fff";
		this.b2.setVisible(false);		
		this.lblMessage.setCaption(msg);
		this.lblDetMsg.setCaption(addInfo);
		//var data = this.lblMessage.getCaptionRect();
				
		this.setCaption("A l e r t");
		this.image.setImage("image/themes/"+system.getThemes()+"/iconAlert.png");
		this.event = event;			
		this.requester = sender;
		this.setActiveControl(this.b1);	
		this.showModal();		
		system.addMouseListener(this);
	},
	confirm: function(code, msg, requester, event, addInfo){
		this.frameElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.frameElm.style.top = this.height / 2 - (this.formHeight / 2);
		this.blockElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.blockElm.style.top = this.height / 2 - (this.formHeight / 2);
		
	    this.formRequester = this.getApplication()._mainForm;		
		this.frameElm.style.color = "#9F6000";
		this.frameElm.style.border = "1px solid #57A9FF";
		this.frameElm.style.backgroundColor = "#fff";
		this.b2.setVisible(true);	
		this.lblMessage.setCaption(msg);
		this.lblDetMsg.setCaption(addInfo);
		this.setCaption("C o n f i r m a t i o n");
		this.image.setImage("image/themes/"+system.getThemes()+"/iconConfirm.png");
		this.requester = requester;
		this.event = event;	
		this.setActiveControl(this.b1);    	
		this.showModal();	
		system.addMouseListener(this);	
	},
	info: function(code, msg, addInfo,sender, event){
	    this.frameElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.frameElm.style.top = this.height / 2 - (this.formHeight / 2);
		this.blockElm.style.left = this.width / 2 - (this.formWidth / 2);
		this.blockElm.style.top = this.height / 2 - (this.formHeight / 2);
		
	    this.formRequester = this.getApplication()._mainForm;		
		this.frameElm.style.color = "#00529B";
		this.frameElm.style.border = "1px solid #57A9FF";
		this.frameElm.style.backgroundColor = "#fff";
		this.b2.setVisible(false);
		this.lblMessage.setCaption(msg);
		this.lblDetMsg.setCaption(addInfo);
		this.setCaption("I n f o r m a t i o n");
		this.image.setImage("image/themes/"+system.getThemes()+"/iconInfo.png");
		this.event = event;	
		this.requester = sender;
		this.setActiveControl(this.b1);
		this.showModal();	
		system.addMouseListener(this);
	},
	doClick: function(sender){	
		try
		{
			if (sender == this.b1)
			{
				if (this.event != undefined)
					this.modalResult = window.mrOk;
			}else 
			{
				if (this.event != undefined)
					this.modalResult = window.mrCancel;
			}		
			this.onModal = false;
			this.close();				
			var app = this.getApplication();
			app.setActiveForm(this.formRequester);
			if (this.formRequester.activeChildForm != undefined)
				this.formRequester.activeChildForm.setActiveControl(this.formRequester.activeChildForm.childs[0]);											
			this.formRequester.unblock();
			if (this.requester != undefined){	
			     if (window.portalui_childForm === undefined){
			         uses("portalui_childForm");
                 }
				if (this.requester instanceof portalui_childForm)
						this.requester.doModalResult(this.event, this.modalResult);				
				else if (this.requester instanceof portalui_commonForm && this.requester.doModalResult)
						this.requester.doModalResult(this.event, this.modalResult);				
			}
			this.free();
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
		window.system_fPesan.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.system_fPesan.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.system_fPesan.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		/*if (this.isClick)
		{		
			var newLeft = this.blockElm.style.left + (x - this.mouseX);
			var newTop = this.blockElm.style.top + (y - this.mouseY);
		
			//this.setLeft(newLeft);
			//this.setTop(newTop);
			this.blockElm.style.left = newLeft;
			this.blockElm.style.top = newTop;
			this.frameElm.style.left = newLeft;
			this.frameElm.style.top = newTop;
		
			this.mouseX = x;
			this.mouseY = y;		
		}*/
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
		window.system_fPesan.prototype.parent.showModal.call(this);
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
