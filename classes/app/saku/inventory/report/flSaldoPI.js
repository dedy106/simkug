window.app_saku_inventory_report_flSaldoPI = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flSaldoPI.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flSaldoPI";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo Piutang Per Invoice", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);		
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["3","3","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,2],[2,0,2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.getPeriode="select distinct periode from inv_jual_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Invoice","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flSaldoPI.extend(window.portalui_childForm);
window.app_saku_inventory_report_flSaldoPI.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_cust, nama  from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data No. Invoice",this.sg1, this.sg1.row, this.sg1.col,
											  "select no_jual,keterangan from inv_jual_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and periode ='"+this.sg1.getCell(2,1)+"' and kode_cust like '%"+this.sg1.getCell(2,2)+"'",
											  "select count(*) from inv_jual_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and periode ='"+this.sg1.getCell(2,1)+"' and kode_cust like '%"+this.sg1.getCell(2,2)+"'",
											  ["no_jual","keterangan"],"and",["No. Invoice","Keterangan"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[2,0,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3],[3,0,2,2]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from inv_jual_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
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
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Invoice","All",""]);
			}else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.no_jual",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var periode = this.sg1.getCell(2,1);
				var sql = "select a.no_jual,a.keterangan,z.nmcust,ifnull(b.nilai,0)-ifnull(d.nilai_byr,0)-ifnull(e.nilai_byr,0) as so_awal, "+
						"ifnull(f.nilai,0) as debet,ifnull(h.nilai_byr,0)+ifnull(i.nilai_byr,0) as kredit, "+
						"(ifnull(b.nilai,0)-ifnull(d.nilai_byr,0)-ifnull(e.nilai_byr,0))+ifnull(f.nilai,0)-ifnull(h.nilai_byr,0)-ifnull(i.nilai_byr,0) as saldo_akhir "+
						"from inv_jual_m a "+
						"inner join (select a.no_jual,a.kode_lokasi,concat(a.kode_cust,'-',b.nama) as nmcust "+
						"  from inv_jual_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						"	group by a.no_jual) z on a.no_jual=z.no_jual and a.kode_lokasi=z.kode_lokasi "+
						"left join (select no_jual,kode_lokasi,sum(case when substring(no_jual,-1)<>'r' then nilai+nilai_ppn else -(nilai+nilai_ppn) end) as nilai "+
						"	from inv_jual_m "+
						"	where periode<'200902' "+
						"	group by no_jual) b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						"left join (select b.no_bukti,a.kode_lokasi,sum(case when substring(a.no_gb,-1)<>'r' then b.nilai else -b.nilai end) as nilai_byr "+
						"  from gb_m a inner join gb_d b on a.no_gb=b.no_gb and a.kode_lokasi=b.kode_lokasi "+
						"  where a.periode<'200902' and a.jenis='JUAL' "+
						"  group by b.no_bukti) d on a.no_jual=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
						"left join (select c.no_jual,a.kode_lokasi,sum(case when substring(c.no_jual,-1)<>'r' then b.nilai else -b.nilai end) as nilai_byr "+
						"  from kas_m a inner join kas_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
						"  inner join inv_jual_m c on b.no_bukti=c.no_jual and b.kode_lokasi=c.kode_lokasi "+
						"  where a.periode<'200902' "+
						"  group by  c.no_jual) e on a.no_jual=e.no_jual and a.kode_lokasi=e.kode_lokasi "+
						"left join (select no_jual,kode_lokasi,sum(case when substring(no_jual,-1)<>'r' then nilai+nilai_ppn else -(nilai+nilai_ppn) end) as nilai "+
						"	from inv_jual_m "+
						"	where periode='200902' "+
						"	group by no_jual) f on a.no_jual=f.no_jual and a.kode_lokasi=f.kode_lokasi "+
						"left join (select b.no_bukti,a.kode_lokasi,sum(case when substring(a.no_gb,-1)<>'r' then b.nilai else -b.nilai end) as nilai_byr "+
						"  from gb_m a inner join gb_d b on a.no_gb=b.no_gb and a.kode_lokasi=b.kode_lokasi "+
						"  where a.periode='200902' and a.jenis='JUAL' "+
						"  group by b.no_bukti) h on a.no_jual=h.no_bukti and a.kode_lokasi=h.kode_lokasi "+
						"left join (select c.no_jual,a.kode_lokasi,sum(case when substring(c.no_jual,-1)<>'r' then b.nilai else -b.nilai end) as nilai_byr "+
						"  from kas_m a inner join kas_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
						"  inner join inv_jual_m c on b.no_bukti=c.no_jual and b.kode_lokasi=c.kode_lokasi "+
						"  where a.periode='200902' "+
						"  group by  c.no_jual) i on a.no_jual=i.no_jual and a.kode_lokasi=i.kode_lokasi "+this.filter+
						" order by a.no_jual ";
				this.scriptSqlCount = "select count(a.no_jual) "+
						"from inv_jual_m a "+
						"inner join (select no_jual,kode_lokasi "+
						"  from inv_jual_m "+
						"	group by no_jual) z on a.no_jual=z.no_jual and a.kode_lokasi=z.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["No. Invoice","Keterangan","Customer","Saldo Awal","Debet","Kredit","Saldo Akhir"]});
				this.widthTable = new server_util_arrayList({items:[60,200,200,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flSaldoPI]::mainButtonClick:"+e);
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
		var header = "DAFTAR SALDO PIUTANG PER INVOICE";
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
			html.add(new Date().valueOf()+"_saldoPerinvoice");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_saldoPerinvoice");				
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