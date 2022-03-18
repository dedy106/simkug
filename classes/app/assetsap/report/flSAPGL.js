window.app_assetsap_report_flSAPGL = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flSAPGL.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flSAPGL";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar Compare GL AM", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:1});
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=","201103"]);
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_assetsap_report_flSAPGL.extend(window.childForm);
window.app_assetsap_report_flSAPGL.implement({
	doEllipseClick: function(sender, col, row){		
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0],["3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0],[0]);		
		if (row == 0){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){								
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Periode","=","2011"]);				
			}else{
				this.app._mainForm.reportNavigator.serverDownload = true;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
								
		    	this.filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.showFilter = this.filterRep.showFilter(this.sg1);						
				
				var sql = "select a.kode_akun1, b.nama, a.nilai_gl, a.nilai_am, a.selisih1, a.catatan1 from amu_glrekon a "+
					" left outer join masakun b on b.kode_akun = a.kode_akun1 and b.kode_lokasi = a.kode_lokasi "+
					this.filter +					
					" union "+
					"select a.kode_akun2, b.nama, a.nilai_apgl, a.nilai_apam, a.selisih2, a.catatan2 from amu_glrekon a "+
					" left outer join masakun b on b.kode_akun = a.kode_akun2 and b.kode_lokasi = a.kode_lokasi  "+
					this.filter;
				
				this.title = new server_util_arrayList({items:["Akun ","Uraian","Nilai GL","Nilai ASET","Selisih","Uraian Selisih"]});
				this.widthTable = new server_util_arrayList({items:[100,250,100,100,100,250]});
				this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","S"]});												
				this.summary = new server_util_arrayList({items:["N","N","Y","Y","Y"]});	
				this.groupBy = undefined;					
				this.groupHeader = undefined;
				
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				
				this.scriptSqlCount = "select count(*) as tot from ("+ sql +") a ";
				this.finish = this.pager;
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_assetsap_report_flSAPGL]::mainButtonClick:"+e);
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
		this.finish = this.pager;
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		//this.previewReport(dthtml);			
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Data Rekap upload Aset<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
		previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br>Data KKIL yang perlu di review<br />";
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
			this.finish  = this.pager * this.viewer.getTotalPage();			
			var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br>Compare GL AM<br />";
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
			html.add(new Date().valueOf()+"_GLAM");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :				
			var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "GLAM.xls");
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
