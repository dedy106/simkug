window.app_saku_inventory_report_flBarcode = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flBarcode.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flBarcode";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Barcode", 2);
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Kelompok Barang","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Barang","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flBarcode.extend(window.portalui_childForm);
window.app_saku_inventory_report_flBarcode.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0){
				this.filterRep.ListDataSGFilter(this, "Data Kelompok Barang",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_klpbrg, nama  from inv_brg_klp where kode_lokasi ='"+this.app._lokasi+"' ",
									  "select count(*) from inv_brg_klp where kode_lokasi ='"+this.app._lokasi+"' ",
									  ["kode_klpbrg","nama"],"and",["Kode","Nama Klp Barang"]);
			}
			if (row === 1){
				this.filterRep.ListDataSGFilter(this, "Data Barang",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_brg, nama  from inv_brg where kode_lokasi ='"+this.app._lokasi+"' and kode_klpbrg='"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from inv_brg where kode_lokasi ='"+this.app._lokasi+"' and kode_klpbrg='"+this.sg1.getCell(2,0)+"' ",
									  ["kode_brg","nama"],"and",["Kode","Nama Barang"]);
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
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Kelompok Barang","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Barang","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
		    	this.filter = this.filterRep.filterStr("a.kode_klpbrg",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_brg",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.kode_brg,a.nama,b.barcode, b.imgstr, b.imgw, b.imgh "+
					" from inv_brg a inner join inv_brg_d b on b.kode_brg = a.kode_brg and b.kode_lokasi = a.kode_lokasi "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' "+this.filter;
				this.scriptSqlCount = "select count(*) "+
								" from inv_brg a inner join inv_brg_d b on b.kode_brg = a.kode_brg and b.kode_lokasi = a.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"' "+this.filter;
				this.title = new server_util_arrayList({items:["Kode","Nama Barang","barcode","imgstr"]});
				this.widthTable = new server_util_arrayList({items:[80,250,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","N"]});
				this.dbLib.getDataProviderPageA(sql,1,this.pager);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flBarcode]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	    if (sender == this.dbLib){
	       switch(methodName){
	           case "getDataProviderPage":
	               eval("result = "+result);
	               var dthtml = this.convertToHtml(result);
 				this.previewReport(dthtml);
	           break;
           }
        }
        if (sender == this.report){
    		switch (methodName)
    		{
    			case "preview" : 
    				this.viewer.preview(result);			
    			break;
    		}
   		}
	},
	doSelectedPage: function(sender, page){
		this.dbLib.getDataProviderPageA(this.sqlScript,page,this.pager);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR BARCODE BARANG<br>";
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
            this.dbLib.getDataProviderPageA(this.sqlScript,1,this.pager * this.viewer.getTotalPage());					  
            break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_klpBrg");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_klpBrg");				
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
			var result = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertToHtml(result);
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
	},
	convertToHtml : function(data){
	   try{
    	   var html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>";
    	   html += "<tr bgcolor='#cccccc'><td class='header_laporan' width=25>No</td><td class='header_laporan'>Kode Barang</td><td class='header_laporan'>Nama Barang</td><td class='header_laporan'>Kode Barcode</td><td class='header_laporan'>Barcode</td></tr>";
    	   var line;
    	   for (var i in data.rs.rows){
    	       line = data.rs.rows[i];
    	       if (systemAPI.browser.msie)
    	           var img = "<img src='decode.php?"+line.imgstr+"'  />";
    	       else
    	           var img = "<img src='"+line.imgstr+"' />";
    	       html += "<tr><td  class='isi_laporan' bgcolor='#eeeeee'>"+(parseInt(i)+1)+"</td><td class='isi_laporan' width=100>"+line.kode_brg+"</td><td width=200 class='isi_laporan'>"+line.nama+"</td><td width=100 class='isi_laporan'>"+line.barcode+"</td><td class='isi_laporan'>"+img+"</td></tr>";
           }
           html += "</table>";
           return html;
        }catch(e){
            return "error--"+data;
        }
    }
});
