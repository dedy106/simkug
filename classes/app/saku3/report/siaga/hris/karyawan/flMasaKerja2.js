window.app_saku3_report_siaga_hris_karyawan_flMasaKerja2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_karyawan_flMasaKerja2.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_hris_karyawan_flMasaKerja2";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Perhitungan Masa Kerja", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,380],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,357],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:16});
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
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Direktorat","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Departemen","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jabatan","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status SDM","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Grade","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Pihak Ketiga","All",""]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Provinsi","All",""]);
	this.gridLib.SGEditData(this.sg1,8,[0,1,2],["Kota","All",""]);
	this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Gender","All",""]);
	this.gridLib.SGEditData(this.sg1,10,[0,1,2],["Gol Darah","All",""]);
	this.gridLib.SGEditData(this.sg1,11,[0,1,2],["Agama","All",""]);
	this.gridLib.SGEditData(this.sg1,12,[0,1,2],["Srata","All",""]);
	this.gridLib.SGEditData(this.sg1,13,[0,1,2],["NIK","All",""]);
	this.gridLib.SGEditData(this.sg1,14,[0,1,2],["Tanggal Acuan","=",new Date().lclFormat()]);
	this.gridLib.SGEditData(this.sg1,15,[0,1,2],["Status Aktif","=","Ya"]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku3_report_siaga_hris_karyawan_flMasaKerja2.extend(window.childForm);
window.app_saku3_report_siaga_hris_karyawan_flMasaKerja2.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jab, nama from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jab  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jab","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Status SDM",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Grade",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_grade, nama from gr_grade where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_grade  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_grade","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Pihak Ketiga",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_vendor, nama from gr_vendor where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_vendor  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_vendor","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 7)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_prov, nama from gr_prov  ",
													"select count(*) from gr_prov  ",
													["kode_prov","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 8)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 9)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 11)
			{
				this.filterRep.ListDataSGFilter(this, "Data Agama",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_agama, nama from gr_status_agama where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_agama  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_agama","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 12)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jur, nama from gr_jur where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jur  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jur","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 13)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_grade",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_vendor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and");

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
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],["123i","123i","123i","123i","123i","123i","123i","123i","123i","13","13","123i","123i","123i","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[2,2,2,2,2,2,2,2,2,0,0,2,2,2,1,0]);
		if (row == 9)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("L","P"));
		}
		if (row == 10)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("A","AB","B","O"));
		}
		if (row == 15)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Ya","Tidak"));
		}	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi Kerja","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Direktorat","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Departemen","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jabatan","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status SDM","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Grade","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Pihak Ketiga","All",""]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Provinsi","All",""]);
				this.gridLib.SGEditData(this.sg1,8,[0,1,2],["Kota","All",""]);
				this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Gender","All",""]);
				this.gridLib.SGEditData(this.sg1,10,[0,1,2],["Gol Darah","All",""]);
				this.gridLib.SGEditData(this.sg1,11,[0,1,2],["Agama","All",""]);
				this.gridLib.SGEditData(this.sg1,12,[0,1,2],["Tingkat Pendidikan","All",""]);
				this.gridLib.SGEditData(this.sg1,13,[0,1,2],["NIK","All",""]);
				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				var flag_aktif=" and a.flag_aktif<>'X' ";
				if (this.sg1.getCell(2,15)=="Tidak")
				{
					flag_aktif=" and a.flag_aktif='X' ";
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_grade",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_vendor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and")+
							this.filterRep.filterStr("a.nik",this.sg1.getCell(1,13),this.sg1.getCell(2,13),this.sg1.getCell(3,13),"and")+flag_aktif;
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var tgl=this.sg1.getCellDateValue(2,14);
				var result  = new arrayMap();
				
				var sql = "select a.nik,a.nama,i.nama as status_sdm,j.nama as vendor,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk, "+
					    "         datediff (month,a.tgl_masuk,'"+tgl+"')-1 as bulan, "+
					    "		  a.kode_grade,d.nama as loker,e.nama as dir,f.nama as dept, "+
						"	      g.nama as jabatan "+
						"from gr_karyawan a  "+
						"inner join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi "+
						"inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi "+
						"inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=e.kode_lokasi "+
						"inner join gr_jab g on a.kode_jab=g.kode_jab and a.kode_lokasi=g.kode_lokasi "+
						"inner join gr_status_sdm i on a.sts_sdm=i.sts_sdm and a.kode_lokasi=i.kode_lokasi "+
						"inner join gr_vendor j on a.kode_vendor=j.kode_vendor and a.kode_lokasi=j.kode_lokasi "+this.filter+
						"order by a.nik ";
				this.scriptSqlCount = "select count(a.nik) "+
						"from gr_karyawan a  "+
						"inner join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi "+
						"inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi "+
						"inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=e.kode_lokasi "+
						"inner join gr_jab g on a.kode_jab=g.kode_jab and a.kode_lokasi=g.kode_lokasi "+
						"inner join gr_status_sdm i on a.sts_sdm=i.sts_sdm and a.kode_lokasi=i.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["NIK","Nama","Status","Pihak Ketiga","Tgl Masuk","Bulan","Grade","Lokasi Kerja","Direktorat","Departemen","Jabatan"]});
				this.widthTable = new server_util_arrayList({items:[60,150,100,100,60,50,50,200,200,200,200,200]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","N","S","S","S","S","S"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false, this.groupBy, this.summary, this.groupHeader);
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
			systemAPI.alert("[app_saku3_report_siaga_hris_karyawan_flMasaKerja2]::mainButtonClick:"+e);
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
		var judul="LAPORAN PERHITUNGAN MASA KERJA";
		var html="<table width='"+this.lebar+"' border='0' cellspacing='2' cellpadding='1'>";
		html+="<tr><td align='center' class='judul_laporan'>"+this.app._namalokasi.toUpperCase()+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul+"</td></tr>";
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
