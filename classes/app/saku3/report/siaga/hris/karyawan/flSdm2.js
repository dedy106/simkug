window.app_saku3_report_siaga_hris_karyawan_flSdm2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_karyawan_flSdm2.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_hris_karyawan_flSdm2";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;saiCBBL");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:17});
		 this.p2 = new panel(this,{bound:[10,230,702,280],border:3, caption:"Filter"});
		
		this.sg2 = new saiGrid(this.p2,{bound:[20,33,300,230], colCount:1,colTitle:["Kolom"], 
				colWidth:[[0],[200]],dblClick:[this,"doDblClick"],
				readOnly:true
			});	
				
		this.sg3 = new saiGrid(this.p2,{bound:[375,33,300,230],
				colCount:1,colTitle:["Kolom"], 
				colWidth:[[0],[200]],dblClick:[this,"doDblClick"],
				readOnly:true		
			});		
					
		this.rightBtn = new imageButton(this.p2,{bound:[335,100,22,22], image:"icon/"+system.getThemes()+"/bright.png", hint:"Geser Kanan", click:[this,"entriesClick"]});				
			
		this.leftBtn = new imageButton(this.p2,{bound:[335,190,22,22], image:"icon/"+system.getThemes()+"/bleft.png", hint:"Geser Kiri", click:[this,"entriesClick"]});		
		this.allRightBtn = new imageButton(this.p2,{bound:[335,120,22,22], image:"icon/"+system.getThemes()+"/imgLast.png",hint:"Geser Kanan Semua", click:[this,"entriesClick"]});		
		this.allLeftBtn = new imageButton(this.p2,{bound:[335,170,22,22],image:"icon/"+system.getThemes()+"/imgFirst.png", hint:"Geser Kiri Semua", click:[this,"entriesClick"]});
		
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.standarLib = new util_standar();
	// this.cb_kol.setSQL("select kode_jenis, nama from gr_kolom_jenis_m where kode_klp='HR'",["kode_jenis","nama"],false,["Kode Jenis","Nama"],"and","Data Kolom",true);
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Status SDM","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Direktorat","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Departemen","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Unit","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Jabatan","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Lokasi Kantor","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Status Pajak","All",""));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2), new Array("Gender","All",""));
	this.gridLib.SGEditData(this.sg1,9,new Array(0,1,2), new Array("Agama","All",""));
	this.gridLib.SGEditData(this.sg1,10,new Array(0,1,2), new Array("Golongan Darah","All",""));
	this.gridLib.SGEditData(this.sg1,11,new Array(0,1,2), new Array("Provinsi","All",""));
	this.gridLib.SGEditData(this.sg1,12,new Array(0,1,2), new Array("Kota","All",""));
	this.gridLib.SGEditData(this.sg1,13,new Array(0,1,2), new Array("Strata","All",""));
	this.gridLib.SGEditData(this.sg1,14,new Array(0,1,2), new Array("Jurusan","All",""));
	this.gridLib.SGEditData(this.sg1,15,new Array(0,1,2), new Array("NIK","All",""));
	this.gridLib.SGEditData(this.sg1,16,new Array(0,1,2), new Array("Flag Aktif","=","0.AKTIF"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,3);
	this.doLoad();
};
window.app_saku3_report_siaga_hris_karyawan_flSdm2.extend(window.childForm);
window.app_saku3_report_siaga_hris_karyawan_flSdm2.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0'",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}		

			
			if (row == 1)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data SDM",this.sg1, this.sg1.row, this.sg1.col,
													"select a.sts_sdm, a.nama from gr_status_sdm a "+filter,
													"select count(*) from gr_status_sdm a "+filter,
													new Array("a.sts_sdm","a.nama"),"and",new Array("Kode","Nama"));
				
			}			
			if (row == 2)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_dir, a.nama from gr_dir a "+filter,
													"select count(*) from gr_dir a "+filter,
													new Array("a.kode_dir","a.nama"),"and",new Array("Kode","Nama"));
				
			}	
			if (row == 3)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_dept, a.nama from gr_dept a "+filter,
													"select count(*) from gr_dept a "+filter,
													new Array("a.kode_dept","a.nama"),"and",new Array("Kode","Nama"));
				
			}	
			if (row == 4)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filterRep.ListDataSGFilter(this, "Data Unit",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_loker, a.nama from gr_loker a "+filter,
													"select count(*) from gr_loker a "+filter,
													new Array("a.kode_loker","a.nama"),"and",new Array("Kode","Nama"));
				
			}	

			if (row == 5)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_jab, a.nama from gr_jab a "+filter,
													"select count(*) from gr_jab a "+filter,
													new Array("a.kode_jab","a.nama"),"and",new Array("NIK","Nama"));
				
			}	
			if (row == 6)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Kantor",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_lokkantor, a.nama from gr_lokkantor a "+filter,
													"select count(*) from gr_lokkantor a "+filter,
													new Array("a.kode_lokkantor","a.nama"),"and",new Array("NIK","Nama"));
				
			}	

			if (row == 7)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Pajak",this.sg1, this.sg1.row, this.sg1.col,
													"select a.sts_pajak, a.nama from gr_status_pajak a "+filter,
													"select count(*) from gr_status_pajak a "+filter,
													new Array("a.sts_pajak","a.nama"),"and",new Array("Status","keterangan"));
				
			}	
			if (row == 9)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Agama",this.sg1, this.sg1.row, this.sg1.col,
													"select a.sts_agama, a.nama from gr_status_agama a "+filter,
													"select count(*) from gr_status_agama a "+filter,
													new Array("a.sts_agama","a.nama"),"and",new Array("Status","keterangan"));
				
			}
			if (row == 11)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_prov, a.nama from gr_prov a ",
													"select count(*) from gr_prov a ",
													new Array("a.kode_prov","a.nama"),"and",new Array("Kode","keterangan"));

				
			}
			if (row == 12)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and");
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_kota, a.nama from gr_kota a "+filter,
													"select count(*) from gr_kota a "+filter,
													new Array("a.kode_kota","a.nama"),"and",new Array("Kode","keterangan"));

			}
			if (row == 13)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Strata",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_strata, a.nama from gr_strata a "+filter,
													"select count(*) from gr_strata a "+filter,
													new Array("a.kode_strata","a.nama"),"and",new Array("Status","keterangan"));
				
			}
			if (row == 14)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_jur, a.nama from gr_jur a "+filter,
													"select count(*) from gr_jur a "+filter,
													new Array("a.kode_jur","a.nama"),"and",new Array("Status","keterangan"));
				
			}
			if (row == 15)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
				this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
				this.filterRep.filterStr("a.lok_kantor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
				this.filterRep.filterStr("a.sts_pajak",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
				this.filterRep.filterStr("a.sex",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
				this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,9),"and")+
				this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
				this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
				this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and")+
				this.filterRep.filterStr("a.kode_strata",this.sg1.getCell(1,13),this.sg1.getCell(2,13),this.sg1.getCell(3,13),"and")+
				this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,14),this.sg1.getCell(2,14),this.sg1.getCell(3,14),"and");

				this.filterRep.ListDataSGFilter(this, "Data karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama,a.nik2 from gr_karyawan a "+filter,
													"select count(*) from gr_karyawan a "+filter,
													new Array("a.nik","a.nama"),"and",new Array("ID","Nama","NIK Gratika"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_kolom from gr_kolom where kode_klp='HR' order by nu ";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			// alert(JSON.stringify(data.rs.rows));
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_kolom]);
			}
		} else this.sg2.clear(1);				
		
	},		
	entriesClick: function(sender, col, row){
		if (sender == this.rightBtn)
		{	
			this.sg3.appendData(new Array(this.sg2.getCell(0,this.sg2.row)));
			this.sg2.delRow(this.sg2.row);
		}else if(sender == this.leftBtn)
		{		
			this.sg2.appendData(new Array(this.sg3.getCell(0,this.sg3.row)));
			this.sg3.delRow(this.sg3.row);
		}else if (sender == this.allRightBtn)
		{	
			for (var i=0; i< this.sg2.getRowCount();i++)
				this.sg3.appendData(new Array(this.sg2.getCell(0,i)));		
			this.sg2.clear();
		}else if(sender == this.allLeftBtn)
		{		
			for (var i=0; i< this.sg3.getRowCount();i++)
				this.sg2.appendData(new Array(this.sg3.getCell(0,i)));		
			this.sg3.clear();
		}
	},
	
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],["123","123","123","123","123","123","123","123","123","123","123","123","123","123","123","123","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[2,2,2,2,2,2,2,2,0,2,0,2,2,2,2,2,0]);	
		if (row == 8)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("P","L"));
		}
		if (row == 10)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("A","O","B","AB"));
		}
		if (row == 16)
		{
			this.sg1.columns.get(2).pickList.clear();
			// this.dbLib.setItemsFromSQL("select distinct (case flag_aktif when '0' then '0.AKTIF' else 'X.NON AKTIF' end) as flag_aktif from gr_karyawan where kode_lokasi='"+this.app._lokasi+"' ",[this.sg1.columns.get(2).pickList]);
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("0.AKTIF","X.NONAKTIF"));
		}
	},
	doEllipseClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Kolom",sender,undefined, 
					"select kode_kolom,nama from gr_kolom where kode_klp='HR' ",
					"select count(*) from gr_kolom where kode_klp='HR' ",
				  ["kode_kolom","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bBack)
			{
				if (this.link=="")
				{
					this.p1.setVisible(true);
					this.app._mainForm.pButton.setVisible(true);
					this.viewer.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(false);
				}
				if (this.link=="1")
				{
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.link="";
				}
				if (this.link=="2")
				{
					this.doOpenKartu(this.nis,this.kode_lokasi,this.kode_pp);					
					
				}
				
			}
			else
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Bukti","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Bentuk Laporan","=","TAK Kirim"));
			}else{
				this.p1.setVisible(false);
				this.p2.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
								this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
								this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
								this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
								this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
								this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
								this.filterRep.filterStr("a.lok_kantor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
								this.filterRep.filterStr("a.sts_pajak",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
								this.filterRep.filterStr("a.sex",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
								this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,9),"and")+
								this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
								this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
								this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and")+
								this.filterRep.filterStr("a.kode_strata",this.sg1.getCell(1,13),this.sg1.getCell(2,13),this.sg1.getCell(3,13),"and")+
								this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,14),this.sg1.getCell(2,14),this.sg1.getCell(3,14),"and")+						
								this.filterRep.filterStr("a.nik",this.sg1.getCell(1,15),this.sg1.getCell(2,15),this.sg1.getCell(3,15),"and")+				
								this.filterRep.filterStr("a.flag_aktif",this.sg1.getCell(1,16),this.sg1.getCell(2,16).substr(0,1),this.sg1.getCell(3,16).substr(0,1),"and");
							
				this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,0);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				if (this.sg3.getRowValidCount() > 0)
				{
					
					sql.add("delete from gr_kolom_tmp where nik_user='"+this.app._nikUser+"' ");
					for (var i=0;i < this.sg3.getRowCount();i++)
					{
							var sql2="insert into gr_kolom_tmp(kode_lokasi,kode_kolom,nik_user,tgl_input) values ('"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.app._nikUser+"',getdate())";
							sql.add(sql2);
					}
					this.dbLib.execArraySQL(sql);
				}

				
				this.nama_report = "server_report_saku3_siaga_hris_rptSdm2";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
				
				
			}

	    }catch(e){
			systemAPI.alert("[app_saku3_report_siaga_hris_karyawan_flSdm2]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					if (this.sg1.getCell(2,3)!="Detail")
					{
						this.viewer.preview(result);
					}
					else
					{
						this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
						this.viewer.preview(result);			
						this.viewer.hideLoading();
					}
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
	    if (this.sg1.getCell(2,3)!="Detail")
		{
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
			this.previewReport(dthtml);			
			this.page=page;
		}
		else
		{
		    this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = page;
			this.allBtn = false;
		}
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm.toUpperCase()+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
		  if (this.sg1.getCell(2,3)!="Detail")
          {		  
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
			this.previewReport(dthtml);
	      }
		  else
		  {
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));

		  }
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
			if (this.sg1.getCell(2,3)!="Detail")
            {	
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.allHtml);
				win.document.close();
			}
			else
			{
				window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			}
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
			  this.p2.setVisible(true);
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
	doOpenKartu: function(nik){
		
		this.nik=nik;

		this.link="2";
		filter = "where a.nik='"+nik+"' ";
		filter2="";
		nama_report="server_report_saku3_siaga_hris_rptCvSk";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},

	doOpen: function(nik_seb){
		
		this.nik_seb=nik_seb;

		this.link="2";
		filter = "where a.nik='"+nik_seb+"' ";
		filter2= this.app._nikUser+"/"+this.app._lokasi;
		alert 
		nama_report="server_report_saku3_siaga_hris_rptSdm2";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter,this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	
	},


	// doLihat: function(sender){
	// 	try{			
	// 		var strSQL =  "select a.kode_kolom,a.nama from gr_kolom a left JOIN gr_kolom_jenis_d b on a.kode_kolom=b.kode_kolom where a.kode_klp='HR' and b.kode_jenis='"+this.cb_kol.getText()+"' order by a.nu desc";
	// 		var data = this.dbLib.getDataProvider(strSQL,true);		
	// 		//alert(strSQL);
	// 		if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 			this.dataJU = data;
	// 			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
	// 			this.sgn2.rearrange();
	// 			this.doTampilData(1);
	// 		} else this.sg2.clear(1);
	// 	}catch(e){
	// 		systemAPI.alert(e);
	// 	}
	// },
	doTampilData: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg2.appendData([line.kode_kolom,line.nama]); 
		}
		this.sg2.setNoUrut(start);
	},
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
