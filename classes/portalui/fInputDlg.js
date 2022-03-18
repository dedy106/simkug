//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_fInputDlg = function(owner){
	try
	{
		if (owner)
		{
			window.portalui_fInputDlg.prototype.parent.constructor.call(this,owner);
			this.className = "portalui_fInputDlg";			
			window.portalui_fInputDlg.prototype.parent.setWidth.call(this, 400);
			window.portalui_fInputDlg.prototype.parent.setHeight.call(this, 200);									
			this.requester = undefined;
			this.centerize();			
			this.caption = "Alert Form";
			this.message = "";		
			this.msgType = 0;			
			this.mouseX = 0;
			this.mouseY = 0;
			var top = (this.getHeight() / 2) - 64;			
			uses("portalui_label;portalui_panel;portalui_imageButton;portalui_saiEdit");
			this.lblMessage = new portalui_label(this,{bound:[30,40,340,20],fontColor:system.getConfig("app.color.pesan.font"),caption:"Command"});									
			this.lblMessage.fnt.setBold(true);			
			this.eInput = new portalui_saiEdit(this,{bound:[30,63,340,20]});
			this.pButton = new portalui_panel(this,{bound:[0,150,400,25],color:system.getConfig("app.color.panel")});			
			this.b1 = new portalui_imageButton(this.pButton,{bound:[10,2,23,23],click:[this,"doClick"], image:"icon/"+system.getThemes()+"/bOk.png", hint:"Ok"});						
			this.b2 = new portalui_imageButton(this.pButton,{bound:[32,2,23,23],click:[this,"doClick"], image:"icon/"+system.getThemes()+"/bCancel.png",hint:"Cancel"});			
			this.isClick = false;					
			this.onClose.set(this,"doClose");
		}
	}catch(e)
	{
		alert("[fPesan]::contructor:"+e);
	}
};
window.portalui_fInputDlg.extend(window.portalui_commonForm);
window.fInputDlg = window.portalui_fInputDlg;
window.portalui_fInputDlg.implement({
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
	show: function(requester, caption,prompt, defaultValue){		
		this.setCaption(caption);
		this.lblMessage.setCaption(prompt);
		this.eInput.setText(defaultValue === undefined ? "" : defaultValue);
		this.requester = requester;
		this.formRequester = this.getApplication().getActiveForm();
		this.b1.setFocus();
		window.portalui_fInputDlg.prototype.parent.showModal.call(this);
		this.centerize();
		this.b1.setFocus();
	},	
	doClick: function(sender){	
		try
		{
			if (sender == this.b1){
				this.modalResult = window.mrOk;
				this.requester.dataFromDlg = this.eInput.getText();				
			}else {
				this.modalResult = window.mrCancel;
				this.requester.dataFromDlg = "";
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
						this.requester.doModalResult("inputdlg", this.modalResult,this.eInput.getText());				
				else if (this.requester instanceof portalui_commonForm && this.requester.doModalResult)
						this.requester.doModalResult("inputdlg", this.modalResult,this.eInput.getText());				
			}
			if (this.modalResult  == window.mrOk){				
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
		window.portalui_fInputDlg.prototype.parent.doSysMouseDown.call(this,x, y, button, buttonState);
	},
	doSysMouseUp: function(x, y, button, buttonState){	
		window.portalui_fInputDlg.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.portalui_fInputDlg.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
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
