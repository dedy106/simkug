window.app_saku2_report_gl_flRekapJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_gl_flRekapJurnal.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_gl_flRekapJurnal";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Rekap Transaksi Jurnal", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode "+
									"from periode a ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));	
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Toleransi Inputan","=","2"));	
	this.dataLokasi = new arrayMap();
	var line,data = this.dbLib.getDataProvider("select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",true);
	for (var i in data.rs.rows){
		line = data.rs.rows[i];
		this.dataLokasi.set(line.kode_lokasi, line.nama);
	}
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,4);
};
window.app_saku2_report_gl_flRekapJurnal.extend(window.childForm);
window.app_saku2_report_gl_flRekapJurnal.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}			
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","23","3","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode "+
									"from periode union select distinct periode from kas_m order by periode desc",[this.sg1.columns.get(2).pickList]);
		}				
		if (row == 2){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["2","3"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));				
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Toleransi Inputan","=","2"));	
			}else{
				this.app._mainForm.reportNavigator.serverDownload = false;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	var result  = new arrayMap();										
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.filter2 = this.sg1.cells(2,2)+"/"+this.sg1.getCell(2,1);
				/*
				var modul = ["ju_m","kas_m","ptg_m","fasusut_m","fawoapp_m","aka_bill_m","aka_amor_m","aka_rekon_m","aka_batal_m","aka_sisih_m","yk_valid_m","yk_hutang_m","yk_rekon_m","spb_m","ras_ppn_m","takkirim_m","takterima_m"];
				var nobukti = ["no_ju","no_kas","no_ptg","no_fasusut","no_woapp","no_bill","no_amor","no_rekon","no_batal","no_sisih","no_valid","no_hutang","no_rekon","no_spb","no_ppn","no_kirim","no_terima"];
				var sql = "";
				/*sql += "select distinct convert(varchar,a.tanggal,103) as tanggal,c.total as tot, b.tgl,b.total "+
						" from "+modul[i]+" a "+	 
						" inner join (select convert(varchar,tanggal,103) as tanggal, convert(varchar,tgl_input,103) as tgl, count(*) as total  "+
						"			from "+modul[i]+" a "+ this.filter +" group by convert(varchar,tanggal,103), convert(varchar,tgl_input,103)) b on b.tanggal = convert(varchar,a.tanggal,103) "+
						" inner join (select convert(varchar,tanggal,103) as tanggal, count(*) as total "+
						"			from "+modul[i]+" a "+ this.filter +" group by convert(varchar,tanggal,103) ) c on c.tanggal = convert(varchar,a.tanggal,103) "+
							 this.filter;
				 * */
				 /*
				for (var i in modul){
					if (i > 0) sql += " union ";
					sql += "select convert(varchar,tanggal,103)+'/'+ "+
						" (case datename(weekday,tanggal) when 'Monday' then 'Senin'  "+
						"	when 'Tuesday' then 'Selasa' when 'Wednesday' then 'Rabu' when 'Thursday' then 'Kamis' "+
						"	when 'Friday' then 'Jum''at' when 'Saturday' then 'Sabtu' when 'Sunday'  then 'Minggu' end ) as tanggal "+
						" , convert(varchar,tgl_input,103) as tgl, "+
						" case datename(weekday,tanggal) when  'Friday' then "+this.sg1.cells(2,2)+"+2 when 'Thursday' then "+this.sg1.cells(2,2)+"+2 else "+this.sg1.cells(2,2)+" end + a.tanggal as maxtgl , "+
						" datediff (day,case datename(weekday,tanggal) when  'Friday' then "+this.sg1.cells(2,2)+"+2 when 'Thursday' then "+this.sg1.cells(2,2)+"+2 else "+this.sg1.cells(2,2)+" end + a.tanggal, tgl_input) as terlambat, "+nobukti[i]+" "+
						"from "+modul[i]+" a "+ this.filter;
				}
				sql = "select distinct a.tanggal,c.total as tot, b.tgl,b.total, case when b.terlambat < 0 then 0 else b.terlambat end as terlambat "+
						" from ("+sql+") a "+	 
						" inner join (select tanggal, tgl, terlambat,count(*) as total  "+
						"			from ("+sql+") a group by tanggal , tgl,terlambat) b on b.tanggal = a.tanggal "+
						" inner join (select tanggal as tanggal, count(*) as total "+
						"			from ("+sql+") a  group by tanggal ) c on c.tanggal = a.tanggal ";
				this.scriptSqlCount = "select count(*) "+
						"from ("+sql +") a ";
				sql = sql +" order by a.tanggal, b.tgl ";
				this.title = new server_util_arrayList({items:["Hari","Jumlah","Tgl Input","Jumlah","Keterlambatan"]});
				this.widthTable = new server_util_arrayList({items:[130,70,100,70,70]});
				this.fieldType = new server_util_arrayList({items:["S","N","S","N","N"]});																
				this.summary = new server_util_arrayList({items:["N","Y","N","Y","Y"]});
				this.groupBy = new server_util_arrayList({items:["tanggal","tot"]});
				this.groupHeader = new server_util_arrayList({items:["tanggal"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader, undefined, false);
				//this.sqlScript = sql;
				*
				*/				
				//this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				//this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	//this.app._mainForm.reportNavigator.rearrange();
				//this.previewReport(dthtml);
				this.nama_report="server_report_saku2_gl_rptRekapJurnal";				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.page = 1;
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_gl_flRekapJurnal]::mainButtonClick:"+e);
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
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
		//this.previewReport(dthtml);			
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>Rekap Transaksi Jurnal<br><span style='font-size:8'>"+this.showFilter+"</span><br> </div>";
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
		  //old
		  //var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  //this.previewReport(dthtml);
			/*var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN SALDO PIUTANG MAHASISWA<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
			var d = new Date();
			html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
			html += "</div>";
			var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
			previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
			*/
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  this.viewer.getTotalPage() * this.pager , this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "pdfBtn" :      
		  /*var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));*/
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :	
	      //var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "rekapjurnal.xls");
			//downloadFile(file);
		  this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));       
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
	      	this.app._mainForm.reportNavigator.serverDownload = false;
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
