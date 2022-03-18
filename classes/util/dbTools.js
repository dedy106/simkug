//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("server_RemoteObject");
window.util_dbTools = function(connection, fileConfig)
{
	try
	{
		this.remoteClassName = "server_DBConnection_dbTools";
		if (fileConfig == undefined) fileConfig = "dbSetting";		
		window.util_dbTools.prototype.parent.constructor.call(this, connection, fileConfig);
		this.className = "util_dbTools";
		
	}catch(e)
	{
		alert("[util_dbTools] :: constructor : " + e);
	}

};
window.util_dbTools.extend(window.server_RemoteObject);
window.util_dbLib.implement({
	setRequester: function(data){
		this.requester = data;
	},
	runQuery: function(sql){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("runQuery");
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::runQuery : " + e,"");
			else alert("[util_dbLib]::runQuery : " + e);
		}
	},
	runQueryA: function(sql){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("runQuery");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::runQuery : " + e,"");
			else alert("[util_dbLib]::runQuery : " + e);
		}
	},
	runSQL: function(sql){
		try{
			this.params.clear();
			this.params.add(sql);		
			return this.call("runSQL");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::runSQL : " + e,"");
			else alert("[util_dbLib]::runSQL : " + e);
		}
	},
	runSQLA: function(sql){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("runSQL");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::runSQL : " + e,"");
			else alert("[util_dbLib]::runSQL : " + e);
		}
	},
	loadQuery: function(sql){
		try{
			this.params.clear();
			this.params.add(sql);
			return this.call("runQuery");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::loadQuery : " + e,"");
			else alert("[util_dbLib]::loadQuery : " + e);
		}
	},
	getDataProvider: function(sql, isObject){
		try{		
			this.params.clear();
			this.params.add(sql);
			var ret = this.call("getDataProvider");
			if (isObject) eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,ret);
			else alert("[util_dbLib]::dataProvider : " + e+"\r\n"+ret);
		}
	},
	getDataProviderA: function(sql){
		try{			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getDataProvider");
		}catch(e)
		{
			if (systemAPI !== undefined)
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,"");
			else alert("[util_dbLib]::dataProvider : " + e);
		}
	},
	getDataProviderPage: function(sql,start, offset, isObject){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(start);
			this.params.add(offset);
			var ret = this.call("getDataProviderPage");
			if (isObject) eval("ret = "+ret+";");		
			return ret;
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,"");
			else alert("[util_dbLib]::dataProvider : " + e);
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
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,"");
			else alert("[util_dbLib]::dataProvider : " + e);
		}
	},
	getMultiDataProvider: function(sql, isObject){
		try{		
			this.params.clear();
			this.params.add(sql);
			var ret = this.call("getMultiDataProvider");
			if (isObject) eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,"");
			else alert("[util_dbLib]::dataProvider : " + e);
		}
	},
	getMultiDataProviderA: function(sql){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("getMultiDataProvider");						
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::dataProvider : " + e,"");
			else alert("[util_dbLib]::dataProvider : " + e);
		}
	},
	loadQueryA: function(sql){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.callAsynch("runQuery");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::loadQuery : " + e,"");
			else alert("[util_dbLib]::loadQuery : " + e);
		}
	},
	execSQL: function(sql, rowPerPage, start){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.params.add(rowPerPage);
			this.params.add(start);
			var res = this.call("execSQL");
			res = eval('('+res+')');
			return res;
		}catch(e)
		{		
			systemAPI.alert("[util_dbLib]::execSQL : " + e,"");
			return false;
		}
	},
	execSQLA: function(sql, rowPerPage, start, requester){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(rowPerPage);
			this.params.add(start);		
			this.requester = requester;
			this.callAsynch("execSQL");				
		}catch(e)
		{		
			systemAPI.alert("[util_dbLib]::execSQL : " + e,"");
			return false;
		}
	},
	execSQLAsync: function(sql, rowPerPage, start){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(rowPerPage);
			this.params.add(start);
			this.callAsynch("execSQL");				
		}catch(e)
		{		
			systemAPI.alert("[util_dbLib]::execSQL : " + e,"");
			return false;
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
	updateBlob: function(table, col, value, id){
		this.params.clear();
		this.params.add(table);
		this.params.add(col);
		this.params.add(value);
		this.params.add(id);
		return this.call("updateBlob");
	},
	updateBlobA: function(table, col, value, id){
		this.params.clear();
		this.params.add(table);
		this.params.add(col);
		this.params.add(value);
		this.params.add(id);
		this.callAsynch("updateBlob");
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
	execArraySQLS: function(sql){
		this.params.clear();
		this.params.add(sql);
		return this.call("execArraySQL");
	},
	beginTrans: function(){
		this.params.clear();
		this.callAsynch("beginTrans");
	},
	completeTrans: function(){
		this.params.clear();
		this.callAsynch("completeTrans");
	},
	checkTrans: function(){
		this.params.clear();
		this.callAsynch("checkTrans");
	},
	insertData: function(tableName, fields, values){
		this.params.clear();
		this.params.add(tableName);
		this.params.add(fields);
		this.params.add(values);
		this.callAsynch("insertData");
	},
	insertDataString: function(tableName, fields, values){
		this.params.clear();
		this.params.add(tableName);
		this.params.add(fields);
		this.params.add(values);
		this.callAsynch("insertDataString");
	},
	locateData: function(tableName, keyFields, keyValues, fieldReturns, allFields){
		this.params.clear();
		this.params.add(tableName);
		this.params.add(keyFields);
		this.params.add(keyValues);
		this.params.add(fieldReturns);
		this.params.add(allFields);
		return this.call("locateData");
	},
	locateAndEditData: function(tableName, keyFields, keyValues, fields, values){
		this.params.clear();
		this.params.add(tableName);
		this.params.add(keyFields);
		this.params.add(keyValues);
		this.params.add(fields);
		this.params.add(values);
		this.callAsynch("locateAndEditData");
	},
	locateAndDeleteData: function(tableName, keyFields, keyValues){
		this.params.clear();
		this.params.add(tableName);
		this.params.add(keyFields);
		this.params.add(keyValues);
		this.callAsynch("locateAndDeleteData");
	},
	listData: function(sql, page, rowPerPage){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			this.callAsynch("listData");
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listData : " + e,"");
			else alert("[util_dbLib]::listData:" + e);
		}
	},
	listDataObj: function(sql, page, rowPerPage){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			return this.call("listDataObj");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listDataObj : " + e,"");
			else alert("[util_dbLib]::listDataObj:" + e);
		}
	},
	listDataObjA: function(sql, page, rowPerPage){
		try{
			
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			this.callAsynch("listDataObj");
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listDataObj : " + e,"");
			else alert("[util_dbLib]::listDataObj:" + e);
		}
	},
	listDataAkun: function(sql, page, rowPerPage){
		try{		
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			this.callAsynch("listDataAkun");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listDataAkun: " + e,"");
			else alert("[util_dbLib] :: listDataAkun : " + e);
		}
	},
	listDataPP: function(sql, page, rowPerPage){
		try{
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			this.callAsynch("listDataPP");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listDataPP : " + e,"");
			else alert("[util_dbLib] :: listDataPP : " + e);
		}
	},
	listDataKaryawan: function(sql, page, rowPerPage){
		try{
			this.params.clear();
			this.params.add(sql);
			this.params.add(page);
			this.params.add(rowPerPage);
			this.callAsynch("listDataKaryawan");
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLib]::listDataKaryawan: " + e,"");
			else alert("[util_dbLib] :: listDataKaryawan : " + e);
		}
	},
	getTempDir: function(){
		this.params.clear();
		return this.call("getTempDir");
	},
	getTempDirA: function(){
		this.params.clear();
		this.callAsynch("getTempDir");
	},
	getPeriode: function(lokasi){
		this.params.clear();
		this.params.add(lokasi);
		return this.call("getPeriode");
	},
	getPeriodeA: function(lokasi){
		this.params.clear();
		this.params.add(lokasi);
		this.callAsynch("getPeriode");
	},
	getPP: function(user, lokasi){
		this.params.clear();
		this.params.add(user);
		this.params.add(lokasi);
		return this.call("getPP");
	},
	getPPA: function(user, lokasi){
		this.params.clear();
		this.params.add(user);
		this.params.add(lokasi);
		this.callAsynch("getPP");
	},
	getLokasi: function(user){
		this.params.clear();
		this.params.add(user);
		return this.call("getLokasi");
	},
	getLokasiA: function(user){
		this.params.clear();
		this.params.add(user);
		this.call("getLokasiA");
	},
	getAllPeriode: function(){
		this.params.clear();
		return this.call("getAllPeriode");
	},
	getAllPeriodeA: function(){
		this.params.clear();
		this.callAsynch("getAllPeriode");
	},
	getAllPeriodeLok: function(lok){
		this.params.clear();
		this.params.add(lok);
		return this.call("getAllPeriodeLok");
	},
	getAllPeriodeLokA: function(lok){
		this.params.clear();
		this.params.add(lok);
		this.callAsynch("getAllPeriodeLok");
	},
	getDBName: function(){
		this.params.clear();
		return this.call("getDBName");
	},
	getDBNameA: function(){
		this.params.clear();
		this.callAsynch("getDBName");
	},
	getDBHost: function(){
		this.params.clear();
		return this.call("getDBHost");
	},
	getDBHostA: function(){
		this.params.clear();
		this.callAsynch("getDBHost");
	},
	getAllTables: function(){
		this.params.clear();
		return this.call("getAllTables");
	},
	getAllTablesA: function(){
		this.params.clear();
		this.callAsynch("getAllTables");
	},
	getColumnOfTable: function(table){
		this.params.clear();
		this.params.add(table);
		return this.call("getColumnOfTable");
	},
	getColumnOfTableA: function(table){
		this.params.clear();
		this.params.add(table);
		this.callAsynch("getColumnOfTable");
	},
	addUserLog: function(uid, hostname, userlok, ip){
		this.params.clear();
		this.params.add(uid);
		this.params.add(hostname);
		this.params.add(userlok);
		this.params.add(ip);
		return this.call("addUserLog");
	},
	addUserLogA: function(uid, hostname, userlok, ip){
		this.params.clear();
		this.params.add(uid);
		this.params.add(hostname);
		this.params.add(userlok);
		this.params.add(ip);
		this.callAsynch("addUserLog");
	},
	logout: function(sesId){
		this.params.clear();
		this.params.add(sesId);	
		return this.call("logout");
	},
	logoutA: function(sesId){
		this.params.clear();
		this.params.add(sesId);	
		this.callAsynch("logout");
	},
	addUserFormAccess: function(uid, form, userlok, sesId ){
		this.params.clear();
		this.params.add(uid);
		this.params.add(form);
		this.params.add(userlok);
		this.params.add(sesId);
		return this.call("addUserFormAccess");
	},
	addUserFormAccessA: function(uid, form, userlok, sesId ){
		this.params.clear();
		this.params.add(uid);
		this.params.add(form);
		this.params.add(userlok);
		this.params.add(sesId);
		this.callAsynch("addUserFormAccess");
	},
	getData: function(table, keyField, keyValues, fieldReturn,allFields){
		if (keyField.length != keyValues.length){
			systemAPI.alert(this, "Programming Error","keyField and keyValues has different length");
			return false;
		}
		uses("server_util_arrayMap");
		fields = new server_util_Map();
		for (var i=0;i<keyField.length;i++)
			fields.set(i, keyField[i]);
		values = new server_util_Map();	
		for (var i=0;i<keyValues.length;i++)
		values.set(i,keyValues[i]);
		return this.locateData(table,fields, values, fieldReturn,allFields);
	},
	execMasterDetailSQL: function(sql){
		this.params.clear();
		this.params.add(sql);
		return this.call("execMasterDetailSQL");
	},
	bufferTable: function(table){
		this.params.clear();
		this.params.add(table);
		return this.call("bufferTable");
	},
	sqlToHtml: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);
		this.params.add(summary);
		return this.call("sqlToHtml");
	},
	sqlToHtmlA: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);
		this.params.add(summary);
		this.callAsynch("sqlToHtml");
	},
	sqlToHtmlGrouping: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);
		return this.call("sqlToHtmlGrouping");
	},
	sqlToHtmlGroupingA: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);
		this.callAsynch("sqlToHtmlGrouping");
	},
	sqlToXls: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy,file){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);
		this.params.add(file);	
		return this.getUrl("sqlToXls");
	},
	sqlToPdf: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		this.params.clear();
		this.params.add(sql);
		this.params.add(page);
		this.params.add(rowPerPage);
		this.params.add(title);
		this.params.add(width);
		this.params.add(fieldType);
		this.params.add(withTotal);
		this.params.add(groupBy);	
		return this.getUrl("sqlToPdf");
	},
	updateEngine: function(){
		this.params.clear();
		return this.call("updateEngine");
	},
	updateEngineA: function(){
		this.params.clear();
		this.callAsynch("updateEngine");
	},
	getDataXML: function(sql){
		this.params.clear();
		this.params.add(sql);
		return this.call("getDataXML");
	},
	getDataXMLA: function(sql){
		this.params.clear();
		this.params.add(sql);
		this.callAsynch("getDataXML");
	},
	killAllConnection:function(){
		this.params.clear();		
		this.callAsynch("killAllConnection");
	},
	getPeriodeFromSQL: function(sql){
		try{
			var data = this.getDataProvider(sql,true);
			if (data.rs.rows[0] !== undefined){
				return data.rs.rows[0].periode;
			}else throw(data);
		}catch(e){			
			systemAPI.alert(e);
			return "";
		}
	},
	setItemsFromSQL: function(sql, items){
		try{
			var data = this.getDataProvider(sql,true);
			if (data.rs.rows[0] !== undefined){
				var line, values = [];
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					for (var l in line)
					values[values.length] = line[l];
				}
				for (var i in items){
					for (var v in values)
						items[i].set(v,values[v]);
				}
			}
		}catch(e){			
			systemAPI.alert(e);
			return "";
		}
	},
	getTableStructure: function(table){
		this.params.clear();
		this.params.add(table);
		return this.call("getTableStructure");
	},
	getTableStructureA: function(table){
		this.params.clear();
		this.params.add(table);
		this.callAsynch("getTableStructure");
	},
	getAllTableStructure: function(table){
		this.params.clear();
		this.params.add(table);
		return this.call("getAllTableStructure");
	},
	getAllTableStructureA: function(table){
		this.params.clear();
		this.params.add(table);
		this.callAsynch("getAllTableStructure");
	}
});