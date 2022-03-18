/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_assetsap_dashboard_fSikaSummary = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboard_fSikaSummary.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboard_fSikaSummary";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard SIKA", 99);	
			uses("tabPage;childPage;panel;flashChart;saiGrid;timer;util_filterRep;toolbar;roundPanel");			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new tabPage(this,{bound:[0,0,this.width - 2, this.height - 5],borderColor:"#35aedb", tabChange:[this,"doTabChange"], headerAutoWidth:false});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Arsip per Lokasi","Lokasi"]); 
			this.tab.roundedHeader(8);
			this.toolbar = new toolbar(this,{bound:[this.width - 100,0,80,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");			
			this.toolbar.makeRound(5);
			this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});                      
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:2,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();			
			this.filter = "";			
			this.sgFilter.editData(0,["Lokasi","All","",""]);
			this.sgFilter.editData(1,["No Arsip","A","",""]);			
			this.filterRep = new util_filterRep();			
			
			this.initComp("");		
            this.timer = new timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboard_fSikaSummary.extend(window.childForm);
window.app_assetsap_dashboard_fSikaSummary.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
		if (this.trail1 !== undefined) this.trail1.close();		
    },	
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 40);
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
	doClick: function(sender){
        try{
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("a.kode_lokfa",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +
					this.filterRep.filterStr("a.no_arsip",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and");				
    	        this.pFilter.hide();
				this.initComp(this.filter);
            }            
       }catch(e){
            alert(e);
       }
    },	
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1),new  Array("123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1),new  Array(2,2));			
		}catch(e){
			alert(e);
		}
		
	},
	doEllipsFilterClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Aset",sender, sender.row, sender.col,
													  "select kode_lokfa,alamat from amu_lokfa where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_lokfa) from amu_lokfa where kode_lokasi='"+this.app._lokasi+"'",
													  ["kode_lokfa","nama"],"and",["kode","nama"]);
		}		
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Arsip",sender, sender.row, sender.col,
													  "select distinct no_arsip,no_surat, nama from amu_arsip where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct  no_arsip) from amu_arsip where kode_lokasi='"+this.app._lokasi+"'",
													  ["no_arsip","no_surat","nama"],"and",["No Arsip","No Surat","Nama"]);
		}		
	},
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (sender.getCell(1,row)=="All")
		 {
			sender.setCell(2,row,"");
			sender.setCell(3,row,"");
		 }
		} 
	},
	mainButtonClick: function(sender){		
		if (sender == this.app._mainForm.bBack){
			if (this.trail1 && this.trail1.visible && this.trail1.trail2 && this.trail1.trail2.visible){
				this.trail1.trail2.hide();
				this.trail1.unblock();
			}else if (this.trail1 && this.trail1.visible){
				this.trail1.hide();
				this.unblock();
			}
		}
	},
	initComp: function(filter){
		try{
		        var sql = new server_util_arrayList({items:[				
					"select c.nama, count(distinct a.no_arsip) as tot from amu_arsip a "+ 
					" inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
					"	inner join amu_propinsi c on c.kode_prop = b.kode_prop and c.kode_lokasi = a.kode_lokasi "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" group by c.nama",
					"select c.kode_rak as nama, count(distinct a.no_arsip)as tot from amu_arsip a "+ 
					" inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
					"	inner join amu_rak c on c.kode_lokasi = a.kode_lokasi and b.kode_lokfa between awal and akhir "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" group by c.kode_rak",
					"select b.nama, count(a.kode_lokfa) as tot from amu_lokfa a "+ 					
					"	inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' group by b.nama",
					"select b.nama, count(a.kode_lokfa)as tot from amu_lokfa a "+ 					
					"	inner join amu_kodya b on b.kode_lokasi = a.kode_lokasi and b.kode_kodya = a.kode_kodya "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' group by b.nama",							
					"select a.kode_kodya, a.nama as nmkodya, b.nama as nmprop from amu_kodya a "+
					"	inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' ",
					"select distinct b.kode_lokfa, a.kode_rak from amu_rak a inner join amu_lokfa b on b.kode_lokasi = a.kode_lokasi and b.kode_lokfa between a.awal and a.akhir "+
					"where a.kode_lokasi = '"+this.app._lokasi +"' "
				]});
            
				this.dbLib.getMultiDataProviderA(sql);					           
				this.sql = sql;
		}catch(e){
			this.app.alert(e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
	   if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":					
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
							this.dataProvider = data;							
							var frameWidth = this.width / 2 - 30;
            				this.fr1 = new panel(this.tab.childPage[0],{bound:[10,10,frameWidth,this.height - 50],caption:"Arsip per Lokasi"});									            		        							
							this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
							this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Arsip per Lokasi"});		         	                        
							this.fr1.chart.data = data.result[0];
							this.fr1.sql = this.sql.get(0);	
            		        this.fr2 = new panel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,this.height - 50],caption:"Arsip per Ordner"});
            				this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});  							
                            this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Arsip per Ordner"});  
							this.fr2.chart.data = data.result[1];
							this.fr2.sql = this.sql.get(1);																													


							
							this.fr6 = new panel(this.tab.childPage[1],{bound:[10,10,frameWidth,this.height - 50],caption:"Lokasi per Propinsi"});
							this.fr7 = new panel(this.tab.childPage[1],{bound:[this.fr6.left+this.fr6.width + 15,10,frameWidth,this.height - 50],caption:"Lokasi per Kodya"});
							
							this.getChart(this.fr1.chart.data, this.fr1.chart);
							this.getChart(this.fr2.chart.data, this.fr2.chart);							
							this.setData(this.fr1.grid,data.result[0]);
							this.setData(this.fr2.grid,data.result[1]);							
							
														
							this.dataPropinsi = new arrayMap();
							var line;
							for (var i in data.result[4].rs.rows){
								line = data.result[4].rs.rows[i];
								this.dataPropinsi.set(line.kode_kodya, line);						
							}
							this.dataOrdner = new arrayMap();
							for (var i in data.result[5].rs.rows){
								line = data.result[5].rs.rows[i];
								this.dataOrdner.set(line.kode_lokfa, line);						
							}
							
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+"<br>"+result);
            }
       }
    },
	setData: function(grid, data){
		grid.clear();
		for (var i in data.rs.rows){
			grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
		}			
	},
    doTabChange: function(sender, page){
        this.count = 0;
		if (page == 1 && this.fr6.chart === undefined){
			var frameWidth = this.width / 2 - 30;																			
			this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
			this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi per Propinsi"});		        				
			this.fr6.chart.data = this.dataProvider.result[2];
			this.fr6.sql = this.sql.get(2);
			this.fr7.bGraph = new imageButton(this.fr7,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr7.bGrid = new imageButton(this.fr7,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr7.grid = new saiGrid(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});  
			this.fr7.chart = new flashChart(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi per Kodya"});		        
			this.fr7.chart.data = this.dataProvider.result[3];
			this.fr7.sql = this.sql.get(3);						
			
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);				
			this.setData(this.fr6.grid,this.dataProvider.result[2]);
			this.setData(this.fr7.grid,this.dataProvider.result[3]);			
		}
		if (page == 2 && this.fr10.chart === undefined){			
										
		}
		//this.firstLoad = true;
    },
	doObjectReady: function(sender){
	   try{	    
			this.count++;
		    if (this.tab.activePage == 0 && this.count == 4){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.tab.activePage == 1 && this.count == 4){
				this.timer.setEnabled(true);
				this.count = 0;
			}
        }catch(e){
            alert(e);
        }
    },        
	getChart: function(data,swf){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": (this.tab.activePage == 1 ? "Nilai (ribuan)" :"Jumlah"),"style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[swf.title]},"3d": 5 
		   },
		  "y_axis":{
			"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps":100
		  },
		  "tooltip":{
			"text": "Global Tooltip<br>val=#val#, top=#top#"
		  }
		};  
		var line,temp="", maxValue = -999999999,minValue = 999999999;				
		if (data.rs.rows[0]!==undefined)
		{
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       line.nama +"(#val#)",
				  "text--":      line.nama,
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [parseFloat(line.tot)],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);							
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);						
			}									
		}else{
			var line,temp="", maxValue = 0,minValue = 0;
			var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       "",
				  "text--":      "",
				  "font-size--": 10,
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [0],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);	
		}    			
			
		chart.y_axis.max = maxValue + 10;						
		swf.setChartData(chart); 
	},    
	doBtnClick: function(sender){
		try{
			if (sender.name == "graph"){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}else{
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			this.firstLoad = false;
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
	doGridClick: function(sender, col, row){
		try{
			if (this.trail1 === undefined){
				this.trail1 = new app_assetsap_dashboardfTrail1(this.owner,undefined, this);
				this.trail1.maximize();			
			}		
			var filter = (sender instanceof saiGrid ? sender.cells(0,row) : col);//col == title
			var sqlBase = " from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
					"	inner join amu_propinsi c on c.kode_prop = b.kode_prop and c.kode_lokasi = a.kode_lokasi "+
					"	left outer join amu_fisik d on d.kode_fisik = a.kode_fisik and d.kode_lokasi = a.kode_lokasi ";				
			switch(sender){
				case this.fr1.grid: 				
				case this.fr1.chart: 				
				case this.fr6.grid:				
				case this.fr6.chart:					
					this.trail1.setSQL("select distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa, b.alamat, to_char(a.tgl_awal,'dd-mm-YYYY') as tgl_awal, to_char(a.tgl_akhir,'dd-mm-YYYY') as tgl_akhir, b.kel, b.kec, b.kode_kodya as kodya, b.kode_prop as prop, b.tanah, b.bangun, d.nama as nmfisik, a.no_reg, a.keterangan "+
						sqlBase + " where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama = '"+filter+"' "+this.filter,
						"select count(distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa, b.alamat, b.kel, b.kec, b.kode_kodya, b.kode_prop, b.tanah, b.bangun) "+
						sqlBase + " where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Arsip per Lokasi(UBis) "+filter+" ");
				break;
				case this.fr2.grid:				
				case this.fr2.chart:				
					this.trail1.setSQL("select distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa, b.alamat, to_char(a.tgl_awal,'dd-mm-YYYY') as tgl_awal, to_char(a.tgl_akhir,'dd-mm-YYYY') as tgl_akhir, b.kel, b.kec, b.kode_kodya as kodya, b.kode_prop as prop, b.tanah, b.bangun, c.nama as nmfisik , a.no_reg, a.keterangan "+
						" from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
						"	inner join amu_rak d on d.kode_lokasi = a.kode_lokasi and a.kode_lokfa between d.awal and d.akhir "+
						"	left outer join amu_fisik c on c.kode_fisik = a.kode_fisik and c.kode_lokasi = a.kode_lokasi "+				
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.kode_rak = '"+filter+"' "+this.filter,
						"select count(distinct a.no_arsip) "+
						" from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
						"	inner join amu_rak d on d.kode_lokasi = a.kode_lokasi and a.kode_lokfa between d.awal and d.akhir "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.kode_rak = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Arsip per ordner "+filter+" ");
				break;
				case this.fr7.grid:				
				case this.fr7.chart:				
					this.trail1.setSQL("select distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa, b.alamat, b.kel, b.kec, b.kode_kodya as kodya, b.kode_prop as prop, b.tanah, b.bangun "+
						sqlBase + 
						"	inner join amu_rak d on d.kode_lokasi = a.kode_lokasi and a.kode_lokfa between d.awal and d.akhir "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.kode_rak = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Arsip per ordner "+filter+" ");
				break;				
			}
			this.block(true);
			this.trail1.show();
		}catch(e){
			alert(e);
		}
	},
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.tab.activePage == 0){
			this.getChart(this.fr1.chart.data, this.fr1.chart);
			this.getChart(this.fr2.chart.data, this.fr2.chart);			
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();			
		}
		if (this.tab.activePage == 1){
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);			
			this.fr6.chart.refresh();
			this.fr7.chart.refresh();
		}
		if (this.tab.activePage == 2){
			this.getChart(this.fr10.chart.data, this.fr10.chart);
			//this.getChart(this.fr11.chart.data, this.fr7.chart);
			//this.getChart(this.fr12.chart.data, this.fr8.chart);
			//this.getChart(this.fr13.chart.data, this.fr9.chart);			
			this.fr10.chart.refresh();
			//this.fr7.chart.refresh();
			//this.fr8.chart.refresh();
			//this.fr9.chart.refresh();			
		}
		
	}
});

window.app_assetsap_dashboardfTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboardfTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboardfTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});				
			this.grid = new saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:17,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:"No Arsip, No Surat, Deskripsi, Lokasi, No Ordner, Tanggal, Akhir Masa Berlaku, Keterangan, Alamat, Kelurahan, Kecamatan, Kodya, Propinsi, Luas Tanah, Luas Bangunan,Fisik, No Register ",
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100,100,250,120,80]], colFormat:[[13,12],[cfNilai,cfNilai]],rowSelect:true});            
			this.sgn = new sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboardfTrail1.extend(window.childForm);
window.app_assetsap_dashboardfTrail1.implement({    
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
	doRequestReady: function(sender, methodName, result){
		try{			
			if (sender == this.dbLib && methodName == "getDataProviderPage"){
				result = JSON.parse(result);
				if (typeof result != "string"){
					var line;
					this.grid.clear();
					for (var i in result.rs.rows){
						line = result.rs.rows[i];						
						var dt = this.callObj.dataPropinsi.get(line.kodya);
						if (dt == undefined) dt = {nmkodya:'-', nmprop:'-'};
						var ordner = this.callObj.dataOrdner.get(line.kode_lokfa);
						if (ordner == undefined) ordner = {kode_rak:'-'};						
						this.grid.appendData([line.no_arsip, line.no_surat, line.nama, line.kode_lokfa, ordner.kode_rak, line.tgl_awal, line.tgl_akhir,line.keterangan,  line.alamat, line.kel, line.kec, dt.nmkodya, dt.nmprop, line.tanah, line.bangun,line.nmfisik, line.no_reg]);
					}
					this.grid.setNoUrut((this.page - 1) * this.rowPerPage);
				}else system.alert(result);
			}
		}catch(e){
			systemAPI.alert(e,result);
		}
	},
	doGridDoubleClick: function(sender, col, row){
		if (this.trail2 === undefined){
			this.trail2 = new app_assetsap_dashboardfTrail2(this.owner,undefined, this);			
		}
		this.block(true);
		this.trail2.setValue(this.grid.cells(0,row));
		this.trail2.setPanelCaption("Detail Asset "+ this.grid.cells(0,row)+" "+this.grid.cells(2,row));
		this.trail2.show();
	}
});

window.app_assetsap_dashboardfTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboardfTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboardfTrail2";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[this.width / 2 - 300 ,30,600, this.height - 50], caption:""});						
			this.ed_surat = new saiLabelEdit(this.tab,{
				bound:[20,20,200,20],
				caption:"No Sertifikat",				
				readOnly:true
			});
			this.ed_nama = new saiLabelEdit(this.tab,{
				bound:[20,21,500, 20],
				caption:"Nama",
				readOnly:true
			});
			this.ed_lokasi = new saiLabelEdit(this.tab,{
				bound:[20,22,200,20],
				caption:"Lokasi",
				readOnly:true
			});
			this.ed_ordner = new saiLabelEdit(this.tab,{
				bound:[20,24,200,20],
				caption:"No. Ordner",
				readOnly:true
			});
			this.ed_tgl1 = new saiLabelEdit(this.tab,{
				bound:[20,23,200,20],
				caption:"Tanggal",
				readOnly:true
			});
			this.ed_tgl2 = new saiLabelEdit(this.tab,{
				bound:[250,23,200,20],
				caption:"Akhir Masa Berlaku",
				readOnly:true
			});
			
			this.ed_ket = new saiLabelEdit(this.tab,{
				bound:[20,25,500,20],
				caption:"Keterangan",
				readOnly:true
			});
			this.ed_fisik = new saiLabelEdit(this.tab,{
				bound:[20,26,200,20],
				caption:"Fisik",
				readOnly:true
			});
			this.ed_reg = new saiLabelEdit(this.tab,{
				bound:[20,27,200,20],
				caption:"No Register",
				readOnly:true
			});
			
			this.p1 = new panel(this.tab,{bound:[20,300,500,180],border:3,caption:"Detail File"});
			this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width - 4,128],colCount:2,readOnly:true,
				colTitle:"Nama File, Download",
                colWidth:[[1,0],[100,250]],colFormat:[[1],[cfButton]],click:[this,"doSgBtnClick"], 
                colAlign:[[1],[alCenter]]});
			this.sgn2 = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,this.p1.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg});            
			
			this.tab.rearrangeChild(30,23);
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboardfTrail2.extend(window.childForm);
window.app_assetsap_dashboardfTrail2.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		try {			
			var row = this.callObj.grid.row;
			var grid = this.callObj.grid;
			this.ed_surat.setText(grid.cells(1,row));				
			this.ed_nama.setText(grid.cells(2,row));
			this.ed_lokasi.setText(grid.cells(3,row));
			this.ed_ordner.setText(grid.cells(4, row));
			this.ed_tgl1.setText(grid.cells(5,row));
			this.ed_tgl2.setText(grid.cells(6,row));
			this.ed_ket.setText(grid.cells(7,row));
			this.ed_fisik.setText(grid.cells(15,row));
			this.ed_reg.setText(grid.cells(16,row));
			var data = this.dbLib.getDataProvider("select no_gambar as nm " +
				" from amu_arsip_dok " +			
				" where no_arsip = '" +value +"' ", true);
			this.sg.clear();			
			if (typeof data != "string") {				
				for (var k in data.rs.rows){
					var line=data.rs.rows[k];
					this.sg.appendData([line.nm,"Download"]);
					this.sg.rows.get(k).setCellColor(1,"#ff9900");							
				}
			}
		}catch(e){
			alert(e);
		}
	},
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 1)
				window.open("server/media/"+sender.cells(0,row));
		}catch(e){
			alert(e);
		}
	}
});
