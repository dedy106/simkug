window.app_saku_fa_transaksi_fFaapp = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaapp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaapp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kapitalisasi Asset Non PO: Input", 0);	
		
		
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
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
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
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency - Kurs");
		this.cb_curr.setText(""); 
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setRightLabelCaption("");	
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(40);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setText(""); 
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(142);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 		
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(164);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 		
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(186);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 		
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(208);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("RKM");
		this.cb_drk.setText(""); 		
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");
		
		uses("portalui_saiCB");		
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(735);
		this.cb_jenis.setTop(208);
		this.cb_jenis.setWidth(188);
		this.cb_jenis.setCaption("Jns Kapitalisasi");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem("S","SPB");
		this.cb_jenis.addItem("B","BARU");
		this.cb_jenis.setTag("9");
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.setLabelWidth(85);
		
		this.cb_fa = new portalui_saiCBBL(this);
		this.cb_fa.setLeft(20);
		this.cb_fa.setTop(230);
		this.cb_fa.setWidth(220);
		this.cb_fa.setCaption("Data Asset");
		this.cb_fa.setText(""); 
		this.cb_fa.setReadOnly(true);
		this.cb_fa.setLabelWidth(100);
		this.cb_fa.setRightLabelVisible(true);
		this.cb_fa.setRightLabelCaption("");	
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(240);
		this.ed_barcode.setTop(230);
		this.ed_barcode.setWidth(100);
		this.ed_barcode.setLabelWidth(0);
		this.ed_barcode.setHint("No Inventori");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(true);
		this.ed_barcode.setTag("1");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(345);
		this.ed_nama.setTop(230);
		this.ed_nama.setWidth(213);
		this.ed_nama.setLabelWidth(0);
		this.ed_nama.setHint("Deskripsi");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setTag("1");
		
		this.ed_klpfa = new portalui_saiLabelEdit(this);
		this.ed_klpfa.setLeft(565);
		this.ed_klpfa.setTop(230);
		this.ed_klpfa.setWidth(80);
		this.ed_klpfa.setLabelWidth(0);
		this.ed_klpfa.setHint("Klp Asset");
		this.ed_klpfa.setText(""); 
		this.ed_klpfa.setReadOnly(true);
		this.ed_klpfa.setTag("1");
		
		this.ed_akun = new portalui_saiLabelEdit(this);
		this.ed_akun.setLeft(650);
		this.ed_akun.setTop(230);
		this.ed_akun.setWidth(80);
		this.ed_akun.setLabelWidth(0);
		this.ed_akun.setHint("Akun Asset");
		this.ed_akun.setText(""); 
		this.ed_akun.setReadOnly(true);
		this.ed_akun.setTag("1");
		
		this.ed_lokfa = new portalui_saiLabelEdit(this);
		this.ed_lokfa.setLeft(735);
		this.ed_lokfa.setTop(230);
		this.ed_lokfa.setWidth(80);
		this.ed_lokfa.setLabelWidth(0);
		this.ed_lokfa.setHint("Lokasi Asset");
		this.ed_lokfa.setText(""); 
		this.ed_lokfa.setReadOnly(true);
		this.ed_lokfa.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(820);
		this.ed_nilai.setTop(230);
		this.ed_nilai.setWidth(100);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setLabelWidth(0);
		this.ed_nilai.setHint("Nilai Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("1");
		
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(252);
	    this.p1.setWidth(900);
	    this.p1.setHeight(208);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Jurnal SPB');
		this.p1.hide();
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setTag("3");
		this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(158);
	    this.sg1.setColCount(12);
	    this.sg1.setColTitle(new Array("No SPB","Deskripsi","Kode Akun","Nama Akun","Keterangan","DC","Sisa Nilai SPB","Nilai Kapitasisai","Kode Dept.","Nama Dept.","Kode DRK","Nama DRK"));
		this.sg1.setColWidth(new Array(11,10,9,8,7,6,5,4,3,2,1,0),new Array(150,80,100,80,110,110,30,120,120,80,150,110));	
		this.sg1.setReadOnly(false);
		
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(8).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(10).setReadOnly(true);	
		this.sg1.columns.get(11).setReadOnly(true);	
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(183);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		this.ed_spb = new portalui_saiLabelEdit(this.sgn);
		this.ed_spb.setLeft(710);
		this.ed_spb.setTop(2);
		this.ed_spb.setWidth(185);
		this.ed_spb.setTipeText(ttNilai);
		this.ed_spb.setAlignment(alRight);
		this.ed_spb.setLabelWidth(85);
		this.ed_spb.setCaption("Total Rekon SPB");
		this.ed_spb.setText("0"); 
		this.ed_spb.setReadOnly(true);
		this.ed_spb.setTag("1");
				
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(252);
	    this.p2.setWidth(900);
	    this.p2.setHeight(208);
	    this.p2.setName('p2');
	    this.p2.setCaption('Item Data Jurnal');
		this.p2.hide();
    	
		uses('portalui_saiGrid');
		this.sg2 = new portalui_saiGrid(this.p2);
    	this.sg2.setTag("4");
		this.sg2.setLeft(1);
	    this.sg2.setTop(20);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(158);
	    this.sg2.setColCount(9);
		this.sg2.setColTitle(new Array("Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"));
		this.sg2.setColWidth(new Array(8,7,6,5,4,3,2,1,0),new Array(180,80,100,80,120,30,250,120,80));	
		this.sg2.setReadOnly(false);

		this.sg2.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(1).setReadOnly(true);	
		this.sg2.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "C");	
		this.sg2.columns.get(3).setPicklist(val);
		this.sg2.columns.get(3).setReadOnly(true);
		this.sg2.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(6).setReadOnly(true);
		this.sg2.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(8).setReadOnly(true);
		
		this.sgn2 = new portalui_sgNavigator(this.p2);
		this.sgn2.setTop(183);
		this.sgn2.setLeft(1);
		this.sgn2.setWidth(899);
		this.sgn2.setGrid(this.sg2);
		this.sgn2.setButtonStyle(2);
		
		this.ed_total = new portalui_saiLabelEdit(this.sgn2);
		this.ed_total.setLeft(710);
		this.ed_total.setTop(2);
		this.ed_total.setWidth(185);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(85);
		this.ed_total.setCaption("Total Jurnal");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
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
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_fa.onBtnClick.set(this, "FindBtnClick");
			this.cb_fa.onChange.set(this, "doEditChange");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onChange.set(this, "doEditChange");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_jenis.onChange.set(this, "doEditChange");
			
			this.cb_pp.setSQL("select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",["kode_pp","nama"]);
			this.cb_setuju.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_buat.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);			
			this.cb_curr.setSQL("select kode_curr,nama   from curr",["kode_curr","nama"]);						
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg2.onEllipsClick.set(this, "do2FindBtnClick");
			this.sg2.onNilaiChange.set(this, "do2NilaiChange");
			this.sg2.onCellExit.set(this, "do2CellExit");
			this.sg2.onCellEnter.set(this, "do2CellEnter");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.cb_jenis.setText("SPB");
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaapp.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaapp.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_fa_transaksi_fFaapp.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.cb_jenis.getText() == "SPB") var sgTag = "3"; else  var sgTag = "4";
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1",sgTag)))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("update fa_asset set progress='1' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("insert into fa_app (no_faapp,no_spb,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','-','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+
					this.cb_fa.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+
					this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_jenis.getText()+"','F','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"','now()')");						
			
			var idx=0;
			sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.ed_akun.getText()+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.app._lokasi+"','FA_APP','ASSET','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			
			idx++;
			if (this.cb_jenis.getText() == "SPB")
			{
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+	
							"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(7,i))+",'SPB-FA')");
					
					sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg1.getCell(2,i)+
							"','"+this.sg1.getCell(0,i)+"','C',"+parseNilai(this.sg1.getCell(7,i))+",'"+this.sg1.getCell(8,i)+"','"+this.sg1.getCell(10,i)+"',"+
							"'"+this.app._lokasi+"','FA_APP','SPB','"+this.ed_period.getText()+
							"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
					idx++;
				}
			}else
			{
				for (var i=0; i < this.sg2.rows.getLength(); i++)
				{			
					sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+	
							"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.cb_jenis.getText()+"','-','"+this.app._lokasi+"',"+parseNilai(this.ed_nilai.getText())+",'BARU-FA')");
					
					sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg2.getCell(0,i)+
							"','"+this.sg2.getCell(2,i)+"','"+this.sg2.getCell(3,i)+"',"+parseNilai(this.sg2.getCell(4,i))+",'"+this.sg2.getCell(5,i)+"','"+this.sg2.getCell(7,i)+"',"+
							"'"+this.app._lokasi+"','FA_APP','BARU','"+this.ed_period.getText()+
							"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
					idx++;
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
window.app_saku_fa_transaksi_fFaapp.prototype.doModalResult = function(event, modalResult)
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
				this.cb_jenis.setText("SPB");
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		
		case "simpan" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (this.cb_jenis.getText() == "SPB")
			{
				if (nilaiToFloat(this.ed_spb.getText()) != nilaiToFloat(this.ed_nilai.getText()))
				{
					system.alert(this,"Data SPB tidak valid.","Nilai total SPB tidak sama dengan nilai asset.");
					return false;
				}
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					for (var j=i; j < this.sg1.rows.getLength(); j++)
					{
						if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && (i != j) )
						{
							var a = i+1; var b = j+1;
							system.alert(this,"Data SPB tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
							return false;
						}
					}		
				}
			}
			else
			{
				if (nilaiToFloat(this.ed_total.getText()) != nilaiToFloat(this.ed_nilai.getText()))
				{
					system.alert(this,"Data jurnal tidak valid.","Nilai total jurnal tidak sama dengan nilai asset.");
					return false;
				}
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
window.app_saku_fa_transaksi_fFaapp.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_app','no_faapp',this.app._lokasi+"-ASA"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");			
		}
	}catch (e){
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.cb_drk.setSQL( " select distinct d.kode_drk, d.nama from anggaran_d b "+
							  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
							  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
							  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",["kode_brg","nama"]);
};
window.app_saku_fa_transaksi_fFaapp.prototype.doEditChange = function(sender)
{
	if (sender == this.cb_pp){
		this.cb_drk.setSQL( " select distinct d.kode_drk, d.nama from anggaran_d b "+
				  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
				  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
				  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",["kode_brg","nama"]);
	}
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	if (sender == this.cb_jenis)
	{
		if (this.cb_jenis.getText() == "SPB") {this.p1.show(); this.p2.hide(); this.sg1.clear(); this.sg1.appendRow();}
		else {this.p2.show(); this.p1.hide(); this.sg2.clear(); this.sg2.appendRow();}
	}
	if (sender == this.cb_fa)
	{
		this.standarLib.clearByTag(this, new Array("1"),undefined);				
		var line,data = this.dbLib.runSQL(" select a.barcode,concat(a.nama,' ',a.merk,' ',a.tipe) as nama,a.kode_klpfa,b.kode_akun,a.kode_lokfa,a.nilai "+
		                                  " from fa_asset a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
										  " where a.no_fa='"+this.cb_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_barcode.setText(line.get("barcode"));
				this.ed_nama.setText(line.get("nama"));
				this.ed_klpfa.setText(line.get("kode_klpfa"));
				this.ed_akun.setText(line.get("kode_akun"));
				this.ed_lokfa.setText(line.get("kode_lokfa"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
			} 
		}
	}
};											  
window.app_saku_fa_transaksi_fFaapp.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pp) 
		{   
		    this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
			this.cb_fa.setText("");
		}
		if (sender == this.cb_drk) 
		{   
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  " select distinct d.kode_drk, d.nama from anggaran_d b "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
										  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
										  " select count(distinct d.kode_drk) from anggaran_d b "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
										  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
										  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);			
		}
		if (sender == this.cb_fa) 
		{   
		    this.standarLib.showListData(this, "Daftar Asset belum Approve",this.cb_fa,undefined, 
										  "select a.no_fa,a.nama from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' ",
										  "select count(a.no_fa) from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' ",
										  new Array("no_fa","nama"),"and",new Array("No Asset","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_curr) 
		{   
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr,nama   from curr",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"and",new Array("Kode Curr","Deskripsi"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.doSGChange = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 1:
					this.sg1.setCell(3,row,""); this.sg1.setCell(2,row,""); 
				break;			
		}
	} catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2: 
					var line,data = this.dbLib.runSQL(" select a.keterangan,a.dc,a.nilai-ifnull(e.nilai,0) as sisa,a.kode_pp,ifnull(c.nama,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
													  " from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  "              left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
													  "              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
													  "              left outer join "+
													  "                   (select x.no_spb,x.kode_akun,x.kode_lokasi,sum(x.nilai) as nilai "+
													  "                    from fa_spb x inner join fa_app y on x.no_faapp=y.no_faapp and x.kode_lokasi=y.kode_lokasi "+
													  "                    where x.status = 'SPB-FA' and y.no_del= '-' group by x.no_spb,x.kode_akun,x.kode_lokasi) e    "+
													  "                    on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi and a.kode_akun=e.kode_akun "+
													  " where a.kode_akun = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc = 'D' ");
													  
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(4,row,line.get("keterangan"));
							this.sg1.setCell(5,row,line.get("dc"));
							this.sg1.setCell(6,row,floatToNilai(parseFloat(line.get("sisa"))));
							this.sg1.setCell(7,row,"0");
							this.sg1.setCell(8,row,line.get("kode_pp"));
							this.sg1.setCell(9,row,line.get("nama_pp"));
							this.sg1.setCell(10,row,line.get("kode_drk"));
							this.sg1.setCell(11,row,line.get("nama_drk"));
						} else
						{
							this.sg1.setCell(4,row,"");
							this.sg1.setCell(5,row,"");
							this.sg1.setCell(6,row,"");
							this.sg1.setCell(7,row,"");
							this.sg1.setCell(8,row,"");
							this.sg1.setCell(9,row,"");
							this.sg1.setCell(10,row,"");
							this.sg1.setCell(11,row,"");
						}
					}			
				break;
			case 7:
					this.sg1.validasi();
				break;
		    
		}
	}catch(e)
	{
		alert("[app_saku_fa_transaksi_fFaapp] : doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.do2CellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 3 : 
			case 4 : 
						this.sg2.validasi();
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar SPB",this.sg1, this.sg1.row, this.sg1.col, 
												  "select no_spb,keterangan from spb_m where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and modul <> 'SPPLOG' and progress='2' ",
												  "select count(no_spb)     from spb_m where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and modul <> 'SPPLOG' and progress='2' ",
												  new Array("no_spb","keterangan"),"and",new Array("No SPB","Keterangan"),false);
				break;
			case 2 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun Debet SPB",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun,b.nama from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc='D'",
												  "select count(a.kode_akun) from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc='D'",
												  new Array("kode_akun","nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_fa_transaksi_fFaapp] : doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.do2FindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg2, this.sg2.row, this.sg2.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and (a.jenis = 'Pendapatan' or a.modul = 'P')",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and (a.jenis = 'Pendapatan' or a.modul = 'P')",
												  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg2, this.sg2.row, this.sg2.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg2, this.sg2.row, this.sg2.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg2.getCell(5,row)+"' and b.kode_akun='"+this.sg2.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg2.getCell(5,row)+"' and b.kode_akun='"+this.sg2.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_drk","a.nama"),"and",new Array("Kode RKM","Deskripsi"),true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_nonpro_kb_fKbin] : doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.doNilaiChange = function()
{
	try
	{
		var spb = 0;
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(7,i) != "")
			{
				spb += nilaiToFloat(this.sg1.getCell(7,i));
			}
		}
		this.ed_spb.setText(floatToNilai(spb));
	}catch(e)
	{
		alert("doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.do2NilaiChange = function()
{
	try
	{
		var total = 0;
		for (var i = 0; i < this.sg2.rows.getLength();i++)
		{
			if (this.sg2.getCell(4,i) != "")
			{
				total += nilaiToFloat(this.sg2.getCell(4,i));
			}
		}
		this.ed_total.setText(floatToNilai(total));
	}catch(e)
	{
		alert("doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFaapp.prototype.do2CellEnter = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
						if (this.sg2.getCell(2,row) == "")
							this.sg2.setCell(2,row,this.ed_desc.getText());
				break;
			case 3 : 
						if (this.sg2.getCell(3,row) == "")
							this.sg2.setCell(3,row,"C");
				break;
			case 5 : 
						this.sg2.setCell(5,row,this.cb_pp.getText());
						this.sg2.setCell(6,row,this.cb_pp.rightLabelCaption);
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}	
};
window.app_saku_fa_transaksi_fFaapp.prototype.doRequestReady = function(sender, methodName, result)
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