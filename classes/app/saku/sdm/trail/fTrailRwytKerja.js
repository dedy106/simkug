window.app_saku_sdm_trail_fTrailRwytKerja = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_saku_sdm_trail_fTrailRwytKerja.prototype.parent.constructor.call(this, owner);
			this.className = "app_saku_sdm_trail_fTrailRwytKerja";			
			this.maximize();
			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Riwayat Pekerjaan", 2);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			
			uses("portalui_panel");
			this.p1 = new portalui_panel(this);
			this.p1.setWidth(720);
			this.p1.setLeft(10);
			this.p1.setTop(10);
			this.p1.setHeight(150);
			this.p1.setBorder(3);
			this.p1.setCaption("Filter");
			this.p1.show();
			
			uses("portalui_saiGrid");
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setWidth(700);
			this.sg1.setHeight(100);
			this.sg1.setLeft(10);
			this.sg1.setTop(25);
			this.sg1.setColCount(4);
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onSelectCell.set(this, "doSelectCell");
			this.sg1.onEllipsClick.set(this, "doEllipseClick");
			this.sg1.onChange.set(this, "sg1onChange");
			
				this.sg1.columns.get(0).setColWidth(250);
				this.sg1.columns.get(0).setTitle("Filter");
				this.sg1.columns.get(0).setReadOnly(true);
				
				this.sg1.columns.get(1).setTitle("Type");
				this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
				var val = new portalui_arrayMap();
				val.set(1, "All");
				val.set(2, "=");
				val.set(3, "Range");
				val.set(4, "Like");
				val.set(5, "<=");
				this.sg1.columns.get(1).setPicklist(val);
				this.sg1.columns.get(2).setColWidth(150);
				this.sg1.columns.get(2).setTitle("From");
				this.sg1.columns.get(3).setColWidth(150);
				this.sg1.columns.get(3).setTitle("To");
				
				this.sg1.setRowCount(3);
			uses("portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this);
			this.viewer.setWidth(this.getWidth());
			this.viewer.setHeight(this.getHeight());
			this.viewer.setTop(0);
			this.viewer.setVisible(false);
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);		

			uses("server_report_report");
			this.report = new server_report_report();
			this.report.addListener(this);
		}
		uses("util_filterRep");
		this.filterRep = new util_filterRep();
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1,2),new  Array(2,2,2));
		
		uses("util_gridLib");
		this.gridLib = new util_gridLib();
		
		uses("util_standar");
		this.standar = new util_standar();
		
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;
		if (this.userStatus=="A")
		{
			this.tanda="All";
			this.lokasi="";
		}
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Kode Unit Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["NIP","All",""]);
		
			this.loker = new Array();
			this.cekFilter=true;
			this.cekMG = new Array();
	}catch(e)
	{
		alert("[app_saku_sdm_trail_fTrailRwytKerja]::contructor: "+e);
	}
};
window.app_saku_sdm_trail_fTrailRwytKerja.extend(window.portalui_childForm);
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{
		this.standar.ListDataSGFilter2(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama,kode_lokkonsol from hr_lokasi ",
												  "select count(*) from hr_lokasi ",
												  new Array("kode_lokasi","nama"),"where",new Array("Kode","Nama","Konsolidasi"));
	}
	if (row == 1)
	{
		this.standar.ListDataSGFilter2(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_loker,nama,kode_lokasi from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												  "select count(*) from hr_loker "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
												  new Array("kode_loker","nama"),"where",new Array("Kode","Nama","Lokasi"));
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.nik, a.nama,b.kode_lokasi from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokasi='-' "+this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												  this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
												  "select count(*) from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokasi='-' "+this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
												  this.filterRep.filterStr("b.kode_loker",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
												  new Array("a.nik","a.nama"),"where",new Array("NIK","Nama","Lokasi"));
	}
};
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,new Array(0,1,2),new  Array("3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,new Array(0,1,2),new  Array(2,2,2));
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1,row,new Array(0,1,2),new  Array("3","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,new Array(0,1,2),new  Array(3,2,2));
	}
};
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.execTrail = function(kode)
{
	try
	{
		var data = this.dbLib.runSQL("select count(b.kode_lokasi) as jum,a.* "+
					"from hr_lokasi a left outer join hr_loker b on a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi like '%"+kode+
					"' group by a.kode_lokasi ");
		if (data instanceof portalui_arrayMap)
		{
			this.mg1.clear();
			if (data.get(0) != undefined)
			{
				for (var i in data.objList)
				{
					this.mg1.appendRow(this.mg1);
					this.mg1.setCell(0,i,data.get(i).get("kode_lokasi"));
					this.mg1.setCell(1,i,data.get(i).get("nama"));
					this.mg1.setCell(2,i,data.get(i).get("alamat"));
					this.mg1.setCell(3,i,data.get(i).get("kota"));
					this.mg1.setCell(4,i,data.get(i).get("kodepos"));
					this.mg1.setCell(5,i,data.get(i).get("no_telp"));
					this.mg1.setCell(6,i,data.get(i).get("jum"));
					var node = this.mg1.rows.get(i);
					this.mg = new portalui_mdGrid(node);
					this.mg.setTop(0);
					this.mg.setLeft(1);
					this.mg.setHeight(415);
					this.cekMG[data.get(i).get("kode_lokasi")]=true;
				}
			}
		}
    }catch(e)
	{
		alert("[app_saku_sdm_trail_fTrailRwytKerja]::execTrail:"+e);
	}
};
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			if (this.cekFilter)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kode Unit Kerja","All",""));
			}else
			{
				this.p.free();
				this.p1.show();
				this.cekFilter=true;
			}
		}else
		{
			this.p1.hide();
			this.cekFilter=false;
			//this.filter = this.filterRep.filterStr("a.nik",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"where");
			this.createPanelRwyt();
			this.execTrail(this.sg1.getCell(2,0));
		}
    }catch(e)
	{
		alert("[app_saku_sdm_trail_fTrailRwytKerja]::mainButtonClick:"+e);
	}
};
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.createPanelRwyt = function()
{
	this.p = new portalui_panel(this);
	this.p.setWidth(system.screenWidth-15);
	this.p.setLeft(5);
	this.p.setTop(5);
	this.p.setHeight(455);
	this.p.setBorder(3);
	this.p.setCaption("Riwayat Pekerjaan");
	
	uses("portalui_mdGrid");
	this.mg1 = new portalui_mdGrid(this.p);
	this.mg1.setTop(20);
	this.mg1.setName("mg1");
	this.mg1.setWidth(this.p.width-4);
	this.mg1.setLeft(1);
	this.mg1.setHeight(432);
	this.mg1.setColCount(7);
	this.mg1.setReadOnly(true);
	this.mg1.columns.get(0).setTitle("Kode");
	this.mg1.columns.get(0).setColWidth(100);
	this.mg1.columns.get(1).setTitle("Nama Lokasi");
	this.mg1.columns.get(1).setColWidth(250);
	this.mg1.columns.get(2).setTitle("Alamat");
	this.mg1.columns.get(2).setColWidth(300);
	this.mg1.columns.get(3).setTitle("Kota");
	this.mg1.columns.get(3).setColWidth(150);
	this.mg1.columns.get(4).setTitle("Kode Pos");
	this.mg1.columns.get(4).setColWidth(95);
	this.mg1.columns.get(5).setTitle("Telepon");
	this.mg1.columns.get(5).setColWidth(100);
	this.mg1.columns.get(6).setTitle("Jumlah Unit Kerja");
	this.mg1.columns.get(6).setColWidth(100);
	this.mg1.onExpand.set(this, "mgOnExpand");
};
window.app_saku_sdm_trail_fTrailRwytKerja.prototype.mgOnExpand = function(sender)
{
	if (sender.owner == this.mg1)
	{
		if (this.cekMG[sender.getCellValue(0)])
		{
			this.cekMG[sender.getCellValue(0)]=false;
			var node = this.mg1.rows.get(sender.rowIndex);
			this.mg2 = new portalui_mdGrid(node);
			this.mg2.setName(sender.getCellValue(0));		
			this.mg2.setTop(0);
			this.mg2.setLeft(1);
			this.mg2.setWidth(node.width);
			this.mg2.setHeight(415);
			this.mg2.setColCount(8);
			this.mg2.columns.get(0).setTitle("Kode");
			this.mg2.columns.get(0).setColWidth(100);
			this.mg2.columns.get(1).setTitle("Unit Kerja");
			this.mg2.columns.get(1).setColWidth(150);
			this.mg2.columns.get(2).setTitle("Inisial");
			this.mg2.columns.get(2).setColWidth(70);
			this.mg2.columns.get(3).setTitle("Alamat");
			this.mg2.columns.get(3).setColWidth(250);
			this.mg2.columns.get(4).setTitle("Kota");
			this.mg2.columns.get(4).setColWidth(120);
			this.mg2.columns.get(5).setTitle("Propinsi");
			this.mg2.columns.get(5).setColWidth(150);
			this.mg2.columns.get(6).setTitle("Kode Pos");
			this.mg2.columns.get(6).setColWidth(80);
			this.mg2.columns.get(7).setTitle("Telepon");
			this.mg2.columns.get(7).setColWidth(100);		
			this.mg2.onExpand.set(this, "mgOnExpand");
			var data=this.dbLib.runSQL("select * from hr_loker where kode_lokasi='"+sender.getCellValue(0)+"' and kode_loker like '%"+this.sg1.getCell(2,1)+"'");
			if (data instanceof portalui_arrayMap) 
			{
				this.mg2.clear();
				if (data.get(0) != undefined)
				{
					for (var j in data.objList)
					{
						this.mg2.appendRow(this.mg2);
						this.mg2.setCell(0,j,data.get(j).get("kode_loker"));
						this.mg2.setCell(1,j,data.get(j).get("nama"));
						this.mg2.setCell(2,j,data.get(j).get("initial"));
						this.mg2.setCell(3,j,data.get(j).get("alamat"));
						this.mg2.setCell(4,j,data.get(j).get("kota"));
						this.mg2.setCell(5,j,data.get(j).get("propinsi"));
						this.mg2.setCell(6,j,data.get(j).get("kode_pos"));
						this.mg2.setCell(7,j,data.get(j).get("telephone"));
						node = this.mg2.rows.get(j);
						this.mg = new portalui_mdGrid(node);
						this.mg.setTop(0);
						this.mg.setLeft(1);
						this.mg.setHeight(360);
						this.cekMG[data.get(j).get("kode_loker")]=true;
					}
				}
			}		
		}
	}
	if (sender.owner == this.mg2)
	{
		if (this.cekMG[sender.getCellValue(0)])
		{
			this.cekMG[sender.getCellValue(0)]=false;
			var node = this.mg2.rows.get(sender.rowIndex);
			this.mg3 = new portalui_mdGrid(node);
			this.mg3.setName(sender.getCellValue(0));		
			this.mg3.setTop(0);
			this.mg3.setLeft(1);
			this.mg3.setWidth(node.width);
			this.mg3.setHeight(415);
			this.mg3.setColCount(6);
			this.mg3.columns.get(0).setTitle("NIK");
			this.mg3.columns.get(0).setColWidth(100);
			this.mg3.columns.get(1).setTitle("Nama");
			this.mg3.columns.get(1).setColWidth(250);
			this.mg3.columns.get(2).setTitle("Agama");
			this.mg3.columns.get(2).setColWidth(150);
			this.mg3.columns.get(3).setTitle("Tempat Lahir");
			this.mg3.columns.get(3).setColWidth(200);
			this.mg3.columns.get(4).setTitle("Tanggal Lahir");
			this.mg3.columns.get(4).setColWidth(150);
			this.mg3.columns.get(5).setTitle("Tanggal Masuk");
			this.mg3.columns.get(5).setColWidth(150);		
			this.mg3.onExpand.set(this, "mgOnExpand");
			var data=this.dbLib.runSQL("select k.nik,k.nama,k.agama,k.tempat_lahir,date_format(k.tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(k.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan k inner join hr_dinas2 b on k.nik=b.nik "+
					"where b.kode_loker='"+sender.getCellValue(0)+"' and k.nik like '%"+this.sg1.getCell(2,2)+"'");
			if (data instanceof portalui_arrayMap)
			{
				this.mg3.clear();
				if (data.get(0) != undefined)
				{
					for (var j in data.objList)
					{
						this.mg3.appendRow(this.mg3);
						this.mg3.setCell(0,j,data.get(j).get("nik"));
						this.mg3.setCell(1,j,data.get(j).get("nama"));
						this.mg3.setCell(2,j,data.get(j).get("agama"));
						this.mg3.setCell(3,j,data.get(j).get("tempat_lahir"));
						this.mg3.setCell(4,j,data.get(j).get("tgllhr"));
						this.mg3.setCell(5,j,data.get(j).get("tglmsk"));
						node = this.mg3.rows.get(j);
						this.mg = new portalui_mdGrid(node);
						this.mg.setTop(0);
						this.mg.setLeft(1);
						this.mg.setHeight(360);					
						this.loker[data.get(j).get("nik")]=sender.getCellValue(0);
						this.cekMG[data.get(j).get("nik")]=true;
					}
				}
			}
		}
	}
	if (sender.owner == this.mg3)
	{
		if (this.cekMG[sender.getCellValue(0)])
		{
			this.cekMG[sender.getCellValue(0)]=false;
			var node = this.mg3.rows.get(sender.rowIndex);
			this.mg4 = new portalui_mdGrid(node);
			this.mg4.setName(sender.getCellValue(0));
			this.mg4.setTop(0);
			this.mg4.setLeft(1);
			this.mg4.setWidth(node.width);
			this.mg4.setHeight(360);
			this.mg4.setColCount(1);
			this.mg4.columns.get(0).setTitle("Detail");
			this.mg4.columns.get(0).setColWidth(this.p.width-24);
			this.mg4.onExpand.set(this, "mgOnExpand");
			for (var r=0;r<10;r++) 
			{
				this.mg4.appendRow(this.mg4);
				node = this.mg4.rows.get(r);
				this.mg = new portalui_mdGrid(node);
				this.mg.setTop(0);
				this.mg.setLeft(1);
				this.mg.setHeight(140);
			}
			this.mg4.setCell(0,0,"Posisi Sekarang");
			this.mg4.setCell(0,1,"Orang Tua");
			this.mg4.setCell(0,2,"Pasangan");
			this.mg4.setCell(0,3,"Mertua");
			this.mg4.setCell(0,4,"Anak");
			this.mg4.setCell(0,5,"Riwayat Kedinasan");
			this.mg4.setCell(0,6,"Riwayat Pendidikan");
			this.mg4.setCell(0,7,"Riwayat Pelatihan");
			this.mg4.setCell(0,8,"Riwayat PPKI");
			this.mg4.setCell(0,9,"Riwayat Penghargaan");
			for (var r=0;r<10;r++) {this.cekMG[sender.getCellValue(0)+" "+this.mg4.getCell(0,r)]=true;}
		}
	}
	if (sender.owner == this.mg4)
	{
		switch (sender.rowIndex)
		{
			case 0 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var pos = this.mg4.rows.get(0);
					this.mg5 = new portalui_mdGrid(pos);
					this.mg5.setTop(0);
					this.mg5.setLeft(1);
					this.mg5.setWidth(pos.width);
					this.mg5.setHeight(140);
					this.mg5.setColCount(3);
					this.mg5.columns.get(0).setTitle("DATA");
					this.mg5.columns.get(0).setColWidth(100);
					this.mg5.columns.get(1).setTitle("Saat Ini");
					this.mg5.columns.get(1).setColWidth(350);
					this.mg5.columns.get(2).setTitle("Sejak Tanggal");
					this.mg5.columns.get(2).setColWidth(100);
					var tgkt = this.dbLib.runSQL("select date_format(a.tgl_masuk,'%e %M %Y') as tglmsk, "+
					"d.tingkat2,date_format(d.tgl_skmulai,'%e %M %Y') as tglawl,b.mk_tahun,b.mk_bulan "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokasi='-' "+
					"inner join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) "+
					"inner join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) where a.nik='"+sender.owner.getName()+"'");
					var loker = this.dbLib.runSQL("select a.saatini,a.tgl,min(a.mulai) from ("+
					"(select a.nik as nip,b.initial as saatini,date_format(a.tgl_skmulai,'%e %M %Y') as tgl,a.tgl_skmulai as mulai from hr_dinas2 a inner join hr_loker b on a.kode_loker=b.kode_loker) union "+
					"(select a.nik as nip,b.initial as saatini,date_format(a.tgl_skmulai,'%e %M %Y') as tgl,a.tgl_skmulai as mulai from hr_rwymutasi a inner join hr_loker b on a.kode_loker2=b.kode_loker) ) as a "+
					"where a.nip='"+sender.owner.getName()+"' group by a.mulai ");
					var jabs = this.dbLib.runSQL("select kode_jabs2,date_format(tgl_skmulai,'%e %M %Y') as tgl,min(tgl_skmulai) from hr_jabs "+
							"where nik='"+sender.owner.getName()+"' group by tgl_skmulai ");
					var jabf = this.dbLib.runSQL("select kode_jabf2,date_format(tgl_skmulai,'%e %M %Y') as tgl,min(tgl_skmulai) from hr_jabf "+
							"where nik='"+sender.owner.getName()+"' group by tgl_skmulai ");
					for (var r=0;r<5;r++) {this.mg5.appendRow(this.mg5);}
					this.mg5.setCell(0,0,"Tingkat");
					this.mg5.setCell(0,1,"Lokasi Kerja");
					this.mg5.setCell(0,2,"Jabatan Struktural");
					this.mg5.setCell(0,3,"Jabatan Fungsional");
					this.mg5.setCell(0,4,"Masa Kerja");
					if (tgkt instanceof portalui_arrayMap)
					{
						if (tgkt.get(0) != undefined)
						{
							this.mg5.setCell(1,0,tgkt.get(0).get("tingkat2"));
							this.mg5.setCell(2,0,tgkt.get(0).get("tglawl"));
							this.mg5.setCell(1,4,tgkt.get(0).get("mk_tahun")+" tahun, "+tgkt.get(0).get("mk_bulan")+" bulan");
							this.mg5.setCell(2,4,tgkt.get(0).get("tglmsk"));
						}
					}
					if (loker instanceof portalui_arrayMap)
					{
						if (loker.get(0) != undefined)
						{
							this.mg5.setCell(1,1,loker.get(0).get("saatini"));
							this.mg5.setCell(2,1,loker.get(0).get("tgl"));
						}
					}
					if (jabs instanceof portalui_arrayMap)
					{
						if (jabs.get(0) != undefined)
						{
							this.mg5.setCell(1,2,jabs.get(0).get("kode_jabs2"));
							this.mg5.setCell(2,2,jabs.get(0).get("tgl"));
						}
					}
					if (jabf instanceof portalui_arrayMap)
					{
						if (jabf.get(0) != undefined)
						{
							this.mg5.setCell(1,3,jabf.get(0).get("kode_jabf2"));
							this.mg5.setCell(2,3,jabf.get(0).get("tgl"));
						}
					}
				}
			break;
			case 1 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var ortu = this.mg4.rows.get(1);
					ortu.setDetailHeight(142);
					this.mg6 = new portalui_mdGrid(ortu);
					this.mg6.setTop(0);
					this.mg6.setLeft(1);
					this.mg6.setWidth(ortu.width);
					this.mg6.setHeight(140);
					this.mg6.setColCount(8);
					this.mg6.columns.get(0).setTitle("Orang Tua");
					this.mg6.columns.get(0).setColWidth(80);
					this.mg6.columns.get(1).setTitle("Nama");
					this.mg6.columns.get(1).setColWidth(150);
					this.mg6.columns.get(2).setTitle("Status");
					this.mg6.columns.get(2).setColWidth(100);
					this.mg6.columns.get(3).setTitle("Alamat");
					this.mg6.columns.get(3).setColWidth(200);
					this.mg6.columns.get(4).setTitle("Kota");
					this.mg6.columns.get(4).setColWidth(100);
					this.mg6.columns.get(5).setTitle("Kode Pos");
					this.mg6.columns.get(5).setColWidth(80);
					this.mg6.columns.get(6).setTitle("Provinsi");
					this.mg6.columns.get(6).setColWidth(150);
					this.mg6.columns.get(7).setTitle("Telepon");
					this.mg6.columns.get(7).setColWidth(100);									
					data = this.dbLib.runSQL("select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp "+
											"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Ayah','Ibu')");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg6.clear();
							for (var l in data.objList)
							{
								this.mg6.appendRow(this.mg6);
								this.mg6.setCell(0,l,data.get(l).get("status_family"));
								this.mg6.setCell(1,l,data.get(l).get("nama"));
								this.mg6.setCell(2,l,data.get(l).get("status"));
								this.mg6.setCell(3,l,data.get(l).get("alamat"));
								this.mg6.setCell(4,l,data.get(l).get("kota"));
								this.mg6.setCell(5,l,data.get(l).get("kodepos"));
								this.mg6.setCell(6,l,data.get(l).get("provinsi"));
								this.mg6.setCell(7,l,data.get(l).get("no_telp"));
							}
						}
					}
				}
			break;
			case 2 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var pas = this.mg4.rows.get(2);
					pas.setDetailHeight(142);
					this.mg7 = new portalui_mdGrid(pas);
					this.mg7.setTop(0);
					this.mg7.setLeft(1);
					this.mg7.setWidth(pas.width);
					this.mg7.setHeight(140);
					this.mg7.setColCount(7);
					this.mg7.columns.get(0).setTitle("Nama");
					this.mg7.columns.get(0).setColWidth(150);
					this.mg7.columns.get(1).setTitle("Tempat Lahir");
					this.mg7.columns.get(1).setColWidth(100);
					this.mg7.columns.get(2).setTitle("Tanggal Lahir");
					this.mg7.columns.get(2).setColWidth(100);
					this.mg7.columns.get(3).setTitle("Tanggal Nikah");
					this.mg7.columns.get(3).setColWidth(100);
					this.mg7.columns.get(4).setTitle("Status Pekerjaan");
					this.mg7.columns.get(4).setColWidth(100);
					this.mg7.columns.get(5).setTitle("Institusi");
					this.mg7.columns.get(5).setColWidth(100);
					this.mg7.columns.get(6).setTitle("NIK");
					this.mg7.columns.get(6).setColWidth(100);
					data = this.dbLib.runSQL("select nama,tempat_lahir,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(tgl_nikah,'%d/%m/%Y') as tglnkh,status_kerja,institusi,nik2 "+
											"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Suami','Istri')");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg7.clear();
							for (var l in data.objList)
							{
								this.mg7.appendRow(this.mg7);
								this.mg7.setCell(0,l,data.get(l).get("nama"));
								this.mg7.setCell(1,l,data.get(l).get("tempat_lahir"));
								this.mg7.setCell(2,l,data.get(l).get("tgllhr"));
								this.mg7.setCell(3,l,data.get(l).get("tglnkh"));
								this.mg7.setCell(4,l,data.get(l).get("status_kerja"));
								this.mg7.setCell(5,l,data.get(l).get("institusi"));
								this.mg7.setCell(6,l,data.get(l).get("nik2"));
							}
						}
					}
				}
			break;
			case 3 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var mertua = this.mg4.rows.get(3);
					mertua.setDetailHeight(142);
					this.mg8 = new portalui_mdGrid(mertua);
					this.mg8.setTop(0);
					this.mg8.setLeft(1);
					this.mg8.setWidth(mertua.width);
					this.mg8.setHeight(140);
					this.mg8.setColCount(8);
					this.mg8.columns.get(0).setTitle("Mertua");
					this.mg8.columns.get(0).setColWidth(80);
					this.mg8.columns.get(1).setTitle("Nama");
					this.mg8.columns.get(1).setColWidth(150);
					this.mg8.columns.get(2).setTitle("Status");
					this.mg8.columns.get(2).setColWidth(100);
					this.mg8.columns.get(3).setTitle("Alamat");
					this.mg8.columns.get(3).setColWidth(200);
					this.mg8.columns.get(4).setTitle("Kota");
					this.mg8.columns.get(4).setColWidth(100);
					this.mg8.columns.get(5).setTitle("Kode Pos");
					this.mg8.columns.get(5).setColWidth(80);
					this.mg8.columns.get(6).setTitle("Provinsi");
					this.mg8.columns.get(6).setColWidth(150);
					this.mg8.columns.get(7).setTitle("Telepon");
					this.mg8.columns.get(7).setColWidth(100);
					data = this.dbLib.runSQL("select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp "+
											"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Ayah Mertua','Ibu Mertua')");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg8.clear();
							for (var l in data.objList)
							{
								this.mg8.appendRow(this.mg8);
								this.mg8.setCell(0,l,data.get(l).get("status_family"));
								this.mg8.setCell(1,l,data.get(l).get("nama"));
								this.mg8.setCell(2,l,data.get(l).get("status"));
								this.mg8.setCell(3,l,data.get(l).get("alamat"));
								this.mg8.setCell(4,l,data.get(l).get("kota"));
								this.mg8.setCell(5,l,data.get(l).get("kodepos"));
								this.mg8.setCell(6,l,data.get(l).get("provinsi"));
								this.mg8.setCell(7,l,data.get(l).get("no_telp"));
							}
						}
					}
				}
			break;
			case 4 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var anak = this.mg4.rows.get(4);
					anak.setDetailHeight(142);
					this.mg9 = new portalui_mdGrid(anak);
					this.mg9.setTop(0);
					this.mg9.setLeft(1);
					this.mg9.setWidth(anak.width);
					this.mg9.setHeight(140);
					this.mg9.setColCount(6);
					this.mg9.columns.get(0).setTitle("Nama");
					this.mg9.columns.get(0).setColWidth(150);
					this.mg9.columns.get(1).setTitle("Status");
					this.mg9.columns.get(1).setColWidth(100);
					this.mg9.columns.get(2).setTitle("Jenis Kelamin");
					this.mg9.columns.get(2).setColWidth(100);
					this.mg9.columns.get(3).setTitle("Tanggal Lahir");
					this.mg9.columns.get(3).setColWidth(100);
					this.mg9.columns.get(4).setTitle("Status Tanggungan");
					this.mg9.columns.get(4).setColWidth(150);
					this.mg9.columns.get(5).setTitle("Status Anak");
					this.mg9.columns.get(5).setColWidth(100);
					data = this.dbLib.runSQL("select nama,status,sex,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,status_tanggungan,status_anak "+
											"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Anak')");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg9.clear();
							for (var l in data.objList)
							{
								this.mg9.appendRow(this.mg9);
								this.mg9.setCell(0,l,data.get(l).get("nama"));
								this.mg9.setCell(1,l,data.get(l).get("status"));
								this.mg9.setCell(2,l,data.get(l).get("sex"));
								this.mg9.setCell(3,l,data.get(l).get("tgllhr"));
								this.mg9.setCell(4,l,data.get(l).get("status_tanggungan"));
								this.mg9.setCell(5,l,data.get(l).get("status_anak"));
							}
						}
					}
				}
			break;
			case 5 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var dinas = this.mg4.rows.get(5);
					dinas.setDetailHeight(142);
					this.mg10 = new portalui_mdGrid(dinas);
					this.mg10.setTop(0);
					this.mg10.setLeft(1);
					this.mg10.setWidth(dinas.width);
					this.mg10.setHeight(140);
					this.mg10.setColCount(9);
					this.mg10.columns.get(0).setTitle("Tingkat");
					this.mg10.columns.get(0).setColWidth(80);
					this.mg10.columns.get(1).setTitle("Loker");
					this.mg10.columns.get(1).setColWidth(80);
					this.mg10.columns.get(2).setTitle("Jab. Struktural");
					this.mg10.columns.get(2).setColWidth(100);
					this.mg10.columns.get(3).setTitle("Jab. Fungsional");
					this.mg10.columns.get(3).setColWidth(100);
					this.mg10.columns.get(4).setTitle("Tanggal. SK");
					this.mg10.columns.get(4).setColWidth(80);
					this.mg10.columns.get(5).setTitle("Nomor SK");
					this.mg10.columns.get(5).setColWidth(150);
					this.mg10.columns.get(6).setTitle("Tgl. Berlaku");
					this.mg10.columns.get(6).setColWidth(80);
					this.mg10.columns.get(7).setTitle("Jenis SK");
					this.mg10.columns.get(7).setColWidth(100);
					this.mg10.columns.get(8).setTitle("Keterangan");
					this.mg10.columns.get(8).setColWidth(150);
					data = this.dbLib.runSQL("select a.nip,a.tingkat,a.loker,a.jabs,a.jabf,a.tglsk,a.nosk,a.tgl,a.jenis,a.ket "+
				"from ( "+
				"(select a.nik as nip,a.tingkat as tingkat,b.initial as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Peng. Peg. Tetap' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_angkat a inner join hr_loker b on a.kode_loker=b.kode_loker) union "+
				"(select a.nik as nip,a.tingkat as tingkat,b.initial as loker,a.kode_jabs as jabs,a.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Peng. Peg. Tetap' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_dinas2 a inner join hr_loker b on a.kode_loker=b.kode_loker) union "+
				"(select a.nik as nip,a.tingkat as tingkat,b.initial as loker,a.kode_jabs2 as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Penetapan Jab. Struk' as jenis,'-' as ket,a.tgl_skmulai as mulai "+
				 "from hr_jabs a inner join hr_loker b on a.kode_loker=b.kode_loker) union "+
				"(select a.nik as nip,a.tingkat as tingkat,b.initial as loker,'-' as jabs,a.kode_jabf2 as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Penetapan Jab. Fung' as jenis,'-' as ket,a.tgl_skmulai as mulai "+
				 "from hr_jabf a inner join hr_loker b on a.kode_loker=b.kode_loker) union "+
				"(select a.nik as nip,a.tingkat as tingkat,'-' as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Kenaikan Gadas' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_gadas a ) union "+
				"(select a.nik as nip,'-' as tingkat,'-' as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Perubahan Status' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_rwystatus a ) union "+
				"(select a.nik as nip,'-' as tingkat,'-' as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Perubahan Profesi' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_rwyprofesi a ) union "+
				"(select a.nik as nip,a.tingkat2 as tingkat,'-' as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Kenaikan Tingkat' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_tingkat a ) union "+
				"(select a.nik as nip,'-' as tingkat,b.initial as loker,'-' as jabs,'-' as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Mutasi Loker' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai "+
				 "from hr_rwymutasi a inner join hr_loker b on a.kode_loker2=b.kode_loker) "+
				") as a "+
				"where a.nip='"+sender.owner.getName()+"' order by a.mulai desc,a.jabf");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg10.clear();
							for (var l in data.objList)
							{
								this.mg10.appendRow(this.mg10);
								this.mg10.setCell(0,l,data.get(l).get("tingkat"));
								this.mg10.setCell(1,l,data.get(l).get("loker"));
								this.mg10.setCell(2,l,data.get(l).get("jabs"));
								this.mg10.setCell(3,l,data.get(l).get("jabf"));
								this.mg10.setCell(4,l,data.get(l).get("tglsk"));
								this.mg10.setCell(5,l,data.get(l).get("nosk"));
								this.mg10.setCell(6,l,data.get(l).get("tgl"));
								this.mg10.setCell(7,l,data.get(l).get("jenis"));
								this.mg10.setCell(8,l,data.get(l).get("ket"));
							}
						}
					}
				}
			break;
			case 6 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var pend = this.mg4.rows.get(6);
					pend.setDetailHeight(142);
					this.mg12 = new portalui_mdGrid(pend);
					this.mg12.setTop(0);
					this.mg12.setLeft(1);
					this.mg12.setWidth(pend.width);
					this.mg12.setHeight(140);
					this.mg12.setColCount(6);
					this.mg12.columns.get(0).setTitle("Nama Institusi");
					this.mg12.columns.get(0).setColWidth(150);
					this.mg12.columns.get(1).setTitle("Jurusan/Fakultas");
					this.mg12.columns.get(1).setColWidth(150);
					this.mg12.columns.get(2).setTitle("Gelar");
					this.mg12.columns.get(2).setColWidth(100);
					this.mg12.columns.get(3).setTitle("Tahun Selesai");
					this.mg12.columns.get(3).setColWidth(100);
					this.mg12.columns.get(4).setTitle("Setara");
					this.mg12.columns.get(4).setColWidth(100);
					this.mg12.columns.get(5).setTitle("Keterangan");
					this.mg12.columns.get(5).setColWidth(100);
					data = this.dbLib.runSQL("select institusi,jurusan,jenjang,tahun,setara,keterangan "+
							"from hr_rwypddk "+
							"where nik='"+sender.owner.getName()+"' order by tahun desc");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg12.clear();
							for (var l in data.objList)
							{
								this.mg12.appendRow(this.mg12);
								this.mg12.setCell(0,l,data.get(l).get("institusi"));
								this.mg12.setCell(1,l,data.get(l).get("jurusan"));
								this.mg12.setCell(2,l,data.get(l).get("jenjang"));
								this.mg12.setCell(3,l,data.get(l).get("tahun"));
								this.mg12.setCell(4,l,data.get(l).get("setara"));
								this.mg12.setCell(5,l,data.get(l).get("keterangan"));
							}
						}
					}
				}
			break;
			case 7 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var pel = this.mg4.rows.get(7);
					pel.setDetailHeight(142);
					this.mg13 = new portalui_mdGrid(pel);
					this.mg13.setTop(0);
					this.mg13.setLeft(1);
					this.mg13.setWidth(pel.width);
					this.mg13.setHeight(140);
					this.mg13.setColCount(6);
					this.mg13.columns.get(0).setTitle("Nama Pelatihan");
					this.mg13.columns.get(0).setColWidth(150);
					this.mg13.columns.get(1).setTitle("Lama Pelatihan");
					this.mg13.columns.get(1).setColWidth(100);
					this.mg13.columns.get(2).setTitle("Tanggal Mulai");
					this.mg13.columns.get(2).setColWidth(100);
					this.mg13.columns.get(3).setTitle("Tanggal Selesai");
					this.mg13.columns.get(3).setColWidth(100);
					this.mg13.columns.get(4).setTitle("Penyelenggara");
					this.mg13.columns.get(4).setColWidth(150);
					this.mg13.columns.get(5).setTitle("Kota");
					this.mg13.columns.get(5).setColWidth(100);
					data = this.dbLib.runSQL("select latih,lama,date_format(tgl_mulai,'%d-%m-%Y') as tglawl, "+
				"date_format(tgl_selesai,'%d-%m-%Y') as tglend,panitia,kota "+
				"from hr_rwylatih "+
				"where nik='"+sender.owner.getName()+"' order by tgl_mulai desc");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg13.clear();
							for (var l in data.objList)
							{
								this.mg13.appendRow(this.mg13);
								this.mg13.setCell(0,l,data.get(l).get("latih"));
								this.mg13.setCell(1,l,data.get(l).get("lama"));
								this.mg13.setCell(2,l,data.get(l).get("tglawl"));
								this.mg13.setCell(3,l,data.get(l).get("tglend"));
								this.mg13.setCell(4,l,data.get(l).get("panitia"));
								this.mg13.setCell(5,l,data.get(l).get("kota"));
							}
						}
					}
				}
			break;
			case 8 :
			
			break;
			case 9 :
				if (this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)])
				{
					this.cekMG[sender.owner.getName()+" "+sender.getCellValue(0)]=false;
					var hrg = this.mg4.rows.get(9);
					hrg.setDetailHeight(142);
					this.mg15 = new portalui_mdGrid(hrg);
					this.mg15.setTop(0);
					this.mg15.setLeft(1);
					this.mg15.setWidth(hrg.width);
					this.mg15.setHeight(140);
					this.mg15.setColCount(5);
					this.mg15.columns.get(0).setTitle("Nama Penghargaan");
					this.mg15.columns.get(0).setColWidth(150);
					this.mg15.columns.get(1).setTitle("Tanggal Berlaku");
					this.mg15.columns.get(1).setColWidth(100);
					this.mg15.columns.get(2).setTitle("Nomor SK");
					this.mg15.columns.get(2).setColWidth(150);
					this.mg15.columns.get(2).setColumnFormat(cfNilai);
					this.mg15.columns.get(3).setTitle("Tanggal SK");
					this.mg15.columns.get(3).setColWidth(100);
					this.mg15.columns.get(4).setTitle("Uang Penyerta");
					this.mg15.columns.get(4).setColWidth(100);
					data = this.dbLib.runSQL("select keterangan,date_format(tgl_skmulai,'%d-%m-%Y') as tglawl,no_sk, "+
				"date_format(tgl_sk,'%d-%m-%Y') as tglsk,nilai "+
				"from hr_rwyharga "+
				"where nik='"+sender.owner.getName()+"' order by tgl_skmulai desc");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							this.mg15.clear();
							for (var l in data.objList)
							{
								this.mg15.appendRow(this.mg15);
								this.mg15.setCell(0,l,data.get(l).get("keterangan"));
								this.mg15.setCell(1,l,data.get(l).get("tglawl"));
								this.mg15.setCell(2,l,data.get(l).get("no_sk"));
								this.mg15.setCell(3,l,data.get(l).get("tglsk"));
								this.mg15.setCell(4,l,floatToNilai(data.get(l).get("nilai")));
							}
						}
					}
				}
			break;
		}
	}
};