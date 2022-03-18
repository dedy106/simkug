window.app_saku3_report_aka2_flAkSaldoFakultas = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_aka2_flAkSaldoFakultas.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_aka2_flAkSaldoFakultas";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Kartu Piutang", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode "+
	"from (select max(periode) as periode from aka_rekon_m where kode_lokasi='"+this.app._lokasi+"' "+
	"union "+
	"select max(periode) from aka_bill_m where kode_lokasi='"+this.app._lokasi+"') a ");
	if (this.app._userStatus=="A")
		{
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode ","<=",this.periode));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Fakultas","All",""));	
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Tampil Saldo Nol","=","Tidak"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Status Piutang","All",""));
		}else{

			this.fak = this.dbLib.getPeriodeFromSQL("select top 1 a.kode_fakultas as periode from aka_fakultas a left join pp b on a.kode_fakultas=b.kode_bidang and a.kode_lokasi=b.kode_lokasi left join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' ");
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode ","<=",this.periode));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Fakultas","=",this.fak));	
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Tampil Saldo Nol","=","Tidak"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Status Piutang","All",""));
		}
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	//this.pager=10;
	
};
window.app_saku3_report_aka2_flAkSaldoFakultas.extend(window.childForm);
window.app_saku3_report_aka2_flAkSaldoFakultas.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 2)
			{
				if (this.app._userStatus=="A")
				{		
					this.filterRep.ListDataSGFilter(this, "Data Fakultas",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_fakultas, a.nama from aka_fakultas a "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  "select count(a.kode_fakultas) from aka_fakultas a "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  ["a.kode_fakultas","a.nama"],"and",["Kode","Nama"]);
				}else{
				this.filterRep.ListDataSGFilter(this, "Data Fakultas",this.sg1, this.sg1.row, this.sg1.col,
														  "select distinct a.kode_fakultas, a.nama from aka_fakultas a left join pp b on a.kode_fakultas=b.kode_bidang and a.kode_lokasi=b.kode_lokasi left join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" and c.nik='"+this.app._userLog+"' ",
														  "select count(a.kode_fakultas) from aka_fakultas a left join pp b on a.kode_fakultas=b.kode_bidang and a.kode_lokasi=b.kode_lokasi left join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" and c.nik='"+this.app._userLog+"'",
														  ["a.kode_fakultas","a.nama"],"and",["Kode","Nama"]);
				}
			}
				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		if (this.app._userStatus=="A")
		{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","26","123","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);	
		}else{
			
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","26","3","13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);	
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.sg1.columns.get(3).pickList.clear();
			this.dbLib.setItemsFromSQL("select a.periode "+
									"from (select distinct periode,kode_lokasi from aka_rekon_m where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select periode,kode_lokasi from periode where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select distinct periode,kode_lokasi from aka_bill_m where kode_lokasi='"+this.app._lokasi+"') a "+
									"where a.kode_lokasi='"+this.app._lokasi+"' order by a.periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}

		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
		}	

		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct sts_tagih from aka_mahasiswa where kode_lokasi='"+this.app._lokasi+"' and sts_tagih <> '-' order by sts_tagih ",[this.sg1.columns.get(2).pickList]);
		}
	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				//clear	
			}
			else 
			if (sender == this.app._mainForm.bBack)
			{
				if (this.link=="")
				{
					this.p1.setVisible(true);
					this.app._mainForm.pButton.setVisible(true);
					this.viewer.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(false);
				}
				if (this.link=="1")
				{
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.link="";
				}
				if (this.link=="2")
				{
					this.doOpenSaldoJur(this.kode_lokasi,this.kode_fakultas);					
					
				}
				if (this.link=="3")
				{
					this.doOpenSaldoMhs(this.kode_jur,this.kode_lokasi,this.kode_fakultas);					
					
				}
			}
			else
			{
				this.link="";
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.app._namalokasi;
		    	this.filter =this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+
							 this.filterRep.filterStr("a.kode_fakultas",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2)," and ");
				this.filter2 = this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(3,1)+"/"+this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,4);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.nama_report = "server_report_saku3_aka2_rptAkSaldoFakultas";
				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.page = 1;
				this.allBtn = false;	
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
			}
		}catch(e){
			systemAPI.alert("[flBB]::mainButtonClick:"+e);
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
		}else if (sender === this.dbLib){
		    try{          				
   			}catch(e){
   			  alert(e);
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
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.page = page;
		this.allBtn = false;
		
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :				
			var file = this.report2.createExcel(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2);
			downloadFile(file);
		break;
	    case "MailBtn" :
			sender.owner = new ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      	this.app._mainForm.reportNavigator.serverDownload = false;
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
					var subject = "Laporan Buku Besar "+d.toLocaleString();
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
	doOpenSaldoJur: function(kode_fakultas,kode_lokasi){
		this.link="1";
		this.kode_fakultas=kode_fakultas;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = " where a.kode_lokasi='"+this.kode_lokasi+"' and a.kode_fakultas='"+this.kode_fakultas+"'";
		filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(3,1);
		nama_report="server_report_saku3_aka2_rptAkSaldoJurTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenSaldoMhs: function(kode_jur,kode_lokasi){
		this.link="1";
		this.kode_jur=kode_jur;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = " where a.kode_lokasi='"+this.kode_lokasi+"' and a.kode_jur='"+this.kode_jur+"' ";
		if(this.sg1.getCell(1,1) == "Range"){
			var filterper = " and x.periode between '"+this.sg1.getCell(2,1)+"' and '"+this.sg1.getCell(3,1)+"' ";
		}else{
			var filterper = " and x.periode = '"+this.sg1.getCell(2,1)+"'";
		}
		filter2=this.sg1.getCell(2,0)+"|"+this.sg1.getCell(2,1)+"|Tidak|Layar||"+filterper;
		nama_report="server_report_saku3_aka2_rptAkSaldoMhsTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenKartuMhs: function(nim,kode_lokasi){
		this.link="3";
		this.nim=nim;
		this.kode_lokasi=kode_lokasi;
		
		filter = " where a.kode_lokasi='"+this.kode_lokasi+"' and a.nim='"+this.nim+"'";
		filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.kode_jur+"/"+nim;;
		nama_report="server_report_saku2_kopeg_aka_rptAkKartuTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenJurnal: function(no_bukti,kode_lokasi){
		this.link="2";
		filter = "where no_kas='"+no_bukti+"' and kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku2_kopeg_aka_rptAkKartu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
		this.page = 1;
		this.allBtn = false;
		this.doSelectedPage(undefined, 1);
	}	
});
