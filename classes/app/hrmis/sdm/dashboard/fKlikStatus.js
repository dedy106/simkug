window.app_hrmis_sdm_dashboard_fKlikStatus = function(owner)
{
	if (owner)
	{
		try{
			window.app_hrmis_sdm_dashboard_fKlikStatus.prototype.parent.constructor.call(this,owner);
			//window.app_hrmis_sdm_dashboard_fKlikStatus.prototype.parent.setBorder.call(this,0);
			//window.app_hrmis_sdm_dashboard_fKlikStatus.prototype.parent.setColor.call(this,"");
			this.className  = "app_hrmis_sdm_dashboard_fKlikStatus";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			
			var tutup = new portalui_image(this);
			tutup.setTop(1);
			tutup.setLeft(683);
			tutup.setWidth(16);
			tutup.setHeight(14);
			tutup.setShowHint(true);
			tutup.setHint("Close");
			tutup.setImage("icon/dynpro/close2.bmp");
			tutup.getCanvas().style.cursor="pointer";
			tutup.onClick.set(this,"doImgClose");
			
			uses('portalui_saiGrid');
			var sgkrywn = new portalui_saiGrid(this);
			sgkrywn.setLeft(1);
			sgkrywn.setTop(20);
			sgkrywn.setWidth(696);
			sgkrywn.setHeight(376);
			sgkrywn.setName('sgkrywn');
			sgkrywn.setColCount(9);
			sgkrywn.setReadOnly(true);
			sgkrywn.setColTitle(["NIP","Nama","Alamat","Kota","Provinsi","Agama","Tmpt Lahir","Tgl Lahir","Tgl Masuk"]);
			sgkrywn.onDblClick.set(this, "sg1onDblClick");
			
			var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik "+
					"inner join hr_status2 c on b.kode_status=c.kode_status and a.kode_lokkonsol=c.kode_lokkonsol ";
			if (this.getForm().filter === "status"){
				sql+="where c.nama='"+this.getForm().statusPeg[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "loker"){
				sql+="where b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "jabs"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
						"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
						"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
						"from karyawan a inner join hr_jabs b on a.nik=b.nik "+
						"inner join hr_jabatan c on b.kode_jabs=c.kode_jab and b.kode_lokkonsol=c.kode_lokkonsol "+
						"where c.nama='"+this.getForm().statusPeg[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "jabf"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
						"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
						"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
						"from karyawan a inner join hr_jabf b on a.nik=b.nik "+
						"inner join hr_jabatan c on b.kode_jabf=c.kode_jab and b.kode_lokkonsol=c.kode_lokkonsol "+
						"where c.nama='"+this.getForm().statusPeg[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "bantu"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
						"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
						"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
						"from karyawan a inner join hr_dinas2 b on a.nik=b.nik "+
						"inner join hr_bantu c on b.kode_bantu=c.kode_bantu and b.kode_lokkonsol=c.kode_lokkonsol "+
						"where b.kode_lokasi='"+this.getForm().lokasi+"'";;
			}else if (this.getForm().filter === "profesi"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
						"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
						"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
						"from karyawan a inner join hr_rwyprofesi b on a.nik=b.nik "+
						"inner join hr_profesi c on b.kode_profesi2=c.kode_profesi and b.kode_lokkonsol=c.kode_lokkonsol "+
						"where c.nama='"+this.getForm().nmProfesi+"'";;
			}else if (this.getForm().filter === "sex"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where a.sex='"+this.getForm().sex[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "umur"){
				if (this.getForm().umur[0] === "20-35"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>19 "+
					"and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)<36 ";
				}else if (this.getForm().umur[0] === "36-45"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>35 "+
					"and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)<46 ";
				}else if (this.getForm().umur[0] === ">50"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>49 ";
				}
			}else if (this.getForm().filter === "masaKerja"){
				if (this.getForm().msKrj[0] === "<2"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' andcast(datediff (year, a.tgl_masuk, getDate()) as decimal)<2 ";
				}else if (this.getForm().msKrj[0] === "2<5"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' andcast(datediff (year, a.tgl_masuk, getDate()) as decimal)>1 "+
					"andcast(datediff (year, a.tgl_masuk, getDate()) as decimal)<6 ";
				}else if (this.getForm().msKrj[0] === "6<10"){
					var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where b.kode_lokasi='"+this.getForm().lokasi+
					"' andcast(datediff (year, a.tgl_masuk, getDate()) as decimal)>5 "+
					"andcast(datediff (year, a.tgl_masuk, getDate()) as decimal)<11 ";
				}
			}else if (this.getForm().filter === "agama"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where a.agama='"+this.getForm().agama[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "marital"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"where a.status='"+this.getForm().marital[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "pddkn"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a inner join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_rwypddk c on c.nik=b.nik and b.kode_lokkonsol=c.kode_lokkonsol "+
					"where c.institusi like '%"+this.getForm().pddkn[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "statusPeg"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_status2 c on b.kode_status=c.kode_status and b.kode_lokkonsol=c.kode_lokkonsol "+
					"where c.nama='"+this.getForm().statPeg[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "tBantu"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_bantu c on b.kode_bantu=c.kode_bantu and b.kode_lokkonsol=c.kode_lokkonsol "+
					"where c.nama='"+this.getForm().tBantu[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "jstruk"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_jabs c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
					"left outer join hr_jabatan d on d.kode_jab=c.kode_jabs and d.kode_lokkonsol=c.kode_lokkonsol "+
					"where d.nama='"+this.getForm().jstruk[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "jfung"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_jabf c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
					"left outer join hr_jabatan d on d.kode_jab=c.kode_jabf and d.kode_lokkonsol=c.kode_lokkonsol "+
					"where d.nama='"+this.getForm().jfung[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "prof"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_rwyprofesi c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
					"left outer join hr_profesi d on d.kode_profesi=c.kode_profesi2 and d.kode_lokkonsol=c.kode_lokkonsol "+
					"where d.nama='"+this.getForm().prof[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "hrloker"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_lokasi c on b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+
					"where c.nama='"+this.getForm().hrloker[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}else if (this.getForm().filter === "hruker"){
				var sql="select a.nik,a.nama,a.alamat,a.kota,a.propinsi,a.agama, "+
					"a.tempat_lahir,date_format(a.tgl_lahir,'%d/%m/%Y') as tgllhr, "+
					"date_format(a.tgl_masuk,'%d/%m/%Y') as tglmsk "+
					"from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
					"left outer join hr_loker c on b.kode_loker=c.kode_loker and b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+
					"where c.nama='"+this.getForm().hruker[0]+"' and b.kode_lokasi='"+this.getForm().lokasi+"'";
			}
			var data = this.dbLib.runSQL(sql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					sgkrywn.clear();
					sgkrywn.showLoading();
					sgkrywn.setData(data);										
					sgkrywn.setColWidth([8,7,6,5,4,3,2,1,0],[70,70,100,100,100,100,150,100,70]);
				}
			}
		}catch(e)
		{
			alert("[app_hrmis_sdm_dashboard_fKlikStatus]->constructor : "+e);
		}
	}
};
window.app_hrmis_sdm_dashboard_fKlikStatus.extend(window.portalui_panel);
window.app_hrmis_sdm_dashboard_fKlikStatus.prototype.doImgClose = function(sender)
{
	this.getForm().doImgClose();
};
window.app_hrmis_sdm_dashboard_fKlikStatus.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		uses("app_saku_dashboard_fKlikKrywn",true);
		var trail = new app_saku_dashboard_fKlikKrywn(this.getForm(),"",sender.getCell(0,row));
		trail.setLeft(1);
		trail.setWidth(system.screenWidth-7);
		trail.setHeight(system.screenHeight-110);
		trail.setTop(20);
		trail.setBorder(3);
		trail.setCaption("Detail Karyawan");
		this.panel=trail;
	}catch(e)
	{
		system.alert(this, e,"");
	}
};