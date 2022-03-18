//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_gl_report_flBB = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flBB.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flBB";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Buku Besar", 2);
		var values = Array();
		for (var i = 0; i < 4 ;i++)
			values[i] = "cell value";
		uses("portalui_panel");
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
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
			
			this.sg1.setRowCount(4);
			this.sg1.setCell(0,0,"Periode");
			this.sg1.setCell(0,1,"Lokasi");
			this.sg1.setCell(0,2,"kode Akun");
			this.sg1.setCell(0,3,"Tampil Mutasi Nol");
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		
/*		this.viewer.onSelectedsystem.set(this, );
		this.viewer.onCloseClick.set(this, );
		this.viewer.onAllsystem.set(this, );		
		this.viewer.hideNavigator();
*/		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
		this.report.setClassObj("server_report_GL_BB");
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3),new  Array("1234","123","123","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3),new  Array(0,2,2,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._mainForm._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Tampil Mutasi Nol","=","Tidak"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_gl_report_flBB.extend(window.portalui_childForm);
window.app_saku_gl_report_flBB.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode, nama from lokasi ",
													  "select count(*) from lokasi ",
													  new Array("kode","nama"),"where");
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode, nama from masakun where block= '0' "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
													  "select count(*) from masakun where block= '0' "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
													  new Array("kode","nama"),"and");
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("1234","123","123","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(0,2,2,0));
		
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Ya","Tidak"));
		}else if (row == 0)
		{
			this.standar.isiItemsWithPeriode(this.sg1.columns.get(2).pickList);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			
			var filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("a.kode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.viewer.setTotalPage(this.report.getTotalPage(filter,this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			var showFilter = this.filterRep.showFilter(this.sg1);
			this.nama_report="server_report_GL_BB";
			this.filter = filter;
			this.filter2 = "";
			this.showFilter = showFilter;
			this.lokasi=this.app._namalokasi;
			this.report.preview(this.nama_report,filter, 1, this.pager, showFilter,this.lokasi, this.filter2);	  			
		}catch(e){
			systemAPI.alert("[flTB]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
				break;
		}
	},
	doSelectedPage: function(sender, page){
		this.report.preview(this.nama_report,this.filter, page, this.pager, this.showFilter, this.lokasi);	
	},
	doCloseReportClick: function(sender){
		switch(sender.getName())
	  {
	    case "allBtn" :
			this.report.preview(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2);       
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.lokasi,this.showFilter));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.lokasi,this.showFilter));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try {
		  	this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, this.pager, this.showFilter, this.lokasi, this.filter2));
		  	window.frames[this.viewer.getFullId() + "_iframe"].focus();
		  	window.frames[this.viewer.getFullId() + "_iframe"].print();
		  	
		  	var cnv = undefined;
		  	if (cnv != undefined) {
		  		cnv.focus();
		  		cnv.print();
		  	}
		  }catch (e) {
		  	alert(e);
		  }
	      
	      break; 
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(filter,this.pager));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});