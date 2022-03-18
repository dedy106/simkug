window.app_saku3_report_siaga_hris_karyawan_flRwySanksi = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_karyawan_flRwySanksi.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_hris_karyawan_flRwySanksi";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Riwayat Sanksi", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
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
	var nik="";
	var tanda="All";
	if (this.app._userStatus!="A")
	{
		tanda="=";
		nik=this.app._userLog;
	}
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Direktorat","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Departemen","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jabatan","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status Pegawai","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["NIK",tanda,nik]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["No SK","All",""]);	
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Status Aktif","=","Ya"]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku3_report_siaga_hris_karyawan_flRwySanksi.extend(window.childForm);
window.app_saku3_report_siaga_hris_karyawan_flRwySanksi.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jab, nama from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jab  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jab","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Status SDM",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select nik, nama from gr_karyawan where kode_lokasi = '"+this.app._lokasi+"' "+
													this.filterRep.filterStr("kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
													this.filterRep.filterStr("kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
													this.filterRep.filterStr("kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and"),
													"select count(*) from gr_karyawan  where kode_lokasi = '"+this.app._lokasi+"' "+
													this.filterRep.filterStr("kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
													this.filterRep.filterStr("kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
													this.filterRep.filterStr("kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and"),
													["nik","nama"],"and",["NIK","Nama"]);
			}	
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data SK",this.sg1, this.sg1.row, this.sg1.col,
													"select a.no_sk,c.nama "+
													"from gr_dinas a "+
													"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
													"inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi "+
													"where a.kode_lokasi = '"+this.app._lokasi+"' "+
													this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
													this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
													this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
													this.filterRep.filterStr("b.nik",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and"),
													"select count(a.no_sk) "+
													"from gr_dinas a "+
													"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
													"inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi "+
													"where a.kode_lokasi = '"+this.app._lokasi+"' "+
													this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
													this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
													this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
													this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
													this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
													this.filterRep.filterStr("b.nik",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and"),
													["a.no_sk","c.nama"],"and",["No SK","Nama"]);
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123i","123i","123i","123i","123i","123i","123i","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,2,2,2,2,2,2,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123i","123i","123i","123i","123i","3","123i","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,3,3,3,3,3,2,0]);
		}
		if (row == 7)
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
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status Pegawai","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["NIK","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["No SK","All",""]);			
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				var flag_aktif=" and b.flag_aktif='0' ";
				if (this.sg1.getCell(2,7)=="Tidak")
				{
					flag_aktif=" and b.flag_aktif='X' ";
				}
		    	this.filter = this.filterRep.filterStr("b.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("b.nik",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.no_sk",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+flag_aktif;
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				var sql = "select a.nik,b.nama,a.no_sk,date_format(c.tgl_awal_sk,'%d/%m/%Y') as tgl_awal_sk,d.nama,a.lama,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.keterangan "+
						"from gr_rwysanksi a "+
						"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi "+
						"inner join gr_status_sanksi d on a.sts_sanksi=d.sts_sanksi and a.kode_lokasi=d.kode_lokasi  "+this.filter
						"order by a.nik ";
				this.scriptSqlCount = "select count(*) "+
									"from gr_rwysanksi a "+
									"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
									"inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi "+
									"inner join gr_status_sanksi d on a.sts_sanksi=d.sts_sanksi and a.kode_lokasi=d.kode_lokasi  "+this.filter; 
				this.title = new server_util_arrayList({items:["NIK","Nama","No SK","Tanggal","Sanksi","Lama","Tgl Mulai","Tgl Selesai","Keterangan"]});
				this.widthTable = new server_util_arrayList({items:[60,150,200,60,200,50,60,60,200]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N"]});
				//this.groupHeader = new server_util_arrayList({items:["kode_lokfa"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false, this.groupBy, undefined, this.groupHeader);
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
			systemAPI.alert("[app_saku3_report_siaga_hris_karyawan_flRwySanksi]::mainButtonClick:"+e);
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
		var judul="LAPORAN RIWAYAT SANKSI";
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
