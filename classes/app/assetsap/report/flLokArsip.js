window.app_assetsap_report_flLokArsip = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flLokArsip.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flLokArsip";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Arsip per Lokasi", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Propinsi","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tanggal","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kodya","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Lokasi","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Sertifikat","All",""]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_assetsap_report_flLokArsip.extend(window.childForm);
window.app_assetsap_report_flLokArsip.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Propinsi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_prop, nama from amu_propinsi where kode_lokasi = '"+this.app._lokasi+"' ",											
											  "select count(*) from amu_propinsi  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_prop","nama"],"and",["Kode Propinsi","Nama"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kodya",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_kodya, nama from amu_kodya where kode_lokasi = '"+this.app._lokasi+"' "+
							this.filterRep.filterStr("kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
											  "select count(*) from amu_kodya  where kode_lokasi = '"+this.app._lokasi+"' "+
							this.filterRep.filterStr("kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
											  ["kode_kodya","nama"],"and",["Kode Kodya","Nama"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Lokasi Aset",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokfa, alamat from amu_lokfa where kode_lokasi ='"+this.app._lokasi+"' "+
											  this.filterRep.filterStr("kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
											  this.filterRep.filterStr("kode_kodya",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
											  "select count(*) from amu_lokfa where kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
											  this.filterRep.filterStr("kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
											  this.filterRep.filterStr("kode_kodya",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
											  ["kode_lokfa","alamat"],"and",["Kode Lokasi Aset","Alamat"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Arsip",this.sg1, this.sg1.row, this.sg1.col,
											  "select distinct a.no_arsip, a.no_surat, a.nama, a.keterangan from amu_arsip a "+
											  "	inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
											  " where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
											  this.filterRep.filterStr("b.kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
											  this.filterRep.filterStr("b.kode_kodya",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
											  "select count(distinct a.no_arsip) from amu_lokfa a "+
											  "	inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
											  " where kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
											  this.filterRep.filterStr("b.kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
											  this.filterRep.filterStr("b.kode_kodya",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
											  ["no_arsip","no_surat","nama","keterangan"],"and",["No Arsip","No Sertifikat","Nama","Keterangan"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,1,2,2,2]);			
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Propinsi","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tanggal","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kodya","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Lokasi","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No Sertifikat","All",""]);	
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_prop",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("b.kode_kodya",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("d.tgl_awal",this.sg1.getCell(1,1),this.sg1.getCellDateValue(2,1),this.sg1.getCellDateValue(3,1),"and")+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("d.no_surat",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				//"select distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa,  d.kode_rak, date_format(a.tgl_awal,'%d-%m-%Y') as tgl_awal, date_format(a.tgl_akhir,'%d-%m-%Y') as tgl_akhir, a.keterangan, b.alamat,b.kel, b.kec, b.kode_kodya as kodya, b.kode_prop as prop, b.tanah, b.bangun, c.nama as nmfisik , a.no_reg "+
				var sql = "select distinct a.nama as nmprop, b.nama as nmkodya, c.kel, c.alamat, c.tanah, d.no_surat, date_format(d.tgl_awal,'%d-%m-%Y') as tgl_awal, d.kode_lokfa"+
						" from amu_propinsi a  "+
						"	inner join amu_kodya b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi "+
						"	inner join amu_lokfa c on c.kode_kodya = b.kode_kodya and c.kode_prop = b.kode_prop and c.kode_lokasi = b.kode_lokasi "+
						"	inner join amu_arsip d on d.kode_lokfa = c.kode_lokfa and d.kode_lokasi = a.kode_lokasi "+
						this.filter +" order by a.nama" ;
				this.scriptSqlCount = "select count(distinct a.nama, b.nama as nmkodya, c.kel, c.alamat, c.tanah, d.no_surat) "+
						" from amu_propinsi a  "+
						"	inner join amu_kodya b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi "+
						"	inner join amu_lokfa c on c.kode_kodya = b.kode_kodya and c.kode_prop = b.kode_prop and c.kode_lokasi = b.kode_lokasi "+
						"	inner join amu_arsip d on d.kode_lokfa = c.kode_lokfa and d.kode_lokasi = a.kode_lokasi "+
						this.filter;				
				this.title = new server_util_arrayList({items:["Propinsi","Kodya","Kelurahan","Alamat","Luas","Nomor","Tanggal","Lokasi"]});
				this.widthTable = new server_util_arrayList({items:[150,150,150,250,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S"]});												
				this.groupBy = undefined;
				this.summary = undefined;
				this.groupHeader = undefined;
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false, this.groupBy, undefined, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_assetsap_report_flLokArsip]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Lokasi per Nama Arsip<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
	}
});
