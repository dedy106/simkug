window.app_hrmis_sdm_report_flRekapBKes = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_report_flRekapBKes.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_sdm_report_flRekapBKes";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi Biaya Kesahatan", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width-4,this.p1.height-22],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2],[2,2,1]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kes_trans_m ";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,"10"]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Provider","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Rumah Sakit"]);
	this.pager = 1;
};
window.app_hrmis_sdm_report_flRekapBKes.extend(window.portalui_childForm);
window.app_hrmis_sdm_report_flRekapBKes.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Provider",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_provider,nama from kes_provider where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from kes_provider where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_provider","nama"],"and",["Kode","Nama Provider"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[2,0,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[3,0,2,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kes_trans_m ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct nama from kes_klp_provider where kode_lokasi='10' ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,"10"]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Provider","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Rumah Sakit"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							  this.filterRep.filterStr("x.kode_provider",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				if (this.sg1.getCell(2,3) == 'Rumah Sakit')
				{	this.filter2 = 'RS/'+this.sg1.getCell(2,1);}
				else
				{	this.filter2 = 'KF/'+this.sg1.getCell(2,1);}
				this.nama_report="server_report_sdm_rptRekapBKes";
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
			alert("[app_hrmis_sdm_report_flRekapBKes]::mainButtonClick:"+e);
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