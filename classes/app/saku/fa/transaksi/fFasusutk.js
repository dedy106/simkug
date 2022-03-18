window.app_saku_fa_transaksi_fFasusutk = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFasusutk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFasusutk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Asset: Koreksi", 0);	
				
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
	    uses("portalui_label");
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(32);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(18);		
		this.lbltgl1.setCaption("Tanggal");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(32);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Bukti");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
			
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(420);
		this.ed_merk.setTop(54);
		this.ed_merk.setWidth(370);
		this.ed_merk.setCaption("Merk");
		this.ed_merk.setText(""); 
		this.ed_merk.setReadOnly(true);
		this.ed_merk.setLength(100);
		this.ed_merk.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(3);
		this.ed_desc.setWidth(370);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(420);
		this.ed_tipe.setTop(3);
		this.ed_tipe.setWidth(370);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText(""); 
		this.ed_tipe.setReadOnly(true);
		this.ed_tipe.setLength(100);
		this.ed_tipe.setTag("2");
		
		uses("portalui_saiCBBL");
		this.cb_fa = new portalui_saiCBBL(this);
		this.cb_fa.setLeft(20);
		this.cb_fa.setTop(1);
		this.cb_fa.setWidth(240);
		this.cb_fa.setCaption("No Asset");
		this.cb_fa.setText(""); 
		this.cb_fa.setReadOnly(true);
		this.cb_fa.setLabelWidth(100);
		this.cb_fa.setRightLabelVisible(false);
		this.cb_fa.setRightLabelCaption("");	
			
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(260);
		this.bShow.setTop(1);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_klp = new portalui_saiLabelEdit(this);
		this.ed_klp.setLeft(420);
		this.ed_klp.setTop(1);
		this.ed_klp.setWidth(250);
		this.ed_klp.setCaption("Klp Asset");
		this.ed_klp.setText(""); 
		this.ed_klp.setReadOnly(true);
		this.ed_klp.setLength(50);
		this.ed_klp.setTag("2");
				
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(2);
		this.ed_barcode.setWidth(300);
		this.ed_barcode.setCaption("No Inventori");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(true);
		this.ed_barcode.setLength(50);
		this.ed_barcode.setTag("2");
		
		this.ed_lokasi = new portalui_saiLabelEdit(this);
		this.ed_lokasi.setLeft(420);
		this.ed_lokasi.setTop(2);
		this.ed_lokasi.setWidth(250);
		this.ed_lokasi.setCaption("Lokasi Asset");
		this.ed_lokasi.setText(""); 
		this.ed_lokasi.setReadOnly(true);
		this.ed_lokasi.setLength(50);
		this.ed_lokasi.setTag("2");
		
		this.ed_pp = new portalui_saiLabelEdit(this);
		this.ed_pp.setLeft(20);
		this.ed_pp.setTop(4);
		this.ed_pp.setWidth(300);
		this.ed_pp.setCaption("PP");
		this.ed_pp.setText(""); 
		this.ed_pp.setReadOnly(true);
		this.ed_pp.setLength(50);
		this.ed_pp.setTag("2");
		
		this.ed_barang = new portalui_saiLabelEdit(this);
		this.ed_barang.setLeft(420);
		this.ed_barang.setTop(4);
		this.ed_barang.setWidth(250);
		this.ed_barang.setCaption("Jenis Barang");
		this.ed_barang.setText(""); 
		this.ed_barang.setReadOnly(true);
		this.ed_barang.setLength(50);
		this.ed_barang.setTag("2");
		
		this.ed_klpakun = new portalui_saiLabelEdit(this);
		this.ed_klpakun.setLeft(20);
		this.ed_klpakun.setTop(5);
		this.ed_klpakun.setWidth(300);
		this.ed_klpakun.setCaption("Klp Akun");
		this.ed_klpakun.setText(""); 
		this.ed_klpakun.setReadOnly(true);
		this.ed_klpakun.setLength(50);
		this.ed_klpakun.setTag("2");
		
		this.ed_pnj = new portalui_saiLabelEdit(this);
		this.ed_pnj.setLeft(20);
		this.ed_pnj.setTop(6);
		this.ed_pnj.setWidth(300);
		this.ed_pnj.setCaption("Png. Jawab");
		this.ed_pnj.setText(""); 
		this.ed_pnj.setReadOnly(true);
		this.ed_pnj.setLength(50);
		this.ed_pnj.setTag("2");
		
		this.ed_kondisi = new portalui_saiLabelEdit(this);
		this.ed_kondisi.setLeft(420);
		this.ed_kondisi.setTop(6);
		this.ed_kondisi.setWidth(200);
		this.ed_kondisi.setCaption("Kondisi");
		this.ed_kondisi.setText(""); 
		this.ed_kondisi.setReadOnly(true);
		this.ed_kondisi.setLength(50);
		this.ed_kondisi.setTag("2");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(8);
		this.ed_nilai.setWidth(200);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");
		
		this.ed_akun = new portalui_saiLabelEdit(this);
		this.ed_akun.setLeft(420);
		this.ed_akun.setTop(8);
		this.ed_akun.setWidth(200);
		this.ed_akun.setCaption("Kode Akun");
		this.ed_akun.setText(""); 
		this.ed_akun.setReadOnly(true);
		this.ed_akun.setLength(100);
		this.ed_akun.setTag("2");
		
		this.ed_residu = new portalui_saiLabelEdit(this);
		this.ed_residu.setLeft(20);
		this.ed_residu.setTop(9);
		this.ed_residu.setWidth(200);
		this.ed_residu.setTipeText(ttNilai);
		this.ed_residu.setAlignment(alRight);
		this.ed_residu.setCaption("Nilai Residu");
		this.ed_residu.setText("1"); 
		this.ed_residu.setReadOnly(true);
		this.ed_residu.setTag("2");
		
		this.ed_umur = new portalui_saiLabelEdit(this);
		this.ed_umur.setLeft(420);
		this.ed_umur.setTop(9);
		this.ed_umur.setWidth(200);
		this.ed_umur.setTipeText(ttNilai);
		this.ed_umur.setAlignment(alRight);
		this.ed_umur.setCaption("Umur Asset");
		this.ed_umur.setText("1"); 
		this.ed_umur.setReadOnly(true);
		this.ed_umur.setTag("2");
		
		uses("portalui_saiCBBL");
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(10);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");
		
		this.ed_persen = new portalui_saiLabelEdit(this);
		this.ed_persen.setLeft(420);
		this.ed_persen.setTop(10);
		this.ed_persen.setWidth(200);
		this.ed_persen.setTipeText(ttNilai);
		this.ed_persen.setAlignment(alRight);
		this.ed_persen.setCaption("% Penyusutan");
		this.ed_persen.setText("1"); 
		this.ed_persen.setReadOnly(true);
		this.ed_persen.setTag("2");
		
		this.ed_total1 = new portalui_saiLabelEdit(this);
		this.ed_total1.setLeft(720);
		this.ed_total1.setTop(10);
		this.ed_total1.setWidth(200);
		this.ed_total1.setTipeText(ttNilai);
		this.ed_total1.setAlignment(alRight);
		this.ed_total1.setCaption("Total Penyusutan");
		this.ed_total1.setText("0"); 
		this.ed_total1.setReadOnly(true);
		this.ed_total1.setTag("2");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(11);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		
		this.ed_seri = new portalui_saiLabelEdit(this);
		this.ed_seri.setLeft(420);
		this.ed_seri.setTop(11);
		this.ed_seri.setWidth(250);
		this.ed_seri.setCaption("No Seri");
		this.ed_seri.setText(""); 
		this.ed_seri.setReadOnly(true);
		this.ed_seri.setLength(50);
		this.ed_seri.setTag("2");
		
		this.ed_total2 = new portalui_saiLabelEdit(this);
		this.ed_total2.setLeft(720);
		this.ed_total2.setTop(11);
		this.ed_total2.setWidth(200);
		this.ed_total2.setTipeText(ttNilai);
		this.ed_total2.setAlignment(alRight);
		this.ed_total2.setCaption("Total Koreksi");
		this.ed_total2.setText("0"); 
		this.ed_total2.setReadOnly(true);
		this.ed_total2.setTag("2");
				
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(12);
	    this.p1.setWidth(900);
	    this.p1.setHeight(150);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Penyusutan Asset Tahhun Berjalan');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(120);
	    this.sg1.setColCount(11);
	    this.sg1.setColTitle(new Array("Status","No Penyusutan","No Asset","Periode","Keterangan","DC","Nilai","Akun Debet","Akun Kredit","Kode PP",
		                               "Kode RKM"));
		this.sg1.setColWidth(new Array(10,9,8,7,6,5,4,3,2,1,0),new Array(80,80,80,80,100,50,200,60,100,100,80));	
		this.sg1.setReadOnly(false);
		
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "TRUE");
			val.set(2, "FALSE");
		this.sg1.columns.get(0).setPicklist(val);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
		this.sg1.columns.get(8).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(10).setReadOnly(true);	
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		
		this.rearrangeChild(10,23);
		
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
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_fa.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doCellChange");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFasusutk.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFasusutk.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFasusutk.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into fasusut_m (no_fasusut,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.curr+"',"+this.kurs+","+parseNilai(this.ed_total2.getText())+","+
					"'-','-','F','FA_KST','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			
			var idx = 0;
			for (var i=0; i <= this.sg1.getRowCount(); i++)
			{			
				if (this.sg1.getCell(0,i) == "FALSE")
				{
					sql.add("update fasusut_d set dc='C', no_del = '"+this.ed_nb.getText()+"' where no_fa='"+this.cb_fa.getText()+"' and no_fasusut='"+this.sg1.getCell(1,i)+"' ");
					sql.add("insert into fasusut_j (no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg1.getCell(8,i)+
							"','"+this.sg1.getCell(4,i)+"','D',"+parseNilai(this.sg1.getCell(6,i))+",'"+this.sg1.getCell(9,i)+"','"+this.sg1.getCell(10,i)+"',"+
							"'"+this.app._lokasi+"','FA_KST','AP','"+this.ed_period.getText()+
							"','"+this.curr+"',"+this.kurs+",'"+this.app._userLog+"',now())");
					idx++;
					sql.add("insert into fasusut_j (no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg1.getCell(7,i)+
							"','"+this.sg1.getCell(4,i)+"','C',"+parseNilai(this.sg1.getCell(6,i))+",'"+this.sg1.getCell(9,i)+"','"+this.sg1.getCell(10,i)+"',"+
							"'"+this.app._lokasi+"','FA_KST','BP','"+this.ed_period.getText()+
							"','"+this.curr+"',"+this.kurs+",'"+this.app._userLog+"',now())");
					idx++;
					sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.ed_nb.getText()+"','KST','"+this.app._lokasi+"','"+this.sg1.getCell(7,i)+"','"+this.sg1.getCell(9,i)+"','"+this.sg1.getCell(10,i)+
							"','"+this.sg1.getCell(3,i)+"','"+this.ed_period.getText()+"','C',0,"+parseNilai(this.sg1.getCell(6,i))+")");
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
window.app_saku_fa_transaksi_fFasusutk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		
		case "simpan" :	
			if (nilaiToFloat(this.ed_total2.getText()) <= 0)
			{
				system.alert(this,"Nilai tidak valid.","Nilai koreksi tidak boleh kurang atau sama dengan nol.");
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
window.app_saku_fa_transaksi_fFasusutk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fasusut_m','no_fasusut',this.app._lokasi+"-KST"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_fa_transaksi_fFasusutk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFasusutk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};
window.app_saku_fa_transaksi_fFasusutk.prototype.showClick = function(sender)
{
	if (this.cb_fa.getText() != "") 
	{
		var line,data = this.dbLib.runSQL(" select a.barcode,a.nilai,a.nilai_residu,a.merk,a.tipe,a.no_seri,a.kode_akun,a.umur,a.persen, "+
										  "        b.nama as nama_pp,c.nama as nama_klp, d.nama as nama_klpakun, e.nama as nama_lokfa, f.nama as nama_brg, "+
										  "        g.nama as nama_pnj,h.nama as nama_kondisi,ifnull(i.nsusut,0) as nsusut,a.kode_curr,a.kurs "+
		                                  " from fa_asset a "+
										  "            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
										  "            inner join fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi "+
										  "            inner join fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi "+
										  "            inner join fa_lokasi e on a.kode_lokfa=e.kode_lokfa and a.kode_lokasi=e.kode_lokasi "+
										  "            inner join barang_m f on a.kode_brg=f.kode_brg and a.kode_lokasi=f.kode_lokasi "+
										  "            inner join karyawan g on a.nik_pnj=g.nik and a.kode_lokasi=g.kode_lokasi "+
										  "            inner join fa_status h on a.kode_status=h.kode_status and h.jenis='S' "+
										  "            left outer join (select no_fa,kode_lokasi,sum(nilai) as nsusut "+
										  "                             from fasusut_d where dc = 'D' and no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_fa,kode_lokasi) i on a.no_fa=i.no_fa and a.kode_lokasi=i.kode_lokasi "+
										  " where a.no_fa='"+this.cb_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.curr = line.get("kode_curr");
				this.kurs = parseFloat(line.get("kurs"));
				this.ed_klp.setText(line.get("nama_klp"));
				this.ed_barcode.setText(line.get("barcode"));
				this.ed_lokasi.setText(line.get("nama_lokfa"));
				this.ed_pp.setText(line.get("nama_pp"));
				this.ed_barang.setText(line.get("nama_brg"));
				this.ed_klpakun.setText(line.get("nama_klpakun"));
				this.ed_pnj.setText(line.get("nama_pnj"));
				this.ed_kondisi.setText(line.get("nama_kondisi"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_residu.setText(floatToNilai(parseFloat(line.get("nilai_residu"))));
				this.ed_merk.setText(line.get("merk"));
				this.ed_tipe.setText(line.get("tipe"));
				this.ed_seri.setText(line.get("no_seri"));
				this.ed_akun.setText(line.get("kode_akun"));
				this.ed_umur.setText(floatToNilai(parseFloat(line.get("umur"))));
				this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
				this.ed_total1.setText(floatToNilai(parseFloat(line.get("nsusut"))));
			} 
		}
		
		this.sg1.clear();
		var strSql =  "select a.no_fasusut,a.no_fa,a.periode,b.keterangan,'D' as dc,a.nilai,a.akun_bp,a.akun_ap,a.kode_pp,a.kode_drk "+
		              "from fasusut_d a inner join fasusut_m b on a.no_fasusut=b.no_fasusut and a.kode_lokasi=b.kode_lokasi "+
					  "where a.periode like '"+this.app._periode.substr(0,4)+"%' and a.dc ='D' and a.no_fa = '"+this.cb_fa.getText()+
					  "' and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_del='-' order by a.periode";
					 
		var data = this.dbLib.runSQL(strSql);
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var k in data.objList)
				{
					line = data.get(k);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10),
						new Array("TRUE",line.get("no_fasusut"),line.get("no_fa"),line.get("periode"),line.get("keterangan"),line.get("dc").toUpperCase(),line.get("nilai"),
								  line.get("akun_bp"),line.get("akun_ap"),line.get("kode_pp"),line.get("kode_drk")));	
				}
				this.sg1.validasi();
			} else this.sg1.appendRow(); 
		}else this.sg1.appendRow(); 
	}
};
window.app_saku_fa_transaksi_fFasusutk.prototype.doCellChange = function(sender , col, row)
{
	if (col == 0) this.sg1.validasi();
};				
window.app_saku_fa_transaksi_fFasusutk.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(0, i) == "FALSE")					
			{
				if (this.sg1.getCell(6,i) != "")
					tot += nilaiToFloat(this.sg1.getCell(6,i));			
			}
		}
		this.ed_total2.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("doNilaiChange:"+e);
	}
};				
window.app_saku_fa_transaksi_fFasusutk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_fa) 
		{   		    
			this.standarLib.showListData(this, "Daftar Asset",this.cb_fa,undefined, 
										  "select no_fa, barcode from fa_asset where kode_lokasi = '"+this.app._lokasi+"' and progress= '1' and jenis = 'ASSET'",
										  "select count(no_fa)   from fa_asset where kode_lokasi = '"+this.app._lokasi+"' and progress= '1' and jenis = 'ASSET'",
										  new Array("no_fa","barcode"),"and",new Array("No Asset","No Inventori"),false);
			this.standarLib.clearByTag(this, new Array("2"),undefined);
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFasusutk.prototype.doRequestReady = function(sender, methodName, result)
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