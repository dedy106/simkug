window.app_kopeg_piutang_report_flSaldoAR = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_report_flSaldoAR.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_piutang_report_flSaldoAR";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Saldo Piutang Umum dan Piutang Kontrak", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
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
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from kop_pinjangs_m where kode_lokasi ='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode PP","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Modul","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_piutang_report_flSaldoAR.extend(window.portalui_childForm);
window.app_kopeg_piutang_report_flSaldoAR.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_pp, nama  from pp where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and tipe='posting'",
											  "select count(kode_pp) from pp where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and tipe='posting'",
											  ["kode_pp","nama"],"and",["Kode","Nama PP"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='003' ",
											  "select count(*)            from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='003' ",
											  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_cust, nama  from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  "select count(kode_cust) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  ["kode_cust","nama"],"and",["Kode","Nama Cust"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","123","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","123","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,0,2,2,2,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_ar_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["PU. Piutang Umum","PR. Proyek"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode PP","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Modul","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("b.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.akun_ar",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("c.kode_cust",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.getCell(1,5).toUpperCase() != "ALL") {
					if (this.sg1.getCell(2,5).substr(0,2) == 'PU') {
						var sql = "select b.kode_pp,b.nama as nama_pp,c.kode_cust,c.nama as nama_cust,a.no_ar,a.no_dokumen,'-' as no_kontrak, date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.akun_ar, "+ 
								  "       case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as sawal, "+
								  "       case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as tagihan, "+
								  "       ifnull(yy.bayarnow,0)+ifnull(zz.rekonnow,0) * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as bayarnow, "+
								  "       (  (case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end) + (case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end) - (ifnull(yy.bayarnow,0)+ifnull(zz.rekonnow,0))) * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end "+
								  "from kop_ar_m a "+						  
								  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
								  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonawal "+
								  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) z on z.no_ar=a.no_ar and z.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
								  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonnow "+
								  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) zz on zz.no_ar=a.no_ar and zz.kode_lokasi=a.kode_lokasi "+
								  this.filter+"  and case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end > 0 order by b.kode_pp,a.akun_ar,a.no_ar ";   
						this.scriptSqlCount = "select count(*) "+
								  "from kop_ar_m a "+						  
								  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
								  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonawal "+
								  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) z on z.no_ar=a.no_ar and z.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
								  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonnow "+
								  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) zz on zz.no_ar=a.no_ar and zz.kode_lokasi=a.kode_lokasi "+
								  this.filter+"  and (case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end) > 0 ";  
					}
					if (this.sg1.getCell(2,5).substr(0,2) == 'PR') {
						var sql = "select b.kode_pp,b.nama as nama_pp,c.kode_cust,c.nama as nama_cust,a.no_ar,a.no_dokumen,a.no_proyek as no_kontrak, date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.akun_ar, "+ 
								  "       case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0) else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as sawal, "+
								  "       case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as tagihan, "+
								  "       ifnull(yy.bayarnow,0) * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as bayarnow, "+
								  "       ( ( case when a.periode < '"+this.sg1.getCell(2,1)+"' then (a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0)) else 0 end ) + (case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end) - (ifnull(yy.bayarnow,0)) )* case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end  "+
								  "from kop_arproyek_m a "+						  
								  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
								  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
								  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+								  
								  this.filter+"  and case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0) else 0 end > 0 order by b.kode_pp,a.akun_ar,a.no_ar ";   
						this.scriptSqlCount = "select count(*) "+
								  "from kop_arproyek_m a "+						  
								  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
								  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
								  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
								  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
								  this.filter+"  and (case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0) else 0 end) > 0 ";  
					}
				} else {
					var sql = "select b.kode_pp,b.nama as nama_pp,c.kode_cust,c.nama as nama_cust,a.no_ar,a.no_dokumen,'-' as no_kontrak, date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.akun_ar, "+ 
							  "       case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as sawal, "+
							  "       case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as tagihan, "+
							  "       ifnull(yy.bayarnow,0)+ifnull(zz.rekonnow,0) * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as bayarnow, "+
							  "       ((case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end) + (case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end) - (ifnull(yy.bayarnow,0)+ifnull(zz.rekonnow,0)))* case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end "+
							  "from kop_ar_m a "+						  
							  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
							  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonawal "+
							  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) z on z.no_ar=a.no_ar and z.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
							  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonnow "+
							  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) zz on zz.no_ar=a.no_ar and zz.kode_lokasi=a.kode_lokasi "+
							  this.filter+"  and case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end > 0 "+							  
							  "union "+
							  "select b.kode_pp,b.nama as nama_pp,c.kode_cust,c.nama as nama_cust,a.no_ar,a.no_dokumen,a.no_proyek as no_kontrak, date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.akun_ar, "+ 
							  "       case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0) else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as sawal, "+
							  "       case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as tagihan, "+
							  "       ifnull(yy.bayarnow,0) * case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end as bayarnow, "+
							  "       ((case when a.periode < '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn-ifnull(y.bayarawal,0) else 0 end) + (case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+a.nilai_ppn else 0 end) - (ifnull(yy.bayarnow,0)))* case when substr(a.no_ar,16,1) = 'r' then -1 else 1 end "+
							  "from kop_arproyek_m a "+						  
							  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
							  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+							  
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
							  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+							  
							  this.filter+"  and case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0) else 0 end > 0 "+
							  "order by kode_pp,akun_ar,no_ar ";
							     
					this.scriptSqlCount = "select count(*) from ( "+
							  "	  select a.no_ar from kop_ar_m a "+						  
							  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
							  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonawal "+
							  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) z on z.no_ar=a.no_ar and z.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
							  "                            from kop_arbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as rekonnow "+
							  "                            from kop_rekon_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) zz on zz.no_ar=a.no_ar and zz.kode_lokasi=a.kode_lokasi "+
							     this.filter+"  and (case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0)-ifnull(z.rekonawal,0) else 0 end) > 0 "+
							  "union "+	 
							  "   select a.no_ar from kop_arproyek_m a "+						  
							  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "	  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarawal "+
							  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) y on y.no_ar=a.no_ar and y.kode_lokasi=a.kode_lokasi "+
							  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as bayarnow "+
							  "                            from kop_proyekbayar_d where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_ar,kode_lokasi) yy on yy.no_ar=a.no_ar and yy.kode_lokasi=a.kode_lokasi "+
								  this.filter+"  and (case when a.periode <= '"+this.sg1.getCell(2,1)+"' then a.nilai-ifnull(y.bayarawal,0) else 0 end) > 0 "+
							  ") a";  								
				}
				this.title = new server_util_arrayList({items:["Kode PP","Nama PP","Kode Cust","Nama Cust","No. Bukti","No Dokumen","No Kontrak","Tanggal","Keterangan","Akun Piutang","Saldo Awal","Nilai Tagihan","Nilai Pembayaran","Saldo Akhir"]});
				this.widthTable = new server_util_arrayList({items:[]});
				
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_piutang_report_flSaldoAR]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR SALDO PIUTANG UMUM & PIUTANG KONTRAK<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
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
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);
	      break;
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
