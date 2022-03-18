// JavaScript Document
window.app_saku_gl_report_flRasioKeu = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flRasioKeu.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flRasioKeu";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Struktur Rasio Keuangan", 2);

		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(150);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
		
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
			
			this.sg1.setRowCount(5);
			this.sg1.setCell(0,0,"Kode Lokasi");
			this.sg1.setCell(0,1,"Kode FS");
			this.sg1.setCell(0,2,"Kode Neraca");
			this.sg1.setCell(0,3,"Modul");
			this.sg1.setCell(0,4,"Jenis Laporan");
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		
//		this.viewer.onSelectedsystem.set(this, "doSelectedPage");
//		this.viewer.onCloseClick.set(this, "doCloseReportClick");
//		this.viewer.onAllsystem.set(this, "doAllPageClick");

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4),new  Array("3","123","123","03","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1,2,3,4),new  Array(2,2,2,0,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode FS","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Neraca","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Modul","=","Aktiva"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis Laporan","=","COA"));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku_gl_report_flRasioKeu.extend(window.portalui_childForm);
window.app_saku_gl_report_flRasioKeu.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi ",
													  "select count(*) from lokasi ",
													  new Array("kode_lokasi","nama"),"where",new Array("Kode Lokasi","Nama"));
		}
		
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_fs,kode_lokasi,nama from fs where kode_lokasi like '%"+this.sg1.getCell(2,0)+"'order by kode_fs ",
												  "select count(kode_fs) from fs where kode_lokasi like '%"+this.sg1.getCell(2,0)+"'order by kode_fs ",
											new Array("kode_fs","nama"),"and",new Array("Kode FS","Kode Lokasi","Nama FS"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Neraca",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_neraca,nama from neraca "+
												  this.filterRep.filterStr("kode_fs",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+
												  "order by kode_fs",
												  "select count(kode_neraca) from neraca "+
												  this.filterRep.filterStr("kode_fs",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where "),
											new Array("kode_neraca","nama"),"and");
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1,row,new Array(0,1,2,3,4),new  Array("3","123","123","03","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,new Array(0,1,2,3,4),new  Array(2,2,2,0,0));
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Aktiva","Pasiva","LabaRugi"));
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("COA","Relasi Akun"));
		}	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode FS","All",""));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Neraca","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Modul","=","Aktiva"));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis Laporan","=","COA"));
			}
			else
			{
				this.p1.setVisible(false);
	    		this.viewer.prepare();
	    		this.viewer.setVisible(true);
	    		this.app._mainForm.pButton.setVisible(false);
	    		this.app._mainForm.reportNavigator.setVisible(true);
	    		if (this.sg1.getCell(2,4)=="COA")
				{
					this.filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							 this.filterRep.filterStr("kode_fs",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							 this.filterRep.filterStr("kode_neraca",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							 this.filterRep.filterStr("modul",this.sg1.getCell(1,3),this.sg1.getCell(2,3).charAt(0),this.sg1.getCell(3,3).charAt(0),"and");
	    			this.viewer.setTotalPage(this.report.getTotalPage("server_report_gl_rptRasioKeu",this.filter,this.pager,this.sg1.getCell(2,4)));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.showFilter = this.filterRep.showFilter(this.sg1);
					this.report.preview("server_report_gl_rptRasioKeu",this.filter, 1, this.pager, this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4));	
	    		}
				else
				{
					this.filter =this.filterRep.filterStr("n.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
								this.filterRep.filterStr("n.kode_fs",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
								this.filterRep.filterStr("n.kode_neraca",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
								this.filterRep.filterStr("n.modul",this.sg1.getCell(1,3),this.sg1.getCell(2,3).charAt(0),this.sg1.getCell(3,3).charAt(0),"and");
	    			this.viewer.setTotalPage(this.report.getTotalPage("server_report_gl_rptRasioKeu",this.filter,this.pager,this.sg1.getCell(2,4)));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					var showFilter = this.filterRep.showFilter(this.sg1);
					this.report.preview("server_report_gl_rptRasioKeu",this.filter, 1, this.pager, this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4));
				}
	    		this.page = 1;
				this.allBtn = false;
	    		
			}     			
		}catch(e){
			systemApi.alert("[app_saku_gl_report_flRasioKeu]::mainButtonClick:"+e);
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
		this.report.preview("server_report_gl_rptRasioKeu",this.filter, page, this.pager, this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4));
		this.page=page;		
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.report.preview("server_report_gl_rptRasioKeu",this.filter, 1, this.viewer.getTotalPage() * this.pager, this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4));
			this.page=1;		
			this.allBtn = true;	
	      break;
	    case "pdfBtn" :      
	      this.viewer.useIframe(this.report.createPdf("server_report_gl_rptRasioKeu",this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4)));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls("server_report_gl_rptRasioKeu",this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4)));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader("server_report_gl_rptRasioKeu",this.filter, (this.allBtn ? 1: this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.sg1.getCell(2,4)));
			break;
		case "PrintBtn" :        
			this.viewer.useIframe(this.report.previewWithHeader("server_report_gl_rptRasioKeu",this.filter, (this.allBtn ? 1 : this.page),(this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi,this.sg1.getCell(2,4)));
	      try
	      {
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
	      break;/*kirim mail*/
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
					var subject = "Laporan Struktur Rasio Keuangan "+d.toLocaleString();
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
		this.viewer.setTotalPage(this.report.getTotalPage("server_report_gl_rptRasioKeu",this.filter,this.pager,this.sg1.getCell(2,4)));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});