window.app_budget_report_flGajiSppd = function(owner)
{
	if (owner)
	{
		window.app_budget_report_flGajiSppd.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flGajiSppd";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Gaji SPPD", 2);
		uses("panel;saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");		
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";	
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_gaji_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Bidang ","All",""]);	
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Status","All",""]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
	this.pager=100;
};
window.app_budget_report_flGajiSppd.extend(window.portalui_childForm);
window.app_budget_report_flGajiSppd.implement({
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
				this.standar.ListDataSGFilter2(this, "Data Bidang",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_bidang,nama from agg_bidang ",
										"select count(*) from agg_bidang ",
										["kode_bidang","nama"],"where",["Kode","Nama"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["123","123","123","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,0]);	
		if (row == 1)
		{
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_sppd_m a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("6. Pengurus","7. TKBW Paramedis","8. Organik","9. TKBW Administrasi"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode bidang","All",""]);	
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Status","All",""]);	
			}else{			
				this.initColumn();
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				this.filter = this.filterRep.filterStr("c.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("c.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
							
				this.filter2 = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
								this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
								this.filterRep.filterStr("e.kode_bidang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
								this.filterRep.filterStr("a.status_org",this.sg1.getCell(1,3),this.sg1.getCell(2,3).substr(0,1),this.sg1.getCell(3,3).substr(0,1),"and");
				this.scriptSqlCount = "select count(a.nik) "+
								"from agg_karyawan a "+
								"inner join agg_jab c on a.kode_jab=c.kode_jab "+
								"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
								"inner join agg_kota f on a.kode_kota=f.kode_kota "+this.filter2;
				
				var sql = "select a.nik,a.nama,c.nama as nama_jab,a.kode_band,a.kode_pp, e.nama as nama_pp,f.nama as nama_kota,f.idx  ";
				for (var c in this.colTitle) sql += ", sum(isnull(b.t"+this.colTitle[c]+",0)) as t"+this.colTitle[c];
				sql +=",sum(";
				for (var c in this.colTitle) sql += " isnull(b.t"+this.colTitle[c]+",0)"+(c < this.colTitle.length - 1 ? "+":"");
				sql += ") as total_tranport";
				
				for (var c in this.colTitle) sql += ", sum(isnull(g.h"+this.colTitle[c]+",0)) as h"+this.colTitle[c];
				sql +=",sum(";
				for (var c in this.colTitle) sql += " isnull(g.h"+this.colTitle[c]+",0)"+(c < this.colTitle.length - 1 ? "+":"");
				sql += ") as total_harian";
				sql +=",sum(";
				for (var c in this.colTitle) sql += " isnull(b.t"+this.colTitle[c]+",0)"+(c < this.colTitle.length - 1 ? "+":"");
				for (var c in this.colTitle) sql += " +isnull(g.h"+this.colTitle[c]+",0)"+(c < this.colTitle.length - 1 ? "+":"");
				sql += ") as total_sppd";
				
				sql += "	from agg_karyawan a "+
								"inner join agg_jab c on a.kode_jab=c.kode_jab "+
								"inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
								"inner join agg_kota f on a.kode_kota=f.kode_kota "+
								  " left outer join (select a.nik ";
				for (var c in this.colTitle) sql += ", sum(case when kode_program = '"+this.colTitle[c]+"' then nilai else 0 end) as t"+this.colTitle[c];
				sql +=	"		   from agg_sppd_d a "+
								  "		   inner join agg_sppd_m c on a.no_gaji=c.no_gaji and a.kode_lokasi=c.kode_lokasi "+this.filter+
								  "group by a.nik "+
								  "			  ) b on a.nik=b.nik "+
								   " left outer join (select a.nik";
				for (var c in this.colTitle) sql += ", sum(case when kode_program = '"+this.colTitle[c]+"' then nilai_harian else 0 end) as h"+this.colTitle[c];
				sql +=	"		   from agg_sppd_d a "+
								  "		   inner join agg_sppd_m c on a.no_gaji=c.no_gaji and a.kode_lokasi=c.kode_lokasi "+this.filter+
								  "group by a.nik "+
								  "			  ) g on a.nik=g.nik "+this.filter2+
								  "	group by a.nik, a.nama,c.nama,a.kode_band,a.kode_pp, e.nama,f.nama,f.idx  order by a.kode_band";									
				
				var s = [];
				title.add("NIK");width.add(50);fieldType.add("S"); s[s.length] = "N";
				title.add("Nama");width.add(150);fieldType.add("S");s[s.length] = "N";
				title.add("Jabatan");width.add(150);fieldType.add("S");s[s.length] = "N";
				title.add("Band");width.add(80);fieldType.add("S");s[s.length] = "N";
				title.add("Kode PP");width.add(80);fieldType.add("S");s[s.length] = "N";
				title.add("Nama PP");width.add(150);fieldType.add("S");s[s.length] = "N";
				title.add("Kota");width.add(100);fieldType.add("S");s[s.length] = "N";
				title.add("Index");width.add(50);fieldType.add("N");s[s.length] = "N";
				for (var c in this.namaField) {
					title.add(this.namaField[c]);width.add(80);fieldType.add("N");
					s[s.length] = "Y";
				}
				title.add("Total Transport");width.add(80);fieldType.add("N");s[s.length] = "Y";
				for (var c in this.namaField) {
					title.add(this.namaField[c]);width.add(80);fieldType.add("N");
					s[s.length] = "Y";
				}
				title.add("Total Uang Harian");width.add(80);fieldType.add("N");s[s.length] = "Y";
				title.add("Total SPPD");width.add(80);fieldType.add("N");s[s.length] = "Y";
				this.summary = new server_util_arrayList({items:s});												
				
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, title, width, fieldType,true,undefined,this.summary);
				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_budget_report_flGajiSppds]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN GAJI SPPD<br />";
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
		  var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,"","",undefined);
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
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_angsKol");				
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
	},
	initColumn: function(){
		try{		
			 var data = this.dbLib.getDataProvider("select kode_program,kode_program+'-'+nama as nama from agg_program where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by kode_program",true);
			if (typeof data != "string"){											
				var line,title = [], nama = [];	                
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_program);	
					this.dataParam.set(line.kode_program, line);
					nama.push(line.nama);
				}										
				this.colTitle = title;
				this.namaField = nama;
				
			}
		}catch(e){
			alert(e);
		}
	}
});
