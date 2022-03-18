window.app_saku3_report_yakes21_fa_flFaAsset = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_yakes21_fa_flFaAsset.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_yakes21_fa_flFaAsset";
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
	
	var sql="select max(a.periode) as periode from (select max(periode) as periode from fa_asset where kode_lokasi='"+this.app._lokasi+"' "+
			"union "+
			"select max(periode) as periode from periode where kode_lokasi='"+this.app._lokasi+"')a";
	this.periode=this.dbLib.getPeriodeFromSQL(sql);
	
	// var sql="select max(periode) as periode from fasusut_d where kode_lokasi='"+this.app._lokasi+"'";
	// this.periode2=this.dbLib.getPeriodeFromSQL(sql);

	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Periode Perolehan","<=",this.periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Periode Penyusutan","<=",this.periode]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Kelompok Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1], ["Jenis","All"]);
	this.gridLib.SGEditData(this.sg1,5,[0,1], ["No Asset","All"]);
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Output Laporan","=","Layar"));
	this.gridLib.SGEditData(this.sg1,7,[0,1,2], ["Kode PP","All",""]);
	this.gridLib.SGEditData(this.sg1,8,[0,1,2], ["No Hutang","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku3_report_yakes21_fa_flFaAsset.extend(window.childForm);
window.app_saku3_report_yakes21_fa_flFaAsset.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row ==0)
			{
				if (this.app._userStatus == "A") {
					this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
													"select count(*) from lokasi where flag_konsol='0'",
													new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
				}
				else {
					this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' order by kode_lokasi",
													"select count(*) from lokasi where kode_lokasi='"+this.app._lokasi+"'",
													new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
				}
			}
			if (row == 3)
			{
				//var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				var sql1="select a.kode_klpakun,a.nama from fa_klpakun a ";//+filter; 
				var sql2="select count(a.kode_klpakun) from fa_klpakun a ";//+filter; 
				this.filterRep.ListDataSGFilter(this, "Data Kelompok Akun",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.kode_klpakun","a.nama"),"where",new Array("Kode","Nama"),"and");
			}
			if (row == 4)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_klpakun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				var sql1="select distinct a.jenis from fa_asset a "+filter; 
				var sql2="select count(distinct a.jenis) from fa_asset a "+filter; 
				// alert(sql1);
				// alert(sql2);
				this.filterRep.ListDataSGFilter(this, "Data Asset",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.jenis"),"and",new Array("Jenis"),"and");
			}
			if (row == 5)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_klpakun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				var sql1="select a.no_fa,a.nama from fa_asset a "+filter; 
				var sql2="select count(a.no_fa) from fa_asset a "+filter; 
				this.filterRep.ListDataSGFilter(this, "Data Asset",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.no_fa","a.nama"),"and",new Array("Kode","Nama"),"and");
			}	
			if (row == 7)
			{
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				var sql1="select a.kode_pp,a.nama from pp a "+filter; 
				var sql2="select count(a.kode_pp) from pp a "+filter; 
				this.filterRep.ListDataSGFilter(this, "Data Kelompok Akun",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.kode_pp","a.nama"),"and",new Array("Kode","Nama"),"and");
			}
			if (row == 8)
			{
				
				var filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_klpakun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				var sql1="select distinct a.catatan,'-' as nama from fa_asset a "+filter; 
				var sql2="select count(a.catatan) from fa_asset a "+filter; 
				this.filterRep.ListDataSGFilter(this, "Data Hutang",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
												new Array("a.catatan","a.nama"),"and",new Array("Kode","Nama"),"and");
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		
		if (this.app._userStatus == "A") {
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8],["13","236","236","123","123","123","3","123","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8],[2,0,0,2,2,2,0,2,2]);	
		}
		else {
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8],["3","236","236","123","123","123","3","123","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8],[2,0,0,2,2,2,0,2,2]);	
		}

		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select a.periode from (select distinct periode from fa_asset where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"')a order by a.periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			//this.dbLib.setItemsFromSQL("select distinct periode from fasusut_d where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
			this.dbLib.setItemsFromSQL("select a.periode from (select distinct periode from fasusut_d where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select  periode from periode where kode_lokasi='"+this.app._lokasi+"')a order by a.periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 6)
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
				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
		    	this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_klpakun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.no_fa",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.catatan",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and");
				this.filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,2)+"/"+this.sg1.getCell(2,6);
				this.nama_report="server_report_saku3_yakes21_fa_rptFaAsset";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
			}
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
	doOpenBbAsset: function(no_fa,kode_lokasi){
		this.no_fa=no_fa;
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter2 = kode_lokasi+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,2);
		filter=" where a.no_fa='"+no_fa+"' and a.kode_lokasi='"+kode_lokasi+"'";
		nama_report="server_report_saku3_yakes21_fa_rptFaKartu";		
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
