window.app_saku_kb_transaksi_proses_depo_fDepotmpk = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_depo_fDepotmpk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan Deposito: Koreksi", 0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
	
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal");
		this.lblTgl1.setUnderLine(true);
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Deposito");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(540);
		this.cb_perlama.setTop(32);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(540);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Deposito Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(762);
		this.bLoad.setTop(54);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
	        
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		/*
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(120);
		this.ed_bank.setWidth(185);
		this.ed_bank.setCaption("Bank - Cabang");
		this.ed_bank.setReadOnly(false);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		*/
		
		this.ed_bank = new portalui_saiCBBL(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(120);
		this.ed_bank.setWidth(185);
		this.ed_bank.setText("");
		this.ed_bank.setCaption("Bank");
		this.ed_bank.setReadOnly(true);
		this.ed_bank.setLabelWidth(100);
		this.ed_bank.setRightLabelVisible(false);
		this.ed_bank.setRightLabelCaption("");
		this.ed_bank.setTag("1");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(210);
		this.ed_cabang.setTop(120);
		this.ed_cabang.setWidth(310);
		this.ed_cabang.setLabelWidth(0);
		this.ed_cabang.setReadOnly(true);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(142);
		this.lblTgl2.setLeft(20);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tgl Jatuh Tempo");
		this.lblTgl2.setUnderLine(true);
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(144);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
		
		this.ed_bunga = new portalui_saiLabelEdit(this);
		this.ed_bunga.setLeft(290);
		this.ed_bunga.setTop(142);
		this.ed_bunga.setWidth(150);
		this.ed_bunga.setTipeText(ttNilai);
		this.ed_bunga.setAlignment(alRight);
		this.ed_bunga.setCaption("Rate [%/Tahun]");
		this.ed_bunga.setText("0"); 
		this.ed_bunga.setReadOnly(false);
		this.ed_bunga.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(164);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(164);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.ed_basis = new portalui_saiLabelEdit(this);
		this.ed_basis.setLeft(290);
		this.ed_basis.setTop(164);
		this.ed_basis.setWidth(150);
		this.ed_basis.setLabelWidth(100);
		this.ed_basis.setTipeText(ttNilai);
		this.ed_basis.setAlignment(alRight);
		this.ed_basis.setCaption("Basis [Hari]");
		this.ed_basis.setText("0"); 
		this.ed_basis.setReadOnly(false);
		this.ed_basis.setTag("1");
		
		this.cb_akundepo = new portalui_saiCBBL(this);
		this.cb_akundepo.setLeft(20);
		this.cb_akundepo.setTop(186);
		this.cb_akundepo.setWidth(185);
		this.cb_akundepo.setLabelWidth(100);
		this.cb_akundepo.setReadOnly(true);
		this.cb_akundepo.setRightLabelVisible(true);
		this.cb_akundepo.setCaption("Akun Deposito");
		this.cb_akundepo.setRightLabelCaption("");
		this.cb_akundepo.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(208);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Akun KB Asal");
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setTag("1");
		
		this.cb_cbunga = new portalui_saiCBBL(this);
		this.cb_cbunga.setLeft(20);
		this.cb_cbunga.setTop(230);
		this.cb_cbunga.setWidth(185);
		this.cb_cbunga.setLabelWidth(100);
		this.cb_cbunga.setReadOnly(true);
		this.cb_cbunga.setRightLabelVisible(true);
		this.cb_cbunga.setCaption("Akun KB Bunga");
		this.cb_cbunga.setRightLabelCaption("");
		this.cb_cbunga.setTag("1");
		
		this.cb_ar = new portalui_saiCBBL(this);
		this.cb_ar.setLeft(20);
		this.cb_ar.setTop(252);
		this.cb_ar.setWidth(185);
		this.cb_ar.setLabelWidth(100);
		this.cb_ar.setReadOnly(true);
		this.cb_ar.setRightLabelVisible(true);
		this.cb_ar.setCaption("Akun Piutang");
		this.cb_ar.setRightLabelCaption("");
		this.cb_ar.setTag("1");
		
		this.cb_pdpt = new portalui_saiCBBL(this);
		this.cb_pdpt.setLeft(20);
		this.cb_pdpt.setTop(274);
		this.cb_pdpt.setWidth(185);
		this.cb_pdpt.setLabelWidth(100);
		this.cb_pdpt.setReadOnly(true);
		this.cb_pdpt.setRightLabelVisible(true);
		this.cb_pdpt.setCaption("Akun Pend. Bunga");
		this.cb_pdpt.setRightLabelCaption("");
		this.cb_pdpt.setTag("1");
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(296);
		this.cb_buat.setWidth(185);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setRightLabelCaption("");
		this.cb_buat.setTag("1");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(318);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(340);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Deposito");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setTag("1");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(540);
	    this.p1.setTop(76);
	    this.p1.setWidth(450);
	    this.p1.setHeight(278);
	    this.p1.setName('p1');
	    this.p1.setCaption('Data Kelengkapan Administrasi');
		
		this.lbltgl3 = new portalui_label(this.p1);
		this.lbltgl3.setTop(20);
		this.lbltgl3.setLeft(20);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setCaption("Data Justifikasi");
		this.lbltgl3.setUnderLine(true);
		this.dp_tgl3 = new portalui_datePicker(this.p1);
		this.dp_tgl3.setTop(22);
		this.dp_tgl3.setLeft(120);
		this.dp_tgl3.setWidth(81);
		
		this.ed_jam = new portalui_saiLabelEdit(this.p1);
		this.ed_jam.setLeft(210);
		this.ed_jam.setTop(20);
		this.ed_jam.setWidth(80);
		this.ed_jam.setCaption("Jam");
		this.ed_jam.setReadOnly(false);
		this.ed_jam.setLength(10);
		this.ed_jam.setLabelWidth(30);
		this.ed_jam.setTag("1");
		
		this.ed_pic1 = new portalui_saiLabelEdit(this.p1);
		this.ed_pic1.setLeft(20);
		this.ed_pic1.setTop(42);
		this.ed_pic1.setWidth(270);
		this.ed_pic1.setCaption("PIC Bank");
		this.ed_pic1.setReadOnly(false);
		this.ed_pic1.setLength(50);
		this.ed_pic1.setLabelWidth(100);
		this.ed_pic1.setTag("1");
		
		this.ed_waktu = new portalui_saiLabelEdit(this.p1);
		this.ed_waktu.setLeft(20);
		this.ed_waktu.setTop(64);
		this.ed_waktu.setWidth(198);
		this.ed_waktu.setCaption("Jangka Waktu");
		this.ed_waktu.setReadOnly(false);
		this.ed_waktu.setLength(30);
		this.ed_waktu.setLabelWidth(100);
		this.ed_waktu.setTag("1");
		
		this.ed_pic2 = new portalui_saiLabelEdit(this.p1);
		this.ed_pic2.setLeft(20);
		this.ed_pic2.setTop(86);
		this.ed_pic2.setWidth(270);
		this.ed_pic2.setCaption("PIC Karyawan");
		this.ed_pic2.setReadOnly(false);
		this.ed_pic2.setLength(50);
		this.ed_pic2.setLabelWidth(100);
		this.ed_pic2.setTag("1");
		
		this.ed_nomor = new portalui_saiLabelEdit(this.p1);
		this.ed_nomor.setLeft(20);
		this.ed_nomor.setTop(108);
		this.ed_nomor.setWidth(270);
		this.ed_nomor.setCaption("No. Surat");
		this.ed_nomor.setReadOnly(false);
		this.ed_nomor.setLength(50);
		this.ed_nomor.setLabelWidth(100);
		this.ed_nomor.setTag("1");
		
		this.bShow = new portalui_imageButton(this.p1);
		this.bShow.setLeft(400);
		this.bShow.setTop(108);
		this.bShow.setHint("Data Bank");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		//------------- data bank asal
		this.ed_basal = new portalui_saiLabelEdit(this.p1);
		this.ed_basal.setLeft(20);
		this.ed_basal.setTop(130);
		this.ed_basal.setWidth(400);
		this.ed_basal.setCaption("Bank Asal");
		this.ed_basal.setReadOnly(true);
		this.ed_basal.setTag("2");
		
		this.ed_anasal = new portalui_saiLabelEdit(this.p1);
		this.ed_anasal.setLeft(20);
		this.ed_anasal.setTop(152);
		this.ed_anasal.setWidth(400);
		this.ed_anasal.setCaption("Atas Nama");
		this.ed_anasal.setReadOnly(true);
		this.ed_anasal.setTag("2");
		
		this.ed_rekasal = new portalui_saiLabelEdit(this.p1);
		this.ed_rekasal.setLeft(20);
		this.ed_rekasal.setTop(174);
		this.ed_rekasal.setWidth(400);
		this.ed_rekasal.setCaption("No. Rek");
		this.ed_rekasal.setReadOnly(true);
		this.ed_rekasal.setTag("2");
		
		//------------- data bank bunga
		this.ed_bbunga = new portalui_saiLabelEdit(this.p1);
		this.ed_bbunga.setLeft(20);
		this.ed_bbunga.setTop(196);
		this.ed_bbunga.setWidth(400);
		this.ed_bbunga.setCaption("Bank Bunga");
		this.ed_bbunga.setReadOnly(true);
		this.ed_bbunga.setTag("3");
		
		this.ed_anbunga = new portalui_saiLabelEdit(this.p1);
		this.ed_anbunga.setLeft(20);
		this.ed_anbunga.setTop(218);
		this.ed_anbunga.setWidth(400);
		this.ed_anbunga.setCaption("Atas Nama");
		this.ed_anbunga.setReadOnly(true);
		this.ed_anbunga.setTag("3");
		
		this.ed_rekbunga = new portalui_saiLabelEdit(this.p1);
		this.ed_rekbunga.setLeft(20);
		this.ed_rekbunga.setTop(240);
		this.ed_rekbunga.setWidth(400);
		this.ed_rekbunga.setCaption("No. Rek");
		this.ed_rekbunga.setReadOnly(true);
		this.ed_rekbunga.setTag("3");
		//-------------------
	
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_akun.onChange.set(this, "doEditChange");
			this.cb_cbunga.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_cbunga.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_akundepo.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_ar.onBtnClick.set(this, "FindBtnClick");
			this.cb_pdpt.onBtnClick.set(this, "FindBtnClick");
			this.ed_bank.onBtnClick.set(this, "FindBtnClick");
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%'");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_perlama.addItem(j,val[j].split(";"));
					}
				}
				
			this.standarLib.clearByTag(this,["0","1","2","3","9"],this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.ubah = function()
{
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Nilai penempatan deposito tidak valid.","Nilai tidak boleh nol atau kurang");
		return false;
	}
	if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
	{
		system.alert(this,"Tanggal penempatan tidak valid.","Tanggal penempatan melebihi tanggal jatuh tempo.");
		return false;
	}	
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2","3")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update depo_m set no_del = 'DEL' where no_depo ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from depo_m where no_depo ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.cb_bukti.getText();
			}
			sql.add("insert into depo_m (no_depo,no_kas,no_dokumen,tanggal,due_date,tgl_akru,bank,cabang,rate,basis,"+
					"keterangan,catatan,kode_curr,kurs,akun_kb,akun_depo,akun_cbunga,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,progress,periode,no_del,no_link,nik_user,tgl_input,tgl_just,jam,pic_bank,pic_karyawan,jk_waktu,akun_ar,akun_pdpt,kode_bank,kode_bankcbunga,kode_bankcair)  values "+
					"('"+this.nb+"','-','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"',"+parseNilai(this.ed_bunga.getText())+","+parseNilai(this.ed_basis.getText())+","+
					"'"+this.ed_desc.getText()+"','"+this.ed_nomor.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.akunkb+"','"+this.cb_akundepo.getText()+"','"+this.akuncbunga+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','-',"+
					"'DEPO_P',"+parseNilai(this.ed_nilai.getText())+",'0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now(),'"+
					this.dp_tgl2.getDate()+"','"+this.ed_jam.getText()+"','"+this.ed_pic1.getText()+"','"+this.ed_pic2.getText()+"','"+this.ed_waktu.getText()+"','"+this.cb_ar.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_cbunga.getText()+"','-')");
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2","3","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
			
		case "ubah" :
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}		
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}
			else this.ubah();
			break;
			
		case "ubahcek" : this.ubah();
			break;			
		
		case "hapus" :
			try
			{	
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update depo_m set no_del = 'DEL' where no_depo ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}
				else
				{
					sql.add(" delete from depo_m where no_depo ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}			
			break;
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "") 
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'depo_m','no_depo',this.app._lokasi+"-DPS"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.doEditChange = function(sender)
{
	if ((sender == this.cb_akun) && (this.cb_akun.getText() != ""))
	{
		this.akunkb = sender.dataFromList[2];
	}
	if ((sender == this.cb_cbunga) && (this.cb_cbunga.getText() != ""))
	{
		this.akuncbunga = sender.dataFromList[2];
	}
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		this.ed_nodepo.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_curr)
	{
		this.cb_akun.setText("");
		if (this.cb_curr.getText() == "IDR")
		{	
			this.ed_kurs.setText("1");
			this.ed_kurs.setReadOnly(true);
		}
		else
		{
			this.ed_kurs.setReadOnly(false);
		}
	}	
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.showClick = function(sender)
{
	try
	{
		if (this.cb_akun.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select nama,no_rek,nama_rek from bank2 where kode_bank = '"+this.cb_akun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_basal.setText(line.get("nama"));
					this.ed_rekasal.setText(line.get("no_rek"));
					this.ed_anasal.setText(line.get("nama_rek"));
				} 
			}
		}

		if (this.cb_cbunga.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select nama,no_rek,nama_rek from bank2 where kode_bank = '"+this.cb_cbunga.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_bbunga.setText(line.get("nama"));
					this.ed_rekbunga.setText(line.get("no_rek"));
					this.ed_anbunga.setText(line.get("nama_rek"));
				} 
			}
		}
	} catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.loadClick = function(sender)
{
	try 
	{
		if (this.cb_bukti.getText() != "")
		{
			if (this.cb_bukti != undefined) {
				try 
				{
					this.standarLib.clearByTag(this,["1","2","3"],undefined);				
					var line,data = this.dbLib.runSQL(" select  a.no_dokumen, a.keterangan, a.bank, a.cabang, a.rate, a.basis, a.due_date, a.kode_curr, a.kurs, a.akun_depo, a.akun_kb, a.akun_cbunga,a.akun_ar,a.akun_pdpt,a.nik_buat,a.nik_setuju, "+
					                                  "         b.nama as nama_depo,c.nama as nama_akunbank,d.nama as nama_bunga,e.nama as nama_ar,f.nama as nama_pdpt,"+
													  "         g.nama as nama_buat,h.nama as nama_app, "+
													  "         a.tgl_just,a.jam,a.pic_bank,a.pic_karyawan,a.jk_waktu,a.catatan,a.periode,a.nilai , a.kode_bank,a.kode_bankcbunga, bb.nama as nama_bank, cc.nama as nama_bankcbunga "+
													  " from depo_m a "+
													  "               inner join masakun b on a.akun_depo = b.kode_akun and a.kode_lokasi = b.kode_lokasi "+
													  "               inner join masakun c on a.akun_kb = c.kode_akun and a.kode_lokasi = c.kode_lokasi "+
													  "               inner join masakun d on a.akun_cbunga = d.kode_akun and a.kode_lokasi = d.kode_lokasi "+
													  "               inner join masakun e on a.akun_ar = e.kode_akun and a.kode_lokasi = e.kode_lokasi "+
													  "               inner join masakun f on a.akun_pdpt = f.kode_akun and a.kode_lokasi = f.kode_lokasi "+
													  "               inner join karyawan g on a.nik_buat = g.nik and a.kode_lokasi=g.kode_lokasi "+
													  "               inner join karyawan h on a.nik_setuju = h.nik and a.kode_lokasi=h.kode_lokasi "+
													  "               inner join bankcab aa on a.bank = aa.kode_cab and a.kode_lokasi=aa.kode_lokasi "+
													  "               inner join bank2 bb on a.kode_bank = bb.kode_bank and a.kode_lokasi=bb.kode_lokasi "+
													  "               inner join bank2 cc on a.kode_bankcbunga = cc.kode_bank and a.kode_lokasi=cc.kode_lokasi "+
													  " where a.no_depo='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							line = data.get(0);
							this.periodeLama = line.get("periode");
							this.ed_dok.setText(line.get("no_dokumen"));
							this.ed_desc.setText(line.get("keterangan"));
							this.ed_bank.setText(line.get("bank"));
							this.ed_cabang.setText(line.get("cabang"));
							this.ed_bunga.setText(floatToNilai(parseFloat(line.get("rate"))));
							this.ed_basis.setText(floatToNilai(parseFloat(line.get("basis"))));
							this.dp_tgl2.setText(line.get("due_date"));
							this.cb_curr.setText(line.get("kode_curr"));
							this.ed_kurs.setText(line.get("kurs"));
							this.cb_akundepo.setText(line.get("akun_depo"));
							this.cb_akundepo.setRightLabelCaption(line.get("nama_depo"));
							/*
							this.cb_akun.setText(line.get("akun_kb"));
							this.cb_akun.setRightLabelCaption(line.get("nama_bank"));
							this.cb_cbunga.setText(line.get("akun_cbunga"));
							this.cb_cbunga.setRightLabelCaption(line.get("nama_bunga"));
							*/
							this.akunkb = line.get("akun_kb");
							this.akuncbunga = line.get("akun_cbunga");
							
							this.cb_akun.setText(line.get("kode_bank"));
							this.cb_akun.setRightLabelCaption(line.get("nama_bank"));
							this.cb_cbunga.setText(line.get("kode_bankcbunga"));
							this.cb_cbunga.setRightLabelCaption(line.get("nama_bankcbunga"));
							
							this.cb_ar.setText(line.get("akun_ar"));
							this.cb_ar.setRightLabelCaption(line.get("nama_ar"));
							this.cb_pdpt.setText(line.get("akun_pdpt"));
							this.cb_pdpt.setRightLabelCaption(line.get("nama_pdpt"));
							this.cb_buat.setText(line.get("nik_buat"));
							this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
							this.cb_setuju.setText(line.get("nik_setuju"));
							this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
							this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
							
							this.dp_tgl3.setText(line.get("tgl_just"));
							this.ed_jam.setText(line.get("jam"));
							this.ed_pic1.setText(line.get("pic_bank"));
							this.ed_pic2.setText(line.get("pic_karyawan"));
							this.ed_waktu.setText(line.get("jk_waktu"));
							this.ed_nomor.setText(line.get("catatan"));
							
							this.bShow.click();
						} 
					}					
				} catch(e)
				{
					system.alert(this,e,"");
				}
			}
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_bank) 
		{
			this.standarLib.showListData(this, "Data Cabang Bank",this.ed_bank,this.ed_cabang, 
										  "select kode_cab, cabang  from bankcab where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_cab) from bankcab where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_cab","cabang"],"and",["Kode Cabang","Deskripsi"],false);
		}
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Pengajuan Deposito",this.cb_bukti,undefined, 
				  								 "select no_depo, keterangan from depo_m where modul = 'DEPO_P' and progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_depo)      from depo_m where modul = 'DEPO_P' and progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_depo","keterangan"],"and",["No Deposito","Keterangan"],false);
			}
			this.standarLib.clearByTag(this,["1","2","3"],undefined);		
		}
		if (sender == this.cb_ar) 
		{		    
			this.standarLib.showListData(this, "Daftar Akun Piutang Bunga",this.cb_ar,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='018' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='018' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_pdpt) 
		{		    
			this.standarLib.showListData(this, "Daftar Akun Pendpatan Bunga",this.cb_pdpt,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_cbunga) 
		{		    
			/*
			this.standarLib.showListData(this, "Daftar Akun Bank untuk Bunga",this.cb_cbunga,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			*/
			this.standarLib.showListData2(this, "Daftar Rekening Bank untuk Bunga",sender,undefined, 
										  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			this.standarLib.clearByTag(this, new Array("3"),undefined);				
		}
		if (sender == this.cb_akundepo) 
		{
			this.standarLib.showListData(this, "Daftar Akun Deposito",this.cb_akundepo,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='012' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='012' ",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_akun) 
		{
			/*
			this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag in ('001','009') and a.kode_curr='"+this.cb_curr.getText()+"'",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag in ('001','009') and a.kode_curr='"+this.cb_curr.getText()+"'",
									  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);			
			*/
			this.standarLib.showListData2(this, "Daftar Rekening Bank",sender,undefined, 
										  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			this.standarLib.clearByTag(this, new Array("2"),undefined);				
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepotmpk.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :
    				step="info";
				if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.nb +")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
      		break;
    		}    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};