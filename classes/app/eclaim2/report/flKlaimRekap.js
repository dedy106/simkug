window.app_eclaim2_report_flKlaimRekap = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_report_flKlaimRekap.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim2_report_flKlaimRekap";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Rekapitulasi Klaim",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");		
		this.p1 = new panel(this,{bound:[10,10,702,257],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,250],colCount:4,
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:9});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
    this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";	
	var lokasi=this.app._lokasi;
	this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from tlk_klaim");
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Klaim","All"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Alamat","All"));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas Telkom","All"));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Klaim","All"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	
	this.userLogin="";
	if (this.app._userStatus=='U')
	{
		this.userLogin = " and a.nik_buat='"+this.app._userLog+"'"; 
	}
	
};
window.app_eclaim2_report_flKlaimRekap.extend(window.portalui_childForm);
window.app_eclaim2_report_flKlaimRekap.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_sebab,nama from tlk_sebab where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_sebab) from tlk_sebab  where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_obyek,nama from tlk_obyek where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_obyek) from tlk_obyek  where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Kejadian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok,nama from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_lok) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_lok","nama"),"and",new Array("kode","nama"));
		}
		if (row == 5)
		{
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.filterRep.ListDataSGFilter(this, "Data Berkas",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.no_klaim,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal from tlk_klaim a "+this.filter,
													  "select count(a.no_klaim) from tlk_klaim a "+this.filter,
													  new Array("a.no_klaim","a.no_dokumen","a.tanggal"),"and",new Array("no berkas","no dokumen","tanggal"));
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9),new  Array("123","123","123","123","123","123","13","13","123","2"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9),new  Array(0,0,2,2,2,2,4,4,4,0));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 9)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Short"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
				this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Klaim","All"));
				this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Lokasi Kejadian","All"));
				this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas Telkom","All"));
				this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Klaim","All"));
				this.gridLib.SGEditData(this.sg1,9,new Array(0,1), new Array("Jenis Laporan","=","Short"));
			}
			else
			{
				this.p1.setVisible(false);
				this.viewer.prepare();
				this.viewer.setVisible(true);
				this.app._mainForm.pButton.setVisible(false);
				this.app._mainForm.reportNavigator.setVisible(true);this.p1.setVisible(false);
			
				this.filter = this.filterRep.filterStr("y.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("y.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(y.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("y.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("y.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("y.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("y.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					  this.filterRep.filterStr("y.no_klaim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
				if (this.sg1.getCell(1,6)=="=") 
				{
					this.filter=this.filter+" and a.alamat like '%"+this.sg1.getCell(2,6)+"%'";
				}
				if (this.sg1.getCell(1,7)=="=") 
				{
					this.filter=this.filter+" and a.no_dokumen like '%"+this.sg1.getCell(2,7)+"%'";
				}
				if (this.sg1.getCell(1,8)=="=") 
				{
					this.filter=this.filter+" and a.nilai ="+this.sg1.getCell(2,8);
				}
				if (this.sg1.getCell(1,8)=="Range") 
				{
					this.filter=this.filter+" and a.nilai between "+this.sg1.getCell(2,8)+" and "+this.sg1.getCell(3,8);
				}
				var user_lok="";
				if (this.app._userStatus=="U")
				{
					user_lok=" and a.kode_lok='"+this.app._kodeLok+"'";
				}
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.sql =  "select a.nama,ifnull(b.jml_p1,0) as jml,ifnull(b.nilai1,0) as nilai "+
							"		from tlk_proses a "+
							"left join (select 'P01' as kode_proses,count(no_klaim) as jml_p1,sum(nilai) as nilai1 "+
							"from tlk_klaim y "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P02' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_ver x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P03' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_bantek x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P04' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_survey x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P05' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_testing x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P06' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_tuntutan x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P07' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_adjust x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P08' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_dok_m x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P09' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_penunjukan x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P10' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_pelaksanaan x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P11' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_progresspk x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P12' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_baut x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							"union "+
							"select 'P13' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_bast x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+" and x.jenis='PAR' "+
							"group by kode_proses "+
							"union "+
							"select 'P14' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_bast x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+" and x.jenis='FUL' "+
							"group by kode_proses "+
							"union "+
							"select 'P15' as kode_proses,count(y.no_klaim) as jml_p1,sum(y.nilai) as nilai1 "+
							"from tlk_df x "+
							"inner join tlk_klaim y on x.no_klaim=y.no_klaim "+this.filter+
							"group by kode_proses "+
							")b on a.kode_proses=b.kode_proses "+
							" order by a.kode_proses ";
				
				this.scriptSqlCount =   "select 1 ";
				var title = new server_util_arrayList();			
				var width = new server_util_arrayList();
				var fieldType = new server_util_arrayList();
				title.add("Proses");width.add(200);fieldType.add("S");		
				title.add("Jumlah Berkas");width.add(60);fieldType.add("N");
				title.add("Nilai Estimasi");width.add(100);fieldType.add("N");
				var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,false);
				
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
			alert("[app_eclaim2_report_flKlaimRekap]::mainButtonClick:"+e);
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
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.viewer.getContent();
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>LAPORAN REKAPITULASI KLAIM<br>";			
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
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
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
