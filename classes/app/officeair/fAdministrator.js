//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_officeair_fAdministrator = function(owner,options)
{
	if (owner)
	{	
		try
		{
			window.app_officeair_fAdministrator.prototype.parent.constructor.call(this, owner,options);			
			this.className  = "fAdministrator";
			this.formCaption = "Stream Monitoring ";			
			this.addStyle("border:2px solid #ffffff");
			var width = this.width;
			var height = this.height;						
			this.fVideo = new portalui_flashObj(this,{bound:[10,50,this.width - 20,this.height - 135],flashFile:"classes/app/officeair/swf/roojaxConf.swf",resourceOwner:this.resourceId,
				params:{uri:"rtmp://roojax.com:9135/flex2FMSExplorer",room:"roojaxjamboo",office:"roojax",userName:"roojax"}});
			this.bevel = new portalui_bevel(this,{bound:[10,this.height - 85,180,50]});			
			this.bVidConnect = new portalui_button(this,{bound:[15,this.height - 65,80,18],caption:"Connect",click:[this,"doClick"]});
			this.bRoomList = new portalui_button(this,{bound:[105,this.height - 65,80,18],caption:"Room List",click:[this,"showRoom"]});
			this.eLogVideo = new portalui_control(this,{bound:[10,50,this.width - 20,this.height - 155],visible:false});
			this.eLogVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;opacity:0.3;filter:alpha(opacity=30);moz-opacity:0.3;color:#ff0000");			
			this.eLogVideo.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
			this.eUserVideo = new portalui_control(this,{bound:[this.width - 250,this.height - 225,220,130],visible:false});
			this.eUserVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;color:#0000ff");			
			this.eUserVideo.getCanvas().innerHTML = "<span style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
			this.eVideoChat = new portalui_control(this,{bound:[100,100,this.width - 200,this.height - 150],visible:false});
			this.eVideoChat.addStyle("border:1px solid #ff9900;");			
			this.eVideoChat.getCanvas().ondblclick= function(){
				this.style.display = "none";
			};
			this.eVideoChat.getCanvas().innerHTML = "<div style='position:absolute;width:100%;height:100%;overflow:auto'><span style='width:100%;color:#ffffff;height:auto;top:0;left:0;position:absolute;opacity:1;filter:alpha(opacity=100);moz-opacity:1;z-index:1'></span></div>"+
				"<div style='background:#333333;opacity:0.3;filter:alpha(opacity=30);moz-opacity:0.3;position:absolute;width:100%;height:100%;top:0;left:0;z-index:0'></div>";				
			this.eVideo = new portalui_saiEdit(this,{bound:[210,this.height - 65,this.width - 340,20],text:"",keyDown:[this,"doEditKeyDown"]});
			this.bVidSend = new portalui_button(this,{bound:[this.width - 110,this.height - 65,80,18],caption:"Send",enable:false,click:[this,"doClick"]});
			this.bUserList = new portalui_imageButton(this,{bound:[this.width - 50,this.height - 90,16,16],image:"icon/dynpro/user.png",click:[this,"doClick"],hint:"User List"});
			this.bShowLog = new portalui_imageButton(this,{bound:[this.width - 70,this.height - 90,16,16],image:"icon/dynpro/log.png",click:[this,"doClick"],hint:"App Log"});
			this.bShowChat = new portalui_imageButton(this,{bound:[this.width - 90,this.height - 90,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doClick"],hint:"Show Chat"});
			this.bDisconnectClient = new portalui_imageButton(this,{bound:[this.width - 110,this.height - 90,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doClick"],hint:"Disconnect Client"});
			
			this.eRoomVideo = new portalui_control(this,{bound:[105,this.height - 60,220,20],visible:false});
			this.eRoomVideo.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;color:#0000ff");			
			this.eRoomVideo.getCanvas().innerHTML = "<span style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
			uses("portalui_PopUpMenu;portalui_MenuItem");
			this.popRoom = new portalui_PopUpMenu(this);			
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 85,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_officeair_fAdministrator.extend(window.portalui_roundPanel);
window.app_officeair_fAdministrator.implement({				
	doEditKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13) this.bVidSend.click();
	},
	doChat: function(){
		try{
			if (this.pChat === undefined){
				var width = this.width;
				var height = this.height;
				this.pChat = new portalui_panel(this,{bound:[120,10,width,height],caption:"Chat Message",visible:false});						
				this.eMsgArea = new portalui_control(this.pChat,{bound:[10,30,this.pChat.width - 240,this.pChat.height - 70]});
				this.eMsgArea.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;");
				this.eMsgArea.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eLogMsg = new portalui_control(this.pChat,{bound:[10,30,this.pChat.width - 240,this.pChat.height - 70]});
				this.eLogMsg.addStyle("border:1px solid #999999;background:#ffffff;overflow:hidden;opacity:0.1;filter:alpha(opacity=10);moz-opacity:0.1;color:#ff0000");			
				this.eLogMsg.getCanvas().innerHTML = "<span id='"+this.resourceId+"_msg' style='width:100%;height:auto;top:0;left:0;position:absolute'></span>";
				this.eUserList = new portalui_control(this.pChat,{bound:[this.pChat.width - 220,70,200,this.pChat.height - 150]});
				this.eUserList.addStyle("border:1px solid #999999;background:#ffffff;overflow:auto;");
				this.eMsg = new portalui_saiEdit(this.pChat,{bound:[10,this.pChat.height - 30,this.pChat.width - 140,20], keyDown:[this,"doMsgKeyDown"]});			
				this.bConnect = new portalui_button(this.pChat,{bound:[this.pChat.width - 220,30,80,20], caption:"Connect",click:[this,"doClick"]});
				this.bSend = new portalui_button(this.pChat,{bound:[this.pChat.width - 120,this.pChat.height - 30,80,20], caption:"Send",click:[this,"doClick"]});
				this.flashObj = new portalui_flashObj(this.pChat,{bound:[10,30,200,500],flashFile:"classes/app/officeair/swf/roojaxRTMP.swf",resourceOwner:this.resourceId,
					params:{username:window.dataLogin.email,office:window.dataLogin.office,uri:"roojax.com:9135/chat_test"}});			
			}else this.pChat.show();
			this.pChat.bringToFront();			
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){		
		try{
			if (sender == this.bConnect)
				if (sender.caption == "Connect")
					this.flashObj.getObject().connect("roojaxer","roojax.com:9135/chat_test","Connect");
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
					this.fVideo.getObject().connect("rtmp://roojax.com:9135/flex2FMSExplorer","roojaxer");
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
			}else if (sender == this.bDisconnectClient){				
				if (this.selectedRoom !== undefined && this.selectedOffice !== undefined){						
					this.fVideo.getObject().disconnectRoom(this.selectedRoom,this.selectedOffice);
					this.selectedRoom = undefined;
					this.selectedOffice = undefined;
				}
			}else if (sender == this.bClose || sender == this.bMin){
				this.setHeight(0);
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
		}catch(e){
			alert(e);
		}
	},
	setButtonState:function(sender, connState){		
		if (connState){
			this.bVidConnect.setCaption("Disconnect");
			this.bVidSend.setEnabled(true);			
			this.bVidRoom.setEnabled(false);
			this.bRoomList.setEnabled(true);			
		}else{
			this.bVidConnect.setCaption("Connect");
			this.bVidSend.setEnabled(false);			
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
			var room = new portalui_arrayMap();
			for (var i in allUserList){
				if (room.get(allUserList[i].office) === undefined) {
					var officeRoom = new portalui_arrayList();
					officeRoom.add(allUserList[i].room);
					room.set(allUserList[i].office, officeRoom);
				}else{
					var officeRoom = room.get(allUserList[i].office);
					officeRoom.add(allUserList[i].room);
					room.set(allUserList[i].office, officeRoom);
				}
				this.eUserVideo.getCanvas().firstChild.innerHTML += "<span onmouseover='this.style.background=\"#ff9900\";' onmouseout='this.style.background=\"\";'  onclick='system.getResource("+this.resourceId+").doUserSelect(\""+allUserList[i].id+"\");' style='width:100%;height:16;display:block;cursor:pointer'>"+allUserList[i].userName +"</span>";			
				h+= 18;
			}		
			if (h < 500) {			
				this.eUserVideo.setHeight(h);
				this.eUserVideo.setTop(this.height - 70- h);
			}
			this.eUserVideo.getCanvas().scrollTop = this.eUserVideo.getCanvas().firstChild.offsetHeight;			
			var mnuItem, officeRoom;
			this.popRoom.clearChild();
			if (this.popRoom.menuForm !== undefined)
				this.popRoom.menuForm.getClientCanvas().innerHTML = "";
			for (var i in room.objList){				
				mnuItem = new portalui_MenuItem(this.popRoom,i);
				officeRoom = room.get(i);
				for (var r in officeRoom.objList){
					mnuItem2 = new portalui_MenuItem(mnuItem,officeRoom.get(r));
					mnuItem2.onClick.set(this,"doItemsClick");
				}
			}
			/*
			this.eRoomVideo.getCanvas().firstChild.innerHTML = "";
			var h = 0;
			for (var i in room){
				this.eRoomVideo.getCanvas().firstChild.innerHTML += "<span onmouseover='this.style.background=\"#ff9900\";' onmouseout='this.style.background=\"\";'  onclick='system.getResource("+this.resourceId+").doRoomSelect(\""+i+"\");' style='width:100%;height:16;white-space:nowarp;display:block;cursor:pointer'>"+i +"</span>";			
				h+= 18;
			}		
			if (h < 500) {			
				this.eRoomVideo.setHeight(h);
				this.eRoomVideo.setTop(this.height - 45- h);
			}
			this.eRoomVideo.getCanvas().scrollTop = this.eRoomVideo.getCanvas().firstChild.offsetHeight;
			*/
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			if (sender == this.mail){
				switch(methodName){
					case "inbox" :								
						if (result instanceof portalui_arrayMap){
							var line = undefined, tr = undefined, c1, c2, c3;
							var inboxCont = $(this.getFullId()+"_inboxCont");
							inboxCont.tBodies[0].innerHTML = "";
							for (var i in result.objList){
								line = result.get(i);														
								if (line instanceof portalui_arrayMap){										
									tr = document.createElement("tr");
									tr.bgColor = ( i % 2 == 0 ? "#ffffff" : "#cccccc");
									tr.style.cssText = "height:20px;white-space:nowarp";
									c1 = document.createElement("td");
									c1.innerHTML = "<input type='checkbox'/>"; 
									c1.style.cssText = "height:20px;white-space:nowarp";
									c2 = document.createElement("td");
									c2.innerHTML = line.get("From"); 
									c2.style.cssText = "height:20px;white-space:nowarp";
									c3 = document.createElement("td");
									c3.innerHTML = line.get("Subject"); 
									c3.style.cssText = "height:20px;white-space:nowarp";
									tr.appendChild(c1);tr.appendChild(c2);tr.appendChild(c3);
									inboxCont.tBodies[0].appendChild(tr);
								}							
							}
						}else systemAPI.alert(result);
					break;
				}
			}
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
	updateRoomList: function(room){				
	},
	doUserSelect:function(userId){
		this.selectedUser = userId;
	},
	showRoom: function(sender){
		//this.eRoomVideo.setVisible(!this.eRoomVideo.visible);		
		this.popRoom.popUp(220,this.height - 25 - this.popRoom.menuForm.height);		
	},
	doRoomSelect: function(room){
		this.selectedRoom = room;
		this.fVideo.getObject().changeRoom(room);
	},
	doItemsClick: function(sender){
		this.selectedRoom = sender.getCaption();
		this.selectedOffice = sender.owner.getCaption();
		this.fVideo.getObject().changeRoom(this.selectedOffice,this.selectedRoom);
	}
});