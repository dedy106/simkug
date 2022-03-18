window.app_saku_piutang_report_flKartuAR = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flKartuAR.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flKartuAR";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Kartu Piutang Mahasiswa", 2);

		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(150);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);	
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			this.sg1.setRowCount(5);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		
		//uses("server_report_report");
		//this.report = new server_report_report();
		//this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["13","123","13","123","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Report Format","=","S1"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
};
window.app_saku_piutang_report_flKartuAR.extend(window.portalui_childForm);
window.app_saku_piutang_report_flKartuAR.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{		
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_jur,nama_jur from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_ang,nama_ang from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									"select count(*) from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									["kode_ang","nama_ang"],"and",["Kode angkatan","Angkatan"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,
									"select npm,nama_mhs from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["npm","nama_mhs"],"and",["NPM/NIM","Nama Mhs"]);
	}
};
window.app_saku_piutang_report_flKartuAR.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["13","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,2,2,2,0,0]);
	}
	if (row == 4)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}
		else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}	
	if (row == 5)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"S1");
		this.sg1.columns.get(2).pickList.set(1,"S2");
	}
};
window.app_saku_piutang_report_flKartuAR.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Report Format","=","S1"]);
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	
			var result  = new portalui_arrayMap();			
			var isnull = this.app._dbEng == "mysqlt" ? "ifnull":"isnull";
			var sql = "select concat(a.npm,'-',a.nama_mhs) as mhs, b.no_invoice, b.disc, d.nama_produk, "+
				"	c.jumlah * c.nilai as tagihan "+
				"	, "+isnull+"(f.no_bukti,'-') as no_bukti, "+isnull+"(date_format(f.tanggal,'%Y-%m-%d'),'-') as tglbyr, ifnull(f.nilai_bayar, 0) as nilaibyr, 0 as saldo "+
				"from mhs a  inner join armhs_m b on b.ref1 = a.npm and b.kode_lokasi = a.kode_lokasi "+							
				this.filterRep.filterStr("b.periode",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
				"	inner join armhs_d c on c.no_invoice = b.no_invoice and b.kode_lokasi = c.kode_lokasi "+
				" 	inner join produk d on d.kode_produk = c.kode_produk and d.kode_lokasi = c.kode_lokasi "+				
				" 	left outer join (select e.kode_lokasi, e.ref2, e.tanggal, e.no_bukti, f.kode_produk, "+
				"   sum(case when substring(f.akun_piutang,1,1) = '5'  then -1 else 1 end * "+isnull+"(f.nilai,0) + "+isnull+"(f.disc,0)) as nilai_bayar "+
                "   from arbyrmhs_m e "+
                " 	inner join arbyrmhs_d f on f.kode_lokasi = e.kode_lokasi and f.no_bukti = e.no_bukti and f.nilai <> 0 "+
				this.filterRep.filterStr("e.periode",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"where")+				
				"   group by e.kode_lokasi, e.ref2, e.tanggal, e.no_bukti, f.kode_produk) f on f.kode_lokasi = b.kode_lokasi and f.kode_produk = c.kode_produk and f.ref2 = b.no_invoice "+
				this.filter + 
				"order by a.npm, b.no_invoice, d.kode_produk, f.tanggal";
			this.scriptSqlCount = "select count(*) "+
				"from mhs a  inner join armhs_m b on b.ref1 = a.npm and b.kode_lokasi = a.kode_lokasi "+							
				this.filterRep.filterStr("b.periode",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
				"	inner join armhs_d c on c.no_invoice = b.no_invoice and b.kode_lokasi = c.kode_lokasi "+				
				" 	inner join produk d on d.kode_produk = c.kode_produk and d.kode_lokasi = c.kode_lokasi "+				
				this.filter;			
			var title = new server_util_arrayList();			
			title.add("Mahasiswa");title.add("No Invoice");title.add("Disc");title.add("Produk");title.add("Tagihan");title.add("No Bukti");title.add("Tgl Bayar");title.add("Nilai Bayar(+disc)");title.add("Saldo");
			var width = new server_util_arrayList();			
			width.add(250);width.add(90);width.add(150);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);
			var fieldType = new server_util_arrayList();			
			fieldType.add("S");fieldType.add("S");fieldType.add("N");fieldType.add("S");fieldType.add("N");fieldType.add("S");fieldType.add("D");fieldType.add("N");fieldType.add("C");
			var groupBy = new server_util_arrayList();			
			groupBy.add("mhs");groupBy.add("no_invoice");groupBy.add("disc");groupBy.add("nama_produk");groupBy.add("tagihan");
			var groupHeader = new server_util_arrayList();			
			groupHeader.add("mhs");groupHeader.add("no_invoice");
			var summary = new server_util_arrayList();			
			summary.add("N");summary.add("N");summary.add("Y");summary.add("N");summary.add("Y");summary.add("N");summary.add("N");summary.add("Y");summary.add("Y");
			var calFields = new server_util_arrayList();			
			calFields.add("saldo;tagihan,nilaibyr");
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = groupBy;
			this.summary =  summary;
			this.groupHeader = groupHeader;
			this.calFields = calFields;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			//this.previewReport(dthtml);			
			this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader,this.calFields);			
		}
    }
	catch(e)
	{
		alert("[app_saku_piutang_report_flKartuAR]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flKartuAR.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.report)
		if  (methodName == "preview" )
				this.viewer.preview(result);							
				
	if (sender == this.dbLib)
		if  (methodName == "sqlToHtml" )
				this.previewReport(result);
};
window.app_saku_piutang_report_flKartuAR.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader,this.calFields);			
	//this.previewReport(dthtml);			
};
window.app_saku_piutang_report_flKartuAR.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN KARTU PIUTANG</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);	
	this.allHtml= html;
};
window.app_saku_piutang_report_flKartuAR.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :	  
	  this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader,this.calFields);			
	  //this.previewReport(dthml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("KartuAR");				
      this.viewer.useIframe(upDownHtml(html));
      break;   
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;
  
  }
};
window.app_saku_piutang_report_flKartuAR.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }else if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		 }
	} else if (col == 2){
		if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		}
	}	
};
window.app_saku_piutang_report_flKartuAR.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
