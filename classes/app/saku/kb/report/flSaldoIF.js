window.app_saku_kb_report_flSaldoIF = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flSaldoIF.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flSaldoIF";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Saldo Hutang IF / Reimburse", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from ifptg_m where kode_lokasi='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode PP","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_kb_report_flSaldoIF.extend(window.portalui_childForm);
window.app_saku_kb_report_flSaldoIF.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_pp, nama  from pp where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and tipe='posting'",
											  "select count(kode_pp) from pp where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and tipe='posting'",
											  ["kode_pp","nama"],"and",["Kode","Nama PP"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
											  "select a.nik, a.nama from karyawan a inner join if_m b on a.nik=b.nik_pengaju and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.sg1.getCell(2,0)+"'",
											  "select count(*)      from karyawan a inner join if_m b on a.nik=b.nik_pengaju and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.sg1.getCell(2,0)+"'",
											  ["a.nik","a.nama"],"and",["NIK","Nama"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,2]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from ifptg_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode PP","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["NIK","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("b.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("c.nik",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");

							
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select b.kode_pp,b.nama as nama_pp,c.nik,c.nama as nama_kar,a.no_if,a.no_kas,a.keterangan,a.akun_if,a.nilai,"+
				          "a.nilai-ifnull(y.hutawal,0)+ifnull(z.bayarawal,0) as saldoawal,ifnull(yy.hutnow,0) as hutnow,ifnull(zz.bayarnow,0) as bayarnow,"+
						  "a.nilai-ifnull(y.hutawal,0)+ifnull(z.bayarawal,0)-ifnull(yy.hutnow,0)+ifnull(zz.bayarnow,0) as saldoakhir "+						  
						  "from if_m a "+
						  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						  "	  inner join karyawan c on a.nik_pengaju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						  "           left outer join (select no_if,kode_lokasi, sum(case when no_ifptg=concat(no_del,'r') then nilai else nilai end) as hutawal "+
						  "                            from ifptg_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_if,kode_lokasi) y on y.no_if=a.no_if and y.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select k.no_if,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarawal "+
						  "                            from kas_d i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi "+
						  "                                         inner join ifptg_m k on i.no_bukti=k.no_ifptg and i.kode_lokasi=k.kode_lokasi "+
						  "                            where i.kode_lokasi='"+this.sg1.getCell(2,0)+"' and j.periode<'"+this.sg1.getCell(2,1)+"' group by k.no_if,i.kode_lokasi) z on z.no_if=a.no_if and z.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select no_if,kode_lokasi, sum(case when no_ifptg=concat(no_del,'r') then nilai else nilai end) as hutnow "+
						  "                            from ifptg_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_if,kode_lokasi) yy on yy.no_if=a.no_if and yy.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select k.no_if,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarnow "+
						  "                            from kas_d i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi "+
						  "                                         inner join ifptg_m k on i.no_bukti=k.no_ifptg and i.kode_lokasi=k.kode_lokasi "+
						  "                            where i.kode_lokasi='"+this.sg1.getCell(2,0)+"' and j.periode='"+this.sg1.getCell(2,1)+"' group by k.no_if,i.kode_lokasi) zz on zz.no_if=a.no_if and zz.kode_lokasi=a.kode_lokasi "+
						  this.filter+"  order by b.kode_pp,a.no_if ";   
				this.scriptSqlCount = "select count(*) "+
						  "from if_m a "+
						  "	  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						  "	  inner join karyawan c on a.nik_pengaju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						  "           left outer join (select no_if,kode_lokasi, sum(case when no_ifptg=concat(no_del,'r') then nilai else nilai end) as hutawal "+
						  "                            from ifptg_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<'"+this.sg1.getCell(2,1)+"' group by no_if,kode_lokasi) y on y.no_if=a.no_if and y.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select k.no_if,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarawal "+
						  "                            from kas_d i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi "+
						  "                                         inner join ifptg_m k on i.no_bukti=k.no_ifptg and i.kode_lokasi=k.kode_lokasi "+
						  "                            where i.kode_lokasi='"+this.sg1.getCell(2,0)+"' and j.periode<'"+this.sg1.getCell(2,1)+"' group by k.no_if,i.kode_lokasi) z on z.no_if=a.no_if and z.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select no_if,kode_lokasi, sum(case when no_ifptg=concat(no_del,'r') then nilai else nilai end) as hutnow "+
						  "                            from ifptg_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' group by no_if,kode_lokasi) yy on yy.no_if=a.no_if and yy.kode_lokasi=a.kode_lokasi "+
						  "           left outer join (select k.no_if,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarnow "+
						  "                            from kas_d i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi "+
						  "                                         inner join ifptg_m k on i.no_bukti=k.no_ifptg and i.kode_lokasi=k.kode_lokasi "+
						  "                            where i.kode_lokasi='"+this.sg1.getCell(2,0)+"' and j.periode='"+this.sg1.getCell(2,1)+"' group by k.no_if,i.kode_lokasi) zz on zz.no_if=a.no_if and zz.kode_lokasi=a.kode_lokasi "+
						  this.filter+"  order by b.kode_pp,a.no_if ";   
						
				this.title = new server_util_arrayList({items:["Kode PP","Nama PP","NIK IF","Nama Karyawan","No. IF","No KB","Keterangan","Akun IF","Nilai IF","Saldo Awal IF","Nilai SPB Reim","Nilai Pembayaran","Saldo Akhir IF"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","N","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_kb_report_flSaldoIF]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);
			break;
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR IMPREST FUND <br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
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
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
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