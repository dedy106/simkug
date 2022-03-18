//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("server_simpleRemoteObject");
window.util_dbLarge = function(connection,options){
	try{					
		if (options == undefined) options = system.getActiveApplication()._dbSetting;
		window.util_dbLarge.prototype.parent.constructor.call(this, connection,options);		
		this.remoteClassName= "server_DBConnection_dbLib";
		this.className = "util_dbLarge";
		this.requester = undefined;	
	}catch(e){
		alert("[util_dbLarge] :: constructor : " + e);
	}
};
window.util_dbLarge.extend(window.server_simpleRemoteObject);
window.util_dbLarge.implement({
	setRequester: function(data){
		this.requester = data;
	},		
	getAllTables: function(){
		this.params = "";
		return this.call("getAllTables");
	},
	getAllTableStructure: function(){
		this.params = "";
		return this.call("getAllTableStructure");
	},
	getAllTablesA: function(){
		this.params = "";
		this.callAsynch("getAllTables");
	},
	getDataProvider: function(sql, isObject){
		try{		
			this.params = urlencode(sql);	
			var ret = this.call("getDataProvider");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,ret);
			else alert("[util_dbLarge]::dataProvider : " + e+"\r\n"+ret);
		}
	},
	getDataProviderA: function(sql,callback){
		try{			
			this.params = urlencode(sql);
			this.callAsynch("getDataProvider",callback);
		}catch(e)
		{
			if (systemAPI !== undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},
	getDataProviderDirectA: function(sql,callback){
		try{			
			this.params = urlencode(sql);
			this.callAsynch("getDataProviderDirect",callback);
		}catch(e)
		{
			if (systemAPI !== undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},
	getDataProviderPage: function(sql,start, offset, isObject){
		try{
			
			this.params = urlencode(sql)+"#"+start+"#"+offset;			
			var ret = this.call("getDataProviderPage");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");		
			return ret;
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},	
	
	getDataProviderPageA: function(sql,start, offset){
		try{
			
			this.params = urlencode(sql)+"#"+start+"#"+offset;
			this.callAsynch("getDataProviderPage");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},
	getDataProviderPageDirectA: function(sql,start, offset){
		try{
			
			this.params = urlencode(sql)+"#"+start+"#"+offset;
			this.callAsynch("getDataProviderPageDirect");
		}catch(e)
		{
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},
	getMultiDataProvider: function(sql, isObject){
		try{		
			this.params = urlencode(sql);
			var ret = this.call("getMultiDataProvider");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");			
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},
	getMultiDataProviderA: function(sql){
		try{		
			this.params = urlencode(sql);
			this.callAsynch("getMultiDataProvider");						
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::dataProvider : " + e,"");
			else alert("[util_dbLarge]::dataProvider : " + e);
		}
	},	
	getRowCount: function(sql, rowPerPage){
		this.params = urlencode(sql)+"#"+rowPerPage;
		return this.call("getRowCount");
	},
	getRowCountA: function(sql, rowPerPage){
		this.params = urlencode(sql)+"#"+rowPerPage;
		this.callAsynch("getRowCount");
	},
	execQuery: function(sql){
		this.params = urlencode(sql);
		this.callAsynch("execQuery");
	},
	execQueryA: function(sql){
		this.params = urlencode(sql);
		this.callAsynch("execQuery");
	},	
	execQuerySync: function(sql){
		this.params = urlencode(sql);
		return this.call("execQuery");
	},
	execArraySQL: function(sql){
		this.params = urlencode(sql);
		this.callAsynch("execArraySQL");
	},
	execArraySQLA: function(sql){
		this.params = urlencode(sql);
		return this.call("execArraySQL");
	},
	backupTable: function(tableList,allTable,lokasi){
	   var table = tableList.getLength() == 1 ? tableList.objList.toString()+"<array>":tableList.objList.toString().replace(/,/gi,"<array>");
	   this.params = urlencode(table)+"#"+allTable+"#"+lokasi; 
	   this.callAsynch("backupTable");
    },
    sqlBackup: function(sql){
	   this.params = urlencode(sql); 
	   this.callAsynch("sqlBackup");
    },
	loginSQL: function(sql, isObject){
		try{		
			this.params = urlencode(sql);
			var ret = this.call("loginSQL");
			if (isObject) ret = JSON.parse(ret);//eval("ret = "+ret+";");			 
			return ret;
		}catch(e){
			if (systemAPI != undefined)
				systemAPI.alert("[util_dbLarge]::loginSQL : " + e,ret);
			else alert("[util_dbLarge]::loginSQL : " + e+"\r\n"+ret);
		}
	},
	sqlToHtml: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary, groupHeader){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+summary;		        
		return this.call("sqlToHtml");
	},
	sqlToHtmlURL: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary, groupHeader){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
		if (groupHeader){
			groupHeader = groupHeader.getLength() == 1 ? groupHeader.objList.toString()+"<array>":groupHeader.objList.toString().replace(/,/gi,"<array>");
			groupHeader = urlencode(groupHeader);
		}
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+urlencode(summary)+"#"+groupHeader;		        
		return this.getUrl("sqlToHtml");
	},
	sqlToHtmlWithHeader: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary, groupHeader,calField, formHeader, lokasi, periode, totalPerGroup){
		if (groupBy)
			var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        else var group = "";
        if (groupHeader)
			groupHeader = groupHeader.getLength() == 1 ? groupHeader.objList.toString()+"<array>":groupHeader.objList.toString().replace(/,/gi,"<array>");
        else groupHeader = "";
        if (summary) summary = summary.objList.toString().replace(/,/gi,"<array>");        
		this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+urlencode(summary)+"#"+urlencode(groupHeader)+"#"+calField+"#"+urlencode(formHeader)+"#"+urlencode(lokasi)+"#"+urlencode(periode)+"#"+urlencode(totalPerGroup);						
		return this.call("sqlToHtmlWithHeader");
	},
	sqlToHtmlWithHeaderR: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary, groupHeader,calField, formHeader, lokasi, periode, totalPerGroup){
		if (groupBy)
			var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        else var group = "";
        if (groupHeader)
			groupHeader = groupHeader.getLength() == 1 ? groupHeader.objList.toString()+"<array>":groupHeader.objList.toString().replace(/,/gi,"<array>");
        else groupHeader = "";
        if (summary) summary = summary.objList.toString().replace(/,/gi,"<array>");
		this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+urlencode(summary)+"#"+urlencode(groupHeader)+"#"+calField+"#"+urlencode(formHeader)+"#"+urlencode(lokasi)+"#"+urlencode(periode)+"#"+urlencode(totalPerGroup);
		return this.getObjToParam("sqlToHtmlWithHeader");
	},
	sqlToHtmlA: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy, summary, groupHeader){
        var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+summary;		        
        this.callAsynch("sqlToHtml");
	},
	sqlToHtmlGrouping: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group);		        
		return this.call("sqlToHtmlGrouping");
	},
	sqlToHtmlGroupingA: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group);		        
		this.callAsynch("sqlToHtmlGrouping");
	},
	sqlToXls: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy,file){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group)+"#"+urlencode(file);		        
		this.callAsynch("sqlToXls");
	},
	sqlToPdf: function(sql,page,rowPerPage, title,width, fieldType, withTotal,groupBy){
		var group = groupBy.getLength() == 1 ? groupBy.objList.toString()+"<array>":groupBy.objList.toString().replace(/,/gi,"<array>");
        this.params = urlencode(sql)+"#"+page+"#"+rowPerPage+"#"+urlencode(title.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(width.objList.toString().replace(/,/gi,"<array>"))+"#"+urlencode(fieldType.objList.toString().replace(/,/gi,"<array>"))+"#"+withTotal+"#"+urlencode(group);		        
		this.callAsynch("sqlToPdf");
	},
	getJurnalHtml: function(sql,sql2){		
        this.params = urlencode(sql)+"#"+urlencode(sql2);
		return this.call("getJurnalHtml");
	}
});
