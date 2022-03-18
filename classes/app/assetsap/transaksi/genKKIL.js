//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.app_assetsap_transaksi_genKKIL = function(connection)
{
	try
	{
		this.remoteClassName = "server_process_amu_genKKIL";
		window.app_assetsap_transaksi_genKKIL.prototype.parent.constructor.call(this, connection);
		this.className = "app_assetsap_transaksi_genKKIL";
		
	}catch(e){
		alert("[app_assetsap_transaksi_genKKIL] :: constructor : " + e);
	}

};
window.app_assetsap_transaksi_genKKIL.extend(window.server_RemoteObject);
window.app_assetsap_transaksi_genKKIL.implement({
	createXls: function(lokfa){
		this.params.clear();
		this.params.add(lokfa);
		this.callAsynch("createXls");
	},
	createPdf: function(src, dst){
		this.params.clear();
		this.params.add(src);
		this.params.add(dst);
		this.callAsynch("createPdf");
	},
	updatePlant: function(){
		this.params.clear();		
		this.callAsynch("updatePlant");
	},
	updateLocation: function(){
		this.params.clear();		
		this.callAsynch("updateLocation");
	},
	updateAlamat: function(){
		this.params.clear();		
		this.callAsynch("updateAlamat");
	},
	createData: function(nobukti, lokasi, lokfa, tgl, periode){
		this.params.clear();
		this.params.add(nobukti);
		this.params.add(lokasi);
		this.params.add(lokfa);
		this.params.add(tgl);
		this.params.add(periode);
		this.callAsynch("createData");
	}
});
