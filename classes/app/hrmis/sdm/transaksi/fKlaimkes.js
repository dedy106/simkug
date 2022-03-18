window.app_hrmis_sdm_transaksi_fKlaimkes = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fKlaimkes";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Klaim Kesehatan: Input/Koreksi", 0);	

		this.cb_nik = new portalui_saiCBBL(this);
		this.cb_nik.setLeft(20);
		this.cb_nik.setTop(10);
		this.cb_nik.setWidth(185);
		this.cb_nik.setLabelWidth(100);
		this.cb_nik.setLength(10);
		this.cb_nik.setRightLabelVisible(false);
		this.cb_nik.setReadOnly(false);
		this.cb_nik.setCaption("NIK Pegawai");
		this.cb_nik.setText("");
		this.cb_nik.setRightLabelCaption("");
		this.cb_nik.setTag("9");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(350);
		this.ed_nama.setLength(100);
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setTag("9");
		
		this.ed_tmplahir = new portalui_saiLabelEdit(this);
		this.ed_tmplahir.setLeft(20);
		this.ed_tmplahir.setTop(54);
		this.ed_tmplahir.setWidth(240);
		this.ed_tmplahir.setLabelWidth(100);
		this.ed_tmplahir.setLength(100);
		this.ed_tmplahir.setReadOnly(true);
		this.ed_tmplahir.setCaption("Tempat / Tgl Lahir");
		this.ed_tmplahir.setText("");
		this.ed_tmplahir.setTag("9");
		
		this.ed_tgllahir = new portalui_saiLabelEdit(this);
		this.ed_tgllahir.setLeft(270);
		this.ed_tgllahir.setTop(54);
		this.ed_tgllahir.setWidth(100);
		this.ed_tgllahir.setLabelWidth(0);
		this.ed_tgllahir.setLength(100);
		this.ed_tgllahir.setReadOnly(true);
		this.ed_tgllahir.setCaption("");
		this.ed_tgllahir.setText("");
		this.ed_tgllahir.setTag("9");
		
		this.ed_tingkat = new portalui_saiLabelEdit(this);
		this.ed_tingkat.setLeft(380);
		this.ed_tingkat.setTop(54);
		this.ed_tingkat.setWidth(90);
		this.ed_tingkat.setLabelWidth(40);
		this.ed_tingkat.setReadOnly(true);
		this.ed_tingkat.setCaption("Tingkat");
		this.ed_tingkat.setText("");
		this.ed_tingkat.setTag("9");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(76);
		this.ed_alamat.setWidth(450);
		this.ed_alamat.setLength(100);
		this.ed_alamat.setReadOnly(true);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setTag("9");
		
		//--------------------
		this.lblTgl3 = new portalui_label(this);
		this.lblTgl3.setTop(98);
		this.lblTgl3.setLeft(20);
		this.lblTgl3.setWidth(101);		
		this.lblTgl3.setHeight(18);		
		this.lblTgl3.setCaption("Tanggal");
		this.lblTgl3.setUnderLine(true);
		uses("portalui_datePicker");
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(98);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(99);
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(120);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Klaim");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(120);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(144);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(150);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(166);
		this.ed_desc.setWidth(450);
		this.ed_desc.setCaption("Keterangan");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_pasien = new portalui_saiCBBL(this);
		this.cb_pasien.setLeft(20);
		this.cb_pasien.setTop(188);
		this.cb_pasien.setWidth(350);
		this.cb_pasien.setLabelWidth(100);
		this.cb_pasien.setLength(10);
		this.cb_pasien.setReadOnly(true);
		this.cb_pasien.setCaption("Pasien");
		this.cb_pasien.setText("");
		this.cb_pasien.setRightLabelCaption("");
		this.cb_pasien.setTag("9");
		
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(210);
		this.cb_jenis.setWidth(250);
		this.cb_jenis.setCaption("Jenis Plafon");
		this.cb_jenis.setText("");
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.addItem(0,"1. RAWAT JALAN");
		this.cb_jenis.addItem(1,"2. RAWAT INAP NON OP");
		this.cb_jenis.addItem(2,"3. RAWAT INAP OP");
		this.cb_jenis.addItem(3,"4. KEHAMILAN");
		this.cb_jenis.addItem(4,"5. RAWAT MATA");
		this.cb_jenis.addItem(5,"6. RAWAT GIGI");
		this.cb_jenis.addItem(6,"7. ALKES LAINNYA");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(210);
		this.bhistory.setLeft(273);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(232);
	    this.p1.setWidth(930);
	    this.p1.setHeight(240);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Detail Plafon');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(210);			
		this.sg1.setColCount(4);
		this.sg1.setTag("1");
		this.sg1.setReadOnly(false);
		this.sg1.setColTitle(["Kode","Keterangan","Plafon","Nilai"]);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(2).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(3).setColumnFormat(window.cfNilai);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.bGen.onClick.set(this, "genClick");
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_pasien.onBtnClick.set(this, "FindBtnClick");
		this.cb_jenis.onBtnClick.set(this, "FindBtnClick");
		this.cb_nik.onChange.set(this, "doEditChange");
		this.bhistory.onClick.set(this,"showClick");
		
		this.nourut=0;
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			this.sg1.clear(1); 
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.sg1init = function(sg)
{
	sg.setColWidth([3,2,1,0],[200,200,400,100]);
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.genClick = function(sender)
{
	try
	{
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kes_klaim_m','no_klaim',this.app._lokasi+"-KES"+this.dp_tgl1.getText().substr(6,4)+".",'0000'));
		this.ed_dok.setFocus();
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.doEditChange = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		var line,data = this.dbLib.runSQL("select alamat, tempat_lahir ,tgl_lahir "+
		                                  "from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_tmplahir.setText(line.get("tempat_lahir"));
				var dt=line.get("tgl_lahir").split(" ");
					dt=dt[0].split("-");
				this.ed_tgllahir.setText(dt[2]+"/"+dt[1]+"/"+dt[0]);							
				this.ed_alamat.setText(line.get("alamat"));
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
		
		var line,data = this.dbLib.runSQL("select ifnull(a.kode_jabs,'-') as kode_jabs "+
										  "from hr_jabs a "+
										  "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.status_aktif = '1'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.kodejabs = line.get("kode_jabs");
			}
			else
			{
				this.kodejabs = "-";
			}
		}
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2"],this.cb_nik);
				this.sg1.clear(1); 
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","2","9"])))
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kes_klaim_m','no_klaim',this.app._lokasi+"-KES"+this.dp_tgl1.getText().substr(6,4)+".",'0000'));
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					var periode = this.dp_tgl1.getText().substr(6,4) + this.dp_tgl1.getText().substr(3,2);
					sql.add("insert into kes_klaim_m (no_klaim,kode_lokasi,no_dokumen,tanggal,keterangan,jenis_plafon,"+
							"             periode,status_pasien,pasien,nik,tgl_input,nik_user,progress) values  "+
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_jenis.getText().substr(0,1)+"','"+
								 periode+"','"+this.cb_pasien.getText()+"','"+this.cb_pasien.rightLabelCaption+"','"+this.cb_nik.getText()+"',now(),'"+this.app._userLog+"','0')");
			
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{			
						if (this.sg1.getCell(3,i) != "0" && this.sg1.rowValid(i))
						{
							sql.add("insert into kes_klaim_d (no_klaim,kode_jenis,nilai,keterangan) values "+	
								"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(0,i)+"',"+parseNilai(this.sg1.getCell(3,i))+",'"+this.sg1.getCell(1,i)+"')");
						}
					}
					
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","2","9"])))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("");
					this.dbLib.execArraySQL(sql);	
				}catch(e)
				{
					system.alert(this, e,"");
				}					
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","2"])))
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
				if (this.cb_jenis.getText().substr(0,1) == "1")
				{
					var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_rj where kode_lokkonsol = '"+this.lokkonsol+"'");
				}
				if (this.cb_jenis.getText().substr(0,1) == "2")
				{
					if (this.cb_pasien.getText() == "pegawai")
						var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_ri where kode_lokkonsol = '"+this.lokkonsol+"' and status='PEGAWAI'");
					else
					  var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_ri where kode_lokkonsol = '"+this.lokkonsol+"' and status<>'PEGAWAI'");
				}
				if (this.cb_jenis.getText().substr(0,1) == "3")
				{
					if (this.cb_pasien.getText() == "pegawai")
						var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_riop where kode_lokkonsol = '"+this.lokkonsol+"' and status='PEGAWAI'");
					else
					  var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_riop where kode_lokkonsol = '"+this.lokkonsol+"' and status<>'PEGAWAI'");
				}
				if (this.cb_jenis.getText().substr(0,1) == "4")
				{
					var data = this.dbLib.runSQL("select '1' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_hamil where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='PERIKSA' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 "+
					                             "union "+
												 "select '2' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_hamil where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='SC' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 ");					
				}
				if (this.cb_jenis.getText().substr(0,1) == "5")
				{
					if (this.kodejabs == "-")
					{
						var data = this.dbLib.runSQL("select '1' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_mata where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='FRAME' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 and status = 'NON' "+
					                                 "union "+
												     "select '2' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_mata where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='LENSA' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 and status = 'NON' ");					
					}
					else
					{
						var data = this.dbLib.runSQL("select '1' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_mata where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='FRAME' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 and status = 'JABSTRUK' "+
					                                 "union "+
												     "select '2' as kode_jenis,jenis as nama,tarif,0 as nilai from kes_mata where kode_lokkonsol = '"+this.lokkonsol+"' and jenis='LENSA' and "+this.ed_tingkat.getText()+" between tingkat1 and tingkat2 and status = 'JABSTRUK' ");					
					}
				}
				if (this.cb_jenis.getText().substr(0,1) == "6")
				{
					var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_gigi where kode_lokkonsol = '"+this.lokkonsol+"'");
				}
				if (this.cb_jenis.getText().substr(0,1) == "7")
				{
					var data = this.dbLib.runSQL("select kode_jenis,nama,tarif,0 as nilai from kes_alkes where kode_lokkonsol = '"+this.lokkonsol+"'");
				}
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.sg1.appendData(
								new Array(line.get("kode_jenis"),line.get("nama"),floatToNilai(parseFloat(line.get("tarif"))),0));					
						}
					} 
				}				
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_pasien) 
		{
			if (this.cb_nik.getText() != "")
			{
				this.standarLib.showListData(this, "Daftar Pasien",sender,undefined, 
										  "select status_family,nama       from hr_keluarga where kode_lokkonsol='"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and (status_family in ('Istri','Suami') or (status_family = 'Anak' and status_tanggungan = 'tanggungan'))" + " union " +
										  "select 'Pegawai' as status,nama from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ",
										  "select count(nama)         from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"'",
										  ["status_family","nama"],"and",["Status","Nama"],false);
			}
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fKlaimkes.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};
