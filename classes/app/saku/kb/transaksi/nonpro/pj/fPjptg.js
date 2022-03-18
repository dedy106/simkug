window.app_saku_kb_transaksi_nonpro_pj_fPjptg = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_pj_fPjptg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar [KB Masuk/Keluar] NP: Input", 0);	

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
		this.ed_noptg.setCaption("No Pertanggungan");
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
		
		this.cb_nopj = new portalui_saiCBBL(this);
		this.cb_nopj.setLeft(20);
		this.cb_nopj.setTop(166);
		this.cb_nopj.setWidth(250);
		this.cb_nopj.setCaption("No Panjar");
		this.cb_nopj.setReadOnly(true);
		this.cb_nopj.setLabelWidth(100);
		this.cb_nopj.setRightLabelVisible(false);
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(268);
		this.bShow.setTop(166);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.cb_akunpj = new portalui_saiCBBL(this);
		this.cb_akunpj.setLeft(20);
		this.cb_akunpj.setTop(188);
		this.cb_akunpj.setWidth(185);
		this.cb_akunpj.setCaption("Akun Panjar");
		this.cb_akunpj.setReadOnly(true);
		this.cb_akunpj.setLabelWidth(100);
		this.cb_akunpj.setRightLabelVisible(true);
		this.cb_akunpj.setRightLabelCaption("");
		this.cb_akunpj.setTag("1");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(210);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun KasBank");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(340);
		this.cb_pp.setTop(166);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("1");
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(340);
		this.cb_drk.setTop(188);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Kode RKM");
		this.cb_drk.setText(""); 
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");
		this.cb_drk.setTag("1");
		
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
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(700);
		this.cb_curr.setTop(188);
		this.cb_curr.setWidth(175);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(875);
		this.ed_kurs.setTop(188);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.ed_nilaipj = new portalui_saiLabelEdit(this);
		this.ed_nilaipj.setLeft(700);
		this.ed_nilaipj.setTop(210);
		this.ed_nilaipj.setWidth(220);
		this.ed_nilaipj.setTipeText(ttNilai);
		this.ed_nilaipj.setAlignment(alRight);
		this.ed_nilaipj.setCaption("Nilai Panjar");
		this.ed_nilaipj.setText("0"); 
		this.ed_nilaipj.setReadOnly(true);
		this.ed_nilaipj.setTag("1");
		
		this.ed_nilaikb = new portalui_saiLabelEdit(this);
		this.ed_nilaikb.setLeft(700);
		this.ed_nilaikb.setTop(232);
		this.ed_nilaikb.setWidth(220);
		this.ed_nilaikb.setTipeText(ttNilai);
		this.ed_nilaikb.setAlignment(alRight);
		this.ed_nilaikb.setCaption("Nilai KasBank");
		this.ed_nilaikb.setText("0"); 
		this.ed_nilaikb.setReadOnly(true);
		
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
	    this.p1.setCaption('Daftar Item Jurnal Pertanggungan Panjar');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(147);
	    this.sg1.setColCount(5);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai"]);
		this.sg1.setColWidth([4,3,2,1,0],[120,30,430,200,80]);
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
			this.cb_nopj.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			
			this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clear(); this.sg1.appendRow();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.simpan = function()
{
	if (nilaiToFloat(this.ed_nilaikb.getText()) < 0)
	{
		data = this.dbLib.runSQL("select flag from spro where kode_spro = 'PTGLBH' and kode_lokasi='"+this.app._lokasi+"'");
		var row = undefined;
		row = data.get(0);
		var vFlag = row.get("flag");
		if  (vFlag == "0")
		{
			system.alert(this,"Nilai pertanggungan tidak valid.","Nilai pertanggungan tidak boleh melebihi nilai panjar yang telah diambil.");
			return false;
		}
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this,["0","1"]))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("update panjar_m set progress = '3' where no_pj='"+this.cb_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,"+
					"keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_noptg.getText()+"','"+this.cb_nopj.getText()+"','"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+
					this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_akunpj.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','PTG_NP',"+parseNilai(this.ed_nilai.getText())+","+parseNilai(this.ed_nilaikb.getText())+",'"+this.cb_drk.getText()+"','2','F','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			
			if (nilaiToFloat(this.ed_nilai.getText()) != 0)
			{
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					sql.add("insert into ptg_j (no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_noptg.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+
							"','"+this.app._lokasi+"','PTG_NP','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
				}
			} else var i = 0;

			if (this.ed_nilaikb.getText() != "0")
			{
				if ((nilaiToFloat(this.ed_nilaikb.getText()) < 0))
				{
					data = this.dbLib.runSQL("select flag from spro where kode_spro = 'APPTG' and kode_lokasi = '"+this.app._lokasi+"'");
					var row = undefined;
					row = data.get(0);
					var akunSls = row.get("flag");
					var dcSls = "C";
					var dcNonKB = "D";
					var dcKB = "C";
					var jenis = "APPTG";
					var z = nilaiToFloat(this.ed_nilaikb.getText()) * -1 ;
				}
				else
				{
					data = this.dbLib.runSQL("select flag from spro where kode_spro = 'ARPTG' and kode_lokasi = '"+this.app._lokasi+"'");
					var row = undefined;
					row = data.get(0);
					var akunSls = row.get("flag");
					var dcSls = "D";
					var dcNonKB = "C";
					var dcKB = "D";
					var jenis = "ARPTG";
					var z = nilaiToFloat(this.ed_nilaikb.getText());
				}
				
				sql.add("insert into ptg_j (no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_noptg.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+akunSls+
						"','Selisih Ptg Panjar "+this.ed_noptg.getText()+"','"+dcSls+"',"+z+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+
						"','"+this.app._lokasi+"','PTG_NP','"+jenis+"','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','PTG_NP','"+this.cb_jenis.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+z+",'-','-',now(),'"+this.app._userLog+"','F','-','-','"+this.ed_noptg.getText()+"')");
			
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
						"','"+this.ed_desc.getText()+"','"+dcKB+"',"+z+",'"+this.cb_pp.getText()+"','"+
						this.cb_drk.getText()+"','"+this.ed_noptg.getText()+"','"+this.app._lokasi+"','PTG_NP','KAS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
				
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+akunSls+
						"','"+this.ed_desc.getText()+"','"+dcNonKB+"',"+z+",'"+this.cb_pp.getText()+"','"+
						this.cb_drk.getText()+"','"+this.ed_noptg.getText()+"','"+this.app._lokasi+"','PTG_NP','"+jenis+"',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}			
			i = i+1;
			sql.add("insert into ptg_j (no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_noptg.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.cb_akunpj.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilaipj.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+
						"','"+this.app._lokasi+"','PTG_NP','PJR','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
					
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
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
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.genClick = function(sender)
{
	try
	{
		this.sg1.validasi();
		if (this.ed_period.getText() != "")
		{
			if (this.ed_nilaikb.getText() != "0") 
			{
				if (nilaiToFloat(this.ed_nilaikb.getText()) < 0)
				{
					if (this.cb_jenis.getText() == "KAS")
					{
						this.jenis = "BKK";
					}
					if (this.cb_jenis.getText() == "BANK")
					{
						this.jenis = "BBK";
					}
				} else
				{
					if (this.cb_jenis.getText() == "KAS")
					{
						this.jenis = "BKM";
					}
					if (this.cb_jenis.getText() == "BANK")
					{
						this.jenis = "BBM";
					}
				}
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
			} else this.ed_nb.setText("-");
			this.ed_noptg.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ptg_m','no_ptg',this.app._lokasi+"-PTG"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.showClick = function(sender)
{
	try 
	{
		var line,data = this.dbLib.runSQL(" select a.akun_pj,a.kode_pp,a.nik_pengaju,b.nama as nama_pengaju,a.kode_drk,a.kode_curr,a.kurs,a.nilai "+
										  " from panjar_m a inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
										  " where a.no_pj = '"+this.cb_nopj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.cb_buat.setText(line.get("nik_pengaju"));
				this.cb_buat.setRightLabelCaption(line.get("nama_pengaju"));
				this.cb_akunpj.setText(line.get("akun_pj"));
				this.cb_pp.setText(line.get("kode_pp"));
				this.cb_drk.setText(line.get("kode_drk"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(line.get("kurs")));
				this.ed_nilaipj.setText(floatToNilai(line.get("nilai")));
				
			} 
		}	
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doEditChange = function(sender)
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
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nopj) 
		{
			this.standarLib.showListData(this, "Daftar Panjar",this.cb_nopj,undefined, 
										  "select no_pj, keterangan  from panjar_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='PJR_NP' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_pj)       from panjar_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='PJR_NP' and periode<='"+this.ed_period.getText()+"'",
										  ["no_pj","keterangan"],"and",["No Panjar","Keterangan"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
		if (sender == this.cb_akun) 
		{
		    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
				this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
			} else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
					this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
			}
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat Pertanggungan",this.cb_buat,undefined, 
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
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doFindBtnClick = function(sender, col, row) 
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
		}
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_pj_fPjptg] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = totDC = nKB = 0; 
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
		nKB = nilaiToFloat(this.ed_nilaipj.getText()) - totDC; 
		this.ed_nilaikb.setText(floatToNilai(nKB));
		this.ed_nb.setText("");
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_pj_fPjptg]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_nonpro_pj_fPjptg.prototype.doRequestReady = function(sender, methodName, result)
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