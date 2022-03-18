window.app_saku2_report_kb_flKbDropingSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kb_flKbDropingSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kb_flKbDropingSaldo";
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from kas_m where kode_lokasi='"+this.app._lokasi+"' and modul='KBDROP' ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Bukti","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Bentuk Laporan","=","Droping Kirim"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,3);
};
window.app_saku2_report_kb_flKbDropingSaldo.extend(window.childForm);
window.app_saku2_report_kb_flKbDropingSaldo.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row ==2)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filterRep.ListDataSGFilter(this, "Data Droping",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_kas, a.keterangan from kas_m a "+this.filter,
												"select count(*) from kas_m a "+this.filter,
												new Array("a.no_kas","a.keterangan"),"and",new Array("No Bukti","Keterangan"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["123","23","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kas_m where modul='KBDROP' and kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Droping Kirim","Droping Terima"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Bukti","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Bentuk Laporan","=","Droping Kirim"));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.no_kas",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							" and a.modul='KBDROP' ";
				this.filter2 = this.sg1.getCell(2,1)+"/";
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				
					if (this.sg1.getCell(2,3)=="Droping Kirim")
					{
						var sql = "select a.no_kas,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.akun_kb,b.nama as nama_akun,a.keterangan, "+
								"	   a.nilai,isnull(c.terima,0) as terima,a.nilai-isnull(c.terima,0) as saldo "+
								"from kas_m a "+
								"inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"left join (select a.no_kas,sum(b.nilai) as terima "+
								"		   from yk_kasdrop_d a "+
								"		   inner join kas_m b on a.no_kasterima=b.no_kas and a.kode_loktuj=b.kode_lokasi "+
								"		   group by a.no_kas "+
								"	   )c on a.no_kas=c.no_kas "+this.filter+
								"order by a.no_kas ";
						this.scriptSqlCount = "select count(a.no_kas) "+
								"from kas_m a "+
								"inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"left join (select a.no_kas,sum(b.nilai) as terima "+
								"		   from yk_kasdrop_d a "+
								"		   inner join kas_m b on a.no_kasterima=b.no_kas and a.kode_loktuj=b.kode_lokasi "+
								"		   group by a.no_kas "+
								"	   )c on a.no_kas=c.no_kas "+this.filter;
						
						this.title = new server_util_arrayList({items:["No Kas","No Dokumen","Tanggal","Akun","Nama Akun","Keterangan","Nilai Kirim","Nilai Terima","Saldo"]});
						this.widthTable = new server_util_arrayList({items:[80,100,60,60,200,200,90,90,90]});
						this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N","N"]});																
						this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","Y","Y","Y"]});
					}
					if (this.sg1.getCell(2,3)=="Akun")
					{
						var sql = "select a.akun_kb,b.nama as nama_akun, "+
								"	   sum(a.nilai) as nilai,sum(isnull(c.terima,0)) as terima,sum(a.nilai)-sum(isnull(c.terima,0)) as saldo "+
								"from kas_m a "+
								"inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"left join (select b.akun_kb,sum(b.nilai) as terima "+
								"		   from yk_kasdrop_d a "+
								"		   inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
								"          inner join kas_m c on a.no_kasterima=c.no_kas and a.kode_loktuj=c.kode_lokasi "+
								"		   group by b.akun_kb "+
								"	   )c on a.akun_kb=c.akun_kb "+this.filter+
								"group by a.akun_kb,b.nama "+
								"order by a.akun_kb ";
						this.scriptSqlCount = "select count(a.akun_kb) "+
								"from kas_m a "+
								"inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"left join (select b.akun_kb,sum(b.nilai) as terima "+
								"		   from yk_kasdrop_d a "+
								"		   inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
								"          inner join kas_m c on a.no_kasterima=c.no_kas and a.kode_loktuj=c.kode_lokasi "+
								"		   group by b.akun_kb "+
								"	   )c on a.akun_kb=c.akun_kb "+this.filter+
								"group by a.akun_kb,b.nama ";
						
						this.title = new server_util_arrayList({items:["Akun","Nama Akun","Nilai Kirim","Nilai Terima","Saldo"]});
						this.widthTable = new server_util_arrayList({items:[60,300,90,90,90]});
						this.fieldType = new server_util_arrayList({items:["S","S","N","N","N"]});																
						this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y"]});
					}
					//this.groupHeader = new server_util_arrayList({items:["a.no_kas"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary);
					this.sqlScript = sql;
					this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.previewReport(dthtml);
				
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_kb_flKbDropingSaldo]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					if (this.sg1.getCell(2,3)!="Detail")
					{
						this.viewer.preview(result);
					}
					else
					{
						this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
						this.viewer.preview(result);			
						this.viewer.hideLoading();
					}
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
	    if (this.sg1.getCell(2,3)!="Detail")
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm.toUpperCase()+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
		  if (this.sg1.getCell(2,3)!="Detail")
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
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "karyawan.xls");
			downloadFile(file);
	      break;
		case "PreviewBtn" :      
			if (this.sg1.getCell(2,3)!="Detail")
            {	
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.allHtml);
				win.document.close();
			}
			else
			{
				window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			}
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
