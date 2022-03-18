//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.app_assetsap_transaksi_genAlternatif = function(connection)
{
	try
	{
		this.remoteClassName = "server_process_amu_genAlternatif";
		window.app_assetsap_transaksi_genAlternatif.prototype.parent.constructor.call(this, connection);
		this.className = "app_assetsap_transaksi_genAlternatif";
		
	}catch(e){
		alert("[app_assetsap_transaksi_genAlternatif] :: constructor : " + e);
	}

};
window.app_assetsap_transaksi_genAlternatif.extend(window.server_RemoteObject);
window.app_assetsap_transaksi_genAlternatif.implement({
	createXls: function(prosedur,lokfa){
		this.params.clear();
		this.params.add(prosedur);		
		this.params.add(lokfa);		
		this.callAsynch("createXls");
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
