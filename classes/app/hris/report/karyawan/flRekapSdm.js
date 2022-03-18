window.app_hris_report_karyawan_flRekapSdm = function(owner)
{
	if (owner)
	{
		window.app_hris_report_karyawan_flRekapSdm.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_karyawan_flRekapSdm";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekapitulasi SDM", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(year(tgl_masuk)) as periode from gr_karyawan ");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Level","=","4"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_hris_report_karyawan_flRekapSdm.extend(window.childForm);
window.app_hris_report_karyawan_flRekapSdm.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			
				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["3","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[0,0,0]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct (year(tgl_masuk)) as tahun from gr_karyawan where kode_lokasi='"+this.app._lokasi+"' order by tahun desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as periode "+
										"from gr_karyawan where kode_lokasi='"+this.app._lokasi+"' order by periode desc ",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("1","2","3","4","5"));
		}
	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Tahun","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Level","=","4"]);				
			}else if (sender == this.app._mainForm.bBack){
				//self.history.go(-1)
			
				if (this.link=="")
				{
					this.p1.setVisible(true);
					this.app._mainForm.pButton.setVisible(true);
					this.viewer.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(false);
				}
				if (this.link=="1")
				{
					this.nama_report = "server_report_hris_rptRekapLoker";
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.link="";
				}
				if (this.link=="2")
				{
					this.doOpenDoc(this.kode_loker,this.nama_loker,this.jenis);
				}
				
				
			}else{
				this.no=1;
				this.link="";
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				
				if (this.sg1.getCell(1,1)=="All")
				{
					this.filter2 =this.app._nikUser+"/"+this.sg1.getCell(2,2)+"/"+this.sg1.getCell(2,0);
					var sql="call sp_gr_loker ('"+this.app._lokasi+"','"+this.app._nikUser+"','"+this.sg1.getCell(2,0)+"')";
					this.nama_report = "server_report_hris_rptRekapLoker";
				}
				else
				{
					this.nama_report = "server_report_hris_rptRekapLokerPeriode";
					this.filter2 =this.app._nikUser+"/"+this.sg1.getCell(2,2)+"/"+this.sg1.getCell(2,1);
					var sql="call sp_gr_loker_periode ('"+this.app._lokasi+"','"+this.app._nikUser+"','"+this.sg1.getCell(2,1)+"')";
				}
				
				this.dbLib.execQuerySync(sql);
				
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
				this.page = 1;
				this.allBtn = false;
				
			}
	    }catch(e){
			systemAPI.alert("[app_hris_report_karyawan_flRekapSdm]::mainButtonClick:"+e);
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
	doOpenDoc: function(kode_loker,nama_loker,jenis,periode){
		this.kode_loker=kode_loker;
		this.nama_loker=nama_loker;
		this.jenis=jenis;
		this.periode=periode;
		this.link="1";
		if (jenis=="status")
		{
			this.filter = "where k.kode_klploker='"+kode_loker+"'/"+nama_loker+"/"+periode ;
		}
	
		this.nama_report="server_report_hris_rptkaryawanLoker";
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	
	doOpenDoc2: function(nik){
		this.link="2";
		this.nik=nik;
		this.filter = "where a.nik='"+nik+"'" ;
		this.nama_report="server_report_hris_rptCvSk";
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
