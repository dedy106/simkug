//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_dbUtility = function(connection,options){
	try{	
		this.remoteClassName = "server_DBConnection_dbLib";
		window.util_dbUtility.prototype.parent.constructor.call(this, connection,options);
		this.className = "util_dbUtility";
		this.requester = undefined;	
	}catch(e){
		alert("[util_dbUtility] :: constructor : " + e);
	}
};
window.util_dbUtility.extend(window.server_RemoteObject);
window.util_dbUtility.implement({
	setRequester: function(data){
		this.requester = data;
	},		
	getDataProvider: function(sql, isObject){
		try{		
			this.params.clear();
			this.params.add(sql);
			var ret = this.call("getDataProvider");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,ret);
			else alert("[util_dbUtility]::dataProvider : " + e+"\r\n"+ret);
		}
	},
	getDataProviderA: function(sql,callback){
		try{			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getDataProvider",callback);
		}catch(e)
		{
			if (systemAPI !== undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,"");
			else alert("[util_dbUtility]::dataProvider : " + e);
		}
	},
	getDataProviderPage: function(sql,start, offset, isObject){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(start);
			this.params.add(offset);
			var ret = this.call("getDataProviderPage");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");		
			return ret;
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,"");
			else alert("[util_dbUtility]::dataProvider : " + e);
		}
	},
	getDataProviderPageA: function(sql,start, offset){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(start);
			this.params.add(offset);
			this.callAsynch("getDataProviderPage");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,"");
			else alert("[util_dbUtility]::dataProvider : " + e);
		}
	},
	getMultiDataProvider: function(sql, isObject){
		try{		
			this.params.clear();
			this.params.add(sql);
			var ret = this.call("getMultiDataProvider");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,"");
			else alert("[util_dbUtility]::dataProvider : " + e);
		}
	},
	getMultiDataProviderA: function(sql){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getMultiDataProvider");						
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::dataProvider : " + e,"");
			else alert("[util_dbUtility]::dataProvider : " + e);
		}
	},	
	getRowCount: function(sql, rowPerPage){
		this.params.clear();
		this.params.add(sql);
		this.params.add(rowPerPage);
		return this.call("getRowCount");
	},
	getRowCountA: function(sql, rowPerPage){
		this.params.clear();
		this.params.add(sql);
		this.params.add(rowPerPage);
		this.callAsynch("getRowCount");
	},
	execQuery: function(sql){
		this.params.clear();
		this.params.add(sql);
		this.callAsynch("execQuery");
	},
	execQueryA: function(sql){
		this.params.clear();
		this.params.add(sql);
		this.callAsynch("execQuery");
	},	
	execQuerySync: function(sql){
		this.params.clear();
		this.params.add(sql);
		return this.call("execQuery");
	},
	execArraySQL: function(sql){
		this.params.clear();
		this.params.add(sql);
		this.callAsynch("execArraySQL");
	},
	execArraySQLA: function(sql){
		this.params.clear();
		this.params.add(sql);
		return this.call("execArraySQL");
	},
	loginSQL: function(sql, isObject){
		try{		
			this.params.clear();
			this.params.add(sql);
			var ret = this.call("loginSQL");
			if (isObject) eval("ret = "+ret+";");			 
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbUtility]::loginSQL : " + e,ret);
			else alert("[util_dbUtility]::loginSQL : " + e+"\r\n"+ret);
		}
	}
});
