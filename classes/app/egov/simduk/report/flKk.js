window.app_egov_simduk_report_flKk = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_report_flKk.prototype.parent.constructor.call(this,owner);
		this.className = "app_egov_simduk_report_flKk";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan KK",2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["13","13","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,2,2,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Provinsi","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Kabupaten","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Kecamatan","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Kelurahan","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode KK","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
};
window.app_egov_simduk_report_flKk.extend(window.portalui_childForm);
window.app_egov_simduk_report_flKk.implement({
	doEllipseClick: function(sender, col, row)
	{
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_propinsi,nama from egov_propinsi ",
									  "select count(*) from egov_propinsi ",
									  ["kode_propinsi","nama"],"where",["Kode","Provinsi"]);
			}
			if (row === 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kabupaten",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_kota,nama from egov_kota where kode_propinsi like '%"+this.sg1.getCell(2,0)+"'",
									  "select count(*) from egov_kota where kode_propinsi like '%"+this.sg1.getCell(2,0)+"'",
									  ["kode_kota","nama"],"and",["Kode","Kabupaten"]);
			}
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kecamatan",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_kecamatan,nama from egov_kecamatan where kode_kota like '%"+this.sg1.getCell(2,1)+"'",
									  "select count(*) from egov_kecamatan where kode_kota like '%"+this.sg1.getCell(2,1)+"'",
									  ["kode_kecamatan","nama"],"and",["Kode","Kecamatan"]);
			}
			if (row === 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kelurahan",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_kelurahan,nama from egov_kelurahan where kode_kecamatan like '%"+this.sg1.getCell(2,2)+"'",
									  "select count(*) from egov_kelurahan where kode_kecamatan like '%"+this.sg1.getCell(2,2)+"'",
									  ["kode_kelurahan","nama"],"and",["Kode","Kelurahan"]);
			}
			if (row === 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data KK",this.sg1, this.sg1.row, this.sg1.col,
									  "select a.no_kk, c.nama from egov_kk_m a "+
									  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
									  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1' and a.kode_kelurahan like '%"+this.sg1.getCell(2,3)+"'",
									  "select count(a.no_kk)  from egov_kk_m a "+
									  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
									  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1' and a.kode_kelurahan like '%"+this.sg1.getCell(2,3)+"'",
									  ["no_kk","nama"],"and",["No KK","Nama Kep. Keluarga"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2,3,4,5],["13","13","13","13","13","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2,3,4,5],[2,2,2,2,2,0]);
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Daftar","Transaksi"]);
		}
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Provinsi","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Kabupaten","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Kecamatan","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Kelurahan","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Kode KK","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				if (this.sg1.getCell(2,5) === "Transaksi")
					this.pager = 1;
				else this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
		    	this.filter = this.filterRep.filterStr("a.no_kk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"where");
				this.filter2=this.sg1.getCell(2,5);
				if (this.filter2 === "Transaksi"){
					this.nama_report="server_report_egov_rptKK";
					this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			    	this.app._mainForm.reportNavigator.rearrange();
			    	this.showFilter = this.filterRep.showFilter(this.sg1);
			    	this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.app._namalokasi,this.filter2);	
					this.page = 1;
					this.allBtn = false;
				}else{
					var sql="select a.no_kk,c.nama as nmkk,a.alamat,a.kode_rt,a.kode_rw,d.nama as desa,e.nama as kec, "+
							"f.nama as kab,g.nama as prov,a.kode_pos,b.nik,c.gender,c.tempat as tmptlhr, "+
							"date_format(c.tgl_lahir,'%d/%m/%Y') as tgllhr,h.nama as agama,i.nama as pddk,j.nama as krj, "+
							"b.status,k.nama as hubkel,b.kode_wn,b.no_paspor,b.no_kitas,c.nama_ayah as ayah,c.nama_ibu as ibu "+
							"from egov_kk_m a inner join egov_kk_d b on a.no_kk=b.no_kk "+
											"inner join egov_akte c on b.no_akte=c.no_akte "+
											"inner join egov_kelurahan d on a.kode_kelurahan=d.kode_kelurahan "+
											"inner join egov_kecamatan e on d.kode_kecamatan=e.kode_kecamatan "+
											"inner join egov_kota f on e.kode_kota=f.kode_kota "+
											"inner join egov_propinsi g on f.kode_propinsi=g.kode_propinsi "+
											"inner join egov_agama h on b.kode_agama=h.kode_agama "+
											"inner join egov_pendidikan i on b.kode_pendidikan=i.kode_pendidikan "+
											"inner join egov_pekerjaan j on b.kode_pekerjaan=j.kode_pekerjaan "+
											"inner join egov_hubkel k on b.kode_hubkel=k.kode_hubkel "+this.filter+
							" order by b.no_urut ";
					this.scriptSqlCount = "select count(*) "+
									"from egov_kk_m a "+this.filter;
					this.title = new server_util_arrayList({items:["No KK","Nama","Alamat","RT","RW","Kelurahan","Kecamatan","Kabupaten","Provinsi","Kode Pos","NIK","Jns Kelamin","Tmpt Lahir","Tgl Lahir","Agama","Pendidikan","Pekerjaan","Status","Status Keluarga","WNI/WNA","No Paspor","No KITAS/KITAO","Ayah","Ibu"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);
					this.sqlScript = sql;
					this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			    	this.app._mainForm.reportNavigator.rearrange();
					this.previewReport(dthtml);
				}
			}
	    }catch(e)
		{
			alert("[app_egov_simduk_report_flKk]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result)
	{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page)
	{
		if (this.filter2==="Transaksi"){
			this.report.preview(this.nama_report,this.filter, page,this.pager, this.showFilter, this.app._namalokasi,this.filter2);
			this.allBtn = false;
		}else{
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
			this.previewReport(dthtml);
		}
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR KK<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender)
	{
	  switch(sender.getName())
	  {
	    case "allBtn" :
			if (this.filter2==="Transaksi"){
				this.page = 1;
				this.allBtn = true;
				this.report.preview(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.app._namalokasi,this.filter2);
			}else{
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
				this.previewReport(dthtml);
			}
	      break;
	    case "pdfBtn" :      
	      if (this.filter2==="Transaksi"){
			this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.filter2));
		  }else{
			var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_KK");				
			this.viewer.useIframe(upDownHtml(html));
		  }
	      break;
	    case "xlsBtn" :
	      if (this.filter2==="Transaksi"){
			this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.app._namalokasi,this.filter2));
		  }else{
			var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_KK");				
	      this.viewer.useIframe(upDownHtml(html));
		  }
	    break; 
		case "PreviewBtn" :        
			if (this.filter2==="Transaksi"){
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi,this.filter2));
			}else{
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.allHtml);
				win.document.close();
			}
		break;			
		case "PrintBtn" :        
			if (this.filter2==="Transaksi"){
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter,this.app._namalokasi,this.filter2));
			}else{
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);
				this.previewReport(dthtml);
				this.viewer.enabledIframe();
		        var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
				winfram.document.open();
				winfram.document.write(loadCSS("server_util_laporan"));
				winfram.document.write(this.allHtml);
				winfram.document.close();
			}
	      try
	      {
	        window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	      }catch(e)
	      {alert(e);}
	      break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  }
	},
	sg1onChange: function(sender, col , row)
	{
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		}
	},
	doRowPerPageChange: function(sender, rowperpage)
	{
		this.pager = rowperpage;
		if (this.filter2==="Transaksi")
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
		else this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});