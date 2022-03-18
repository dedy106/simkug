window.app_saku_logistik_transaksi_fSpblog = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fSpblog.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fSpblog";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Pembayaran : Input", 0);	
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		
	    uses("portalui_label");
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
	
		uses("portalui_saiCBBL");
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(54);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(76);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No SPP");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(76);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.ed_ref1 = new portalui_saiLabelEdit(this);
		this.ed_ref1.setLeft(20);
		this.ed_ref1.setTop(98);
		this.ed_ref1.setWidth(300);
		this.ed_ref1.setCaption("No Dokumen Ref.");
		this.ed_ref1.setText(""); 
		this.ed_ref1.setReadOnly(false);
		this.ed_ref1.setLength(50);
	    
		this.ed_fppn = new portalui_saiLabelEdit(this);
		this.ed_fppn.setLeft(323);
		this.ed_fppn.setTop(98);
		this.ed_fppn.setWidth(198);
		this.ed_fppn.setLabelWidth(99);
		this.ed_fppn.setCaption("Faktur Pajak");
		this.ed_fppn.setText(""); 
		this.ed_fppn.setReadOnly(false);
		this.ed_fppn.setLength(16);
		
		this.ed_ref2 = new portalui_saiLabelEdit(this);
		this.ed_ref2.setLeft(20);
		this.ed_ref2.setTop(120);
		this.ed_ref2.setWidth(300);
		this.ed_ref2.setCaption("Dok. Invoice");
		this.ed_ref2.setText(""); 
		this.ed_ref2.setReadOnly(false);
		this.ed_ref2.setLength(50);
		
		this.lblTgl3 = new portalui_label(this);
		this.lblTgl3.setTop(120);
		this.lblTgl3.setLeft(323);
		this.lblTgl3.setWidth(101);		
		this.lblTgl3.setHeight(20);		
		this.lblTgl3.setCaption("Tanggal Invoice");
		this.lblTgl3.setUnderLine(true);
		
		this.dp_tgl3 = new portalui_datePicker(this);
		this.dp_tgl3.setTop(122);
		this.dp_tgl3.setLeft(422);
		this.dp_tgl3.setWidth(99);
		
		this.ed_catat = new portalui_saiLabelEdit(this);
		this.ed_catat.setLeft(20);
		this.ed_catat.setTop(142);
		this.ed_catat.setWidth(500);
		this.ed_catat.setCaption("Catatan");
		this.ed_catat.setText(""); 
		this.ed_catat.setReadOnly(false);
		this.ed_catat.setLength(150);
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(166);
		this.lblTgl2.setLeft(20);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tanggal Jth Tempo");
		this.lblTgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(168);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
		
        uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(166);
		this.cb_curr.setWidth(150);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(166);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(190);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
			
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(212);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun ADP / UM");
		this.cb_akun.setText(""); 
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_ap = new portalui_saiCBBL(this);
		this.cb_ap.setLeft(20);
		this.cb_ap.setTop(234);
		this.cb_ap.setWidth(185);
		this.cb_ap.setCaption("Akun Hutang");
		this.cb_ap.setText(""); 
		this.cb_ap.setReadOnly(true);
		this.cb_ap.setLabelWidth(100);
		this.cb_ap.setRightLabelVisible(true);
		this.cb_ap.setRightLabelCaption("");
		
		this.cb_pph = new portalui_saiCBBL(this);
		this.cb_pph.setLeft(20);
		this.cb_pph.setTop(256);
		this.cb_pph.setWidth(185);
		this.cb_pph.setCaption("Akun PPh");
		this.cb_pph.setText(""); 
		this.cb_pph.setReadOnly(true);
		this.cb_pph.setLabelWidth(100);
		this.cb_pph.setRightLabelVisible(true);
		this.cb_pph.setRightLabelCaption("");
		
		this.cb_pemohon = new portalui_saiCBBL(this);
		this.cb_pemohon.setLeft(20);
		this.cb_pemohon.setTop(278);
		this.cb_pemohon.setWidth(185);
		this.cb_pemohon.setCaption("Dibuat Oleh");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setReadOnly(true);
		this.cb_pemohon.setLabelWidth(100);
		this.cb_pemohon.setRightLabelVisible(true);
		this.cb_pemohon.setRightLabelCaption("");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(300);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		
		this.cb_po = new portalui_saiCBBL(this);
		this.cb_po.setLeft(20);
		this.cb_po.setTop(322);
		this.cb_po.setWidth(220);
		this.cb_po.setCaption("No PO");
		this.cb_po.setText(""); 
		this.cb_po.setReadOnly(true);
		this.cb_po.setLabelWidth(100);
		this.cb_po.setRightLabelVisible(false);
		this.cb_po.setRightLabelCaption("");
		
		uses("portalui_imageButton");
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(245);
		this.bShow.setTop(322);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nbapp = new portalui_saiLabelEdit(this);
		this.ed_nbapp.setLeft(315);
		this.ed_nbapp.setTop(322);
		this.ed_nbapp.setWidth(200);
		this.ed_nbapp.setCaption("No Approve");
		this.ed_nbapp.setText(""); 
		this.ed_nbapp.setReadOnly(true);
		this.ed_nbapp.hide();
		
		this.cb_terima = new portalui_saiCBBL(this);
		this.cb_terima.setLeft(20);
		this.cb_terima.setTop(344);
		this.cb_terima.setWidth(220);
		this.cb_terima.setCaption("Penerima SPB");
		this.cb_terima.setText(""); 
		this.cb_terima.setReadOnly(true);
		this.cb_terima.setLabelWidth(100);
		this.cb_terima.setRightLabelVisible(true);
		this.cb_terima.setRightLabelCaption("");
		this.cb_terima.setTag("1");
		
		this.ed_sisapo = new portalui_saiLabelEdit(this);
		this.ed_sisapo.setLeft(20);
		this.ed_sisapo.setTop(366);
		this.ed_sisapo.setWidth(200);
		this.ed_sisapo.setTipeText(ttNilai);
		this.ed_sisapo.setAlignment(alRight);
		this.ed_sisapo.setCaption("Sisa PO");
		this.ed_sisapo.setText("0"); 
		this.ed_sisapo.setReadOnly(true);
		this.ed_sisapo.setTag("1");

		this.ed_sisappn = new portalui_saiLabelEdit(this);
		this.ed_sisappn.setLeft(315);
		this.ed_sisappn.setTop(366);
		this.ed_sisappn.setWidth(200);
		this.ed_sisappn.setTipeText(ttNilai);
		this.ed_sisappn.setAlignment(alRight);
		this.ed_sisappn.setCaption("Sisa PPN");
		this.ed_sisappn.setText("0"); 
		this.ed_sisappn.setReadOnly(true);
		this.ed_sisappn.setTag("1");

		this.ed_spb = new portalui_saiLabelEdit(this);
		this.ed_spb.setLeft(20);
		this.ed_spb.setTop(388);
		this.ed_spb.setWidth(200);
		this.ed_spb.setTipeText(ttNilai);
		this.ed_spb.setAlignment(alRight);
		this.ed_spb.setCaption("Nilai Tagihan PO");
		this.ed_spb.setText("0"); 
		this.ed_spb.setReadOnly(false);
		this.ed_spb.setTag("1");
		
		this.ed_ppn = new portalui_saiLabelEdit(this);
		this.ed_ppn.setLeft(315);
		this.ed_ppn.setTop(388);
		this.ed_ppn.setWidth(200);
		this.ed_ppn.setTipeText(ttNilai);
		this.ed_ppn.setAlignment(alRight);
		this.ed_ppn.setCaption("Nilai Tagihan PPN");
		this.ed_ppn.setText("0"); 
		this.ed_ppn.setReadOnly(false);
		this.ed_ppn.setTag("1");
				
		this.ed_pph = new portalui_saiLabelEdit(this);
		this.ed_pph.setLeft(20);
		this.ed_pph.setTop(410);
		this.ed_pph.setWidth(200);
		this.ed_pph.setTipeText(ttNilai);
		this.ed_pph.setAlignment(alRight);
		this.ed_pph.setCaption("Nilai PPh");
		this.ed_pph.setText("0"); 
		this.ed_pph.setReadOnly(false);
		this.ed_pph.setTag("1");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(315);
		this.ed_total.setTop(410);
		this.ed_total.setWidth(200);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setCaption("Nilai SPB");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
		this.ed_npo = new portalui_saiLabelEdit(this);
		this.ed_npo.setLeft(715);
		this.ed_npo.setTop(366);
		this.ed_npo.setWidth(200);
		this.ed_npo.setTipeText(ttNilai);
		this.ed_npo.setAlignment(alRight);
		this.ed_npo.setCaption("Nilai PO");
		this.ed_npo.setText("0"); 
		this.ed_npo.setReadOnly(true);
		this.ed_npo.setTag("1");
		this.ed_npo.hide();
		
		this.ed_nspb = new portalui_saiLabelEdit(this);
		this.ed_nspb.setLeft(715);
		this.ed_nspb.setTop(388);
		this.ed_nspb.setWidth(200);
		this.ed_nspb.setTipeText(ttNilai);
		this.ed_nspb.setAlignment(alRight);
		this.ed_nspb.setCaption("Nilai SPB");
		this.ed_nspb.setText("0"); 
		this.ed_nspb.setReadOnly(true);
		this.ed_nspb.setTag("1");
		this.ed_nspb.hide();
		
		this.ed_nba = new portalui_saiLabelEdit(this);
		this.ed_nba.setLeft(715);
		this.ed_nba.setTop(410);
		this.ed_nba.setWidth(200);
		this.ed_nba.setTipeText(ttNilai);
		this.ed_nba.setAlignment(alRight);
		this.ed_nba.setCaption("Nilai BA");
		this.ed_nba.setText("0"); 
		this.ed_nba.setReadOnly(true);
		this.ed_nba.setTag("1");
		this.ed_nba.hide();
		
		this.bFinal = new portalui_button(this);
		this.bFinal.setLeft(530);
		this.bFinal.setTop(410);
		this.bFinal.setCaption("Final");
		
		this.bTutup = new portalui_button(this);
		this.bTutup.setLeft(630);
		this.bTutup.setTop(410);
		this.bTutup.setCaption("Tutup");
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(432);
	    this.p1.setWidth(900);
	    this.p1.setHeight(120);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar SPB Termin');
		this.p1.hide();
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(93);
		this.sg1.setTag("2");
		this.sg1.setColTitle(new Array("No","No SPB","Deskripsi","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode Dept.","Nama Dept.","Kode DRK","Nama DRK"));
		
		uses('portalui_panel');
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(555);
	    this.p2.setWidth(900);
	    this.p2.setHeight(220);
	    this.p2.setName('p2');
	    this.p2.setCaption('Daftar Item Barang');
		this.p2.hide();
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p2);
    	this.sg2.setLeft(1);
		this.sg2.setTop(20);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(193);
		this.sg2.setTag("2");
		this.sg2.setColTitle(new Array("No","Kode Akun","Nama Akun","Kode Brg","Nama Barang","Satuan","Merk","Tipe","No Seri","Nilai","Lokasi","No Asset","Barcode","Nama Asset"));		

		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
		    uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_pp.onChange.set(this, "doEditChange");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.bGen.onClick.set(this, "genClick");
			this.bFinal.onClick.set(this, "genClick");
			this.bTutup.onClick.set(this, "genClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_ap.onBtnClick.set(this, "FindBtnClick");
			this.cb_pph.onBtnClick.set(this, "FindBtnClick");
			this.cb_pemohon.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_po.onBtnClick.set(this, "FindBtnClick");
			this.cb_po.onChange.set(this, "doEditChange");
			this.ed_spb.onChange.set(this, "doEditChange");
			this.ed_ppn.onChange.set(this, "doEditChange");
			this.ed_pph.onChange.set(this, "doEditChange");
			this.bShow.onClick.set(this, "showClick");
					
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
			//var pp = this.app._pp.split(";");
			//this.cb_pp.setText(pp[0]);
			//this.cb_pp.setRightLabelCaption(pp[1]);
			this.stsFinal = "F";
					
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fSpblog.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fSpblog.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fSpblog.prototype.simpan = function()
{
	if ( (new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.dp_tgl3.getDate()))
	{
		system.alert(this,"Tanggal tidak valid (kurang tgl invoice).","");
		return false;
	}
	
	if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
	{
		system.alert(this,"Tanggal tidak valid (melebihi tgl jatuh tempo).","");
		return false;
	}
	
	if (((nilaiToFloat(this.ed_spb.getText()) + nilaiToFloat(this.ed_ppn.getText())) <= 0) || (nilaiToFloat(this.ed_spb.getText()) > nilaiToFloat(this.ed_sisapo.getText())) || (nilaiToFloat(this.ed_ppn.getText()) > nilaiToFloat(this.ed_sisappn.getText())))
	{
		system.alert(this,"Nilai tidak valid.","Nilai SPB PO dan atau SPB PPN tidak valid.");
		return false;
	}
	
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			//---------------------------------- SPB
			var jenis = "PO_FINAL";
			if (this.stsFinal == "F") jenis = "PO_UMADP";
			sql.add("insert into spb_m (no_spb,no_dokumen,no_invoice,tgl_invoice,no_fpajak,tanggal,due_date,"+
					"keterangan,catatan,kode_curr,kurs,akun_hutang,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
					"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.ed_ref2.getText()+"','"+this.dp_tgl3.getDate()+"','"+this.ed_fppn.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','"+this.ed_desc.getText()+"','"+this.ed_catat.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_ap.getText()+"','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_terima.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','SPBLOG','"+jenis+"',"+parseNilai(this.ed_spb.getText())+","+parseNilai(this.ed_ppn.getText())+","+parseNilai(this.ed_pph.getText())+",'F','0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");

			sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.cb_akun.getText()+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_spb.getText())+",'"+this.cb_pp.getText()+"','-',"+
						"'"+this.app._lokasi+"','SPBLOG','ADPUM',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			
			if (this.ed_ppn.getText() != "0")
			{
				data = this.dbLib.runSQL("select flag from spro where kode_spro = 'PPNM' and kode_lokasi='"+this.app._lokasi+"'");
				var row = undefined;
				row = data.get(0);
				this.akunppn = row.get("flag");
			
				sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',2,'"+this.akunppn+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_ppn.getText())+",'"+this.cb_pp.getText()+"','-',"+
						"'"+this.app._lokasi+"','SPBLOG','PPNM',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			var z = nilaiToFloat(this.ed_spb.getText()) + nilaiToFloat(this.ed_ppn.getText()) - nilaiToFloat(this.ed_pph.getText()); 
			sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',3,'"+this.cb_ap.getText()+
						"','"+this.ed_desc.getText()+"','C',"+z+",'"+this.cb_pp.getText()+"','-',"+
						"'"+this.app._lokasi+"','SPBLOG','BYMHD',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
		
			if (this.ed_pph.getText() != "0")
			{
				sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',4,'"+this.cb_pph.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_pph.getText())+",'"+this.cb_pp.getText()+"','-',"+
						"'"+this.app._lokasi+"','SPBLOG','PPH',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			sql.add("insert into spb_d (no_spb,kode_lokasi,no_bukti,modul,sts_kapital) values "+	
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_po.getText()+"','PO','"+this.stsFinal+"')");
						
			//------------------------------------------------------ APP Asset
			if (this.stsFinal == "T")
			{
				sql.add("update po_m set progress='1' where no_po='"+this.cb_po.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into fa_app (no_faapp,no_dokumen,no_spb,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
						"('"+this.ed_nbapp.getText()+"','"+this.ed_ref1.getText()+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'-',"+parseNilai(this.ed_nba.getText())+",'"+
						this.cb_pp.getText()+"','-','SPB','F','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
						"'"+this.app._userLog+"','now()')");
						
				var scr1 = "insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
				var awal = true;
				var line = undefined;
				var nu = 0;
				for (var i in this.gridJurnal2.objList)
				{
					if (!awal) { scr1 += ",";}
					nu++;
					line = this.gridJurnal2.get(i);
					scr1 += "('"+this.ed_nbapp.getText()+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"',"+nu+",'"+line.get("kode_akun")+
						 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+this.cb_pp.getText()+"','"+this.drk+"',"+
							"'"+this.app._lokasi+"','FA_APP','ASSET','"+this.ed_period.getText()+
							"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())";
					awal = false;
				}
				for (var i in this.gridJurnal.objList)
				{
					line = this.gridJurnal.get(i);
					nu++;
					scr1 += ",";
					scr1 += "('"+this.ed_nbapp.getText()+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"',"+nu+",'"+line.get("kode_akun")+
						 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+this.cb_pp.getText()+"','"+this.drk+"',"+
							"'"+this.app._lokasi+"','FA_APP','SPB','"+this.ed_period.getText()+
							"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())";
				}
				nu++;
				scr1 += ",";
				scr1 += "('"+this.ed_nbapp.getText()+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"',"+nu+",'"+this.cb_akun.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_spb.getText())+",'"+this.cb_pp.getText()+"','"+this.drk+"',"+
						"'"+this.app._lokasi+"','FA_APP','UMADP','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())";
							
				sql.add(scr1);

				for (var i=1; i <= this.sg1.getRowCount(); i++)
				{			
					sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+	
							"('"+this.ed_nbapp.getText()+"','-','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(3,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(7,i))+",'SPB')");
				}
				for (var i=1; i <= this.sg2.getRowCount(); i++)
				{			
					sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+	
							"('"+this.ed_nbapp.getText()+"','"+this.sg2.getCell(11,i)+"','-','"+this.sg2.getCell(1,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg2.getCell(9,i))+",'FA')");
					sql.add("update fa_asset set progress='1' where no_fa='"+this.sg2.getCell(11,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
window.app_saku_logistik_transaksi_fSpblog.prototype.doModalResult = function(event, modalResult)
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
				//var pp = this.app._pp.split(";");
				//this.cb_pp.setText(pp[0]);
				//this.cb_pp.setRightLabelCaption(pp[1]);
				this.stsFinal = "F";
			}
			break;
		
		case "simpan" :		
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if ((this.stsFinal == "T") && (nilaiToFloat(this.ed_nspb.getText()) + nilaiToFloat(this.ed_spb.getText())) != nilaiToFloat(this.ed_nba.getText()) 
			    && (nilaiToFloat(this.ed_nba.getText()) != nilaiToFloat(this.ed_npo.getText())))
			{
				system.alert(this,"Nilai SPB tidak valid.","Nilai SPB,nilai BA dan nilai PO tidak sama.");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
			}
			else this.simpan();
			break;
			
		case "simpancek" : this.simpan();
			break;	
	}
};
window.app_saku_logistik_transaksi_fSpblog.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bTutup)
		{
			this.p1.hide(); this.p2.hide();
			this.ed_nbapp.hide();
			this.ed_npo.hide(); this.ed_nba.hide(); this.ed_nspb.hide();
		}
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.ed_period.getText().substr(2,4)+".",'0000'));
				//this.ed_ref1.setFocus();
				if (this.stsFinal == "T")
				{
					this.ed_nbapp.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_app','no_faapp',this.app._lokasi+"-ASA"+this.ed_period.getText().substr(2,4)+".",'0000'));
				}
			}
			else
			{
				system.alert(this,"Periode harus valid.","");
			}
		}
		
		if (sender == this.bFinal)
		{
			this.ed_spb.setText(this.ed_sisapo.getText());
			this.ed_ppn.setText(this.ed_sisappn.getText());
			this.sg1.clearAll(); this.sg2.clearAll();
			this.stsFinal = "T";
			this.ed_nbapp.show();
			this.p1.show(); this.p2.show();
			this.ed_npo.show(); this.ed_nba.show(); this.ed_nspb.show();
			this.ed_nbapp.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_app','no_faapp',this.app._lokasi+"-ASA"+this.ed_period.getText().substr(2,4)+".",'0000'));
			
			if ((nilaiToFloat(this.ed_spb.getText()) == nilaiToFloat(this.ed_sisapo.getText())) && (nilaiToFloat(this.ed_ppn.getText()) == nilaiToFloat(this.ed_sisappn.getText())) && (nilaiToFloat(this.ed_total.getText()) != 0))
			{
				if (this.app._dbEng == "mysqlt")
				{
					var data = this.dbLib.runSQL(" select a.no_spb,a.keterangan as deskripsi, c.kode_akun, e.nama as nama_akun,c.keterangan,c.dc,c.nilai,c.kode_pp,ifnull(f.nama,'-') as nama_pp,c.kode_drk,ifnull(g.nama,'-') as nama_drk  "+
													  " from spb_m a inner join spb_d b on a.kode_lokasi=b.kode_lokasi and a.no_spb=b.no_spb "+
													  "              inner join spb_j c on a.kode_lokasi=a.kode_lokasi and a.no_spb=c.no_spb "+
													  "              inner join flag_relasi d on c.kode_lokasi=d.kode_lokasi and c.kode_akun=d.kode_akun "+
													  "              inner join masakun e  on e.kode_lokasi=c.kode_lokasi and c.kode_akun=e.kode_akun "+
													  "              left outer join pp f  on f.kode_lokasi=c.kode_lokasi and c.kode_pp=f.kode_pp "+
													  "              left outer join drk g on g.kode_lokasi=c.kode_lokasi and c.kode_drk=g.kode_drk and g.tahun=substring(c.periode,1,4) "+
													  " where b.no_bukti = '"+this.cb_po.getText()+"' and b.modul='PO' and a.no_del='-' and c.dc='D' and d.kode_flag in ('013','014') and b.sts_kapital='F'");		
				}	
				else
				{
					if (this.app._dbEng == "ado_mssql")
					{
					}
				}
				if (data instanceof portalui_arrayMap)
				{
					this.sg1.setData(data);
					var tot = 0;
					for (var i in data.objList)
					{
						tot += parseFloat(data.get(i).get("nilai"));
					}
					this.ed_nspb.setText(floatToNilai(tot));
				}else alert(rs);
				
				//------------------------------------ gridjurnal SPB		
				var row,dtJurnal = new portalui_arrayMap();
				var nemu = false;
				var dtJrnl = 0;
				var line = undefined;
				for (var i in this.sg1.data.objList)
				{
					line = this.sg1.data.get(i);
					kdAkun = this.sg1.data.get(i).get("kode_akun");			
					
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
						
				var data = this.dbLib.runSQL(" select b.kode_akun,c.nama as nama_akun,g.kode_brg,g.nama as nama_brg,f.kode_sat,f.merk,f.tipe,f.no_seri,f.harga,d.nama as nama_lok,a.no_fa,a.barcode,a.nama "+
											 " from fa_asset a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
											 "                 inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
											 "                 inner join fa_lokasi d on a.kode_lokfa=d.kode_lokfa and a.kode_lokasi=d.kode_lokasi "+
											 "                 inner join fa_d e on a.no_fa=e.no_fa and e.kode_lokasi=a.kode_lokasi "+
											 "                 inner join tr_d f on e.no_tag=f.no_tag and e.kode_lokasi=a.kode_lokasi "+
											 "                 inner join barang_m g on f.kode_brg=g.kode_brg and g.kode_lokasi=f.kode_lokasi "+
											 "                 inner join tr_m h on f.no_tr=h.no_tr and f.kode_lokasi=h.kode_lokasi "+
											 " where a.progress='0' and a.kode_lokasi = '"+this.app._lokasi+"' and h.no_po='"+this.cb_po.getText()+"'");		
				if (data instanceof portalui_arrayMap)
				{
					this.sg2.setData(data);
					var tot = 0;
					for (var i in data.objList)
					{
						tot += parseFloat(data.get(i).get("harga"));
					}
					this.ed_nba.setText(floatToNilai(tot));
				}else alert(rs);
				
				//------------------------------------ gridjurnal BA
				var row,dtJurnal = new portalui_arrayMap();
				var nemu = false;
				var dtJrnl = 0;
				var line = undefined;
				for (var i in this.sg2.data.objList)
				{
					line = this.sg2.data.get(i);
					kdAkun = this.sg2.data.get(i).get("kode_akun");			
					
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
						row.set("dc","D");
						row.set("keterangan",this.ed_desc.getText());
						row.set("nilai",parseFloat(this.sg2.data.get(i).get("harga")));
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {
						dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg2.data.get(i).get("harga")));				
					}
				}
				this.gridJurnal2 = dtJurnal;
			}
			else
			{
				system.alert(this,"Data SPB belum final.","");
			}
		}
		
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fSpblog.prototype.showClick = function(sender)
{
	try
	{
		if (this.app._dbEng == "mysqlt")
		{
			var line,data = this.dbLib.runSQL(" select a.nilai-ifnull(c.nilai_spb,0) as sisa_po,a.nilai_ppn-ifnull(c.ppn_spb,0) as sisa_ppn,b.nama as nama_vendor,b.kode_vendor,a.kode_curr,a.kurs,a.nilai,d.kode_drk "+
			                                  " from po_m a inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
											  "             inner join pr_m d on a.no_po = d.no_po and a.kode_lokasi=d.kode_lokasi "+
											  "             left outer join (select x.kode_lokasi,y.no_bukti,sum(x.nilai) as nilai_spb, sum(x.nilai_ppn) as ppn_spb "+
											  "                              from spb_m x inner join spb_d y on x.no_spb=y.no_spb and y.modul='PO' "+
											  "                              where x.no_del='-' and x.kode_lokasi='"+this.app._lokasi+"' group by x.kode_lokasi,y.no_bukti) c on a.no_po=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
											  " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-' and a.no_po='"+this.cb_po.getText()+"'");											 
		}
		else
		{
			if (this.app._dbEng == "ado_mssql")
			{
		
			}
		}
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.drk = line.get("kode_drk");
				this.ed_npo.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_sisapo.setText(floatToNilai(parseFloat(line.get("sisa_po"))));
				this.ed_sisappn.setText(floatToNilai(parseFloat(line.get("sisa_ppn"))));
				this.cb_terima.setText(line.get("kode_vendor"));
				this.cb_terima.setRightLabelCaption(line.get("nama_vendor"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(parseFloat(line.get("kurs"))));
			} 
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fSpblog.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0" + month;
    this.ed_period.setText(year.toString()+month);
	this.dp_tgl3.setText(this.dp_tgl1.getText());
};
window.app_saku_logistik_transaksi_fSpblog.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
	
	if ((sender == this.ed_spb) || (sender == this.ed_ppn) || (sender == this.ed_pph)) 
	{
		var neto = nilaiToFloat(this.ed_spb.getText()) + nilaiToFloat(this.ed_ppn.getText()) - nilaiToFloat(this.ed_pph.getText());
		this.ed_total.setText(floatToNilai(neto));
	}
		
	if (sender == this.cb_curr)
	{
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
	
	if (sender == this.cb_pp)
	{
		if (this.cb_pp.getText() != "")
		{
			this.initial = this.dbLib.loadQuery("select initial from pp where kode_pp = '"+this.cb_pp.getText()+"'");
			if (this.initial != undefined) 
			{
			    if  (this.initial != "") 
				{
					this.initial = this.initial.split("\r\n");
					this.initial = this.initial[1];					
				}
			}
		}
		else
		{
			this.cb_pp.setRightLabelCaption("");
			this.ed_nb.setText("");
		}
	}	
};
window.app_saku_logistik_transaksi_fSpblog.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where",new Array("Kode Curr","Nama"),false);
		}
		
		if (sender == this.cb_akun) 
		{   
		    this.standarLib.showListData(this, "Daftar Akun ADP / UM",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag in('013','014')",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag in('013','014')",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
		}
		
		if (sender == this.cb_ap) 
		{   
		    this.standarLib.showListData(this, "Daftar Akun Hutang SPB",this.cb_ap,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='004'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='004'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
		}

		if (sender == this.cb_pph) 
		{   
		    this.standarLib.showListData(this, "Daftar Akun PPh",this.cb_pph,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag ='015'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag ='015'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
		}
		
		if (sender == this.cb_pp) 
		{   
		    this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode Dept","Nama"),false);
		}
		
		if (sender == this.cb_pemohon) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat SPB",this.cb_pemohon,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	
		if (sender == this.cb_po) 
		{   
		    this.standarLib.showListData(this, "Daftar Purchase Order",this.cb_po,undefined, 
										  "select no_po, keterangan  from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and progress in('1','9')",
										  "select count(no_po)       from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and progress in('1','9')",
										  new Array("no_po","keterangan"),"and",new Array("No PO","Keterangan"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fSpblog.prototype.doRequestReady = function(sender, methodName, result)
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