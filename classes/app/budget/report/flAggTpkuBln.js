window.app_budget_report_flAggTpkuBln = function(owner)
{
	
	try{
	if (owner)
	{
		window.app_budget_report_flAggTpkuBln.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggTpkuBln";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi Gaji TPKU Per Bulan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,190],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,167],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], 
										ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],
										colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="All";
	this.nik="";
	
	if (this.app._userStatus!="A")
	{
		this.tanda="=";
		this.nik=this.app._userLog;
	}
	this.lokasi=this.app._lokasi;
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tpku where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun Anggaran","=",this.tahun]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Bulanan"]);
	//this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.pager=100;
	}catch(e) {alert("constructor = "+e);}
};
window.app_budget_report_flAggTpkuBln.extend(window.portalui_childForm);
window.app_budget_report_flAggTpkuBln.implement({
	doEllipseClick: function(sender, col, row){
		if (row === 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
								  "select kode_lokasi, nama from lokasi ",
								  "select count(*) from lokasi ",
								  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["3","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[3,0,0]);
		
		if (row == 1){
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_tpku a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Bulanan","Triwulan","Semester"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun Anggaran","=",this.tahun]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Bulanan"]);
				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
											
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,2);
				var result  = new portalui_arrayMap();
				if (this.jenisLap == "Bulanan")
				{
					var sql="select distinct a.no_kontrak,a.dokter,a.alamat,a.kode_pp,d.nama as nama_pp,a.kode_akun,b.nama as nama_akun,a.kode_rka,c.nama as nama_rka, "+
							"isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.g03,0) as g03,isnull(f.g04,0) as g04, "+
							"	   isnull(f.g05,0) as g05,isnull(f.g06,0) as g06,isnull(f.g07,0) as g07,isnull(f.g08,0) as g08, "+
							"	   isnull(f.g09,0) as g09,isnull(f.g10,0) as g10,isnull(f.g11,0) as g11,isnull(f.g12,0) as g12,isnull(f.total,0) as total  "+
							"from agg_tpku a "+
							"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"inner join agg_rka c on a.kode_rka=c.kode_rka "+
							"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
							"left join (select a.no_kontrak, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.nilai_final else 0 end ) as g01, "+
							"	   sum(case when substring(a.periode,5,2) between '02' and '02' then a.nilai_final else 0 end ) as g02, "+
							"	   sum(case when substring(a.periode,5,2) between '03' and '03' then a.nilai_final else 0 end ) as g03, "+
							"	   sum(case when substring(a.periode,5,2) between '04' and '04' then a.nilai_final else 0 end ) as g04, "+
							"	   sum(case when substring(a.periode,5,2) between '05' and '05' then a.nilai_final else 0 end ) as g05, "+
							"	   sum(case when substring(a.periode,5,2) between '06' and '06' then a.nilai_final else 0 end ) as g06, "+
							"	   sum(case when substring(a.periode,5,2) between '07' and '07' then a.nilai_final else 0 end ) as g07, "+
							"	   sum(case when substring(a.periode,5,2) between '08' and '08' then a.nilai_final else 0 end ) as g08, "+
							"	   sum(case when substring(a.periode,5,2) between '09' and '09' then a.nilai_final else 0 end ) as g09, "+
							"	   sum(case when substring(a.periode,5,2) between '10' and '10' then a.nilai_final else 0 end ) as g10, "+
							"	   sum(case when substring(a.periode,5,2) between '11' and '11' then a.nilai_final else 0 end ) as g11, "+
							"	   sum(case when substring(a.periode,5,2) between '12' and '12' then a.nilai_final else 0 end ) as g12, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai_final else 0 end ) as total "+ 
							"		    from agg_tpku a "+this.filter+
							"		   group by no_kontrak) f on a.no_kontrak=f.no_kontrak "+this.filter+
							"order by a.no_kontrak";
				
				}
				if (this.jenisLap == "Triwulan")
				{
					var sql="select distinct a.no_kontrak,a.dokter,a.alamat,a.kode_pp,d.nama as nama_pp,a.kode_akun,b.nama as nama_akun,a.kode_rka,c.nama as nama_rka, "+
							"isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.g03,0) as g03,isnull(f.g04,0) as g04,isnull(f.total,0) as total  "+
							"from agg_tpku a "+
							"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"inner join agg_rka c on a.kode_rka=c.kode_rka "+
							"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
							"left join (select a.no_kontrak, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai_final else 0 end ) as g01, "+
							"	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai_final else 0 end ) as g02, "+
							"	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai_final else 0 end ) as g03, "+
							"	   sum(case when substring(a.periode,5,2) between '10' and '12' then a.nilai_final else 0 end ) as g04, "+ 
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai_final else 0 end ) as total "+ 
							"		    from agg_tpku a "+this.filter+
							"		   group by no_kontrak) f on a.no_kontrak=f.no_kontrak "+this.filter+
							"order by a.no_kontrak";
				}
				if (this.jenisLap == "Semester")
				{
					var sql="select distinct a.no_kontrak,a.dokter,a.alamat,a.kode_pp,d.nama as nama_pp,a.kode_akun,b.nama as nama_akun,a.kode_rka,c.nama as nama_rka, "+
							"isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.total,0) as total  "+
							"from agg_tpku a "+
							"inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"inner join agg_rka c on a.kode_rka=c.kode_rka "+
							"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
							"left join (select a.no_kontrak, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.nilai_final else 0 end ) as g01, "+
							"	   sum(case when substring(a.periode,5,2) between '07' and '12' then a.nilai_final else 0 end ) as g02, "+
							"	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai_final else 0 end ) as total "+ 
							"		    from agg_tpku a "+this.filter+
							"		   group by no_kontrak) f on a.no_kontrak=f.no_kontrak "+this.filter+
							"order by a.no_kontrak";
				}
				
				this.scriptSqlCount = "select 1";
			
				if (this.jenisLap === "Bulanan"){
					this.title = new server_util_arrayList({items:["No Kontrak","Dokter","Alamat","Kode PP","Nama PP","Kode akun","Nama Akun","Kode RKA","Nama RKA","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember","Total"]});
					this.widthTable = new server_util_arrayList({items:[100,150,150,60,150,80,200,80,200,80,80,80,80,80,80,80,80,80,80,80,80,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Triwulan"){
					this.title = new server_util_arrayList({items:["No Kontrak","Dokter","Alamat","Kode PP","Nama PP","Kode akun","Nama Akun","Kode RKA","Nama RKA","Triwulan Ke-1","Triwulan Ke-2","Triwulan Ke-3","Triwulan Ke-4","Total"]});
					this.widthTable = new server_util_arrayList({items:[100,150,150,60,150,80,200,80,200,100,100,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}else if (this.jenisLap === "Semester"){
					this.title = new server_util_arrayList({items:["No Kontrak","Dokter","Alamat","Kode PP","Nama PP","Kode akun","Nama Akun","Kode RKA","Nama RKA","Semester Ke-1","Semester Ke-2","Total"]});
					this.widthTable = new server_util_arrayList({items:[100,150,150,60,150,80,200,80,200,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N","N"]});
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y","Y"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_budget_report_flAggTpkuBln]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		if (this.jenisLap === "Bulanan")
			var header = "LAPORAN REKAPITULASI GAJI TPKK PER BULAN";
		else if (this.jenisLap === "Triwulan")
			var header = "LAPORAN EKAPITULASI GAJI TPKK PER TRIWULAN";
		else if (this.jenisLap === "Semester")
			var header = "LAPORAN REKAPITULASI GAJI TPKK PER SEMESTER";
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_rekapGaji");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_rekapGaji");				
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title,this.widthTable,this.fieldType,true,undefined,this.summary);
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