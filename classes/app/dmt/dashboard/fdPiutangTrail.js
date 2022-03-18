window.app_dmt_dashboard_fdPiutangTrail = function(owner)
{
	if (owner)
	{
		window.app_dmt_dashboard_fdPiutangTrail.prototype.parent.constructor.call(this,owner);
		this.className  = "app_dmt_dashboard_fdPiutangTrail";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Saldo Piutang","Kartu Piutang","Invoice","Jurnal"]});
		this.bPrint = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.periode=this.dbLib.getPeriodeFromSQL("select distinct periode from dmt_ar_m where kode_lokasi ='"+this.app._lokasi+"'");
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
				
		var cnv = this.pc1.childPage[1].getClientCanvas();
		this.pc1.childPage[1].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		var cnv2 = this.pc1.childPage[2].getClientCanvas();
		this.pc1.childPage[2].addStyle("background:#ffffff");
		this.docViewer2 = document.createElement("iframe");
		this.docViewer2.frameBorder = 0;
		this.docViewer2.id = this.getFullId()+"_viewer";
		this.docViewer2.style.cssText = "width:100%;height:100%";		
		cnv2.appendChild(this.docViewer2);
		
		var cnv3 = this.pc1.childPage[3].getClientCanvas();
		this.pc1.childPage[3].addStyle("background:#ffffff");
		this.docViewer3 = document.createElement("iframe");
		this.docViewer3.frameBorder = 0;
		this.docViewer3.id = this.getFullId()+"_viewer";
		this.docViewer3.style.cssText = "width:100%;height:100%";		
		cnv3.appendChild(this.docViewer3);
		
		var cnv4 = this.pc1.childPage[4].getClientCanvas();
		this.pc1.childPage[4].addStyle("background:#ffffff");
		this.docViewer4 = document.createElement("iframe");
		this.docViewer4.frameBorder = 0;
		this.docViewer4.id = this.getFullId()+"_viewer";
		this.docViewer4.style.cssText = "width:100%;height:100%";		
		cnv4.appendChild(this.docViewer4);

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		/*kirim mail*/
		uses("server_util_mail;portalui_ConfirmMail");
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		this.onClose.set(this,"doClose");	

	}
};
window.app_dmt_dashboard_fdPiutangTrail.extend(window.childForm);
window.app_dmt_dashboard_fdPiutangTrail.implement({
	doClose: function(sender){
		this.dbLib.delListener(this);
		this.mail.delListener(this);
	},
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
			case this.bPrint2 :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer2.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel2 :
				 var html = new server_util_arrayList();
				html.add(this.docViewer2.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail2 :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick2");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan, undefined, this);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doConfirmClick2: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer2.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan, undefined, this);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_cust, nama  from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[2,0,2]);
		if (row == 1){
			this.dbLib.setItemsFromSQL("select a.periode "+
									"from (select distinct periode,kode_lokasi from dmt_ar_m "+
									"	  union "+
									"	  select distinct periode,kode_lokasi from dmt_kaspiutang_d "+
									"	 )a where a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.filter2 = this.sg1.getCell(2,1)+"/";
				this.report = new server_report_report();
				this.docViewer.src = this.report.previewWithHeader("server_report_dmt_rptSaldoPiutang",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
				
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
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
	doOpenDoc: function(kode_cust){
		this.filter2 = this.sg1.getCell(2,1)+"/"+this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+"/"+
					   this.filterRep.filterStr("a.kode_cust","=",kode_cust,kode_cust,"where");
		
		this.docViewer2.src = this.report.previewWithHeader("server_report_dmt_rptKartuPiutang",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doOpenDoc2: function(no_bukti){
		this.filter = "where a.no_ar='"+no_bukti+"'";
		this.docViewer3.src = this.report.previewWithHeader("server_report_dmt_rptFormInvoice1",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.filter = "";
		this.filter2=this.sg1.getCell(2,1)+"/"+" where a.no_bukti='"+no_bukti+"'";
		this.docViewer4.src = this.report.previewWithHeader("server_report_dmt_rptJurnal",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

		this.pc1.setActivePage(this.pc1.childPage[3]);
	},
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.mail && callbackObj == this){
			errog_log(result)
		}
		if (sender == this.dbLib && callbackObj == this){
		}
	}
	
	
	
});
