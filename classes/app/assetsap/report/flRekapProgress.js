window.app_assetsap_report_flRekapProgress = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flRekapProgress.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flRekapProgress";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Rekap Progress Inventarisasi",2);
		uses("panel");
		this.p1 = new panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("saiGrid");
		this.sg1 = new saiGrid(this.p1);
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
		var val = new arrayMap();
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
		
		uses("reportViewer");
		this.viewer = new reportViewer(this);
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
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Unit Bisnis","All",""));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Bisnis Area","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jenis Rekap","=","ALL"));
	
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
};
window.app_assetsap_report_flRekapProgress.extend(window.childForm);
window.app_assetsap_report_flRekapProgress.prototype.doEllipseClick= function(sender, col, row)
{
	
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Unit Bisnis",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS'",
													  "select count(kode_lokfa) from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS'",
													  ["kode_lokfa","nama"],"and",["Kode","Nama"]);
		}
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Bisnis Area",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'BA'",
													  "select count(kode_lokfa) from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'BA' ",
													  ["kode_lokfa","nama"],"and",["Kode","Nama"]);
		}
};
window.app_assetsap_report_flRekapProgress.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["123","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,2,0]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["123","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,2,0]);
	}
	if (row == 2)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("ALL","Bisnis Area"));
	}	
};
window.app_assetsap_report_flRekapProgress.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Unit Bisnis","All",""));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Bisnis Area","All",""));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jenis Rekap","=","ALL"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter = this.filterRep.filterStr("a.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			if (this.sg1.getCell(2,2)=='ALL')
			{
				this.sql =  "select 'Asset SAP' as nama,count(x.no_gabung) as jum "+
						"from amu_asset x "+
						"union "+
						"select 'Inventarisasi' as nama,count(x.no_gabung) as jum "+
						"from amu_kkl_d x "+
						"inner join amu_asset y on x.no_gabung=y.no_gabung "+
						"union "+
						"select 'Rekonsiliasi' as nama,count(x.no_gabung) as jum "+
						"from amu_rekon_d x "+
						"inner join amu_asset y on x.no_gabung=y.no_gabung "+
						"union "+
						"select 'Verifikasi' as nama,count(x.no_gabung) as jum "+
						"from amu_ver_d x "+
						"inner join amu_asset y on x.no_gabung=y.no_gabung ";
				this.scriptSqlCount = "select 1";
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Proses");width.add(150);fieldType.add("S");		
				title.add("Jumlah");width.add(100);fieldType.add("N");
			}
			if (this.sg1.getCell(2,2)=='Bisnis Area')
			{
				this.sql =  "select a.kode_lokfa,a.nama,ifnull(b.jum,0) as jum, "+
						    "ifnull(c.jum,0) as jum1,format((ifnull(c.jum,0)/ifnull(b.jum,0))*100,2) as p1, "+
						    "ifnull(d.jum,0) as jum2,format((ifnull(d.jum,0)/ifnull(b.jum,0))*100,2) as p2, "+
						    "ifnull(e.jum,0) as jum3,format((ifnull(e.jum,0)/ifnull(b.jum,0))*100,2) as p3  "+ 
							"from amu_lokasi a "+
							"left join (select x.kode_lokfa,count(x.no_gabung) as jum "+ 
							"		   from amu_asset x "+ 
							"		   group by x.kode_lokfa)b on a.kode_lokfa=b.kode_lokfa "+ 
							"left join (select y.kode_lokfa,count(x.no_gabung) as jum "+
							"		   from amu_kkl_d x "+
							"		   inner join amu_asset y on x.no_gabung=y.no_gabung "+
							"		   group by y.kode_lokfa)c on a.kode_lokfa=c.kode_lokfa "+
							"left join (select y.kode_lokfa,count(x.no_gabung) as jum "+
							"		   from amu_kkl_d x "+
							"		   inner join amu_asset y on x.no_gabung=y.no_gabung "+ 
							"		   group by y.kode_lokfa)d on a.kode_lokfa=d.kode_lokfa "+ 
							"left join (select y.kode_lokfa,count(x.no_gabung) as jum "+
							"		   from amu_rekon_d x "+
							"		   inner join amu_asset y on x.no_gabung=y.no_gabung "+ 
							"		   group by y.kode_lokfa)e on a.kode_lokfa=e.kode_lokfa "+ 
							"left join (select y.kode_lokfa,count(x.no_gabung) as jum "+ 
							"		   from amu_ver_d x "+
							"		   inner join amu_asset y on x.no_gabung=y.no_gabung "+
							"		   group by y.kode_lokfa)f on a.kode_lokfa=f.kode_lokfa "+   
							"where a.tipe='BA'  ";
				this.scriptSqlCount = "select count(kode_lokfa) from amu_lokasi where tipe='BA'";
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode");width.add(50);fieldType.add("S");	
				title.add("Bisnis Area");width.add(150);fieldType.add("S");
				title.add("Asset SAP");width.add(60);fieldType.add("N");				
				title.add("Inventarisasi");width.add(60);fieldType.add("N");
				title.add("%");width.add(30);fieldType.add("S");
				title.add("Rekonsiliasi");width.add(60);fieldType.add("N");
				title.add("%");width.add(30);fieldType.add("S");
				title.add("Verifikasi");width.add(60);fieldType.add("N");
				title.add("%");width.add(30);fieldType.add("S");
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y"]});
			}
			
			
			
			var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,undefined,this.summary);
			
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
		alert("[app_assetsap_report_flRekapProgress]::mainButtonClick:"+e);
	}
};
window.app_assetsap_report_flRekapProgress.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_assetsap_report_flRekapProgress.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_assetsap_report_flRekapProgress.prototype.doConfirmClick = function(sender){
	try{
		if (sender === sender.owner.bConfirm){
			var to = sender.owner.getEmail();
			if (to !== ""){
				sender.owner.free();
				var d = new Date();
				var subject = "Laporan Rekap Progres Klaim "+d.toLocaleString();
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
window.app_assetsap_report_flRekapProgress.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_assetsap_report_flRekapProgress.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN REKAP LOKASI<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_assetsap_report_flRekapProgress.prototype.doCloseReportClick = function(sender)
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
		sender.owner = new ConfirmMail(this);
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
window.app_assetsap_report_flRekapProgress.prototype.sg1onChange = function(sender, col , row)
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
window.app_assetsap_report_flRekapProgress.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
