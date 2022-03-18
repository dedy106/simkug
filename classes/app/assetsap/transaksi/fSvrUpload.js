//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************

window.app_assetsap_transaksi_fSvrUpload = function(connection)
{
	try
	{
		this.remoteClassName = "server_upload_assetsap_uploadData";
		window.app_assetsap_transaksi_fSvrUpload.prototype.parent .constructor.call(this, connection);
		this.className = "app_assetsap_transaksi_fSvrUpload";
		
	}catch(e){
		alert("[app_assetsap_transaksi_fSvrUpload] :: constructor : " + e);
	}

};
window.app_assetsap_transaksi_fSvrUpload.extend(window.server_RemoteObject);
window.app_assetsap_transaksi_fSvrUpload.implement({
	setFile : function(filename, tmpfile, allData){
		this.params.clear();
		this.params.add(filename);
		this.params.add(tmpfile);		
		this.params.add(allData);		
		this.callAsynch("setFile");		
	},
	uploadAttachment : function(){
		this.params.clear();		
		this.callAsynch("uploadAttachment");		
	},
	getData: function(page){
		this.params.clear();
		this.params.add(page);		
		this.callAsynch("getData");		
	},
	getDataField: function(page, field){
		this.params.clear();
		this.params.add(page);		
		this.params.add(page, field);		
		this.callAsynch("getDataField");		
	},
	upload: function(nobukti, periode, tgl, ket, nmfile, lokasi, user){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);		
		this.params.add(ket);		
		this.params.add(nmfile);		
		this.params.add(lokasi);		
		this.params.add(user);		
		this.callAsynch("upload");		
	},	
	uploadKKIL: function(nobukti, periode, tgl, jenis, lokasi, lokfa,userlog, nik,filename, area, deleteData){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);
		this.params.add(jenis);				
		this.params.add(lokasi);				
		this.params.add(lokfa);					
		this.params.add(userlog);				
		this.params.add(nik);				
		this.params.add(filename);				
		this.params.add(area);				
		this.params.add(deleteData);				
		this.callAsynch("uploadKKIL");		
	},
	uploadKKP: function(nobukti, periode, tgl, jenis, lokasi, lokfa,userlog, nik,filename){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);
		this.params.add(jenis);				
		this.params.add(lokasi);				
		this.params.add(lokfa);					
		this.params.add(userlog);				
		this.params.add(nik);				
		this.params.add(filename);				
		this.callAsynch("uploadKKP");		
	},
	getDataKKIL: function(page){
		this.params.clear();
		this.params.add(page);		
		this.callAsynch("getDataKKIL");		
	},	
	uploadKonversi: function(nobukti, periode, tgl, jns, lokasi,userlog, klp, filename, lokfa, ttd1, ttd2, deleteData){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);
		this.params.add(jns);		
		this.params.add(lokasi);	
		this.params.add(userlog);		
		this.params.add(klp);				
		this.params.add(filename);				
		this.params.add(lokfa);				
		this.params.add(ttd1);				
		this.params.add(ttd2);				
		this.params.add(deleteData);
		this.callAsynch("uploadKonversi");		
	},
	uploadVerifikasi: function(nobukti, periode, tgl, jns, lokasi,userlog, klp, filename,lokfa,ttd1, ttd2, deleteData){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);		
		this.params.add(jns);		
		this.params.add(lokasi);	
		this.params.add(userlog);		
		this.params.add(klp);				
		this.params.add(lokfa);				
		this.params.add(ttd1);
		this.params.add(ttd2);
		this.params.add(deleteData);
		this.callAsynch("uploadVerifikasi");		
	},
	uploadBA: function(nobukti, periode, tgl, jns, lokasi,userlog, klp, filename, lokfa, ttd1, ttd2, deleteData){
		this.params.clear();
		this.params.add(nobukti);		
		this.params.add(periode);		
		this.params.add(tgl);		
		this.params.add(jns);		
		this.params.add(lokasi);	
		this.params.add(userlog);		
		this.params.add(klp);				
		this.params.add(lokfa);				
		this.params.add(ttd1);
		this.params.add(ttd2);
		this.params.add(deleteData);
		this.callAsynch("uploadBA");		
	},
	getDataKonversi: function(page){
		this.params.clear();
		this.params.add(page);		
		this.callAsynch("getDataKonversi");		
	},
	checkBusA: function(busA, jnsproc){
		this.params.clear();
		this.params.add(busA);		
		this.params.add(jnsproc);
		this.callAsynch("checkBusA");		
	},
	downloadRekon: function(jenis, lokfa, periode){
		this.params.clear();
		this.params.add(jenis);		
		this.params.add(lokfa);
		this.params.add(periode);
		return this.getUrl("downloadRekon");		
	}
});
