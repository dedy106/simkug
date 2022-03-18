window.app_saku2_report_kb_flPjAjuSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kb_flPjAjuSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kb_flPjAjuSaldo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from ptg_m ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Nik Pengaju","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Panjar","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Bentuk Laporan","=","Karyawan"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,5);
};
window.app_saku2_report_kb_flPjAjuSaldo.extend(window.childForm);
window.app_saku2_report_kb_flPjAjuSaldo.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_pp, nama from pp where tipe='Posting' "+
														   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
														  "select count(kode_pp) from pp where tipe='Posting' "+
														  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
														  new Array("kode_pp","nama"),"and");
			}
			if (row ==3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
												"select nik, nama from karyawan "+
												this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												"select count(*) from karyawan "+
												this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												new Array("nik","nama"),"where",new Array("NIK","Nama"));
			}
			if (row ==4)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.nik_pengaju",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filterRep.ListDataSGFilter(this, "Data Panjar",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_pj, a.keterangan from panjar_m a "+this.filter,
												"select count(*) from panjar_m a "+this.filter,
												new Array("a.no_pj","a.keterangan"),"and",new Array("No Panjar","Keterangan"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","23","123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from panjar_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Karyawan","PP"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Nik Pengaju","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Panjar","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Bentuk Laporan","=","Transaksi"));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.nik_pengaju",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_pj",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();	
			
				if (this.sg1.getCell(2,5)=="Karyawan")
				{
					var sql = "select a.nik_pengaju,b.nama,a.kode_pp,d.nama as nama_pp,a.no_pj,a.no_kas,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,date_format(a.due_date,'%d/%m/%Y') as due_date,a.keterangan,a.nilai, "+
							"	   c.no_ptg,c.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,isnull(c.nilai,0) as nilai_ptg,"+
							"      case when isnull(c.nilai_kas,0)=0 then isnull(c.nilai,0)+isnull(c.nilai_kas,0)-isnull(a.nilai,0) else 0 end as saldo, "+
							"      case when isnull(c.nilai_kas,0)<>0 then isnull(c.nilai_kas,0) else 0 end as nilai_kas "+
							"from panjar_m a "+
							"inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
							"left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi "+this.filter;
							" order by a.no_ptg";
					this.scriptSqlCount = "select count(a.no_pj) "+
							"from panjar_m a "+
							"inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasii "+this.filter;
					this.title = new server_util_arrayList({items:["NIK","Nama","Kode PP","Nama PP","No Panjar","No Kas","Tgl Panjar","Tgl Jatuh Tempo","Keterangan","Nilai Panjar","No PTG","No Kas PTG","Tgl PTG","Nilai PTG","Saldo Panjar","Nilai Kasbank"]});
					this.widthTable = new server_util_arrayList({items:[60,150,60,120,60,60,60,60,200,80,60,60,60,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","S","S","S","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","N","N","N","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,5)=="PP")
				{
					this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.filter2 = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");

					var sql = "select a.kode_pp,a.nama,isnull(b.nilai,0) as nilai,isnull(c.nilai_ptg,0) as nilai_ptg, "+
							"	   isnull(b.nilai,0)-isnull(c.nilai_ptg,0)+isnull(c.nilai_kas,0) as saldo,isnull(c.nilai_kas,0) as nilai_kas "+
							"from pp a "+
							"left join (select a.kode_pp,sum(a.nilai) as nilai "+
							"		   from panjar_m a "+this.filter+
								"		   group by a.kode_pp "+ 
							"		   )b on a.kode_pp=b.kode_pp "+
							"left join (select a.kode_pp,sum(b.nilai) as nilai_ptg,sum(b.nilai_kas) as nilai_kas "+
							"		   from panjar_m a "+
							"	   inner join ptg_m b on a.no_pj=b.no_pj and a.kode_lokasi=b.kode_lokasi "+this.filter+
							"		   group by a.kode_pp  "+
							"		   )c on a.kode_pp=c.kode_pp "+this.filter2+
							"order by a.kode_pp ";
					this.scriptSqlCount = "select count(a.kode_pp) "+
							"from pp a "+
							"left join (select a.kode_pp,sum(a.nilai) as nilai "+
							"		   from panjar_m a "+this.filter+
								"		   group by a.kode_pp "+ 
							"		   )b on a.kode_pp=b.kode_pp "+
							"left join (select a.kode_pp,sum(b.nilai) as nilai_ptg,sum(b.nilai_kas) as nilai_kas "+
							"		   from panjar_m a "+
							"	   inner join ptg_m b on a.no_pj=b.no_pj and a.kode_lokasi=b.kode_lokasi "+this.filter+
							"		   group by a.kode_pp  "+
							"		   )c on a.kode_pp=c.kode_pp "+this.filter2;
					this.title = new server_util_arrayList({items:["Kode PP","Nama PP","Nilai Panjar","Nilai PTG","Saldo Panjar","Nilai Kasbank"]});
					this.widthTable = new server_util_arrayList({items:[60,200,80,80,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y"]});
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
			systemAPI.alert("[app_saku2_report_kb_flPjAjuSaldo]::mainButtonClick:"+e);
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
