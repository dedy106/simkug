window.app_saku2_dashboard_anggaran_fdRkapTrail = function(owner)
{
	if (owner)
	{
		window.app_saku2_dashboard_anggaran_fdRkapTrail.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_dashboard_anggaran_fdRkapTrail";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","RKAP Anggaran","Rekap Akun","Outlook","Detail"]});
		this.bPrint = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
		this.periode=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d where kode_lokasi='"+this.app._lokasi+"'");
		this.bid1=this.dbLib.getPeriodeFromSQL("select min(kode_bidang) as periode from bidang");
		this.bid2=this.dbLib.getPeriodeFromSQL("select max(kode_bidang) as periode from bidang");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi ","=","FS1"));
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","Summary"));
		this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Detail Akun","=","Akun"));
		this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2,3), new Array("Kode Bidang ","Range",this.bid1,this.bid2));
				
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
window.app_saku2_dashboard_anggaran_fdRkapTrail.extend(window.childForm);
window.app_saku2_dashboard_anggaran_fdRkapTrail.implement({
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
				this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
														  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
														  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
			}
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Daftar Bidang",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_bidang, nama from bidang ",
														  "select count(kode_bidang) from bidang ",
														  ["kode_bidang","nama"],"where",["Kode","Nama"]);
			}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","3","123","3","3","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,0,0,2]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_d where kode_lokasi='"+this.app._lokasi+"' order by tahun",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Akun","Akun Lokasi","Akun Bidang","Akun DRK"));
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
				this.jenis_agg="";
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							  this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							  this.filterRep.filterStr("d.kode_bidang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+this.jenis_agg;

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
				this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,4)+"/"+this.ver+"/"+this.kode_lokasi1+"/"+this.kode_lokasi2+"/"+this.sg1.getCell(2,4)+"/"+this.sg1.getCell(2,6)+"/"+this.sg1.getCell(2,7)+"/"+this.sg1.getCell(2,5)+"/"+this.sg1.getCell(3,5)+"/"+this.sg1.getCell(2,2);
				this.ver="0";
				sql="call sp_agg_rkap_total_inv ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,5)+"','"+this.sg1.getCell(3,5)+"','"+this.app._nikUser+"')";
				this.dbLib.execQuerySync(sql);	
				this.report = new server_report_report();
				this.docViewer.src = this.report.previewWithHeader("server_report_saku2_anggaran_rptAggRkapTrail",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
				
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
	doOpenDoc: function(kode_neraca){
		
		this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
					this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					this.filterRep.filterStr("b.kode_neraca","=",kode_neraca,kode_neraca,"and");
		
		this.docViewer2.src = this.report.previewWithHeader("server_report_saku2_anggaran_rptAggAkun",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
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
