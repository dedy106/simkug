window.app_saku_kb_transaksi_proses_drop_fDropkrmk = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_drop_fDropkrmk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Droping Pengiriman Dana: Koreksi", 0);
		
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
		this.ed_nb.setCaption("No Droping");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
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
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Droping Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(922);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
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
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(120);
		this.lblTgl2.setLeft(20);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tgl. Jth Tempo");
		this.lblTgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(122);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
		
		this.cb_noalok = new portalui_saiCBBL(this);
		this.cb_noalok.setLeft(20);
		this.cb_noalok.setTop(142);
		this.cb_noalok.setWidth(240);
		this.cb_noalok.setLabelWidth(100);
		this.cb_noalok.setReadOnly(true);
		this.cb_noalok.setRightLabelVisible(false);
		this.cb_noalok.setCaption("No Alokasi");
		this.cb_noalok.setText(""); 
		this.cb_noalok.setRightLabelCaption("");
		this.cb_noalok.setTag("1");
		
		this.ed_ket = new portalui_saiLabelEdit(this);
		this.ed_ket.setLeft(20);
		this.ed_ket.setTop(164);
		this.ed_ket.setWidth(500);
		this.ed_ket.setCaption("Keterangan");
		this.ed_ket.setText(""); 
		this.ed_ket.setReadOnly(true);
		this.ed_ket.setLength(150);
		this.ed_ket.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(186);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(186);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(208);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setCaption("Lokasi Tujuan");
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("1");
		
		this.cb_tak = new portalui_saiCBBL(this);
		this.cb_tak.setLeft(20);
		this.cb_tak.setTop(230);
		this.cb_tak.setWidth(185);
		this.cb_tak.setLabelWidth(100);
		this.cb_tak.setReadOnly(true);
		this.cb_tak.setRightLabelVisible(true);
		this.cb_tak.setCaption("Akun Mutasi");
		this.cb_tak.setRightLabelCaption("");
		this.cb_tak.setTag("1");
		
		this.cb_pengaju = new portalui_saiCBBL(this);
		this.cb_pengaju.setLeft(20);
		this.cb_pengaju.setTop(252);
		this.cb_pengaju.setWidth(185);
		this.cb_pengaju.setLabelWidth(100);
		this.cb_pengaju.setReadOnly(true);
		this.cb_pengaju.setRightLabelVisible(true);
		this.cb_pengaju.setCaption("Dibuat Oleh");
		this.cb_pengaju.setRightLabelCaption("");
		this.cb_pengaju.setTag("1");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(274);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("1");
		
		this.ed_sisa = new portalui_saiLabelEdit(this);
		this.ed_sisa.setLeft(700);
		this.ed_sisa.setTop(164);
		this.ed_sisa.setWidth(220);
		this.ed_sisa.setTipeText(ttNilai);
		this.ed_sisa.setAlignment(alRight);
		this.ed_sisa.setCaption("Saldo Droping Inv.");
		this.ed_sisa.setText("0"); 
		this.ed_sisa.setReadOnly(true);	
		this.ed_sisa.setTag("1");
		
		this.ed_sisax = new portalui_saiLabelEdit(this);
		this.ed_sisax.setLeft(700);
		this.ed_sisax.setTop(186);
		this.ed_sisax.setWidth(220);
		this.ed_sisax.setTipeText(ttNilai);
		this.ed_sisax.setAlignment(alRight);
		this.ed_sisax.setCaption("Saldo Droping Expl.");
		this.ed_sisax.setText("0"); 
		this.ed_sisax.setReadOnly(true);	
		this.ed_sisax.setTag("1");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(208);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setCaption("Total Saldo");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);		
		
		this.ed_ninves = new portalui_saiLabelEdit(this);
		this.ed_ninves.setLeft(700);
		this.ed_ninves.setTop(230);
		this.ed_ninves.setWidth(220);
		this.ed_ninves.setTipeText(ttNilai);
		this.ed_ninves.setAlignment(alRight);
		this.ed_ninves.setCaption("Droping Investasi");
		this.ed_ninves.setText("0"); 
		this.ed_ninves.setReadOnly(true);		
		this.ed_ninves.setTag("1");
		
		this.ed_nexplo = new portalui_saiLabelEdit(this);
		this.ed_nexplo.setLeft(700);
		this.ed_nexplo.setTop(252);
		this.ed_nexplo.setWidth(220);
		this.ed_nexplo.setTipeText(ttNilai);
		this.ed_nexplo.setAlignment(alRight);
		this.ed_nexplo.setCaption("Droping Exploitasi");
		this.ed_nexplo.setText("0"); 
		this.ed_nexplo.setReadOnly(true);		
		this.ed_nexplo.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(274);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total Droping");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);		
		this.ed_nilai.setTag("1");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(296);
	    this.p1.setWidth(900);
	    this.p1.setHeight(150);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Rincian Droping');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(125);
		this.sg1.setColCount(5);
		this.sg1.setTag("9");
		this.sg1.setColTitle(["Status","Kode PP","Nama PP","Uraian","Jumlah"]);
		this.sg1.setColWidth([4,3,2,1,0],[100,400,200,80,80]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setTitle("Status");
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "INVESTASI");
			val.set(2, "EKSPLOITASI");
		this.sg1.columns.get(0).setPicklist(val);
		this.sg1.columns.get(1).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
    	
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(445);
		this.sgNav.setLeft(21);
		this.sgNav.setWidth(899);
		this.sgNav.setGrid(this.sg1);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(2);
		
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
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_pengaju.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.ed_sisa.onChange.set(this, "doEditChange");
			this.ed_sisax.onChange.set(this, "doEditChange");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			
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
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.ubah = function()
{
	if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.tglinput)))
	{
		system.alert(this,"Tanggal koreksi kurang dari tanggal input ["+this.tglinput+"].","");
		return false;
	}
	if  ((nilaiToFloat(this.ed_sisa.getText()) < nilaiToFloat(this.ed_ninves.getText())) || (nilaiToFloat(this.ed_sisax.getText()) < nilaiToFloat(this.ed_nexplo.getText())))
	{
		system.alert(this,"Nilai droping tidak valid.","Nilai tidak boleh melebihi saldonya.");
		return false;
	}
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Nilai droping tidak valid.","Nilai tidak boleh nol atau kurang");
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
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update dropkrm_m set no_del = '"+this.ed_nb.getText()+"' where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from dropkrm_m where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from dropkrm_j where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from dropkrm_d where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.cb_bukti.getText();
			}
			
			sql.add("insert into dropkrm_m (no_kirim,no_dokumen,no_alok,no_kas,tanggal,due_date,akun_tak,"+
					"keterangan,kode_curr,kurs,nik_buat,nik_setuju,lok_tujuan,kode_lokasi,"+
					"modul,jenis,nilai,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.cb_noalok.getText()+"','-','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','"+this.cb_tak.getText()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_pengaju.getText()+"','"+this.cb_setuju.getText()+
					"','"+this.cb_lokasi.getText()+"','"+this.app._lokasi+"',"+
					"'DROP','KRM',"+parseNilai(this.ed_nilai.getText())+",'0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			sql.add("insert into dropkrm_j (no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+ 
					"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.cb_tak.getText()+
					"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'"+this.app._kodePP+"','-',"+
					"'"+this.app._lokasi+"','DROPK','TAK','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())");
					
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (this.sg1.rowValid(i))
				{
					sql.add("insert into dropkrm_d (no_kirim,kode_lokasi,no_urut,status,keterangan,nilai,kode_pp) values "+	
							"('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(0,i)+"',"+
							"'"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(1,i)+"')");
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
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doModalResult = function(event, modalResult)
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
				this.sg1.clear(); this.sg1.appendRow();
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
					sql.add(" update dropkrm_m set no_del = 'DEL' where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}
				else
				{
					sql.add(" delete from dropkrm_m where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from dropkrm_j where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");	
				    sql.add(" delete from dropkrm_d where no_kirim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "") 
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'dropkrm_m','no_kirim',this.app._lokasi+"-DPK"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doEditChange = function(sender)
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
	if ((sender == this.ed_sisa) || (sender == this.ed_sisax))
	{
		var tot = nilaiToFloat(this.ed_sisa.getText()) + nilaiToFloat(this.ed_sisax.getText());
		this.ed_total.setText(floatToNilai(tot));
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.showClick = function(sender)
{
	try 
	{
		if (this.cb_bukti.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select a.no_alok,a.keterangan as ket,x.kode_curr,x.kurs,a.nilai-ifnull(c.npakai,'0') as sisa,a.nilaix-ifnull(c.npakaix,'0') as sisax,a.akun_tak,"+
											  "        a.lok_tujuan,b.nama as nama_akun,d.nama as nama_lokasi,x.no_dokumen,x.keterangan,x.due_date,x.nik_buat,x.nik_setuju,y.nama as nama_buat,z.nama as nama_app,x.periode,date_format(x.tanggal,'%d/%m/%Y') as tgl_krm  "+
											  " from alokasi_m a inner join dropkrm_m x on a.no_alok=x.no_alok and a.kode_lokasi = x.kode_lokasi "+
											  "                  inner join masakun b on a.akun_tak=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                  inner join lokasi d on a.lok_tujuan=d.kode_lokasi "+
											  "                  inner join karyawan y on x.nik_buat=y.nik and x.kode_lokasi=y.kode_lokasi "+
											  "                  inner join karyawan z on x.nik_setuju=z.nik and x.kode_lokasi=z.kode_lokasi "+
											  "                  left outer join (select i.no_alok,i.kode_lokasi,ifnull(sum(case j.status when 'INVESTASI' then j.nilai else 0 end),0) as npakai, "+
											  "                                                                  ifnull(sum(case j.status when 'EKSPLOITASI' then j.nilai else 0 end),0) as npakaix "+
											  "									  from dropkrm_m i "+
											  "                                          inner join dropkrm_d j on i.no_kirim = j.no_kirim and i.kode_lokasi=j.kode_lokasi "+
											  "                                   where i.no_del='-' and i.no_kirim <> '"+this.cb_bukti.getText()+"' group by i.no_alok,i.kode_lokasi) c  on a.no_alok=c.no_alok and a.kode_lokasi=c.kode_lokasi "+
											  " where a.no_alok = c.no_alok and x.no_kirim = '"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.periodeLama = line.get("periode");
					this.tglinput = line.get("tgl_krm");
					this.cb_noalok.setText(line.get("no_alok"));
					this.cb_tak.setText(line.get("akun_tak"));
					this.cb_tak.setRightLabelCaption(line.get("nama_akun"));
					this.cb_lokasi.setText(line.get("lok_tujuan"));
					this.cb_lokasi.setRightLabelCaption(line.get("nama_lokasi"));
					this.cb_curr.setText(line.get("kode_curr"));
					this.ed_kurs.setText(floatToNilai(parseFloat(line.get("kurs"))));
					this.ed_sisa.setText(floatToNilai(parseFloat(line.get("sisa"))));
					this.ed_sisax.setText(floatToNilai(parseFloat(line.get("sisax"))));
					
					this.ed_ket.setText(line.get("ket"));
					this.ed_dok.setText(line.get("no_dokumen"));
					this.ed_desc.setText(line.get("keterangan"));
					this.dp_tgl2.setText(line.get("due_date"));
					this.cb_pengaju.setText(line.get("nik_buat"));
					this.cb_pengaju.setRightLabelCaption(line.get("nama_buat"));
					this.cb_setuju.setText(line.get("nik_setuju"));
					this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
				} 
			}else throw (data);
			
			this.sg1.clear(); 			
				var strSql = " select  a.no_urut ,a.status,a.kode_pp,b.nama,a.keterangan,a.nilai "+
							 " from dropkrm_d a inner join pp b on a.kode_pp = b.kode_pp and b.kode_lokasi = '"+this.cb_lokasi.getText()+"' "+
							 " where a.no_kirim = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut ";
		
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4),
							new Array(line.get("status"),line.get("kode_pp"),line.get("nama"),line.get("keterangan"),line.get("nilai")));					
					}
					this.sg1.validasi();
				} 
			}
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 :
			case 4 : 
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doNilaiChange = function()
{
	try
	{
		var tot2 = tot = 0;		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				if (this.sg1.getCell(0, i) == "INVESTASI")					
					tot += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(0, i) == "EKSPLOITASI")					
					tot2 += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		this.ed_ninves.setText(floatToNilai(tot));
		this.ed_nexplo.setText(floatToNilai(tot2));
		tot2 = tot2 + tot;
		this.ed_nilai.setText(floatToNilai(tot2));
		
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_proses_drop_fDropkrmk]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 1 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_pp,nama   from pp where kode_lokasi = '"+this.cb_lokasi.getText()+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.cb_lokasi.getText()+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode PP","Nama PP"],false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_proses_drop_fDropkrmk] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Droping",this.cb_bukti,undefined, 
				  								 "select no_kirim, keterangan from dropkrm_m where progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' ",
												 "select count(no_kirim)      from dropkrm_m where progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' ",
												 ["no_kirim","keterangan"],"and",["No Droping","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);
			this.sg1.clear(); this.sg1.appendRow();			
		}
		if (sender == this.cb_pengaju) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat",this.cb_pengaju,undefined, 
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
window.app_saku_kb_transaksi_proses_drop_fDropkrmk.prototype.doRequestReady = function(sender, methodName, result)
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