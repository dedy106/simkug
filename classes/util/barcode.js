//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_barcode = function(connection, filename){
	try{
		this.remoteClassName = "server_util_barcode";
		window.util_barcode.prototype.parent.constructor.call(this, connection,filename);
		this.className = "util_barcode";
		this.filename = filename;
	}catch(e){
		systemAPI.alert("[util_barcode]::constructor:" + e);
	}
};
window.util_barcode.extend(window.server_RemoteObject);
window.util_barcode.implement({
	getType : function(){
	   try{
			this.params.clear();	
			return this.call("getType");
		}catch(e){
		}
    },
    getTypeA : function(){
	   try{
			this.params.clear();			
			this.callAsynch("getType");
		}catch(e){
		}
    },
    getBarcode: function(type, text, output,thicknes,res,font,a1, a2){
        this.params.clear();	
        this.params.add(type);	
        this.params.add(text);	
        this.params.add(output);	
        this.params.add(thicknes);	
        this.params.add(res);	
        this.params.add(font);	
        this.params.add(a1);	
        this.params.add(a2);	
		return this.call("getBarcode");    
    },
    getBarcodeA: function(type, text, output,thicknes,res,font,a1, a2){
        this.params.clear();	
        this.params.add(type);	
        this.params.add(text);	
        this.params.add(output);	
        this.params.add(thicknes);	
        this.params.add(res);	
        this.params.add(font);	
        this.params.add(a1);	
        this.params.add(a2);	
		this.callAsynch("getBarcode");    
    }
});
