window.app_hris_report_gaji_flRekapGaji = function(owner)
{
	if (owner)
	{
		window.app_hris_report_gaji_flRekapGaji.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_gaji_flRekapGaji";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Gaji", 2);
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
	this.doSelectCell(this.sg1,2,9);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_hris_report_gaji_flRekapGaji.extend(window.childForm);
window.app_hris_report_gaji_flRekapGaji.implement({
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
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Karyawan","Lokasi Kerja","Direktorat","Departemen","Akun","Akun Lokasi Kerja","Akun Departemen","Akun Direktorat"));
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
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Status Pegawai","All",""]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Status Sales","All",""]);
				this.gridLib.SGEditData(this.sg1,8,[0,1,2],["NIK","All",""]);
				this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Karyawan"]);			
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.initColumn();
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
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.nik",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+flag_gaji;
				this.filter2 = this.filterRep.filterStr("b.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("b.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				if (this.sg1.getCell(2,9)=="Karyawan")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.nik,a.nama,j.nama as jabatan,e.nama as loker,f.nama as dept,g.nama as dir,h.akun_pph,i.nama as nama_akun,k.nama as status_sdm,a.flag_gaji,"+param1+param2+
							"from gr_karyawan a "+
							"inner join (select distinct b.nik "+
							"			from gr_gaji_d b "+this.filter2+
							"			)d on a.nik=d.nik "+
							"inner join gr_jab j on a.kode_jab=j.kode_jab and a.kode_lokasi=j.kode_lokasi "+
							"inner join gr_loker e on a.kode_loker=e.kode_loker and a.kode_lokasi=e.kode_lokasi "+
							"inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=f.kode_lokasi "+
							"inner join gr_dir g on a.kode_dir=g.kode_dir and a.kode_lokasi=g.kode_lokasi "+
							"left join gr_gaji_akun h on a.nik=h.nik and a.kode_lokasi=h.kode_lokasi "+
							"left join gr_masakun i on h.akun_pph=i.kode_akun and h.kode_lokasi=i.kode_lokasi "+
							"inner join gr_status_sdm k on a.sts_sdm=k.sts_sdm and a.kode_lokasi=k.kode_lokasi "+
							"left join (select a.nik,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by a.nik)b on a.nik=b.nik "+
							"left join (select a.nik,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by a.nik)c on a.nik=c.nik "+this.filter+
							"order by a.nik";
					
					this.scriptSqlCount = "select count(a.nik) "+
							"from gr_karyawan a "+
							"inner join (select distinct b.nik "+
							"			from gr_gaji_d b "+this.filter2+
							"			)d on a.nik=d.nik "+this.filter;
							
					this.title = new server_util_arrayList({items:["NIK","Nama","Jabatan","Lokasi Kerja","Departemen","Direktorat","Akun","Nama Akun","Status Pegawai","Status Sales"]});
					this.widthTable = new server_util_arrayList({items:[60,200,200,200,200,200,80,200,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				
				if (this.sg1.getCell(2,9)=="Lokasi Kerja")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_loker,a.nama,"+param1+param2+
							"from gr_loker a "+
							"inner join (select distinct a.kode_loker "+
							"			from gr_gaji_d b "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter2+
							"			)d on a.kode_loker=d.kode_loker "+
							"left join (select a.kode_loker,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by a.kode_loker)b on a.kode_loker=b.kode_loker "+
							"left join (select a.kode_loker,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by a.kode_loker)c on a.kode_loker=c.kode_loker " ;
					this.scriptSqlCount = "select count(a.kode_loker) "+
							"from gr_loker a "+
							"inner join (select distinct b.kode_loker "+
							"			from gr_gaji_d b "+this.filter2+
							"			)d on a.kode_loker=d.kode_loker ";
					
					this.title = new server_util_arrayList({items:["Kode","Nama Loker"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Direktorat")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_dir,a.nama,"+param1+param2+
							"from gr_dir a "+
							"inner join (select distinct a.kode_dir "+
							"			from gr_gaji_d b "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter2+
							"			)d on a.kode_dir=d.kode_dir "+
							"left join (select a.kode_dir,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by a.kode_dir)b on a.kode_dir=b.kode_dir "+
							"left join (select a.kode_dir,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by a.kode_dir)c on a.kode_dir=c.kode_dir " ;
					this.scriptSqlCount = "select count(a.kode_dir) "+
							"from gr_dir a "+
							"inner join (select distinct b.kode_dir "+
							"			from gr_gaji_d b "+this.filter2+
							"			)d on a.kode_dir=d.kode_dir ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Direktorat"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Departemen")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_dept,a.nama,"+param1+param2+
							"from gr_dept a "+
							"inner join (select distinct a.kode_dept "+
							"			from gr_gaji_d b "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter2+
							"			)d on a.kode_dept=d.kode_dept "+
							"left join (select a.kode_dept,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by a.kode_dept)b on a.kode_dept=b.kode_dept "+
							"left join (select a.kode_dept,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by a.kode_dept)c on a.kode_dept=c.kode_dept " ;
					this.scriptSqlCount = "select count(a.kode_dept) "+
							"from gr_dept a "+
							"inner join (select distinct b.kode_dept "+
							"			from gr_gaji_d b "+this.filter2+
							"			)d on a.kode_dept=d.kode_dept ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Departemen"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Akun")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_akun,a.nama,"+param1+param2+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"left join (select d.akun_gaji as kode_akun,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by d.akun_gaji)b on a.kode_akun=b.kode_akun "+
							"left join (select d.akun_gaji as kode_akun,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by d.akun_gaji)c on a.kode_akun=c.kode_akun " ;
					
					this.scriptSqlCount = "select count(a.kode_akun) "+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Akun"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Akun Lokasi Kerja")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_akun,a.nama,e.nama as loker,"+param1+param2+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_loker,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi "+
							"left join (select d.akun_gaji as kode_akun,a.kode_loker,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_loker)b on d.kode_akun=b.kode_akun and d.kode_loker=b.kode_loker "+
							"left join (select d.akun_gaji as kode_akun,a.kode_loker,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_loker)c on d.kode_akun=c.kode_akun and d.kode_loker=c.kode_loker ";
					
					this.scriptSqlCount =  "select count(a.kode_akun) "+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_loker,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Akun","Lokasi Kerja"]});
					this.widthTable = new server_util_arrayList({items:[60,200,200]});
					this.fieldType = new server_util_arrayList({items:["S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Akun Departemen")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_akun,a.nama,e.nama as dept,"+param1+param2+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_dept,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_dept e on d.kode_dept=e.kode_dept and d.kode_lokasi=e.kode_lokasi "+
							"left join (select d.akun_gaji as kode_akun,a.kode_dept,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_dept)b on d.kode_akun=b.kode_akun and d.kode_dept=b.kode_dept "+
							"left join (select d.akun_gaji as kode_akun,a.kode_dept,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_dept)c on d.kode_akun=c.kode_akun and d.kode_dept=c.kode_dept ";
					
					this.scriptSqlCount = "select count(a.kode_akun) "+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_dept,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_dept e on d.kode_dept=e.kode_dept and d.kode_lokasi=e.kode_lokasi ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Akun","Departemen"]});
					this.widthTable = new server_util_arrayList({items:[60,200,200]});
					this.fieldType = new server_util_arrayList({items:["S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,9)=="Akun Direktorat")
				{
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_pdpt, ";
					var param2="";
					for (var c in this.colTitle2) 
					{
						param2+="isnull(c."+this.colTitle2[c]+",0) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_pot,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case b.kode_param when '"+this.colTitle[c]+"' then b.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle2) 
					{
						param4+=" sum(case b.kode_param when '"+this.colTitle2[c]+"' then b.nilai else 0 end) as "+this.colTitle2[c].toLowerCase()+","; 
					}
					param4+="sum(nilai) as total ";
					var sql = "select a.kode_akun,a.nama,e.nama as dir,"+param1+param2+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_dir,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_dir e on d.kode_dir=e.kode_dir and d.kode_lokasi=e.kode_lokasi "+
							"left join (select d.akun_gaji as kode_akun,a.kode_dir,"+param3+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='D' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_dir)b on d.kode_akun=b.kode_akun and d.kode_dir=b.kode_dir "+
							"left join (select d.akun_gaji as kode_akun,a.kode_dir,"+param4+
							"			from gr_karyawan a "+
							"			inner join gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"		    and c.dc='C' and c.jenis='T' "+
							"			group by d.akun_gaji,a.kode_dir)c on d.kode_akun=c.kode_akun and d.kode_dir=c.kode_dir ";
					
					this.scriptSqlCount = "select count(a.kode_akun) "+
							"from gr_masakun a "+
							"inner join (select distinct d.akun_gaji as kode_akun,a.kode_dir,a.kode_lokasi "+
							"			from gr_gaji_d b "+
							"		    inner join gr_gaji_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"		    inner join gr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		    inner join gr_gaji_akun d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"           and c.jenis='T' "+
							"			)d on a.kode_akun=d.kode_akun "+
							"inner join gr_dir e on d.kode_dir=e.kode_dir and d.kode_lokasi=e.kode_lokasi ";
							
					this.title = new server_util_arrayList({items:["Kode","Nama Akun","Direktorat"]});
					this.widthTable = new server_util_arrayList({items:[60,200,200]});
					this.fieldType = new server_util_arrayList({items:["S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N"]});
					//pendapatan
					for (var c in this.colTitle) 
					{
						this.title.add(this.namaField[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Pendapatan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//potongan
					for (var c in this.colTitle2) 
					{
						this.title.add(this.namaField2[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Potongan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Total Pendapatan Ditransfer");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
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
			systemAPI.alert("[app_hris_report_gaji_flRekapGaji]::mainButtonClick:"+e);
		}
	},
	initColumn: function(){
		try{		
			var sql="select a.kode_param,a.nama from gr_gaji_param a "+
					"inner join (select distinct kode_param from gr_gaji_d) b on a.kode_param=b.kode_param "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and a.dc='D' and a.jenis='T' order by a.no_urut"
            var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data != "string"){											
				var line,title = [], nama = [];
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_param);						
					this.dataParam.set(line.kode_param, line);
					nama.push(line.nama);						
				}										
				this.colTitle = title;
				this.namaField = nama;
			}
			var sql="select a.kode_param,a.nama from gr_gaji_param a "+
					"inner join (select distinct kode_param from gr_gaji_d) b on a.kode_param=b.kode_param "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and a.dc='C' and a.jenis='T' order by a.no_urut"
            var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data != "string"){											
				var line,title = [], nama = [];
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_param);						
					this.dataParam.set(line.kode_param, line);
					nama.push(line.nama);						
				}										
				this.colTitle2 = title;
				this.namaField2 = nama;
			}
		}catch(e){
			alert(e);
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
		var judul="LAPORAN REKAP GAJI";
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
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
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
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.viewer.getContent();
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
