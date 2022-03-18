window.app_saku_inventory_report_flGbJualT = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flGbJualT.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flGbJualT";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Penerimaan GB Penjualan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5,6],["3","3","13","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from gb_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Akun Piutang GB","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Bank","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No. GB","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Jenis Laporan","=","Transaksi"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flGbJualT.extend(window.portalui_childForm);
window.app_saku_inventory_report_flGbJualT.implement({
	doEllipseClick: function(sender, col, row){
		if (row === 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun Piutang GB",this.sg1, this.sg1.row, this.sg1.col,
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='026' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='026' ",
									  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (row === 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Rekening Bank",this.sg1, this.sg1.row, this.sg1.col,
									  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='009' and a.kode_curr='IDR'",										  
									  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' and b.kode_flag='009' and a.kode_curr='IDR'",
									  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
		}
		if (row === 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_cust, nama  from cust where kode_lokasi='"+this.sg1.getCell(2,0)+"'",
									  "select count(kode_cust) from cust where kode_lokasi='"+this.sg1.getCell(2,0)+"'",
									  ["kode_cust","nama"],"and",["Kode Cust","Nama"],false);
		}
		if (row === 5)
		{
			this.standar.ListDataSGFilter(this, "Data No. GB Penerimaan GB Penjualan",this.sg1, this.sg1.row, this.sg1.col,
									  "select no_gb, keterangan from gb_m "+
									  this.filterRep.filterStr("akun_gb",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
									  this.filterRep.filterStr("kode_bank",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
									  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from gb_m "+
									  this.filterRep.filterStr("akun_gb",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
									  this.filterRep.filterStr("kode_bank",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
									  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  ["no_gb","keterangan"],"and",["No. Bukti","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","3","13","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","3","13","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[3,0,2,2,2,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from gb_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Daftar","Transaksi"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Akun Piutang GB","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Bank","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No. GB","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Jenis Laporan","=","Transaksi"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.akun_gb",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_bank",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.no_gb",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				this.jenisLap = "Transaksi";/*this.sg1.getCell(2,6);*/
				var sql = "select a.no_gb,a.no_dokumen,a.keterangan,a.kode_bank,b.nama as nama_bank,a.nik_buat,c.nama as nama_buat,a.kode_cust,d.nama as nama_cust,a.akun_kb,a.posted,a.periode,a.nilai,a.progress,date_format(a.due_date,'%d/%m/%Y') as due_date,date_format(a.tgl_terbit,'%d/%m/%Y') as tgl_terbit,a.akun_gb,aa.nama as nama_gb ";
				if (this.jenisLap === "Transaksi")
					sql+=",f.no_jual,f.akun_piutang,date_format(f.tanggal,'%d/%m/%Y') as tanggal,f.keterangan as ket,f.nilai+f.nilai_ppn as nilai_d,ifnull(g.totgb,0)+ifnull(h.totbayar,0) as totbayar,(f.nilai+f.nilai_ppn - (ifnull(g.totgb,0)+ifnull(h.totbayar,0))) as sisahut, i.ngb ";
				sql+="from gb_m a inner join bank2 b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
					"inner join masakun aa on a.akun_gb=aa.kode_akun and a.kode_lokasi=aa.kode_lokasi "+
					"inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					"inner join gb_d e on a.no_gb=e.no_gb and a.kode_lokasi=e.kode_lokasi and e.modul='GBJUAL' "+
					"inner join inv_jual_m f on e.no_bukti=f.no_jual and e.kode_lokasi=f.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totgb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='GBJUAL' and x.no_del='-' and x.no_gb not like '%"+this.sg1.getCell(2,5)+"' "+
					"  group by y.no_bukti,x.kode_lokasi) "+
					"  g on f.no_jual=g.no_bukti and f.kode_lokasi=g.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totbayar from kas_m x inner join kas_d y on x.no_kas=y.no_kas and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='INVJUAL' and x.no_del='-' "+
					"  group by y.no_bukti,x.kode_lokasi) "+
					"  h on f.no_jual=h.no_bukti and f.kode_lokasi=h.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as ngb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='GBJUAL' and x.no_del='-' and x.no_gb like '%"+this.sg1.getCell(2,5)+"' "+
					"	group by y.no_bukti,x.kode_lokasi) "+
					"  i on f.no_jual=i.no_bukti and f.kode_lokasi=i.kode_lokasi "+this.filter+
					" and a.no_del='-' order by a.no_gb";
				this.scriptSqlCount = "select count(*) "+
					"from gb_m a inner join bank2 b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
					"inner join masakun aa on a.akun_gb=aa.kode_akun and a.kode_lokasi=aa.kode_lokasi "+
					"inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					"inner join gb_d e on a.no_gb=e.no_gb and a.kode_lokasi=e.kode_lokasi and e.modul='GBJUAL' "+
					"inner join inv_jual_m f on e.no_bukti=f.no_jual and e.kode_lokasi=f.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totgb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='GBJUAL' and x.no_del='-' and x.no_gb not like '%"+this.sg1.getCell(2,5)+"' "+
					"  group by y.no_bukti,x.kode_lokasi) "+
					"  g on f.no_jual=g.no_bukti and f.kode_lokasi=g.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totbayar from kas_m x inner join kas_d y on x.no_kas=y.no_kas and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='INVJUAL' and x.no_del='-' "+
					"  group by y.no_bukti,x.kode_lokasi) "+
					"  h on f.no_jual=h.no_bukti and f.kode_lokasi=h.kode_lokasi "+
					"left outer join "+
					"  (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as ngb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
					"  where x.kode_lokasi='"+this.sg1.getCell(2,0)+"' and y.modul='GBJUAL' and x.no_del='-' and x.no_gb like '%"+this.sg1.getCell(2,5)+"' "+
					"	group by y.no_bukti,x.kode_lokasi) "+
					"  i on f.no_jual=i.no_bukti and f.kode_lokasi=i.kode_lokasi "+this.filter+
					" and a.no_del='-' order by a.no_gb";
				if (this.jenisLap === "Daftar"){
					this.title = new server_util_arrayList({items:["No Invoice","No Kontrak","Customer","Tanggal","No Bill","Keterangan","Nilai"]});			
					this.widthTable = new server_util_arrayList({items:[120, 120, 120,80,120,280,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","D","S","S","N"]});			
					//this.groupBy = new server_util_arrayList({items:["customer","no_kontrak","no_invoice","tgl"]});			
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				}else{
					this.title = new server_util_arrayList({items:["No. Faktur","Ak. Piutang","Tanggal","Keterangan","Netto","Total Bayar","Sisa Piutang","Nilai Pelunasan"]});
					this.widthTable = new server_util_arrayList({items:[100,80,80,150,100,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});				
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flGbJualT]::mainButtonClick:"+e);
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
			var header = "LAPORAN PENERIMAAN GB PENJUALAN";
		else var header = "DAFTAR PENERIMAAN GB PENJUALAN";
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
			html.add(new Date().valueOf()+"_returbeli");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_returbeli");				
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
	convertResultToHTML: function(result,data){		
		result = result.result;		
		/*if (this.dokumen === undefined)
			this.dokumen = result;
        else result = this.dokumen;*/
		if (data === undefined)
			table = result[0];			
		else table = data;
		var htmlHeader="",first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut=0;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_gb){
				first = true;
				no_bill = line.no_gb;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='8'>Total </td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				var tot=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Bukti</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_gb+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Dokumen</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_dokumen+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal Terbit</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl_terbit+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal Jth. Tempo</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.due_date+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Akun Hutang GB</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.akun_gb+"-"+line.nama_gb+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Rekening Kas Bank</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kode_bank+"-"+line.nama_bank+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>NIK Approve</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nik_buat+"-"+line.nama_buat+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Vendor</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kode_vendor+"-"+line.nama_vendor+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.nilai)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_jual" || c === "akun_piutang" || c === "tanggal" || c === "ket" || c === "nilai_d" || c === "totbayar" || c === "sisahut" || c === "ngb"){
					if (c === "nilai_d" || c === "totbayar" || c === "sisahut" || c === "ngb")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			tot += parseInt(line.ngb);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='8'>Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});