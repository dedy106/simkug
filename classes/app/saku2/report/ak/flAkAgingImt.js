window.app_saku2_report_ak_flAkAgingImt = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_ak_flAkAgingImt.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_ak_flAkAgingImt";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Aging Piutang", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from aka_bill_m ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jurusan","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("NIM","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Invoice","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Tanggal","=",new Date().lclFormat()));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku2_report_ak_flAkAgingImt.extend(window.childForm);
window.app_saku2_report_ak_flAkAgingImt.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_jur, a.nama from aka_jurusan a   "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  "select count(a.kode_jur) from aka_jurusan a "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  ["a.kode_jur","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 3)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				var sql1="select a.nim,a.nama from aka_mahasiswa a "+filter; 
				var sql2="select count(distinct a.nim) from aka_mahasiswa a "+filter;
				this.filterRep.ListDataSGFilter(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.nim","a.nama"),"and",new Array("NIM","Nama"),"and");
			}	
			if (row ==4)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.nim",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filterRep.ListDataSGFilter(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_inv,a.periode "+
												"from (select distinct no_inv,nim,periode,kode_lokasi "+
												"	  from aka_bill_d) a "+
												"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+this.filter,
												"select count(a.no_inv) "+
												"from (select distinct no_inv,nim,periode,kode_lokasi "+
												"	  from aka_bill_d) a "+
												"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+this.filter,
												new Array("a.no_inv","a.periode"),"and",new Array("No Invoice","Periode"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","23","123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,1]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from aka_bill_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Jurusan","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("NIM","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Invoice","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Tanggal","=",""));
			}else{
				this.initColumn();
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("c.kode_jur",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("c.nim",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.no_inv",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.filter2 = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				var tgl_aging=this.sg1.getCellDateValue(2,5);
				var sql = "select b.no_inv,b.nim,c.nama,c.kode_jur,date_format(a.tanggal,'%d/%m/%Y') as tanggal, "+
							"case when datediff (month,'"+tgl_aging+"',a.tanggal)<=6 then d.nilai else 0 end as aging1,"+
							"case when datediff (month,'"+tgl_aging+"',a.tanggal)>6 and datediff (month,'"+tgl_aging+"',a.tanggal)<=12 then d.nilai else 0 end as aging2,"+
							"case when datediff (month,'"+tgl_aging+"',a.tanggal)>12 and datediff (month,'"+tgl_aging+"',a.tanggal)<=24  then d.nilai else 0 end as aging3,"+
							"case when datediff (month,'"+tgl_aging+"',a.tanggal)>24 then d.nilai else 0 end as aging4 "+
							"from aka_bill_m a "+
							"inner join (select distinct no_bill,no_inv,nim "+
							"			from aka_bill_d "+
							"		)b on a.no_bill=b.no_bill "+
							"inner join aka_mahasiswa c on b.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
							"left join (select no_inv,sum(nilai) as nilai "+
							"		   from aka_bill_d "+
							"		   group by no_inv)d on b.no_inv=d.no_inv "+
							this.filter+" order by b.no_inv ";
				
				this.scriptSqlCount = "select count(b.no_inv) "+
							"from aka_bill_m a "+
							"inner join (select distinct no_bill,no_inv,nim "+
							"			from aka_bill_d "+
							"		)b on a.no_bill=b.no_bill "+
							"inner join aka_mahasiswa c on b.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["No Invoice","NIM","Nama","Jurusan","Tanggal","1-6 Bulan","7-12 Bulan","13-24 Bulan",">24 Bulan"]});
				this.widthTable = new server_util_arrayList({items:[80,80,300,60,60,80,80,80,80]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","N","N","N"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y"]});
					
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false, this.groupBy, undefined, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_ak_flAkAgingImt]::mainButtonClick:"+e);
		}
	},
	initColumn: function(){
		try{		
			var sql="select a.kode_produk,a.nama from aka_produk a "+
					"inner join (select distinct kode_produk from aka_bill_d) b on a.kode_produk=b.kode_produk "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut"
            var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data != "string"){											
				var line,title = [], nama = [];
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_produk);						
					this.dataParam.set(line.kode_produk, line);
					nama.push(line.nama);						
				}										
				this.colTitle = title;
				this.namaField = nama;
				
			}
		}catch(e){
			alert(e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN AGING<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
