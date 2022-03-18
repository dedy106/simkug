window.app_saku_sdm_master_fHRKar = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_master_fHRKar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_master_fHRKar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Induk Karyawan : Input/Koreksi", 0);	

		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("NIK");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(54);
		this.ed_alamat.setWidth(400);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(150);
		this.ed_alamat.setTag("1");
		
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(20);
		this.ed_kota.setTop(76);
		this.ed_kota.setWidth(250);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setLength(50);
		this.ed_kota.setTag("1");
		
		this.ed_prov = new portalui_saiLabelEdit(this);
		this.ed_prov.setLeft(20);
		this.ed_prov.setTop(98);
		this.ed_prov.setWidth(250);
		this.ed_prov.setCaption("Provinsi");
		this.ed_prov.setText("");
		this.ed_prov.setReadOnly(false);
		this.ed_prov.setLength(50);
		this.ed_prov.setTag("1");
		
		this.ed_kdpos = new portalui_saiLabelEdit(this);
		this.ed_kdpos.setLeft(20);
		this.ed_kdpos.setTop(120);
		this.ed_kdpos.setWidth(250);		
		this.ed_kdpos.setCaption("Kode Pos");
		this.ed_kdpos.setText("");
		this.ed_kdpos.setReadOnly(false);
		this.ed_kdpos.setLength(5);
		this.ed_kdpos.setTag("1");
		
		this.ed_tel = new portalui_saiLabelEdit(this);
		this.ed_tel.setLeft(20);
		this.ed_tel.setTop(142);
		this.ed_tel.setWidth(250);		
		this.ed_tel.setCaption("Telepon Rumah");
		this.ed_tel.setText("");
		this.ed_tel.setReadOnly(false);
		this.ed_tel.setLength(50);
		this.ed_tel.setTag("1");
		
		this.ed_mail = new portalui_saiLabelEdit(this);
		this.ed_mail.setLeft(20);
		this.ed_mail.setTop(164);
		this.ed_mail.setWidth(250);
		this.ed_mail.setCaption("Email");
		this.ed_mail.setText("");
		this.ed_mail.setReadOnly(false);
		this.ed_mail.setLength(50);
		this.ed_mail.setTag("1");
		
		this.ed_mail2 = new portalui_saiLabelEdit(this);
		this.ed_mail2.setLeft(20);
		this.ed_mail2.setTop(186);
		this.ed_mail2.setWidth(250);
		this.ed_mail2.setCaption("Email 2");
		this.ed_mail2.setText("");
		this.ed_mail2.setReadOnly(false);
		this.ed_mail2.setLength(50);
		this.ed_mail2.setTag("1");
		
		this.ed_hp = new portalui_saiLabelEdit(this);
		this.ed_hp.setLeft(20);
		this.ed_hp.setTop(208);
		this.ed_hp.setWidth(250);		
		this.ed_hp.setCaption("No. Ponsel");
		this.ed_hp.setText("");
		this.ed_hp.setReadOnly(false);
		this.ed_hp.setLength(50);
		this.ed_hp.setTag("1");
		
		this.ed_hp2 = new portalui_saiLabelEdit(this);
		this.ed_hp2.setLeft(20);
		this.ed_hp2.setTop(230);
		this.ed_hp2.setWidth(250);		
		this.ed_hp2.setCaption("No. Ponsel 2");
		this.ed_hp2.setText("");
		this.ed_hp2.setReadOnly(false);
		this.ed_hp2.setLength(50);
		this.ed_hp2.setTag("1");
		
		this.ed_npwp = new portalui_saiLabelEdit(this);
		this.ed_npwp.setLeft(20);
		this.ed_npwp.setTop(252);
		this.ed_npwp.setWidth(250);		
		this.ed_npwp.setCaption("No NPWP");
		this.ed_npwp.setText("");
		this.ed_npwp.setReadOnly(false);
		this.ed_npwp.setLength(15);		
		this.ed_npwp.setTag("1");
		
		this.cb_sex = new portalui_saiCB(this);
		this.cb_sex.setTop(274);
		this.cb_sex.setLeft(20);
		this.cb_sex.setWidth(250);
		this.cb_sex.setReadOnly(true);
		this.cb_sex.setCaption("Jenis Kelamin");
		this.cb_sex.addItem(0,"Laki-Laki");
		this.cb_sex.addItem(1,"Perempuan");
		this.cb_sex.setTag("9");
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(296);
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
		this.ed_norek.setLength(30);
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
		
		this.ed_agama = new portalui_saiCB(this);
		this.ed_agama.setTop(98);
		this.ed_agama.setLeft(450);
		this.ed_agama.setWidth(250);
		this.ed_agama.setReadOnly(true);
		this.ed_agama.setCaption("Agama");
		this.ed_agama.addItem(0,"Islam");
		this.ed_agama.addItem(1,"Katholik");
		this.ed_agama.addItem(2,"Protestan");
		this.ed_agama.addItem(3,"Hindu");
		this.ed_agama.addItem(4,"Budha");
		this.ed_agama.addItem(5,"Aliran Kepercayaan");
		this.ed_agama.setTag("1");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(120);
		this.lbltgl1.setLeft(450);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal Lahir");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgllhr = new portalui_datePicker(this);
		this.dp_tgllhr.setTop(122);
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
		
		this.ed_status = new portalui_saiCB(this);
		this.ed_status.setTop(164);
		this.ed_status.setLeft(450);
		this.ed_status.setWidth(250);
		this.ed_status.setReadOnly(true);
		this.ed_status.setCaption("Status Perkawinan");
		this.ed_status.addItem(0,"TK");
		this.ed_status.addItem(1,"K0");
		this.ed_status.addItem(2,"K1");
		this.ed_status.addItem(3,"K2");
		this.ed_status.addItem(4,"K3");
		this.ed_status.setTag("1");
		
		this.ed_idlain = new portalui_saiLabelEdit(this);
		this.ed_idlain.setLeft(450);
		this.ed_idlain.setTop(186);
		this.ed_idlain.setWidth(250);
		this.ed_idlain.setCaption("ID Lainnya");
		this.ed_idlain.setText("");
		this.ed_idlain.setReadOnly(false);
		this.ed_idlain.setLength(50);
		this.ed_idlain.setTag("1");
		
		this.ed_gol = new portalui_saiCB(this);
		this.ed_gol.setTop(208);
		this.ed_gol.setLeft(450);
		this.ed_gol.setWidth(250);
		this.ed_gol.setReadOnly(true);
		this.ed_gol.setCaption("Golongan Darah");
		this.ed_gol.addItem(0,"A");
		this.ed_gol.addItem(1,"B");
		this.ed_gol.addItem(2,"O");
		this.ed_gol.addItem(3,"AB");
		this.ed_gol.setTag("1");
		
		this.ed_suku = new portalui_saiLabelEdit(this);
		this.ed_suku.setLeft(450);
		this.ed_suku.setTop(230);
		this.ed_suku.setWidth(250);
		this.ed_suku.setCaption("Suku");
		this.ed_suku.setText("");
		this.ed_suku.setReadOnly(false);
		this.ed_suku.setLength(50);
		this.ed_suku.setTag("1");
		
		this.ed_aslmrn = new portalui_saiLabelEdit(this);
		this.ed_aslmrn.setLeft(450);
		this.ed_aslmrn.setTop(252);
		this.ed_aslmrn.setWidth(250);
		this.ed_aslmrn.setCaption("Asal Lamaran");
		this.ed_aslmrn.setText("");
		this.ed_aslmrn.setReadOnly(false);
		this.ed_aslmrn.setLength(50);
		this.ed_aslmrn.setTag("1");

		this.ed_gelar = new portalui_saiLabelEdit(this);
		this.ed_gelar.setLeft(450);
		this.ed_gelar.setTop(274);
		this.ed_gelar.setWidth(180);
		this.ed_gelar.setCaption("Gelar");
		this.ed_gelar.setText("");
		this.ed_gelar.setReadOnly(false);
		this.ed_gelar.setLength(50);
		this.ed_gelar.setTag("1");
		
		this.ed_foto = new portalui_saiLabelEdit(this,{bound:[450,297,250,20],caption:"Foto",text:"",readOnly:true,tag:9});
		this.uploader = new portalui_uploader(this,{bound:[720,297,80,20],onChange:[this,"doChange"],autoSubmit:true,afterUpload:[this,"doAfterUpload"],param1:"uploadTo",param2:"server/media/"});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,320,250,20],caption:"Departement/PP",text:"",readOnly:true,tag:1,btnClick:[this,"FindBtnClick"]});		
        this.im_foto = new portalui_image(this,{bound:[550,320,150,210]});
		this.uploader.addStyle("background-color:#ff9900;border-left:1px solid #ffffff;border-top:1px solid #ffffff;border-right:#555555;border-bottom:1px solid #555555");
		setTipeButton(tbSimpan);
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();		
		this.onClose.set(this,"doClose");
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar;util_file");
			this.standarLib = new util_standar();
			this.file = new util_file();
			this.file.addListener(this);
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_master_fHRKar.extend(window.portalui_childForm);
window.app_saku_sdm_master_fHRKar.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_sdm_master_fHRKar.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk){
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);	
				this.fileSblm = undefined;
				this.im_foto.setImage("");
				this.ed_foto.setText("-");
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
					sql.add("insert into karyawan (nik,kode_lokasi,nama,alamat,no_telp,email,email2,npwp,bank,cabang,no_rek, nama_rek,agama,tgl_lahir,tempat_lahir,status,id_lainnya,golongan_darah,kota,propinsi,kode_pos,user_id,tgl_input,no_ponsel,no_ponsel2,suku,asal_lamaran,sex,kode_lokkonsol,gelar,foto, kode_pp) values "+
							"('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
							     this.ed_tel.getText()+"','"+this.ed_mail.getText()+"','"+this.ed_mail2.getText()+"','"+
								 this.ed_npwp.getText()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"','"+this.ed_norek.getText()+"','"+
								 this.ed_namarek.getText()+"','"+this.ed_agama.getText()+"','"+this.dp_tgllhr.getDate()+"','"+this.ed_tmptlhr.getText()+
								 "','"+this.ed_status.getText()+"','"+this.ed_idlain.getText()+"',"+
								 "'"+this.ed_gol.getText()+"','"+this.ed_kota.getText()+"','"+this.ed_prov.getText()+"','"+this.ed_kdpos.getText()+
								 "','"+this.app._userLog+"',now(),'"+this.ed_hp.getText()+"','"+this.ed_hp2.getText()+"','"+this.ed_suku.getText()+"','"+this.ed_aslmrn.getText()+"','"+this.cb_sex.getText()+"','"+this.lokkonsol+"','"+this.ed_gelar.getText()+"','"+this.ed_foto.getText()+"','"+this.cb_pp.getText()+"' )");
					this.dbLib.execArraySQL(sql);	
					this.fileSblm = undefined;
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
							"  nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
							"',no_telp='"+this.ed_tel.getText()+"',email='"+this.ed_mail.getText()+
							"',email2='"+this.ed_mail2.getText()+"',npwp='"+this.ed_npwp.getText()+"',bank='"+this.ed_bank.getText()+"',cabang='"+this.ed_cabang.getText()+
							"',no_rek='"+this.ed_norek.getText()+"',nama_rek='"+this.ed_namarek.getText()+"',agama='"+this.ed_agama.getText()+
							"',tgl_lahir='"+this.dp_tgllhr.getDate()+"',tempat_lahir='"+this.ed_tmptlhr.getText()+
							"',status='"+this.ed_status.getText()+
							"',id_lainnya='"+this.ed_idlain.getText()+"',golongan_darah='"+this.ed_gol.getText()+"',kota='"+this.ed_kota.getText()+
							"',propinsi='"+this.ed_prov.getText()+"',kode_pos='"+this.ed_kdpos.getText()+
							"',no_ponsel='"+this.ed_hp.getText()+"',no_ponsel2='"+this.ed_hp2.getText()+"',suku='"+this.ed_suku.getText()+
							"',asal_lamaran='"+this.ed_aslmrn.getText()+"',sex='"+this.cb_sex.getText()+"',kode_lokasi='"+this.app._lokasi+
							"',gelar='"+this.ed_gelar.getText()+"', foto='"+this.ed_foto.getText()+"' "+
							", kode_pp='"+this.cb_pp.getText()+"' "+
                            " where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);						
					this.fileSblm = undefined;
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from karyawan where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_master_fHRKar.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			var data = this.dbLib.runSQL("select a.nama,a.alamat,a.jabatan,a.no_telp,a.email,a.email2,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek, "+
										 "a.agama,a.tgl_lahir,a.tempat_lahir,a.tgl_masuk,a.status,a.id_lainnya,"+
										 "a.golongan_darah,a.kota,a.propinsi,a.kode_pos,a.no_ponsel,a.no_ponsel2,a.suku,a.asal_lamaran,a.sex,a.gelar,a.foto, a.kode_pp, ifnull(b.nama,'-') as nama_pp "+
										 "from karyawan a "+
										 "     left outer join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
										 "where a.nik='"+this.ed_kode.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
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
					this.ed_tel.setText(line.get("no_telp"));
					this.ed_mail.setText(line.get("email"));
					this.ed_mail2.setText(line.get("email2"));
					this.ed_hp.setText(line.get("no_ponsel"));
					this.ed_hp2.setText(line.get("no_ponsel2"));
					this.ed_npwp.setText(line.get("npwp"));
					this.cb_sex.setText(line.get("sex"));
					this.ed_bank.setText(line.get("bank"));
					this.ed_cabang.setText(line.get("cabang"));
					this.ed_norek.setText(line.get("no_rek"));
					this.ed_namarek.setText(line.get("nama_rek"));
					this.ed_agama.setText(line.get("agama"));
					this.dp_tgllhr.setDateString(line.get("tgl_lahir"));
					this.ed_tmptlhr.setText(line.get("tempat_lahir"));
					this.ed_status.setText(line.get("status"));
					this.ed_idlain.setText(line.get("id_lainnya"));
					this.ed_gol.setText(line.get("golongan_darah"));
					this.ed_suku.setText(line.get("suku"));
					this.ed_aslmrn.setText(line.get("asal_lamaran"));					
					this.ed_gelar.setText(line.get("gelar"));		
					this.ed_foto.setText(line.get("foto"));
					this.im_foto.setImage("server/media/"+line.get("foto"));
					this.fileSblm = line.get("foto");
					this.cb_pp.setText(line.get("kode_pp"),line.get("nama_pp"));
					setTipeButton(tbUbahHapus);
				} else
				{
					setTipeButton(tbSimpan);
				}
			}else 
			{					
                setTipeButton(tbSimpan);
                systemAPI.alert(data);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_sdm_master_fHRKar.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.ed_kode,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
		if (sender == this.cb_pp){
		   this.standarLib.showListData(this, "Daftar PP",sender, undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"'",
										  new Array("kode_pp","nama"),"and",new Array("Kode PP","Nama"),false);
			  
        }
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_sdm_master_fHRKar.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_sdm_master_fHRKar.implement({
	doChange: function(sender, filename){
		this.ed_foto.setText(filename);	
		this.deleteSblm();		
		this.fileSblm = filename;
	},
	deleteSblm: function(){
		if (this.fileSblm !== undefined || !this.saveEvent) {					
			var rootDir = this.file.getRootDir();				
			var separator = rootDir.charAt(rootDir.length-1);			
			rootDir = rootDir.substr(0,rootDir.length-2);
			rootDir = rootDir.substr(0,rootDir.lastIndexOf(separator));				
			this.file.deleteFile(rootDir+"/server/media/" + this.fileSblm);
		}
	},
	doAfterUpload: function(sender, result, data, filename){		
		this.im_foto.setImage("server/media/"+filename);
	},
	doClose: function(sender){
		this.deleteSblm();
	}
});
