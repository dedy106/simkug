window.app_saku_inventory_report_flKbSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flKbSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flKbSaldo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo KasBank", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["1234","123","123","3","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2,3,4],[0,2,2,0,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kas_j where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Bentuk Neraca","=","Neraca Lajur"]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Mutasi Nol","=","Tidak"]);
	this.doSelectCell(this.sg1,2,4);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flKbSaldo.extend(window.portalui_childForm);
window.app_saku_inventory_report_flKbSaldo.implement({
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
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
									  "select a.kode_akun, a.nama from masakun a "+
									  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+
									  " order by a.kode_akun",
									  "select count(a.kode_akun) from masakun a "+
									  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
									  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
									  ["a.kode_akun","nama"],"and",["Kode Akun","Nama"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("3","3","123","3","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(2,0,2,0,0));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("3","3","123","3","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(3,0,2,0,0));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from kas_j where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 3){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Neraca Lajur","Neraca Percobaan"]);
		}
		if (row === 4){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
		}
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Bentuk Neraca","=","Neraca Lajur"]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Mutasi Nol","=","Tidak"]);
			}else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				this.nik_user=this.app._nikUser;
				this.dbname = this.app._dbEng;
				this.lokasi=this.app._namalokasi;
				this.filter = this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
					  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					  this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filter2 = this.nik_user+"/"+this.sg1.getCell(2,4)+"/"+this.sg1.getCell(2,1);
				
				var sql = "call sp_glma_kas_tmp ('"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,1)+"','"+this.nik_user+"')";
				this.nama_report="server_report_inventory_rptKbSaldo";
				
				this.dbLib.execQuerySync(sql);	
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.report.preview(this.nama_report,this.filter, 1,this.pager, this.showFilter, this.lokasi,this.filter2);
				this.page = 1;
				this.allBtn = false;
			}
		}catch(e)
		{
			alert("[flTB]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result)
	{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page)
	{
		this.report.preview(this.nama_report,this.filter, page,this.pager, this.showFilter,this.lokasi, this.filter2);
		this.page=page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender)
	{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  this.page = 1;
		  this.allBtn = true;
		  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi,this.filter2);
	      break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	        window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	        
	        var cnv = undefined;
	        if (cnv != undefined)
	        {
	          cnv.focus();
	          cnv.print();
	        }
	      }catch(e)
	      {alert(e);}
	      break; 
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  }
	},
	sg1onChange: function(sender, col , row)
	{
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		}
	},
	doRowPerPageChange: function(sender, rowperpage)
	{
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});