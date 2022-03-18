window.app_budget_report_flAggRkap = function(owner)
{
	if (owner)
	{
		window.app_budget_report_flAggRkap.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_report_flAggRkap";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi RKAP", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,220],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,197],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:9});
		
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	
	uses("util_standar;util_gridLib");
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	if (this.app._lokKonsol==this.app._lokasi)
	{
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d ");
		this.lok1=this.dbLib.getPeriodeFromSQL("select min(kode_lokasi) as periode from lokasi where flag_konsol<>'1'");
		this.lok2=this.dbLib.getPeriodeFromSQL("select max(kode_lokasi) as periode from lokasi where flag_konsol<>'1'");
		this.bid1=this.dbLib.getPeriodeFromSQL("select min(kode_bidang) as periode from agg_bidang");
		this.bid2=this.dbLib.getPeriodeFromSQL("select max(kode_bidang) as periode from agg_bidang");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2,3), new Array("Kode Lokasi","Range",this.lok1,this.lok2));
		this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2,3), new Array("Kode Bidang ","Range",this.bid1,this.bid2));
	}
	else
	{
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d where kode_lokasi='"+this.app._lokasi+"'");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2,3), new Array("Kode Bidang ","Range",this.app._kodeBidang,this.app._kodeBidang));
	}
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi ","=","FS1"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","Summary"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Versi Anggaran ","=","Original"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Detail Akun","=","Akun"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Status program ","=","All"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Bentuk Laporan ","=","Laporan 1"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.doSelectCell(this.sg1,2,4);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
	
};
window.app_budget_report_flAggRkap.extend(window.portalui_childForm);
window.app_budget_report_flAggRkap.prototype.doEllipseClick= function(sender, col, row)
{
	
	if (row == 0)
	{
		if (this.app._lokKonsol==this.app._lokasi)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi where flag_konsol<>'1' ",
												  "select count(kode_lokasi) from lokasi where flag_konsol<>'1' ",
												  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
	}
	if (row == 2)
	{
		this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_fs,nama from agg_fs "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_fs",
												  "select count(kode_fs) from agg_fs "+
												  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
												  new Array("kode_fs","nama"),"where");
	}
	if (row == 8)
	{
		this.filterRep.ListDataSGFilter(this, "Daftar Bidang",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_bidang, nama from agg_bidang ",
												  "select count(kode_bidang) from agg_bidang ",
												  ["kode_bidang","nama"],"where",["Kode","Nama"]);
	}
};
window.app_budget_report_flAggRkap.prototype.doSelectCell = function(sender, col, row)
{
	if (this.app._userStatus=="A" || this.app._lokKonsol==this.app._lokasi)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8],["2","3","13","3","3","3","3","3","2"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8],[2,0,2,0,0,0,0,0,2]);
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8],["3","3","13","3","3","3","3","3","2"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,8,8],[3,0,2,0,0,0,0,0,2]);
	}
	if (row == 1)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct tahun from agg_d where kode_lokasi='"+this.app._lokasi+"' order by tahun",[this.sg1.columns.get(2).pickList]);
	}
	if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
		}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Original","Evaluasi"));
	}
	if (row == 5)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Akun","Akun Lokasi","Akun Bidang","Akun DRK","Akun RKA"));
	}
	if (row == 6)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("All","Baru","Lama"));
	}
	if (row == 7)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Laporan 1","Laporan 2","Laporan 3"));
	}
	
};
window.app_budget_report_flAggRkap.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi ","=","FS1"));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","Summary"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Versi Anggaran ","=","Original"));		
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Detail Akun","=","Akun"));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Status program ","=","All"));
			this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Bentuk Laporan ","=","All"));
		}
		else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			this.lokasi=this.app._namalokasi;
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			if (this.sg1.getCell(2,4)=='Original')
			{
				this.ver ="0";
			}
			else
			{
				this.ver = "1";
			}
				
			if (this.app._lokasi== this.app._kodeLokasiKonsol)
			{
				this.kode_lokasi=this.app._kodeLokasiKonsol;
				this.kode_lokasi1=this.sg1.getCell(2,0);
				this.kode_lokasi2=this.sg1.getCell(3,0);
			}
			else
			{
				this.kode_lokasi=this.sg1.getCell(2,0);
				this.kode_lokasi1=this.sg1.getCell(2,0);
				this.kode_lokasi2=this.sg1.getCell(2,0);
			}	
			this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,4)+"/"+this.ver+"/"+this.kode_lokasi1+"/"+this.kode_lokasi2+"/"+this.sg1.getCell(2,5)+"/"+this.sg1.getCell(2,6)+"/"+this.sg1.getCell(2,7)+"/"+this.sg1.getCell(2,8)+"/"+this.sg1.getCell(3,8)+"/"+this.sg1.getCell(2,2);
			this.showFilter = this.filterRep.showFilter(this.sg1);
					
			if (this.sg1.getCell(2,6)=="Baru")
			{
				sql="call sp_agg_rkap_program ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','T','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,8)+"','"+this.sg1.getCell(3,8)+"','"+this.app._nikUser+"')";
			}
			if (this.sg1.getCell(2,6)=="Lama")
			{
				sql="call sp_agg_rkap_program ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','E','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,8)+"','"+this.sg1.getCell(3,8)+"','"+this.app._nikUser+"')";
			}
			if (this.sg1.getCell(2,6)=="All")
			{
				sql="call sp_agg_rkap ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,8)+"','"+this.sg1.getCell(3,8)+"','"+this.app._nikUser+"')";
			}
			this.nama_report = "server_report_budget_rptRkap";
			if (this.sg1.getCell(2,7)=="Laporan 2")
			{
				sql="call sp_agg_rkap_total ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,8)+"','"+this.sg1.getCell(3,8)+"','"+this.app._nikUser+"')";
				this.nama_report = "server_report_budget_rptRkap2";
			}
			if (this.sg1.getCell(2,7)=="Laporan 3")
			{
				sql="call sp_agg_rkap_total_inv ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,8)+"','"+this.sg1.getCell(3,8)+"','"+this.app._nikUser+"')";
				this.nama_report = "server_report_budget_rptRkap3";
			}
			
			this.dbLib.execQuerySync(sql);	
			
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
		}
    }catch(e)
	{
		alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
	}
};
window.app_budget_report_flAggRkap.prototype.doRequestReady = function(sender, methodName, result)
{
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
};
window.app_budget_report_flAggRkap.prototype.getStringHeader = function(){
	return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
			"<html xmlns='http://www.w3.org/1999/xhtml'>"+
			"<head>"+
			"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
			"<title>Preview</title>"+
			"</head>"+
			"<body>";
};/*kirim mail*/
window.app_budget_report_flAggRkap.prototype.doConfirmClick = function(sender){
	try{
		if (sender === sender.owner.bConfirm){
			var to = sender.owner.getEmail();
			if (to !== ""){
				sender.owner.free();
				var d = new Date();
				var subject = "Laporan Rekap Progres Klaim "+d.toLocaleString();
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
};
window.app_budget_report_flAggRkap.prototype.doSelectedPage = function(sender, page)
{
	this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
	this.page = page;
	this.allBtn = false;
};
window.app_budget_report_flAggRkap.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Laporan Biaya Pengobatan<br>";			
	var d = new Date();
	html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_budget_report_flAggRkap.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
		this.page = 1;
		this.allBtn = true;
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
	    break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("PosisiSpp");				
      this.viewer.useIframe(upDownHtml(html));
      break;/*kirim mail*/
	case "MailBtn" :
		sender.owner = new portalui_ConfirmMail(this);
		sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
		sender.owner.setCaption(sender.owner.title);
		sender.owner.setBorder(3);
	break;
    case "xlsBtn" :	
		var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("PosisiSpp");				
		this.viewer.useIframe(upDownHtml(html));				
      break; 	  
	case "PreviewBtn" :      		 
		var win = window.open("");
		win.document.write(loadCSS("server_util_laporan"));
		win.document.write(this.allHtml);
		win.document.close();
		break;
	case "PrintBtn" :  
      try
      {        
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);
		this.viewer.enabledIframe();	
        var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));
		winfram.document.write(this.allHtml);
		winfram.document.close();
		window.frames[this.viewer.getFullId() +"_iframe"].focus();
	    window.frames[this.viewer.getFullId() +"_iframe"].print();
      }catch(e)
      {alert(e);}      
      break;   
    case "create" :    
    case "edit"   :
    case "del" 	  :
    case "graph"  :
      break;   
    default :
        this.viewer.setVisible(false);
      	this.p1.setVisible(true);
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;  
  }
};
window.app_budget_report_flAggRkap.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
     if (this.sg1.getCell(1,row)=="All")
	 {
		this.sg1.setCell(2,row,"");
		this.sg1.setCell(3,row,"");
	 }
	} 
};
window.app_budget_report_flAggRkap.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};