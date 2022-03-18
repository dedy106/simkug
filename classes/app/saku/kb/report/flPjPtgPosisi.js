window.app_saku_kb_report_flPjPtgPosisi = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flPjPtgPosisi.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flPjPtgPosisi";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi Pertanggungan Panjar", 2);
		
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
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","123","123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2],[0,2,2]);
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from panjar_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No Bukti","All",""]);

	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flPjPtgPosisi.extend(window.portalui_childForm);
window.app_saku_kb_report_flPjPtgPosisi.prototype.doEllipseClick= function(sender, col, row)
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
		var sql1="select no_ptg,keterangan from ptg_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='PTG_P' ";
		var sql2="select count(no_ptg) from ptg_m "+
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				 " and modul='PTG_P' ";
		
		this.filterRep.ListDataSGFilter(this, "Data Pertanggungan Panjar",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_ptg","keterangan"),"and");
	}
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.doSelectCell = function(sender, col, row)
{
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
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from panjar_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
	}
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi/Cabang","=",this.app._lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No Bukti","All",""]);
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
						this.filterRep.filterStr("a.no_ptg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select a.kode_pp,f.nama as nama_pp,a.no_ptg,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,b.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas "+
						"from ptg_m a "+
						"left join ver_d b on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
						"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
						"left join kas_d d on a.no_ptg=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
						"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
						"left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter+" and a.modul='PTG_P' order by a.no_ptg";
			this.scriptSqlCount =   "select count(a.no_ptg) "+
									"from ptg_m a "+
									"left join ver_d b on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
									"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
									"left join kas_d d on a.no_ptg=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
									"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+this.filter+"  and a.modul='PTG_P'";
			
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			title.add("Kode PP");width.add(70);fieldType.add("S");		
			title.add("Nama PP");width.add(150);fieldType.add("S");		
			title.add("No PTG");width.add(90);fieldType.add("S");		
			title.add("Tgl PTG");width.add(60);fieldType.add("D");	
			title.add("Keterangan");width.add(200);fieldType.add("S");		
			title.add("Nilai");width.add(90);fieldType.add("N");	
			title.add("No Ver");width.add(90);fieldType.add("S");	
			title.add("Tgl Ver");width.add(60);fieldType.add("D");	
			title.add("No KasBank");width.add(90);fieldType.add("S");	
			title.add("Tgl KasBank");width.add(60);fieldType.add("D");	
			this.pager = this.app._baris;			
			var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,false);
			
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = this.sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
		}
    }catch(e)
	{
		alert("[app_saku_kb_report_flPjPtgPosisi]::mainButtonClick:"+e);
	}
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI PERTANGGUNGAN PANJAR<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_kb_report_flPjPtgPosisi.prototype.doCloseReportClick = function(sender)
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
		html.add("PosisiPtg");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("PosisiPtg");				
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
window.app_saku_kb_report_flPjPtgPosisi.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_kb_report_flPjPtgPosisi.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};