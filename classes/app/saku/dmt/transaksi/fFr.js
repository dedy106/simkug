window.app_saku_dmt_transaksi_fFr = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fFr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fFr";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Asset : Input", 0);	
		
		uses("portalui_saiEdit;portalui_datePicker");
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
		
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(32);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(220);
		this.ed_nb.setLength(20);
		this.ed_nb.setCaption("No Asset/Site ID");
		this.ed_nb.setText(""); 
		//this.ed_nb.setReadOnly(true);
	
		/*
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		*/
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(76);
		this.ed_barcode.setWidth(220);
		this.ed_barcode.setCaption("No Inventory");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(false);
		this.ed_barcode.setLength(50);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(370);
		this.ed_nama.setCaption("Deskripsi");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		
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
		
		this.ed_akun = new portalui_saiLabelEdit(this);
		this.ed_akun.setLeft(520);
		this.ed_akun.setTop(4);
		this.ed_akun.setWidth(200);
		this.ed_akun.setCaption("Kode Akun");
		this.ed_akun.setText(""); 
		this.ed_akun.setReadOnly(true);
		this.ed_akun.setLength(100);
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(20);
		this.ed_merk.setTop(76);
		this.ed_merk.setWidth(370);
		this.ed_merk.setCaption("Merk");
		this.ed_merk.setText(""); 
		this.ed_merk.setReadOnly(false);
		this.ed_merk.setLength(100);
		
		this.ed_umur = new portalui_saiLabelEdit(this);
		this.ed_umur.setLeft(520);
		this.ed_umur.setTop(76);
		this.ed_umur.setWidth(200);
		this.ed_umur.setTipeText(ttNilai);
		this.ed_umur.setAlignment(alRight);
		this.ed_umur.setCaption("Umur Asset");
		this.ed_umur.setText("1"); 
		this.ed_umur.setReadOnly(true);
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(20);
		this.ed_tipe.setTop(98);
		this.ed_tipe.setWidth(370);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText(""); 
		this.ed_tipe.setReadOnly(false);
		this.ed_tipe.setLength(100);
		
		this.ed_persen = new portalui_saiLabelEdit(this);
		this.ed_persen.setLeft(520);
		this.ed_persen.setTop(98);
		this.ed_persen.setWidth(200);
		this.ed_persen.setTipeText(ttNilai);
		this.ed_persen.setAlignment(alRight);
		this.ed_persen.setCaption("% Penyusutan");
		this.ed_persen.setText("1"); 
		this.ed_persen.setReadOnly(true);
		
		this.ed_seri = new portalui_saiLabelEdit(this);
		this.ed_seri.setLeft(20);
		this.ed_seri.setTop(120);
		this.ed_seri.setWidth(370);
		this.ed_seri.setCaption("No Seri");
		this.ed_seri.setText(""); 
		this.ed_seri.setReadOnly(false);
		this.ed_seri.setLength(50);
		
		this.ed_jenis = new portalui_saiLabelEdit(this);
		this.ed_jenis.setLeft(520);
		this.ed_jenis.setTop(120);
		this.ed_jenis.setWidth(200);
		this.ed_jenis.setCaption("Jenis");
		this.ed_jenis.setText(""); 
		this.ed_jenis.setReadOnly(true);
		this.ed_jenis.setLength(100);
		
		this.rearrangeChild(10,23);
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
		    this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar;util_addOnLib");
		    this.standarLib = new util_standar();		    			
		    this.addOnLib = new util_addOnLib();
			
			//this.bGen.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
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
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
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
window.app_saku_dmt_transaksi_fFr.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fFr.prototype.mainButtonClick = function(sender)
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
window.app_saku_dmt_transaksi_fFr.prototype.simpan = function()
{	
	//this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			var month = this.dp_tgl2.month;
			if (month < 10) month = "0"+month;
			var psusut = this.dp_tgl2.year+""+month;
					
			sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
				        "                 progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis,no_baps,tgl_baps) values "+
						"('"+
						this.ed_nb.getText()+"','"+this.ed_barcode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_klpfa.getText()+"','"+this.cb_klpakun.getText()+"','"+this.cb_lokfa.getText()+"','"+
						this.cb_pnj.getText()+"','"+this.cb_brg.getText()+"','"+
						this.ed_nama.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
						parseNilai(this.ed_residu.getText())+",'-','-','1','"+this.dp_tgl1.getDate()+"','"+this.ed_period.getText()+"','"+this.dp_tgl2.getDate()+"','"+
						this.app._userLog+"',now(),"+parseNilai(this.ed_umur.getText())+","+parseNilai(this.ed_persen.getText())+",'"+psusut+"','"+this.ed_merk.getText()+"','"+
						this.ed_tipe.getText()+"','"+this.ed_seri.getText()+"','"+this.cb_kondisi.getText()+"','"+this.ed_akun.getText()+"','"+this.ed_jenis.getText()+"','"+this.ed_baps.getText()+"','"+this.dp_tgl3.getDateString()+"')");
				
			sql.add("insert into fa_d (no_fr,no_fa,no_urut,barcode,no_tag,kode_lokasi) values "+	
				    "                 ('NONPO','"+this.ed_nb.getText()+"',1,'"+this.ed_barcode.getText()+"','-','"+this.app._lokasi+"')");
			this.dbLib.execArraySQL(sql);	
		}catch(e){
			system.alert(this, e,"");
		}
	}
};
window.app_saku_dmt_transaksi_fFr.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				this.ed_jenis.setText("Jurnal");
			}
			break;
		
		case "simpan" :	
			var line,data = this.dbLib.runSQL(" select no_fa from fa_asset "+
					                      " where kode_lokasi='"+this.app._lokasi+"' and no_fa='"+this.ed_nb.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line !== undefined)
				{
					system.alert(this,"No Asset/Site ID sudah terpakai.","Harap ubah dengan ID lainnya.");
					return false;
				} 
			}
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
window.app_saku_dmt_transaksi_fFr.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			//this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_asset','no_fa',this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_barcode.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");			
		}
	}catch (e){
		alert(e);
	}
};
window.app_saku_dmt_transaksi_fFr.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.dp_tgl2.setText(this.dp_tgl1.getText());
};
window.app_saku_dmt_transaksi_fFr.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
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
window.app_saku_dmt_transaksi_fFr.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_dmt_transaksi_fFr.prototype.doRequestReady = function(sender, methodName, result)
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