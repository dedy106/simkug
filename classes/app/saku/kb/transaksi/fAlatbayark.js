window.app_saku_kb_transaksi_fAlatbayark = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fAlatbayark.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fAlatbayark";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Alat Bayar : Koreksi", 0);	
		
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
		
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setCaption("Jenis KB");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem(0,"KAS");
		this.cb_jenis.addItem(1,"BANK");
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No KasBank");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");

		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(680);
		this.cb_perlama.setTop(56);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(78);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No KasBank Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(78);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(122);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dok KB");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(260);
		this.cb_curr.setTop(122);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		this.cb_curr.setTag("9");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(455);
		this.ed_kurs.setTop(122);
		this.ed_kurs.setWidth(65);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setTag("9");
		this.ed_kurs.setReadOnly(true);
				
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(144);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Rek. KasBank");
		this.cb_akun.setText(""); 
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);		
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.cb_status = new portalui_saiLabelEdit(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(188);
		this.cb_status.setWidth(230);
		this.cb_status.setLength(50);
		this.cb_status.setReadOnly(true);
		this.cb_status.setCaption("No Dok KB");
		this.cb_status.setText(""); 
		this.cb_status.setTag("2");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(546);
		this.bPAll.setTop(210);
		this.bPAll.setCaption("INPROG");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(20);
		this.ed_giro.setTop(210);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setText(""); 
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(622);
		this.ed_nilai.setTop(183);
		this.ed_nilai.setWidth(298);
		this.ed_nilai.setLabelWidth(150);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total KasBank");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(232);
	    this.p1.setWidth(900);
	    this.p1.setHeight(240);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Keluar');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(215);
		this.sg1.setColCount(16);
		this.sg1.setColTitle(["Status","Catatan","Modul","No Dokumen","PP","Tgl Dok.","Due Date","Deskripsi","Currency","Nilai","Permohonan","Peruntukan","Akun Temp","Penerima","No Del","Progress"]);
		this.sg1.setColWidth([15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,80,100,100,100,60,200,60,60,120,120,80,200,60]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setTitle("Status");
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);
    	this.sg1.columns.get(1).setReadOnly(false);
    	this.sg1.columns.get(2).setReadOnly(true);
    	this.sg1.columns.get(3).setReadOnly(true);
    	this.sg1.columns.get(4).setReadOnly(true);
    	this.sg1.columns.get(5).setReadOnly(true);
    	this.sg1.columns.get(6).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
    	this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(9).setReadOnly(true);
    	this.sg1.columns.get(10).setReadOnly(true);
    	this.sg1.columns.get(11).setReadOnly(true);
    	this.sg1.columns.get(12).setReadOnly(true);
    	this.sg1.columns.get(13).setReadOnly(true);
		this.sg1.columns.get(14).setReadOnly(true);
    	this.sg1.columns.get(15).setReadOnly(true);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(205);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg1);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(3);
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib=new util_addOnLib();
		
			//this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			//proteksi susah utk deposito yg sudah fix akunnya ...solusi hapus aja dulu kl ganti akun           this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			
			var val = this.dbLib.loadQuery("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%' "+
				"union "+
				"select distinct periode from kas_m where kode_lokasi = '"+this.app._lokasi+"' and periode > '"+this.app._periode+"' order by periode desc");			
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
			this.standarLib.clearByTag(this,["0","1","2"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.baris = this.app._baris;
			this.cb_pembuat.setText(this.app._userLog, this.app._namaUser);
			this.cb_pembuat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fAlatbayark.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fAlatbayark.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_fAlatbayark.prototype.ubah = function()
{
	
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		if (this.sg1.getCell(0,i).toUpperCase() == "INPROG")
		{
			if (this.sg1.getCell(14,i) != "-")
			{
				system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah dihapus.","Approval tidak dapat diubah.");
				return false;
			}
			if (this.sg1.getCell(15,i) != "2") 
			{
				system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
				return false;
			}
		}
	}
	if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
	{
		system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
		return false;
	}
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(5,i))) && (this.sg1.getCell(0,i) == "APP"))
		{
			system.alert(this,"Tanggal kasbank kurang dari tanggal dokumen [baris "+i+"].","");
			return false;
		}
	}
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Total KasBank tidak valid / tidak boleh nol.","");
		return false;
	}
	setTipeButton(tbAllFalse);
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this,["0","2","9"]))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add("update kas_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
						"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
						"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
						"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
				
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
						"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
						"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
						"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from kas_m where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from kas_d where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from kas_j where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				this.nb = this.cb_bukti.getText();
			}

			var vprog,vtmaster,vbukti = ""; 
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{					
				if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "DP.KRM") || (this.sg1.getCell(2,i) == "IF.PTG")|| (this.sg1.getCell(2,i) == "PJ.PTG") ||
				    (this.sg1.getCell(2,i) == "I/F") || (this.sg1.getCell(2,i) == "PJR") || (this.sg1.getCell(2,i) == "SPP") || 
					(this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "A/P"))
				{
					if (this.sg1.getCell(0,i) == "INPROG")
					{
						if (this.sg1.getCell(2,i) == "SPB")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "SPP")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "A/P")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "PJR")    {vtmaster = "panjar_m";   vbukti = "no_pj";     vprog = "1";};
						if (this.sg1.getCell(2,i) == "I/F")    {vtmaster = "if_m";       vbukti = "no_if";     vprog = "1";};
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";      vbukti = "no_ptg";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "IF.PTG") {vtmaster = "ifptg_m";    vbukti = "no_ifptg";  vprog = "1";};
						if (this.sg1.getCell(2,i) == "DP.KRM") {vtmaster = "dropkrm_m";  vbukti = "no_kirim";  vprog = "1";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depo_m";     vbukti = "no_depo";   vprog = "1";};
						if (this.sg1.getCell(2,i) == "KP.SPB")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						
						if ((this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
							sql.add("update "+vtmaster+" set progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						else sql.add("update "+vtmaster+" set no_kas='-',progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
				}						
			}
			
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
					"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+(this.app._pp.split(";"))[0]+"','KBO_ALB','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
					"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
					
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
						"'"+this.app._lokasi+"','KBO_ALB','KAS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
						
			var vprog,vtabel,vbukti = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{					
				if (this.sg1.getCell(0,i) == "APP")
				{
					vprog = this.sg1.getCell(15,i);
					if ((this.sg1.getCell(2,i) == "KP.SPB") ||(this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
					{
						sql.add("update spb_m set progress='"+vprog+"' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						var jenis = 'BYMHD';
						if (this.sg1.getCell(2,i) == "SPP")
						{
							var line2,data2 = this.dbLib.runSQL("select jenis from spb_m where no_spb = '"+this.sg1.getCell(3,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
							if (data2 instanceof portalui_arrayMap)
							{
								line2 = data2.get(0);
								if (line2 != undefined)
								{
									if (line2.get("jenis") == "PO_FINAL")
									{
										sql.add("update fa_asset a,fa_spb b, fa_app c set a.progress = '1' "+
										        "where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp=c.no_faapp and b.kode_lokasi=c.kode_lokasi "+
											    "      and c.no_spb='"+this.sg1.getCell(3,i)+"' and c.kode_lokasi = '"+this.app._lokasi+"'");
									}
								}
							}
						}
					}
					if (this.sg1.getCell(2,i) == "PJR")
					{
						sql.add("update panjar_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						var jenis = 'PJR';
					}
					if (this.sg1.getCell(2,i) == "PJ.PTG")
					{
						sql.add("update ptg_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "I/F")
					{
						sql.add("update if_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						var jenis = 'IFD';
					}
					if (this.sg1.getCell(2,i) == "IF.PTG")
					{
						sql.add("update ifptg_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "DP.KRM")
					{
						sql.add("update dropkrm_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "DEPO")
					{
						sql.add("update depo_m set no_kas='"+this.nb+"',progress='"+vprog+"' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}			
					sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
							"                 ('"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(9,i))+")");
				
					if ((this.sg1.getCell(2,i) == "KP.SPB") ||(this.sg1.getCell(2,i) == "IF.PTG") ||(this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "PJR") || (this.sg1.getCell(2,i) == "I/F") || 
					    (this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "A/P"))
					{
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								"('"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,'"+this.sg1.getCell(12,i)+
								"','"+this.sg1.getCell(1,i)+"','D',"+parseNilai(this.sg1.getCell(9,i))+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
								"'"+this.app._lokasi+"','KBO_ALB','"+jenis+"',"+
								"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
								",'"+this.app._userLog+"',now())");
					}
					if ((this.sg1.getCell(2,i) == "SPP")||(this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.KRM"))
					{
						if (this.sg1.getCell(2,i) == "SPP")    {vtabel = "spb_j";     vbukti = "no_spb";  };
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtabel = "ptg_j";     vbukti = "no_ptg";  };
						if (this.sg1.getCell(2,i) == "DP.KRM") {vtabel = "dropkrm_j"; vbukti = "no_kirim";};
						
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',no_urut+1,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from "+vtabel+" where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
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
window.app_saku_kb_transaksi_fAlatbayark.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2"],this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
			
		case "ubah" :
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++){
				if (this.sg1.getCell(0,i) == "APP") cekData = "T";
			}
			if (cekData == "F"){
				system.alert(this,"Tidak ada transaksi yang diapprove.","Pilih APP untuk approval di kolom status.");
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
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(14,i) != "-")
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah dihapus.","Approval tidak dapat diubah.");
						return false;
					}
					if (this.sg1.getCell(15,i) != "2") 
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
						return false;
					}
				}
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
				{
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				setTipeButton(tbAllFalse);
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add("update kas_m set no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
							"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
							"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
							"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
							"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
							"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
							"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
				}
				else
				{
					sql.add(" delete from kas_m where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from kas_d where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from kas_j where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				
				var vprog,vtmaster,vbukti = ""; 
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{					
					if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "DP.KRM") || (this.sg1.getCell(2,i) == "IF.PTG") || 
					    (this.sg1.getCell(2,i) == "I/F") || (this.sg1.getCell(2,i) == "PJR") || (this.sg1.getCell(2,i) == "SPP") || 
						(this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "A/P"))
					{
						if (this.sg1.getCell(2,i) == "SPB")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "SPP")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "A/P")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "PJR")    {vtmaster = "panjar_m";   vbukti = "no_pj";     vprog = "1";};
						if (this.sg1.getCell(2,i) == "I/F")    {vtmaster = "if_m";       vbukti = "no_if";     vprog = "1";};
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";      vbukti = "no_ptg";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "IF.PTG") {vtmaster = "ifptg_m";    vbukti = "no_ifptg";  vprog = "1";};
						if (this.sg1.getCell(2,i) == "DP.KRM") {vtmaster = "dropkrm_m";  vbukti = "no_kirim";  vprog = "1";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depo_m";     vbukti = "no_depo";   vprog = "1";};
						if (this.sg1.getCell(2,i) == "KP.SPB")    {vtmaster = "spb_m";      vbukti = "no_spb";    vprog = "1";};
						
						if ((this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P")) 
						   sql.add("update "+vtmaster+" set progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						else sql.add("update "+vtmaster+" set no_kas='-',progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						if (this.sg1.getCell(2,i) == "SPP")
						{
							var line2,data2 = this.dbLib.runSQL("select jenis from spb_m where no_spb = '"+this.sg1.getCell(3,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
							if (data2 instanceof portalui_arrayMap)
							{
								line2 = data2.get(0);
								if (line2 != undefined)
								{
									if (line2.get("jenis") == "PO_FINAL")
									{
										sql.add("update fa_asset a,fa_spb b, fa_app c set a.progress = '0' "+
										        "where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp=c.no_faapp and b.kode_lokasi=c.kode_lokasi "+
											    "      and c.no_spb='"+this.sg1.getCell(3,i)+"' and c.kode_lokasi = '"+this.app._lokasi+"'");
									}
								}
							}
						}
						
					}						
				}
				this.dbLib.execArraySQL(sql);	
				
			}catch(e)
			{
				alert(e);
			}
			break;
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"INPROG");
	}
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.loadClick = function(sender)
{
	try
	{	
		var line,data = this.dbLib.runSQL("select distinct(modul) as modul from kas_d where no_kas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
		if (data instanceof portalui_arrayMap)
		{
			var modulsama = true, mdlsblm = "";
			for (var i in data.objList){
				line = data.get(i);
				if (mdlsblm == "") mdlsblm = line.get("modul");
				modulsama = mdlsblm == line.get("modul");//jika kas_d berisi modul yang beda berarti modul = 'ALL'
				if (!modulsama) break;
			}
			this.cb_status.setText(modulsama ? mdlsblm: "ALL");
		}
		var line,data = this.dbLib.runSQL("select a.posted,a.periode,a.kode_curr,a.kurs,a.no_dokumen,a.no_bg,a.akun_kb,a.jenis,a.keterangan,a.nik_buat,b.nama as nama_buat,c.nama as nama_akun,a.kode_bank,d.nama as nama_bank, a.tanggal "+
		                                  "from kas_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "             inner join masakun c on a.akun_kb = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
										  "             inner join bank2 d on a.kode_bank=d.kode_bank and a.kode_lokasi=d.kode_lokasi  "+
										  "where a.no_kas='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.posted = line.get("posted");
				this.periodeLama = line.get("periode");
				this.dp_tgl1.setText(line.get("tanggal"));
				this.cb_jenis.setText(line.get("jenis"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(parseFloat(line.get("kurs"))));
				this.ed_giro.setText(line.get("no_bg"));
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				//this.cb_akun.setText(line.get("akun_kb"));
				//this.cb_akun.setRightLabelCaption(line.get("nama_akun"));
				this.cb_akun.setText(line.get("kode_bank"));
				this.cb_akun.setRightLabelCaption(line.get("nama_bank"));
				this.akunkb = line.get("akun_kb");
				this.cb_pembuat.setText(line.get("nik_buat"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
			} 
		}
		
		this.sg1.clear(); this.sg1.appendRow();
		if ((this.cb_status.getText() != "") && (this.cb_curr.getText() != ""))
		{
			if (this.cb_status.getText() == "KP.SPB") 
			{								
				var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
								"from spb_m a inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' and a.jenis in ('SIMP','SIMPDEPO','PBRGDEPO','PINJDEPO') "+
								 "union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kop_loker d on d.kode_loker=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'PINJ' " +
								 "union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'PBRG' "+
								 "union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' and a.jenis in ('PINJ_AS','PINJ_TK')  "+
								 "order by no_spb ";
			}
			if ((this.cb_status.getText() == "SPB") || (this.cb_status.getText() == "SPP") || (this.cb_status.getText() == "A/P"))
			{								
				var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
								"from spb_m a inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				this.scriptSql = " select 'APP' as status,z.catatan,substring(z.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where  a.jenis<> 'NPKO' and z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'APP' as status,z.catatan,substring(z.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, a.no_dokumen as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where  a.jenis= 'NPKO' and z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 "order by no_spb "; //-- 
			}
			if (this.cb_status.getText() == "PJR")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_pj) "+
								"from panjar_m a inner join kas_d z on z.no_bukti=a.no_pj and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);								
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_pj,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai-a.nilai_pot as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju,a.no_del,a.progress "+
								 " from panjar_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_pj and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_pj";
			}
			if (this.cb_status.getText() == "PJ.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ptg) "+
								"from ptg_m a inner join kas_d z on z.no_bukti=a.no_ptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' and a.nilai_kas<0 "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);																
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
								 "        a.due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju,x.no_del,x.progress "+
								 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
								 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=x.no_ptg and x.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by x.no_ptg";
			}
			if (this.cb_status.getText() == "I/F")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_if) "+
								"from if_m a inner join kas_d z on z.no_bukti=a.no_if and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);												
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_if,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_if as kode_akun,a.nik_pengaju,a.no_del,a.progress "+
								 " from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "             inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "             inner join kas_d z on z.no_bukti=a.no_if and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_if";
			}
			if (this.cb_status.getText() == "IF.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ifptg) "+
								"from ifptg_m a inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);												
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
								 "        c.nama as pemohon, a.status as peruntukan,a.akun_ap as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from ifptg_m a "+
								 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
								 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	  inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_ifptg";
			}
			if (this.cb_status.getText() == "DP.KRM")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_kirim) "+
								"from dropkrm_m a inner join kas_d z on z.no_bukti=a.no_kirim and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);												
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_kirim,'-' as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from dropkrm_m a "+
								 "                  inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	    inner join kas_d z on z.no_bukti=a.no_kirim and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_kirim";
			}
			if (this.cb_status.getText() == "DEPO")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_depo) "+
								"from depo_m a inner join kas_d z on z.no_bukti=a.no_depo and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);												
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_depo,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_depo as kode_akun,a.bank,a.no_del,a.progress "+
								 " from depo_m a "+
								 "               inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	 inner join kas_d z on z.no_bukti=a.no_depo and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_depo";
			}
			
			if (this.cb_status.getText() == "ALL")
			{
				var pageCount = this.dbLib.getRowCount("select count(z.no_bukti) from "+
				                "( "+
								" select a.no_spb as no_bukti "+
								" from spb_m a inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi  "+
								" where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								" union "+								
								" select a.no_pj as no_bukti "+
								" from panjar_m a inner join kas_d z on z.no_bukti=a.no_pj and a.kode_lokasi=z.kode_lokasi "+
								" where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								" union "+
								" select a.no_ptg as no_bukti "+
								" from ptg_m a inner join kas_d z on z.no_bukti=a.no_ptg and a.kode_lokasi=z.kode_lokasi and a.nilai_kas<0 "+
								" union "+
								" select a.no_if as no_bukti "+
								" from if_m a inner join kas_d z on z.no_bukti=a.no_if and a.kode_lokasi=z.kode_lokasi "+
								" where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								" union "+
								" select a.no_ifptg as no_bukti "+
								" from ifptg_m a inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi  "+
								" where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+								
								" union "+
								" select a.no_kirim as no_bukti "+
								" from dropkrm_m a inner join kas_d z on z.no_bukti=a.no_kirim and a.kode_lokasi=z.kode_lokasi "+
								" where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								") z ",this.baris);
				this.scriptSql = " select 'APP' as status,z.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //field nilai sudah include -->  -a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and z.modul=a.modul and z.no_del = '-' "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,substring(z.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //-a.nilai_pot
								 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima,a.no_del,a.progress "+
								 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_spb and a.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_pj,b.nama as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai-a.nilai_pot as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju,a.no_del,a.progress "+
								 " from panjar_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=a.no_pj and a.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
								 "        a.due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju,x.no_del,x.progress "+
								 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
								 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=x.no_ptg and x.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_if,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_if as kode_akun,a.nik_pengaju,a.no_del,a.progress "+
								 " from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "             inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "             inner join kas_d z on z.no_bukti=a.no_if and a.kode_lokasi=z.kode_lokasi  "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
								 "        c.nama as pemohon, a.status as peruntukan,a.akun_ap as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from ifptg_m a "+
								 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
								 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	  inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_kirim,'-' as nama_pp,a.tanggal,"+
								 "        a.due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from dropkrm_m a "+
								 "                  inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	    inner join kas_d z on z.no_bukti=a.no_kirim and a.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_depo,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_depo as kode_akun,a.bank,a.no_del,a.progress "+
								 " from depo_m a "+
								 "               inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "             	 inner join kas_d z on z.no_bukti=a.no_depo and a.kode_lokasi=z.kode_lokasi "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " order by modul";
			}				
			this.dbLib.listData(this.scriptSql, 1, this.baris);
		}
		this.sgNav.setTotalPage(pageCount);
		this.sgNav.rearrange();
		this.sgNav.activePage = 0;	
		this.sgNav.setButtonStyle(3);
		if (pageCount > 0)
		{
			if (this.sgNav.imgBtn1 != undefined)
				this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
		}	
	}catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.genClick = function(sender)
{
	try
	{
		if ((this.ed_period.getText() != "") && (this.jenis != undefined))
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode dan jenis kb harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_jenis)
	{
		this.ed_nb.setText("");
		if (this.cb_jenis.getText() == "KAS")
		{
			this.jenis = "BKK";
		}
		if (this.cb_jenis.getText() == "BANK")
		{
			this.jenis = "BBK";
		}
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
	
	if ((sender == this.cb_status) || (sender == this.cb_curr) || (sender == this.ed_period)) 
	{
		this.sg1.clear();
		this.sg1.appendRow();
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti KasBank",this.cb_bukti,undefined, 
				  								 "select no_kas, keterangan from kas_m where posted='F' and modul = 'KBO_ALB' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_kas)      from kas_m where posted='F' and modul = 'KBO_ALB' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_kas","keterangan"],"and",["No KasBank","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1","2"),undefined);		
			this.sg1.clear(); this.sg1.appendRow();
		}
		/* proteksi susah utk deposito yg sudah fix akunnya...solusi hapus aja dulu kl ganti akun
		if (sender == this.cb_akun) 
		{
		    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
				this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			} else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
					this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			}
			this.sg1.clear(); this.sg1.appendRow();
		}
		*/
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr ",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(9,i) != "")
			{
				if (this.sg1.getCell(0, i) == "APP")					
					tot += nilaiToFloat(this.sg1.getCell(9,i));			
			}
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_fAlatbayark]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fAlatbayark.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :
    				step="info";
				setTipeButton(tbUbahHapus);
				if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti : ("+ this.nb +")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
      		
				case "listData" :
					this.sg1.clear();
					if ((result != "") && (result != undefined))
					{
						this.list = this.standarLib.strToArray(result);				
						var values = undefined;								
						var value = Array();
						this.sg1.showLoading();
						for (var i in this.list.objList)
						{
							values = this.list.get(i);				
							for (var i in values.objList)
								value[i] = values.get(i);
							value[0] = value[0].toUpperCase();
							value[2] = value[2].toUpperCase();
							value[14] = value[14].toUpperCase();
							
							var dt=value[5].split(" ");
							var tgl=dt[0].split("-");
							value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							var dt=value[6].split(" ");
							var tgl=dt[0].split("-");
							value[6]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15),value);	
							//this.sg1.appendData(value);
						}	
						this.sg1.hideLoading();						
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","Jenis dokumen "+this.cb_status.getText()+" tidak ada yang siap dibayarkan.");
						this.sg1.appendRow();
						return false;
			        }  
					this.sg1.validasi();
				break;
    		}
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};
