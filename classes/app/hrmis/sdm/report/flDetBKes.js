window.app_hrmis_sdm_report_flDetBKes = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_report_flDetBKes.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_sdm_report_flDetBKes";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Detail Biaya Kesehatan", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width-4,this.p1.height-22],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2],[2,2,1]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kes_trans_m ";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kelompok Provider","=","Rumah Sakit"]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Provider","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Detail"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_hrmis_sdm_report_flDetBKes.extend(window.portalui_childForm);
window.app_hrmis_sdm_report_flDetBKes.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provider",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_provider,nama from kes_provider where kode_lokasi ='10' and kode_klp=(select kode_klp from kes_klp_provider where nama='"+this.sg1.getCell(2,2)+"') ",
											  "select count(*) from kes_provider where kode_lokasi ='10' and kode_klp=(select kode_klp from kes_klp_provider where nama='"+this.sg1.getCell(2,2)+"') ",
											  ["kode_provider","nama"],"and",["Kode","Nama Provider"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4],["13","3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4],[2,0,0,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4],["3","3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4],[2,0,0,2,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kes_trans_m ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 2){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct nama from kes_klp_provider ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Detail","Summary"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kelompok Provider","=","Rumah Sakit"]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Provider","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Detail"]);
			}else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("e.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("f.nama",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_provider",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.getCell(2,4) === 'Detail')
					var sql = "select c.nama as nmprov,d.nama as nmpoli,e.nik,e.nama as nmpeg, "+
							"b.kode_lokasi as lokasi,ifnull(b.nama,'-') as pasien, "+
							"b.status,date_format(b.tgl_masuk,'%d/%m/%Y') as tgl,b.nilai "+
							"from kes_trans_m a inner join kes_trans_d b on a.no_trans=b.no_trans "+
							"inner join kes_provider c on b.kode_provider=c.kode_provider "+
							"inner join kes_poli d on b.kode_poli=d.kode_poli "+
							"inner join karyawan e on b.nik=e.nik and b.kode_lokasi=e.kode_lokasi "+
							"inner join kes_klp_provider f on c.kode_klp=f.kode_klp "+this.filter+
							" order by c.kode_provider,b.nu";
				else
					var sql = "select c.nama as nmprov,d.nama as nmpoli,e.nik,e.nama as nmpeg, "+
							"case b.kode_lokasi when 11 then 'ITT' when 12 then 'IMT' when 13 then 'YPT'  "+
							"when 14 then 'POLTEK' else 'PDC' end as lokasi,b.nilai "+
							"from kes_trans_m a inner join kes_trans_d b on a.no_trans=b.no_trans "+
							"inner join kes_provider c on b.kode_provider=c.kode_provider "+
							"inner join kes_poli d on b.kode_poli=d.kode_poli "+
							"inner join karyawan e on b.nik=e.nik and b.kode_lokasi=e.kode_lokasi "+
							"inner join kes_klp_provider f on c.kode_klp=f.kode_klp "+this.filter+
							" order by b.nik,c.kode_provider,b.nu";
				this.scriptSqlCount = "select count(*) "+
						"from kes_trans_m a inner join kes_trans_d b on a.no_trans=b.no_trans "+
						"inner join kes_provider c on b.kode_provider=c.kode_provider "+
						"inner join kes_poli d on b.kode_poli=d.kode_poli "+
						"inner join karyawan e on b.nik=e.nik and b.kode_lokasi=e.kode_lokasi "+
						"inner join kes_klp_provider f on c.kode_klp=f.kode_klp "+this.filter;
				
				if (this.sg1.getCell(2,4) === 'Detail'){
					this.title = new server_util_arrayList({items:["Provider","Poli","NIK","Nama Pegawai","Loker","Pasien","Status","Tgl Kunjungan","Biaya"]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","N"]});
				}else{
					this.title = new server_util_arrayList({items:["Provider","Poli","NIK","Nama Pegawai","Loker","Biaya"]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N"]});
				}
				this.widthTable = new server_util_arrayList({items:[]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hrmis_sdm_report_flDetBKes]::mainButtonClick:"+e);
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
		var header = "DAFTAR PEGAWAI & KELUARGA YANG BEROBAT<br />BULAN "+periodeToName(this.sg1.getCell(2,1)).toUpperCase();
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_kb");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_kb");				
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