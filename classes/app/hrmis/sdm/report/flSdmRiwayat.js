window.app_hrmis_sdm_report_flSdmRiwayat = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_report_flSdmRiwayat.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_sdm_report_flSdmRiwayat";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Riwayat Pekerjaan", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
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
			this.sg1.setRowCount(3);
		
		uses("portalui_reportViewer",true);
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);		

		uses("server_report_report",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep",true);
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["13","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2],[2,2,2]);
	
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["NIK","All",""]);
};
window.app_hrmis_sdm_report_flSdmRiwayat.extend(window.portalui_childForm);
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.standar.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from hr_lokasi ",
										  "select count(*) from hr_lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_loker,nama,kode_lokasi from hr_loker "+
									  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  "select count(*) from hr_loker "+
									  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									  ["kode_loker","nama"],"and",["Kode","Nama","Lokasi"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
									  "select a.nik, a.nama from karyawan a   "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									  "select count(*) from karyawan a "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									  ["a.nik","a.nama"],"and",["NIK","Nama"]);
	}
};
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[2,2,2]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[3,2,2]);
	}
};
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Unit Kerja","All",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Karyawan","All",""]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
			this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
			this.filterRep.filterStr("a.nik",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);			
	    	this.viewer.setTotalPage(this.report.getTotalPage("server_report_sdm_rptRiwayat",this.filter,1));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			this.report.preview("server_report_sdm_rptRiwayat",this.filter, 1, 1, this.showFilter, this.app._namalokasi);
			this.page = 1;
		}
    }
	catch(e)
	{
		alert("[app_hrmis_sdm_report_flSdmRiwayat]::mainButtonClick:"+e);
	}
};
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview("server_report_sdm_rptRiwayat",this.filter, page, 1, this.showFilter, this.app._namalokasi);		
	this.page=page;
};
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.page = 1;
        this.report.preview("server_report_sdm_rptRiwayat",this.filter, this.page, this.viewer.getTotalPage() * 1, this.showFilter,this.app._namalokasi); 
      break;		
      break;
    case "pdfBtn" :      
	 this.viewer.useIframe(this.report.createPdf("server_report_sdm_rptRiwayat",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
      break;
    case "xlsBtn" :	
      this.viewer.useIframe(this.report.createXls("server_report_sdm_rptRiwayat",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));   
      break; 
	case "PreviewBtn" :        
		window.open(this.report.previewWithHeader("server_report_sdm_rptRiwayat",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
		break;
	case "PrintBtn" :        		
      this.viewer.useIframe(this.report.previewWithHeader("server_report_sdm_rptRiwayat",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
      try
      {
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
window.app_hrmis_sdm_report_flSdmRiwayat.prototype.sg1onChange = function(sender, col , row)
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