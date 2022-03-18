window.app_saku_kb_fSpbkb = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_fSpbkb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_fSpbkb";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Perintah Bayar [SPB] : Input", 0);	
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(145);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		this.ed_period.onChange.set(this, "doEditChange");
	
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
		this.dp_tgl1.onSelect.set(this, "doSelect");
	
		uses("portalui_saiCBBL");
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(54);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen");
		this.cb_pp.setText(""); 
		this.cb_pp.setReadOnly(false);
		this.cb_pp.onExit.set(this, "EditExit");
		this.cb_pp.onChange.set(this, "doEditChange");
		this.cb_pp.onKeyPress.set(this, "keyPress");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption(" ");
		
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(76);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No SPB");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(76);
		this.bGen.setCaption("Gen");
		this.bGen.onClick.set(this, "genClick");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.ed_ref1 = new portalui_saiLabelEdit(this);
		this.ed_ref1.setLeft(20);
		this.ed_ref1.setTop(98);
		this.ed_ref1.setWidth(300);
		this.ed_ref1.setCaption("No Dokumen Ref.");
		this.ed_ref1.setText(""); 
		this.ed_ref1.setReadOnly(false);
		this.ed_ref1.setLength(50);
	    
		this.ed_ppn = new portalui_saiLabelEdit(this);
		this.ed_ppn.setLeft(323);
		this.ed_ppn.setTop(98);
		this.ed_ppn.setWidth(198);
		this.ed_ppn.setLabelWidth(99);
		this.ed_ppn.setCaption("Faktur Pajak");
		this.ed_ppn.setText(""); 
		this.ed_ppn.setReadOnly(false);
		this.ed_ppn.setLength(16);
		
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
		this.cb_curr.setText("IDR");
		this.cb_curr.setReadOnly(false);
		this.cb_curr.onExit.set(this, "EditExit");
		this.cb_curr.onChange.set(this, "doEditChange");
		this.cb_curr.onKeyPress.set(this, "keyPress");
		this.cb_curr.onBtnClick.set(this, "FindBtnClick");
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		//this.cb_curr.setRightLabelCaption(" ");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(166);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setReadOnly(true);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(190);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
			
		this.cb_ap = new portalui_saiCBBL(this);
		this.cb_ap.setLeft(20);
		this.cb_ap.setTop(212);
		this.cb_ap.setWidth(185);
		this.cb_ap.setCaption("Akun Hutang");
		this.cb_ap.setText(""); 
		this.cb_ap.setReadOnly(false);
		this.cb_ap.onExit.set(this, "EditExit");
		this.cb_ap.onChange.set(this, "doEditChange");
		this.cb_ap.onKeyPress.set(this, "keyPress");
		this.cb_ap.onBtnClick.set(this, "FindBtnClick");
		this.cb_ap.setLabelWidth(100);
		this.cb_ap.setRightLabelVisible(true);
		this.cb_ap.setRightLabelCaption(" ");
				
        this.cb_pemohon = new portalui_saiCBBL(this);
		this.cb_pemohon.setLeft(20);
		this.cb_pemohon.setTop(234);
		this.cb_pemohon.setWidth(185);
		this.cb_pemohon.setCaption("Dibuat Oleh");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setReadOnly(false);
		this.cb_pemohon.onExit.set(this, "EditExit");
		this.cb_pemohon.onChange.set(this, "doEditChange");
		this.cb_pemohon.onKeyPress.set(this, "keyPress");
		this.cb_pemohon.onBtnClick.set(this, "FindBtnClick");
		this.cb_pemohon.setLabelWidth(100);
		this.cb_pemohon.setRightLabelVisible(true);
		this.cb_pemohon.setRightLabelCaption(" ");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(256);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(false);
		this.cb_setuju.onExit.set(this, "EditExit");
		this.cb_setuju.onChange.set(this, "doEditChange");
		this.cb_setuju.onKeyPress.set(this, "keyPress");
		this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption(" ");
		
        this.cb_terima = new portalui_saiCBBL(this);
		this.cb_terima.setLeft(20);
		this.cb_terima.setTop(278);
		this.cb_terima.setWidth(185);
		this.cb_terima.setCaption("Penerima SPB");
		this.cb_terima.setText(""); 
		this.cb_terima.setReadOnly(false);
		this.cb_terima.onExit.set(this, "EditExit");
		this.cb_terima.onChange.set(this, "doEditChange");
		this.cb_terima.onKeyPress.set(this, "keyPress");
		this.cb_terima.onBtnClick.set(this, "FindBtnClick");
		this.cb_terima.setLabelWidth(100);
		this.cb_terima.setRightLabelVisible(true);
		this.cb_terima.setRightLabelCaption(" ");
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(620);
		this.ed_debet.setTop(234);
		this.ed_debet.setWidth(200);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);

		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(620);
		this.ed_kredit.setTop(256);
		this.ed_kredit.setWidth(200);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);

		this.ed_spb = new portalui_saiLabelEdit(this);
		this.ed_spb.setLeft(620);
		this.ed_spb.setTop(278);
		this.ed_spb.setWidth(200);
		this.ed_spb.setTipeText(ttNilai);
		this.ed_spb.setAlignment(alRight);
		this.ed_spb.setCaption("Nilai SPB");
		this.ed_spb.setText("0"); 
		this.ed_spb.setReadOnly(true);
		
		uses("portalui_pageControl");
		this.pControl = new portalui_pageControl(this);
		this.pControl.setBGColor(system.getConfig("form.color"));
		this.pControl.setLeft(20);
		this.pControl.setTop(300);
		this.pControl.setWidth(800);
		this.pControl.setHeight(165);
		
		uses("portalui_childPage");
		this.page1 = new portalui_childPage(this.pControl);
		this.page1.setCaption("NPKO");
         
		uses("portalui_saiGrid");
    	this.sg2 = new portalui_saiGrid(this.page1);
    	this.sg2.setLeft(1);
		this.sg2.setTop(5);
    	this.sg2.setWidth(795);
    	this.sg2.setHeight(120);
    	this.sg2.onEllipsClick.set(this, "doFindBtnClick2");
    	this.sg2.onChange.set(this,"sg2onChange");
    	this.sg2.setColCount(12);
		this.sg2.columns.get(11).setColWidth(100);
		this.sg2.columns.get(10).setColWidth(60);
		this.sg2.columns.get(9).setColWidth(100);
		this.sg2.columns.get(8).setColWidth(60);
		this.sg2.columns.get(7).setColWidth(80);
		this.sg2.columns.get(6).setColWidth(120);
		this.sg2.columns.get(5).setColWidth(80);
		this.sg2.columns.get(4).setColWidth(100);
		this.sg2.columns.get(3).setColWidth(60);
		this.sg2.columns.get(2).setColWidth(60);
		this.sg2.columns.get(1).setColWidth(150);
		this.sg2.columns.get(0).setColWidth(120);
		this.sg2.setReadOnly(false);
		this.sg2.columns.get(0).setTitle("No NPKO");
		this.sg2.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(1).setTitle("Lingkup");
    	this.sg2.columns.get(1).setReadOnly(true);
		this.sg2.columns.get(2).setTitle("Tanggal");
    	this.sg2.columns.get(2).setReadOnly(true);
		this.sg2.columns.get(3).setTitle("Kode Dept.");
    	this.sg2.columns.get(3).setReadOnly(true);
		this.sg2.columns.get(4).setTitle("Nama Dept.");
    	this.sg2.columns.get(4).setReadOnly(true);
		this.sg2.columns.get(5).setTitle("Kode MTA");
    	this.sg2.columns.get(5).setReadOnly(true);
		this.sg2.columns.get(6).setTitle("Nama MTA");
    	this.sg2.columns.get(6).setReadOnly(true);
		this.sg2.columns.get(7).setTitle("Nilai");
		this.sg2.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(7).setReadOnly(true);
		this.sg2.columns.get(7).setColor("#cdf4ff");
		this.sg2.columns.get(8).setTitle("Kode Keg.");
    	this.sg2.columns.get(8).setReadOnly(true);
		this.sg2.columns.get(9).setTitle("Nama Keg.");
    	this.sg2.columns.get(9).setReadOnly(true);
		this.sg2.columns.get(10).setTitle("Kode Ref.");
    	this.sg2.columns.get(10).setReadOnly(true);
		this.sg2.columns.get(11).setTitle("Nama Ref.");
    	this.sg2.columns.get(11).setReadOnly(true);
		
    	uses("portalui_sgNavigator");
    	this.sgn2 = new portalui_sgNavigator(this.page1);
    	this.sgn2.setTop(130);
    	this.sgn2.setLeft(1);
    	this.sgn2.setWidth(800);
    	this.sgn2.setGrid(this.sg2);
    	this.sgn2.setColor("#D0D0C0");
    	this.sgn2.setButtonStyle(2);
		
    
		this.page2 = new portalui_childPage(this.pControl);
		this.page2.setCaption("Jurnal Peruntukan");
    	this.sg1 = new portalui_saiSG(this.page2); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(5);
	    this.sg1.setWidth(795);
	    this.sg1.setHeight(120);
	    this.sg1.setColCount(12);
		this.sg1.columns.get(11).setColWidth(60);
		this.sg1.columns.get(10).setColWidth(100);
		this.sg1.columns.get(9).setColWidth(80);
		this.sg1.columns.get(8).setColWidth(100);
		this.sg1.columns.get(7).setColWidth(80);
		this.sg1.columns.get(6).setColWidth(100);
		this.sg1.columns.get(5).setColWidth(60);
		this.sg1.columns.get(4).setColWidth(80);
		this.sg1.columns.get(3).setColWidth(30);
		this.sg1.columns.get(2).setColWidth(200);
		this.sg1.columns.get(1).setColWidth(120);
		this.sg1.columns.get(0).setColWidth(80);
	    this.sg1.setReadOnly(false);
		this.sg1.onEllipsClick.set(this, "doFindBtnClick");
		this.sg1.onNilaiChange.set(this, "doNilaiChange");
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.columns.get(0).setTitle("Kode Akun");
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setTitle("Nama Akun");
		this.sg1.columns.get(1).setReadOnly(true);
		this.sg1.columns.get(2).setTitle("Keterangan");
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		this.sg1.columns.get(3).setTitle("DC");
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(4).setTitle("Nilai");
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(4).setColor("#cdf4ff");
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(5).setTitle("Kode PP");
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(6).setTitle("Nama PP");
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(7).setTitle("Kode Keg.");
		this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(8).setTitle("Nama Keg.");
		this.sg1.columns.get(9).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(9).setTitle("Kode Ref.");
		this.sg1.columns.get(10).setReadOnly(true);
		this.sg1.columns.get(10).setTitle("Nama Ref.");
		this.sg1.columns.get(11).setButtonStyle(window.bsAuto);
		this.sg1.columns.get(11).setTitle("Jenis");
		
		this.sgn = new portalui_sgNavigator(this.page2);
		this.sgn.setTop(130);
		this.sgn.setLeft(1);
		this.sgn.setWidth(800);
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
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR");
			this.ed_kurs.setText("1");
			this.sg1.clear();
			this.sg2.clear();
			if (this.sg2.getRowCount() == 0) this.sg2.appendRow();
			
			var val = this.dbLib.loadQuery("select jenis from jenis where jenis in ('PPN','PPH','SPB') ");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						val1.set(j,val[j].split(";"));
					}
				}
			this.sg1.columns.get(11).setPicklist(val1);
			
	
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]);
			this.cb_pp.setRightLabelCaption(pp[1]);
			
			spro = this.dbLib.runSQL("select a.flag,b.nama from spro a inner join masakun b on a.flag=kode_akun where a.kode_spro = 'HUTSPB'");
			var row = undefined;
			row = spro.get(0);
			this.cb_ap.setText(row.get("flag"));
			this.cb_ap.setRightLabelCaption(row.get("nama"));
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_fSpbkb.extend(window.portalui_childForm);
window.app_saku_kb_fSpbkb.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_fSpbkb.prototype.simpan = function()
{
	
	for (var i=0; i < this.sg2.rows.getLength(); i++)
	{
		if ( (new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg2.getCell(2,i)) )
		{
			system.alert(this,"Tanggal Spb kurang dari tanggal NPKO [baris "+i+"].","");
			return false;
		}
		
		for (var j=0; j < this.sg2.rows.getLength(); i++)
		{
			if (((this.sg2.getCell(0,i)) == (this.sg2.getCell(0,j))) && (i != j) )
			{
				var a = i+1; var b = j+1;
				system.alert(this,"NPKO tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
				return false;
			}
		}		
	}
	
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
	
	if (nilaiToFloat(this.ed_spb.getText()) <= 0)
	{
		system.alert(this,"Nilai tidak valid.","");
		return false;
	}
	
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			sql.add("insert into spb_m (no_spb,no_dokumen,no_invoice,tgl_invoice,no_fpajak,tanggal,due_date,"+
					"keterangan,catatan,kode_curr,kurs,akun_hutang,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
					"modul,nilai,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.ed_ref2.getText()+"','"+this.dp_tgl3.getDate()+"','"+this.ed_ppn.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','"+this.ed_desc.getText()+"','"+this.ed_catat.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_ap.getText()+"','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_terima.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','SPB',"+parseNilai(this.ed_spb.getText())+","+parseNilai(this.ed_kredit.getText())+",'F','0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now()) ");
		
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
						"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+
						"','"+this.sg1.getCell(9,i)+"','"+this.app._lokasi+"','SPB','"+this.sg1.getCell(11,i)+
						"','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			}
			sql.add("insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_ref1.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.cb_ap.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_spb.getText())+",'"+this.cb_pp.getText()+"','-',"+
						"'-','"+this.app._lokasi+"','SPB','BYMHD',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
		
			for (var i=0; i < this.sg2.rows.getLength(); i++)
			{
				sql.add("update npko set progress='1' where no_npko='"+this.sg2.getCell(0,i)+"'");
				sql.add("insert into spb_d (no_spb,no_npko) values ('"+this.ed_nb.getText()+"','"+this.sg2.getCell(0,i)+"') ");
			}
			this.dbLib.execArraySQL(sql);	
			
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_fSpbkb.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR");
				this.ed_kurs.setText("1");
				this.sg1.clear();
				this.sg2.clear();
				if (this.sg2.getRowCount() == 0) this.sg2.appendRow();
			
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]);
				this.cb_pp.setRightLabelCaption(pp[1]);
				
				spro = this.dbLib.runSQL("select a.flag,b.nama from spro a inner join masakun b on a.flag=kode_akun where a.kode_spro = 'HUTSPB'");
				var row = undefined;
				row = spro.get(0);
				this.cb_ap.setText(row.get("flag"));
				this.cb_ap.setRightLabelCaption(row.get("nama"));
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
				system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
			}
			else this.simpan();
			break;
			
		case "simpancek" : this.simpan();
			break;
		
		case "ubah" :
			if (modalResult == mrOk)
			{
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
		   }
			break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_kb_fSpbkb.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_saku_kb_fSpbkb.prototype.genClick = function(sender)
{
	try
	{
		if (this.cb_pp.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',"SPB/"+this.initial+"/"+this.ed_period.getText().substr(2,6)+"/",'00000'));
			this.ed_ref1.setFocus();
		}
		else
		{
			system.alert(this,"Periode dan Departemen harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_fSpbkb.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0" + month;
    this.ed_period.setText(year.toString()+month);
	this.dp_tgl3.setText(this.dp_tgl1.getText());
};
window.app_saku_kb_fSpbkb.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_curr)
	{
		this.sg2.clear();
		if (this.sg2.getRowCount() == 0) this.sg2.appendRow();
		this.sg1.clear();
		if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
		
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
window.app_saku_kb_fSpbkb.prototype.EditExit = function(sender)
{
};
window.app_saku_kb_fSpbkb.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where");
		}
		
		if (sender == this.cb_ap) 
		{   
		    this.standarLib.showListData(this, "Daftar Akun Hutang SPB",this.cb_ap,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag='004' and b.kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(a.kode_akun)  from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag='004' and b.kode_lokasi ='"+this.app._lokasi+"'",
										  new Array("a.kode_akun","a.nama"),"and");
		}

		if (sender == this.cb_pp) 
		{   
		    this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_pp","nama"),"and");
		}
		
		if (sender == this.cb_pemohon) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat SPB",this.cb_pemohon,undefined, 
										  "select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' ",
										  "select count(nik) from karyawan where kode_pp='"+this.cb_pp.getText()+"'",
										  new Array("nik","nama"),"and");
		}
	
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama from karyawan  ",
										  "select count(nik) from karyawan ",
										  new Array("nik","nama"),"where");
		}
	
		if (sender == this.cb_terima) 
		{   
		    this.standarLib.showListData(this, "Daftar Penerima",this.cb_terima,undefined, 
										  "select nik, nama from karyawan  union select kode_vendor as nik , nama from vendor ",
										  "select count(nik) from (select nik from karyawan union select kode_vendor as nik from vendor)  ",
										  new Array("nik","nama"),"where");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_fSpbkb.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag<>'999' and b.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag<>'999' and b.kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("a.kode_akun","a.nama"),"and");
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar Departemen",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("kode_pp","nama"),"and");
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar Kegiatan",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"'",
												  new Array("a.kode_drk","a.nama"),"and");
				break;
			case 9 : // ref/peruntukan ...seperti patrakom misal utk cust mana biaya ini dialokasikan..
				this.standarLib.showListDataForSG(this, "Daftar Referensi Peruntukan",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_cust, nama from cust ",
												  "select count(kode_cust) from cust",
												  new Array("kode_cust","nama"),"and");
				break;
				
				
		}
	}catch(e)
	{
		alert("[app_saku_kb_fSpbkb] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_fSpbkb.prototype.doFindBtnClick2 = function(sender, col, row) {
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Nota Proses Kegiatan Operasional",this.sg2, this.sg2.row, this.sg2.col, 
												  "select no_npko, lingkup from npko where kode_pp='"+this.cb_pp.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"'",
												  "select count(no_npko) from npko where kode_pp='"+this.cb_pp.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"'",
												  new Array("no_npko","lingkup"),"and");	
				break;
		}
	}catch(e)
	{
		alert("[app_saku_kb_fSpbkb] : doFindBtnClick : " + e);
	}
};
window.app_saku_kb_fSpbkb.prototype.sg2onChange = function(sender, col , row)
{
	if (col==0)
	{
	    if (this.sg2.getCell(col,row) != "")
		{
			try
		    {
				var temp = this.dbLib.loadQuery("select a.lingkup,a.tanggal,a.kode_pp,b.nama as nama_pp,"+
				                                "a.kode_akun,c.nama as nama_akun,a.nilai, "+
												"a.kode_drk,d.nama as nama_drk,a.kode_cust,e.nama as nama_cust "+
						                        "from npko a inner join pp b on a.kode_pp=b.kode_pp "+
												"            inner join masakun c on a.kode_akun = c.kode_akun "+
												"            inner join drk d on a.kode_drk = d.kode_drk "+
												"            inner join cust e on a.kode_cust = e.kode_cust "+
												"where a.no_npko='"+this.sg2.getCell(col,row)+"'");  
												
				if (temp != undefined)
				{
					var baris = temp.split("\r\n");
					var data = baris[1].split(";");
					this.sg2.setCell(1,row,data[0]);	
						
					var dt=data[1].split(" ");
					var tgl=dt[0].split("-");
					data[1]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
					
					this.sg2.setCell(2,row,data[1]);
					this.sg2.setCell(3,row,data[2]);
					this.sg2.setCell(4,row,data[3]);
					this.sg2.setCell(5,row,data[4]);
					this.sg2.setCell(6,row,data[5]);
				
					var z = parseFloat(data[6]) / nilaiToFloat(this.ed_kurs.getText());
					this.sg2.setCell(7,row,floatToNilai(z));	
					
					this.sg2.setCell(8,row,data[7]);
					this.sg2.setCell(9,row,data[8]);	
					this.sg2.setCell(10,row,data[9]);
					this.sg2.setCell(11,row,data[10]);	
					
					this.sg1.appendRow();
					this.sg1.setCell(0,row,this.sg2.getCell(5,row));
					this.sg1.setCell(1,row,this.sg2.getCell(6,row));
					this.sg1.setCell(2,row,this.sg2.getCell(1,row));
					this.sg1.setCell(3,row,"D");
					this.sg1.setCell(4,row,this.sg2.getCell(7,row));
					this.sg1.setCell(5,row,this.sg2.getCell(3,row));
					this.sg1.setCell(6,row,this.sg2.getCell(4,row));
					this.sg1.setCell(7,row,this.sg2.getCell(8,row));
					this.sg1.setCell(8,row,this.sg2.getCell(9,row));
					this.sg1.setCell(9,row,this.sg2.getCell(10,row));
					this.sg1.setCell(10,row,this.sg2.getCell(11,row));
					this.sg1.setCell(11,row,"SPB");
					this.sg1.validasi();
				}
		    }
			catch(e)
		    {
		        alert("sg2onChange "+e);
		    }
	      
		}
	}
};
window.app_saku_kb_fSpbkb.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = spb = 0;
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				if (this.sg1.getCell(3, i) == "D")					
					totD += nilaiToFloat(this.sg1.getCell(4,i));
				if (this.sg1.getCell(3, i) == "C")
					totC += nilaiToFloat(this.sg1.getCell(4,i));
			}
		}
		
		if ((totD != 0) || (totC != 0))
		{
			spb = totD - totC;
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
			this.ed_spb.setText(floatToNilai(spb));
		}
	}catch(e)
	{
		alert("[app_saku_kb_fSpbkb]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_fSpbkb.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_fSpbkb.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
    		}
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};