window.app_saku_ar_report_flPembayaran = function(owner)
{
	if (owner)
	{
		window.app_saku_ar_report_flPembayaran.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_ar_report_flPembayaran";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Pembayaran", 2);

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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","123","13","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,2]);
	
	uses("util_gridLib;util_standar");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);	
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No Kontrak","All",""]);	
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Pembayaran","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_ar_report_flPembayaran.extend(window.portalui_childForm);
window.app_saku_ar_report_flPembayaran.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{				
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_cust,nama from cust "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from cust "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_cust","nama"],"and",["Kode Customer","Nama"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Kontrak",this.sg1, this.sg1.row, this.sg1.col,
									"select no_kontrak,keterangan from ar_kontrak "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from ar_kontrak "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["no_kontrak","keterangan"],"and",["No Kontrak","Keterangan"]);
	}
	if (row == 4)
	{
		this.standar.ListDataSGFilter2(this, "Data Pembayaran",this.sg1, this.sg1.row, this.sg1.col,
									"select a.no_bukti,a.keterangan from arbyr_m a inner join ar_inv b on a.ref1 = b.no_invoice and a.kode_lokasi = a.kode_lokasi "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
										this.filterRep.filterStr("b.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
									"select count(*)from arbyr_m a inner join ar_inv b on a.ref1 = b.no_invoice and a.kode_lokasi = a.kode_lokasi "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
										this.filterRep.filterStr("b.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
									["a.no_bukti","a.keterangan"],"and",["No Pembayaran","Keterangan"]);
	}
};
window.app_saku_ar_report_flPembayaran.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","23","13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,2]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","23","13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,2]);
	}
	if (row == 1)
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
window.app_saku_ar_report_flPembayaran.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);	
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);	
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No Kontrak","All",""]);	
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Pembayaran","All",""]);
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("c.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.no_bukti",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			var result  = new portalui_arrayMap();			
			var sql = "select a.no_bukti, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.kode_cust, b.nama, a.ref1 as no_invoice, c.no_kontrak, a.nilai , a.nilai_pph "+
					"from arbyr_m a inner join cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
					"	inner join ar_inv d on d.no_invoice = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
					"	inner join ar_kontrak c on c.no_kontrak = d.no_kontrak and c.kode_lokasi =  a.kode_lokasi "+
					this.filter+
					"order by a.no_bukti";
			this.scriptSqlCount = "select count(*) "+
					"from arbyr_m a inner join cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
					"	inner join ar_inv d on d.no_invoice = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
					"	inner join ar_kontrak c on c.no_kontrak = d.no_kontrak and c.kode_lokasi =  a.kode_lokasi "+
					this.filter;
			var title = new server_util_arrayList();			
			title.add("No Bukti");title.add("Tanggal");title.add("Keterangan");title.add("Kode Cust");
			title.add("Nama Customer");title.add("No Invoice");title.add("No Kontrak");title.add("Nilai");title.add("Nilai PPh");
			var width = new server_util_arrayList();			
			width.add(100);width.add(80);width.add(250);width.add(150);
			width.add(250);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);
			var fieldType = new server_util_arrayList();			
			fieldType.add("S");fieldType.add("D");fieldType.add("S");fieldType.add("S");
			fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("N");fieldType.add("N");
			this.dbLib.sqlToHtmlA(sql,1,this.pager, title, width, fieldType,true);						
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = undefined;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			//this.previewReport(dthtml);			
		}
    }
	catch(e)
	{
		alert("[app_saku_ar_report_flPembayaran]::mainButtonClick:"+e);
	}
};
window.app_saku_ar_report_flPembayaran.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_ar_report_flPembayaran.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);			
	//this.previewReport(dthtml);			
};
window.app_saku_ar_report_flPembayaran.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN DATA PEMBAYARAN</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_ar_report_flPembayaran.prototype.doCloseReportClick = function(sender)
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
		html.add("Pembayaran");				
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
window.app_saku_ar_report_flPembayaran.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_ar_report_flPembayaran.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};