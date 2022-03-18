window.app_hrmis_gaji_report_flHRGajiKUker = function(owner)
{
	try{
	if (owner)
	{
		window.app_hrmis_gaji_report_flHRGajiKUker.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_gaji_report_flHRGajiKUker";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Gaji Komparasi Per Unit Kerja", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,150],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,127],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["3","3","3","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,0,0,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from gaji_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode 1","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Periode 2","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Unit Kerja","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	}catch(e) {alert("constructor = "+e);}
};
window.app_hrmis_gaji_report_flHRGajiKUker.extend(window.portalui_childForm);
window.app_hrmis_gaji_report_flHRGajiKUker.implement({
	doEllipseClick: function(sender, col, row){
		if (row === 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
								  "select kode_lokasi, nama from lokasi ",
								  "select count(*) from lokasi ",
								  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 3)
		{
			this.standar.ListDataSGFilter2(this, "Data Unit Kerja",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_loker,nama from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_loker","nama"],"where",["Kode","Nama"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,0,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,0,2]);
		}
		if (row === 1 || row ===2){
			this.dbLib.setItemsFromSQL("select distinct periode from gaji_m a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode 1","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Periode 2","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Unit Kerja","All",""]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filter2=this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							" and(z.kode_loker=x.kode_loker) ";
				this.filter3=this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,4);
				var result  = new portalui_arrayMap();
				var sql="select a.kode_loker,a.nama,ifnull(d.b1,0) as bln1,ifnull(d.b2,0) as bln2, "+
						"(ifnull(d.b1,0)-ifnull(d.b2,0)) as total "+
						"from hr_loker a "+
							"left outer join (select x.kode_loker, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 z on c.nik=z.nik and c.kode_lokasi=z.kode_lokasi and c.kode_lokkonsol=z.kode_lokkonsol "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1)+"') group by z.kode_loker) as b1, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 z on c.nik=z.nik and c.kode_lokasi=z.kode_lokasi and c.kode_lokkonsol=z.kode_lokkonsol "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,2)+"') group by z.kode_loker) as b2 "+
							"from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 x on c.nik=x.nik and c.kode_lokasi=x.kode_lokasi and c.kode_lokkonsol=x.kode_lokkonsol "+this.filter3+
							" group by x.kode_loker) d on a.kode_loker=d.kode_loker "+this.filter;
				this.scriptSqlCount = "select count(*) "+
						"from hr_loker a "+
							"left outer join (select x.kode_loker, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 z on c.nik=z.nik and c.kode_lokasi=z.kode_lokasi and c.kode_lokkonsol=z.kode_lokkonsol "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,1)+"') group by z.kode_loker) as b1, "+
								"(select sum(case a.dc when 'D' then a.nilai else -a.nilai end) from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 z on c.nik=z.nik and c.kode_lokasi=z.kode_lokasi and c.kode_lokkonsol=z.kode_lokkonsol "+this.filter2+" and(c.periode = '"+this.sg1.getCell(2,2)+"') group by z.kode_loker) as b2 "+
							"from gaji_d a inner join gaji_m c on a.no_gaji=c.no_gaji inner join hr_dinas2 x on c.nik=x.nik and c.kode_lokasi=x.kode_lokasi and c.kode_lokkonsol=x.kode_lokkonsol "+this.filter3+
							" group by x.kode_loker) d on a.kode_loker=d.kode_loker "+this.filter;
				this.title = new server_util_arrayList({items:["Kode","Unit Kerja","Periode "+this.sg1.getCell(2,1),"Periode "+this.sg1.getCell(2,2),"Total"]});
				this.widthTable = new server_util_arrayList({items:[80,250,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","N","N","N"]});
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hrmis_gaji_report_flHRGajiKUker]::mainButtonClick:"+e);
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
		var header = "LAPORAN REKAP GAJI KOMPARASI PER UNIT KERJA";
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