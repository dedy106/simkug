window.app_saku_kb_report_flPosisiSpp = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flPosisiSpp.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flPosisiSpp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi Surat Permintaan Pembayaran", 2);
		
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
		this.sg1.setRowCount(9);
	
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
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from spb_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",periode]);
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No SPP","All"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Dok SPP","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("No Verifikasi","All"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Kas/Bank","All"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Progress","=","ALL"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Posted","=","ALL"));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2), new Array("Jenis Laporan","=","SPP"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flPosisiSpp.extend(window.portalui_childForm);
window.app_saku_kb_report_flPosisiSpp.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												  "select count(*) from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												  new Array("kode_lokasi","nama"),"where");
	}
	if (row == 2)
	{
		var sql1="select no_spb,no_dokumen,keterangan from spb_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='SPP' ";
		var sql2="select count(no_spb) from spb_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='SPP' ";
		this.filterRep.ListDataSGFilter(this, "Data No SPP",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_spb","no_dokumen","keterangan"),"and");
	}
	if (row == 3)
	{
		var sql1="select no_dokumen,keterangan from spb_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='SPP' ";
		var sql2="select count(no_dokumen) from spb_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='SPP' ";
		this.filterRep.ListDataSGFilter(this, "Data Dokumen SPP",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_dokumen","keterangan"),"and");
	}
	
	if (row == 4)
	{
		var sql1="select distinct c.no_ver,c.keterangan from spb_m a "+
		         "left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
				"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
				 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and a.modul='SPP' ";
		var sql2="select count(c.no_ver) from spb_m a "+
		         "left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
				 "left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
				 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and a.modul='SPP' ";
		this.filterRep.ListDataSGFilter(this, "Data Dokumen Verifikasi",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,["c.no_ver","a.keterangan"],"and",["No Ver","Keterangan"]);
	}
	if (row == 5)
	{
		var sql1="select distinct e.no_kas,e.no_dokumen,e.keterangan from spb_m a "+
		         "left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.status<>'DEL' "+
				"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
				"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
				"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
				 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and a.modul='SPP' ";
		var sql2="select count(e.no_kas) from spb_m a "+
		         "left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.status<>'DEL' "+
				"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
				"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
				"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
				 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and a.modul='SPP' ";
		this.filterRep.ListDataSGFilter(this, "Data Dokumen Kas/Bank",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,["e.no_kas","e.no_dokumen","e.keterangan"],"and",["No Kas/Bank","No Dokumen","Keterangan"]);
	}
};
window.app_saku_kb_report_flPosisiSpp.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array("123","3","123","123","123","123","3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array(2,0,2,2,2,2,0,0,0));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array("3","3","123","123","123","123","3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array(3,0,2,2,2,2,0,0,0));
	}
	if (row == 1)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from spb_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
	}
	if (row == 6)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("ALL","SPP","VER","KB"));
	}	
	if (row == 7)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("ALL","T","F"));
	}
	if (row == 8)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("SPP","JURNAL"));
	}	
};
window.app_saku_kb_report_flPosisiSpp.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang","=",this.app._lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",periode]);
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No SPP","All"));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Dok SPP","All"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("No Verifikasi","All"));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Kas/Bank","All"));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Progress","=","ALL"));
			this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Posted","=","ALL"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
			this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_spb",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("ifnull(c.no_ver,'')",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						this.filterRep.filterStr("ifnull(e.no_kas,'')",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.filter3=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_spb",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
	
			filter2="";
			if (this.sg1.getCell(2,6)=="SPP")
			{
				filter2=" and (e.no_kas is null and c.no_ver is null) ";
			}
			if (this.sg1.getCell(2,6)=="VER")
			{
				filter2=" and (e.no_kas is null and c.no_ver is not null) ";
			}
			if (this.sg1.getCell(2,6)=="KB")
			{
				filter2=" and (e.no_kas is not null and c.no_ver is not null) ";
			}
			posted="";
			if (this.sg1.getCell(2,7)=="T")
			{
				posted=" and e.posted='T' ";
			}
			if (this.sg1.getCell(2,7)=="F")
			{
				posted=" and e.posted='F' ";
			}
			if (this.sg1.getCell(2,8)=="SPP")
			{
				this.sql =  "select a.kode_pp,f.nama as nama_pp,a.no_spb,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,b.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_kas,e.no_dokumen as no_dok_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas,e.posted "+
							"from spb_m a "+
							"left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.status<>'DEL' "+
							"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
							"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
							"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
							"left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter+" and a.modul='SPP' "+filter2+posted+" order by a.no_spb";
				
				this.scriptSqlCount =   "select count(a.no_spb) "+
										"from spb_m a "+
										"left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.status<>'DEL' "+
										"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
										"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
										"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+this.filter+"  and a.modul='SPP'"+filter2+posted;
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode PP");width.add(70);fieldType.add("S");		
				title.add("Nama PP");width.add(150);fieldType.add("S");		
				title.add("No SPP");width.add(90);fieldType.add("S");
				title.add("No Dok SPP");width.add(90);fieldType.add("S");
				title.add("Tgl SPP");width.add(60);fieldType.add("D");	
				title.add("Keterangan");width.add(200);fieldType.add("S");		
				title.add("Nilai");width.add(90);fieldType.add("N");	
				title.add("No Ver");width.add(90);fieldType.add("S");	
				title.add("Tgl Ver");width.add(60);fieldType.add("D");	
				title.add("No KB");width.add(90);fieldType.add("S");	
				title.add("No Dok KB");width.add(90);fieldType.add("S");	
				title.add("Tgl KB");width.add(60);fieldType.add("D");	
				title.add("Posted");width.add(40);fieldType.add("S");
			}
			if (this.sg1.getCell(2,8)=="JURNAL")
			{
				this.sql = "select a.no_spb,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,f.nama,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit "+
						  "from spb_j a  "+
						  "left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
							"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
							"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
						  "inner join masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						  this.filter3+filter2+posted+" and a.modul='SPP' "
						  " order by a.no_spb,a.no_urut";
				this.scriptSqlCount =  "select count(*) "+
						  "from spb_j a  "+
						  "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  this.filter3+filter2+posted+" and a.modul='SPP' ";
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("No SPP");width.add(100);fieldType.add("S");		
				title.add("No Dokumen");width.add(100);fieldType.add("S");		
				title.add("Tanggal");width.add(90);fieldType.add("D");
				title.add("Kode Akun");width.add(70);fieldType.add("S");
				title.add("Nama Akun");width.add(150);fieldType.add("S");	
				title.add("Kode PP");width.add(70);fieldType.add("S");		
				title.add("Kode DRK");width.add(70);fieldType.add("S");	
				title.add("Keterangan");width.add(200);fieldType.add("S");	
				title.add("Debet");width.add(90);fieldType.add("N");	
				title.add("Kredit");width.add(90);fieldType.add("N");	
			}
			this.pager = this.app._baris;			
			var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager,title,width,fieldType,false);
			
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = this.sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
		}
    }
	catch(e)
	{
		alert("[app_saku_kb_report_flPosisiSpp]::mainButtonClick:"+e);
	}
};
window.app_saku_kb_report_flPosisiSpp.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_saku_kb_report_flPosisiSpp.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_saku_kb_report_flPosisiSpp.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI SPP<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_kb_report_flPosisiSpp.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
	  this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("PosisiSpp");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("PosisiSpp");				
		this.viewer.useIframe(upDownHtml(html));				
      break; 	  
	case "PreviewBtn" :      		 
		var win = window.open("");
		win.document.write(loadCSS("server_util_laporan"));
		win.document.write(this.allHtml);
		win.document.close();
		break;
	case "PrintBtn" :  
      try
      {        
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);
		this.viewer.enabledIframe();	
        var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(this.allHtml);
		winfram.document.close();
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
};
window.app_saku_kb_report_flPosisiSpp.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_kb_report_flPosisiSpp.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};