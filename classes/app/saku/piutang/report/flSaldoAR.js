window.app_saku_piutang_report_flSaldoAR = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flSaldoAR.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flSaldoAR";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo Piutang Mahasiswa", 2);

		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(150);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);	
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			this.sg1.setRowCount(5);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		
		//uses("server_report_report");
		//this.report = new server_report_report();
		//this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["13","123","13","123","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
};
window.app_saku_piutang_report_flSaldoAR.extend(window.portalui_childForm);
window.app_saku_piutang_report_flSaldoAR.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{			
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_jur,nama_jur from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_ang,nama_ang from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									"select count(*) from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									["kode_ang","nama_ang"],"and",["Kode angkatan","Angkatan"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,
									"select npm,nama_mhs from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["npm","nama_mhs"],"and",["NPM/NIM","Nama Mhs"]);
	}
};
window.app_saku_piutang_report_flSaldoAR.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["13","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,2,2,2,0,0]);
	}
	if (row == 4)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}	
	if (row == 5)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"S1");
		this.sg1.columns.get(2).pickList.set(1,"S2");
	}
};
window.app_saku_piutang_report_flSaldoAR.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						(this.sg1.cells(1,3) != "All" ? this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and") :"");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			var result  = new portalui_arrayMap();
			if (this.sg1.cells(1,3) == "All"){
				var sql = "select concat(b.kode_jur,'-',b.nama_jur) as jurusan, concat(a.kode_ang, '-',a.nama_ang) as angkatan "+				
					"	, "+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) as sawal, "+isnull+"(g.bpp,0) as debet "+
					"	, "+isnull+"(h.bpp,0) as kredit,"+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) + "+isnull+"(g.bpp,0) -  "+isnull+"(h.bpp,0) as sakhir "+
					"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+					
					"	left outer join ("+this.getProdukAng(this.sg1.cells(2,4), '<')+") e on e.kode_jur = a.kode_jur and e.kode_ang = a.kode_ang and e.kode_lokasi = a.kode_lokasi "+
					"	left outer join ("+this.getByrProdukAng(this.sg1.cells(2,4), '<')+") f on f.kode_jur = a.kode_jur and f.kode_ang = a.kode_ang  and f.kode_lokasi = a.kode_lokasi "+
					"	left outer join ("+this.getProdukAng(this.sg1.cells(2,4), '=')+") g on g.kode_jur = a.kode_jur and g.kode_ang = a.kode_ang and g.kode_lokasi = a.kode_lokasi  "+
					"	left outer join ("+this.getByrProdukAng(this.sg1.cells(2,4), '=')+") h on h.kode_jur = a.kode_jur and h.kode_ang = a.kode_ang and h.kode_lokasi = a.kode_lokasi "+
					this.filter + 
					"order by b.kode_jur, a.kode_ang";
				this.scriptSqlCount = "select count(*) "+
					"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+					
					this.filter;
			}else {
				var sql = "select concat(b.kode_jur,'-',b.nama_jur) as jurusan, concat(a.kode_ang, '-',a.nama_ang) as angkatan,concat(d.npm,'-',d.nama_mhs) as mhs "+
					"	, "+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) as sawal, "+isnull+"(g.bpp,0) as debet "+
					"	, "+isnull+"(h.bpp,0) as kredit,"+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) + "+isnull+"(g.bpp,0) -  "+isnull+"(h.bpp,0) as sakhir "+
					"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
					"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
					"	left outer join ("+this.getProdukMhs(this.sg1.cells(2,4), '<')+") e on e.kode_jur = a.kode_jur and e.kode_ang = a.kode_ang and e.kode_lokasi = a.kode_lokasi and e.ref1 = d.npm "+
					"	left outer join ("+this.getByrProdukMhs(this.sg1.cells(2,4), '<')+") f on f.kode_jur = a.kode_jur and f.kode_ang = a.kode_ang  and f.kode_lokasi = a.kode_lokasi and f.ref1 = d.npm  "+
					"	left outer join ("+this.getProdukMhs(this.sg1.cells(2,4), '=')+") g on g.kode_jur = a.kode_jur and g.kode_ang = a.kode_ang and g.kode_lokasi = a.kode_lokasi  and g.ref1 = d.npm  "+
					"	left outer join ("+this.getByrProdukMhs(this.sg1.cells(2,4), '=')+") h on h.kode_jur = a.kode_jur and h.kode_ang = a.kode_ang and h.kode_lokasi = a.kode_lokasi and h.ref1 = d.npm "+
					this.filter + 
					"order by b.kode_jur,a.kode_ang";
				this.scriptSqlCount = "select count(*) "+
					"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
					"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
					this.filter;
			}
			var title = new server_util_arrayList();			
			title.add("Jurusan");title.add("Angkatan");if (this.sg1.cells(1,3) != "All") title.add("Mahasiswa");title.add("Saldo Awal");title.add("Debet");title.add("Kredit");title.add("Saldo Akhir");
			var width = new server_util_arrayList();			
			width.add(150);width.add(90);if (this.sg1.cells(1,3) != "All") width.add(250);
			width.add(100);width.add(100);
			width.add(100);width.add(100);
			var fieldType = new server_util_arrayList();			
			fieldType.add("S");fieldType.add("S");if (this.sg1.cells(1,3) != "All") fieldType.add("S");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");
			var groupBy = new server_util_arrayList();			
			groupBy.add("jurusan");
			var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,true, groupBy);			
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = groupBy;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);			
		}
    }
	catch(e)
	{
		alert("[app_saku_piutang_report_flSaldoAR]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flSaldoAR.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
	}
};
window.app_saku_piutang_report_flSaldoAR.prototype.doSelectedPage = function(sender, page)
{	
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);			
	this.previewReport(dthtml);
	this.page=page;
};
window.app_saku_piutang_report_flSaldoAR.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN SALDO PIUTANG</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml= html;	
};
window.app_saku_piutang_report_flSaldoAR.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
	  this.previewReport(dthml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("RekapAR");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
      var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("RekapAR");				
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
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
window.app_saku_piutang_report_flSaldoAR.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }else if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		 }
	} else if (col == 2){
		if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		}
	}	
};
window.app_saku_piutang_report_flSaldoAR.prototype.getProdukMhs = function(periode, operator)
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, "+
						"	  sum(b.jumlah * b.nilai) as bpp"+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode",operator,periode,"","and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 ";
};
window.app_saku_piutang_report_flSaldoAR.prototype.getByrProdukMhs = function(periode, operator)
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 , "+
						"	  sum(b.disc + case when substring(b.akun_piutang,1,1) = '5' then -1 else 1 end *b.nilai) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode",operator,periode,"","and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 ";
};
window.app_saku_piutang_report_flSaldoAR.prototype.getProdukAng = function(periode, operator)
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, "+
						"	  sum(b.jumlah * b.nilai) as bpp"+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode",operator,periode,"","and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flSaldoAR.prototype.getByrProdukAng = function(periode, operator)
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur , "+
						"	  sum(b.disc + case when substring(b.akun_piutang,1,1) = '5' then -1 else 1 end *b.nilai) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode",operator,periode,"","and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flSaldoAR.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
