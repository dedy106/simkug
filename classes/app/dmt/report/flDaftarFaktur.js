window.app_dmt_report_flDaftarFaktur = function(owner)
{
	if (owner)
	{
		window.app_dmt_report_flDaftarFaktur.prototype.parent.constructor.call(this,owner);
		this.className = "app_dmt_report_flDaftarFaktur";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.periode=this.dbLib.getPeriodeFromSQL("select distinct periode from dmt_ar_m where kode_lokasi ='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No Faktur","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Detail"]);
	this.pager = 1;
};
window.app_dmt_report_flDaftarFaktur.extend(window.portalui_childForm);
window.app_dmt_report_flDaftarFaktur.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_cust, nama  from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
		}
		if (row == 3)
		{
			this.standar.ListDataSGFilter2(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_ar, keterangan  from dmt_ar_m "+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
											this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+	
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from dmt_ar_m "+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
										  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+	
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  ["no_ar","keterangan"],"and",["No Invoice","Keterangan"]);
		}
		if (row == 4)
		{
			this.standar.ListDataSGFilter2(this, "Data Invoice",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_ar, keterangan  from dmt_ar_m "+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
										  this.filterRep.filterStr("no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
											this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+	
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from dmt_ar_m "+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
										  this.filterRep.filterStr("no_kontrak",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
											this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+	
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  ["no_ar","keterangan"],"and",["No Invoice","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4,5],["3","123","13","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4,5],[2,0,2,2,2,0]);
		
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from dmt_ar_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Versi 1","Versi 2"]);
		}
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Cust","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No Faktur","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Detail"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_ar",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.getCell(2,4)=="Detail")
				{
					var sql = "select a.kode_cust,b.nama as nama_cust,b.npwp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_ar,a.keterangan,a.nilai,a.ppn "+
						  "from dmt_ar_m a "+
						  "inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+this.filter ;
					this.scriptSqlCount = "select count(*) "+
								"from dmt_ar_m a "+
							    "inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+this.filter ;
					this.title = new server_util_arrayList({items:["Kode Cust","Nama Customer","NPWP","Tanggal","No Invoice","Keterangan","Nilai DPP","Nilai PPN"]});			
					this.widthTable = new server_util_arrayList({items:[50,200,100,60,100,200,80,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N"]});		
				}else
				{
					var sql = "select a.kode_cust,b.nama as nama_cust,b.npwp,sum(a.nilai) as nilai_dpp,sum(a.ppn) as ppn "+
						  "from dmt_ar_m a "+
						  "inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+this.filter+
						  " group by a.kode_cust ";
					this.scriptSqlCount = "select count(*) "+
								 "from dmt_ar_m a "+
						  "inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["Kode Cust","Nama Customer","NPWP","Nilai DPP","Nilai PPN"]});			
					this.widthTable = new server_util_arrayList({items:[50, 200,100,100,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","N","N"]});		
				}
				
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);	
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e)
		{
			alert("[app_saku_dmt_report_flDaftarFaktur]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);			
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR FAKTUR PAJAK<br>Periode "+periodeToName(this.sg1.getCell(2,1))+"<br>";			
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
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_pulau");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_pulau");				
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