window.app_saku_piutang_report_flDetailAR = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flDetailAR.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flDetailAR";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Detail Piutang", 2);

		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(150);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);	
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			this.sg1.setRowCount(6);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);		
		//uses("server_report_report");
		//this.report = new server_report_report();
		//this.report.addListener(this);
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["13","123","13","123","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	
	uses("util_dbLarge");
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLarge();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);	
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);	
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Report Format","=","S1"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
};
window.app_saku_piutang_report_flDetailAR.extend(window.portalui_childForm);
window.app_saku_piutang_report_flDetailAR.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_jur,nama_jur from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama"]);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_ang,nama_ang from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									"select count(*) from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									["kode_ang","nama_ang"],"and",["Kode angkatan","Angkatan"]);
	}
	if (row == 3)
	{
		this.standar.ListDataSGFilter2(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,
									"select npm,nama_mhs from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									"select count(*) from mhs "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										this.filterRep.filterStr("kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and"),
									["npm","nama_mhs"],"and",["NPM/NIM","Nama Mhs"]);
	}
};
window.app_saku_piutang_report_flDetailAR.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["13","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,2,2,0,0]);
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","23","13","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,2,2,2,0,0]);
	}
	if (row == 4)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}
	if (row == 5)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"S1");
		this.sg1.columns.get(2).pickList.set(1,"S2");
	}
};
window.app_saku_piutang_report_flDetailAR.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","Range",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);	
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Mahasiswa","All",""]);	
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Report Format","=","S1"]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");			
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			var result  = new portalui_arrayMap();
			if (this.sg1.cells(2,5) == "S1"){			
				var sql = "select concat(a.kode_ang, '-',a.nama_ang) as angkatan,concat(d.npm,'-',d.nama_mhs) as mhs "+
						"	, "+isnull+"(g.bpp,0)- "+isnull+"(h.bpp,0) as sawal, "+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) as bpp, "+isnull+"(e.sdp2,0) - "+isnull+"(f.sdp2,0) as SDP2 "+
						" 	, "+isnull+"(e.up3,0) - "+isnull+"(f.up3,0) as UP3, "+isnull+"(e.sks,0)-"+isnull+"(f.sks,0) as SKS, "+isnull+"(e.cuti,0) - "+isnull+"(f.cuti,0) as cuti, "+isnull+"(e.wisuda,0) - "+isnull+"(f.wisuda,0)as wisuda "+
						"	, "+isnull+"(e.denda,0)-"+isnull+"(f.denda,0) as denda "+
						"	, "+isnull+"(e.bpp + e.sdp2 + e.up3 + e.sks + e.cuti + e.wisuda + e.denda,0) - "+isnull+"(f.bpp + f.sdp2 + f.up3 + f.sks + f.cuti + f.wisuda + f.denda,0)  as Jumlah  "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
						"	left outer join ("+this.getInvoiceMhs()+") e on e.kode_jur = a.kode_jur and e.kode_ang = a.kode_ang and e.ref1 = d.npm and e.kode_lokasi = a.kode_lokasi "+
						"	left outer join ("+this.getByrMhs()+") f on f.kode_jur = a.kode_jur and f.kode_ang = a.kode_ang and f.ref1 = d.npm and f.kode_lokasi = a.kode_lokasi "+
						"	left outer join ("+this.getBPPBefore()+") g on g.kode_jur = a.kode_jur and g.kode_ang = a.kode_ang and g.ref1 = d.npm and g.kode_lokasi = a.kode_lokasi  "+
						"	left outer join ("+this.getBPPByrBefore()+") h on h.kode_jur = a.kode_jur and h.kode_ang = a.kode_ang and h.ref1 = d.npm and h.kode_lokasi = a.kode_lokasi "+
						this.filter + 
						"order by a.kode_ang";				
				this.scriptSqlCount = "select count(*) "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
						this.filter;
				var title = new server_util_arrayList();			
				title.add("Angkatan");title.add("Mahasiswa");title.add("Saldo Awal");title.add("BPP");
				title.add("SDP2");title.add("UP3");title.add("SKS");title.add("Cuti");title.add("wisuda");title.add("Denda");title.add("Jumlah");
				var width = new server_util_arrayList();			
				width.add(90);width.add(250);width.add(100);width.add(100);
				width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);
				var fieldType = new server_util_arrayList();			
				fieldType.add("S");fieldType.add("S");fieldType.add("N");fieldType.add("N");
				fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");
				fieldType.add("N");
				var groupBy = new server_util_arrayList();			
				groupBy.add("angkatan");				
			}else {								
				var sql = "select concat(b.kode_jur,'-',b.nama_jur) as jurusan , concat(a.kode_ang, '-',a.nama_ang) as angkatan, concat(d.npm,'-',d.nama_mhs) as mhs,c.kode_produk, c.nama_produk "+
						"	, "+isnull+"(e.bpp,0) - "+isnull+"(f.bpp,0) as nilai  "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join produk c on c.kode_jur = b.kode_jur and c.kode_lokasi = b.kode_lokasi "+
						"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
						"	left outer join ("+this.getProdukMhs()+") e on e.kode_jur = a.kode_jur and e.kode_ang = a.kode_ang and e.ref1 = d.npm and e.kode_lokasi = a.kode_lokasi and e.kode_produk = c.kode_produk "+
						"	left outer join ("+this.getByrProdukMhs()+") f on f.kode_jur = a.kode_jur and f.kode_ang = a.kode_ang and f.ref1 = d.npm and f.kode_lokasi = a.kode_lokasi and f.kode_produk = c.kode_produk "+
						this.filter + 
						" 	order by b.kode_jur, a.kode_ang, d.npm, c.kode_produk ";
				this.scriptSqlCount = "select count(*) as tot "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join produk c on c.kode_jur = b.kode_jur and c.kode_lokasi = b.kode_lokasi "+
						"	inner join mhs d on d.kode_ang = a.kode_ang and d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi "+
						this.filter;	
				var title = new server_util_arrayList();			
				title.add("Jurusan");title.add("Angkatan");title.add("Mahasiswa");title.add("Kode Produk");title.add("Nama Produk");title.add("Nilai");
				var width = new server_util_arrayList();			
				width.add(150);width.add(80);width.add(250);width.add(50);width.add(150);width.add(100);
				var fieldType = new server_util_arrayList();			
				fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("N");				
				var groupBy = new server_util_arrayList();			
				groupBy.add("jurusan");groupBy.add("angkatan");groupBy.add("mhs");			
			}
			this.page = 1;
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = groupBy;
			this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);				
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			//this.previewReport(dthtml);			
		}
    }
	catch(e)
	{
		alert("[app_saku_piutang_report_flDetailAR]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flDetailAR.prototype.doRequestReady = function(sender, methodName, result)
{
    try{
    	if (sender == this.report){
    			switch (methodName)
    			{
    				case "preview" : 
    					this.viewer.preview(result);			
    					break;
    				
    			}
    	}
    	if (sender == this.dbLib){
    		switch (methodName){	
    			case "sqlToHtml":    			     
        			this.previewReport(result);
    			break;
    			case "getDataProviderPage":
    			 eval("result = "+result+";");   			 
    			 this.previewReport(this.convertToHtml(result));
    			break;
    		}
    	}
	}catch(e){
	   alert(e);
    }
};
window.app_saku_piutang_report_flDetailAR.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);				
	//this.previewReport(dthtml);			
};
window.app_saku_piutang_report_flDetailAR.prototype.previewReport = function(dthtml)
{
    showProgress();
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN DETAIL PIUTANG</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml= html;	
	hideProgress();
};
window.app_saku_piutang_report_flDetailAR.prototype.doCloseReportClick = function(sender)
{
    try{
      switch(sender.getName())
      {
        case "allBtn" :	
    	  this.previewReport(this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),this.title, this.widthTable, this.fieldType,true,this.groupBy));				
          break;
        case "pdfBtn" :      
    	  var html = new server_util_arrayList();
    		html.add(this.allHtml);			
    		html.add("pdf");			
    		html.add("RekapAR");				
          this.viewer.useIframe(upDownHtml(html));
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
};
window.app_saku_piutang_report_flDetailAR.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }else if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		 }
	} else if (col == 2){
		if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		}
	}	
};
window.app_saku_piutang_report_flDetailAR.prototype.getProdukMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, b.kode_produk, "+
						"	  sum(b.jumlah * b.nilai) as bpp"+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, b.kode_produk ";
};
window.app_saku_piutang_report_flDetailAR.prototype.getByrProdukMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, b.kode_produk , "+
						"	  sum(b.disc + case when substring(b.akun_piutang,1,1) = '1' then 1 else 1 end * b.nilai) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, b.kode_produk ";
};
window.app_saku_piutang_report_flDetailAR.prototype.getInvoiceMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.jumlah * b.nilai else 0 end) as bpp, "+
						"	  sum(case when c.nama_produk like '%SDP2%' then b.jumlah * b.nilai else 0 end) as sdp2,"+
						"	  sum(case when c.nama_produk like '%UP3%' then b.jumlah * b.nilai else 0 end) as up3,"+
						"	  sum(case when c.nama_produk like '%SKS%' then b.jumlah * b.nilai else 0 end) as sks,"+
						" 	  sum(case when c.nama_produk like '%CUTI%' then b.jumlah * b.nilai else 0 end) as cuti,"+
						"	  sum(case when c.nama_produk like '%WISUDA%' then b.jumlah * b.nilai else 0 end) as wisuda,"+
						"	  sum(case when c.nama_produk like '%DENDA%' then b.jumlah * b.nilai else 0 end) as denda "+
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 ";
};
window.app_saku_piutang_report_flDetailAR.prototype.getByrMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.disc + b.nilai else 0 end) as bpp, "+
						"	  sum(case when c.nama_produk like '%SDP2%' then b.disc + b.nilai else 0 end) as sdp2,"+
						"	  sum(case when c.nama_produk like '%UP3%' then b.disc + b.nilai else 0 end) as up3,"+
						"	  sum(case when c.nama_produk like '%SKS%' then b.disc + b.nilai else 0 end) as sks,"+
						" 	  sum(case when c.nama_produk like '%CUTI%' then b.disc + b.nilai else 0 end) as cuti,"+
						"	  sum(case when c.nama_produk like '%WISUDA%' then b.disc + b.nilai else 0 end) as wisuda,"+
						"	  sum(case when c.nama_produk like '%DENDA%' then b.disc + b.nilai else 0 end) as denda "+
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1";
};
window.app_saku_piutang_report_flDetailAR.prototype.getBPPBefore = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.jumlah * b.nilai else 0 end) as bpp "+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode","<",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 ";
};
window.app_saku_piutang_report_flDetailAR.prototype.getBPPByrBefore = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.disc + b.nilai else 0 end) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.npm",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						this.filterRep.filterStr("a.periode","<",this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, a.ref1 ";
};
window.app_saku_piutang_report_flDetailAR.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
window.app_saku_piutang_report_flDetailAR.prototype.convertToHtml = function(result)
{
    var html = "<table class='kotak'>",line;    
    html += "<tr><th width=30>No</th><th>Angkatan</th><th>Nama</th><th>Saldo BPP</th><th>BPP</th><th>SDP2</th><th>UP3</th>"+
            "<th>SKS</th><th>Cuti</th><th>Wisuda</th><th>Denda</th><th>Saldo</th></tr>";
    for (var i in result.rs.rows){
        line = result.rs.rows[i];
        html += "<tr><td>"+i+"</td><td>"+line.angkatan+"</td><td>"+line.mhs+"</td><td>"+line.sawal+"</td>"+
            "<td>"+line.bpp+"</td><td>"+line.sdp2+"</td><td>"+line.up3+"</td><td>"+line.sks+"</td>"+
            "<td>"+line.cuti+"</td><td>"+line.wisuda+"</td><td>"+line.denda+"</td><td>"+line.jumlah+"</td></tr>";   
    }
    html += "</table>";
    return html;
};
