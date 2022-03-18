window.app_kopeg_proyek_report_flProyek = function(owner)
{
	if (owner)
	{
		window.app_kopeg_proyek_report_flProyek.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_proyek_report_flProyek";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Data Proyek", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["3","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["PP/Unit Kerja","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Tanggal","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Proyek","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_proyek_report_flProyek.extend(window.portalui_childForm);
window.app_kopeg_proyek_report_flProyek.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_cust,nama from cust where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from cust where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  ["kode_cust","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_pp,nama from pp where kode_lokasi='"+this.sg1.getCell(2,0)+"' and tipe='posting' ",
									  "select count(*) from pp where kode_lokasi='"+this.sg1.getCell(2,0)+"' and tipe='posting' ",
									  ["kode_pp","nama"],"where",["Kode","Nama"]);
		}
		if (row === 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
									  "select no_proyek,no_dokumen,keterangan,nilai from kop_proyek_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' "+
									  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
									  this.filterRep.filterStr("tgl_mulai",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
									  "select count(*) from kop_proyek_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' "+
									  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
									  this.filterRep.filterStr("tgl_mulai",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
									  ["no_proyek","no_dokumen","keterangan","nilai"],"and",["No. Proyek","No Dokumen","Keterangan","Nilai"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","13","13","12","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,1,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","13","13","12","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,2,2,1,2]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["PP/Unit Kerja","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Tanggal","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Proyek","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.tgl_mulai",this.sg1.getCell(1,3),this.sg1.getCellDateValue(2,3),this.sg1.getCellDateValue(3,3),"and")+
							this.filterRep.filterStr("a.no_proyek",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_proyek,date_format(a.tgl_mulai,'%d/%m/%Y') as tglawl,date_format(a.tgl_selesai,'%d/%m/%Y') as tglend, "+
						"a.no_dokumen,a.keterangan,b.nama as nmcust,c.nama as nmpp,a.akun_ar,a.nilai,a.nilai_ppn "+
						"from kop_proyek_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						this.filter+
						" order by a.tgl_mulai desc ";
				this.scriptSqlCount = "select count(*) "+
						"from kop_proyek_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						this.filter;
				this.title = new server_util_arrayList({items:["No. Proyek","Tgl Mulai","Tgl Selesai","No. Dokumen","Keterangan","Customer","PP/Unit Kerja","Akun AR","Nilai","Nilai PPN"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","N","N"]});
				//this.groupBy = new server_util_arrayList({items:["no_kontrak"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_proyek_report_flProyek]::mainButtonClick:"+e);
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
		var header = "LAPORAN DATA PROYEK";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
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
			html.add(new Date().valueOf()+"_order");				
	      this.viewer.useIframe(upDownHtml(html));
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