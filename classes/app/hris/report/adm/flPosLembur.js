window.app_hris_report_adm_flPosLembur = function(owner)
{
	if (owner)
	{
		window.app_hris_report_adm_flPosLembur.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_adm_flPosLembur";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi Lembur", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gr_lembur where kode_lokasi='"+this.app._lokasi+"'");
	if (this.app._userStatus=="A")
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Lembur","All",""])
	}
	else
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Lembur","All",""])
	}
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_hris_report_adm_flPosLembur.extend(window.childForm);
window.app_hris_report_adm_flPosLembur.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 4)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama from gr_karyawan a "+this.filter,
													"select count(*) from gr_karyawan a "+this.filter,
													["a.nik","a.nama"],"and",["NIK","Nama"], false, this.sg1.cells(1,row) == "in");
			}		
			if (row == 5)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.nik",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.filterRep.ListDataSGFilter(this, "Daftar Lembur",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.no_lembur, a.keterangan from gr_lembur a "+
													  "inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter,
													  "select count(a.no_lembur) from gr_lembur a "+
													  "inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+this.filter,
													  ["a.no_lembur","a.keterangan"],"and",["No Lembur","Keterangan"], false, this.sg1.cells(1,row) == "in");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123i","123i","123i","123i","123i","123i"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[0,2,2,2,2,2]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","3","3","3","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[0,3,3,3,3,3]);
		}
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from gr_lembur where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				if (this.app._userStatus=="A")
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","All",""]);
					this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Lembur","All",""])
				}
				else
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Periode","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
					this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No Lembur","All",""])
				}
			}
			else
			{
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
					
				}
				else
				{
					this.p1.setVisible(false);
					this.viewer.prepare();
					this.viewer.setVisible(true);
					this.app._mainForm.pButton.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(true);
					this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					this.filterRep.filterStr("b.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					this.filterRep.filterStr("b.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					this.filterRep.filterStr("b.nik",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					this.filterRep.filterStr("a.no_lembur",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
					this.filter2 = this.sg1.getCell(2,0)+"/";
					this.showFilter = this.filterRep.showFilter(this.sg1);
					var result  = new arrayMap();		
					this.lokasi=this.app._namalokasi;
					this.nama_report = "server_report_hris_rptPosLembur";
					this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.page = 1;
					this.allBtn = false;
				}
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku2_report_siaga_flBebanKontrol]::mainButtonClick:"+e);
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
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	    switch(sender.getName()){
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
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
	doOpenBukti: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_lembur='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.app._namaUser;
		nama_report="server_report_hris_rptLembur";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenKaryawan: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.nik='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.app._namaUser;
		nama_report="server_report_hris_rptCvSk";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenVer: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_ver='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.app._namaUser;
		nama_report="server_report_hris_rptVerLembur";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenApp: function(no_bukti,kode_lokasi){
		this.link="1";
		filter = "where a.no_app='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2=this.app._namaUser;
		nama_report="server_report_hris_rptAppLembur";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

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
