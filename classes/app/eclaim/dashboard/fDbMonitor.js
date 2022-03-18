window.app_eclaim_dashboard_fDbMonitor = function(owner)
{
	if (owner)
	{
		window.app_eclaim_dashboard_fDbMonitor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_dashboard_fDbMonitor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,980,500], childPage:["Filter","Data Monitoring","Rekapitulasi Klaim","Data Klaim","Detail Klaim","Riwayat Klaim"]});
		/*
		this.bPrint = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		*/
		this.bPrint2 = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,200],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from eclaim_klaim");
		this.polis=this.dbLib.getPeriodeFromSQL("select no_polis as periode from eclaim_polis where tanggal in (select max(tanggal) as tanggal from eclaim_polis)");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun ","=",this.tahun));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("No Polis ","All",""));
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:10,tag:9,
		            colTitle:["No Klaim","No Dokumen","Tgl DOL","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable","Lokasi Kejadian"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});

		this.pWidget1 = new panel(this.pc1.childPage[1],{bound:[15,10,300,240], caption:"Klaim Per Posisi"});
        this.cnv1 = this.pWidget1.getClientCanvas();
        this.cnv1.style.overflow = "auto";
        this.cnv1.style.background = "#ffffff";
        this.cnv1.style.top = "20";
        this.cnv1.style.height = this.pWidget1.height - 20;
		
		this.pWidget2 = new panel(this.pc1.childPage[1],{bound:[330,10,300,240], caption:"Klaim Per Obyek"});
        this.cnv2 = this.pWidget2.getClientCanvas();
        this.cnv2.style.overflow = "auto";
        this.cnv2.style.background = "#ffffff";
        this.cnv2.style.top = "20";
        this.cnv2.style.height = this.pWidget2.height - 20;
		
		this.pWidget5 = new panel(this.pc1.childPage[1],{bound:[650,10,300,240], caption:"Klaim Per Penyebab"});
        this.cnv5 = this.pWidget5.getClientCanvas();
        this.cnv5.style.overflow = "auto";
        this.cnv5.style.background = "#ffffff";
        this.cnv5.style.top = "20";
        this.cnv5.style.height = this.pWidget5.height - 20;
			
		
			
		this.pWidget3 = new panel(this.pc1.childPage[1],{bound:[15,300,300,240], caption:"Klaim Per Bulan"});
        this.cnv3 = this.pWidget3.getClientCanvas();
        this.cnv3.style.overflow = "auto";
        this.cnv3.style.background = "#ffffff";
        this.cnv3.style.top = "20";
        this.cnv3.style.height = this.pWidget3.height - 20;
			
		this.pWidget4 = new panel(this.pc1.childPage[1],{bound:[330,300,300,240], caption:"Klaim Per Kota"});
        this.cnv4 = this.pWidget4.getClientCanvas();
        this.cnv4.style.overflow = "auto";
        this.cnv4.style.background = "#ffffff";
        this.cnv4.style.top = "20";
        this.cnv4.style.height = this.pWidget4.height - 20;
		
		this.pWidget6 = new panel(this.pc1.childPage[1],{bound:[650,300,300,240], caption:"Klaim Per Lokasi"});
        this.cnv6 = this.pWidget6.getClientCanvas();
        this.cnv6.style.overflow = "auto";
        this.cnv6.style.background = "#ffffff";
        this.cnv6.style.top = "20";
        this.cnv6.style.height = this.pWidget6.height - 20;
		
		var cnv = this.pc1.childPage[4].getClientCanvas();
		this.pc1.childPage[4].addStyle("background:#ffffff");
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

		var cnv3 = this.pc1.childPage[5].getClientCanvas();
		this.pc1.childPage[5].addStyle("background:#ffffff");
		this.docViewer3 = document.createElement("iframe");
		this.docViewer3.frameBorder = 0;
		this.docViewer3.id = this.getFullId()+"_viewer";
		this.docViewer3.style.cssText = "width:100%;height:100%";		
		cnv3.appendChild(this.docViewer3);
		
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
window.app_eclaim_dashboard_fDbMonitor.extend(window.childForm);
window.app_eclaim_dashboard_fDbMonitor.implement({
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
		if (row == 1)
		{
			var filter=this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and");
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
												"select a.no_polis,a.keterangan "+
												"from eclaim_polis a "+filter,
												"select count(a.no_polis) "+
												"from eclaim_polis a "+filter,
												new Array("a.no_polis","a.keterangan"),"and",new Array("No Polis","Keterangan"));
		}
		
		
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new  Array("123","123"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new  Array(0,2));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from eclaim_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun ","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("No Polis ","All"));
			
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.no_polis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") ;
				this.filter2=this.filterRep.filterStr("a.no_polis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where");
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.doInformasi(this.filter);
				this.doRekapKlaim(this.filter,this.filter2);
				
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	
	doDoubleClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim_rptLapAwal",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[3]);
		}catch(e){
			alert(e);
		}
	},
	doSgClick:function(sender, col, row){	
		
		if (col!=5){
			try{
				this.report = new server_report_report();
				this.filter = "where a.no_klaim='"+this.sg1mp.cells(1,row)+"'";
				this.showFilter = "";
				this.lokasi = "";
				this.filter2 = "";
				this.docViewer.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim_rptVerifikasi",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.pc1.setActivePage(this.pc1.childPage[2]);
			}catch(e){
				alert(e);
			}
		}
		if (col==5){
			try{
				var data = this.dbLib.getDataProvider("select nama as nm from eclaim_ver_dok "+
						"where no_ver='"+this.sg1mp.getCell(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				this.sg1mp2.clear();
				if (typeof(data) != "string")
				{  
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						this.sg1mp2.setColWidth([1,0],[100,250]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.nm,"Download"]);
							this.sg1mp2.rows.get(k).setCellColor(1,"#ff9900");							
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
	doInformasi: function(filter){
		try{
			
			var sql = "select a.kode_proses,b.progress,a.nama,ifnull(b.jml,0) as jml "+
					"from eclaim_proses a "+
					"left join (select a.progress,case a.progress  "+
					"		   when '0' then 'P1' when '1' then 'P2' when '2' then 'P3' when '3' then 'P4' when '4' then 'P5' when '5' then 'P6'  "+
					"		   end as kode_proses,a.kode_ttg,count(a.no_klaim) as jml  "+
					"	   from eclaim_klaim a "+filter+
					"	   group by a.progress,a.kode_ttg "+
					"	   )b on a.kode_proses=b.kode_proses and a.kode_ttg=b.kode_ttg "+
					"where b.kode_ttg='"+this.app._kodeTtg+"' ";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					var no_bukti=this.sg1.getCell(2,0)+"/1/"+line.progress;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv1.innerHTML = html;
			
			var sql = "select a.kode_obyek,b.nama,a.jml "+
								"from (select a.kode_obyek,a.kode_ttg,count(a.no_klaim) as jml "+
								"	  from eclaim_klaim a "+filter+
								"	  group by a.kode_obyek,a.kode_ttg "+
								"	 )a "+
								"inner join eclaim_obyek b on a.kode_obyek=b.kode_obyek and a.kode_ttg=b.kode_ttg "+
								"where b.kode_ttg='"+this.app._kodeTtg+"' "+
								"order by a.jml desc";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];
					var no_bukti=this.sg1.getCell(2,0)+"/2/"+line.kode_obyek;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv2.innerHTML = html;
			
			var sql = "select a.kode_sebab,b.nama,a.jml "+
								"from (select a.kode_sebab,a.kode_ttg,count(a.no_klaim) as jml "+
								"	  from eclaim_klaim a "+filter+
								"	  group by a.kode_sebab,a.kode_ttg "+
								"	 )a "+
								"inner join eclaim_sebab b on a.kode_sebab=b.kode_sebab and a.kode_ttg=b.kode_ttg "+
								"where b.kode_ttg='"+this.app._kodeTtg+"' "+
								"order by a.jml desc";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					var no_bukti=this.sg1.getCell(2,0)+"/3/"+line.kode_sebab;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv5.innerHTML = html;
			
			var sql = "select a.bulan as nama,a.periode,ifnull(a.jml,0) as jml "+
					"from (select a.periode,case substring(periode,5,2) "+
					"		 when '01' then 'Januari' when '02' then 'Februari' when '03' then 'Maret' when '04' then 'April' when '05' then 'Mei' "+
					"		 when '06' then 'Juni' when '07' then 'Juli' when '08' then 'Agustus' when '09' then 'September' when '10' then 'Oktober' "+
					"		 when '11' then 'November' when '12' then 'Desember' end as bulan "+
					"		 ,count(a.no_klaim) as jml "+
					"	  from eclaim_klaim a "+filter+
					"	  group by a.periode "+
					"	  )a "+
					"order by a.periode ";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					var no_bukti=this.sg1.getCell(2,0)+"/4/"+line.periode;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv3.innerHTML = html;
			
			var sql = "select a.kode_kota,b.nama,a.jml "+
								"from (select a.kode_kota,a.kode_ttg,count(a.no_klaim) as jml "+
								"	  from eclaim_klaim a "+filter+
								"	  group by a.kode_kota,a.kode_ttg "+
								"	 )a "+
								"inner join eclaim_kota b on a.kode_kota=b.kode_kota and a.kode_ttg=b.kode_ttg "+
								"where b.kode_ttg='"+this.app._kodeTtg+"' "+
								"order by a.jml desc";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					var no_bukti=this.sg1.getCell(2,0)+"/5/"+line.kode_kota;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv4.innerHTML = html;
			
			var sql = "select a.kode_lok,b.nama,a.jml "+
								"from (select a.kode_lok,a.kode_ttg,count(a.no_klaim) as jml "+
								"	  from eclaim_klaim a "+filter+
								"	  group by a.kode_lok,a.kode_ttg "+
								"	 )a "+
								"inner join eclaim_lokasi b on a.kode_lok=b.kode_lok and a.kode_ttg=b.kode_ttg "+
								"where b.kode_ttg='"+this.app._kodeTtg+"' "+
								"order by a.jml desc";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='240' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					var no_bukti=this.sg1.getCell(2,0)+"/6/"+line.kode_lok;
					html=html+"<tr><td width='10'><img  src='image/check.png'></td><td width='150'><a style='cursor:pointer' onclick='$$("+this.resourceId +").doViewItem(event,\""+no_bukti+"\");'>"+line.nama+"</a></td><td width='30' align='center'>"+line.jml+"</td></tr>";
				}
				html=html+"</table>";
			}
			this.cnv6.innerHTML = html;
			
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doViewItem: function(event,no_bukti){
		try{
			var tmp="";
			var tmp2=no_bukti.split("/");
			var tahun=tmp2[0];
			var modul=tmp2[1];
			var no_bukti=tmp2[2];
			if (modul=="1")
			{
				tmp=" and a.progress='"+no_bukti+"' ";
			}
			if (modul=="2")
			{
				tmp=" and a.kode_obyek='"+no_bukti+"' ";
			}
			if (modul=="3")
			{
				tmp=" and a.kode_sebab='"+no_bukti+"' ";
			}
			if (modul=="4")
			{
				tmp=" and a.periode='"+no_bukti+"' ";
			}
			if (modul=="5")
			{
				tmp=" and a.kode_kota='"+no_bukti+"' ";
			}
			if (modul=="6")
			{
				tmp=" and a.kode_lok='"+no_bukti+"' ";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from eclaim_klaim a "+
					" inner join eclaim_lokasi b on b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join eclaim_obyek c on c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join eclaim_sebab d on d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join eclaim_adjust e on e.no_klaim = a.no_klaim  "+this.filter+tmp+
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
			this.pc1.setActivePage(this.pc1.childPage[3]);
		}catch(e){
			systemAPI.alert(e);
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
			this.docViewer3.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[4]);
		}catch(e){
			alert(e);
		}
	},
	
	doRekapKlaim: function(filter,filter2) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = filter;
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = filter2+"/"+this.sg1.getCell(2,0);
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim_rptRekapKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 1)
				window.open("server/media/"+this.sg1mp2.getCell(0,row));
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
