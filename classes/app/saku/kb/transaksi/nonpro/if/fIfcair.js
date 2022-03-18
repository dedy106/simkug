window.app_saku_kb_transaksi_nonpro_if_fIfcair = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_if_fIfcair";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Imprest Fund [KB Keluar] Non Proses: Input", 0);	

		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
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
	
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.addItem(0,"KAS");
		this.cb_jenis.addItem(1,"BANK");
		this.cb_jenis.setReadOnly(true);
		
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
	        
		this.ed_noif = new portalui_saiLabelEdit(this);
		this.ed_noif.setLeft(20);
		this.ed_noif.setTop(100);
		this.ed_noif.setWidth(230);
		this.ed_noif.setCaption("No ImprestFund");
		this.ed_noif.setReadOnly(true);
		this.ed_noif.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(122);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(144);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(290);
		this.ed_giro.setTop(144);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("9");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(166);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(166);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(166);
		this.lblTgl2.setLeft(290);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tanggal Closing");
		this.lblTgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(168);
		this.dp_tgl2.setLeft(390);
		this.dp_tgl2.setWidth(82);
		
		this.cb_akunif = new portalui_saiCBBL(this);
		this.cb_akunif.setLeft(20);
		this.cb_akunif.setTop(188);
		this.cb_akunif.setWidth(185);
		this.cb_akunif.setCaption("Akun ImprestFund");
		this.cb_akunif.setReadOnly(true);
		this.cb_akunif.setLabelWidth(100);
		this.cb_akunif.setRightLabelVisible(true);
		this.cb_akunif.setRightLabelCaption("");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(210);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun KasBank");
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(232);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		
		this.cb_pengaju = new portalui_saiCBBL(this);
		this.cb_pengaju.setLeft(20);
		this.cb_pengaju.setTop(254);
		this.cb_pengaju.setWidth(185);
		this.cb_pengaju.setCaption("Diajukan Oleh");
		this.cb_pengaju.setReadOnly(true);
		this.cb_pengaju.setLabelWidth(100);
		this.cb_pengaju.setRightLabelVisible(true);
		this.cb_pengaju.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(276);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(298);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai ImprestFund");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pengaju.onBtnClick.set(this, "FindBtnClick");
			this.cb_akunif.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			
			this.standarLib.clearByTag(this,["0","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.simpan = function()
{
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Nilai imprest fund tidak valid.","Nilai tidak boleh nol atau kurang");
		return false;
	}
	if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
	{
		system.alert(this,"Tanggal imprest fund tidak valid.","Tanggal pencairan melebihi tanggal closing");
		return false;
	}
	
	var data = this.dbLib.runSQL("select nik_pengaju from if_m where progress <> '9' and nik_pengaju = '"+this.cb_pengaju.getText()+"'");
	if (data.get(0) != undefined)
	{
		system.alert(this,"NIK Pengaju tidak valid.","NIK Pengaju masih mempunyai ImprestFund yang masih aktif.");
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
			
			sql.add("insert into if_m (no_if,no_kas,no_dokumen,tanggal,due_date,"+
					"keterangan,catatan,kode_curr,kurs,akun_if,nik_pengaju,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_noif.getText()+"','"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','"+this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_akunif.getText()+"','"+this.cb_pengaju.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','IFD_NP',"+parseNilai(this.ed_nilai.getText())+",'2','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
			
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','IFD_NP','"+this.cb_jenis.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'-','-',now(),'"+this.app._userLog+"','F','-','-','"+this.ed_noif.getText()+"')");
			
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
					"('"+this.ed_nb.getText()+"','"+this.ed_giro.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
					"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pp.getText()+"','-',"+
					"'"+this.ed_noif.getText()+"','"+this.app._lokasi+"','IFD_NP','KAS',"+
					"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())");
			
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.cb_akunif.getText()+
					"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pp.getText()+"','-',"+
					"'"+this.ed_noif.getText()+"','"+this.app._lokasi+"','IFD_NP','IFD',"+
					"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())");
					
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
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
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.genClick = function(sender)
{
	try
	{
		if ((this.ed_period.getText() != "") && (this.jenis != undefined))
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_noif.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'if_m','no_if',this.app._lokasi+"-IFD"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode dan jenis kasbank harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.doEditChange = function(sender)
{

	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		this.ed_noif.setText("");
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
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
										  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
										  ["kode_pp","nama"],"and",["Kode Departemen","Nama"],false);
		}
		if (sender == this.cb_akunif) 
		{
			this.standarLib.showListData(this, "Daftar Akun Imprest Fund",this.cb_akunif,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='010' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='010' ",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_akun) 
		{
		    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
				this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
			} else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
					this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
			}
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
		}
		if (sender == this.cb_pengaju) 
		{   
		    this.standarLib.showListData(this, "Daftar Pengaju",this.cb_pengaju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_nonpro_if_fIfcair.prototype.doRequestReady = function(sender, methodName, result)
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