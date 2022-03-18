window.app_saku3_report_aka2_flAkTu = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_aka2_flAkTu.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_aka2_flAkTu";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Transaksi KasBank", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from takkirim_m where kode_lokasi='"+this.app._lokasi+"' and modul='TAKBILL' ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode ","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Fakultas","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jurusan","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Angkatan","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("NIM","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("No Bukti","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Tampilan Laporan","=","Layar"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku3_report_aka2_flAkTu.extend(window.childForm);
window.app_saku3_report_aka2_flAkTu.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Fakultas",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_fakultas, a.nama from aka_fakultas a   "+
														   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  "select count(a.kode_fakultas) from aka_fakultas a "+
														  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
														  ["a.kode_fakultas","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 3)
			{
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+
						this.filterRep.filterStr("a.kode_fakultas",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2)," and ");	
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_jur, a.nama from aka_jurusan a   "+filter,
														  "select count(a.kode_jur) from aka_jurusan a "+filter,
														  ["a.kode_jur","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 4)
			{
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ");	
				this.filterRep.ListDataSGFilter(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.kode_akt, a.nama from aka_angkatan a   "+filter,
														  "select count(a.kode_akt) from aka_angkatan a "+filter,
														  ["a.kode_akt","a.nama"],"and",["Kode","Nama"]);
			}
			if (row == 5)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+
							 this.filterRep.filterStr("b.kode_fakultas",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2)," and ")+
							 this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3)," and ");
				var sql1="select a.nim,a.nama "+
						"from aka_mahasiswa a "+
						"inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi "+filter; 
				var sql2="select count(a.nim) "+
						"from aka_mahasiswa a "+
						"inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi "+filter;
				this.filterRep.ListDataSGFilter(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.nim","a.nama"),"and",new Array("NIM","Nama"),"and");
			}		
			if (row ==6)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							"and a.modul='TAKBILL' ";
				this.filterRep.ListDataSGFilter(this, "Data Rekon",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_kirim,a.keterangan from takkirim_m a "+this.filter,
												"select count(a.no_kirim) from takkirim_m a "+this.filter,
												new Array("a.no_kirim","a.keterangan"),"and",new Array("No Bukti","Keterangan"));
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","23","123","123","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,2,2,0]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from takkirim_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 7)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Layar","Excell"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Jurusan","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Angkatan","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("NIM","All",""));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.app._namalokasi;
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("d.kode_fakultas",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							  this.filterRep.filterStr("c.kode_jur",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							  this.filterRep.filterStr("c.kode_akt",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							  this.filterRep.filterStr("c.nim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							  this.filterRep.filterStr("a.no_kirim",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							  "and a.modul='TAKBILL' ";
				this.filter2 = this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,7);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.nama_report = "server_report_saku3_aka2_rptAkTu";
				
				
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
	doOpenSaldoMhs: function(kode_jur,kode_lokasi){
		
		this.kode_jur=kode_jur;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = "";
		filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+kode_jur;;
		nama_report="server_report_saku2_aka_rptAkSaldoMhsTrail2";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenKartuMhs: function(nim,kode_lokasi){
		
		this.nim=nim;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = "";
		filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.kode_jur+"/"+nim;;
		nama_report="server_report_saku2_aka_rptAkKartuTrail2";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenJurnal: function(no_bukti,kode_lokasi){
		this.link="2";
		filter = "where no_kas='"+no_bukti+"' and kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku2_siaga_rptKasJurnal";
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
