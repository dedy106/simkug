window.app_saku_sdm_report_flSdmLoker = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_report_flSdmLoker.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_sdm_report_flSdmLoker";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Lokasi Kerja", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid",true);
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
		this.sg1.setRowCount(1);
		this.sg1.setCell(0,0,"Kode");
		
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","123","123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2],[0,2,2]);
	
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.gridLib.SGEditData(this.sg1,0,[0,1], ["Kode Lokasi","All"]);

	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_sdm_report_flSdmLoker.extend(window.portalui_childForm);
window.app_saku_sdm_report_flSdmLoker.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_lokasi, nama from hr_lokasi ",
										"select count(kode_lokasi) from hr_lokasi ",
										["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
};
window.app_saku_sdm_report_flSdmLoker.prototype.doSelectCell = function(sender, col, row)
{
	this.filterRep.setSGFilterRowTipe(this.sg1, row,[0],["123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0],[2]);
};
window.app_saku_sdm_report_flSdmLoker.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1], ["Kode Lokasi","All"]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter=this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");			
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select kode_lokasi,nama,alamat,kota,kodepos,no_telp,no_fax,email,website,pic from hr_lokasi "+
						this.filter+" order by kode_lokasi";
			this.scriptSqlCount =   "select count(kode_lokasi) from hr_lokasi "+this.filter;								
			this.objReport = "server_report_sdm_rptSdmLoker";
			this.report.preview(this.objReport,this.filter, 1, this.pager, this.showFilter, this.app._namalokasi);			
			this.sqlScript = this.sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    this.app._mainForm.reportNavigator.rearrange();			
		}
    }
	catch(e)
	{
		alert("[app_saku_sdm_report_flSdmLoker]::mainButtonClick:"+e);
	}
};
window.app_saku_sdm_report_flSdmLoker.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 			
			this.previewReport(result);			
		break;
	}
};
window.app_saku_sdm_report_flSdmLoker.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.objReport,this.filter, page, this.pager, this.showFilter, this.app._namalokasi);			
	this.page=page;
};
window.app_saku_sdm_report_flSdmLoker.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN LOKASI KERJA<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_sdm_report_flSdmLoker.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.report.preview(this.objReport,this.filter, 1,this.pager * this.viewer.getTotalPage(), this.showFilter, this.app._namalokasi);			
      break;
    case "pdfBtn" :      
	    var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("LokasiKerja");				
        this.viewer.useIframe(upDownHtml(html));
        break;    
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;  
  }
};
window.app_saku_sdm_report_flSdmLoker.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_sdm_report_flSdmLoker.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};