window.app_saku2_report_kopeg_sju_flAggPakai = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kopeg_sju_flAggPakai.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku2_report_kopeg_sju_flAggPakai";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.app._periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Akun","=","Beban"]);
	this.doSelectCell(this.sg1,2,3);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
};
window.app_saku2_report_kopeg_sju_flAggPakai.extend(window.portalui_childForm);
window.app_saku2_report_kopeg_sju_flAggPakai.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
			{
				if (this.app._userStatus=="A")
				{
					this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0'",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
				}
				
			}
		if (row == 2)
		{
			var sql1="select a.kode_akun, a.nama "+
					"from masakun a "+
					"inner join (select kode_akun,kode_lokasi from anggaran_d "+
					"			where kode_lokasi='"+this.sg1.getCell(2,0)+"' and substring(periode,1,4)='"+this.sg1.getCell(2,1).substr(0,4)+"' "+
					"			group by kode_akun,kode_lokasi "+
					"		   )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' ";
			var sql2="select count(a.kode_akun) "+
					"from masakun a "+
					"inner join (select kode_akun,kode_lokasi from anggaran_d "+
					"			where kode_lokasi='"+this.sg1.getCell(2,0)+"' and substring(periode,1,4)='"+this.sg1.getCell(2,1).substr(0,4)+"' "+
					"			group by kode_akun,kode_lokasi "+
					"		   )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' ";
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);
		}
		
		
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","123","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct(periode) as periode from anggaran_d "+
									   "where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Beban","Investasi","Pendapatan"]);
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Anggaran","General Ledger"]);
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
					this.doOpenKartu(this.kode_akun,this.kode_lokasi,this.tahun);					
				}
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.app._namalokasi;
				this.nik_user=this.app._nikUser;
				this.filter=this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filter2=this.nik_user+"/"+this.sg1.getCell(2,1);	
				var sql = "call sp_agg_pakai_sju ('"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,3)+"','"+this.sg1.getCell(2,1)+"','"+this.nik_user+"')";
				
				this.nama_report="server_report_saku2_kopeg_sju_rptAggPakai";
				this.dbLib.execQuerySync(sql);	
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.page = 1;
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
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
	doOpenGar: function(kode_akun,kode_lokasi,tahun){
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.tahun=tahun;
		this.link="1";
		filter = "where x.kode_akun='"+kode_akun+"' and x.kode_lokasi='"+kode_lokasi+"' and substring(x.periode,1,4)='"+tahun+"' ";
		filter2="";
		nama_report="server_report_saku2_siaga_rptAggBulanTrail";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	},
	doOpenKartu: function(kode_akun,kode_lokasi,tahun){
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.tahun=tahun;
		this.link="1";
		filter = "where a.kode_akun='"+kode_akun+"' and a.kode_lokasi='"+kode_lokasi+"' and substring(a.periode,1,4)='"+tahun+"' ";
		filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,4)+"/"+this.app._nikUser;
		nama_report="server_report_saku2_kopeg_sju_rptAggKpaAkun";
		this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
	},
	doOpenBukti: function(no_bukti,kode_lokasi,periode,modul){
		this.link="2";
		filter2=this.app._namaUser;
		if (modul=="PB")
		{
			filter = "where a.no_beban='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
			nama_report="server_report_saku2_siaga_rptBuktiBeban";
		}
		if (modul=="PANJAR")
		{
			filter = "where a.no_panjar='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
			nama_report="server_report_saku2_siaga_rptPjAju";
		}
		if (modul=="PJPTG")
		{
			filter = "where a.no_ptg='"+no_bukti+"' and a.kode_lokasi='"+kode_lokasi+"' ";
			nama_report="server_report_saku2_siaga_rptPjPtg";
		}
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
