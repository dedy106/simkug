window.app_eclaim2_report_flObyek = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_report_flObyek.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim2_report_flObyek";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Obyek Kerugian",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");		
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
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
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tertanggung","=",this.app._kodeTtg));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Jenis Asuransi","All"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Kode Obyek","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_eclaim2_report_flObyek.extend(window.childForm);
window.app_eclaim2_report_flObyek.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Tertanggung",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_ttg,nama from tlk_ttg where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_ttg) from tlk_ttg where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
		}
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Asuransi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_asuransi,nama from tlk_asuransi where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_asuransi) from tlk_asuransi where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("kode_asuransi","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_obyek,nama from tlk_obyek where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_obyek) from tlk_obyek where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}	
	},
	doSelectCell: function(sender, col, row){
		this.sg1.columns.get(2).setReadOnly(false);
		this.sg1.columns.get(2).setReadOnly(true);
		this.filterRep.setSGFilterRowTipe(this.sg1, row, [0],["123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0],[2]);
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Tertanggung","All"));
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
				this.filter = this.filterRep.filterStr("a.kode_ttg",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							this.filterRep.filterStr("a.kode_asuransi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
							this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
							this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.sql =  "select c.nama as nama_ttg,b.nama as nama_asuransi,a.kode_obyek,a.nama "+
							"from tlk_obyek a "+
							"inner join tlk_asuransi b on a.kode_asuransi=b.kode_asuransi "+
							"inner join tlk_ttg c on a.kode_ttg=c.kode_ttg "+this.filter+
							" order by a.kode_obyek ";
				this.scriptSqlCount =  "select count(a.kode_obyek) "+
							"from tlk_obyek a "+
							"inner join tlk_asuransi b on a.kode_asuransi=b.kode_asuransi "+
							"inner join tlk_ttg c on a.kode_ttg=c.kode_ttg "+this.filter;
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Nama Tertanggung");width.add(150);fieldType.add("S");		
				title.add("Nama Asuransi");width.add(150);fieldType.add("S");		
				title.add("Kode Obyek");width.add(60);fieldType.add("S");		
				title.add("Nama Obyek ");width.add(250);fieldType.add("S");
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,false);
				
				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = this.sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
		}catch(e)
		{
			alert("[app_eclaim2_report_flObyek]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN OBYEK KERUGIAN<br>";			
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
		  //sql,title, titleHeight, titleFontSize, orientation, pageFormat, fontSize, rowHeight, header, headerFontSize, headerHeight, headerWidth, namafile, margin	
				downloadFile(this.dbLib.getPdf(this.sqlScript, 
					new server_util_arrayList({items:[this.app._namalokasi.toUpperCase(), "LAPORAN OBYEK KERUGIAN"]}),
					new server_util_arrayList({items:[5, 6]}),
					new server_util_arrayList({items:[8, 12]}),
					'L','A4',8,8,
					this.title,8,8,
					new server_util_arrayList({items:[80,80,15,100]}),
					"objekkerugian.pdf", 10
				));
		  break;
		case "xlsBtn" :	
			var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add("PosisiSpp");				
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
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
