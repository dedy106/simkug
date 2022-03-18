// JavaScript Document
window.app_saku_gl_report_flLR = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flLR.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flLR";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Laba Rugi", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(700);
		this.p1.setLeft(10);
		this.p1.setTop(5);
		this.p1.setHeight(200);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(680);
		this.sg1.setHeight(160);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		this.sg1.setColTitle(new Array("Filter","Tipe","From","To"));
		this.sg1.setColWidth(new Array(3,2,1,0), 
							 new Array(150,150,80,250));	
		this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		val.set(1, "All");
		val.set(2, "=");
		val.set(3, "Range");
		val.set(4, "Like");
		val.set(5, "<=");
		this.sg1.columns.get(1).setPicklist(val);
			
		this.sg1.setRowCount(5);
		this.sg1.setCell(0,0,"Periode");
		this.sg1.setCell(0,1,"Lokasi");
		this.sg1.setCell(0,2,"Kode FS");
		this.sg1.setCell(0,3,"Level");
		this.sg1.setCell(0,4,"Bentuk Laporan");
		
		
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array("1234","123","123","3","3","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array(0,2,2,0,0,0,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode FS","=",this.app._kodeFs));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Level","=","1"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Bentuk Laporan","=","Summary"));
	
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
	this.app._mainForm.reportNavigator.cb.hide();
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku_gl_report_flLR.extend(window.portalui_childForm);
window.app_saku_gl_report_flLR.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0'",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_fs,nama from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_fs",
													  "select count(kode_fs) from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_fs","nama"),"where");
		}
	},
	doSelectCell: function(sender, col, row){
		this.sg1.columns.get(2).setReadOnly(false);
		if (this.userStatus=="A")
		{					
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("123","123","123","3","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(2,0,2,0,0));
		}
		else
		{
			this.sg1.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("3","3","123","3","3"));			
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(3,0,2,0,0));
		}
		if (row == 1)
		{
			if (this.sg1.getCell(1,0) == "All")
			{
				this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
			}
			else
			{
				this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
			}
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("1","2","3","4","5"));
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Laporan","Audit Trail"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.hide();			
			this.viewer.show();
			this.viewer.prepare();
			this.viewer.showLoading();			
			this.nik_user=this.app._nikUser;
			this.lokasi=this.app._namalokasi;
			this.filter2 = this.nik_user+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,4)+"/"+this.sg1.getCell(2,3);
			var in_lap="S";
			if (this.sg1.getCell(2,0) == this.app._kodeLokasiKonsol)
			{
				this.kode_lokasi=this.app._kodeLokasiKonsol;
				this.kode_lokasi1=this.app._kodeLokasi1;
				this.kode_lokasi2=this.app._kodeLokasi2;
			}
			else
			{
				this.kode_lokasi=this.sg1.getCell(2,0);
				this.kode_lokasi1=this.sg1.getCell(2,0);
				this.kode_lokasi2=this.sg1.getCell(2,0);
			}	
			sql="call sp_neraca ('"+this.sg1.getCell(2,2)+"','L','"+in_lap+"',"+this.sg1.getCell(2,3)+",'"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			this.nama_report="server_report_gl_rptLR";
			this.showFilter = this.filterRep.showFilter(this.sg1);			
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
				
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
			this.viewer.hideLoading();
		}catch(e){
			system.hideProgress();
			this.viewer.hideLoading();
			systemAPI.alert("[flLR]::mainButtonClick:"+e);
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
	},
	doCloseReportClick: function(sender){	
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);       
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2));
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
					var subject = "Laporan Laba Rugi "+d.toLocaleString();
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
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});