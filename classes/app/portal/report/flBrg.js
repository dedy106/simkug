window.app_portal_report_flBrg = function(owner)
{
	if (owner)
	{
		window.app_portal_report_flBrg.prototype.parent.constructor.call(this,owner);
		this.className = "app_portal_report_flBrg";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Barang", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi Kerja","=",this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Kategori Barang","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Barang","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_portal_report_flBrg.extend(window.portalui_childForm);
window.app_portal_report_flBrg.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi,nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama Lokasi"]);
			}
			if (row === 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kategori Barang",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_kategori,nama from portal_kategori where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from portal_kategori where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  ["kode_kategori","nama"],"where",["Kode","Nama Kategori Barang"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Barang",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_produk,nama from portal_produk where kode_lokasi='"+this.sg1.getCell(2,0)+"' and kode_kategori like '%"+this.sg1.getCell(2,1)+"' ",
									  "select count(*) from portal_produk where kode_lokasi='"+this.sg1.getCell(2,0)+"' and kode_kategori like '%"+this.sg1.getCell(2,1)+"' ",
									  ["kode_produk","nama"],"where",["Kode","Nama Barang"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new Array("3","13"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new Array(2,2));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new Array("3","13"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new Array(3,2));
			this.sg1.columns.get(col).setReadOnly(true);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi Kerja","=",this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Kategori Barang","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Barang","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_kategori",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_produk",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.kode_produk,b.nama,a.nama,a.model,c.nama,d.nama,a.warna,a.harga,a.desk_pendek,a.stok,a.status_stok,e.nama,a.satuan "+
						"from portal_produk a inner join portal_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi "+
						"inner join portal_merk c on a.kode_merk=c.kode_merk "+
						"inner join portal_pabrik d on a.kode_pabrik=d.kode_pabrik "+
						"inner join portal_file e on a.no_dok_file=e.no_file and a.kode_lokasi=e.kode_lokasi "+this.filter+
						" order by b.kode_kategori,b.rowindex ";
				this.scriptSqlCount = "select count(*) "+
						"from portal_produk a inner join portal_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi "+
						"inner join portal_merk c on a.kode_merk=c.kode_merk "+
						"inner join portal_pabrik d on a.kode_pabrik=d.kode_pabrik "+
						"inner join portal_file e on a.no_dok_file=e.no_file and a.kode_lokasi=e.kode_lokasi "+this.filter;
				this.title = new server_util_arrayList({items:["Kode","Kategori","Nama","Model","Merk","Pabrik","Warna","Harga","Deskripsi","Stok","Status","Nama File","Satuan"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N","S","S","S","S","S"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_portal_report_flBrg]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DATA BARANG<br>";
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
			html.add(new Date().valueOf()+"_kategoriBrg");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_kategoriBrg");				
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