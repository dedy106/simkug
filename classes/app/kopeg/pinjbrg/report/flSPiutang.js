window.app_kopeg_pinjbrg_report_flSPiutang = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_report_flSPiutang.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_pinjbrg_report_flSPiutang";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar Saldo Piutang Kredit Barang", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
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
	this.lokasi=this.app._lokasi;this.getPeriode="select distinct periode from kop_pbrgangs_m where kode_lokasi ='"+this.lokasi+"' union select periode from periode where kode_lokasi='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_pinjbrg_report_flSPiutang.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_report_flSPiutang.implement({
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
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,0,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[3,0,2]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pbrgangs_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' union select periode from periode where kode_lokasi='"+this.lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("c.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.getCell(2,1) == "201003") var vWhere = "";
				else var vWhere = " and a.nilai+ifnull(xx.nbill,0)-ifnull(yy.p_angs+yy.j_angs,0) > 0 ";
				var sql = "select a.kode_agg,c.nama,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih,a.akun_piutang,a.akun_pjasa,a.nilai,a.lama_bayar, "+
						  " case when a.periode = '"+this.sg1.getCell(2,1)+"' then 0 else a.nilai+ifnull(xx.nbill,0)-ifnull(yy.p_angs+yy.j_angs,0) end as sawal, "+
						  " case when a.periode = '"+this.sg1.getCell(2,1)+"' then a.nilai+ifnull(xx.nbill,0)-ifnull(yy.p_angs+yy.j_angs,0) else 0 end as blnin, "+
						  " ifnull(b.cicilan_ke,case when date_format(a.tgl_tagih,'%Y%m') > '"+this.sg1.getCell(2,1)+"' then 0 else a.lama_bayar end) as cicilan_ke,ifnull(ff.jml_byr,0) as jml_byr,ifnull(zz.nbillnow,0) as nbillnow,"+
						  "ifnull(ee.bpokok+ee.bbunga,0) as nangs,ifnull(ee.bpokok,0) as pokok,ifnull(ee.bbunga,0) as jasa,"+                                                                            						  
						  "a.nilai-ifnull(dd.p_angs,0) + (case when ifnull(bb.nbill,0)-ifnull(dd.j_angs,0) > 0 then 0 else ifnull(bb.nbill,0) - ifnull(dd.j_angs,0) end) as sakpokok,"+
						  "(case when ifnull(bb.nbill,0)-ifnull(dd.j_angs,0) > 0 then ifnull(bb.nbill,0)-ifnull(dd.j_angs,0) else 0 end)  as sakjasa, "+
						  "a.nilai+ifnull(bb.nbill,0)-ifnull(dd.p_angs+dd.j_angs,0) as sakhir "+ 
						  "from kop_pbrg_m a "+						  
						  "	  inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "	  left outer join kop_pbrg_sch b on a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi and date_format(b.tgl_angs,'%Y%m')='"+this.sg1.getCell(2,1)+"' "+
						  "   left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
						  "                    from kop_pbrgbill_d x inner join kop_pbrgbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')<'"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) xx on xx.no_kontrak=a.no_kontrak and xx.no_pbrg=a.no_pbrg and xx.kode_lokasi=a.kode_lokasi "+						  
						  "   left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbillnow "+
						  "                    from kop_pbrgbill_d x inner join kop_pbrgbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')='"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) zz on zz.no_kontrak=a.no_kontrak and zz.no_pbrg=a.no_pbrg and zz.kode_lokasi=a.kode_lokasi "+						  						  						  
						  "	  left outer join (select no_kontrak,no_pbrg,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as p_angs,"+
						  "                    sum(case dc when 'D' then nbunga else -nbunga end) as j_angs "+ 
						  "					   from kop_pbrgangs_d "+
						  "					   where date_format(tanggal,'%Y%m')<'"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pbrg,kode_lokasi) yy on a.no_pbrg=yy.no_pbrg and a.no_kontrak=yy.no_kontrak and a.kode_lokasi=yy.kode_lokasi "+
						  "   left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
						  "                    from kop_pbrgbill_d x inner join kop_pbrgbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) bb on bb.no_kontrak=a.no_kontrak and bb.no_pbrg=a.no_pbrg and bb.kode_lokasi=a.kode_lokasi "+
						  "	  left outer join (select no_kontrak,no_pbrg,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as p_angs,"+
						  "                    sum(case dc when 'D' then nbunga else -nbunga end) as j_angs "+ 
						  "					   from kop_pbrgangs_d "+
						  "					   where date_format(tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pbrg,kode_lokasi) dd on a.no_pbrg=dd.no_pbrg and a.no_kontrak=dd.no_kontrak and a.kode_lokasi=dd.kode_lokasi "+						  
						  "	  left outer join (select no_kontrak,no_pbrg,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as bpokok,sum(case dc when 'D' then nbunga else -nbunga end) as bbunga "+
						  "					   from kop_pbrgangs_d "+
						  "					   where date_format(tanggal,'%Y%m')='"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pbrg,kode_lokasi) ee on a.no_pbrg=ee.no_pbrg and a.no_kontrak=ee.no_kontrak and a.kode_lokasi=ee.kode_lokasi "+					      
						  "   left outer join (select no_kontrak,no_pbrg,kode_lokasi,count(no_pbrg) as jml_byr "+
						  "                    from kop_pbrgangs_d "+
						  "                    where date_format(tanggal,'%Y%m')<='"+this.sg1.getCell(2,1)+"' and dc= 'D'	"+
						  "                    group by no_kontrak,no_pbrg,kode_lokasi) ff on a.no_pbrg=ff.no_pbrg and a.no_kontrak=ff.no_kontrak and a.kode_lokasi=ff.kode_lokasi "+						  
						  this.filter+" and a.periode <='"+this.sg1.getCell(2,1)+"' and a.progress = '2' "+vWhere+" order by a.kode_agg,a.no_pbrg ";   
				this.scriptSqlCount = "select count(*) "+
						  "from kop_pbrg_m a "+						  
						  "	  inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi "+
						  "   left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
						  "                    from kop_pbrgbill_d x inner join kop_pbrgbill_m y on x.no_bill=y.no_bill and x.kode_lokasi=y.kode_lokasi "+
                          "                    where date_format(y.tanggal,'%Y%m')<'"+this.sg1.getCell(2,1)+"' "+	
                          "                    group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) xx on xx.no_kontrak=a.no_kontrak and xx.no_pbrg=a.no_pbrg and xx.kode_lokasi=a.kode_lokasi "+						  						  
						  "	  left outer join (select no_kontrak,no_pbrg,kode_lokasi,sum(case dc when 'D' then npokok else -npokok end) as p_angs,"+
						  "                    sum(case dc when 'D' then nbunga else -nbunga end) as j_angs "+ 
						  "					   from kop_pbrgangs_d "+
						  "					   where date_format(tanggal,'%Y%m')<'"+this.sg1.getCell(2,1)+"' "+
						  "					   group by no_kontrak,no_pbrg,kode_lokasi) yy on a.no_pbrg=yy.no_pbrg and a.no_kontrak=yy.no_kontrak and a.kode_lokasi=yy.kode_lokasi "+
						  this.filter+" and a.periode <='"+this.sg1.getCell(2,1)+"' and a.progress = '2'  "+vWhere+" ";
						
				this.title = new server_util_arrayList({items:["Anggota","Nama","No. Kontrak","Keterangan","Tgl Kontrak","Tgl Awal Angs","Akun Pokok","Akun Jasa","Nilai Kredit","Lama","Saldo Awal Baki","Kredit Bulan ini","Bill Ke","Byr Ke","Nilai Bill","Angsuran","Angs. Pokok","Angs. Jasa","Saldo Pokok","Saldo Jasa","Saldo Akhir Baki"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","N","S","N","S","S","N","N","N","N","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_report_flSPiutang]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR SALDO PIUTANG KREDIT BARANG<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
