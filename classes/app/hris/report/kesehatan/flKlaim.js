window.app_hris_report_kesehatan_flKlaim = function(owner)
{
	if (owner)
	{
		window.app_hris_report_kesehatan_flKlaim.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_kesehatan_flKlaim";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gr_klaim_m where kode_lokasi='"+this.app._lokasi+"'");
	if (this.app._userStatus=="A")
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","All",""]);
		this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Grade","All",""]);
		this.gridLib.SGEditData(this.sg1,7,[0,1,2],["NIK","All",""]);
		this.gridLib.SGEditData(this.sg1,8,[0,1,2],["No Klaim","All",""]);	
		this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Summary"]);
	}
	else
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","All",""]);
		this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Grade","All",""]);
		this.gridLib.SGEditData(this.sg1,7,[0,1,2],["NIK","=",this.app._userLog]);
		this.gridLib.SGEditData(this.sg1,8,[0,1,2],["No Klaim","All",""]);	
		this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Summary"]);
	}
		
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_hris_report_kesehatan_flKlaim.extend(window.childForm);
window.app_hris_report_kesehatan_flKlaim.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Status SDM",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Grade",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_grade, nama from gr_grade where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_grade  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_grade","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 7)
			{
				this.filter = this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("b.kode_grade",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and");
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select b.nik, b.nama from gr_karyawan b where b.kode_lokasi = '"+this.app._lokasi+"' "+this.filter,
													"select count(*) from gr_karyawan  b where b.kode_lokasi = '"+this.app._lokasi+"' "+this.filter,
													["b.nik","b.nama"],"and",["NIK","Nama"]);
			}	
			if (row == 8)
			{
				this.filterRep.ListDataSGFilter(this, "Data Klaim",this.sg1, this.sg1.row, this.sg1.col,
													"select no_klaim, keterangan from gr_klaim_m where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_klaim_m  where kode_lokasi = '"+this.app._lokasi+"' ",
													["no_klaim","nama"],"and",["Kode","Nama"]);
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){	
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],["123","123i","123i","123i","123i","123i","123i","123i","123i","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],[0,2,2,2,2,2,2,2,2,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],["123","123i","123i","123i","123i","123i","123i","3","123i","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9],[0,2,2,2,2,2,2,2,2,0]);
		}
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from gr_klaim_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 9)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				if (this.app._userStatus=="A")
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
					this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","All",""]);
					this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Grade","All",""]);
					this.gridLib.SGEditData(this.sg1,7,[0,1,2],["NIK","All",""]);
					this.gridLib.SGEditData(this.sg1,8,[0,1,2],["No Klaim","All",""]);	
					this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Summary"]);
				}
				else
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jabatan","All",""]);
					this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","All",""]);
					this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Grade","All",""]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
					this.gridLib.SGEditData(this.sg1,8,[0,1,2],["No Klaim","All",""]);	
					this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Jenis Laporan","=","Summary"]);
				}				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("b.kode_grade",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("b.nik",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				if (this.sg1.getCell(2,9)=='Summary')
				{
					var sql = "select a.no_klaim,a.nik_buat,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,c.nama as asuransi,"+
							"date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,date_format(a.tgl_ambil,'%d/%m/%Y') as tgl_ambil,"+
							"date_format(a.tgl_final,'%d/%m/%Y') as tgl_final,datediff (day,a.tgl_ambil,a.tgl_final)+1 as lama,"+
							"isnull(d.nilai,0) as nilai,isnull(a.nilai_final,0) as nilai_final,isnull(d.nilai,0)-isnull(a.nilai_final,0) as selisih "+
							"from gr_klaim_m a "+
							"inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join gr_asur c on a.kode_asur=c.kode_asur and a.kode_lokasi=c.kode_lokasi "+
							"left join (select no_klaim,sum(nilai) as nilai "+
							"		   from gr_klaim_d "+
							"		   group by no_klaim "+
							"	   )d on a.no_klaim=d.no_klaim "+this.filter;
					this.scriptSqlCount = "select count(a.no_klaim) "+
							"from gr_klaim_m a "+
							"inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join gr_asur c on a.kode_asur=c.kode_asur and a.kode_lokasi=c.kode_lokasi "+
							"left join (select no_klaim,sum(nilai) as nilai "+
							"		   from gr_klaim_d "+
							"		   group by no_klaim "+
							"	   )d on a.no_klaim=d.no_klaim "+this.filter;
					
					this.title = new server_util_arrayList({items:["No Klaim","NIK","Nama","Tgl Input","Keterangan","Asuransi","Tgl Kuitansi","Tgl Terima","Tgl Ambil","Tgl Pembayaran","Lama","Nilai Pengajuan","Nilai Disetujui","Selisih"]});
					this.widthTable = new server_util_arrayList({items:[80,60,200,60,200,200,60,60,60,60,60,80,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","N","N","N","N"]});										 						
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","Y","Y","Y"]});
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
				else
				if (this.sg1.getCell(2,9)=='Detail')
				{
					this.nama_report = "server_report_hris_rptKlaim";
					this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
					this.page = 1;
					this.allBtn = false;
				}
				
			}
	    }catch(e){
			systemAPI.alert("[app_hris_report_kesehatan_flKlaim]::mainButtonClick:"+e);
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
		if (this.sg1.getCell(2,9)=='Summary')
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
		var footer="* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan";
		var judul="LAPORAN KLAIM KESEHATAN";
		var judul2="BULAN "+ubahPeriode(this.sg1.getCell(2,0)).toUpperCase();
		var html="<table width='"+this.lebar+"' border='0' cellspacing='2' cellpadding='1'>";
		html+="<tr><td align='center' class='judul_laporan'>"+this.app._namalokasi.toUpperCase()+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul2+"</td></tr>";
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
			if (this.sg1.getCell(2,7)=='Summary')
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
