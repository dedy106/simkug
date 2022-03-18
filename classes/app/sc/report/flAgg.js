window.app_sc_report_flAgg = function(owner)
{
	if (owner)
	{
		window.app_sc_report_flAgg.prototype.parent.constructor.call(this,owner);
		this.className = "app_sc_report_flAgg";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	
	this.periode=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from anggaran_d ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun","=",this.periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Cost Center","All"));
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periodik Laporan","=","Bulanan"]);
	this.doSelectCell(this.sg1,2,3);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
};
window.app_sc_report_flAgg.extend(window.portalui_childForm);
window.app_sc_report_flAgg.implement({
	doEllipseClick: function(sender, col, row){
		
		if (row ==1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from masakun a  where a.block= '0' "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  "select count(a.kode_akun) from masakun a  where a.block= '0'"+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["kode_akun","nama"],"and",["Kode Akun","Nama"]);
		}
		if (row == 1)
		{
				this.filterRep.ListDataSGFilter(this, "Daftar Cost Center",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_cc, nama from sc_cc ",
														  "select count(kode_cc) from sc_cc ",
														  ["kode_cc","nama"],"where",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Bulanan","Triwulan"));
		}	
		
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[0,2,2,0]);	
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct (substring(periode,1,4) from anggaran_d ",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Bulanan","Triwulan"));
		}	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periodik Laporan","=","Bulanan","Triwulan"]);
				
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.filter =  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filter2 =  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where");
	
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();	
				this.showFilter = this.filterRep.showFilter(this.sg1);
				if (this.sg1.getCell(2,3)=="Bulanan")
				{
					var sql =  "select a.kode_akun,f.nama as nama_akun,zz.kode_cc,zz.nama as nama_cc, "+
							"	   isnull(sum(g.agg_01),0) as agg_01,isnull(sum(g.agg_02),0) as agg_02,isnull(sum(g.agg_03),0) as agg_03,isnull(sum(g.agg_04),0) as agg_04,"+
							"	   isnull(sum(g.agg_05),0) as agg_05,isnull(sum(g.agg_06),0) as agg_06,isnull(sum(g.agg_07),0) as agg_07,isnull(sum(g.agg_08),0) as agg_08,"+
							"      isnull(sum(g.agg_09),0) as agg_09,isnull(sum(g.agg_10),0) as agg_10,isnull(sum(g.agg_11),0) as agg_11,isnull(sum(g.agg_12),0) as agg_12,isnull(sum(g.agg_total),0) as agg_total "+
							"from (select a.kode_pp,substring(a.periode,1,4) as tahun,a.kode_akun "+	
							"	  from anggaran_d a "+this.filter+
							"group by a.kode_pp,substring(a.periode,1,4),a.kode_akun ) a  "+
							"inner join masakun f on a.kode_akun=f.kode_akun "+
							"inner join sc_cc zz on a.kode_pp=zz.kode_cc "+
							"left join ( "+
							"	 select a.kode_pp,a.kode_akun, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
							"	   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as agg_01,"+
							"	   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as agg_02, "+
							"	   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as agg_03, "+
							"	   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as agg_04, "+
							"	   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as agg_05, "+
							"	   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as agg_06, "+
							"	   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as agg_07, "+
							"	   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as agg_08, "+
							"	   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as agg_09, "+
							"	   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as agg_10, "+
							"	   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as agg_11, "+
							"	   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as agg_12 "+
							"	 from anggaran_d a "+this.filter+
							"	 group by a.kode_pp,a.kode_akun "+
							"		 )g on a.kode_pp=g.kode_pp and a.kode_akun=g.kode_akun "+this.filter2+
							"group by a.kode_akun,f.nama,zz.kode_cc,zz.nama order by a.kode_akun";	
					this.scriptSqlCount = "select count(a.kode_akun) "+
							"from (select a.kode_pp,substring(a.periode,1,4) as tahun,a.kode_akun "+	
							"	  from anggaran_d a "+this.filter+
							"group by a.kode_pp,substring(a.periode,1,4),a.kode_akun ) a  "+
							"inner join masakun f on a.kode_akun=f.kode_akun "+
							"inner join sc_cc zz on a.kode_pp=zz.kode_cc "+
							"left join ( "+
							"	 select a.kode_pp,a.kode_akun, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
							"	   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as agg_01,"+
							"	   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as agg_02, "+
							"	   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as agg_03, "+
							"	   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as agg_04, "+
							"	   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as agg_05, "+
							"	   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as agg_06, "+
							"	   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as agg_07, "+
							"	   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as agg_08, "+
							"	   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as agg_09, "+
							"	   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as agg_10, "+
							"	   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as agg_11, "+
							"	   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as agg_12 "+
							"	 from anggaran_d a "+this.filter+
							"	 group by a.kode_pp,a.kode_akun "+
							"		 )g on a.kode_pp=g.kode_pp and a.kode_akun=g.kode_akun "+this.filter2+
							"group by a.kode_akun,f.nama,zz.kode_cc,zz.nama order by a.kode_akun";
					
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode CC","Nama CC","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember","Total"]});
					this.widthTable = new server_util_arrayList({items:[70,200,50,100,80,80,80,80,80,80,80,80,80,80,80,80,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N","N","N","N","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,3)=="Triwulan")
				{
					var sql =  "select a.kode_akun,f.nama as nama_akun,zz.kode_lokasi,zz.nama as nama_lokasi, "+
							"	   isnull(sum(g.agg_tw1),0) as agg_01,isnull(sum(g.agg_tw2),0) as agg_02,isnull(sum(g.agg_tw3),0) as agg_03,isnull(sum(g.agg_tw4),0) as agg_04,"+
							"	 isnull(sum(g.agg_total),0) as agg_total "+
							"from (select a.kode_lokasi,substring(a.periode,1,4) as tahun,a.kode_akun "+	
							"	  from anggaran_d a "+this.filter+
							"group by a.kode_lokasi,substring(a.periode,1,4),a.kode_akun ) a  "+
							"inner join masakun f on a.kode_akun=f.kode_akun "+
							"inner join lokasi zz on a.kode_lokasi=zz.kode_lokasi "+
							"left join ( "+
							"	 select a.kode_lokasi,a.kode_akun, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw1,"+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw2, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw3, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw4 "+
							"	 from anggaran_d a "+this.filter+
							"	 group by a.kode_lokasi,a.kode_akun "+
							"		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_akun=g.kode_akun "+this.filter2+
							"group by a.kode_akun,f.nama,zz.kode_lokasi,zz.nama order by a.kode_akun";	
					this.scriptSqlCount = "select count(a.kode_akun) "+
							"from (select a.kode_lokasi,substring(a.periode,1,4),a.kode_akun "+	
							"	  from anggaran_d a "+this.filter+
							"group by a.kode_lokasi,substring(a.periode,1,4),a.kode_akun ) a  "+
							"inner join masakun f on a.kode_akun=f.kode_akun  "+
							"inner join lokasi zz on a.kode_lokasi=zz.kode_lokasi "+
							"left join ( "+
							"	 select a.kode_lokasi,a.kode_akun, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw1,"+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw2, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw3, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as agg_tw4 "+
							"	 from anggaran_d a "+this.filter+
							"	 group by a.kode_lokasi,a.kode_akun "+
							"		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_akun=g.kode_akun "+this.filter2;
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Lok","Nama Lokasi","Triwulan I","Triwulan II","Triwulan III","Triwulan IV","Total"]});
					this.widthTable = new server_util_arrayList({items:[70,250,50,150,80,80,80,80,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y","Y"]});
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
			systemAPI.alert("[app_saku2_report_anggaran_flAggAkun]::mainButtonClick:"+e);
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
