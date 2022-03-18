//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_fPesan = function(owner){
	try
	{
		if (owner)
		{
			window.portalui_fPesan.prototype.parent.constructor.call(this,owner);
			this.className = "portalui_fPesan";			
			window.portalui_fPesan.prototype.parent.setWidth.call(this, 400);
			window.portalui_fPesan.prototype.parent.setHeight.call(this, 200);									
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
			this.image.setBound(10,48,48,48);			
			this.image.setImage("image/themes/"+system.getThemes()+"/iconAlert.png");				
			this.lblMessage = new portalui_label(this);
			this.lblMessage.setBound(60,20,340,200);
			this.lblMessage.fnt.setColor(system.getConfig("app.color.pesan.font"));			
			this.lblMessage.setCaption("alert");
			this.lblMessage.fnt.setBold(true);			
			this.lblDetMsg = new portalui_label(this);
			this.lblDetMsg.setBound(60,100,340,100);
			this.lblDetMsg.fnt.setColor(system.getConfig("app.color.pesan.font"));			
			this.lblDetMsg.setCaption("alert");	
			
			this.pButton = new portalui_panel(this);
			this.pButton.setBound(0,150,400,25);			
			this.pButton.setColor(system.getConfig("app.color.panel"));						
			this.b1 = new portalui_imageButton(this.pButton);
			this.b1.setBound(10,2,23,23);			
			this.b1.onClick.set(this, "doClick");
			this.b1.setImage("icon/"+system.getThemes()+"/bOk.png");
			this.b1.setHint("Ok");
			
			this.b2 = new portalui_imageButton(this.pButton);
			this.b2.setBound(32,2,23,23);			
			this.b2.onClick.set(this, "doClick");
			this.b2.setImage("icon/"+system.getThemes()+"/bCancel.png");
			this.b2.setHint("Cancel");
			
			this.isClick = false;					
			this.onClose.set(this,"doClose");
		}
	}catch(e)
	{
		alert("[fPesan]::contructor:"+e);
	}
};
window.portalui_fPesan.extend(window.portalui_commonForm);
window.fPesan = window.portalui_fPesan;
window.portalui_fPesan.implement({
	doDraw: function(canvas){
		var n = this.getFullId();	
		canvas.style.height = 200;
		canvas.style.width = 400;	
		var html = "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:#cbdbea;;position: absolute; left: 0; top: 0; width: 100%; height: 100%;overflow:hidden;}' >" +
						"<div id = '"+n+"_header' style='{position:absolute;background:url(icon/"+system.getThemes()+"/formHeader.png) repeat;"+
						"left: 0; top: 0; height: 25; width: 377;cursor:pointer;}' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						" > </div>"+							
						"<div style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
						"left: 377; top: 0; height: 25; width: 23;cursor:pointer;}' "+
						"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						"></div>"+				
						"<div id = '"+n+"form' style = '{position:absolute;left: 0; top: 25; height: 175px; width: 400px;}'"+
						//"onMouseDown='window.system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='window.system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						//"onMouseUp='window.system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						"> </div>"+
					"</div>"+
					"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>";				
		this.setInnerHTML(html, canvas);
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
	alert: function(code, msg, addInfo, ctrl){	 
		this.frameElm.style.color = "#D8000C";
		this.frameElm.style.border = "1px solid #D8000C";
		this.frameElm.style.backgroundColor = "#FFBABA";
		this.b2.setVisible(false);
		this.lblMessage.setCaption(msg);
		this.lblDetMsg.setCaption(addInfo);
		this.setCaption("A l e r t");
		this.image.setImage("image/themes/"+system.getThemes()+"/iconAlert.png");
		this.event = undefined;			
		this.setActiveControl(this.b1);	
		this.showModal();		
		system.addMouseListener(this);	
	},
	confirm: function(code, msg, requester, event, addInfo){
		this.frameElm.style.color = "#9F6000";
		this.frameElm.style.border = "1px solid #9F6000";
		this.frameElm.style.backgroundColor = "#FEEFB3";
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
	info: function(code, msg, addInfo){
		this.frameElm.style.color = "#00529B";
		this.frameElm.style.border = "1px solid #00529B";
		this.frameElm.style.backgroundColor = "#BDE5F8";
		this.b2.setVisible(false);
		this.lblMessage.setCaption(msg);
		this.lblDetMsg.setCaption(addInfo);
		this.setCaption("I n f o r m a t i o n");
		this.image.setImage("image/themes/"+system.getThemes()+"/iconInfo.png");
		this.event = undefined;	
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
				if (this.requester instanceof portalui_childForm)
						this.requester.doModalResult(this.event, this.modalResult);				
				else if (this.requester instanceof portalui_commonForm && this.requester.doModalResult)
						this.requester.doModalResult(this.event, this.modalResult);				
			}
		}catch(e){
			alert(e);
		}
	},
	eventMouseDown: function(event){	
		this.mouseX = event.clientX;
	    this.mouseY = event.clientY;	
		this.isClick = true;
		this.blockElm.style.display = "";
		this.frameElm.style.display = "none";
	},
	doSysMouseDown: function(x, y, button, buttonState){	
		window.portalui_fPesan.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.portalui_fPesan.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.portalui_fPesan.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		if (this.isClick)
		{		
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
			this.mouseX = x;
			this.mouseY = y;		
		}
	},
	eventMouseUp: function(event){
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	eventMouseMove: function(event){
		if (this.isClick)
		{
			var x = event.clientX;
			var y = event.clientY;
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
			this.mouseX = x;
			this.mouseY = y;
		}
	},
	showModal: function(){				
		this.formRequester = this.getApplication().getActiveForm();
		this.b1.setFocus();
		window.portalui_fPesan.prototype.parent.showModal.call(this);
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
	}
});
