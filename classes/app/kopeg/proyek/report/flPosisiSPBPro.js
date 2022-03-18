window.app_kopeg_proyek_report_flPosisiSPBPro = function(owner)
{
	if (owner)
	{
		window.app_kopeg_proyek_report_flPosisiSPBPro.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_proyek_report_flPosisiSPBPro";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi Surat Perintah Bayar Proyek", 2);							
		
		uses("saiGrid;reportViewer;server_report_simpleReport;util_filterRep;util_gridLib;util_standar");
		this.p1 = new portalui_panel(this,{bound:[10,10,720,250], caption:"Filter", border:3});				
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,11,700,200],colCount:4, colTitle:"Filter, Type, From, To",
			colWidth:[[3,2,1,0],[150,150,80,250]],colReadOnly:[true, [0],[]], buttonStyle:[[1],[bsAuto]],
			picklist:[[1],[new portalui_arrayMap({items:["All","=","Range","Like","<="]})]], defaultRow:5
		});			
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height], visible:false});		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);				
		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("3","123","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2),new  Array(0,2,2));
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from spb_m where kode_lokasi ='"+this.lokasi+"' and jenis = 'APPROYEK' order by periode desc ";
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("PP/Unit","=",this.app._kodePP));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Bukti","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Akun Hutang","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_proyek_report_flPosisiSPBPro.extend(window.portalui_childForm);
window.app_kopeg_proyek_report_flPosisiSPBPro.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
												  "select count(*) from lokasi "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
												  new Array("kode_lokasi","nama"),"where");
		}
		if (row == 2)
		{
			var sql1="select kode_pp,nama from pp "+
					 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					 " and tipe = 'posting' ";
			var sql2="select count(kode_pp) from pp "+
					 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
					 " and tipe = 'posting' ";
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("kode_pp","nama"),"and");
		}
		if (row == 3)
		{
			var sql1="select no_spb,keterangan from spb_m "+
					 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
					 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					 " and modul='SPB' and jenis='APPROYEK' ";
			var sql2="select count(no_spb) from spb_m "+
					 this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
					 this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					 this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					 " and modul='SPB' and jenis='APPROYEK' ";
			this.filterRep.ListDataSGFilter(this, "Data SPB",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("no_spb","keterangan"),"and");
		}
		if (row == 4)
		{
			var sql1="select distinct a.kode_akun, a.nama from masakun a "+
					"	inner join spb_m b on b.akun_hutang = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
			var sql2="select count(distinct a.kode_akun) from masakun a  "+
					"	inner join spb_m b on b.akun_hutang = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					 this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
			this.filterRep.ListDataSGFilter(this, "Data Akun Hutang",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,["kode_akun","nama"],"and",["Kode Akun","Nama Akun"]);
		}
	},
	doSelectCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(true);
			sender.columns.get(3).setReadOnly(true);		
			if (this.userStatus=="A")
			{
				this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","36","13","13","13"]);
				this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,2,2]);
			}
			else
			{
				this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
				this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[,1,2,3,4],[3,0,2,2,2]);
				if (row == 0) {
					sender.columns.get(2).setReadOnly(true);
					sender.columns.get(3).setReadOnly(true);
				}
				
			}
			if (row === 1){
				this.sg1.columns.get(2).pickList.clear();
				this.dbLib.setItemsFromSQL("select distinct periode from spb_m where jenis = 'APPROYEK' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc ",[this.sg1.columns.get(2).pickList]);
			}
		}catch(e){
			alert(e);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi/Cabang",tanda,lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,3], ["PP/Unit","=",this.app._kodePP]);
				this.gridLib.SGEditData(this.sg1,3,[0,1], ["No Bukti","All"]);
				this.gridLib.SGEditData(this.sg1,4,[0,1], ["Akun Hutang","All"]);
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
				this.filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
							this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_spb",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.akun_hutang",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.sql =  "select a.kode_pp,f.nama as nama_pp,a.akun_hutang, g.nama, a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,b.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas,a.posted,a.no_del,a.no_link "+
							"from spb_m a "+
							"	inner join masakun g on g.kode_akun = a.akun_hutang and g.kode_lokasi = a.kode_lokasi "+
							"left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
							"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
							"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
							"left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+this.filter+" and a.modul='SPB' and a.jenis='APPROYEK' order by a.kode_pp,a.no_spb";
				this.scriptSqlCount =   "select count(a.no_spb) "+
										"from spb_m a "+
										"	inner join masakun g on g.kode_akun = a.akun_hutang and g.kode_lokasi = a.kode_lokasi "+
										"left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
										"left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi "+
										"left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
										"left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+this.filter+"  and a.modul='SPB' and a.jenis='APPROYEK' ";
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				
				title.add("Kode PP");width.add();fieldType.add("S");		
				title.add("Nama PP");width.add();fieldType.add("S");		
				title.add("Akun Hutang");width.add();fieldType.add("S");		
				title.add("Nama Akun");width.add();fieldType.add("S");		
				title.add("No SPB");width.add();fieldType.add("S");		
				title.add("Tgl SPB");width.add();fieldType.add("D");	
				title.add("Keterangan");width.add();fieldType.add("S");		
				title.add("Nilai");width.add();fieldType.add("N");	
				title.add("No Ver");width.add();fieldType.add("S");	
				title.add("Tgl Ver");width.add();fieldType.add("D");	
				title.add("No Kas");width.add();fieldType.add("S");	
				title.add("Tgl Kas");width.add();fieldType.add("D");
				title.add("Posted");width.add();fieldType.add("S");
				title.add("No Delete");width.add();fieldType.add("S");
				title.add("No Link");width.add();fieldType.add("S");
				this.pager = this.app._baris;			
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager,title,width,fieldType,false);
				
				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = this.sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
		}
		catch(e)
		{
			alert("[app_kopeg_proyek_report_flPosisiSPBPro]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI SPB PROYEK<br>";			
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
			html.add("PosisiSpp");				
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
