window.app_eclaim_report_flBayar = function(owner)
{
	if (owner)
	{
		window.app_eclaim_report_flBayar.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim_report_flBayar";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Pembayaran",2);
		uses("portalui_panel");
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
		this.sg1.setRowCount(4);
		
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
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Periode","All"));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tertanggung","=",this.app._kodeTtg));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Klaim","All"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Adjust","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("No Bayar","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
};
window.app_eclaim_report_flBayar.extend(window.portalui_childForm);
window.app_eclaim_report_flBayar.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Tertanggung",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_ttg,nama from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_ttg) from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Klaim",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_klaim,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_klaim where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_klaim) from eclaim_klaim  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_klaim","no_dokumen","tanggal"),"and",new Array("no klaim","no dokumen","tanggal"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Adjustment",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_adjust,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_adjust where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_adjust) from eclaim_adjust  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_adjust","no_dokumen","tanggal"),"and",new Array("no adjust","no dokumen","tanggal"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Pembayaran",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_bayar,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_bayar where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_bayar) from eclaim_bayar  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_bayar","no_dokumen","tanggal"),"and",new Array("no bayar","no dokumen","tanggal"));
		}
};
window.app_eclaim_report_flBayar.prototype.doSelectCell = function(sender, col, row)
{
	this.sg1.columns.get(2).setReadOnly(false);
		this.sg1.columns.get(2).setReadOnly(true);
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("123","3","123","123","123","123"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
		
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from eclaim_bayar where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
};
window.app_eclaim_report_flBayar.prototype.mainButtonClick = function(sender)
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
			var user_lok="";
			if (this.app._userStatus=="U")
			{
				user_lok=" and b.kode_lok='"+this.app._kodeLok+"'";
			}
			this.filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and")+
				  this.filterRep.filterStr("b.kode_ttg",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				  this.filterRep.filterStr("a.no_adjust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				  this.filterRep.filterStr("a.no_bayar",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+user_lok;
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.sql =  "select a.no_bayar,a.no_klaim,c.nama as nama_ttg,a.no_adjust,date_format(a.tanggal,'%d/%m/%Y') as tanggal, "+
						"a.no_dokumen,a.keterangan,b.kode_curr,b.nilai,d.nilai as nilai_adjust,d.nilai_dp,a.nilai as nilai_bayar	   "+                         
						"from eclaim_bayar a "+
						"inner join eclaim_klaim b on a.no_klaim=b.no_klaim "+
						"inner join eclaim_ttg c on b.kode_ttg=c.kode_ttg "+
						"inner join eclaim_adjust d on a.no_adjust=d.no_adjust "+
						this.filter+" order by a.no_adjust ";
			this.scriptSqlCount =   "select count(a.no_bayar)	   "+                         
						"from eclaim_bayar a "+
						"inner join eclaim_klaim b on a.no_klaim=b.no_klaim "+
						"inner join eclaim_ttg c on b.kode_ttg=c.kode_ttg "+
						"inner join eclaim_adjust d on a.no_adjust=d.no_adjust "+this.filter;
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			title.add("No Bayar");width.add(100);fieldType.add("S");		
			title.add("No Klaim");width.add(100);fieldType.add("S");		
			title.add("Tertanggung");width.add(150);fieldType.add("S");		
			title.add("No Adjust");width.add(150);fieldType.add("S");		
			title.add("Tgl Bayar ");width.add(60);fieldType.add("D");	
			title.add("Dokumen");width.add(100);fieldType.add("S");		
			title.add("Keterangan");width.add(150);fieldType.add("S");	
			title.add("Curr");width.add(60);fieldType.add("S");	
			title.add("Nilai Estimasi");width.add(60);fieldType.add("N");	
			title.add("Nilai Adjust");width.add(60);fieldType.add("N");	
			title.add("Nilai Adv Pay");width.add(60);fieldType.add("N");	
			title.add("Nilai Bayar");width.add(60);fieldType.add("N");	
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
		alert("[app_eclaim_report_flBayar]::mainButtonClick:"+e);
	}
};
window.app_eclaim_report_flBayar.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.report){
		/*kirim mail*/
		this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
		switch (methodName)
		{
			case "preview" :					
				this.viewer.preview(result);			
				this.viewer.hideLoading();
				break;
			
		}/*kirim mail*/
	}else if (sender === this.mail){
		if (methodName === "sendMail"){
			system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
		}
	}
};
window.app_eclaim_report_flBayar.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_eclaim_report_flBayar.prototype.doConfirmClick = function(sender){
	try{
		if (sender === sender.owner.bConfirm){
			var to = sender.owner.getEmail();
			if (to !== ""){
				sender.owner.free();
				var d = new Date();
				var subject = "Laporan Pembayaran "+d.toLocaleString();
				var pesan = this.allHtml;
				this.mail.send(undefined,to,subject,pesan);
			}else{
				systemAPI.alert("Alamat email belum diisi!");
			}
		}else if (sender === sender.owner.bCancel){
			sender.owner.free();
		}
	}catch(e){
		alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
	}
};
window.app_eclaim_report_flBayar.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_eclaim_report_flBayar.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN PEMBAYARAN<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_eclaim_report_flBayar.prototype.doCloseReportClick = function(sender)
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
      break;/*kirim mail*/
	case "MailBtn" :
		sender.owner = new portalui_ConfirmMail(this);
		sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
		sender.owner.setCaption(sender.owner.title);
		sender.owner.setBorder(3);
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
window.app_eclaim_report_flBayar.prototype.sg1onChange = function(sender, col , row)
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
window.app_eclaim_report_flBayar.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};