window.app_saku_referensi_transaksi_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku_referensi_transaksi_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_referensi_transaksi_fKaryawan";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	

		uses("portalui_saiCBBL");
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
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(54);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("NIK");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);		        
						
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(76);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
		
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
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(98);
		this.ed_alamat.setWidth(600);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(150);
		this.ed_alamat.setTag("1");
				
		this.ed_jabatan = new portalui_saiLabelEdit(this);
		this.ed_jabatan.setLeft(20);
		this.ed_jabatan.setTop(120);
		this.ed_jabatan.setWidth(250);
		this.ed_jabatan.setCaption("Jabatan");
		this.ed_jabatan.setText("");
		this.ed_jabatan.setReadOnly(false);
		this.ed_jabatan.setLength(50);
		this.ed_jabatan.setTag("1");
		
		this.ed_tel = new portalui_saiLabelEdit(this);
		this.ed_tel.setLeft(20);
		this.ed_tel.setTop(142);
		this.ed_tel.setWidth(250);
		this.ed_tel.setCaption("No Telepon");
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
		
		this.ed_npwp = new portalui_saiLabelEdit(this);
		this.ed_npwp.setLeft(20);
		this.ed_npwp.setTop(186);
		this.ed_npwp.setWidth(250);
		this.ed_npwp.setCaption("No NPWP");
		this.ed_npwp.setText("");
		this.ed_npwp.setReadOnly(false);
		this.ed_npwp.setLength(15);
		this.ed_npwp.setTipeText(ttAngka);
		this.ed_npwp.setTag("1");
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(208);
		this.ed_bank.setWidth(250);
		this.ed_bank.setCaption("Nama Bank");
		this.ed_bank.setText("");
		this.ed_bank.setReadOnly(false);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(20);
		this.ed_cabang.setTop(230);
		this.ed_cabang.setWidth(250);
		this.ed_cabang.setCaption("Cabang");
		this.ed_cabang.setText("");
		this.ed_cabang.setReadOnly(false);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.ed_norek = new portalui_saiLabelEdit(this);
		this.ed_norek.setLeft(20);
		this.ed_norek.setTop(252);
		this.ed_norek.setWidth(250);
		this.ed_norek.setCaption("No Rekening");
		this.ed_norek.setText("");
		this.ed_norek.setReadOnly(false);
		this.ed_norek.setLength(50);
		this.ed_norek.setTag("1");
		
		this.ed_namarek = new portalui_saiLabelEdit(this);
		this.ed_namarek.setLeft(20);
		this.ed_namarek.setTop(274);
		this.ed_namarek.setWidth(250);
		this.ed_namarek.setCaption("Nama Rekening");
		this.ed_namarek.setText("");
		this.ed_namarek.setReadOnly(false);
		this.ed_namarek.setLength(50);
		this.ed_namarek.setTag("1");
		
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.rearrangeChild(10,23);
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
window.app_saku_referensi_transaksi_fKaryawan.extend(window.portalui_childForm);
window.app_saku_referensi_transaksi_fKaryawan.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_referensi_transaksi_fKaryawan.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
				this.standarLib.clearByTag(this, [0,1],this.ed_kode);				
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into karyawan (nik, kode_lokasi, nama, alamat, jabatan, no_telp, email, kode_pp, npwp, bank, cabang, no_rek, nama_rek) values "+
							"('"+this.ed_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
							     this.ed_jabatan.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_mail.getText()+"','"+this.cb_pp.getText()+"','"+
								 this.ed_npwp.getText()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"','"+this.ed_norek.getText()+"','"+this.ed_namarek.getText()+"')");
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
					sql.add("update karyawan set  "+
							"  kode_pp='"+this.cb_pp.getText()+"',nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
							"',jabatan='"+this.ed_jabatan.getText()+"',no_telp='"+this.ed_tel.getText()+"',email='"+this.ed_mail.getText()+
							"',npwp='"+this.ed_npwp.getText()+"',bank='"+this.ed_bank.getText()+"',cabang='"+this.ed_cabang.getText()+
							"',no_rek='"+this.ed_norek.getText()+"',nama_rek='"+this.ed_namarek.getText()+
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
window.app_saku_referensi_transaksi_fKaryawan.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			var data = this.dbLib.runSQL(" select a.nama,a.alamat,a.jabatan,a.no_telp,a.email,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek, a.kode_pp, b.nama as nmpp "+
										 " from karyawan a "+
										 " left outer join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
										 " where a.nik='"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					line = data.get(0);
					this.ed_nama.setText(line.get("nama"));
					this.cb_pp.setText(line.get("kode_pp"), line.get("nmpp"));
					this.ed_alamat.setText(line.get("alamat"));
					this.ed_jabatan.setText(line.get("jabatan"));
					this.ed_tel.setText(line.get("no_telp"));
					this.ed_mail.setText(line.get("email"));
					this.ed_npwp.setText(line.get("npwp"));
					this.ed_bank.setText(line.get("bank"));
					this.ed_cabang.setText(line.get("cabang"));
					this.ed_norek.setText(line.get("no_rek"));
					this.ed_namarek.setText(line.get("nama_rek"));
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
window.app_saku_referensi_transaksi_fKaryawan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.ed_kode,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' ",
										  "select count(nik) from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  ["kode_pp","nama"],"and",["Kode","Deskripsi"],false);
		}
		if (sender == this.cb_lokasi) 
		{
			if (this.app._userStatus == "A") var filter = "%";
			else var filter = this.app._lokasi;
			this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
										  "select kode_lokasi, nama  from lokasi where kode_lokasi like '"+filter+"' ",
										  "select count(kode_lokasi) from lokasi where kode_lokasi like '"+filter+"' ",
										  ["kode_lokasi","nama"],"and",["Kode Lokasi","Nama"],false);
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_referensi_transaksi_fKaryawan.prototype.doRequestReady = function(sender, methodName, result)
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
