window.app_saku_piutang_report_flKTS = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flKTS.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flKTS";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan KTS", 2);

		uses("portalui_reportViewer;server_report_report;util_filterRep;util_standar;util_gridLib");
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(220);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(170);
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
			this.sg1.setRowCount(7);
			
			this.viewer = new portalui_reportViewer(this);
			this.viewer.setWidth(this.getWidth());
			this.viewer.setHeight(this.getHeight());
			this.viewer.setTop(0);
			this.viewer.setVisible(false);
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		
			
			this.report = new server_report_report();
			this.report.addListener(this);
	}
	
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5,6],["13","13","13","13","123","123","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);
		
	this.gridLib = new util_gridLib();	
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi",this.tanda,this.lokasi]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Periode","=",this.app._periode]);	
	this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Jurusan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Angkatan","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2], ["Mahasiswa","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2], ["No. Invoice","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2], ["Status","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_piutang_report_flKTS.extend(window.portalui_childForm);
window.app_saku_piutang_report_flKTS.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode Lokasi","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
					"select kode_jur, nama_jur from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
					"select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
					["kode_jur","nama_jur"],"and",["Kode","Nama"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
					"select kode_ang, nama_ang from angkatan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
					"select count(*) from angkatan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
					["kode_ang","nama_ang"],"and",["Kode","Nama"]);
	}
	if (row == 4)
	{
		this.standar.ListDataSGFilter2(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,
					"select npm, nama_mhs from mhs "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
					"select count(*) from mhs "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
					["npm","nama_mhs"],"and",["NPM/MHS","Nama"]);
	}
	if (row == 5)
	{
		this.standar.ListDataSGFilter2(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
			"select distinct no_invoice, keterangan from armhs_m "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
			this.filterRep.filterStr("ref1",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
			this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
			"select count(distinct no_invoice) from armhs_m "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
			this.filterRep.filterStr("ref1",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
			this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
			["no_invoice","keterangan"], "and",["No Invoice","Nama"]);
	}
};
window.app_saku_piutang_report_flKTS.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["13","13","13","123","123","123","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","13","13","13","123","123","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[0,3,2,2,2,2,0]);
	}
	if (row == 1)
	{
		if (this.sg1.getCell(1,0) == "All")
		{			
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);			
		}else
		{
			var rs = this.dbLib.runSQL("select distinct periode from armhs_m ");			
			if (rs instanceof portalui_arrayMap){
				this.sg1.columns.get(2).pickList.clear();
				this.sg1.columns.get(3).pickList.clear();
				var ix=0;
				for (var i in rs.objList){								
					this.sg1.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
					this.sg1.columns.get(3).pickList.set(ix, rs.get(i).get("periode"));
					ix++;
				}
			}
			//this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}
	if (row == 6){
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(3).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"Sudah");		
		this.sg1.columns.get(2).pickList.set(1,"Belum");		
	}
};
window.app_saku_piutang_report_flKTS.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{		
			this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi",this.tanda,this.lokasi]);	
			this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Jurusan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Angkatan","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2], ["Mahasiswa","All",""]);
			this.gridLib.SGEditData(this.sg1,5,[0,1,2], ["No. Invoice","All",""]);
			this.gridLib.SGEditData(this.sg1,6,[0,1,2], ["Status","All",""]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			var filterStatus = "";
			if (this.sg1.cells(1,6) == "All") filterStatus = "";
			else if (this.sg1.cells(2,6).toLowerCase() == "sudah") 
				filterStatus = " and ifnull(f.nilai_bayar,0) <> 0";
			else if (this.sg1.cells(2,6).toLowerCase() == "belum") 
				filterStatus = " and ifnull(f.nilai_bayar,0) = 0";			
	    	this.filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
						  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						  this.filterRep.filterStr("m.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("m.kode_ang",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")
						  this.filterRep.filterStr("a.ref1",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						  this.filterRep.filterStr("a.no_invoice",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
			this.filter += filterStatus;			
			
			this.nama_report="server_report_piutang_rptKTS";
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.app._namalokasi);	
			this.page = 1;
			this.allBtn = false;
		}
    }catch(e)
	{
		alert("[app_saku_piutang_report_flKTS]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flKTS.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_piutang_report_flKTS.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.nama_report,this.filter, page, this.pager, this.showFilter, this.app._namalokasi);
	this.page=page;
	this.allBtn = false;
};
window.app_saku_piutang_report_flKTS.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
		this.page = 1;
		this.allBtn = true;
		this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.app._namalokasi); 	
		break;
    case "pdfBtn" :      
      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi));
      break;
    case "xlsBtn" :
      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi));       
      break; 
	case "PreviewBtn" :        
		window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi));    
		break;
	case "PrintBtn" :        
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi));
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
};
window.app_saku_piutang_report_flKTS.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_piutang_report_flKTS.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};