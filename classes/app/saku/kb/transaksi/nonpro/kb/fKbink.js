window.app_saku_kb_transaksi_nonpro_kb_fKbink = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_kb_fKbink";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kas Bank Masuk Non Proses : Koreksi", 0);
		
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
		
		uses("portalui_datePicker;util_dbLarge;app_saku_fJurnalViewer");	
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
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(700);
		this.cb_perlama.setTop(56);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(700);
		this.cb_bukti.setTop(78);
		this.cb_bukti.setWidth(205);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No KB Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(78);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(122);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("2");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(122);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("2");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(290);
		this.ed_dok.setTop(122);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(144);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Rek. KasBank");
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);	
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(20);
		this.ed_giro.setTop(188);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("9");
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(700);
		this.ed_debet.setTop(144);
		this.ed_debet.setWidth(220);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);
		this.ed_debet.setTag("2");

		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(700);
		this.ed_kredit.setTop(166);
		this.ed_kredit.setWidth(220);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);
		this.ed_kredit.setTag("2");

		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(188);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai KasBank");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");

	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(210);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Peruntukan KasBank');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(11);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM","Kode Bank","Nama Bank"]);
		this.sg1.setColWidth([10,9,8,7,6,5,4,3,2,1,0],[100,80,180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");	
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(10).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_akun.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doCellExit");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%' "+
				" union "+
				"select distinct periode from kas_m where periode >'"+this.app._periode+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
				
			this.standarLib.clearByTag(this,["0","2","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.cb_pembuat.setText(this.app._userLog, this.app._namaUser);
			this.cb_pembuat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.dbLarge = new util_dbLarge();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.mainButtonClick = function(sender)
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

window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.ubah = function()
{
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Nilai KasBank tidak valid.","Nilai tidak boleh nol atau kurang");
		return false;
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)) 
			{
				sql.add("update kas_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
						"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
						"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
						"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
				
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
						"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
						"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
						"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
				
				sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
						"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add("delete from kas_j where no_kas='"+this.cb_bukti.getText()+"'");
				sql.add("delete from kas_m where no_kas='"+this.cb_bukti.getText()+"'");
				sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'KBINP'");			
				this.nb = this.cb_bukti.getText();
			}
			
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
					"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','KBI_NP','"+this.cb_jenis.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
			
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
					"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
					"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'-','-','-','"+this.app._lokasi+"','KBI_NP','KAS',"+
					"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
			
			var j = 0;
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (this.sg1.rowValid(i)){
					j++;
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'-','"+this.app._lokasi+"','KBI_NP','-','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now(),'"+this.sg1.getCell(9,i)+"')");
						
					sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+	
							"('"+this.nb+"','KBINP','"+this.app._lokasi+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"','"+
							this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+this.sg1.getCell(3,i)+"',0,"+parseNilai(this.sg1.getCell(4,i))+")");
				}
			}
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	this.formEvent = event;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","2","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear();  this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
			
		case "ubah" :
			/*if (this.posted == "T")
			{
				system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
				return false;
			}*/
			if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
			{
				system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
				return false;
			}
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
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","2"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					
					/*
					if (this.posted == "T")
					{
						system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
						return false;
					}
					*/
					if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
					{
						system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
						return false;
					}
					if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)) 
					{
						sql.add("update kas_m set no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
								"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
								"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
						
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
								"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
								"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
								"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
								"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
								"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					}
					else
					{
						sql.add("delete from kas_j where no_kas='"+this.cb_bukti.getText()+"'");
						sql.add("delete from kas_m where no_kas='"+this.cb_bukti.getText()+"'");
						sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'KBINP'");			
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;			
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.genClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doEditChange = function(sender)
{
	if ((sender == this.cb_akun) && (this.cb_akun.getText() != ""))
	{
		this.akunkb = sender.dataFromList[2];
	}
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
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		if (this.cb_bukti != undefined) {
			try 
			{
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				var line, liem , data = this.dbLib.runSQL(" select  a.jenis,a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_buat, b.nama as nama_pembuat, a.akun_kb,a.no_bg,a.periode,d.nama as nama_akun,a.posted,a.kode_bank,cc.nama as nama_bank "+
											 " from kas_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi = b.kode_lokasi "+
											 "              inner join masakun d on a.akun_kb = d.kode_akun and a.kode_lokasi = d.kode_lokasi "+
											 "              inner join bank2 cc on a.kode_bank = cc.kode_bank and a.kode_lokasi = cc.kode_lokasi "+
											 " where a.no_kas='"+this.cb_bukti.getText()+"' and a.posted = 'F' and a.kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.posted = line.get("posted");
						this.periodeLama = line.get("periode");
						this.cb_jenis.setText(line.get("jenis"));
						this.ed_giro.setText(line.get("no_bg"));
						this.ed_dok.setText(line.get("no_dokumen"));
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.ed_kurs.setText(line.get("kurs"));
						this.cb_pembuat.setText(line.get("nik_buat"));
						this.cb_pembuat.setRightLabelCaption(line.get("nama_pembuat"));
						this.akunkb = line.get("akun_kb");
						this.cb_akun.setText(line.get("kode_bank"));
						this.cb_akun.setRightLabelCaption(line.get("nama_bank"));
						
					} 
				}

				this.sg1.clear(); 				
				var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_drk,ifnull(d.nama,'-') as nama_drk, ifnull(a.kode_bank,'-') as kode_bank, ifnull(cc.nama,'-') as nama_bank "+
								 " from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "              left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
								 "              left outer join bank2 cc on a.kode_bank=cc.kode_bank and a.kode_lokasi=cc.kode_lokasi "+
								 " where a.no_kas = '"+this.cb_bukti.getText()+"' and a.jenis <> 'KAS' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";				
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10),
								new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
										  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_drk"),line.get("nama_drk"),line.get("kode_bank"),line.get("nama_bank")));					
						}
						this.sg1.validasi();
					} 
				}
				
			} catch(e)
			{
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
			  this.standarLib.showListData(this, "Daftar Bukti KasBank Periode "+this.ed_period.getText(),this.cb_bukti,undefined, 
												 "select no_kas, keterangan from kas_m where modul = 'KBI_NP' and posted = 'F' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_kas)      from kas_m where modul = 'KBI_NP' and posted = 'F' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_kas","keterangan"],"and",["No KasBank","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("2"),undefined);				
			this.sg1.clear(); this.sg1.appendRow();
		}
		if (sender == this.cb_akun) 
		{
		    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
			/*
				this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			*/
				this.standarLib.showListData2(this, "Daftar Rekening Kas",this.cb_akun,undefined, 
										  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			} else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
				/*
					this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false); 
				*/
					this.standarLib.showListData2(this, "Daftar Rekening Bank",this.cb_akun,undefined, 
										  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			}
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
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
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);
				break;
			case 9 : 
				this.standarLib.showListDataForSG(this, "Daftar KasBank",this.sg1, this.sg1.row, this.sg1.col,
												  "select  distinct kode_bank, nama  from bank2 where kode_lokasi = '"+this.app._lokasi+"' and kode_akun='"+this.sg1.getCell(0,this.sg1.row)+"'",
												  "select count(kode_bank) from bank2 where kode_lokasi = '"+this.app._lokasi+"' and kode_akun='"+this.sg1.getCell(0,this.sg1.row)+"'",
												  ["kode_bank","nama"],"and",["Kode KasBank","Deskripsi"],true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_kb_fKbink] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = nKB = 0; 
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				if (this.sg1.getCell(3, i).toUpperCase() == "D")					
					totD += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(3, i).toUpperCase() == "C")					
					totC += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		nKB = totC - totD;
		this.ed_debet.setText(floatToNilai(totD));
		this.ed_kredit.setText(floatToNilai(totC));
		this.ed_nilai.setText(floatToNilai(nKB));
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_kb_fKbink]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doCellEnter = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
						if (this.sg1.getCell(2,row) == "")
						this.sg1.setCell(2,row,this.ed_desc.getText());
				break;
			case 3 : 
						if (this.sg1.getCell(3,row) == "")
						this.sg1.setCell(3,row,"C");
				break;
			case 5 : 
						if ((this.sg1.getCell(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.getCell(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)));
						}
				break;
		}
	}catch(e)
	{
		alert("app_saku_kb_transaksi_nonpro_kb_fKbink::doCellEnter : " + e);
	}	
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 3 : 
			case 4 : 
						this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("app_saku_kb_transaksi_nonpro_kb_fKbink::doCellExit : " + e);
	}	
};
window.app_saku_kb_transaksi_nonpro_kb_fKbink.prototype.doRequestReady = function(sender, methodName, result)
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
					system.info(this,"transaksi telah sukses tersimpan (no bukti : "+ this.nb +")");
					if (this.formEvent != "hapus"){
						if (this.jurnalViewer === undefined){
							this.jurnalViewer = new app_saku_fJurnalViewer(this.app,{bound:[this.width / 2 - 400,70,800,450]});									
						}
						this.jurnalViewer.previewHtml(this.dbLarge.getJurnalHtml("select a.no_kas as no_ju,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi, "+
									"	   a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app as nik_setuju,c.nama as nama_setuju,c.jabatan as jabatan_setuju "+
									"from kas_m a "+
									"left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
									"left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
									"where a.no_kas = '"+this.nb+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
									"select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  "+
									"from kas_j a "+
									"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_kas='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"order by a.dc desc "));
					}			
					this.doModalResult("clear",mrOk);					     
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
