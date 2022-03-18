window.app_budget_report_flKunjSc = function(owner)
{
	if (owner)
	{
		window.app_budget_report_flKunjSc.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flKunjSc";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Sharing Cost",2);
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
	
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=","2010"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jenis Kunjungan","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Laporan","=","Summary Kunjungan"));
	
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
window.app_budget_report_flKunjSc.extend(window.portalui_childForm);
window.app_budget_report_flKunjSc.prototype.doEllipseClick= function(sender, col, row)
{
	
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
													  ["kode_akun","nama"],"and",["Kode","Nama"]);
		}
};
window.app_budget_report_flKunjSc.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","3","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,0,0]);
	}
	if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary Kunjungan","Detail Kunjungan","Summary Biaya","Detail Biaya","Summary Rata-rata Biaya","Detail Rata-rata Biaya"));
	}	
};
window.app_budget_report_flKunjSc.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=","2010"));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jenis Kunjungan","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Periodik Laporan","=","Bulanan"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis Laporan","=","Summary Kunjungan"));
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
				  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				  
			this.showFilter = this.filterRep.showFilter(this.sg1);
			if (this.sg1.getCell(2,3)=="Summary Kunjungan")
			{
				this.sql =  "select c.nama,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and  a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama ";		
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(100);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				
			}
			if (this.sg1.getCell(2,3)=="Detail Kunjungan")
			{
				this.sql =  "select c.nama,b.nama as nama_param,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.jumlah else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.jumlah else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.jumlah else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.jumlah else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";		
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(100);fieldType.add("S");
				title.add("Parameter");width.add(250);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});

			}
			if (this.sg1.getCell(2,3)=="Summary Biaya")
			{
				this.sql =  "select c.nama,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama ";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(200);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				
			}
			if (this.sg1.getCell(2,3)=="Detail Biaya")
			{
				this.sql =  "select c.nama,b.nama as nama_param,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.nilai_biaya else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(100);fieldType.add("S");
				title.add("Parameter");width.add(300);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});

			}
			if (this.sg1.getCell(2,3)=="Summary Rata-rata Biaya")
			{
				this.sql =  "select c.nama,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(100);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				
			}
			if (this.sg1.getCell(2,3)=="Detail Rata-rata Biaya")
			{
				this.sql =  "select c.nama,b.nama as nama_param,"+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as tpkk_kk, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as tpkk_isu, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as tpkk_anak, "+
							"	   sum(case when a.jenis_tpk='TPKK' and substring(a.kode_band,1,2) in ('01','02') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpkk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as tpku_kk, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as tpku_isu, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as tpku_anak, "+
							"	   sum(case when a.jenis_tpk='TPKU' and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpku, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_tpk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='KK' then a.nilai_biaya/jumlah else 0 end) as ntpkk_kk, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ISU' then a.nilai_biaya/jumlah else 0 end) as ntpkk_isu, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' and a.jenis_pst='ANAK' then a.nilai_biaya/jumlah else 0 end) as ntpkk_anak, "+
							"	   sum(case when a.jenis_tpk='NONTPK' and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_ntpkk, "+
							"	   sum(case when a.jenis_tpk in ('TPKK','TPKU','NONTPK') and a.status_pst='PEGAWAI' then a.nilai_biaya/jumlah else 0 end) as tot_kar "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";	
				this.scriptSqlCount ="select count(*) "+
							"from agg_bpcc_d a "+
							"inner join agg_bpcc_param b on a.kode_param=b.kode_param "+ 
							"inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+
							"where a.kode_lokasi='03' "+
							"group by b.kode_bpcc,c.nama,b.kode_param,b.nama ";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kunjungan");width.add(100);fieldType.add("S");
				title.add("Parameter");width.add(300);fieldType.add("S");
				title.add("Karyawan TPKK");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKK");width.add(60);fieldType.add("N");
				title.add("Anak TPKK");width.add(60);fieldType.add("N");
				title.add("Total TPKK");width.add(60);fieldType.add("N");
				title.add("Karyawan TPKU");width.add(60);fieldType.add("N");
				title.add("Pasangan TPKU");width.add(60);fieldType.add("N");
				title.add("Anak TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPKU");width.add(60);fieldType.add("N");
				title.add("Total TPK");width.add(60);fieldType.add("N");
				title.add("Karyawan Luar");width.add(60);fieldType.add("N");
				title.add("Pasangan Luar");width.add(60);fieldType.add("N");
				title.add("Anak Luar");width.add(60);fieldType.add("N");
				title.add("Total Luar");width.add(60);fieldType.add("N");
				title.add("Total Karyawan");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				
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
		alert("[app_budget_report_flKunjSc]::mainButtonClick:"+e);
	}
};
window.app_budget_report_flKunjSc.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_budget_report_flKunjSc.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_budget_report_flKunjSc.prototype.doConfirmClick = function(sender){
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
window.app_budget_report_flKunjSc.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_budget_report_flKunjSc.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Sharing Cost<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_budget_report_flKunjSc.prototype.doCloseReportClick = function(sender)
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
window.app_budget_report_flKunjSc.prototype.sg1onChange = function(sender, col , row)
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
window.app_budget_report_flKunjSc.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};