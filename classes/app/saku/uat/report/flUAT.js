window.app_saku_uat_report_flUAT = function(owner)
{
	if (owner)
	{
		window.app_saku_uat_report_flUAT.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_uat_report_flUAT";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan UAT", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	if (this.userStatus==="A")
	{
		this.tanda="All";
		this.lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Kode Lokasi",this.tanda,this.lokasi]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["No. UAT","All",""]);		
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_uat_report_flUAT.extend(window.portalui_childForm);
window.app_saku_uat_report_flUAT.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{			
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1,this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi ",
												  "select count(*) from lokasi ",
												  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row == 1)
			{			
				this.filterRep.ListDataSGFilter(this,"Data UAT",this.sg1,this.sg1.row,this.sg1.col,
												  "select no_uat,no_dokumen,keterangan from uat_m where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
												  "select count(*) from uat_m where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
												  ["no_uat","no_dokumen","keterangan"],"where",["Kode","No. Dokumen","Keterangan"])};	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[2,2]);
		}else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[3,2]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["No. UAT","=",""]);	
			}
			else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
				this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.no_uat",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.sql = "select b.kode_form ,b.nama,a.keterangan,a.flag_user,c.nik_buat,' ' as paraf "+
			"from uat_d a inner join menu b on a.kode_menu=b.kode_menu and a.kode_klp=b.kode_klp "+
			"inner join uat_m c on c.no_uat=a.no_uat "+this.filter+" order by a.nu ";
				this.scriptSqlCount = "select count(*) from uat_d a inner join menu b on a.kode_menu=b.kode_menu and a.kode_klp=b.kode_klp "+
				"inner join uat_m c on c.no_uat=a.no_uat "+this.filter;
				
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("NO. FORM");width.add(80);fieldType.add("S");		
				title.add("FORM NAME");width.add(200);fieldType.add("S");		
				title.add("ERROR (Singkat, jelas)");width.add(250);fieldType.add("S");		
				title.add("STATUS");width.add(80);fieldType.add("S");	
				title.add("USER");width.add(80);fieldType.add("S");		
				title.add("Paraf");width.add(150);fieldType.add("S");
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width, fieldType,false);
				
				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = this.sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			    this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_uat_report_flUAT]::mainButtonClick:"+e);
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
		var d = new Date();
		d=d.toLocaleString().split(" ");
		var html =	"<table border='0' cellspacing='2' cellpadding='2'>"+
					  "<tr>"+
						"<td style='width:100%;font-size:14;font-weight:bold;'>USER ACCEPTANCE TEST (UAT)</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td style='width:100%;font-size:14;font-weight:bold;'>Project :</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td style='width:100%;font-size:12;font-weight:bold;'><br>Bandung, "+d[0]+" "+d[1]+" "+d[2]+"</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td>"+dthtml+"</td>"+
					  "</tr>"+
					"</table>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :		  
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add("UAT");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add("UAT");				
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