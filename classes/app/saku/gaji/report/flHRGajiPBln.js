window.app_saku_gaji_report_flHRGajiPBln = function(owner)
{
	try{
	if (owner)
	{
		window.app_saku_gaji_report_flHRGajiPBln.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gaji_report_flHRGajiPBln";
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
	this.tanda="All";
	this.nik="";
	if (this.app._userStatus!="A")
	{
		this.tanda="=";
		this.nik=this.app._userLog;
	}
	this.lokasi=this.app._lokasi;
	var periode=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from gaji_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun","=",periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK",this.tanda,this.nik]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Bulanan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	}catch(e) {alert("constructor = "+e);}
};
window.app_saku_gaji_report_flHRGajiPBln.extend(window.portalui_childForm);
window.app_saku_gaji_report_flHRGajiPBln.implement({
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
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,3,3,0]);
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
				if (this.app._userStatus=="A")
				{
					this.filter=this.filterRep.filterStr("e.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("e.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("e.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				}
				else
				{
					this.filter=this.filterRep.filterStr("e.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("e.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("e.nik",this.tanda,this.nik,this.nik,"and");
				}
				this.filter2=this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("substring(b.periode,1,4)",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
											
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,4);
				var result  = new portalui_arrayMap();
				if (this.jenisLap == "Bulanan")
				{
					var sql="select e.nik,e.nama,ifnull(f.g01,0) as g01,ifnull(f.g02,0) as g02,ifnull(f.g03,0) as g03,ifnull(f.g04,0) as g04, "+
							"	   ifnull(f.g05,0) as g05,ifnull(f.g06,0) as g06,ifnull(f.g07,0) as g07,ifnull(f.g08,0) as g08, "+
							"	   ifnull(f.g09,0) as g09,ifnull(f.g10,0) as g10,ifnull(f.g11,0) as g11,ifnull(f.g12,0) as g12,ifnull(f.total,0) as total  "+
							"from karyawan e "+
							"left join (select a.nik, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '01' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g01, "+
							"	   sum(case when substring(b.periode,5,2) between '02' and '02' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g02, "+
							"	   sum(case when substring(b.periode,5,2) between '03' and '03' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g03, "+
							"	   sum(case when substring(b.periode,5,2) between '04' and '04' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g04, "+
							"	   sum(case when substring(b.periode,5,2) between '05' and '05' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g05, "+
							"	   sum(case when substring(b.periode,5,2) between '06' and '06' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g06, "+
							"	   sum(case when substring(b.periode,5,2) between '07' and '07' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g07, "+
							"	   sum(case when substring(b.periode,5,2) between '08' and '08' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g08, "+
							"	   sum(case when substring(b.periode,5,2) between '09' and '09' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g09, "+
							"	   sum(case when substring(b.periode,5,2) between '10' and '10' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g10, "+
							"	   sum(case when substring(b.periode,5,2) between '11' and '11' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g11, "+
							"	   sum(case when substring(b.periode,5,2) between '12' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g12, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as total "+ 
							"	from gaji_d a "+
							"	inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
							"	group by a.nik)f on e.nik=f.nik "+this.filter+" order by e.nik";
				}
				if (this.jenisLap == "Triwulan")
				{
					var sql="select e.nik,e.nama,ifnull(f.g03,0) as g03, "+
							"	   ifnull(f.g06,0) as g06, "+
							"	   ifnull(f.g09,0) as g09,ifnull(f.g12,0) as g12,ifnull(f.total,0) as total  "+
							"from karyawan e "+
							"left join (select a.nik, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '03' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g03, "+
							"	   sum(case when substring(b.periode,5,2) between '04' and '06' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g06, "+
							"	   sum(case when substring(b.periode,5,2) between '07' and '09' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g09, "+
							"	   sum(case when substring(b.periode,5,2) between '10' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g12, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as total "+ 
							"	from gaji_d a "+
							"	inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
							"	group by a.nik)f on e.nik=f.nik "+this.filter+" order by e.nik";
				}
				if (this.jenisLap == "Semester")
				{
					var sql="select e.nik,e.nama, "+
							"	  ifnull(f.g06,0) as g06, "+
							"	  ifnull(f.g12,0) as g12,ifnull(f.total,0) as total  "+
							"from karyawan e "+
							"left join (select a.nik, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '06' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g06, "+
							"	   sum(case when substring(b.periode,5,2) between '07' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as g12, "+
							"	   sum(case when substring(b.periode,5,2) between '01' and '12' then case when a.dc='D' then a.nilai else -a.nilai end else 0 end ) as total "+ 
							"	from gaji_d a "+
							"	inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
							"	group by a.nik)f on e.nik=f.nik "+this.filter+" order by e.nik";
				}
				this.scriptSqlCount = "select count(*) "+
						"from karyawan e "+
							"left join (select a.nik "+
							"	from gaji_d a "+
							"	inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
							"	group by a.nik)f on e.nik=f.nik "+this.filter;
				
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
			systemAPI.alert("[app_saku_gaji_report_flHRGajiPBln]::mainButtonClick:"+e);
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