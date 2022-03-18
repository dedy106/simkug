window.app_saku_piutang_report_flAmorPDD = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flAmorPDD.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flAmorPDD";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Amortisasi PDD", 2);

		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(160);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(118);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
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
			this.sg1.setRowCount(5);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange","doPdfClick","doXlsClick",true);
		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","123","123","123","123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,2,2,2,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);	
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode Piutang","=",this.app._periode]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_piutang_report_flAmorPDD.extend(window.portalui_childForm);
window.app_saku_piutang_report_flAmorPDD.prototype.doEllipseClick= function(sender, col, row)
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
									  "select kode_jur, nama,kode_lokasi from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  "select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  ["kode_jur","nama"],"where",["Kode Jurusan","Nama","Lokasi"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_ang, nama,kode_lokasi from angkatan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  "select count(*) from angkatan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  ["kode_ang","nama"],"where",["Kode Angkatan","Nama","Lokasi"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,
									  "select npm, nama_mhs,kode_lokasi from mhs "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  "select count(*) from mhs "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  ["npm","nama"],"where",["Kode Angkatan","Nama","Lokasi"]);
	}
};
window.app_saku_piutang_report_flAmorPDD.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,2,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,2,2,2,0]);
	}
	if (row == 0)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}
};
window.app_saku_piutang_report_flAmorPDD.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","All",""]);	
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);	
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode Piutang","=",this.app._periode]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("m.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("m.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("m.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("m.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			var result  = new portalui_arrayMap();
			var sql = "select m.npm,m.nama_mhs,c.kode_ang,c.nama_ang,b.semester,m.kode_jur,a.ref1,p.jml_bulan,b.nilai,a.nilai as nlamor,b.nilai-a.nilai as saldo "+
						"from mhs m inner join ar_amor a on m.npm=a.ref2 and m.kode_lokasi=a.kode_lokasi "+
				           "inner join armhs_d b on a.ref1=b.no_invoice and a.kode_lokasi=b.kode_lokasi "+
				           "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur "+
				           "inner join param_bpp p on b.kode_produk=p.kode_produk and m.kode_jur=p.kode_jur "+
				                                                                 "and b.kode_lokasi=p.kode_lokasi "+
				                                                                 "and c.kode_ang=p.kode_ang "+
				                                                                 "and b.semester=p.semester "+this.filter+
						"order by m.npm ";
			this.scriptSqlCount = "select count(*) "+
							"from mhs m inner join ar_amor a on m.npm=a.ref2 and m.kode_lokasi=a.kode_lokasi "+
								   "inner join armhs_d b on a.ref1=b.no_invoice and a.kode_lokasi=b.kode_lokasi "+
								   "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur "+
								   "inner join param_bpp p on b.kode_produk=p.kode_produk and m.kode_jur=p.kode_jur "+
																						 "and b.kode_lokasi=p.kode_lokasi "+
																						 "and c.kode_ang=p.kode_ang "+
																						 "and b.semester=p.semester "+this.filter;
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			
			title.add("NPM");width.add(60);fieldType.add("S");
			title.add("Nama Mahasiswa");width.add(200);fieldType.add("S");
			title.add("Kode Angkatan");width.add(50);fieldType.add("S");
			title.add("Angkatan");width.add(60);fieldType.add("S");
			title.add("Semester");width.add(50);fieldType.add("S");
			title.add("Jurusan");width.add(50);fieldType.add("S");
			title.add("No Invoice/KTS");width.add(100);fieldType.add("S");
			title.add("Bulan");width.add(40);fieldType.add("N");
			title.add("Nilai");width.add(100);fieldType.add("N");
			title.add("Nilai Amortisasi");width.add(100);fieldType.add("N");
			title.add("Saldo");width.add(100);fieldType.add("N");
			
			var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,false);
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
			this.page = 1;
		}
    }
	catch(e)
	{
		alert("[app_saku_piutang_report_flAmorPDD]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flAmorPDD.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_piutang_report_flAmorPDD.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_saku_piutang_report_flAmorPDD.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN AMORTISASI PDD<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_piutang_report_flAmorPDD.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	 this.page = 1;
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
	  this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
      var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("AmorPDD");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :
      var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("AmorPDD");				
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
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
};
window.app_saku_piutang_report_flAmorPDD.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_piutang_report_flAmorPDD.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};