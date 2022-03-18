window.app_saku3_report_ppbs_flAggUsulanRincian2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_ppbs_flAggUsulanRincian2.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_ppbs_flAggUsulanRincian2";
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
	this.pp=this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
	this.periode=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_usul_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","=",this.pp));
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("No Bukti","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Output Laporan","=","Layar"));
	//this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.pager=1;
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku3_report_ppbs_flAggUsulanRincian2.extend(window.childForm);
window.app_saku3_report_ppbs_flAggUsulanRincian2.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_lokasi, nama from lokasi  ",
														  "select count(kode_lokasi) from lokasi  ",
														  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
			}
			if (row == 2)
			{
				var filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				if (this.app._userStatus=="A")
				{
					
					this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_pp, nama from agg_pp "+filter,
														  "select count(*) from agg_pp "+filter,
														  new Array("kode_pp","nama"),"and");
				}
				if (this.app._userStatus=="U")
				{
					this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_pp, nama from agg_pp "+filter+" and kode_pp='"+this.pp+"' ",
														  "select count(*) from agg_pp "+filter+" and kode_pp='"+this.pp+"' ",
														  new Array("kode_pp","nama"),"and");
				}
				if (this.app._userStatus=="P")
				{
					var sql="select a.kode_pp, a.nama "+
							"from agg_pp a "+
							"inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where b.nik='"+this.app._userLog+"' and a.tahun='"+this.sg1.getCell(2,1)+"'";
					var sql2="select count(a.kode_pp) "+
							"from agg_pp a "+
							"inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where b.nik='"+this.app._userLog+"' and a.tahun='"+this.sg1.getCell(2,1)+"'";
					this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
														  ["a.kode_pp","a.nama"],"and",["Kode","Nama"]);
				}
			}
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",
														  "select count(kode_akun) from masakun where kode_lokasi = '"+this.app._lokasi+"'  ",
														  ["kode_akun","nama"],"and",["Kode","Nama"]);
			}
			if (row == 4)
			{
				var filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filterRep.ListDataSGFilter(this, "Daftar Bukti",this.sg1, this.sg1.row, this.sg1.col,
														  "select no_usul, keterangan from agg_usul_m "+filter,
														  "select count(no_usul) from agg_usul_m "+filter,
														  ["no_usul","keterangan"],"and",["No Bukti","Tahun"]);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","123","123","123","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,0]);	
		}
		if (this.app._userStatus=="U")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","3","123","123","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,3,2,2,0]);	
		}
		if (this.app._userStatus=="P")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","23","123","123","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,0]);	
		}
		if (row == 1)
		{
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_usul_m a "+
										this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where "),[this.sg1.columns.get(2).pickList]);
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Layar","Excel"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Bidang","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PP  ","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Status program ","All",""));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.app._namalokasi;
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							   this.filterRep.filterStr("a.no_usul",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
				this.filter2 = this.sg1.getCell(2,5);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				this.nama_report = "server_report_saku3_ppbs_rptAggUsulanRincian2";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
				this.page = 1;
				this.allBtn = false;
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku3_report_ppbs_flAggUsulanRincian2]::mainButtonClick:"+e);
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