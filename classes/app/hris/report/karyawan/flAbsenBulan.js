window.app_hris_report_karyawan_flAbsenBulan = function(owner)
{
	if (owner)
	{
		window.app_hris_report_karyawan_flAbsenBulan.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_karyawan_flAbsenBulan";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Absensi", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,722,240],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,720,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gr_absen_harian_m where kode_lokasi='"+this.app._lokasi+"'");
	if (this.app._userStatus=="A")
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Pegawai","All",""]);
		this.gridLib.SGEditData(this.sg1,6,[0,1,2],["NIK","All",""]);
	}
	else
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Pegawai","All",""]);
		this.gridLib.SGEditData(this.sg1,6,[0,1,2],["NIK","All",""]);
	}
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
window.app_hris_report_karyawan_flAbsenBulan.extend(window.portalui_childForm);
window.app_hris_report_karyawan_flAbsenBulan.prototype.doEllipseClick= function(sender, col, row)
{
	
	if (row == 1)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_loker","nama"],"and",["Kode","Nama"]);
	}	
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_dir","nama"],"and",["Kode","Nama"]);
	}	
	if (row == 3)
	{
		this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
											"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
											["kode_dept","nama"],"and",["Kode","Nama"]);
	}	
	if (row == 4)
	{
	   	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
		this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
											"select a.nik, a.nama from gr_karyawan a "+this.filter,
											"select count(*) from gr_karyawan a "+this.filter,
											["a.nik","a.nama"],"and",["NIK","Nama"]);
	}	
	if (row == 5)
	{
		this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					this.filterRep.filterStr("b.nik",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
		this.filterRep.ListDataSGFilter(this, "Daftar Absen",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.no_absen, a.keterangan from gr_absen a "+
											  "inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter,
											  "select count(a.no_absen) from gr_absen a "+
											  "inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter,
											  ["a.no_absen","a.keterangan"],"and",["No Absen","Keterangan"]);
	}
	
	
};
window.app_hris_report_karyawan_flAbsenBulan.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","123","123","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[0,2,2,2,2,2,6]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","13","13","13","3","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[0,2,2,2,2,2,2]);
	}
	if (row == 0)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from gr_absen_harian_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
	}
};
window.app_hris_report_karyawan_flAbsenBulan.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			if (this.app._userStatus=="A")
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Absen","All",""])
			}
			else
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Absen","All",""])
			}
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			this.lokasi=this.app._namalokasi;
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					this.filterRep.filterStr("b.kode_jsb",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
					this.filterRep.filterStr("b.nik",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and");	
						
				
			this.showFilter = this.filterRep.showFilter(this.sg1);
			this.nama_report = "server_report_hris_rptAbsenBulan";
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
		}
    }catch(e)
	{
		alert("[app_hris_report_karyawan_flAbsenBulan]::mainButtonClick:"+e);
	}
};
window.app_hris_report_karyawan_flAbsenBulan.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_hris_report_karyawan_flAbsenBulan.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_hris_report_karyawan_flAbsenBulan.prototype.doConfirmClick = function(sender){
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
window.app_hris_report_karyawan_flAbsenBulan.prototype.doSelectedPage = function(sender, page)
{
	this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
	this.page = page;
	this.allBtn = false;
};
window.app_hris_report_karyawan_flAbsenBulan.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Biaya Pengobatan<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_hris_report_karyawan_flAbsenBulan.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
		this.page = 1;
		this.allBtn = true;
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
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
window.app_hris_report_karyawan_flAbsenBulan.prototype.sg1onChange = function(sender, col , row)
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
window.app_hris_report_karyawan_flAbsenBulan.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};