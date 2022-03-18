window.GUI_sdm_report_flHRKerja = function(owner)
{
	if (owner)
	{
		window.GUI_sdm_report_flHRKerja.prototype.parent.constructor.call(this,owner);
		this.className = "GUI_sdm_report_flHRKerja";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Riwayat Pekerjaan", 2);

		uses("controls_panel");
		this.p1 = new controls_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("controls_saiSG");
		this.sg1 = new controls_saiSG(this.p1);
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
		uses("controls_reportViewer");
		this.viewer = new controls_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);		

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3),new  Array("3","3","3","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1,2,3),new  Array(2,2,2,2));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = this.app._mainForm.lib;
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		this.tanda="All";
		this.lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Departemen","=",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Lokasi Kerja","=",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Karyawan","=",""));		
}
window.GUI_sdm_report_flHRKerja.extend(window.controls_childForm);

window.GUI_sdm_report_flHRKerja.prototype.doEllipseClick= function(sender, col, row)
{
		if (row == 0)
		{
			this.standar.ListDataSGFilter2(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama,kode_lokkonsol from lokasi ",
													  "select count(*) from lokasi ",
													  new Array("kode_lokasi","nama"),"where",new Array("Kode","Nama","Konsolidasi"));
		}
		if (row == 1)
		{
			this.standar.ListDataSGFilter2(this, "Data Departermen",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama,kode_lokasi from pp "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+" and tipe='Posting' ",
													  "select count(*) from pp "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+" and tipe='Posting' ",
													  new Array("kode_pp","nama"),"where",new Array("Kode","Nama","Lokasi"));
		}
		if (row == 2)
		{
			this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_loker,nama,kode_lokasi from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+" and tipe='Posting' ",
													  "select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+" and tipe='Posting' ",
													  new Array("kode_loker","nama"),"where",new Array("Kode","Nama","Lokasi"));
		}
		if (row == 3)
		{
			this.standar.ListDataSGFilter2(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													  "select nik, nama,kode_lokasi from karyawan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													  this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													  this.filterRep.filterStr("kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
													  "select count(*) from karyawan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													  this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													  this.filterRep.filterStr("kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
													  new Array("nik","nama"),"where",new Array("NIK","Nama","Lokasi"));
		}	
}

window.GUI_sdm_report_flHRKerja.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,new Array(0,1,2,3),new  Array("3","3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,new Array(0,1,2,3),new  Array(2,2,2,2));
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,new Array(0,1,2,3),new  Array("3","3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,new Array(0,1,2,3),new  Array(3,2,2,2));
	}
}

window.GUI_sdm_report_flHRKerja.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Departemen","=",""));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Lokasi Kerja","=",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Karyawan","=",""));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("k.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"where");
			this.showFilter = this.filterRep.showFilter(this.sg1);			
	    	this.viewer.setTotalPage(this.report.getTotalPage("server_report_sdm_rptKerja",this.filter,1));

			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			this.report.preview("server_report_sdm_rptKerja",this.filter, 1, 1, this.showFilter, this.app._namalokasi);
			this.page = 1;
		}
    }
	catch(e)
	{
		alert("[GUI_sdm_report_flHRKerja]::mainButtonClick:"+e);
	}
}

window.GUI_sdm_report_flHRKerja.prototype.doRequestReady = function(sender, methodName, result)
{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
				break;
			
		}
}
window.GUI_sdm_report_flHRKerja.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview("server_report_sdm_rptKerja",this.filter, page, 1, this.showFilter, this.app._namalokasi);		
	this.page=page;
}

window.GUI_sdm_report_flHRKerja.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.page = 1;
        this.report.preview("server_report_sdm_rptKerja",this.filter, this.page, this.viewer.getTotalPage() * 1, this.showFilter,this.app._namalokasi); 
      break;		
      break;
    case "pdfBtn" :      
	 this.viewer.useIframe(this.report.createPdf("server_report_sdm_rptKerja",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
      break;
    case "xlsBtn" :	
      this.viewer.useIframe(this.report.createXls("server_report_sdm_rptKerja",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));   
      break; 
	case "PreviewBtn" :        
		window.open(this.report.previewWithHeader("server_report_sdm_rptKerja",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
		break;
	case "PrintBtn" :        		
      this.viewer.useIframe(this.report.previewWithHeader("server_report_sdm_rptKerja",this.filter, this.page, 1, this.showFilter,this.app._namalokasi));
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
}

window.GUI_sdm_report_flHRKerja.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
     if (this.sg1.getCell(1,row)=="All")
	 {
		this.sg1.setCell(2,row,"");
		this.sg1.setCell(3,row,"");
	 }
	} 
}
