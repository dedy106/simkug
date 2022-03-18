//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("server_simpleRemoteObject");
window.util_serverControl = function(connection,options){
	try{					
		window.util_serverControl.prototype.parent.constructor.call(this, connection,options);		
		this.remoteClassName = "server_control_saiDataGrid";
		this.className = "util_serverControl";
		this.requester = undefined;				
		this.session = this.call("init");		
	}catch(e){
		alert("[util_serverControl] :: constructor : " + e);
	}
};
window.util_serverControl.extend(window.server_simpleRemoteObject);
window.util_serverControl.implement({
	setLinkCtrl: function(resource, ctrlId, colWidth){
		colWidth = colWidth.getLength() <= 1 ? colWidth.objList.toString()+"<array>":colWidth.objList.toString().replace(/,/gi,"<array>");		
		this.params = urlencode(resource)+"#"+ctrlId+"#"+colWidth;
		this.callAsynch("setLinkCtrl");
	},	
	setSQL: function(sql, page, rowPerPage){
		this.params = urlencode(sql)+"#"+page+"#"+rowPerPage;
		this.callAsynch("setSQL");		
	},
	getControl: function(){
		return this.getUrl("getControl");
	}	
});
