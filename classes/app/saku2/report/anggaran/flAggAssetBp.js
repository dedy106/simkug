window.app_saku2_report_anggaran_flAggAssetBp = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_anggaran_flAggAssetBp.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_anggaran_flAggAssetBp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new portalui_panel(this,{bound:[10,10,722,200],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,720,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
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
	if (this.app._lokasi != "00") {
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_fa_asset where kode_lokasi='"+this.app._lokasi+"'");
	}
	else {
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2,3), new Array("Kode Lokasi","Range","01","99"));
		this.tahun="2011";
	}
	
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Asset","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Asset","=","T-Tambahan"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Asset","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode RKA","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Kode Bidang","All",""));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
};
window.app_saku2_report_anggaran_flAggAssetBp.extend(window.childForm);
window.app_saku2_report_anggaran_flAggAssetBp.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			if (this.app._lokasi != "00")
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
			else
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi ",
											"select count(kode_lokasi) from lokasi",
											["kode_lokasi","nama"],"and",["Kode","Nama"]);

		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col,
												"select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												"select count(a.kode_klpfa) from (select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+") a",
												["a.kode_klpfa","a.nama"],"and",["Kode","Nama"]);
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Asset",this.sg1, this.sg1.row, this.sg1.col,
												"select b.no_fa,b.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("b.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
												"select count(a.kode_klpfa) from (select distinct a.kode_klpfa,a.nama "+
												"from agg_fa_klp a "+
												"inner join agg_fa_asset b on a.kode_klpfa=b.kode_klpfa "+
												this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("b.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+") a",
												["b.no_fa","b.nama"],"and",["Kode","Nama"]);
		}
		if (row == 5)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_akun, nama from agg_masakun  where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
													  ["kode_akun","nama"],"and",["Kode","Nama"]);
		}
		if (row == 6)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_drk, nama from agg_drk  ",
													  "select count(kode_drk) from agg_drk   ",
													  ["kode_drk","nama"],"where",["Kode","Nama"]);
		}	
		if (row === 7)
		{
			this.standar.ListDataSGFilter2(this, "Data Bidang",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_bidang,nama from agg_bidang ",
									"select count(*) from agg_bidang ",
									["kode_bidang","nama"],"where",["Kode","Nama"]);
		}
		
	
	},
	
	doSelectCell: function(sender, col, row){
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","3","123","13","123","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,0,2,0,2,2,2,2]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["3","3","123","13","123","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,0,2,0,2,2,2,2]);
		}
		if (row == 1)
		{
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_fa_asset a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("T-Tambahan","E-Eksisting"));
		}	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kelompok Asset","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis Asset","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Asset","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Kode RKA","All",""));
				this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Kode Bidang","All",""));
				
			}else{
					this.p1.setVisible(false);
					this.viewer.prepare();
					this.viewer.setVisible(true);
					this.app._mainForm.pButton.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(true);
					
					this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						  this.filterRep.filterStr("a.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						  this.filterRep.filterStr("a.jenis_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3).substr(0,1),this.sg1.getCell(3,3).substr(0,1),"and")+
						  this.filterRep.filterStr("a.no_fa",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
					this.filter2 = this.filterRep.filterStr("a.akun_bp",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
						   this.filterRep.filterStr("a.kode_drk",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
						   this.filterRep.filterStr("c.kode_bidang",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and");
					this.tahun=this.sg1.getCell(2,1);				
					this.showFilter = this.filterRep.showFilter(this.sg1);
					var result  = new arrayMap();	
					this.sql="select b.nama,a.no_fa,a.nama,a.kode_akun,c.nama as nama_akun,a.kode_pp2,g.nama as nama_pp,a.kode_drk,d.nama as nama_drk, "+
							"	  date_format(a.tgl_perolehan,'%d/%m/%Y') as tanggal,b.umur/12 as umur,b.persen,a.jumlah,a.nilai,round(a.nilai * a.persen/100/12,0) as nilai_susut "+
							"	   ,isnull(e.nilai_ap,0) as nilai_ap,a.nilai-isnull(e.nilai_ap,0)as nilai_buku, "+
							"	   isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.g03,0) as g03,isnull(f.g04,0) as g04, "+
							"	   isnull(f.g05,0) as g05,isnull(f.g06,0) as g06,isnull(f.g07,0) as g07,isnull(f.g08,0) as g08, "+ 
							"	   isnull(f.g09,0) as g09,isnull(f.g10,0) as g10,isnull(f.g11,0) as g11,isnull(f.g12,0) as g12, "+
							"	   isnull(f.total,0) as total "+	
							"from agg_fa_asset a "+
							"inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun  "+
							"inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+ 
							"inner join agg_drk d on a.kode_drk=d.kode_drk  "+
							"inner join pp g on a.kode_pp2=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
							"left join (select a.no_fa,sum(a.nilai)as nilai_ap "+
							"	   from agg_fasusut_d a "+
							"           inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"	   where a.status='BP' and substring(periode,1,4)<'"+this.tahun+"' "+this.filter2+
							"	   group by a.no_fa)e on a.no_fa=e.no_fa "+
							"left join (select a.no_fa, "+
							"			  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end ) as g01, "+
							"		  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end ) as g02, "+
							"		  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end ) as g03, "+
							"		  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end ) as g04, "+
							"		  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end ) as g05, "+
							"		  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end ) as g06, "+
							"		  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end ) as g07, "+
							"		  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end ) as g08, "+
							"		  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end ) as g09, "+
							"		  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end ) as g10, "+
							"		  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end ) as g11, "+
							"		  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end ) as g12, "+
							"		  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as total "+
							"	   from agg_fasusut_d a "+
							"           inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"	   where a.status='BP' and substring(periode,1,4)='"+this.tahun+"'  "+this.filter2+
							"	   group by a.no_fa)f on a.no_fa=f.no_fa "+
							this.filter+" and isnull(f.total,0)<>0 "+
							"order by a.kode_klpakun,a.no_fa";	
					this.scriptSqlCount = "select count(a.no_fa) "+	
							"from agg_fa_asset a "+
							"inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun  "+
							"inner join agg_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+ 
							"inner join agg_drk d on a.kode_drk=d.kode_drk  "+
							"inner join pp g on a.kode_pp2=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
							"left join (select a.no_fa,sum(a.nilai)as nilai_ap "+
							"	   from agg_fasusut_d a "+
							"           inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"	   where a.status='BP' and substring(periode,1,4)<'"+this.tahun+"' "+this.filter2+
							"	   group by a.no_fa)e on a.no_fa=e.no_fa "+
							"left join (select a.no_fa, "+
							"		  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end ) as total "+
							"	   from agg_fasusut_d a "+
							"           inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"	   where a.status='BP' and substring(periode,1,4)='"+this.tahun+"'  "+this.filter2+
							"	   group by a.no_fa)f on a.no_fa=f.no_fa "+
							this.filter+" and isnull(f.total,0)<>0 ";
					this.title = new server_util_arrayList({items:["Kelompok Asset","No Asset","Nama","Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Tgl Perolehan","Umur","Persen","Jumlah","Nilai Perolehan","Nilai Susut","Jumlah AP","Nilai Buku","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember","Total"]});
					this.widthTable = new server_util_arrayList({items:[150,60,150,60,150,50,150,60,150,60,40,40,40,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","D","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","Y","N","N","N","Y"]});					
					var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
					this.sqlScript = this.sql;
					this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.previewReport(dthtml);
				}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_anggaran_flAggAssetBp]::mainButtonClick:"+e);
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
