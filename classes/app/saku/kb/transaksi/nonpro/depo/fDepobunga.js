window.app_saku_kb_transaksi_nonpro_depo_fDepobunga = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_depo_fDepobunga";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Bunga Deposito [KB Masuk] Non Proses: Input", 0);	

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
		
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.addItem(0,"KAS");
		this.cb_jenis.addItem(1,"BANK");
		this.cb_jenis.setReadOnly(true);
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No KasBank");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(122);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(290);
		this.ed_giro.setTop(122);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("9");
		
		this.cb_nodepo = new portalui_saiCBBL(this);
		this.cb_nodepo.setLeft(20);
		this.cb_nodepo.setTop(144);
		this.cb_nodepo.setWidth(250);
		this.cb_nodepo.setCaption("No Deposito");
		this.cb_nodepo.setReadOnly(true);
		this.cb_nodepo.setLabelWidth(100);
		this.cb_nodepo.setRightLabelVisible(false);
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(268);
		this.bShow.setTop(144);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_bilyet = new portalui_saiLabelEdit(this);
		this.ed_bilyet.setLeft(20);
		this.ed_bilyet.setTop(166);
		this.ed_bilyet.setWidth(230);
		this.ed_bilyet.setCaption("No Dokumen Dep.");
		this.ed_bilyet.setReadOnly(true);
		this.ed_bilyet.setLength(50);
		this.ed_bilyet.setTag("1");
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(188);
		this.ed_bank.setWidth(185);
		this.ed_bank.setCaption("Bank - Cabang");
		this.ed_bank.setReadOnly(true);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(210);
		this.ed_cabang.setTop(188);
		this.ed_cabang.setWidth(310);
		this.ed_cabang.setLabelWidth(0);
		this.ed_cabang.setReadOnly(true);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(210);
		this.ed_nilai.setWidth(230);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Deposito");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("1");
		
		this.ed_basis = new portalui_saiLabelEdit(this);
		this.ed_basis.setLeft(370);
		this.ed_basis.setTop(210);
		this.ed_basis.setWidth(150);
		this.ed_basis.setLabelWidth(100);
		this.ed_basis.setTipeText(ttNilai);
		this.ed_basis.setAlignment(alRight);
		this.ed_basis.setCaption("Basis [Hari]");
		this.ed_basis.setText("0"); 
		this.ed_basis.setReadOnly(true);
		this.ed_basis.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(232);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(true);
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(232);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.ed_bunga = new portalui_saiLabelEdit(this);
		this.ed_bunga.setLeft(370);
		this.ed_bunga.setTop(232);
		this.ed_bunga.setWidth(150);
		this.ed_bunga.setTipeText(ttNilai);
		this.ed_bunga.setAlignment(alRight);
		this.ed_bunga.setCaption("Rate [%/Tahun]");
		this.ed_bunga.setText("0"); 
		this.ed_bunga.setReadOnly(true);
		this.ed_bunga.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(254);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun KasBank");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_sls = new portalui_saiCBBL(this);
		this.cb_sls.setLeft(20);
		this.cb_sls.setTop(276);
		this.cb_sls.setWidth(185);
		this.cb_sls.setCaption("Akun Selisih");
		this.cb_sls.setReadOnly(true);
		this.cb_sls.setLabelWidth(100);
		this.cb_sls.setRightLabelVisible(true);
		this.cb_sls.setRightLabelCaption("");
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(298);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(320);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");

		this.ed_ncair = new portalui_saiLabelEdit(this);
		this.ed_ncair.setLeft(700);
		this.ed_ncair.setTop(232);
		this.ed_ncair.setWidth(220);
		this.ed_ncair.setTipeText(ttNilai);
		this.ed_ncair.setAlignment(alRight);
		this.ed_ncair.setCaption("Netto Penerimaan");
		this.ed_ncair.setText("0"); 
		this.ed_ncair.setReadOnly(false);
		this.ed_ncair.setTag("1");
		
		this.ed_npph = new portalui_saiLabelEdit(this);
		this.ed_npph.setLeft(700);
		this.ed_npph.setTop(254);
		this.ed_npph.setWidth(220);
		this.ed_npph.setTipeText(ttNilai);
		this.ed_npph.setAlignment(alRight);
		this.ed_npph.setCaption("Nilai Beban PPh");
		this.ed_npph.setText("0"); 
		this.ed_npph.setReadOnly(false);
		this.ed_npph.setTag("1");
		
		this.ed_nadm = new portalui_saiLabelEdit(this);
		this.ed_nadm.setLeft(700);
		this.ed_nadm.setTop(276);
		this.ed_nadm.setWidth(220);
		this.ed_nadm.setTipeText(ttNilai);
		this.ed_nadm.setAlignment(alRight);
		this.ed_nadm.setCaption("Nilai Biaya Adm");
		this.ed_nadm.setText("0"); 
		this.ed_nadm.setReadOnly(false);
		this.ed_nadm.setTag("1");
		
		this.ed_nsls = new portalui_saiLabelEdit(this);
		this.ed_nsls.setLeft(700);
		this.ed_nsls.setTop(298);
		this.ed_nsls.setWidth(220);
		this.ed_nsls.setTipeText(ttNilai);
		this.ed_nsls.setAlignment(alRight);
		this.ed_nsls.setCaption("Nilai Selisih");
		this.ed_nsls.setText("0"); 
		this.ed_nsls.setReadOnly(true);
		this.ed_nsls.setTag("1");
		
		this.ed_nbunga = new portalui_saiLabelEdit(this);
		this.ed_nbunga.setLeft(700);
		this.ed_nbunga.setTop(320);
		this.ed_nbunga.setWidth(220);
		this.ed_nbunga.setTipeText(ttNilai);
		this.ed_nbunga.setAlignment(alRight);
		this.ed_nbunga.setCaption("Total Akru");
		this.ed_nbunga.setText("0"); 
		this.ed_nbunga.setReadOnly(true);
		this.ed_nbunga.setTag("1");
		
		this.ed_jhari = new portalui_saiLabelEdit(this);
		this.ed_jhari.setLeft(580);
		this.ed_jhari.setTop(320);
		this.ed_jhari.setWidth(100);
		this.ed_jhari.setTipeText(ttNilai);
		this.ed_jhari.setAlignment(alRight);
		this.ed_jhari.setLabelWidth(50);
		this.ed_jhari.setCaption("Jml Hari");
		this.ed_jhari.setText("0"); 
		this.ed_jhari.setReadOnly(true);
		this.ed_jhari.setTag("1");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(342);
	    this.p1.setWidth(900);
	    this.p1.setHeight(125);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Akru Deposito');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(100);
		this.sg1.setTag("2");
		this.sg1.setColTitle(["No","No Akru","Tgl Penempatan","Tgl Jth Tempo","Tgl Akru","Akun Piutang","Nama Akun","Jml Hari","Nilai Akru"]);
		
		setTipeButton(tbSimpan);
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
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_nodepo.onBtnClick.set(this, "FindBtnClick");
			this.cb_sls.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.ed_ncair.onChange.set(this, "doEditChange2");
			this.ed_nadm.onChange.set(this, "doEditChange2");
			this.ed_npph.onChange.set(this, "doEditChange2");
			
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clearAll();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.simpan = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("insert into depo_d (no_kas,no_terima,no_depo,kode_lokasi,tgl_cair,jml_hari,nilai,nilai_cair,nilai_pph,nilai_adm,nilai_sls,akun_kas,akun_sls,"+
			        "                    kode_pp,kode_drk,progress,modul,periode,posted,kode_curr,kurs,no_dokumen,keterangan,nik_buat,nik_setuju,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','-','"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"',"+
					parseNilai(this.ed_jhari.getText())+","+parseNilai(this.ed_nbunga.getText())+","+parseNilai(this.ed_ncair.getText())+","+parseNilai(this.ed_npph.getText())+","+
					parseNilai(this.ed_nadm.getText())+","+
					parseNilai(this.ed_nsls.getText())+",'"+this.cb_akun.getText()+"','"+this.cb_sls.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
					"'2','DEPCB_NP','"+this.ed_period.getText()+"','X','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.ed_dok.getText()+"','"+this.ed_desc.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._userLog+"',now())");
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{
				sql.add("update depo_akru_d set progress='1' where no_akru = '"+this.sg1.getCell(1,i)+"' and no_depo='"+this.cb_nodepo.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
			}

			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','DEPCB_NP','"+this.cb_jenis.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nbunga.getText())+",'-','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_nodepo.getText()+"')");
			
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
					"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
					"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_ncair.getText())+",'-','-',"+
					"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_NP','KAS',"+
					"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())");
			
			var scr1 =  "insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
			var awal = true;
			var line = undefined;
			var j = 1;
			for (var i in this.gridJurnal.objList)
			{
				if (!awal) { scr1 += ",";}
				line = this.gridJurnal.get(i);
				j++;
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+line.get("kode_akun")+
					"','"+this.ed_desc.getText()+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'-','-',"+
					"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_NP','AR',"+
					"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())";
				awal = false;
			}
			sql.add(scr1);
			
			if (this.ed_nsls.getText != '0') 
			{
				if (nilaiToFloat(this.ed_nsls.getText()) < 0)
				{
					var DCsls = 'D';
					var nsls = nilaiToFloat(this.ed_nsls.getText()) * -1;
				}
				else
				{
					var DCsls = 'C';
					var nsls = nilaiToFloat(this.ed_nsls.getText());
				}
				j++;
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+this.cb_sls.getText()+
						"','"+this.ed_desc.getText()+"','"+DCsls+"',"+nsls+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_NP','SLS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			
			if (this.ed_nadm.getText != '0') 
			{	
				data = this.dbLib.runSQL("select flag from spro where kode_spro = 'BYADM' and kode_lokasi='"+this.app._lokasi+"'");
				var row = undefined;
				row = data.get(0);
				var akun_badm = row.get("flag");
			
				j++;
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+akun_badm+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nadm.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_NP','ADM',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			if (this.ed_npph.getText != '0') 
			{
				data = this.dbLib.runSQL("select flag from spro where kode_spro = 'BYPPHDEP' and kode_lokasi='"+this.app._lokasi+"'");
				var row = undefined;
				row = data.get(0);
				var akun_bpph = row.get("flag");
				j++;
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+akun_bpph+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_npph.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_NP','PPH',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				this.sg1.clearAll();
			}
			break;
			
		case "simpan" :
		    for (var i=1; i <= this.sg1.getRowCount(); i++)
			{
				if ((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(4,i))) 
				{
					system.alert(this,"Tanggal transaksi kurang dari tanggal akru [baris "+i+"].","");
					return false;
				}
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}		
			if (nilaiToFloat(this.ed_nbunga.getText()) <= 0) 
			{
				system.alert(this,"Nilai pencairan bunga tidak valid.","Nilai pencairan bunga tidak boleh nol atau kurang.");
				return false;
			}
			
			var nsls2 = nilaiToFloat(this.ed_nsls.getText()) * -1;
			if (   nilaiToFloat(this.ed_nbunga.getText()) != ( nilaiToFloat(this.ed_ncair.getText()) + nsls2 + nilaiToFloat(this.ed_nadm.getText()) + nilaiToFloat(this.ed_npph.getText()) )  ) 
			{
				system.alert(this,"Nilai pencairan bunga tidak valid.","Nilai jurnal pencairan bunga tidak balance.");
				return false;
			}			
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}
			else this.simpan();
			break;
			
		case "simpancek" : this.simpan();
			break;			
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.genClick = function(sender)
{
	try
	{
		if ((this.ed_period.getText() != "") && (this.jenis != undefined))
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode dan jenis kasbank harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.showClick = function(sender)
{
	try 
	{
		var line,data = this.dbLib.runSQL(" select a.bank,a.cabang,a.rate,a.basis,a.kode_curr,a.kurs,a.akun_cbunga,a.nilai,a.no_dokumen,b.nama as nama_akun "+
										  " from depo_m a inner join masakun b on a.akun_cbunga=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  " where a.no_depo = '"+this.cb_nodepo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='2'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_bilyet.setText(line.get("no_dokumen"));
				this.ed_bank.setText(line.get("bank"));
				this.ed_cabang.setText(line.get("cabang"));
				this.ed_basis.setText(floatToNilai(line.get("basis")));
				this.ed_bunga.setText(floatToNilai(line.get("rate")));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(line.get("kurs")));
				this.cb_akun.setText(line.get("akun_cbunga"));
				this.cb_akun.setRightLabelCaption(line.get("nama_akun"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
			} 
		}	
		
		this.sg1.clearAll();
		var data = this.dbLib.runSQL(" select a.no_akru,d.tanggal,d.due_date,cast((case when c.tanggal > d.due_date then d.due_date else c.tanggal end) as DATETIME) as tgl_akru,"+
									 " a.akun_ar,b.nama as nama_akun,a.jml_hari,a.nilai "+
									 " from depo_akru_d a inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                    inner join depo_akru_m c on a.no_akru=c.no_akru and a.kode_lokasi=c.kode_lokasi "+
									 "                    inner join depo_m d on a.no_depo=d.no_depo and a.kode_lokasi=d.kode_lokasi "+
									 " where a.no_depo ='"+this.cb_nodepo.getText()+"' and a.progress='0' and c.no_del='-'");		
		
		if (data instanceof portalui_arrayMap)
		{
			this.sg1.setData(data);
			var tot = jml = 0;
			for (var i in data.objList)
			{
				if (parseFloat(data.get(i).get("nilai")) != 0)
					tot += parseFloat(data.get(i).get("nilai"));
				if (parseFloat(data.get(i).get("jml_hari")) != 0)
					jml += parseFloat(data.get(i).get("jml_hari"));
			}
			this.ed_nbunga.setText(floatToNilai(tot));
			this.ed_ncair.setText(floatToNilai(tot));
			this.ed_jhari.setText(floatToNilai(jml));
		
		}else alert(rs);
		
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var dtJrnl = 0;
		var line = undefined;
		
		for (var i in this.sg1.data.objList)
		{
			line = this.sg1.data.get(i);
			kdAkun = this.sg1.data.get(i).get("akun_ar");			
			
			nemu = false;
			ix = 0;				
			for (var j in dtJurnal.objList)
			{		
			  if (kdAkun == dtJurnal.get(j).get("kode_akun"))
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("dc","C");
				row.set("keterangan",this.ed_desc.getText());
				row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai")));
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai")));				
			}
		}
		this.gridJurnal = dtJurnal; 		
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
/*
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.hitungClick = function(sender)
{
	try 
	{
		if ( (new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.dp_tgl2.getDate()))
		{
			system.alert(this,"Tanggal pencairan bunga tidak valid.","Tanggal pencairan kurang tanggal terakhir penerimaan.");
			return false;
		}
		else
		{
			var d1 = (new Date()).strToDate(this.dp_tgl1.getDate());
			var d2 = (new Date()).strToDate(this.dp_tgl2.getDate());
			this.ed_jhari.setText(floatToNilai(d1.DateDiff(d2)));					
			
			this.ed_nbunga.setText(format_number(parseFloat(nilaiToFloat(this.ed_jhari.getText()) * nilaiToFloat(this.ed_bunga.getText()) / 100 / nilaiToFloat(this.ed_basis.getText()) * nilaiToFloat(this.ed_nilai.getText())),2,',','.'));
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
*/	
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.doEditChange2 = function(sender)
{		
	try
	{
		if ( (this.ed_ncair.getText() != undefined) && (this.ed_nbunga.getText() != undefined) && (this.ed_nadm.getText() != undefined) && (this.ed_npph.getText() != undefined) )
			this.ed_nsls.setText(format_number(parseFloat(nilaiToFloat(this.ed_ncair.getText()) + nilaiToFloat(this.ed_nadm.getText()) + nilaiToFloat(this.ed_npph.getText()) - nilaiToFloat(this.ed_nbunga.getText())),2,',','.'));
	} catch(e)
	{
		alert(e);
	}
};	
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_jenis)
	{
		this.ed_nb.setText("");
		if (this.cb_jenis.getText() == "KAS")
		{
			this.jenis = "BKM";
		}
		if (this.cb_jenis.getText() == "BANK")
		{
			this.jenis = "BBM";
		}
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
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_sls) 
		{
			this.standarLib.showListData(this, "Daftar Akun Pendapatan Bunga",this.cb_sls,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
		}
		
		if (sender == this.cb_nodepo) 
		{
			this.standarLib.showListData(this, "Daftar Deposito",this.cb_nodepo,undefined, 
										  "select no_depo, keterangan  from depo_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='DEPO_NP' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_depo)       from depo_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='DEPO_NP' and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_depo","keterangan"),"and",new Array("No Deposito","Keterangan"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);  
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepobunga.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
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