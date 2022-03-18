window.app_rra_report_flPosisiPdrk = function(owner)
{
	if (owner)
	{
		window.app_rra_report_flPosisiPdrk.prototype.parent.constructor.call(this,owner);
		this.className = "app_rra_report_flPosisiPdrk";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Posisi PDRK", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:7});
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
	this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from rra_pdrk_m where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Bisnis Area","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["UBIS","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis RRA","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No PDRK","All",""]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Jenis Laporan","=","Posisi"]);
	this.doSelectCell(this.sg1,2,6);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_rra_report_flPosisiPdrk.extend(window.childForm);
window.app_rra_report_flPosisiPdrk.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi" ,this.sg1, this.sg1.row, this.sg1.col,
													"select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from lokasi  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_lokasi","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Bisnis Area",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_ba, nama from rra_ba where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from rra_ba  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_ba","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data UBIS",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_ubis, nama from rra_ubis where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from rra_ubis  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_ubis","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 5)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("substring(a.kode_ubis,1,4)",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_ubis",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_pdrk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.filterRep.ListDataSGFilter(this, "Data PDRK",this.sg1, this.sg1.row, this.sg1.col,
													"select a.no_pdrk, a.keterangan from rra_pdrk_m a "+this.filter,
													"select count(*) from rra_pdrk_m a "+this.filter,
													["a.no_pdrk","a.keterangan"],"and",["No PDRK","Keterangan"]);
			}	
				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["3","123","123","123","13","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,0,2,2,0,2,0]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from rra_pdrk_m where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("RRR","ABT"));
		}
		if (row == 6)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("PDRK-1","PDRK-2","PDRK-3"));
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Bisnis Area","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["UBIS","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis RRA","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No PDRK","All",""]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Jenis Laporan","=","PDRK-1"]);					
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("substring(a.kode_ubis,1,4)",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_ubis",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_pdrk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.no_pdrk",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				if (this.sg1.getCell(2,6)=='Posisi')
				{
					/*var sql = "select a.no_pdrk,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_ubis,b.nama as nama_ubis,c.nilai_usulan, "+
							"	   d.no_rev,date_format(d.tanggal,'%d/%m/%Y') as tgl_rev,e.no_app,date_format(e.tanggal,'%d/%m/%Y') as tgl_app, "+
							"	   f.no_app as no_revfc,date_format(f.tanggal,'%d/%m/%Y') as tgl_revfc,g.no_app as no_appfc,date_format(g.tanggal,'%d/%m/%Y') as tgl_appfc, "+
							" 	   h.no_sukka,date_format(h.tanggal,'%d/%m/%Y') as tgl_sukka,i.no_app as no_appsk,date_format(i.tanggal,'%d/%m/%Y') as tgl_appsk "+
							"from rra_pdrk_m a "+
							"inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
							"left join (select no_pdrk,kode_lokasi,sum(nilai) as nilai_usulan "+
							"		   from rra_pdrk_d "+
							"	   where dc='D' "+
							"		   group by no_pdrk,kode_lokasi "+ 
							"	  )c on a.no_pdrk=c.no_pdrk and a.kode_lokasi=c.kode_lokasi "+
							"left join (select no_pdrk,no_rev,tanggal "+
							"		   from rra_rev_m "+
							"		   )d on a.no_pdrk=d.no_pdrk "+
							"left join (select c.no_pdrk,a.no_app,b.tanggal "+
							"		   from rra_app_d a "+
							"		   inner join rra_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
							"	   inner join rra_rev_m c on a.no_bukti=c.no_rev and a.kode_lokasi=c.kode_lokasi "+
							"	   where b.jenis_form='APP' "+
							"		   )e on a.no_pdrk=e.no_pdrk "+         
							"left join (select c.no_pdrk,a.no_app,b.tanggal "+
							"		   from rra_app_d a "+
							"		   inner join rra_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
							"	   inner join rra_rev_m c on a.no_bukti=c.no_rev and a.kode_lokasi=c.kode_lokasi "+
							"	   where b.jenis_form='FCREV' "+
							"		   )f on a.no_pdrk=f.no_pdrk "+        
							"left join (select c.no_pdrk,a.no_app,b.tanggal "+
							"		   from rra_app_d a "+
							"		   inner join rra_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
							"	   inner join rra_rev_m c on a.no_bukti=c.no_rev and a.kode_lokasi=c.kode_lokasi "+
							"	   where b.jenis_form='FCAPP' "+
							"		   )g on a.no_pdrk=g.no_pdrk "+ 
							"left join (select no_pdrk,no_sukka,tanggal "+
							"		   from rra_sukka "+
							"		   )h on a.no_pdrk=h.no_pdrk "+
							"left join (select c.no_pdrk,a.no_app,b.tanggal "+
							"		   from rra_app_d a "+
							"		   inner join rra_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
							"	   inner join rra_rev_m c on a.no_bukti=c.no_rev and a.kode_lokasi=c.kode_lokasi "+
							"	   where b.jenis_form='APPSK' "+
							"		   )i on a.no_pdrk=i.no_pdrk      "+ this.filter;
					*/
					var sql = "select distinct a.no_pdrk, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan, a.sts_pdrk,  bb.nama as ubis, "+				
						"	cc.nilai "+
						" , b.no_rev, a.nik_buat, date_format(b.tanggal,'%d-%m-%Y') as tgl1 "+
						" , a.nik_review, date_format(c.tanggal,'%d-%m-%Y') as tgl2 "+						
						" , a.nik_apppdrk3, date_format(d.tanggal, '%d-%m-%Y') as tgl3 "+						
						//" , a.nik_apppdrk32, date_format(dd.tanggal, '%d-%m-%Y') as tgl32 "+
						//" , a.nik_appjust, date_format(d.tanggal, '%d-%m-%Y') as tgl21 "+
						//" , a.nik_appjust2, date_format(d.tanggal, '%d-%m-%Y') as tgl22 "+						
						" , i.no_grev as gr1, i.nik_user as nikgr1, date_format(i.tanggal, '%d-%m-%Y') as tgl8, i.sts_pdrk as grsts "+
						" , j.no_app as gr2, date_format(j.tanggal, '%d-%m-%Y') as tgl9 "+
						" , k.no_mrev as ma1, k.nik_user as nikma1, date_format(k.tanggal, '%d-%m-%Y') as tgl10, k.sts_pdrk as masts "+
						" , l.no_app as ma2, date_format(l.tanggal, '%d-%m-%Y') as tgl11 "+
						
						" , e.nik_user as fc1, date_format(e.tanggal, '%d-%m-%Y') as tgl4 "+
						" , f.nik_user as fc2, date_format(f.tanggal, '%d-%m-%Y') as tgl5 "+
						" , g.no_frev as fc3, date_format(g.tanggal, '%d-%m-%Y') as tgl6 "+
						" , h.no_app as fc4, date_format(h.tanggal, '%d-%m-%Y') as tgl7 "+																								
						
						" , m.no_sukka as su1, date_format(m.tanggal, '%d-%m-%Y') as tgl12 "+
						" , a.nik_review as su2, date_format(m.tanggal, '%d-%m-%Y') as tgl13 "+
						" , a.nik_app3 as su3, date_format(n.tanggal, '%d-%m-%Y') as tgl14 "+
						
						" , o.nik_user as fc5, date_format(o.tanggal, '%d-%m-%Y') as tgl15 "+
						
						" from rra_pdrk_m a "+
						"	inner join rra_ubis bb on bb.kode_ubis = a.kode_ubis and bb.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select no_bukti, sum(nilai) as nilai from rra_anggaran where dc='D' and kode_lokasi = '"+this.app._lokasi+"' group by no_bukti ) cc on cc.no_bukti = a.no_pdrk  "+
						"	left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') c on c.no_pdrk = a.no_pdrk and c.kode_lokasi = a.kode_lokasi and c.nik_app = a.nik_review "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') d on d.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and d.nik_app = a.nik_apppdrk3 "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_app, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APP%') dd on dd.no_pdrk = a.no_pdrk and d.kode_lokasi = a.kode_lokasi and dd.nik_app = a.nik_apppdrk32 "+
						
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCRK%') e on e.no_pdrk = a.no_pdrk and e.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCKEP%') f on f.no_pdrk = a.no_pdrk and f.kode_lokasi = a.kode_lokasi "+
						"	left outer join rra_frev_m g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi and g.no_frev like 'FREV%' "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APPFC%') h on h.no_pdrk = a.no_pdrk and h.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'FCTRN%') o on o.no_pdrk = a.no_pdrk and o.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_grev_m i on i.no_pdrk = a.no_pdrk and i.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'GAPP%') j on j.no_pdrk = a.no_pdrk and j.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_mrev_m k on k.no_pdrk = a.no_pdrk and k.kode_lokasi = a.kode_lokasi "+
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'MAPP%') l on l.no_pdrk = a.no_pdrk and l.kode_lokasi = a.kode_lokasi "+
						
						"	left outer join rra_sukka m on m.no_pdrk = a.no_pdrk and m.kode_lokasi = a.kode_lokasi "+						
						"	left outer join (select distinct x.no_app,z.catatan as no_pdrk, x.tanggal, x.nik_user, x.kode_lokasi from rra_app_m x inner join rra_app_d z on z.no_app = x.no_app and z.kode_lokasi = x.kode_lokasi where x.no_app like 'APPSK%') n on n.no_pdrk = a.no_pdrk and n.kode_lokasi = a.kode_lokasi "+
						this.filter;
					this.scriptSqlCount = "select count(*) as tot "+
							"from rra_pdrk_m a "+
							"inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+ this.filter;
					this.title = new server_util_arrayList({items:["No PDRK","Tanggal","Keterangan","Jenis","UBIS","Nilai","No Review","Reviewer","Tgl. Review","Approval AGG","Tgl. APP","Pnj. Prog","Tgl. APP","Rev. Group Bisnis","Reviewer","Tgl. Review","Jenis","App. Group Bisnis","Tgl. APP","Rev. MA","Reviewer","Tgl. Review","Jenis","App. MA","Tgl. APP","Reviewer Keep","Tgl. Rev. Keep","User Keep","Tgl Keep","No Rev FC","Tgl Rev FC","No App FC","Tgl App FC","No SUKKA","Tgl SUKKA","Rev. SUKKA","Tgl Review","No App SK","Tgl App SK","User Proses SAP","Proses SAP"]});
					this.widthTable = new server_util_arrayList({items:[70,60,150,50,100,100,60,80,60,80,60,80,60,80,60,50,80,60,80,60,50,80,60,60,60,80,60,80,60,100,60,100,60,100,60]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","S","S","S","S","S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","N","N","N","N","N","N","N","N","N","N"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
					this.sqlScript = sql;
					this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					this.previewReport(dthtml);
				}
				
			}
	    }catch(e){
			systemAPI.alert("[app_rra_report_flPosisiPdrk]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN POSISI PDRK<br />";
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
