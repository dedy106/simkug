//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_ajaxCaller = function(address){
	try{
		window.util_ajaxCaller.prototype.parent.constructor.call(this);
		this.className = "ajaxCaller";				
		this.xhr = new XMLHttpRequest();
		this.xhr2 = new XMLHttpRequest();
		this.http = new XMLHttpRequest();
		this.address = address;
		this.response = new server_Response();
		this.ajaxId = window.ajaxNextId;
		window.ajaxNextId++;
		window.ajaxList[this.ajaxId] = this;
		this.sessionId = "";
		this.address = address;
		this.asynchNo = 1;
		this.nextAsynchId = 0;		
		this.frequency = 3000;
		this.asynchQueue = new portalui_arrayList();
		this.availHttp = new portalui_arrayList();
		this.asynchHttp = [];
		this.requestReadyListener = new server_util_arrayList();	
		this.request = new server_Request();
		this.response = new server_Response();	
		this.loop = false;
		this.loopState = false;
		var funcName = "window.util_ajaxCaller" + this.ajaxId;
		var script = funcName + " = function() " +
					 "{" +
						"window.ajaxList[" + this.ajaxId + "].doAsynchReady();" +
					 "}";
		eval(script);
		this.init();
	}catch(e){
		alert("create ajax"+e);
	}
};
window.util_ajaxCaller.extend(window.portalui_XMLAble);
window.util_ajaxCaller.implement({
	init: function(shareObject){
		this.sessionId = this.call("manager", "init");
	},
	synch: function(){
		this.call("manager", "synch");
	},
	addListener: function(listener){
	    if (this.requestReadyListener.indexOf(listener) < 0)
	        this.requestReadyListener.add(listener);
	},
	delListener: function(listener){
		this.requestReadyListener.delObject(listener);
	},	
	setFrequency: function(delay){
		this.frequency = delay;
	},
	setRequester: function(request){
		this.request = request;
	},		
	getRequestObj: function(objId, methodName, params, callbackObj){
		var request = new server_Request();
	    request.clear();
	    request.setObjectId(objId);
	    request.setSessionId(this.sessionId);
	    request.setMethodName(methodName);
	    request.setParams(params);		   
	    request.callbackObj = callbackObj; 
		return request;
	},
	call: function(objId, methodName, params){				
		try{
			showProgress();
			showStatus("Request..."+methodName);
		    this.request.clear();
		    this.request.setObjectId(objId);
		    this.request.setSessionId(this.sessionId);
		    this.request.setMethodName(methodName);
		    this.request.setParams(params);
		    var retXML = this.doCall();			
			hideProgress();
			hideStatus();
			if ((retXML != undefined) && (retXML != ""))
		    {
		        try
		        {
		            this.response.fromXML(retXML);
		        }
		        catch (e)
		        {					
		            return "Error Response:Unable to parse server response : " + retXML  + " ("+methodName+") --> ";
		        }
		        switch (this.response.getCode())
		        {
		            case 0 : // OK
		                    return this.response.getValue();
		                    break;
		            case 1 : // server exception
		                    throw(this.response.getValue());//throw
		                    break;
		            default :
		                    throw "Unknown response code : " + this.response.getCode();	                    
							break;
		        }
		    }
		    else
		        throw "Invalid server response : " + retXML  + " ("+methodName + ":" + objId + ")";
		}catch(e){					
		    if (e != undefined && typeof e == "string" && e.search("object") > 0)
                system.alert(this,e,"");		
		    else if (e == "Undefined method !")
		        system.alert(this,"Fungsi ."+methodName+" tidak ditemukan. Hubungi administrator!!!");		  
            else if (systemAPI != undefined)
				system.alert(this,"#No Response =>"+ e + "<br>"+retXML,"Coba beberapa menit lagi atau Refresh halaman ini");		
			else alert(this+"#No Response "+ e + " // \r\n"+retXML+"\r\nRefresh halaman ini");		
		}
		
	},	
	doCall: function(){		
	    if (this.http != undefined)
	    {
			try{				
				var params = "request="+this.urlencode(this.request.encode());
		        this.http.open("POST", this.address, false);
				this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		        this.http.send(params);				
		        if (this.http.status == 200)
		            return this.http.responseText;
		        else return "Error : "+ this.http.readyState+":"+ this.http.statusText;
		        
			}catch(e){
				return "Error : " + e;
			}
	    }
	},
	callAsynch: function(){						   
		this.xhr = new XMLHttpRequest();
		var params = "request="+this.urlencode(this.request.encode());
		this.xhr.open("POST", this.address, true);
		var script = "this.xhr.onreadystatechange = window.util_ajaxCaller" + this.ajaxId;
	    eval(script);
		this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		this.xhr.send(params);
	},
	doAsynchReady: function(){
		try{			
			if (this.xhr != undefined)
			{						
				if (this.xhr.readyState == 4){
					//if (showStatus)showStatus("Done.....");
					setTimeout("window.ajaxList["+this.ajaxId+"].doRequestReady();", 1);
					//if (hideStatus)hideStatus("Done.....");
				}else if (this.xhr.readyState == 3){										
					//if (showStatus)showStatus("Transferring data....."+this.request.getMethodName());
				}else if (this.xhr.readyState == 2){					
					//if (showStatus)showStatus("Connected..."+this.request.getMethodName());
				}else if (this.xhr.readyState == 1){					
					//if (showStatus)showStatus("Connecting..."+this.request.getMethodName());
				}else {
					//if (showStatus)showStatus("Connecting...."+this.request.getMethodName());
				}
			}
		}catch(e){
			systemAPI.alert(this+"#doAsynch//"+e);
		}
	},
	doRequestReady: function(){
	    var obj, errCode = this.xhr.status;
	    if (this.xhr.status == 200){			
			var result,retXML = this.xhr.responseText;
			this.response.clear();			
			if ((retXML != undefined) && (retXML != "")){
				try
				{
					this.response.fromXML(retXML);
				}
				catch (e)
				{
					this.response.setCode(1);
					result ="Unable to parse server response : " + retXML;
					errCode = 100;
				}
				switch (this.response.getCode())
				{
					case 0 : // OK
							result = this.response.getValue();
							break;
					case 1 : // server exception
							result = this.response.getValue();
							errCode = 101;
							break;
					default :
							result ="Unknown response code :"+this.request.getMethodName()+"<br>" + this.response.getCode();
							errCode = 102;
							break;
				}
			}else{
				result = "Invalid server response : "+this.request.getMethodName()+":"+this.xhr.statusText+"<br>" + retXML;
				this.response.setCode(1);
				errCode = 100;
			}
		}else{
			result = "Invalid server response";
			this.response.setCode(1);			
		}							
		hideStatus();		       		
		
	    for (var i in this.requestReadyListener.objList){
	        obj = this.requestReadyListener.objList[i];
	        try{				
	           obj.doRequestReady(this.request.callbackObj, this.request.getMethodName(), result, errCode, this,{status:this.xhr.status, message:this.xhr.statusText} );
	        }
	        catch (e){
	        }
	    }	    
	    if (this.loop && errCode != 100) {			
			//clearTimeout(this.frequency);
			//setTimeout("window.ajaxList["+this.ajaxId+"].callAsynch()", this.frequency);			
		}
	},
	getObjectId: function(){
		return this.objectId;
	},
	getProperty: function(){
		return this.property;
	},
	setProperty: function(name, value){
		this.property[name] = value;
	},
	disconnect: function(){
		this.loop = false;
	},
	enableLoop: function(enable){
		this.loop = enable;
	},
	connect : function(loop){
		this.loop = loop == undefined ? true : loop;
		if (this.request) this.callAsynch();
	}
});
window.ajaxList = [];
window.ajaxNextId = 0;
