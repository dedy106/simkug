window.app_budget_report_flAggBpBln = function(owner)
{
	
	try{
	if (owner)
	{
		window.app_budget_report_flAggBpBln.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggBpBln";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Biaya Pengobatan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,190],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,167],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], 
										ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],
										colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.lokasi=this.app._lokasi;
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_bpcc_peserta where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2,3],["Kode Lokasi","Range",this.lokasi,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun Anggaran","=",this.tahun]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Parameter Layanan"]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periodik Laporan","=","Bulanan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
	}catch(e) {alert("constructor = "+e);}
};
window.app_budget_report_flAggBpBln.extend(window.portalui_childForm);
window.app_budget_report_flAggBpBln.implement({
	doEllipseClick: function(sender, col, row){
		if (row === 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
								  "select kode_lokasi, nama from lokasi ",
								  "select count(*) from lokasi ",
								  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		
		
	},
	doSelectCell: function(sender, col, row){
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["23","3","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,0,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,0,0]);
		}
		if (row == 1){
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_bpcc_peserta a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Parameter Layanan","Jenis Layanan","Band"]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Bulanan","Triwulan","Semester"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun Anggaran","=",this.tahun]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Parameter Layanan"]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periodik Laporan","=","Bulanan"]);
							
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.filter=this.filterRep.filterStr("e.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("e.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filter2=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
											
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.lap = this.sg1.getCell(2,2);
				this.jenisLap = this.sg1.getCell(2,3);
				var result  = new portalui_arrayMap();
				if (this.lap == "Parameter Layanan")
				{
					if (this.jenisLap == "Bulanan")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"	   isnull(f.j05,0) as j05,isnull(f.g05,0) as g05,isnull(f.j06,0) as j06,isnull(f.g06,0) as g06,isnull(f.j07,0) as j07,isnull(f.g07,0) as g07,isnull(f.j08,0) as j08,isnull(f.g08,0) as g08, "+
								"	   isnull(f.j09,0) as j09,isnull(f.g09,0) as g09,isnull(f.j10,0) as j10,isnull(f.g10,0) as g10,isnull(f.j11,0) as j11,isnull(f.g11,0) as g11,isnull(f.j12,0) as j12,isnull(f.g12,0) as g12, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_param e "+
								"left join (select a.kode_param, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.nilai else 0 end ) as g05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.nilai else 0 end ) as g06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.nilai else 0 end ) as g07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.nilai else 0 end ) as g08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.nilai else 0 end ) as g09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.nilai else 0 end ) as g10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.nilai else 0 end ) as g11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.nilai else 0 end ) as g12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.jumlah else 0 end ) as j05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.jumlah else 0 end ) as j06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.jumlah else 0 end ) as j07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.jumlah else 0 end ) as j08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.jumlah else 0 end ) as j09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.jumlah else 0 end ) as j10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.jumlah else 0 end ) as j11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.jumlah else 0 end ) as j12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_param)f on e.kode_param=f.kode_param "+
								"where e.modul='BP' "+
								"order by e.kode_param";
						
					}
					if (this.jenisLap == "Triwulan")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_param e "+
								"left join (select a.kode_param, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_param)f on e.kode_param=f.kode_param "+
								"where e.modul='BP' "+
								"order by e.kode_param";
					}
					if (this.jenisLap == "Semester")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_param e "+
								"left join (select a.kode_param, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_param)f on e.kode_param=f.kode_param "+
								"where e.modul='BP' "+
								"order by e.kode_param";
					}
				}
				if (this.lap == "Jenis Layanan")
				{
					if (this.jenisLap == "Bulanan")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"	   isnull(f.j05,0) as j05,isnull(f.g05,0) as g05,isnull(f.j06,0) as j06,isnull(f.g06,0) as g06,isnull(f.j07,0) as j07,isnull(f.g07,0) as g07,isnull(f.j08,0) as j08,isnull(f.g08,0) as g08, "+
								"	   isnull(f.j09,0) as j09,isnull(f.g09,0) as g09,isnull(f.j10,0) as j10,isnull(f.g10,0) as g10,isnull(f.j11,0) as j11,isnull(f.g11,0) as g11,isnull(f.j12,0) as j12,isnull(f.g12,0) as g12, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_jenis e "+
								"left join (select c.kode_bpcc, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.nilai else 0 end ) as g05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.nilai else 0 end ) as g06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.nilai else 0 end ) as g07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.nilai else 0 end ) as g08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.nilai else 0 end ) as g09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.nilai else 0 end ) as g10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.nilai else 0 end ) as g11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.nilai else 0 end ) as g12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.jumlah else 0 end ) as j05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.jumlah else 0 end ) as j06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.jumlah else 0 end ) as j07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.jumlah else 0 end ) as j08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.jumlah else 0 end ) as j09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.jumlah else 0 end ) as j10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.jumlah else 0 end ) as j11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.jumlah else 0 end ) as j12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+
								"   inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+this.filter2+
								"	group by c.kode_bpcc)f on e.kode_bpcc=f.kode_bpcc "+
								"order by e.kode_bpcc";
						
					}
					if (this.jenisLap == "Triwulan")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_jenis e "+
								"left join (select c.kode_bpcc, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+
								"   inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+this.filter2+
								"	group by c.kode_bpcc)f on e.kode_bpcc=f.kode_bpcc "+
								"order by e.kode_bpcc";
					}
					if (this.jenisLap == "Semester")
					{
						var sql="select e.nama, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from agg_bpcc_jenis e "+
								"left join (select c.kode_bpcc, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+
								"   inner join agg_bpcc_jenis c on b.kode_bpcc=c.kode_bpcc "+this.filter2+
								"	group by c.kode_bpcc)f on e.kode_bpcc=f.kode_bpcc "+
								"order by e.kode_bpcc";
					}
				}
				if (this.lap == "Band")
				{
					if (this.jenisLap == "Bulanan")
					{
						var sql="select e.kode_band, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"	   isnull(f.j05,0) as j05,isnull(f.g05,0) as g05,isnull(f.j06,0) as j06,isnull(f.g06,0) as g06,isnull(f.j07,0) as j07,isnull(f.g07,0) as g07,isnull(f.j08,0) as j08,isnull(f.g08,0) as g08, "+
								"	   isnull(f.j09,0) as j09,isnull(f.g09,0) as g09,isnull(f.j10,0) as j10,isnull(f.g10,0) as g10,isnull(f.j11,0) as j11,isnull(f.g11,0) as g11,isnull(f.j12,0) as j12,isnull(f.g12,0) as g12, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from (select distinct kode_band from agg_bpcc_peserta) e "+
								"left join (select a.kode_band, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.nilai else 0 end ) as g05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.nilai else 0 end ) as g06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.nilai else 0 end ) as g07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.nilai else 0 end ) as g08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.nilai else 0 end ) as g09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.nilai else 0 end ) as g10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.nilai else 0 end ) as g11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.nilai else 0 end ) as g12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.jumlah else 0 end ) as j05, "+
								"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.jumlah else 0 end ) as j06, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.jumlah else 0 end ) as j07, "+
								"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.jumlah else 0 end ) as j08, "+
								"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.jumlah else 0 end ) as j09, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.jumlah else 0 end ) as j10, "+
								"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.jumlah else 0 end ) as j11, "+
								"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.jumlah else 0 end ) as j12, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_band)f on e.kode_band=f.kode_band "+
								"order by e.kode_band";
						
					}
					if (this.jenisLap == "Triwulan")
					{
						var sql="select e.kode_band, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02,isnull(f.j03,0) as j03,isnull(f.g03,0) as g03,isnull(f.j04,0) as j04,isnull(f.g04,0) as g04, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from (select distinct kode_band from agg_bpcc_peserta) e "+
								"left join (select a.kode_band, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end ) as g03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.nilai else 0 end ) as g04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end ) as j03, "+
								"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.jumlah else 0 end ) as j04, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_band)f on e.kode_band=f.kode_band "+
								"order by e.kode_band";
					}
					if (this.jenisLap == "Semester")
					{
						var sql="select e.kode_band, "+
								"isnull(f.j01,0) as j01,isnull(f.g01,0) as g01,isnull(f.j02,0) as j02,isnull(f.g02,0) as g02, "+
								"isnull(f.tot_jum,0) as tot_jum,isnull(f.tot_nilai,0) as tot_nilai  "+
								"from (select distinct kode_band from agg_bpcc_peserta) e "+
								"left join (select a.kode_band, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.nilai else 0 end ) as g01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.nilai else 0 end ) as g02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as tot_nilai, "+ 
								"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end ) as j01, "+
								"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.jumlah else 0 end ) as j02, "+
								"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end ) as tot_jum "+ 
								"	from agg_bpcc_peserta a "+
								"   inner join agg_bpcc_param b on a.kode_param=b.kode_param and b.modul='BP' "+this.filter2+
								"	group by a.kode_band)f on e.kode_band=f.kode_band "+
								"order by e.kode_band";
					}
				}
				this.scriptSqlCount = "select 1 ";
				if (this.jenisLap === "Bulanan"){
					this.title = new server_util_arrayList({items:[this.lap,"Jum-Jan","Nilai-Jan","Jum-Feb","Nilai-Feb","Jum-Mar","Nilai-Mar","Jum-Apr","Nilai-Apr","Jum-Mei","Nilai-Mei","Jum-Jun","Nilai-Jun","Jum-Jul","Nilai-Jul","Jum-Agt","Nilai-Agt","Jum-Sep","Nilai-Sep","Jum-Okt","Nilai-Okt","Jum-Nov","Nilai-Nov","Jum-Des","Nilai-Des","Tot Jumlah","Tot Nilai"]});
					this.widthTable = new server_util_arrayList({items:[150,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,80,100]});
					this.fieldType = new server_util_arrayList({items:["S","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Triwulan"){
					this.title = new server_util_arrayList({items:[this.lap,"Jum-TW1","Nilai-TW1","Jum-TW2","Nilai-TW2","Jum-TW3","Nilai-TW3","Jum-TW4","Nilai-TW4","Tot Jumlah","Tot Nilai"]});
					this.widthTable = new server_util_arrayList({items:[150,50,80,50,80,50,80,50,80,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","N","N","N","N","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Semester"){
					this.title = new server_util_arrayList({items:[this.lap,"Jum-Sem1","Nilai-Sem1","Jum-Sem2","Nilai-Jum2","Tot-Jumlah","Tot-Nilai"]});
					this.widthTable = new server_util_arrayList({items:[150,50,100,100,100,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","Y","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_budget_report_flAggBpBln]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var header = "LAPORAN BIAYA PENGOBATAN <br>"+this.lap.toUpperCase()+" "+this.jenisLap.toUpperCase()+" <br>TAHUN "+this.sg1.getCell(2,1);
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_rekapGaji");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_rekapGaji");				
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
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
	},
	sg1onChange: function(sender, col , row){
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		} 
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});