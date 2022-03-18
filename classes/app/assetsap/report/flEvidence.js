/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 29 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_report_flEvidence = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flEvidence.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flEvidence";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Evidence", 2);
		
		this.p1 = new portalui_panel(this,{bound:[10,10,720,250], caption:"Filter", border:3});		
		
		uses("saiGrid;reportViewer;server_report_simpleReport;util_filterRep;util_gridLib;util_standar;server_util_mail;portalui_ConfirmMail");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,20,700,200],colCount:4, colTitle:"Filter, Type, From, To",
			colWidth:[[3,2,1,0],[150,150,80,250]],colReadOnly:[true, [0],[]], buttonStyle:[[1],[bsAuto]],
			picklist:[[1],[new portalui_arrayMap({items:["All","=","Range","Like","<="]})]], defaultRow:2
		});			
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height], visible:false});		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);				
		this.report = new server_report_simpleReport();
	}	
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["1234","123","123","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,[0,1,2,3,4],[2,2,2,0,0]);
		
	this.gridLib = new util_gridLib();
	
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;		
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Bisnis Area","=",this.app._kodeLokfa));	
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Evidence","All",""));	
	this.doSelectCell(this.sg1,2,1);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = 1;
	/*kirim mail*/	
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_assetsap_report_flEvidence.extend(window.portalui_childForm);
window.app_assetsap_report_flEvidence.implement({
	doEllipseClick: function(sender, col, row){
		
		if (row == 0 )
		{
			this.filterRep.ListDataSGFilter(this, "Lokasi/Netre",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok, nama from amu_lokasi ",
													  "select count(kode_lok) from amu_lokasi",
													  ["kode_lok","nama"],"and",["Kode","Nama"]);
		}
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Evidence",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_evd from amu_evd ",
													  "select count(no_evd) from amu_evd",
													  ["no_evd"],"and",["Evidence"]);
		}
			
		
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["1234","123","123","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,0,0]);			
	},
	mainButtonClick: function(sender){
		try{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.nik_user=this.app._nikUser;
			this.lokasi=this.app._namalokasi;
			this.dbname = this.app._dbEng;			
		    var tampilNol = this.sg1.getCell(2,5).toLowerCase() == "ya" ? "1" : "";		    
		    this.filter = this.filterRep.filterStr("a.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
		          this.filterRep.filterStr("a.no_evd",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				 				
			this.filter2 = this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,2);
			this.kd_akun = "";
			this.pageHtml = new portalui_arrayMap();						
			
			this.nama_report = "server_report_amu_rptEvidence";			
			//this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
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
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1. Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
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
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-1,25,1);
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
