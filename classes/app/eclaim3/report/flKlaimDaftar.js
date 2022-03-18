window.app_eclaim3_report_flKlaimDaftar = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_report_flKlaimDaftar.prototype.parent.constructor.call(this,owner);
		this.className = "app_eclaim3_report_flKlaimDaftar";
		this.maximize();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Laporan Rekapitulasi Klaim",2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;server_util_mail;portalui_ConfirmMail");		
		this.p1 = new panel(this,{bound:[10,10,702,317],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,310],colCount:4,
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:14});
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
	this.gridLib.SGEditData(this.sg1,9,new Array(0,1), new Array("No Polis","All"));
	this.gridLib.SGEditData(this.sg1,10,new Array(0,1), new Array("Tanggal DOL","All"));
	this.gridLib.SGEditData(this.sg1,11,new Array(0,1,2), new Array("Posisi Klaim","All",""));
	this.gridLib.SGEditData(this.sg1,12,new Array(0,1,2), new Array("Jenis Laporan","=","Short"));
	this.gridLib.SGEditData(this.sg1,13,new Array(0,1,2), new Array("Sort By","=","No Klaim"));
	this.doSelectCell(this.sg1,2,13);
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
window.app_eclaim3_report_flKlaimDaftar.extend(window.portalui_childForm);
window.app_eclaim3_report_flKlaimDaftar.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_sebab,nama from tlk_sebab where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_sebab) from tlk_sebab  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_obyek,nama from tlk_obyek where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_obyek) from tlk_obyek  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Kejadian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok,nama from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_lok) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_lok","nama"),"and",new Array("kode","nama"));
		}
		if (row == 9)
		{
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_polis,keterangan from tlk_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(no_polis) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("no_polis","keterangan"),"and",new Array("No Polis","Keterangan"));
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
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13),new  Array("123","123","123","123","123","123","13","13","123","13","123","123","3","3"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13),new  Array(0,0,2,2,2,2,4,4,4,2,1,0,0,0));
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
		if (row === 11)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["0.Laporan Awal","1.Verifikasi","2.Bantek","3.Survey","4.Pengetesan","5.Tuntutan Klaim","6.Adjustment","7.Kelengkapan Dokumen","8.Penunjukan Mitra Kerja","9.Pelaksanaan Pekerjaan","10.Progress Pekerjaan","11.BAUT","12.BAST Parsial","13.BAST","14.Discharge Form"]);
		}
		if (row === 12)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Long","Short"]);
		}
		if (row === 13)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["No Klaim","Penyebab","Obyek","Lokasi","No Berkas","Nilai","DOL","Alamat"]);
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
			
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					  this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
					  " and a.status='1' ";
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
				if (this.sg1.getCell(1,10)=="=") 
				{
					this.filter=this.filter+" and a.tanggal='"+this.sg1.getCellDateValue(2,10)+"' ";
				}
				if (this.sg1.getCell(1,10)=="Range") 
				{
					this.filter=this.filter+" and a.tanggal between '"+this.sg1.getCellDateValue(2,10)+"' and '"+this.sg1.getCellDateValue(3,10)+"' ";
				}
				var tmp=this.sg1.getCell(2,11).split(".");
				var posisi="";
				if (tmp[0]!="")
				{
					posisi=" and a.progress='"+tmp[0]+"' ";
				}
				var order="";
				if (this.sg1.getCell(2,13)=="No Klaim") {order=" order by a.no_klaim desc";}	
				if (this.sg1.getCell(2,13)=="Penyebab") {order=" order by a.kode_sebab,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="Obyek") {order=" order by a.kode_obyek,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="Lokasi") {order=" order by a.kode_lok,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="Alamat") {order=" order by alamat,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="No Berkas") {order=" order by a.no_dokumen,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="Nilai") {order=" order by a.nilai,a.no_klaim ";}
				if (this.sg1.getCell(2,13)=="DOL") {order=" order by a.tanggal,a.no_klaim ";}
				this.showFilter = this.filterRep.showFilter(this.sg1);
				
				if (this.sg1.getCell(2,12)=="Long")
				{
					this.sql =  "select a.no_polis,date_format(k.periode_awal,'%d/%m/%Y')+' - '+date_format(k.periode_akhir,'%d/%m/%Y') as periode_polis,f.nama as nama_asuransi, date_format(a.tanggal,'%d/%m/%Y') as tanggal "+
							",e.nama as nama_lok,c.nama as nama_obyek,d.nama as nama_sebab,a.alamat,a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nilai, "+
							"j.no_ver,j.no_dokumen as dok_ver,date_format(j.tanggal,'%d/%m/%Y') as tgl_ver "+
							",date_format(h.tanggal,'%d/%m/%Y') as tgl_adjust,ifnull(h.nilai_nego,0) as nilai_adjust, "+
							"case  when a.progress='0' then 'Laporan Awal' "+
							" when a.progress='1' then 'Verifikasi' "+
							"when a.progress='R' then 'Revisi'  "+
							" when a.progress='2' then 'Survey'  "+
							" when a.progress='3' then 'Final Survey' "+ 
							" when a.progress='4' then 'Testing'  "+
							" when a.progress='5' then 'Final Testing' "+
							" when a.progress='6' then 'Negosiasi' "+
							" when a.progress='7' then 'Final Negosiasi' "+  
							" when a.progress='8' then 'SPPH' "+
							" when a.progress='9' then 'SPH'  "+
							" when a.progress='A' then 'SPK' "+ 
							" when a.progress='B' then 'BA Vendor' "+
							" when a.progress='C' then 'BA Telkom' "+ 
							" when a.progress='Z' then 'BA Telkom' "+
							" when a.progress='X' then 'No Claim' end as status "+
							"from tlk_klaim a "+
							"inner join tlk_ttg b on a.kode_ttg=b.kode_ttg "+
							"inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=c.kode_ttg "+
							"inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=d.kode_ttg "+
							"inner join tlk_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=e.kode_ttg "+
							"left join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi "+ 
							"left join tlk_polis k on a.no_polis=k.no_polis "+ 
							"left join tlk_survey g on a.no_klaim=g.no_klaim and g.status='FINAL' "+
							"left join tlk_nego h on a.no_klaim=h.no_klaim and h.status='FINAL' "+
							"left join tlk_ver_d i on a.no_klaim=i.no_bukti "+
							"left join tlk_ver_m j on i.no_ver=j.no_ver "+
							this.filter+user_lok+posisi+order;
					this.scriptSqlCount =   "select count(a.no_klaim) "+                         
							"from tlk_klaim a "+
							"inner join tlk_ttg b on a.kode_ttg=b.kode_ttg "+
							"inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=c.kode_ttg "+
							"inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=d.kode_ttg "+
							"inner join tlk_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=e.kode_ttg "+this.filter+user_lok+posisi;
					var title = new server_util_arrayList();			
					var width = new server_util_arrayList();
					var fieldType = new server_util_arrayList();
					title.add("No Polis");width.add(120);fieldType.add("S");
					title.add("Periode Polis");width.add(140);fieldType.add("S");
					title.add("Jenis Asuransi");width.add(100);fieldType.add("S");
					title.add("Tgl Kejadian ");width.add(60);fieldType.add("D");	
					title.add("Lokasi");width.add(100);fieldType.add("S");	
					title.add("Obyek Kerugian");width.add(100);fieldType.add("S");	
					title.add("Penyebab Kejadian");width.add(100);fieldType.add("S");
					title.add("Alamat");width.add(200);fieldType.add("S");	
					title.add("No Klaim");width.add(120);fieldType.add("S");		
					title.add("Tgl Lap Awal ");width.add(60);fieldType.add("D");	
					title.add("Nilai Estimasi");width.add(60);fieldType.add("N");
					title.add("No Verifikasi");width.add(120);fieldType.add("S");	
					title.add("No Dok Verifikasi");width.add(120);fieldType.add("D");	
					title.add("Tgl Verifikasi");width.add(60);fieldType.add("S");	
					title.add("Tgl Adjust ");width.add(60);fieldType.add("D");	
					title.add("Nilai Adjust");width.add(60);fieldType.add("N");
					title.add("Posisi");width.add(100);fieldType.add("S");
					var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,false);
				}
				if (this.sg1.getCell(2,12)=="Short")
				{
					this.sql =  "select a.no_polis,f.nama as nama_asuransi, date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(j.tanggal,'%d/%m/%Y') as tgl_ver "+
							",c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,a.alamat,a.no_klaim,a.nilai, "+
							"ifnull(h.nilai_nego,0) as nilai_adjust, "+
							"case  when a.progress='0' then 'Laporan Awal' "+
							" when a.progress='1' then 'Verifikasi' "+
							"when a.progress='R' then 'Revisi'  "+
							" when a.progress='2' then 'Survey'  "+
							" when a.progress='3' then 'Final Survey' "+ 
							" when a.progress='4' then 'Testing'  "+
							" when a.progress='5' then 'Final Testing' "+
							" when a.progress='6' then 'Negosiasi' "+
							" when a.progress='7' then 'Final Negosiasi' "+  
							" when a.progress='8' then 'SPPH' "+
							" when a.progress='9' then 'SPH'  "+
							" when a.progress='A' then 'SPK' "+ 
							" when a.progress='B' then 'BA Vendor' "+
							" when a.progress='C' then 'BA Telkom' "+ 
							" when a.progress='Z' then 'BA Telkom' "+
							" when a.progress='X' then 'No Claim' end as status "+
							"from tlk_klaim a "+
							"inner join tlk_ttg b on a.kode_ttg=b.kode_ttg "+
							"inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=c.kode_ttg "+
							"inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=d.kode_ttg "+
							"inner join tlk_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=e.kode_ttg "+
							"left join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi "+ 
							"left join tlk_polis k on a.no_polis=k.no_polis "+ 
							"left join tlk_survey g on a.no_klaim=g.no_klaim and g.status='FINAL' "+
							"left join tlk_nego h on a.no_klaim=h.no_klaim and h.status='FINAL' "+
							"left join tlk_ver_d i on a.no_klaim=i.no_bukti "+
							"left join tlk_ver_m j on i.no_ver=j.no_ver "+
							this.filter+user_lok+posisi+order ;
					
				
					this.scriptSqlCount =   "select count(a.no_klaim) "+                         
							"from tlk_klaim a "+
							"inner join tlk_ttg b on a.kode_ttg=b.kode_ttg "+
							"inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=c.kode_ttg "+
							"inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=d.kode_ttg "+
							"inner join tlk_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=e.kode_ttg "+this.filter+user_lok+posisi;
					var title = new server_util_arrayList();			
					var width = new server_util_arrayList();
					var fieldType = new server_util_arrayList();
					title.add("No Polis");width.add(120);fieldType.add("S");
					title.add("Jenis Asuransi");width.add(100);fieldType.add("S");
					title.add("Tgl Kejadian ");width.add(60);fieldType.add("D");	
					title.add("Tgl Verifikasi");width.add(60);fieldType.add("D");	
					title.add("Obyek Kerugian");width.add(100);fieldType.add("S");
					title.add("Penyebab Kejadian");width.add(100);fieldType.add("S");					
					title.add("Lokasi");width.add(100);fieldType.add("S");	
					title.add("Alamat");width.add(200);fieldType.add("S");	
					title.add("No Klaim");width.add(120);fieldType.add("S");		
					title.add("Nilai Estimasi");width.add(80);fieldType.add("N");
					title.add("Nilai Adjust");width.add(80);fieldType.add("N");
					title.add("Posisi");width.add(100);fieldType.add("S");
					
					var dthtml = this.dbLib.sqlToHtml(this.sql,1,this.pager, title, width,fieldType,false);
				}
				
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
			alert("[app_eclaim3_report_flKlaimDaftar]::mainButtonClick:"+e);
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
		html += "<span style='{font-size:9;}'>"+ this.showFilter+"</span>";							
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
