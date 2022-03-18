window.app_saku_kb_fNpkorev = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_fNpkorev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_fNpkorev";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Nota Proses Kegiatan Operasional [NPKO]: Koreksi [Reverse]", 0);	
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(145);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText("200809"); 
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
		this.dp_tgl1.onSelect.set(this, "doSelect");
	
		uses("portalui_saiCBBL");
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(56);
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
		
		this.cb_unit = new portalui_saiCBBL(this);
		this.cb_unit.setLeft(20);
		this.cb_unit.setTop(78);
		this.cb_unit.setWidth(185);
		this.cb_unit.setCaption("Unit Kerja");
		this.cb_unit.setText(""); 
		this.cb_unit.setReadOnly(false);
		this.cb_unit.onExit.set(this, "EditExit");
		this.cb_unit.onChange.set(this, "doEditChange");
		this.cb_unit.onKeyPress.set(this, "keyPress");
		this.cb_unit.onBtnClick.set(this, "FindBtnClick");
		this.cb_unit.setLabelWidth(100);
		this.cb_unit.setRightLabelVisible(true);
		this.cb_unit.setRightLabelCaption(" ");
		
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(100);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No NPKO");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.cb_nb2 = new portalui_saiCBBL(this);
		this.cb_nb2.setLeft(450);
		this.cb_nb2.setTop(100);
		this.cb_nb2.setWidth(240);
		this.cb_nb2.setCaption("No NPKO Refer.");
		this.cb_nb2.setText(""); 
		this.cb_nb2.setReadOnly(false);
		this.cb_nb2.onExit.set(this, "EditExit");
		this.cb_nb2.onChange.set(this, "doEditChange");
		this.cb_nb2.onKeyPress.set(this, "keyPress");
		this.cb_nb2.onBtnClick.set(this, "FindBtnClick");
		this.cb_nb2.setLabelWidth(100);
		this.cb_nb2.setRightLabelVisible(false);
		//this.cb_nb2.setRightLabelCaption(" ");
		
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(100);
		this.bGen.setCaption("Gen");
		this.bGen.onClick.set(this, "genClick");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(122);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Kegiatan");
		this.cb_drk.setText(""); 
		this.cb_drk.setReadOnly(false);
		this.cb_drk.onExit.set(this, "EditExit");
		this.cb_drk.onChange.set(this, "doEditChange");
		this.cb_drk.onKeyPress.set(this, "keyPress");
		this.cb_drk.onBtnClick.set(this, "FindBtnClick");
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption(" ");
		
		this.ed_lokasi = new portalui_saiLabelEdit(this);
		this.ed_lokasi.setLeft(20);
		this.ed_lokasi.setTop(144);
		this.ed_lokasi.setWidth(300);
		this.ed_lokasi.setCaption("Lokasi");
		this.ed_lokasi.setText(""); 
		this.ed_lokasi.setReadOnly(false);
		this.ed_lokasi.setLength(50);
	    
		this.ed_sarana = new portalui_saiLabelEdit(this);
		this.ed_sarana.setLeft(20);
		this.ed_sarana.setTop(166);
		this.ed_sarana.setWidth(300);
		this.ed_sarana.setCaption("Sarana");
		this.ed_sarana.setText(""); 
		this.ed_sarana.setReadOnly(false);
		this.ed_sarana.setLength(50);
		
		this.ed_volume = new portalui_saiLabelEdit(this);
		this.ed_volume.setLeft(20);
		this.ed_volume.setTop(188);
		this.ed_volume.setWidth(165);
		this.ed_volume.setTipeText(ttNilai);
		this.ed_volume.setAlignment(alRight);
		this.ed_volume.setCaption("Volume");
		this.ed_volume.setText("0"); 
		this.ed_volume.setReadOnly(false);
				
		this.ed_lingkup = new portalui_saiLabelEdit(this);
		this.ed_lingkup.setLeft(20);
		this.ed_lingkup.setTop(210);
		this.ed_lingkup.setWidth(300);
		this.ed_lingkup.setCaption("Lingkup Pekerjaan");
		this.ed_lingkup.setText(""); 
		this.ed_lingkup.setReadOnly(false);
		this.ed_lingkup.setLength(150);
        
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(232);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal Mulai");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(234);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
		
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(256);
		this.lbltgl3.setLeft(20);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setCaption("Tanggal Selesai");
		this.lbltgl3.setUnderLine(true);
		
		this.dp_tgl3 = new portalui_datePicker(this);
		this.dp_tgl3.setTop(258);
		this.dp_tgl3.setLeft(120);
		this.dp_tgl3.setWidth(82);
			
		this.ed_kondisi = new portalui_saiLabelEdit(this);
		this.ed_kondisi.setLeft(450);
		this.ed_kondisi.setTop(144);
		this.ed_kondisi.setWidth(300);
		this.ed_kondisi.setCaption("Fasilitas");
		this.ed_kondisi.setText(""); 
		this.ed_kondisi.setReadOnly(false);
		this.ed_kondisi.setLength(150);
		
		this.ed_sasaran = new portalui_saiLabelEdit(this);
		this.ed_sasaran.setLeft(450);
		this.ed_sasaran.setTop(166);
		this.ed_sasaran.setWidth(300);
		this.ed_sasaran.setCaption("Sasaran Keg.");
		this.ed_sasaran.setText(""); 
		this.ed_sasaran.setReadOnly(false);
		this.ed_sasaran.setLength(150);
		
		this.ed_uraian = new portalui_saiLabelEdit(this);
		this.ed_uraian.setLeft(450);
		this.ed_uraian.setTop(188);
		this.ed_uraian.setWidth(500);
		this.ed_uraian.setCaption("Uraian Pekerjaan");
		this.ed_uraian.setText(""); 
		this.ed_uraian.setReadOnly(false);
		this.ed_uraian.setLength(150);
		
		this.ed_catatan = new portalui_saiLabelEdit(this);
		this.ed_catatan.setLeft(450);
		this.ed_catatan.setTop(210);
		this.ed_catatan.setWidth(500);
		this.ed_catatan.setCaption("Catatan");
		this.ed_catatan.setText(""); 
		this.ed_catatan.setReadOnly(false);
		this.ed_catatan.setLength(150);
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(450);
		this.cb_akun.setTop(232);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Nomor KPA");
		this.cb_akun.setText(""); 
		this.cb_akun.setReadOnly(false);
		this.cb_akun.onExit.set(this, "EditExit");
		this.cb_akun.onChange.set(this, "doEditChange");
		this.cb_akun.onKeyPress.set(this, "keyPress");
		this.cb_akun.onBtnClick.set(this, "FindBtnClick");
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption(" ");	
		
		this.ed_saldo = new portalui_saiLabelEdit(this);
		this.ed_saldo.setLeft(450);
		this.ed_saldo.setTop(254);
		this.ed_saldo.setWidth(200);
		this.ed_saldo.setTipeText(ttNilai);
		this.ed_saldo.setAlignment(alRight);
		this.ed_saldo.setCaption("Saldo Anggaran");
		this.ed_saldo.setText("0"); 
		this.ed_saldo.setReadOnly(true);

		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(450);
		this.ed_nilai.setTop(276);
		this.ed_nilai.setWidth(200);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Anggaran");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		
		this.ed_curr = new portalui_saiLabelEdit(this);
		this.ed_curr.setLeft(800);
		this.ed_curr.setTop(254);
		this.ed_curr.setWidth(150);
		this.ed_curr.setCaption("Kode Currency");
		this.ed_curr.setText(""); 
		this.ed_curr.setReadOnly(true);
		
		this.cb_rencana = new portalui_saiCBBL(this);
		this.cb_rencana.setLeft(20);
		this.cb_rencana.setTop(280);
		this.cb_rencana.setWidth(185);
		this.cb_rencana.setCaption("Direncanakan Oleh");
		this.cb_rencana.setText(""); 
		this.cb_rencana.setReadOnly(false);
		this.cb_rencana.onExit.set(this, "EditExit");
		this.cb_rencana.onChange.set(this, "doEditChange");
		this.cb_rencana.onKeyPress.set(this, "keyPress");
		this.cb_rencana.onBtnClick.set(this, "FindBtnClick");
		this.cb_rencana.setLabelWidth(100);
		this.cb_rencana.setRightLabelVisible(true);
		this.cb_rencana.setRightLabelCaption(" ");	
		
		this.cb_periksa = new portalui_saiCBBL(this);
		this.cb_periksa.setLeft(20);
		this.cb_periksa.setTop(302);
		this.cb_periksa.setWidth(185);
		this.cb_periksa.setCaption("Diperiksa Oleh");
		this.cb_periksa.setText(""); 
		this.cb_periksa.setReadOnly(false);
		this.cb_periksa.onExit.set(this, "EditExit");
		this.cb_periksa.onChange.set(this, "doEditChange");
		this.cb_periksa.onKeyPress.set(this, "keyPress");
		this.cb_periksa.onBtnClick.set(this, "FindBtnClick");
		this.cb_periksa.setLabelWidth(100);
		this.cb_periksa.setRightLabelVisible(true);
		this.cb_periksa.setRightLabelCaption(" ");	
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(324);
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
		
		this.cb_cust = new portalui_saiCBBL(this);
		this.cb_cust.setLeft(20);
		this.cb_cust.setTop(346);
		this.cb_cust.setWidth(185);
		this.cb_cust.setCaption("Ref. Peruntukan");
		this.cb_cust.setText(""); 
		this.cb_cust.setReadOnly(false);
		this.cb_cust.onExit.set(this, "EditExit");
		this.cb_cust.onChange.set(this, "doEditChange");
		this.cb_cust.onKeyPress.set(this, "keyPress");
		this.cb_cust.onBtnClick.set(this, "FindBtnClick");
		this.cb_cust.setLabelWidth(100);
		this.cb_cust.setRightLabelVisible(true);
		this.cb_cust.setRightLabelCaption(" ");	
		
		/*uses("portalui_checkBox");
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setLeft(20);
		this.cb1.setTop(350);
		this.cb1.setWidth(100);
		this.cb1.setCaption("Cetak Form");
		this.cb1.setSelected(true);
		*/
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.ed_period.setText(this.app._periode);
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]);
			this.ed_curr.setText("IDR");
			this.cb_pp.setRightLabelCaption(pp[1]);
			this.bGen.click();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_fNpkorev.extend(window.portalui_childForm);
window.app_saku_kb_fNpkorev.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_fNpkorev.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);	
				this.ed_period.setText(this.app._periode);
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]);
				this.ed_curr.setText("IDR");
				this.cb_pp.setRightLabelCaption(pp[1]);
				this.bGen.click();
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					/*
					sql.add("insert into NPKO (No_NPKO,Tanggal,Kode_PP,Kode_Unit,Kode_DRK,Lokasi,Sarana,Volume,"+
					        "Lingkup,Tgl_Mulai,Tgl_Selesai,Fasilitas,Sasaran,Uraian,Catatan,Kode_Akun,Nilai,Nik_Setuju,"+
							"Nik_Periksa,Nik_Rencana,Kode_Cust,Periode,Nik_User,Tgl_Input,Progress,No_Del,No_Link) values "+
							"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.cb_pp.getText()+"','"+
							     this.cb_unit.getText()+"','"+this.cb_drk.getText()+"','"+this.ed_lokasi.getText()+"','"+
								 this.ed_sarana.getText()+"',"+parseNilai(this.ed_volume.getText())+",'"+
							     this.ed_lingkup.getText()+"','"+this.dp_tgl2.getDate()+"','"+this.dp_tgl3.getDate()+"','"+
								 this.ed_kondisi.getText()+"','"+this.ed_sasaran.getText()+"','"+this.ed_uraian.getText()+"','"+
								 this.ed_catatan.getText()+"','"+this.cb_akun.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+
								 this.cb_setuju.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_rencana.getText()+"','"+this.cb_cust.getText()+"','"+
								 this.ed_period.getText()+"','"+this.app._userLog+"','"+tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate()+"','0','-','-')");
					*/
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
					/*uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update masakun_konsol set  "+
							"nama = '"+this.e1.getText()+"' where akun_konsol = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);	*/
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
			    //this.dbLib.beginTrans();
				//fields = new server_util_Map();	
				//fields.set(0, "kode_lokasi");	
				//values = new server_util_Map();	
				//values.set(0, this.e0.getText());
				//this.dbLib.locateAndDeleteData("lokasi",fields, values);
				//this.dbLib.checkTrans();
				//this.dbLib.completeTrans();
				/*
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from masakun_konsol where akun_konsol='"+this.e0.getText()+"'");
					this.dbLib.execArraySQL(sql);	*/
		   }
			break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_kb_fNpkorev.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_saku_kb_fNpkorev.prototype.genClick = function(sender)
{
	try
	{
		if (this.cb_pp.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'npko','no_npko',"NPKO/"+this.initial+"/"+this.ed_period.getText().substr(2,6)+"/",'00000'));
			this.cb_drk.setFocus();
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
window.app_saku_kb_fNpkorev.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
  this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_fNpkorev.prototype.doEditChange = function(sender)
{
	if (sender == this.cb_nb2)
	{
		if ((this.cb_nb2.getText() != "") || (this.cb_nb2.getText() != undefined)) 
		{
			var temp = this.dbLib.loadQuery("select a.kode_drk,b.nama as nama_drk,a.lokasi,a.sarana,"+
			                                "       cast(a.volume as decimal) as volume,a.lingkup,convert(varchar,a.tgl_mulai,103) as tgl_mulai,"+
											"       convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.fasilitas,a.sasaran,a.catatan,a.kode_akun,"+
											"       cast(a.nilai as decimal) as nilai,a.nik_setuju,a.nik_periksa,a.nik_rencana,a.kode_cust, "+
											"		c.nama as nama_setuju,d.nama as nama_periksa,e.nama as nama_rencana,f.nama as nama_cust "+
											"from npko a inner join drk b on a.kode_drk=b.kode_drk  "+
											"            inner join karyawan c on a.nik_setuju=c.nik "+
											"            inner join karyawan d on a.nik_periksa=d.nik "+
											"            inner join karyawan e on a.nik_rencana=e.nik "+
											"            inner join cust f on a.kode_cust=f.kode_cust "+
											"where a.no_npko = '"+this.cb_nb2.getText()+"'");
		
			if (temp != "")
			{
				var baris = temp.split("\r\n");
				var data = baris[1].split(";");
				this.cb_drk.setText(data[0]);
				this.cb_drk.setRightLabelCaption(data[1]);
				this.ed_lokasi.setText(data[2]);
				this.ed_sarana.setText(data[3]);
				this.ed_volume.setText(data[4]);
				this.ed_lingkup.setText(data[5]);
				//this.dp_tgl2.setDate(data[6]);
				//this.dp_tgl3.setDate(data[7]);
				this.ed_kondisi.setText(data[8]);
				this.ed_sasaran.setText(data[9]);
				this.ed_catatan.setText(data[10]);
				this.cb_akun.setText(data[11]);
				this.ed_nilai.setText(data[12]);
				this.cb_setuju.setText(data[13]);
				this.cb_periksa.setText(data[14]);
				this.cb_rencana.setText(data[15]);
				this.cb_cust.setText(data[16]);
				this.cb_setuju.setRightLabelCaption(data[17]);
				this.cb_periksa.setRightLabelCaption(data[18]);
				this.cb_rencana.setRightLabelCaption(data[19]);
				this.cb_cust.setRightLabelCaption(data[20]);
			}
			
		}
	}
	if (sender == this.cb_unit)
	{
		if (this.cb_unit.getText() == "")
		{
			this.cb_unit.setRightLabelCaption("");
			this.cb_nb2.setText("");
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
			this.cb_drk.setText("");  this.cb_drk.setRightLabelCaption("");
			this.cb_unit.setText(""); this.cb_unit.setRightLabelCaption("");
			this.ed_nb.setText("");
			this.ed_saldo.setText("0");
			this.cb_nb2.setText("");
		}
	}
};
window.app_saku_kb_fNpkorev.prototype.EditExit = function(sender)
{
};
window.app_saku_kb_fNpkorev.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pp) 
		{   
		    this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' ","select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_pp","nama"),"and");
		}
		if (sender == this.cb_unit) 
		{   
		    this.standarLib.showListData(this, "Daftar Unit",this.cb_unit,undefined, 
										  "select kode_unit, nama from unit where kode_pp='"+this.cb_pp.getText()+"' ","select count(kode_unit) from unit where kode_pp='"+this.cb_pp.getText()+"'",
										  new Array("kode_unit","nama"),"and");
		}
		if (sender == this.cb_drk) 
		{   
		    this.standarLib.showListData(this, "Daftar Kegiatan",this.cb_drk,undefined, 
										  "select kode_drk, nama from drk where tahun = '"+this.ed_period.getText().substr(0,4)+"' and kode_pp='"+this.cb_pp.getText()+"' ",
										  "select count(kode_drk) from drk where tahun = '"+this.ed_period.getText().substr(0,4)+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  new Array("kode_drk","nama"),"and");
		}
		if (sender == this.cb_akun) 
		{   
		    this.standarLib.showListData(this, "Daftar Mata Anggaran",this.cb_akun,undefined, 
										  "select kode_akun, nama from masakun ","select count(kode_akun) from masakun ",
										  new Array("kode_akun","nama"),"and");
		}
		if (sender == this.cb_cust) 
		{   
		    this.standarLib.showListData(this, "Daftar Ref. Peruntukan",this.cb_cust,undefined, 
										  "select kode_cust, nama from CUST ","select count(kode_cust) from CUST",
										  new Array("kode_cust","nama"),"where");
		}
		if (sender == this.cb_rencana) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan Perencana",this.cb_rencana,undefined, 
										  "select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' ","select count(nik) from karyawan where kode_pp='"+this.cb_pp.getText()+"'",
										  new Array("nik","nama"),"and");
		}
		if (sender == this.cb_periksa) 
		{
		    this.standarLib.showListData(this, "Daftar Karyawan Pemeriksa",this.cb_periksa,undefined, 
										  "select nik, nama from karyawan ","select count(nik) from karyawan '",
										  new Array("nik","nama"),"where");
		}
		if (sender == this.cb_setuju) 
		{
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama from karyawan ","select count(nik) from karyawan '",
										  new Array("nik","nama"),"where");
		}
		if (sender == this.cb_nb2) 
		{
		    this.standarLib.showListData(this, "Daftar NPKO belum terealisasi",this.cb_nb2,this.ed_uraian, 
										  "select no_npko,uraian from npko where progress='0' and no_del = '-' and kode_unit='"+this.cb_unit.getText()+"' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_npko) from npko where progress='0' and no_del = '-' and kode_unit='"+this.cb_unit.getText()+"' and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_npko","uraian"),"and");
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_fNpkorev.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :
    				//alert(result);
    				step="info";
		            if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    				break;
      			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};