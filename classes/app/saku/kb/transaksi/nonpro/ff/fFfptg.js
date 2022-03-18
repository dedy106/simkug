window.app_saku_kb_transaksi_nonpro_ff_fFfptg = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_ff_fFfptg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan [Closing] FluktuatifFund [KB Masuk] NP: Input", 0);	

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
		this.bGen.setTop(100);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.ed_noptg = new portalui_saiLabelEdit(this);
		this.ed_noptg.setLeft(20);
		this.ed_noptg.setTop(100);
		this.ed_noptg.setWidth(230);
		this.ed_noptg.setCaption("No Reimburse");
		this.ed_noptg.setReadOnly(true);
		this.ed_noptg.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(122);
		this.ed_desc.setWidth(550);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(144);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(340);
		this.ed_giro.setTop(144);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("9");
		
		this.cb_noff = new portalui_saiCBBL(this);
		this.cb_noff.setLeft(20);
		this.cb_noff.setTop(166);
		this.cb_noff.setWidth(250);
		this.cb_noff.setCaption("No FluktuatifFund");
		this.cb_noff.setReadOnly(true);
		this.cb_noff.setLabelWidth(100);
		this.cb_noff.setRightLabelVisible(false);
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(268);
		this.bShow.setTop(166);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.cb_akunff = new portalui_saiCBBL(this);
		this.cb_akunff.setLeft(700);
		this.cb_akunff.setTop(188);
		this.cb_akunff.setWidth(175);
		this.cb_akunff.setCaption("Akun FluktuatifFund");
		this.cb_akunff.setReadOnly(true);
		this.cb_akunff.setLabelWidth(100);
		this.cb_akunff.setRightLabelVisible(true);
		this.cb_akunff.setRightLabelCaption("");
		this.cb_akunff.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(210);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun KasBank");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(232);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(254);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		
		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(188);
		this.cb_status.setWidth(230);
		this.cb_status.setCaption("Status");
		this.cb_status.addItem(0,"PTG");
		this.cb_status.addItem(1,"CLOSING");
		this.cb_status.setReadOnly(true);
		this.cb_status.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(700);
		this.cb_curr.setTop(210);
		this.cb_curr.setWidth(175);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(875);
		this.ed_kurs.setTop(210);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.ed_nilaiff = new portalui_saiLabelEdit(this);
		this.ed_nilaiff.setLeft(700);
		this.ed_nilaiff.setTop(232);
		this.ed_nilaiff.setWidth(220);
		this.ed_nilaiff.setTipeText(ttNilai);
		this.ed_nilaiff.setAlignment(alRight);
		this.ed_nilaiff.setCaption("Saldo FluktuatifFund");
		this.ed_nilaiff.setText("0"); 
		this.ed_nilaiff.setReadOnly(true);
		this.ed_nilaiff.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(254);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Pertanggungan");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(276);
	    this.p1.setWidth(900);
	    this.p1.setHeight(195);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Pertanggungan ImprestFund');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(147);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode Dept.","Nama Dept.","Kode RKM","Nama RKM"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.setTag("9");
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
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(170);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
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
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_noff.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			
			this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1"); this.cb_status.setText("PTG");
			this.sg1.clear(); this.sg1.appendRow();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.simpan = function()
{
	if (nilaiToFloat(this.ed_nilai.getText()) > nilaiToFloat(this.ed_nilaiff.getText()))
	{
		system.alert(this,"Nilai pertanggungan tidak valid.","Nilai pertanggungan tidak boleh melebihi saldo fluktuatif fund.");
		return false;
	}
	if ((nilaiToFloat(this.ed_nilai.getText()) <= 0) && (this.cb_status.getText() != "CLOSING"))
	{
		system.alert(this,"Nilai pertanggungan tidak valid.","Nilai pertanggungan boleh nol untuk status 'CLOSING'.");
		return false;
	}
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (this.cb_status.getText() == "CLOSING") 
			{
				sql.add("update ff_m set progress = '9' where no_ff='"+this.cb_noff.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				var nilaiKB = nilaiToFloat(this.ed_nilaiff.getText()) - nilaiToFloat(this.ed_nilai.getText()); 
			} else
			{
				var nilaiKB = 0; 
			}
			
			sql.add("insert into ffptg_m (no_ffptg,no_ff,no_kas,no_dokumen,tanggal,"+
					"keterangan,catatan,kode_curr,kurs,akun_ff,akun_kas,nik_buat,nik_setuju,kode_lokasi,"+
					"modul,status,nilai,nilai_kas,progress,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_noptg.getText()+"','"+this.cb_noff.getText()+"','"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+
					this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_akunff.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"',"+
					"'FFPTG_NP','"+this.cb_status.getText()+"',"+parseNilai(this.ed_nilai.getText())+","+nilaiKB+",'2','F','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			if (nilaiToFloat(this.ed_nilai.getText()) != 0)
			{
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					sql.add("insert into ffptg_j (no_ffptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_noptg.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'"+this.app._lokasi+"','FFPTG_NP','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
				}
			} else var i = 0;
			
			sql.add("insert into ffptg_j (no_ffptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_noptg.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.cb_akunff.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'-','-',"+
						"'"+this.app._lokasi+"','FFPTG_NP','FFD_NP','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
					
			if (this.cb_status.getText() == "CLOSING") 
			{
				if (nilaiToFloat(this.ed_nilai.getText()) != nilaiToFloat(this.ed_nilaiff.getText()))
				{
					var z = nilaiToFloat(this.ed_nilaiff.getText()) -  nilaiToFloat(this.ed_nilai.getText());
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','FFPTG_NP','"+this.cb_jenis.getText()+"','"+
							this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+z+",'-','-',now(),'"+this.app._userLog+"','F','-','-','"+this.ed_noptg.getText()+"')");
				
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
							"','"+this.ed_desc.getText()+"','D',"+z+",'-','-',"+
							"'"+this.ed_noptg.getText()+"','"+this.app._lokasi+"','FFPTG_NP','KAS',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',2,'"+this.cb_akunff.getText()+
							"','"+this.ed_desc.getText()+"','C',"+z+",'-','-',"+
							"'"+this.ed_noptg.getText()+"','"+this.app._lokasi+"','FFPTG_NP','FF',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");		
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1"); this.cb_status.setText("PTG");
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
			
		case "simpan" :
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.genClick = function(sender)
{
	try
	{
		this.sg1.validasi();
		if (this.ed_period.getText() != "")
		{
			if (this.cb_status.getText() == "CLOSING")
			{
				if (this.cb_jenis.getText() == "KAS")
				{
					this.jenis = "BKM";
				}
				if (this.cb_jenis.getText() == "BANK")
				{
					this.jenis = "BBM";
				}
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
			} else this.ed_nb.setText("-");
			this.ed_noptg.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ffptg_m','no_ffptg',this.app._lokasi+"-FFP"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.showClick = function(sender)
{
	try 
	{
		if (this.app._dbEng == "mysqlt")
		{
			var line,data = this.dbLib.runSQL(" select a.akun_ff,a.nik_pengaju,b.nama as nama_pengaju,a.kode_curr,a.kurs,(a.nilai-ifnull(c.nilai_ptg,0)) as saldo "+
											  " from ff_m a inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
										      "             left outer join "+
											  "                   (select no_ff,sum(nilai+nilai_kas) as nilai_ptg "+
											  "                    from ffptg_m where progress='2' and no_del='-' "+
											  "                    group by no_ff) c on a.no_ff=c.no_ff  "+
										      " where a.no_ff = '"+this.cb_noff.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		}else
		if (this.app._dbEng == "ado_mssql")
		{
			var line,data = this.dbLib.runSQL(" select a.akun_ff,a.nik_pengaju,b.nama as nama_pengaju,a.kode_curr,a.kurs,(a.nilai-isnull(c.nilai_ptg,0)) as saldo "+
											  " from ff_m a inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
										      "             left outer join "+
											  "                   (select no_ff,sum(nilai+nilai_kas) as nilai_ptg "+
											  "                    from ffptg_m where progress='2' and no_del='-' "+
											  "                    group by no_ff) c on a.no_ff=c.no_ff  "+
										      " where a.no_ff = '"+this.cb_noff.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		}
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.cb_buat.setText(line.get("nik_pengaju"));
				this.cb_buat.setRightLabelCaption(line.get("nama_pengaju"));
				this.cb_akunff.setText(line.get("akun_ff"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(line.get("kurs")));
				this.ed_nilaiff.setText(floatToNilai(line.get("saldo")));
			} 
		}	
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doEditChange = function(sender)
{

	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		this.ed_noptg.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_jenis)
	{
		this.ed_nb.setText("");
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_noff) 
		{
			this.standarLib.showListData(this, "Daftar FluktuatifFund",this.cb_noff,undefined, 
										  "select no_ff, keterangan  from ff_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='FFD_NP' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_ff)       from ff_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='FFD_NP' and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_ff","keterangan"),"and",new Array("No FluktuatifFund","Keterangan"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);  this.cb_status.setText("PTG");				
		}
		if (sender == this.cb_akun) 
		{
		    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
				this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			} else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
					this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			}
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat Pertanggungan",this.cb_buat,undefined, 
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
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar Departemen",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode Departemen","Deskripsi"),false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_drk","a.nama"),"and",new Array("Kode RKM","Deskripsi"),true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_ff_fFfptg] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = totDC = 0; 
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
		totDC = totD - totC;
		this.ed_nilai.setText(floatToNilai(totDC));
		this.ed_nb.setText("");
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_ff_fFfptg]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_nonpro_ff_fFfptg.prototype.doRequestReady = function(sender, methodName, result)
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