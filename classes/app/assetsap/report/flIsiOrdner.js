window.app_assetsap_report_flIsiOrdner= function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flIsiOrdner.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flIsiOrdner";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar Isi Ordner", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["No Ordner","All",""]);			
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_assetsap_report_flIsiOrdner.extend(window.childForm);
window.app_assetsap_report_flIsiOrdner.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Ordner",this.sg1, this.sg1.row, this.sg1.col,
											  "select distinct kode_rak, awal, akhir from amu_rak where kode_lokasi = '"+this.app._lokasi+"' ",											
											  "select count(distinct kode_rak) from amu_rak  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_rak","awal","akhir"],"and",["No Ordner","No Lokasi Awal","No Lokasi Akhir"]);
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2]);			
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){				
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["No Ordner","All",""]);												
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("d.kode_rak",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");							
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();				
				var sql = "select distinct a.kode_lokfa,a.alamat, a.kel, a.kec , b.nama as nmkodya, c.nama as nmprop, a.tanah, a.bangun   "+
						" from amu_lokfa a  "+																	
						"	inner join amu_kodya b on b.kode_lokasi = a.kode_lokasi and b.kode_kodya = a.kode_kodya and b.kode_prop = a.kode_prop "+
						"	inner join amu_propinsi c on c.kode_prop = a.kode_prop and c.kode_lokasi = a.kode_lokasi "+
						"   inner join amu_rak d on d.kode_lokasi = a.kode_lokasi and a.kode_lokfa between d.awal and d.akhir "+
						this.filter +" order by a.kode_lokfa" ;
				this.scriptSqlCount = "select count(distinct a.kode_lokfa) "+
						" from amu_lokfa a  "+																	
						"	inner join amu_kodya b on b.kode_lokasi = a.kode_lokasi and b.kode_kodya = a.kode_kodya and b.kode_prop = a.kode_prop "+
						"	inner join amu_propinsi c on c.kode_prop = a.kode_prop and c.kode_lokasi = a.kode_lokasi "+
						"   inner join amu_rak d on d.kode_lokasi = a.kode_lokasi and a.kode_lokfa between d.awal and d.akhir "+
						this.filter;				
				this.title = new server_util_arrayList({items:["Lokasi","Alamat","Kelurahan","Kecamatan","Kodya","Propinsi","Luas Tanah","Bangunan"]});
				this.widthTable = new server_util_arrayList({items:[80,250,120,120,150,150,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N"]});												
				this.groupBy = undefined;
				this.summary = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});	
				this.groupHeader = undefined;
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_assetsap_report_flKodya]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Daftar Isi Ordner<br>Posisi : "+new Date().lclFormat()+"<br />";
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
		  var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,undefined, undefined, undefined, undefined,"","",undefined);
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
	}
});
