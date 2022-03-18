window.app_mede_report_flFPJP = function(owner)
{
	if (owner)
	{
		window.app_mede_report_flFPJP.prototype.parent.constructor.call(this,owner);
		this.className = "app_mede_report_flFPJP";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan FPJP",2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(159);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(136);
		this.sg1.setLeft(1);
		this.sg1.setTop(20);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,0,2,2,2,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	//this.getPeriode="select distinct periode from dmt_invoice where kode_lokasi ='"+this.lokasi+"'";
	this.getPeriode="select cast(date_format(now(),'%Y%m') as char) as periode ";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Bukti","All",""]);
	this.pager = 1;
};
window.app_mede_report_flFPJP.extend(window.portalui_childForm);
window.app_mede_report_flFPJP.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_cust, nama  from dmt_cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from dmt_cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[2,0,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[3,0,2]);
		}
		if (row === 1){
			//this.dbLib.setItemsFromSQL("select distinct periode from dmt_invoice where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
			this.dbLib.setItemsFromSQL("select cast(date_format(now(),'%Y%m') as char) as periode ",[this.sg1.columns.get(2).pickList]);
		}/*
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Semua","Lembar 1 - Pembeli","Lembar 2 - Penjual"]);
		}*/
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Bukti","All",""]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.nama_report="server_report_trisha_rptFPJP";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
		    	this.showFilter = this.filterRep.showFilter(this.sg1);
		    	this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.app._namalokasi,this.filter2);	
				this.page = 1;
				this.allBtn = false;
			}
	    }catch(e)
		{
			alert("[app_mede_report_flFPJP]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result)
	{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page)
	{
		this.report.preview(this.nama_report,this.filter, page,this.pager, this.showFilter, this.app._namalokasi,this.filter2);
		this.page=page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender)
	{
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.report.preview(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.app._namalokasi,this.filter2);
	      break;
	    case "pdfBtn" :      
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.filter2));       
	      break; 
		case "PreviewBtn" :        
			window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi,this.filter2));
			break;			
		case "PrintBtn" :        
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi,this.filter2));
	      try
	      {
	        window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
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
	},
	sg1onChange: function(sender, col , row)
	{
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		}
	},
	doRowPerPageChange: function(sender, rowperpage)
	{
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});