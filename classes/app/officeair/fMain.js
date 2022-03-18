//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("portalui_saiCB;portalui_image;portalui_imageButton;portalui_button;portalui_label;portalui_saiEdit;portalui_saiLabelEdit;portalui_panel;portalui_flashObj;portalui_selection;portalui_checkBox;util_file;util_addOnLib;util_standar;portalui_bevel;portalui_roundPanel");
window.app_officeair_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_officeair_fMain.prototype.parent.constructor.call(this, owner);
			this.onClose.set(this,"doClose");		
			this.maximize();					
			this.centerize();			
			this.className  = "fMain";
			this.formCaption = "officeair";											
			this.fLogin = new app_officeair_fLogin(this, {bound:[this.width / 2 - 180,this.height / 2 - 75,420,160],background:"image/themes/dynpro/greygradient.png",caption:"<font color='#ffffff'>Masuk Kantor</font>",icon:"image/themes/dynpro/iconpanel.png",titleBg:"#0b5277"});//
			system.addMouseListener(this);
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_officeair_fMain.extend(window.portalui_commonForm);
window.app_officeair_fMain.implement({
	doDraw: function(canvas){		
		var n = this.getFullId();   
		canvas.style.background = "#1d292f";
		canvas.style.overflow = "hidden";
		var html =  "<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +                    									
			"<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;overflow:auto}' ></div>" +                    
	                "</div>"+
			"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
			"></div>"+
			"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity=70);opacity:0.7;moz-opacity:0.7; zindex:1000000;display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
		this.setInnerHTML(html, canvas);
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");	
	},
	doAfterResize: function(width, height){
		this.setWidth(width);
		this.setHeight(height);
		if (this.fLogin !== undefined){
			this.fLogin.setLeft(this.width / 2 - 180);
			this.fLogin.setTop(this.height / 2 + 75);
		}
		if (this.bLogout !== undefined){
			this.bLogout.setTop(height - 40);
		}
	},
	doAfterLogin: function(){		
		this.dbLib = new util_dbUtility();
		var width = this.width - 180;
		var height = this.height-60;			
		this.imgLogo = new portalui_image(this,{bound:[35,5,100,100],image:""});
		this.leftMenu = new portalui_control(this,{bound:[10,110,150,550]});				
		html = "<div onload='fixPNG(this);' style='background-color:#407fb2;filter:alpha(opacity:50);moz-opacity:0.5;opacity:0.5;position:absolute;left:0;top:0;width:100;height:auto' ></div>"+
			"<div style='background-image:url(classes/app/officeair/image/whitegradient.png);background-position:bottom left;background-repeat: repeat-x;position:absolute;left:0;top:0;height:100%;width:100%;filter:alpha(opacity:60);moz-opacity:0.6;opacity:0.6;-webkit-border-radius: 20px;-moz-border-radius: 20px'></div>"+
			"<div style='background-image:url(classes/app/officeair/image/whitegradient2.png);background-position:top left;background-repeat: repeat-x;position:absolute;left:0;top:0;height:100%;width:100%;filter:alpha(opacity:60);moz-opacity:0.6;opacity:0.6;-webkit-border-radius: 20px;-moz-border-radius: 20px'></div>"+			
			//"<span style='position:absolute;left:20;top:5;width:auto;height:auto;color:#ffffff;' >Office Menu</span>"+				
			"<div id='msgcont' style='color:#ffffff;font-size:11;position:absolute;left:0;top:0;width:100%;height:550;'>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showDesk();'  align='center' style='position:absolute;top:5;left:10;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/chart.png' width=57 height=57/>my Desk</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showKantor();'   align='center' style='position:absolute;left:80;top:5;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/chart.png' width=57 height=57/>Kantor</div>"+				
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showKaryawan();'  align='center' style='position:absolute;left:10;top:80;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/contact.png' width=57 height=57/>Karyawan</div>"+							
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showEmail();' align='center' style='position:absolute;left:80;top:80;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/mail.png' width=57 height=57/>Inbox</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showMemo();' align='center'  style='position:absolute;left:10;top:155;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/memo.png' width=57 height=57/>Memo</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").doChat();' align='center' style='position:absolute;left:80;top:155;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/message.png' width=57 height=57/>Chat</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").doVideo();' align='center' style='position:absolute;left:10;top:230;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/video.png' width=57 height=57/>Video Conf</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' onClick='system.getResource("+this.resourceId+").showFiling();' align='center' style='position:absolute;left:80;top:230;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px'><img src='classes/app/officeair/image/notes.png' width=57 height=57/>Filing</div>"+			
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' style='position:absolute;left:10;top:305;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px' align='center' ><img src='classes/app/officeair/image/contact.png' width=57 height=57/>Contact</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' style='position:absolute;left:80;top:305;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px' align='center' ><img src='classes/app/officeair/image/chart.png' width=57 height=57/>Task</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' style='position:absolute;left:10;top:380;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px' align='center' ><img src='classes/app/officeair/image/schedule.png' width=57 height=57/>Schedule</div>"+
			"<div onMouseover='this.style.background=\"#50b3e7\";' onMouseout='this.style.background=\"transparent\";' style='position:absolute;left:80;top:380;cursor:pointer;height:60;width:60;-webkit-border-radius: 10px;-moz-border-radius: 10px' align='center' ><img src='classes/app/officeair/image/schedule.png' width=57 height=57/>Project</div>"+
			( window.dataLogin.email == "dweexfuad@gmail.com" ?  "<div onMouseover='this.style.background=\"#ff9900\";' onMouseOut='this.style.background=\"transparent\";' align='center' onClick='system.getResource("+this.resourceId+").showMonitoring();'  align='center' style='-webkit-border-radius: 10px;-moz-border-radius: 10px;position:absolute;left:10;top:455;cursor:pointer;height:60;width:60;'><img src='classes/app/officeair/image/chart.png' width=57 height=57/>Monitoring</div>" : "")+				
			"</div> ";
		this.leftMenu.setInnerHTML(html);				
		if (window.dataLogin.email != "dweexfuad@gmail.com") {
			this.leftMenu.setHeight(480);
		}
		this.bLogout = new portalui_button(this,{bound:[30,this.leftMenu.top + this.leftMenu.height + 20,80,20],caption:"Logout",click:[this,"doClick"]});
		this.leftMenu.addStyle("border:2px solid #ffffff;-webkit-border-radius: 20px;-moz-border-radius: 20px");		
		this.first = true;			
		var data = this.dbLib.getDataProvider("select logo from off_lokasi where kode_lokasi ='"+window.dataLogin.office+"' ",true);
		if (typeof data != "string"){
			if (data.rs.rows[0] !== undefined) this.imgLogo.setImage("classes/app/officeair/image/"+data.rs.rows[0].logo);
		}
		this.doChat();this.pChat.setHeight(0);
		this.doVideo();this.pVideo.setHeight(0);
		if (window.dataLogin.email == "dweexfuad@gmail.com"){
			this.showMonitoring();this.pMonitor.setHeight(0);
		}
		this.showDesk();
	},
	doClose: function(sender){		
		system.delListener(this);
	},
	logout: function(){				
		system.delListener(this);
	},	
	doSysMouseDown: function(x,y, button, buttonState){
		this.activate();
	},
	doMsgKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13) this.bSend.click();
	},
	doEditKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13) this.bVidSend.click();
	},
	doChat: function(){
		try{
			var height = this.height-20;
			if (this.pChat === undefined){
				var width = this.width - 180;				
				this.pChat = new portalui_roundPanel(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>Chat</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pChat.addStyle("border:2px solid #ffffff");	
				this.eMsgArea = new portalui_control(this.pChat,{bound:[10,50,this.pChat.width - 260,this.pChat.height - 135]});
				this.eMsgArea.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;");
				this.eMsgArea.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eLogMsg = new portalui_control(this.pChat,{bound:[10,50,this.pChat.width - 260,this.pChat.height - 135]});
				this.eLogMsg.addStyle("border:1px solid #999999;background:#ffffff;overflow:hidden;opacity:0.1;filter:alpha(opacity=10);moz-opacity:0.1;color:#ff0000");			
				this.eLogMsg.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eUserList = new portalui_control(this.pChat,{bound:[this.pChat.width - 240,70,200,this.pChat.height - 155]});
				this.eUserList.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;");
				this.eMsg = new portalui_saiEdit(this.pChat,{bound:[10,this.eMsgArea.top+this.eMsgArea.height + 10,this.pChat.width - 140,20], keyDown:[this,"doMsgKeyDown"]});			
				this.bConnect = new portalui_button(this.pChat,{bound:[this.pChat.width - 240,50,80,20], caption:"Connect",click:[this,"doClick"]});
				this.bSend = new portalui_button(this.pChat,{bound:[this.pChat.width - 120,this.eMsgArea.top+this.eMsgArea.height + 10,80,20], caption:"Send",click:[this,"doClick"]});
				this.flashObj = new portalui_flashObj(this.pChat,{bound:[10,50,200,500],flashFile:"classes/app/officeair/swf/roojaxRTMP.swf",resourceOwner:this.resourceId,
					params:{username:window.dataLogin.email,office:window.dataLogin.office,uri:"roojax.com:9135/chat_test"}});			
				this.bChatClose = new portalui_imageButton(this.pChat,{bound:[width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
				this.bChatMin = new portalui_imageButton(this.pChat,{bound:[width - 80,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
				this.pChat.getClientCanvas().style.top = 5;
				this.pChat.getClientCanvas().style.height = height + 20;
				this.pChat.makeRound(20);
			}
			this.pChat.setHeight(height);
			this.pChat.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){		
		try{
			if (sender == this.bConnect)
				if (sender.caption == "Connect")
					this.flashObj.getObject().connect(window.dataLogin.email,"roojax.com:9135/chat_test","Connect");
				else this.flashObj.getObject().connect("","","Disconnect");
			else if (sender == this.bSend)
				this.flashObj.getObject().sendMessage(this.eMsg.getText());
			else if (sender == this.bPublish){
				this.fVideo.getObject().publishVideo();
				if (sender.caption == "Publish")
					sender.setCaption("Stop Publish");
				else sender.setCaption("Publish");
			}else if (sender == this.bVidConnect){
				if (sender.caption == "Connect")
					this.fVideo.getObject().connect("rtmp://roojax.com:9135/flex2FMSExplorer",window.dataLogin.email);
				else this.fVideo.getObject().disconnect();
			}else if (sender == this.bUserList){
				this.eUserVideo.setVisible(!this.eUserVideo.visible);
				if (this.eUserVideo.visible) this.eUserVideo.bringToFront();
			}else if (sender == this.bShowLog){
				this.eLogVideo.setVisible(!this.eLogVideo.visible);
				if (this.eLogVideo.visible) this.eLogVideo.bringToFront();
			}else if (sender == this.bShowChat){
				this.eVideoChat.setVisible(!this.eVideoChat.visible);
				if (this.eVideoChat.visible) this.eVideoChat.bringToFront();
			}else if (sender == this.bVidSend){
				this.fVideo.getObject().sendMsg(this.eVideo.getText());
				this.eVideo.setText("");
			}else if (sender == this.bLogout){
				if (this.pDesk !== undefined) this.pDesk.doSaveAll();
				window.dataLogin = {};				
				system.restart();
			}else if (sender == this.bVidClose || sender == this.bVidMin){
				this.pVideo.setHeight(0);
			}else if (sender == this.bChatClose || sender == this.bChatMin){
				this.pChat.setHeight(0);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doMessage: function(sender, msg){
		try{									
			if (msg.indexOf("msg:") != -1){
				this.eMsgArea.getCanvas().firstChild.innerHTML += msg.substr(4) +"<br>";
				this.eMsgArea.getCanvas().scrollTop = this.eMsgArea.getCanvas().firstChild.offsetHeight;
			}else if(msg == "conflog:stateready"){
				this.eLogVideo.getCanvas().firstChild.innerHTML += msg.substr(8) +"<br>";
				this.eLogVideo.getCanvas().scrollTop = this.eLogVideo.getCanvas().firstChild.offsetHeight;				
			}else if(msg.indexOf("conflog") != -1){
				//if (msg.substr(8).search("Can't connect to FMS") != -1) this.bVidConnect.setEnable(true);				
				if (msg.substr(8) == "Disconnect...") this.setButtonState(undefined,false);
				this.eLogVideo.getCanvas().firstChild.innerHTML += msg.substr(8) +"<br>";
				this.eLogVideo.getCanvas().scrollTop = this.eLogVideo.getCanvas().firstChild.offsetHeight;
			}else if(msg.indexOf("confMsg") != -1){				
				this.eVideoChat.show();
				this.eVideoChat.getCanvas().firstChild.firstChild.innerHTML += msg.substr(8) +"<br>";
				this.eVideoChat.getCanvas().firstChild.scrollTop = this.eVideoChat.getCanvas().firstChild.firstChild.offsetHeight;
			}else if(msg.indexOf("conf") != -1){
				this.eLogVideo.getCanvas().firstChild.innerHTML += msg.substr(5) +"<br>";
				this.eLogVideo.getCanvas().scrollTop = this.eLogVideo.getCanvas().firstChild.offsetHeight;				
			}else if (msg.indexOf("msg:") == -1){
				if (msg == "log:disconnecting..." || msg == "log:disconnect...") this.bConnect.setCaption("Connect");
				else if (msg == "log:connecting...") this.bConnect.setCaption("Disconnect");
				this.eLogMsg.getCanvas().firstChild.innerHTML += msg.substr(4) +"<br>";
				this.eLogMsg.getCanvas().scrollTop = this.eLogMsg.getCanvas().firstChild.offsetHeight;				
			} 
		}catch(e){
			systemAPI.alert(e);
		}
	},
	updateUser: function(sender,user){		
		try{
			this.userList = user;
			this.eUserList.getCanvas().innerHTML = "";
			var html = "";
			for (var i in user){
				html += "<span style='width:100%;height:20;' onmouseover='this.style.background=\"#ff9900\"' onmouseout='this.style.background=\"transparent\"'>"+user[i]+"</span><br>";
			}
			this.eUserList.getCanvas().innerHTML = html;
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doVideo: function(){
		try{
			var height = this.height-20;
			if (this.pVideo === undefined){				
				var width = this.width - 180;				
				this.pVideo = new portalui_roundPanel(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>Video Conference</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.fVideo = new portalui_flashObj(this.pVideo,{bound:[10,50,this.pVideo.width - 260,this.pVideo.height - 135],flashFile:"classes/app/officeair/swf/roojaxConf.swf",resourceOwner:this.resourceId,
					params:{uri:"rtmp://roojax.com:9135/flex2FMSExplorer",room:"_defroom_",office:window.dataLogin.office,userName:window.dataLogin.email}});				
				this.bevel = new portalui_bevel(this.pVideo,{bound:[10,this.pVideo.height - 120,185,90]});
				this.cb_audio = new portalui_checkBox(this.pVideo,{bound:[20,this.pVideo.height - 110,100,20],caption:"Audio",selected:true,change:[this,"doChange"]});
				this.cb_video = new portalui_checkBox(this.pVideo,{bound:[20,this.pVideo.height - 90,100,20],caption:"Video",selected:true,change:[this,"doChange"]});				
				this.bPublish = new portalui_button(this.pVideo,{bound:[15,this.pVideo.height - 60,80,20],caption:"Publish",enable:false,click:[this,"doClick"]});
				this.bVidConnect = new portalui_button(this.pVideo,{bound:[105,this.pVideo.height - 60,80,20],caption:"Connect",click:[this,"doClick"]});
				this.bVidRoom = new portalui_button(this.pVideo,{bound:[210,this.pVideo.height - 115,100,18],caption:"Private Room",click:[this,"createRoom"]});
				this.bRoomList = new portalui_button(this.pVideo,{bound:[210,this.pVideo.height - 95,100,18],caption:"Room List",enable:false,click:[this,"showRoom"]});
				this.bInvite = new portalui_button(this.pVideo,{bound:[315,this.pVideo.height - 115,100,18],caption:"Invite",enable:false,click:[this,"showRoom"]});				
				
				this.eLogVideo = new portalui_control(this.pVideo,{bound:[10,50,this.pVideo.width - 120,this.pVideo.height - 170],visible:false});
				this.eLogVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;opacity:0.3;filter:alpha(opacity=30);moz-opacity:0.3;color:#ff0000");			
				this.eLogVideo.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eUserVideo = new portalui_control(this.pVideo,{bound:[this.pVideo.width - 250,this.pVideo.height - 225,220,130],visible:false});
				this.eUserVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;color:#0000ff");			
				this.eUserVideo.getCanvas().innerHTML = "<span style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eVideoChat = new portalui_control(this.pVideo,{bound:[100,100,this.pVideo.width - 200,this.pVideo.height - 200],visible:false});
				this.eVideoChat.addStyle("border:1px solid #ff9900;");
				this.eVideoChat.getCanvas().ondblclick= function(){
					this.style.display = "none";
				};
				this.eVideoChat.getCanvas().innerHTML = "<div style='position:absolute;width:100%;height:100%;overflow:auto'><span style='width:100%;color:#ffffff;height:auto;top:0;left:0;position:absolute;opacity:1;filter:alpha(opacity=100);moz-opacity:1;z-index:1'></span></div>"+
					"<div style='background:#333333;opacity:0.3;filter:alpha(opacity=30);moz-opacity:0.3;position:absolute;width:100%;height:100%;top:0;left:0;z-index:0'></div>";
				this.eVideo = new portalui_saiEdit(this.pVideo,{bound:[210,this.pVideo.height - 60,this.pVideo.width - 340,20],text:"",keyDown:[this,"doEditKeyDown"]});
				this.bVidSend = new portalui_button(this.pVideo,{bound:[this.pVideo.width - 110,this.pVideo.height - 60,80,18],caption:"Send",enable:false,click:[this,"doClick"]});
				this.bUserList = new portalui_imageButton(this.pVideo,{bound:[this.pVideo.width - 50,this.pVideo.height - 90,16,16],image:"icon/dynpro/user.png",click:[this,"doClick"],hint:"User List"});
				this.bShowLog = new portalui_imageButton(this.pVideo,{bound:[this.pVideo.width - 70,this.pVideo.height - 90,16,16],image:"icon/dynpro/log.png",click:[this,"doClick"],hint:"App Log"});
				this.bShowChat = new portalui_imageButton(this.pVideo,{bound:[this.pVideo.width - 90,this.pVideo.height - 90,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doClick"],hint:"Show Chat"});
				
				this.eRoomVideo = new portalui_control(this.pVideo,{bound:[210,this.pVideo.height - 85,220,20],visible:false});
				this.eRoomVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;color:#0000ff");			
				this.eRoomVideo.getCanvas().innerHTML = "<span style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.bVidClose = new portalui_imageButton(this.pVideo,{bound:[width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
				this.bVidMin = new portalui_imageButton(this.pVideo,{bound:[width - 80,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
				this.pVideo.getClientCanvas().style.top = 5;				
				this.pVideo.makeRound(20);
			}
			this.pVideo.setHeight(height);
			this.pVideo.getClientCanvas().style.height = height + 20;
			this.pVideo.bringToFront();
		}catch(e){
			alert(e);
		}
	},
	setButtonState:function(sender, connState){		
		if (connState){
			this.bVidConnect.setCaption("Disconnect");
			this.bVidSend.setEnabled(true);
			this.bPublish.setEnabled(true);
			this.bVidRoom.setEnabled(false);
			this.bRoomList.setEnabled(true);
			this.eRoomVideo.hide();
			if (this.pRoom !== undefined) this.pRoom.hide();
		}else{
			this.bVidConnect.setCaption("Connect");
			this.bVidSend.setEnabled(false);
			this.bPublish.setEnabled(false);
			this.bVidRoom.setEnabled(true);
			this.bRoomList.setEnabled(false);
		}
	},
	doChange: function(sender){
		if (sender == this.cb_audio) this.fVideo.getObject().toggleAudio();
		if (sender == this.cb_video) this.fVideo.getObject().toggleVideo();
	},		
	updateConfUser:function(userList, allUserList){
		try{						
			this.eUserVideo.getCanvas().firstChild.innerHTML = "";
			var h = 0;
			for (var i in userList){
				this.eUserVideo.getCanvas().firstChild.innerHTML += "<span onmouseover='this.style.background=\"#ff9900\";' onmouseout='this.style.background=\"\";'  onclick='system.getResource("+this.resourceId+").doUserSelect(\""+userList[i].id+"\");' style='width:100%;display:block;height:16;cursor:pointer'>"+userList[i].userName +"</span>";			
				h+= 18;
			}		
			if (h < 500) {			
				this.eUserVideo.setHeight(h);
				this.eUserVideo.setTop(this.pVideo.height - 95- h);
			}
			this.eUserVideo.getCanvas().scrollTop = this.eUserVideo.getCanvas().firstChild.offsetHeight;
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			
		}catch(e){
			alert(e);
		}
	},
	doSelectPage: function(sender){
		switch(sender){
			case "prev":
				if (this.activePage > 1)
					this.activePage--;
			break;
			case "next":
				this.activePage++;
			break;
		}
		this.mail.inboxA(this.activePage,10);
	},
	createRoom: function(sender){
		if (this.pRoom === undefined){
			this.pRoom = new portalui_panel(this.pVideo,{bound:[sender.left,sender.top - 53,300,50],caption:"Room Name",visible:false});
			this.eRoom = new portalui_saiEdit(this.pRoom,{bound:[10,25,200,20],text:""});
			this.bRoomOk = new portalui_button(this.pRoom,{bound:[220,25,60,20],caption:"Ok",click:[this,"doRoomClick"]});
		}
		this.pRoom.setVisible(!this.pRoom.visible);
		this.pRoom.bringToFront();
	},	
	doRoomClick: function(sender){
		if (this.eRoom.getText() != ""){
			this.fVideo.getObject().setRoom(this.eRoom.getText());			
		}else {
			this.eRoom.setText("_defroom_");
			this.fVideo.getObject().setRoom("_defroom_");			
		}
		this.pRoom.hide();
	},
	doUserSelect: function(userId){
		this.selectedUser = userId;
	},
	showRoom: function(sender){
		this.eRoomVideo.setVisible(!this.eRoomVideo.visible);
	},
	updateRoomList: function(room){
		this.eRoomVideo.getCanvas().firstChild.innerHTML = "";
		var h = 0;
		for (var i in room){
			this.eRoomVideo.getCanvas().firstChild.innerHTML += "<span onmouseover='this.style.background=\"#ff9900\";' onmouseout='this.style.background=\"\";'  onclick='system.getResouce("+this.resourceId+").doUserSelect(\""+i+"\");' style='width:100%;height:16;white-space:nowarp;display:block;cursor:pointer'>"+i +"</span";
			h+= 18;
		}		
		if (h < 500) {			
			this.eRoomVideo.setHeight(h);
			this.eRoomVideo.setTop(this.pVideo.height - 68- h);
		}
		this.eRoomVideo.getCanvas().scrollTop = this.eRoomVideo.getCanvas().firstChild.offsetHeight;
	},
	showMonitoring: function(){
		try{
			var height = this.height-20;
			if (this.pMonitor === undefined){			
				uses("app_officeair_fAdministrator");
				var width = this.width - 180;			
				this.pMonitor = new app_officeair_fAdministrator(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>Stream Monitoring</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pMonitor.getClientCanvas().style.top = 5;				
				this.pMonitor.makeRound(20);
			}			
			this.pMonitor.setHeight(height);
			this.pMonitor.getClientCanvas().style.height = height + 25;
			this.pMonitor.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showKantor: function(){
		try{
			if (this.pKantor === undefined){			
				uses("app_officeair_fOffice");
				var width = this.width - 180;
				var height = this.height-20;
				this.pKantor = new app_officeair_fOffice(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>Data Kantor</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pKantor.getClientCanvas().style.top = 5;
				this.pKantor.getClientCanvas().style.height = height - 25;
				this.pKantor.makeRound(20);
			}		
			this.pKantor.show();
			this.pKantor.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	createListData: function(){
		try{					
			if (this.listDataForm === undefined){
				uses("portalapp_fListData");
				this.listDataForm = new portalapp_fListData(this.app);		
				this.listDataForm.setWidth(450);
				this.listDataForm.setHeight(477);			
				this.listDataForm.hide();			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	showKaryawan: function(){
		try{
			if (this.pKaryawan === undefined){			
				uses("app_officeair_fKaryawan");
				var width = this.width - 180;
				var height = this.height-20;
				this.pKaryawan = new app_officeair_fKaryawan(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>Data Karyawan</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pKaryawan.getClientCanvas().style.top = 5;
				this.pKaryawan.getClientCanvas().style.height = height - 25;
				this.pKaryawan.makeRound(20);
			}		
			this.pKaryawan.show();
			this.pKaryawan.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showDesk: function(){
		try{
			if (this.pDesk === undefined){			
				uses("app_officeair_fDesk");
				var width = this.width - 180;
				var height = this.height-20;
				this.pDesk = new app_officeair_fDesk(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>my Desk</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pDesk.getClientCanvas().style.top = 5;
				this.pDesk.getClientCanvas().style.height = height - 25;
				this.pDesk.makeRound(20);
			}		
			this.pDesk.show();
			this.pDesk.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showDesk: function(){
		try{
			if (this.pDesk === undefined){			
				uses("app_officeair_fDesk");
				var width = this.width - 180;
				var height = this.height-20;
				this.pDesk = new app_officeair_fDesk(this,{bound:[170,10,width,height],caption:"<font color='#ffffff'>my Desk</font>",icon:"image/themes/dynpro/iconpanel.png",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pDesk.getClientCanvas().style.top = 5;
				this.pDesk.getClientCanvas().style.height = height - 25;
				this.pDesk.makeRound(20);
			}		
			this.pDesk.show();
			this.pDesk.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showEmail: function(){
		try{
			if (this.pEmail === undefined){			
				uses("app_officeair_fEmail");
				var width = this.width - 180;
				var height = this.height-20;
				this.pEmail = new app_officeair_fEmail(this,{bound:[170,10,width,height],icon:"image/themes/dynpro/iconpanel.png",caption:"<font color='#ffffff'>Email</font>",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pEmail.getClientCanvas().style.top = 5;
				this.pEmail.getClientCanvas().style.height = height - 25;
				this.pEmail.makeRound(20);
			}		
			this.pEmail.show();
			this.pEmail.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showMemo: function(){
		try{
			if (this.pMemo === undefined){			
				uses("app_officeair_fEmail");
				var width = this.width - 180;
				var height = this.height-20;
				this.pMemo = new app_officeair_fEmail(this,{bound:[170,10,width,height],icon:"image/themes/dynpro/iconpanel.png",caption:"<font color='#ffffff'>Memo</font>",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pMemo.getClientCanvas().style.top = 5;
				this.pMemo.getClientCanvas().style.height = height - 25;
				this.pMemo.makeRound(20);
			}		
			this.pMemo.show();
			this.pMemo.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	showFiling: function(){
		try{
			if (this.pFile == undefined){
				uses("portalui_MenuForm;portalui_PopUpMenu;portalui_MenuItem;portalui_fileExplorer;portalui_listView;app_officeair_fFiling");
				this.pFile = new app_officeair_fFiling(this,{bound:[170,10,this.width - 180, this.height - 20],icon:"image/themes/dynpro/iconpanel.png",caption:"<font color='#ffffff'>rj-Explorer</font>",color:"#072e42",background:"image/themes/dynpro/greygradient.png",titleBg:"#0b5277"});			
				this.pFile.getClientCanvas().style.top = 5;
				this.pFile.getClientCanvas().style.height = this.height - 40;
				this.pFile.makeRound(20);
			}
			this.pFile.show();
			this.pFile.bringToFront();
		}catch(e){
			alert(e);
		}
	}
});

window.app_officeair_fLogin = function (owner,options){
	if (owner) {
		window.app_officeair_fLogin.prototype.parent.constructor.call(this,owner,options);		
		this.setWidth(420);
		this.setHeight(160);				
		this.eUID = new portalui_saiLabelEdit(this,{bound:[10,30,380,20],caption:"<font color='#ffffff'>Email</font>"});
		this.ePWD = new portalui_saiLabelEdit(this,{bound:[10,50,380,20],caption:"<font color='#ffffff'>Password</font>", password:true, keyDown:[this,"doEditKeyDown"]});		
		this.bLogin = new portalui_button(this,{bound:[300,80,80,18],caption:"Login",click:[this,"doClick"],showHint:true,hint:"Klik disini untuk login."});		
		this.bSignUp = new portalui_button(this,{bound:[200,80,80,18],caption:"Daftar",click:[this,"doClick"],showHint:true,hint:"Klik disini untuk langsung sebagai <i>User baru</i> dan <i>Kantor baru.</i>"});
		this.addStyle("border:1px solid #ffffff");
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.eUID.setFocus();
	}
};
window.app_officeair_fLogin.extend(portalui_roundPanel);
window.app_officeair_fLogin.implement({
	doClick: function(sender){
		if (sender == this.bLogin){			
			var data = this.dbLib.getDataProvider("select nama, kode_lokasi from off_user where email = '"+this.eUID.getText()+"' and pwd='"+this.ePWD.getText()+"' ",true);
			if (typeof data != "string"){
				if (data.rs.rows[0] !== undefined){
					window.dataLogin = {email: this.eUID.getText(), office: data.rs.rows[0].kode_lokasi, nama: data.rs.rows[0].nama};
					this.owner.doAfterLogin();				
					this.hide();
				}else system.alert(this,"Email atau Password anda salah","");
			}else systemAPI.alert(data);
		}else{			
			if (this.eUID.getText() == "" || this.ePWD.getText() == ""){
				system.alert(this,"Email atau Password tidak boleh kosong","Isi field email dengan email anda untuk mendaftar.");
				return;
			}
			var data = this.dbLib.getDataProvider("select nama, kode_lokasi from off_user where email = '"+this.eUID.getText()+"' and pwd='"+this.ePWD.getText()+"' ",true);
			if (typeof data != "string"){
				if (data.rs.rows[0] !== undefined){				
					system.alert(this,"Email sudah ada.","Coba dengan email yang lain");
				}else {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into off_user (email, pwd, nama, kode_lokasi)values('"+this.eUID.getText()+"','"+this.ePWD.getText()+"','-','-')");
					this.dbLib.execArraySQL(sql);
				}
			}else systemAPI.alert(data);
		}
	},
	doRequestReady: function (sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						window.dataLogin = {email: this.eUID.getText(), office: "new Office", nama: this.eUID.getText()};
						this.owner.doAfterLogin();				
						this.hide();						
					}else systemAPI.alert(result);	
					break;
			}
		}
	},
	doEditKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13) this.bLogin.click();
	}
});
