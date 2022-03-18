window.app_saku_dmt_transaksi_fFrk = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fFrk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fFrk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Final Receive Non PO: Koreksi", 0);	
		
		uses("portalui_saiEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		    
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
	
		uses("portalui_saiCBBL");
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(20);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Asset/Site ID");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(245);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(76);
		this.ed_barcode.setWidth(220);
		this.ed_barcode.setCaption("No Inventori");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(false);
		this.ed_barcode.setLength(50);
		this.ed_barcode.setTag("3");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(270);
		this.ed_nama.setCaption("Deskripsi");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("3");
		
		this.ed_baps = new portalui_saiLabelEdit(this);
		this.ed_baps.setLeft(500);
		this.ed_baps.setTop(98);
		this.ed_baps.setWidth(250);
		this.ed_baps.setCaption("No BAPS");
		this.ed_baps.setText(""); 
		this.ed_baps.setReadOnly(false);
		this.ed_baps.setLength(50);
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency - Kurs");
		this.cb_curr.setText(""); 
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setRightLabelCaption("");	
		this.cb_curr.setTag("2");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(210);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setText(""); 
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("2");
		
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(120);
		this.lbltgl3.setLeft(500);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(18);		
		this.lbltgl3.setCaption("Tanggal BAPS");
		this.lbltgl3.setUnderLine(true);
		
		this.dp_tgl3 = new portalui_datePicker(this);
		this.dp_tgl3.setTop(120);
		this.dp_tgl3.setLeft(600);
		this.dp_tgl3.setWidth(82);
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(142);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");	
		this.cb_pp.setTag("3");
		
		this.cb_klpfa = new portalui_saiCBBL(this);
		this.cb_klpfa.setLeft(20);
		this.cb_klpfa.setTop(164);
		this.cb_klpfa.setWidth(185);
		this.cb_klpfa.setCaption("Kelompok Asset");
		this.cb_klpfa.setText(""); 
		this.cb_klpfa.setReadOnly(true);
		this.cb_klpfa.setLabelWidth(100);
		this.cb_klpfa.setRightLabelVisible(true);
		this.cb_klpfa.setRightLabelCaption("");	
		this.cb_klpfa.setTag("3");
		
		this.cb_klpakun = new portalui_saiCBBL(this);
		this.cb_klpakun.setLeft(20);
		this.cb_klpakun.setTop(186);
		this.cb_klpakun.setWidth(185);
		this.cb_klpakun.setCaption("Kelompok Akun");
		this.cb_klpakun.setText(""); 
		this.cb_klpakun.setReadOnly(true);
		this.cb_klpakun.setLabelWidth(100);
		this.cb_klpakun.setRightLabelVisible(true);
		this.cb_klpakun.setRightLabelCaption("");	
		this.cb_klpakun.setTag("3");
		
		this.cb_lokfa = new portalui_saiCBBL(this);
		this.cb_lokfa.setLeft(20);
		this.cb_lokfa.setTop(208);
		this.cb_lokfa.setWidth(185);
		this.cb_lokfa.setCaption("Lokasi Asset");
		this.cb_lokfa.setText(""); 
		this.cb_lokfa.setReadOnly(true);
		this.cb_lokfa.setLabelWidth(100);
		this.cb_lokfa.setRightLabelVisible(true);
		this.cb_lokfa.setRightLabelCaption("");	
		this.cb_lokfa.setTag("3");
		
		this.cb_pnj = new portalui_saiCBBL(this);
		this.cb_pnj.setLeft(20);
		this.cb_pnj.setTop(230);
		this.cb_pnj.setWidth(185);
		this.cb_pnj.setCaption("Penanggung Jawab");
		this.cb_pnj.setText(""); 
		this.cb_pnj.setReadOnly(true);
		this.cb_pnj.setLabelWidth(100);
		this.cb_pnj.setRightLabelVisible(true);
		this.cb_pnj.setRightLabelCaption("");	
		this.cb_pnj.setTag("3");
		
		this.cb_brg = new portalui_saiCBBL(this);
		this.cb_brg.setLeft(20);
		this.cb_brg.setTop(5);
		this.cb_brg.setWidth(185);
		this.cb_brg.setCaption("Barang");
		this.cb_brg.setText(""); 
		this.cb_brg.setReadOnly(true);
		this.cb_brg.setLabelWidth(100);
		this.cb_brg.setRightLabelVisible(true);
		this.cb_brg.setRightLabelCaption("");	
		this.cb_brg.setTag("3");
		
		this.cb_kondisi = new portalui_saiCBBL(this);
		this.cb_kondisi.setLeft(20);
		this.cb_kondisi.setTop(1);
		this.cb_kondisi.setWidth(185);
		this.cb_kondisi.setCaption("Kondisi");
		this.cb_kondisi.setText(""); 
		this.cb_kondisi.setReadOnly(true);
		this.cb_kondisi.setLabelWidth(100);
		this.cb_kondisi.setRightLabelVisible(true);
		this.cb_kondisi.setRightLabelCaption("");	
		this.cb_kondisi.setTag("2");	
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(252);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(18);		
		this.lbltgl2.setCaption("Tgl Awal Susut");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(252);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);	
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(3);
		this.ed_nilai.setWidth(200);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		
		this.ed_residu = new portalui_saiLabelEdit(this);
		this.ed_residu.setLeft(20);
		this.ed_residu.setTop(4);
		this.ed_residu.setWidth(200);
		this.ed_residu.setTipeText(ttNilai);
		this.ed_residu.setAlignment(alRight);
		this.ed_residu.setCaption("Nilai Residu");
		this.ed_residu.setText("1"); 
		this.ed_residu.setReadOnly(false);
		this.ed_residu.setTag("3");
		
		this.ed_akun = new portalui_saiLabelEdit(this);
		this.ed_akun.setLeft(520);
		this.ed_akun.setTop(4);
		this.ed_akun.setWidth(200);
		this.ed_akun.setCaption("Kode Akun");
		this.ed_akun.setText(""); 
		this.ed_akun.setReadOnly(true);
		this.ed_akun.setLength(100);
		this.ed_akun.setTag("3");
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(20);
		this.ed_merk.setTop(76);
		this.ed_merk.setWidth(370);
		this.ed_merk.setCaption("Merk");
		this.ed_merk.setText(""); 
		this.ed_merk.setReadOnly(false);
		this.ed_merk.setLength(100);
		this.ed_merk.setTag("3");
		
		this.ed_umur = new portalui_saiLabelEdit(this);
		this.ed_umur.setLeft(520);
		this.ed_umur.setTop(76);
		this.ed_umur.setWidth(200);
		this.ed_umur.setTipeText(ttNilai);
		this.ed_umur.setAlignment(alRight);
		this.ed_umur.setCaption("Umur Asset");
		this.ed_umur.setText("1"); 
		this.ed_umur.setReadOnly(true);
		this.ed_umur.setTag("3");
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(20);
		this.ed_tipe.setTop(98);
		this.ed_tipe.setWidth(370);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText(""); 
		this.ed_tipe.setReadOnly(false);
		this.ed_tipe.setLength(100);
		this.ed_tipe.setTag("3");
		
		this.ed_persen = new portalui_saiLabelEdit(this);
		this.ed_persen.setLeft(520);
		this.ed_persen.setTop(98);
		this.ed_persen.setWidth(200);
		this.ed_persen.setTipeText(ttNilai);
		this.ed_persen.setAlignment(alRight);
		this.ed_persen.setCaption("% Penyusutan");
		this.ed_persen.setText("1"); 
		this.ed_persen.setReadOnly(true);
		this.ed_persen.setTag("3");
		
		this.ed_seri = new portalui_saiLabelEdit(this);
		this.ed_seri.setLeft(20);
		this.ed_seri.setTop(120);
		this.ed_seri.setWidth(370);
		this.ed_seri.setCaption("No Seri");
		this.ed_seri.setText(""); 
		this.ed_seri.setReadOnly(false);
		this.ed_seri.setLength(50);
		this.ed_seri.setTag("3");
		
		this.ed_jenis = new portalui_saiLabelEdit(this);
		this.ed_jenis.setLeft(520);
		this.ed_jenis.setTop(120);
		this.ed_jenis.setWidth(200);
		this.ed_jenis.setCaption("Jenis");
		this.ed_jenis.setText(""); 
		this.ed_jenis.setReadOnly(true);
		this.ed_jenis.setLength(100);
		this.ed_jenis.setTag("3");
		
		this.rearrangeChild(10,23);
		
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
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpfa.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpakun.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpakun.onChange.set(this, "doEditChange");
			this.cb_lokfa.onBtnClick.set(this, "FindBtnClick");
			this.cb_pnj.onBtnClick.set(this, "FindBtnClick");
			this.cb_kondisi.onBtnClick.set(this, "FindBtnClick");
			this.cb_brg.onBtnClick.set(this, "FindBtnClick");
			this.cb_brg.onChange.set(this, "doEditChange");
			this.bShow.onClick.set(this, "showClick");
			
			this.standarLib.clearByTag(this, new Array("0","1","2","3"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
			var line,data = this.dbLib.runSQL("select a.kode_status,a.nama from fa_status a inner join spro b on a.kode_status=b.flag where b.kode_spro = 'KDSBAIK' and b.kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.cb_kondisi.setText(line.get("kode_status"));
					this.cb_kondisi.setRightLabelCaption(line.get("nama"));
				} 
			}
			
		}catch(e){
			alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fFrk.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fFrk.prototype.mainButtonClick = function(sender)
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
window.app_saku_dmt_transaksi_fFrk.prototype.ubah = function()
{	
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2","3")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add(" delete from fa_asset where no_fa='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add(" delete from fa_d where no_fa ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_fr='NONPO' ");
				
			var month = this.dp_tgl2.month;
			if (month < 10) month = "0"+month;
			var psusut = this.dp_tgl2.year+""+month;
			
			sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
				        "                 progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis,no_baps,tgl_baps) values "+
						"('"+
						this.cb_bukti.getText()+"','"+this.ed_barcode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_klpfa.getText()+"','"+this.cb_klpakun.getText()+"','"+this.cb_lokfa.getText()+"','"+
						this.cb_pnj.getText()+"','"+this.cb_brg.getText()+"','"+
						this.ed_nama.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
						parseNilai(this.ed_residu.getText())+",'-','-','1','"+this.dp_tgl1.getDate()+"','"+this.ed_period.getText()+"','"+this.dp_tgl2.getDate()+"','"+
						this.app._userLog+"',now(),"+parseNilai(this.ed_umur.getText())+","+parseNilai(this.ed_persen.getText())+",'"+psusut+"','"+this.ed_merk.getText()+"','"+
						this.ed_tipe.getText()+"','"+this.ed_seri.getText()+"','"+this.cb_kondisi.getText()+"','"+this.ed_akun.getText()+"','"+this.ed_jenis.getText()+"','"+this.ed_baps.getText()+"','"+this.dp_tgl3.getDateString()+"')");
				
			sql.add("insert into fa_d (no_fr,no_fa,no_urut,barcode,no_tag,kode_lokasi) values "+	
				    "                 ('NONPO','"+this.cb_bukti.getText()+"',1,'"+this.ed_barcode.getText()+"','-','"+this.app._lokasi+"')");
			this.dbLib.execArraySQL(sql);	
		}catch(e){
			system.alert(this, e,"");
		}
	}
};
window.app_saku_dmt_transaksi_fFrk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","3"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
		
		case "ubah" :	
			if (nilaiToFloat(this.ed_nilai.getText()) < nilaiToFloat(this.ed_residu.getText()))
			{
				system.alert(this,"Nilai tidak valid.","Nilai asset kurang dari nilai residu.");
				return false;
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
			{
				system.alert(this,"Tanggal awal penyusutan tidak valid.","Tanggal awal susut kurang dari tanggal transaksi.");
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

				sql.add(" delete from fa_asset where no_fa='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from fa_d where no_fa ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_fr='NONPO' ");
				
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;					
	}
};
window.app_saku_dmt_transaksi_fFrk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.dp_tgl2.setText(this.dp_tgl1.getText());
};
window.app_saku_dmt_transaksi_fFrk.prototype.doEditChange = function(sender)
{
	/*
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	*/
	if (sender == this.cb_klpakun)
	{
		this.ed_umur.setText("0");
		this.ed_persen.setText("0");
		var line,data = this.dbLib.runSQL(" select kode_akun,umur,persen from fa_klpakun "+
					                      " where kode_lokasi='"+this.app._lokasi+"' and kode_klpakun='"+this.cb_klpakun.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_akun.setText(line.get("kode_akun"));
				this.ed_umur.setText(floatToNilai(parseFloat(line.get("umur"))));
				this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
			} 
		}
	}
	if (sender == this.cb_brg)
	{
		this.ed_jenis.setText("");
		var line,data = this.dbLib.runSQL(" select a.jenis from barang_klp a inner join barang_m b on a.kode_klpbrg = b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi "+
					                      " where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_brg='"+this.cb_brg.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_jenis.setText(line.get("jenis"));
			} 
		}
	}
};			
window.app_saku_dmt_transaksi_fFrk.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{	
		var strSql =  " select a.nama,a.barcode,a.kode_brg,b.nama as nama_brg,a.kode_akun,a.jenis,a.kode_pp,e.nama as nama_pp,a.kode_klpfa,ifnull(g.nama,'-') as nama_klpfa,a.kode_curr,a.kurs, "+
					  "        a.kode_klpakun,ifnull(h.nama,'-') as nama_klpakun,a.kode_lokfa,ifnull(l.nama,'-') as nama_lokfa,"+
					  "        a.nik_pnj,ifnull(m.nama,'-') as nama_pnj, "+
					  "        b.kode_sat,a.tgl_susut as tgl,a.kode_status as kode_kondisi,k.nama as nama_kondisi,"+
					  "		   a.nilai,a.merk,a.tipe,a.no_seri,a.nilai_residu,a.umur,a.persen,a.no_baps,a.tgl_baps "+
					  " from fa_asset a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
					  "             inner join barang_klp c on b.kode_klpbrg=c.kode_klpbrg and b.kode_lokasi=c.kode_lokasi "+
					  "             inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
					  "             inner join fa_status k on a.kode_status = k.kode_status and k.jenis ='S' "+
					  "             left outer join fa_klp g on a.kode_klpfa = g.kode_klpfa and a.kode_lokasi=g.kode_lokasi "+
					  "             left outer join fa_klpakun h on a.kode_klpakun = h.kode_klpakun and a.kode_lokasi=h.kode_lokasi "+
					  "             left outer join fa_lokasi l on a.kode_lokfa = l.kode_lokfa and a.kode_lokasi=l.kode_lokasi "+
					  "             left outer join karyawan m on a.nik_pnj = m.nik and a.kode_lokasi=m.kode_lokasi "+
					  " where a.no_fa = '"+this.cb_bukti.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
					  
		var line,data = this.dbLib.runSQL(strSql);			
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_barcode.setText(line.get("barcode"));
				this.ed_nama.setText(line.get("nama"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(parseFloat(line.get("kurs"))));
				this.cb_pp.setText(line.get("kode_pp"));
				this.cb_pp.setRightLabelCaption(line.get("nama_pp"));
				this.cb_klpfa.setText(line.get("kode_klpfa"));
				this.cb_klpfa.setRightLabelCaption(line.get("nama_klpfa"));
				this.cb_klpakun.setText(line.get("kode_klpakun"));
				this.cb_klpakun.setRightLabelCaption(line.get("nama_klpakun"));
				this.cb_lokfa.setText(line.get("kode_lokfa"));
				this.cb_lokfa.setRightLabelCaption(line.get("nama_lokfa"));
				this.cb_pnj.setText(line.get("nik_pnj"));
				this.cb_pnj.setRightLabelCaption(line.get("nama_pnj"));
				this.cb_brg.setText(line.get("kode_brg"));
				this.cb_brg.setRightLabelCaption(line.get("nama_brg"));
				this.cb_kondisi.setText(line.get("kode_kondisi"));
				this.cb_kondisi.setRightLabelCaption(line.get("nama_kondisi"));
				this.dp_tgl2.setText(line.get("tgl"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_residu.setText(floatToNilai(parseFloat(line.get("nilai_residu"))));
				this.ed_merk.setText(line.get("merk"));
				this.ed_tipe.setText(line.get("tipe"));
				this.ed_seri.setText(line.get("no_seri"));
				this.ed_akun.setText(line.get("kode_akun"));
				this.ed_jenis.setText(line.get("jenis"));
				this.ed_umur.setText(floatToNilai(parseFloat(line.get("umur"))));
				this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
				this.ed_baps.setText(line.get("no_baps"));
				this.dp_tgl3.setText(line.get("tgl_baps"));
			} 
		}
	}
};			
window.app_saku_dmt_transaksi_fFrk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{   
		    this.standarLib.showListData(this, "Daftar Asset FR Non PO",this.cb_bukti,undefined, 
										  "select a.no_fa, a.barcode  from fa_asset a inner join fa_d b on a.no_fa = b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_fr = 'NONPO' "+
										  "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress ='1' and a.periode<='"+this.ed_period.getText()+"'",
										  "select count(a.no_fa) from fa_asset a inner join fa_d b on a.no_fa = b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_fr = 'NONPO' "+
										  "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress ='1' and a.periode<='"+this.ed_period.getText()+"'",
										  new Array("no_fa","barcode"),"and",new Array("No Asset","No Inventori"),false);
		 	this.standarLib.clearByTag(this, new Array("3"),undefined);				
		}
		if (sender == this.cb_brg) 
		{   
		    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
										  "select kode_brg,nama   from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_brg) from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
									      new Array("kode_brg","nama"),"and",new Array("Kode Barang","Nama Barang"),false);
		}
		if (sender == this.cb_kondisi) 
		{   
		    this.standarLib.showListData(this, "Daftar Status Kondisi",this.cb_kondisi,undefined, 
										  "select kode_status,nama   from fa_status where jenis = 'S'",
										  "select count(kode_status) from fa_status where jenis = 'S'",
									      new Array("kode_status","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_pnj) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan Penanggung Jawab",this.cb_pnj,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_lokfa) 
		{   
		    this.standarLib.showListData(this, "Daftar Lokasi Asset",this.cb_lokfa,undefined, 
										  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi Asset","Deskripsi"),false);
		}
		if (sender == this.cb_klpakun) 
		{   
		    this.standarLib.showListData(this, "Daftar Kelompok Akun Asset",this.cb_klpakun,undefined, 
										  "select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_klpakun","nama"),"and",new Array("Kode Klp Akun Asset","Deskripsi"),false);
		}
		if (sender == this.cb_klpfa) 
		{   
		    this.standarLib.showListData(this, "Daftar Kelompok Asset",this.cb_klpfa,undefined, 
										  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  "select count(kode_klpfa) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  new Array("kode_klpfa","nama"),"and",new Array("Kode Klp Asset","Deskripsi"),false);
		}
		if (sender == this.cb_curr) 
		{   
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr,nama   from curr",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"and",new Array("Kode Curr","Deskripsi"),false);
		}
		if (sender == this.cb_pp) 
		{   
		    this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
		}
	}catch(e){
		alert(e);
	}
};
window.app_saku_dmt_transaksi_fFrk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.cb_bukti.getText()+")");
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