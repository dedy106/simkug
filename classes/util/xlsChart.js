//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_xlsChart = function(connection){
	try{
		this.remoteClassName = "server_util_xlsChart";
		window.util_xlsChart.prototype.parent.constructor.call(this, connection);
		this.className = "util_xlsChart";
		this.filename = "chart.xls";
		this.series = new server_util_arrayList();		
	}catch(e){
		systemAPI.alert("[util_xlsChart]::constructor:" + e);
	}
};
window.util_xlsChart.extend(window.server_RemoteObject);
window.util_xlsChart.implement({
	indexToColumn: function(index){
		return system.charCode[65 + index];
	},
	setFilename: function(filename){
		this.filename = filename;
	},
	setData : function(data){
		this.data = new server_util_arrayList();
		for (var i in data){			
			if (typeof data[i] == "object") this.data.add(new server_util_arrayList({items:data[i]}));
			else this.data.add(data[i]);
		}
	},
	setChartType: function(chartType){
		this.chartType = chartType;
	},
	addSeries: function(name, categories, values){		
		this.series.add(new server_util_arrayList({items:[name, categories, values]}));
	},
	setTitle: function(title){
		this.title = title;
	},
	setXTitle: function(title){
		this.xTitle = title;
	},
	setYTitle: function(title){
		this.yTitle = title;
	},
	setColTitle: function(title){		
		this.colTitle = new server_util_arrayList({items:title});
	},
	getChart2: function(){
		this.params.clear();
		this.params.add(this.filename);
		this.params.add(this.title);
		this.params.add(this.data);
		this.params.add(this.chartType);
		this.params.add(this.series);
		this.params.add(this.xTitle);
		this.params.add(this.yTitle);
		this.params.add(this.colTitle);
		return this.call("getChart");
	},
	getChart: function(){
		this.params.clear();
		this.params.add(this.filename);
		this.params.add(this.title);
		this.params.add(this.data);
		this.params.add(this.chartType);
		this.params.add(this.series);
		this.params.add(this.xTitle);
		this.params.add(this.yTitle);
		this.params.add(this.colTitle);
		return this.getRequestObj("getChart");
	}
});
