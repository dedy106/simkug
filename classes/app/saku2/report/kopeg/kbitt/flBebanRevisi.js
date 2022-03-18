window.app_saku2_report_kopeg_kbitt_flBebanRevisi = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kopeg_kbitt_flBebanRevisi.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kopeg_kbitt_flBebanRevisi";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
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
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","=",this.app._kodePP));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Bukti","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Tanggal","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Output Laporan","=","Layar"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Bukti Keluar","All",""));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku2_report_kopeg_kbitt_flBebanRevisi.extend(window.childForm);
window.app_saku2_report_kopeg_kbitt_flBebanRevisi.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0'",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			if (row == 2)
			{
				var filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				var tahun=this.sg1.getCell(2,1).substr(0,4);
				if (this.app._userStatus=="A")
				{
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
				}
				else
				{
					var sql="select a.kode_pp, a.nama "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
						"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
					var sql2="select count(a.kode_pp) "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
						"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
				}
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
												new Array("a.kode_pp","a.nama"),"and",new Array("kode pp","nama"));
			}

			if (row ==3)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							" and a.modul in ('UMUM','BMULTI')  and a.progress not in ('J','L') ";
				this.filterRep.ListDataSGFilter(this, "Data Pengajuan",this.sg1, this.sg1.row, this.sg1.col,
												"select distinct a.kode_akun, b.nama from it_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter,
												"select count(distinct a.kode_akun) from it_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter,
												new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"));
			}
			
			if (row == 4)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							" and a.modul in ('UMUM','BMULTI')  and a.progress not in ('J','L') ";
				this.filterRep.ListDataSGFilter(this, "Data Pengajuan",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_aju, a.keterangan from it_aju_m a "+this.filter,
												"select count(*) from it_aju_m a "+this.filter,
												new Array("a.no_aju","a.keterangan"),"and",new Array("No Bukti","Keterangan"));
			}

			
			if (row == 7)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							" and a.modul in ('UMUM','BMULTI')  and a.progress not in ('J','L') ";
				this.filterRep.ListDataSGFilter(this, "Data Pengajuan",this.sg1, this.sg1.row, this.sg1.col,
												"select distinct a.no_kas from it_aju_m a "+this.filter,
												"select count(distinct a.no_kas) from it_aju_m a "+this.filter,
												new Array("a.no_kas"),"and",new Array("No Bukti"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","123","123","123","123","123","3","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,0,2,2,2,1,0,2]);	
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","123","3","123","123","123","3","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,0,2,2,2,2,1,2]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from it_aju_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Layar","Excell"));
		}
	},
	cekpp: function(){
		alert('a');
	},
	cekpp: function(){
	
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
					this.doOpenBayar(this.no_bukti,this.kode_lokasi);					
					
				}
			}
			else
			{
				// cek ulang pp
				if (this.app._userStatus!="A")
				{
					if (this.sg1.getCell(1,2)!="=")
					{
						system.alert(this,"Type harus di isi = ","");
						this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","=",this.app._kodePP));
						return false;
					}
					if (this.sg1.getCell(2,2)!="")
					{
						this.pp=this.dbLib.getPeriodeFromSQL("select count(kode_pp) as periode from karyawan_pp where kode_lokasi='"+this.sg1.getCell(2,0)+"' and kode_pp='"+this.sg1.getCell(2,2)+"' and nik='"+this.app._userLog+"'");
						if (this.pp=="0")
						{
							system.alert(this,"Kode PP Tidak Terdaftar dalam hakakses","");
							return false;
						}
					}
				}
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.app._namalokasi;
				
				var tanggal="";
				if (this.sg1.getCell(1,5)=="=")
				{
					tanggal=" and a.tanggal='"+this.sg1.getCellDateValue(2,5)+"'";
				}
				if (this.sg1.getCell(1,5)=="Range")
				{
					tanggal=" and (a.tanggal between '"+this.sg1.getCellDateValue(2,5)+"' and '"+this.sg1.getCellDateValue(3,5)+"') ";
				}
		    	this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_aju",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+tanggal+
							this.filterRep.filterStr("a.no_kas",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							" and a.modul in ('UMUM','BMULTI') and a.progress not in ('J','L') ";
				this.filter2 = this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,6);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				this.nama_report = "server_report_saku2_kopeg_kbitt_rptBebanRevisi";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_kopeg_kbitt_flBebanRevisi]::mainButtonClick:"+e);
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
					var subject = this.app._namaForm;
					var pesan = this.viewer.getContent();
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
	doOpenBukti: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_aju='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.sg1.getCell(2,1);
		nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenJu: function(no_bukti,kode_lokasi){
		this.link="1";
		filter2 = "where a.no_ju='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter="";
		nama_report="server_report_saku2_gl_rptBuktiJurnal";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenKas: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_kas='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku2_kopeg_kbitt_rptKbJurnalTuForm";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenSpb: function(no_bukti,kode_lokasi){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = "where a.no_spb='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku2_kopeg_kbitt_rptSpbTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	},
	doOpenDok: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_bukti='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.app._periode;
		nama_report="server_report_saku2_kopeg_kbitt_rptDetailDok";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenVer: function(no_bukti,kode_pp,periode,kode_lokasi){
		this.link="1";
		filter = "where a.no_aju='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' and a.kode_pp='"+kode_pp+"' and a.modul in ('UMUM','BMULTI') ";
		filter2=periode+"/Layar";
		nama_report="server_report_saku2_kopeg_kbitt_rptBebanPosTu3";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
