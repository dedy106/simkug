/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_saku_anggaran_dashboard_fDashboard = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_saku_anggaran_dashboard_fDashboard.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku_anggaran_dashboard_fDashboard";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard Anggaran", 99);	
			uses("portalui_tabPage;portalui_childPage;portalui_roundPanel;portalui_chart;portalui_saiTable;portalui_flashChart;portalui_timer");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_tabPage(this,{bound:[0,0,this.width - 2, this.height - 5],borderColor:"#35aedb", tabChange:[this,"doTabChange"]});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Labarugi & Asset","Pendapatan & Beban"]); 
			this.tab.roundedHeader(8);
			this.initComp();		
            this.timer = new portalui_timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_saku_anggaran_dashboard_fDashboard.extend(window.portalui_childForm);
window.app_saku_anggaran_dashboard_fDashboard.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
    },
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 40); 
	},
	initComp: function(tab){
		try{
		      var sql = new server_util_arrayList();
				sql.add("select b.nama,b.n1 / 1000000 as n1,b.n2 / 1000000 as n2  "+
							"from dsb_grafik_m a inner join dsb_grafik_tmp b on a.no_grafik=b.no_grafik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_grafik='GRF09007' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='AGG'");
				sql.add("select b.nama,b.n1 / 1000000 as n1,b.n2/ 1000000 as n2  "+
							"from dsb_grafik_m a inner join dsb_grafik_tmp b on a.no_grafik=b.no_grafik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_grafik='GRF09008' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='AGG' ");
				sql.add("select b.nama,b.n1 / 1000000 as n1,b.n2/ 1000000 as n2   "+
							"from dsb_grafik_m a inner join dsb_grafik_tmp b on a.no_grafik=b.no_grafik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_grafik='GRF09009' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='AGG' ");
				sql.add("select b.nama,b.n1 / 1000000 as n1,b.n2/ 1000000 as n2   "+
							"from dsb_grafik_m a inner join dsb_grafik_tmp b on a.no_grafik=b.no_grafik and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_grafik='GRF09010' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='AGG'");				
				this.dbLib.getMultiDataProviderA(sql);					            
		}catch(e){
			this.app.alert(e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
	    if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":
    	               eval("var data = "+result+";");
    	               if (typeof data != "string"){    	                   
    	                   var frameWidth = this.width / 2 - 30;
						   var frameHeight = this.tab.height - 50; 
	                        this.count = 0;
            				this.fr1 = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,10,frameWidth,frameHeight],caption:"Labarugi",background:"image/themes/dynpro/bluegradient.png",color:"#edf5f8",titleBg:"#95cae8"});									
            		        this.fr1.chart = new portalui_flashChart(this.fr1,{bound:[5,0,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		         	                        
							this.fr1.chart.data = data.result[0];
							this.fr1.chart.title = "Labarugi";
            		        this.fr2 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,frameHeight],caption:"Aset",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr2.chart = new portalui_flashChart(this.fr2,{bound:[5,0,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});  
                            this.fr2.chart.data = data.result[1];
							this.fr2.chart.title = "Aset";
							this.fr3 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,10,frameWidth,frameHeight],caption:"Pendapatan",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr3.chart = new portalui_flashChart(this.fr3,{bound:[5,0,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        
            				this.fr3.chart.data = data.result[2];
							this.fr3.chart.title = "Pendapatan";
							this.fr4 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr3.left+this.fr3.width + 15,10,frameWidth,frameHeight],caption:"Beban",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
            		        this.fr4.chart = new portalui_flashChart(this.fr4,{bound:[5,0,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        				
							this.fr4.chart.data = data.result[3];                            
							this.fr4.chart.title = "Beban";
							this.buildChart(this.fr1.chart);
							this.buildChart(this.fr2.chart);
							this.buildChart(this.fr3.chart);
							this.buildChart(this.fr4.chart);
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e);
            }
       }
    },
    doTabChange: function(sender, page){
        this.count = 0;
    },
	doObjectReady: function(sender){
	   try{
	        this.updateChart(sender);
        }catch(e){
            alert(e);
        }
    },
    updateChart: function(sender){    
		sender.refresh();
	},
	buildChart: function(sender){        
		try{
			var chart = {
			  "bg_colour":"#edf5f8",
			  "y_legend":{
				"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
			  },
			  "elements":[],
			  "x_axis":{
				"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate":-45}
			   },
			  "y_axis":{
				"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
			  },
			  "tooltip":{
				"text": "Global Tooltip<br>val=#val#, top=#top#"
			  }
			};                
			var data = sender.data, swf = sender;
			var line,temp="", maxValue = -999999999,minValue = 999999999;
			var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
			var maleColor = (r+256 * g + 65536 * b).toString(16);
			r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
			var femaleColor = (r+256 * g + 65536 * b).toString(16);
			var male = {"type":"bar_round_glass","alpha":     0.8,"colour":    "#"+ maleColor,
				  "tip":       "Anggaran (#val#)",
				  "text":      "Anggaran",
				  "font-size--": 10,
				  "values" :   [],
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "on-show":	{"type": "grow-up"}
				};
			var female = {"type":"bar_round_glass","alpha":     0.8,"colour":    "#"+ femaleColor,
				  "tip":       "Realisasi (#val#) ",
				  "text":      "Realisasi",
				  "font-size--": 10,
				  "values" :   [],
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "on-show":	{"type": "grow-up"}
				};
			swf.labels = [];
			if (data.rs.rows[0]!==undefined)
			{
				for (var i in data.rs.rows){
					line = data.rs.rows[i]; 			
					male.values.push(Math.round(line.n1));						
					female.values.push( Math.round(line.n2));												
					chart.x_axis.labels.labels.push(line.nama);
					//swf.labels.push(line.nama);					
					if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
					if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);						
					if (parseFloat(line.n2) > maxValue ) maxValue = parseFloat(line.n2);
					if (parseFloat(line.n2) < minValue ) minValue = parseFloat(line.n2);						
				}									
			}else{
				var line,temp="", maxValue = 0,minValue = 0;			
			}    			
			chart.elements.push(male);
			chart.elements.push(female);
			chart.y_axis.max = maxValue + 10;		
			sender.setChartData(chart);             
		}catch(e){
			alert(e);
		}
    },
    doTimer: function(sender){
		this.timer.setEnabled(false);
        if (this.tab.activePage == 0){            
            this.updateChart(this.fr1.chart);
            this.updateChart(this.fr2.chart);            
        }else {
			this.updateChart(this.fr3.chart);
			this.updateChart(this.fr4.chart);
		}
    }
});
