window.app_sc_report_flPesanPos = function(owner)
{
	if (owner)
	{
		window.app_sc_report_flPesanPos.prototype.parent.constructor.call(this,owner);
		this.className = "app_sc_report_flPesanPos";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from sc_pesan_m ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Cost Center","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Nik Pembuat","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("No Bukti","All",""));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
};
window.app_sc_report_flPesanPos.extend(window.childForm);
window.app_sc_report_flPesanPos.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
														  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
														  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
			}
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Cost Center",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_cc, nama from sc_cc ",
														  "select count(kode_cc) from sc_cc ",
														  ["kode_cc","nama"],"where",["Kode","Nama"]);
			}
			if (row == 2)
			{
				var filter = this.filterRep.filterStr("kode_cc",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where");
				this.filterRep.ListDataSGFilter(this, "Daftar Karyawan",this.sg1, this.sg1.row, this.sg1.col,
														  "select nik, nama from sc_karyawan ",
														  "select count(nik) from sc_karyawan ",
														  ["nik","nama"],"where",["Kode","Nama"]);
			}
			if (row == 3)
			{
				var filter = this.filterRep.filterStr("periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("kode_cc",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("nik_buat",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filterRep.ListDataSGFilter(this, "Daftar Bukti",this.sg1, this.sg1.row, this.sg1.col,
														  "select no_pesan, keterangan from sc_pesan_m "+filter,
														  "select count(no_pesan) from sc_pesan_m"+filter,
														  ["no_pesan","keterangan"],"and",["No Bukti","Keterangan"]);
			}	
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[0,2,2,2]);	
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from sc_pesan_m order by periode",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Cost Center","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Nik Pembuat","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("No Bukti","All",""));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.peride",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("a.kode_cc",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("a.nik_buat",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							  this.filterRep.filterStr("a.no_pesan",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();	
				var sql = "select a.no_pesan,date_format(a.tanggal,'%d/%m/%Y') as  tanggal,a.keterangan,a.kode_cc,b.nama as nama_cc,d.nama as nama_jenis,a.nik_buat,c.nama as nama_buat,a.nilai, "+
						"	   f.no_ver,date_format(f.tanggal,'%d/%m/%Y') as tgl_ver,h.no_po,date_format(h.tanggal,'%d/%m/%Y') as  tgl_po,i.no_terima,date_format(i.tanggal,'%d/%m/%Y') as tgl_terima, "+
						"	   j.no_bast,date_format(j.tanggal,'%d/%m/%Y') as tgl_bast,k.no_jurnal,date_format(k.tanggal,'%d/%m/%Y') as tgl_jurnal "+
						"from sc_pesan_m a "+
						"inner join sc_cc b on a.kode_cc=b.kode_cc  "+
						"inner join sc_karyawan c on a.nik_buat=c.nik  "+
						"inner join sc_jenis d on a.kode_jenis=d.kode_jenis  "+
						"left join sc_ver_d e on a.no_pesan=e.no_bukti "+
						"left join sc_ver_m f on e.no_ver=f.no_ver "+
						"inner join (select no_pesan,no_po "+
						"			from sc_pesan_d "+
						"			group by no_pesan,no_po "+
						"			)g on a.no_pesan=g.no_pesan "+
						"left join sc_po_m h on g.no_po=h.no_po "+
						"left join sc_terima_m i on a.no_pesan=i.no_pesan "+
						"left join sc_bast_m j on h.no_bast=j.no_bast "+
						"left join sc_jurnal_m k on h.no_jurnal=k.no_jurnal "+
						"order by a.no_pesan";
				this.scriptSqlCount = "select count(a.no_pesan) "+
						"from sc_pesan_m a "+
						"inner join sc_cc b on a.kode_cc=b.kode_cc  "+
						"inner join sc_karyawan c on a.nik_buat=c.nik  "+
						"inner join sc_jenis d on a.kode_jenis=d.kode_jenis  "+
						"left join sc_ver_d e on a.no_pesan=e.no_bukti "+
						"left join sc_ver_m f on e.no_ver=f.no_ver "+
						"inner join (select no_pesan,no_po "+
						"			from sc_pesan_d "+
						"			group by no_pesan,no_po "+
						"			)g on a.no_pesan=g.no_pesan "+
						"left join sc_po_m h on g.no_po=h.no_po "+
						"left join sc_terima_m i on a.no_pesan=i.no_pesan "+
						"left join sc_bast_m j on h.no_bast=j.no_bast "+
						"left join sc_jurnal_m k on h.no_jurnal=k.no_jurnal ";
				this.title = new server_util_arrayList({items:["No Pesan","Tanggal","Keterangan","Kode CC","Nama CC","Jenis","NIK Buat","Nama Buat","Nilai","No Ver","Tgl Ver","No PO","Tgl PO","No Terima","Tgl Terima","No BAST","Tgl BAST","No Jurnal","Tgl Jurnal"]});
				this.widthTable = new server_util_arrayList({items:[80,60,150,60,150,60,60,150,80,80,60,80,60,80,60,80,60,80,60]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","N","S","S","S","S","S","S"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","Y","N","N","N","N","N","N"]});
				
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_sc_report_flPesanPos]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
