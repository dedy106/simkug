window.app_kopeg_piutang_report_flRefBill = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_report_flRefBill.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_piutang_report_flRefBill";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Referensi Jurnal Piutang Umum", 2);
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["3","3","13","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,0,2,2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Referensi","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Transaksi"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_kopeg_piutang_report_flRefBill.extend(window.portalui_childForm);
window.app_kopeg_piutang_report_flRefBill.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row ===0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_lokasi, nama from lokasi order by kode_lokasi",
										"select count(*) from lokasi order by kode_lokasi",
										["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row === 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Referensi Jurnal Piutang Umum",this.sg1, this.sg1.row, this.sg1.col,
										"select kode_ref, nama from kop_arref_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' order by kode_ref",
										"select count(*) from kop_arref_m where kode_lokasi='"+this.sg1.getCell(2,0)+"'",
										["kode_ref","nama"],"where",["Kode","Nama"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new Array("3","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new Array(2,2,0));
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new Array("3","13","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new Array(3,2,0));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row === 2)
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
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Referensi","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Jenis Laporan","=","Transaksi"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_ref",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,2);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Transaksi"){
					var sql = "select a.kode_ref,a.nama,concat(a.kode_pp,'-',c.nama) as pp,a.akun_ar,a.akun_ppn,a.akun_pph, "+
							"b.kode_akun,d.nama as nmakun,b.keterangan,b.dc,b.nilai "+
							"from kop_arref_m a inner join kop_arref_j b on a.kode_ref=b.kode_ref and a.kode_lokasi=b.kode_lokasi "+
							"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"inner join masakun d on b.kode_akun=d.kode_akun and b.kode_lokasi=d.kode_lokasi "+
							this.filter+
							" order by a.kode_ref ";
					this.scriptSqlCount = "select count(*) "+
							"from kop_arref_m a inner join kop_arref_j b on a.kode_ref=b.kode_ref and a.kode_lokasi=b.kode_lokasi "+
							"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"inner join masakun d on b.kode_akun=d.kode_akun and b.kode_lokasi=d.kode_lokasi "+
							this.filter;
					this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Keterangan","DC","Nilai"]});
					this.widthTable = new server_util_arrayList({items:[80,150,200,50,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}else{
					var sql = "select a.kode_ref,a.nama,concat(a.kode_pp,'-',c.nama) as pp,a.akun_ar,a.akun_ppn,a.akun_pph "+
							"from kop_arref_m a inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							this.filter+
							" order by a.kode_ref ";
					this.scriptSqlCount = "select count(*) "+
							"from kop_arref_m a inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							this.filter;
					this.title = new server_util_arrayList({items:["Kode Referensi","Nama Referensi","Unit Kerja","Akun Piutang","Akun PPN","Akun PPh"]});
					this.widthTable = new server_util_arrayList({items:[100,100,100,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S"]});
					//this.groupBy = new server_util_arrayList({items:["no_kontrak"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);
				}
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_kopeg_piutang_report_flRefBill]::mainButtonClick:"+e);
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
			var header = "DAFTAR DETAIL REFERENSI JURNAL PIUTANG UMUM";
		else var header = "DAFTAR REFERENSI JURNAL PIUTANG UMUM";
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
		  }else var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);
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
			if (no_bill != line.kode_ref){
				first = true;
				no_bill = line.kode_ref;
				if (htmlHeader !== ""){
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Kode Referensi</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kode_ref+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nama Referensi</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nama+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Unit Kerja</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.pp+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Akun Piutang</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.akun_ar+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Akun PPN</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.akun_ppn+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Akun PPh</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.akun_pph+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "kode_akun" || c === "nmakun" || c === "keterangan" || c === "dc" || c === "nilai"){
					if (c === "nilai")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			html += "</tr>";
			first = false;
		}
		if (htmlHeader !== ""){
			html += "</table>";
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});