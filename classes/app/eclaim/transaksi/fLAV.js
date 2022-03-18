window.app_eclaim_transaksi_fLAV = function(owner)
{
	if (owner)
	{
		window.app_eclaim_transaksi_fLAV.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_transaksi_fLAV";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Data Klaim","Riwayat Klaim","Detail Riwayat Klaim"]});
		this.bPrint = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:12});
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from eclaim_klaim");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
		this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
		this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Klaim","All"));
		this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Alamat","All"));
		this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas ","All"));
		this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Estimasi Klaim","All"));
		this.gridLib.SGEditData(this.sg1,9,new Array(0,1), new Array("No Polis","All"));
		this.gridLib.SGEditData(this.sg1,10,new Array(0,1), new Array("Tanggal kejadian (DOL)","All"));
		this.gridLib.SGEditData(this.sg1,11,new Array(0,1,2), new Array("Sort By","=","No Klaim"));
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:10,tag:9,
		            colTitle:["No Klaim","No Dokumen","Tgl DOL","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable","Lokasi Kejadian"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.pc1.childPage[2].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		var cnv2 = this.pc1.childPage[3].getClientCanvas();
		this.pc1.childPage[3].addStyle("background:#ffffff");
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
window.app_eclaim_transaksi_fLAV.extend(window.childForm);
window.app_eclaim_transaksi_fLAV.implement({
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
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_sebab,nama from eclaim_sebab where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_sebab) from eclaim_sebab  where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_obyek,nama from eclaim_obyek where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_obyek) from eclaim_obyek  where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Kejadian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok,nama from eclaim_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_lok) from eclaim_lokasi  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_lok","nama"),"and",new Array("kode","nama"));
		}
		if (row == 5)
		{
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.filterRep.ListDataSGFilter(this, "Data Berkas",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.no_klaim,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal from eclaim_klaim a "+this.filter,
													  "select count(a.no_klaim) from eclaim_klaim a "+this.filter,
													  new Array("a.no_klaim","a.no_dokumen","a.tanggal"),"and",new Array("no berkas","no dokumen","tanggal"));
		}
		if (row == 9)
		{
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_polis,keterangan from eclaim_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(no_polis) from eclaim_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("no_polis","keterangan"),"and",new Array("No Polis","Keterangan"));
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array("123","123","123","123","123","123","13","13","123","123","123","3"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array(0,0,2,2,2,2,4,4,4,2,1,0));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from eclaim_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from eclaim_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 11)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["No Klaim","Penyebab","Obyek","Lokasi","No Berkas","Nilai","DOL","Alamat"]);
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Berkas","All"));
				this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Alamat","All"));
				this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas Telkom","All"));
				this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Klaim","All"));
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					  this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				if (this.sg1.getCell(1,6)=="=") 
				{
					this.filter=this.filter+" and a.alamat like '%"+this.sg1.getCell(2,6)+"%'";
				}
				if (this.sg1.getCell(1,7)=="=") 
				{
					this.filter=this.filter+" and a.no_dokumen like '%"+this.sg1.getCell(2,7)+"%'";
				}
				if (this.sg1.getCell(1,8)=="=") 
				{
					this.filter=this.filter+" and a.nilai ="+this.sg1.getCell(2,8);
				}
				if (this.sg1.getCell(1,8)=="Range") 
				{
					this.filter=this.filter+" and a.nilai between "+this.sg1.getCell(2,8)+" and "+this.sg1.getCell(3,8);
				}
				if (this.sg1.getCell(1,10)=="=") 
				{
					this.filter=this.filter+" and a.tanggal='"+this.sg1.getCellDateValue(2,10)+"' ";
				}
				if (this.sg1.getCell(1,10)=="Range") 
				{
					this.filter=this.filter+" and a.tanggal between '"+this.sg1.getCellDateValue(2,10)+"' and '"+this.sg1.getCellDateValue(3,10)+"' ";
				}
				var order="";
				if (this.sg1.getCell(2,11)=="No Klaim") {order=" order by a.no_klaim desc";}	
				if (this.sg1.getCell(2,11)=="Penyebab") {order=" order by a.kode_sebab,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="Obyek") {order=" order by a.kode_obyek,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="Lokasi") {order=" order by a.kode_lok,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="Alamat") {order=" order by alamat,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="No Berkas") {order=" order by a.no_dokumen,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="Nilai") {order=" order by a.nilai,a.no_klaim ";}
				if (this.sg1.getCell(2,11)=="DOL") {order=" order by a.tanggal,a.no_klaim ";}
				var user_lok="";
				if (this.app._userStatus=="U")
				{
					user_lok=" and a.kode_lok='"+this.app._kodeLok+"'";
				}
				var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from eclaim_klaim a "+
					" inner join eclaim_lokasi b on  b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join eclaim_obyek c on c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join eclaim_sebab d on d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join eclaim_adjust e on e.kode_ttg = a.kode_ttg and e.no_klaim = a.no_klaim  "+this.filter+user_lok+order;
				
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
			this.sg.appendData([line.no_klaim,line.no_dokumen,line.tanggal,line.nama_lok,line.nama_obyek,line.nama_sebab,floatToNilai(line.nilai),floatToNilai(line.nilai_adjust),floatToNilai(line.nilai_bayar),line.alamat]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
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
	}, 
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.mail && callbackObj == this){
			errog_log(result)
		}
		if (sender == this.dbLib && callbackObj == this){
		}
	}
	
	
	
});
