//******************************************************************************
//* Copyright (c) 2009 PT SAI
//* All rights reserved. This program and the accompanying materials
//* are made available under the terms of the Common Public License v1.0
//* which accompanies this distribution, and is available at
//*  inspire by 
//*
//* Contributors:
//*     Saltanera Teknologi, PT. - Initial API and implementation
//******************************************************************************
window.portalui_chart = function(owner,options){
    try{
	    if (owner)
	    {
		this.leftPadding = 40;
		this.rightPadding = 60;
		this.bottomPadding = 20;
		this.showBorder = true;
		this.bgColor = "#FFFFFF";
		this.chartType = 1;
		this.maxValue = 100;
		this.minValue = 0;	
			this.circle = 0;	
		this.title = "Chart";
			this.useProvider = false;
		this.series = new portalui_arrayMap();        
		window.portalui_chart.prototype.parent.constructor.call(this, owner,options);
		this.className = "portalui_chart";
			this.onSeriesClick = new portalui_eventHandler();
			this.onAfterDraw = new portalui_eventHandler();
		if (document.all){
		    var node = $(this.getFullId() + "_canvas");
		    window.G_vmlCanvasManager.initElement(node);
		}        
		this.categoryPos = new portalui_arrayMap();               		
	}    
	    
		if (options !== undefined){
				this.updateByOptions(options);
				if (options.dataProvider !== undefined) this.setDataProvider(options.dataProvider);
				if (options.chartType !== undefined) this.setChartType(options.chartType);
				if (options.title !== undefined) this.setTitle(options.title);
				if (options.afterDraw !== undefined) this.onAfterDraw.set(options.afterDraw[0], options.afterDraw[1]);
				if (options.leftPadding !== undefined) this.setLeftPadding(options.leftPadding);
				if (options.rightPadding !== undefined) this.setRightPadding(options.rightPadding);
				if (options.bottomPadding !== undefined) this.setBottomPadding(options.bottomPadding);
			}		
			uses("portalui_timer");
			this.timer = new portalui_timer(this);
			this.timer.setInterval(1000);
			this.timer.onTimer.set(this,"doAnimate");
			this.timer.setEnabled(false);
	}catch(e){
		systemAPI.alert(e);
	}
};
window.portalui_chart.imgLoad = function(e){
    try{
    	var target = e.srcElement || e.target;	
    	window.portalui_chart.imageLoader.set(target.src,true);	
   	}catch(e){
   	    systemAPI.alert(e);
    }
};
if (window.portalui_chart.bullets == undefined){
	window.portalui_chart.imageLoader = new portalui_arrayMap();
	window.portalui_chart.bullets = new portalui_arrayList();
	window.portalui_chart.colors = new portalui_arrayList();
	window.portalui_chart.barLegends = new portalui_arrayList();
	window.portalui_chart.bar = new portalui_arrayList();
	window.portalui_chart.barColors = new portalui_arrayList();
	var img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/0-trans.png";
	window.portalui_chart.bullets.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/1-trans.png";
	window.portalui_chart.bullets.add(img);		
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/2-trans.png";	   
	window.portalui_chart.bullets.add(img);			
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/3-trans.png";
	window.portalui_chart.bullets.add(img);
    img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/4-trans.png";
	window.portalui_chart.bullets.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/5-trans.png";
	window.portalui_chart.bullets.add(img);
    img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/6-trans.png";
	window.portalui_chart.bullets.add(img);    
    img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/7-trans.png";
	window.portalui_chart.bullets.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/8-trans.png";
	window.portalui_chart.bullets.add(img);	    
    	
	window.portalui_chart.colors.add("rgba(255, 0, 0,0.7)");
	window.portalui_chart.colors.add("rgba(0, 255, 0,0.7)");
	window.portalui_chart.colors.add("rgba(0, 0, 255,0.7)");
	window.portalui_chart.colors.add("rgba(255, 153, 0,0.7)");
	window.portalui_chart.colors.add("rgba(255, 0, 255,0.7)");
	window.portalui_chart.colors.add("rgba(0, 255, 255,0.7)");
	window.portalui_chart.colors.add("rgba(255, 255, 100,0.7)");
	window.portalui_chart.colors.add("rgba(70, 153, 55,0.7)");
	window.portalui_chart.colors.add("rgba(33, 153, 226,0.7)");		
	window.portalui_chart.colors.add("rgba(104, 121, 167,0.7)");
	window.portalui_chart.colors.add("rgba(213, 94, 100,0.7)");
	window.portalui_chart.colors.add("rgba(150, 114, 178,0.7)");		
	window.portalui_chart.colors.add("rgba(252, 16, 235,0.7)");
	window.portalui_chart.colors.add("rgba(120, 152, 81,0.7)");
	window.portalui_chart.colors.add("rgba(118, 189, 161,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/0-legend.gif";
	window.portalui_chart.barLegends.add(img);

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/0.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(153, 102, 102,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/1-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/1.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(102, 153, 153,0.7)");
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/2-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/2.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(51, 102, 51,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/3-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/3.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(153, 102, 153,0.7)");	
	
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/4-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/4.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(153, 153, 153,0.7)");
	
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/5-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/5.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(153, 102, 102,0.7)");	
	
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/6-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/6.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(62, 153, 153,0.7)");	

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/7-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/7.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(151, 202, 51,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/8-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/8.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(53, 152, 153,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/line/9-trans.png";
	window.portalui_chart.bullets.add(img);


	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/9-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/9.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(13, 153, 153,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/10-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/10.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(13, 13, 153,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/11-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/11.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(123, 233, 153,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/12-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/12.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(145, 53, 13,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/13-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/13.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(13, 253, 153,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/14-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/14.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(253, 23, 53,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/15-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/15.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(253, 35, 213,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/16-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/16.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(150, 132, 13,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/17-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/17.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(175, 13, 255,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/18-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/18.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(230, 139, 53,0.7)");

	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/19-legend.gif";
	window.portalui_chart.barLegends.add(img);
	img = new Image();		   
	eventOn(img,"load","window.portalui_chart.imgLoad(event)");
	img.src = "image/chart/bar/19.gif";
	window.portalui_chart.bar.add(img);
	window.portalui_chart.barColors.add("rgba(215, 123, 253,0.7)");
}
window.portalui_chart.extend(window.portalui_containerControl);
window.chart = window.portalui_chart ;
//---------------------------- Function ----------------------------------------
window.portalui_chart.implement({	
	doDraw : function(canvas){
	    var n = this.getFullId();	  
		var min = 25;
        var html =  "<div id='" + n + "_shadow1' style='{position: absolute;left: 1;top: 1;width: 100%;height: 100%;border-right: 1px solid #999999;border-bottom: 1px solid #999999;}'></div>" +
	                "<div id='" + n + "_shadow2' style='{position: absolute;left: 2;top: 2;width: 100%;height: 100%;border-right: 1px solid #bbbbbb;border-bottom: 1px solid #bbbbbb;}'></div>" +
					"<div id='" + n + "_shadow3' style='{position: absolute;left: 3;top: 3;width: 100%;height: 100%;border-right: 1px solid #cccccc;border-bottom: 1px solid #cccccc;}'></div>" +
					"<div id='" + n + "_shadow4' style='{position: absolute;left: 4;top: 4;width: 100%;height: 100%;border-right: 1px solid #dddddd;border-bottom: 1px solid #dddddd;}'></div>" +	                	                 
					 "<div id='" + n + "_frame' style='{position : absolute; left: 0; top: 0; width: 100%; height: 100%;overflow: hidden;background: #FFFFFF;border: 1px solid #90c2f8}'>" +
	                    "<div id='" + n + "_title' style='{position : absolute;left: 0; top: 2; width: 100%; height: 30; text-align: center;font-weight: bold;font-size: 12pt;}'>Title</div>" +
	                    "<div id='" + n + "_legend' style='{position : absolute;left: " + (this.width - this.rightPadding).toString() + "; top: 25; width: " + this.rightPadding + "; height: " + (this.height - this.bottomPadding - min).toString() + ";overflow: auto;}'></div>" +
						"<div id='" + n + "_legendHor' style='{position : absolute;left: " + this.leftPadding + "; top: " + (this.height - this.bottomPadding).toString() + "; width: " + (this.width - this.leftPadding - this.rightPadding).toString() + "; height: " + this.bottomPadding + ";font-size: 6pt}'></div>" +
						"<div id='" + n + "_legendVer' style='{position : absolute;left: -2; top: 17; width: " + this.leftPadding + "; height: " + (this.height - this.bottomPadding - min).toString() + ";}'></div>" +
						"<canvas id='" + n + "_canvas' width='" + this.canvasWidth + "' height='" + this.canvasHeight + "' style='{position: absolute;border-left: 2px solid #d7d9ff; border-bottom: 2px solid #d7d9ff;left: " + this.leftPadding + "; top: 25; width: " + (this.width - this.leftPadding - this.rightPadding).toString() + "; height: " + (this.height - this.bottomPadding - min).toString() + ";}' "+
							"onMouseMove ='$$(" + this.resourceId + ").eventMouseMove(event);' " +
							"onMouseDown ='$$(" + this.resourceId + ").eventMouseClick(event);' " +
						" ></canvas>" +
	                "</div>";
					"<div id='" + n + "form' style='{position : absolute; left: 0; top: 0; width: 100%; height: 100%;}' " +
	                    //"onMouseMove ='$$(" + this.resourceId + ").eventMouseMove(event);' " +
						//"onMouseDown ='$$(" + this.resourceId + ").eventMouseClick(event);' " +
	                 "></div>"+
	    this.setInnerHTML(html, canvas);
	},
	eventMouseMove: function(event){
		try{
		    var x = 0;
		    var y = 0;

		    if (document.all)
		    {
		        x = event.offsetX;
		        y = event.offsetY;
		    }
		    else
		    {
		        x = event.layerX;
		        y = event.layerY;
		    }		    		    
		    var found = false;		  
		    //if ((x > this.leftPadding) && (x < (this.width - this.rightPadding)) &&
		    //    (y > 25) && (y < (this.height - this.bottomPadding)))
		    {
		        //x = this.leftPadding;
		        //y = 25;
		        
		        if (this.chartType == 1) // line chart
		        {
		            var title = x + "---> ";
		            
		            for (var xleft in this.categoryPos.objList)
		            {
		                xleft = parseInt(xleft, 10);
		                
		                if ((x > xleft) && (x < (xleft + 10)))
		                {
		                    var list = this.categoryPos.objList[xleft];
		                    
		                    for (var ytop in list.objList)
		                    {
		                        ytop = parseInt(ytop, 10);						
		                        if ((y > ytop) && (y < (ytop + 5)))
		                        {
		                            title = list.objList[ytop];								
		                            //this.getCanvas().title = title;
									system.showHint(event.clientX, event.clientY,title == undefined ? "" : title,true);                                                        
		                            found = true;
		                            break;
		                        }
		                    }
		                    break;
		                }
		            }
		        }
		        else if (this.chartType == 2) // line chart// bar chart
		        {
					if (this.useProvider){					
						var firstSerie;
						for (var i in this.dataProvider) {
							firstSerie = this.dataProvider[i];
							break;
						}
					}else
						if (this.series.getLength() > 0)
							var firstSerie = this.series.getByIndex(0).objList;											
					if (firstSerie==undefined) return;
					if (this.useProvider){
						var serLength = 0;
						for (var i in this.dataProvider) serLength++;
					}else 
						var serLength = this.series.getLength();		   			
					var firstSerieLength = 0;
					for (var j in firstSerie) firstSerieLength++;
					var catLength = firstSerieLength++;
					var catWidth = parseInt(this.canvasWidth / catLength, 10);
					var left = 0;
					var partStart = parseInt(catWidth / 8, 10);
			        var partWidth = parseInt((catWidth - (2 * partStart)) / serLength, 10) - 3;

			        if (partWidth < 1)
			            partWidth = 1;

			        left = 0;
			        var value,top;
			        var j;
					var height = this.canvasHeight;
			        var index = 0;
			        var serie;
			        var leftStart = partStart;
			        var partHeight;
			        var imgBorder;
					var maxValue = this.maxValue + 0.5;
			        var minValue = this.minValue - 0.5;
			        var range = maxValue- minValue;
					if (this.useProvider)
						var series = this.dataProvider;
					else var series = this.series.objList;
					for (var i in series){
						serie = series[i];					
						if (!this.useProvider) serie = serie.objList;
			            left = leftStart;	           
			            for (j in firstSerie){
			                value = serie[j];					
			                if (value != undefined)
			                {
			                    //value = value - minValue;					    
			                    partHeight = parseInt(((value / range) * height), 10);
			                    top = height - partHeight;
						var title = i +": "+value;
						if (x >= left && x <= left + partWidth && y >= top && y <= top + partHeight){							
							//this.getCanvas().title = title;							
							system.showHint(event.clientX, event.clientY,title,true);
							return true;	
						}													
			                }
			                
			                left += catWidth;
			            }
			            index++;
			            leftStart += (partWidth + 3);
			        }	
		        }else if (this.chartType == 4){			
					var height = this.canvasHeight;
					var width = this.canvasWidth;
				    var ytotal=0;
					
					if (this.useProvider){					
						var firstSerie;
						var series = this.dataProvider;
						for (var i in this.dataProvider) {
							firstSerie = this.dataProvider[i];
							break;
						}
					}else{
						if (this.series.getLength() > 0)
							var firstSerie = this.series.getByIndex(0).objList;
						var series = this.series.objList;	
					}
					if (firstSerie == undefined) return;					
					var firstSerieLength = 0;
					for (var j in series) firstSerieLength++;
					
					width = width / firstSerieLength;
					var seriesIndex = 0;
					maxValue = 100;
					minValue = 0;
					for (var s in series){
						firstSerie = series[s];
						var ytotal=0;
						if (!this.useProvider) firstSerie = firstSerie.objList;											
						var value;
						var values = [], labels = [];
						for (var i in firstSerie) {
							ytotal += parseFloat(firstSerie[i]);										
						}  				
						for (var i in firstSerie) {
							value = parseFloat(firstSerie[i]);
							values.push(value);
							labels.push(i);
					    }    				
					    var range = maxValue - minValue;	
						var min = (height < width ? height : width);
					    if (range > height) range = (min/ range) * 0.80;	
						else range = min / range * range * 0.80;
						var radius = range  / 2;
					    var centerx = (width / 2 + minValue);
					    var centery = (height / 2 + minValue);    
						centerx += (width * seriesIndex);	
						seriesIndex++;
					    var counter = 0.0;
						var rx = Math.abs(x - centerx);
						var ry = Math.abs(y - centery);
						var dx = radius;//Math.sqrt((rx *rx) + (ry * ry));
						var xt, yt, fraction;		    
						if (dx > radius) return;							
					    for (var i = 0; i < values.length; i++) 
						{									
					        fraction = values[i] / ytotal;					      								
							var x1 = Math.round(centerx + Math.sin(counter * Math.PI * 2) * dx);
					        var y1 = Math.round(centery - Math.cos(counter * Math.PI * 2) * dx);					
					        var x2 = Math.round(centerx + Math.sin((counter + fraction) * Math.PI * 2)* dx);
					        var y2 = Math.round(centery - Math.cos((counter + fraction) * Math.PI * 2)* dx);				
							xt = (x1 < x2 ? x1 : x2);x2 = (x1 > x2 ? x1 : x2);x1 = xt;
							yt = (y1 < y2 ? y1 : y2);y2 = (y1 > y2 ? y1 : y2);y1 = yt;				
							if (x >= x1 && x <= x2 && y>=y1&& y<=y2)
							{
								//this.getCanvas().title =labels[i]+":"+values[i];
								system.showHint(event.clientX, event.clientY,labels[i]+":"+values[i],true);
								return true;	
							}
							counter += fraction;
						}
					}
				}
		    }        
		}
		catch (e){
		    alert(e);
		}
	},
	eventMouseClick: function(event){
		try
		{
		    var x = 0;
		    var y = 0;
		    if (document.all){
		        x = event.offsetX;
		        y = event.offsetY;
		    }else{
		        x = event.layerX;
		        y = event.layerY;
		    }
		    
		    var found = false;
		    
		    //if ((x > this.leftPadding) && (x < (this.width - this.rightPadding)) &&
		    //    (y > 25) && (y < (this.height - this.bottomPadding)))
		    {
		        //x = this.leftPadding;
		        //y = 0;25;
		        
		        if (this.chartType == 1) // line chart
		        {
		            var title = x + "---> ";
		            
		            for (var xleft in this.categoryPos.objList)
		            {
		                xleft = parseInt(xleft, 10);
		                
		                if ((x > xleft) && (x < (xleft + 10)))
		                {
		                    var list = this.categoryPos.objList[xleft];
		                    
		                    for (var ytop in list.objList)
		                    {
		                        ytop = parseInt(ytop, 10);
		                        
		                        if ((y > ytop) && (y < (ytop + 10)))
		                        {
		                            var title = list.objList[ytop];
		                            var width = title.length * 5;
		                            
		                            if (width < 50)
		                                width = 50;
		                                
		                            var left = xleft + 30 + this.leftPadding;		                    
									this.onSeriesClick.call(this,title);                            
		                            found = true;
		                            break;
		                        }
		                    }
		                    break;
		                }
		            }
		        }
		        else if (this.chartType == 2) // bar chart
		        {
					if (this.useProvider){					
						var firstSerie;
						for (var i in this.dataProvider) {
							firstSerie = this.dataProvider[i];
							break;
						}
					}else
						if (this.series.getLength() > 0)
							var firstSerie = this.series.getByIndex(0).objList;
					if (firstSerie==undefined) return;
					if (this.useProvider){
						var serLength = 0;
						for (var i in this.dataProvider) serLength++;
					}else 
						var serLength = this.series.getLength();		   			
					var firstSerieLength = 0;
					for (var j in firstSerie) firstSerieLength++;
					var catLength = firstSerieLength++;
					var catWidth = parseInt(this.canvasWidth / catLength, 10);
					var left = 0;
					var partStart = parseInt(catWidth / 8, 10);
			        var partWidth = parseInt((catWidth - (2 * partStart)) / serLength, 10) - 3;

			        if (partWidth < 1)
			            partWidth = 1;

			        left = 0;
			        var value,top;
			        var j;
					var height = this.canvasHeight;
			        var index = 0;
			        var serie;
			        var leftStart = partStart;
			        var partHeight;
			        var imgBorder;
					var maxValue = this.maxValue + 0.5;
			        var minValue = this.minValue - 0.5;
			        var range = maxValue- minValue;
					if (this.useProvider)
						var series = this.dataProvider;
					else var series = this.series.objList;
					for (var i in series){
						serie = series[i];					
						if (!this.useProvider) serie = serie.objList;
			            left = leftStart;	           
			            for (j in firstSerie)
			            {
			                value = serie[j];
			                if (value != undefined)
			                {
			                    //value = value - minValue;
			                    partHeight = parseInt(((value / range) * height), 10);
			                    top = height - partHeight;
								var title = i +": "+value;
								if (x >= left && x <= left + partWidth && y >= top && y <= top + partHeight){
									this.onSeriesClick.call(this,j,title);
									return true;	
								}													
			                }
			                
			                left += catWidth;
			            }
			            index++;
			            leftStart += (partWidth + 3);
			        }
		        }
		    }
		    		        
		}catch (e){
		    alert(e);
		}
	},
	clear: function(){
		this.series.clear();
	},
	addSerieData: function(serieName, category, value){
	    var serie = this.series.get(serieName);
	    if (serie == undefined){
	        serie = new portalui_arrayMap();
	        this.series.set(serieName, serie);
	    }
	    serie.set(category, value);
	},
	detectMaxValue: function(){
	    for (var i in this.series.objList){}
	},
	formatNumber: function(data){
	    if (data == undefined)
	        data = 0;
	    var stringData = " " + data;
	    stringData = stringData.substring(1, stringData.length);
	    var pos = stringData.indexOf(".");
	    var digit = "00";	    
	    if (pos > 0){
	        digit = stringData.substring(pos + 1, pos + 3);
	        while (digit.length < 2)
	            digit += "0";
	        stringData = stringData.substring(0, pos);
	    }
	    var result = "";
	    var pos = 0;
	    for (var i = stringData.length - 1; i >= 0; i--){
	        result = stringData.charAt(i) + result;
	        pos++;
	        if ((pos == 3) && (i > 1))
	        {
	            result = "," + result;
	            pos = 0;
	        }
	    }
	    return result + "." + digit;
	},
	drawLine: function(ctx, width, height){
		try{
			if (this.useProvider){
				var serLength = 0;
				for (var i in this.dataProvider) serLength++;
			}else 
				var serLength = this.series.getLength();		   
		    if (serLength > 0)
		    {
		        // legend
		        var index = 0;
		        var img;
		        var html = "";
		        var top = 0;
		        var n = this.getFullId();
				if (this.useProvider)
					var series = this.dataProvider;
				else var series = this.series.objList;
				for (var i in series){
					img = window.portalui_chart.bullets.get(index % 10);						
					html += "<div style='position: absolute;left: 0; top: " + top + "; width: 100%; height: 14;overflow: hidden;'>" +
							   "<div style='position: absolute;left: 2; top: 2; width: 10; height: 10;background: url(" + img.src + ") no-repeat top left;'></div>" +
							   "<div style='position: absolute;left: 14; top: 1; width: 100%; height: 100%;font-size: 9pt;text-align:left' >" + i + "</div>" +
							"</div>";

					top += 14;
					index++;
				}
		        $(n + "_legend").innerHTML = html;
				if (this.useProvider){					
					var firstSerie;
					for (var i in this.dataProvider) {
						firstSerie = this.dataProvider[i];
						break;
					}
				}else
					var firstSerie = this.series.getByIndex(0).objList;
		        // legend hor
				var firstSerieLength = 0;
				for (var j in firstSerie) firstSerieLength++;
		        var catLength = firstSerieLength + 2;
		        var catWidth = parseInt(width / (catLength - 1), 10);
		        var left = parseInt(catWidth / 2, 10);
		        var lgt,is,verDraw = false;
				for (var i in firstSerie){
					is = " " + i;
					lgt = is.length * 4;
					if (lgt > catWidth){
						verDraw = true;
						break;
					}
				}				
		        html = "";
		        var isx;
		        if (verDraw){
					for (var i in firstSerie)
					{
						isx = "";
						is = i + " ";
						for (var ix = 0; ix < is.length; ix++){
							isx += is.charAt(ix) + "<br/>";
						}
						html += "<div style='position: absolute;left: " + left + "; top: 0; width: " + catWidth + "; height: 100%;overflow: hidden;'>" +
									"<div style='position: absolute;left: 0; top: 1; width: 100%; height: 100%;text-align: center;font-size: 7pt' >" + isx + "</div>" +
								"</div>";
						left += catWidth;
					}
				}else{
					for (var i in firstSerie)
					{
						html += "<div style='position : absolute;left: " + left + "; top: 0; width: " + catWidth + "; height: 100%;overflow: hidden;'>" +
									"<div style='position : absolute;left: 0; top: 1; width: 100%; height: 100%;text-align: center;font-size: 7pt' >" + i + "</div>" +
								"</div>";
						left += catWidth;
					}
		        }
		        $(n + "_legendHor").innerHTML = html;
		        // legend ver
		        var maxValue = this.maxValue;
		        var minValue = this.minValue;
		        if (minValue >= 0.5)
		            minValue -= 0.5;
		        if (maxValue != 100)
		            maxValue += 0.5;		        
		        var range = maxValue - minValue;
		        if (range == 0)
		        {
		            if (maxValue > 0)
		            {
		                range = maxValue;
		                minValue = 0;
		            }
		        }
		        if (maxValue == -1)
		            maxValue = this.detectMaxValue();
		        var lgnHeight = parseInt(height / 4, 10);
		        html = "<div style='position : absolute;left: 0; top: 0; width: 100%; height: auto;text-align: right;font-size: 8pt'>" + floatToNilai(round_decimals(maxValue,2)) + "</div>" +
		                "<div style='position : absolute;left: 0; top: " + parseInt(0.25 * height, 10).toString() + "; width: 100%; height: auto;text-align: right;font-size: 8pt'>" + floatToNilai(round_decimals(minValue + (0.75 * range),2)) + "</div>" +
		                "<div style='position : absolute;left: 0; top: " + parseInt(0.50 * height, 10).toString() + "; width: 100%; height: auto;text-align: right;font-size: 8pt'>" + floatToNilai(round_decimals(minValue + (0.50 * range),2)) + "</div>" +
		                "<div style='position : absolute;left: 0; top: " + parseInt(0.75 * height, 10).toString() + "; width: 100%; height: auto;text-align: right;font-size: 8pt'>" + floatToNilai(round_decimals(minValue + (0.25 * range),2)) + "</div>" +
		                "<div style='position : absolute;left: 0; top: " + height + "; width: 100%; height: auto;text-align: right;font-size: 8pt'>" + floatToNilai(round_decimals(minValue,2)) + "</div>";
		        $(n + "_legendVer").innerHTML = html;
		        left = 0;
		        var value;
		        var pos = new portalui_arrayList();
		        var first;
		        var j;
		        index = 0;
		        var serie;
		        var valList = new portalui_arrayList();
		        
		        this.categoryPos.clear();
		        var topList = undefined;
		        if (this.useProvider)
					var series = this.dataProvider;
				else var series = this.series.objList;
		        for (var i in series){
		            serie = series[i];					
					if (!this.useProvider) serie = serie.objList;
		            left = catWidth;
		            // draw line
		            pos.clear();
		            valList.clear();
		            ctx.beginPath();
		            first = true;
		            img = window.portalui_chart.bullets.get(index % 10);					
		            ctx.strokeStyle = window.portalui_chart.colors.get(index % 10);
					ctx.lineWidth = 4.0;						
		            for (var j in firstSerie){		                
						value = serie[j];									
		                valList.add(value);
		                if (value != undefined)
		                {
		                    value = value - minValue;
		                    top = height - parseInt(((value / range) * height), 10);
		                    pos.add(top - 5);
		                    if (first)
		                    {
		                        ctx.moveTo(left, top);
		                        first = false;
		                    }
		                    else
		                        ctx.lineTo(left, top);
		                }
		                else
		                {
		                    ctx.stroke();
		                    ctx.beginPath();
		                    first = true;
		                    pos.add(0);
		                }
		                
		                left += catWidth;
		            }

		            if (!first)
		                ctx.stroke();
		            
		            left = catWidth - 5;

		            for (j in pos.objList)
		            {
		                value = valList.get(j);
		                
		                if (value != undefined)
		                {
					top = pos.objList[j];
					img.title = j+":"+value;
					if (window.portalui_chart.imageLoader.get(img.src)) ctx.drawImage(img, left, top);		                    
					topList = this.categoryPos.get(left);
					if (topList == undefined) topList = new portalui_arrayMap();                    
					topList.set(top, j +":"+value);                    
					this.categoryPos.set(left, topList);
		                }
		                
		                left += catWidth;
		            }
		            index++;
		        }
		    }
			this.onAfterDraw.call(this, this.chartType);
		}catch (e){
		    systemAPI.alert(e);
		}
	},
	drawBar : function(ctx, width, height){
		try
		{
			if (this.useProvider){
				var serLength = 0;
				for (var i in this.dataProvider) serLength++;
			}else 
				var serLength = this.series.getLength();
		    if (serLength > 0)
		    {
		        // legend
		        var index = 0;
		        var img;
		        var html = "";
		        var top = 0;
		        var n = this.getFullId();
		        if (this.useProvider)
					var series = this.dataProvider;
				else var series = this.series.objList;
				for (var i in series){					
		            img = window.portalui_chart.barLegends.get(index % 10);
		            html += "<div style='position: absolute;left: 0; top: " + top + "; width: 100%; height: 14;overflow: hidden;'>" +
							   "<div style='position: absolute;left: 2; top: 4; width: 14; height: 8;background: url(" + img.src + ") no-repeat top left;'></div>" +
							   "<div style='position: absolute;left: 18; top: 1; width: 100%; height: 100%;font-size: 7pt;text-align:left;white-space: nowrap;' >" + i + "</div>" +
							"</div>";
		            top += 14;
		            index++;
		        }				
				$(n + "_legend").innerHTML = html;
		        if (this.useProvider){					
					var firstSerie;
					for (var i in this.dataProvider) {
						firstSerie = this.dataProvider[i];
						break;
					}
				}else
					if  (this.series.getLength() > 0)
						var firstSerie = this.series.getByIndex(0).objList;
		        // legend hor
				var firstSerieLength = 0;
				for (var j in firstSerie) firstSerieLength++;
		        var catLength = firstSerieLength;
		        var catWidth = parseInt(width / catLength, 10);
		        var left = 0;
		        var lgt;
		        var is;
		        var verDraw = false;
		        for (var i in firstSerie){
		            is = " " + i;
		            lgt = is.length * 6;
		            if (lgt > catWidth){
		                verDraw = true;
		                break;
		            }
		        }
		        html = "";
		        var isx;
		        if (verDraw){
		            /*for (var i in firstSerie)
		            {
		                isx = "";
		                is = i + " ";
		                for (var ix = 0; ix < is.length; ix++)
		                    isx += is.charAt(ix) + "<br/>";		                
		                html += "<div style='position: absolute;left: " + left + "; top: 0; width: " + catWidth + "; height: 100%;overflow: hidden;'>" +
			   				        "<div style='position: absolute;left: 0; top: 1; width: 100%; height: 100%;text-align: center;font-family:Arial;font-size: 6pt' >" + isx + "</div>" +
		    	   				"</div>";
		                left += catWidth;
		            }*/
					var top = 0, index = 0;						
					for (var i in firstSerie){
		                top = index % 2 != 0 ? 14 : 0;
						html += "<div style='position: absolute;left: " + left + "; top: "+top+"; width: " + catWidth + "; height: 100%;overflow: hidden;'>" +
			   				        "<div style='position: absolute;left: 0; top: 1; width: 100%; height: 100%;text-align: center;font-family:Arial;font-size: 6pt;white-space: nowrap;' >" + i + "</div>" +
		    	   				"</div>";
		                left += catWidth;
						index++;
		            }	
		        }else{
		            for (var i in firstSerie){
		                html += "<div style='position: absolute;left: " + left + "; top: 0; width: " + catWidth + "; height: 100%;overflow: hidden;'>" +
			   				        "<div style='position: absolute;left: 0; top: 1; width: 100%; height: 100%;text-align: center;font-family:Arial;font-size: 6pt;white-space: nowrap;' >" + i + "</div>" +
		    	   				"</div>";
		                left += catWidth;
		            }
		        }
		        $(n + "_legendHor").innerHTML = html;
		        // legend ver
		        var maxValue = this.maxValue + 0.5;
		        var minValue = this.minValue - 0.5;
		        var range = maxValue- minValue;
		        if (range == 0)
		        {
		            if (maxValue > 0)
		            {
		                range = maxValue;
		                minValue = 0;
		            }
		        }
		        
		        if (maxValue == -1)
		            maxValue = this.detectMaxValue();
		        var lgnHeight = parseInt(height / 4, 10);
		        html = "<div style='position: absolute;left: 0; top: 0; width: 100%; height: auto;text-align: right;font-size: 7pt'>" + floatToNilai(round_decimals(maxValue,2)) + "</div>" +
		                "<div style='position: absolute;left: 0; top: " + parseInt(0.25 * height, 10) + "; width: 100%; height: auto;text-align: right;font-size: 7pt'>" + floatToNilai(round_decimals(minValue + (0.75 * range),2)) + "</div>" +
		                "<div style='position: absolute;left: 0; top: " + parseInt(0.50 * height, 10) + "; width: 100%; height: auto;text-align: right;font-size: 7pt'>" + floatToNilai(round_decimals(minValue + (0.50 * range),2)) + "</div>" +
		                "<div style='position: absolute;left: 0; top: " + parseInt(0.75 * height, 10) + "; width: 100%; height: auto;text-align: right;font-size: 7pt'>" + floatToNilai(round_decimals(minValue + (0.25 * range),2)) + "</div>" +
		                "<div style='position: absolute;left: 0; top: " + height + "; width: 100%; height: auto;text-align: right;font-size: 7pt'>" + floatToNilai(round_decimals(minValue,2)) + "</div>";
		        $(n + "_legendVer").innerHTML = html;
		        var partStart = parseInt(catWidth / 8, 10);
		        var partWidth = parseInt((catWidth - (2 * partStart)) / serLength, 10) - 3;
		        if (partWidth < 1)
		            partWidth = 1;
		        left = 0;
		        var value;
		        var j;
		        index = 0;
		        var serie;
		        var leftStart = partStart;
		        var partHeight;
		        var imgBorder;
				if (this.useProvider)
					var series = this.dataProvider;
				else var series = this.series.objList;			
		        for (var i in series){
		            serie = series[i];
					if (!this.useProvider) serie = serie.objList;					
		            left = leftStart;
		            img = window.portalui_chart.bar.get(index % 10);
		            ctx.strokeStyle = window.portalui_chart.barColors.get(index % 10);
		            imgBorder = window.portalui_chart.barLegends.get(index % 10);
		            for (var j in firstSerie){
		                value = serie[j];								
		                if (value != undefined){
		                    value = value - minValue;
		                    partHeight = Math.max(parseInt(((value / range) * height)),0);
		                    top = Math.max(height - partHeight,0);					       							
					if (window.portalui_chart.imageLoader.get(img.src) || document.all)
					ctx.drawImage(img, left, top, partWidth, partHeight);				    	
					if (window.portalui_chart.imageLoader.get(imgBorder.src) || document.all)
					{ 
					    ctx.drawImage(imgBorder, 0, 0, 1, 1, left, top, 1, partHeight);
					    ctx.drawImage(imgBorder, 0, 0, 1, 1, left, top, partWidth, 1);
					    ctx.drawImage(imgBorder, 0, 0, 1, 1, left + partWidth, top, 1, partHeight);					    
						ctx.drawImage(imgBorder, 0, 0, 1, 1, left + partWidth+1, top+1, 1, partHeight-(partHeight <= 0 ? 0: 1));					
						ctx.drawImage(imgBorder, 0, 0, 1, 1, left + partWidth+2, top+2, 1, ( partHeight <= 1 ? partHeight-(partHeight <= 0 ? 0: 1) : partHeight-2));					
					}
		                }		                
		                left += catWidth;
		            }
		            index++;
		            leftStart += (partWidth + 3);
		        }
		    }
			this.onAfterDraw.call(this, this.chartType);
		}catch (e){
			systemAPI.alert(e);
		}		
	},
	drawPie: function(ctx, width, height){
		try{
			var context = ctx;		    
			var maxValue = this.maxValue;
		    var minValue = this.minValue;    			
			if (this.useProvider){					
				var firstSerie;
				var series = this.dataProvider;
				for (var i in this.dataProvider) {
					firstSerie = this.dataProvider[i];
					break;
				}
			}else{
				if (this.series.getLength() > 0)
					var firstSerie = this.series.getByIndex(0).objList;
				var series = this.series.objList;	
			}
			if (firstSerie == undefined) return;
			
			var firstSerieLength = 0;
			for (var j in series) firstSerieLength++;
			var top = 0,img="#ffff00", index=0;
			$(this.getFullId() + "_legend").innerHTML = "";			
			var html = "";
			for (var i in firstSerie){										
				img = window.portalui_chart.colors.get(index%15);				
				html += "<div style='position: absolute;left: 0; top: " + top + "; width: 100%; height: 14;overflow: hidden;'>" +
						   "<div style='position: absolute;left: 2; top: 4; width: 14; height: 8;background: "+img+";'></div>" +
						   "<div style='position: absolute;left: 18; top: 1; width: 100%; height: 100%;font-family:Arial;font-size:7pt;text-align:left' >" + i + "</div>" +
						"</div>";
				top += 14;				
				index++;
		    }			
			$(this.getFullId() + "_legend").innerHTML = html;	
			width = width / firstSerieLength;
			var seriesIndex = 0;
			maxValue = 100;
			minValue = 0;
			for (var s in series){
				firstSerie = series[s];
				var ytotal=0;
				if (!this.useProvider) firstSerie = firstSerie.objList;											
				var value;
				var values = [], labels = [];
				for (var i in firstSerie) {
					ytotal += parseFloat(firstSerie[i]);										
				}  				
				for (var i in firstSerie) {
					value = parseFloat(firstSerie[i]);
					values.push(value);
					labels.push(i);
			    }    				
			    var range = maxValue - minValue;	
				var min = (height < width ? height : width);
			    if (range > height) range = (min/ range) * 0.80;	
				else range = min / range * range * 0.80;
				var radius = range  / 2;
			    var centerx = (width / 2 + minValue);
			    var centery = (height / 2 + minValue);    
				centerx += (width * seriesIndex);					
			    var threeD = false;    				
			    var counter = 0.0;	   
				context.save();			
				context.translate(centerx, centery);				
				if (seriesIndex % 2 == 0)
					context.rotate(this.circle * Math.PI / 180);
				else context.rotate(-(this.circle * Math.PI / 180));
				centerx = 0;
				centery = 0;
				seriesIndex++;
				for (var i = 1;i < 6;i++)
					this.drawShadow(i,i,radius, (6-i)/5,context);											
				context.save();			
			    for (var i = 0; i < values.length; i++) {														
			        var fraction = values[i] / ytotal;				
			        context.beginPath();
			        context.moveTo(centerx, centery);
			        context.arc(centerx, centery, radius, 
			                   counter * Math.PI * 2 - Math.PI * 0.5,
			                   (counter + fraction) * Math.PI * 2 - Math.PI * 0.5,
			                   false);
			        context.lineTo(centerx, centery);
			        context.closePath();
					context.fillStyle = window.portalui_chart.colors.get(i % 15);
				    context.fill();	                
					counter += fraction;
			    }
				var counter = 0.0;	    				
				for (var i = 0; i < values.length; i++) {			
					var fraction = values[i] / ytotal;				
					// draw label
					context.fillStyle = window.portalui_chart.colors.get(i % 15);
			        var sliceMiddle = (counter + fraction/2);
			        var labelx = centerx + Math.sin(sliceMiddle * Math.PI * 2) * (radius + 5);
			        var labely = centery - Math.cos(sliceMiddle * Math.PI * 2) * (radius + 5);
			        		
			        var x1 = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (radius));
			        var y1 = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (radius));
					var x2 = Math.round(centerx + Math.sin((counter + fraction) * Math.PI * 2) * (radius));
			        var y2 = Math.round(centery - Math.cos((counter + fraction) * Math.PI * 2) * (radius));		        					
					var title = Math.round(fraction * 100)+"%("+values[i]+")";				
					if (sliceMiddle <= 0.25) {
			            this.drawText(ctx,"Arial",7,labelx, labely - (i * 2),title);            			
			        }
			        else if (sliceMiddle > 0.25 && sliceMiddle <= 0.5) {
			            // text on bottom and align left
			            this.drawText(ctx,"Arial",7,labelx, labely- (i * 2),title);            
			        }
			        else if (sliceMiddle > 0.5 && sliceMiddle <= 0.75) {
			            // text on bottom and align right
			            this.drawText(ctx,"Arial",7,labelx - (title.length * 5), labely- (i * 2),title);			
			        }
			        else {
			            // text on top and align right
			            this.drawText(ctx,"Arial",7,labelx- (title.length * 5), labely,title);			
			        }
			                       					   
			        counter += fraction;
			    }	
				this.drawText(ctx,"Arial",10,centerx - (s.length * 6 / 2),centery - 5,s,"#ffffff");            			
			    context.restore();
				context.restore();
			}			
			this.onAfterDraw.call(this, this.chartType);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	update: function(){
	    try
	    {	        			
			if (this.dataProvider === undefined && this.series.getLength() == 0) return;			
			$(this.getFullId() + "_legendHor").innerHTML = "";
			$(this.getFullId() + "_legendVer").innerHTML = "";
			$(this.getFullId() + "_legend").innerHTML = "";
			var canvas = $(this.getFullId() + "_canvas");					
			if ( document.all && window.G_vmlCanvasManager !== undefined) {											
				canvas = window.G_vmlCanvasManager.initElement(canvas);												
			}			
	        var ctx = canvas.getContext('2d');		
	        var canvasHeight = this.canvasHeight;
	        var canvasWidth = this.canvasWidth;
			this.context = ctx;
	        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	        // draw strip
	        var stripHeight = parseInt((canvasHeight / 10), 10);
	        var drawStrip = true;
			if (this.chartType != 3){
				var top = 0;

		        ctx.fillStyle = "rgb(233, 248, 255)";
		       // ctx.strokeStyle = "rgb(23, 248,245)";

		        for (var i = 0; i < 10; i++)
		        {
		            if (drawStrip)
		            {				
		                ctx.fillRect(0, top, canvasWidth, stripHeight);
				//ctx.strokeRect(0, top, canvasWidth, stripHeight);
		            }

		            top += stripHeight;
		            drawStrip = !drawStrip;
		        }
			}				
	        this.drawChart(ctx, canvasWidth, canvasHeight);
	    }
	    catch (e){
				alert("update:"+e);
		}
	},
	getChartType :function(){
		return this.chartType;
	},
	setChartType: function(data){			
		if (this.chartType != data){			
			this.chartType = data;
			this.update();
		}
	},
	setWidth: function(data){
			window.portalui_chart.prototype.parent.setWidth.call(this, data);
		this.canvasWidth = this.width - this.leftPadding - this.rightPadding;
	    var n = this.getFullId();
	   
	    var node = $(n + "_canvas");
	    
	    node.width = this.canvasWidth;
	    node.style.width = this.canvasWidth;
	    
	    var node = $(n + "_legend");

	    node.style.left = this.width - this.rightPadding - 1;
	    node.style.width = this.rightPadding;
	    
	    $(n + "_legendHor").style.width = this.canvasWidth;

	    this.update();
	},
	setHeight: function(data){
		window.portalui_chart.prototype.parent.setHeight.call(this, data);

		this.canvasHeight = this.height - this.bottomPadding - 25;

		var n = this.getFullId();

	    var node = $(n + "_canvas");
  	  
	    node.height = this.canvasHeight;
	    node.style.height = this.canvasHeight;
	    
	    $(n + "_legend").style.height = this.height - 25;
	    $(n + "_legendHor").style.top = this.height - this.bottomPadding;
	    $(n + "_legendHor").style.height = this.bottomPadding;
	    $(n + "_legendVer").style.height = this.height - 25;

	    this.update();
	},
	getBgColor: function(){
		return this.bgColor;
	},
	setBgColor: function(data){
	    this.bgColor = data;		
	    this.update();
	},
	isShowBorder: function(){
		return this.showBorder;
	},
	setShowBorder: function(data){		
	    if (this.showBorder != data)
	    {
	        this.showBorder = data;
	        var n = this.getFullId();	        
	        if (this.showBorder)
	        {
	            $(n).style.border = "1px solid #000000";
	            $(n + "_shadow1").style.display = "none";
	            $(n + "_shadow2").style.display = "none";
				$(n + "_shadow3").style.display = "none";
				$(n + "_shadow4").style.display = "none";
	        }
	        else
	        {
	            $(n).style.border = "";
	            $(n + "_shadow1").style.display = "none";
	            $(n + "_shadow2").style.display = "none";
				$(n + "_shadow3").style.display = "none";
				$(n + "_shadow4").style.display = "none";
				
	        }
	    }
	},
	getLeftPadding: function(){
		return this.leftPadding;
	},
	setLeftPadding: function(data){
		this.leftPadding = data;		
	    //if (this.isDrawn())
		{
	        var n = this.getFullId();
	        
	        $(n + "_canvas").style.left = this.leftPadding;
	        $(n + "_legendHor").style.left = this.leftPadding;
	        $(n + "_legendVer").style.width = this.leftPadding;
	    }
	    this.setWidth(this.width);
	},
	getRightPadding: function(){
		return this.rightPadding;
	},
	setRightPadding: function(data){
	    this.rightPadding = data;		
	    this.setWidth(this.width);
	},
	getBottomPadding: function(){
		return this.bottomPadding;
	},
	setBottomPadding: function(data){
	    this.bottomPadding = data;		
	    this.setHeight(this.height);
	},
	getTitle: function(){
		return this.title;
	},
	setTitle: function(data){
		this.title = data;		
		$(this.getFullId() + "_title").innerHTML = data;
	},
	getMaxValue: function(){
		return this.maxValue;
	},
	setMaxValue: function(data){
		data = parseFloat(data);		
		this.maxValue = data;
	},
	getMinValue: function(){
		return this.minValue;
	},
	setMinValue: function(data){
		data = parseFloat(data);		
		this.minValue = data;
	},
	itemClick: function(event){		
	   alert("test");
	},
	drawText: function(ctxt,font,size,x,y,text, color){
		if (color !== undefined) ctxt.fillStyle = color;
		if (ctxt.mozDrawText){
		  ctxt.save();			
		  ctxt.translate(x,y);ctxt.mozTextStyle=size+"pt "+font;
		  ctxt.mozDrawText(text);ctxt.translate(-1 * x,-1 * y);
		  ctxt.fillRect(1,1,1,1);
		  ctxt.restore();
		}else{
		
			ctxt.fillText(text,x,y);
		}
	},
	drawArc: function(ctxt,x, y, r){
		if (ctxt.mozDrawText){
		  ctxt.save();	
		  ctxt.translate(x,y);ctxt.mozTextStyle=size+"pt "+font;
		  ctxt.mozDrawText(text);ctxt.translate(-1 * x,-1 * y);
		  ctxt.fillRect(1,1,1,1);
		  ctxt.restore();
		}
	},
	setDataProvider: function(data){						
		if (typeof data == "string"){		
			eval("data = "+data+";");						
		}		
		if (data instanceof portalui_arrayMap)
			this.series = data;
		else {
			this.dataProvider = data;							
			this.useProvider = true;	
		}
        if (this.useProvider){								
			for (var i in this.dataProvider) {
				var firstSerie = this.dataProvider[i];
				break;
			}
		}else if (this.series.getLength() > 0)
		  var firstSerie = this.series.getByIndex(0).objList;
		if (this.useProvider)
    		var series = this.dataProvider;
    	else var series = this.series.objList;
    	var maxValue = -999999999, minValue = 999999999;
    	
        for (var i in series){
            serie = series[i];					
    		if (!this.useProvider) serie = serie.objList;
            for (var j in firstSerie){		                
                value = serie[j];
                if (parseFloat(value) > maxValue) maxValue = parseFloat(value);
                if (parseFloat(value) < minValue) minValue = parseFloat(value);
            }
        }
        this.maxValue = maxValue;
        this.minValue = minValue;
		this.update();		
		this.circle = 0;
	},
	getPainter: function(){
		return $(this.getFullId() +"_canvas");
	},
	getChartImage: function(){
		try{
			var cnv = $(this.getFullId() +"_canvas");
			if (!!(cnv.getImageData))
				return cnv.getImageData(0,0,this.canvasWidth,this.canvasHeight);
			else if (!!(cnv.toDataURL))
				return cnv.toDataURL("image/png");
			else return "";
		}catch(e){
			alert(e);
		}
	},
	setAnimate: function(data){				
		this.timer.setEnabled(data);				
	},
	setInterval: function(data){	
		var enabled = this.timer.enabled;
		this.timer.setEnabled(false);
		this.timer.setInterval(data);			
		this.timer.setEnabled(enabled);
	},
	doAnimate: function(){
		try{
			if (this.chartType != 3) return;
			if (this.context === undefined) return;
			if (this.circle > 360) this.circle = 0;			
			this.update();
			this.circle += 5;			
		}catch(e){
			alert(e);
		}
	},
	drawChart: function(ctx, canvasWidth, canvasHeight){	
		if (this.chartType == 1)
			this.drawLine(ctx, canvasWidth, canvasHeight);
		else if (this.chartType == 2)
			this.drawBar(ctx, canvasWidth, canvasHeight);
		else if (this.chartType == 3)
			this.drawPie(ctx, canvasWidth, canvasHeight);
	},
	drawShadow: function(x,y,radius, alpha, context){
		context.save();	
		context.translate(x,y);	        
		context.beginPath();
		context.moveTo(0, 0);
		context.arc(0, 0, radius, 0,Math.PI * 2,true);	
		context.closePath();				
		context.fillStyle = "rgba(0,0,0,"+alpha+")";
		context.fill();
		context.restore();
	},
    imgOver: function(event, hint) {
    }
});
