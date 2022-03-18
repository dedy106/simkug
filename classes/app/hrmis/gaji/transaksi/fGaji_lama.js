window.app_hrmis_gaji_transaksi_fGaji = function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_transaksi_fGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_gaji_transaksi_fGaji";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Gaji Karyawan", 0);	

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
		this.ed_nb.setCaption("No Bukti");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.cb_dok = new portalui_saiCBBL(this);
		this.cb_dok.setLeft(20);
		this.cb_dok.setTop(76);
		this.cb_dok.setWidth(240);
		this.cb_dok.setCaption("Dokumen");
		this.cb_dok.setText("");
		this.cb_dok.setReadOnly(false);
		this.cb_dok.setLabelWidth(100);
		this.cb_dok.setRightLabelVisible(false);
		this.cb_dok.setRightLabelCaption("");
		
		this.cb_nik = new portalui_saiCBBL(this);
		this.cb_nik.setLeft(20);
		this.cb_nik.setTop(98);
		this.cb_nik.setWidth(240);
		this.cb_nik.setLabelWidth(100);
		this.cb_nik.setReadOnly(false);
		this.cb_nik.setRightLabelVisible(false);
		this.cb_nik.setCaption("Karyawan");
		this.cb_nik.setText("");
		this.cb_nik.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(260);
		this.bShow.setTop(98);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_tingkat = new portalui_saiLabelEdit(this);
		this.ed_tingkat.setLeft(20);
		this.ed_tingkat.setTop(120);
		this.ed_tingkat.setWidth(140);
		this.ed_tingkat.setReadOnly(true);
		this.ed_tingkat.setCaption("Tingkat - Usia");
		this.ed_tingkat.setText(""); 
		
		this.ed_usia = new portalui_saiLabelEdit(this);
		this.ed_usia.setLeft(165);
		this.ed_usia.setTop(120);
		this.ed_usia.setWidth(40);
		this.ed_usia.setLabelWidth(0);
		this.ed_usia.setReadOnly(true);
		this.ed_usia.setCaption("");
		this.ed_usia.setText(""); 
		
		this.ed_gadas = new portalui_saiLabelEdit(this);
		this.ed_gadas.setLeft(20);
		this.ed_gadas.setTop(142);
		this.ed_gadas.setWidth(185);
		this.ed_gadas.setTipeText(ttNilai);
		this.ed_gadas.setAlignment(alRight);
		this.ed_gadas.setCaption("Gaji Dasar");
		this.ed_gadas.setText("0"); 
		this.ed_gadas.setReadOnly(true);
		this.ed_gadas.setLength(150);
		
		this.ed_stspeg = new portalui_saiLabelEdit(this);
		this.ed_stspeg.setLeft(220);
		this.ed_stspeg.setTop(142);
		this.ed_stspeg.setWidth(150);
		this.ed_stspeg.setLabelWidth(50);
		this.ed_stspeg.setCaption("Status");
		this.ed_stspeg.setText(""); 
		this.ed_stspeg.setReadOnly(true);
		this.ed_stspeg.setLength(150);
		//-------------
		this.ed_pp = new portalui_saiLabelEdit(this);
		this.ed_pp.setLeft(520);
		this.ed_pp.setTop(54);
		this.ed_pp.setWidth(350);
		this.ed_pp.setCaption("Lokasi Kerja");
		this.ed_pp.setText(""); 
		this.ed_pp.setReadOnly(true);
		this.ed_pp.setLength(150);
		
		this.ed_status = new portalui_saiLabelEdit(this);
		this.ed_status.setLeft(520);
		this.ed_status.setTop(76);
		this.ed_status.setWidth(150);
		this.ed_status.setReadOnly(true);
		this.ed_status.setCaption("Status - Pddk");
		this.ed_status.setText(""); 
		
		this.ed_jenjang = new portalui_saiLabelEdit(this);
		this.ed_jenjang.setLeft(680);
		this.ed_jenjang.setTop(76);
		this.ed_jenjang.setWidth(50);
		this.ed_jenjang.setLabelWidth(0);
		this.ed_jenjang.setReadOnly(true);
		this.ed_jenjang.setCaption("");
		this.ed_jenjang.setText(""); 
		
		this.ed_absen = new portalui_saiLabelEdit(this);
		this.ed_absen.setLeft(750);
		this.ed_absen.setTop(76);
		this.ed_absen.setWidth(120);
		this.ed_absen.setLabelWidth(60);
		this.ed_absen.setTipeText(ttNilai);
		this.ed_absen.setAlignment(alRight);
		this.ed_absen.setCaption("Kehadiran");
		this.ed_absen.setText("0"); 
		this.ed_absen.setReadOnly(true);
		
		this.ed_jabs = new portalui_saiLabelEdit(this);
		this.ed_jabs.setLeft(520);
		this.ed_jabs.setTop(98);
		this.ed_jabs.setWidth(300);
		this.ed_jabs.setReadOnly(true);
		this.ed_jabs.setCaption("Jabatan Struktural");
		this.ed_jabs.setText(""); 
		
		this.ed_jabf = new portalui_saiLabelEdit(this);
		this.ed_jabf.setLeft(520);
		this.ed_jabf.setTop(120);
		this.ed_jabf.setWidth(300);
		this.ed_jabf.setReadOnly(true);
		this.ed_jabf.setCaption("Jabatan Fungsional");
		this.ed_jabf.setText(""); 
		
		this.ed_prof = new portalui_saiLabelEdit(this);
		this.ed_prof.setLeft(520);
		this.ed_prof.setTop(142);
		this.ed_prof.setWidth(300);
		this.ed_prof.setReadOnly(true);
		this.ed_prof.setCaption("Profesi");
		this.ed_prof.setText(""); 
		
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(400);
		this.bHitung.setTop(142);
		this.bHitung.setCaption("Hitung");
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(164);
		this.p1.setWidth(455);
		this.p1.setLeft(20);
		this.p1.setHeight(340);
		this.p1.setCaption("Data Parameter Fixed Gaji Pendapatan");
		
		uses("portalui_saiGrid;portalui_sgNavigator",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(450);
		this.sg1.setHeight(290);
		this.sg1.setColCount(4);
		this.sg1.setColTitle(new Array("Kode","Deskripsi","Nilai","CAL/DEF"));
		this.sg1.setColWidth(new Array(3,2,1,0),new Array(60,80,210,70));	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "CAL");
			val.set(2, "DEF");
		this.sg1.columns.get(3).setPicklist(val);
		
		this.sgn1 = new portalui_sgNavigator(this.p1);
		this.sgn1.setTop(313);
		this.sgn1.setLeft(1);
		this.sgn1.setWidth(452);
		this.sgn1.setGrid(this.sg1);
		this.sgn1.setButtonStyle(5);
		
		this.ed_npdpt = new portalui_saiLabelEdit(this.sgn1);
		this.ed_npdpt.setLeft(230);
		this.ed_npdpt.setTop(2);
		this.ed_npdpt.setWidth(220);
		this.ed_npdpt.setTipeText(ttNilai);
		this.ed_npdpt.setAlignment(alRight);
		this.ed_npdpt.setCaption("Total Pendapatan");
		this.ed_npdpt.setText("");
		this.ed_npdpt.setReadOnly(true);
		
		this.p2 = new portalui_panel(this);
		this.p2.setTop(164);
		this.p2.setWidth(455);
		this.p2.setLeft(500);
		this.p2.setHeight(340);
		this.p2.setCaption("Data Parameter Fixed Gaji Potongan");
		
		this.sg2 = new portalui_saiGrid(this.p2);
		this.sg2.setTop(20);
		this.sg2.setLeft(1);
		this.sg2.setWidth(450);
		this.sg2.setHeight(290);
		this.sg2.setColCount(4);
		this.sg2.setColTitle(new Array("Kode","Deskripsi","Nilai","CAL/DEF"));
		this.sg2.setColWidth(new Array(3,2,1,0),new Array(60,80,210,70));	
		this.sg2.setReadOnly(false);
		this.sg2.columns.get(0).setReadOnly(true);	
		this.sg2.columns.get(1).setReadOnly(true);	
		this.sg2.columns.get(2).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "CAL");
			val.set(2, "DEF");
		this.sg2.columns.get(3).setPicklist(val);
		
		this.sgn2 = new portalui_sgNavigator(this.p2);
		this.sgn2.setTop(313);
		this.sgn2.setLeft(1);
		this.sgn2.setWidth(452);
		this.sgn2.setGrid(this.sg2);
		this.sgn2.setButtonStyle(5);
		
		this.ed_npot = new portalui_saiLabelEdit(this.sgn2);
		this.ed_npot.setLeft(230);
		this.ed_npot.setTop(2);
		this.ed_npot.setWidth(220);
		this.ed_npot.setTipeText(ttNilai);
		this.ed_npot.setAlignment(alRight);
		this.ed_npot.setCaption("Total Potongan");
		this.ed_npot.setText("");
		this.ed_npot.setReadOnly(true);
		
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
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bHitung.onClick.set(this, "hitungClick");
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_nik.onBtnClick.set(this, "FindBtnClick");
			this.cb_dok.onBtnClick.set(this, "FindBtnClick");
			this.cb_dok.onChange.set(this, "doEditChange");
			this.cb_nik.onChange.set(this, "doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg2.onNilaiChange.set(this, "doNilaiChange2");
			this.sg1.onChange.set(this, "doChange");
			this.sg2.onChange.set(this, "doChange2");
			
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			var line,data = this.dbLib.runSQL("select kode_spro,value1,value2 "+
				                              "from spro where kode_lokasi = '"+this.lokkonsol+"' and  kode_spro in ('TYAY','TPKS','TCUT','BYJAB','TPLS') ");
			if (data instanceof portalui_arrayMap)
			{				
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						if (line.get("kode_spro") == "TYAY") this.nTyay = parseFloat(line.get("value1"));
						if (line.get("kode_spro") == "BYJAB") this.byJab = parseFloat(line.get("value1"));
						if (line.get("kode_spro") == "TCUT") this.blnCuti = parseFloat(line.get("value1"));	
						if (line.get("kode_spro") == "TPLS") this.jmlMasakrj = parseFloat(line.get("value1"));	
						if (line.get("kode_spro") == "TPKS") 
						{	
							this.blnPakser = parseFloat(line.get("value1"));	
							this.nilaiPakser = parseFloat(line.get("value2"));	
						}
					}
				}
			}
			this.loadParam();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.extend(window.portalui_childForm);
window.app_hrmis_gaji_transaksi_fGaji.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_gaji_transaksi_fGaji.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'gaji_m','no_gaji',this.lokkonsol+"-GJ"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.cb_dok.setFocus();
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
window.app_hrmis_gaji_transaksi_fGaji.prototype.simpan = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{				
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("insert into gaji_m (no_gaji,tanggal,keterangan,nik,no_dok,kode_lokkonsol,periode,progress,no_del,no_link,nik_user,tgl_input,kode_lokasi) values "+
					"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"','Gaji periode "+this.ed_period.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+"','"+this.lokkonsol+"','"+
					     this.ed_period.getText()+"','0','-','-','"+this.app._userLog+"',now(),'"+this.kodepp+"')");
					
			var scr1 = "insert into gaji_d (no_gaji,nik,no_dok,kode_param,kode_lokkonsol,nilai,dc) values ";
			var baris1 = true;
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(2,i) != "0") {
					if (!baris1) { scr1 += ",";}	
					scr1 += "('"+this.ed_nb.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+
					        "','"+this.sg1.getCell(0,i)+"','"+this.lokkonsol+"',"+parseNilai(this.sg1.getCell(2,i))+",'D')";				
					baris1 = false;
				}
			}
			for (var i=0; i < this.sg2.rows.getLength(); i++)
			{
				if (!baris1) { scr1 += ",";}	
				scr1 += "('"+this.ed_nb.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+
				        "','"+this.sg2.getCell(0,i)+"','"+this.lokkonsol+"',"+parseNilai(this.sg2.getCell(2,i))+",'C')";				
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
window.app_hrmis_gaji_transaksi_fGaji.prototype.doModalResult = function(event, modalResult)
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
				this.sg2.clear(); this.sg2.appendRow();
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
window.app_hrmis_gaji_transaksi_fGaji.prototype.showClick = function(sender)
{	
	if ((this.cb_dok.getText() != "") && (this.cb_nik.getText() != ""))
	{
		try
		{
			if (this.cb_nik.getText() != "")
			{
				this.dtTrans = this.dbLib.runSQL("select a.nik, ifnull(a.jml,0) as jml "+
												  "from hr_absen a "+
												  "where a.periode = '"+this.ed_period.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' ");
				var tmp = new portalui_arrayMap();
				for (var i in this.dtTrans.objList)
					tmp.set(this.dtTrans.get(i).get("nik"),this.dtTrans.get(i).get("jml"));
				this.dtTrans = tmp;
				this.ed_absen.setText(this.dtTrans.get(this.cb_nik.getText()));
				if (this.ed_absen.getText() == "undefined") this.ed_absen.setText("0");
				
				var line,data = this.dbLib.runSQL("select gadas "+
				                                  "from hr_gadas where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and status_aktif = '1' ");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.ed_gadas.setText(floatToNilai(parseFloat(line.get("gadas"))));
					}
				}
				var line,data = this.dbLib.runSQL("select jenjang "+
				                                  "from hr_angkat where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and status_aktif = '1' ");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.ed_jenjang.setText(line.get("jenjang"));
					}
				}
				var line,data = this.dbLib.runSQL("select tingkat2 "+
				                                  "from hr_tingkat where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and status_aktif = '1' ");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.ed_tingkat.setText(line.get("tingkat2"));
					}
				}
				var line,data = this.dbLib.runSQL("select datediff(now(),tgl_lahir) as jmlhari,status "+
			                                  "from karyawan where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						var thnbln = dayToYear(line.get("jmlhari"));
						this.ed_usia.setText(thnbln[0]);
						this.ed_status.setText(line.get("status"));
					}
				}
				var line,data = this.dbLib.runSQL("select a.kode_loker2,b.nama as nama_loker "+
				                                  "from hr_rwymutasi a inner join hr_lokasi b on a.kode_loker2=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
												  "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.status_aktif = '1' ");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.kodepp = line.get("kode_loker2");
						this.ed_pp.setText(line.get("nama_loker"));
					}
					else
					{
						this.kodepp = "-";
						this.ed_pp.setText("-");
					}
				}
												  
				var line,data = this.dbLib.runSQL("select a.kode_status2,b.nama as nama_status "+
				                                  "from hr_rwystatus a inner join hr_status2 b on a.kode_status2=b.kode_status and a.kode_lokkonsol=b.kode_lokkonsol "+
												  "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.status_aktif = '1' ");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.kodestspeg = line.get("kode_status2");
						this.ed_stspeg.setText(line.get("nama_status"));
					}
					else
					{
						this.kodestspeg = "-";
						this.ed_stspeg.setText("-");
					}
				}
				
				var line,data = this.dbLib.runSQL("select a.jab_baru, a.kode_jabs, b.keterangan "+
				                                  "from hr_jabs a inner join hr_jabatan b on a.kode_jabs=b.kode_jab and a.kode_lokkonsol=b.kode_lokkonsol "+
												  "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.status_aktif = '1'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.jenisjabs = line.get("keterangan");
						this.kodejabs = line.get("kode_jabs");
						this.ed_jabs.setText(line.get("jab_baru"));
					}
					else
					{
						this.jenisjabs = "-";
						this.kodejabs = "-";
						this.ed_jabs.setText("-");
					}
				}
				var line,data = this.dbLib.runSQL("select jab_baru, kode_jabf "+
				                                  "from hr_jabf "+
												  "where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and status_aktif = '1'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.kodejabf = line.get("kode_jabf");
						this.ed_jabf.setText(line.get("jab_baru"));
					}
					{
						this.kodejabf = "-";
						this.ed_jabf.setText("-");
					}
				}
				
				var line,data = this.dbLib.runSQL("select a.nama as nama_prof, b.kode_profesi2,a.jenis "+
				                                  "from hr_profesi a inner join hr_rwyprofesi b on a.kode_profesi=b.kode_profesi2 and a.kode_lokkonsol=b.kode_lokkonsol "+
												  "where b.kode_lokkonsol = '"+this.lokkonsol+"' and b.nik = '"+this.cb_nik.getText()+"' and b.status_aktif = '1'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.kodeprof = line.get("kode_profesi2");
						this.ed_prof.setText(line.get("nama_prof"));
						this.jenisprof = line.get("jenis");
					}
					else
					{
						this.kodeprof = "-";
						this.ed_prof.setText("-");
						this.jenisprof = "-";
					}
				}
				var line,data = this.dbLib.runSQL("select datediff(now(),tgl_masuk) as jmlhari "+
			                                      "from karyawan where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.masaKrj = line.get("jmlhari");
					}
				}
			}
			this.sg1.clear(); 
			var strSql = " select a.kode_param,a.nama,0 as nilai "+
						 " from gaji_param_d a "+
						 " where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='PDPT' order by a.nu";
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3),
							new Array(line.get("kode_param"),line.get("nama"),line.get("nilai"),"DEF"));					
					}
					this.sg1.validasi();
				} 
				else
				this.sg1.appendRow();
			}
			this.sg2.clear(); 
			var strSql = " select a.kode_param,a.nama,0 as nilai "+
						 " from gaji_param_d a "+
						 " where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='POT' order by a.nu";
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg2,new Array(0,1,2,3),
							new Array(line.get("kode_param"),line.get("nama"),line.get("nilai"),"DEF"));					
					}
					this.sg2.validasi();
				} 
				else
				this.sg2.appendRow();
			}
			this.sg1.validasi();
			this.sg2.validasi();
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.hitungClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(3,i,"CAL");
	}
	for (var i=0; i < this.sg2.rows.getLength(); i++)
	{
		this.sg2.setCell(3,i,"CAL");
	}
	this.sg1.validasi();
	this.sg2.validasi();
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
	if (sender == this.cb_nik)
	{
		var line,data = this.dbLib.runSQL(" select concat(a.kode_pp,' - ',b.nama)as nama_pp,a.alamat,a.grade "+
		                                  " from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
										  " where a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.cb_nik.getText()+"'");
	
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_pp.setText(line.get("nama_pp"));
				this.ed_grade.setText(line.get("grade"));
			} 
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
		}
		if (sender == this.cb_dok) 
		{
			this.standarLib.showListData(this, "Daftar Dokumen",sender,undefined, 
										  "select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  "select count(no_dok)       from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  ["no_dok","keterangan"],"and",["No Dokumen","Keterangan"],false);
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doChange = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 :    
						this.sg1.validasi();
				break;
			case 3 : 
					this.sg1.onChange.set(undefined, undefined);
					this.sg2.onChange.set(undefined, undefined);
					
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{		
					  if (this.sg1.getCell(3,i) == "DEF")
					  {
						this.sg1.setCell(2,i,"0");
					  }
					  else
						{
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "GDAS") && (this.kodestspeg == "1"))
							{
								this.sg1.setCell(2,i,this.ed_gadas.getText());
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "PDAS") && (this.kodestspeg != "1"))
							{
								this.sg1.setCell(2,i,this.ed_gadas.getText());
							}							
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TYAY"))
							{
								var tyay = 0;
								if (this.kodestspeg == "1")
								{
									tyay = nilaiToFloat(this.ed_gadas.getText()) * parseFloat(this.nTyay);
									this.sg1.setCell(2,i,floatToNilai(tyay));
								} 
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TJAB"))
							{
								var tjabs = tjabs2 = 0;
								if (this.jenisjabs == "-")
								{
									tjabs2 = 0;
								}
								else
								{
									if (this.jenisjabs == "STRUKTURAL NON AKADEMIK")
									{
										tjabs2 = this.dtJabatansna.get(this.kodejabs);
									}
									else
									{	
										//sa, cek jab+jabf if no then 90% <---tidak bisa harus dimasukan tabulasi dgn nilai 90%nya
										tjabs2 = this.getTunjJabs(this.kodejabs, this.kodejabf);
									}
								}
								var tjabf = 0;
								if (this.kodejabf == "-")
								{
								  tjabf = 0;
								}
								else
								{	
									tjabf = this.getTunjJabf(this.kodejabf, this.ed_jenjang.getText());
								}
								if (tjabs2 > tjabf) tjabs = tjabs2; else  tjabs = tjabf; 
								this.sg1.setCell(2,i,floatToNilai(tjabs));
							}
							
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TPROF"))
							{				
								var tprof = 0;				
								if (this.kodestspeg == "1")
								{
									if (this.kodeprof == "-")
									{
										tprof = 0;
									}
									else
									{
										if (this.jenisprof == "NONAKADEMIK")
											tprof = this.getTunjProf(this.kodeprof, this.ed_tingkat.getText());
										else
											tprof = this.getTunjProf(this.kodeprof, this.ed_jenjang.getText());
									}
								} 
								this.sg1.setCell(2,i,floatToNilai(tprof));
							}
							
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "THRT"))
							{
								var ttht = ptingkat = pusia = 0;
								if (this.kodestspeg == "1") {
									var tot1 = Math.round(5/100 * (nilaiToFloat(this.ed_gadas.getText()) + parseFloat(tyay) + parseFloat(tprof)));
									pusia = this.getDplkUsia(this.ed_usia.getText());
									ptingkat = this.getDplkTingkat(this.ed_tingkat.getText());
									ttht = Math.round(tot1 * pusia/100 * ptingkat /100);
									this.sg1.setCell(2,i,floatToNilai(ttht));
									this.ttht = ttht;
									for (var k=0; k < this.sg2.rows.getLength(); k++)
									{
										if ((this.sg2.getCell(3,k) == "CAL") && (this.sg2.getCell(0,k) == "PTHT"))
										{
											var ptht = this.ttht * 2;
											this.sg2.setCell(2,k,floatToNilai(ptht));
										}
									}
								}
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TRAN"))
							{
								if (this.ed_absen.getText() != "0") 
								{
									var jhari,tarif,ttrans = 0;
									jhari = this.dtTrans.get(this.cb_nik.getText());
									tarif = this.dtTunjTrans.get(this.kodejabs);
									ttrans = jhari * tarif;
								} else ttrans = 0;
								this.sg1.setCell(2,i,floatToNilai(ttrans));
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TCUT"))
							{
								var cuti = 0;								
								if (parseInt(this.ed_period.getText().substr(4,2)) == this.blnCuti)
								{
									cuti = nilaiToFloat(this.ed_gadas.getText()) + parseFloat(tyay) + parseFloat(tprof);
								}
								this.sg1.setCell(2,i,floatToNilai(cuti));
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TPKS"))
							{
								var pakser = 0;								
								if (parseInt(this.ed_period.getText().substr(4,2)) == this.blnPakser)
								{
									pakser = this.nilaiPakser;
								}
								this.sg1.setCell(2,i,floatToNilai(pakser));
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "BPLS"))
							{
								//cek dah ambil hp blm  ... ? kl udah cek jabatannya,,,trus ambil selilsihnya dr yg lama 
								
								var pulsa = 0;								
								if (this.masaKrj >= this.jmlMasakrj) pulsa = this.dtTunjHP.get(this.kodejabs);
								this.sg1.setCell(2,i,floatToNilai(pulsa));
							}
							if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "PH21"))
							{
								var pph21 = 0;
								var totbln = nilaiToFloat(this.ed_gadas.getText()) + parseFloat(tyay) + parseFloat(tprof) + parseFloat(tjabs) + parseFloat(ttht) + parseFloat(ttrans) + parseFloat(pulsa) + parseFloat(this.pdas) + parseFloat(this.tkhs) + parseFloat(this.lmbr) + parseFloat(cuti) + parseFloat(pakser);
								var bjbt = Math.round(5/100 * totbln);
								if ((this.kodejabs != "-") || (this.kodejabf != "-"))
								{
									if (bjbt > this.byJab) bjbt = this.byJab;
								}
								var ptkp = this.dtPtkp.get(this.ed_status.getText());
								var totthn = (totbln - bjbt - ttht) * 12;
								totthn = totthn - ptkp;
								var pphtahun = Math.round(totthn * 5/100);
								pph21 = Math.round(pphtahun/12);
								this.sg1.setCell(2,i,floatToNilai(pph21));
								this.pph21 = pph21;
								
								for (var k=0; k < this.sg2.rows.getLength(); k++)
								{
									if ((this.sg2.getCell(3,k) == "CAL") && (this.sg2.getCell(0,k) == "PPPH"))
									{
										this.sg2.setCell(2,k,floatToNilai(this.pph21));
									}
								}	
								
							}
						}
					}
					this.sg1.onChange.set(this, "doChange");
					this.sg2.onChange.set(this, "doChange2");
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doChange2 = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
						this.sg2.validasi();
				break;
			case 3 : 
					for (var i=0; i < this.sg2.rows.getLength(); i++)
					{
						if ((this.sg2.getCell(3,i) == "CAL") && (this.sg2.getCell(0,i) == "PPPH"))
						{
							this.sg2.setCell(2,i,floatToNilai(this.pph21));
						}
						if ((this.sg2.getCell(3,i) == "CAL") && (this.sg2.getCell(0,i) == "PTHT") && (this.kodestspeg == "1"))
						{
							var ptht = this.ttht * 2;
							this.sg2.setCell(2,i,floatToNilai(ptht));
						}
						if ((this.sg2.getCell(3,i) == "CAL") && !((this.sg2.getCell(0,i) == "PPPH") || (this.sg2.getCell(0,i) == "PTHT")))
						{
							var line,data = this.dbLib.runSQL("select ifnull(nilai,0) as nilai "+
				                          "from gaji_pot where kode_param='"+this.sg2.getCell(0,i)+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and "+this.ed_period.getText()+" between periode1 and periode2");
							if (data instanceof portalui_arrayMap)
							{
								line = data.get(0);
								if (line != undefined)
								{
									var nilai = parseFloat(line.get("nilai"));
								}
								else
								var nilai = 0;
							}
							this.sg2.setCell(2,i,floatToNilai(nilai));
						}
					}					
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0; this.pdas = 0; this.tkhs = 0; this.lmbr = 0;
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(2,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(2,i));		
				if (this.sg1.getCell(0,i) == 'PDAS') this.pdas = nilaiToFloat(this.sg1.getCell(2,i));
				if (this.sg1.getCell(0,i) == 'TKHS') this.tkhs = nilaiToFloat(this.sg1.getCell(2,i));
				if (this.sg1.getCell(0,i) == 'LMBR') this.lmbr = nilaiToFloat(this.sg1.getCell(2,i));
			}
		}
		this.ed_npdpt.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("doNilaiChange:"+e);
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doNilaiChange2 = function()
{
	try
	{
		var tot = 0; 
		for (var i = 0; i < this.sg2.rows.getLength();i++)
		{
			if (this.sg2.getCell(2,i) != "")
			{
				tot += nilaiToFloat(this.sg2.getCell(2,i));			
			}
		}
		this.ed_npot.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("doNilaiChange:"+e);
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_nik.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.loadParam = function(){
	this.dtJabatansna = this.dbLib.runSQL("select kode_jabs, ifnull(tunjjab,0) as tunjjab from hr_tunjjabsna where kode_lokkonsol = '"+this.lokkonsol+"'");	
	this.dtTunjJabs = this.dbLib.runSQL("select kode_jabs, kode_jabf, ifnull(tunjjab,0) as tunjjab from hr_tunjjabs where kode_lokkonsol = '"+this.lokkonsol+"'");
	this.dtTunjJabf = this.dbLib.runSQL("select kode_jab, pddk, ifnull(tunjjab,0) as tunjjab from hr_tunjjab where kode_lokkonsol = '"+this.lokkonsol+"'");
	this.dtTunjProf = this.dbLib.runSQL("select kode_profesi, pddk, ifnull(tunjprof,0) as tunjprof from hr_tunjprof where kode_lokkonsol = '"+this.lokkonsol+"'");
	this.dtDplkUsia = this.dbLib.runSQL("select batasmin, batasMax, ifnull(persen,0) as persen from hr_dplk where kode_lokkonsol = '"+this.lokkonsol+"' and jenis = 'USIA'");
	this.dtDplkTingkat = this.dbLib.runSQL("select batasmin, batasMax, ifnull(persen,0) as persen from hr_dplk where kode_lokkonsol = '"+this.lokkonsol+"' and jenis = 'TINGKAT'");
	this.dtTunjTrans = this.dbLib.runSQL("select kode_jab, ifnull(tarif,0) as tarif from hr_tunjtrans where kode_lokkonsol = '"+this.lokkonsol+"'");
	this.dtTunjHP = this.dbLib.runSQL("select kode_jab,ifnull(pulsa,0) as pulsa from hr_tunjhp where kode_lokkonsol = '"+this.lokkonsol+"'");
	this.dtPtkp = this.dbLib.runSQL("select kode_ptkp, ifnull(nilai,0) as nilai from gaji_ptkp where kode_lokkonsol = '"+this.lokkonsol+"'");
	
	var tmp = new portalui_arrayMap();
	for (var i in this.dtJabatansna.objList){
		tmp.set(this.dtJabatansna.get(i).get("kode_jabs"),this.dtJabatansna.get(i).get("tunjjab"));
	}
	this.dtJabatansna = tmp;	
	tmp = new portalui_arrayMap();
	for (var i in this.dtTunjTrans.objList)
		tmp.set(this.dtTunjTrans.get(i).get("kode_jab"),this.dtTunjTrans.get(i).get("tarif"));
	this.dtTunjTrans = tmp;
	tmp = new portalui_arrayMap();
	for (var i in this.dtTunjHP.objList)
		tmp.set(this.dtTunjHP.get(i).get("kode_jab"),this.dtTunjHP.get(i).get("pulsa"));
	this.dtTunjHP = tmp;
	tmp = new portalui_arrayMap();
	for (var i in this.dtPtkp.objList)
		tmp.set(this.dtPtkp.get(i).get("kode_ptkp"),this.dtPtkp.get(i).get("nilai"));
	this.dtPtkp = tmp;
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.getDplkUsia = function(usia){
	var line;
	for (var i in this.dtDplkUsia.objList){
		line = this.dtDplkUsia.get(i);
		if (usia >= line.get("batasmin") && usia <= line.get("batasmax")){
			return line.get("persen");
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.getDplkTingkat = function(tingkat){
	var line;
	for (var i in this.dtDplkTingkat.objList){
		line = this.dtDplkTingkat.get(i);
		if (tingkat >= line.get("batasmin") && tingkat <= line.get("batasmax")){
			return line.get("persen");
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.getTunjProf = function(kdProf, pddk){
	var line;
	for (var i in this.dtTunjProf.objList){
		line = this.dtTunjProf.get(i);
		if (kdProf == line.get("kode_profesi") && pddk == line.get("pddk")){
			return line.get("tunjprof");
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.getTunjJabs = function(kdJabs, kdJabf){
	var line;
	for (var i in this.dtTunjJabs.objList){
		line = this.dtTunjJabs.get(i);
		if (kdJabs == line.get("kode_jabs") && kdJabf == line.get("kode_jabf")){
			return line.get("tunjjab");
		}
	}
};
window.app_hrmis_gaji_transaksi_fGaji.prototype.getTunjJabf = function(kdJabf, pddk){
	var line;
	for (var i in this.dtTunjJabf.objList){
		line = this.dtTunjJabf.get(i);
		if (kdJabf == line.get("kode_jab") && pddk == line.get("pddk")){
			return line.get("tunjjab");
		}
	}
};