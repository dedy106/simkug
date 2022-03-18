window.app_kopeg_simpanan_report_flSaldoSimp = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_report_flSaldoSimp.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_simpanan_report_flSaldoSimp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Saldo Simpanan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge= new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from kop_simpbill_m where kode_lokasi ='"+this.lokasi+"' union select distinct periode from periode where kode_lokasi ='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Simpanan","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status Kartu","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Anggota","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_simpanan_report_flSaldoSimp.extend(window.portalui_childForm);
window.app_kopeg_simpanan_report_flSaldoSimp.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_loker, nama from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_loker","nama"],"and",["Kode","Nama Loker"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,0,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_simpbill_m where kode_lokasi ='"+this.lokasi+"' union select distinct periode from periode where kode_lokasi ='"+this.lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
		if (row === 3){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("SP","SW","SS","TB"));
		}
		if (row === 4){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("1. Aktif","0. Tidak"));
		}		
		if (row === 5){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("1. Aktif","0. Tidak"));
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Simpanan","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status Kartu","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Anggota","All",""]);
			}else{			
			this.app._mainForm.reportNavigator.serverDownload = true;	
			this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("cc.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.status_aktif",this.sg1.getCell(1,4),this.sg1.getCell(2,4).substr(0,1),this.sg1.getCell(3,4).substr(0,1),"and")+
							this.filterRep.filterStr("c.sts_aktif",this.sg1.getCell(1,5),this.sg1.getCell(2,5).substr(0,1),this.sg1.getCell(3,5).substr(0,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				
				var jenis = this.filterRep.filterStr("z.jenis",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and") + 
							this.filterRep.filterStr("z.status_aktif",this.sg1.getCell(1,4),this.sg1.getCell(2,4).substr(0,1),this.sg1.getCell(3,4).substr(0,1),"and");
				if (this.sg1.getCell(2,1) == "201003") var vWhere = "";
				else var vWhere = " and (ifnull(d.angsawal,0)+ifnull(e.ambilawal,0)+ifnull(f.pinbukawal,0)+ifnull(g.bungaawal,0)+ifnull(zz.gensimp,0)) >0 ";
				var sql = "select cc.kode_loker,cc.nama as nama_loker,b.jenis,b.akun_simp,c.kode_agg,c.nama as nama_agg,a.no_simp,a.nilai, "+
                          "ifnull(d.angsawal,0)+ifnull(e.ambilawal,0)+ifnull(f.pinbukawal,0)+ifnull(g.bungaawal,0) as saldoawal,ifnull(zz.gensimp,0) as gensimp, "+
						  "ifnull(dd.angsnow,0)+ifnull(gg.bunganow,0) as nambah,"+
						  "(ifnull(ee.ambilnow,0)+ifnull(ff.pinbuknow,0)) * -1 as kurang,"+
						  "ifnull(zzz.nilaiakru,0) as arsimp, "+
						  "ifnull(d.angsawal,0)+ifnull(e.ambilawal,0)+ifnull(f.pinbukawal,0)+ifnull(g.bungaawal,0)+ifnull(dd.angsnow,0)+ifnull(gg.bunganow,0)+ifnull(ee.ambilnow,0)+ifnull(ff.pinbuknow,0) as saldoakhir "+						  
						  "from kop_simp_m a "+						  
						  "	     inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi "+
						  "	     inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "	     inner join kop_loker cc on c.kode_loker=cc.kode_loker and a.kode_lokasi=cc.kode_lokasi "+
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case when u.nilai is null then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end) as nilaiakru "+
						  "	               from kop_simp_d x inner join kop_simpbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
						  "                                  inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "									 left outer join kop_simpangs_d u on x.no_simp=u.no_simp and x.no_bill=u.no_bill and x.kode_lokasi=u.kode_lokasi "+
						  "	               where  y.periode<='"+this.sg1.getCell(2,1)+"' "+jenis+"  group by x.kode_lokasi,x.no_simp) zzz on a.no_simp=zzz.no_simp and a.kode_lokasi=zzz.kode_lokasi "+ 						  
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as gensimp "+
						  "	               from kop_simp_d x inner join kop_simpbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
						  "                                  inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+"  group by x.kode_lokasi,x.no_simp) zz on a.no_simp=zz.no_simp and a.kode_lokasi=zz.kode_lokasi "+ 						  
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as angsawal "+
						  "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
						  "                                      inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) d on a.no_simp=d.no_simp and a.kode_lokasi=d.kode_lokasi "+ 
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambilawal  "+
						  "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='SPB' and y.jenis='SIMP' group by x.kode_lokasi,x.no_simp) e on e.no_simp=a.no_simp and e.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbukawal  "+
						  "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='PINBUK' group by x.kode_lokasi,x.no_simp) f on f.no_simp=a.no_simp and f.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bungaawal  "+
						  "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) g on g.no_simp=a.no_simp and g.kode_lokasi=a.kode_lokasi "+						  
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as angsnow "+
						  "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
						  "                                      inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) dd on a.no_simp=dd.no_simp and a.kode_lokasi=dd.kode_lokasi "+ 
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambilnow  "+
						  "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='SPB' and y.jenis='SIMP' group by x.kode_lokasi,x.no_simp) ee on ee.no_simp=a.no_simp and ee.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbuknow  "+
						  "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='PINBUK' group by x.kode_lokasi,x.no_simp) ff on ff.no_simp=a.no_simp and ff.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bunganow  "+
						  "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) gg on gg.no_simp=a.no_simp and gg.kode_lokasi=a.kode_lokasi "+
						  this.filter+vWhere+" order by cc.kode_loker,b.jenis,c.kode_agg,a.no_simp";    
				this.scriptSqlCount = "select count(*) "+
						  "from kop_simp_m a "+						  
						  "	     inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi "+
						  "	     inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "	     inner join kop_loker cc on c.kode_loker=cc.kode_loker and a.kode_lokasi=cc.kode_lokasi "+
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as gensimp "+
						  "	               from kop_simp_d x inner join kop_simpbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
						  "                                  inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) zz on a.no_simp=zz.no_simp and a.kode_lokasi=zz.kode_lokasi "+ 						  
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as angsawal "+
						  "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
						  "                                      inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) d on a.no_simp=d.no_simp and a.kode_lokasi=d.kode_lokasi "+ 
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambilawal  "+
						  "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='SPB' and y.jenis='SIMP' group by x.kode_lokasi,x.no_simp) e on e.no_simp=a.no_simp and e.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbukawal  "+
						  "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='PINBUK' group by x.kode_lokasi,x.no_simp) f on f.no_simp=a.no_simp and f.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bungaawal  "+
						  "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode<'"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) g on g.no_simp=a.no_simp and g.kode_lokasi=a.kode_lokasi "+						  
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as angsnow "+
						  "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
						  "                                      inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) dd on a.no_simp=dd.no_simp and a.kode_lokasi=dd.kode_lokasi "+ 
						  "	     left outer join "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambilnow  "+
						  "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='SPB' and y.jenis='SIMP' group by x.kode_lokasi,x.no_simp) ee on ee.no_simp=a.no_simp and ee.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbuknow  "+
						  "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" and x.modul='PINBUK' group by x.kode_lokasi,x.no_simp) ff on ff.no_simp=a.no_simp and ff.kode_lokasi=a.kode_lokasi "+
						  "	     left outer join  "+
						  "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bunganow  "+
						  "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
						  "                                       inner join kop_simp_m z on x.no_simp=z.no_simp and x.kode_lokasi=z.kode_lokasi "+
						  "	               where  y.periode='"+this.sg1.getCell(2,1)+"' "+jenis+" group by x.kode_lokasi,x.no_simp) gg on gg.no_simp=a.no_simp and gg.kode_lokasi=a.kode_lokasi "+
						  this.filter+"  ";
			
				this.title = new server_util_arrayList({items:["Kode Loker","Loker","Jenis","Akun Simp","Anggota","Nama","No. Kartu","Nilai","Saldo Awal Simp","Nilai Akru","Penambahan","Pengurangan","Saldo Simp Blm Setor","Saldo Akhir Simp"]});
				this.widthTable = new server_util_arrayList({items:[100,100,100,100,100,100,100,100,100,100,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N","N","N","N","N","N","N"]});
				//var dthtml = this.dbLarge.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();				
				var dthtml = this.dbLarge.sqlToHtmlWithHeader(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,undefined, undefined, undefined,"DAFTAR SALDO SIMPANAN",this.app._namalokasi.toUpperCase(),this.sg1.getCell(2,1));
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_simpanan_report_flSaldoSimp]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){		
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);
			break;
			case "sqlToHtmlWithHeader":
				this.viewer.preview(result);
			break;
		}
	},
	doSelectedPage: function(sender, page){
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		//this.previewReport(dthtml);
		var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,undefined, undefined, undefined,"DAFTAR SALDO SIMPANAN",this.app._namalokasi.toUpperCase(),this.sg1.getCell(2,1));
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR SALDO SIMPANAN<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
		  switch(sender.getName())
		  {
			case "allBtn" :
			  //var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
			  //this.previewReport(dthtml);			  
			  var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,undefined,undefined, undefined, undefined,"DAFTAR SALDO SIMPANAN",this.app._namalokasi.toUpperCase(),this.sg1.getCell(2,1));			  
			  this.previewReport(dthtml);	
			  break;
			case "pdfBtn" :      
			  var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("pdf");			
				html.add(new Date().valueOf()+"_angsKol");				
			  this.viewer.useIframe(upDownHtml(html));
			  break;
			case "xlsBtn" :	
			  var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("xls");			
				html.add(new Date().valueOf()+"_angsKol");				
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
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
				this.app._mainForm.reportNavigator.serverDownload = false;
				this.viewer.setVisible(false);
				this.p1.setVisible(true);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);
			  break;
		  }
		 }catch(e){
			 alert(e);
		}
	},
	sg1onChange: function(sender, col , row){
	    if (col===1)
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
