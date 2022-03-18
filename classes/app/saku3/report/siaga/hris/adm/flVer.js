window.app_saku3_report_siaga_hris_adm_flVer = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_adm_flVer.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_hris_adm_flVer";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
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
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Jabatan","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("NIK","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("No Verifikasi","All",""));
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.doSelectCell(this.sg1,2,3);
};
window.app_saku3_report_siaga_hris_adm_flVer.extend(window.childForm);
window.app_saku3_report_siaga_hris_adm_flVer.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0'",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}		


			if (row == 1)
			{
				filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_jab, nama from gr_jab "+filter,
												"select count(*) from gr_jab "+filter,
												new Array("kode_jab","nama"),"where",new Array("kode","nama"));
			}			
			
			if (row ==2)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filterRep.ListDataSGFilter(this, "Data karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama from gr_karyawan a "+filter,
													"select count(*) from gr_karyawan a "+filter,
													new Array("a.nik","a.nama"),"and",new Array("NIK","Nama"));
			}
				if (row ==3)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("b.nik",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filterRep.ListDataSGFilter(this, "Data Ver",this.sg1, this.sg1.row, this.sg1.col,
											"select a.no_ver, a.keterangan from gr_ver_m a "+
											"inner join gr_karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+filter,
											"select count(a.no_ver) from gr_ver_m a "+
											"inner join gr_karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+filter,
				new Array("a.no_ver","a.keterangan"),"and",new Array("Surat","Keterangan"));
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","123","123","123","123"
		]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,2,2]);	
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Bukti","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Bentuk Laporan","=","TAK Kirim"));
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
		    	this.filter = this.filterRep.filterStr("b.kode_jab",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							this.filterRep.filterStr("a.nik_user",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_ver",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
							
				this.filter2 = this.sg1.getCell(2,1)+"/";
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				
				this.nama_report = "server_report_saku3_siaga_hris_rptVer";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
				this.page = 1;
				this.allBtn = false;
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku3_report_siaga_hris_adm_flVer]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					if (this.sg1.getCell(2,3)!="Detail")
					{
						this.viewer.preview(result);
					}
					else
					{
						this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
						this.viewer.preview(result);			
						this.viewer.hideLoading();
					}
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
	    if (this.sg1.getCell(2,3)!="Detail")
		{
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader);
			this.previewReport(dthtml);			
			this.page=page;
		}
		else
		{
		    this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = page;
			this.allBtn = false;
		}
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm.toUpperCase()+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
		  if (this.sg1.getCell(2,3)!="Detail")
          {		  
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
			this.previewReport(dthtml);
	      }
		  else
		  {
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));

		  }
		  break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "karyawan.xls");
			downloadFile(file);
	      break;
		case "PreviewBtn" :      
			if (this.sg1.getCell(2,3)!="Detail")
            {	
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.allHtml);
				win.document.close();
			}
			else
			{
				window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			}
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
