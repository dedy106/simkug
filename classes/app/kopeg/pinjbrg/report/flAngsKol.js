window.app_kopeg_pinjbrg_report_flAngsKol = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_report_flAngsKol.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_pinjbrg_report_flAngsKol";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Angsuran Kolektif", 2);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["3","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode as periode from kop_pbrgangs_m where kode_lokasi ='"+this.lokasi+"' and jenis='PBRGKOL' order by periode desc ";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kwitansi","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
	this.pager = 1;
};
window.app_kopeg_pinjbrg_report_flAngsKol.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_report_flAngsKol.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row ===0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_lokasi, nama from lokasi order by kode_lokasi",
										"select count(*) from lokasi order by kode_lokasi",
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
			this.filterRep.ListDataSGFilter(this, "Data Kwitansi",this.sg1, this.sg1.row, this.sg1.col,
										  "select distinct a.no_angs,a.keterangan from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi "+
										  "inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
										  "inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi "+
										  "where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and d.kode_loker like '%"+this.sg1.getCell(2,2)+"' and c.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  "select count(distinct a.no_angs) from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi "+
										  "inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
										  "inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi "+
										  "where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and d.kode_loker like '%"+this.sg1.getCell(2,2)+"' and c.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  ["a.no_angs","a.keterangan"],"and",["No. SPB","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("3","3","13","13","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(2,0,2,2,2,0));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("3","3","13","13","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(3,0,2,2,2,0));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pbrgangs_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' and jenis='PBRGKOL' order by periode desc ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Daftar","Transaksi"]);
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
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Kwitansi","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("e.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("d.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("a.no_angs",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,5);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Transaksi"){
					var sql = "select distinct a.no_angs,date_format(a.tanggal,'%d/%m/%Y') as tglangs,a.no_dokumen,a.keterangan,a.nilai,d.no_kontrak, "+
							"concat(e.nama,'-',d.kode_agg) as nm,c.cicilan_ke,c.npokok,c.nbunga,c.npokok+c.nbunga as tghn,c.npokok+c.nbunga as angs "+
							"from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.jenis='PBRGKOL' "+
							"inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_pbrgbill_m f on f.no_bill = c.no_bill and f.kode_lokasi = c.kode_lokasi and b.tanggal = f.tanggal "+
							"inner join kop_pbrg_m d on b.no_pbrg=d.no_pbrg and b.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg e on d.kode_agg=e.kode_agg and d.kode_lokasi=e.kode_lokasi "+
							this.filter+
							" order by a.no_angs ";
					this.scriptSqlCount = "select count(distinct a.no_angs) "+
							"from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.jenis='PBRGKOL' "+
							"inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_pbrg_m d on b.no_pbrg=d.no_pbrg and b.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg e on d.kode_agg=e.kode_agg and d.kode_lokasi=e.kode_lokasi "+
							this.filter;
					this.title = new server_util_arrayList({items:["No. Kontrak","Nama","Cicilan Ke","Pokok","Jasa","Tagihan","Nilai Angsuran"]});
					this.widthTable = new server_util_arrayList({items:[80,150,70,90,90,90,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}else{
					var sql = "select distinct a.no_angs,date_format(a.tanggal,'%d/%m/%Y') as tglangs,a.no_dokumen,a.keterangan,a.nilai "+
							"from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.jenis='PBRGKOL' "+
							"inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_pbrg_m d on b.no_pbrg=d.no_pbrg and b.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg e on d.kode_agg=e.kode_agg and d.kode_lokasi=e.kode_lokasi "+
							this.filter+
							" group by a.no_angs order by a.no_angs ";
					this.scriptSqlCount = "select count(distinct a.no_angs) "+
							"from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.jenis='PBRGKOL' "+
							"inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_pbrg_m d on b.no_pbrg=d.no_pbrg and b.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg e on d.kode_agg=e.kode_agg and d.kode_lokasi=e.kode_lokasi "+
							this.filter+" group by a.no_angs ";
					this.title = new server_util_arrayList({items:["No. Kwitansi","Tanggal","No. Dokumen","Keterangan","Total Angsuran"]});
					this.widthTable = new server_util_arrayList({items:[80,80,100,200,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N"]});
					//this.groupBy = new server_util_arrayList({items:["no_kontrak"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_report_flAngsKol]::mainButtonClick:"+e);
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
		if (this.jenisLap === "Transaksi"){
			var data = this.dbLib.getDataProviderPage(this.sqlScript,page,this.pager,true);			
			var dthtml = this.convertResultToHTML(undefined, data);
		}else
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		if (this.jenisLap === "Transaksi")
			var header = "DAFTAR DETAIL ANGSURAN KOLEKTIF";
		else var header = "DAFTAR ANGSURAN KOLEKTIF";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
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
		  if (this.jenisLap === "Transaksi"){
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
		  }else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_order");				
	      this.viewer.useIframe(upDownHtml(html));
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
		if (result !== undefined)
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
		var table, line, urut=0,total;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_angs){
				first = true;
				no_bill = line.no_angs;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='7'>Total Angsuran</td>"+
						"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
					html += "</table>";
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				total=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Kwitansi</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_angs+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tglangs+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Dokumen</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_dokumen+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total Angsuran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.nilai)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_kontrak" || c === "nm" || c === "cicilan_ke" || c === "npokok" || c === "nbunga" || c === "tghn" || c === "angs"){
					if (c === "npokok" || c === "nbunga" || c === "tghn" || c === "angs")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			total+= parseInt(line.angs);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='7'>Total Angsuran</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});
