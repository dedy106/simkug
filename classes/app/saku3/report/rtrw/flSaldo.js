// JavaScript Document
window.app_saku3_report_rtrw_flSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_rtrw_flSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_rtrw_flSaldo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,170],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from trans_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode PP","=",this.app._kodePP));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Periode","=",this.periode));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode Akun","All",""));
	
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
window.app_saku3_report_rtrw_flSaldo.extend(window.portalui_childForm);
window.app_saku3_report_rtrw_flSaldo.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' ",
											"select count(*) from lokasi where kode_lokasi='"+this.app._lokasi+"' ",
											new Array("kode_lokasi","nama"),"and",new Array("kode","nama"));
		}
		if (row == 1)
		{
				var filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				
					var sql="select a.kode_pp, a.nama "+
							"from pp a "+
							"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
							"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
					var sql2="select count(a.kode_pp) "+
							"from pp a "+
							"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
							"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
					this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
													new Array("a.kode_pp","a.nama"),"and",new Array("kode pp","nama"));
				
		}
		if (row == 3)
		{
			var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+
					this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," and ");
			var sql="select a.kode_akun,a.nama "+
					"from masakun a "+
					"inner join (select a.kode_akun,a.kode_lokasi "+
					"			from trans_j a "+filter+
					"			group by a.kode_akun,a.kode_lokasi "+
					"			)b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'";
			var sql2="select count(a.kode_akun) "+
					"from masakun a "+
					"inner join (select a.kode_akun,a.kode_lokasi "+
					"			from trans_j a "+filter+
					"			group by a.kode_akun,a.kode_lokasi "+
					"			)b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'";
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
											new Array("a.kode_akun","a.nama"),"and",new Array("kode","nama"));
		}
		
	},
	doSelectCell : function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["123","3","3","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,2,0,2]);	
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from trans_m where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
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
					this.dbLib.execQuerySync(this.sql);	
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.link="";
				}
				if (this.link=="2")
				{
					this.doOpenBuku(this.kode_akun,this.kode_lokasi,this.periode,this.kode_pp);
				}
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				this.nik_user=this.app._nikUser;
				this.dbname = this.app._dbEng;
				
				this.lokasi=this.app._namalokasi;
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," and ")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2)," and ")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3)," and ");
				this.filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,2)+"/"+this.app._nikUser;
				this.nama_report="server_report_saku3_rtrw_rptSaldo";
				this.dbLib.execQuerySync(this.sql);	
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.page = 1;
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				
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
	doOpenBuku: function(kode_akun,kode_lokasi,periode,kode_pp){
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.kode_pp=kode_pp;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.periode='"+periode+"' and a.kode_pp='"+kode_pp+"' ";
		filter2=kode_lokasi+"/"+kode_pp+"/"+periode+"/"+this.app._nikUser+"/"+" and a.kode_akun='"+kode_akun+"'";
		nama_report="server_report_saku3_rtrw_rptBuku";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doOpenJurnal: function(no_bukti,kode_lokasi){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.link="2";
		filter = "where a.no_bukti='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
		filter2="";
		nama_report="server_report_saku3_rtrw_rptJurnal";
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
