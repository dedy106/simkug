//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_highchart = function(owner, options){	
	try
	{
		window.portalui_highchart.prototype.parent.constructor.call(this,owner, options);
		this.className = "portalui_highchart";							
		this.onObjectReady = new portalui_eventHandler();		
		this.loaded = false;
		this.ready = false;
		this.onClick = new portalui_eventHandler();
		if (options !== undefined){
			this.updateByOptions(options);
			if (options.resourceOwner) this.resourceOwner = options.resourceOwner;
			if (options.params) this.params = options.params;
			if (options.title) this.title = options.title;
			if (options.objectReady) this.onObjectReady.set(options.objectReady[0],options.objectReady[1]);
			if (options.click) this.onClick.set(options.click[0], options.click[1]);
		}		
	}catch(e){
		alert("initFlash " + e);
	}
};
window.portalui_highchart.extend(window.portalui_control);
window.highchart = window.portalui_highchart;
window.portalui_highchart.implement({
	doDraw: function(canvas){
		var html = "<iframe id='"+this.getFullId() +"_hc' name='"+this.getFullId() +"_hc' frameborder=0 src='highchart.php?resId="+this.getResourceId()+"' style='position:absolute;left:0px;top:0px;width:100%;height:100%;'></iframe>";					
		canvas.innerHTML = html;
	},
	loadFlash : function(flash){
		try{
			var obj = $(this.getFullId() +"_hc");	
			
		}catch(e){
			alert("loading flash "+e);
		}
	},
	objectReady: function(){	   
		try{
			this.ready = true;
			this.loaded = false;
			this.onObjectReady.call(this);
			this.refresh();
			
		}catch(e){
			error_log(e);
		}
    },
	setChartData: function(data, autoRefresh){
		this.chartData = data;
		if (this.ready){
			var iframe = $(this.getFullId() +"_hc");
			if (iframe) {
			   var iframeContent = (iframe.contentWindow || iframe.contentDocument); 
			   iframeContent.setChartData(data);
			}
		}
	},
	refresh: function(){		
		if (this.chartData !== undefined && this.ready){
			var iframe = $(this.getFullId() +"_hc");
			if (iframe) {
			   var iframeContent = (iframe.contentWindow || iframe.contentDocument); 
			   iframeContent.setChartData(this.chartData);
			}
		}
	},
	getChart: function(){
		if (this.chartData !== undefined && this.ready){
			var iframe = $(this.getFullId() +"_hc");
			if (iframe) {
			   var iframeContent = (iframe.contentWindow || iframe.contentDocument); 
			   return iframeContent.getChart();
			}
		}	
		return false;
	},
	pointClick: function(seriesName, x, y){
		this.onClick.call(this, seriesName, x, y);
	},
	updateChart: function(){
		this.getChart().chart.redraw();
	}
});
