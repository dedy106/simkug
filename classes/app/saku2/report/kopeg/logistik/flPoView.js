window.app_saku2_report_kopeg_logistik_flPoView = function(owner)
{
	if (owner)
	{
		window.app_saku2_report_kopeg_logistik_flPoView.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_report_kopeg_logistik_flPoView";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Data Kontrak Kerja","Detail Kontrak Kerja","Riwayat Kontrak Kerja"]});
		this.bPrint = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,200],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from log_po_m");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi ","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode ","=",this.periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Bukti","All"));
		this.sg1mp = new saiGrid(this.pc1.childPage[1],{bound:[1,20,this.pc1.width - 4,this.pc1.height - 180],colCount:8,
				    colTitle:["No PO","Tanggal","Kode Vendor","Nama Vendor","No Dokumen","Keterangan","Jumlah","View Dokumen"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,50,250,100,200,60,60,100]],
					selectCell:[this,"doSgClick"], 
					colAlign:[[6,7],[alCenter,alCenter]],colFormat:[[7],[cfButton]],readOnly:true});
        this.sgn1 = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width - 4,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
					
		this.sg1mp2 = new saiGrid(this.pc1.childPage[1],{bound:[1,this.pc1.height - 160,this.pc1.width - 4, 100],colCount:4,readOnly:true,
					colTitle:["Kode Dok","Nama Dokumen","File","Download"],
					colWidth:[[3,2,1,0],[100,300,200,100]],
					colAlign:[[3],[alCenter]],
					colFormat:[[3],[cfButton]],
					click:[this,"doSgBtnClick"]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		var cnv = this.pc1.childPage[3].getClientCanvas();
		this.pc1.childPage[3].addStyle("background:#ffffff");
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
window.app_saku2_report_kopeg_logistik_flPoView.extend(window.childForm);
window.app_saku2_report_kopeg_logistik_flPoView.implement({
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
		if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokasi, nama from lokasi where flag_konsol='0'",
												"select count(*) from lokasi where flag_konsol='0'",
												new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
			}
			
			
			if (row ==2)
			{
				filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filterRep.ListDataSGFilter(this, "Data Pemesanan",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_po, a.keterangan from log_po_m a "+filter,
												"select count(a.no_po) from log_po_m a "+filter,
												new Array("a.no_po","a.keterangan"),"and",new Array("No Bukti","Keterangan"));
			}
		
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,0,2]);	
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from log_po_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun ","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode ","All"));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Klaim","All"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Dokumen","All"));
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.no_po",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			
				
				var sql="select a.no_po,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.no_dokumen, "+
						"	  isnull(d.jumlah,0) as jumlah	"+
						"from log_po_m a "+
						"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"left join  (select no_po,kode_lokasi,count(no_po) as jumlah "+
						"			from log_po_dok "+
						"			group by no_po,kode_lokasi "+
						"			)d on a.no_po=d.no_po and a.kode_lokasi=d.kode_lokasi "+this.filter;
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn1.rearrange();
					this.doTampilData2(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sgn1.clear(1);
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doTampilData2: function(page) {
		this.sg1mp.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1mp.appendData([line.no_po,line.tanggal,line.kode_vendor, line.nama_vendor, line.no_dokumen,line.keterangan,line.jumlah,"Preview"]);
			this.sg1mp.rows.get(i).setCellColor(7,"#ff9900");
			this.sg1mp.rows.get(i).setHint("Click untuk menampilkan detail klaim");
		}
		this.sg1mp.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	
	
	doSgClick:function(sender, col, row){	
		
		if (col!=7){
			try{
				this.report = new server_report_report();
				this.filter = "where a.no_po='"+this.sg1mp.cells(0,row)+"'";
				this.showFilter = "";
				this.lokasi = "";
				this.filter2 = this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,0);
				this.docViewer2.src = this.report.previewWithHeader("server_report_saku2_kopeg_logistik_rptPo",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.filter = "where e.no_po='"+this.sg1mp.cells(0,row)+"'";
				this.docViewer.src = this.report.previewWithHeader("server_report_saku2_kopeg_logistik_rptPoPos",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				
				this.pc1.setActivePage(this.pc1.childPage[2]);
			}catch(e){
				alert(e);
			}
		}
		if (col==7){
			try{
				
				var sql="select a.kode_jenis,b.nama as nama_dok,a.no_gambar "+
						"from log_po_dok a "+
						"inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_po='"+this.sg1mp.getCell(0,row)+"' "+
						"order by a.kode_jenis ";
				var data = this.dbLib.getDataProvider(sql,true);
				this.sg1mp2.clear();
				
				if (typeof(data) != "string")
				{  
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						//this.sg1mp2.setColWidth([1,0],[100,250]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.kode_jenis,line.nama_dok,line.no_gambar,"Download"]);
							this.sg1mp2.rows.get(k).setCellColor(3,"#ff9900");							
						}
						this.sg1mp2.hideLoading();
					}
				}				
				this.sgn2.setTotalPage(1);
				this.sgn2.rearrange();						
			}catch(e){
				alert(e);
			}
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.mail && callbackObj == this){
			errog_log(result)
		}
		if (sender == this.dbLib && callbackObj == this){
		}
	}
	
	
	
});
