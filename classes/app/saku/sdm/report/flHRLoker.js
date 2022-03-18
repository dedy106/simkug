window.app_saku_sdm_report_flHRLoker = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_report_flHRLoker.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_sdm_report_flHRLoker";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Lokasi Kerja", 2);

		uses("portalui_panel");
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
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
			
			this.sg1.setRowCount(2);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1),new  Array("13","13"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1),new  Array(2,2));
	
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
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));		
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Lokasi Kerja","All",""));
	this.pager = 30;
}
window.app_saku_sdm_report_flHRLoker.extend(window.portalui_childForm);

window.app_saku_sdm_report_flHRLoker.prototype.doEllipseClick= function(sender, col, row)
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
			this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_loker,nama,kode_lokasi from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													  "select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													  new Array("kode_loker","nama"),"where",new Array("Kode","Nama","Lokasi"));
		}
}

window.app_saku_sdm_report_flHRLoker.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new Array("13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new  Array(2,2));
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new Array("3","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new  Array(3,2));
	}
	
}

window.app_saku_sdm_report_flHRLoker.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));		
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Lokasi Kerja","All",""));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("l.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("p.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			var result  = new portalui_arrayMap();
			var sql = "select p.kode_loker,p.kode_lokasi,fn_spasi(p.nama,p.level_spasi), p.initial,p.tipe,p.kode_induk,p.alamat,p.kota,p.propinsi,p.kode_pos,p.telephone "+
						"from hr_loker p inner join lokasi l on p.kode_lokasi=l.kode_lokasi "+this.filter+
						"order by p.kode_lokasi,p.kode_loker ";
			this.scriptSqlCount = "select count(*) "+
							"from hr_loker p inner join lokasi l on p.kode_lokasi=l.kode_lokasi "+this.filter;
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();

			title.add("Kode");width.add(50);fieldType.add("S");			
			title.add("Lokasi");width.add(50);fieldType.add("S");
			title.add("Nama");width.add(200);fieldType.add("S");
			title.add("Initial");width.add(100);fieldType.add("S");
			title.add("Tipe");width.add(100);fieldType.add("S");
			title.add("Kode Induk");width.add(50);fieldType.add("S");			
			title.add("Alamat");width.add(200);fieldType.add("S");
			title.add("kota");width.add(100);fieldType.add("S");
			title.add("Provinsi");width.add(100);fieldType.add("S");
			title.add("Kode Pos");width.add(80);fieldType.add("S");
			title.add("Telepon");width.add(100);fieldType.add("S");			
	
			var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,false);	

			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
		}
    }
	catch(e)
	{
		alert("[app_saku_sdm_report_flHRLoker]::mainButtonClick:"+e);
	}
}

window.app_saku_sdm_report_flHRLoker.prototype.doRequestReady = function(sender, methodName, result)
{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
				break;
			
		}
}
window.app_saku_sdm_report_flHRLoker.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
}

window.app_saku_sdm_report_flHRLoker.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN LOKASI KERJA<br>";
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
}

window.app_saku_sdm_report_flHRLoker.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
	  this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("Loker");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
      var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("Loker");				
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
}

window.app_saku_sdm_report_flHRLoker.prototype.sg1onChange = function(sender, col , row)
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
