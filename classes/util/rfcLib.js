//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//*	fikrs :Fund Management Area
//*	kokrs :Controlling Area
//* wrttp: value type (actual cost, plan, release)
//* ver : 0 : payment, 7: commitment
//***********************************************************************************************
window.util_rfcLib = function(filename){
	try{
		this.remoteClassName = "server_util_rfcLib";
		if (filename == undefined) filename = system.getActiveApplication()._rfcSetting;
		window.util_rfcLib.prototype.parent.constructor.call(this, undefined,filename);		
		this.className = "util_rfcLib";
		this.filename = filename;
	}catch(e){
		systemAPI.alert("[util_rfcLib]::constructor:" + e);
	}
};
window.util_rfcLib.extend(window.server_RemoteObject);
window.util_rfcLib.implement({	
	callRFC: function(login, sapFunc, sapImp, sapExpTable, sapImpTable, sapExp, closeRfc){
		this.params.clear();
		this.params.add(login);
		this.params.add(sapFunc);
		this.params.add(sapImp);
		this.params.add(sapExpTable);
		this.params.add(sapImpTable);
		this.params.add(sapExp);
		this.params.add(closeRfc);
		this.callAsynch("callRFC");
	},
	callRFCSynch : function(login, sapFunc, sapImp, sapExpTable, sapImpTable, sapExp, closeRfc){
		this.params.clear();
		this.params.add(login);
		this.params.add(sapFunc);
		this.params.add(sapImp);
		this.params.add(sapExpTable);
		this.params.add(sapImpTable);
		this.params.add(sapExp);
		this.params.add(closeRfc);
		return this.call("callRFC");
	},
	callRFCBuffer : function(login, sapFunc, sapImp, sapTable, sapExp, closeRfc, bufferKey, table, fields, dbsetting, rfcFields){
		this.params.clear();
		this.params.add(login);
		this.params.add(sapFunc);
		this.params.add(sapImp);
		this.params.add(sapTable);		
		this.params.add(sapExp);
		this.params.add(closeRfc);
		this.params.add(bufferKey);
		this.params.add(table);
		this.params.add(fields);
		this.params.add(dbsetting);
		this.params.add(rfcFields);		
		this.callAsynch("callRFCBuffer");
	},
});
