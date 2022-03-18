window.app_budget_report_flAggVar = function(owner)
{
	if (owner)
	{
		window.app_budget_report_flAggVar.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggVar";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar RKA Biaya Variabel", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,250],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:9});
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
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_abau_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("PP","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PK","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode DRK","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode RKA","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Periodik Laporan","=","Bulanan"));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2), new Array("Versi Anggaran ","=","Original"));
	
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.doSelectCell(this.sg1,2,8);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
};
window.app_budget_report_flAggVar.extend(window.portalui_childForm);
window.app_budget_report_flAggVar.prototype.doEllipseClick= function(sender, col, row)
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
			this.filterRep.ListDataSGFilter(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_pp) from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",
													  ["kode_pp","nama"],"and",["Kode","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar PK",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pk, nama from agg_pk  ",
													  "select count( kode_pk) from  agg_pk   ",
													  ["kode_pk","nama"],"and",["Kode","Nama"]);
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar DRK",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_drk, nama from agg_drk  ",
													  "select count(kode_drk) from agg_drk   ",
													  ["kode_drk","nama"],"and",["Kode","Nama"]);
		}
		if (row == 5)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_rka, nama from agg_rka  ",
													  "select count(kode_rka) from agg_rka   ",
													  ["kode_rka","nama"],"and",["Kode","Nama"]);
		}
		if (row == 6)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
													  ["kode_akun","nama"],"and",["Kode","Nama"]);
		}
};
window.app_budget_report_flAggVar.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8],["123","3","123","123","123","123","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8],[2,0,2,2,2,2,2,0,0]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["3","3","123","123","123","123","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,0,2,2,2,2,2,0,0]);
	}
	if (row == 1)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct tahun from agg_abau_d where kode_lokasi='"+this.app._lokasi+"' order by tahun",[this.sg1.columns.get(2).pickList]);
	}
	if (row == 7)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Bulanan","Triwulan","Semester"));
	}	
	if (row == 8)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Original","Evaluasi"));
	}	
};
window.app_budget_report_flAggVar.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=","2010"));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("PP","All",""));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PK","All",""));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode DRK","All",""));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode RKA","All",""));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode Akun","All",""));
			this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Periodik Laporan","=","Bulanan"));
			this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2), new Array("Jenis Laporan","=","Summary"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			if (this.sg1.getCell(2,8)=='Original')
			{
				this.filter2 =" and a.progress='0' ";
			}
			else
			{
				this.filter2 = " and a.progress='1' ";
			}
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				  this.filterRep.filterStr("a.kode_pk",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				  this.filterRep.filterStr("a.kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
				  this.filterRep.filterStr("a.kode_rka",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
				  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+this.filter2;
				  
			this.showFilter = this.filterRep.showFilter(this.sg1);
			if (this.sg1.getCell(2,7)=="Bulanan")
			{
				this.sql =  "select g.kode_var,a.kode_pk,b.nama as nama_pk,a.kode_drk,c.nama as nama_drk,"+
						"	   a.kode_rka,d.nama as nama_rka,a.kode_pp,e.nama as nama_pp,a.kode_akun,f.nama as nama_akun, "+
						"	   g.jumlah,g.volume,isnull(g.agg_01,0) as agg_01,isnull(g.agg_02,0) as agg_02,isnull(g.agg_03,0) as agg_03,isnull(g.agg_04,0) as agg_04,"+
						"	   isnull(g.agg_05,0) as agg_05,isnull(g.agg_06,0) as agg_06,isnull(g.agg_07,0) as agg_07,isnull(g.agg_08,0) as agg_08,isnull(g.agg_09,0) as agg_09,"+
						"isnull(g.agg_10,0) as agg_10,isnull(g.agg_11,0) as agg_11,isnull(g.agg_12,0) as agg_12,isnull(g.agg_total,0) as agg_total "+
						"from (select distinct a.kode_lokasi,a.kode_pp,a.tahun,a.kode_akun,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.progress "+	
						"	  from agg_abau_d a "+
						this.filter+") a  "+
						"inner join agg_pk b on a.kode_pk=b.kode_pk  "+
						"inner join agg_drk c on a.kode_drk=c.kode_drk  "+
						"inner join agg_rka d on a.kode_rka=d.kode_rka  "+
						"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
						"inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"left join ( "+
						"	 select a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka, "+
						"      sum(case when a.bulan between '01' and '12' then a.jumlah else 0 end) as jumlah, "+
						"		sum(case when a.bulan between '01' and '12' then a.volume else 0 end) as volume, "+
						"	   sum(case when a.bulan between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
						"	   sum(case when a.bulan='01' then a.nilai else 0 end) as agg_01,"+
						"	   sum(case when a.bulan='02' then a.nilai else 0 end) as agg_02, "+
						"	   sum(case when a.bulan='03' then a.nilai else 0 end) as agg_03, "+
						"	   sum(case when a.bulan='04' then a.nilai else 0 end) as agg_04, "+
						"	   sum(case when a.bulan='05' then a.nilai else 0 end) as agg_05, "+
						"	   sum(case when a.bulan='06' then a.nilai else 0 end) as agg_06, "+
						"	   sum(case when a.bulan='07' then a.nilai else 0 end) as agg_07, "+
						"	   sum(case when a.bulan='08' then a.nilai else 0 end) as agg_08, "+
						"	   sum(case when a.bulan='09' then a.nilai else 0 end) as agg_09, "+
						"	   sum(case when a.bulan='10' then a.nilai else 0 end) as agg_10, "+
						"	   sum(case when a.bulan='11' then a.nilai else 0 end) as agg_11, "+
						"	   sum(case when a.bulan='12' then a.nilai else 0 end) as agg_12 "+
						"	 from agg_abau_d a "+
						this.filter+
						"	 group by a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka "+
						"		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp and a.kode_var=g.kode_var and a.kode_pk=g.kode_pk and a.kode_drk=g.kode_drk and a.kode_rka=g.kode_rka "+this.filter+
						"order by a.kode_pp,g.kode_var";	
				
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode Var");width.add(50);fieldType.add("S");		
				title.add("No PK");width.add(50);fieldType.add("S");
				title.add("Program Kerja");width.add(150);fieldType.add("S");
				title.add("No DRK");width.add(50);fieldType.add("S");
				title.add("Rencana Kegiatan");width.add(150);fieldType.add("S");
				title.add("No RKA");width.add(50);fieldType.add("S");
				title.add("Rincian Kegiatan");width.add(150);fieldType.add("S");
				title.add("Kode PP");width.add(50);fieldType.add("S");
				title.add("Nama PP");width.add(150);fieldType.add("S");
				title.add("Kode Akun");width.add(60);fieldType.add("S");
				title.add("Nama Akun");width.add(150);fieldType.add("S");
				title.add("Jml");width.add(40);fieldType.add("N");
				title.add("Vol");width.add(40);fieldType.add("N");
				title.add("Januari");width.add(60);fieldType.add("N");
				title.add("Februari");width.add(60);fieldType.add("N");
				title.add("Maret");width.add(60);fieldType.add("N");
				title.add("April");width.add(60);fieldType.add("N");
				title.add("Mei");width.add(60);fieldType.add("N");
				title.add("Juni");width.add(60);fieldType.add("N");
				title.add("Juli");width.add(60);fieldType.add("N");
				title.add("Agustus");width.add(60);fieldType.add("N");
				title.add("September");width.add(60);fieldType.add("N");
				title.add("Oktober");width.add(60);fieldType.add("N");
				title.add("November");width.add(60);fieldType.add("N");
				title.add("Desember");width.add(60);fieldType.add("N");
				title.add("Total");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});

			}
			if (this.sg1.getCell(2,7)=="Triwulan")
			{
				this.sql =  "select g.kode_var,a.kode_pk,b.nama as nama_pk,a.kode_drk,c.nama as nama_drk,"+
						"	   a.kode_rka,d.nama as nama_rka,a.kode_pp,e.nama as nama_pp,a.kode_akun,f.nama as nama_akun, "+
						"	   g.jumlah,g.volume,isnull(g.agg_01,0) as agg_01,isnull(g.agg_02,0) as agg_02,isnull(g.agg_03,0) as agg_03,isnull(g.agg_04,0) as agg_04,isnull(g.agg_total,0) as agg_total "+
						"from (select distinct a.kode_lokasi,a.kode_pp,a.tahun,a.kode_akun,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.progress "+	
						"	  from agg_abau_d a "+this.filter+") a  "+
						"inner join agg_pk b on a.kode_pk=b.kode_pk  "+
						"inner join agg_drk c on a.kode_drk=c.kode_drk  "+
						"inner join agg_rka d on a.kode_rka=d.kode_rka  "+
						"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
						"inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"left join ( "+
						"	 select a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka, "+
						"      sum(case when a.bulan between '01' and '12' then a.jumlah else 0 end) as jumlah, "+
						"		sum(case when a.bulan between '01' and '12' then a.volume else 0 end) as volume, "+
						"	   sum(case when a.bulan between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
						"	   sum(case when a.bulan between '01' and '03' then a.nilai else 0 end) as agg_01,"+
						"	   sum(case when a.bulan between '04' and '06' then a.nilai else 0 end) as agg_02, "+
						"	   sum(case when a.bulan between '07' and '09' then a.nilai else 0 end) as agg_03, "+
						"	   sum(case when a.bulan between '10' and '12' then a.nilai else 0 end) as agg_04 "+
						"	 from agg_abau_d a "+this.filter+
						"	 group by a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka "+
						"		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp and a.kode_var=g.kode_var and a.kode_pk=g.kode_pk and a.kode_drk=g.kode_drk and a.kode_rka=g.kode_rka "+this.filter+
						"order by a.kode_pp,a.kode_var";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode Var");width.add(50);fieldType.add("S");		
				title.add("No PK");width.add(50);fieldType.add("S");
				title.add("Program Kerja");width.add(150);fieldType.add("S");
				title.add("No DRK");width.add(50);fieldType.add("S");
				title.add("Rencana Kegiatan");width.add(150);fieldType.add("S");
				title.add("No RKA");width.add(50);fieldType.add("S");
				title.add("Rincian Kegiatan");width.add(150);fieldType.add("S");
				title.add("Kode PP");width.add(50);fieldType.add("S");
				title.add("Nama PP");width.add(150);fieldType.add("S");
				title.add("Kode Akun");width.add(60);fieldType.add("S");
				title.add("Nama Akun");width.add(150);fieldType.add("S");
				title.add("Jml");width.add(40);fieldType.add("N");
				title.add("Vol");width.add(40);fieldType.add("N");
				title.add("Triwulan I");width.add(60);fieldType.add("N");
				title.add("Triwulan II");width.add(60);fieldType.add("N");
				title.add("Triwulan III");width.add(60);fieldType.add("N");
				title.add("Triwulan IV");width.add(60);fieldType.add("N");
				title.add("Total");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y","Y","Y"]});

			}
			if (this.sg1.getCell(2,7)=="Semester")
			{
				this.sql =  "select g.kode_var,a.kode_pk,b.nama as nama_pk,a.kode_drk,c.nama as nama_drk,"+
						"	   a.kode_rka,d.nama as nama_rka,a.kode_pp,e.nama as nama_pp,a.kode_akun,f.nama as nama_akun, "+
						"	   g.jumlah,g.volume,isnull(g.agg_01,0) as agg_01,isnull(g.agg_02,0) as agg_02,isnull(g.agg_total,0) as agg_total "+
						"from (select distinct a.kode_lokasi,a.kode_pp,a.tahun,a.kode_akun,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.progress "+	
						"	  from agg_abau_d a "+this.filter+") a  "+
						"inner join agg_pk b on a.kode_pk=b.kode_pk  "+
						"inner join agg_drk c on a.kode_drk=c.kode_drk "+
						"inner join agg_rka d on a.kode_rka=d.kode_rka  "+
						"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
						"inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"left join ( "+
						"	 select a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka, "+
						"      sum(case when a.bulan between '01' and '12' then a.jumlah else 0 end) as jumlah, "+
						"		sum(case when a.bulan between '01' and '12' then a.volume else 0 end) as volume, "+
						"	   sum(case when a.bulan between '01' and '12' then a.nilai else 0 end) as agg_total, "+	
						"	   sum(case when a.bulan between '01' and '06' then a.nilai else 0 end) as agg_01,"+
						"	   sum(case when a.bulan between '07' and '12' then a.nilai else 0 end) as agg_02 "+
						"	 from agg_abau_d a "+this.filter+
						"	 group by a.kode_lokasi,a.kode_pp,a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka "+
						"		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp and a.kode_var=g.kode_var and a.kode_pk=g.kode_pk and a.kode_drk=g.kode_drk and a.kode_rka=g.kode_rka "+this.filter+
						"order by a.kode_pp,a.kode_rka";	
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Kode Var");width.add(50);fieldType.add("S");		
				title.add("No PK");width.add(50);fieldType.add("S");
				title.add("Program Kerja");width.add(150);fieldType.add("S");
				title.add("No DRK");width.add(50);fieldType.add("S");
				title.add("Rencana Kegiatan");width.add(150);fieldType.add("S");
				title.add("No RKA");width.add(50);fieldType.add("S");
				title.add("Rincian Kegiatan");width.add(150);fieldType.add("S");
				title.add("Kode PP");width.add(50);fieldType.add("S");
				title.add("Nama PP");width.add(150);fieldType.add("S");
				title.add("Kode Akun");width.add(60);fieldType.add("S");
				title.add("Nama Akun");width.add(150);fieldType.add("S");
				title.add("Jml");width.add(40);fieldType.add("N");
				title.add("Vol");width.add(40);fieldType.add("N");
				title.add("Semester I");width.add(60);fieldType.add("N");
				title.add("Semester II");width.add(60);fieldType.add("N");
				title.add("Total");width.add(60);fieldType.add("N");
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y"]});

			}
			this.scriptSqlCount = "select count(*) "+
						"from agg_abau_d a "+
						"inner join agg_pk b on a.kode_pk=b.kode_pk and a.kode_lokasi=b.kode_lokasi "+
						"inner join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi "+
						"inner join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+
						"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
						"inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"inner join agg_abau_d h on a.kode_var=h.kode_var and a.kode_lokasi=h.kode_lokasi "+
						this.filter;
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
		alert("[app_budget_report_flAggVar]::mainButtonClick:"+e);
	}
};
window.app_budget_report_flAggVar.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_budget_report_flAggVar.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_budget_report_flAggVar.prototype.doConfirmClick = function(sender){
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
window.app_budget_report_flAggVar.prototype.doSelectedPage = function(sender, page)
{
	var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
	this.previewReport(dthtml);			
	this.page=page;
};
window.app_budget_report_flAggVar.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Daftar RKA Biaya Variabel<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_budget_report_flAggVar.prototype.doCloseReportClick = function(sender)
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
window.app_budget_report_flAggVar.prototype.sg1onChange = function(sender, col , row)
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
window.app_budget_report_flAggVar.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};