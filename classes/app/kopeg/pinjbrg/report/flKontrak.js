window.app_kopeg_pinjbrg_report_flKontrak = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_report_flKontrak.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_pinjbrg_report_flKontrak";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Pengajuan Kredit Barang", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report", true);
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["1234","123","123","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2,3],[0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select max(periode) as periode from kop_pbrg_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Kontrak","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Perjanjian Kredit Barang"]);
	this.pager = 1;
};
window.app_kopeg_pinjbrg_report_flKontrak.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_report_flKontrak.implement({
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
			filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
			this.filterRep.ListDataSGFilter(this, "Data Kontrak",this.sg1, this.sg1.row, this.sg1.col,
										  "select a.no_kontrak,a.keterangan from kop_pbrg_m a "+filter,
										  "select count(*) from kop_pbrg_m a "+filter,
										  ["a.no_kontrak","a.keterangan"],"and",["No. Kontrak","Keterangan"]);
		}
		
	},
	doSelectCell: function(sender, col, row)
	{
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("3","3","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(2,0,2,0));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("3","3","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(3,0,2,0));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pbrg_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Perjanjian Kredit Barang","Schedule Angsuran Kredit Barang","Purchase Order"]);
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
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Kontrak","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Perjanjian Kredit Barang"]);
			}else{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				this.nik_user=this.app._nikUser;
				this.dbname = this.app._dbEng;
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_pbrg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filter2= this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.no_pbrg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				if (this.sg1.getCell(2,3) == "Perjanjian Kredit Barang")
				{
					this.nama_report="server_report_kopeg_rptKontrak2";
					this.filter+="//"+this.app._lokasi;
				
				}
				if (this.sg1.getCell(2,3) == "Schedule Angsuran Kredit Barang")
				{
					this.nama_report="server_report_kopeg_rptKontrak";
					
				}
				if (this.sg1.getCell(2,3) == "Purchase Order")
				{
					this.nama_report="server_report_kopeg_rptPoBarang";
					this.filter+="//"+this.app._lokasi;
				}				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();				
				this.report.preview(this.nama_report,this.filter, 1,this.pager, this.showFilter, this.lokasi,this.filter2, undefined, "html");
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
		try{	
			switch (methodName)
			{			
				case "preview" : 													
					if (result instanceof portalui_arrayList){
						/*this.viewer.preview(result.get(0));			
						for (var i in result.objList){
							if (i > 0){
								printPreview(result.get(i));
							}
						}*/						
						this.viewer.previewMultiPage(result.objList, false, result.tag1.split(","));
					}else this.viewer.preview(result);			
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page)
	{
		this.report.preview(this.nama_report,this.filter, page,this.pager, this.showFilter,this.lokasi, this.filter2, undefined, "html");
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
