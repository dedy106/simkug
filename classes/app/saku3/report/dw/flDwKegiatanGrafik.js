// JavaScript Document
window.app_saku3_report_dw_flDwKegiatanGrafik = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_dw_flDwKegiatanGrafik.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_dw_flDwKegiatanGrafik";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",":"+this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;highchart");	
		this.pg1 = new pageControl(this,{bound:[0,0,this.width - 20, this.height -30], childPage:["Filter","Kegiatan Pendaftaran","Kegiatan Pendidikan","Kegiatan Pelatihan/Kursus/Seminar","Kegiatan Proyek Kerjasama","Kegiatan Penelitian","Tabel","Trail"], pageChange:[this,"doPageChange"]});
			
		this.p1 = new panel(this.pg1.childPage[0],{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		
		this.viewer = new reportViewer(this.pg1.childPage[6],{bound:[0,0,this.width - 35, this.height - 35]});
		this.viewer2 = new reportViewer(this.pg1.childPage[7],{bound:[0,0,this.width - 35, this.height - 35]});
		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	try{
		this.filterRep = new util_filterRep();
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.dbLarge = new util_dbLarge();
		this.userStatus=this.app._userStatus;
		this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from exs_periode where  kode_lokasi='"+this.app._lokasi+"'");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode FS","=","FS4"));
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
		this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
		/*kirim mail*/
		uses("server_util_mail;portalui_ConfirmMail;");
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		this.chart = new highchart(this.pg1.childPage[1],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick"]});
		this.chart2 = new highchart(this.pg1.childPage[2],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick2"]});
		this.chart3 = new highchart(this.pg1.childPage[3],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick3"]});
		this.chart4 = new highchart(this.pg1.childPage[4],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick4"]});
		this.chart5 = new highchart(this.pg1.childPage[5],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick5"]});
	}catch(e){
		alert(e);
	}
};
window.app_saku3_report_dw_flDwKegiatanGrafik.extend(window.portalui_childForm);
window.app_saku3_report_dw_flDwKegiatanGrafik.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_fs,nama from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  "select count(kode_fs) from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_fs","nama"),"where");
		}
	},
	doSelectCell: function(sender, col, row){
		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("123","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,0,2));
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from exs_periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
			
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			this.pg1.setActivePage(this.pg1.childPage[1]);
			//this.p1.setVisible(false);
			this.viewer.prepare();
		
			//this.pg1.show();
			//this.app._mainForm.pButton.setVisible(false);
			//this.app._mainForm.reportNavigator.setVisible(true);
			this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
			this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_fs",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.nama_report="server_report_saku3_dw_rptDwLabaRugiTu";
			this.filter2 = this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,2);
			
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		//	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		//	this.app._mainForm.reportNavigator.rearrange();
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
			this.page = 1;
			this.allBtn = false;
			var lokasi=this.sg1.getCell(2,0);
			var periode=this.sg1.getCell(2,1);
			var kode_fs=this.sg1.getCell(2,2);
			this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K02' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");
			var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,case when a.jenis='Pendapatan' then ISNULL(b.n2,0)*-1 else ISNULL(b.n2,0) end as n2,"+
					"case when a.jenis='Pendapatan' then ISNULL(b.n4,0)*-1 else ISNULL(b.n4,0) end as n4 "+
					"from exs_grafik_m a "+
					"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
					"			from exs_grafik_d a "+
					"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
					"where a.kode_lokasi='"+lokasi+"' and b.periode='"+periode+"' and b.kode_fs='"+kode_fs+"' "+
					"			group by a.kode_lokasi,a.kode_grafik "+
					"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+lokasi+"' and  a.kode_klp='K02' "+
					"order by a.kode_grafik";
			
			var data = this.dbLib.getDataProvider(sql, true);
			var categories = [];
			var series1 = {name:"RKA Ytd", data:[], color:"green"};
			var series2 = {name:"Realisasi Ytd", data:[], color:"blue"};
			
			var series= [];
			this.dataGrafik = new arrayMap();
			this.dataNeraca = data;
			this.dataCategories = [];
			for (var i = 0; i < data.rs.rows.length; i++){
				var line = data.rs.rows[i];
				
					categories.push(line.nama);
					this.dataCategories.push(line.kode_grafik);
					series1.data.push(parseFloat(line.n2));
					series2.data.push(parseFloat(line.n4));
				
			}
			var options = {
				chart: {
		                renderTo: 'container',
		                type: 'column',
		                marginRight: 130,
		                marginBottom: 20,
		                resourceId:this.chart.resourceId
		            },
		            title: {
		                text: this.nama,
		                x: -20 //center
		            },
		            subtitle: {
		                text: 'Periode : '+this.sg1.getCell(2,1),
		                x: -20
		            },
		            xAxis: {
		                categories: categories
		            },
		            yAxis: {
		                title: {
		                    text: ''
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
		                        this.x +': '+ floatToNilai(this.y) +' ';
		                }
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
		            series: []
		        };
				options.series.push(series1);
				options.series.push(series2);
				this.chart.setChartData(options);
				
				//triwulan
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K03' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");

				var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,case when a.jenis='Pendapatan' then ISNULL(b.n2,0)*-1 else ISNULL(b.n2,0) end as n2,"+
					"case when a.jenis='Pendapatan' then ISNULL(b.n4,0)*-1 else ISNULL(b.n4,0) end as n4 "+
					"from exs_grafik_m a "+
					"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
					"			from exs_grafik_d a "+
					"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
					"where a.kode_lokasi='"+lokasi+"' and b.periode='"+periode+"' and b.kode_fs='"+kode_fs+"' "+
					"			group by a.kode_lokasi,a.kode_grafik "+
					"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+lokasi+"' and  a.kode_klp='K03' "+
					"order by a.kode_grafik";
				var data = this.dbLib.getDataProvider(sql, true);
				var categories = [];
				
				var series1 = {name:" RKA Ytd ", data:[], color:"green"};
				var series2 = {name:" Realisasi Ytd ", data:[], color:"blue"};
				
				var series= [];
				this.dataGrafik = new arrayMap();
				this.dataNeraca = data;
				this.dataCategories = [];
				for (var i = 0; i < data.rs.rows.length; i++){
					var line = data.rs.rows[i];
					
						categories.push(line.nama);
						this.dataCategories.push(line.kode_grafik);
						series1.data.push(parseFloat(line.n2));
						series2.data.push(parseFloat(line.n4));
					
				}
				var options2 = {
					chart: {
							renderTo: 'container',
							type: 'column',
							marginRight: 130,
							marginBottom: 20,
							resourceId:this.chart.resourceId
						},
						title: {
							text: this.nama,
							x: -20 //center
						},
						subtitle: {
							text: 'Periode : '+this.sg1.getCell(2,1),
							x: -20
						},
						xAxis: {
							categories: categories
						},
						yAxis: {
							title: {
								text: ''
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
									this.x +': '+ floatToNilai(this.y) +' ';
							}
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
						series: []
					};
					options2.series.push(series1);
					options2.series.push(series2);
					this.chart2.setChartData(options2);
					
				//bulanan
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K04' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");

				var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,case when a.jenis='Pendapatan' then ISNULL(b.n2,0)*-1 else ISNULL(b.n2,0) end as n2,"+
					"case when a.jenis='Pendapatan' then ISNULL(b.n4,0)*-1 else ISNULL(b.n4,0) end as n4 "+
					"from exs_grafik_m a "+
					"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
					"			from exs_grafik_d a "+
					"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
					"where a.kode_lokasi='"+lokasi+"' and b.periode='"+periode+"' and b.kode_fs='"+kode_fs+"' "+
					"			group by a.kode_lokasi,a.kode_grafik "+
					"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+lokasi+"' and  a.kode_klp='K04' "+
					"order by a.kode_grafik";
				var data = this.dbLib.getDataProvider(sql, true);
				var categories = [];
				var series1 = {name:" RKA Ytd ", data:[], color:"green"};
				var series2 = {name:" Realisasi Ytd ", data:[], color:"blue"};
				
				var series= [];
				this.dataGrafik = new arrayMap();
				this.dataNeraca = data;
				this.dataCategories = [];
				for (var i = 0; i < data.rs.rows.length; i++){
					var line = data.rs.rows[i];
					
						categories.push(line.nama);
						this.dataCategories.push(line.kode_grafik);
						series1.data.push(parseFloat(line.n2));
						series2.data.push(parseFloat(line.n4));
					
				}
				var options3 = {
					chart: {
							renderTo: 'container',
							type: 'column',
							marginRight: 130,
							marginBottom: 20,
							resourceId:this.chart.resourceId
						},
						title: {
							text: this.nama,
							x: -20 //center
						},
						subtitle: {
							text: 'Periode : '+this.sg1.getCell(2,1),
							x: -20
						},
						xAxis: {
							categories: categories
						},
						yAxis: {
							title: {
								text: ''
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
									this.x +': '+ floatToNilai(this.y) +' ';
							}
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
						series: []
					};
					options3.series.push(series1);
					options3.series.push(series2);
					this.chart3.setChartData(options3);
					
					//bulanan4
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K05' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");

				var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,case when a.jenis='Pendapatan' then ISNULL(b.n2,0)*-1 else ISNULL(b.n2,0) end as n2,"+
					"case when a.jenis='Pendapatan' then ISNULL(b.n4,0)*-1 else ISNULL(b.n4,0) end as n4 "+
					"from exs_grafik_m a "+
					"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
					"			from exs_grafik_d a "+
					"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
					"where a.kode_lokasi='"+lokasi+"' and b.periode='"+periode+"' and b.kode_fs='"+kode_fs+"' "+
					"			group by a.kode_lokasi,a.kode_grafik "+
					"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+lokasi+"' and  a.kode_klp='K05' "+
					"order by a.kode_grafik";
				var data = this.dbLib.getDataProvider(sql, true);
				var categories = [];
				var series1 = {name:" RKA Ytd ", data:[], color:"green"};
				var series2 = {name:" Realisasi Ytd ", data:[], color:"blue"};
				
				var series= [];
				this.dataGrafik = new arrayMap();
				this.dataNeraca = data;
				this.dataCategories = [];
				for (var i = 0; i < data.rs.rows.length; i++){
					var line = data.rs.rows[i];
					
						categories.push(line.nama);
						this.dataCategories.push(line.kode_grafik);
						series1.data.push(parseFloat(line.n2));
						series2.data.push(parseFloat(line.n4));
					
				}
				var options4 = {
					chart: {
							renderTo: 'container',
							type: 'column',
							marginRight: 130,
							marginBottom: 20,
							resourceId:this.chart.resourceId
						},
						title: {
							text: this.nama,
							x: -20 //center
						},
						subtitle: {
							text: 'Periode : '+this.sg1.getCell(2,1),
							x: -20
						},
						xAxis: {
							categories: categories
						},
						yAxis: {
							title: {
								text: ''
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
									this.x +': '+ floatToNilai(this.y) +' ';
							}
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
						series: []
					};
					options4.series.push(series1);
					options4.series.push(series2);
					this.chart4.setChartData(options4);
					
				//bulanan5
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K06' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");

				var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,case when a.jenis='Pendapatan' then ISNULL(b.n2,0)*-1 else ISNULL(b.n2,0) end as n2,"+
					"case when a.jenis='Pendapatan' then ISNULL(b.n4,0)*-1 else ISNULL(b.n4,0) end as n4 "+
					"from exs_grafik_m a "+
					"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
					"			from exs_grafik_d a "+
					"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
					"where a.kode_lokasi='"+lokasi+"' and b.periode='"+periode+"' and b.kode_fs='"+kode_fs+"' "+
					"			group by a.kode_lokasi,a.kode_grafik "+
					"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+lokasi+"' and  a.kode_klp='K06' "+
					"order by a.kode_grafik";
				var data = this.dbLib.getDataProvider(sql, true);
				var categories = [];
				var series1 = {name:" RKA Ytd ", data:[], color:"green"};
				var series2 = {name:" Realisasi Ytd ", data:[], color:"blue"};
				
				var series= [];
				this.dataGrafik = new arrayMap();
				this.dataNeraca = data;
				this.dataCategories = [];
				for (var i = 0; i < data.rs.rows.length; i++){
					var line = data.rs.rows[i];
					
						categories.push(line.nama);
						this.dataCategories.push(line.kode_grafik);
						series1.data.push(parseFloat(line.n2));
						series2.data.push(parseFloat(line.n4));
					
				}
				var options5 = {
					chart: {
							renderTo: 'container',
							type: 'column',
							marginRight: 130,
							marginBottom: 20,
							resourceId:this.chart.resourceId
						},
						title: {
							text: this.nama,
							x: -20 //center
						},
						subtitle: {
							text: 'Periode : '+this.sg1.getCell(2,1),
							x: -20
						},
						xAxis: {
							categories: categories
						},
						yAxis: {
							title: {
								text: ''
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
									this.x +': '+ floatToNilai(this.y) +' ';
							}
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
						series: []
					};
					options5.series.push(series1);
					options5.series.push(series2);
					this.chart5.setChartData(options4);
				
		}catch(e){
			alert(e);
			systemAPI.alert("[flJurnal]::mainButtonClick:"+e);
		}
	},
	doClick: function(sender,seriesName, x, y){
		try{
			var series= [];
			var categories = [];
			var series1 = {name:"RKA Ytd", data:[], color:"green"};
			var series2 = {name:"Realisasi Ytd", data:[], color:"blue"};
			var dataCategories = [];
			var data = this.dataNeraca;
			for (var i = 0; i < data.rs.rows.length; i++){
				var line = data.rs.rows[i];
				if (line.kode_induk == this.dataCategories[x] && line.nama.indexOf("JUMLAH") == -1){
					categories.push(line.nama);
					dataCategories.push(line.kode_neraca);
					series1.data.push(parseFloat(line.n6));
					series2.data.push(parseFloat(line.n4));
				}
			}
			
			if (series1.data.length > 0){
				this.dataCategories = dataCategories;
				
				var chart = this.chart.getChart();
				var total = chart.series.length;
				for (var i = 0; i < total ;i++){
					chart.series[0].remove();
				} 
				chart.addSeries(series1);
				chart.addSeries(series2);
				chart.xAxis[0].setCategories(categories,false);
				chart.redraw();
			}else {
				this.pg1.setActivePage(this.pg1.childPage[3]);
				var nama_report="server_report_saku3_dw_rptGlTbTu";
				var filter = this.filter + " and kode_neraca = '"+ this.dataCategories[x] +"' and b.kode_fs='"+this.sg1.getCell(2,2)+"'";
				var filter2= this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1);
				this.viewer2.setTotalPage(this.report.getTotalPage(nama_report,filter,this.pager,filter2));
				this.viewer2.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				
			}
		}catch(e){
			alert(e);
		}
	}, 
	doClick2: function(sender,seriesName, x, y){
		try{
			var series= [];
			var categories = [];
			var series1 = {name:"RKA Ytd", data:[], color:"green"};
			var series2 = {name:"Realisasi Ytd", data:[], color:"blue"};
			var dataCategories = [];
			var data = this.dataNeraca;
			for (var i = 0; i < data.rs.rows.length; i++){
				var line = data.rs.rows[i];
				if (line.kode_induk == this.dataCategories[x] && line.nama.indexOf("JUMLAH") == -1){
					categories.push(line.nama);
					dataCategories.push(line.kode_neraca);
					series1.data.push(parseFloat(line.n6));
					series2.data.push(parseFloat(line.n4));
				}
			}
			
			if (series1.data.length > 0){
				this.dataCategories = dataCategories;
				
				var chart = this.chart.getChart();
				var total = chart.series.length;
				for (var i = 0; i < total ;i++){
					chart.series[0].remove();
				} 
				chart.addSeries(series1);
				chart.addSeries(series2);
				chart.xAxis[0].setCategories(categories,false);
				chart.redraw();
			}else {
				this.pg1.setActivePage(this.pg1.childPage[3]);
				var nama_report="server_report_saku3_dw_rptGlTbTu";
				var filter = this.filter + " and kode_neraca = '"+ this.dataCategories[x] +"' and b.kode_fs='"+this.sg1.getCell(2,2)+"'";
				var filter2= this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1);
				this.viewer2.setTotalPage(this.report.getTotalPage(nama_report,filter,this.pager,filter2));
				this.viewer2.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				
			}
		}catch(e){
			alert(e);
		}
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.report){
			/*kirim mail*/
			this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
			switch (methodName)
			{
				case "preview" :
					this.viewer.preview(result);			
					this.viewer.hideLoading();
					break;
				
			}/*kirim mail*/
		}else if (sender === this.mail){
			if (methodName === "sendMail"){
				system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
			}
		}
	},
	getStringHeader: function(){
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
				"<html xmlns='http://www.w3.org/1999/xhtml'>"+
				"<head>"+
				"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
				"<title>Preview</title>"+
				"</head>"+
				"<body>";
	},
	doSelectedPage: function(sender, page){
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	    switch(sender.getName()){
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;		  
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	        
	        var cnv = undefined;
	        if (cnv != undefined)
	        {
	          cnv.focus();
	          cnv.print();
	        }
	      }catch(e)
	      {alert(e);}
	      
	      break; /*kirim mail*/
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
			this.pg1.hide();
	        //this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},/*kirim mail*/
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = this.viewer.getContent();
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}else if (sender === sender.owner.bCancel){
				sender.owner.free();
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
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
	doOpenBb: function(kode_akun,kode_lokasi,periode){
		
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		var var_periode=" and a.periode='"+periode+"'";
		this.link="2";
		filter2=this.sg1.getCell(2,0)+"/"+periode;
		filter="where a.kode_lokasi='"+kode_lokasi+"' and a.kode_akun='"+kode_akun+"' and a.periode='"+periode+"'";
		nama_report="server_report_saku3_dw_rptGlBukuBesarTu";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.viewer2.setTotalPage(this.report.getTotalPage(nama_report,filter,this.pager,filter2));
		this.viewer2.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	
	},
	doOpenJurnal: function(no_bukti,kode_lokasi){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.link="3";
		filter = "where a.no_bukti='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku3_dw_rptGLJurnalBuktiTu";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.viewer2.setTotalPage(this.report.getTotalPage(nama_report,filter,this.pager,filter2));
		this.viewer2.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
