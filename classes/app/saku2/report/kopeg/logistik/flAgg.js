window.app_saku2_report_kopeg_logistik_flAgg = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kopeg_logistik_flAgg.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kopeg_logistik_flAgg";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2,3],["Lokasi","Range",this.app._lokasi,this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun","=",this.app._periode.substr(0,4)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode PP","=",this.app._kodePP]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode DRK","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Akun","=","Investasi"]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Periodik Laporan","=","Bulanan"]);
	this.doSelectCell(this.sg1,2,6);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
	
};
window.app_saku2_report_kopeg_logistik_flAgg.extend(window.portalui_childForm);
window.app_saku2_report_kopeg_logistik_flAgg.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' ",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from masakun a  where a.block= '0' "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  "select count(a.kode_akun) from masakun a  where a.block= '0'"+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["kode_akun","nama"],"and",["Kode Akun","Nama"]);
		}
		if (row == 3)
		{
			var filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				var tahun=this.sg1.getCell(2,1).substr(0,4);
				
					var sql="select a.kode_pp, a.nama "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.tipe='Posting' "+filter;
					var sql2="select count(a.kode_pp) "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.tipe='Posting' "+filter;
			
				
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
												new Array("a.kode_pp","a.nama"),"and",new Array("kode pp","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data DRK",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_drk, nama from drk "+
													   this.filterRep.filterStr("tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1).substr(0,4),this.sg1.getCell(3,1).substr(0,4)," where ")+
													   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  "select count(kode_drk) from drk "+
													  this.filterRep.filterStr("tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0).substr(0,4),this.sg1.getCell(3,0).substr(0,4)," where ")+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  new Array("kode_drk","nama"),"where",new Array("kode","nama"),"where");
		}
		
	},
	doSelectCell: function(sender, col, row){
		
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["123","123","123","123","123","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,2,0,0,0]);
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct(substring(periode,1,4)) as periode from anggaran_d "+
									   "where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Investasi"]);
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Triwulan","Semester","Bulanan"]);
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.lokasi=this.app._namalokasi;
			this.nik_user=this.app._nikUser;
			var jenis="";
			if (this.sg1.getCell(1,5)!="All")
			{
				if (this.sg1.getCell(2,5)=="Investasi")
				{
					jenis=" and y.jenis='Neraca' ";
				}
				else
				{
					jenis=" and y.jenis='"+this.sg1.getCell(2,5)+"' ";
				}
			}
			var modul="";
			if (this.sg1.getCell(2,7)!="Berjalan")
			{
				modul=" and x.modul='ORGI' ";
			}
			
			this.filter=this.filterRep.filterStr("x.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("substring(x.periode,1,4)",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
						this.filterRep.filterStr("x.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("x.kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("x.kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+jenis+modul;
			this.filter2=this.nik_user+"/"+this.sg1.getCell(2,1)+"/"+this.app._namaForm+"/"+this.sg1.getCell(2,0)+"/"+this.sg1.getCell(3,0);	
			if (this.sg1.getCell(2,6)=="Triwulan")
			{			
				this.nama_report="server_report_saku2_gar_rptAggTw";
			}
			if (this.sg1.getCell(2,6)=="Semester")
			{
				this.nama_report="server_report_saku2_gar_rptAggSem";
			}
			if (this.sg1.getCell(2,6)=="Bulanan")
			{
				this.nama_report="server_report_saku2_gar_rptAggBulan";
			}
		
			//this.dbLib.execQuerySync(sql);	
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.page = 1;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			
			this.allBtn = false;
		}catch(e){
			systemAPI.alert("[flJurnal]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.report){
			/*kirim mail*/
			this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
			switch (methodName)
			{
				case "preview" :
					this.viewer.preview(result);			
					this.viewer.hideLoading();
					break;
				
			}/*kirim mail*/
		}else if (sender === this.mail){
			if (methodName === "sendMail"){
				system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
			}
		}
	},
	getStringHeader: function(){
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
				"<html xmlns='http://www.w3.org/1999/xhtml'>"+
				"<head>"+
				"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
				"<title>Preview</title>"+
				"</head>"+
				"<body>";
	},
	doSelectedPage: function(sender, page){
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	    switch(sender.getName()){
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;		  
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
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
	      
	      break; /*kirim mail*/
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},/*kirim mail*/
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = "Laporan Transaksi Jurnal "+d.toLocaleString();
					var pesan = this.allHtml;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}else if (sender === sender.owner.bCancel){
				sender.owner.free();
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
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
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
