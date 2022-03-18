window.app_kopeg_proyek_report_flTghn = function(owner)
{
	if (owner)
	{
		window.app_kopeg_proyek_report_flTghn.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_proyek_report_flTghn";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Tagihan Proyek", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["3","3","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,0,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.getPeriode="select distinct periode from kop_arproyek_m where kode_lokasi ='"+this.lokasi+"' order by periode desc";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Bukti","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Daftar"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_proyek_report_flTghn.extend(window.portalui_childForm);
window.app_kopeg_proyek_report_flTghn.implement({
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
			this.standar.ListDataSGFilter(this, "Data Tagihan Proyek",this.sg1, this.sg1.row, this.sg1.col,
									  "select no_ar,keterangan from kop_arproyek_m "+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  "select count(*) from kop_arproyek_m "+
									  this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
									  " and kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",
									  ["no_ar","keterangan"],"and",["No. Bukti","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,0]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from kop_arproyek_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
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
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Bukti","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Laporan","=","Daftar"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.no_ar",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				this.jenisLap = this.sg1.getCell(2,3);
				if (this.jenisLap === "Daftar"){
					var sql = "select a.no_ar,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen,a.keterangan,concat(a.kode_pp,' - ',c.nama) as pp, "+
						"concat(a.no_proyek,' - ',d.keterangan) as pry,d.nilai as npry,a.nilai_pph,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as tghn "+
						"from kop_arproyek_m a inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"inner join kop_proyek_m d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi "+
						this.filter+
						" order by a.no_ar ";
					this.scriptSqlCount = "select count(*) "+
						"from kop_arproyek_m a inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"inner join kop_proyek_m d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["No Bukti","Tanggal","No Dokumen","Keterangan","PP/Unit Kerja","Proyek","Nilai Proyek","Nilai PPh","Nilai Piutang","Nilai PPN","Total Tagihan"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","N","N","N","N","N"]});
					//this.groupBy = new server_util_arrayList({items:["customer","no_kontrak","no_invoice","tgl"]});			
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				}else{
					var sql = "select a.no_ar,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen,a.keterangan,a.kode_pp,c.nama as nmpp,a.no_proyek,d.nilai as npry, "+
						"d.keterangan as ketpry,a.nilai_pph,a.nilai+a.nilai_ppn as tghn,b.kode_akun,e.nama as nmakun,b.keterangan as ket,b.dc,b.nilai "+
						"from kop_arproyek_m a inner join kop_arproyek_j b on a.no_ar=b.no_ar and a.kode_lokasi=b.kode_lokasi "+
						"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"inner join kop_proyek_m d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi "+
						"inner join masakun e on b.kode_akun=e.kode_akun and b.kode_lokasi=e.kode_lokasi "+
						this.filter+
						" order by a.no_ar,b.dc desc ";
					this.scriptSqlCount = "select count(*) "+
						"from kop_arproyek_m a inner join kop_arproyek_j b on a.no_ar=b.no_ar and a.kode_lokasi=b.kode_lokasi "+
						"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"inner join kop_proyek_m d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi "+
						"inner join masakun e on b.kode_akun=e.kode_akun and b.kode_lokasi=e.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Keterangan","DC","Nilai"]});
					this.widthTable = new server_util_arrayList({items:[70,180,200,30,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N"]});
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
			systemAPI.alert("[app_kopeg_proyek_report_flTghn]::mainButtonClick:"+e);
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
			var header = "LAPORAN DETAIL TAGIHAN PROYEK";
		else var header = "LAPORAN TAGIHAN PROYEK";
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
			html.add(new Date().valueOf()+"_orderBrg");				
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
		result = result.result;
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
			if (no_bill != line.no_ar){
				first = true;
				no_bill = line.no_ar;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Tagihan</td>"+
						"<td class='isi_laporan'>"+floatToNilai(line.tghn)+"</td></tr>";
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_ar+"</td>";
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>PP/Unit Kerja</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kode_pp+" - "+line.nmpp+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Proyek</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_proyek+" - "+line.ketpry+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nilai Proyek</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.npry)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nilai PPh</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.nilai_pph)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
				for (var c in line){
					if (c === "kode_akun" || c === "nmakun" || c === "ket" || c === "dc" || c === "nilai"){
						if (c === "nilai")
							html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
						else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
					}
				}
			//}
			//tot+=parseInt(line.jumlah);
			html += "</tr>";
			first = false;
		}
		
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Tagihan</td>"+
				"<td class='isi_laporan'>"+floatToNilai(line.tghn)+"</td></tr>";
		html += "</table>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});