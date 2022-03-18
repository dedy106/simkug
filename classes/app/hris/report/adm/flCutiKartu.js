window.app_hris_report_adm_flCutiKartu = function(owner)
{
	if (owner)
	{
		window.app_hris_report_adm_flCutiKartu.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_adm_flCutiKartu";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Cuti", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,722,240],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,720,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	var d=new Date();
	var month=new Array(12);
	month[0]="Januari";
	month[1]="Februari";
	month[2]="Maret";
	month[3]="April";
	month[4]="Mei";
	month[5]="Juni";
	month[6]="Juli";
	month[7]="Agustus";
	month[8]="September";
	month[9]="Oktober";
	month[10]="November";
	month[11]="Desember";
	var bulan=month[d.getMonth()];
	this.periode=this.dbLib.getPeriodeFromSQL("select max(a.periode) as periode from ( "+
											"select max(substring(periode,1,4)) as periode from gr_cuti where kode_lokasi='01'  "+
											"union "+
											"select max(substring(periode,1,4)) as periode from gr_cuti_d where kode_lokasi='01' "+
											")a where a.periode is not null");	
	if (this.app._userStatus=="A")
	{
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","All",""]);
	}
	else
	{
		this.sts_sdm=this.dbLib.getPeriodeFromSQL("select sts_sdm as periode from gr_karyawan where nik='"+this.app._userLog+"'");
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Status SDM","=",this.sts_sdm]);
	}
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Jenis Cuti","=","1"]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Bulan Berjalan","=",bulan]);
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_hris_report_adm_flCutiKartu.extend(window.childForm);
window.app_hris_report_adm_flCutiKartu.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 4)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama from gr_karyawan a "+this.filter,
													"select count(*) from gr_karyawan a "+this.filter,
													["a.nik","a.nama"],"and",["NIK","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jenis Cuti",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_cuti, nama from gr_status_cuti where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_cuti  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_cuti","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Status SDM",this.sg1, this.sg1.row, this.sg1.col,
															"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
															"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
															["sts_sdm","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123i","123i","123i","123i","123i","123","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[0,2,2,2,2,2,2,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","3","3","3","3","3","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,76,],[0,3,3,3,3,3,2,0]);
		}
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) as periode from gr_cuti where kode_lokasi='"+this.app._lokasi+"' order by substring(periode,1,4)",[this.sg1.columns.get(2).pickList]);
		}	
		if (row == 7)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				if (this.app._userStatus=="A")
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","All",""]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","All",""]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","All",""]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","All",""]);
				}
				else
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Lokasi Kerja","=",this.app._kodeLoker]);
					this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Direktorat","=",this.app._kodeDir]);
					this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Departemen","=",this.app._kodeDept]);
					this.gridLib.SGEditData(this.sg1,4,[0,1,2],["NIK","=",this.app._userLog]);
				}
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
				this.lokasi=this.app._namalokasi;
				var nama_cuti=this.dbLib.getPeriodeFromSQL("select nama as periode from gr_status_cuti where sts_cuti='"+this.sg1.getCell(2,6)+"'");
				var periode="";
				if (this.sg1.getCell(2,7)=="Januari"){
					periode=this.sg1.getCell(2,0)+"01";
				}
				if (this.sg1.getCell(2,7)=="Februari"){
					periode=this.sg1.getCell(2,0)+"02";
				}
				if (this.sg1.getCell(2,7)=="Maret"){
					periode=this.sg1.getCell(2,0)+"03";
				}
				if (this.sg1.getCell(2,7)=="April"){
					periode=this.sg1.getCell(2,0)+"04";
				}
				if (this.sg1.getCell(2,7)=="Mei"){
					periode=this.sg1.getCell(2,0)+"05";
				}
				if (this.sg1.getCell(2,7)=="Juni"){
					periode=this.sg1.getCell(2,0)+"06";
				}
				if (this.sg1.getCell(2,7)=="Juli"){
					periode=this.sg1.getCell(2,0)+"07";
				}
				if (this.sg1.getCell(2,7)=="Agustus"){
					periode=this.sg1.getCell(2,0)+"08";
				}
				if (this.sg1.getCell(2,7)=="September"){
					periode=this.sg1.getCell(2,0)+"09";
				}
				if (this.sg1.getCell(2,7)=="Oktober"){
					periode=this.sg1.getCell(2,0)+"10";
				}
				if (this.sg1.getCell(2,7)=="November"){
					periode=this.sg1.getCell(2,0)+"11";
				}
				if (this.sg1.getCell(2,7)=="Desember"){
					periode=this.sg1.getCell(2,0)+"12";
				}
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
						this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.nik",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
						this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
						
				this.filter2=this.sg1.getCell(2,0)+"/"+this.sg1.getCell(2,6)+"/"+nama_cuti+"/"+periode+"/"+this.sg1.getCell(2,7);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.nama_report = "server_report_hris_rptCutiKartu2";
				if (this.sg1.getCell(2,6)=="1")
				{
					this.nama_report = "server_report_hris_rptCutiKartu";
				}
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
				this.page = 1;
				this.allBtn = false;
			}
		}catch(e)
		{
			alert("[app_hris_report_adm_flCutiKartu]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);
				break;
				case "sqlToHtmlWithHeader":
					this.previewReport(result);
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN KARYAWAN <br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  //this.dbLib.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);		
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "pelamar.xls");
			downloadFile(file);
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	  }catch(e){
		alert(e);
	  }
	},
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.viewer.getContent();
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
	    if (col===1)
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
