window.app_saku_kb_report_flSpbBank = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flSpbBank.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flSpbBank";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan SPB", 2);

		uses("portalui_panel");
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
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		
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
			
			this.sg1.setRowCount(6);
			this.sg1.setCell(0,0,"Periode");
			this.sg1.setCell(0,1,"Lokasi");
			this.sg1.setCell(0,2,"Departemen");
			this.sg1.setCell(0,3,"Unit Kerja");
			this.sg1.setCell(0,4,"Kegiatan");
			this.sg1.setCell(0,5,"Nomor SPB");
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3),new  Array("1234","123","123","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3),new  Array(0,2,2,0));
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Departemen","All"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Unit Kerja","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Kegiatan","All"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("Nomor SPB","All"));
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flSpbBank.extend(window.portalui_childForm);
window.app_saku_kb_report_flSpbBank.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==1)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi,nama from lokasi ",
												  "select count(*) from lokasi ",
												  new Array("kode_lokasi","nama"),"where");
	}
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp,nama from pp order by kode_pp ",								   
												  "select count(kode_pp) from pp ",									 
												  new Array("kode_pp","nama"),"where");
	}
	if (row == 3)
	{
		this.filterRep.ListDataSGFilter(this, "Data Unit",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_unit,nama from unit order by kode_unit ",								   
												  "select count(kode_unit) from unit ",									 
												  new Array("kode_unit","nama"),"where");
	}
	if (row == 4)
	{
		this.filterRep.ListDataSGFilter(this, "Data Kegiatan",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_drk,nama from drk order by kode_drk ",								   
												  "select count(kode_drk) from drk ",									 
												  new Array("kode_drk","nama"),"where");
	}
	if (row == 5)
	{
		this.filterRep.ListDataSGFilter(this, "Data SPB",this.sg1, this.sg1.row, this.sg1.col,
												  "select no_spb,keterangan from spb_m order by no_spb ",								   
												  "select count(no_spb) from npko ",									 
												  new Array("no_spb","keterangan"),"where");
	}
};
window.app_saku_kb_report_flSpbBank.prototype.doSelectCell = function(sender, col, row)
{
	this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("1234","123","123","123","123","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
	if (row == 0)
	{
		if (this.sg1.getCell(1,1) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}
		else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,1),this.sg1.columns.get(2).pickList);
		}
	}
};
window.app_saku_kb_report_flSpbBank.prototype.mainButtonClick = function(sender)
{
	try
	{
		this.p1.setVisible(false);
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		
		this.filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
					  this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  //this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  //this.filterRep.filterStr("a.kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,5),"and")+
					  this.filterRep.filterStr("a.no_spb",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
		this.filter2 = this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,4)+"/"+this.sg1.getCell(2,5);
		this.showFilter = this.filterRep.showFilter(this.sg1);
		this.nama_report="server_report_kb_rptSpbBank";
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1,this.pager, this.showFilter, "YAKES TELKOM",this.filter2);
		this.page = 1;
		this.allBtn = false;
	}catch(e)
	{
		alert("[flSpbBank]::mainButtonClick:"+e);
	}
};
window.app_saku_kb_report_flSpbBank.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_saku_kb_report_flSpbBank.prototype.doSelectedPage = function(sender, page)
{
	if (this.sg1.getCell(2,4)=="Skontro")
	{
		this.report.preview(this.nama_report,this.filter, page,this.pager, "YAKES", this.showFilter,this.filter2);	
	}
	else
	{
		this.report.preview("server_report_kb_rptSpbBankStafel",this.filter, page,this.pager, "YAKES", this.showFilter,this.filter2);	
	}
	this.page=page;
	this.allBtn = false;
};
window.app_saku_kb_report_flSpbBank.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.allBtn = true;
	  this.page = 1;
	  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi,this.filter2);       
      break;
    case "pdfBtn" :
      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));
      break;
    case "xlsBtn" :
      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));       
      break; 
	case "PreviewBtn" :
		window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
		break;
	case "PrintBtn" :
      try
      {
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
        window.frames[this.viewer.getFullId() +"_iframe"].focus();
        window.frames[this.viewer.getFullId() +"_iframe"].print();
        
        var cnv = undefined;
        if (cnv != undefined)
        {
          cnv.focus();
          cnv.print();
        }
      }catch(e)
      {alert(e);}
      break; 
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;
  
  }
};
window.app_saku_kb_report_flSpbBank.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_kb_report_flSpbBank.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};