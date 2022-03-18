window.app_eclaim_report_flSebab = function(owner)
{
	if (owner)
	{
		window.app_eclaim_report_flSebab.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim_report_flSebab";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Penyebab Kerugian",2);
		uses("portalui_panel");
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(100);
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
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tertanggung","=",this.app._kodeTtg));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Jenis Asuransi","All"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Kode Obyek","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_eclaim_report_flSebab.extend(window.portalui_childForm);
window.app_eclaim_report_flSebab.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Tertanggung",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_ttg,nama from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_ttg) from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
	}
	if (row == 1)
	{
		this.filterRep.ListDataSGFilter(this, "Data Asuransi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_asuransi,nama from eclaim_asuransi where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_asuransi) from eclaim_asuransi where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_asuransi","nama"),"and",new Array("kode","nama"));
	}
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_sebab,nama from eclaim_sebab where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_sebab) from eclaim_sebab where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
	}	
};
window.app_eclaim_report_flSebab.prototype.doSelectCell = function(sender, col, row)
{
		this.sg1.columns.get(2).setReadOnly(false);
		this.sg1.columns.get(2).setReadOnly(true);
		this.filterRep.setSGFilterRowTipe(this.sg1, row, [0],["123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0],[2]);
		
};
window.app_eclaim_report_flSebab.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Tertanggung","All"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter = this.filterRep.filterStr("a.kode_ttg",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
						this.filterRep.filterStr("a.kode_asuransi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
						this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
						this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select c.nama as nama_ttg,b.nama as nama_asuransi,a.kode_sebab,a.nama "+
						"from eclaim_sebab a "+
						"inner join eclaim_asuransi b on a.kode_asuransi=b.kode_asuransi "+
						"inner join eclaim_ttg c on a.kode_ttg=c.kode_ttg "+this.filter+
						" order by a.kode_sebab ";
			this.scriptSqlCount =  "select count(a.kode_sebab) "+
						"from eclaim_sebab a "+
						"inner join eclaim_asuransi b on a.kode_asuransi=b.kode_asuransi "+
						"inner join eclaim_ttg c on a.kode_ttg=c.kode_ttg "+this.filter;
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			title.add("Nama Tertanggung");width.add(200);fieldType.add("S");		
			title.add("Nama Asuransi");width.add(200);fieldType.add("S");		
			title.add("Kode Obyek");width.add(60);fieldType.add("S");		
			title.add("Nama Obyek ");width.add(250);fieldType.add("S");
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
		alert("[app_eclaim_report_flSebab]::mainButtonClick:"+e);
	}
};
window.app_eclaim_report_flSebab.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
			break;
		
	}
};
window.app_eclaim_report_flSebab.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_eclaim_report_flSebab.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN PENYEBAB KERUGIAN <br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_eclaim_report_flSebab.prototype.doCloseReportClick = function(sender)
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
window.app_eclaim_report_flSebab.prototype.sg1onChange = function(sender, col , row)
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
window.app_eclaim_report_flSebab.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};