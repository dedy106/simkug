window.app_kopeg_simpanan_report_flInvUdp = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_report_flInvUdp.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_simpanan_report_flInvUdp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Invoice Penyelesaian UDP", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kop_simpinv_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_simpanan_report_flInvUdp.extend(window.portalui_childForm);
window.app_kopeg_simpanan_report_flInvUdp.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_loker, nama from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_loker","nama"],"and",["Kode","Nama Loker"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Nasabah",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_agg, nama from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
											  "select count(*) from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
											  ["kode_agg","nama"],"and",["Kode","Nama Nasabah"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data No. Bukti Invoice",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.no_inv,a.keterangan from kop_simpinv_m a inner join kop_depo b on a.no_inv=b.no_depo and a.kode_lokasi=b.kode_lokasi and a.no_del='-' inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi inner join kop_loker d on c.kode_loker=d.kode_loker and c.kode_lokasi=d.kode_lokasi and b.modul='SIMP' and b.jenis='UDP' "+
											  "where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and d.kode_loker like '%"+this.sg1.getCell(2,2)+"' and c.kode_agg like '%"+this.sg1.getCell(2,3)+"' and a.no_inv like '%"+this.sg1.getCell(2,4)+"'",
											  "select count(*) from kop_simpinv_m a inner join kop_depo b on a.no_inv=b.no_depo and a.kode_lokasi=b.kode_lokasi and a.no_del='-' inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi inner join kop_loker d on c.kode_loker=d.kode_loker and c.kode_lokasi=d.kode_lokasi and b.modul='SIMP' and b.jenis='UDP' "+
											  "where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and d.kode_loker like '%"+this.sg1.getCell(2,2)+"' and c.kode_agg like '%"+this.sg1.getCell(2,3)+"' and a.no_inv like '%"+this.sg1.getCell(2,4)+"'",
											  ["a.no_inv","a.keterangan"],"and",["Kode","Keterangan"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,2]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("d.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("c.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_inv",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_inv,a.no_dokumen,a.keterangan,date_format(a.tanggal,'%e/%m/%Y') as tgl,c.nama,a.nilai,sum(case e.dc when 'C' then e.nilai else -e.nilai end) as piutang "+
						"from kop_simpinv_m a inner join kop_depo b on a.no_inv=b.no_depo and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.modul='SIMP' and b.jenis='UDP' "+
						"inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi "+
						"inner join kop_loker d on c.kode_loker=d.kode_loker and c.kode_lokasi=d.kode_lokasi "+
						"inner join (select kode_agg,nilai,kode_lokasi,dc "+
						"		from kop_depo where no_del='-' and modul = 'SIMP' and jenis='UDP' and periode='"+this.sg1.getCell(2,1)+"' "+
						"	) e on b.kode_agg=e.kode_agg and b.kode_lokasi=e.kode_lokasi "+this.filter+
						" group by b.kode_agg ";
				this.scriptSqlCount = "select count(*) "+
						"from kop_simpinv_m a inner join kop_depo b on a.no_inv=b.no_depo and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.modul='SIMP' and b.jenis='UDP' "+
						"inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi "+
						"inner join kop_loker d on c.kode_loker=d.kode_loker and c.kode_lokasi=d.kode_lokasi "+this.filter;
				this.title = new server_util_arrayList({items:["No. Bukti","No. Dokumen","Keterangan","Tanggal","Nasabah","Nilai Terima","Saldo Piutang"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_simpanan_report_flInvUdp]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN INVOICE PENYELESAIAN UDP<br>";
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
			html.add(new Date().valueOf()+"_udp");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_udp");				
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