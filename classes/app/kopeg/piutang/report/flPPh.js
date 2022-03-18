window.app_kopeg_piutang_report_flPPh = function(owner)
{
	try{	
		if (owner)
		{
			window.app_kopeg_piutang_report_flPPh.prototype.parent.constructor.call(this,owner);
			this.className = "app_kopeg_piutang_report_flPPh";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar PPh", 2);
			uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
			uses("util_filterRep;util_gridLib");
			this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],
				colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
			this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}
		this.filterRep = new util_filterRep();
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","13","13","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,0,2,2,0,0]);
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;	
		this.getPeriode="select distinct periode as periode from kop_ar_m where kode_lokasi ='"+this.lokasi+"' union select distinct periode from kop_arbayar_m where kode_lokasi = '"+this.lokasis+"' order by periode desc ";
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No Invoice ","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Customer","All",""]);			
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Unit","All",""]);			
		this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_kopeg_piutang_report_flPPh.extend(window.portalui_childForm);
window.app_kopeg_piutang_report_flPPh.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row ===0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_lokasi, nama from lokasi order by kode_lokasi",
										"select count(*) from lokasi order by kode_lokasi",
										["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Piutang",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_ar,keterangan from kop_ar_m a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
										  "select count(*) from kop_ar_m a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
										  ["no_ar","keterangan"],"and",["No. Bukti","Keterangan"]);
		}
		if (row === 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_cust, nama from cust "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
										  "select count(*) from cust "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
										  ["kode_cust","nama"],"and",["Kode Cust","Nama"]);
		}		
		if (row === 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Unit",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_pp, nama from pp "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
										  "select count(*) from pp "+
										  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
										  ["kode_pp","nama"],"and",["Kode PP","Nama"]);
		}		
	},
	doSelectCell: function(sender, col, row)
	{
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new Array("3","3","13","13","13"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(2,0,2,2,2,2));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new Array("3","3","13","13","13"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(3,0,2,2,2));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_ar_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' union select distinct periode from kop_arbayar_m where kode_lokasi = '"+this.sg1.cells(2,0)+"' order by periode desc ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No Invoice ","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Customer","All",""]);			
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Unit","All",""]);			
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("c.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_ar",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+						
						this.filterRep.filterStr("b.kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")
						this.filterRep.filterStr("c.kode_pp",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
					
				var sql = "select a.no_bukti, date_format(c.tanggal,'%d-%m-%Y') as tgl, c.kode_pp, ifnull(e.no_setor,'-') as no_setor, ifnull(f.no_kas,'-') as no_kas, b.kode_cust, d.nama as nmcust,b.no_ar, b.keterangan,  "+
						"	b.nilai, a.nilai_pph  from kop_arbayar_d a "+
						"	inner join kop_ar_m b on b.no_ar = a.no_ar and b.kode_lokasi = a.kode_lokasi "+
						"	inner join kop_arbayar_m c on c.no_bukti = a.no_bukti and a.kode_lokasi = c.kode_lokasi "+
						"	inner join cust d on d.kode_Cust = b.kode_cust and d.kode_lokasi = a.kode_lokasi "+
						"	left outer join kop_arsetor_d e on e.no_bukti = a.no_bukti and e.kode_lokasi = a.kode_lokasi "+
						"	left outer join kas_d f on f.no_bukti = e.no_setor and f.kode_lokasi = a.kode_lokasi "+
						this.filter+
						" and a.nilai_pph <> 0 "+
						" order by c.tanggal, d.nama ";
				this.scriptSqlCount = "select count(*) "+
						"from kop_arbayar_d a "+
						"	inner join kop_ar_m b on b.no_ar = a.no_ar and b.kode_lokasi = a.kode_lokasi "+
						"	inner join kop_arbayar_m c on c.no_bukti = a.no_bukti and a.kode_lokasi = c.kode_lokasi "+
						"	inner join cust d on d.kode_Cust = b.kode_cust and d.kode_lokasi = a.kode_lokasi "+
						this.filter + " and a.nilai_pph <> 0 ";				
				this.title = new server_util_arrayList({items:["Bukti Bayar","Tanggal","Unit","No Setoran","No KasBank","Kode Cust","Customer","No Invoice","Keterangan","Nilai Invoice","Nilai PPh"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N"]});				
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","Y"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				
				this.sqlScript = sql; 
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_piutang_report_flPPh]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var header = "DAFTAR PPH";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_order");				
	      this.viewer.useIframe(upDownHtml(html));
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


