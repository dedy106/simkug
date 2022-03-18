// JavaScript Document
window.app_saku3_report_dw_flDwLabaRugiFakultasAkre = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_dw_flDwLabaRugiFakultasAkre.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_dw_flDwLabaRugiFakultasAkre";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,170],colCount:4,cellExit:[this,"doCellExit"],
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
	this.userStatus=this.app._userStatus;
	var sql="select h.kode_fakultas as periode "+
			"from pp d "+
			"left join exs_bidang e on d.kode_bidang=e.kode_bidang and d.kode_lokasi=e.kode_lokasi "+
			"left join exs_rektor f on e.kode_rektor=f.kode_rektor and e.kode_lokasi=f.kode_lokasi "+
			"left join exs_rektor_klp g on f.kode_klp=g.kode_klp and f.kode_lokasi=g.kode_lokasi "+
			"left join exs_prodi h on d.kode_pp=h.kode_prodi and d.kode_lokasi=h.kode_lokasi "+
			"left join exs_fakultas i on h.kode_fakultas=i.kode_fakultas and h.kode_lokasi=i.kode_lokasi "+
			"where d.kode_lokasi='"+this.app._lokasi+"' and d.kode_pp='"+this.app._kodePP+"'";
	this.fakultas=this.dbLib.getPeriodeFromSQL(sql);
	this.periode=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from exs_periode where  kode_lokasi='"+this.app._lokasi+"'");
	this.fs=this.dbLib.getPeriodeFromSQL("select kode_fs1 as periode from fs_akre where  kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.fakultas+"'");
	if (this.fs=="")
	{
		this.fs="FP1";
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode FS","=",this.fs));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Fakultas","=",this.fakultas));
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Output Laporan","=","Layar"]);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku3_report_dw_flDwLabaRugiFakultasAkre.extend(window.portalui_childForm);
window.app_saku3_report_dw_flDwLabaRugiFakultasAkre.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' ",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_fs,nama from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  "select count(kode_fs) from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_fs","nama"),"where");
		}
		if (row == 3)
		{
			if (this.app._userStatus=="A")
			{
				var sql="select a.kode_fakultas,a.nama from exs_fakultas a "+
						"where a.kode_lokasi='"+this.app._lokasi+"'  ";
				
				var sql2="select count(a.kode_fakultas) from exs_fakultas a "+
						"where a.kode_lokasi='"+this.app._lokasi+"' ";
			}
			else
			{
				var sql="select a.kode_fakultas,a.nama from exs_fakultas a "+
						"inner join exs_prodi c on a.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi"+
						"inner join karyawan_pp b on c.kode_lokasi=b.kode_lokasi and c.kode_prodi=b.kode_pp "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"' ";
				
				var sql2="select count(a.kode_fakultas) from exs_fakultas a "+
						"inner join exs_prodi c on a.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi"+
						"inner join karyawan_pp b on c.kode_lokasi=b.kode_lokasi and c.kode_prodi=b.kode_pp "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'";
			}
			this.filterRep.ListDataSGFilter(this, "Data Prodi",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,new Array("a.kode_fakultas","a.nama"),"where");
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("3","3","3","123","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(3,0,2,2,0));
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("3","3","3","3","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(3,0,2,2,0));
		}
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from exs_periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
			
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
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
					this.doOpenTb(this.kode_lokasi,this.periode,this.kode_neraca,this.kode_pp);
				}
				if (this.link=="3")
				{
					this.doOpenBb(this.kode_akun,this.kode_lokasi,this.periode,this.kode_pp);
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
				this.nik_user=this.app._nikUser;
				this.dbname = this.app._dbEng;
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");			
				this.filter =  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_fs",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				var kode_pp=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_fakultas",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.nama_report="server_report_saku3_dw_rptDwLabaRugiFakultasAkre";
				this.filter2 = this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+kode_pp+"/"+this.sg1.getCell(2,4);
				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
			}
			
		}catch(e)
		{
			systemAPI.alert("[flTB]::mainButtonClick:"+e);
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
	doOpenGar: function(kode_lokasi,periode,kode_neraca,kode_pp){
		this.kode_neraca=kode_neraca;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.kode_pp=kode_pp;
		this.link="1";
		var tahun=periode.substr(0,4);
		filter2=this.sg1.getCell(2,0)+"/"+tahun+"/"+kode_neraca+"/"+this.sg1.getCell(2,2);
		filter="where a.kode_lokasi='"+kode_lokasi+"' and e.kode_neraca='"+kode_neraca+"' and e.kode_fs='"+this.sg1.getCell(2,2)+"' and a.tahun='"+tahun+"' and a.kode_pp='"+kode_pp+"'";
		nama_report="server_report_saku3_dw_rptGarBulanTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenGarSd: function(kode_lokasi,periode,kode_neraca,kode_pp){
		this.kode_neraca=kode_neraca;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.kode_pp=kode_pp;
		this.link="1";
		var tahun=periode.substr(0,4);
		filter2=this.sg1.getCell(2,0)+"/"+periode+"/"+kode_neraca+"/"+this.sg1.getCell(2,2);
		filter="where a.kode_lokasi='"+kode_lokasi+"' and e.kode_neraca='"+kode_neraca+"' and e.kode_fs='"+this.sg1.getCell(2,2)+"' and a.tahun='"+tahun+"' and a.kode_pp='"+kode_pp+"'";
		nama_report="server_report_saku3_dw_rptGarBulanSdTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenTb: function(kode_lokasi,periode,kode_neraca,kode_pp){
		this.kode_neraca=kode_neraca;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.kode_pp=kode_pp;
		this.link="1";
		
		filter2=this.sg1.getCell(2,0)+"/"+periode+"/"+kode_neraca+"/"+this.sg1.getCell(2,2);
		filter="where a.kode_lokasi='"+kode_lokasi+"' and b.kode_neraca='"+kode_neraca+"' and b.kode_fs='"+this.sg1.getCell(2,2)+"' and a.periode='"+periode+"' and a.kode_pp='"+kode_pp+"'";
		nama_report="server_report_saku3_dw_rptGlTbPpTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenBb: function(kode_akun,kode_lokasi,periode,kode_pp){
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.kode_pp=kode_pp;
		var var_periode=" and a.periode='"+periode+"'";
		this.link="2";
		filter2=this.sg1.getCell(2,0)+"/"+periode+"/"+kode_pp;
		filter="where a.kode_lokasi='"+kode_lokasi+"' and a.kode_akun='"+kode_akun+"' and a.periode='"+periode+"' and a.kode_pp='"+kode_pp+"'";
		nama_report="server_report_saku3_dw_rptGlBukuBesarPpTu";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenJurnal: function(no_bukti,kode_lokasi,periode){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.link="3";
		filter = "where a.no_bukti='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' and a.periode='"+periode+"'";
		filter2="";
		nama_report="server_report_saku3_dw_rptGLJurnalBuktiTu";
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
