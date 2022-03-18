window.app_saku_dmt_report_flSiteInfo = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_report_flSiteInfo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_dmt_report_flSiteInfo";
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Site Info", 2);		
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:[["Filter","Type","Form","To"]],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.width, this.height],visible:false});		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","13","13","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,2,2,0,2]);		
	this.gridLib = new util_gridLib();		
	this.standar = new util_standar();	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Pulau","All",""]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Provinsi","All",""]);	
	this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Regional","All",""]);	
	this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Periode","All",""]);	
	this.gridLib.SGEditData(this.sg1,4,[0,1,2], ["Site","All",""]);		
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_dmt_report_flSiteInfo.extend(window.portalui_childForm);
window.app_saku_dmt_report_flSiteInfo.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Pulau",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_pulau, nama  from dmt_pulau where kode_lokasi ='"+this.app._lokasi+"' ",
														  "select count(*) from dmt_pulau where kode_lokasi ='"+this.app._lokasi+"' ",
														  ["kode_pulau","nama"],"and",["Kode","Nama Pulau"]);
			}
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_prov, nama  from dmt_prov where kode_lokasi ='"+this.app._lokasi+"' ",
														  "select count(*) from dmt_prov where kode_lokasi ='"+this.app._lokasi+"' ",
														  ["kode_prov","nama"],"and",["Kode","Nama Provinsi"]);
			}			
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Regional",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_reg, nama  from dmt_reg where kode_lokasi ='"+this.app._lokasi+"' ",
														  "select count(*) from dmt_reg where kode_lokasi ='"+this.app._lokasi+"' ",
														  ["kode_reg","nama"],"and",["Kode","Nama Regional"]);
			}
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Site",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.no_fa, b.nama, a.shelter, a.tipe_site  from dmt_tower a "+
														  "	inner join fa_asset b on b.no_fa = a.no_fa and b.kode_lokasi = a.kode_lokasi "+
															" where a.kode_lokasi ='"+this.app._lokasi+"' "+
															this.filterRep.filterStr("a.kode_pulau",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
															this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
															this.filterRep.filterStr("a.kode_reg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
															this.filterRep.filterStr("a.periode",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
														  "select count(a.no_fa, b.nama, a.shelter, a.tipe_site)  from dmt_tower a "+
														  "	inner join fa_asset b on b.no_fa = a.no_fa and b.kode_lokasi = a.kode_lokasi "+
															" where a.kode_lokasi ='"+this.app._lokasi+"' "+
															this.filterRep.filterStr("a.kode_pulau",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
															this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
															this.filterRep.filterStr("a.kode_reg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
															this.filterRep.filterStr("a.periode",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
														  ["a.no_fa","b.nama"],"and",["Site ID","Nama","Shelter","Site Type"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","13","13","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,0,2]);			
		if (row == 3){
			var prd = this.dbLib.getDataProvider("select distinct periode from fa_asset where kode_lokasi ='"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.sg1.setPickList([2],[new portalui_arrayMap({items:items})]);
				this.sg1.setPickList([3],[new portalui_arrayMap({items:items})]);
			}
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Pulau","All",""]);	
				this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Provinsi","All",""]);	
				this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Regional","All",""]);	
				this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Periode","All",""]);	
				this.gridLib.SGEditData(this.sg1,4,[0,1,2], ["Site","All",""]);		
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_pulau",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_reg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.periode",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_fa",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_fa, b.nama, a.longitude, a.latitude, a.alamat, a.kota, a.tipe, a.tinggi, a.tipe_site, a.shelter,"+
					" a.gbr_layout, a.gbr_peta, a.batas_imb, a.akhir_sewa, a.kode_pulau, a.kode_prov, a.kode_reg, c.nama as nmpulau, d.nama as nmprov, e.nama as nmreg "+
					"	from dmt_tower a inner join fa_asset b on b.no_fa = a.no_fa and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join dmt_pulau c on c.kode_pulau = a.kode_pulau and c.kode_lokasi = a.kode_lokasi "+
					"	left outer join dmt_prov d on d.kode_prov = a.kode_prov and d.kode_lokasi = a.kode_lokasi "+	
					"	left outer join dmt_reg e on e.kode_reg = a.kode_reg and e.kode_lokasi = a.kode_lokasi "+			
					"where a.kode_lokasi = '"+this.app._lokasi+"' "+
					"	"+this.filter ;
				this.scriptSqlCount = "select count(*) "+								
					"	from dmt_tower a inner join fa_asset b on b.no_fa = a.no_fa and b.kode_lokasi = a.kode_lokasi "+
					"	left outer join dmt_pulau c on c.kode_pulau = a.kode_pulau and c.kode_lokasi = a.kode_lokasi "+
					"	left outer join dmt_prov d on d.kode_prov = a.kode_prov and d.kode_lokasi = a.kode_lokasi "+	
					"	left outer join dmt_reg e on e.kode_reg = a.kode_reg and e.kode_lokasi = a.kode_lokasi "+			
								"where a.kode_lokasi = '"+this.app._lokasi+"' "+this.filter;
				this.title = new server_util_arrayList({items:["Site ID","Nama","Longitude","Latitude","Alamat","Kota","Tipe","Site Type","Tinggi","Shelter","Gbr Layout","Gbr Peta",
						"Batas IMB","Akhir Sewa","Kode Pulau","Nama","Kode Provinsi","Nama","Kode Regional","Nama Regional"]});			
				this.widthTable = new server_util_arrayList({items:[100, 280,80,80,200,120,100,100,100,100,120,120,100,100,80,120,80,120,80,120]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","D","D","S","S","S","S","S"]});			
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);	
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_dmt_report_flSiteInfo]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR SITE<br>";			
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
			html.add(new Date().valueOf()+"_dokumen");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_dokumen");				
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
	