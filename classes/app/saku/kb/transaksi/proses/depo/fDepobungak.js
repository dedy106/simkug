window.app_saku_kb_transaksi_proses_depo_fDepobungak = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_depo_fDepobungak";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Bunga Deposito: Koreksi", 0);	

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
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Terima BuDep");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(700);
		this.cb_perlama.setTop(32);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(700);
		this.cb_bukti.setTop(56);
		this.cb_bukti.setWidth(205);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Terima Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(56);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(78);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(100);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.cb_nodepo = new portalui_saiCBBL(this);
		this.cb_nodepo.setLeft(20);
		this.cb_nodepo.setTop(122);
		this.cb_nodepo.setWidth(250);
		this.cb_nodepo.setLabelWidth(100);
		this.cb_nodepo.setReadOnly(true);
		this.cb_nodepo.setRightLabelVisible(false);
		this.cb_nodepo.setCaption("No Deposito");
		
		this.ed_bilyet = new portalui_saiLabelEdit(this);
		this.ed_bilyet.setLeft(20);
		this.ed_bilyet.setTop(144);
		this.ed_bilyet.setWidth(230);
		this.ed_bilyet.setCaption("No Bilyet");
		this.ed_bilyet.setReadOnly(true);
		this.ed_bilyet.setLength(50);
		this.ed_bilyet.setTag("1");
		
		this.ed_bank = new portalui_saiLabelEdit(this);
		this.ed_bank.setLeft(20);
		this.ed_bank.setTop(166);
		this.ed_bank.setWidth(185);
		this.ed_bank.setCaption("Bank - Cabang");
		this.ed_bank.setReadOnly(true);
		this.ed_bank.setLength(50);
		this.ed_bank.setTag("1");
		
		this.ed_cabang = new portalui_saiLabelEdit(this);
		this.ed_cabang.setLeft(210);
		this.ed_cabang.setTop(166);
		this.ed_cabang.setWidth(310);
		this.ed_cabang.setLabelWidth(0);
		this.ed_cabang.setReadOnly(true);
		this.ed_cabang.setLength(50);
		this.ed_cabang.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(188);
		this.ed_nilai.setWidth(230);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Deposito");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("1");
		
		this.ed_basis = new portalui_saiLabelEdit(this);
		this.ed_basis.setLeft(370);
		this.ed_basis.setTop(188);
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
		this.cb_curr.setTop(210);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(true);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(210);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.ed_bunga = new portalui_saiLabelEdit(this);
		this.ed_bunga.setLeft(370);
		this.ed_bunga.setTop(210);
		this.ed_bunga.setWidth(150);
		this.ed_bunga.setTipeText(ttNilai);
		this.ed_bunga.setAlignment(alRight);
		this.ed_bunga.setCaption("Rate [%/Tahun]");
		this.ed_bunga.setText("0"); 
		this.ed_bunga.setReadOnly(true);
		this.ed_bunga.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(232);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Rek. KasBank");
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_sls = new portalui_saiCBBL(this);
		this.cb_sls.setLeft(20);
		this.cb_sls.setTop(254);
		this.cb_sls.setWidth(185);
		this.cb_sls.setLabelWidth(100);
		this.cb_sls.setReadOnly(true);
		this.cb_sls.setRightLabelVisible(true);
		this.cb_sls.setCaption("Akun Selisih");
		this.cb_sls.setRightLabelCaption("");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(276);
		this.cb_pp.setWidth(185);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setRightLabelCaption("");	
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(298);
		this.cb_drk.setWidth(185);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setText(""); 
		this.cb_drk.setRightLabelCaption("");	
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(320);
		this.cb_buat.setWidth(185);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(342);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");

		this.ed_ncair = new portalui_saiLabelEdit(this);
		this.ed_ncair.setLeft(700);
		this.ed_ncair.setTop(254);
		this.ed_ncair.setWidth(220);
		this.ed_ncair.setTipeText(ttNilai);
		this.ed_ncair.setAlignment(alRight);
		this.ed_ncair.setCaption("Netto Penerimaan");
		this.ed_ncair.setText("0"); 
		this.ed_ncair.setReadOnly(false);
		this.ed_ncair.setTag("1");
		
		this.ed_npph = new portalui_saiLabelEdit(this);
		this.ed_npph.setLeft(700);
		this.ed_npph.setTop(276);
		this.ed_npph.setWidth(220);
		this.ed_npph.setTipeText(ttNilai);
		this.ed_npph.setAlignment(alRight);
		this.ed_npph.setCaption("Nilai Beban PPh");
		this.ed_npph.setText("0"); 
		this.ed_npph.setReadOnly(false);
		this.ed_npph.setTag("1");
		
		this.ed_nadm = new portalui_saiLabelEdit(this);
		this.ed_nadm.setLeft(700);
		this.ed_nadm.setTop(298);
		this.ed_nadm.setWidth(220);
		this.ed_nadm.setTipeText(ttNilai);
		this.ed_nadm.setAlignment(alRight);
		this.ed_nadm.setCaption("Nilai Biaya Adm");
		this.ed_nadm.setText("0"); 
		this.ed_nadm.setReadOnly(false);
		this.ed_nadm.setTag("1");
		
		this.ed_nsls = new portalui_saiLabelEdit(this);
		this.ed_nsls.setLeft(700);
		this.ed_nsls.setTop(320);
		this.ed_nsls.setWidth(220);
		this.ed_nsls.setTipeText(ttNilai);
		this.ed_nsls.setAlignment(alRight);
		this.ed_nsls.setCaption("Nilai Selisih");
		this.ed_nsls.setText("0"); 
		this.ed_nsls.setReadOnly(true);
		this.ed_nsls.setTag("1");
		
		this.ed_nbunga = new portalui_saiLabelEdit(this);
		this.ed_nbunga.setLeft(700);
		this.ed_nbunga.setTop(342);
		this.ed_nbunga.setWidth(220);
		this.ed_nbunga.setTipeText(ttNilai);
		this.ed_nbunga.setAlignment(alRight);
		this.ed_nbunga.setCaption("Total Akru");
		this.ed_nbunga.setText("0"); 
		this.ed_nbunga.setReadOnly(true);
		this.ed_nbunga.setTag("1");
		
		this.ed_jhari = new portalui_saiLabelEdit(this);
		this.ed_jhari.setLeft(580);
		this.ed_jhari.setTop(342);
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
	    this.p1.setTop(364);
	    this.p1.setWidth(900);
	    this.p1.setHeight(110);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Akru Deposito');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(80);
		this.sg1.setTag("2");
		this.sg1.setColTitle(["No","No Akru","Tgl Penempatan","Tgl Jth Tempo","Tgl Akru","Akun Piutang","Nama Akun","Jml Hari","Nilai Akru"]);
		
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
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_sls.onBtnClick.set(this, "FindBtnClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.ed_ncair.onChange.set(this, "doEditChange2");
			this.ed_nadm.onChange.set(this, "doEditChange2");
			this.ed_npph.onChange.set(this, "doEditChange2");
			
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
				
			this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			this.sg1.clearAll();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepobungak.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.ubah = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this,["0","1"]))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update depo_d set no_del = 'DEL' where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" update depo_d_d set progress = 'X' where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from depo_d where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from depo_j where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
				sql.add(" delete from depo_d_d where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
				this.nb = this.cb_bukti.getText();
			}		
						
			sql.add("insert into depo_d (no_terima,no_kas,no_depo,kode_lokasi,tgl_cair,jml_hari,nilai,nilai_cair,nilai_pph,nilai_adm,nilai_sls,akun_kas,akun_sls,"+
			        "kode_pp,kode_drk,progress,modul,periode,posted,kode_curr,kurs,no_dokumen,keterangan,nik_buat,nik_setuju,nik_user,tgl_input,no_del,kode_bankcbunga) values "+
					"('"+this.nb+"','-','"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"',"+
					parseNilai(this.ed_jhari.getText())+","+parseNilai(this.ed_nbunga.getText())+","+parseNilai(this.ed_ncair.getText())+","+parseNilai(this.ed_npph.getText())+","+
					parseNilai(this.ed_nadm.getText())+","+
					parseNilai(this.ed_nsls.getText())+",'"+this.akuncbunga+"','"+this.cb_sls.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','0','DEPCB_P','"+
					this.ed_period.getText()+"','X','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.ed_dok.getText()+"','"+this.ed_desc.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._userLog+"',now(),'-','"+this.cb_akun.getText()+"')");
			
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{
				sql.add("update depo_akru_d set progress='1' where no_akru = '"+this.sg1.getCell(1,i)+"' and no_depo='"+this.cb_nodepo.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add("insert into depo_d_d (no_terima,no_depo,no_akru,kode_lokasi,progress) values ('"+this.nb+"','"+this.cb_nodepo.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.app._lokasi+"','1')");			
			}
			
			var scr1 =  "insert into depo_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
			var awal = true;
			var line = undefined;
			var j = 1;
			for (var i in this.gridJurnal.objList)
			{
				if (!awal) { scr1 += ",";}
				line = this.gridJurnal.get(i);
				j++;
				scr1 += "('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+line.get("kode_akun")+
					"','"+this.ed_desc.getText()+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'-','-',"+
					"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_P','AR',"+
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
				sql.add("insert into depo_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+this.cb_sls.getText()+
						"','"+this.ed_desc.getText()+"','"+DCsls+"',"+nsls+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_P','SLS',"+
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
				sql.add("insert into depo_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+akun_badm+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nadm.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_P','ADM',"+
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
				sql.add("insert into depo_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+akun_bpph+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_npph.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.cb_nodepo.getText()+"','"+this.app._lokasi+"','DEPCB_P','PPH',"+
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				this.sg1.clearAll();
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			}
			break;
			
		case "ubah" :
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
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{
				if ((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(4,i))) 
				{
					system.alert(this,"Tanggal transaksi kurang dari tanggal akru [baris "+i+"].","");
					return false;
				}
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
							
				for (var i=1; i <= this.sg1.getRowCount(); i++)
				{
					sql.add("update depo_akru_d set progress='0' where no_akru = '"+this.sg1.getCell(1,i)+"' and no_depo='"+this.cb_nodepo.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
				}
			
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update depo_d set no_del = 'DEL' where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" update depo_d_d set progress = 'X' where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
				}
				else
				{
					sql.add(" delete from depo_d where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from depo_j where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
					sql.add(" delete from depo_d_d where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
				}		
			
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;	
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "") 
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'depo_d','no_terima',this.app._lokasi+"-DCB"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.loadClick = function(sender)
{
	try 
	{		
		var line,data = this.dbLib.runSQL(" select a.no_dokumen, a.keterangan, a.no_depo, a.akun_kas, a.akun_sls, a.kode_pp,a.kode_drk, a.nik_buat,a.nik_setuju, "+
										  "        a.nilai,a.nilai_cair,a.nilai_pph,a.nilai_adm,a.nilai_sls,a.kode_curr,a.kurs,a.jml_hari,a.periode,"+
										  "        b.no_dokumen as bilyet,b.nilai as nilai_depo, b.bank,b.cabang,b.rate,b.basis,c.nama as nama_kas,d.nama as nama_sls,e.nama as nama_pp,f.nama as nama_drk,g.nama as nama_buat,h.nama as nama_app,a.kode_bankcbunga,cc.nama as nama_bankcbunga "+
										  " from depo_d a inner join depo_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
										  "               inner join masakun c on a.akun_kas = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
										  "               inner join bank2 cc on a.kode_bankcbunga = cc.kode_bank and a.kode_lokasi=cc.kode_lokasi "+
										  "               inner join masakun d on a.akun_sls = d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
										  "               inner join pp e on a.kode_pp = e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
										  "               inner join drk f on a.kode_drk = f.kode_drk and a.kode_lokasi=f.kode_lokasi and f.tahun=substring(a.periode,1,4) "+
										  "               inner join karyawan g on a.nik_buat = g.nik and a.kode_lokasi=g.kode_lokasi "+
										  "               inner join karyawan h on a.nik_setuju = h.nik and a.kode_lokasi=h.kode_lokasi "+
										  " where a.no_terima = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
										  
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				this.ed_bank.setText(line.get("bank"));
				this.ed_cabang.setText(line.get("cabang"));
				this.ed_basis.setText(floatToNilai(line.get("basis")));
				this.ed_bunga.setText(floatToNilai(line.get("rate")));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(line.get("kurs")));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai_depo"))));
				this.ed_ncair.setText(floatToNilai(parseFloat(line.get("nilai_cair"))));
				this.ed_npph.setText(floatToNilai(parseFloat(line.get("nilai_pph"))));
				this.ed_nadm.setText(floatToNilai(parseFloat(line.get("nilai_adm"))));
				this.ed_nsls.setText(floatToNilai(parseFloat(line.get("nilai_sls"))));
				this.ed_jhari.setText(floatToNilai(parseFloat(line.get("jml_hari"))));
				
				//this.cb_akun.setText(line.get("akun_kas"));
				//this.cb_akun.setRightLabelCaption(line.get("nama_kas"));
				
				this.cb_akun.setText(line.get("kode_bankcbunga"));
				this.cb_akun.setRightLabelCaption(line.get("nama_bankcbunga"));
				this.akuncbunga = line.get("akun_kas");
				
				this.cb_sls.setText(line.get("akun_sls"));
				this.cb_sls.setRightLabelCaption(line.get("nama_sls"));
				this.cb_pp.setText(line.get("kode_pp"));
				this.cb_pp.setRightLabelCaption(line.get("nama_pp"));
				this.cb_drk.setText(line.get("kode_drk"));
				this.cb_drk.setRightLabelCaption(line.get("nama_drk"));
				this.cb_buat.setText(line.get("nik_buat"));
				this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_setuju"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
				this.cb_nodepo.setText(line.get("no_depo"));
				this.ed_bilyet.setText(line.get("bilyet"));
			} 
		}	
		
		this.sg1.clearAll();
		var data = this.dbLib.runSQL(" select a.no_akru,d.tanggal,d.due_date,cast((case when c.tanggal > d.due_date then d.due_date else c.tanggal end) as DATETIME) as tgl_akru,"+
									 " a.akun_ar,b.nama as nama_akun,a.jml_hari,a.nilai "+
									 " from depo_akru_d a inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                    inner join depo_akru_m c on a.no_akru=c.no_akru and a.kode_lokasi=c.kode_lokasi "+
									 "                    inner join depo_m d on a.no_depo=d.no_depo and a.kode_lokasi=d.kode_lokasi "+
									 "                    inner join depo_d_d e on a.no_akru = e.no_akru and e.no_depo=a.no_depo and a.kode_lokasi=e.kode_lokasi "+
									 " where e.no_terima ='"+this.cb_bukti.getText()+"' and e.progress='1' ");		

		if (data instanceof portalui_arrayMap)
		{
			this.sg1.setData(data);
			var tot = jml = 0;
			for (var i in data.objList)
			{
				if (parseFloat(data.get(i).get("nilai")) != 0)
					tot += parseFloat(data.get(i).get("nilai"));
				//if (parseFloat(data.get(i).get("jml_hari")) != 0)
					//jml += parseFloat(data.get(i).get("jml_hari"));
			}
			this.ed_nbunga.setText(floatToNilai(tot));
			//this.ed_ncair.setText(floatToNilai(tot));
			//this.ed_jhari.setText(floatToNilai(jml));
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.doEditChange2 = function(sender)
{		
	try
	{
		if ( (this.ed_ncair.getText() != undefined) && (this.ed_nbunga.getText() != undefined) && (this.ed_nadm.getText() != undefined) && (this.ed_npph.getText() != undefined) )
		    this.ed_nsls.setText(floatToNilai(parseFloat(nilaiToFloat(this.ed_ncair.getText()) + nilaiToFloat(this.ed_nadm.getText()) + nilaiToFloat(this.ed_npph.getText()) - nilaiToFloat(this.ed_nbunga.getText()))));
			//this.ed_nsls.setText(format_number(parseFloat(nilaiToFloat(this.ed_ncair.getText()) + nilaiToFloat(this.ed_nadm.getText()) + nilaiToFloat(this.ed_npph.getText()) - nilaiToFloat(this.ed_nbunga.getText())),2,',','.'));
	} catch(e)
	{
		alert(e);
	}
};	
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Penerimaan Bunga Deposito",this.cb_bukti,undefined, 
				  								 "select no_terima, keterangan from depo_d where modul = 'DEPCB_P' and progress = '0' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_terima)      from depo_d where modul = 'DEPCB_P' and progress = '0' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_terima","keterangan"],"and",["No Terima BuDep","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
			this.sg1.clearAll(); 
		}
		if (sender == this.cb_drk) 
		{   
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis_akun='Pendapatan'",
										  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis_akun='Pendapatan'",
										  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);	
		}
		if (sender == this.cb_pp) 
		{   
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and kode_pp='"+this.app._kodePP+"'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and kode_pp='"+this.app._kodePP+"'",
										  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
		}
		if (sender == this.cb_sls) 
		{
			this.standarLib.showListData(this, "Daftar Akun Pendapatan Bunga",this.cb_sls,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='017'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
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
window.app_saku_kb_transaksi_proses_depo_fDepobungak.prototype.doRequestReady = function(sender, methodName, result)
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