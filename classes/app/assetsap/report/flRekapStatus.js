/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_report_flRekapStatus = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flRekapStatus.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flRekapStatus";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Status", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib;server_report_simpleReport");
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4),new  Array("123","123","123","13","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4),new  Array(0,0,0,2,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Divisi","All",""));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Bisnis Area","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Class Asset","All",""));	
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","TB"));	
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Proses ","=","KKIL"));	
	this.doSelectCell(this.sg1,2,3);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_assetsap_report_flRekapStatus.extend(window.childForm);
window.app_assetsap_report_flRekapStatus.implement({
	doEllipseClick: function(sender, col, row){
		
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Divisi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe='UBIS'",
													  "select count(kode_lokfa) from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe='UBIS'",
													  ["kode_lokfa","nama"],"and",["Kode","Nama"]);
		}
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Bisnis Area",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokfa, nama from amu_lokasi "+
													 this.filterRep.filterStr("kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													 
													  "select count(*) from amu_lokasi "+
													 this.filterRep.filterStr("kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
													  ["kode_lokfa","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{					
			this.filterRep.ListDataSGFilter(this, "Class Asset",this.sg1, this.sg1.row, this.sg1.col,
													  "select distinct a.kode_klpfa, a.nama from amu_klp a where kode_klpfa like '101%'",
													 "select count(*) from amu_klp a where kode_klpfa like '101%' ",
													  ["kode_klpfa","nama"],"and",["Kode","Nama"]);
		}		
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="N")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","123","3","3","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,2,0,0,2]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5],["123","123","123","3","3","123"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5],[2,2,2,0,0,2]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("TB","NTB"));
		}		
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("KKIL","REKON"));
		}
			
	},
	mainButtonClick: function(sender){
		try{			
			if (sender == this.app._mainForm.bClear2){
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Divisi","All",""));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Bisnis Area","All",""));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Class Asset","All",""));	
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","TB"));	
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Proses ","=","KKIL"));	
				return;
			}
				this.app._mainForm.reportNavigator.serverDownload = true;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
										
				var diva = this.sg1.cells(2,1).substr(0,3) == "TDV" || this.sg1.cells(2,1).substr(0,3) == "TCS";    	
				this.showFilter = this.filterRep.showFilter(this.sg1);	
				
				var sql = "select e.kode_status, e.nama, sum(case when f.no_gabung is null then 0 else 1 end) as jml, sum(ifnull(f.nilai_buku,0)) as buku "+
			" from amu_status e "+			
			" left outer join (select distinct trim(b.status_nka) as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa and f.kode_induk = '00' "+
			(this.sg1.getCell(2,4).toLowerCase() == "kkil" ?
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' ":
			
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' " )+
			
			this.filterRep.filterStr(diva ? "a.ref1" : "a.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
			this.filterRep.filterStr(diva ? "a.kode_lokfa" : "f.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
			this.filterRep.filterStr("a.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +					
			" union "+			
			"	select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk and g.kode_induk = '00' "+
			(this.sg1.getCell(2,4).toLowerCase() == "kkil" ?
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' ":
			
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' " )+
							
			this.filterRep.filterStr(diva ? "a.ref1" : "a.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
			this.filterRep.filterStr(diva ? "a.kode_lokfa" : "g.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
			this.filterRep.filterStr("a.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +					
			" union "+			
			"	select distinct trim(b.status_nka) as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk "+
			"	inner join amu_lokasi h on h.kode_lokfa = g.kode_induk and h.kode_induk = '00' "+
			(this.sg1.getCell(2,4).toLowerCase() == "kkil" ?
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' ":
			
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.sg1.cells(2,3)+"' " )+				
			this.filterRep.filterStr(diva ? "a.ref1" : "a.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
			this.filterRep.filterStr(diva ? "a.kode_lokfa" : "g.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
			this.filterRep.filterStr("a.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +					
			"	) f on f.kode_status = e.kode_status "+
			" where e.jenis  = '"+this.sg1.cells(2,3)+"' "+
			"group by e.kode_status, e.nama order by e.kode_status ";
								
				this.scriptSqlCount = "select count(*) as tot "+					
						" from ("+sql+") a ";													
				this.title = new server_util_arrayList({items:["Status","Deskripsi Status","Jml NKA","Nilai Buku"]});
				this.widthTable = new server_util_arrayList({items:[100,250,100,150]});
				this.fieldType = new server_util_arrayList({items:["S","S","N","N"]});
				this.summary = new server_util_arrayList({items:["N","N","Y","Y"]});					
				
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);				
				this.finish = this.pager;				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();		    	
				this.previewReport(dthtml);
		}catch(e){
			systemAPI.alert("[flBB]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);
				break;
				case "sqlToHtmlWithHeader":
					this.previewReport(result);
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page){
		this.finish = this.pager;
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){		
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+
			"<table width='100%'> <tr> <td width='170'><img src='image/telkomindonesia.png' width='170' height='100'/> </td> "+
			"			<td ><span style='font-size:16;font-weight:bold;'>Rekapitulasi Hasil Inventarisasi Fisik</span><br>"+
			" 			<span style='font-size:14;font-weight:bold;'>"+(this.sg1.cells(2,3) == "TB"  ? "Tanah Bangunan":"Non Tanah Bangunan")+"</span><br><br> "+
			"			<span style='font-size:9;font-weight:bold;'>Verifikasi Eksistensi Aset Tetap<br>Posisi : "+new Date().lclFormat() +"</span></td>"+
			"</tr>"+			
			"<tr><td colspan='2' ></td></tr>"+			
			"<tr><td colspan='2' >"+dthtml+"</td></tr>"+			
			"</table>";		
		this.viewer.preview(html);		
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
	  switch(sender.getName())
	  {
	    case "allBtn" :		  
			//var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
			this.finish  = this.pager * this.viewer.getTotalPage();
			if (this.sg1.cells(2,3) == "Rekap")
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
			else 
				var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,"","",undefined);			
			this.previewReport(dthtml);
			
			break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :				
			downloadFile( this.dbLib.sqlToXls2(this.sqlScript,this.title,  "DataRekon.xls") );
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	      	this.app._mainForm.reportNavigator.serverDownload = false;
	      break;
	  }
	  }catch(e){
		alert(e);
	  }
	},
	sg1onChange: function(sender, col , row){
	    if (col===1)
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
