window.app_saku_gaji_report_flHRRekapLokasi = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_report_flHRRekapLokasi.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gaji_report_flHRRekapLokasi";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Gaji Per Lokasi Kerja", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(170);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(130);
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
		
		uses("portalui_reportViewer",true);
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		
		uses("server_report_report",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep",true);
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	var periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gaji_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Pendapatan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_gaji_report_flHRRekapLokasi.extend(window.portalui_childForm);
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.standar.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_lokasi, nama from hr_lokasi ",
									"select count(*) from hr_lokasi ",
									["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_loker,nama from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_loker","nama"],"where",["Kode","Nama"]);
	}
	if (row == 3)
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
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","3","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,0]);
	}
	if (row == 1)
	{
		this.dbLib.setItemsFromSQL("select distinct periode from gaji_m a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);		
	}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"Pendapatan");
		this.sg1.columns.get(2).pickList.set(1,"Potongan");
		
	}
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",data.get(0).get('periode')]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Unit Kerja","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Pendapatan"]);
		}else
		{
			this.jenisReport(this.sg1.getCell(2,4),this.filter);
		}
    }
	catch(e)
	{
		alert("[app_saku_gaji_report_flHRRekapLokasi]::mainButtonClick:"+e);
	}
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.jenisReport = function(jenis,filter)
{
	try
	{
		this.p1.setVisible(false);
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		var title = new server_util_arrayList();			
		var width = new server_util_arrayList();
		var fieldType = new server_util_arrayList();
		this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,3),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("a.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");		
		this.filter2 = this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("b.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("b.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");		


		if (jenis == "Pendapatan")
		{
			var sql = "select a.nama,b.itt,b.imt,b.lakhar,b.poltek,b.pdc, "+
					  "		   (b.itt+b.imt+b.lakhar+b.poltek+b.pdc) as total "+
					  "	from gaji_param_d a "+
					  "	inner join (select a.kode_param, "+
					  "					sum(case when b.kode_lokasi='11' then a.nilai else 0 end ) as itt, "+
					  "					sum(case when b.kode_lokasi='12' then a.nilai else 0 end ) as imt, "+
					  "					sum(case when b.kode_lokasi='13' then a.nilai else 0 end ) as lakhar, "+
					  "					sum(case when b.kode_lokasi='14' then a.nilai else 0 end ) as poltek, "+
					  "					sum(case when b.kode_lokasi='15' then a.nilai else 0 end ) as pdc "+
					  "				from gaji_d a "+
					  "		   inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
					  "				group by a.kode_param "+
					  "			) b on a.kode_param=b.kode_param "+
					  "	where a.jenis='PDPT' "+
					  "	order by a.nu ";
			
			this.scriptSqlCount = "select count(*) "+
					"	from gaji_param_d a "+
					"	where a.jenis='PDPT' "+
			title.add("Uraian");width.add(200);fieldType.add("S");
			title.add("ITT");width.add(80);fieldType.add("N");
			title.add("IMT");width.add(80);fieldType.add("N");
			title.add("Lakhar");width.add(80);fieldType.add("N");
			title.add("Poltek");width.add(80);fieldType.add("N");
			title.add("PDC");width.add(80);fieldType.add("N");
			title.add("Total");width.add(80);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y"]});	

		}else if (jenis == "Potongan")
		{
			var sql = "select a.nama,b.itt,b.imt,b.lakhar,b.poltek,b.pdc, "+
					  "		   (b.itt+b.imt+b.lakhar+b.poltek+b.pdc) as total "+
					  "	from gaji_param_d a "+
					  "	inner join (select a.kode_param, "+
					  "					sum(case when b.kode_lokasi='11' then a.nilai else 0 end ) as itt, "+
					  "					sum(case when b.kode_lokasi='12' then a.nilai else 0 end ) as imt, "+
					  "					sum(case when b.kode_lokasi='13' then a.nilai else 0 end ) as lakhar, "+
					  "					sum(case when b.kode_lokasi='14' then a.nilai else 0 end ) as poltek, "+
					  "					sum(case when b.kode_lokasi='15' then a.nilai else 0 end ) as pdc "+
					  "				from gaji_d a "+
					  "		   inner join gaji_m b on a.no_gaji=b.no_gaji "+this.filter2+
					  "				group by a.kode_param "+
					  "			) b on a.kode_param=b.kode_param "+
					  "	where a.jenis='POT' "+
					  "	order by a.nu ";
			
			this.scriptSqlCount = "select count(*) "+
					"	from gaji_param_d a "+
					"	where a.jenis='POT' "+
			title.add("Uraian");width.add(200);fieldType.add("S");
			title.add("ITT");width.add(80);fieldType.add("N");
			title.add("IMT");width.add(80);fieldType.add("N");
			title.add("Lakhar");width.add(80);fieldType.add("N");
			title.add("Poltek");width.add(80);fieldType.add("N");
			title.add("PDC");width.add(80);fieldType.add("N");
			title.add("Total");width.add(80);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y"]});	

		}
		
		var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,true,undefined,this.summary);
		this.title = title;
		this.widthTable = width;
		this.fieldType = fieldType;
		this.sqlScript = sql;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.previewReport(dthtml,jenis);
    }catch(e)
	{
		alert("[app_saku_gaji_report_flHRRekapLokasi]::jenisReport:"+e);
	}
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager,this.title,this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml,this.sg1.getCell(2,3));			
	this.page=page;
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.previewReport = function(dthtml,jenis)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase();

	if (jenis == "Pendapatan")
	{
		html +="<br>LAPORAN REKAP PENDAPATAN PEGAWAI <br>";
	}
	if (jenis == "Potongan")
	{	
		html +="<br>LAPORAN REKAP POTONGAN PEGAWAI <br>";
	}
	if (jenis == "Semua")
	{	
		html +="<br>LAPORAN REKAP PENGHASILAN PEGAWAI <br>";
	}
	html+="Periode "+periodeToName(this.sg1.getCell(2,1))+"<br>";
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
	  this.previewReport(dthtml,this.sg1.getCell(2,3));			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("rekapgaji");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("rekapgaji");				
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
		this.previewReport(dthtml,this.sg1.getCell(2,3));
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
window.app_saku_gaji_report_flHRRekapLokasi.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_gaji_report_flHRRekapLokasi.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};