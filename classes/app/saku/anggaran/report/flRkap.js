window.app_saku_anggaran_report_flRkap = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_report_flRkap.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_anggaran_report_flRkap";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan RKAP Anggaran", 2);
		
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
			this.sg1.setRowCount(5);
			this.sg1.setCell(0,0,"Tahun");
			this.sg1.setCell(0,1,"Lokasi");
			this.sg1.setCell(0,2,"Kode FS");
			this.sg1.setCell(0,3,"Level");
			this.sg1.setCell(0,5,"Bentuk Laporan");
		
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["1234","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2,3],[0,2,2,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.app._periode.substr(0,4)]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi/Cabang","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode FS","=",this.app._kodeFs]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Level","=","1"]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Bentuk Laporan","=","Summary"]);
	this.doSelectCell(this.sg1,2,4);
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_anggaran_report_flRkap.extend(window.portalui_childForm);
window.app_saku_anggaran_report_flRkap.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==1)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
										  "select count(*) from lokasi "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_fs,nama from fs "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_fs",
										  "select count(kode_fs) from fs "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where "),
										  ["kode_fs","nama"],"where",["Kode","Nama"]);
	}
};
window.app_saku_anggaran_report_flRkap.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","123","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[0,2,2,0,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","3","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[0,2,2,0,0]);
	}
	if (row == 0)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["2008","2009"]);
	}
	if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["1","2","3","4","5"]);
	}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Summary","Detail"]);
	}
};
window.app_saku_anggaran_report_flRkap.prototype.mainButtonClick = function(sender)
{
	try
	{
		this.p1.setVisible(false);
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		this.lokasi=this.app._namalokasi;
		this.nik_user=this.app._nikUser;
		if (this.sg1.getCell(1,1) == "All")
		{
			this.kode_lokasi=this.app._kodeLokasiKonsol;
			this.kode_lokasi1=this.app._kodeLokasi1;
			this.kode_lokasi2=this.app._kodeLokasi2;
		}
		if (this.sg1.getCell(1,1) == "Range")
		{
			this.kode_lokasi=this.app._kodeLokasiKonsol;
			this.kode_lokasi1=this.sg1.getCell(2,1);
			this.kode_lokasi2=this.sg1.getCell(3,1);
		}
		if (this.sg1.getCell(1,1) == "=")
		{
			this.kode_lokasi=this.sg1.getCell(2,1);
			this.kode_lokasi1=this.sg1.getCell(2,1);
			this.kode_lokasi2=this.sg1.getCell(2,1);
		}
		this.filter = this.filterRep.filterStr("periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
					  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					  this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
		this.filter2 = this.nik_user+"/"+this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,3);
		var in_lap="S";
		var sql="call sp_rkap ('"+this.sg1.getCell(2,2)+"','L','"+in_lap+"',"+this.sg1.getCell(2,3)+",'"+this.sg1.getCell(2,0)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.nik_user+"')";
		
		alert(sql);
		this.dbLib.execQuerySync(sql);	
		this.nama_report="server_report_anggaran_rptRkap";
		this.showFilter = this.filterRep.showFilter(this.sg1);
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
		this.page = 1;
		this.allBtn = false;
	}catch(e)
	{
		alert("[flNeraca]::mainButtonClick:"+e);
	}
};
window.app_saku_anggaran_report_flRkap.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_anggaran_report_flRkap.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.nama_report,this.filter, page, this.pager, this.showFilter, this.lokasi,this.filter2);
	this.page=page;
	this.allBtn = false;
};
window.app_saku_anggaran_report_flRkap.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
		this.allBtn = true;
		this.page = 1;
		this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi, this.filter2);       
		break;
    case "pdfBtn" :
      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
      break;
    case "xlsBtn" :
      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));       
      break; 
	case "PreviewBtn" :
		window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	break;
	case "PrintBtn" :
      try
      {
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1, 300, this.showFilter, this.lokasi,this.filter2));
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
window.app_saku_anggaran_report_flRkap.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_anggaran_report_flRkap.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};