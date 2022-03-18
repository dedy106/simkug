// JavaScript Document
window.app_saku_gl_report_flJurnal4 = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flJurnal4.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flJurnal4";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Jurnal Transaksi", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(200);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
			val.set(1, "All");
			val.set(2, "=");
			val.set(3, "Range");
			val.set(4, "Like");
			val.set(5, "<=");
			this.sg1.columns.get(1).setPicklist(val);
			
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			
			this.sg1.setRowCount(9);
		

		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4,5,6,7),new  Array("1234","123","123","123","123","123","3","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4,5,6,7),new  Array(0,2,2,2,2,2,2,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.lokasi=lokasi;
	this.getPeriode="select distinct periode from ju_m where kode_lokasi ='"+this.lokasi+"' order by periode desc ";
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PP","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode RKM","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("Status Posting","All"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Format Jurnal","=","Bukti Jurnal"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Bukti","All"));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Tanggal","All"));
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
window.app_saku_gl_report_flJurnal4.extend(window.portalui_childForm);
window.app_saku_gl_report_flJurnal4.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from masakun a  where a.block= '0' "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+" order by a.kode_akun",
													  "select count(a.kode_akun) from masakun a  where a.block= '0'"+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["kode_akun","nama"],"and",["Kode Akun","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama from pp "+
													   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  "select count(kode_pp) from pp "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_pp","nama"),"where");
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data RKM",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_drk, nama from drk "+
													   this.filterRep.filterStr("tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0).substr(0,4),this.sg1.getCell(3,0).substr(0,4)," where ")+
													   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  "select count(kode_drk) from drk "+
													  this.filterRep.filterStr("tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0).substr(0,4),this.sg1.getCell(3,0).substr(0,4)," where ")+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  new Array("kode_drk","nama"),"where",new Array("kode","nama"),"where");
		}
		if (row == 7)
		{
			
			var filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("b.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("b.kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("b.kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						this.filterRep.filterStr("a.posted",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
			
			var sql1="select a.no_ju,a.no_dokumen,b.keterangan from ju_m a "+
					 "inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi "+filter+" group by a.no_ju";
			var sql2="select count(a.no_ju) from ju_m a "+
					 "inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi "+filter;
			this.filterRep.ListDataSGFilter(this, "Data Jurnal",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,
			                                new Array("a.no_ju","a.no_dokumen","a.keterangan"),"and",new Array("No Bukti","No Dokumen","Keterangan"),"and");
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array("123","3","123","123","123","13","3","123","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array(2,0,2,2,2,0,0,2,1));
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array("123","3","123","123","123","13","3","123","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8),new  Array(3,0,2,2,2,0,0,2,1));
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from ju_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc ",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("T","F"));
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Daftar Jurnal","Bukti Jurnal"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi",tanda,lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PP","All",""));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode RKM","All",""));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("Status Posting","All"));
				this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Format Jurnal","=","Bukti Jurnal"));
				this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Bukti","All"));
				this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Tanggal","All"));
			}else{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);
				this.dbname = this.app._dbEng;
				this.lokasi=this.app._namalokasi;
				this.filter=this.filterRep.filterStr("b.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
							this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("b.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.posted",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.no_ju",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("b.tanggal",this.sg1.getCell(1,8),this.sg1.getCellDateValue(2,8),this.sg1.getCellDateValue(3,8),"and");
				this.filter2 = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
							this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.posted",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.no_ju",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and");
							this.filterRep.filterStr("a.tanggal",this.sg1.getCell(1,8),this.sg1.getCellDateValue(2,8),this.sg1.getCellDateValue(3,8),"and");

				if (this.sg1.getCell(2,6) === "Daftar Jurnal")
					this.nama_report="server_report_gl_rptJurnal3";
				else this.nama_report="server_report_gl_rptBuktiJurnalG";
				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
				this.page = 1;
				this.allBtn = false;
			}
		}catch(e){
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
		this.report.preview(this.nama_report,this.filter, page, this.pager,this.showFilter, this.lokasi,this.filter2);	
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	    switch(sender.getName()){
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.report.preview(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi, this.filter2);       
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});