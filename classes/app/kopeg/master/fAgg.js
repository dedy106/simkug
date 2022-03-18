window.app_kopeg_master_fAgg = function(owner)
{
	if (owner)
	{
		window.app_kopeg_master_fAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_master_fAgg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Nasabah", 0);	

		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setCaption("Kode Lokasi");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("9");
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(32);
		this.ed_kode.setWidth(185);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setCaption("Kode Nasabah");
		this.ed_kode.setText("");
		this.ed_kode.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(205);
		this.bShow.setTop(32);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
				
		this.cb_klp = new portalui_saiCBBL(this);
		this.cb_klp.setLeft(20);
		this.cb_klp.setTop(54);
		this.cb_klp.setWidth(185);
		this.cb_klp.setLabelWidth(100);
		this.cb_klp.setReadOnly(true);
		this.cb_klp.setRightLabelVisible(true);
		this.cb_klp.setCaption("Lokasi Kerja");
		this.cb_klp.setText("");
		this.cb_klp.setRightLabelCaption("");
			
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(76);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(98);
		this.ed_alamat.setWidth(400);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(150);
		this.ed_alamat.setTag("1");
				
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(20);
		this.ed_kota.setTop(120);
		this.ed_kota.setWidth(250);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setLength(50);
		this.ed_kota.setTag("1");
		
		this.ed_pos = new portalui_saiLabelEdit(this);
		this.ed_pos.setLeft(280);
		this.ed_pos.setTop(120);
		this.ed_pos.setWidth(140);
		this.ed_pos.setCaption("Kode Pos");
		this.ed_pos.setText("");
		this.ed_pos.setReadOnly(false);
		this.ed_pos.setLength(5);
		this.ed_pos.setTipeText(ttAngka);
		this.ed_pos.setTag("1");
		
		this.ed_email = new portalui_saiLabelEdit(this);
		this.ed_email.setLeft(520);
		this.ed_email.setTop(120);
		this.ed_email.setWidth(250);
		this.ed_email.setCaption("Alamat Email");
		this.ed_email.setText("");
		this.ed_email.setReadOnly(false);
		this.ed_email.setLength(50);
		this.ed_email.setTag("1");
		
		this.ed_tel = new portalui_saiLabelEdit(this);
		this.ed_tel.setLeft(20);
		this.ed_tel.setTop(142);
		this.ed_tel.setWidth(250);
		this.ed_tel.setCaption("No Telepon");
		this.ed_tel.setText("");
		this.ed_tel.setReadOnly(false);
		this.ed_tel.setLength(20);
		this.ed_tel.setTipeText(ttAngka);
		this.ed_tel.setTag("1");
		
		this.ed_grade = new portalui_saiLabelEdit(this);
		this.ed_grade.setLeft(520);
		this.ed_grade.setTop(142);
		this.ed_grade.setWidth(200);
		this.ed_grade.setCaption("Grade");
		this.ed_grade.setText("");
		this.ed_grade.setReadOnly(false);
		this.ed_grade.setLength(10);
		this.ed_grade.setTag("1");
		
		this.ed_fax = new portalui_saiLabelEdit(this);
		this.ed_fax.setLeft(20);
		this.ed_fax.setTop(164);
		this.ed_fax.setWidth(250);
		this.ed_fax.setCaption("No Faximile");
		this.ed_fax.setText("");
		this.ed_fax.setReadOnly(false);
		this.ed_fax.setLength(20);
		this.ed_fax.setTipeText(ttAngka);
		this.ed_fax.setTag("1");
		
		this.ed_gaji = new portalui_saiLabelEdit(this);
		this.ed_gaji.setLeft(520);
		this.ed_gaji.setTop(164);
		this.ed_gaji.setWidth(200);
		this.ed_gaji.setTipeText(ttNilai);
		this.ed_gaji.setCaption("Gaji Bulanan");
		this.ed_gaji.setText("0");
		this.ed_gaji.setReadOnly(false);
		this.ed_gaji.setLength(10);
		this.ed_gaji.setTag("1");
		
		this.ed_npwp = new portalui_saiLabelEdit(this);
		this.ed_npwp.setLeft(20);
		this.ed_npwp.setTop(186);
		this.ed_npwp.setWidth(250);
		this.ed_npwp.setCaption("No NPWP");
		this.ed_npwp.setText("");
		this.ed_npwp.setReadOnly(false);
		this.ed_npwp.setLength(50);
		this.ed_npwp.setTag("1");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(186);
		this.lbltgl1.setLeft(520);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal Lahir");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgllahir = new portalui_datePicker(this);
		this.dp_tgllahir.setTop(188);
		this.dp_tgllahir.setLeft(620);
		this.dp_tgllahir.setWidth(82);
		
		this.ed_alamat2 = new portalui_saiLabelEdit(this);
		this.ed_alamat2.setLeft(20);
		this.ed_alamat2.setTop(208);
		this.ed_alamat2.setWidth(400);
		this.ed_alamat2.setCaption("Alamat NPWP");
		this.ed_alamat2.setText("");
		this.ed_alamat2.setReadOnly(false);
		this.ed_alamat2.setLength(150);
		this.ed_alamat2.setTag("1");
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(208);
		this.lbltgl2.setLeft(520);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal Aktif");
		this.lbltgl2.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tglaktif = new portalui_datePicker(this);
		this.dp_tglaktif.setTop(208);
		this.dp_tglaktif.setLeft(620);
		this.dp_tglaktif.setWidth(82);
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(230);
		this.ed_bank.setWidth(300);
		this.ed_bank.setCaption("Nama Bank");
		this.ed_bank.setText("");
		this.ed_bank.setReadOnly(false);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		
		this.ed_status = new portalui_saiCB(this);
		this.ed_status.setTop(230);
		this.ed_status.setLeft(520);
		this.ed_status.setWidth(185);
		this.ed_status.setReadOnly(true);
		this.ed_status.setCaption("Status Nasabah");
		this.ed_status.addItem(0,"AGG");
		this.ed_status.addItem(1,"NON");
		this.ed_status.setTag("2");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(20);
		this.ed_cabang.setTop(252);
		this.ed_cabang.setWidth(300);
		this.ed_cabang.setCaption("Cabang");
		this.ed_cabang.setText("");
		this.ed_cabang.setReadOnly(false);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.ed_aktif = new portalui_saiCB(this);
		this.ed_aktif.setTop(252);
		this.ed_aktif.setLeft(520);
		this.ed_aktif.setWidth(185);
		this.ed_aktif.setReadOnly(true);
		this.ed_aktif.setCaption("Status Aktif");
		this.ed_aktif.addItem(0,"AKTIF");
		this.ed_aktif.addItem(1,"TIDAK");
		this.ed_aktif.setTag("2");
		
		this.ed_norek = new portalui_saiLabelEdit(this);
		this.ed_norek.setLeft(20);
		this.ed_norek.setTop(274);
		this.ed_norek.setWidth(300);
		this.ed_norek.setCaption("No Rekening");
		this.ed_norek.setText("");
		this.ed_norek.setReadOnly(false);
		this.ed_norek.setLength(50);
		this.ed_norek.setTag("1");
		
		this.ed_noid = new portalui_saiLabelEdit(this);
		this.ed_noid.setLeft(520);
		this.ed_noid.setTop(274);
		this.ed_noid.setWidth(250);
		this.ed_noid.setCaption("No ID Lain");
		this.ed_noid.setText("");
		this.ed_noid.setReadOnly(false);
		this.ed_noid.setLength(10);
		this.ed_noid.setTag("1");
		
		this.ed_namarek = new portalui_saiLabelEdit(this);
		this.ed_namarek.setLeft(20);
		this.ed_namarek.setTop(296);
		this.ed_namarek.setWidth(300);
		this.ed_namarek.setCaption("Nama Rekening");
		this.ed_namarek.setText("");
		this.ed_namarek.setReadOnly(false);
		this.ed_namarek.setLength(50);
		this.ed_namarek.setTag("1");
		
		this.ed_nohp = new portalui_saiLabelEdit(this);
		this.ed_nohp.setLeft(520);
		this.ed_nohp.setTop(296);
		this.ed_nohp.setWidth(250);
		this.ed_nohp.setCaption("No HandPhone");
		this.ed_nohp.setText("");
		this.ed_nohp.setReadOnly(false);
		this.ed_nohp.setLength(20);
		this.ed_nohp.setTag("1");
		
		setTipeButton(tbAllFalse);
		
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_klp.onBtnClick.set(this, "FindBtnClick");
		
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
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_master_fAgg.extend(window.portalui_childForm);
window.app_kopeg_master_fAgg.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
};
window.app_kopeg_master_fAgg.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0,1],this.ed_kode);	
				setTipeButton(tbAllFalse);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					sql.add("insert into kop_agg (kode_agg,kode_loker,nama,alamat,kota,kode_pos,no_telp,no_fax,npwp,kode_lokasi,bank,cabang,no_rek,nama_rek,alamat2,no_lain,no_hp,email,grade,gaji,sts_aktif,tgl_lahir,tgl_aktif,sts_agg)  values "+
							"('"+this.ed_kode.getText()+"','"+this.cb_klp.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
							     this.ed_kota.getText()+"','"+this.ed_pos.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_fax.getText()+"','"+
								 this.ed_npwp.getText()+"','"+this.cb_lokasi.getText()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"','"+this.ed_norek.getText()+"','"+this.ed_namarek.getText()+"','"+this.ed_alamat2.getText()+"', "+
								 "'"+this.ed_noid.getText()+"','"+this.ed_nohp.getText()+"','"+this.ed_email.getText()+"','"+this.ed_grade.getText()+"',"+parseNilai(this.ed_gaji.getText())+",'"+this.ed_aktif.getText().substr(0,1)+"','"+this.dp_tgllahir.getDateString()+"','"+this.dp_tglaktif.getDateString()+"','"+this.ed_status.getText()+"')");
					
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update kop_agg set  "+
							"kode_loker='"+this.cb_klp.getText()+"',nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
							"',kota='"+this.ed_kota.getText()+"',kode_pos='"+this.ed_pos.getText()+"',no_telp='"+this.ed_tel.getText()+
							"',no_fax='"+this.ed_fax.getText()+"',npwp='"+this.ed_npwp.getText()+"',bank='"+this.ed_bank.getText()+
							"',cabang='"+this.ed_cabang.getText()+"',no_rek='"+this.ed_norek.getText()+"',nama_rek='"+this.ed_namarek.getText()+"',alamat2='"+this.ed_alamat2.getText()+"',"+
							" no_lain='"+this.ed_noid.getText()+"',no_hp='"+this.ed_nohp.getText()+"',email='"+this.ed_email.getText()+"',grade='"+this.ed_grade.getText()+"',gaji="+parseNilai(this.ed_gaji.getText())+",sts_aktif='"+this.ed_aktif.getText().substr(0,1)+"',tgl_lahir='"+this.dp_tgllahir.getDateString()+"',tgl_aktif='"+this.dp_tglaktif.getDateString()+"',sts_agg='"+this.ed_status.getText()+"' "+
							" where kode_agg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					
					
					if (this.ed_status.getText().substr(0,1)=="A") var vSts = "1"; else var vSts = "0"; 
					sql.add("update kop_simp_m set status_aktif='"+vSts+"' where kode_agg='"+this.ed_kode.getText()+"' ");
					sql.add("update kop_pinj_m set status_aktif='"+vSts+"' where kode_agg='"+this.ed_kode.getText()+"' ");
					sql.add("update kop_pbrg_m set status_aktif='"+vSts+"' where kode_agg='"+this.ed_kode.getText()+"' ");
					
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from kop_agg where kode_agg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_kopeg_master_fAgg.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			this.standarLib.clearByTag(this, [1],undefined);
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_agg,a.nama,a.alamat,a.kota,a.kode_pos,a.no_telp,a.no_fax,a.npwp,a.kode_loker,b.nama as nama_klp, "+
											"       a.bank,a.cabang,a.no_rek,a.nama_rek,a.alamat2,a.no_lain,a.no_hp,a.email,a.grade,a.gaji,case a.sts_aktif when 'A' then 'Aktif' else 'Tidak' end,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,date_format(a.tgl_aktif,'%d/%m/%Y') as tgl_aktif,a.sts_agg "+
											"from kop_agg a inner join kop_loker b on a.kode_loker = b.kode_loker "+
											"where a.kode_agg = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
			if (data != undefined) 
			{
				if  (data != "") 
				{
					var field = data.split("\r\n");
					var field = field[1].split(";");
					
					this.ed_nama.setText(field[1]);
					this.ed_alamat.setText(field[2]);
					this.ed_kota.setText(field[3]);
					this.ed_pos.setText(field[4]);
					this.ed_tel.setText(field[5]);
					this.ed_fax.setText(field[6]);
					this.ed_npwp.setText(field[7]);
					this.cb_klp.setText(field[8]);
					this.cb_klp.setRightLabelCaption(field[9]);
					this.ed_bank.setText(field[10]);
					this.ed_cabang.setText(field[11]);
					this.ed_norek.setText(field[12]);
					this.ed_namarek.setText(field[13]);					
					this.ed_alamat2.setText(field[14]);					
					this.ed_noid.setText(field[15]);					
					this.ed_nohp.setText(field[16]);					
					this.ed_email.setText(field[17]);					
					this.ed_grade.setText(field[18]);					
					this.ed_gaji.setText(floatToNilai(field[19]));					
					this.ed_aktif.setText(field[20]);					
					this.dp_tgllahir.setText(field[21]);					
					this.dp_tglaktif.setText(field[22]);					
					this.ed_status.setText(field[23].toUpperCase());					
					setTipeButton(tbUbahHapus);
				}
				else
				{
					setTipeButton(tbSimpan);
				}
			}
			else
			{	
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};											  
window.app_kopeg_master_fAgg.prototype.FindBtnClick = function(sender, event){
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Nasabah",this.ed_kode,this.ed_nama, 
										  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_agg","nama"],"and",["Kd Nasabah","Nama"],false);
			this.standarLib.clearByTag(this, [1],undefined);				
		}
		if (sender == this.cb_klp) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi Kerja",this.cb_klp,undefined, 
										  "select kode_loker, nama  from kop_loker where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_loker) from kop_loker where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_loker","nama"],"and",["Kd Loker","Nama"],false);
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_kopeg_master_fAgg.prototype.doRequestReady = function(sender, methodName, result)
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