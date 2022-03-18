//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_socketio = function(address){
	try{
		window.util_socketio.prototype.parent.constructor.call(this);
		this.className = "socketio";				
		this.socket = {};
		this.address = address;
		this.onMessage = new eventHandler();
		this.onReady = new eventHandler();
		this.onDisconnect = new eventHandler();
		this.socketId = window.socketNextId;
		window.socketNextId++;
		window.socketList[this.socketId] = this;
		var funcName = "window.util_socketmsg" + this.socketId;
		var script = funcName + " = function(data) " +
					 "{" +
						"window.socketList[" + this.socketId + "].doMessageReady(data);" +
					 "}";
		eval(script);
		var funcName = "window.util_socketready" + this.socketId;
		var script = funcName + " = function(data) " +
					 "{" +
						"window.socketList[" + this.socketId + "].doReady(data);" +
					 "}";
		eval(script);
		var funcName = "window.util_socketdisconnect" + this.socketId;
		var script = funcName + " = function(data) " +
					 "{" +
						"window.socketList[" + this.socketId + "].doDisconnectMsg(data);" +
					 "}";
		eval(script);
	}catch(e){
		alert("create socket"+e);
	}
};
window.util_socketio.extend(window.portalui_XMLAble);
window.util_socketio.implement({
	connect: function(server, lokasi, periode){
		this.socket = io.connect(this.address);
		this.server = server;
		//eval('this.socket.on("'+server+'_message", window.util_socketmsg'+ this.socketId +');');
		//eval('this.socket.on("'+server+'_ready", window.util_socketready'+ this.socketId +');');
		//eval('this.socket.on("disconnect", window.util_socketdisconnect'+ this.socketId +');');
		eval('this.socket.on("message", window.util_socketmsg'+ this.socketId +');');
		eval('this.socket.on("ready", window.util_socketready'+ this.socketId +');');
		eval('this.socket.on("disconnect", window.util_socketdisconnect'+ this.socketId +');');
		//this.socket.emit("connect_to", server);
		this.socket.emit("set nickname",{nama: system.getActiveApplication()._userLog, server: this.server, lokasi:lokasi, periode:periode });
	},
	disconnect: function(){
		this.socket.disconnect();
	},
	doMessageReady: function(data){
		this.onMessage.call(this, data);
	},
	doDisconnectMsg: function(data){
		this.onDisconnect.call(this, data);
	},
	doReady: function(data){
		this.onReady.call(this, data);
	},
	sendMessage: function(data){
		this.socket.emit("sendmessage", data);
		
	}
});
window.socketList = [];
window.socketNextId = 0;
