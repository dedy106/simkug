window.app_saku3_report_siaga_hris_rekrut_flPelamar = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_rekrut_flPelamar.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_hris_rekrut_flPelamar";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Pelamar", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kota","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Pendidikan","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["NIP","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku3_report_siaga_hris_rekrut_flPelamar.extend(window.childForm);
window.app_saku3_report_siaga_hris_rekrut_flPelamar.implement({
	doEllipseClick: function(sender, col, row){
		try{		

			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"]);
			}
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Pendidikan",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_didik, nama from gr_status_didik where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_didik","nama"],"and",["Kode","Nama"]);
			}
			if (row === 2)
			{
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");
				this.filterRep.ListDataSGFilter(this, "Data Pelamar",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nip, a.nama from gr_rekrut_pelamar a "+this.filter,
													"select count(*) from gr_rekrut_pelamar a "+this.filter,
													["a.nip","a.nama"],"and",["NIP","Nama"]);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6],["123","123","13","13","123","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6],[2,2,0,0,2,2,0]);


		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Pelamar","Keluarga"));
		}		
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["NIP","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jenis Laporan","=","Pelamar"]);				
			}
			else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.nip",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and");				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();
				if (this.sg1.getCell(2,3)=="Pelamar")
				{
					var sql = "select a.nip, a.nama,a.no_ktp, a.tempat, date_format(a.tgl_lahir,'%d/%m/%Y') as tanggal , a.alamat, c.nama as kota, b.nama as prov,kodepos, a.no_telp, a.no_hp, "+
							  "a.sex, a.email, a.gol_darah, a.hobi, d.nama as pendidikan, a.jurusan, a.univ, a.ipk "+
							  "from gr_rekrut_pelamar  a "+
							  "inner join gr_prov b on a.kode_prov=b.kode_prov  "+
							  "inner join gr_kota c on a.kode_kota=c.kode_kota  "+
							  "inner join gr_status_didik d on a.sts_didik=d.sts_didik and a.kode_lokasi=d.kode_lokasi "+
							  this.filter +" order by a.nip" ;
					this.scriptSqlCount = "select count(a.nip) "+
							  "from gr_rekrut_pelamar  a "+
							  "inner join gr_prov b on a.kode_prov=b.kode_prov  "+
							  "inner join gr_kota c on a.kode_kota=c.kode_kota  "+
							  "inner join gr_status_didik d on a.sts_didik=d.sts_didik and a.kode_lokasi=d.kode_lokasi "+this.filter; 	
					this.title = new server_util_arrayList({items:["NIP","Nama","No KTP","Tempat","Tgl Lahir","Alamat","Kota","Provinsi","Kodepos","Telp","HP","L/P","Email","Gol Darah","Hobi","Pendidikan","Jurusan","Universitas","IPK"]});
					this.widthTable = new server_util_arrayList({items:[60,200,100,100,60,200,120,120,60,80,80,80,100,40,100,120,120,120,40]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"]});
				}
				else
				{
					var sql = "select a.nip,a.nama,c.nama as sts_kel,b.nama as nama_kel,b.tempat,b.sex,b.institusi "+
							  "from gr_rekrut_pelamar a "+
							  "inner join gr_rekrut_keluarga b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
							  "inner join gr_status_kel c on b.sts_kel=c.sts_kel and a.kode_lokasi=c.kode_lokasi "+this.filter
							  "order by a.nip,b.no_urut ";
					this.scriptSqlCount = "select count(*) "+
										"from gr_rekrut_pelamar a "+
										"inner join gr_rekrut_keluarga b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
										"inner join gr_status_kel c on b.sts_kel=c.sts_kel and a.kode_lokasi=c.kode_lokasi "+this.filter; 
					this.title = new server_util_arrayList({items:["NIP","Nama","Status Keluarga","Nama Keluarga","Tempat","L/P","Institusi"]});
					this.widthTable = new server_util_arrayList({items:[60,200,100,200,150,40,200]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S"]});																
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N"]});
				}
				
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
			systemAPI.alert("[app_saku3_report_siaga_hris_rekrut_flPelamar]::mainButtonClick:"+e);
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
		var judul="LAPORAN "+this.sg1.getCell(2,6).toUpperCase()
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
