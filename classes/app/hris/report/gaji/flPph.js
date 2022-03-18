window.app_hris_report_gaji_flPph = function(owner)
{
	if (owner)
	{
		window.app_hris_report_gaji_flPph.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_gaji_flPph";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan PPH 21", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:10});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gr_gaji_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Status Pegawai","All",""]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Status Sales","All",""]);
	this.gridLib.SGEditData(this.sg1,8,[0,1,2],["NIK","All",""]);
	this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Karyawan"]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_hris_report_gaji_flPph.extend(window.childForm);
window.app_hris_report_gaji_flPph.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jab, nama from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jab  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jab","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_akun, nama from gr_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_masakun  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_akun","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Status Pegawai",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Status","Keterangan"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 8)
			{
				var flag_gaji="";
				if (this.sg1.getCell(2,7)=="Pegawai")
				{
					flag_gaji=" and a.flag_gaji='NON' ";
				}
				if (this.sg1.getCell(2,7)=="Sales")
				{
					flag_gaji=" and a.flag_gaji='SALES' ";
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+flag_gaji;
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama from gr_karyawan a "+this.filter,
													"select count(*) from gr_karyawan a "+this.filter,
													["a.nik","a.nama"],"and",["NIK","Nama"], false, this.sg1.cells(1,row) == "in");
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],["3","123i","123i","123i","123i","123i","123i","13","123i","13i"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],[0,2,2,2,2,2,2,0,2,0]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from gr_gaji_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 7)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Pegawai","Sales"));
		}
		if (row == 9)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Karyawan","Lokasi Kerja","Direktorat","Departemen","Akun"));
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Pegawai","=","Pegawai"]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["NIK","All",""]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Jenis Laporan","=","Karyawan"]);				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				var flag_gaji="";
				if (this.sg1.getCell(2,7)=="Pegawai")
				{
					flag_gaji=" and b.flag_gaji='NON' ";
				}
				if (this.sg1.getCell(2,7)=="Sales")
				{
					flag_gaji=" and b.flag_gaji='SALES' ";
				}
		    	this.filter = this.filterRep.filterStr("b.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("b.nik",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+flag_gaji;
				this.filter2 = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				if (this.sg1.getCell(2,9)=="Karyawan")
				{
					var sql = "select x.nik,b.nama,d.nama as jabatan,e.nama as loker,f.nama as dept,g.nama as dir,h.akun_pph,i.nama as nama_akun,b.sts_pajak,x.total_bln,x.total,x.b_jab,x.ptkp,x.pkp, "+
							"	   case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' and b.dc='D' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_jab d on b.kode_jab=d.kode_jab and b.kode_lokasi=d.kode_lokasi "+
							"inner join gr_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi "+
							"inner join gr_dept f on b.kode_dept=f.kode_dept and b.kode_lokasi=f.kode_lokasi "+
							"inner join gr_dir g on b.kode_dir=g.kode_dir and b.kode_lokasi=g.kode_lokasi "+
							"inner join gr_gaji_akun h on b.nik=h.nik and b.kode_lokasi=h.kode_lokasi "+
							"inner join gr_masakun i on h.akun_pph=i.kode_akun and h.kode_lokasi=i.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+this.filter+
							" order by x.nik";
							//case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 
					
					this.scriptSqlCount = "select count(x.nik) "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_jab d on b.kode_jab=d.kode_jab and b.kode_lokasi=d.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+this.filter; 
							//"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+;
							
					this.title = new server_util_arrayList({items:["NIK","Nama","Jabatan","Lokasi Kerja","Departemen","Direktorat","Akun PPH","Nama Akun PPH","Status","Total","DISTH","5% BY JBTN","PTKP","PKP","PPH21"]});
					this.widthTable = new server_util_arrayList({items:[60,200,200,200,200,200,80,200,60,90,90,90,90,90,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,9)=="Akun")
				{
					var sql = "select i.kode_akun,i.nama,sum(x.total_bln) as total_bln,sum(x.total) as total,sum(x.b_jab) as b_jab,sum(x.ptkp) as ptkp,sum(x.pkp) as pkp, "+
							"	   sum(case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end) as pph21 "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_akun h on b.nik=h.nik and b.kode_lokasi=h.kode_lokasi "+
							"inner join gr_masakun i on h.akun_pph=i.kode_akun and h.kode_lokasi=i.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by i.kode_akun,i.nama "+
							"order by i.kode_akun";
					
					this.scriptSqlCount = "select count(i.kode_akun) "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_akun h on b.nik=h.nik and b.kode_lokasi=h.kode_lokasi "+
							"inner join gr_masakun i on h.akun_pph=i.kode_akun and h.kode_lokasi=i.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by i.kode_akun,i.nama ";
							
					this.title = new server_util_arrayList({items:["Akun PPH","Nama Akun PPH","Total","DISTH","5% BY JBTN","PTKP","PKP","PPH21"]});
					this.widthTable = new server_util_arrayList({items:[80,300,90,90,90,90,90,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,9)=="Lokasi Kerja")
				{
					var sql = "select e.kode_loker,e.nama,sum(x.total_bln) as total_bln,sum(x.total) as total,sum(x.b_jab) as b_jab,sum(x.ptkp) as ptkp,sum(x.pkp) as pkp, "+
							"	   sum(case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end) as pph21 "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_loker,e.nama "+
							"order by e.kode_loker";
					
					this.scriptSqlCount = "select count(e.kode_loker) "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_loker,e.nama ";							
					this.title = new server_util_arrayList({items:["Kode","Nama Loker","Total","DISTH","5% BY JBTN","PTKP","PKP","PPH21"]});
					this.widthTable = new server_util_arrayList({items:[80,300,90,90,90,90,90,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,9)=="Departemen")
				{
					var sql = "select e.kode_dept,e.nama,sum(x.total_bln) as total_bln,sum(x.total) as total,sum(x.b_jab) as b_jab,sum(x.ptkp) as ptkp,sum(x.pkp) as pkp, "+
							"	   sum(case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end) as pph21 "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_dept e on b.kode_dept=e.kode_dept and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_dept,e.nama "+
							"order by e.kode_dept";
					
					this.scriptSqlCount = "select count(e.kode_dept) "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_dept e on b.kode_dept=e.kode_dept and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_dept,e.nama ";							
					this.title = new server_util_arrayList({items:["Kode","Nama Departemen","Total","DISTH","5% BY JBTN","PTKP","PKP","PPH21"]});
					this.widthTable = new server_util_arrayList({items:[80,300,90,90,90,90,90,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,9)=="Direktorat")
				{
					var sql = "select e.kode_dir,e.nama,sum(x.total_bln) as total_bln,sum(x.total) as total,sum(x.b_jab) as b_jab,sum(x.ptkp) as ptkp,sum(x.pkp) as pkp, "+
							"	   sum(case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end) as pph21 "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_dir e on b.kode_dir=e.kode_dir and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_dir,e.nama "+
							"order by e.kode_dir";
					
					this.scriptSqlCount = "select count(e.kode_dir) "+
							"from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		 d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+this.filter2+
							"     and b.jenis='T' "+ 
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x "+
							"inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
							"inner join gr_dir e on b.kode_dir=e.kode_dir and b.kode_lokasi=e.kode_lokasi "+
							"left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 "+this.filter+
							"group by e.kode_dir,e.nama ";							
					this.title = new server_util_arrayList({items:["Kode","Nama Direktorat","Total","DISTH","5% BY JBTN","PTKP","PKP","PPH21"]});
					this.widthTable = new server_util_arrayList({items:[80,300,90,90,90,90,90,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y","Y","Y","Y"]});
				}
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.lebar = 0;
				for (var i in this.widthTable.objList)
				{
					this.lebar += this.widthTable.get(i);
				}
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hris_report_gaji_flPph]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);
				break;
				case "sqlToHtmlWithHeader":
					this.previewReport(result);
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var footer="* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan";
		var judul="LAPORAN PPH 21";
		var judul2="BULAN "+ubahPeriode(this.sg1.getCell(2,0)).toUpperCase();
		var judul3="PER "+this.sg1.getCell(2,9).toUpperCase();
		var html="<table width='"+this.lebar+"' border='0' cellspacing='2' cellpadding='1'>";
		html+="<tr><td align='center' class='judul_laporan'>"+this.app._namalokasi.toUpperCase()+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul2+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul3+"</td></tr>";
		html+="<tr><td align='center'>"+dthtml+"</td></tr>";
		html+="<tr><td align='left' style='{font-size:9;}'>"+footer+"</td></tr>";
		html+="</table>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  //this.dbLib.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);		
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
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
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "pelamar.xls");
			downloadFile(file);
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
