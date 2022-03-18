window.app_saku2_report_anggaran_flAggOutSaku = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_anggaran_flAggOutSaku.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_anggaran_flAggOutSaku";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from periode where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Bidang","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode PP","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
};
window.app_saku2_report_anggaran_flAggOutSaku.extend(window.childForm);
window.app_saku2_report_anggaran_flAggOutSaku.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi where flag_konsol<>'1' ",
												  "select count(kode_lokasi) from lokasi where flag_konsol<>'1' ",
												  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_akun) from masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
													  ["kode_akun","nama"],"and",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Bidang",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_bidang, nama from bidang ",
													  "select count(kode_bidang) from bidang   ",
													  ["kode_bidang","nama"],"and",["Kode","Nama"]);
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"'  ",
													  ["kode_pp","nama"],"and",["Kode","Nama"]);
		}
	
	},
	
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","3","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4],[2,0,2,2,2]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct(periode) as periode from periode "+
									   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									   " order by periode desc",[this.sg1.columns.get(2).pickList]);
		}	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Bidang","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode PP","All",""]);
							
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							   this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							  this.filterRep.filterStr("c.kode_bidang",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							   this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();	
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var periode=this.sg1.getCell(2,1);
				var tahun=" and substring(a.periode,1,4)='"+this.sg1.getCell(2,1).substr(0,4)+"'";
			
				var sql =  "select a.kode_akun,b.nama as nama_akun,a.kode_lokasi+cc.kode_bidang+'000' as kode_bidang,cc.nama as nama_bidang, "+
						"	   isnull(d.sem1,0) as sem1,isnull(d.sem2,0) as sem2,isnull(e.real_rev,0) as real_rev,isnull(f.real_bln,0) as real_bln "+
						"from (select distinct a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"	  from anggaran_d a "+
						"	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+this.filter+tahun+
						"	  ) a "+
						"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"inner join bidang cc on a.kode_bidang=cc.kode_bidang "+
						
						"left join (select a.kode_akun,c.kode_bidang,a.kode_lokasi, "+
						"				   sum(case when substring(a.periode,5,2) between '01' and '06' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as sem1, "+
						"				   sum(case when substring(a.periode,5,2) between '07' and '12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as sem2 "+
						"		   from anggaran_d a "+
						"	  	   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+this.filter+tahun+
						"		   group by a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"		   )d on a.kode_akun=d.kode_akun and a.kode_bidang=d.kode_bidang and a.kode_lokasi=d.kode_lokasi "+						
						
						"left join (select a.kode_akun,c.kode_bidang,a.kode_lokasi, "+
						"				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as real_rev "+
						"		   from gldt_h a "+
						"	  	   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
						this.filter+" and a.periode<'"+periode+"' "+tahun+
						"		   group by a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"		   )e on a.kode_akun=e.kode_akun and a.kode_bidang=e.kode_bidang and a.kode_lokasi=e.kode_lokasi "+
						
						
						"left join (select a.kode_akun,c.kode_bidang,a.kode_lokasi, "+
						"				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as real_bln "+
						"		   from gldt a "+
						"		   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
						this.filter+" and a.periode='"+periode+"' "+
						"		   group by a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"		   union all "+
						"		   select a.kode_akun,c.kode_bidang,a.kode_lokasi, "+
						"				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as real_bln "+
						"		   from gldt_h a "+
						"		   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
						this.filter+" and a.periode='"+periode+"' "+
						"		   group by a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"		   )f on a.kode_akun=f.kode_akun and a.kode_bidang=f.kode_bidang and a.kode_lokasi=f.kode_lokasi "+
						"order by a.kode_akun,a.kode_bidang ";
				
				this.scriptSqlCount = "select count(a.kode_akun) "+
						"from (select distinct a.kode_akun,c.kode_bidang,a.kode_lokasi "+
						"	  from anggaran_d a "+
						"	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+this.filter+tahun+
						"	  ) a "+
						"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"inner join bidang cc on a.kode_bidang=cc.kode_bidang ";
				this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode Bidang","Nama Bidang","Anggaran Sem 1","Anggaran Sem 2","Real < "+periode,"Real "+periode]});
				this.widthTable = new server_util_arrayList({items:[80,300,80,200,90,90,90,90]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y"]});
				
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_anggaran_flAggOutSaku]::mainButtonClick:"+e);
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
