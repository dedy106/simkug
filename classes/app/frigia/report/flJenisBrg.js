window.app_frigia_report_flJenisBrg = function(owner)
{
	if (owner)
	{
		window.app_frigia_report_flJenisBrg.prototype.parent.constructor.call(this,owner);
		this.className = "app_frigia_report_flJenisBrg";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Barang Per Jenis Barang", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from fri_barang_d where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Lokasi Gudang","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Barang","=",""));
	
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
window.app_frigia_report_flJenisBrg.extend(window.portalui_childForm);
window.app_frigia_report_flJenisBrg.prototype.doEllipseClick= function(sender, col, row)
{
		if (row == 0){
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
												  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Gudang",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_gudang, nama from fri_barang_gudang where kode_lokasi='"+this.app._lokasi+"' ",
												"select count(kode_gudang) from fri_barang_gudang where kode_lokasi='"+this.app._lokasi+"' ",
												["kode_gudang","nama"],"where",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Jenis Barang",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_jenis, nama  from fri_barang_jenis where kode_lokasi='"+this.app._lokasi+"' ",
												"select count(kode_jenis) from fri_barang_jenis where kode_lokasi='"+this.app._lokasi+"' ",
												["kode_jenis","nama"],"where",["Kode","Nama"]);
		}
};
window.app_frigia_report_flJenisBrg.prototype.doSelectCell = function(sender, col, row)
{
	this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,2]);

	if (row == 1){
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from fri_barang_d where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
	}	
};
window.app_frigia_report_flJenisBrg.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Lokasi Gudang","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Barang","=",""));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			if (this.sg1.getCell(2,3) == "") {
				system.alert(this,"Jenis Barang tidak valid.","Data Jenis Baang harus dipilih.");
				return false;
			}
			else {
				this.filter = this.filterRep.filterStr("kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.sql =  "select a.kode_brg,a.nama as nama_brg,a.satuan,isnull(b.sawal,0) as sawal,isnull(c.debet,0) as debet,isnull(d.kredit,0) as kredit,isnull(b.sawal,0) + isnull(c.debet,0) - isnull(d.kredit,0) as sakhir "+
							"from fri_barang_m a "+
							"  left join  "+
							"  (select kode_brg,kode_lokasi,sum(case dc when 'D' then (jumlah+bonus) else -(jumlah+bonus) end) as sawal "+
							"  from fri_barang_d where periode < '"+this.sg1.getCell(2,1)+"' "+this.filter+" and kode_lokasi='"+this.sg1.getCell(2,0)+"' group by kode_brg,kode_lokasi) b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							"   left outer join "+
							"  (select kode_brg,kode_lokasi,sum(case dc when 'D' then (jumlah+bonus) else 0 end) as debet "+
							"  from fri_barang_d where periode = '"+this.sg1.getCell(2,1)+"' "+this.filter+" and kode_lokasi='"+this.sg1.getCell(2,0)+"' group by kode_brg,kode_lokasi) c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
							"   left outer join "+
							"  (select kode_brg,kode_lokasi,sum(case dc when 'C' then (jumlah+bonus) else 0 end) as kredit "+
							"  from fri_barang_d where periode = '"+this.sg1.getCell(2,1)+"' "+this.filter+" and kode_lokasi='"+this.sg1.getCell(2,0)+"' group by kode_brg,kode_lokasi) d on a.kode_brg=d.kode_brg and a.kode_lokasi=d.kode_lokasi "+
							"where a.kode_jenis = '"+this.sg1.getCell(2,3)+"' ";						
				
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode Barang");width.add(60);fieldType.add("S");
				title.add("Nama Barang");width.add(300);fieldType.add("S");
				title.add("Satuan");width.add(300);fieldType.add("S");
				title.add("Saldo Awal");width.add(60);fieldType.add("N");
				title.add("Debet");width.add(60);fieldType.add("N");
				title.add("Kredit");width.add(60);fieldType.add("N");
				title.add("Saldo Akhir");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","N","Y","Y","Y","Y"]});

				
				this.scriptSqlCount = "select count(kode_brg) from fri_barang_m  where kode_jenis = '"+this.sg1.getCell(2,3)+"' ";
				
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,undefined,this.summary);
				this.nama=this.dbLib.getPeriodeFromSQL("select nama as periode from fri_barang_jenis where kode_jenis='"+this.sg1.getCell(2,3)+"'");
				

				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = this.sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
		}
    }catch(e)
	{
		alert("[app_frigia_report_flJenisBrg]::mainButtonClick:"+e);
	}
};
window.app_frigia_report_flJenisBrg.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_frigia_report_flJenisBrg.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_frigia_report_flJenisBrg.prototype.doConfirmClick = function(sender){
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
window.app_frigia_report_flJenisBrg.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_frigia_report_flJenisBrg.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Barang Per Jenis Barang<br>"+this.nama+" Periode "+this.sg1.getCell(2,1)  ;			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_frigia_report_flJenisBrg.prototype.doCloseReportClick = function(sender)
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
window.app_frigia_report_flJenisBrg.prototype.sg1onChange = function(sender, col , row)
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
window.app_frigia_report_flJenisBrg.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};