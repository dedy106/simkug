window.app_saku_inventory_report_flSD = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flSD.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flSD";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Schedule Delivery", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
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
	this.getPeriode="select distinct periode from inv_sd_m where kode_lokasi ='"+this.lokasi+"'";
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Delivery","All",""]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	this.mail = new server_util_mail();
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com","465");
	this.mail.configPop3("pop.gmail.com","995");
};
window.app_saku_inventory_report_flSD.extend(window.portalui_childForm);
window.app_saku_inventory_report_flSD.implement({
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
										  "select kode_cust, nama from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
										  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
		}
		if (row === 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Delivery",this.sg1, this.sg1.row, this.sg1.col,
										  "select no_sd,keterangan from inv_sd_m where kode_lokasi='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' ",
										  "select count(*) from inv_sd_m where kode_lokasi ='"+this.sg1.getCell(2,0)+"' and periode='"+this.sg1.getCell(2,1)+"' ",
										  ["no_sd","keterangan"],"and",["Kode","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,2]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[3,0,2,2]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from inv_sd_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.dbLib.getPeriodeFromSQL(this.getPeriode)]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["No. Delivery","All",""]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("c.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.no_sd",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				var sql = "select concat(c.kode_cust,' - ',e.nama) as cust,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.no_so,concat(b.kode_barang,' - ',f.nama) as nmbrg,f.jumlah,d.jumlah,b.keterangan "+
						"from inv_sd_m a inner join inv_sd_d b on a.no_sd=b.no_sd and a.kode_lokasi=b.kode_lokasi "+
						"inner join inv_so_m c on b.no_so=c.no_so and b.kode_lokasi=c.kode_lokasi "+
						"inner join inv_so_d d on b.no_so=d.no_so and b.kode_lokasi=d.kode_lokasi and b.kode_barang=d.kode_barang "+
						"inner join cust e on c.kode_cust=e.kode_cust and c.kode_lokasi=e.kode_lokasi "+
						"inner join inv_brg f on b.kode_barang=f.kode_brg and b.kode_lokasi=f.kode_lokasi "+this.filter+
						" order by c.kode_cust ";
				this.scriptSqlCount = "select count(*) "+
						"from inv_sd_m a inner join inv_sd_d b on a.no_sd=b.no_sd and a.kode_lokasi=b.kode_lokasi "+
						"inner join inv_so_m c on b.no_so=c.no_so and b.kode_lokasi=c.kode_lokasi "+
						"inner join inv_so_d d on b.no_so=d.no_so and b.kode_lokasi=d.kode_lokasi and b.kode_barang=d.kode_barang "+
						"inner join cust e on c.kode_cust=e.kode_cust and c.kode_lokasi=e.kode_lokasi "+
						"inner join inv_brg f on b.kode_barang=f.kode_brg and b.kode_lokasi=f.kode_lokasi "+this.filter;
				
					this.title = new server_util_arrayList({items:["Customer","Tanggal","No. SO","Barang","Ukuran","Jumlah","Keterangan"]});			
					this.widthTable = new server_util_arrayList({items:[120,50,100,150,60,60,300]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","S"]});			
					this.groupBy = new server_util_arrayList({items:["cust"]});
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true,this.groupBy);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flSD]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy);
		this.previewReport(dthtml);
		this.page=page;
	},
	previewReport: function(dthtml){
		var header = "DAFTAR SCHEDULE DELIVERY";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
		this.getMailHtml=this.getStringHeader()+loadCSS("server_util_laporan")+html+"</body></html>";
	},
	getStringHeader: function(){
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
				"<html xmlns='http://www.w3.org/1999/xhtml'>"+
				"<head>"+
				"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
				"<title>Preview</title>"+
				"</head>"+
				"<body>";
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy);
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy);
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
			this.confirm.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;  
	  }
	},/*kirim mail*/
	doConfirmClick: function(sender){
		try{
			if (sender === this.confirm.bConfirm){
				var to = this.confirm.getEmail();
				if (to !== ""){
					this.confirm.free();
					var d = new Date();
					var subject = "Daftar Schedule Delivery "+d.toLocaleString();
					var pesan = this.getMailHtml;
					this.mail.send("admin@roojax.com",to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
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
	}
});