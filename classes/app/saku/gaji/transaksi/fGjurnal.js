window.app_saku_gaji_transaksi_fGjurnal= function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_transaksi_fGjurnal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_transaksi_fGjurnal";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Gaji: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
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
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No SPP");
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
		this.ed_dok.setLength(150);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
			
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
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(150);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setReadOnly(true);

		this.cb_pemohon = new portalui_saiCBBL(this);
		this.cb_pemohon.setLeft(20);
		this.cb_pemohon.setTop(142);
		this.cb_pemohon.setWidth(185);
		this.cb_pemohon.setLabelWidth(100);
		this.cb_pemohon.setReadOnly(true);
		this.cb_pemohon.setRightLabelVisible(true);
		this.cb_pemohon.setCaption("Dibuat Oleh");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setRightLabelCaption(" ");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(164);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		
		this.bLoad = new portalui_button(this);
		this.bLoad.setLeft(600);
		this.bLoad.setTop(164);
		this.bLoad.setCaption("Load");
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(680);
		this.ed_debet.setTop(142);
		this.ed_debet.setWidth(220);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);
		
		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(680);
		this.ed_kredit.setTop(164);
		this.ed_kredit.setWidth(220);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);
		
		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(164);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(186);
	    this.p1.setWidth(900);
	    this.p1.setHeight(177);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Gaji');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(148);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai ","Kode PP","Nama PP","Kode RKM","Nama RKM"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[100,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);

		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(368);
	    this.p2.setWidth(900);
	    this.p2.setHeight(133);
	    this.p2.setName('p2');
	    this.p2.setCaption('Daftar Lampiran Gaji');
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p2);
    	this.sg2.setLeft(1);
		this.sg2.setTop(20);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(113);
		this.sg2.setTag("2");
		this.sg2.setColTitle(["No","NIK","Nama","Kode Loker","Bank","Cabang","No Rekening","Nama Rekening","THP","No Gaji"]);
				
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();  this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.bLoad.onClick.set(this, "loadClick");
			
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pemohon.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");	
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
			data = this.dbLib.runSQL("select flag from spro where kode_spro = 'VENDSDM' and kode_lokasi='"+this.lokkonsol+"'");
			var row = undefined;
			row = data.get(0);
			this.kdVendor = row.get("flag");			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_transaksi_fGjurnal.extend(window.portalui_childForm);
window.app_saku_gaji_transaksi_fGjurnal.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_transaksi_fGjurnal.prototype.simpan = function()
{
	if  (this.nKB <= 0)
	{
		system.alert(this,"Nilai SPP tidak valid.","Nilai tidak boleh nol atau kurang.");
		return false;
	}
	this.hitungGar();
	for (var i in this.gridJurnal.objList)
	{
		line = this.gridJurnal.get(i);
		if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
		{
			system.alert(this,"Nilai SPP melebihi saldo anggaran.","Periksa kembali data anggaran.");
			return false;
		}
	}
	if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
	{
		system.alert(this,"Tanggal tidak valid."," Tanggal SPP melebihi Tgl Jatuh Temponya.");
		return false;
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{				
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			for (var i = 1; i <= this.sg2.getRowCount(); i++)
			{
				sql.add("update gaji_m set progress = '1' where no_gaji = '"+this.sg2.getCell(9,i)+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
			}
			
			var idx = 0;
			sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
					"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
					"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','-','"+this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.kdVendor+"','"+this.app._lokasi+"',"+
					"'"+this.app._kodePP+"','SPP','SPPGJ',"+this.nKB+",0,"+this.kredit+",'X','0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			var scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var baris1 = true;
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (!baris1) { scr1 += ",";}	
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg1.getCell(0,i)+
						"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
						"'"+this.app._lokasi+"','SPP','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+
						parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())";
				baris1 = false;
				idx++;
			}	
			sql.add(scr1);
			
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
			var baris1 = true;
			var line = undefined;
			var DC = "";
			for (var i in this.gridJurnal.objList)
			{
				if (!baris1) { scr1 += ",";}	
				line = this.gridJurnal.get(i);
				if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
				else {DC = "D";}
				scr1 += "('"+this.ed_nb.getText()+"','SPP','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
				        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
				baris1 = false;
			}	
			sql.add(scr1);
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clearAll();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
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
window.app_saku_gaji_transaksi_fGjurnal.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPP"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_gaji_transaksi_fGjurnal.prototype.loadClick = function(sender)
{
	try
	{
		this.sg1.clear(); 
		var strSql = "select c.kode_akun,c.nama,d.keterangan,a.dc,sum(a.nilai) as nilai from gaji_d a  "+
					 "   inner join gaji_param_d b on a.no_dok=b.no_dok  and a.kode_param=b.kode_param and a.kode_lokkonsol=b.kode_lokkonsol "+
					 "   inner join masakun c on b.kode_akun = c.kode_akun and b.kode_lokkonsol=c.kode_lokasi "+
					 "   inner join gaji_m d on a.no_gaji=d.no_gaji and a.kode_lokkonsol=d.kode_lokkonsol "+
					 "where d.periode = '"+this.ed_period.getText()+"' and d.kode_lokasi = '"+this.app._lokasi+"' "+
					 "group by c.kode_akun,c.nama,d.keterangan,a.dc order by a.dc desc ";
  
		var data = this.dbLib.runSQL(strSql);
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),
						new Array(line.get("kode_akun"),line.get("nama"),line.get("keterangan"),
						          line.get("dc"),line.get("nilai"),'-','-','-','-'));					
				}
				this.sg1.validasi();
			} 
			else
			this.sg1.appendRow();
		}
		
		this.sg2.clearAll();
		var temp = this.dbLib.runSQL("select c.nik,c.nama,c.kode_lokasi,c.bank,c.cabang,c.no_rek,c.nama_rek,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as THP,b.no_gaji "+
									 "from gaji_d a inner join gaji_m b on a.no_gaji=b.no_gaji and a.kode_lokkonsol=b.kode_lokkonsol "+
									 "              inner join karyawan c on a.nik=c.nik and a.kode_lokkonsol=c.kode_lokkonsol "+
									 "where b.periode = '"+this.ed_period.getText()+"' and b.kode_lokkonsol = '"+this.lokkonsol+
									 "' and b.kode_lokasi = '"+this.app._lokasi+"' group by c.nik,c.nama,c.kode_lokasi,c.bank,c.cabang,c.no_rek,c.nama_rek");
		
		if (temp instanceof portalui_arrayMap){
			this.sg2.setData(temp);
		}else alert(rs);
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
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
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr  ",
										  "select count(kode_curr) from curr ",
										  new Array("kode_curr","nama"),"where",new Array("Kode Curr","Nama"),false);		
		}
		if (sender == this.cb_pemohon) 
		{   
			this.standarLib.showListData(this, "Petugas Pembuat SPP",this.cb_pemohon,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' ", 
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ", 
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);		
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);		
		}
		
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_drk","a.nama"),"and",new Array("Kode RKM","Deskripsi"),true);
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = 0; 
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
		this.nKB = totD - totC;
		this.kredit = totC;
		//this.ed_nilai.setText(floatToNilai(nKB));
		this.ed_debet.setText(floatToNilai(totD));
		this.ed_kredit.setText(floatToNilai(totC));
	}catch(e)
	{
		alert("[GUI_kb_transaksi_nonpro_kb_fKbout]::doNilaiChange:"+e);
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.hitungGar = function()
{
	var row,dtJurnal = new portalui_arrayMap();
	var nemu = false;
	var nreal,ix,dtJrnl = 0;
				
    for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		kdAkun = this.sg1.getCell(0,i);
		kdPP = this.sg1.getCell(5,i);
		kdDRK = this.sg1.getCell(7,i);
		
		if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
		else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
		
		nemu = false;
		ix = 0;
					
		for (var j in dtJurnal.objList)
		{		
		  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk")))
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
			row.set("kode_pp",kdPP);
			row.set("kode_drk",kdDRK);
			row.set("nilai",nreal);
			row.set("saldo_gar",0);
			dtJrnl++;
			dtJurnal.set(dtJrnl,row);						
		}else {
			dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
		}
	}
	
	if (dtJurnal.getLength() > 0){
		var desc1 = new portalui_arrayMap();
		desc1.set("kode_akun",150);
		desc1.set("kode_pp",150);
		desc1.set("kode_drk",150);
		desc1.set("nilai",150);
		desc1.set("saldo_gar",150);
		
		var desc2 = new portalui_arrayMap();
		desc2.set("kode_akun","S");
		desc2.set("kode_pp","S");
		desc2.set("kode_drk","S");	
		desc2.set("nilai","N");
		desc2.set("saldo_gar","N");
		
		var dataDesc = new portalui_arrayMap();
		dataDesc.set(0,desc1);
		dataDesc.set(1,desc2);
		dtJurnal.setTag2(dataDesc);
	}
	this.gridJurnal = dtJurnal;
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	var line = undefined;
	var sls = 0;
	for (var i in this.gridJurnal.objList)
	{
		line = this.gridJurnal.get(i);
		var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"') as gar ");
		if (data instanceof portalui_arrayMap)
		{
			baris = data.get(0);
			if (baris != undefined)
			{
				baris = baris.get("gar");
				data = baris.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				line.set("saldo_gar",sls);
				this.gridJurnal.set(i,line);		
			} 
		} else alert(data);
	}	
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.garClick = function(sender)
{
	try
	{
		if (this.nKB != "0")
		{
			this.jurnal.sg.clear();
			this.hitungGar();
			if (this.gridJurnal != undefined){				
				this.jurnal.setData(this.gridJurnal);
				this.jurnal.showModal();
			}
		}
	} catch	(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_transaksi_fGjurnal.prototype.doRequestReady = function(sender, methodName, result)
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
      		break;
    		}
    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};