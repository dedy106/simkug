window.app_saku_anggaran_transaksi_fGardis = function(owner)
{  
	if (owner)
	{
		window.app_saku_anggaran_transaksi_fGardis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_transaksi_fGardis";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perubahan Data Anggaran: Input", 0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Tahun Anggaran");
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
		this.ed_nb.setCaption("No Bukti");
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(470);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(510);
		this.cb_curr.setTop(54);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency");
		this.cb_curr.setText("IDR");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("9");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(510);
		this.cb_pembuat.setTop(76);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
	
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(510);
		this.cb_setuju.setTop(98);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		
		this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(120);
	    this.p2.setWidth(470);
	    this.p2.setHeight(150);
	    this.p2.setName('p2');
	    this.p2.setCaption('Data Anggaran Asal');
		
		this.cb_pp = new portalui_saiCBBL(this.p2);
		this.cb_pp.setLeft(10);
		this.cb_pp.setTop(30);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		
		this.cb_drk = new portalui_saiCBBL(this.p2);
		this.cb_drk.setLeft(10);
		this.cb_drk.setTop(52);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");
		
		this.cb_akun = new portalui_saiCBBL(this.p2);
		this.cb_akun.setLeft(10);
		this.cb_akun.setTop(74);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Mata Anggaran");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.ed_bulan = new portalui_saiCB(this.p2);
		this.ed_bulan.setLeft(10);
		this.ed_bulan.setTop(96);
		this.ed_bulan.setWidth(185);
		this.ed_bulan.setCaption("Bulan");
		this.ed_bulan.setText("");
		this.ed_bulan.addItem(0,"01");
		this.ed_bulan.addItem(1,"02");
		this.ed_bulan.addItem(2,"03");
		this.ed_bulan.addItem(3,"04");
		this.ed_bulan.addItem(4,"05");
		this.ed_bulan.addItem(5,"06");
		this.ed_bulan.addItem(6,"07");
		this.ed_bulan.addItem(7,"08");
		this.ed_bulan.addItem(8,"09");
		this.ed_bulan.addItem(9,"10");
		this.ed_bulan.addItem(10,"11");
		this.ed_bulan.addItem(11,"12");
		this.ed_bulan.setReadOnly(true);
		
		uses("portalui_imageButton");
		this.bShow = new portalui_imageButton(this.p2);
		this.bShow.setLeft(197);
		this.bShow.setTop(96);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_ntot = new portalui_saiLabelEdit(this.p2);
		this.ed_ntot.setLeft(10);
		this.ed_ntot.setTop(118);
		this.ed_ntot.setWidth(207);
		this.ed_ntot.setTipeText(ttNilai);
		this.ed_ntot.setAlignment(alRight);
		this.ed_ntot.setCaption("Total Anggaran");
		this.ed_ntot.setText("0"); 
		this.ed_ntot.setReadOnly(true);
		this.ed_ntot.setTag("3");
		
		this.p3 = new portalui_panel(this);
	    this.p3.setLeft(510);
	    this.p3.setTop(120);
	    this.p3.setWidth(470);
	    this.p3.setHeight(150);
	    this.p3.setName('p3');
	    this.p3.setCaption('Data Anggaran Tujuan');
		
		this.cb_pp2 = new portalui_saiCBBL(this.p3);
		this.cb_pp2.setLeft(10);
		this.cb_pp2.setTop(30);
		this.cb_pp2.setWidth(185);
		this.cb_pp2.setCaption("PP");
		this.cb_pp2.setReadOnly(true);
		this.cb_pp2.setLabelWidth(100);
		this.cb_pp2.setRightLabelVisible(true);
		this.cb_pp2.setRightLabelCaption("");
		
		this.cb_drk2 = new portalui_saiCBBL(this.p3);
		this.cb_drk2.setLeft(10);
		this.cb_drk2.setTop(52);
		this.cb_drk2.setWidth(185);
		this.cb_drk2.setCaption("Data RKM");
		this.cb_drk2.setReadOnly(true);
		this.cb_drk2.setLabelWidth(100);
		this.cb_drk2.setRightLabelVisible(true);
		this.cb_drk2.setRightLabelCaption("");
		
		this.cb_akun2 = new portalui_saiCBBL(this.p3);
		this.cb_akun2.setLeft(10);
		this.cb_akun2.setTop(74);
		this.cb_akun2.setWidth(185);
		this.cb_akun2.setCaption("Mata Anggaran");
		this.cb_akun2.setReadOnly(true);
		this.cb_akun2.setLabelWidth(100);
		this.cb_akun2.setRightLabelVisible(true);
		this.cb_akun2.setRightLabelCaption("");
		
		this.ed_bulan2 = new portalui_saiCB(this.p3);
		this.ed_bulan2.setLeft(10);
		this.ed_bulan2.setTop(96);
		this.ed_bulan2.setWidth(185);
		this.ed_bulan2.setCaption("Bulan");
		this.ed_bulan2.setText("");
		this.ed_bulan2.addItem(0,"01");
		this.ed_bulan2.addItem(1,"02");
		this.ed_bulan2.addItem(2,"03");
		this.ed_bulan2.addItem(3,"04");
		this.ed_bulan2.addItem(4,"05");
		this.ed_bulan2.addItem(5,"06");
		this.ed_bulan2.addItem(6,"07");
		this.ed_bulan2.addItem(7,"08");
		this.ed_bulan2.addItem(8,"09");
		this.ed_bulan2.addItem(9,"10");
		this.ed_bulan2.addItem(10,"11");
		this.ed_bulan2.addItem(11,"12");
		this.ed_bulan2.setReadOnly(true);
		
		this.ed_ntot2 = new portalui_saiLabelEdit(this.p3);
		this.ed_ntot2.setLeft(10);
		this.ed_ntot2.setTop(118);
		this.ed_ntot2.setWidth(205);
		this.ed_ntot2.setTipeText(ttNilai);
		this.ed_ntot2.setAlignment(alRight);
		this.ed_ntot2.setCaption("Nilai Perubahan");
		this.ed_ntot2.setText("0"); 
		this.ed_ntot2.setReadOnly(false);
		
		this.ed_nilai = new portalui_saiLabelEdit(this.p3);
		this.ed_nilai.setLeft(250);
		this.ed_nilai.setTop(118);
		this.ed_nilai.setWidth(205);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total  Perubahan");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
		uses("portalui_uploader");
		this.uploader = new portalui_uploader(this.p3);
		this.uploader.setLeft(380);
		this.uploader.setTop(75);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);		
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("gridupload");
		this.uploader.setAutoSubmit(true);
		
		this.bOk = new portalui_button(this.p3);
		this.bOk.setLeft(380);
		this.bOk.setTop(96);
		this.bOk.setCaption("Pindahkan");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(275);
	    this.p1.setWidth(960);
	    this.p1.setHeight(195);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Perubahan Anggaran');
    	
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(955);
    	this.sg1.setHeight(145);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(new Array("Akun Asal","Dept Asal","RKM Asal","Bulan Asal","Nilai","Akun Tuj","Dept Tuj","RKM Tuj","Bulan Tuj"));
		this.sg1.setColWidth(new Array(8,7,6,5,4,3,2,1,0),new Array(100,100,100,100,120,100,100,100,100));	
		this.sg1.setReadOnly(true);		
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(169);
		this.sgn.setLeft(1);
		this.sgn.setWidth(960);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
	
		setTipeButton(tbSimpan);
		this.setTabChildIndex();		
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar;util_gridLib;util_addOnLib");
		    this.standarLib = new util_standar();
			this.gridLib=new util_gridLib();
			this.addOnLib = new util_addOnLib();
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.ed_bulan.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			
			this.cb_pp2.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk2.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun2.onBtnClick.set(this, "FindBtnClick");
			
			this.bShow.onClick.set(this, "showClick");
			this.bOk.onClick.set(this, "okClick");
			this.standarLib.clearByTag(this, new Array("0","1","3","4"),undefined);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();
			this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_anggaran_transaksi_fGardis.extend(window.portalui_childForm);
window.app_saku_anggaran_transaksi_fGardis.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString());
};
window.app_saku_anggaran_transaksi_fGardis.prototype.mainButtonClick = function(sender)
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
window.app_saku_anggaran_transaksi_fGardis.prototype.simpan = function()
{	
	try
	{
		if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
		{
			system.alert(this,"Total pengajuan tidak boleh nol atau kurang.","");
			return false;
		}
	} catch (e)
	{
		system.alert(this, e,"");
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,"+
					"             kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",now(),'"+this.app._userLog+"','T','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"','DIST')");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				sql.add("insert into anggdist_d (no_agg,kode_lokasi,no_urut,kode_pp1,kode_akun1,kode_drk1,periode1,kode_pp2,kode_akun2,kode_drk2,periode2,nilai,nik_user,tgl_input) values "+		
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+
						"'"+this.sg1.getCell(6,i)+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"','"+this.sg1.getCell(8,i)+"',"+
						parseNilai(this.sg1.getCell(4,i))+","+
						"'"+this.app._userLog+"',now())");
						
				sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input) values "+		
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+
						"',1,'"+this.ed_period.getText()+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+","+parseNilai(this.sg1.getCell(4,i))+",'C','-'"+
						",'"+this.app._userLog+"',now())");
				sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input) values "+		
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(6,i)+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+
						"',1,'"+this.ed_period.getText()+this.sg1.getCell(8,i)+"',"+parseNilai(this.sg1.getCell(4,i))+","+parseNilai(this.sg1.getCell(4,i))+",'D','-'"+
						",'"+this.app._userLog+"',now())");
			}
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),undefined);				
				this.sg1.clear(); this.sg1.appendRow(); 
			}
		break;
		case "simpan" :
			if (parseFloat(this.app._periode.substr(0,4)) > parseFloat(this.ed_period.getText())) 
			{
				system.alert(this,"Tahun anggaran tidak valid.","Tahun anggaran tidak boleh kurang dari tahun aktif sistem.["+this.app._periode.substr(0,4)+"]");
				return false;
			}
			else this.simpan();
		break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_anggaran_transaksi_fGardis.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'anggaran_m','no_agg',this.app._lokasi+"-"+this.ed_period.getText().substr(0,4)+".",'0000'));
			this.ed_dok.setFocus();
		}else
		{
			system.alert(this,"Tahun harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
	}
	if (sender == this.ed_bulan)
	{
		this.ed_ntot.setText("0");
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.showClick = function(sender)
{
	if ((this.cb_pp.getText != "") && (this.cb_drk.getText != "") && (this.cb_akun.getText != "") && (this.ed_bulan.getText != "")) 
	{
		try
		{
			this.standarLib.clearByTag(this, new Array("3"),undefined);				
			var line,data = this.dbLib.runSQL("select sum(case dc when 'D' then nilai else -nilai end) as nilai "+
			                                  "from anggaran_d where kode_pp = '"+this.cb_pp.getText()+"' and kode_drk = '"+this.cb_drk.getText()+"' and kode_akun = '"+this.cb_akun.getText()+"' and periode = '"+this.ed_period.getText()+this.ed_bulan.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_ntot.setText(floatToNilai(line.get("nilai")));
				}
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.okClick = function(sender)
{
	if ((this.cb_pp.getText != "") && (this.cb_drk.getText != "") && (this.cb_akun.getText != "") && (this.ed_bulan.getText != "") && (this.cb_pp2.getText != "") && (this.cb_drk2.getText != "") && (this.cb_akun2.getText != "") && (this.ed_bulan2.getText != "") && (this.ed_ntot2.getText != "0") ) 
	{
		try
		{
			if (nilaiToFloat(this.ed_ntot2.getText()) > nilaiToFloat(this.ed_ntot.getText())) 
			{
				system.alert(this,"Nilai perubahan melebihi total net anggaran.","");
				return false;
			}
			else
			{
				if (this.sg1.getCell(0,0) == "") this.sg1.clear();
				this.sg1.appendData(new Array (this.cb_akun.getText(),this.cb_pp.getText(),this.cb_drk.getText(),this.ed_bulan.getText(),this.ed_ntot2.getText(),this.cb_akun2.getText(),this.cb_pp2.getText(),this.cb_drk2.getText(),this.ed_bulan2.getText()));		
				this.sg1.validasi();
				this.ed_ntot.setText("0");
				this.ed_ntot2.setText("0");
			}
			this.sg1.validasi();
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pp) 
		{
		    this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
										  "select count(kode_pp) from pp where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
										  ["kode_pp","nama"],"and",["Kode Dept.","Deskripsi"],false);
			this.standarLib.clearByTag(this,["3"],undefined);
		}
		if (sender == this.cb_drk)
		{
		    this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  "select kode_drk, nama  from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0'",
										  "select count(kode_drk) from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0'",
										  ["kode_drk","nama"],"and",["Kode RKM","Deskripsi"],false);
			this.standarLib.clearByTag(this, ["3"],undefined);				
		}
		if (sender == this.cb_akun) 
		{
			this.standarLib.showListData(this, "Daftar Mata Anggaran",this.cb_akun,undefined, 
										  "select distinct a.kode_akun, a.nama from masakun a "+
										  "       inner join anggaran_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.periode like '"+this.ed_period.getText()+"%' "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText()+"' "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and d.kode_drk='"+this.cb_drk.getText()+"' ",
										  "select count(distinct a.kode_akun) from masakun a "+
										  "       inner join anggaran_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.periode like '"+this.ed_period.getText()+"%' "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText()+"' "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and d.kode_drk='"+this.cb_drk.getText()+"' ",
										  ["a.kode_akun","a.nama"],"and",["Kode MTA","Deskripsi"],false);
			this.standarLib.clearByTag(this,["3"],undefined);				
		}
		if (sender == this.cb_pp2) 
		{
		    this.standarLib.showListData(this, "Daftar PP",this.cb_pp2,undefined, 
										  "select kode_pp, nama  from pp where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
										  "select count(kode_pp) from pp where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
										  ["kode_pp","nama"],"and",["Kode Dept.","Deskripsi"],false);
		}
		if (sender == this.cb_drk2) 
		{
		    this.standarLib.showListData(this, "Daftar RKM",this.cb_drk2,undefined, 
										  "select kode_drk, nama  from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0'",
										  "select count(kode_drk) from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0'",
										  ["kode_drk","nama"],"and",["Kode RKM","Deskripsi"],false);
		}
		if (sender == this.cb_akun2) 
		{
		    this.standarLib.showListData(this, "Daftar Mata Anggaran",this.cb_akun2,undefined, 
										  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
										  ["a.kode_akun","nama"],"and",["Kode MTA","Deskripsi"],false);
		}
		
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Curr","Deskripsi"],false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
				tot += nilaiToFloat(this.sg1.getCell(4,i)) ;			
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_anggaran_transaksi_fGardis]::doNilaiChange:"+e);
	}
};
window.app_saku_anggaran_transaksi_fGardis.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_anggaran_transaksi_fGardis.prototype.doAfterLoad = function(sender, result,data)
{
	try{	
		if (result){				
			var rs, arr;
			this.sg1.clear();		
			if (data instanceof portalui_arrayMap){
				for (var i in data.objList){
					rs = data.get(i);							
					arr = new Array();
					for (var j in rs.objList){
						if (j != "nilai")					
							arr[arr.length] = rs.get(j);				
						else arr[arr.length] = floatToNilai(parseFloat(rs.get(j)));				
					}
					this.sg1.appendData(arr);
				}						
			}
		}
	}catch(e)
	{
		alert(e);
	}
};
