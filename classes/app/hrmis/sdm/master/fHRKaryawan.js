window.app_hrmis_sdm_master_fHRKaryawan = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fHRKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fHRKaryawan";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Data Karyawan : Input/Koreksi",0);
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Kode Lokasi");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("9");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(32);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen / PP");
		this.cb_pp.setText("");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		
		this.cb_loker = new portalui_saiCBBL(this);
		this.cb_loker.setLeft(20);
		this.cb_loker.setTop(54);
		this.cb_loker.setWidth(185);
		this.cb_loker.setCaption("Loker ");
		this.cb_loker.setText("");
		this.cb_loker.setReadOnly(true);
		this.cb_loker.setLabelWidth(100);
		this.cb_loker.setRightLabelVisible(true);
		this.cb_loker.setRightLabelCaption("");
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(76);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("NIK");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(76);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(120);
		this.ed_alamat.setWidth(400);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(150);
		this.ed_alamat.setTag("1");
		
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(20);
		this.ed_kota.setTop(142);
		this.ed_kota.setWidth(250);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setLength(50);
		this.ed_kota.setTag("1");
		
		this.ed_prov = new portalui_saiLabelEdit(this);
		this.ed_prov.setLeft(20);
		this.ed_prov.setTop(164);
		this.ed_prov.setWidth(250);
		this.ed_prov.setCaption("Provinsi");
		this.ed_prov.setText("");
		this.ed_prov.setReadOnly(false);
		this.ed_prov.setLength(50);
		this.ed_prov.setTag("1");
		
		this.ed_kdpos = new portalui_saiLabelEdit(this);
		this.ed_kdpos.setLeft(20);
		this.ed_kdpos.setTop(186);
		this.ed_kdpos.setWidth(250);
		this.ed_kdpos.setCaption("Kode Pos");
		this.ed_kdpos.setText("");
		this.ed_kdpos.setReadOnly(false);
		this.ed_kdpos.setLength(20);
		this.ed_kdpos.setTag("1");
		
		this.ed_jabatan = new portalui_saiLabelEdit(this);
		this.ed_jabatan.setLeft(20);
		this.ed_jabatan.setTop(208);
		this.ed_jabatan.setWidth(250);
		this.ed_jabatan.setCaption("Jabatan");
		this.ed_jabatan.setText("");
		this.ed_jabatan.setReadOnly(false);
		this.ed_jabatan.setLength(50);
		this.ed_jabatan.setTag("1");
		
		this.ed_tel = new portalui_saiLabelEdit(this);
		this.ed_tel.setLeft(20);
		this.ed_tel.setTop(230);
		this.ed_tel.setWidth(250);
		this.ed_tel.setCaption("Telepon Rumah");
		this.ed_tel.setText("");
		this.ed_tel.setReadOnly(false);
		this.ed_tel.setLength(50);
		this.ed_tel.setTag("1");
		
		this.ed_mail = new portalui_saiLabelEdit(this);
		this.ed_mail.setLeft(20);
		this.ed_mail.setTop(252);
		this.ed_mail.setWidth(250);
		this.ed_mail.setCaption("Email");
		this.ed_mail.setText("");
		this.ed_mail.setReadOnly(false);
		this.ed_mail.setLength(50);
		this.ed_mail.setTag("1");
		
		this.ed_hp = new portalui_saiLabelEdit(this);
		this.ed_hp.setLeft(20);
		this.ed_hp.setTop(274);
		this.ed_hp.setWidth(250);
		this.ed_hp.setCaption("No. Ponsel");
		this.ed_hp.setText("");
		this.ed_hp.setReadOnly(false);
		this.ed_hp.setLength(50);
		this.ed_hp.setTag("1");
		
		this.ed_npwp = new portalui_saiLabelEdit(this);
		this.ed_npwp.setLeft(20);
		this.ed_npwp.setTop(296);
		this.ed_npwp.setWidth(250);
		this.ed_npwp.setCaption("No NPWP");
		this.ed_npwp.setText("");
		this.ed_npwp.setReadOnly(false);
		this.ed_npwp.setLength(50);		
		this.ed_npwp.setTag("1");
		
		this.cb_sex = new portalui_saiCB(this);
		this.cb_sex.setTop(318);
		this.cb_sex.setLeft(20);
		this.cb_sex.setWidth(250);
		this.cb_sex.setCaption("Jenis Kelamin");
		this.cb_sex.addItem(0,"Pria");
		this.cb_sex.addItem(1,"Wanita");
		this.cb_sex.setTag("9");
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(450);
		this.ed_bank.setTop(10);
		this.ed_bank.setWidth(250);
		this.ed_bank.setCaption("Nama Bank");
		this.ed_bank.setText("");
		this.ed_bank.setReadOnly(false);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(450);
		this.ed_cabang.setTop(32);
		this.ed_cabang.setWidth(250);
		this.ed_cabang.setCaption("Cabang");
		this.ed_cabang.setText("");
		this.ed_cabang.setReadOnly(false);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.ed_norek = new portalui_saiLabelEdit(this);
		this.ed_norek.setLeft(450);
		this.ed_norek.setTop(54);
		this.ed_norek.setWidth(250);
		this.ed_norek.setCaption("No Rekening");
		this.ed_norek.setText("");
		this.ed_norek.setReadOnly(false);
		this.ed_norek.setLength(50);
		this.ed_norek.setTag("1");
		
		this.ed_namarek = new portalui_saiLabelEdit(this);
		this.ed_namarek.setLeft(450);
		this.ed_namarek.setTop(76);
		this.ed_namarek.setWidth(250);
		this.ed_namarek.setCaption("Nama Rekening");
		this.ed_namarek.setText("");
		this.ed_namarek.setReadOnly(false);
		this.ed_namarek.setLength(50);
		this.ed_namarek.setTag("1");
		
		this.ed_agama = new portalui_saiLabelEdit(this);
		this.ed_agama.setLeft(450);
		this.ed_agama.setTop(98);
		this.ed_agama.setWidth(250);
		this.ed_agama.setCaption("Agama");
		this.ed_agama.setText("");
		this.ed_agama.setReadOnly(false);
		this.ed_agama.setLength(50);
		this.ed_agama.setTag("1");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(118);
		this.lbltgl1.setLeft(450);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal Lahir");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgllhr = new portalui_datePicker(this);
		this.dp_tgllhr.setTop(120);
		this.dp_tgllhr.setLeft(550);
		this.dp_tgllhr.setWidth(82);
		
		this.ed_tmptlhr = new portalui_saiLabelEdit(this);
		this.ed_tmptlhr.setLeft(450);
		this.ed_tmptlhr.setTop(142);
		this.ed_tmptlhr.setWidth(250);
		this.ed_tmptlhr.setCaption("Tempat Lahir");
		this.ed_tmptlhr.setText("");
		this.ed_tmptlhr.setReadOnly(false);
		this.ed_tmptlhr.setLength(50);
		this.ed_tmptlhr.setTag("1");
				
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(162);
		this.lbltgl2.setLeft(450);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal Masuk");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tglmsk = new portalui_datePicker(this);
		this.dp_tglmsk.setTop(164);
		this.dp_tglmsk.setLeft(550);
		this.dp_tglmsk.setWidth(82);
		
		this.ed_status = new portalui_saiLabelEdit(this);
		this.ed_status.setLeft(450);
		this.ed_status.setTop(186);
		this.ed_status.setWidth(250);
		this.ed_status.setCaption("Status");
		this.ed_status.setText("");
		this.ed_status.setReadOnly(false);
		this.ed_status.setLength(50);
		this.ed_status.setTag("1");
		
		this.ed_idlain = new portalui_saiLabelEdit(this);
		this.ed_idlain.setLeft(450);
		this.ed_idlain.setTop(208);
		this.ed_idlain.setWidth(250);
		this.ed_idlain.setCaption("ID Lainnya");
		this.ed_idlain.setText("");
		this.ed_idlain.setReadOnly(false);
		this.ed_idlain.setLength(50);
		this.ed_idlain.setTag("1");
		
		this.ed_grade = new portalui_saiLabelEdit(this);
		this.ed_grade.setLeft(450);
		this.ed_grade.setTop(230);
		this.ed_grade.setWidth(250);
		this.ed_grade.setCaption("Grade");
		this.ed_grade.setText("");
		this.ed_grade.setReadOnly(false);
		this.ed_grade.setLength(50);
		this.ed_grade.setTag("1");
		
		this.ed_gol = new portalui_saiLabelEdit(this);
		this.ed_gol.setLeft(450);
		this.ed_gol.setTop(252);
		this.ed_gol.setWidth(250);
		this.ed_gol.setCaption("Golongan Darah");
		this.ed_gol.setText("");
		this.ed_gol.setReadOnly(false);
		this.ed_gol.setLength(5);
		this.ed_gol.setTag("1");
		
		this.ed_suku = new portalui_saiLabelEdit(this);
		this.ed_suku.setLeft(450);
		this.ed_suku.setTop(274);
		this.ed_suku.setWidth(250);
		this.ed_suku.setCaption("Suku");
		this.ed_suku.setText("");
		this.ed_suku.setReadOnly(false);
		this.ed_suku.setLength(50);
		this.ed_suku.setTag("1");
		
		this.ed_aslmrn = new portalui_saiLabelEdit(this);
		this.ed_aslmrn.setLeft(450);
		this.ed_aslmrn.setTop(296);
		this.ed_aslmrn.setWidth(250);
		this.ed_aslmrn.setCaption("Asal Lamaran");
		this.ed_aslmrn.setText("");
		this.ed_aslmrn.setReadOnly(false);
		this.ed_aslmrn.setLength(50);
		this.ed_aslmrn.setTag("1");

		setTipeButton(tbSimpan);
		this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fHRKaryawan.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fHRKaryawan.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_hrmis_sdm_master_fHRKaryawan.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);	
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into karyawan (nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_loker,npwp,bank,cabang,no_rek, nama_rek,agama,tgl_lahir,tempat_lahir,tgl_masuk,status,id_lainnya,grade,golongan_darah,kota,propinsi,kode_pos,user_id,tgl_input,no_ponsel,suku,asal_lamaran,kode_pp,sex) values "+
							"('"+this.ed_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
							     this.ed_jabatan.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_mail.getText()+"','"+this.cb_loker.getText()+"','"+
								 this.ed_npwp.getText()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"','"+this.ed_norek.getText()+"','"+
								 this.ed_namarek.getText()+"','"+this.ed_agama.getText()+"','"+this.dp_tgllhr.getDate()+"','"+this.ed_tmptlhr.getText()+
								 "','"+this.dp_tglmsk.getDate()+"','"+this.ed_status.getText()+"','"+this.ed_idlain.getText()+"','"+this.ed_grade.getText()+
								 "','"+this.ed_gol.getText()+"','"+this.ed_kota.getText()+"','"+this.ed_prov.getText()+"','"+this.ed_kdpos.getText()+
								 "','"+this.app._userLog+"','"+tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate()+"','"+this.ed_hp.getText()+"','"+this.ed_suku.getText()+"','"+this.ed_aslmrn.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_sex.getText()+"')");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update karyawan set  "+
							"  kode_loker='"+this.cb_loker.getText()+"',nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
							"',jabatan='"+this.ed_jabatan.getText()+"',no_telp='"+this.ed_tel.getText()+"',email='"+this.ed_mail.getText()+
							"',npwp='"+this.ed_npwp.getText()+"',bank='"+this.ed_bank.getText()+"',cabang='"+this.ed_cabang.getText()+
							"',no_rek='"+this.ed_norek.getText()+"',nama_rek='"+this.ed_namarek.getText()+"',agama='"+this.ed_agama.getText()+
							"',tgl_lahir='"+this.dp_tgllhr.getDate()+"',tempat_lahir='"+this.ed_tmptlhr.getText()+
							"',tgl_masuk='"+this.dp_tglmsk.getDate()+"',status='"+this.ed_status.getText()+
							"',id_lainnya='"+this.ed_idlain.getText()+"',grade='"+this.ed_grade.getText()+
							"',golongan_darah='"+this.ed_gol.getText()+"',kota='"+this.ed_kota.getText()+
							"',propinsi='"+this.ed_prov.getText()+"',kode_pos='"+this.ed_kdpos.getText()+
							"',no_ponsel='"+this.ed_hp.getText()+"',suku='"+this.ed_suku.getText()+
							"',asal_lamaran='"+this.ed_aslmrn.getText()+"',kode_pp='"+this.cb_pp.getText()+"',sex='"+this.cb_sex.getText()+
							"' where nik='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from karyawan where nik='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_master_fHRKaryawan.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			var data = this.dbLib.runSQL("select a.nama,a.alamat,a.jabatan,a.no_telp,a.email,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek, "+
										 "a.agama,a.tgl_lahir,a.tempat_lahir,a.tgl_masuk,a.status,a.id_lainnya,a.grade, "+
										 "a.golongan_darah,a.kota,a.propinsi,a.kode_pos,a.no_ponsel,a.suku,a.asal_lamaran,a.sex "+
										 "from karyawan a "+
										 "where a.nik='"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
		
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					line = data.get(0);
					this.ed_nama.setText(line.get("nama"));
					this.ed_alamat.setText(line.get("alamat"));
					this.ed_kota.setText(line.get("kota"));
					this.ed_prov.setText(line.get("propinsi"));
					this.ed_kdpos.setText(line.get("kode_pos"));
					this.ed_jabatan.setText(line.get("jabatan"));
					this.ed_tel.setText(line.get("no_telp"));
					this.ed_mail.setText(line.get("email"));
					this.ed_hp.setText(line.get("no_ponsel"));
					this.ed_npwp.setText(line.get("npwp"));
					this.cb_sex.setText(line.get("sex"));
					this.ed_bank.setText(line.get("bank"));
					this.ed_cabang.setText(line.get("cabang"));
					this.ed_norek.setText(line.get("no_rek"));
					this.ed_namarek.setText(line.get("nama_rek"));
					this.ed_agama.setText(line.get("agama"));
					this.dp_tgllhr.setDateString(line.get("tgl_lahir"));
					this.ed_tmptlhr.setText(line.get("tempat_lahir"));
					this.dp_tglmsk.setDateString(line.get("tgl_masuk"));
					this.ed_status.setText(line.get("status"));
					this.ed_idlain.setText(line.get("id_lainnya"));
					this.ed_grade.setText(line.get("grade"));					
					this.ed_gol.setText(line.get("golongan_darah"));
					this.ed_suku.setText(line.get("suku"));
					this.ed_aslmrn.setText(line.get("asal_lamaran"));					
					
					setTipeButton(tbUbahHapus);
				} else
				{
					setTipeButton(tbSimpan);
				}
			}else 
			{	
				setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_sdm_master_fHRKaryawan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_lokasi) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi",this.cb_lokasi,undefined, 
										  "select kode_lokasi, nama  from lokasi ",
										  "select count(kode_lokasi) from lokasi ",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.ed_kode,this.ed_nama, 
										  "select nik, nama from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_loker like '"+this.cb_loker.getText()+"' and kode_pp like '"+this.cb_pp.getText()+"%'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_loker like '"+this.cb_loker.getText()+"' and kode_pp like '"+this.cb_pp.getText()+"%'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
		if (sender == this.cb_loker) 
		{
			this.standarLib.showListData(this, "Daftar Loker",this.cb_loker,undefined, 
										  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  new Array("kode_loker","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_master_fHRKaryawan.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};