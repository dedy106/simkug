//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_ajaxPush = function(address){
	try{
		window.util_ajaxPush.prototype.parent.constructor.call(this);
		this.className = "ajaxPush";				
		this.xhr = new XMLHttpRequest();
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
		this.loop = false;
		this.request = undefined;
		this.context = undefined;
		this.loopState = false;
		var funcName = "window.util_ajaxPush" + this.ajaxId;
		var script = funcName + " = function() " +
					 "{" +
						"window.ajaxList[" + this.ajaxId + "].doAsynchReady();" +
					 "}";
		eval(script);
	}catch(e){
		alert("create ajax"+e);
	}
};
window.util_ajaxPush.extend(window.portalui_XMLAble);
window.util_ajaxPush.implement({
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
	setInterval: function(delay){
		this.frequency = delay;
	},
	setRequester: function(request){
		this.request = request;
	},		
	setContext: function(context){
		this.context = context;
	},
	callAsynch: function(){						   
		this.xhr = new XMLHttpRequest();
		this.xhr.multipart = true;
		if (this.request)
			var params = "request="+this.urlencode(this.request.encode());
		this.xhr.open("POST", this.address, true);
		var script = "this.xhr.onreadystatechange = window.util_ajaxPush" + this.ajaxId;
	    eval(script);
		this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		if (this.request)
			this.xhr.send(params);
		else this.xhr.send();
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
				result = retXML;
				/*try
				{
					this.response.fromXML(retXML);
				}
				catch (e)
				{
					this.response.setCode(1);
					result ="Unable to parse server response : " + retXML;
					errCode = 100;
				}*/
				/*switch (this.response.getCode())
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
				}*/
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
	        	if (this.request)
	           		obj.doRequestReady(this.request.callbackObj, this.request.getMethodName(), result, errCode, this);
	           	else obj.doRequestReady(this.context, undefined, result, errCode, this);
	        }
	        catch (e){
	        }
	    }	    
	    if (this.loop && errCode != 100) {			
			//clearTimeout(this.frequency);
			setTimeout("window.ajaxList["+this.ajaxId+"].callAsynch()", this.frequency);			
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
		if (this.address != '') this.callAsynch();
	}
});
window.ajaxList = [];
window.ajaxNextId = 0;
