window.app_saku_kb_transaksi_proses_if_fIfajuk= function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_if_fIfajuk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Imprest Fund: Koreksi", 0);	
		
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
	
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(54);
		this.cb_pp.setWidth(185);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setReadOnly(false);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' ",["kode_pp","nama"],true);
		
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(76);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No ImprestFund");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);

		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(76);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(680);
		this.cb_perlama.setTop(54);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(76);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No I/F Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(76);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(98);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen SK");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(150);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(120);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(142);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(142);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(142);
		this.lblTgl2.setLeft(290);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tanggal Closing");
		this.lblTgl2.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(144);
		this.dp_tgl2.setLeft(390);
		this.dp_tgl2.setWidth(82);
		this.dp_tgl2.setTag("2");
		
		this.cb_akunif = new portalui_saiCBBL(this);
		this.cb_akunif.setLeft(20);
		this.cb_akunif.setTop(164);
		this.cb_akunif.setWidth(185);
		this.cb_akunif.setLabelWidth(100);
		this.cb_akunif.setReadOnly(false);
		this.cb_akunif.setRightLabelVisible(true);
		this.cb_akunif.setCaption("Akun ImprestFund");
		this.cb_akunif.setRightLabelCaption("");
		this.cb_akunif.setTag("2");
		this.cb_akunif.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='010' ",["a.kode_akun","a.nama"],true);
		
		this.cb_pengaju = new portalui_saiCBBL(this);
		this.cb_pengaju.setLeft(20);
		this.cb_pengaju.setTop(186);
		this.cb_pengaju.setWidth(185);
		this.cb_pengaju.setLabelWidth(100);
		this.cb_pengaju.setReadOnly(false);
		this.cb_pengaju.setRightLabelVisible(true);
		this.cb_pengaju.setCaption("Diajukan Oleh");
		this.cb_pengaju.setRightLabelCaption("");
		this.cb_pengaju.setTag("2");
		this.cb_pengaju.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(208);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(false);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("2");
		this.cb_setuju.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(230);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai ImprestFund");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setTag("2");
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			
			this.standarLib.clearByTag(this, ["0","2"],undefined);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%'");
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
				
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pengaju.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");	
			this.cb_akunif.onBtnClick.set(this, "FindBtnClick");	
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
				
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_if_fIfajuk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.ubah = function()
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
	var data = this.dbLib.runSQL("select nik_pengaju from if_m where progress <> '9' and nik_pengaju = '"+this.cb_pengaju.getText()+"' and no_if <> '"+this.cb_bukti.getText()+"' ");
	if (data.get(0) != undefined)
	{
		system.alert(this,"NIK Pengaju tidak valid.","NIK Pengaju masih mempunyai ImprestFund yang masih aktif.");
		return false;
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
	{
		try
		{				
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update if_m set no_del = '"+this.ed_nb.getText()+"' where no_if ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from if_m where no_if ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				this.nb = this.cb_bukti.getText();
			}
			sql.add("insert into if_m (no_if,no_kas,no_dokumen,tanggal,due_date, "+
					"keterangan,catatan,kode_curr,kurs,akun_if,nik_pengaju,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.nb+"','-','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+
					"','"+this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_akunif.getText()+"','"+
					this.cb_pengaju.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','IFD_P',"+parseNilai(this.ed_nilai.getText())+",'0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","2"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			}
			break;
		
		case "ubah" :
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.periodeLama) > parseFloat(this.ed_period.getText())){
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
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
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update if_m set no_del = 'DEL' where no_if ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}
				else
				{
					sql.add(" delete from if_m where no_if ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}			
			break;
	}
};
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'if_m','no_if',this.app._lokasi+"-IFD"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.doEditChange = function(sender)
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
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		if (this.cb_bukti != undefined) {
			try 
			{
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				var line,data = this.dbLib.runSQL(" select  a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_pengaju, a.nik_setuju, b.nama as nama_aju, c.nama as nama_setuju, "+
												  "         a.due_date,a.tanggal,a.periode,a.akun_if,d.nama as nama_akun,a.nilai "+
												  " from if_m a inner join karyawan b on a.nik_pengaju = b.nik and a.kode_lokasi = b.kode_lokasi "+
												  "             inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
												  "             inner join masakun d on a.akun_if = d.kode_akun and a.kode_lokasi = d.kode_lokasi "+
												  " where a.no_if='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.periodeLama = line.get("periode");
						this.ed_period.setText(line.get("periode"));
						this.dp_tgl1.setText(line.get("tanggal"));
						this.ed_dok.setText(line.get("no_dokumen"));
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.ed_kurs.setText(line.get("kurs"));
						this.cb_pengaju.setText(line.get("nik_pengaju"));
						this.cb_pengaju.setRightLabelCaption(line.get("nama_aju"));
						this.cb_setuju.setText(line.get("nik_setuju"));
						this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
						this.cb_akunif.setText(line.get("akun_if"));
						this.cb_akunif.setRightLabelCaption(line.get("nama_akun"));
						this.dp_tgl2.setText(line.get("due_date"));
						this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
					} 
				}
				
			} catch(e)
			{
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
				else {var sts = "";}
				this.standarLib.showListData(this, "Daftar Pengajuan I/F",this.cb_bukti,undefined, 
				  								 "select no_if, keterangan from if_m where progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 "select count(no_if)      from if_m where progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 new Array("no_if","keterangan"),"and", new Array("No ImprestFund","Keterangan"),false);
			}
			this.standarLib.clearByTag(this, new Array("2"),undefined);		
		}
		if (sender == this.cb_akunif) 
		{
			this.standarLib.showListData(this, "Daftar Akun Imprest Fund",this.cb_akunif,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='010' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='010' ",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr ",
										  "select count(kode_curr) from curr ",
										  new Array("kode_curr","nama"),"where",new Array("Kode Curr","Nama"),false);		
		}
		if (sender == this.cb_pp) 
		{   
		    if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
			else {var sts = "";}
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' "+sts,
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting' "+sts,
										  new Array("kode_pp","nama"),"and",new Array("Kode PP","Nama"),false);		
		}
		if (sender == this.cb_pengaju) 
		{   
		    this.standarLib.showListData(this, "Karyawan Pengaju I/F",this.cb_pengaju,undefined, 
										  "select nik, nama  from karyawan  where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
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
window.app_saku_kb_transaksi_proses_if_fIfajuk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.nb +")");
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