window.app_saku_kb_report_flDropingPosisi = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flDropingPosisi.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flDropingPosisi";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Posisi Droping Kirim",2);
		
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
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);		

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("3","123","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2),new  Array(0,2,2));
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		tanda="All";
		lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Bukti","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flDropingPosisi.extend(window.portalui_childForm);
window.app_saku_kb_report_flDropingPosisi.prototype.doEllipseClick= function(sender, col, row)
{
	if (row ==1)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
												  "select count(*) from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
												  new Array("kode_lokasi","nama"),"where");
	}
	if (row == 2)
	{
		var sql1="select no_kirim,keterangan from dropkrm_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
		var sql2="select count(no_kirim) from dropkrm_m "+
				 this.filterRep.filterStr("periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
		this.filterRep.ListDataSGFilter(this, "Data Droping Kirim",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_kirim","keterangan"),"and");
	}
};
window.app_saku_kb_report_flDropingPosisi.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("3","123","123"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(0,2,2));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("3","3","123","123"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(0,2,2));
	}
	if (row == 0)
	{
		this.standar.isiItemsWithPeriode(this.sg1.columns.get(2).pickList);
	}
};
window.app_saku_kb_report_flDropingPosisi.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._periode));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Bukti","All"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_kirim",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select a.no_kirim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,b.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas "+
						"from dropkrm_m a "+
						"left join ver_d b on a.no_kirim=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
						"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
						"left join kas_d d on a.no_kirim=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
						"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
						"left join droptrm_m f on a.no_kirim=f.no_kirim and a.kode_lokasi=f.lok_asal "+this.filter+" order by a.no_kirim";
			this.scriptSqlCount =   "select count(a.no_kirim) "+
									"from dropkrm_m a "+
									"left join ver_d b on a.no_kirim=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
									"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
									"left join kas_d d on a.no_kirim=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
									"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
									"left join droptrm_m f on a.no_kirim=f.no_kirim and a.kode_lokasi=f.lok_asal "+this.filter;
			
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			title.add("No Kirim");width.add(90);fieldType.add("S");		
			title.add("Tgl Kirim");width.add(60);fieldType.add("D");	
			title.add("Keterangan");width.add(200);fieldType.add("S");		
			title.add("Nilai");width.add(90);fieldType.add("N");	
			title.add("No Ver");width.add(90);fieldType.add("S");	
			title.add("Tgl Ver");width.add(60);fieldType.add("D");	
			title.add("No Kas");width.add(90);fieldType.add("S");	
			title.add("Tgl Kas");width.add(60);fieldType.add("D");	
			title.add("No Terima");width.add(90);fieldType.add("S");	
			title.add("Tgl Terima");width.add(60);fieldType.add("D");	
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
		alert("[app_saku_kb_report_flDropingPosisi]::mainButtonClick:"+e);
	}
};
window.app_saku_kb_report_flDropingPosisi.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_saku_kb_report_flDropingPosisi.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_saku_kb_report_flDropingPosisi.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI DROPING KIRIM<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_kb_report_flDropingPosisi.prototype.doCloseReportClick = function(sender)
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
window.app_saku_kb_report_flDropingPosisi.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_kb_report_flDropingPosisi.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};