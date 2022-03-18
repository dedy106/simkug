//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_subversion = function(connection){
	try{
		this.remoteClassName = "server_util_subversion";
		window.util_subversion.prototype.parent.constructor.call(this, connection);
		this.className = "util_subversion";
	}catch(e){
		systemAPI.alert("[util_subversion]::constructor:" + e);
	}
};
window.util_subversion.extend(window.server_RemoteObject);
window.util_subversion.implement({
	setPath: function(path){
		this.params.clear();
		this.params.add(path);
		this.call("setPath");
	},
	setUser: function(user, pwd){
		this.params.clear();
		this.params.add(user);
		this.params.add(pwd);
		this.call("setUser");
	},
	setSvnPath: function(path){
		this.params.clear();
		this.params.add(path);
		this.call("setSvnPath");
	},
	checkout: function (path, revnumber){
		this.params.clear();
		this.params.add(path);
		this.params.add(revnumber);
		this.callAsynch("checkout");
	},
	commit: function(msg){
		this.params.clear();
		this.params.add(msg);
		this.callAsynch("commit");
	},
	update: function(){
		this.params.clear();
		this.callAsynch("commit");
	},	
	info: function(){
		this.params.clear();
		this.callAsynch("info");
	},
	status: function(path, recursive){
		this.params.clear();
		this.params.add(path);
		this.params.add(recursive);
		return this.call("status");
	},
	statusA: function(path, recursive){
		this.params.clear();
		this.params.add(path);
		this.params.add(recursive);
		this.callAsynch("status");
	},
	help: function(syntax){
		this.params.clear();
		this.params.add(syntax);
		return this.call("help");
	},
	log: function(path){
		this.params.clear();
		this.params.add(path);
		return this.call("log");
	},
	add: function (files){
		this.params.clear();
		this.params.add(files);
		return this.call("add");
	}
});