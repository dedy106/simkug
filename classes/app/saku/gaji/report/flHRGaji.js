window.GUI_gaji_report_flHRGaji = function(owner)
{
	if (owner)
	{
		window.GUI_gaji_report_flHRGaji.prototype.parent.constructor.call(this,owner);
		this.className = "GUI_gaji_report_flHRGaji";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Slip Gaji Karyawan", 2);
		
		uses("controls_panel",true);
		this.p1 = new controls_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("controls_saiGrid",true);
		this.sg1 = new controls_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(100);
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
		var val = new controls_arrayMap();
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
		this.sg1.setRowCount(4);
		
		uses("controls_reportViewer",true);
		this.viewer = new controls_reportViewer(this);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,2,2,0]);
	
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		this.tanda="All";
		this.lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Karyawan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","General"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.GUI_gaji_report_flHRGaji.extend(window.controls_childForm);
window.GUI_gaji_report_flHRGaji.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.standar.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_lokasi, nama,kode_lokkonsol from hr_lokasi ",
									"select count(*) from hr_lokasi ",
									["kode_lokasi","nama"],"where",["Kode","Nama","Konsolidasi"]);
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_loker,nama,kode_lokasi from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_loker","nama"],"where",["Kode","Nama","Lokasi"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
									"select a.nik, a.nama,b.kode_lokasi from karyawan a left join hr_dinas2 b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									"select count(*) from karyawan a left join hr_dinas2 b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									["a.nik","a.nama"],"where",["NIK","Nama","Lokasi"]);
	}
};
window.GUI_gaji_report_flHRGaji.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["13","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[2,2,2,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["3","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[3,2,2,0]);
	}
	if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"General");
		this.sg1.columns.get(2).pickList.set(1,"Agama");
		this.sg1.columns.get(2).pickList.set(2,"Pendidikan");
		this.sg1.columns.get(2).pickList.set(3,"Usia");
	}
};
window.GUI_gaji_report_flHRGaji.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Lokasi Kerja","All",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Karyawan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","General"]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("k.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("k.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("k.nik",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			var result  = new controls_arrayMap();
			this.jenisReport(this.sg1.getCell(2,3),this.filter);
		}
    }
	catch(e)
	{
		alert("[GUI_gaji_report_flHRGaji]::mainButtonClick:"+e);
	}
};
window.GUI_gaji_report_flHRGaji.prototype.jenisReport = function(jenis,filter)
{
	try
	{
		this.p1.setVisible(false);
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		this.nik_user=this.app._nikUser;
		this.dbname = this.app._dbEng;
		this.lokasi=this.app._namalokasi;
		this.filter = this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
			  this.filterRep.filterStr("nik",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");

		this.filter2 = this.nik_user+"/"+this.sg1.getCell(2,4)+"/"+this.sg1.getCell(2,1);
		this.nama_report="server_report_gaji_rptHRSlip";
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,30,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1, 30, this.showFilter, this.lokasi,this.filter2);
		
	}catch(e)
	{
		alert("[flTB]::mainButtonClick:"+e);
	}
};
window.GUI_gaji_report_flHRGaji.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.GUI_gaji_report_flHRGaji.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager,this.title,this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml,this.sg1.getCell(2,3));			
	this.page=page;
};
window.GUI_gaji_report_flHRGaji.prototype.previewReport = function(dthtml,jenis)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase();

	if (jenis == "General")
		html +="<br>LAPORAN DATA PEGAWAI YPT<br>";
	else if (jenis == "Agama")
		html +="<br>LAPORAN DATA PEGAWAI YPT<br>BERDASARKAN AGAMA<br>";
	else if (jenis == "Pendidikan")
		html +="<br>LAPORAN DATA PEGAWAI YPT<br>BERDASARKAN PENDIDIKAN<br>";
	else if (jenis == "Usia")
		html +="<br>LAPORAN DATA PEGAWAI YPT<br>BERDASARKAN USIA<br>";
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.GUI_gaji_report_flHRGaji.prototype.doCloseReportClick = function(sender)
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
		html.add("Karyawan");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("Karyawan");				
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
window.GUI_gaji_report_flHRGaji.prototype.sg1onChange = function(sender, col , row)
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
window.GUI_gaji_report_flHRGaji.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
