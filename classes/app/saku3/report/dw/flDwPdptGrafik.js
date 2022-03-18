// JavaScript Document
window.app_saku3_report_dw_flDwPdptGrafik = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_dw_flDwPdptGrafik.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_dw_flDwPdptGrafik";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",":"+this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;highchart;util_xlsChart");	
		this.pg1 = new pageControl(this,{bound:[0,0,this.width - 30, this.height -30], childPage:["Filter","Pendapatan Pendidikan","Tabel","Trail"], pageChange:[this,"doPageChange"]});
			
		this.p1 = new panel(this.pg1.childPage[0],{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		
		this.viewer = new reportViewer(this.pg1.childPage[2],{bound:[0,0,this.width - 35, this.height - 35]});
		this.viewer2 = new reportViewer(this.pg1.childPage[3],{bound:[0,0,this.width - 35, this.height - 35]});
		
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
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Satuan","=","Satuan"));
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
		this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
		/*kirim mail*/
		uses("server_util_mail;portalui_ConfirmMail;");
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		this.xlsChart = new util_xlsChart();
		this.chart = new highchart(this.pg1.childPage[1],{bound:[0,0,this.width - 65, this.height - 50], click:[this,"doClick"]});
		this.bXls = new imageButton(this.pg1.childPage[1],{bound:[this.width - 155,20,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doSaveXls"], name:"xls"});
		
	}catch(e){
		alert(e);
	}
};
window.app_saku3_report_dw_flDwPdptGrafik.extend(window.portalui_childForm);
window.app_saku3_report_dw_flDwPdptGrafik.implement({
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
		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("123","3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(2,0,2,0));
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from exs_periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
			
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Satuan","Ribuan","Jutaan","Milyar"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bBack)
			{
				if (this.link="2"){
					this.doLink1();
				}
				if (this.link="3"){
					this.doLink1();
				}
				if (this.link="4"){
					this.doLink2();
				}
				if (this.link="5"){
					this.doLink3();
				}
			}
			else
			{
				this.pg1.setActivePage(this.pg1.childPage[1]);
				this.viewer.prepare();
			
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
				this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
								this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
								this.filterRep.filterStr("a.kode_fs",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.nama_report="server_report_saku3_dw_rptDwLabaRugiTu";
				this.filter2 = this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,2);
				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
				this.lokasi=this.sg1.getCell(2,0);
				this.periode=this.sg1.getCell(2,1);
				this.kode_fs=this.sg1.getCell(2,2);
				this.satuan=this.sg1.getCell(2,3)
				switch (this.satuan)
				{
					case 'Ribuan' : this.sat=1000;
								break;
					case 'Jutaan' : this.sat=1000000;
								break;
					case 'Milyar' : this.sat=1000000000;
								break;
					default : this.sat=1
				}
						
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_klp where kode_klp='K01' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");
				this.doLink1();
			}
			
		}catch(e){
			alert(e);
			systemAPI.alert("[flJurnal]::mainButtonClick:"+e);
		}
	},
	doLink1: function(){
		try{
			var sql = "select a.kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
						"from exs_grafik_m a "+
						"inner join (select a.kode_lokasi,a.kode_grafik,sum(b.n2) as n2,sum(b.n4) as n4 "+
						"			from exs_grafik_d a "+
						"			inner join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
						"where a.kode_lokasi='"+this.lokasi+"' and b.periode='"+this.periode+"' and b.kode_fs='"+this.kode_fs+"' "+
						"			group by a.kode_lokasi,a.kode_grafik "+
						"			)b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.lokasi+"' and  a.kode_klp='K01' "+
						"order by a.kode_grafik";
			this.link="1";
			this.showGrafik(sql, this.chart);
			
		}catch(e){
			alert(e);
		}
	},
	doLink2: function(){
		try{
			this.link="2";
					this.sql = "select a.kode_akun as kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
							"from masakun a "+
							"inner join (select a.kode_lokasi,b.kode_akun,sum(c.n2) as n2,sum(c.n4) as n4 "+
							"			from exs_grafik_d a "+
							"			inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs  "+
							"			inner join exs_glma_gar c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
							"			where a.kode_lokasi='"+this.lokasi+"' and c.periode='"+this.periode+"' and a.kode_fs='"+this.kode_fs+"' and a.kode_grafik='DW01' "+
							"			group by a.kode_lokasi,b.kode_akun "+
							"			)b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.lokasi+"' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0) "+
							"order by a.kode_akun ";
			this.showGrafik(this.sql, this.chart);
		}catch(e){
			alert(e);
		}
	},
	doLink3: function(){
		try{
			this.link="3";
			this.sql = "select a.kode_akun as kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
							"from masakun a "+
							"inner join (select a.kode_lokasi,b.kode_akun,sum(c.n2) as n2,sum(c.n4) as n4 "+
							"			from exs_grafik_d a "+
							"			inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs  "+
							"			inner join exs_glma_gar c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
							"			where a.kode_lokasi='"+this.lokasi+"' and c.periode='"+this.periode+"' and a.kode_fs='"+this.kode_fs+"' and a.kode_grafik='DW02' "+
							"			group by a.kode_lokasi,b.kode_akun "+
							"			)b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.lokasi+"' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0) "+
							"order by a.kode_akun ";
			this.showGrafik(this.sql, this.chart );
		}catch(e){
			alert(e);
		}
	},
	doLink4: function(){
		try{
			this.link="4";
			this.sql = "select a.kode_fakultas as kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
						"from exs_fakultas a "+
						"inner join (select a.kode_lokasi,f.kode_fakultas,sum(c.n2) as n2,sum(c.n4) as n4 "+
						"			from exs_grafik_d a "+
						"			inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs  "+
						"			inner join exs_glma_gar_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
						"			inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
						"			inner join exs_bidang e on d.kode_bidang=e.kode_bidang and d.kode_lokasi=e.kode_lokasi "+
						"			inner join exs_fakultas_bidang f on e.kode_bidang=f.kode_bidang and e.kode_lokasi=f.kode_lokasi "+
						"			where a.kode_lokasi='"+this.lokasi+"' and c.periode='"+this.periode+"' and a.kode_fs='"+this.kode_fs+"' and a.kode_grafik='DW01' and c.kode_akun='"+this.dataCategories[x]+"' "+
						"			group by a.kode_lokasi,f.kode_fakultas "+
						"			)b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.lokasi+"' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0) "+
						"order by a.kode_fakultas ";
			this.showGrafik(this.sql, this.chart);
		}catch(e){
			alert(e);
		}
	},
	doLink5: function(){
		try{
			this.link="5";
			this.sql = "select a.kode_fakultas as kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
						"from exs_fakultas a "+
						"inner join (select a.kode_lokasi,f.kode_fakultas,sum(c.n2) as n2,sum(c.n4) as n4 "+
						"			from exs_grafik_d a "+
						"			inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs  "+
						"			inner join exs_glma_gar_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
						"			inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
						"			inner join exs_bidang e on d.kode_bidang=e.kode_bidang and d.kode_lokasi=e.kode_lokasi "+
						"			inner join exs_fakultas_bidang f on e.kode_bidang=f.kode_bidang and e.kode_lokasi=f.kode_lokasi "+
						"			where a.kode_lokasi='"+this.lokasi+"' and c.periode='"+this.periode+"' and a.kode_fs='"+this.kode_fs+"' and a.kode_grafik='DW01' and c.kode_akun='"+this.dataCategories[x]+"' "+
						"			group by a.kode_lokasi,f.kode_fakultas "+
						"			)b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.lokasi+"' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0) "+
						"order by a.kode_fakultas ";
			this.showGrafik(this.sql, this.chart);
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender,seriesName, x, y){
		try{
			alert(this.link);
			if (this.link=="4")
			{
				this.link="41";
				this.sql = "select a.kode_pp as kode_grafik,a.kode_lokasi,a.nama,ISNULL(b.n2,0)*-1 as n2,ISNULL(b.n4,0)*-1 as n4 "+
						"from pp a "+
						"inner join (select a.kode_lokasi,c.kode_pp,sum(c.n2) as n2,sum(c.n4) as n4 "+
						"			from exs_grafik_d a "+
						"			inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs  "+
						"			inner join exs_glma_gar_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
						"			inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
						"			inner join exs_bidang e on d.kode_bidang=e.kode_bidang and d.kode_lokasi=e.kode_lokasi "+
						"			inner join exs_fakultas_bidang f on e.kode_bidang=f.kode_bidang and e.kode_lokasi=f.kode_lokasi "+
						"			where a.kode_lokasi='"+this.lokasi+"' and c.periode='"+this.periode+"' and a.kode_fs='"+this.kode_fs+"' and a.kode_grafik='DW01' and c.kode_akun='4121102' and f.kode_fakultas='"+this.dataCategories[x]+"'"+
						"			group by a.kode_lokasi,c.kode_pp "+
						"			)b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.lokasi+"' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0) "+
						"order by a.kode_pp ";
				this.showGrafik(this.sql, this.chart);
				
			}
			
			if (this.link=="2")
			{
				this.doLink4();
				
			}
			if (this.link=="3")
			{
				this.doLink5();
				
			}
			if (this.link=="1")
			{
				if (x==0)
				{
					this.doLink2();
					
				}
				if (x==1)
				{
					this.doLink3();
				}
			}
			
			
		}catch(e){
			alert(e);
		}
	}, 
	doClick2: function(sender,seriesName, x, y){
		try{
			alert('aaa');
			
			
		}catch(e){
			alert(e);
		}
	}, 
	// aku tambah parameter chart, beda page beda chart
	showGrafik: function(sql, chart){
		try{
			
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from exs_grafik_m where kode_grafik='DW01' and kode_lokasi='"+this.sg1.getCell(2,0)+"'");
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
					var n2=Math.round(line.n2/this.sat);
					var n4=Math.round(line.n4/this.sat);
					categories.push(line.nama);
					this.dataCategories.push(line.kode_grafik);
					
					series1.data.push(parseFloat(n4));
					series2.data.push(parseFloat(n2));
				
				}
				var options2 = {
					chart: {
							renderTo: 'container',
							type: 'bar',
							
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
							categories: categories,
							title :{
									text : null
							}
						},
						yAxis: {
							title: {
								text: 'Rp ('+this.satuan+')'
							},
							
						},
						tooltip: {
							formatter: function() {
									return '<b>'+ this.series.name +'</b><br/>'+
									this.x +': '+ floatToNilai(this.y) +' ';
							}
						},
						
						plotOptions: {
											bar  :{
												dataLabels :{
													enabled  : true,
													formatter: function() {
																return  floatToNilai(this.y);
														}
												}
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
					chart.setChartData(options2);
		}catch(e){
			alert(e);
		}
	},
	
	doSaveXls: function(sender){
		try{
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("grafik.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < this.dataNeraca.rs.rows.length; i++){
					var row  = this.dataNeraca.rs.rows[i];
					var c = 0;
					for (var r in row){
						if (r == "nama" || r == "n2" || r == "n4"){
							if (r == "n2")
								colTitle[c] = "RKA Ytd";
							else if (r == "n4")
								colTitle[c] = "Realisasi Ytd";
							else 
								colTitle[c] = r;
							if (data[c] === undefined) {
								data[c] = [];
								if (c > 0){
									var col = this.xlsChart.indexToColumn(c);
									var colCat = this.xlsChart.indexToColumn(0);
									var max = this.dataNeraca.rs.rows.length+1;								
									series.set(c, {title: colTitle[c] , categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
								}
							}
							data[c][data[c].length] = c  > 0 ? parseFloat(row[r]):row[r];
							c++;
						}
					}
									
				}		
				
				this.xlsChart.setData(data);
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setChartType("bar");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
					
				}							
				this.xlsChart.setTitle("Grafik Keuangan");
				this.xlsChart.setXTitle("Jumlah (dalam ribuan)");
				this.xlsChart.setYTitle("Keterangan");
				//window.open( this.xlsChart.getChart() );
				
				downloadFile(this.xlsChart.getChart() );
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
