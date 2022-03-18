window.app_saku_ar_report_flTagihan = function(owner)
{
	if (owner)
	{
		window.app_saku_ar_report_flTagihan.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_ar_report_flTagihan";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Tagihan", 2);
		
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
			this.sg1.setRowCount(5);
			
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","123","13","123","123"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,2,0,2,2]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kontrak","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Invoice","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_ar_report_flTagihan.extend(window.portalui_childForm);
window.app_saku_ar_report_flTagihan.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{				
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi ",
												  "select count(*) from lokasi ",
												  new Array("kode_lokasi","nama"),"where");
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_cust, nama from cust "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												"select count(*) from cust "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												new Array("kode_cust","nama"),"and",new Array("Kode Customer","Nama"));
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Kontrak",this.sg1, this.sg1.row, this.sg1.col,
												"select no_kontrak, keterangan from ar_kontrak "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												"select count(*) from ar_kontrak "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												new Array("no_kontrak","keterangan"),"and",new Array("No Kontrak","Keterangan"));
	}
	if (row == 4)
	{
		this.standar.ListDataSGFilter2(this, "Data Tagihan",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_invoice, a.keterangan from ar_inv a inner join ar_kontrak b on b.no_kontrak = a.no_kontrak and b.kode_lokasi = a.kode_lokasi "+
													this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+														
													this.filterRep.filterStr("b.kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("a.periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												"select count(*) from ar_inv a inner join ar_kontrak b on b.no_kontrak = a.no_kontrak and b.kode_lokasi = a.kode_lokasi "+
													this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													this.filterRep.filterStr("b.kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("a.periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												new Array("a.no_invoice","a.keterangan"),"and",new Array("No Invoice","Keterangan"));
	}
};
window.app_saku_ar_report_flTagihan.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","23","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,0,2,2]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","23","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,2,0,2,2]);
	}
	if (row == 2)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}
		else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}	
};
window.app_saku_ar_report_flTagihan.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kontrak","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Invoice","All",""]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.no_invoice",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			var result  = new portalui_arrayMap();			
			var sql = "select a.no_invoice, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.no_kontrak , d.kode_cust, b.nama, a.nilai, a.nilai_ppn, c.nilai_bayar as total_bayar, (a.nilai + a.nilai_ppn) - "+ifNull(this.app._dbEng)+"(c.nilai_bayar,0) as saldo "+
					"from ar_inv a "+
					"	inner join ar_kontrak d on d.no_kontrak = a.no_kontrak and d.kode_lokasi = a.kode_lokasi "+
					" 	inner join cust b on b.kode_cust = d.kode_cust and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join "+
					"			(select ref1, sum(nilai + nilai_pph) as nilai_bayar from arbyr_m "+
								this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+ " group by ref1) c on c.ref1 = a.no_invoice "+
					this.filter+
					"order by a.no_invoice";
			this.scriptSqlCount = "select count(*) as tot from ar_inv a "+
					"	inner join ar_kontrak d on d.no_kontrak = a.no_kontrak and d.kode_lokasi = a.kode_lokasi "+
					" 	inner join cust b on b.kode_cust = d.kode_cust and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join "+
					"			(select ref1, sum(nilai + nilai_pph) as nilai_bayar from arbyr_m "+
								this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+ " group by ref1) c on c.ref1 = a.no_invoice "+
					this.filter;			
			var title = new server_util_arrayList();			
			title.add("No Invoice");title.add("Tanggal");title.add("Keterangan");title.add("No Kontrak");title.add("Kode Cust");
			title.add("Nama Customer");title.add("Nilai Tagihan");title.add("Nilai PPN");title.add("Nilai Terbayar");title.add("Saldo");
			var width = new server_util_arrayList();			
			width.add(150);width.add(80);width.add(280);width.add(150);width.add(100);
			width.add(250);width.add(100);width.add(80);width.add(150);width.add(150);
			var fieldType = new server_util_arrayList();			
			fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");				
			fieldType.add("S");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");				
			var groupBy = undefined;			
			this.dbLib.sqlToHtmlA(sql,1,this.pager, title, width, fieldType,true,groupBy);			

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
    }catch(e)
	{
		alert("[app_saku_ar_report_flTagihan]::mainButtonClick:"+e);
	}
};
window.app_saku_ar_report_flTagihan.prototype.doRequestReady = function(sender, methodName, result)
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
				system.alert(this,"Permintaan data gagal","Mungkin data terlalu besar. Gunakan <i>Pagi</i>ng saja.");
			else this.previewReport(result);
		}
	}
};
window.app_saku_ar_report_flTagihan.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);			
	//this.previewReport(dthtml);			
};
window.app_saku_ar_report_flTagihan.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN DATA TAGIHAN</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_ar_report_flTagihan.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy);			
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
};
window.app_saku_ar_report_flTagihan.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_ar_report_flTagihan.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};