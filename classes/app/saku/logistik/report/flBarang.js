window.app_saku_logistik_report_flBarang = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_report_flBarang.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_logistik_report_flBarang";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Barang", 2);
		
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
			//this.sg1.columns.get(2).setReadOnly(false);
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			this.sg1.setRowCount(3);
			
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("13","13","13"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2),new  Array(2,2,2));
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		tanda="All";
		lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kelompok","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Barang","All",""));
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_logistik_report_flBarang.extend(window.portalui_childForm);
window.app_saku_logistik_report_flBarang.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
										"select count(*) from lokasi where flag_konsol='0'",
										new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
	}
	if (row ==1)
	{
		this.standar.ListDataSGFilter2(this, "Data Kelompok Barang",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_klpbrg, nama from barang_klp "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_klpbrg",
												  "select count(*) from barang_klp "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												  new Array("kode_klpbrg","nama"),"where",new Array("Kode ","Nama "));
	}
	if (row ==2)
	{
		this.standar.ListDataSGFilter2(this, "Data Barang",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_brg, nama from barang_m "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_brg",
												  "select count(*) from barang_m "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												  new Array("kode_brg","nama"),"where",new Array("Kode ","Nama "));
	}
};
window.app_saku_logistik_report_flBarang.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("13","13","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,2,2));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("3","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(3,2,2));
	}
};
window.app_saku_logistik_report_flBarang.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode","All",""));
        }
		else
		{
			this.p1.setVisible(false);
    		this.viewer.prepare();
    		this.viewer.setVisible(true);
    		this.app._mainForm.pButton.setVisible(false);
    		this.app._mainForm.reportNavigator.setVisible(true);
    		this.lokasi=this.app._namalokasi;
			this.nama_report="server_report_logistik_rptBarang";
			this.showFilter = this.filterRep.showFilter(this.sg1);
    		this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.kode_klpbrg",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("a.kode_brg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
    		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
    		this.app._mainForm.reportNavigator.rearrange();
    		this.showFilter = this.filterRep.showFilter(this.sg1);    	
    		this.report.preview(this.nama_report,this.filter, 1,this.pager,this.showFilter,this.lokasi);
			this.page = 1;
			this.allBtn = false;
		}     
		
	}catch(e)
	{
		alert("[app_saku_logistik_report_flBarang]::mainButtonClick:"+e);
	}
};
window.app_saku_logistik_report_flBarang.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
	}
};
window.app_saku_logistik_report_flBarang.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.nama_report,this.filter, page,this.pager,this.showFilter,this.lokasi);
    this.page=page;
	this.allBtn = false;
};
window.app_saku_logistik_report_flBarang.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
        this.allBtn = true;
	  this.page = 1;
	  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi);
      break;
    case "pdfBtn" :
       	this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.lokasi));
    break;
    case "xlsBtn" :
		this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.lokasi));       
    break;
	case "PreviewBtn" :
		window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi));
		break;
    case "PrintBtn" :
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.lokasi));
      try
      {
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
      //window.open(this.report.previewWithHeader("server_report_investasi_Produk",filter, 1, this.viewer.getTotalPage() * 30, "Y A K E S",showFilter));
      break; 
   
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;
  
  }
};
window.app_saku_logistik_report_flBarang.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_logistik_report_flBarang.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};