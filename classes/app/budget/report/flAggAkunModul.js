window.app_budget_report_flAggAkunModul = function(owner)
{
	
	if (owner)
	{
		window.app_budget_report_flAggAkunModul.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggAkunModul";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi RKA Per Akun Modul", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
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
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Anggaran","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Modul ","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Bidang","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Jenis Laporan","=","Akun"));
	this.doSelectCell(this.sg1,2,7);
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
window.app_budget_report_flAggAkunModul.extend(window.portalui_childForm);
window.app_budget_report_flAggAkunModul.prototype.doEllipseClick= function(sender, col, row)
{
	
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi ",
													  "select count(kode_lokasi) from lokasi ",
													  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Kode Anggaran",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_neraca, nama from agg_neracagar where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting' ",
													  "select count(kode_neraca) from agg_neracagar where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting' ",
													  ["kode_neraca","nama"],"and",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from agg_masakun a "+
													  "inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													  this.filterRep.filterStr("b.kode_neraca",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
													  "select count(a.kode_akun) from agg_masakun a "+
													  "inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
													  this.filterRep.filterStr("b.kode_neraca",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
													  ["a.kode_akun","a.nama"],"and",["Kode","Nama"]);
		}
	if (row === 5)
	{
		this.standar.ListDataSGFilter2(this, "Data Bidang",this.sg1, this.sg1.row, this.sg1.col,
								"select kode_bidang,nama from agg_bidang ",
								"select count(*) from agg_bidang ",
								["kode_bidang","nama"],"where",["Kode","Nama"]);
	}
};
window.app_budget_report_flAggAkunModul.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A" || this.app._lokasi == "00")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["123","3","123","123","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,0,2,0]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","3","123","123","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[3,0,2,2,2,2,0]);
	}
	if (row == 1)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct tahun from agg_d order by tahun",[this.sg1.columns.get(2).pickList]);
	}
	
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct modul from agg_d order by modul",[this.sg1.columns.get(2).pickList]);
	}
	if (row == 6)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Akun","Akun Bidang","Akun Bidang Bukti"));
	}
};
window.app_budget_report_flAggAkunModul.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Anggaran","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Modul ","All",""));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Bidang ","All",""));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Jenis Laporan","=","Akun"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("c.kode_neraca",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				  this.filterRep.filterStr("a.modul",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
				  this.filterRep.filterStr("d.kode_bidang",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				  
			this.showFilter = this.filterRep.showFilter(this.sg1);
			var result  = new portalui_arrayMap();
			if (this.sg1.getCell(2,6)=="Akun")
			{
				var sql="select a.kode_akun,b.nama,a.modul,sum(a.nilai) as nilai "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+this.filter+
					"group by a.kode_akun,a.modul,b.nama "+
					"order by a.modul,a.kode_akun ";
				
				this.scriptSqlCount = "select count(d.kode_akun) from (select a.kode_akun,a.modul,b.nama "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+this.filter+
					"group by a.kode_akun,a.modul,b.nama) d ";
					
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Modul","Nilai"]});
					this.widthTable = new server_util_arrayList({items:[80,300,60,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","N"]});
					this.summary = new server_util_arrayList({items:["N","N","N","Y"]});
			}
			if (this.sg1.getCell(2,6)=="Akun Bidang")
			{
				var sql="select a.kode_akun,b.nama,d.kode_bidang,e.nama as nama_bidang,a.modul,sum(a.nilai) as nilai "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					"inner join agg_bidang e on d.kode_bidang=e.kode_bidang "+this.filter+
					"group by a.kode_akun,d.kode_bidang,a.modul,b.nama,e.nama "+
					"order by a.modul,a.kode_akun,d.kode_bidang ";
				
				this.scriptSqlCount = "select count(d.kode_akun) from (select a.kode_akun,a.modul,b.nama "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					"inner join agg_bidang e on d.kode_bidang=e.kode_bidang "+this.filter+
					"group by a.kode_akun,d.kode_bidang,a.modul,b.nama,e.nama) d ";
					
				this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode Bidang","Nama Bidang","Modul","Nilai"]});
				this.widthTable = new server_util_arrayList({items:[80,300,40,150,60,80]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N"]});
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","Y"]});
			}
			if (this.sg1.getCell(2,6)=="Akun Bidang Bukti")
			{
				var sql="select a.kode_akun,b.nama,d.kode_bidang,e.nama as nama_bidang,a.modul,a.no_bukti,sum(a.nilai) as nilai "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					"inner join agg_bidang e on d.kode_bidang=e.kode_bidang "+this.filter+
					"group by a.kode_akun,d.kode_bidang,a.modul,a.no_bukti,b.nama,e.nama "+
					"order by a.modul,a.kode_akun,d.kode_bidang,a.no_bukti ";
				
				this.scriptSqlCount = "select count(d.kode_akun) from (select a.kode_akun,a.modul,a.no_bukti,b.nama "+
					"from agg_d a "+
					"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_relakungar c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					"inner join agg_bidang e on d.kode_bidang=e.kode_bidang "+this.filter+
					"group by a.kode_akun,d.kode_bidang,a.modul,a.no_bukti,b.nama,e.nama) d ";
					
				this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode Bidang","Nama Bidang","Modul","No Bukti","Nilai"]});
				this.widthTable = new server_util_arrayList({items:[80,300,40,150,60,100,80]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N"]});
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","Y"]});
			}
			
			var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
			
			this.sqlScript = sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
		}
    }catch(e)
	{
		alert("[app_budget_report_flAggAkunModul]::mainButtonClick:"+e);
	}
};
window.app_budget_report_flAggAkunModul.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_budget_report_flAggAkunModul.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_budget_report_flAggAkunModul.prototype.doConfirmClick = function(sender){
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
window.app_budget_report_flAggAkunModul.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_budget_report_flAggAkunModul.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Rekapitulasi RKA Per Akun<br>TAHUN "+this.sg1.getCell(2,1);			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_budget_report_flAggAkunModul.prototype.doCloseReportClick = function(sender)
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
window.app_budget_report_flAggAkunModul.prototype.sg1onChange = function(sender, col , row)
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
window.app_budget_report_flAggAkunModul.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};