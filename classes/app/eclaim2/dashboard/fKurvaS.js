/***********************************************************************************************
*	Copyright (c) 2008 SAI and TELKOM Indonesia, PT								
***********************************************************************************************/
window.app_eclaim2_dashboard_fKurvaS = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_eclaim2_dashboard_fKurvaS.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim2_dashboard_fKurvaS";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 99);	
			uses("pageControl;childPage;panel;flashChart;saiGrid;timer;util_filterRep;util_xlsChart");			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new pageControl(this,{bound:[0,0,this.width - 10, this.height - 30],
				childPage: ["Filter","Progress Proses Klaim"],
				borderColor:"#35aedb", pageChange:[this,"doTabChange"], headerAutoWidth:false});						
			//----------- Filter			
			
			this.pFilter = new panel(this.tab.childPage[0],{bound:[10,20,500,235],caption:"Filter",background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});                      
            
			this.pFilter.area = new saiCBBL(this.pFilter,{bound:[20,30,200,20], caption:"Vendor",
				multiSelection: false, change:[this,"doAreaChange"],
				sql: ["select kode_vendor, nama from tlk_vendor ",["kode_vendor","nama"],false,["Kode Vendor","Descp"],"where","Daftar Vendor",true]
			});			
			this.pFilter.klaim = new saiCBBL(this.pFilter,{bound:[20,31,200,20], caption:"Laporan Awal",				
				multiSelection:false,
				sql: ["select a.no_klaim, a.keterangan from tlk_klaim a inner join tlk_pelaksanaan b on a.no_klaim=b.no_klaim ",["no_klaim","keterangan"],false,["No Klaim","Keterangan"],"where","Daftar Klaim",true]
			});			
			this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
            this.pFilter.setTabChildIndex();			
            this.pFilter.rearrangeChild(25,23);			
            //-----------
			this.filter = "";						
			this.initialization = true;			            
            this.xlsChart = new util_xlsChart();
            this.initComp("","");
            this.timer = new timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
            this.standarLib =  new util_standar();
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim2_dashboard_fKurvaS.extend(window.childForm);
window.app_eclaim2_dashboard_fKurvaS.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
		if (this.trail1 !== undefined) this.trail1.close();		
    },	
    doBtnClick: function(sender){		
	},
    doAreaChange: function(sender){
		if (sender == this.pFilter.area){
			var sql = "select a.no_klaim, a.keterangan  from tlk_klaim a  "+
				   (this.pFilter.area.getText() != "" ? 
					"	inner join tlk_penunjukan b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
					"	inner join tlk_penunjukan_d c on c.no_penunjukan = b.no_penunjukan and c.kode_lokasi = b.kode_lokasi and c.kode_vendor = '"+this.pFilter.area.getText()+"' " : " " )+
					" where a.kode_lokasi = '"+this.app._lokasi+"' ";
		
			this.pFilter.klaim.setSQL(sql,["no_klaim","keterangan"],false,["No Klaim","Keterangan"],"where","Daftar Klaim",true);
		}
	},
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 40);
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           //this.pFilter.setVisible(!this.pFilter.visible);
	       break;
	       case "bRefresh" :   
	           this.initComp("","");
	       break;
       }	   
    },	
	doClick: function(sender){
        try{
            if (sender == this.bApply){               
				this.initComp(this.pFilter.area.getText(), this.pFilter.klaim.getText());
				//this.pFilter.hide();
				this.tab.setActivePage(this.tab.childPage[1]);
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
	initComp: function(vendor, klaim){
		try{
		        var sql = new server_util_arrayList();		        		        
				sql.add("select distinct a.no_klaim, a.keterangan  from tlk_klaim a  "+
				   (vendor != "" ? 
					"	inner join tlk_penunjukan b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
					"	inner join tlk_penunjukan_d c on c.no_penunjukan = b.no_penunjukan and c.kode_lokasi = b.kode_lokasi and c.kode_vendor = '"+vendor+"' " : "" )+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_klaim like '"+klaim+"%' order by a.no_klaim");				
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
								this.fr11.data2 = data.result[0];								
								this.setData(this.fr11.grid2,this.fr11.data2, 1);
								this.checkData = true;								
								this.getChart(this.fr11.data, this.fr11.chart,this.tab.activePage == this.tab.childPage[1].resourceId && this.fr11.chart.ready && this.fr11.chart.visible);
								return;
							}
    	                    this.initialization = false;
							this.dataProvider = data;							
							var frameWidth = this.width / 2 - 30;
							var frameHeight = this.height - 70;							            				
							
							this.fr11 = new panel(this.tab.childPage[1],{bound:[10,10,this.width - 30,this.height - 70],caption:"Data Klaim"});													
							var frameWidth = this.width / 2 - 30;						
							this.fr11.bGraph = new imageButton(this.fr11,{bound:[this.fr11.width - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr11.bGrid = new imageButton(this.fr11,{bound:[this.fr11.width - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Rincian Proses",click:[this,"doBtnClick"], name:"grid"});
							this.fr11.bXls = new imageButton(this.fr11,{bound:[this.fr11.width - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							this.fr11.grid2 = new saiGrid(this.fr11,{bound:[10,30,frameWidth - 230,this.fr11.getClientHeight() - 50],colCount:2,colTitle:["No Klaim","Keterangan"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[250,80]], cellEnter:[this,"doCellEnter"]});
							this.fr11.sgn = new sgNavigator(this.fr11,{bound:[10,this.fr11.getClientHeight() - 25,frameWidth - 230,25],buttonStyle:bsView, grid:this.fr11.grid2, pager:[this,'doSgPager']});
							this.fr11.grid = new saiGrid(this.fr11,{bound:[frameWidth - 200,30,frameWidth + 200,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Rencana","Progress"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.chart = new flashChart(this.fr11,{bound:[frameWidth - 200,30,frameWidth + 200 ,this.fr11.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Progress Inventarisasi"});																											
							this.fr11.data2 = this.dataProvider.result[0];							
							this.fr11.sql = this.sql.get(0);
							if (systemAPI.browser.msie) {
								//this.timer.setEnabled(true);
							}					
							this.fr11.sgn.setTotalPage(Math.ceil(this.fr11.data2.rs.rows.length / 20));		
							this.fr11.sgn.rearrange();
							this.setData(this.fr11.grid2,this.fr11.data2, 1);
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+"<br>"+result);
            }
       }
    },
    doSgPager: function(sender, page){
		this.setData(sender.owner.grid2, sender.owner.data2, page);
	},
	doCellEnter: function(sender, col, row){
		try{
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				"select date_format(a.tgl_mulai,'%Y') as y, date_format(a.tgl_mulai,'%m') as m,WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1 as w1, concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		sum(c.target * b.bobot / 100) as persen, 0 as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" inner join tlk_pelaksanaan_d c on c.tgl_mulai <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				//" left outer join (select a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress ) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+
				"	group by concat(date_format(a.tgl_mulai,'%M'), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, date_format(a.tgl_mulai,'%Y')) "+								
				"union "+
				"select date_format(a.tanggal,'%Y'), date_format(a.tanggal,'%m'),WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, concat(substr(date_format(a.tanggal,'%M'),1,3), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, '-',date_format(a.tanggal,'%y')) as w, "+
				"		100 as persen,0 as prog "+
				"	from tlk_progresspk a "+
				" inner join tlk_progresspk_d c on c.no_progress = a.no_progress "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+								
				" where b.no_klaim = '"+ sender.cells(0,row)+"' and a.tanggal > b.tgl_selesai "+
				"	group by concat(date_format(a.tanggal,'%M'), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, date_format(a.tanggal,'%Y')) "+
				"	order by y,m,w1" ,
				
				"select a.nu,a.nm_pekerjaan as item, concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		a.target * b.bobot / 100 as persen, c.realisasi as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ sender.cells(0,row)+"' ) c on c.tanggal <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+				
				"	order by a.nu, a.nm_pekerjaan, date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				
				"select concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		sum(d.realisasi * b.bobot / 100) as prog "+
				"	from (select distinct no_pelaksanaan, tgl_mulai, nm_pekerjaan from (select distinct a.no_pelaksanaan,a.tgl_mulai, a.nm_pekerjaan from tlk_pelaksanaan_d a inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and b.no_klaim = '"+ sender.cells(0,row)+"' "+
				"	 union	"+
				"		select distinct a.no_pelaksanaan, a.tanggal, c.nm_pekerjaan from tlk_progresspk a inner join tlk_progresspk_d c on c.no_progress = a.no_progress inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and a.tanggal > b.tgl_selesai and b.no_klaim = a.no_klaim and b.no_klaim = '"+ sender.cells(0,row)+"' ) a ) a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ sender.cells(0,row)+"' order by b.tanggal) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan and d.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+
				"	group by concat(date_format(a.tgl_mulai,'%M'), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, date_format(a.tgl_mulai,'%Y')) "+
				"	order by date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				
				"select a.tgl_selesai, case when a.tgl_selesai < max(ifnull(b.tanggal,0)) then max(ifnull(b.tanggal,0)) else a.tgl_selesai end as tgl from tlk_pelaksanaan a left outer join tlk_progresspk b on b.no_pelaksanaan = a.no_pelaksanaan and b.kode_lokasi = a.kode_lokasi and b.no_klaim = a.no_klaim "+
				" where a.no_klaim = '"+sender.cells(0,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
				"	group by a.tgl_selesai"
				
				]}), true);
			this.fr11.data3 = data.result[1];
			this.fr11.data = data.result[0];
			this.fr11.maxTgl = data.result[3].rs.rows[0];
			var data3 = data.result[2];			
			var prog = 0;
			for (var i in data.result[0].rs.rows){
				var line = data.result[0].rs.rows[i];
				for (var j in data3.rs.rows){
					var line2 = data3.rs.rows[j];										
					if (line.w == line2.w){						
						line.prog = line2.prog;
						break;
					}
				}				
			}
			this.setData(this.fr11.grid, data.result[1]);
			data = data.result[0];
			this.getChart(data, this.fr11.chart,this.tab.activePage == this.tab.childPage[1].resourceId && this.fr11.chart.ready && this.fr11.chart.visible);
			
		}catch(e){
			alert(e+" "+data);
		}
	},
	setData: function(grid, data, page){		
		if (grid == this.fr11.grid2){
			grid.clear();
			var start = (page - 1) * 20;
			var finish = start + 20 > data.rs.rows.length ? data.rs.rows.length: start+20;
			for (var i=start;i < finish;i++){//floatToNilai(data.rs.rows[i].rencana), floatToNilai(data.rs.rows[i].prog2),
				//grid.appendData([data.rs.rows[i].tgl_mulai,data.rs.rows[i].tgl_akhir,data.rs.rows[i].w,  floatToNilai(data.rs.rows[i].persen), floatToNilai(data.rs.rows[i].prog)]);
				grid.appendData([data.rs.rows[i].no_klaim,data.rs.rows[i].keterangan]);
			}						
			grid.setNoUrut(start);
		}
		if (grid == this.fr11.grid){
			// data dibuat per row dibuat kolom
			var line,wv, temp = new arrayMap();			
			for (var i in data.rs.rows){			
				line = data.rs.rows[i];
				wv = temp.get(line.item);//detail dari nm pekerjaan
				if (wv == undefined) wv = new arrayMap();
				wv.set(line.w, {target : line.persen, prog: line.prog});									
				temp.set(line.item, wv);
			}
			grid.clear();
			var colTitle= ["Item"], first = true;// untuk mengecek jumlah kolom
			var colWidth = [[0],[150]], total = [], tot=0;
			for (var i in temp.objList){
				data  = temp.get(i);
				if (first){
					//init grid lagi karena perubahan struktur kolom sesuai dengan week					
					grid.setColCount(data.getLength()+2);
					for (var c in data.objList){
						colWidth[0][colWidth[0].length] = colWidth[0].length;
						colWidth[1][colWidth[1].length] = 80;
						colTitle[colTitle.length] = c;
						total[total.length] = 0;
					}
					colTitle[colTitle.length] = "Total";
					total[total.length] = 0;
					grid.setColTitle(colTitle);										
					//grid.setColWidth(colWidth[0],colWidth[1]);
					
				}
				first = false;
				//ambil data target per week
				var dataAppend = [i], ix = 0, tot = 0;
				for (var c in data.objList){
					dataAppend[dataAppend.length] = data.get(c).target;
					total[ix] += parseFloat(data.get(c).target);
					tot += parseFloat(data.get(c).target);					
					ix++;					
				}
				dataAppend[dataAppend.length] = tot;
				total[ix] += tot;
				grid.appendData(dataAppend);
			}
			dataAppend = ["Total "];
			for (var i in total) dataAppend[dataAppend.length] = floatToNilai(total[i]);
			grid.appendData(dataAppend);		
			grid.rows.get(grid.rows.getLength() - 1).setColor("#ffff00");
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
			//this.getChart(sender.owner.data, sender);
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
				"text": "Kurva S "
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
				var data = [], series = new arrayMap(), colTitle = [], first = true;
				var dtTable = this.fr11.data;
				for (var i in dtTable.rs.rows){
					line = dtTable.rs.rows[i];
					if (first) {						
						ix = 0;
						for (var c in line){
							data[ix] = [];
							colTitle[colTitle.length] = c;																								
							if (ix > 0){ 
								var col = this.xlsChart.indexToColumn(ix);
								var colCat = this.xlsChart.indexToColumn(0);
								var max = dtTable.rs.rows.length+1;
								series.set(c, {title: c, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });						
							}
							ix++;
						}
					}
					ix = 0;
					for (var c in line){
						 data[ix][data[ix].length] = ix > 0 ? parseFloat(line[c]) : line[c];
						 ix++;
					}
					first = false;
				}				
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setData(data);
				this.xlsChart.setChartType("line");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
				}							
				this.xlsChart.setTitle("KURVA S");
				this.xlsChart.setXTitle("Minggu ke-n");
				this.xlsChart.setYTitle("Persen");
				//window.open( this.xlsChart.getChart() );
				downloadFile(this.xlsChart.getChart() );
			}else if (sender == this.fr11.bGrid){		
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}else if (sender == this.fr11.bGraph){				
				sender.owner.grid.hide();
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
				if (this.tab.activePage == this.tab.childPage[1].resourceId){
					sql.add("");	
					
					sql.add("");	
				}else if (this.tab.activePage == this.tab.childPage[2].resourceId){
					sql.add("");
					
					sql.add("");	
					
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
			
			var sqlBase = " ";
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
/*"select concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		sum(c.target * b.bobot / 100) as persen, 0 as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" inner join tlk_pelaksanaan_d c on c.tgl_mulai <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				//" left outer join (select a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress ) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+
				"	group by concat(date_format(a.tgl_mulai,'%M'), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, date_format(a.tgl_mulai,'%Y')) "+
				"	order by date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				"select a.nu,a.nm_pekerjaan as item, concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		a.target * b.bobot / 100 as persen, c.realisasi as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ sender.cells(0,row)+"' ) c on c.tanggal <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+				
				"	order by a.nu, a.nm_pekerjaan, date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				"select concat(substr(date_format(a.tanggal,'%M'),1,3), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, '-',date_format(a.tanggal,'%y')) as w, "+
				"		sum(d.realisasi * b.bobot / 100) as prog "+
				"	from tlk_progresspk a "+
				" inner join tlk_progresspk_d c on c.no_progress = a.no_progress "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+				
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ sender.cells(0,row)+"') d on d.tanggal <=  a.tanggal and d.nm_pekerjaan = c.nm_pekerjaan and d.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ sender.cells(0,row)+"' "+
				"	group by concat(date_format(a.tanggal,'%M'), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, date_format(a.tanggal,'%Y')) "+
				"	order by date_format(a.tanggal,'%Y'), date_format(a.tanggal,'%m'),WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1",
				"select * "						
						*/
