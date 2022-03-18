window.app_egov_simduk_report_flWafat = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_report_flWafat.prototype.parent.constructor.call(this,owner);
		this.className = "app_egov_simduk_report_flWafat";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Akte Kematian", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
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
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["No. KK","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["No. Akte Kematian","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_egov_simduk_report_flWafat.extend(window.portalui_childForm);
window.app_egov_simduk_report_flWafat.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Nomor KK",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.no_kk, c.nama from egov_kk_m a "+
											  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
											  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1'",
											  "select count(a.no_kk)  from egov_kk_m a "+
											  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
											  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1'",
											  ["no_kk","nama"],"and",["No KK","Nama Kep. Keluarga"]);
			}
			if (row === 1)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Nomor Akta Kematian",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.no_wafat, b.nama  from egov_wafat a inner join egov_akte b on a.no_akte=b.no_akte inner join egov_kk_d c on b.no_akte=c.no_akte and c.no_kk like '%"+this.sg1.getCell(2,0)+"'",
											  "select count(a.no_wafat)   from egov_wafat a inner join egov_akte b on a.no_akte=b.no_akte inner join egov_kk_d c on b.no_akte=c.no_akte and c.no_kk like '%"+this.sg1.getCell(2,0)+"'",
											  ["no_wafat","nama"],"and",["No Akta","Nama"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[2,2]);		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["No. KK","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["No. Akte Kematian","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("c.no_kk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.no_wafat",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_wafat,b.nama,c.no_kk,b.no_akte,b.tempat,date_format(b.tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(a.tanggal,'%d/%m/%Y') as tgl, "+
						"a.sebab,a.tempat,a.saksi1,a.saksi2,b.gender,concat(b.gol_darah,' | ',b.rhesus) as goldar "+
						"from egov_wafat a inner join egov_akte b on a.no_akte=b.no_akte "+
						"inner join egov_kk_d c on b.no_akte=c.no_akte and a.no_wafat=c.no_wafat "+this.filter+
						" order by a.tanggal desc ";
				this.scriptSqlCount = "select count(*) "+
								"from egov_wafat a inner join egov_akte b on a.no_akte=b.no_akte "+
								"inner join egov_kk_d c on b.no_akte=c.no_akte and a.no_wafat=c.no_wafat "+this.filter;
				this.title = new server_util_arrayList({items:["No Akte Kematian","Nama","No KK","No Akte Kelahiran","Tmpt Lahir","Tgl Lahir","Tgl Wafat","Sebab","Tmpt Wafat","Saksi 1","Saksi 2","Jns Kelamin","Gol. Darah"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","S"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_egov_simduk_report_flWafat]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR AKTE KEMATIAN<br>";
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_Kematian");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_Kematian");				
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