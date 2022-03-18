window.app_hrmis_gaji_report_flHRGajiPBln = function(owner)
{
	try{
	if (owner)
	{
		window.app_hrmis_gaji_report_flHRGajiPBln.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_gaji_report_flHRGajiPBln";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Gaji Per Bulan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,150],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,127],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["3","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from gaji_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Bulanan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	}catch(e) {alert("constructor = "+e);}
};
window.app_hrmis_gaji_report_flHRGajiPBln.extend(window.portalui_childForm);
window.app_hrmis_gaji_report_flHRGajiPBln.implement({
	doEllipseClick: function(sender, col, row){
		if (row === 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
								  "select kode_lokasi, nama from lokasi ",
								  "select count(*) from lokasi ",
								  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_loker,nama from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_loker","nama"],"where",["Kode","Nama"]);
		}
		if (row === 3)
		{
			this.standar.ListDataSGFilter2(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
									"select a.nik, a.nama from karyawan a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from karyawan a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["a.nik","a.nama"],"and",["NIK","Nama"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from gaji_m a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row === 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Bulanan","Triwulan","Semester"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Unit Kerja","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Bulanan"]);
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter=this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filter2=this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							" and (c.nik=y.nik)";
				this.filter3=this.filterRep.filterStr("y.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("y.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,4);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Bulanan")
					var sql="select distinct a.nik,a.nama,ifnull(d.jan,0) as jan,ifnull(d.feb,0) as feb,ifnull(d.mar,0) as mar,ifnull(d.apr,0) as apr,ifnull(d.mei,0) as mei,ifnull(d.jun,0) as jun,ifnull(d.jul,0) as jul,ifnull(d.aug,0) as aug,ifnull(d.sep,0) as sep,ifnull(d.okt,0) as okt,ifnull(d.nov,0) as nov,ifnull(d.des,0) as des, ";
				else if (this.jenisLap === "Triwulan")
					var sql="select distinct a.nik,a.nama,(ifnull(d.jan,0)+ifnull(d.feb,0)+ifnull(d.mar,0)) as triwulan1, "+
							"(ifnull(d.apr,0)+ifnull(d.mei,0)+ifnull(d.jun,0)) as triwulan2, "+
							"(ifnull(d.jul,0)+ifnull(d.aug,0)+ifnull(d.sep,0)) as triwulan3, "+
							"(ifnull(d.okt,0)+ifnull(d.nov,0)+ifnull(d.des,0)) as triwulan4, ";
				else if (this.jenisLap === "Semester")
					var sql="select distinct a.nik,a.nama,(ifnull(d.jan,0)+ifnull(d.feb,0)+ifnull(d.mar,0)+ifnull(d.apr,0)+ifnull(d.mei,0)+ifnull(d.jun,0)) as smtr1, "+
							"(ifnull(d.jul,0)+ifnull(d.aug,0)+ifnull(d.sep,0)+ifnull(d.okt,0)+ifnull(d.nov,0)+ifnull(d.des,0)) as smtr2, ";
				sql+="(ifnull(d.jan,0)+ifnull(d.feb,0)+ifnull(d.mar,0)+ifnull(d.apr,0)+ifnull(d.mei,0)+ifnull(d.jun,0)+ifnull(d.jul,0)+ifnull(d.aug,0)+ifnull(d.sep,0)+ifnull(d.okt,0)+ifnull(d.nov,0)+ifnull(d.des,0))  as total "+
						"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
							"inner join gaji_m c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol "+
							"left outer join (select z.nik, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"01') group by a.nik) as jan, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"02') group by a.nik) as feb, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"03') group by a.nik) as mar, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"04') group by a.nik) as apr, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"05') group by a.nik) as mei, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"06') group by a.nik) as jun, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"07') group by a.nik) as jul, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"08') group by a.nik) as aug, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"09') group by a.nik) as sep, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"10') group by a.nik) as okt, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"11') group by a.nik) as nov, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"12') group by a.nik) as des "+
							"from gaji_d z inner join gaji_m y on z.no_gaji=y.no_gaji and z.nik = y.nik "+this.filter3+
							" ) d on a.nik=d.nik "+this.filter;
				this.scriptSqlCount = "select count(distinct a.nik) "+
						"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
							"inner join gaji_m c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol "+
							"left outer join (select z.nik, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik  "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"01') group by a.nik) as jan, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik  "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"02') group by a.nik) as feb, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"03') group by a.nik) as mar, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"04') group by a.nik) as apr, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"05') group by a.nik) as mei, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"06') group by a.nik) as jun, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"07') group by a.nik) as jul, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"08') group by a.nik) as aug, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"09') group by a.nik) as sep, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"10') group by a.nik) as okt, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"11') group by a.nik) as nov, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji and a.nik = z.nik "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1).substr(0,4)+"12') group by a.nik) as des "+
							"from gaji_d z inner join gaji_m y on z.no_gaji=y.no_gaji and z.nik = y.nik "+this.filter3+
							" ) d on a.nik=d.nik "+this.filter;
				if (this.jenisLap === "Bulanan"){
					this.title = new server_util_arrayList({items:["NIK","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des","Total"]});
					this.widthTable = new server_util_arrayList({items:[80,200,80,80,80,80,80,80,80,80,80,80,80,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Triwulan"){
					this.title = new server_util_arrayList({items:["NIK","Nama","Triwulan Ke-1","Triwulan Ke-2","Triwulan Ke-3","Triwulan Ke-4","Total"]});
					this.widthTable = new server_util_arrayList({items:[80,250,100,100,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Semester"){
					this.title = new server_util_arrayList({items:["NIK","Nama","Semester Ke-1","Semester Ke-2","Total"]});
					this.widthTable = new server_util_arrayList({items:[80,250,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hrmis_gaji_report_flHRGajiPBln]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		if (this.jenisLap === "Bulanan")
			var header = "LAPORAN REKAP GAJI PER BULAN";
		else if (this.jenisLap === "Triwulan")
			var header = "LAPORAN REKAP GAJI PER TRIWULAN";
		else if (this.jenisLap === "Semester")
			var header = "LAPORAN REKAP GAJI PER SEMESTER";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_rekapGaji");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_rekapGaji");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
		case "PreviewBtn" :        
			var win = window.open("");
			win.document.write(loadCSS("server_util_laporan"));
			win.document.write(this.allHtml);
			win.document.close();
		break;
		case "PrintBtn" :        		
	      try
	      {        
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
			this.previewReport(dthtml);
			this.viewer.enabledIframe();	
	        var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
			winfram.document.open();
			winfram.document.write(loadCSS("server_util_laporan"));
			winfram.document.write(this.allHtml);
			winfram.document.close();
			window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	      }catch(e)
	      {alert(e);}      
	      break;   
	    case "create" :    
	    case "edit"   :
	    case "del" 	  :
	    case "graph"  :
	      break;   
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;  
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});