window.GUI_sdm_trail_fTrailHRKerja = function(owner)
{
	try
	{
		if (owner)
		{
			window.GUI_sdm_trail_fTrailHRKerja.prototype.parent.constructor.call(this, owner);
			this.className = "GUI_sdm_trail_fTrailHRKerja";			
			this.maximize();
			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Riwayat Pekerjaan", 2);
			uses("util_dbLib");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_number");
	  		this.numLib = new util_number();
	  		uses("util_gridLib");
	  		this.gridLib=new util_gridLib();
			
			uses("controls_panel");
			this.p = new controls_panel(this);
			this.p.setWidth(1268);
			this.p.setLeft(5);
			this.p.setTop(5);
			this.p.setHeight(495);
			this.p.setBorder(3);
			this.p.setCaption("Riwayat Pekerjaan");
			
			uses("controls_mdGrid");
			this.mg1 = new controls_mdGrid(this.p);
			this.mg1.setTop(20);
			this.mg1.setWidth(1264);
			this.mg1.setLeft(1);
			this.mg1.setHeight(472);
			this.mg1.setColCount(8);
			this.mg1.setReadOnly(true);
			this.mg1.columns.get(0).setTitle("Kode");
			this.mg1.columns.get(0).setColWidth(100);
			this.mg1.columns.get(1).setTitle("Nama Loker");
			this.mg1.columns.get(1).setColWidth(250);
			this.mg1.columns.get(2).setTitle("Alamat");
			this.mg1.columns.get(2).setColWidth(300);
			this.mg1.columns.get(3).setTitle("Kota");
			this.mg1.columns.get(3).setColWidth(150);
			this.mg1.columns.get(4).setTitle("Provinsi");
			this.mg1.columns.get(4).setColWidth(150);
			this.mg1.columns.get(5).setTitle("Kode Pos");
			this.mg1.columns.get(5).setColWidth(95);
			this.mg1.columns.get(6).setTitle("Telepon");
			this.mg1.columns.get(6).setColWidth(100);
			this.mg1.columns.get(7).setTitle("Jumlah Karyawan");			
			this.mg1.columns.get(7).setColWidth(100);
			this.mg1.onExpand.set(this, "mgOnExpand");
			this.loker = new Array();
		}
	}catch(e)
	{
		alert("[GUI_sdm_trail_fTrailHRKerja]::contructor: "+e);
	}
}

window.GUI_sdm_trail_fTrailHRKerja.extend(window.controls_childForm);

window.GUI_sdm_trail_fTrailHRKerja.prototype.mgOnExpand = function(sender)
{
	if (sender.owner == this.mg1)
	{
		var node = this.mg1.rows.get(sender.rowIndex);
		this.mg2 = new controls_mdGrid(node);
		this.mg2.setName(sender.getCellValue(0));		
		this.mg2.setTop(0);
		this.mg2.setLeft(1);
		this.mg2.setWidth(1225);
		this.mg2.setHeight(415);
		this.mg2.setColCount(8);
		this.mg2.columns.get(0).setTitle("NIK");
		this.mg2.columns.get(0).setColWidth(100);
		this.mg2.columns.get(1).setTitle("Nama");
		this.mg2.columns.get(1).setColWidth(200);
		this.mg2.columns.get(2).setTitle("Jabatan");
		this.mg2.columns.get(2).setColWidth(150);
		this.mg2.columns.get(3).setTitle("Departemen");
		this.mg2.columns.get(3).setColWidth(250);
		this.mg2.columns.get(4).setTitle("Agama");
		this.mg2.columns.get(4).setColWidth(120);
		this.mg2.columns.get(5).setTitle("Tempat Lahir");
		this.mg2.columns.get(5).setColWidth(170);
		this.mg2.columns.get(6).setTitle("Tanggal Lahir");
		this.mg2.columns.get(6).setColWidth(107);
		this.mg2.columns.get(7).setTitle("Tanggal Masuk");
		this.mg2.columns.get(7).setColWidth(107);		
		this.mg2.onExpand.set(this, "mgOnExpand");
		var kar=this.dbLib.loadQuery("select k.nik,k.nama,k.jabatan,p.nama,k.agama,k.tempat_lahir,date_format(k.tgl_lahir,'%d/%m/%Y'),date_format(k.tgl_masuk,'%d/%m/%Y') "+
									"from karyawan k inner join pp p on k.kode_pp=p.kode_pp and k.kode_lokasi=p.kode_lokasi "+
									"where k.kode_loker='"+sender.getCellValue(0)+"'");
		if (kar != undefined)
		{
			var data=kar.split("\r\n");
			this.mg2.clear();
			for (var j in data)
			{
				if (j>0)
				{
					var isi2=data[j].split(";");
					this.mg2.appendRow(this.mg2);
					this.mg2.setCell(0,j-1,isi2[0]);
					this.mg2.setCell(1,j-1,isi2[1]);
					this.mg2.setCell(2,j-1,isi2[2]);
					this.mg2.setCell(3,j-1,isi2[3]);
					this.mg2.setCell(4,j-1,isi2[4]);
					this.mg2.setCell(5,j-1,isi2[5]);
					this.mg2.setCell(6,j-1,isi2[6]);
					this.mg2.setCell(7,j-1,isi2[7]);
					node = this.mg2.rows.get(j-1);
					this.mg = new controls_mdGrid(node);
					this.mg.setTop(0);
					this.mg.setLeft(1);
					this.mg.setHeight(360);					
					this.loker[isi2[0]]=sender.getCellValue(0);					
				}
			}
		}
	}
	if (sender.owner == this.mg2)
	{
		var node = this.mg2.rows.get(sender.rowIndex);
		this.mg3 = new controls_mdGrid(node);
		this.mg3.setName(sender.getCellValue(0));
		this.mg3.setTop(0);
		this.mg3.setLeft(1);
		this.mg3.setWidth(1184);
		this.mg3.setHeight(360);
		this.mg3.setColCount(1);
		this.mg3.columns.get(0).setTitle("Detail");
		this.mg3.columns.get(0).setColWidth(1164);
		this.mg3.onExpand.set(this, "mgOnExpand");
		for (var r=0;r<17;r++) 
		{
			this.mg3.appendRow(this.mg3);
			node = this.mg3.rows.get(r);
			this.mg = new controls_mdGrid(node);
			this.mg.setTop(0);
			this.mg.setLeft(1);
			this.mg.setHeight(140);
		}
		this.mg3.setCell(0,0,"Posisi Sekarang");
		this.mg3.setCell(0,1,"Riwayat Gaji Dasar");
		this.mg3.setCell(0,2,"Orang Tua");
		this.mg3.setCell(0,3,"Pasangan");
		this.mg3.setCell(0,4,"Mertua");
		this.mg3.setCell(0,5,"Anak");
		this.mg3.setCell(0,6,"Riwayat Kedinasan");
		this.mg3.setCell(0,7,"Riwayat Status");
		this.mg3.setCell(0,8,"Riwayat Pendidikan");
		this.mg3.setCell(0,9,"Riwayat Pelatihan");
		this.mg3.setCell(0,10,"Riwayat DP3 - SKI");
		this.mg3.setCell(0,11,"Riwayat Penghargaan");
		this.mg3.setCell(0,12,"Fasilitas");
		this.mg3.setCell(0,13,"Riwayat Cuti");
		this.mg3.setCell(0,14,"Alamat Kantor");
		this.mg3.setCell(0,15,"Alamat Rumah");
		this.mg3.setCell(0,16,"Informasi Lainnya");
	}
	if (sender.owner == this.mg3)
	{
		var pos = this.mg3.rows.get(0);
		this.mg4 = new controls_mdGrid(pos);
		this.mg4.setTop(0);
		this.mg4.setLeft(1);
		this.mg4.setWidth(1144);
		this.mg4.setHeight(140);
		this.mg4.setColCount(3);
		this.mg4.columns.get(0).setTitle("DATA");
		this.mg4.columns.get(0).setColWidth(100);
		this.mg4.columns.get(1).setTitle("Saat Ini");
		this.mg4.columns.get(1).setColWidth(350);
		this.mg4.columns.get(2).setTitle("Sejak Tanggal");
		this.mg4.columns.get(2).setColWidth(100);
		var tmp = this.dbLib.loadQuery("select k.status,date_format(s.tgl_awal,'%d/%m/%Y') as tglawl,g.band,g.kelas,date_format(g.tgl_awal,'%d/%m/%Y') as tglawl2, "+
									"l.nama as nmlkr,date_format(d.tgl_berlaku,'%d/%m/%Y') as tglawl3,k.jabatan,g2.gaji_dasar, "+
									"date_format(g2.tgl_awal,'%d/%m/%Y') as tglawl4,k.npwp, "+
									"l.alamat as almtlkr,l.kota as kotalkr,l.propinsi as provlkr,l.kode_pos as kplkr,l.telephone as tlp, "+
									"k.alamat,k.kota,k.propinsi,k.kode_pos,k.no_telp,k.no_ponsel,k.email,k.asal_lamaran,k.suku,k.golongan_darah "+
									"from karyawan k left outer join hr_loker l on k.kode_loker=l.kode_loker and k.kode_lokasi=l.kode_lokasi "+
									"left outer join hr_status s on k.nik=s.nik and s.tgl_awal=(select max(tgl_awal) from hr_status) "+
									"left outer join hr_gajidasar g on k.nik=g.nik and g.tgl_awal=(select min(tgl_awal) from hr_gajidasar where band=(select max(band) from hr_gajidasar) and kelas=(select max(kelas) from hr_gajidasar)) "+
									"left outer join hr_gajidasar g2 on k.nik=g2.nik and g2.tgl_awal=(select min(tgl_awal) from hr_gajidasar where gaji_dasar=(select max(gaji_dasar) from hr_gajidasar)) "+
									"left outer join hr_dinas d on k.nik=d.nik and d.tgl_berlaku=(select max(tgl_berlaku) from hr_dinas) "+
									"where k.kode_loker='"+this.loker[sender.owner.getName()]+"' and k.nik='"+sender.owner.getName()+"' ");
		for (var r=0;r<6;r++) {this.mg4.appendRow(this.mg4);}
		this.mg4.setCell(0,0,"STATUS");
		this.mg4.setCell(0,1,"BAND POSISI");
		this.mg4.setCell(0,2,"LOKER");
		this.mg4.setCell(0,3,"JABATAN");
		this.mg4.setCell(0,4,"GADAS");
		this.mg4.setCell(0,5,"NPWP");
		if (tmp != undefined)
		{
			var getpos = tmp.split("\r\n");
			for (var l in getpos)
			{
				if (l>0)
				{
					var isipos=getpos[l].split(";");
					this.mg4.setCell(1,0,isipos[0]);this.mg4.setCell(2,0,isipos[1]);
					this.mg4.setCell(1,1,isipos[2]+"."+isipos[3]);this.mg4.setCell(2,1,isipos[4]);
					this.mg4.setCell(1,2,isipos[5]);this.mg4.setCell(2,2,isipos[6]);
					this.mg4.setCell(1,3,isipos[7]);this.mg4.setCell(2,3,isipos[6]);
					this.mg4.setCell(1,4,isipos[8]);this.mg4.setCell(2,4,isipos[9]);
					this.mg4.setCell(1,5,isipos[10]);
				}
			}
		}
		var gadas = this.mg3.rows.get(1);		
		this.mg5 = new controls_mdGrid(gadas);
		this.mg5.setTop(0);
		this.mg5.setLeft(1);
		this.mg5.setWidth(1144);
		this.mg5.setHeight(140);
		this.mg5.setColCount(6);
		this.mg5.columns.get(0).setTitle("Awal Berlaku");
		this.mg5.columns.get(0).setColWidth(100);
		this.mg5.columns.get(1).setTitle("Akhir Berlaku");
		this.mg5.columns.get(1).setColWidth(100);
		this.mg5.columns.get(2).setTitle("Gaji Dasar");
		this.mg5.columns.get(2).setColWidth(200);
		this.mg5.columns.get(2).setColumnFormat(cfNilai);
		this.mg5.columns.get(3).setTitle("Tunjangan Dasar");
		this.mg5.columns.get(3).setColWidth(200);
		this.mg5.columns.get(3).setColumnFormat(cfNilai);
		this.mg5.columns.get(4).setTitle("Band");
		this.mg5.columns.get(4).setColWidth(100);
		this.mg5.columns.get(5).setTitle("Kelas");
		this.mg5.columns.get(5).setColWidth(100);
		tmp = this.dbLib.loadQuery("select date_format(tgl_awal,'%d-%m-%Y') as tglawal,date_format(tgl_akhir,'%d-%m-%Y') as tglakhir,gaji_dasar,tunjangan,band,kelas "+
								"from hr_gajidasar where nik='"+sender.owner.getName()+"' order by tgl_akhir desc ");
		if (tmp != undefined)
		{
			var getgadas = tmp.split("\r\n");
			this.mg5.clear();
			for (var l in getgadas)
			{
				if (l>0)
				{
					var isigadas=getgadas[l].split(";");
					this.mg5.appendRow(this.mg5);
					this.mg5.setCell(0,l-1,isigadas[0]);
					this.mg5.setCell(1,l-1,isigadas[1]);
					this.mg5.setCell(2,l-1,isigadas[2]);
					this.mg5.setCell(3,l-1,isigadas[3]);
					this.mg5.setCell(4,l-1,isigadas[4]);
					this.mg5.setCell(5,l-1,isigadas[5]);
				}
			}
		}
		var ortu = this.mg3.rows.get(2);
		ortu.setDetailHeight(142);
		this.mg6 = new controls_mdGrid(ortu);
		this.mg6.setTop(0);
		this.mg6.setLeft(1);
		this.mg6.setWidth(1144);
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
		tmp = this.dbLib.loadQuery("select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp "+
								"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Ayah','Ibu')");
		if (tmp != undefined)
		{
			var getortu = tmp.split("\r\n");
			this.mg6.clear();
			for (var l in getortu)
			{
				if (l>0)
				{
					var isiortu=getortu[l].split(";");
					this.mg6.appendRow(this.mg6);
					this.mg6.setCell(0,l-1,isiortu[1]);
					this.mg6.setCell(1,l-1,isiortu[0]);
					this.mg6.setCell(2,l-1,isiortu[2]);
					this.mg6.setCell(3,l-1,isiortu[3]);
					this.mg6.setCell(4,l-1,isiortu[4]);
					this.mg6.setCell(5,l-1,isiortu[5]);
					this.mg6.setCell(6,l-1,isiortu[6]);
					this.mg6.setCell(7,l-1,isiortu[7]);
				}
			}
		}
		var pas = this.mg3.rows.get(3);
		pas.setDetailHeight(142);
		this.mg7 = new controls_mdGrid(pas);
		this.mg7.setTop(0);
		this.mg7.setLeft(1);
		this.mg7.setWidth(1144);
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
		tmp = this.dbLib.loadQuery("select nama,tempat_lahir,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(tgl_nikah,'%d/%m/%Y') as tglnkh,status_kerja,institusi,nik2 "+
								"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Suami','Istri')");
		if (tmp != undefined)
		{
			var getpas = tmp.split("\r\n");
			this.mg7.clear();
			for (var l in getpas)
			{
				if (l>0)
				{
					var isipas=getpas[l].split(";");
					this.mg7.appendRow(this.mg7);
					this.mg7.setCell(0,l-1,isipas[0]);
					this.mg7.setCell(1,l-1,isipas[1]);
					this.mg7.setCell(2,l-1,isipas[2]);
					this.mg7.setCell(3,l-1,isipas[3]);
					this.mg7.setCell(4,l-1,isipas[4]);
					this.mg7.setCell(5,l-1,isipas[5]);
					this.mg7.setCell(6,l-1,isipas[6]);
				}
			}
		}
		var mertua = this.mg3.rows.get(4);
		mertua.setDetailHeight(142);
		this.mg8 = new controls_mdGrid(mertua);
		this.mg8.setTop(0);
		this.mg8.setLeft(1);
		this.mg8.setWidth(1144);
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
		tmp = this.dbLib.loadQuery("select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp "+
								"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Ayah Mertua','Ibu Mertua')");
		if (tmp != undefined)
		{
			var getmertua = tmp.split("\r\n");
			this.mg8.clear();
			for (var l in getmertua)
			{
				if (l>0)
				{
					var isimertua=getmertua[l].split(";");
					this.mg8.appendRow(this.mg8);
					this.mg8.setCell(0,l-1,isimertua[1]);
					this.mg8.setCell(1,l-1,isimertua[0]);
					this.mg8.setCell(2,l-1,isimertua[2]);
					this.mg8.setCell(3,l-1,isimertua[3]);
					this.mg8.setCell(4,l-1,isimertua[4]);
					this.mg8.setCell(5,l-1,isimertua[5]);
					this.mg8.setCell(6,l-1,isimertua[6]);
					this.mg8.setCell(7,l-1,isimertua[7]);
				}
			}
		}
		var anak = this.mg3.rows.get(5);
		anak.setDetailHeight(142);
		this.mg9 = new controls_mdGrid(anak);
		this.mg9.setTop(0);
		this.mg9.setLeft(1);
		this.mg9.setWidth(1144);
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
		tmp = this.dbLib.loadQuery("select nama,status,sex,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,status_tanggungan,status_anak "+
								"from hr_keluarga where nik='"+sender.owner.getName()+"' and status_family in ('Anak')");
		if (tmp != undefined)
		{
			var getanak = tmp.split("\r\n");
			this.mg9.clear();
			for (var l in getanak)
			{
				if (l>0)
				{
					var isianak=getanak[l].split(";");
					this.mg9.appendRow(this.mg9);
					this.mg9.setCell(0,l-1,isianak[0]);
					this.mg9.setCell(1,l-1,isianak[1]);
					this.mg9.setCell(2,l-1,isianak[2]);
					this.mg9.setCell(3,l-1,isianak[3]);
					this.mg9.setCell(4,l-1,isianak[4]);
					this.mg9.setCell(5,l-1,isianak[5]);
				}
			}
		}
		var dinas = this.mg3.rows.get(6);
		dinas.setDetailHeight(142);
		this.mg10 = new controls_mdGrid(dinas);
		this.mg10.setTop(0);
		this.mg10.setLeft(1);
		this.mg10.setWidth(1144);
		this.mg10.setHeight(140);
		this.mg10.setColCount(9);
		this.mg10.columns.get(0).setTitle("Awal Belaku");
		this.mg10.columns.get(0).setColWidth(80);
		this.mg10.columns.get(1).setTitle("Divisi");
		this.mg10.columns.get(1).setColWidth(80);
		this.mg10.columns.get(2).setTitle("Status");
		this.mg10.columns.get(2).setColWidth(100);
		this.mg10.columns.get(3).setTitle("Grade");
		this.mg10.columns.get(3).setColWidth(80);
		this.mg10.columns.get(4).setTitle("Lokasi Kerja");
		this.mg10.columns.get(4).setColWidth(200);
		this.mg10.columns.get(5).setTitle("Jabatan");
		this.mg10.columns.get(5).setColWidth(150);
		this.mg10.columns.get(6).setTitle("Tanggal SK");
		this.mg10.columns.get(6).setColWidth(80);
		this.mg10.columns.get(7).setTitle("Nomor SK");
		this.mg10.columns.get(7).setColWidth(150);
		this.mg10.columns.get(8).setTitle("Keterangan");
		this.mg10.columns.get(8).setColWidth(150);
		tmp = this.dbLib.loadQuery("select date_format(h.tgl_berlaku,'%d/%m/%Y') as tgl,h.loker,h.status,h.grade,l.nama,h.jabatan, "+
								"date_format(h.tgl_sk,'%d/%m/%Y') as tglsk,h.no_sk,h.keterangan "+
								"from hr_dinas h inner join hr_loker l on h.loker=l.kode_loker where nik='"+sender.owner.getName()+"' order by tgl_berlaku");
		if (tmp != undefined)
		{
			var getdinas = tmp.split("\r\n");
			this.mg10.clear();
			for (var l in getdinas)
			{
				if (l>0)
				{
					var isidinas=getdinas[l].split(";");
					this.mg10.appendRow(this.mg10);
					this.mg10.setCell(0,l-1,isidinas[0]);
					this.mg10.setCell(1,l-1,isidinas[1]);
					this.mg10.setCell(2,l-1,isidinas[2]);
					this.mg10.setCell(3,l-1,isidinas[3]);
					this.mg10.setCell(4,l-1,isidinas[4]);
					this.mg10.setCell(5,l-1,isidinas[5]);
					this.mg10.setCell(6,l-1,isidinas[6]);
					this.mg10.setCell(7,l-1,isidinas[7]);
					this.mg10.setCell(8,l-1,isidinas[8]);
				}
			}
		}
		var status = this.mg3.rows.get(7);
		status.setDetailHeight(142);
		this.mg11 = new controls_mdGrid(status);
		this.mg11.setTop(0);
		this.mg11.setLeft(1);
		this.mg11.setWidth(1144);
		this.mg11.setHeight(140);
		this.mg11.setColCount(5);
		this.mg11.columns.get(0).setTitle("Awal Belaku");
		this.mg11.columns.get(0).setColWidth(100);
		this.mg11.columns.get(1).setTitle("Akhir Belaku");
		this.mg11.columns.get(1).setColWidth(100);
		this.mg11.columns.get(2).setTitle("Status");
		this.mg11.columns.get(2).setColWidth(100);
		this.mg11.columns.get(3).setTitle("Nomor SK");
		this.mg11.columns.get(3).setColWidth(150);
		this.mg11.columns.get(4).setTitle("Tanggal Sk");
		this.mg11.columns.get(4).setColWidth(100);
		tmp = this.dbLib.loadQuery("select date_format(h.tgl_awal,'%d/%m/%Y') as tglawal,date_format(h.tgl_akhir,'%d/%m/%Y') as tglakhir,h.status,h.no_sk,date_format(h.tgl_sk,'%d/%m/%Y') as tglsk "+
								"from hr_status h where nik='"+sender.owner.getName()+"' order by h.tgl_awal");
		if (tmp != undefined)
		{
			var getstat = tmp.split("\r\n");
			this.mg11.clear();
			for (var l in getstat)
			{
				if (l>0)
				{
					var isistat=getstat[l].split(";");
					this.mg11.appendRow(this.mg11);
					this.mg11.setCell(0,l-1,isistat[0]);
					this.mg11.setCell(1,l-1,isistat[1]);
					this.mg11.setCell(2,l-1,isistat[2]);
					this.mg11.setCell(3,l-1,isistat[3]);
					this.mg11.setCell(4,l-1,isistat[4]);
				}
			}
		}
		var pend = this.mg3.rows.get(8);
		pend.setDetailHeight(142);
		this.mg12 = new controls_mdGrid(pend);
		this.mg12.setTop(0);
		this.mg12.setLeft(1);
		this.mg12.setWidth(1144);
		this.mg12.setHeight(140);
		this.mg12.setColCount(5);
		this.mg12.columns.get(0).setTitle("Nama Institusi");
		this.mg12.columns.get(0).setColWidth(150);
		this.mg12.columns.get(1).setTitle("Jurusan/Fakultas");
		this.mg12.columns.get(1).setColWidth(150);
		this.mg12.columns.get(2).setTitle("Gelar");
		this.mg12.columns.get(2).setColWidth(100);
		this.mg12.columns.get(3).setTitle("Tanggal Selesai");
		this.mg12.columns.get(3).setColWidth(100);
		this.mg12.columns.get(4).setTitle("Biaya");
		this.mg12.columns.get(4).setColWidth(100);
		tmp = this.dbLib.loadQuery("select h.institusi,h.jurusan,h.gelar,date_format(h.tgl_selesai,'%d/%m/%Y') as tglend,h.biaya "+
								"from hr_pendidikan h where h.nik='"+sender.owner.getName()+"' order by h.tgl_selesai");
		if (tmp != undefined)
		{
			var getedu = tmp.split("\r\n");
			this.mg12.clear();
			for (var l in getedu)
			{
				if (l>0)
				{
					var isiedu=getedu[l].split(";");
					this.mg12.appendRow(this.mg12);
					this.mg12.setCell(0,l-1,isiedu[0]);
					this.mg12.setCell(1,l-1,isiedu[1]);
					this.mg12.setCell(2,l-1,isiedu[2]);
					this.mg12.setCell(3,l-1,isiedu[3]);
					this.mg12.setCell(4,l-1,isiedu[4]);
				}
			}
		}
		var pel = this.mg3.rows.get(9);
		pel.setDetailHeight(142);
		this.mg13 = new controls_mdGrid(pel);
		this.mg13.setTop(0);
		this.mg13.setLeft(1);
		this.mg13.setWidth(1144);
		this.mg13.setHeight(140);
		this.mg13.setColCount(6);
		this.mg13.columns.get(0).setTitle("Nama Pelatihan");
		this.mg13.columns.get(0).setColWidth(150);
		this.mg13.columns.get(1).setTitle("Penyelenggara");
		this.mg13.columns.get(1).setColWidth(150);
		this.mg13.columns.get(2).setTitle("Tanggal Mulai");
		this.mg13.columns.get(2).setColWidth(100);
		this.mg13.columns.get(3).setTitle("Tanggal Selesai");
		this.mg13.columns.get(3).setColWidth(100);
		this.mg13.columns.get(4).setTitle("Angkatan");
		this.mg13.columns.get(4).setColWidth(100);
		this.mg13.columns.get(5).setTitle("Peringkat");
		this.mg13.columns.get(5).setColWidth(100);
		tmp = this.dbLib.loadQuery("select h.pelatihan,h.penyelenggara,date_format(h.tgl_mulai,'%d/%m/%Y') as tglstart,date_format(h.tgl_selesai,'%d/%m/%Y') as tglend,h.angkatan,h.peringkat "+
								"from hr_pelatihan h where h.nik='"+sender.owner.getName()+"' order by h.tgl_mulai");
		if (tmp != undefined)
		{
			var getlat = tmp.split("\r\n");
			this.mg13.clear();
			for (var l in getlat)
			{
				if (l>0)
				{
					var isilat=getlat[l].split(";");
					this.mg13.appendRow(this.mg13);
					this.mg13.setCell(0,l-1,isilat[0]);
					this.mg13.setCell(1,l-1,isilat[1]);
					this.mg13.setCell(2,l-1,isilat[2]);
					this.mg13.setCell(3,l-1,isilat[3]);
					this.mg13.setCell(4,l-1,isilat[4]);
					this.mg13.setCell(5,l-1,isilat[5]);
				}
			}
		}
		var ski = this.mg3.rows.get(10);
		ski.setDetailHeight(142);
		this.mg14 = new controls_mdGrid(ski);
		this.mg14.setTop(0);
		this.mg14.setLeft(1);
		this.mg14.setWidth(1144);
		this.mg14.setHeight(140);
		this.mg14.setColCount(5);
		this.mg14.columns.get(0).setTitle("Tahun");
		this.mg14.columns.get(0).setColWidth(100);
		this.mg14.columns.get(1).setTitle("Rata-rata DP3");
		this.mg14.columns.get(1).setColWidth(100);
		this.mg14.columns.get(2).setTitle("Nilai SKI");
		this.mg14.columns.get(2).setColWidth(100);
		this.mg14.columns.get(3).setTitle("Kompetensi");
		this.mg14.columns.get(3).setColWidth(100);
		this.mg14.columns.get(4).setTitle("Keterangan");
		this.mg14.columns.get(4).setColWidth(150);
		tmp = this.dbLib.loadQuery("select h.tahun,h.avg,h.nilai_ski,h.kompentensi,h.keterangan "+
								"from hr_ski h where h.nik='"+sender.owner.getName()+"' order by h.tahun");
		if (tmp != undefined)
		{
			var getski = tmp.split("\r\n");
			this.mg14.clear();
			for (var l in getski)
			{
				if (l>0)
				{
					var isiski=getski[l].split(";");
					this.mg14.appendRow(this.mg14);
					this.mg14.setCell(0,l-1,isiski[0]);
					this.mg14.setCell(1,l-1,isiski[1]);
					this.mg14.setCell(2,l-1,isiski[2]);
					this.mg14.setCell(3,l-1,isiski[3]);
					this.mg14.setCell(4,l-1,isiski[4]);
				}
			}
		}
		var hrg = this.mg3.rows.get(11);
		hrg.setDetailHeight(142);
		this.mg15 = new controls_mdGrid(hrg);
		this.mg15.setTop(0);
		this.mg15.setLeft(1);
		this.mg15.setWidth(1144);
		this.mg15.setHeight(140);
		this.mg15.setColCount(6);
		this.mg15.columns.get(0).setTitle("Nama Penghargaan");
		this.mg15.columns.get(0).setColWidth(150);
		this.mg15.columns.get(1).setTitle("Tanggal Berlaku");
		this.mg15.columns.get(1).setColWidth(100);
		this.mg15.columns.get(2).setTitle("Uang Penyerta");
		this.mg15.columns.get(2).setColWidth(100);
		this.mg15.columns.get(2).setColumnFormat(cfNilai);
		this.mg15.columns.get(3).setTitle("Nomor SK");
		this.mg15.columns.get(3).setColWidth(100);
		this.mg15.columns.get(4).setTitle("Tanggal SK");
		this.mg15.columns.get(4).setColWidth(100);
		this.mg15.columns.get(5).setTitle("NIK TTD");
		this.mg15.columns.get(5).setColWidth(100);
		tmp = this.dbLib.loadQuery("select h.penghargaan,date_format(h.tgl_berlaku,'%d/%m/%Y') as tgl,h.uang_penyerta,h.no_sk,date_format(h.tgl_sk,'%d/%m/%Y') as tglsk,h.nik_ttd "+
								"from hr_penghargaan h where h.nik='"+sender.owner.getName()+"' order by h.tgl_berlaku");
		if (tmp != undefined)
		{
			var gethrg = tmp.split("\r\n");
			this.mg15.clear();
			for (var l in gethrg)
			{
				if (l>0)
				{
					var isihrg=gethrg[l].split(";");
					this.mg15.appendRow(this.mg15);
					this.mg15.setCell(0,l-1,isihrg[0]);
					this.mg15.setCell(1,l-1,isihrg[1]);
					this.mg15.setCell(2,l-1,isihrg[2]);
					this.mg15.setCell(3,l-1,isihrg[3]);
					this.mg15.setCell(4,l-1,isihrg[4]);
					this.mg15.setCell(5,l-1,isihrg[5]);
				}
			}
		}
		var fas = this.mg3.rows.get(12);
		fas.setDetailHeight(142);
		this.mg16 = new controls_mdGrid(fas);
		this.mg16.setTop(0);
		this.mg16.setLeft(1);
		this.mg16.setWidth(1144);
		this.mg16.setHeight(140);
		this.mg16.setColCount(4);
		this.mg16.columns.get(0).setTitle("Jenis");
		this.mg16.columns.get(0).setColWidth(100);
		this.mg16.columns.get(1).setTitle("Jumlah");
		this.mg16.columns.get(1).setColWidth(100);
		this.mg16.columns.get(1).setColumnFormat(cfNilai);
		this.mg16.columns.get(2).setTitle("Tanggal Mulai");
		this.mg16.columns.get(2).setColWidth(100);
		this.mg16.columns.get(3).setTitle("Tanggal Akhir");
		this.mg16.columns.get(3).setColWidth(100);
		tmp = this.dbLib.loadQuery("select h.jenis,h.jumlah,date_format(h.tgl_mulai,'%d/%m/%Y') as tglawal,date_format(h.tgl_akhir,'%d/%m/%Y') as tglakhir "+
								"from hr_fasilitas h where h.nik='"+sender.owner.getName()+"' order by h.tgl_mulai");
		if (tmp != undefined)
		{
			var getfas = tmp.split("\r\n");
			this.mg16.clear();
			for (var l in getfas)
			{
				if (l>0)
				{
					var isifas=getfas[l].split(";");
					this.mg16.appendRow(this.mg16);
					this.mg16.setCell(0,l-1,isifas[0]);
					this.mg16.setCell(1,l-1,isifas[1]);
					this.mg16.setCell(2,l-1,isifas[2]);
					this.mg16.setCell(3,l-1,isifas[3]);
				}
			}
		}
		var cuti = this.mg3.rows.get(13);
		cuti.setDetailHeight(142);
		this.mg17 = new controls_mdGrid(cuti);
		this.mg17.setTop(0);
		this.mg17.setLeft(1);
		this.mg17.setWidth(1144);
		this.mg17.setHeight(140);
		this.mg17.setColCount(4);
		this.mg17.columns.get(0).setTitle("Jenis Cuti");
		this.mg17.columns.get(0).setColWidth(170);
		this.mg17.columns.get(1).setTitle("Tanggal Mulai");
		this.mg17.columns.get(1).setColWidth(100);
		this.mg17.columns.get(1).setColumnFormat(cfNilai);
		this.mg17.columns.get(2).setTitle("Tanggal Akhir");
		this.mg17.columns.get(2).setColWidth(100);
		this.mg17.columns.get(3).setTitle("Jumlah Hari");
		this.mg17.columns.get(3).setColWidth(100);
		tmp = this.dbLib.loadQuery("select h.jenis,date_format(h.tgl_mulai,'%d/%m/%Y') as tglawal,date_format(h.tgl_selesai,'%d/%m/%Y') as tglakhir,h.jumlah "+
								"from hr_cuti h where h.nik='"+sender.owner.getName()+"' order by h.tgl_mulai");
		if (tmp != undefined)
		{
			var getcuti = tmp.split("\r\n");
			this.mg17.clear();
			for (var l in getcuti)
			{
				if (l>0)
				{
					var isicuti=getcuti[l].split(";");
					this.mg17.appendRow(this.mg17);
					this.mg17.setCell(0,l-1,isicuti[0]);
					this.mg17.setCell(1,l-1,isicuti[1]);
					this.mg17.setCell(2,l-1,isicuti[2]);
					this.mg17.setCell(3,l-1,isicuti[3]);
				}
			}
		}
		var kntr = this.mg3.rows.get(14);
		kntr.setDetailHeight(142);
		this.mg18 = new controls_mdGrid(kntr);
		this.mg18.setTop(0);
		this.mg18.setLeft(1);
		this.mg18.setWidth(1144);
		this.mg18.setHeight(140);
		this.mg18.setColCount(5);
		this.mg18.columns.get(0).setTitle("Jalan");
		this.mg18.columns.get(0).setColWidth(200);
		this.mg18.columns.get(1).setTitle("Kota");
		this.mg18.columns.get(1).setColWidth(100);
		this.mg18.columns.get(2).setTitle("Provinsi");
		this.mg18.columns.get(2).setColWidth(100);
		this.mg18.columns.get(3).setTitle("Kode Pos");
		this.mg18.columns.get(3).setColWidth(80);
		this.mg18.columns.get(4).setTitle("Telepon");
		this.mg18.columns.get(4).setColWidth(100);
		this.mg18.appendRow(this.mg18);
		this.mg18.setCell(0,0,isipos[11]);
		this.mg18.setCell(1,0,isipos[12]);
		this.mg18.setCell(2,0,isipos[13]);
		this.mg18.setCell(3,0,isipos[14]);
		this.mg18.setCell(4,0,isipos[15]);
		var rmh = this.mg3.rows.get(15);
		rmh.setDetailHeight(142);
		this.mg19 = new controls_mdGrid(rmh);
		this.mg19.setTop(0);
		this.mg19.setLeft(1);
		this.mg19.setWidth(1144);
		this.mg19.setHeight(140);
		this.mg19.setColCount(5);
		this.mg19.columns.get(0).setTitle("Jalan");
		this.mg19.columns.get(0).setColWidth(200);
		this.mg19.columns.get(1).setTitle("Kota");
		this.mg19.columns.get(1).setColWidth(100);
		this.mg19.columns.get(2).setTitle("Provinsi");
		this.mg19.columns.get(2).setColWidth(100);
		this.mg19.columns.get(3).setTitle("Kode Pos");
		this.mg19.columns.get(3).setColWidth(80);
		this.mg19.columns.get(4).setTitle("Telepon");
		this.mg19.columns.get(4).setColWidth(100);
		this.mg19.appendRow(this.mg19);
		this.mg19.setCell(0,0,isipos[16]);
		this.mg19.setCell(1,0,isipos[17]);
		this.mg19.setCell(2,0,isipos[18]);
		this.mg19.setCell(3,0,isipos[19]);
		this.mg19.setCell(4,0,isipos[20]);
		var info = this.mg3.rows.get(16);
		info.setDetailHeight(142);
		this.mg20 = new controls_mdGrid(info);
		this.mg20.setTop(0);
		this.mg20.setLeft(1);
		this.mg20.setWidth(1144);
		this.mg20.setHeight(140);
		this.mg20.setColCount(2);
		this.mg20.columns.get(0).setTitle("Data");
		this.mg20.columns.get(0).setColWidth(100);
		this.mg20.columns.get(1).setTitle("Keterangan");
		this.mg20.columns.get(1).setColWidth(200);
		for (var a=0;a<5;a++) {this.mg20.appendRow(this.mg20);}
		this.mg20.setCell(0,0,"No. Ponsel");this.mg20.setCell(1,0,isipos[21]);
		this.mg20.setCell(0,1,"E-Mail");this.mg20.setCell(1,1,isipos[22]);
		this.mg20.setCell(0,2,"Asal Lamaran");this.mg20.setCell(1,2,isipos[23]);
		this.mg20.setCell(0,3,"Suku");this.mg20.setCell(1,3,isipos[24]);
		this.mg20.setCell(0,4,"Golongan Darah");this.mg20.setCell(1,4,isipos[25]);
	}
}

window.GUI_sdm_trail_fTrailHRKerja.prototype.execTrail = function()
{
	try
	{
		var temp = this.dbLib.loadQuery("select h.kode_loker,h.nama,h.alamat,h.kota,h.propinsi,h.kode_pos,h.telephone,count(k.nik) jum "+
									"from hr_loker h left outer join karyawan k on h.kode_loker=k.kode_loker and h.kode_lokasi=k.kode_lokasi "+
									"where h.kode_lokasi='"+this.app._lokasi+"' and h.tipe='Posting' "+
									"group by h.kode_loker,h.nama,h.alamat,h.kota,h.propinsi,h.kode_pos,h.telephone ");
		if (temp != undefined) 
		{
			var rs=temp.split("\r\n");
			this.mg1.clear();
			for (var i in rs)
			{
				if (i>0)
				{
					var isi=rs[i].split(";");
					this.mg1.appendRow(this.mg1);
					this.mg1.setCell(0,i-1,isi[0]);
					this.mg1.setCell(1,i-1,isi[1]);
					this.mg1.setCell(2,i-1,isi[2]);
					this.mg1.setCell(3,i-1,isi[3]);
					this.mg1.setCell(4,i-1,isi[4]);
					this.mg1.setCell(5,i-1,isi[5]);
					this.mg1.setCell(6,i-1,isi[6]);
					this.mg1.setCell(7,i-1,isi[7]);
					var node = this.mg1.rows.get(i-1);
					this.mg = new controls_mdGrid(node);
					this.mg.setTop(0);
					this.mg.setLeft(1);
					this.mg.setHeight(415);
				}
			}
		}
    }catch(e)
	{
		alert("[GUI_sdm_trail_fTrailHRKerja]::execTrail:"+e);
	}
}

window.GUI_sdm_trail_fTrailHRKerja.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			
		}else
		{
			this.execTrail();
		}
    }catch(e)
	{
		alert("[GUI_sdm_trail_fTrailHRKerja]::mainButtonClick:"+e);
	}
}
