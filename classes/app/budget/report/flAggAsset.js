window.app_budget_report_flAggAsset = function(owner)
{
	if (owner)
	{
		window.app_budget_report_flAggAsset.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggAsset";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Daftar Aktiva Tetap",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,722,200],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,720,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
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
	
	if (this.app._lokasi != "00") {
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun_agg) as periode from agg_fa_asset where kode_lokasi='"+this.app._lokasi+"'");
	}
	else {
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2,3), new Array("Kode Lokasi","Range","01","99"));
		this.tahun="2011";
	}
	
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Asset","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Asset","=","T-Tambahan"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Asset","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode RKA","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Kode Bidang","All",""));
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
window.app_budget_report_flAggAsset.extend(window.portalui_childForm);
window.app_budget_report_flAggAsset.prototype.doEllipseClick= function(sender, col, row)
{
	
		if (row == 0)
		{
			if (this.app._lokasi != "00")
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
			else
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi ",
											"select count(kode_lokasi) from lokasi",
											["kode_lokasi","nama"],"and",["Kode","Nama"]);

		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col,
												"select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												"select count(a.kode_klpfa) from (select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+") a",
												["a.kode_klpfa","a.nama"],"and",["Kode","Nama"]);
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Asset",this.sg1, this.sg1.row, this.sg1.col,
												"select b.no_fa,b.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("b.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												"select count(a.kode_klpfa) from (select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("b.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+") a",
												["b.no_fa","b.nama"],"and",["Kode","Nama"]);
		}
	if (row == 5)
	{
		this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_akun, nama from agg_masakun  where kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
												  ["kode_akun","nama"],"and",["Kode","Nama"]);
	}
	if (row == 6)
	{
		this.filterRep.ListDataSGFilter(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_rka, nama from agg_rka  ",
												  "select count(kode_rka) from agg_rka   ",
												  ["kode_rka","nama"],"where",["Kode","Nama"]);
	}	
	if (row === 7)
	{
		this.standar.ListDataSGFilter2(this, "Data Bidang",this.sg1, this.sg1.row, this.sg1.col,
								"select kode_bidang,nama from agg_bidang ",
								"select count(*) from agg_bidang ",
								["kode_bidang","nama"],"where",["Kode","Nama"]);
	}
};
window.app_budget_report_flAggAsset.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","3","123","13","123","13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,0,2,0,2,2,2,2]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["3","3","123","13","123","13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,0,2,0,2,2,2,2]);
	}
	if (row == 1)
	{
		this.dbLib.setItemsFromSQL("select distinct tahun from agg_fa_asset a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
	}
	if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("T-Tambahan","E-Eksisting"));
	}	
	
};
window.app_budget_report_flAggAsset.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Asset","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Asset","All",""));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Asset","All",""));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Akun","All",""));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode RKA","All",""));
			this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Kode Bidang","All",""));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
		
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.tahun_agg",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("a.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("a.kode_status",this.sg1.getCell(1,3),this.sg1.getCell(2,3).substr(0,1),this.sg1.getCell(3,3).substr(0,1),"and")+
						  this.filterRep.filterStr("a.no_fa",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
						  this.filterRep.filterStr("a.kode_drk",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
						  this.filterRep.filterStr("f.kode_bidang",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and");
			this.tahun=this.sg1.getCell(2,1);	  
			this.showFilter = this.filterRep.showFilter(this.sg1);
			
			
			this.sql="select b.nama,a.no_fa,a.nama,a.kode_akun,c.nama as nama_akun,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk, "+
					"	  date_format(a.tgl_perolehan,'%d/%m/%Y') as tanggal,b.umur/12 as umur,b.persen,a.nilai,e.kode_klpfa,e.nama as nama_klpfa,case when a.kode_status='T' then 'Baru' else 'Eksisting' end as kode_status,a.jumlah "+	
					"from agg_fa_asset a "+
					"inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun  "+
					"inner join agg_fa_klp e on a.kode_klpfa=e.kode_klpfa  "+
					"inner join agg_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+ 
					"left join agg_rka d on a.kode_drk=d.kode_rka  "+
					"inner join agg_pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter+
					"order by a.kode_klpakun,a.no_fa";	
			this.scriptSqlCount ="select count(a.no_fa) "+	
					"from agg_fa_asset a "+
					"inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun  "+
					"inner join agg_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+ 
					"left join agg_rka d on a.kode_drk=d.kode_rka  "+
					"inner join agg_pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter;	
			
			var title = new server_util_arrayList();			
			var width = new server_util_arrayList();
			var fieldType = new server_util_arrayList();
			title.add("Kelompok Asset");width.add(150);fieldType.add("S");
			title.add("No Asset");width.add(60);fieldType.add("S");
			title.add("Nama");width.add(150);fieldType.add("S");
			title.add("Kode Akun");width.add(60);fieldType.add("S");
			title.add("Nama Akun");width.add(150);fieldType.add("S");
			title.add("Kode PP");width.add(50);fieldType.add("S");
			title.add("Nama PP");width.add(150);fieldType.add("S");
			title.add("Kode RKA");width.add(50);fieldType.add("S");
			title.add("Nama RKA");width.add(150);fieldType.add("S");
			title.add("Tgl Perolehan");width.add(60);fieldType.add("S");
			title.add("Umur");width.add(40);fieldType.add("N");
			title.add("Persen");width.add(40);fieldType.add("N");
			title.add("Nilai Perolehan");width.add(80);fieldType.add("N");
			title.add("Klp Aktap");width.add(60);fieldType.add("S");
			title.add("Nama Kelompok");width.add(150);fieldType.add("S");
			title.add("Jenis Agg");width.add(60);fieldType.add("S");
			title.add("Jumlah");width.add(60);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","Y","N","N","N","Y"]});
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
		alert("[app_budget_report_flAggAsset]::mainButtonClick:"+e);
	}
};
window.app_budget_report_flAggAsset.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_budget_report_flAggAsset.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_budget_report_flAggAsset.prototype.doConfirmClick = function(sender){
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
window.app_budget_report_flAggAsset.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_budget_report_flAggAsset.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Daftar Aktiva Tetap<br>Tahun "+this.sg1.getCell(2,1)+"<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_budget_report_flAggAsset.prototype.doCloseReportClick = function(sender)
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
window.app_budget_report_flAggAsset.prototype.sg1onChange = function(sender, col , row)
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
window.app_budget_report_flAggAsset.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};