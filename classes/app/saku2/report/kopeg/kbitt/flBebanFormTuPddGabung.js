window.app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from it_aju_m where kode_lokasi='"+this.app._lokasi+"' and no_ref1 in ('MALA','MABA','CAMABA') ");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","=",this.app._kodePP));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Peserta","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("No Bukti","All",""));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung.extend(window.childForm);
window.app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung.implement({
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
							" and a.modul in ('UMUM','BMULTI') and a.no_ref1 in ('MALA','MABA','CAMABA') ";
				this.filterRep.ListDataSGFilter(this, "Data Pengajuan",this.sg1, this.sg1.row, this.sg1.col,
												"select distinct a.kode_akun, b.nama from it_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter,
												"select count(distinct a.kode_akun) from it_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+this.filter,
												new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"));
			}
			
			if (row ==4)
			{
				var filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				var sql1 = "select a.nim,b.nama "+
						"from (select a.nim,a.kode_lokasi "+
						"	from aka_cd_d a "+
						"	inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+ filter+
						"	group by a.nim,a.kode_lokasi "+
						"	)a "+
						"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi ";
				var sql2 = "select count(a.nim) "+
						"from (select a.nim,a.kode_lokasi "+
						"	from aka_cd_d a "+
						"	inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+ filter+
						"	group by a.nim,a.kode_lokasi "+
						"	)a "+
						"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi ";
				this.filterRep.ListDataSGFilter(this, "Data Mahasiswa",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2, new Array("a.nim","b.nama"),"and",new Array("NIM","Nama"));

			}

			if (row ==5)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							" and a.modul in ('UMUM','BMULTI') and a.no_ref1 in ('MALA','MABA','CAMABA') ";

				var sql1 = "select distinct a.no_aju, a.keterangan "+
				"from it_aju_m a "+
				"inner join aka_cd_d b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+this.filter;

				var sql2 = "select count(distinct a.no_aju) as jum "+
				"from it_aju_m a "+
				"inner join aka_cd_d b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+this.filter;

				this.filterRep.ListDataSGFilter(this, "Data Pengajuan",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("a.no_aju","a.keterangan"),"and",new Array("No Bukti","Keterangan"));
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","123","123","123","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,2]);	
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","3","123","123","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,0,2,2,2,2]);
		}	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from it_aju_m where kode_lokasi='"+this.app._lokasi+"' and no_ref1 in ('MALA','MABA','CAMABA') order by periode",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Bukti","All",""));
			}else{
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
		    	this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_aju",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							" and a.modul in ('UMUM','BMULTI') and a.no_ref1 in ('MALA','MABA','CAMABA') ";
				this.filter2 = this.sg1.getCell(2,1)+"/"+this.app._lokasi;

				this.filter3 =  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("nim",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");

				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				this.nama_report = "server_report_saku2_kopeg_kbitt_rptBebanFormTuPddGabung";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
				this.page = 1;
				this.allBtn = false;
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_kopeg_kbitt_flBebanFormTuPddGabung]::mainButtonClick:"+e);
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
