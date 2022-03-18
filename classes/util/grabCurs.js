//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_grabCurs = function(connection){
	try{
		this.remoteClassName = "server_util_grabCurs";
		window.util_grabCurs.prototype.parent.constructor.call(this, connection);
		this.className = "util_grabCurs";		
	}catch(e){
		alert("[util_grabCurs]::constructor:" + e);
	}
};
window.util_grabCurs.extend(window.server_RemoteObject);
window.util_grabCurs.prototype.getCurs = function(fromCurs, toCurs)
{
	this.params.clear();
	this.params.add(fromCurs);
	this.params.add(toCurs);
	return this.call("getCurs");
};