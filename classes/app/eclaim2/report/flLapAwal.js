// JavaScript Document
window.app_eclaim2_report_flLapAwal = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_report_flLapAwal.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim2_report_flLapAwal";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Rekapitulasi Klaim",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");		
		this.p1 = new panel(this,{bound:[10,10,702,287],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,280],colCount:4,
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:12});
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
	this.tanda="=";	
	var lokasi=this.app._lokasi;
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from tlk_klaim");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Klaim","All"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Alamat","All"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas Telkom","All"));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Klaim","All"));
	this.gridLib.SGEditData(this.sg1,9,new Array(0,1), new Array("No Polis","All"));
	this.gridLib.SGEditData(this.sg1,10,new Array(0,1), new Array("Tanggal DOL","All"));
	this.gridLib.SGEditData(this.sg1,11,new Array(0,1,2), new Array("Jenis Laporan","=","Short"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	
	this.userLogin="";
	if (this.app._userStatus=='U')
	{
		this.userLogin = " and a.nik_buat='"+this.app._userLog+"'"; 
	}
};
window.app_eclaim2_report_flLapAwal.extend(window.portalui_childForm);
window.app_eclaim2_report_flLapAwal.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_sebab,nama from tlk_sebab where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_sebab) from tlk_sebab  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_obyek,nama from tlk_obyek where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_obyek) from tlk_obyek  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Kejadian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok,nama from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_lok) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_lok","nama"),"and",new Array("kode","nama"));
		}
		if (row == 9)
		{
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_polis,keterangan from tlk_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(no_polis) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("no_polis","keterangan"),"and",new Array("No Polis","Keterangan"));
		}
		if (row == 5)
		{
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.filterRep.ListDataSGFilter(this, "Data Berkas",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.no_klaim,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal from tlk_klaim a "+this.filter,
													  "select count(a.no_klaim) from tlk_klaim a "+this.filter,
													  new Array("a.no_klaim","a.no_dokumen","a.tanggal"),"and",new Array("no berkas","no dokumen","tanggal"));
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array("123","123","123","123","123","123","13","13","123","123","123","2"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array(0,0,2,2,2,2,4,4,4,2,1,0));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 11)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Short","Long"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
						this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
						this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
						this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
						this.filterRep.filterStr("a.no_polis",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,9),"and")+
						" and a.status='1' ";
			if (this.sg1.getCell(1,6)=="=") 
			{
				this.filter=this.filter+" and a.alamat like '%"+this.sg1.getCell(2,6)+"%'";
			}
			if (this.sg1.getCell(1,7)=="=") 
			{
				this.filter=this.filter+" and a.no_dokumen like '%"+this.sg1.getCell(2,7)+"%'";
			}
			if (this.sg1.getCell(1,8)=="=") 
			{
				this.filter=this.filter+" and a.nilai ="+this.sg1.getCell(2,8);
			}
			if (this.sg1.getCell(1,8)=="Range") 
			{
				this.filter=this.filter+" and a.nilai between "+this.sg1.getCell(2,8)+" and "+this.sg1.getCell(3,8);
			}
			var user_lok="";
			if (this.app._userStatus=="U")
			{
				user_lok=" and a.kode_lok='"+this.app._kodeLok+"'";
			}
			if (this.sg1.getCell(1,10)=="=") 
			{
				this.filter=this.filter+" and a.tanggal='"+this.sg1.getCellDateValue(2,10)+"' ";
			}
			if (this.sg1.getCell(1,10)=="Range") 
			{
				this.filter=this.filter+" and a.tanggal between '"+this.sg1.getCellDateValue(2,10)+"' and '"+this.sg1.getCellDateValue(3,10)+"' ";
			}
			this.nama_report="server_report_eclaim2_rptLapAwal";
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
