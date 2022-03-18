window.app_mede_report_flPr = function(owner)
{
	if (owner)
	{
		window.app_mede_report_flPr.prototype.parent.constructor.call(this,owner);
		this.className = "app_mede_report_flPr";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Purchase Request", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);		
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,0,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.getPeriode="select distinct periode from dmt_bill_j where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["No. Bukti","All",""]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_mede_report_flPr.extend(window.portalui_childForm);
window.app_mede_report_flPr.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Memo Jurnal",this.sg1, this.sg1.row, this.sg1.col,
														  "select a.no_bukti,a.keterangan "+
														  "from (select no_bill as no_bukti,keterangan,kode_lokasi,periode from dmt_bill_j "+
														  "	  union "+
														  "	  select no_kb as no_bukti,keterangan,kode_lokasi,periode  from dmt_kb_j "+
														  "   union "+
														  "   select no_pdd as no_bukti,keterangan,kode_lokasi,periode from dmt_pdd_j) a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
														  "select count(*) "+
														  "from (select no_bill as no_bukti,keterangan,kode_lokasi,periode  from dmt_bill_j "+
														  "	  union "+
														  "	  select no_kb as no_bukti,keterangan,kode_lokasi,periode  from dmt_kb_j "+
														  "   union "+
														  "   select no_pdd as no_bukti,keterangan,kode_lokasi,periode from dmt_pdd_j) a where a.kode_lokasi ='"+this.sg1.getCell(2,0)+"' "+
														  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
														  ["a.no_bukti","a.keterangan"],"and",["No Bukti","Keterangan"]);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[2,0,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[3,0,2]);
		}
		if (row === 1){
			this.dbLib.setItemsFromSQL("select distinct periode from dmt_bill_j where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
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
			}else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.no_bukti",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();				
				var sql = "select a.no_bukti, a.tanggal, a.periode,a.posted, a.kode_akun, b.nama as nmakun, a.kode_pp, a.dc,a.keterangan, a.nilai "+ 
						  "from masakun b "+
						  "inner join (select kode_lokasi,no_bill as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_bill_j "+
						  "  			union "+
						  "				select kode_lokasi,no_kb as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_kb_j "+
						  "  			union "+
						  "				select kode_lokasi,no_pdd as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_pdd_j "+
						  "				) a on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi  "+this.filter +" order by a.no_bukti,a.dc desc ";
				this.scriptSqlCount = "select count(*) "+
					"from masakun b "+
						  "inner join (select kode_lokasi,no_bill as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_bill_j "+
						  "  			union "+
						  "				select kode_lokasi,no_kb as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_kb_j "+
						  "  			union "+
						  "				select kode_lokasi,no_pdd as no_bukti,tanggal,periode,posted,kode_akun,kode_pp,dc,keterangan,nilai from dmt_pdd_j "+
						  "				) a on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi  "+this.filter +" order by a.no_bukti,a.dc desc ";
				this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode PP","Keterangan","Debet","Kredit"]});
				this.widthTable = new server_util_arrayList({items:[100,150,90,250,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S"]});
				var sqlArr = new server_util_arrayList({items:[sql]});				
				var result = this.dbLib.getMultiDataProvider(sqlArr,true);
				this.dokumen=undefined;
				var dthtml = this.convertResultToHTML(result);//this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,false);	
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount,this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_mede_report_flPr]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR MEMO JURNAL<br>";
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
			html.add(new Date().valueOf()+"_dokumen");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_dokumen");				
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
		if (this.dokumen === undefined)
			this.dokumen = result;
        else result = this.dokumen; 			
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
			if (no_bill != line.no_bukti){
				first = true;
				no_bill = line.no_bukti;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total </td>"+
							"<td class='isi_laporan'>"+floatToNilai(totD)+"</td>"+
							"<td class='isi_laporan'>"+floatToNilai(totC)+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				var totD=0;
				var totC=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No Bukti</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_bukti+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tanggal+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Periode</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.periode+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Posted</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+(line.posted == "T" ? "Posted" :"Not Posted")+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+"</td>";
			for (var c in line){
				if (c == "nmakun" || c == "kode_akun" || c == "nilai" || c =="kode_pp"  || c=="keterangan"){
					if (c == "nilai"){
						if (line["dc"] === "D"){
							html += "<td height='20' class='isi_laporan' valign='top' align='right'>"+floatToNilai(line[c])+"</td>";
							html += "<td height='20' class='isi_laporan' valign='top' align='right'>&nbsp;</td>";
							totD += parseInt(line[c]);
						}else if (line["dc"] === "C"){
							html += "<td height='20' class='isi_laporan' valign='top' align='right'>&nbsp;</td>";
							html += "<td height='20' class='isi_laporan' valign='top' align='right'>"+floatToNilai(line[c])+"</td>";
							totC += parseInt(line[c]);
						}
					}else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			html += "</tr>";
			first = false;			
		}
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(totD)+"</td>"+
				"<td class='isi_laporan'>"+floatToNilai(totC)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});