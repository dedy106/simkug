window.app_saku_kb_transaksi_fKbink = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fKbink.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fKbink";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Masuk Modul: Koreksi", 0);	
		
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
		
		uses("portalui_datePicker;util_dbLarge;app_saku_fJurnalViewer");	
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
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(546);
		this.bPAll.setTop(210);
		this.bPAll.setCaption("INPROG");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_status = new portalui_saiLabelEdit(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(188);
		this.cb_status.setWidth(230);
		this.cb_status.setLength(50);
		this.cb_status.setReadOnly(true);
		this.cb_status.setCaption("Status");
		this.cb_status.setText(""); 
		this.cb_status.setTag("2");
		
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
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Masuk');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			//proteksi susah utk deposito yg sudah fix akunnya ...solusi hapus aja dulu kl ganti akun	this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%' union select distinct periode from kas_m order by periode desc");
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
			this.dbLarge = new util_dbLarge();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fKbink.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fKbink.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_fKbink.prototype.ubah = function()
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
						"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-',ref1,kode_bank "+
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
				if (this.sg1.getCell(0,i) == "INPROG")
				{
					if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "BUDEP") || (this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.TRM")){ 
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";       vbukti = "no_ptg";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "DP.TRM") {vtmaster = "droptrm_m";   vbukti = "no_terima"; vprog = "0";};
						if (this.sg1.getCell(2,i) == "BUDEP")  {vtmaster = "depo_d";      vbukti = "no_terima"; vprog = "0";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depocair_m";  vbukti = "no_cair";   vprog = "0";};
						
						sql.add("update "+vtmaster+" set no_kas='-',posted = 'F',progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "IF.CLS"){
						//kalo progress = '1' tidak ketarik lagi ke kbin
						sql.add("update ifptg_m set no_kas='-',progress='2' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "KP.SIMP"){
						sql.add("update kop_simpsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "KP.PINJ"){
						sql.add("update kop_pinjsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
				    if (this.sg1.getCell(2,i) == "KP.PBRG"){
						sql.add("update kop_pbrgsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					if (this.sg1.getCell(2,i) == "AR.UMUM"){
						sql.add("update kop_arsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "AP.BANK"){
						sql.add("update kop_ap_m set tgl_angsur='1900-01-01',progress='0' where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "AR.PROYEK"){
						sql.add("update kop_proyeksetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
				} 
			}
			//========================================================================================
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
					"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+(this.app._pp.split(";"))[0]+"','KBI_ALL','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
					"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_status.getText()+"','"+this.cb_akun.getText()+"')");
					
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
						"'"+this.app._lokasi+"','KBI_ALL','KAS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
						
			var vprog,vtmaster,vtabel,vbukti = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{					
				if (this.sg1.getCell(0,i) == "APP")
				{
					vprog = this.sg1.getCell(15,i);
					if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "BUDEP") || (this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.TRM")){
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";       vtabel = "ptg_j";      vbukti = "no_ptg";   };
						if (this.sg1.getCell(2,i) == "DP.TRM") {vtmaster = "droptrm_m";   vtabel = "droptrm_j";  vbukti = "no_terima";};
						if (this.sg1.getCell(2,i) == "BUDEP")  {vtmaster = "depo_d";      vtabel = "depo_j";     vbukti = "no_terima";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depocair_m";  vtabel = "depocair_j"; vbukti = "no_cair";};	
						
						sql.add("update "+vtmaster+" set no_kas='"+this.nb+"',posted = 'T',progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',no_urut+1,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from "+vtabel+" where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					if (this.sg1.getCell(2,i) == "IF.CLS"){
						//jadi progress = '3' menurut KB Input
						sql.add("update ifptg_m set no_kas='"+this.nb+"',progress='3' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDateString()+"',99,a.akun_if,a.keterangan,'C',a.nilai,a.kode_pp,'-','-',"+
		 					    "  a.kode_lokasi,'IFPTG_P','IFCLS','"+this.ed_period.getText()+"',a.kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from if_m a inner join ifptg_m b on a.no_if=b.no_if and a.kode_lokasi=b.kode_lokasi where b.no_ifptg='"+this.sg1.getCell(3,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
						if (this.sg1.getCell(12,i) != "0") { //ada (ditemukan) nilai beban reimburs
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDateString()+"',98,b.akun_ap,b.keterangan,'D',b.nilai,a.kode_pp,'-','-',"+
									"  b.kode_lokasi,'IFPTG_P','HUTIF','"+this.ed_period.getText()+"',b.kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
									"  from if_m a inner join ifptg_m b on a.no_if=b.no_if and a.kode_lokasi=b.kode_lokasi where b.no_ifptg='"+this.sg1.getCell(3,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
						}
					}
					if (this.sg1.getCell(2,i) == "KP.SIMP"){
						sql.add("update kop_simpsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_simpsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "KP.PINJ"){
						sql.add("update kop_pinjsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_pinjsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "KP.PBRG"){
						sql.add("update kop_pbrgsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_pbrgsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "AR.UMUM"){
						sql.add("update kop_arsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_arsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ARUM_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "AP.BANK"){
						sql.add("update kop_ap_m set tgl_angsur='"+this.dp_tgl1.getDate()+"',progress='2' where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,akun_im,keterangan,'C',nilai,kode_pp,'-','-',"+
		 					    "  kode_lokasi,'APBANK','ARIM','"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_ap_m where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"''");
					}
					if (this.sg1.getCell(2,i) == "AR.PROYEK"){
						sql.add("update kop_proyeksetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_proyeksetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ARPR_AR'"); 
					}
					sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi) values "+
							"                 ('"+this.nb+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"')");
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
window.app_saku_kb_transaksi_fKbink.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	this.formEvent = event;
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
			if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
			{
				system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
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
					if ( (this.sg1.getCell(15,i) != "2" && this.sg1.getCell(2,i) != "IF.CLS") || (this.sg1.getCell(2,i) == "IF.CLS" && this.sg1.getCell(15,i) != "3") ) 
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
							"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-',ref1,kode_bank "+
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
					if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "BUDEP") || (this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.TRM"))
					{
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";       vbukti = "no_ptg";    vprog = "1";};
						if (this.sg1.getCell(2,i) == "DP.TRM") {vtmaster = "droptrm_m";   vbukti = "no_terima"; vprog = "0";};
						if (this.sg1.getCell(2,i) == "BUDEP")  {vtmaster = "depo_d";      vbukti = "no_terima"; vprog = "0";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depocair_m";  vbukti = "no_cair";   vprog = "0";};
						
						sql.add("update "+vtmaster+" set no_kas='-',progress='"+vprog+"' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "IF.CLS"){
						//untuk if closing update minimal progress = '2' 
						//yag normal = '1'
						sql.add("update ifptg_m set no_kas='-',progress='2' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "KP.SIMP"){
						sql.add("update kop_simpsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "KP.PINJ"){
						sql.add("update kop_pinjsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "KP.PBRG"){
						sql.add("update kop_pbrgsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "AR.UMUM"){
						sql.add("update kop_arsetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "AP.BANK"){
						sql.add("update kop_ap_m set tgl_angsur='1900-01-01',progress='0' where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "AR.PROYEK"){
						sql.add("update kop_proyeksetor_m set progress='0' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
window.app_saku_kb_transaksi_fKbink.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"INPROG");
	}
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fKbink.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_fKbink.prototype.loadClick = function(sender)
{
	try
	{
		/*
		var line,data = this.dbLib.runSQL("select distinct(modul) as modul from kas_d where no_kas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
		if (data instanceof portalui_arrayMap){
			line = data.get(0);
			if (line != undefined) this.cb_status.setText(line.get("modul"));
		}
		*/
		
		var line,data = this.dbLib.runSQL("select a.posted,a.periode,a.kode_curr,a.kurs,a.no_dokumen,a.no_bg,a.akun_kb,a.jenis,a.keterangan,a.nik_buat,b.nama as nama_buat,c.nama as nama_akun,a.kode_bank,d.nama as nama_bank,a.ref1, a.tanggal "+
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
				this.cb_status.setText(line.get("ref1"));
				this.cb_jenis.setText(line.get("jenis"));
				this.cb_curr.setText(line.get("kode_curr"));
				this.ed_kurs.setText(floatToNilai(parseFloat(line.get("kurs"))));
				this.ed_giro.setText(line.get("no_bg"));
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_akun.setText(line.get("kode_bank"));
				this.cb_akun.setRightLabelCaption(line.get("nama_bank"));
				this.akunkb = line.get("akun_kb");
				this.cb_pembuat.setText(line.get("nik_buat"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
				this.dp_tgl1.setText(line.get("tanggal"));
			} 
		}
		
		this.sg1.clear();  this.sg1.appendRow();
		if ((this.cb_status.getText() != "") && (this.cb_curr.getText() != ""))
		{
			if (this.cb_status.getText() == "SP"){
				var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) "+
								"from (select a.setor as no_bukti from kop_pinjsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.PINJ' "+
								"      where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								"      union "+
								"      select a.setor as no_bukti from kop_brgsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.PBRG' "+
								"      where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								"      union "+
								"      select a.setor as no_bukti from kop_simpsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.SIMP' "+
								"	   where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"')x",this.baris);
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_pinjsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.PINJ' "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_pbrgsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.PBRG' "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " union "+
								 " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_simpsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = 'KP.SIMP' "+
								 " where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' "+
								 " order by no_setor";
			}
			if (this.cb_status.getText() == "AR.PROYEK"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_setor) "+
								"from kop_proyeksetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_proyeksetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                      inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_setor";
			}
			if (this.cb_status.getText() == "AR.UMUM"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_setor) "+
								"from kop_arsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_arsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                      inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_setor";
			}
			if (this.cb_status.getText() == "KP.PBRG"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_setor) "+
								"from kop_pbrgsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_pbrgsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_setor";
			}
			if (this.cb_status.getText() == "KP.PINJ"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_setor) "+
								"from kop_pinjsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_pinjsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_setor";
			}
			if (this.cb_status.getText() == "KP.SIMP"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_setor) "+
								"from kop_simpsetor_m a inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_setor,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_app,a.no_del,a.progress "+
								 " from kop_simpsetor_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 "                        inner join kas_d z on z.no_bukti=a.no_setor and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_setor";
			}
			if (this.cb_status.getText() == "PJ.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ptg) "+
								"from ptg_m a inner join kas_d z on z.no_bukti=a.no_ptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);

				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
								 "        a.due_date,x.keterangan,x.kode_curr,x.nilai_kas as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju,x.no_del,x.progress "+
								 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
								 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join kas_d z on z.no_bukti=x.no_ptg and x.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by x.no_ptg";
			}					
			if (this.cb_status.getText() == "IF.CLS")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ifptg) "+
								"from ifptg_m a inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
								 "        c.nama as pemohon, a.status as peruntukan,a.nilai as kode_akun,a.nik_buat,a.no_del,a.progress "+ //nilai diisi utk kontrol insert jenis hutif apakah ada reimbursan ato tidak
								 " from ifptg_m a "+
								 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
								 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "                inner join kas_d z on z.no_bukti=a.no_ifptg and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_ifptg";
			}
			if (this.cb_status.getText() == "DP.TRM")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_terima) "+
								"from droptrm_m a inner join kas_d z on z.no_bukti=a.no_terima and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_terima,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from droptrm_m a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "                  inner join kas_d z on z.no_bukti=a.no_terima and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_terima";
			}
			if (this.cb_status.getText() == "BUDEP")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_terima) "+
								"from depo_d a inner join kas_d z on z.no_bukti=a.no_terima and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);
					
				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_terima,'-' as nama_pp,a.tgl_cair,"+
								 "        a.tgl_cair,a.keterangan,a.kode_curr,a.nilai_cair as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_kas as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from depo_d a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "               inner join kas_d z on z.no_bukti=a.no_terima and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_terima";
			}
			if (this.cb_status.getText() == "DEPO")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_cair) "+
								"from depocair_m a inner join kas_d z on z.no_bukti=a.no_cair and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								"where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"'",this.baris);

				this.scriptSql = " select 'APP' as status,z.catatan,z.modul,a.no_cair,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_kb as kode_akun,a.nik_buat,a.no_del,a.progress "+
								 " from depocair_m a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "                   inner join kas_d z on z.no_bukti=a.no_cair and a.kode_lokasi=z.kode_lokasi and z.modul = '"+this.cb_status.getText()+"' "+
								 "where z.no_kas='"+this.cb_bukti.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_cair";
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
window.app_saku_kb_transaksi_fKbink.prototype.genClick = function(sender)
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
window.app_saku_kb_transaksi_fKbink.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_fKbink.prototype.doEditChange = function(sender)
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
			this.jenis = "BKM";
		}
		if (this.cb_jenis.getText() == "BANK")
		{
			this.jenis = "BBM";
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
window.app_saku_kb_transaksi_fKbink.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti KasBank",this.cb_bukti,undefined, 
				  								 "select no_kas, keterangan from kas_m where modul = 'KBI_ALL' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_kas)      from kas_m where modul = 'KBI_ALL' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_kas","keterangan"],"and",["No KasBank","Keterangan"],false);
			}
			this.standarLib.clearByTag(this,["1","2"],undefined);				
			this.sg1.clear(); this.sg1.appendRow();
		}
		/* proteksi susah utk deposito yg sudah fix akunnya  ...solusi hapus aja dulu kl ganti akun
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
										  "select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fKbink.prototype.doNilaiChange = function()
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
		alert("[app_saku_kb_transaksi_fKbink]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_fKbink.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fKbink.prototype.doRequestReady = function(sender, methodName, result)
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
					system.info(this,"Transaksi Sukses ("+ this.nb +")");
					if (this.formEvent != "hapus"){
						if (this.jurnalViewer === undefined){
							this.jurnalViewer = new app_saku_fJurnalViewer(this.app,{bound:[this.width / 2 - 400,70,800,450]});									
						}
						this.jurnalViewer.previewHtml(this.dbLarge.getJurnalHtml("select a.no_kas as no_ju,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi, "+
									"	   a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app as nik_setuju,c.nama as nama_setuju,c.jabatan as jabatan_setuju "+
									"from kas_m a "+
									"left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
									"left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
									"where a.no_kas = '"+this.nb+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
									"select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  "+
									"from kas_j a "+
									"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_kas='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"order by a.dc desc "));
					}			
					this.doModalResult("clear",mrOk);
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
							this.gridLib.SGAppendData(this.sg1,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],value);	
							//this.sg1.appendData(value);
						}	
						this.sg1.hideLoading();						
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","");
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
