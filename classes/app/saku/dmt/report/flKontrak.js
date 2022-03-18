window.app_saku_dmt_report_flKontrak = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_report_flKontrak.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_dmt_report_flKontrak";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Kontrak", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(127);
		this.sg1.setLeft(1);
		this.sg1.setTop(20);
		this.sg1.setColCount(4);
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
			val.set(1, "All");
			val.set(2, "=");
			val.set(3, "Range");
			val.set(4, "Like");
			val.set(5, "<=");
			this.sg1.columns.get(1).setPicklist(val);
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			this.sg1.setRowCount(4);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["3","3","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,0,2,2]);
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from dmt_kontrak where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kontrak","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_dmt_report_flKontrak.extend(window.portalui_childForm);
window.app_saku_dmt_report_flKontrak.implement({
	doEllipseClick: function(sender, col, row){
		try{
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_cust, nama  from dmt_cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from dmt_cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
			}
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kontrak",this.sg1, this.sg1.row, this.sg1.col,
											  "select no_kontrak, keterangan, no_po, no_dokumen, tanggal_akhir from dmt_kontrak "+
											  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
											  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
											  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from dmt_kontrak "+
											  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
											  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
											  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
											  ["no_kontrak","keterangan","no_po","no_dokumen","tanggal_sewa"],"and",["No Kontrak","Keterangan","No PO","No Dokumen","Tgl Akhir Sewa"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,2]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from dmt_kontrak where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kontrak","All",""]);
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_kontrak, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.kode_cust, b.nama, a.no_po, date_format(a.tanggal_po,'%d-%m-%Y') as tgl_po, a.no_dokumen,date_format(a.tanggal_akhir,'%d-%m-%Y') as tgl_akhir, date_format(a.tanggal_baps,'%d-%m-%Y') as tgl_baps, a.nilai, a.akun_ar, a.akun_pdpt, a.keterangan "+
					" from dmt_kontrak a inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
					"	"+this.filter ;
				this.scriptSqlCount = "select count(*) "+
								" from dmt_kontrak a inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+this.filter;
				this.title = new server_util_arrayList({items:["No Kontrak","Tanggal","Kode Cust","Nama","No PO","Tanggal PO","No Dokumen","Tanggal Akhir","Tanggal BAPS","Nilai","Akun Piutang","Akun Pdpt","Keterangan"]});			
				this.widthTable = new server_util_arrayList({items:[150, 80, 80,200,120,80,100,80,80,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","D","S","S","S","D","S","D","D","N","S","S"]});			
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);	
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_dmt_report_flKontrak]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR KONTRAK<br>";			
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_kontrak");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_kontrak");				
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
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
	    if (col==1)
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