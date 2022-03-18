window.app_saku_kb_transaksi_proses_drop_fMou = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_drop_fMou.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_drop_fMou";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Alokasi Droping Dana: Input", 0);
		
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
	
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Alokasi");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(142);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setCaption("Lokasi Tujuan");
		this.cb_lokasi.setRightLabelCaption("");
		
		this.cb_tak = new portalui_saiCBBL(this);
		this.cb_tak.setLeft(20);
		this.cb_tak.setTop(164);
		this.cb_tak.setWidth(185);
		this.cb_tak.setLabelWidth(100);
		this.cb_tak.setReadOnly(true);
		this.cb_tak.setRightLabelVisible(true);
		this.cb_tak.setCaption("Akun Mutasi");
		this.cb_tak.setRightLabelCaption("");
		
		this.cb_pengaju = new portalui_saiCBBL(this);
		this.cb_pengaju.setLeft(20);
		this.cb_pengaju.setTop(186);
		this.cb_pengaju.setWidth(185);
		this.cb_pengaju.setLabelWidth(100);
		this.cb_pengaju.setReadOnly(true);
		this.cb_pengaju.setRightLabelVisible(true);
		this.cb_pengaju.setCaption("Dibuat Oleh");
		this.cb_pengaju.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(208);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(230);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total Droping Inv.");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);		
		
		this.ed_nilaix = new portalui_saiLabelEdit(this);
		this.ed_nilaix.setLeft(20);
		this.ed_nilaix.setTop(252);
		this.ed_nilaix.setWidth(220);
		this.ed_nilaix.setTipeText(ttNilai);
		this.ed_nilaix.setAlignment(alRight);
		this.ed_nilaix.setCaption("Total Droping Eksp.");
		this.ed_nilaix.setText("0"); 
		this.ed_nilaix.setReadOnly(false);		
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(20);
		this.ed_total.setTop(274);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setCaption("Total Droping");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);		
		
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
			this.bGen.onClick.set(this, "genClick");
			this.ed_nilai.onChange.set(this, "doEditChange");
			this.ed_nilaix.onChange.set(this, "doEditChange");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pengaju.onBtnClick.set(this, "FindBtnClick");
			this.cb_tak.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
			
			this.standarLib.clearByTag(this,["0","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_drop_fMou.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.simpan = function()
{
	if  (nilaiToFloat(this.ed_total.getText()) <= 0)
	{
		system.alert(this,"Nilai tidak valid.","Nilai tidak boleh nol atau kurang");
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
			
			sql.add("insert into alokasi_m (no_alok,no_dokumen,tanggal,"+
					"keterangan,kode_curr,kurs,akun_tak,nik_buat,nik_app,kode_lokasi,lok_tujuan,"+
					"nilai,nilaix,status,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+
					"'"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_tak.getText()+"','"+
					this.cb_pengaju.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_lokasi.getText()+"',"+
					parseNilai(this.ed_nilai.getText())+","+parseNilai(this.ed_nilaix.getText())+",'1','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
							
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.doModalResult = function(event, modalResult)
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
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "") 
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'alokasi_m','no_alok',this.app._lokasi+"-ALO"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.doEditChange = function(sender)
{

	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
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
	if ((sender == this.ed_nilai) || (sender == this.ed_nilaix))
	{
		var tot = nilaiToFloat(this.ed_nilai.getText()) + nilaiToFloat(this.ed_nilaix.getText());
		this.ed_total.setText(floatToNilai(tot));
	}
};
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_lokasi) 
		{   
			this.standarLib.showListData(this, "Daftar Lokasi Tujuan",this.cb_lokasi,undefined, 
										  "select a.kode_lokasi,a.nama   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi<>'"+this.app._lokasi+"'",
										  "select count(a.kode_lokasi)   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi<>'"+this.app._lokasi+"'",
										["kode_lokasi","nama"],"and",["Kode Lokasi","Nama"],false);
		}
		if (sender == this.cb_tak) 
		{
			this.standarLib.showListData(this, "Daftar Akun Mutasi",this.cb_tak,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='019' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='019' ",
										["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
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
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
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
window.app_saku_kb_transaksi_proses_drop_fMou.prototype.doRequestReady = function(sender, methodName, result)
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