window.app_saku_dmt_report_flSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_report_flSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_dmt_report_flSaldo";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo Piutang", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,0,2,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.getPeriode="select distinct periode from dmt_invoice where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);	
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Kontrak","All",""]);	
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. No Invoice","All",""]);	
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Saldo","=","Customer"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_dmt_report_flSaldo.extend(window.portalui_childForm);
window.app_saku_dmt_report_flSaldo.implement({
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
														  "select a.no_kontrak,a.keterangan from dmt_kontrak a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
														  this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
														  "select count(*) from dmt_kontrak a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
														  this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
														  ["a.no_kontrak","a.keterangan"],"and",["No Bukti","Keterangan"]);
			}	
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.no_invoice,a.keterangan from dmt_invoice a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
														  this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
														  this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
														  "select count(*) from dmt_invoice a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
														  this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
														  this.filterRep.filterStr("a.no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
														  ["a.no_invoice","a.keterangan"],"and",["No Bukti","Keterangan"]);
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4,5],[2,0,2,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4,5],[3,0,2,2,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from dmt_invoice where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Customer","Kontrak","Invoice"]);
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
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Kontrak","All",""]);	
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Invoice","All",""]);	
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Saldo","=","Customer"]);
			}else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
														this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
							
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();				
				this.jenisLap = this.sg1.getCell(2,5);
				var periode = this.sg1.getCell(2,1);
				if (this.jenisLap === "Customer") 
				{
					
					var sql = "select a.kode_cust,a.nama,ifnull(d.nilai,0)-ifnull(e.nilai_bayar,0) as so_awal, "+
							"  		   ifnull(b.nilai,0) as debet,ifnull(c.nilai_bayar,0) as kredit,"+
							"		   ifnull(d.nilai,0)-ifnull(e.nilai_bayar,0) +	ifnull(b.nilai,0) - ifnull(c.nilai_bayar,0) as so_akhir "+
							"	from dmt_cust a "+
							"	inner join (select kode_cust,kode_lokasi "+
							"				from dmt_invoice"+
							"				group by kode_cust)f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+
							"	left join (select kode_cust,kode_lokasi,sum(nilai+nilai_ppn) as nilai "+
							"		   from dmt_invoice "+
							"		   where periode='"+periode+"' "+
							"		   group by kode_cust)b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"	left join (select b.kode_cust,a.kode_lokasi,sum(a.nilai) as nilai_bayar "+
							"		   from dmt_kb_d a "+
							"		   inner join dmt_invoice b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi "+
							"		   inner join dmt_kb c on a.no_kb=c.no_kb and b.kode_lokasi=c.kode_lokasi"+
							"		   where c.periode='"+periode+"' and a.jenis<>'PDD' "+
							"		   group by b.kode_cust )c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							"	left join (select kode_cust,kode_lokasi,sum(nilai+nilai_ppn) as nilai "+
							"		   from dmt_invoice "+
							"		   where periode<'"+periode+"' "+
							"		   group by kode_cust)d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
							"	left join (select b.kode_cust,a.kode_lokasi,sum(a.nilai) as nilai_bayar "+
							"		   from dmt_kb_d a "+
							"		   inner join dmt_invoice b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi "+
							"		   inner join dmt_kb c on a.no_kb=c.no_kb and b.kode_lokasi=c.kode_lokasi "+
							"          where c.periode<'"+periode+"' and a.jenis<>'PDD' "+
							"		   group by b.kode_cust )e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							this.filter +" order by a.kode_cust ";
					this.scriptSqlCount = "select count(a.kode_cust) "+
							"	from dmt_cust a "+
							"	inner join (select kode_cust,kode_lokasi "+
							"				from dmt_invoice"+
							"				group by kode_cust)f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+this.filter;
				}		
				else
				{
					var sql = "select a.no_pdd,a.no_dokumen,a.periode,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.keterangan,a.nilai "+
							"	from dmt_pdd_m a "+this.filter +" order by a.no_pdd ";
					this.scriptSqlCount = "select count(a.no_pdd) "+
							  "	from dmt_pdd_m a "+this.filter;
				}	
		
				
				this.title = new server_util_arrayList({items:["Kode Cust","Nama Customer","Saldo Awal","Debet","Kredit","Saldo Akhir"]});
				this.widthTable = new server_util_arrayList({items:[60,250,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
			
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_dmt_report_flSaldo]::mainButtonClick:"+e);
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
		if (this.jenisLap === "Transaksi"){
			var data = this.dbLib.getDataProviderPage(this.sqlScript,page,this.pager,true);			
			var dthtml = this.convertResultToHTML(undefined, data);
		}else
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		if (this.jenisLap === "Transaksi")
			var header = "SALDO PIUTANG PER CUSTOMER";
		else var header = "DAFTAR PIUTANG PER CUSTOMER";
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
		  if (this.jenisLap === "Transaksi"){
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
		  }else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_kb");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_kb");				
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
			if (this.jenisLap === "Transaksi"){
				var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
				var dthtml = this.convertResultToHTML(undefined, data);
			}else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	},
	
});