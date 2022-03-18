window.app_saku_kb_report_flKbBb = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flKbBb.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flKbBb";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Buku Besar KasBank", 2);

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
			this.sg1.setRowCount(6);
			this.sg1.setCell(0,0,"Periode");
			this.sg1.setCell(0,1,"Lokasi");
			this.sg1.setCell(0,2,"Kode Akun");
			this.sg1.setCell(0,3,"Kode PP");
			this.sg1.setCell(0,4,"Kode DRK");
			this.sg1.setCell(0,5,"Tampil Mutasi Nol");
			
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
	this.filterRep.setSGFilterRowTipe(this.sg1,0,[0,1,2,3,4,5],["1234","123","123","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1,0,[0,1,2,3,4,5],[0,2,2,2,2,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi2=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang",this.tanda,this.lokasi2]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode PP","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode DRK","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Tampil Mutasi Nol","=","Tidak"]);
	this.doSelectCell(this.sg1,2,5);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flKbBb.extend(window.portalui_childForm);
window.app_saku_kb_report_flKbBb.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==0)
	{
		if (this.userStatus=="A")
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_lokasi, nama from lokasi order by kode_lokasi",
													"select count(*) from lokasi order by kode_lokasi",
													new Array("kode_lokasi","nama"),"where");			
		}
	}
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_akun, a.nama from masakun a "+
												  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
												  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and ")+
												  " order by a.kode_akun",
												  "select count(a.kode_akun) from masakun a "+
												  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
												  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and "),
												  new Array("a.kode_akun","nama"),"and",new Array("kode akun","nama"));
	}
	if (row == 3)
	{
		this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama from pp where tipe='Posting' "+
												   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and ")+" order by kode_pp",
												  "select count(kode_pp) from pp where tipe='Posting' "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and "),
												  new Array("kode_pp","nama"),"where");
	}
	if (row == 4)
	{
		this.filterRep.ListDataSGFilter(this, "Data DRK",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_drk, nama from drk where tipe='Posting' "+
												   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and ")+" order by kode_drk",
												  "select count(kode_drk) from drk where tipe='Posting' "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and "),
												  new Array("kode_drk","nama"),"and",["Kode","Nama DRK"]);
	}
};
window.app_saku_kb_report_flKbBb.prototype.doSelectCell = function(sender, col, row)
{
	this.sg1.columns.get(col).setReadOnly(false);
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("123","3","123","123","123","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(2,0,2,2,2,0));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("3","3","123","123","123","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(3,3,2,2,2,0));
		this.sg1.columns.get(col).setReadOnly(true);
	}
	/*if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Neraca Percobaan","Neraca Lajur"));
	}*/
	if (row == 1)
	{
		this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);

	}
	if (row == 5)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
	}
};
window.app_saku_kb_report_flKbBb.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender === this.app._mainForm.bClear2)
		{
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang",this.tanda,this.lokasi2]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode PP","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode DRK","All",""]);
			this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Tampil Mutasi Nol","=","Tidak"]);
		}else{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.nik_user=this.app._nikUser;
			this.lokasi=this.app._namalokasi;
			this.dbname = this.app._dbEng;
			this.filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						" and a.nik_user='"+this.nik_user+"'";
						
			this.filter2=this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
						this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			if (this.sg1.getCell(1,1) == "All")
			{
				this.kode_lokasi=this.app._kodeLokasiKonsol;
				this.kode_lokasi1=this.app._kodeLokasi1;
				this.kode_lokasi2=this.app._kodeLokasi2;
			}
			if (this.sg1.getCell(1,1) == "Range")
			{
				this.kode_lokasi=this.app._kodeLokasiKonsol;
				this.kode_lokasi1=this.sg1.getCell(2,0);
				this.kode_lokasi2=this.sg1.getCell(3,0);
			}
			if (this.sg1.getCell(1,1) == "=")
			{
				this.kode_lokasi=this.sg1.getCell(2,0);
				this.kode_lokasi1=this.sg1.getCell(2,0);
				this.kode_lokasi2=this.sg1.getCell(2,0);
			}		
			if (this.app._dbEng == "mysqlt")
			{
				var sql = "call sp_glma_kas_tmp ('"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,1)+"','"+this.nik_user+"')";
			}
			
			this.dbLib.execQuerySync(sql);
			this.nama_report="server_report_kb_rptKbBb";
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.report.preview(this.nama_report,this.filter, 1,this.pager, this.showFilter, this.lokasi,this.filter2);
			this.page = 1;
			this.allBtn = false;
		}
	}catch(e)
	{
		alert("[flBB]::mainButtonClick:"+e);
	}
};
window.app_saku_kb_report_flKbBb.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_saku_kb_report_flKbBb.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.nama_report,this.filter, page,this.pager,this.showFilter, this.lokasi,this.filter2);
	this.page=page;
	this.allBtn = false;
};
window.app_saku_kb_report_flKbBb.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.page = 1;
	  this.allBtn = true;
	  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi,this.filter2);       
      break;
    case "pdfBtn" :
      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));
      break;
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;
  }
};
window.app_saku_kb_report_flKbBb.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_kb_report_flKbBb.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
