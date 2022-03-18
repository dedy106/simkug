window.app_hris_report_gaji_flGajiBii = function(owner)
{
	if (owner)
	{
		window.app_hris_report_gaji_flGajiBii.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_gaji_flGajiBii";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Gaji Format BII", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,220],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,197],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
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
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Pegawai","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Status Sales","All",""]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["NIK","All",""]);
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_hris_report_gaji_flGajiBii.extend(window.childForm);
window.app_hris_report_gaji_flGajiBii.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Status Pegawai",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Status","Keterangan"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 7)
			{
				var flag_gaji="";
				if (this.sg1.getCell(2,6)=="Pegawai")
				{
					flag_gaji=" and a.flag_gaji='NON' ";
				}
				if (this.sg1.getCell(2,6)=="Sales")
				{
					flag_gaji=" and a.flag_gaji='SALES' ";
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+flag_gaji;
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
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["3","123i","123i","123i","123i","123i","13","123i"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[0,2,2,2,2,2,0,2]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from gr_gaji_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Pegawai","Sales"));
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
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status Pegawai","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Status Sales","All",""]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["NIK","All",""]);				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				var flag_gaji="";
				if (this.sg1.getCell(2,6)=="Pegawai")
				{
					flag_gaji=" and a.flag_gaji='NON' ";
				}
				if (this.sg1.getCell(2,6)=="Sales")
				{
					flag_gaji=" and a.flag_gaji='SALES' ";
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.nik",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+flag_gaji;
				this.filter2 = this.filterRep.filterStr("x.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("x.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				
				var sql = "select b.kd_pt,b.dr_acct,a.no_rek as cr_acct,isnull(e.total,0) as amount,replace(convert(varchar,f.tanggal,103),'/','') as tanggal,b.kdmu,a.nama "+
						"from gr_karyawan a "+
						"inner join (select distinct x.nik,y.tanggal "+
						"			from gr_gaji_d x "+
						"		inner join gr_gaji_m y on x.no_gaji=y.no_gaji and x.kode_lokasi=y.kode_lokasi "+this.filter2+
						"		   )f on  a.nik=f.nik "+
						"left join (select nik,sum(case y.dc when 'D' then x.nilai else -x.nilai end) as total "+
						"		   from gr_gaji_d x "+
						"		   inner join gr_gaji_param y on x.kode_param=y.kode_param and x.kode_lokasi=y.kode_lokasi "+this.filter2+
						" and y.jenis='T' "+
						"		   group by x.nik "+
						"		   )e on a.nik=e.nik "+
						"cross join gr_bii b "+this.filter;
					
				this.scriptSqlCount = "select count(a.nik) "+
							"from gr_karyawan a "+
							"inner join (select distinct x.nik "+
							"			from gr_gaji_d x "+this.filter2+
							"			)d on a.nik=d.nik ";
							
				this.title = new server_util_arrayList({items:["KDPT","DR_ACCT","CR_ACCT","AMOUNT","BLTH","KDMU","REFF"]});
				this.widthTable = new server_util_arrayList({items:[40,100,100,90,60,60,300]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","N","S","S","S"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","Y","N","N","N"]});
				
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
			systemAPI.alert("[app_hris_report_gaji_flGajiBii]::mainButtonClick:"+e);
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
		var judul="LAPORAN GAJI FORMAT BII";
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
