window.app_patra_report_flSaldoPiutang = function(owner)
{
	if (owner)
	{
		window.app_patra_report_flSaldoPiutang.prototype.parent.constructor.call(this,owner);
		this.className = "app_patra_report_flSaldoPiutang";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo Piutang", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from patra_ar_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","<=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Cust","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Cust","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis","=","Customer"));
	
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.doSelectCell(this.sg1,2,4);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
};
window.app_patra_report_flSaldoPiutang.extend(window.portalui_childForm);
window.app_patra_report_flSaldoPiutang.prototype.doEllipseClick= function(sender, col, row)
{
		if (row == 0){
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama  from lokasi where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Kelompok Cust",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_klpcust, nama  from patra_klpcust where kode_lokasi='"+this.app._lokasi+"'",
												"select count(kode_klpcust) from patra_klpcust where kode_lokasi='"+this.app._lokasi+"'",
												["kode_klpcust","nama"],"where",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Customer",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_cust, nama from patra_cust where kode_lokasi='"+this.app._lokasi+"'",
												"select count(kode_cust) from patra_cust where kode_lokasi='"+this.app._lokasi+"'",
												["kode_cust","nama"],"where",["Kode","Nama"]);
		}
};
window.app_patra_report_flSaldoPiutang.prototype.doSelectCell = function(sender, col, row)
{
	this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","1236","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,0]);

	if (row == 1){
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from patra_ar_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
	}	
	if (row == 4){
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Customer","Invoice"]);
	}
};
window.app_patra_report_flSaldoPiutang.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Cust","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Customer","All",""));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis","=","Customer"));
			}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
			if (this.sg1.getCell(2,4) == "Customer") {
				this.filter = this.filterRep.filterStr("a.kode_klpcust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where ")+
						  this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and ");

				this.sql =  "select b.nama as nama_klp,a.kode_cust,a.nama as nama_cust,"+
							"isnull(c.nilai_usd,0)-isnull(d.bayar_usd,0) as sawal_usd,"+
							"isnull(c.nilai_idr,0)-isnull(d.bayar_idr,0) as sawal_idr,"+
							"isnull(c.total,0)-isnull(d.bayar_total,0) as sawal,"+
							"isnull(e.nilai_usd,0) as debet_usd,isnull(e.nilai_idr,0) as debet_idr,isnull(e.total,0) as debet,"+
							"isnull(f.bayar_usd,0) as kredit_usd,isnull(f.bayar_idr,0) as kredit_idr,isnull(f.bayar_total,0) as kredit,"+
							"isnull(c.nilai_usd,0)-isnull(d.bayar_usd,0)+isnull(e.nilai_usd,0)-isnull(f.bayar_usd,0) as sakhir_usd,"+ 
							"isnull(c.nilai_idr,0)-isnull(d.bayar_idr,0)+isnull(e.nilai_idr,0)-isnull(f.bayar_idr,0) as sakhir_idr,"+
							"isnull(c.total,0)-isnull(d.bayar_total,0)+isnull(e.total,0)-isnull(f.bayar_total,0) as sakhir "+
							" from patra_cust a "+
							"	 inner join patra_klpcust b on a.kode_klpcust=b.kode_klpcust and a.kode_lokasi=b.kode_lokasi "+
							"	 left join ( "+            
							"		select kode_cust,kode_lokasi, "+
							"			sum(case kode_curr when 'USD' then nilai_curr+ppn_curr else 0 end) as nilai_usd, "+
							"		sum(case kode_curr when 'IDR' then nilai_curr+ppn_curr else 0 end) as nilai_idr, "+
							"			sum((nilai_curr+ppn_curr)*kurs) as total "+
							"			from patra_ar_m where dc ='D' and periode < '"+this.sg1.getCell(2,1)+"' group by kode_cust,kode_lokasi "+
							"	 ) c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							"	 left join ( "+
							"		select kode_cust,kode_lokasi, "+
							"		sum(case kode_curr when 'USD' then nilai_curr+ppn_curr else 0 end) as bayar_usd, "+
							"		sum(case kode_curr when 'IDR' then nilai_curr+ppn_curr else 0 end) as bayar_idr, "+
							"		sum((nilai_curr+ppn_curr)*kurs) as bayar_total "+
							"			from patra_ar_m where dc='C' and periode < '"+this.sg1.getCell(2,1)+"' group by kode_cust,kode_lokasi "+
							"			union "+
							"			select x.kode_cust,x.kode_lokasi, "+
							"		sum(case y.kode_curr when 'USD' then x.nilai_curr else 0 end) as bayar_usd, "+ 
							"		sum(case y.kode_curr when 'IDR' then x.nilai_curr else 0 end) as bayar_idr, "+
							"			sum(x.nilai_curr*y.kurs) as bayar_total "+
							"			from patra_kaspiutang_d x inner join patra_ar_m y on x.no_ar=y.no_ar and x.kode_lokasi=y.kode_lokasi  "+
							"			where x.jenis = 'AR' and x.periode  < '"+this.sg1.getCell(2,1)+"' "+
							"			group by x.kode_cust,x.kode_lokasi "+
							"	 ) d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
							"	 left join ( "+
							"		select kode_cust,kode_lokasi,"+
							"		sum(case kode_curr when 'USD' then nilai_curr+ppn_curr else 0 end) as nilai_usd,"+
							"		sum(case kode_curr when 'IDR' then nilai_curr+ppn_curr else 0 end) as nilai_idr,"+
							"			sum((nilai_curr+ppn_curr)*kurs) as total "+
							"			from patra_ar_m where dc ='D' and periode = '"+this.sg1.getCell(2,1)+"' group by kode_cust,kode_lokasi "+
							"	 ) e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"	 left join ( "+
							"		select kode_cust,kode_lokasi, "+
							"		sum(case kode_curr when 'USD' then nilai_curr+ppn_curr else 0 end) as bayar_usd, "+
							"		sum(case kode_curr when 'IDR' then nilai_curr+ppn_curr else 0 end) as bayar_idr, "+
							"			sum((nilai_curr+ppn_curr)*kurs) as bayar_total "+ 
							"			from patra_ar_m where dc='C' and periode = '"+this.sg1.getCell(2,1)+"' group by kode_cust,kode_lokasi "+
							"			union "+
							"			select x.kode_cust,x.kode_lokasi, "+
							"		sum(case y.kode_curr when 'USD' then x.nilai_curr else 0 end) as bayar_usd, "+
							"		sum(case y.kode_curr when 'IDR' then x.nilai_curr else 0 end) as bayar_idr, "+
							"			sum(x.nilai_curr*y.kurs) as bayar_total "+
							"			from patra_kaspiutang_d x inner join patra_ar_m y on x.no_ar=y.no_ar and x.kode_lokasi=y.kode_lokasi "+
							"			where x.jenis = 'AR' and x.periode  = '"+this.sg1.getCell(2,1)+"' "+
							"			group by x.kode_cust,x.kode_lokasi "+
							"	 ) f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+this.filter+" and a.kode_lokasi='"+this.sg1.getCell(2,0)+"' "+
							"order by b.nama,a.kode_cust"; 
											
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kelompok");width.add(60);fieldType.add("S");
				title.add("Kode Cust");width.add(60);fieldType.add("S");
				title.add("Nama Cust");width.add(200);fieldType.add("S");
				
				title.add("Saldo Awal USD");width.add(100);fieldType.add("N");
				title.add("Saldo Awal IDR");width.add(100);fieldType.add("N");
				title.add("Saldo Awal Total");width.add(100);fieldType.add("N");
				title.add("Debet USD");width.add(100);fieldType.add("N");
				title.add("Debet IDR");width.add(100);fieldType.add("N");
				title.add("Debet Total");width.add(100);fieldType.add("N");
				title.add("Kredit USD");width.add(100);fieldType.add("N");
				title.add("Kredit IDR");width.add(100);fieldType.add("N");
				title.add("Kredit Total");width.add(100);fieldType.add("N");
				title.add("Saldo Akhir USD");width.add(100);fieldType.add("N");
				title.add("Saldo Akhir IDR");width.add(100);fieldType.add("N");
				title.add("Saldo Akhir Total");width.add(100);fieldType.add("N");
				
				this.summary = new server_util_arrayList({items:["N","N","N", "Y","Y","Y","Y","Y","Y", "Y","Y","Y","Y","Y","Y"]});
				this.scriptSqlCount = "select count(a.kode_cust) "+
									  "from patra_cust a "+								  
									  " "+this.filter+" and a.kode_lokasi='"+this.sg1.getCell(2,0)+"' ";
			} 
			else {
				this.filter = this.filterRep.filterStr("b.kode_klpcust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where ")+
				this.filterRep.filterStr("b.kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and ");

				this.sql =  "select c.nama as nama_klp,b.kode_cust,b.nama as nama_cust, "+
							"      a.no_ar,a.no_dokumen,a.no_fp,a.periode,convert(varchar,a.tgl_invoice,103) as tgl_invoice,a.keterangan,a.jenis,a.kode_curr,a.kurs,a.akun_ar, "+
							"	   a.nilai_curr,a.ppn_curr,a.nilai_curr+a.ppn_curr as total_curr, "+
							"	   a.nilai,a.ppn,a.nilai+a.ppn as total, "+
							"	   isnull(d.bayar_curr,0) as bayar_curr,isnull(d.bayar,0) as bayar, "+
							"	   a.nilai_curr+a.ppn_curr-isnull(d.bayar_curr,0) as saldo_curr, "+
							"	   a.nilai+a.ppn-isnull(d.bayar,0) as saldo "+
							"from patra_ar_m a  "+
							"	 inner join patra_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"	 inner join patra_klpcust c on b.kode_klpcust=c.kode_klpcust and c.kode_lokasi=b.kode_lokasi "+
							"		 left join ( "+
							"			 select no_arref as no_ar,kode_lokasi, "+
							"			 sum(nilai_curr+ppn_curr) as bayar_curr, "+
							"		     sum(nilai+ppn) as bayar "+
							"		     from patra_ar_m where dc='C' and periode <= '"+this.sg1.getCell(2,1)+"' group by no_arref,kode_lokasi "+
							"		     union "+
							"		     select y.no_ar,y.kode_lokasi, "+
							"		     sum(x.nilai_curr) as bayar_curr, "+ 
							"		     sum(x.nilai_curr*y.kurs) as bayar "+
							"		     from patra_kaspiutang_d x inner join patra_ar_m y on x.no_ar=y.no_ar and x.kode_lokasi=y.kode_lokasi  "+
							"		     where x.jenis = 'AR' and x.periode  <= '"+this.sg1.getCell(2,1)+"' "+
							"		     group by y.no_ar,y.kode_lokasi "+
							"		 ) d on a.no_ar=d.no_ar and a.kode_lokasi=d.kode_lokasi "+
							" "+this.filter+" and a.periode <= '"+this.sg1.getCell(2,1)+"' and a.dc='D' and a.kode_lokasi='"+this.sg1.getCell(2,0)+"' "+
							"order by c.nama,b.kode_cust"; 
											
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kelompok");width.add(60);fieldType.add("S");
				title.add("Kode Cust");width.add(60);fieldType.add("S");
				title.add("Nama Cust");width.add(200);fieldType.add("S");
				title.add("No Bukti");width.add(100);fieldType.add("S");
				title.add("No Invoice");width.add(100);fieldType.add("S");
				title.add("Faktur Pajak");width.add(100);fieldType.add("S");
				title.add("Periode");width.add(60);fieldType.add("S");
				title.add("Tgl Invoice");width.add(60);fieldType.add("S");
				title.add("Keterangan");width.add(200);fieldType.add("S");
				title.add("Jenis");width.add(60);fieldType.add("S");
				title.add("Kode Curr");width.add(60);fieldType.add("S");
				title.add("Kurs");width.add(50);fieldType.add("N");
				title.add("Akun Piutang");width.add(60);fieldType.add("S");				
				title.add("Pokok Original");width.add(100);fieldType.add("N");
				title.add("PPN Original");width.add(100);fieldType.add("N");
				title.add("Total Original");width.add(100);fieldType.add("N");				
				title.add("Pokok Konversi");width.add(100);fieldType.add("N");
				title.add("PPN Konversi");width.add(100);fieldType.add("N");
				title.add("Total Konversi");width.add(100);fieldType.add("N");
				title.add("Bayar Orignal");width.add(100);fieldType.add("N");
				title.add("Bayar Konversi");width.add(100);fieldType.add("N");
				title.add("Saldo Orignal");width.add(100);fieldType.add("N");
				title.add("Saldo Konversi");width.add(100);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","Y","N", "Y","Y","Y","Y","Y","Y" ,"Y","Y","Y","Y"]});

				this.scriptSqlCount = "select count(no_ar) "+
									  "from patra_ar_m  "+								  
									  "where kode_lokasi='"+this.sg1.getCell(2,0)+"' and dc ='D' and periode<="+this.sg1.getCell(2,1)+"'";
			}
			
			
			var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,undefined,this.summary);
			this.nama="";//this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
			

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
		alert("[app_patra_report_flSaldoPiutang]::mainButtonClick:"+e);
	}
};
window.app_patra_report_flSaldoPiutang.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_patra_report_flSaldoPiutang.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_patra_report_flSaldoPiutang.prototype.doConfirmClick = function(sender){
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
window.app_patra_report_flSaldoPiutang.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_patra_report_flSaldoPiutang.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Saldo Piutang <br>"+this.nama+" Periode "+this.sg1.getCell(2,1)  ;			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_patra_report_flSaldoPiutang.prototype.doCloseReportClick = function(sender)
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
window.app_patra_report_flSaldoPiutang.prototype.sg1onChange = function(sender, col , row)
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
window.app_patra_report_flSaldoPiutang.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
