window.app_saku_inventory_report_flMutStok = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flMutStok.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flMutStok";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Mutasi Stok Barang", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,0,2,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from inv_dt where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Barang","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flMutStok.extend(window.portalui_childForm);
window.app_saku_inventory_report_flMutStok.implement({
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
			this.filterRep.ListDataSGFilter(this, "Data Barang",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_brg, nama from inv_brg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from inv_brg where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_brg","nama"],"and",["Kode","Nama Barang"]);
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
			this.dbLib.setItemsFromSQL("select distinct periode from inv_dt where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Barang","All",""]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_brg",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select a.periode,a.kode_brg,b.nama as nmbrg,concat(a.kode_lokasi,'-',z.nama) as nmlok,ifnull(c.nilai,0) as s_awal,a.no_bukti, "+
						"date_format(a.tanggal,'%d/%m/%Y') as tgl,a.modul,ifnull(d.nilai,0) as debet,ifnull(e.nilai,0) as kredit, "+
						"ifnull(d.nilai,0)-ifnull(e.nilai,0) as balance "+
						"from inv_dt a "+
						"inner join inv_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						"inner join lokasi z on a.kode_lokasi=z.kode_lokasi "+
						"left join (select kode_brg,kode_lokasi,modul,sum(case when dc='D' then jumlah else -jumlah end) as nilai "+
						"	from inv_dt "+
						"	where periode<'"+this.sg1.getCell(2,1)+"' "+
						"	group by kode_brg) c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
						"left join (select kode_brg,kode_lokasi,jumlah as nilai,modul "+
						"	from inv_dt "+
						"	where periode='"+this.sg1.getCell(2,1)+"' and dc='D') "+
						"  d on a.kode_brg=d.kode_brg and a.kode_lokasi=d.kode_lokasi and a.modul=d.modul "+
						"left join (select kode_brg,kode_lokasi,jumlah as nilai,modul "+
						"	from inv_dt "+
						"	where periode='"+this.sg1.getCell(2,1)+"' and dc='C') "+
						"  	e on a.kode_brg=e.kode_brg and a.kode_lokasi=e.kode_lokasi and a.modul=e.modul "+this.filter+
						" order by a.periode,a.kode_brg,a.tanggal ";
				this.scriptSqlCount = "select count(*) "+
						"from inv_dt a "+
						"inner join inv_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["No. Bukti","Tanggal","Modul","Debet","Kredit","Balance"]});
				this.widthTable = new server_util_arrayList({items:[100,100,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N"]});
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
			systemAPI.alert("[app_saku_inventory_report_flMutStok]::mainButtonClick:"+e);
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
		var header = "LAPORAN MUTASI STOK BARANG";
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
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_mutstok");
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_mutstok");				
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
		var table, line, urut=0;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_retur){
				first = true;
				no_bill = line.no_retur;
				if (htmlHeader !== ""){
					html+="<tr align='right'><td class='isi_laporan' colspan='4'>Mutasi</td>"+
							"<td class='isi_laporan'>"+floatToNilai(totD)+"</td>"+
							"<td class='isi_laporan'>"+floatToNilai(totK)+"</td>"+
							"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
					html+="<tr align='right'><td class='isi_laporan' colspan='6'>Saldo Akhir</td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot+parseInt(line.s_awal))+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				var tot=0,totD=0,totK=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr align='right'><td class='isi_laporan' colspan='6'>Saldo Akhir</td>"+
						"<td class='isi_laporan'>"+floatToNilai(parseInt(line.s_awal))+"</td></tr>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Periode</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.periode+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Kode Barang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kode_brg+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nama Barang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nmbrg+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Lokasi</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nmlok+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_bukti" || c === "tgl" || c === "modul" || c === "debet" || c === "kredit" || c === "balance"){
					if (c === "debet" || c === "kredit" || c === "balance")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			totD += parseInt(line.debet);
			totK += parseInt(line.kredit);
			tot += parseInt(line.balance);
			html += "</tr>";
			first = false;
		}
		html+="<tr align='right'><td class='isi_laporan' colspan='4'>Mutasi</td>"+
			"<td class='isi_laporan'>"+floatToNilai(totD)+"</td>"+
			"<td class='isi_laporan'>"+floatToNilai(totK)+"</td>"+
			"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
		html+="<tr align='right'><td class='isi_laporan' colspan='6'>Saldo Akhir</td>"+
			"<td class='isi_laporan'>"+floatToNilai(tot+parseInt(line.s_awal))+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});