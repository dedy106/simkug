window.app_saku2_report_yks_flHutang = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_yks_flHutang.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_yks_flHutang";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Saldo Hutang Piutang", 2);
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode "+
									"from (select distinct periode,kode_lokasi from yk_hutang_d "+
									"union "+
									"select distinct periode,kode_lokasi from yk_valid_d) a ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","<=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Modul","=","Hutang"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Vendor","All",""));	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,4);
};
window.app_saku2_report_yks_flHutang.extend(window.childForm);
window.app_saku2_report_yks_flHutang.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 3)
			{
				if (this.sg1.cells(2,2).toLowerCase() == "hutang") var table = "select a.kd_mitra, a.nm_mitra from yk_mitra_kes a ";
				else var table = "select a.kode_cust as kd_mitra, nama as nm_mitra from cust a  ";
				this.filterRep.ListDataSGFilter(this, "Data Vendor",this.sg1, this.sg1.row, this.sg1.col,
														  "select kd_mitra, nm_mitra from  "+
														  " ( "+table+") a ",
														  "select count(a.kd_mitra) from  "+
														  " ( "+table+") a ",
														  ["kd_mitra","nm_mitra"],"and",["Kode","Nama"]);
			}			
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","6","3","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,0,2,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select a.periode "+
									"from (select distinct periode,kode_lokasi from yk_hutang_d "+
									"union "+
									"select distinct periode,kode_lokasi from yk_valid_d) a order by a.periode",[this.sg1.columns.get(2).pickList]);
		}		
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Hutang","Piutang"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode Rekon","<=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Modul","=","Hutang"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Vendor","All",""));				
			}else{
				this.app._mainForm.reportNavigator.serverDownload = true;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	var result  = new arrayMap();		
				if (this.sg1.getCell(2,2).toLowerCase()=="hutang")
				{
					this.lokasi=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
					this.filter = this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("c.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kd_mitra",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var sql = "select a.kd_mitra,a.nm_mitra, "+
							"	   b.no_hutang, date_format(c.tanggal, '%d-%m-%Y'), c.periode, c.keterangan, b.nilai_bp, b.nilai_cc,b.nilai_bp + b.nilai_cc as total "+
							"from yk_mitra_kes a "+
							"inner join yk_hutang_d b on b.kode_Vendor = a.kd_mitra and b.no_rekon = '-' "+
							" inner join yk_hutang_m c on c.no_hutang = b.no_hutang "+ this.filter;
					
					this.scriptSqlCount = "select count(*) "+
							"from ("+sql +") ";
					
					this.title = new server_util_arrayList({items:["Vendor","Nama Vendor","No Hutang","Tanggal","Periode","Keterangan","Nilai BP","Nilai CC","Total"]});
					this.widthTable = new server_util_arrayList({items:[60,350,100,90,90,250,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,2).toLowerCase()=="piutang")
				{
					this.lokasi=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
					this.filter = this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("c.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
					this.showFilter = this.filterRep.showFilter(this.sg1);
				
					var sql = "select a.kode_cust,a.nama, "+
							"	   b.no_valid,date_format(c.tanggal, '%d-%m-%Y') as tgl, c.periode, c.keterangan,  "+
							"	sum(case when substring(b.kode_cust,1,3) = 'PEN' then 0 else b.nilai end) as piutang, "+
							"	sum(case when substring(b.kode_cust,1,3) = 'PEN' then b.nilai else 0 end) as cc, "+
							"	sum(b.nilai) as total "+
							"from cust a "+
							"inner join yk_valid_d b on b.kode_cust = a.kode_cust "+
							" inner join yk_hutang_m c on c.no_hutang = b.no_valid " + this.filter +
							" group by a.kode_cust, a.nama, b.no_valid, c.tanggal, c.periode, c.keterangan ";
					
					this.scriptSqlCount = "select count(*) "+
							"from ("+sql +") ";
					this.title = new server_util_arrayList({items:["Kode HR","Nama HR","No Piutang","Tanggal","Periode","Keterangan","Nilai Piutang","Nilai CC","Total"]});
					this.widthTable = new server_util_arrayList({items:[60,350,100,90,90,250,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","Y","Y","Y"]});
				}
				
				//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_yks_flHutang]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>SALDO "+this.sg1.cells(2,2)+"<br>Periode : "+this.sg1.getCell(2,1)+"<br> </div>";
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
		  //old
		  //var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  //this.previewReport(dthtml);
			var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN SALDO PIUTANG MAHASISWA<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
			var d = new Date();
			html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
			html += "</div>";
			var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
			previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
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
	      	this.app._mainForm.reportNavigator.serverDownload = false;
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
