//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_example_fLogin = function(owner){
	if (owner){
		try{		
			window.app_example_fLogin.prototype.parent.constructor.call(this, owner);
			this.className  = "app_example_fLogin";			
			this.setBound(0,60,400,200);			
			this.maximize();					
			owner.childFormConfig(this, "mainButtonClick","Login", 1);			
			//------------------------ login data ------------------------	
			uses("datePicker;util_PdfDesigner;saiMemo;reportViewer;server_util_Map;highchart");
			
			//this.m_Sql = new saiMemo(this,{bound:[10,20,800,200],caption:"Query"});
			//this.bPreview = new button(this,{bound:[10,2,80,20],caption:"Tampil", click:"mainButtonClick"});
			//this.viewer = new reportViewer(this,{bound:[0,230,this.width, this.height - 250],visible:true});
			
			//this.dbLib = new util_dbLib();
			//this.dbLib.addListener(this);
			
			this.setTabChildIndex();
			this.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			this.chart = new highchart(this,{bound:[10,20,800,400], click:[this,"doClick"]});
			this.chart2 = new highchart(this,{bound:[10,440,800,400], click:[this,"doClick2"]});
			this.chart3 = new highchart(this,{bound:[10,880,800,400], click:[this,"doClick2"]});
			
			//this.rearrangeChild(20,23);
			var options = {
				chart: {
		                renderTo: 'container',
		                type: 'spline',
		                marginRight: 130,
		                marginBottom: 25,
		                resourceId:this.chart.resourceId
		            },
		            title: {
		                text: 'Monthly Average Temperature',
		                x: -20 //center
		            },
		            subtitle: {
		                text: 'Source: WorldClimate.com',
		                x: -20
		            },
		            xAxis: {
		                categories: this.categories
		            },
		            yAxis: {
		                title: {
		                    text: 'Temperature (°C)'
		                },
		                plotLines: [{
		                    value: 0,
		                    width: 1,
		                    color: '#808080'
		                }]
		            },
		            tooltip: {
		                formatter: function() {
		                        return '<b>'+ this.series.name +'</b><br/>'+
		                        this.x +': '+ this.y +'°C';
		                }
		            },
		            legend: {
		                layout: 'vertical',
		                align: 'right',
		                verticalAlign: 'top',
		                x: -10,
		                y: 100,
		                borderWidth: 0
		            },
		            plotOptions: {
										column: {
											pointPadding: 0.2,
						                    borderWidth: 0,
										},
									 	series: {
									 		cursor :"pointer",
						                   
						                    point : {
						                    	events: {
						                    		click: function(e){
						                    			var resource = this.series.chart.options.chart.resourceId;
						                    			system.getResource(resource).pointClick(this.series.name, this.x, this.y);
						                    		}
						                    	}
						                    }
                						},
                						point : {

                						}
                				},
		            series: [{
		                name: 'Tokyo',
		                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		            }, {
		                name: 'New York',
		                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		            }, {
		                name: 'Berlin',
		                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
		            }, {
		                name: 'London',
		                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
		            }]
		        };
			var options2 = {
				chart: {
		                renderTo: 'container',
		                type: 'column',
		                resourceId:this.chart2.resourceId
		            },
		            title: {
		                text: 'Monthly Average Rainfall'
		            },
		            subtitle: {
		                text: 'Source: WorldClimate.com'
		            },
		            xAxis: {
		                categories: [
		                    'Jan',
		                    'Feb',
		                    'Mar',
		                    'Apr',
		                    'May',
		                    'Jun',
		                    'Jul',
		                    'Aug',
		                    'Sep',
		                    'Oct',
		                    'Nov',
		                    'Dec'
		                ]
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'Rainfall (mm)'
		                }
		            },
		            legend: {
		                layout: 'vertical',
		                backgroundColor: '#FFFFFF',
		                align: 'left',
		                verticalAlign: 'top',
		                x: 100,
		                y: 70,
		                floating: true,
		                shadow: true
		            },
		            tooltip: {
		                formatter: function() {
		                    return ''+
		                        this.x +': '+ this.y +' mm';
		                }
		            },
		            plotOptions: {
		                column: {
		                    pointPadding: 0.2,
		                    borderWidth: 0
		                },
		                series: {
						 		cursor :"pointer",
			                   
			                    point : {
			                    	events: {
			                    		click: function(e){
			                    			var resource = this.series.chart.options.chart.resourceId;
			                    			system.getResource(resource).pointClick(this.series.name, this.x, this.y);
			                    		}
			                    	}
			                    }
							}
		            },
		            series: [{
		                name: 'Tokyo',
		                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
		    
		            }, {
		                name: 'New York',
		                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
		    
		            }, {
		                name: 'London',
		                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
		    
		            }, {
		                name: 'Berlin',
		                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
		    
		            }]};
			var options3 = {
					chart: {
						renderTo: 'container',
		                resourceId:this.chart3.resourceId,
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false
			        },
			        title: {
			            text: 'Browser market shares at a specific website, 2010'
			        },
			        tooltip: {
			    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			                }
			            }
			        },
			        series: [{
			            type: 'pie',
			            name: 'Browser share',
			            data: [
			                ['Firefox',   45.0],
			                ['IE',       26.8],
			                {
			                    name: 'Chrome',
			                    y: 12.8,
			                    sliced: true,
			                    selected: true
			                },
			                ['Safari',    8.5],
			                ['Opera',     6.2],
			                ['Others',   0.7]
			            ]
			        }]
		        };
			
			this.chart.setChartData(options);
			this.chart2.setChartData(options2);
			this.chart3.setChartData(options3);
		}catch(e){
			error_log(e);
		}
	}
};
window.app_example_fLogin.extend(window.childForm);
window.app_example_fLogin.implement({
	doClick: function(sender, seriesName, x, y){
		try{
			//alert(seriesName +":"+x+":"+y);
			var chart = this.chart.getChart();
			chart.setTitle({text:seriesName}, {text:"Sub Series "+ chart.xAxis[0].categories[x]});
			var serCount = chart.series.length;
			for (var i=0; i < serCount; i++)
				chart.series[0].remove();
			var series = [{
	                name: 'Tokyo',
	                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	            }, {
	                name: 'London',
	                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	            }];
	        chart.addSeries(series[0]);
	        chart.addSeries(series[1]);
	    }catch(e){
	    	alert(e);
	    }
	},
	doClick2: function(sender, seriesName, x, y){
		try{
			var chart = sender.getChart();
			chart.setTitle({text:seriesName}, {text:"Sub Series "+ chart.xAxis[0].categories[x]});
			var serCount = chart.series.length;
			for (var i=0; i < serCount; i++)
				chart.series[0].remove();
			var series = [{
	                name: 'Tokyo',
	                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	            }, {
	                name: 'London',
	                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	            }];
	        chart.addSeries(series[0]);
	        chart.addSeries(series[1]);
	    }catch(e){
	    	alert(e);
	    }

	},
    mainButtonClick: function(sender){
		try{
			/*var reportConf = new server_util_Map();		
			reportConf.set("name","TestingReport");
			reportConf.set("margin",10);		
			reportConf.set("type","A4");
			reportConf.set("orientation","P");
			reportConf.set("rowHeight",5);
			var font = new server_util_Map({items:{family:"Arial",size:8,style:"B"}});
			var logo = new server_util_Map({items:{image:"path/of/image", height:0, width:0}});
			var title1 = new server_util_Map({items:{caption:"LOKASI", height:5, font:font, width:"100%", border:""}});
			var title2 = new server_util_Map({items:{caption:"DAFTAR KARYAWAN", height:5, font:font, width:"100%",border:""}});
			var pageTitle = new server_util_arrayList({items:[title1, title2]});			
			var colHeader = new server_util_Map({items:{
					bgcolor:new server_util_Map({items:{r:233,g:233,b:233}}), 
					font:font,
					fill:true,
					columns:new server_util_arrayList({items:[
								new server_util_Map({items:{caption:"No", width:20, height:10, field:"rowid", fill:false, alignment:"C"}}),
								new server_util_Map({items:{caption:"Karyawan", width:120, height:5, fill:false, 
									subtitle:  	new server_util_arrayList({items:[
												new server_util_Map({items:{caption:"NIK", width:20, height:5, alignment:"L", field:"nik", fill:false}}),
												new server_util_Map({items:{caption:"Nama", width:100, height:5, alignment:"L", field:"nama", wordwrap:true, numrow:1, fill:false}})
											]})
										}}),								
								new server_util_Map({items:{caption:"Lokasi", width:20, height:10, field:"kode_lokasi", alignment:"C",fill:false}})
							]})
					}});
			var footer = new server_util_Map({items: {
				leftText: "dicetak ",
				centerText: "Hal ",
				rightText: ""
			}});
			var summary = new server_util_Map({items:{text:"Total", fields:new server_util_arrayList({items:["nilai"]})} });
			//groupBand1 = {field:,forceNewPage, summaryBand:array of field ([])}
			//groupBand = [groupBand1, groupBand2]
			var groupHeader = new server_util_arrayList({items:[
						{
							field:"nik", forceNewPage:false,
							summaryText:"Sub Total",
							summary:new server_util_arrayList({items:["nilai"]})
						}]					
				});
			
			reportConf.set("pageTitle",pageTitle);
			reportConf.set("colHeader",colHeader);
			reportConf.set("groupHeader",groupHeader);
			reportConf.set("footer",footer);
			reportConf.set("summary",summary);
			//---------------dataProvider----------------------
			var dataProvider= new server_util_Map();
			var sql = new server_util_Map();
			var Q1 = new server_util_Map();			
			Q1.set("sqlText", this.m_Sql.getText());		
			sql.set("Q1",Q1);	
			dataProvider.set("sql",sql);
			dataProvider.set("page",1);
			dataProvider.set("rowPerPage",100);
			var obj = this.pdfGenerator.generate(dataProvider, reportConf);						
			this.viewer.enabledIframe();
			downloadFile(obj, this.viewer.container);*/
		}catch(e){
			alert(e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){	
	},
	doRequestReady: function(sender, methodName, result){
		alert(result);
	},
	doAfterResize:	function(){		
	},
	setImage: function(path,proportional,width,height){		
	}
});
