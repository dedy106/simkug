window.app_hris_report_rekrut_flJobHistory = function(owner)
{
	if (owner)
	{
		window.app_hris_report_rekrut_flJobHistory.prototype.parent.constructor.call(this,owner);
		this.className = "app_hris_report_rekrut_flJobHistory";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan History Seleksi Pekerjaan", 2);
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Provinsi","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kota","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Gender","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Gol Darah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Pendidikan","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["NIP","All",""])
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
};
window.app_hris_report_rekrut_flJobHistory.extend(window.childForm);
window.app_hris_report_rekrut_flJobHistory.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_prov, nama from gr_prov  ",
													"select count(*) from gr_prov  ",
													["kode_prov","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in")
			}
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in")
			}
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Pendidikan",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_didik, nama from gr_status_didik where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_didik","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in")
			}
			if (row === 5)
			{
				this.filter = this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");
				this.filterRep.ListDataSGFilter(this, "Data Pelamar",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nip, a.nama from gr_rekrut_pelamar a "+this.filter,
													"select count(*) from gr_rekrut_pelamar a "+this.filter,
													["a.nip","a.nama"],"and",["NIP","Nama"], false, this.sg1.cells(1,row) == "in")
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{		
		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123i","123i","13","13","123i","123i"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,0,0,2,2]);
		if (row == 2)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("L","P"));
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("A","AB","B","O"));
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Provinsi","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kota","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Gender","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Gol Darah","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Pendidikan","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["NIP","All",""])
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.nip",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");					
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				var sql = "select a.nip,a.nama,a.sex,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,l.nama as jurusan,a.univ,b.kode_job,c.nama as nama_job,m.nama as job,"+
						"date_format(b.tanggal,'%d/%m/%Y') as tgl_lamaran,a.no_hp,a.email,n.nama as loker,date_format(e.tanggal,'%d/%m/%Y') as tgl1,d.hasil as hasil1, "+
						"	   date_format(g.tanggal,'%d/%m/%Y') as tgl2,f.hasil as hasil2,date_format(i.tanggal,'%d/%m/%Y') as tgl3,h.hasil as hasil3, "+
						"	   date_format(k.tanggal,'%d/%m/%Y') as tgl4,j.hasil as hasil4, cc.nik "+
						"from gr_rekrut_pelamar a "+
						"inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_rekrut_job c on b.kode_job=c.kode_job and b.kode_lokasi=c.kode_lokasi "+
						"inner join gr_status_didik l on a.sts_didik=l.sts_didik and a.kode_lokasi=l.kode_lokasi "+
						"inner join gr_rekrut_media m on b.kode_media=m.kode_media and b.kode_lokasi=m.kode_lokasi "+
						"inner join gr_loker n on c.kode_loker=n.kode_loker and c.kode_lokasi=n.kode_lokasi "+
						"left join gr_karyawan cc on cc.nip = a.nip and a.kode_lokasi = cc.kode_lokasi "+
						"left join gr_rekrut_seleksi_d d on b.nip=d.nip and b.kode_job=d.kode_job and b.kode_lokasi=d.kode_lokasi and d.kode_proses='1' and d.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m e on d.no_seleksi=e.no_seleksi and d.kode_lokasi=e.kode_lokasi "+
						"left join gr_rekrut_seleksi_d f on b.nip=f.nip and b.kode_job=f.kode_job and b.kode_lokasi=f.kode_lokasi and f.kode_proses='2' and f.flag_seleksi<>'X'"+
						"left join gr_rekrut_seleksi_m g on f.no_seleksi=g.no_seleksi and f.kode_lokasi=g.kode_lokasi "+
						"left join gr_rekrut_seleksi_d h on b.nip=h.nip and b.kode_job=h.kode_job and b.kode_lokasi=h.kode_lokasi and h.kode_proses='3' and h.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m i on h.no_seleksi=i.no_seleksi and h.kode_lokasi=i.kode_lokasi "+
						"left join gr_rekrut_seleksi_d j on b.nip=j.nip and b.kode_job=j.kode_job and b.kode_lokasi=j.kode_lokasi and j.kode_proses='4' and j.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m k on j.no_seleksi=k.no_seleksi and j.kode_lokasi=k.kode_lokasi "+this.filter+
						"order by a.nip	";
				
				this.scriptSqlCount =  "select count(a.nip)  "+
						"from gr_rekrut_pelamar a "+
						"inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_rekrut_job c on b.kode_job=c.kode_job and b.kode_lokasi=c.kode_lokasi "+
						"left join gr_rekrut_seleksi_d d on b.nip=d.nip and b.kode_job=d.kode_job and b.kode_lokasi=d.kode_lokasi and d.kode_proses='1' and d.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m e on d.no_seleksi=e.no_seleksi and d.kode_lokasi=e.kode_lokasi "+
						"left join gr_rekrut_seleksi_d f on b.nip=f.nip and b.kode_job=f.kode_job and b.kode_lokasi=f.kode_lokasi and f.kode_proses='2' and f.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m g on f.no_seleksi=g.no_seleksi and f.kode_lokasi=g.kode_lokasi "+
						"left join gr_rekrut_seleksi_d h on b.nip=h.nip and b.kode_job=h.kode_job and b.kode_lokasi=h.kode_lokasi and h.kode_proses='3' and h.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m i on h.no_seleksi=i.no_seleksi and h.kode_lokasi=i.kode_lokasi "+
						"left join gr_rekrut_seleksi_d j on b.nip=j.nip and b.kode_job=j.kode_job and b.kode_lokasi=j.kode_lokasi and j.kode_proses='4' and j.flag_seleksi<>'X' "+
						"left join gr_rekrut_seleksi_m k on j.no_seleksi=k.no_seleksi and j.kode_lokasi=k.kode_lokasi "+this.filter; 
				this.title = new server_util_arrayList({items:["NIP","Nama","L/P","Tgl Lahir","Jurusan","Institusi","Kode Job","Nama Job","Sumber Kandidat","Tgl Lamaran","No HP","Email","Lokasi Kerja","Tgl Seleksi Administrasi","Hasil Seleksi Administrasi","Tgl Wawancara 1","Hasil Wawancara 1","Tgl Psikotes","Hasil Psikotes","Tgl Wawancara 2","Hasil Wawancara 2","NIK"]});
				this.widthTable = new server_util_arrayList({items:[60,200,30,60,100,150,80,150,60,80,80,150,80,100,80,100,80,100,60,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"]});																
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
				//this.groupHeader = new server_util_arrayList({items:["kode_lokfa"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false, this.groupBy, undefined, this.groupHeader);
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.lebar = 0;
				for (var i in this.widthTable.objList)
				{
					this.lebar += this.widthTable.get(i);
				}
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hris_report_rekrut_flJobHistory]::mainButtonClick:"+e);
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
		var footer="* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan";
		var judul="LAPORAN HISTORY LOWONGAN";
		var html="<table width='"+this.lebar+"' border='0' cellspacing='2' cellpadding='1'>";
		html+="<tr><td align='center' class='judul_laporan'>"+this.app._namalokasi.toUpperCase()+"</td></tr>";
		html+="<tr><td align='center' class='judul_laporan'> "+judul+"</td></tr>";
		html+="<tr><td align='center'>"+dthtml+"</td></tr>";
		html+="<tr><td align='left' style='{font-size:9;}'>"+footer+"</td></tr>";
		html+="</table>";
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
