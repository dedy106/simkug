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
window.app_assetsap_report_flRekon = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flRekon.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flRekon";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Daftar KKP/Rekonsiliasi", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib;server_report_simpleReport");
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:6});
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
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Bisnis Area","=",this.app._kodeLokfa));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Class Asset","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Status KKIL","=","All"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Jenis ","=","TB"));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("No KKP","All",""));		
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
window.app_assetsap_report_flRekon.extend(window.childForm);
window.app_assetsap_report_flRekon.implement({
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
		if (row == 5)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Rekonsiliasi",this.sg1, this.sg1.row, this.sg1.col,
													  " select * from (select distinct a.no_rekon, b.no_gabung, c.nama from amu_rekon_m a "+
													  " inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and") +
							" union "+
							" select * from (select distinct a.no_rekon, b.no_gabung, c.nama from amu_rekon_m a "+
													  " inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and") +
							") a " ,
													  " select count(*) from (select distinct a.no_rekon, b.no_gabung, c.nama from amu_rekon_m a "+
													  " inner join amu_rekon_d b on b.no_rekon = a.no_rekon  "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
							" union "+
							" select count(*) from (select distinct a.no_rekon, b.no_gabung, c.nama from amu_rekon_m a "+
													  " inner join amu_rekon_d b on b.no_rekon = a.no_rekon  "+
													  " inner join amu_asset c on c.no_gabung = b.no_gabung "+
							this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							this.filterRep.filterStr("a.jenis",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and") +
							") a ",
													  ["no_rekon","no_gabung","nama"],"where",["No Rekon","No Gabung(No FA + SN)","Deskripsi"]);
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
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("TB","NTB"));
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("All","Sudah","Belum"));
		}		
			
	},
	mainButtonClick: function(sender){
		try{
				this.app._mainForm.reportNavigator.serverDownload = true;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
										
				var diva = this.sg1.cells(2,1).substr(0,3) == "TDV" || this.sg1.cells(2,1).substr(0,3) == "TCS";    	
				this.showFilter = this.filterRep.showFilter(this.sg1);										
				if (this.sg1.cells(2,3) == "All" || this.sg1.cells(1,3) == "All"){
					var sql = "select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, e.bun, "+
						" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, case a.progress when '0' then 'KKIL' when '1' then 'APP Area' when '2' then 'APP Regional' when '3' then 'APP IC' when '4' then 'Ret. ke Regional' when '5' then 'Ret. ke Area' when '6' then 'Ret Officer' end as status_app "+
						", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
						" from amu_asset c "+
						" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
						" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa "+
						"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
						"   left outer join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
						"	left outer join amu_kkl_m  a on a.no_inv = b.no_inv and a.jenis ='"+this.sg1.cells(2,4)+"'  "+						
						"	left outer join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
					this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
						"	left outer join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
						"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
					this.filterRep.filterStr(diva ? "c.ref1" : "c.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
					this.filterRep.filterStr(diva ? "c.kode_lokfa" : "gg.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +					
						" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' "+
					(this.sg1.cells(1,0).toLowerCase() == "all" && this.sg1.cells(1,1).toLowerCase() != "all" ? "":  
							" union "+
							"select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, e.bun, "+
							" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, a.progress as status_app "+
							", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
							" from amu_asset c "+
							" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
							" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa and gg.kode_induk = '00' "+
							"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
							"   left outer join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
							"	left outer join amu_kkl_m  a on a.no_inv = b.no_inv  and a.jenis ='"+this.sg1.cells(2,4)+"' "+				
							"	left outer join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
						this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
							"	left outer join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
							"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
						this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+										
						this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
							" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' " ) +" order by no_fa";
				}else if (this.sg1.cells(2,3) == "Sudah"){
					var sql = "select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, ifnull(e.bun,'-') as bun, "+
						" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, case a.progress when '0' then 'KKIL' when '1' then 'APP Area' when '2' then 'APP Regional' when '3' then 'APP IC' when '4' then 'Ret. ke Regional' when '5' then 'Ret. ke Area' when '6' then 'Ret Officer' end as status_app "+
						", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
						" from amu_asset c "+
						" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
						" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa "+
						"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
						"   inner join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
						"	inner join amu_kkl_m  a on a.no_inv = b.no_inv and a.jenis ='"+this.sg1.cells(2,4)+"'  "+						
						"	inner join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
					this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
						"	inner join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
						"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
					this.filterRep.filterStr(diva ? "c.ref1" : "c.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
					this.filterRep.filterStr(diva ? "c.kode_lokfa" : "gg.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
						" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' "+
					(this.sg1.cells(1,0).toLowerCase() == "all" && this.sg1.cells(1,1).toLowerCase() != "all" ? "":  
						" union "+
						"select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, ifnull(e.bun,'-') as bun, "+
						" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, case a.progress when '0' then 'KKIL' when '1' then 'APP Area' when '2' then 'APP Regional' when '3' then 'APP IC' when '4' then 'Ret. ke Regional' when '5' then 'Ret. ke Area' when '6' then 'Ret Officer' end as status_app "+
						", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
						" from amu_asset c "+
						" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
						" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa and gg.kode_induk = '00' "+
						"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
						"   inner join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
						"	inner join amu_kkl_m  a on a.no_inv = b.no_inv  and a.jenis ='"+this.sg1.cells(2,4)+"' "+				
						"	inner join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
					this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
						"	inner join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
						"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
					this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+					
					this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
						" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' ")+" order by no_fa";					
				}else {
					var sql = "select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, ifnull(e.bun,'-') as bun, "+
						" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, case a.progress when '0' then 'KKIL' when '1' then 'APP Area' when '2' then 'APP Regional' when '3' then 'APP IC' when '4' then 'Ret. ke Regional' when '5' then 'Ret. ke Area' when '6' then 'Ret Officer' end as status_app "+
						", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
						" from amu_asset c "+
						" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
						" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa "+
						"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
						"   left outer join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
						"	left outer join amu_kkl_m  a on a.no_inv = b.no_inv and a.jenis ='"+this.sg1.cells(2,4)+"'  "+						
						"	left outer join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
					this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
						"	left outer join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
						"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
					this.filterRep.filterStr(diva ? "c.ref1" : "c.kode_lokfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
					this.filterRep.filterStr(diva ? "c.kode_lokfa" : "gg.kode_induk",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
					this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
						" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' and g.no_gabung is null "+
					(this.sg1.cells(1,0).toLowerCase() == "all" && this.sg1.cells(1,1).toLowerCase() != "all" ? "":  
						" union "+
						"select distinct c.no_fa, c.no_sn, c.kode_lokfa, c.kode_klpfa, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik as qty, ifnull(e.bun,'-') as bun, "+
						" b.alamat, b.jml_fisik, b.no_label, b.kode_status, d.nama as nm_status "+(this.sg1.cells(2,4) == "TB" ? ",b.no_sertifikat, b.luas ":"")+",b.ket_lokasi, b.keterangan, b.no_inv, f.no_bukti, case a.progress when '0' then 'KKIL' when '1' then 'APP Area' when '2' then 'APP Regional' when '3' then 'APP IC' when '4' then 'Ret. ke Regional' when '5' then 'Ret. ke Area' when '6' then 'Ret Officer' end as status_app "+
						", g.info_kkp, g.status_asset, g.selisih, g.penjelasan,  g.keterangan as updesk,g.lokasi, g.ba, g.status_final, g.verifikasi, g.tindakan2 "+
						" from amu_asset c "+
						" inner join amu_distaset_d f on f.no_gabung = c.no_gabung and f.periode = c.periode "+
						" inner join amu_lokasi gg on gg.kode_lokfa = c.kode_lokfa and gg.kode_induk = '00' "+
						"	inner join amu_bagiklp_d h on h.kode_klpfa = c.kode_klpfa and h.periode = '"+this.app._periode+"' and h.jenis_proc = 'FISIK' " +
						"   left outer join amu_kkl_d b on c.no_gabung = b.no_gabung and c.periode = b.periode "+
						"	left outer join amu_kkl_m  a on a.no_inv = b.no_inv  and a.jenis ='"+this.sg1.cells(2,4)+"' "+				
						"	left outer join amu_rekon_d g on g.no_gabung = c.no_gabung and g.periode = c.periode "+	
					this.filterRep.filterStr("g.no_rekon",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and") +
						"	left outer join amu_status d on d.kode_status = b.kode_status and d.jenis = a.jenis "+
						"	left outer join xsapqtybun e on e.no_gabung = c.no_gabung "+					
					this.filterRep.filterStr("c.kode_lokfa",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+					
					this.filterRep.filterStr("c.kode_klpfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and") +
						" and "+( this.sg1.cells(2,4) == "TB" ? "" :" not " ) +" c.kode_klpfa like '101%' and g.no_gabung is null ")+" order by no_fa";
				}				
				this.scriptSqlCount = "select count(*) as tot "+					
						" from ("+sql+") a ";									
				if (this.sg1.cells(2,4) == "TB" ) {
					this.title = new server_util_arrayList({items:["No Aset","SNo.","Bus. Area","Asset Class","Asset Deskripsi","Deskripsi Alamat","Cap. Date","Acquis.Val","Accum.Val","Book.Val","Quantity SAP","BUN","Jml Fisik","No Label","Status","Ket. Status","No Sertifikat","Luas","Update Deskripsi","Update Alamat/lokasi","Keterangan","No Inventarisasi","No KKIL","KKIL = SAP ?","Aset Tercatat per Count Date","Selisih Fisik & Catatan","Penjelasan Selisih","Update Deskripsi","Update Lokasi","Update BA","Status Final","Cara Verifikasi","Tindak Lanjut Final"]});
					this.widthTable = new server_util_arrayList({items:[100,50,80,80,250,250,80,100,100,100,80,50,150,80,120,50,100,120,80,250,150,80,100,120,120,120,150,100,100,80,120,120]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N","N","N","N","S","S","S","S","S","S","S","S","S"]});																	
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","N","N","N"]});					
				}else {
					this.title = new server_util_arrayList({items:["No Aset","SNo.","Bus. Area","Asset Class","Asset Deskripsi","Deskripsi Alamat","Cap. Date","Acquis.Val","Accum.Val","Book.Val","Quantity SAP","BUN","Jml Fisik","No Label","Status","Ket. Status","Update Deskripsi","Update Alamat/Lokasi","Keterangan","No Inventarisasi","No KKIL","No KKIL","KKIL = SAP ?","Aset Tercatat per Count Date","Selisih Fisik & Catatan","Penjelasan Selisih","Update Deskripsi","Update Lokasi","Update BA","Status Final","Cara Verifikasi","Tindak Lanjut Final"]});
					this.widthTable = new server_util_arrayList({items:[100,50,80,80,250,250,80,100,100,100,80,50,150,80,120,50,100,250,150,80,100,120,120,120,150,100,100,80,120,120]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","N","N","N","N","S","S","S","S","S","S","S"]});																	
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","Y","Y","Y"]});					
				}
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
			"<table width='100%'> <tr> <td rowspan='2'><img src='image/telkomindonesia.png' width='170' height='100'/> </td> "+
			"			<td align='center'><span style='font-size:16;font-weight:bold;'>Daftar NKA Hasil Rekonsiliasi</span><br><span style='font-size:14;font-weight:bold;'>"+(this.sg1.cells(2,4) == "TB"  ? "Tanah Bangunan":"Non Tanah Bangunan")+"</span></td>"+
			"</tr>"+
			"<tr><td align='center'>Verifikasi Eksistensi Aset Tetap<br>Posisi : "+new Date().lclFormat() +"<br /></td></tr>"+			
			"</table>";
		var d = new Date();		
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		html += "<div align='center' style='width:100%;font-size:9;'>Dicetak "+ d.lclFullFormat()+"</div>" ;
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
