window.app_saku2_report_ak_flAkJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_ak_flAkJurnal.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_ak_flAkJurnal";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Jurnal Piutang", 2);
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode from ( "+
									"select periode,kode_lokasi from aka_bill_j "+
									"union "+
									"select periode,kode_lokasi from aka_rekon_j "+
									"union "+
									"select periode,kode_lokasi from aka_batal_j "+
									"union "+
									"select periode,kode_lokasi from aka_amor_j)a where a.kode_lokasi='"+this.app._lokasi+"' ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Modul","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("No Bukti","All"));
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku2_report_ak_flAkJurnal.extend(window.childForm);
window.app_saku2_report_ak_flAkJurnal.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_akun, a.nama from masakun a  where a.block= '0' "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+" order by a.kode_akun",
														  "select count(a.kode_akun) from agg_masakun a  where a.block= '0'"+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
														  ["kode_akun","nama"],"and",["Kode Akun","Nama"]);
			}
			if (row == 4)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				var modul="";
				if (this.sg1.getCell(2,2)!="")
				{
					modul=" and a.modul='"+this.sg1.getCell(2,2)+"' ";
				}
				var sql1="select distinct a.no_kas,a.no_dokumen from kas_j a "+filter+modul; 
				var sql2="select count(distinct a.no_kas) from kas_j a "+filter+modul;
				this.filterRep.ListDataSGFilter(this, "Data Jurnal",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.no_kas","a.no_dokumen"),"and",new Array("No Kas","No Dokumen"),"and");
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,0,2,2,2]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct a.periode from ( "+
									"select periode,kode_lokasi from aka_bill_j "+
									"union "+
									"select periode,kode_lokasi from aka_rekon_j "+
									"union "+
									"select periode,kode_lokasi from aka_batal_j "+
									"union "+
									"select periode,kode_lokasi from aka_amor_j)a where a.kode_lokasi='"+this.app._lokasi+"' order by a.periode",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct a.modul from ( "+
									"select modul,kode_lokasi from aka_bill_j "+
									"union "+
									"select modul,kode_lokasi from aka_rekon_j "+
									"union "+
									"select modul,kode_lokasi from aka_batal_j "+
									"union "+
									"select modul,kode_lokasi from aka_amor_j)a where a.kode_lokasi='"+this.app._lokasi+"' order by a.modul",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Modul","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("No Bukti","All"));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filter2 = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_bukti",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				var modul="";
				if (this.sg1.getCell(2,2)!="")
				{
					modul=" and a.modul='"+this.sg1.getCell(2,2)+"' ";
				}
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();				
				var sql = "select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.modul,a.keterangan, "+
						"a.debet,a.kredit "+
						"from (select kode_lokasi,periode,dc,no_bill as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_bill_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_rekon as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_rekon_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_batal as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_batal_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_amor as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_amor_j) a  "+
						"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter2+modul+
						"order by a.periode,a.no_bukti,a.dc desc  ";
				this.scriptSqlCount = "select count(a.no_bukti) "+
						"from (select kode_lokasi,periode,dc,no_bill as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_bill_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_rekon as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_rekon_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_batal as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_batal_j "+
						"union "+
						"select kode_lokasi,periode,dc,no_amor as no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, "+
						"	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit "+
						"from aka_amor_j) a  "+
						"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter2+modul;
				this.title = new server_util_arrayList({items:["No Bukti","No Dokumen","Tanggal","Kode Akun","Nama Akun","Kode PP","Kode DRK","Modul","Keterangan","Debet","Kredit"]});
				this.widthTable = new server_util_arrayList({items:[80,120,50,80,200,60,60,60,250,90,90]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y"]});
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_ak_flAkJurnal]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN JURNAL PIUTANG<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
