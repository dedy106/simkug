window.app_saku_inventory_report_flJual = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flJual.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flJual";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Penjualan", 2);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4,5],["3","3","13","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4,5],[2,0,2,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from inv_jual_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Gudang","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flJual.extend(window.portalui_childForm);
window.app_saku_inventory_report_flJual.implement({
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
			this.filterRep.ListDataSGFilter(this, "Data Gudang",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_gudang, nama from inv_gudang where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from inv_gudang where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_gudang","nama"],"and",["Kode","Nama Gudang"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_cust, nama from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
		}
		if (row == 4)
		{
			this.standar.ListDataSGFilter2(this, "Data No. Bukti Penjualan",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_jual, keterangan from inv_jual_m "+
										  this.filterRep.filterStr("kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
										  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from inv_jual_m "+
										  this.filterRep.filterStr("kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
										  this.filterRep.filterStr("kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
										  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
										  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
										  ["no_jual","keterangan"],"and",["No. Bukti","Keterangan"]);
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
			this.dbLib.setItemsFromSQL("select distinct periode from inv_jual_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
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
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Gudang","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Transaksi"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_jual",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				this.jenisLap = "Transaksi";/*this.sg1.getCell(2,5);*/
				var sql = "select a.id,a.nmvend,a.nmgud,a.tgl,a.jenis,a.nodok,a.ket,a.nilai,a.ppn ";
				if (this.jenisLap === "Transaksi")
					sql+=",a.brg,a.nmbrg,a.tipe,a.sat,a.harga,a.stok,a.diskon,a.jumlah,a.bonus,a.subtot ";
				sql+=" from ( "+
					"(select a.no_jual as id,b.nama as nmvend,c.nama as nmgud,date_format(a.tanggal,'%d-%m-%Y') as tgl,d.nama as jenis,a.no_dokumen as nodok,a.keterangan as ket,a.nilai as nilai,a.nilai_ppn as ppn,f.kode_brg as brg,f.nama as nmbrg,f.tipe,f.sat,e.harga,(y.jml+e.jumlah+e.bonus) as stok,e.pdisk as diskon,e.jumlah,e.bonus,round(e.jumlah * (e.harga-(e.harga*e.pdisk/100))) as subtot "+
						"from inv_jual_m a "+
							"inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"inner join inv_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
							"inner join inv_jual_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
							"inner join inv_dt e on a.no_jual=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='JUAL' "+
							"inner join inv_brg f on e.kode_brg=f.kode_brg and e.kode_lokasi=f.kode_lokasi "+
							"left outer join (select kode_gudang,kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as jml "+
											"from inv_dt where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<='"+this.sg1.getCell(2,1)+"' group by kode_brg,kode_lokasi) y on e.kode_gudang=y.kode_gudang and e.kode_brg=y.kode_brg and e.kode_lokasi=y.kode_lokasi "+this.filter+
							" and a.no_del='-' order by id,nmvend,nmgud,tgl) union "+
					"(select a.no_jual as id,b.nama as nmvend,c.nama as nmgud,date_format(a.tanggal,'%d-%m-%Y') as tgl,d.nama as jenis,a.no_dokumen as nodok,a.keterangan as ket,a.nilai as nilai,a.nilai_ppn as ppn,'brg' as brg,e.kode_akun as nmbrg,f.nama as tipe,e.keterangan as harga,case e.dc when 'C' then '+' else '-' end as sat,-1 as stok,-1 as diskon,-1 as jumlah,-1 as bonus,e.nilai as subtot "+
						"from inv_jual_m a "+
							"inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"inner join inv_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
							"inner join inv_jual_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
							"inner join inv_jual_j e on a.no_jual=e.no_jual and a.kode_lokasi=e.kode_lokasi and e.modul='INVJUAL' and e.jenis='BBNJUAL' "+
							"inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi "+this.filter+
							" order by e.nu) "+
					") as a order by a.id ";
				this.scriptSqlCount = "select count(*) "+
					" from ( "+
					"(select a.no_jual as id,b.nama as nmvend,c.nama as nmgud,date_format(a.tanggal,'%d-%m-%Y') as tgl,d.nama as jenis,a.no_dokumen as nodok,a.keterangan as ket,a.nilai as nilai,a.nilai_ppn as ppn,f.kode_brg as brg,f.nama as nmbrg,f.tipe,f.sat,e.harga,(y.jml+e.jumlah+e.bonus) as stok,e.pdisk as diskon,e.jumlah,e.bonus,round(e.jumlah * (e.harga-(e.harga*e.pdisk/100))) as subtot "+
						"from inv_jual_m a "+
							"inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"inner join inv_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
							"inner join inv_jual_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
							"inner join inv_dt e on a.no_jual=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='JUAL' "+
							"inner join inv_brg f on e.kode_brg=f.kode_brg and e.kode_lokasi=f.kode_lokasi "+
							"left outer join (select kode_gudang,kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as jml "+
											"from inv_dt where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<='"+this.sg1.getCell(2,1)+"' group by kode_brg,kode_lokasi) y on e.kode_gudang=y.kode_gudang and e.kode_brg=y.kode_brg and e.kode_lokasi=y.kode_lokasi "+this.filter+
							" and a.no_del='-' order by id,nmvend,nmgud,tgl) union "+
					"(select a.no_jual as id,b.nama as nmvend,c.nama as nmgud,date_format(a.tanggal,'%d-%m-%Y') as tgl,d.nama as jenis,a.no_dokumen as nodok,a.keterangan as ket,a.nilai as nilai,a.nilai_ppn as ppn,'brg' as brg,e.kode_akun as nmbrg,f.nama as tipe,e.keterangan as harga,case e.dc when 'C' then '+' else '-' end as sat,-1 as stok,-1 as diskon,-1 as jumlah,-1 as bonus,e.nilai as subtot "+
						"from inv_jual_m a "+
							"inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"inner join inv_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
							"inner join inv_jual_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
							"inner join inv_jual_j e on a.no_jual=e.no_jual and a.kode_lokasi=e.kode_lokasi and e.modul='INVJUAL' and e.jenis='BBNJUAL' "+
							"inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi "+this.filter+
							" order by e.nu) "+
					") as a ";
				if (this.jenisLap === "Daftar"){
					this.title = new server_util_arrayList({items:["No Invoice","No Kontrak","Customer","Tanggal","No Bill","Keterangan","Nilai"]});			
					this.widthTable = new server_util_arrayList({items:[120, 120, 120,80,120,280,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","D","S","S","N"]});			
					/*this.groupBy = new server_util_arrayList({items:["customer","no_kontrak","no_invoice","tgl"]});*/
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				}else{
					this.title = new server_util_arrayList({items:["Kode Barang","Nama","Tipe","Satuan","Harga","Stok","Diskon","Jumlah","Bonus","Sub Total"]});
					this.widthTable = new server_util_arrayList({items:[80,120,75,75,75,75,75,75,75,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N","N","N"]});
					this.title2 = new server_util_arrayList({items:["Kode Akun","Nama Akun","Keterangan","+/-","Nilai"]});
					this.widthTable2 = new server_util_arrayList({items:[120,250,290,100,100]});
					this.fieldType2 = new server_util_arrayList({items:["S","S","S","S","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});				
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flJual]::mainButtonClick:"+e);
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
			var header = "DAFTAR DETAIL PENJUALAN";
		else var header = "DAFTAR PENJUALAN";
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
			html.add(new Date().valueOf()+"_invoice");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_invoice");				
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
		var html2="";
		var table, line, urut1=0,urut2=0;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.id){
				first = true;
				no_bill = line.id;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Sub Total</td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot1)+"</td></tr>";
					html += "</table>";
					html2+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Jurnal (net)</td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot2)+"</td></tr>";
					html2+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total</td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot1+tot2)+"</td></tr>";
					html2 += "</table>";
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr>"+
						"<tr><td>"+html2+"</td></tr></table></br></br>";
				}
			}
			if (first){
				urut1=0;urut2=0;
				var tot=0,tot1=0,tot2=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				html2 = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title2.objList)
					html2 += "<td class='header_laporan' align='center' width="+this.widthTable2.get(i)+">"+this.title2.get(i)+"</td>";
				html2 += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Bukti</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.id+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Vendor</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nmvend+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Gudang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nmgud+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Jenis</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.jenis+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Dokumen</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nodok+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.ket+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.nilai)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>PPN</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.ppn)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			if (line.brg === "brg"){
				urut2+=1;
				html2 += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut2+".</td>";
			}else{ 
				urut1+=1;
				html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut1+".</td>";
			}
			for (var c in line){
				if (line["brg"] === "brg"){
					if (c === "nmbrg" || c === "tipe" || c === "sat" || c === "harga" || c === "subtot"){
						if (c === "subtot")
							html2 += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
						else
							html2 += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
					}
				}else{
					if (c === "brg" || c === "nmbrg" || c === "tipe" || c === "sat" || c === "harga" || c === "jumlah" || c === "bonus" || c === "subtot" || c === "stok" || c === "diskon"){
						if (c === "harga" || c === "jumlah" || c === "bonus" || c === "subtot" || c === "stok" || c === "diskon")
							html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
						else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
					}
				}
			}
			if (line.brg === "brg"){
				if (line.harga === "-")
					tot2 -= parseInt(line.subtot);
				else tot2 += parseInt(line.subtot);
			}else tot1 += parseInt(line.subtot);
			html += "</tr>";
			html2 += "</tr>";
			first = false;
		}
		//html += "</table>";
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Sub Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot1)+"</td></tr></table>";
		html2+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Jurnal (net)</td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot2)+"</td></tr>";
		html2+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total</td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot1+tot2)+"</td></tr></table>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr>"+
				"<tr><td>"+html2+"</td></tr></table>";				
		}
		return retHtml;
	}
});