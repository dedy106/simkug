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
window.app_inv_remote_dataProvider = function(config){
	try{
		this.remoteClassName = "server_app_inv_dataProvider";
		window.app_inv_remote_dataProvider.prototype.parent.constructor.call(this, undefined,config);
		this.className = "app_inv_remote_dataProvider";		
	}catch(e){
		systemAPI.alert("[app_inv_remote_dataProvider]::constructor:" + e);
	}
};
window.app_inv_remote_dataProvider.extend(window.server_ShareObject);
window.app_inv_remote_dataProvider.implement({	
	getInfo: function(lokasi, info){		
		this.params.clear();
		this.params.add(lokasi);			
		this.params.add(info);
		return this.getRequestObj("alert");
	}	
});
