window.app_saku_inventory_report_flIO = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flIO.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flIO";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan I/O Barang", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
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
	this.getPeriode="select distinct periode from inv_io_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Gudang","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Bukti","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Transaksi"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flIO.extend(window.portalui_childForm);
window.app_saku_inventory_report_flIO.implement({
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
			this.filterRep.ListDataSGFilter(this, "Daftar Gudang",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_gudang, nama  from inv_gudang where kode_lokasi='"+this.sg1.getCell(2,0)+"'",
									  "select count(kode_gudang) from inv_gudang where kode_lokasi='"+this.sg1.getCell(2,0)+"'",
									  ["kode_gudang","nama"],"and",["Kode","Nama"],false);
		}
		if (row === 3)
		{
			this.standar.ListDataSGFilter(this, "Data No. Bukti I/O Barang",this.sg1, this.sg1.row, this.sg1.col,
									  "select no_io, keterangan from inv_io_m "+
									  this.filterRep.filterStr("kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from inv_io_m "+
									  this.filterRep.filterStr("kode_gudang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where")+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  ["no_io","keterangan"],"and",["No. Bukti","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from inv_io_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 4)
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
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Bukti","All",""]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Laporan","=","Transaksi"]);
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
							this.filterRep.filterStr("a.no_io",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				this.jenisLap = "Transaksi";/*this.sg1.getCell(2,4);*/
				var sql = "select a.no_io,a.no_dokumen,a.keterangan,concat(a.nik_buat,'-',i.nama) as nik,concat(a.kode_gudang,'-',b.nama) as gudang ";
				if (this.jenisLap === "Transaksi")
					sql+=",f.kode_brg,g.nama as nama_brg,g.tipe,f.sat,ifnull(h.stok,0) as stok,case f.dc when 'D' then 'I' else 'O' end as dc,f.jumlah ";
				sql+="from inv_io_m a "+
					"inner join karyawan i on i.nik = a.nik_buat and i.kode_lokasi=a.kode_lokasi "+
					"inner join inv_gudang b on a.kode_gudang = b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
					"inner join inv_io_d f on a.no_io = f.no_io and a.kode_lokasi=f.kode_lokasi "+
					"inner join inv_brg g on f.kode_brg=g.kode_brg and f.kode_lokasi=g.kode_lokasi "+
					"left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
					"  from inv_dt "+
					"  where no_bukti not like '%"+this.sg1.getCell(2,3)+"' and kode_gudang='"+this.sg1.getCell(2,2)+"' "+
					"  and kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<='"+this.sg1.getCell(2,1)+"' "+
					"  group by kode_brg,kode_lokasi) "+
					"  h on g.kode_brg=h.kode_brg and g.kode_lokasi=h.kode_lokasi "+this.filter+
					" order by a.no_io ";
				this.scriptSqlCount = "select count(*) "+
					"from inv_io_m a "+
					"inner join karyawan i on i.nik = a.nik_buat and i.kode_lokasi=a.kode_lokasi "+
					"inner join inv_gudang b on a.kode_gudang = b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
					"inner join inv_io_d f on a.no_io = f.no_io and a.kode_lokasi=f.kode_lokasi "+
					"inner join inv_brg g on f.kode_brg=g.kode_brg and f.kode_lokasi=g.kode_lokasi "+
					"left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
					"  from inv_dt "+
					"  where no_bukti not like '%"+this.sg1.getCell(2,3)+"' and kode_gudang='"+this.sg1.getCell(2,2)+"' "+
					"  and kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode<='"+this.sg1.getCell(2,1)+"' "+
					"  group by kode_brg,kode_lokasi) "+
					"  h on g.kode_brg=h.kode_brg and g.kode_lokasi=h.kode_lokasi "+this.filter;
				if (this.jenisLap === "Daftar"){
					this.title = new server_util_arrayList({items:["No Bukti","No Dokumen","Keterangan","NIK ","Gudang"]});			
					this.widthTable = new server_util_arrayList({items:[100,120,150,120,120]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S"]});
					//this.groupBy = new server_util_arrayList({items:["customer","no_kontrak","no_invoice","tgl"]});			
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				}else{
					this.title = new server_util_arrayList({items:["Kode","Nama","Tipe","Satuan","Stok","I/O","Jumlah"]});
					this.widthTable = new server_util_arrayList({items:[100,120,120,70,80,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","S","N"]});
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
			systemAPI.alert("[app_saku_inventory_report_flIO]::mainButtonClick:"+e);
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
			var header = "LAPORAN I/O BARANG";
		else var header = "DAFTAR I/O BARANG";
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
			html.add(new Date().valueOf()+"_returbeli");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_returbeli");				
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
		var table, line, urut=0;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_io){
				first = true;
				no_bill = line.no_io;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='7'>Total </td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				var tot=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Bukti</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_io+"</td>";
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>NIK Buat</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nik+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Gudang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.gudang+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "kode_brg" || c === "nama_brg" || c === "tipe" || c === "sat" || c === "stok" || c === "dc" || c === "jumlah"){
					if (c === "stok" || c === "jumlah")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else{
						if (c === "dc")
							html += "<td height='20' class='isi_laporan' valign='top' >"+line[c].toUpperCase()+"</td>";
						else
							html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
					}
				}
			}
			tot += parseInt(line.jumlah);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='7'>Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});