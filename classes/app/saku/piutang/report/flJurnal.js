window.app_saku_piutang_report_flJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_report_flJurnal.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_piutang_report_flJurnal";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Jurnal Piutang",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");		
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";	
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=", this.app._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Modul","All"));	
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Bukti","All"));	
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
};
window.app_saku_piutang_report_flJurnal.extend(window.portalui_childForm);
window.app_saku_piutang_report_flJurnal.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("kode_akun","nama"),"and",new Array("kode","nama"));
			}			
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jurnal Piutang",this.sg1, this.sg1.row, this.sg1.col,
													  "select distinct no_invoice,keterangan from armhs_m where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_invoice) from armhs_m where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_invoice","keterangan"),"and",new Array("No Bukti","Keterangan"));
			}
	},
	doSelectCell: function(sender, col, row){
			this.sg1.columns.get(2).setReadOnly(false);
			this.sg1.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5),new  Array("123","123","123","123","123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct periode from armhs_m where kode_lokasi='"+this.app._lokasi+"' ");			
				if (rs instanceof portalui_arrayMap){
					this.sg1.columns.get(2).pickList.clear();
					var ix=0;
					for (var i in rs.objList){								
						this.sg1.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
						ix++;
					}
				}
			}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Periode","=", this.app._periode));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Akun","All",""));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Modul","All"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("No Bukti","All"));		
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
				this.filter = this.filterRep.filterStr("a.periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
					  this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"and")+
					  this.filterRep.filterStr("b.kode_akun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
					  this.filterRep.filterStr("a.modul",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.no_bukti",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.sql =  "select a.no_bukti,a.no_dokumen, date_format(a.tanggal,'%d/%m/%Y') as tgl, a.kode_akun, b.nama,a.keterangan, case when dc ='D' then a.nilai else 0 end debet, case when dc='C' then nilai else 0 end as kredit, a.modul "+
							" from armhs_j a inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
							this.filter+" order by a.no_bukti, a.dc desc ";
				this.scriptSqlCount =   "select count(*)	   "+                         
							"from armhs_j a "+														
							"inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
							this.filter;
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("No Bukti");width.add(100);fieldType.add("S");					
				title.add("No Dokumen");width.add(100);fieldType.add("S");						
				title.add("Tanggal ");width.add(60);fieldType.add("D");	
				title.add("Kode Akun");width.add(150);fieldType.add("S");	
				title.add("Nama Akun");width.add(100);fieldType.add("S");	
				title.add("Keterangan");width.add(300);fieldType.add("S");	
				title.add("Debet");width.add(100);fieldType.add("N");	
				title.add("Kredit");width.add(100);fieldType.add("N");	
				title.add("Modul");width.add(100);fieldType.add("S");	
				this.groupBy = new server_util_arrayList({items:["no_bukti","no_dokumen"]});
				this.groupHeader = new server_util_arrayList({items:["no_bukti"]});
				this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","Y","Y","N"]});
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,this.groupBy, this.summary, this.groupHeader );
				
				this.title = title;
				this.widthTable = width;
				this.fieldType = fieldType;
				this.sqlScript = this.sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
		}catch(e)
		{
			alert("[app_saku_piutang_report_flJurnal]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.report){
			/*kirim mail*/
			this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
			switch (methodName)
			{
				case "preview" :					
					this.viewer.preview(result);			
					this.viewer.hideLoading();
					break;
				
			}/*kirim mail*/
		}else if (sender === this.mail){
			if (methodName === "sendMail"){
				system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
			}
		}
	},
	getStringHeader: function(){
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
				"<html xmlns='http://www.w3.org/1999/xhtml'>"+
				"<head>"+
				"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
				"<title>Preview</title>"+
				"</head>"+
				"<body>";
	},/*kirim mail*/
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = "Laporan JURNAL PIUTANG "+d.toLocaleString();
					var pesan = this.allHtml;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}else if (sender === sender.owner.bCancel){
				sender.owner.free();
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,this.groupBy, this.summary, this.groupHeader );
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN JURNAL PIUTANG<br>";			
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
			  var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,true,this.groupBy, this.summary, this.groupHeader );
			  this.previewReport(dthtml);			
			  break;
			case "pdfBtn" :      
			  var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("pdf");			
				html.add("PosisiSpp");				
			  this.viewer.useIframe(upDownHtml(html));
			  break;/*kirim mail*/
			case "MailBtn" :
				sender.owner = new portalui_ConfirmMail(this);
				sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
				sender.owner.setCaption(sender.owner.title);
				sender.owner.setBorder(3);
			break;
			case "xlsBtn" :	
				var html = new server_util_arrayList();
				html.add(this.allHtml);			
				html.add("xls");			
				html.add("PosisiSpp");				
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
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
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
		if (col==1){
			 if (this.sg1.getCell(1,row)=="All"){
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
	}
});
