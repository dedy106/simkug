//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_serverVariable = function(connection){
	try{
		this.remoteClassName = "server_util_serverVariable";
		window.util_serverVariable.prototype.parent.constructor.call(this, connection);
		this.className = "util_serverVariable";
	}catch(e){
		alert("[util_serverVariable]::constructor:" + e);
	}
};
window.util_serverVariable.extend(window.server_RemoteObject);
window.util_serverVariable.prototype.getAllVariable = function(){
	this.params.clear();	
	return this.call("getAllVariable");
};