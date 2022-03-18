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
uses("server_ShareObject");
window.app_rra_remote_dataProvider = function(connection,config){
	try{
		this.remoteClassName = "server_app_rra_dataProvider";
		window.app_rra_remote_dataProvider.prototype.parent.constructor.call(this, connection,config);
		this.className = "app_rra_remote_dataProvider";		
	}catch(e){
		systemAPI.alert("[app_rra_remote_dataProvider]::constructor:" + e);
	}
};
window.app_rra_remote_dataProvider.extend(window.server_ShareObject);
window.app_rra_remote_dataProvider.implement({	
	getInfo: function(lokasi, info, filter){		
		this.params.clear();
		this.params.add(lokasi);			
		this.params.add(info);
		this.params.add(filter);			
		return this.getRequestObj("alert");
	},
	getMsg: function(user,lokasi){		
		this.params.clear();
		this.params.add(user);					
		this.params.add(lokasi);					
		return this.getRequestObj("getMsg");
	}	
});
