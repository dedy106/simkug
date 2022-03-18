window.app_rra_report_flAggReal = function(owner)
{
	if (owner)
	{
		window.app_rra_report_flAggReal.prototype.parent.constructor.call(this,owner);
		this.className = "app_rra_report_flAggReal";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Realisasi Anggaran", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from rra_anggaran where kode_lokasi='"+this.app._lokasi+"'");
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun","=",this.tahun]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Cost Center","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Akun","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Anggaran","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Periodik Anggaran","=","Bulanan"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_rra_report_flAggReal.extend(window.childForm);
window.app_rra_report_flAggReal.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Cost Center",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from rra_cc  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_cc","nama"],"and",["Kode","Nama"]);
			}	
			if (row ==3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from rra_masakun  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_akun","nama"],"and",["Kode","Nama"]);
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","123","123","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[1,0,2,2,0,0]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from rra_anggaran where kode_lokasi='"+this.app._lokasi+"' order by substring(periode,1,4)",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("OPEX","CAPEX"));
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Bulanan","Triwulan","Semester"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Tahun","=",this.tahun]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Cost Center","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Akun","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Anggaran","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Periodik Anggaran","=","Bulanan"]);
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				var jenis_akun="";
				if (this.sg1.getCell(2,4)=="OPEX")
					{jenis_akun=" and c.jenis='Beban' ";}
				if (this.sg1.getCell(2,4)=="CAPEX")
					{jenis_akun=" and c.jenis='Neraca' ";}
				var modul=" and a.modul='SAP' ";
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cc",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+jenis_akun+modul;
				this.filter2 = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_cc",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+jenis_akun;
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				
				if (this.sg1.getCell(2,5)=="Bulanan")
				{
					var sql = "select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc "+
							"	   ,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, "+
							"	   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, "+
							"	   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.target,0) as target, "+       
							"	   isnull(e.r01,0) as r01,isnull(e.r02,0) as r02,isnull(e.r03,0) as r03,isnull(e.r04,0) as r04, "+
							"	   isnull(e.r05,0) as r05,isnull(e.r06,0) as r06,isnull(e.r07,0) as r07,isnull(e.r08,0) as r08, "+
							"	   isnull(e.r09,0) as r09,isnull(e.r10,0) as r10,isnull(e.r11,0) as r11,isnull(e.r12,0) as r12,isnull(e.total,0) as total "+       
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							"left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, "+
							"				  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, "+
							"				  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, "+
							"		  		  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, "+
							"				  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, "+
							"		  		  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, "+
							"				  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, "+
							"		  		  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, "+
							"				  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, "+
							"		  		  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, "+
							"				  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, "+
							"		  		  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, "+
							"				  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as target "+
							"		   from rra_anggaran a "+
							"          inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+modul+
							"		   group by a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"		   )d on a.kode_akun=d.kode_akun and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi "+
							"left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, "+
							"				  sum(case when substring(a.periode,5,2)='01' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r01, "+
							"				  sum(case when substring(a.periode,5,2)='02' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r02, "+
							"		  		  sum(case when substring(a.periode,5,2)='03' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r03, "+
							"				  sum(case when substring(a.periode,5,2)='04' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r04, "+
							"		  		  sum(case when substring(a.periode,5,2)='05' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r05, "+
							"				  sum(case when substring(a.periode,5,2)='06' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r06, "+
							"		  		  sum(case when substring(a.periode,5,2)='07' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r07, "+
							"				  sum(case when substring(a.periode,5,2)='08' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r08, "+
							"		  		  sum(case when substring(a.periode,5,2)='09' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r09, "+
							"				  sum(case when substring(a.periode,5,2)='10' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r10, "+
							"		  		  sum(case when substring(a.periode,5,2)='11' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r11, "+
							"				  sum(case when substring(a.periode,5,2)='12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as r12, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as total "+
							"		   from rra_anggaran a "+
							"          inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+
							"		   group by a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"		   )e on a.kode_akun=e.kode_akun and a.kode_cc=e.kode_cc and a.kode_lokasi=e.kode_lokasi "+this.filter2+
							"order by a.kode_cc,a.kode_akun ";
					this.scriptSqlCount = "select count(*) "+
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter2; 
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode CC","Nama CC","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember","Total Anggaran","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember","Total Realisasi"]});
					this.widthTable = new server_util_arrayList({items:[60,200,60,200,80,80,80,80,80,80,80,80,80,80,80,80,100,80,80,80,80,80,80,80,80,80,80,80,80,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,5)=="Triwulan")
				{
					var sql = "select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc "+
							"	   ,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, "+
							"	   isnull(d.total,0) as total "+       
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							"left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end )as t01, "+
							"				  sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end )as t02, "+
							"		  		  sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end )as t03, "+
							"				  sum(case when substring(a.periode,5,2) between '10' and '12' then a.nilai else 0 end )as t04, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total "+
							"		   from rra_anggaran a "+
							"          inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+
							"		   group by a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"		   )d on a.kode_akun=d.kode_akun and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"order by a.kode_cc,a.kode_akun ";
					this.scriptSqlCount = "select count(*) "+
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter2; 
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode CC","Nama CC","Triwulan 1","Triwulan 2","Triwulan 3","Triwulan 4","Total"]});
					this.widthTable = new server_util_arrayList({items:[60,200,60,200,90,90,90,90,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y","Y"]});
				}
				if (this.sg1.getCell(2,5)=="Semester")
				{
					var sql = "select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc "+
							"	   ,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02, "+
							"	   isnull(d.total,0) as total "+       
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							"left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '06' then a.nilai else 0 end )as t01, "+
							"				  sum(case when substring(a.periode,5,2) between '07' and '12' then a.nilai else 0 end )as t02, "+
							"				  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total "+
							"		   from rra_anggaran a "+
							"          inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+
							"		   group by a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"		   )d on a.kode_akun=d.kode_akun and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi "+this.filter2+
							"order by a.kode_cc,a.kode_akun ";
					this.scriptSqlCount = "select count(*) "+
							"from (select distinct a.kode_cc,a.kode_akun,a.kode_lokasi "+
							"	   from rra_anggaran a "+
							"      inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter+ ") a "+
							"inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							"inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+this.filter2; 
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode CC","Nama CC","Semester 1","Semester 2","Total"]});
					this.widthTable = new server_util_arrayList({items:[60,200,60,200,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y"]});
				}
				//this.groupHeader = new server_util_arrayList({items:["kode_lokfa"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_rra_report_flAggReal]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN ANGGARAN SAP<br />";
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
