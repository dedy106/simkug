//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_keyManager = function(connection,options){
	try{	
		this.remoteClassName = "server_util_keyManager";
		window.util_keyManager.prototype.parent.constructor.call(this, connection,options);
		this.className = "util_keyManager";
		this.requester = undefined;	
	}catch(e){
		alert("[util_keyManager] :: constructor : " + e);
	}
};
window.util_keyManager.extend(window.server_RemoteObject);
window.util_keyManager.implement({
	setKey: function(data){
		this.params.clear();
		this.params.add(data);
		return this.call("setKey");
	},
	getKey: function(user){
		this.params.clear();
		this.params.add(user);
		return this.call("getKey");
	},
	getKeyA: function(data){
		this.params.clear();
		this.params.add(data);
		this.callAsynch("getKey");
	},
	setContent: function(data){
		this.params.clear();
		this.params.add(data);
		return this.call("setContent");
	},
	setContentA:function(data){
		this.params.clear();
		this.params.add(data);
		this.callAsynch("setContent");
	},
	getContent: function(data){
		this.params.clear();	
		return this.call("getContent");
	},
	getContentA:function(){
		this.params.clear();		
		this.callAsynch("getContent");
	}
});
