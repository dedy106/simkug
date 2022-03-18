window.app_kopeg_pinjaman_report_flTunggakan = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjaman_report_flTunggakan.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_pinjaman_report_flTunggakan";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Saldo Piutang Pinjaman", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from kop_pinjbill_m where kode_lokasi ='"+this.lokasi+"'  union select periode from periode where kode_lokasi='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Sumber Dana","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Anggota","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_pinjaman_report_flTunggakan.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_report_flTunggakan.implement({
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
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_loker, nama from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from kop_loker where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_loker","nama"],"and",["Kode","Nama Loker"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Sumber Dana",this.sg1, this.sg1.row, this.sg1.col,
											  "select no_bukti,keterangan from kop_dana_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  "select count(*) from kop_dana_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  ["no_bukti","keterangan"],"and",["No. Dana","Keterangan"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Anggota",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_agg, nama from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  "select count(*) from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"'",
											  ["kode_agg","nama"],"and",["Kode Agg","Keterangan"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,2]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pinjangs_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' union select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Sumber Dana","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Anggota","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("c.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_dana",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_agg",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.getCell(2,1) == "201003") var vWhere = "";
				else var vWhere = " and a.nilai+ifnull(xx.nbunga,0)-ifnull(yy.p_angs+yy.j_angs,0) > 0 ";
				var sql = "select a.no_dana,gg.nama as nama_bank,a.kode_agg,c.nama,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,"+
						  " date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih,a.akun_piutang,a.akun_pjasa,a.nilai,a.lama_bayar "+
						  //", xx.npokok - ifnull(yy.p_angs,0) as spokok, xx.nbunga - ifnull(yy.j_angs,0) as sbunga, xx.npokok + xx.nbunga - ifnull(p_angs,0) - ifnull(j_angs,0) as saldo "+ 
						  "from kop_pinj_m a "+						  
						  "	  inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "   inner join kop_dana_m hh on a.no_dana=hh.no_bukti and a.kode_lokasi=hh.kode_lokasi "+
						  "   inner join vendor gg on hh.kode_vendor=gg.kode_vendor and gg.kode_lokasi=hh.kode_lokasi "+						  
						  
						  "                  inner join kop_pinj_spb ic on ic.no_kontrak=a.no_kontrak and a.kode_lokasi=ic.kode_lokasi "+
						  "                  inner join spb_m id on ic.no_spb=id.no_spb and id.kode_lokasi=ic.kode_lokasi "+
						  "                  inner join kas_d ie on ie.no_bukti=id.no_spb and id.kode_lokasi=ie.kode_lokasi "+
						  "                  inner join kas_m xf on xf.no_kas=ie.no_kas and xf.kode_lokasi=ie.kode_lokasi "														  
						  /*"   inner join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,date_format(y.tanggal,'%Y%m') as periode,"+
						  "						sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbunga, "+
						  " 					sum(case x.dc when 'D' then x.npokok else -x.npokok end) as npokok , count(x.no_bill)  as tot_cicilan "+
						  "                    from kop_pinjbill_d x inner join kop_pinjbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pinj,date_format(y.tanggal,'%Y%m'),x.kode_lokasi) xx on xx.no_kontrak=a.no_kontrak and xx.no_pinj=a.no_pinj and xx.kode_lokasi=a.kode_lokasi "+						                            
						  "	  left outer join (select no_kontrak,no_pinj,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as p_angs, date_format(tanggal,'%Y%m') as periode, "+
						  "                    sum(case dc when 'D' then nbunga else -nbunga end) as j_angs "+ 
						  "					   from kop_pinjangs_d "+
						  "					   where date_format(tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pinj,date_format(tanggal,'%Y%m'),kode_lokasi) yy on a.no_pinj=yy.no_pinj and a.no_kontrak=yy.no_kontrak and a.kode_lokasi=yy.kode_lokasi and yy.periode = xx.periode "+						  
						  this.filter+" and a.periode <='"+this.sg1.getCell(2,1)+"' "+vWhere+" and xx.npokok + xx.nbunga - ifnull(p_angs,0) - ifnull(j_angs,0)  > 0 order by a.kode_agg,a.no_pinj "*/;   
				this.scriptSqlCount = "select count(a.no_dana) from kop_pinj_m a "+						  
						  "	  inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "   inner join kop_dana_m hh on a.no_dana=hh.no_bukti and a.kode_lokasi=hh.kode_lokasi "+
						  "   inner join vendor gg on hh.kode_vendor=gg.kode_vendor and gg.kode_lokasi=hh.kode_lokasi "+						  
						  
						  "                  inner join kop_pinj_spb ic on ic.no_kontrak=a.no_kontrak and a.kode_lokasi=ic.kode_lokasi "+
						  "                  inner join spb_m id on ic.no_spb=id.no_spb and id.kode_lokasi=ic.kode_lokasi "+
						  "                  inner join kas_d ie on ie.no_bukti=id.no_spb and id.kode_lokasi=ie.kode_lokasi "+
						  "                  inner join kas_m xf on xf.no_kas=ie.no_kas and xf.kode_lokasi=ie.kode_lokasi "													  
						  /*"   inner join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,date_format(y.tanggal,'%Y%m') as periode,"+
						  "						sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbunga, "+
						  " 					sum(case x.dc when 'D' then x.npokok else -x.npokok end) as npokok, count(x.no_bill)  as tot_cicilan "+
						  "                    from kop_pinjbill_d x inner join kop_pinjbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pinj,date_format(y.tanggal,'%Y%m'),x.kode_lokasi) xx on xx.no_kontrak=a.no_kontrak and xx.no_pinj=a.no_pinj and xx.kode_lokasi=a.kode_lokasi "+						                            
						  "	  left outer join (select no_kontrak,no_pinj,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as p_angs, date_format(tanggal,'%Y%m') as periode, "+
						  "                    sum(case dc when 'D' then nbunga else -nbunga end) as j_angs "+ 
						  "					   from kop_pinjangs_d "+
						  "					   where date_format(tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pinj,date_format(tanggal,'%Y%m'),kode_lokasi) yy on a.no_pinj=yy.no_pinj and a.no_kontrak=yy.no_kontrak and a.kode_lokasi=yy.kode_lokasi and yy.periode = xx.periode "+						  
						  this.filter+" and a.periode <='"+this.sg1.getCell(2,1)+"' "+vWhere+" and xx.npokok + xx.nbunga - ifnull(p_angs,0) - ifnull(j_angs,0)  > 0 order by a.kode_agg,a.no_pinj "*/;   
				
				this.title = new server_util_arrayList({items:["No Mou","Smbr Dana","Anggota","Nama","No. Kontrak","Keterangan","Tanggal","Tgl Awal Angs","Akun Pokok","Akun Jasa","Pokok Pinjaman","Lama","Tunggakan Pokok","Tunggakan Jasa","Tunggakan"]});
				this.widthTable = new server_util_arrayList({items:[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","N","N","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_report_flTunggakan]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR SALDO PIUTANG PINJAMAN<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
		  var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,undefined,undefined, undefined, undefined,"","",undefined);
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
