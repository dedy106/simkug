//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_dbTable = function(connection,options){
	try{	
		this.remoteClassName = "server_DBConnection_dbLib";
		window.util_dbTable.prototype.parent.constructor.call(this, connection,options);
		this.className = "util_dbTable";
		this.requester = undefined;	
		this.table = "";
	}catch(e){
		alert("[util_dbTable] :: constructor : " + e);
	}
};
window.util_dbTable.extend(window.server_RemoteObject);
window.util_dbTable.implement({
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
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,ret);
			else alert("[util_dbTable]::dataProvider : " + e+"\r\n"+ret);
		}
	},
	setFieldName: function(fields){
		this.fields = fields;
	},
	updateData: function(fields, data, keyFields, keyValues){
		var params= new server_util_arrayList();
		params.add(new server_util_arrayList({items:fields}));
		params.add(new server_util_arrayList({items:data}));
		params.add(new server_util_arrayList({items:keyFields}));
		params.add(new server_util_arrayList({items:keyValues}));
		this.updateData.add(param);
	},
	deleteData: function(keyFields, keyValues){
		this.deleteData.add({keyFields:keyFields, keyValues:keyValues});
	},	
	appendData: function(data){		
		this.rowsToAppend.add(data);
	},
	prepare: function(){
		this.rowsToAppend = new server_util_arrayList();
		this.updateData = new server_util_arrayList();
		this.deleteData = new server_util_arrayList();
		this.executeCommand = new server_util_arrayList();
	},
	prepareExec: function(){
		if (this.rowsToAppend.getLength() > 0){ 
			this.executeCommand.add(this.rowsToAppend);
			this.rowsToAppend = new server_util_arrayList();
		}
		if (this.updateData.getLength() > 0){ 
			this.executeCommand.add(this.updateData);
			this.updateData = new server_util_arrayList();
		}
		if (this.deleteData.getLength() > 0){ 
			this.executeCommand.add(this.deleteData);
			this.deleteData = new server_util_arrayList();
		}
	},
	execute: function(){
		
	},
	getDataProviderA: function(sql,callback){
		try{			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getDataProvider",callback);
		}catch(e)
		{
			if (systemAPI !== undefined)
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,"");
			else alert("[util_dbTable]::dataProvider : " + e);
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
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,"");
			else alert("[util_dbTable]::dataProvider : " + e);
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
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,"");
			else alert("[util_dbTable]::dataProvider : " + e);
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
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,"");
			else alert("[util_dbTable]::dataProvider : " + e);
		}
	},
	getMultiDataProviderA: function(sql){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getMultiDataProvider");						
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbTable]::dataProvider : " + e,"");
			else alert("[util_dbTable]::dataProvider : " + e);
		}
	},	
	getRowCount: function(rowPerPage){
		this.params.clear();
		this.params.add("select count(*) from "+this.table);
		this.params.add(rowPerPage);
		return this.call("getRowCount");
	},
	getRowCountA: function(rowPerPage){
		this.params.clear();
		this.params.add("select count(*) from "+this.table);
		this.params.add(rowPerPage);
		this.callAsynch("getRowCount");
	},
});
