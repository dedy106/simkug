
window.util_JSONRPC = function(url){
	window.util_JSONRPC.prototype.parent.constructor.call(this);
    this.className = "util_JSONRPC";    
    this.init(url);
};
window.util_JSONRPC.extend(window.EventEmitter);
window.util_JSONRPC.implement({
	init : function(url)
	{
		try{
			window.util_JSONRPC.prototype.parent.init.call(this);
			this.id = 1;
			this.address = url;
			this.ready = false;
			var list = system.JSONRPC_descCache[url];
			if (list == null)
			{
				var self = this;
			
				this.call("describe", [], 
					function(list)
					{
						self.build(list);
					});
			}
			else
				this.build(list);
		}catch(e){
			alert(e);
		}
	},
	
	isReady : function()
	{
		return this.ready;
	},
	
	build : function(list)
	{
		var self = this;
		self.ready = true;
		
		for (var i in list)
		{
			var paramList = list[i];
			var paramString = "";
			var paramStringArray = "";
			
			for (var j in paramList)
			{
				paramString += paramList[j] + ", ";
				paramStringArray += ", " + paramList[j];
			}
			
			if (paramStringArray != "")
				paramStringArray = paramStringArray.substr(2);
			
			var script = "self." + i + " = function(" + paramString + "cb, fcb){ this.call('" + i + "', [" + paramStringArray + "], cb, fcb); }";
			eval(script);
			//synch
			var script = "self." + i + "_Synch = function(" + paramString + "cb, fcb){ this.callSynch('" + i + "', [" + paramStringArray + "], cb, fcb); }";
			eval(script);
		}
		
		self.emit("ready");
	},
	
	setAddress : function(data)
	{
		this.address = data;
	},
	
	getAddress : function(data)
	{
		return this.address;
	},
	call2 : function(methodName, args, callback, failedCallback)
	{

		if (typeof(args) == "function")
		{
			callback = args;
			args = undefined;
		}

		var callHandler = false;
		var self = this;

		var message = null;

		if (args == null)
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, id : this.id };
				this.id++;
			}
		}
		else
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName, params : args};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, params : args, id : this.id };
				this.id++;
			}
		}

		var urlTarget = this.address;
		var msEpoch = new Date().getTime();

		if (urlTarget.indexOf("?") <= 0)
			urlTarget += "?timeStamp=" + msEpoch;
		else
			urlTarget += "&timeStamp=" + msEpoch;
		showProgress("Requesting...");
		var handlerFunc = null;
		var handlerObj = null;
		
		$.ajax({url: urlTarget,
	        data: JSON.stringify(message),
	        type: 'POST',
	        dataType : "json",
	        headers: {'Accept': 'application/json'},
	        crossDomain: true,
	        timeout : 7200000,
	        beforeSend: function() {
	            showProgress("Waiting...");
	        },
	        complete: function() {
	           hideProgress();
	        },
	        success: function (result) {
	        	try{
	            	if (!callHandler)
					{
						callHandler = true;
						var handlerFunc = null;
						var handlerObj = null;

						if (typeof(callback) == "function")
							handlerFunc = callback;
						else if ((callback instanceof Array) && (callback.length == 2) && (typeof(callback[1]) == "function"))
						{
							handlerObj = callback[0];
							handlerFunc = callback[1];
						}

						if (handlerFunc != null)
						{
							var response = result;


							try
							{
								//alert(response);
								var responseMessage = response;
							}
							catch (e)
							{
								self.emit("error", "Calling " + methodName + ", returning invalid response :" + response);
								failedCallback.call(handlerObj,  "Calling " + methodName + ", returning invalid response :" + response );
								return;
							}

							if (responseMessage.error == null)
								handlerFunc.call(handlerObj, responseMessage.result);
							else{
								self.emit("error", "Calling " + methodName + ", returning Object Error : " + responseMessage.error);
								failedCallback.call(handlerObj,  "Calling " + methodName + ", returning Object Error : " + responseMessage.error);
							}
						}
					}

	             }catch(e){
		             hideProgress();
	                 self.emit("error", "Calling " + methodName + ", returning Handling Server Error : " + e + " : " + response);
	                 failedCallback.call(handlerObj,  "Calling " + methodName + ", returning Handling Server Error : " + e + " : " + response);
	                 return false;
	             }
	        },
	        error: function (request,error, thrown) {
		        hideProgress();
	            // This callback function will trigger on unsuccessful action
	            if (error === "timeout")
	            	self.emit("error", "Calling " + methodName + ", Got Timeout ");
	            else 
		            self.emit("error", "Calling " + methodName + ", returning Server Error : " + error + " : " + thrown);
		        failedCallback.call(handlerObj,  "Calling " + methodName + ", returning Server Error : " + error + " : " + thrown);
	            return false;
	        }
	    });
	},
	callSynch2 : function(methodName, args, callback, fcb)
	{

		if (typeof(args) == "function")
		{
			callback = args;
			args = undefined;
		}

		var callHandler = false;
		var self = this;

		var message = null;

		if (args == null)
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, id : this.id };
				this.id++;
			}
		}
		else
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName, params : args};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, params : args, id : this.id };
				this.id++;
			}
		}

		var urlTarget = this.address;
		var msEpoch = new Date().getTime();

		if (urlTarget.indexOf("?") <= 0)
			urlTarget += "?timeStamp=" + msEpoch;
		else
			urlTarget += "&timeStamp=" + msEpoch;
		showProgress("Requesting...");
		$.ajax({url: urlTarget,
	        data: JSON.stringify(message),
	        type: 'POST',
	        dataType : "json",
	        headers: {'Accept': 'application/json'},
	        crossDomain: true,
	        async : false,
	        timeout : 7200000,
	        beforeSend: function() {
	            showProgress("Waiting...");
	        },
	        complete: function() {
	           hideProgress();
	        },
	        success: function (result) {
	        	try{
	            	if (!callHandler)
					{
						callHandler = true;
						var handlerFunc = null;
						var handlerObj = null;

						if (typeof(callback) == "function")
							handlerFunc = callback;
						else if ((callback instanceof Array) && (callback.length == 2) && (typeof(callback[1]) == "function"))
						{
							handlerObj = callback[0];
							handlerFunc = callback[1];
						}

						if (handlerFunc != null)
						{
							var response = result;


							try
							{
								//alert(response);
								var responseMessage = response;
							}
							catch (e)
							{
								self.emit("error", "Calling " + methodName + ", returning invalid response :" + response);
								return;
							}

							if (responseMessage.error == null)
								handlerFunc.call(handlerObj, responseMessage.result);
							else
								self.emit("error", "Calling " + methodName + ", returning Object Error : " + responseMessage.error);
						}
					}

	            }catch(e){
	                 self.emit("error", "Calling " + methodName + ", returning Server Error : " + e + " : " + response);
	                 return false;
	             }
	        },
	        error: function (request,error, thrown) {
	            // This callback function will trigger on unsuccessful action
	            if (error === "timeout")
	            	self.emit("error", "Calling " + methodName + ", Got Timeout ");
	            else 
		            self.emit("error", "Calling " + methodName + ", returning Server Error : " + error + " : " + thrown);
	            return false;
	        }
	    });
	},
	call : function(methodName, args, callback)
	{
		var xhr = new XMLHttpRequest();
		
		if (typeof(args) == "function")
		{
			callback = args;
			args = undefined;
		}
		var callHandler = false;
		var self = this;
		
		xhr.onreadystatechange = 
			function()
			{
				showProgress("waiting...");
				if ((xhr.readyState == 4) && (!callHandler))
				{
					callHandler = true;
					var handlerFunc = null;
					var handlerObj = null;
					
					if (typeof(callback) == "function")
						handlerFunc = callback;
					else if ((callback instanceof Array) && (callback.length == 2) && (typeof(callback[1]) == "function"))
					{
						handlerObj = callback[0];
						handlerFunc = callback[1];
					}
					
					if (handlerFunc != null)
					{
						var response = xhr.responseText;
						if (xhr.status == "200")
						{
							hideStatus("Requesting...");
							hideProgress();
							try
							{
								var responseMessage = JSON.parse(response);
							}
							catch (e)
							{
								self.emit("error", "Calling " + methodName + ", returning invalid response :" + response);
								return;
							}
							
							if (responseMessage.error == null)
								handlerFunc.call(handlerObj, responseMessage.result);
							else
								self.emit("error", "Calling " + methodName + ", returning Object Error : " + responseMessage.error);
						}
						else{
							hideStatus("Requesting...");
							hideProgress();
							self.emit("error", "Calling " + methodName + ", returning Server Error : " + xhr.status + " : " + response);
						}
					}
				}
			}
		
		var message = null;
		
		if (args == null)
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, id : this.id };
				this.id++;
			}
		}
		else
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName, params : args};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, params : args, id : this.id };
				this.id++;
			}
		}
		
		var urlTarget = this.address;
		var msEpoch = new Date().getTime();
		
		if (urlTarget.indexOf("?") <= 0)
			urlTarget += "?timeStamp=" + msEpoch;
		else
			urlTarget += "&timeStamp=" + msEpoch;
		xhr.open("POST", urlTarget, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.setRequestHeader("Accept-Encoding", "gzip"); 
	    xhr.timeout = 7200000;
		showProgress("Requesting...");
		xhr.send(JSON.stringify(message)); 
		
	},
	callSynch : function(methodName, args, callback)
	{
		var xhr = new XMLHttpRequest();
		
		if (typeof(args) == "function")
		{
			callback = args;
			args = undefined;
		}
		
		var callHandler = false;
		var self = this;
		
		xhr.onreadystatechange = 
			function()
			{
				if ((xhr.readyState == 4) && (!callHandler))
				{
					callHandler = true;
					var handlerFunc = null;
					var handlerObj = null;
					
					if (typeof(callback) == "function")
						handlerFunc = callback;
					else if ((callback instanceof Array) && (callback.length == 2) && (typeof(callback[1]) == "function"))
					{
						handlerObj = callback[0];
						handlerFunc = callback[1];
					}
					
					if (handlerFunc != null)
					{
						var response = xhr.responseText;
						if (xhr.status == "200")
						{
							try
							{
								var responseMessage = JSON.parse(response);
							}
							catch (e)
							{
								self.emit("error", "Calling " + methodName + ", returning invalid response :" + response);
								return;
							}
							
							if (responseMessage.error == null)
								handlerFunc.call(handlerObj, responseMessage.result);
							else
								self.emit("error", "Calling " + methodName + ", returning Object Error : " + responseMessage.error);
						}
						else{
							self.emit("error", "Calling " + methodName + ", returning Server Error : " + xhr.status + " : " + response);
						}
					}
				}
			}
		
		var message = null;
		
		if (args == null)
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, id : this.id };
				this.id++;
			}
		}
		else
		{
			if (typeof(callback) != "function")
				message = {jsonrpc : "2.0", method : methodName, params : args};
			else
			{
				message = {jsonrpc : "2.0", method : methodName, params : args, id : this.id };
				this.id++;
			}
		}
		
		var urlTarget = this.address;
		var msEpoch = new Date().getTime();
		
		if (urlTarget.indexOf("?") <= 0)
			urlTarget += "?timeStamp=" + msEpoch;
		else
			urlTarget += "&timeStamp=" + msEpoch;
		xhr.open("POST", urlTarget, false);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(message)); 
	},
	download : function()
	{
		this.id++;
		
		var params = "mode=download&callId=" + this.id;
		
		for (var i = 0; i < arguments.length; i++)
		{
			if (i == 0)
				params += "&method=" + encodeURI(arguments[i]);
			else
				params += "&p" + (i - 1) + "=" + encodeURI(arguments[i]);
		}
		
		var target = this.address;
		
		if (target.indexOf("?") > 0)
			target += "&" + params;
		else
			target += "?" + params;
		
		window.location = target;
	},
    post : function(message, callback, errorHandling){
        var urlTarget = this.address;
        var msEpoch = new Date().getTime();

        if (urlTarget.indexOf("?") <= 0)
            urlTarget += "?timeStamp=" + msEpoch;
        else
            urlTarget += "&timeStamp=" + msEpoch;
        //console.log(JSON.stringify(message));
        xhr = $.ajax({url: urlTarget,
            data: JSON.stringify(message),
            type: 'POST',
            dataType : "json",
            headers: {'Accept': 'application/json','Access-Control-Allow-Origin': '*'},//,
            crossDomain: true,
            beforeSend: function() {
                showLoading();
            },
            complete: function() {
                console.log("complete");
                hideLoading();
            },
            success: function (result) {
                try{
                    if (true)
                    {
                        callHandler = true;
                        var handlerFunc = null;
                        var handlerObj = null;

                        if (typeof(callback) == "function")
                            handlerFunc = callback;
                        else if ((callback instanceof Array) && (callback.length == 2) && (typeof(callback[1]) == "function"))
                        {
                            handlerObj = callback[0];
                            handlerFunc = callback[1];
                        }

                        if (handlerFunc != null)
                        {
                            var response = result;


                            try
                            {
                                var responseMessage = response;
                            }
                            catch (e)
                            {
                                if (errorHandling)
                                    errorHandling.call(null, "Calling " + message.methodName + ", returning invalid response :" + response);
                                else 
                                    self.emit("error", "Calling " + message.methodName + ", returning invalid response :" + response,200);

                                return;
                            }

                            if (responseMessage.error == null)
                                handlerFunc.call(handlerObj, responseMessage.result);
                            else 
                                self.emit("error", "Calling " + message.methodName + ", returning Object Error : " + responseMessage.error, 200);
                        }
                    }

                }catch(e){
                    console.log("error : " + e);    
                     application.hideProgress();
                     if (errorHandling)
                        errorHandling.call(null, "Calling " + message.methodName + ", returning Server Error : " + e + " : " + response);
                     else
                        self.emit("error", "Calling " + message.methodName + ", returning Server Error : " + e + " : " + response,200);
                    // return false;
                 }
            },
            error: function (request,error, thrown) {
                console.log(error +":"+thrown);
                if (errorHandling)
                    errorHandling.call(null, "Gagal terhubung ke server");
                else
                    self.emit("error", "Gagal terhubung ke server", 200);
                application.hideLoading();
                //return false;
            }
        });
        return xhr;
    },
    callFunc : function(funcName, paramArray, handler, errorHandler)
    {
        var message = {jsonrpc : "2.0", method : funcName, params : paramArray, id : 1 };

        return this.post(message,handler,errorHandler);
    }
});

system.JSONRPC_descCache = {};