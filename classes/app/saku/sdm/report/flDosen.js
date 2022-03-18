window.app_saku_sdm_report_flDosen = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_report_flDosen.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_sdm_report_flDosen";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Dosen", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid",true);
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
		this.sg1.setRowCount(6);
		this.sg1.setCell(0,0,"Kode");
		
		uses("portalui_reportViewer",true);
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		

		uses("server_report_report",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep",true);
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","123","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2,3,4,5],[0,2,2,2,2,3]);
	
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.lokasi=this.app._lokasi;
	this.tanda="ALL";
	this.nik="";
	if (this.app._userStatus!="A")
	{
		this.tanda="=";
		this.nik=this.app._userLog;
	}
	this.userStatus=this.app._userStatus;
	this.gridLib.SGEditData(this.sg1,0,[0,1],["Prodi","All"]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["NIP",this.tanda,this.nik]);
	this.gridLib.SGEditData(this.sg1,2,[0,1],["Status","All"]);
	this.gridLib.SGEditData(this.sg1,3,[0,1],["Setingkat Struktural","All"]);
	this.gridLib.SGEditData(this.sg1,4,[0,1],["Setingkat Fungsional","All"]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Report","=","Detail"]);

	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_sdm_report_flDosen.extend(window.portalui_childForm);
window.app_saku_sdm_report_flDosen.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 1)
	{
		this.standar.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
									  "select a.nik, a.nama from karyawan a   "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									  "select count(*) from karyawan a "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									  ["a.nik","a.nama"],"and",["NIK","Nama"]);
	}
	if (row == 3  || row == 4)
	{
		this.filterRep.ListDataSGFilter(this, "Data Jabatan "+(row ==3 ? "Struktural":"Fungsional"),this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_jab, nama from hr_jabatan where kode_lokkonsol = '"+this.app._lokKonsol+"' and jenis = '"+(row ==3 ? "STRUKTURAL":"FUNGSIONAL")+"'",
										  "select count(*) from hr_jabatan where kode_lokkonsol = '"+this.app._lokKonsol+"' and jenis = '"+(row ==3 ? "STRUKTURAL":"FUNGSIONAL")+"' ",
										  ["kode_jab","nama"],"and",["Kode Lokasi","Nama"]);
	}
};
window.app_saku_sdm_report_flDosen.prototype.doSelectCell = function(sender, col, row)
{
<<<<<<< .mine
	this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","123","123","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[0,2,0,2,2,0]);
=======
	this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["23","3","123","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[0,2,0,2,2,3]);
>>>>>>> .r3261
	if (row == 0) {
		this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["MIF","TK","KA"]}));
		this.sg1.columns.get(3).setPicklist(new portalui_arrayMap({items:["MIF","TK","KA"]}));
	}
	if (row == 2) {
	this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Dosen Tetap","Dosen Tidak Tetap", "TPA"]}));
	this.sg1.columns.get(3).setPicklist(new portalui_arrayMap({items:["Dosen Tetap","Dosen Tidak Tetap", "TPA"]}));
	}
	if (row == 5) {
	this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Rekap","Detail"]}));
	this.sg1.columns.get(3).setPicklist(new portalui_arrayMap({items:["Rekap","Detail"]})); 
	}
};
window.app_saku_sdm_report_flDosen.prototype.mainButtonClick = function(sender)
{
	try 
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1],["Prodi","All"]);
			this.gridLib.SGEditData(this.sg1,1,[0,1],["NIP",this.tanda,this.nik]);
			this.gridLib.SGEditData(this.sg1,2,[0,1],["Status","All"]);
			this.gridLib.SGEditData(this.sg1,3,[0,1],["Report","=","Detail"]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			this.filter=this.filterRep.filterStr("a.kode_prodi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				this.filterRep.filterStr("a.nik",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				this.filterRep.filterStr("a.sts_dosen",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				this.filterRep.filterStr("c.kode_jabs",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				this.filterRep.filterStr("d.kode_jabf",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			if (this.sg1.cells(2,3) == "Detail"){
				this.sql =  "select distinct a.sts_dosen, a.kode_prodi, a.nik, a.nama, a.alamat, a.nidn, a.no_telp, a.email, c.jab_baru as jabs, g.nama as nmjabs, d.jab_baru as jabf, h.nama as nmjabf, "+
					" 			e.nama as unit_kerja, f.nama as loker "+				
						" from karyawan a "+
						" left outer join hr_angkat b on b.nik = a.nik and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join hr_jabs c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi and c.status_aktif = '1' "+
					"	left outer join hr_jabf d on d.nik = a.nik and d.kode_lokasi = a.kode_lokasi and d.status_aktif = '1' "+
					"	left outer join hr_jabatan g on g.kode_jab = c.kode_jabs "+
					"	left outer join hr_jabatan h on h.kode_jab = d.kode_jabf "+
					"	left outer join hr_loker e on e.kode_loker = b.kode_loker and e.kode_lokasi = a.kode_lokasi "+
					"	left outer join hr_lokasi f on f.kode_lokasi = a.kode_lokasi  "+
							this.filter+" order by a.sts_dosen, a.nik ";
<<<<<<< .mine
				this.scriptSqlCount =   "select count(*) from karyawan "+this.filter;
=======
				this.scriptSqlCount =   "select count(distinct a.sts_dosen, a.kode_prodi, a.nik, a.nama, a.alamat, a.nidn, a.no_telp, a.email, c.jab_baru as jabs, g.nama as nmjabs, d.jab_baru as jabf, h.nama as nmjabf, "+
					" 			e.nama as unit_kerja, f.nama as loker) from karyawan a "+
					" left outer join hr_angkat b on b.nik = a.nik and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join hr_jabs c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi and c.status_aktif = '1' "+
					"	left outer join hr_jabf d on d.nik = a.nik and d.kode_lokasi = a.kode_lokasi and d.status_aktif = '1' "+
					"	left outer join hr_jabatan g on g.kode_jab = c.kode_jabs "+
					"	left outer join hr_jabatan h on h.kode_jab = d.kode_jabf "+
					"	left outer join hr_loker e on e.kode_loker = b.kode_loker and e.kode_lokasi = a.kode_lokasi "+
					"	left outer join hr_lokasi f on f.kode_lokasi = a.kode_lokasi  "+
					this.filter;
>>>>>>> .r3261
				
				var title = new server_util_arrayList();
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Status Dosen");width.add(120);fieldType.add("S");
				title.add("Prog. Studi");width.add(100);fieldType.add("S");
				title.add("NIK");width.add(60);fieldType.add("S");
				title.add("Nama");width.add(200);fieldType.add("S");
				title.add("Alamat");width.add(300);fieldType.add("S");
				title.add("NIDN");width.add(60);fieldType.add("S");
				title.add("No Telp");width.add(60);fieldType.add("S");
				title.add("Email");width.add(100);fieldType.add("S");
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width, fieldType,false);
			}else {
				this.sql =  "select sts_dosen, kode_prodi, count(nik) as tot "+
						" from karyawan "+
							this.filter+" group by sts_dosen, kode_prodi ";
				this.scriptSqlCount =   "select count(*) from karyawan "+this.filter;
				
				var title = new server_util_arrayList();
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Status Dosen");width.add(50);fieldType.add("S");
				title.add("Prog. Studi");width.add(150);fieldType.add("S");
				title.add("Total");width.add(60);fieldType.add("N");				
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width, fieldType,true);
			}
			
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
	catch(e)
	{
		alert("[app_saku_sdm_report_flDosen]::mainButtonClick:"+e);
	}
};
window.app_saku_sdm_report_flDosen.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_sdm_report_flDosen.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_saku_sdm_report_flDosen.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN DOSEN<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_sdm_report_flDosen.prototype.doCloseReportClick = function(sender)
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
		html.add("cuti");
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);
		html.add("xls");
		html.add("cuti");
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
window.app_saku_sdm_report_flDosen.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_sdm_report_flDosen.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
