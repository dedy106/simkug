window.app_portal_report_flOrder = function(owner)
{
	if (owner)
	{
		window.app_portal_report_flOrder.prototype.parent.constructor.call(this,owner);
		this.className = "app_portal_report_flOrder";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Pemesanan Barang", 2);
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
	this.getPeriode="select distinct periode as periode from portal_order_m where kode_lokasi ='"+this.lokasi+"' order by periode desc ";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Sales","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Order","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Daftar"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_portal_report_flOrder.extend(window.portalui_childForm);
window.app_portal_report_flOrder.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_cust,nama from portal_cust where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from portal_cust where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  ["kode_cust","nama"],"where",["Kode","Nama Customer"]);
		}
		if (row === 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Sales",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_sales,nama from portal_sales where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from portal_sales where kode_lokasi='"+this.sg1.getCell(2,0)+"' ",
									  ["kode_sales","nama"],"where",["Kode","Nama Sales"]);
		}
		if (row === 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data No. Order",this.sg1, this.sg1.row, this.sg1.col,
									  "select no_order,keterangan from portal_order_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' and kode_cust like '%"+this.sg1.getCell(2,2)+"' and sales like '%"+this.sg1.getCell(2,3)+"' ",
									  "select count(*) from portal_order_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' and kode_cust like '%"+this.sg1.getCell(2,2)+"' and sales like '%"+this.sg1.getCell(2,3)+"' ",
									  ["no_order","keterangan"],"where",["No. Order","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,0,2,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[3,0,2,2,2,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from portal_order_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
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
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Sales","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Order","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Daftar"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.sales",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_order",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,5);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Transaksi"){
					var sql = "select a.no_order,date_format(a.tanggal,'%e/%m/%Y') as tgl,c.nama as cbg,d.nama as kota,e.nama as cust,f.nama as sales,a.keterangan, "+
							"b.kode_produk,g.nama as nmbrg,b.harga,b.diskon,b.harga * (100 - b.diskon)/100 as hargadisc,b.jumlah,b.bonus,(b.jumlah*(b.harga * (100 - b.diskon) / 100)) as subtot "+
							"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order and a.kode_lokasi=b.kode_lokasi "+
							"inner join portal_produk g on b.kode_produk=g.kode_produk and b.kode_lokasi=g.kode_lokasi "+
                            "left outer join portal_cabang c on a.cabang=c.kode_cab and a.kode_lokasi=c.kode_lokasi "+
							"left outer join portal_kota d on a.kota=d.kode_kota "+
							"left outer join portal_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"left outer join portal_sales f on a.sales=f.kode_sales and a.kode_lokasi=f.kode_lokasi "+
							this.filter+
							" order by a.no_order ";
					this.scriptSqlCount = "select count(*) "+
							"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order and a.kode_lokasi=b.kode_lokasi  "+
							"inner join portal_produk g on b.kode_produk=g.kode_produk and b.kode_lokasi=g.kode_lokasi "+
                            "left outer join portal_cabang c on a.cabang=c.kode_cab and a.kode_lokasi=c.kode_lokasi "+
							"left outer join portal_kota d on a.kota=d.kode_kota "+
							"left outer join portal_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"left outer join portal_sales f on a.sales=f.kode_sales and a.kode_lokasi=f.kode_lokasi "+
							this.filter;
					this.title = new server_util_arrayList({items:["Kode Barang","Nama","Harga","Diskon","Harga Diskon","Jumlah","Bonus","Sub Total"]});
					this.widthTable = new server_util_arrayList({items:[80,150,100,80,100,80,80,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}else{
					var sql = "select a.no_order,date_format(a.tanggal,'%e/%m/%Y') as tgl,c.nama as cbg,d.nama as kota,e.nama as cust,f.nama as sales,a.keterangan,sum(b.jumlah) as jumlah, sum(b.bonus) as bonus,sum(b.harga*b.jumlah) as total "+
							"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order and a.kode_lokasi=b.kode_lokasi  "+
							"left outer join portal_cabang c on a.cabang=c.kode_cab and a.kode_lokasi=c.kode_lokasi "+
							"left outer join portal_kota d on a.kota=d.kode_kota "+
							"left outer join portal_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"left outer join portal_sales f on a.sales=f.kode_sales and a.kode_lokasi=f.kode_lokasi "+this.filter+
							" group by a.no_order order by a.no_order ";
					this.scriptSqlCount = "select count(*) "+
							"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order and a.kode_lokasi=b.kode_lokasi  "+
							"left outer join portal_cabang c on a.cabang=c.kode_cab and a.kode_lokasi=c.kode_lokasi "+
							"left outer join portal_kota d on a.kota=d.kode_kota "+
							"left outer join portal_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"left outer join portal_sales f on a.sales=f.kode_sales and a.kode_lokasi=f.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["No. Order","Tanggal","Cabang","Kota","Customer","Sales","Keterangan","Jumlah","Bonus","Harga Total"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N","N","N"]});
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
			systemAPI.alert("[app_portal_report_flOrder]::mainButtonClick:"+e);
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
			var header = "DAFTAR DETAIL PEMESANAN BARANG";
		else var header = "DAFTAR PEMESANAN BARANG";
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
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_order");				
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
				var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
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
			if (no_bill != line.no_order){
				first = true;
				no_bill = line.no_order;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='6'>Total Harga</td>"+
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Pemesanan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_order+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Cabang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.cbg+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Kota</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kota+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Customer</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.cust+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Sales</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.sales+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "kode_produk" || c === "nmbrg" || c === "diskon" || c === "hargadisc" || c === "jumlah" || c === "harga" || c === "bonus" || c === "subtot"){
					if (c === "jumlah" || c === "harga" || c === "bonus" || c === "subtot" || c === "diskon" || c === "hargadisc")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			total+= parseInt(line.subtot);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='8'>Total Harga</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});
