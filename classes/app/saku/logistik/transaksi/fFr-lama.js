window.app_saku_logistik_transaksi_fFr = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fFr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fFr";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Final Receive: Input", 0);	
		
		uses("portalui_saiLabelEdit");
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
		this.ed_nb.setCaption("No Asset");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(76);
		this.ed_barcode.setWidth(220);
		this.ed_barcode.setCaption("No Inventori");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(false);
		this.ed_barcode.setLength(50);
		    
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(550);
		this.ed_merk.setTop(76);
		this.ed_merk.setWidth(370);
		this.ed_merk.setCaption("Merk");
		this.ed_merk.setText(""); 
		this.ed_merk.setReadOnly(false);
		this.ed_merk.setLength(100);
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(550);
		this.ed_tipe.setTop(98);
		this.ed_tipe.setWidth(370);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText(""); 
		this.ed_tipe.setReadOnly(false);
		this.ed_tipe.setLength(100);
		
		this.ed_seri = new portalui_saiLabelEdit(this);
		this.ed_seri.setLeft(550);
		this.ed_seri.setTop(120);
		this.ed_seri.setWidth(370);
		this.ed_seri.setCaption("No Seri");
		this.ed_seri.setText(""); 
		this.ed_seri.setReadOnly(false);
		this.ed_seri.setLength(50);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(500);
		this.ed_nama.setCaption("Deskripsi");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		
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
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(220);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setText(""); 
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		
		this.cb_kondisi = new portalui_saiCBBL(this);
		this.cb_kondisi.setLeft(280);
		this.cb_kondisi.setTop(120);
		this.cb_kondisi.setWidth(120);
		this.cb_kondisi.setCaption("Kondisi");
		this.cb_kondisi.setText(""); 
		this.cb_kondisi.setReadOnly(true);
		this.cb_kondisi.setLabelWidth(50);
		this.cb_kondisi.setRightLabelVisible(true);
		this.cb_kondisi.setRightLabelCaption("");	
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(142);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen");
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
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(252);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tgl Awal Susut");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(254);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);	
		
		this.ed_catat = new portalui_saiLabelEdit(this);
		this.ed_catat.setLeft(220);
		this.ed_catat.setTop(252);
		this.ed_catat.setWidth(300);
		this.ed_catat.setLabelWidth(50);
		this.ed_catat.setCaption("Catatan");
		this.ed_catat.setText(""); 
		this.ed_catat.setReadOnly(false);
		this.ed_catat.setLength(50);
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(720);
		this.ed_nilai.setTop(230);
		this.ed_nilai.setWidth(200);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
		this.ed_residu = new portalui_saiLabelEdit(this);
		this.ed_residu.setLeft(720);
		this.ed_residu.setTop(252);
		this.ed_residu.setWidth(200);
		this.ed_residu.setTipeText(ttNilai);
		this.ed_residu.setAlignment(alRight);
		this.ed_residu.setCaption("Nilai Residu");
		this.ed_residu.setText("1"); 
		this.ed_residu.setReadOnly(false);
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(275);
	    this.p1.setWidth(900);
	    this.p1.setHeight(195);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Barang Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(145);
	    this.sg1.setColCount(8);
	    this.sg1.setColTitle(new Array("No Tag TR","Kode Brg","Nama Barang","Satuan","Harga","Merk","Tipe","No Seri"));
		this.sg1.setColWidth(new Array(7,6,5,4,3,2,1,0),new Array(100,120,120,100,40,200,80,110));	
		this.sg1.setReadOnly(false);
		
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
		
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
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
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
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fFr.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fFr.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fFr.prototype.simpan = function()
{	
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		for (var j=i; j < this.sg1.rows.getLength(); j++)
		{
			if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && (i != j) )
			{
				var a = i+1; var b = j+1;
				system.alert(this,"No Tag TR tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
				return false;
			}
		}		
	}
	this.sg1.validasi();
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			var month = this.dp_tgl2.month;
			if (month < 10) month = "0"+month;
			var psusut = this.dp_tgl2.year+""+month;
			
			sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_barcode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_klpfa.getText()+"','"+this.cb_klpakun.getText()+"','"+this.cb_lokfa.getText()+"','"+this.cb_pnj.getText()+"','"+
					this.ed_nama.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
					parseNilai(this.ed_residu.getText())+",'-','"+this.ed_catat.getText()+"','0','"+this.dp_tgl1.getDate()+"','"+this.ed_period.getText()+"','"+this.dp_tgl2.getDate()+"','"+
					this.app._userLog+"',now(),"+this.umur+","+this.persen+",'"+psusut+"','"+this.ed_merk.getText()+"','"+this.ed_tipe.getText()+"','"+this.ed_seri.getText()+"','"+this.cb_kondisi.getText()+"')");
					
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				sql.add("insert into fa_d (no_fa,no_urut,no_tag,kode_lokasi) values "+	
						"('"+this.ed_nb.getText()+"',"+i+",'"+this.sg1.getCell(0,i)+"','"+this.app._lokasi+"')");
				sql.add("update tr_d set progress='1' where no_tag='"+this.sg1.getCell(0,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);	
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
window.app_saku_logistik_transaksi_fFr.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_asset','no_fa',this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".",'0000'));
			//this.ed_barcode.setFocus();
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
window.app_saku_logistik_transaksi_fFr.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.dp_tgl2.setText(this.dp_tgl1.getText());
};
window.app_saku_logistik_transaksi_fFr.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	if (sender == this.cb_klpakun)
	{
		var line,data = this.dbLib.runSQL(" select umur,persen from fa_klpakun "+
					                      " where kode_lokasi='"+this.app._lokasi+"' and kode_klpakun='"+this.cb_klpakun.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.umur = parseFloat(line.get("umur"));
				this.persen = parseFloat(line.get("persen"));
			} 
		}
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
		    this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode Dept","Deskripsi"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
					var line,data = this.dbLib.runSQL(" select a.no_tag,a.kode_brg,b.nama as nama_brg,a.kode_sat,a.merk,a.tipe,a.no_seri,a.harga from tr_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
					                                  " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tag='"+this.sg1.getCell(0,row)+"' and progress='0'");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(1,row,line.get("kode_brg"));
							this.sg1.setCell(2,row,line.get("nama_brg"));
							this.sg1.setCell(3,row,line.get("kode_sat"));
							this.sg1.setCell(4,row,floatToNilai(parseFloat(line.get("harga"))));
							this.sg1.setCell(5,row,line.get("merk"));
							this.sg1.setCell(6,row,line.get("tipe"));
							this.sg1.setCell(7,row,line.get("no_seri"));
						} 
					}	
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Item Barang Temporary Receive",this.sg1, this.sg1.row, this.sg1.col, 
												  "select no_tag,kode_brg from tr_d where kode_lokasi = '"+this.app._lokasi+"' and progress='0'",
												  "select count(no_tag)   from tr_d where kode_lokasi = '"+this.app._lokasi+"' and progress='0'",
												  new Array("no_tag","nama"),"and",new Array("No Tag TR","Kode Barang"),false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr]::doNilaiChange:"+e);
	}
};
window.app_saku_logistik_transaksi_fFr.prototype.doRequestReady = function(sender, methodName, result)
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