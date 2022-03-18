window.app_kopeg_simpanan_report_flPBDepo = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_report_flPBDepo.prototype.parent.constructor.call(this,owner);
		this.className = "app_kopeg_simpanan_report_flPBDepo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Pindah Buku Deposit Simpanan", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");
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
	this.getPeriode="select distinct periode from kop_pbdepo_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Kode Loker","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Kode Nasabah","All",""]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Daftar"]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.mail = new server_util_mail();
	this.mail.addListener(this);
	this.mail.setUser("admin@klikalpa.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com","465");
	this.mail.configPop3("pop.gmail.com","995");
};
window.app_kopeg_simpanan_report_flPBDepo.extend(window.portalui_childForm);
window.app_kopeg_simpanan_report_flPBDepo.implement({
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
			this.filterRep.ListDataSGFilter(this, "Data No. Bukti Pindah Buku",this.sg1, this.sg1.row, this.sg1.col,
										  "select a.no_pbdepo,a.keterangan from kop_pbdepo_m a inner join kop_depo b on a.no_pbdepo=b.no_depo and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and b.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  "select count(*) from kop_pbdepo_m a inner join kop_depo b on a.no_pbdepo=b.no_depo and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and b.kode_agg like '%"+this.sg1.getCell(2,3)+"' ",
										  ["a.no_pbdepo","a.keterangan"],"and",["Kode","Keterangan"]);
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
			this.dbLib.setItemsFromSQL("select distinct periode from kop_pbdepo_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
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
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["No. Bukti","All",""]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Jenis Laporan","=","Daftar"]);
			}else{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("d.kode_loker",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_agg",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.no_pbdepo",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,5);
				var result  = new portalui_arrayMap();
				if (this.jenisLap === "Transaksi"){
					var sql = "select a.no_pbdepo,a.no_dokumen,a.keterangan,c.nama as loktuj,a.modul,b.nama as nsbh,a.nilai as npb, "+
							"date_format(a.tanggal,'%d/%m/%Y')as tgl,e.no_depo,e.tanggal,e.keterangan as ket,e.dc,e.nilai "+
							"from kop_pbdepo_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
							"inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+
							"inner join kop_loker d on b.kode_loker=d.kode_loker and b.kode_lokasi=d.kode_lokasi "+
							"inner join (select no_depo,date_format(tanggal,'%d/%m/%Y')as tanggal,keterangan,case dc when 'D' then 'IN' else 'OUT' end as dc,nilai,kode_lokasi,kode_agg "+ 
							"	from kop_depo where no_del='-' and modul = 'SIMP' and jenis in ('ANGS_SLS','ANGS_PKI','AMBIL','PBDEPO_OI') and periode <='"+this.sg1.getCell(2,1)+"' "+
							"	order by tanggal desc) e on a.kode_agg=e.kode_agg and a.kode_lokasi=e.kode_lokasi and e.no_depo <> a.no_pbdepo "+this.filter+
							" order by a.no_pbdepo,e.tanggal ";
					this.scriptSqlCount = "select count(*) "+
							"from kop_pbdepo_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
							"inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+
							"inner join kop_loker d on b.kode_loker=d.kode_loker and b.kode_lokasi=d.kode_lokasi "+
							"inner join (select no_depo,date_format(tanggal,'%d/%m/%Y')as tanggal,keterangan,case dc when 'D' then 'IN' else 'OUT' end as dc,nilai,kode_lokasi,kode_agg "+ 
							"	from kop_depo where no_del='-' and modul = 'SIMP' and jenis in ('ANGS_SLS','ANGS_PKI','AMBIL','PBDEPO_OI') and periode <='"+this.sg1.getCell(2,1)+"' "+
							"	order by tanggal desc) e on a.kode_agg=e.kode_agg and a.kode_lokasi=e.kode_lokasi and e.no_depo <> a.no_pbdepo "+this.filter;
					this.title = new server_util_arrayList({items:["No. Bukti","Tanggal","Keterangan","Status","Nilai"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N"]});
					var sqlArr = new server_util_arrayList({items:[sql]});				
					var result = this.dbLib.getMultiDataProvider(sqlArr,true);
					var dthtml = this.convertResultToHTML(result);
				}else{
					var sql = "select a.no_pbdepo,date_format(a.tanggal,'%d/%m/%Y')as tgl,a.no_dokumen,a.keterangan,c.nama as loktuj,a.modul,b.nama as nsbh,a.nilai "+
							"from kop_pbdepo_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
							"inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+
							"inner join kop_loker d on b.kode_loker=d.kode_loker and b.kode_lokasi=d.kode_lokasi "+this.filter+
							" order by a.no_pbdepo ";
					this.scriptSqlCount = "select count(*) "+
							"from kop_pbdepo_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.no_del='-' "+
							"inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+
							"inner join kop_loker d on b.kode_loker=d.kode_loker and b.kode_lokasi=d.kode_lokasi "+this.filter;
					this.title = new server_util_arrayList({items:["No. Bukti","Tanggal","No. Dokumen","Keterangan","Lokasi Tujuan","Modul","Nasabah","Nilai"]});
					this.widthTable = new server_util_arrayList({items:[]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N"]});
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
			systemAPI.alert("[app_kopeg_simpanan_report_flPBDepo]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
		if (sender === this.mail){
			if (methodName === "sendMail"){
				//system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
			}
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
			var header = "DAFTAR DETAIL PINDAH BUKU DEPOSIT SIMPANAN";
		else var header = "DAFTAR PINDAH BUKU DEPOSIT SIMPANAN";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+d.toLocaleString()+"</span>";
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
		case "MailBtn" :
			this.confirm = new portalui_ConfirmMail(this);
			this.confirm.setBound((this.width/2)-125,this.height/2-100,250,100);
			this.confirm.setCaption(this.confirm.title);
			this.confirm.setBorder(3);/*
			this.confirm.setIcon("image/themes/dynpro/iconpanel.png");
			this.confirm.setBackground("image/themes/dynpro/roundpanelBgCenter.png");
			this.confirm.setColor("#efefef");
			this.confirm.setTitleBg("#b5c6d5");*/
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;  
	  }
	},
	doConfirmClick: function(sender){
		try{
			if (sender === this.confirm.bConfirm){
				var to = this.confirm.getEmail();
				this.confirm.free();
				var d = new Date();
				var subject = "Laporan Pindah Buku Deposit Simpanan "+d.toLocaleString();
				var pesan = this.allHtml;
				this.mail.send("admin@klikalpa.com",to,subject,pesan);
			}else if (sender === this.confirm.bCancel){
				this.confirm.free();
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
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
		var table, line, urut=0,total,dc;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_pbdepo){
				first = true;
				no_bill = line.no_pbdepo;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Deposit</td>"+
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Bukti Pinbuk</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_pbdepo+"</td>";
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
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Lokasi Tujuan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.loktuj+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Modul</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.modul+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nasabah</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nsbh+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Nilai Pinbuk</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.npb)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_depo" || c === "tanggal" || c === "ket" || c === "dc" || c === "nilai"){
					if (c === "nilai"){
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
						if (dc === "IN") total+= parseInt(line[c]);
						else total-= parseInt(line[c]);
					}else{
						dc=line[c];
						html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
					}
				}
			}
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='5'>Total Deposit</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	}
});