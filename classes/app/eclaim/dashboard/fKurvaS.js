/***********************************************************************************************
*	Copyright (c) 2008 SAI and TELKOM Indonesia, PT								
***********************************************************************************************/
window.app_eclaim_dashboard_fKurvaS = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_eclaim_dashboard_fKurvaS.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_dashboard_fKurvaS";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 99);	
			uses("pageControl;childPage;panel;flashChart;saiGrid;timer;util_filterRep;toolbar;roundPanel;util_xlsChart");			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new pageControl(this,{bound:[0,0,this.width - 10, this.height - 30],
				childPage: ["Progress Proses Klaim","Data Proses"],
				borderColor:"#35aedb", pageChange:[this,"doTabChange"], headerAutoWidth:false});						
			//----------- Filter
			this.toolbar = new toolbar(this,{bound:[this.width - 200,0,160,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");			
			this.toolbar.addButton("bRefresh","Refresh","icon/dynpro/refresh.png","Resfresh");			
			this.toolbar.makeRound(5);
			
			this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});                      
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.pFilter.area = new saiCBBL(this.pFilter,{bound:[20,30,200,20], caption:"Vendor",
				multiSelection: false,
				sql: ["select kode_lokfa, nama from amu_lokasi ",["kode_lokfa","nama"],false,["Bus. Area","Descp"],"and","Daftar Bus. Area",true]
			});			
            this.pFilter.setTabChildIndex();			
            //-----------
			this.filter = "";						
			this.initialization = true;			            
            this.xlsChart = new util_xlsChart();
            this.initComp("","");
            this.timer = new timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim_dashboard_fKurvaS.extend(window.childForm);
window.app_eclaim_dashboard_fKurvaS.implement({
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
	       case "bRefresh" :   
	           this.initComp("","");
	       break;
       }	   
    },	
	doClick: function(sender){
        try{
            if (sender == this.bApply){               
				this.initComp(this.pFilter.area.getText(), this.pFilter.klp.getText());
				this.pFilter.hide();
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
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1),new  Array(0,2));			
		}catch(e){
			alert(e);
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
	initComp: function(lokfa, klp){
		try{
		        var sql = new server_util_arrayList();		        
				sql.add("select  date_format(b.tgl_mulai,'%d-%m-%Y') as tgl_mulai, date_format(b.tgl_akhir,'%d-%m-%Y') as tgl_akhir, "+
					" concat(date_format(b.tgl_mulai, '%M'),'-', WEEK(b.tgl_mulai,5) - WEEK(DATE_SUB(b.tgl_mulai, INTERVAL DAYOFMONTH(b.tgl_mulai)-1 DAY),5)+1)  as w "+
					" , sum(persen/100 * bobot) as persen, sum(b.progress) as prog "+
					" from eclaim_rencana_m a inner join eclaim_rencana_d b on b.proses = a.proses "+
					" group by tgl_mulai, tgl_akhir,w order by b.tgl_mulai ");				
				sql.add("select  a.proses, date_format(b.tgl_mulai,'%d-%m-%Y') as tgl_mulai, date_format(b.tgl_akhir,'%d-%m-%Y') as tgl_akhir, "+
					" concat(date_format(b.tgl_mulai, '%M'),'-', WEEK(b.tgl_mulai,5) - WEEK(DATE_SUB(b.tgl_mulai, INTERVAL DAYOFMONTH(b.tgl_mulai)-1 DAY),5)+1)  as w "+
					" , persen/100 * bobot as persen, b.progress as prog "+
					" from eclaim_rencana_m a inner join eclaim_rencana_d b on b.proses = a.proses "+
					" order by a.proses,b.tgl_mulai ");				
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
    	                    if (!this.initialization){								
								this.fr11.data = data.result[0];								
								this.setData(this.fr11.grid,this.fr11.data);
								this.checkData = true;								
								this.getChart(this.fr11.data, this.fr11.chart,this.tab.activePage == this.tab.childPage[0].resourceId && this.fr11.chart.ready && this.fr11.chart.visible);
								return;
							}
    	                    this.initialization = false;
							this.dataProvider = data;							
							var frameWidth = this.width / 2 - 30;
							var frameHeight = this.height - 70;							            				
							
							this.fr11 = new panel(this.tab.childPage[0],{bound:[10,10,this.width - 30,this.height - 70],caption:"Schedule Monitoring (S-CURVE)"});													
							var frameWidth = this.width / 2 - 30;						
							this.fr11.bGraph = new imageButton(this.fr11,{bound:[this.fr11.width - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr11.bGrid = new imageButton(this.fr11,{bound:[this.fr11.width - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Rincian Proses",click:[this,"doBtnClick"], name:"grid"});
							this.fr11.bXls = new imageButton(this.fr11,{bound:[this.fr11.width - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							this.fr11.grid = new saiGrid(this.fr11,{bound:[10,30,frameWidth - 290,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Rencana","Progress"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.chart = new flashChart(this.fr11,{bound:[frameWidth - 250 ,30,frameWidth + 240 ,this.fr11.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Progress Inventarisasi"});							
							frameWidth = this.width / 3 - 20;						
							this.fr11.p1 = new panel(this.fr11,{caption:"Hasil REQUIREMENT",bound:[10,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.p2 = new panel(this.fr11,{caption:"Hasil DEVELOPMENT",bound:[frameWidth + 20,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.p3 = new panel(this.fr11,{caption:"Hasil IMPLEMENTATION",bound:[(frameWidth * 2) + 30,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});							
							
							this.fr11.grid1 = new saiGrid(this.fr11.p1,{bound:[0,30,this.fr11.p1.width-1,this.fr11.p1.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Persen","Progress"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.grid2 = new saiGrid(this.fr11.p2,{bound:[0,30,this.fr11.p2.width-1,this.fr11.p2.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Persen","Progress"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.grid3 = new saiGrid(this.fr11.p3,{bound:[0,30,this.fr11.p3.width-1,this.fr11.p3.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Persen","Progress"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});							
							this.fr11.data = this.dataProvider.result[0];
							this.fr11.data2 = this.dataProvider.result[1];
							this.fr11.sql = this.sql.get(0);
							if (systemAPI.browser.msie) {
								//this.timer.setEnabled(true);
							}							
							this.setData(this.fr11.grid,this.fr11.data);
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+"<br>"+result);
            }
       }
    },
	setData: function(grid, data, grid2){		
		if (grid == this.fr11.grid){
			for (var i in data.rs.rows){//floatToNilai(data.rs.rows[i].rencana), floatToNilai(data.rs.rows[i].prog2),
				grid.appendData([data.rs.rows[i].tgl_mulai,data.rs.rows[i].tgl_akhir,data.rs.rows[i].w,  floatToNilai(data.rs.rows[i].persen), floatToNilai(data.rs.rows[i].prog)]);
			}			
			data = this.fr11.data2;
			var grid1 = this.fr11.grid1;
			var grid2 = this.fr11.grid2;
			var grid3 = this.fr11.grid3;
			grid1.clear(),grid2.clear(),grid3.clear();
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				if (line.proses == "Requirement") grid = grid1;
				if (line.proses == "Development") grid = grid2;
				if (line.proses == "Implement") grid = grid3;
				grid.appendData([line.tgl_mulai,line.tgl_akhir,line.w,  floatToNilai(line.persen), floatToNilai(line.prog)]);
			}
		}
	},
    doTabChange: function(sender, page){
        this.count = 0;
		if (page == 1 && this.fr6.chart === undefined){																	
		}
		if (page == 2 && this.fr10.chart === undefined){			
		}		
    },
	doObjectReady: function(sender){
	   try{	    					    			
			this.getChart(sender.owner.data, sender);
        }catch(e){
           // alert("Object ready :" + e);
        }
    },        
	getChart: function(data,swf,autoRefresh){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		
		if (swf == this.fr11.chart){
			var chart = {
			  "title": {
				"text": "PROGRESS KLAIM " + (this.pFilter.area.getText() == "" ? "":"\n LOKASI "+this.pFilter.area.rightLabelCaption)
			  },
			  "bg_colour":"#edf5f8",
			  "y_legend":{
				"text": ("Persen"),"style": "{color: #736AFF; font-size: 12px;}"
			  },
			  "elements":[],
			  "x_axis":{
				"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": 45}
			   },
			  "y_axis":{
				"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps" : 10
			  },
			  "tooltip":{
				"text": "Global Tooltip<br>val=#val#, top=#top#"
			  }
			};  
			var line,temp="", maxValue = -999999999,minValue = 999999999;
			var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
			var sapColor = (r+256 * g + 65536 * b).toString(16);
			r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
			var veatColor = (r+256 * g + 65536 * b).toString(16);
			var sap = {"type":"line","alpha":     0.8,"colour":    "#ff9900",
				  "tip":       "Rencana (#val#)",
				  "text":      "Rencana",
				  "font-size--": 10,
				  "values" :   [],
				  "dot-style": { "type": "anchor", "dot-size": 4, "halo-size": 2, "colour": "#ff9900", "rotation": 45, "sides": 4 },
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "on-show":	{"type": "grow-up"}
				};
			var veat = {"type":"line","alpha":     0.8,"colour":    "#0000ff",
				  "tip":       "Progress (#val#) ",
				  "text":      "Progress",
				  "font-size--": 10,
				  "values" :   [],
				  "linkCtrl": swf.resourceId.toString(),
				  "dot-style": { "type": "star", "dot-size": 4, "halo-size": 1, "colour": "#0000ff" },
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "on-show":	{"type": "grow-up"}
				};
			swf.labels = [];
			this.dataDivisi = new arrayList();
			if (data.rs.rows[0]!==undefined)
			{
				for (var i in data.rs.rows){
					line = data.rs.rows[i];  						
					sap.values.push({"value":Math.round(line.persen),"type":"anchor","tip":"Rencana :"+line.w +" ( #val#% )"});
					var d1 = line.tgl_mulai;
					d1 = new Date().strToDate(d1);			
					//if (d1 < new Date()) 
					veat.values.push( {"value":Math.round(line.prog),"type":"star","tip":"Progress :" + line.w +" ( #val#% )"});					
					chart.x_axis.labels.labels.push(line.w);
					swf.labels.push(line.nama);
					if (parseFloat(line.persen) > maxValue ) maxValue = parseFloat(line.persen);
					if (parseFloat(line.persen) < minValue ) minValue = parseFloat(line.persen);						
					if (parseFloat(line.prog) > maxValue ) maxValue = parseFloat(line.prog);
					if (parseFloat(line.prog) < minValue ) minValue = parseFloat(line.prog);						
					this.dataDivisi.add(line.nama);
				}									
			}else{
				var line,temp="", maxValue = 0,minValue = 0;			
			}    			
			chart.elements.push(sap);
			chart.elements.push(veat);
		}
		chart.y_axis.max = maxValue + 10;		
		swf.setChartData(chart,autoRefresh);		
	},    
	doBtnClick: function(sender){
		try{
			if (sender == this.fr11.bXls){				
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("KurvaS.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < this.fr11.grid.getRowCount(); i++){
					for (var c=0; c < this.fr11.grid.getColCount(); c++){
						colTitle[c] = this.fr11.grid.columns.get(c).title;
						if (data[c] === undefined) {
							data[c] = [];
							if (c > 2){
								var col = this.xlsChart.indexToColumn(c);
								var colCat = this.xlsChart.indexToColumn(2);
								var max = this.fr11.grid.getRowCount()+1;
								series.set(c, {title: this.fr11.grid.columns.get(c).title, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
							}
						}
						if (c == 4){
							var d1 = this.fr11.grid.cells(0,i);							
							d1 = new Date().strToDate(d1);										
							if (d1 < new Date()) data[c][data[c].length] = c > 2 ? parseFloat(nilaiToFloat(this.fr11.grid.cells(c, i))) : this.fr11.grid.cells(c, i);
							else data[c][data[c].length] = "";									
						}else  data[c][data[c].length] = c > 2 ? parseFloat(nilaiToFloat(this.fr11.grid.cells(c, i))) : this.fr11.grid.cells(c, i);									
					}					
				}				
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setData(data);
				this.xlsChart.setChartType("line");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
				}							
				this.xlsChart.setTitle("PROGRESS KKIL");
				this.xlsChart.setXTitle("Minggu ke-n");
				this.xlsChart.setYTitle("Jumlah NKA");
				//window.open( this.xlsChart.getChart() );
				downloadFile(this.xlsChart.getChart() );
			}else if (sender == this.fr11.bGrid){
				sender.owner.p1.show();
				sender.owner.p2.show();
				sender.owner.p3.show();
				sender.owner.grid.hide();
				sender.owner.chart.hide();
			}else if (sender == this.fr11.bGraph){
				sender.owner.p1.hide();
				sender.owner.p2.hide();
				sender.owner.p3.hide();
				sender.owner.grid.show();
				sender.owner.chart.show();
			}else if (sender.name == "graph"){
				sender.owner.grid.hide();
				sender.owner.chart.show();
				if (sender.owner.grid2)sender.owner.grid2.hide();
			}else{
				sender.owner.grid.show();
				if (sender.owner.grid2)sender.owner.grid2.show();
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
			this.doGridClick(sender, title, index);
		}catch(e){
			alert(e);
		}
	},
	doGridClick: function(sender, col, row){
		try{			
			var filter = (sender instanceof saiGrid ? sender.cells(0,row) : this.dataDivisi.get(row));//col == title
			
			if (sender instanceof flashChart){
				if (sender.clicked > 0) { filter = " "; sender.clicked = -1;}
				var sql = new server_util_arrayList();				
				if (this.tab.activePage == this.tab.childPage[0].resourceId){
					sql.add("select nama, count(no_gabung) as totsap, sum(status) as totlap from "+
						" (select distinct a.no_gabung, case when '"+filter+"' = ' ' then  b.nama else 'Kantor Divisi' end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%'"+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  c.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%' ) a group by nama order by nama ");	
					
					sql.add("select nama,  sum(status) / count(no_gabung) * 100 as tot from "+
						" (select distinct a.no_gabung, case when '"+filter+"' = ' ' then b.nama else 'Kantor Divisi' end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  c.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%' ) a group by nama order by nama ");	
				}else if (this.tab.activePage == this.tab.childPage[1].resourceId){
					sql.add("select nama,  sum(nilai_buku) as totsap, sum(status) as totlap from ("+
					" select distinct a.no_gabung, case when '"+filter+"' = ' ' then b.nama else 'Kantor Divisi' end as nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end  end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%'  "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%'  ) a group by nama order by nama ");
					
					sql.add("select nama,  sum(status) as tot from ("+
					" select distinct a.no_gabung, case when '"+filter +"' = ' ' then b.nama else 'Kantor Divisi' end as nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter)+"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then  d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else c.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+trim(filter)+"%' ) a group by nama order by nama ");	
					
				}else return;
				var data = this.dbLib.getMultiDataProvider(sql, true);							
				sender.owner.data = data.result[0];
				sender.owner.sibling.data  = data.result[1];
				this.getChart(sender.owner.data, sender);
				this.setData(sender.owner.grid,sender.owner.data);
				
				this.getChart(sender.owner.sibling.data, sender.owner.sibling.chart);
				this.setData(sender.owner.sibling.grid, sender.owner.sibling.data);
				
				sender.clicked++;								
				return;
			}
			if (this.trail1 === undefined){
				this.trail1 = new app_saku2_dashboardfTrail1(this.owner,undefined, this);
				this.trail1.maximize();			
			}					
			
			var sqlBase = "select a.kode_lokasi, e.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = a.kode_lokasi and e.kode_induk = '00' "+
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
				" union "+
				" select a.kode_lokasi, d.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+				
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
				"union "+
				" select a.kode_lokasi, c.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' ";
			switch(sender){
				case this.fr1.grid: 
				case this.fr6.grid:					
				case this.fr1.chart: 
				case this.fr6.chart:															
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + " ) a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
				break;
				case this.fr2.grid:
				case this.fr7.grid:
				case this.fr2.chart:
				case this.fr7.chart:					
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + " ) a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
				break;
				case this.fr10.grid:				
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + ") a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
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
			this.getChart(this.fr2.chart.data, this.fr12.chart);			
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
			this.fr10.chart.refresh();			
		}
		
	}
});

window.app_saku2_dashboardfTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_saku2_dashboardfTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku2_dashboardfTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});				
			this.grid = new saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:12,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["No Asset","No SN","Deskripsi Asset","Deskripsi Alamat","Kelompok","Area","APC","Cap Date","Nilai Perolehan","Akumulasi Penyusutan","Nilai Buku","Quantity SAP"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,250,250,60,120]], colFormat:[[8,9,10,11],[cfNilai,cfNilai, cfNilai, cfNilai]],rowSelect:true});            
			this.sgn = new sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_saku2_dashboardfTrail1.extend(window.childForm);
window.app_saku2_dashboardfTrail1.implement({    
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
						this.grid.appendData([line.no_fa, line.no_sn,line.nama,line.alamat,line.kode_klpfa, line.kode_lokfa, line.kode_klpakun, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku),  line.jml_fisik]);
					}
					this.grid.setNoUrut((this.page - 1) * this.rowPerPage);
				}else system.alert(result);
			}
		}catch(e){
			alert(result);
		}
	},
	doGridDoubleClick: function(sender, col, row){
		if (this.trail2 === undefined){
			this.trail2 = new app_saku2_dashboardfTrail2(this.owner,undefined, this);			
		}
		this.block(true);
		this.trail2.setValue(this.grid.cells(0,row) +this.grid.cells(1,row));
		this.trail2.setPanelCaption("Detail Asset "+ this.grid.cells(0,row)+" "+this.grid.cells(2,row));
		this.trail2.show();
	}
});

window.app_saku2_dashboardfTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_saku2_dashboardfTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku2_dashboardfTrail2";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[this.width / 2 - 300 ,30,600, this.height - 50], caption:""});
			this.ed_fa = new saiLabelEdit(this.tab,{bound:[20,1,200,20],caption:"No Asset",readOnly:true});
			this.ed_sn = new saiLabelEdit(this.tab,{bound:[20,3,200,20],caption:"No SN",readOnly:true});
			this.ed_nama = new saiLabelEdit(this.tab,{bound:[20,2,500,20],caption:"Deskripsi Asset",readOnly:true});
			this.ed_group = new saiLabelEdit(this.tab,{bound:[20,3,500,20],caption:"Kelompok",readOnly:true});
			this.ed_area = new saiLabelEdit(this.tab,{bound:[20,4,500,20],caption:"Area",readOnly:true});
			this.ed_jenis = new saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"APC",readOnly:true});
			this.ed_date = new saiLabelEdit(this.tab,{bound:[20,5,200,20],caption:"Cap. Date",readOnly:true});
			this.ed_nilai = new saiLabelEdit(this.tab,{bound:[20,6,200,20],caption:"Nilai Perolehan",readOnly:true,tipeText:ttNilai});
			this.ed_ap = new saiLabelEdit(this.tab,{bound:[20,7,200,20],caption:"Akumulasi Penyusutan",readOnly:true,tipeText:ttNilai});
			this.ed_buku = new saiLabelEdit(this.tab,{bound:[20,8,200,20],caption:"Nilai Buku",readOnly:true,tipeText:ttNilai});			
			this.ed_alamat = new saiLabelEdit(this.tab,{bound:[20,9,500,20],caption:"Alamat",readOnly:true});			
			this.ed_jml = new saiLabelEdit(this.tab,{bound:[20,6,200,20],caption:"Quantity SAP",readOnly:true});			
				
			this.tab.rearrangeChild(30,23);
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_saku2_dashboardfTrail2.extend(window.childForm);
window.app_saku2_dashboardfTrail2.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		try {			
			var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, a.tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik" +
			" from amu_asset a inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi" +
			"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi " +						
			" where a.no_gabung = '" +value +"' ", true);
			if (typeof data != "string") {
				value = data.rs.rows[0];
				if (value !== undefined) {
					this.ed_fa.setText(value.no_fa);
					this.ed_sn.setText(value.no_sn);
					this.ed_nama.setText(value.nama);
					this.ed_group.setText(value.kode_klpfa);
					this.ed_area.setText(value.kode_lokfa);
					this.ed_jenis.setText(value.kode_klpakun);
					this.ed_date.setText(value.tgl_perolehan);
					this.ed_nilai.setText(floatToNilai(parseFloat(value.nilai)));
					this.ed_ap.setText(floatToNilai(parseFloat(value.nilai_ap)));
					this.ed_buku.setText(floatToNilai(value.nilai_buku));
					this.ed_alamat.setText(value.alamat);
					this.ed_jml.setText(value.jml_fisik);					
				}else{
					this.ed_fa.clear();
					this.ed_sn.clear();
					this.ed_nama.clear();
					this.ed_group.clear();
					this.ed_area.clear();
					this.ed_jenis.clear();
					this.ed_date.clear();
					this.ed_nilai.clear();
					this.ed_ap.clear();
					this.ed_buku.clear();
					this.ed_alamat.clear();
					this.ed_jml.clear();					
				}
			}else{
				this.ed_fa.clear();
				this.ed_sn.clear();
				this.ed_nama.clear();
				this.ed_group.clear();
				this.ed_area.clear();
				this.ed_jenis.clear();
				this.ed_date.clear();
				this.ed_nilai.clear();
				this.ed_ap.clear();
				this.ed_buku.clear();
				this.ed_alamat.clear();
				this.ed_jml.clear();				
			}
		}catch(e){
			alert(e);
		}
	},
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	}
	
});
/*						
						*/
