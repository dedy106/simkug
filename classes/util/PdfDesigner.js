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
window.util_PdfDesigner = function(connection, filename){
	try{
		this.remoteClassName = "server_util_PdfDesigner";
		window.util_PdfDesigner.prototype.parent.constructor.call(this, connection,filename);
		this.className = "util_PdfDesigner";
		this.filename = filename;
	}catch(e){
		systemAPI.alert("[util_PdfDesigner]::constructor:" + e);
	}
};
window.util_PdfDesigner.extend(window.server_RemoteObject);
window.util_PdfDesigner.implement({	
	generate: function(dataProvider, config){		
		this.params.clear();		
		this.params.add(dataProvider);
		this.params.add(config);
		return this.getRequestObj("generate");
	},	
	setReportConfig: function(config){		
		this.params.clear();		
		this.params.add(config);
		this.callAsynch("setReportConfig");
	}
	
});
