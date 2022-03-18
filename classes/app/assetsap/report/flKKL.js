/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_report_flKKL = function(owner)
{
	try{
	if (owner)
	{
		window.app_assetsap_report_flKKL.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flKKL";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan KKIL", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib;server_report_simpleReport;app_budget_svrProcess");
		
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.report2 = new server_report_report();
	}	
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4),new  Array("123","123","123","13","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4),new  Array(0,0,0,2,0));
		
	this.gridLib = new util_gridLib();
		
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
		
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Bisnis Area","=",this.app._kodeLokfa));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Jenis Asset","=","TB"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Inventarisasi","All",""));		
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("No Aset","All",""));		
	this.doSelectCell(this.sg1,2,3);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = 1;
	/*kirim mail*/
	uses("server_util_mail;ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.svr = new app_budget_svrProcess();
	}catch(e){
		alert(e);
	}
};
window.app_assetsap_report_flKKL.extend(window.childForm);
window.app_assetsap_report_flKKL.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Bisnis Area",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_lokfa) from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"'",
													  ["kode_lokfa","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Inventarisasi",this.sg1, this.sg1.row, this.sg1.col,
													  " select * from (select distinct a.no_inv, b.no_gabung, c.nama from amu_kkl_m a "+
													  " inner join amu_kkl_d b on b.no_inv = a.no_inv "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +") a",
													  " select count(*) from (select distinct a.no_inv, b.no_gabung, c.nama from amu_kkl_m a "+
													  " inner join amu_kkl_d b on b.no_inv = a.no_inv "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +") a ",
													  ["no_inv","no_gabung","nama"],"where",["No Inventarisasi","No Gabung(No FA + SN)","Deskripsi"]);
		}			
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Aset",this.sg1, this.sg1.row, this.sg1.col,
													  " select * from (select distinct b.no_gabung, c.nama from amu_kkl_m a "+
													  " inner join amu_kkl_d b on b.no_inv = a.no_inv "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.no_inv",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +") a ",
													  " select count(*) from (select distinct b.no_gabung, c.nama from amu_kkl_m a "+
													  " inner join amu_kkl_d b on b.no_inv = a.no_inv "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.no_inv",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +") a ",
													  ["no_gabung","nama"],"where",["No Gabung(No FA + SN)","Deskripsi"]);
		}			
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["1234","2","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,0]);
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("TB","NTB"));
		}
		
			
	},
	mainButtonClick: function(sender){
		try{
			this.app._mainForm.reportNavigator.serverDownload = true;
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.nik_user=this.app._nikUser;
			this.lokasi=this.app._namalokasi;
			this.dbname = this.app._dbEng;					    
		    this.filter =  this.filterRep.filterStr("b.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
				  this.filterRep.filterStr("aa.no_inv",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
				  this.filterRep.filterStr("b.no_gabung",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
				  this.filterRep.filterStr("aa.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				 				
			this.filter2 = this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,2);
			this.kd_akun = "";
			this.pageHtml = new arrayMap();						
			this.nama_report = "server_report_amu_rptKKIL";			
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.page = 1;
			this.allBtn = false;	
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));

		}catch(e){
			systemAPI.alert("[flBB]::mainButtonClick:"+e);
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
		}else if (sender === this.dbLib){
		    try{                 
   			}catch(e){
   			  alert(e);
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
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page = page;
		this.allBtn = false;
		
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
		case "xlsBtn" :				
			var file = this.report2.createExcel(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2);
			downloadFile(file);
		break;
		case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "MailBtn" :
			sender.owner = new ConfirmMail(this);
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
					var subject = "Laporan Buku Besar "+d.toLocaleString();
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
		this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
		this.page = 1;
		this.allBtn = false;
		this.doSelectedPage(undefined, 1);
	}	
});
