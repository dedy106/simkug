window.app_kopeg_simpanan_report_flAngSimp = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_report_flAngSimp.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_simpanan_report_flAngSimp";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Angsuran Simpanan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,177],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["3","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kop_simpangs_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kartu","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No. Angsuran","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_simpanan_report_flAngSimp.extend(window.portalui_childForm);
window.app_kopeg_simpanan_report_flAngSimp.implement({
	doEllipseClick: function(sender, col, row){
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
			this.filterRep.ListDataSGFilter(this, "Data Nasabah",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_agg, nama from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
										  "select count(*) from kop_agg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and kode_loker like '%"+this.sg1.getCell(2,2)+"' ",
										  ["kode_agg","nama"],"and",["Kode","Nama Nasabah"]);
		}
		if (row === 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data No. Kartu Simpanan",this.sg1, this.sg1.row, this.sg1.col,
										  "select a.no_simp, b.nama as kode_simp from kop_simp_m a inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  "select count(*) from kop_simp_m a inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  ["a.no_simp","b.nama"],"and",["Kode","Nama Jenis Simpanan"]);
		}
		if (row === 5)
		{
			this.filterRep.ListDataSGFilter(this, "Data No. Angsuran Simpanan",this.sg1, this.sg1.row, this.sg1.col,
										  "select a.no_angs,a.keterangan from kop_simpangs_m a inner join kop_simpangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi "+
										  "where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and b.no_simp like'%"+this.sg1.getCell(2,4)+"'",
										  "select count(*) from kop_simpangs_m a inner join kop_simpangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi "+
										  "where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and b.no_simp like'%"+this.sg1.getCell(2,4)+"'",
										  ["a.no_angs","a.keterangan"],"and",["Kode","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,0,2,2,2,2]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_simpangs_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kartu","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["No. Angsuran","All",""]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("c.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("b.no_simp",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.no_angs",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.no_angs,a.no_dokumen,a.keterangan,d.nama as nsbah,a.nilai as angs,a.nilai_lain as depo,e.nama as nmapp "+
						"from kop_simpangs_m a inner join kop_simpangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
						"inner join kop_simp_m c on b.no_simp=c.no_simp and b.kode_lokasi=c.kode_lokasi "+
						"inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi "+
						"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter+
						" order by a.no_angs ";
				this.scriptSqlCount = "select count(*) "+
						"from kop_simpangs_m a inner join kop_simpangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
						"inner join kop_simp_m c on b.no_simp=c.no_simp and b.kode_lokasi=c.kode_lokasi "+
						"inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi "+
						"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["No. Kartu","Jenis","No. Bukti","Keterangan","Akun Piutang","Nilai"]});
				this.widthTable = new server_util_arrayList({items:[]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N"]});
				var sqlArr = new server_util_arrayList({items:[sql]});				
				var result = this.dbLib.getMultiDataProvider(sqlArr,true);
				var dthtml = this.convertResultToHTML(result);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_simpanan_report_flAngSimp]::mainButtonClick:"+e);
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
		var data = this.dbLib.getDataProviderPage(this.sqlScript,page,this.pager,true);			
		var dthtml = this.convertResultToHTML(undefined, data);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		this.viewer.preview(dthtml);
		this.allHtml = dthtml;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsSimp");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_angsSimp");				
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
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
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
	    if (col==1)
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
	},
	convertResultToHTML: function(result,data){		
		result = result.result;		
		/*if (this.dokumen === undefined)
			this.dokumen = result;
        else result = this.dokumen;*/
		if (data === undefined)
			table = result[0];			
		else table = data;
		var htmlHeader="",first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut=0,tot;
		var d = new Date();
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			html+="<br /><table width='600' border='1' align='center' cellpadding='0' cellspacing='0' style='border:2px solid #111111'>"+
				  "<tr>"+
					"<td height='455' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					  "<tr>"+
						"<td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
						  "<tr>"+
							"<td width='79%'>&nbsp;</td>"+
							"<td width='18%' align='right' style='border:2px solid #111111; border-top-width:0px; padding:2px' class='istyle18'>ASLI</td>"+
							"<td width='3%'>&nbsp;</td>"+
						  "</tr>"+
						"</table></td>"+
					  "</tr>"+
					  "<tr>"+
						"<td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
						  "<tr>"+
							"<td width='20%' height='109' align='center' valign='middle'><img src='image/banner/kopeg.png' width='88' height='106' /></td>"+
							"<td align='center'><table width='37%' border='1' cellspacing='0' cellpadding='2' bordercolor='#111111'>"+
							  "<tr>"+
								"<td align='center' class='nstyle16' style='border-bottom-width:0px'><u>BUKTI ANGSURAN</u></td>"+
							  "</tr>"+
							  "<tr>"+
								"<td style='border-top-width:0px' align='center' class='istyle18'>No : "+line.no_angs+"</td>"+
							  "</tr>"+
							"</table></td>"+
							"</tr>"+
						"</table></td>"+
						"</tr>"+
					  "<tr>"+
						"<td colspan='3'>&nbsp;</td>"+
						"</tr>"+
					  "<tr class='istyle15'>"+
						"<td width='23%' style='padding:3px'>Telah terima dari </td>"+
						"<td width='1%' align='center' style='padding:2px'>:</td>"+
						"<td width='76%' style='padding:2px'><div style='width:96%; padding:1px; border:1px solid #000000'>"+line.nsbah.toUpperCase()+"</div></td>"+
					  "</tr>"+
					  "<tr>"+
						"<td colspan='3'>&nbsp;</td>"+
						"</tr>"+
					  "<tr class='istyle15'>"+
						"<td style='padding:3px'>Jumlah Uang </td>"+
						"<td style='padding:2px' align='center'>:</td>"+
						"<td style='padding:2px'><div style='width:96%; padding:1px; border:1px solid #000000'>Rp. "+floatToNilai(line.angs)+"</div></td>"+
					  "</tr>"+
					  "<tr>"+
						"<td colspan='3'>&nbsp;</td>"+
						"</tr>"+
					  "<tr  class='istyle15'>"+
						"<td style='padding:3px'>Terbilang</td>"+
						"<td align='center'>:</td>"+
						"<td><div style='width:96%; padding:1px; border:1px solid #000000'>("+terbilang(line.angs)+")</div></td>"+
					  "</tr>"+
					  "<tr class='istyle15'>"+
						"<td colspan='3'>&nbsp;</td>"+
						"</tr>"+
					  "<tr class='istyle15'>"+
						"<td style='padding:3px' valign='top'>Untuk Pembayaran</td>"+
						"<td align='center' valign='top'>:</td>"+
						"<td><div style='width:96%; height:40px; padding:1px; border:1px solid #000000'>"+line.keterangan+"</div></td>"+
					  "</tr>"+
					  "<tr>"+
						"<td height='21' colspan='3'>&nbsp;</td>"+
						"</tr>"+
					  "<tr>"+
						"<td colspan='3'><table width='31%' border='0' align='right' cellpadding='0' cellspacing='0'>"+
						  "<tr>";
						if (d.getMonth()+1 < 10)
							html+="<td class='istyle18'>Bandung, "+d.getDate()+" "+window.monthName["ID"]["0"+(d.getMonth()+1)]+" "+d.getFullYear()+"</td>";
						else html+="<td class='istyle18'>Bandung, "+d.getDate()+" "+window.monthName["ID"][d.getMonth()+1]+" "+d.getFullYear()+"</td>";
					html+="</tr>"+
						  "<tr>"+
							"<td class='istyle18'>Mengetahui,</td>"+
						  "</tr>"+
						  "<tr>"+
							"<td height='66'>&nbsp;</td>"+
						  "</tr>"+
						  "<tr>"+
							"<td  class='istyle18'><u>"+line.nmapp.toUpperCase()+"</u></td>"+
						  "</tr>"+
						"</table></td>"+
						"</tr>"+
					"</table></td>"+
				  "</tr>"+
				"</table><br />";
		}
		return html;
	}
});