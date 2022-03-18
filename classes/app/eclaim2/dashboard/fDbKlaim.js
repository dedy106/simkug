window.app_eclaim2_dashboard_fDbKlaim = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_dashboard_fDbKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_dashboard_fDbKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Bulan Kejadian","Obyek Kerugian","Penyebab Kerugian","Divisi","Regional","Proses Klaim","Data Klaim","Data Riwayat Klaim"]});
		this.bPrint = new imageButton(this.pc1.childPage[7],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[7],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[7],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,97],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from tlk_klaim");
		this.polis=this.dbLib.getPeriodeFromSQL("select no_polis as periode from tlk_polis where tanggal in (select max(tanggal) as tanggal from tlk_polis)");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun ","=",this.tahun));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("No Polis ","All",""));
		var frameWidth = 970;
        /*
		this.fr5 = new panel(this.pc1.childPage[9],{bound:[10,10,frameWidth,480],caption:"Kurva S"});									            		        							
		this.fr5.bGraph = new imageButton(this.fr5,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr5.bGrid = new imageButton(this.fr5,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr5.grid = new saiGrid(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr5.chart = new flashChart(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan",name:"fr1"});		         	                        
		*/
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Klaim Per Bulan"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan",name:"fr1"});		         	                        

		this.fr2 = new panel(this.pc1.childPage[2],{bound:[10,10,frameWidth,480],caption:"Klaim Per Obyek"});									            		        							
		this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Obyek Kerugian"});		         	                        

		this.fr3 = new panel(this.pc1.childPage[3],{bound:[10,10,frameWidth,480],caption:"Klaim Per Penyebab"});									            		        							
		this.fr3.bGraph = new imageButton(this.fr3,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr3.bGrid = new imageButton(this.fr3,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr3.grid = new saiGrid(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr3.chart = new flashChart(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Penyebab Kerugian"});		         	                        

		this.fr4 = new panel(this.pc1.childPage[4],{bound:[10,10,frameWidth,480],caption:"Klaim Per Kelompok Lokasi"});									            		        							
		this.fr4.bGraph = new imageButton(this.fr4,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr4.bGrid = new imageButton(this.fr4,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr4.grid = new saiGrid(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr4.chart = new flashChart(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

		this.fr6 = new panel(this.pc1.childPage[5],{bound:[10,10,frameWidth,480],caption:"Klaim Per Lokasi"});									            		        							
		this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        
		
		this.fr7 = new panel(this.pc1.childPage[6],{bound:[10,10,frameWidth,480],caption:"Klaim Per Proses"});									            		        							
		this.fr7.bGraph = new imageButton(this.fr7,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr7.bGrid = new imageButton(this.fr7,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr7.grid = new saiGrid(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr7.chart = new flashChart(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

		this.sg = new saiGrid(this.pc1.childPage[7],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:9,tag:9,
		            colTitle:["No Klaim","No Dokumen","Tgl Terima","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[7],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
	
		var cnv = this.pc1.childPage[8].getClientCanvas();
			this.pc1.childPage[8].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
			/*	
		var cnv = this.pc1.childPage[9].getClientCanvas();
			this.pc1.childPage[9].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.name = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer2);
		*/
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		if (this.app.mail == undefined)
			this.app.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail = this.app.mail;
		this.mail.addListener(this);
		this.onClose.set(this,"doClose");
		
	}
};
window.app_eclaim2_dashboard_fDbKlaim.extend(window.childForm);
window.app_eclaim2_dashboard_fDbKlaim.implement({
	doClose: function(sender){
		this.dbLib.delListener(this);
		this.mail.delListener(this);
	},
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan, undefined, this);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		if (row == 1)
		{
			var filter=this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and");
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_polis,a.keterangan "+
												"from tlk_polis a "+filter,
												"select count(a.no_polis) "+
												"from tlk_polis a "+filter,
												new Array("a.no_polis","a.keterangan"),"and",new Array("No Polis","Keterangan"));
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[0,2]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		
	},
	mainButtonClick:function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
			}
			else
			{
				this.tahun=this.sg1.getCell(2,0);
				this.user_lok="";
				if (this.app._userStatus=="U")
				{
					this.user_lok=" and a.kode_lok='"+this.app._kodeLok+"'";
				}
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
							  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
							  this.filterRep.filterStr("a.no_polis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+this.user_lok;
				this.pc1.setActivePage(this.pc1.childPage[1]);
				var sql = new server_util_arrayList();
				sql.add("select case substring(a.periode,5,2) when '01' then 'Januari'  "+
						"when '02' then 'Februari'  "+
						"when '03' then 'Maret'  "+
						"when '04' then 'April'  "+
						"when '05' then 'Mei'  "+
						"when '06' then 'Juni'  "+
						"when '07' then 'Juli'  "+
						"when '08' then 'Agustus'  "+
						"when '09' then 'September'  "+
						"when '10' then 'Oktober'  "+
						"when '11' then 'November'  "+
						"when '12' then 'Desember'  "+
						"end as nama,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+this.filter+
						"group by a.periode");
				sql.add("select a.nama,b.tot "+
						"from tlk_obyek a "+
						"inner join (select a.kode_obyek,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+this.filter+
						"group by a.kode_obyek "+
						")b on a.kode_obyek=b.kode_obyek ");
				sql.add("select a.nama,b.tot "+
						"from tlk_sebab a "+
						"inner join (select a.kode_sebab,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+this.filter+
						"group by a.kode_sebab "+
						")b on a.kode_sebab=b.kode_sebab ");
				sql.add("select a.nama,b.tot "+
						"from tlk_klplokasi a "+
						"inner join (select b.kode_klplok,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+
						"inner join tlk_lokasi b on a.kode_lok=b.kode_lok "+ this.filter+
						"group by b.kode_klplok "+
						")b on a.kode_klplok=b.kode_klplok ");
				sql.add("select a.nama,b.tot "+
						"from tlk_lokasi a "+
						"inner join (select a.kode_lok,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+this.filter+
						"group by a.kode_lok "+
						")b on a.kode_lok=b.kode_lok ");
				sql.add("select a.nama,b.tot "+
						"from tlk_proses a "+
						"inner join (select a.progress,count(a.no_klaim) as tot "+
						"from tlk_klaim a "+this.filter+
						"group by a.progress "+
						")b on a.kode_proses=b.progress order by a.no_urut");
				this.dbLib.getMultiDataProviderA(sql, undefined, this);
				this.count = 0;
				this.sql = sql;
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doBtnClick: function(sender){
		try{
			/*
			if (sender == this.fr5.bXls){				
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("KurvaS.xls");
				var data = [], series = new arrayMap(), colTitle = [], first = true;
				var dtTable = this.fr5.data;
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
			}else if (sender == this.fr5.bGrid){		
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}else if (sender == this.fr5.bGraph){				
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}else if (sender.name == "graph"){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}else{
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			*/
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
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.pc1.activePage == this.pc1.childPage[1].resourceId){
			this.getChart(this.fr1.chart.data, this.fr1.chart);
			this.getChart(this.fr2.chart.data, this.fr2.chart);
			this.getChart(this.fr3.chart.data, this.fr3.chart);
			this.getChart(this.fr4.chart.data, this.fr4.chart);
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();
			this.fr4.chart.refresh();
			this.fr6.chart.refresh();
			this.fr7.chart.refresh();
		}
		
	},
	getChart: function(data,swf,autoRefresh){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		/*
		if (swf == this.fr5.chart){
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
			chart.y_axis.max = maxValue + 10;		
			swf.setChartData(chart,autoRefresh);
		}else {
		*/
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah","style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": -45},"3d": 5 
		   },
		  "y_axis":{
			"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps":10
		  },
		  "tooltip":{
			"text": "Global Tooltip<br>val=#val#, top=#top#"
		  }
		};  
		var line,temp="", maxValue = -999999999,minValue = 999999999;				
		if (data.rs.rows[0]!==undefined)
		{
		    temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#418aac",
				
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				}		
			var key = [];
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp.values.push(parseFloat(line.tot));
				chart.x_axis.labels.labels.push(line.nama);
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);		
				key.push(line.nama);
			}	
			chart.elements.push(temp);		
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
		swf.keyIndex = key;		
		swf.setChartData(chart); 
		//}
	},  
	doObjectReady: function(sender){
	   try{	 
			if (sender.data != undefined){
				this.getChart(sender.data,sender);
				sender.refresh();
			}
			/*this.count++;
		    if (this.pc1.activePage == this.pc1.childPage[1].resourceId  ){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.pc1.activePage == this.pc1.childPage[2].resourceId && this.count == 5){
				this.timer.setEnabled(true);
				this.count = 0;
			}*/
        }catch(e){
            alert(e);
        }
    },    
	doChartClick: function(sender,index,title){	
		eval("sender="+sender+"");
		try{
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" inner join tlk_klplokasi f on f.kode_lokasi = a.kode_lokasi and b.kode_klplok = f.kode_klplok and b.kode_ttg = f.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
					" left join tlk_proses g on a.progress=g.kode_proses ";
			var title = sender.keyIndex[index];
	
			if (sender==this.fr1.chart)
			{
				var periode="";
				if (title=="januari") {periode=this.tahun+"01";}
				if (title=="februari") {periode=this.tahun+"02";}
				if (title=="maret") {periode=this.tahun+"03";}
				if (title=="april") {periode=this.tahun+"04";}
				if (title=="mei") {periode=this.tahun+"05";}
				if (title=="juni") {periode=this.tahun+"06";}
				if (title=="juli") {periode=this.tahun+"07";}
				if (title=="agustus") {periode=this.tahun+"08";}
				if (title=="september") {periode=this.tahun+"09";}
				if (title=="oktober") {periode=this.tahun+"10";}
				if (title=="november") {periode=this.tahun+"11";}
				if (title=="desember") {periode=this.tahun+"12";}
				sql=sql+"where a.periode='"+periode+"' "+this.user_lok;
			}
			
			if (sender==this.fr2.chart)
			{
				sql=sql+"where c.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok;
			}
			if (sender==this.fr3.chart)
			{
				sql=sql+"where d.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok;
			}
			if (sender==this.fr4.chart)
			{
				sql=sql+"where f.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok;
			}
			if (sender==this.fr6.chart)
			{
				sql=sql+"where b.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok;
			}
			if (sender==this.fr7.chart)
			{
				sql=sql+"where g.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok;
			}
			sql=sql+" order by a.no_klaim";			
			
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[7]);
			
			} else this.sg.clear(1);
		}
		catch (e){
			alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_klaim,line.no_dokumen,line.tanggal,line.nama_lok,line.nama_obyek,line.nama_sebab,floatToNilai(line.nilai),floatToNilai(line.nilai_adjust),floatToNilai(line.nilai_bayar)]);
		}
		this.sg.setNoUrut(start);
	},
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.mail && this == callbackObj){
			error_log(result);
		}
		if (sender == this.dbLib && this == callbackObj){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":					
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
							this.dataProvider = data;			
							this.fr1.chart.data = data.result[0];
							this.fr1.sql = this.sql.get(0);	
            		        this.setData(this.fr1.grid,data.result[0]);
							this.getChart(this.fr1.chart.data,this.fr1.chart);
							this.fr1.chart.refresh();
							
							this.fr2.chart.data = data.result[1];
							this.fr2.sql = this.sql.get(1);	
            		        this.setData(this.fr2.grid,data.result[1]);
							this.getChart(this.fr2.chart.data,this.fr2.chart);
							this.fr2.chart.refresh();
							
							this.fr3.chart.data = data.result[2];
							this.fr3.sql = this.sql.get(2);	
            		        this.setData(this.fr3.grid,data.result[2]);
							this.getChart(this.fr3.chart.data,this.fr3.chart);
							this.fr3.chart.refresh();
							
							this.fr4.chart.data = data.result[3];
							this.fr4.sql = this.sql.get(3);	
            		        this.setData(this.fr4.grid,data.result[3]);
							this.getChart(this.fr4.chart.data,this.fr4.chart);
							this.fr4.chart.refresh();
							
							this.fr6.chart.data = data.result[4];
							this.fr6.sql = this.sql.get(4);	
            		        this.setData(this.fr6.grid,data.result[4]);
							this.getChart(this.fr6.chart.data,this.fr6.chart);
							this.fr6.chart.refresh();
							
							this.fr7.chart.data = data.result[5];
							this.fr7.sql = this.sql.get(5);	
            		        this.setData(this.fr7.grid,data.result[5]);
							this.getChart(this.fr7.chart.data,this.fr7.chart);
							this.fr7.chart.refresh();
						}else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+":"+result);
            }
       }
    },
	setData: function(grid, data){
		grid.clear();
		/*
		if (grid == this.fr5.grid){
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
		}else{
			for (var i in data.rs.rows){
				grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
			}	
				
		}
		*/
		for (var i in data.rs.rows){
				grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
			}	
	},
	
	doSgClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[8]);
			
			this.kurva(this.sg.cells(0,row));

			
		}catch(e){
			alert(e);
		}
	},
	
	kurva: function(noklaim){
		try{
			/*
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				"select date_format(a.tgl_mulai,'%Y') as y, date_format(a.tgl_mulai,'%m') as m,WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1 as w1, concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		sum(c.target * b.bobot / 100) as persen, 0 as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" inner join tlk_pelaksanaan_d c on c.tgl_mulai <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				//" left outer join (select a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress ) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan "+
				" where b.no_klaim = '"+ noklaim +"' "+
				"	group by concat(date_format(a.tgl_mulai,'%M'), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, date_format(a.tgl_mulai,'%Y')) "+								
				"union "+
				"select date_format(a.tanggal,'%Y'), date_format(a.tanggal,'%m'),WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, concat(substr(date_format(a.tanggal,'%M'),1,3), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, '-',date_format(a.tanggal,'%y')) as w, "+
				"		100 as persen,0 as prog "+
				"	from tlk_progresspk a "+
				" inner join tlk_progresspk_d c on c.no_progress = a.no_progress "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+								
				" where b.no_klaim = '"+ noklaim+"' and a.tanggal > b.tgl_selesai "+
				"	group by concat(date_format(a.tanggal,'%M'), '-',WEEK(a.tanggal) - WEEK(DATE_SUB(a.tanggal, INTERVAL DAYOFMONTH(a.tanggal)-1 DAY)) + 1, date_format(a.tanggal,'%Y')) "+
				"	order by y,m,w1" ,
				
				"select a.nu,a.nm_pekerjaan as item, concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		a.target * b.bobot / 100 as persen, c.realisasi as prog "+
				"	from tlk_pelaksanaan_d a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+noklaim+"' ) c on c.tanggal <= a.tgl_mulai and c.nm_pekerjaan = a.nm_pekerjaan and c.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ noklaim+"' "+				
				"	order by a.nu, a.nm_pekerjaan, date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				
				"select concat(substr(date_format(a.tgl_mulai,'%M'),1,3), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, '-',date_format(a.tgl_mulai,'%y')) as w, "+
				"		sum(d.realisasi * b.bobot / 100) as prog "+
				"	from (select distinct no_pelaksanaan, tgl_mulai, nm_pekerjaan from (select distinct a.no_pelaksanaan,a.tgl_mulai, a.nm_pekerjaan from tlk_pelaksanaan_d a inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and b.no_klaim = '"+noklaim+"' "+
				"	 union	"+
				"		select distinct a.no_pelaksanaan, a.tanggal, c.nm_pekerjaan from tlk_progresspk a inner join tlk_progresspk_d c on c.no_progress = a.no_progress inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and a.tanggal > b.tgl_selesai and b.no_klaim = a.no_klaim and b.no_klaim = '"+ noklaim +"' ) a ) a "+
				" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
				" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+noklaim+"' order by b.tanggal) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan and d.no_pelaksanaan = a.no_pelaksanaan "+
				" where b.no_klaim = '"+ noklaim+"' "+
				"	group by concat(date_format(a.tgl_mulai,'%M'), '-',WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1, date_format(a.tgl_mulai,'%Y')) "+
				"	order by date_format(a.tgl_mulai,'%Y'), date_format(a.tgl_mulai,'%m'),WEEK(a.tgl_mulai) - WEEK(DATE_SUB(a.tgl_mulai, INTERVAL DAYOFMONTH(a.tgl_mulai)-1 DAY)) + 1",
				
				"select a.tgl_selesai, case when a.tgl_selesai < max(ifnull(b.tanggal,0)) then max(ifnull(b.tanggal,0)) else a.tgl_selesai end as tgl from tlk_pelaksanaan a left outer join tlk_progresspk b on b.no_pelaksanaan = a.no_pelaksanaan and b.kode_lokasi = a.kode_lokasi and b.no_klaim = a.no_klaim "+
				" where a.no_klaim = '"+noklaim+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
				"	group by a.tgl_selesai"
				
				]}), true);
			this.fr5.data3 = data.result[1];
			this.fr5.data = data.result[0];
			this.fr5.maxTgl = data.result[3].rs.rows[0];
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
			this.setData(this.fr5.grid, data.result[1]);
			data = data.result[0];
			this.getChart(data, this.fr5.chart,this.pc1.activePage == this.pc1.childPage[1].resourceId && this.fr5.chart.ready && this.fr5.chart.visible);
			*/
		}catch(e){
			alert(e+" "+data);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		} 
	}, 
	doOpenDoc: function(){
	   this.pc1.setActivePage(this.pc1.childPage[8]);
	}
});
