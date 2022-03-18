window.app_saku2_report_ak_flAkSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_ak_flAkSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_ak_flAkSaldo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode "+
									"from (select max(periode) as periode from aka_rekon_m "+
									"union "+
									"select max(periode) from aka_bill_m) a ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode Rekon","<=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jurusan","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Angkatan","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("NIM","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("No Invoice","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Bentuk Laporan","=","Jurusan"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,6);
};
window.app_saku2_report_ak_flAkSaldo.extend(window.childForm);
window.app_saku2_report_ak_flAkSaldo.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_jur, a.nama from aka_jurusan a   "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  "select count(a.kode_jur) from aka_jurusan a "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  ["a.kode_jur","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_akt, a.nama from aka_angkatan a   "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  "select count(a.kode_akt) from aka_angkatan a "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  ["a.kode_akt","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 4)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				var sql1="select a.nim,a.nama from aka_mahasiswa a "+filter; 
				var sql2="select count(distinct a.nim) from aka_mahasiswa a "+filter;
				this.filterRep.ListDataSGFilter(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.nim","a.nama"),"and",new Array("NIM","Nama"),"and");
			}	
			if (row ==5)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.filterRep.ListDataSGFilter(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_inv,a.periode "+
												"from (select distinct no_inv,nim,periode,kode_lokasi "+
												"	  from aka_bill_d) a "+
												"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+this.filter,
												"select count(a.no_inv) "+
												"from (select distinct no_inv,nim,periode,kode_lokasi "+
												"	  from aka_bill_d) a "+
												"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+this.filter,
												new Array("a.no_inv","a.periode"),"and",new Array("No Invoice","Periode"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","6","123","123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select a.periode "+
									"from (select distinct periode,kode_lokasi from aka_rekon_m "+
									"union "+
									"select distinct periode,kode_lokasi from aka_bill_m) a "+
									"where a.kode_lokasi='"+this.app._lokasi+"' order by a.periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Jurusan","Angkatan","Jurusan Angkatan","Mahasiswa","Invoice"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode Rekon","<=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jurusan","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Angkatan","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("NIM","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("No Invoice","All",""));
				this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Bentuk Laporan","=","Jurusan"));
			}else{
				//this.app._mainForm.reportNavigator.serverDownload = true;
				this.initColumn();
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	var result  = new arrayMap();		
				if (this.sg1.getCell(2,6)=="Jurusan")
				{
					this.filter = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.filter2 = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_tagihan, ";
					var param2="";
					for (var c in this.colTitle) 
					{
						param2+="isnull(c."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_bayar,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case x.kode_produk when '"+this.colTitle[c]+"' then x.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					
					var sql = "select a.kode_jur,a.nama,"+param1+param2+
							"from aka_jurusan a "+
							"inner join (select y.kode_jur, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.kode_jur "+
							"			)b on a.kode_jur=b.kode_jur "+
							"left join (select y.kode_jur, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.kode_jur "+
							"		  )c on a.kode_jur=c.kode_jur "+
							" order by a.kode_jur ";
					
					this.scriptSqlCount =  "select count(a.nim) "+param1+param2+
							"from aka_mahasiswa a "+
							"inner join (select distinct nim, "+param3+
							"			from aka_bill_d "+
							"			group by nim "+
							"			)b on a.nim=b.nim ";
					
					this.title = new server_util_arrayList({items:["Kode Jurusan","Nama Jurusan"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//tagihan
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Tagihan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//pembayaran
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Rekon");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Saldo");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,6)=="Angkatan")
				{
					this.filter = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.filter2 = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_tagihan, ";
					var param2="";
					for (var c in this.colTitle) 
					{
						param2+="isnull(c."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_bayar,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case x.kode_produk when '"+this.colTitle[c]+"' then x.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					
					var sql = "select a.kode_akt,a.nama,"+param1+param2+
							"from aka_Angkatan a "+
							"inner join (select y.kode_akt, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.kode_akt "+
							"			)b on a.kode_akt=b.kode_akt "+
							"left join (select y.kode_akt, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.kode_akt "+
							"		  )c on a.kode_akt=c.kode_akt "+
							" order by a.kode_akt ";
					
					this.scriptSqlCount =  "select count(a.nim) "+param1+param2+
							"from aka_mahasiswa a "+
							"inner join (select distinct nim, "+param3+
							"			from aka_bill_d "+
							"			group by nim "+
							"			)b on a.nim=b.nim ";
					
					this.title = new server_util_arrayList({items:["Kode Angkatan","Nama Angkatan"]});
					this.widthTable = new server_util_arrayList({items:[60,200]});
					this.fieldType = new server_util_arrayList({items:["S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N"]});
					//tagihan
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Tagihan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//pembayaran
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Rekon");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Saldo");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,6)=="Jurusan Angkatan")
				{
					this.filter = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.filter2 = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_tagihan, ";
					var param2="";
					for (var c in this.colTitle) 
					{
						param2+="isnull(c."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_bayar,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case x.kode_produk when '"+this.colTitle[c]+"' then x.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					
					var sql = "select a.kode_jur,a.nama,a.kode_akt,"+param1+param2+
							"from (select a.kode_jur,a.nama,b.kode_akt "+
							"	   from aka_jurusan a "+
							"	   cross join aka_angkatan b) a "+
							"inner join (select y.kode_jur,y.kode_akt, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.kode_jur,y.kode_akt "+
							"			)b on a.kode_jur=b.kode_jur and a.kode_akt=b.kode_akt "+
							"left join (select y.kode_jur,y.kode_akt, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.kode_jur,y.kode_akt "+
							"		  )c on a.kode_jur=c.kode_jur and a.kode_akt=c.kode_akt "+
							" order by a.kode_jur ";
					
					this.scriptSqlCount =  "select ount(a.kode_jur) "+
							"from (select a.kode_jur,a.nama,b.kode_akt "+
							"	   from aka_jurusan a "+
							"	   cross join aka_angkatan b) a "+
							"inner join (select y.kode_jur,y.kode_akt, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.kode_jur,y.kode_akt "+
							"			)b on a.kode_jur=b.kode_jur and a.kode_akt=b.kode_akt "+
							"left join (select y.kode_jur,y.kode_akt, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.kode_jur,y.kode_akt "+
							"		  )c on a.kode_jur=c.kode_jur and a.kode_akt=c.kode_akt ";
					
					this.title = new server_util_arrayList({items:["Kode Jurusan","Nama Jurusan","Angkatan"]});
					this.widthTable = new server_util_arrayList({items:[60,200,60]});
					this.fieldType = new server_util_arrayList({items:["S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N"]});
					//tagihan
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Tagihan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//pembayaran
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Rekon");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Saldo");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,6)=="Mahasiswa")
				{
					this.filter = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("x.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
					this.filter2 = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("x.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0)-isnull(e."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0)-isnull(e.total,0) as total_tagihan, ";
					var param2="";
					for (var c in this.colTitle) 
					{
						param2+="isnull(c."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_bayar,isnull(b.total,0)-isnull(e.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case x.kode_produk when '"+this.colTitle[c]+"' then x.nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					var param4="";
					for (var c in this.colTitle) 
					{
						param4+=" sum(case x.kode_produk when '"+this.colTitle[c]+"' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param4+="sum(case x.dc when 'D' then x.nilai else -x.nilai end) as total ";
					
					var sql = "select a.nim,a.nama,a.kode_jur,d.nama as nama_jur,a.kode_akt, "+param1+param2+
							"from aka_mahasiswa a "+
							"inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi "+
							"inner join (select y.nim, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.nim "+
							"			)b on a.nim=b.nim "+
							"left join (select y.nim, "+param4+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.nim "+
							"		  )c on a.nim=c.nim "+
							"left join (select y.nim, "+param4+
							"		    from aka_batal_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.nim "+
							"		  )e on a.nim=e.nim "+
							" order by a.nim ";
					
					this.scriptSqlCount = "select count(a.nim) "+
							"from aka_mahasiswa a "+
							"inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi "+
							"inner join (select y.nim, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.nim "+
							"			)b on a.nim=b.nim "+
							"left join (select y.nim, "+param4+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.nim "+
							"		  )c on a.nim=c.nim ";
					
					this.title = new server_util_arrayList({items:["NIM","Nama","Kode Jurusan","Nama Jurusan","Angkatan"]});
					this.widthTable = new server_util_arrayList({items:[80,200,60,150,60]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N"]});
					//tagihan
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Tagihan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//pembayaran
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Rekon");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Saldo");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				if (this.sg1.getCell(2,6)=="Invoice")
				{
					this.filter = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("x.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("x.no_inv",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
					this.filter2 = this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("y.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("y.kode_akt",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("x.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("x.no_inv",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var param1="";
					for (var c in this.colTitle) 
					{
						param1+="isnull(b."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param1+="isnull(b.total,0) as total_tagihan, ";
					var param2="";
					for (var c in this.colTitle) 
					{
						param2+="isnull(c."+this.colTitle[c]+",0) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param2+="isnull(c.total,0) as total_bayar,isnull(b.total,0)-isnull(c.total,0) as saldo ";
					var param3="";
					for (var c in this.colTitle) 
					{
						param3+=" sum(case kode_produk when '"+this.colTitle[c]+"' then nilai else 0 end) as "+this.colTitle[c].toLowerCase()+","; 
					}
					param3+="sum(nilai) as total ";
					
					var sql = "select a.nim,a.nama,a.kode_jur,d.nama as nama_jur,a.kode_akt,e.no_inv, "+param1+param2+
							"from aka_mahasiswa a "+
							"inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi "+
							"inner join (select nim,no_inv "+
							"			 from aka_bill_d "+
							"			 group by nim,no_inv)e on a.nim=e.nim "+
							"inner join (select y.nim,x.no_inv, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.nim,x.no_inv "+
							"			)b on a.nim=b.nim and b.no_inv=e.no_inv "+
							"left join (select y.nim,x.no_inv, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.nim,x.no_inv "+
							"		  )c on a.nim=c.nim and e.no_inv=c.no_inv "+
							" order by a.nim,e.no_inv ";
					
					this.scriptSqlCount =   "select count(a.nim) "+
							"from aka_mahasiswa a "+
							"inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi "+
							"inner join (select nim,no_inv "+
							"			 from aka_bill_d "+
							"			 group by nim,no_inv)e on a.nim=e.nim "+
							"inner join (select y.nim,x.no_inv, "+param3+
							"			from aka_bill_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter+
							"			group by y.nim,x.no_inv "+
							"			)b on a.nim=b.nim and b.no_inv=e.no_inv "+
							"left join (select y.nim,x.no_inv, "+param3+
							"		    from aka_rekon_d x "+
							"			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi "+this.filter2+
							"		   group by y.nim,x.no_inv "+
							"		  )c on a.nim=c.nim and e.no_inv=c.no_inv ";
					
					this.title = new server_util_arrayList({items:["NIM","Nama","Kode Jurusan","Jurusan","Angkatan","No Invoice"]});
					this.widthTable = new server_util_arrayList({items:[80,200,60,150,60,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N"]});
					//tagihan
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Tagihan");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					//pembayaran
					for (var c in this.colTitle) 
					{
						this.title.add(this.colTitle[c]);
						this.widthTable.add(80);
						this.fieldType.add("N");
						this.summary.add("Y");
					}
					this.title.add("Total Rekon");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
					this.title.add("Saldo");
					this.widthTable.add(90);
					this.fieldType.add("N");
					this.summary.add("Y");
				}
				
				
				
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_ak_flAkSaldo]::mainButtonClick:"+e);
		}
	},
	initColumn: function(){
		try{		
			var sql="select a.kode_produk,a.nama from aka_produk a "+
					"inner join (select distinct kode_produk from aka_bill_d) b on a.kode_produk=b.kode_produk "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut"
            var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data != "string"){											
				var line,title = [], nama = [];
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_produk);						
					this.dataParam.set(line.kode_produk, line);
					nama.push(line.nama);						
				}										
				this.colTitle = title;
				this.namaField = nama;
				
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm+"<br>Periode : "+this.sg1.getCell(2,1)+"<br>Per "+this.sg1.getCell(2,6)+" </div>";
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
		  //this.dbLib.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);		
		  //old
		  //var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  //this.previewReport(dthtml);
			var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN SALDO PIUTANG MAHASISWA<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
			var d = new Date();
			html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
			html += "</div>";
			var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
			previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "karyawan.xls");
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
