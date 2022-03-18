//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.app_budget_svrProcess = function(connection)
{
	try
	{
		this.remoteClassName = "server_process_budget_susutbpp";
		window.app_budget_svrProcess.prototype.parent.constructor.call(this, connection);
		this.className = "app_budget_svrProcess";
		
	}catch(e){
		alert("[app_budget_svrProcess] :: constructor : " + e);
	}

};
window.app_budget_svrProcess.extend(window.server_RemoteObject);
window.app_budget_svrProcess.implement({
	saveData : function(no_bukti, lokasi, tgl, tahun,periode,user){
		this.params.clear();
		this.params.add(no_bukti);
		this.params.add(lokasi);		
		this.params.add(tgl);		
		this.params.add(tahun);		
		this.params.add(periode);		
		this.params.add(user);		
		this.callAsynch("saveData");		
	}
});
