/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_saku_gl_dashboard_flDashboard = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_saku_gl_dashboard_flDashboard.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku_gl_dashboard_flDashboard";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard GL", 99);	
			uses("portalui_tabPage;portalui_childPage;portalui_roundPanel;portalui_timer;portalui_flashChart");		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_tabPage(this,{bound:[0,0,this.width - 2, this.height - 5],borderColor:"#35aedb", tabChange:[this,"doTabChange"]});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Neraca","Laba Rugi","Arus Kas","Analisa Rasio"]); 
			this.tab.roundedHeader(8);
			this.count = 0;
			this.initComp();
			this.timer = new portalui_timer(this);
			this.timer.onTimer.set(this,"doTimer");
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);            			
		}catch(e){
			alert(e);
		}
    }
};
window.app_saku_gl_dashboard_flDashboard.extend(window.portalui_childForm);
window.app_saku_gl_dashboard_flDashboard.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
    },
	doAfterResize: function(width, height){
		this.app._mainForm.pButton.hide();
		this.setTop(55);
		this.setHeight(height + 40);
	},
	initComp: function(tab){
		try{
		      var sql = new server_util_arrayList();				
				sql.add("call sp_neraca ('"+this.app._kodeFs+"','A','S',5,'"+this.app._periode+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._nikUser+"')");
				//sql.add("update a set n1 = ");
				sql.add("select c.nama, c.n1 / 1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09001' and a.kode_lokasi='"+this.app._lokasi+"' ");
				sql.add("select c.nama, c.n1 / 1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09003' and a.kode_lokasi='"+this.app._lokasi+"' ");
				sql.add("select c.nama, c.n1 / 1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09004' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				sql.add("select c.nama, c.n1 / 1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09002' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				sql.add("select c.nama, c.n1 / 1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09005' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				sql.add("select c.nama, c.n1/1000000 as n1 "+
							"from dsb_grafik_m a inner join dsb_grafik_d b on b.no_grafik = a.no_grafik inner join dsb_grafik_tmp c on c.no_grafik = a.no_grafik and c.kode_grafik = b.kode_grafik "+
							"where a.no_grafik='GRF09006' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
   				sql.add("select fn_spasi(nama_cf,level_spasi) as nama,n1 from cf_tmp where kode_lokasi='"+this.app._lokasi+"' order by kode_cf");
				sql.add("select nama_cf as nama,n1 / 1000000 as n1 from cf_tmp where kode_lokasi='"+this.app._lokasi+"' order by kode_cf ",true);
		        sql.add("select fn_spasi(nama,level_spasi) as nama,n1 from rasio_tmp where kode_lokasi='"+this.app._lokasi+"' order by kode_rasio");
				sql.add("select nama, n1 from rasio_tmp where kode_lokasi='"+this.app._lokasi+"' order by kode_rasio ");				
				sql.add("select *, fn_spasi(nama, level_spasi) as nm from neraca_tmp where kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.app._nikUser+"' order by modul, rowindex ");
				sql.add("select a.*,b.kode_neraca, c.nama as nm_nrc from glma_tmp a "+
					" inner join relakun b on b.kode_akun = a.kode_akun and b.kode_fs = '"+this.app._kodeFs+"' and b.kode_lokasi = a.kode_lokasi "+
					" inner join neraca c on b.kode_neraca = c.kode_neraca and c.kode_fs = b.kode_fs and c.kode_lokasi = a.kode_lokasi "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._nikUser+"' order by b.kode_neraca,a.kode_akun");
				this.dbLib.getMultiDataProviderA(sql);					            
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	   if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":
    	               var data = JSON.parse(result);						   
    	               if (typeof data != "string"){    
							this.dataProvider  = data;
						    this.buildNeraca(this.dataProvider.result[11]);
							this.buildTB(this.dataProvider.result[12]);						    
    	                    var frameWidth = this.width / 2 - 30;	                        
            				this.fr1 = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,10,frameWidth,this.height-60],caption:"Neraca",background:"image/themes/dynpro/bluegradient.png",color:"#edf5f8",titleBg:"#95cae8"});
            		        this.fr1.chart = new portalui_flashChart(this.fr1,{bound:[5,0,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		         	                        
							this.fr1.chart.data = data.result[1];							
            		        this.fr2 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,250],caption:"Kas & Setara Kas",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr2.chart = new portalui_flashChart(this.fr2,{bound:[5,0,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});  
                            this.fr2.chart.data = data.result[2];
							this.fr3 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,this.fr2.height+20,frameWidth,250],caption:"Asset",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr3.chart = new portalui_flashChart(this.fr3,{bound:[5,0,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        
            				this.fr3.chart.data = data.result[3];							
														
							this.p1 = new portalui_panel(this.tab.childPage[2],{bound:[10,10,frameWidth,this.height-60],caption:"Daftar Arus Kas"});
            				this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,frameWidth-4,this.height-83],colCount:2,tag:2,colTitle:["Nama","Nilai"],
            					colWidth:[[0,1],[330,100]],colFormat:[[1],[cfNilai]],columnReadOnly:[true,[0,1],[]],autoAppend:false,defaultRow:1});
							this.p2 = new portalui_panel(this.tab.childPage[3],{bound:[10,10,frameWidth,this.height-60],caption:"Daftar Analisa Rasio"});
                            this.sg1 = new portalui_saiGrid(this.p2,{bound:[0,20,frameWidth-4,this.height-83],colCount:2,tag:2,colTitle:["Nama","Nilai"],
            					colWidth:[[0,1],[330,100]],colFormat:[[1],[cfNilai]],columnReadOnly:[true,[0,1],[]],autoAppend:false,defaultRow:1});				            									
							var line;
        					this.sg.clear();
        					for (var i in this.dataProvider.result[7].rs.rows){
        						line = this.dataProvider.result[7].rs.rows[i];															
        						this.sg.appendData([line.nama,floatToNilai(line.n1)]);
        					}
        					this.sg.validasi();
        					this.sg1.clear();
        					for (var i in this.dataProvider.result[9].rs.rows){
        						line = this.dataProvider.result[9].rs.rows[i];							
        						this.sg1.appendData([line.nama,floatToNilai(line.n1)]);
        					}
        					this.sg1.validasi();							
							this.buildChart(this.fr1.chart);
							this.buildChart(this.fr2.chart);
							this.buildChart(this.fr3.chart);							
                       }else throw result;
    	           break;
               }
            }catch(e){
                alert(this+"$request()"+e);
            }
       }
    },
    doTabChange: function(sender, page){        
		var frameWidth = this.width / 2 - 30;
		if (page == 1 && this.fr4 == undefined){
			this.fr4 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,10,frameWidth,250],caption:"Laba Rugi",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
			this.fr4.chart = new portalui_flashChart(this.fr4,{bound:[5,0,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        				
			this.fr4.chart.data = this.dataProvider.result[4];
			this.fr5 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr4.left+this.fr4.width + 15,10,frameWidth,250],caption:"Pendapatan",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
			this.fr5.chart = new portalui_flashChart(this.fr5,{bound:[5,0,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        
			this.fr5.chart.data = this.dataProvider.result[5];
			this.fr6 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,this.fr5.height+20,frameWidth,250],caption:"Beban",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
			this.fr6.chart = new portalui_flashChart(this.fr6,{bound:[5,0,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        
			this.fr6.chart.data = this.dataProvider.result[6];			
			this.buildChart(this.fr4.chart);
			this.buildChart(this.fr5.chart);
			this.buildChart(this.fr6.chart);
			
		}else if (page == 2 && this.fr7 == undefined){
			this.fr7 = new portalui_roundPanel(this.tab.childPage[2],{bound:[this.p1.left+this.p1.width + 15,50,frameWidth,250],caption:"Arus Kas",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
			this.fr7.chart = new portalui_flashChart(this.fr7,{bound:[5,0,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});		        
			this.fr7.chart.data = this.dataProvider.result[8];										
			this.buildChart(this.fr7.chart);
		}else if (page == 3 && this.fr8 == undefined){			
			this.fr8 = new portalui_roundPanel(this.tab.childPage[3],{bound:[this.p2.left+this.p2.width + 15,50,frameWidth,250],caption:"Analisa Rasio",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
			this.fr8.chart = new portalui_flashChart(this.fr8,{bound:[5,0,this.fr8.getClientWidth() - 30,this.fr8.getClientHeight() - 50],objectReady:[this,"doObjectReady"]});						
			this.fr8.chart.data = this.dataProvider.result[10];
			this.buildChart(this.fr8.chart);
		}
    },
	doObjectReady: function(sender){
	   try{	        
			this.count++;
		    if (this.tab.activePage == 0 && this.count == 3){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.tab.activePage == 1 && this.count == 3){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.tab.activePage == 2 && this.count == 1){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.tab.activePage == 3 && this.count == 1){
				this.timer.setEnabled(true);
				this.count = 0;
			}
        }catch(e){
            alert("objectready "+e);
        }
    },
    buildChart: function(sender){
		try{
				if (sender == this.fr1.chart){    	        
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Neraca"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "pop":""), "delay":0.5, "cascade":0.6}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (sender == this.fr2.chart){    	        					
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Kas Setara Kas"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "drop":""), "cascade":0.9}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (sender == this.fr3.chart){    	        					
					var chart = {    	        
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Asset"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (this.fr4 && sender == this.fr4.chart){    	        					
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Labarugi"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_round_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],							  
								"on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (this.fr5 && sender == this.fr5.chart){    	        					
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Pendapatan"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_round_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "fade-in":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (this.fr6 && sender == this.fr6.chart){    	        					
					var chart = {
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "bg_colour":"#edf5f8",
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Beban"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"text": "Global Tooltip<br>val=#val#, top=#top#"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_round_glass","alpha":     0.5,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"values" :   [Math.round(line.n1)],
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"on-show":	{"type": (!systemAPI.browser.msie ? "drop":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (this.fr7 && sender == this.fr7.chart){    	        					
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Cash flow"]}
					   },
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"mouse": 1,"stroke":1,"colour":"#00d000","background":"#d0d0ff","title":"{font-size: 14px; color: #905050;}",
						"body":"{font-size: 10px; font-weight: bold; color: #9090ff;}"
					  }
					};                
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_round_glass","alpha":     0.5,"colour":    "#"+ color,"outline-colour":  "#"+color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = parseFloat(line.n1);
							if (parseFloat(line.n1) < minValue ) minValue = parseFloat(line.n1);
							chart.elements.push(temp);
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}else if (this.fr8 && sender == this.fr8.chart){
					var chart = {
					  "bg_colour":"#edf5f8",
					  "y_legend":{
						"text": "Nilai","style": "{color: #736AFF; font-size: 12px;}"
					  },
					  "elements":[],
					  "x_axis":{
						"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Rasio"]}
					   },                    
					  "y_axis":{
						"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
					  },
					  "tooltip":{
						"mouse": 1,"stroke":1,"colour":"#ff9900","background":"#e9e9ff","title":"{font-size: 14px; color: #0000ff;}",
						"body":"{font-size: 10px; font-weight: bold; color: #9090ff;}"
					  }
					};
					if (sender.data.rs.rows[0]!==undefined)
					{
						var line,temp="", maxValue = -999999999,minValue = 999999999;
						for (var i in sender.data.rs.rows){
							line = sender.data.rs.rows[i];
							var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
							color = (r+256 * g + 65536 * b).toString(16);
							temp = {
								"type":"bar_round_glass","alpha":     0.8,"colour":    "#"+ color,
								"tip":       line.nama+"<br>"+floatToNilai(parseFloat(line.n1)),
								"text--":      line.nama,
								"font-size--": 10,
								"linkCtrl": sender.resourceId.toString(),
								"on-click": "system.getResource("+this.resourceId+").doChartClick",
								"values" :   [Math.round(line.n1)],
								"on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
							};
							if (parseFloat(line.n1) > maxValue ) maxValue = Math.round(parseFloat(line.n1));
							if (parseFloat(line.n1) < minValue ) minValue = Math.round(parseFloat(line.n1));							
							chart.elements.push(temp);							
						}					
					}    			
					chart.y_axis.max = maxValue + 100;							
				}
				sender.setChartData(chart); 
		}catch(e){
			alert("updateChart "+e);
		}
    },
	updateChart: function(chart){
		chart.refresh();
	},
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.tab.activePage == 0){			
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();			
		}else if (this.tab.activePage == 1){
			this.fr4.chart.refresh();
			this.fr5.chart.refresh();
			this.fr6.chart.refresh();			
		}else if (this.tab.activePage == 2){
			this.fr7.chart.refresh();			
		}else this.fr8.chart.refresh();
	},
	buildNeraca : function(rs){
		try{
			var kode, levelLap, node, nodeTmp, level;			
			this.dataNeraca = new portalui_arrayMap();			
			this.root = new portalui_arrayMap();
			for (var r in rs.rs.rows){
				itemValues = rs.rs.rows[r];
				kode = itemValues.kode_neraca;
				if (kode != ""){
					nama = itemValues.nama;
					levelLap = itemValues.level_lap;
					level = itemValues.level_spasi;
					level++;					
					if (node == undefined){
						node = new portalui_arrayMap();						
						node.owner = this.root;
						this.root.set(kode, node);	
					}else if (node.level == level - 1){
						nodeTmp = node;
						node = new portalui_arrayMap();
						node.owner = nodeTmp;
						nodeTmp.set(kode, node);
					}else if (node.level == level){
						nodeTmp = node.owner;
						node = new portalui_arrayMap();
						node.owner = nodeTmp;
						nodeTmp.set(kode, node);
					}else if (node.level > level){
						if (!(node.owner == this.root)){
							node = node.owner;
							while (node.level > level){								
									node = node.owner;
							}
						}
						nodeTmp = node.owner;
						node = new portalui_arrayMap();
						node.owner = nodeTmp;
						nodeTmp.set(kode, node);
					}							
					node.level = level;
					node.kode = kode;
					node.data = itemValues;
					this.dataNeraca.set(itemValues.nama, node);
				}								
			}			
		}catch(e){
			alert(e);
		}
	},
	buildTB: function(rs){
		try{
			this.dataTB = new portalui_arrayMap();
			var line, kode, akun;
			for (var r in rs.rs.rows){
				line = rs.rs.rows[r];
				if (kode != line.kode_neraca){
					akun = new portalui_arrayMap();
					this.dataTB.set(line.kode_neraca, akun);
					kode = line.kode_neraca;															
				}								
				akun.set(line.kode_akun, line);
			}					
		}catch(e){
			alert(e);
		}
	},
	doChartClick: function(sender,index,title){		
		try{
			eval("sender="+sender);
			this.doGridClick(sender, title);			
		}catch(e){
			alert(e);
		}
	},
	doGridClick: function(sender, title){		
		try{
			if (this.trail1 === undefined){
				this.trail1 = new app_saku_gl_dashboard_fTrail1(this.owner,undefined, this);
				this.trail1.maximize();
			}
			this.trail1.grid.clear();
			var data = this.dataNeraca.get(title);			
			if (data.data.tipe.toLowerCase() != "posting"){
				this.getDataNeraca(data);
			}else {			
				data = this.dataTB.get(data.data.kode_neraca);				
				this.getDataTB(data);
			}
			this.trail1.setPanelCaption("Detail "+ title);
			this.trail1.show();
		}catch(e){
			alert(e);
		}
	},
	getDataNeraca: function(data){
		try{
			var line;			
			for (var i in data.objList){
				line = data.get(i);				
				this.trail1.grid.appendData([line.data.kode_neraca, line.data.nm, floatToNilai(line.data.n4)]);
				if (line.getLength() != 0){					
					this.getDataNeraca(line);
				}
			}
		}catch(e){
			
		}
	},
	getDataTB: function(data){
		var line;
		for (var i in data.objList){
			line = data.get(i);
			this.trail1.grid.appendData([line.kode_akun, line.nama, floatToNilai(line.so_akhir)]);			
		}
	}
});


window.app_saku_gl_dashboard_fTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_saku_gl_dashboard_fTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku_gl_dashboard_fTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});						
			this.grid = new portalui_saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:3,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["Kode","Deskripsi","Nilai"],
				colWidth:[[2,1,0],[100,400,100]], colFormat:[[2],[cfNilai]],rowSelect:true});            
			this.sgn = new portalui_sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_saku_gl_dashboard_fTrail1.extend(window.portalui_childForm);
window.app_saku_gl_dashboard_fTrail1.implement({    
	doClose: function(sender){        	
		if (this.trail2 !== undefined) this.trail2.close();
    },	
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	doPager: function(sender,page){
		this.dbLib.getDataProviderPageA(this.sql,page,this.rowPerPage);
		this.page = page;
	},
	setSQL: function(sql,sqlCount){
		this.sql = sql;
		this.sgn.setTotalPage(this.dbLib.getRowCount(sqlCount, this.rowPerPage));
		this.sgn.rearrange();
		this.sgn.activePage = 0;	
		this.sgn.setButtonStyle(4);			
		this.dbLib.getDataProviderPageA(this.sql,1,this.rowPerPage);		
		this.page = 1;
	},	
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	},
	doGridDoubleClick: function(sender, col, row){		
		try{
			if (this.trail2 === undefined){
				this.trail2 = new app_saku_gl_dashboard_fTrail1(this.owner,undefined, this);
				this.trail2.maximize();
			}
			this.trail2.grid.clear();
			var title = sender.cells(1, row);
			title = title.replace(/&nbsp;/gi,"");
			var data = this.callObj.dataNeraca.get(title);			
			if (data.data.tipe.toLowerCase() != "posting"){
				this.getDataNeraca(data);
			}else {			
				data = this.callObj.dataTB.get(data.data.kode_neraca);				
				this.getDataTB(data);
			}
			this.trail2.setPanelCaption("Detail "+ title);
			this.trail2.show();
		}catch(e){
			alert(e);
		}
	},
	getDataNeraca: function(data){
		try{
			var line;			
			for (var i in data.objList){
				line = data.get(i);				
				this.trail2.grid.appendData([line.data.kode_neraca, line.data.nm, floatToNilai(line.data.n4)]);
				if (line.getLength() != 0){					
					this.getDataNeraca(line);
				}
			}
		}catch(e){
			
		}
	},
	getDataTB: function(data){
		var line;
		for (var i in data.objList){
			line = data.get(i);
			this.trail2.grid.appendData([line.kode_akun, line.nama, floatToNilai(line.so_akhir)]);			
		}
	}
});

window.app_saku_gl_dashboard_fTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_saku_gl_dashboard_fTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku_gl_dashboard_fTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});						
			this.grid = new portalui_saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:3,readOnly:true,
				colTitle:["Kode","Deskripsi","Nilai"],
				colWidth:[[2,1,0],[100,400,100]], colFormat:[[2],[cfNilai]],rowSelect:true});            
			this.sgn = new portalui_sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_saku_gl_dashboard_fTrail2.extend(window.portalui_childForm);
window.app_saku_gl_dashboard_fTrail2.implement({    
	doClose: function(sender){        	
		if (this.trail2 !== undefined) this.trail2.close();
    },	
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	doPager: function(sender,page){
		this.dbLib.getDataProviderPageA(this.sql,page,this.rowPerPage);
		this.page = page;
	},
	setSQL: function(sql,sqlCount){
		this.sql = sql;
		this.sgn.setTotalPage(this.dbLib.getRowCount(sqlCount, this.rowPerPage));
		this.sgn.rearrange();
		this.sgn.activePage = 0;	
		this.sgn.setButtonStyle(4);			
		this.dbLib.getDataProviderPageA(this.sql,1,this.rowPerPage);		
		this.page = 1;
	},	
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	},
	doGridDoubleClick: function(sender, col, row){		
		try{
			this.grid.clear();
			var title = sender.cells(1, row);
			title = title.replace(/&nbsp;/gi,"");
			var data = this.callObj.callObj.dataNeraca.get(title);			
			if (data.data.tipe.toLowerCase() != "posting"){
				this.getDataNeraca(data);
			}else {			
				data = this.callObj.callObj.dataTB.get(data.data.kode_neraca);				
				this.getDataTB(data);
			}
			this.setPanelCaption("Detail "+ title);			
		}catch(e){
			alert(e);
		}
	},
	getDataNeraca: function(data){
		try{
			var line;			
			for (var i in data.objList){
				line = data.get(i);				
				this.grid.appendData([line.data.kode_neraca, line.data.nm, floatToNilai(line.data.n4)]);
				if (line.getLength() != 0){					
					this.getDataNeraca(line);
				}
			}
		}catch(e){
			
		}
	},
	getDataTB: function(data){
		var line;
		for (var i in data.objList){
			line = data.get(i);
			this.grid.appendData([line.kode_akun, line.nama, floatToNilai(line.so_akhir)]);			
		}
	}
});