//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_Connection = function(address, autoInit){
	try{
		window.util_Connection.prototype.parent.constructor.call(this);
		this.className = "util_Connection";	
		this.connId = window.ConnectionNextId;
		window.ConnectionNextId++;
		window.ConnectionList[this.connId] = this;
		this.sessionId = "";
		this.address = address;
		this.asynchNo = 1;
		this.nextAsynchId = 0;		
		this.asynchQueue = new portalui_arrayList();
		this.availHttp = new portalui_arrayList();
		this.asynchHttp = [];
		this.request = new server_Request();
		this.response = new server_Response();	
		this.edate = new Date("2009/01/28");	
			
		this.http = new XMLHttpRequest();	
		if (!systemAPI.browser.msie){
			try
			{
				this.http.overrideMimeType("text/xml");			
			}
			catch (e)
			{}
		}
		if ((autoInit == undefined) || autoInit)
			this.init();
	}catch(e){
		system.alert(this,"#constructor//",e);
	}
};
window.util_Connection.extend(window.portalui_XMLAble);
window.util_Connection.implement({
	init: function(){
		this.sessionId = this.call("manager", "init");
	},
	synch: function(){
		this.call("manager", "synch");
	},
	getUrl: function(objId, methodName, params){
	    this.request.clear();
	    this.request.setObjectId(objId);
	    this.request.setSessionId(this.sessionId);
	    this.request.setMethodName(methodName);
	    this.request.setParams(params);	
		return (this.address +"?request=" + this.urlencode(this.request.encode64()));
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
	getUrl2: function(objId, methodName, params){
	    this.request.clear();
	    this.request.setObjectId(objId);
	    this.request.setSessionId(this.sessionId);
	    this.request.setMethodName(methodName);
	    this.request.setParams(params);		
	    return (this.address +"?request=" + this.urlencode(this.request.encode64()));
	},
	call: function(objId, methodName, params, callbackObj){	
		try{
			//showProgress();
			showStatus("Request..."+methodName);//+":"+(params ? params.objList : "")
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
		            return "Error Response:Unable to parse server response : " + retXML  + " (" + callbackObj+"."+methodName+") --> ";
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
		        throw "Invalid server response : " + retXML  + " (" + callbackObj+"."+methodName + ":" + objId + ")";
		}catch(e){					
			error_log("error : "+e);
		    if (e != undefined && typeof e == "string" && e.search("object") > 0)
                system.alert(this,e,"");		
		    else if (e == "Undefined method !")
		        system.alert(this,"Fungsi "+callbackObj+"."+methodName+" tidak ditemukan. Hubungi administrator!!!");		  
            else if (systemAPI != undefined)
				system.alert(this,"#No Response =>"+ e + " => "+callbackObj +"<br>"+retXML,"Coba beberapa menit lagi atau Refresh halaman ini");		
			else alert(this+"#No Response "+ e + " // "+callbackObj +"\r\n"+retXML+"\r\nRefresh halaman ini");		
		}
	},
	doCall: function(){
	    if (this.http != undefined)
	    {
			try{				
				var params = "request="+this.urlencode(this.request.encode());
		        this.http.open("POST", this.address, false);
				this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
				this.http.setRequestHeader("Accept-Encoding", "gzip");  
		        this.http.send(params);				
		        if (this.http.status == 200)
		            return this.http.responseText;
		        else return "Error : "+ this.http.readyState+":"+ this.http.statusText;
		        
			}catch(e){
				error_log(e);
				return "Error : " + e;
			}
	    }
	},
	callAsynch: function(objId, methodName, params, callbackObj, callObjReq, callback){
		try{
			var request = new portalui_arrayMap();				
			request.set("objId", objId);
			request.set("methodName", methodName);
			request.set("params", params.cloneObj());
			request.set("callbackObj", callbackObj);	
			request.set("callObjReq", callObjReq);		
            request.set("callback", callback);			
			this.asynchQueue.add(request);
			this.doAsynchCall();
		}catch(e){
			systemAPI.alert(this+"#callAsynch//",e);
		}
	},
	doAsynchCall: function(){		
		//showProgress();		
		if (this.asynchQueue.getLength() > 0)
	    {		
					
	        var httpId = this.aquireAsynchHttpRequest();
	        if (httpId != -1)
	        {
	            var httpArray = this.asynchHttp[httpId];
	            var http = httpArray["http"];
	            
	            var request = this.asynchQueue.get(0);
	            this.asynchQueue.del(0);
				showStatus("Request..."+request.get("methodName"));
	            httpArray["methodName"] = request.get("methodName");
	            httpArray["callbackObj"] = request.get("callbackObj");
				httpArray["callObjReq"] = request.get("callObjReq");
				httpArray["callback"] = request.get("callback");
				
	            this.asynchHttp[httpId] = httpArray;

	            this.request.clear();
	            this.request.setObjectId(request.get("objId"));
	            this.request.setSessionId(this.sessionId);
	            this.request.setMethodName(request.get("methodName"));
	            this.request.setParams(request.get("params"));
				
				var params = "request="+this.urlencode(this.request.encode());
	            http.open("POST", this.address, true);
				var script = "http.onreadystatechange = window.util_Connection" + this.connId + "_" + httpId;
	            eval(script);
	            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	            http.setRequestHeader("Accept-Encoding", "gzip");   
	            http.send(params);
	        }
	    }else hideProgress();;
	},
	aquireAsynchHttpRequest: function(){
	    var result = -1;
	    if (this.availHttp.getLength() > 0){
	        result = this.availHttp.get(0);
	        this.availHttp.del(0);
	    }
	    else if (this.nextAsynchId < this.asynchNo)
	    {
	        var http = undefined;
	        
	        if (document.all)
	        {
	            try
	            {
	                http = new ActiveXObject("Msxml2.XMLHTTP");
	            }
	            catch (e)
	            {
	                try
	                {
	                    http = new ActiveXObject("Microsoft.XMLHTTP");
	                }
	                catch (e2)
	                {}
	            }
	        }
	        else // all other browser
	        {
	            http = new XMLHttpRequest();

	            try
	            {
	                http.overrideMimeType("text/xml");
					//http.onprogress = onprogressText;
	            }
	            catch (e)
	            {}
	        }
	        var funcName = "window.util_Connection" + this.connId + "_" + this.nextAsynchId;
	        var script = funcName + " = function() " +
	                     "{" +
	                        "window.ConnectionList[" + this.connId + "].doAsynchReady(" + this.nextAsynchId + ");" +
	                     "}";
	        eval(script);
	        
	        var arr = [];
	        arr["http"] = http;
	        arr["methodName"] = undefined;
	        arr["callbackObj"] = undefined;
	        arr["callObjReq"] = undefined;
	        arr["callback"] = undefined;
	        this.asynchHttp[this.nextAsynchId] = arr;
	        result = this.nextAsynchId;
	        
	        this.nextAsynchId++;
	    }
	    return result;
	},
	doRequestReady: function(httpId){
	    var httpArray = this.asynchHttp[httpId];
	    if (httpArray != undefined)
	    {
	        http = httpArray["http"];

	        try
	        {
	            var result = undefined;
	            
	            if (http.status == 200)
	            {
	                var retXML = http.responseText;
					this.response.clear();
					
	                if ((retXML != undefined) && (retXML != ""))
	                {
	                    try
	                    {
	                        this.response.fromXML(retXML);
	                    }
	                    catch (e)
	                    {
	                        this.response.setCode(1);
	                        result ="Unable to parse server response : " + retXML  + " (" + httpArray["methodName"] + ":" + httpArray["callbackObj"] + ")";
	                    }
	                    switch (this.response.getCode())
	                    {
	                        case 0 : // OK
	                                result = this.response.getValue();
	                                break;
	                        case 1 : // server exception
	                                result = this.response.getValue();
	                                break;
	                        default :
	                                result ="Unknown response code : " + this.response.getCode() + " (" + httpArray["methodName"] + ":" + httpArray["callbackObj"] + ")";
	                                break;
	                    }
	                }
	                else
	                {
	                    result = "Invalid server response : " + retXML  + " (" +httpArray["methodName"] + ":" + httpArray["callbackObj"] + ")";
	                    this.response.setCode(1);
	                }
	            }
	            else
	            {
	                result = "Invalid server response (" +httpArray["callbackObj"] + ":" + httpArray["callbackObj"] + ")";
	                this.response.setCode(1);
	            }							
				if (hideStatus)hideStatus();
	            if (httpArray['callbackObj'] != undefined)
	            {			    					                
	                 script = "httpArray['callbackObj'].doRequestReady(this, this.response.getCode(), httpArray['methodName'], result,httpArray['callObjReq'],httpArray['callback']);";	                
          	         eval(script);                    
	            }
	            
	        }catch (e){            
				system.alert(this,"$doAsynchReady", e);
	        }
	        hideStatus();
	        httpArray['callbackObj'] = undefined;
	        httpArray['methodName'] = undefined;
			httpArray["callObjReq"] = undefined;
			httpArray["callback"] = undefined;
	        this.asynchHttp[httpId] = httpArray;
	        this.availHttp.add(httpId);		
	        this.doAsynchCall();
	    }
	},
	doAsynchReady: function(httpId){
		try{
			var httpArray = this.asynchHttp[httpId];
			
			if (httpArray != undefined)
			{
				http = httpArray["http"];
		
				if (http.readyState == 4){
					if (showStatus)showStatus("Done....."+httpArray['callbackObj']);					 
					setTimeout("window.ConnectionList[" + this.connId + "].doRequestReady(" + httpId + ");", 1);										
					hideProgress();
				}else if (http.readyState == 3){
					//this.response.fromXML(http.responseText);
					//onprogressText(this.response.getValue());
					showProgress("Please wait..."+httpArray['callbackObj']);
					if (showStatus)showStatus("Transferring data....."+httpArray['callbackObj']+"."+httpArray['methodName']);					 
				}else if (http.readyState == 2){
					showProgress("Please wait..."+httpArray['callbackObj']);
					if (showStatus)showStatus("Connected..."+httpArray['callbackObj']);;//connected.... header belum diterima
				}else if (http.readyState == 1){
					showProgress("Please wait..."+httpArray['callbackObj']);
					if (showStatus)showStatus("Connecting..."+httpArray['callbackObj']);//connecting....
				}else {
					showProgress("Please wait..."+httpArray['callbackObj']);
					if (showStatus)showStatus("Connecting...."+httpArray['callbackObj']);;//create object...;
				}
			}
		}catch(e){
			systemAPI.alert(this+"#doAsynch//"+e);
		}
	},
	getRequestXML: function(){
		return this.request.toXML();
	},
	getAddress: function(){
		return this.address;
	},
	getAsynchNo: function(){
		return this.asynchNo;
	},
	setAsynchNo: function(data){
		this.asynchNo = data;
	}
});
window.ConnectionList = [];
window.ConnectionNextId = 0;
