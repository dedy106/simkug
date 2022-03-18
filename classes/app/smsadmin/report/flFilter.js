window.app_smsadmin_report_flFilter = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_report_flFilter.prototype.parent.constructor.call(this,owner);
		this.className = "app_smsadmin_report_flFilter";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Filter SMS", 2);

		uses("controls_panel");
		this.p1 = new controls_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("controls_saiSG");
		this.sg1 = new controls_saiSG(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(150);
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
			var val = new controls_arrayMap();
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
		uses("controls_reportViewer");
		this.viewer = new controls_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		this.tanda="All";
		this.lokasi="";
	}
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi",this.tanda,this.lokasi]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Filter","All",""]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	;	
}
window.app_smsadmin_report_flFilter.extend(window.controls_childForm);


window.app_smsadmin_report_flFilter.prototype.doEllipseClick= function(sender, col, row)
{
		if (row == 0)
		{				
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi ",
													  "select count(*) from lokasi ",
													  ["kode_lokasi","nama"],"where",["Kode Lokasi","Nama"]);
		}
		if (row == 1)
		{
			this.standar.ListDataSGFilter2(this, "Data Filter",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_filter, nama from sms_filter "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													"select count(*) from sms_filter "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													["kode_filter","nama"],"and",["Kode Filter","Nama"]);
		}
		
}

window.app_smsadmin_report_flFilter.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["13","23"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[2,2]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["3","23"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[3,2]);
	}	
}

window.app_smsadmin_report_flFilter.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi",this.tanda,this.lokasi]);	
			this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Filter","All",""]);	
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_filter",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			var result  = new controls_arrayMap();			
			var sql = "select a.kode_filter, a.nama, a.filtertext, a.kode_folder , b.nama as nmfolder "+
					"from sms_filter a left join sms_folder b on b.kode_folder = a.kode_folder and b.kode_lokasi = a.kode_lokasi "+
					this.filter;
			this.scriptSqlCount = "select count(*) "+
					"from sms_filter a  left join sms_folder b on b.kode_folder = a.kode_folder and b.kode_lokasi = a.kode_lokasi "+
					this.filter;			
			var title = new server_util_arrayList();			
			title.add("Kode");title.add("Deskripsi");title.add("Filter Text");title.add("Default Folder");title.add("Nama Folder");
			var width = new server_util_arrayList();			
			width.add(150);width.add(380);width.add(200);width.add(80);width.add(180);
			var fieldType = new server_util_arrayList();			
			fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");
			var groupBy = undefined;			
			this.dbLib.sqlToHtmlA(sql,1,this.pager, title, width, fieldType,false,groupBy);			

			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = groupBy;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			//this.previewReport(dthtml);			
		}
    }
	catch(e)
	{
		alert("[app_smsadmin_report_flFilter]::mainButtonClick:"+e);
	}
}

window.app_smsadmin_report_flFilter.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.report){
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);			
					break;
				
			}
	}
	if (sender == this.dbLib){
		if (methodName == "sqlToHtml"){	
			if (result == undefined)
				page.alert(this,"Permintaan data gagal","Mungkin data terlalu besar. Gunakan <i>Pagi</i>ng saja.");
			else this.previewReport(result);
		}
	}
}
window.app_smsadmin_report_flFilter.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false,this.groupBy);			
	//this.previewReport(dthtml);			
}
window.app_smsadmin_report_flFilter.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>DAFTAR FILTER SMS</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
}
window.app_smsadmin_report_flFilter.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false,this.groupBy);			
	  //this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("Tagihan");				
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
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
		//this.previewReport(dthtml);		
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

window.app_smsadmin_report_flFilter.prototype.sg1onChange = function(sender, col , row)
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
}
window.app_smsadmin_report_flFilter.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
}