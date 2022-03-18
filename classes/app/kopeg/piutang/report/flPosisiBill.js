window.app_kopeg_piutang_report_flPosisiBill = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_report_flPosisiBill.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_piutang_report_flPosisiBill";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi Invoice Piutang Umum", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(200);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		this.sg1.columns.get(0).setColWidth(250);
		this.sg1.columns.get(0).setTitle("Filter");
		this.sg1.columns.get(0).setReadOnly(true);
		this.sg1.columns.get(1).setTitle("Type");
		this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		val.set(1, "All");
		val.set(2, "=");
		val.set(3, "Range");
		val.set(4, "Like");
		val.set(5, "<=");
		this.sg1.columns.get(1).setPicklist(val);
		this.sg1.columns.get(2).setColWidth(150);
		this.sg1.columns.get(2).setTitle("From");
		this.sg1.columns.get(3).setColWidth(150);
		this.sg1.columns.get(3).setTitle("To");
		this.sg1.setRowCount(7);
		this.sg1.setCell(0,0,"Tahun");
		this.sg1.setCell(0,1,"Lokasi");
		this.sg1.setCell(0,2,"Kode PP");
		
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array("3","123","123","123","123","123","13"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array(0,2,2,2,2,2,0));
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kop_ar_m where kode_lokasi ='"+this.lokasi+"' order by periode desc ";
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("PP/Unit","=",this.app._kodePP));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Bukti Invoice","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Akun Piutang","All"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Bayar","All"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Status Bayar","All"));
	//modul , ar / proyek
	
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_piutang_report_flPosisiBill.extend(window.portalui_childForm);
window.app_kopeg_piutang_report_flPosisiBill.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
											  "select count(*) from lokasi "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
											  new Array("kode_lokasi","nama"),"where");
	}
	if (row == 2)
	{
		var sql1="select kode_pp,nama from pp "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				 " and tipe = 'posting' ";
		var sql2="select count(kode_pp) from pp "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				 " and tipe = 'posting' ";
		this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("kode_pp","nama"),"and");
	}
	if (row == 3)
	{
		var sql1="select no_ar,keterangan from kop_ar_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
				 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
		var sql2="select count(no_ar) from kop_ar_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
				 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
		this.filterRep.ListDataSGFilter(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_ar","keterangan"),"and");
	}
	if (row == 4)
	{
		var sql1="select kode_akun,nama from masakun "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
		var sql2="select count(*) from masakun "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
		this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("kode_akun","nama"),"and");
	}
	if (row == 5)
	{
		var sql1="select no_bukti,keterangan from kop_arbayar_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
				 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
		var sql2="select count(no_bukti) from kop_arbayar_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
				 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
		this.filterRep.ListDataSGFilter(this, "Data Pembayaran",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_bukti","keterangan"),"and");
	}
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array("3","236","13","1356","13","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array(2,0,2,2,2,2,0));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array("3","236","13","1356","13","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array(3,0,2,2,2,2,0));
	}
	if (row === 1){
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from kop_ar_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc ",[this.sg1.columns.get(2).pickList]);
	}
	if (row === 6)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["1. Terbayar","2. Belum"]);
	}
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,3), new Array("PP/Unit","=",this.app._kodePP));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Bukti Invoice","All"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Akun Piutang","All"));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Bayar","All"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.no_ar",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.akun_ar",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			if (this.sg1.getCell(1,5).toUpperCase() != "ALL") 
						this.filter = this.filter + " "+ this.filterRep.filterStr("c.no_bukti",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
			if (this.sg1.getCell(1,6).toUpperCase() != "ALL") {
				if (this.sg1.getCell(2,6).substr(0,1) == "1")  this.filter = this.filter + " and b.no_ar is not null ";
				if (this.sg1.getCell(2,6).substr(0,1) == "2")  this.filter = this.filter + " and b.no_ar is null ";
			}
			
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select a.kode_pp,f.nama as nama_pp,a.no_ar,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai+a.nilai_ppn as nilai,b.no_bukti,date_format(c.tanggal,'%d/%m/%Y') as tgl_bayar,g.no_setor,date_format(h.tanggal,'%d/%m/%Y') as tgl_setor,d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas,a.posted,a.no_del,a.no_link "+
						"from kop_ar_m a "+
						"left join kop_arbayar_d b on a.no_ar=b.no_ar and a.kode_lokasi=b.kode_lokasi "+
						"left join kop_arbayar_m c on b.no_bukti=c.no_bukti and b.kode_lokasi=c.kode_lokasi "+
						"left join kop_arsetor_d g on c.no_bukti=g.no_bukti and c.kode_lokasi=g.kode_lokasi "+
						"left join kop_arsetor_m h on g.no_setor=h.no_setor and g.kode_lokasi=h.kode_lokasi "+
						"left join kas_d d on h.no_setor=d.no_bukti and a.kode_lokasi=h.kode_lokasi "+
						"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
						"left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter+" order by a.kode_pp,a.no_ar";
			
			this.scriptSqlCount =   "select count(*) "+
						"from kop_ar_m a "+this.filter;
						
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			
			title.add("Kode PP");width.add();fieldType.add("S");		
			title.add("Nama PP");width.add();fieldType.add("S");		
			title.add("No Invoice");width.add();fieldType.add("S");		
			title.add("Tgl Inv");width.add();fieldType.add("D");	
			title.add("Keterangan");width.add();fieldType.add("S");		
			title.add("Nilai");width.add();fieldType.add("N");	
			title.add("No Bayar");width.add();fieldType.add("S");	
			title.add("Tgl Bayar");width.add();fieldType.add("D");	
			title.add("No Setor");width.add();fieldType.add("S");	
			title.add("Tgl Setor");width.add();fieldType.add("D");	
			title.add("No Kas");width.add();fieldType.add("S");	
			title.add("Tgl Kas");width.add();fieldType.add("D");
			title.add("Posted");width.add();fieldType.add("S");
			title.add("No Delete");width.add();fieldType.add("S");
			title.add("No Link");width.add();fieldType.add("S");
			this.pager = this.app._baris;			
			var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager,title,width,fieldType,false);
			
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = this.sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
		}
    }
	catch(e)
	{
		alert("[app_kopeg_piutang_report_flPosisiBill]::mainButtonClick:"+e);
	}
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI INVOICE PIUTANG UMUM<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
	  this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("PosisiSpp");				
      this.viewer.useIframe(upDownHtml(html));
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
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
     if (this.sg1.getCell(1,row)=="All")
	 {
		this.sg1.setCell(2,row,"");
		this.sg1.setCell(3,row,"");
	 }
	} 
};
window.app_kopeg_piutang_report_flPosisiBill.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};