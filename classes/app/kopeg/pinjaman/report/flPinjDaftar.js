window.app_kopeg_pinjaman_report_flPinjDaftar = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjaman_report_flPinjDaftar.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_pinjaman_report_flPinjDaftar";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar Pencairan Pinjaman", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from kop_pinj_m where kode_lokasi ='"+this.lokasi+"' union select periode from periode where kode_lokasi='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kredit","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Sumber Dana","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_pinjaman_report_flPinjDaftar.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_report_flPinjDaftar.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_loker, nama from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_loker","nama"],"and",["Kode","Nama Loker"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Nasabah",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_agg, nama from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
											  "select count(*) from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
											  ["kode_agg","nama"],"and",["Kode","Nama Nasabah"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data No. Pinjaman",this.sg1, this.sg1.row, this.sg1.col,
											  "select distinct a.no_pinj,a.keterangan from kop_pinj_m a inner join kop_agg b on b.kode_agg = a.kode_agg and b.kode_lokasi = a.kode_lokasi "+
											  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
												this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
												this.filterRep.filterStr("a.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),										 
											  "select count(*) from kop_pinj_m a inner join kop_agg b on b.kode_agg = a.kode_agg and b.kode_lokasi = a.kode_lokasi "+
											  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
												this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
												this.filterRep.filterStr("a.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and"),
											  ["no_pinj","keterangan"],"and",["No. Pinjaman","Keterangan"]);
			}
			if (row === 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Sumber Dana",this.sg1, this.sg1.row, this.sg1.col,
											  "select no_bukti, no_kontrak from kop_dana_m where kode_lokasi ='"+this.app._lokasi+"' and jenis in ('ALL','PUANG')",
    										  "select count(no_bukti)      from kop_dana_m where kode_lokasi ='"+this.app._lokasi+"' and jenis in ('ALL','PUANG')",
    										  ["no_bukti","no_kontrak"],"and",["No Bukti","No Kontrak"],false);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","13","13","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","13","13","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,0,2,2,2,2]);
			this.sg1.columns.get(col).setReadOnly(true);
		}		
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pinj_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' union select periode from periode where kode_lokasi='"+this.lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kredit","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Sumber Dana","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.no_pinj",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+						
						this.filterRep.filterStr("a.no_dana",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.kode_agg, b.nama, a.no_pinj, date_format(a.tanggal,'%d/%m/%Y') as tgl, a.keterangan, a.periode, date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih, "+
						"		case when a.status_bayar = 'A' then 'AUTODEBET' else 'CASH' end as status_bayar, "+
						"		case when jenis_angs = 'A' then 'ANUITAS' else 'FLAT' end as jenis_angsur, "+
						"		a.nilai, a.p_bunga, a.lama_bayar,a.nilai_mat, a.nilai_prov, a.nilai_asur,  "+
						"		a.nilai_tagihan, a.status_aktif, a.no_dana, a.no_mou, "+
						"		date_format(d.tanggal,'%d/%m/%Y') as tgl_cair, d.no_spb "+
						"	from kop_pinj_m a  "+
						"		inner join kop_agg b on b.kode_agg = a.kode_agg and b.kode_lokasi= a.kode_lokasi "+
						"		left outer join kop_pinj_spb c on c.no_pinj = a.no_pinj and c.kode_lokasi = a.kode_lokasi  "+
						"		left outer join spb_m d on d.no_spb = c.no_spb and d.kode_lokasi = c.kode_lokasi "+
						this.filter;   
				this.scriptSqlCount = "select count(a.no_pinj) as tot "+
						"	from kop_pinj_m a  "+
						"		inner join kop_agg b on b.kode_agg = a.kode_agg and b.kode_lokasi= a.kode_lokasi "+
						"		left outer join kop_pinj_spb c on c.no_pinj = a.no_pinj and c.kode_lokasi = a.kode_lokasi  "+
						"		left outer join spb_m d on d.no_spb = c.no_spb and d.kode_lokasi = c.kode_lokasi "+
						this.filter ;   
						
				this.title = new server_util_arrayList({items:["Kode Anggota","Nama Anggota","No Pinjaman","Tanggal","Keterangan","Periode",
					"Tgl Awal Tagih", "Status Bayar","Jenis Angsur","Nilai Pinjaman","Bunga(%)","Lama Bayar","Nilai Materai","Nilai Provisi",
					"Nilai Asuransi","Nilai Tagihan","Status Aktif","No Dana","No MOU", "Tgl Cair","No SPB"]});
				this.widthTable = new server_util_arrayList({items:[80,250,100,60,250,60,80,80,80,100,60,80,80,80,80,80,80,100,100,80,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","N","N","N","N","N","N","N","S","S","S","S","S"]});				
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","Y","N","N","Y","Y","Y","N","N","N","N","N","N"]});				
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_report_flPinjDaftar]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR PENCAIRAN PINJAMAN<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
