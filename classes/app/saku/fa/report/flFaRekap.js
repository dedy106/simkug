// JavaScript Document
window.app_saku_fa_report_flFaRekap = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_report_flFaRekap.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_fa_report_flFaRekap";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Asset", 2);
		
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
		
		this.sg1.setRowCount(3);
		this.sg1.setCell(0,0,"Tahun");
		this.sg1.setCell(0,1,"Lokasi");
		this.sg1.setCell(0,2,"Kode PP");
		

		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		

		uses("server_report_simpleReport;server_report_report");
		this.report2 = new server_report_report();
		this.report2.addListener(this);
		uses("server_report_simpleReport");
		this.report = new server_report_simpleReport();
		
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("3","123","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2),new  Array(0,2,2));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Kelompok Asset","All"));

	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_fa_report_flFaRekap.extend(window.portalui_childForm);
window.app_saku_fa_report_flFaRekap.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			var sql1="select kode_klpakun,nama from fa_klpakun "+
			         this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					 "   ";
			var sql2="select count(kode_klpakun) from fa_klpakun "+
			         this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
			
			this.filterRep.ListDataSGFilter(this, "Data Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("kode_klpakun","Nama"),"and");
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("123","3","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,0,2));
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("3","3","123","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(3,0,2));
		}
		if (row == 1)
		{
			if (this.sg1.getCell(1,1) == "All")
			{
				this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
			}
			else
			{
				this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
			}
		}
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.nik_user=this.app._nikUser;
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.lokasi=this.app._namalokasi;
			this.filter=this.filterRep.filterStr("kode_fa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where");
			this.filter2 = this.nik_user+"/"+this.sg1.getCell(2,1);
			this.nama_report="server_report_fa_rptFaRekap";
			this.showFilter = this.filterRep.showFilter(this.sg1);
			sql="call sp_fa_rekap ('"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,1)+"','"+this.nik_user+"')";
			
			this.dbLib.execQuerySync(sql);	
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			//this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
			var html = this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
			this.viewer.preview(html);
			this.page = 1;
			this.allBtn = false;
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
		//this.report.preview(this.nama_report,this.filter, page, this.pager, this.lokasi, this.showFilter);	
		var html = this.report.preview(this.nama_report,this.filter, page, this.pager,this.showFilter, this.lokasi,this.filter2);	
		this.viewer.preview(html);
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
			//this.report.preview(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.lokasi, this.showFilter);       
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));       
			this.page = 1;
			this.allBtn = true;
	      break;
	    case "pdfBtn" :
	      //this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.lokasi,this.showFilter));
		  this.viewer.useIframe(this.report2.createPdf(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	      break;
	    //case "xlsBtn" :
	    //  this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.lokasi,this.showFilter));       
	    //  break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, this.page, (this.allBtn ? this.viewer.getTotalPage() * this.pager: this.pager), this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,this.page, (this.allBtn ? this.viewer.getTotalPage() * this.pager: this.pager), this.showFilter, this.lokasi,this.filter2));
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
	},
	sg1onChange: function(sender, col , row){
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		} 
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});