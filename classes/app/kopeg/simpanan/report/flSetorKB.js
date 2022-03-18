window.app_kopeg_simpanan_report_flSetorKB = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_report_flSetorKB.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_simpanan_report_flSetorKB";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Setoran KB Simpanan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,150],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,127],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kop_simpsetor_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Setoran","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Daftar"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_simpanan_report_flSetorKB.extend(window.portalui_childForm);
window.app_kopeg_simpanan_report_flSetorKB.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data No. Setoran",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_setor,keterangan from kop_simpsetor_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and no_del='-' ",
										  "select count(*) from kop_simpsetor_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and no_del='-' ",
										  ["no_setor","keterangan"],"and",["No Setor","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from kop_simpsetor_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 3)
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
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Setoran","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Daftar"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.no_setor",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,3);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Transaksi"){
					var sql = "select distinct a.no_setor "+							
							"from kop_simpsetor_m a  inner join kop_simpsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.dc='D' "+
							"inner join kop_simpangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi "+
							"inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi "+
							"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter+
							" order by a.no_setor";
					
					this.sqlDet = "select a.no_setor,date_format(a.tanggal,'%e/%m/%Y') as tgl,a.no_dokumen,a.keterangan,e.nama as nm,a.nilai as tot, "+
							"b.no_angs,date_format(c.tanggal,'%e/%m/%Y') as tgl2,d.nama as nmapp,c.keterangan as ket,b.jenis,b.nilai_sls,h.kode_agg, g.nama as nm_agg, f.no_simp, sum(f.nilai) as nilai "+
							"from kop_simpsetor_m a inner join kop_simpsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.dc='D' "+
							"inner join kop_simpangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_simpangs_d f on b.no_angs=f.no_angs and b.kode_lokasi=f.kode_lokasi "+
							"inner join kop_simp_m h on h.no_simp=f.no_simp and b.kode_lokasi=h.kode_lokasi "+
							"inner join kop_agg g on h.kode_agg=g.kode_agg and b.kode_lokasi=g.kode_lokasi "+							
							"inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi "+
							"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi ";							
							
					this.scriptSqlCount = "select count(distinct a.no_setor) "+
							"from kop_simpsetor_m a inner join kop_simpsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.dc='D' "+
							"inner join kop_simpangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi "+
							"inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi "+
							"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["No. Angsuran","Tanggal","Penerima","Keterangan","Jenis","Nilai OE","Kode Agg","Nama Agg","No Kontrak","Nilai Angsuran"]});
					this.widthTable = new server_util_arrayList({items:[80,50,70,150,50,50,100,250,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","S","S","S","N"]});															
					var result = this.dbLib.getDataProviderPage(sql,1,this.pager,true);					
					var dthtml = this.convertResultToHTML(result);
				}else{
					var sql = "select a.no_setor,date_format(a.tanggal,'%e/%m/%Y') as tgl,a.no_dokumen,a.keterangan,e.nama as nm,a.nilai as tot "+
							"from kop_simpsetor_m a inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter+
							" order by a.no_setor ";
					this.scriptSqlCount = "select count(*) "+
							"from kop_simpsetor_m a inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["No. Setoran","Tanggal","No. Dokumen","Keterangan","Penyetor","Total Setoran"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N"]});
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
			systemAPI.alert("[app_kopeg_simpanan_report_flSetorKB]::mainButtonClick:"+e);
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
			var dthtml = this.convertResultToHTML(data);
		}else
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		if (this.jenisLap === "Transaksi")
			var header = "DAFTAR DETAIL SETORAN KB ANGSURAN";
		else var header = "DAFTAR SETORAN KB ANGSURAN";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
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
			  if (this.jenisLap === "Transaksi"){
				var data = this.dbLarge.getDataProvider(this.sqlScript,true);				
				var dthtml = this.convertResultToHTML(data);
			  }else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
			  this.previewReport(dthtml);
			  break;
			case "pdfBtn" :      
			  var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("pdf");			
				html.add(new Date().valueOf()+"_kontrak");				
			  this.viewer.useIframe(upDownHtml(html));
			  break;
			case "xlsBtn" :	
			  var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("xls");			
				html.add(new Date().valueOf()+"_kontrak");				
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
				if (this.jenisLap === "Transaksi"){
					var data = this.dbLarge.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
					var dthtml = this.convertResultToHTML(undefined, data);
				}else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	convertResultToHTML: function(result){		
		if (result){
			var line,dtSetor = [];
			for (var i in result.rs.rows){
				line = result.rs.rows[i];
				dtSetor[dtSetor.length] = "'"+line.no_setor+"'"; 
			}
			result  = this.dbLarge.getDataProvider(this.sqlDet + " where a.no_setor in ("+dtSetor+") "+
				this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
				this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				" group by a.no_setor, a.tanggal, a.no_dokumen, a.keterangan, e.nama, a.nilai, b.no_angs, c.tanggal, d.nama, c.keterangan, b.jenis, b.nilai_sls, h.kode_agg, g.nama, f.no_simp "+
				" order by a.no_setor, b.no_angs ", true);
		}else return "";			
		var table = result;
		var htmlHeader="",first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut=0,total;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_setor){
				first = true;
				no_bill = line.no_setor;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_setor+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl+"</td>";
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Penyetor</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nm+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.tot)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_angs" || c === "tgl2" || c === "nmapp" || c === "ket" || c === "jenis" || c === "nilai_sls" || c === "nilai" || c == "kode_agg" || c == "nm_agg" || c == "no_simp" || c == "nilai_simp"){
					if (c === "nilai_sls" || c === "nilai" || c == "nilai_simp")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			total+= parseFloat(line.nilai);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});
