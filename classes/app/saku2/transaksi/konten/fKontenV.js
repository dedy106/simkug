window.app_saku2_transaksi_konten_fKontenV = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_konten_fKontenV.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_konten_fKontenV";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		uses("childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail");
		uses("util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Data Informasi","Detail Informasi"]});
		this.bPrint = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,200],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Periode","All"));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Kelompok","All"));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Konten","All"));
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:6,tag:9,
		            colTitle:["No Konten","Kelompok","Tanggal","Judul","File Gambar","File Dokumen"],
					colWidth:[[5,4,3,2,1,0],[150,150,400,60,100,100]], 
					readOnly:true,autoAppend:true,defaultRow:1,
					dblClick:[this,"doDoubleClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.pc1.childPage[2].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		
		
	}
};
window.app_saku2_transaksi_konten_fKontenV.extend(window.childForm);
window.app_saku2_transaksi_konten_fKontenV.implement({
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
					this.mail.send(undefined,to,subject,pesan);
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
					this.mail.send(undefined,to,subject,pesan);
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
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Kelompok",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_klp,nama from konten where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_klp) from konten  where kode_lokasi='"+this.app._lokasi+"' ",
													  new Array("kode_klp","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Konten",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_konten,nama from konten where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_konten) from konten  where  kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_konten","nama"),"and",new Array("kode","nama"));
		}
		
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("123","123","123"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,2,2));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from konten order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Periode","All"));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Kelompok","All"));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Konten","All"));
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.kode_klp",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				var sql="select a.no_konten,b.nama as nama_klp,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.judul,a.file_gambar,a.file_dok "+
					" from konten a "+
					" inner join klpkonten b on b.kode_lokasi = a.kode_lokasi and b.kode_klp = a.kode_klp "+this.filter+
					" order by a.tanggal desc";
				
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg.clear(1);
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_konten,line.nama_klp,line.tanggal,line.judul,line.file_gambar,line.file_gambar]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where no_konten='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_saku2_konten_rptInformasi",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}catch(e){
			alert(e);
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
	}
	
	
	
});