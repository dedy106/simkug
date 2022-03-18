window.app_eclaim2_dashboard_fDbAging = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_dashboard_fDbAging.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_dashboard_fDbAging";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Proses Klaim","Outstanding Divisi","Outstanding Regional","Outstanding Obyek","Outstanding Penyebab","Data Klaim ","Riwayat Klaim","Detail Riwayat Klaim"]});
		this.bPrint = new imageButton(this.pc1.childPage[7],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[7],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[7],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[8],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[8],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[8],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from tlk_klaim");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("No Polis","All"));
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:8,tag:9,
		            colTitle:["Proses Klaim","0 - 30","31 - 60","61 - 90","91 - 120","> 120","Total","K"],
					colWidth:[[7,6,5,4,3,2,1,0],[1,80,80,80,80,80,80,200]], 
					//colFormat:[[5,4,3,2,1],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					colAlign:[[1,2,3,4,5,6],[alCenter,alCenter,alCenter,alCenter,alCenter,alCenter]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick2"]});
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:8,tag:9,
		            colTitle:["Proses Klaim","0 - 30","31 - 60","61 - 90","91 - 120","> 120","Total","K"],
					colWidth:[[7,6,5,4,3,2,1,0],[1,80,80,80,80,80,80,200]], 
					//colFormat:[[5,4,3,2,1],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					colAlign:[[1,2,3,4,5,6],[alCenter,alCenter,alCenter,alCenter,alCenter,alCenter]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick3"]});
		
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:8,tag:9,
		            colTitle:["Proses Klaim","0 - 30","31 - 60","61 - 90","91 - 120","> 120","Total","K"],
					colWidth:[[7,6,5,4,3,2,1,0],[1,80,80,80,80,80,80,200]], 
					//colFormat:[[5,4,3,2,1],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					colAlign:[[1,2,3,4,5,6],[alCenter,alCenter,alCenter,alCenter,alCenter,alCenter]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick4"]});
					
		this.sg5 = new saiGrid(this.pc1.childPage[4],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:8,tag:9,
		            colTitle:["Proses Klaim","0 - 30","31 - 60","61 - 90","91 - 120","> 120","Total","K"],
					colWidth:[[7,6,5,4,3,2,1,0],[1,80,80,80,80,80,80,200]], 
					//colFormat:[[5,4,3,2,1],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					colAlign:[[1,2,3,4,5,6],[alCenter,alCenter,alCenter,alCenter,alCenter,alCenter]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick5"]});
		
		this.sg6 = new saiGrid(this.pc1.childPage[5],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:8,tag:9,
		            colTitle:["Proses Klaim","0 - 30","31 - 60","61 - 90","91 - 120","> 120","Total","K"],
					colWidth:[[7,6,5,4,3,2,1,0],[1,80,80,80,80,80,80,200]], 
					//colFormat:[[5,4,3,2,1],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					colAlign:[[1,2,3,4,5,6],[alCenter,alCenter,alCenter,alCenter,alCenter,alCenter]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick6"]});
					
		this.sg = new saiGrid(this.pc1.childPage[6],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:10,tag:9,
		            colTitle:["No Klaim","No Dokumen","Tgl DOL","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable","Lokasi Kejadian"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[6],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[7].getClientCanvas();
		this.pc1.childPage[7].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		var cnv2 = this.pc1.childPage[8].getClientCanvas();
		this.pc1.childPage[8].addStyle("background:#ffffff");
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
window.app_eclaim2_dashboard_fDbAging.extend(window.childForm);
window.app_eclaim2_dashboard_fDbAging.implement({
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
		
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new  Array("123","123"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new  Array(0,0));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Polis","All"));
			
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.no_polis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") ;
					  
				var sql="select a.kode_proses,a.nama,ifnull(b.aging1,0) as aging1,ifnull(b.aging2,0) as aging2, "+
						"			ifnull(b.aging3,0) as aging3,ifnull(b.aging4,0) as aging4, "+
						"			ifnull(b.aging5,0) as aging5, "+
						"			ifnull(b.aging1,0)+ifnull(b.aging2,0)+ifnull(b.aging3,0)+ifnull(b.aging4,0)+ifnull(b.aging5,0) as total "+
						"from tlk_proses a "+
						"inner join (select a.progress, "+
						"	   sum(case when datediff(now(),a.tanggal)<30 then 1 else 0 end) as aging1, "+
						"	   sum(case when (datediff(now(),a.tanggal) between 31 and 60)  then 1 else 0 end) as aging2, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 61 and 90)  then 1 else 0 end) as aging3, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 91 and 120)  then 1 else 0 end) as aging4, "+
						"			 sum(case when datediff(now(),a.tanggal)>121 then 1 else 0 end) as aging5 "+
						"from tlk_klaim a "+this.filter+
						"group by a.progress "+
						"			)b on a.kode_proses=b.progress "+
						"order by a.no_urut ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg.clear(1);
				
				var sql="select a.kode_klplok,a.nama,ifnull(b.aging1,0) as aging1,ifnull(b.aging2,0) as aging2, "+
						"			ifnull(b.aging3,0) as aging3,ifnull(b.aging4,0) as aging4, "+
						"			ifnull(b.aging5,0) as aging5, "+
						"			ifnull(b.aging1,0)+ifnull(b.aging2,0)+ifnull(b.aging3,0)+ifnull(b.aging4,0)+ifnull(b.aging5,0) as total "+
						"from tlk_klplokasi a "+
						"inner join (select c.kode_klplok, "+
						"	   sum(case when datediff(now(),a.tanggal)<30 then 1 else 0 end) as aging1, "+
						"	   sum(case when (datediff(now(),a.tanggal) between 31 and 60)  then 1 else 0 end) as aging2, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 61 and 90)  then 1 else 0 end) as aging3, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 91 and 120)  then 1 else 0 end) as aging4, "+
						"			 sum(case when datediff(now(),a.tanggal)>121 then 1 else 0 end) as aging5 "+
						"from tlk_klaim a "+
						"inner join tlk_lokasi c on a.kode_lok=c.kode_lok "+this.filter+" and a.progress not in ('13','15') "+
						"group by c.kode_klplok "+
						"			)b on a.kode_klplok=b.kode_klplok "+
						"order by a.kode_klplok ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData3(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg3.clear(1);
				
				var sql="select a.kode_lok,a.nama,ifnull(b.aging1,0) as aging1,ifnull(b.aging2,0) as aging2, "+
						"			ifnull(b.aging3,0) as aging3,ifnull(b.aging4,0) as aging4, "+
						"			ifnull(b.aging5,0) as aging5, "+
						"			ifnull(b.aging1,0)+ifnull(b.aging2,0)+ifnull(b.aging3,0)+ifnull(b.aging4,0)+ifnull(b.aging5,0) as total "+
						"from tlk_lokasi a "+
						"inner join (select a.kode_lok, "+
						"	   sum(case when datediff(now(),a.tanggal)<30 then 1 else 0 end) as aging1, "+
						"	   sum(case when (datediff(now(),a.tanggal) between 31 and 60)  then 1 else 0 end) as aging2, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 61 and 90)  then 1 else 0 end) as aging3, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 91 and 120)  then 1 else 0 end) as aging4, "+
						"			 sum(case when datediff(now(),a.tanggal)>121 then 1 else 0 end) as aging5 "+
						"from tlk_klaim a "+this.filter+" and a.progress not in ('13','15') "+
						"group by a.kode_lok "+
						"			)b on a.kode_lok=b.kode_lok "+
						"order by a.kode_lok ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData4(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg4.clear(1);
				
				var sql="select a.kode_obyek,a.nama,ifnull(b.aging1,0) as aging1,ifnull(b.aging2,0) as aging2, "+
						"			ifnull(b.aging3,0) as aging3,ifnull(b.aging4,0) as aging4, "+
						"			ifnull(b.aging5,0) as aging5, "+
						"			ifnull(b.aging1,0)+ifnull(b.aging2,0)+ifnull(b.aging3,0)+ifnull(b.aging4,0)+ifnull(b.aging5,0) as total "+
						"from tlk_obyek a "+
						"inner join (select a.kode_obyek, "+
						"	   sum(case when datediff(now(),a.tanggal)<30 then 1 else 0 end) as aging1, "+
						"	   sum(case when (datediff(now(),a.tanggal) between 31 and 60)  then 1 else 0 end) as aging2, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 61 and 90)  then 1 else 0 end) as aging3, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 91 and 120)  then 1 else 0 end) as aging4, "+
						"			 sum(case when datediff(now(),a.tanggal)>121 then 1 else 0 end) as aging5 "+
						"from tlk_klaim a "+this.filter+" and a.progress not in ('13','15') "+
						"group by a.kode_obyek "+
						"			)b on a.kode_obyek=b.kode_obyek "+
						"order by a.kode_obyek ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData5(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg5.clear(1);
				
				var sql="select a.kode_sebab,a.nama,ifnull(b.aging1,0) as aging1,ifnull(b.aging2,0) as aging2, "+
						"			ifnull(b.aging3,0) as aging3,ifnull(b.aging4,0) as aging4, "+
						"			ifnull(b.aging5,0) as aging5, "+
						"			ifnull(b.aging1,0)+ifnull(b.aging2,0)+ifnull(b.aging3,0)+ifnull(b.aging4,0)+ifnull(b.aging5,0) as total "+
						"from tlk_sebab a "+
						"inner join (select a.kode_sebab, "+
						"	   sum(case when datediff(now(),a.tanggal)<30 then 1 else 0 end) as aging1, "+
						"	   sum(case when (datediff(now(),a.tanggal) between 31 and 60)  then 1 else 0 end) as aging2, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 61 and 90)  then 1 else 0 end) as aging3, "+
						"			 sum(case when (datediff(now(),a.tanggal) between 91 and 120)  then 1 else 0 end) as aging4, "+
						"			 sum(case when datediff(now(),a.tanggal)>121 then 1 else 0 end) as aging5 "+
						"from tlk_klaim a "+this.filter+" and a.progress not in ('13','15') "+
						"group by a.kode_sebab "+
						"			)b on a.kode_sebab=b.kode_sebab "+
						"order by a.kode_sebab ";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData6(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				} else this.sg6.clear(1);
				
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doTampilData: function(page) {
		this.sg2.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg2.appendData([line.nama,floatToNilai(line.aging1),floatToNilai(line.aging2),floatToNilai(line.aging3),floatToNilai(line.aging4),floatToNilai(line.aging5),floatToNilai(line.total),line.kode_proses]);
		}
		this.sg2.setNoUrut(start);
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg3.appendData([line.nama,floatToNilai(line.aging1),floatToNilai(line.aging2),floatToNilai(line.aging3),floatToNilai(line.aging4),floatToNilai(line.aging5),floatToNilai(line.total),line.kode_klplok]);
		}
		this.sg3.setNoUrut(start);
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg4.appendData([line.nama,floatToNilai(line.aging1),floatToNilai(line.aging2),floatToNilai(line.aging3),floatToNilai(line.aging4),floatToNilai(line.aging5),floatToNilai(line.total),line.kode_lok]);
		}
		this.sg4.setNoUrut(start);
	},
	doTampilData5: function(page) {
		this.sg5.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg5.appendData([line.nama,floatToNilai(line.aging1),floatToNilai(line.aging2),floatToNilai(line.aging3),floatToNilai(line.aging4),floatToNilai(line.aging5),floatToNilai(line.total),line.kode_obyek]);
		}
		this.sg5.setNoUrut(start);
	},
	doTampilData6: function(page) {
		this.sg6.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg6.appendData([line.nama,floatToNilai(line.aging1),floatToNilai(line.aging2),floatToNilai(line.aging3),floatToNilai(line.aging4),floatToNilai(line.aging5),floatToNilai(line.total),line.kode_sebab]);
		}
		this.sg6.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgClick2: function(sender, col , row) 
	{
		try{
			if (col==1)
			{
				this.filter = " where datediff(now(),a.tanggal)<30 and a.progress='"+this.sg2.cells(7,row)+"'";
			}
			if (col==2)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 31 and 60) and a.progress='"+this.sg2.cells(7,row)+"'";
			}
			if (col==3)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 61 and 90) and a.progress='"+this.sg2.cells(7,row)+"'";
			}
			if (col==4)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 91 and 120) and a.progress='"+this.sg2.cells(7,row)+"'";
			}
			if (col==5)
			{
				this.filter = " where datediff(now(),a.tanggal)>120 and a.progress='"+this.sg2.cells(7,row)+"'";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter;
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData2(1);
				this.pc1.setActivePage(this.pc1.childPage[6]);
			} else this.sg.clear(1);
			
		}catch(e){
			alert(e);
		}
	},
	doSgClick3: function(sender, col , row) 
	{
		try{
			if (col==1)
			{
				this.filter = " where datediff(now(),a.tanggal)<30 and b.kode_klplok='"+this.sg3.cells(7,row)+"'";
			}
			if (col==2)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 31 and 60) and b.kode_klplok='"+this.sg3.cells(7,row)+"'";
			}
			if (col==3)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 61 and 90) and b.kode_klplok='"+this.sg3.cells(7,row)+"'";
			}
			if (col==4)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 91 and 120) and b.kode_klplok='"+this.sg3.cells(7,row)+"'";
			}
			if (col==5)
			{
				this.filter = " where datediff(now(),a.tanggal)>120 and b.kode_klplok='"+this.sg3.cells(7,row)+"'";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter;
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData2(1);
				this.pc1.setActivePage(this.pc1.childPage[6]);
			} else this.sg.clear(1);
			
		}catch(e){
			alert(e);
		}
	},
	doSgClick4: function(sender, col , row) 
	{
		try{
			if (col==1)
			{
				this.filter = " where datediff(now(),a.tanggal)<30 and a.kode_lok='"+this.sg4.cells(7,row)+"'";
			}
			if (col==2)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 31 and 60) and a.kode_lok='"+this.sg4.cells(7,row)+"'";
			}
			if (col==3)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 61 and 90) and a.kode_lok='"+this.sg4.cells(7,row)+"'";
			}
			if (col==4)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 91 and 120) and a.kode_lok='"+this.sg4.cells(7,row)+"'";
			}
			if (col==5)
			{
				this.filter = " where datediff(now(),a.tanggal)>120 and a.kode_lok='"+this.sg4.cells(7,row)+"'";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter;
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData2(1);
				this.pc1.setActivePage(this.pc1.childPage[6]);
			} else this.sg.clear(1);
			
		}catch(e){
			alert(e);
		}
	},
	doSgClick5: function(sender, col , row) 
	{
		try{
			if (col==1)
			{
				this.filter = " where datediff(now(),a.tanggal)<30 and a.kode_obyek='"+this.sg5.cells(7,row)+"'";
			}
			if (col==2)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 31 and 60) and a.kode_obyek='"+this.sg5.cells(7,row)+"'";
			}
			if (col==3)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 61 and 90) and a.kode_obyek='"+this.sg5.cells(7,row)+"'";
			}
			if (col==4)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 91 and 120) and a.kode_obyek='"+this.sg5.cells(7,row)+"'";
			}
			if (col==5)
			{
				this.filter = " where datediff(now(),a.tanggal)>120 and a.kode_obyek='"+this.sg5.cells(7,row)+"'";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter;
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData2(1);
				this.pc1.setActivePage(this.pc1.childPage[6]);
			} else this.sg.clear(1);
			
		}catch(e){
			alert(e);
		}
	},
	doSgClick6: function(sender, col , row) 
	{
		try{
			if (col==1)
			{
				this.filter = " where datediff(now(),a.tanggal)<30 and a.kode_sebab='"+this.sg6.cells(7,row)+"'";
			}
			if (col==2)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 31 and 60) and a.kode_sebab='"+this.sg6.cells(7,row)+"'";
			}
			if (col==3)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 61 and 90) and a.kode_sebab='"+this.sg6.cells(7,row)+"'";
			}
			if (col==4)
			{
				this.filter = " where (datediff(now(),a.tanggal) between 91 and 120) and a.kode_sebab='"+this.sg6.cells(7,row)+"'";
			}
			if (col==5)
			{
				this.filter = " where datediff(now(),a.tanggal)>120 and a.kode_sebab='"+this.sg6.cells(7,row)+"'";
			}
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
					" from tlk_klaim a "+
					" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter;
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData2(1);
				this.pc1.setActivePage(this.pc1.childPage[6]);
			} else this.sg.clear(1);
			
		}catch(e){
			alert(e);
		}
	},
	doTampilData2: function(page) {
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
	doSgClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[7]);
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
