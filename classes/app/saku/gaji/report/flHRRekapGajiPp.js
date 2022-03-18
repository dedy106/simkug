window.app_saku_gaji_report_flHRRekapGajiPp = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_report_flHRRekapGajiPp.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gaji_report_flHRRekapGajiPp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi Per Unit Kerja", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(170);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(130);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	uses("util_gridLib;util_standar",true);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	strSql="select max(periode) as periode from gaji_m"; 
	var data = this.dbLib.runSQL(strSql);
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",data.get(0).get('periode')]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Pendapatan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_gaji_report_flHRRekapGajiPp.extend(window.portalui_childForm);
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.standar.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_lokasi, nama from hr_lokasi ",
									"select count(*) from hr_lokasi ",
									["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_loker,nama from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_loker","nama"],"where",["Kode","Nama"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
									"select a.nik, a.nama from karyawan a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from karyawan a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
									this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["a.nik","a.nama"],"and",["NIK","Nama"]);
	}
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","3","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,0]);
	}
	if (row == 1)
	{
		this.dbLib.setItemsFromSQL("select distinct periode from gaji_m a "+
									this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);		
	}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"Pendapatan");
		this.sg1.columns.get(2).pickList.set(1,"Potongan");
		this.sg1.columns.get(2).pickList.set(2,"Semua");
	}
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",data.get(0).get('periode')]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Unit Kerja","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Pendapatan"]);
		}else
		{
			this.jenisReport(this.sg1.getCell(2,4),this.filter);
		}
    }
	catch(e)
	{
		alert("[app_saku_gaji_report_flHRRekapGajiPp]::mainButtonClick:"+e);
	}
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.jenisReport = function(jenis,filter)
{
	try
	{
		
		this.p1.setVisible(false);
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		var title = new server_util_arrayList();			
		var width = new server_util_arrayList();
		var fieldType = new server_util_arrayList();
		this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,3),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("a.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");		
		this.filter2 = this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("c.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("c.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");		

		if (jenis == "Pendapatan")
		{
			var sql = "select a.kode_loker,c.nama,sum(b.gdas) as gdas,sum(b.tyay) as tyay,sum(tjab) as tjab,sum(b.tprof) as tprof,sum(b.pdas) as pdas,sum(b.thrt) as thrt, "+
					  "		   sum(b.tran) as tran,sum(b.tkhs) as tkhs,sum(b.bpls) as bpls,sum(b.lmbr) as lmbr,sum(b.kbkt) as kbkt,sum(b.ph21) as ph21, "+
					  "			sum(b.gdas+b.tyay+b.tjab+b.tprof+b.pdas+b.thrt+b.tran+b.tkhs+b.bpls+b.lmbr+b.kbkt+b.ph21) as total "+
					  "	from karyawan a "+
					  " inner join hr_dinas2 d on a.nik=d.nik "+
					  " inner join hr_loker c on d.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi and tipe='Posting' "+
					  "	inner join (select a.nik,case a.kode_param when 'GDAS' then nilai else 0 end as gdas, "+
					  "		   case a.kode_param when 'TYAY' then nilai else 0 end as tyay, "+
					  "		   case a.kode_param when 'TJAB' then nilai else 0 end as tjab, "+
					  "		   case a.kode_param when 'TPROF' then nilai else 0 end as tprof, "+
					  "case a.kode_param when 'PDAS' then nilai else 0 end as pdas, "+
					  "		   case a.kode_param when 'THRT' then nilai else 0 end as thrt, "+
					  "		   case a.kode_param when 'TRAN' then nilai else 0 end as tran, "+
					  "		   case a.kode_param when 'TKHS' then nilai else 0 end as tkhs, "+
					  "		   case a.kode_param when 'BPLS' then nilai else 0 end as bpls, "+
					  "		   case a.kode_param when 'LMBR' then nilai else 0 end as lmbr, "+
					  "		   case a.kode_param when 'KBKT' then nilai else 0 end as kbkt, "+
					  "		   case a.kode_param when 'PH21' then nilai else 0 end as ph21 "+
					  "		   from gaji_d a "+
					  "		   inner join gaji_m c on a.no_gaji=c.no_gaji "+this.filter2+
					  "			  ) b on a.nik=b.nik "+this.filter+
					  "	group by d.kode_loker ";
		
			this.scriptSqlCount = "select count(*) "+
					"	from karyawan a "+
					" inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi and tipe='Posting' "+
					  "	inner join gaji_d b on a.nik=b.nik"+
					  "	where a.nik='"+this.filter+"' ";
			title.add("Kode Unit");width.add(50);fieldType.add("S");
			title.add("Nama");width.add(150);fieldType.add("S");
			title.add("Gaji Dasar");width.add(80);fieldType.add("N");
			title.add("Tunj. Yayasan");width.add(80);fieldType.add("N");
			title.add("Tunj. Jabatan");width.add(80);fieldType.add("N");
			title.add("Tunj. Profesi");width.add(80);fieldType.add("N");
			title.add("Pengh. Dasar");width.add(80);fieldType.add("N");
			title.add("Tunj. Hari Tua");width.add(80);fieldType.add("N");
			title.add("Tunj. Transport");width.add(80);fieldType.add("N");
			title.add("Tunj. Khusus");width.add(80);fieldType.add("N");
			title.add("Bantuan Pulsa");width.add(80);fieldType.add("N");
			title.add("Lembur");width.add(80);fieldType.add("N");
			title.add("Beban Kerja");width.add(80);fieldType.add("N");
			title.add("Tunj. PPH 21");width.add(80);fieldType.add("N");
			title.add("Total");width.add(80);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});	
		}else if (jenis == "Potongan")
		{
			var sql = "select a.kode_loker,c.nama,sum(b.ppph) as ppph,sum(ptht) as ptht,sum(b.pinl) as pinl,sum(b.pkes) as pkes,sum(b.kosb) as kosb, "+
					  "		   sum(b.koct) as koct,sum(b.kopt) as kopt,sum(b.byd1) as byd1, "+
					  "			sum(b.ppph+b.ptht+b.pinl+b.pkes+b.kosb+b.koct+b.kopt+b.byd1) as total "+
					  "	from karyawan a "+
					  " inner join hr_dinas2 d on a.nik=d.nik "+
					  " inner join hr_loker c on d.kode_loker=c.kode_loker "+
					  "	inner join (select a.nik,"+
					  "		   case a.kode_param when 'PPPH' then nilai else 0 end as ppph, "+
					  "		   case a.kode_param when 'PTHT' then nilai else 0 end as ptht, "+
					  "		   case a.kode_param when 'PINL' then nilai else 0 end as pinl, "+
					  "		   case a.kode_param when 'PKES' then nilai else 0 end as pkes, "+
					  "		   case a.kode_param when 'KOSB' then nilai else 0 end as kosb, "+
					  "		   case a.kode_param when 'KOCT' then nilai else 0 end as koct, "+
					  "		   case a.kode_param when 'KOPT' then nilai else 0 end as kopt, "+
					  "		   case a.kode_param when 'BYD1' then nilai else 0 end as byd1 "+
					  "		   from gaji_d a "+
					  "		   inner join gaji_m c on a.no_gaji=c.no_gaji "+this.filter2+
					  "			  ) b on a.nik=b.nik "+this.filter+
					  "	group by d.kode_loker ";

			
			this.scriptSqlCount = "select count(*) "+
					  "	from karyawan a "+
					  "	inner join gaji_d b on a.nik=b.nik"+
					  " inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi and tipe='Posting' "+
					  "	where a.nik='"+this.filter+"' ";
			title.add("Kode Unit");width.add(50);fieldType.add("S");
			title.add("Nama");width.add(150);fieldType.add("S");
			title.add("Potongan PPh21");width.add(80);fieldType.add("N");
			title.add("Potongan THT");width.add(80);fieldType.add("N");
			title.add("Pinjaman Lunak");width.add(80);fieldType.add("N");
			title.add("Potongan Kesehatan");width.add(80);fieldType.add("N");
			title.add("Koperasi SB");width.add(80);fieldType.add("N");
			title.add("Koperasi Citra");width.add(80);fieldType.add("N");
			title.add("Koperasi Poltek");width.add(80);fieldType.add("N");
			title.add("Bank Yudha");width.add(80);fieldType.add("N");
			title.add("Total");width.add(80);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
			
		}else if (jenis == "Semua")
		{
			var sql = "select a.kode_loker,c.nama,sum(b.gdas) as gdas,sum(b.tyay) as tyay,sum(tjab) as tjab,sum(b.tprof) as tprof,sum(b.pdas) as pdas,sum(b.thrt) as thrt, "+
					  "		   sum(b.tran) as tran,sum(b.tkhs) as tkhs,sum(b.bpls) as bpls,sum(b.lmbr) as lmbr,sum(b.kbkt) as kbkt,sum(b.ph21) as ph21, "+
					  "			sum(b.gdas+b.tyay+b.tjab+b.tprof+b.thrt+b.pdas+b.tran+b.tkhs+b.bpls+b.lmbr+b.kbkt+b.ph21) as total_pdpt, "+
					  "sum(b.ppph) as ppph,sum(ptht) as ptht,sum(b.pinl) as pinl,sum(b.pkes) as pkes,sum(b.kosb) as kosb, "+
					  "		   sum(b.koct) as koct,sum(b.kopt) as kopt,sum(b.byd1) as byd1, "+
					  "			sum(b.ppph+b.ptht+b.pinl+b.pkes+b.kosb+b.koct+b.kopt+b.byd1) as total_pot, "+
					  "			sum(b.gdas+b.tyay+b.tjab+b.tprof+b.thrt+b.tran+b.pdas+b.tkhs+b.bpls+b.lmbr+b.kbkt+b.ph21) -sum(b.ppph+b.ptht+b.pinl+b.pkes+b.kosb+b.koct+b.kopt+b.byd1) as total_bersih"+ 
					  "	from karyawan a "+
					  " inner join hr_dinas2 d on a.nik=d.nik "+
					  " inner join hr_loker c on d.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi and tipe='Posting' "+
					  "	inner join (select a.nik,case a.kode_param when 'GDAS' then nilai else 0 end as gdas, "+
					  "		   case a.kode_param when 'TYAY' then nilai else 0 end as tyay, "+
					  "		   case a.kode_param when 'TJAB' then nilai else 0 end as tjab, "+
					  "		   case a.kode_param when 'TPROF' then nilai else 0 end as tprof, "+
					  "case a.kode_param when 'PDAS' then nilai else 0 end as pdas, "+
					  "		   case a.kode_param when 'THRT' then nilai else 0 end as thrt, "+
					  "		   case a.kode_param when 'TRAN' then nilai else 0 end as tran, "+
					  "		   case a.kode_param when 'TKHS' then nilai else 0 end as tkhs, "+
					  "		   case a.kode_param when 'BPLS' then nilai else 0 end as bpls, "+
					  "		   case a.kode_param when 'LMBR' then nilai else 0 end as lmbr, "+
					  "		   case a.kode_param when 'KBKT' then nilai else 0 end as kbkt, "+
					  "		   case a.kode_param when 'PH21' then nilai else 0 end as ph21, "+
					  "		   case a.kode_param when 'PPPH' then nilai else 0 end as ppph, "+
					  "		   case a.kode_param when 'PTHT' then nilai else 0 end as ptht, "+
					  "		   case a.kode_param when 'PINL' then nilai else 0 end as pinl, "+
					  "		   case a.kode_param when 'PKES' then nilai else 0 end as pkes, "+
					  "		   case a.kode_param when 'KOSB' then nilai else 0 end as kosb, "+
					  "		   case a.kode_param when 'KOCT' then nilai else 0 end as koct, "+
					  "		   case a.kode_param when 'KOPT' then nilai else 0 end as kopt, "+
					  "		   case a.kode_param when 'BYD1' then nilai else 0 end as byd1 "+
					 "		   from gaji_d a "+
					 "		   inner join gaji_m c on a.no_gaji=c.no_gaji "+this.filter2+
					  "			  ) b on a.nik=b.nik "+this.filter+
					  "	group by d.kode_loker ";

					
			
			this.scriptSqlCount = "select count(*) "+
					"	from karyawan a "+
					  "	inner join gaji_d b on a.nik=b.nik"+
					  " inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokasi=c.kode_lokasi and tipe='Posting' "+
					  "	where a.nik='"+this.filter+"' ";			
			title.add("Kode Unit");width.add(50);fieldType.add("S");
			title.add("Nama");width.add(150);fieldType.add("S");
			title.add("Gaji Dasar");width.add(80);fieldType.add("N");
			title.add("Tunj. Yayasan");width.add(80);fieldType.add("N");
			title.add("Tunj. Jabatan");width.add(80);fieldType.add("N");
			title.add("Tunj. Profesi");width.add(80);fieldType.add("N");
			title.add("Pengh. Dasar");width.add(80);fieldType.add("N");
			title.add("Tunj. Hari Tua");width.add(80);fieldType.add("N");
			title.add("Tunj. Transport");width.add(80);fieldType.add("N");
			title.add("Tunj. Khusus");width.add(80);fieldType.add("N");
			title.add("Bantuan Pulsa");width.add(80);fieldType.add("N");
			title.add("Lembur");width.add(80);fieldType.add("N");
			title.add("Beban Kerja");width.add(80);fieldType.add("N");
			title.add("Tunj. PPH 21");width.add(80);fieldType.add("N");
			title.add("Total Pdpt");width.add(80);fieldType.add("N");
			title.add("Potongan PPh21");width.add(80);fieldType.add("N");
			title.add("Potongan THT");width.add(80);fieldType.add("N");
			title.add("Pinjaman Lunak");width.add(80);fieldType.add("N");
			title.add("Potongan Kesehatan");width.add(80);fieldType.add("N");
			title.add("Koperasi SB");width.add(80);fieldType.add("N");
			title.add("Koperasi Citra");width.add(80);fieldType.add("N");
			title.add("Koperasi Poltek");width.add(80);fieldType.add("N");
			title.add("Bank Yudha");width.add(80);fieldType.add("N");
			title.add("Total Pot");width.add(80);fieldType.add("N");
			title.add("Pdpt Bersih");width.add(80);fieldType.add("N");
			this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});	
		}
		var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,true,undefined,this.summary);
		this.title = title;
		this.widthTable = width;
		this.fieldType = fieldType;
		this.sqlScript = sql;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.previewReport(dthtml,jenis);
    }catch(e)
	{
		alert("[app_saku_gaji_report_flHRRekapGajiPp]::jenisReport:"+e);
	}
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "preview" : 
			this.viewer.preview(result);			
		break;
	}
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager,this.title,this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml,this.sg1.getCell(2,3));			
	this.page=page;
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.previewReport = function(dthtml,jenis)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase();

	if (jenis == "Pendapatan")
	{
		html +="<br>LAPORAN REKAP PENDAPATAN PEGAWAI <br>";
	}
	if (jenis == "Potongan")
	{	
		html +="<br>LAPORAN REKAP POTONGAN PEGAWAI <br>";
	}
	if (jenis == "Semua")
	{	
		html +="<br>LAPORAN REKAP PENGHASILAN PEGAWAI <br>";
	}
	html+="Periode "+periodeToName(this.sg1.getCell(2,1))+"<br>";
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
	  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
	  this.previewReport(dthtml,this.sg1.getCell(2,3));			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("rekapgaji");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("rekapgaji");				
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
		this.previewReport(dthtml,this.sg1.getCell(2,3));
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
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.sg1onChange = function(sender, col , row)
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
window.app_saku_gaji_report_flHRRekapGajiPp.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};