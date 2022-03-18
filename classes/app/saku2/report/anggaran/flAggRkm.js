window.app_saku2_report_anggaran_flAggRkm = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_anggaran_flAggRkm.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_anggaran_flAggRkm";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.periode=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_rkm ");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["PS","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Sub PS","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Sub Sub PS","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["PK","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["DRK","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Jenis Laporan","=","RKM"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
};
window.app_saku2_report_anggaran_flAggRkm.extend(window.childForm);
window.app_saku2_report_anggaran_flAggRkm.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==1)
		{
			this.filterRep.ListDataSGFilter(this, "Data PS",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_ps, nama from agg_ps ",
											"select count(*) from agg_ps ",
											new Array("kode_ps","nama"),"where",new Array("kode","nama"));
		}
		if (row ==2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Sub PS",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_subps, nama from agg_subps ",
											"select count(*) from agg_subps ",
											new Array("kode_subps","nama"),"where",new Array("kode","nama"));
		}
		if (row ==3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Sub Sub PS",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_subsubps, nama from agg_subsubps ",
											"select count(*) from agg_subsubps ",
											new Array("kode_subsubps","nama"),"where",new Array("kode","nama"));
		}
		if (row ==4)
		{
			this.filterRep.ListDataSGFilter(this, "Data PK",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_pk, nama from agg_pk ",
											"select count(*) from agg_pk ",
											new Array("kode_pk","nama"),"where",new Array("kode","nama"));
		}
		if (row ==5)
		{
			this.filterRep.ListDataSGFilter(this, "Data DRK",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_drk, nama from agg_drk ",
											"select count(*) from agg_drk ",
											new Array("kode_drk","nama"),"where",new Array("kode","nama"));
		}
		if (row ==6)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_akun, nama from masakun ",
											"select count(*) from masakun ",
											new Array("kode_akun","nama"),"where",new Array("kode","nama"));
		}
	},
	
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["3","123","123","123","123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[0,2,2,2,2,2,2,0]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct(tahun) as tahun from agg_rkm "+
									   " order by tahun desc",[this.sg1.columns.get(2).pickList]);
		}
	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["PS","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Sub PS","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Sub Sub PS","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["PK","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["DRK","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Jenis Laporan","=","RKM"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_ps",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_subps",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_subsubps",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_pk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_drk",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();	
			
				if (this.sg1.getCell(2,7)=="RKM")
				{
					var sql = "select a.kode_ps,c.nama as nama_ps,a.kode_subps,d.nama as nama_subps,a.kode_subsubps,e.nama as nama_subsubps, "+
							"a.kode_pk,f.nama as nama_pk,a.kode_drk,g.nama as nama_drk,a.kode_akun,b.nama as nama_akun,a.kegiatan,a.tahun,a.prioritas,a.keterangan "+
							"from agg_rkm a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='99' "+
							"inner join agg_ps c on a.kode_ps=c.kode_ps and a.tahun=c.tahun "+
							"inner join agg_subps d on a.kode_subps=d.kode_subps  and a.tahun=d.tahun "+
							"inner join agg_subsubps e on a.kode_subsubps=e.kode_subsubps and a.tahun=e.tahun "+
							"inner join agg_pk f on a.kode_pk=f.kode_pk and a.tahun=f.tahun "+
							"inner join agg_drk g on a.kode_drk=g.kode_drk and a.tahun=g.tahun  "+this.filter+
							"order by a.kode_ps,a.kode_subps,a.kode_subsubps ";
					this.scriptSqlCount = "select count(a.kode_ps) "+
							"from agg_rkm a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='99' "+
							"inner join agg_ps c on a.kode_ps=c.kode_ps and a.tahun=c.tahun "+
							"inner join agg_subps d on a.kode_subps=d.kode_subps  and a.tahun=d.tahun "+
							"inner join agg_subsubps e on a.kode_subsubps=e.kode_subsubps and a.tahun=e.tahun "+
							"inner join agg_pk f on a.kode_pk=f.kode_pk and a.tahun=f.tahun "+
							"inner join agg_drk g on a.kode_drk=g.kode_drk and a.tahun=g.tahun  "+this.filter;
					this.title = new server_util_arrayList({items:["Kode PS","Nama PS","Kode Sub PS","Nama Sub PS","Kode Sub Sub PS","Nama Sub Sub PS","Kode PK","Nama PK","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Kegiatan","Tahun","Prioritas","Keterangan"]});
					this.widthTable = new server_util_arrayList({items:[50,100,50,100,50,100,50,100,70,150,70,150,200,50,50,150]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
				}
				
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_anggaran_flAggRkm]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);
				break;
				case "sqlToHtmlWithHeader":
					this.previewReport(result);
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  //this.dbLib.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);		
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "karyawan.xls");
			downloadFile(file);
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	  }catch(e){
		alert(e);
	  }
	},
	sg1onChange: function(sender, col , row){
	    if (col===1)
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
